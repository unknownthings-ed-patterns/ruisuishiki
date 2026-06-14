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
  derivation: `**乗法公式の正体：分配法則の繰り返し**

$(x + a)(x + b)$ を展開したとき、$x$ の係数は **$a + b$**、定数項は **$ab$** になります。なぜそうなるのか、分配法則を丁寧に追えば見えてきます。

**式を分解して掛けてみる**

$(x + a)(x + b)$ は「$(x + a)$ という塊」に「$(x + b)$ という塊」をかけたもの。分配法則を2回使って広げると：

$$\\begin{aligned}
(x + a)(x + b) &= x(x + b) + a(x + b) \\\\
&= x \\cdot x + x \\cdot b + a \\cdot x + a \\cdot b \\\\
&= x^2 + bx + ax + ab \\\\
&= x^2 + (a + b)x + ab
\\end{aligned}$$

途中で $bx$ と $ax$ が出てきて、最後にまとめて $(a + b)x$ になります。これが「$x$ の係数は $a + b$」の理由。

**たすき掛けで覚える**

中学・高校では「**たすき掛け**」という覚え方をします。

$$
\\begin{array}{c}
(x + \\overset{a}{\\nearrow})(\\overset{x}{\\nwarrow} + b)
\\end{array}
$$

- $x$ と $b$ をかけて $bx$
- $a$ と $x$ をかけて $ax$
- これらを足して $(a + b)x$ → これが **真ん中の項**
- $a$ と $b$ をかけて $ab$ → これが **定数項**

「**たすき**」と呼ぶのは、線が斜めに交差して見えるから。$a$ と $b$ の **和** が中央の係数、**積** が定数項——これがすべての乗法公式の核心です。

**特殊なケース：平方の展開**

$a = b$ なら $(x + a)(x + a) = (x + a)^2$。このとき：

$$(x + a)^2 = x^2 + 2a \\cdot x + a^2$$

「真ん中の係数が **$2a$**」になるのは、$a + a = 2a$ から自然に出てきます。

**もう一つの特殊：差の積**

$a$ と $-a$ をかけ合わせる場合、$(x + a)(x - a)$。和は $a + (-a) = 0$ なので、真ん中の項が消えて：

$$(x + a)(x - a) = x^2 - a^2$$

「2乗の差」になります。これも乗法公式の特別な姿。

**結局、3つの公式は同じ仲間**

| 公式 | 名前 |
|---|---|
| $(x + a)(x + b) = x^2 + (a + b)x + ab$ | 一般形 |
| $(x + a)^2 = x^2 + 2ax + a^2$ | 平方 |
| $(x + a)(x - a) = x^2 - a^2$ | 差の積 |

3つの公式はすべて、$(x + a)(x + b)$ という1つの公式の **特別な場合** にすぎません。「**和が真ん中、積が右端**」さえ覚えておけば、どれもすぐに導けます。`,
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
        { layer: 1, text: "x が y に変わっただけ。文字の名前は何でもよい。" },
        { layer: 2, text: "「2つの定数の和」という関係は変わらない。a + b を計算しよう。" },
        { layer: 3, text: "4 + 6 = 10。" },
      ],
      formulaPreview: "4 + 6 = 10",
    },
    // 6-10：難化（数が大きい・両方負・混合・複合）
    { id: "step6", position: 6, questionText: "$(x+7)(x+9)$ を展開すると、$x^2 + \\square x + 63$ になります。$\\square$ は？", answer: 16, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$a + b$ を求めるだけ。" }, { layer: 2, text: "$7 + 9$。" }, { layer: 3, text: "16。" }], formulaPreview: "7 + 9 = 16" },
    { id: "step7", position: 7, questionText: "$(x-3)(x-5)$ を展開すると、$x^2 + \\square x + 15$ になります。$\\square$ は？", answer: -8, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "両方が負。$a = -3, b = -5$。" }, { layer: 2, text: "$(-3) + (-5)$。" }, { layer: 3, text: "$-8$。" }], formulaPreview: "(-3) + (-5) = -8" },
    { id: "step8", position: 8, questionText: "$(x-7)(x+3)$ を展開すると、$x^2 + \\square x - 21$ になります。$\\square$ は？", answer: -4, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$a = -7, b = 3$。" }, { layer: 2, text: "$(-7) + 3$。" }, { layer: 3, text: "$-4$。" }], formulaPreview: "(-7) + 3 = -4" },
    { id: "step9", position: 9, questionText: "$(x-10)(x-2)$ を展開すると、$x^2 + \\square x + 20$ になります。$\\square$ は？", answer: -12, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "両方が負・数が大きい。" }, { layer: 2, text: "$(-10) + (-2)$。" }, { layer: 3, text: "$-12$。" }], formulaPreview: "(-10) + (-2) = -12" },
    { id: "step10", position: 10, questionText: "$(a+8)(a-6)$ を展開すると、$a^2 + \\square a - 48$ になります。$\\square$ は？", answer: 2, unit: "", unknownLabel: "a の係数", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "変数記号が $a$。仕組みは同じ。" }, { layer: 2, text: "$8 + (-6)$。" }, { layer: 3, text: "2。" }], formulaPreview: "8 + (-6) = 2" },
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
  derivation: `**$(x + a)^2 = x^2 + 2ax + a^2$ の正体**

$(x + a)^2$ を展開したとき、なぜ真ん中に **$2ax$**（係数が $2a$）が出てくるのか？

これは $(x + a)(x + b)$ の乗法公式で、**$a = b$ と置いた特別な場合** です。

**展開を追ってみる**

$(x + a)^2 = (x + a)(x + a)$ を分配法則で広げます：

$$\\begin{aligned}
(x + a)(x + a) &= x \\cdot x + x \\cdot a + a \\cdot x + a \\cdot a \\\\
&= x^2 + ax + ax + a^2 \\\\
&= x^2 + 2ax + a^2
\\end{aligned}$$

途中で $ax$ が **2回** 出てきます——これが「$2ax$」の正体。$x \\cdot a$（前の塊の $x$ と後ろの塊の $a$）と、$a \\cdot x$（前の塊の $a$ と後ろの塊の $x$）の **2つの経路** から生まれるからです。

**図形的な意味：正方形の面積**

$(x + a)^2$ は、1辺が $(x + a)$ の正方形の面積です。この正方形を4つに分けると：

$$
\\begin{array}{|c|c|}
\\hline
\\text{大正方形 } x^2 & \\text{長方形 } ax \\\\
\\hline
\\text{長方形 } ax & \\text{小正方形 } a^2 \\\\
\\hline
\\end{array}
$$

- 左上：1辺 $x$ の正方形 → 面積 $x^2$
- 右上と左下：縦 $a$、横 $x$ の長方形 → それぞれ $ax$、合わせて $2ax$
- 右下：1辺 $a$ の正方形 → 面積 $a^2$

合計：$x^2 + 2ax + a^2$。**「$2ax$」は同じ長方形が2枚ある** ことの表れです。

**$2a$ の係数が、平方完成と結びつく**

「★ 2次関数の最小値」の系列で見たように、$f(x) = x^2 + bx + c$ を平方完成するとき、**$x$ の係数 $b$ を 2 で割って $b/2$** という値が出てきました。

これは逆向きに見ると、$(x + a)^2$ の真ん中が「$2a$」だから、$b = 2a$ より $a = b/2$ になる——という関係。**乗法公式の $2a$ と、平方完成の $b/2$ は表裏一体** なのです。

**差の場合**

$(x - a)^2$ なら、$(x + a)^2$ の $a$ を $-a$ に置き換えればよい：

$$(x - a)^2 = x^2 - 2ax + a^2$$

真ん中の符号がマイナスになるだけで、構造は同じです。`,
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
        { layer: 1, text: "x が y に変わっただけ。" },
        { layer: 2, text: "$2a$ を計算しよう。" },
        { layer: 3, text: "2 × 5 = 10。" },
      ],
      formulaPreview: "2 × 5 = 10",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$(x+6)^2$ を展開すると、$x^2 + \\square x + 36$ になります。$\\square$ は？", answer: 12, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$2a$。" }, { layer: 2, text: "$2 \\times 6$。" }, { layer: 3, text: "12。" }], formulaPreview: "2 × 6 = 12" },
    { id: "step7", position: 7, questionText: "$(x-5)^2$ を展開すると、$x^2 + \\square x + 25$ になります。$\\square$ は？", answer: -10, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$a = -5$。" }, { layer: 2, text: "$2 \\times (-5)$。" }, { layer: 3, text: "$-10$。" }], formulaPreview: "2 × (-5) = -10" },
    { id: "step8", position: 8, questionText: "$(x+8)^2$ を展開すると、$x^2 + \\square x + 64$ になります。$\\square$ は？", answer: 16, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$2 \\times 8$。" }, { layer: 2, text: "16。" }, { layer: 3, text: "16。" }], formulaPreview: "2 × 8 = 16" },
    { id: "step9", position: 9, questionText: "$(x-10)^2$ を展開すると、$x^2 + \\square x + 100$ になります。$\\square$ は？", answer: -20, unit: "", unknownLabel: "x の係数", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$a = -10$。" }, { layer: 2, text: "$2 \\times (-10)$。" }, { layer: 3, text: "$-20$。" }], formulaPreview: "2 × (-10) = -20" },
    { id: "step10", position: 10, questionText: "$(2x+3)^2$ を展開すると、$\\square x^2 + 12x + 9$ になります。$\\square$ は？", answer: 4, unit: "", unknownLabel: "x² の係数", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$(2x)^2 = 4x^2$。" }, { layer: 2, text: "$2 \\times 2 = 4$。" }, { layer: 3, text: "4。" }], formulaPreview: "2² = 4" },
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
  derivation: `**因数分解は「展開の逆」を歩く**

展開：$(x + a)(x + b) = x^2 + (a + b)x + ab$

これを **逆向きに歩く** のが因数分解です。

$$x^2 + Cx + D = (x + a)(x + b)$$

の形に書き直したい。このとき係数を見ると：

- $x$ の係数 $C = a + b$（**和**）
- 定数項 $D = ab$（**積**）

つまり、$C$ と $D$ から「和が $C$、積が $D$」となる2つの数 $a, b$ を **逆算** すればよい。

**どうやって2つの数を見つけるか**

定数項 $D$ の **約数のペア** を順に試します。

例：$x^2 + 7x + 12$ を因数分解。

定数項 $12$ の約数ペアは $(1, 12),\\ (2, 6),\\ (3, 4)$。これらの中から **和が 7** になるものを探す：

- $1 + 12 = 13$ ✗
- $2 + 6 = 8$ ✗
- $3 + 4 = 7$ ✓

だから $(a, b) = (3, 4)$ で：

$$x^2 + 7x + 12 = (x + 3)(x + 4)$$

**符号の扱い**

| $C$ と $D$ | 2つの数の符号 |
|---|---|
| $D > 0$ かつ $C > 0$ | 両方とも正 |
| $D > 0$ かつ $C < 0$ | 両方とも負 |
| $D < 0$ | 一方が正、もう一方が負（絶対値の大きい方が $C$ の符号） |

例：$x^2 - 5x + 6$。$D = 6 > 0$ かつ $C = -5 < 0$ なので **両方が負**。$-2$ と $-3$ で和 $-5$、積 $6$。だから $(x - 2)(x - 3)$。

例：$x^2 + x - 12$。$D = -12 < 0$ なので **符号が違う**。$4$ と $-3$ で和 $1$、積 $-12$。だから $(x + 4)(x - 3)$。

**展開と因数分解は「同じ事の表と裏」**

展開：

$$(x + a)(x + b) \\longrightarrow x^2 + (a+b)x + ab$$

因数分解：

$$x^2 + Cx + D \\longrightarrow (x + a)(x + b)$$

「左から右」も「右から左」も、結局は **同じ関係式の中** を歩いています。違いは「何が与えられていて、何を求めるか」だけ。

**応用：2次方程式が解ける**

因数分解できれば、$ABの形 = 0$ から **「$A = 0$ または $B = 0$」** を使って、2次方程式が解けます。

例：$x^2 + 7x + 12 = 0$ → $(x + 3)(x + 4) = 0$ → $x = -3$ または $x = -4$。

これが「因数分解で解く」という方法。**「和と積から2つの数を逆算する」** ことの威力です。

ここから「解と係数の関係」「2次方程式の解の公式」など、数Ⅰ・A の発展した話題につながっていきます。すべての出発点は、この単純な「展開の逆」にあります。`,
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
        { layer: 1, text: "x が y に変わっただけ。" },
        { layer: 2, text: "和 7、積 12。" },
        { layer: 3, text: "(3, 4)。小さい方は 3。" },
      ],
      formulaPreview: "和 7、積 12 → (3, 4)",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$x^2 + 10x + 21 = (x+a)(x+b)$。小さい方は？", answer: 3, unit: "", unknownLabel: "a と b のうち小さい方", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "和 10、積 21。" }, { layer: 2, text: "3 + 7 = 10、3 × 7 = 21。" }, { layer: 3, text: "3。" }], formulaPreview: "(3, 7)" },
    { id: "step7", position: 7, questionText: "$x^2 - 7x + 12 = (x+a)(x+b)$。小さい方は？", answer: -4, unit: "", unknownLabel: "a と b のうち小さい方", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "和 -7、積 12。両方負。" }, { layer: 2, text: "(-3) + (-4) = -7。" }, { layer: 3, text: "$-4$。" }], formulaPreview: "(-4, -3)" },
    { id: "step8", position: 8, questionText: "$x^2 + x - 12 = (x+a)(x+b)$。小さい方は？", answer: -3, unit: "", unknownLabel: "a と b のうち小さい方", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "和 1、積 -12。符号違う。" }, { layer: 2, text: "$(-3) + 4 = 1$、$(-3) \\times 4 = -12$。" }, { layer: 3, text: "$-3$。" }], formulaPreview: "(-3, 4)" },
    { id: "step9", position: 9, questionText: "$x^2 - 2x - 15 = (x+a)(x+b)$。小さい方は？", answer: -5, unit: "", unknownLabel: "a と b のうち小さい方", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "和 -2、積 -15。" }, { layer: 2, text: "$(-5) + 3 = -2$。" }, { layer: 3, text: "$-5$。" }], formulaPreview: "(-5, 3)" },
    { id: "step10", position: 10, questionText: "$y^2 - 9y + 20 = (y+a)(y+b)$。小さい方は？", answer: -5, unit: "", unknownLabel: "a と b のうち小さい方", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "変数記号が $y$。和 -9、積 20。" }, { layer: 2, text: "$(-4) + (-5) = -9$。" }, { layer: 3, text: "$-5$。" }], formulaPreview: "(-5, -4)" },
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
  derivation: `**「ルートの世界の整理整頓」**

$\\sqrt{12}, \\sqrt{18}, \\sqrt{50}, \\sqrt{75}$ ——これらの数は、もっと **きれいな形** に書き直せます。

$$\\sqrt{12} = 2\\sqrt{3},\\quad \\sqrt{18} = 3\\sqrt{2},\\quad \\sqrt{50} = 5\\sqrt{2},\\quad \\sqrt{75} = 5\\sqrt{3}$$

これを **平方根の簡単化** といいます。なぜこんな変形ができるのか、ルートの性質から導けます。

**鍵となる性質：「掛け算はそのまま」**

$$\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$$

たとえば：

$$\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$$

「**ルートの中の数を、平方数 × 残りに分解する**」——これが簡単化の基本戦略です。

**やり方の手順**

1. ルートの中の数を **素因数分解** する
2. 同じ数の **ペア** を作る
3. ペアの片方を **ルートの外に出す**

例：$\\sqrt{72}$ を簡単化する。

$$72 = 2^3 \\times 3^2 = (2 \\times 3)^2 \\times 2 = 36 \\times 2$$

$$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$$

「2のペア」と「3のペア」をそれぞれ外に出すと $2 \\times 3 = 6$ になります。残った $2$ はルートの中に残ります。

**もっとも簡単な形とは**

ルートの中に **平方の因子が残らない** 形を「もっとも簡単な形」といいます。

| 元の形 | 簡単化 | ルートの中 |
|---|---|---|
| $\\sqrt{8}$ | $2\\sqrt{2}$ | 2（平方なし） |
| $\\sqrt{18}$ | $3\\sqrt{2}$ | 2 |
| $\\sqrt{50}$ | $5\\sqrt{2}$ | 2 |
| $\\sqrt{75}$ | $5\\sqrt{3}$ | 3 |
| $\\sqrt{98}$ | $7\\sqrt{2}$ | 2 |

「ルートの中をできるだけ小さい数にする」が目標です。

**なぜ簡単化が必要なのか**

- **計算しやすい**：たとえば $\\sqrt{2} + \\sqrt{8}$ は、$\\sqrt{8} = 2\\sqrt{2}$ に直してから $\\sqrt{2} + 2\\sqrt{2} = 3\\sqrt{2}$。
- **比較しやすい**：$\\sqrt{50}$ と $\\sqrt{32}$ のどちらが大きいか直感では難しいけど、$5\\sqrt{2}$ と $4\\sqrt{2}$ なら一目。
- **記号としてきれい**：$\\sqrt{200}$ より $10\\sqrt{2}$ の方がコンパクトで、構造が見えやすい。

「**ルートの中の数を、平方の部分 × 残りに分ける**」——これがすべての簡単化の根本です。`,
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
        { layer: 1, text: "75 = 25 × 3。" },
        { layer: 2, text: "$\\sqrt{25} = 5$。" },
        { layer: 3, text: "a = 5。" },
      ],
      formulaPreview: "√75 = 5√3",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$\\sqrt{98}$ を簡単にすると $a\\sqrt{2}$。$a$ は？", answer: 7, unit: "", unknownLabel: "根号の外", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "98 = 49 × 2。" }, { layer: 2, text: "$\\sqrt{49} = 7$。" }, { layer: 3, text: "7。" }], formulaPreview: "√98 = 7√2" },
    { id: "step7", position: 7, questionText: "$\\sqrt{48}$ を簡単にすると $a\\sqrt{3}$。$a$ は？", answer: 4, unit: "", unknownLabel: "根号の外", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "48 = 16 × 3。" }, { layer: 2, text: "$\\sqrt{16} = 4$。" }, { layer: 3, text: "4。" }], formulaPreview: "√48 = 4√3" },
    { id: "step8", position: 8, questionText: "$\\sqrt{200}$ を簡単にすると $a\\sqrt{2}$。$a$ は？", answer: 10, unit: "", unknownLabel: "根号の外", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "200 = 100 × 2。" }, { layer: 2, text: "$\\sqrt{100} = 10$。" }, { layer: 3, text: "10。" }], formulaPreview: "√200 = 10√2" },
    { id: "step9", position: 9, questionText: "$\\sqrt{180}$ を簡単にすると $a\\sqrt{5}$。$a$ は？", answer: 6, unit: "", unknownLabel: "根号の外", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "180 = 36 × 5。" }, { layer: 2, text: "$\\sqrt{36} = 6$。" }, { layer: 3, text: "6。" }], formulaPreview: "√180 = 6√5" },
    { id: "step10", position: 10, questionText: "$2\\sqrt{27}$ を簡単にすると $a\\sqrt{3}$。$a$ は？", answer: 6, unit: "", unknownLabel: "根号の外", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$\\sqrt{27} = 3\\sqrt{3}$。" }, { layer: 2, text: "$2 \\times 3 = 6$。" }, { layer: 3, text: "6。" }], formulaPreview: "2·3√3 = 6√3" },
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
  derivation: `**不等式の解法は、方程式とほぼ同じ**

1次不等式 $ax + b > 0$（$a > 0$）を解くと：

$$x > -\\frac{b}{a}$$

操作は2つだけ：

1. 定数 $b$ を右辺に **移項**（符号反転）
2. 両辺を $a$ で **割る**

例：$2x - 6 > 0$。両辺に $6$ を足して $2x > 6$。両辺を $2$ で割って $x > 3$。

**等式と不等式の違いは「向き」**

等式 $A = B$ では、両辺に同じ数を加減乗除しても等号は変わりません。

不等式 $A > B$ も基本的に同じ——でも、**1 つだけ注意** があります：

**「両辺に負の数を掛ける／割ると、不等号の向きが反転する」**

たとえば $-x > 3$ の両辺に $-1$ を掛けると、

$$x < -3$$

不等号が **逆向き** に変わります。

**なぜ反転するのか**

数直線で考えてみます。$2 < 5$ という不等式があるとします。両辺に $-1$ を掛けると：

$$-2,\\ -5$$

数直線上では、$-2$ は $-5$ より **右** にある——つまり大きい。だから：

$$-2 > -5$$

不等号の向きが **反対** になりました。「正の数を掛ける」と大小関係はそのままだけど、「負の数を掛ける」と大小関係が **逆転** する。これが不等式の特殊な性質です。

**結論：負の数を掛ける／割るとき、必ず符号反転**

| 操作 | 不等号 |
|---|---|
| 両辺に正の数を足す／引く | 変わらない |
| 両辺に正の数を掛ける／割る | 変わらない |
| 両辺に **負の数を掛ける／割る** | **反転** |

**$a < 0$ の場合**

$ax + b > 0$ で $a < 0$ なら、両辺を $a$ で割るときに **不等号反転**：

$$x < -\\frac{b}{a}$$

つまり、$a$ の符号で解の向きが決まります。

**応用：連立不等式・絶対値**

1次不等式の基本ができれば、

- **連立不等式**：複数の不等式を同時に満たす範囲
- **絶対値の不等式**：$|x - 3| < 2$ を解く（→ $1 < x < 5$）
- **2 次不等式**：放物線が x 軸の上か下か

など、より複雑な不等式の解法へとつながっていきます。すべての出発点が、この「**移項して、係数で割る**」というシンプルな操作です。`,
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
        { layer: 1, text: "x が y に変わっただけ。" },
        { layer: 2, text: "$4y > 8$。" },
        { layer: 3, text: "$y > 2$。c = 2。" },
      ],
      formulaPreview: "y > 8 / 4 = 2",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$5x - 10 > 0$ の解 $x > c$ の $c$ は？", answer: 2, unit: "", unknownLabel: "境界値 c", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$5x > 10$。" }, { layer: 2, text: "両辺 5 で割る。" }, { layer: 3, text: "2。" }], formulaPreview: "c = 10/5 = 2" },
    { id: "step7", position: 7, questionText: "$3x + 12 > 0$ の解 $x > c$ の $c$ は？", answer: -4, unit: "", unknownLabel: "境界値 c", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$3x > -12$。" }, { layer: 2, text: "両辺 3 で割る。" }, { layer: 3, text: "$-4$。" }], formulaPreview: "c = -12/3 = -4" },
    { id: "step8", position: 8, questionText: "$2x + 8 > x + 5$ の解 $x > c$ の $c$ は？", answer: -3, unit: "", unknownLabel: "境界値 c", variationFromPrevious: "plus_alpha", compareWithStepId: "step7", hints: [{ layer: 1, text: "両辺を整理。$2x - x > 5 - 8$。" }, { layer: 2, text: "$x > -3$。" }, { layer: 3, text: "$-3$。" }], formulaPreview: "x > -3" },
    { id: "step9", position: 9, questionText: "$5x - 1 > 2x + 14$ の解 $x > c$ の $c$ は？", answer: 5, unit: "", unknownLabel: "境界値 c", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$3x > 15$。" }, { layer: 2, text: "両辺 3 で割る。" }, { layer: 3, text: "5。" }], formulaPreview: "c = 15/3 = 5" },
    { id: "step10", position: 10, questionText: "$3(y + 2) > 18$ の解 $y > c$ の $c$ は？", answer: 4, unit: "", unknownLabel: "境界値 c", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$3y + 6 > 18$。" }, { layer: 2, text: "$3y > 12$。" }, { layer: 3, text: "4。" }], formulaPreview: "c = 4" },
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
  derivation: `**解と係数の関係：因数分解を逆から見る**

2次方程式 $x^2 + bx + c = 0$ の2つの解を $\\alpha, \\beta$ とすると：

$$\\alpha + \\beta = -b,\\quad \\alpha\\beta = c$$

「**解の和は $-b$、解の積は $c$**」——これが「解と係数の関係」と呼ばれる公式です。なぜこんな関係があるのか？それは因数分解を **逆から** 眺めると見えてきます。

**もし解が $\\alpha, \\beta$ なら**

2つの解が $\\alpha$ と $\\beta$ である2次方程式は、必ず次の形に書けます：

$$(x - \\alpha)(x - \\beta) = 0$$

$x = \\alpha$ または $x = \\beta$ のときだけ左辺が $0$ になる——だからこれが解。

**これを展開してみる**

$(x - \\alpha)(x - \\beta)$ を展開すると：

$$\\begin{aligned}
(x - \\alpha)(x - \\beta) &= x^2 - \\beta x - \\alpha x + \\alpha\\beta \\\\
&= x^2 - (\\alpha + \\beta)x + \\alpha\\beta
\\end{aligned}$$

つまり：

$$x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$$

**もとの式と見比べる**

これと $x^2 + bx + c = 0$ を係数ごとに見比べると：

- $x$ の係数：$-(\\alpha + \\beta) = b \\quad\\Longrightarrow\\quad \\alpha + \\beta = -b$
- 定数項：$\\alpha\\beta = c$

**「$x$ の係数」の符号が反転する** のは、$(x - \\alpha)$ の $-\\alpha$ が後で $\\alpha$ の符号を変えるからです。

**たとえば**

$x^2 - 5x + 6 = 0$ なら、$b = -5$。解の和は $-(-5) = 5$。実際に因数分解すると $(x - 2)(x - 3) = 0$ で解は $2, 3$。$2 + 3 = 5$ ✓。

「解を求めずに、和と積がわかる」——この威力を生かすと、

- **連立方程式の活用**：$\\alpha + \\beta = 5$ と $\\alpha\\beta = 6$ から、解が $2, 3$ だと逆算できる
- **対称式の計算**：$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 25 - 12 = 13$ のように、解を求めずに値が出せる

など、応用が広がります。

**$ax^2 + bx + c = 0$（$a \\neq 1$）の場合**

最高次の係数が $1$ でない一般形では：

$$\\alpha + \\beta = -\\frac{b}{a},\\quad \\alpha\\beta = \\frac{c}{a}$$

両辺を $a$ で割ってから上の話を当てはめるだけです。

**まとめ**

| | 値 |
|---|---|
| 解の和 $\\alpha + \\beta$ | $-b$（または $-b/a$） |
| 解の積 $\\alpha\\beta$ | $c$（または $c/a$） |

この関係は、**因数分解の式を展開しただけ** の自然な結論。「解と係数の関係」という名前が大げさに聞こえるかもしれませんが、正体は単純な式変形です。`,
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
        { layer: 1, text: "$y$ に変わっただけ。和は $-b$。" },
        { layer: 2, text: "$b = 9$。" },
        { layer: 3, text: "$-9$。" },
      ],
      formulaPreview: "-(9) = -9",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$x^2 - 10x + 21 = 0$ の解の和は？", answer: 10, unit: "", unknownLabel: "解の和", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "和 = $-b$。" }, { layer: 2, text: "$-(-10)$。" }, { layer: 3, text: "10。" }], formulaPreview: "-(-10) = 10" },
    { id: "step7", position: 7, questionText: "$x^2 + 11x - 12 = 0$ の解の和は？", answer: -11, unit: "", unknownLabel: "解の和", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$b = 11$。" }, { layer: 2, text: "$-11$。" }, { layer: 3, text: "$-11$。" }], formulaPreview: "-(11) = -11" },
    { id: "step8", position: 8, questionText: "$2x^2 + 10x + 8 = 0$ の解の和は？（係数 a で割って正規化）", answer: -5, unit: "", unknownLabel: "解の和", variationFromPrevious: "plus_alpha", compareWithStepId: "step7", hints: [{ layer: 1, text: "両辺を 2 で割る。$x^2 + 5x + 4 = 0$。" }, { layer: 2, text: "和 = $-5$。" }, { layer: 3, text: "$-5$。" }], formulaPreview: "-5/2 × 2 = -5" },
    { id: "step9", position: 9, questionText: "$3x^2 - 12x + 9 = 0$ の解の和は？", answer: 4, unit: "", unknownLabel: "解の和", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "両辺を 3 で割る。$x^2 - 4x + 3 = 0$。" }, { layer: 2, text: "和 = $-(-4) = 4$。" }, { layer: 3, text: "4。" }], formulaPreview: "4" },
    { id: "step10", position: 10, questionText: "$y^2 + 6y - 16 = 0$ の解の和は？", answer: -6, unit: "", unknownLabel: "解の和", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$y$ で書いてあるだけ。" }, { layer: 2, text: "$b = 6$。" }, { layer: 3, text: "$-6$。" }], formulaPreview: "-(6) = -6" },
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
        { layer: 1, text: "「4 の倍数」は「2 の倍数」より強い。" },
        { layer: 2, text: "$A \\Rightarrow B$ 真、逆は偽。" },
        { layer: 3, text: "1（十分のみ）。" },
      ],
      formulaPreview: "十分のみ",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$x$ が整数 は $x$ が有理数 の何条件？（1〜4）", answer: 1, unit: "", unknownLabel: "条件の種別", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "整数 ⊂ 有理数。" }, { layer: 2, text: "$A \\Rightarrow B$ 真、逆は偽（$\\frac{1}{2}$ は有理数だが整数でない）。" }, { layer: 3, text: "1。" }], formulaPreview: "十分のみ" },
    { id: "step7", position: 7, questionText: "$x^2 = 9$ は $x = \\pm 3$ の何条件？（1〜4）", answer: 3, unit: "", unknownLabel: "条件の種別", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "両方が同じことを言っている。" }, { layer: 2, text: "$A \\Leftrightarrow B$。" }, { layer: 3, text: "3（必要十分）。" }], formulaPreview: "必要十分" },
    { id: "step8", position: 8, questionText: "$x > 0$ は $x \\geq 0$ の何条件？（1〜4）", answer: 1, unit: "", unknownLabel: "条件の種別", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "「0 より大」は「0 以上」より強い。" }, { layer: 2, text: "$A \\Rightarrow B$ 真、逆は偽（$x = 0$ で反例）。" }, { layer: 3, text: "1。" }], formulaPreview: "十分のみ" },
    { id: "step9", position: 9, questionText: "「$x$ が素数」は「$x$ が奇数」の何条件？（1〜4）", answer: 4, unit: "", unknownLabel: "条件の種別", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$x = 2$ は素数だが奇数でない（A→B 偽）。" }, { layer: 2, text: "$x = 9$ は奇数だが素数でない（B→A 偽）。" }, { layer: 3, text: "4（どちらでもない）。" }], formulaPreview: "どちらでもない" },
    { id: "step10", position: 10, questionText: "$|x| = 5$ は $x^2 = 25$ の何条件？（1〜4）", answer: 3, unit: "", unknownLabel: "条件の種別", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$|x| = 5 \\Leftrightarrow x = \\pm 5 \\Leftrightarrow x^2 = 25$。" }, { layer: 2, text: "両方同じ。" }, { layer: 3, text: "3。" }], formulaPreview: "必要十分" },
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
  derivation: `**頂点の x 座標が「$-b/2$」になる理由**

2次関数 $f(x) = x^2 + bx + c$ の **頂点の x 座標** は：

$$x = -\\frac{b}{2}$$

この公式の正体は、**平方完成** で明らかになります。

**平方完成して頂点を読む**

$$f(x) = x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$$

$(x + b/2)^2$ の部分は、$x = -b/2$ のときちょうど **0** になります。

そのとき $f(x)$ は最も小さくなる——だから **頂点の x 座標 $= -b/2$**。

**頂点は「対称軸が x 軸と交わる場所」**

放物線は **左右対称** な曲線です。その対称軸の方程式が $x = -b/2$。

なぜここが対称軸になるのか？平方完成した式 $(x + b/2)^2 + (\\text{定数})$ を見ると、$(x + b/2)$ の部分が **2乗** されています。2乗は「**$+a$ も $-a$ も同じ結果**」になる性質があるので、$x = -b/2$ を中心に左右対称な値を取ります。

**頂点と「解と係数の関係」のつながり**

2 次方程式 $x^2 + bx + c = 0$ の **2 つの解** を $\\alpha, \\beta$ とすると、解と係数の関係から：

$$\\alpha + \\beta = -b$$

両辺を 2 で割ると：

$$\\frac{\\alpha + \\beta}{2} = -\\frac{b}{2}$$

これは **「2 つの解の中点」** です。つまり頂点の x 座標は、**2 つの解の平均（ちょうど真ん中）**。

放物線の対称性を考えると、左右の解は対称軸からの距離が等しい。だから、対称軸（頂点の x 座標）は **必ず 2 つの解の中点** にある——これは幾何学的にも自然な結論です。

**「頂点」「対称軸」「解の中点」は同じ場所**

| 概念 | x 座標の値 |
|---|---|
| 頂点 | $-b/2$ |
| 対称軸 | $x = -b/2$ |
| 2 つの解の中点 | $(\\alpha + \\beta)/2 = -b/2$ |

3 つの異なる言葉が、すべて **同じ点** を指しています。これが2次関数の世界の中心。`,
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
        { layer: 1, text: "頂点 = $-b/2$。" },
        { layer: 2, text: "$-2/2$。" },
        { layer: 3, text: "$-1$。" },
      ],
      formulaPreview: "-(2) / 2 = -1",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$f(x) = x^2 - 10x + 7$ の頂点の x 座標は？", answer: 5, unit: "", unknownLabel: "頂点の x 座標", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$-b/2$。" }, { layer: 2, text: "$10/2$。" }, { layer: 3, text: "5。" }], formulaPreview: "10/2 = 5" },
    { id: "step7", position: 7, questionText: "$f(x) = x^2 + 12x + 5$ の頂点の x 座標は？", answer: -6, unit: "", unknownLabel: "頂点の x 座標", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$-12/2$。" }, { layer: 2, text: "$-6$。" }, { layer: 3, text: "$-6$。" }], formulaPreview: "-12/2 = -6" },
    { id: "step8", position: 8, questionText: "$f(x) = 2x^2 + 8x + 3$ の頂点の x 座標は？（係数 a あり）", answer: -2, unit: "", unknownLabel: "頂点の x 座標", variationFromPrevious: "plus_alpha", compareWithStepId: "step7", hints: [{ layer: 1, text: "$a \\neq 1$ なら頂点 = $-b/(2a)$。" }, { layer: 2, text: "$-8/(2 \\cdot 2) = -8/4$。" }, { layer: 3, text: "$-2$。" }], formulaPreview: "-8/4 = -2" },
    { id: "step9", position: 9, questionText: "$f(x) = 3x^2 - 18x + 4$ の頂点の x 座標は？", answer: 3, unit: "", unknownLabel: "頂点の x 座標", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$-b/(2a) = -(-18)/(2 \\cdot 3)$。" }, { layer: 2, text: "$18/6$。" }, { layer: 3, text: "3。" }], formulaPreview: "18/6 = 3" },
    { id: "step10", position: 10, questionText: "$h(t) = t^2 - 14t + 50$ の頂点の t 座標は？", answer: 7, unit: "", unknownLabel: "頂点の t 座標", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "変数 $t$、関数名 $h$。仕組み同じ。" }, { layer: 2, text: "$-(-14)/2$。" }, { layer: 3, text: "7。" }], formulaPreview: "14/2 = 7" },
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

