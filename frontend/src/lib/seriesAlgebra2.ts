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

/** A1: 等差数列の n 項目 */
export const ALGEBRA2_ARITH_NTH_SERIES: LearnerSeries = {
  id: "algebra2_arith_nth_01",
  title: "等差数列の n 項目",
  subtitle:
    "初項と公差から n 項目の値を求める5問。$a_n = a_1 + (n-1)d$。",
  patternId: "A1",
  unit: "algebra_2",
  revelationLabel: "a_n = 初項 + (n − 1) × 公差",
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "初項 1、公差 2 の等差数列の 5 項目はいくつでしょう？",
      answer: 9, unit: "", unknownLabel: "5 項目の値",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "数列：1, 3, 5, 7, 9, ..." },
        { layer: 2, text: "公式：$a_n = a_1 + (n-1)d = 1 + 4 \\times 2$。" },
        { layer: 3, text: "9。" },
      ],
      formulaPreview: "1 + 4·2 = 9",
    },
    {
      id: "step2", position: 2,
      questionText:
        "初項 2、公差 3 の等差数列の 4 項目はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "4 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$2 + 3 \\times 3$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "2 + 3·3 = 11",
    },
    {
      id: "step3", position: 3,
      questionText:
        "初項 5、公差 2 の等差数列の 10 項目はいくつでしょう？",
      answer: 23, unit: "", unknownLabel: "10 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$5 + 9 \\times 2$。" },
        { layer: 3, text: "23。" },
      ],
      formulaPreview: "5 + 9·2 = 23",
    },
    {
      id: "step4", position: 4,
      questionText:
        "初項 10、公差 -1 の等差数列の 6 項目はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "6 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公差が負（減っていく数列）。" },
        { layer: 2, text: "$10 + 5 \\times (-1)$。" },
        { layer: 3, text: "5。" },
      ],
      formulaPreview: "10 + 5·(-1) = 5",
    },
    {
      id: "step5", position: 5,
      questionText:
        "初項 3、公差 4 の等差数列で、20 項目はいくつでしょう？",
      answer: 79, unit: "", unknownLabel: "20 項目の値",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "項数が大きくなっただけ。公式は同じ。" },
        { layer: 2, text: "$3 + 19 \\times 4$。" },
        { layer: 3, text: "79。" },
      ],
      formulaPreview: "3 + 19·4 = 79",
    },
  ],
};

/** A2: 等差数列の和 */
export const ALGEBRA2_ARITH_SUM_SERIES: LearnerSeries = {
  id: "algebra2_arith_sum_01",
  title: "等差数列の和",
  subtitle:
    "初項・末項・項数から和を求める5問。$S_n = n(a + l) / 2$。",
  patternId: "A2",
  unit: "algebra_2",
  revelationLabel: "S = 項数 × (初項 + 末項) ÷ 2",
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "1 から 10 までの整数の和（初項 1、末項 10、項数 10）はいくつでしょう？",
      answer: 55, unit: "", unknownLabel: "和",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$S = n(a + l) / 2$。" },
        { layer: 2, text: "$10 \\times (1 + 10) / 2 = 10 \\times 11 / 2$。" },
        { layer: 3, text: "55。" },
      ],
      formulaPreview: "10·11/2 = 55",
    },
    {
      id: "step2", position: 2,
      questionText:
        "2 から 20 までの偶数の和（初項 2、末項 20、項数 10）はいくつでしょう？",
      answer: 110, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$10 \\times (2 + 20) / 2$。" },
        { layer: 3, text: "110。" },
      ],
      formulaPreview: "10·22/2 = 110",
    },
    {
      id: "step3", position: 3,
      questionText:
        "1 から 100 までの整数の和（ガウスの故事）はいくつでしょう？",
      answer: 5050, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$100 \\times (1 + 100) / 2$。" },
        { layer: 2, text: "$100 \\times 101 / 2$。" },
        { layer: 3, text: "5050。" },
      ],
      formulaPreview: "100·101/2 = 5050",
    },
    {
      id: "step4", position: 4,
      questionText:
        "1 から 50 までの奇数の和（初項 1、末項 49、項数 25）はいくつでしょう？",
      answer: 625, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "奇数 1, 3, 5, ..., 49 は 25 個。" },
        { layer: 2, text: "$25 \\times (1 + 49) / 2 = 25 \\times 25$。" },
        { layer: 3, text: "625（= 25²）。" },
      ],
      formulaPreview: "25·50/2 = 625",
    },
    {
      id: "step5", position: 5,
      questionText:
        "ボウリングのピン配置：1+2+3+4=10 のように積み上げる。初項 1、末項 20、項数 20 の和はいくつでしょう？",
      answer: 210, unit: "", unknownLabel: "和",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "三角数。公式は同じ。" },
        { layer: 2, text: "$20 \\times (1 + 20) / 2$。" },
        { layer: 3, text: "210。" },
      ],
      formulaPreview: "20·21/2 = 210",
    },
  ],
};

