"use client";

import { useState, useEffect } from "react";
import Link from "@/components/Link";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/lib/language-context";
import { stripLocale } from "@/lib/locale";

const navLinks = {
  nl: [
    { href: "/scan", label: "AI Scan" },
    { href: "/diensten", label: "Diensten" },
    { href: "/workflows", label: "AI Workflows" },
    { href: "/over-ons", label: "Over ons" },
    { href: "/ai-events", label: "AI Events" },
    { href: "/pricing", label: "Pricing" },
  ],
  en: [
    { href: "/scan", label: "AI Scan" },
    { href: "/diensten", label: "Services" },
    { href: "/workflows", label: "AI Workflows" },
    { href: "/over-ons", label: "About" },
    { href: "/ai-events", label: "AI Events" },
    { href: "/pricing", label: "Pricing" },
  ],
};

// Header-CTA is de gratis AI-scan, de voordeur sinds 2 september (beslissing D-1,
// KAN-425). De whitepaper blijft bereikbaar als tekstlink in het mobiele menu en in de footer.
const ctaText = { nl: "Doe de gratis AI-scan", en: "Take the free AI scan" };
const whitepaperText = { nl: "Download de whitepaper", en: "Download the whitepaper" };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();
  // Actieve link vergelijken zonder /en-voorvoegsel (A2 stap 2, KAN-425).
  const currentPath = stripLocale(pathname ?? "/").path;

  const links = t(navLinks);
  const cta = t(ctaText);
  const whitepaper = t(whitepaperText);

  useEffect(() => {
    // Any scroll at all makes the bar opaque: content starts directly below the
    // header, so a translucent bar at scrollY 1..20 let text bleed through it.
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cream border-b border-sage-light"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-20 md:h-24" aria-label={language === "en" ? "Main navigation" : "Hoofdnavigatie"}>
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide text-grey transition-colors underline-offset-8 decoration-2 decoration-sage hover:underline ${
                currentPath === link.href ? "font-semibold underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <Button href="/scan">{cta}</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-grey"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen
              ? language === "en" ? "Close menu" : "Menu sluiten"
              : language === "en" ? "Open menu" : "Menu openen"
          }
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
                className={`block text-base text-grey transition-colors underline-offset-8 decoration-2 decoration-sage hover:underline ${
                  currentPath === link.href ? "font-semibold underline" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2">
              <LanguageToggle />
            </div>
            <Button className="mt-4" href="/scan" full>
              {cta}
            </Button>
            <div className="pt-2">
              <Button variant="tertiary" href="/whitepaper">
                {whitepaper}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
