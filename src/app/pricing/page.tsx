"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";

// ---------------------------------------------------------------------------
// PRIJZEN — één plek. Wijzig hier, de pagina en het schema volgen.
//
// Founder-besluit 4 + 7 + 10 aug 2026: een maandbedrag voor de Company Brain
// zonder setupfee (de oude EUR 12.495 eenmalig is vervallen), plus onderdelen
// die je per maand aanzet. De ladder Quick Start / Professional / AI Native is
// daarmee vervallen.
// ---------------------------------------------------------------------------
const PRIJS = {
  brain: { nl: "€1.495", en: "€1,495" },
  // Jorus 10 aug: "workflows tussen de 95 en 250, 245 moet dat dan worden".
  // Bovengrens op 245 gehouden, binnen de afgesproken band.
  workflowVan: { nl: "€95", en: "€95" },
  workflowTot: { nl: "€245", en: "€245" },
  // Uit de meeting van 4 aug; op 10 aug niet opnieuw genoemd.
  crm: { nl: "€249", en: "€249" },
  onderzoek: { nl: "€50", en: "€50" },
  onderzoekGroot: { nl: "€100", en: "€100" },
};

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel kost een Company Brain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `De Company Brain kost ${PRIJS.brain.nl} per maand. Er is geen setupbedrag: je betaalt vanaf de maand dat je begint. Daarbovenop kies je zelf wat je aanzet: een workflow kost ${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl} per maand, het CRM ${PRIJS.crm.nl} per maand, en een onderzoek ${PRIJS.onderzoek.nl} per stuk. Tokenkosten van je eigen AI-gebruik vallen daarbuiten.`,
      },
    },
    {
      "@type": "Question",
      name: "Zit er een setupbedrag of opstartfee aan vast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Er is geen eenmalig bedrag vooraf. Je begint met het maandbedrag voor de Company Brain en breidt uit wanneer je dat wilt. Alleen maatwerk-integraties met bestaande systemen worden apart geoffreerd.",
      },
    },
    {
      "@type": "Question",
      name: "Waarom kost de ene workflow meer dan de andere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Omdat de ene zwaarder is dan de andere. De prijs hangt af van welke onderdelen erin zitten en welke externe diensten hij gebruikt. Bij het ontwerp van de workflow zie je vooraf welke dat zijn en wat hij per maand kost, zodat je niet achteraf wordt verrast.",
      },
    },
    {
      "@type": "Question",
      name: "Zijn er extra kosten voor AI-gebruik?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. De tokenkosten voor het AI-gebruik zijn voor jouw rekening en vallen buiten het abonnement. Het abonnement dekt het platform, de Company Brain en de workflows.",
      },
    },
  ],
};

const pricingWebPage = webPage(
  "/pricing",
  "Prijzen: Company Brain en workflows",
  `De Company Brain kost ${PRIJS.brain.nl} per maand, zonder setupbedrag. Workflows, CRM en onderzoeken zet je erbij wanneer je ze nodig hebt.`,
);

