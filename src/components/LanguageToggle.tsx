"use client";

import { useLanguage } from "@/lib/language-context";

/**
 * NL | EN switch (A2 stap 1, KAN-425). `translate="no"` keeps Chrome's
 * translator off the labels: "EN" is also the Dutch word for "and", so a
 * translated page used to show "AND". Each button carries its own `lang`.
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 text-sm font-light notranslate" translate="no">
      <button
        onClick={() => setLanguage("nl")}
        lang="nl"
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          language === "nl"
            ? "text-sage font-medium"
            : "text-grey/50 hover:text-grey"
        }`}
        aria-label="Nederlands"
        aria-pressed={language === "nl"}
      >
        NL
      </button>
      <span className="text-grey/30" aria-hidden="true">|</span>
      <button
        onClick={() => setLanguage("en")}
        lang="en"
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          language === "en"
            ? "text-sage font-medium"
            : "text-grey/50 hover:text-grey"
        }`}
        aria-label="English"
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}
