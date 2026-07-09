"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "AI Opportunity Scan",
    heroSub: "In één week weten waar AI het meeste oplevert in jouw organisatie.",
    heroSub2: "De AI-scan die concreet en toepasbaar is. Geen vaag advies.",
    heroCta: "Plan je Scan →",
    heroPrice: "Vanaf €2.495 · No cure, no pay",
    auditStripTitle: "Nog niet toe aan de betaalde Scan?",
    auditStripText: "Doe eerst de gratis 10-minuten bedrijfskennis-audit. Zie waar de kennis van je bedrijf zit en wat je riskeert.",
    auditStripCta: "Doe de gratis audit →",
    whatTitle: "Wat je krijgt",
    whatItems: [
      "Een complete analyse van AI-kansen in jouw organisatie",
      "Prioritering op basis van impact én haalbaarheid",
      "Concrete eerste stappen: geen PowerPoint, maar een plan",
      "Persoonlijke toelichting van ons team",
    ],
    timeLabel: "Doorlooptijd:",
    timeValue: "1 week",
    formatLabel: "Format:",
    formatValue: "Interactief rapport + persoonlijke sessie",
    howTitle: "Zo werkt het",
    timeline: [
      { days: "Dag 1 tot 2", title: "Intake", desc: "We leren je organisatie kennen. Korte gesprekken, toegang tot bestaande documentatie." },
      { days: "Dag 3 tot 5", title: "Analyse", desc: "Onze AI analyseert jouw processen, data en kennisstromen. Wij interpreteren de resultaten." },
      { days: "Dag 5 tot 7", title: "Oplevering", desc: "Je ontvangt een helder rapport met geprioriteerde AI-kansen en een concreet actieplan." },
    ],
    investTitle: "Investering",
    card1Title: "AI Opportunity Scan: standaard",
    card1Price: "€2.495",
    card1Desc1: "Gestandaardiseerde analyse",
    card1Desc2: "Ideaal als startpunt",
    card1Cta: "Start je Scan →",
    card2Title: "AI Opportunity Scan: op maat",
    card2Price: "Vanaf €2.495",
    card2Desc1: "Volledig op maat",
    card2Desc2: "Voor specifieke vraagstukken",
    card2Cta: "Plan een intake →",
    noCure: "Beide opties: No cure, no pay. Niet tevreden? Je betaalt niets.",
    faqTitle: "Veelgestelde vragen",
    faqItems: [
      { question: "Wat is een AI-scan (innovatiescan)?", answer: "Een AI-scan, ook wel innovatiescan of AI Opportunity Scan, brengt in één week in kaart waar AI in jouw organisatie het meeste oplevert. Je krijgt een overzicht geprioriteerd op impact en haalbaarheid, plus een concreet actieplan. Geen pilot, geen verplichting." },
      { question: "Wat heb ik nodig om te starten?", answer: "Niets bijzonders. Toegang tot relevante documentatie en 30 minuten van je tijd voor een intake." },
      { question: "Hoe zit het met mijn data?", answer: "Alle data blijft binnen de EU. Wij zijn volledig GDPR-compliant. Na afloop kun je kiezen of we data bewaren of verwijderen." },
      { question: "Wat als het niets oplevert?", answer: "Dan betaal je niets. No cure, no pay. Simpel." },
      { question: "Kan ik daarna verder met nativ?", answer: "Ja. De Scan is stap 1 van ons drielaags model. Na de Scan kun je doorpakken met een AI-kennisbank en digitale collega's." },
    ],
  },
  en: {
    heroTitle: "AI Opportunity Scan",
    heroSub: "Know exactly where AI delivers the most value in your organisation. In one week.",
    heroSub2: "The AI scan that's concrete and actionable. No vague advice.",
    heroCta: "Book your Scan →",
    heroPrice: "From €2,495 · No cure, no pay",
    auditStripTitle: "Not ready for the paid Scan yet?",
    auditStripText: "Start with the free 10-minute company-knowledge audit. See where your company's knowledge sits and what you're risking.",
    auditStripCta: "Take the free audit →",
    whatTitle: "What you get",
    whatItems: [
      "A complete analysis of AI opportunities in your organisation",
      "Prioritisation based on impact and feasibility",
      "Concrete next steps: no PowerPoint, but a plan",
      "Personal walkthrough from our team",
    ],
    timeLabel: "Timeline:",
    timeValue: "1 week",
    formatLabel: "Format:",
    formatValue: "Interactive report + personal session",
    howTitle: "How it works",
    timeline: [
      { days: "Day 1 to 2", title: "Intake", desc: "We get to know your organisation. Short conversations, access to existing documentation." },
      { days: "Day 3 to 5", title: "Analysis", desc: "Our AI analyses your processes, data and knowledge flows. We interpret the results." },
      { days: "Day 5 to 7", title: "Delivery", desc: "You receive a clear report with prioritised AI opportunities and a concrete action plan." },
    ],
    investTitle: "Investment",
    card1Title: "AI Opportunity Scan: standard",
    card1Price: "€2,495",
    card1Desc1: "Standardised analysis",
    card1Desc2: "Perfect starting point",
    card1Cta: "Start your Scan →",
    card2Title: "AI Opportunity Scan: custom",
    card2Price: "From €2,495",
    card2Desc1: "Fully customised",
    card2Desc2: "For complex organisations",
    card2Cta: "Book an intake →",
    noCure: "Both options: No cure, no pay. Not satisfied? You pay nothing.",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { question: "What is an AI scan (innovation scan)?", answer: "An AI scan, also called an innovation scan or AI Opportunity Scan, maps in one week where AI delivers the most value in your organisation. You get an overview prioritised by impact and feasibility, plus a concrete action plan. No pilot, no obligation." },
      { question: "What do I need to get started?", answer: "Nothing special. Access to relevant documentation and 30 minutes of your time for an intake." },
      { question: "What about my data?", answer: "All data stays within the EU. We are fully GDPR-compliant. Afterwards you choose whether we keep or delete your data." },
      { question: "What if it doesn\u2019t deliver?", answer: "Then you pay nothing. No cure, no pay. Simple." },
      { question: "Can I continue with nativ after?", answer: "Yes. The Scan is step 1 of our three-layer model. After the Scan you can move forward with an AI knowledge base and digital colleagues." },
    ],
  },
};

