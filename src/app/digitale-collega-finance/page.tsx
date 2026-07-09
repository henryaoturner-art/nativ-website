import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = pageMeta(
  "/digitale-collega-finance",
  "Digitale collega voor finance | nativ",
  "Een digitale finance-collega die vanuit je Company Brain werkt: maandrapportage, afwijkingsanalyse, business cases en forecasting. Voor het mkb.",
);

const faqItems = [
  {
    question: "Wat doet een digitale finance-collega?",
    answer:
      "Een digitale finance-collega werkt vanuit je Company Brain aan maandrapportage, afwijkingsanalyse, business cases en forecasting.",
  },
  {
    question: "Is de finance-collega al beschikbaar?",
    answer:
      "Ja. De finance-collega werkt vanuit je Company Brain; dat vormt samen met de persoonlijke assistent de basis.",
  },
  {
    question: "Voor wie is de finance-collega?",
    answer:
      "Voor mkb-bedrijven die financiële rapportage en analyse willen versnellen op basis van hun eigen cijfers en context.",
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

export default function FinanceColleaguePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/digitale-collega-finance", "Digitale collega voor finance", "Een digitale finance-collega die vanuit je Company Brain werkt: maandrapportage, afwijkingsanalyse, business cases en forecasting. Voor het mkb."),
            faqSchema,
          ]),
        }}
      />

      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 text-sage px-3 py-1 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
              Live
            </span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Een digitale collega voor je finance-team
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              Een digitale collega voor je finance-team: iemand die vanuit je
              Company Brain je financiële proces ondersteunt, van maandafsluiting
              tot forecast. Dit is wat hij doet:
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <ul className="space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Maandafsluiting en rapportage.
                  </strong>{" "}
                  Leest je cijfers, bijvoorbeeld uit Exact Online, en maakt er een
                  maandrapportage van die over je locaties of onderdelen
                  vergelijkbaar is.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Afwijkingsanalyse.
                  </strong>{" "}
                  Signaleert waar het afwijkt en waarom, met een onderbouwing die
                  je terug kunt klikken naar de bron.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Vergelijkbare business cases.
                  </strong>{" "}
                  Zet elke business case in dezelfde structuur, zodat
                  investeringen naast elkaar te leggen zijn en besluiten sneller
                  gaan.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Forecasting en cash.
                  </strong>{" "}
                  Een rollende vooruitblik op basis van jouw eigen model.
                </span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat hij uit je Company Brain haalt
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De collega werkt vanuit je Company Brain: de manier waarop jouw
              controller werkt, je structuur en je eerdere cijfers. Daardoor
              sluit elk rapport aan op hoe jullie het doen. De mens houdt de
              regie: jij keurt goed, de collega doet het voorwerk. Elk getal is
              herleidbaar naar de onderliggende cijfers, zodat je je handtekening
              eronder kunt zetten.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waar we nu staan
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De finance-collega is beschikbaar. We zetten 'm in stappen bij je
              op en stemmen hem af op hoe jullie werken. Wil je 'm bij je team
              inrichten? Dat kan.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat het oplevert
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De manier van werken van je controller staat niet langer in één
              hoofd, maar wordt vastgelegd in je Company Brain. Daardoor leunt je
              financiële proces niet op één persoon en één agenda. De cijfers
              worden vergelijkbaar over je locaties, en de kennis blijft van je
              bedrijf, ook als er iemand wisselt.
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
              Een finance-collega draait op je Company Brain, dus die bouwen we
              eerst. Wil je dit samen met ons vormgeven? Plan een gesprek.
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
            href="/digitale-collegas"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Alle digitale collega's
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
