"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "Blog",
    heroSub: "Inzichten over AI, kennismanagement en strategie.",
    posts: [
      {
        slug: "waarom-ai-zonder-context-faalt",
        title: "Waarom AI zonder bedrijfscontext faalt",
        excerpt: "De meeste AI-tools leveren generieke output. Het verschil zit niet in het model — het zit in de kennis die je erin stopt.",
        date: "2026-03-15", readTime: "5 min", tag: "AI",
      },
      {
        slug: "kennismanagement-voor-ai",
        title: "Kennismanagement is het nieuwe fundament voor AI",
        excerpt: "Voordat je digitale collega's kunt inzetten, moet je weten wat je bedrijf weet. Zo pak je dat aan.",
        date: "2026-03-08", readTime: "7 min", tag: "Kennismanagement",
      },
      {
        slug: "scan-build-deploy",
        title: "Scan, Build, Deploy: waarom de volgorde ertoe doet",
        excerpt: "De meeste AI-projecten falen niet door technologie, maar door een verkeerde volgorde. Wij leggen uit waarom.",
        date: "2026-02-28", readTime: "4 min", tag: "Strategie",
      },
    ],
  },
  en: {
    heroTitle: "Blog",
    heroSub: "Insights on AI, knowledge management and strategy.",
    posts: [
      {
        slug: "waarom-ai-zonder-context-faalt",
        title: "Why AI without business context fails",
        excerpt: "Most AI tools deliver generic output. The difference isn\u2019t the model — it\u2019s the knowledge you feed it.",
        date: "2026-03-15", readTime: "5 min", tag: "AI",
      },
      {
        slug: "kennismanagement-voor-ai",
        title: "Knowledge management is the new foundation for AI",
        excerpt: "Before you can deploy digital colleagues, you need to know what your company knows. Here\u2019s how.",
        date: "2026-03-08", readTime: "7 min", tag: "Knowledge Management",
      },
      {
        slug: "scan-build-deploy",
        title: "Scan, Build, Deploy: why the order matters",
        excerpt: "Most AI projects don\u2019t fail because of technology, but because of the wrong sequence. We explain why.",
        date: "2026-02-28", readTime: "4 min", tag: "Strategy",
      },
    ],
  },
};

export default function BlogPage() {
  const { language, t } = useLanguage();
  const c = t(translations);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(language === "nl" ? "nl-NL" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70">{c.heroSub}</p>
          </FadeIn>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto space-y-6">
          {c.posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-3 text-sm text-grey/50 mb-3">
                    <span className="bg-sage/10 text-sage px-3 py-0.5 rounded-full text-xs">{post.tag}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl group-hover:text-sage transition-colors">{post.title}</h2>
                  <p className="mt-3 text-grey/60 font-light leading-relaxed">{post.excerpt}</p>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
