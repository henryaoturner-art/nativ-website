import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  const baseColor = light ? "text-white" : "text-grey";
  return (
    <Link href="/" className={`font-serif text-3xl md:text-4xl tracking-tight ${baseColor} no-underline`} aria-label="Nativ — naar homepage">
      n<span className="text-sage">a</span>tiv
    </Link>
  );
}
