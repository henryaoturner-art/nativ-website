"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./locale";

type Language = Locale;

interface LanguageContextType {
  language: Language;
  t: <T>(translations: { nl: T; en: T }) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * De taal komt van de route (app/[locale], A2 stap 2, KAN-425), niet meer uit
 * client-state of localStorage. De copy-dictionaries per pagina blijven de
 * bron; alleen de selectie is verhuisd. Wisselen = navigeren naar dezelfde
 * pagina in de andere taal (LanguageToggle).
 */
export function LanguageProvider({ locale, children }: { locale: Language; children: ReactNode }) {
  const t = <T,>(translations: { nl: T; en: T }): T => translations[locale];

  return (
    <LanguageContext.Provider value={{ language: locale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
