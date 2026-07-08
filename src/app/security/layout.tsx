import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";

export const metadata: Metadata = pageMeta(
  "/security",
  "Security | nativ",
  "Hoe nativ met jouw bedrijfsdata omgaat: EU-hosting, GDPR, en gevoelige data die bij de bron blijft.",
);

const securityJsonLd = [
  webPage(
    "/security",
    "Security en privacy bij nativ",
    "Hoe nativ met jouw bedrijfsdata omgaat: EU-hosting, GDPR, encryptie, en data die nooit wordt gebruikt om modellen te trainen.",
  ),
];

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityJsonLd) }}
      />
      {children}
    </>
  );
}
