// Central content-freshness signal for GEO / AI-visibility.
// AI answer-engines treat undated pages as stale, so every core page emits a
// WebPage node with dateModified. Bump SITE_UPDATED when core marketing content
// is meaningfully revised — one edit refreshes the signal site-wide.
export const SITE_UPDATED = "2026-07-06";

const SITE_PUBLISHED = "2026-03-10";

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
