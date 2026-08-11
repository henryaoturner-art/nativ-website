/**
 * Zichtbaarheid, verplichtheid en voortgang van de quick scan — een port van
 * de quick-flavor semantiek uit insightflow-platform
 * (src/lib/scan/question-visibility.ts, NTH-241). Eén evaluator voor de
 * wizard, de voortgang en de afrond-controle op de server.
 *
 * Opslagformaat van antwoorden (scan_answer.value):
 *  - text / number / rating: de waarde als string
 *  - choice: het optielabel zoals getoond (NL of EN)
 *  - multi-choice: JSON-array van getoonde optielabels
 * Mechaniek matcht via optie-TOKENS: labels (beide talen) worden eerst naar
 * tokens vertaald, zodat taal en volgorde nooit de routing kunnen breken.
 */
import {
  COMPANY_QUESTIONS,
  DEPARTMENT_QUESTIONS,
  type ScanCondition,
  type ScanQuestion,
} from "./bank";

export const COMPANY_SIZE_QUESTION_ID = "co-size";
export const COMPANY_SOLO_TOKEN = "solo";

// Quick-urenrouting (NTH-241): dept-role bestaat niet in de quick scan, dus
// de askWhen op het uren-drietal kan nooit gelden. Het scanbrede
// companySolo-signaal vervangt hem: solo → eigen uren + aantal mensen,
// niet-solo → het teamtotaal. De askWhen blijft in de bank staan zodat deze
// vragen als "gated" buiten de geadverteerde telling blijven.
export const WF_HOURS_TEAM_ID = "dept-wf-hours";
export const WF_HOURS_OWN_ID = "dept-wf-hours-own";
export const WF_PEOPLE_ID = "dept-wf-people";
const QUICK_HOURS_ROUTED_IDS = new Set([
  WF_HOURS_TEAM_ID,
  WF_HOURS_OWN_ID,
  WF_PEOPLE_ID,
]);

/** questionId → opgeslagen waarde, voor één respondent binnen één blok. */
export type AnswerMap = ReadonlyMap<string, string>;

export function hasAnswerValue(value: string | null | undefined): boolean {
  if (value == null) return false;
  const trimmed = value.trim();
  return trimmed !== "" && trimmed !== "[]";
}

/** Parse een opgeslagen waarde naar de gekozen labels (multi-choice = JSON-array). */
export function storedLabels(question: ScanQuestion, value: string): string[] {
  if (question.type === "multi-choice") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
    } catch {
      return [];
    }
  }
  return [value];
}

const TOKEN_MAPS = new Map<string, Map<string, string>>();

/** label (NL óf EN) → token, per vraag. */
function tokenMapFor(question: ScanQuestion): Map<string, string> {
  let map = TOKEN_MAPS.get(question.id);
  if (!map) {
    map = new Map();
    for (const option of question.options ?? []) {
      if (!option.token) continue;
      map.set(option.nl, option.token);
      map.set(option.en, option.token);
    }
    TOKEN_MAPS.set(question.id, map);
  }
  return map;
}

function chosenTokens(question: ScanQuestion, value: string): string[] {
  const map = tokenMapFor(question);
  return storedLabels(question, value)
    .map((label) => map.get(label))
    .filter((token): token is string => Boolean(token));
}

function conditionHolds(
  byId: ReadonlyMap<string, ScanQuestion>,
  condition: ScanCondition,
  answers: AnswerMap,
): boolean {
  const target = byId.get(condition.questionId);
  const value = answers.get(condition.questionId);
  if (!target || !hasAnswerValue(value)) return false;
  return chosenTokens(target, value as string).some((token) =>
    condition.optionTokenIn.includes(token),
  );
}

const COMPANY_BY_ID = new Map(COMPANY_QUESTIONS.map((q) => [q.id, q]));
const DEPARTMENT_BY_ID = new Map(DEPARTMENT_QUESTIONS.map((q) => [q.id, q]));

