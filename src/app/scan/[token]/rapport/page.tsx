import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getReportPayload, getScanBundle, saveReportPayload } from "@/lib/scan/db";
import {
  generateReportPayload,
  reportGenerationAvailable,
  type ReportPayload,
  type ReportWorkflowItem,
} from "@/lib/scan/report";
import type { AnswerMap } from "@/lib/scan/visibility";

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
      "Je antwoorden zijn binnen en veilig opgeslagen. Het rapport staat hier zodra het klaar is; deze pagina is en blijft jouw eigen link. Kom gerust later terug.",
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
    waarBeginnen: "Waar we zouden beginnen",
    uitzoeken: "Wat we voor je kunnen uitzoeken",
    groeien: "Waar je in kunt groeien",
    gegevens: "Hoe we met jullie gegevens omgaan",
    gegevensPunten: [
      "Er zijn geen bestanden of vertrouwelijke gegevens gevraagd, en die blijven waar ze horen.",
      "We hebben alleen naar het werk zelf gekeken.",
      "Jullie antwoorden en dit rapport zijn van jullie. Je kunt ze delen met wie je wilt.",
    ],
    praten: "Verder praten",
    pratenBody:
      "Wil je weten hoe dit er bij jullie uit zou zien? Laten we het erover hebben. Je kunt op elk moment stoppen.",
    pratenCta: "Plan een gesprek",
    volgendeStap: "De volgende stap",
    volgendeStapTitel: "De eerste stap: de scan met je mensen",
    volgendeStapBody:
      "Je hebt zelf al in kaart gebracht waar het werk zit. De volgende stap is dat je collega's hetzelfde doen voor hun eigen afdeling. Daarmee heb je het complete beeld, en beginnen we niet opnieuw.",
  },
  en: {
    reportLabel: "AI scan",
    pendingTitle: "Your report is being created",
    pendingBody:
      "Your answers are in and safely stored. The report will appear here as soon as it is ready; this page is and remains your personal link. Feel free to come back later.",
    gehoord: "What we heard from you",
    bekeken: "What we looked at",
    ranglijst: "The ranking",
    beginnen: "This is where I would start",
    kandidaten: "Strong candidates",
    later: "Interesting later",
    watHetNuIs: "What it is now",
    hoeVaak: "How often",
    watHetKost: "What it costs",
    blijftLiggen: "Where it gets stuck",
    leentZich: "Why this lends itself",
    misgaat: "If something goes wrong",
    waarBeginnen: "Where we would start",
    uitzoeken: "What we can look into for you",
    groeien: "Where you can grow",
    gegevens: "How we handle your data",
    gegevensPunten: [
      "We did not ask for files or confidential data, and those stay where they belong.",
      "We only looked at the work itself.",
      "Your answers and this report are yours. Share them with whoever you want.",
    ],
    praten: "Talking further",
    pratenBody:
      "Want to know what this would look like for your company? Let's talk about it. You can stop at any moment.",
    pratenCta: "Book a call",
    volgendeStap: "The next step",
    volgendeStapTitel: "The first step: the scan with your people",
    volgendeStapBody:
      "You have already mapped out where the work is. The next step is for your colleagues to do the same for their own department. That gives you the complete picture, and we don't start over.",
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
  const { scan, answers } = bundle;
  if (scan.status !== "afgerond") redirect(`/scan/${token}`);

  let payload = (await getReportPayload(scan.id)) as ReportPayload | null;

  // Zelfherstellend: was er bij het afronden nog geen sleutel, dan wordt het
  // rapport bij het eerste bezoek alsnog gemaakt en bewaard.
  if (!payload && reportGenerationAvailable()) {
    try {
      const answerMap: AnswerMap = new Map(
        answers.map((row) => [row.question_id, row.value ?? ""]),
      );
      payload = await generateReportPayload({
        companyName: scan.company_name,
        contactName: scan.contact_name,
        answers: answerMap,
        language: "nl",
      });
      await saveReportPayload(scan.id, payload);
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

        <ReportSection title={c.waarBeginnen}>
          <Prose text={payload.waarWeZoudenBeginnen} />
        </ReportSection>

        {payload.uitzoeksuggesties.length > 0 && (
          <ReportSection title={c.uitzoeken}>
            <ul className="space-y-2">
              {payload.uitzoeksuggesties.map((line) => (
                <li key={line} className="text-grey/80 font-light leading-relaxed">
                  · {line}
                </li>
              ))}
            </ul>
          </ReportSection>
        )}

        <ReportSection title={c.groeien}>
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

        <ReportSection title={c.volgendeStap}>
          <div className="bg-surface rounded-xl p-6 md:p-8 border border-sage-light">
            <h3 className="font-serif text-xl text-grey">{c.volgendeStapTitel}</h3>
            <p className="mt-3 text-grey/80 font-light leading-relaxed">
              {c.volgendeStapBody}
            </p>
          </div>
        </ReportSection>
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
    [c.leentZich, item.waaromDitZichLeent],
    [c.misgaat, item.alsErIetsMisgaat],
  ];
  return (
    <div
      className={`rounded-xl p-6 md:p-7 border ${
        primary ? "bg-sage-light border-sage/40" : "bg-surface border-sage-light"
      }`}
    >
      <h4 className="font-serif text-lg text-grey">{item.naam}</h4>
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
