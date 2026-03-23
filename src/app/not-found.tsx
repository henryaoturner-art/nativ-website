import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 md:py-40 px-6 text-center">
      <div className="max-w-[680px] mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl text-sage/30">404</h1>
        <h2 className="font-serif text-3xl md:text-[42px] leading-tight mt-6">
          Pagina niet gevonden
        </h2>
        <p className="mt-4 text-lg font-light text-grey/60">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors"
        >
          Terug naar home →
        </Link>
      </div>
    </section>
  );
}
