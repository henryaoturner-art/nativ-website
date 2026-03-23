"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ComparisonTable from "@/components/ComparisonTable";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Je bedrijf weet meer dan je denkt.",
    heroSub1: "Cruciale kennis zit vast in hoofden, inboxes en spreadsheets.",
    heroSub2: "Nativ maakt die kennis toegankelijk — zodat AI écht waarde levert.",
    ctaPrimary: "Plan een vrijblijvend gesprek →",
    ctaSecondary: "Bekijk onze aanpak",
    problemTitle: "Meer kennis dan je benut",
    problemP1: "40% van de kennis in jouw organisatie zit in de hoofden van mensen.",
    problemP2a: "In inboxes. In processen. In ervaring die nergens vastligt.",
    problemP2b: "Wij maken die kennis zichtbaar, toegankelijk en klaar voor AI.",
    problemP3: "Zodat elke beslissing beter wordt. Elke medewerker slimmer werkt. Elke klant sneller geholpen is.",
    howTitle: "Hoe we werken",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We brengen in kaart waar AI de meeste impact heeft — en wat het kost om niets te doen.",
        detail: "In 1 week weet je precies waar de kansen liggen.",
      },
      {
        num: "2", title: "Build",
        desc: "We bouwen je AI Operating System — een levende kennisbank die AI de context geeft van jouw bedrijf.",
        detail: "Merkidentiteit, processen, marktdata — gestructureerd en altijd actueel.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We zetten digitale collega's in die putten uit jouw kennisbank en echt werk leveren.",
        detail: "Geen speelgoed. Geen demo's. Resultaat.",
      },
    ],
    startScan: "Start met een Scan →",
    whySwitch: "Waarom bedrijven switchen",
    trustEU: "🇪🇺 EU Data Hosting",
    trustGDPR: "🔒 GDPR Compliant",
    trustNoCure: "🤝 No Cure, No Pay",
    closerTitle: "Klaar om te ontdekken wat jouw bedrijf écht weet?",
    closerSub: "Plan een vrijblijvend gesprek. Geen verkooppraatje — gewoon een eerlijk gesprek over wat AI voor jouw organisatie kan betekenen.",
    closerCta: "Plan een gesprek →",
  },
  en: {
    heroTitle: "Your company knows more than you think.",
    heroSub1: "Critical knowledge is locked in people\u2019s heads, inboxes and spreadsheets.",
    heroSub2: "Nativ makes that knowledge accessible — so AI actually delivers.",
    ctaPrimary: "Book a free consultation →",
    ctaSecondary: "See our approach",
    problemTitle: "More knowledge than you\u2019re using",
    problemP1: "40% of the knowledge in your organisation lives in people\u2019s heads.",
    problemP2a: "In inboxes. In processes. In experience that\u2019s never been captured.",
    problemP2b: "We make that knowledge visible, accessible, and ready for AI.",
    problemP3: "So every decision gets better. Every employee works smarter. Every client is served faster.",
    howTitle: "How we work",
    steps: [
      {
        num: "1", title: "Scan",
        desc: "We map where AI has the highest impact — and what it costs to do nothing.",
        detail: "In 1 week you know exactly where the opportunities are.",
      },
      {
        num: "2", title: "Build",
        desc: "We build your AI Operating System — a living knowledge base that gives AI the context of your business.",
        detail: "Brand identity, processes, market data — structured and always current.",
      },
      {
        num: "3", title: "Deploy",
        desc: "We deploy digital colleagues that draw from your knowledge base and actually get work done.",
        detail: "No toys. No demos. Results.",
      },
    ],
    startScan: "Start with a Scan →",
    whySwitch: "Why companies switch",
    trustEU: "🇪🇺 EU Data Hosting",
    trustGDPR: "🔒 GDPR Compliant",
    trustNoCure: "🤝 No Cure, No Pay",
    closerTitle: "Ready to discover what your company really knows?",
    closerSub: "Book a free consultation. No sales pitch — just an honest conversation about what AI can do for your organisation.",
    closerCta: "Book a call →",
  },
};

export default function HomePage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 lg:py-40 px-6">
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
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors text-base"
              >
                {c.ctaPrimary}
              </Link>
              <Link
                href="/diensten"
                className="border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors text-base"
              >
                {c.ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>
        <div className="max-w-[200px] mx-auto mt-16 md:mt-24 border-t border-sage" />
      </section>

      {/* Problem Statement */}
      <section className="py-20 md:py-28 px-6">
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
      <section className="py-20 md:py-28 px-6">
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

      {/* Comparison Table */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-12">
              {c.whySwitch}
            </h2>
          </FadeIn>
          <ComparisonTable />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 md:py-20 px-6">
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
      <section className="py-20 md:py-28 px-6 bg-cream">
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
