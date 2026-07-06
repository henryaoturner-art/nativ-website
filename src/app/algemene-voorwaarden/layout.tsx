import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "De algemene voorwaarden van Nativ B.V. voor onze SaaS-dienst: gebruiksrecht, eigendom van jouw Company Brain, privacy/AVG, aansprakelijkheid en looptijd.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function VoorwaardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
