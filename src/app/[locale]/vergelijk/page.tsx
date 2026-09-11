import type { Metadata } from "next";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Link from "@/components/Link";
import Section from "@/components/Section";
import LastUpdated from "@/components/LastUpdated";
import { pageMeta, webPage } from "@/lib/site-meta";
import { COMPARISONS, COMPARISONS_UPDATED } from "@/lib/comparisons";

export const metadata: Metadata = pageMeta(
  "/vergelijk",
  "nativ vergeleken met Copilot, ChatGPT, Notion AI en adviesbureaus | nativ",
  "Waar een Company Brain iets anders doet dan Microsoft Copilot, ChatGPT, Notion AI of een AI-adviesbureau, en waar die alternatieven sterker zijn.",
);

/** Hub van de vergelijkingen. Inhoud staat in src/lib/comparisons.ts. */

export default function VergelijkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPage(
              "/vergelijk",
              "nativ vergeleken met de alternatieven",
              "Waar een Company Brain iets anders doet dan Microsoft Copilot, ChatGPT, Notion AI of een AI-adviesbureau.",
            ),
          ),
        }}
      />

      <Section hero>
        <div className="max-w-[760px]">
          <FadeIn>
            <Kicker>Vergelijken</Kicker>
            <h1 className="font-serif text-grey">nativ naast de alternatieven</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">
              De meeste bedrijven die ons spreken gebruiken al iets. Hieronder staat per
              alternatief waar het iets anders doet dan een Company Brain, en waar het
              sterker is dan wij.
            </p>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="mt-6">
              <LastUpdated date={COMPARISONS_UPDATED} />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COMPARISONS.map((c) => (
            <Card key={c.slug} as="li" primary>
              <h2 className="font-serif text-xl text-grey">
                <Link href={`/vergelijk/${c.slug}`} className="hover:text-sage-dark">
                  nativ of {c.name}?
                </Link>
              </h2>
              <p className="mt-3 text-grey leading-relaxed">{c.short}</p>
              <p className="mt-4">
                <Link
                  href={`/vergelijk/${c.slug}`}
                  className="text-sage-dark underline decoration-border underline-offset-4 hover:decoration-sage"
                >
                  Lees de vergelijking
                </Link>
              </p>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  );
}
