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
  derivation: `**加減法は「一方の文字を消す」テクニック**

連立方程式 $\\begin{cases} x + y = p \\\\ x - y = q \\end{cases}$ から $x$ を求めるとき、2 式を **足し算** すると：

$$(x + y) + (x - y) = p + q$$

$y$ がきれいに **打ち消し合って**：

$$2x = p + q$$

両辺を $2$ で割って：

$$x = \\frac{p + q}{2}$$

これが **加減法** という解法。「一方の文字を消す」のが核心です。

**なぜ「足す」と消えるのか**

$x + y$ と $x - y$ では、$y$ の符号が **逆**（プラスとマイナス）。だから両方を足すと、$y$ がちょうど打ち消し合います。

逆に **引き算** すると、今度は $x$ が消えます：

$$(x + y) - (x - y) = p - q$$
$$2y = p - q$$

「足せば $y$ が消えて $x$ が出る」「引けば $x$ が消えて $y$ が出る」——どちらでもよい。

**もっと一般の連立方程式**

実際の連立方程式は、$x$ や $y$ の係数が違うことが多い。たとえば：

$$\\begin{cases} 3x + 2y = 12 \\\\ 5x - 2y = 4 \\end{cases}$$

このように **同じ係数（または符号反対の係数）** があれば、すぐに足すか引いて文字を消せます。$+2y$ と $-2y$ なので、足すと $y$ が消えて：

$$8x = 16 \\quad\\Longrightarrow\\quad x = 2$$

**係数が違うときは「揃える」**

$$\\begin{cases} 2x + 3y = 13 \\\\ 5x - 2y = 4 \\end{cases}$$

このときは、$y$ の係数を **3 と 2 → 6 にそろえる**。
- 1 式目を2倍：$4x + 6y = 26$
- 2 式目を3倍：$15x - 6y = 12$
- 足すと $19x = 38$、$x = 2$。

「**両辺を整数倍** すれば、係数を自由にそろえられる」のがポイント。

**代入法という別の道**

連立方程式の解き方には、もう1つ **代入法** があります。「片方の式を $y = \\ldots$ の形にして、もう一方に代入する」やり方。

| 加減法 | 代入法 |
|---|---|
| 一方の文字を消すよう、足し引きする | 一方の式から $y$ を表して、他方に代入する |
| 係数が揃いやすいときに有利 | $y$ の係数が 1 のときに有利 |

両方とも、結局は **「2 つの未知数を 1 つに減らす」** という発想は同じ。連立方程式は「1 文字消せれば、勝ち」です。

**3 元連立方程式・行列**

文字が 3 つ、4 つ、…と増えても、原理は同じ。「1 文字ずつ消していく」のが基本戦略です。文字が多くなると、**行列** という道具を使って体系的に解く方法が用意されています（高校数Ⅲ・大学線形代数）。

すべての出発点は、この **「2 つの式を足したり引いたりして、文字を消す」** という発想です。`,
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
  derivation: `**ピタゴラスの定理は「面積の足し算」**

直角三角形の3辺 $a, b, c$（$c$ が斜辺）について：

$$a^2 + b^2 = c^2$$

なぜこんなにシンプルな関係が成り立つのか。それは「**正方形の面積を2通りで数える**」という証明で見えてきます。

**証明：1辺が $(a+b)$ の大きな正方形**

1辺が $(a + b)$ の正方形を1つ用意します。この正方形の中に、同じ直角三角形（辺が $a, b, c$）を4枚、斜めに配置すると、真ん中にぴったり「1辺が $c$ の正方形」が現れます。

**数え方その1：大きな正方形の面積**

$$\\text{面積} = (a + b)^2 = a^2 + 2ab + b^2$$

**数え方その2：中身を分解した面積**

$$\\text{面積} = \\underbrace{4 \\times \\frac{ab}{2}}_{4枚の直角三角形} + \\underbrace{c^2}_{中の正方形} = 2ab + c^2$$

**両者は等しい**

$$a^2 + 2ab + b^2 = 2ab + c^2$$

両辺から $2ab$ を引くと：

$$a^2 + b^2 = c^2$$

これがピタゴラスの定理の **面積による証明** です。

**斜辺を求める形に書き直すと**

両辺の正の平方根を取って：

$$c = \\sqrt{a^2 + b^2}$$

「**2辺の2乗を足して、ルートを取る**」——この系列ではこの計算を5問くり返しました。

**整数組（ピタゴラス数）**

$a^2 + b^2 = c^2$ が **3つとも整数** で成り立つ組を **ピタゴラス数** と言います。代表的なのは：

- $(3, 4, 5)$：$9 + 16 = 25$
- $(5, 12, 13)$：$25 + 144 = 169$
- $(8, 15, 17)$：$64 + 225 = 289$
- $(7, 24, 25)$：$49 + 576 = 625$

これらは自然界で偶然できるわけではなく、$(m^2 - n^2,\\ 2mn,\\ m^2 + n^2)$ という公式から無限に作り出せます。たとえば $m = 2, n = 1$ なら $(3, 4, 5)$。

**正方形の対角線**

直角三角形のうち、特に **直角を挟む2辺が等しい** とき（$a = b$）：

$$c = \\sqrt{a^2 + a^2} = \\sqrt{2 a^2} = a\\sqrt{2}$$

正方形の対角線が必ず「$\\sqrt{2}$ 倍」になるのは、ピタゴラスの定理から自然に出てきます。`,
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
  derivation: `**組合せ C(n, 2) は「2 人を選ぶ方法の数」**

$n$ 人から 2 人を選ぶ組合せの総数：

$$C(n, 2) = \\frac{n(n - 1)}{2}$$

「**$n \\times (n-1)$ を 2 で割る**」——なぜこの形になるのか、丁寧に追っていきます。

**まず「順番つきで選ぶ」回数を数える**

$n$ 人から 2 人を **順番つきで** 選ぶ場合：

- 1 番目の選び方：$n$ 通り
- 2 番目の選び方（残りから）：$n - 1$ 通り

掛けて、**$n(n - 1)$** 通り。

これは **順列** $P(n, 2)$ と呼ばれます。

**「同じ組合せ」を 2 回数えている**

問題は、「順番つき」で数えると、たとえば 「Aさん→Bさん」 と 「Bさん→Aさん」 が **別の選び方** として数えられてしまうこと。

しかし「2人の組合せ」としては、これは **同じ組**。だから 2 重に数えています。

**だから 2 で割る**

組合せ（順番なし）の数は、順列の **半分**：

$$C(n, 2) = \\frac{P(n, 2)}{2} = \\frac{n(n - 1)}{2}$$

「$\\div 2$」は、**「順番が違っても同じ組とみなす」** ことの帳尻合わせ。

**具体例で確かめる**

4 人 A, B, C, D から 2 人選ぶ組合せをすべて書き出すと：

$$\\{A, B\\},\\ \\{A, C\\},\\ \\{A, D\\},\\ \\{B, C\\},\\ \\{B, D\\},\\ \\{C, D\\}$$

6 通り。公式で計算：$\\dfrac{4 \\times 3}{2} = 6$。一致！

**順列と組合せの違い**

| 種類 | 順番 | 公式 |
|---|---|---|
| 順列 $P(n, 2)$ | **区別する** | $n(n-1)$ |
| 組合せ $C(n, 2)$ | **区別しない** | $\\dfrac{n(n-1)}{2}$ |

「**走者の順番を決める**」のは順列、「**ペアを作る**」のは組合せ——状況によって使い分けます。

**一般化：$r$ 人選ぶ場合**

$n$ 人から $r$ 人選ぶ組合せは：

$$C(n, r) = \\frac{n!}{r! (n - r)!}$$

ここで $n!$ は **階乗** で、$n \\times (n-1) \\times \\cdots \\times 1$ のこと。

$r = 2$ なら $\\dfrac{n!}{2!(n-2)!} = \\dfrac{n(n-1)}{2}$ になります（公式と一致）。

**応用：身近な計算**

- 30 人のクラスで **握手の総数**：$C(30, 2) = 435$ 回
- 32 チームのリーグ戦（全試合）：$C(32, 2) = 496$ 試合
- 7 個の数字から 2 つ選ぶ問題：$C(7, 2) = 21$ 通り

「2 つを選ぶ」状況は身近にたくさん。組合せは確率の計算でも頻繁に登場する基本道具です。`,
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
