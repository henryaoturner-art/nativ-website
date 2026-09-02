"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";

// ---------------------------------------------------------------------------
// PRIJZEN — één plek. Wijzig hier, de pagina en het JSON-LD volgen.
//
// Bron: gtm/positioning/open-beslissingen-2026-08-07.md, besluit O13 (alle
// prijzen publiek), plus O2/O4/O7/O10/O11/O12 voor de voorwaarden eromheen.
// De oude ladder Quick Start / Professional / AI Native is vervallen (O5, O11).
//
// Afwijking van O13, op aanwijzing van Jorus 10 aug: de bovengrens van de
// workflow-range stond daar op 250 en gaat naar 245. De ondergrens blijft 75.
// ---------------------------------------------------------------------------
const PRIJS = {
  brain: { nl: "€1.495", en: "€1,495" },
  crmKoppeling: { nl: "€495", en: "€495" },
  workflowVan: { nl: "€75", en: "€75" },
  workflowTot: { nl: "€245", en: "€245" },
  studie: { nl: "€50", en: "€50" },
  studieGroot: { nl: "€100", en: "€100" },
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
        text: `De Company Brain kost ${PRIJS.brain.nl} per maand, voor elk bedrijf hetzelfde. Er zijn geen instapkosten en er is geen minimale looptijd; de opzegtermijn is één maand. Daarbovenop kies je zelf wat je aanzet: een workflow kost ${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl} per maand en een studie ${PRIJS.studie.nl}.`,
      },
    },
    {
      "@type": "Question",
      name: "Zijn er eenmalige kosten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Er zijn er precies twee, en niet meer. Een koppeling met je bestaande CRM kost ${PRIJS.crmKoppeling.nl} eenmalig. En een echte maatwerkbouw, iets dat nog niet bestaat, offreren we apart. Verder betaal je alleen het maandbedrag.`,
      },
    },
    {
      "@type": "Question",
      name: "Waarom kost de ene workflow meer dan de andere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Omdat een workflow met externe diensten werkt en soms moet koppelen met een ander systeem. Dat verschilt per workflow, en het zit in de maandprijs verwerkt. Bij het ontwerp zie je vooraf wat jouw workflow per maand kost, dus je wordt niet achteraf verrast.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe snel kan ik beginnen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zodra je tekent zetten wij je Company Brain op, en daarna kun je meteen aan de slag. Workflows volgen hun eigen route: intake, ontwerp, prijs.",
      },
    },
    {
      "@type": "Question",
      name: "Wat gebeurt er met mijn gegevens als ik stop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je krijgt beide databases mee: de gestructureerde data en de doorzoekbare opslag. Wat we er eerlijk bij zeggen: vanaf het moment dat je weggaat, wordt er niets meer onderhouden.",
      },
    },
  ],
};

const pricingWebPage = webPage(
  "/pricing",
  "Prijzen: Company Brain, workflows en studies",
  `De Company Brain kost ${PRIJS.brain.nl} per maand, voor elk bedrijf hetzelfde. Geen instapkosten, één maand opzegtermijn. Workflows en studies zet je erbij wanneer je ze nodig hebt.`,
);

