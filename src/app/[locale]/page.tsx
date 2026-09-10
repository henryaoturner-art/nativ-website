"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import { ArrowRight, UserMinus, UserPlus } from "lucide-react";
import Stars from "@/components/Stars";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import { webPage } from "@/lib/site-meta";

const translations = {
  nl: {
    heroTitle: "Een Company Brain met AI-workflows voor het mkb.",
    heroSub1: "De kennis van je bedrijf zit verspreid: in systemen, in de hoofden van je medewerkers, in e-mails, in gesprekken en in losse tools die niemand deelt.",
    heroSub2: "nativ brengt al die kennis samen in één Company Brain. Zo is jouw bedrijfskennis geborgd en altijd voor iedereen beschikbaar. En je hebt het fundament voor de AI-workflows die jou het meest ontzorgen.",
    ctaScan: "Doe de gratis AI-scan",
    ctaPrimary: "Plan een gesprek",
    proofScore: "4,5 / 5 op Sortlist",
    proofQuote: "Geen advies-traject, maar werkende oplossingen die we elke dag gebruiken.",
    proofWho: "Dirk Westdijk, CEO, JobTraining",
    proofAria: "Beoordeling 4,5 van 5",
    heroSeoLine: null,
    problemTitle: "Wat er verandert als je kennis op één plek staat",
    problemP1: "Dan kun je workflows inzetten die werk van hoge kwaliteit afleveren, omdat ze putten uit wat jouw bedrijf echt weet.",
    problemP2a: "Een nieuwe collega is in dagen ingewerkt, niet in maanden.",
    problemP2b: "En vertrekt er iemand, dan blijft wat diegene wist gewoon staan.",
    problemP3: "Dat is wat een Company Brain doet: het brengt samen wat je mensen weten en wat je systemen weten. Je ziet wat erin staat, elk stuk kennis heeft een eigenaar, en je ziet altijd waar een antwoord vandaan komt.",
    howTitle: "Hoe we werken",
    howKicker: "Zo werken we",
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
    startScan: "Start met een Scan",
    trustEU: "EU-datahosting",
    trustGDPR: "GDPR-compliant",
    closerTitle: "Klaar om te ontdekken wat jouw bedrijf écht weet?",
    closerSub: "Plan een vrijblijvend gesprek over wat AI voor jouw organisatie kan betekenen.",
    closerCta: "Plan een gesprek",
  },
  en: {
    heroTitle: "A Company Brain with AI workflows for SMEs.",
    heroSub1: "Your company’s knowledge is scattered: in systems, in your people’s heads, in emails, in conversations and in separate tools nobody shares.",
    heroSub2: "nativ brings all that knowledge together in one Company Brain. That way your company knowledge is safeguarded and always available to everyone. And you have the foundation for the AI workflows that take the most off your plate.",
    ctaScan: "Take the free AI scan",
    ctaPrimary: "Book a call",
    proofScore: "4.5 / 5 on Sortlist",
    proofQuote: "",
    proofWho: "Dirk Westdijk, CEO, JobTraining",
    proofAria: "Rated 4.5 out of 5",
    heroSeoLine: null,
    problemTitle: "What changes once it is all in one place",
    problemP1: "You can put workflows to work that deliver genuinely high-quality output, because they draw on what your company actually knows.",
    problemP2a: "A new colleague is up to speed in days, not months.",
    problemP2b: "And when someone leaves, what they knew stays behind.",
    problemP3: "That is what a Company Brain does: it brings together what your people know and what your systems know. You can see what is in it, every piece of knowledge has an owner, and you can always see where an answer came from.",
    howTitle: "How we work",
    howKicker: "How we work",
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
    startScan: "Start with a Scan",
    trustEU: "EU data hosting",
    trustGDPR: "GDPR compliant",
    closerTitle: "Ready to discover what your company really knows?",
    closerSub: "Book a free consultation about what AI can do for your organisation.",
    closerCta: "Book a call",
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
    "nativ bouwt een Company Brain en AI-workflows voor het mkb.",
  email: "info@gonativ.nl",
  foundingDate: "2025-03-10",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "KvK",
    value: "42125853",
  },
  address: {
    "@type": "PostalAddress",
    // Bezoekadres: The Stack, sinds 4 september 2026 ons kantoor en de zakelijke
    // adresregistratie (Brain-feit 01-identity.hq-address; A4, KAN-425). Het
    // statutaire adres in Haarlem hoort in de voorwaarden en de privacyverklaring,
    // niet in de bezoekinformatie. Het KvK-nummer hierboven wordt in KAN-411 gecheckt.
    streetAddress: "Jacob Bontiusplaats 9",
    postalCode: "1018 LL",
    addressLocality: "Amsterdam",
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
    "Een Company Brain: de altijd actuele kennisbank van je bedrijf, gevuld uit de hoofden van je mensen, je systemen en de buitenwereld. Iedereen in het bedrijf kan hem alles vragen. En er kunnen AI-workflows op draaien die voor jou waarde toevoegen.",
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
        text: "Een Company Brain is één centrale kennislaag waarin de kennis van je bedrijf samenkomt, uit de hoofden van je mensen, uit je systemen en de buitenwereld. Er kunnen AI-workflows op draaien die snappen hoe jullie werken.",
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
        text: "Ja. nativ is gebouwd voor mkb- en mid-market-organisaties die AI bedrijfsbreed willen inzetten, niet als los experiment, maar als onderdeel van het team.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe werkt AI-kennismanagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-kennismanagement legt de kennis van je bedrijf vast in één centrale laag, het Company Brain, uit de hoofden van je mensen, uit je systemen en uit de buitenwereld. Er kunnen AI-workflows op draaien die snappen hoe jullie werken.",
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
        text: "De Company Brain kost €1.495 per maand, voor elk bedrijf hetzelfde bedrag. Er zijn geen instapkosten en geen minimale looptijd; de opzegtermijn is één maand. Daarbovenop kies je zelf wat je aanzet: een workflow kost €25 tot €245 per maand. Alle prijzen staan op gonativ.nl/pricing.",
      },
    },
  ],
};

