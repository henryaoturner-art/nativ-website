"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/lib/language-context";

const navLinks = {
  nl: [
    { href: "/scan", label: "Scan" },
    { href: "/diensten", label: "Diensten" },
    { href: "/over-ons", label: "Over ons" },
    { href: "/cases", label: "Cases" },
    { href: "/pricing", label: "Pricing" },
  ],
  en: [
    { href: "/scan", label: "Scan" },
    { href: "/diensten", label: "Services" },
    { href: "/over-ons", label: "About" },
    { href: "/cases", label: "Cases" },
    { href: "/pricing", label: "Pricing" },
  ],
};

const ctaText = { nl: "Plan een gesprek →", en: "Book a call →" };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = t(navLinks);
  const cta = t(ctaText);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-20 md:h-24" aria-label="Hoofdnavigatie">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-light tracking-wide transition-colors hover:text-sage ${
                pathname === link.href ? "text-sage" : "text-grey"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <Link
            href="/contact"
            className="bg-sage text-white text-sm px-6 py-2.5 rounded-lg hover:bg-sage-dark transition-colors"
          >
            {cta}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-grey"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-sage-light">
          <div className="px-6 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-base transition-colors hover:text-sage ${
                  pathname === link.href ? "text-sage" : "text-grey"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2">
              <LanguageToggle />
            </div>
            <Link
              href="/contact"
              className="block bg-sage text-white text-center px-6 py-3 rounded-lg hover:bg-sage-dark transition-colors mt-4"
            >
              {cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
