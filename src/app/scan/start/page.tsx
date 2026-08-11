"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Start de scan",
    heroSub:
      "Drie gegevens en je kunt beginnen. Je krijgt een eigen link, zodat je het komende jaar terug kunt naar je scan en je rapport.",
    companyLabel: "Bedrijfsnaam",
    nameLabel: "Je naam",
    emailLabel: "Je e-mailadres",
    emailHelp: "Hierop ontvang je de link naar je rapport.",
    submit: "Naar de vragen",
    submitting: "Even geduld...",
    errorMsg: "Er ging iets mis. Probeer het opnieuw of mail info@gonativ.nl.",
    privacy:
      "We vragen naar het werk zelf, niet naar bedrijfsbestanden of vertrouwelijke gegevens. Die blijven waar ze horen. Hoe we met je gegevens omgaan lees je in de",
    privacyLink: "privacyverklaring",
  },
  en: {
    heroTitle: "Start the scan",
    heroSub:
      "Three details and you can begin. You get your own link, so you can return to your scan and your report for the next year.",
    companyLabel: "Company name",
    nameLabel: "Your name",
    emailLabel: "Your email address",
    emailHelp: "This is where you receive the link to your report.",
    submit: "To the questions",
    submitting: "One moment...",
    errorMsg: "Something went wrong. Please try again or email info@gonativ.nl.",
    privacy:
      "We ask about the work itself, not for company files or confidential data. Those stay where they belong. How we handle your details is in our",
    privacyLink: "privacy statement",
  },
};

export default function ScanStartPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { t, language } = useLanguage();
  const c = t(translations);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ?team=1 (kaart B op /scan): zelfde formulier, maar de scan start als
    // teamscan — na de eigen vragen volgt het teamoverzicht, niet het rapport.
    const isTeam = new URLSearchParams(window.location.search).has("team");
    const form = e.currentTarget;
    const data = {
      companyName: (form.elements.namedItem("company") as HTMLInputElement).value,
      contactName: (form.elements.namedItem("name") as HTMLInputElement).value,
      contactEmail: (form.elements.namedItem("email") as HTMLInputElement).value,
      lang: language,
      mode: isTeam ? "team" : "quick",
    };

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create scan");
      const { token } = (await res.json()) as { token: string };
      router.push(`/scan/${token}`);
    } catch {
      setError(c.errorMsg);
      setLoading(false);
    }
  }

  return (
    <section className="py-10 md:py-14 px-6 pb-20 md:pb-28">
      <div className="max-w-[560px] mx-auto">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] text-grey text-center">
            {c.heroTitle}
          </h1>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed text-center">
            {c.heroSub}
          </p>
        </FadeIn>
        <FadeIn delay={250}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-surface rounded-xl p-8 border border-sage-light space-y-5"
          >
            <div>
              <label htmlFor="company" className="block text-sm text-grey/60 mb-1.5">
                {c.companyLabel}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                maxLength={200}
                className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm text-grey/60 mb-1.5">
                {c.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={200}
                className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-grey/60 mb-1.5">
                {c.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={200}
                className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
              />
              <p className="mt-1.5 text-xs text-grey/40">{c.emailHelp}</p>
            </div>
            {error && <p className="text-error text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage text-white py-3.5 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? c.submitting : c.submit}
            </button>
            <p className="text-xs text-grey/40 leading-relaxed">
              {c.privacy}{" "}
              <a href="/privacy" className="text-sage hover:underline">
                {c.privacyLink}
              </a>
              .
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
