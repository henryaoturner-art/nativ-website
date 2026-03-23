import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Hoe NATIV bijdraagt aan een betere wereld. Technologie inzetten voor maatschappelijke impact.",
};

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Impact
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              Technologie is pas waardevol als het de wereld beter maakt.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Onze belofte
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>
                Bij NATIV geloven we dat AI-kennis niet alleen voor grote
                corporates hoort te zijn. We investeren actief in het
                toegankelijk maken van AI voor organisaties die écht impact
                maken.
              </p>
              <p>
                We doneren een vast percentage van onze omzet aan initiatieven
                die technologie inzetten voor maatschappelijk goed.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How We Give Back */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Hoe we bijdragen
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pro bono projecten",
                desc: "We bieden gratis AI-scans aan non-profits en sociale ondernemingen die een meetbare maatschappelijke impact maken.",
              },
              {
                title: "Kennisdeling",
                desc: "We delen onze inzichten open via blogs, talks en workshops. Kennis hoort niet achter een paywall.",
              },
              {
                title: "Duurzame AI",
                desc: "We kiezen bewust voor EU-gehoste, energie-efficiënte AI-modellen en transparante datapraktijken.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 150}>
                <div className="bg-cream rounded-xl p-8 h-full">
                  <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                  <p className="text-grey/70 font-light leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Samen impact maken?
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              Ben je een non-profit of sociale onderneming? Neem contact op —
              misschien kunnen we helpen.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                Neem contact op →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
