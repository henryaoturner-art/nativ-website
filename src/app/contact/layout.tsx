import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/contact",
  "Contact | nativ",
  "Neem contact op met nativ. We denken graag mee over een Company Brain en digitale collega's voor jouw bedrijf.",
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
