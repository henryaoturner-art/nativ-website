import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Hoe nativ met jouw bedrijfsdata omgaat: EU-hosting, GDPR, en gevoelige data die bij de bron blijft.",
  alternates: { canonical: "/security" },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
