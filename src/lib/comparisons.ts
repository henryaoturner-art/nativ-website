/**
 * Vergelijkingspagina's — één bron voor de hub en de losse pagina's.
 *
 * Spoor 2 uit de kanaalanalyse van 11-09-2026. Dit pakt kopers die al aan het
 * vergelijken zijn; de zoekopdracht "X versus Y" komt laat in de trechter en
 * converteert daarom beter dan een categorieterm.
 *
 * Regels bij het bijwerken:
 * - Vergelijk op STRUCTUUR, niet op prijs van de ander. Wat een concurrent
 *   vandaag rekent verandert en is per contract anders; een verkeerd bedrag op
 *   onze site is een misser die we niet terugnemen. Ons eigen bedrag mag er wel
 *   in: dat staat publiek op /pricing.
 * - Elke rij moet waar blijven als de ander morgen een feature toevoegt. Schrijf
 *   dus over hoe het product is opgezet, niet over wat het deze maand kan.
 * - `strengths` is verplicht en wordt niet weggelaten. Een vergelijking waarin de
 *   ander nergens wint, leest als een folder en overtuigt niemand.
 * - Geen superlatieven over onszelf, geen spot met de ander.
 */

export interface ComparisonRow {
  label: string;
  other: string;
  nativ: string;
}

export interface Comparison {
  slug: string;
  /** Naam van het alternatief, zoals in koppen en tabellen. */
  name: string;
  /** Wat in de <title> komt. */
  title: string;
  description: string;
  /** Eén citeerbare zin die het verschil dekt. */
  short: string;
  intro: string[];
  rows: ComparisonRow[];
  strengths: { heading: string; paragraphs: string[] };
  verdict: { heading: string; paragraphs: string[] };
  faq: { q: string; a: string }[];
}

export const COMPARISONS_UPDATED = "2026-09-11";

