/**
 * Begrippenlijst — één bron voor de hub, de losse pagina's en llms.txt.
 *
 * Waarom dit bestaat: uit de GEO-tussenmeting van 11-09-2026 bleek dat we niet
 * genoemd worden bij "context engineering" en "minimum viable context", terwijl
 * dat onze eigen termen zijn. Een begrippenpagina is precies het soort pagina dat
 * een AI-assistent aanhaalt bij een definitievraag, en het is de goedkoopste
 * manier om het onderwerp van je eigen categorie te worden.
 *
 * Regels bij het bijwerken:
 * - `short` is de citeerbare definitie: één zin, onderwerp erin, staat op zichzelf.
 *   Dit is wat een assistent overneemt. Schrijf hem alsof hij los wordt geciteerd.
 * - Geen stub-pagina's. Een term komt er pas in als er echt iets over te zeggen is;
 *   dunne pagina's in bulk zijn precies waar Google op afrekent.
 * - Alleen claims die ook elders op gonativ.nl staan of algemeen vakinhoudelijk zijn.
 */

export interface GlossaryBlock {
  heading: string;
  paragraphs: string[];
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** Wat in de <title> en de h1 komt, als dat afwijkt van `term`. */
  headline?: string;
  /** De citeerbare definitie. Eén zin. */
  short: string;
  blocks: GlossaryBlock[];
  related: string[];
  faq: { q: string; a: string }[];
}

