/**
 * 静的系列のカタログ（学習者ビューの入口で表示）。
 *
 * 教師が作った系列は localStorage 経由で別途取得する（teacherStorage.ts）。
 * このカタログは「ruisuishiki が最初から用意した系列」のリスト。
 *
 * 大人の自己教育・小学生の算数・高校生の数学Ⅰ・A、すべて同じ
 * 学習者ビューで歩ける（同一エンジン・複数領域）。
 */

import {
  ALGEBRA_1_SERIES_LIST,
  ALGEBRA_EXPANSION_AB_SERIES,
  ALGEBRA_EXPANSION_SQ_SERIES,
  ALGEBRA_FACTORING_SERIES,
  ALGEBRA_LINEAR_INEQ_SERIES,
  ALGEBRA_SQRT_SIMPLIFY_SERIES,
} from "./seriesAlgebra";
import { RATIO_BASIC_SERIES } from "./seriesData";
import type { LearnerSeries } from "./types";

export type SeriesSubject = "elementary" | "secondary" | "tertiary";

export type CatalogEntry = {
  series: LearnerSeries;
  /** 対象学年・領域の表示用 */
  subject: SeriesSubject;
  /** 領域ラベル */
  subjectLabel: string;
  /** 簡易説明 */
  shortDescription: string;
};

export const STATIC_CATALOG: CatalogEntry[] = [
  {
    series: RATIO_BASIC_SERIES,
    subject: "elementary",
    subjectLabel: "小学校算数",
    shortDescription: "小学5年・割合の基本（B = A × p）",
  },
  {
    series: ALGEBRA_EXPANSION_AB_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "乗法公式 (x+a)(x+b) — 数と式",
  },
  {
    series: ALGEBRA_EXPANSION_SQ_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "平方の展開 (x+a)² — 数と式",
  },
  {
    series: ALGEBRA_FACTORING_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "因数分解（展開の逆） — 数と式",
  },
  {
    series: ALGEBRA_SQRT_SIMPLIFY_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "平方根の簡単化 — 数と式",
  },
  {
    series: ALGEBRA_LINEAR_INEQ_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "1次不等式の解法 — 数と式",
  },
];

export function findStaticSeries(seriesId: string): LearnerSeries | null {
  const found = STATIC_CATALOG.find((e) => e.series.id === seriesId);
  return found?.series ?? null;
}

export const ALL_STATIC_SERIES: LearnerSeries[] = [
  RATIO_BASIC_SERIES,
  ...ALGEBRA_1_SERIES_LIST,
];
