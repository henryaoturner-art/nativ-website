"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";
import { Check } from "lucide-react";

// ---------------------------------------------------------------------------
// PRIJZEN — één plek. Wijzig hier, de pagina en het JSON-LD volgen.
//
// Bron: gtm/positioning/open-beslissingen-2026-08-07.md, besluit O13 (alle
// prijzen publiek), plus O2/O4/O7/O10/O11/O12 voor de voorwaarden eromheen.
// De oude ladder Quick Start / Professional / AI Native is vervallen (O5, O11).
//
// Afwijking van O13, op aanwijzing van Jorus 10 aug: de bovengrens van de
// workflow-range stond daar op 250 en gaat naar 245. De ondergrens ging op
// aanwijzing van Jorus 2 sep van 75 naar 25. De bandbreedte wordt in KAN-411
// tegen de Brain gecheckt (C7, KAN-425); hier niet veranderen.
//
// Opbouw van de pagina: deel C van de website-ronde (KAN-425, 10 sep 2026):
// alle bedragen in het eerste scherm, dan wat erin zit, een rekenvoorbeeld,
// hoe het werkt, en de FAQ in twee kolommen. De FAQPage-JSON-LD wordt uit
// dezelfde FAQ-array gemaakt als de zichtbare vragen.
// ---------------------------------------------------------------------------
const PRIJS = {
  brain: { nl: "€1.495", en: "€1,495" },
  crmKoppeling: { nl: "€495", en: "€495" },
  workflowVan: { nl: "€25", en: "€25" },
  workflowTot: { nl: "€245", en: "€245" },
  // Studies staan sinds 3 sep NIET op de site: de tool is nog niet af en
  // getest, en de prijsstelling ligt nog open (Jorus). Bedragen hier bewaard
  // zodat terugzetten één plek is.
  studie: { nl: "€50", en: "€50" },
  studieGroot: { nl: "€100", en: "€100" },
};

// Rekenvoorbeeld (beslisblad C4, optie A): twee voorbeeldworkflows binnen elke
// bandbreedte die in omloop is. 1495 + 125 + 175 = 1795.
const VOORBEELD = { brain: 1495, workflow1: 125, workflow2: 175 };
const VOORBEELD_TOTAAL = VOORBEELD.brain + VOORBEELD.workflow1 + VOORBEELD.workflow2;
const euro = (n: number, lang: "nl" | "en") => (lang === "nl" ? `€${n.toLocaleString("nl-NL")}` : `€${n.toLocaleString("en-US")}`);