export const GLOSSARY_UPDATED = "2026-09-11";

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "context-engineering",
    term: "Context engineering",
    short:
      "Context engineering is het vak van het ordenen en beschikbaar stellen van de juiste bedrijfscontext, zodat een AI-systeem werk kan leveren dat klopt voor dat specifieke bedrijf.",
    blocks: [
      {
        heading: "Waar het vandaan komt",
        paragraphs: [
          "Een paar jaar lang ging de aandacht naar prompt engineering: hoe formuleer je je vraag zo dat het model een goed antwoord geeft. Dat werkt voor losse taken, maar niet voor werk dat elke week terugkomt in een organisatie. Dan is de vraag niet hoe je hem stelt, maar wat het model weet op het moment dat je hem stelt.",
          "Context engineering verschuift de aandacht van de vraag naar de kennis eronder. Niet: hoe schrijf ik een betere prompt. Maar: welke informatie moet dit systeem bij de hand hebben, waar komt die vandaan, wie onderhoudt hem, en wie mag hem zien.",
        ],
      },
      {
        heading: "Waarom het ertoe doet",
        paragraphs: [
          "AI faalt in organisaties zelden door een zwak model. De modellen zijn goed genoeg. Het loopt vast omdat ze het bedrijf niet kennen: niet de afspraken, niet de toon, niet wie welke klant doet, niet waarom die ene post elk kwartaal afwijkt.",
          "Die kennis zit verspreid over systemen, e-mails, gesprekken en de hoofden van mensen. Zolang dat zo is, krijg je algemene antwoorden op specifieke vragen. Context engineering is het werk dat daartussen zit.",
        ],
      },
      {
        heading: "Hoe nativ het doet",
        paragraphs: [
          "nativ bouwt die contextlaag als Company Brain: één centrale plek waar samenkomt wat een bedrijf weet, met bij elk gegeven een herkomst, een eigenaar en rechten. Daarbovenop draaien AI-workflows die daaruit putten.",
          "Beginnen doen we bij de Minimum Viable Context: de gestructureerde twintig procent van de bedrijfscontext die ongeveer tachtig procent van de AI-taken dekt. Zo hoeft een bedrijf niet eerst alles vast te leggen voordat er iets werkt.",
        ],
      },
    ],
    related: ["minimum-viable-context", "rag", "prompt-engineering"],
    faq: [
      {
        q: "Wat is het verschil tussen context engineering en prompt engineering?",
        a: "Prompt engineering gaat over hoe je de vraag formuleert. Context engineering gaat over welke kennis het systeem bij de hand heeft als de vraag binnenkomt. Voor losse taken helpt een betere prompt; voor werk dat elke week terugkomt in een bedrijf is de context bepalend.",
      },
      {
        q: "Is context engineering hetzelfde als RAG?",
        a: "Nee. RAG is een techniek om relevante stukken tekst op te halen en aan een model mee te geven. Context engineering is het bredere vak: bepalen welke kennis er überhaupt moet zijn, waar die vandaan komt, wie hem onderhoudt en wie hem mag zien. RAG is een van de manieren waarop die kennis bij het model komt.",
      },
    ],
  },
  {
    slug: "minimum-viable-context",
    term: "Minimum Viable Context (MVC)",
    headline: "Minimum Viable Context (MVC™)",
    short:
      "Minimum Viable Context (MVC™) is het framework van nativ voor de kleinste hoeveelheid gestructureerde bedrijfscontext waarmee AI nuttig werk kan leveren: de twintig procent die ongeveer tachtig procent van de AI-taken dekt.",
    blocks: [
      {
        heading: "Het probleem dat het oplost",
        paragraphs: [
          "Bedrijven die met AI beginnen lopen vaak vast op dezelfde gedachte: eerst moeten we alles vastleggen. Alle processen, alle afspraken, alle kennis uit alle hoofden. Dat project is te groot, het duurt te lang, en tegen de tijd dat het af is klopt de helft niet meer.",
          "Minimum Viable Context draait het om. Niet alles, maar het kleinste deel waarmee AI vandaag al werk kan afleveren dat klopt.",
        ],
      },
      {
        heading: "Wat erin zit",
        paragraphs: [
          "In de praktijk gaat het om de context die bijna elke taak raakt: wie het bedrijf is en hoe het praat, welke klanten en producten er zijn, hoe de processen lopen, welke afspraken gelden, en wie waarover gaat.",
          "Dat is de laag die maakt dat een AI-workflow een offerte kan schrijven die klinkt als jullie, in plaats van als een willekeurig bedrijf.",
        ],
      },
      {
        heading: "Hoe het groeit",
        paragraphs: [
          "MVC is een startpunt, geen eindpunt. Elk gegeven in de Company Brain krijgt een eigenaar en een verversingsdatum, zodat het een levend systeem is en geen momentopname. Wat er niet in zit voegt een bedrijf toe zodra het nodig blijkt, meestal omdat een workflow ertegenaan loopt.",
        ],
      },
    ],
    related: ["context-engineering", "ai-workflow"],
    faq: [
      {
        q: "Hoeveel moet een bedrijf vastleggen om te beginnen?",
        a: "Minder dan de meeste mensen denken. Het uitgangspunt van Minimum Viable Context is dat ongeveer twintig procent van de bedrijfscontext, mits gestructureerd, zo'n tachtig procent van de AI-taken dekt. Bij nativ komt die twintig procent deels uit bestaande systemen en deels uit een gestructureerde uitvraag bij de mensen zelf.",
      },
      {
        q: "Waar staat MVC voor?",
        a: "Voor Minimum Viable Context. De term is een bewuste knipoog naar het Minimum Viable Product: het kleinste ding dat al werkt, in plaats van het complete ding dat er nooit komt.",
      },
    ],
  },
  {
    slug: "ai-workflow",
    term: "AI-workflow",
    short:
      "Een AI-workflow is een AI-toepassing die één terugkerende klus van begin tot eind overneemt, met een vast begin, vaste stappen en een duidelijk eindresultaat.",
    blocks: [
      {
        heading: "Hoe een workflow eruitziet",
        paragraphs: [
          "Neem het maandrapport. Iemand haalt de cijfers uit het boekhoudpakket, zet ze in hetzelfde format als vorige maand, zoekt uit waarom die ene post afwijkt, en schrijft er een toelichting bij. Elke maand opnieuw, elke maand dezelfde stappen.",
          "Dat is een workflow: herhaling met een vaste vorm. Precies het soort werk waar AI goed in is, en precies het soort werk waar in de meeste bedrijven de meeste tijd in gaat zitten.",
        ],
      },
      {
        heading: "Het verschil met een los AI-tool",
        paragraphs: [
          "Een los AI-tool moet elke keer opnieuw uitgelegd krijgen hoe het bedrijf werkt. Een AI-workflow put uit de Company Brain en weet dus al hoe het rapport wordt opgemaakt, welke posten erin horen en wat het bedrijf normaal vindt.",
          "Dat verschil zit niet in het model, maar in de context eronder.",
        ],
      },
      {
        heading: "Wie de regie houdt",
        paragraphs: [
          "Een workflow werkt niet buiten iemand om. De gebruiker ziet wat er gemaakt wordt voordat het gebruikt wordt en bepaalt wat er uitgaat. nativ begint bewust met werk waarvan het resultaat direct te beoordelen is, zodat binnen een week zichtbaar is of het klopt.",
        ],
      },
    ],
    related: ["ai-agent", "digitale-collega", "minimum-viable-context"],
    faq: [
      {
        q: "Wat is het verschil tussen een AI-workflow en een AI-agent?",
        a: "Een AI-workflow volgt een vaste route: begin, stappen, resultaat. Een AI-agent bepaalt zelf welke stappen nodig zijn om een doel te halen. Een workflow is voorspelbaarder en daarom makkelijker te beoordelen; een agent is flexibeler en daarmee moeilijker te controleren.",
      },
      {
        q: "Voor welk werk werkt een AI-workflow niet?",
        a: "Voor werk dat nooit twee keer hetzelfde gaat. Als een klus geen vaste vorm heeft, is het geen goede eerste workflow. Bij vrijwel elk bedrijf is er genoeg werk dat wél elke keer dezelfde route volgt; daar begin je.",
      },
    ],
  },
  {
    slug: "ai-agent",
    term: "AI-agent",
    short:
      "Een AI-agent is een AI-systeem dat een doel krijgt en zelf bepaalt welke stappen nodig zijn om dat doel te halen, inclusief het gebruiken van software en gegevensbronnen onderweg.",
    blocks: [
      {
        heading: "Wat een agent anders maakt",
        paragraphs: [
          "Een chatbot wacht op een vraag en geeft antwoord. Een agent krijgt een opdracht, maakt een plan, gebruikt hulpmiddelen om aan informatie te komen, en werkt de stappen af tot het doel gehaald is.",
          "Die zelfstandigheid is de winst en tegelijk het risico. Hoe meer een agent zelf mag beslissen, hoe minder voorspelbaar het resultaat is.",
        ],
      },
      {
        heading: "Waarom context bepalend is",
        paragraphs: [
          "Een agent die de context van een bedrijf niet kent, neemt beslissingen op basis van algemene aannames. Hij weet niet welke klant gevoelig ligt, welke korting nooit gegeven wordt, of welke toon bij het bedrijf hoort.",
          "Daarom bouwt nativ eerst de Company Brain en zet daar pas werk bovenop. Zonder die laag is zelfstandigheid geen voordeel maar een risico.",
        ],
      },
    ],
    related: ["ai-workflow", "digitale-collega", "hallucinatie"],
    faq: [
      {
        q: "Is agentic AI hetzelfde als een AI-agent?",
        a: "Agentic AI is de verzamelterm voor systemen die zelfstandig stappen zetten richting een doel. Een AI-agent is zo'n systeem. In de praktijk worden de termen door elkaar gebruikt.",
      },
      {
        q: "Kan een AI-agent zonder toezicht werken?",
        a: "Technisch wel, verstandig meestal niet. nativ begint bewust met werk waarvan het resultaat direct te beoordelen is, en breidt pas uit als duidelijk is dat het klopt. Hoeveel een systeem zelf mag, is een keuze die je expliciet maakt, geen eigenschap van de techniek.",
      },
    ],
  },
  {
    slug: "digitale-collega",
    term: "Digitale collega",
    short:
      "Een digitale collega is AI die een afgebakend stuk werk in een organisatie overneemt en daarbij de context van dat bedrijf kent, in plaats van een losse tool die elke keer opnieuw uitleg nodig heeft.",
    blocks: [
      {
        heading: "Wat de term betekent",
        paragraphs: [
          "De term beschrijft een bestemming: AI die meedraait in het werk zoals een collega dat doet, met kennis van de afspraken, de klanten en de toon van het bedrijf.",
          "Onder water is het hetzelfde als een set AI-workflows op een Company Brain. Het verschil zit in hoe je ernaar kijkt: niet als een tool die je opent, maar als werk dat af komt.",
        ],
      },
      {
        heading: "Waarom nativ liever over workflows praat",
        paragraphs: [
          "Een digitale collega klinkt als iets dat je in één keer aanzet. Zo werkt het niet. Je begint met één klus, je kijkt of het resultaat klopt, en je breidt uit waar het werkt.",
          "Daarom noemt nativ het werk bij naam: een AI-workflow die het maandrapport maakt, of de inkomende leads sorteert. De optelsom daarvan gaat steeds meer op een collega lijken.",
        ],
      },
    ],
    related: ["ai-workflow", "ai-agent", "context-engineering"],
    faq: [
      {
        q: "Vervangt een digitale collega een medewerker?",
        a: "In de praktijk neemt hij werk over, geen mensen. Het werk dat zich leent voor AI is het werk met herhaling en een vaste vorm: rapportages, voorbereidingen, sorteerwerk, regelwerk. Dat is zelden iemands hele functie.",
      },
    ],
  },
  {
    slug: "rag",
    term: "RAG (retrieval-augmented generation)",
    short:
      "RAG, voluit retrieval-augmented generation, is een techniek waarbij een AI-systeem eerst relevante stukken uit een kennisbron ophaalt en die aan het taalmodel meegeeft, zodat het antwoord op die bron gebaseerd is in plaats van op wat het model uit zichzelf denkt te weten.",
    blocks: [
      {
        heading: "Hoe het werkt",
        paragraphs: [
          "Een taalmodel weet alleen wat er in zijn training zat en wat je hem meegeeft. RAG lost het tweede deel op: bij elke vraag zoekt het systeem eerst in een kennisbron naar de stukken die ertoe doen, en plakt die bij de vraag.",
          "Het model verzint het antwoord dus niet uit het niets, maar leest mee uit materiaal dat er echt staat.",
        ],
      },
      {
        heading: "Waar het wel en niet voor zorgt",
        paragraphs: [
          "RAG maakt antwoorden beter onderbouwd en maakt een bronvermelding mogelijk. Wat het niet oplost is de kwaliteit van de bron zelf. Staat er iets verouderds in, dan haalt RAG dat net zo netjes op.",
          "Daarom hangt bij nativ aan elk gegeven in de Company Brain een eigenaar en een verversingsdatum. De techniek haalt op; de afspraken eromheen bepalen of wat opgehaald wordt nog klopt.",
        ],
      },
    ],
    related: ["context-engineering", "hallucinatie", "herleidbaarheid"],
    faq: [
      {
        q: "Is RAG hetzelfde als een model trainen op je eigen data?",
        a: "Nee. Bij trainen verandert het model zelf, wat duur is en lastig terug te draaien. Bij RAG blijft het model ongewijzigd en wordt de juiste informatie per vraag meegegeven. Dat is goedkoper, sneller bij te werken, en je kunt zien waar een antwoord vandaan komt.",
      },
    ],
  },
  {
    slug: "context-window",
    term: "Contextvenster (context window)",
    short:
      "Het contextvenster is de hoeveelheid tekst die een taalmodel in één keer kan meenemen: de vraag, de meegegeven documenten en het gesprek tot dan toe samen.",
    blocks: [
      {
        heading: "Waarom het een grens is",
        paragraphs: [
          "Alles wat een model moet meewegen, moet in dat venster passen. Is het bedrijfsmateriaal groter dan het venster, dan moet er gekozen worden wat er wel en niet in gaat.",
          "Die keuze is precies waar het misgaat bij losse tools: te weinig meegeven en het model gokt, te veel meegeven en het verliest de kern tussen de ruis.",
        ],
      },
      {
        heading: "Waarom groter niet vanzelf beter is",
        paragraphs: [
          "Contextvensters worden groter, maar dat lost het probleem niet op. Een model dat honderden pagina's krijgt aangereikt zonder ordening, geeft slechtere antwoorden dan een model dat de juiste drie alinea's krijgt.",
          "Dat is het argument achter Minimum Viable Context: niet zo veel mogelijk meegeven, maar het juiste.",
        ],
      },
    ],
    related: ["minimum-viable-context", "rag", "context-engineering"],
    faq: [
      {
        q: "Wat gebeurt er als het contextvenster vol is?",
        a: "Dan valt er informatie af. Afhankelijk van het systeem is dat het begin van het gesprek of een deel van de meegegeven documenten. Het model zegt daar meestal niets over, dus je merkt het aan het antwoord in plaats van aan een foutmelding.",
      },
    ],
  },
  {
    slug: "hallucinatie",
    term: "Hallucinatie",
    short:
      "Een hallucinatie is een antwoord van een AI-systeem dat overtuigend klinkt maar niet klopt, doordat het model een plausibele tekst vormt in plaats van een feit opzoekt.",
    blocks: [
      {
        heading: "Waarom het gebeurt",
        paragraphs: [
          "Een taalmodel voorspelt welke tekst logisch volgt. Als het de juiste informatie niet heeft, houdt het niet op: het maakt iets dat eruitziet als een goed antwoord. De toon blijft even stellig als bij een antwoord dat wél klopt.",
          "Dat is geen storing maar de manier waarop de techniek werkt. Je lost het dus niet op door beter te vragen, maar door te zorgen dat de juiste informatie er is.",
        ],
      },
      {
        heading: "Wat eraan te doen is",
        paragraphs: [
          "Twee dingen helpen. Zorg dat het systeem put uit een bron die klopt, zodat het niets hoeft te verzinnen. En laat bij elk antwoord zien waar het vandaan komt, zodat een mens het kan controleren zonder alles opnieuw op te zoeken.",
          "In een Company Brain heeft elk gegeven daarom een herkomst en komt elk antwoord met een bronvermelding.",
        ],
      },
    ],
    related: ["rag", "herleidbaarheid", "ai-agent"],
    faq: [
      {
        q: "Kun je hallucinaties helemaal uitsluiten?",
        a: "Nee, en iedereen die dat belooft overdrijft. Wat je wel kunt: de kans sterk verkleinen door het systeem uit een gecontroleerde bron te laten putten, en de schade beperken door elk antwoord van een bronvermelding te voorzien zodat een fout opvalt.",
      },
    ],
  },
  {
    slug: "prompt-engineering",
    term: "Prompt engineering",
    short:
      "Prompt engineering is het zo formuleren van een opdracht aan een AI-model dat het antwoord bruikbaar wordt, door het doel, de vorm en de randvoorwaarden expliciet te maken.",
    blocks: [
      {
        heading: "Waar het goed voor is",
        paragraphs: [
          "Voor losse taken werkt het. Zeg wat je wilt, in welke vorm, voor wie, en wat er niet in moet, en je krijgt een beter resultaat dan met een vage vraag.",
        ],
      },
      {
        heading: "Waar het ophoudt",
        paragraphs: [
          "Zodra hetzelfde werk elke week terugkomt, loopt het vast. Je kunt niet elke keer opnieuw uitleggen hoe het bedrijf werkt, welke klanten er zijn en welke toon erbij hoort. En als je het wel doet, doet je collega het net anders en komt er iets anders uit.",
          "Dat is waarom de aandacht verschuift naar context engineering: de kennis één keer goed vastleggen, in plaats van hem bij elke vraag opnieuw intikken.",
        ],
      },
    ],
    related: ["context-engineering", "minimum-viable-context"],
    faq: [
      {
        q: "Is prompt engineering nog nodig als je een Company Brain hebt?",
        a: "Minder, maar niet nooit. Een goede opdracht helpt altijd. Het verschil is dat je niet meer hoeft uit te leggen wie je bent en hoe je werkt, want dat staat al vast. Je vraag kan dan over de klus gaan in plaats van over de context.",
      },
    ],
  },
  {
    slug: "herleidbaarheid",
    term: "Herleidbaarheid van AI",
    short:
      "Herleidbaarheid betekent dat je kunt navertellen hoe een AI-systeem tot een antwoord is gekomen: uit welke bron het komt, wie verantwoordelijk is voor dat gegeven en wie het mocht zien.",
    blocks: [
      {
        heading: "Waarom het een eis is geworden",
        paragraphs: [
          "De EU AI Act vraagt om transparantie: een organisatie moet kunnen uitleggen hoe haar AI tot een uitkomst komt. Een systeem dat alleen een antwoord teruggeeft, zonder spoor terug, voldoet daar niet aan.",
          "Los van de wet is het ook gewoon praktisch. Een antwoord zonder bron moet je zelf natrekken, en dan had je het net zo goed zelf kunnen opzoeken.",
        ],
      },
      {
        heading: "Hoe het eruitziet in de praktijk",
        paragraphs: [
          "Bij elk antwoord staat waar het vandaan komt. Bij elk gegeven staat wie de eigenaar is en wanneer het voor het laatst is bevestigd. En rechten bepalen wie welk gegeven mag zien, zodat een antwoord nooit meer prijsgeeft dan de vraagsteller mag weten.",
        ],
      },
    ],
    related: ["hallucinatie", "rag", "shadow-ai"],
    faq: [
      {
        q: "Wat vraagt de EU AI Act precies op dit punt?",
        a: "De Act vraagt om transparantie en om menselijk toezicht: gebruikers moeten weten dat en hoe AI is ingezet, en een organisatie moet de werking van haar systemen kunnen uitleggen. Wat er precies van je gevraagd wordt hangt af van het risiconiveau van de toepassing.",
      },
    ],
  },
  {
    slug: "shadow-ai",
    term: "Shadow AI",
    short:
      "Shadow AI is het gebruik van AI-tools door medewerkers buiten het zicht van de organisatie om, meestal met persoonlijke accounts en zonder afspraken over data, rechten of kwaliteit.",
    blocks: [
      {
        heading: "Hoe het ontstaat",
        paragraphs: [
          "Zelden uit onwil. Iemand heeft werk te doen, een gratis tool doet het sneller, en er is geen alternatief binnen het bedrijf. Voor je het weet staan klantgegevens in een account waar niemand zicht op heeft.",
        ],
      },
      {
        heading: "Wat het kost",
        paragraphs: [
          "Drie dingen. Data lekt naar plekken waar je geen afspraken mee hebt. Kwaliteit loopt uiteen, want iedereen doet het net anders. En de kennis die daarbij ontstaat blijft in persoonlijke chats hangen in plaats van in het bedrijf.",
          "Een gedeelde, gecontroleerde plek lost dat niet af met een verbod maar met een beter alternatief: één omgeving waar wel afspraken gelden en waar het resultaat ook nog eens beter is, omdat de context van het bedrijf erin zit.",
        ],
      },
    ],
    related: ["herleidbaarheid", "context-engineering"],
    faq: [
      {
        q: "Help je shadow AI de wereld uit met een verbod?",
        a: "Meestal niet. Een verbod haalt de reden om het te doen niet weg, het haalt alleen het zicht erop weg. Wat wel werkt is een omgeving bieden die het werk beter doet dan de gratis tool, omdat de kennis van het bedrijf erin zit.",
      },
    ],
  },
];

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}

export function termTitle(t: GlossaryTerm): string {
  return t.headline ?? t.term;
}
