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
import {
  CAPABILITY_IDS,
  VOORUITBLIK_CAPABILITY_IDS,
  capabilitiesPromptBlock,
} from "./capabilities";
import { helpFor, storedLabels, type AnswerMap } from "./visibility";

export interface ReportWorkflowItem {
  naam: string;
  watHetNuIs: string;
  hoeVaak: string;
  watHetKost: string;
  waarHetBlijftLiggen: string;
  waaromDitZichLeent: string;
  alsErIetsMisgaat: string;
  /** Optioneel: rapporten van vóór versie 2 hebben dit veld niet. */
  waarDeKennisZit?: string;
  /** Alleen bij teamrapporten: uit welke afdeling dit werk komt. */
  afdeling?: string;
}

/** Eén grens van hun huidige aanpak, met beide bronnen eraan vast: hun eigen
 * woorden (letterlijk, controleerbaar) en de capaciteit die het adresseert
 * (een id uit de kaart). Een grens zonder kloppende bronnen overleeft de
 * guard niet. */
export interface ReportLimit {
  grens: string;
  citaat: string;
  vraagId: string;
  capaciteit: string;
}

/** Hun eigen beeld van slagen, letterlijk uit co-success. Verschijnt als
 * citaat boven "waar je in kunt groeien"; verdwijnt als de guard het niet
 * letterlijk in hun antwoorden terugvindt. */
export interface ReportOwnPicture {
  citaat: string;
  vraagId: string;
}

/** Eén openstaande vraag van henzelf, met wat er nodig is om hem te kunnen
 * stellen. Vervangt de oude huiswerklijst (uitzoeksuggesties). */
export interface ReportOpenQuestion {
  vraag: string;
  citaat: string;
  vraagId: string;
  capaciteit: string;
  watErvoorNodigIs: string;
  status: "kan-nu" | "kan-zodra-vastgelegd" | "maatwerk";
}

/** Sectie A: hun eigen processtappen naast dezelfde keten, ingericht. */
export interface ReportBeforeAfter {
  workflow: string;
  citaat: string;
  vraagId: string;
  nu: string[];
  straks: { stap: string; capaciteit: string }[];
  watErvoorNodigIs: string;
}

/** Sectie A-bis: het kijkje vooruit. Niet dezelfde keten ingericht (dat is
 * `straks`), maar hoe dit werk eruit zou zien als je het vandaag vanaf nul
 * zou opzetten. Minder stappen, en per verdwenen stap waarom die er ooit was. */
export interface ReportFromScratch {
  keten: { stap: string; capaciteit: string }[];
  /** Eén zin: wat er verdwijnt, en waarom die stappen er ooit waren. Was een
   * lijst met een regel per stap; dat maakte dit blok het langste van het
   * rapport (421 van de 1991 woorden, meting 24-08). Het leermoment zit in
   * het waarom, en dat hoeft één keer. */
  watVerdwijnt: string;
  /** Eén zin: wat deze manier van werken van je vraagt. Voegt samen wat
   * eerst twee blokken waren (wat erbij komt, wat ervoor nodig is) en die
   * elkaar grotendeels herhaalden. */
  watHetVraagt: string;
  /** Oude vorm, alleen nog om opgeslagen rapporten te kunnen tonen. */
  watErVerdwijnt?: string[];
  watErbijKomt?: string[];
  watErvoorNodigIs?: string;
}

/** Sectie F: wat dit toevoegt aan wat ze vandaag al doen. */
export interface ReportAddedValue {
  watErNuGoedGaat: string;
  grenzen: ReportLimit[];
  watErvoorInDePlaatsKomt: string;
  watErvoorNodigIs: string;
}

export interface ReportPayload {
  version: 1 | 2 | 3;
  language: "nl" | "en";
  /** Optioneel: rapporten van vóór de teamflow zijn allemaal solo. */
  scanVorm?: "solo" | "team";
  gehoord: string;
  bekeken: string;
  /** Kort-antwoordregel voor het blok bovenaan het rapport (rapporten van
   * vóór het korte template hebben dit veld niet). */
  watErVerandert?: string;
  ranglijst: {
    hierZouIkBeginnen: ReportWorkflowItem[];
    sterkeKandidaten: ReportWorkflowItem[];
    laterInteressant: string[];
  };
  /** Alleen bij teamrapporten: sectie 4, de kern van de meerwaarde. */
  watJeMensenZagen?: string;
  /** Sectie F — alleen als zij zelf al met AI werken; anders afwezig. */
  watDitToevoegt?: ReportAddedValue;
  /** Sectie A — alleen als zij een procesverhaal gaven; anders afwezig. */
  zoZietHetEruit?: ReportBeforeAfter;
  /** Sectie A-bis — rijdt mee op sectie A; verdwijnt heel als de guard iets
   * niet vertrouwt. Rapporten van vóór versie 3 hebben dit veld niet. */
  vanafNul?: ReportFromScratch;
  /** Optioneel: rapporten van vóór versie 2 hebben dit blok niet. */
  kennisbeeld?: {
    systemen: string[];
    alleenInHoofden: string[];
    observatie: string;
  };
  waarWeZoudenBeginnen: string;
  /** Vervallen 24-08 (Jorus): de sectie is uit het rapport gehaald, te lang
   * en te onduidelijk. Beide velden blijven in het type zodat opgeslagen
   * rapporten niet omvallen; ze worden niet meer gegenereerd of getoond. */
  uitzoeksuggesties?: string[];
  openVragen?: ReportOpenQuestion[];
  waarJeInKuntGroeien: string;
  /** Alleen als zij co-success invulden én het citaat verifieerbaar is. */
  jouwEigenBeeld?: ReportOwnPicture;
}

/** Gestructureerde invoer voor een teamrapport: antwoorden per afdeling en
 * per invuller, zodat niemand elkaars antwoorden overschrijft. */
export interface TeamReportInput {
  departments: {
    name: string;
    respondents: { name: string; completed: boolean; answers: AnswerMap }[];
  }[];
  invitedCount: number;
  completedCount: number;
}

export function reportGenerationAvailable(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Bouwt de generator-invoer uit een scan-bundle. Eén plek, zodat de
 * afrondroute en de rapportpagina (lazy pad) exact hetzelfde doen: de
 * eigenaar (eerste respondent) draagt blok 1 + zijn eigen werkblok; bij een
 * teamscan komen de overige invullers per afdeling apart mee. */
export function buildReportInput(bundle: {
  scan: { company_name: string; contact_name: string; mode: "quick" | "team" };
  departments: { id: string; name: string; sort_order: number }[];
  respondents: {
    id: string;
    department_id: string | null;
    name: string;
    status: "uitgenodigd" | "bezig" | "klaar";
  }[];
  answers: { question_id: string; value: string | null; respondent_id: string }[];
}): { ownerAnswers: AnswerMap; team?: TeamReportInput } {
  const owner = bundle.respondents[0];
  const answersFor = (respondentId: string): AnswerMap =>
    new Map(
      bundle.answers
        .filter((row) => row.respondent_id === respondentId)
        .map((row) => [row.question_id, row.value ?? ""]),
    );
  const ownerAnswers = owner ? answersFor(owner.id) : new Map<string, string>();

  const invited = bundle.respondents.filter((r) => r.id !== owner?.id);
  if (bundle.scan.mode !== "team" || invited.length === 0) return { ownerAnswers };

  const departments = [...bundle.departments]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((department) => ({
      name: department.name,
      respondents: invited
        .filter((r) => r.department_id === department.id)
        .map((r) => ({
          name: r.name,
          completed: r.status === "klaar",
          answers: answersFor(r.id),
        })),
    }))
    .filter((department) => department.respondents.length > 0);

  return {
    ownerAnswers,
    team: {
      departments,
      invitedCount: invited.length,
      completedCount: invited.filter((r) => r.status === "klaar").length,
    },
  };
}

function addedValueSchema() {
  return {
    type: "object",
    properties: {
      watErNuGoedGaat: { type: "string" },
      grenzen: {
        type: "array",
        items: {
          type: "object",
          properties: {
            grens: { type: "string" },
            citaat: { type: "string" },
            vraagId: { type: "string" },
            capaciteit: { type: "string" },
          },
          required: ["grens", "citaat", "vraagId", "capaciteit"],
          additionalProperties: false,
        },
      },
      watErvoorInDePlaatsKomt: { type: "string" },
      watErvoorNodigIs: { type: "string" },
    },
    required: [
      "watErNuGoedGaat",
      "grenzen",
      "watErvoorInDePlaatsKomt",
      "watErvoorNodigIs",
    ],
    additionalProperties: false,
  };
}

function beforeAfterSchema() {
  return {
    type: "object",
    properties: {
      workflow: { type: "string" },
      citaat: { type: "string" },
      vraagId: { type: "string" },
      nu: { type: "array", items: { type: "string" } },
      straks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            stap: { type: "string" },
            capaciteit: { type: "string" },
          },
          required: ["stap", "capaciteit"],
          additionalProperties: false,
        },
      },
      watErvoorNodigIs: { type: "string" },
    },
    required: ["workflow", "citaat", "vraagId", "nu", "straks", "watErvoorNodigIs"],
    additionalProperties: false,
  };
}

