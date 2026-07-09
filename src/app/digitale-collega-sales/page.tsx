import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = pageMeta(
  "/digitale-collega-sales",
  "Digitale collega voor sales | nativ",
  "Een digitale sales-collega die vanuit je Company Brain werkt: profielen, gespreksvoorbereiding, leads, outreach en offertes. Voor het mkb.",
);

const faqItems = [
  {
    question: "Wat doet een digitale sales-collega?",
    answer:
      "Een digitale sales-collega werkt vanuit je Company Brain aan klantprofielen, gespreksvoorbereiding, leads, outreach en offertes.",
  },
  {
    question: "Is de sales-collega al beschikbaar?",
    answer:
      "Ja. De sales-collega werkt vanuit je Company Brain; dat bouwen we samen met de persoonlijke AI-assistent als basis.",
  },
  {
    question: "Voor wie is de sales-collega?",
    answer:
      "Voor mkb-salesteams die voorbereiding en opvolging willen versnellen vanuit hun eigen bedrijfskennis.",
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

export default function SalesColleaguePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/digitale-collega-sales", "Digitale collega voor sales", "Een digitale sales-collega die vanuit je Company Brain werkt: profielen, gespreksvoorbereiding, leads, outreach en offertes. Voor het mkb."),
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
              Een digitale collega voor je sales-team
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              Een digitale collega voor je sales-team: iemand die vanuit je
              Company Brain je verkoopproces ondersteunt, van profiel tot
              offerte. Dit is wat hij doet:
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
                    Profielen bouwen.
                  </strong>{" "}
                  Rijke profielen van je prospects en hun organisatie: rol,
                  beslisbevoegdheid, eerdere gesprekken, signalen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Gesprekken voorbereiden.
                  </strong>{" "}
                  Per gesprek een voorstel voor de agenda plus aanspreekpunten,
                  op basis van het profiel en wat jij uit het gesprek wilt halen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Kansen herkennen.
                  </strong>{" "}
                  Loopt door je bestaande klanten en signaleert waar uitbreiding
                  of opvolging mogelijk is.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Leads kwalificeren.
                  </strong>{" "}
                  Scoort inkomende leads op jouw criteria, met een voorstel naar
                  wie de lead het beste past.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Outreach schrijven.
                  </strong>{" "}
                  Eerste contact en follow-ups in jullie stem. Jij leest en
                  verstuurt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Offertes opstellen.
                  </strong>{" "}
                  Offerte-concepten in jullie stijl, die leren van wat eerder
                  won.
                </span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat hij uit je Company Brain haalt
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De collega werkt vanuit je Company Brain: je klanten, je manier van
              verkopen, eerdere gesprekken en wat eerder werkte. Daardoor sluit
              elk profiel, elke voorbereiding en elke mail aan op hoe jullie het
              doen. Elke stap is een voorstel; jij beslist wat eruit gaat.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waar we nu staan
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De sales-collega is beschikbaar. We zetten 'm in stappen bij je op,
              te beginnen bij de profielopbouw, en stemmen hem af op hoe jullie
              verkopen. Wil je 'm bij je team inrichten? Dat kan.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat het oplevert
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Minder tijd kwijt aan voorbereiding en nabellen, en follow-up die
              niet meer blijft liggen. Je hebt altijd alle kennis over een klant
              paraat, met een analyse van de gesprekken die je eerder voerde. De
              collega pikt signalen op die je zelf had gemist, en denkt mee over
              je volgende stap in het salesproces. En de kennis over je klanten
              en gesprekken blijft in je Company Brain, ook als er iemand
              wisselt.
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
              Een sales-collega draait op je Company Brain, dus die bouwen we
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
