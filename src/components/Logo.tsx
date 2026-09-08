import Link from "next/link";
import Wordmark from "./Wordmark";

/**
 * The wordmark as a link to the homepage. One component for header, footer and
 * mobile menu (A1, KAN-425). `translate="no"` + `notranslate` keep Chrome's
 * translator away from it; the SVG inside has no text nodes to translate anyway.
 * Heights per brand fact: header 56px desktop / 44px mobile, footer 40px.
 */
export default function Logo({
  light = false,
  size = "header",
}: {
  light?: boolean;
  size?: "header" | "footer";
}) {
  const color = light ? "text-cream" : "text-grey";
  const height = size === "footer" ? "h-10" : "h-11 md:h-14";
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${color} no-underline notranslate`}
      translate="no"
      aria-label="nativ, naar homepage"
    >
      <Wordmark onDark={light} className={height} />
    </Link>
  );
}
