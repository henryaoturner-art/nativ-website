import type { Metadata } from "next";

// Central content-freshness signal for GEO / AI-visibility.
// AI answer-engines treat undated pages as stale, so every core page emits a
// WebPage node with dateModified. Bump SITE_UPDATED when core marketing content
// is meaningfully revised — one edit refreshes the signal site-wide.
export const SITE_UPDATED = "2026-07-09";

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

/** WebPage JSON-LD node carrying datePublished + dateModified (the freshness signal). */
export function webPage(
  path: string,
  name: string,
  description: string,
  datePublished: string = SITE_PUBLISHED,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `https://gonativ.nl${path}`,
    name,
    description,
    datePublished,
    dateModified: SITE_UPDATED,
    isPartOf: { "@type": "WebSite", name: "nativ", url: "https://gonativ.nl" },
    publisher: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
    inLanguage: "nl-NL",
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
