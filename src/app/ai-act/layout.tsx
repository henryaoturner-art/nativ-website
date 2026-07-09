import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/ai-act",
  "EU AI Act: herleidbare AI met een Company Brain | nativ",
  "Vanaf 2 augustus 2026 vraagt de EU AI Act om transparante, herleidbare AI. Zo maakt een Company Brain de herkomst van elk AI-antwoord aantoonbaar.",
);

const aiActJsonLd = [
  webPage(
    "/ai-act",
    "De EU AI Act en herleidbare AI",
    "Wat de EU AI Act per 2 augustus 2026 vraagt op het gebied van transparantie en herleidbaarheid, en hoe een Company Brain de herkomst van elk AI-antwoord aantoonbaar maakt.",
    "2026-07-09",
  ),
];

export default function AiActLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiActJsonLd) }}
      />
      {children}
    </>
  );
}
