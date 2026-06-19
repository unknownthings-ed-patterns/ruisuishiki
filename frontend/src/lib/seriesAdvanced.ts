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
  derivation: `**放物線という「お椀」の底——その高さが最小値。**

$f(x) = x^2 + bx + c$ をグラフに描くと、口が上向きに開いた **お椀のような曲線**（数学では「**下に凸（とつ）な放物線**」）になります。

<<PARABOLA_UP>>

このお椀の **底の高さ（$y$ 座標）** が、$f(x)$ の **最小値**。

「**お椀の底を、式から直接読み取れるようにしたい**」——これがこの単元の核となる問いです。

**式の形を変えれば、底が見える**

もし式が次のような形だったら、話はすぐ済みます：

$$f(x) = (x - p)^2 + q$$

$(x - p)^2$ は 2 乗だから、$x$ がどんな数でも **必ず $0$ 以上**。だから $f(x)$ は **必ず $q$ 以上**。そして $(x - p)^2 = 0$（つまり $x = p$）のとき、いちばん小さい値 $q$ になります。

**底の $y$ 座標 $= q$**——式を見るだけで答えが見える形です。

だから、私たちの $x^2 + bx + c$ を、この $(x - p)^2 + q$ の形に **書き直したい**。この書き直しを **平方完成** と呼びます。

**「平方を完成させる」とは、文字通り正方形を完成させること**

なぜ「平方を完成させる」と呼ぶのか？図で見ると一発で分かります。

<<COMPLETE_SQUARE>>

$x^2 + bx$ という式を、$x \\times x$ の **正方形** と、$x \\times b$ の **長方形** と思って描いてみます。長方形 $bx$ を **半分に切って 2 つの $x \\times (b/2)$ の長方形** にして、正方形の隣に貼り付けると——L 字形の図形になり、右下に **$(b/2) \\times (b/2)$ の正方形 1 つぶんの隙間** が残ります。

その隙間を埋めれば、辺の長さが $x + (b/2)$ の **大きな正方形** が完成する——これが「**平方完成**」という名前の由来です。

式で書くと、隙間ぶん $(b/2)^2$ を **加えて、すぐ引き戻す**：

$$x^2 + bx = \\underbrace{\\left(x + \\dfrac{b}{2}\\right)^2}_{\\text{完成した正方形}} - \\underbrace{\\left(\\dfrac{b}{2}\\right)^2}_{\\text{補ったぶんを引く}}$$

**核心の手順**

$f(x) = x^2 + bx + c$ を平方完成すると：

$$f(x) = \\left(x + \\dfrac{b}{2}\\right)^2 - \\dfrac{b^2}{4} + c = \\left(x + \\dfrac{b}{2}\\right)^2 + \\left(c - \\dfrac{b^2}{4}\\right)$$

**底の高さを読む**

$(x + b/2)^2$ はどんな $x$ でも $0$ 以上。最小はちょうど $0$ になるとき——つまり $x = -b/2$ のとき。そのときの $f(x)$ の値は、後ろの「残り」だけ：

$$\\min f(x) = c - \\dfrac{b^2}{4}$$

これが、**下に凸な放物線の底の高さ = 最小値**。

**Step 1〜9：同じ手を 9 回くり返す**

この系列の Step 1〜9 では、$x^2 + bx + c$ の $b$ と $c$ を変えながら、毎回 $c - b^2/4$ を計算しました。「**底の高さ $= c - b^2/4$**」——この公式に手が馴染んでくる繰り返しです。

ちなみに、この系列の $b$ は **すべて偶数** にしてあります。$b$ が偶数だと $b^2/4$ がきれいに割り切れて、答えが整数になるから——奇数だと分数の答えが出てしまって、計算の手応えがぼやけてしまうので、慣れる前は偶数で揃えるのがしかけです。

**Step 10：変数の記号を変えてみる——質を変える**

Step 10 だけ、変数が $x$ から $y$ に、関数名が $f$ から $g$ になっています：

$$g(y) = y^2 - 10y + 28$$

でも **仕組みはまったく同じ**。$y^2 + by + c$ の形なら、最小値は $c - b^2/4 = 28 - 25 = 3$。

**式の中身（変数の名前）にとらわれず、構造を見る**——これが数学の見方の一段深いところ。「$x$ の話」から「式の構造の話」へ視点が上がる瞬間です。

────────

**もっと深く** — 平方完成は同じ手口で、別の場所でも効く

**1 つの平方完成で、グラフの 3 つの読みどころ**

平方完成した式 $f(x) = (x + b/2)^2 + (c - b^2/4)$ からは、3 つの情報が **一度に** 読み取れます：

- **頂点（お椀の底）**：$\\left(-\\dfrac{b}{2},\\ c - \\dfrac{b^2}{4}\\right)$
- **軸の方程式**（グラフの対称軸）：$x = -\\dfrac{b}{2}$
- **$y$ 切片**：もとの式に $x = 0$ を代入して $c$

今回聞いた「最小値」は、3 つのうち **頂点の $y$ 座標**。平方完成は、放物線の **3 つの読みどころを一気に取り出す** 道具です。

**円の方程式でも、同じ平方完成**

別の単元 [円の方程式] でも、一般形 $x^2 + y^2 + lx + my + n = 0$ を **平方完成** して中心と半径を読み取ります。

**$x$ の項を $(x - a)^2$ に押し込む**——この手口は、放物線でも円でも、まったく同じ。「**ばらけた 2 次の式を、ひとかたまりの 2 乗の形に押し込む**」というのが、平方完成の **考え方の核** です。

これから何度も顔を出します——2 次関数だけでなく、円・楕円・双曲線（**2 次曲線** のすべて）、さらには微分・積分でも。

**実生活で「最小値」が問われる場面**

- **物理：放物線運動**——投げ上げた物の最高点（上向きなら最大値）、落下時刻、衝突エネルギーの最小
- **経済：利益関数**——売値と利益の関係が放物線になるとき、利益が最大／コストが最小になる点を見つける
- **設計：レンズ・橋・パラボラアンテナ**——放物線の特別な反射性質を使う
- **データの当てはめ**（**最小二乗法**）——誤差の 2 乗の和を最小にする直線・曲線を見つける

「2 次関数の最小値」は、**自然と工学のあちこちで顔を出す**、基本中の基本の道具です。`,
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
      figureMarker: "<<PARABOLA_MIN_STEP>>",
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
      figureMarker: "<<PARABOLA_SYMMETRY>>",
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
      figureMarker: "<<PARABOLA_VERTEX_3_5>>",
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
  derivation: `**$x^2 + bx + c$ という 6 文字の式に、グラフ全体の地図が隠れている。**

前の系列で見つけた **平方完成** という道具を使うと、その地図が一度にぱっと開きます。

<<PARABOLA_WITH_LABELS>>

$f(x) = x^2 + bx + c$ を平方完成すると：

$$f(x) = \\left(x + \\dfrac{b}{2}\\right)^2 + \\left(c - \\dfrac{b^2}{4}\\right)$$

この形を眺めると、グラフの **3 つの読みどころ** が一度に見えます：

| 読みたいもの | 答え | どうして？ |
|---|---|---|
| **頂点（お椀の底）** | $\\left(-\\dfrac{b}{2},\\ c - \\dfrac{b^2}{4}\\right)$ | $(x+b/2)^2 = 0$ となる点が底 |
| **軸の方程式**（縦の対称軸） | $x = -\\dfrac{b}{2}$ | 頂点を通る縦の直線 |
| **$y$ 切片**（$y$ 軸との交点） | $c$ | $x = 0$ を代入すれば残るのは $c$ |

**1 つの平方完成で、グラフの「形」も「位置」もすべて確定する**——これが平方完成の本領です。

**Step 1〜3：頂点の $x$ 座標を 3 連発**

最初の 3 問は、同じ $-b/2$ の計算を繰り返しました。$b = 4 \\Rightarrow -2$、$b = -6 \\Rightarrow 3$、$b = 10 \\Rightarrow -5$。**符号に気をつける** だけで答えが出る——手に馴染ませる繰り返しです。

**Step 4〜5：頂点の $y$ 座標——もう一つの読みどころ**

Step 4・5 では、**同じ関数** に対して今度は $y$ 座標を聞きました。同じ平方完成から **別の数** が読める——これは「+α」の変化。新しい計算ではなく、**同じ景色の別の場所** を見ているだけ。

**Step 6：軸の方程式**

軸は **頂点を通る縦の直線**。だから頂点の $x$ 座標 $-b/2$ がそのまま「軸の $x$」になります。Step 1〜3 と答えの導き方は同じだけど、**「軸」という新しい名前** で同じ場所を見ている——もう一段の「+α」。

**Step 7：$y$ 切片**

「$y$ 軸と交わる点の $y$ 座標」は、$x = 0$ を代入した値。$f(0) = 0 + 0 + c = c$——**定数項 $c$ そのもの**。

平方完成しなくても見える、シンプルな読み。でも「3 つの読みどころ」の 1 つとして、ここに並べる意味があります。

**Step 8：別の文字で書かれていても、構造は同じ**

$g(y) = y^2 + 8y + 20$。変数名が違っても、$y^2 + by + c$ の形なら、頂点の $y$ 座標は同じく $c - b^2/4 = 20 - 16 = 4$。

**式の構造を見る——変数名にとらわれない数学の眼差し**。前の系列（最小値）の Step 10 と同じ問いかけです。

**Step 9〜10：逆向きに歩く——頂点から式を作る**

ここが大きな質的変化。問いの向きを **逆** にします：**頂点 $(p, q)$ から、元の式 $x^2 + bx + c$ の $b, c$ を逆算する**。

頂点が $(p, q)$ なら、平方完成された形は：

$$f(x) = (x - p)^2 + q$$

これを展開すると：

$$f(x) = x^2 - 2px + (p^2 + q)$$

つまり：

$$b = -2p, \\quad c = p^2 + q$$

頂点さえ知っていれば、$b$ と $c$ が両方とも逆算できる。**グラフから式が読み取れる** ということです。

**「グラフを読む」とは何か——この系列の景色**

ふつう「グラフを描く」は **式 → 図** の方向ですが、平方完成の力を借りると：

- **式 → 頂点・軸・$y$ 切片**：頭の中にグラフの輪郭が描ける
- **頂点 → 式**：グラフから式を逆算できる

両方向を歩けるようになる——これが、$x^2 + bx + c$ という 6 文字の式に隠されていた、**グラフ全体の地図** です。

**「式とグラフは、同じものの 2 つの顔」**——平方完成は、その 2 つの顔を行き来する翻訳機です。

────────

**もっと深く** — グラフ読み取りの先

**$x^2$ の係数が $1$ でない場合**：$f(x) = ax^2 + bx + c$ なら、頂点の $y$ 座標は

$$c - \\dfrac{b^2}{4a}$$

になり、お椀の **開き具合** も $a$ で決まります（$a > 0$ なら下に凸、$a < 0$ なら上に凸、$|a|$ が大きいほど狭いお椀）。

**$2$ 次方程式の解との関係**：$x^2 + bx + c = 0$ の解は、グラフが $x$ 軸と交わる点の $x$ 座標——**判別式** $b^2 - 4c$ が、頂点の $y$ 座標と直接結びついています（$b^2/4 - c < 0$ なら底が $x$ 軸より上 → 解なし）。

**最大・最小問題への応用**：実生活の最適化問題（利益・面積・速度など）の多くは、$2$ 次関数の最大／最小として定式化されます。平方完成で頂点を読めるなら、それがそのまま答えになる場面が多い。

**微分との出会い**：高校 3 年で出会う **微分** では、$f'(x) = 0$ となる $x$ が極値の候補。$f(x) = x^2 + bx + c$ なら $f'(x) = 2x + b = 0$ より $x = -b/2$——平方完成で見つけた頂点と **完全に一致**。

**$2$ つの違う道具が、同じ答えを返す**——数学の美しい一致のひとつです。`,
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
      figureMarker: "<<TWO_POINTS_LINE>>",
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
      figureMarker: "<<MIDPOINT_STEP7>>",
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
      figureMarker: "<<PERP_STEP9>>",
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
  derivation: `**地図に 2 つの目印があれば、その 2 点を結ぶ「道」がぴったり 1 本に決まる。**

平面上の直線も同じ。**通る 2 点** が決まれば、直線は 1 本に確定します。あるいは **1 点と方向（かたむき）** が分かっても、同じく 1 本に決まります。

「**2 点で決まる**」あるいは「**1 点とかたむきで決まる**」——直線とは、そういう **少ない情報で完全に決まる図形** です。

**直線の方程式の標準形** $y = mx + n$

ここで $m$ が **傾き**、$n$ が **$y$ 切片**（直線が $y$ 軸と交わる点の $y$ 座標）。$x = 0$ を代入すれば $y = n$——式から直接読めます。

**傾きの正体——「$x$ が $1$ 増えたら $y$ がどれだけ増えるか」**

「傾き $m$」って具体的に何でしょう？$y = mx + n$ で $x$ を $1$ 増やすと、$y$ は $m$ 増えます。つまり $m$ は **「$x$ の単位変化 $1$ に対する $y$ の変化量」**。

$2$ 点が分かれば、傾きはこう計算できます：

<<LINE_SLOPE>>

$$m = \\dfrac{y_2 - y_1}{x_2 - x_1} = \\dfrac{y \\text{ の差}}{x \\text{ の差}}$$

「$x$ がいくつ進むあいだに、$y$ がいくつ上がる（下がる）か」という **比** を見ているだけ。

**Step 1〜3：傾きを 3 連発**

最初の $3$ 問は、毎回同じ「$y$ の差 $\\div$ $x$ の差」を計算しました。Step 3 では片方の $y$ が大きい数字から小さい数字へ → **傾きが負** になる、を確かめました。

「直線が右下がりなら傾きが負」——これは式と図の対応の **第 $1$ の翻訳** です。

**Step 4〜5：傾きが分かったら、切片を読む**

傾き $m$ が決まったあと、$y = mx + n$ の $n$（切片）を求めるには、**直線が通る $1$ 点** の座標を代入すればいい。

たとえば点 $(a, b)$ を通るなら：

$$b = ma + n \\quad\\Longrightarrow\\quad n = b - ma$$

「点・傾き・切片」の三角関係——$3$ つのうち $2$ つが決まれば、残りの $1$ つは必ず出ます。

**Step 6：平行な直線——傾きが同じ**

ある直線と **平行** な直線は、**傾きが同じ**。「同じ方向を向いた線」だから、当然といえば当然。

だから「$y = 2x + 7$ と平行で点 $(1, 5)$ を通る直線」を作るには、$m = 2$ を固定して、$5 = 2 \\cdot 1 + n$ から $n = 3$。

**Step 7〜8：中点は『平均』**

線分 $AB$ の中点 $M$ の座標は、**両端の平均**：

$$M = \\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$$

$x$ も $y$ も別々に「真ん中」を取るだけ。これは数直線で「両端の真ん中」を考える発想を、$x$ 軸と $y$ 軸に **独立に** 適用したもの。

**平面の話を、数直線の話 $2$ つに分解する**——これも座標幾何の便利さです。

**Step 9〜10：垂直な直線——傾きの積が $-1$**

ここが質的変化。**$2$ 直線が垂直なら、傾きの積が $-1$**：

$$m \\cdot m' = -1$$

つまり片方の傾きを $m$ とすると、もう片方は $m' = -\\dfrac{1}{m}$。

覚えやすい言葉だと **「片方の傾きを『ひっくり返して符号を変える』」**：

- $m = 2$ → 垂直の傾きは $-\\dfrac{1}{2}$
- $m = -4$ → 垂直の傾きは $\\dfrac{1}{4}$

**整数の傾きでも、垂直な直線の傾きはほとんど分数（小数）になる** ことに注目してください。

**この系列で歩いた『直線の読み方』地図**

| 読み方 | 公式 |
|---|---|
| 2 点から傾き | $m = (y_2 - y_1) / (x_2 - x_1)$ |
| 点と傾きから $y$ 切片 | $n = b - ma$ |
| 平行な直線 | 傾きが同じ |
| 線分の中点 | 両端の平均 |
| 垂直な直線 | $m \\cdot m' = -1$ |

直線の方程式は、たった $5$ つの読み方で **「点・傾き・切片・中点・垂直」** の関係を全て記述できます。

**この系列の景色**：$y = mx + n$ という $6$ 文字の式が、平面上で $1$ 本の直線を完全に決める仕組み——これが **「図形と方程式」** という単元の名前の本当の意味です。

────────

**もっと深く** — 直線を表す式のいろいろな顔

**一般形と標準形**：直線は $y = mx + n$ のほかにも、$ax + by + c = 0$ の **一般形** で書けます。これは [点と直線の距離] や [円の方程式] で使った形と同じ。式の見た目が違っても、表しているのは同じ直線です。

**傾きが定義できない直線**：$y$ 軸に平行な直線 $x = k$ は、$x$ の変化が $0$ なので「傾き $=$ $y$ の差 $\\div 0$」となって計算できません。こういう直線は $y = mx + n$ では書けないので、一般形 $x + 0 \\cdot y - k = 0$（$y$ の係数 $0$）で書きます。

**$3$ 点が一直線上にあるか**：$3$ 点 $A, B, C$ が一直線上にあるかは、「$AB$ の傾きと $AC$ の傾きが等しいか」で判定できます。**目で確かめなくても、座標から計算で出る**——これが座標幾何の力。

**直線と直線の交点**：$2$ 本の直線の方程式を **連立** して解けば、交点の座標が出ます。$2$ 直線が平行（傾きが同じ）だと連立に解がなく、垂直なら必ず $1$ 点で交わる。

**ベクトルと直線**：方向（傾き）の話を **ベクトル** で書き直すと、$3$ 次元の空間にもそのまま拡張できます。「方向ベクトル」と「通る点」で直線が決まる——形は変わっても、考え方の核は同じ **「$1$ 点と $1$ 方向で道が決まる」** です。`,
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
      figureMarker: "<<LINE_DIST_STEP1>>",
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
      figureMarker: "<<TRIANGLE_AREA_DIST>>",
    },
  ],
  derivation: `**野原に立っているとき、目の前の道までの距離はどう測る？**

道にまっすぐ垂直に降りて、いちばん近づける場所まで。その長さが **点と直線の距離** です。

<<POINT_LINE_DIST>>

平面上に点 $A(x_0, y_0)$ と直線 $\\ell$ があるとき、$A$ から $\\ell$ に **垂直に降ろした線分の長さ** が、$A$ と $\\ell$ の距離 $d$。

「**最短距離**」と言ってもいい——$A$ から $\\ell$ 上のどの点に行くにも、垂直に降ろした足までが一番近い道です。

**強力な公式——3 ステップで距離が出る**

直線が $ax + by + c = 0$ という形（**一般形**）で、点が $(x_0, y_0)$ のとき：

$$d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$$

「**点の座標を直線の式の左辺に代入する → 絶対値を取る → $\\sqrt{a^2+b^2}$ で割る**」。

たった 3 ステップで距離が出ます。**垂線の足 $H$ の座標を計算しなくていい**——これがこの公式のすばらしさです。

**なぜこの公式が効くのか——考え方の核**

公式は「**分子 $\\div$ 分母**」の形。それぞれが意味を持っています。**分子は「ずれ」、分母は「測り方の補正」**——この 2 つが組になって、はじめて正しい距離が出てきます。

**分子 $|ax_0 + by_0 + c|$ は「直線からのずれ」**

直線 $ax + by + c = 0$ とは、「$(x, y)$ を式に代入したとき、結果が $0$ になる点の集まり」のこと。

点 $(x_0, y_0)$ を式の左辺に代入してみます：

- 結果が **$0$** なら、点は **直線上にある**（距離 $0$）
- 結果が $0$ でないなら、**直線からどれだけずれているか** が、その値の大きさに現れる

<<POINT_LINE_DEVIATION>>

図の例で、直線 $\\ell: x + 2y - 10 = 0$ に対して：

- $P_1 (2, 4)$：式に代入すると $2 + 8 - 10 = 0$ → 直線上
- $P_2 (4, 6)$：式に代入すると $4 + 12 - 10 = +6$ → 直線の上側にずれている
- $P_3 (2, 2)$：式に代入すると $2 + 4 - 10 = -4$ → 直線の下側にずれている

「**式に代入した結果の大きさ**」が、点と直線の **ずれ具合** を表しています。$P_2$ の方が $P_3$ より絶対値が大きいので、$P_2$ の方が直線から遠い。絶対値 $|\\cdot|$ は「ずれは符号によらず正の量で測る」というだけのこと。

**分母 $\\sqrt{a^2+b^2}$ は「測り方の補正（正規化）」**

ここがこの公式の面白いところです。実は、直線 $ax + by + c = 0$ の両辺を $2$ 倍して $2ax + 2by + 2c = 0$ と書いても、**表している直線は同じ**——線の場所は変わらず、式の見た目だけが変わる。

でも、もし分子だけ使って $|2a x_0 + 2b y_0 + 2c|$ を計算したら、結果は **$2$ 倍** になってしまう。「直線の書き方の違い」で距離が変わってしまうのはおかしい。距離は **線の場所だけで決まる、書き方によらない量** のはずだから。

これを直すのが **正規化**：係数の大きさ $\\sqrt{a^2+b^2}$ で割って、書き方の影響を打ち消す。両辺を $2$ 倍した式で確かめてみると：

$$\\dfrac{|2a x_0 + 2b y_0 + 2c|}{\\sqrt{(2a)^2 + (2b)^2}} = \\dfrac{2 \\cdot |ax_0+by_0+c|}{2 \\cdot \\sqrt{a^2+b^2}} = \\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$$

ちゃんと **同じ値** が出る。「**直線をどう書いても、距離は同じ**」を保証しているのが、分母の役目です。

**この公式の「考え方」をまとめると**：分子で「ずれ」を測り、分母で「式の書き方の影響」を打ち消す。両方が揃って、はじめて正しい距離になる——これが釣り方そのもの。

**8 問同じ計算を繰り返したら見えてくる——ピタゴラス数の魔法**

Step 1〜8 では、同じ公式を **8 回繰り返し** ました。気づきましたか？毎回、距離が **きれいな整数** で出てきます。これ、偶然ではありません。

出題の係数 $(a, b)$ を [ピタゴラス数] の組（直角三角形の 3 辺がすべて整数になる組）から選んでいるからです：

| $(a, b)$ | $\\sqrt{a^2 + b^2}$ |
|---|---|
| $(3, 4)$ や $(4, 3)$ | $5$ |
| $(5, 12)$ や $(12, 5)$ | $13$ |
| $(8, 15)$ や $(15, 8)$ | $17$ |
| $(6, 8)$ | $10$ |

これらの組では **分母にルートが残らない**——だから答えがきれいな整数になる。本来の問題では分母にルートが残るのが普通ですが、まず **公式そのものに慣れる** ためにピタゴラス数を選んだのが、この系列の出題のしかけです。

**Step 9：水平な直線で確かめる——直感と公式は一致するか？**

ここで一段、問いの質を変えます。水平な直線 $y = 3$ と点 $(2, 7)$ の距離は、直感的には **$y$ 座標の差**、つまり $|7 - 3| = 4$ のはず。

公式で確かめましょう。$y = 3$ を一般形で書くと $0 \\cdot x + 1 \\cdot y - 3 = 0$ ——つまり $a = 0, b = 1, c = -3$：

$$d = \\dfrac{|0 \\cdot 2 + 1 \\cdot 7 - 3|}{\\sqrt{0^2 + 1^2}} = \\dfrac{|4|}{1} = 4$$

ちゃんと一致！垂直な直線 $x = k$ と点の距離も同じく $|x_0 - k|$（$a = 1, b = 0$ を代入）。

**特別な場合も、一般の公式の中に含まれている**——これは公式が「正しく作られている」ことの確認でもあります。

**Step 10：応用——3 つの点だけから、三角形の面積が出る**

問いの質をもう一段変えます。**「3 つの座標だけから、三角形の面積を計算で出す」**——できるでしょうか？

<<TRIANGLE_AREA_DIST>>

3 点 $A(0, 0), B(4, 0), C(0, 3)$ の三角形の面積を、「**底辺 $\\times$ 高さ $\\div 2$**」で求める手順：

1. **底辺 $BC$** の長さは $\\sqrt{4^2 + 3^2} = 5$（2 点間の距離公式から）
2. **直線 $BC$ の方程式** は $3x + 4y - 12 = 0$（一般形に直す）
3. その直線と **点 $A$ の距離** が、そのまま **高さ** $d$：

$$d = \\dfrac{|3 \\cdot 0 + 4 \\cdot 0 - 12|}{\\sqrt{9 + 16}} = \\dfrac{12}{5}$$

4. 面積 $= \\dfrac{1}{2} \\cdot BC \\cdot d = \\dfrac{1}{2} \\cdot 5 \\cdot \\dfrac{12}{5} = 6$

座標 3 つから、計算だけで面積が出てくる——これが **座標幾何の威力**。点と直線の距離は、ここでは「**高さ**」の役を演じています。

────────

**もっと深く** — この公式が住む広い景色

「点と直線の距離」は、**「図形と方程式」の中心の道具** です。これからこの単元では：

- **円と直線の位置関係**——直線が円の中心からどれだけ離れているかで、接する／交わる／離れる が決まる
- **軌跡の問題**——「距離が一定の点の集まり」（円、放物線など）を式で表す
- **任意の三角形の面積**——上で見たやり方を一般化

どの場面でも、この公式が **計算の核** として顔を出します。

**さらに深い理由**（あとで戻ってきてもよい話）

「**なぜ係数 $(a, b)$ が直線の傾きと結びつくのか**」「**なぜ $\\sqrt{a^2+b^2}$ がちょうど正規化の係数になるのか**」を厳密に説明するには、[ベクトル] や [三角関数] の言葉が必要になります（高校でこれから出会う道具）。

でも安心してください——その背景がまだなくても、公式は **「式に代入する → 絶対値 → 係数の大きさで割る」** の 3 ステップで、何度使ってもきれいに距離が出てくる、強力な道具です。考え方の核（**分子で「ずれ」、分母で「補正」**）を握っておけば、あとから背景の理屈が降ってきても、すんなり受け取れます。`,
};