/** Q3: x²+bx+c=0 の解の積（解と係数の関係） */
export const ALGEBRA_QUAD_PRODUCT_SERIES: LearnerSeries = {
  id: "algebra_quad_prod_01",
  title: "解と係数の関係（積）",
  subtitle:
    "$x^2 + bx + c = 0$ の2つの解の積を求める5問。「積は c」の発見。",
  patternId: "Q3",
  unit: "algebra_1",
  revelationLabel: "x² + bx + c = 0 の解の積は、c（解と係数の関係）",
  derivation: `**解の積は、なぜ「$c$」そのもの？**

2次方程式 $x^2 + bx + c = 0$ の解を $\\alpha, \\beta$ とすると、**解の積 $\\alpha\\beta = c$**。

これは「解と係数の関係（和）」と同じ式変形から出てきます。

**因数分解から見る**

解が $\\alpha, \\beta$ なら、その方程式は

$$(x - \\alpha)(x - \\beta) = 0$$

と書ける。展開すると：

$$x^2 - (\\alpha + \\beta) x + \\alpha\\beta = 0$$

これと $x^2 + bx + c = 0$ を見比べると：

- $x$ の係数：$-(\\alpha + \\beta) = b \\quad\\Longrightarrow\\quad \\alpha + \\beta = -b$
- 定数項：$\\alpha\\beta = c$

**和には符号がついたのに、積はそのまま**

ここに注目してください。

- 和 $\\alpha + \\beta$ は **$-b$**（マイナスがつく）
- 積 $\\alpha\\beta$ は **$c$**（そのまま）

なぜ差が出るのか？

$(x - \\alpha)(x - \\beta)$ の展開で、$x$ の項が **マイナスから生まれる**（$-\\beta x - \\alpha x$）のに対し、定数項は **マイナス × マイナス** で **プラス**（$(-\\alpha)(-\\beta) = +\\alpha\\beta$）になるからです。

**両方を一度に確かめる**

例：$x^2 - 5x + 6 = 0$。

因数分解すると $(x - 2)(x - 3) = 0$ で、解は $2, 3$。

- 和：$2 + 3 = 5$。$-b = -(-5) = 5$ ✓
- 積：$2 \\times 3 = 6$。$c = 6$ ✓

**応用：知らない値を計算する**

解 $\\alpha, \\beta$ そのものを知らなくても、和と積さえわかれば、いろんな「対称な式」が計算できます。

| 式 | 値 |
|---|---|
| $\\alpha + \\beta$ | $-b$ |
| $\\alpha\\beta$ | $c$ |
| $\\alpha^2 + \\beta^2$ | $(\\alpha + \\beta)^2 - 2\\alpha\\beta = b^2 - 2c$ |
| $\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta}$ | $\\dfrac{\\alpha + \\beta}{\\alpha\\beta} = -\\dfrac{b}{c}$ |
| $\\alpha^3 + \\beta^3$ | $(\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta) = -b^3 + 3bc$ |

「解そのものは何かわからなくても、係数だけから対称な計算ができる」——これが解と係数の関係の真価です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$x^2 + 5x + 6 = 0$ の2つの解の積はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "解の積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "因数分解 $(x+2)(x+3) = 0$ より解は $-2, -3$。" },
        { layer: 2, text: "積は $(-2) \\times (-3) = 6$。" },
        { layer: 3, text: "解と係数の関係：積は $c = 6$。" },
      ],
      formulaPreview: "c = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "$x^2 + 7x + 12 = 0$ の2つの解の積はいくつでしょう？",
      answer: 12, unit: "", unknownLabel: "解の積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。積は $c$。" },
        { layer: 2, text: "$c = 12$。" },
        { layer: 3, text: "12。" },
      ],
      formulaPreview: "c = 12",
    },
    {
      id: "step3", position: 3,
      questionText: "$x^2 - 5x + 6 = 0$ の2つの解の積はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "解の積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$c = 6$。" },
        { layer: 2, text: "解は 2, 3。積は 6。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "c = 6",
    },
    {
      id: "step4", position: 4,
      questionText: "$x^2 + 3x - 10 = 0$ の2つの解の積はいくつでしょう？",
      answer: -10, unit: "", unknownLabel: "解の積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$c$ が負。積も負。" },
        { layer: 2, text: "$c = -10$。" },
        { layer: 3, text: "$-10$。" },
      ],
      formulaPreview: "c = -10",
    },
    {
      id: "step5", position: 5,
      questionText: "$y^2 + 9y + 20 = 0$ の2つの解の積はいくつでしょう？",
      answer: 20, unit: "", unknownLabel: "解の積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$x$ が $y$ に変わっただけ。積は $c$。" },
        { layer: 2, text: "$c = 20$。" },
        { layer: 3, text: "20。" },
      ],
      formulaPreview: "c = 20",
    },
  ],
};

/** Q4: 判別式 D = b² - 4c (a=1) */
export const ALGEBRA_DISCRIMINANT_SERIES: LearnerSeries = {
  id: "algebra_disc_01",
  title: "判別式",
  subtitle:
    "$x^2 + bx + c = 0$ の判別式 $D = b^2 - 4c$ を求める5問。実数解の数を見分ける鍵。",
  patternId: "Q4",
  unit: "algebra_1",
  revelationLabel: "D = b² - 4c（a=1のとき）。D の符号で実数解の個数が決まる",
  derivation: `**判別式は「解の公式の中身」**

2次方程式 $ax^2 + bx + c = 0$ の解の公式は：

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

このうち、$\\sqrt{\\,\\,}$（ルート）の中の **$b^2 - 4ac$** が **判別式**、$D$ と書きます。

**ルートの中身が、解の個数を分ける**

判別式 $D$ の **符号** で、2次方程式が実数解をいくつ持つかが決まります：

| $D$ の符号 | 解の状況 |
|---|---|
| $D > 0$ | 実数解が **2 つ**（互いに違う2つの解） |
| $D = 0$ | 実数解が **1 つ**（重なった解、いわゆる「重解」） |
| $D < 0$ | 実数解は **0 個**（実数の範囲に解がない） |

なぜそうなるのか？解の公式の $\\pm\\sqrt{D}$ を見ます。

- $D > 0$：$\\sqrt{D}$ は実数。$\\pm$ で **2つの違う値** が出る → 解2つ。
- $D = 0$：$\\sqrt{D} = 0$。$\\pm 0$ なので **同じ値が1つ** → 重解。
- $D < 0$：負の数のルートは実数の世界には存在しない → 実数解なし。

**「解かなくても、解の数がわかる」**

これが判別式の威力です。解の公式で実際に計算しなくても、$D$ の符号だけで「実数解は何個か」が一瞬で判定できます。

**a = 1 のときの簡易版**

この系列で扱った $x^2 + bx + c = 0$（$a = 1$）では、$D = b^2 - 4c$ になります。

たとえば $x^2 + 4x + 3 = 0$ なら $D = 16 - 12 = 4 > 0$ で実数解2つ。
$x^2 - 4x + 4 = 0$ なら $D = 16 - 16 = 0$ で重解。
$x^2 + 2x + 3 = 0$ なら $D = 4 - 12 = -8 < 0$ で実数解なし。

**判別式は、解の公式の「平方完成」で生まれる**

$ax^2 + bx + c = 0$ の両辺を $a$ で割ってから、$x$ の項を平方完成すると：

$$\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}$$

