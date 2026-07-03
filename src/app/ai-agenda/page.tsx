import type { Metadata } from "next";
import { getAgendaEvents } from "@/lib/events";
import AgendaView from "./AgendaView";

export const metadata: Metadata = {
  title: { absolute: "AI Agenda: AI-events en meetups in Nederland | nativ" },
  description:
    "De AI-events, meetups en workshops die er in Nederland en online toe doen — live samengesteld uit Luma en Meetup, altijd actueel. Samengesteld door Nativ.",
  alternates: { canonical: "/ai-agenda" },
};

// Refresh the feed a few times a day; pin the function to an EU region so
// Meetup's location search resolves to Europe rather than the build region.
export const revalidate = 21600; // 6h
export const preferredRegion = "fra1";

export default async function AiAgendaPage() {
  const { events } = await getAgendaEvents().catch(() => ({ events: [] }));
  return <AgendaView events={events} />;
}
