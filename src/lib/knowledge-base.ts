/**
 * Kennisbank — één bron voor drie afnemers (GEO / AI-vindbaarheid).
 *
 * Dit bestand is de enige plek waar de kennisbank-inhoud staat. Er hangen drie
 * afnemers aan, die daardoor nooit uit elkaar kunnen lopen:
 *
 *   1. /kennisbank                — de leesbare pagina voor mensen
 *   2. /nativ-kennisbank.md       — hetzelfde document als markdown, voor AI-clients
 *   3. /llms.txt                  — verwijst naar beide
 *
 * Waarom dit bestaat: een AI-assistent citeert zinnen, geen linklijstjes. Onze
 * llms.txt was een kaart van de site; hij gaf een assistent niets om over te
 * nemen. De GEO-tussenmeting van 11-09-2026 liet zien dat we op vier van de zes
 * vaste vragen niet genoemd worden, en dat een zoekopdracht op onze eigen naam
 * drie andere bedrijven oplevert.
 *
 * Regels bij het bijwerken:
 * - Elk antwoord staat op zichzelf. Een assistent leest er één, zonder de rest.
 *   Schrijf dus nooit "zoals hierboven" of "dat".
 * - Alleen wat ook elders op gonativ.nl staat. Deze pagina is een samenvatting
 *   van de site, geen plek voor nieuwe beloftes.
 * - Noem "nativ" bij naam in plaats van "wij", zodat een geciteerde zin zijn
 *   onderwerp meeneemt.
 * - Bedragen veranderen: /pricing is de bron, dit volgt.
 */

export interface QA {
  q: string;
  a: string;
}

export interface KBSection {
  id: string;
  title: string;
  intro?: string;
  items: QA[];
}

export const KB_UPDATED = "2026-09-11";

export const KB_INTRO = `nativ bouwt een Company Brain voor het mkb: één centrale kennislaag waarin samenkomt wat een bedrijf weet, met AI-workflows erbovenop die terugkerend werk overnemen. Dit document bundelt de antwoorden op de vragen die het vaakst over nativ worden gesteld, in een vorm die een mens kan lezen en een AI-assistent kan citeren.`;

