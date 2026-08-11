/**
 * De quick scan-vragenbank (v4) — GEGENEREERDE DATA, niet met de hand wijzigen.
 *
 * Bron: insightflow-platform, branch feat/quickscan-v4-bank-nth241,
 * `scanBankFor(SCAN_BANK_VERSION, "quick")` gedumpt naar bank.json op
 * 2026-08-11. De teksten daarin zijn de op 7 aug vastgestelde quick
 * scan-teksten (gtm/scan/quickscan-vragen-2026-08-07.md) en zijn in NTH-241
 * adversarieel geverifieerd. Tekstwijzigingen horen in de platform-bank
 * thuis en komen hier via een nieuwe dump terecht.
 *
 * Huisregels (overgenomen van het platform):
 *  - ids zijn STABIEL — antwoorden worden ertegen opgeslagen en
 *    scan.bank_version pint het instrument; copy wijzigen mag alleen bij
 *    een nieuwe bankversie via een nieuwe dump.
 *  - Deze module is client-safe: de vragen zijn publiek zichtbaar.
 */
import bankData from "./bank.json";

export type ScanQuestionType =
  | "text"
  | "choice"
  | "multi-choice"
  | "number"
  | "rating";

export interface ScanQuestionOption {
  nl: string;
  en: string;
  /** Stabiel machine-token — mechaniek (gating/routing) sleutelt op tokens,
   * nooit op teksten of volgorde. Niet zichtbaar voor gebruikers. */
  token?: string;
  /** Deze optie deselecteert alle andere selecties (en andersom). */
  exclusive?: boolean;
}

/** Zichtbaarheidspoort: vraag rendert alleen zolang de conditie geldt. */
export interface ScanAskWhen {
  questionId: string;
  optionTokenIn?: string[];
  /** Toon zodra de doelvraag überhaupt een antwoord heeft. */
  answered?: true;
}

export interface ScanCondition {
  questionId: string;
  optionTokenIn: string[];
}

export interface ScanHelpWhen extends ScanCondition {
  help: { nl: string; en: string };
}

export interface ScanQuestion {
  id: string;
  type: ScanQuestionType;
  text: { nl: string; en: string };
  help: { nl: string; en: string } | null;
  options: ScanQuestionOption[] | null;
  optional: boolean;
  maxSelect?: number;
  askWhen?: ScanAskWhen;
  /** Vraag blijft zichtbaar maar is alleen verplicht zolang de conditie
   * geldt. Afwezig op een niet-optionele vraag = verplicht indien zichtbaar. */
  requiredWhen?: ScanCondition;
  /** Vragen met dezelfde groep vullen samen ÉÉN voortgangsslot. */
  progressGroup?: string;
  helpWhen?: ScanHelpWhen[];
  /** Extra tips achter de ingeklapte "Meer tips". */
  moreTips?: { nl: string; en: string };
}

interface BankShape {
  bankVersion: string;
  companyQuestions: ScanQuestion[];
  departmentQuestions: ScanQuestion[];
}

const bank = bankData as unknown as BankShape;

export const SCAN_BANK_VERSION = bank.bankVersion;
export const COMPANY_QUESTIONS: readonly ScanQuestion[] = bank.companyQuestions;
export const DEPARTMENT_QUESTIONS: readonly ScanQuestion[] =
  bank.departmentQuestions;

/** Het quick-werkblok slaat op als afdelingsblok met deze naam, zodat de
 * upgrade naar de teamscan er later afdelingen naast zet (datamodel-doc). */
export const COMPANY_WIDE_DEPARTMENT = { nl: "Het hele bedrijf", en: "The whole company" };

const BY_ID = new Map<string, ScanQuestion>(
  [...bank.companyQuestions, ...bank.departmentQuestions].map((q) => [q.id, q]),
);

export function questionById(id: string): ScanQuestion | null {
  return BY_ID.get(id) ?? null;
}

export function isCompanyQuestionId(id: string): boolean {
  return bank.companyQuestions.some((q) => q.id === id);
}
