import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/impact",
  "Impact | nativ",
  "Waar nativ voor staat en hoe we bijdragen. Onze kijk op verantwoorde AI voor het mkb.",
);

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
