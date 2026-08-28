"use client";

import FadeIn from "@/components/FadeIn";

type Clause = { num: string; text: string };
type Article = { n: number; title: string; intro?: string; clauses: Clause[] };

const VERSIE = "Versie 0.5 · 28 augustus 2026";

const articles: Article[] = [
  {
    n: 1,
    title: "Definities",
    intro:
      "In deze algemene voorwaarden en de daarop gebaseerde overeenkomst worden de volgende met een hoofdletter geschreven termen als volgt gedefinieerd (in enkel- en meervoud):",
    clauses: [
      { num: "1.1", text: "Nativ: Nativ B.V., statutair gevestigd te Haarlem, kantoorhoudende aan de Houtmarkt 19, 2011 AL Haarlem, ingeschreven in het handelsregister onder nummer 42125853, btw-nummer [btw-nummer]." },
      { num: "1.2", text: "Klant: de rechtspersoon of onderneming die met Nativ een Overeenkomst aangaat of aan wie Nativ een aanbieding doet. Deze voorwaarden zijn uitsluitend bestemd voor gebruik in een B2B-context; Nativ contracteert niet met consumenten." },
      { num: "1.3", text: "Overeenkomst: de tussen Nativ en Klant gesloten overeenkomst tot levering van de Dienst, inclusief het aanbod/de opdrachtbevestiging, deze algemene voorwaarden en alle bijlagen." },
      { num: "1.4", text: "Dienst (ook: SaaS-dienst): de door Nativ via internet als clouddienst (software-as-a-service) beschikbaar gestelde functionaliteit, waaronder het Platform, de Company Brain-omgeving en de daarop draaiende AI-workflows, zoals nader omschreven in de Overeenkomst." },
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
      { num: "2.4", text: "Bij strijdigheid tussen de onderdelen van de Overeenkomst geldt de volgende rangorde, waarbij het hoger genoemde document voorgaat: (a) de Overeenkomst/opdrachtbevestiging; (b) de bijlagen (waaronder de Verwerkersovereenkomst en de SLA); (c) deze algemene voorwaarden. De Verwerkersovereenkomst (Bijlage A) gaat echter voor op de overige documenten voor zover het de verwerking van Persoonsgegevens betreft." },
      { num: "2.5", text: "Indien een bepaling van deze voorwaarden nietig of vernietigbaar is, blijven de overige bepalingen onverkort van kracht; zie artikel 21." },
      { num: "2.6", text: "Stelt Nativ in het kader van de Dienst een product of dienst van een derde leverancier aan Klant ter beschikking, dan gelden voor dat onderdeel de licentie- of gebruiksvoorwaarden van die derde, mits Nativ die van toepassing heeft verklaard en Klant een redelijke mogelijkheid heeft gehad daarvan kennis te nemen. Bepalingen uit deze voorwaarden die daarvan afwijken, gelden voor dat onderdeel niet. Vervallen die voorwaarden van de derde, dan gelden deze voorwaarden onverkort." },
    ],
  },
  {
    n: 3,
    title: "Aanbod & totstandkoming van de overeenkomst",
    clauses: [
      { num: "3.1", text: "Alle aanbiedingen en offertes van Nativ zijn vrijblijvend, tenzij daarin uitdrukkelijk een termijn voor aanvaarding is opgenomen. Een offerte is geldig gedurende dertig (30) dagen na dagtekening, tenzij anders vermeld." },
      { num: "3.2", text: "De Overeenkomst komt tot stand op het moment dat Klant een aanbod van Nativ schriftelijk aanvaardt, dan wel op het moment dat Nativ een schriftelijke opdracht van Klant schriftelijk bevestigt, dan wel op het moment dat Nativ met de uitvoering aanvangt — al naargelang wat zich het eerst voordoet." },
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
      { num: "4.6", text: "Beschikbaarstelling en vulling. Nativ stelt de Company Brain-omgeving bij aanvang van de Overeenkomst voor Klant beschikbaar, gevuld met de standaard datapunten. De Dienst kent geen implementatietraject. Het verder vullen en actueel houden van de Company Brain is de verantwoordelijkheid van Klant. Nativ ondersteunt Klant daarbij met de in de Dienst opgenomen voorzieningen, documentatie en uitleg, maar neemt die taak niet over, tenzij partijen dat schriftelijk afzonderlijk overeenkomen (artikel 20)." },
      { num: "4.7", text: "Klant staat in voor de juistheid, volledigheid, actualiteit en representativiteit van de gegevens en bronnen die hij in de Company Brain opneemt of laat opnemen. De kwaliteit van de uitkomsten van de Dienst is rechtstreeks afhankelijk daarvan. Constateert Nativ een kenbare onjuistheid, dan meldt Nativ dat aan Klant." },
      { num: "4.8", text: "Klant verleent Nativ tijdig de medewerking, informatie en toegang die redelijkerwijs nodig zijn voor de uitvoering. Vertraging of onjuistheid aan de zijde van Klant komt voor rekening en risico van Klant." },
      { num: "4.9", text: "Wijkt Klant af van een advies of aanbeveling van Nativ, of zet Klant een wens of instructie door nadat Nativ schriftelijk heeft aangegeven dat deze ongeschikt, onrealistisch of technisch onuitvoerbaar is, dan is Nativ niet aansprakelijk voor de gevolgen daarvan, waaronder schade en extra werkzaamheden." },
      { num: "4.10", text: "Klant wijst voor de duur van de Overeenkomst een contactpersoon aan die bevoegd is namens Klant afspraken te maken, en informeert Nativ tijdig over een wijziging daarvan." },
      { num: "4.11", text: "Nativ voert geen dataconversie uit, tenzij dat schriftelijk uitdrukkelijk is overeengekomen." },
    ],
  },
  {
    n: 5,
    title: "Gebruiksrecht & gebruiksbeperkingen",
    clauses: [
      { num: "5.1", text: "Nativ verleent Klant voor de duur van de Overeenkomst een niet-exclusief, niet-overdraagbaar en niet-sublicentieerbaar recht om de Dienst te gebruiken voor de eigen bedrijfsvoering van Klant. Het aantal Gebruikers binnen de organisatie van Klant is niet beperkt. Aanvullende onderdelen die per stuk worden afgenomen, zoals AI-workflows, koppelingen en studies, gelden alleen voor zover die in de Overeenkomst zijn opgenomen (artikel 20)." },
      { num: "5.2", text: "Klant staat in voor het gebruik van de Dienst door zijn Gebruikers en is verantwoordelijk voor het geheimhouden van inloggegevens. Misbruik of ongeautoriseerd gebruik via de account van Klant komt voor rekening van Klant." },
      { num: "5.3", text: "Het is Klant niet toegestaan de Dienst te gebruiken (a) in strijd met toepasselijke wet- en regelgeving; (b) op een wijze die de Dienst of derden schaadt, hindert of overbelast; (c) voor het invoeren of verspreiden van onrechtmatige, inbreukmakende of schadelijke content; of (d) om de Dienst aan derden ter beschikking te stellen buiten de eigen organisatie van Klant, tenzij schriftelijk anders overeengekomen." },
      { num: "5.4", text: "De in artikel 9 opgenomen beperkingen (waaronder het verbod op reverse engineering, model-extractie en concurrerend gebruik) maken onlosmakelijk deel uit van dit artikel." },
      { num: "5.5", text: "Nativ mag bij een redelijk vermoeden van een ernstige overtreding van dit artikel of artikel 9 de toegang tot (een deel van) de Dienst tijdelijk opschorten, na Klant zo mogelijk vooraf te hebben gewaarschuwd. Opschorting laat de betalingsverplichting van Klant onverlet." },
      { num: "5.6", text: "Fair use op de opslag- en ingestiecapaciteit. Op het opnemen van gegevens in de Company Brain rust een fair-use-capaciteit, uitgedrukt als een absoluut volume voor de gehele organisatie van Klant en niet per Gebruiker. De geldende capaciteit en het tarief voor uitbreiding staan in de Overeenkomst. Overschrijdt Klant de capaciteit, dan informeert Nativ hem daarover en breidt Nativ de capaciteit uit tegen het in de Overeenkomst genoemde tarief, ingaand op de eerstvolgende factuurperiode. Nativ schort de Dienst wegens overschrijding niet op zonder Klant eerst een redelijke termijn te hebben geboden om te kiezen tussen uitbreiden of opschonen." },
      { num: "5.7", text: "Klant ontvangt geen broncode van het Platform en geen technische ontwikkeldocumentatie. Het gebruiksrecht strekt zich uitsluitend uit tot de aan Klant beschikbaar gestelde functionaliteit. Dit laat het recht op export van de Company Brain (artikel 9.3) onverlet." },
    ],
  },
  {
    n: 6,
    title: "Beschikbaarheid, onderhoud & service levels",
    clauses: [
      { num: "6.1", text: "Nativ streeft naar een beschikbaarheid van de Dienst van 99,5% [te bevestigen] per kalendermaand, gemeten op de wijze en met de uitzonderingen zoals opgenomen in Bijlage B (Service Level Agreement). Dit betreft een inspanningsverbintenis; aan het beschikbaarheidsstreven zijn in deze versie geen boetes of servicecredits verbonden [te bevestigen]." },
      { num: "6.2", text: "Bij de berekening van beschikbaarheid tellen niet mee: (a) gepland onderhoud; (b) onbeschikbaarheid door Overmacht; (c) onbeschikbaarheid door toedoen van Klant, diens Gebruikers of derden aan de zijde van Klant; en (d) onbeschikbaarheid van door Klant voorgeschreven of ingeschakelde derde-diensten." },
      { num: "6.3", text: "Nativ mag onderhoud uitvoeren. Gepland onderhoud dat de beschikbaarheid merkbaar kan beïnvloeden wordt zo veel mogelijk buiten kantooruren uitgevoerd en, waar redelijk mogelijk, vooraf aangekondigd. Spoedeisend onderhoud (bijvoorbeeld bij beveiligingsrisico's) mag Nativ te allen tijde en zonder voorafgaande aankondiging uitvoeren." },
      { num: "6.4", text: "Support wordt verleend zoals nader omschreven in Bijlage B. Supportvragen worden ingediend via het door Nativ aangewezen kanaal." },
      { num: "6.5", text: "Onder een fout wordt verstaan: het substantieel niet voldoen van de Dienst aan de door Nativ schriftelijk kenbaar gemaakte functionele of technische specificaties. Van een fout is alleen sprake als Klant deze kan aantonen en deze reproduceerbaar is. Klant meldt fouten onverwijld. Nativ spant zich in om fouten in de door Nativ zelf ontwikkelde programmatuur binnen een redelijke termijn te herstellen, en kan daarbij tijdelijke oplossingen of omwegen inzetten. Nativ staat er niet voor in dat fouten in programmatuur van derden worden verholpen. Nativ is niet gehouden tot herstel van andere onvolkomenheden dan fouten in de zin van dit artikel; is Nativ daartoe wel bereid, dan kan Nativ daarvoor een afzonderlijke vergoeding in rekening brengen." },
    ],
  },
  {
    n: 7,
    title: "Prijzen, facturatie & betaling",
    clauses: [
      { num: "7.1", text: "De door Klant verschuldigde vergoedingen zijn opgenomen in de Overeenkomst. Alle bedragen zijn in euro's en exclusief btw en eventuele andere van overheidswege opgelegde heffingen, tenzij uitdrukkelijk anders vermeld." },
      { num: "7.2", text: "Terugkerende (abonnements)vergoedingen worden per maand vooraf gefactureerd. Voor het in gebruik nemen van de Dienst brengt Nativ geen instap-, implementatie- of intakekosten in rekening. Een eenmalige vergoeding is uitsluitend verschuldigd voor afzonderlijk overeengekomen onderdelen, zoals een koppeling met een bestaand systeem van Klant of een maatwerkbouw (artikel 20); die wordt gefactureerd bij aanvang van dat onderdeel." },
      { num: "7.3", text: "Facturen worden voldaan binnen 14 dagen [te bevestigen] na factuurdatum, zonder opschorting, korting of verrekening." },
      { num: "7.4", text: "Bij niet-tijdige betaling is Klant van rechtswege in verzuim en is Klant de wettelijke handelsrente (art. 6:119a BW) verschuldigd, alsmede de redelijke buitengerechtelijke incassokosten. Nativ mag in dat geval de Dienst na schriftelijke aanmaning opschorten; artikel 5.5, laatste zin, is van overeenkomstige toepassing." },
      { num: "7.5", text: "Nativ mag de vergoedingen jaarlijks aanpassen conform de wijziging van de consumentenprijsindex (CPI, alle huishoudens) van het CBS [te bevestigen]. Overige prijswijzigingen kondigt Nativ ten minste dertig (30) dagen van tevoren schriftelijk aan; leidt een dergelijke wijziging tot een verhoging van meer dan de indexatie, dan mag Klant de Overeenkomst tegen de ingangsdatum van de wijziging schriftelijk opzeggen." },
      { num: "7.6", text: "Klachten over een factuur schorten de betalingsverplichting niet op en moeten binnen de betaaltermijn schriftelijk en gemotiveerd worden ingediend." },
      { num: "7.7", text: "Kosten van taalmodellen en externe API's. Klant gebruikt de Dienst met zijn eigen sleutel(s) bij de door hem gekozen modelleverancier. De kosten van het modelgebruik komen rechtstreeks ten laste van Klant bij die leverancier en lopen niet via Nativ. Nativ brengt daarop geen opslag of marge in rekening. Wijzigt de modelleverancier zijn tarieven, dan raakt dat de vergoeding aan Nativ niet. Maakt een AI-workflow gebruik van een externe API waarvan de kosten wél via Nativ lopen, dan is dat in de Overeenkomst voor die workflow benoemd en verwerkt in de daarvoor geldende vergoeding." },
      { num: "7.8", text: "Bestaat Klant uit meerdere (rechts)personen, dan is elk van hen hoofdelijk verbonden tot nakoming van de Overeenkomst." },
      { num: "7.9", text: "Voor de door Nativ verrichte prestaties en de daarvoor verschuldigde bedragen leveren de gegevens uit de administratie van Nativ volledig bewijs op, onverminderd het recht van Klant tot het leveren van tegenbewijs." },
    ],
  },
  {
    n: 8,
    title: "Looptijd, verlenging & opzegging",
    clauses: [
      { num: "8.1", text: "De Overeenkomst gaat in op de overeengekomen ingangsdatum en wordt aangegaan voor onbepaalde tijd. Er geldt geen minimale looptijd." },
      { num: "8.2", text: "De Overeenkomst is door elke partij maandelijks opzegbaar met inachtneming van een opzegtermijn van 1 maand. Opzegging geschiedt schriftelijk en kan plaatsvinden tegen het einde van elke kalendermaand. Voor afzonderlijk overeengekomen onderdelen met een eigen looptijd geldt wat daarover in de Overeenkomst is bepaald." },
      { num: "8.3", text: "Elke partij mag de Overeenkomst met onmiddellijke ingang schriftelijk (geheel of gedeeltelijk) ontbinden indien: (a) de andere partij toerekenbaar tekortschiet in een wezenlijke verplichting en dit tekortschieten, voor zover nakoming niet blijvend onmogelijk is, niet binnen dertig (30) dagen na schriftelijke ingebrekestelling herstelt; of (b) de andere partij in staat van faillissement wordt verklaard, surseance van betaling aanvraagt of verkrijgt, of zijn onderneming staakt." },
      { num: "8.4", text: "Nativ mag de Overeenkomst voorts opschorten of ontbinden bij een ernstige of herhaalde overtreding van artikel 5 of artikel 9, met inachtneming van artikel 5.5." },
      { num: "8.5", text: "Bij het einde van de Overeenkomst — ongeacht de oorzaak — geldt met betrekking tot de Company Brain en de data-export het bepaalde in artikel 9.3. Na afloop van de daar genoemde exporttermijn is Nativ gerechtigd de Klantgegevens te verwijderen, behoudens een op Nativ rustende wettelijke bewaarplicht en het bepaalde in Bijlage A." },
      { num: "8.6", text: "Heeft Klant op het moment van ontbinding al prestaties ter uitvoering van de Overeenkomst ontvangen, dan zijn die prestaties en de daarmee samenhangende betalingsverplichtingen geen voorwerp van ongedaanmaking, tenzij Klant bewijst dat Nativ ten aanzien van het wezenlijke deel van die prestaties in verzuim was. Bedragen die Nativ vóór de ontbinding heeft gefactureerd voor hetgeen zij naar behoren heeft geleverd, blijven verschuldigd en worden op het moment van ontbinding direct opeisbaar." },
      { num: "8.7", text: "Verplichtingen die naar hun aard bestemd zijn om na het einde van de Overeenkomst voort te duren (waaronder artikel 9, artikel 12 en artikel 13) blijven van kracht." },
    ],
  },
  {
    n: 9,
    title: "Intellectueel eigendom, eigendom van de Company Brain en reverse engineering",
    clauses: [
      { num: "9.1", text: "Het Nativ-platform — waaronder de programmatuur, de gebruikersinterface, de SaaS-dienst, de onderliggende modellen, algoritmen, prompts, system-instructies, prompt-templates en configuratie, de MVC-methodiek, én de semantische zoek-/vectorlaag en alle daarvan afgeleide indexen — en alle daarin belichaamde kennis blijven het exclusieve eigendom van Nativ B.V. Klant verkrijgt hierop uitsluitend een niet-exclusief, niet-overdraagbaar gebruiksrecht voor de duur van de overeenkomst." },
      { num: "9.2", text: "De Company Brain van Klant — de kennis en brongegevens van Klant zoals vastgelegd in de gestructureerde database (PostgreSQL) én in de daarop gebouwde doorzoekbare database (vector) — is en blijft eigendom van Klant. Nativ host en beheert deze gedurende de looptijd van de overeenkomst ten behoeve van Klant. De programmatuur, modellen en methodiek waarmee Nativ die doorzoekbare laag opbouwt en bevraagt, blijven onderdeel van het platform (artikel 9.1)." },
      { num: "9.3", text: "Bij beëindiging van de overeenkomst behoudt Klant zijn Company Brain. Nativ stelt Klant binnen dertig (30) dagen na beëindiging kosteloos een export ter beschikking van beide databases — de gestructureerde database (PostgreSQL) én de doorzoekbare database (vector) — in een gangbaar en herbruikbaar formaat, vergezeld van een referentie naar het gebruikte embedding-model (naam, versie en de relevante configuratie). Deze overdracht betreft de kennis en gegevens van Klant; het platform, de gebruikersinterface, de onderliggende programmatuur en de methodiek (artikel 9.1) zijn hiervan uitdrukkelijk uitgezonderd en blijven eigendom van Nativ. Zie artikel 19 voor de gang van zaken bij een overstap." },
      { num: "9.4", text: "Onverminderd het eigendom van Klant op zijn eigen Company Brain (artikel 9.2), is het Klant niet toegestaan het platform of enig onderdeel daarvan geheel of gedeeltelijk te kopiëren, te verveelvoudigen, te wijzigen, te vertalen, te decompileren, te disassembleren of daarop reverse-engineering toe te passen, dan wel de broncode, modellen, gewichten, algoritmen, prompts of system-instructies daarvan op andere wijze te achterhalen, te reconstrueren of te extraheren (waaronder begrepen model-extractie- of -distillatietechnieken), noch pogingen daartoe te ondernemen." },
      { num: "9.5", text: "Het is Klant niet toegestaan de uitvoer (output) van de dienst, of een bewerkte versie daarvan, te gebruiken om de dienst te reverse-engineeren, om de onderliggende prompts of methodiek te reconstrueren, of om een concurrerend product, model of dienst te ontwikkelen of te trainen." },
      { num: "9.6", text: "Het is Klant niet toegestaan het platform te gebruiken om een product of dienst te ontwikkelen die met het Nativ-platform concurreert, om de kenmerken, functies of werking ervan na te bouwen, of om derden daarbij te ondersteunen." },
      { num: "9.7", text: "Het is Klant niet toegestaan geautomatiseerde middelen (zoals robots, crawlers, scrapers of scripts) te gebruiken om gegevens uit de dienst te onttrekken, anders dan via de daarvoor door Nativ aangeboden interfaces (API's). Dit laat het recht van Klant op export van zijn eigen Company Brain (artikel 9.3) onverlet." },
      { num: "9.8", text: "Klant maakt geen benchmark-, prestatie- of beschikbaarheidsresultaten van de dienst openbaar zonder voorafgaande schriftelijke toestemming van Nativ." },
      { num: "9.9", text: "De verboden in dit artikel gelden niet, en kunnen niet worden ingeroepen, voor zover (en uitsluitend voor zover) dwingend recht — in het bijzonder de artikelen 45j en 45m van de Auteurswet en de artikelen 5 en 6 van Richtlijn 2009/24/EG (de Softwarerichtlijn) — deze handelingen uitdrukkelijk toestaat ondanks deze beperking. Een beding dat in strijd is met die dwingendrechtelijke bevoegdheden is in zoverre nietig; de overige bepalingen van dit artikel blijven onverkort van kracht." },
      { num: "9.10", text: "Voor zover Klant op grond van het in artikel 9.9 bedoelde dwingend recht gerechtigd is tot decompilatie ten behoeve van interoperabiliteit of tot het verbeteren van fouten, stelt Klant Nativ hiervan eerst schriftelijk in kennis en gunt Nativ een redelijke termijn om de benodigde informatie of een passende oplossing zelf te verstrekken. De aldus verkregen informatie gebruikt Klant uitsluitend voor het wettelijk toegestane doel, verstrekt deze niet aan derden, en gebruikt deze niet voor de ontwikkeling van programmatuur met een in wezen gelijke uitdrukkingsvorm." },
      { num: "9.11", text: "Het platform en de daarin belichaamde programmatuur, modellen, prompts, methodiek en semantische zoek-/vectorlaag (artikel 9.1) vormen bedrijfsgeheimen van Nativ B.V. in de zin van de Wet bescherming bedrijfsgeheimen. De Company Brain en brongegevens van Klant (artikel 9.2) vallen hier uitdrukkelijk niet onder. Niets in dit artikel beperkt de bescherming die Nativ op grond van die wet, het auteursrecht of enig ander recht toekomt." },
      { num: "9.12", text: "Klant verwijdert, wijzigt of maakt geen aanduidingen onherkenbaar die betrekking hebben op het vertrouwelijke karakter, het auteursrecht, de merken, handelsnamen of andere intellectuele eigendomsrechten in of op de Dienst." },
    ],
  },
  {
    n: 10,
    title: "Gegevens, privacy/AVG & Verwerkersovereenkomst",
    clauses: [
      { num: "10.1", text: "Klant is ten aanzien van de Persoonsgegevens die in het kader van de Dienst worden verwerkt de Verwerkingsverantwoordelijke; Nativ handelt daarbij als Verwerker in opdracht van Klant." },
      { num: "10.2", text: "De verwerking van Persoonsgegevens door Nativ is nader geregeld in de Verwerkersovereenkomst (Bijlage A), die voldoet aan de eisen van artikel 28 AVG. Bij strijdigheid met deze voorwaarden gaat Bijlage A voor op het punt van de verwerking van Persoonsgegevens." },
      { num: "10.3", text: "Klant staat ervoor in dat hij gerechtigd is de Klantgegevens (waaronder Persoonsgegevens) aan Nativ te verstrekken en te laten verwerken, en dat daarvoor een rechtsgrond bestaat. Klant vrijwaart Nativ voor aanspraken van derden die verband houden met een gebrek aan een rechtsgrond of met de inhoud van de Klantgegevens." },
      { num: "10.4", text: "Nativ verwerkt de Persoonsgegevens uitsluitend voor de uitvoering van de Overeenkomst en volgens de schriftelijke instructies van Klant, behoudens afwijkende wettelijke verplichtingen." },
      { num: "10.5", text: "Nativ mag Gebruiksgegevens (geaggregeerd en/of geanonimiseerd, niet herleidbaar tot Klant of een persoon) gebruiken voor het beheren, beveiligen, analyseren en verbeteren van de Dienst." },
      { num: "10.6", text: "Nativ zet voor de Dienst subverwerkers in zoals opgenomen in Bijlage A; wijzigingen daarin worden geregeld conform Bijlage A." },
    ],
  },
  {
    n: 11,
    title: "Beveiliging",
    clauses: [
      { num: "11.1", text: "Nativ treft passende technische en organisatorische maatregelen om de Dienst en de Klantgegevens te beschermen tegen verlies en tegen onrechtmatige verwerking, rekening houdend met de stand van de techniek, de uitvoeringskosten en de aard van de gegevens. Een omschrijving van deze maatregelen is opgenomen in Bijlage A." },
      { num: "11.2", text: "Nativ informeert Klant zonder onredelijke vertraging na kennisname van een inbreuk in verband met Persoonsgegevens (datalek) die Klantgegevens betreft, en verleent redelijke medewerking bij de eventueel op Klant rustende meldplicht jegens de Autoriteit Persoonsgegevens en Betrokkenen. De nadere afspraken staan in Bijlage A." },
      { num: "11.3", text: "Klant is verantwoordelijk voor de beveiliging aan zijn zijde, waaronder een deugdelijk beheer van accounts, autorisaties en apparatuur van Gebruikers." },
      { num: "11.4", text: "Nativ stemt het beveiligingsniveau af op de stand van de techniek, de uitvoeringskosten, de aard en de context van de gegevens en de waarschijnlijkheid en ernst van de risico's. Nativ garandeert niet dat de beveiliging onder alle omstandigheden doeltreffend is." },
      { num: "11.5", text: "Nativ mag de beveiligingsmaatregelen aanpassen wanneer gewijzigde wetgeving of gewijzigde omstandigheden daartoe aanleiding geven, mits het beschermingsniveau daardoor niet wezenlijk afneemt. Belangrijke wijzigingen legt Nativ vast en meldt Nativ aan Klant." },
      { num: "11.6", text: "Toegangsmiddelen — inloggegevens, tweefactorauthenticatie, sleutels, certificaten — zijn vertrouwelijk. Klant verstrekt, wijzigt en trekt de autorisaties van zijn Gebruikers tijdig in en zorgt voor deugdelijk wachtwoordbeheer. Nativ is niet aansprakelijk voor schade door gebruik of misbruik van toegangsmiddelen, tenzij dat het rechtstreekse gevolg is van opzet of bewuste roekeloosheid van Nativ of haar bedrijfsleiding." },
      { num: "11.7", text: "Klant meldt kwetsbaarheden, beveiligingsincidenten en vermoedens van misbruik zo spoedig mogelijk bij Nativ. Klant verwijdert of omzeilt geen beveiligingsmaatregelen en maakt geen misbruik van zwakke plekken in de infrastructuur van Nativ." },
      { num: "11.8", text: "Geeft Nativ of een bevoegde autoriteit een concrete beveiligingsaanwijzing, bijvoorbeeld het doorvoeren van een update of het wijzigen van een instelling, en volgt Klant die niet of niet tijdig op, dan is Nativ niet aansprakelijk voor de schade die daardoor ontstaat." },
      { num: "11.9", text: "Nativ maakt dagelijkse versleutelde back-ups zoals beschreven in Bijlage A.4. Herstel van verminkte of verloren gegevens gaat niet verder dan het terugzetten van de laatst beschikbare back-up. Klant blijft zelf verantwoordelijk voor de administratie- en bewaarplichten die op hem rusten." },
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
      { num: "13.2", text: "De totale aansprakelijkheid van Nativ is per gebeurtenis (waarbij een reeks samenhangende gebeurtenissen als één gebeurtenis geldt) en over de gehele looptijd beperkt tot het bedrag van de vergoedingen (exclusief btw) die Klant in de twaalf (12) maanden [te bevestigen] voorafgaand aan de schadeveroorzakende gebeurtenis uit hoofde van de Overeenkomst aan Nativ heeft betaald." },
      { num: "13.3", text: "Onder directe schade wordt uitsluitend verstaan: (a) redelijke kosten ter vaststelling van de oorzaak en omvang van de schade; (b) redelijke kosten om de prestatie aan de Overeenkomst te laten beantwoorden; en (c) redelijke kosten ter voorkoming of beperking van schade." },
      { num: "13.4", text: "Nativ is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen, reputatieschade en schade door bedrijfsstagnatie. Nativ is evenmin aansprakelijk voor schade die het gevolg is van beslissingen die Klant neemt op basis van de output van de Dienst (artikel 4.3). Schade door verlies of vernietiging van gegevens is niet uitgesloten; daarvoor gelden de beperking van artikel 13.2 en het bepaalde in artikel 11.9." },
      { num: "13.5", text: "De beperkingen in dit artikel gelden niet voor zover de schade het gevolg is van opzet of bewuste roekeloosheid van Nativ of haar bedrijfsleiding, of voor zover dwingend recht aan beperking in de weg staat." },
      { num: "13.6", text: "Voorwaarde voor het ontstaan van enig recht op schadevergoeding is dat Klant de schade zo spoedig mogelijk, doch uiterlijk binnen dertig (30) dagen na ontdekking, schriftelijk bij Nativ meldt. Elke vordering vervalt in elk geval na verloop van twaalf (12) maanden na de schadeveroorzakende gebeurtenis." },
      { num: "13.7", text: "Klant vrijwaart Nativ voor aanspraken van derden die verband houden met (a) de Klantgegevens of de inhoud daarvan, (b) het gebruik van de Dienst door Klant of diens Gebruikers in strijd met de Overeenkomst of de wet, of (c) een schending van artikel 9 door Klant." },
      { num: "13.8", text: "Nativ vrijwaart Klant tegen aanspraken van derden die erop zijn gebaseerd dat de door Nativ zelf ontwikkelde Dienst inbreuk maakt op een intellectueel eigendomsrecht van die derde, op voorwaarde dat Klant Nativ onverwijld schriftelijk informeert en de afhandeling van de zaak, waaronder het treffen van schikkingen, volledig aan Nativ overlaat en daaraan meewerkt. De vrijwaring geldt niet voor zover de gestelde inbreuk verband houdt met de Klantgegevens of met door Klant voorgeschreven materialen of diensten van derden. Maakt de Dienst naar het oordeel van Nativ inbreuk, dan mag Nativ de Dienst aanpassen of vervangen door een functioneel gelijkwaardige voorziening, dan wel de Overeenkomst beëindigen onder restitutie van de vooruitbetaalde vergoedingen voor de niet-genoten periode. Op deze vrijwaring is de beperking van artikel 13.2 van toepassing." },
      { num: "13.9", text: "Tenzij nakoming door Nativ blijvend onmogelijk is, ontstaat aansprakelijkheid van Nativ wegens een toerekenbare tekortkoming pas nadat Klant Nativ onverwijld schriftelijk in gebreke heeft gesteld, daarbij een redelijke termijn voor herstel heeft gesteld, en Nativ ook na die termijn toerekenbaar tekortschiet. De ingebrekestelling bevat een zo volledig en gedetailleerd mogelijke omschrijving van de tekortkoming, zodat Nativ daarop adequaat kan reageren." },
      { num: "13.10", text: "De in deze voorwaarden opgenomen beperkingen en uitsluitingen van aansprakelijkheid gelden mede ten gunste van de medewerkers van Nativ en van de (rechts)personen die Nativ bij de uitvoering van de Overeenkomst inschakelt." },
    ],
  },
  {
    n: 14,
    title: "Overmacht",
    clauses: [
      { num: "14.1", text: "Geen van partijen is gehouden tot nakoming van een verplichting indien zij daartoe verhinderd is door Overmacht. Onder Overmacht wordt verstaan elke van de wil van de betrokken partij onafhankelijke omstandigheid waardoor nakoming redelijkerwijs niet kan worden gevergd, waaronder — voor zover van toepassing — storingen in internet, telecommunicatie, hosting of energievoorziening, cyberaanvallen, tekortkomingen van toeleveranciers of onderaannemers, overheidsmaatregelen, epidemieën en werkstakingen." },
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
      { num: "16.3", text: "Geschillen die voortvloeien uit of samenhangen met de Overeenkomst worden bij uitsluiting voorgelegd aan de bevoegde rechter van de rechtbank Noord-Holland (het arrondissement waaronder de vestigingsplaats Haarlem valt), onverminderd het recht van Nativ om Klant te dagvaarden voor de volgens de wet bevoegde rechter." },
      { num: "16.4", text: "Partijen spannen zich in om een geschil eerst in onderling overleg op te lossen voordat zij het aan de rechter voorleggen." },
      { num: "16.5", text: "Komen partijen er onderling niet uit, dan kan elk van hen ICT-mediation voorstellen volgens het mediationreglement van de Stichting Geschillenoplossing Automatisering (SGOA). De andere partij woont in dat geval ten minste één gezamenlijke bespreking bij. Daarna staat het beide partijen vrij de mediation te beëindigen. Dit artikel staat niet in de weg aan een kort geding of aan conservatoire maatregelen." },
    ],
  },
  {
    n: 17,
    title: "Gebruik van AI",
    clauses: [
      { num: "17.1", text: "De Dienst bevat AI-systemen in de zin van de AI-verordening (Verordening (EU) 2024/1689). Nativ treedt daarbij op als aanbieder van het systeem; Klant gebruikt de Dienst als gebruiksverantwoordelijke." },
      { num: "17.2", text: "Klant gebruikt de Dienst uitsluitend voor het door Nativ omschreven beoogde doel en volgens de Documentatie en de gebruiksinstructies van Nativ." },
      { num: "17.3", text: "Klant brengt geen eigen naam of merk op de Dienst aan en wijzigt de Dienst niet wezenlijk, tenzij schriftelijk anders overeengekomen. Doet Klant dat toch, of gebruikt Klant de Dienst voor een ander doel waardoor deze als AI-systeem met een hoog risico gaat gelden, dan kan Klant daardoor zelf als aanbieder in de zin van de AI-verordening worden aangemerkt en draagt Klant de daaruit voortvloeiende verplichtingen. Nativ is niet aansprakelijk voor de gevolgen daarvan." },
      { num: "17.4", text: "Klant zorgt voor betekenisvol menselijk toezicht op het gebruik van de Dienst en van de uitkomsten daarvan. artikel 4.3 blijft onverkort gelden." },
      { num: "17.5", text: "Klant zorgt voor een toereikend niveau van AI-geletterdheid bij de medewerkers en andere personen die de Dienst namens hem gebruiken, zoals bedoeld in artikel 4 van de AI-verordening. Nativ stelt daarvoor Documentatie en uitleg beschikbaar." },
      { num: "17.6", text: "AI-modellen worden doorontwikkeld en bijgewerkt. Uitkomsten kunnen daardoor in de loop van de tijd veranderen, ook bij een gelijke invoer. Nativ garandeert niet dat de uitkomsten onder alle omstandigheden of na verloop van tijd juist, volledig of doeltreffend blijven." },
      { num: "17.7", text: "Klant gebruikt de Dienst of de output daarvan niet in of als onderdeel van een ander AI-systeem zonder voorafgaande schriftelijke toestemming van Nativ. artikel 9.5 blijft onverkort gelden." },
      { num: "17.8", text: "Wordt Klant bekend met een ernstig incident als bedoeld in de AI-verordening, of meent Klant dat de Dienst een risico voor personen oplevert, dan meldt Klant dat onverwijld eerst bij Nativ. Nativ beoordeelt vervolgens welke melding aan een bevoegde autoriteit nodig is en doet die melding, tenzij Klant aantoont dat hij Nativ binnen de wettelijke meldtermijn niet kon bereiken." },
      { num: "17.9", text: "Nativ mag corrigerende maatregelen treffen wanneer de Dienst niet langer overeenkomstig het beoogde doel wordt gebruikt of wanneer dat nodig is om aan de AI-verordening te voldoen. Daaronder valt het tijdelijk uitschakelen of terugtrekken van een functie. Nativ informeert Klant daarover zo spoedig mogelijk en is ter zake niet tot schadevergoeding gehouden." },
      { num: "17.10", text: "Nativ gebruikt de Klantgegevens niet om AI-modellen te trainen. Zie artikel 10.5 voor het gebruik van Gebruiksgegevens." },
    ],
  },
  {
    n: 18,
    title: "Naleving van wetgeving, toezicht & audit",
    clauses: [
      { num: "18.1", text: "Klant beoordeelt zelf of de Dienst past binnen de wet- en regelgeving die op hem van toepassing is en of het gebruik ervan in zijn organisatie passend en evenredig is. Gezien de hoeveelheid sectorspecifieke regelgeving kan Nativ niet toezeggen dat de Dienst voldoet, of blijft voldoen, aan alle verplichtingen die op Klant rusten." },
      { num: "18.2", text: "Toont Klant aan dat door gewijzigde wet- of regelgeving een aanpassing van de Dienst voor hem essentieel is, dan informeert hij Nativ daarover schriftelijk en zo gedetailleerd mogelijk. Partijen treden vervolgens in overleg over of, hoe en op welke termijn die aanpassing kan worden gedaan. Nativ mag daarvoor redelijke kosten in rekening brengen. Is de aanpassing voor Nativ redelijkerwijs niet mogelijk, dan mag elke partij het betrokken deel van de Overeenkomst schriftelijk beëindigen tegen de datum waarop de wijziging voor Klant moet ingaan." },
      { num: "18.3", text: "Rust op Klant een wettelijke verplichting om informatie over de Dienst te verstrekken aan een toezichthouder, bijvoorbeeld op grond van de AVG, de NIS2-richtlijn of DORA, dan verleent Nativ daaraan redelijke medewerking en levert Nativ de benodigde informatie binnen een redelijke termijn. Nativ kan die verplichting nakomen door een recent onafhankelijk auditrapport, een geldige certificering of een schriftelijke verklaring te verstrekken." },
      { num: "18.4", text: "Kan Klant met de op grond van artikel 18.3 verstrekte informatie niet aan zijn wettelijke verplichting voldoen, dan mag hij ten hoogste eenmaal per jaar op eigen kosten een audit laten uitvoeren. De audit wordt uitgevoerd door een onafhankelijke, gecertificeerde deskundige met een geheimhoudingsplicht, wordt ten minste twee weken van tevoren aangekondigd, blijft beperkt tot wat nodig is om die naleving vast te stellen en verstoort de bedrijfsvoering van Nativ zo min mogelijk. De deskundige verstrekt Nativ een kopie van het rapport. Nativ mag een voorgestelde deskundige weigeren wanneer de inzet in strijd is met wetgeving, de vertrouwelijkheid jegens andere klanten raakt of een ontoelaatbare inbreuk op de beveiliging vormt. Partijen bespreken de uitkomsten en voeren de verbetermaatregelen door die redelijkerwijs van hen kunnen worden verwacht. Voor audits die uitsluitend de verwerking van Persoonsgegevens betreffen geldt Bijlage A.11." },
      { num: "18.5", text: "Een bestuurlijke boete die aan Klant is opgelegd, kan Klant niet op Nativ verhalen." },
      { num: "18.6", text: "Doet Nativ een wettelijk verplichte melding bij een autoriteit, of verleent Nativ medewerking aan een verzoek van een autoriteit, dan is Nativ niet aansprakelijk voor schade van Klant of van een derde als gevolg daarvan. Nativ informeert Klant daarover waar dat wettelijk is toegestaan." },
      { num: "18.7", text: "Nativ mag maatregelen treffen wanneer via de Dienst onrechtmatige of inbreukmakende content wordt ingevoerd of verspreid, waaronder het ontoegankelijk maken van de betreffende gegevens en het opschorten van de toegang conform artikel 5.5. Nativ heeft geen verplichting om actief op zulke content te monitoren." },
    ],
  },
  {
    n: 19,
    title: "Overstappen naar een andere aanbieder",
    clauses: [
      { num: "19.1", text: "De Dienst is een dataverwerkingsdienst in de zin van de Dataverordening (Verordening (EU) 2023/2854). Wil Klant overstappen naar een andere aanbieder, of de Dienst beëindigen en zijn gegevens meenemen, dan geldt dit artikel in aanvulling op artikel 8 en artikel 9.3." },
      { num: "19.2", text: "Klant dient zijn verzoek schriftelijk in en vermeldt daarbij of hij wil overstappen dan wel beëindigen, en aan welke partij de gegevens moeten worden verstrekt." },
      { num: "19.3", text: "Nativ levert de export van artikel 9.3 binnen dertig (30) dagen na het verzoek of na de beëindiging, al naargelang wat later valt. Nativ brengt daarvoor geen overstap-, extractie- of exportkosten in rekening." },
      { num: "19.4", text: "Gedurende de overstap blijft Nativ de Dienst leveren en het overeengekomen beveiligingsniveau handhaven, en verleent Nativ redelijke bijstand. Nativ deelt de bij hem bekende risico's voor de continuïteit met Klant. Werkzaamheden die verder gaan dan het leveren van de export en deze bijstand, zoals het inrichten of converteren van de gegevens bij de nieuwe aanbieder, vallen buiten de Overeenkomst; Nativ kan die tegen zijn gebruikelijke tarieven verrichten." },
      { num: "19.5", text: "De export betreft de Company Brain en de overige Klantgegevens. Het Platform (artikel 9.1) valt daar niet onder." },
      { num: "19.6", text: "Na afloop van de exporttermijn verwijdert Nativ de Klantgegevens conform artikel 8.5 en Bijlage A.10, zodanig dat deze niet langer toegankelijk zijn, behoudens een op Nativ rustende wettelijke bewaarplicht." },
    ],
  },
  {
    n: 20,
    title: "Aanvullende onderdelen, meerwerk & termijnen",
    clauses: [
      { num: "20.1", text: "Naast de Company Brain kan Klant afzonderlijke onderdelen afnemen, waaronder AI-workflows, een koppeling met een bestaand systeem van Klant, studies en maatwerk. Elk onderdeel wordt afzonderlijk overeengekomen en heeft een eigen omschrijving, vergoeding en, waar van toepassing, een eigen looptijd. Voor die onderdelen gelden deze algemene voorwaarden onverkort, tenzij schriftelijk anders is bepaald." },
      { num: "20.2", text: "De vergoeding voor een AI-workflow wordt vastgesteld ná de intake, op basis van het ontwerp van die workflow. De daarvoor benodigde koppelingen en het onderhoud zijn in die vergoeding verwerkt. Vóór het ontwerp gereed is, gelden genoemde bedragen als indicatie en binden zij Nativ niet." },
      { num: "20.3", text: "Verricht Nativ op verzoek of met voorafgaande instemming van Klant werkzaamheden die buiten de omschrijving van de Dienst of van een overeengekomen onderdeel vallen (meerwerk), dan vergoedt Klant die volgens de overeengekomen tarieven en, bij gebreke daarvan, volgens de gebruikelijke tarieven van Nativ. Nativ is niet verplicht een verzoek om meerwerk in te willigen en kan verlangen dat daarvoor een afzonderlijke schriftelijke overeenkomst wordt gesloten. Bij een vaste prijs informeert Nativ Klant desgevraagd vooraf schriftelijk over de financiële gevolgen." },
      { num: "20.4", text: "Klant is zich ervan bewust dat meerwerk of gewijzigde wensen kunnen leiden tot het verschuiven van afgesproken data. Het enkele feit dat zich meerwerk voordoet, geeft Klant geen grond voor opzegging of ontbinding." },
      { num: "20.5", text: "Termijnen. De Company Brain-omgeving staat bij aanvang van de Overeenkomst voor Klant klaar (artikel 4.6); daarvoor gelden geen opleveringstermijnen. Voor afzonderlijk overeengekomen onderdelen spant Nativ zich redelijkerwijs in de genoemde data te halen. Die data gelden als streefdata en zijn niet fataal, tenzij partijen een datum schriftelijk uitdrukkelijk als uiterste datum hebben aangemerkt. Dreigt een termijn te worden overschreden, dan treden partijen in overleg over de gevolgen voor de planning." },
    ],
  },
  {
    n: 21,
    title: "Slotbepalingen",
    clauses: [
      { num: "21.1", text: "Nietigheid / conversie. Is een bepaling van deze voorwaarden nietig of vernietigbaar, dan blijven de overige bepalingen van kracht en treden partijen in overleg om de betreffende bepaling te vervangen door een geldige bepaling die de strekking daarvan zo veel mogelijk benadert." },
      { num: "21.2", text: "Overdracht. Klant mag zijn rechten en verplichtingen uit de Overeenkomst niet zonder voorafgaande schriftelijke toestemming van Nativ aan een derde overdragen. Nativ mag haar rechten en verplichtingen overdragen aan een groepsvennootschap of in het kader van een fusie, overname of overdracht van (een deel van) haar onderneming; Nativ stelt Klant hiervan op de hoogte." },
      { num: "21.3", text: "Volledige overeenkomst. De Overeenkomst (inclusief deze voorwaarden en de bijlagen) bevat de volledige afspraken tussen partijen over het onderwerp daarvan en treedt in de plaats van alle eerdere afspraken en mededelingen daarover." },
      { num: "21.4", text: "Kennisgevingen. Kennisgevingen geschieden schriftelijk aan de in de Overeenkomst opgenomen contactgegevens. Partijen informeren elkaar tijdig over wijzigingen daarvan." },
      { num: "21.5", text: "Geen afstand. Het niet of niet direct afdwingen van een recht door een partij houdt geen afstand van dat recht in." },
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
                    Het hosten en leveren van de dienst (Company Brain en de daarop draaiende workflows):
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
