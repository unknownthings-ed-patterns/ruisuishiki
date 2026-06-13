import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // GitHub Pages 公開のため静的出力
  output: "export",
  // 静的サイトでは Next の画像最適化サーバーが使えない
  images: { unoptimized: true },
  // GitHub Pages の URL ルーティング対応
  trailingSlash: true,
  // 本番（GitHub Pages: /ruisuishiki/）と開発（/）の path 切り替え
  basePath: isProd ? "/ruisuishiki" : "",
  assetPrefix: isProd ? "/ruisuishiki" : undefined,
};

export default nextConfig;
