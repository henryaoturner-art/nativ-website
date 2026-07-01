import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Company Brain & digitale collega's voor het mkb | nativ",
    template: "%s | nativ",
  },
  description:
    "nativ bouwt een Company Brain: één AI-kennisbank voor je bedrijf, plus digitale collega's voor marketing, sales, finance en hr. Voor het Nederlandse mkb.",
  metadataBase: new URL("https://gonativ.nl"),
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
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Naar inhoud
          </a>
          <Navigation />
          <main id="main-content" className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
