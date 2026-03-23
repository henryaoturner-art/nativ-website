"use client";

import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Wij zijn Nativ",
    heroSub1: "Drie man. Dertig man output.",
    heroSub2: "Niet door harder te werken — door AI-native te zijn.",
    storyTitle: "Waarom Nativ bestaat",
    storyP1: "We zagen het steeds weer. Bedrijven die duizenden euro\u2019s uitgeven aan AI-tools. Die er vervolgens niets mee doen. Niet omdat de tools slecht zijn — maar omdat niemand de bedrijfskennis had gestructureerd die AI nodig heeft om nuttig te zijn.",
    storyP2: "Consultants vragen €30K+ voor een PDF. AI-vendors verkopen tools zonder context. Daar tussenin zit een gat. Dat gat zijn wij.",
    storyQuote: "Nativ bouwt de brug tussen wat je bedrijf weet en wat AI kan.",
    teamTitle: "Het team",
    team: [
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", bio: "Bouwde het originele platform en de Company Brain-methodologie. Verbindt bedrijfsstrategie met AI-mogelijkheden — overtuigd dat de beste AI-oplossingen beginnen bij het begrijpen van de business." },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", bio: "Bouwt de technische kern van Nativ. Van kennisbank-architectuur tot AI-integraties. Gelooft in simpele, robuuste systemen die écht werken." },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", bio: "Brengt Nativ naar de markt. Scherp op kansen, eerlijk over wat wel en niet kan, en altijd hands-on met klanten." },
    ],
    howTitle: "Hoe wij werken",
    howP: "Ons eigen bedrijf is onze eerste en meest geteste klant. Dezelfde kennisbank die we voor klanten bouwen, draait al maanden intern. We doen wat we zeggen — en we bewijzen het elke dag op onszelf.",
    howItems: ["AI-native sinds dag één", "Ons eigen AI Operating System is het meest geteste systeem dat we hebben", "Lean team, grote output", "Eerlijk over wat AI wel en niet kan"],
  },
  en: {
    heroTitle: "We are Nativ",
    heroSub1: "Three people. Thirty people\u2019s output.",
    heroSub2: "Not by working harder — by being AI-native.",
    storyTitle: "Why Nativ exists",
    storyP1: "We saw it happen again and again. Companies spending thousands on AI tools. Then doing nothing with them. Not because the tools are bad — but because nobody had structured the company knowledge that AI needs to be useful.",
    storyP2: "Consultants charge €30K+ for a PDF. AI vendors sell tools without context. In between sits a gap. We are that gap.",
    storyQuote: "Nativ builds the bridge between what your company knows and what AI can do.",
    teamTitle: "The team",
    team: [
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", bio: "Built the original platform and the Company Brain methodology. Connects business strategy with AI capabilities — convinced that the best AI solutions start with understanding the business." },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", bio: "Builds the technical core of Nativ. From knowledge base architecture to AI integrations. Believes in simple, robust systems that actually work." },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", bio: "Brings Nativ to market. Sharp on opportunities, honest about what works and what doesn\u2019t, and always hands-on with clients." },
    ],
    howTitle: "How we work",
    howP: "Our own company is our first and most battle-tested client. The same knowledge base we build for clients has been running internally for months. We do what we say — and we prove it on ourselves every day.",
    howItems: ["AI-native since day one", "Our own AI Operating System is the most tested system we have", "Lean team, big output", "Honest about what AI can and can\u2019t do"],
  },
};

export default function OverOnsPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              {c.heroSub1}
              <br />
              {c.heroSub2}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.storyTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>{c.storyP1}</p>
              <p>{c.storyP2}</p>
              <p className="font-serif text-grey text-xl italic">{c.storyQuote}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">{c.teamTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {c.team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 150}>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-sage/10 mx-auto mb-6 flex items-center justify-center" aria-hidden="true">
                    <span className="font-serif text-sage text-3xl">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-serif text-xl">{member.name}</h3>
                  <p className="text-sage text-sm mt-1">{member.role}</p>
                  <p className="mt-4 text-grey/70 font-light leading-relaxed text-sm max-w-xs mx-auto">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.howTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-8 text-lg font-light leading-relaxed text-grey/80">{c.howP}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <ul className="mt-8 space-y-3 text-grey/80 font-light">
              {c.howItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-sage mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
