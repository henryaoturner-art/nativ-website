import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // KAN-308: keep the keyword URL alive without duplicating /scan.
      {
        source: "/ai-opportunity-scan",
        destination: "/scan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
