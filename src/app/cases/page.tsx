import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { pageMeta, webPage, SITE_UPDATED } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/cases",
  "Cases | nativ",
  "Echte resultaten bij echte bedrijven. Bekijk hoe nativ organisaties helpt met AI.",
);

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
    "AI Marketing Manager: van onvervulbare vacature naar 14 digitale collega's in 4 weken",
  description:
    "Een trainings- en ontwikkelingsbedrijf met twee merken verving een maandenlang onvervulde Senior B2C Marketeer-vacature door een AI Marketing Manager en 14 digitale collega's, operationeel in 4 weken.",
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
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Wat we hebben gebouwd
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70">
              Echte resultaten bij echte bedrijven.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Case: JobTraining */}
      <section className="py-10 md:py-16 px-6 pb-20 md:pb-28">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <article className="bg-surface rounded-xl p-8 md:p-12 border border-sage-light">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-grey/50 mb-6">
                <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs">
                  Training &amp; Development
                </span>
                <span>·</span>
                <span>80+ medewerkers</span>
                <span>·</span>
                <span>2 merken (B2B + B2C)</span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl md:text-3xl leading-snug text-grey">
                AI Marketing Manager: Van onvervulbare vacature naar 14 digitale collega&apos;s in 4 weken
              </h2>

              <p className="mt-4 text-grey/70 font-light leading-relaxed">
                Een groeiend trainings- en ontwikkelingsbedrijf met twee merken: één gericht op B2B, één op B2C. Twintig interne medewerkers, zestig freelance trainers, en een marketingafdeling die al maanden een Senior B2C Marketeer zocht. Zonder succes.
              </p>

              {/* De uitdaging */}
              <div className="mt-10">
                <p className="text-sm text-grey/50 uppercase tracking-wide mb-2">De uitdaging</p>
                <p className="text-grey/80 font-light leading-relaxed">
                  De marketingkennis zat verspreid: in hoofden van medewerkers, bij externe bureaus, in losse systemen. Het bedrijf had een sterk product, maar geen gestructureerde manier om marketing over twee merken te schalen. En de vacature die dat moest oplossen? Al maanden onvervuld, met een maandelijks salaris van €3.000 tot €4.000.
                </p>
              </div>

              {/* Onze aanpak */}
              <div className="mt-8">
                <p className="text-sm text-grey/50 uppercase tracking-wide mb-2">Onze aanpak</p>
                <div className="space-y-4 text-grey/80 font-light leading-relaxed">
                  <div>
                    <p className="font-medium text-grey">Scan</p>
                    <p>De <Link href="/scan" className="text-sage hover:underline">AI Opportunity Scan</Link> wees marketing aan als het gebied met de hoogste impact. Specifiek: een AI Marketing Manager kon de onvervulde vacature vervangen, tegen een fractie van de kosten.</p>
                  </div>
                  <div>
                    <p className="font-medium text-grey">Build</p>
                    <p>We bouwden een AI Operating System: een gestructureerde kennisbank met merkidentiteit, concurrentie-inzichten, marktdata en campagnehistorie. Voor beide merken. Niet een eenmalige snapshot, maar een levend systeem met kennislagen, van stabiele merkrichtlijnen tot wekelijks veranderende marktdata.</p>
                  </div>
                  <div>
                    <p className="font-medium text-grey">Deploy</p>
                    <p>We zetten 14 digitale collega&apos;s in, elk gespecialiseerd in een ander domein: strategie, contentcreatie, campagne-optimalisatie, concurrentie-analyse, branding en meer. Allemaal gevoed door dezelfde kennisbank.</p>
                  </div>
                </div>
              </div>

              {/* Resultaat */}
              <div className="mt-8">
                <p className="text-sm text-grey/50 uppercase tracking-wide mb-3">Het resultaat</p>
                <ul className="space-y-3 text-grey/80 font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 font-bold">↓</span>
                    Van onvervulde vacature (€3.000 tot €4.000/maand) naar AI Marketing Manager (€995/maand): 3 tot 4x kostenreductie
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
                    <span className="text-sage mt-0.5 font-bold">✓</span>
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
            <div className="bg-sage/5 border border-sage-light rounded-xl p-8 md:p-10">
              <div className="flex items-center gap-2 text-sage" aria-label="Beoordeling 4,5 van 5">
                <span aria-hidden="true" className="text-lg tracking-wide">★★★★☆</span>
                <span className="text-sm text-grey/60">4,5 / 5</span>
              </div>
              <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-snug text-grey">
                &ldquo;nativ heeft voor ons een Company Brain met digitale collega&apos;s gebouwd die echt meewerken in onze marketing. Geen advies-traject, maar werkende oplossingen die we elke dag gebruiken. Het team is bereikbaar, helder en snel, en denkt echt mee over wat resultaat oplevert. Een aanrader voor elk mkb-bedrijf dat AI serieus wil inzetten.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-medium text-grey">Dirk Westdijk</span>
                <span className="text-grey/50">·</span>
                <span className="text-grey/70 font-light">CEO, JobTraining</span>
                <span className="text-grey/50">·</span>
                <a
                  href={SORTLIST_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage text-sm hover:underline"
                >
                  Geverifieerde review op Sortlist →
                </a>
              </figcaption>
            </div>
          </figure>
        </FadeIn>

        {/* CTA for future cases */}
        <FadeIn delay={400}>
          <div className="max-w-[680px] mx-auto text-center mt-16">
            <p className="text-grey/60 font-light">
              Wil je de volgende zijn?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
