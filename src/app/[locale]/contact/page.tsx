"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";

const translations = {
  nl: {
    heroTitle: "Laten we praten",
    heroSub: "Over wat AI voor jouw organisatie",
    heroSub2: "kan betekenen.",
    calTitle: "Plan direct een gesprek",
    calMeta: "30 minuten · Vrijblijvend · Online",
    calPlaceholder: "Kalender-integratie",
    calSub: "Cal.com / Calendly embed wordt hier geplaatst",
    calFallback: "Open de agenda in een nieuw tabblad",
    formTitle: "Of stuur een bericht",
    thankYou: "Bedankt!",
    thankYouSub: "We nemen zo snel mogelijk contact op.",
    nameLabel: "Naam",
    emailLabel: "Email",
    companyLabel: "Bedrijf",
    messageLabel: "Bericht",
    messageOptional: "(optioneel)",
    submit: "Verzenden",
    submitting: "Verzenden...",
    errorMsg: "Er ging iets mis. Probeer het opnieuw of mail info@gonativ.nl.",
    orEmail: "Of mail ons direct:",
    addressTitle: "Bezoekadres",
    directions: "Route plannen",
  },
  en: {
    heroTitle: "Let\u2019s talk",
    heroSub: "About what AI can do",
    heroSub2: "for your organisation.",
    calTitle: "Book a call directly",
    calMeta: "30 minutes · No obligation · Online",
    calPlaceholder: "Calendar integration",
    calSub: "Cal.com / Calendly embed will be placed here",
    calFallback: "Open the calendar in a new tab",
    formTitle: "Or send a message",
    thankYou: "Thank you!",
    thankYouSub: "We\u2019ll get back to you as soon as possible.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    messageLabel: "Message",
    messageOptional: "(optional)",
    submit: "Send",
    submitting: "Sending...",
    errorMsg: "Something went wrong. Please try again or email info@gonativ.nl.",
    orEmail: "Or email us directly:",
    addressTitle: "Visiting address",
    directions: "Get directions",
  },
};

// Geen kaart-embed: die brengt een cookie-muur mee. Een gewone link volstaat.
const MAPS_URL = "https://maps.google.com/?q=Jacob+Bontiusplaats+9,+1018+LL+Amsterdam";
// Eén agenda-URL voor de embed én de tekstlink eronder (D8): wie de embed
// weigert (cookie-muur, beslisblad-review 12 juli F03) komt via de link op
// dezelfde agenda uit.
const CALENDAR_URL = "https://calendly.com/jorus-nativ";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-cream/50 text-grey focus:border-grey transition";
const labelClass = "block text-sm text-muted mb-1.5";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [calLoaded, setCalLoaded] = useState(false);
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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError(c.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* D8 (KAN-425): twee kolommen op één scherm. Drie rastercellen in plaats
          van twee, zodat de leesvolgorde van 8 september (H1, agenda, formulier)
          op mobiel en voor schermlezers blijft staan: links boven H1, intro,
          bezoekadres en mailadres; rechts, over beide rijen, de agenda; links
          onder het formulier. */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <FadeIn className="md:col-span-5">
            <h1 className="font-serif text-grey">{c.heroTitle}</h1>
            <p className="mt-6 text-grey leading-relaxed">
              {c.heroSub}{" "}
              <br className="hidden md:block" />
              {c.heroSub2}
            </p>

            {/* Bezoekadres (A4, KAN-425): The Stack, Brain-feit 01-identity.hq-address. */}
            <div className="mt-8">
              <Kicker>{c.addressTitle}</Kicker>
              <address className="not-italic text-grey" translate="no">
                The Stack
                <br />
                Jacob Bontiusplaats 9
                <br />
                1018 LL Amsterdam
              </address>
              <Button
                variant="tertiary"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                {c.directions}
              </Button>
            </div>

            <p className="mt-4 text-grey">
              {c.orEmail}{" "}
              <a
                href="mailto:info@gonativ.nl"
                className="underline underline-offset-4 decoration-1 decoration-sage-dark hover:decoration-grey"
              >
                info@gonativ.nl
              </a>
            </p>
          </FadeIn>

          <FadeIn delay={100} className="md:col-span-7 md:row-span-2">
            <h2 className="font-serif text-grey">{c.calTitle}</h2>
            <p className="mt-2 text-sm text-muted">{c.calMeta}</p>
            <div
              className="mt-6 rounded-lg overflow-hidden border border-border bg-white"
              style={{ minHeight: 580 }}
            >
              {!calLoaded && (
                <div className="bg-cream h-[580px] flex items-center justify-center text-muted text-sm">
                  <p>Kalender laden...</p>
                </div>
              )}
              <iframe
                src={CALENDAR_URL}
                width="100%"
                height="580"
                frameBorder="0"
                title="Plan een gesprek"
                onLoad={() => setCalLoaded(true)}
                style={{ display: calLoaded ? 'block' : 'none' }}
              />
            </div>
            <Button
              variant="tertiary"
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              {c.calFallback}
            </Button>
          </FadeIn>

          <FadeIn delay={200} className="md:col-span-5 md:col-start-1">
            <h2 className="font-serif text-grey">{c.formTitle}</h2>
            <Card className="mt-6">
              {submitted ? (
                <div className="flex items-center justify-center h-80 text-center">
                  <div>
                    <p className="text-sage-dark text-lg font-serif">{c.thankYou}</p>
                    <p className="mt-2 text-muted text-sm">{c.thankYouSub}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Velden twee-aan-twee naast elkaar (D8: naast elkaar, niet
                      onder elkaar), zodat het formulier de agendahoogte haalt. */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>{c.nameLabel}</label>
                      <input type="text" id="name" name="name" required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>{c.emailLabel}</label>
                      <input type="email" id="email" name="email" required className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className={labelClass}>{c.companyLabel}</label>
                      <input type="text" id="company" name="company" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        {c.messageLabel} <span className="text-muted">{c.messageOptional}</span>
                      </label>
                      <textarea id="message" name="message" rows={2} className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                  {error && <p className="text-error text-sm">{error}</p>}
                  <Button full type="submit" disabled={loading}>
                    {loading ? c.submitting : c.submit}
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
