import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { localizedPageMeta } from "@/lib/site-meta";
import { LOCALES, isLocale } from "@/lib/locale";
import "../globals.css";

// Het merkfont (A5, KAN-425). Tot nu toe stond "General Sans" alleen in de CSS
// zonder @font-face, dus de body viel terug op de systeemfont in gewicht 300.
// Lokaal gehost (woff2 van Fontshare, gratis voor webgebruik), drie gewichten;
// een gevraagd gewicht 300 valt automatisch op 400.
const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

// Taalroutes (A2 stap 2, KAN-425): nl zonder voorvoegsel (de proxy herschrijft
// intern naar /nl/...), en onder /en/... . Beide talen worden statisch gebouwd.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

const homeCopy = {
  nl: {
    title: "Company Brain en AI-workflows voor het mkb | nativ",
    description:
      "Een Company Brain: de altijd actuele kennisbank van je bedrijf, uit de hoofden van je mensen, je systemen en de buitenwereld. Met AI-workflows die erop draaien.",
  },
  en: {
    title: "Company Brain and AI workflows for SMEs | nativ",
    description:
      "A Company Brain: the always-current knowledge base of your company, from the heads of your people, your systems and the outside world. With AI workflows running on it.",
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "nl";
  return {
    metadataBase: new URL("https://gonativ.nl"),
    // Homepage-metadata. Elke andere route overschrijft title, description en
    // alternates in de eigen page.tsx of layout.tsx (localizedPageMeta voor
    // tweetalige pagina's, pageMeta voor NL-only). Een NIEUWE route MOET dat ook doen.
    ...localizedPageMeta(lang, "/", homeCopy),
    title: { default: homeCopy[lang].title, template: "%s | nativ" },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`h-full antialiased ${generalSans.variable}`} suppressHydrationWarning>
      <head>
        {/* FadeIn starts at opacity 0 and is revealed by an IntersectionObserver.
            Without JS that observer never runs, so every section would stay blank. */}
        <noscript>
          <style>{`.fade-in { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider locale={locale}>
          <a href="#main-content" className="skip-link">
            {locale === "en" ? "Skip to content" : "Naar inhoud"}
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
