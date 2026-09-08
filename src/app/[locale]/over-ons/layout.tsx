import type { Metadata } from "next";
import { localizedPageMeta, webPage } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Over ons | nativ",
    description:
      "Wie we zijn en waarom we nativ bouwen. Een Company Brain en AI-workflows voor het mkb.",
  },
  en: {
    title: "About us | nativ",
    description:
      "Who we are and why we build nativ. A Company Brain and AI workflows for SMEs.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/over-ons", copy);
}

const overOnsJsonLd = [
  webPage(
    "/over-ons",
    "Over nativ",
    "Wie we zijn en waarom we nativ bouwen. Een Company Brain en AI-workflows voor het mkb.",
  ),
];

export default async function OverOnsLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(overOnsJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
