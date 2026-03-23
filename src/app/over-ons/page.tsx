"use client";

import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Wij zijn Nativ",
    heroSub1: "Drie mensen. Dertig man output.",
    heroSub2: "Niet door harder te werken — door AI-native te zijn.",
    storyTitle: "Waarom Nativ bestaat",
    storyP1: "We zagen het steeds weer. Bedrijven die duizenden euro\u2019s uitgeven aan AI-tools. Die er vervolgens niets mee doen. Niet omdat de tools slecht zijn — maar omdat niemand de bedrijfskennis had gestructureerd die AI nodig heeft om nuttig te zijn.",
    storyP2: "Consultants vragen €30K+ voor een PDF. AI-vendors verkopen tools zonder context. Daar tussenin zit een gat. Dat gat zijn wij.",
    storyQuote: "Nativ bouwt de brug tussen wat je bedrijf weet en wat AI kan.",
    teamTitle: "Het team",
    team: [
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", linkedin: "https://www.linkedin.com/in/lvheemstra/" },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", linkedin: "https://www.linkedin.com/in/gokul-m-9a18b09b/" },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", linkedin: "https://linkedin.com/in/joruseveraerd/" },
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
      { name: "Livius van Heemstra", role: "Co-founder · Product & Strategy", linkedin: "https://www.linkedin.com/in/lvheemstra/" },
      { name: "Gokul Menon", role: "Co-founder · Technology & Architecture", linkedin: "https://www.linkedin.com/in/gokul-m-9a18b09b/" },
      { name: "Jorus Everaerd", role: "Co-founder · Sales & Strategy", linkedin: "https://linkedin.com/in/joruseveraerd/" },
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
      <section className="py-10 md:py-14 px-6">
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
      <section className="py-12 md:py-16 px-6">
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
      <section className="py-12 md:py-16 px-6 bg-white">
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
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">
                    <h3 className="font-serif text-xl">{member.name}</h3>
                  </a>
                  <p className="text-sage text-sm mt-1">{member.role}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-grey/40 hover:text-sage transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-12 md:py-16 px-6">
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
