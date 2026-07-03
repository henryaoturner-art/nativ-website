// AI Agenda data layer — aggregates AI events from Luma + Meetup, live.
//
// Two public feeds, no auth, read-only:
//  - Luma:   per-calendar API (api.lu.ma/calendar/get-items) over a curated set
//            of AI calendars. Note: some calendars (e.g. "AI Builders") are global
//            brands, so we still geo-filter every event to NL + online.
//  - Meetup: the public find page (meetup.com/find) pinned to the Netherlands;
//            events are server-rendered into __NEXT_DATA__, which we parse.
//
// Everything is filtered to NL + online, spam is dropped, duplicates merged,
// then grouped by month. Each source is wrapped so one failing feed never breaks
// the page — worst case a source contributes nothing and we render what we have.
//
// To broaden coverage: add a calendar id to LUMA_CALENDARS (resolve it once by
// opening luma.com/<slug> and grepping the page for a `cal-...` id).

export type AgendaEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end?: string;
  locationType: "online" | "in-person";
  city?: string;
  host: string;
  url: string;
  source: "luma" | "meetup";
};

const REVALIDATE = 60 * 60 * 6; // 6h — feeds refresh a few times a day
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";

// Curated Luma calendars. Global brands are kept because their NL editions +
// online series are relevant; the geo-filter below drops their foreign in-person
// events automatically.
const LUMA_CALENDARS: { id: string; name: string }[] = [
  { id: "cal-mc9ZW5C3TzHDv6L", name: "Latent.Space" },
  { id: "cal-E74MDlDKBaeAwXK", name: "GenAI Collective" },
  { id: "cal-cIL2FvDfGyDzLLI", name: "AI Builders" },
  { id: "cal-TOpA5LAFfuDeFpu", name: "Claude Community" },
  { id: "cal-iOipAs7mv59Hbuz", name: "OpenClaw Meetups" },
];

// Center of the Netherlands — pins Meetup's location search to NL.
const MEETUP_URL =
  "https://www.meetup.com/find/?keywords=ai&source=EVENTS&location=nl--Amsterdam&lat=52.1326&lon=5.2913";

// MLM / "get rich with AI" spam that clutters Meetup's AI search.
const SPAM =
  /online income|passive income|make money|money online|financial freedom|side hustle|work from home|earn \$|get rich|dropship|shopify|amazon fba|crypto|forex|business opportunit|\bincome\b/i;

async function fetchWithTimeout(url: string, ms = 6000): Promise<Response | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "application/json,text/html" },
      next: { revalidate: REVALIDATE },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function isSpam(...parts: (string | undefined)[]): boolean {
  return SPAM.test(parts.filter(Boolean).join(" "));
}

// ---------- Luma ----------

type LumaEntry = {
  event?: {
    api_id?: string;
    name?: string;
    start_at?: string;
    end_at?: string;
    url?: string;
    geo_address_info?: { country_code?: string; city?: string; city_state?: string } | null;
  };
};

async function fetchLuma(): Promise<AgendaEvent[]> {
  const out: AgendaEvent[] = [];
  await Promise.all(
    LUMA_CALENDARS.map(async (cal) => {
      const res = await fetchWithTimeout(
        `https://api.lu.ma/calendar/get-items?calendar_api_id=${cal.id}&period=future&pagination_limit=25`,
      );
      if (!res || !res.ok) return;
      let data: { entries?: LumaEntry[] };
      try {
        data = await res.json();
      } catch {
        return;
      }
      for (const entry of data.entries ?? []) {
        const e = entry.event;
        if (!e?.name || !e.start_at || !e.url) continue;
        const geo = e.geo_address_info;
        const online = !geo;
        const nl = geo?.country_code === "NL";
        if (!online && !nl) continue; // keep NL + online only
        if (isSpam(e.name)) continue;
        out.push({
          id: `luma-${e.api_id ?? e.url}`,
          title: e.name.trim(),
          start: e.start_at,
          end: e.end_at,
          locationType: online ? "online" : "in-person",
          city: online ? undefined : geo?.city || geo?.city_state,
          host: cal.name,
          url: `https://lu.ma/${e.url}`,
          source: "luma",
        });
      }
    }),
  );
  return out;
}

