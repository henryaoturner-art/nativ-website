"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Van inzicht naar impact",
    heroSub1: "Drie stappen. Van eerste scan tot werkende digitale collega\u2019s.",
    heroSub2: "Elk op je eigen tempo.",
    layers: [
      {
        step: "Stap 1", title: "Scan",
        lead: "We scannen waar AI de meeste waarde creëert in jouw organisatie.",
        body: "Je weet dat AI belangrijk is. Maar waar begin je? Onze AI Opportunity Scan brengt in één week in kaart waar de grootste kansen liggen. Geen vage beloftes — concrete, geprioriteerde mogelijkheden.",
        features: ["AI-kansenanalyse op maat", "Prioritering op impact en haalbaarheid", "Concreet actieplan"],
        meta: "Doorlooptijd: 1 week | Vanaf €2.495 | No cure, no pay",
        whatLabel: "Wat je krijgt:",
        cta: "Start met een Scan →", ctaLink: "/scan", primary: true,
      },
      {
        step: "Stap 2", title: "Build",
        lead: "We bouwen je AI-kennisbank — de context die AI écht nuttig maakt.",
        body: "AI-tools zijn krachtig. Maar zonder de juiste context zijn ze nutteloos. Wij structureren de kennis die in jouw organisatie leeft — in hoofden, systemen, processen — tot een levend AI Operating System dat AI begrijpt.\n\nDit systeem werkt met drie kennislagen: stabiele kennis (merkidentiteit, kernprocessen — jaarlijks bijgewerkt), evoluerende kennis (marktpositie, concurrentie — maandelijks bijgewerkt), en dynamische kennis (campagnedata, klantfeedback — wekelijks of vaker). Daardoor is het geen eenmalige snapshot, maar een systeem dat meegroeit met je organisatie.\n\nDit is het fundament. Zonder deze stap is elke AI-investering een gok.",
        features: ["Gestructureerde bedrijfskennis, toegankelijk voor AI", "Drie kennislagen: stabiel, evoluerend, dynamisch", "Integratie met bestaande systemen", "Continue updates — een levend systeem, geen eenmalige snapshot"],
        meta: "Doorlooptijd: 2–6 weken | Op maat",
        whatLabel: "Wat je krijgt:",
        cta: "Meer weten →", ctaLink: "/contact", primary: false,
      },
      {
        step: "Stap 3", title: "Deploy",
        lead: "We zetten digitale collega's in die echt werk leveren.",
        body: "Geen chatbot die \"ik weet het niet\" zegt. Digitale collega's die putten uit de collectieve intelligentie van jouw bedrijf. Die taken overnemen, vragen beantwoorden en processen versnellen — met de volledige context van jouw AI Operating System.",
        features: ["Digitale collega's op maat, gevoed door jouw kennisbank", "Model-onafhankelijk — altijd de beste technologie", "Integratie in bestaande workflows", "Meetbare resultaten"],
        meta: "Doorlooptijd: doorlopend | Op maat",
        whatLabel: "Wat je krijgt:",
        cta: "Plan een gesprek →", ctaLink: "/contact", primary: false,
      },
    ],
    whyTitle: "Waarom deze volgorde?",
    whyP1a: "De meeste AI-projecten falen niet door slechte technologie.",
    whyP1b: "Ze falen omdat de basis ontbreekt.",
    whyFormula: "Scan → Build → Deploy.",
    whyP2: "Elke stap bouwt voort op de vorige.\nJe kunt bij stap 1 instappen en op elk moment stoppen.\nGeen lock-in. Geen verplichtingen.",
  },
  en: {
    heroTitle: "From insight to impact",
    heroSub1: "Three steps. From first scan to working digital colleagues.",
    heroSub2: "Each at your own pace.",
    layers: [
      {
        step: "Step 1", title: "Scan",
        lead: "We identify where AI creates the most value in your organisation.",
        body: "You know AI matters. But where do you start? Our AI Opportunity Scan maps out the biggest opportunities in one week. No vague promises — concrete, prioritised possibilities.",
        features: ["Custom AI opportunity analysis", "Prioritisation by impact and feasibility", "Concrete action plan"],
        meta: "Timeline: 1 week | From €2,495 | No cure, no pay",
        whatLabel: "What you get:",
        cta: "Start with a Scan →", ctaLink: "/scan", primary: true,
      },
      {
        step: "Step 2", title: "Build",
        lead: "We build your AI knowledge base — the context that makes AI actually useful.",
        body: "AI tools are powerful. But without the right context they\u2019re useless. We structure the knowledge that lives in your organisation — in heads, systems, processes — into a living AI Operating System that AI understands.\n\nThis system works with three knowledge tiers: stable knowledge (brand identity, core processes — updated yearly), evolving knowledge (market position, competition — updated monthly), and dynamic knowledge (campaign data, customer feedback — updated weekly or more). That\u2019s what makes it a living system, not a one-time snapshot.\n\nThis is the foundation. Without this step, every AI investment is a gamble.",
        features: ["Structured company knowledge, accessible to AI", "Three knowledge tiers: stable, evolving, dynamic", "Integration with existing systems", "Continuous updates — a living system, not a one-time snapshot"],
        meta: "Timeline: 2–6 weeks | Custom",
        whatLabel: "What you get:",
        cta: "Learn more →", ctaLink: "/contact", primary: false,
      },
      {
        step: "Step 3", title: "Deploy",
        lead: "We deploy digital colleagues that actually get work done.",
        body: "No chatbot that says \"I don\u2019t know\". Digital colleagues that draw from the collective intelligence of your company. That take over tasks, answer questions and accelerate processes — with context.",
        features: ["Custom digital colleagues, powered by your knowledge base", "Model-agnostic — always the best technology", "Integration into existing workflows", "Measurable results"],
        meta: "Timeline: ongoing | Custom",
        whatLabel: "What you get:",
        cta: "Book a call →", ctaLink: "/contact", primary: false,
      },
    ],
    whyTitle: "Why this order?",
    whyP1a: "Most AI projects don\u2019t fail because of bad technology.",
    whyP1b: "They fail because the foundation is missing.",
    whyFormula: "Scan → Build → Deploy.",
    whyP2: "Each step builds on the previous one.\nYou can start at step 1 and stop at any time.\nNo lock-in. No obligations.",
  },
};

