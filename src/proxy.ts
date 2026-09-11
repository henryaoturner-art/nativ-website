import { NextResponse, type NextRequest } from "next/server";
import { isNlOnly } from "@/lib/locale";

/**
 * Taalroutes (A2 stap 2, KAN-425). Alleen herschrijven, nooit redirecten op
 * browsertaal (dat verstoort indexering).
 *
 *   /pricing      -> intern /nl/pricing (URL blijft /pricing)
 *   /en/pricing   -> ongewijzigd (app/[locale] met locale = en)
 *   /nl/pricing   -> 301 naar /pricing (het interne voorvoegsel is geen publieke URL)
 *   /en/cases     -> 301 naar /cases (NL-only pagina, zie src/lib/locale.ts)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname === "/en" ? "/" : pathname.slice(3);
    if (isNlOnly(rest)) {
      const url = request.nextUrl.clone();
      url.pathname = rest;
      return NextResponse.redirect(url, 301);
    }
    return NextResponse.next();
  }

  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/nl" ? "/" : pathname.slice(3);
    return NextResponse.redirect(url, 301);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/nl" : `/nl${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Alles behalve API-routes, Next-internals, Vercel-internals (analytics
  // post naar /_vercel/insights/view) en statische bestanden (sitemap.xml,
  // robots.txt, llms.txt, nativ-kennisbank.md, icon.svg, afbeeldingen, downloads). Een pad met een
  // onbekende extensie (/wp-login.php) gaat wél door de proxy, zodat het als
  // /nl/... geen route matcht en de gebrande globale 404 krijgt.
  matcher: [
    "/((?!api/|_next/|_vercel/|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|txt|md|xml|pdf|mp3|mp4|webm|m4a|wav|woff2?|ttf|otf|css|js|mjs|json|map|html|webmanifest)$).*)",
  ],
};
