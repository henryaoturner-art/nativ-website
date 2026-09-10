"use client";

import { useMemo, useState } from "react";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { AgendaEvent } from "@/lib/events";

type Filter = "all" | "online" | "in-person";

const copy = {
  nl: {
    title: "AI Events",
    sub: "De AI-events, meetups en workshops die er in Nederland en online toe doen, op één plek, altijd actueel.",
    source: "Live samengesteld uit Luma en Meetup",
    all: "Alles",
    online: "Online",
    inPerson: "Op locatie",
    empty: "Geen komende events gevonden. Kom snel terug, de lijst ververst automatisch.",
    online_pill: "Online",
    register: "Aanmelden",
    toEvent: "Naar het event",
    by: "door",
    foot: "Events worden verzameld via Luma en Meetup. nativ organiseert deze events niet zelf, aanmelden gebeurt bij de organisator.",
    locale: "nl-NL",
  },
  en: {
    title: "AI Events",
    sub: "The AI events, meetups and workshops that matter in the Netherlands and online, in one place, always current.",
    source: "Compiled live from Luma and Meetup",
    all: "All",
    online: "Online",
    inPerson: "In person",
    empty: "No upcoming events found. Check back soon, the list refreshes automatically.",
    online_pill: "Online",
    register: "Sign up",
    toEvent: "To the event",
    by: "by",
    foot: "Events are gathered from Luma and Meetup. nativ does not host these events, registration happens with the organizer.",
    locale: "en-GB",
  },
};

// Kicker-stijl (B1) voor de datum in een rij. Als losse klassen en niet als
// <Kicker>, omdat die component 12px ruimte eronder zet en de rij die niet heeft.
const kickerCls = "text-xs font-semibold uppercase tracking-[0.12em] text-sage-dark";

// Scheidingspunt in een secundaire regel (B3): een 6px Sage-punt in plaats van het losse middelpunt-teken.
function Dot() {
  return <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />;
}

export default function AgendaView({ events }: { events: AgendaEvent[] }) {
  const { t } = useLanguage();
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
    <Section hero>
      {/* Hero: titel, intro en bronregel links, de filters ernaast (D7 + B4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-end">
        <div className="md:col-span-7">
          <FadeIn>
            <h1 className="font-serif text-grey">{c.title}</h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 max-w-[640px] text-lg text-grey leading-relaxed">{c.sub}</p>
          </FadeIn>
          <FadeIn delay={250}>
            <p className="mt-4 text-sm text-muted">{c.source}</p>
          </FadeIn>
        </div>
        <FadeIn delay={250} className="md:col-span-5">
          <div className="flex flex-wrap gap-2.5 md:justify-end">
            {chips.map((chip) => {
              const on = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={`text-sm px-5 py-2 rounded-lg border transition-colors cursor-pointer ${
                    on
                      ? "bg-grey border-grey text-cream"
                      : "bg-transparent border-border text-grey hover:bg-sand"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </FadeIn>
      </div>

      {/* Per maand een kop, daaronder de events als compacte rijen in twee kolommen (D7) */}
      <div className="mt-12 md:mt-16">
        {shown.length === 0 && <p className="text-muted py-12">{c.empty}</p>}

        {months.map((m, mi) => (
          <div key={m.key} className={mi > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-grey">{m.label}</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {m.events.map((e, i) => {
                const d = fmt(e.start);
                return (
                  <FadeIn key={e.id} delay={Math.min(i * 60, 300)}>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-wrap sm:flex-nowrap items-start gap-x-5 gap-y-3 bg-white border border-border rounded-lg p-4 transition-colors hover:border-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey"
                    >
                      {/* Datum in kicker-stijl, links */}
                      <div className="flex flex-wrap items-baseline gap-x-3 sm:block sm:w-24 sm:shrink-0 sm:pt-1">
                        <p className={`${kickerCls} whitespace-nowrap`}>
                          {d.weekday} {d.day} {d.month}
                        </p>
                        <p className="text-sm text-muted sm:mt-1">{d.time}</p>
                      </div>

                      {/* Titel, plaats en organisator, link */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-xl text-grey">{e.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                            <span>{e.locationType === "online" ? c.online_pill : e.city || "Nederland"}</span>
                            {e.host && (
                              <>
                                <Dot />
                                <span>
                                  {c.by} {e.host}
                                </span>
                              </>
                            )}
                            <Dot />
                            <span className="capitalize">{e.source}</span>
                          </p>
                          <span className="ml-auto inline-flex items-center gap-2 whitespace-nowrap font-medium text-base text-grey underline underline-offset-4 decoration-1 decoration-sage-dark group-hover:decoration-grey">
                            {c.toEvent}
                            <ArrowRight
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                              className="shrink-0 text-sage-dark transition-transform duration-150 group-hover:translate-x-0.5"
                            />
                          </span>
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bronregel: blijft (D7) */}
      <p className="mt-12 md:mt-16 border-t border-border pt-6 text-sm text-muted">{c.foot}</p>
    </Section>
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