右辺の分子に出てくる「$b^2 - 4ac$」——これが判別式の正体です。

**判別式 = グラフが x 軸と交わる回数**

幾何学的にも意味があります。2次関数 $y = ax^2 + bx + c$ のグラフ（放物線）が **x 軸と交わる点** が、方程式 $ax^2 + bx + c = 0$ の実数解。

- $D > 0$：グラフが x 軸を **2 回横切る** → 交点 2 つ
- $D = 0$：グラフが x 軸に **接する**（触れるだけ）→ 接点 1 つ
- $D < 0$：グラフが x 軸と **離れて、交わらない** → 交点 0 個

「ルートの中の符号」「解の個数」「グラフと x 軸の交わり方」——3つの世界がすべてつながっています。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$x^2 + 4x + 3 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "判別式 D",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$D = b^2 - 4c$。" },
        { layer: 2, text: "$4^2 - 4 \\times 3 = 16 - 12$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "16 - 12 = 4",
    },
    {
      id: "step2", position: 2,
      questionText: "$x^2 + 6x + 5 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: 16, unit: "", unknownLabel: "判別式 D",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$36 - 20$。" },
        { layer: 3, text: "16。" },
      ],
      formulaPreview: "36 - 20 = 16",
    },
    {
      id: "step3", position: 3,
      questionText: "$x^2 - 4x + 4 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: 0, unit: "", unknownLabel: "判別式 D",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$b = -4$ なので $b^2 = 16$。" },
        { layer: 2, text: "$16 - 16$。" },
        { layer: 3, text: "0（重解）。" },
      ],
      formulaPreview: "16 - 16 = 0",
    },
    {
      id: "step4", position: 4,
      questionText: "$x^2 + 2x + 3 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: -8, unit: "", unknownLabel: "判別式 D",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$4 - 12$。負になることもある。" },
        { layer: 2, text: "$-8$（実数解なし）。" },
        { layer: 3, text: "$-8$。" },
      ],
      formulaPreview: "4 - 12 = -8",
    },
    {
      id: "step5", position: 5,
      questionText: "$y^2 + 5y + 4 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: 9, unit: "", unknownLabel: "判別式 D",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$D = b^2 - 4c$。" },
        { layer: 2, text: "$25 - 16$。" },
        { layer: 3, text: "9。" },
      ],
      formulaPreview: "25 - 16 = 9",
    },
    // 6-10：難化
    { id: "step6", position: 6, questionText: "$x^2 + 7x + 10 = 0$ の判別式 $D$ は？", answer: 9, unit: "", unknownLabel: "判別式 D", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$49 - 40$。" }, { layer: 2, text: "9。" }, { layer: 3, text: "9。" }], formulaPreview: "49 - 40 = 9" },
    { id: "step7", position: 7, questionText: "$x^2 - 6x + 5 = 0$ の判別式 $D$ は？", answer: 16, unit: "", unknownLabel: "判別式 D", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$36 - 20$。" }, { layer: 2, text: "16。" }, { layer: 3, text: "16。" }], formulaPreview: "36 - 20 = 16" },
    { id: "step8", position: 8, questionText: "$x^2 + 5x + 7 = 0$ の判別式 $D$ は？", answer: -3, unit: "", unknownLabel: "判別式 D", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$25 - 28$。" }, { layer: 2, text: "$-3$。実数解なし。" }, { layer: 3, text: "$-3$。" }], formulaPreview: "25 - 28 = -3" },
    { id: "step9", position: 9, questionText: "$2x^2 + 4x - 6 = 0$ の判別式 $D = b^2 - 4ac$ は？", answer: 64, unit: "", unknownLabel: "判別式 D", variationFromPrevious: "plus_alpha", compareWithStepId: "step8", hints: [{ layer: 1, text: "$a = 2, b = 4, c = -6$。" }, { layer: 2, text: "$16 - 4 \\cdot 2 \\cdot (-6) = 16 + 48$。" }, { layer: 3, text: "64。" }], formulaPreview: "16 + 48 = 64" },
    { id: "step10", position: 10, questionText: "$y^2 - 8y + 16 = 0$ の判別式 $D$ は？（重解になるはず）", answer: 0, unit: "", unknownLabel: "判別式 D", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$64 - 64$。" }, { layer: 2, text: "0。重解の条件。" }, { layer: 3, text: "0。" }], formulaPreview: "64 - 64 = 0" },
  ],
};

/** MM1: 順列 P(n, 2) = n(n-1) */
export const ALGEBRA_PERMUTATION_SERIES: LearnerSeries = {
  id: "algebra_perm_01",
  title: "順列 P(n, 2)",
  subtitle:
    "n 人から 2 人を「順番に並べる」場合の数を求める5問。組合せとの違いを体感。",
  patternId: "MM1",
  unit: "algebra_1",
  revelationLabel: "P(n, 2) = n × (n − 1)（並べる：順序あり）",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "3 人から 2 人を選んで順番に並べる方法は何通りでしょう？",
      answer: 6, unit: "通り", unknownLabel: "順列の数",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "1 番目に 3 通り、2 番目に 2 通り。" },
        { layer: 2, text: "$3 \\times 2$。" },
        { layer: 3, text: "6 通り。" },
      ],
      formulaPreview: "3 × 2 = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "4 人から 2 人を選んで順番に並べる方法は何通りでしょう？",
      answer: 12, unit: "通り", unknownLabel: "順列の数",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ仕組み。$n(n-1)$。" },
        { layer: 2, text: "$4 \\times 3$。" },
        { layer: 3, text: "12 通り。" },
      ],
      formulaPreview: "4 × 3 = 12",
    },
    {
      id: "step3", position: 3,
      questionText: "5 人から 2 人を選んで順番に並べる方法は何通りでしょう？",
      answer: 20, unit: "通り", unknownLabel: "順列の数",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$5 \\times 4$。" },
        { layer: 2, text: "20。" },
        { layer: 3, text: "20 通り。" },
      ],
      formulaPreview: "5 × 4 = 20",
    },
    {
      id: "step4", position: 4,
      questionText: "6 人から 2 人を選んで順番に並べる方法は何通りでしょう？",
      answer: 30, unit: "通り", unknownLabel: "順列の数",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$6 \\times 5$。" },
        { layer: 2, text: "30。" },
        { layer: 3, text: "30 通り。" },
      ],
      formulaPreview: "6 × 5 = 30",
    },
    {
      id: "step5", position: 5,
      questionText: "クラス 8 人から「リレー第1走者と第2走者」を決める方法は何通りでしょう？",
      answer: 56, unit: "通り", unknownLabel: "順列の数",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "走者の順番が決まっているので順列。$n(n-1)$。" },
        { layer: 2, text: "$8 \\times 7$。" },
        { layer: 3, text: "56 通り。" },
      ],
      formulaPreview: "8 × 7 = 56",
    },
  ],
};

