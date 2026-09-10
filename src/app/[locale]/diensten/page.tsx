"use client";

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Van inzicht naar impact",
    heroSub1: "Drie stappen. Van gratis scan tot werkende workflows.",
    heroSub2: "Elk op je eigen tempo.",
    layers: [
      {
        step: "Stap 1", title: "Scan",
        lead: "We scannen waar AI de meeste waarde creëert in jouw organisatie.",
        body: "Je weet dat AI belangrijk is. Maar waar begin je? Onze gratis AI-scan brengt in kaart welk werk zich leent voor AI. Geen vage beloftes: concreet werk, op volgorde van wat het meeste oplevert.",
        features: ["In je eentje in ongeveer 20 minuten", "Of compleet met je team, afdeling voor afdeling", "Een deelbaar rapport met één klein startpunt"],
        meta: "Gratis | ± 20 minuten in je eentje | Geen verplichting",
        whatLabel: "Wat je krijgt",
        cta: "Start met een Scan", ctaLink: "/scan", primary: true,
        moreLink: null,
      },
      {
        step: "Stap 2", title: "Build",
        lead: "Wij bouwen je Company Brain, de context die AI écht nuttig maakt.",
        body: "AI-tools zijn krachtig. Maar zonder de juiste context zijn ze nutteloos. Wij structureren de kennis die in jouw organisatie leeft (in hoofden, systemen, processen) tot een levende Company Brain die jouw bedrijf kent.\n\nElk feit erin heeft een eigenaar en een verversingsdatum. Daardoor is het geen eenmalige snapshot, maar een systeem dat meegroeit met je organisatie.\n\nDit is het fundament. Zonder deze stap is elke AI-investering een gok.",
        features: ["Gestructureerde bedrijfskennis, toegankelijk voor AI", "Toegankelijk voor iedereen in het bedrijf", "Elk feit met een eigenaar en een verversingsdatum", "Integratie met bestaande systemen", "Continue updates: een levend systeem, geen eenmalige snapshot"],
        meta: "Je Brain staat klaar zodra je tekent",
        whatLabel: "Wat je krijgt",
        cta: "Meer weten", ctaLink: "/contact", primary: false,
        moreLink: { label: "Meer over de Company Brain", href: "/company-brain" },
      },
      {
        step: "Stap 3", title: "Deploy",
        lead: "We zetten workflows in die echt werk leveren.",
        body: "Geen chatbot die \"ik weet het niet\" zegt. Workflows die putten uit de kennis van jouw bedrijf. Ze nemen terugkerend werk over, beantwoorden vragen en versnellen processen, met de volledige context uit je Company Brain.",
        features: ["Workflows op maat, gevoed door jouw kennisbank", "Model-onafhankelijk: altijd de beste technologie", "Integratie met je bestaande systemen", "Meetbare resultaten"],
        meta: "Doorlooptijd: doorlopend | Op maat",
        whatLabel: "Wat je krijgt",
        cta: "Plan een gesprek", ctaLink: "/contact", primary: false,
        moreLink: { label: "Ontdek onze AI-workflows", href: "/workflows" },
      },
    ],
    whyTitle: "Waarom deze volgorde?",
    whyP1a: "De meeste AI-projecten falen niet door slechte technologie.",
    whyP1b: "Ze falen omdat de basis ontbreekt.",
    // De formule "Scan. Build. Deploy." als drie kickers met een pijl-icoon ertussen (D3).
    whySteps: ["Scan", "Build", "Deploy"],
    whyP2: "Elke stap bouwt voort op de vorige.\nJe kunt bij stap 1 instappen en op elk moment stoppen.\nGeen lock-in. Geen verplichtingen.",
  },
  en: {
    heroTitle: "From insight to impact",
    heroSub1: "Three steps. From free scan to working workflows.",
    heroSub2: "Each at your own pace.",
    layers: [
      {
        step: "Step 1", title: "Scan",
        lead: "We identify where AI creates the most value in your organisation.",
        body: "You know AI matters. But where do you start? Our free AI scan maps out which work lends itself to AI. No vague promises: concrete work, ordered by what delivers most.",
        features: ["On your own in about 20 minutes", "Or complete with your team, department by department", "A shareable report with one small starting point"],
        meta: "Free | ± 20 minutes on your own | No obligation",
        whatLabel: "What you get",
        cta: "Start with a Scan", ctaLink: "/scan", primary: true,
        moreLink: null,
      },
      {
        step: "Step 2", title: "Build",
        lead: "We build your Company Brain, the context that makes AI actually useful.",
        body: "AI tools are powerful. But without the right context they\u2019re useless. We structure the knowledge that lives in your organisation (in heads, systems, processes) into a living Company Brain that AI understands.\n\nEvery fact in it has an owner and a refresh date. That\u2019s what makes it a living system, not a one-time snapshot.\n\nThis is the foundation. Without this step, every AI investment is a gamble.",
        features: ["Structured company knowledge, accessible to AI", "Accessible to everyone in the company", "Every fact with an owner and a refresh date", "Integration with existing systems", "Continuous updates: a living system, not a one-time snapshot"],
        meta: "Your Brain is live the moment you sign",
        whatLabel: "What you get",
        cta: "Learn more", ctaLink: "/contact", primary: false,
        // /company-brain has no language support (hardcoded Dutch, no useLanguage),
        // so the English link stays on the bilingual homepage. The Dutch link above
        // does point at /company-brain, where the internal-link value actually lands.
        moreLink: { label: "More about the Company Brain", href: "/" },
      },
      {
        step: "Step 3", title: "Deploy",
        lead: "We deploy workflows that actually get work done.",
        body: "No chatbot that says \"I don\u2019t know\". Workflows that draw on the knowledge of your company. They take over recurring work, answer questions and accelerate processes, with the full context from your Company Brain.",
        features: ["Custom workflows, powered by your knowledge base", "Model-agnostic: always the best technology", "Integration with your existing systems", "Measurable results"],
        meta: "Timeline: ongoing | Custom",
        whatLabel: "What you get",
        cta: "Book a call", ctaLink: "/contact", primary: false,
        moreLink: { label: "Discover our AI workflows", href: "/workflows" },
      },
    ],
    whyTitle: "Why this order?",
    whyP1a: "Most AI projects don\u2019t fail because of bad technology.",
    whyP1b: "They fail because the foundation is missing.",
    whySteps: ["Scan", "Build", "Deploy"],
    whyP2: "Each step builds on the previous one.\nYou can start at step 1 and stop at any time.\nNo lock-in. No obligations.",
  },
};

