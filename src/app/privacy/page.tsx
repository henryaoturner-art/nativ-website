"use client";

import FadeIn from "@/components/FadeIn";

const VERSIE = "Versie 0.1 · 6 juli 2026";

type Section = { n: number; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    n: 1,
    title: "Wie zijn wij",
    body: (
      <>
        Nativ B.V., gevestigd te Hilversum, is de verwerkingsverantwoordelijke voor de
        verwerking van persoonsgegevens via deze website. Je bereikt ons via{" "}
        <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">
          info@gonativ.nl
        </a>
        .
      </>
    ),
  },
  {
    n: 2,
    title: "Welke gegevens we verwerken",
    body: (
      <ul className="space-y-1.5 list-disc pl-5">
        <li>
          <span className="text-grey">Contactgegevens</span> — als je ons mailt of via de
          contactpagina contact opneemt: je naam, e-mailadres en de inhoud van je bericht.
        </li>
        <li>
          <span className="text-grey">Websitegebruik</span> — geanonimiseerde, cookieloze
          bezoekstatistieken via Vercel Analytics. Deze gegevens zijn niet tot jou herleidbaar.
        </li>
        <li>
          <span className="text-grey">Technische gegevens</span> — beperkte serverlogs (zoals
          een tijdelijk IP-adres) die nodig zijn om de website te leveren en te beveiligen.
        </li>
      </ul>
    ),
  },
  {
    n: 3,
    title: "Waarvoor en op welke grondslag",
    body: (
      <ul className="space-y-1.5 list-disc pl-5">
        <li>
          Om te reageren op je vraag of verzoek — grondslag: uitvoering van of aanloop naar
          een overeenkomst, dan wel ons gerechtvaardigd belang bij contact.
        </li>
        <li>
          Om de website te verbeteren, te beveiligen en betrouwbaar te houden — grondslag:
          ons gerechtvaardigd belang.
        </li>
      </ul>
    ),
  },
  {
    n: 4,
    title: "Cookies",
    body: (
      <>
        Deze website gebruikt <span className="text-grey">geen tracking- of advertentiecookies</span>.
        De bezoekstatistieken (Vercel Analytics) werken cookieloos en zonder profilering.
      </>
    ),
  },
  {
    n: 5,
    title: "Bewaartermijn",
    body: (
      <>
        We bewaren contactgegevens zolang dat nodig is om je vraag af te handelen en daarna een
        redelijke termijn. Bezoekstatistieken worden geaggregeerd bewaard. Serverlogs worden
        kort bewaard.
      </>
    ),
  },
  {
    n: 6,
    title: "Delen met derden",
    body: (
      <>
        We verkopen je gegevens nooit. We schakelen alleen dienstverleners (verwerkers) in die
        nodig zijn om de website, statistieken en e-mail te laten werken — waaronder onze
        hostingpartner (Vercel) en onze e-mail-/kantooromgeving (Google Workspace). Met deze
        partijen zijn de vereiste afspraken gemaakt, en verwerking vindt plaats binnen de EU of
        onder passende waarborgen.
      </>
    ),
  },
  {
    n: 7,
    title: "Doorgifte buiten de EER",
    body: (
      <>
        Worden gegevens buiten de Europese Economische Ruimte verwerkt, dan gebeurt dat
        uitsluitend op basis van een geldig doorgiftemechanisme (een adequaatheidsbesluit of de
        EU-modelcontractbepalingen).
      </>
    ),
  },
  {
    n: 8,
    title: "Jouw rechten",
    body: (
      <>
        Je hebt het recht op inzage, correctie, verwijdering, beperking, bezwaar en
        overdraagbaarheid van je gegevens. Stuur je verzoek naar{" "}
        <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">
          info@gonativ.nl
        </a>
        . Je hebt daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.
      </>
    ),
  },
  {
    n: 9,
    title: "Beveiliging",
    body: (
      <>
        We nemen passende technische en organisatorische maatregelen om je gegevens te
        beschermen. Meer over hoe we met data omgaan lees je op onze pagina{" "}
        <a href="/security" className="text-sage hover:underline">
          Security &amp; Privacy
        </a>
        .
      </>
    ),
  },
  {
    n: 10,
    title: "Persoonsgegevens die we namens klanten verwerken",
    body: (
      <>
        Verwerken we in onze dienst persoonsgegevens namens een klant, dan is die klant de
        verwerkingsverantwoordelijke en zijn wij de verwerker. Daarvoor geldt de{" "}
        <a href="/algemene-voorwaarden" className="text-sage hover:underline">
          Verwerkersovereenkomst
        </a>{" "}
        (Bijlage A van onze algemene voorwaarden), niet deze privacyverklaring.
      </>
    ),
  },
  {
    n: 11,
    title: "Wijzigingen",
    body: (
      <>
        We kunnen deze privacyverklaring aanpassen. De actuele versie staat altijd op deze pagina.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Privacyverklaring
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">
              Nativ B.V. · {VERSIE}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="pb-16 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <p className="text-grey/70 font-light leading-relaxed">
              Nativ vindt jouw privacy belangrijk. Deze verklaring legt uit welke persoonsgegevens
              we verwerken als je onze website bezoekt of contact met ons opneemt, waarom, en welke
              rechten je hebt.
            </p>
          </FadeIn>

          {sections.map((s) => (
            <FadeIn key={s.n}>
              <article className="mt-10">
                <h2 className="font-serif text-2xl md:text-[28px] leading-tight text-grey">
                  {s.n}. {s.title}
                </h2>
                <div className="mt-4 text-grey/70 font-light leading-relaxed">{s.body}</div>
              </article>
            </FadeIn>
          ))}

          <FadeIn>
            <div className="mt-12 pt-8 border-t border-grey/10">
              <p className="text-grey/60 font-light leading-relaxed text-sm">
                Vragen over deze privacyverklaring? Mail{" "}
                <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">
                  info@gonativ.nl
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
