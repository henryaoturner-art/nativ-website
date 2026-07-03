import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // KAN-318 (GEO): consolidate www → non-www (gonativ.nl is canonical).
      // Only www requests match the host condition, so non-www never loops.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gonativ.nl" }],
        destination: "https://gonativ.nl/:path*",
        permanent: true,
      },
      // KAN-308: keep the keyword URL alive without duplicating /scan.
      {
        source: "/ai-opportunity-scan",
        destination: "/scan",
        permanent: true,
      },
      // Renamed /ai-agenda → /ai-events (2026-07-03); keep the short-lived old path alive.
      {
        source: "/ai-agenda",
        destination: "/ai-events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
