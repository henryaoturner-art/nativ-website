"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

/* ── Digital Colleagues ── */
interface Colleague {
  id: string;
  name: string;
  tagline: string;
  color: string; // gradient accent
  audioSrc?: string;
}

const colleagues: Colleague[] = [
  {
    id: "lisa",
    name: "Lisa",
    tagline: "Jouw persoonlijke assistent.",
    color: "from-sage/30 to-sage/10",
  },
  {
    id: "max",
    name: "Max",
    tagline: "Marketing machine. Altijd aan.",
    color: "from-amber-200/40 to-amber-100/20",
  },
  {
    id: "Nova",
    name: "Nova",
    tagline: "Data-analist. Glashelder.",
    color: "from-blue-200/40 to-blue-100/20",
  },
  {
    id: "finn",
    name: "Finn",
    tagline: "Alles finance. Geregeld.",
    color: "from-emerald-200/40 to-emerald-100/20",
  },
  {
    id: "stella",
    name: "Stella",
    tagline: "Sales tijger. Rawrrr.",
    color: "from-rose-200/40 to-rose-100/20",
  },
];

function ColleagueCard({ colleague, index }: { colleague: Colleague; index: number }) {
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

  // Placeholder avatar colors per colleague
  const avatarColors = [
    "bg-sage/20",
    "bg-amber-100",
    "bg-blue-100",
    "bg-emerald-100",
    "bg-rose-100",
  ];

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center text-center cursor-pointer"
      aria-label={`${colleague.name} — klik om te beluisteren`}
    >
      {/* Photo card */}
      <div
        className={`relative w-36 h-44 md:w-44 md:h-52 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:scale-[1.03] ${avatarColors[index]}`}
      >
        {/* Placeholder avatar — replace with real photos */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/50 flex items-center justify-center text-4xl md:text-5xl font-serif text-grey/60">
            {colleague.name[0]}
          </div>
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent pt-8 pb-3 px-3">
          <p className="text-white font-serif text-lg md:text-xl font-medium">
            {colleague.name}
          </p>
        </div>

        {/* Play indicator */}
        {colleague.audioSrc && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-sage text-sm">
            {playing ? "⏸" : "▶"}
          </div>
        )}
      </div>

      {/* Tagline below card */}
      <p className="mt-3 text-sm md:text-[15px] text-grey/70 font-light max-w-[180px]">
        {colleague.tagline}
      </p>

      {/* Audio */}
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
              Maak kennis met je nieuwe collega&apos;s
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 max-w-[600px] mx-auto">
              Digitale collega&apos;s die putten uit de collectieve intelligentie
              van jouw bedrijf. Klik om ze te ontmoeten.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Colleagues row */}
      <section className="py-10 md:py-16 px-6 pb-20 md:pb-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {colleagues.map((colleague, i) => (
              <FadeIn key={colleague.id} delay={i * 100}>
                <ColleagueCard colleague={colleague} index={i} />
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
