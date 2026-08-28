/**
 * Herkomst van een scan-invuller vasthouden.
 *
 * Waarom dit bestaat: overal stond alleen `gonativ.nl/scan`, in de mail, op
 * LinkedIn en op de site. Wie de scan deed kwam dus uit het niets. Met
 * `?bron=mail` achter de link weten we per scan waar hij vandaan komt.
 *
 * De code wordt bij binnenkomst in sessionStorage gezet, zodat hij overleeft
 * als iemand eerst rondkijkt op de site en pas daarna op "Start de scan" klikt.
 * Zonder dat vangnet telt precies die bezoeker niet mee.
 */

const KEY = "nativ_scan_bron";
const PARAM = "bron";

/** Codes zijn kort en saai: kleine letters, cijfers, streepje, liggend streepje. */
export function normaliseSource(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const clean = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 40);
  return clean || null;
}

/**
 * Leest `?bron=` uit de huidige URL en onthoudt hem voor deze sessie.
 * Geeft de bron terug die van toepassing is: die uit de URL, anders de
 * onthouden bron van eerder in dezelfde sessie.
 */
export function captureSource(): string | null {
  if (typeof window === "undefined") return null;
  const fromUrl = normaliseSource(new URLSearchParams(window.location.search).get(PARAM));
  try {
    if (fromUrl) {
      window.sessionStorage.setItem(KEY, fromUrl);
      return fromUrl;
    }
    return normaliseSource(window.sessionStorage.getItem(KEY));
  } catch {
    // Privémodus of geblokkeerde opslag: dan werkt alleen de URL zelf.
    return fromUrl;
  }
}