/** IT1: 約数の個数 */
export const ALGEBRA_DIVISOR_COUNT_SERIES: LearnerSeries = {
  id: "algebra_divisor_01",
  title: "約数の個数",
  subtitle:
    "ある整数の約数の個数を求める5問。素因数分解の指数+1の積で出る。",
  patternId: "IT1",
  unit: "algebra_1",
  revelationLabel: "n = p^a × q^b なら、約数の個数は (a+1)(b+1)",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "12 の約数は何個あるでしょう？",
      answer: 6, unit: "個", unknownLabel: "約数の個数",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "$12 = 2^2 \\times 3$。指数+1 の積で求まる。" },
        { layer: 2, text: "$(2+1)(1+1) = 3 \\times 2$。" },
        { layer: 3, text: "6 個（1, 2, 3, 4, 6, 12）。" },
      ],
      formulaPreview: "(2+1)(1+1) = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "18 の約数は何個あるでしょう？",
      answer: 6, unit: "個", unknownLabel: "約数の個数",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$18 = 2 \\times 3^2$。" },
        { layer: 2, text: "$(1+1)(2+1) = 2 \\times 3$。" },
        { layer: 3, text: "6 個（1, 2, 3, 6, 9, 18）。" },
      ],
      formulaPreview: "(1+1)(2+1) = 6",
    },
    {
      id: "step3", position: 3,
      questionText: "24 の約数は何個あるでしょう？",
      answer: 8, unit: "個", unknownLabel: "約数の個数",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$24 = 2^3 \\times 3$。" },
        { layer: 2, text: "$(3+1)(1+1) = 4 \\times 2$。" },
        { layer: 3, text: "8 個。" },
      ],
      formulaPreview: "(3+1)(1+1) = 8",
    },
    {
      id: "step4", position: 4,
      questionText: "36 の約数は何個あるでしょう？",
      answer: 9, unit: "個", unknownLabel: "約数の個数",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$36 = 2^2 \\times 3^2$。" },
        { layer: 2, text: "$(2+1)(2+1)$。" },
        { layer: 3, text: "9 個。" },
      ],
      formulaPreview: "(2+1)(2+1) = 9",
    },
    {
      id: "step5", position: 5,
      questionText: "60 の約数は何個あるでしょう？",
      answer: 12, unit: "個", unknownLabel: "約数の個数",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$60 = 2^2 \\times 3 \\times 5$。素因数が 3 つ。" },
        { layer: 2, text: "$(2+1)(1+1)(1+1) = 3 \\times 2 \\times 2$。" },
        { layer: 3, text: "12 個。" },
      ],
      formulaPreview: "(2+1)(1+1)(1+1) = 12",
    },
  ],
};

