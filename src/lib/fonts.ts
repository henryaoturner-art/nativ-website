import localFont from "next/font/local";

// Het merkfont (A5, KAN-425). Tot nu toe stond "General Sans" alleen in de CSS
// zonder @font-face, dus de body viel terug op de systeemfont in gewicht 300.
// Lokaal gehost (woff2 van Fontshare, gratis voor webgebruik), drie gewichten;
// een gevraagd gewicht 300 valt automatisch op 400. Gedeeld door de rootlayout
// (app/[locale]/layout.tsx) en de globale 404 (app/global-not-found.tsx).
export const generalSans = localFont({
  src: [
    { path: "../app/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});
