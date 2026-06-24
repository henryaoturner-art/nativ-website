import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "Blog: inzichten over AI, kennis en het mkb | nativ" },
  description:
    "Inzichten over AI, kennismanagement en het Company Brain voor het Nederlandse mkb. Praktisch en eerlijk, zonder hype.",
  alternates: { canonical: "/blog" },
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Blog
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70">
              Inzichten over AI, kennismanagement en het Company Brain voor het mkb.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-grey/50 font-light">Binnenkort de eerste artikelen.</p>
          )}
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-sm text-grey/50 mb-3">
                      {post.tag && (
                        <span className="bg-sage/10 text-sage px-3 py-0.5 rounded-full text-xs">
                          {post.tag}
                        </span>
                      )}
                      <span>{formatDate(post.date)}</span>
                      {post.readTime && (
                        <>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl group-hover:text-sage transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-grey/60 font-light leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
