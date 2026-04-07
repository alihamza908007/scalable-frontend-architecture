import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  // Add this to specify the root directory explicitly
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

export default bundleAnalyzer(nextConfig);