function fromScratchSchema() {
  return {
    type: "object",
    properties: {
      keten: {
        type: "array",
        items: {
          type: "object",
          properties: {
            stap: { type: "string" },
            capaciteit: { type: "string" },
          },
          required: ["stap", "capaciteit"],
          additionalProperties: false,
        },
      },
      watVerdwijnt: { type: "string" },
      watHetVraagt: { type: "string" },
    },
    required: ["keten", "watVerdwijnt", "watHetVraagt"],
    additionalProperties: false,
  };
}

function ownPictureSchema() {
  return {
    type: "object",
    properties: {
      citaat: { type: "string" },
      vraagId: { type: "string" },
    },
    required: ["citaat", "vraagId"],
    additionalProperties: false,
  };
}

function reportSchema(
  team: boolean,
  addedValue: boolean,
  ownPicture: boolean,
  beforeAfter: boolean,
) {
  return {
    type: "object",
    properties: {
      gehoord: { type: "string" },
      bekeken: { type: "string" },
      watErVerandert: { type: "string" },
      ranglijst: {
        type: "object",
        properties: {
          hierZouIkBeginnen: { type: "array", items: workflowItemSchema(team) },
          sterkeKandidaten: { type: "array", items: workflowItemSchema(team) },
          laterInteressant: { type: "array", items: { type: "string" } },
        },
        required: ["hierZouIkBeginnen", "sterkeKandidaten", "laterInteressant"],
        additionalProperties: false,
      },
      ...(team ? { watJeMensenZagen: { type: "string" } } : {}),
      ...(addedValue ? { watDitToevoegt: addedValueSchema() } : {}),
      ...(beforeAfter ? { zoZietHetEruit: beforeAfterSchema() } : {}),
      kennisbeeld: {
        type: "object",
        properties: {
          systemen: { type: "array", items: { type: "string" } },
          alleenInHoofden: { type: "array", items: { type: "string" } },
          observatie: { type: "string" },
        },
        required: ["systemen", "alleenInHoofden", "observatie"],
        additionalProperties: false,
      },
      waarWeZoudenBeginnen: { type: "string" },
      waarJeInKuntGroeien: { type: "string" },
      ...(ownPicture ? { jouwEigenBeeld: ownPictureSchema() } : {}),
    },
    required: [
      "gehoord",
      "bekeken",
      "watErVerandert",
      "ranglijst",
      ...(team ? ["watJeMensenZagen"] : []),
      ...(addedValue ? ["watDitToevoegt"] : []),
      ...(beforeAfter ? ["zoZietHetEruit"] : []),
      "kennisbeeld",
      "waarWeZoudenBeginnen",
      "waarJeInKuntGroeien",
      ...(ownPicture ? ["jouwEigenBeeld"] : []),
    ],
    additionalProperties: false,
  };
}

