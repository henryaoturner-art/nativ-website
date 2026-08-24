"use client";

import FadeIn from "@/components/FadeIn";

const VERSIE = "Versie 0.3 · 13 augustus 2026";

type Section = { n: number; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    n: 1,
    title: "Wie zijn wij",
    body: (
      <>
        Nativ B.V., statutair gevestigd te Haarlem (KvK 42125853), is de verwerkingsverantwoordelijke voor de
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
          <span className="text-grey">Contactgegevens</span>: als je ons mailt of via de
          contactpagina contact opneemt: je naam, e-mailadres en de inhoud van je bericht.
        </li>
        <li>
          <span className="text-grey">Scangegevens</span>: als je de scan invult: je
          bedrijfsnaam, je naam, je e-mailadres en je antwoorden over het werk in je bedrijf,
          plus het rapport dat daaruit volgt. Nodig je collega&apos;s uit voor de scan, dan
          verwerken we ook hun naam, e-mailadres en antwoorden. Er worden geen
          bedrijfsbestanden of vertrouwelijke gegevens gevraagd of opgeslagen.
        </li>
        <li>
          <span className="text-grey">Websitegebruik</span>: geanonimiseerde, cookieloze
          bezoekstatistieken via Vercel Analytics. Deze gegevens zijn niet tot jou herleidbaar.
        </li>
        <li>
          <span className="text-grey">Technische gegevens</span>: beperkte serverlogs (zoals
          een tijdelijk IP-adres) die nodig zijn om de website te leveren en te beveiligen.
        </li>
      </ul>
    ),
  },
  {
    n: 3,
    title: "Waarvoor en op welke grondslag",
    body: (
      <>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>
            Om te reageren op je vraag of verzoek (grondslag: uitvoering van of aanloop naar
            een overeenkomst, dan wel ons gerechtvaardigd belang bij contact).
          </li>
          <li>
            Om de website te verbeteren, te beveiligen en betrouwbaar te houden (grondslag:
            ons gerechtvaardigd belang).
          </li>
        </ul>
        <p className="mt-3">
          <span className="text-grey">Zakelijke benadering (acquisitie).</span> We benaderen soms
          beslissers bij Nederlandse bedrijven met een zakelijke e-mail, bijvoorbeeld een
          uitnodiging voor onze gratis AI-scan. De gegevens die we daarvoor gebruiken (naam,
          functie, zakelijk e-mailadres en werkgever) halen we uit openbare bronnen, zoals een
          vacature die het bedrijf zelf heeft gepubliceerd, aangevuld via zakelijke databronnen.
          Grondslag: ons gerechtvaardigd belang bij het onder de aandacht brengen van onze
          diensten bij bedrijven waarvoor die relevant zijn. We mailen alleen zakelijke adressen
          en sturen hooguit één opvolgmail. Elke mail bevat een afmeldmogelijkheid; na afmelding
          benaderen we je niet opnieuw. Wil je inzage in je gegevens of ze laten verwijderen?
          Mail info@gonativ.nl.
        </p>
      </>
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
        redelijke termijn. Scangegevens en het bijbehorende rapport bewaren we maximaal twaalf
        maanden na afronding; op verzoek verwijderen we ze eerder, mail daarvoor{" "}
        <a href="mailto:info@gonativ.nl" className="text-sage hover:underline">
          info@gonativ.nl
        </a>
        . Bezoekstatistieken worden geaggregeerd bewaard. Serverlogs worden kort bewaard.
      </>
    ),
  },
  {
    n: 6,
    title: "Delen met derden",
    body: (
      <>
        We verkopen je gegevens nooit. We schakelen alleen dienstverleners (verwerkers) in die
        nodig zijn om de website, statistieken en e-mail te laten werken, waaronder onze
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
    title: "Social-media-koppelingen (LinkedIn en Instagram)",
    body: (
      <>
        <p>
          Klanten van ons platform InsightFlow kunnen hun eigen LinkedIn-bedrijfspagina en/of
          Instagram-bedrijfsaccount aan het platform koppelen. Daarmee kan InsightFlow namens de
          klant berichten publiceren op die accounts en de prestaties daarvan tonen. Hiervoor
          gebruiken wij de offici&euml;le API&apos;s van LinkedIn (Microsoft) en Instagram (Meta).
        </p>

        <p className="mt-4 text-grey">Welke gegevens wij verwerken</p>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>
            Toegangstokens waarmee de koppeling werkt. Deze slaan wij versleuteld op en delen wij
            nooit met derden.
          </li>
          <li>
            Accountgegevens van het gekoppelde bedrijfsaccount: de naam van de
            LinkedIn-bedrijfspagina respectievelijk de Instagram-gebruikersnaam en het account-ID.
          </li>
          <li>
            Berichtgegevens: de door de klant opgestelde berichten die wij namens de klant
            publiceren, en de door het platform teruggegeven bericht-ID&apos;s en permalinks.
          </li>
          <li>
            Geaggregeerde statistieken over de eigen berichten en pagina van de klant, zoals
            aantallen weergaven, reacties, likes, shares en volgers. Dit zijn telwaarden zonder
            persoonsgegevens van individuele gebruikers.
          </li>
        </ul>

        <p className="mt-4 text-grey">Wat wij niet doen</p>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>
            Wij verzamelen geen profielgegevens van individuele LinkedIn-leden of
            Instagram-gebruikers en slaan die ook niet op. Voor zover de LinkedIn-API bij het
            ophalen van statistieken incidenteel persoonsgegevens van leden meelevert, worden die
            niet langer dan 24 uur bewaard en daarna verwijderd of ververst, conform de
            API-voorwaarden van LinkedIn.
          </li>
          <li>Wij gebruiken deze gegevens niet voor advertentiedoeleinden en verkopen ze niet.</li>
          <li>
            Wij publiceren uitsluitend content die de klant zelf heeft opgesteld en goedgekeurd.
          </li>
        </ul>

        <p className="mt-4">
          <span className="text-grey">Rol en grondslag.</span> Voor deze verwerking treedt Nativ
          B.V. op als verwerker in opdracht van de klant (de beheerder van het gekoppelde account).
          De verwerking vindt plaats op grond van de overeenkomst met de klant.
        </p>
        <p className="mt-4">
          <span className="text-grey">Bewaartermijnen.</span> Toegangstokens bewaren wij zolang de
          koppeling actief is; bij het verbreken van de koppeling worden ze direct verwijderd.
          Geaggregeerde statistieken bewaren wij als onderdeel van de rapportagehistorie van de
          klant.
        </p>
        <p className="mt-4">
          <span className="text-grey">Koppeling verbreken en gegevens verwijderen.</span> De klant
          kan de koppeling op elk moment zelf verbreken in de instellingen van het platform;
          daarmee vervalt onze toegang tot het account. Verzoeken tot verwijdering van gegevens
          kunnen daarnaast worden gericht aan het in deze policy genoemde contactadres.
        </p>
      </>
    ),
  },
  {
    n: 12,
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
              nativ vindt jouw privacy belangrijk. Deze verklaring legt uit welke persoonsgegevens
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
