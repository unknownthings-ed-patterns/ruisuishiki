/**
 * カタログの軽い索引（2026-10-11 バンドル分割）。
 *
 * /learn・/teach/series は、全系列の中身ではなく「タイトル・中心の問い・step の id とオペレータ」
 * だけを使う。ビルド時にサーバー側（catalogIndex.server.ts）でこの形に要約してページへ渡し、
 * 系列の本文（問題・ヒント・公式の景色）はクライアントに送らない。
 */
import type { SeriesSubject } from "./catalogMeta";
import type { KokugoGenreId } from "./kokugoCatalogMeta";
import type { KokugoSeries, LearnerSeries, VariationOp } from "./types";

export type StepSummary = { id: string; op: VariationOp | null };

export type SeriesSummary = {
  id: string;
  title: string;
  drivingQuestion?: string;
  steps: StepSummary[];
};

/** 数学カタログの 1 枚（CatalogEntry から系列本文を除いたもの）。 */
export type MathCatalogItem = {
  series: SeriesSummary;
  subject: SeriesSubject;
  subjectLabel: string;
  shortDescription: string;
  topicGroup?: string;
};

/** 国語カタログの 1 枚（KokugoCatalogEntry から系列本文を除いたもの）。 */
export type KokugoCatalogItem = {
  series: SeriesSummary;
  genreId: KokugoGenreId;
  shortDescription: string;
  badge?: string;
};

export function summarizeSeries(series: LearnerSeries | KokugoSeries): SeriesSummary {
  return {
    id: series.id,
    title: series.title,
    ...(series.drivingQuestion ? { drivingQuestion: series.drivingQuestion } : {}),
    steps: series.steps.map((step) => ({ id: step.id, op: step.variationFromPrevious })),
  };
}

/** `${seriesId}::${stepId}` → 前題からの変化オペレータ（seriesCatalog.buildStepOpIndex と同じ形）。 */
export function buildStepOpIndexFromSummaries(
  series: SeriesSummary[],
): Map<string, VariationOp | null> {
  const index = new Map<string, VariationOp | null>();
  for (const s of series) {
    for (const step of s.steps) index.set(`${s.id}::${step.id}`, step.op);
  }
  return index;
}
