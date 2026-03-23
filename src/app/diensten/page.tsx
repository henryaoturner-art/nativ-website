import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Van eerste scan tot werkende digitale collega's. Drie stappen, elk op je eigen tempo.",
};

const layers = [
  {
    step: "Stap 1",
    title: "Scan",
    lead: "We scannen waar AI de meeste waarde creëert in jouw organisatie.",
    body: "Je weet dat AI belangrijk is. Maar waar begin je? Onze AI Opportunity Scan brengt in één week in kaart waar de grootste kansen liggen. Geen vage beloftes — concrete, geprioriteerde mogelijkheden.",
    features: [
      "AI-kansenanalyse op maat",
      "Prioritering op impact en haalbaarheid",
      "Concreet actieplan",
    ],
    meta: "Doorlooptijd: 1 week | Vanaf €495 | No cure, no pay",
    cta: "Start met een Scan →",
    ctaLink: "/scan",
    primary: true,
  },
  {
    step: "Stap 2",
    title: "Build",
    lead: "We bouwen je AI-kennisbank — de context die AI écht nuttig maakt.",
    body: "AI-tools zijn krachtig. Maar zonder de juiste context zijn ze nutteloos. Wij structureren de kennis die in jouw organisatie leeft — in hoofden, systemen, processen — tot een levende kennisbank die AI begrijpt.\n\nDit is het fundament. Zonder dit stap is elke AI-investering een gok.",
    features: [
      "Gestructureerde bedrijfskennis, toegankelijk voor AI",
      "Integratie met bestaande systemen",
      "Continue updates — geen eenmalige snapshot",
    ],
    meta: "Doorlooptijd: 2–6 weken | Op maat",
    cta: "Meer weten →",
    ctaLink: "/contact",
    primary: false,
  },
  {
    step: "Stap 3",
    title: "Deploy",
    lead: "We zetten digitale collega's in die echt werk leveren.",
    body: "Geen chatbot die \"ik weet het niet\" zegt. Digitale collega's die putten uit de collectieve intelligentie van jouw bedrijf. Die taken overnemen, vragen beantwoorden en processen versnellen — met context.",
    features: [
      "AI-agents op maat, gevoed door jouw kennisbank",
      "Integratie in bestaande workflows",
      "Meetbare resultaten",
    ],
    meta: "Doorlooptijd: doorlopend | Op maat",
    cta: "Plan een gesprek →",
    ctaLink: "/contact",
    primary: false,
  },
];

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Van inzicht naar impact
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              Drie stappen. Van eerste scan tot werkende digitale collega&apos;s.
              <br />
              Elk op je eigen tempo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Layers */}
      {layers.map((layer, i) => (
        <section
          key={layer.step}
          className={`py-20 md:py-28 px-6 ${i % 2 === 1 ? "bg-white" : ""}`}
        >
          <div className="max-w-[680px] mx-auto">
            <FadeIn>
              <span className="text-sage text-sm font-medium tracking-wide uppercase">
                {layer.step}
              </span>
              <h2 className="font-serif text-3xl md:text-[42px] leading-tight mt-2">
                {layer.title}
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-4 text-xl font-serif text-grey/80 italic leading-relaxed">
                {layer.lead}
              </p>
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
                <p className="text-sm text-grey/50 uppercase tracking-wide mb-3">
                  Wat je krijgt:
                </p>
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
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Waarom deze volgorde?
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>
                De meeste AI-projecten falen niet door slechte technologie.
                <br />
                Ze falen omdat de basis ontbreekt.
              </p>
              <p className="font-serif text-grey text-xl">
                Scan → Build → Deploy.
              </p>
              <p>
                Elke stap bouwt voort op de vorige.
                <br />
                Je kunt bij stap 1 instappen en op elk moment stoppen.
                <br />
                Geen lock-in. Geen verplichtingen.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
