import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ComparisonTable from "@/components/ComparisonTable";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 lg:py-40 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.15] text-grey max-w-3xl mx-auto">
              Je bedrijf weet meer dan je denkt.
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-light text-grey/70 max-w-2xl mx-auto leading-relaxed">
              Cruciale kennis zit vast in hoofden, inboxes en spreadsheets.
              <br className="hidden md:block" />
              Nativ maakt die kennis toegankelijk — zodat AI écht waarde levert.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors text-base"
              >
                Plan een vrijblijvend gesprek →
              </Link>
              <Link
                href="/diensten"
                className="border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors text-base"
              >
                Bekijk onze aanpak
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
              Het probleem dat niemand benoemt
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>De meeste bedrijven verspillen 40% van hun potentieel.</p>
              <p>
                Niet door slechte mensen. Niet door slechte tools.
                <br />
                Maar omdat cruciale informatie vastzit in de hoofden van mensen,
                verspreid over inboxes, of begraven in spreadsheets.
              </p>
              <p>
                AI kan helpen. Maar alleen als het wéét wat jouw bedrijf weet.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Three-Step Journey */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Hoe we werken
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-sage/20" aria-hidden="true" />

            {[
              {
                num: "1",
                title: "Scan",
                desc: "We scannen waar AI de meeste waarde creëert in jouw organisatie.",
                detail: "In 1 week weet je precies waar de kansen liggen.",
              },
              {
                num: "2",
                title: "Build",
                desc: "We bouwen je AI-kennisbank — de context die AI écht nuttig maakt.",
                detail: "Jouw bedrijfskennis, gestructureerd en toegankelijk.",
              },
              {
                num: "3",
                title: "Deploy",
                desc: "We zetten digitale collega's in die echt werk leveren.",
                detail: "Geen speelgoed. Geen demo's. Resultaat.",
              },
            ].map((step, i) => (
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
                Start met een Scan →
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
              Waarom bedrijven switchen
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
              <span>🇪🇺 EU Data Hosting</span>
              <span aria-hidden="true">·</span>
              <span>🔒 GDPR Compliant</span>
              <span aria-hidden="true">·</span>
              <span>🤝 No Cure, No Pay</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA / Closer */}
      <section className="py-20 md:py-28 px-6 bg-cream">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Klaar om te ontdekken wat jouw bedrijf écht weet?
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              Plan een vrijblijvend gesprek. Geen verkooppraatje — gewoon een
              eerlijk gesprek over wat AI voor jouw organisatie kan betekenen.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block text-base"
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
