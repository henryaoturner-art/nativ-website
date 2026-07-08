"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";

const translations = {
  nl: {
    heroTitle: "Het meeste van wat je bedrijf weet, staat nergens vastgelegd.",
    heroSub1: "Het zit in hoofden, en loopt de deur uit zodra iemand vertrekt.",
    heroSub2: "nativ legt die kennis vast in een Company Brain en geeft alle medewerkers een digitale assistent en extra digitale collega's.",
    ctaPrimary: "Plan een vrijblijvend gesprek →",
    ctaSecondary: "Bekijk de Digitale Collega's",
    ctaWhitepaper: "Whitepaper downloaden",
    heroSeoLine:
      "Een Company Brain met digitale collega's voor het Nederlandse mkb.",
    problemTitle: "Wat er verandert als die kennis wél vastligt",
    problemP1: "Een nieuwe collega is in dagen ingewerkt, niet in maanden.",
    problemP2a: "Iedereen geeft een klant hetzelfde antwoord, omdat iedereen uit dezelfde bron put.",
    problemP2b: "En vertrekt er iemand, dan blijft wat diegene wist gewoon staan.",
    problemP3: "Dat is wat een Company Brain doet: het maakt de kennis van je team herbruikbaar, voor je mensen en voor AI.",
    howTitle: "Hoe we werken",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We brengen in kaart waar AI de meeste impact heeft, en wat het oplevert.",
        detail: "In 1 week weet je precies waar de kansen liggen.",
      },
      {
        num: "2", title: "Build",
        desc: "We bouwen je AI Operating System, een levende kennisbank die AI de context geeft van jouw bedrijf.",
        detail: "Merkidentiteit, processen, marktdata: gestructureerd en altijd actueel.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We zetten digitale collega's in die putten uit jouw kennisbank en echt werk leveren.",
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
    heroTitle: "Most of what your company knows isn’t written down anywhere.",
    heroSub1: "It lives in people’s heads, and walks out the door when someone leaves.",
    heroSub2: "nativ captures that knowledge in one Company Brain and gives every employee a digital assistant and extra digital colleagues.",
    ctaPrimary: "Book a free consultation →",
    ctaSecondary: "Meet the Digital Colleagues",
    ctaWhitepaper: "Download whitepaper",
    heroSeoLine: "A Company Brain with digital colleagues for Dutch SMEs.",
    problemTitle: "What changes once that knowledge is written down",
    problemP1: "A new colleague is up to speed in days, not months.",
    problemP2a: "Everyone gives a client the same answer, because everyone draws on the same source.",
    problemP2b: "And when someone leaves, what they knew stays behind.",
    problemP3: "That is what a Company Brain does: it makes your team\u2019s knowledge reusable, for your people and for AI.",
    howTitle: "How we work",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We map where AI has the highest impact, and what it costs to do nothing.",
        detail: "In 1 week you know exactly where the opportunities are.",
      },
      {
        num: "2", title: "Build",
        desc: "We build your AI Operating System, a living knowledge base that gives AI the context of your business.",
        detail: "Brand identity, processes, market data: structured and always current.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We deploy digital colleagues that draw from your knowledge base and actually get work done.",
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
    "nativ bouwt een Company Brain en digitale collega's voor het Nederlandse mkb.",
  email: "info@gonativ.nl",
  foundingDate: "2025-03-10",
  vatID: "NL005222736B97",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "KvK",
    value: "96646756",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beethovenlaan 37",
    postalCode: "1217 CH",
    addressLocality: "Hilversum",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/company/116051208/",
    "https://x.com/gonativnl",
    "https://www.sortlist.com/agency/nativ",
    "https://clutch.co/profile/nativ-0",
    "https://www.g2.com/products/nativ-company-brain",
    "https://feedbax.nl/bedrijf/nativ",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "nativ Company Brain",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Eén centrale AI-kennisbank voor je bedrijf, met digitale collega's voor marketing, sales, finance en hr plus een persoonlijke AI-assistent voor elke medewerker.",
  // AggregateOffer, not Offer: a bare Offer needs a price, and the Company Brain
  // is sold in three tiers. lowPrice is the Quick Start setup fee listed on /pricing.
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "2495",
    offerCount: 3,
    availability: "https://schema.org/InStock",
    url: "https://gonativ.nl/pricing",
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
        text: "Een Company Brain is één centrale kennislaag waarin de kennis van je bedrijf samenkomt, uit de hoofden van je mensen, uit je systemen en documenten. Daarop draaien AI-assistenten en digitale collega's die echt snappen hoe jullie werken.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een digitale collega?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een digitale collega is geen tool die je koopt, maar een AI-collega die werkt vanuit je Company Brain en die elke maand productiever wordt. nativ levert digitale collega's voor marketing, sales, finance en hr.",
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
        text: "AI-kennismanagement legt de kennis van je bedrijf vast in één centrale laag, het Company Brain, uit de hoofden van je mensen, uit je systemen en uit je documenten. AI-assistenten en digitale collega's werken vervolgens vanuit die laag, zodat ze antwoorden geven die kloppen met hoe jullie echt werken.",
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
        text: "De investering hangt af van de omvang en het aantal digitale collega's. We beginnen klein en omkeerbaar, met een eerste stap in enkele weken. Vraag een vrijblijvend gesprek aan voor een prijs die past bij jullie situatie.",
      },
    },
  ],
};

const homepageSchema = webPage(
  "/",
  "nativ, Company Brain en digitale collega's voor het mkb",
  "nativ bouwt een Company Brain en digitale collega's voor het Nederlandse mkb: één centrale AI-kennislaag met digitale collega's voor marketing, sales, finance en hr.",
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.15] text-grey max-w-3xl mx-auto">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-light text-grey/70 max-w-2xl mx-auto leading-relaxed">
              {c.heroSub1}
              <br className="hidden md:block" />
              {c.heroSub2}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <h2 className="mt-5 text-base md:text-lg font-medium text-grey/60 max-w-2xl mx-auto">
              {c.heroSeoLine}
            </h2>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors text-base"
              >
                {c.ctaPrimary}
              </Link>
              <Link
                href="/digitale-collegas"
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
