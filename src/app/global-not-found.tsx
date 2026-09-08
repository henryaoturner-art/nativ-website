import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import NotFoundContent from "@/components/NotFoundContent";
import { generalSans } from "@/lib/fonts";
import "./globals.css";

/**
 * Globale 404 (A2 stap 2, KAN-425). De rootlayout zit in app/[locale], en een
 * 404 kan Next dan niet uit layout + not-found opbouwen. Dit bestand rendert
 * daarom zelf een volledig document met header, footer, fonts en stijlen, in
 * de taal van de URL (zie NotFoundContent). Geldt voor elk pad zonder route,
 * ook paden met een extensie die de proxy niet herschrijft.
 */
export const metadata: Metadata = {
  title: "Pagina niet gevonden | nativ",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="nl" className={`h-full antialiased ${generalSans.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <NotFoundContent />
        <Analytics />
      </body>
    </html>
  );
}