/* ===== CR1: 円の方程式（標準形・一般形・直径両端・平方完成） ===== */
export const ADV_CIRCLE_EQUATION_SERIES: LearnerSeries = {
  id: "adv_circle_equation_01",
  title: "★ 円の方程式",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 標準形 $(x-a)^2+(y-b)^2=r^2$ と一般形、平方完成を10問。",
  patternId: "CR1",
  unit: "advanced",
  revelationLabel: "(x − a)² + (y − b)² = r²",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "原点を中心とする半径 $3$ の円の方程式 $x^2 + y^2 = N$ の $N$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "$N$（右辺）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "円とは「中心からの距離が等しい点の集まり」。距離 $=$ 半径 $r$。",
        },
        {
          layer: 2,
          text: "ピタゴラスから $\\sqrt{x^2 + y^2} = 3$。両辺を 2 乗すると $x^2 + y^2 = 9$。",
        },
        { layer: 3, text: "$N = 9$。" },
      ],
      formulaPreview: "x² + y² = 9",
      figureMarker: "<<CIRCLE_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "原点を中心とする半径 $5$ の円の方程式 $x^2 + y^2 = N$ の $N$ はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "$N$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ形。半径だけ変わった。" },
        { layer: 2, text: "$5^2 = 25$。" },
        { layer: 3, text: "$N = 25$。" },
      ],
      formulaPreview: "x² + y² = 25",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "中心 $(2, 0)$、半径 $3$ の円の方程式 $(x-2)^2 + y^2 = N$ の $N$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "$N$",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "中心が動いた → $x$ が「中心からのずれ」になる $(x - a)$。",
        },
        { layer: 2, text: "$\\sqrt{(x-2)^2 + y^2} = 3$ → 両辺 2 乗で $9$。" },
        { layer: 3, text: "$N = 9$。" },
      ],
      formulaPreview: "(x-2)² + y² = 9",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "中心 $(1, -2)$、半径 $4$ の円の方程式 $(x-1)^2 + (y+2)^2 = N$ の $N$ はいくつでしょう？",
      answer: 16,
      unit: "",
      unknownLabel: "$N$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "中心の $y$ 座標が負 → $(y - (-2))^2 = (y + 2)^2$。",
        },
        { layer: 2, text: "半径 $4$ → $N = 4^2 = 16$。" },
        { layer: 3, text: "$N = 16$。" },
      ],
      formulaPreview: "(x-1)² + (y+2)² = 16",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "中心 $(-3, 5)$、半径 $\\sqrt{10}$ の円の方程式 $(x+3)^2 + (y-5)^2 = N$ の $N$ はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "$N$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "半径が $\\sqrt{10}$ → 右辺は $(\\sqrt{10})^2 = 10$。",
        },
        {
          layer: 2,
          text: "中心 $(-3, 5)$ → $(x - (-3))^2 + (y - 5)^2 = (x+3)^2 + (y-5)^2$。",
        },
        { layer: 3, text: "$N = 10$。" },
      ],
      formulaPreview: "(x+3)² + (y-5)² = 10",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "2 点 $A(1, 2)$, $B(7, 10)$ を直径の両端とする円の半径はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "半径",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "直径の両端が分かれば、中心 $=$ 中点、半径 $=$ 直径 $\\div 2$。",
        },
        {
          layer: 2,
          text: "$AB = \\sqrt{(7-1)^2 + (10-2)^2} = \\sqrt{36+64} = 10$。",
        },
        { layer: 3, text: "半径 $= \\dfrac{AB}{2} = 5$。" },
      ],
      formulaPreview: "AB = 10, r = 5",
      figureMarker: "<<CIRCLE_STEP6>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "方程式 $x^2 + y^2 - 4x + 6y - 12 = 0$ で表される円の半径はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "半径",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "一般形 → 平方完成 → 標準形にすると、中心と半径が現れる。",
        },
        {
          layer: 2,
          text: "$x^2 - 4x = (x-2)^2 - 4$、$y^2 + 6y = (y+3)^2 - 9$。",
        },
        { layer: 3, text: "$(x-2)^2 + (y+3)^2 = 25$ → 半径 $\\sqrt{25} = 5$。" },
      ],
      formulaPreview: "(x-2)²+(y+3)² = 25, r=5",
      figureMarker: "<<CIRCLE_STEP7>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "方程式 $x^2 + y^2 - 6x + 8y + 9 = 0$ で表される円の半径はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "半径",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前と同じ。平方完成で標準形に。" },
        {
          layer: 2,
          text: "$(x-3)^2 - 9 + (y+4)^2 - 16 + 9 = 0$ → $(x-3)^2 + (y+4)^2 = 16$。",
        },
        { layer: 3, text: "半径 $= \\sqrt{16} = 4$。" },
      ],
      formulaPreview: "(x-3)²+(y+4)² = 16, r=4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "方程式 $x^2 + y^2 + 4x - 2y - 4 = 0$ で表される円の中心の $x$ 座標はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "中心の $x$ 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "平方完成 → 標準形 $(x-a)^2 + (y-b)^2 = r^2$ の $a$ が答え。",
        },
        {
          layer: 2,
          text: "$(x+2)^2 - 4 + (y-1)^2 - 1 - 4 = 0$ → $(x+2)^2 + (y-1)^2 = 9$。",
        },
        { layer: 3, text: "中心 $(-2, 1)$ → $x$ 座標 $= -2$。" },
      ],
      formulaPreview: "中心 (-2, 1)",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "方程式 $x^2 + y^2 - 4x + 2y + 1 = 0$ で表される円の半径はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "半径",
      variationFromPrevious: "same",
      compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "ここまでと同じやり方。平方完成。" },
        {
          layer: 2,
          text: "$(x-2)^2 - 4 + (y+1)^2 - 1 + 1 = 0$ → $(x-2)^2 + (y+1)^2 = 4$。",
        },
        { layer: 3, text: "半径 $= \\sqrt{4} = 2$。" },
      ],
      formulaPreview: "(x-2)²+(y+1)² = 4, r=2",
    },
  ],
  derivation: `**杭にロープを結びつけて、ぐるりと回ったときに先がえがく曲線——それが円。**

野原に杭を打って、ロープの端を結びつけてピンと張ったまま回ってみます。ロープの先がえがく曲線が **円**。

「**中心から決まった距離（半径）にある点の集まり**」——これが円の正体です。

<<CIRCLE_AROUND_ORIGIN>>

平面の上に置いて、座標で表してみましょう。**原点中心、半径 $r$** の円から始めます。

円の上の点 $P(x, y)$ をどこに取っても、$P$ から原点 $O$ までの距離は必ず $r$ になっているはず。前の単元のピタゴラスの定理から：

$$OP = \\sqrt{x^2 + y^2} = r$$

両辺を 2 乗してルートを外すと：

$$x^2 + y^2 = r^2$$

これが **原点中心の円の方程式**。

**「中心からの距離 $=$ 半径」を式にしただけ**——この一言が、この式の意味の核です。

**中心を動かしてみる——標準形**

中心が原点でなく、点 $A(a, b)$ にあるとどうなるか？

<<CIRCLE_AROUND_CENTER>>

考え方は同じ：円の上の点 $P(x, y)$ は、**中心 $A$ から距離 $r$**。中心 $A(a, b)$ から $P(x, y)$ までの距離は、$2$ 点間の距離公式から：

$$AP = \\sqrt{(x - a)^2 + (y - b)^2} = r$$

両辺を 2 乗：

$$(x - a)^2 + (y - b)^2 = r^2$$

これが **円の方程式の標準形**。

**中心 $(a, b)$ と半径 $r$ が、式の中にそのまま顔を出している**——これが標準形の便利さです。式を見るだけで、中心と半径がすぐ読み取れる。

**Step 1〜5：標準形を作る練習**

最初の $5$ 問は、与えられた中心と半径から **標準形を書く** 練習でした。気をつけるポイントだけ：

- 中心 $(a, b)$ の符号——たとえば $b = -2$ なら $(y - (-2))^2 = (y + 2)^2$
- 半径は 2 乗する——半径 $\\sqrt{10}$ なら $r^2 = 10$

**Step 6：直径の両端から——問いの質を変える**

ここで問いの形を変えます。「**$2$ 点 $A, B$ を直径の両端とする円**」が与えられたとき、円は決まるでしょうか？

<<DIAMETER_CIRCLE>>

決まります。直径の両端 $A, B$ が分かれば：

- **中心** $=$ $AB$ の **中点** $M$
- **半径** $=$ 直径 $AB$ の **半分**

たとえば $A(1, 2), B(7, 10)$ なら：

- $M = \\left(\\dfrac{1+7}{2}, \\dfrac{2+10}{2}\\right) = (4, 6)$（中心）
- $AB = \\sqrt{(7-1)^2 + (10-2)^2} = \\sqrt{100} = 10$
- 半径 $= 10 \\div 2 = 5$

中心 $(4, 6)$、半径 $5$ → 方程式は $(x-4)^2 + (y-6)^2 = 25$。

**「中心と半径」が直接与えられなくても、それを取り出せば円は決まる**——これは円の方程式の柔軟さの始まりです。

**標準形を展開してみる——一般形**

標準形 $(x-a)^2 + (y-b)^2 = r^2$ を展開すると：

$$x^2 - 2ax + a^2 + y^2 - 2by + b^2 - r^2 = 0$$

整理して、$-2a, -2b, a^2 + b^2 - r^2$ という定数が並ぶと、次の形になります：

$$x^2 + y^2 + lx + my + n = 0$$

これが **一般形**。標準形と一般形は、**同じ円を書き方を変えただけ** の関係です。

**Step 7〜10：一般形から中心と半径を取り出す——平方完成**

問題が「一般形」で与えられたら、中心と半径を読むには **標準形に戻す** 必要があります。その道具が **平方完成**。

たとえば $x^2 + y^2 - 4x + 6y - 12 = 0$ を平方完成すると：

$$x^2 - 4x = (x - 2)^2 - 4$$
$$y^2 + 6y = (y + 3)^2 - 9$$

元の式に代入して整理：

$$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0$$
$$(x - 2)^2 + (y + 3)^2 = 25$$

中心 $(2, -3)$、半径 $5$ が読み取れます。

**平方完成の考え方の核**：$x$ の項と $y$ の項を **「ひとかたまりの 2 乗」に押し込む**。$x^2 - 4x$ には $4$ を足せば $(x-2)^2$ になる（足した分は引いておく）、というシンプルな操作の繰り返し。

**この系列が見せてくれた「考え方の核」**

円の方程式は、結局すべて **「中心からの距離 $=$ 半径」を式にしただけ**。書き方が標準形か一般形かによらず、根っこは同じ。だから：

- 中心と半径が分かれば → 標準形がすぐ書ける
- 直径の両端のような変則的な情報でも → 中心と半径を取り出してから書く
- 一般形が与えられたら → 平方完成で標準形に戻して中心と半径を読む

**問いの質を変えても、釣り方は同じ**——「中心と半径を見つけにいく」。これがこの単元の景色です。

────────

**もっと深く** — 円の方程式が住む広い景色

**円と直線の位置関係**：前の単元で学んだ [点と直線の距離] の公式が、ここで効きます。

直線と円の中心の距離 $d$ と、円の半径 $r$ を比べると：

- $d < r$：直線が円の内部を通る → **$2$ 点で交わる**
- $d = r$：直線が円に **接する**（$1$ 点）
- $d > r$：直線は円から離れている（**共有点なし**）

「距離を計算するだけで、図形どうしの位置関係が分かる」——これが座標幾何の威力です。

**軌跡としての円**：「ある条件を満たす点の集まり」を求めると、円が出てくる場面がたくさんあります：

- ある $2$ 点からの距離の比が一定 → 円（**アポロニウスの円**）
- ある $2$ 点を見込む角が一定 → 円弧

**$3$ 次元への一般化**：空間で「中心からの距離が一定の点の集まり」は **球**。式の形は：

$$(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$$

ピタゴラスが $3$ 次元に拡張されたのと同じ拡張です。

**さらに深い理由**：円・楕円・放物線・双曲線をまとめて **$2$ 次曲線** といって、これらの方程式は一般に

$$Ax^2 + By^2 + Cxy + Dx + Ey + F = 0$$

の形を持ちます。$C = 0$ で $A = B$ なら円。**係数の組合せが、図形の種類を決める** ——これは座標幾何の大きなテーマです。`,
};

