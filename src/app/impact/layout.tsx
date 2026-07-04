import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Waar nativ voor staat en hoe we bijdragen. Onze kijk op verantwoorde AI voor het mkb.",
  alternates: { canonical: "/impact" },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
