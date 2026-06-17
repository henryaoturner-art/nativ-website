import type { MetadataRoute } from "next";

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

  return pages.map((path) => ({
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
}
