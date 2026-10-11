/**
 * 数学の静的系列を、系列ファイル単位で遅延読み込みする（2026-10-11 バンドル分割）。
 *
 * 学習者ページは全系列（ソース 8.8 MB）を 1 つのチャンクで読み込んでいた。ここでは系列ファイルごとに
 * `import()` を分け、/learn/play は「いま歩く系列のファイル」だけを読む。どの系列がどのファイルに
 * あるかは、ビルド時にサーバー側で作る（catalogIndex.server.ts の buildSeriesFileMap）。
 *
 * 系列ファイルを足したら、ここにも 1 行足す（足し忘れはビルドで落ちる——buildSeriesFileMap が
 * カタログの全系列を見つけられないと例外を投げる）。
 */
import type { LearnerSeries } from "./types";

/** モジュールの export のうち、系列（id と steps を持つもの）を全部集める。 */
function collectSeries(mod: object): LearnerSeries[] {
  const found = new Map<string, LearnerSeries>();
  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (
      value &&
      typeof value === "object" &&
      typeof (value as LearnerSeries).id === "string" &&
      Array.isArray((value as LearnerSeries).steps) &&
      !found.has((value as LearnerSeries).id)
    ) {
      found.set((value as LearnerSeries).id, value as LearnerSeries);
    }
  };
  Object.values(mod).forEach(visit);
  return [...found.values()];
}

export const SERIES_FILE_LOADERS: Record<string, () => Promise<LearnerSeries[]>> = {
  seriesAdvanced: () => import("./seriesAdvanced").then(collectSeries),
  seriesAlgebra: () => import("./seriesAlgebra").then(collectSeries),
  seriesAlgebra2: () => import("./seriesAlgebra2").then(collectSeries),
  seriesCalculus: () => import("./seriesCalculus").then(collectSeries),
  seriesCategory: () => import("./seriesCategory").then(collectSeries),
  seriesCounting: () => import("./seriesCounting").then(collectSeries),
  seriesData: () => import("./seriesData").then(collectSeries),
  seriesDataAnalysis: () => import("./seriesDataAnalysis").then(collectSeries),
  seriesElementary5: () => import("./seriesElementary5").then(collectSeries),
  seriesExpLog: () => import("./seriesExpLog").then(collectSeries),
  seriesFunctionsGraphs: () => import("./seriesFunctionsGraphs").then(collectSeries),
  seriesGeometry: () => import("./seriesGeometry").then(collectSeries),
  seriesInteger: () => import("./seriesInteger").then(collectSeries),
  seriesMath3Complex: () => import("./seriesMath3Complex").then(collectSeries),
  seriesMath3Curves: () => import("./seriesMath3Curves").then(collectSeries),
  seriesMath3Diff: () => import("./seriesMath3Diff").then(collectSeries),
  seriesMath3DiffApp: () => import("./seriesMath3DiffApp").then(collectSeries),
  seriesMath3Functions: () => import("./seriesMath3Functions").then(collectSeries),
  seriesMath3Integral: () => import("./seriesMath3Integral").then(collectSeries),
  seriesMath3IntegralApp: () => import("./seriesMath3IntegralApp").then(collectSeries),
  seriesMath3Limits: () => import("./seriesMath3Limits").then(collectSeries),
  seriesMath3VariousDiff: () => import("./seriesMath3VariousDiff").then(collectSeries),
  seriesMath3Vector: () => import("./seriesMath3Vector").then(collectSeries),
  seriesMiddle: () => import("./seriesMiddle").then(collectSeries),
  seriesNumbersExpressions: () => import("./seriesNumbersExpressions").then(collectSeries),
  seriesProbability: () => import("./seriesProbability").then(collectSeries),
  seriesProof: () => import("./seriesProof").then(collectSeries),
  seriesSequence: () => import("./seriesSequence").then(collectSeries),
  seriesSetLogic: () => import("./seriesSetLogic").then(collectSeries),
  seriesStatInference: () => import("./seriesStatInference").then(collectSeries),
  seriesStats: () => import("./seriesStats").then(collectSeries),
  seriesTrig: () => import("./seriesTrig").then(collectSeries),
  seriesTrigRatio: () => import("./seriesTrigRatio").then(collectSeries),
};

/** 系列 id → 系列ファイルのキー（SERIES_FILE_LOADERS のキー）。ビルド時に作ってページへ渡す。 */
export type SeriesFileMap = Record<string, string>;

/** 1 系列だけを読み込む。見つからなければ null（教師作成系列などは呼び出し側で探す）。 */
export async function loadStaticSeries(
  seriesId: string,
  files: SeriesFileMap,
): Promise<LearnerSeries | null> {
  const fileKey = files[seriesId];
  const loader = fileKey ? SERIES_FILE_LOADERS[fileKey] : undefined;
  if (!loader) return null;
  const list = await loader();
  return list.find((s) => s.id === seriesId) ?? null;
}
