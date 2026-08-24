/**
 * De capaciteitenkaart v2 — wat het platform aantoonbaar kan, in gewone taal.
 *
 * Dit is de WHITELIST voor elke uitspraak in het rapport die verder gaat dan
 * beschrijven wat de invuller zelf vertelde. De regel uit
 * `gtm/scan/voorstel-rapport-verbeelding-2026-08-13.md`:
 *
 *   Elke zin over wat er mogelijk wordt is het product van precies twee
 *   bronnen: iets dat de invuller zelf heeft gezegd, en een capaciteit uit
 *   deze kaart. Er is geen derde bron.
 *
 * Het model mag alleen naar deze ids verwijzen; `report.ts` gooit een claim
 * met een onbekend id weg (membership guard).
 *
 * STATUS (founder-ruling Livius 14-08, KAN-379/KAN-381): wat gebouwd is praat
 * gewoon mee in het rapport — een lead hoeft niet te weten wat wij intern nog
 * niet productie-getest hebben. `capabilitiesPromptBlock()` stuurt daarom
 * `live` én `live-onbewezen` mee en de guard weigert alleen `niet-aan`
 * (kapot, dormant of zonder sleutels). De statuskolom stuurt verder alleen
 * onze eigen testprioriteit, niet wat de klant te zien krijgt.
 *
 * NIET_MOGELIJK is even belangrijk als de kaart zelf: modellen vullen gaten,
 * dus de gaten staan hier expliciet ingevuld. De niet-aan-lijst blijft dicht:
 * gestructureerde interview-routing per antwoord, prompt-evolutie,
 * marketing-chatmodus, e-sign, de tweetalige Image Studio-flow, social_posts.
 *
 * Bron: `gtm/scan/capaciteitenkaart-v2-simulatie-2026-08-13.md`, geverifieerd
 * tegen origin/main van insightflow (e354b5e1) + insightflow-platform
 * (93b79d0f) op 2026-08-13; batch-akkoord Jorus 14-08. Komt er iets bij in
 * het platform, dan komt er een kaart bij — nooit andersom.
 */

export type CapabilityStatus = "live" | "live-onbewezen" | "niet-aan";

export interface ScanCapability {
  id: string;
  /** Wat het is, in gewone taal, zoals het in een rapport mag klinken. */
  wat: string;
  /** Wat er van de klant voor nodig is. Gaat ALTIJD mee in de zin. */
  voorwaarde: string;
  /** live = bewezen · live-onbewezen = op main, nog geen productie-bewijs
   * (praat mee in het rapport) · niet-aan = loze belofte, blijft dicht. */
  status: CapabilityStatus;
  /** Waar het zit — alleen voor ons, komt nooit in een rapport. */
  bewijs: string;
  /** Alleen beschikbaar voor het kijkje vooruit (sectie A-bis), nooit voor de
   * ranglijst of de ingerichte keten. Zie het blok "Voorschot" hieronder. */
  vooruitblik?: true;
}