/** VEC1: ベクトルの内積 */
export const ALGEBRA2_DOT_SERIES: LearnerSeries = {
  id: "algebra2_dot_01",
  title: "ベクトルの内積",
  subtitle:
    "2次元ベクトル $(a, b) \\cdot (c, d) = ac + bd$ を求める5問。",
  patternId: "VEC1",
  unit: "algebra_2",
  revelationLabel: "(a, b) · (c, d) = ac + bd",
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "$\\vec{u} = (1, 2)$, $\\vec{v} = (3, 4)$ の内積 $\\vec{u} \\cdot \\vec{v}$ はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "内積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$ac + bd$。" },
        { layer: 2, text: "$1 \\times 3 + 2 \\times 4 = 3 + 8$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "1·3 + 2·4 = 11",
    },
    {
      id: "step2", position: 2,
      questionText:
        "$\\vec{u} = (2, 1)$, $\\vec{v} = (3, 5)$ の内積はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$2 \\times 3 + 1 \\times 5 = 6 + 5$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "2·3 + 1·5 = 11",
    },
    {
      id: "step3", position: 3,
      questionText:
        "$\\vec{u} = (3, 4)$, $\\vec{v} = (2, 1)$ の内積はいくつでしょう？",
      answer: 10, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$3 \\times 2 + 4 \\times 1$。" },
        { layer: 2, text: "$6 + 4$。" },
        { layer: 3, text: "10。" },
      ],
      formulaPreview: "3·2 + 4·1 = 10",
    },
    {
      id: "step4", position: 4,
      questionText:
        "$\\vec{u} = (-1, 2)$, $\\vec{v} = (3, 4)$ の内積はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "負の数があるが公式は同じ。" },
        { layer: 2, text: "$(-1) \\times 3 + 2 \\times 4 = -3 + 8$。" },
        { layer: 3, text: "5。" },
      ],
      formulaPreview: "(-1)·3 + 2·4 = 5",
    },
    {
      id: "step5", position: 5,
      questionText:
        "$\\vec{u} = (5, 0)$, $\\vec{v} = (0, 5)$ の内積はいくつでしょう？（垂直なベクトル）",
      answer: 0, unit: "", unknownLabel: "内積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$5 \\times 0 + 0 \\times 5$。" },
        { layer: 2, text: "$0 + 0 = 0$。" },
        { layer: 3, text: "0。内積が 0 のとき2ベクトルは垂直。" },
      ],
      formulaPreview: "5·0 + 0·5 = 0",
    },
  ],
};

/** DIFF1: 微分 f'(1) for f(x) = a·x^n */
export const ALGEBRA2_DIFF_SERIES: LearnerSeries = {
  id: "algebra2_diff_01",
  title: "微分の入り口",
  subtitle:
    "$f(x) = a x^n$ を微分して $x = 1$ での値 $f'(1)$ を求める5問。",
  patternId: "DIFF1",
  unit: "algebra_2",
  revelationLabel: "f(x) = ax^n の f'(x) = anx^(n-1)。f'(1) = a × n",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$f(x) = 2x^3$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "$\\dfrac{d}{dx}(x^n) = n x^{n-1}$。" },
        { layer: 2, text: "$f'(x) = 6x^2$。$f'(1) = 6 \\times 1^2$。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "2 × 3 = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "$f(x) = 3x^2$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$f'(x) = 6x$。" },
        { layer: 2, text: "$f'(1) = 6$。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "3 × 2 = 6",
    },
    {
      id: "step3", position: 3,
      questionText: "$f(x) = x^4$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$f'(x) = 4x^3$。" },
        { layer: 2, text: "$f'(1) = 4$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "1 × 4 = 4",
    },
    {
      id: "step4", position: 4,
      questionText: "$f(x) = 5x^3$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 15, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$f'(x) = 15x^2$。" },
        { layer: 2, text: "$f'(1) = 15$。" },
        { layer: 3, text: "15。" },
      ],
      formulaPreview: "5 × 3 = 15",
    },
    {
      id: "step5", position: 5,
      questionText: "$g(y) = 2y^4$ のとき、$g'(1)$ はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "g'(1)",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "変数記号が $y$ になっただけ。$g'(y) = 8y^3$。" },
        { layer: 2, text: "$g'(1) = 8$。" },
        { layer: 3, text: "8。" },
      ],
      formulaPreview: "2 × 4 = 8",
    },
  ],
};

export const ALGEBRA_2_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA2_TRIG_PERIOD_SERIES,
  ALGEBRA2_LOG_SERIES,
  ALGEBRA2_ARITH_NTH_SERIES,
  ALGEBRA2_ARITH_SUM_SERIES,
  ALGEBRA2_DOT_SERIES,
  ALGEBRA2_DIFF_SERIES,
];
