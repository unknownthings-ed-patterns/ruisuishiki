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
  ALGEBRA_DISCRIMINANT_SERIES,
  ALGEBRA_DIVISOR_COUNT_SERIES,
  ALGEBRA_EXPANSION_AB_SERIES,
  ALGEBRA_EXPANSION_SQ_SERIES,
  ALGEBRA_FACTORING_SERIES,
  ALGEBRA_LINEAR_INEQ_SERIES,
  ALGEBRA_MEAN_SERIES,
  ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
  ALGEBRA_PERMUTATION_SERIES,
  ALGEBRA_QUAD_PRODUCT_SERIES,
  ALGEBRA_QUAD_SUM_SERIES,
  ALGEBRA_QUAD_VERTEX_SERIES,
  ALGEBRA_SQRT_SIMPLIFY_SERIES,
  ALGEBRA_VARIANCE_SERIES,
} from "./seriesAlgebra";
import {
  ALGEBRA_2_SERIES_LIST,
  ALGEBRA2_ARITH_NTH_SERIES,
  ALGEBRA2_ARITH_SUM_SERIES,
  ALGEBRA2_DIFF_SERIES,
  ALGEBRA2_DOT_SERIES,
  ALGEBRA2_EXP_SERIES,
  ALGEBRA2_GEO_NTH_SERIES,
  ALGEBRA2_GEO_SUM_SERIES,
  ALGEBRA2_LOG_SERIES,
  ALGEBRA2_TRIG_PERIOD_SERIES,
  ALGEBRA2_VEC_MAG_SERIES,
} from "./seriesAlgebra2";
import { RATIO_BASIC_SERIES } from "./seriesData";
import {
  E5_CIRCUMFERENCE_SERIES,
  E5_DECIMAL_DIV_SERIES,
  E5_DECIMAL_MULT_SERIES,
  E5_DECIMAL_PLACE_SERIES,
  E5_FRACTION_ADD_SERIES,
  E5_LCM_SERIES,
  E5_MEAN_SERIES,
  E5_PARALLELOGRAM_SERIES,
  E5_POLYGON_ANGLE_SERIES,
  E5_PROPORTION_SERIES,
  E5_SPEED_SERIES,
  E5_TRAPEZOID_AREA_SERIES,
  E5_TRIANGLE_AREA_SERIES,
  E5_VOLUME_SERIES,
  ELEMENTARY_5_SERIES_LIST,
} from "./seriesElementary5";
import {
  MIDDLE_COMBINATION_SERIES,
  MIDDLE_PYTHAGOREAN_SERIES,
  MIDDLE_SCHOOL_SERIES_LIST,
  MIDDLE_SIMUL_SERIES,
} from "./seriesMiddle";
import {
  STATISTICS_SERIES_LIST,
  STATS_MEDIAN_SERIES,
} from "./seriesStats";
import type { LearnerSeries } from "./types";

export type SeriesSubject =
  | "elementary"
  | "middle"
  | "secondary"
  | "secondary2"
  | "tertiary";

/** subject の表示順（カタログでこの順に並べる）。 */
export const SUBJECT_ORDER: SeriesSubject[] = [
  "elementary",
  "middle",
  "secondary",
  "secondary2",
  "tertiary",
];