const translations = {
  nl: {
    heroTitle: "Eerlijke prijzen",
    heroSub:
      "Alles staat hier gewoon op. Eén maandbedrag voor de basis, en je breidt uit wanneer je er klaar voor bent.",

    scan: { kicker: "Om te beginnen", name: "AI-scan", price: "€0", per: "gratis en vrijblijvend", cta: "Doe de gratis AI-scan" },
    base: {
      kicker: "De basis",
      name: "Company Brain",
      price: PRIJS.brain.nl,
      per: "per maand",
      note: "Zelfde bedrag voor elk bedrijf",
      body: "De kennislaag van je bedrijf. Alles wat AI voor je maakt, is hierop gebaseerd.",
      cta: "Plan een gesprek",
    },
    workflow: {
      kicker: "Wat je erbij kunt zetten",
      name: "Workflow",
      price: `${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl}`,
      per: "per maand, per workflow",
      body: "Een workflow neemt één terugkerende klus over. Bij het ontwerp zie je wat die van jou kost.",
      cta: "Bekijk de workflows",
    },
    oneOff: { label: "Eenmalig, alleen als je je bestaande CRM koppelt", value: PRIJS.crmKoppeling.nl },

    includedTitle: "Wat zit erin",
    inBrainTitle: "In de Company Brain",
    baseFeatures: [
      "De kennis van je bedrijf, vastgelegd en doorzoekbaar",
      "Toegang tot het Company Brain voor iedereen in het bedrijf, met bronvermelding bij elk antwoord",
      "Een eigen CRM: klanten en contacten in één overzicht, dat zichzelf bijwerkt",
      "Koppeling met je eigen AI: Claude, ChatGPT of een ander model, inbegrepen",
      "Onbeperkt gebruikers",
      "Geen minimale looptijd, één maand opzegtermijn",
    ],
    fairUse: "Er zit een grens aan hoeveel je in je Company Brain kunt zetten. Je hoort het van ons voordat het zover is.",
    addonsTitle: "Erbij",
    addons: [
      {
        label: `Workflow, ${PRIJS.workflowVan.nl} tot ${PRIJS.workflowTot.nl} per maand`,
        body: "Het is een range omdat een workflow met externe diensten werkt en soms moet koppelen met een ander systeem. Bij het ontwerp zie je wat die van jou kost.",
      },
      {
        label: `Koppeling met je bestaande CRM, ${PRIJS.crmKoppeling.nl} eenmalig`,
        body: "De CRM-functionaliteit zelf zit in de Company Brain. Wil je die koppelen aan het CRM dat je nu gebruikt, dan kost die koppeling eenmalig dit bedrag. Wat je ervoor terugkrijgt: je gesprekken en je e-mails komen vanzelf bij de juiste persoon en het juiste bedrijf te staan. Bij elke klant zie je zo wat er speelt, zonder dat iemand het overtypt.",
      },
    ],

    exampleTitle: "Rekenvoorbeeld",
    exampleIntro: "Een bedrijf dat met de Company Brain begint en er twee workflows bij zet:",
    exampleRows: [
      { label: "Company Brain", value: VOORBEELD.brain },
      { label: "Workflow 1 (bijvoorbeeld)", value: VOORBEELD.workflow1 },
      { label: "Workflow 2 (bijvoorbeeld)", value: VOORBEELD.workflow2 },
    ],
    exampleTotal: "Per maand",
    exampleNote:
      "Geen instapkosten. Koppel je een bestaand CRM, dan komt daar eenmalig €495 bij. De workflowbedragen zijn voorbeelden: de prijs van jouw workflow zie je bij het ontwerp.",

    howTitle: "Hoe het werkt",
    how: [
      { title: "Per maand, niet vooraf", body: "Je betaalt per maand in plaats van vooraf. Zo kun je op elk moment stoppen wanneer je dat wilt." },
      { title: "Wij zetten op, jij vult", body: "Wij zetten de Brain voor je op. Daarna vul jij hem met wat jullie weten, houd je hem bij en bepaal je zelf welke workflows erbij komen. Wij zorgen dat dat kan zonder dat je er technisch iets voor hoeft te kunnen." },
      { title: "Als je weggaat", body: "Dan krijg je beide databases mee: de gestructureerde data en de doorzoekbare opslag. Geen gedoe, geen onderhandeling. Wat we er eerlijk bij zeggen: vanaf dat moment wordt er niets meer onderhouden." },
    ],

    faqTitle: "Veelgestelde vragen over prijzen",
    faqItems: [
      { question: "Zijn er instapkosten?", answer: "Nee. Je begint met het maandbedrag voor de Company Brain. Er is één eenmalig bedrag, en dat staat hierboven: de koppeling met een bestaand CRM." },
      { question: "Zit ik ergens aan vast?", answer: "Nee. Er is geen minimale looptijd en de opzegtermijn is één maand." },
      { question: "Betaal ik meer als we met meer mensen zijn?", answer: "Nee. Het bedrag is voor elk bedrijf hetzelfde, of je nu met vijf of met driehonderd bent. Wat wel meetelt is hoeveel je erin zet. Daar zit een grens aan, want boven die grens kost het ons meer om te draaien en rekenen we dat door. Met driehonderd mensen bereik je die grens sneller dan met vijf, en je hoort het van ons voordat het zover is." },
      { question: "En als een workflow iets nodig heeft dat er nog niet is?", answer: "Dan bouwen we dat erbij. Het blijft daarna een gewone workflow, met een gewoon maandbedrag. Elke workflow krijgt na het ontwerp een prijs die je ziet voordat je ja zegt, dus je komt nooit voor een verrassing te staan." },
      { question: "Waarom kost de ene workflow meer dan de andere?", answer: "Omdat een workflow met externe diensten werkt en soms moet koppelen met een ander systeem. Dat verschilt per workflow en het zit in de maandprijs verwerkt. Bij het ontwerp zie je wat die van jou kost." },
      { question: "Hoe snel kan ik beginnen?", answer: "Zodra je tekent zetten wij je Company Brain op, en daarna kun je meteen aan de slag. Workflows volgen hun eigen route: intake, ontwerp, prijs." },
    ],
    closeCta: "Plan een gesprek",
    closeLink: "Doe de gratis AI-scan",
  },
  en: {
    heroTitle: "Honest pricing",
    heroSub: "It is all simply listed here. One monthly fee for the base, and you expand when you are ready.",

    scan: { kicker: "To start", name: "AI scan", price: "€0", per: "free and without obligation", cta: "Take the free AI scan" },
    base: {
      kicker: "The base",
      name: "Company Brain",
      price: PRIJS.brain.en,
      per: "per month",
      note: "Same price for every company",
      body: "Your company's knowledge layer. Everything AI makes for you is based on it.",
      cta: "Book a call",
    },
    workflow: {
      kicker: "What you can add",
      name: "Workflow",
      price: `${PRIJS.workflowVan.en} to ${PRIJS.workflowTot.en}`,
      per: "per month, per workflow",
      body: "A workflow takes over one recurring job. At design time you see what yours costs.",
      cta: "See the workflows",
    },
    oneOff: { label: "One-off, only if you connect your existing CRM", value: PRIJS.crmKoppeling.en },

    includedTitle: "What is included",
    inBrainTitle: "In the Company Brain",
    baseFeatures: [
      "Your company's knowledge, captured and searchable",
      "Access to the Company Brain for everyone in the company, with a source on every answer",
      "A CRM of your own: customers and contacts in one overview that keeps itself up to date",
      "A connection to your own AI: Claude, ChatGPT or another model, included",
      "Unlimited users",
      "No minimum term, one month's notice",
    ],
    fairUse: "There is a limit to how much you can put into your Company Brain. You hear from us before you get there.",
    addonsTitle: "Add-ons",
    addons: [
      {
        label: `Workflow, ${PRIJS.workflowVan.en} to ${PRIJS.workflowTot.en} per month`,
        body: "It is a range because a workflow calls external services and sometimes has to connect to another system. At design time you see what yours costs.",
      },
      {
        label: `Connecting your existing CRM, ${PRIJS.crmKoppeling.en} one-off`,
        body: "The CRM functionality itself is part of the Company Brain. If you want it connected to the CRM you use today, that connection costs this once. What you get for it: your meetings and your emails end up with the right person and the right company on their own. For every customer you can see what is going on, without anyone retyping it.",
      },
    ],

    exampleTitle: "A worked example",
    exampleIntro: "A company that starts with the Company Brain and adds two workflows:",
    exampleRows: [
      { label: "Company Brain", value: VOORBEELD.brain },
      { label: "Workflow 1 (for example)", value: VOORBEELD.workflow1 },
      { label: "Workflow 2 (for example)", value: VOORBEELD.workflow2 },
    ],
    exampleTotal: "Per month",
    exampleNote:
      "No setup cost. If you connect an existing CRM, €495 is added once. The workflow amounts are examples: you see the price of your workflow at design time.",

    howTitle: "How it works",
    how: [
      { title: "Per month, not up front", body: "You pay per month instead of up front. That way you can stop whenever you want." },
      { title: "We set up, you fill", body: "We set the Brain up for you. After that you fill it with what your company knows, you keep it current, and you decide which workflows come next. We make sure you can do that without needing technical skills." },
      { title: "If you leave", body: "You take both databases with you: the structured data and the searchable store. No hassle, no negotiation. What we say honestly alongside that: from that moment on, nothing is maintained any more." },
    ],

    faqTitle: "Frequently asked questions about pricing",
    faqItems: [
      { question: "Are there setup costs?", answer: "No. You start with the monthly fee for the Company Brain. There is one one-off amount, listed above: connecting an existing CRM." },
      { question: "Am I tied in?", answer: "No. There is no minimum term and the notice period is one month." },
      { question: "Do I pay more if we have more people?", answer: "No. The price is the same for every company, whether you are five or three hundred. What does count is how much you put into it. There is a limit to that, because beyond it running the Brain costs us more and we pass that on. With three hundred people you reach that limit sooner than with five, and you hear from us before you get there." },
      { question: "What if a workflow needs something that does not exist yet?", answer: "Then we build it. After that it is a normal workflow with a normal monthly price. Every workflow gets a price after the design, and you see it before you say yes, so nothing comes as a surprise." },
      { question: "Why does one workflow cost more than another?", answer: "Because a workflow calls external services and sometimes has to connect to another system. That differs per workflow and it is built into the monthly price. At design time you see what yours costs." },
      { question: "How quickly can I start?", answer: "Once you sign we set up your Company Brain, and you can get going straight after. Workflows then follow their own route: intake, design, price." },
    ],
    closeCta: "Book a call",
    closeLink: "Take the free AI scan",
  },
};

