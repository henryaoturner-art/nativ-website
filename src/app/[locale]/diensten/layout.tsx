import type { Metadata } from "next";
import { localizedPageMeta, webPage } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Diensten | nativ",
    description:
      "Van gratis AI-scan tot werkende workflows. Bekijk hoe nativ het mkb helpt met AI.",
  },
  en: {
    title: "Services | nativ",
    description:
      "From a free AI scan to working workflows. See how nativ helps SMEs with AI.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/diensten", copy);
}

// No FAQPage here: this page renders no FAQ, and Google only honours FAQPage
// when the questions and answers are visible on the page itself.
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Diensten van nativ",
  description:
    "Drie stappen van gratis scan tot werkende workflows: Scan, Build en Deploy.",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Scan",
        description:
          "De gratis AI-scan brengt in kaart welk werk in je bedrijf zich leent voor AI, op volgorde van wat het meeste oplevert.",
        provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
        url: "https://gonativ.nl/scan",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Build",
        description:
          "We structureren de kennis die in de organisatie leeft tot een levende Company Brain waarin elk feit een eigenaar en een verversingsdatum heeft, en die toegankelijk is voor iedereen.",
        provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
        url: "https://gonativ.nl/company-brain",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Deploy",
        description:
          "Workflows die putten uit het Company Brain, terugkerend werk overnemen en processen versnellen, geïntegreerd met je bestaande systemen.",
        provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
        url: "https://gonativ.nl/workflows",
      },
    },
  ],
};

const dienstenWebPage = webPage(
  "/diensten",
  "Diensten: van inzicht naar impact",
  "Van gratis AI-scan tot werkende workflows. Drie stappen: Scan, Build, Deploy.",
);

const dienstenJsonLd = [dienstenWebPage, servicesSchema];

export default async function DienstenLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dienstenJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
