import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { isNlOnly } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gonativ.nl";
  const pages = [
    "",
    "/scan",
    "/company-brain",
    "/workflows",
    "/kennis/wat-is-een-bedrijfsbrein",
    "/diensten",
    "/over-ons",
    "/cases",
    "/ai-events",
    "/pricing",
    "/impact",
    "/ai-act",
    "/security",
    "/contact",
    "/blog",
    "/whitepaper",
  ];

  // Pillar + hubs rank just under the home + scan conversion pages.
  const keyPages = new Set([
    "/company-brain",
    "/workflows",
    "/kennis/wat-is-een-bedrijfsbrein",
  ]);

  const priorityOf = (path: string) =>
    path === "" ? 1 : path === "/scan" ? 0.9 : keyPages.has(path) ? 0.8 : 0.7;

  // Tweetalige pagina's staan er twee keer in, met hreflang-alternates
  // (A2 stap 2, KAN-425). NL-only pagina's (zie src/lib/locale.ts) één keer.
  const staticEntries: MetadataRoute.Sitemap = pages.flatMap((path) => {
    const nlUrl = `${base}${path}`;
    const common = {
      lastModified: new Date(),
      changeFrequency: (path === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: priorityOf(path),
    };
    if (isNlOnly(path || "/")) return [{ url: nlUrl, ...common }];
    const enUrl = `${base}/en${path}`;
    const languages = { nl: nlUrl, en: enUrl, "x-default": nlUrl };
    return [
      { url: nlUrl, ...common, alternates: { languages } },
      { url: enUrl, ...common, alternates: { languages } },
    ];
  });

  // One entry per blog post, dated on the post's own publish/update date.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated
      ? new Date(post.updated)
      : post.date
        ? new Date(post.date)
        : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
