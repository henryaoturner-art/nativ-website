"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Praktische hulp bij één klus tegelijk",
    heroSub:
      "Een workflow neemt één terugkerende klus van je over, van begin tot eind. Hij werkt vanuit je Company Brain, dus hij kent jullie manier van werken. Je begint met één, en je breidt uit waar het werkt.",

    whatTitle: "Wat een workflow is",
    whatBody: [
      "Neem het maandrapport. Iemand haalt de cijfers uit het boekhoudpakket, zet ze in hetzelfde format als vorige maand, zoekt uit waarom die ene post afwijkt, en schrijft er een toelichting bij. Elke maand opnieuw, elke maand dezelfde stappen.",
      "Dat is een workflow: een klus met een vast begin, vaste stappen en een duidelijk eindresultaat. Precies het soort werk waar AI goed in is, en precies het soort werk waar bij jullie de meeste tijd in gaat zitten.",
      "Het verschil met een los AI-tool is de context. Een workflow put uit je Company Brain, dus hij weet hoe jullie het rapport opmaken, welke posten er altijd in horen en wat jullie normaal vinden. Je hoeft het niet elke keer opnieuw uit te leggen.",
    ],

    examplesTitle: "Waar het meestal over gaat",
    examplesIntro:
      "Dit zijn voorbeelden van het soort werk dat zich leent voor een workflow, niet een catalogus waar je uit bestelt. Welke bij jullie zinnig zijn, hangt af van waar bij jullie de tijd in gaat zitten.",
    examples: [
      {
        area: "Marketing",
        body: "Research doen, ideeën aandragen, teksten schrijven, beeld maken, de SEO nalopen, inplannen en achteraf meten wat het deed. In jullie eigen toon, omdat die in de Company Brain zit.",
      },
      {
        area: "Sales",
        body: "Profielen opbouwen van prospects en accounts, gesprekken voorbereiden, kansen bij bestaande klanten opmerken, binnenkomende leads sorteren, en outreach en offertes opstellen in jullie stem.",
      },
      {
        area: "Finance",
        body: "Cijfers uitlezen uit je boekhouding, maandrapportages maken die over locaties en periodes vergelijkbaar zijn, afwijkingen terugvoeren tot op de bron, en business cases in één vaste structuur zetten.",
      },
      {
        area: "HR en kantoor",
        body: "Vragen van medewerkers beantwoorden vanuit wat er echt is vastgelegd, en het terugkerende regelwerk rond in- en uitdienst, verlof en documenten.",
      },
    ],
    examplesNote:
      "Werkt jouw bedrijf niet met deze afdelingen? Dat geeft niets. De scan werkt met de indeling die jullie zelf hanteren.",

    controlTitle: "Jij houdt de regie",
    controlBody: [
      "Een workflow werkt niet buiten je om. Je ziet wat er gemaakt wordt voordat het gebruikt wordt, en jij bepaalt wat er uitgaat.",
      "We beginnen bewust met werk waarvan je het resultaat meteen kunt beoordelen. Zo zie je binnen een week of het klopt, in plaats van dat je het moet geloven. Bevalt het, dan breid je uit.",
    ],

    chatgptTitle: "Waarom niet gewoon ChatGPT?",
    chatgptBody: [
      "Een project in ChatGPT of Copilot is één grote verzamelbak. Niemand weet precies wie wat erin heeft gegooid, of het klopt, hoe het wordt onderhouden, of wie wat mag zien. Voor een bedrijf is dat ongeschikt.",
      "De Company Brain is het tegenovergestelde. Elk gegeven heeft een herkomst, een eigenaar, onderhoud en rechten. Je weet wat erin zit, of het klopt, en wie het ziet. Daar draaien de workflows op.",
    ],

    faqTitle: "Veelgestelde vragen",
    faq: [
      {
        q: "Hoe weet ik welke workflows bij ons passen?",
        a: "Daar is de gratis scan voor. Die brengt in kaart waar bij jullie veel tijd en herhaling in zit, en zet op volgorde waar AI het meeste oplevert. Je hoeft dat dus niet vooraf te weten.",
      },
      {
        q: "Moeten we eerst een Company Brain hebben?",
        a: "Ja. De Company Brain is waar de workflows uit putten: jullie manier van werken, afspraken en toon. Zonder die context krijg je algemene antwoorden in plaats van werk dat bij jullie past.",
      },
      {
        q: "Hoeveel workflows beginnen we mee?",
        a: "Eén. We kiezen samen werk waar veel herhaling in zit en waarvan jij het resultaat direct kunt beoordelen. Uitbreiden doe je pas als die eerste doet wat je ervan verwacht.",
      },
      {
        q: "Wat als ons werk niet in een vast stappenplan past?",
        a: "Dan is het waarschijnlijk geen goede eerste workflow, en dat zeggen we ook. Er is bij vrijwel elk bedrijf genoeg werk dat wél elke keer hetzelfde gaat. Daar beginnen we.",
      },
      {
        q: "Wat gebeurt er met onze gegevens?",
        a: "Gevoelige en vertrouwelijke gegevens blijven bij de bron. We werken op de uitkomsten, niet op de onderliggende dossiers. In de Company Brain heeft elk gegeven een herkomst, een eigenaar en rechten, dus je weet wie wat ziet.",
      },
    ],

    ctaTitle: "Begin bij de scan",
    ctaBody:
      "Voordat je iets bouwt, wil je weten waar het loont. De scan laat zien welk werk in jouw bedrijf zich leent voor AI, op volgorde. Gratis, en je zit nergens aan vast.",
    ctaButton: "Doe de gratis scan",
    ctaSecondary: "Lees over de Company Brain",
  },
  en: {
    heroTitle: "Practical help with one job at a time",
    heroSub:
      "A workflow takes one recurring job off your hands, start to finish. It runs on your Company Brain, so it knows how you work. You start with one, and expand where it works.",

    whatTitle: "What a workflow is",
    whatBody: [
      "Take the monthly report. Someone pulls the figures out of the accounting package, puts them in the same format as last month, works out why that one line is off, and writes a note to explain it. Every month again, every month the same steps.",
      "That is a workflow: a job with a fixed start, fixed steps and a clear end result. Exactly the kind of work AI is good at, and exactly the kind of work that eats most of your time.",
      "The difference with a standalone AI tool is context. A workflow draws on your Company Brain, so it knows how you lay out the report, which lines always belong in it and what counts as normal for you. You don't have to explain it every time.",
    ],

    examplesTitle: "What it usually comes down to",
    examplesIntro:
      "These are examples of the kind of work that lends itself to a workflow, not a catalogue to order from. Which ones make sense for you depends on where your time actually goes.",
    examples: [
      {
        area: "Marketing",
        body: "Doing research, bringing ideas, writing copy, making visuals, checking the SEO, scheduling and measuring what it did afterwards. In your own tone, because that lives in the Company Brain.",
      },
      {
        area: "Sales",
        body: "Building profiles of prospects and accounts, preparing conversations, spotting openings at existing customers, sorting inbound leads, and drafting outreach and quotes in your voice.",
      },
      {
        area: "Finance",
        body: "Reading figures out of your accounting system, producing monthly reports that stay comparable across locations and periods, tracing deviations back to the source, and putting business cases in one fixed structure.",
      },
      {
        area: "HR and back office",
        body: "Answering employee questions from what is actually written down, and the recurring admin around joining, leaving, leave and documents.",
      },
    ],
    examplesNote:
      "Your company isn't organised in these departments? That's fine. The scan works with whatever structure you use yourself.",

    controlTitle: "You stay in control",
    controlBody: [
      "A workflow does not operate behind your back. You see what it produces before it gets used, and you decide what goes out.",
      "We deliberately start with work whose result you can judge straight away. That way you see within a week whether it holds up, instead of having to take our word for it. If it works out, you expand.",
    ],

    chatgptTitle: "Why not just ChatGPT?",
    chatgptBody: [
      "A project in ChatGPT or Copilot is one big dumping bin. Nobody knows exactly who threw what in, whether it is correct, how it is maintained, or who is allowed to see what. For a company that is unsuitable.",
      "The Company Brain is the opposite. Every data point has a provenance, an owner, maintenance and rights. You know what is in it, whether it is right, and who sees it. That is what the workflows run on.",
    ],

    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How do I know which workflows fit us?",
        a: "That is what the free scan is for. It maps where time and repetition pile up at your company, and orders where AI delivers most. So you don't have to know up front.",
      },
      {
        q: "Do we need a Company Brain first?",
        a: "Yes. The Company Brain is what the workflows draw on: your way of working, your agreements and your tone. Without that context you get generic answers instead of work that fits you.",
      },
      {
        q: "How many workflows do we start with?",
        a: "One. Together we pick work with a lot of repetition in it whose result you can judge directly. You expand once that first one does what you expect.",
      },
      {
        q: "What if our work doesn't follow a fixed set of steps?",
        a: "Then it is probably not a good first workflow, and we will say so. At almost every company there is plenty of work that does go the same way every time. That is where we start.",
      },
      {
        q: "What happens to our data?",
        a: "Sensitive and confidential data stays at the source. We work on the outcomes, not on the underlying files. In the Company Brain every data point has a provenance, an owner and rights, so you know who sees what.",
      },
    ],

    ctaTitle: "Start with the scan",
    ctaBody:
      "Before you build anything, you want to know where it pays off. The scan shows which work in your company lends itself to AI, in order. Free, and you are not committed to anything.",
    ctaButton: "Take the free scan",
    ctaSecondary: "Read about the Company Brain",
  },
};

