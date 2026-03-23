"use client";

import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Security & Privacy",
    heroSub: "Jouw data is van jou. Wij passen erop.",
    principlesTitle: "Onze principes",
    principles: [
      { title: "EU Data Hosting", desc: "Al onze data wordt opgeslagen en verwerkt binnen de Europese Unie. Geen uitzonderingen." },
      { title: "GDPR Compliant", desc: "We voldoen volledig aan de AVG/GDPR. Je hebt altijd controle over je data — inzage, correctie en verwijdering op verzoek." },
      { title: "Encryptie", desc: "Data wordt versleuteld in transit (TLS 1.3) en at rest (AES-256). Geen concessies." },
      { title: "Geen doorverkoop", desc: "Jouw bedrijfsdata wordt nooit gebruikt om AI-modellen te trainen of doorverkocht aan derden. Nooit." },
      { title: "Toegangscontrole", desc: "Strikte toegangscontrole op basis van need-to-know. Alleen geautoriseerde teamleden hebben toegang tot klantdata." },
      { title: "Transparantie", desc: "We zijn altijd open over hoe we data verwerken. Vraag het ons — we leggen het uit." },
    ],
    trustTitle: "Vertrouwd door",
    questionTitle: "Vragen over security?",
    questionSub: "We beantwoorden graag al je vragen over hoe we met data omgaan.",
  },
  en: {
    heroTitle: "Security & Privacy",
    heroSub: "Your data is yours. We guard it.",
    principlesTitle: "Our principles",
    principles: [
      { title: "EU Data Hosting", desc: "All our data is stored and processed within the European Union. No exceptions." },
      { title: "GDPR Compliant", desc: "We fully comply with GDPR. You always have control over your data — access, correction and deletion on request." },
      { title: "Encryption", desc: "Data is encrypted in transit (TLS 1.3) and at rest (AES-256). No compromises." },
      { title: "No resale", desc: "Your company data is never used to train AI models or sold to third parties. Ever." },
      { title: "Access control", desc: "Strict access control on a need-to-know basis. Only authorised team members have access to client data." },
      { title: "Transparency", desc: "We are always open about how we process data. Ask us — we\u2019ll explain." },
    ],
    trustTitle: "Trusted by",
    questionTitle: "Questions about security?",
    questionSub: "We\u2019re happy to answer all your questions about how we handle data.",
  },
};

export default function SecurityPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">{c.heroSub}</p>
          </FadeIn>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.principlesTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-10 space-y-8">
              {c.principles.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mt-0.5" aria-hidden="true">
                    <span className="text-sage text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    <p className="mt-1 text-grey/70 font-light leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-10">{c.trustTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-grey/40">
              <div className="text-center"><span className="text-3xl">🇪🇺</span><p className="text-xs mt-1">EU Data</p></div>
              <div className="text-center"><span className="text-3xl">🔒</span><p className="text-xs mt-1">GDPR</p></div>
              <div className="text-center"><span className="text-3xl">🛡️</span><p className="text-xs mt-1">TLS 1.3</p></div>
              <div className="text-center"><span className="text-3xl">🔐</span><p className="text-xs mt-1">AES-256</p></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.questionTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">{c.questionSub}</p>
            <p className="mt-4">
              <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">info@gonativ.nl</a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
