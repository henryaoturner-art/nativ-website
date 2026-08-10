import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/workflows",
  "AI-workflows voor het mkb — praktische hulp per klus | nativ",
  "Een workflow neemt één terugkerende klus van je over, van begin tot eind, en werkt vanuit je Company Brain. Voorbeelden voor marketing, sales, finance en hr. Begin met de gratis scan om te zien welke bij jou passen.",
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
      name: "Hoe weet ik welke workflows bij ons passen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Daar is de gratis scan voor. Die brengt in kaart waar bij jullie veel tijd en herhaling in zit, en zet op volgorde waar AI het meeste oplevert. Je hoeft dat dus niet vooraf te weten.",
      },
    },
    {
      "@type": "Question",
      name: "Moeten we eerst een Company Brain hebben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. De Company Brain is waar de workflows uit putten: jullie manier van werken, afspraken en toon. Zonder die context krijg je algemene antwoorden in plaats van werk dat bij jullie past.",
      },
    },
    {
      "@type": "Question",
      name: "Hoeveel workflows beginnen we mee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eén. We kiezen samen werk waar veel herhaling in zit en waarvan jij het resultaat direct kunt beoordelen. Uitbreiden doe je pas als die eerste doet wat je ervan verwacht.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ons werk niet in een vast stappenplan past?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dan is het waarschijnlijk geen goede eerste workflow, en dat zeggen we ook. Er is bij vrijwel elk bedrijf genoeg werk dat wél elke keer hetzelfde gaat. Daar beginnen we.",
      },
    },
    {
      "@type": "Question",
      name: "Wat gebeurt er met onze gegevens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gevoelige en vertrouwelijke gegevens blijven bij de bron. We werken op de uitkomsten, niet op de onderliggende dossiers. In de Company Brain heeft elk gegeven een herkomst, een eigenaar en rechten, dus je weet wie wat ziet.",
      },
    },
  ],
};

const workflowsWebPage = webPage(
  "/workflows",
  "AI-workflows",
  "Een workflow neemt één terugkerende klus van je over, van begin tot eind, en werkt vanuit je Company Brain.",
);

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([workflowsWebPage, faqSchema]),
        }}
      />
      {children}
    </>
  );
}
