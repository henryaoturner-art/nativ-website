import type { Metadata } from "next";
import { localizedPageMeta, webPage } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Security | nativ",
    description:
      "Hoe nativ met jouw bedrijfsdata omgaat: EU-hosting, GDPR, en gevoelige data die bij de bron blijft.",
  },
  en: {
    title: "Security | nativ",
    description:
      "How nativ handles your company data: EU hosting, GDPR, and sensitive data that stays at the source.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/security", copy);
}

const securityJsonLd = [
  webPage(
    "/security",
    "Security en privacy bij nativ",
    "Hoe nativ met jouw bedrijfsdata omgaat: EU-hosting, GDPR, encryptie, en data die nooit wordt gebruikt om modellen te trainen.",
  ),
];

export default async function SecurityLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityJsonLd) }}
      />
      )}
      {children}
    </>
  );
}
