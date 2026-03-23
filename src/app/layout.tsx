import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NATIV — Je bedrijf weet meer dan je denkt",
    template: "%s | NATIV",
  },
  description:
    "Nativ maakt bedrijfskennis toegankelijk zodat AI écht waarde levert. Van AI Opportunity Scan tot werkende digitale collega's.",
  metadataBase: new URL("https://gonativ.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://gonativ.nl",
    siteName: "NATIV",
    title: "NATIV — Je bedrijf weet meer dan je denkt",
    description:
      "Nativ maakt bedrijfskennis toegankelijk zodat AI écht waarde levert.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gonativ",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Naar inhoud
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
