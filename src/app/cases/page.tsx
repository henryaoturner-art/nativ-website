import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Echte resultaten bij echte bedrijven. Bekijk hoe Nativ organisaties helpt met AI.",
};

const cases = [
  {
    industry: "Tech",
    size: "80 FTE",
    headline:
      "Van 3 dagen naar 3 uur: kennisdeling bij een groeiend techbedrijf",
    challenge:
      "Cruciale productkennis zat verspreid over Slack, Notion en de hoofden van senior developers. Nieuwe teamleden deden er gemiddeld 3 dagen over om antwoorden te vinden.",
    approach:
      "Scan van alle kennisstromen, opbouw van een gestructureerde AI-kennisbank, en deployment van een digitale collega die direct antwoord geeft op productgerelateerde vragen.",
    result:
      "Onboardingtijd met 60% gereduceerd. Kennisverzoeken van 3 dagen naar 3 uur. Team rapporteert significant minder onderbrekingen.",
  },
  {
    industry: "Professional Services",
    size: "120 FTE",
    headline:
      "Offertes 4x sneller: AI-gestuurde kennisbank voor een adviesbureau",
    challenge:
      "Consultants besteedden 40% van hun tijd aan het zoeken naar eerdere projecten, methodologieën en klantinzichten. Elke offerte werd vanaf nul opgebouwd.",
    approach:
      "AI Opportunity Scan gevolgd door opbouw van een Company Brain met alle projecthistorie, methodologieën en klantprofielen.",
    result:
      "Offertetijd van 2 weken naar 3 dagen. Hergebruik van kennis steeg van 15% naar 70%. Kwaliteit van offertes meetbaar verbeterd.",
  },
];

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Wat we&apos;ve gebouwd
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70">
              Echte resultaten bij echte bedrijven.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Cards */}
      <section className="py-10 md:py-16 px-6 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 150}>
              <article className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-3 text-sm text-grey/50 mb-4">
                  <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs">
                    {c.industry}
                  </span>
                  <span>·</span>
                  <span>{c.size}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl leading-snug">
                  {c.headline}
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-grey/50 uppercase tracking-wide mb-1">
                      De uitdaging
                    </p>
                    <p className="text-grey/70 font-light leading-relaxed text-sm">
                      {c.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-grey/50 uppercase tracking-wide mb-1">
                      Onze aanpak
                    </p>
                    <p className="text-grey/70 font-light leading-relaxed text-sm">
                      {c.approach}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-grey/50 uppercase tracking-wide mb-1">
                      Het resultaat
                    </p>
                    <p className="text-grey/80 font-light leading-relaxed text-sm">
                      {c.result}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="max-w-[680px] mx-auto text-center mt-16">
            <p className="text-grey/60 font-light">
              Wil je de volgende zijn?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