export const COMPARISONS: Comparison[] = [
  {
    slug: "microsoft-copilot",
    name: "Microsoft Copilot",
    title: "nativ of Microsoft Copilot? Het verschil in gewone taal | nativ",
    description:
      "Copilot werkt binnen Microsoft 365. Een Company Brain verbindt juist de systemen daarbuiten: je boekhouding, je CRM, je branchesoftware. Wat dat in de praktijk betekent.",
    short:
      "Microsoft Copilot werkt met wat er in Microsoft 365 staat; een Company Brain van nativ brengt juist de bronnen daarbuiten samen, zoals de boekhouding, het CRM en de branchesoftware, en geeft elk gegeven een herkomst, een eigenaar en rechten.",
    intro: [
      "Dit is de vergelijking die het vaakst gemaakt wordt, en meestal is hij verkeerd gesteld. Het is geen keuze tussen twee dingen die hetzelfde doen.",
      "Copilot zit in de gereedschappen waar je in werkt: Word, Outlook, Teams, Excel. Hij helpt je bij het stuk dat je op dat moment onder handen hebt. Een Company Brain zit een laag eronder: het is de kennis waar werk uit geput wordt, ongeacht in welk programma dat werk gebeurt.",
    ],
    rows: [
      {
        label: "Waar de kennis vandaan komt",
        other: "Wat er in Microsoft 365 staat: mail, documenten, Teams, SharePoint",
        nativ: "Je systemen, je documenten en de kennis uit de hoofden van je mensen, samen op één plek",
      },
      {
        label: "Je boekhouding, CRM en branchesoftware",
        other: "Staan buiten Microsoft 365 en praten er niet vanzelf mee",
        nativ: "Worden als bron aan de Brain gekoppeld",
      },
      {
        label: "Wat er niet is opgeschreven",
        other: "Blijft in hoofden zitten",
        nativ: "Wordt uitgevraagd en vastgelegd, met een eigenaar erbij",
      },
      {
        label: "Herkomst van een antwoord",
        other: "Verwijst naar het document waar het uit komt",
        nativ: "Bronvermelding bij elk antwoord, plus een eigenaar en een verversingsdatum per gegeven",
      },
      {
        label: "Prijsmodel",
        other: "Per gebruiker per maand",
        nativ: "Eén bedrag per bedrijf, ongeacht het aantal gebruikers",
      },
      {
        label: "Welk AI-model",
        other: "Het model van Microsoft",
        nativ: "Je eigen keuze, bijvoorbeeld Claude of ChatGPT; de koppeling is inbegrepen",
      },
    ],
    strengths: {
      heading: "Waar Copilot sterker is",
      paragraphs: [
        "Als je organisatie volledig op Microsoft 365 draait en je vooral hulp wilt binnen Word, Outlook en Teams, dan is Copilot dichter bij het werk dan wat dan ook. Hij zit al in het scherm waar je in zit, er is niets te koppelen, en het beheer loopt via de omgeving die je al hebt.",
        "Copilot en een Company Brain sluiten elkaar ook niet uit. De meeste bedrijven die met ons werken houden hun Microsoft-omgeving gewoon.",
      ],
    },
    verdict: {
      heading: "Waar het op neerkomt",
      paragraphs: [
        "Zit je kennis in Microsoft en wil je sneller schrijven en samenvatten, dan lost Copilot dat op.",
        "Zit je kennis verspreid over je boekhouding, je CRM, je branchesoftware en de hoofden van je mensen, dan is dat het probleem dat eerst opgelost moet worden. Daar is een Company Brain voor.",
      ],
    },
    faq: [
      {
        q: "Kan ik nativ naast Microsoft Copilot gebruiken?",
        a: "Ja. Ze zitten op verschillende lagen: Copilot helpt in het programma waar je in werkt, een Company Brain is de kennislaag waar werk uit geput wordt. Bedrijven die met nativ werken houden hun Microsoft-omgeving meestal gewoon.",
      },
      {
        q: "Waarom haalt Copilot mijn boekhouding of CRM er niet bij?",
        a: "Omdat die systemen buiten Microsoft 365 staan. Copilot werkt met wat er binnen die omgeving zit. Wil je dat AI ook je facturen, je klantdata of je branchesoftware meeneemt, dan moet die kennis eerst ergens samenkomen.",
      },
    ],
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    title: "nativ of ChatGPT? Waarom een project geen kennisbank is | nativ",
    description:
      "Een project in ChatGPT is één grote verzamelbak. In een Company Brain heeft elk gegeven een herkomst, een eigenaar en rechten. Wat dat verschil voor een bedrijf betekent.",
    short:
      "Een project in ChatGPT is één gedeelde verzamelbak waarin niemand precies weet wie wat erin heeft gezet of het nog klopt; in een Company Brain van nativ heeft elk gegeven een herkomst, een eigenaar, onderhoud en rechten.",
    intro: [
      "Bijna elk bedrijf dat wij spreken gebruikt ChatGPT al, en meestal goed. De vraag is niet of het werkt, maar wat er gebeurt als je er bedrijfskennis in gaat zetten.",
      "Want dan begint het te schuren. Iemand maakt een project en vult het met documenten. Een collega doet hetzelfde, net anders. Een half jaar later weet niemand meer wat erin staat, of het nog klopt, wie het heeft onderhouden en wie het mag zien.",
    ],
    rows: [
      {
        label: "Hoe kennis erin komt",
        other: "Iemand uploadt of plakt wat hij denkt nodig te hebben",
        nativ: "Gestructureerd uitgevraagd en ingelezen, met een eigenaar per onderdeel",
      },
      {
        label: "Weet je wat erin zit?",
        other: "Wat erin gezet is, zonder overzicht per onderwerp",
        nativ: "Ja, per onderwerp zichtbaar, inclusief wat er nog ontbreekt",
      },
      {
        label: "Klopt het nog?",
        other: "Geen verversingsdatum, geen eigenaar",
        nativ: "Elk gegeven heeft een eigenaar en een verversingsdatum",
      },
      {
        label: "Wie mag wat zien",
        other: "Iedereen met toegang tot het project ziet alles erin",
        nativ: "Rechten per gegeven; gevoelige informatie alleen voor wie die mag zien",
      },
      {
        label: "Waar een antwoord vandaan komt",
        other: "Wisselend aangegeven",
        nativ: "Bronvermelding bij elk antwoord",
      },
      {
        label: "Als iemand vertrekt",
        other: "Wat in zijn eigen chats zat, gaat mee",
        nativ: "Blijft in de Brain staan, die van het bedrijf is",
      },
    ],
    strengths: {
      heading: "Waar ChatGPT sterker is",
      paragraphs: [
        "In snelheid en in vrijheid. Voor een losse vraag, een brainstorm of een stuk tekst dat je zelf nakijkt, is er weinig dat sneller is. Er is niets in te richten en niemand hoeft iets af te spreken.",
        "Wij zijn daar eerlijk over: onze omgeving is trager dan consumenten-ChatGPT, doordat er controles en rechten tussen zitten. Dat is de prijs van een systeem waarin je kunt nazoeken waar iets vandaan komt.",
        "En het is geen of-of. De koppeling met je eigen AI zit in de Company Brain; veel mensen blijven ChatGPT gebruiken, alleen dan met de kennis van hun bedrijf erachter.",
      ],
    },
    verdict: {
      heading: "Waar het op neerkomt",
      paragraphs: [
        "Voor losse taken is ChatGPT uitstekend en hoef je niets te veranderen.",
        "Zodra hetzelfde werk elke week terugkomt en meerdere mensen hetzelfde antwoord moeten krijgen, is een verzamelbak niet genoeg. Dan heb je herkomst, eigenaarschap en rechten nodig, en dat is precies waar een Company Brain voor gemaakt is.",
      ],
    },
    faq: [
      {
        q: "Moeten we stoppen met ChatGPT als we een Company Brain hebben?",
        a: "Nee. De koppeling met je eigen AI zit in de Company Brain, dus je kunt ChatGPT of Claude blijven gebruiken. Het verschil is dat er dan de kennis van je bedrijf achter zit, in plaats van wat iemand toevallig in het gesprek heeft geplakt.",
      },
      {
        q: "Is een project in ChatGPT niet gewoon goedkoper?",
        a: "Per gebruiker per maand is het minder. Wat je er niet voor krijgt is zicht op wat erin staat, een eigenaar per onderdeel, rechten per gegeven en een bronvermelding bij elk antwoord. Of dat het waard is, hangt ervan af of je AI voor losse taken gebruikt of voor werk dat elke week terugkomt.",
      },
    ],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    title: "nativ of Notion AI? Documenten versus een kennislaag | nativ",
    description:
      "Notion AI werkt op wat er in Notion staat en is gemaakt om door mensen gelezen te worden. Een Company Brain is gemaakt om door AI gebruikt te worden tijdens het werk.",
    short:
      "Notion AI werkt op de pagina's die in Notion staan en is gemaakt om door mensen gelezen te worden; een Company Brain van nativ is gemaakt om door AI gebruikt te worden tijdens het werk, met een herkomst, een eigenaar en rechten per gegeven.",
    intro: [
      "Notion is een goed documentensysteem, en veel bedrijven hebben er hun wiki in staan. De verleiding is dan om te denken: onze kennis staat al vast, dus we zijn er klaar voor.",
      "Het verschil zit in waar het voor gemaakt is. Een wiki is geschreven om gelezen te worden door iemand die zoekt. Een kennislaag is opgebouwd om gebruikt te worden door een systeem dat werk moet afleveren.",
    ],
    rows: [
      {
        label: "Waarvoor het gemaakt is",
        other: "Pagina's die mensen lezen",
        nativ: "Kennis die AI gebruikt tijdens het werk",
      },
      {
        label: "Waar de kennis vandaan komt",
        other: "Wat iemand heeft opgeschreven",
        nativ: "Je systemen, je documenten en een gestructureerde uitvraag bij je mensen",
      },
      {
        label: "Onderhoud",
        other: "Iemand moet eraan denken",
        nativ: "Eigenaar en verversingsdatum per gegeven",
      },
      {
        label: "Wat erop draait",
        other: "Schrijfhulp en vragen stellen over je pagina's",
        nativ: "AI-workflows die een klus van begin tot eind overnemen",
      },
      {
        label: "Andere bronnen",
        other: "Wat je in Notion zet",
        nativ: "Notion zelf kan een bron zijn, naast je andere systemen",
      },
    ],
    strengths: {
      heading: "Waar Notion sterker is",
      paragraphs: [
        "Als documentensysteem. Samen schrijven, structuur aanbrengen, projecten bijhouden: daar is het goed in en dat vervangt een Company Brain niet.",
        "Notion kan bij ons ook gewoon een bron zijn. Wat je daar hebt staan hoeft niet over.",
      ],
    },
    verdict: {
      heading: "Waar het op neerkomt",
      paragraphs: [
        "Wil je beter schrijven en terugvinden wat je hebt opgeschreven, dan is Notion AI daarvoor gemaakt.",
        "Wil je dat AI werk aflevert dat klopt voor jouw bedrijf, dan is de vraag niet of het is opgeschreven, maar of het bruikbaar is voor een systeem: met herkomst, eigenaar en rechten. Dat is een andere laag.",
      ],
    },
    faq: [
      {
        q: "Kan onze Notion-inhoud mee naar een Company Brain?",
        a: "Ja. Notion is een van de bronnen die aan de Brain gekoppeld kan worden. Je hoeft niets over te typen en je kunt Notion gewoon blijven gebruiken waar het goed in is.",
      },
    ],
  },
  {
    slug: "ai-adviesbureau",
    name: "een AI-adviesbureau",
    title: "nativ of een AI-adviesbureau? Rapport versus werkend systeem | nativ",
    description:
      "Een adviestraject eindigt in een rapport en een rekening vooraf. Bij nativ begin je met een gratis scan en een maandbedrag dat je elke maand kunt opzeggen.",
    short:
      "Een AI-adviesbureau levert een analyse en een roadmap tegen een bedrag vooraf; nativ begint met een gratis zelfbedieningsscan en levert daarna een werkend Company Brain met workflows tegen een maandbedrag dat maandelijks opzegbaar is.",
    intro: [
      "De meeste AI-bureaus in Nederland werken hetzelfde: een gratis kennismaking, dan een betaald traject waarin ze je processen in kaart brengen, dan een pilot. Dat is een prima model en er zitten goede mensen tussen.",
      "Het verschil met ons zit niet in de kwaliteit van het denkwerk, maar in wat je koopt en wanneer je kunt stoppen.",
    ],
    rows: [
      {
        label: "De eerste stap",
        other: "Een gesprek, daarna een betaalde analyse",
        nativ: "Een gratis scan die je zelf doorloopt, met een rapport dat je mag delen",
      },
      {
        label: "Wat je krijgt",
        other: "Een analyse, prioriteiten en een roadmap",
        nativ: "Een werkend Company Brain met workflows erop",
      },
      {
        label: "Wanneer je betaalt",
        other: "Vooraf, per traject of per uur",
        nativ: "Per maand, achteraf opzegbaar",
      },
      {
        label: "Als het niet bevalt",
        other: "Het traject loopt door zoals afgesproken",
        nativ: "Eén maand opzegtermijn, geen minimale looptijd",
      },
      {
        label: "Wie het onderhoudt",
        other: "Meestal een vervolgopdracht",
        nativ: "Het systeem zelf, met een eigenaar per gegeven binnen je bedrijf",
      },
      {
        label: "Waar de kennis blijft",
        other: "Deels bij de consultants",
        nativ: "In je eigen Brain; bij vertrek krijg je beide databases mee",
      },
    ],
    strengths: {
      heading: "Waar een adviesbureau sterker is",
      paragraphs: [
        "Als je vraag breder is dan AI. Een organisatie herinrichten, processen herontwerpen, een verandertraject begeleiden: daar zijn wij niet voor en een goed bureau wel.",
        "En als je een grote, complexe omgeving hebt met veel maatwerk, is een team dat maanden bij je binnen zit soms simpelweg wat je nodig hebt.",
      ],
    },
    verdict: {
      heading: "Waar het op neerkomt",
      paragraphs: [
        "Zoek je een plan en een onafhankelijk oordeel over je hele organisatie, dan koop je advies.",
        "Wil je zien of AI bij jou werkt zonder eerst een traject in te gaan, begin dan met de gratis scan. Die kost je twintig minuten en je zit nergens aan vast.",
      ],
    },
    faq: [
      {
        q: "Doet nativ ook advies?",
        a: "Beperkt, en altijd rond het bouwen. De scan laat zien waar AI in jouw bedrijf het meeste oplevert en in welke volgorde je zou beginnen. Voor bredere organisatievraagstukken ben je bij een adviesbureau beter af.",
      },
      {
        q: "Wat kost de eerste stap bij nativ?",
        a: "Niets. De AI-scan is gratis, duurt in je eentje ongeveer twintig minuten, en levert een rapport op dat je mag delen met wie je wilt. Er zit geen verplichting aan vast.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
