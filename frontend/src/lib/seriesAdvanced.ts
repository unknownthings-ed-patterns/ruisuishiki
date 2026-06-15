/**
 * ★チャレンジ系列（発展）。
 *
 * ローフロア・ハイシーリングのビジョンを体現する「天井」側。
 * 既存の単元の応用・複合・抽象化で、岩井さんの自己教育と
 * 上を目指す学習者のために用意する。
 *
 * MVP では「2次関数の最大最小」だけ試作。感触を見て増やす。
 */

import type { LearnerSeries } from "./types";

/**
 * VV1: f(x) = x² + bx + c の最小値。平方完成で頂点の y 座標を求める。
 * a = 1, b は偶数で答えが整数になる範囲で厳選。
 */
export const ADV_QUAD_MIN_SERIES: LearnerSeries = {
  id: "adv_quad_min_01",
  title: "★ 2次関数の最小値",
  subtitle:
    "$f(x) = x^2 + bx + c$ の最小値を求める10問。平方完成・頂点の y 座標。",
  patternId: "VV1",
  unit: "advanced",
  revelationLabel: "最小値 = c − b²/4（頂点の y 座標）",
  derivation: `**最小値ってどこのこと？**

$f(x) = x^2 + bx + c$ のグラフを描くと、上向きのお椀のような曲線になります。数学では、こういう **口が上向きに開いた放物線** を「**下に凸（とつ）**」と言います。$x^2$ の係数が 1 で正のとき、グラフは必ず下に凸になります。

<<PARABOLA_UP>>

この下に凸な放物線の **底** の高さ（y 座標）が「最小値」です。

「お椀の底を、式から読み取れるようにしたい」——これがこの先のすべての出発点。

**どんな形になれば、底が読める？**

もし式が次のように $(x - p)^2 + q$ の形だったら、話はとても早い：

$$f(x) = (x - p)^2 + q$$

$(x - p)^2$ は二乗だから、$x$ がどんな数でも **必ず 0 以上**。だから $f(x)$ の値は **必ず $q$ 以上**。

そして $(x - p)^2 = 0$ になるとき、つまり $x = p$ のとき、いちばん小さい値 $q$ になります。

**底の y 座標 $= q$**。式を見るだけで答えが浮き上がる形です。

だから、私たちの $x^2 + bx + c$ を、この $(x - p)^2 + q$ の形に **変形** したい——これが目標です。

**$(x + a)^2$ を思い出す**

そのために、$(x + a)^2$ を展開した形を使います：

$$(x + a)^2 = x^2 + 2ax + a^2$$

これを私たちの式 $x^2 + bx + c$ と並べてみます。$x^2$ の項はどちらも 1 で揃っている。次に $x$ の項を見ると、片方は $2ax$、もう片方は $bx$。これが揃うには $2a = b$、つまり $a = b/2$ にすればいい。

**「あ、$b/2$ がここから出てきたのか」**

ここからが式変形の核心です。$(x + b/2)^2$ を **そのまま書いてしまう** ことから始めます。書いてしまえば中に $(b/2)^2$ が含まれてしまうので、その分を **直後に引いて取り戻す** ——「足したぶん、すぐ引く」という流儀です：

$$f(x) = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c$$

$(x + b/2)^2$ を展開すると $x^2 + bx + (b/2)^2$ になり、直後の $-(b/2)^2$ で打ち消されて、元の $x^2 + bx$ に戻るので、式の値は変わっていません。

そして $(b/2)^2 = b^2/4$ なので：

$$f(x) = \\left(x + \\frac{b}{2}\\right)^2 - \\frac{b^2}{4} + c$$

最後の2項をひとまとめにして：

$$f(x) = \\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$$

これで $(x - p)^2 + q$ の形に **変形完了**！この変形は **「平方完成」** と呼ばれます。

**底の高さを読む**

$(x + b/2)^2$ はどんな $x$ でも 0 以上。最小はちょうど 0 になるとき、つまり $x = -b/2$ のとき。そのときの $f(x)$ の値は、後ろの「残り」だけが残るので：

$$\\min f(x) = c - \\frac{b^2}{4}$$

これが、**下に凸な放物線の底の高さ＝最小値** です。

**1つの平方完成で、グラフの3つの読みどころ**

平方完成した式 $f(x) = (x + b/2)^2 + (c - b^2/4)$ からは、実は3つの情報が **一度に** 読み取れます：

- **頂点（お椀の底）**：$\\left(-\\dfrac{b}{2},\\ c - \\dfrac{b^2}{4}\\right)$
- **軸の方程式**（グラフの対称軸）：$x = -\\dfrac{b}{2}$
- **y 切片**（y 軸と交わる点の y 座標）：もとの式に $x = 0$ を代入して $c$

今回の系列で聞かれた「最小値」は、3つのうち **頂点の y 座標** にあたります。でも平方完成は本当はもっと多くの情報を一度に教えてくれる、強力な変形なのです。

「$c - b^2/4$」という公式は、**平方完成した後に残った部分** だったのです。

ちなみに、この系列では問題の $b$ をすべて偶数にしてあります。$b$ が偶数だと $b^2/4$ がきれいに割り切れて、答えが整数になるから——奇数だと分数の答えが出てしまって、計算の手応えがぼやけてしまうので。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$f(x) = x^2 + 4x + 5$ の最小値はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "最小値",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "平方完成 $f(x) = (x+2)^2 + 1$。" },
        { layer: 2, text: "最小値 = $c - b^2/4 = 5 - 4$。" },
        { layer: 3, text: "最小値は 1（$x = -2$ のとき）。" },
      ],
      formulaPreview: "5 − 16/4 = 1",
    },
    {
      id: "step2", position: 2,
      questionText: "$f(x) = x^2 + 6x + 10$ の最小値はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。$c - b^2/4$。" },
        { layer: 2, text: "$10 - 36/4 = 10 - 9$。" },
        { layer: 3, text: "1。" },
      ],
      formulaPreview: "10 − 36/4 = 1",
    },
    {
      id: "step3", position: 3,
      questionText: "$f(x) = x^2 - 4x + 7$ の最小値はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$b = -4$。$b^2 = 16$。" },
        { layer: 2, text: "$7 - 16/4$。" },
        { layer: 3, text: "3。" },
      ],
      formulaPreview: "7 − 16/4 = 3",
    },
    {
      id: "step4", position: 4,
      questionText: "$f(x) = x^2 + 8x + 20$ の最小値はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$20 - 64/4$。" },
        { layer: 2, text: "$20 - 16$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "20 − 64/4 = 4",
    },
    {
      id: "step5", position: 5,
      questionText: "$f(x) = x^2 - 2x + 5$ の最小値はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$5 - 4/4$。" },
        { layer: 2, text: "$5 - 1$。" },
        { layer: 3, text: "最小値は 4（$x = 1$ のとき）。" },
      ],
      formulaPreview: "5 − 4/4 = 4",
    },
    {
      id: "step6", position: 6,
      questionText: "$f(x) = x^2 + 10x + 30$ の最小値はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "$30 - 100/4$。" },
        { layer: 2, text: "$30 - 25$。" },
        { layer: 3, text: "5。" },
      ],
      formulaPreview: "30 − 100/4 = 5",
    },
    {
      id: "step7", position: 7,
      questionText: "$f(x) = x^2 - 6x + 11$ の最小値はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "$11 - 36/4$。" },
        { layer: 2, text: "$11 - 9$。" },
        { layer: 3, text: "2。" },
      ],
      formulaPreview: "11 − 36/4 = 2",
    },
    {
      id: "step8", position: 8,
      questionText: "$f(x) = x^2 - 12x + 40$ の最小値はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "$40 - 144/4$。" },
        { layer: 2, text: "$40 - 36$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "40 − 144/4 = 4",
    },
    {
      id: "step9", position: 9,
      questionText: "$f(x) = x^2 + 14x + 50$ の最小値はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "$50 - 196/4$。" },
        { layer: 2, text: "$50 - 49$。" },
        { layer: 3, text: "1。" },
      ],
      formulaPreview: "50 − 196/4 = 1",
    },
    {
      id: "step10", position: 10,
      questionText: "$g(y) = y^2 - 10y + 28$ の最小値はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "qualitative", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "変数 y、関数名 g。仕組みは同じ。" },
        { layer: 2, text: "$28 - 100/4 = 28 - 25$。" },
        { layer: 3, text: "最小値は 3（$y = 5$ のとき）。" },
      ],
      formulaPreview: "28 − 100/4 = 3",
    },
  ],
};

/**
 * 「★ 2次関数のグラフを読む」発展系列。
 *
 * 平方完成から読み取れる3つの情報（頂点・軸・y切片）を、
 * 推理式の「同→+α→逆」変化オペレータで段階的に体感する。
 *
 * - step1-3: 頂点の x 座標 = -b/2
 * - step4-5: 頂点の y 座標 = c - b²/4
 * - step6:   軸の方程式 = x = -b/2（頂点 x 座標と同じだが「軸」として問う：+α）
 * - step7:   y 切片 = c そのもの（+α）
 * - step8:   質的変化：別の変数記号で頂点 x 座標
 * - step9-10: 逆オペレータ：頂点 (p, q) から元の式の c を逆算
 */
export const ADV_QUAD_GRAPH_SERIES: LearnerSeries = {
  id: "adv_quad_graph_01",
  title: "★ 2次関数のグラフを読む",
  subtitle:
    "$f(x) = x^2 + bx + c$ の頂点・軸・y 切片を読み取る10問。平方完成の本領発揮。",
  patternId: "GR1",
  unit: "advanced",
  revelationLabel: "平方完成から頂点（−b/2, c−b²/4）・軸・y 切片が一度に読める",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$f(x) = x^2 + 4x + 5$ の頂点の **x 座標** はいくつでしょう？",
      answer: -2, unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "頂点の x 座標は $-b/2$。" },
        { layer: 2, text: "$b = 4$ なので $-4/2$。" },
        { layer: 3, text: "$-2$。" },
      ],
      formulaPreview: "−4/2 = −2",
    },
    {
      id: "step2", position: 2,
      questionText: "$f(x) = x^2 - 6x + 11$ の頂点の **x 座標** はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。$-b/2$。" },
        { layer: 2, text: "$b = -6$ なので $-(-6)/2$。" },
        { layer: 3, text: "$3$。" },
      ],
      formulaPreview: "−(−6)/2 = 3",
    },
    {
      id: "step3", position: 3,
      questionText: "$f(x) = x^2 + 10x + 30$ の頂点の **x 座標** はいくつでしょう？",
      answer: -5, unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$-b/2$。" },
        { layer: 2, text: "$-10/2$。" },
        { layer: 3, text: "$-5$。" },
      ],
      formulaPreview: "−10/2 = −5",
    },
    {
      id: "step4", position: 4,
      questionText: "$f(x) = x^2 + 4x + 5$ の頂点の **y 座標** はいくつでしょう？（step 1 と同じ関数で、今度は y 座標）",
      answer: 1, unit: "", unknownLabel: "頂点の y 座標",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "頂点の y 座標は $c - b^2/4$。" },
        { layer: 2, text: "$5 - 16/4 = 5 - 4$。" },
        { layer: 3, text: "$1$。" },
      ],
      formulaPreview: "5 − 4 = 1",
    },
    {
      id: "step5", position: 5,
      questionText: "$f(x) = x^2 - 6x + 11$ の頂点の **y 座標** はいくつでしょう？（step 2 と同じ関数）",
      answer: 2, unit: "", unknownLabel: "頂点の y 座標",
      variationFromPrevious: "same", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$c - b^2/4$。" },
        { layer: 2, text: "$11 - 36/4 = 11 - 9$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "11 − 9 = 2",
    },
    {
      id: "step6", position: 6,
      questionText: "$f(x) = x^2 - 8x + 20$ の **軸の方程式 $x = c$** の $c$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "軸の x 座標",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "軸の方程式は $x = -b/2$。頂点の x 座標と同じ。" },
        { layer: 2, text: "$-(-8)/2$。" },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "−(−8)/2 = 4",
    },
    {
      id: "step7", position: 7,
      questionText: "$f(x) = x^2 + 6x + 7$ の **y 切片**（グラフが y 軸と交わる点の y 座標）はいくつでしょう？",
      answer: 7, unit: "", unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "y 切片は $x = 0$ を代入したときの $f$ の値。" },
        { layer: 2, text: "$f(0) = 0 + 0 + 7$。つまり定数項 $c$ そのもの。" },
        { layer: 3, text: "$7$。" },
      ],
      formulaPreview: "c = 7",
    },
    {
      id: "step8", position: 8,
      questionText: "$g(y) = y^2 + 8y + 20$ の頂点の **y 座標** はいくつでしょう？（変数も関数名も違う）",
      answer: 4, unit: "", unknownLabel: "頂点の y 座標",
      variationFromPrevious: "qualitative", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "変数記号が違うだけ。$c - b^2/4$。" },
        { layer: 2, text: "$20 - 64/4 = 20 - 16$。" },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "20 − 16 = 4",
    },
    {
      id: "step9", position: 9,
      questionText: "頂点 $(3, 5)$ をもつ $f(x) = x^2 + bx + c$ の **定数項 $c$** はいくつでしょう？",
      answer: 14, unit: "", unknownLabel: "定数項 c",
      variationFromPrevious: "inverse", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "頂点 $(p, q)$ なら $f(x) = (x - p)^2 + q$。展開して $c$ を読む。" },
        { layer: 2, text: "$(x - 3)^2 + 5 = x^2 - 6x + 9 + 5$。" },
        { layer: 3, text: "$c = 14$。" },
      ],
      formulaPreview: "3² + 5 = 14",
    },
    {
      id: "step10", position: 10,
      questionText: "頂点 $(-2, 3)$ をもつ $f(x) = x^2 + bx + c$ の **定数項 $c$** はいくつでしょう？",
      answer: 7, unit: "", unknownLabel: "定数項 c",
      variationFromPrevious: "same", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "公式は $c = p^2 + q$。" },
        { layer: 2, text: "$(-2)^2 + 3 = 4 + 3$。" },
        { layer: 3, text: "$7$。" },
      ],
      formulaPreview: "(−2)² + 3 = 7",
    },
  ],
  derivation: `**1つの平方完成で、グラフの3つの読みどころ**

この系列で出てきた問いは、すべて同じ操作 **「平方完成」** から答えが読み取れます。

$f(x) = x^2 + bx + c$ を平方完成すると：

$$f(x) = \\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$$

この形を眺めると、3つの大切な情報が **一度に** 浮かび上がります：

- **頂点**：$\\left(-\\dfrac{b}{2},\\ c - \\dfrac{b^2}{4}\\right)$
- **軸の方程式**：$x = -\\dfrac{b}{2}$（頂点の x 座標を通る縦の直線）
- **y 切片**：もとの式に $x = 0$ を代入して $c$

**1つの式変形で、グラフの「形」も「位置」もすべて確定する**——それが平方完成の本領です。

**逆向きにも使える**

step 9 と 10 では逆の方向を歩きました。頂点 $(p, q)$ から元の式を作るには：

$$f(x) = (x - p)^2 + q$$

これを展開すると：

$$f(x) = x^2 - 2px + p^2 + q$$

$x$ の係数は $b = -2p$、定数項は $c = p^2 + q$。

頂点さえ知っていれば、$x^2 + bx + c$ の $b$ と $c$ が両方とも逆算できる。**グラフから式が読み取れる** ということです。

**「グラフを読む」とは何か**

ふつう「グラフを描く」は式 → 図の方向ですが、平方完成の力を借りると **式 → 頂点・軸・y 切片** という形でグラフの輪郭が**頭の中**に描けます。さらに、頂点を知っているなら **頂点 → 式** という逆方向も歩けます。

これが、$x^2 + bx + c$ という6文字の式に隠されていた、**グラフ全体の地図** です。`,
};

/**
 * 「★ 直線の方程式を読む」発展系列。
 * 数Ⅱ・B「図形と方程式」第3章の中核 — 傾き・切片・中点・垂直。
 *
 * - step1-3: 2点を通る直線の傾き（基本原形・同）
 * - step4:   同じ2点の直線の y 切片（+α）
 * - step5:   点 (a, b) と傾き m から y 切片（同パターン）
 * - step6:   ある直線と平行で点を通る直線の y 切片（+α）
 * - step7:   2点の中点の x 座標（+α）
 * - step8:   同じ2点の中点の y 座標（同）
 * - step9:   傾き m に垂直な直線の傾き（逆／小数 0.5 等を許容）
 * - step10:  質的変化：別変数名 or 別場面
 */
export const ADV_LINE_EQUATION_SERIES: LearnerSeries = {
  id: "adv_line_equation_01",
  title: "★ 直線の方程式を読む",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 傾き・切片・中点・垂直の10問。",
  patternId: "LN1",
  unit: "advanced",
  revelationLabel: "傾き＝yの差／xの差。中点＝平均。垂直＝傾きの積が −1",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "2点 $(1, 2)$ と $(3, 8)$ を通る直線の **傾き** はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "傾き",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "傾き $= \\dfrac{y\\text{ の差}}{x\\text{ の差}}$。" },
        { layer: 2, text: "$\\dfrac{8 - 2}{3 - 1} = \\dfrac{6}{2}$。" },
        { layer: 3, text: "$3$。" },
      ],
      formulaPreview: "(8−2)/(3−1) = 3",
    },
    {
      id: "step2", position: 2,
      questionText: "2点 $(2, 5)$ と $(5, 11)$ を通る直線の **傾き** はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "傾き",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$\\dfrac{y\\text{ の差}}{x\\text{ の差}}$。" },
        { layer: 2, text: "$\\dfrac{11 - 5}{5 - 2} = \\dfrac{6}{3}$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "(11−5)/(5−2) = 2",
    },
    {
      id: "step3", position: 3,
      questionText: "2点 $(0, 4)$ と $(3, -2)$ を通る直線の **傾き** はいくつでしょう？",
      answer: -2, unit: "", unknownLabel: "傾き",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "符号にも注意。" },
        { layer: 2, text: "$\\dfrac{-2 - 4}{3 - 0} = \\dfrac{-6}{3}$。" },
        { layer: 3, text: "$-2$。" },
      ],
      formulaPreview: "(−2−4)/(3−0) = −2",
    },
    {
      id: "step4", position: 4,
      questionText: "2点 $(1, 2)$ と $(3, 8)$ を通る直線の **y 切片** はいくつでしょう？（step 1 と同じ2点で、今度は切片）",
      answer: -1, unit: "", unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "傾き $m = 3$（step 1）。次に $y = mx + n$ に1点を代入。" },
        { layer: 2, text: "$(1, 2)$ を入れて $2 = 3 \\cdot 1 + n$。" },
        { layer: 3, text: "$n = -1$。" },
      ],
      formulaPreview: "2 = 3·1 + n → n = −1",
    },
    {
      id: "step5", position: 5,
      questionText: "点 $(2, 5)$ を通り、傾き $3$ の直線の **y 切片** はいくつでしょう？",
      answer: -1, unit: "", unknownLabel: "y 切片",
      variationFromPrevious: "same", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$y = mx + n$ に点を代入。" },
        { layer: 2, text: "$5 = 3 \\cdot 2 + n$。" },
        { layer: 3, text: "$n = -1$。" },
      ],
      formulaPreview: "5 = 6 + n → n = −1",
    },
    {
      id: "step6", position: 6,
      questionText: "$y = 2x + 7$ に **平行** で、点 $(1, 5)$ を通る直線の **y 切片** はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "平行な直線は **傾きが同じ**。だから $m = 2$。" },
        { layer: 2, text: "$y = 2x + n$ に $(1, 5)$ を代入：$5 = 2 + n$。" },
        { layer: 3, text: "$n = 3$。" },
      ],
      formulaPreview: "5 − 2·1 = 3",
    },
    {
      id: "step7", position: 7,
      questionText: "2点 $(1, 5)$ と $(7, 3)$ の **中点の x 座標** はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "中点の x 座標",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "中点は両端の **平均**。" },
        { layer: 2, text: "$\\dfrac{1 + 7}{2}$。" },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "(1+7)/2 = 4",
    },
    {
      id: "step8", position: 8,
      questionText: "2点 $(1, 5)$ と $(7, 3)$ の **中点の y 座標** はいくつでしょう？（step 7 と同じ2点）",
      answer: 4, unit: "", unknownLabel: "中点の y 座標",
      variationFromPrevious: "same", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "y も同じく平均。" },
        { layer: 2, text: "$\\dfrac{5 + 3}{2}$。" },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "(5+3)/2 = 4",
    },
    {
      id: "step9", position: 9,
      questionText: "傾き $2$ の直線に **垂直** な直線の傾きはいくつでしょう？（分数 $-1/2$ または小数 $-0.5$ で）",
      answer: -0.5, unit: "", unknownLabel: "垂直な直線の傾き",
      variationFromPrevious: "inverse", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "垂直なら $mm' = -1$。" },
        { layer: 2, text: "$2 \\cdot m' = -1$ より $m' = -\\dfrac{1}{2}$。" },
        { layer: 3, text: "$-\\dfrac{1}{2}$（小数だと $-0.5$）。" },
      ],
      formulaPreview: "−1 / 2 = −1/2",
    },
    {
      id: "step10", position: 10,
      questionText: "傾き $-4$ の直線に **垂直** な直線の傾きはいくつでしょう？（分数 $1/4$ または小数 $0.25$ で）",
      answer: 0.25, unit: "", unknownLabel: "垂直な直線の傾き",
      variationFromPrevious: "qualitative", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "$mm' = -1$。" },
        { layer: 2, text: "$-4 \\cdot m' = -1$ より $m' = \\dfrac{1}{4}$。" },
        { layer: 3, text: "$\\dfrac{1}{4}$（小数だと $0.25$）。" },
      ],
      formulaPreview: "−1 / (−4) = 1/4",
    },
  ],
  derivation: `**直線の方程式は「傾き」と「通る点」で決まる**

平面上の直線は、**傾き** と **通る1点**（あるいは通る2点）が決まれば、ぴったり1本に確定します。

直線の標準形 $y = mx + n$ では、$m$ が傾き、$n$ が y 切片です。**y 切片** とは、グラフが y 軸と交わる点の y 座標——つまり $x = 0$ のときの $y$ の値。式に $x = 0$ を入れれば $y = n$ となるので、$n$ が y 切片そのものです。

**2点から傾きを読む**

2点 $(x_1, y_1)$ と $(x_2, y_2)$ が決まれば、傾きは

$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$

「**y の差を x の差で割る**」——これは「x が 1 増えると y がどれだけ増えるか」をそのまま計算しています。

**点と傾きから切片を読む**

傾き $m$ がわかったら、$y = mx + n$ の $n$ を通る点から逆算します。たとえば点 $(a, b)$ を通るなら：

$$b = m \\cdot a + n \\quad\\Longrightarrow\\quad n = b - m \\cdot a$$

これが「点・傾き・切片」の三角関係。3つのうち2つが決まれば、残りの1つは必ず出ます。

**中点は平均**

線分 $AB$ の中点の座標は、両端の **平均** です：

$$M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$$

x も y も別々に「真ん中」を取るだけ——これは数直線で「両端の真ん中」を考える発想を、x 軸 と y 軸に独立に適用したものです。

**平行と垂直**

2直線が **平行** なら、傾きが等しい：$m = m'$。
2直線が **垂直** なら、傾きの **積が** $-1$：$m \\cdot m' = -1$。

垂直のとき、片方の傾きを $m$ とすると、もう片方は $m' = -\\dfrac{1}{m}$ になります。だから、$m = 2$ の直線に垂直な直線の傾きは $-\\dfrac{1}{2}$。傾きが整数だった直線でも、**垂直な直線の傾きはほとんど分数（小数）になる** ことに注意してください。

**この系列で扱った「読み方」**

| 読み方 | 公式 |
|---|---|
| 2点から傾き | $m = (y_2 - y_1)/(x_2 - x_1)$ |
| 点と傾きから y 切片 | $n = b - m \\cdot a$ |
| 平行な直線 | 傾きが同じ |
| 線分の中点 | 両端の平均 |
| 垂直な直線 | $mm' = -1$ |

直線の方程式は、たった5つの読み方で **「点・傾き・切片・中点・垂直」** の関係をすべて記述できます。$y = mx + n$ という6文字の式が、平面の上で1本の直線を完全に決める仕組み——これが「図形と方程式」という単元の名前の本当の意味です。`,
};

/**
 * 「★ 点と直線の距離」発展系列。
 * 数Ⅱ・B「図形と方程式」の中核公式：d = |ax₀+by₀+c| / √(a²+b²)。
 *
 * 整数答えに収まるよう、分母が整数になるピタゴラス数の組
 * （3,4,5）（5,12,13）（8,15,17）（6,8,10）を利用。
 *
 * - step1-3: 基本原形と同（材料置換）
 * - step4-6: 同（別のピタゴラス数の組）
 * - step7:   負数や原点以外の点を含む組合せ
 * - step8:   さらに大きい数（8,15,17 の組）
 * - step9:   質的変化：水平直線への距離（直感的解釈）
 * - step10:  応用：三角形 ABC の面積（点と直線の距離の応用）
 */
export const ADV_POINT_LINE_DISTANCE_SERIES: LearnerSeries = {
  id: "adv_point_line_distance_01",
  title: "★ 点と直線の距離",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 公式 $d = |ax_0+by_0+c|/\\sqrt{a^2+b^2}$ を10問。",
  patternId: "LN8",
  unit: "advanced",
  revelationLabel: "d = |ax₀ + by₀ + c| ÷ √(a² + b²)",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "直線 $3x - 4y - 9 = 0$ と点 $(1, 6)$ の距離はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$。" },
        { layer: 2, text: "$\\dfrac{|3 \\cdot 1 + (-4) \\cdot 6 - 9|}{\\sqrt{9 + 16}} = \\dfrac{|-30|}{5}$。" },
        { layer: 3, text: "$6$。" },
      ],
      formulaPreview: "|−30| / 5 = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "直線 $3x + 4y - 25 = 0$ と原点 $(0, 0)$ の距離はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "原点なので、分子は $|c|$ に簡略化される。" },
        { layer: 2, text: "$\\dfrac{|-25|}{\\sqrt{9 + 16}} = \\dfrac{25}{5}$。" },
        { layer: 3, text: "$5$。" },
      ],
      formulaPreview: "|−25| / 5 = 5",
    },
    {
      id: "step3", position: 3,
      questionText: "直線 $4x - 3y + 5 = 0$ と点 $(2, 1)$ の距離はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "公式に代入。" },
        { layer: 2, text: "$\\dfrac{|4 \\cdot 2 - 3 \\cdot 1 + 5|}{\\sqrt{16 + 9}} = \\dfrac{|10|}{5}$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "|10| / 5 = 2",
    },
    {
      id: "step4", position: 4,
      questionText: "直線 $5x + 12y - 30 = 0$ と点 $(1, 1)$ の距離はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "今度は分母が $\\sqrt{25+144} = 13$。" },
        { layer: 2, text: "$\\dfrac{|5 + 12 - 30|}{13} = \\dfrac{|-13|}{13}$。" },
        { layer: 3, text: "$1$。" },
      ],
      formulaPreview: "|−13| / 13 = 1",
    },
    {
      id: "step5", position: 5,
      questionText: "直線 $5x - 12y + 39 = 0$ と原点 $(0, 0)$ の距離はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "原点なので分子は $|c| = 39$。" },
        { layer: 2, text: "$\\dfrac{39}{\\sqrt{25 + 144}} = \\dfrac{39}{13}$。" },
        { layer: 3, text: "$3$。" },
      ],
      formulaPreview: "39 / 13 = 3",
    },
    {
      id: "step6", position: 6,
      questionText: "直線 $4x + 3y + 15 = 0$ と原点 $(0, 0)$ の距離はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "(3, 4, 5) の組に戻った。" },
        { layer: 2, text: "$\\dfrac{|15|}{\\sqrt{16 + 9}} = \\dfrac{15}{5}$。" },
        { layer: 3, text: "$3$。" },
      ],
      formulaPreview: "|15| / 5 = 3",
    },
    {
      id: "step7", position: 7,
      questionText: "直線 $3x - 4y + 20 = 0$ と点 $(-5, 0)$ の距離はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "$x_0 = -5$ なので $a x_0 = 3 \\cdot (-5) = -15$。" },
        { layer: 2, text: "$\\dfrac{|-15 - 0 + 20|}{5} = \\dfrac{|5|}{5}$。" },
        { layer: 3, text: "$1$。" },
      ],
      formulaPreview: "|5| / 5 = 1",
    },
    {
      id: "step8", position: 8,
      questionText: "直線 $8x + 15y - 34 = 0$ と原点 $(0, 0)$ の距離はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "same", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "(8, 15, 17) という新しいピタゴラスの組。" },
        { layer: 2, text: "$\\dfrac{|-34|}{\\sqrt{64+225}} = \\dfrac{34}{17}$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "34 / 17 = 2",
    },
    {
      id: "step9", position: 9,
      questionText: "直線 $y = 3$ と点 $(2, 7)$ の距離はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "距離 d",
      variationFromPrevious: "qualitative", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "水平な直線 $y = 3$ は、一般形だと $0 \\cdot x + 1 \\cdot y - 3 = 0$。" },
        { layer: 2, text: "$\\dfrac{|0 + 7 - 3|}{\\sqrt{0+1}} = \\dfrac{|4|}{1}$。" },
        { layer: 3, text: "$4$。直感的にも $|y_0 - 3| = |7 - 3|$。" },
      ],
      formulaPreview: "|7−3| = 4",
    },
    {
      id: "step10", position: 10,
      questionText: "3点 $A(0, 0)$, $B(4, 0)$, $C(0, 3)$ で作る三角形 $ABC$ の面積はいくつでしょう？（直線 BC の方程式と点 A の距離を使う、または底辺 × 高さ ÷ 2 で）",
      answer: 6, unit: "", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "直線 BC は $3x + 4y - 12 = 0$。原点 $A$ との距離は $\\dfrac{|-12|}{5} = \\dfrac{12}{5}$。" },
        { layer: 2, text: "$BC$ の長さは $\\sqrt{16+9} = 5$。面積 $= \\dfrac{1}{2} \\cdot 5 \\cdot \\dfrac{12}{5}$。" },
        { layer: 3, text: "$6$。（直角三角形なので $\\dfrac{1}{2} \\cdot 4 \\cdot 3$ でも同じ。）" },
      ],
      formulaPreview: "½ · 5 · 12/5 = 6",
    },
  ],
  derivation: `**「点と直線の距離」とは何か**

平面上に点 $A(x_0, y_0)$ と直線 $\\ell$ があるとき、$A$ から $\\ell$ に **垂直に下ろした線分** の長さを、$A$ と $\\ell$ の **距離** $d$ といいます。

<<POINT_LINE_DIST>>

図のように、$A$ から直線 $\\ell$ に垂直に下ろした足が $H$。$AH$ の長さがそのまま **距離 $d$** です。

「最短距離」と言ってもいい——$A$ から $\\ell$ 上のどの点に行くにも、まっすぐ垂直に下ろした足までが、いちばん近い道です。

**便利な公式**

直線が $ax + by + c = 0$ という形（**一般形**）で書けて、点が $(x_0, y_0)$ のとき：

$$d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$$

「**点の座標を直線の式の左辺に代入し、絶対値を取って、$\\sqrt{a^2+b^2}$ で割る**」。

たったこれだけで距離が出ます。垂線の足の座標を計算しなくてもよい——これがこの公式のすばらしさです。

**分子 $|ax_0 + by_0 + c|$ は「直線からのずれ」**

直線 $ax + by + c = 0$ とは、「$(x, y)$ を式に入れたとき、結果が $0$ になるような点の集まり」のこと。

点 $(x_0, y_0)$ を式の左辺に代入してみます：

- 結果が **$0$** なら、点は **直線上にある**（距離 $0$）
- 結果が $0$ でないなら、点は直線から **ずれている**

<<POINT_LINE_DEVIATION>>

図の例で、直線 $\\ell: x + 2y - 10 = 0$ に対して、

- $P_1 (2, 4)$：式に代入すると $2 + 8 - 10 = 0$ → 直線上
- $P_2 (4, 6)$：式に代入すると $4 + 12 - 10 = +6$ → 直線の上側にずれている
- $P_3 (2, 2)$：式に代入すると $2 + 4 - 10 = -4$ → 直線の下側にずれている

「**式に代入した結果の大きさ**」が、点と直線の **ずれ具合** を表しています。$P_2$ の方が $P_3$ より絶対値が大きいので、直線からより遠い、ということ。

絶対値 $| \\cdot |$ は、ずれは符号によらず正の量で測る、ということだけ。

**分母 $\\sqrt{a^2+b^2}$ は「測り方の補正」**

実は、直線 $ax + by + c = 0$ の両辺を $2$ 倍して $2ax + 2by + 2c = 0$ と書いても、**表している直線は同じ**。

でも、もし分子に直接 $|2a x_0 + 2b y_0 + 2c|$ を代入したら、答えが **2 倍** になってしまいます。「直線の書き方の違い」で距離が変わってしまうのはおかしい。

これを直すために、係数の大きさ $\\sqrt{a^2+b^2}$ で割って **正規化** します。

両辺を 2 倍した式で計算すると：

$$\\dfrac{|2a x_0 + 2b y_0 + 2c|}{\\sqrt{(2a)^2 + (2b)^2}} = \\dfrac{2 \\cdot |ax_0+by_0+c|}{2 \\cdot \\sqrt{a^2+b^2}} = \\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$$

ちゃんと **同じ値** が出てきます。「**直線をどう書いても、距離は同じ**」を保証しているのが分母の役目。

**特別な場合で確かめる**

水平な直線 $y = 3$ と点 $(2, 7)$ の距離は、直感的には **y 座標の差**、つまり $|7 - 3| = 4$。

公式で確かめましょう。直線 $y = 3$ を一般形で書くと $0 \\cdot x + 1 \\cdot y - 3 = 0$、つまり $a = 0, b = 1, c = -3$：

$$d = \\dfrac{|0 \\cdot 2 + 1 \\cdot 7 - 3|}{\\sqrt{0^2 + 1^2}} = \\dfrac{|4|}{1} = 4$$

ちゃんと一致！直感と公式が同じ答えを出します。

垂直な直線 $x = k$ と点 $(x_0, y_0)$ の距離も同じく $|x_0 - k|$ になります（$a = 1, b = 0$ を代入）。

**整数答えになる組合せ**

この系列では、分母 $\\sqrt{a^2 + b^2}$ が **整数** になる組合せを使いました。これは **ピタゴラス数** の組（直角三角形の3辺が全部整数になる組）と一致します：

| $(a, b)$ | $\\sqrt{a^2 + b^2}$ |
|---|---|
| $(3, 4)$ または $(4, 3)$ | $5$ |
| $(5, 12)$ または $(12, 5)$ | $13$ |
| $(8, 15)$ または $(15, 8)$ | $17$ |
| $(6, 8)$ | $10$ |

これらの組合せを使うと、距離が **整数できれいに確定** することが多くなります。一般の係数だとルートが残ってしまう答えが、ピタゴラスの組では整数に化けます。

**応用：三角形の面積**

3 点 $A, B, C$ で作る三角形の面積は、「**底辺 $\\times$ 高さ $\\div 2$**」で求められます。手順：

1. 底辺を $BC$ とする
2. $BC$ の長さを **2 点間の距離公式** で求める（$\\sqrt{(x_C-x_B)^2 + (y_C-y_B)^2}$）
3. $B$ と $C$ を通る **直線 $BC$ の方程式** を一般形で求める
4. その直線と点 $A$ の **距離** $d$ を、今回の公式で求める——これが「**高さ**」になる
5. 面積 $= \\dfrac{1}{2} \\cdot BC \\cdot d$

3 つの座標だけから、計算で三角形の面積が出ます——これが座標幾何の威力です。

**「図形と方程式」の中心の道具**

点と直線の距離は、座標幾何の **計算道具** として中心的な存在です。これからこの単元では、

- 三角形の面積
- 円と直線の位置関係（接する・交わる・離れる）
- 軌跡の問題（距離が一定の点の集まり）

など、いろいろな応用で「点と直線の距離」の公式が **計算の核** として顔を出します。

**さらに深い理由（あとで戻ってきてもよい話）**

「**なぜ係数 $(a, b)$ が直線の傾きと結びつくのか**」「**なぜ $\\sqrt{a^2+b^2}$ がちょうど正規化の係数になるのか**」を厳密に説明するには、**ベクトル** や **三角関数** の言葉が必要になります。

でも安心してください——その背景がまだなくても、公式そのものは **「式に代入する → 絶対値 → 係数の大きさで割る」** の3ステップで、何度使ってもきれいに距離が出てくる、強力な道具です。`,
};

export const ADVANCED_SERIES_LIST: LearnerSeries[] = [
  ADV_QUAD_MIN_SERIES,
  ADV_QUAD_GRAPH_SERIES,
  ADV_LINE_EQUATION_SERIES,
  ADV_POINT_LINE_DISTANCE_SERIES,
];
