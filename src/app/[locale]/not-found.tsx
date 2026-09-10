"use client";

import Button from "@/components/Button";
import { useLanguage } from "@/lib/language-context";

// Bij navigatie op de client (een kapotte interne link) rendert Next deze
// boundary binnen de layout; een directe aanvraag krijgt app/global-not-found.tsx.
const copy = {
  nl: {
    title: "Pagina niet gevonden",
    sub: "Deze pagina bestaat niet of is verplaatst.",
    home: "Terug naar home",
  },
  en: {
    title: "Page not found",
    sub: "This page does not exist or has moved.",
    home: "Back to home",
  },
};

export default function NotFound() {
  const { t } = useLanguage();
  const c = t(copy);
  return (
    <section className="py-32 md:py-40 px-6 text-center">
      <div className="max-w-[680px] mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl text-sage/30">404</h1>
        <h2 className="font-serif text-3xl md:text-[42px] leading-tight mt-6">
          {c.title}
        </h2>
        <p className="mt-4 text-lg font-light text-grey/60">
          {c.sub}
        </p>
        <Button className="mt-8"
          href="/"
        >
          {c.home}
        </Button>
      </div>
    </section>
  );
}
