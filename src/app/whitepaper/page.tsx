"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  en: {
    logo: "Nativ",
    heroTitle: "Company brain",
    heroTitle2: "",
    heroSub:
      "Knowledge from the minds of employees: minimum viable context (MVC™). Theory and practice.",

    // What's inside
    insideTitle: "What's inside",
    inside1: "Why 80% of AI projects fail (and it's not the model)",
    inside2: "The scientific basis: from tacit knowledge to context engineering",
    inside3: "The MVC™ Framework: 10 context blocks that cover 80%+ of AI agent tasks",
    inside4: "The Ring Model: organizing context for delivery",
    inside5: "Implementation approach: from scan to deployment",
    inside6: "Full references and research sources",

    // Gate / CTA
    gateTitle: "Download the complete whitepaper",
    gateNote: "Free · Delivered to your inbox as PDF",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    roleLabel: "Role",
    submit: "Send me the full whitepaper →",
    submitting: "Sending...",
    thankYou: "Here's your whitepaper",
    thankYouSub:
      "Click the button below to download the full whitepaper. We've also sent a copy to your email.",
    downloadBtn: "Download whitepaper (PDF)",
    privacy: "We respect your privacy. No spam, ever.",

    footerCopy: "© 2026 Nativ B.V. All rights reserved.",
  },
  nl: {
    logo: "Nativ",
    heroTitle: "Company brain",
    heroTitle2: "",
    heroSub:
      "Kennis uit de hoofden van medewerkers: minimum viable context (MVC™). De theorie en praktijk.",

    insideTitle: "Wat erin staat",
    inside1: "Waarom 80% van AI-projecten faalt (en het ligt niet aan het model)",
    inside2: "De wetenschappelijke basis: van tacit knowledge tot context engineering",
    inside3: "Het MVC™ Framework: 10 contextblokken die 80%+ van AI-agenttaken afdekken",
    inside4: "Het ringmodel: context organiseren voor levering",
    inside5: "Implementatie-aanpak: van scan tot deployment",
    inside6: "Volledige referenties en onderzoeksbronnen",

    gateTitle: "Download het complete whitepaper",
    gateNote: "Gratis · Als PDF in je inbox",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    roleLabel: "Functie",
    submit: "Stuur mij het volledige whitepaper →",
    submitting: "Verzenden...",
    thankYou: "Hier is je whitepaper",
    thankYouSub:
      "Klik op de knop hieronder om het volledige whitepaper te downloaden. We hebben ook een kopie naar je e-mail gestuurd.",
    downloadBtn: "Download whitepaper (PDF)",
    privacy: "Wij respecteren je privacy. Geen spam, ooit.",

    footerCopy: "© 2026 Nativ B.V. Alle rechten voorbehouden.",
  },
};

export default function WhitepaperPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Empty means auto-detect
  const { t, language } = useLanguage();
  const c = t(translations);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      language: selectedLanguage || language, // Use selected language or auto-detect from context
    };

    try {
      const res = await fetch("/api/whitepaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email info@gonativ.nl.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[800px] mx-auto">

          <FadeIn delay={100}>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-[52px] leading-[1.15] text-grey">
              {c.heroTitle}
              {c.heroTitle2 && <><br />{c.heroTitle2}</>}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/60 italic leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What's inside + Download */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[800px] mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left: What's inside */}
          <FadeIn>
            <div>
              <h2 className="font-serif text-2xl text-grey mb-6">
                {c.insideTitle}
              </h2>
              <ul className="space-y-3">
                {[c.inside1, c.inside2, c.inside3, c.inside4, c.inside5, c.inside6].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 shrink-0">✓</span>
                    <span className="text-sm text-grey/80 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: Download form */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📬</div>
                  <p className="font-serif text-2xl text-sage">{c.thankYou}</p>
                  <p className="mt-3 text-grey/60 font-light text-sm leading-relaxed">
                    {c.thankYouSub}
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="text-xs text-grey/60 font-medium">Choose language:</div>
                    <div className="flex gap-3">
                      <a
                        href="/downloads/nativ-whitepaper-mei-2026-definitief.pdf"
                        download
                        className="flex-1 bg-sage text-white py-3 px-6 rounded-lg hover:bg-sage-dark transition-colors font-medium text-center text-sm"
                      >
                        📄 Nederlands
                      </a>
                      <a
                        href="/downloads/nativ-whitepaper-mei-2026-definitief-EN.pdf"
                        download
                        className="flex-1 bg-sage text-white py-3 px-6 rounded-lg hover:bg-sage-dark transition-colors font-medium text-center text-sm"
                      >
                        📄 English
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-xl text-grey mb-1">
                    {c.gateTitle}
                  </h2>
                  <p className="text-sage text-xs font-sans font-medium mb-6">{c.gateNote}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-grey/60 mb-1.5">
                        {c.nameLabel} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-grey/60 mb-1.5">
                        {c.emailLabel} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm text-grey/60 mb-1.5">
                        {c.companyLabel}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm text-grey/60 mb-1.5">
                        {c.roleLabel}
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm text-grey/60 mb-1.5">
                        {language === 'en' ? 'Whitepaper language' : 'Taal whitepaper'}
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                      >
                        <option value="">
                          {language === 'en' ? 'Auto-detect (based on website language)' : 'Automatisch detecteren (op basis van website taal)'}
                        </option>
                        <option value="nl">🇳🇱 Nederlands</option>
                        <option value="en">🇬🇧 English</option>
                      </select>
                    </div>


                    {error && <p className="text-error text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-sage text-white py-3.5 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                    >
                      {loading ? c.submitting : c.submit}
                    </button>
                  </form>
                  <p className="mt-4 text-xs text-grey/40 text-center">{c.privacy}</p>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