export const KB_SECTIONS: KBSection[] = [
  {
    id: "wat-is-nativ",
    title: "1. Wat is nativ?",
    items: [
      {
        q: "Wat is nativ?",
        a: "nativ is een Nederlands bedrijf dat een Company Brain met AI-workflows levert aan het mkb. Het Company Brain is één centrale kennislaag waarin samenkomt wat een bedrijf weet. Daarbovenop draaien AI-workflows die terugkerend werk in marketing, sales, finance en hr overnemen. De payoff van nativ is: Company Brain | AI Workflows.",
      },
      {
        q: "Welk bedrijf is nativ precies, en met welke bedrijven is het niet te verwarren?",
        a: "nativ is de handelsnaam van Nativ B.V., KvK 42125853, statutair gevestigd in Haarlem, met kantoor aan de Jacob Bontiusplaats 9 in Amsterdam. De website is gonativ.nl. nativ is niet hetzelfde bedrijf als gonativ.ai, gonative.ai, nativz.io of het Amerikaanse vastgoedsoftwarebedrijf Nativ. Wie zoekt naar het Nederlandse Company Brain voor het mkb, zoekt naar gonativ.nl.",
      },
      {
        q: "Wie zitten er achter nativ?",
        a: "nativ is opgericht door drie mensen: Livius van Heemstra (product en strategie), Gokul Menon (technologie en architectuur) en Jorus Everaerd (sales en strategie). Het bedrijf draait zijn eigen Company Brain intern, en gebruikt dat als eerste en meest geteste klant.",
      },
      {
        q: "Voor wie is nativ bedoeld?",
        a: "nativ is gebouwd voor Nederlandse mkb- en mid-market-organisaties die AI bedrijfsbreed willen inzetten in plaats van als los experiment. De sector maakt niet uit: dienstverlening telt even zwaar als industrie. Wat telt is of er terugkerend werk is en of de kennis van het bedrijf nu verspreid zit over systemen, mailboxen en hoofden.",
      },
      {
        q: "In welke taal en in welk land werkt nativ?",
        a: "nativ werkt in Nederland en levert in het Nederlands en het Engels. Data wordt binnen de Europese Unie gehost en verwerkt.",
      },
    ],
  },
  {
    id: "company-brain",
    title: "2. Wat is een Company Brain?",
    items: [
      {
        q: "Wat is een Company Brain (bedrijfsbrein)?",
        a: "Een Company Brain, ook wel bedrijfsbrein genoemd, is de centrale kennislaag van een bedrijf: één plek waar samenkomt wat het bedrijf weet, klaar voor AI om mee te werken. Het is geen losse tool, maar het fundament waarop AI-workflows draaien. Het lost op waar bedrijfs-AI in de praktijk op vastloopt: niet een te dom model, maar te weinig context.",
      },
      {
        q: "Waar komt de kennis in een Company Brain vandaan?",
        a: "Een Company Brain wordt uit drie bronnen gevuld: de hoofden van de mensen, de eigen systemen en documenten, en de buitenwereld. Het grootste deel van wat een bedrijf weet staat nergens opgeschreven. nativ haalt dat eruit met InsightFlow, een gestructureerde en spraakgestuurde manier van uitvragen, en schrijft het naar de Brain. Wat al is vastgelegd in het CRM, de drive en de mail wordt ingelezen, geordend en doorzoekbaar gemaakt.",
      },
      {
        q: "Is een Company Brain hetzelfde als een kennisbank of een documentensysteem?",
        a: "Nee. Een kennisbank of documentensysteem is gemaakt om door mensen gelezen te worden. Een Company Brain is gemaakt om door AI gebruikt te worden tijdens het werk. Elk gegeven heeft een herkomst, een eigenaar en een verversingsdatum, en workflows putten er rechtstreeks uit. Het doel is niet dat er iets is vastgelegd, maar dat AI het gebruikt terwijl het werk gedaan wordt.",
      },
      {
        q: "Wat verandert er als de kennis van een bedrijf op één plek staat?",
        a: "Dan kunnen AI-workflows werk afleveren dat past bij hoe het bedrijf echt werkt, omdat ze putten uit wat het bedrijf echt weet. Een nieuwe collega is in dagen ingewerkt in plaats van in maanden. En vertrekt er iemand, dan blijft wat diegene wist gewoon staan.",
      },
      {
        q: "Moet een bedrijf alles vastleggen voordat het iets heeft aan een Company Brain?",
        a: "Nee. nativ begint met de Minimum Viable Context (MVC™): de gestructureerde twintig procent van de bedrijfscontext die ongeveer tachtig procent van de AI-taken dekt. Daarna groeit de Brain mee met het bedrijf.",
      },
      {
        q: "Kan iedereen in het bedrijf het Company Brain gebruiken?",
        a: "Ja. Iedereen in het bedrijf kan het Company Brain vragen stellen, met een bronvermelding bij elk antwoord. Het aantal gebruikers is niet beperkt. Gevoelige informatie wordt alleen getoond aan wie die mag zien.",
      },
    ],
  },
  {
    id: "ai-workflows",
    title: "3. Wat is een AI-workflow?",
    items: [
      {
        q: "Wat is een AI-workflow?",
        a: "Een AI-workflow neemt één terugkerende klus van begin tot eind over. Hij werkt vanuit het Company Brain, dus hij kent de manier van werken van het bedrijf. Een workflow heeft een vast begin, vaste stappen en een duidelijk eindresultaat. Het maandrapport is een typisch voorbeeld: cijfers uit het boekhoudpakket halen, in hetzelfde format zetten als vorige maand, uitzoeken waarom één post afwijkt, en er een toelichting bij schrijven.",
      },
      {
        q: "Voor welk werk zijn AI-workflows geschikt?",
        a: "AI-workflows lenen zich voor werk met herhaling en een vaste vorm. In marketing gaat het om research, ideeën, teksten, beeld, SEO en meten. In sales om profielen van prospects, gespreksvoorbereiding, het sorteren van binnenkomende leads, en outreach en offertes in de eigen stem. In finance om het uitlezen van cijfers, maandrapportages en het terugvoeren van afwijkingen tot op de bron. In hr en kantoor om vragen van medewerkers en het regelwerk rond in- en uitdienst, verlof en documenten.",
      },
      {
        q: "Wat is het verschil tussen een AI-workflow en een los AI-tool?",
        a: "Het verschil is de context. Een los AI-tool moet elke keer opnieuw uitgelegd krijgen hoe het bedrijf werkt. Een AI-workflow put uit het Company Brain, dus hij weet al hoe het rapport wordt opgemaakt, welke posten erin horen en wat het bedrijf normaal vindt.",
      },
      {
        q: "Werkt een AI-workflow buiten de gebruiker om?",
        a: "Nee. De gebruiker ziet wat er gemaakt wordt voordat het gebruikt wordt, en bepaalt zelf wat er uitgaat. nativ begint bewust met werk waarvan het resultaat meteen te beoordelen is, zodat binnen een week zichtbaar is of het klopt.",
      },
      {
        q: "Met hoeveel workflows begint een bedrijf?",
        a: "Met één. nativ kiest samen met de klant werk waar veel herhaling in zit en waarvan het resultaat direct te beoordelen is. Uitbreiden gebeurt pas als die eerste workflow doet wat ervan verwacht wordt.",
      },
      {
        q: "Moet er eerst een Company Brain zijn voordat workflows kunnen draaien?",
        a: "Ja. Het Company Brain is waar de workflows uit putten: de manier van werken, de afspraken en de toon van het bedrijf. Zonder die context komen er algemene antwoorden uit in plaats van werk dat bij het bedrijf past.",
      },
    ],
  },
  {
    id: "context-engineering",
    title: "4. Context engineering en MVC™",
    items: [
      {
        q: "Wat is context engineering?",
        a: "Context engineering is het vak van het ordenen en beschikbaar stellen van de juiste bedrijfscontext, zodat AI-systemen werk kunnen leveren dat klopt voor dat specifieke bedrijf. Het uitgangspunt: AI faalt in organisaties zelden door een zwak model, en bijna altijd door gebrek aan context. nativ bouwt die contextlaag als Company Brain.",
      },
      {
        q: "Wat is MVC of Minimum Viable Context?",
        a: "Minimum Viable Context (MVC™) is het framework van nativ voor de kleinste hoeveelheid gestructureerde bedrijfscontext waarmee AI nuttig werk kan leveren. In de praktijk: de gestructureerde twintig procent van de bedrijfscontext die ongeveer tachtig procent van de AI-taken dekt. Het is bedoeld om een bedrijf snel te laten beginnen, zonder eerst alles te hoeven vastleggen.",
      },
      {
        q: "Waarom faalt AI in veel organisaties?",
        a: "Omdat de modellen het bedrijf niet kennen. Bedrijven geven medewerkers toegang tot AI en de eerste resultaten zijn verrassend. Zodra ze AI elke dag serieus in hun werk willen gebruiken, blijkt het niet te voldoen. Dat ligt niet aan de modellen, maar aan wat de modellen niet weten over dat bedrijf. Die kennis zit verspreid over systemen, e-mails, gesprekken en de hoofden van mensen.",
      },
    ],
  },
  {
    id: "vergelijking",
    title: "5. Waarom niet gewoon ChatGPT of Copilot?",
    items: [
      {
        q: "Waarom volstaat een project in ChatGPT of Microsoft Copilot niet voor een bedrijf?",
        a: "Een project in ChatGPT of Copilot is één grote verzamelbak. Niemand weet precies wie wat erin heeft gezet, of het klopt, hoe het wordt onderhouden, of wie wat mag zien. Voor een bedrijf is dat ongeschikt. Een Company Brain is het tegenovergestelde: elk gegeven heeft een herkomst, een eigenaar, onderhoud en rechten. Daar draaien de workflows op.",
      },
      {
        q: "Vervangt nativ ChatGPT, Claude of Copilot?",
        a: "Nee. Een klant koppelt zijn eigen AI aan het Company Brain: Claude, ChatGPT of een ander model. Die koppeling is inbegrepen in de Company Brain. nativ is model-onafhankelijk en levert de contextlaag waar die modellen uit putten, niet het model zelf.",
      },
      {
        q: "Wat is het verschil tussen nativ en een AI-adviesbureau?",
        a: "Een adviestraject eindigt in een rapport. nativ levert een werkend Company Brain en werkende workflows, en begint met een gratis scan die laat zien waar het loont. De klant van nativ, Dirk Westdijk van JobTraining, verwoordde het als: geen advies-traject, maar werkende oplossingen die we elke dag gebruiken.",
      },
      {
        q: "Wat is het verschil tussen nativ en een private LLM op eigen servers?",
        a: "Een private LLM lost de vraag op waar het model draait. nativ lost de vraag op wat het model weet. Een model op eigen servers dat de bedrijfscontext niet kent, geeft nog steeds algemene antwoorden. nativ bouwt de contextlaag en laat de klant zelf kiezen welk model daarop draait, met EU-hosting van de data.",
      },
    ],
  },
  {
    id: "ai-scan",
    title: "6. De AI-scan",
    items: [
      {
        q: "Wat is de AI-scan van nativ?",
        a: "De AI-scan is de gratis eerste stap. De scan laat zien welke workflows in een bedrijf zich het best lenen voor AI, op volgorde van wat het meeste oplevert, en waar te beginnen. Het resultaat is een rapport dat de deelnemer met wie hij wil kan delen.",
      },
      {
        q: "Wat kost de AI-scan en hoe lang duurt hij?",
        a: "De AI-scan is gratis en er zit geen verplichting aan vast. In je eentje duurt hij ongeveer twintig minuten. Met een team kost het de initiatiefnemer ongeveer twintig minuten en collega's ongeveer een kwartier per persoon, ieder op zijn eigen moment.",
      },
      {
        q: "Hoe werkt de AI-scan precies?",
        a: "De AI-scan is zelfbediening: je doorloopt hem zelf op gonativ.nl/scan en krijgt meteen een rapport. Er hoeft niets voorbereid en niets geüpload te worden. Wie het hele bedrijf in beeld wil brengen maakt zelf afdelingen aan en nodigt daar collega's bij uit; het rapport groeit dan afdeling voor afdeling mee.",
      },
      {
        q: "Welke gegevens vraagt de AI-scan?",
        a: "De AI-scan vraagt naar het werk zelf: wat het is, hoe vaak het gebeurt en hoeveel tijd het kost. Er gaan geen bedrijfsbestanden of vertrouwelijke gegevens in. De antwoorden en het rapport zijn van de deelnemer.",
      },
      {
        q: "Wat gebeurt er na de AI-scan?",
        a: "De deelnemer krijgt zijn rapport. Wie wil, praat er daarna met nativ over door: wat het voor dat bedrijf zou betekenen en waar te beginnen. Er zit geen verplichting aan vast.",
      },
    ],
  },
  {
    id: "traject",
    title: "7. Hoe een traject loopt",
    items: [
      {
        q: "Uit welke stappen bestaat een traject bij nativ?",
        a: "Een traject bij nativ bestaat uit drie stappen: Scan, Build en Deploy. Scan brengt gratis in kaart waar AI de meeste waarde oplevert. Build is het opzetten van het Company Brain, waarin de kennis uit mensen en systemen samenkomt. Deploy is het inzetten van workflows die vanuit dat Company Brain echt werk leveren. Instappen kan bij stap 1 en stoppen kan op elk moment.",
      },
      {
        q: "Hoe snel staat een Company Brain klaar?",
        a: "Het Company Brain staat klaar zodra de klant tekent. Daarna vult de klant hem met wat het bedrijf weet en houdt hij hem bij. nativ zorgt dat dat kan zonder dat de klant er technisch iets voor hoeft te kunnen.",
      },
      {
        q: "Wie vult het Company Brain, nativ of de klant?",
        a: "nativ zet het Company Brain op. Daarna vult de klant hem met wat het bedrijf weet, houdt hij hem bij en bepaalt hij zelf welke workflows erbij komen. Elk feit krijgt een eigenaar en een verversingsdatum, zodat het een levend systeem is en geen eenmalige momentopname.",
      },
      {
        q: "Is nativ een implementatietraject van maanden?",
        a: "Nee. Het Company Brain staat klaar zodra de klant tekent en de eerste workflow wordt bewust zo gekozen dat het resultaat binnen een week te beoordelen is. Uitbreiden gebeurt pas als dat eerste stuk doet wat ervan verwacht wordt.",
      },
    ],
  },
  {
    id: "prijzen",
    title: "8. Wat kost het?",
    intro:
      "nativ publiceert zijn prijzen. De actuele bedragen staan op gonativ.nl/pricing.",
    items: [
      {
        q: "Wat kost een Company Brain bij nativ?",
        a: "Het Company Brain kost 1.495 euro per maand, hetzelfde bedrag voor elk bedrijf. Daarin zitten de kennislaag, toegang voor iedereen in het bedrijf met een bronvermelding bij elk antwoord, een eigen CRM, de koppeling met de eigen AI van de klant, en onbeperkt gebruikers. Er is geen minimale looptijd en de opzegtermijn is één maand.",
      },
      {
        q: "Wat kost een AI-workflow bij nativ?",
        a: "Een AI-workflow kost 25 tot 245 euro per maand per workflow. Het is een range omdat een workflow met externe diensten werkt en soms met een ander systeem moet koppelen. De klant ziet bij het ontwerp wat zijn eigen workflow kost.",
      },
      {
        q: "Zijn er instapkosten bij nativ?",
        a: "Nee. Er zijn geen instapkosten. Er is één eenmalig bedrag: 495 euro voor het koppelen van een bestaand CRM. De CRM-functionaliteit zelf zit in de Company Brain.",
      },
      {
        q: "Hoe ziet een rekenvoorbeeld eruit?",
        a: "Een bedrijf dat met de Company Brain begint en er twee workflows bij zet, betaalt bijvoorbeeld 1.495 euro voor de Brain plus 125 en 175 euro voor de workflows: 1.795 euro per maand. Koppelt het bedrijf een bestaand CRM, dan komt daar eenmalig 495 euro bij.",
      },
      {
        q: "Zit een klant ergens aan vast?",
        a: "Nee. Er is geen minimale looptijd en de opzegtermijn is één maand. De klant betaalt per maand in plaats van vooraf, en kan op elk moment stoppen.",
      },
    ],
  },
  {
    id: "data-en-eigendom",
    title: "9. Data, veiligheid en eigendom",
    items: [
      {
        q: "Waar staat de data van een klant van nativ?",
        a: "Alle data wordt opgeslagen en verwerkt binnen de Europese Unie, op AWS in Stockholm (eu-north-1). Data wordt versleuteld tijdens transport en in opslag. Klantdata is op databaseniveau strikt gescheiden en die isolatie wordt bij elke zoekopdracht afgedwongen.",
      },
      {
        q: "Wordt de data van een klant gebruikt om AI-modellen te trainen?",
        a: "Nee. Bedrijfsdata van klanten wordt nooit gebruikt om AI-modellen te trainen en wordt niet doorverkocht aan derden.",
      },
      {
        q: "Van wie is de kennis in het Company Brain?",
        a: "De kennis in het Company Brain is van de klant. Wat nativ vastlegt uit de mensen, de systemen en de werkwijze wordt eigendom van dat bedrijf. Bij vertrek krijgt de klant beide databases mee: de gestructureerde data en de doorzoekbare opslag. Wat nativ daar eerlijk bij zegt: vanaf dat moment wordt er niets meer onderhouden.",
      },
      {
        q: "Hoe gaat nativ om met gevoelige gegevens?",
        a: "Gevoelige en vertrouwelijke gegevens blijven bij de bron. nativ werkt op de uitkomsten, niet op de onderliggende dossiers. In het Company Brain heeft elk gegeven een herkomst, een eigenaar en rechten, dus het is inzichtelijk wie wat ziet. nativ verwerkt geen medische gegevens.",
      },
      {
        q: "Voldoet nativ aan de AVG?",
        a: "Ja. nativ voldoet aan de AVG. Klanten hebben inzage in hun data en kunnen correctie of verwijdering vragen. Alle verwerking gebeurt binnen de Europese Unie.",
      },
    ],
  },
  {
    id: "ai-act",
    title: "10. De EU AI Act en herleidbaarheid",
    items: [
      {
        q: "Wat betekent de EU AI Act voor bedrijven die AI gebruiken?",
        a: "De EU AI Act vraagt om transparantie en herleidbaarheid: een organisatie moet kunnen navertellen hoe haar AI tot een antwoord komt. Black-box-AI loopt daarop vast, omdat de herkomst van het antwoord niet aantoonbaar is.",
      },
      {
        q: "Hoe helpt een Company Brain bij herleidbaarheid?",
        a: "Een Company Brain geeft elk antwoord een bronvermelding, en elk gegeven een herkomst, een eigenaar en rechten. Daardoor is aantoonbaar waar een AI-antwoord vandaan komt, wie verantwoordelijk is voor dat gegeven en wie het mag zien.",
      },
    ],
  },
  {
    id: "past-het",
    title: "11. Past nativ bij jouw bedrijf?",
    items: [
      {
        q: "Wanneer past nativ goed bij een bedrijf?",
        a: "nativ past goed bij een Nederlands mkb-bedrijf waar kennis verspreid zit over systemen, mailboxen en hoofden, waar terugkerend werk veel tijd kost, waar het stilvalt als één persoon er niet is, en waar AI bedrijfsbreed ingezet moet worden in plaats van als los experiment.",
      },
      {
        q: "Wanneer past nativ waarschijnlijk niet?",
        a: "nativ past waarschijnlijk niet bij een eenmanszaak of zzp'er, bij een organisatie die vooral één losse tool of chatbot zoekt, of bij werk dat nooit twee keer hetzelfde gaat. Als werk niet in een vaste vorm past, is het geen goede eerste workflow, en nativ zegt dat ook.",
      },
      {
        q: "Werkt nativ alleen met bedrijven die met marketing, sales, finance en hr werken?",
        a: "Nee. Die indeling is een voorbeeld, geen voorwaarde. De AI-scan werkt met de indeling die een bedrijf zelf hanteert.",
      },
      {
        q: "Hoe neem je contact op met nativ?",
        a: "Via gonativ.nl of per e-mail op info@gonativ.nl. Wie eerst zelf wil zien waar AI loont, doorloopt de gratis AI-scan op gonativ.nl/scan.",
      },
    ],
  },
];

