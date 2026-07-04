import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Wat een Company Brain en digitale collega's kosten voor het mkb. Helder en zonder verrassingen. Exclusief tokenkosten.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
