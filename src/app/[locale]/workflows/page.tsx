"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { Calculator, Handshake, Megaphone, Users } from "lucide-react";

// Eén lucide-icoon per afdelingskaart (D4, KAN-425), in de volgorde van
// `examples`: Marketing, Sales, Finance, HR en kantoor.
const exampleIcons = [Megaphone, Handshake, Calculator, Users];

const translations = {
  nl: {
    heroTitle: "AI-workflows: praktische hulp bij één klus tegelijk",
    heroSub:
      "Een AI-workflow neemt één terugkerende klus van je over, van begin tot eind. Hij werkt vanuit je Company Brain, dus hij kent jullie manier van werken. Je begint met één, en je breidt uit waar het werkt.",

    whatTitle: "Wat een AI-workflow is",
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

    ctaTitle: "Begin bij de AI-scan",
    ctaBody:
      "Voordat je iets bouwt, wil je weten waar het loont. De scan laat zien welk werk in jouw bedrijf zich leent voor AI, op volgorde. Gratis, en je zit nergens aan vast.",
    ctaButton: "Doe de gratis scan",
    ctaSecondary: "Lees over de Company Brain",
  },
  en: {
    heroTitle: "AI workflows: practical help with one job at a time",
    heroSub:
      "An AI workflow takes one recurring job off your hands, start to finish. It runs on your Company Brain, so it knows how you work. You start with one, and expand where it works.",

    whatTitle: "What an AI workflow is",
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

    ctaTitle: "Start with the AI scan",
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
    <>
      {/* Hero: links uitgelijnd, het korte hero-ritme */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">{c.heroTitle}</h1>
          <p className="mt-4 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
        </FadeIn>
      </Section>

      {/* D4: wat een AI-workflow is, in twee kolommen (H2 + eerste alinea links, alinea twee en drie rechts) */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn>
            <h2 className="font-serif text-grey">{c.whatTitle}</h2>
            <p className="mt-6 text-grey leading-relaxed">{c.whatBody[0]}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="space-y-5 text-grey leading-relaxed">
              {c.whatBody.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* D4: de vier afdelingen in één rij van vier, met een icoon per kaart; de regel eronder ongewijzigd */}
      <Section>
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-end">
            <h2 className="font-serif text-grey md:col-span-5">{c.examplesTitle}</h2>
            <p className="max-w-[640px] text-grey leading-relaxed md:col-span-7">{c.examplesIntro}</p>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {c.examples.map((ex, i) => {
              const Icon = exampleIcons[i];
              return (
                <Card key={ex.area} as="li">
                  <Icon size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-grey">{ex.area}</h3>
                  <p className="mt-3 text-grey leading-relaxed">{ex.body}</p>
                </Card>
              );
            })}
          </ul>
          <p className="mt-6 max-w-[640px] text-muted leading-relaxed">{c.examplesNote}</p>
        </FadeIn>
      </Section>

      {/* D4: "Jij houdt de regie" en "Waarom niet gewoon ChatGPT?" naast elkaar in één sectie */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          <FadeIn>
            <h2 className="font-serif text-grey">{c.controlTitle}</h2>
            <div className="mt-6 space-y-5 text-grey leading-relaxed">
              {c.controlBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="font-serif text-grey">{c.chatgptTitle}</h2>
            <div className="mt-6 space-y-5 text-grey leading-relaxed">
              {c.chatgptBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* D4: FAQ in twee kolommen (het JSON-LD ervan staat in layout.tsx) en de sluitband
          samen in de ene Sand-band van de pagina, zoals op /pricing en /scan */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="font-serif text-grey md:col-span-3">{c.faqTitle}</h2>
            <div className="md:col-span-9">
              <FAQ items={c.faq.map((f) => ({ question: f.q, answer: f.a }))} columns={2} />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-12 pt-10 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h2 className="font-serif text-grey">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-[640px] text-grey leading-relaxed">{c.ctaBody}</p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row flex-wrap gap-4 md:justify-end">
              <Button href="/scan">{c.ctaButton}</Button>
              <Button variant="secondary" href="/company-brain">{c.ctaSecondary}</Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
