"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import LastUpdated from "@/components/LastUpdated";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "AI die je kunt verantwoorden",
    heroSub:
      "Vanaf 2 augustus 2026 vraagt de EU AI Act om transparante, herleidbare AI. Met een Company Brain is dat geen extra last, maar de basis van hoe je AI werkt.",
    changeTitle: "Wat verandert er op 2 augustus 2026?",
    changeBody: [
      "Op 2 augustus 2026 wordt het grootste deel van de EU AI Act van kracht en begint de handhaving. De regels voor hoog-risico-systemen en de transparantie-eisen gaan gelden. In Nederland houdt de Autoriteit Persoonsgegevens toezicht.",
      "Voor de zwaarste categorie gelden de strengste eisen: automatische logging, technische documentatie en menselijk toezicht. Voor de meeste bedrijven draait het vooral om transparantie: laten zien dat je AI inzet, en kunnen navertellen hoe een uitkomst tot stand komt.",
      "Of jouw specifieke systeem hoog-risico is, hangt van het gebruik af. Maar één lijn loopt door de hele wet heen: je moet je AI kunnen verantwoorden.",
    ],
    asksTitle: "Wat de Act in de kern vraagt",
    asks: [
      {
        title: "Herleidbaarheid",
        desc: "Artikel 12 vraagt dat hoog-risico-systemen gebeurtenissen automatisch vastleggen, hun hele levensduur lang. De vraag 'hoe kwam dit tot stand?' moet te beantwoorden zijn.",
      },
      {
        title: "Documentatie",
        desc: "Artikel 11 vraagt technische documentatie die de werking van het systeem navolgbaar maakt. Niet één keer, maar bijgehouden.",
      },
      {
        title: "Transparantie",
        desc: "Artikel 13 en 50 vragen dat mensen weten dat ze met AI te maken hebben, en dat uitkomsten uitlegbaar zijn. Geen black box.",
      },
    ],
    gapTitle: "Waarom gewone AI hier vastloopt",
    gapBody: [
      "De meeste AI-tools zijn een black box. Je stelt een vraag, er komt een antwoord, maar waar dat antwoord vandaan komt, welke bron of welk beleid eronder ligt, blijft onzichtbaar. Precies dat maakt de Act lastig: je kunt niet aantonen wat je niet kunt navertellen.",
      "Een algemeen taalmodel weet niets van jouw bedrijf. Het vult gaten op met aannames. Dat is niet alleen een kwaliteitsprobleem, het is een herleidbaarheidsprobleem.",
    ],
    brainTitle: "Hoe een Company Brain je AI herleidbaar maakt",
    brainSub:
      "Een Company Brain is de gestructureerde, vastgelegde context waarop je AI werkt. Daardoor is herleidbaarheid geen bijzaak, maar ingebouwd.",
    brainPoints: [
      {
        title: "Herkomst per antwoord",
        desc: "Elk antwoord is terug te voeren op de bron in je Company Brain: het document, de afspraak of het beleid waaruit het komt.",
      },
      {
        title: "Vastgelegde, versiebeheerde context",
        desc: "De kennis waarop je AI leunt staat gedocumenteerd en onder versiebeheer. Je ziet wat er stond, en wanneer het veranderde.",
      },
      {
        title: "De mens in de lus",
        desc: "Uitkomsten zijn een concept dat een mens beoordeelt en goedkeurt, niet iets dat ongezien de deur uit gaat.",
      },
      {
        title: "Data blijft bij de bron",
        desc: "We werken op de uitkomsten en leggen daar een herleidbaarheidslaag overheen. Gevoelige data hoeft daarvoor niet te worden ingegoten.",
      },
    ],
    brainLink: "Lees meer over de Company Brain",
    disclaimerTitle: "Eerlijk over wat dit wel en niet is",
    disclaimerBody:
      "Dit is geen juridisch advies, en een Company Brain maakt je niet in één klap 'compliant'. Compliance vraagt ook beleid, processen en toezicht binnen je organisatie. Wat wij leveren is de herleidbaarheids- en transparantielaag: de techniek die het mogelijk maakt om te tonen hoe je AI tot een uitkomst komt. Dat is de basis waar de rest op rust.",
    ctaTitle: "Benieuwd hoe herleidbaar jullie AI nu is?",
    ctaSub:
      "Begin met de scan, of plan een gesprek. We laten zien hoe een Company Brain de herkomst van elk antwoord aantoonbaar maakt.",
    ctaPrimary: "Doe de scan",
    ctaSecondary: "Plan een gesprek",
  },
  en: {
    heroTitle: "AI you can account for",
    heroSub:
      "From 2 August 2026 the EU AI Act asks for transparent, traceable AI. With a Company Brain that is not an extra burden, but the basis of how your AI works.",
    changeTitle: "What changes on 2 August 2026?",
    changeBody: [
      "On 2 August 2026 the majority of the EU AI Act applies and enforcement begins. The rules for high-risk systems and the transparency obligations take effect. In the Netherlands the Dutch Data Protection Authority supervises.",
      "The heaviest category faces the strictest requirements: automatic logging, technical documentation and human oversight. For most companies it mainly comes down to transparency: showing that you use AI, and being able to explain how an outcome came about.",
      "Whether your specific system is high-risk depends on its use. But one line runs through the whole law: you have to be able to account for your AI.",
    ],
    asksTitle: "What the Act asks at its core",
    asks: [
      {
        title: "Traceability",
        desc: "Article 12 requires high-risk systems to log events automatically, throughout their entire lifetime. The question 'how did this come about?' must be answerable.",
      },
      {
        title: "Documentation",
        desc: "Article 11 requires technical documentation that keeps the system's workings followable. Not once, but maintained.",
      },
      {
        title: "Transparency",
        desc: "Articles 13 and 50 require that people know they are dealing with AI, and that outcomes are explainable. No black box.",
      },
    ],
    gapTitle: "Why ordinary AI runs aground here",
    gapBody: [
      "Most AI tools are a black box. You ask a question, an answer appears, but where that answer comes from, which source or policy sits underneath it, stays invisible. That is exactly what makes the Act hard: you cannot prove what you cannot retrace.",
      "A general language model knows nothing about your company. It fills gaps with assumptions. That is not just a quality problem, it is a traceability problem.",
    ],
    brainTitle: "How a Company Brain makes your AI traceable",
    brainSub:
      "A Company Brain is the structured, recorded context your AI works on. That makes traceability not a side issue, but built in.",
    brainPoints: [
      {
        title: "Origin per answer",
        desc: "Every answer traces back to the source in your Company Brain: the document, the agreement or the policy it comes from.",
      },
      {
        title: "Recorded, version-controlled context",
        desc: "The knowledge your AI leans on is documented and under version control. You see what it said, and when it changed.",
      },
      {
        title: "The human in the loop",
        desc: "Outcomes are a draft that a person reviews and approves, not something that goes out unseen.",
      },
      {
        title: "Data stays at the source",
        desc: "We work on the outcomes and lay a traceability layer over them. Sensitive data does not need to be poured in for that.",
      },
    ],
    brainLink: "Read more about the Company Brain",
    disclaimerTitle: "Honest about what this is and isn't",
    disclaimerBody:
      "This is not legal advice, and a Company Brain does not make you 'compliant' in one click. Compliance also requires policy, processes and oversight within your organisation. What we deliver is the traceability and transparency layer: the technology that makes it possible to show how your AI reaches an outcome. That is the basis the rest rests on.",
    ctaTitle: "Curious how traceable your AI is today?",
    ctaSub:
      "Start with the scan, or plan a conversation. We show how a Company Brain makes the origin of every answer provable.",
    ctaPrimary: "Take the scan",
    ctaSecondary: "Plan a conversation",
  },
};