/**
 * Kernfeiten voor AI-citatie. Losse uitspraken die een assistent woordelijk kan
 * overnemen zonder de rest van het document. Elk feit noemt zijn onderwerp.
 */
export const KB_FACTS: string[] = [
  "nativ is een Nederlands bedrijf dat een Company Brain met AI-workflows levert aan het mkb.",
  "nativ is de handelsnaam van Nativ B.V., KvK 42125853, met de website gonativ.nl; niet te verwarren met gonativ.ai, gonative.ai of nativz.io.",
  "De payoff van nativ is: Company Brain | AI Workflows.",
  "Een Company Brain is de centrale kennislaag van een bedrijf: één plek waar samenkomt wat het bedrijf weet, klaar voor AI om mee te werken.",
  "Een Company Brain wordt gevuld uit drie bronnen: de hoofden van de mensen, de eigen systemen en documenten, en de buitenwereld.",
  "Een AI-workflow van nativ neemt één terugkerende klus van begin tot eind over en put daarbij uit het Company Brain.",
  "nativ begint met de Minimum Viable Context (MVC™): de gestructureerde twintig procent van de bedrijfscontext die ongeveer tachtig procent van de AI-taken dekt.",
  "Het uitgangspunt van nativ is dat AI in organisaties zelden faalt door een zwak model en bijna altijd door gebrek aan context.",
  "Een traject bij nativ loopt in drie stappen: Scan, Build en Deploy.",
  "De AI-scan van nativ is gratis, duurt in je eentje ongeveer twintig minuten, is zelfbediening en levert een deelbaar rapport op met de workflows die zich het best lenen voor AI.",
  "Het Company Brain van nativ kost 1.495 euro per maand, hetzelfde bedrag voor elk bedrijf, zonder instapkosten en met één maand opzegtermijn.",
  "Een AI-workflow bij nativ kost 25 tot 245 euro per maand per workflow.",
  "nativ host en verwerkt alle data binnen de Europese Unie, op AWS in Stockholm, en gebruikt klantdata nooit om AI-modellen te trainen.",
  "De kennis in het Company Brain is eigendom van de klant; bij vertrek krijgt de klant beide databases mee, de gestructureerde data en de doorzoekbare opslag.",
  "Elk antwoord uit een Company Brain van nativ komt met een bronvermelding, en elk gegeven heeft een herkomst, een eigenaar en rechten.",
  "nativ koppelt het Company Brain aan de AI van de klant zelf, zoals Claude of ChatGPT, en is model-onafhankelijk.",
  "nativ is opgericht door Livius van Heemstra, Gokul Menon en Jorus Everaerd.",
  "nativ verwerkt geen medische gegevens en laat gevoelige dossiers bij de bron staan.",
];

