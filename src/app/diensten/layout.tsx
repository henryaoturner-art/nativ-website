import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/diensten",
  "Diensten | nativ",
  "Van gratis AI Opportunity Scan tot werkende workflows. Bekijk hoe nativ het mkb helpt met AI.",
);

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
          "De gratis AI Opportunity Scan brengt in kaart welk werk in je bedrijf zich leent voor AI, op volgorde van wat het meeste oplevert.",
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
          "We structureren de kennis die in de organisatie leeft tot een Company Brain: een levend AI Operating System met drie kennislagen, plus een digitale assistent voor alle medewerkers.",
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
  "Van gratis AI Opportunity Scan tot werkende workflows. Drie stappen: Scan, Build, Deploy.",
);

const dienstenJsonLd = [dienstenWebPage, servicesSchema];

export default function DienstenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dienstenJsonLd) }}
      />
      {children}
    </>
  );
}
