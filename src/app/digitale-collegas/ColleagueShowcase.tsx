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
      "Hallo, ik ben Alice, jouw digitale persoonlijke assistent. Ik beheer je agenda, beantwoord je e-mails en zorg dat jij je kunt focussen op wat er echt toe doet. Van het plannen van vergaderingen tot het opstellen van notities, ik regel het. Altijd beschikbaar, altijd een stap voor.",
    videoSrc: "/videos/alice.mp4?v=3",
  },
  {
    id: "brandon",
    name: "Brandon",
    role: "Marketing",
    tagline: "Data-gedreven marketing, dat is mijn ding.",
    intro:
      "Hey, ik ben Brandon, hoofd marketing. Ik analyseer je campagnedata, volg je kanalen en optimaliseer je marketingbudget. Van cross-channel tracking tot ROI-analyse, ik geef je de inzichten die je nodig hebt om slimmere beslissingen te nemen. Data-gedreven marketing, dat is mijn ding.",
    videoSrc: "/videos/brandon.mp4?v=2",
  },
  {
    id: "hunter",
    name: "Hunter",
    role: "Sales",
    tagline: "Klaar om te scoren.",
    intro:
      "Hi, ik ben Hunter, je digitale sales manager. Ik houd je pipeline scherp, volg je leads op en zorg dat geen enkele kans door je vingers glipt. Van prospecting tot deal closing, ik werk dag en nacht om je omzet te laten groeien. Klaar om te scoren.",
    videoSrc: "/videos/hunter.mp4?v=2",
  },
  {
    id: "crystal",
    name: "Crystal",
    role: "HR",
    tagline: "Mensen zijn het belangrijkste.",
    intro:
      "Hoi, ik ben Crystal, je digitale HR-manager. Ik help met onboarding, verlofregistratie en personeelsbeheer. Van contracten tot tevredenheidsonderzoeken, ik zorg dat jouw team goed ondersteund wordt. Mensen zijn het belangrijkste, en daar draag ik graag aan bij.",
    videoSrc: "/videos/chrystal.mp4",
  },
  {
    id: "billy",
    name: "Billy",
    role: "Finance",
    tagline: "Geen verrassingen aan het eind van de maand.",
    intro:
      "De finance collega die Exact Online koppelt, data analyseert en context verzamelt voor betere beslissingen.",
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
        aria-label={`${colleague.name}, klik om de introductie te bekijken`}
      >
        {/* Video card */}
        <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden border border-sage-light transition-all duration-300 group-hover:scale-[1.03]">
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
                : "bg-surface/80 text-sage opacity-0 group-hover:opacity-100"
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

export default function ColleagueShowcase() {
  return (
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
  );
}
