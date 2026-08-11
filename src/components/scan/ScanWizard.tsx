"use client";

/**
 * De vragenflow van de quick scan. Twee blokken (Jullie bedrijf / Het werk),
 * autosave per antwoord bij het verlaten van het veld, en dezelfde
 * zichtbaarheids-evaluator als de server (src/lib/scan/visibility.ts).
 * Teksten komen uit de bank (v4) — hier staat geen eigen vraag-copy.
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";
import {
  COMPANY_QUESTIONS,
  DEPARTMENT_QUESTIONS,
  type ScanQuestion,
  type ScanQuestionOption,
} from "@/lib/scan/bank";
import {
  blockProgress,
  companyIsSolo,
  helpFor,
  isQuestionRequired,
  isQuestionVisible,
  missingRequiredIds,
  storedLabels,
  type AnswerMap,
} from "@/lib/scan/visibility";

const translations = {
  nl: {
    block1: "Jullie bedrijf",
    block2: "Het werk",
    stepOf: "Blok {n} van 2",
    optional: "optioneel",
    moreTips: "Meer tips",
    saved: "Opgeslagen",
    saving: "Opslaan...",
    saveError: "Opslaan mislukte. Controleer je verbinding en probeer het opnieuw.",
    next: "Verder naar Het werk",
    back: "Terug naar Jullie bedrijf",
    complete: "Afronden en rapport maken",
    completing: "We maken je rapport. Dit kan een paar minuten duren, laat deze pagina open staan.",
    completeError: "Afronden mislukte. Probeer het opnieuw.",
    missingIntro: "Nog niet alles is ingevuld. Open vraag:",
    linkHint: "Dit is jouw eigen link. Bewaar hem, dan kun je altijd verder waar je was gebleven.",
    copyLink: "Kopieer link",
    copied: "Gekopieerd",
    micStart: "Spreek je antwoord in",
    micStop: "Stop met opnemen",
    micListening: "Aan het luisteren...",
    answered: "beantwoord",
  },
  en: {
    block1: "Your company",
    block2: "The work",
    stepOf: "Block {n} of 2",
    optional: "optional",
    moreTips: "More tips",
    saved: "Saved",
    saving: "Saving...",
    saveError: "Saving failed. Check your connection and try again.",
    next: "Continue to The work",
    back: "Back to Your company",
    complete: "Finish and create report",
    completing: "We are creating your report. This can take a few minutes, keep this page open.",
    completeError: "Finishing failed. Please try again.",
    missingIntro: "Not everything is filled in yet. Open question:",
    linkHint: "This is your personal link. Save it and you can always pick up where you left off.",
    copyLink: "Copy link",
    copied: "Copied",
    micStart: "Dictate your answer",
    micStop: "Stop recording",
    micListening: "Listening...",
    answered: "answered",
  },
};

type SaveState = "idle" | "saving" | "saved" | "error";

interface WizardProps {
  token: string;
  companyName: string;
  initialAnswers: Record<string, string>;
}

export default function ScanWizard({ token, initialAnswers }: WizardProps) {
  const { t, language } = useLanguage();
  const c = t(translations);
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [block, setBlock] = useState<1 | 2>(1);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const answerMap: AnswerMap = useMemo(() => new Map(Object.entries(answers)), [answers]);
  const options = useMemo(() => ({ companySolo: companyIsSolo(answerMap) }), [answerMap]);

  const questions = block === 1 ? COMPANY_QUESTIONS : DEPARTMENT_QUESTIONS;
  const progress1 = blockProgress(COMPANY_QUESTIONS, answerMap, options);
  const progress2 = blockProgress(DEPARTMENT_QUESTIONS, answerMap, options);

  const persist = useCallback(
    async (questionId: string, value: string) => {
      setSaveState("saving");
      try {
        const res = await fetch("/api/scan/answer", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, questionId, value }),
        });
        if (!res.ok) throw new Error("save failed");
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    [token],
  );

  const setAndSave = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      void persist(questionId, value);
    },
    [persist],
  );

  const setLocal = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  async function handleComplete() {
    const open = [
      ...missingRequiredIds(COMPANY_QUESTIONS, answerMap, options),
      ...missingRequiredIds(DEPARTMENT_QUESTIONS, answerMap, options),
    ];
    if (open.length > 0) {
      setMissing(open);
      const first = document.getElementById(`vraag-${open[0]}`);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      else if (COMPANY_QUESTIONS.some((q) => q.id === open[0])) setBlock(1);
      return;
    }
    setMissing([]);
    setCompleting(true);
    setCompleteError("");
    try {
      const res = await fetch("/api/scan/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, lang: language }),
      });
      if (!res.ok) throw new Error("complete failed");
      const { reportUrl } = (await res.json()) as { reportUrl: string };
      router.push(reportUrl);
    } catch {
      setCompleteError(c.completeError);
      setCompleting(false);
    }
  }

  function switchBlock(next: 1 | 2) {
    setBlock(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // stil: de link staat gewoon in de adresbalk
    }
  }

  const progress = block === 1 ? progress1 : progress2;

  return (
    <section className="py-10 md:py-14 px-6 pb-20 md:pb-28">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <p className="text-sm text-grey/50">{c.stepOf.replace("{n}", String(block))}</p>
          <h1 className="mt-1 font-serif text-3xl md:text-4xl text-grey">
            {block === 1 ? c.block1 : c.block2}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-sage-light overflow-hidden">
              <div
                className="h-full bg-sage transition-all"
                style={{
                  width: `${progress.total === 0 ? 0 : Math.round((progress.answered / progress.total) * 100)}%`,
                }}
              />
            </div>
            <span className="text-xs text-grey/50 whitespace-nowrap">
              {progress.answered}/{progress.total} {c.answered}
            </span>
          </div>
          <p className="mt-4 text-xs text-grey/40">
            {c.linkHint}{" "}
            <button
              type="button"
              onClick={copyLink}
              className="text-sage hover:underline cursor-pointer"
            >
              {copied ? c.copied : c.copyLink}
            </button>
          </p>
        </FadeIn>

        <div className="mt-8 space-y-6">
          {questions.map((question) => {
            if (!isQuestionVisible(question, answerMap, options)) return null;
            return (
              <QuestionCard
                key={question.id}
                question={question}
                answerMap={answerMap}
                value={answers[question.id] ?? ""}
                lang={language}
                required={isQuestionRequired(question, answerMap, options)}
                highlight={missing.includes(question.id)}
                labels={c}
                onCommit={(value) => setAndSave(question.id, value)}
                onLocal={(value) => setLocal(question.id, value)}
              />
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          {block === 2 ? (
            <button
              type="button"
              onClick={() => switchBlock(1)}
              className="text-grey/60 hover:text-grey transition-colors cursor-pointer"
            >
              ← {c.back}
            </button>
          ) : (
            <span />
          )}
          {block === 1 ? (
            <button
              type="button"
              onClick={() => switchBlock(2)}
              className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer"
            >
              {c.next} →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={completing}
              className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {c.complete}
            </button>
          )}
        </div>

        {missing.length > 0 && (
          <p className="mt-4 text-error text-sm text-right">
            {c.missingIntro} {missing.length}
          </p>
        )}
        {completing && (
          <p className="mt-4 text-sm text-grey/60 text-right">{c.completing}</p>
        )}
        {completeError && <p className="mt-4 text-error text-sm text-right">{completeError}</p>}

        <div className="fixed bottom-4 right-4 pointer-events-none">
          {saveState === "saving" && (
            <span className="text-xs text-grey/50 bg-surface border border-sage-light rounded-full px-3 py-1.5">
              {c.saving}
            </span>
          )}
          {saveState === "saved" && (
            <span className="text-xs text-sage bg-surface border border-sage-light rounded-full px-3 py-1.5">
              {c.saved}
            </span>
          )}
          {saveState === "error" && (
            <span className="text-xs text-error bg-surface border border-error/30 rounded-full px-3 py-1.5 pointer-events-auto">
              {c.saveError}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Eén vraagkaart, met renderer per vraagtype.
// ---------------------------------------------------------------------------

interface QuestionCardProps {
  question: ScanQuestion;
  answerMap: AnswerMap;
  value: string;
  lang: "nl" | "en";
  required: boolean;
  highlight: boolean;
  labels: (typeof translations)["nl"];
  onCommit: (value: string) => void;
  onLocal: (value: string) => void;
}

function QuestionCard({
  question,
  answerMap,
  value,
  lang,
  required,
  highlight,
  labels,
  onCommit,
  onLocal,
}: QuestionCardProps) {
  const help = helpFor(question, answerMap, lang);

  return (
    <div
      id={`vraag-${question.id}`}
      className={`bg-surface rounded-xl p-6 md:p-8 border transition-colors ${
        highlight ? "border-error/60" : "border-sage-light"
      }`}
    >
      <p className="text-grey leading-relaxed">
        {question.text[lang]}
        {!required && (
          <span className="ml-2 text-xs text-grey/40">({labels.optional})</span>
        )}
      </p>
      {help && (
        <p className="mt-2 text-sm text-grey/55 font-light leading-relaxed">{help}</p>
      )}
      {question.moreTips && (
        <details className="mt-2">
          <summary className="text-sm text-sage cursor-pointer select-none">
            {labels.moreTips}
          </summary>
          <p className="mt-1.5 text-sm text-grey/55 font-light leading-relaxed">
            {question.moreTips[lang]}
          </p>
        </details>
      )}
      <div className="mt-4">
        {question.type === "text" && (
          <TextField
            value={value}
            lang={lang}
            labels={labels}
            onLocal={onLocal}
            onCommit={onCommit}
          />
        )}
        {question.type === "number" && (
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={value}
            onChange={(e) => onLocal(e.target.value)}
            onBlur={(e) => onCommit(e.target.value)}
            className="w-32 px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
          />
        )}
        {question.type === "rating" && (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onCommit(String(n))}
                className={`w-11 h-11 rounded-lg border transition-colors cursor-pointer ${
                  value === String(n)
                    ? "bg-sage text-white border-sage"
                    : "bg-cream/50 text-grey border-sage-light hover:border-sage"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
        {question.type === "choice" && (
          <ChoiceField question={question} value={value} lang={lang} onCommit={onCommit} />
        )}
        {question.type === "multi-choice" && (
          <MultiChoiceField question={question} value={value} lang={lang} onCommit={onCommit} />
        )}
      </div>
    </div>
  );
}

function optionSelected(option: ScanQuestionOption, selectedLabels: string[]): boolean {
  return selectedLabels.includes(option.nl) || selectedLabels.includes(option.en);
}

function ChoiceField({
  question,
  value,
  lang,
  onCommit,
}: {
  question: ScanQuestion;
  value: string;
  lang: "nl" | "en";
  onCommit: (value: string) => void;
}) {
  const selected = value ? storedLabels(question, value) : [];
  return (
    <div className="space-y-2">
      {(question.options ?? []).map((option) => {
        const isSelected = optionSelected(option, selected);
        return (
          <label
            key={option.nl}
            className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
              isSelected
                ? "border-sage bg-sage-light"
                : "border-sage-light bg-cream/50 hover:border-sage/50"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              checked={isSelected}
              onChange={() => onCommit(option[lang])}
              className="mt-1 accent-[#8B9A6B]"
            />
            <span className="text-grey leading-relaxed">{option[lang]}</span>
          </label>
        );
      })}
    </div>
  );
}

function MultiChoiceField({
  question,
  value,
  lang,
  onCommit,
}: {
  question: ScanQuestion;
  value: string;
  lang: "nl" | "en";
  onCommit: (value: string) => void;
}) {
  const selected = value ? storedLabels(question, value) : [];
  const max = question.maxSelect ?? Infinity;

  function toggle(option: ScanQuestionOption) {
    const isSelected = optionSelected(option, selected);
    let next: string[];
    if (isSelected) {
      next = selected.filter((label) => label !== option.nl && label !== option.en);
    } else {
      // Exclusieve optie wist de rest; een gewone optie wist de exclusieve.
      const others = option.exclusive
        ? []
        : selected.filter((label) => {
            const match = (question.options ?? []).find(
              (o) => o.nl === label || o.en === label,
            );
            return !match?.exclusive;
          });
      if (!option.exclusive && others.length >= max) return;
      next = [...others, option[lang]];
    }
    onCommit(JSON.stringify(next));
  }

  return (
    <div className="space-y-2">
      {(question.options ?? []).map((option) => {
        const isSelected = optionSelected(option, selected);
        const atMax =
          !isSelected && !option.exclusive && selected.length >= max &&
          !selected.some((label) => {
            const match = (question.options ?? []).find(
              (o) => o.nl === label || o.en === label,
            );
            return match?.exclusive;
          });
        return (
          <label
            key={option.nl}
            className={`flex items-start gap-3 px-4 py-3 rounded-lg border transition-colors ${
              isSelected
                ? "border-sage bg-sage-light cursor-pointer"
                : atMax
                  ? "border-sage-light bg-cream/30 opacity-50 cursor-not-allowed"
                  : "border-sage-light bg-cream/50 hover:border-sage/50 cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              disabled={atMax}
              onChange={() => toggle(option)}
              className="mt-1 accent-[#8B9A6B]"
            />
            <span className="text-grey leading-relaxed">{option[lang]}</span>
          </label>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tekstveld met inspreekknop (Web Speech API). De helpteksten adviseren
// inspreken, dus de knop hoort erbij; zonder browserondersteuning valt hij
// stil weg ("Liever typen? Dat kan ook.").
// ---------------------------------------------------------------------------

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechResultEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

interface SpeechResultEventLike {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (
    (w.SpeechRecognition as new () => SpeechRecognitionLike) ??
    (w.webkitSpeechRecognition as new () => SpeechRecognitionLike) ??
    null
  );
}

function TextField({
  value,
  lang,
  labels,
  onLocal,
  onCommit,
}: {
  value: string;
  lang: "nl" | "en";
  labels: (typeof translations)["nl"];
  onLocal: (value: string) => void;
  onCommit: (value: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const supported = useMemo(() => getSpeechRecognition() !== null, []);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  function toggleMic() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = lang === "nl" ? "nl-NL" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) transcript += result[0].transcript;
      }
      if (transcript.trim()) {
        const current = valueRef.current;
        const next = current ? `${current.replace(/\s+$/, "")} ${transcript.trim()}` : transcript.trim();
        onLocal(next);
      }
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      onCommit(valueRef.current);
    };
    recognition.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  return (
    <div>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onLocal(e.target.value)}
        onBlur={(e) => onCommit(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition resize-y"
      />
      {supported && (
        <button
          type="button"
          onClick={toggleMic}
          className={`mt-2 inline-flex items-center gap-2 text-sm rounded-full px-4 py-2 border transition-colors cursor-pointer ${
            listening
              ? "border-error/50 text-error bg-error/5"
              : "border-sage-light text-sage hover:border-sage"
          }`}
        >
          <span aria-hidden>{listening ? "■" : "🎙"}</span>
          {listening ? labels.micListening : labels.micStart}
        </button>
      )}
    </div>
  );
}
