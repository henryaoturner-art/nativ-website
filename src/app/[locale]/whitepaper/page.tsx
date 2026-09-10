"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { Check } from "lucide-react";

const translations = {
  en: {
    heroTitle: "Company Brain",
    heroTitle2: "",
    heroSub:
      "Making company knowledge usable for AI: minimum viable context (MVC™). Theory and practice.",

    // What's inside
    insideTitle: "What's inside",
    inside1: "Why 80% of AI projects fail (and it's not the model)",
    inside2: "The scientific basis: from tacit knowledge to context engineering",
    inside3: "The MVC™ framework: eleven knowledge areas with over four hundred categories",
    inside4: "Governance: every fact with an owner, a shelf life, and access rules",
    inside5: "From company brain to AI workflows, and how you start",
    inside6: "Full references and research sources",

    // Gate / CTA
    gateTitle: "Download the complete whitepaper",
    gateNote: "Free · Delivered to your inbox as PDF",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    roleLabel: "Role",
    submit: "Send me the full whitepaper",
    submitting: "Sending...",
    thankYou: "Here's your whitepaper",
    thankYouSub:
      "Click the button below to download the full whitepaper. We've also sent a copy to your email.",
    downloadBtn: "Download whitepaper (PDF)",
    privacy: "We respect your privacy. No spam, ever.",

    footerCopy: "© 2026 Nativ B.V. All rights reserved.",
  },
  nl: {
    heroTitle: "Company Brain",
    heroTitle2: "",
    heroSub:
      "Bedrijfskennis bruikbaar maken voor AI: minimum viable context (MVC™). De theorie en praktijk.",

    insideTitle: "Wat erin staat",
    inside1: "Waarom 80% van AI-projecten faalt (en het ligt niet aan het model)",
    inside2: "De wetenschappelijke basis: van tacit knowledge tot context engineering",
    inside3: "Het MVC™-framework: elf kennisgebieden met ruim vierhonderd categorieën",
    inside4: "Governance: elk feit met een eigenaar, een houdbaarheidsdatum en toegangsregels",
    inside5: "Van company brain naar AI-workflows, en hoe je begint",
    inside6: "Volledige referenties en onderzoeksbronnen",

    gateTitle: "Download het complete whitepaper",
    gateNote: "Gratis · Als PDF in je inbox",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    roleLabel: "Functie",
    submit: "Stuur mij het volledige whitepaper",
    submitting: "Verzenden...",
    thankYou: "Hier is je whitepaper",
    thankYouSub:
      "Klik op de knop hieronder om het volledige whitepaper te downloaden. We hebben ook een kopie naar je e-mail gestuurd.",
    downloadBtn: "Download whitepaper (PDF)",
    privacy: "Wij respecteren je privacy. Geen spam, ooit.",

    footerCopy: "© 2026 Nativ B.V. Alle rechten voorbehouden.",
  },
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-surface text-grey focus:border-grey transition";
const labelClass = "block text-sm text-muted mb-1.5";

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
      {/* E2 (KAN-425): links de kop, de ondertitel en "Wat erin staat" (7 kolommen),
          rechts het downloadformulier in de signatuurkaart (5 kolommen). */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <FadeIn>
              <h1 className="font-serif text-grey">
                {c.heroTitle}
                {c.heroTitle2 && <><br />{c.heroTitle2}</>}
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-6 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
            </FadeIn>
            <FadeIn delay={300}>
              <h2 className="mt-12 font-serif text-grey">{c.insideTitle}</h2>
              <ul className="mt-6 max-w-[640px] space-y-3">
                {[c.inside1, c.inside2, c.inside3, c.inside4, c.inside5, c.inside6].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-grey">
                    <Check size={18} strokeWidth={2} className="mt-1 shrink-0 text-sage-dark" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={300} className="md:col-span-5">
            <Card signature primary>
              {submitted ? (
                <div>
                  <h3 className="font-serif text-grey">{c.thankYou}</h3>
                  <p className="mt-3 text-grey leading-relaxed">{c.thankYouSub}</p>
                  <p className="mt-6 text-sm text-muted">Choose language:</p>
                  <div className="mt-3 flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1"
                      href="/downloads/nativ-whitepaper-v2.4-nl.pdf"
                      download
                    >
                      Nederlands (PDF)
                    </Button>
                    <Button className="flex-1"
                      href="/downloads/nativ-whitepaper-v2.4-en.pdf"
                      download
                    >
                      English (PDF)
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-grey">{c.gateTitle}</h3>
                  <p className="mt-2 text-sm text-muted">{c.gateNote}</p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        {c.nameLabel} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {c.emailLabel} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>
                        {c.companyLabel}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className={labelClass}>
                        {c.roleLabel}
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="language" className={labelClass}>
                        {language === 'en' ? 'Whitepaper language' : 'Taal whitepaper'}
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">
                          {language === 'en' ? 'Auto-detect (based on website language)' : 'Automatisch detecteren (op basis van website taal)'}
                        </option>
                        <option value="nl">Nederlands</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    {error && <p className="text-error text-sm">{error}</p>}

                    <Button full
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? c.submitting : c.submit}
                    </Button>
                  </form>
                  <p className="mt-4 text-xs text-muted">{c.privacy}</p>
                </>
              )}
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
