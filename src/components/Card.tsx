import type { ReactNode } from "react";

/**
 * De kaart van het ontwerpsysteem (B3, KAN-425): wit op de crème pagina, 1px
 * Border-rand, radius 8px, geen schaduw. `signature` geeft de ene kaart per
 * sectie (bijv. de Company Brain-prijskaart) een 3px linkerlijn in Sage;
 * `primary` de ruimere padding van 32px.
 */
export default function Card({
  children,
  signature = false,
  primary = false,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  signature?: boolean;
  primary?: boolean;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const cls = [
    "bg-white border border-border rounded-lg",
    primary ? "p-6 md:p-8" : "p-5 md:p-6",
    signature ? "border-l-[3px] border-l-sage" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
