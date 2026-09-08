import type { Metadata } from "next";
import { localizedPageMeta, webPage, SITE_UPDATED } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Whitepaper | nativ",
    description:
      "Onze visie op het Company Brain en AI-workflows voor het mkb. Lees de whitepaper.",
  },
  en: {
    title: "Whitepaper | nativ",
    description:
      "Our view on the Company Brain and AI workflows for SMEs. Read the whitepaper.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/whitepaper", copy);
}

// The page itself is a download gate; the citeable thing is the whitepaper.
const whitepaperSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Company brain: bedrijfskennis bruikbaar maken voor AI",
  description:
    "De theorie en praktijk van minimum viable context (MVC): waarom AI in organisaties niet faalt door zwakke modellen maar door gebrek aan context, en hoe elf kennisgebieden met ruim vierhonderd categorieën het merendeel van het werk van een AI-workflow afdekken.",
  datePublished: "2026-05-01",
  dateModified: SITE_UPDATED,
  inLanguage: "nl-NL",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://gonativ.nl/whitepaper" },
  author: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
  publisher: {
    "@type": "Organization",
    name: "nativ",
    url: "https://gonativ.nl",
    logo: { "@type": "ImageObject", url: "https://gonativ.nl/nativ-logo.png" },
  },
  isAccessibleForFree: true,
  about: ["Company Brain", "Context engineering", "Minimum viable context"],
};

const whitepaperJsonLd = [
  webPage(
    "/whitepaper",
    "Whitepaper: Company brain",
    "Onze visie op het Company Brain en AI-workflows voor het mkb, met het MVC-framework voor context engineering.",
  ),
  whitepaperSchema,
];

export default async function WhitepaperLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whitepaperJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
