import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// 図版エクスポート（/figure-export）は開発用。本番に載せるなら FIGURE_EXPORT=1 でビルド。
// 既定は非収録（docs/book_math1a_設計メモ §7 P2・岩井裁定待ちの安全側）。
const includeFigureExport = !isProd || process.env.FIGURE_EXPORT === "1";

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
  // page.dev.tsx を開発（または FIGURE_EXPORT=1）でのみページとして認識する
  pageExtensions: includeFigureExport
    ? ["tsx", "ts", "jsx", "js", "dev.tsx"]
    : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