export const CAPABILITIES: readonly ScanCapability[] = [
  // ── Groep 1 · Hoe kennis binnenkomt ────────────────────────────────────
  {
    id: "vergaderinname",
    wat: "De gesprekken die er toch al zijn komen binnen via de gekoppelde notuleerdienst. Elk gesprek landt als doorzoekbare bron in de vastgelegde kennis én als regel op de tijdlijn van de mensen en bedrijven die erbij waren.",
    voorwaarde:
      "Iemand notuleert met die dienst, de koppeling staat aan, en minstens één deelnemer staat in het klantenbestand.",
    status: "live",
    bewijs:
      "platform lib/integrations/granola-sync.ts + lib/brain/capture-ingest.ts, engine app/_lifecycle.py. Alleen Granola aangesloten; geen leverancierskeuze suggereren.",
  },
  {
    id: "gesprekstypes",
    wat: "Gesprekken worden ingedeeld in types die je zelf benoemt, met vaste notulisten per type, zodat je een hele reeks gesprekken van hetzelfde soort naast elkaar kunt leggen in plaats van er één samen te vatten.",
    voorwaarde: "Types instellen, en er moet genotuleerd worden.",
    status: "live",
    bewijs:
      "platform lib/brain/meetings-ledger.ts + meeting-type-match.ts. Het getal 'vijftig' uit v1 is geschrapt (getallenslot).",
  },
  {
    id: "interview",
    wat: "Het systeem voert zelf een gesprek met een medewerker, via video of spraak. Het werkt een vragenlijst af en legt ook vast wat iemand er spontaan bij vertelt. Na afloop staat er per vraag een uitgeschreven antwoord naast het volledige verslag, en een beheerder keurt goed voordat het als kennis meetelt.",
    voorwaarde: "Iemand voert dat gesprek, en een beheerder keurt goed.",
    status: "live",
    bewijs:
      "platform api/interviews/*, engine app/api/interviews.py. Fijne per-antwoord-route is dormant; nooit beloven dat elk antwoord een los feit wordt.",
  },
  {
    id: "gesprekken-extern",
    wat: "Een vraag uit het bedrijf wordt een onderzoek onder mensen buiten de organisatie: klanten, kandidaten, leveranciers. Deelnemers krijgen een persoonlijke link, hebben geen account nodig, en uitnodigingen en herinneringen gaan vanzelf. De uitkomsten worden per deelvraag samengevat met citaten van deelnemers, en elke bevinding wacht als voorstel op goedkeuring voordat hij als kennis meetelt.",
    voorwaarde:
      "Je nodigt die mensen zelf uit, ze doen mee, en een beheerder keurt de verzending goed.",
    status: "live-onbewezen",
    bewijs:
      "platform api/studies + lib/studies/outreach.ts, engine app/api/studies.py. Actie: één productie-verzending aantonen (afzenderdomein), dan live.",
  },
  {
    id: "interne-studie",
    wat: "Hetzelfde soort onderzoek binnen de eigen organisatie, bijvoorbeeld door een leidinggevende in het eigen team. Teamleden zien de vragenlijst of het gesprek in hun eigen omgeving klaarstaan, en wie het onderzoek opzet bepaalt wie de uitkomsten mag lezen: alleen de opsteller, de eigen afdeling, de leiding of het hele bedrijf.",
    voorwaarde:
      "Deelnemers hebben een account, een beheerder keurt het starten goed.",
    status: "live-onbewezen",
    bewijs:
      "platform lib/studies/interview-bridge.ts, lib/studies/access.ts. Niet anoniem; nooit een anonieme peiling beloven. Promoten na één echte interne run.",
  },
  {
    id: "documenten-inname",
    wat: "Bestanden zoals PDF's, Word-documenten, presentaties en spreadsheets worden geüpload en doorzoekbaar gemaakt, zodat een antwoord naar de relevante passage kan verwijzen in plaats van naar het hele bestand. Per document wordt vastgelegd wie het mag zien: iedereen, een afdeling, of alleen met naam genoemde personen.",
    voorwaarde:
      "Iemand uploadt de bestanden en kiest per document wie het mag zien; de bestanden moeten leesbare tekst bevatten.",
    status: "live",
    bewijs:
      "platform api/documents, lib/documents/visibility.ts, engine app/ingest/parsers.py. Geen tekstherkenning op scans.",
  },
  {
    id: "email-koppeling",
    wat: "Correspondentie met een klant komt als samenvatting op de tijdlijn van die klant terecht. Alleen mail waarin een bekend klantcontact rechtstreeks afzender of ontvanger is wordt bekeken, er worden alleen samenvattingen bewaard, en een samenvatting is privé voor de mailbox-eigenaar totdat die hem zelf deelt.",
    voorwaarde:
      "Staat standaard uit; de organisatie zet hem bewust aan en elke medewerker geeft daarnaast apart toestemming voor de eigen mailbox.",
    status: "live",
    bewijs: "engine app/capture/service.py, app/scheduler/actions.py",
  },
  {
    id: "kanaaldata",
    wat: "Het platform koppelt aan de kanalen waar het werk al gebeurt: zakelijke e-mail, sociale kanalen, het klantsysteem. Wat daar binnenkomt of gepubliceerd wordt, komt beschikbaar voor de workflows en de vastgelegde kennis. Koppelen gebeurt op de inlogpagina van de dienst zelf, dus wachtwoorden komen nooit bij het platform terecht.",
    voorwaarde:
      "Per kanaal een eigen account en een koppeling die de klant zelf aanzet; voor een persoonlijke mailbox geeft elke gebruiker apart toestemming.",
    status: "live",
    bewijs:
      "engine app/integrations/providers/ (gmail, outlook, linkedin, instagram, ayrshare, zoho_crm), registry.py. Een persoonlijke mailbox blijft alleen van de eigenaar.",
  },
  // ── Groep 2 · Wat de kennis betrouwbaar maakt ─────────────────────────
  {
    id: "kennis-herkomst",
    wat: "Elk vastgelegd feit heeft een eigenaar, een herkomst en een datum waarop het voor het laatst is nagekeken. Antwoorden verwijzen naar de bron waar ze vandaan komen, en bij een feit dat een workflow heeft aangedragen staat erbij welke dat was. Een feit dat te lang niet is nagekeken wordt niet meer aan de AI gevoerd tot iemand het opnieuw bevestigt.",
    voorwaarde:
      "De kennis moet erin staan en eigenaren moeten hun feiten periodiek nakijken.",
    status: "live",
    bewijs:
      "engine app/search/retrievers/brain_facts.py (fresh-poort, herkomst-metadata), platform prisma/schema.prisma (owner, lastValidatedAt, sourceAgentId)",
  },
  {
    id: "zichtbaarheid",
    wat: "Per vastgelegd feit is bepaald wie het mag zien: iedereen in het bedrijf, alleen bepaalde afdelingen, alleen de leiding, of daarbovenop een met naam genoemde persoon. Die regel wordt in de zoekmachine zelf gehandhaafd: een feit dat iemand niet mag zien wordt voor die persoon niet eens opgehaald, dus het kan ook niet per ongeluk in een antwoord belanden. Bij twijfel blijft een feit verborgen in plaats van zichtbaar.",
    voorwaarde:
      "Iemand moet per feit instellen wie het mag zien, en medewerkers moeten aan hun afdeling gekoppeld zijn.",
    status: "live",
    bewijs:
      "engine app/search/retrievers/brain_facts.py (brain_trust_filter), platform lib/brain/engine-sync.ts. Beheerders passeren deze poort; formuleringen daarop aanpassen.",
  },
  {
    id: "toegang-over-eigen-tool",
    wat: "Wie in zijn eigen AI-tool wil blijven werken, koppelt die aan de vastgelegde bedrijfskennis en stelt zijn vragen daar. Daar gelden precies dezelfde toegangsregels als in het platform: wie een feit daar niet mag zien, krijgt het via de eigen tool ook niet te zien. Wie de vrager is komt uit de beveiligde koppeling zelf, niet uit wat de tool over zichzelf beweert.",
    voorwaarde: "De koppeling moet worden aangezet, per persoon en intrekbaar.",
    status: "live",
    bewijs:
      "engine app/mcp/server.py, identity.py, egress.py. Live bewezen 13-08 (whoami op productie).",
  },
  {
    id: "een-gedeelde-waarheid",
    wat: "De vastgelegde bedrijfskennis staat op één plek die over afdelingen heen wordt gebruikt, in plaats van losse verzamelingen per team of per persoon. Elk feit heeft een vaste plek en een eigenaar, er is één route waarlangs iets een feit kan worden, en alles wat een AI wil toevoegen passeert eerst een mens.",
    voorwaarde: "Het bedrijf onderhoudt de kennis hier en wijst eigenaren aan.",
    status: "live",
    bewijs:
      "platform brain/actions.ts (commitCellValue, de ene schrijfpoort), prisma/schema.prisma (BrainDraftCell-wachtrij)",
  },
  {
    id: "kennis-groeit-mee",
    wat: "De vastgelegde kennis wordt vanuit meerdere kanten gevuld: wat iemand zelf invoert, documenten, gesprekken, interviews, onderzoeksuitkomsten en goedgekeurde uitkomsten van workflows. Wat een AI aandraagt komt eerst in een wachtrij en wordt pas een feit als een mens het goedkeurt. Wat één keer is vastgelegd, draagt daarna elk volgend antwoord en elke volgende workflow.",
    voorwaarde: "Er moet iemand zijn die de wachtrij met voorstellen beoordeelt.",
    status: "live",
    bewijs:
      "platform output-shells/save-to-brain-action.tsx, chat/save-to-brain-button.tsx, lib/studies/synthesis.ts",
  },
  {
    id: "menselijke-poort",
    wat: "AI stelt voor, een mens beslist. Niets komt ongezien in de vastgelegde kennis of naar buiten.",
    voorwaarde: "Standaard zo, en dat blijft werk voor een mens.",
    status: "live",
    bewijs: "engine app/agents/approval.py + goedkeuringsroutes",
  },
  {
    id: "antwoorden-met-bron",
    wat: "Er is een antwoordstand die alleen zegt wat in de vastgelegde bedrijfskennis staat. Elke bewering verwijst naar de bron waar die vandaan komt, en staat iets er niet in, dan zegt het systeem eerlijk wat er ontbreekt in plaats van het gat zelf op te vullen.",
    voorwaarde:
      "De kennis moet gevuld zijn; over wat niet is vastgelegd kan deze stand niets zeggen.",
    status: "live",
    bewijs:
      "platform lib/chat-modes.ts, engine prompts/chat/system-strict.md, app/search/rag.py",
  },
  // ── Groep 3 · Hoe het werk draait ─────────────────────────────────────
  {
    id: "vaste-vorm-werk",
    wat: "Een workflow is een vaste, vastgelegde manier van werken: dezelfde stappen, in dezelfde volgorde, met hetzelfde soort invoer en uitvoer, elke keer opnieuw. Van elke uitvoering wordt per stap bijgehouden wat erin ging en wat eruit kwam, zodat een uitvoering achteraf stap voor stap is terug te zien. Dat is het verschil met losjes chatten: het werk heeft een vorm die vastligt en na te lezen is.",
    voorwaarde:
      "De gegevens die de workflow als invoer nodig heeft moeten bij de start worden aangeleverd.",
    status: "live",
    bewijs:
      "engine agents/ (YAML per workflow), app/agents/graph.py, executor.py (run_steps + verbruiksregistratie per stap)",
  },
  {
    // ── VOORSCHOT ─────────────────────────────────────────────────────────
    // Dit is NIET gebouwd. Ruling Jorus 24-08: toch op de kaart, zodat het
    // rapport het juiste doorkijkje geeft. Wordt gebouwd onder NTH-287 (de
    // webhook-kant) plus de vervolgstap voor termijnen die daar bewust
    // buiten scope staat.
    //
    // Daarom `vooruitblik: true`: hij gaat ALLEEN mee in de aanroep van
    // sectie A-bis ("en als je dit werk vanaf nul opnieuw zou opzetten"),
    // nooit in de ranglijst of de ingerichte keten. Die scheiding is niet
    // beleefdheid maar mechaniek: CAPABILITY_IDS bevat hem niet, dus de
    // guards van de andere secties gooien hem eruit als het model hem daar
    // alsnog gebruikt. Anders zou hij in de aanbevolen workflow belanden en
    // dan is het geen doorkijkje meer maar een belofte waarop iemand tekent.
    //
    // Zodra NTH-287 landt: `vooruitblik` eraf, `bewijs` invullen, status naar
    // live-onbewezen tot er een productierun is.
    id: "gebeurtenis-trigger",
    wat: "Werk begint op het moment dat er iets gebeurt in plaats van op een vast tijdstip: een bericht van een klant of leverancier komt binnen, een status verandert, of er komt juist géén reactie binnen de termijn die jij hebt bepaald. Wat op tijd loopt komt niet langs; alleen wat afwijkt komt bij een mens terecht.",
    voorwaarde:
      "De bron moet gekoppeld zijn of een seintje kunnen sturen, en iemand moet instellen welke gebeurtenis welk werk start en welke termijn te lang is.",
    status: "live",
    bewijs:
      "VOORSCHOT — nog niet gebouwd, zie NTH-287. Alleen zichtbaar in sectie A-bis.",
    vooruitblik: true,
  },
  {
    id: "ritme",
    wat: "Werk draait op een vast moment, zonder dat iemand het start.",
    voorwaarde: "De workflow moet bestaan en zijn ritme moet zijn ingesteld.",
    status: "live",
    bewijs:
      "engine app/scheduler/ (aantoonbare productieruns). Cadans per klant is instelwerk.",
  },
  {
    id: "documenten-en-beeld",
    wat: "Een workflow levert een document, een overzicht of beeld op, binnen instelbare grenzen.",
    voorwaarde: "Het moet als workflow zijn ingericht.",
    status: "live",
    bewijs: "engine app/skills/ (media, image), documents",
  },
  {
    id: "naar-buiten-kijken",
    wat: "Het systeem kan zelf om zich heen kijken: zoeken op het open web, nieuws volgen, berichten op sociale kanalen bekijken en wetenschappelijke bronnen raadplegen, samengevat tegen de eigen situatie. De klant hoeft hiervoor niets te koppelen.",
    voorwaarde: "Het moet als workflow zijn ingericht.",
    status: "live",
    bewijs:
      "engine app/skills/registry.py (tavily, perplexity, newsapi, socialdata, openalex)",
  },
  {
    id: "workflow-samenstellen",
    wat: "Je beschrijft in een vragenlijst welk werk je gedaan wilt hebben. De workflow wordt daarna samengesteld uit bestaande bouwstenen — dezelfde soorten stappen die alle andere workflows gebruiken — en vooraf wordt gecontroleerd of de vastgelegde kennis al genoeg bevat. Is dat niet zo, dan is het antwoord een eerlijke nee met een overzicht van wat er nog mist.",
    voorwaarde:
      "Een intake, en de vastgelegde kennis moet de benodigde gegevens bevatten.",
    status: "live",
    bewijs:
      "platform api/agent-factory/intakes/*, lib/brain/colleague-readiness.ts. De definitieve bouw is mensenwerk; nooit 'druk op de knop' suggereren.",
  },
  {
    id: "workflow-bibliotheek",
    wat: "Er is een bibliotheek met bestaande workflows die per bedrijf aan of uit staan. Iedereen kan erin bladeren en zien wat er bestaat; een beheerder zet een workflow aan en kiest bij welke afdeling hij hoort.",
    voorwaarde: "Een beheerder zet de workflow aan.",
    status: "live",
    bewijs: "platform library/page.tsx + library/actions.ts",
  },
  {
    id: "workflow-klonen",
    wat: "Een bestaande workflow hoeft niet opnieuw bedacht te worden: hij is te klonen als vertrekpunt, opent volledig ingevuld met de eerder gegeven antwoorden, en alleen wat anders moet wordt aangepast. Het origineel blijft gewoon doorwerken.",
    voorwaarde:
      "Er moet een bestaande workflow met doorlopen intake zijn; de kloon doorloopt daarna het gewone samenstel-proces.",
    status: "live-onbewezen",
    bewijs:
      "platform api/agent-factory/intakes/[id]/clone + redesign (rulings 10/11-08; productiegebruik nog niet aangetoond)",
  },
  {
    id: "elke-run-beoordeeld",
    wat: "Elke keer dat een workflow iets oplevert, kijkt iemand ernaar en keurt het goed, past het aan of wijst het af. Het systeem legt dat oordeel vast en beoordeelt elke uitvoering daarnaast zelf op vaste punten. De menselijke oordelen worden per bedrijf samengevat tot lessen, en die lessen leest de workflow bij een volgende uitvoering terug — dezelfde workflow groeit bij elk bedrijf een eigen kant op.",
    voorwaarde:
      "Er moet daadwerkelijk beoordeeld worden; zonder oordelen valt er niets te leren.",
    status: "live",
    bewijs:
      "engine app/services/feedback_capture.py, learning_distiller.py, memory_pack.py, quality_score.py. Lessen van het ene bedrijf komen nooit bij een ander.",
  },
  {
    id: "gerichte-verbetering",
    wat: "Wie een resultaat bijna goed vindt, zegt in gewone taal wat er anders moet. Het systeem past alleen dat ene aan en laat de rest staan; de eerdere versie blijft bewaard.",
    voorwaarde: "De workflow in kwestie moet deze verfijnstap aan boord hebben.",
    status: "live",
    bewijs:
      "engine app/api/content_pieces.py, content_regenerate.py. Staat op de vier marketing-schrijvers + CRM-bijwerker aan; nooit als algemeen kenmerk presenteren.",
  },
  {
    id: "platform-werkomgeving",
    wat: "Wie liever in één omgeving werkt, doet dat in het platform zelf: vragen stellen aan de vastgelegde kennis, zien wat erin zit en wie wat mag zien, en de workflows op dezelfde plek. Het is een keuze per persoon, niet een verplichting in één richting.",
    voorwaarde:
      "Onbeperkt gebruikers, dus er hoeft niemand buiten te blijven. De kennis moet er wel in staan.",
    status: "live",
    bewijs: "platform (authenticated)/chat, /brain, /library, /workflows",
  },
  {
    id: "profielen",
    wat: "Profielen per persoon en per bedrijf die zich laten bijwerken, met de interactietijdlijn eronder.",
    voorwaarde: "Het klantenbestand moet gevuld zijn.",
    status: "live",
    bewijs: "platform api/sales/profiles",
  },
  // ── Groep 4 · Het benoemde werk — de vier teams ───────────────────────
  {
    id: "sales-team",
    wat: "Voor verkoop staat een vast team van workflows klaar, elk met een eigen taak. Profile Builder stelt een onderzoeksdossier samen over een contactpersoon of bedrijf, Lead Scout vindt en beoordeelt nieuwe leads, Outreach Writer schrijft een eerste bericht, Meeting Prep Producer maakt de voorbereiding voor een klantgesprek, en Proposal Builder bouwt een offertedocument. Follow-up Sentinel houdt bij welke leads opvolging nodig hebben, Pipeline Steward controleert of de pijplijn nog klopt met het bewijs, Account Grower zoekt kansen bij bestaande klanten, en Deal Debrief & Playbook Learner werkt een verkoopgesprek uit tot lessen voor het team. Update CRM en Add to CRM stellen wijzigingen in het klantenbestand voor. Een mens beoordeelt elk voorstel voordat er iets verandert of de deur uit gaat.",
    voorwaarde:
      "Een gevulde Brain en een bijgehouden klantenbestand; er moet iemand zijn die voorstellen beoordeelt.",
    status: "live",
    bewijs: "engine agents/sales/ (11 YAML's op origin/main)",
  },
  {
    id: "finance-team",
    wat: "Voor de financiële administratie staat een vast team klaar. Ledger Sentinel bewaakt of de boeken vers en herleidbaar zijn, Close Navigator vult de afsluitmap voor de maandafsluiting, Variance Analyst verklaart afwijkingen tussen budget en werkelijkheid, en Report Assembler stelt daaruit de maandrapportage samen die pas verschijnt na menselijke goedkeuring. Cash & Debtor Pulse kijkt periodiek naar kaspositie en openstaande facturen, Prijs- & Inkoop-Analist let op sluipende inkoopprijzen, en Forecast & Cash Runner, Business-Case Builder en Budget Composer helpen bij forecast, investeringsvoorstellen en de budgetronde. Elke collega citeert zijn bronnen en rekent zelf geen cijfers uit.",
    voorwaarde:
      "De spelregels staan in de Brain (afsluitschema, drempels, rapportformat); voor kas- en prijsbewaking is een leessleutel tot het boekhoudpakket nodig.",
    status: "live",
    bewijs:
      "engine agents/finance/ (10 YAML's; cron-ruggengraat met echte runs). Koppelingen zijn alleen-lezen; er wordt nooit geboekt.",
  },
  {
    id: "hr-team",
    wat: "Voor personeelszaken staat een vast team klaar. Verzuim- & Poortwachter-begeleider volgt bij ziekte de wettelijke stappen, Contract- & Termijnenwachter bewaakt aanzegtermijnen en proeftijden, Nalevings- & bewaartermijnwaker let op verplichtingen en bewaartermijnen, In- & Uitstroom-regisseur begeleidt de checklists rond in- en uitdiensttreding, Mutatie-koerier maakt de maandelijkse mutatielijst voor de salarisverwerker klaar, Functioneringsronde-regisseur regelt de gesprekscyclus, Handboek- & CAO-actualisator signaleert wijzigingen in cao en arbeidsrecht, Werving-assistent schrijft conceptteksten rond vacatures, en HR-Brievenbouwer maakt conceptbrieven. Alles blijft een voorstel tot een mens het goedkeurt, en elke blik in een personeelsdossier wordt vastgelegd.",
    voorwaarde:
      "Het personeelsbestand staat in de Brain; gebeurtenissen worden door een mens geopend.",
    status: "live-onbewezen",
    bewijs:
      "engine agents/hr/ (9 YAML's op origin/main; nog geen productie-run — promoten na één echte run). Beoordeelt nooit een medewerker of sollicitant.",
  },
  {
    id: "marketing-team",
    wat: "Voor marketing staat een vast team klaar. Scout Agent, Listener Agent en Market Analyst luisteren naar wat er online speelt rond concurrenten, doelgroep en markt; Market Intelligence Synthesis voegt hun vondsten samen tot een marktbriefing en Campaign Ideator maakt daar campagne-ideeën van. LinkedIn Writer, Blog Writer, Email Writer, Instagram Writer en LinkedIn Contentmaker schrijven de teksten; Image Generator en Image Editor maken en bewerken beeld in de eigen huisstijl. SEO Auditor beoordeelt teksten op vindbaarheid, en Product Rationalizer houdt het productaanbod tegen de markt aan. Niets wordt gepubliceerd zonder menselijke goedkeuring.",
    voorwaarde:
      "De Brain moet gevuld zijn met merkstem, concurrentie- en productinformatie; collega's die daarop leunen weigeren eerlijk wanneer die ontbreekt.",
    status: "live",
    bewijs:
      "engine agents/marketing/ (15 YAML's op origin/main; refine live op de vier schrijvers). Google Ads Manager hoort bij advertentiebeheer, niet hier.",
  },
  // ── Aanvullend, buiten de telling van 30 ──────────────────────────────
  {
    id: "advertentiebeheer",
    wat: "Google Ads Manager beheert campagnes en budgetten in het gekoppelde advertentiekanaal en leest de advertentieresultaten terug de vastgelegde kennis in. Elke wijziging gaat pas door na goedkeuring.",
    voorwaarde:
      "Het advertentiekanaal moet gekoppeld zijn en een beheerder keurt elke wijziging goed.",
    status: "live-onbewezen",
    bewijs:
      "engine google_ads-provider achter feature_google_ads_enabled (standaard uit); draait als test bij JobTraining. Live na de eerste betalende run.",
  },
];

