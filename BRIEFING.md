# NATIV Website Briefing Document
## gonativ.nl — Complete Build Specification

**Version:** 1.0 | **Date:** 2026-03-23 | **Status:** Ready for development
**Legal entity:** NiftyAI B.V. | **Domain:** gonativ.nl

---

## TABLE OF CONTENTS

1. [Brand Foundation](#1-brand-foundation)
2. [Design System](#2-design-system)
3. [Sitemap & Navigation](#3-sitemap--navigation)
4. [Page-by-Page Specification](#4-page-by-page-specification)
5. [Open Decisions](#5-open-decisions)
6. [Technical Requirements](#6-technical-requirements)

---

## 1. BRAND FOUNDATION

### Identity
- **Name:** NATIV (display as "Nativ" in logo, "NATIV" in running text when emphasizing brand)
- **Tagline:** "Je bedrijf weet meer dan je denkt."
- **Product name:** InsightFlow (the underlying technology/platform)
- **AI agents term:** "Digitale collega's" (never "AI agents" or "bots")
- **Bundel naming:** "Deep Dives" (replaces "Packs")

### Positioning
**For:** Mid-market managers and executives (50–500 FTE) who know AI matters but can't make it work yet.

**Problem:** AI tools are powerful but useless without the right business context. Most companies have scattered knowledge across people's heads, emails, and legacy systems.

**Solution:** Nativ builds and maintains your AI Operating System — structured business knowledge that makes AI agents actually deliver.

**Differentiator:** Not another AI tool vendor. Not a traditional consultancy charging €30k+. We're the bridge — consulting methodology at software speed and price.

### Voice & Tone
- Direct, confident, slightly provocative
- Like a smart friend who knows enterprise AI
- Dutch-first. No jargon. Short sentences.
- Nuchter, scherp, eerlijk, hands-on.
- **DO:** State facts plainly. Be helpful. Be sharp.
- **DON'T:** Chest-thump. Brag. Make it sound small (avoid "I think I saw that in an email somewhere" type hooks).

### Reference Copy (use as tone benchmark)
> "Laten we eerlijk zijn: de meeste bedrijven verspillen 40% van hun potentieel omdat cruciale informatie vastzit in de hoofden van mensen, verspreid over inboxes of begraven in spreadsheets."

> "Bij NATIV werken we met drie man als dertig. Niet door harder te werken, maar door AI-native te zijn."

> "We bouwen digitale collega's die niet zomaar wat roepen, maar die putten uit de collectieve intelligentie van jouw bedrijf."

> "Stop met gokken. Stop met zoeken."

---

## 2. DESIGN SYSTEM

### Aesthetic
Scandinavisch minimalisme. Premium consulting feel. Think Kinfolk / Cereal Magazine. Less is more. Generous whitespace. Let content breathe.

### Colors
| Role | Color | Hex |
|------|-------|-----|
| Primary / Accent | Sage green | `#8B9A6B` |
| Text / Dark | Warm grey | `#4A4A48` |
| Background | Warm cream | `#F2EDE4` |
| White (cards, overlays) | Pure white | `#FFFFFF` |
| Light accent (borders, dividers) | Sage light | `#8B9A6B` at 15% opacity |
| Success / positive | Same sage | `#8B9A6B` |
| Error / negative | Muted red | `#C46B6B` |

### Typography
- **Headings:** Georgia or similar serif. Elegant, editorial feel.
- **Body:** Light sans-serif (Inter, or see Open Decision #5). Weight 300–400.
- **Accents/quotes:** Georgia italic.
- **Sizes (desktop):** H1: 56–64px / H2: 36–42px / H3: 24–28px / Body: 17–18px / Small: 14px
- **Line height:** 1.6 for body, 1.2 for headings

### Logo
- "nativ" wordmark in serif font, all lowercase
- The "a" rendered in accent sage green `#8B9A6B`, rest in warm grey `#4A4A48`
- On dark backgrounds: white with green "a"
- Minimum size: 80px wide
- Clear space: 1× height of the "n" on all sides

### Layout Principles
- Max content width: 1200px
- Generous padding: 80–120px vertical sections (desktop), 48–64px (mobile)
- Grid: 12-column, with most content in center 8 columns
- Images: Muted, desaturated photography or none. No stock photos of "business people shaking hands." Abstract, warm, natural textures preferred (think: linen, wood grain, soft-focus nature).
- Icons: Minimal line icons if needed. Prefer no icons over bad icons.
- Animations: Subtle fade-in on scroll. No bouncing, no parallax. Content appears gently.

### Components
- **Buttons (primary):** Sage green bg, white text, rounded corners (8px), generous padding (16px 32px)
- **Buttons (secondary):** Outlined, sage green border, sage green text, transparent bg
- **Cards:** White bg, subtle shadow (0 2px 8px rgba(0,0,0,0.06)), rounded corners (12px)
- **Comparison table:** Two-column, old world (muted/greyed) vs Nativ (highlighted)
- **Trust badges:** Small, inline, grey-toned. EU flag, GDPR shield, lock icon.
- **Navigation:** Clean top bar, logo left, links right, single CTA button. Sticky on scroll. No hamburger on desktop.

---

## 3. SITEMAP & NAVIGATION

### Primary Navigation
```
[Logo: nativ]                    Scan    Diensten    Over ons    Cases    Pricing    [Plan een gesprek →]
```

### Pages
| Path | Page | Priority |
|------|------|----------|
| `/` | Homepage | Must-have |
| `/scan` | AI Opportunity Scan | Must-have |
| `/diensten` | Services overview | Must-have |
| `/over-ons` | About / Team | Must-have |
| `/cases` | Client stories | Should-have (launch with 1–2) |
| `/pricing` | Pricing | Must-have |
| `/contact` | Contact + booking | Must-have |
| `/blog` | Blog/insights | Nice-to-have (post-launch) |

### Footer
```
nativ                          Diensten                Contact
Je bedrijf weet meer           · AI Opportunity Scan   · info@gonativ.nl
dan je denkt.                  · AI Kennisbank         · [Calendar link]
                               · Digitale Collega's    · Amsterdam, NL
© 2026 NiftyAI B.V.
[Privacy] [Voorwaarden]        [LinkedIn] [Twitter]

🇪🇺 EU Data · GDPR Compliant
```

---

## 4. PAGE-BY-PAGE SPECIFICATION

---

### 4.1 HOMEPAGE (`/`)

**Purpose:** First impression. Communicate what Nativ does, for whom, and why it's different. Drive visitors to Scan (entry product) or contact.

---

#### Section 1: Hero

**Key message:** Your company knows more than you think. We unlock it.

**Copy (Dutch):**
```
[H1] Je bedrijf weet meer dan je denkt.

[Subtitle] Cruciale kennis zit vast in hoofden, inboxes en spreadsheets.
Nativ maakt die kennis toegankelijk — zodat AI écht waarde levert.

[CTA primary] Plan een vrijblijvend gesprek →
[CTA secondary] Bekijk onze aanpak
```

**Design notes:**
- Full-width, warm cream background
- H1 large, Georgia serif, centered
- Subtitle in sans-serif, lighter weight
- Two CTAs centered below
- Optional: subtle background texture (linen/paper grain)
- No hero image. Let the typography speak.
- Below hero: a single thin sage-green line as divider

---

#### Section 2: Problem Statement

**Key message:** The problem is real, specific, and costly.

**Copy (Dutch):**
```
[H2] Het probleem dat niemand benoemt

De meeste bedrijven verspillen 40% van hun potentieel.

Niet door slechte mensen. Niet door slechte tools.
Maar omdat cruciale informatie vastzit in de hoofden van mensen,
verspreid over inboxes, of begraven in spreadsheets.

AI kan helpen. Maar alleen als het wéét wat jouw bedrijf weet.
```

**Design notes:**
- Left-aligned text, max-width 680px, centered on page
- Short paragraphs. Let the whitespace carry weight.
- No image needed. Pure typography.

---

#### Section 3: Three-Step Journey

**Key message:** Our approach is structured, clear, and progressive.

**Copy (Dutch):**
```
[H2] Hoe we werken

[Step 1]
Scan
We scannen waar AI de meeste waarde creëert in jouw organisatie.
→ In 1 week weet je precies waar de kansen liggen.

[Step 2]
Build
We bouwen je AI-kennisbank — de context die AI écht nuttig maakt.
→ Jouw bedrijfskennis, gestructureerd en toegankelijk.

[Step 3]
Deploy
We zetten digitale collega's in die echt werk leveren.
→ Geen speelgoed. Geen demo's. Resultaat.
```

**Design notes:**
- Three columns on desktop, stacked on mobile
- Each step: large number (1, 2, 3) in sage green, title in Georgia serif, description in sans-serif
- Subtle connecting line between steps (horizontal on desktop, vertical on mobile)
- Clean, editorial layout

**CTA:** `Start met een Scan →` (links to /scan)

---

#### Section 4: Comparison Table

**Key message:** We're not consultants. We're not just a tool. We're the bridge.

**Copy (Dutch):**
```
[H2] Waarom bedrijven switchen

            Traditioneel adviesbureau          Nativ
Kosten      €30.000 – €80.000                  Vanaf €495
Doorlooptijd 4–8 weken                         1 week
Resultaat    PDF die op de plank belandt        Levende kennisbank
Updates      Eenmalige snapshot                 Continu bijgewerkt
```

**Design notes:**
- Two-column table
- Left column (old world): greyed out, muted styling, line-through or faded
- Right column (Nativ): full color, sage green accents, bold values
- Simple, clean table — no heavy borders

---

#### Section 5: Trust Signals

**Key message:** We're serious, safe, and proven.

**Copy (Dutch):**
```
[Badges row]
🇪🇺 EU Data Hosting  ·  🔒 GDPR Compliant  ·  🤝 No Cure, No Pay

[Optional testimonial quote]
"[Client quote when available]"
— Naam, Functie, Bedrijf
```

**Design notes:**
- Centered row of small badges/icons
- Muted, understated — trust, not flash
- Testimonial in Georgia italic if available, skip section if not yet

---

#### Section 6: CTA / Closer

**Key message:** Low-threshold next step.

**Copy (Dutch):**
```
[H2] Klaar om te ontdekken wat jouw bedrijf écht weet?

Plan een vrijblijvend gesprek. Geen verkooppraatje — gewoon een eerlijk gesprek
over wat AI voor jouw organisatie kan betekenen.

[CTA] Plan een gesprek →
```

**Design notes:**
- Warm cream background or slightly darker shade
- Centered, generous whitespace
- Single prominent CTA button

---

### 4.2 SCAN PAGE (`/scan`)

**Purpose:** Product page for the entry-level offering. This is the primary conversion page. Visitors should understand what they get, what it costs, and book immediately.

---

#### Section 1: Hero

**Copy (Dutch):**
```
[H1] AI Opportunity Scan

[Subtitle] In één week weten waar AI het meeste oplevert in jouw organisatie.
Concreet. Actionable. Geen vaag advies.

[CTA] Plan je Scan →
[Subtext] Vanaf €495 · No cure, no pay
```

**Design notes:**
- Similar layout to homepage hero but more product-focused
- Price prominent but not screaming

---

#### Section 2: What You Get

**Copy (Dutch):**
```
[H2] Wat je krijgt

· Een complete analyse van AI-kansen in jouw organisatie
· Prioritering op basis van impact én haalbaarheid
· Concrete eerste stappen — geen PowerPoint, maar een plan
· Persoonlijke toelichting van ons team

Doorlooptijd: 1 week
Format: Interactief rapport + persoonlijke sessie
```

**Design notes:**
- Left-aligned, clean list
- No fancy cards — just clear text
- Maybe a subtle sidebar or callout for "Doorlooptijd: 1 week"

---

#### Section 3: How It Works

**Copy (Dutch):**
```
[H2] Zo werkt het

Dag 1–2: Intake
We leren je organisatie kennen. Korte gesprekken, toegang tot bestaande documentatie.

Dag 3–5: Analyse
Onze AI analyseert jouw processen, data en kennisstromen. Wij interpreteren de resultaten.

Dag 5–7: Oplevering
Je ontvangt een helder rapport met geprioriteerde AI-kansen en een concreet actieplan.
```

**Design notes:**
- Timeline layout, vertical
- Day markers in sage green

---

#### Section 4: Pricing

**Copy (Dutch):**
```
[H2] Investering

Deep Dive (Pre-Packaged)          Deep Dive (Bespoke)
€495                               €2.500
Gestandaardiseerde analyse          Volledig op maat
Ideaal als startpunt                Voor complexe organisaties

Beide opties: No cure, no pay.
Niet tevreden? Je betaalt niets.
```

**Design notes:**
- Two cards side by side
- "No cure, no pay" as a badge/banner across both

**CTA:** `Plan je Scan →`

---

#### Section 5: FAQ

**Copy (Dutch):**
```
[H2] Veelgestelde vragen

Wat heb ik nodig om te starten?
→ Niets bijzonders. Toegang tot relevante documentatie en 30 minuten van je tijd voor een intake.

Hoe zit het met mijn data?
→ Alle data blijft binnen de EU. Wij zijn volledig GDPR-compliant. Na afloop kun je kiezen of we data bewaren of verwijderen.

Wat als het niets oplevert?
→ Dan betaal je niets. No cure, no pay. Simpel.

Kan ik daarna verder met Nativ?
→ Ja. De Scan is stap 1 van ons drielaags model. Na de Scan kun je doorpakken met een AI-kennisbank en digitale collega's.
```

**Design notes:**
- Accordion/expandable FAQ
- Clean, simple interactions

---

### 4.3 DIENSTEN PAGE (`/diensten`)

**Purpose:** Full overview of the three-layer journey. For visitors who want to understand the complete picture before committing.

---

#### Section 1: Hero

**Copy (Dutch):**
```
[H1] Van inzicht naar impact

[Subtitle] Drie stappen. Van eerste scan tot werkende digitale collega's.
Elk op je eigen tempo.
```

---

#### Section 2: Layer 1 — Scan

**Copy (Dutch):**
```
[H2] Stap 1: Scan

We scannen waar AI de meeste waarde creëert in jouw organisatie.

Je weet dat AI belangrijk is. Maar waar begin je? Onze AI Opportunity Scan brengt
in één week in kaart waar de grootste kansen liggen. Geen vage beloftes —
concrete, geprioriteerde mogelijkheden.

Wat je krijgt:
· AI-kansenanalyse op maat
· Prioritering op impact en haalbaarheid
· Concreet actieplan

Doorlooptijd: 1 week | Vanaf €495 | No cure, no pay
```

**CTA:** `Start met een Scan →` (links to /scan)

---

#### Section 3: Layer 2 — Build

**Copy (Dutch):**
```
[H2] Stap 2: Build

We bouwen je AI-kennisbank — de context die AI écht nuttig maakt.

AI-tools zijn krachtig. Maar zonder de juiste context zijn ze nutteloos.
Wij structureren de kennis die in jouw organisatie leeft — in hoofden, systemen,
processen — tot een levende kennisbank die AI begrijpt.

Dit is het fundament. Zonder dit stap is elke AI-investering een gok.

Wat je krijgt:
· Gestructureerde bedrijfskennis, toegankelijk voor AI
· Integratie met bestaande systemen
· Continue updates — geen eenmalige snapshot

Doorlooptijd: 2–6 weken | Op maat
```

**CTA:** `Meer weten →` (links to /contact)

---

#### Section 4: Layer 3 — Deploy

**Copy (Dutch):**
```
[H2] Stap 3: Deploy

We zetten digitale collega's in die echt werk leveren.

Geen chatbot die "ik weet het niet" zegt. Digitale collega's die putten uit
de collectieve intelligentie van jouw bedrijf. Die taken overnemen, vragen
beantwoorden en processen versnellen — met context.

Wat je krijgt:
· AI-agents op maat, gevoed door jouw kennisbank
· Integratie in bestaande workflows
· Meetbare resultaten

Doorlooptijd: doorlopend | Op maat
```

**CTA:** `Plan een gesprek →`

---

#### Section 5: Why This Order Matters

**Copy (Dutch):**
```
[H2] Waarom deze volgorde?

De meeste AI-projecten falen niet door slechte technologie.
Ze falen omdat de basis ontbreekt.

Scan → Build → Deploy.
Elke stap bouwt voort op de vorige.
Je kunt bij stap 1 instappen en op elk moment stoppen.
Geen lock-in. Geen verplichtingen.
```

---

### 4.4 OVER ONS PAGE (`/over-ons`)

**Purpose:** Build trust and connection. Show the humans behind Nativ.

---

#### Section 1: Hero

**Copy (Dutch):**
```
[H1] Wij zijn Nativ

[Subtitle] Drie man. Dertig man output.
Niet door harder te werken — door AI-native te zijn.
```

---

#### Section 2: Story

**Copy (Dutch):**
```
[H2] Waarom Nativ bestaat

We zagen het steeds weer. Bedrijven die duizenden euro's uitgeven aan AI-tools.
Die er vervolgens niets mee doen. Niet omdat de tools slecht zijn — maar omdat
niemand de bedrijfskennis had gestructureerd die AI nodig heeft om nuttig te zijn.

Consultants vragen €30K+ voor een PDF. AI-vendors verkopen tools zonder context.
Daar tussenin zit een gat. Dat gat zijn wij.

Nativ bouwt de brug tussen wat je bedrijf weet en wat AI kan.
```

---

#### Section 3: Team

**Copy (Dutch):**
```
[H2] Het team

[Team member 1]
Naam + Rol
Korte bio (2-3 zinnen)

[Team member 2]
Naam + Rol
Korte bio (2-3 zinnen)

[Team member 3]
Naam + Rol
Korte bio (2-3 zinnen)
```

**Design notes:**
- Simple grid, 3 columns
- Professional but warm photos (not corporate headshots — think: natural light, casual setting)
- Name in Georgia serif, role in sans-serif
- No LinkedIn icons cluttering the layout — link from the name if needed

---

#### Section 4: How We Work

**Copy (Dutch):**
```
[H2] Hoe wij werken

We practice what we preach. Ons eigen bedrijf draait op dezelfde principes
die we aan klanten leveren. Alles wat we bouwen, testen we eerst op onszelf.

· AI-native sinds dag één
· Lean team, grote output
· Eerlijk over wat AI wel en niet kan
```

---

### 4.5 CASES PAGE (`/cases`)

**Purpose:** Social proof. Show real results.

**Note for dev:** Launch with 1–2 cases. Design the page to scale to 6–10.

---

#### Section 1: Hero

**Copy (Dutch):**
```
[H1] Wat we've gebouwd

[Subtitle] Echte resultaten bij echte bedrijven.
```

---

#### Section 2: Case Cards

**Design notes:**
- Grid of cards (2 columns desktop, 1 mobile)
- Each card: company name (anonymized if needed), industry tag, one-line result, link to full case
- Full case page: Problem → Approach → Result → Quote
- Keep it short. One page per case max.

**Template per case:**
```
[Industry tag] · [Company size]

[H3] [Headline result — e.g. "Van 3 dagen naar 3 uur: kennisdeling bij een groeiend techbedrijf"]

De uitdaging:
[2-3 zinnen]

Onze aanpak:
[2-3 zinnen, referencing Scan → Build → Deploy]

Het resultaat:
[Concrete, measurable outcomes]

[Optional quote from client]
```

**Placeholder if no cases ready:**
```
[H2] We werken aan onze eerste cases.

Wil je de eerste zijn? Plan een gesprek en we maken er samen een succesverhaal van.

[CTA] Plan een gesprek →
```

---

### 4.6 PRICING PAGE (`/pricing`)

**Purpose:** Transparent pricing. Remove friction. Let people self-qualify.

---

> ⚠️ **OPEN DECISION: Which pricing model to use?**
> Present BOTH options below. Team must decide before development.

---

#### OPTION A: Simple Two-Tier (current site model, evolved)

**Copy (Dutch):**
```
[H1] Eerlijke prijzen

[Subtitle] Geen verborgen kosten. Geen urenfabriek. Je weet vooraf wat je betaalt.

[Tier 1]
Deep Dive — Standaard
€495
· AI Opportunity Scan
· Geprioriteerde kansenanalyse
· Concreet actieplan
· Oplevering in 1 week
· No cure, no pay

[CTA] Start je Scan →

[Tier 2]
Deep Dive — Op Maat
€2.500
· Volledig maatwerk analyse
· Diepte-interviews met stakeholders
· Uitgebreid rapport + strategisch advies
· Persoonlijke presentatie
· No cure, no pay

[CTA] Plan een intake →

[Below tiers]
Vervolg: Build & Deploy
Na je Deep Dive kun je doorpakken met een AI-kennisbank en digitale collega's.
Prijzen op maat — we bespreken het na je Scan.

[CTA] Meer weten? Plan een gesprek →
```

---

#### OPTION B: Three-Tier Subscription Model

**Copy (Dutch):**
```
[H1] Eerlijke prijzen

[Subtitle] Van eerste scan tot volledig AI-systeem. Kies wat bij je past.

[Tier 1]
Quick Start
€2.500–5.000 setup + €500–800/mo
· AI Opportunity Scan
· RAG op bestaande documentatie
· Basis kennisbank
· Standaard integraties
Ideaal voor: Teams die snel willen starten

[Tier 2] ← highlighted as "Meest gekozen"
Professional
€10.000–15.000 setup + €1.500–2.500/mo
· Alles van Quick Start
· Gestructureerde diagnostische intake
· Tacit knowledge extractie
· Digitale collega's (tot 3)
· Maandelijkse optimalisatie
Ideaal voor: Groeiende organisaties (50-200 FTE)

[Tier 3]
Enterprise
Vanaf €25.000 setup + €3.500–5.000/mo
· Alles van Professional
· Volledig Company Brain
· Custom integraties
· Onbeperkt digitale collega's
· Dedicated support
Ideaal voor: Grote organisaties (200+ FTE)

Alle plannen: No cure, no pay op de initiële Scan.
```

---

#### Section below pricing (both options):

**Copy (Dutch):**
```
[H2] Veelgestelde vragen over pricing

Wat als ik halverwege wil stoppen?
→ Geen lock-in. Je kunt maandelijks opzeggen.

Zijn er extra kosten voor AI-gebruik?
→ Nee. Genereus gebruik zit in elk plan. Bij uitzonderlijk hoog volume bespreken we het.

Kan ik upgraden?
→ Ja, op elk moment. Je bestaande kennisbank groeit gewoon mee.

Wat zit er niet in de prijs?
→ Custom integraties met legacy systemen kunnen extra kosten met zich meebrengen. We zijn daar altijd transparant over.
```

---

### 4.7 CONTACT PAGE (`/contact`)

**Purpose:** Convert intent to conversation. Minimal friction.

---

**Copy (Dutch):**
```
[H1] Laten we praten

[Subtitle] Geen verkooppraatje. Gewoon een eerlijk gesprek over wat AI
voor jouw organisatie kan betekenen.

[Left column: Calendar embed]
Plan direct een gesprek
→ Calendly/Cal.com embed (30 min, free)

[Right column: Simple form]
Of stuur een bericht
· Naam
· Email
· Bedrijf
· Bericht (optional)
[Verzenden]

[Below]
Of mail ons direct: info@gonativ.nl
Amsterdam, Nederland
```

**Design notes:**
- Two-column layout: calendar left, form right
- Mobile: calendar on top, form below
- Keep form minimal — 4 fields max
- No phone number field (we don't do phone sales)

---

### 4.8 BLOG PAGE (`/blog`) — Post-Launch

**Purpose:** SEO, thought leadership, content marketing.

**Design notes:**
- Simple grid of cards
- Each card: title, date, 1-line excerpt, read time
- Clean article template with Georgia headings, generous whitespace
- No sidebar. No related posts widget. Just the content.
- Categories: optional tags (AI, Strategie, Kennismanagement)

---

## 4B. ADDITIONAL DECISIONS (resolved 23 Mar 2026)

| # | Decision | Outcome |
|---|----------|---------|
| 1 | Social handles | **@gonativ** |
| 2 | Email domain | **@gonativ.nl** |
| 3 | insightflow.info | Redirect to gonativ.nl (TBD implementation) |
| 4 | Website language | **Bilingual — Dutch primary, English secondary** |
| 5 | Typography | **New sans-serif (General Sans or Satoshi) + Georgia serif accent** — NOT Inter |
| 6 | Logo | **"nativ" lowercase wordmark, green "a", serif font** — as per moodboard |
| 7 | Pricing model | **3-tier, publicly shown on website** |
| 8 | Pricing publicly | **Yes** |
| 9 | Charity/Impact page | **Keep** from current site |
| 10 | Security page | **Keep** from current site |
| 11 | Sitemap | 10 pages: /, /scan, /diensten, /over-ons, /cases, /pricing, /impact, /security, /contact, /blog |

### Pricing Tiers (public on website)
| Tier | Setup (eenmalig) | Maandelijks |
|------|-------------------|-------------|
| Quick Start | €2.500 – €5.000 | €500 – €800/mo |
| Professional | €10.000 – €15.000 | €1.500 – €2.500/mo |
| Enterprise | €25.000+ | €3.500 – €5.000/mo |

### Renske's Feedback (applied to all copy)
- ✅ NATIV as name: strong
- ❌ No chest-thumping / borstklopperij
- ✅ "Info stuck in people's heads" angle: strong
- ❌ Avoid the email hook ("ik zag dat ergens in een mail") — makes it feel small

---

## 5. OPEN DECISIONS (remaining)

> **These must be resolved before or during development. Flag prominently.**

| # | Decision | Options | Impact |
|---|----------|---------|--------|
| 1 | Social handles | @gonativ / @nativ_nl / @nativai | Footer, meta tags |
| 2 | Email domain | @gonativ.nl / keep @insightflow.info | Contact page, footer |
| 3 | insightflow.info fate | Redirect to gonativ.nl? Keep separate? | DNS, SEO |
| 4 | Primary language | Dutch only / Dutch + English toggle | All copy, URL structure |
| 5 | Body typeface | Keep Inter / switch to another sans | All pages |
| 6 | Logo format | Wordmark only / wordmark + icon (favicon) | Nav, favicon, social |
| 7 | Pricing model | Option A (simple 2-tier) / Option B (3-tier subscription) | /pricing page |
| 8 | Public pricing | Show prices / "contact us" for Build & Deploy | /pricing, /diensten |

---

## 6. TECHNICAL REQUIREMENTS

### Stack Recommendations
- Static site or Jamstack (Next.js, Astro, or similar)
- No CMS needed initially — can add later for blog
- Host on Vercel or Netlify (fast, EU CDN)
- Forms: Formspree, Netlify Forms, or similar
- Calendar: Calendly or Cal.com embed
- Analytics: Plausible or Fathom (privacy-first, no cookie banner needed)

### Performance
- Lighthouse score: 95+ on all metrics
- No heavy JS frameworks for a mostly-static site
- Optimize images (WebP, lazy loading)
- Above-the-fold content renders without JS

### SEO
- Clean semantic HTML
- Meta descriptions for all pages (Dutch)
- Open Graph tags for social sharing
- Structured data (Organization, Service)
- Sitemap.xml + robots.txt
- `lang="nl"` on html tag

### Accessibility
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text on all images
- Keyboard navigable
- Sufficient color contrast (verify sage green on cream passes AA)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768–1024px
- Desktop: > 1024px
- Max content width: 1200px

### Domain & DNS
- Primary: gonativ.nl
- Redirect: www.gonativ.nl → gonativ.nl
- SSL: Required (auto via hosting provider)
- Consider: gonativ.com if available (redirect to .nl)

---

## APPENDIX A: COMPARISON TABLE (ready to implement)

| | Traditioneel adviesbureau | Nativ |
|---|---|---|
| **Kosten** | €30.000 – €80.000 | Vanaf €495 |
| **Doorlooptijd** | 4–8 weken | 1 week |
| **Resultaat** | PDF die op de plank belandt | Levende kennisbank |
| **Updates** | Eenmalige snapshot | Continu bijgewerkt |

Style: Left column muted/faded. Right column highlighted with sage green accents.

---

## APPENDIX B: ELEMENTS FROM CURRENT SITE

### Keep ✅
- "No Cure No Pay" messaging — use as badge/banner on pricing and scan pages
- EU Data / GDPR badges — footer + trust signals section
- Consultant vs. Nativ comparison table — evolved into comparison table above

### Evolve 🔄
- Hero: Broaden from "diagnostic packs" to full AI Operating System narrative
- "How It Works": Now Scan → Build → Deploy (three-layer journey)

### Drop ❌
- "500+ packs" claim — no longer accurate, remove completely
- Any InsightFlow branding on customer-facing pages (keep as internal product name only)

---

## APPENDIX C: CONTENT CHECKLIST

Before launch, verify all pages have:
- [ ] Dutch copy finalized and proofread
- [ ] Meta title + description (Dutch)
- [ ] Open Graph image (1200×630, branded)
- [ ] Mobile responsive layout
- [ ] Working CTAs with correct links
- [ ] Calendar booking integration tested
- [ ] Contact form tested
- [ ] GDPR/privacy policy page linked
- [ ] Cookie consent (if analytics requires it)
- [ ] 404 page (branded, helpful)
- [ ] Favicon (Nativ "n" or green "a")

---

*End of briefing document. Questions? Plan een gesprek.*
