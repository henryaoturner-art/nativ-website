"use client";

import { useMemo, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import type { AgendaEvent } from "@/lib/events";

type Filter = "all" | "online" | "in-person";

const copy = {
  nl: {
    title: "AI Agenda",
    sub: "De AI-events, meetups en workshops die er in Nederland en online toe doen — op één plek, altijd actueel.",
    source: "Live samengesteld uit Luma en Meetup",
    all: "Alles",
    online: "Online",
    inPerson: "Op locatie",
    empty: "Geen komende events gevonden. Kom snel terug — de lijst ververst automatisch.",
    online_pill: "Online",
    register: "Aanmelden",
    by: "door",
    foot: "Events worden verzameld via Luma en Meetup. Nativ organiseert deze events niet zelf — aanmelden gebeurt bij de organisator.",
    locale: "nl-NL",
  },
  en: {
    title: "AI Agenda",
    sub: "The AI events, meetups and workshops that matter in the Netherlands and online — in one place, always current.",
    source: "Compiled live from Luma and Meetup",
    all: "All",
    online: "Online",
    inPerson: "In person",
    empty: "No upcoming events found. Check back soon — the list refreshes automatically.",
    online_pill: "Online",
    register: "Sign up",
    by: "by",
    foot: "Events are gathered from Luma and Meetup. Nativ does not host these events — registration happens with the organizer.",
    locale: "en-GB",
  },
};

export default function AgendaView({ events }: { events: AgendaEvent[] }) {
  const { t, language } = useLanguage();
  const c = t(copy);
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.locationType === filter)),
    [events, filter],
  );

  const months = useMemo(() => groupByMonth(shown, c.locale), [shown, c.locale]);

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return {
      day: d.toLocaleDateString(c.locale, { day: "numeric" }),
      month: d.toLocaleDateString(c.locale, { month: "short" }).replace(".", ""),
      weekday: d.toLocaleDateString(c.locale, { weekday: "short" }).replace(".", ""),
      time: d.toLocaleTimeString(c.locale, { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: c.all },
    { id: "online", label: c.online },
    { id: "in-person", label: c.inPerson },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              {c.title}
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70">{c.sub}</p>
          </FadeIn>
          <FadeIn delay={250}>
            <p className="mt-4 text-sm text-grey/45">{c.source}</p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6">
        <div className="max-w-[820px] mx-auto flex flex-wrap justify-center gap-2.5 pb-10">
          {chips.map((chip) => {
            const on = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`text-sm px-5 py-2 rounded-full border transition-colors ${
                  on
                    ? "bg-sage border-sage text-white"
                    : "bg-transparent border-grey/15 text-grey/70 hover:border-sage hover:text-sage"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* List */}
      <section className="px-6 pb-24">
        <div className="max-w-[820px] mx-auto">
          {shown.length === 0 && (
            <p className="text-center text-grey/50 font-light py-12">{c.empty}</p>
          )}

          {months.map((m) => (
            <div key={m.key}>
              <h2 className="font-serif text-[15px] tracking-[0.12em] uppercase text-sage-dark mt-8 first:mt-0 mb-4 pb-2.5 border-b border-sage/25">
                {m.label}
              </h2>
              <div className="space-y-3.5">
                {m.events.map((e, i) => {
                  const d = fmt(e.start);
                  return (
                    <FadeIn key={e.id} delay={Math.min(i * 60, 300)}>
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-wrap sm:flex-nowrap items-start gap-4 sm:gap-6 bg-white rounded-2xl px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] hover:-translate-y-0.5"
                      >
                        {/* Date badge */}
                        <div className="flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0 sm:w-[58px] sm:flex-none sm:text-center sm:border-r border-grey/10 sm:pr-5">
                          <span className="font-serif text-3xl leading-none text-grey">{d.day}</span>
                          <span className="text-xs tracking-widest uppercase text-sage-dark sm:mt-1.5">{d.month}</span>
                          <span className="text-[11px] text-grey/50 sm:mt-1">{d.weekday}</span>
                        </div>

                        {/* Body */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg md:text-xl text-grey leading-snug">{e.title}</h3>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[13.5px] text-grey/70">
                            {e.locationType === "online" ? (
                              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-light text-sage-dark">
                                {c.online_pill}
                              </span>
                            ) : (
                              <span className="text-xs px-2.5 py-0.5 rounded-full bg-grey/[0.07] text-grey">
                                {e.city || "Nederland"}
                              </span>
                            )}
                            <span>{d.time}</span>
                            <span className="text-grey/40">·</span>
                            <span className="capitalize">{e.source}</span>
                          </div>
                          {e.host && (
                            <p className="mt-2 text-[13.5px] text-grey/55">
                              {c.by} {e.host}
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <span className="self-center text-sm text-sage-dark whitespace-nowrap group-hover:text-sage">
                          {c.register} →
                        </span>
                      </a>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="bg-white border-t border-grey/10 py-10 px-6 text-center text-[13.5px] text-grey/55">
        <p className="max-w-[640px] mx-auto">{c.foot}</p>
      </div>
    </>
  );
}

function groupByMonth(events: AgendaEvent[], locale: string) {
  const map = new Map<string, { key: string; label: string; events: AgendaEvent[] }>();
  for (const e of events) {
    const d = new Date(e.start);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    let bucket = map.get(key);
    if (!bucket) {
      const label = d.toLocaleDateString(locale, { month: "long", year: "numeric" });
      bucket = { key, label: label.charAt(0).toUpperCase() + label.slice(1), events: [] };
      map.set(key, bucket);
    }
    bucket.events.push(e);
  }
  return [...map.values()];
}
