/**
 * 数学Ⅱ・B の系列カタログ。
 * 三角関数の周期性・対数。
 */

import type { LearnerSeries } from "./types";

/** T1: 三角関数の周期性。x°を[0°,360°)に正規化 */
export const ALGEBRA2_TRIG_PERIOD_SERIES: LearnerSeries = {
  id: "algebra2_trig_period_01",
  title: "三角関数の周期",
  subtitle:
    "$\\sin x°, \\cos x°$ は 360° ごとに同じ値。x を [0°, 360°) に直す5問。",
  patternId: "T1",
  unit: "algebra_2",
  revelationLabel: "角度を 360° で割った余りが、基本周期での同値角",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\sin 370°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 10,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "$\\sin$ は 360° ごとに同じ値を取る。" },
        { layer: 2, text: "370° = 360° + 10°。" },
        { layer: 3, text: "$x = 10$。" },
      ],
      formulaPreview: "370 mod 360 = 10",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\sin 450°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 90,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。360° を引く。" },
        { layer: 2, text: "450° - 360° = 90°。" },
        { layer: 3, text: "$x = 90$。" },
      ],
      formulaPreview: "450 mod 360 = 90",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\sin 720°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 0,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "360° の2周分。" },
        { layer: 2, text: "720° = 360° × 2 + 0°。" },
        { layer: 3, text: "$x = 0$。" },
      ],
      formulaPreview: "720 mod 360 = 0",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\sin 540°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 180,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "540° から 360° を引く。" },
        { layer: 2, text: "540° - 360° = 180°。" },
        { layer: 3, text: "$x = 180$。" },
      ],
      formulaPreview: "540 mod 360 = 180",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\cos 405°$ は、$0° \\leq x < 360°$ では $\\cos x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 45,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "$\\sin$ から $\\cos$ に変わっただけ。周期は同じ 360°。",
        },
        { layer: 2, text: "405° - 360° = 45°。" },
        { layer: 3, text: "$x = 45$。" },
      ],
      formulaPreview: "405 mod 360 = 45",
    },
  ],
};

/** L1: 対数の値 log_b(v) */
export const ALGEBRA2_LOG_SERIES: LearnerSeries = {
  id: "algebra2_log_01",
  title: "対数の入り口",
  subtitle:
    "$\\log_b v$ を整数で求める5問。「底を何回かけたら真数になるか」。",
  patternId: "L1",
  unit: "algebra_2",
  revelationLabel: "log_b(v) は「b を何回かけたら v になるか」の回数",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "$\\log_2 4$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "「2 を何回かけたら 4 になるか」を考える。" },
        { layer: 2, text: "$2^2 = 4$。" },
        { layer: 3, text: "答え 2。" },
      ],
      formulaPreview: "2² = 4 → log = 2",
    },
    {
      id: "step2",
      position: 2,
      questionText: "$\\log_2 8$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ手順。" },
        { layer: 2, text: "$2^3 = 8$。" },
        { layer: 3, text: "答え 3。" },
      ],
      formulaPreview: "2³ = 8 → log = 3",
    },
    {
      id: "step3",
      position: 3,
      questionText: "$\\log_3 9$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "底が 3 に変わった。「3 を何回かけたら 9」？" },
        { layer: 2, text: "$3^2 = 9$。" },
        { layer: 3, text: "答え 2。" },
      ],
      formulaPreview: "3² = 9 → log = 2",
    },
    {
      id: "step4",
      position: 4,
      questionText: "$\\log_5 125$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "「5 を何回かけたら 125」？" },
        { layer: 2, text: "$5^3 = 125$。" },
        { layer: 3, text: "答え 3。" },
      ],
      formulaPreview: "5³ = 125 → log = 3",
    },
    {
      id: "step5",
      position: 5,
      questionText: "$\\log_2 16$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "底は 2 に戻ったが、真数が大きく。" },
        { layer: 2, text: "$2^4 = 16$。" },
        { layer: 3, text: "答え 4。" },
      ],
      formulaPreview: "2⁴ = 16 → log = 4",
    },
  ],
};

export const ALGEBRA_2_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA2_TRIG_PERIOD_SERIES,
  ALGEBRA2_LOG_SERIES,
];
