/**
 * De capaciteitenkaart — wat het platform aantoonbaar kan, in gewone taal.
 *
 * Dit is de WHITELIST voor elke uitspraak in het rapport die verder gaat dan
 * beschrijven wat de invuller zelf vertelde. De regel uit
 * `gtm/scan/voorstel-rapport-verbeelding-2026-08-13.md`:
 *
 *   Elke zin over wat er mogelijk wordt is het product van precies twee
 *   bronnen: iets dat de invuller zelf heeft gezegd, en een capaciteit uit
 *   deze kaart. Er is geen derde bron.
 *
 * Het model mag alleen naar deze ids verwijzen; `report.ts` gooit een claim
 * met een onbekend id weg (membership guard, zelfde patroon als
 * insightflow `app/api/brain.py`: een label buiten de meegestuurde lijst
 * wordt genull'd in plaats van vertrouwd).
 *
 * NIET_MOGELIJK is even belangrijk als de kaart zelf: modellen vullen gaten,
 * dus de gaten staan hier expliciet ingevuld.
 *
 * Geverifieerd tegen origin/main van insightflow + insightflow-platform op
 * 2026-08-13. Komt er iets bij in het platform, dan komt er een kaart bij —
 * nooit andersom.
 */

export interface ScanCapability {
  id: string;
  /** Wat het is, in gewone taal, zoals het in een rapport mag klinken. */
  wat: string;
  /** Wat er van de klant voor nodig is. Gaat ALTIJD mee in de zin. */
  voorwaarde: string;
  /** Waar het zit — alleen voor ons, komt nooit in een rapport. */
  bewijs: string;
}

export const CAPABILITIES: readonly ScanCapability[] = [
  {
    id: "vergaderinname",
    wat: "De gesprekken die er toch al zijn komen binnen via de notulist die het bedrijf al gebruikt. Elk gesprek landt als doorzoekbare bron en als regel op de tijdlijn van de mensen en bedrijven die erbij waren.",
    voorwaarde: "Iemand notuleert met zo'n tool, en minstens één deelnemer staat in het klantenbestand.",
    bewijs: "platform lib/integrations/granola-sync.ts + lib/brain/capture-ingest.ts",
  },
  {
    id: "gesprekstypes",
    wat: "Gesprekken worden ingedeeld in types die je zelf benoemt, met vaste notulisten per type, zodat je vijftig gesprekken van hetzelfde soort naast elkaar kunt leggen in plaats van er één samen te vatten.",
    voorwaarde: "Types instellen, en er moet genotuleerd worden.",
    bewijs: "platform lib/brain/meetings-ledger.ts + meeting-type-match.ts",
  },
  {
    id: "interview",
    wat: "Het systeem voert zelf een gesprek met iemand en legt per vraag vast wat diegene antwoordt, inclusief wat hij er spontaan bij vertelt. Een mens keurt goed voordat het meetelt.",
    voorwaarde: "Iemand voert dat gesprek, en een beheerder keurt goed.",
    bewijs: "platform api/interviews/*, engine app/integrations/tavus/conversation.py",
  },
  {
    id: "gesprekken-extern",
    wat: "Dezelfde gespreksinname bij mensen buiten het bedrijf: klanten, kandidaten, leveranciers. Zij hebben geen account nodig.",
    voorwaarde: "Je moet die mensen uitnodigen en ze moeten meedoen.",
    bewijs: "platform api/studies, engine app/api/studies.py",
  },
  {
    id: "kennis-herkomst",
    wat: "Elk vastgelegd feit heeft een eigenaar, een herkomst en een datum waarop het voor het laatst is nagekeken. Antwoorden verwijzen naar de bron waar ze vandaan komen.",
    voorwaarde: "De kennis moet erin staan; wat nergens is vastgelegd kan ook niet worden aangehaald.",
    bewijs: "Brain-datamodel + retrieval met citaten",
  },
  {
    id: "zichtbaarheid",
    wat: "Per feit ligt vast wie het mag zien, en die regel geldt ook wanneer iemand het via zijn eigen AI-tool opvraagt.",
    voorwaarde: "Iemand moet die regels een keer bepalen.",
    bewijs: "zichtbaarheidsroutering in de zoekindex, ook over MCP",
  },
  {
    id: "eigen-ai-tool",
    wat: "Je koppelt de vastgelegde bedrijfskennis aan de AI-tool die je al gebruikt, dus niemand hoeft over te stappen om er iets aan te hebben.",
    voorwaarde: "De koppeling moet worden aangezet.",
    bewijs: "engine app/mcp/server.py (search, fetch, ask, add_fact, describe_brain, brain_health)",
  },
  {
    id: "email-koppeling",
    wat: "Correspondentie met een klant komt als samenvatting op de tijdlijn van die klant terecht.",
    voorwaarde: "Alleen met toestemming per persoon, en het staat standaard uit.",
    bewijs: "engine app/capture/service.py",
  },
  {
    id: "ritme",
    wat: "Werk draait op een vast moment, zonder dat iemand het start.",
    voorwaarde: "De workflow moet bestaan.",
    bewijs: "engine app/scheduler/",
  },
  {
    id: "documenten-en-beeld",
    wat: "Een workflow levert een document, een overzicht of beeld op, binnen instelbare grenzen.",
    voorwaarde: "Het moet als workflow zijn ingericht.",
    bewijs: "engine app/skills/ (media, image), documents",
  },
  {
    id: "naar-buiten-kijken",
    wat: "Onderzoek naar buiten: zoekresultaten, nieuws, wetenschappelijke bronnen en wat er online over een markt te vinden is, samengevat tegen de eigen situatie.",
    voorwaarde: "Het moet als workflow zijn ingericht.",
    bewijs: "engine app/skills/ (perplexity, tavily, newsapi, openalex, seo_serp, socialdata)",
  },
  {
    id: "kanaaldata",
    wat: "Cijfers uit de kanalen die je gebruikt ophalen, en er via diezelfde kanalen weer iets uit publiceren.",
    voorwaarde: "Per kanaal moet er een koppeling zijn; niet elk systeem is er een.",
    bewijs: "engine app/integrations/providers/ (gmail, outlook, google_ads, linkedin, instagram, ayrshare, zoho_crm)",
  },
  {
    id: "profielen",
    wat: "Profielen per persoon en per bedrijf die zich laten bijwerken, met de interactietijdlijn eronder.",
    voorwaarde: "Het klantenbestand moet gevuld zijn.",
    bewijs: "platform api/sales/profiles",
  },
  {
    id: "menselijke-poort",
    wat: "AI stelt voor, een mens beslist. Niets komt ongezien in de vastgelegde kennis of naar buiten.",
    voorwaarde: "Standaard zo, en dat blijft werk voor een mens.",
    bewijs: "engine app/agents/approval.py + goedkeuringsroutes",
  },
  {
    id: "workflow-samenstellen",
    wat: "Je beschrijft welk werk je gedaan wilt hebben en het systeem stelt de workflow samen uit bestaande onderdelen, met een controle die eerlijk nee zegt als de vastgelegde kennis nog niet toereikend is.",
    voorwaarde: "Een intake, en soms een onderdeel dat nog gebouwd moet worden.",
    bewijs: "factory + library",
  },
];