const translations = {
  nl: {
    heroTitle: "Eerlijke prijzen",
    heroSub:
      "Eén maandbedrag voor de basis, en je breidt uit wanneer je er klaar voor bent. Geen setupbedrag, geen verplicht traject vooraf.",

    baseLabel: "De basis",
    baseName: "Company Brain",
    basePrice: PRIJS.brain.nl,
    basePer: "per maand",
    baseSetup: "Geen setupbedrag",
    baseBody:
      "De kennislaag van je bedrijf, en een persoonlijke assistent voor elke medewerker. Alles wat je daarna aanzet, put hieruit.",
    baseFeatures: [
      "Company Brain: de kennis van je bedrijf, vastgelegd en doorzoekbaar",
      "Een persoonlijke assistent voor iedereen, met bronvermelding bij elk antwoord",
      "Koppelingen met je bestaande systemen",
      "Onbeperkt gebruikers",
      "Maandelijks opzegbaar na de eerste drie maanden",
    ],
    baseCta: "Plan een gesprek",

    addonsLabel: "Wat je erbij kunt zetten",
    addons: [
      {
        name: "Workflow",
        price: `${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl}`,
        per: "per maand, per workflow",
        body: "Een workflow neemt één terugkerende klus over. Wat hij kost hangt af van de onderdelen en de externe diensten die hij gebruikt. Je ziet dat vooraf, bij het ontwerp.",
      },
      {
        name: "CRM",
        price: PRIJS.crm.nl,
        per: "per maand",
        body: "Bedrijven en personen in één overzicht, dat zichzelf bijwerkt vanuit gesprekken en mail. Koppelen met een bestaand CRM wordt apart geoffreerd.",
      },
      {
        name: "Onderzoek",
        price: PRIJS.onderzoek.nl,
        per: "per onderzoek",
        body: `Een vraag uitzetten bij je eigen mensen of je klanten, en er een bruikbaar antwoord uit krijgen. Boven de honderd respondenten wordt het ${PRIJS.onderzoekGroot.nl}.`,
      },
    ],

    notesTitle: "Wat er buiten valt",
    notes: [
      "Tokenkosten van je eigen AI-gebruik. Die rekenen we door tegen kostprijs, zonder opslag.",
      "Maatwerk-integraties met bestaande systemen. Die offreren we per geval, en altijd vooraf.",
    ],
    scanLine: "De AI Opportunity Scan is gratis en vrijblijvend.",

    faqTitle: "Veelgestelde vragen over prijzen",
    faqItems: [
      {
        question: "Zit er een setupbedrag aan vast?",
        answer:
          "Nee. Er is geen eenmalig bedrag vooraf. Je begint met het maandbedrag voor de Company Brain en breidt uit wanneer je dat wilt.",
      },
      {
        question: "Wat als ik halverwege wil stoppen?",
        answer:
          "Geen lock-in. Na de eerste drie maanden kun je maandelijks opzeggen.",
      },
      {
        question: "Waarom kost de ene workflow meer dan de andere?",
        answer:
          "Omdat de ene zwaarder is dan de andere. De prijs hangt af van welke onderdelen erin zitten en welke externe diensten hij gebruikt. Bij het ontwerp zie je vooraf welke dat zijn en wat hij per maand kost.",
      },
      {
        question: "Zijn er extra kosten voor AI-gebruik?",
        answer:
          "Ja. De tokenkosten voor je eigen gebruik vallen buiten het abonnement en rekenen we door tegen kostprijs. Het abonnement dekt het platform, de Company Brain en de workflows.",
      },
      {
        question: "Kan ik later uitbreiden?",
        answer:
          "Ja, op elk moment. Je Company Brain groeit gewoon mee, en alles wat je erbij zet put uit dezelfde kennis.",
      },
    ],
  },
  en: {
    heroTitle: "Honest pricing",
    heroSub:
      "One monthly fee for the base, and you expand when you are ready. No setup fee, no mandatory project up front.",

    baseLabel: "The base",
    baseName: "Company Brain",
    basePrice: PRIJS.brain.en,
    basePer: "per month",
    baseSetup: "No setup fee",
    baseBody:
      "Your company's knowledge layer, plus a personal assistant for every employee. Everything you switch on later draws on this.",
    baseFeatures: [
      "Company Brain: your company's knowledge, captured and searchable",
      "A personal assistant for everyone, with a source on every answer",
      "Connections to your existing systems",
      "Unlimited users",
      "Cancel monthly after the first three months",
    ],
    baseCta: "Book a call",

    addonsLabel: "What you can add",
    addons: [
      {
        name: "Workflow",
        price: `${PRIJS.workflowVan.en} to ${PRIJS.workflowTot.en}`,
        per: "per month, per workflow",
        body: "A workflow takes over one recurring job. What it costs depends on the parts it uses and the external services it calls. You see that up front, at design time.",
      },
      {
        name: "CRM",
        price: PRIJS.crm.en,
        per: "per month",
        body: "Companies and people in one overview that keeps itself up to date from conversations and email. Connecting an existing CRM is quoted separately.",
      },
      {
        name: "Research",
        price: PRIJS.onderzoek.en,
        per: "per study",
        body: `Put a question to your own people or your customers and get a usable answer back. Above a hundred respondents it becomes ${PRIJS.onderzoekGroot.en}.`,
      },
    ],

    notesTitle: "What falls outside",
    notes: [
      "Token costs for your own AI usage. We pass those on at cost, with no markup.",
      "Custom integrations with existing systems. Quoted per case, always up front.",
    ],
    scanLine: "The AI Opportunity Scan is free and without obligation.",

    faqTitle: "Frequently asked questions about pricing",
    faqItems: [
      {
        question: "Is there a setup fee?",
        answer:
          "No. There is no one-off amount up front. You start with the monthly fee for the Company Brain and expand when you want to.",
      },
      {
        question: "What if I want to stop halfway?",
        answer: "No lock-in. After the first three months you can cancel monthly.",
      },
      {
        question: "Why does one workflow cost more than another?",
        answer:
          "Because some are heavier than others. The price depends on the parts it uses and the external services it calls. At design time you see up front which those are and what it costs per month.",
      },
      {
        question: "Are there extra costs for AI usage?",
        answer:
          "Yes. Token costs for your own usage fall outside the subscription and are passed on at cost. The subscription covers the platform, the Company Brain and the workflows.",
      },
      {
        question: "Can I expand later?",
        answer:
          "Yes, at any time. Your Company Brain simply grows with you, and everything you add draws on the same knowledge.",
      },
    ],
  },
};

