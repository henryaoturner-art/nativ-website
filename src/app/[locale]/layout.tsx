import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { localizedPageMeta } from "@/lib/site-meta";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/locale";
import { generalSans } from "@/lib/fonts";
import "../globals.css";


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
  // Een pad met een extensie (/foo.php) herschrijft de proxy niet, en matcht
  // dan dit segment met locale "foo.php": dat is een 404, niet de homepage.
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