export default function DienstenPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero: H1 links, de twee subregels ernaast (B1, B4) */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:items-end">
          <FadeIn className="md:col-span-7">
            <h1 className="font-serif text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={150} className="md:col-span-5">
            <p className="text-lg md:text-xl text-grey leading-relaxed">
              {c.heroSub1}
              <br />
              {c.heroSub2}
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* D3: per stap twee kolommen, links de tekst, rechts de kaart "Wat je krijgt";
          stappen gescheiden door een 1px lijn, niet door bandwissels */}
      <Section>
        <div className="divide-y divide-border">
          {c.layers.map((layer) => (
            <div
              key={layer.step}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 md:py-12 first:pt-0 last:pb-0"
            >
              <FadeIn className="md:col-span-6">
                <Kicker>{layer.step}</Kicker>
                <h2 className="font-serif text-grey">{layer.title}</h2>
                <p className="mt-4 font-serif text-xl italic text-grey leading-relaxed">{layer.lead}</p>
                <div className="mt-6 max-w-[640px] space-y-4 text-grey leading-relaxed">
                  {layer.body.split("\n\n").map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={150} className="md:col-span-6">
                <Card signature>
                  <Kicker>{layer.whatLabel}</Kicker>
                  <ul className="space-y-2">
                    {layer.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-grey">
                        <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted">{layer.meta}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Button variant={layer.primary ? "primary" : "secondary"} href={layer.ctaLink}>
                      {layer.cta}
                    </Button>
                    {layer.moreLink && (
                      <Button variant="tertiary" href={layer.moreLink.href}>
                        {layer.moreLink.label}
                      </Button>
                    )}
                  </div>
                </Card>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      {/* Slotsectie in één rij: H2 links, de korte regels rechts; de ene band van de pagina */}
      <Section band="sand">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <FadeIn className="md:col-span-5">
            <h2 className="font-serif text-grey">{c.whyTitle}</h2>
          </FadeIn>
          <FadeIn delay={150} className="md:col-span-7">
            <p className="text-lg text-grey leading-relaxed">
              {c.whyP1a}
              <br />
              {c.whyP1b}
            </p>
            {/* Scan, Build, Deploy als drie kickers met een ArrowRight-icoon ertussen;
                de kicker staat hier niet boven een kop, dus zonder zijn 12px eronder */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {c.whySteps.map((s, i) => (
                <Fragment key={s}>
                  {i > 0 && (
                    <ArrowRight size={20} strokeWidth={1.5} className="shrink-0 text-sage-dark" aria-hidden="true" />
                  )}
                  <Kicker className="mb-0!">{s}</Kicker>
                </Fragment>
              ))}
            </div>
            <div className="mt-6 text-lg text-grey leading-relaxed">
              {c.whyP2.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
