import type { ReactNode } from "react";

/** Kicker boven een kop (B1, KAN-425): General Sans 600, 12px, hoofdletters, 0,12em, Sage Dark, 12px eronder. */
export default function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.12em] text-sage-dark mb-3 ${className}`}>{children}</p>;
}