/** VAR1: 5つの数の分散 */
export const ALGEBRA_VARIANCE_SERIES: LearnerSeries = {
  id: "algebra_variance_01",
  title: "分散の入り口",
  subtitle:
    "5つの数の分散を求める5問。「平均からの離れ方の2乗を平均したもの」。",
  patternId: "VAR1",
  unit: "algebra_1",
  revelationLabel: "分散 = (各データ - 平均)² の平均",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "5つの数 1, 2, 3, 4, 5 の分散はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "分散",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "平均は 3。偏差は -2, -1, 0, 1, 2。" },
        { layer: 2, text: "偏差²は 4, 1, 0, 1, 4。和は 10。" },
        { layer: 3, text: "$10 / 5 = 2$。" },
      ],
      formulaPreview: "10 / 5 = 2",
    },
    {
      id: "step2", position: 2,
      questionText: "5つの数 0, 1, 2, 3, 4 の分散はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "分散",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "平均 2。偏差 -2, -1, 0, 1, 2。" },
        { layer: 2, text: "偏差² 4, 1, 0, 1, 4 → 和 10。" },
        { layer: 3, text: "$10 / 5 = 2$。" },
      ],
      formulaPreview: "10 / 5 = 2",
    },
    {
      id: "step3", position: 3,
      questionText: "5つの数 2, 4, 6, 8, 10 の分散はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "分散",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "平均 6。偏差 -4, -2, 0, 2, 4。" },
        { layer: 2, text: "偏差² 16, 4, 0, 4, 16 → 和 40。" },
        { layer: 3, text: "$40 / 5 = 8$。" },
      ],
      formulaPreview: "40 / 5 = 8",
    },
    {
      id: "step4", position: 4,
      questionText: "5つの数 -2, -1, 0, 1, 2 の分散はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "分散",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "平均 0。偏差はそのまま -2, -1, 0, 1, 2。" },
        { layer: 2, text: "偏差² 4, 1, 0, 1, 4 → 和 10。" },
        { layer: 3, text: "$10 / 5 = 2$。" },
      ],
      formulaPreview: "10 / 5 = 2",
    },
    {
      id: "step5", position: 5,
      questionText: "5 人のテスト点数 60, 70, 80, 90, 100 の分散はいくつでしょう？",
      answer: 200, unit: "", unknownLabel: "分散",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "平均 80。偏差 -20, -10, 0, 10, 20。" },
        { layer: 2, text: "偏差² 400, 100, 0, 100, 400 → 和 1000。" },
        { layer: 3, text: "$1000 / 5 = 200$。" },
      ],
      formulaPreview: "1000 / 5 = 200",
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
  ALGEBRA_QUAD_PRODUCT_SERIES,
  ALGEBRA_DISCRIMINANT_SERIES,
  ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
  ALGEBRA_QUAD_VERTEX_SERIES,
  ALGEBRA_MEAN_SERIES,
  ALGEBRA_VARIANCE_SERIES,
  ALGEBRA_PERMUTATION_SERIES,
  ALGEBRA_DIVISOR_COUNT_SERIES,
];