/** subject ごとのグループ見出し（subjectLabel と独立に持つ）。 */
export const SUBJECT_GROUP_LABEL: Record<SeriesSubject, string> = {
  elementary: "小学校算数",
  middle: "中学校数学",
  secondary: "高校数学Ⅰ・A",
  secondary2: "高校数学Ⅱ・B",
  tertiary: "統計・データ分析",
};

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
  /* === 小学校5年・東京書籍順 === */
  {
    series: E5_DECIMAL_PLACE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "1. 整数と小数（位の関係）",
  },
  {
    series: E5_VOLUME_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "2. 直方体の体積",
  },
  {
    series: E5_PROPORTION_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "3. 比例の入り口",
  },
  {
    series: E5_DECIMAL_MULT_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "4. 小数のかけ算",
  },
  {
    series: E5_DECIMAL_DIV_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "5. 小数のわり算（今ここ）",
  },
  {
    series: E5_LCM_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "6. 整数の見方（最小公倍数）",
  },
  {
    series: E5_FRACTION_ADD_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "7. 分数のたし算（通分）",
  },
  {
    series: E5_MEAN_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "8. 平均",
  },
  {
    series: E5_SPEED_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "9. 速さ（単位量あたり）",
  },
  {
    series: E5_POLYGON_ANGLE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "10. 多角形の角",
  },
  {
    series: RATIO_BASIC_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "11. 割合の入り口",
  },
  {
    series: E5_CIRCUMFERENCE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "12. 円周の長さ",
  },
  {
    series: E5_TRIANGLE_AREA_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "13. 三角形の面積",
  },
  {
    series: E5_PARALLELOGRAM_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "14. 平行四辺形の面積",
  },
  {
    series: E5_TRAPEZOID_AREA_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "15. 台形の面積",
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
  {
    series: ALGEBRA_QUAD_SUM_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "解と係数の関係（和） — 2次方程式",
  },
  {
    series: ALGEBRA_QUAD_PRODUCT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "解と係数の関係（積） — 2次方程式",
  },
  {
    series: ALGEBRA_DISCRIMINANT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "判別式 D = b²−4c — 2次方程式",
  },
  {
    series: ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "必要条件・十分条件 — 集合と命題",
  },
  {
    series: ALGEBRA_QUAD_VERTEX_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "頂点の x 座標 — 2次関数",
  },
  {
    series: ALGEBRA_MEAN_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "5つの数の平均 — データ分析",
  },
  {
    series: ALGEBRA_VARIANCE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "分散の入り口 — データ分析",
  },
  {
    series: ALGEBRA_PERMUTATION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "順列 P(n, 2) — 場合の数",
  },
  {
    series: ALGEBRA_DIVISOR_COUNT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    shortDescription: "約数の個数 — 整数の性質",
  },
  /* 中学校数学 */
  {
    series: MIDDLE_SIMUL_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "連立方程式 — 加減法",
  },
  {
    series: MIDDLE_PYTHAGOREAN_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "ピタゴラスの定理 — 図形",
  },
  {
    series: MIDDLE_COMBINATION_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "組合せ C(n, 2) — 確率の基礎",
  },
  /* 高校数学Ⅱ・B */
  {
    series: ALGEBRA2_TRIG_PERIOD_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "三角関数の周期 — 360°ごとの繰り返し",
  },
  {
    series: ALGEBRA2_LOG_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "対数の入り口 — log_b v の計算",
  },
  {
    series: ALGEBRA2_ARITH_NTH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "等差数列の n 項目 — 数列",
  },
  {
    series: ALGEBRA2_ARITH_SUM_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "等差数列の和 — 数列",
  },
  {
    series: ALGEBRA2_DOT_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "ベクトルの内積 — ベクトル",
  },
  {
    series: ALGEBRA2_GEO_NTH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "等比数列の n 項目 — 数列",
  },
  {
    series: ALGEBRA2_GEO_SUM_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "等比数列の和 — 数列",
  },
  {
    series: ALGEBRA2_EXP_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "指数 b^n — 指数関数",
  },
  {
    series: ALGEBRA2_VEC_MAG_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "ベクトルの大きさ — ベクトル",
  },
  {
    series: ALGEBRA2_DIFF_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    shortDescription: "微分の入り口 — 微分・積分",
  },
  /* 統計 */
  {
    series: STATS_MEDIAN_SERIES,
    subject: "tertiary",
    subjectLabel: "統計・データ分析",
    shortDescription: "中央値 — 並び替えて真ん中",
  },
];

export function findStaticSeries(seriesId: string): LearnerSeries | null {
  const found = STATIC_CATALOG.find((e) => e.series.id === seriesId);
  return found?.series ?? null;
}

export const ALL_STATIC_SERIES: LearnerSeries[] = [
  ...ELEMENTARY_5_SERIES_LIST,
  RATIO_BASIC_SERIES,
  ...ALGEBRA_1_SERIES_LIST,
  ...MIDDLE_SCHOOL_SERIES_LIST,
  ...ALGEBRA_2_SERIES_LIST,
  ...STATISTICS_SERIES_LIST,
];
