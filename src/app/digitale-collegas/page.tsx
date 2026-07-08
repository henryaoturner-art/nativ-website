import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ColleagueShowcase from "./ColleagueShowcase";

export const metadata: Metadata = pageMeta(
  "/digitale-collegas",
  "Digitale collega's voor marketing, sales, finance & hr | nativ",
  "Digitale collega's draaien op je Company Brain en werken echt mee, geen losse chatbot. Vandaag voor marketing, daarna sales, finance en hr. Voor het mkb.",
);

const collegas = [
  {
    href: "/digitale-collega-marketing",
    title: "Marketing-collega",
    live: true,
    desc: "Doet research, bedenkt ideeën, schrijft content, maakt beeld, controleert SEO, plant in en meet de resultaten. In jullie eigen toon, want hij put uit je Company Brain.",
  },
  {
    href: "/digitale-collega-sales",
    title: "Sales-collega",
    live: false,
    desc: "Bouwt rijke profielen van prospects en accounts, bereidt elk verkoopgesprek voor, herkent kansen bij bestaande klanten, kwalificeert binnenkomende leads, en schrijft outreach en offertes in jullie stem.",
  },
  {
    href: "/digitale-collega-finance",
    title: "Finance-collega",
    live: false,
    desc: "Leest je cijfers (zoals uit Exact Online), maakt maandrapportages die over locaties vergelijkbaar zijn, signaleert afwijkingen tot op de bron, zet business cases in één structuur, en geeft een rollende forecast.",
  },
  {
    href: "/digitale-collega-hr",
    title: "HR-collega",
    live: false,
    desc: "Een digitale collega voor de hr-functie, in ontwikkeling. De persoonlijke assistent beantwoordt vandaag al de bedrijfsvragen van je medewerkers.",
  },
];

const faqItems = [
  {
    question: "Wat is een digitale collega?",
    answer:
      "Een digitale collega is geen losse chatbot, maar een AI-collega die vanuit je Company Brain werkt en echt meewerkt. Hij kent jullie manier van werken en wordt elke maand productiever.",
  },
  {
    question: "Welke digitale collega's zijn er?",
    answer:
      "Vandaag een marketing-collega; sales, finance en hr volgen. Elke collega draait op dezelfde Company Brain, zodat opgebouwde kennis gedeeld wordt.",
  },
  {
    question: "Wat is het verschil met ChatGPT of een chatbot?",
    answer:
      "Een chatbot geeft algemene antwoorden. Een digitale collega werkt vanuit de kennis van jóuw bedrijf en levert echt werk op, in jullie eigen toon en processen.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function DigitaleCollegasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/digitale-collegas", "Digitale collega's voor marketing, sales, finance en hr", "Digitale collega's draaien op je Company Brain en werken echt mee, geen losse chatbot. Vandaag voor marketing, daarna sales, finance en hr."),
            faqSchema,
          ]),
        }}
      />

      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Digitale collega&apos;s die echt meewerken
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed max-w-2xl mx-auto">
              Een digitale collega is geen tool die je koopt. Het is een collega
              die werkt vanuit je Company Brain: hij kent jullie toon, jullie
              klanten, jullie afspraken. Hoe langer hij meedraait, hoe
              productiever hij wordt. Geen losse chatbot die elke vraag vanaf nul
              beantwoordt, maar iemand die jullie context al kent.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The basis: personal assistant */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              De basis: een persoonlijke assistent voor iedereen
            </h2>
            <div className="mt-6 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              <p>
                Zodra je een Company Brain hebt, krijgt elke medewerker een
                persoonlijke assistent. Eén plek om het bedrijf alles te vragen,
                met een bronvermelding bij elk antwoord. Dat is de basis.
              </p>
              <p>
                Het is ook de manier waarop je hele team went aan werken met AI.
                Mensen ontdekken wat het kan, en uit dat gebruik komen vanzelf de
                vragen die om meer vragen. Vaak is dat het moment waarop een
                digitale collega voor een specifieke functie zinvol wordt.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Showcase (videos) */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[800px] mx-auto text-center mb-10 md:mb-14">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Maak kennis met de collega&apos;s
            </h2>
            <p className="mt-4 text-base font-light text-grey/50">
              Klik op een collega om de introductie te bekijken.
            </p>
          </FadeIn>
        </div>
        <ColleagueShowcase />
      </section>

      {/* Scale per colleague */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Opschalen per collega
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Boven op die basis schakel je digitale collega&apos;s in, per
              functie. Je begint niet met alles tegelijk; je breidt uit waar de
              meeste tijd in gaat zitten. Bij elke collega staat of die live is
              of in ontwikkeling.
            </p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {collegas.map((c, i) => (
              <FadeIn key={c.href} delay={i * 100}>
                <Link
                  href={c.href}
                  className="group block h-full bg-surface rounded-2xl p-6 border border-sage-light hover:border-sage transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-xl text-grey">{c.title}</h3>
                    {c.live ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/15 text-sage px-2.5 py-0.5 text-xs font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
                        Live
                      </span>
                    ) : (
                      <span className="rounded-full bg-grey/10 text-grey/60 px-2.5 py-0.5 text-xs font-medium shrink-0">
                        In ontwikkeling
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-grey/70 font-light leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="mt-4 inline-block text-sage text-sm font-medium group-hover:text-sage-dark transition-colors">
                    Lees meer →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How they work with your team */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Hoe ze samenwerken met je team
            </h2>
            <div className="mt-6 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              <p>
                Een digitale collega vervangt je team niet. Hij neemt het werk
                over dat zich herhaalt en dat opschaalt, zodat je mensen tijd
                houden voor het werk dat mensen beter doen.
              </p>
              <p>
                De mens blijft aan het stuur. Bij elke stap die ertoe doet zit
                een goedkeuringsmoment: jij beslist wat de deur uitgaat. Een
                collega die zelfstandig de verkeerde mail verstuurt, is precies
                wat we niet bouwen.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How to start */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <p className="font-serif text-2xl md:text-3xl text-grey">
              Welke digitale collega heeft jouw team nodig?
            </p>
            <p className="mt-4 text-grey/70 font-light leading-relaxed">
              Je begint met een Company Brain en de persoonlijke assistent. Je
              team went aan AI, en je breidt uit met een collega zodra je ziet
              waar de meeste winst zit. Klein beginnen, opschalen wanneer je
              wilt.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Related */}
      <section className="pb-16 px-6">
        <div className="max-w-[680px] mx-auto flex flex-wrap gap-x-6 gap-y-2 justify-center text-base">
          <Link
            href="/kennis/wat-is-een-bedrijfsbrein"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Wat is een Company Brain?
          </Link>
          <Link
            href="/company-brain"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Company Brain
          </Link>
          <Link
            href="/scan"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            AI Opportunity Scan
          </Link>
        </div>
      </section>
    </>
  );
}
