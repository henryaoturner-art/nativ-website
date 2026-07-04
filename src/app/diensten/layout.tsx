import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Van AI Opportunity Scan tot een werkende digitale collega. Bekijk hoe nativ het mkb helpt met AI.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
