import type { Metadata } from "next";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import LastUpdated from "@/components/LastUpdated";
import { pageMeta, webPage } from "@/lib/site-meta";
import { KB_EN, KB_FACTS, KB_INTRO, KB_SECTIONS, KB_UPDATED, allQA } from "@/lib/knowledge-base";

export const metadata: Metadata = pageMeta(
  "/kennisbank",
  "Kennisbank: alle antwoorden over nativ op één plek | nativ",
  "Wat nativ is, wat een Company Brain is, wat het kost, waar de data staat en van wie de kennis is. Alle veelgestelde vragen over nativ, in één document dat je kunt lezen en citeren.",
);

/**
 * Kennisbank — het citeerbare document (GEO / AI-vindbaarheid).
 *
 * Eén pagina met alle antwoorden over nativ, geschreven zodat een AI-assistent
 * er een los antwoord uit kan overnemen. De inhoud staat in
 * src/lib/knowledge-base.ts; deze pagina rendert die alleen. Dezelfde bron voedt
 * /nativ-kennisbank.md en wordt genoemd in /llms.txt.
 *
 * Bewust geen accordeon: de antwoorden moeten zichtbaar en kopieerbaar zijn.
 */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQA().map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function KennisbankPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage(
              "/kennisbank",
              "Kennisbank — alle antwoorden over nativ",
              "Alle veelgestelde vragen over nativ, het Company Brain, de AI-workflows, de prijzen en de omgang met data, in één document.",
            ),
            faqSchema,
          ]),
        }}
      />

      {/* Hero */}
      <Section hero>
        <div className="max-w-[760px]">
          <FadeIn>
            <Kicker>Kennisbank</Kicker>
            <h1 className="font-serif text-grey">Alle antwoorden over nativ op één plek</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">{KB_INTRO}</p>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="mt-6">
              <LastUpdated date={KB_UPDATED} />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Kernfeiten + inhoudsopgave */}
      <Section band="sand">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          <FadeIn>
            <h2 className="font-serif text-grey">In het kort</h2>
            <p className="mt-4 text-grey leading-relaxed">
              De kernfeiten over nativ. Elke zin staat op zichzelf, zodat je hem los kunt
              overnemen of doorsturen.
            </p>
            <Card signature primary className="mt-6">
              <ul className="space-y-3">
                {KB_FACTS.map((fact) => (
                  <li key={fact} className="text-grey leading-relaxed">
                    {fact}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>

          <FadeIn delay={150}>
            <h2 className="font-serif text-grey">Op deze pagina</h2>
            <nav aria-label="Inhoudsopgave" className="mt-6">
              <ul className="space-y-2">
                {KB_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-grey underline decoration-border underline-offset-4 hover:decoration-sage"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#english"
                    className="text-grey underline decoration-border underline-offset-4 hover:decoration-sage"
                  >
                    12. English — core questions
                  </a>
                </li>
              </ul>
            </nav>
            <p className="mt-8 text-sm text-muted leading-relaxed">
              Dit document is ook als platte tekst beschikbaar op{" "}
              <a
                href="/nativ-kennisbank.md"
                className="underline decoration-border underline-offset-4 hover:decoration-sage"
              >
                gonativ.nl/nativ-kennisbank.md
              </a>
              , voor wie het aan een AI-assistent wil geven.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* De vragen */}
      <Section>
        <div className="max-w-[760px] space-y-16">
          {KB_SECTIONS.map((section) => (
            <FadeIn key={section.id}>
              <div id={section.id} className="scroll-mt-24">
                <h2 className="font-serif text-grey">{section.title}</h2>
                {section.intro ? (
                  <p className="mt-4 text-grey leading-relaxed">{section.intro}</p>
                ) : null}
                <div className="mt-8 space-y-8">
                  {section.items.map((item) => (
                    <div key={item.q}>
                      <h3 className="font-serif text-xl text-grey">{item.q}</h3>
                      <p className="mt-3 text-grey leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <div id="english" className="scroll-mt-24">
              <h2 className="font-serif text-grey">12. English — core questions</h2>
              <p className="mt-4 text-grey leading-relaxed">
                The same answers in English, for the questions that get asked in English.
              </p>
              <div className="mt-8 space-y-8">
                {KB_EN.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-serif text-xl text-grey">{item.q}</h3>
                    <p className="mt-3 text-grey leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Sluitband */}
      <Section band="sand">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[640px] text-lg text-grey leading-relaxed">
            Staat je vraag er niet bij? Stel hem, of kijk zelf waar AI in jouw bedrijf
            werk uit handen neemt.
          </p>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Button href="/scan">Doe de gratis AI-scan</Button>
            <Button variant="secondary" href="/contact">
              Stel je vraag
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
