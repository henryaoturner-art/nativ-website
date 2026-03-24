"use client";

import type { Metadata } from "next";
import { useState, useRef } from "react";
import FadeIn from "@/components/FadeIn";

/* ── Digital Colleagues data ── */
interface Colleague {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string; // placeholder color/emoji for now — swap for real images later
  audioSrc?: string; // optional audio file path
}

const colleagues: Colleague[] = [
  {
    id: "marketing-manager",
    name: "AI Marketing Manager",
    role: "Marketing & Content",
    description:
      "Beheert je merkidentiteit, creëert content, optimaliseert campagnes en analyseert de concurrentie. Voor beide merken tegelijk.",
    avatar: "📣",
  },
  {
    id: "sales-assistant",
    name: "AI Sales Assistant",
    role: "Sales & Acquisitie",
    description:
      "Kwalificeert leads, bereidt verkoopgesprekken voor, schrijft offertes en houdt je CRM up-to-date.",
    avatar: "🤝",
  },
  {
    id: "kennisbeheerder",
    name: "AI Kennisbeheerder",
    role: "Kennismanagement",
    description:
      "Structureert, actualiseert en ontsluit de collectieve kennis van je organisatie. Het kloppend hart van je AI Operating System.",
    avatar: "🧠",
  },
  {
    id: "hr-coordinator",
    name: "AI HR Coördinator",
    role: "HR & Recruitment",
    description:
      "Screent sollicitaties, plant interviews, beantwoordt veelgestelde vragen van medewerkers en beheert onboarding.",
    avatar: "👥",
  },
  {
    id: "finance-analyst",
    name: "AI Finance Analyst",
    role: "Finance & Rapportage",
    description:
      "Analyseert financiële data, genereert rapporten, signaleert afwijkingen en bereidt managementinformatie voor.",
    avatar: "📊",
  },
  {
    id: "customer-success",
    name: "AI Customer Success",
    role: "Klantenservice & Support",
    description:
      "Beantwoordt klantvragen met context, escaleert complexe issues en houdt klanttevredenheid bij.",
    avatar: "💬",
  },
  {
    id: "operations-manager",
    name: "AI Operations Manager",
    role: "Operations & Processen",
    description:
      "Optimaliseert workflows, bewaakt deadlines, coördineert tussen teams en signaleert bottlenecks.",
    avatar: "⚙️",
  },
  {
    id: "data-analyst",
    name: "AI Data Analyst",
    role: "Data & Inzichten",
    description:
      "Duikt in je data, vindt patronen, bouwt dashboards en vertaalt cijfers naar actionable inzichten.",
    avatar: "📈",
  },
];

function ColleagueCard({ colleague }: { colleague: Colleague }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (colleague.audioSrc && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group w-full text-left bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
      aria-label={`${colleague.name} — klik om te beluisteren`}
    >
      {/* Avatar */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sage/10 flex items-center justify-center text-4xl md:text-5xl mb-4 group-hover:bg-sage/20 transition-colors">
        {colleague.avatar}
      </div>

      {/* Name & role */}
      <h3 className="font-serif text-xl md:text-2xl text-grey leading-snug">
        {colleague.name}
      </h3>
      <p className="text-sm text-sage font-medium mt-1">{colleague.role}</p>

      {/* Description */}
      <p className="mt-3 text-grey/70 font-light leading-relaxed text-[15px]">
        {colleague.description}
      </p>

      {/* Audio indicator */}
      <div className="mt-4 flex items-center gap-2 text-sm text-grey/40">
        {colleague.audioSrc ? (
          <>
            <span className={playing ? "text-sage" : ""}>
              {playing ? "⏸ Pauzeren" : "▶ Beluister introductie"}
            </span>
          </>
        ) : (
          <span className="italic">🎙 Audio binnenkort beschikbaar</span>
        )}
      </div>

      {/* Hidden audio element */}
      {colleague.audioSrc && (
        <audio
          ref={audioRef}
          src={colleague.audioSrc}
          onEnded={() => setPlaying(false)}
          preload="none"
        />
      )}
    </button>
  );
}

export default function DigitaleCollegasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Digitale Collega&apos;s
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 max-w-[600px] mx-auto">
              Geen chatbots. Geen speelgoed. Digitale collega&apos;s die putten
              uit de collectieve intelligentie van jouw bedrijf.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-4 text-base font-light text-grey/50">
              Klik op een collega om de introductie te beluisteren.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Colleagues grid */}
      <section className="py-10 md:py-16 px-6 pb-20 md:pb-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {colleagues.map((colleague, i) => (
              <FadeIn key={colleague.id} delay={i * 100}>
                <ColleagueCard colleague={colleague} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={400}>
          <div className="max-w-[680px] mx-auto text-center mt-16">
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
