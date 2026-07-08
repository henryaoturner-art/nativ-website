import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/privacy",
  "Privacyverklaring | nativ",
  "Hoe nativ omgaat met persoonsgegevens van bezoekers van gonativ.nl: welke gegevens we verwerken, waarom, cookies, bewaartermijn en jouw rechten.",
);

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
