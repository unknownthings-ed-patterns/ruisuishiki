/**
 * 数学Ⅰ・A 「数と式」の系列カタログ。
 *
 * 大人の自己教育・高校生の復習・先取りの全層を想定。
 * 各系列は推理式の原則：
 * - 基本原形は計算が暗算でできる範囲から
 * - 「同」で a, b を入れ替え（変動理論の vary one thing）
 * - 「質的変化」で変数記号を入れ替え（構造の同一性を発見）
 *
 * MVP では「乗法公式：(x+a)(x+b) の x の係数」から開始。
 * 後続として因数分解（逆オペレータ）、平方根の簡単化、を計画中。
 */

import type { LearnerSeries } from "./types";

/**
 * (x+a)(x+b) の展開で、x の係数を求める。
 * x の係数 = a + b（足し算なら誰でもできる）の発見が核。
 */
export const ALGEBRA_EXPANSION_AB_SERIES: LearnerSeries = {
  id: "algebra_expansion_ab_01",
  title: "乗法公式の入り口",
  subtitle:
    "(x+a)(x+b) を展開した時の x の係数を、足し算だけで見つけていく5問。",
  patternId: "E1",
  unit: "algebra_1",
  revelationLabel: "(x+a)(x+b) を展開した時の x の係数は、a + b",
  steps: [
    // 1. 基本原形（小さい正の数で、暗算で和が出る）
    {
      id: "step1",
      position: 1,
      questionText:
        "(x + 1)(x + 2) を展開すると、x² + □x + 2 になります。□に入る数はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "展開すると x の項が現れる。前項どうし、後項どうし、たすき掛けの結果のうち、x の項を生むのはどれだろう？",
        },
        {
          layer: 2,
          text: "x の係数になるのは、2つの定数 (a と b) の和 a + b。ここでは a = 1、b = 2。",
        },
        {
          layer: 3,
          text: "1 + 2 = 3。これが x の係数。",
        },
      ],
      formulaPreview: "1 + 2 = 3",
    },

    // 2. 同（材料置換・確認の喜び）
    {
      id: "step2",
      position: 2,
      questionText:
        "(x + 2)(x + 3) を展開すると、x² + □x + 6 になります。□に入る数はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と比べてみよう。" },
        {
          layer: 2,
          text: "解き方は同じ。a と b の値だけが変わっている。a + b を計算しよう。",
        },
        { layer: 3, text: "2 + 3 = 5。" },
      ],
      formulaPreview: "2 + 3 = 5",
    },

    // 3. 同（数が少し大きくなる）
    {
      id: "step3",
      position: 3,
      questionText:
        "(x + 3)(x + 5) を展開すると、x² + □x + 15 になります。□に入る数はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は前の問題と同じ。" },
        { layer: 2, text: "a + b を計算するだけ。" },
        { layer: 3, text: "3 + 5 = 8。" },
      ],
      formulaPreview: "3 + 5 = 8",
    },

    // 4. 同（負の数を導入・差異点の小さなバリエーション）
    {
      id: "step4",
      position: 4,
      questionText:
        "(x - 2)(x + 5) を展開すると、x² + □x - 10 になります。□に入る数はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。負の数が入っただけ。",
        },
        {
          layer: 2,
          text: "公式は同じ。 (x - 2) は (x + (-2)) と考える。 a = -2、b = 5。",
        },
        { layer: 3, text: "(-2) + 5 = 3。" },
      ],
      formulaPreview: "(-2) + 5 = 3",
    },

    // 5. 質的変化（変数記号の入れ替え：構造の同一性を体感）
    {
      id: "step5",
      position: 5,
      questionText:
        "(y + 4)(y + 6) を展開すると、y² + □y + 24 になります。□に入る数はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "y の係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x が y に変わっただけ。文字の名前は何でもよい。",
        },
        {
          layer: 2,
          text: "「2つの定数の和」という関係は変わらない。a + b を計算しよう。",
        },
        { layer: 3, text: "4 + 6 = 10。" },
      ],
      formulaPreview: "4 + 6 = 10",
    },
  ],
};

/**
 * (x+a)² の展開で、x の係数を求める。
 * x の係数 = 2a（足し算の係数ではなく、倍率になっている）の発見が核。
 *
 * 学習者が ALGEBRA_EXPANSION_AB_SERIES (E1: a+b) を経験したあとに歩くと、
 * 「a+b と 2a の違い」「2a は a+a だから E1 の特殊形」という
 * 文型間の関係への気づきが生まれる。
 */
