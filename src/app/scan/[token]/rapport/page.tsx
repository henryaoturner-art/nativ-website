import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getReportPayload, getScanBundle, saveReportPayload } from "@/lib/scan/db";
import { sendReportReadyEmail } from "@/lib/scan-email";
import {
  buildReportInput,
  generateReportPayload,
  reportGenerationAvailable,
  type ReportPayload,
  type ReportWorkflowItem,
} from "@/lib/scan/report";

// Rapport wordt bij het eerste bezoek gegenereerd als dat bij het afronden
// nog niet kon (bijvoorbeeld zonder API-sleutel); dat kan minuten duren.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export const metadata: Metadata = {
  title: "Jouw scanrapport | nativ",
  robots: { index: false, follow: false },
};

// Secties 8, 9 en 10 zijn vaste copy (rapportstructuur-2026-08-07.md +
// instapteksten-2026-08-07.md §4) — niet door het model geschreven.
const staticCopy = {
  nl: {
    reportLabel: "AI-scan",
    pendingTitle: "Je rapport wordt gemaakt",
    pendingBody:
      "Bedankt dat je hebt deelgenomen aan de scan. Je antwoorden zijn binnen en veilig opgeslagen. We maken nu je rapport en je krijgt een mail zodra het klaarstaat. Deze pagina blijft jouw eigen link, daarmee kom je terug bij je rapport.",
    gehoord: "Wat we van je gehoord hebben",
    bekeken: "Wat we hebben bekeken",
    ranglijst: "De ranglijst",
    beginnen: "Hier zou ik beginnen",
    kandidaten: "Sterke kandidaten",
    later: "Later interessant",
    watHetNuIs: "Wat het nu is",
    hoeVaak: "Hoe vaak",
    watHetKost: "Wat het kost",
    blijftLiggen: "Waar het blijft liggen",
    leentZich: "Waarom dit zich leent",
    misgaat: "Als er iets misgaat",
    kennisZit: "Waar de kennis zit",
    kennisbeeld: "Waar die kennis nu zit",
    kennisSystemen: "Systemen en plekken die steeds terugkomen",
    kennisHoofden: "Wat alleen in iemands hoofd zit",
    mensenZagen: "Wat je mensen zagen en jij niet",
    toevoegt: "Wat dit toevoegt aan wat je nu al doet",
    toevoegtNodig: "Wat daarvoor nodig is",
    zoZietHetEruit: "Zo ziet dit werk eruit als het is ingericht",
    zoZietHetEruitIntro:
      "Dit gaat alleen over het werk hierboven, waar we zouden beginnen. Links jouw stappen zoals je ze zelf beschreef. Rechts dezelfde keten, ingericht.",
    zoZietHetEruitNu: "Zoals je het zelf vertelde",
    zoZietHetEruitStraks: "Zoals het eruitziet als dit is ingericht",
    waarBeginnen: "Waar we zouden beginnen",
    uitzoeken: "Wat je verder zou kunnen uitzoeken",
    openVragen: "Vragen die je bedrijf straks zelf beantwoordt",
    openVragenIntro:
      "Dit zijn de vragen die je zelf aangaf vandaag niet met zekerheid te kunnen beantwoorden. Ze staan hier niet als huiswerk, maar met wat ervoor nodig is om ze wel te kunnen stellen.",
    openVraagStatus: {
      "kan-nu": "Kan nu",
      "kan-zodra-vastgelegd": "Kan zodra die kennis is vastgelegd",
      maatwerk: "Vraagt maatwerk",
    },
    groeien: "Waar je in kunt groeien",
    gegevens: "Hoe we met jullie gegevens omgaan",
    gegevensPunten: [
      "Er zijn geen bestanden of vertrouwelijke gegevens gevraagd, en die blijven waar ze horen.",
      "We hebben alleen naar het werk zelf gekeken.",
      "Jullie antwoorden en dit rapport zijn van jullie. Je kunt ze delen met wie je wilt.",
    ],
    praten: "Verder praten",
    pratenBody:
      "Wil je weten wat er nodig is om de eerste workflow uit dit rapport te laten draaien? Daar praten we graag over. Je zit nergens aan vast.",
    pratenCta: "Plan een gesprek",
    volgendeStap: "De volgende stap",
    volgendeStapTitel: "De eerste stap: de scan met je mensen",
    volgendeStapBody:
      "Je hebt zelf al in kaart gebracht waar het werk zit. De volgende stap is dat je collega's hetzelfde doen voor hun eigen afdeling. Daarmee heb je het complete beeld, en beginnen we niet opnieuw.",
    volgendeStapCta: "Nodig je team uit",
  },
  en: {
    reportLabel: "AI scan",
    pendingTitle: "Your report is being created",
    pendingBody:
      "Thanks for taking the scan. Your answers are in and safely stored. We are creating your report now and you will get an email as soon as it is ready. This page remains your own link, it takes you back to your report.",
    gehoord: "What we heard from you",
    bekeken: "What we looked at",
    ranglijst: "The ranking",
    beginnen: "This is where I would start",
    kandidaten: "Strong candidates",
    later: "Interesting for later",
    watHetNuIs: "What it is now",
    hoeVaak: "How often",
    watHetKost: "What it costs",
    blijftLiggen: "Where it gets stuck",
    leentZich: "Why this is a good fit",
    misgaat: "If something goes wrong",
    kennisZit: "Where the knowledge sits",
    kennisbeeld: "Where that knowledge sits today",
    kennisSystemen: "Systems and places that keep coming back",
    kennisHoofden: "What only lives in someone's head",
    mensenZagen: "What your people saw that you did not",
    toevoegt: "What this adds to what you already do",
    toevoegtNodig: "What that takes",
    zoZietHetEruit: "What this work looks like once it is set up",
    zoZietHetEruitIntro:
      "This is only about the work above, where we would start. On the left your own steps, as you described them. On the right the same chain, set up.",
    zoZietHetEruitNu: "As you described it",
    zoZietHetEruitStraks: "As it looks once this is set up",
    waarBeginnen: "Where we would start",
    uitzoeken: "What you could look into next",
    openVragen: "Questions your company will answer itself",
    openVragenIntro:
      "These are the questions you told us you cannot answer with certainty today. They are not here as homework, but with what it takes to be able to ask them.",
    openVraagStatus: {
      "kan-nu": "Possible now",
      "kan-zodra-vastgelegd": "Possible once that knowledge is captured",
      maatwerk: "Needs custom work",
    },
    groeien: "Where you can grow",
    gegevens: "How we handle your data",
    gegevensPunten: [
      "We did not ask for files or confidential data, and those stay where they belong.",
      "We only looked at the work itself.",
      "Your answers and this report are yours. Share them with whoever you want.",
    ],
    praten: "Talking further",
    pratenBody:
      "Want to know what it takes to get the first workflow from this report running? We are happy to talk it through. You are not tied to anything.",
    pratenCta: "Book a call",
    volgendeStap: "The next step",
    volgendeStapTitel: "The first step: the scan with your people",
    volgendeStapBody:
      "You have already mapped out where the work is. The next step is for your colleagues to do the same for their own department. That gives you the complete picture, and we don't start over.",
    volgendeStapCta: "Invite your team",
  },
};

