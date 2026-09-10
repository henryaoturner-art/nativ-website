import type { Metadata } from "next";
import { localizeHref, type Locale } from "./locale";

// Central content-freshness signal for GEO / AI-visibility.
// AI answer-engines treat undated pages as stale, so every core page emits a
// WebPage node with dateModified. Bump SITE_UPDATED when core marketing content
// is meaningfully revised — one edit refreshes the signal site-wide.
export const SITE_UPDATED = "2026-09-10";

/**
 * Default share card. `twitter:card = summary_large_image` promises an image;
 * without one every shared link renders as a bare text card in LinkedIn,
 * WhatsApp and Slack. One brand image covers every route that has no image
 * of its own. Must stay an absolute URL: LinkedIn does not resolve relative
 * og:image paths.
 */
export const OG_IMAGE = {
  url: "https://gonativ.nl/og-default.png",
  width: 1200,
  height: 630,
  alt: "nativ - Company Brain | AI Workflows",
};

/** Engelse deelafbeelding ("For SMEs") voor de /en-routes (A3, KAN-425). */
export const OG_IMAGE_EN = { ...OG_IMAGE, url: "https://gonativ.nl/og-default-en.png" };

export function ogImage(locale: Locale) {
  return locale === "en" ? OG_IMAGE_EN : OG_IMAGE;
}

export const OG_LOCALE: Record<Locale, string> = { nl: "nl_NL", en: "en_US" };

const SITE_PUBLISHED = "2026-03-10";

/**
 * Page metadata with title, og:title and twitter:title driven from one string.
 *
 * Next.js does not derive openGraph.title from title: a route that omits
 * `openGraph` inherits the parent's object wholesale, so every page used to
 * share the homepage's og:title. Pass `title` exactly as it should appear in
 * the browser tab, including the "| nativ" suffix.
 */
export function pageMeta(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: "nativ",
      url: `https://gonativ.nl${path}`,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@gonativnl",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export interface LocalizedCopy {
  title: string;
  description: string;
}

/**
 * Metadata voor een tweetalige pagina (A2 stap 2, KAN-425): canonical in de
 * eigen taal, drie hreflang-links (nl, en, x-default naar nl), og:locale en
 * de deelafbeelding per taal. Voor NL-only pagina's blijft pageMeta() de weg:
 * die zet geen hreflang, want er is geen Engelse tegenhanger.
 */
export function localizedPageMeta(
  locale: Locale,
  path: string,
  copy: { nl: LocalizedCopy; en: LocalizedCopy },
): Metadata {
  const c = copy[locale];
  const own = localizeHref(path, locale);
  const image = ogImage(locale);
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: own,
      languages: { nl: path, en: localizeHref(path, "en"), "x-default": path },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[locale === "en" ? "nl" : "en"]],
      siteName: "nativ",
      url: `https://gonativ.nl${own}`,
      title: c.title,
      description: c.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: "@gonativnl",
      title: c.title,
      description: c.description,
      images: [image.url],
    },
  };
}

/** WebPage JSON-LD node carrying datePublished + dateModified (the freshness signal). */
export function webPage(
  path: string,
  name: string,
  description: string,
  datePublished: string = SITE_PUBLISHED,
  locale: Locale = "nl",
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `https://gonativ.nl${localizeHref(path, locale)}`,
    name,
    description,
    datePublished,
    dateModified: SITE_UPDATED,
    isPartOf: { "@type": "WebSite", name: "nativ", url: "https://gonativ.nl" },
    publisher: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
    inLanguage: locale === "en" ? "en" : "nl-NL",
  };
}

/** Human-readable Dutch date, e.g. "6 juli 2026". */
export function formatDateNL(date: string = SITE_UPDATED): string {
  return new Date(date).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
