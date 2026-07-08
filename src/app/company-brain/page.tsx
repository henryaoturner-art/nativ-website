import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = pageMeta(
  "/company-brain",
  "Company Brain: één AI-kennisbank voor je bedrijf | nativ",
  "Eén centrale kennislaag, gevuld vanuit de hoofden van je mensen, je systemen en live research. De basis onder elke digitale collega. Voor het mkb.",
);

const faqItems = [
  {
    question: "Wat is een Company Brain?",
    answer:
      "Een Company Brain is één centrale kennislaag voor je bedrijf: alles wat je bedrijf weet, uit de hoofden van je mensen, je systemen en documenten, op één plek en klaar voor AI. Het is de basis waarop een persoonlijke assistent en digitale collega's draaien.",
  },
  {
    question: "Waarom heb je een Company Brain nodig voor AI?",
    answer:
      "Bedrijfs-AI loopt niet vast op een te dom model, maar op te weinig context. Een Company Brain geeft AI de specifieke kennis van jouw bedrijf, zodat antwoorden kloppen in plaats van algemeen blijven.",
  },
  {
    question: "Voor wie is een Company Brain?",
    answer:
      "Voor het Nederlandse mkb dat AI bedrijfsbreed wil inzetten, niet als los experiment maar als vaste basis onder het werk.",
  },
  {
    question: "Wat is het verschil tussen een Company Brain en een chatbot zoals ChatGPT?",
    answer:
      "Een losse chatbot weet niets van jouw bedrijf en begint elk gesprek opnieuw. Een Company Brain geeft AI de context van jouw organisatie: jullie kennis, afspraken en manier van werken. Zo krijg je consistente antwoorden die kloppen met hoe jullie echt werken, en die kennis blijft van jou in plaats van te verdwijnen in losse chats.",
  },
  {
    question: "Waarom niet gewoon losse AI-tools gebruiken?",
    answer:
      "Losse tools lossen elk een stukje op, maar delen geen kennis en bouwen niets op. Een Company Brain legt de kennis één keer vast en laat elke digitale collega eruit werken. Je bouwt aan één laag die met je bedrijf meegroeit, in plaats van losse abonnementen die niets van elkaar weten.",
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

export default function CompanyBrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/company-brain", "Company Brain: één AI-kennisbank voor je bedrijf", "Eén centrale AI-kennislaag, gevuld vanuit de hoofden van je mensen, je systemen en live research. De basis onder elke digitale collega, voor het mkb."),
            faqSchema,
          ]),
        }}
      />

      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Een Company Brain voor je bedrijf
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              Een Company Brain is de centrale kennislaag van je bedrijf: één
              plek waar samenkomt wat je bedrijf weet, klaar voor AI om mee te
              werken. Geen losse tool, maar de basis waarop een persoonlijke
              assistent en digitale collega's draaien. Het lost op waar
              bedrijfs-AI echt op vastloopt: niet een te dom model, maar te
              weinig context.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              De drie bronnen
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Een Company Brain wordt uit drie bronnen gevuld. Die combinatie
              maakt het compleet:
            </p>
            <ul className="mt-6 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    De hoofden van je mensen.
                  </strong>{" "}
                  Het meeste van wat je bedrijf weet, staat nergens opgeschreven.
                  nativ haalt het eruit met InsightFlow, een gestructureerde,
                  spraakgestuurde manier van uitvragen, en schrijft het naar de
                  Brain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Je systemen en documenten.
                  </strong>{" "}
                  Wat al is vastgelegd, in je CRM, je drive, je mail, wordt
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
                  specifieke klant, halen research-agents actuele informatie op.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Je hoeft niet alles vast te leggen. nativ begint met de Minimum
              Viable Context (MVC™): de gestructureerde twintig procent van je
              bedrijfscontext die zo'n tachtig procent van de AI-taken dekt.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat het oplevert
            </h2>
            <ul className="mt-6 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Je kennis blijft van je bedrijf.
                  </strong>{" "}
                  Wat we vastleggen, uit je mensen, je systemen en je werkwijze,
                  wordt eigendom van je bedrijf. Het zit niet meer verspreid in
                  hoofden en losse spreadsheets, en het verdwijnt niet als iemand
                  weggaat.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Elke medewerker een persoonlijke assistent.
                  </strong>{" "}
                  Eén plek om het bedrijf alles te vragen, met een bronvermelding
                  bij elk antwoord. Dat is de basis, en de manier waarop je team
                  went aan werken met AI.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Digitale collega's per functie.
                  </strong>{" "}
                  Boven op de Brain schakel je collega's in voor marketing,
                  sales, finance of hr. Ze werken in jullie eigen toon, want ze
                  putten uit dezelfde Brain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Output die klopt.
                  </strong>{" "}
                  Antwoorden en documenten in de stem van je bedrijf, met de bron
                  erbij, zodat je weet waar het vandaan komt.
                </span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Veilig, en je data blijft van jou
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Je Company Brain draait in een eigen, afgeschermde omgeving: per
              bedrijf gescheiden, versleuteld opgeslagen, en de isolatie wordt
              bij elke zoekopdracht afgedwongen. Je kunt je data in de EU laten
              staan. Elk antwoord komt met een bronvermelding, dus het is geen
              zwarte doos. Gevoelige informatie wordt alleen getoond aan wie die
              mag zien. En de kennis die we vastleggen, blijft van jou.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How to start */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center bg-surface rounded-2xl px-8 py-12 border border-sage-light">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Hoe je begint
            </h2>
            <p className="mt-5 text-lg font-light text-grey/80 leading-relaxed">
              Je begint met een Company Brain en de persoonlijke assistent, op
              één plek of één team. Klein en concreet, en je breidt uit zodra je
              de waarde ziet. Wil je weten of dit bij jou past? Plan een gesprek.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors"
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
            href="/digitale-collegas"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Digitale collega's
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