export default function PricingPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pricingWebPage, pricingFaqSchema]),
        }}
      />

      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The base */}
      <section className="px-6 pb-4">
        <div className="max-w-[820px] mx-auto">
          <FadeIn>
            <p className="text-sage text-sm font-medium tracking-wide uppercase text-center">
              {c.baseLabel}
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-4 bg-surface rounded-xl p-8 md:p-10 ring-2 ring-sage">
              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="md:flex-1">
                  <h2 className="font-serif text-2xl text-grey">{c.baseName}</h2>
                  <p className="mt-3 text-base font-light text-grey/80 leading-relaxed">
                    {c.baseBody}
                  </p>
                </div>
                <div className="mt-6 md:mt-0 md:text-right shrink-0">
                  <p className="text-4xl font-serif text-sage">{c.basePrice}</p>
                  <p className="text-sm text-grey/50">{c.basePer}</p>
                  <p className="mt-2 text-sm text-sage font-medium">
                    {c.baseSetup}
                  </p>
                </div>
              </div>
              <ul className="mt-8 space-y-2.5">
                {c.baseFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-grey/70 font-light"
                  >
                    <span className="text-sage mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 block text-center bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
              >
                {c.baseCta} →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <p className="text-sage text-sm font-medium tracking-wide uppercase text-center">
              {c.addonsLabel}
            </p>
          </FadeIn>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.addons.map((a, i) => (
              <FadeIn key={a.name} delay={150 + i * 120}>
                <div className="h-full bg-surface rounded-xl p-7 border border-sage-light flex flex-col">
                  <h3 className="font-serif text-xl text-grey">{a.name}</h3>
                  <p className="mt-4 text-2xl font-serif text-sage">{a.price}</p>
                  <p className="text-sm text-grey/50">{a.per}</p>
                  <p className="mt-4 flex-1 text-sm text-grey/70 font-light leading-relaxed">
                    {a.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={520}>
            <p className="text-center mt-8 text-sage text-sm font-medium">
              {c.scanLine}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What falls outside */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.notesTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <ul className="mt-8 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              {c.notes.map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="text-sage mt-1">·</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-10">
              {c.faqTitle}
            </h2>
          </FadeIn>
          <FAQ items={c.faqItems} />
        </div>
      </section>
    </>
  );
}
