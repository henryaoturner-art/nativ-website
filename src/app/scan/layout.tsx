import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/scan",
  "AI-scan & innovatiescan voor het mkb — in 1 week | nativ",
  "De AI-scan (innovatiescan) voor het mkb: ontdek in één week waar AI het meeste oplevert, geprioriteerd op impact en haalbaarheid, met een concreet actieplan. Geen pilot, geen verplichting. No cure, no pay.",
);

// Answers are copied verbatim from the Dutch FAQ rendered in page.tsx. Google
// only honours FAQPage when the same text is visible on the page, so the two
// must be edited together.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is een AI-scan (innovatiescan)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een AI-scan, ook wel innovatiescan of AI Opportunity Scan, brengt in één week in kaart waar AI in jouw organisatie het meeste oplevert. Je krijgt een overzicht geprioriteerd op impact en haalbaarheid, plus een concreet actieplan. Geen pilot, geen verplichting.",
      },
    },
    {
      "@type": "Question",
      name: "Wat heb ik nodig om te starten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Niets bijzonders. Toegang tot relevante documentatie en 30 minuten van je tijd voor een intake.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe zit het met mijn data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alle data blijft binnen de EU. Wij zijn volledig GDPR-compliant. Na afloop kun je kiezen of we data bewaren of verwijderen.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als het niets oplevert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dan betaal je niets. No cure, no pay. Simpel.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik daarna verder met nativ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. De Scan is stap 1 van ons drielaags model. Na de Scan kun je doorpakken met een AI-kennisbank en digitale collega's.",
      },
    },
  ],
};

// price is the standaard-variant, which is a fixed €2.495. The op-maat variant
// starts there, so 2495 is the floor either way.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Opportunity Scan",
  serviceType: "AI-kansenanalyse voor het mkb",
  description:
    "Een analyse van één week die in kaart brengt waar AI in jouw organisatie de meeste waarde oplevert, geprioriteerd op impact en haalbaarheid, met een concreet actieplan.",
  provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
  areaServed: { "@type": "Country", name: "Nederland" },
  offers: {
    "@type": "Offer",
    price: "2495",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://gonativ.nl/scan",
  },
};

const scanWebPage = webPage(
  "/scan",
  "AI Opportunity Scan",
  "In één week weten waar AI het meeste oplevert in jouw organisatie. Concreet, toepasbaar, no cure no pay.",
);

const scanJsonLd = [scanWebPage, faqSchema, serviceSchema];

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scanJsonLd) }}
      />
      {children}
    </>
  );
}
