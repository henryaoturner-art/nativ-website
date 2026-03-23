import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-grey text-white/80 mt-auto" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-4 text-white/60 text-sm font-light leading-relaxed max-w-xs">
              Je bedrijf weet meer dan je denkt.
            </p>
            <p className="mt-6 text-white/40 text-xs">
              © 2026 NiftyAI B.V.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h3 className="font-serif text-white text-base mb-4">Diensten</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/scan" className="text-white/60 hover:text-white transition-colors">
                  AI Opportunity Scan
                </Link>
              </li>
              <li>
                <Link href="/diensten" className="text-white/60 hover:text-white transition-colors">
                  AI Kennisbank
                </Link>
              </li>
              <li>
                <Link href="/diensten" className="text-white/60 hover:text-white transition-colors">
                  Digitale Collega&apos;s
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-white/60 hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-white/60 hover:text-white transition-colors">
                  Security & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white text-base mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@gonativ.nl" className="text-white/60 hover:text-white transition-colors">
                  info@gonativ.nl
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  Plan een gesprek
                </Link>
              </li>
              <li className="text-white/60">Amsterdam, NL</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="/security" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-white/70 transition-colors">Voorwaarden</Link>
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
