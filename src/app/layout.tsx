import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Company Brain & digitale collega's voor het mkb | nativ",
    template: "%s | nativ",
  },
  description:
    "nativ bouwt een Company Brain: één AI-kennisbank voor je bedrijf, plus digitale collega's voor marketing, sales, finance en hr. Voor het Nederlandse mkb.",
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
    title: "Company Brain & digitale collega's voor het mkb | nativ",
    description:
      "nativ bouwt een Company Brain en digitale collega's voor het Nederlandse mkb.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gonativnl",
    title: "Company Brain & digitale collega's voor het mkb | nativ",
    description:
      "nativ bouwt een Company Brain en digitale collega's voor het Nederlandse mkb.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased" suppressHydrationWarning>
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
