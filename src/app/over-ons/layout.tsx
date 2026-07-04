import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Wie we zijn en waarom we nativ bouwen. Een Company Brain en digitale collega's voor het Nederlandse mkb.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
