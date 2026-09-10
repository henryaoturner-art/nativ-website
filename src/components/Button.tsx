import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "./Link";

/**
 * De knop van het ontwerpsysteem (B2, KAN-425). Drie varianten, één component.
 *
 * - primary:   Charcoal met Warm White tekst (contrast 8,9:1), hover Sage Dark.
 * - secondary: transparant met 1px Charcoal rand, hover Sand.
 * - tertiary:  tekstlink in Charcoal met Sage Dark onderstreping en pijl.
 *   (De brief zegt Sage Dark voor de tekst, maar dat haalt 4,36:1 op crème,
 *   net onder de norm van 4,5:1; Charcoal haalt 7,6:1 en Sage blijft accent.)
 *
 * Sage blijft accent (kickers, lijnen, prijzen), nooit meer knopvulling met
 * witte tekst (3,0:1). De pijl is het lucide-icoon, nooit het teken "→".
 * Met `href` rendert hij een Link (taalbewust), zonder href een <button>.
 */
type Variant = "primary" | "secondary" | "tertiary";

type Common = {
  variant?: Variant;
  /** Pijl-icoon na de tekst. Standaard aan voor primary en tertiary. */
  arrow?: boolean;
  /** Volle breedte (formulieren, mobiel menu). */
  full?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = Common & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };
type ButtonProps = Common & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium text-base transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey";

const variants: Record<Variant, string> = {
  primary: "h-11 md:h-12 px-6 bg-grey text-cream hover:bg-sage-dark",
  secondary: "h-11 md:h-12 px-6 border border-grey text-grey bg-transparent hover:bg-sand",
  tertiary: "text-grey underline underline-offset-4 decoration-1 decoration-sage-dark hover:decoration-grey [&>svg]:text-sage-dark",
};

function Arrow({ variant }: { variant: Variant }) {
  return (
    <ArrowRight
      size={variant === "tertiary" ? 16 : 18}
      strokeWidth={2}
      aria-hidden="true"
      className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
    />
  );
}

export default function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", arrow, full = false, className = "", children, ...rest } = props;
  const showArrow = arrow ?? variant !== "secondary";
  const cls = `${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`.replace(/\s+/g, " ").trim();
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <Arrow variant={variant} />}
    </>
  );
  if ("href" in rest && typeof rest.href === "string") {
    return (
      <Link className={cls} {...(rest as ComponentProps<typeof Link>)}>
        {content}
      </Link>
    );
  }
  const { type = "button", disabled, ...btn } = rest as ComponentProps<"button">;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${cls} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      {...btn}
    >
      {content}
    </button>
  );
}
