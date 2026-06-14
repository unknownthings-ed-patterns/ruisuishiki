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

/** G1: 等比数列の n 項目 a_n = a × r^(n-1) */
export const ALGEBRA2_GEO_NTH_SERIES: LearnerSeries = {
  id: "algebra2_geo_nth_01",
  title: "等比数列の n 項目",
  subtitle:
    "初項と公比から n 項目を求める10問。$a_n = a \\times r^{n-1}$。",
  patternId: "G1",
  unit: "algebra_2",
  revelationLabel: "a_n = 初項 × 公比^(n − 1)",
  steps: [
    { id: "step1", position: 1, questionText: "初項 1、公比 2 の等比数列の 4 項目はいくつでしょう？", answer: 8, unit: "", unknownLabel: "4 項目", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "数列：1, 2, 4, 8, ..." }, { layer: 2, text: "$1 \\times 2^3$。" }, { layer: 3, text: "8。" }], formulaPreview: "1·2³ = 8" },
    { id: "step2", position: 2, questionText: "初項 1、公比 2 の等比数列の 5 項目はいくつでしょう？", answer: 16, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "前の続き。" }, { layer: 2, text: "$1 \\times 2^4$。" }, { layer: 3, text: "16。" }], formulaPreview: "1·2⁴ = 16" },
    { id: "step3", position: 3, questionText: "初項 2、公比 3 の等比数列の 3 項目はいくつでしょう？", answer: 18, unit: "", unknownLabel: "3 項目", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "数列：2, 6, 18, ..." }, { layer: 2, text: "$2 \\times 3^2$。" }, { layer: 3, text: "18。" }], formulaPreview: "2·3² = 18" },
    { id: "step4", position: 4, questionText: "初項 1、公比 3 の等比数列の 4 項目はいくつでしょう？", answer: 27, unit: "", unknownLabel: "4 項目", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "数列：1, 3, 9, 27, ..." }, { layer: 2, text: "$1 \\times 3^3$。" }, { layer: 3, text: "27。" }], formulaPreview: "1·3³ = 27" },
    { id: "step5", position: 5, questionText: "初項 1、公比 2 の等比数列の 8 項目はいくつでしょう？", answer: 128, unit: "", unknownLabel: "8 項目", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "倍々ゲーム。" }, { layer: 2, text: "$2^7$。" }, { layer: 3, text: "128。" }], formulaPreview: "1·2⁷ = 128" },
    { id: "step6", position: 6, questionText: "初項 3、公比 2 の等比数列の 5 項目はいくつでしょう？", answer: 48, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$3 \\times 2^4$。" }, { layer: 2, text: "$3 \\times 16$。" }, { layer: 3, text: "48。" }], formulaPreview: "3·2⁴ = 48" },
    { id: "step7", position: 7, questionText: "初項 2、公比 3 の等比数列の 5 項目はいくつでしょう？", answer: 162, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$2 \\times 3^4$。" }, { layer: 2, text: "$2 \\times 81$。" }, { layer: 3, text: "162。" }], formulaPreview: "2·3⁴ = 162" },
    { id: "step8", position: 8, questionText: "初項 1、公比 4 の等比数列の 4 項目はいくつでしょう？", answer: 64, unit: "", unknownLabel: "4 項目", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "公比が大きい。$1 \\times 4^3$。" }, { layer: 2, text: "$4^3 = 64$。" }, { layer: 3, text: "64。" }], formulaPreview: "1·4³ = 64" },
    { id: "step9", position: 9, questionText: "初項 1、公比 2 の等比数列の 10 項目はいくつでしょう？", answer: 512, unit: "", unknownLabel: "10 項目", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$2^9$。" }, { layer: 2, text: "512。" }, { layer: 3, text: "512。" }], formulaPreview: "1·2⁹ = 512" },
    { id: "step10", position: 10, questionText: "初項 1、公比 10 の数列の 4 項目はいくつでしょう？（10進法の桁の正体）", answer: 1000, unit: "", unknownLabel: "4 項目", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "公比 10 は 10 倍ずつ。" }, { layer: 2, text: "1, 10, 100, 1000, ..." }, { layer: 3, text: "1000。10進法の桁はこれ。" }], formulaPreview: "1·10³ = 1000" },
  ],
};

