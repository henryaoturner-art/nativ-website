"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

interface Colleague {
  id: string;
  name: string;
  tagline: string;
  image: string;
  audioSrc?: string;
}

const colleagues: Colleague[] = [
  {
    id: "alice",
    name: "Alice",
    tagline: "Personal Assistant.",
    image: "/images/colleagues/alice.jpg",
  },
  {
    id: "chrystal",
    name: "Chrystal",
    tagline: "Chrystal clear data analist.",
    image: "/images/colleagues/chrystal.jpg",
  },
  {
    id: "bill",
    name: "Bill",
    tagline: "All things finance. Covered.",
    image: "/images/colleagues/bill.jpg",
  },
  {
    id: "pablo",
    name: "Pablo",
    tagline: "Creative genius. (His words)",
    image: "/images/colleagues/pablo.jpg",
  },
  {
    id: "hunter",
    name: "Hunter",
    tagline: "Sales Tiger. Rawrrr.",
    image: "/images/colleagues/hunter.jpg",
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
      className="group flex flex-col items-center text-center cursor-pointer"
      aria-label={`${colleague.name} — klik om te beluisteren`}
    >
      {/* Photo card */}
      <div className="relative w-40 h-48 md:w-48 md:h-56 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:scale-[1.03]">
        <Image
          src={colleague.image}
          alt={colleague.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 160px, 192px"
        />

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-grey/70 to-transparent pt-10 pb-3 px-3">
          <p className="text-white font-serif text-xl md:text-2xl">
            {colleague.name}
          </p>
        </div>

        {/* Play indicator */}
        {colleague.audioSrc && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-sage text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            {playing ? "⏸" : "▶"}
          </div>
        )}
      </div>

      {/* Tagline */}
      <p className="mt-4 text-[15px] text-grey/70 font-light">
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
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Maak kennis met je nieuwe collega&apos;s
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Colleagues layout: Alice top center, 4 others below */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          {/* Alice — centered on top */}
          <div className="flex justify-center mb-10 md:mb-14">
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
