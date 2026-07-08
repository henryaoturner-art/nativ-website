import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = pageMeta(
  "/digitale-collega-hr",
  "Digitale collega voor hr | nativ",
  "Een digitale hr-collega, in ontwikkeling. De persoonlijke assistent beantwoordt vandaag al de bedrijfsvragen van je medewerkers. Voor het mkb.",
);

const faqItems = [
  {
    question: "Wat doet een digitale hr-collega?",
    answer:
      "Een digitale hr-collega ondersteunt de mensgerichte processen van je bedrijf. Vandaag beantwoordt de persoonlijke assistent al de bedrijfsvragen van je medewerkers.",
  },
  {
    question: "Is de hr-collega al beschikbaar?",
    answer:
      "De volledige hr-collega is in ontwikkeling. De persoonlijke assistent die medewerkersvragen beantwoordt, werkt vandaag al.",
  },
  {
    question: "Voor wie is de hr-collega?",
    answer:
      "Voor het Nederlandse mkb dat medewerkers sneller antwoord wil geven op bedrijfsvragen.",
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

export default function HrColleaguePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/digitale-collega-hr", "Digitale collega voor hr", "Een digitale hr-collega, in ontwikkeling. De persoonlijke assistent beantwoordt vandaag al de bedrijfsvragen van je medewerkers. Voor het mkb."),
            faqSchema,
          ]),
        }}
      />

      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-grey/10 text-grey/70 px-3 py-1 text-sm font-medium">
              In ontwikkeling
            </span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Een digitale collega voor je hr-team
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              We bouwen een digitale collega voor je hr-team. Die staat nog vroeg
              in de ontwikkeling, dus wat die precies gaat doen, geven we samen
              met onze eerste klanten vorm.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              De basis is er al
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Elke medewerker krijgt op je Company Brain een persoonlijke
              assistent: één plek om het bedrijf alles te vragen, van regelingen
              tot afspraken, met een bronvermelding bij elk antwoord. Dat is
              hr-werk dat vandaag al loopt. De dedicated hr-collega bouwen we
              daarbovenop, voor het werk dat specifiek bij hr hoort.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waar we nu staan
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De hr-collega is in vroege ontwikkeling. Wil je meedenken over wat
              een hr-collega voor jouw organisatie moet doen, of vroeg instappen?
              Dat kan.
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
              Een digitale collega draait op je Company Brain, dus die bouwen we
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