/** De negatieve ruimte, v2. Nooit iets beweren dat hier tegenin gaat. */
export const NIET_MOGELIJK: readonly string[] = [
  "Het platform luistert niet mee en neemt zelf geen gesprekken op. Zonder notulist in de vergadering komt er niets binnen.",
  "Er is één notuleerdienst aangesloten. De inname is bron-neutraal gebouwd, maar suggereer nooit een keuzemenu van leveranciers.",
  "Een gesprek wordt alleen vastgelegd als minstens één deelnemer in het klantenbestand staat. Gesprekken tussen onbekende partijen worden nooit bewaard.",
  "Vastgelegde gesprekken zijn privé tot degene die notuleerde ze deelt. Het hele bedrijf kan er dus niet vanzelf bij.",
  "De zichtbaarheidsregels gelden niet voor beheerders; alleen de gevoeligheidsmarkering bindt iedereen. Zeg dus nooit dat niemand ziet wat hij niet mag zien, zonder die nuance.",
  "Geen tekstherkenning op scans of afbeeldingen: een bestand zonder tekstlaag komt leeg terug.",
  "Interne studies zijn niet anoniem. De opsteller en beheerders zien wie wat antwoordde; beloof nooit een anonieme peiling.",
  "Geen automatische bewaartermijnen of opruimrondes beloven. Wissen is een beheerdersactie, en afmelden wint altijd.",
  "Geen persoonlijk geheugen per medewerker. Personalisatie per persoon is ontworpen, niet gebouwd.",
  "Handelingen in externe systemen buiten de bestaande koppelingen zijn maatwerk, geen knop.",
  "Medische en andere gevoelige gegevens gaan er niet in.",
  "Er wordt nooit een uitspraak gedaan over hoe lang iets duurt, wat het kost of wat het bespaart.",
  "Er wordt nooit beweerd dat ons taalmodel beter of slimmer is dan het model dat zij al gebruiken. Het verschil zit in wat eromheen staat.",
  "Nooit: een aantal workflows als getal, duizenden integraties, implementatieweken of salaris-vergelijkingen.",
];

