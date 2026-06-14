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
        "$(x+1)(x+2)$ を展開すると、$x^2 + \\square x + 2$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x+2)(x+3)$ を展開すると、$x^2 + \\square x + 6$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x+3)(x+5)$ を展開すると、$x^2 + \\square x + 15$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x-2)(x+5)$ を展開すると、$x^2 + \\square x - 10$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(y+4)(y+6)$ を展開すると、$y^2 + \\square y + 24$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x+1)^2$ を展開すると、$x^2 + \\square x + 1$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x+2)^2$ を展開すると、$x^2 + \\square x + 4$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x+4)^2$ を展開すると、$x^2 + \\square x + 16$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(x-3)^2$ を展開すると、$x^2 + \\square x + 9$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$(y+5)^2$ を展開すると、$y^2 + \\square y + 25$ になります。$\\square$ に入る数はいくつでしょう？",
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
        "$x^2 + 3x + 2 = (x+a)(x+b)$ と因数分解できます。$a$ と $b$ のうち小さい方を答えてください。",
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
        "$x^2 + 5x + 6 = (x+a)(x+b)$ と因数分解できます。$a$ と $b$ のうち小さい方を答えてください。",
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
        "$x^2 + 8x + 15 = (x+a)(x+b)$ と因数分解できます。$a$ と $b$ のうち小さい方を答えてください。",
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
        "$x^2 - 5x + 6 = (x+a)(x+b)$ と因数分解できます。$a$ と $b$ のうち小さい方を答えてください。",
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
        "$y^2 + 7y + 12 = (y+a)(y+b)$ と因数分解できます。$a$ と $b$ のうち小さい方を答えてください。",
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
        "$\\sqrt{8}$ を $a\\sqrt{m}$ の形に簡単にすると、$a\\sqrt{2}$ になります。$a$ はいくつでしょう？",
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
        "$\\sqrt{12}$ を $a\\sqrt{m}$ の形に簡単にすると、$a\\sqrt{3}$ になります。$a$ はいくつでしょう？",
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
        "$\\sqrt{18}$ を $a\\sqrt{m}$ の形に簡単にすると、$a\\sqrt{2}$ になります。$a$ はいくつでしょう？",
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
        "$\\sqrt{50}$ を $a\\sqrt{m}$ の形に簡単にすると、$a\\sqrt{2}$ になります。$a$ はいくつでしょう？",
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
        "$\\sqrt{75}$ を $a\\sqrt{m}$ の形に簡単にすると、$a\\sqrt{3}$ になります。$a$ はいくつでしょう？",
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
        "$x + 1 > 0$ の解は $x > c$ の形になります。$c$ はいくつでしょう？",
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
        "$x - 3 > 0$ の解は $x > c$ の形になります。$c$ はいくつでしょう？",
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
        "$2x - 6 > 0$ の解は $x > c$ の形になります。$c$ はいくつでしょう？",
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
        "$3x + 9 > 0$ の解は $x > c$ の形になります。$c$ はいくつでしょう？",
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
        "$4y - 8 > 0$ の解は $y > c$ の形になります。$c$ はいくつでしょう？",
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

/** Q1: x²+bx+c=0 の解の和（解と係数の関係） */
export const ALGEBRA_QUAD_SUM_SERIES: LearnerSeries = {
  id: "algebra_quad_sum_01",
  title: "解と係数の関係（和）",
  subtitle:
    "$x^2 + bx + c = 0$ の2つの解の和を求める5問。「和は -b」の発見。",
  patternId: "Q1",
  unit: "algebra_1",
  revelationLabel: "x² + bx + c = 0 の解の和は、−b（解と係数の関係）",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$x^2 + 5x + 6 = 0$ の2つの解の和はいくつでしょう？",
      answer: -5,
      unit: "",
      unknownLabel: "解の和",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "因数分解して 2 解を求めると、$(x+2)(x+3)=0$ より $x=-2, -3$。",
        },
        { layer: 2, text: "和は $-2 + (-3) = -5$。" },
        {
          layer: 3,
          text: "解と係数の関係：解の和は $-b = -5$。",
        },
      ],
      formulaPreview: "-(5) = -5",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$x^2 + 7x + 12 = 0$ の2つの解の和はいくつでしょう？",
      answer: -7,
      unit: "",
      unknownLabel: "解の和",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と同じ。和は $-b$。" },
        { layer: 2, text: "$b = 7$ なので和は $-7$。" },
        { layer: 3, text: "$-7$。" },
      ],
      formulaPreview: "-(7) = -7",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$x^2 - 5x + 6 = 0$ の2つの解の和はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "解の和",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$b$ は今度は $-5$。和は $-b$。" },
        { layer: 2, text: "$-(-5) = 5$。" },
        { layer: 3, text: "$5$。" },
      ],
      formulaPreview: "-(-5) = 5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$x^2 + 8x + 15 = 0$ の2つの解の和はいくつでしょう？",
      answer: -8,
      unit: "",
      unknownLabel: "解の和",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式 $-b$。" },
        { layer: 2, text: "$b = 8$ なので和は $-8$。" },
        { layer: 3, text: "$-8$。" },
      ],
      formulaPreview: "-(8) = -8",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$y^2 + 9y + 20 = 0$ の2つの解の和はいくつでしょう？",
      answer: -9,
      unit: "",
      unknownLabel: "解の和",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "$x$ が $y$ に変わっただけ。「解の和は $-b$」は同じ。",
        },
        { layer: 2, text: "$b = 9$。" },
        { layer: 3, text: "$-9$。" },
      ],
      formulaPreview: "-(9) = -9",
    },
  ],
};