// C6: de FAQPage-JSON-LD komt uit dezelfde array als de zichtbare vragen.
const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.nl.faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const pricingWebPage = webPage(
  "/pricing",
  "Prijzen: Company Brain en AI-workflows",
  `De Company Brain kost ${PRIJS.brain.nl} per maand, voor elk bedrijf hetzelfde. Geen instapkosten, één maand opzegtermijn. Workflows zet je erbij wanneer je ze nodig hebt.`,
);

const priceCls = "font-serif text-[40px] leading-none text-sage-dark";

export default function PricingPage() {
  const { t, language } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Gestructureerde data alleen op de Nederlandse route: de teksten erin zijn Nederlands. */}
      {language === "nl" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([pricingWebPage, pricingFaqSchema]) }}
        />
      )}

      {/* C1: kop en prijsoverzicht in één scherm */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">{c.heroTitle}</h1>
          <p className="mt-4 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_1.35fr_1fr] gap-4 md:gap-6 items-stretch">
            <Card className="flex flex-col">
              <Kicker>{c.scan.kicker}</Kicker>
              <h3 className="font-serif text-grey">{c.scan.name}</h3>
              <p className={`mt-4 ${priceCls}`}>{c.scan.price}</p>
              <p className="mt-2 text-sm text-muted">{c.scan.per}</p>
              <div className="mt-auto pt-6">
                <Button variant="tertiary" href="/scan">{c.scan.cta}</Button>
              </div>
            </Card>
            <Card signature primary className="flex flex-col">
              <Kicker>{c.base.kicker}</Kicker>
              <h3 className="font-serif text-grey text-[28px] leading-[1.2]">{c.base.name}</h3>
              <p className={`mt-4 ${priceCls}`}>{c.base.price}</p>
              <p className="mt-2 text-sm text-muted">{c.base.per}</p>
              <p className="text-sm text-muted">{c.base.note}</p>
              <p className="mt-4 text-grey leading-relaxed">{c.base.body}</p>
              <div className="mt-auto pt-6">
                <Button href="/contact">{c.base.cta}</Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <Kicker>{c.workflow.kicker}</Kicker>
              <h3 className="font-serif text-grey">{c.workflow.name}</h3>
              <p className={`mt-4 ${priceCls}`}>{c.workflow.price}</p>
              <p className="mt-2 text-sm text-muted">{c.workflow.per}</p>
              <p className="mt-4 text-grey leading-relaxed">{c.workflow.body}</p>
              <div className="mt-auto pt-6">
                <Button variant="tertiary" href="/workflows">{c.workflow.cta}</Button>
              </div>
            </Card>
          </div>
          <Card signature className="mt-4 md:mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-grey">{c.oneOff.label}</p>
            <p className="font-serif text-2xl text-sage-dark">{c.oneOff.value}</p>
          </Card>
        </FadeIn>
      </Section>

      {/* C2: wat zit erin, twee kolommen */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">{c.includedTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div>
              <h3 className="font-serif text-grey">{c.inBrainTitle}</h3>
              <ul className="mt-5 space-y-3">
                {c.baseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-grey">
                    <Check size={18} strokeWidth={2} className="mt-1 shrink-0 text-sage-dark" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted leading-relaxed">{c.fairUse}</p>
            </div>
            <div>
              <h3 className="font-serif text-grey">{c.addonsTitle}</h3>
              <div className="mt-5 space-y-6">
                {c.addons.map((a) => (
                  <div key={a.label}>
                    <p className="font-medium text-grey">{a.label}</p>
                    <p className="mt-2 text-grey leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* C3: rekenvoorbeeld op 8 kolommen */}
      <Section>
        <div className="max-w-[792px]">
          <FadeIn>
            <h2 className="font-serif text-grey">{c.exampleTitle}</h2>
            <p className="mt-4 text-grey leading-relaxed">{c.exampleIntro}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {c.exampleRows.map((r) => (
                <div key={r.label} className="grid grid-cols-[1fr_auto] gap-6 py-3">
                  <dt className="text-grey">{r.label}</dt>
                  <dd className="font-serif text-xl text-grey">{euro(r.value, language)}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_auto] gap-6 py-3">
                <dt className="font-medium text-sage-dark">{c.exampleTotal}</dt>
                <dd className="font-serif text-2xl text-sage-dark">{euro(VOORBEELD_TOTAAL, language)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted leading-relaxed">{c.exampleNote}</p>
          </FadeIn>
        </div>
      </Section>

      {/* C4: hoe het werkt, drie kaarten */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">{c.howTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {c.how.map((h) => (
              <Card key={h.title} signature>
                <h3 className="font-serif text-grey">{h.title}</h3>
                <p className="mt-3 text-grey leading-relaxed">{h.body}</p>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* C5: FAQ in twee kolommen en afsluiting, de ene band van de pagina */}
      <Section band="sand">
        <FadeIn>
          <h2 className="font-serif text-grey">{c.faqTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-6">
            <FAQ items={c.faqItems} columns={2} />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/contact">{c.closeCta}</Button>
            <Button variant="tertiary" href="/scan">{c.closeLink}</Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
