import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "Onze visie op het Company Brain en digitale collega's voor het mkb. Lees de whitepaper.",
  alternates: { canonical: "/whitepaper" },
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