// ---------- Meetup ----------

// Walk the __NEXT_DATA__ JSON tree collecting GraphQL Event nodes.
function collectMeetupEvents(node: unknown, acc: Record<string, unknown>[]): void {
  if (Array.isArray(node)) {
    for (const child of node) collectMeetupEvents(child, acc);
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj.__typename === "Event" && typeof obj.title === "string" && typeof obj.dateTime === "string") {
      acc.push(obj);
    }
    for (const v of Object.values(obj)) collectMeetupEvents(v, acc);
  }
}

async function fetchMeetup(): Promise<AgendaEvent[]> {
  const res = await fetchWithTimeout(MEETUP_URL, 8000);
  if (!res || !res.ok) return [];
  let html: string;
  try {
    html = await res.text();
  } catch {
    return [];
  }
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return [];
  let json: unknown;
  try {
    json = JSON.parse(m[1]);
  } catch {
    return [];
  }
  const nodes: Record<string, unknown>[] = [];
  collectMeetupEvents(json, nodes);

  const out: AgendaEvent[] = [];
  const seen = new Set<string>();
  for (const e of nodes) {
    const id = String(e.id ?? "");
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const venue = (e.venue as Record<string, unknown> | undefined) ?? undefined;
    const group = (e.group as Record<string, unknown> | undefined) ?? undefined;
    const title = String(e.title);
    const groupName = group?.name ? String(group.name) : "";
    if (isSpam(title, groupName)) continue;

    const venueCountry = venue?.country ? String(venue.country).toLowerCase() : "";
    const groupCountry = group?.country ? String(group.country).toLowerCase() : "";
    const online = String(e.eventType ?? "").toUpperCase() === "ONLINE" || !venue;
    const nl = venueCountry === "nl" || groupCountry === "nl";
    // NL-breed + online: physical events must be in NL; online events must come
    // from an NL group (keeps out worldwide online spam).
    if (!nl) continue;

    const city = venue?.city ? String(venue.city) : group?.city ? String(group.city) : undefined;
    const url = e.eventUrl ? String(e.eventUrl) : "";
    if (!url) continue;

    out.push({
      id: `meetup-${id}`,
      title,
      start: String(e.dateTime),
      end: e.endTime ? String(e.endTime) : undefined,
      locationType: online ? "online" : "in-person",
      city: online ? undefined : city,
      host: groupName || "Meetup",
      url,
      source: "meetup",
    });
  }
  return out;
}

// ---------- Combine ----------

function dedupeKey(e: AgendaEvent): string {
  const day = e.start.slice(0, 10);
  const title = e.title.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24);
  return `${day}-${title}`;
}

export async function getAgendaEvents(): Promise<{ events: AgendaEvent[]; updatedAt: string }> {
  const [luma, meetup] = await Promise.all([
    fetchLuma().catch(() => [] as AgendaEvent[]),
    fetchMeetup().catch(() => [] as AgendaEvent[]),
  ]);

  const now = Date.now();
  const seen = new Set<string>();
  const all: AgendaEvent[] = [];
  // Meetup first so its richer NL records win on duplicates.
  for (const e of [...meetup, ...luma]) {
    const when = new Date(e.start).getTime();
    if (!Number.isFinite(when) || when < now - 2 * 60 * 60 * 1000) continue; // future only
    const key = dedupeKey(e);
    if (seen.has(key)) continue;
    seen.add(key);
    all.push(e);
  }

  all.sort((a, b) => a.start.localeCompare(b.start));
  return { events: all, updatedAt: new Date().toISOString() };
}
