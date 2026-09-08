import type { Metadata } from "next";
import { localizedPageMeta } from "@/lib/site-meta";
import { isLocale } from "@/lib/locale";
import { getAgendaEvents } from "@/lib/events";
import AgendaView from "./AgendaView";

type Params = Promise<{ locale: string }>;

// Metadata per taal (A2 stap 2, KAN-425); de Nederlandse tekst is ongewijzigd.
const copy = {
  nl: {
    title: "AI Events: AI-events en meetups in Nederland | nativ",
    description:
      "De AI-events, meetups en workshops die er in Nederland en online toe doen, live samengesteld uit Luma en Meetup, altijd actueel. Samengesteld door nativ.",
  },
  en: {
    title: "AI Events: AI events and meetups in the Netherlands | nativ",
    description:
      "The AI events, meetups and workshops that matter in the Netherlands and online, compiled live from Luma and Meetup, always current. Curated by nativ.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return localizedPageMeta(isLocale(locale) ? locale : "nl", "/ai-events", copy);
}

// Refresh the feed a few times a day; pin the function to an EU region so
// Meetup's location search resolves to Europe rather than the build region.
export const revalidate = 21600; // 6h
export const preferredRegion = "fra1";

export default async function AiAgendaPage() {
  const { events } = await getAgendaEvents().catch(() => ({ events: [] }));
  return <AgendaView events={events} />;
}
