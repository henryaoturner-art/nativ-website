"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";

const translations = {
  nl: {
    heroTitle: "Een Company Brain met AI-workflows voor het Nederlandse mkb.",
    heroSub1: "De kennis van je bedrijf zit verspreid: in systemen, in de hoofden van je medewerkers, in e-mails, in gesprekken en in losse tools die niemand deelt.",
    heroSub2: "nativ brengt al die kennis samen in één Company Brain. Zo is jouw bedrijfskennis geborgd en altijd voor iedereen beschikbaar. En je hebt het ideale fundament voor je digitale assistent en voor de AI-workflows die jou het meest ontzorgen.",
    ctaPrimary: "Plan een vrijblijvend gesprek →",
    ctaSecondary: "Bekijk de workflows",
    ctaWhitepaper: "Whitepaper downloaden",
    heroSeoLine: null,
    problemTitle: "Wat er verandert als je kennis op één plek staat",
    problemP1: "Dan kun je workflows inzetten die werk van hoge kwaliteit afleveren, omdat ze putten uit wat jouw bedrijf echt weet.",
    problemP2a: "Een nieuwe collega is in dagen ingewerkt, niet in maanden.",
    problemP2b: "En vertrekt er iemand, dan blijft wat diegene wist gewoon staan.",
    problemP3: "Dat is wat een Company Brain doet: het brengt samen wat je mensen weten en wat je systemen weten. Je ziet wat erin staat, elk stuk kennis heeft een eigenaar, en je ziet altijd waar een antwoord vandaan komt.",
    howTitle: "Hoe we werken",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We brengen in kaart waar AI de meeste impact heeft, en wat het oplevert.",
        detail: "Je weet daarna precies waar de kansen liggen.",
      },
      {
        num: "2", title: "Build",
        desc: "Samen bouwen we je Company Brain, waarin de kennis uit je mensen en je systemen samenkomt.",
        detail: "Merkidentiteit, processen, marktdata, gespreksverslagen en een eigen CRM: geordend, met een eigenaar per onderdeel.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We zetten workflows in die gevoed worden vanuit jouw Company Brain en echt werk leveren.",
        detail: "Geen speelgoed. Geen demo's. Resultaat.",
      },
    ],
    startScan: "Start met een Scan →",
    trustEU: "EU-datahosting",
    trustGDPR: "GDPR-compliant",
    trustNoCure: "No cure, no pay",
    closerTitle: "Klaar om te ontdekken wat jouw bedrijf écht weet?",
    closerSub: "Plan een vrijblijvend gesprek. Geen verkooppraatje, gewoon een eerlijk gesprek over wat AI voor jouw organisatie kan betekenen.",
    closerCta: "Plan een gesprek →",
  },
  en: {
    heroTitle: "A Company Brain with AI workflows for Dutch SMEs.",
    heroSub1: "Your company’s knowledge is scattered: in systems, in your people’s heads, in emails, in conversations and in separate tools nobody shares.",
    heroSub2: "nativ brings all that knowledge together in one Company Brain. That way your company knowledge is safeguarded and always available to everyone. And you have the ideal foundation for your digital assistant and for the AI workflows that take the most off your plate.",
    ctaPrimary: "Book a free consultation →",
    ctaSecondary: "See the workflows",
    ctaWhitepaper: "Download whitepaper",
    heroSeoLine: null,
    problemTitle: "What changes once it is all in one place",
    problemP1: "You can put workflows to work that deliver genuinely high-quality output, because they draw on what your company actually knows.",
    problemP2a: "A new colleague is up to speed in days, not months.",
    problemP2b: "And when someone leaves, what they knew stays behind.",
    problemP3: "That is what a Company Brain does: it brings together what your people know and what your systems know. You can see what is in it, every piece of knowledge has an owner, and you can always see where an answer came from.",
    howTitle: "How we work",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We map where AI has the highest impact, and what it delivers.",
        detail: "You come out knowing exactly where the opportunities are.",
      },
      {
        num: "2", title: "Build",
        desc: "Together we build your Company Brain, where the knowledge from your people and your systems comes together.",
        detail: "Brand identity, processes, market data, meeting notes and a CRM of your own: ordered, with an owner for each part.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We deploy workflows that are fed from your Company Brain and deliver real work.",
        detail: "No toys. No demos. Results.",
      },
    ],
    startScan: "Start with a Scan →",
    trustEU: "EU data hosting",
    trustGDPR: "GDPR compliant",
    trustNoCure: "No cure, no pay",
    closerTitle: "Ready to discover what your company really knows?",
    closerSub: "Book a free consultation. No sales pitch, just an honest conversation about what AI can do for your organisation.",
    closerCta: "Book a call →",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "nativ",
  legalName: "Nativ B.V.",
  url: "https://gonativ.nl",
  logo: "https://gonativ.nl/nativ-logo.png",
  description:
    "nativ bouwt een Company Brain en AI-workflows voor het Nederlandse mkb.",
  email: "info@gonativ.nl",
  foundingDate: "2025-03-10",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "KvK",
    value: "42125853",
  },
  address: {
    "@type": "PostalAddress",
    // KVK-registered address of Nativ B.V. (KVK 42125853), verified against
    // VIES 2026-08-17. Beethovenlaan/Hilversum was the eenmanszaak — do not revert.
    streetAddress: "Houtmarkt 19",
    postalCode: "2011 AL",
    addressLocality: "Haarlem",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/company/116051208/",
    "https://x.com/gonativnl",
    "https://www.sortlist.com/agency/nativ",
    "https://clutch.co/profile/nativ-0",
    "https://www.g2.com/products/nativ-company-brain",
    "https://feedbax.nl/bedrijf/nativ",
    "https://techbehemoths.com/company/nativ",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "nativ Company Brain",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Eén centrale AI-kennisbank voor je bedrijf, met workflows voor marketing, sales, finance en hr plus een persoonlijke AI-assistent voor elke medewerker.",
  // Eén vast maandbedrag voor iedereen (besluit O4), dus een gewone Offer met een
  // maandelijkse UnitPriceSpecification. De oude AggregateOffer noemde nog een
  // Quick Start-instapbedrag; instapkosten bestaan niet meer (besluit O11).
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "1495",
    availability: "https://schema.org/InStock",
    url: "https://gonativ.nl/pricing",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "EUR",
      price: "1495",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: 1,
        unitCode: "MON",
      },
    },
  },
  provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is een Company Brain (bedrijfsbrein)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een Company Brain is één centrale kennislaag waarin de kennis van je bedrijf samenkomt, uit de hoofden van je mensen, uit je systemen en documenten. Daarop draaien AI-assistenten en workflows die snappen hoe jullie werken.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een AI-workflow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een workflow neemt één terugkerende klus over, van begin tot eind, en werkt vanuit je Company Brain. Omdat die context er is, past het resultaat bij hoe jullie werken in plaats van algemeen te blijven. nativ maakt workflows voor marketing, sales, finance en hr.",
      },
    },
    {
      "@type": "Question",
      name: "Is dit geschikt voor het mkb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. nativ is gebouwd voor Nederlandse mkb- en mid-market-organisaties die AI bedrijfsbreed willen inzetten, niet als los experiment, maar als onderdeel van het team.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe werkt AI-kennismanagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-kennismanagement legt de kennis van je bedrijf vast in één centrale laag, het Company Brain, uit de hoofden van je mensen, uit je systemen en uit je documenten. AI-assistenten en workflows werken vervolgens vanuit die laag, zodat het resultaat klopt met hoe jullie echt werken.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil met gewoon ChatGPT gebruiken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT weet niets van jouw bedrijf en begint elk gesprek opnieuw. Een Company Brain geeft AI de context van jullie organisatie: jullie kennis, afspraken en manier van werken. Zo krijg je consistente, herkenbare antwoorden in plaats van algemene, en die kennis blijft van jou.",
      },
    },
    {
      "@type": "Question",
      name: "Hoeveel kost een Company Brain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De Company Brain kost €1.495 per maand, voor elk bedrijf hetzelfde bedrag. Er zijn geen instapkosten en geen minimale looptijd; de opzegtermijn is één maand. Daarbovenop kies je zelf wat je aanzet: een workflow kost €75 tot €245 per maand en een studie €50. Alle prijzen staan op gonativ.nl/pricing.",
      },
    },
  ],
};