export default async function ScanReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const bundle = await getScanBundle(token);
  if (!bundle) notFound();
  const { scan } = bundle;

  let payload = (await getReportPayload(scan.id)) as ReportPayload | null;
  // Een heropende scan (team uitgenodigd na het solo-rapport) houdt zijn
  // bestaande rapport zichtbaar; alleen zonder rapport gaat een open scan
  // terug naar de vragen.
  if (scan.status !== "afgerond" && !payload) redirect(`/scan/${token}`);

  // Zelfherstellend: kon het rapport bij het afronden niet gemaakt worden
  // (geen sleutel, of de API zat vol), dan wordt het bij het eerste bezoek
  // alsnog gemaakt en bewaard.
  if (!payload && reportGenerationAvailable()) {
    try {
      const reportInput = buildReportInput(bundle);
      payload = await generateReportPayload({
        companyName: scan.company_name,
        contactName: scan.contact_name,
        answers: reportInput.ownerAnswers,
        language: scan.language,
        team: reportInput.team,
      });
      const firstSave = await saveReportPayload(scan.id, payload);
      // De invuller kreeg bij het afronden "je rapport wordt gemaakt" — dit
      // is het moment waarop het er echt staat, dus dit is het moment voor
      // de "je rapport staat klaar"-mail. Alleen bij de eerste keer bewaren,
      // zodat de mail nooit dubbel gaat.
      if (firstSave) {
        await sendReportReadyEmail(scan, payload.language);
      }
    } catch (err) {
      console.error("SCAN_REPORT_LAZY_ERROR:", err);
    }
  }

  const c = staticCopy[payload?.language ?? "nl"];

  if (!payload) {
    return (
      <section className="py-16 px-6 pb-24">
        <div className="max-w-[640px] mx-auto text-center">
          <FadeIn>
            <p className="text-sm text-sage uppercase tracking-wide">{c.reportLabel}</p>
            <h1 className="mt-2 font-serif text-3xl md:text-4xl text-grey">
              {c.pendingTitle}
            </h1>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              {c.pendingBody}
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-6 pb-20 md:pb-28">
      <div className="max-w-[760px] mx-auto">
        <FadeIn>
          <p className="text-sm text-sage uppercase tracking-wide">{c.reportLabel}</p>
          <h1 className="mt-2 font-serif text-3xl md:text-5xl leading-[1.15] text-grey">
            {scan.company_name}
          </h1>
        </FadeIn>

        <ReportSection title={c.gehoord}>
          <Prose text={payload.gehoord} />
        </ReportSection>

        <ReportSection title={c.bekeken}>
          <Prose text={payload.bekeken} />
        </ReportSection>

        <ReportSection title={c.ranglijst}>
          <h3 className="font-serif text-xl text-grey">{c.beginnen}</h3>
          <div className="mt-4 space-y-4">
            {payload.ranglijst.hierZouIkBeginnen.map((item) => (
              <WorkflowCard key={item.naam} item={item} c={c} primary />
            ))}
          </div>
          {payload.ranglijst.sterkeKandidaten.length > 0 && (
            <>
              <h3 className="mt-8 font-serif text-xl text-grey">{c.kandidaten}</h3>
              <div className="mt-4 space-y-4">
                {payload.ranglijst.sterkeKandidaten.map((item) => (
                  <WorkflowCard key={item.naam} item={item} c={c} />
                ))}
              </div>
            </>
          )}
          {payload.ranglijst.laterInteressant.length > 0 && (
            <>
              <h3 className="mt-8 font-serif text-xl text-grey">{c.later}</h3>
              <ul className="mt-3 space-y-1.5">
                {payload.ranglijst.laterInteressant.map((line) => (
                  <li key={line} className="text-grey/70 font-light leading-relaxed">
                    · {line}
                  </li>
                ))}
              </ul>
            </>
          )}
        </ReportSection>

        {payload.watJeMensenZagen && (
          <ReportSection title={c.mensenZagen}>
            <Prose text={payload.watJeMensenZagen} />
          </ReportSection>
        )}

        {/* Sectie A: hun eigen processtappen naast dezelfde keten, ingericht.
            Staat direct na de ranglijst, want hij gaat over de bovenste
            workflow daaruit. */}
        {payload.zoZietHetEruit && (
          <ReportSection title={c.zoZietHetEruit}>
            <Prose text={c.zoZietHetEruitIntro} />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl p-6 bg-surface border border-sage-light">
                <h3 className="text-xs uppercase tracking-wide text-grey/45">
                  {c.zoZietHetEruitNu}
                </h3>
                <ol className="mt-3 space-y-2 list-decimal pl-4">
                  {payload.zoZietHetEruit.nu.map((stap) => (
                    <li key={stap} className="text-grey/85 font-light leading-relaxed">
                      {stap}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl p-6 bg-sage-light border border-sage/40">
                <h3 className="text-xs uppercase tracking-wide text-grey/45">
                  {c.zoZietHetEruitStraks}
                </h3>
                <ol className="mt-3 space-y-2 list-decimal pl-4">
                  {payload.zoZietHetEruit.straks.map((item) => (
                    <li
                      key={item.stap}
                      className="text-grey/85 font-light leading-relaxed"
                    >
                      {item.stap}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-xs uppercase tracking-wide text-grey/45">
                {c.toevoegtNodig}
              </h3>
              <div className="mt-2">
                <Prose text={payload.zoZietHetEruit.watErvoorNodigIs} />
              </div>
            </div>
          </ReportSection>
        )}

        {/* Sectie F: alleen aanwezig als de invuller zelf al met AI werkt én
            de guard in report.ts de claims heeft laten staan. */}
        {payload.watDitToevoegt && (
          <ReportSection title={c.toevoegt}>
            <Prose text={payload.watDitToevoegt.watErNuGoedGaat} />
            <ul className="mt-5 space-y-3">
              {payload.watDitToevoegt.grenzen.map((limit) => (
                <li
                  key={limit.grens}
                  className="text-grey/85 font-light leading-relaxed"
                >
                  · {limit.grens}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Prose text={payload.watDitToevoegt.watErvoorInDePlaatsKomt} />
            </div>
            <div className="mt-6 bg-surface rounded-xl p-5 md:p-6 border border-sage-light">
              <h3 className="text-xs uppercase tracking-wide text-grey/45">
                {c.toevoegtNodig}
              </h3>
              <div className="mt-2">
                <Prose text={payload.watDitToevoegt.watErvoorNodigIs} />
              </div>
            </div>
          </ReportSection>
        )}

        {payload.kennisbeeld && (
          <ReportSection title={c.kennisbeeld}>
            <Prose text={payload.kennisbeeld.observatie} />
            {payload.kennisbeeld.systemen.length > 0 && (
              <>
                <h3 className="mt-6 text-xs uppercase tracking-wide text-grey/45">
                  {c.kennisSystemen}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {payload.kennisbeeld.systemen.map((line) => (
                    <li key={line} className="text-grey/80 font-light leading-relaxed">
                      · {line}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {payload.kennisbeeld.alleenInHoofden.length > 0 && (
              <>
                <h3 className="mt-6 text-xs uppercase tracking-wide text-grey/45">
                  {c.kennisHoofden}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {payload.kennisbeeld.alleenInHoofden.map((line) => (
                    <li key={line} className="text-grey/80 font-light leading-relaxed">
                      · {line}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ReportSection>
        )}

        <ReportSection title={c.waarBeginnen}>
          <Prose text={payload.waarWeZoudenBeginnen} />
        </ReportSection>

        {/* Nieuwe vorm: hun eigen onbeantwoorde vragen, met wat er nodig is om
            ze te kunnen stellen. Rapporten van vóór 13 aug hebben alleen de
            oude huiswerklijst en renderen die ongewijzigd. */}
        {payload.openVragen && payload.openVragen.length > 0 ? (
          <ReportSection title={c.openVragen}>
            <Prose text={c.openVragenIntro} />
            <div className="mt-4 space-y-4">
              {payload.openVragen.map((item) => (
                <div
                  key={item.vraag}
                  className="rounded-xl p-6 bg-surface border border-sage-light"
                >
                  <h4 className="font-serif text-lg text-grey">{item.vraag}</h4>
                  <p className="mt-3 text-grey/80 font-light leading-relaxed">
                    {item.watErvoorNodigIs}
                  </p>
                  <span className="mt-4 inline-block text-xs tracking-wide text-sage border border-sage-light bg-cream/60 rounded-full px-3 py-1">
                    {c.openVraagStatus[item.status]}
                  </span>
                </div>
              ))}
            </div>
          </ReportSection>
        ) : (
          payload.uitzoeksuggesties.length > 0 && (
            <ReportSection title={c.uitzoeken}>
              <ul className="space-y-2">
                {payload.uitzoeksuggesties.map((line) => (
                  <li key={line} className="text-grey/80 font-light leading-relaxed">
                    · {line}
                  </li>
                ))}
              </ul>
            </ReportSection>
          )
        )}

        <ReportSection title={c.groeien}>
          {/* jouwEigenBeeld staat WEL in de payload maar wordt bewust niet
              getoond: het is de verankering waarop de alinea hieronder is
              gebaseerd, geen citaat voor de lezer. De scan moedigt inspreken
              aan, dus letterlijke antwoorden bevatten geregeld verhaspelingen
              ("allemaal een iPod hebben die als klankbord kan vergeeren"), en
              die terugspiegelen leest als slordigheid. De alinea geeft hun
              beeld in leesbare taal terug; het opgeslagen citaat laat ons
              controleren dat het niet verzonnen is. */}
          <Prose text={payload.waarJeInKuntGroeien} />
        </ReportSection>

        <ReportSection title={c.gegevens}>
          <ul className="space-y-2">
            {c.gegevensPunten.map((punt) => (
              <li key={punt} className="text-grey/80 font-light leading-relaxed">
                · {punt}
              </li>
            ))}
          </ul>
        </ReportSection>

        <ReportSection title={c.praten}>
          <Prose text={c.pratenBody} />
          <Link
            href="/contact"
            className="mt-5 inline-block bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
          >
            {c.pratenCta}
          </Link>
        </ReportSection>

        {/* Sectie 10: alleen bij een solo-rapport (rapportstructuur-doc); bij
            een teamrapport vervalt hij. Self-service: de knop opent het eigen
            teamoverzicht, waar de eigenaar zelf collega's uitnodigt. */}
        {payload.scanVorm !== "team" && (
          <ReportSection title={c.volgendeStap}>
            <div className="bg-surface rounded-xl p-6 md:p-8 border border-sage-light">
              <h3 className="font-serif text-xl text-grey">{c.volgendeStapTitel}</h3>
              <p className="mt-3 text-grey/80 font-light leading-relaxed">
                {c.volgendeStapBody}
              </p>
              <Link
                href={`/scan/${token}/team`}
                className="mt-5 inline-block bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
              >
                {c.volgendeStapCta}
              </Link>
            </div>
          </ReportSection>
        )}
      </div>
    </section>
  );
}

function ReportSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn>
      <div className="mt-12 md:mt-16">
        <h2 className="font-serif text-2xl md:text-3xl text-grey">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </FadeIn>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <p className="text-grey/80 font-light leading-relaxed whitespace-pre-line">{text}</p>
  );
}

function WorkflowCard({
  item,
  c,
  primary = false,
}: {
  item: ReportWorkflowItem;
  c: (typeof staticCopy)["nl"];
  primary?: boolean;
}) {
  const rows: Array<[string, string]> = [
    [c.watHetNuIs, item.watHetNuIs],
    [c.hoeVaak, item.hoeVaak],
    [c.watHetKost, item.watHetKost],
    [c.blijftLiggen, item.waarHetBlijftLiggen],
    ...(item.waarDeKennisZit
      ? ([[c.kennisZit, item.waarDeKennisZit]] as Array<[string, string]>)
      : []),
    [c.leentZich, item.waaromDitZichLeent],
    [c.misgaat, item.alsErIetsMisgaat],
  ];
  return (
    <div
      className={`rounded-xl p-6 md:p-7 border ${
        primary ? "bg-sage-light border-sage/40" : "bg-surface border-sage-light"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-serif text-lg text-grey">{item.naam}</h4>
        {item.afdeling && (
          <span className="shrink-0 text-xs text-sage bg-cream/60 border border-sage-light rounded-full px-2.5 py-0.5">
            {item.afdeling}
          </span>
        )}
      </div>
      <dl className="mt-4 space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wide text-grey/45">{label}</dt>
            <dd className="text-grey/85 font-light leading-relaxed">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
