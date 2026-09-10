"use client";

import { useSyncExternalStore } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { isNlOnly, localizeHref, stripLocale } from "@/lib/locale";

/**
 * NL | EN wissel (A2, KAN-425): twee links naar dezelfde pagina in de andere
 * taal, geen state-toggle meer. `translate="no"` houdt Chrome's vertaler van
 * de labels af ("EN" is ook het Nederlandse woord "en", dus vertaald werd het
 * "AND"). Op een NL-only pagina wijst EN naar de Engelse homepage.
 */
function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export default function LanguageToggle() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const { path } = stripLocale(pathname ?? "/");
  // Querystring (bijv. /scan/start?team=1) meenemen. Op de server is die leeg;
  // useSyncExternalStore geeft server en client dezelfde eerste render.
  const search = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );

  const nlHref = `${path}${search}`;
  const enHref = isNlOnly(path) ? "/en" : `${localizeHref(path, "en")}${search}`;

  const cls = (active: boolean) =>
    // Contrast: Charcoal (7,6:1) actief, Muted (4,6:1) inactief; Sage haalde 3,0:1 (B2, KAN-425).
    `px-2 py-1 rounded transition-colors ${active ? "text-grey font-semibold" : "text-muted hover:text-grey"}`;

  return (
    <div className="flex items-center gap-0.5 text-sm notranslate" translate="no">
      <NextLink
        href={nlHref}
        lang="nl"
        hrefLang="nl"
        className={cls(language === "nl")}
        aria-label="Nederlands"
        aria-current={language === "nl" ? "page" : undefined}
      >
        NL
      </NextLink>
      <span className="text-muted" aria-hidden="true">|</span>
      <NextLink
        href={enHref}
        lang="en"
        hrefLang="en"
        className={cls(language === "en")}
        aria-label="English"
        aria-current={language === "en" ? "page" : undefined}
      >
        EN
      </NextLink>
    </div>
  );
}
