/**
 * ビルド時（サーバーコンポーネント）にだけ使う、カタログ索引の組み立て。
 * ここは全系列を import するので、クライアントのコードから import しないこと。
 */
import {
  summarizeSeries,
  type KokugoCatalogItem,
  type MathCatalogItem,
} from "./catalogIndex";
import { STATIC_KOKUGO_CATALOG } from "./kokugoCatalog";
import { STATIC_CATALOG } from "./seriesCatalog";
import { SERIES_FILE_LOADERS, type SeriesFileMap } from "./seriesLoaders";

export function buildMathCatalogIndex(): MathCatalogItem[] {
  return STATIC_CATALOG.map((entry) => ({
    series: summarizeSeries(entry.series),
    subject: entry.subject,
    subjectLabel: entry.subjectLabel,
    shortDescription: entry.shortDescription,
    ...(entry.topicGroup ? { topicGroup: entry.topicGroup } : {}),
  }));
}

export function buildKokugoCatalogIndex(): KokugoCatalogItem[] {
  return STATIC_KOKUGO_CATALOG.map((entry) => ({
    series: summarizeSeries(entry.series),
    genreId: entry.genreId,
    shortDescription: entry.shortDescription,
    ...(entry.badge ? { badge: entry.badge } : {}),
  }));
}

/**
 * カタログの全系列について「どの系列ファイルにあるか」を引く表を作る。
 * カタログにあるのに、どのローダーからも見つからない系列があれば例外（ビルドを止める）。
 */
export async function buildSeriesFileMap(): Promise<SeriesFileMap> {
  const files: SeriesFileMap = {};
  for (const [fileKey, load] of Object.entries(SERIES_FILE_LOADERS)) {
    for (const series of await load()) {
      if (!(series.id in files)) files[series.id] = fileKey;
    }
  }
  const missing = STATIC_CATALOG.map((e) => e.series.id).filter((id) => !(id in files));
  if (missing.length > 0) {
    throw new Error(
      `seriesLoaders.ts に読み込み先の無い系列がある：${missing.join(", ")}（SERIES_FILE_LOADERS に系列ファイルを足す）`,
    );
  }
  // 学習者ビューで開けるのはカタログの系列だけ（リダイレクト済みの旧系列は resolveSeriesId で読み替える）
  const catalogIds = new Set(STATIC_CATALOG.map((e) => e.series.id));
  return Object.fromEntries(Object.entries(files).filter(([id]) => catalogIds.has(id)));
}
