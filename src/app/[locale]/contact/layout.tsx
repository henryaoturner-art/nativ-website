import type { Metadata } from "next";
import { localizedPageMeta } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Contact | nativ",
    description:
      "Neem contact op met nativ. We denken graag mee over een Company Brain en AI-workflows voor jouw bedrijf.",
  },
  en: {
    title: "Contact | nativ",
    description:
      "Get in touch with nativ. We are happy to think along about a Company Brain and AI workflows for your company.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/contact", copy);
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