const translations = {
  nl: {
    heroTitle: "Eerlijke prijzen",
    heroSub:
      "Alles staat hier gewoon op. Eén maandbedrag voor de basis, en je breidt uit wanneer je er klaar voor bent.",

    baseLabel: "De basis",
    baseName: "Company Brain",
    basePrice: PRIJS.brain.nl,
    basePer: "per maand",
    baseNote: "Zelfde bedrag voor elk bedrijf",
    baseBody:
      "De kennislaag van je bedrijf, met een persoonlijke assistent voor elke medewerker. Alles wat je daarna aanzet, put hieruit.",
    baseFeatures: [
      "De kennis van je bedrijf, vastgelegd en doorzoekbaar",
      "Een persoonlijke assistent voor iedereen, met bronvermelding bij elk antwoord",
      "Een eigen CRM: klanten en contacten in één overzicht, dat zichzelf bijwerkt",
      "Koppeling met je eigen AI: Claude, ChatGPT of een ander model, inbegrepen",
      "Onbeperkt gebruikers",
      "Geen minimale looptijd, één maand opzegtermijn",
    ],
    baseFairUse:
      "Er zit een grens aan hoeveel je in je Company Brain kunt zetten. Ga je daaroverheen, dan kost het ons meer om te draaien en rekenen we dat door. Je hoort het van ons voordat het zover is.",
    baseCta: "Plan een gesprek",

    addonsLabel: "Wat je erbij kunt zetten",
    addons: [
      {
        name: "Workflow",
        price: `${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl}`,
        per: "per maand, per workflow",
        body: "Een workflow neemt één terugkerende klus over. Het is een range omdat een workflow met externe diensten werkt en soms moet koppelen met een ander systeem. Bij het ontwerp zie je wat die van jou kost.",
      },
      {
        name: "Studie",
        price: PRIJS.studie.nl,
        per: "per studie",
        body: `Een vraag uitzetten bij je eigen mensen of je klanten, en er een bruikbaar antwoord uit krijgen. Boven de honderd respondenten wordt het ${PRIJS.studieGroot.nl}. De uitkomsten landen in je Company Brain.`,
      },
      {
        name: "Maatwerk",
        price: "Op aanvraag",
        per: "",
        body: "Iets dat nog niet bestaat en echt gebouwd moet worden. We offreren dat apart, en altijd vooraf.",
      },
    ],

    oneOffTitle: "Precies twee eenmalige bedragen",
    oneOffIntro:
      "Geen instapkosten betekent bij ons niet dat er nooit een eenmalig bedrag is. Er zijn er twee, en niet meer:",
    oneOffs: [
      {
        label: "Koppeling met je bestaande CRM",
        value: PRIJS.crmKoppeling.nl,
        body: "De CRM-functionaliteit zelf zit in de Company Brain. Wil je die koppelen aan het CRM dat je nu gebruikt, dan kost die koppeling eenmalig dit bedrag.",
      },
      {
        label: "Een echte maatwerkbouw",
        value: "Op aanvraag",
        body: "Iets dat er nog niet is en speciaal voor jou gebouwd wordt. Dat offreren we vooraf, zodat je weet waar je aan toe bent.",
      },
    ],

    whyTitle: "Hoe het werkt",
    whyBody: [
      "Je betaalt per maand in plaats van vooraf. Zo kun je op elk moment stoppen wanneer je dat wilt.",
      "Wij zetten de Brain voor je op. Daarna vul jij hem met wat jullie weten, houd je hem bij en bepaal je zelf welke workflows erbij komen. Wij zorgen dat dat kan zonder dat je er technisch iets voor hoeft te kunnen.",
    ],

    exitTitle: "Als je weggaat",
    exitBody:
      "Dan krijg je beide databases mee: de gestructureerde data en de doorzoekbare opslag. Geen gedoe, geen onderhandeling. Wat we er eerlijk bij zeggen: vanaf dat moment wordt er niets meer onderhouden.",

    scanLine: "De AI-scan is gratis en vrijblijvend.",

    faqTitle: "Veelgestelde vragen over prijzen",
    faqItems: [
      {
        question: "Zijn er instapkosten?",
        answer:
          "Nee. Je begint met het maandbedrag voor de Company Brain. Er zijn precies twee eenmalige bedragen, en die staan hierboven: de koppeling met een bestaand CRM, en een echte maatwerkbouw.",
      },
      {
        question: "Zit ik ergens aan vast?",
        answer:
          "Nee. Er is geen minimale looptijd en de opzegtermijn is één maand.",
      },
      {
        question: "Betaal ik meer als we met meer mensen zijn?",
        answer:
          "Nee. Het bedrag is voor elk bedrijf hetzelfde, of je nu met vijf of met driehonderd bent. Wat wel meetelt is hoeveel je erin zet. Daar zit een grens aan, want boven die grens kost het ons meer om te draaien en rekenen we dat door. Met driehonderd mensen bereik je die grens sneller dan met vijf, en je hoort het van ons voordat het zover is.",
      },
      {
        question: "Waarom kost de ene workflow meer dan de andere?",
        answer:
          "Omdat een workflow met externe diensten werkt en soms moet koppelen met een ander systeem. Dat verschilt per workflow en het zit in de maandprijs verwerkt. Bij het ontwerp zie je wat die van jou kost.",
      },
      {
        question: "Hoe snel kan ik beginnen?",
        answer:
          "Zodra je tekent zetten wij je Company Brain op, en daarna kun je meteen aan de slag. Workflows volgen hun eigen route: intake, ontwerp, prijs.",
      },
      {
        question: "Wat gebeurt er met mijn gegevens als ik stop?",
        answer:
          "Je krijgt beide databases mee: de gestructureerde data en de doorzoekbare opslag. Vanaf het moment dat je weggaat wordt er niets meer onderhouden, en dat zeggen we er liever meteen bij.",
      },
    ],
  },
  en: {
    heroTitle: "Honest pricing",
    heroSub:
      "It is all simply listed here. One monthly fee for the base, and you expand when you are ready.",

    baseLabel: "The base",
    baseName: "Company Brain",
    basePrice: PRIJS.brain.en,
    basePer: "per month",
    baseNote: "Same price for every company",
    baseBody:
      "Your company's knowledge layer, with a personal assistant for every employee. Everything you switch on later draws on this.",
    baseFeatures: [
      "Your company's knowledge, captured and searchable",
      "A personal assistant for everyone, with a source on every answer",
      "A CRM of your own: customers and contacts in one overview that keeps itself up to date",
      "A connection to your own AI: Claude, ChatGPT or another model, included",
      "Unlimited users",
      "No minimum term, one month's notice",
    ],
    baseFairUse:
      "There is a limit to how much you can put into your Company Brain. Go beyond it and it costs us more to run, and we pass that on. You hear from us before you get there.",
    baseCta: "Book a call",

    addonsLabel: "What you can add",
    addons: [
      {
        name: "Workflow",
        price: `${PRIJS.workflowVan.en} to ${PRIJS.workflowTot.en}`,
        per: "per month, per workflow",
        body: "A workflow takes over one recurring job. It is a range because a workflow calls external services and sometimes has to connect to another system. At design time you see what yours costs.",
      },
      {
        name: "Study",
        price: PRIJS.studie.en,
        per: "per study",
        body: `Put a question to your own people or your customers and get a usable answer back. Above a hundred respondents it becomes ${PRIJS.studieGroot.en}. The findings land in your Company Brain.`,
      },
      {
        name: "Custom build",
        price: "On request",
        per: "",
        body: "Something that does not exist yet and genuinely has to be built. We quote that separately, and always up front.",
      },
    ],

    oneOffTitle: "Exactly two one-off amounts",
    oneOffIntro:
      "No setup cost does not mean there is never a one-off amount. There are two, and no more:",
    oneOffs: [
      {
        label: "Connecting your existing CRM",
        value: PRIJS.crmKoppeling.en,
        body: "The CRM functionality itself is part of the Company Brain. If you want it connected to the CRM you use today, that connection costs this once.",
      },
      {
        label: "A genuine custom build",
        value: "On request",
        body: "Something that does not exist yet and gets built for you. We quote that up front, so you know where you stand.",
      },
    ],

    whyTitle: "How it works",
    whyBody: [
      "You pay per month instead of up front. That way you can stop whenever you want.",
      "We set the Brain up for you. After that you fill it with what your company knows, you keep it current, and you decide which workflows come next. We make sure you can do that without needing technical skills.",
    ],

    exitTitle: "If you leave",
    exitBody:
      "You take both databases with you: the structured data and the searchable store. No hassle, no negotiation. What we say honestly alongside that: from that moment on, nothing is maintained any more.",

    scanLine: "The AI scan is free and without obligation.",

    faqTitle: "Frequently asked questions about pricing",
    faqItems: [
      {
        question: "Are there setup costs?",
        answer:
          "No. You start with the monthly fee for the Company Brain. There are exactly two one-off amounts, listed above: connecting an existing CRM, and a genuine custom build.",
      },
      {
        question: "Am I tied in?",
        answer: "No. There is no minimum term and the notice period is one month.",
      },
      {
        question: "Do I pay more if we have more people?",
        answer:
          "No. The price is the same for every company, whether you are five or three hundred. What does count is how much you put into it. There is a limit to that, because beyond it running the Brain costs us more and we pass that on. With three hundred people you reach that limit sooner than with five, and you hear from us before you get there.",
      },
      {
        question: "Why does one workflow cost more than another?",
        answer:
          "Because a workflow calls external services and sometimes has to connect to another system. That differs per workflow and it is built into the monthly price. At design time you see what yours costs.",
      },
      {
        question: "How quickly can I start?",
        answer:
          "Once you sign we set up your Company Brain, and you can get going straight after. Workflows then follow their own route: intake, design, price.",
      },
      {
        question: "What happens to my data if I stop?",
        answer:
          "You take both databases with you: the structured data and the searchable store. From the moment you leave nothing is maintained any more, and we would rather say that up front.",
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
                    {c.baseNote}
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
              <p className="mt-6 text-sm text-grey/50 font-light leading-relaxed">
                {c.baseFairUse}
              </p>
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
                  {a.per && <p className="text-sm text-grey/50">{a.per}</p>}
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

      {/* Exactly two one-off amounts */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.oneOffTitle}
            </h2>
            <p className="mt-5 text-lg font-light text-grey/70 leading-relaxed">
              {c.oneOffIntro}
            </p>
          </FadeIn>
          <div className="mt-8 space-y-4">
            {c.oneOffs.map((o, i) => (
              <FadeIn key={o.label} delay={150 + i * 120}>
                <div className="bg-surface rounded-xl p-6 border-l-[3px] border-sage">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-lg text-grey">{o.label}</h3>
                    <p className="font-serif text-xl text-sage shrink-0">
                      {o.value}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-grey/70 font-light leading-relaxed">
                    {o.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why this can be affordable */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.whyTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              {c.whyBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* If you leave */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <div className="bg-surface rounded-xl p-6 md:p-8 border-l-[3px] border-sage">
              <h2 className="font-serif text-xl text-grey">{c.exitTitle}</h2>
              <p className="mt-3 text-base text-grey/70 font-light leading-relaxed">
                {c.exitBody}
              </p>
            </div>
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
