/**
 * Rapportgeneratie van de quick scan — server-only.
 *
 * Structuur en regels volgen gtm/scan/rapportstructuur-2026-08-07.md:
 * tien secties, waarvan 1/2/3/5/6/7 door het model worden geschreven en
 * 8/9/10 vaste, goedgekeurde copy zijn (die staan in de rapportpagina).
 * Harde regels: geen scores, geen besparingsbeloftes, geen prijzen, geen
 * termijnen, "digitale collega" komt nergens voor, "ruwe schatting" bij
 * lage zekerheid.
 *
 * Zonder ANTHROPIC_API_KEY is generatie niet beschikbaar; de scan werkt
 * dan gewoon door en het rapport volgt zodra de sleutel er is
 * (rapportpagina genereert bij eerste bezoek en bewaart het resultaat).
 */
import Anthropic from "@anthropic-ai/sdk";
import {
  COMPANY_QUESTIONS,
  DEPARTMENT_QUESTIONS,
  type ScanQuestion,
} from "./bank";
import { helpFor, storedLabels, type AnswerMap } from "./visibility";

export interface ReportWorkflowItem {
  naam: string;
  watHetNuIs: string;
  hoeVaak: string;
  watHetKost: string;
  waarHetBlijftLiggen: string;
  waaromDitZichLeent: string;
  alsErIetsMisgaat: string;
}

export interface ReportPayload {
  version: 1;
  language: "nl" | "en";
  gehoord: string;
  bekeken: string;
  ranglijst: {
    hierZouIkBeginnen: ReportWorkflowItem[];
    sterkeKandidaten: ReportWorkflowItem[];
    laterInteressant: string[];
  };
  waarWeZoudenBeginnen: string;
  uitzoeksuggesties: string[];
  waarJeInKuntGroeien: string;
}

export function reportGenerationAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const REPORT_SCHEMA = {
  type: "object",
  properties: {
    gehoord: { type: "string" },
    bekeken: { type: "string" },
    ranglijst: {
      type: "object",
      properties: {
        hierZouIkBeginnen: { type: "array", items: workflowItemSchema() },
        sterkeKandidaten: { type: "array", items: workflowItemSchema() },
        laterInteressant: { type: "array", items: { type: "string" } },
      },
      required: ["hierZouIkBeginnen", "sterkeKandidaten", "laterInteressant"],
      additionalProperties: false,
    },
    waarWeZoudenBeginnen: { type: "string" },
    uitzoeksuggesties: { type: "array", items: { type: "string" } },
    waarJeInKuntGroeien: { type: "string" },
  },
  required: [
    "gehoord",
    "bekeken",
    "ranglijst",
    "waarWeZoudenBeginnen",
    "uitzoeksuggesties",
    "waarJeInKuntGroeien",
  ],
  additionalProperties: false,
} as const;

function workflowItemSchema() {
  return {
    type: "object",
    properties: {
      naam: { type: "string" },
      watHetNuIs: { type: "string" },
      hoeVaak: { type: "string" },
      watHetKost: { type: "string" },
      waarHetBlijftLiggen: { type: "string" },
      waaromDitZichLeent: { type: "string" },
      alsErIetsMisgaat: { type: "string" },
    },
    required: [
      "naam",
      "watHetNuIs",
      "hoeVaak",
      "watHetKost",
      "waarHetBlijftLiggen",
      "waaromDitZichLeent",
      "alsErIetsMisgaat",
    ],
    additionalProperties: false,
  };
}

/** Vragen + antwoorden als leesbaar blok voor de prompt. Antwoorden zijn
 * opgeslagen als labels/tekst; multi-choice wordt uitgeklapt. */
function answersBlock(
  questions: readonly ScanQuestion[],
  answers: AnswerMap,
  lang: "nl" | "en",
): string {
  const lines: string[] = [];
  for (const question of questions) {
    const value = answers.get(question.id);
    if (value == null || value.trim() === "" || value.trim() === "[]") continue;
    const labels = storedLabels(question, value);
    const help = helpFor(question, answers, lang);
    lines.push(
      `### ${question.id}\nVraag: ${question.text[lang]}` +
        (help ? `\nToelichting bij de vraag: ${help}` : "") +
        `\nAntwoord: ${labels.join("; ")}`,
    );
  }
  return lines.join("\n\n");
}

