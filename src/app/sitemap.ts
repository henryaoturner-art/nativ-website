import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gonativ.nl";
  const pages = [
    "",
    "/scan",
    "/diensten",
    "/over-ons",
    "/cases",
    "/pricing",
    "/impact",
    "/security",
    "/contact",
    "/blog",
  ];

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/scan" ? 0.9 : 0.7,
  }));
}
