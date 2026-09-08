import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getScanBundle } from "@/lib/scan/db";
import ScanWizard from "@/components/scan/ScanWizard";
import { isLocale, localizeHref } from "@/lib/locale";

// Persoonlijke tokenlink: nooit cachen, nooit indexeren.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jouw scan | nativ",
  robots: { index: false, follow: false },
};

export default async function ScanTokenPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  const bundle = await getScanBundle(token);
  if (!bundle) notFound();
  // Taal van de route bewaren (A2 stap 2, KAN-425): /en/scan/<token> blijft Engels.
  const lang = isLocale(locale) ? locale : "nl";
  if (bundle.scan.status === "afgerond") redirect(localizeHref(`/scan/${token}/rapport`, lang));

  // Alleen de eigen antwoorden van de eigenaar (eerste respondent): bij een
  // teamscan horen de antwoorden van collega's niet in dit formulier.
  const owner = bundle.respondents[0];
  const initialAnswers: Record<string, string> = {};
  for (const row of bundle.answers) {
    if (row.respondent_id === owner?.id && row.value != null) {
      initialAnswers[row.question_id] = row.value;
    }
  }

  return (
    <ScanWizard
      token={token}
      companyName={bundle.scan.company_name}
      initialAnswers={initialAnswers}
      variant={bundle.scan.mode === "team" ? "teamOwner" : "owner"}
    />
  );
}
