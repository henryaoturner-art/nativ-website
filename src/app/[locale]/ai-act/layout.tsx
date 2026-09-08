import type { Metadata } from "next";
import { localizedPageMeta, webPage } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "EU AI Act: herleidbare AI met een Company Brain | nativ",
    description:
      "Vanaf 2 augustus 2026 vraagt de EU AI Act om transparante, herleidbare AI. Zo maakt een Company Brain de herkomst van elk AI-antwoord aantoonbaar.",
  },
  en: {
    title: "EU AI Act: traceable AI with a Company Brain | nativ",
    description:
      "From 2 August 2026 the EU AI Act requires transparent, traceable AI. This is how a Company Brain makes the origin of every AI answer demonstrable.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/ai-act", copy);
}

const aiActJsonLd = [
  webPage(
    "/ai-act",
    "De EU AI Act en herleidbare AI",
    "Wat de EU AI Act per 2 augustus 2026 vraagt op het gebied van transparantie en herleidbaarheid, en hoe een Company Brain de herkomst van elk AI-antwoord aantoonbaar maakt.",
    "2026-07-09",
  ),
];

export default async function AiActLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiActJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
