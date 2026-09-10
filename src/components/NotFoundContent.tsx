"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { stripLocale } from "@/lib/locale";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Button from "./Button";

const copy = {
  nl: {
    title: "Pagina niet gevonden",
    sub: "Deze pagina bestaat niet of is verplaatst.",
    home: "Terug naar home",
    skip: "Naar inhoud",
  },
  en: {
    title: "Page not found",
    sub: "This page does not exist or has moved.",
    home: "Back to home",
    skip: "Skip to content",
  },
};

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * De 404 in de taal van de URL (A2 stap 2, KAN-425). De globale 404 wordt bij
 * de build als statische pagina gemaakt en kent de route niet; de taal komt
 * daarom op de client uit het pad (/en/... = Engels). Server-snapshot is nl,
 * zodat hydratie zonder verschil verloopt en Engels daarna overneemt.
 */
export default function NotFoundContent() {
  const locale = useSyncExternalStore(
    subscribe,
    () => stripLocale(window.location.pathname).locale,
    () => "nl" as const,
  );
  return (
    <LanguageProvider locale={locale}>
      <NotFoundBody />
    </LanguageProvider>
  );
}

function NotFoundBody() {
  const { t, language } = useLanguage();
  const c = t(copy);
  // De statische 404 draagt lang="nl"; op /en/... zet de client hem op "en".
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {c.skip}
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 pt-20 md:pt-24">
        <section className="py-32 md:py-40 px-6 text-center">
          <div className="max-w-[680px] mx-auto">
            <h1 className="font-serif text-6xl md:text-8xl text-sage/30">404</h1>
            <h2 className="font-serif mt-6">{c.title}</h2>
            <p className="mt-4 text-lg text-muted">{c.sub}</p>
            <Button href="/" className="mt-8">
              {c.home}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
