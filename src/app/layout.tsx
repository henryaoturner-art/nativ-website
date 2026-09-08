import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { OG_IMAGE } from "@/lib/site-meta";
import "./globals.css";

// Het merkfont (A5, KAN-425). Tot nu toe stond "General Sans" alleen in de CSS
// zonder @font-face, dus de body viel terug op de systeemfont in gewicht 300.
// Lokaal gehost (woff2 van Fontshare, gratis voor webgebruik), drie gewichten;
// een gevraagd gewicht 300 valt automatisch op 400.
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Company Brain en AI-workflows voor het mkb | nativ",
    template: "%s | nativ",
  },
  description:
    "Een Company Brain: de altijd actuele kennisbank van je bedrijf, uit de hoofden van je mensen, je systemen en de buitenwereld. Met AI-workflows die erop draaien.",
  metadataBase: new URL("https://gonativ.nl"),
  // Homepage canonical. Every other route overrides this with its own
  // alternates.canonical (in its page.tsx or a sibling layout.tsx), so this
  // default only ever resolves for "/". Any NEW route MUST set its own canonical.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://gonativ.nl",
    siteName: "nativ",
    title: "Company Brain en AI-workflows voor het mkb | nativ",
    description:
      "De kennisbank van je bedrijf, uit de hoofden van je mensen, je systemen en de buitenwereld. Met AI-workflows die erop draaien.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gonativnl",
    title: "Company Brain en AI-workflows voor het mkb | nativ",
    description:
      "De kennisbank van je bedrijf, uit de hoofden van je mensen, je systemen en de buitenwereld. Met AI-workflows die erop draaien.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`h-full antialiased ${generalSans.variable}`} suppressHydrationWarning>
      <head>
        {/* FadeIn starts at opacity 0 and is revealed by an IntersectionObserver.
            Without JS that observer never runs, so every section would stay blank. */}
        <noscript>
          <style>{`.fade-in { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Naar inhoud
          </a>
          <Navigation />
          <main id="main-content" className="flex-1 pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <Analytics />
        {/* Google Ads tag (gtag.js) — AW-18340072378. Loaded site-wide so
            conversion tracking works on every page. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18340072378"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18340072378');`}
        </Script>
      </body>
    </html>
  );
}
