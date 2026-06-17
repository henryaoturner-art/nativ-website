import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: { absolute: "Digitale collega voor finance | nativ" },
  description:
    "Een digitale finance-collega die vanuit je Company Brain werkt: maandrapportage, afwijkingsanalyse, business cases en forecasting. In ontwikkeling.",
  alternates: { canonical: "/digitale-collega-finance" },
};

export default function FinanceColleaguePage() {
  return (
    <>
      {/* Hero + direct answer */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-grey/10 text-grey/70 px-3 py-1 text-sm font-medium">
              In ontwikkeling
            </span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Een digitale collega voor je finance-team
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/80 leading-relaxed">
              We bouwen een digitale collega voor je finance-team: iemand die
              vanuit je Company Brain je financiële proces ondersteunt, van
              maandafsluiting tot forecast. Deze collega is nog in ontwikkeling.
              Zo zou die eruit kunnen zien:
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[680px] mx-auto space-y-14">
          <FadeIn>
            <ul className="space-y-4 text-lg font-light text-grey/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Maandafsluiting en rapportage.
                  </strong>{" "}
                  Leest je cijfers, bijvoorbeeld uit Exact Online, en maakt er een
                  maandrapportage van die over je locaties of onderdelen
                  vergelijkbaar is.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Afwijkingsanalyse.
                  </strong>{" "}
                  Signaleert waar het afwijkt en waarom, met een onderbouwing die
                  je terug kunt klikken naar de bron.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Vergelijkbare business cases.
                  </strong>{" "}
                  Zet elke business case in dezelfde structuur, zodat
                  investeringen naast elkaar te leggen zijn en besluiten sneller
                  gaan.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1.5 shrink-0">·</span>
                <span>
                  <strong className="font-medium text-grey">
                    Forecasting en cash.
                  </strong>{" "}
                  Een rollende vooruitblik op basis van jouw eigen model.
                </span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat hij uit je Company Brain haalt
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De collega werkt vanuit je Company Brain: de manier waarop jouw
              controller werkt, je structuur en je eerdere cijfers. Daardoor
              sluit elk rapport aan op hoe jullie het doen. De mens houdt de
              regie: jij keurt goed, de collega doet het voorwerk. Elk getal is
              herleidbaar naar de onderliggende cijfers, zodat je je handtekening
              eronder kunt zetten.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Waar we nu staan
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De finance-collega is in ontwikkeling. We bouwen 'm in stappen en
              ontwerpen hem samen met onze eerste klanten. Wil je meedenken of
              vroeg instappen? Dat kan.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Wat het oplevert
            </h2>
            <p className="mt-6 text-lg font-light text-grey/80 leading-relaxed">
              De manier van werken van je controller staat niet langer in één
              hoofd, maar wordt vastgelegd in je Company Brain. Daardoor leunt je
              financiële proces niet op één persoon en één agenda. De cijfers
              worden vergelijkbaar over je locaties, en de kennis blijft van je
              bedrijf, ook als er iemand wisselt.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How to start */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center bg-white rounded-2xl px-8 py-12 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[38px] leading-tight text-grey">
              Hoe je begint
            </h2>
            <p className="mt-5 text-lg font-light text-grey/80 leading-relaxed">
              Een finance-collega draait op je Company Brain, dus die bouwen we
              eerst. Wil je dit samen met ons vormgeven? Plan een gesprek.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Related */}
      <section className="pb-16 px-6">
        <div className="max-w-[680px] mx-auto flex flex-wrap gap-x-6 gap-y-2 justify-center text-base">
          <Link
            href="/digitale-collegas"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Alle digitale collega's
          </Link>
          <Link
            href="/company-brain"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            Company Brain
          </Link>
          <Link
            href="/scan"
            className="text-sage hover:text-sage-dark underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors"
          >
            AI Opportunity Scan
          </Link>
        </div>
      </section>
    </>
  );
}
