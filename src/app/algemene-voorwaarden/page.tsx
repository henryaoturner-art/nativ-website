"use client";

import FadeIn from "@/components/FadeIn";

type Clause = { num: string; text: string };
type Article = { n: number; title: string; intro?: string; clauses: Clause[] };

const VERSIE = "Versie 0.3 · 6 juli 2026";

const articles: Article[] = [
  {
    n: 1,
    title: "Definities",
    intro:
      "In deze algemene voorwaarden en de daarop gebaseerde overeenkomst worden de volgende met een hoofdletter geschreven termen als volgt gedefinieerd (in enkel- en meervoud):",
    clauses: [
      { num: "1.1", text: "Nativ: Nativ B.V., statutair gevestigd te Hilversum." },
      { num: "1.2", text: "Klant: de rechtspersoon of onderneming die met Nativ een Overeenkomst aangaat of aan wie Nativ een aanbieding doet. Deze voorwaarden zijn uitsluitend bestemd voor gebruik in een B2B-context; Nativ contracteert niet met consumenten." },
      { num: "1.3", text: "Overeenkomst: de tussen Nativ en Klant gesloten overeenkomst tot levering van de Dienst, inclusief het aanbod/de opdrachtbevestiging, deze algemene voorwaarden en alle bijlagen." },
      { num: "1.4", text: "Dienst (ook: SaaS-dienst): de door Nativ via internet als clouddienst beschikbaar gestelde functionaliteit, waaronder het Platform en de daarop draaiende digitale collega('s), zoals nader omschreven in de Overeenkomst." },
      { num: "1.5", text: "Platform: de programmatuur, gebruikersinterface, onderliggende modellen, algoritmen, prompts, system-instructies, prompt-templates en configuratie, de MVC-methodiek en de semantische zoek-/vectorlaag, waarmee de Dienst wordt geleverd." },
      { num: "1.6", text: "Gebruiker: een door Klant geautoriseerde natuurlijke persoon (medewerker of ingehuurde kracht) die namens Klant van de Dienst gebruikmaakt." },
      { num: "1.7", text: "Company Brain: de in de database (PostgreSQL) van Klant vastgelegde kennis en brongegevens van Klant, zoals nader geregeld in artikel 9." },
      { num: "1.8", text: "Klantgegevens: alle gegevens, bestanden en content die Klant of diens Gebruikers in het kader van de Dienst invoeren, uploaden of laten verwerken, waaronder de Company Brain." },
      { num: "1.9", text: "Gebruiksgegevens: geaggregeerde en/of geanonimiseerde gegevens over het gebruik en de werking van de Dienst die niet herleidbaar zijn tot Klant, een Gebruiker of een identificeerbare natuurlijke persoon." },
      { num: "1.10", text: "Persoonsgegevens, Verwerken, Verwerkingsverantwoordelijke, Verwerker en Betrokkene: de begrippen zoals gedefinieerd in de Algemene Verordening Gegevensbescherming (AVG / Verordening (EU) 2016/679)." },
      { num: "1.11", text: "Documentatie: de door Nativ verstrekte gebruikers- en functionele documentatie bij de Dienst." },
      { num: "1.12", text: "Overmacht: elke van de wil van een partij onafhankelijke omstandigheid als bedoeld in artikel 14." },
      { num: "1.13", text: "Schriftelijk: per brief of per e-mail; berichten via de in de Dienst aangeboden kanalen worden hiermee gelijkgesteld voor zover herleidbaar tot de afzender." },
    ],
  },
  {
    n: 2,
    title: "Toepasselijkheid & rangorde",
    clauses: [
      { num: "2.1", text: "Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, Overeenkomsten en (rechts)handelingen tussen Nativ en Klant met betrekking tot de Dienst." },
      { num: "2.2", text: "De toepasselijkheid van eventuele inkoop- of andere (algemene) voorwaarden van Klant wordt uitdrukkelijk van de hand gewezen." },
      { num: "2.3", text: "Afwijkingen van en aanvullingen op deze voorwaarden gelden uitsluitend indien deze schriftelijk tussen partijen zijn overeengekomen." },
      { num: "2.4", text: "Bij strijdigheid tussen de onderdelen van de Overeenkomst geldt de volgende rangorde, waarbij het hoger genoemde document voorgaat: (a) de Overeenkomst/opdrachtbevestiging; (b) de bijlagen (waaronder de Verwerkersovereenkomst en de SLA); (c) deze algemene voorwaarden. De Verwerkersovereenkomst gaat echter voor op de overige documenten voor zover het de verwerking van Persoonsgegevens betreft." },
      { num: "2.5", text: "Indien een bepaling van deze voorwaarden nietig of vernietigbaar is, blijven de overige bepalingen onverkort van kracht; zie artikel 17." },
    ],
  },
  {
    n: 3,
    title: "Aanbod & totstandkoming van de overeenkomst",
    clauses: [
      { num: "3.1", text: "Alle aanbiedingen en offertes van Nativ zijn vrijblijvend, tenzij daarin uitdrukkelijk een termijn voor aanvaarding is opgenomen. Een offerte is geldig gedurende dertig (30) dagen na dagtekening, tenzij anders vermeld." },
      { num: "3.2", text: "De Overeenkomst komt tot stand op het moment dat Klant een aanbod van Nativ schriftelijk aanvaardt, dan wel op het moment dat Nativ een schriftelijke opdracht van Klant schriftelijk bevestigt, dan wel op het moment dat Nativ met de uitvoering aanvangt, al naargelang wat zich het eerst voordoet." },
      { num: "3.3", text: "Kennelijke vergissingen of verschrijvingen in een aanbod binden Nativ niet." },
      { num: "3.4", text: "Nativ mag de personen controleren die namens Klant handelen op hun bevoegdheid; Klant staat ervoor in dat degene die de Overeenkomst aangaat daartoe bevoegd is." },
    ],
  },
  {
    n: 4,
    title: "De SaaS-dienst & uitvoering",
    clauses: [
      { num: "4.1", text: "Nativ levert de Dienst als clouddienst: de Dienst wordt door Nativ centraal gehost en via internet aan Klant ter beschikking gesteld. Klant is zelf verantwoordelijk voor de daarvoor benodigde internetverbinding, apparatuur en randvoorwaarden aan zijn zijde." },
      { num: "4.2", text: "Nativ spant zich in de Dienst met zorg en naar beste kunnen uit te voeren (inspanningsverbintenis). Nativ garandeert niet dat de Dienst te allen tijde en zonder onderbrekingen, storingen of fouten beschikbaar is, noch dat de uitkomsten van de Dienst in elk geval juist, volledig of geschikt zijn voor een specifiek doel." },
      { num: "4.3", text: "De Dienst maakt gebruik van generatieve AI-technologie. Klant is ermee bekend dat uitkomsten (output) statistisch tot stand komen, onjuistheden kunnen bevatten en per keer kunnen verschillen. Klant beoordeelt de output vóór gebruik en neemt geen besluiten met een rechtsgevolg of aanmerkelijk gevolg voor personen uitsluitend op basis van geautomatiseerde output zonder betekenisvolle menselijke tussenkomst." },
      { num: "4.4", text: "Nativ mag bij de uitvoering derden (waaronder hosting- en model-leveranciers) inschakelen. Nativ blijft jegens Klant verantwoordelijk voor de nakoming van de Overeenkomst." },
      { num: "4.5", text: "Nativ mag de Dienst van tijd tot tijd doorontwikkelen, verbeteren en aanpassen; artikel 15 is van toepassing op wijzigingen die de functionaliteit wezenlijk beperken." },
      { num: "4.6", text: "Klant verleent Nativ tijdig de medewerking, informatie en toegang die redelijkerwijs nodig zijn voor de uitvoering, waaronder het aanleveren van de bronnen voor de Company Brain. Vertraging of onjuistheid aan de zijde van Klant komt voor rekening en risico van Klant." },
    ],
  },
  {
    n: 5,
    title: "Gebruiksrecht & gebruiksbeperkingen",
    clauses: [
      { num: "5.1", text: "Nativ verleent Klant voor de duur van de Overeenkomst een niet-exclusief, niet-overdraagbaar en niet-sublicentieerbaar recht om de Dienst te gebruiken voor de eigen bedrijfsvoering van Klant, binnen de in de Overeenkomst overeengekomen omvang." },
      { num: "5.2", text: "Klant staat in voor het gebruik van de Dienst door zijn Gebruikers en is verantwoordelijk voor het geheimhouden van inloggegevens. Misbruik of ongeautoriseerd gebruik via de account van Klant komt voor rekening van Klant." },
      { num: "5.3", text: "Het is Klant niet toegestaan de Dienst te gebruiken (a) in strijd met toepasselijke wet- en regelgeving; (b) op een wijze die de Dienst of derden schaadt, hindert of overbelast; (c) voor het invoeren of verspreiden van onrechtmatige, inbreukmakende of schadelijke content; of (d) om de Dienst aan derden ter beschikking te stellen buiten de eigen organisatie van Klant, tenzij schriftelijk anders overeengekomen." },
      { num: "5.4", text: "De in artikel 9 opgenomen beperkingen (waaronder het verbod op reverse engineering, model-extractie en concurrerend gebruik) maken onlosmakelijk deel uit van dit artikel." },
      { num: "5.5", text: "Nativ mag bij een redelijk vermoeden van een ernstige overtreding van dit artikel of artikel 9 de toegang tot (een deel van) de Dienst tijdelijk opschorten, na Klant zo mogelijk vooraf te hebben gewaarschuwd. Opschorting laat de betalingsverplichting van Klant onverlet." },
    ],
  },
  {
    n: 6,
    title: "Beschikbaarheid, onderhoud & service levels",
    clauses: [
      { num: "6.1", text: "Nativ streeft naar een beschikbaarheid van de Dienst van 99,5% per kalendermaand, gemeten op de wijze en met de uitzonderingen zoals opgenomen in de Service Level Agreement. Dit betreft een inspanningsverbintenis." },
      { num: "6.2", text: "Bij de berekening van beschikbaarheid tellen niet mee: (a) gepland onderhoud; (b) onbeschikbaarheid door Overmacht; (c) onbeschikbaarheid door toedoen van Klant, diens Gebruikers of derden aan de zijde van Klant; en (d) onbeschikbaarheid van door Klant voorgeschreven of ingeschakelde derde-diensten." },
      { num: "6.3", text: "Nativ mag onderhoud uitvoeren. Gepland onderhoud dat de beschikbaarheid merkbaar kan beïnvloeden wordt zo veel mogelijk buiten kantooruren uitgevoerd en, waar redelijk mogelijk, vooraf aangekondigd. Spoedeisend onderhoud mag Nativ te allen tijde en zonder voorafgaande aankondiging uitvoeren." },
      { num: "6.4", text: "Support wordt verleend zoals nader omschreven in de Service Level Agreement. Supportvragen worden ingediend via het door Nativ aangewezen kanaal." },
    ],
  },
  {
    n: 7,
    title: "Prijzen, facturatie & betaling",
    clauses: [
      { num: "7.1", text: "De door Klant verschuldigde vergoedingen zijn opgenomen in de Overeenkomst. Alle bedragen zijn in euro's en exclusief btw en eventuele andere van overheidswege opgelegde heffingen, tenzij uitdrukkelijk anders vermeld." },
      { num: "7.2", text: "Tenzij anders overeengekomen worden terugkerende (abonnements)vergoedingen vooraf gefactureerd per de overeengekomen periode; eenmalige vergoedingen (zoals implementatie- of intakekosten) worden gefactureerd bij aanvang." },
      { num: "7.3", text: "Facturen worden voldaan binnen 14 dagen na factuurdatum, zonder opschorting, korting of verrekening." },
      { num: "7.4", text: "Bij niet-tijdige betaling is Klant van rechtswege in verzuim en is Klant de wettelijke handelsrente (art. 6:119a BW) verschuldigd, alsmede de redelijke buitengerechtelijke incassokosten. Nativ mag in dat geval de Dienst na schriftelijke aanmaning opschorten." },
      { num: "7.5", text: "Nativ mag de vergoedingen jaarlijks aanpassen conform de wijziging van de consumentenprijsindex (CPI, alle huishoudens) van het CBS. Overige prijswijzigingen kondigt Nativ ten minste dertig (30) dagen van tevoren schriftelijk aan; leidt een dergelijke wijziging tot een verhoging van meer dan de indexatie, dan mag Klant de Overeenkomst tegen de ingangsdatum van de wijziging schriftelijk opzeggen." },
      { num: "7.6", text: "Klachten over een factuur schorten de betalingsverplichting niet op en moeten binnen de betaaltermijn schriftelijk en gemotiveerd worden ingediend." },
    ],
  },
  {
    n: 8,
    title: "Looptijd, verlenging & opzegging",
    clauses: [
      { num: "8.1", text: "De Overeenkomst gaat in op de overeengekomen ingangsdatum en wordt aangegaan voor een initiële termijn van 3 maanden, tenzij in de Overeenkomst anders is bepaald." },
      { num: "8.2", text: "Na afloop van de initiële termijn loopt de Overeenkomst voor onbepaalde tijd door en is deze door elke partij maandelijks opzegbaar met inachtneming van een opzegtermijn van 1 maand. Opzegging geschiedt schriftelijk en kan plaatsvinden tegen het einde van de initiële termijn en daarna tegen het einde van elke kalendermaand. Gedurende de initiële termijn is tussentijdse opzegging niet mogelijk, onverminderd artikel 8.3." },
      { num: "8.3", text: "Elke partij mag de Overeenkomst met onmiddellijke ingang schriftelijk (geheel of gedeeltelijk) ontbinden indien: (a) de andere partij toerekenbaar tekortschiet in een wezenlijke verplichting en dit tekortschieten, voor zover nakoming niet blijvend onmogelijk is, niet binnen dertig (30) dagen na schriftelijke ingebrekestelling herstelt; of (b) de andere partij in staat van faillissement wordt verklaard, surseance van betaling aanvraagt of verkrijgt, of zijn onderneming staakt." },
      { num: "8.4", text: "Nativ mag de Overeenkomst voorts opschorten of ontbinden bij een ernstige of herhaalde overtreding van artikel 5 of artikel 9." },
      { num: "8.5", text: "Bij het einde van de Overeenkomst, ongeacht de oorzaak, geldt met betrekking tot de Company Brain en de data-export het bepaalde in artikel 9.3. Na afloop van de daar genoemde exporttermijn is Nativ gerechtigd de Klantgegevens te verwijderen, behoudens een op Nativ rustende wettelijke bewaarplicht en het bepaalde in de Verwerkersovereenkomst." },
      { num: "8.6", text: "Verplichtingen die naar hun aard bestemd zijn om na het einde van de Overeenkomst voort te duren (waaronder artikel 9, artikel 12 en artikel 13) blijven van kracht." },
    ],
  },
  {
    n: 9,
    title: "Intellectueel eigendom, eigendom van de Company Brain en reverse engineering",
    clauses: [
      { num: "9.1", text: "Het Nativ-platform (waaronder de programmatuur, de gebruikersinterface, de SaaS-dienst, de onderliggende modellen, algoritmen, prompts, system-instructies, prompt-templates en configuratie, de MVC-methodiek, én de semantische zoek-/vectorlaag en alle daarvan afgeleide indexen) en alle daarin belichaamde kennis blijven het exclusieve eigendom van Nativ B.V. Klant verkrijgt hierop uitsluitend een niet-exclusief, niet-overdraagbaar gebruiksrecht voor de duur van de overeenkomst." },
      { num: "9.2", text: "De Company Brain van Klant, de in de database (PostgreSQL) vastgelegde kennis en brongegevens van Klant, is en blijft eigendom van Klant. Nativ host en beheert deze gedurende de looptijd van de overeenkomst ten behoeve van Klant. De semantische zoek-/vectorlaag die Nativ over deze gegevens aanbrengt om ze doorzoekbaar en bruikbaar te maken, maakt deel uit van het platform (artikel 9.1) en valt niet onder dit eigendom van Klant." },
      { num: "9.3", text: "Bij beëindiging van de overeenkomst behoudt Klant zijn Company Brain. Nativ stelt Klant binnen dertig (30) dagen na beëindiging een export ter beschikking van de kennis en brongegevens uit de database (PostgreSQL), in een gangbaar en herbruikbaar formaat, vergezeld van een referentie naar het gebruikte embedding-model (naam, versie en de relevante configuratie) zodat Klant de gegevens desgewenst zelf opnieuw doorzoekbaar kan maken. Deze overdracht betreft uitsluitend de brongegevens van Klant; het platform, de gebruikersinterface, de onderliggende programmatuur, de methodiek en de semantische zoek-/vectorlaag (artikel 9.1) zijn hiervan uitdrukkelijk uitgezonderd en blijven eigendom van Nativ." },
      { num: "9.4", text: "Onverminderd het eigendom van Klant op zijn eigen Company Brain (artikel 9.2), is het Klant niet toegestaan het platform of enig onderdeel daarvan geheel of gedeeltelijk te kopiëren, te verveelvoudigen, te wijzigen, te vertalen, te decompileren, te disassembleren of daarop reverse-engineering toe te passen, dan wel de broncode, modellen, gewichten, algoritmen, prompts of system-instructies daarvan op andere wijze te achterhalen, te reconstrueren of te extraheren (waaronder begrepen model-extractie- of -distillatietechnieken), noch pogingen daartoe te ondernemen." },
      { num: "9.5", text: "Het is Klant niet toegestaan de uitvoer (output) van de dienst, of een bewerkte versie daarvan, te gebruiken om de dienst te reverse-engineeren, om de onderliggende prompts of methodiek te reconstrueren, of om een concurrerend product, model of dienst te ontwikkelen of te trainen." },
      { num: "9.6", text: "Het is Klant niet toegestaan het platform te gebruiken om een product of dienst te ontwikkelen die met het Nativ-platform concurreert, om de kenmerken, functies of werking ervan na te bouwen, of om derden daarbij te ondersteunen." },
      { num: "9.7", text: "Het is Klant niet toegestaan geautomatiseerde middelen (zoals robots, crawlers, scrapers of scripts) te gebruiken om gegevens uit de dienst te onttrekken, anders dan via de daarvoor door Nativ aangeboden interfaces (API's). Dit laat het recht van Klant op export van zijn eigen Company Brain (artikel 9.3) onverlet." },
      { num: "9.8", text: "Klant maakt geen benchmark-, prestatie- of beschikbaarheidsresultaten van de dienst openbaar zonder voorafgaande schriftelijke toestemming van Nativ." },
      { num: "9.9", text: "De verboden in dit artikel gelden niet, en kunnen niet worden ingeroepen, voor zover (en uitsluitend voor zover) dwingend recht, in het bijzonder de artikelen 45j en 45m van de Auteurswet en de artikelen 5 en 6 van Richtlijn 2009/24/EG (de Softwarerichtlijn), deze handelingen uitdrukkelijk toestaat ondanks deze beperking. Een beding dat in strijd is met die dwingendrechtelijke bevoegdheden is in zoverre nietig; de overige bepalingen van dit artikel blijven onverkort van kracht." },
      { num: "9.10", text: "Voor zover Klant op grond van het in artikel 9.9 bedoelde dwingend recht gerechtigd is tot decompilatie ten behoeve van interoperabiliteit of tot het verbeteren van fouten, stelt Klant Nativ hiervan eerst schriftelijk in kennis en gunt Nativ een redelijke termijn om de benodigde informatie of een passende oplossing zelf te verstrekken. De aldus verkregen informatie gebruikt Klant uitsluitend voor het wettelijk toegestane doel, verstrekt deze niet aan derden, en gebruikt deze niet voor de ontwikkeling van programmatuur met een in wezen gelijke uitdrukkingsvorm." },
      { num: "9.11", text: "Het platform en de daarin belichaamde programmatuur, modellen, prompts, methodiek en semantische zoek-/vectorlaag (artikel 9.1) vormen bedrijfsgeheimen van Nativ B.V. in de zin van de Wet bescherming bedrijfsgeheimen. De Company Brain en brongegevens van Klant (artikel 9.2) vallen hier uitdrukkelijk niet onder. Niets in dit artikel beperkt de bescherming die Nativ op grond van die wet, het auteursrecht of enig ander recht toekomt." },
    ],
  },
  {
    n: 10,
    title: "Gegevens, privacy/AVG & Verwerkersovereenkomst",
    clauses: [
      { num: "10.1", text: "Klant is ten aanzien van de Persoonsgegevens die in het kader van de Dienst worden verwerkt de Verwerkingsverantwoordelijke; Nativ handelt daarbij als Verwerker in opdracht van Klant." },
      { num: "10.2", text: "De verwerking van Persoonsgegevens door Nativ is nader geregeld in de Verwerkersovereenkomst, die voldoet aan de eisen van artikel 28 AVG. Bij strijdigheid met deze voorwaarden gaat de Verwerkersovereenkomst voor op het punt van de verwerking van Persoonsgegevens." },
      { num: "10.3", text: "Klant staat ervoor in dat hij gerechtigd is de Klantgegevens (waaronder Persoonsgegevens) aan Nativ te verstrekken en te laten verwerken, en dat daarvoor een rechtsgrond bestaat. Klant vrijwaart Nativ voor aanspraken van derden die verband houden met een gebrek aan een rechtsgrond of met de inhoud van de Klantgegevens." },
      { num: "10.4", text: "Nativ verwerkt de Persoonsgegevens uitsluitend voor de uitvoering van de Overeenkomst en volgens de schriftelijke instructies van Klant, behoudens afwijkende wettelijke verplichtingen." },
      { num: "10.5", text: "Nativ mag Gebruiksgegevens (geaggregeerd en/of geanonimiseerd, niet herleidbaar tot Klant of een persoon) gebruiken voor het beheren, beveiligen, analyseren en verbeteren van de Dienst." },
      { num: "10.6", text: "Nativ zet voor de Dienst subverwerkers in zoals opgenomen in de Verwerkersovereenkomst; wijzigingen daarin worden geregeld conform die overeenkomst." },
    ],
  },
  {
    n: 11,
    title: "Beveiliging",
    clauses: [
      { num: "11.1", text: "Nativ treft passende technische en organisatorische maatregelen om de Dienst en de Klantgegevens te beschermen tegen verlies en tegen onrechtmatige verwerking, rekening houdend met de stand van de techniek, de uitvoeringskosten en de aard van de gegevens." },
      { num: "11.2", text: "Nativ informeert Klant zonder onredelijke vertraging na kennisname van een inbreuk in verband met Persoonsgegevens (datalek) die Klantgegevens betreft, en verleent redelijke medewerking bij de eventueel op Klant rustende meldplicht jegens de Autoriteit Persoonsgegevens en Betrokkenen." },
      { num: "11.3", text: "Klant is verantwoordelijk voor de beveiliging aan zijn zijde, waaronder een deugdelijk beheer van accounts, autorisaties en apparatuur van Gebruikers." },
    ],
  },
  {
    n: 12,
    title: "Geheimhouding",
    clauses: [
      { num: "12.1", text: "Partijen houden alle vertrouwelijke informatie die zij van elkaar ontvangen geheim en gebruiken deze uitsluitend voor de uitvoering van de Overeenkomst. Als vertrouwelijk geldt informatie die als zodanig is aangemerkt of waarvan het vertrouwelijke karakter redelijkerwijs kenbaar is, waaronder in elk geval het Platform en de bedrijfsgeheimen van Nativ (artikel 9.11) en de Klantgegevens." },
      { num: "12.2", text: "De geheimhoudingsplicht geldt niet voor informatie die (a) reeds rechtmatig bij de ontvangende partij bekend was, (b) zonder schending van deze verplichting openbaar is of wordt, (c) zelfstandig door de ontvangende partij is ontwikkeld, of (d) op grond van een wettelijke plicht of rechterlijk bevel moet worden verstrekt, in welk geval de ontvangende partij de andere partij zo mogelijk vooraf informeert." },
      { num: "12.3", text: "Partijen leggen deze verplichting op aan hun medewerkers en ingeschakelde derden." },
      { num: "12.4", text: "Deze verplichting blijft van kracht gedurende de looptijd van de Overeenkomst en drie (3) jaar daarna; voor bedrijfsgeheimen geldt zij zolang de informatie dat karakter behoudt." },
      { num: "12.5", text: "Nativ mag de naam en het logo van Klant vermelden als referentie op zijn website en in commerciële uitingen uitsluitend na voorafgaande schriftelijke toestemming van Klant." },
    ],
  },
  {
    n: 13,
    title: "Aansprakelijkheid & vrijwaring",
    clauses: [
      { num: "13.1", text: "De aansprakelijkheid van Nativ voor een toerekenbare tekortkoming of onrechtmatige daad is beperkt tot vergoeding van directe schade." },
      { num: "13.2", text: "De totale aansprakelijkheid van Nativ is per gebeurtenis (waarbij een reeks samenhangende gebeurtenissen als één gebeurtenis geldt) en over de gehele looptijd beperkt tot het bedrag van de vergoedingen (exclusief btw) die Klant in de twaalf (12) maanden voorafgaand aan de schadeveroorzakende gebeurtenis uit hoofde van de Overeenkomst aan Nativ heeft betaald." },
      { num: "13.3", text: "Onder directe schade wordt uitsluitend verstaan: (a) redelijke kosten ter vaststelling van de oorzaak en omvang van de schade; (b) redelijke kosten om de prestatie aan de Overeenkomst te laten beantwoorden; en (c) redelijke kosten ter voorkoming of beperking van schade." },
      { num: "13.4", text: "Nativ is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen, verlies of onjuistheid van gegevens, reputatieschade en schade door bedrijfsstagnatie. Nativ is evenmin aansprakelijk voor schade die het gevolg is van beslissingen die Klant neemt op basis van de output van de Dienst (artikel 4.3)." },
      { num: "13.5", text: "De beperkingen in dit artikel gelden niet voor zover de schade het gevolg is van opzet of bewuste roekeloosheid van Nativ of haar bedrijfsleiding, of voor zover dwingend recht aan beperking in de weg staat." },
      { num: "13.6", text: "Voorwaarde voor het ontstaan van enig recht op schadevergoeding is dat Klant de schade zo spoedig mogelijk, doch uiterlijk binnen dertig (30) dagen na ontdekking, schriftelijk bij Nativ meldt. Elke vordering vervalt in elk geval na verloop van twaalf (12) maanden na de schadeveroorzakende gebeurtenis." },
      { num: "13.7", text: "Klant vrijwaart Nativ voor aanspraken van derden die verband houden met (a) de Klantgegevens of de inhoud daarvan, (b) het gebruik van de Dienst door Klant of diens Gebruikers in strijd met de Overeenkomst of de wet, of (c) een schending van artikel 9 door Klant." },
    ],
  },
  {
    n: 14,
    title: "Overmacht",
    clauses: [
      { num: "14.1", text: "Geen van partijen is gehouden tot nakoming van een verplichting indien zij daartoe verhinderd is door Overmacht. Onder Overmacht wordt verstaan elke van de wil van de betrokken partij onafhankelijke omstandigheid waardoor nakoming redelijkerwijs niet kan worden gevergd, waaronder (voor zover van toepassing) storingen in internet, telecommunicatie, hosting of energievoorziening, cyberaanvallen, tekortkomingen van toeleveranciers of onderaannemers, overheidsmaatregelen, epidemieën en werkstakingen." },
      { num: "14.2", text: "Duurt de Overmacht langer dan zestig (60) dagen, dan mag elke partij de Overeenkomst schriftelijk ontbinden, zonder dat daardoor een verplichting tot schadevergoeding ontstaat. Reeds geleverde prestaties worden naar rato afgerekend." },
    ],
  },
  {
    n: 15,
    title: "Wijziging van de voorwaarden en de dienst",
    clauses: [
      { num: "15.1", text: "Nativ mag deze algemene voorwaarden en de Dienst wijzigen. Wijzigingen van ondergeschikt belang of wijzigingen die noodzakelijk zijn op grond van wet- of regelgeving, of ter bescherming van de veiligheid van de Dienst, mag Nativ zonder nadere aankondiging doorvoeren." },
      { num: "15.2", text: "Overige wijzigingen die de rechten of verplichtingen van Klant of de kernfunctionaliteit van de Dienst wezenlijk en nadelig beïnvloeden, kondigt Nativ ten minste dertig (30) dagen vóór de ingangsdatum schriftelijk aan." },
      { num: "15.3", text: "Is Klant het niet eens met een wijziging als bedoeld in artikel 15.2, dan mag Klant de Overeenkomst schriftelijk opzeggen tegen de datum waarop de wijziging ingaat. Blijft Klant na de ingangsdatum gebruikmaken van de Dienst, dan geldt de wijziging als aanvaard." },
      { num: "15.4", text: "Dit artikel doet geen afbreuk aan de prijswijzigingsregeling van artikel 7.5." },
    ],
  },
  {
    n: 16,
    title: "Toepasselijk recht & geschillen",
    clauses: [
      { num: "16.1", text: "Op de Overeenkomst en deze voorwaarden is uitsluitend Nederlands recht van toepassing." },
      { num: "16.2", text: "De toepasselijkheid van het Weens Koopverdrag (CISG) is uitgesloten." },
      { num: "16.3", text: "Geschillen die voortvloeien uit of samenhangen met de Overeenkomst worden bij uitsluiting voorgelegd aan de bevoegde rechter van de rechtbank Midden-Nederland, onverminderd het recht van Nativ om Klant te dagvaarden voor de volgens de wet bevoegde rechter." },
      { num: "16.4", text: "Partijen spannen zich in om een geschil eerst in onderling overleg op te lossen voordat zij het aan de rechter voorleggen." },
    ],
  },
  {
    n: 17,
    title: "Slotbepalingen",
    clauses: [
      { num: "17.1", text: "Nietigheid / conversie. Is een bepaling van deze voorwaarden nietig of vernietigbaar, dan blijven de overige bepalingen van kracht en treden partijen in overleg om de betreffende bepaling te vervangen door een geldige bepaling die de strekking daarvan zo veel mogelijk benadert." },
      { num: "17.2", text: "Overdracht. Klant mag zijn rechten en verplichtingen uit de Overeenkomst niet zonder voorafgaande schriftelijke toestemming van Nativ aan een derde overdragen. Nativ mag haar rechten en verplichtingen overdragen aan een groepsvennootschap of in het kader van een fusie, overname of overdracht van (een deel van) haar onderneming; Nativ stelt Klant hiervan op de hoogte." },
      { num: "17.3", text: "Volledige overeenkomst. De Overeenkomst (inclusief deze voorwaarden en de bijlagen) bevat de volledige afspraken tussen partijen over het onderwerp daarvan en treedt in de plaats van alle eerdere afspraken en mededelingen daarover." },
      { num: "17.4", text: "Kennisgevingen. Kennisgevingen geschieden schriftelijk aan de in de Overeenkomst opgenomen contactgegevens. Partijen informeren elkaar tijdig over wijzigingen daarvan." },
      { num: "17.5", text: "Geen afstand. Het niet of niet direct afdwingen van een recht door een partij houdt geen afstand van dat recht in." },
    ],
  },
];

