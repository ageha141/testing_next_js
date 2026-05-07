// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 静的エクスポートを有効化
  images: {
    unoptimized: true, // GitHub Pages用
  },
  // リポジトリ名が「ai-training-demo」の場合、以下のコメントアウトを外してください
  // basePath: '/ai-training-demo',
  // assetPrefix: '/ai-training-demo/',
};

export default nextConfig;