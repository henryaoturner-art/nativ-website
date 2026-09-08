import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getScanAccess, getScanBundle } from "@/lib/scan/db";
import ScanWizard from "@/components/scan/ScanWizard";

// Persoonlijke tokenlink: nooit cachen, nooit indexeren.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jouw deel van de scan | nativ",
  robots: { index: false, follow: false },
};

/** De invulpagina van een uitgenodigde collega: alleen de vragen over het
 * eigen werk. Het rapport is van de eigenaar en is hier bewust niet te zien. */
export default async function ScanRespondPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const access = await getScanAccess(token);
  // Een scan-token van de eigenaar hoort hier niet; die heeft /scan/[token].
  if (!access || access.isOwner) notFound();

  // Twee eindstanden, eerlijk uit elkaar gehouden: wie zijn deel afrondde
  // krijgt een bedankje; wie (nog) niets instuurde en te laat is, hoort dat
  // de scan inmiddels is afgerond.
  if (access.respondent.status === "klaar") {
    return (
      <section className="py-16 px-6 pb-24">
        <div className="max-w-[640px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl md:text-4xl text-grey">
              Bedankt, je antwoorden zijn binnen
            </h1>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              Je deel van de scan is klaar. Je antwoorden gaan mee in het rapport voor{" "}
              {access.scan.company_name}. Je kunt dit venster sluiten.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }
  if (access.scan.status !== "open") {
    return (
      <section className="py-16 px-6 pb-24">
        <div className="max-w-[640px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl md:text-4xl text-grey">
              Deze scan is al afgerond
            </h1>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              De scan van {access.scan.company_name} is inmiddels afgerond, dus invullen kan
              niet meer. Je hoeft niets te doen.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  const bundle = await getScanBundle(access.scan.token);
  const initialAnswers: Record<string, string> = {};
  for (const row of bundle?.answers ?? []) {
    if (row.respondent_id === access.respondent.id && row.value != null) {
      initialAnswers[row.question_id] = row.value;
    }
  }

  return (
    <ScanWizard
      token={token}
      companyName={access.scan.company_name}
      initialAnswers={initialAnswers}
      variant="respondent"
      departmentName={access.department.name}
    />
  );
}
