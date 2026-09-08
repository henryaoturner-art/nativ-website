import { notFound } from "next/navigation";

/**
 * Vangnet onder app/[locale] (A2 stap 2, KAN-425): elk pad dat geen pagina is,
 * rendert de not-found van deze taal met status 404.
 */
export default function CatchAll() {
  notFound();
}
