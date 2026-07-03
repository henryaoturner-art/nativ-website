import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gonativ.nl";
  const pages = [
    "",
    "/scan",
    "/company-brain",
    "/digitale-collegas",
    "/kennis/wat-is-een-bedrijfsbrein",
    "/digitale-collega-marketing",
    "/digitale-collega-sales",
    "/digitale-collega-finance",
    "/digitale-collega-hr",
    "/diensten",
    "/over-ons",
    "/cases",
    "/ai-events",
    "/pricing",
    "/impact",
    "/security",
    "/contact",
    "/blog",
    "/whitepaper",
  ];

  // Pillar + hubs rank just under the home + scan conversion pages.
  const keyPages = new Set([
    "/company-brain",
    "/digitale-collegas",
    "/kennis/wat-is-een-bedrijfsbrein",
  ]);

  const staticEntries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/scan"
          ? 0.9
          : keyPages.has(path)
            ? 0.8
            : 0.7,
  }));

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