/** G2: 等比数列の和 S = a(r^n - 1)/(r - 1) */
export const ALGEBRA2_GEO_SUM_SERIES: LearnerSeries = {
  id: "algebra2_geo_sum_01",
  title: "等比数列の和",
  subtitle: "等比数列の和を求める10問。指数の指数的増加。",
  patternId: "G2",
  unit: "algebra_2",
  revelationLabel: "S = 初項 × (公比^n − 1) ÷ (公比 − 1)",
  steps: [
    { id: "step1", position: 1, questionText: "初項 1、公比 2 の等比数列の最初の 3 項の和（1+2+4）はいくつでしょう？", answer: 7, unit: "", unknownLabel: "和", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "公式：$a(r^n - 1)/(r - 1)$。" }, { layer: 2, text: "$1 \\times (2^3 - 1) / (2 - 1) = 7/1$。" }, { layer: 3, text: "7。" }], formulaPreview: "1·(2³-1)/1 = 7" },
    { id: "step2", position: 2, questionText: "初項 1、公比 2 の最初の 4 項の和は？", answer: 15, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$(2^4 - 1)/1$。" }, { layer: 2, text: "$16 - 1$。" }, { layer: 3, text: "15。" }], formulaPreview: "(2⁴-1) = 15" },
    { id: "step3", position: 3, questionText: "初項 1、公比 2 の最初の 5 項の和は？", answer: 31, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "$2^5 - 1$。" }, { layer: 2, text: "$32 - 1$。" }, { layer: 3, text: "31。" }], formulaPreview: "(2⁵-1) = 31" },
    { id: "step4", position: 4, questionText: "初項 1、公比 3 の最初の 3 項の和（1+3+9）は？", answer: 13, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$1 \\times (3^3 - 1)/(3 - 1)$。" }, { layer: 2, text: "$26 / 2$。" }, { layer: 3, text: "13。" }], formulaPreview: "(27-1)/2 = 13" },
    { id: "step5", position: 5, questionText: "初項 2、公比 2 の最初の 3 項の和（2+4+8）は？", answer: 14, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$2 \\times (2^3 - 1)/1$。" }, { layer: 2, text: "$2 \\times 7$。" }, { layer: 3, text: "14。" }], formulaPreview: "2·(8-1) = 14" },
    { id: "step6", position: 6, questionText: "初項 1、公比 2 の最初の 6 項の和は？", answer: 63, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$2^6 - 1$。" }, { layer: 2, text: "$64 - 1$。" }, { layer: 3, text: "63。" }], formulaPreview: "(2⁶-1) = 63" },
    { id: "step7", position: 7, questionText: "初項 1、公比 2 の最初の 7 項の和は？", answer: 127, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$2^7 - 1$。" }, { layer: 2, text: "$128 - 1$。" }, { layer: 3, text: "127。" }], formulaPreview: "(2⁷-1) = 127" },
    { id: "step8", position: 8, questionText: "初項 2、公比 3 の最初の 3 項の和（2+6+18）は？", answer: 26, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$2 \\times (3^3 - 1)/(3 - 1)$。" }, { layer: 2, text: "$2 \\times 26 / 2$。" }, { layer: 3, text: "26。" }], formulaPreview: "2·(27-1)/2 = 26" },
    { id: "step9", position: 9, questionText: "初項 1、公比 2 の最初の 10 項の和は？", answer: 1023, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$2^{10} - 1$。" }, { layer: 2, text: "$1024 - 1$。" }, { layer: 3, text: "1023。" }], formulaPreview: "(2¹⁰-1) = 1023" },
    { id: "step10", position: 10, questionText: "初項 1、公比 4 の最初の 4 項の和（1+4+16+64）は？", answer: 85, unit: "", unknownLabel: "和", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "公比 4。$1 \\times (4^4 - 1)/(4 - 1)$。" }, { layer: 2, text: "$255 / 3$。" }, { layer: 3, text: "85。" }], formulaPreview: "(256-1)/3 = 85" },
  ],
};

/** EXP1: 指数 b^n */
export const ALGEBRA2_EXP_SERIES: LearnerSeries = {
  id: "algebra2_exp_01",
  title: "指数の値",
  subtitle: "$b^n$ を整数で求める10問。指数法則の土台。",
  patternId: "EXP1",
  unit: "algebra_2",
  revelationLabel: "b^n は「b を n 回かけたもの」",
  steps: [
    { id: "step1", position: 1, questionText: "$2^3$ はいくつでしょう？", answer: 8, unit: "", unknownLabel: "値", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "2 を 3 回かける。" }, { layer: 2, text: "$2 \\times 2 \\times 2$。" }, { layer: 3, text: "8。" }], formulaPreview: "2³ = 8" },
    { id: "step2", position: 2, questionText: "$2^4$ はいくつでしょう？", answer: 16, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$2^3 \\times 2$。" }, { layer: 2, text: "$8 \\times 2$。" }, { layer: 3, text: "16。" }], formulaPreview: "2⁴ = 16" },
    { id: "step3", position: 3, questionText: "$3^2$ はいくつでしょう？", answer: 9, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "3 を 2 回かける。" }, { layer: 2, text: "$3 \\times 3$。" }, { layer: 3, text: "9。" }], formulaPreview: "3² = 9" },
    { id: "step4", position: 4, questionText: "$2^5$ はいくつでしょう？", answer: 32, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$2^4 \\times 2$。" }, { layer: 2, text: "$16 \\times 2$。" }, { layer: 3, text: "32。" }], formulaPreview: "2⁵ = 32" },
    { id: "step5", position: 5, questionText: "$3^3$ はいくつでしょう？", answer: 27, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$3 \\times 3 \\times 3$。" }, { layer: 2, text: "$9 \\times 3$。" }, { layer: 3, text: "27。" }], formulaPreview: "3³ = 27" },
    { id: "step6", position: 6, questionText: "$2^6$ はいくつでしょう？", answer: 64, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$2^5 \\times 2$。" }, { layer: 2, text: "$32 \\times 2$。" }, { layer: 3, text: "64。" }], formulaPreview: "2⁶ = 64" },
    { id: "step7", position: 7, questionText: "$5^2$ はいくつでしょう？", answer: 25, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$5 \\times 5$。" }, { layer: 2, text: "25。" }, { layer: 3, text: "25。" }], formulaPreview: "5² = 25" },
    { id: "step8", position: 8, questionText: "$2^7$ はいくつでしょう？", answer: 128, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$2^6 \\times 2$。" }, { layer: 2, text: "$64 \\times 2$。" }, { layer: 3, text: "128。" }], formulaPreview: "2⁷ = 128" },
    { id: "step9", position: 9, questionText: "$4^3$ はいくつでしょう？", answer: 64, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$4 \\times 4 \\times 4$。" }, { layer: 2, text: "$16 \\times 4$。" }, { layer: 3, text: "64。" }], formulaPreview: "4³ = 64" },
    { id: "step10", position: 10, questionText: "$10^3$ はいくつでしょう？（10進法の千の位）", answer: 1000, unit: "", unknownLabel: "値", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$10 \\times 10 \\times 10$。" }, { layer: 2, text: "$100 \\times 10$。" }, { layer: 3, text: "1000。" }], formulaPreview: "10³ = 1000" },
  ],
};

/** VEC2: ベクトルの大きさ |v| = √(a² + b²) */
export const ALGEBRA2_VEC_MAG_SERIES: LearnerSeries = {
  id: "algebra2_vec_mag_01",
  title: "ベクトルの大きさ",
  subtitle: "$|\\vec{v}| = \\sqrt{a^2 + b^2}$ を求める10問。整数結果になる組合せで。",
  patternId: "VEC2",
  unit: "algebra_2",
  revelationLabel: "ベクトルの大きさ = √(x² + y²)",
  steps: [
    { id: "step1", position: 1, questionText: "$\\vec{v} = (3, 4)$ の大きさはいくつでしょう？", answer: 5, unit: "", unknownLabel: "大きさ", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "$\\sqrt{3^2 + 4^2}$。" }, { layer: 2, text: "$\\sqrt{9 + 16} = \\sqrt{25}$。" }, { layer: 3, text: "5。" }], formulaPreview: "√(9+16) = 5" },
    { id: "step2", position: 2, questionText: "$\\vec{v} = (6, 8)$ の大きさはいくつでしょう？", answer: 10, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$\\sqrt{36 + 64}$。" }, { layer: 2, text: "$\\sqrt{100}$。" }, { layer: 3, text: "10。" }], formulaPreview: "√(36+64) = 10" },
    { id: "step3", position: 3, questionText: "$\\vec{v} = (5, 12)$ の大きさはいくつでしょう？", answer: 13, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "$\\sqrt{25 + 144}$。" }, { layer: 2, text: "$\\sqrt{169}$。" }, { layer: 3, text: "13。" }], formulaPreview: "√(25+144) = 13" },
    { id: "step4", position: 4, questionText: "$\\vec{v} = (8, 15)$ の大きさはいくつでしょう？", answer: 17, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$\\sqrt{64 + 225}$。" }, { layer: 2, text: "$\\sqrt{289}$。" }, { layer: 3, text: "17。" }], formulaPreview: "√(64+225) = 17" },
    { id: "step5", position: 5, questionText: "$\\vec{v} = (9, 12)$ の大きさはいくつでしょう？", answer: 15, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$\\sqrt{81 + 144}$。" }, { layer: 2, text: "$\\sqrt{225}$。" }, { layer: 3, text: "15。" }], formulaPreview: "√(81+144) = 15" },
    { id: "step6", position: 6, questionText: "$\\vec{v} = (7, 24)$ の大きさはいくつでしょう？", answer: 25, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$\\sqrt{49 + 576}$。" }, { layer: 2, text: "$\\sqrt{625}$。" }, { layer: 3, text: "25。" }], formulaPreview: "√(49+576) = 25" },
    { id: "step7", position: 7, questionText: "$\\vec{v} = (12, 16)$ の大きさはいくつでしょう？", answer: 20, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "(3,4) の 4 倍。" }, { layer: 2, text: "$\\sqrt{144 + 256} = \\sqrt{400}$。" }, { layer: 3, text: "20。" }], formulaPreview: "√(144+256) = 20" },
    { id: "step8", position: 8, questionText: "$\\vec{v} = (20, 21)$ の大きさはいくつでしょう？", answer: 29, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$\\sqrt{400 + 441}$。" }, { layer: 2, text: "$\\sqrt{841}$。" }, { layer: 3, text: "29。" }], formulaPreview: "√(400+441) = 29" },
    { id: "step9", position: 9, questionText: "$\\vec{v} = (3, 0)$ の大きさはいくつでしょう？", answer: 3, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$\\sqrt{9 + 0}$。" }, { layer: 2, text: "$\\sqrt{9}$。" }, { layer: 3, text: "3。" }], formulaPreview: "√(9+0) = 3" },
    { id: "step10", position: 10, questionText: "$\\vec{v} = (24, 7)$ の大きさはいくつでしょう？（成分の順を入れ替えても同じ大きさ）", answer: 25, unit: "", unknownLabel: "大きさ", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "step 6 と成分が入れ替わっただけ。" }, { layer: 2, text: "$\\sqrt{576 + 49}$。" }, { layer: 3, text: "25。同じ。" }], formulaPreview: "√(576+49) = 25" },
  ],
};

export const ALGEBRA_2_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA2_TRIG_PERIOD_SERIES,
  ALGEBRA2_LOG_SERIES,
  ALGEBRA2_ARITH_NTH_SERIES,
  ALGEBRA2_ARITH_SUM_SERIES,
  ALGEBRA2_GEO_NTH_SERIES,
  ALGEBRA2_GEO_SUM_SERIES,
  ALGEBRA2_DOT_SERIES,
  ALGEBRA2_VEC_MAG_SERIES,
  ALGEBRA2_EXP_SERIES,
  ALGEBRA2_DIFF_SERIES,
];