const SYSTEM_PROMPT = `Je schrijft het rapport van de AI-scan van nativ, op basis van de antwoorden van één invuller (de quick scan, solo). Het rapport doet drie dingen, in deze volgorde: laten zien dat we hún bedrijf hebben gehoord, laten zien welk werk zich leent om door AI te laten doen en in welke volgorde, en één klein startpunt aanwijzen.

Rangschik op vijf factoren: (1) volume en herhaling (dept-wf-frequency plus aantallen in het procesverhaal, overdrachten uit co-handoffs, vinkjes uit dept-time-sinks), (2) tijd (dept-wf-hours of dept-wf-hours-own, gewogen met dept-wf-confidence), (3) veilig om te beginnen (uit het procesverhaal en dept-wf-stall: gaat het resultaat naar buiten, of blijft het binnen en is het terug te draaien), (4) past bij hun doel (co-goal, met co-ai-focus als tweede as en dept-first-hire als wens-signaal), (5) grip op de kennis (dept-wf-knowledge en co-knowledge-home). De eerste drie bepalen de volgorde, de laatste twee schuiven binnen die volgorde.

Secties die jij schrijft:
- gehoord: één alinea over hún bedrijf, in hun eigen woorden, opgebouwd uit co-profile en co-goal. Geen samenvatting van onze methode.
- bekeken: kort en eerlijk over de dekking. Dit is een solo-scan: de strekking is "Dit is jouw beeld van het bedrijf", met in één of twee zinnen wat er in kaart is gebracht.
- ranglijst: hierZouIkBeginnen bevat 1 workflow (soms 2), sterkeKandidaten 3 tot 5 als de antwoorden dat dragen (minder mag), laterInteressant de rest als één regel per stuk. Het doorgelopen proces uit dept-workflow-story is de kandidaat voor hierZouIkBeginnen; de overige vinkjes uit dept-time-sinks, de overdrachten uit co-handoffs en de wens uit dept-first-hire vullen de andere groepen. Items zonder urengetal laten dat eerlijk zien in watHetKost (bijvoorbeeld: "Hier heb je geen uren voor opgegeven").
- Per workflow-item: naam = de naam van het werk in hun woorden plus niets erbij; watHetNuIs = één zin uit hun eigen procesverhaal; hoeVaak = meerdere keren per dag / dagelijks / wekelijks / maandelijks; watHetKost = "Ongeveer X uur per week" in hun eigen opgave, met "ruwe schatting" erbij als dept-wf-confidence 1 of 2 was; waarHetBlijftLiggen = één zin uit dept-wf-stall; waaromDitZichLeent = één zin: het komt vaak voorbij, de stappen zijn elke keer hetzelfde, en de meeste beslissingen zijn dezelfde; alsErIetsMisgaat = "Je ziet het meteen en je draait het terug." of "Dit gaat naar buiten, dus hier kijkt altijd iemand mee voordat het weg is." (kies wat past bij het proces).
- waarWeZoudenBeginnen: één workflow, met in twee of drie zinnen waarom juist deze. Altijd dezelfde vorm: het komt vaak voorbij, het kost nu echt tijd, en als het misgaat is dat klein en omkeerbaar.
- uitzoeksuggesties: de vragen die de invuller zelf niet kon beantwoorden (co-blindspot, dept-cant-answer, dept-answer-where) teruggegeven als onderzoeksuggesties, drie tot vijf maximaal, met per stuk waar het antwoord volgens hen zit. Leeg laten als er niets te melden is.
- waarJeInKuntGroeien: één korte alinea. Geen roadmap, geen fasering, geen termijnen. Strekking: als de eerste workflow eenmaal loopt, ligt het werk uit de tweede groep voor de hand, en wat er over jullie manier van werken wordt vastgelegd komt daar ook weer bij van pas.

Harde regels: geen cijfer of readiness-score, geen sterren, geen percentages (de volgorde zelf is het oordeel). Geen besparingsbelofte en geen bedrag: rapporteer wat het werk nu kost, in hun eigen opgave. Geen prijzen. Geen termijnen en geen belofte over wanneer iets werkt. Het woord "digitale collega" komt nergens voor; het rapport levert workflows op. Wat de invuller al met AI geprobeerd heeft (co-ai-history) raad je niet opnieuw aan. Schrijf in gewone taal, korte zinnen, geen jargon, geen buzzwoorden, geen gedachtestreepjes. Schrijf in de taal van de antwoorden.`;

export async function generateReportPayload(input: {
  companyName: string;
  contactName: string;
  answers: AnswerMap;
  language: "nl" | "en";
}): Promise<ReportPayload> {
  if (!reportGenerationAvailable()) {
    throw new Error("ANTHROPIC_API_KEY is niet gezet");
  }
  const client = new Anthropic();

  const userContent =
    `Bedrijf: ${input.companyName}\nInvuller: ${input.contactName}\n\n` +
    `## Blok 1 · Jullie bedrijf\n\n${answersBlock(COMPANY_QUESTIONS, input.answers, input.language)}\n\n` +
    `## Blok 2 · Het werk\n\n${answersBlock(DEPARTMENT_QUESTIONS, input.answers, input.language)}`;

  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    output_config: {
      format: { type: "json_schema", schema: REPORT_SCHEMA },
    },
    messages: [{ role: "user", content: userContent }],
  });
  const response = await stream.finalMessage();

  if (response.stop_reason === "refusal") {
    throw new Error("Rapportgeneratie geweigerd door het model");
  }
  const text = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text",
  )?.text;
  if (!text) {
    throw new Error(`Geen tekst in modelrespons (stop_reason: ${response.stop_reason})`);
  }

  const parsed = JSON.parse(text) as Omit<ReportPayload, "version" | "language">;
  return { version: 1, language: input.language, ...parsed };
}