export default function WorkflowsPage() {
  const { language } = useLanguage();
  const c = translations[language];

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed max-w-2xl mx-auto">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What a workflow is */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.whatTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              {c.whatBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Examples per area */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[820px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.examplesTitle}
            </h2>
            <p className="mt-5 text-lg font-light text-grey/70 leading-relaxed max-w-[680px]">
              {c.examplesIntro}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.examples.map((ex, i) => (
              <FadeIn key={ex.area} delay={150 + i * 100}>
                <div className="h-full bg-surface rounded-xl p-6 border border-sage-light">
                  <h3 className="font-serif text-xl text-grey">{ex.area}</h3>
                  <p className="mt-3 text-base font-light text-grey/80 leading-relaxed">
                    {ex.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={550}>
            <p className="mt-8 text-base font-light text-grey/60 leading-relaxed max-w-[680px]">
              {c.examplesNote}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* You stay in control */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.controlTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              {c.controlBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why not ChatGPT */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.chatgptTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              {c.chatgptBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.faqTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8">
              <FAQ items={c.faq.map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.ctaTitle}
            </h2>
            <p className="mt-5 text-lg font-light text-grey/70 leading-relaxed">
              {c.ctaBody}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scan"
                className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block"
              >
                {c.ctaButton} →
              </Link>
              <Link
                href="/company-brain"
                className="border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors inline-block"
              >
                {c.ctaSecondary} →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
