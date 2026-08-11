import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReportPayload, getScanBundle } from "@/lib/scan/db";
import TeamPanel from "@/components/scan/TeamPanel";

// Persoonlijke tokenlink: nooit cachen, nooit indexeren.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jouw team | nativ",
  robots: { index: false, follow: false },
};

/** Het teamoverzicht van de eigenaar: afdelingen aanmaken, collega's
 * uitnodigen, zien wie klaar is en het rapport (opnieuw) maken. Alleen
 * bereikbaar met het scan-token van de eigenaar. */
export default async function ScanTeamPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const bundle = await getScanBundle(token);
  if (!bundle) notFound();
  const { scan, departments, respondents } = bundle;

  const owner = respondents[0];
  const invited = respondents.filter((r) => r.id !== owner?.id);
  const hasReport = Boolean(await getReportPayload(scan.id));

  return (
    <TeamPanel
      token={token}
      hasReport={hasReport}
      ownDone={owner?.status === "klaar"}
      departments={departments.map((department) => ({
        name: department.name,
        respondents: invited
          .filter((r) => r.department_id === department.id)
          .map((r) => ({
            name: r.name,
            email: r.email ?? "",
            status: r.status,
            // De eigenaar mag de persoonlijke links zien: hij nodigde zelf uit,
            // en zo kan hij een link doorsturen als de mail niet aankwam.
            respondUrl: `/scan/respond/${r.token}`,
          })),
      }))}
    />
  );
}