export default function DienstenPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
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
              {c.heroSub1}
              <br />
              {c.heroSub2}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Layers */}
      {c.layers.map((layer, i) => (
        <section key={layer.step} className={`py-12 md:py-16 px-6 ${i % 2 === 1 ? "bg-white" : ""}`}>
          <div className="max-w-[680px] mx-auto">
            <FadeIn>
              <span className="text-sage text-sm font-medium tracking-wide uppercase">{layer.step}</span>
              <h2 className="font-serif text-3xl md:text-[42px] leading-tight mt-2">{layer.title}</h2>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-4 text-xl font-serif text-grey/80 italic leading-relaxed">{layer.lead}</p>
            </FadeIn>
            <FadeIn delay={250}>
              <div className="mt-6 space-y-4 text-grey/70 font-light leading-relaxed">
                {layer.body.split("\n\n").map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={350}>
              <div className="mt-8">
                <p className="text-sm text-grey/50 uppercase tracking-wide mb-3">{layer.whatLabel}</p>
                <ul className="space-y-2">
                  {layer.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-grey/80 font-light">
                      <span className="text-sage mt-0.5">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={450}>
              <p className="mt-6 text-sm text-grey/50">{layer.meta}</p>
              <div className="mt-6">
                <Link
                  href={layer.ctaLink}
                  className={`inline-block px-8 py-3.5 rounded-lg transition-colors ${
                    layer.primary
                      ? "bg-sage text-white hover:bg-sage-dark"
                      : "border border-sage text-sage hover:bg-sage hover:text-white"
                  }`}
                >
                  {layer.cta}
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      {/* Why This Order */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.whyTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>
                {c.whyP1a}
                <br />
                {c.whyP1b}
              </p>
              <p className="font-serif text-grey text-xl">{c.whyFormula}</p>
              <div>
                {c.whyP2.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