const homepageSchema = webPage(
  "/",
  "nativ, Company Brain en AI-workflows voor het mkb",
  "nativ bouwt een Company Brain en AI-workflows voor het mkb: één centrale AI-kennislaag met workflows voor marketing, sales, finance en hr.",
);

const homepageJsonLd = [orgSchema, softwareSchema, faqSchema, homepageSchema];

export default function HomePage() {
  const { t, language } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Gestructureerde data alleen op de Nederlandse route: de teksten erin zijn Nederlands. */}
      {language === "nl" && homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* D1: hero in twee kolommen (7 en 5). Links H1, intro, de twee knoppen en de
          bewijsregel; rechts, verticaal gecentreerd, de drie stappen als de ene
          signatuurkaart van de pagina. Het productbeeld (H4) wacht op NTH-309. */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
          <FadeIn className="md:col-span-7">
            <h1 className="font-serif text-grey">{c.heroTitle}</h1>
            <p className="mt-6 max-w-[640px] text-grey leading-relaxed">
              {c.heroSub1}{" "}
              <br className="hidden md:block" />
              {c.heroSub2}
            </p>
            {c.heroSeoLine && (
              <h2 className="mt-5 font-medium text-muted max-w-[640px]">
                {c.heroSeoLine}
              </h2>
            )}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button href="/scan">{c.ctaScan}</Button>
              <Button variant="secondary" href="/contact">{c.ctaPrimary}</Button>
            </div>
            {/* Proof next to the ask, not three screens down. Visible copy only:
                no Review/aggregateRating markup, per the same Google self-serving
                review rule documented in cases/page.tsx. */}
            <figure className="mt-8 max-w-[640px] text-sm text-grey">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Stars />
                <span className="sr-only">{c.proofAria}</span>
                {/* /cases is verborgen (8 sep 2026); de score staat als tekst. */}
                <span className="font-medium text-sage-dark">{c.proofScore}</span>
              </div>
              {c.proofQuote && (
                <blockquote className="mt-2 italic">
                  &ldquo;{c.proofQuote}&rdquo;
                </blockquote>
              )}
              <figcaption className="mt-1 not-italic text-muted">
                {c.proofWho}
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn delay={200} className="md:col-span-5">
            <Kicker>{c.howKicker}</Kicker>
            <Card signature>
              <ol className="divide-y divide-border">
                {c.steps.map((step) => (
                  <li key={step.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="w-6 shrink-0 font-serif text-[40px] leading-none text-sage-dark">
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-grey">{step.title}</h3>
                      <p className="mt-2 text-grey leading-relaxed">{step.desc}</p>
                      <p className="mt-2 flex items-start gap-2 text-sm text-sage-dark">
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>{step.detail}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* D1: wat er verandert, twee kolommen. Links de kop en de twee alinea's,
          rechts de twee uitkomstregels als kaarten met een lucide-icoon. */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
          <FadeIn className="md:col-span-7">
            <h2 className="font-serif text-grey">{c.problemTitle}</h2>
            <div className="mt-6 max-w-[640px] space-y-6 text-grey leading-relaxed">
              <p>{c.problemP1}</p>
              <p>{c.problemP3}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="md:col-span-5">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <UserPlus size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                <p className="mt-3 font-serif text-[22px] leading-[1.25] text-grey">{c.problemP2a}</p>
              </Card>
              <Card>
                <UserMinus size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                <p className="mt-3 font-serif text-[22px] leading-[1.25] text-grey">{c.problemP2b}</p>
              </Card>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* D1: sluitband, de ene Sand-band van de pagina. Eén rij: kop en zin links,
          knop rechts. De EU-regel staat in de footerbalk (B5). */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
            <div className="md:col-span-8">
              <h2 className="font-serif text-grey">{c.closerTitle}</h2>
              <p className="mt-4 max-w-[640px] text-grey leading-relaxed">{c.closerSub}</p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Button href="/contact">{c.closerCta}</Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
