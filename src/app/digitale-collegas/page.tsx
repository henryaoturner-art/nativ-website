"use client";

import { useState, useRef } from "react";
import FadeIn from "@/components/FadeIn";

interface Colleague {
  id: string;
  name: string;
  role: string;
  tagline: string;
  intro: string;
  videoSrc: string;
}

const colleagues: Colleague[] = [
  {
    id: "alice",
    name: "Alice",
    role: "Digitale Assistent",
    tagline: "Je rechterhand die nooit vrij neemt.",
    intro:
      "Hallo, ik ben Alice, jouw digitale persoonlijke assistent. Ik beheer je agenda, beantwoord je e-mails en zorg dat jij je kunt focussen op wat er echt toe doet. Van het plannen van vergaderingen tot het opstellen van notities — ik regel het. Altijd beschikbaar, altijd een stap voor.",
    videoSrc: "/videos/alice.mp4?v=2",
  },
  {
    id: "brandon",
    name: "Brandon",
    role: "Marketing",
    tagline: "Data-gedreven marketing, dat is mijn ding.",
    intro:
      "Hey, ik ben Brandon, hoofd marketing. Ik analyseer je campagnedata, volg je kanalen en optimaliseer je marketingbudget. Van cross-channel tracking tot ROI-analyse — ik geef je de inzichten die je nodig hebt om slimmere beslissingen te nemen. Data-gedreven marketing, dat is mijn ding.",
    videoSrc: "/videos/brandon.mp4?v=2",
  },
  {
    id: "hunter",
    name: "Hunter",
    role: "Sales",
    tagline: "Klaar om te scoren.",
    intro:
      "Hi, ik ben Hunter, je digitale sales manager. Ik houd je pipeline scherp, volg je leads op en zorg dat geen enkele kans door je vingers glipt. Van prospecting tot deal closing — ik werk dag en nacht om je omzet te laten groeien. Klaar om te scoren.",
    videoSrc: "/videos/hunter.mp4?v=2",
  },
  {
    id: "chrystal",
    name: "Chrystal",
    role: "HR",
    tagline: "Mensen zijn het belangrijkste.",
    intro:
      "Hoi, ik ben Chrystal, je digitale HR-manager. Ik help met onboarding, verlofregistratie en personeelsbeheer. Van contracten tot tevredenheidsonderzoeken — ik zorg dat jouw team goed ondersteund wordt. Mensen zijn het belangrijkste, en daar draag ik graag aan bij.",
    videoSrc: "/videos/chrystal.mp4?v=2",
  },
  {
    id: "billy",
    name: "Billy",
    role: "Finance",
    tagline: "Geen verrassingen aan het eind van de maand.",
    intro:
      "Hallo, ik ben Billy, je digitale financieel adviseur. Ik werk naast je bestaande boekhoudsoftware en geef je de context die je mist. Van cashflow-analyses tot business cases en treasury — ik maak financiële data begrijpelijk en actionable. Zo heb je geen verrassingen aan het eind van de maand.",
    videoSrc: "/videos/billy.mp4",
  },
];

function ColleagueCard({ colleague }: { colleague: Colleague }) {
  const [playing, setPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setPlaying(false);
        setShowIntro(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
        setShowIntro(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <button
        onClick={handleClick}
        className="group flex flex-col items-center cursor-pointer"
        aria-label={`${colleague.name} — klik om de introductie te bekijken`}
      >
        {/* Video card */}
        <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:scale-[1.03]">
          <video
            ref={videoRef}
            src={colleague.videoSrc}
            className="w-full h-full object-cover object-top"
            playsInline
            onEnded={() => {
              setPlaying(false);
              setTimeout(() => setShowIntro(false), 2000);
            }}
            preload="metadata"
          />

          {/* Name + role overlay — hidden while playing */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-grey/70 to-transparent pt-10 pb-3 px-3 transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-white font-serif text-xl md:text-2xl">
              {colleague.name}
            </p>
            <p className="text-white/80 text-xs mt-0.5">{colleague.role}</p>
          </div>

          {/* Play indicator */}
          <div
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
              playing
                ? "bg-sage text-white scale-110"
                : "bg-white/80 text-sage opacity-0 group-hover:opacity-100"
            }`}
          >
            {playing ? "⏸" : "▶"}
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-4 text-[15px] text-grey/70 font-light">
          {colleague.tagline}
        </p>
      </button>

      {/* Intro text — shown while playing */}
      <div
        className={`mt-4 max-w-[240px] overflow-hidden transition-all duration-500 ${
          showIntro ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[13px] text-grey/60 font-light leading-relaxed italic">
          &ldquo;{colleague.intro}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function DigitaleCollegasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Maak kennis met je nieuwe collega&apos;s
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-4 text-base font-light text-grey/50">
              Klik op een collega om de introductie te bekijken.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Colleagues: Alice top center, 4 others below */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          {/* Alice — centered on top */}
          <div className="flex justify-center mb-12 md:mb-16">
            <FadeIn>
              <ColleagueCard colleague={colleagues[0]} />
            </FadeIn>
          </div>

          {/* 4 others — evenly distributed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 justify-items-center">
            {colleagues.slice(1).map((colleague, i) => (
              <FadeIn key={colleague.id} delay={(i + 1) * 100}>
                <ColleagueCard colleague={colleague} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={600}>
          <div className="max-w-[680px] mx-auto text-center mt-20">
            <p className="font-serif text-2xl md:text-3xl text-grey">
              Welke digitale collega heeft jouw team nodig?
            </p>
            <p className="mt-4 text-grey/60 font-light">
              We bouwen ze op maat — gevoed door jouw bedrijfskennis.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
