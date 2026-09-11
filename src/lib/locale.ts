/**
 * Taalroutes (A2 stap 2, KAN-425).
 *
 * Nederlands staat zonder voorvoegsel (bestaande URL's blijven identiek),
 * Engels onder /en/... . De proxy (src/proxy.ts) herschrijft een pad zonder
 * voorvoegsel intern naar /nl/..., zodat app/[locale] beide talen bedient.
 * Geen automatische redirect op browsertaal: dat verstoort indexering.
 */
export const LOCALES = ["nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Pagina's die alleen in het Nederlands bestaan (geen Engels woordenboek):
 * geen /en-route, geen hreflang. De proxy stuurt /en/<pad> hiervan door naar
 * het Nederlandse pad; de taalwissel linkt op deze pagina's naar /en (home).
 */
const NL_ONLY_PREFIXES = [
  "/company-brain",
  "/cases",
  "/kennis",
  "/kennisbank",
  "/begrippen",
  "/blog",
  "/privacy",
  "/algemene-voorwaarden",
];

export function isNlOnly(path: string): boolean {
  return NL_ONLY_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/**
 * Splitst een pad in taal + pad zonder voorvoegsel ("/en/pricing" -> en, "/pricing").
 * Ook het interne /nl-voorvoegsel wordt afgepeld: tijdens server-rendering geeft
 * usePathname() het door de proxy herschreven pad terug ("/nl/pricing").
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return { locale, path: "/" };
    if (pathname.startsWith(`/${locale}/`)) return { locale, path: pathname.slice(locale.length + 1) };
  }
  return { locale: "nl", path: pathname };
}

/**
 * Zet een interne href om naar de juiste taal. Alleen interne, absolute paden
 * worden voorzien van /en; externe links, ankers, mailto en /api blijven staan,
 * net als NL-only pagina's.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "nl") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/en" || href.startsWith("/en/") || href.startsWith("/en?")) return href;
  if (href.startsWith("/api/") || href.startsWith("/_next/")) return href;
  const pathOnly = href.split(/[?#]/)[0];
  if (isNlOnly(pathOnly)) return href;
  if (/\.[a-z0-9]+$/i.test(pathOnly)) return href; // bestanden (pdf, png, txt)
  return href === "/" ? "/en" : `/en${href}`;
}
