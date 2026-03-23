import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";

const posts: Record<
  string,
  { title: string; date: string; readTime: string; tag: string; content: string[] }
> = {
  "waarom-ai-zonder-context-faalt": {
    title: "Waarom AI zonder bedrijfscontext faalt",
    date: "2026-03-15",
    readTime: "5 min",
    tag: "AI",
    content: [
      "De meeste AI-tools leveren generieke output. ChatGPT kan een prima marketingtekst schrijven — maar niet één die klinkt als jouw bedrijf. Dat is geen tekortkoming van het model. Dat is een tekortkoming van de input.",
      "AI-modellen weten niets over jouw klanten, jouw processen, jouw marktpositie. Ze werken met algemene kennis. Het verschil tussen een nuttig antwoord en een waardeloos antwoord zit niet in het model — het zit in de context die je erin stopt.",
      "Daarom bouwen we bij NATIV eerst een kennisbank. Voordat we ook maar één AI-agent deployen, zorgen we dat die agent weet wat jouw bedrijf weet. Dat is het fundament. Zonder dat fundament is elke AI-investering een dure gok.",
    ],
  },
  "kennismanagement-voor-ai": {
    title: "Kennismanagement is het nieuwe fundament voor AI",
    date: "2026-03-08",
    readTime: "7 min",
    tag: "Kennismanagement",
    content: [
      "Kennismanagement klinkt als iets uit de jaren '90. En eerlijk: de meeste kennismanagement-initiatieven zijn ook zo geëindigd — in een stoffig intranet dat niemand gebruikt.",
      "Maar met de komst van AI krijgt kennismanagement een compleet nieuwe betekenis. Het gaat niet meer om een wiki die mensen moeten lezen. Het gaat om gestructureerde kennis die machines kunnen begrijpen en gebruiken.",
      "Bij NATIV noemen we dit het Company Brain. Het is de collectieve intelligentie van je organisatie, gestructureerd zodat AI-agents er direct mee aan de slag kunnen. Geen zoekactie van drie dagen. Direct het juiste antwoord, met de juiste context.",
    ],
  },
  "scan-build-deploy": {
    title: "Scan, Build, Deploy: waarom de volgorde ertoe doet",
    date: "2026-02-28",
    readTime: "4 min",
    tag: "Strategie",
    content: [
      "We zien het regelmatig: bedrijven die meteen willen beginnen met AI-agents. Een chatbot voor klantenservice. Een assistent voor sales. Klinkt logisch — maar het werkt zelden.",
      "Waarom? Omdat die agents geen context hebben. Ze weten niet wat jouw bedrijf doet, wie je klanten zijn, of hoe je processen werken. Het resultaat: generieke antwoorden die niemand helpen.",
      "Daarom werken we in drie stappen. Eerst scannen we waar de kansen liggen. Dan bouwen we het fundament — je AI-kennisbank. En pas dan deployen we digitale collega's die echt werk leveren. Elke stap bouwt voort op de vorige. Overslaan is geen optie.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.content[0].slice(0, 155) + "…",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="py-24 md:py-32 px-6">
      <div className="max-w-[680px] mx-auto">
        <FadeIn>
          <Link
            href="/blog"
            className="text-sage text-sm hover:underline mb-8 inline-block"
          >
            ← Terug naar blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-grey/50 mb-4">
            <span className="bg-sage/10 text-sage px-3 py-0.5 rounded-full text-xs">
              {post.tag}
            </span>
            <span>
              {new Date(post.date).toLocaleDateString("nl-NL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-[42px] leading-tight">
            {post.title}
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-10 space-y-6 text-lg font-light leading-relaxed text-grey/80">
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-16 pt-8 border-t border-sage-light text-center">
            <p className="text-grey/60 font-light">
              Benieuwd wat AI voor jouw organisatie kan betekenen?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Plan een gesprek →
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
