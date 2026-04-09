"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  en: {
    // Hero / Cover
    logo: "Nativ",
    heroTitle: "Context Engineering:",
    heroTitle2: "The Missing Infrastructure Layer for Enterprise AI",
    heroSub:
      "Why 80% of enterprise AI projects fail — and how capturing what your people know changes the equation.",
    meta: "A White Paper by Nativ · April 2026",

    // Executive Summary
    execTitle: "Executive Summary",
    execP1:
      "Enterprise AI is failing at scale. Despite $684 billion in global AI investment in 2025, over 80% of projects failed to deliver business value. MIT Sloan reports that 95% of generative AI pilots never reach production. The dominant narrative blames model limitations — but the evidence tells a different story.",
    execBold: "The root cause is not inadequate models. It is inadequate context.",
    execP2:
      "Eighty percent of organizational knowledge is tacit — it lives in people's heads, not in documents. Current AI systems can only retrieve what has been written down, leaving the vast majority of business intelligence invisible to AI agents.",
    execP3:
      'This white paper introduces Nativ\'s Minimum Viable Context™ (MVC™) framework: a structured, research-grounded methodology for identifying, capturing, and operationalizing the organizational knowledge that AI agents need to perform reliably.',

    // Stats
    stat1Num: "80.3%",
    stat1Label: "of enterprise AI projects fail to deliver value",
    stat1Source: "RAND Corporation, 2025",
    stat2Num: "95%",
    stat2Label: "of GenAI pilots fail to scale to production",
    stat2Source: "MIT Sloan, 2025",
    stat3Num: "97%",
    stat3Label: "of enterprises cannot scale AI agents beyond pilots",
    stat3Source: "IDC, 900+ enterprises",
    stat4Num: "70%",
    stat4Label: "of AI agent tasks fail in multi-step scenarios",
    stat4Source: "CMU & Salesforce, 2025",

    // Section 1
    s1Title: "1. The Problem: Why Enterprise AI Fails",
    s1_1Title: "1.1 The Scale of Failure",
    s1_1P:
      "The average cost of an abandoned enterprise AI initiative is $7.2 million. Companies are not failing because they chose the wrong model. They are failing because their AI systems lack the knowledge infrastructure to operate effectively within their specific organizational context.",
    s1_2Title: "1.2 The Root Cause: Missing Organizational Context",
    s1_2P:
      'Michael Polanyi articulated the fundamental challenge in 1966: "We can know more than we can tell." Organizational knowledge exists on a spectrum from explicit (documented) to tacit (experiential, intuitive). The critical insight is that tacit knowledge constitutes the majority of organizational intelligence.',
    s1_3Title: "1.3 The Context Gap in Current AI Architectures",
    s1_3P1:
      "RAG has emerged as the standard approach for grounding AI agents in organizational knowledge. Google's ICLR 2025 study confirms that context quality is the primary driver of accuracy, outweighing model quality in most enterprise scenarios.",
    s1_3P2:
      "However, RAG architectures inherit a critical limitation: they can only retrieve what exists in the knowledge base. The most sophisticated vector search cannot find knowledge that isn't there.",

    // Section 2 preview
    s2Title: "2. Literature Review: From Tacit Knowledge to Context Engineering",
    s2Quote:
      '"Prompts are short task descriptions for everyday LLM use, while context engineering involves meticulously curating information to optimize performance in industrial-strength applications."',
    s2QuoteCite: "— Andrej Karpathy, 2025",

    // Section 3 preview
    s3Title: "3. The Nativ MVC Framework™: Minimum Viable Context™",
    s3P:
      "Just as a Minimum Viable Product defines the smallest product that delivers user value, Nativ's Minimum Viable Context™ defines the minimum organizational knowledge required for an AI agent to perform a given task reliably.",
    s3P2:
      "Ten categories of organizational knowledge collectively cover 80%+ of AI agent tasks in a typical B2B organization.",

    // Blocks preview
    blocks: [
      "Company Profile",
      "Products, Services & Pricing",
      "Client Profiles & Relationships",
      "Processes & Procedures",
      "Team & Role Allocation",
      "Templates & Tone of Voice",
      "Active Projects & Status",
      "Meeting History & Decisions",
      "Market & Competition",
      "Policies & Rules",
    ],
    blocksTotal: "Total investment: ~90 minutes of voice input across all stakeholders.",

    // Gate / CTA
    gateTitle: "Get the Full White Paper",
    gateSub:
      "The complete white paper includes the full literature review, detailed elicitation methodology, the Ring Model for context delivery, implementation roadmap, and all references.",
    gateNote: "Free · Delivered to your inbox as PDF",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    roleLabel: "Role",
    linkedinLabel: "LinkedIn URL",
    linkedinPlaceholder: "https://linkedin.com/in/...",
    submit: "Send me the white paper →",
    submitting: "Sending...",
    thankYou: "Check your inbox!",
    thankYouSub:
      "The full white paper is on its way to your email. If you don't see it within a few minutes, check your spam folder.",
    privacy: "We respect your privacy. No spam, ever.",

    // Footer
    footerCopy: "© 2026 Nativ B.V. All rights reserved.",
  },
  nl: {
    logo: "Nativ",
    heroTitle: "Context Engineering:",
    heroTitle2: "De Ontbrekende Infrastructuurlaag voor Enterprise AI",
    heroSub:
      "Waarom 80% van enterprise AI-projecten faalt — en hoe het vastleggen van kennis van je mensen het verschil maakt.",
    meta: "Een White Paper van Nativ · April 2026",

    execTitle: "Samenvatting",
    execP1:
      "Enterprise AI faalt op schaal. Ondanks $684 miljard aan wereldwijde AI-investeringen in 2025 leverde meer dan 80% van de projecten geen bedrijfswaarde. MIT Sloan rapporteert dat 95% van de generatieve AI-pilots nooit productie bereikt.",
    execBold: "De oorzaak is niet een ontoereikend model. Het is ontoereikende context.",
    execP2:
      "Tachtig procent van organisatiekennis is tacit — het zit in de hoofden van mensen, niet in documenten.",
    execP3:
      "Dit white paper introduceert Nativ's Minimum Viable Context™ (MVC™) framework: een gestructureerde methodologie voor het identificeren, vastleggen en operationaliseren van organisatiekennis die AI-agents nodig hebben.",

    stat1Num: "80,3%",
    stat1Label: "van enterprise AI-projecten levert geen waarde",
    stat1Source: "RAND Corporation, 2025",
    stat2Num: "95%",
    stat2Label: "van GenAI-pilots schaalt niet naar productie",
    stat2Source: "MIT Sloan, 2025",
    stat3Num: "97%",
    stat3Label: "van bedrijven kan AI-agents niet opschalen voorbij pilots",
    stat3Source: "IDC, 900+ bedrijven",
    stat4Num: "70%",
    stat4Label: "van AI-agenttaken faalt bij meerstaps-scenario's",
    stat4Source: "CMU & Salesforce, 2025",

    s1Title: "1. Het Probleem: Waarom Enterprise AI Faalt",
    s1_1Title: "1.1 De Schaal van Falen",
    s1_1P:
      "De gemiddelde kosten van een afgebroken enterprise AI-initiatief bedragen $7,2 miljoen. Bedrijven falen niet door het verkeerde model. Ze falen omdat hun AI-systemen de kennisinfrastructuur missen om effectief te functioneren.",
    s1_2Title: "1.2 De Grondoorzaak: Ontbrekende Organisatiecontext",
    s1_2P:
      'Michael Polanyi verwoordde de uitdaging in 1966: "We can know more than we can tell." Organisatiekennis bestaat op een spectrum van expliciet tot tacit. Tacit kennis vormt het merendeel van organisatie-intelligentie.',
    s1_3Title: "1.3 De Context Gap in Huidige AI-Architecturen",
    s1_3P1:
      "RAG is de standaard voor het gronden van AI-agents in organisatiekennis. Google's ICLR 2025-studie bevestigt dat contextkwaliteit de primaire driver is van nauwkeurigheid.",
    s1_3P2:
      "Maar RAG-architecturen erven een kritieke beperking: ze kunnen alleen ophalen wat in de kennisbank staat. De meest geavanceerde vectorsearch kan kennis die er niet is niet vinden.",

    s2Title: "2. Literatuuronderzoek: Van Tacit Kennis tot Context Engineering",
    s2Quote:
      '"Prompts zijn korte taakbeschrijvingen voor dagelijks LLM-gebruik, terwijl context engineering het zorgvuldig cureren van informatie inhoudt voor industriële toepassingen."',
    s2QuoteCite: "— Andrej Karpathy, 2025",

    s3Title: "3. Het Nativ MVC Framework™: Minimum Viable Context™",
    s3P:
      "Zoals een Minimum Viable Product het kleinste product definieert dat waarde levert, definieert Nativ's Minimum Viable Context™ de minimale organisatiekennis die een AI-agent nodig heeft.",
    s3P2:
      "Tien categorieën organisatiekennis dekken gezamenlijk 80%+ van AI-agenttaken in een typische B2B-organisatie.",

    blocks: [
      "Bedrijfsprofiel",
      "Producten, Diensten & Prijzen",
      "Klantprofielen & Relaties",
      "Processen & Procedures",
      "Team & Rolverdeling",
      "Templates & Tone of Voice",
      "Actieve Projecten & Status",
      "Vergaderhistorie & Beslissingen",
      "Markt & Concurrentie",
      "Beleid & Regels",
    ],
    blocksTotal: "Totale investering: ~90 minuten spraak-input verdeeld over alle stakeholders.",

    gateTitle: "Download het volledige White Paper",
    gateSub:
      "Het complete white paper bevat het volledige literatuuronderzoek, gedetailleerde elicitatiemethoden, het Ring Model voor contextlevering, implementatie-roadmap en alle referenties.",
    gateNote: "Gratis · Als PDF in je inbox",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    roleLabel: "Functie",
    linkedinLabel: "LinkedIn URL",
    linkedinPlaceholder: "https://linkedin.com/in/...",
    submit: "Stuur mij het white paper →",
    submitting: "Verzenden...",
    thankYou: "Check je inbox!",
    thankYouSub:
      "Het volledige white paper is onderweg naar je e-mail. Zie je het niet binnen een paar minuten? Check je spam-map.",
    privacy: "Wij respecteren je privacy. Geen spam, ooit.",

    footerCopy: "© 2026 Nativ B.V. Alle rechten voorbehouden.",
  },
};