/** De negatieve ruimte. Nooit iets beweren dat hier tegenin gaat. */
export const NIET_MOGELIJK: readonly string[] = [
  "Het platform luistert niet mee en neemt zelf geen gesprekken op. Zonder notulist in de vergadering komt er niets binnen.",
  "Een gesprek wordt alleen vastgelegd als minstens één deelnemer in het klantenbestand staat. Gesprekken tussen onbekende partijen worden nooit bewaard.",
  "Vastgelegde gesprekken zijn privé tot degene die notuleerde ze deelt. Het hele bedrijf kan er dus niet vanzelf bij.",
  "Handelingen in externe systemen buiten de bestaande koppelingen zijn maatwerk, geen knop.",
  "Medische en andere gevoelige gegevens gaan er niet in.",
  "Er wordt nooit een uitspraak gedaan over hoe lang iets duurt, wat het kost of wat het bespaart.",
  "Er wordt nooit beweerd dat ons taalmodel beter of slimmer is dan het model dat zij al gebruiken. Het verschil zit in wat eromheen staat.",
];

export const CAPABILITY_IDS: ReadonlySet<string> = new Set(
  CAPABILITIES.map((c) => c.id),
);

/** De kaart als promptblok. Eén plek, zodat prompt en guard nooit uiteenlopen. */
export function capabilitiesPromptBlock(): string {
  const kaart = CAPABILITIES.map(
    (c) => `- ${c.id}: ${c.wat} VOORWAARDE: ${c.voorwaarde}`,
  ).join("\n");
  const grenzen = NIET_MOGELIJK.map((r) => `- ${r}`).join("\n");
  return `## De capaciteitenkaart — het ENIGE dat je over onze mogelijkheden mag beweren\n\n${kaart}\n\n## Wat NIET kan, en dus nooit ergens in doorklinkt\n\n${grenzen}`;
}
