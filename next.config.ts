// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // images は experimental の中ではなく、ここ（一番上の階層）に書きます
  images: {
    unoptimized: true,
  },
  // basePath: '/ai-training-demo',
  // assetPrefix: '/ai-training-demo/',
};

export default nextConfig;