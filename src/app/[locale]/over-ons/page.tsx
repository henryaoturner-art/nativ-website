"use client";

import { Brain, Linkedin, Scale, Sparkles, Users } from "lucide-react";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Wij zijn nativ",
    heroSub1: "Drie mensen. Dertig man output.",
    heroSub2: "Niet door harder te werken, maar door AI-native te zijn.",
    storyTitle: "Waarom nativ bestaat",
    storyP1: "We zien veel bedrijven die met AI beginnen. Ze geven werknemers toegang, en de eerste resultaten zijn verrassend.",
    storyP2: "Totdat ze AI serieus in hun werk willen gebruiken, iedere dag opnieuw. Dan merken ze dat het niet voldoet, en dat ligt niet aan de modellen. Maar dat ligt aan de kennis van de modellen over jouw bedrijf: jouw specifieke context.",
    storyP3: "Die kennis zit verspreid. In je systemen, in e-mails, in gesprekken en in de hoofden van je mensen. Is de juiste persoon er niet, dan sta je stil.",
    storyP4: "Daarom begonnen we bij de kennis en niet bij de tool. We bouwen de Company Brain: één plek waar staat wat jouw bedrijf weet, met een eigenaar per onderdeel en een herkomst bij elk antwoord. Daar zetten we AI-workflows bovenop.",
    storyQuote: "AI wordt pas nuttig als hij weet hoe jouw bedrijf werkt.",
    teamTitle: "Het team",
    team: [
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", linkedin: "https://www.linkedin.com/in/lvheemstra/", photo: "/images/livius.jpg" },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", linkedin: "https://www.linkedin.com/in/gokul-m-9a18b09b/", photo: "/images/gokul.jpg" },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", linkedin: "https://linkedin.com/in/joruseveraerd/", photo: "/images/jorus.jpg" },
    ],
    howTitle: "Hoe wij werken",
    howP: "Ons eigen bedrijf is onze eerste en meest geteste klant. Dezelfde kennisbank die we voor klanten bouwen, draait al maanden intern. We doen wat we zeggen, en we bewijzen het elke dag op onszelf.",
    howItems: ["AI-native sinds dag één", "Onze eigen Company Brain is het meest geteste systeem dat we hebben", "Lean team, grote output", "Eerlijk over wat AI wel en niet kan"],
  },
  en: {
    heroTitle: "We are nativ",
    heroSub1: "Three people. Thirty people’s output.",
    heroSub2: "Not by working harder, but by being AI-native.",
    storyTitle: "Why nativ exists",
    storyP1: "We see a lot of companies starting with AI. They give their people access, and the first results are impressive.",
    storyP2: "Until they want to use AI seriously in their work, every day again. Then they find that it falls short, and that is not down to the models. It is down to what the models know about your company: your specific context.",
    storyP3: "That knowledge sits scattered. In your systems, in emails, in conversations and in your people’s heads. When the right person is not there, the work stops.",
    storyP4: "So we started with the knowledge instead of the tool. We build the Company Brain: one place that holds what your company knows, with an owner for each part and a source behind every answer. On top of it we put AI workflows.",
    storyQuote: "AI only becomes useful once it knows how your company works.",
    teamTitle: "The team",
    team: [
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", linkedin: "https://www.linkedin.com/in/lvheemstra/", photo: "/images/livius.jpg" },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", linkedin: "https://www.linkedin.com/in/gokul-m-9a18b09b/", photo: "/images/gokul.jpg" },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", linkedin: "https://linkedin.com/in/joruseveraerd/", photo: "/images/jorus.jpg" },
    ],
    howTitle: "How we work",
    howP: "Our own company is our first and most battle-tested client. The same knowledge base we build for clients has been running internally for months. We do what we say, and we prove it on ourselves every day.",
    howItems: ["AI-native since day one", "Our own Company Brain is the most tested system we have", "Lean team, big output", "Honest about what AI can and can’t do"],
  },
};

// Eén lucide-icoon per werkprincipe (B3, KAN-425), in de volgorde van howItems.
const howIcons = [Sparkles, Brain, Users, Scale];

export default function OverOnsPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/*
        Eerste scherm (D5, KAN-425): "Waarom nativ bestaat" is langer dan 120 woorden
        (138 NL, 142 EN), dus de tekst staat links in 7 kolommen als signatuurkaart en
        de hero rechts in 5. "Hoe wij werken" staat onder de hero, in de ruimte naast
        de kaart, zodat de pagina onder de 1900px blijft. Op mobiel: hero, waarom, hoe.
      */}
      <Section hero>
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_1fr] gap-x-8 gap-y-10 md:gap-y-12">
          <FadeIn className="md:col-span-5 md:col-start-8 md:row-start-1">
            <h1 className="font-serif text-grey">{c.heroTitle}</h1>
            <p className="mt-6 text-lg md:text-xl text-grey leading-relaxed">
              {c.heroSub1}
              <br />
              {c.heroSub2}
            </p>
          </FadeIn>

          <FadeIn delay={150} className="md:col-span-7 md:col-start-1 md:row-start-1 md:row-span-2">
            <Card signature primary className="h-full">
              <h2 className="font-serif text-grey">{c.storyTitle}</h2>
              <div className="mt-6 space-y-4 text-grey leading-relaxed">
                <p>{c.storyP1}</p>
                <p>{c.storyP2}</p>
                <p>{c.storyP3}</p>
                <p>{c.storyP4}</p>
                <p className="font-serif text-xl italic text-grey">{c.storyQuote}</p>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={300} className="md:col-span-5 md:col-start-8 md:row-start-2 md:self-start">
            <h2 className="font-serif text-grey">{c.howTitle}</h2>
            <p className="mt-6 text-grey leading-relaxed">{c.howP}</p>
            <ul className="mt-6 space-y-3">
              {c.howItems.map((item, i) => {
                const Icon = howIcons[i] ?? Sparkles;
                return (
                  <li key={item} className="flex items-start gap-3 text-grey">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-sage-dark" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* Team: kop in de linkerkolom, drie kaarten uit B3 met de foto (4:5) bovenin; op mobiel foto links. */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FadeIn className="lg:col-span-3">
            <h2 className="font-serif text-grey">{c.teamTitle}</h2>
          </FadeIn>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 150}>
                <Card as="article" className="h-full flex items-start gap-5 md:block">
                  <div
                    className="w-24 shrink-0 md:w-full aspect-[4/5] rounded-lg overflow-hidden bg-sage-light flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-serif text-sage-dark text-3xl">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0 md:mt-5">
                    <Kicker>{member.role}</Kicker>
                    <h3 className="font-serif text-grey">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline decoration-1 decoration-sage-dark underline-offset-4"
                      >
                        {member.name}
                      </a>
                    </h3>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex mt-3 text-grey hover:text-sage-dark transition-colors"
                    >
                      <Linkedin size={20} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
