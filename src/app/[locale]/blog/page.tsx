import type { Metadata } from "next";
import { pageMeta } from "@/lib/site-meta";
import Link from "@/components/Link";
import FadeIn from "@/components/FadeIn";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = pageMeta(
  "/blog",
  "Blog: inzichten over AI, kennis en het mkb | nativ",
  "Inzichten over AI, kennismanagement en het Company Brain voor het mkb. Praktisch en eerlijk, zonder hype.",
);

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
            <h1 className="font-serif text-grey">
              Blog
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl text-grey">
              Inzichten over AI, kennismanagement en het Company Brain voor het mkb.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-muted">Binnenkort de eerste artikelen.</p>
          )}
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="bg-surface rounded-xl overflow-hidden border border-sage-light group-hover:border-sage transition-colors">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-sm text-muted mb-3">
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
                    <h2 className="font-serif group-hover:text-sage transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-muted leading-relaxed">{post.excerpt}</p>
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
