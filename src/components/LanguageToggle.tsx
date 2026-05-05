"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 text-sm font-light">
      <button
        onClick={() => setLanguage("nl")}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          language === "nl"
            ? "text-sage font-medium"
            : "text-grey/50 hover:text-grey"
        }`}
        aria-label="Nederlands"
        aria-pressed={language === "nl"}
      >
        🇳🇱
      </button>
      <span className="text-grey/30">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          language === "en"
            ? "text-sage font-medium"
            : "text-grey/50 hover:text-grey"
        }`}
        aria-label="English"
        aria-pressed={language === "en"}
      >
        🇬🇧
      </button>
    </div>
  );
}