export const ALGEBRA_EXPANSION_SQ_SERIES: LearnerSeries = {
  id: "algebra_expansion_sq_01",
  title: "平方の展開",
  subtitle:
    "(x+a)² を展開した時の x の係数を、2倍の関係から見つけていく5問。",
  patternId: "E2",
  unit: "algebra_1",
  revelationLabel: "(x+a)² を展開した時の x の係数は、2 × a",
  steps: [
    // 1. 基本原形（暗算で 2×1）
    {
      id: "step1",
      position: 1,
      questionText:
        "(x + 1)² を展開すると、x² + □x + 1 になります。□に入る数はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "(x + a)² を展開する公式を思い出そう。x² + 2ax + a² という形になる。",
        },
        {
          layer: 2,
          text: "x の係数は 2a。ここでは a = 1 だから、2 × 1 を計算する。",
        },
        {
          layer: 3,
          text: "2 × 1 = 2。これが x の係数。",
        },
      ],
      formulaPreview: "2 × 1 = 2",
    },

    // 2. 同（材料置換）
    {
      id: "step2",
      position: 2,
      questionText:
        "(x + 2)² を展開すると、x² + □x + 4 になります。□に入る数はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と比べてみよう。" },
        {
          layer: 2,
          text: "解き方は同じ。a の値だけが変わった。2a を計算しよう。",
        },
        { layer: 3, text: "2 × 2 = 4。" },
      ],
      formulaPreview: "2 × 2 = 4",
    },

    // 3. 同（a が大きく）
    {
      id: "step3",
      position: 3,
      questionText:
        "(x + 4)² を展開すると、x² + □x + 16 になります。□に入る数はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は前の問題と同じ。" },
        { layer: 2, text: "2a の計算だけ。" },
        { layer: 3, text: "2 × 4 = 8。" },
      ],
      formulaPreview: "2 × 4 = 8",
    },

    // 4. 同（負数）
    {
      id: "step4",
      position: 4,
      questionText:
        "(x - 3)² を展開すると、x² + □x + 9 になります。□に入る数はいくつでしょう？",
      answer: -6,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "(x - 3) は (x + (-3)) のこと。負の数になっただけ。",
        },
        {
          layer: 2,
          text: "公式は同じ。 a = -3 として 2a を計算する。",
        },
        { layer: 3, text: "2 × (-3) = -6。" },
      ],
      formulaPreview: "2 × (-3) = -6",
    },

    // 5. 質的変化（変数記号変更）
    {
      id: "step5",
      position: 5,
      questionText:
        "(y + 5)² を展開すると、y² + □y + 25 になります。□に入る数はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "y の係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x が y に変わっただけ。文字の名前は何でもよい。",
        },
        {
          layer: 2,
          text: "「2 × 定数」の関係は変わらない。2a を計算しよう。",
        },
        { layer: 3, text: "2 × 5 = 10。" },
      ],
      formulaPreview: "2 × 5 = 10",
    },
  ],
};

/**
 * 因数分解 x² + Cx + D = (x+a)(x+b)
 * E1 の逆オペレータ——展開で a+b を求めたところを、和と積から逆算する。
 * 「a と b のうち小さい方」を答える形にして、入力を1つの整数に。
 */
