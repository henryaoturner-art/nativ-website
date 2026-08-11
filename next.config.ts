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
      // The five /digitale-collega* pages were merged into one /workflows page
      // (2026-08-10). GSC over the seven weeks before the merge: 0 clicks and 94
      // impressions across all five, so there was no ranking worth splitting.
      // Permanent redirects keep the old URLs and any external links alive.
      {
        source: "/digitale-collegas",
        destination: "/workflows",
        permanent: true,
      },
      {
        source: "/digitale-collega-marketing",
        destination: "/workflows",
        permanent: true,
      },
      {
        source: "/digitale-collega-sales",
        destination: "/workflows",
        permanent: true,
      },
      {
        source: "/digitale-collega-finance",
        destination: "/workflows",
        permanent: true,
      },
      {
        source: "/digitale-collega-hr",
        destination: "/workflows",
        permanent: true,
      },
      // The bedrijfskennis-audit lead magnet was retired (week-kickoff 10 Aug 2026):
      // the free AI Opportunity Scan is the single free front door now. Old links
      // in sent emails and indexed pages land on the scan instead of a 404.
      {
        source: "/bedrijfskennis-audit",
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
