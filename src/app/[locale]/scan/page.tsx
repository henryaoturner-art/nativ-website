"use client";

import { useEffect } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { captureSource } from "@/lib/scan/source";
import { Check, X } from "lucide-react";

// Beide smaken starten op hetzelfde formulier; ?team=1 maakt er een teamscan
// van (eigen vragen eerst, daarna het teamoverzicht met uitnodigingen).
const QUICK_SCAN_HREF = "/scan/start";
const TEAM_SCAN_HREF = "/scan/start?team=1";

// Opbouw van de pagina: deel D2 van de website-ronde (KAN-425, 10 sep 2026):
// hero links met rechts de kaart "Wat je krijgt", de twee manieren als kaarten
// naast elkaar, de teamscan als stappenrij, wel/niet in twee kolommen, FAQ in
// twee kolommen en de afsluiting als de ene Sand-band. Alle zinnen van de
// pagina van 8 september staan er nog; alleen de plek is veranderd.
const translations = {
  nl: {
    heroTitle: "De AI-scan: waar kan AI jullie werk uit handen nemen?",
    heroSub:
      "Loop de AI-scan door en zie welk werk in jouw bedrijf zich daarvoor leent. Je kiest zelf hoe ver je gaat.",

    quickTitle: "In je eentje",
    quickTime: "± 20 minuten",
    quickBody:
      "Jij kent je bedrijf. Loop de scan zelf door en breng in kaart hoe het werk bij jullie loopt. Je krijgt meteen een rapport met de workflows die zich het best lenen voor AI, en waar je begint.",
    quickCta: "Start de scan",

    teamTitle: "Met je team",
    teamTime: "± 15 minuten per persoon",
    teamBody:
      "Nodig je mensen uit, per afdeling. Zij zien het werk dat jij niet ziet. Je krijgt het beeld van het hele bedrijf, afdeling voor afdeling.",
    teamCta: "Nodig je team uit",

    cardsFooter:
      "Allebei gratis. Allebei eindigen ze op een rapport dat je kunt delen. Begin gerust in je eentje. Je kunt je team er later altijd bij halen.",

    callTitle: "Liever eerst even bellen?",
    callCta: "Plan een gesprek",

    reportKicker: "Wat je krijgt",
    reportTitle: "Wat de AI-scan je oplevert",
    reportItems: [
      "De workflows die zich het best lenen voor AI, op volgorde van wat het meeste oplevert",
      "Per onderdeel hoe vaak het gebeurt, wat het nu kost en waarom het zich leent voor AI",
      "Eén concreet startpunt: het werk waar je het snelst resultaat ziet",
      "Een rapport dat je kunt delen met wie je wilt",
    ],

    teamHowTitle: "Zo werkt de AI-scan met je team",
    teamHowBody: [
      "Je maakt zelf je afdelingen aan, precies zoals jullie het bedrijf hebben ingedeeld. Per afdeling nodig je de mensen uit die het werk het beste kennen.",
      "Iedereen krijgt dezelfde vragen, over zijn eigen werk. Dat kost ze ongeveer een kwartier. Ze hoeven niets voor te bereiden en niets te uploaden.",
      "Jij ziet het rapport groeien, afdeling voor afdeling. Je bepaalt zelf wie je uitnodigt en wanneer je afrondt.",
    ],

    dataTitle: "Wat we wel en niet vragen",
    // Eén alinea van 8 september, in twee kolommen gezet (wel / niet).
    dataAsk:
      "We vragen naar het werk zelf: wat het is, hoe vaak het gebeurt en hoeveel tijd het kost.",
    dataNot:
      "Er gaan geen bedrijfsbestanden of vertrouwelijke gegevens in. Die blijven waar ze horen.",

    faqTitle: "Veelgestelde vragen",
    faq: [
      {
        q: "Wat kost de scan?",
        a: "Niets. Allebei de varianten zijn gratis, en er zit geen verplichting aan vast.",
      },
      {
        q: "Hoe lang duurt het?",
        a: "In je eentje ongeveer 20 minuten. Doe je hem met je team, dan ben jij ongeveer 20 minuten kwijt en je collega's een kwartier, ieder op zijn eigen moment.",
      },
      {
        q: "Moet ik iets voorbereiden of aanleveren?",
        a: "Nee. Je hoeft niets te uploaden en geen documenten te verzamelen. We vragen alleen naar het werk zelf: wat het is, hoe vaak het gebeurt en hoeveel tijd het kost.",
      },
      {
        q: "Wat gebeurt er met mijn antwoorden?",
        a: "Je antwoorden en je rapport zijn van jou, en je kunt het rapport delen met wie je wilt. Bedrijfsbestanden en vertrouwelijke gegevens vragen we niet op, die blijven bij de bron.",
      },
      {
        q: "Kan ik eerst alleen beginnen en later mijn team erbij halen?",
        a: "Ja, en dat is ook de gewone volgorde. Je begint in je eentje, en als je meer wilt weten nodig je daarna je collega's uit per afdeling. Je rapport groeit dan mee.",
      },
      {
        q: "Wat gebeurt er na de scan?",
        a: "Je krijgt je rapport, en als je wilt praten we erover door: wat het bij jullie zou betekenen en waar je zou beginnen. Je zit nergens aan vast.",
      },
    ],

    closingTitle: "Liever eerst even praten?",
    closingBody:
      "Kan ook. Stel je vraag, dan kijken we samen of de scan iets voor jullie is.",
    closingCta: "Neem contact op",
  },
  en: {
    heroTitle: "The AI scan: where can AI take work off your hands?",
    heroSub:
      "Run through the AI scan and see which work in your company is a good fit. You decide how far you go.",

    quickTitle: "On your own",
    quickTime: "± 20 minutes",
    quickBody:
      "You know your company. Run through the scan yourself and map how the work flows. You get a report right away, showing the workflows that lend themselves best to AI, and where to start.",
    quickCta: "Start the scan",

    teamTitle: "With your team",
    teamTime: "± 15 minutes per person",
    teamBody:
      "Invite your people, per department. They see the work you don't. You get the picture of the whole company, department by department.",
    teamCta: "Invite your team",

    cardsFooter:
      "Both are free. Both end in a report you can share. Feel free to start on your own. You can always bring your team in later.",

    callTitle: "Rather talk first?",
    callCta: "Plan a call",

    reportKicker: "What you get",
    reportTitle: "What the AI scan gives you",
    reportItems: [
      "The workflows that lend themselves best to AI, ordered by what delivers most",
      "Per item: how often it happens, what it costs today and why it lends itself to AI",
      "One concrete starting point: the work where you see results fastest",
      "A report you can share with whoever you like",
    ],

    teamHowTitle: "How the AI scan with your team works",
    teamHowBody: [
      "You set up your own departments, exactly the way your company is organised. Per department you invite the people who know the work best.",
      "Everyone gets the same questions, about their own work. That takes them about fifteen minutes. They don't have to prepare anything or upload anything.",
      "You watch the report grow, department by department. You decide who you invite and when you wrap up.",
    ],

    dataTitle: "What we do and don't ask for",
    // One paragraph from 8 September, set in two columns (do / don't).
    dataAsk:
      "We ask about the work itself: what it is, how often it happens and how much time it takes.",
    dataNot:
      "No company files or confidential data go in. Those stay where they belong.",

    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What does the scan cost?",
        a: "Nothing. Both versions are free, and there are no strings attached.",
      },
      {
        q: "How long does it take?",
        a: "On your own, about 20 minutes. With your team, about 20 minutes for you and fifteen for each colleague, everyone whenever it suits them.",
      },
      {
        q: "Do I need to prepare or supply anything?",
        a: "No. You don't have to upload anything or gather documents. We only ask about the work itself: what it is, how often it happens and how much time it takes.",
      },
      {
        q: "What happens to my answers?",
        a: "Your answers and your report are yours, and you can share the report with whoever you like. We don't ask for company files or confidential data, those stay at the source.",
      },
      {
        q: "Can I start alone and bring my team in later?",
        a: "Yes, and that is the normal order. You start on your own, and if you want to know more you invite your colleagues per department afterwards. Your report grows along with it.",
      },
      {
        q: "What happens after the scan?",
        a: "You get your report, and if you want we talk it through: what it would mean at your company and where you would start. You are not committed to anything.",
      },
    ],

    closingTitle: "Rather talk first?",
    closingBody:
      "That works too. Ask your question and we'll look together at whether the scan is right for you.",
    closingCta: "Get in touch",
  },
};

