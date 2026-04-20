"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Laten we praten",
    heroSub: "Geen verkooppraatje. Gewoon een eerlijk gesprek over wat AI",
    heroSub2: "voor jouw organisatie kan betekenen.",
    calTitle: "Plan direct een gesprek",
    calMeta: "30 minuten · Vrijblijvend · Online",
    calPlaceholder: "Kalender-integratie",
    calSub: "Cal.com / Calendly embed wordt hier geplaatst",
    formTitle: "Of stuur een bericht",
    thankYou: "Bedankt!",
    thankYouSub: "We nemen zo snel mogelijk contact op.",
    nameLabel: "Naam",
    emailLabel: "Email",
    companyLabel: "Bedrijf",
    messageLabel: "Bericht",
    messageOptional: "(optioneel)",
    submit: "Verzenden",
    orEmail: "Of mail ons direct:",
  },
  en: {
    heroTitle: "Let\u2019s talk",
    heroSub: "No sales pitch. Just an honest conversation about what AI",
    heroSub2: "can do for your organisation.",
    calTitle: "Book a call directly",
    calMeta: "30 minutes · No obligation · Online",
    calPlaceholder: "Calendar integration",
    calSub: "Cal.com / Calendly embed will be placed here",
    formTitle: "Or send a message",
    thankYou: "Thank you!",
    thankYouSub: "We\u2019ll get back to you as soon as possible.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    messageLabel: "Message",
    messageOptional: "(optional)",
    submit: "Send",
    orEmail: "Or email us directly:",
  },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [calLoaded, setCalLoaded] = useState(false);
  const { t } = useLanguage();
  const c = t(translations);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              {c.heroSub}
              <br className="hidden md:block" />
              {c.heroSub2}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Two-column */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <FadeIn>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full">
              <h2 className="font-serif text-2xl mb-4">{c.calTitle}</h2>
              <p className="text-grey/60 font-light text-sm mb-6">{c.calMeta}</p>
              <div className="rounded-lg overflow-hidden" style={{ minHeight: 580 }}>
                {!calLoaded && (
                  <div className="bg-cream h-[580px] flex items-center justify-center text-grey/40 text-sm">
                    <p>Kalender laden...</p>
                  </div>
                )}
                <iframe
                  src="https://calendly.com/jorus-nativ/30min"
                  width="100%"
                  height="580"
                  frameBorder="0"
                  title="Plan een gesprek"
                  onLoad={() => setCalLoaded(true)}
                  style={{ display: calLoaded ? 'block' : 'none' }}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full">
              <h2 className="font-serif text-2xl mb-6">{c.formTitle}</h2>
              {submitted ? (
                <div className="flex items-center justify-center h-80 text-center">
                  <div>
                    <p className="text-sage text-lg font-serif">{c.thankYou}</p>
                    <p className="mt-2 text-grey/60 font-light text-sm">{c.thankYouSub}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-grey/60 mb-1.5">{c.nameLabel}</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-grey/60 mb-1.5">{c.emailLabel}</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm text-grey/60 mb-1.5">{c.companyLabel}</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-grey/60 mb-1.5">
                      {c.messageLabel} <span className="text-grey/30">{c.messageOptional}</span>
                    </label>
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-sage text-white py-3.5 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer">
                    {c.submit}
                  </button>
                </form>
              )}
              <p className="mt-6 text-sm text-grey/40 text-center">
                {c.orEmail}{" "}
                <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">info@gonativ.nl</a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
