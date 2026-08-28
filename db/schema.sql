-- Scan-datamodel — bron: nativ-workspace/gtm/scan/website-datamodel-2026-08-10.md
-- Toepassen: node --env-file=.env.local db/migrate.mjs

CREATE TABLE IF NOT EXISTS scan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  mode text NOT NULL CHECK (mode IN ('quick', 'team')),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  bank_version text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'afgerond')),
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS scan_department (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES scan(id) ON DELETE CASCADE,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS scan_respondent (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES scan(id) ON DELETE CASCADE,
  department_id uuid REFERENCES scan_department(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text,
  token text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'uitgenodigd' CHECK (status IN ('uitgenodigd', 'bezig', 'klaar')),
  invited_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS scan_answer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES scan(id) ON DELETE CASCADE,
  respondent_id uuid NOT NULL REFERENCES scan_respondent(id) ON DELETE CASCADE,
  department_id uuid NOT NULL REFERENCES scan_department(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (respondent_id, department_id, question_id)
);

CREATE TABLE IF NOT EXISTS scan_report (
  scan_id uuid PRIMARY KEY REFERENCES scan(id) ON DELETE CASCADE,
  payload jsonb NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS scan_answer_scan_idx ON scan_answer (scan_id);
CREATE INDEX IF NOT EXISTS scan_respondent_scan_idx ON scan_respondent (scan_id);
CREATE INDEX IF NOT EXISTS scan_department_scan_idx ON scan_department (scan_id);

-- 48-uursherinnering (KAN-377 punt 4): maximaal één herinnering per scan.
ALTER TABLE scan ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;

-- Taal van de invuller (wizard-keuze), zodat een rapport dat pas later wordt
-- gegenereerd (rapportpagina of cron-vangnet) en de bijbehorende mail in de
-- juiste taal komen. Voorheen was dat late pad hard Nederlands.
-- Let op: migrate.mjs splitst dit bestand op puntkomma en kent geen
-- quoting, dus houd commentaarregels vrij van puntkomma en apostrof.
ALTER TABLE scan ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'nl';

-- Herkomst van de invuller. Twee losse velden, want ze meten iets anders.
-- source     = de code achter de link (?bron=mail), dus wat wij zelf stuurden.
-- heard_about = wat de invuller zelf zegt, het enige dat de onzichtbare
-- klantreis vangt (mond-tot-mond, een presentatie, iemand die doorverwees).
ALTER TABLE scan ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE scan ADD COLUMN IF NOT EXISTS heard_about text;