export const ALGEBRA_FACTORING_SERIES: LearnerSeries = {
  id: "algebra_factoring_01",
  title: "因数分解（展開の逆）",
  subtitle:
    "x² + Cx + D = (x+a)(x+b) のとき、a と b のうち小さい方を答える5問。",
  patternId: "F1",
  unit: "algebra_1",
  revelationLabel: "和と積から、2 つの数 a, b を逆算する",
  steps: [
    // 1. 基本原形
    {
      id: "step1",
      position: 1,
      questionText:
        "x² + 3x + 2 = (x + a)(x + b) と因数分解できます。a と b のうち小さい方を答えてください。",
      answer: 1,
      unit: "",
      unknownLabel: "a と b のうち小さい方",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "(x+a)(x+b) を展開すると x² + (a+b)x + ab。a と b は和が x の係数、積が定数項。",
        },
        {
          layer: 2,
          text: "和が 3、積が 2 となる2つの整数を探そう。",
        },
        {
          layer: 3,
          text: "1 + 2 = 3, 1 × 2 = 2。よって a=1, b=2。小さい方は 1。",
        },
      ],
      formulaPreview: "和 3、積 2 → (1, 2)",
    },

    // 2. 同
    {
      id: "step2",
      position: 2,
      questionText:
        "x² + 5x + 6 = (x + a)(x + b) と因数分解できます。a と b のうち小さい方を答えてください。",
      answer: 2,
      unit: "",
      unknownLabel: "a と b のうち小さい方",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と比べてみよう。" },
        { layer: 2, text: "和が 5、積が 6 となる2数。" },
        { layer: 3, text: "2 + 3 = 5, 2 × 3 = 6。小さい方は 2。" },
      ],
      formulaPreview: "和 5、積 6 → (2, 3)",
    },

    // 3. 同
    {
      id: "step3",
      position: 3,
      questionText:
        "x² + 8x + 15 = (x + a)(x + b) と因数分解できます。a と b のうち小さい方を答えてください。",
      answer: 3,
      unit: "",
      unknownLabel: "a と b のうち小さい方",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "和が 8、積が 15 となる2数。" },
        { layer: 3, text: "3 + 5 = 8, 3 × 5 = 15。小さい方は 3。" },
      ],
      formulaPreview: "和 8、積 15 → (3, 5)",
    },

    // 4. 同（負数導入：真ん中の係数だけ負・定数項は正）
    {
      id: "step4",
      position: 4,
      questionText:
        "x² - 5x + 6 = (x + a)(x + b) と因数分解できます。a と b のうち小さい方を答えてください。",
      answer: -3,
      unit: "",
      unknownLabel: "a と b のうち小さい方",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。真ん中の係数だけが負になっている。",
        },
        {
          layer: 2,
          text: "和が -5、積が 6（正）→ 2数はどちらも負。",
        },
        {
          layer: 3,
          text: "(-2) + (-3) = -5, (-2) × (-3) = 6。よって a=-3, b=-2。小さい方は -3。",
        },
      ],
      formulaPreview: "和 -5、積 6 → (-3, -2)",
    },

    // 5. 質的変化（変数記号変更）
    {
      id: "step5",
      position: 5,
      questionText:
        "y² + 7y + 12 = (y + a)(y + b) と因数分解できます。a と b のうち小さい方を答えてください。",
      answer: 3,
      unit: "",
      unknownLabel: "a と b のうち小さい方",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x が y に変わっただけ。文字の名前は何でもよい。",
        },
        {
          layer: 2,
          text: "「和が真ん中、積が右端」の関係は同じ。和が 7、積が 12。",
        },
        { layer: 3, text: "3 + 4 = 7, 3 × 4 = 12。小さい方は 3。" },
      ],
      formulaPreview: "和 7、積 12 → (3, 4)",
    },
  ],
};

/**
 * 平方根の簡単化 √n → a√m （n = a²×m、m は平方因子を持たない）
 * 「最大の平方数で割って外に出す」操作を5問で身に付ける。
 */
export const ALGEBRA_SQRT_SIMPLIFY_SERIES: LearnerSeries = {
  id: "algebra_sqrt_simplify_01",
  title: "平方根の簡単化",
  subtitle:
    "√n を a√m の形に整える5問。「根号の外に出る a」を見つけていく。",
  patternId: "R1",
  unit: "algebra_1",
  revelationLabel: "根号の中の「平方の部分」を外に出す",
  steps: [
    // 1. 基本原形 √8 = 2√2
    {
      id: "step1",
      position: 1,
      questionText:
        "√8 を a√m の形に簡単にすると、a√2 になります。a はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "根号の外に出る数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "8 を「平方数 × 残り」の形に分けてみよう。",
        },
        {
          layer: 2,
          text: "8 = 4 × 2。 4 = 2² なので、√4 = 2 が外に出る。",
        },
        {
          layer: 3,
          text: "√8 = √(4 × 2) = √4 × √2 = 2√2。a = 2。",
        },
      ],
      formulaPreview: "√8 = √(2² × 2) = 2√2",
    },

    // 2. 同 √12 = 2√3
    {
      id: "step2",
      position: 2,
      questionText:
        "√12 を a√m の形に簡単にすると、a√3 になります。a はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "根号の外に出る数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ要領。12 を「平方数 × 残り」に。" },
        { layer: 2, text: "12 = 4 × 3。 √4 = 2。" },
        { layer: 3, text: "√12 = 2√3。a = 2。" },
      ],
      formulaPreview: "√12 = √(2² × 3) = 2√3",
    },

    // 3. 同 √18 = 3√2
    {
      id: "step3",
      position: 3,
      questionText:
        "√18 を a√m の形に簡単にすると、a√2 になります。a はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "根号の外に出る数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "やり方は同じ。18 を「平方数 × 残り」に分ける。",
        },
        { layer: 2, text: "18 = 9 × 2。 9 = 3² なので √9 = 3。" },
        { layer: 3, text: "√18 = 3√2。a = 3。" },
      ],
      formulaPreview: "√18 = √(3² × 2) = 3√2",
    },

    // 4. 同 √50 = 5√2
    {
      id: "step4",
      position: 4,
      questionText:
        "√50 を a√m の形に簡単にすると、a√2 になります。a はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "根号の外に出る数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前と同じ要領。50 を「平方数 × 残り」に。" },
        { layer: 2, text: "50 = 25 × 2。 25 = 5² なので √25 = 5。" },
        { layer: 3, text: "√50 = 5√2。a = 5。" },
      ],
      formulaPreview: "√50 = √(5² × 2) = 5√2",
    },

    // 5. 質的変化（より大きな数で、平方因子が大きい）
    {
      id: "step5",
      position: 5,
      questionText:
        "√75 を a√m の形に簡単にすると、a√3 になります。a はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "根号の外に出る数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前の問題と同じ仕組み。75 の中の平方因子を見つけよう。",
        },
        { layer: 2, text: "75 = 25 × 3。 25 = 5²。" },
        { layer: 3, text: "√75 = 5√3。a = 5。" },
      ],
      formulaPreview: "√75 = √(5² × 3) = 5√3",
    },
  ],
};

