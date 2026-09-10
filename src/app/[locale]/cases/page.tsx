import type { Metadata } from "next";
import Link from "@/components/Link";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import Stars from "@/components/Stars";
import { pageMeta, webPage, SITE_UPDATED } from "@/lib/site-meta";
import { Check } from "lucide-react";

// Verborgen sinds 8 september 2026 (besluit Jorus/Livius): één case is te
// summier voor een eigen tab. Pagina blijft bestaan; niet in menu, sitemap,
// llms.txt en niet geïndexeerd. Terugzetten: deze noindex weg en de regels
// in Navigation.tsx, sitemap.ts en llms.txt/route.ts terug.
export const metadata: Metadata = {
  ...pageMeta(
    "/cases",
    "Cases | nativ",
    "Echte resultaten bij echte bedrijven. Bekijk hoe nativ organisaties helpt met AI.",
  ),
  robots: { index: false, follow: false },
};

const SORTLIST_REVIEW_URL = "https://www.sortlist.com/agency/nativ";

// No aggregateRating/Review markup here on purpose. Google's review-snippet
// guidelines disallow self-serving reviews (an entity marking up a review about
// itself, on its own site) for Organization, so that markup earns nothing and
// carries policy risk. The quote stays as visible copy, sourced to Sortlist.
// The citeable GEO signal is the case study itself, marked up as an Article.
const caseStudySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "AI Marketing Manager: van onvervulbare vacature naar 14 workflows in 4 weken",
  description:
    "Een trainings- en ontwikkelingsbedrijf met twee merken verving een maandenlang onvervulde Senior B2C Marketeer-vacature door een AI Marketing Manager en 14 workflows, operationeel in 4 weken.",
  datePublished: "2026-06-24",
  dateModified: SITE_UPDATED,
  inLanguage: "nl-NL",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://gonativ.nl/cases" },
  author: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
  publisher: {
    "@type": "Organization",
    name: "nativ",
    url: "https://gonativ.nl",
    logo: {
      "@type": "ImageObject",
      url: "https://gonativ.nl/nativ-logo.png",
    },
  },
  about: {
    "@type": "Organization",
    name: "JobTraining",
    description: "Trainings- en ontwikkelingsbedrijf met twee merken (B2B en B2C), 80+ medewerkers.",
  },
  articleSection: "Case study",
};

const casesWebPage = webPage(
  "/cases",
  "Cases: wat we hebben gebouwd",
  "Echte resultaten bij echte bedrijven. Zo helpt nativ organisaties met AI.",
);

