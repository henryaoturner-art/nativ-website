import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/over-ons",
  "Over ons | nativ",
  "Wie we zijn en waarom we nativ bouwen. Een Company Brain en AI-workflows voor het mkb.",
);

const overOnsJsonLd = [
  webPage(
    "/over-ons",
    "Over nativ",
    "Wie we zijn en waarom we nativ bouwen. Een Company Brain en AI-workflows voor het mkb.",
  ),
];

export default function OverOnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(overOnsJsonLd) }}
      />
      {children}
    </>
  );
}
