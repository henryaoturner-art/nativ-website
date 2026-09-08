import type { Metadata } from "next";
import { localizedPageMeta } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "Prijzen | nativ",
    description:
      "Wat een Company Brain en AI-workflows kosten voor het mkb. Helder en zonder verrassingen. Exclusief tokenkosten.",
  },
  en: {
    title: "Pricing | nativ",
    description:
      "What a Company Brain and AI workflows cost for SMEs. Clear and without surprises. Excluding token costs.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/pricing", copy);
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
