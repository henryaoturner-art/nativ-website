"use client";

import Link from "./Link";
import Logo from "./Logo";
import { useLanguage } from "@/lib/language-context";

/**
 * Footer in vier kolommen (B5, KAN-425): merk + payoff + adres, Diensten,
 * Contact, Vertrouwen. Links 15px Warm White op 80 procent, hover 100.
 * /cases staat er niet in zolang die pagina verborgen is (8 september 2026).
 */
const copy = {
  nl: {
    payoff: "Company Brain | AI Workflows",
    services: { title: "Diensten", links: [
      { href: "/scan", label: "Gratis AI-scan" },
      { href: "/diensten", label: "Diensten" },
      { href: "/workflows", label: "AI Workflows" },
      { href: "/whitepaper", label: "Whitepaper" },
    ] },
    contact: { title: "Contact", links: [
      { href: "/contact", label: "Plan een gesprek" },
      { href: "/ai-events", label: "AI Events" },
      { href: "/over-ons", label: "Over ons" },
    ] },
    trust: { title: "Vertrouwen", links: [
      { href: "/security", label: "Security & Privacy" },
      { href: "/ai-act", label: "EU AI Act" },
      { href: "/impact", label: "Impact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/algemene-voorwaarden", label: "Voorwaarden" },
    ] },
    rights: "© 2026 Nativ B.V.",
    hosting: "EU-datahosting · GDPR-compliant",
  },
  en: {
    payoff: "Company Brain | AI Workflows",
    services: { title: "Services", links: [
      { href: "/scan", label: "Free AI scan" },
      { href: "/diensten", label: "Services" },
      { href: "/workflows", label: "AI Workflows" },
      { href: "/whitepaper", label: "Whitepaper" },
    ] },
    contact: { title: "Contact", links: [
      { href: "/contact", label: "Book a call" },
      { href: "/ai-events", label: "AI Events" },
      { href: "/over-ons", label: "About us" },
    ] },
    trust: { title: "Trust", links: [
      { href: "/security", label: "Security & Privacy" },
      { href: "/ai-act", label: "EU AI Act" },
      { href: "/impact", label: "Impact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/algemene-voorwaarden", label: "Terms" },
    ] },
    rights: "© 2026 Nativ B.V.",
    hosting: "EU data hosting · GDPR-compliant",
  },
};

const linkCls = "text-[15px] text-cream/80 hover:text-cream transition-colors";

function Column({ title, links }: { title: string; links: { href: string; label: string }[]; }) {
  return (
    <div>
      <h3 className="font-serif text-lg text-cream mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const f = t(copy);

  return (
    <footer className="bg-grey text-cream/80 mt-auto" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-1">
            <Logo light size="footer" />
            <p className="mt-4 font-serif italic text-cream/80">{f.payoff}</p>
            {/* Bezoekadres (A4): The Stack sinds 4 september 2026, Brain-feit 01-identity.hq-address. */}
            <address className="mt-6 not-italic text-[15px] text-cream/80 leading-relaxed" translate="no">
              The Stack
              <br />
              Jacob Bontiusplaats 9
              <br />
              1018 LL Amsterdam
            </address>
          </div>
          <Column title={f.services.title} links={f.services.links} />
          <div>
            <h3 className="font-serif text-lg text-cream mb-4">{f.contact.title}</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@gonativ.nl" className={linkCls}>info@gonativ.nl</a>
              </li>
              {f.contact.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Column title={f.trust.title} links={f.trust.links} />
        </div>

        <div className="mt-12 pt-8 border-t border-cream/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[15px] text-cream/80">
          <span>{f.rights}</span>
          <span>{f.hosting}</span>
        </div>
      </div>
    </footer>
  );
}