function blockById(question: ScanQuestion): ReadonlyMap<string, ScanQuestion> {
  return COMPANY_BY_ID.has(question.id) ? COMPANY_BY_ID : DEPARTMENT_BY_ID;
}

/** Scanbreed solo-signaal: het co-size-antwoord draagt het solo-token. */
export function companyIsSolo(companyAnswers: AnswerMap): boolean {
  const question = COMPANY_BY_ID.get(COMPANY_SIZE_QUESTION_ID);
  const value = companyAnswers.get(COMPANY_SIZE_QUESTION_ID);
  if (!question || !hasAnswerValue(value)) return false;
  return chosenTokens(question, value as string).includes(COMPANY_SOLO_TOKEN);
}

export interface VisibilityOptions {
  companySolo: boolean;
}

/** Zichtbaarheid binnen het eigen blok. De urenrouting gaat VÓÓR de
 * askWhen-evaluatie, exact zoals in het platform. */
export function isQuestionVisible(
  question: ScanQuestion,
  answers: AnswerMap,
  options: VisibilityOptions,
): boolean {
  if (QUICK_HOURS_ROUTED_IDS.has(question.id)) {
    return question.id === WF_HOURS_TEAM_ID
      ? !options.companySolo
      : options.companySolo;
  }
  const askWhen = question.askWhen;
  if (!askWhen) return true;
  const byId = blockById(question);
  const value = answers.get(askWhen.questionId);
  if (!hasAnswerValue(value)) return false;
  if (!askWhen.optionTokenIn) return true; // answered-poort
  const target = byId.get(askWhen.questionId);
  if (!target) return false;
  return chosenTokens(target, value as string).some((token) =>
    askWhen.optionTokenIn!.includes(token),
  );
}

/** Verplicht = niet-optioneel én zichtbaar én (requiredWhen geldt of
 * ontbreekt). Het uren-drietal is bij zichtbaarheid altijd verplicht. */
export function isQuestionRequired(
  question: ScanQuestion,
  answers: AnswerMap,
  options: VisibilityOptions,
): boolean {
  if (question.optional) return false;
  if (!isQuestionVisible(question, answers, options)) return false;
  if (QUICK_HOURS_ROUTED_IDS.has(question.id)) return true;
  if (question.requiredWhen) {
    return conditionHolds(blockById(question), question.requiredWhen, answers);
  }
  return true;
}

/** Eerste helpWhen-variant die geldt, anders de basishelp. */
export function helpFor(
  question: ScanQuestion,
  answers: AnswerMap,
  lang: "nl" | "en",
): string | null {
  for (const variant of question.helpWhen ?? []) {
    if (conditionHolds(blockById(question), variant, answers)) {
      return variant.help[lang];
    }
  }
  return question.help?.[lang] ?? null;
}

/** De verplichte, zichtbare maar onbeantwoorde vragen van één blok, in
 * bankvolgorde — de afrond-controle op server én client. */
export function missingRequiredIds(
  questions: readonly ScanQuestion[],
  answers: AnswerMap,
  options: VisibilityOptions,
): string[] {
  return questions
    .filter((q) => isQuestionRequired(q, answers, options))
    .filter((q) => !hasAnswerValue(answers.get(q.id)))
    .map((q) => q.id);
}

export interface BlockProgress {
  answered: number;
  total: number;
}

/** Voortgang per blok: verplichte zichtbare vragen, samengevouwen per
 * progressGroup (één slot per groep; beantwoord zodra één lid antwoord heeft). */
export function blockProgress(
  questions: readonly ScanQuestion[],
  answers: AnswerMap,
  options: VisibilityOptions,
): BlockProgress {
  const slots = new Map<string, boolean>();
  for (const question of questions) {
    if (!isQuestionRequired(question, answers, options)) continue;
    const slot = question.progressGroup ?? question.id;
    const answered = hasAnswerValue(answers.get(question.id));
    slots.set(slot, (slots.get(slot) ?? false) || answered);
  }
  const values = [...slots.values()];
  return { answered: values.filter(Boolean).length, total: values.length };
}
