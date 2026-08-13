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
import { CAPABILITY_IDS, capabilitiesPromptBlock } from "./capabilities";
import {
  hasAnswerValue,
  helpFor,
  storedLabels,
  type AnswerMap,
} from "./visibility";

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

/** Sectie F: wat dit toevoegt aan wat ze vandaag al doen. */
export interface ReportAddedValue {
  watErNuGoedGaat: string;
  grenzen: ReportLimit[];
  watErvoorInDePlaatsKomt: string;
  watErvoorNodigIs: string;
}

export interface ReportPayload {
  version: 1 | 2;
  language: "nl" | "en";
  /** Optioneel: rapporten van vóór de teamflow zijn allemaal solo. */
  scanVorm?: "solo" | "team";
  gehoord: string;
  bekeken: string;
  ranglijst: {
    hierZouIkBeginnen: ReportWorkflowItem[];
    sterkeKandidaten: ReportWorkflowItem[];
    laterInteressant: string[];
  };
  /** Alleen bij teamrapporten: sectie 4, de kern van de meerwaarde. */
  watJeMensenZagen?: string;
  /** Sectie F — alleen als zij zelf al met AI werken; anders afwezig. */
  watDitToevoegt?: ReportAddedValue;
  /** Optioneel: rapporten van vóór versie 2 hebben dit blok niet. */
  kennisbeeld?: {
    systemen: string[];
    alleenInHoofden: string[];
    observatie: string;
  };
  waarWeZoudenBeginnen: string;
  /** Oude vorm (rapporten van vóór 13 aug): een lijst huiswerkregels.
   * Blijft in het type zodat opgeslagen rapporten blijven renderen. */
  uitzoeksuggesties: string[];
  /** Nieuwe vorm: dezelfde vragen, maar met wat er nodig is om ze te kunnen
   * stellen. Afwezig als zij geen openstaande vragen gaven of als de guard
   * alles heeft laten vallen. */
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

function openQuestionsSchema() {
  return {
    type: "array",
    items: {
      type: "object",
      properties: {
        vraag: { type: "string" },
        citaat: { type: "string" },
        vraagId: { type: "string" },
        capaciteit: { type: "string" },
        watErvoorNodigIs: { type: "string" },
        status: {
          type: "string",
          enum: ["kan-nu", "kan-zodra-vastgelegd", "maatwerk"],
        },
      },
      required: [
        "vraag",
        "citaat",
        "vraagId",
        "capaciteit",
        "watErvoorNodigIs",
        "status",
      ],
      additionalProperties: false,
    },
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
  openQuestions: boolean,
) {
  return {
    type: "object",
    properties: {
      gehoord: { type: "string" },
      bekeken: { type: "string" },
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
      ...(openQuestions
        ? { openVragen: openQuestionsSchema() }
        : { uitzoeksuggesties: { type: "array", items: { type: "string" } } }),
      waarJeInKuntGroeien: { type: "string" },
      ...(ownPicture ? { jouwEigenBeeld: ownPictureSchema() } : {}),
    },
    required: [
      "gehoord",
      "bekeken",
      "ranglijst",
      ...(team ? ["watJeMensenZagen"] : []),
      ...(addedValue ? ["watDitToevoegt"] : []),
      "kennisbeeld",
      "waarWeZoudenBeginnen",
      openQuestions ? "openVragen" : "uitzoeksuggesties",
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

const OPEN_QUESTION_IDS = ["co-blindspot", "dept-cant-answer", "dept-answer-where"];

export function openQuestionsApply(answers: AnswerMap): boolean {
  return OPEN_QUESTION_IDS.some((id) => hasAnswerValue(answers.get(id)));
}

const OPEN_QUESTIONS_PROMPT_EXTRA = `

In plaats van uitzoeksuggesties schrijf je openVragen: de vragen die deze invuller vandaag niet met zekerheid kan beantwoorden (co-blindspot, dept-cant-answer, dept-answer-where), maar dan omgedraaid. Niet als huiswerk teruggegeven, maar met wat er nodig is om zo'n vraag wél te kunnen stellen. Drie tot vijf stuks, de rest laat je weg.

Per vraag:
- vraag: hun vraag, in hun eigen woorden en als vraag geformuleerd. Kort.
- citaat: het stuk uit hun antwoord waar deze vraag uit komt, LETTERLIJK overgenomen, minimaal vijftien tekens, niets gecorrigeerd. Dit wordt woord voor woord tegen hun antwoorden gehouden. Bij een aangevinkte optie neem je het aangevinkte label letterlijk over. vraagId is de vraag waar het citaat uit komt.
- capaciteit: het id uit de capaciteitenkaart waarmee dit antwoord bereikbaar wordt.
- watErvoorNodigIs: één of twee zinnen, eerlijk. Wat moet er vastliggen of gebeuren voordat deze vraag beantwoord kan worden, en wat daarvan er volgens hun eigen antwoorden vandaag nog niet is. Zit het antwoord buiten hun bedrijf, zeg dat. Zit het bij hun klanten, zeg dat.
- status: kan-nu als het met bestaande bronnen kan zonder dat zij eerst iets moeten vastleggen; kan-zodra-vastgelegd als er eerst kennis van henzelf vastgelegd moet worden; maatwerk als het buiten de kaart valt.

Harde regels: bied nooit aan dat wij het voor ze uitzoeken, en schrijf ook nooit dat wij iets voor ze klaarzetten of inrichten. Het gaat erom wat hun bedrijf straks zelf beantwoordt. Beloof geen antwoord, alleen de weg ernaartoe. Geen termijn, geen prijs, geen getal dat zij niet zelf noemden. Kun je bij een vraag niet eerlijk zeggen wat ervoor nodig is, laat die vraag dan weg.`;

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
- waarJeInKuntGroeien verbindt dat beeld vervolgens met de workflows uit de ranglijst: wat zij beschrijven vraagt dat de kennis eronder ergens staat, en dat is precies wat er gebeurt zodra het eerste werk loopt. Daarna de bestaande strekking: het werk uit de tweede groep ligt dan voor de hand, en wat er over hun manier van werken wordt vastgelegd komt daar opnieuw bij van pas.
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

Drie blokken, in deze volgorde, en de volgorde is het halve werk:
- watErNuGoedGaat: één alinea over wat er nu al goed werkt, in hun eigen woorden en zonder ondermijning. Iemand die zijn eigen AI voedt met eigen bestanden heeft iets echts opgebouwd; erken dat voluit. Wie hier begint met wat er mis is, is de lezer kwijt.
- grenzen: twee tot vier grenzen van die huidige aanpak. Elke grens is een EIGENSCHAP van de opzet, nooit een verwijt en nooit een uitspraak over het taalmodel. Kies alleen grenzen die volgen uit hun eigen antwoorden. De vier die meestal spelen: de context is van één persoon en vertrekt met diegene; niemand kan zien wat erin zit of wat nog klopt, want er is geen eigenaar, herkomst of datum; iedereen bouwt zijn eigen versie van de waarheid; het kan praten maar niet uitvoeren (rekenen, bronnen ophalen, stappen ketenen, op een moment draaien, pauzeren voor goedkeuring). Zeggen zij zelf dat ze prompts of context al delen, dan laat je de derde weg.
- Per grens: grens = één of twee zinnen in gewone taal. citaat = de woorden uit hun eigen antwoord waar deze grens uit volgt, LETTERLIJK overgenomen, minimaal vijftien tekens, zonder iets te corrigeren of mooier te maken. vraagId = de vraag waar dat citaat uit komt. capaciteit = het id uit de capaciteitenkaart dat deze grens adresseert.
- watErvoorInDePlaatsKomt: één alinea. Niemand hoeft over te stappen en niemand hoeft buiten te blijven, want het is een keuze per persoon: wie in zijn eigen AI-tool wil blijven werken koppelt die aan de vastgelegde kennis, en wie liever in één omgeving werkt doet dat in het platform zelf. Schrijf het ook zo, als twee even normale opties, en nooit alsof er maar één weg is. Wat in beide gevallen verandert is waar de context vandaan komt, en dat er bovenop diezelfde kennis werk kan draaien dat een gesprek niet doet.
- watErvoorNodigIs: één of twee zinnen, eerlijk. Iemand moet bepalen wat er gedeeld hoort en wie wat mag zien, en dat is werk.

Harde regels voor juist deze sectie, want dit is de plek waar het rapport het snelst een folder wordt: nooit een uitspraak over het taalmodel, wij zijn niet slimmer dan wat zij gebruiken en dat is het punt niet. Nooit "dat kan jouw tool niet" als kale bewering, alleen eigenschappen die uit hun eigen antwoord volgen. Geen merknamen van andere aanbieders. Geen prijs, geen migratieverhaal, geen belofte dat het beter wordt, geen woorden als beter, sneller, slimmer of krachtiger. Getallen alleen als zij die zelf noemden.`;

const TEAM_PROMPT_EXTRA = `

Dit is een TEAMSCAN: meerdere invullers, elk over hun eigen afdeling. De antwoorden staan per afdeling en per invuller gegroepeerd; behandel elke afdeling als een eigen beeld en gooi antwoorden van verschillende invullers nooit op één hoop. Aanvullende regels:
- bekeken: benoem per afdeling wie meedeed (voornamen volstaan) en wees eerlijk over wie nog niet heeft ingevuld; die afdelingen ontbreken in het beeld en dat zeg je gewoon.
- Per workflow-item vul je ook afdeling in: de naam van de afdeling waar dit werk vandaan komt, letterlijk zoals de eigenaar hem noemde. De ranglijst blijft één totaallijst over de afdelingen heen.
- watJeMensenZagen: de kern van de meerwaarde van een teamscan. Eén of twee alinea's over wat de invullers zagen dat de eigenaar zelf niet noemde: werk dat in meerdere afdelingen terugkomt zonder dat iemand dat doorhad, overdrachten waar afdelingen op elkaar wachten, en kennis die de eigenaar bij systemen dacht maar volgens de invullers in hoofden zit (of andersom). Alleen uit de antwoorden, niets verzinnen; is er weinig verschil, zeg dat dan eerlijk.
- gehoord blijft over het bedrijf als geheel, vanuit de antwoorden van de eigenaar (de eerste invuller).`;

const SYSTEM_PROMPT = `Je schrijft het rapport van de AI-scan van nativ, op basis van de antwoorden van één invuller (de quick scan, solo). Het rapport doet drie dingen, in deze volgorde: laten zien dat we hún bedrijf hebben gehoord, laten zien welk werk zich leent om door AI te laten doen en in welke volgorde, en één klein startpunt aanwijzen.

Rangschik op vijf factoren: (1) volume en herhaling (dept-wf-frequency plus aantallen in het procesverhaal, overdrachten uit co-handoffs, terugkerende overleggen uit co-meetings, vinkjes uit dept-time-sinks), (2) tijd (dept-wf-hours of dept-wf-hours-own, gewogen met dept-wf-confidence), (3) veilig om te beginnen (uit het procesverhaal en dept-wf-stall: gaat het resultaat naar buiten, of blijft het binnen en is het terug te draaien), (4) past bij hun doel (co-goal, met co-ai-focus als tweede as en dept-first-hire als wens-signaal), (5) grip op de kennis (dept-wf-knowledge, co-knowledge-home en co-knowledge-carrier). De eerste drie bepalen de volgorde, de laatste twee schuiven binnen die volgorde.

Secties die jij schrijft:
- gehoord: één alinea over hún bedrijf, in hun eigen woorden, opgebouwd uit co-profile en co-goal. Geen samenvatting van onze methode. Sluit af met één feitelijke zin over hoe AI vandaag bij hen wordt gebruikt, uit co-ai-today en co-ai-history: beschrijvend, zonder oordeel, zonder aanbeveling. Is het antwoord "bijna niemand gebruikt het", schrijf dat dan net zo neutraal op.
- bekeken: kort en eerlijk over de dekking. Dit is een solo-scan: de strekking is "Dit is jouw beeld van het bedrijf", met in één of twee zinnen wat er in kaart is gebracht.
- ranglijst: hierZouIkBeginnen bevat 1 workflow (soms 2), sterkeKandidaten 3 tot 5 als de antwoorden dat dragen (minder mag), laterInteressant de rest als één regel per stuk. Het doorgelopen proces uit dept-workflow-story is de kandidaat voor hierZouIkBeginnen; de overige vinkjes uit dept-time-sinks, de overdrachten uit co-handoffs en de wens uit dept-first-hire vullen de andere groepen. Items zonder urengetal laten dat eerlijk zien in watHetKost (bijvoorbeeld: "Hier heb je geen uren voor opgegeven").
- Per workflow-item: naam = de naam van het werk in hun woorden plus niets erbij; watHetNuIs = één zin uit hun eigen procesverhaal; hoeVaak = meerdere keren per dag / dagelijks / wekelijks / maandelijks; watHetKost = "Ongeveer X uur per week" in hun eigen opgave, met "ruwe schatting" erbij als dept-wf-confidence 1 of 2 was; waarHetBlijftLiggen = één zin uit dept-wf-stall; waaromDitZichLeent = één zin: het komt vaak voorbij, de stappen zijn elke keer hetzelfde, en de meeste beslissingen zijn dezelfde; alsErIetsMisgaat = "Je ziet het meteen en je draait het terug." of "Dit gaat naar buiten, dus hier kijkt altijd iemand mee voordat het weg is." (kies wat past bij het proces); waarDeKennisZit = één zin over waar de kennis en gegevens voor dít werk nu vandaan komen, uit dept-wf-systems en dept-wf-knowledge: noem de systemen, mailboxen of documenten die zij zelf noemden, en zeg erbij welk deel nergens is vastgelegd. Noemden ze er niets over, schrijf dan dat ze daar niets over hebben gezegd. Verzin nooit een systeem dat zij niet noemden.
- kennisbeeld: over de workflows heen, uit dept-wf-systems, dept-wf-knowledge, dept-answer-where, co-knowledge-home, co-meetings en co-knowledge-carrier. systemen = de systemen, mailboxen en documenten die zij noemden en die steeds terugkomen, elk als korte losse regel met erbij waarvoor het gebruikt wordt; terugkerende overleggen uit co-meetings horen hier ook thuis als daar kennis ontstaat, met erbij of er iemand aantekeningen maakt. alleenInHoofden = de kennis die volgens hun eigen antwoorden nergens is vastgelegd en dus bij mensen zit, elk als korte losse regel; noemden zij bij co-knowledge-carrier een persoon, dan staat wat diegene weet hier als eigen regel, zonder de naam erbij. observatie = één alinea die benoemt wat dit betekent: om dit werk door AI te laten doen moet die kennis bereikbaar en vastgelegd zijn, en dat is nu deels niet zo. Geen oplossing aanbieden, geen product noemen, alleen de constatering. Noemden ze te weinig om iets te zeggen, houd de lijsten dan leeg en schrijf in observatie eerlijk dat hier nog weinig over bekend is en dat dit een goede eerste vraag is voor een vervolg.
- waarWeZoudenBeginnen: één workflow, met in twee of drie zinnen waarom juist deze. Altijd dezelfde vorm: het komt vaak voorbij, het kost nu echt tijd, en als het misgaat is dat klein en omkeerbaar.
- uitzoeksuggesties: de vragen die de invuller zelf niet kon beantwoorden (co-blindspot, dept-cant-answer, dept-answer-where) teruggegeven als onderzoeksuggesties, drie tot vijf maximaal, met per stuk waar het antwoord volgens hen zit. Schrijf ze als vragen die zij zelf kunnen uitzoeken; bied nooit aan dat wij het voor ze doen. Leeg laten als er niets te melden is.
- waarJeInKuntGroeien: één korte alinea. Geen roadmap, geen fasering, geen termijnen. Strekking: als de eerste workflow eenmaal loopt, ligt het werk uit de tweede groep voor de hand, en wat er over jullie manier van werken wordt vastgelegd komt daar ook weer bij van pas.

Harde regels: geen cijfer of readiness-score, geen sterren, geen percentages (de volgorde zelf is het oordeel). Geen besparingsbelofte en geen bedrag: rapporteer wat het werk nu kost, in hun eigen opgave. Geen prijzen. Geen termijnen en geen belofte over wanneer iets werkt. Het woord "digitale collega" komt nergens voor; het rapport levert workflows op. Wat de invuller al met AI geprobeerd heeft (co-ai-history) raad je niet opnieuw aan. Schrijf in gewone taal, korte zinnen, geen jargon, geen buzzwoorden, geen gedachtestreepjes. Schrijf in de taal van de antwoorden.`;

// ---------------------------------------------------------------------------
// De guard op sectie F. De prompt vraagt om herkomst; deze code controleert
// hem. Zelfde patroon als de membership guards in de engine (app/api/brain.py):
// wat niet in de meegestuurde lijst staat, wordt niet vertrouwd maar
// weggegooid. Een instructie is geen garantie, een check wel.
// ---------------------------------------------------------------------------

/** Woorden die in sectie F nooit voorkomen: vergelijkingen met hun tool of
 * ons model, beloftes, prijzen en merknamen van andere aanbieders. */
const FORBIDDEN_IN_ADDED_VALUE = [
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
  "%",
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

function tripsForbidden(text: string): string | null {
  const lower = text.toLowerCase();
  return FORBIDDEN_IN_ADDED_VALUE.find((word) => lower.includes(word)) ?? null;
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

  for (const [field, text] of [
    ["watErNuGoedGaat", section.watErNuGoedGaat],
    ["watErvoorInDePlaatsKomt", section.watErvoorInDePlaatsKomt],
    ["watErvoorNodigIs", section.watErvoorNodigIs],
  ] as const) {
    if (!text || !text.trim()) return drop(`${field} is leeg`);
    const word = tripsForbidden(text);
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

const OPEN_QUESTION_STATUSES = new Set([
  "kan-nu",
  "kan-zodra-vastgelegd",
  "maatwerk",
]);

/**
 * Zelfde guard als bij sectie F, per vraag: een bestaand capaciteit-id, een
 * citaat dat letterlijk in hun antwoorden staat, een geldige status, en geen
 * verboden woorden of verzonnen getallen. Wat niet klopt valt weg; blijft er
 * niets over, dan verdwijnt de sectie.
 */
export function guardOpenQuestions(
  questions: ReportOpenQuestion[] | undefined,
  answers: AnswerMap,
): ReportOpenQuestion[] | undefined {
  if (!questions || questions.length === 0) return undefined;
  const haystack = answersHaystack(answers);

  const kept = questions.filter((q) => {
    const reject = (reason: string) => {
      console.warn(`SCAN_OPEN_QUESTION_DROPPED: ${reason}`);
      return false;
    };
    const quote = normalizeForMatch(q.citaat ?? "");
    if (quote.length < MIN_QUOTE_CHARS) return reject("citaat te kort");
    if (!haystack.includes(quote)) return reject("citaat niet in antwoorden");
    if (!CAPABILITY_IDS.has(q.capaciteit)) {
      return reject(`onbekende capaciteit "${q.capaciteit}"`);
    }
    if (!OPEN_QUESTION_STATUSES.has(q.status)) {
      return reject(`onbekende status "${q.status}"`);
    }
    for (const text of [q.vraag, q.watErvoorNodigIs]) {
      const word = tripsForbidden(text ?? "");
      if (word) return reject(`verboden woord "${word}"`);
      const number = inventsNumber(text ?? "", haystack);
      if (number) return reject(`verzonnen getal ${number}`);
    }
    return true;
  });

  if (kept.length === 0) {
    console.warn("SCAN_OPEN_QUESTIONS_DROPPED: geen enkele vraag overleefde de guard");
    return undefined;
  }
  return kept;
}

/**
 * Het citaat moet letterlijk in hun antwoorden staan, anders verdwijnt het
 * blok. Alleen het citaat: de alinea eronder blijft, want die draagt ook
 * zonder citaat betekenis.
 */
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
  const wantsOpenQuestions = openQuestionsApply(input.answers);

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

  const system =
    SYSTEM_PROMPT +
    (isTeam ? TEAM_PROMPT_EXTRA : "") +
    (wantsOwnPicture ? OWN_PICTURE_PROMPT_EXTRA : "") +
    (wantsOpenQuestions ? OPEN_QUESTIONS_PROMPT_EXTRA : "") +
    (wantsAddedValue
      ? ADDED_VALUE_PROMPT_EXTRA + `\n\n${capabilitiesPromptBlock()}`
      : "");

  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: 16000,
    system,
    output_config: {
      format: {
        type: "json_schema",
        schema: reportSchema(
          isTeam,
          wantsAddedValue,
          wantsOwnPicture,
          wantsOpenQuestions,
        ),
      },
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

  const parsed = JSON.parse(text) as Omit<ReportPayload, "version" | "language" | "scanVorm">;
  const watDitToevoegt = guardAddedValue(parsed.watDitToevoegt, input.answers);
  const jouwEigenBeeld = guardOwnPicture(parsed.jouwEigenBeeld, input.answers);
  const openVragen = guardOpenQuestions(parsed.openVragen, input.answers);
  return {
    version: 2,
    language: input.language,
    scanVorm: isTeam ? "team" : "solo",
    ...parsed,
    watDitToevoegt,
    jouwEigenBeeld,
    openVragen,
    // De oude huiswerklijst wordt niet meer gevraagd zodra openVragen aan
    // staat; oude opgeslagen rapporten houden hun eigen veld.
    uitzoeksuggesties: parsed.uitzoeksuggesties ?? [],
  };
}