function workflowItemSchema(team: boolean) {
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
      waarDeKennisZit: { type: "string" },
      ...(team ? { afdeling: { type: "string" } } : {}),
    },
    required: [
      "naam",
      "watHetNuIs",
      "hoeVaak",
      "watHetKost",
      "waarHetBlijftLiggen",
      "waaromDitZichLeent",
      "alsErIetsMisgaat",
      "waarDeKennisZit",
      ...(team ? ["afdeling"] : []),
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

// ---------------------------------------------------------------------------
// Sectie F — "Wat dit toevoegt aan wat je nu al doet"
//
// De poort is deterministisch: de sectie bestaat alleen voor iemand die zelf
// al met AI werkt. Wie dat niet doet heeft geen huidige aanpak om iets aan
// toe te voegen, en dan is de sectie een pitch zonder aanleiding.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Sectie 6, omgedraaid — van "dit kun je zelf uitzoeken" naar "dit beantwoordt
// je bedrijf straks zelf". Zelfde bron, andere richting: het waren hun eigen
// onbeantwoorde vragen, teruggegeven als huiswerk. Nu staat erbij wat er nodig
// is om ze te kunnen stellen, en wat daarvan vandaag ontbreekt.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Sectie A — hun eigen processtappen naast dezelfde keten, ingericht. Dit is
// het antwoord op "wat doet dit met hoe wij nu werken": geen belofte over de
// uitkomst, maar de choreografie van het werk zelf.
// ---------------------------------------------------------------------------

const WORKFLOW_STORY_ID = "dept-workflow-story";
/** Te weinig verhaal om stappen uit te halen. */
const STORY_MIN_CHARS = 120;

export function beforeAfterApplies(answers: AnswerMap): boolean {
  return (answers.get(WORKFLOW_STORY_ID) ?? "").trim().length >= STORY_MIN_CHARS;
}

const BEFORE_AFTER_PROMPT_EXTRA = `

Je schrijft ook zoZietHetEruit: hoe het werk uit hierZouIkBeginnen eruitziet als het is ingericht. Alleen die ene bovenste workflow, niet de andere.
- workflow: de naam van dat werk, gelijk aan de naam in de ranglijst.
- citaat: het stuk uit hun procesverhaal (dept-workflow-story) waar deze keten op stoelt, LETTERLIJK overgenomen, minimaal vijftien tekens. Wordt woord voor woord tegen hun antwoorden gehouden.
- nu: hun eigen stappen, vier tot acht, in de volgorde waarin zij ze vertelden. Elke stap is één korte zin in hun eigen woorden. Voeg geen stap toe die zij niet noemden en maak het niet netter dan het is.
- straks: dezelfde keten, ingericht, ongeveer evenveel stappen. Per stap: stap = één korte zin over hoe die stap er dan uitziet, en capaciteit = het id uit de capaciteitenkaart dat die stap mogelijk maakt. Laat concreet zien wat er verandert: welke overdracht verdwijnt, welk werk al klaarstaat op het moment dat iemand begint, en welke stap blijft omdat daar het oordeel zit. Een stap waar een mens beslist BLIJFT staan; schrijf hem dan zo op, met de capaciteit menselijke-poort.
- watErvoorNodigIs: één of twee zinnen. Wat moet er gebeuren of vastgelegd zijn voordat deze keten zo kan lopen, eerlijk, inclusief het deel dat nu alleen in iemands hoofd zit.

Harde regels: geen uren, geen besparing, geen tempo, geen termijn en geen enkel getal dat zij niet zelf noemden. Schrijf de inrichting, niet het resultaat: beschrijf hoe het werk er dan uitziet, niet hoeveel beter of makkelijker het wordt. Verzin geen systeem en geen stap die zij niet noemden.`;

// ---------------------------------------------------------------------------
// Sectie A-bis — het kijkje vooruit. Sectie A laat dezelfde keten zien met
// gereedschap eronder ("ongeveer evenveel stappen", en dat is bewust: die
// kolom moet herkenbaar blijven). Daardoor kan het rapport nooit de vraag
// stellen waarom dit werk eigenlijk zo loopt. Dit blok stelt hem wel, als
// vraag en niet als oordeel.
//
// Rijdt mee op sectie A: zonder procesverhaal geen keten om opnieuw op te
// zetten. Er is dus geen aparte poort.
// ---------------------------------------------------------------------------

const FROM_SCRATCH_SYSTEM = `Je schrijft één blok van het rapport van de AI-scan van nativ: het kijkje vooruit. Je krijgt de antwoorden van de invuller en je schrijft hoe het werk uit hun procesverhaal (dept-workflow-story) eruit zou zien als iemand het vandaag vanaf nul zou ontwerpen.

DIT BLOK IS KORT. Samen hooguit 130 woorden. Het was het langste blok van het rapport en dat is precies wat het kapot maakte; alles wat je twee keer zegt, laat je weg.

LEES DIT EERST, WANT HIER GAAT HET MIS. Elders in het rapport staat ditzelfde werk al één keer uitgetekend: dezelfde keten als nu, met gereedschap eronder. Bronnen worden ontsloten, gesprekken genotuleerd, documenten geüpload, en het concept staat klaar op het moment dat iemand begint. DIT BLOK BEGINT DAAR. Je schrijft niet nog een keer op welke stap gereedschap krijgt, en al helemaal niet dezelfde keten met een paar stappen eruit.

De vraag hier is een andere: wat is het resultaat van dit werk eigenlijk, wanneer ontstaat het, en wat beslist de mens? Neem aan dat het ontsluiten van bronnen al geregeld is en bouw daarbovenop.

Er zijn precies drie richtingen waarin het antwoord mag liggen. Kies wat bij hun werk past, meestal twee van de drie. Verzin geen vierde.
1. De EENHEID verandert. Nu is de uitkomst een stuk dat je per keer maakt. Straks is het een stand die altijd actueel is, en het stuk is daar een uitdraai van.
2. Het MOMENT verandert. Nu begint het werk als iemand eraan begint, en dat is meestal precies wanneer het druk is. Straks loopt het door en is er geen startmoment meer.
3. Wat er OPGELEVERD wordt verandert. Nu is de uitkomst één antwoord. Straks staat erbij wat nog ontbreekt of onzeker is.

Drie velden, meer niet:

- keten: hoogstens VIER stappen, en elke stap is ÉÉN KORTE ZIN van hooguit vijftien woorden. Per stap: stap = die zin, capaciteit = het id uit de capaciteitenkaart dat hem mogelijk maakt. De stap waar het menselijk oordeel zit blijft staan, met capaciteit menselijke-poort, maar hij verandert van karakter: van maker naar iemand die de norm stelt en oordeelt. VERBODEN: elke stap die over inname gaat, dus niets over notuleren, uploaden, koppelen of doorzoekbaar maken. Dat staat al elders. Gebruik ook niet twee keer dezelfde capaciteit.
- watVerdwijnt: ÉÉN zin, hooguit veertig woorden. Eerst wat er verdwijnt, samengevat als één soort werk en niet als lijstje, dan waarom dat er ooit was. Dat waarom is verplicht en het is het belangrijkste van dit blok; zonder dat leest het als een verwijt, en die stappen waren logisch met de middelen van toen. Bijvoorbeeld: "Wat verdwijnt is het rondbrengen: onthouden wie nog moet reageren en zelf op het juiste moment beginnen. Die stappen bestonden omdat alleen een mens kon zien dat er iets lag."
- watHetVraagt: ÉÉN zin, hooguit veertig woorden. Wat deze manier van werken van hén vraagt: de norm één keer opschrijven, en daarna elke uitkomst beoordelen. Zeg concreet wat er bij hen op papier moet en benoem dat het nu in iemands hoofd zit als hun antwoorden dat laten zien. Gebruik dept-wf-done als zij die vraag beantwoordden: wie nu bepaalt of het goed genoeg is, wordt degene die de norm opschrijft.

Harde regels: geen uren, geen besparing, geen tempo, geen termijn en geen getal dat zij niet zelf noemden. Verzin geen systeem en geen stap die zij niet noemden. Schrijf de inrichting, niet het resultaat. Beloof niet dat dit er komt en schrijf nergens dat wij dit voor ze klaarzetten; dit is hoe het werk eruit KAN zien, meer niet. Schrijf in gewone taal, korte zinnen, geen jargon, geen gedachtestreepjes, en in de taal van de antwoorden. Spreek de lezer aan met je en jij. Het woord "digitale collega" komt nergens voor, en gebruik geen interne namen van losse workflows; beschrijf wat er gebeurt in plaats van hoe iets bij ons heet.`;


const SUCCESS_ID = "co-success";
/** Te dun om iemand zijn eigen beeld mee terug te geven. */
const SUCCESS_MIN_CHARS = 25;

/** Vulden zij hun eigen beeld van slagen in? Zo niet, dan vragen we het
 * citaat niet, want een beeld verzinnen dat zij niet gaven is precies wat we
 * hier NIET willen. */
export function ownPictureApplies(answers: AnswerMap): boolean {
  return (answers.get(SUCCESS_ID) ?? "").trim().length >= SUCCESS_MIN_CHARS;
}

const OWN_PICTURE_PROMPT_EXTRA = `

Deze invuller heeft zelf beschreven waaraan hij over zes maanden wil zien dat AI hem echt helpt (co-success). Dat antwoord geef je hem terug; tot nu toe verdween het.
- jouwEigenBeeld.citaat: het fragment uit hun antwoord waarop je de alinea baseert, LETTERLIJK overgenomen, tien tot dertig woorden, niets gecorrigeerd of herschreven. Dit wordt de lezer NIET getoond; het is de verankering waarmee wij controleren dat het beeld uit hun eigen antwoord komt en niet verzonnen is. Het wordt woord voor woord tegen hun antwoord gehouden, dus kopieer exact. vraagId is co-success.
- waarJeInKuntGroeien opent daarna vanuit dat beeld, in leesbare taal. Veel antwoorden zijn ingesproken en bevatten verhaspelingen; die schrijf je niet over. Geef hun beeld terug zoals zij het bedoelden, herkenbaar in hun eigen bewoordingen, zonder de verspreking mee te nemen en zonder er iets aan toe te voegen dat zij niet zeiden.
- waarJeInKuntGroeien verbindt dat beeld vervolgens met de workflows uit de ranglijst: wat zij beschrijven vraagt dat de kennis eronder in een Company Brain staat, en dat is precies wat er gebeurt zodra het eerste werk loopt. Daarna de bestaande strekking: het werk uit de tweede groep ligt dan voor de hand, en wat er over hun manier van werken wordt vastgelegd komt daar opnieuw bij van pas.
- Neem hun termijn NIET over als onze toezegging. Zij zeggen "over zes maanden", dat is hun wens en niet onze planning; het rapport belooft nooit wanneer iets werkt. Schrijf ook niet dat het er komt, alleen hoe het zich verhoudt tot wat er in dit rapport staat.`;

const AI_TODAY_ID = "co-ai-today";
const AI_HISTORY_ID = "co-ai-history";
/** Het exclusieve "bijna niemand gebruikt het"-label (beide talen). */
const AI_TODAY_NONE_LABELS = new Set([
  "Bijna niemand gebruikt het",
  "Almost nobody uses it",
]);
/** Zonder co-ai-today (scans van vóór bankversie v5) valt de poort terug op
 * het verhaal bij co-ai-history; te kort = geen huidige aanpak om over te
 * praten. */
const AI_HISTORY_MIN_CHARS = 80;

export function addedValueApplies(answers: AnswerMap): boolean {
  const today = answers.get(AI_TODAY_ID);
  if (today != null && today.trim() !== "" && today.trim() !== "[]") {
    const labels = storedLabels(
      { type: "multi-choice" } as ScanQuestion,
      today,
    );
    return labels.some((label) => !AI_TODAY_NONE_LABELS.has(label));
  }
  return (answers.get(AI_HISTORY_ID) ?? "").trim().length >= AI_HISTORY_MIN_CHARS;
}

const ADDED_VALUE_PROMPT_EXTRA = `

Deze invuller werkt zelf al met AI. Daarom schrijf je ook watDitToevoegt: wat dit toevoegt aan wat hij vandaag al doet. Zonder deze sectie leest het rapport voor hem als iets wat hij al heeft, en dat is de belangrijkste reden dat zo iemand afhaakt.

DEZE SECTIE IS KORT. Samen hooguit 120 woorden. Hij was het langste stuk van het rapport en dat kwam doordat elk onderdeel een eigen alinea werd. Zeg elk ding één keer.

Drie blokken, in deze volgorde, en de volgorde is het halve werk:
- watErNuGoedGaat: hooguit 45 woorden over wat er nu al goed werkt, in hun eigen woorden en zonder ondermijning. Iemand die zijn eigen AI voedt met eigen bestanden heeft iets echts opgebouwd; erken dat voluit. Wie hier begint met wat er mis is, is de lezer kwijt.
- grenzen: twee tot vier grenzen van die huidige aanpak. Elke grens is een EIGENSCHAP van de opzet, nooit een verwijt en nooit een uitspraak over het taalmodel. Kies alleen grenzen die volgen uit hun eigen antwoorden. De vier die meestal spelen: de context is van één persoon en vertrekt met diegene; niemand kan zien wat erin zit of wat nog klopt, want er is geen eigenaar, herkomst of datum; iedereen bouwt zijn eigen versie van de waarheid; het kan praten maar niet uitvoeren (rekenen, bronnen ophalen, stappen ketenen, op een moment draaien, pauzeren voor goedkeuring). Zeggen zij zelf dat ze prompts of context al delen, dan laat je de derde weg.
- Per grens: grens = ÉÉN zin van hooguit 25 woorden, in gewone taal. citaat = de woorden uit hun eigen antwoord waar deze grens uit volgt, LETTERLIJK overgenomen, minimaal vijftien tekens, zonder iets te corrigeren of mooier te maken. vraagId = de vraag waar dat citaat uit komt. capaciteit = het id uit de capaciteitenkaart dat deze grens adresseert.
- watErvoorInDePlaatsKomt: hooguit 45 woorden, en het gaat over HUN werk, niet over onze inrichting. Begin NOOIT met een ontkenning van een bezwaar dat de lezer niet heeft gemaakt, dus nooit met "niemand hoeft over te stappen" of iets van die strekking; zo'n zin plant het bezwaar juist en zegt de lezer niets. Schrijf wat er voor hén verandert: waar de AI zijn informatie vandaan haalt. Nu uit de bestanden en aanwijzingen die ieder er zelf in stopt, straks uit één plek die wordt bijgehouden en waar collega's ook bij kunnen, en waarop werk kan draaien in plaats van dat er alleen over gepraat wordt. Dat iemand in zijn eigen AI-tool kan blijven werken mag hooguit als bijzin aan het eind. Geen opsomming van wat er dan allemaal kan.
- watErvoorNodigIs: ÉÉN zin van hooguit 25 woorden. Iemand moet bepalen wat er gedeeld hoort en wie wat mag zien, en dat is werk.

Harde regels voor juist deze sectie, want dit is de plek waar het rapport het snelst een folder wordt: nooit een uitspraak over het taalmodel, wij zijn niet slimmer dan wat zij gebruiken en dat is het punt niet. Nooit "dat kan jouw tool niet" als kale bewering, alleen eigenschappen die uit hun eigen antwoord volgen. Geen merknamen van andere aanbieders. Geen prijs, geen migratieverhaal, geen belofte dat het beter wordt, geen woorden als beter, sneller, slimmer of krachtiger. Getallen alleen als zij die zelf noemden.`;

const TEAM_PROMPT_EXTRA = `

Dit is een TEAMSCAN: meerdere invullers, elk over hun eigen afdeling. De antwoorden staan per afdeling en per invuller gegroepeerd; behandel elke afdeling als een eigen beeld en gooi antwoorden van verschillende invullers nooit op één hoop. Aanvullende regels:
- bekeken: benoem per afdeling wie meedeed (voornamen volstaan) en wees eerlijk over wie nog niet heeft ingevuld; die afdelingen ontbreken in het beeld en dat zeg je gewoon.
- Per workflow-item vul je ook afdeling in: de naam van de afdeling waar dit werk vandaan komt, letterlijk zoals de eigenaar hem noemde. De ranglijst blijft één totaallijst over de afdelingen heen.
- watJeMensenZagen: de kern van de meerwaarde van een teamscan. Eén of twee alinea's over wat de invullers zagen dat de eigenaar zelf niet noemde: werk dat in meerdere afdelingen terugkomt zonder dat iemand dat doorhad, overdrachten waar afdelingen op elkaar wachten, en kennis die de eigenaar bij systemen dacht maar volgens de invullers in hoofden zit (of andersom). Alleen uit de antwoorden, niets verzinnen; is er weinig verschil, zeg dat dan eerlijk.
- Uren blijven per invuller staan. Tel de opgaven van verschillende invullers nooit bij elkaar op tot één getal. Beschrijven twee invullers hetzelfde proces, voeg het dan samen tot één workflow en gebruik de opgave van degene die het werk zelf doet, want die staat er het dichtst op.
- gehoord blijft over het bedrijf als geheel, vanuit de antwoorden van de eigenaar (de eerste invuller).`;

const SYSTEM_PROMPT = `Je schrijft het rapport van de AI-scan van nativ, op basis van de antwoorden van één invuller (de quick scan, solo). Het rapport doet drie dingen, in deze volgorde: laten zien dat we hún bedrijf hebben gehoord, laten zien welk werk zich leent om door AI te laten doen en in welke volgorde, en één klein startpunt aanwijzen.

Rangschik op vijf factoren: (1) volume en herhaling (dept-wf-frequency plus aantallen in het procesverhaal, overdrachten uit co-handoffs, terugkerende overleggen uit co-meetings, vinkjes uit dept-time-sinks), (2) tijd (dept-wf-hours of dept-wf-hours-own, gewogen met dept-wf-confidence), (3) veilig om te beginnen (uit het procesverhaal en dept-wf-stall: gaat het resultaat naar buiten, of blijft het binnen en is het terug te draaien), (4) past bij hun doel (co-goal, met co-ai-focus als tweede as en dept-first-hire als wens-signaal), (5) grip op de kennis (dept-wf-knowledge, co-knowledge-home en co-knowledge-carrier). De eerste drie bepalen de volgorde, de laatste twee schuiven binnen die volgorde.

Lees de uren altijd samen met dept-role, want die vraag bepaalt wat het getal betekent. Staat daar "Ik doe dit werk zelf", dan zijn de uren in dept-wf-hours-own de uren van ÉÉN persoon en krijg je het teamgetal door ze te vermenigvuldigen met het aantal mensen uit dept-wf-people. Geef eigen uren dus nooit terug als het totaal van het bedrijf. Bij de andere rollen is dept-wf-hours al het teamtotaal en vermenigvuldig je niets. Ontbreekt dept-wf-people, reken dan niets om: gebruik de eigen uren en zeg er in watHetKost bij dat dit de uren van één persoon zijn.

dept-role-title is de functie van de invuller, als hij die invulde. Gebruik die uitsluitend in bekeken, om te benoemen vanuit wiens blik dit beeld komt (bijvoorbeeld: dit is het beeld van de officemanager). Noem de functie nergens anders in het rapport, en verzin er geen rol bij als het veld leeg is.

Secties die jij schrijft:
- gehoord: twee korte alinea's, samen hooguit 140 woorden. De eerste vat hún bedrijf samen uit co-profile en co-goal, en sluit af met één feitelijke zin over hoe AI vandaag bij hen wordt gebruikt (co-ai-today, co-ai-history): beschrijvend, zonder oordeel. Is het antwoord "bijna niemand gebruikt het", schrijf dat net zo neutraal op. Dit is een SAMENVATTING, geen weergave: loop hun antwoorden niet in volgorde af, en geef een meerkeuze-antwoord nooit terug als opsomming van de aangevinkte opties. De tweede alinea begint met "Wat opvalt:" en benoemt ÉÉN spanning die in hun eigen antwoorden zit, meestal tussen wat zij willen bereiken (co-goal, co-success) en waar hun kennis nu zit (co-knowledge-carrier, dept-wf-knowledge, co-knowledge-home). Die observatie moet volledig uit hun antwoorden volgen en mag niets toevoegen; dit is de zin waaraan zij merken dat we het begrepen hebben in plaats van alleen gelezen. Zie je geen eerlijke spanning, laat de tweede alinea dan weg.
- bekeken: één zin over de dekking. Dit is een solo-scan, dus de strekking is: dit is jouw beeld, niet dat van je collega's. Niet opsommen wat er in kaart is gebracht; dat blijkt uit de rest van het rapport.
- watErVerandert: één zin van hooguit 40 woorden voor het kort-antwoord bovenaan het rapport. Wat er concreet verandert aan de bovenste workflow als die is ingericht, in hun eigen termen, gevolgd door wie de regie houdt. Geen belofte over hoeveel beter of sneller het wordt, geen termijn, geen getal dat zij niet noemden.
- ranglijst: hierZouIkBeginnen bevat 1 workflow (soms 2), sterkeKandidaten 3 tot 5 als de antwoorden dat dragen (minder mag), laterInteressant de rest als één regel per stuk. Het doorgelopen proces uit dept-workflow-story is de kandidaat voor hierZouIkBeginnen; de overige vinkjes uit dept-time-sinks, de overdrachten uit co-handoffs en de wens uit dept-first-hire vullen de andere groepen. Items zonder urengetal laten dat eerlijk zien in watHetKost (bijvoorbeeld: "Hier heb je geen uren voor opgegeven").
- Per workflow-item: naam = de naam van het werk in hun woorden plus niets erbij; watHetNuIs = één zin uit hun eigen procesverhaal; hoeVaak = meerdere keren per dag / dagelijks / wekelijks / maandelijks; watHetKost = "Ongeveer X uur per week" in hun eigen opgave, met "ruwe schatting" erbij als dept-wf-confidence 1 of 2 was; waarHetBlijftLiggen = één zin uit dept-wf-stall; waaromDitZichLeent = één zin: het komt vaak voorbij, de stappen zijn elke keer hetzelfde, en de meeste beslissingen zijn dezelfde; alsErIetsMisgaat = "Je ziet het meteen en je draait het terug." of "Dit gaat naar buiten, dus hier kijkt altijd iemand mee voordat het weg is." (kies wat past bij het proces); waarDeKennisZit = één zin over waar de kennis en gegevens voor dít werk nu vandaan komen, uit dept-wf-systems en dept-wf-knowledge: noem de systemen, mailboxen of documenten die zij zelf noemden, en zeg erbij welk deel nergens is vastgelegd. Noemden ze er niets over, schrijf dan dat ze daar niets over hebben gezegd. Verzin nooit een systeem dat zij niet noemden.
- kennisbeeld: over de workflows heen, uit dept-wf-systems, dept-wf-knowledge, dept-answer-where, co-knowledge-home, co-meetings en co-knowledge-carrier. systemen = de systemen, mailboxen en documenten die zij noemden en die steeds terugkomen, elk als korte losse regel met erbij waarvoor het gebruikt wordt; terugkerende overleggen uit co-meetings horen hier ook thuis als daar kennis ontstaat, met erbij of er iemand aantekeningen maakt. alleenInHoofden = de kennis die volgens hun eigen antwoorden nergens is vastgelegd en dus bij mensen zit, elk als korte losse regel; noemden zij bij co-knowledge-carrier een persoon, dan staat wat diegene weet hier als eigen regel, zonder de naam erbij. observatie = hooguit twee zinnen die benoemen wat dit betekent: om dit werk door AI te laten doen moet die kennis bereikbaar en vastgelegd zijn, en dat is nu deels niet zo. Geen oplossing aanbieden, geen product noemen, alleen de constatering. Herhaal daarbij niet welke systemen zij gebruiken; die staan al per workflow in de ranglijst. Noemden ze te weinig om iets te zeggen, houd de lijsten dan leeg en schrijf in observatie eerlijk dat hier nog weinig over bekend is en dat dit een goede eerste vraag is voor een vervolg.
- waarWeZoudenBeginnen: twee of drie zinnen waarom juist deze workflow het startpunt is. Dit staat in het rapport IN de bovenste ranglijstkaart, dus herhaal niet wat daar al staat: noem de naam van de workflow niet opnieuw, en noem de uren en de frequentie niet opnieuw. Schrijf alleen het argument: waarom dit veilig is om mee te beginnen (wat blijft binnen en is terug te draaien, en waar iemand toch al meekijkt voordat het naar buiten gaat).
- waarJeInKuntGroeien: één korte alinea. Geen roadmap, geen fasering, geen termijnen. Strekking: als de eerste workflow eenmaal loopt, ligt het werk uit de tweede groep voor de hand, en wat er over jullie manier van werken wordt vastgelegd komt daar ook weer bij van pas.

Eén naam voor één ding: de plek waar de kennis van het bedrijf wordt vastgelegd heet overal in het rapport de Company Brain. Gebruik nooit een omschrijving als "vastgelegde kennis", "kennisbank", "centrale kennis" of "één gedeelde bron" om hetzelfde ding aan te duiden; dat laat de lezer denken dat het over verschillende dingen gaat. Praat je over kennis die bij HEN in hoofden of systemen zit en nog nergens is vastgelegd, dan is dat gewoon "kennis" en nooit de Company Brain.

Harde regels: geen cijfer of readiness-score, geen sterren, geen percentages (de volgorde zelf is het oordeel). Geen besparingsbelofte en geen bedrag: rapporteer wat het werk nu kost, in hun eigen opgave. Geen prijzen. Geen termijnen en geen belofte over wanneer iets werkt. Het woord "digitale collega" komt nergens voor; het rapport levert workflows op. Wat de invuller al met AI geprobeerd heeft (co-ai-history) raad je niet opnieuw aan. Schrijf in gewone taal, korte zinnen, geen jargon, geen buzzwoorden, geen gedachtestreepjes. Schrijf in de taal van de antwoorden.

Herhalingsregel (het rapport is kort, en dit is hoe het kort blijft): drie beloftes worden elk op precies ÉÉN plek uitgeschreven en verder nergens opnieuw uitgelegd. "Eigenaar, herkomst en datum" hoort bij de ketenvisual en heet daarbuiten alleen nog "Company Brain". "Een mens keurt goed voordat iets naar buiten gaat" wordt uitgeschreven waar het concreet is (in de ranglijstkaart en de straks-kolom) en daarbuiten hooguit benoemd, nooit opnieuw uitgelegd. "Wie mag wat zien" hoort bij het rechtenblok in watDitToevoegt. Elke sectie zegt iets nieuws; een sectie die alleen een eerdere sectie herformuleert, laat je weg.`;

// ---------------------------------------------------------------------------
// De guard op sectie F. De prompt vraagt om herkomst; deze code controleert
// hem. Zelfde patroon als de membership guards in de engine (app/api/brain.py):
// wat niet in de meegestuurde lijst staat, wordt niet vertrouwd maar
// weggegooid. Een instructie is geen garantie, een check wel.
// ---------------------------------------------------------------------------

/** Vergelijkingen, beloftes en prijzen. Deze mogen nergens staan: niet in wat
 * wij schrijven en niet in wat wij van hen overnemen. */
const FORBIDDEN_CLAIMS = [
  // Ruling Jorus 24-08: mag sowieso nergens staan. Stond tot dan alleen als
  // instructie in de prompt, en de capaciteitenkaart voerde het woord zelf
  // aan het model. Nu een harde controle in plaats van een verzoek.
  "digitale collega",
  "digitaal collega",
  "beter",
  "sneller",
  "slimmer",
  "krachtiger",
  "superieur",
  "geavanceerder",
  "bespaar",
  "besparing",
  "garandeer",
  "gratis",
  "goedkoper",
  "procent",
];

/** Merknamen van andere aanbieders. Alleen verboden in wat WIJ beweren; in de
 * kolommen die hun eigen woorden teruggeven zijn het gewoon hun tools.
 * (Zorggenoot, 14 aug: hun eigen processtap is "Google / chatgpt", waardoor
 * sectie A en sectie F allebei stilletjes wegvielen.) */
const FORBIDDEN_BRANDS = [
  "chatgpt",
  "openai",
  "copilot",
  "gemini",
  "claude",
  "notebooklm",
];

const MIN_QUOTE_CHARS = 15;

function normalizeForMatch(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Alle antwoorden als één doorzoekbare tekst — de bron waartegen elk citaat
 * en elk getal wordt gehouden. */
function answersHaystack(answers: AnswerMap): string {
  return normalizeForMatch([...answers.values()].join(" \n "));
}

/** Match op woordbegin, niet op willekeurige substring. Zo vallen verbuigingen
 * ("betere", "besparingen") nog steeds om, maar een onschuldig woord dat een
 * verboden woord bevat ("verbeteren") niet. */
function matchesAtWordStart(lower: string, word: string): boolean {
  let from = 0;
  for (;;) {
    const at = lower.indexOf(word, from);
    if (at === -1) return false;
    const before = at === 0 ? "" : lower[at - 1];
    if (!/[a-z0-9]/.test(before)) return true;
    from = at + 1;
  }
}

/**
 * Wat er niet in mag. `allowBrands` staat aan voor de kolommen die letterlijk
 * hun eigen woorden teruggeven; daar is een merknaam hun tool en geen claim
 * van ons. Percentages blijven overal verboden.
 */
function tripsForbidden(text: string, allowBrands = false): string | null {
  const lower = text.toLowerCase();
  if (lower.includes("%")) return "%";
  const list = allowBrands
    ? FORBIDDEN_CLAIMS
    : [...FORBIDDEN_CLAIMS, ...FORBIDDEN_BRANDS];
  return list.find((word) => matchesAtWordStart(lower, word)) ?? null;
}

/** Elk getal in de tekst moet ook in hun eigen antwoorden staan. */
function inventsNumber(text: string, haystack: string): string | null {
  for (const match of text.matchAll(/\d+/g)) {
    if (!haystack.includes(match[0])) return match[0];
  }
  return null;
}

/**
 * Houdt sectie F tegen het licht en geeft terug wat overleeft.
 * Een grens overleeft alleen met een bestaand capaciteit-id, een citaat dat
 * letterlijk in hun antwoorden voorkomt, en zonder verboden woorden of
 * verzonnen getallen. Blijft er geen enkele grens over, dan verdwijnt de hele
 * sectie: leeg is beter dan vaag.
 */
export function guardAddedValue(
  section: ReportAddedValue | undefined,
  answers: AnswerMap,
): ReportAddedValue | undefined {
  if (!section) return undefined;
  const haystack = answersHaystack(answers);

  const drop = (reason: string) => {
    console.warn(`SCAN_ADDED_VALUE_DROPPED: ${reason}`);
    return undefined;
  };

  // watErNuGoedGaat erkent wat zij zelf hebben opgebouwd, in hun woorden — daar
  // is de naam van hun eigen tool geen claim van ons.
  for (const [field, text, allowBrands] of [
    ["watErNuGoedGaat", section.watErNuGoedGaat, true],
    ["watErvoorInDePlaatsKomt", section.watErvoorInDePlaatsKomt, false],
    ["watErvoorNodigIs", section.watErvoorNodigIs, false],
  ] as const) {
    if (!text || !text.trim()) return drop(`${field} is leeg`);
    const word = tripsForbidden(text, allowBrands);
    if (word) return drop(`${field} bevat verboden woord "${word}"`);
    const number = inventsNumber(text, haystack);
    if (number) return drop(`${field} noemt getal ${number} dat zij niet gaven`);
  }

  const grenzen = section.grenzen.filter((limit) => {
    const quote = normalizeForMatch(limit.citaat ?? "");
    if (quote.length < MIN_QUOTE_CHARS) {
      console.warn(`SCAN_ADDED_VALUE_LIMIT_DROPPED: citaat te kort`);
      return false;
    }
    if (!haystack.includes(quote)) {
      console.warn(`SCAN_ADDED_VALUE_LIMIT_DROPPED: citaat niet in antwoorden`);
      return false;
    }
    if (!CAPABILITY_IDS.has(limit.capaciteit)) {
      console.warn(
        `SCAN_ADDED_VALUE_LIMIT_DROPPED: onbekende capaciteit "${limit.capaciteit}"`,
      );
      return false;
    }
    const word = tripsForbidden(limit.grens);
    if (word) {
      console.warn(`SCAN_ADDED_VALUE_LIMIT_DROPPED: verboden woord "${word}"`);
      return false;
    }
    const number = inventsNumber(limit.grens, haystack);
    if (number) {
      console.warn(`SCAN_ADDED_VALUE_LIMIT_DROPPED: verzonnen getal ${number}`);
      return false;
    }
    return true;
  });

  if (grenzen.length === 0) return drop("geen enkele grens overleefde de guard");
  return { ...section, grenzen };
}

/**
 * Guard op sectie A. Alles of niets: een half voor-en-na is verwarrender dan
 * geen voor-en-na, dus bij één fout valt de hele sectie weg.
 */
/**
 * Houdt sectie A-bis tegen het licht. Strenger dan de andere guards, en met
 * opzet alles-of-niets: waar bij `grenzen` losse items eruit filteren prima
 * werkt, is een keten met een gat erin onleesbaar. Beter geen kijkje vooruit
 * dan een halve.
 *
 * De hardste eis is de telling: minder stappen dan in `nu`. Zonder die eis
 * schrijft het model gewoon `straks` nog een keer op, en dan staat er twee
 * keer hetzelfde in het rapport.
 */
/** Onder deze lengte staat er onmogelijk én wat verdwijnt én waarom dat er
 * ooit was. Dat waarom is het hele leermoment van dit blok. */
const FROM_SCRATCH_MIN_GONE_CHARS = 60;

/** Boven deze lengte is het blok weer aan het uitdijen. 130 woorden is de
 * afspraak (Jorus 24-08); dit is de ruime bovengrens in tekens waarbij we nog
 * niet gaan weggooien maar wel een spoor achterlaten in de logs. */
const FROM_SCRATCH_SOFT_MAX_CHARS = 1100;

/** Groep 1 van de capaciteitenkaart: hoe kennis binnenkomt. Dat is het
 * leidingwerk en het staat al in de straks-kolom. Herhaalt het kijkje vooruit
 * die stappen, dan is het geen andere manier van werken maar dezelfde lijst
 * met een paar regels eruit. Precies wat er bij de eerste echte generatie
 * gebeurde (Founder Bridge, 24 aug): kolom 3 was kolom 2 min drie stappen. */
const INNAME_CAPABILITIES = new Set([
  "vergaderinname",
  "gesprekstypes",
  "interview",
  "gesprekken-extern",
  "interne-studie",
  "documenten-inname",
  "email-koppeling",
  "kanaaldata",
]);

export function guardFromScratch(
  section: ReportFromScratch | undefined,
  beforeAfter: ReportBeforeAfter | undefined,
  answers: AnswerMap,
): ReportFromScratch | undefined {
  if (!section) return undefined;
  const drop = (reason: string) => {
    console.warn(`SCAN_FROM_SCRATCH_DROPPED: ${reason}`);
    return undefined;
  };

  // Zonder sectie A is er geen keten om naast te leggen, en dan kan de
  // stappentelling niet gecontroleerd worden. Sectie A viel weg = deze ook.
  if (!beforeAfter) return drop("sectie A ontbreekt");
  if (!section.keten?.length) return drop("lege keten");
  if (section.keten.length >= beforeAfter.nu.length) {
    return drop(
      `keten telt ${section.keten.length} stappen tegen ${beforeAfter.nu.length} in nu`,
    );
  }
  if (section.keten.length > 4) {
    return drop(`keten telt ${section.keten.length} stappen, hooguit 4 toegestaan`);
  }
  if ((section.watVerdwijnt ?? "").trim().length < FROM_SCRATCH_MIN_GONE_CHARS) {
    return drop("watVerdwijnt mist de uitleg waarom die stappen er ooit waren");
  }
  if (!section.watHetVraagt?.trim()) return drop("watHetVraagt is leeg");

  // Twee keer dezelfde capaciteit betekent bijna altijd één stap die in
  // tweeën is geknipt, en dat is precies het uitspinnen dat dit blok te lang
  // maakte.
  const gebruikt = new Set(section.keten.map((step) => step.capaciteit));
  if (gebruikt.size !== section.keten.length) {
    return drop("dezelfde capaciteit twee keer in de keten");
  }

  for (const step of section.keten) {
    if (!VOORUITBLIK_CAPABILITY_IDS.has(step.capaciteit)) {
      return drop(`onbekende capaciteit "${step.capaciteit}"`);
    }
    if (INNAME_CAPABILITIES.has(step.capaciteit)) {
      return drop(`inname-stap "${step.capaciteit}" hoort in de straks-kolom`);
    }
  }

  // De hardste eis: er moet écht iets anders in staan. Zonder minstens één
  // capaciteit die de straks-kolom niet gebruikt, leest dit blok als een
  // samenvatting van het vorige en verwarrt het de lezer meer dan het hem
  // brengt. Dan liever geen kijkje vooruit.
  const straksIds = new Set(beforeAfter.straks.map((step) => step.capaciteit));
  if (section.keten.every((step) => straksIds.has(step.capaciteit))) {
    return drop("geen enkele capaciteit die de straks-kolom niet al gebruikt");
  }

  // Alles in dit blok is een uitspraak van ons over hoe het werk kán lopen,
  // dus nergens merknamen en nergens een getal dat zij niet gaven. Enige
  // uitzondering: de stap die verdwijnt is hun eigen stap, in hun woorden.
  const haystack = answersHaystack(answers);
  const prose: [string, boolean][] = [
    [section.watHetVraagt, false],
    // watVerdwijnt geeft hun eigen stappen terug, dus daar is een merknaam
    // hun tool en geen bewering van ons.
    [section.watVerdwijnt, true],
    ...section.keten.map((s): [string, boolean] => [s.stap, false]),
  ];
  for (const [text, allowBrands] of prose) {
    const word = tripsForbidden(text ?? "", allowBrands);
    if (word) return drop(`verboden woord "${word}"`);
    const number = inventsNumber(text ?? "", haystack);
    if (number) return drop(`verzonnen getal ${number}`);
  }

  const lengte =
    section.keten.reduce((n, step) => n + step.stap.length, 0) +
    section.watVerdwijnt.length +
    section.watHetVraagt.length;
  if (lengte > FROM_SCRATCH_SOFT_MAX_CHARS) {
    console.warn(`SCAN_FROM_SCRATCH_LANG: ${lengte} tekens, richtlijn is ~800`);
  }

  return section;
}

export function guardBeforeAfter(
  section: ReportBeforeAfter | undefined,
  answers: AnswerMap,
): ReportBeforeAfter | undefined {
  if (!section) return undefined;
  const haystack = answersHaystack(answers);
  const drop = (reason: string) => {
    console.warn(`SCAN_BEFORE_AFTER_DROPPED: ${reason}`);
    return undefined;
  };

  const quote = normalizeForMatch(section.citaat ?? "");
  if (quote.length < MIN_QUOTE_CHARS) return drop("citaat te kort");
  if (!haystack.includes(quote)) return drop("citaat niet in antwoorden");
  if (!section.nu?.length || !section.straks?.length) return drop("lege kolom");

  for (const step of section.straks) {
    if (!CAPABILITY_IDS.has(step.capaciteit)) {
      return drop(`onbekende capaciteit "${step.capaciteit}"`);
    }
  }

  // De nu-kolom is hun eigen verhaal, teruggegeven in hun eigen woorden; noemen
  // zij daar hun eigen tool, dan hoort die naam er gewoon in te staan. Alles wat
  // wij erover beweren (workflow, straks, watErvoorNodigIs) blijft streng.
  const prose: [string | undefined, boolean][] = [
    [section.workflow, false],
    [section.watErvoorNodigIs, false],
    ...section.nu.map((stap): [string, boolean] => [stap, true]),
    ...section.straks.map((s): [string, boolean] => [s.stap, false]),
  ];
  for (const [text, allowBrands] of prose) {
    const word = tripsForbidden(text ?? "", allowBrands);
    if (word) return drop(`verboden woord "${word}"`);
    const number = inventsNumber(text ?? "", haystack);
    if (number) return drop(`verzonnen getal ${number}`);
  }
  return section;
}


/**
 * Zelfde guard als bij sectie F, per vraag: een bestaand capaciteit-id, een
 * citaat dat letterlijk in hun antwoorden staat, een geldige status, en geen
 * verboden woorden of verzonnen getallen. Wat niet klopt valt weg; blijft er
 * niets over, dan verdwijnt de sectie.
 */
/**
 * Het citaat moet letterlijk in hun antwoorden staan, anders verdwijnt het
 * blok. Alleen het citaat: de alinea eronder blijft, want die draagt ook
 * zonder citaat betekenis.
 */
/** Guard op de kort-antwoordregel bovenaan het rapport: geen claims, geen
 * verzonnen getallen. Valt hij weg, dan rendert het blok zonder deze regel. */
export function guardWatErVerandert(
  text: string | undefined,
  answers: AnswerMap,
): string | undefined {
  if (!text || !text.trim()) return undefined;
  const word = tripsForbidden(text);
  if (word) {
    console.warn(`SCAN_KORT_ANTWOORD_DROPPED: verboden woord "${word}"`);
    return undefined;
  }
  const number = inventsNumber(text, answersHaystack(answers));
  if (number) {
    console.warn(`SCAN_KORT_ANTWOORD_DROPPED: verzonnen getal ${number}`);
    return undefined;
  }
  return text;
}

export function guardOwnPicture(
  picture: ReportOwnPicture | undefined,
  answers: AnswerMap,
): ReportOwnPicture | undefined {
  if (!picture) return undefined;
  const quote = normalizeForMatch(picture.citaat ?? "");
  if (quote.length < MIN_QUOTE_CHARS) {
    console.warn("SCAN_OWN_PICTURE_DROPPED: citaat te kort");
    return undefined;
  }
  if (!answersHaystack(answers).includes(quote)) {
    console.warn("SCAN_OWN_PICTURE_DROPPED: citaat niet letterlijk in de antwoorden");
    return undefined;
  }
  return picture;
}

/** Tijdelijke API-fouten waar opnieuw proberen zin heeft: het model zit vol
 * (overloaded, zoals bij Ziemi op 12 aug — drie keer op rij), we zitten aan
 * de rate-limit, of de server had een storing. Fouten in ónze invoer of een
 * weigering zijn dat niet: die gaan er direct uit.
 * Let op: bij streaming komt de fout als event binnen zonder HTTP-status,
 * dus we kijken ook naar het fouttype in de melding zelf. */
function isTransientApiError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { status?: number; type?: string; message?: string };
  if (typeof e.status === "number" && (e.status === 429 || e.status >= 500)) return true;
  const text = `${e.type ?? ""} ${e.message ?? ""}`;
  return ["overloaded_error", "rate_limit_error", "api_error"].some((t) => text.includes(t));
}

/** Drie pogingen totaal; mislukte pogingen falen binnen seconden, dus dit
 * past ruim binnen de maxDuration van 300s van de aanroepende routes. */
const RETRY_DELAYS_MS = [10_000, 30_000];

/**
 * Sectie A-bis draait in een EIGEN modelaanroep, niet mee in het hoofdschema.
 * Reden is hard: het gecombineerde JSON-schema van het rapport zat al tegen de
 * grammatica-limiet van de API aan, en met dit blok erbij weigerde elke
 * generatie met "compiled grammar is too large". Losse call = klein schema,
 * en meteen een tweede voordeel: als dit blok faalt valt niet het hele
 * rapport om.
 *
 * Draait gelijktijdig met de hoofdaanroep, dus het kost geen wachttijd. De
 * stappentelling tegen de nu-kolom gebeurt daarna alsnog in de guard.
 */
async function generateFromScratch(
  client: Anthropic,
  system: string,
  userContent: string,
): Promise<ReportFromScratch | undefined> {
  try {
    const stream = client.beta.messages.stream({
      model: "claude-fable-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system,
      output_config: {
        effort: "high",
        format: { type: "json_schema", schema: fromScratchSchema() },
      },
      messages: [{ role: "user", content: userContent }],
    } as never);
    const response = await stream.finalMessage();
    console.log(
      `SCAN_FROM_SCRATCH_USAGE: model=${response.model} input=${response.usage.input_tokens} output=${response.usage.output_tokens}`,
    );
    if (response.stop_reason === "refusal") {
      console.warn("SCAN_FROM_SCRATCH_FAILED: geweigerd door het model");
      return undefined;
    }
    const text = (
      response.content.find((block) => block.type === "text") as
        | { text: string }
        | undefined
    )?.text;
    if (!text) {
      console.warn("SCAN_FROM_SCRATCH_FAILED: geen tekst in respons");
      return undefined;
    }
    return JSON.parse(text) as ReportFromScratch;
  } catch (err) {
    // Fail-soft met opzet: het rapport is af zonder dit blok, en een kijkje
    // vooruit is niet het waard om de rest van het rapport voor te laten
    // hangen. De regel hieronder is het spoor in de Vercel-logs.
    console.warn(`SCAN_FROM_SCRATCH_FAILED: ${err}`);
    return undefined;
  }
}

export async function generateReportPayload(input: {
  companyName: string;
  contactName: string;
  answers: AnswerMap;
  language: "nl" | "en";
  /** Aanwezig = teamrapport: antwoorden per afdeling en per invuller. */
  team?: TeamReportInput;
}): Promise<ReportPayload> {
  // Herkansing bij drukte: de "je krijgt een mail zodra het klaarstaat"-
  // belofte staat of valt hiermee. Eén poging opgeven omdat het model even
  // vol zat (zoals bij Ziemi, 12 aug) laat het rapport hangen tot iemand
  // toevallig de rapportpagina opent.
  let lastError: unknown;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      console.warn(`SCAN_REPORT_RETRY: poging ${attempt + 1} na tijdelijke API-fout`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt - 1]));
    }
    try {
      return await generateReportPayloadOnce(input);
    } catch (err) {
      lastError = err;
      if (!isTransientApiError(err)) throw err;
    }
  }
  throw lastError;
}

