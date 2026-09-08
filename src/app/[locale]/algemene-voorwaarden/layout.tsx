import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/algemene-voorwaarden",
  "Algemene Voorwaarden | nativ",
  "De algemene voorwaarden van Nativ B.V. voor onze SaaS-dienst: gebruiksrecht, eigendom van jouw Company Brain, privacy/AVG, aansprakelijkheid en looptijd.",
);

export default function VoorwaardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
