"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/lib/language-context";
import { localizeHref } from "@/lib/locale";

/**
 * next/link dat interne paden in de taal van de huidige pagina houdt
 * (A2 stap 2, KAN-425): op /en/... wordt href="/pricing" href="/en/pricing".
 * NL-only pagina's, externe links, ankers en bestanden blijven ongemoeid.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { language } = useLanguage();
  const localized = typeof href === "string" ? localizeHref(href, language) : href;
  return <NextLink href={localized} {...rest} />;
}
