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

// Korte template (KAN-381, ontwerp-doel gtm/scan/voorbeeldrapport-*-2026-08-13):
// negen genummerde secties + kop-conclusie + inhoudsopgave. De herhalingsregel
// uit report.ts geldt ook hier: elke belofte wordt op precies één plek
// uitgeschreven — eigenaar/herkomst/datum in de ketenvisual, de rechten in het
// rechtenblok, de vaste werkwijze als labels op de keten.
const staticCopy = {
  nl: {
    reportLabel: "AI-scan",
    pendingTitle: "Je rapport wordt gemaakt",
    pendingBody:
      "Bedankt dat je hebt deelgenomen aan de scan. Je antwoorden zijn binnen en veilig opgeslagen. We maken nu je rapport en je krijgt een mail zodra het klaarstaat. Deze pagina blijft jouw eigen link, daarmee kom je terug bij je rapport.",
    lede: "Waar in jullie werk AI het meeste oplevert, wat er dan mogelijk wordt, en wat daar eerlijk voor nodig is. Gebaseerd op wat je zelf hebt verteld, en nergens op meer dan dat.",
    kortAntwoord: "Kort antwoord",
    beginBij: "Begin bij",
    kostNu: "Kost nu",
    verandert: "Verandert",
    toc: "In dit rapport",
    gehoord: "Wat we van je gehoord hebben",
    bekeken: "Wat we hebben bekeken",
    ranglijst: "De ranglijst",
    beginnen: "Hier zou ik beginnen",
    kandidaten: "Daarna in beeld",
    later: "Later interessant",
    watHetNuIs: "Wat het nu is",
    hoeVaakKost: "Hoe vaak · wat het kost",
    kennisZit: "Waar de kennis zit",
    waaromHier: "Waarom hier",
    mensenZagen: "Wat je mensen zagen en jij niet",
    toevoegt: "Wat dit toevoegt aan wat je nu al doet",
    toevoegtNodig: "Wat daarvoor nodig is",
    zoZietHetEruit: "Zo ziet dit werk eruit als je AI toevoegt",
    zoZietHetEruitIntro:
      "Dit gaat alleen over het werk hierboven, waar we zouden beginnen. Eerst de keten in één beeld, daarna jouw stappen ernaast.",
    zoZietHetEruitNu: "Zoals je het zelf vertelde",
    zoZietHetEruitStraks: "Zoals het eruitziet als je AI toevoegt",
    vanafNul: "En zo zou je dit werk vanaf nul kunnen ontwerpen, met AI in de kern",
    ketenCaption:
      "De keten waarop dit rapport is gebouwd. De Company Brain in het midden is de bron voor alles rechts ervan.",
    werkwijzeTitel: "Dit is onze vaste werkwijze, geen losse handigheid.",
    werkwijzeBody:
      "Vastleggen, inrichten, goedkeuren, beoordelen, groeien: die volgorde zit in het platform ingebouwd en geen stap is optioneel. Daarom verwijst elk antwoord naar zijn bron.",
    nergensStaat: "Wat nergens staat",
    groeien: "Waar je in kunt groeien",
    gegevens: "Jullie gegevens, en verder praten",
    gegevensPunten: [
      "Er zijn geen bestanden of vertrouwelijke gegevens gevraagd, en die blijven waar ze horen.",
      "Jullie antwoorden en dit rapport zijn van jullie. Je kunt ze delen met wie je wilt.",
    ],
    pratenBody:
      "Wil je weten wat er nodig is om de eerste workflow uit dit rapport te laten draaien? Daar praten we graag over. Je zit nergens aan vast.",
    pratenCta: "Plan een gesprek",
    volgendeStapTitel: "De eerste stap: de scan met je mensen",
    volgendeStapBody:
      "Je hebt zelf al in kaart gebracht waar het werk zit. De volgende stap is dat je collega's hetzelfde doen voor hun eigen afdeling. Daarmee heb je het complete beeld, en beginnen we niet opnieuw.",
    volgendeStapCta: "Nodig je team uit",
    keten: {
      bron: ["Jullie bronnen", "eigen systemen", "via koppeling of export"],
      kennis: ["Company Brain", "eigenaar · herkomst · datum", "wie mag wat zien"],
      workflow: ["De workflow", "vaste stappen", "op een vast moment"],
      poort: ["Menselijke poort", "iemand van jullie", "keurt goed"],
      resultaat: ["Resultaat", "overzicht · concept", "besluit"],
      stap1: "1 · VASTLEGGEN",
      stap2: "2 · INRICHTEN",
      stap3: "3 · GOEDKEUREN",
      terug: "4 · beoordelen · 5 · groeien: wat wordt goedgekeurd, voedt de Company Brain",
    },
  },
  en: {
    reportLabel: "AI scan",
    pendingTitle: "Your report is being created",
    pendingBody:
      "Thanks for taking the scan. Your answers are in and safely stored. We are creating your report now and you will get an email as soon as it is ready. This page remains your own link, it takes you back to your report.",
    lede: "Where AI pays off most in your work, what becomes possible, and what that honestly takes. Based on what you told us, and on nothing more than that.",
    kortAntwoord: "Short answer",
    beginBij: "Start with",
    kostNu: "Costs now",
    verandert: "What changes",
    toc: "In this report",
    gehoord: "What we heard from you",
    bekeken: "What we looked at",
    ranglijst: "The ranking",
    beginnen: "This is where I would start",
    kandidaten: "Next in view",
    later: "Interesting for later",
    watHetNuIs: "What it is now",
    hoeVaakKost: "How often · what it costs",
    kennisZit: "Where the knowledge sits",
    waaromHier: "Why here",
    mensenZagen: "What your people saw that you did not",
    toevoegt: "What this adds to what you already do",
    toevoegtNodig: "What that takes",
    zoZietHetEruit: "What this work looks like once you add AI",
    zoZietHetEruitIntro:
      "This is only about the work above, where we would start. First the chain in one picture, then your own steps next to it.",
    zoZietHetEruitNu: "As you described it",
    zoZietHetEruitStraks: "As it looks once you add AI",
    vanafNul: "And this is how you could design this work from scratch, with AI at its core",
    ketenCaption:
      "The chain this report is built on. The Company Brain in the middle is the source for everything to its right.",
    werkwijzeTitel: "This is our standard way of working, not a loose trick.",
    werkwijzeBody:
      "Capture, set up, approve, review, grow: that order is built into the platform and no step is optional. That is why every answer points to its source.",
    nergensStaat: "What is written down nowhere",
    uitzoeken: "What you could look into next",
    groeien: "Where you can grow",
    gegevens: "Your data, and talking further",
    gegevensPunten: [
      "We did not ask for files or confidential data, and those stay where they belong.",
      "Your answers and this report are yours. Share them with whoever you want.",
    ],
    pratenBody:
      "Want to know what it takes to get the first workflow from this report running? We are happy to talk it through. You are not tied to anything.",
    pratenCta: "Book a call",
    volgendeStapTitel: "The first step: the scan with your people",
    volgendeStapBody:
      "You have already mapped out where the work is. The next step is for your colleagues to do the same for their own department. That gives you the complete picture, and we don't start over.",
    volgendeStapCta: "Invite your team",
    keten: {
      bron: ["Your sources", "own systems", "via connection or export"],
      kennis: ["Company Brain", "owner · origin · date", "who may see what"],
      workflow: ["The workflow", "fixed steps", "at a fixed moment"],
      poort: ["Human gate", "someone on your side", "approves"],
      resultaat: ["Result", "overview · draft", "decision"],
      stap1: "1 · CAPTURE",
      stap2: "2 · SET UP",
      stap3: "3 · APPROVE",
      terug: "4 · review · 5 · grow: what gets approved feeds the Company Brain",
    },
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
            <h1 className="mt-2 font-serif text-3xl md:text-4xl leading-[1.15] text-grey">
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

  const topWorkflow = payload.ranglijst.hierZouIkBeginnen[0];

  // Sectie-opbouw: alleen wat er voor dít rapport is, doorlopend genummerd.
  const sections: { id: string; title: string; body: React.ReactNode }[] = [];

  sections.push({
    id: "gehoord",
    title: c.gehoord,
    body: <Prose text={payload.gehoord} />,
  });

  sections.push({
    id: "bekeken",
    title: c.bekeken,
    body: <Prose text={payload.bekeken} />,
  });

  sections.push({
    id: "ranglijst",
    title: c.ranglijst,
    body: (
      <>
        <h3 className="font-serif text-xl text-grey">{c.beginnen}</h3>
        <div className="mt-4 space-y-4">
          {payload.ranglijst.hierZouIkBeginnen.map((item, i) => (
            <TopWorkflowCard
              key={item.naam}
              item={item}
              c={c}
              // waarWeZoudenBeginnen is het veiligheidsargument voor het
              // startpunt en hoort IN de bovenste kaart (korte template).
              extraWaarom={i === 0 ? payload.waarWeZoudenBeginnen : undefined}
            />
          ))}
        </div>
        {payload.ranglijst.sterkeKandidaten.length > 0 && (
          <>
            <h3 className="mt-8 font-serif text-xl text-grey">{c.kandidaten}</h3>
            <ul className="mt-3 space-y-2.5">
              {payload.ranglijst.sterkeKandidaten.map((item) => (
                <li key={item.naam} className="text-grey/85 font-light leading-relaxed">
                  <span className="font-normal text-grey">{item.naam}.</span>{" "}
                  {item.waarDeKennisZit ?? item.watHetNuIs}
                </li>
              ))}
            </ul>
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
      </>
    ),
  });

  if (payload.watJeMensenZagen) {
    sections.push({
      id: "mensen",
      title: c.mensenZagen,
      body: <Prose text={payload.watJeMensenZagen} />,
    });
  }

  if (payload.zoZietHetEruit) {
    const ba = payload.zoZietHetEruit;
    sections.push({
      id: "ingericht",
      title: c.zoZietHetEruit,
      body: (
        <>
          <Prose text={c.zoZietHetEruitIntro} />
          <KetenVisual k={c.keten} caption={c.ketenCaption} />
          <div className="mt-4 rounded-lg border-l-[3px] border-sage bg-cream/70 px-5 py-3.5 text-[15px] text-grey/85 leading-relaxed">
            <span className="font-normal text-grey">{c.werkwijzeTitel}</span>{" "}
            {c.werkwijzeBody}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl p-6 bg-surface border border-sage-light">
              <h3 className="text-xs uppercase tracking-wide text-grey/45">
                {c.zoZietHetEruitNu}
              </h3>
              <ol className="mt-3 space-y-2 list-decimal pl-4">
                {ba.nu.map((stap) => (
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
                {ba.straks.map((item) => (
                  <li key={item.stap} className="text-grey/85 font-light leading-relaxed">
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
              <Prose text={ba.watErvoorNodigIs} />
            </div>
          </div>
          {payload.vanafNul ? (
            <div className="mt-8 rounded-xl border-2 border-sage bg-white px-6 py-6">
              <h3 className="font-serif text-lg font-normal text-grey">
                {c.vanafNul}
              </h3>
              {/* Geen inleiding meer. Die herhaalde de kop in langere
                  woorden en vroeg de lezer om terug te bladeren en te
                  vergelijken (Jorus 24-08). De kop draagt het zelf. */}
              <ol className="mt-4 space-y-2 list-decimal pl-4">
                {payload.vanafNul.keten.map((item) => (
                  <li
                    key={item.stap}
                    className="text-grey/85 font-light leading-relaxed"
                  >
                    {item.stap}
                  </li>
                ))}
              </ol>
              {/* Twee zinnen, geen kopjes. Kopjes maakten van dit blok een
                  eigen hoofdstukje en dat is precies wat het te lang maakte. */}
              <div className="mt-4">
                <Prose
                  text={
                    payload.vanafNul.watVerdwijnt ??
                    (payload.vanafNul.watErVerdwijnt ?? []).join(" ")
                  }
                />
                <Prose
                  text={
                    payload.vanafNul.watHetVraagt ??
                    payload.vanafNul.watErvoorNodigIs ??
                    ""
                  }
                />
              </div>
            </div>
          ) : null}
        </>
      ),
    });
  }

  if (payload.watDitToevoegt) {
    const av = payload.watDitToevoegt;
    sections.push({
      id: "toevoegt",
      title: c.toevoegt,
      body: (
        <>
          <Prose text={av.watErNuGoedGaat} />
          <ul className="mt-5 space-y-3">
            {(av.toevoegingen ?? []).map((item) => (
              <li key={item.toevoeging} className="text-grey/85 font-light leading-relaxed">
                · {item.toevoeging}
              </li>
            ))}
            {/* Opgeslagen rapporten van vóór 24-08 dragen nog grenzen. */}
            {!av.toevoegingen &&
              (av.grenzen ?? []).map((limit) => (
                <li key={limit.grens} className="text-grey/85 font-light leading-relaxed">
                  · {limit.grens}
                </li>
              ))}
          </ul>
          <div className="mt-5">
            <Prose text={av.watErvoorInDePlaatsKomt} />
          </div>
          {/* Het rechtenblok (kop, vier chips, alinea) is er 24-08 uit: eerst
              teruggebracht tot één zin, daarna helemaal, want die zin zei
              hetzelfde als watErvoorNodigIs hieronder. */}
          <div className="mt-4">
            <Prose text={av.watErvoorNodigIs} />
          </div>
        </>
      ),
    });
  }

  if (payload.kennisbeeld) {
    // Korte template: de systemenlijst vertelde de invuller de namen van zijn
    // eigen tools en dupliceerde "waar de kennis zit" uit de ranglijstkaarten.
    // Alleen het scherpe deel blijft: wat nergens staat.
    sections.push({
      id: "nergens",
      title: c.nergensStaat,
      body: (
        <>
          <Prose text={payload.kennisbeeld.observatie} />
          {payload.kennisbeeld.alleenInHoofden.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {payload.kennisbeeld.alleenInHoofden.map((line) => (
                <li key={line} className="text-grey/80 font-light leading-relaxed">
                  · {line}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    });
  }

  // Sectie "Vragen die je bedrijf straks zelf beantwoordt" is er 24-08 uit
  // gehaald (Jorus): te lang, te veel voorbeelden, en het bracht vooral onze
  // functionaliteit onder de aandacht in plaats van hun werk. Opgeslagen
  // rapporten dragen de velden nog wel; die tonen we ook niet meer.

  sections.push({
    id: "groeien",
    title: c.groeien,
    // jouwEigenBeeld staat WEL in de payload maar wordt bewust niet getoond:
    // het is de verankering waarop deze alinea is gebaseerd, geen citaat voor
    // de lezer (ingesproken antwoorden bevatten verhaspelingen).
    body: <Prose text={payload.waarJeInKuntGroeien} />,
  });

  sections.push({
    id: "gegevens",
    title: c.gegevens,
    body: (
      <>
        <ul className="space-y-2">
          {c.gegevensPunten.map((punt) => (
            <li key={punt} className="text-grey/80 font-light leading-relaxed">
              · {punt}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <Prose text={c.pratenBody} />
        </div>
        <Link
          href="/contact"
          className="mt-5 inline-block bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
        >
          {c.pratenCta}
        </Link>
        {/* Alleen bij een solo-rapport: de teamscan als volgende stap.
            Self-service: de knop opent het eigen teamoverzicht. */}
        {payload.scanVorm !== "team" && (
          <div className="mt-8 bg-surface rounded-xl p-6 md:p-8 border border-sage-light">
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
        )}
      </>
    ),
  });

  return (
    <section className="py-12 md:py-16 px-6 pb-20 md:pb-28">
      <div className="max-w-[760px] mx-auto">
        <FadeIn>
          <p className="text-sm text-sage uppercase tracking-wide">{c.reportLabel}</p>
          <h1 className="mt-2 font-serif text-3xl md:text-5xl leading-[1.15] text-grey">
            {scan.company_name}
          </h1>
          <p className="mt-4 text-lg font-light text-grey/70 leading-relaxed max-w-[640px]">
            {c.lede}
          </p>
        </FadeIn>

        {/* Kop-conclusie: het antwoord in vijftien seconden. */}
        {topWorkflow && (
          <FadeIn>
            <div className="mt-8 rounded-xl bg-sage-light border border-sage/40 p-6 md:p-7">
              <p className="text-xs uppercase tracking-wide text-sage-dark">
                {c.kortAntwoord}
              </p>
              <dl className="mt-3 space-y-2.5">
                <KickerRow label={c.beginBij} value={topWorkflow.naam} />
                <KickerRow label={c.kostNu} value={topWorkflow.watHetKost} />
                {payload.watErVerandert && (
                  <KickerRow label={c.verandert} value={payload.watErVerandert} />
                )}
              </dl>
            </div>
          </FadeIn>
        )}

        {/* Inhoudsopgave */}
        <FadeIn>
          <div className="mt-6 rounded-xl bg-surface border border-sage-light p-6 md:p-7">
            <p className="text-xs uppercase tracking-wide text-grey/45">{c.toc}</p>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id} className="text-[15px] font-light">
                  <a href={`#${s.id}`} className="text-grey/80 hover:text-sage-dark">
                    <span className="font-serif text-sage-dark inline-block w-6">
                      {i + 1}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        {sections.map((s, i) => (
          <FadeIn key={s.id}>
            <div id={s.id} className="mt-12 md:mt-16 scroll-mt-24">
              <p className="font-serif text-sage-dark text-sm">{i + 1}</p>
              <h2 className="mt-1 font-serif text-2xl md:text-3xl text-grey pb-3 border-b border-sage/30">
                {s.title}
              </h2>
              <div className="mt-5">{s.body}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function KickerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="sm:grid sm:grid-cols-[110px_1fr] sm:gap-4">
      <dt className="text-xs uppercase tracking-wide text-grey/50 pt-0.5">{label}</dt>
      <dd className="text-grey/90 font-light leading-relaxed">{value}</dd>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <p className="text-grey/80 font-light leading-relaxed whitespace-pre-line">{text}</p>
  );
}

/** De bovenste ranglijstkaart, met "waarom hier" als samengevoegd argument:
 * waarom dit zich leent + het veiligheidsargument (waarWeZoudenBeginnen). */
function TopWorkflowCard({
  item,
  c,
  extraWaarom,
}: {
  item: ReportWorkflowItem;
  c: (typeof staticCopy)["nl"];
  extraWaarom?: string;
}) {
  const waarom = [item.waaromDitZichLeent, extraWaarom].filter(Boolean).join(" ");
  const rows: Array<[string, string]> = [
    [c.watHetNuIs, item.watHetNuIs],
    [c.hoeVaakKost, `${item.hoeVaak} · ${item.watHetKost}. ${item.waarHetBlijftLiggen}`],
    ...(item.waarDeKennisZit
      ? ([[c.kennisZit, item.waarDeKennisZit]] as Array<[string, string]>)
      : []),
    [c.waaromHier, waarom],
  ];
  return (
    <div className="rounded-xl p-6 md:p-7 border bg-sage-light border-sage/40">
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

/** De ketenvisual: bronnen → Company Brain → workflow → menselijke poort
 * → resultaat, met de vijf stappen van de werkwijze als labels. Dit is de ENE
 * plek waar eigenaar/herkomst/datum wordt uitgeschreven (herhalingsregel). */
function KetenVisual({
  k,
  caption,
}: {
  k: (typeof staticCopy)["nl"]["keten"];
  caption: string;
}) {
  const boxes = [
    { x: 8, w: 168, lines: k.bron, accent: false, stap: null },
    { x: 216, w: 168, lines: k.kennis, accent: true, stap: k.stap1 },
    { x: 424, w: 168, lines: k.workflow, accent: false, stap: k.stap2 },
    { x: 632, w: 168, lines: k.poort, accent: false, stap: k.stap3 },
    { x: 840, w: 152, lines: k.resultaat, accent: false, stap: null },
  ];
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1000 190"
          width="100%"
          style={{ minWidth: 640 }}
          role="img"
          aria-label={caption}
        >
          <defs>
            <marker
              id="scan-arr"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#6F7C55" />
            </marker>
          </defs>
          <g fontSize="14" fill="#4A4A48">
            {boxes.map((b) => {
              const cx = b.x + b.w / 2;
              return (
                <g key={b.x}>
                  {b.stap && (
                    <text
                      x={cx}
                      y={34}
                      textAnchor="middle"
                      fontSize="10.5"
                      fill="#6F7C55"
                      letterSpacing="1"
                    >
                      {b.stap}
                    </text>
                  )}
                  <rect
                    x={b.x}
                    y={40}
                    width={b.w}
                    height={74}
                    rx={10}
                    fill={b.accent ? "#E4E8DA" : "#FAF7F2"}
                    stroke="#8B9A6B"
                    strokeOpacity={b.accent ? 0.7 : 0.55}
                  />
                  <text x={cx} y={68} textAnchor="middle" fontWeight={500}>
                    {b.lines[0]}
                  </text>
                  <text
                    x={cx}
                    y={88}
                    textAnchor="middle"
                    fontSize="11.5"
                    fill={b.accent ? "#6F7C55" : "#77756F"}
                  >
                    {b.lines[1]}
                  </text>
                  <text
                    x={cx}
                    y={103}
                    textAnchor="middle"
                    fontSize="11.5"
                    fill={b.accent ? "#6F7C55" : "#77756F"}
                  >
                    {b.lines[2]}
                  </text>
                </g>
              );
            })}
            {[176, 384, 592, 800].map((x) => (
              <line
                key={x}
                x1={x}
                y1={77}
                x2={x + 36}
                y2={77}
                stroke="#6F7C55"
                strokeWidth={1.6}
                markerEnd="url(#scan-arr)"
              />
            ))}
            <path
              d="M 916 114 L 916 152 L 300 152 L 300 122"
              fill="none"
              stroke="#6F7C55"
              strokeWidth={1.6}
              strokeDasharray="5 4"
              markerEnd="url(#scan-arr)"
            />
            <text
              x={608}
              y={145}
              textAnchor="middle"
              fontSize="12"
              fill="#6F7C55"
              fontStyle="italic"
            >
              {k.terug}
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-xs text-grey/50 tracking-wide">
        {caption}
      </figcaption>
    </figure>
  );
}
