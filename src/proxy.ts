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
  // post naar /_vercel/insights/view) en bestanden met een extensie
  // (sitemap.xml, robots.txt, llms.txt, icon.svg, afbeeldingen).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