export default function ScanPage() {
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
              {c.heroSub}
              <br />
              {c.heroSub2}
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10">
              <Link href="/contact" className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block">
                {c.heroCta}
              </Link>
              <p className="mt-3 text-sm text-grey/50">{c.heroPrice}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Free audit — the on-ramp to the paid Scan */}
      <section className="px-6 pb-2">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="bg-white rounded-xl p-6 md:p-8 border-l-[3px] border-sage shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <h2 className="font-serif text-xl text-grey">{c.auditStripTitle}</h2>
                <p className="mt-2 text-sm text-grey/70 font-light leading-relaxed">{c.auditStripText}</p>
              </div>
              <Link
                href="/bedrijfskennis-audit"
                className="shrink-0 border border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white transition-colors text-center text-sm font-medium"
              >
                {c.auditStripCta}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.whatTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <ul className="mt-8 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              {c.whatItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sage mt-1">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10 flex flex-wrap gap-6 text-sm">
              <div className="bg-surface rounded-xl px-5 py-3 border border-sage-light">
                <span className="text-grey/50">{c.timeLabel}</span>{" "}
                <span className="font-medium">{c.timeValue}</span>
              </div>
              <div className="bg-surface rounded-xl px-5 py-3 border border-sage-light">
                <span className="text-grey/50">{c.formatLabel}</span>{" "}
                <span className="font-medium">{c.formatValue}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.howTitle}</h2>
          </FadeIn>
          <div className="mt-12 space-y-0">
            {c.timeline.map((step, i) => (
              <FadeIn key={step.days} delay={i * 150}>
                <div className="flex gap-6 pb-10 relative">
                  {i < 2 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-px bg-sage/20" aria-hidden="true" />
                  )}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center mt-1" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-sage" />
                  </div>
                  <div>
                    <span className="text-sage text-sm font-medium">{step.days}</span>
                    <h3 className="font-serif text-xl mt-1">{step.title}</h3>
                    <p className="mt-2 text-grey/70 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center">{c.investTitle}</h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="bg-surface rounded-xl p-8 border border-sage-light h-full">
                <h3 className="font-serif text-xl">{c.card1Title}</h3>
                <p className="text-3xl font-serif text-sage mt-3">{c.card1Price}</p>
                <p className="mt-4 text-grey/70 font-light">{c.card1Desc1}</p>
                <p className="text-grey/70 font-light">{c.card1Desc2}</p>
                <Link href="/contact" className="mt-6 block text-center bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors">
                  {c.card1Cta}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={250}>
              <div className="bg-surface rounded-xl p-8 border border-sage-light h-full">
                <h3 className="font-serif text-xl">{c.card2Title}</h3>
                <p className="text-3xl font-serif text-sage mt-3">{c.card2Price}</p>
                <p className="mt-4 text-grey/70 font-light">{c.card2Desc1}</p>
                <p className="text-grey/70 font-light">{c.card2Desc2}</p>
                <Link href="/contact" className="mt-6 block text-center border border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white transition-colors">
                  {c.card2Cta}
                </Link>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={400}>
            <p className="text-center mt-8 text-sage text-sm font-medium">{c.noCure}</p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-10">{c.faqTitle}</h2>
          </FadeIn>
          <FAQ items={c.faqItems} />
        </div>
      </section>
    </>
  );
}
