"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "De bedrijfskennis-audit",
    heroSub:
      "De manier waarop je werkt, zit in de hoofden van je mensen. En loopt de deur uit zodra iemand vertrekt. Doe de gratis 10-minuten-audit en zie waar de kennis van je bedrijf zit, en wat je riskeert.",
    insideTitle: "Wat je krijgt",
    inside1: "Een invulbaar A4: waar zit je kennis (hoofden, systemen, buitenwereld)?",
    inside2: "Wat loopt de deur uit als een sleutelpersoon vertrekt?",
    inside3: "Je risico in vijf vragen, met een heldere uitkomst",
    gateTitle: "Ontvang de audit",
    gateNote: "Gratis · Als PDF in je inbox",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    submit: "Stuur mij de audit →",
    submitting: "Verzenden...",
    thankYou: "Check je inbox",
    thankYouSub:
      "We hebben de audit naar je e-mail gestuurd. Je kunt 'm ook direct hieronder downloaden.",
    downloadBtn: "Download de audit (PDF)",
    privacy: "Wij respecteren je privacy. Geen spam, ooit.",
    error: "Er ging iets mis. Probeer het opnieuw of mail info@gonativ.nl.",
  },
  en: {
    heroTitle: "The company-knowledge audit",
    heroSub:
      "The way you work lives in the heads of your people. And walks out the door when someone leaves. Take the free 10-minute audit and see where your company's knowledge sits, and what you're risking.",
    insideTitle: "What you get",
    inside1: "A fillable one-pager: where does your knowledge sit (heads, systems, outside world)?",
    inside2: "What walks out the door when a key person leaves?",
    inside3: "Your risk in five questions, with a clear outcome",
    gateTitle: "Get the audit",
    gateNote: "Free · Delivered to your inbox as PDF",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    submit: "Send me the audit →",
    submitting: "Sending...",
    thankYou: "Check your inbox",
    thankYouSub:
      "We've sent the audit to your email. You can also download it directly below.",
    downloadBtn: "Download the audit (PDF)",
    privacy: "We respect your privacy. No spam, ever.",
    error: "Something went wrong. Please try again or email info@gonativ.nl.",
  },
};

export default function AuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
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
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError(c.error);
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
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/60 leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What you get + form */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[800px] mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <FadeIn>
            <div>
              <h2 className="font-serif text-2xl text-grey mb-6">{c.insideTitle}</h2>
              <ul className="space-y-3">
                {[c.inside1, c.inside2, c.inside3].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 shrink-0">&#10003;</span>
                    <span className="text-sm text-grey/80 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="font-serif text-2xl text-sage">{c.thankYou}</p>
                  <p className="mt-3 text-grey/60 font-light text-sm leading-relaxed">
                    {c.thankYouSub}
                  </p>
                  <div className="mt-6">
                    <a
                      href="/downloads/bedrijfskennis-audit.pdf"
                      download
                      className="inline-block bg-sage text-white py-3 px-6 rounded-lg hover:bg-sage-dark transition-colors font-medium text-center text-sm"
                    >
                      {c.downloadBtn}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-xl text-grey mb-1">{c.gateTitle}</h2>
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
