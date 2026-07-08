import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/diensten",
  "Diensten | nativ",
  "Van AI Opportunity Scan tot een werkende digitale collega. Bekijk hoe nativ het mkb helpt met AI.",
);

// No FAQPage here: this page renders no FAQ, and Google only honours FAQPage
// when the questions and answers are visible on the page itself.
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Diensten van nativ",
  description:
    "Drie stappen van eerste scan tot werkende digitale collega's: Scan, Build en Deploy.",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Scan",
        description:
          "De AI Opportunity Scan brengt in één week in kaart waar de grootste kansen liggen, geprioriteerd op impact en haalbaarheid.",
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
          "Digitale collega's die putten uit het Company Brain, taken overnemen en processen versnellen, geïntegreerd in bestaande workflows.",
        provider: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
        url: "https://gonativ.nl/digitale-collegas",
      },
    },
  ],
};

const dienstenWebPage = webPage(
  "/diensten",
  "Diensten: van inzicht naar impact",
  "Van AI Opportunity Scan tot een werkende digitale collega. Drie stappen: Scan, Build, Deploy.",
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