export default function VoorwaardenPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Algemene Voorwaarden
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
          {articles.map((a) => (
            <FadeIn key={a.n}>
              <article className="mt-10 first:mt-0">
                <h2 className="font-serif text-2xl md:text-[28px] leading-tight text-grey">
                  {a.n}. {a.title}
                </h2>
                {a.intro && (
                  <p className="mt-4 text-grey/70 font-light leading-relaxed">{a.intro}</p>
                )}
                <div className="mt-4 space-y-3">
                  {a.clauses.map((cl) => (
                    <p key={cl.num} className="text-grey/70 font-light leading-relaxed">
                      <span className="text-sage font-normal tabular-nums mr-2">{cl.num}</span>
                      {cl.text}
                    </p>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}

          {/* Bijlage A: Verwerkersovereenkomst */}
          <FadeIn>
            <div className="mt-14 pt-10 border-t border-grey/10">
              <h2 className="font-serif text-2xl md:text-[28px] leading-tight text-grey">
                Bijlage A: Verwerkersovereenkomst (AVG art. 28)
              </h2>
              <p className="mt-4 text-grey/70 font-light leading-relaxed">
                Deze verwerkersovereenkomst maakt deel uit van de overeenkomst en regelt hoe
                Nativ (verwerker) persoonsgegevens verwerkt in opdracht van de klant
                (verwerkingsverantwoordelijke). Bij strijdigheid met de algemene voorwaarden
                gaat deze bijlage voor voor zover het de verwerking van persoonsgegevens betreft.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-normal text-grey">A.1 Rolverdeling en instructies</h3>
                  <div className="mt-2 space-y-3">
                    {[
                      "De klant is verwerkingsverantwoordelijke; Nativ is verwerker. Is de klant zelf verwerker voor een derde, dan staat de klant ervoor in dat hij bevoegd is Nativ als subverwerker in te schakelen.",
                      "Nativ verwerkt persoonsgegevens uitsluitend op basis van de gedocumenteerde instructies van de klant, tenzij een wettelijke verplichting anders vereist; in dat geval meldt Nativ dit vooraf, tenzij de wet dat verbiedt.",
                      "Nativ informeert de klant indien een instructie naar zijn oordeel in strijd is met de AVG of andere gegevensbeschermingswetgeving.",
                    ].map((t, i) => (
                      <p key={i} className="text-grey/70 font-light leading-relaxed">{t}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.2 Onderwerp, aard, doel en duur</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Het hosten en leveren van de dienst (Company Brain en digitale collega&rsquo;s):
                    het opslaan, structureren, doorzoekbaar maken van en het genereren van uitkomsten
                    op basis van de klantgegevens, ten behoeve van de bedrijfsvoering van de klant.
                    De verwerking duurt zolang de overeenkomst loopt, vermeerderd met de exporttermijn
                    en eventuele wettelijke bewaartermijnen.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.3 Categorieën betrokkenen en gegevens</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Betrokkenen en soorten gegevens worden bepaald door de klant, doorgaans
                    medewerkers, klanten, contactpersonen en relaties, en gegevens als naam- en
                    contactgegevens, functie/rol en de inhoud van aangeleverde documenten en kennis.
                    Bijzondere categorieën (art. 9 AVG, waaronder medische gegevens) en strafrechtelijke
                    gegevens worden niet ingevoerd, tenzij schriftelijk anders overeengekomen met
                    passende waarborgen. Nativ blijft bewust weg van medische en andere
                    hoog-gevoelige gegevens.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.4 Beveiliging (art. 32 AVG)</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ treft passende technische en organisatorische maatregelen, waaronder:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-grey/70 font-light leading-relaxed list-disc pl-5">
                    <li>hosting en verwerking uitsluitend binnen de Europese Unie (AWS, regio EU-North-1, Stockholm);</li>
                    <li>versleuteling van gegevens in transit (TLS/SSL) en at rest;</li>
                    <li>logische scheiding van klantdata tussen klanten (multi-tenant isolatie op databaseniveau);</li>
                    <li>toegang op basis van need-to-know, beperkt tot geautoriseerde teamleden;</li>
                    <li>klantdata wordt niet gebruikt om AI-modellen te trainen en niet aan derden verkocht;</li>
                    <li>dagelijkse, versleutelde back-ups met een bewaartermijn van 30 dagen en herstelprocedures.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.5 Geheimhouding</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    De personen die toegang hebben tot de persoonsgegevens zijn tot geheimhouding verplicht.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.6 Subverwerkers</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    De klant verleent Nativ algemene toestemming om subverwerkers in te schakelen.
                    De actuele subverwerkers zijn:
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-grey/20 text-grey">
                          <th className="py-2 pr-4 font-normal">Subverwerker</th>
                          <th className="py-2 pr-4 font-normal">Doel</th>
                          <th className="py-2 font-normal">Locatie</th>
                        </tr>
                      </thead>
                      <tbody className="text-grey/70 font-light">
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">Amazon Web Services (AWS)</td>
                          <td className="py-2 pr-4">hosting en infrastructuur</td>
                          <td className="py-2">EU (eu-north-1, Stockholm)</td>
                        </tr>
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">Anthropic (Claude)</td>
                          <td className="py-2 pr-4">genereren van uitkomsten (LLM)</td>
                          <td className="py-2">EU, of onder EU-modelcontractbepalingen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-grey/70 font-light leading-relaxed">
                    Nativ legt elke subverwerker ten minste dezelfde verplichtingen op en blijft
                    verantwoordelijk voor hun nakoming. Bij een voorgenomen wijziging informeert Nativ
                    de klant vooraf; de klant mag daartegen binnen dertig (30) dagen op redelijke, met
                    de gegevensbescherming samenhangende gronden bezwaar maken.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.7 Bijstand</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ verleent redelijke bijstand bij verzoeken van betrokkenen (inzage, rectificatie,
                    wissing, beperking, dataportabiliteit en bezwaar) en bij de verplichtingen van de klant
                    uit de artikelen 32 tot en met 36 AVG.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.8 Datalekken</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ meldt een inbreuk in verband met persoonsgegevens zonder onredelijke vertraging
                    na ontdekking aan de klant, en waar mogelijk binnen achtenveertig (48) uur, met de
                    beschikbare informatie. De melding aan de Autoriteit Persoonsgegevens en/of betrokkenen
                    doet de klant als verwerkingsverantwoordelijke.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.9 Doorgifte buiten de EER</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ geeft de persoonsgegevens niet door aan een land buiten de Europese Economische
                    Ruimte, tenzij op basis van een geldig doorgiftemechanisme (een adequaatheidsbesluit
                    of de EU-modelcontractbepalingen) en na voorafgaande kennisgeving aan de klant.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.10 Teruggave en verwijdering</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Bij het einde van de overeenkomst stelt Nativ de klantgegevens als export ter beschikking
                    (artikel 9.3). Daarna verwijdert Nativ de persoonsgegevens binnen 30 dagen na de
                    exporttermijn, behoudens een wettelijke bewaarplicht; op verzoek bevestigt Nativ de
                    verwijdering schriftelijk.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.11 Audit</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ stelt op verzoek de informatie ter beschikking die nodig is om naleving aan te
                    tonen en maakt audits mogelijk (ten hoogste eenmaal per jaar, redelijk aangekondigd,
                    vertrouwelijk en voor rekening van de klant), of verstrekt een onafhankelijk auditrapport.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">A.12 Aansprakelijkheid</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Op deze verwerkersovereenkomst is de aansprakelijkheidsregeling van artikel 13 van
                    toepassing, onverminderd dwingend recht.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Bijlage B — SLA */}
          <FadeIn>
            <div className="mt-14 pt-10 border-t border-grey/10">
              <h2 className="font-serif text-2xl md:text-[28px] leading-tight text-grey">
                Bijlage B: Service Level Agreement
              </h2>
              <p className="mt-4 text-grey/70 font-light leading-relaxed">
                Deze SLA maakt deel uit van de overeenkomst en beschrijft het serviceniveau van de dienst.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-normal text-grey">B.1 Beschikbaarheid</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Nativ streeft naar een beschikbaarheid van 99,5% per kalendermaand (inspanningsverbintenis).
                    Bij de berekening tellen niet mee: gepland onderhoud, overmacht, oorzaken aan de zijde van
                    de klant, diens gebruikers of derden, en onbeschikbaarheid van door de klant voorgeschreven
                    of ingeschakelde derde-diensten.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">B.2 Onderhoud</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Gepland onderhoud dat de beschikbaarheid merkbaar kan beïnvloeden voert Nativ zo veel
                    mogelijk buiten kantooruren uit en kondigt Nativ, waar redelijk mogelijk, ten minste
                    24 uur van tevoren aan. Spoedeisend onderhoud mag Nativ te allen tijde en zonder
                    voorafgaande aankondiging uitvoeren.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">B.3 Support</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Supportmeldingen worden gedaan via de supportfunctie in het platform. Openingstijden:
                    werkdagen van 09:00 tot 17:00 (CET), met uitzondering van Nederlandse feestdagen. De
                    reactietijd is de eerste inhoudelijke reactie, niet de oplostijd:
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-grey/20 text-grey">
                          <th className="py-2 pr-4 font-normal">Prioriteit</th>
                          <th className="py-2 pr-4 font-normal">Omschrijving</th>
                          <th className="py-2 font-normal">Reactietijd-streven</th>
                        </tr>
                      </thead>
                      <tbody className="text-grey/70 font-light">
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">P1: Kritiek</td>
                          <td className="py-2 pr-4">Dienst onbruikbaar voor alle gebruikers</td>
                          <td className="py-2">binnen 4 uur</td>
                        </tr>
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">P2: Hoog</td>
                          <td className="py-2 pr-4">Belangrijke functie ernstig verstoord, geen workaround</td>
                          <td className="py-2">1 werkdag</td>
                        </tr>
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">P3: Normaal</td>
                          <td className="py-2 pr-4">Beperkte verstoring of workaround beschikbaar</td>
                          <td className="py-2">3 werkdagen</td>
                        </tr>
                        <tr className="border-b border-grey/10">
                          <td className="py-2 pr-4">P4: Laag</td>
                          <td className="py-2 pr-4">Vraag, verzoek of cosmetisch punt</td>
                          <td className="py-2">5 werkdagen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-normal text-grey">B.4 Escalatie</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    Wordt een P1-melding niet binnen een redelijke termijn opgepakt, dan kan de klant
                    escaleren via het door Nativ aangewezen escalatiecontact.
                  </p>
                </div>

                <div>
                  <h3 className="font-normal text-grey">B.5 Servicecredits</h3>
                  <p className="mt-2 text-grey/70 font-light leading-relaxed">
                    In deze versie zijn aan het beschikbaarheidsstreven geen servicecredits of boetes verbonden.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <div className="mt-12 pt-8 border-t border-grey/10">
              <p className="text-grey/60 font-light leading-relaxed text-sm">
                Vragen over deze voorwaarden of de bijlagen? Mail{" "}
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