const stats = (c: (typeof translations)["en"]) => [
  { num: c.stat1Num, label: c.stat1Label, source: c.stat1Source },
  { num: c.stat2Num, label: c.stat2Label, source: c.stat2Source },
  { num: c.stat3Num, label: c.stat3Label, source: c.stat3Source },
  { num: c.stat4Num, label: c.stat4Label, source: c.stat4Source },
];

export default function WhitepaperPage() {
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
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      linkedin: (form.elements.namedItem("linkedin") as HTMLInputElement).value,
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
      {/* Hero / Cover */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <p className="text-sage font-sans text-sm font-semibold tracking-[0.15em] uppercase mb-8">
              {c.logo}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-[52px] leading-[1.15] text-grey">
              {c.heroTitle}
              <br />
              {c.heroTitle2}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/60 italic leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-6 text-sm text-grey/50">{c.meta}</p>
          </FadeIn>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="px-6 pb-12">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl text-grey mb-6 pb-3 border-b-2 border-sage">
              {c.execTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-sage-light border-l-4 border-sage rounded-r-lg p-6 md:p-8 space-y-4">
              <p className="font-light leading-relaxed">{c.execP1}</p>
              <p className="font-semibold text-grey">{c.execBold}</p>
              <p className="font-light leading-relaxed">{c.execP2}</p>
              <p className="font-light leading-relaxed">{c.execP3}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 pb-12">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats(c).map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-5 text-center border border-sage-light"
                >
                  <span className="block text-2xl md:text-3xl font-bold text-sage-dark font-sans">
                    {s.num}
                  </span>
                  <span className="block text-xs text-grey/60 mt-1 leading-snug">{s.label}</span>
                  <span className="block text-[10px] text-grey/40 mt-1">{s.source}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 1 */}
      <section className="px-6 pb-12">
        <div className="max-w-[800px] mx-auto space-y-6">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl text-grey pb-3 border-b-2 border-sage">
              {c.s1Title}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <h3 className="font-sans text-lg font-semibold text-sage-dark">{c.s1_1Title}</h3>
            <p className="font-light leading-relaxed mt-2">{c.s1_1P}</p>
          </FadeIn>
          <FadeIn delay={200}>
            <h3 className="font-sans text-lg font-semibold text-sage-dark mt-6">{c.s1_2Title}</h3>
            <p className="font-light leading-relaxed mt-2">{c.s1_2P}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <h3 className="font-sans text-lg font-semibold text-sage-dark mt-6">{c.s1_3Title}</h3>
            <p className="font-light leading-relaxed mt-2">{c.s1_3P1}</p>
            <p className="font-light leading-relaxed mt-3">{c.s1_3P2}</p>
          </FadeIn>
        </div>
      </section>

      {/* Section 2 - Preview */}
      <section className="px-6 pb-12">
        <div className="max-w-[800px] mx-auto space-y-6">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl text-grey pb-3 border-b-2 border-sage">
              {c.s2Title}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <blockquote className="border-l-3 border-sage bg-white rounded-r-lg p-5 italic text-grey/80">
              <p>{c.s2Quote}</p>
              <cite className="block mt-3 not-italic text-sm text-grey/50 font-sans">
                {c.s2QuoteCite}
              </cite>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Section 3 - MVC Preview + Blocks */}
      <section className="px-6 pb-12">
        <div className="max-w-[800px] mx-auto space-y-6">
          <FadeIn>
            <h2 className="font-serif text-2xl md:text-3xl text-grey pb-3 border-b-2 border-sage">
              {c.s3Title}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-light leading-relaxed">{c.s3P}</p>
            <p className="font-light leading-relaxed mt-3">{c.s3P2}</p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {c.blocks.map((block, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 border border-sage-light flex items-start gap-3"
                >
                  <span className="text-sage font-sans text-sm font-bold mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-grey/80">{block}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-grey/50 mt-4 italic">{c.blocksTotal}</p>
          </FadeIn>
        </div>
      </section>

      {/* Lead Capture Gate */}
      <section className="px-6 pb-20 md:pb-28" id="download">
        <div className="max-w-[600px] mx-auto">
          <FadeIn>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📬</div>
                  <p className="font-serif text-2xl text-sage">{c.thankYou}</p>
                  <p className="mt-3 text-grey/60 font-light text-sm leading-relaxed">
                    {c.thankYouSub}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl md:text-3xl text-grey mb-2">
                    {c.gateTitle}
                  </h2>
                  <p className="text-grey/60 font-light text-sm leading-relaxed mb-1">
                    {c.gateSub}
                  </p>
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
                      <label htmlFor="linkedin" className="block text-sm text-grey/60 mb-1.5">
                        {c.linkedinLabel}
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        placeholder={c.linkedinPlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey placeholder:text-grey/30 focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
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