/** De ids die een rapport mag dragen: alles behalve niet-aan (ruling 14-08). */
/** Wat de ranglijst, de ingerichte keten en de andere secties mogen dragen.
 * Vooruitblik-capaciteiten zitten er bewust NIET in: de guards van die
 * secties gooien ze eruit. */
export const CAPABILITY_IDS: ReadonlySet<string> = new Set(
  CAPABILITIES.filter((c) => c.status !== "niet-aan" && !c.vooruitblik).map(
    (c) => c.id,
  ),
);

/** Wat sectie A-bis mag dragen: alles hierboven plus de vooruitblik-kaarten. */
export const VOORUITBLIK_CAPABILITY_IDS: ReadonlySet<string> = new Set(
  CAPABILITIES.filter((c) => c.status !== "niet-aan").map((c) => c.id),
);

/** De kaart als promptblok. Eén plek, zodat prompt en guard nooit uiteenlopen.
 * live én live-onbewezen praten mee; alleen niet-aan blijft buiten beeld. */
export function capabilitiesPromptBlock(
  opts: { vooruitblik?: boolean } = {},
): string {
  const kaart = CAPABILITIES.filter(
    (c) =>
      c.status !== "niet-aan" && (opts.vooruitblik === true || !c.vooruitblik),
  )
    .map((c) => `- ${c.id}: ${c.wat} VOORWAARDE: ${c.voorwaarde}`)
    .join("\n");
  const grenzen = NIET_MOGELIJK.map((r) => `- ${r}`).join("\n");
  return `## De capaciteitenkaart — het ENIGE dat je over onze mogelijkheden mag beweren\n\n${kaart}\n\n## Wat NIET kan, en dus nooit ergens in doorklinkt\n\n${grenzen}\n\nBenoemd werk: draagt een zin op een team-capaciteit (sales-team, finance-team, hr-team, marketing-team, advertentiebeheer), noem dan de betrokken workflows bij de naam die de kaart geeft (bijvoorbeeld Market Analyst, Outreach Writer, Ledger Sentinel). Dat is geen verkooppraatje maar precisie: het werk bestaat al en heeft een naam. Past een team-capaciteit bij het werk uit de ranglijst, gebruik hem dan ook als drager in plaats van alleen de algemene workflow-capaciteiten. Verzin nooit een naam die niet op de kaart staat.`;
}