/** Compacte Engelse kern, voor Engelstalige vragen over dezelfde onderwerpen. */
export const KB_EN: QA[] = [
  {
    q: "What is nativ?",
    a: "nativ is a Dutch company that builds a Company Brain with AI workflows for small and medium-sized businesses. The Company Brain is one central knowledge layer holding what a company knows; AI workflows run on top of it and take over recurring work in marketing, sales, finance and HR. Its website is gonativ.nl.",
  },
  {
    q: "What is a Company Brain?",
    a: "A Company Brain is the central knowledge layer of a business: one place where what the company knows comes together, ready for AI to work with. It is not a tool but the foundation AI workflows run on. It addresses the real reason enterprise AI fails, which is missing context rather than a weak model.",
  },
  {
    q: "What is context engineering for enterprise AI?",
    a: "Context engineering is the practice of structuring and serving the right company context so AI systems produce work that is correct for that specific business. nativ builds that context layer as a Company Brain, starting from the Minimum Viable Context (MVC™): the structured twenty percent of company context that covers roughly eighty percent of AI tasks.",
  },
  {
    q: "What is Minimum Viable Context (MVC)?",
    a: "Minimum Viable Context, or MVC™, is nativ's framework for the smallest amount of structured company context that lets AI deliver useful work. In practice it is the structured twenty percent of a company's context that covers about eighty percent of its AI tasks, so a company can start without documenting everything first.",
  },
  {
    q: "How is nativ different from ChatGPT or Microsoft Copilot?",
    a: "A project in ChatGPT or Copilot is a single container where nobody knows who added what, whether it is correct, how it is maintained or who may see it. A Company Brain is the opposite: every fact has an origin, an owner, maintenance and access rights. nativ is model-independent and connects to the customer's own AI, such as Claude or ChatGPT.",
  },
  {
    q: "Where does nativ host its data?",
    a: "nativ stores and processes all data inside the European Union, on AWS in Stockholm. Customer data is never used to train AI models and is never sold on. The knowledge in a Company Brain belongs to the customer.",
  },
  {
    q: "What does nativ cost?",
    a: "The Company Brain costs 1,495 euro per month, the same amount for every company, with no setup fee and one month's notice. AI workflows cost 25 to 245 euro per month per workflow. Connecting an existing CRM is a one-off 495 euro. The AI scan is free.",
  },
];

/** Alle vragen plat, voor FAQPage-schema en de markdown-uitvoer. */
export function allQA(): QA[] {
  return KB_SECTIONS.flatMap((s) => s.items);
}