const stepNumberCls = "font-serif text-[40px] leading-none text-sage-dark";

export default function ScanPage() {
  const { language } = useLanguage();
  const c = translations[language];

  // Leg ?bron=mail vast zodra iemand binnenkomt. Het startformulier leest hem
  // straks terug, ook als de bezoeker eerst nog wat rondkijkt op de site.
  useEffect(() => {
    captureSource();
  }, []);

  return (
    <>
      {/* D2: hero links, rechts de kaart "Wat je krijgt", daaronder de twee manieren */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <FadeIn>
              <h1 className="font-serif text-grey">{c.heroTitle}</h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-6 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href={QUICK_SCAN_HREF}>{c.quickCta}</Button>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-grey">
                  <span>{c.callTitle}</span>
                  <Button variant="tertiary" href="/contact">
                    {c.callCta}
                  </Button>
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300} className="md:col-span-5">
            <Card>
              <Kicker>{c.reportKicker}</Kicker>
              <h3 className="font-serif text-grey">{c.reportTitle}</h3>
              <ul className="mt-5 space-y-3">
                {c.reportItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-grey">
                    <Check size={18} strokeWidth={2} className="mt-1 shrink-0 text-sage-dark" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>

        {/* De twee manieren, naast elkaar, elk met een eigen knop */}
        <FadeIn delay={450}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card signature className="flex flex-col">
              <h3 className="font-serif text-grey">{c.quickTitle}</h3>
              <p className="mt-1 text-sm text-muted">{c.quickTime}</p>
              <p className="mt-4 flex-1 text-grey leading-relaxed">{c.quickBody}</p>
              <Button href={QUICK_SCAN_HREF} className="mt-6 self-start">
                {c.quickCta}
              </Button>
            </Card>

            <Card className="flex flex-col">
              <h3 className="font-serif text-grey">{c.teamTitle}</h3>
              <p className="mt-1 text-sm text-muted">{c.teamTime}</p>
              <p className="mt-4 flex-1 text-grey leading-relaxed">{c.teamBody}</p>
              <Button variant="secondary" href={TEAM_SCAN_HREF} className="mt-6 self-start">
                {c.teamCta}
              </Button>
            </Card>
          </div>
          <p className="mt-6 text-sm text-muted leading-relaxed">{c.cardsFooter}</p>
        </FadeIn>
      </Section>

      {/* Zo werkt de teamscan als stappenrij, daaronder wel/niet in twee kolommen */}
      <Section>
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <h2 className="font-serif text-grey md:col-span-3 lg:col-span-1">{c.teamHowTitle}</h2>
            {c.teamHowBody.map((step, i) => (
              <div key={step}>
                <p className={stepNumberCls} aria-hidden="true">
                  {i + 1}
                </p>
                <p className="mt-3 text-grey leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="font-serif text-grey md:col-span-12 lg:col-span-4">{c.dataTitle}</h2>
            <div className="flex items-start gap-3 md:col-span-6 lg:col-span-4">
              <Check size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden="true" />
              <p className="text-grey leading-relaxed">{c.dataAsk}</p>
            </div>
            <div className="flex items-start gap-3 md:col-span-6 lg:col-span-4">
              <X size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden="true" />
              <p className="text-grey leading-relaxed">{c.dataNot}</p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* FAQ in twee kolommen en de afsluiting in één rij: de ene band van de pagina */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="font-serif text-grey md:col-span-12 lg:col-span-3">{c.faqTitle}</h2>
            <div className="md:col-span-12 lg:col-span-9">
              <FAQ items={c.faq.map((f) => ({ question: f.q, answer: f.a }))} columns={2} />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-10 pt-10 border-t border-border flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[640px]">
              <h2 className="font-serif text-grey">{c.closingTitle}</h2>
              <p className="mt-3 text-grey leading-relaxed">{c.closingBody}</p>
            </div>
            <Button href="/contact" className="shrink-0">
              {c.closingCta}
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
