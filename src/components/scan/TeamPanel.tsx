"use client";

/**
 * Het teamoverzicht van de scan-eigenaar. Self-service, geen handwerk van
 * nativ: afdelingen aanmaken, collega's uitnodigen (mail gaat automatisch),
 * de voortgang volgen en het rapport (opnieuw) maken wanneer de eigenaar
 * dat wil — ook als nog niet iedereen klaar is.
 */
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "De scan met je team",
    heroSub:
      "Maak je afdelingen aan, precies zoals jullie het bedrijf hebben ingedeeld. Per afdeling nodig je de mensen uit die het werk het beste kennen. Zij krijgen automatisch een mail met hun eigen link.",
    ownTodo: "Vul eerst je eigen vragen in. Daarna kun je hier je team uitnodigen.",
    ownTodoCta: "Naar jouw vragen",
    deptTitle: "Afdelingen",
    deptEmpty: "Nog geen afdelingen. Maak er hieronder een aan en nodig meteen mensen uit.",
    statusLabels: { uitgenodigd: "uitgenodigd", bezig: "bezig", klaar: "klaar" },
    formTitle: "Afdeling toevoegen",
    deptNameLabel: "Naam van de afdeling",
    deptNamePlaceholder: "Bijvoorbeeld: Verkoop, Planning, Administratie",
    personName: "Naam",
    personEmail: "E-mailadres",
    addPerson: "+ Nog iemand",
    removePerson: "Weghalen",
    invite: "Uitnodigen",
    inviting: "Versturen...",
    invitedOk: "Uitnodigingen verstuurd.",
    invitedPartial:
      "De uitnodigingen staan klaar, maar niet elke mail kon worden verstuurd. Stuur deze mensen zelf hun link; die vind je hierboven bij de afdeling.",
    inviteError: "Uitnodigen mislukte. Controleer de gegevens en probeer het opnieuw.",
    completeTitle: "Het rapport",
    completeBody:
      "Jij bepaalt wanneer het rapport gemaakt wordt, ook als nog niet iedereen klaar is. Het rapport zegt eerlijk wie meedeed en wie niet.",
    completeBodyRedo:
      "Er staat al een rapport. Zodra meer collega's hebben ingevuld kun je het opnieuw laten maken; het oude wordt dan vervangen.",
    complete: "Rond af en maak het rapport",
    completeRedo: "Maak het rapport opnieuw",
    completing:
      "We maken het rapport. Dit kan een paar minuten duren, laat deze pagina open staan.",
    completeError: "Afronden mislukte. Probeer het opnieuw.",
    completeMissing:
      "Je eigen vragen zijn nog niet compleet. Vul die eerst in, daarna kun je afronden.",
    viewReport: "Bekijk het huidige rapport",
    linkHint: "Dit is jouw eigen link. Bewaar hem, dan kun je hier altijd terugkomen.",
    copyRespondLink: "Kopieer invullink",
    linkCopied: "Gekopieerd",
  },
  en: {
    heroTitle: "The scan with your team",
    heroSub:
      "Create your departments, exactly the way your company is organised. For each department, invite the people who know the work best. They automatically receive an email with their own link.",
    ownTodo: "Fill in your own questions first. After that you can invite your team here.",
    ownTodoCta: "To your questions",
    deptTitle: "Departments",
    deptEmpty: "No departments yet. Create one below and invite people right away.",
    statusLabels: { uitgenodigd: "invited", bezig: "busy", klaar: "done" },
    formTitle: "Add a department",
    deptNameLabel: "Department name",
    deptNamePlaceholder: "For example: Sales, Planning, Administration",
    personName: "Name",
    personEmail: "Email address",
    addPerson: "+ Add another",
    removePerson: "Remove",
    invite: "Send invitations",
    inviting: "Sending...",
    invitedOk: "Invitations sent.",
    invitedPartial:
      "The invitations are ready, but not every email could be sent. Send those people their link yourself; you find it above, under the department.",
    inviteError: "Inviting failed. Check the details and try again.",
    completeTitle: "The report",
    completeBody:
      "You decide when the report is created, even if not everyone has finished. The report is honest about who took part and who did not.",
    completeBodyRedo:
      "There is already a report. Once more colleagues have filled in their part, you can have it created again; the old one is replaced.",
    complete: "Finish and create the report",
    completeRedo: "Create the report again",
    completing: "We are creating the report. This can take a few minutes, keep this page open.",
    completeError: "Finishing failed. Please try again.",
    completeMissing:
      "Your own questions are not complete yet. Fill those in first, then you can finish.",
    viewReport: "View the current report",
    linkHint: "This is your personal link. Save it and you can always come back here.",
    copyRespondLink: "Copy their link",
    linkCopied: "Copied",
  },
};

