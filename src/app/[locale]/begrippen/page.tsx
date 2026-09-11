import type { Metadata } from "next";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Link from "@/components/Link";
import Section from "@/components/Section";
import LastUpdated from "@/components/LastUpdated";
import { pageMeta, webPage } from "@/lib/site-meta";
import { GLOSSARY, GLOSSARY_UPDATED, termTitle } from "@/lib/glossary";

export const metadata: Metadata = pageMeta(
  "/begrippen",
  "AI-begrippen uitgelegd in gewone taal | nativ",
  "Context engineering, Minimum Viable Context, RAG, hallucinatie, shadow AI en meer. Elf AI-begrippen uitgelegd voor het mkb, zonder jargon.",
);

/** Hub van de begrippenlijst. Inhoud staat in src/lib/glossary.ts. */

const definedTermSet = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://gonativ.nl/begrippen",
  name: "AI-begrippen — nativ",
  description: "AI-begrippen uitgelegd in gewone taal, voor het Nederlandse mkb.",
  inLanguage: "nl-NL",
  hasDefinedTerm: GLOSSARY.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `https://gonativ.nl/begrippen/${t.slug}`,
    name: termTitle(t),
    description: t.short,
    url: `https://gonativ.nl/begrippen/${t.slug}`,
  })),
};

export default function BegrippenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage(
              "/begrippen",
              "AI-begrippen uitgelegd in gewone taal",
              "Elf AI-begrippen uitgelegd voor het mkb: context engineering, Minimum Viable Context, RAG, hallucinatie, shadow AI en meer.",
            ),
            definedTermSet,
          ]),
        }}
      />

      <Section hero>
        <div className="max-w-[760px]">
          <FadeIn>
            <Kicker>Begrippen</Kicker>
            <h1 className="font-serif text-grey">AI-begrippen in gewone taal</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">
              De woorden die rond bedrijfs-AI worden gebruikt, uitgelegd zonder jargon.
              Elke uitleg begint met één zin die het begrip dekt, zodat je hem kunt
              overnemen of doorsturen.
            </p>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="mt-6">
              <LastUpdated date={GLOSSARY_UPDATED} />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GLOSSARY.map((t) => (
            <Card key={t.slug} as="li" primary className="flex flex-col">
              <h2 className="font-serif text-xl text-grey">
                <Link href={`/begrippen/${t.slug}`} className="hover:text-sage-dark">
                  {termTitle(t)}
                </Link>
              </h2>
              <p className="mt-3 text-grey leading-relaxed">{t.short}</p>
              <p className="mt-4">
                <Link
                  href={`/begrippen/${t.slug}`}
                  className="text-sage-dark underline decoration-border underline-offset-4 hover:decoration-sage"
                >
                  Lees verder
                </Link>
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section band="sand">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[640px] text-lg text-grey leading-relaxed">
            Alle antwoorden over nativ zelf staan bij elkaar in de kennisbank: wat het is,
            wat het kost, waar de data staat en van wie de kennis is.
          </p>
          <Link
            href="/kennisbank"
            className="shrink-0 text-sage-dark underline decoration-border underline-offset-4 hover:decoration-sage"
          >
            Naar de kennisbank
          </Link>
        </div>
      </Section>
    </>
  );
}
