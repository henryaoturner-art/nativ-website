import type { Metadata } from "next";
import { localizedPageMeta, webPage } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Gratis AI-scan voor het mkb — zie waar AI werk uit handen neemt | nativ",
    description:
      "De gratis AI-scan voor het mkb. In ongeveer 20 minuten zie je welk werk in jouw bedrijf zich leent voor AI, op volgorde van wat het meeste oplevert. Of doe hem compleet met je team, afdeling voor afdeling. Geen kosten, geen verplichting.",
  },
  en: {
    title: "Free AI scan for SMEs: see where AI takes work off your hands | nativ",
    description:
      "The free AI scan for SMEs. In about 20 minutes you see which work in your company lends itself to AI, ranked by what pays off most. Or do it with your whole team, department by department. No cost, no obligation.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/scan", copy);
}

// Answers are copied verbatim from the Dutch FAQ rendered in page.tsx. Google
// only honours FAQPage when the same text is visible on the page, so the two
// must be edited together.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost de scan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Niets. Allebei de varianten zijn gratis, en er zit geen verplichting aan vast.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt het?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In je eentje ongeveer 20 minuten. Doe je hem met je team, dan ben jij ongeveer 20 minuten kwijt en je collega's een kwartier, ieder op zijn eigen moment.",
      },
    },
    {
      "@type": "Question",
      name: "Moet ik iets voorbereiden of aanleveren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Je hoeft niets te uploaden en geen documenten te verzamelen. We vragen alleen naar het werk zelf: wat het is, hoe vaak het gebeurt en hoeveel tijd het kost.",
      },
    },
    {
      "@type": "Question",
      name: "Wat gebeurt er met mijn antwoorden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je antwoorden en je rapport zijn van jou, en je kunt het rapport delen met wie je wilt. Bedrijfsbestanden en vertrouwelijke gegevens vragen we niet op, die blijven bij de bron.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik eerst alleen beginnen en later mijn team erbij halen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, en dat is ook de gewone volgorde. Je begint in je eentje, en als je meer wilt weten nodig je daarna je collega's uit per afdeling. Je rapport groeit dan mee.",
      },
    },
    {
      "@type": "Question",
      name: "Wat gebeurt er na de scan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je krijgt je rapport, en als je wilt praten we erover door: wat het bij jullie zou betekenen en waar je zou beginnen. Je zit nergens aan vast.",
      },
    },
  ],
};

// The scan is free in the new proposition (week-kickoff 10 Aug 2026), so the
// Service/Offer block that carried the old €2.495 price is deliberately gone.
// Do not reintroduce a price here without a founder decision — structured data
// that contradicts the page is worse than no structured data.
const scanWebPage = webPage(
  "/scan",
  "Gratis AI-scan",
  "Gratis. Zie in ongeveer 20 minuten welk werk in jouw bedrijf zich leent voor AI, of doe de scan compleet met je team.",
);

const scanJsonLd = [scanWebPage, faqSchema];

export default async function ScanLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  return (
    <>
      {/* Gestructureerde data alleen op de Nederlandse route: de teksten erin zijn Nederlands. */}
      {locale !== "en" && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scanJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
