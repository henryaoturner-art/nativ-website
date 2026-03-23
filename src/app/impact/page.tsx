import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Impact | NATIV",
  description:
    "Elke diagnostiekrespons draagt bij aan een goed doel. Betere data, betere wereld. The Efficiency Dividend.",
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
              Elke keer dat iemand een diagnostiekvragenlijst invult, gaat er een donatie 
              naar een goed doel. Hogere respons. Betere data. Maatschappelijke impact.
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
                title: "Kies goede doelen",
                desc: "Bij elke diagnostiek kies je 3 geregistreerde goede doelen die aansluiten bij jouw waarden — lokaal of internationaal.",
              },
              {
                step: "2",
                title: "Stel je donatie in",
                desc: "Bepaal het bedrag per respons (€0,01 – €10). Jij hebt volledige controle over je bijdrage.",
              },
              {
                step: "3",
                title: "Respondenten kiezen",
                desc: "Wanneer medewerkers of stakeholders de vragenlijst openen, kiezen zij welk goed doel hun donatie krijgt.",
              },
              {
                step: "4",
                title: "Volg je impact",
                desc: "Bekijk live hoeveel er gedoneerd is, per goed doel, en hoe je responspercentage stijgt door het donatiemechanisme.",
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

      {/* Results */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-12">
              Waarom het werkt
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-4xl md:text-5xl font-serif text-sage">↑</p>
                <p className="mt-3 font-serif text-lg">Hogere responspercentage</p>
                <p className="mt-2 text-sm text-grey/60 font-light">
                  Respondenten vullen eerder en vollediger in als hun deelname direct bijdraagt aan een goed doel.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-4xl md:text-5xl font-serif text-sage">€</p>
                <p className="mt-3 font-serif text-lg">Lage kosten, groot effect</p>
                <p className="mt-2 text-sm text-grey/60 font-light">
                  Vanaf €0,01 per respons. Een klein bedrag dat zich terugverdient in betere data en hogere betrokkenheid.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-4xl md:text-5xl font-serif text-sage">📊</p>
                <p className="mt-3 font-serif text-lg">Transparant dashboard</p>
                <p className="mt-2 text-sm text-grey/60 font-light">
                  Realtime inzicht in totale donaties, verdeling per goed doel en responspercentagetrends.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Flexibility */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-8">
              Volledige flexibiliteit
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>
                Kies zelf je goede doelen — elk geregistreerd goed doel is mogelijk. 
                Lokaal of internationaal, groot of klein.
              </p>
              <p>
                Pas je donatiebedrag aan per diagnostiek. Meer budget? Hogere donatie. 
                Krap budget? Zelfs €0,01 maakt verschil als honderden mensen deelnemen.
              </p>
              <p>
                Het donatiemechanisme is ingebouwd in elke diagnostiek die via ons platform loopt — 
                van AI Opportunity Scans tot lopende kennisvergaringsworkflows.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beyond Diagnostics */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Daarnaast investeren we in
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎓",
                title: "AI-educatie",
                desc: "Gratis AI-scans en workshops voor non-profits en sociale ondernemingen.",
              },
              {
                emoji: "🌍",
                title: "Duurzame technologie",
                desc: "EU-gehoste, energie-efficiënte AI-modellen. Bewust kiezen voor duurzame infra.",
              },
              {
                emoji: "🤝",
                title: "Open kennis",
                desc: "Inzichten delen via blogs, talks en open-source tools. Wat we leren, delen we terug.",
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

      {/* CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Klaar om impact te maken?
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              Betere data verzamelen én bijdragen aan een betere wereld. 
              Setup duurt minder dan 5 minuten.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                Plan een gesprek →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
