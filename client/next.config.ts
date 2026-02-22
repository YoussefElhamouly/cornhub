import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  experimental: {
    cssChunking: "strict",
  },
};

export default nextConfig;
