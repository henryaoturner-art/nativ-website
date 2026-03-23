import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "AI Opportunity Scan",
  description:
    "In één week weten waar AI het meeste oplevert in jouw organisatie. Concreet, actionable, geen vaag advies. Vanaf €495.",
};

const faqItems = [
  {
    question: "Wat heb ik nodig om te starten?",
    answer:
      "Niets bijzonders. Toegang tot relevante documentatie en 30 minuten van je tijd voor een intake.",
  },
  {
    question: "Hoe zit het met mijn data?",
    answer:
      "Alle data blijft binnen de EU. Wij zijn volledig GDPR-compliant. Na afloop kun je kiezen of we data bewaren of verwijderen.",
  },
  {
    question: "Wat als het niets oplevert?",
    answer: "Dan betaal je niets. No cure, no pay. Simpel.",
  },
  {
    question: "Kan ik daarna verder met Nativ?",
    answer:
      "Ja. De Scan is stap 1 van ons drielaags model. Na de Scan kun je doorpakken met een AI-kennisbank en digitale collega's.",
  },
];

export default function ScanPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              AI Opportunity Scan
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              In één week weten waar AI het meeste oplevert in jouw organisatie.
              <br />
              Concreet. Toepasbaar. Geen vaag advies.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                Plan je Scan →
              </Link>
              <p className="mt-3 text-sm text-grey/50">
                Vanaf €495 · No cure, no pay
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Wat je krijgt
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <ul className="mt-8 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">·</span>
                Een complete analyse van AI-kansen in jouw organisatie
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">·</span>
                Prioritering op basis van impact én haalbaarheid
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">·</span>
                Concrete eerste stappen — geen PowerPoint, maar een plan
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">·</span>
                Persoonlijke toelichting van ons team
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10 flex flex-wrap gap-6 text-sm">
              <div className="bg-white rounded-xl px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <span className="text-grey/50">Doorlooptijd:</span>{" "}
                <span className="font-medium">1 week</span>
              </div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <span className="text-grey/50">Format:</span>{" "}
                <span className="font-medium">
                  Interactief rapport + persoonlijke sessie
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works — Timeline */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Zo werkt het
            </h2>
          </FadeIn>
          <div className="mt-12 space-y-0">
            {[
              {
                days: "Dag 1–2",
                title: "Intake",
                desc: "We leren je organisatie kennen. Korte gesprekken, toegang tot bestaande documentatie.",
              },
              {
                days: "Dag 3–5",
                title: "Analyse",
                desc: "Onze AI analyseert jouw processen, data en kennisstromen. Wij interpreteren de resultaten.",
              },
              {
                days: "Dag 5–7",
                title: "Oplevering",
                desc: "Je ontvangt een helder rapport met geprioriteerde AI-kansen en een concreet actieplan.",
              },
            ].map((step, i) => (
              <FadeIn key={step.days} delay={i * 150}>
                <div className="flex gap-6 pb-10 relative">
                  {/* Timeline line */}
                  {i < 2 && (
                    <div
                      className="absolute left-[11px] top-8 bottom-0 w-px bg-sage/20"
                      aria-hidden="true"
                    />
                  )}
                  {/* Dot */}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center mt-1" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-sage" />
                  </div>
                  <div>
                    <span className="text-sage text-sm font-medium">
                      {step.days}
                    </span>
                    <h3 className="font-serif text-xl mt-1">{step.title}</h3>
                    <p className="mt-2 text-grey/70 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center">
              Investering
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full">
                <h3 className="font-serif text-xl">
                  Deep Dive — Standaard
                </h3>
                <p className="text-3xl font-serif text-sage mt-3">€495</p>
                <p className="mt-4 text-grey/70 font-light">
                  Gestandaardiseerde analyse
                </p>
                <p className="text-grey/70 font-light">
                  Ideaal als startpunt
                </p>
                <Link
                  href="/contact"
                  className="mt-6 block text-center bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors"
                >
                  Start je Scan →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={250}>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full">
                <h3 className="font-serif text-xl">
                  Deep Dive — Op Maat
                </h3>
                <p className="text-3xl font-serif text-sage mt-3">€2.500</p>
                <p className="mt-4 text-grey/70 font-light">
                  Volledig op maat
                </p>
                <p className="text-grey/70 font-light">
                  Voor complexe organisaties
                </p>
                <Link
                  href="/contact"
                  className="mt-6 block text-center border border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white transition-colors"
                >
                  Plan een intake →
                </Link>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={400}>
            <p className="text-center mt-8 text-sage text-sm font-medium">
              Beide opties: No cure, no pay. Niet tevreden? Je betaalt niets.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-10">
              Veelgestelde vragen
            </h2>
          </FadeIn>
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
