import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/pricing",
  "Prijzen | nativ",
  "Wat een Company Brain en AI-workflows kosten voor het mkb. Helder en zonder verrassingen. Exclusief tokenkosten.",
);

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
