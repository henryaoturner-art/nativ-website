import type { Metadata } from "next";
import { localizedPageMeta } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Impact | nativ",
    description:
      "Waar nativ voor staat en hoe we bijdragen. Onze kijk op verantwoorde AI voor het mkb.",
  },
  en: {
    title: "Impact | nativ",
    description:
      "What nativ stands for and how we contribute. Our view on responsible AI for SMEs.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/impact", copy);
}

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