export default function CasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([casesWebPage, caseStudySchema]),
        }}
      />

      {/* Hero */}
      <section className="pt-12 lg:pt-20 pb-12 lg:pb-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-grey">
              Wat we hebben gebouwd
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl text-grey">
              Echte resultaten bij echte bedrijven.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Case: JobTraining */}
      <section className="py-10 md:py-16 px-6 pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <article className="bg-white rounded-lg p-8 md:p-12 border border-border">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-6">
                <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs">
                  Training &amp; Development
                </span>
                <span>·</span>
                <span>80+ medewerkers</span>
                <span>·</span>
                <span>2 merken (B2B + B2C)</span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-grey">
                AI Marketing Manager: Van onvervulbare vacature naar 14 workflows in 4 weken
              </h2>

              <p className="mt-4 text-grey leading-relaxed">
                Een groeiend trainings- en ontwikkelingsbedrijf met twee merken: één gericht op B2B, één op B2C. Twintig interne medewerkers, zestig freelance trainers, en een marketingafdeling die al maanden een Senior B2C Marketeer zocht. Zonder succes.
              </p>

              {/* De uitdaging */}
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage-dark mb-2">De uitdaging</p>
                <p className="text-grey leading-relaxed">
                  De marketingkennis zat verspreid: in hoofden van medewerkers, bij externe bureaus, in losse systemen. Het bedrijf had een sterk product, maar geen gestructureerde manier om marketing over twee merken te schalen. En de vacature die dat moest oplossen? Al maanden onvervuld, met een maandelijks salaris van €3.000 tot €4.000.
                </p>
              </div>

              {/* Onze aanpak */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage-dark mb-2">Onze aanpak</p>
                <div className="space-y-4 text-grey leading-relaxed">
                  <div>
                    <p className="font-medium text-grey">Scan</p>
                    <p>De <Link href="/scan" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">gratis AI-scan</Link> wees marketing aan als het gebied met de hoogste impact. Specifiek: een AI Marketing Manager kon de onvervulde vacature vervangen, tegen een fractie van de kosten.</p>
                  </div>
                  <div>
                    <p className="font-medium text-grey">Build</p>
                    <p>We bouwden een Company Brain: een gestructureerde kennisbank met merkidentiteit, concurrentie-inzichten, marktdata en campagnehistorie. Voor beide merken. Niet een eenmalige snapshot, maar een levend systeem met kennislagen, van stabiele merkrichtlijnen tot wekelijks veranderende marktdata.</p>
                  </div>
                  <div>
                    <p className="font-medium text-grey">Deploy</p>
                    <p>We zetten 14 workflows in, elk gespecialiseerd in een ander domein: strategie, contentcreatie, campagne-optimalisatie, concurrentie-analyse, branding en meer. Allemaal gevoed door dezelfde kennisbank.</p>
                  </div>
                </div>
              </div>

              {/* Resultaat */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage-dark mb-3">Het resultaat</p>
                <ul className="space-y-3 text-grey">
                  <li className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 font-bold">↓</span>
                    Van onvervulde vacature naar AI Marketing Manager: 3 tot 4x kostenreductie
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 font-bold">×2</span>
                    Marketingcapaciteit over beide merken tegelijk: B2B én B2C
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 font-bold">◉</span>
                    Van verspreide kennis naar een levende, continu bijgewerkte kennisbank
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden="true" />
                    Operationeel in 4 weken vanaf start
                  </li>
                </ul>
              </div>
            </article>
          </FadeIn>
        </div>

        {/* Client testimonial — verified Sortlist review (Dirk Westdijk, JobTraining) */}
        <FadeIn delay={300}>
          <figure className="max-w-[800px] mx-auto mt-12">
            <div className="bg-sage/5 border border-border rounded-lg p-8 md:p-10">
              <div className="flex items-center gap-2 text-sage" aria-label="Beoordeling 4,5 van 5">
                <Stars />
                <span className="text-sm text-muted">4,5 / 5</span>
              </div>
              <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-snug text-grey">
                &ldquo;nativ heeft voor ons een Company Brain met digitale collega&apos;s gebouwd die echt meewerken in onze marketing. Geen advies-traject, maar werkende oplossingen die we elke dag gebruiken. Het team is bereikbaar, helder en snel, en denkt echt mee over wat resultaat oplevert. Een aanrader voor elk mkb-bedrijf dat AI serieus wil inzetten.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-medium text-grey">Dirk Westdijk</span>
                <span className="text-muted">·</span>
                <span className="text-grey">CEO, JobTraining</span>
                <span className="text-muted">·</span>
                <Button variant="tertiary"
                  href={SORTLIST_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Geverifieerde review op Sortlist
                </Button>
              </figcaption>
            </div>
          </figure>
        </FadeIn>

        {/* CTA for future cases */}
        <FadeIn delay={400}>
          <div className="max-w-[680px] mx-auto text-center mt-16">
            <p className="text-muted">
              Wil je de volgende zijn?
            </p>
            <Button className="mt-4"
              href="/contact"
            >
              Plan een gesprek
            </Button>
            <p className="mt-6 text-sm text-muted">
              Of lees eerst hoe we een{" "}
              <Link href="/diensten" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
                AI-kennisbank
              </Link>{" "}
              bouwen en wat{" "}
              <Link href="/workflows" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
                AI-workflows
              </Link>{" "}
              voor je team doen.
            </p>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
