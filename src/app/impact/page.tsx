import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Impact | NATIV",
  description:
    "Hoe NATIV bijdraagt aan een betere wereld. Elke opdracht draagt bij aan maatschappelijke impact.",
};

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              The Efficiency Dividend
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed max-w-2xl mx-auto">
              Wij geloven dat efficiëntie niet alleen winst hoeft te betekenen. 
              Daarom investeren we een deel van elke opdracht in maatschappelijke impact.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Hoe het werkt
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Wij leveren waarde",
                desc: "Elke Scan, Build of Deploy-opdracht genereert meetbare efficiëntiewinst voor onze klanten.",
              },
              {
                step: "2",
                title: "Een deel gaat terug",
                desc: "Een vast percentage van onze omzet gaat naar goede doelen — automatisch, bij elke opdracht.",
              },
              {
                step: "3",
                title: "Klant kiest mee",
                desc: "Onze klanten mogen meebeslissen welke initiatieven we steunen. Jouw project, jouw keuze.",
              },
              {
                step: "4",
                title: "Transparant bijhouden",
                desc: "We rapporteren openlijk hoeveel er gedoneerd is en aan welke doelen. Geen verborgen agenda.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 150}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sage font-serif text-lg">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-grey/70 font-light leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Waar we in investeren
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎓",
                title: "AI-educatie",
                desc: "Gratis AI-scans en workshops voor non-profits en sociale ondernemingen. Kennis hoort niet achter een paywall.",
              },
              {
                emoji: "🌍",
                title: "Duurzame technologie",
                desc: "We kiezen bewust voor EU-gehoste, energie-efficiënte AI-modellen. En steunen initiatieven die technologie inzetten voor klimaatactie.",
              },
              {
                emoji: "🤝",
                title: "Open kennis",
                desc: "We delen onze inzichten via blogs, talks en open-source tools. Wat we leren, delen we terug met de community.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 150}>
                <div className="bg-white rounded-xl p-8 h-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-serif text-xl mt-4 mb-3">{item.title}</h3>
                  <p className="text-grey/70 font-light leading-relaxed text-[15px]">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-12">
              Onze impact tot nu toe
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-4xl md:text-5xl font-serif text-sage">3</p>
                <p className="mt-2 text-sm text-grey/60 font-light">Pro bono projecten</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-sage">100%</p>
                <p className="mt-2 text-sm text-grey/60 font-light">EU-gehost</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-sage">Open</p>
                <p className="mt-2 text-sm text-grey/60 font-light">Kennisdeling</p>
              </div>
            </div>
          </FadeIn>
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
              Ben je een non-profit of sociale onderneming? Of wil je als klant 
              meebeslissen waar jouw efficiency dividend naartoe gaat? Neem contact op.
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
