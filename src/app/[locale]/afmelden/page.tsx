"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";

// Eén veld, geen reden, geen inlog: de wet vraagt een gratis en eenvoudige
// afmelding per mail. Instantly kan zelf geen afmeldlink in de mailtekst zetten
// (getest 07-09-2026), dus de mail linkt hierheen.
const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-cream/50 text-grey focus:border-grey transition";

export default function AfmeldenPage() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/afmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("afmelden mislukt");
      setDone(true);
    } catch {
      setError("Er ging iets mis. Mail info@gonativ.nl, dan melden we je met de hand af.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section hero>
      <FadeIn className="max-w-xl">
        <h1 className="font-serif text-grey">Afmelden</h1>
        <Card className="mt-8">
          {done ? (
            <div>
              <h2 className="font-serif text-grey">Je bent afgemeld</h2>
              <p className="mt-3 text-grey leading-relaxed">
                Je krijgt geen mail meer van ons.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-grey leading-relaxed">
                Vul je mailadres in. Daarna krijg je geen mail meer van ons.
              </p>
              <div>
                <label htmlFor="email" className="block text-sm text-muted mb-1.5">
                  Mailadres
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
              {error && <p className="text-error text-sm">{error}</p>}
              <Button full type="submit" disabled={loading}>
                {loading ? "Bezig..." : "Afmelden"}
              </Button>
            </form>
          )}
        </Card>
      </FadeIn>
    </Section>
  );
}