const homepageSchema = webPage(
  "/",
  "nativ, Company Brain en AI-workflows voor het mkb",
  "nativ bouwt een Company Brain en AI-workflows voor het Nederlandse mkb: één centrale AI-kennislaag met workflows voor marketing, sales, finance en hr.",
);

const homepageJsonLd = [orgSchema, softwareSchema, faqSchema, homepageSchema];

export default function HomePage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="py-10 md:py-14 lg:py-40 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl md:text-[40px] lg:text-[52px] leading-[1.2] text-grey max-w-4xl mx-auto">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-light text-grey/70 max-w-2xl mx-auto leading-relaxed">
              {c.heroSub1}{" "}
              <br className="hidden md:block" />
              {c.heroSub2}
            </p>
          </FadeIn>
          {c.heroSeoLine && (
            <FadeIn delay={300}>
              <h2 className="mt-5 text-base md:text-lg font-medium text-grey/60 max-w-2xl mx-auto">
                {c.heroSeoLine}
              </h2>
            </FadeIn>
          )}
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors text-base"
              >
                {c.ctaPrimary}
              </Link>
              <Link
                href="/workflows"
                className="border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors text-base"
              >
                {c.ctaSecondary}
              </Link>
              <Link
                href="/whitepaper"
                className="group inline-flex items-center gap-2 text-base text-sage hover:text-sage-dark transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-current">
                  {c.ctaWhitepaper}
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
        <div className="max-w-[200px] mx-auto mt-16 md:mt-24 border-t border-sage" />
      </section>

      {/* Payoff: what the hero's problem looks like once it is solved */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.problemTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>{c.problemP1}</p>
              <p>
                {c.problemP2a}
                <br />
                {c.problemP2b}
              </p>
              <p>{c.problemP3}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Three-Step Journey */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              {c.howTitle}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-sage/20" aria-hidden="true" />
            {c.steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 150}>
                <div className="text-center md:text-left">
                  <span className="inline-block text-5xl font-serif text-sage mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-2xl md:text-[28px] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-grey/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="mt-2 text-sage text-sm font-light">
                    → {step.detail}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={500}>
            <div className="text-center mt-14">
              <Link
                href="/scan"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                {c.startScan}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-grey/60">
              <span>{c.trustEU}</span>
              <span aria-hidden="true">·</span>
              <span>{c.trustGDPR}</span>
              <span aria-hidden="true">·</span>
              <span>{c.trustNoCure}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA / Closer */}
      <section className="py-12 md:py-16 px-6 bg-cream">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.closerTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              {c.closerSub}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block text-base"
              >
                {c.closerCta}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
