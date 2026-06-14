/**
 * 中学校数学の系列カタログ。
 * 連立方程式・ピタゴラスの定理・組合せ。
 */

import type { LearnerSeries } from "./types";

/** M1: 連立方程式 (x+y=p, x-y=q) → x = (p+q)/2 */
export const MIDDLE_SIMUL_SERIES: LearnerSeries = {
  id: "middle_simul_01",
  title: "連立方程式の入り口",
  subtitle:
    "x+y=p, x-y=q から x を求める5問。「加減法」の感覚をつかむ。",
  patternId: "M1",
  unit: "middle",
  revelationLabel: "2式を足して 2 で割れば x が出る",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "連立方程式 $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$ を解いた時の $x$ の値はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x の値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "2 つの式を足すと、y が消える。",
        },
        { layer: 2, text: "(x+y) + (x-y) = 5 + 1 → 2x = 6。" },
        { layer: 3, text: "x = 3。" },
      ],
      formulaPreview: "(5 + 1) / 2 = 3",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "連立方程式 $\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}$ を解いた時の $x$ の値はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "x の値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と同じやり方。" },
        { layer: 2, text: "2x = 7 + 3 = 10。" },
        { layer: 3, text: "x = 5。" },
      ],
      formulaPreview: "(7 + 3) / 2 = 5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "連立方程式 $\\begin{cases} x + y = 10 \\\\ x - y = 4 \\end{cases}$ を解いた時の $x$ の値はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "x の値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "2x = 10 + 4 = 14。" },
        { layer: 3, text: "x = 7。" },
      ],
      formulaPreview: "(10 + 4) / 2 = 7",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "連立方程式 $\\begin{cases} x + y = 8 \\\\ x - y = 2 \\end{cases}$ を解いた時の $x$ の値はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "x の値",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前と同じやり方。" },
        { layer: 2, text: "2x = 8 + 2 = 10。" },
        { layer: 3, text: "x = 5。" },
      ],
      formulaPreview: "(8 + 2) / 2 = 5",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "連立方程式 $\\begin{cases} p + q = 9 \\\\ p - q = 3 \\end{cases}$ を解いた時の $p$ の値はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "p の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x, y が p, q に変わっただけ。やり方は同じ。",
        },
        { layer: 2, text: "2p = 9 + 3 = 12。" },
        { layer: 3, text: "p = 6。" },
      ],
      formulaPreview: "(9 + 3) / 2 = 6",
    },
  ],
};

/** PT1: ピタゴラスの定理 c = √(a² + b²) */
export const MIDDLE_PYTHAGOREAN_SERIES: LearnerSeries = {
  id: "middle_pythagorean_01",
  title: "ピタゴラスの定理",
  subtitle:
    "直角三角形の2辺 a, b から斜辺 c を求める5問。整数になる組合せで。",
  patternId: "PT1",
  unit: "middle",
  revelationLabel: "c² = a² + b² より、c = √(a² + b²)",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "直角三角形の2辺が 3 と 4 のとき、斜辺の長さはいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "斜辺の長さ",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "ピタゴラスの定理：$c^2 = a^2 + b^2$。" },
        { layer: 2, text: "$c^2 = 3^2 + 4^2 = 9 + 16 = 25$。" },
        { layer: 3, text: "$c = \\sqrt{25} = 5$。" },
      ],
      formulaPreview: "√(9+16) = 5",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "直角三角形の2辺が 6 と 8 のとき、斜辺の長さはいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "斜辺の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と同じ式。" },
        { layer: 2, text: "$c^2 = 36 + 64 = 100$。" },
        { layer: 3, text: "$c = 10$。" },
      ],
      formulaPreview: "√(36+64) = 10",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "直角三角形の2辺が 5 と 12 のとき、斜辺の長さはいくつでしょう？",
      answer: 13,
      unit: "",
      unknownLabel: "斜辺の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "$c^2 = 25 + 144 = 169$。" },
        { layer: 3, text: "$c = 13$。" },
      ],
      formulaPreview: "√(25+144) = 13",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "直角三角形の2辺が 8 と 15 のとき、斜辺の長さはいくつでしょう？",
      answer: 17,
      unit: "",
      unknownLabel: "斜辺の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前と同じ。" },
        { layer: 2, text: "$c^2 = 64 + 225 = 289$。" },
        { layer: 3, text: "$c = 17$。" },
      ],
      formulaPreview: "√(64+225) = 17",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "正方形の縦と横が 7 のとき、対角線の長さは $a\\sqrt{2}$ になります。$a$ はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "対角線の根号の前",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "正方形は直角三角形でできている。対角線も斜辺。",
        },
        {
          layer: 2,
          text: "$c^2 = 7^2 + 7^2 = 98$。$c = \\sqrt{98} = 7\\sqrt{2}$。",
        },
        { layer: 3, text: "$a = 7$。" },
      ],
      formulaPreview: "√(2·7²) = 7√2",
    },
  ],
};

