import { SITE_UPDATED, formatDateNL } from "@/lib/site-meta";

// Visible "last updated" line — the human-readable half of the freshness signal
// that complements the dateModified schema (GEO / AI-visibility).
export default function LastUpdated({ date = SITE_UPDATED }: { date?: string }) {
  return (
    <p className="text-sm text-grey/50">
      Laatst bijgewerkt:{" "}
      <time dateTime={date}>{formatDateNL(date)}</time>
    </p>
  );
}
