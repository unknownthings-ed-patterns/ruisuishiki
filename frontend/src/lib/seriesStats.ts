/**
 * 統計の系列カタログ。
 * まずは中央値から。
 */

import type { LearnerSeries } from "./types";

/** ST1: 5つの数の中央値 */
export const STATS_MEDIAN_SERIES: LearnerSeries = {
  id: "stats_median_01",
  title: "中央値の入り口",
  subtitle:
    "5つの数を並び替えて真ん中を取る5問。平均との違いも体感する。",
  patternId: "ST1",
  unit: "statistics",
  revelationLabel: "5つの数を小さい順に並べて、真ん中（3番目）",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "5つの数 3, 1, 4, 1, 5 の中央値はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "小さい順に並べ替えて、真ん中（3 番目）の数を見る。" },
        { layer: 2, text: "並び替え：1, 1, 3, 4, 5。" },
        { layer: 3, text: "真ん中は 3。" },
      ],
      formulaPreview: "sorted[2] = 3",
    },
    {
      id: "step2",
      position: 2,
      questionText: "5つの数 2, 7, 1, 8, 3 の中央値はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "並び替えて、真ん中を取る。" },
        { layer: 2, text: "並び替え：1, 2, 3, 7, 8。" },
        { layer: 3, text: "真ん中は 3。" },
      ],
      formulaPreview: "sorted[2] = 3",
    },
    {
      id: "step3",
      position: 3,
      questionText: "5つの数 10, 20, 30, 40, 50 の中央値はいくつでしょう？",
      answer: 30,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "もう並んでいる。真ん中を取るだけ。" },
        { layer: 2, text: "並びの 3 番目。" },
        { layer: 3, text: "30。" },
      ],
      formulaPreview: "sorted[2] = 30",
    },
    {
      id: "step4",
      position: 4,
      questionText: "5つの数 -3, -1, 0, 2, 5 の中央値はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "並び替え済み。真ん中を取る。" },
        { layer: 2, text: "並びの 3 番目。" },
        { layer: 3, text: "0。" },
      ],
      formulaPreview: "sorted[2] = 0",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "クラス 5 人のテスト結果 60, 100, 70, 90, 50 点の中央値はいくつでしょう？",
      answer: 70,
      unit: "点",
      unknownLabel: "中央値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "「点」がついただけ。やり方は同じ。",
        },
        { layer: 2, text: "並び替え：50, 60, 70, 90, 100。" },
        { layer: 3, text: "真ん中は 70。" },
      ],
      formulaPreview: "sorted[2] = 70",
    },
  ],
};

export const STATISTICS_SERIES_LIST: LearnerSeries[] = [
  STATS_MEDIAN_SERIES,
];