/* ===== NL1: 数直線上の点（距離・中点・内分・外分） ===== */
export const ADV_NUMBER_LINE_SERIES: LearnerSeries = {
  id: "adv_number_line_01",
  title: "★ 数直線上の点",
  subtitle: "数Ⅱ・B「図形と方程式」の入口 — 距離・中点・内分・外分を 10 問。",
  patternId: "NL1",
  unit: "advanced",
  revelationLabel: "内分 = 重み付き平均、外分は n を −n に置き換える",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "数直線上の 2 点 $A(2)$, $B(8)$ の距離はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "距離 AB",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "数直線上の距離 $= |x_2 - x_1|$。座標の差の絶対値。" },
        { layer: 2, text: "$|8 - 2| = |6|$。" },
        { layer: 3, text: "$6$。" },
      ],
      formulaPreview: "|8 − 2| = 6",
      figureMarker: "<<NUMLINE_DIST_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText: "数直線上の 2 点 $A(-3)$, $B(5)$ の距離はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "距離 AB",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。$|x_2 - x_1|$。負の数の差に注意。" },
        { layer: 2, text: "$|5 - (-3)| = |8|$。" },
        { layer: 3, text: "$8$。" },
      ],
      formulaPreview: "|5 − (−3)| = 8",
    },
    {
      id: "step3",
      position: 3,
      questionText: "数直線上の 2 点 $A(2)$, $B(8)$ の中点の座標はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "中点の座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "中点 $= \\dfrac{x_1 + x_2}{2}$（2 つの座標の平均）。" },
        { layer: 2, text: "$\\dfrac{2 + 8}{2} = \\dfrac{10}{2}$。" },
        { layer: 3, text: "$5$。" },
      ],
      formulaPreview: "(2+8)/2 = 5",
    },
    {
      id: "step4",
      position: 4,
      questionText: "数直線上の 2 点 $A(-3)$, $B(7)$ の中点の座標はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "中点の座標",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "2 つの座標の平均。" },
        { layer: 2, text: "$\\dfrac{-3 + 7}{2} = \\dfrac{4}{2}$。" },
        { layer: 3, text: "$2$。" },
      ],
      formulaPreview: "(−3+7)/2 = 2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "数直線上の 2 点 $A(3)$, $B(7)$ を $1 : 1$ に内分する点の座標はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "内分点の座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "$m:n$ に内分する点 $= \\dfrac{n x_1 + m x_2}{m + n}$。クロスして掛けて足す。",
        },
        {
          layer: 2,
          text: "$\\dfrac{1 \\cdot 3 + 1 \\cdot 7}{1 + 1} = \\dfrac{10}{2}$。",
        },
        { layer: 3, text: "$5$（$1:1$ の内分は中点と同じ）。" },
      ],
      formulaPreview: "(3+7)/2 = 5",
      figureMarker: "<<NUMLINE_INTERNAL>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "数直線上の 2 点 $A(2)$, $B(7)$ を $2 : 3$ に内分する点の座標はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "内分点の座標",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "$\\dfrac{n x_1 + m x_2}{m + n}$、$m = 2, n = 3$。" },
        {
          layer: 2,
          text:
            "$\\dfrac{3 \\cdot 2 + 2 \\cdot 7}{2 + 3} = \\dfrac{6 + 14}{5} = \\dfrac{20}{5}$。",
        },
        { layer: 3, text: "$4$。" },
      ],
      formulaPreview: "(3·2+2·7)/5 = 4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "数直線上の 2 点 $A(1)$, $B(11)$ を $2 : 3$ に内分する点の座標はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "内分点の座標",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前と同じ手順。" },
        {
          layer: 2,
          text:
            "$\\dfrac{3 \\cdot 1 + 2 \\cdot 11}{2 + 3} = \\dfrac{3 + 22}{5} = \\dfrac{25}{5}$。",
        },
        { layer: 3, text: "$5$。" },
      ],
      formulaPreview: "(3·1+2·11)/5 = 5",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "数直線上の 2 点 $A(-3)$, $B(11)$ を $3 : 4$ に内分する点の座標はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "内分点の座標",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "$m = 3, n = 4$。" },
        {
          layer: 2,
          text:
            "$\\dfrac{4 \\cdot (-3) + 3 \\cdot 11}{3 + 4} = \\dfrac{-12 + 33}{7} = \\dfrac{21}{7}$。",
        },
        { layer: 3, text: "$3$。" },
      ],
      formulaPreview: "(4·(−3)+3·11)/7 = 3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "数直線上の 2 点 $A(2)$, $B(8)$ を $3 : 1$ に外分する点の座標はいくつでしょう？",
      answer: 11,
      unit: "",
      unknownLabel: "外分点の座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "外分の公式 $= \\dfrac{-n x_1 + m x_2}{m - n}$。内分の公式の $n$ を $-n$ に置き換える。",
        },
        {
          layer: 2,
          text:
            "$\\dfrac{-1 \\cdot 2 + 3 \\cdot 8}{3 - 1} = \\dfrac{-2 + 24}{2} = \\dfrac{22}{2}$。",
        },
        { layer: 3, text: "$11$。" },
      ],
      formulaPreview: "(−1·2+3·8)/2 = 11",
      figureMarker: "<<NUMLINE_EXT_STEP9>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "数直線上の 2 点 $A(0)$, $B(10)$ を $5 : 3$ に外分する点の座標はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "外分点の座標",
      variationFromPrevious: "same",
      compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "外分の公式。$m = 5, n = 3$。" },
        {
          layer: 2,
          text:
            "$\\dfrac{-3 \\cdot 0 + 5 \\cdot 10}{5 - 3} = \\dfrac{0 + 50}{2} = \\dfrac{50}{2}$。",
        },
        { layer: 3, text: "$25$（B より遠く右側）。" },
      ],
      formulaPreview: "(−3·0+5·10)/2 = 25",
    },
  ],
  derivation: `**直線の上の点は、たった 1 つの座標で居場所が決まる。**

数直線——それは「数を並べて作った線」。直線の上の点の位置は、その点の **座標 $x$ という 1 つの数** で完全に決まります。

この単純さの上に、図形と方程式という大きな単元のすべてが乗っています。今回は、**$2$ 点について「距離」「真ん中」「分ける」の 3 種類の問いに、すべて計算だけで答えを出す** ——その入口です。

**1. 2 点の距離——座標の差の絶対値**

<<NUMLINE_DIST>>

数直線上に 2 点 $A(x_1)$, $B(x_2)$ があるとき、AB の距離は：

$$AB = |x_2 - x_1|$$

「**座標の差の絶対値**」。なぜ絶対値が要るか——$x_2 < x_1$ の場合（$B$ が $A$ より左にある場合）でも、距離は **正の量** で表したいから。「向き」の情報を捨て、「長さ」だけを取り出す道具が絶対値です。

例：$A(2), B(8)$ なら $|8 - 2| = 6$。$A(5), B(-3)$ なら $|-3 - 5| = 8$。

**2. 中点——2 つの座標の平均**

<<NUMLINE_MID>>

「中点」は、$A$ と $B$ の **ちょうど真ん中** の点。これは **$2$ つの座標の平均** で出ます：

$$\\text{中点} = \\dfrac{x_1 + x_2}{2}$$

例：$A(3), B(7)$ なら $(3+7)/2 = 5$。

シンプルな式ですが、これは「**真ん中＝平均**」という $1$ つの直感を式にしただけ。次の内分・外分は、この「平均」の発想を一段広げたものです。

**3. 内分——「重み付きの平均」**

中点は「ちょうど真ん中」。じゃあ「$A$ から $2$ ぶん、$B$ から $3$ ぶんの距離で分ける点は？」——これが **内分** の問い。

<<NUMLINE_INTERNAL>>

線分 $AB$ を **$m : n$ に内分する** 点 $P$ とは、$AP : PB = m : n$ となる点のこと。式は：

$$x_P = \\dfrac{n x_1 + m x_2}{m + n}$$

**覚え方の核**：$A$ の座標 $x_1$ に $n$（**反対側**の比）を掛け、$B$ の座標 $x_2$ に $m$（反対側の比）を掛け、合計を $(m+n)$ で割る——「**クロスして掛けて足す**」。

**なぜクロスするのか**：$m : n$ に分けると、$P$ は $B$ の方に **$m/(m+n)$** だけ寄っています。だから $B$ の重みは $m/(m+n)$、$A$ の重みは $n/(m+n)$——**遠い方の比が、その点の重みになる**。

これは「**重み付き平均**」そのもの。中点は $m = n = 1$ の特殊な場合：

$$\\dfrac{1 \\cdot x_1 + 1 \\cdot x_2}{1 + 1} = \\dfrac{x_1 + x_2}{2}$$

——中点の公式が内分の公式から自然に出てきます。

**4. 外分——線分の外で分ける**

ここで一段、概念を広げます。**外分** は、AB を「同じ比」で分けるけれど、点 $P$ が **線分の外側** にあるケース。

<<NUMLINE_EXTERNAL>>

線分 $AB$ を **$m : n$ に外分する** 点 $P$ とは、$P$ が線分 $AB$ の外にあって、$AP : BP = m : n$ となる点。式は：

$$x_P = \\dfrac{-n x_1 + m x_2}{m - n}$$

**覚え方の核**：これは **内分の公式の $n$ を $-n$ に置き換えただけ**。内分と外分で別々の公式を覚える必要がない——$1$ つの公式の中で、符号を変えるだけ。

**$m - n$（分母）の意味**：$m = n$ だと分母が $0$ になって計算できない。これは「$1:1$ で外分する点は存在しない」（無限遠にあるとも言える）ことを表しています。

────────

**もっと深く** — 内分と外分の統一視点

内分も外分も、**$P$ の座標を「$A$ と $B$ の加重平均」として表す** 視点で統一できます：

- 内分 ($m:n$)：$A$ の重み $\\dfrac{n}{m+n}$、$B$ の重み $\\dfrac{m}{m+n}$、合計 $1$
- 外分 ($m:n$)：$A$ の重み $\\dfrac{-n}{m-n}$、$B$ の重み $\\dfrac{m}{m-n}$、合計 $1$

**外分では片方の重みが負になり、合計はまだ $1$**——これが「線分の外」を意味します。重みが負になる、という感覚が外分の本質。

**$2$ 次元への自然な拡張**

平面上の 2 点 $A(x_1, y_1)$, $B(x_2, y_2)$ でも、内分・外分の公式は **$x$ と $y$ それぞれに独立に同じ形** で適用できます：

$$x_P = \\dfrac{n x_1 + m x_2}{m + n}, \\quad y_P = \\dfrac{n y_1 + m y_2}{m + n}$$

**平面の話を、数直線の話 $2$ つに分解できる**——これも座標幾何の便利さです。次の単元「平面上の点」では、この拡張がそのまま使えます。

**応用：三角形の重心**

三角形の **重心**（$3$ つの中線が交わる点）は、$3$ つの頂点の **平均**：

$$\\text{重心} = \\left(\\dfrac{x_1 + x_2 + x_3}{3},\\ \\dfrac{y_1 + y_2 + y_3}{3}\\right)$$

これも「平均」の発想の延長。$3$ 点に重み $1:1:1$ をつけた重心が、$3$ 中線の交点になる。中点・内分・重心はすべて、**「重み付き平均」という $1$ つの考え方** の家族です。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 単元構成（距離・中点・内分・外分）を参考。問題の値はオリジナル。`,
};

export const ADVANCED_SERIES_LIST: LearnerSeries[] = [
  ADV_NUMBER_LINE_SERIES,
  ADV_QUAD_MIN_SERIES,
  ADV_QUAD_GRAPH_SERIES,
  ADV_LINE_EQUATION_SERIES,
  ADV_POINT_LINE_DISTANCE_SERIES,
  ADV_CIRCLE_EQUATION_SERIES,
];
