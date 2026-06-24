import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getPost, getAllSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artikel niet gevonden | nativ" };
  return {
    title: { absolute: `${post.title} | nativ` },
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://gonativ.nl/blog/${slug}`,
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: `https://gonativ.nl${post.image}` }] } : {}),
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: "nativ", url: "https://gonativ.nl" },
    publisher: {
      "@type": "Organization",
      name: "nativ",
      url: "https://gonativ.nl",
      logo: { "@type": "ImageObject", url: "https://gonativ.nl/nativ-logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://gonativ.nl/blog/${slug}` },
    ...(post.image ? { image: `https://gonativ.nl${post.image}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="py-10 md:py-14 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeIn>
            <Link href="/blog" className="text-sage text-sm hover:underline mb-8 inline-block">
              ← Terug naar blog
            </Link>
            <div className="flex items-center gap-3 text-sm text-grey/50 mb-4">
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
            <h1 className="font-serif text-3xl md:text-[42px] leading-tight text-grey">
              {post.title}
            </h1>
          </FadeIn>

          {post.image && (
            <FadeIn delay={150}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="mt-8 w-full rounded-xl object-cover"
              />
            </FadeIn>
          )}

          <FadeIn delay={200}>
            <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-16 pt-8 border-t border-sage-light text-center">
              <p className="text-grey/60 font-light">
                Benieuwd hoe een Company Brain de kennis van jouw bedrijf vastlegt?
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block bg-sage text-white px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors"
              >
                Plan een vrijblijvende kennismaking
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
