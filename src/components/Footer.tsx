"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/lib/language-context";

const footerTranslations = {
  nl: {
    tagline: "Je bedrijf weet meer dan je denkt.",
    servicesTitle: "Diensten",
    services: [
      { href: "/scan", label: "AI Opportunity Scan" },
      { href: "/diensten", label: "AI Kennisbank" },
      { href: "/diensten", label: "Digitale Collega\u2019s" },
      { href: "/impact", label: "Impact" },
      { href: "/security", label: "Security & Privacy" },
    ],
    contactTitle: "Contact",
    planCall: "Plan een gesprek",
    privacy: "Privacy",
    terms: "Voorwaarden",
  },
  en: {
    tagline: "Your company knows more than you think.",
    servicesTitle: "Services",
    services: [
      { href: "/scan", label: "AI Opportunity Scan" },
      { href: "/diensten", label: "AI Knowledge Base" },
      { href: "/diensten", label: "Digital Colleagues" },
      { href: "/impact", label: "Impact" },
      { href: "/security", label: "Security & Privacy" },
    ],
    contactTitle: "Contact",
    planCall: "Book a call",
    privacy: "Privacy",
    terms: "Terms",
  },
};

export default function Footer() {
  const { t } = useLanguage();
  const f = t(footerTranslations);

  return (
    <footer className="bg-grey text-white/80 mt-auto" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-4 text-white/60 text-sm font-light leading-relaxed max-w-xs">
              {f.tagline}
            </p>
            <p className="mt-6 text-white/40 text-xs">
              © 2026 Nativ B.V. All rights reserved.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h3 className="font-serif text-white text-base mb-4">{f.servicesTitle}</h3>
            <ul className="space-y-2 text-sm">
              {f.services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-white/60 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white text-base mb-4">{f.contactTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@gonativ.nl" className="text-white/60 hover:text-white transition-colors">
                  info@gonativ.nl
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  {f.planCall}
                </Link>
              </li>
              <li className="text-white/60">Amsterdam, NL</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="/security" className="hover:text-white/70 transition-colors">{f.privacy}</Link>
            <Link href="/security" className="hover:text-white/70 transition-colors">{f.terms}</Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>🇪🇺 EU Data</span>
            <span>·</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