async function generateReportPayloadOnce(input: {
  companyName: string;
  contactName: string;
  answers: AnswerMap;
  language: "nl" | "en";
  team?: TeamReportInput;
}): Promise<ReportPayload> {
  if (!reportGenerationAvailable()) {
    throw new Error("ANTHROPIC_API_KEY is niet gezet");
  }
  const client = new Anthropic();
  const isTeam = Boolean(input.team && input.team.departments.length > 0);
  // Sectie F wordt niet eens gevraagd als de poort dicht is: geen schemaveld,
  // geen prompttekst, dus ook geen model dat er alsnog iets van maakt.
  const wantsAddedValue = addedValueApplies(input.answers);
  const wantsOwnPicture = ownPictureApplies(input.answers);
  const wantsBeforeAfter = beforeAfterApplies(input.answers);
  // Sectie A-bis rijdt mee op sectie A: zonder procesverhaal is er geen keten
  // om vanaf nul opnieuw op te zetten.
  const wantsFromScratch = wantsBeforeAfter;

  let userContent =
    `Bedrijf: ${input.companyName}\nEigenaar van de scan: ${input.contactName}\n\n` +
    `## Blok 1 · Jullie bedrijf (ingevuld door de eigenaar)\n\n` +
    `${answersBlock(COMPANY_QUESTIONS, input.answers, input.language)}\n\n` +
    `## Blok 2 · Het werk volgens de eigenaar\n\n` +
    `${answersBlock(DEPARTMENT_QUESTIONS, input.answers, input.language)}`;

  if (isTeam && input.team) {
    userContent += `\n\n## De afdelingen (${input.team.completedCount} van ${input.team.invitedCount} uitgenodigde collega's klaar)`;
    for (const department of input.team.departments) {
      userContent += `\n\n### Afdeling: ${department.name}`;
      for (const respondent of department.respondents) {
        if (!respondent.completed) {
          userContent += `\n\n#### Invuller: ${respondent.name} — nog niet ingevuld`;
          continue;
        }
        userContent +=
          `\n\n#### Invuller: ${respondent.name}\n\n` +
          answersBlock(DEPARTMENT_QUESTIONS, respondent.answers, input.language);
      }
    }
  }

  // De kaart gaat mee zodra ÉÉN sectie capaciteit-ids draagt: openVragen en
  // zoZietHetEruit verwijzen er net zo goed naar als watDitToevoegt. Voorheen
  // hing de kaart alleen aan sectie F, waardoor een invuller zonder AI-gebruik
  // secties kon verliezen op onbekende ids.
  const wantsCapabilities = wantsAddedValue || wantsBeforeAfter;
  const system =
    SYSTEM_PROMPT +
    (isTeam ? TEAM_PROMPT_EXTRA : "") +
    (wantsOwnPicture ? OWN_PICTURE_PROMPT_EXTRA : "") +
    (wantsBeforeAfter ? BEFORE_AFTER_PROMPT_EXTRA : "") +
    (wantsAddedValue ? ADDED_VALUE_PROMPT_EXTRA : "") +
    (wantsCapabilities ? `\n\n${capabilitiesPromptBlock()}` : "");

  // KAN-381 §8 (ruling Livius 14-08): het rapport draait op het hoogste model,
  // expliciet NIET claude-opus-5. Fable denkt altijd — een thinking-parameter
  // meesturen geeft een 400, dus die ontbreekt hier bewust. effort: high is de
  // kwaliteitsknop; max_tokens dekt denken én tekst samen, dus ruim genomen.
  // De server-side fallback vangt een weigering van de safety-classifier op
  // door hetzelfde verzoek in dezelfde call op het aanbevolen terugvalmodel
  // te draaien, zodat een rapport nooit leeg terugkomt.
  // Start allebei tegelijk: het kijkje vooruit heeft alleen dezelfde
  // antwoorden nodig, dus wachten op het hoofdrapport zou pure vertraging zijn.
  const fromScratchPromise = wantsFromScratch
    ? generateFromScratch(
        client,
        // De verbodslijst gaat letterlijk mee. De guard gooit het hele blok
        // weg op één vergelijkend woord, en dat is te duur om aan een
        // algemene toon-instructie over te laten (BS Toys, 24 aug: alles
        // viel om op het woord "beter").
        `${FROM_SCRATCH_SYSTEM}\n\nDeze woorden mogen nergens in dit blok voorkomen, ook niet verbogen: ${FORBIDDEN_CLAIMS.join(", ")}. Ook geen procenttekens en geen merknamen van andere aanbieders. Schrijf niet dat iets beter of sneller wordt; beschrijf alleen hoe het werk dan loopt.\n\n${capabilitiesPromptBlock({ vooruitblik: true })}`,
        userContent,
      )
    : Promise.resolve(undefined);

  const stream = client.beta.messages.stream({
    model: "claude-fable-5",
    max_tokens: 64000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system,
    output_config: {
      effort: "high",
      format: {
        type: "json_schema",
        schema: reportSchema(
          isTeam,
          wantsAddedValue,
          wantsOwnPicture,
          wantsBeforeAfter,
        ),
      },
    },
    messages: [{ role: "user", content: userContent }],
  } as never);
  const response = await stream.finalMessage();

  // Eén regel per rapport met het werkelijke verbruik, terug te lezen in de
  // Vercel-logs (KAN-381 §8 vraagt het echte bedrag per rapport).
  console.log(
    `SCAN_REPORT_USAGE: model=${response.model} input=${response.usage.input_tokens} output=${response.usage.output_tokens}`,
  );

  if (response.stop_reason === "refusal") {
    // Ook het fallback-model weigerde; de retry-laag en het lazy pad vangen dit.
    throw new Error("Rapportgeneratie geweigerd door het model");
  }
  const text = (
    response.content.find((block) => block.type === "text") as
      | { text: string }
      | undefined
  )?.text;
  if (!text) {
    throw new Error(`Geen tekst in modelrespons (stop_reason: ${response.stop_reason})`);
  }

  const parsed = JSON.parse(text) as Omit<ReportPayload, "version" | "language" | "scanVorm">;
  const watDitToevoegt = guardAddedValue(parsed.watDitToevoegt, input.answers);
  const jouwEigenBeeld = guardOwnPicture(parsed.jouwEigenBeeld, input.answers);
  const zoZietHetEruit = guardBeforeAfter(parsed.zoZietHetEruit, input.answers);
  const vanafNul = guardFromScratch(
    await fromScratchPromise,
    zoZietHetEruit,
    input.answers,
  );
  const watErVerandert = guardWatErVerandert(parsed.watErVerandert, input.answers);
  return {
    version: 3,
    language: input.language,
    scanVorm: isTeam ? "team" : "solo",
    ...parsed,
    watErVerandert,
    watDitToevoegt,
    zoZietHetEruit,
    vanafNul,
    jouwEigenBeeld,
  };
}
