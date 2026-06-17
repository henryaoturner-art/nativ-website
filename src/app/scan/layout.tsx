import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "AI Opportunity Scan voor het mkb | nativ" },
  description:
    "Ontdek in één week wat AI voor jouw bedrijf kan betekenen en waar je kunt beginnen. Een helder beeld, geen pilot, geen verplichting. No cure, no pay.",
  alternates: { canonical: "/scan" },
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
