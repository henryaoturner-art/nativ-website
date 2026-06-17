import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: {
    absolute: "Wat is een Company Brain (bedrijfsbrein)? | nativ",
  },
  description:
    "Een Company Brain is één centrale AI-kennislaag voor je bedrijf: alles wat je bedrijf weet, bruikbaar voor AI. Wat het is, hoe het wordt gevuld, hoe je begint.",
  alternates: { canonical: "/kennis/wat-is-een-bedrijfsbrein" },
};

const faqItems = [
  {
    question: "Wat is een Company Brain (bedrijfsbrein)?",
    answer:
      "Een Company Brain is één centrale kennislaag waarin de kennis van je bedrijf samenkomt, uit de hoofden van je mensen, uit je systemen en documenten. Daarop draaien AI-assistenten en digitale collega's die echt snappen hoe jullie werken.",
  },
  {
    question: "Wat is een digitale collega?",
    answer:
      "Een digitale collega is geen tool die je koopt, maar een AI-collega die werkt vanuit je Company Brain en die elke maand productiever wordt. nativ levert digitale collega's voor marketing, sales, finance en hr.",
  },
  {
    question: "Is dit geschikt voor het mkb?",
    answer:
      "Ja. nativ is gebouwd voor Nederlandse mkb- en mid-market-organisaties die AI bedrijfsbreed willen inzetten, niet als los experiment, maar als onderdeel van het team.",
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

export default function PillarBedrijfsbreinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <p className="text-sage text-sm font-medium tracking-wide uppercase">
              Kennis
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Wat is een Company Brain?
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              Een Company Brain (ook wel bedrijfsbrein of tweede brein) is één
              centrale kennislaag waarin samenkomt wat je bedrijf weet: uit de
              hoofden van je mensen, uit je systemen en documenten, en uit live
              research. Daarbovenop draaien AI-assistenten en digitale collega's
              die snappen hoe jullie werken, in plaats van algemene antwoorden te
              geven. nativ bouwt zo'n Company Brain voor het Nederlandse mkb.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body sections */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waarom losse AI-tools generiek aanvoelen
            </h2>
            <div className="mt-6 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              <p>
                Je hebt ChatGPT geprobeerd. Het schrijft een nette mail, maar
                weet niets van jouw klanten, jouw afspraken of jouw toon. Dat
                ligt niet aan het model. Het model is niet kapot, de bibliotheek
                is leeg.
              </p>
              <p>
                Een taalmodel is goed in taal. Het kent jouw bedrijf niet. De
                kennis die AI nodig heeft om bruikbaar te zijn, staat verspreid:
                in losse tools, in mailboxen, in documenten, en vooral in de
                hoofden van je mensen. Zolang die context ontbreekt, blijft elk
                antwoord algemeen. Dáár begint een Company Brain: niet bij een
                slimmer model, maar bij de context eronder.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Company Brain, chatbot of RAG: het verschil
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Een Company Brain is geen chatbot en geen zoekmachine. Kort het
              onderscheid:
            </p>
            <ul className="mt-6 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">Een chatbot</strong>{" "}
                  beantwoordt vragen met algemene kennis. Hij weet niets
                  specifieks over jouw bedrijf.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">RAG</strong> (een
                  techniek die er documenten bij zoekt) haalt losse stukken tekst
                  op. Beter, maar het blijft graven in een stapel documenten,
                  zonder structuur.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Een Company Brain
                  </strong>{" "}
                  ordent de kennis van je bedrijf: wie doet wat, hoe werken
                  jullie, welke afspraken gelden. Elk antwoord komt met een
                  bronvermelding, en gevoelige informatie wordt alleen getoond
                  aan wie die mag zien.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Het verschil zit dus niet in een beter model, maar in
              gestructureerde, herleidbare context.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Hoe een Company Brain wordt gevuld
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Een Company Brain put uit drie bronnen. Die combinatie is wat het
              compleet maakt, en wat een losse chatbot mist:
            </p>
            <ul className="mt-6 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    De hoofden van je mensen.
                  </strong>{" "}
                  Het meeste van wat een bedrijf weet, staat nergens
                  opgeschreven. Het zit in ervaring. nativ haalt dat eruit met
                  InsightFlow, een gestructureerde manier van uitvragen, en
                  schrijft het naar de Brain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Je systemen en documenten.
                  </strong>{" "}
                  Wat al wél is vastgelegd, in je CRM, je drive, je mail, wordt
                  ingelezen, geordend en doorzoekbaar gemaakt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Live research.
                  </strong>{" "}
                  Voor wat buiten je bedrijf speelt, zoals de markt of een
                  specifieke prospect, halen research-agents actuele informatie
                  op.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Je hoeft niet alles vast te leggen. nativ begint met de Minimum
              Viable Context (MVC™): de gestructureerde twintig procent van je
              bedrijfscontext die zo'n tachtig procent van de AI-taken dekt.
              Genoeg om te beginnen, en je vult het verder aan terwijl je werkt.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Digitale collega's bovenop de Brain
            </h2>
            <div className="mt-6 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              <p>
                Op de Brain draaien digitale collega's. Een digitale collega is
                geen tool die je koopt, maar een collega die werkt vanuit je
                Company Brain. Hij kent jullie manier van werken en wordt elke
                maand productiever.
              </p>
              <p>
                De marketing-collega draait vandaag: research, content schrijven,
                beeld maken en inplannen, in jullie eigen toon. Collega's voor
                sales, finance en hr zijn in ontwikkeling. Daarnaast krijgt elke
                medewerker een persoonlijke assistent: één plek om het bedrijf
                alles te vragen, met een bronvermelding bij elk antwoord.
              </p>
            </div>
            <p className="mt-6 text-base">
              <Link
                href="/digitale-collegas"
                className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
              >
                Bekijk de digitale collega's
              </Link>
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waarom dit voor het mkb juist groter speelt
            </h2>
            <div className="mt-6 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              <p>
                In een mkb-bedrijf zit de kennis vaak in een paar hoofden.
                Vertrekt iemand, dan vertrekt de kennis mee. Een groot bedrijf
                vangt dat op met afdelingen en documentatie. Een mkb'er zelden.
              </p>
              <p>
                Juist daar helpt een Company Brain. Het legt vast wat anders
                alleen in iemands hoofd zat, en maakt het bruikbaar voor het hele
                team. Je hebt er geen AI-afdeling voor nodig, en je begint klein.
              </p>
            </div>
            <p className="mt-6 text-base">
              <Link
                href="/company-brain"
                className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
              >
                Meer over de Company Brain
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How to start */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center bg-white rounded-2xl px-8 py-12 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Hoe je begint
            </h2>
            <p className="mt-5 text-lg font-light text-grey/80 leading-relaxed">
              De eerste stap is de AI Opportunity Scan. In één week brengen we in
              kaart waar AI in jouw bedrijf het meeste oplevert: welke processen,
              welke kennis, welke risico's. Je krijgt een concreet, geprioriteerd
              overzicht voordat je iets vastlegt. No cure, no pay.
            </p>
            <Link
              href="/scan"
              className="mt-7 inline-block bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een AI Opportunity Scan →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-10 text-grey">
              Veelgestelde vragen
            </h2>
          </FadeIn>
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