interface PanelRespondent {
  name: string;
  email: string;
  status: "uitgenodigd" | "bezig" | "klaar";
  /** Relatief pad van de persoonlijke invullink, voor handmatig doorsturen
   * als de mail niet aankwam. */
  respondUrl: string;
}

interface PanelProps {
  token: string;
  hasReport: boolean;
  ownDone: boolean;
  departments: { name: string; respondents: PanelRespondent[] }[];
}

interface PersonDraft {
  name: string;
  email: string;
}

export default function TeamPanel({ token, hasReport, ownDone, departments }: PanelProps) {
  const { t, language } = useLanguage();
  const c = t(translations);
  const router = useRouter();

  const [deptName, setDeptName] = useState("");
  const [people, setPeople] = useState<PersonDraft[]>([{ name: "", email: "" }]);
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState<"" | "ok" | "partial" | "error">("");
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");

  async function copyRespondLink(respondUrl: string) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${respondUrl}`);
      setCopiedUrl(respondUrl);
      setTimeout(() => setCopiedUrl(""), 2000);
    } catch {
      // stil: kopiëren is een extraatje, de mail is de hoofdroute
    }
  }

  // Alleen afdelingen met uitgenodigde mensen tellen als team-afdeling; de
  // eigen "bedrijfsbrede" afdeling van de quick scan blijft buiten beeld.
  const teamDepartments = departments.filter((d) => d.respondents.length > 0);

  async function handleInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInviting(true);
    setInviteMessage("");
    try {
      const res = await fetch("/api/scan/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          departmentName: deptName,
          people: people.filter((p) => p.name.trim() || p.email.trim()),
          lang: language,
        }),
      });
      if (!res.ok) throw new Error("invite failed");
      const { failedEmails } = (await res.json()) as { failedEmails: string[] };
      setInviteMessage(failedEmails.length > 0 ? "partial" : "ok");
      setDeptName("");
      setPeople([{ name: "", email: "" }]);
      router.refresh();
    } catch {
      setInviteMessage("error");
    } finally {
      setInviting(false);
    }
  }

  async function handleComplete() {
    setCompleting(true);
    setCompleteError("");
    try {
      const res = await fetch("/api/scan/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, lang: language }),
      });
      if (res.status === 422) {
        setCompleteError(c.completeMissing);
        setCompleting(false);
        return;
      }
      if (!res.ok) throw new Error("complete failed");
      const { reportUrl } = (await res.json()) as { reportUrl: string };
      router.push(reportUrl);
    } catch {
      setCompleteError(c.completeError);
      setCompleting(false);
    }
  }

  function setPerson(index: number, patch: Partial<PersonDraft>) {
    setPeople((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  return (
    <section className="py-10 md:py-14 px-6 pb-20 md:pb-28">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <h1 className="font-serif text-3xl md:text-4xl text-grey">{c.heroTitle}</h1>
          <p className="mt-3 text-grey/60 font-light leading-relaxed">{c.heroSub}</p>
          <p className="mt-4 text-xs text-grey/40">{c.linkHint}</p>
        </FadeIn>

        {!ownDone && (
          <FadeIn>
            <div className="mt-8 bg-surface rounded-xl p-6 border border-sage-light flex flex-wrap items-center justify-between gap-4">
              <p className="text-grey/80 font-light">{c.ownTodo}</p>
              <Link
                href={`/scan/${token}`}
                className="bg-sage text-white px-5 py-2.5 rounded-lg hover:bg-sage-dark transition-colors whitespace-nowrap"
              >
                {c.ownTodoCta} →
              </Link>
            </div>
          </FadeIn>
        )}

        {/* Bestaande afdelingen + voortgang */}
        <FadeIn>
          <h2 className="mt-10 font-serif text-2xl text-grey">{c.deptTitle}</h2>
          {teamDepartments.length === 0 ? (
            <p className="mt-3 text-grey/60 font-light leading-relaxed">{c.deptEmpty}</p>
          ) : (
            <div className="mt-4 space-y-4">
              {teamDepartments.map((department) => (
                <div
                  key={department.name}
                  className="bg-surface rounded-xl p-6 border border-sage-light"
                >
                  <h3 className="font-serif text-lg text-grey">{department.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {department.respondents.map((person) => (
                      <li
                        key={person.email || person.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-grey/80 font-light">
                          {person.name}
                          {person.email && (
                            <span className="text-grey/40"> · {person.email}</span>
                          )}
                          {person.status !== "klaar" && (
                            <button
                              type="button"
                              onClick={() => copyRespondLink(person.respondUrl)}
                              className="ml-2 text-xs text-sage hover:underline cursor-pointer"
                            >
                              {copiedUrl === person.respondUrl ? c.linkCopied : c.copyRespondLink}
                            </button>
                          )}
                        </span>
                        <span
                          className={`shrink-0 text-xs rounded-full px-2.5 py-0.5 border ${
                            person.status === "klaar"
                              ? "text-white bg-sage border-sage"
                              : person.status === "bezig"
                                ? "text-sage bg-cream/60 border-sage-light"
                                : "text-grey/50 bg-cream/40 border-sage-light"
                          }`}
                        >
                          {c.statusLabels[person.status]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </FadeIn>

        {/* Nieuwe afdeling + uitnodigingen */}
        <FadeIn>
          <form
            onSubmit={handleInvite}
            className="mt-8 bg-surface rounded-xl p-6 md:p-8 border border-sage-light"
          >
            <h2 className="font-serif text-2xl text-grey">{c.formTitle}</h2>
            <div className="mt-5">
              <label htmlFor="dept-name" className="block text-sm text-grey/60 mb-1.5">
                {c.deptNameLabel}
              </label>
              <input
                type="text"
                id="dept-name"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                required
                maxLength={200}
                placeholder={c.deptNamePlaceholder}
                className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey placeholder:text-grey/30 focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
              />
            </div>

            <div className="mt-5 space-y-3">
              {people.map((person, index) => (
                <div key={index} className="flex flex-wrap items-end gap-3">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm text-grey/60 mb-1.5">{c.personName}</label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) => setPerson(index, { name: e.target.value })}
                      required
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                    />
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <label className="block text-sm text-grey/60 mb-1.5">{c.personEmail}</label>
                    <input
                      type="email"
                      value={person.email}
                      onChange={(e) => setPerson(index, { email: e.target.value })}
                      required
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-lg border border-sage-light bg-cream/50 text-grey focus:outline-none focus:ring-2 focus:ring-sage/30 transition"
                    />
                  </div>
                  {people.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setPeople((prev) => prev.filter((_, i) => i !== index))}
                      className="text-sm text-grey/50 hover:text-error transition-colors cursor-pointer pb-3"
                    >
                      {c.removePerson}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setPeople((prev) => [...prev, { name: "", email: "" }])}
                className="text-sage hover:underline cursor-pointer"
              >
                {c.addPerson}
              </button>
              <button
                type="submit"
                disabled={inviting}
                className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {inviting ? c.inviting : c.invite}
              </button>
            </div>

            {inviteMessage === "ok" && <p className="mt-4 text-sm text-sage">{c.invitedOk}</p>}
            {inviteMessage === "partial" && (
              <p className="mt-4 text-sm text-grey/70">{c.invitedPartial}</p>
            )}
            {inviteMessage === "error" && (
              <p className="mt-4 text-sm text-error">{c.inviteError}</p>
            )}
          </form>
        </FadeIn>

        {/* Afronden */}
        <FadeIn>
          <div className="mt-8 bg-surface rounded-xl p-6 md:p-8 border border-sage-light">
            <h2 className="font-serif text-2xl text-grey">{c.completeTitle}</h2>
            <p className="mt-3 text-grey/80 font-light leading-relaxed">
              {hasReport ? c.completeBodyRedo : c.completeBody}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleComplete}
                disabled={completing}
                className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {hasReport ? c.completeRedo : c.complete}
              </button>
              {hasReport && (
                <Link
                  href={`/scan/${token}/rapport`}
                  className="text-sage hover:underline"
                >
                  {c.viewReport} →
                </Link>
              )}
            </div>
            {completing && <p className="mt-4 text-sm text-grey/60">{c.completing}</p>}
            {completeError && <p className="mt-4 text-sm text-error">{completeError}</p>}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
