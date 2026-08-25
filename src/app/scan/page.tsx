"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/lib/language-context";

// Beide smaken starten op hetzelfde formulier; ?team=1 maakt er een teamscan
// van (eigen vragen eerst, daarna het teamoverzicht met uitnodigingen).
const QUICK_SCAN_HREF = "/scan/start";
const TEAM_SCAN_HREF = "/scan/start?team=1";

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
    dataBody:
      "We vragen naar het werk zelf: wat het is, hoe vaak het gebeurt en hoeveel tijd het kost. Er gaan geen bedrijfsbestanden of vertrouwelijke gegevens in. Die blijven waar ze horen.",

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
    dataBody:
      "We ask about the work itself: what it is, how often it happens and how much time it takes. No company files or confidential data go in. Those stay where they belong.",

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

export default function ScanPage() {
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
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The two options */}
      <section className="px-6 pb-4">
        <div className="max-w-[900px] mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn delay={150}>
              <div className="h-full bg-white rounded-xl p-7 md:p-8 border-l-[3px] border-sage shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col">
                <h2 className="font-serif text-2xl text-grey">{c.quickTitle}</h2>
                <p className="mt-1 text-sm text-grey/50">{c.quickTime}</p>
                <p className="mt-4 flex-1 text-base font-light text-grey/80 leading-relaxed">
                  {c.quickBody}
                </p>
                <Link
                  href={QUICK_SCAN_HREF}
                  className="mt-7 bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors text-center font-medium"
                >
                  {c.quickCta} →
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="h-full bg-white rounded-xl p-7 md:p-8 border-l-[3px] border-sage-light shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col">
                <h2 className="font-serif text-2xl text-grey">{c.teamTitle}</h2>
                <p className="mt-1 text-sm text-grey/50">{c.teamTime}</p>
                <p className="mt-4 flex-1 text-base font-light text-grey/80 leading-relaxed">
                  {c.teamBody}
                </p>
                <Link
                  href={TEAM_SCAN_HREF}
                  className="mt-7 border border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white transition-colors text-center font-medium"
                >
                  {c.teamCta} →
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={450}>
            <p className="mt-6 text-center text-sm text-grey/60 font-light leading-relaxed max-w-[640px] mx-auto">
              {c.cardsFooter}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What you get */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.reportTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <ul className="mt-8 space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              {c.reportItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sage mt-1">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* How the team scan works */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.teamHowTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-5 text-lg font-light text-grey/80 leading-relaxed">
              {c.teamHowBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Data reassurance */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <div className="bg-white rounded-xl p-6 md:p-8 border-l-[3px] border-sage shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="font-serif text-xl text-grey">{c.dataTitle}</h2>
              <p className="mt-3 text-base text-grey/70 font-light leading-relaxed">
                {c.dataBody}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-6 bg-white">
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

      {/* Closing */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              {c.closingTitle}
            </h2>
            <p className="mt-4 text-lg font-light text-grey/70 leading-relaxed">
              {c.closingBody}
            </p>
            <Link
              href="/contact"
              className="mt-8 border border-sage text-sage px-8 py-4 rounded-lg hover:bg-sage hover:text-white transition-colors inline-block"
            >
              {c.closingCta} →
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
