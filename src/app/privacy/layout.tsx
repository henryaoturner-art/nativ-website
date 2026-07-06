import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Nativ omgaat met persoonsgegevens van bezoekers van gonativ.nl: welke gegevens we verwerken, waarom, cookies, bewaartermijn en jouw rechten.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
