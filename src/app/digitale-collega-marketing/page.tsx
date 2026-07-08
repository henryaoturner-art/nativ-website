import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = pageMeta(
  "/digitale-collega-marketing",
  "Digitale collega voor marketing | nativ",
  "Een digitale marketing-collega die vanuit je Company Brain werkt: research, content, beeld, SEO en inplannen, in jullie eigen toon. Voor het Nederlandse mkb.",
);

const faqItems = [
  {
    question: "Wat doet een digitale marketing-collega?",
    answer:
      "Een digitale marketing-collega werkt vanuit je Company Brain aan research, content, beeld, SEO en inplannen, in de eigen toon van je merk.",
  },
  {
    question: "Werkt het in onze eigen huisstijl en toon?",
    answer:
      "Ja. De marketing-collega put uit je Company Brain, dus content komt in jullie eigen toon en op basis van jullie kennis, niet generiek.",
  },
  {
    question: "Voor wie is de marketing-collega?",
    answer:
      "Voor het Nederlandse mkb dat marketing wil versnellen zonder de eigen stem te verliezen.",
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

export default function MarketingColleaguePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/digitale-collega-marketing", "Digitale collega voor marketing", "Een digitale marketing-collega die vanuit je Company Brain werkt: research, content, beeld, SEO en inplannen, in jullie eigen toon. Voor het mkb."),
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
              Een digitale collega voor je marketing-team
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              De marketing-collega draait je marketing van begin tot eind,
              vanuit je Company Brain.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What it does */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <ul className="space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">Research.</strong>{" "}
                  Onze research-agents volgen je markt, je doelgroep en je
                  concurrenten, en brengen dat samen in wat wij insights noemen.
                  Daaruit komen de campagnevoorstellen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">Content.</strong>{" "}
                  Schrijft posts, blogs en e-mails in jullie eigen toon:
                  LinkedIn, je website, je nieuwsbrief.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">Beeld.</strong>{" "}
                  Maakt en bewerkt de visuals erbij.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">SEO.</strong>{" "}
                  Controleert je content op vindbaarheid voordat die de deur
                  uitgaat.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Inplannen en analytics.
                  </strong>{" "}
                  Plant de publicaties in en houdt bij wat werkt.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Onder water doen ruim twaalf gespecialiseerde sub-agents dit werk.
              Jij hebt met één collega te maken.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat hij uit je Company Brain haalt
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De collega werkt vanuit je Company Brain. Daarin staat je toon, je
              doelgroep, je eerdere campagnes en wat wel en niet werkte. Daardoor
              klinkt de output als jullie, niet als een generieke AI-tool. En hoe
              langer de collega meedraait, hoe scherper het wordt.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              In de praktijk
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Bij een Nederlands trainingsbedrijf draait de marketing-collega
              sinds begin 2026, beheerd door iemand in hun eigen team. De
              marketing-output loopt door zonder dat er een extra vaste kracht
              voor nodig was.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat het oplevert
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              Je marketing blijft draaien zonder dat het op één persoon leunt, en
              de output is consistent in jullie toon. De insights uit de research
              gaan over wat je concurrenten doen en wat er in de markt speelt,
              met de kansen en bedreigingen erbij. Ze voeden je campagnes, maar
              zijn net zo waardevol voor je management. De kennis over je
              campagnes blijft in je Company Brain, ook als er iemand wisselt.
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
              Een marketing-collega draait op je Company Brain, dus die bouwen we
              eerst. Wil je weten of dit bij jou past? Plan een gesprek.
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