/** S1: 必要・十分条件の判定（1〜4から選ぶ） */
export const ALGEBRA_NECESSARY_SUFFICIENT_SERIES: LearnerSeries = {
  id: "algebra_necsuf_01",
  title: "必要条件・十分条件",
  subtitle:
    "命題 A→B と B→A の真偽から、A が B にとって何の条件かを答える5問。1=十分のみ／2=必要のみ／3=必要十分／4=どちらでもない。",
  patternId: "S1",
  unit: "algebra_1",
  revelationLabel: "A→B が真なら A は B の十分条件、B→A が真なら必要条件",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$x = 2$ は $x^2 = 4$ の何条件でしょう？（1=十分のみ／2=必要のみ／3=必要十分／4=どちらでもない）",
      answer: 1,
      unit: "",
      unknownLabel: "条件の種別",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "$A: x=2$、$B: x^2=4$。$A \\Rightarrow B$ は真？" },
        {
          layer: 2,
          text: "$x=2 \\Rightarrow x^2=4$ は真。逆 $x^2=4 \\Rightarrow x=2$ は偽（$x=-2$ もある）。",
        },
        {
          layer: 3,
          text: "A は B の十分条件（必要ではない）。答え 1。",
        },
      ],
      formulaPreview: "A→B 真、B→A 偽 → 十分のみ",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$x > 3$ は $x > 1$ の何条件でしょう？（1=十分のみ／2=必要のみ／3=必要十分／4=どちらでもない）",
      answer: 1,
      unit: "",
      unknownLabel: "条件の種別",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$x>3 \\Rightarrow x>1$ は真。" },
        {
          layer: 2,
          text: "逆 $x>1 \\Rightarrow x>3$ は偽（$x=2$ で反例）。",
        },
        { layer: 3, text: "十分のみ。答え 1。" },
      ],
      formulaPreview: "A→B 真、B→A 偽 → 十分のみ",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "「$|x| = 4$」は「$x = 4$ または $x = -4$」の何条件でしょう？（1=十分／2=必要／3=必要十分／4=どちらでもない）",
      answer: 3,
      unit: "",
      unknownLabel: "条件の種別",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$A$ と $B$ は同じことを言っている。" },
        {
          layer: 2,
          text: "$A \\Rightarrow B$ も $B \\Rightarrow A$ も真。",
        },
        { layer: 3, text: "必要十分。答え 3。" },
      ],
      formulaPreview: "A→B 真、B→A 真 → 必要十分",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$x$ が偶数 は $x$ が整数 の何条件でしょう？（1=十分／2=必要／3=必要十分／4=どちらでもない）",
      answer: 1,
      unit: "",
      unknownLabel: "条件の種別",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "偶数なら整数（真）。整数なら偶数（偽、$x=3$ で反例）。" },
        { layer: 2, text: "$A$ は $B$ より「強い」条件。" },
        { layer: 3, text: "十分のみ。答え 1。" },
      ],
      formulaPreview: "A→B 真、B→A 偽 → 十分のみ",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$x$ が 4 の倍数 は $x$ が 2 の倍数 の何条件でしょう？（1=十分／2=必要／3=必要十分／4=どちらでもない）",
      answer: 1,
      unit: "",
      unknownLabel: "条件の種別",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "「偶数 vs 整数」と同じ構造。「4 の倍数」は「2 の倍数」より強い。",
        },
        {
          layer: 2,
          text: "$A \\Rightarrow B$ は真。逆は偽（$x=2$ は 2 の倍数だが 4 の倍数でない）。",
        },
        { layer: 3, text: "十分のみ。答え 1。" },
      ],
      formulaPreview: "A→B 真、B→A 偽 → 十分のみ",
    },
  ],
};

