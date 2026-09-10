"use client";

import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Kicker from "@/components/Kicker";
import Link from "@/components/Link";
import Section from "@/components/Section";

const VERSIE = "Versie 0.3 · 13 augustus 2026";

type Artikel = { n: number; title: string; body: React.ReactNode };

/** Lijstpunt uit B3: een 6px Sage-punt in plaats van list-disc. */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
      <span>{children}</span>
    </li>
  );
}

const sections: Artikel[] = [
  {
    n: 1,
    title: "Wie zijn wij",
    body: (
      <>
        Nativ B.V., statutair gevestigd te Haarlem (KvK 42125853), is de verwerkingsverantwoordelijke voor de
        verwerking van persoonsgegevens via deze website. Je bereikt ons via{" "}
        <a href="mailto:info@gonativ.nl" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
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
      <ul className="space-y-2">
        <Bullet>
          <span className="font-medium">Contactgegevens</span>: als je ons mailt of via de
          contactpagina contact opneemt: je naam, e-mailadres en de inhoud van je bericht.
        </Bullet>
        <Bullet>
          <span className="font-medium">Scangegevens</span>: als je de scan invult: je
          bedrijfsnaam, je naam, je e-mailadres en je antwoorden over het werk in je bedrijf,
          plus het rapport dat daaruit volgt. Nodig je collega&apos;s uit voor de scan, dan
          verwerken we ook hun naam, e-mailadres en antwoorden. Er worden geen
          bedrijfsbestanden of vertrouwelijke gegevens gevraagd of opgeslagen.
        </Bullet>
        <Bullet>
          <span className="font-medium">Websitegebruik</span>: geanonimiseerde, cookieloze
          bezoekstatistieken via Vercel Analytics. Deze gegevens zijn niet tot jou herleidbaar.
        </Bullet>
        <Bullet>
          <span className="font-medium">Technische gegevens</span>: beperkte serverlogs (zoals
          een tijdelijk IP-adres) die nodig zijn om de website te leveren en te beveiligen.
        </Bullet>
      </ul>
    ),
  },
  {
    n: 3,
    title: "Waarvoor en op welke grondslag",
    body: (
      <>
        <ul className="space-y-2">
          <Bullet>
            Om te reageren op je vraag of verzoek (grondslag: uitvoering van of aanloop naar
            een overeenkomst, dan wel ons gerechtvaardigd belang bij contact).
          </Bullet>
          <Bullet>
            Om de website te verbeteren, te beveiligen en betrouwbaar te houden (grondslag:
            ons gerechtvaardigd belang).
          </Bullet>
        </ul>
        <p className="mt-3">
          <span className="font-medium">Zakelijke benadering (acquisitie).</span> We benaderen soms
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
        Deze website gebruikt <span className="font-medium">geen tracking- of advertentiecookies</span>.
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
        <a href="mailto:info@gonativ.nl" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
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
        <a href="mailto:info@gonativ.nl" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
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
        <Link href="/security" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
          Security &amp; Privacy
        </Link>
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
        <Link href="/algemene-voorwaarden" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
          Verwerkersovereenkomst
        </Link>{" "}
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

        <p className="mt-4 font-medium text-grey">Welke gegevens wij verwerken</p>
        <ul className="mt-2 space-y-2">
          <Bullet>
            Toegangstokens waarmee de koppeling werkt. Deze slaan wij versleuteld op en delen wij
            nooit met derden.
          </Bullet>
          <Bullet>
            Accountgegevens van het gekoppelde bedrijfsaccount: de naam van de
            LinkedIn-bedrijfspagina respectievelijk de Instagram-gebruikersnaam en het account-ID.
          </Bullet>
          <Bullet>
            Berichtgegevens: de door de klant opgestelde berichten die wij namens de klant
            publiceren, en de door het platform teruggegeven bericht-ID&apos;s en permalinks.
          </Bullet>
          <Bullet>
            Geaggregeerde statistieken over de eigen berichten en pagina van de klant, zoals
            aantallen weergaven, reacties, likes, shares en volgers. Dit zijn telwaarden zonder
            persoonsgegevens van individuele gebruikers.
          </Bullet>
        </ul>

        <p className="mt-4 font-medium text-grey">Wat wij niet doen</p>
        <ul className="mt-2 space-y-2">
          <Bullet>
            Wij verzamelen geen profielgegevens van individuele LinkedIn-leden of
            Instagram-gebruikers en slaan die ook niet op. Voor zover de LinkedIn-API bij het
            ophalen van statistieken incidenteel persoonsgegevens van leden meelevert, worden die
            niet langer dan 24 uur bewaard en daarna verwijderd of ververst, conform de
            API-voorwaarden van LinkedIn.
          </Bullet>
          <Bullet>Wij gebruiken deze gegevens niet voor advertentiedoeleinden en verkopen ze niet.</Bullet>
          <Bullet>
            Wij publiceren uitsluitend content die de klant zelf heeft opgesteld en goedgekeurd.
          </Bullet>
        </ul>

        <p className="mt-4">
          <span className="font-medium">Rol en grondslag.</span> Voor deze verwerking treedt Nativ
          B.V. op als verwerker in opdracht van de klant (de beheerder van het gekoppelde account).
          De verwerking vindt plaats op grond van de overeenkomst met de klant.
        </p>
        <p className="mt-4">
          <span className="font-medium">Bewaartermijnen.</span> Toegangstokens bewaren wij zolang de
          koppeling actief is; bij het verbreken van de koppeling worden ze direct verwijderd.
          Geaggregeerde statistieken bewaren wij als onderdeel van de rapportagehistorie van de
          klant.
        </p>
        <p className="mt-4">
          <span className="font-medium">Koppeling verbreken en gegevens verwijderen.</span> De klant
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

const tocLinkCls = "text-grey hover:text-sage-dark transition-colors";

export default function PrivacyPage() {
  return (
    <>
      {/* E6: kop links, versieregel als bijschrift; de inleiding naast de inhoudsopgave (kaart met linkerlijn) */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">Privacyverklaring</h1>
          <p className="mt-4 text-muted">Nativ B.V. · {VERSIE}</p>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <p className="md:col-span-7 max-w-[640px] text-grey leading-relaxed">
              nativ vindt jouw privacy belangrijk. Deze verklaring legt uit welke persoonsgegevens
              we verwerken als je onze website bezoekt of contact met ons opneemt, waarom, en welke
              rechten je hebt.
            </p>
            <Card signature className="md:col-span-5">
              <nav aria-label="Inhoudsopgave">
                <Kicker>Inhoud</Kicker>
                <ol className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.n}>
                      <a href={`#artikel-${s.n}`} className={tocLinkCls}>
                        {s.n}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Card>
          </div>
        </FadeIn>
      </Section>

      {/* De verklaring zelf: lopende tekst op 8 kolommen, links uitgelijnd; elke kop draagt het anker van de inhoudsopgave */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-10">
            {sections.map((s) => (
              <FadeIn key={s.n}>
                <article>
                  <h2 id={`artikel-${s.n}`} className="font-serif text-grey scroll-mt-24">
                    {s.n}. {s.title}
                  </h2>
                  <div className="mt-6 text-grey leading-relaxed">{s.body}</div>
                </article>
              </FadeIn>
            ))}

            <FadeIn>
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted leading-relaxed">
                  Vragen over deze privacyverklaring? Mail{" "}
                  <a href="mailto:info@gonativ.nl" className="text-grey underline decoration-sage-dark underline-offset-4 hover:decoration-grey">
                    info@gonativ.nl
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
