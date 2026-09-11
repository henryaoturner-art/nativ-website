import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Link from "@/components/Link";
import Section from "@/components/Section";
import LastUpdated from "@/components/LastUpdated";
import { pageMeta, webPage } from "@/lib/site-meta";
import { COMPARISONS, COMPARISONS_UPDATED, getComparison } from "@/lib/comparisons";
import { LOCALES } from "@/lib/locale";

/** Eén pagina per alternatief. Inhoud staat in src/lib/comparisons.ts. */

type Params = Promise<{ locale: string; alternatief: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    COMPARISONS.map((c) => ({ locale, alternatief: c.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { alternatief } = await params;
  const c = getComparison(alternatief);
  if (!c) return {};
  return pageMeta(`/vergelijk/${c.slug}`, c.title, c.description);
}

export default async function ComparisonPage({ params }: { params: Params }) {
  const { alternatief } = await params;
  const c = getComparison(alternatief);
  if (!c) notFound();

  const others = COMPARISONS.filter((x) => x.slug !== c.slug);

  const schema: object[] = [
    webPage(`/vergelijk/${c.slug}`, `nativ of ${c.name}?`, c.description),
  ];
  if (c.faq.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section hero>
        <div className="max-w-[760px]">
          <FadeIn>
            <Kicker>
              <Link href="/vergelijk" className="hover:text-grey">
                Vergelijken
              </Link>
            </Kicker>
            <h1 className="font-serif text-grey">nativ of {c.name}?</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">{c.short}</p>
          </FadeIn>
          <FadeIn delay={250}>
            <div className="mt-6">
              <LastUpdated date={COMPARISONS_UPDATED} />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="max-w-[680px] space-y-4">
          {c.intro.map((p) => (
            <FadeIn key={p}>
              <p className="text-grey leading-relaxed">{p}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section band="sand">
        <FadeIn>
          <h2 className="font-serif text-grey">Naast elkaar</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-4 text-sm font-sans font-normal uppercase tracking-wider text-muted" scope="col">
                    &nbsp;
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-sans font-normal uppercase tracking-wider text-muted" scope="col">
                    {c.name}
                  </th>
                  <th className="text-left py-4 pl-4 text-sm font-sans font-normal uppercase tracking-wider text-sage-dark" scope="col">
                    nativ
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border align-top">
                    <th scope="row" className="text-left py-5 pr-4 font-sans font-medium text-grey">
                      {row.label}
                    </th>
                    <td className="py-5 px-4 text-grey leading-relaxed">{row.other}</td>
                    <td className="py-5 pl-4 text-grey leading-relaxed">{row.nativ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </Section>

      <Section>
        <div className="max-w-[680px] space-y-12">
          <FadeIn>
            <div>
              <h2 className="font-serif text-grey">{c.strengths.heading}</h2>
              <div className="mt-4 space-y-4">
                {c.strengths.paragraphs.map((p) => (
                  <p key={p} className="text-grey leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h2 className="font-serif text-grey">{c.verdict.heading}</h2>
              <div className="mt-4 space-y-4">
                {c.verdict.paragraphs.map((p) => (
                  <p key={p} className="text-grey leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </FadeIn>
          {c.faq.length > 0 && (
            <FadeIn>
              <div>
                <h2 className="font-serif text-grey">Veelgestelde vragen</h2>
                <div className="mt-6 space-y-6">
                  {c.faq.map((f) => (
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

      <Section band="sand">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[640px]">
            <p className="text-lg text-grey leading-relaxed">
              Zelf zien wat bij jou zou werken? De AI-scan laat zien welk werk in jouw bedrijf
              zich leent voor AI, op volgorde. Gratis, ongeveer twintig minuten.
            </p>
            <p className="mt-4 text-sm text-muted">
              Andere vergelijkingen:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 ? " · " : ""}
                  <Link
                    href={`/vergelijk/${o.slug}`}
                    className="underline decoration-border underline-offset-4 hover:decoration-sage"
                  >
                    {o.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          <Button href="/scan" className="shrink-0">
            Doe de gratis AI-scan
          </Button>
        </div>
      </Section>
    </>
  );
}
