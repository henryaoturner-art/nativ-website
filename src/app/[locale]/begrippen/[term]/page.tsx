import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Link from "@/components/Link";
import Section from "@/components/Section";
import LastUpdated from "@/components/LastUpdated";
import { pageMeta, webPage } from "@/lib/site-meta";
import { GLOSSARY, GLOSSARY_UPDATED, getTerm, termTitle } from "@/lib/glossary";
import { LOCALES } from "@/lib/locale";

/** Eén pagina per begrip. Inhoud staat in src/lib/glossary.ts. */

type Params = Promise<{ locale: string; term: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    GLOSSARY.map((t) => ({ locale, term: t.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) return {};
  return pageMeta(
    `/begrippen/${t.slug}`,
    `${termTitle(t)}: wat het is en waarom het telt | nativ`,
    t.short.length > 155 ? `${t.short.slice(0, 152)}...` : t.short,
  );
}

export default async function TermPage({ params }: { params: Params }) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) notFound();

  const related = t.related.map(getTerm).filter((x): x is NonNullable<typeof x> => Boolean(x));

  const schema = [
    webPage(`/begrippen/${t.slug}`, termTitle(t), t.short),
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `https://gonativ.nl/begrippen/${t.slug}`,
      name: termTitle(t),
      description: t.short,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        "@id": "https://gonativ.nl/begrippen",
        name: "AI-begrippen — nativ",
      },
      inLanguage: "nl-NL",
    },
  ];

  if (t.faq.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    } as unknown as (typeof schema)[number]);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section hero>
        <div className="max-w-[760px]">
          <FadeIn>
            <Kicker>
              <Link href="/begrippen" className="hover:text-grey">
                Begrippen
              </Link>
            </Kicker>
            <h1 className="font-serif text-grey">{termTitle(t)}</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">{t.short}</p>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="mt-6">
              <LastUpdated date={GLOSSARY_UPDATED} />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="max-w-[680px] space-y-12">
          {t.blocks.map((block) => (
            <FadeIn key={block.heading}>
              <div>
                <h2 className="font-serif text-grey">{block.heading}</h2>
                <div className="mt-4 space-y-4">
                  {block.paragraphs.map((p) => (
                    <p key={p} className="text-grey leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          {t.faq.length > 0 && (
            <FadeIn>
              <div>
                <h2 className="font-serif text-grey">Veelgestelde vragen</h2>
                <div className="mt-6 space-y-6">
                  {t.faq.map((f) => (
                    <div key={f.q}>
                      <h3 className="font-serif text-xl text-grey">{f.q}</h3>
                      <p className="mt-3 text-grey leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {related.length > 0 && (
        <Section band="sand">
          <FadeIn>
            <h2 className="font-serif text-grey">Hangt hiermee samen</h2>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Card key={r.slug} as="li">
                  <h3 className="font-serif text-lg text-grey">
                    <Link href={`/begrippen/${r.slug}`} className="hover:text-sage-dark">
                      {termTitle(r)}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-grey leading-relaxed">{r.short}</p>
                </Card>
              ))}
            </ul>
          </FadeIn>
        </Section>
      )}

      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[640px] text-lg text-grey leading-relaxed">
            Wil je zien wat hiervan bij jou zou werken? De AI-scan laat zien welk werk in
            jouw bedrijf zich leent voor AI, op volgorde.
          </p>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Button href="/scan">Doe de gratis AI-scan</Button>
            <Button variant="secondary" href="/begrippen">
              Alle begrippen
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
