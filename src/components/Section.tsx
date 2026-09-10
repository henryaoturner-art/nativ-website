import type { ReactNode } from "react";

/**
 * Sectie met het ene ritme en de ene container (B4, KAN-425): py 64/80/96px,
 * max-w 1200px, px-6. `band="sand"` markeert maximaal één sectie per pagina.
 * `hero` gebruikt het kortere hero-ritme (48/80 boven, 48/64 onder).
 */
export default function Section({
  children,
  band,
  hero = false,
  className = "",
  id,
}: {
  children: ReactNode;
  band?: "sand" | "white";
  hero?: boolean;
  className?: string;
  id?: string;
}) {
  const pad = hero ? "pt-12 lg:pt-20 pb-12 lg:pb-16" : "py-16 md:py-20 lg:py-24";
  const bg = band === "sand" ? "bg-sand" : band === "white" ? "bg-white" : "";
  return (
    <section id={id} className={`${pad} px-6 ${bg} ${className}`.replace(/\s+/g, " ").trim()}>
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </section>
  );
}
