import { buildMathCatalogIndex, buildSeriesFileMap } from "@/lib/catalogIndex.server";
import SeriesPreview from "./SeriesPreview";

/**
 * /teach/series の入口（サーバー側・ビルド時に 1 回だけ走る）。カタログの軽い索引と
 * 「系列 → 系列ファイル」の表だけを渡し、系列の本文は表示する 1 系列ぶんだけ後から読む。
 */
export default async function Page() {
  return <SeriesPreview math={buildMathCatalogIndex()} seriesFiles={await buildSeriesFileMap()} />;
}