export default function AiActPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-wider text-sage mb-4">EU AI Act</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-6 flex justify-center">
              <LastUpdated />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wat verandert er */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.changeTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5">
              {c.changeBody.map((p, i) => (
                <p key={i} className="text-grey/70 font-light leading-relaxed text-lg">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wat de Act vraagt */}
      <section className="py-12 md:py-16 px-6 bg-surface">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.asksTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-10 space-y-8">
              {c.asks.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
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

      {/* Waarom gewone AI vastloopt */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.gapTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5">
              {c.gapBody.map((p, i) => (
                <p key={i} className="text-grey/70 font-light leading-relaxed text-lg">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Company Brain */}
      <section className="py-12 md:py-16 px-6 bg-surface">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.brainTitle}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">{c.brainSub}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-10 space-y-8">
              {c.brainPoints.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
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
          <FadeIn delay={200}>
            <p className="mt-8">
              <Link href="/company-brain" className="text-sage hover:underline">
                {c.brainLink} →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Eerlijke disclaimer */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <div className="border border-sage/30 rounded-lg p-6 md:p-8 bg-sage/5">
              <h3 className="font-serif text-xl">{c.disclaimerTitle}</h3>
              <p className="mt-3 text-grey/70 font-light leading-relaxed">{c.disclaimerBody}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-6 bg-surface">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.ctaTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">{c.ctaSub}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scan"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                {c.ctaPrimary}
              </Link>
              <Link
                href="/contact"
                className="border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors inline-block"
              >
                {c.ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