/** V1: f(x)=x²+bx+c の頂点の x 座標 */
export const ALGEBRA_QUAD_VERTEX_SERIES: LearnerSeries = {
  id: "algebra_quad_vertex_01",
  title: "2次関数の頂点（x 座標）",
  subtitle:
    "$f(x) = x^2 + bx + c$ の頂点の $x$ 座標を平方完成で求める5問。",
  patternId: "V1",
  unit: "algebra_1",
  revelationLabel: "x² + bx + c の頂点の x 座標は −b / 2",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$f(x) = x^2 + 4x + 1$ の頂点の $x$ 座標はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "平方完成 $f(x) = (x+2)^2 - 3$。頂点は $(-2, -3)$。",
        },
        { layer: 2, text: "公式：頂点の x = $-b/2$。" },
        { layer: 3, text: "$-4/2 = -2$。" },
      ],
      formulaPreview: "-(4) / 2 = -2",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$f(x) = x^2 + 6x + 5$ の頂点の $x$ 座標はいくつでしょう？",
      answer: -3,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。$-b/2$。" },
        { layer: 2, text: "$-6/2 = -3$。" },
        { layer: 3, text: "$-3$。" },
      ],
      formulaPreview: "-(6) / 2 = -3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$f(x) = x^2 - 4x + 3$ の頂点の $x$ 座標はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "今度は $b = -4$。" },
        { layer: 2, text: "$-(-4)/2 = 4/2$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "-(-4) / 2 = 2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$f(x) = x^2 - 8x + 12$ の頂点の $x$ 座標はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$b = -8$。" },
        { layer: 2, text: "$-(-8)/2 = 8/2$。" },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "-(-8) / 2 = 4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$g(x) = x^2 + 2x - 3$ の頂点の $x$ 座標はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "関数名が $f$ から $g$ に変わっただけ。「頂点 = $-b/2$」は同じ。",
        },
        { layer: 2, text: "$-2/2$。" },
        { layer: 3, text: "$-1$。" },
      ],
      formulaPreview: "-(2) / 2 = -1",
    },
  ],
};

/** D1: 5つの数の平均 */
export const ALGEBRA_MEAN_SERIES: LearnerSeries = {
  id: "algebra_mean_01",
  title: "5つの数の平均",
  subtitle: "5つの数の平均を求める5問。データ分析の入り口。",
  patternId: "D1",
  unit: "algebra_1",
  revelationLabel: "平均 = 全部足して 5 で割る",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "5つの数 2, 4, 6, 8, 10 の平均はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "平均",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "全部足して 5 で割る。" },
        { layer: 2, text: "$2+4+6+8+10 = 30$。" },
        { layer: 3, text: "$30 / 5 = 6$。" },
      ],
      formulaPreview: "30 / 5 = 6",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "5つの数 1, 3, 5, 7, 9 の平均はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "平均",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "$1+3+5+7+9 = 25$。" },
        { layer: 3, text: "$25 / 5 = 5$。" },
      ],
      formulaPreview: "25 / 5 = 5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "5つの数 10, 20, 30, 40, 50 の平均はいくつでしょう？",
      answer: 30,
      unit: "",
      unknownLabel: "平均",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "全部足して 5 で割る。" },
        { layer: 2, text: "$10+20+30+40+50 = 150$。" },
        { layer: 3, text: "$150 / 5 = 30$。" },
      ],
      formulaPreview: "150 / 5 = 30",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "5つの数 -2, 0, 2, 4, 6 の平均はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "平均",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "負の数があるだけ。やり方は同じ。" },
        { layer: 2, text: "$-2+0+2+4+6 = 10$。" },
        { layer: 3, text: "$10 / 5 = 2$。" },
      ],
      formulaPreview: "10 / 5 = 2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "クラス 5 人のテストの点数 60, 70, 80, 90, 100 の平均は何点でしょう？",
      answer: 80,
      unit: "点",
      unknownLabel: "平均点",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "「点」がついただけ。仕組みは同じ。",
        },
        { layer: 2, text: "$60+70+80+90+100 = 400$。" },
        { layer: 3, text: "$400 / 5 = 80$。" },
      ],
      formulaPreview: "400 / 5 = 80",
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
  ALGEBRA_QUAD_SUM_SERIES,
  ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
  ALGEBRA_QUAD_VERTEX_SERIES,
  ALGEBRA_MEAN_SERIES,
];