/** PR1: 組合せ C(n, 2) = n(n-1)/2 */
export const MIDDLE_COMBINATION_SERIES: LearnerSeries = {
  id: "middle_combination_01",
  title: "組合せ C(n, 2)",
  subtitle:
    "n 人から 2 人を選ぶ組合せの数を求める5問。「組」と「順序」の区別。",
  patternId: "PR1",
  unit: "middle",
  revelationLabel: "C(n, 2) = n(n-1) / 2",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "4 人の中から 2 人を選ぶ組合せは何通りでしょう？",
      answer: 6,
      unit: "通り",
      unknownLabel: "組合せの数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$\\dfrac{n(n-1)}{2}$。" },
        { layer: 2, text: "$\\dfrac{4 \\times 3}{2} = \\dfrac{12}{2}$。" },
        { layer: 3, text: "6 通り。" },
      ],
      formulaPreview: "(4·3) / 2 = 6",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "5 人の中から 2 人を選ぶ組合せは何通りでしょう？",
      answer: 10,
      unit: "通り",
      unknownLabel: "組合せの数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と同じ公式。" },
        { layer: 2, text: "$\\dfrac{5 \\times 4}{2} = \\dfrac{20}{2}$。" },
        { layer: 3, text: "10 通り。" },
      ],
      formulaPreview: "(5·4) / 2 = 10",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "6 人の中から 2 人を選ぶ組合せは何通りでしょう？",
      answer: 15,
      unit: "通り",
      unknownLabel: "組合せの数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "$\\dfrac{6 \\times 5}{2} = \\dfrac{30}{2}$。" },
        { layer: 3, text: "15 通り。" },
      ],
      formulaPreview: "(6·5) / 2 = 15",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "8 人の中から 2 人を選ぶ組合せは何通りでしょう？",
      answer: 28,
      unit: "通り",
      unknownLabel: "組合せの数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式に値を代入。" },
        { layer: 2, text: "$\\dfrac{8 \\times 7}{2} = \\dfrac{56}{2}$。" },
        { layer: 3, text: "28 通り。" },
      ],
      formulaPreview: "(8·7) / 2 = 28",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "クラス 10 人から 2 人の代表を選ぶ組合せは何通りでしょう？",
      answer: 45,
      unit: "通り",
      unknownLabel: "組合せの数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "「人」が「代表」になっただけ。仕組みは同じ。",
        },
        { layer: 2, text: "$\\dfrac{10 \\times 9}{2} = \\dfrac{90}{2}$。" },
        { layer: 3, text: "45 通り。" },
      ],
      formulaPreview: "(10·9) / 2 = 45",
    },
  ],
};

export const MIDDLE_SCHOOL_SERIES_LIST: LearnerSeries[] = [
  MIDDLE_SIMUL_SERIES,
  MIDDLE_PYTHAGOREAN_SERIES,
  MIDDLE_COMBINATION_SERIES,
];