/**
 * 1次不等式 ax + b > 0 を x > c に変形する。MVP では a>0 かつ c が整数の場合のみ。
 */
export const ALGEBRA_LINEAR_INEQ_SERIES: LearnerSeries = {
  id: "algebra_linear_ineq_01",
  title: "1次不等式の入り口",
  subtitle:
    "ax + b > 0 の解 x > c の c を見つける5問。両辺を移項・割り算する。",
  patternId: "I1",
  unit: "algebra_1",
  revelationLabel: "定数を右辺へ移項し、両辺を x の係数で割る",
  steps: [
    // 1. 基本原形 x + 1 > 0 → x > -1
    {
      id: "step1",
      position: 1,
      questionText:
        "x + 1 > 0 の解は x > c の形になります。c はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "境界値 c",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "両辺から 1 を引いてみよう。等式と同じように扱える。",
        },
        {
          layer: 2,
          text: "x + 1 > 0 → x > -1（1 を右辺へ移項すると符号が変わる）。",
        },
        { layer: 3, text: "c = -1。" },
      ],
      formulaPreview: "x > -1 / 1 = -1",
    },

    // 2. 同 x - 3 > 0 → x > 3
    {
      id: "step2",
      position: 2,
      questionText:
        "x - 3 > 0 の解は x > c の形になります。c はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "境界値 c",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と比べてみよう。やり方は同じ。" },
        { layer: 2, text: "両辺に 3 を加える、または移項。" },
        { layer: 3, text: "x > 3。c = 3。" },
      ],
      formulaPreview: "x > 3 / 1 = 3",
    },

    // 3. 同 2x - 6 > 0 → x > 3
    {
      id: "step3",
      position: 3,
      questionText:
        "2x - 6 > 0 の解は x > c の形になります。c はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "境界値 c",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。今度は x の前に係数 2 がついた。",
        },
        {
          layer: 2,
          text: "6 を右辺へ → 2x > 6。次に両辺を 2 で割る（正で割るので不等号そのまま）。",
        },
        { layer: 3, text: "x > 3。c = 3。" },
      ],
      formulaPreview: "x > 6 / 2 = 3",
    },

    // 4. 同 3x + 9 > 0 → x > -3
    {
      id: "step4",
      position: 4,
      questionText:
        "3x + 9 > 0 の解は x > c の形になります。c はいくつでしょう？",
      answer: -3,
      unit: "",
      unknownLabel: "境界値 c",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前の問題と同じ方針。" },
        {
          layer: 2,
          text: "9 を右辺へ移項 → 3x > -9。両辺を 3 で割る。",
        },
        { layer: 3, text: "x > -3。c = -3。" },
      ],
      formulaPreview: "x > -9 / 3 = -3",
    },

    // 5. 質的変化（変数記号変更）
    {
      id: "step5",
      position: 5,
      questionText:
        "4y - 8 > 0 の解は y > c の形になります。c はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "境界値 c",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x が y に変わっただけ。やり方は同じ。",
        },
        {
          layer: 2,
          text: "8 を右辺へ → 4y > 8。両辺を 4 で割る。",
        },
        { layer: 3, text: "y > 2。c = 2。" },
      ],
      formulaPreview: "y > 8 / 4 = 2",
    },
  ],
};

/** 数学Ⅰ・A の全系列リスト（将来拡張）。 */
export const ALGEBRA_1_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA_EXPANSION_AB_SERIES,
  ALGEBRA_EXPANSION_SQ_SERIES,
  ALGEBRA_FACTORING_SERIES,
  ALGEBRA_SQRT_SIMPLIFY_SERIES,
  ALGEBRA_LINEAR_INEQ_SERIES,
];
