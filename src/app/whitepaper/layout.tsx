import type { Metadata } from "next";
import { pageMeta, webPage, SITE_UPDATED } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/whitepaper",
  "Whitepaper | nativ",
  "Onze visie op het Company Brain en digitale collega's voor het mkb. Lees de whitepaper.",
);

// The page itself is a download gate; the citeable thing is the whitepaper.
const whitepaperSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Company brain: kennis uit de hoofden van medewerkers",
  description:
    "De theorie en praktijk van minimum viable context (MVC): waarom AI in organisaties niet faalt door zwakke modellen maar door gebrek aan context, en hoe tien contextblokken het merendeel van de taken van een AI-agent afdekken.",
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
    "Onze visie op het Company Brain en digitale collega's voor het mkb, met het MVC-framework voor context engineering.",
  ),
  whitepaperSchema,
];

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whitepaperJsonLd) }}
      />
      {children}
    </>
  );
}
