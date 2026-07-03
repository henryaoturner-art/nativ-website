// AI Events data layer — aggregates AI events from Luma + Meetup, live.
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

// Curated NL AI Meetup groups. Read directly (not via keyword search, which is
// ranked/near-term and silently drops groups' later-in-the-year events). Wrong or
// dead urlnames simply contribute nothing — safe to keep speculative entries.
// Every event is still geo-filtered to NL + online below, so global brands
// (e.g. AI Builders) only surface their Amsterdam editions.
// To add a group: open meetup.com/<urlname>/ and copy the urlname from the URL.
const MEETUP_GROUPS: string[] = [
  "ai-native-amsterdam", // AI Native Netherlands
  "ai-on-the-amstel-meetup", // AI on the Amstel
  "pydata-nl", // PyData NL
  "platform-engineering-nl",
  "amsterdam-ai-developers-group",
  "amsterdam-data-science", // Amsterdam AI (AAI)
  "aibuildersclub", // AI Builders (global — NL editions only after geo-filter)
  "haarlem-code-collective",
  "dutch-cloud-native", // Dutch Cloud Native & AI
  "gen-ai-amsterdam", // GenAI Amsterdam
];

// MLM / "get rich with AI" spam that clutters Meetup's AI search.
const SPAM =
  /online income|passive income|make money|money online|financial freedom|side hustle|work from home|earn \$|get rich|dropship|shopify|amazon fba|crypto|forex|business opportunit|\bincome\b/i;

// Global brands (e.g. AI Builders) run city editions worldwide, and Meetup's venue
// data sometimes mislabels a foreign edition's country as "nl". A foreign city in the
// title is the reliable tell — drop those so only the NL editions remain.
// Note: only distinctly-foreign metros that show up as global-brand editions.
// Deliberately excludes ambiguous names that collide with NL venue names
// (e.g. "Chicago" in Amsterdam's "Boom Chicago" theatre).
const FOREIGN_CITY =
  /\b(london|berlin|miami|lisbon|hamburg|paris|madrid|barcelona|dublin|munich|cologne|frankfurt|warsaw|vienna|zurich|geneva|milan|yerevan|tbilisi|athens|singapore|bangalore|bengaluru|mumbai|delhi|hyderabad|chennai|tokyo|kyoto|seoul|sydney|melbourne|toronto|montreal|nairobi|lagos|istanbul|dubai|riyadh|tel aviv|stockholm|copenhagen|oslo|helsinki|prague|budapest|bucharest|mexico city|bogota|buenos aires|new york|san francisco|los angeles|las vegas|hong kong|taipei|shanghai|beijing|jakarta|manila|bangkok|kuala lumpur)\b/i;

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

type MeetupRaw = {
  id: string;
  title: string;
  dateTime: string;
  endTime?: string;
  eventUrl: string;
  online: boolean;
  city?: string;
  country: string; // lowercase ISO, e.g. "nl"
  groupName?: string;
};

// Meetup group pages normalize data into an Apollo cache: `props.pageProps
// .__APOLLO_STATE__` maps "Event:<id>" / "Venue:<id>" -> entity, and an event's
// venue/group is a `{ __ref: "Venue:<id>" }` pointer. Find that store.
function findApolloState(node: unknown): Record<string, Record<string, unknown>> | null {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    const obj = node as Record<string, unknown>;
    if (Object.keys(obj).some((k) => k.startsWith("Event:") || k.startsWith("Venue:"))) {
      return obj as Record<string, Record<string, unknown>>;
    }
    for (const v of Object.values(obj)) {
      const found = findApolloState(v);
      if (found) return found;
    }
  }
  return null;
}

// Fallback for pages that inline Event nodes instead of normalizing them.
function collectInlineEvents(node: unknown, acc: Record<string, unknown>[]): void {
  if (Array.isArray(node)) {
    for (const child of node) collectInlineEvents(child, acc);
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj.__typename === "Event" && typeof obj.title === "string" && typeof obj.dateTime === "string") {
      acc.push(obj);
    }
    for (const v of Object.values(obj)) collectInlineEvents(v, acc);
  }
}

function parseMeetupHtml(html: string): MeetupRaw[] {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return [];
  let json: unknown;
  try {
    json = JSON.parse(m[1]);
  } catch {
    return [];
  }

  const cache = findApolloState(json);
  const events: Record<string, unknown>[] = cache
    ? Object.entries(cache)
        .filter(([k]) => k.startsWith("Event:"))
        .map(([, v]) => v)
    : (() => {
        const acc: Record<string, unknown>[] = [];
        collectInlineEvents(json, acc);
        return acc;
      })();

  // Resolve an inline object or an Apollo `{ __ref }` pointer to its entity.
  const deref = (val: unknown): Record<string, unknown> | undefined => {
    if (!val || typeof val !== "object") return undefined;
    const ref = (val as Record<string, unknown>).__ref;
    if (typeof ref === "string") return cache?.[ref];
    return val as Record<string, unknown>;
  };

  const out: MeetupRaw[] = [];
  for (const e of events) {
    const id = String(e.id ?? "");
    const title = e.title ? String(e.title) : "";
    const dateTime = e.dateTime ? String(e.dateTime) : "";
    if (!id || !title || !dateTime) continue;
    const venue = deref(e.venue);
    const group = deref(e.group);
    out.push({
      id,
      title,
      dateTime,
      endTime: e.endTime ? String(e.endTime) : undefined,
      eventUrl: e.eventUrl ? String(e.eventUrl) : "",
      online: String(e.eventType ?? "").toUpperCase() === "ONLINE",
      city: venue?.city ? String(venue.city) : group?.city ? String(group.city) : undefined,
      country: String(venue?.country ?? group?.country ?? "").toLowerCase(),
      groupName: group?.name ? String(group.name) : "",
    });
  }
  return out;
}

async function fetchMeetupPage(url: string): Promise<MeetupRaw[]> {
  const res = await fetchWithTimeout(url, 8000);
  if (!res || !res.ok) return [];
  try {
    return parseMeetupHtml(await res.text());
  } catch {
    return [];
  }
}

async function fetchMeetup(): Promise<AgendaEvent[]> {
  const raw = (
    await Promise.all(
      MEETUP_GROUPS.map((g) =>
        fetchMeetupPage(`https://www.meetup.com/${g}/events/`).catch(() => [] as MeetupRaw[]),
      ),
    )
  ).flat();

  const out: AgendaEvent[] = [];
  const seen = new Set<string>();
  for (const e of raw) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    if (!e.eventUrl) continue;
    if (isSpam(e.title, e.groupName)) continue;
    // NL-breed + online: physical events must resolve to NL (drops foreign
    // editions of global brands); online events from these NL AI groups are kept.
    if (!e.online && e.country !== "nl") continue;
    // Belt-and-braces: a foreign city in the title overrides a mislabeled "nl".
    if (!e.online && FOREIGN_CITY.test(e.title)) continue;

    out.push({
      id: `meetup-${e.id}`,
      title: e.title,
      start: e.dateTime,
      end: e.endTime,
      locationType: e.online ? "online" : "in-person",
      city: e.online ? undefined : e.city,
      host: e.groupName || "Meetup",
      url: e.eventUrl,
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
