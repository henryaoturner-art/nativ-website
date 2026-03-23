"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Eerlijke prijzen",
    heroSub: "Van eerste scan tot volledig AI-systeem. Kies wat bij je past.",
    setupLabel: "Setup (eenmalig)",
    monthlyLabel: "Maandelijks",
    idealLabel: "Ideaal voor:",
    allPlans: "Alle plannen: No cure, no pay op de initiële Scan.",
    tiers: [
      {
        name: "Quick Start", setup: "€2.500–5.000", monthly: "€500–800/mo",
        features: ["AI Opportunity Scan", "RAG op bestaande documentatie", "Basis kennisbank", "Standaard integraties"],
        ideal: "Teams die snel willen starten", highlighted: false, cta: "Start je Scan →",
      },
      {
        name: "Professional", setup: "€10.000–15.000", monthly: "€1.500–2.500/mo", badge: "Meest gekozen",
        features: ["Alles van Quick Start", "Diepte-interviews met je team", "Kennis uit hoofden, op papier — en bruikbaar voor AI", "Digitale collega's (tot 3)", "Maandelijkse optimalisatie"],
        ideal: "Groeiende organisaties (20-200 FTE)", highlighted: true, cta: "Plan een gesprek →",
      },
      {
        name: "Enterprise", setup: "Vanaf €25.000", monthly: "€3.500–5.000/mo",
        features: ["Alles van Professional", "Volledig Company Brain", "Custom integraties", "Onbeperkt digitale collega's", "Dedicated support"],
        ideal: "Grote organisaties (200+ FTE)", highlighted: false, cta: "Neem contact op →",
      },
    ],
    faqTitle: "Veelgestelde vragen over pricing",
    faqItems: [
      { question: "Wat als ik halverwege wil stoppen?", answer: "Geen lock-in. Je kunt maandelijks opzeggen." },
      { question: "Zijn er extra kosten voor AI-gebruik?", answer: "Nee. Genereus gebruik zit in elk plan. Bij uitzonderlijk hoog volume bespreken we het." },
      { question: "Kan ik upgraden?", answer: "Ja, op elk moment. Je bestaande kennisbank groeit gewoon mee." },
      { question: "Wat zit er niet in de prijs?", answer: "Custom integraties met legacy systemen kunnen extra kosten met zich meebrengen. We zijn daar altijd transparant over." },
    ],
  },
  en: {
    heroTitle: "Honest pricing",
    heroSub: "From first scan to full AI system. Choose what fits.",
    setupLabel: "Setup (one-time)",
    monthlyLabel: "Monthly",
    idealLabel: "Ideal for:",
    allPlans: "All plans: No cure, no pay on the initial Scan.",
    tiers: [
      {
        name: "Quick Start", setup: "€2,500–5,000", monthly: "€500–800/mo",
        features: ["AI Opportunity Scan", "RAG on existing documentation", "Basic knowledge base", "Standard integrations"],
        ideal: "Teams that want to move fast", highlighted: false, cta: "Start your Scan →",
      },
      {
        name: "Professional", setup: "€10,000–15,000", monthly: "€1,500–2,500/mo", badge: "Most popular",
        features: ["Everything in Quick Start", "In-depth interviews with your team", "Knowledge from heads onto paper — and usable for AI", "Digital colleagues (up to 3)", "Monthly optimisation"],
        ideal: "Growing organisations (20-200 FTE)", highlighted: true, cta: "Book a call →",
      },
      {
        name: "Enterprise", setup: "From €25,000", monthly: "€3,500–5,000/mo",
        features: ["Everything in Professional", "Full Company Brain", "Custom integrations", "Unlimited digital colleagues", "Dedicated support"],
        ideal: "Large organisations (200+ FTE)", highlighted: false, cta: "Get in touch →",
      },
    ],
    faqTitle: "Frequently asked questions about pricing",
    faqItems: [
      { question: "What if I want to stop halfway?", answer: "No lock-in. You can cancel monthly." },
      { question: "Are there extra costs for AI usage?", answer: "No. Generous usage is included in every plan. For exceptionally high volume, we\u2019ll discuss it." },
      { question: "Can I upgrade?", answer: "Yes, at any time. Your existing knowledge base simply grows with you." },
      { question: "What\u2019s not included?", answer: "Custom integrations with legacy systems may involve additional costs. We\u2019re always transparent about that." },
    ],
  },
};

export default function PricingPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">{c.heroSub}</p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 150}>
              <div className={`rounded-xl p-8 h-full flex flex-col ${
                tier.highlighted
                  ? "bg-white shadow-[0_4px_20px_rgba(139,154,107,0.15)] ring-2 ring-sage relative"
                  : "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              }`}>
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-xs px-4 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-serif text-xl">{tier.name}</h3>
                <div className="mt-4">
                  <p className="text-sm text-grey/50 uppercase tracking-wide">{c.setupLabel}</p>
                  <p className="text-2xl font-serif text-sage">{tier.setup}</p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-grey/50 uppercase tracking-wide">{c.monthlyLabel}</p>
                  <p className="text-xl font-serif text-grey">{tier.monthly}</p>
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-grey/70 font-light">
                      <span className="text-sage mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-grey/50 italic">{c.idealLabel} {tier.ideal}</p>
                <Link href="/contact" className={`mt-6 block text-center px-6 py-3 rounded-lg transition-colors ${
                  tier.highlighted
                    ? "bg-sage text-white hover:bg-sage-dark"
                    : "border border-sage text-sage hover:bg-sage hover:text-white"
                }`}>
                  {tier.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={500}>
          <p className="text-center mt-8 text-sage text-sm font-medium">{c.allPlans}</p>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6">
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
