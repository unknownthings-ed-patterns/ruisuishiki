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
  title: "2次関数の最小値",
  subtitle:
    "$f(x) = x^2 + bx + c$ の最小値を求める10問。平方完成・頂点の y 座標。",
  patternId: "VV1",
  unit: "advanced",
  revelationLabel: "最小値 = c − b²/4（頂点の y 座標）",
  drivingQuestion: "ばらけた 2 次式から、最小値はどう読む？",
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
  title: "2次関数のグラフを読む",
  subtitle:
    "$f(x) = x^2 + bx + c$ の頂点・軸・y 切片を読み取る10問。平方完成の本領発揮。",
  patternId: "GR1",
  unit: "advanced",
  revelationLabel: "平方完成から頂点（−b/2, c−b²/4）・軸・y 切片が一度に読める",
  drivingQuestion: "6 文字の式に隠れたグラフの地図を、どう開く？",
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
  title: "直線の方程式を読む",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 傾き・切片・中点・垂直の10問。",
  patternId: "LN1",
  unit: "advanced",
  revelationLabel: "傾き＝yの差／xの差。中点＝平均。垂直＝傾きの積が −1",
  drivingQuestion: "2 点から、傾き・切片・中点・垂直関係をどう読み解く？",
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
  title: "点と直線の距離",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 公式 $d = |ax_0+by_0+c|/\\sqrt{a^2+b^2}$ を10問。",
  patternId: "LN8",
  unit: "advanced",
  revelationLabel: "d = |ax₀ + by₀ + c| ÷ √(a² + b²)",
  drivingQuestion: "垂線の足の座標を計算せずに、距離は出せないか？",
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
  title: "円の方程式",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 標準形 $(x-a)^2+(y-b)^2=r^2$ と一般形、平方完成を10問。",
  patternId: "CR1",
  unit: "advanced",
  revelationLabel: "(x − a)² + (y − b)² = r²",
  drivingQuestion: "中心からの距離が一定の点の集まりを、1 つの式で書けないか？",
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
  title: "数直線上の点",
  subtitle: "数Ⅱ・B「図形と方程式」の入口 — 距離・中点・内分・外分を 10 問。",
  patternId: "NL1",
  unit: "advanced",
  revelationLabel: "内分 = 重み付き平均、外分は n を −n に置き換える",
  drivingQuestion:
    "直線上の 2 点について、距離・真ん中・分ける点を、計算だけで出せないか？",
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
        { layer: 1, text: "数直線の上で、$2$ と $8$ はどれだけ離れている？「へだたり」を数で言うとしたら、何と何を見ればいい？" },
        { layer: 2, text: "$8$ から $2$ まで何ぶんすすむ？ 大きい方から小さい方を引くと、へだたりが見えてくる。" },
        { layer: 3, text: "距離は大きい方から小さい方を引けば出る。$8$ と $2$、大きいのは $8$。あとは引くだけ——向きは関係ないので差を正の量（絶対値）で見るのがコツ。" },
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
        { layer: 1, text: "前題（$A(2), B(8)$ の距離）と比べてみよう。問いは同じ「へだたり」。何が変わった？" },
        { layer: 2, text: "変わったのは座標だけ。前題と同じく「大きい方 − 小さい方」を考える。今、大きいのはどっち？" },
        { layer: 3, text: "前題と同じく差をとる。大きいのは $5$、小さいのは $-3$。$5$ から $-3$ を引けばよい——負の数が混じっても「大きい方 − 小さい方」は変わらない。" },
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
        { layer: 1, text: "座標は前々題（$A(2), B(8)$）と同じ。でも問いが「距離」から「真ん中」に変わった。真ん中はどこにある？" },
        { layer: 2, text: "$2$ と $8$ のちょうど中央。2 つの数の「まんなかの数」は、どうやって出せそう？" },
        { layer: 3, text: "まんなか＝平均。$2$ と $8$ を足して $2$ で割るだけ。距離は「差」、中点は「和を半分」——同じ 2 数から別の問いが立つ。" },
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
        { layer: 1, text: "前題（中点）と比べてみよう。やることは同じ「まんなか」。違うのは何？" },
        { layer: 2, text: "前題と同じく 2 数の平均。今の 2 数は $-3$ と $7$。負の数が入っても和を半分にするだけ。" },
        { layer: 3, text: "前題と同じく 2 数を足して半分にするだけ。$-3$ と $7$ の和を半分に——手順は前題のまま、数が変わっただけ。" },
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
            "前題は「まんなか」だった。今は「$1:1$ に内分」という新しい言葉。$1:1$ に分けると、中点とどこが違いそう？",
        },
        {
          layer: 2,
          text:
            "$1:1$ に分けるとは、ちょうど真ん中で分けること。前題の中点と同じ場所になりそう？ 確かめてみよう。",
        },
        { layer: 3, text: "$1:1$ の内分は中点と一致——前題と同じ「和を半分」で出る。内分は「真ん中」を一般の比に広げた考え方で、その入口がこの $1:1$。" },
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
        { layer: 1, text: "前題（$1:1$ の内分）と比べてみよう。比が $1:1$ から $2:3$ に変わった。真ん中ではなくなる——$A$ と $B$、どちら寄りになる？" },
        {
          layer: 2,
          text:
            "$2:3$ なら $P$ は $A$ から $2$、$B$ から $3$ の側。単純な平均では出ない——もし「重み」をつけるなら、どの座標にどの比を掛ける？",
        },
        { layer: 3, text: "内分は「遠い方の比」を重みにする加重平均。$A(2)$ に遠い方の比 $3$、$B(7)$ に $2$ を掛けて足し、$(2+3)$ で割る。クロスして掛けて足すのがコツ。" },
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
        { layer: 1, text: "前題（$A(2), B(7)$ を $2:3$）と比べてみよう。比は同じ $2:3$。変わったのは何？" },
        {
          layer: 2,
          text:
            "比 $2:3$ は同じで、座標だけ $A(1), B(11)$ に変わった。前題と同じ「クロスして掛けて足す」がそのまま使える？",
        },
        { layer: 3, text: "前題と同じ手順。$A(1)$ に $3$、$B(11)$ に $2$ を掛けて足し、$5$ で割る——前題のクロス掛けがそのまま使える。" },
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
        { layer: 1, text: "前題と比べてみよう。やり方は同じ内分。比が $3:4$、座標に負の数。何に気をつける？" },
        {
          layer: 2,
          text:
            "比 $3:4$ なら $A$ に $4$、$B$ に $3$ を掛ける（遠い方の比）。負の数 $-3$ の掛け算だけ丁寧に。",
        },
        { layer: 3, text: "前題と同じ加重平均。$A(-3)$ に $4$、$B(11)$ に $3$ を掛けて足し、$7$ で割る。負の数 $-3$ の掛け算だけ符号に注意。" },
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
            "ここで「内分」が「外分」に変わった。場面が変わる質的な一歩。内分は線分の内側で分けた——外分の点はどこにありそう？",
        },
        {
          layer: 2,
          text:
            "外分の点は線分の外。でも公式を覚え直す必要はない——前題までの内分の式で、比のうち片方を「マイナス」にすると外側になる。どの比を負にすればいい？",
        },
        { layer: 3, text: "内分の式の $n$ を $-n$ に置き換えるだけ。$A(2)$ 側の比を負にして掛け、分母も $m - n$ にする——あとは前題までと同じ計算。内分と外分は別物でなく、符号ひとつ違いの兄弟。" },
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
        { layer: 1, text: "前題（外分）と比べてみよう。やり方は同じ外分。比が $5:3$、座標が $0$ と $10$。" },
        {
          layer: 2,
          text:
            "前題と同じく内分の $n$ を $-n$ に。$m = 5, n = 3$ なら分母は $m - n$。",
        },
        { layer: 3, text: "前題と同じく内分の $n$ を $-n$ に。$A(0)$ 側を負にして掛け、分母は $5 - 3$。$B(10)$ より右の外にできる——前題と同じ符号の置き換え。" },
      ],
      formulaPreview: "(−3·0+5·10)/2 = 25",
    },
  ],
  derivation: `**中心の問い** ｜ 直線上の 2 点について、距離・真ん中・分ける点を、計算だけで出せないか？

────────

**直線の上の点は、たった 1 つの座標で居場所が決まる。**

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

────────

**問いに戻ると**

「直線上の 2 点について、距離・真ん中・分ける点を、計算だけで出せないか？」——その答えはすべて **「座標の差と平均」** から出る。

- 距離 $= |x_2 - x_1|$（座標の差の絶対値）
- 中点 $= (x_1 + x_2)/2$（座標の平均）
- 内分 $= (nx_1 + mx_2)/(m+n)$（**重み付き** 平均、遠い方の比が重み）
- 外分 $= (-nx_1 + mx_2)/(m-n)$（内分の $n$ を $-n$ に置き換え、重みが負になる）

$4$ つの公式に見えるが、根は **$1$ つの考え方——「重み付き平均」**。重みを $1:1$ にすれば中点、一般の $m:n$ にすれば内分、片方を負にすれば外分。これからの「平面上の点」も同じ発想で広がる。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 単元構成（距離・中点・内分・外分）を参考。問題の値はオリジナル。`,
};

/* ===== CR2: 円と直線の位置関係 ===== */
export const ADV_CIRCLE_LINE_SERIES: LearnerSeries = {
  id: "adv_circle_line_01",
  title: "円と直線の位置関係",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 共有点の個数（0/1/2）を距離 $d$ と半径 $r$ で判定する 10 問。",
  patternId: "CR2",
  unit: "advanced",
  revelationLabel: "d と r の大小で位置関係が決まる（d > r → 0、d = r → 1、d < r → 2）",
  drivingQuestion: "円と直線の位置関係を、絵を描かずに見抜けないか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円 $x^2 + y^2 = 9$ と直線 $4x + 3y - 20 = 0$ の共有点の個数はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "中心 $(0, 0)$ から直線までの距離 $d$ と、半径 $r$ を比べる。",
        },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 + 0 - 20|}{\\sqrt{16 + 9}} = \\dfrac{20}{5} = 4$、$r = 3$。$d > r$。",
        },
        { layer: 3, text: "$0$（離れているので共有点なし）。" },
      ],
      formulaPreview: "d = 4 > r = 3 → 0 個",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円 $x^2 + y^2 = 16$ と直線 $3x - 4y + 10 = 0$ の共有点の個数はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。$d$ と $r$ を比べる。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 - 0 + 10|}{\\sqrt{9 + 16}} = \\dfrac{10}{5} = 2$、$r = 4$。$d < r$。",
        },
        { layer: 3, text: "$2$ 個（交わる）。" },
      ],
      formulaPreview: "d = 2 < r = 4 → 2 個",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "円 $x^2 + y^2 = 5$ と直線 $x + 2y - 5 = 0$ の共有点の個数はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$d$ と $r$ を計算。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 + 0 - 5|}{\\sqrt{1 + 4}} = \\dfrac{5}{\\sqrt{5}} = \\sqrt{5}$、$r = \\sqrt{5}$。$d = r$。",
        },
        { layer: 3, text: "$1$ 個（接する）。" },
      ],
      formulaPreview: "d = √5 = r → 1 個",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "円 $x^2 + y^2 = 25$ と直線 $3x + 4y - 30 = 0$ の共有点の個数はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$d$ と $r$ を比べる。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 + 0 - 30|}{\\sqrt{9 + 16}} = \\dfrac{30}{5} = 6$、$r = 5$。$d > r$。",
        },
        { layer: 3, text: "$0$ 個（離れている）。" },
      ],
      formulaPreview: "d = 6 > r = 5 → 0 個",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "円 $x^2 + y^2 = 13$ と直線 $2x - 3y + 13 = 0$ の共有点の個数はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$d$ と $r$ を比べる。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 - 0 + 13|}{\\sqrt{4 + 9}} = \\dfrac{13}{\\sqrt{13}} = \\sqrt{13}$、$r = \\sqrt{13}$。$d = r$。",
        },
        { layer: 3, text: "$1$ 個（接する）。" },
      ],
      formulaPreview: "d = √13 = r → 1 個",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "円 $x^2 + y^2 = 8$ と直線 $x + y - 2 = 0$ の共有点の個数はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "$d$ と $r$ を比べる。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|0 + 0 - 2|}{\\sqrt{1 + 1}} = \\dfrac{2}{\\sqrt{2}} = \\sqrt{2}$、$r = \\sqrt{8} = 2\\sqrt{2}$。$\\sqrt{2} < 2\\sqrt{2}$。",
        },
        { layer: 3, text: "$2$ 個（交わる）。" },
      ],
      formulaPreview: "d = √2 < r = 2√2 → 2 個",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "円 $(x - 1)^2 + y^2 = 4$ と直線 $3x + 4y - 10 = 0$ の共有点の個数はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "中心 $(1, 0)$、半径 $2$。距離を計算。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|3 \\cdot 1 + 4 \\cdot 0 - 10|}{\\sqrt{9 + 16}} = \\dfrac{|-7|}{5} = \\dfrac{7}{5} = 1.4$、$r = 2$。",
        },
        { layer: 3, text: "$2$ 個（$d < r$ なので交わる）。" },
      ],
      formulaPreview: "d = 7/5 < r = 2 → 2 個",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円 $(x - 2)^2 + (y - 1)^2 = 9$ と直線 $4x - 3y - 20 = 0$ の共有点の個数はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "中心 $(2, 1)$、半径 $3$。距離を計算。" },
        {
          layer: 2,
          text:
            "$d = \\dfrac{|4 \\cdot 2 - 3 \\cdot 1 - 20|}{\\sqrt{16 + 9}} = \\dfrac{|-15|}{5} = 3$、$r = 3$。$d = r$。",
        },
        { layer: 3, text: "$1$ 個（接する）。" },
      ],
      formulaPreview: "d = 3 = r → 1 個",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円 $x^2 + y^2 = 5$ と直線 $y = 2x - 5$ の共有点の個数を、代入して 2 次方程式を作り判別式 $D$ で判定するといくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "円の式に直線の $y$ を代入し、$x$ の 2 次方程式の判別式 $D$ で判定。",
        },
        {
          layer: 2,
          text:
            "$x^2 + (2x - 5)^2 = 5$ → $5x^2 - 20x + 20 = 0$ → $x^2 - 4x + 4 = 0$ → $D/4 = 4 - 4 = 0$。",
        },
        { layer: 3, text: "$1$ 個（$D = 0$ なので接する）。" },
      ],
      formulaPreview: "D = 0 → 1 個",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "円 $x^2 + y^2 = 4$ と直線 $y = x + 3$ の共有点の個数を、代入して判別式 $D$ で判定するといくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "代入して 2 次方程式に。判別式 $D$ で。" },
        {
          layer: 2,
          text:
            "$x^2 + (x + 3)^2 = 4$ → $2x^2 + 6x + 5 = 0$ → $D = 36 - 40 = -4 < 0$。",
        },
        { layer: 3, text: "$0$ 個（$D < 0$ なので共有点なし）。" },
      ],
      formulaPreview: "D = −4 < 0 → 0 個",
    },
  ],
  derivation: `**中心の問い** ｜ 円と直線の位置関係を、絵を描かずに見抜けないか？

────────

**円と直線の関係は、たった 3 通り。**

直線を少しずつ動かして円に近づけていく——どこかで円に **触れ**、もう少し動かすと **貫き**、さらに動かすと反対側で **離れていく**。連続的に変わるけれど、ある瞬間の関係は **3 通りだけ**：

- **離れている**：共有点 $0$ 個
- **接する**：共有点 $1$ 個
- **交わる**：共有点 $2$ 個

<<CIRCLE_LINE_POSITIONS>>

この 3 つを、**絵を描かずに、計算だけで見抜きたい**——これがこの単元の問いです。

**方法 1：距離 $d$ と半径 $r$ を比べる（最短ルート）**

円の中心から直線までの距離 $d$ と、円の半径 $r$ を比べるだけで、位置関係は決まります：

| $d$ と $r$ | 位置関係 | 共有点 |
|---|---|---|
| $d > r$ | 離れている | $0$ 個 |
| $d = r$ | 接する | $1$ 個 |
| $d < r$ | 交わる | $2$ 個 |

直感的にも明らかです——中心から直線まで「半径より遠い」なら直線は円に届かない、「半径と同じ」ならぎりぎり $1$ 点で触れる、「半径より近い」なら直線が円を貫く。

[点と直線の距離] で学んだ公式

$$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$$

を、円の中心 $(x_0, y_0)$ と直線 $ax + by + c = 0$ に当てるだけ。**距離公式 $1$ 回で判定が終わる**。

**方法 2：連立して判別式 $D$ を見る**

別のルートもあります。**円と直線の方程式を連立** し、$y$ を消去すると $x$ の $2$ 次方程式が出ます。その解の個数 = 共有点の個数なので、[判別式] $D$ で判定できます：

| $D$ | 共有点 |
|---|---|
| $D > 0$ | $2$ 個（交わる） |
| $D = 0$ | $1$ 個（接する） |
| $D < 0$ | $0$ 個（離れている） |

これは [円の方程式] の単元で扱った「$2$ 次方程式の解の個数を $D$ で判定」と同じ発想。

**どちらが簡単？**

**方法 1（$d$ と $r$ を比べる）** が圧倒的に簡単です。連立して展開して整理する必要がなく、距離公式 $1$ 回で答えが出る。

ただし方法 2 は「**接点の座標を実際に求めたい**」「**パラメータの範囲を求めたい**」とき必要になります。両方使える状態にしておくのが理想。

**Step 1〜8：距離 $d$ で判定する練習**

最初の $8$ 問では、いろいろな円と直線について、距離 $d$ を計算して位置関係を判定しました。Step 1〜6 は **原点中心の円**、Step 7〜8 は **中心が原点でない円**。$d$ と $r$ の大小を比べるだけで、$0/1/2$ の答えが出てくる——同じ手順を繰り返すうちに、計算が手に馴染んできます。

**Step 9〜10：もう $1$ つの道——質的変化**

Step 9〜10 では、同じ問いを **別の方法（連立して判別式 $D$）** で解きました。

たとえば Step 9 は、円 $x^2 + y^2 = 5$ と直線 $y = 2x - 5$ について、$y$ を消去して $5x^2 - 20x + 20 = 0$ → $x^2 - 4x + 4 = 0$ → $D/4 = 0$ → 接する（$1$ 個）。方法 1 で計算しても、$d = \\dfrac{|-5|}{\\sqrt{5}} = \\sqrt{5} = r$ → 接する。**$2$ つの道が同じ答えに到達する**——「**$1$ つの真実に $2$ つの道**」を体感する場面です。

────────

**もっと深く** — 接点・接線・パラメータ範囲

**接点の座標を求めるには**：方法 2 が必須。連立して出た $2$ 次方程式の解 $x$ が、接点・交点の $x$ 座標。これを直線の式に代入すれば $y$ も出る。「位置関係だけ知りたい」なら方法 1 で十分だが、「**接点を実際に押さえたい**」なら方法 2 に進むしかない。

**円外の点から接線を引く**：点 $(x_0, y_0)$ から円に引いた接線の式を求める典型問題。「接線の傾きを $m$ とおいて、$d = r$ の条件から $m$ を決める」流儀と、「接点を $(s, t)$ とおいて関係式を立てる」流儀がある。どちらも、$d = r$ という条件式を起点にする。

**パラメータの範囲**：「直線が円と $2$ 点で交わるような $m$ の範囲は？」のような問い。$d < r$ または $D > 0$ の **不等式を $m$ について解く** だけ。方法 1 なら $d$ を $m$ で表す、方法 2 なら $D$ を $m$ で表す。

**円と円の位置関係への拡張**：$2$ つの円の位置関係も、**中心間の距離** と **半径の和・差** を比べると決まります。考え方は同じ——「**距離で位置関係を判定する**」発想は、図形と方程式の中心的な道具です。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 単元構成（距離 $d$ による判定と判別式 $D$ による判定の $2$ つの方法を並列に扱う）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「円と直線の位置関係を、絵を描かずに見抜けないか？」——その答えは、

**中心から直線までの距離 $d$ と、円の半径 $r$ を比べるだけ。**

$d > r$ なら離れている（$0$ 個）、$d = r$ なら接する（$1$ 個）、$d < r$ なら交わる（$2$ 個）。
連立＋判別式 $D$ という別の道もあり、同じ答えに到達する——でも **距離 $d$ ひとつ** で「絵を描かずに見抜く」ことができる。これがこの単元の到達点。`,
};

/* ===== CR3: 円の接線の公式 ===== */
export const ADV_CIRCLE_TANGENT_SERIES: LearnerSeries = {
  id: "adv_circle_tangent_01",
  title: "円の接線の公式",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 円 $x^2 + y^2 = r^2$ 上の点 $(a, b)$ における接線 $ax + by = r^2$ を $10$ 問で身につける。",
  patternId: "CR3",
  unit: "advanced",
  revelationLabel: "円の接線は ax + by = r²（接点が (a, b)）——xx + yy = r² の片方を a, b に置き換えるだけ",
  drivingQuestion: "円の接線を、接点が分かれば $1$ 行で書けないか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円 $x^2 + y^2 = 10$ 上の点 $P(3, 1)$ における接線は $3x + y = N$。$N$ はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "公式：円 $x^2 + y^2 = r^2$ 上の点 $(a, b)$ における接線は $ax + by = r^2$。右辺はいつも $r^2$。",
        },
        { layer: 2, text: "円の式の右辺がそのまま接線の右辺。$x^2 + y^2 = 10$ の右辺は $10$。" },
        { layer: 3, text: "$N = 10$。" },
      ],
      formulaPreview: "3x + y = 10",
      figureMarker: "<<CIRCLE_TANGENT_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円 $x^2 + y^2 = 13$ 上の点 $P(2, 3)$ における接線は $2x + 3y = N$。$N$ はいくつでしょう？",
      answer: 13,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。右辺はいつも $r^2$。" },
        { layer: 2, text: "$x^2 + y^2 = 13$ の右辺はそのまま $13$。" },
        { layer: 3, text: "$N = 13$。" },
      ],
      formulaPreview: "2x + 3y = 13",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "円 $x^2 + y^2 = 25$ 上の点 $P(4, 3)$ における接線は $4x + 3y = N$。$N$ はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "接点の座標が $(4, 3)$、$r^2 = 25$。検算は $a^2 + b^2 = r^2$。" },
        { layer: 2, text: "$4^2 + 3^2 = 16 + 9 = 25$ ✓。接点は確かに円上。右辺 = $25$。" },
        { layer: 3, text: "$N = 25$。" },
      ],
      formulaPreview: "4x + 3y = 25",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "円 $x^2 + y^2 = 17$ 上の点 $P(-1, 4)$ における接線は $-x + 4y = N$。$N$ はいくつでしょう？",
      answer: 17,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "接点の $x$ 座標が **負**。それでも公式はそのまま——$a = -1, b = 4$ を $ax + by = r^2$ に入れる。",
        },
        { layer: 2, text: "$(-1) \\cdot x + 4 \\cdot y = 17$ → $-x + 4y = 17$。" },
        { layer: 3, text: "$N = 17$。" },
      ],
      formulaPreview: "-x + 4y = 17",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "円 $x^2 + y^2 = 29$ 上の点 $P(-2, 5)$ における接線は $-2x + 5y = N$。$N$ はいくつでしょう？",
      answer: 29,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$a = -2, b = 5$。公式そのまま。" },
        { layer: 2, text: "右辺 = $r^2 = 29$。検算：$(-2)^2 + 5^2 = 4 + 25 = 29$ ✓。" },
        { layer: 3, text: "$N = 29$。" },
      ],
      formulaPreview: "-2x + 5y = 29",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "円 $x^2 + y^2 = 20$ 上の点 $P(2, -4)$ における接線は $2x - 4y = N$。$N$ はいくつでしょう？",
      answer: 20,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "今度は **$y$ 座標が負**。$a = 2, b = -4$。" },
        { layer: 2, text: "$2x + (-4)y = 20$ → $2x - 4y = 20$。検算：$4 + 16 = 20$ ✓。" },
        { layer: 3, text: "$N = 20$。" },
      ],
      formulaPreview: "2x − 4y = 20",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "円 $x^2 + y^2 = 37$ 上の点 $P(-1, -6)$ における接線は $-x - 6y = N$。$N$ はいくつでしょう？",
      answer: 37,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "$x, y$ どちらも負でも、公式は同じ。" },
        { layer: 2, text: "$(-1)x + (-6)y = 37$ → $-x - 6y = 37$。$(-1)^2 + (-6)^2 = 1 + 36 = 37$ ✓。" },
        { layer: 3, text: "$N = 37$。" },
      ],
      formulaPreview: "-x − 6y = 37",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円 $x^2 + y^2 = 5$ の **外側の点 $(3, 1)$** から接線を $2$ 本引く。接点を $(a, b)$ とおくと $a$ の値は $2$ つ得られる。**大きいほうの $a$** はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "大きいほうの a",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "接点 $(a, b)$ における接線は $ax + by = 5$。この直線が外側の点 $(3, 1)$ を通るから $3a + b = 5$。さらに $(a, b)$ は円上なので $a^2 + b^2 = 5$。",
        },
        {
          layer: 2,
          text:
            "$b = 5 - 3a$ を $a^2 + b^2 = 5$ に代入 → $a^2 + (5-3a)^2 = 5$ → $10a^2 - 30a + 20 = 0$ → $a^2 - 3a + 2 = 0$ → $(a-1)(a-2) = 0$。",
        },
        { layer: 3, text: "$a = 1$ または $a = 2$。大きいほうは $a = 2$。" },
      ],
      formulaPreview: "a = 1, 2（接点: (1,2), (2,-1)）",
      figureMarker: "<<CIRCLE_TANGENT_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円 $x^2 + y^2 = 10$ の外側の点 $(4, 2)$ から接線を $2$ 本引く。接点を $(a, b)$ とおくとき、**大きいほうの $a$** はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "大きいほうの a",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "接点で接線 $ax + by = 10$、これが $(4, 2)$ を通る → $4a + 2b = 10$。円上 → $a^2 + b^2 = 10$。",
        },
        {
          layer: 2,
          text:
            "$b = 5 - 2a$ を代入 → $5a^2 - 20a + 15 = 0$ → $a^2 - 4a + 3 = 0$ → $(a-1)(a-3) = 0$。",
        },
        { layer: 3, text: "$a = 1$ または $a = 3$。大きいほうは $a = 3$。" },
      ],
      formulaPreview: "a = 1, 3（接点: (1,3), (3,-1)）",
      figureMarker: "<<CIRCLE_TANGENT_STEP9>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "円 $x^2 + y^2 = 25$ の外側の点 $(7, 1)$ から接線を $2$ 本引く。接点を $(a, b)$ とおくとき、**大きいほうの $a$** はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "大きいほうの a",
      variationFromPrevious: "same",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "接点で接線 $ax + by = 25$、これが $(7, 1)$ を通る → $7a + b = 25$。円上 → $a^2 + b^2 = 25$。",
        },
        {
          layer: 2,
          text:
            "$b = 25 - 7a$ を代入 → $50a^2 - 350a + 600 = 0$ → $a^2 - 7a + 12 = 0$ → $(a-3)(a-4) = 0$。",
        },
        { layer: 3, text: "$a = 3$ または $a = 4$。大きいほうは $a = 4$。" },
      ],
      formulaPreview: "a = 3, 4（接点: (3,4), (4,-3)）",
      figureMarker: "<<CIRCLE_TANGENT_STEP10>>",
    },
  ],
  derivation: `**中心の問い** ｜ 円の接線を、接点が分かれば $1$ 行で書けないか？

────────

**円の接線：覚え方は $xx + yy = r^2$ → $ax + by = r^2$**

円 $x^2 + y^2 = r^2$ 上の点 $P(a, b)$ における接線は、

$$ax + by = r^2$$

これだけ。覚え方は——「**$xx + yy = r^2$ の $x$ の片方を $a$ に、$y$ の片方を $b$ に置き換える**」。

| | 左辺 | 右辺 |
|---|---|---|
| 円の方程式 | $x \\cdot x + y \\cdot y$ | $r^2$ |
| 接線の方程式 | $a \\cdot x + b \\cdot y$ | $r^2$ |

<<CIRCLE_TANGENT_AT_POINT>>

なぜこんな単純な式が成り立つのか——導出を $1$ 度だけ追ってみましょう。

**導出**

接点 $P(a, b)$ から原点 $O$ への直線 $OP$ の傾きは $\\dfrac{b}{a}$。**接線は半径 $OP$ と直交する**（円の接線は接点を通る半径と垂直）ので、接線の傾きは $-\\dfrac{a}{b}$。

$P(a, b)$ を通る傾き $-\\dfrac{a}{b}$ の直線：

$$y - b = -\\dfrac{a}{b}(x - a)$$

両辺に $b$ をかけて整理：

$$by - b^2 = -ax + a^2$$

$$ax + by = a^2 + b^2$$

ここで $P(a, b)$ は円上の点だから $a^2 + b^2 = r^2$。よって、

$$ax + by = r^2$$

これが接線の公式。

**Step 1〜7：公式を当てるだけ**

最初の $7$ 問では、円と接点を渡されて公式に代入するだけ：

- 円 $x^2+y^2 = 10$、接点 $(3, 1)$ → 接線 $3x + y = 10$
- 円 $x^2+y^2 = 17$、接点 $(-1, 4)$ → 接線 $-x + 4y = 17$
- 円 $x^2+y^2 = 20$、接点 $(2, -4)$ → 接線 $2x - 4y = 20$

接点の座標が負でも、公式はそのまま。**接点の $x$ 座標 = $x$ の係数、$y$ 座標 = $y$ の係数、右辺 = $r^2$**——機械的にあてはめれば終わる。検算は「$a^2 + b^2 = r^2$ になっているか」を見るだけ。

**Step 8〜10：質的変化——円外の点から接線を引く**

Step 8 以降は、状況が変わります。接点 $(a, b)$ は **与えられていない**——代わりに、**円の外側の点** $(x_0, y_0)$ が渡され、そこから引いた接線を求める。

円の外側の点から円には、接線が **$2$ 本** 引けます。$2$ つの接点 $(a, b)$ をどう見つけるか——ここで接線の公式が活躍します。

接点が $(a, b)$ なら、接線の式は $ax + by = r^2$。**この直線が外側の点 $(x_0, y_0)$ を通る** ので、

$$a \\cdot x_0 + b \\cdot y_0 = r^2 \\quad \\cdots ①$$

また、$(a, b)$ は円上の点だから、

$$a^2 + b^2 = r^2 \\quad \\cdots ②$$

①は $a, b$ の $1$ 次式、②は $a, b$ の $2$ 次式。**この $2$ つを連立** して $(a, b)$ を求めると、解が $2$ 組出てくる——それが $2$ つの接点。

たとえば Step 8 では、円 $x^2+y^2=5$ と外側の点 $(3, 1)$ から、$3a + b = 5$ と $a^2+b^2=5$ を連立。$b = 5 - 3a$ を代入すると $a^2 - 3a + 2 = 0$ → $(a-1)(a-2) = 0$ → $a = 1, 2$。$2$ つの接点は $(1, 2)$ と $(2, -1)$、対応する接線は $x + 2y = 5$ と $2x - y = 5$。

<<CIRCLE_TANGENT_FROM_EXTERNAL>>

**$1$ つの公式が、$2$ つの場面で働く**——接点が与えられているときも、接点を探すときも、起点はいつも「$ax + by = r^2$」。接点を変数として扱えば、外側の点から引く接線も $1$ 行の公式から導けます。

────────

**もっと深く** — 「接線の式は、円の式の片方の $x, y$ を $a, b$ に置き換えた形」

なぜ円の接線の公式は、円の方程式と **そっくり** なのか。これは偶然ではありません。

**接する** とは「$2$ つの図形が $1$ 点を共有し、その点で同じ方向を持つ」こと。接点 $(a, b)$ では、円と接線は「$1$ 点で出会い、そこで同じ向きに伸びる」。だから接線の方程式は、円の方程式から「**その $1$ 点だけを通る条件**」を取り出した形になる——$xx + yy = r^2$ の $x$ の片方を $a$ に、$y$ の片方を $b$ に固定するイメージ。

この「**もとの図形と接線の式が似る**」現象は、円以外にも広がります。

| 図形 | 方程式 | 接点 $(a, b)$ における接線 |
|---|---|---|
| 円 | $x^2 + y^2 = r^2$ | $ax + by = r^2$ |
| 円（中心 $(p, q)$） | $(x-p)^2 + (y-q)^2 = r^2$ | $(a-p)(x-p) + (b-q)(y-q) = r^2$ |
| 放物線 | $y^2 = 4px$ | $by = 2p(x + a)$ |
| 楕円 | $\\dfrac{x^2}{p^2} + \\dfrac{y^2}{q^2} = 1$ | $\\dfrac{ax}{p^2} + \\dfrac{by}{q^2} = 1$ |

すべて「$xx$ を $ax$ に、$yy$ を $by$ に置き換える」パターン。**「接線の式は、もとの式から $2$ 乗を $1$ つだけ降ろした形」**——この発想は数Ⅲ「微分による接線」に直結します。

**接線の長さ**：円外の点 $Q(x_0, y_0)$ から円 $x^2+y^2=r^2$ に引いた接線の **接点までの長さ** $\\ell$ は、三平方の定理で計算できる：

$$\\ell = \\sqrt{x_0^2 + y_0^2 - r^2}$$

中心 $O$、接点、$Q$ で直角三角形ができる（接点で $90°$）ので、$|OQ|^2 = r^2 + \\ell^2$ から $\\ell$ が出る。

**$r^2 = 1$ のとき**：単位円 $x^2 + y^2 = 1$ 上の点 $(a, b)$ における接線は $ax + by = 1$——三角関数（[[tangent]]）の議論でしばしば登場する形。$\\sin, \\cos$ の単位円との橋渡しになります。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 単元構成と「$xx + yy = r^2$ の片方を $a, b$ に置き換える」覚え方を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「円の接線を、接点が分かれば $1$ 行で書けないか？」——その答えは、

**接点 $(a, b)$ なら接線は $ax + by = r^2$。$xx + yy = r^2$ の片方を $a, b$ に変えるだけ。**

$1$ つの公式は、接点が与えられたときに即座に接線を書く道具にも、円外の点から接線を引くときの起点（$ax + by = r^2$ が通過する条件）にもなる。**「接線」という幾何の問いが、$2$ 元 $1$ 次・$2$ 次の連立に帰着する**——図形と方程式の真骨頂が、ここに現れています。`,
};

/* ===== BD1: 束の考え方（線束・円束） ===== */
export const ADV_BUNDLE_SERIES: LearnerSeries = {
  id: "adv_bundle_01",
  title: "束の考え方",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — $2$ 直線（や $2$ 円）の交点を求めずに、その交点を通る直線・円を作る $L_1 + k L_2 = 0$ の発想を $10$ 問で身につける。根軸と定点問題まで。",
  patternId: "BD1",
  unit: "advanced",
  revelationLabel:
    "$L_1 + k L_2 = 0$ は $k$ をどう選んでも $L_1, L_2$ の交点を通る——直線でも円でも同じ手順で $k$ が決まる",
  drivingQuestion: "$2$ 直線の交点を、いちいち座標で求めずに、その交点を通る直線をどう書ける？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 直線 $L_1: x + y - 3 = 0$ と $L_2: 2x - y = 0$ の交点と、点 $P(0, 1)$ を通る直線を、束 $L_1 + k L_2 = 0$ の形で表したい。$k$ はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "**束の式 $L_1 + k L_2 = 0$ に、$P$ を代入してみよう**。$L_1, L_2$ の交点を計算する必要はある？",
        },
        {
          layer: 2,
          text:
            "$P$ を代入すると、$L_1$ と $L_2$ にそれぞれ「具体的な数」が入る。その数から $k$ について解けないか？",
        },
        {
          layer: 3,
          text:
            "$L_1(0, 1) = 0 + 1 - 3 = -2$、$L_2(0, 1) = -1$。束も $P$ で $0$ になるはず：$-2 + k \\cdot (-1) = 0$ → $k = -2$。**$L_1, L_2$ の交点を一度も計算せずに $k$ が出た**——これが束の核。",
        },
      ],
      formulaPreview: "(x+y-3) + k(2x-y) = 0, P(0,1) → k = -2",
      figureMarker: "<<BUNDLE_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$2$ 直線 $L_1: x + 2y - 5 = 0$ と $L_2: 3x - y - 1 = 0$ の交点と、点 $P(1, 1)$ を通る直線。束 $L_1 + k L_2 = 0$ の $k$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text:
            "$L_1, L_2$ の係数も $P$ の値も変わった。でも **手順** はどうだろう。Step 1 で何をした？",
        },
        {
          layer: 3,
          text:
            "Step 1 と同じレシピ：$P$ を代入して $L_1(P) + k L_2(P) = 0$。今は $L_1(1, 1) = -2$、$L_2(1, 1) = 1$。$-2 + k = 0$ → $k = 2$。**式は違うが、操作は同じ**。",
        },
      ],
      formulaPreview: "(x+2y-5) + k(3x-y-1) = 0, P(1,1) → k = 2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$2$ 直線 $L_1: x + y - 2 = 0$ と $L_2: 2x - 3y + 2 = 0$ の交点と、原点 $O(0, 0)$ を通る直線。束 $L_1 + k L_2 = 0$ の $k$ はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$P$ の座標がどう変わった？",
        },
        {
          layer: 2,
          text:
            "$(1, 1)$ から $(0, 0)$ へ。**原点を代入する** と、$L_1, L_2$ にはそれぞれ何が残る？",
        },
        {
          layer: 3,
          text:
            "原点代入なら **定数項だけ** 残る：$L_1(0, 0) = -2$、$L_2(0, 0) = 2$。Step 2 と同じく $L_1(P) + k L_2(P) = 0$：$-2 + 2k = 0$ → $k = 1$。",
        },
      ],
      formulaPreview: "(x+y-2) + k(2x-3y+2) = 0, O(0,0) → k = 1",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$2$ 直線 $L_1: 3x + y - 5 = 0$ と $L_2: x - 2y + 5 = 0$ の交点と、点 $P(2, 2)$ を通る直線。束 $L_1 + k L_2 = 0$ の $k$ はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$P$ がさらに変わった。手順は同じか？",
        },
        {
          layer: 2,
          text:
            "$P(2, 2)$ を $L_1, L_2$ に代入してみよう。**両方の値が同じ符号** になったら、$k$ はどう出る？",
        },
        {
          layer: 3,
          text:
            "$L_1(2, 2) = 3$、$L_2(2, 2) = 3$。前題までと同じ手順で $3 + 3k = 0$ → $k = -1$。**$L_1(P)$ と $L_2(P)$ が同符号** の場合、$k$ が負になる——これも同じレシピから自然に出る。",
        },
      ],
      formulaPreview: "L₁(P)=3, L₂(P)=3 → 3+3k=0 → k = -1",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$2$ 円 $C_1: x^2 + y^2 - 4 = 0$ と $C_2: x^2 + y^2 - 2x - 4y + 4 = 0$ は $2$ 点で交わっている。その $2$ 交点と、点 $P(1, 0)$ を通る円を、束 $C_1 + k C_2 = 0$ で表したい。$k$ はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**ここまで $4$ 問は直線の束。今は $2$ 円の束。式の形は違うけど、手順はどう？**",
        },
        {
          layer: 2,
          text:
            "$L_1, L_2$ → $C_1, C_2$ に変わっただけ。$P$ を代入して値を出す操作・$k$ について解く操作は、同じか？それとも違うか？",
        },
        {
          layer: 3,
          text:
            "Step 4 では $L_1(P) + k L_2(P) = 0$ から $k$ を解いた。今も全く同じレシピ：$C_1(1, 0) = -3$、$C_2(1, 0) = 3$、$-3 + 3k = 0$ → $k = 1$。**変わったのは「直線→円」の見た目だけ、操作は不変**——これが束の発想の威力。",
        },
      ],
      formulaPreview: "C₁(P)=-3, C₂(P)=3 → -3+3k=0 → k = 1（直線も円も同じ）",
      figureMarker: "<<BUNDLE_STEP5>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$2$ 円 $C_1: x^2 + y^2 - 9 = 0$ と $C_2: x^2 + y^2 + 2x - 6y + 1 = 0$ の $2$ 交点と、点 $P(0, 1)$ を通る円。束 $C_1 + k C_2 = 0$ の $k$ はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。両方とも円束。何が変わった？",
        },
        {
          layer: 2,
          text:
            "$C_1, C_2$ と $P$ の値だけ違う。Step 5 で身につけた手順をそのまま当てたら、どうなる？",
        },
        {
          layer: 3,
          text:
            "Step 5 と同じレシピ：$C_1(0, 1) = -8$、$C_2(0, 1) = -4$、$-8 + k(-4) = 0$ → $k = -2$。",
        },
      ],
      formulaPreview: "C₁(P)=-8, C₂(P)=-4 → -8-4k=0 → k = -2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2$ 円 $C_1: x^2 + y^2 - 8 = 0$ と $C_2: x^2 + y^2 - 4x - 2y + 4 = 0$ の $2$ 交点と、原点 $O(0, 0)$ を通る円。束 $C_1 + k C_2 = 0$ の $k$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$P$ がどう変わった？",
        },
        {
          layer: 2,
          text:
            "原点が戻ってきた——Step 3 でも原点だった。**原点を代入** すると、$C_1, C_2$ は何が残る？",
        },
        {
          layer: 3,
          text:
            "Step 3 と同じく定数項だけ残る：$C_1(0, 0) = -8$、$C_2(0, 0) = 4$。$-8 + 4k = 0$ → $k = 2$。**直線版の原点パターン（Step 3）と円版の原点パターン（今）**、操作は同じ。",
        },
      ],
      formulaPreview: "C₁(O)=-8, C₂(O)=4 → -8+4k=0 → k = 2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$2$ 円 $C_1: x^2 + y^2 - 25 = 0$ と $C_2: x^2 + y^2 - 6x - 8y = 0$ は $2$ 点で交わる。その **$2$ 交点を通る直線（根軸）** を、束 $C_1 + k C_2 = 0$ から作りたい。$x^2, y^2$ の項を消して **直線が現れる** $k$ はいくつ？",
      answer: -1,
      unit: "",
      unknownLabel: "束の係数 k",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 5–7 は「点 $P$ を通る円」を作るための $k$ だった。今は条件が変わって「$x^2, y^2$ の項を消して直線にする」。** $P$ を代入して解くのとは違う発想が要りそう。",
        },
        {
          layer: 2,
          text:
            "束 $C_1 + k C_2$ を展開すると、$x^2$ と $y^2$ の係数はいくつ？ それを **$0$ にする** には？",
        },
        {
          layer: 3,
          text:
            "$(1 + k) x^2 + (1 + k) y^2 + \\cdots$。$2$ 乗の項が消えるには $1 + k = 0$、つまり $k = -1$。**$P$ の代入なしで $k$ が決まる**——これが「根軸」が現れる特別な瞬間。Step 5–7 と異なり、$k$ は具体的な $C_1, C_2$ にもよらず常に $-1$。",
        },
      ],
      formulaPreview: "(1+k)·(x²+y²) を消す → k = -1（根軸の特別な値）",
      figureMarker: "<<BUNDLE_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "前題の $C_1: x^2 + y^2 - 25 = 0$、$C_2: x^2 + y^2 - 6x - 8y = 0$ で、$k = -1$ として根軸を取り出すと、その方程式は $6x + 8y = N$ の形になる。$N$ はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**前題で「$k = -1$ で直線になる」と分かった**。その直線を、実際に書いてみよう。",
        },
        {
          layer: 2,
          text:
            "$k = -1$ とは「$C_1 - C_2$」を計算するということ。$x^2$ と $y^2$ が両辺で消えて、何の項が残る？",
        },
        {
          layer: 3,
          text:
            "$(x^2 + y^2 - 25) - (x^2 + y^2 - 6x - 8y) = 6x + 8y - 25 = 0$、すなわち $6x + 8y = 25$。$N = 25$。**$2$ 円の交点を一度も計算せずに、その $2$ 点を結ぶ直線が $1$ 行で出た**——前題で発見した $k = -1$ の威力。",
        },
      ],
      formulaPreview: "C₁ - C₂ = 6x + 8y - 25 = 0 → N = 25",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$a$ を任意の実数とするとき、直線 $(a + 1) x + (a - 1) y - 2 a = 0$ は、$a$ の値によらず ある **定点** を通る。その定点の $x$ 座標はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "定点の x 座標",
      variationFromPrevious: "inverse",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**これまでは「$2$ つの $L_1, L_2$ を与えられて束 $L_1 + k L_2$ を組み立てた」。今は逆——「束らしい形に書き直して、骨組みの $L_1, L_2$ を取り出す」**。式を $a$ について整理すると何が見える？",
        },
        {
          layer: 2,
          text:
            "$(a + 1) x + (a - 1) y - 2a$ を、**$a$ を含む項** と **$a$ を含まない項** に分けるとどうなる？ その形は、これまで見た束の式と何が似ている？",
        },
        {
          layer: 3,
          text:
            "$a (x + y - 2) + (x - y) = 0$ という形。これは **束 $L_1 + a L_2 = 0$ そのもの**（$L_1: x - y = 0$、$L_2: x + y - 2 = 0$、係数が $a$）。Step 1–4 で「束は $L_1, L_2$ の交点を必ず通る」と学んだのを **逆向きに** 使うと、$a$ によらず通る点 = この $2$ 直線の交点 $(1, 1)$。$x$ 座標は $1$。",
        },
      ],
      formulaPreview: "a(x+y-2) + (x-y) = 0 → 定点 (1, 1) → x = 1",
      figureMarker: "<<BUNDLE_STEP10>>",
    },
  ],
  derivation: `**中心の問い** ｜ $2$ 直線の交点を、いちいち座標で求めずに、その交点を通る直線をどう書ける？

────────

**「$2$ 直線が交わる点」を、座標を出さずに、別の直線で通す。**

$2$ つの直線 $L_1: ax+by+c=0$ と $L_2: a'x+b'y+c'=0$ が交わっていて、その交点を $Q$ とする。$Q$ を通る **別の** 直線を書きたい——ふつうなら、まず $L_1, L_2$ を連立して $Q$ の座標を求めてから、新しい直線を組み立てる。でも計算が $2$ 段重なる。

**束の発想**：次の式を作る。

$$L_1 + k L_2 = 0 \\quad \\Longleftrightarrow \\quad (ax+by+c) + k(a'x+b'y+c') = 0$$

ここで $k$ は任意の実数。**この式は、$k$ をどう選んでも、必ず $Q$ を通る**。なぜなら、$Q$ の座標を代入すると $L_1 = 0$ も $L_2 = 0$ も成り立つので、左辺は $0 + k \\cdot 0 = 0$ となって、つねに方程式を満たすから。

つまり **$k$ を $1$ つ動かすだけで、$Q$ を通るあらゆる直線が次々と取り出せる**——これが束の考え方。

**$k$ はどう決まる？**

通したい別の点 $P(x_0, y_0)$ が与えられているとき、$P$ を束の式に代入すれば $k$ が決まる：

$$L_1(x_0, y_0) + k \\cdot L_2(x_0, y_0) = 0 \\quad \\Longrightarrow \\quad k = -\\dfrac{L_1(x_0, y_0)}{L_2(x_0, y_0)}$$

これだけ。**交点 $Q$ の座標を一度も求めずに、$Q$ と $P$ を通る直線が書けた** ことになる。

**例**：$L_1: x+y-3=0$、$L_2: 2x-y=0$、$P(0, 1)$（Step 1 と同じ）。

$L_1(0,1) = -2$、$L_2(0,1) = -1$ なので、$-2 + k(-1) = 0$、つまり $k = -2$。束の式に戻すと、

$$(x+y-3) - 2(2x-y) = -3x + 3y - 3 = 0 \\quad \\Longrightarrow \\quad x - y + 1 = 0$$

これが、$L_1, L_2$ の交点と $(0, 1)$ を通る直線。**交点 $(1, 2)$ を計算せずに**、答えに辿り着いた。

────────

**もっと深く** — 円束、根軸、束で表せないもの

**円束**：同じ考え方は **円** にもそのまま効く。$2$ つの円 $C_1, C_2$ が $2$ 点で交わるとき、

$$C_1 + k C_2 = 0$$

は、$k$ にかかわらず $2$ つの交点を通る。$P$ を代入して同じように $k$ を解けば、$P$ と $2$ 交点を通る **円** が書ける（Step 5 がまさにそれ）。直線束と **手順が完全に同じ** であることに注目。

**$k = -1$ で何が起きるか**：円束で特別な $k = -1$ をとると、$x^2$ と $y^2$ の項どうしが打ち消し合い、**円ではなく直線が現れる**。

たとえば $C_1: x^2 + y^2 - 4 = 0$、$C_2: x^2 + y^2 - 2x - 4y + 4 = 0$ の場合、

$$C_1 - C_2 = 2x + 4y - 8 = 0 \\quad \\Longrightarrow \\quad x + 2y - 4 = 0$$

これが $2$ 円の **根軸（こんじく）**——$2$ 円の共有点を結ぶ直線そのもの。**$2$ 交点の座標を求めずに、その $2$ 点を結ぶ直線が $1$ 行で書ける** という、束の最も鮮やかな効果。

**束で表せないもの**：式 $L_1 + k L_2 = 0$ には、$L_2$ そのものは **入っていない**。$k = 0$ にすれば $L_1$ は取り出せるが、$L_2$ を取り出すには $k$ を無限大に飛ばす必要があり、そういう代入はできない。$L_2$ も含めたければ、対称な形 $\\alpha L_1 + \\beta L_2 = 0$（$\\alpha, \\beta$ は同時に $0$ でない実数）を使う。

**束の発想を逆向きに使う：定点問題**：パラメータ $a$ を含む直線の族 ——たとえば $(a+1) x + (a-1) y - 2a = 0$ ——が、$a$ の値によらず通る **定点** を求める問題（Step 10）。

これは束の発想の **逆向きの応用**。式を $a$ について整理すると、

$$(a+1) x + (a-1) y - 2a = a (x + y - 2) + (x - y) = 0$$

——これはまさに $2$ 直線 $L_1: x - y = 0$ と $L_2: x + y - 2 = 0$ の **束** $L_1 + a L_2 = 0$ の形。だから $a$ をどう動かしてもこの直線は $L_1, L_2$ の交点を必ず通る。あとは $L_1, L_2$ を連立して交点を $(1, 1)$ と出せば、それが定点。

「**$a$ がパラメータの直線族 = 束**」と見抜けば、$a$ ごとの直線を場合分けせずに、束の骨組み $2$ 本の交点 $1$ 点で済む。**束は前向き（交点を通る直線を作る）にも、逆向き（族の定点を見つける）にも使える** ——同じ発想が両方向に効く。

**なぜ強力か**：束の本質は「**交点という具体的な数を経由せずに、図形どうしの関係だけで新しい図形を作れる**」こと。座標計算を $1$ 段すっ飛ばして結論まで進める——代数的なエレガンスを最初に味わえる道具。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $3$ 章「図形と方程式」の「束の考え方」節構成（直線束 → 円束への展開）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「$2$ 直線の交点を、いちいち座標で求めずに、その交点を通る直線をどう書ける？」——その答えが、

**$L_1 + k L_2 = 0$。$P$ を代入して $k = -L_1(P) / L_2(P)$ と決めるだけ。**

$1$ 本の式の中に、交点 $Q$ を通るすべての直線が住んでいる。$k$ を動かせば、別の直線が次々と取り出せる。この発想は **円束（根軸）** にも、もっと一般の図形にも広がっていく。「**交点を求めない**」「**式の組み合わせだけで答えに辿り着く**」——代数で図形を扱う力の、原点のひとつ。`,
};

/* ===== CN1: 新しい数を作る（複素数の四則演算） ===== */
export const ADV_COMPLEX_NEW_NUMBER_SERIES: LearnerSeries = {
  id: "adv_complex_new_number_01",
  title: "新しい数を作る",
  subtitle:
    "数Ⅱ・B「複素数と方程式」より — $x^2 = -1$ を解くために新しい数 $i$ を作り、複素数 $a + bi$ の四則演算と等式・共役を $10$ 問で身につける。",
  patternId: "CN1",
  unit: "advanced",
  revelationLabel:
    "$i^2 = -1$ を約束すれば、$x^2 = -1$ は $i, -i$ を解にもち、複素数 $a + bi$ で四則演算がすべて成立する",
  drivingQuestion: "$x^2 = -1$ という、実数の世界では解けない方程式に解を持たせるには、どんな新しい数を作ればいい？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "中学で学んだ「実数の世界」では、$x^2 = -1$ には解がありません。新しい数 $i$ を「$2$ 乗すると $-1$ になる数」と決めると、$i$ は $x^2 = -1$ の解の $1$ つになります。もう $1$ つの解 $-i$ について、$(-i)^2$ はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "(-i)²",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "$i$ は「$2$ 乗すると $-1$ になる数」と決めた。$-i$ も同じ性質を持つだろうか？",
        },
        {
          layer: 2,
          text:
            "$(-i)^2$ を素直に展開すると、$(-1)^2 \\cdot i^2$。それぞれの値はいくつ？",
        },
        {
          layer: 3,
          text:
            "$(-1)^2 = 1$、$i^2 = -1$ なので、$(-i)^2 = 1 \\cdot (-1) = -1$。**$i$ も $-i$ も $x^2 = -1$ の解**——$x^2 = 4$ の解が $\\pm 2$ で対になるのと同じ。",
        },
      ],
      formulaPreview: "(-i)² = i² = -1（i と -i の両方が解）",
      figureMarker: "<<COMPLEX_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "複素数 $(2 + 3i) + (1 - i)$ を計算したときの **実部**（実数の部分）はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "実部",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。前題は $i^2$ の計算だった。今は複素数の **足し算**。$i$ をどう扱えばいい？",
        },
        {
          layer: 2,
          text:
            "$i$ をふつうの文字として扱い、実数部分と $i$ の係数を別々に足したらどうなる？",
        },
        {
          layer: 3,
          text:
            "$(2 + 3i) + (1 - i) = (2 + 1) + (3 - 1)i = 3 + 2i$、実部 $= 3$。**足し算では $i^2$ は出てこない**——実数 + 実数 と同じ感覚で、別々に扱える。",
        },
      ],
      formulaPreview: "(2+3i) + (1−i) = 3 + 2i → 実部 = 3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "複素数 $(5 - 2i) - (3 - 4i)$ を計算したときの **虚部**（$i$ の係数）はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "虚部",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。足し算 → 引き算。手順は同じ？",
        },
        {
          layer: 2,
          text:
            "$(5 - 2i) - (3 - 4i)$。実部どうし、虚部どうしを別々に引いたらどうなる？ 符号に注意。",
        },
        {
          layer: 3,
          text:
            "$(5 - 3) + (-2 - (-4))i = 2 + 2i$、虚部 $= 2$。**符号さえ間違えなければ、足し算と全く同じレシピ**。",
        },
      ],
      formulaPreview: "(5−2i) − (3−4i) = 2 + 2i → 虚部 = 2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "複素数のかけ算は、ふつうの文字計算と同じように展開して、最後に $i^2 = -1$ に置き換える。$(1 + i)(1 - i)$ を計算した結果はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "(1+i)(1−i) の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**Step 2-3 は実部と虚部を別々に扱う線形操作だった。今はかけ算——$i$ どうしの積が出てくる**。$i^2$ はどう扱う？",
        },
        {
          layer: 2,
          text:
            "$(1+i)(1-i)$ をふつうに「$(a+b)(a-b) = a^2 - b^2$」で展開すると $1 - i^2$。ここで $i^2$ をどう置き換える？",
        },
        {
          layer: 3,
          text:
            "$i^2 = -1$ なので $1 - i^2 = 1 - (-1) = 2$。**$i$ が完全に消えて実数になる**——これが共役どうしの積の特徴。Step 2-3 と違って $i^2 = -1$ を使う新しい操作。",
        },
      ],
      formulaPreview: "(1+i)(1−i) = 1 − i² = 1 − (−1) = 2",
      figureMarker: "<<COMPLEX_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$(2 + i)(3 + 2i)$ を計算したときの **実部** はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "実部",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。同じくかけ算。今度は共役対ではなく一般のかけ算——手順は同じ？",
        },
        {
          layer: 2,
          text:
            "Step 4 で身につけた「ふつうに展開 → $i^2 = -1$ で置き換え」を $(2+i)(3+2i)$ にそのまま当てる。",
        },
        {
          layer: 3,
          text:
            "$(2+i)(3+2i) = 6 + 4i + 3i + 2i^2 = 6 + 7i - 2 = 4 + 7i$、実部 $= 4$。**Step 4 と同じレシピ**——共役対では $i$ が消えたが、一般のかけ算では $i$ が残る。",
        },
      ],
      formulaPreview: "(2+i)(3+2i) = 4 + 7i → 実部 = 4",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "複素数の割り算は、**分母の共役を分母・分子に掛けて分母を実数化** する。$\\dfrac{1 + i}{1 - i}$ を計算したときの **虚部** はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "虚部",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4-5 はかけ算で $i^2 = -1$ を使った。今は割り算——分母に $i$ があるとき、どう実数化する？**",
        },
        {
          layer: 2,
          text:
            "Step 4 で「$(1+i)(1-i) = 2$（実数になる）」と発見した。これが割り算でどう使える？ **分母の共役** を何かに掛けたい。",
        },
        {
          layer: 3,
          text:
            "分母の共役 $1 + i$ を分母・分子に掛ける：$\\dfrac{(1+i)(1+i)}{(1-i)(1+i)} = \\dfrac{2i}{2} = i$。実部 $= 0$、**虚部 $= 1$**。**Step 4 の「共役どうしは実数」が割り算の道具になる**——同じ事実が違う場面で効く。",
        },
      ],
      formulaPreview: "(1+i)/(1−i) = 2i/2 = i → 虚部 = 1",
      figureMarker: "<<COMPLEX_STEP6>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\dfrac{3 + i}{1 + i}$ を計算したときの **実部** はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "実部",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。割り算は同じ。分母の符号だけ変わった——共役は何？",
        },
        {
          layer: 2,
          text:
            "分母 $1 + i$ の共役は $1 - i$。Step 6 と同じ手順で分母・分子に掛けると？",
        },
        {
          layer: 3,
          text:
            "$\\dfrac{(3+i)(1-i)}{(1+i)(1-i)} = \\dfrac{4 - 2i}{2} = 2 - i$、実部 $= 2$。**Step 6 と同じレシピ、分母の符号が反対だっただけ**。",
        },
      ],
      formulaPreview: "(3+i)/(1+i) = 2 − i → 実部 = 2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$a$ が正の実数のとき $\\sqrt{-a} = \\sqrt{a}\\,i$ と書く約束です。**ただし負のルートどうしのかけ算では落とし穴がある**。$\\sqrt{-3} \\times \\sqrt{-12}$ はいくつでしょう？",
      answer: -6,
      unit: "",
      unknownLabel: "√(−3) × √(−12) の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4-7 は $a + bi$ の四則演算だった。今は $\\sqrt{-3} \\times \\sqrt{-12}$——ルートに負の数が入る**。ふつうの $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ は使える？",
        },
        {
          layer: 2,
          text:
            "「$\\sqrt{(-3)(-12)} = \\sqrt{36} = 6$」と書くと正の $6$。一方で **まず $i$ を取り出してから** 掛けるとどうなる？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{-3} = \\sqrt{3}\\,i$、$\\sqrt{-12} = 2\\sqrt{3}\\,i$。掛けると $\\sqrt{3} \\cdot 2\\sqrt{3} \\cdot i^2 = 6 \\cdot (-1) = -6$。**$\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ は負の数では成り立たない**——必ず $i$ を取り出してから計算するのが安全なレシピ。",
        },
      ],
      formulaPreview: "√(−3)·√(−12) = √3·i · 2√3·i = 6i² = −6",
      figureMarker: "<<COMPLEX_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "**$2$ つの複素数 $a + bi$ と $a' + b'i$ が等しい** とは、**実部どうしも、虚部どうしも、それぞれ等しい** こと。$x, y$ を実数として $(2 + i)(x + yi) = 11 + 8i$ が成り立つとき、$x$ の値はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "x",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4-8 は計算問題だった。今は方程式：$(2 + i)(x + yi) = 11 + 8i$ から実数 $x$ を求める**。$x$ をどう取り出す？",
        },
        {
          layer: 2,
          text:
            "Step 4-5 で身につけた「複素数のかけ算」で左辺を展開すると、実部と虚部はそれぞれ何になる？ 右辺と比べると？",
        },
        {
          layer: 3,
          text:
            "$(2+i)(x+yi) = (2x - y) + (x + 2y)i = 11 + 8i$。**実部 $=$ 実部、虚部 $=$ 虚部** で連立：$2x - y = 11$、$x + 2y = 8$。これを解いて $x = 6, y = 1$。**複素数の等式 $1$ 本 $=$ 実数の連立方程式 $2$ 本**——複素数の世界の新しい解法。",
        },
      ],
      formulaPreview: "2x − y = 11, x + 2y = 8 → x = 6 (y = 1)",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "複素数 $z = 3 + 4i$ について、$i$ の符号を反転させた $\\bar{z} = 3 - 4i$ を **共役複素数** という。**共役どうしの積は必ず実数になる**。$z \\cdot \\bar{z}$ の値はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "z · z̄ の値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は $z = 3 + 4i$ と共役 $\\bar{z} = 3 - 4i$ の積。Step 4 で出会った形と同じ？",
        },
        {
          layer: 2,
          text:
            "$z \\cdot \\bar{z} = (3 + 4i)(3 - 4i)$。Step 4 で $(1+i)(1-i) = 2$ のとき使った「和と差の積 $(a + b)(a - b) = a^2 - b^2$」を当てると？",
        },
        {
          layer: 3,
          text:
            "$(3+4i)(3-4i) = 9 - (4i)^2 = 9 - 16 i^2 = 9 + 16 = 25$。**一般に $z = a + bi$ なら $z\\bar{z} = a^2 + b^2$**——[ピタゴラス数] の形が顔を出す。Step 4 で発見した「共役どうしは実数」が、絶対値の $2$ 乗という美しい結論に至る。",
        },
      ],
      formulaPreview: "z·z̄ = 3² + 4² = 25（一般に a² + b²）",
    },
  ],
  derivation: `**中心の問い** ｜ $x^2 = -1$ という、実数の世界では解けない方程式に解を持たせるには、どんな新しい数を作ればいい？

────────

**「ないのなら、作ってみる」——新しい数 $i$ の導入**

中学までで学んだ「実数の世界」では、すべての実数は $2$ 乗すると $0$ 以上になります。だから、

$$x^2 = -1$$

という方程式には **実数解がありません**。「ない」のだから諦める——のではなく、**ないのなら作ってみる** のが歴史の答えでした。「$2$ 乗すると $-1$ になる」新しい数 $i$ を導入する：

$$i^2 = -1$$

これを認めると、$x^2 = -1$ は

$$(x + i)(x - i) = 0$$

と因数分解できて、$x = i, -i$ という $2$ つの解を持つ。$i$ を [虚数単位]、$i$ と実数の組み合わせ $a + bi$（$a, b$ は実数）を [複素数] と呼びます。$a$ を [実部]、$b$ を [虚部]。$b = 0$ のときはふつうの実数。$b \\ne 0$ のとき「虚数」、特に $a = 0$ のとき「純虚数」。

**$\\sqrt{-a}$ の表し方**：$a$ が正の実数のとき、

$$\\sqrt{-a} = \\sqrt{a}\\,i$$

と書く約束。たとえば $\\sqrt{-3} = \\sqrt{3}\\,i$、$\\sqrt{-1} = i$。

**四則演算がすべて成り立つ**：複素数どうしを足す・引く・掛ける・割る、いずれの結果も必ず複素数になります。これが「数の世界」としての性質——実数の世界をこわすことなく、$1$ 段拡張した。

- **足し算・引き算**：実部どうし・虚部どうしを別々に：$(2 + 3i) + (1 - 5i) = 3 - 2i$
- **かけ算**：ふつうの文字計算 + 最後に $i^2 = -1$：$(2 + 3i)(1 - 5i) = 2 - 10i + 3i - 15i^2 = 17 - 7i$
- **割り算**：**分母の共役を分母・分子に掛けて、分母を実数化**：$\\dfrac{5 + 4i}{1 + 2i} = \\dfrac{(5+4i)(1-2i)}{(1+2i)(1-2i)} = \\dfrac{13 - 6i}{5}$

────────

**もっと深く** — ルートの落とし穴、共役複素数、複素数が広げる世界

**ルートの計算規則は要注意**：$\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ や $\\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}$ は **$a, b$ がともに非負のときだけ** 成り立ちます。負の数が混ざると壊れる：

$$\\sqrt{-3} \\times \\sqrt{-2} = \\sqrt{3}\\,i \\times \\sqrt{2}\\,i = \\sqrt{6}\\,i^2 = -\\sqrt{6}$$

——もし「$\\sqrt{-3}\\sqrt{-2} = \\sqrt{6}$」と書くと **間違い**。負のルートに出会ったら、まず $\\sqrt{-a} = \\sqrt{a}\\,i$ で $i$ を取り出し、ふつうの数の計算に戻すのが安全。

[共役複素数]：$z = a + bi$ に対して、虚部の符号を反転させた $\\bar{z} = a - bi$ を [共役複素数] といいます。共役どうしの和と積はいつも実数：

- **和**：$z + \\bar{z} = (a + bi) + (a - bi) = 2a$（実部の $2$ 倍）
- **積**：$z \\cdot \\bar{z} = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2$（実部の $2$ 乗 + 虚部の $2$ 乗）

積の式 $a^2 + b^2$ は [ピタゴラス数] の定理そのものの形。複素数を点 $(a, b)$ として **複素平面** にプロットすると、$|z|^2 = z\\bar{z} = a^2 + b^2$ が **原点からの距離の $2$ 乗** を表します——「数の世界」と「幾何の世界」がここで橋を架ける。

**複素数が広げる世界**：複素数は数学だけの遊びではなく、**実世界の問題を解く力** を持ちます。

- **電気工学・信号処理**：交流回路の電圧・電流は複素数で表す（フェーザ表示）。**フーリエ変換** で音や画像を「周波数の世界」に翻訳するのも複素数の力
- **量子力学**：粒子の状態は複素数値の「波動関数」で記述される。実部・虚部の両方が物理的意味を持つ
- **流体力学・電磁気学**：複素関数が空気の流れや電場の形を解く道具になる
- **コンピュータグラフィクス**：複素数の掛け算は **平面上の回転と拡大** を表す。$z \\mapsto i \\cdot z$ は $90°$ 回転、$z \\mapsto (1 + i) z$ は $45°$ 回転 + $\\sqrt{2}$ 倍

「数の世界を $1$ つ広げる」という小さな約束が、こんなに大きな世界に通じている。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $2$ 章「複素数と方程式」§$1$「新しい数を作る」の節構成（「ないのなら作ってみる」の発想 → $i$ の定義 → 四則演算 → 共役）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「$x^2 = -1$ という、実数の世界では解けない方程式に解を持たせるには、どんな新しい数を作ればいい？」——その答えが、

**$i^2 = -1$ を約束する新しい数 $i$。**

$i$ と実数を組み合わせた $a + bi$ という「複素数」の世界では、四則演算がすべて成り立ち、$x^2 = -1$ は $i, -i$ という $2$ つの解を持つ。**「ない」のなら「作る」**——この大胆な発想が、量子力学や信号処理まで広がる豊かな数学の扉を開いた。`,
};

/* ===== CN2: 2 次方程式の実数解（と虚数解） ===== */
export const ADV_COMPLEX_QUADRATIC_SOLUTIONS_SERIES: LearnerSeries = {
  id: "adv_complex_quadratic_solutions_01",
  title: "2 次方程式の実数解",
  subtitle:
    "数Ⅱ・B「複素数と方程式」より — 解の公式を複素数の世界に拡張し、判別式 $D = b^2 - 4ac$ の符号で「異なる $2$ 実数解 / 重解 / 異なる $2$ 虚数解」の $3$ 場合を見抜く力を $10$ 問で身につける。",
  patternId: "CN2",
  unit: "advanced",
  revelationLabel:
    "判別式 $D = b^2 - 4ac$ の符号で、$2$ 次方程式の解は「異なる $2$ 実数解（$D>0$）」「重解（$D=0$）」「異なる $2$ 虚数解（$D<0$）」のいずれかに決まる",
  drivingQuestion:
    "解の公式に出てくる $\\sqrt{b^2 - 4ac}$ が負になる $2$ 次方程式は、複素数の世界では どう解ける？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 次方程式 $x^2 - 5x + 6 = 0$ は実数解を $2$ つもちます。**大きい方** の解はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "大きい方の解",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "$2$ 次方程式を解く道は $2$ つ——**因数分解** か **解の公式**。$x^2 - 5x + 6$ ならどっちが早そう？",
        },
        {
          layer: 2,
          text:
            "「足して $-5$、掛けて $6$」の $2$ 数を探すと？ または解の公式 $x = \\dfrac{5 \\pm \\sqrt{25 - 24}}{2}$ でルートの中身を見ると？",
        },
        {
          layer: 3,
          text:
            "$(x - 2)(x - 3) = 0$ で解 $2, 3$、または解の公式で $x = \\dfrac{5 \\pm 1}{2}$ から $2, 3$。**大きい方は $3$**。中学で学んだ解法を、この単元で「複素数の世界」へ更新していく。",
        },
      ],
      formulaPreview: "(x − 2)(x − 3) = 0 → 解 2, 3 → 大: 3",
      figureMarker: "<<QUADRATIC_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$2$ 次方程式 $x^2 - 7x + 10 = 0$ の **大きい方** の解はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "大きい方の解",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。係数が違うだけ。同じ手順で解けるか？",
        },
        {
          layer: 2,
          text:
            "Step 1 と同じレシピ——因数分解か解の公式。$\\sqrt{}$ の中身（$49 - 40$）はいくつ？",
        },
        {
          layer: 3,
          text:
            "$(x - 2)(x - 5) = 0$ で解 $2, 5$、大きい方は $5$。または解の公式で $x = \\dfrac{7 \\pm 3}{2}$。**Step 1 と全く同じレシピ**——$\\sqrt{}$ の中身が正なら異なる $2$ 実数解。",
        },
      ],
      formulaPreview: "(x − 2)(x − 5) = 0 → 解 2, 5 → 大: 5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$2$ 次方程式 $x^2 - 9x + 14 = 0$ の **大きい方** の解はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "大きい方の解",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今回も同じ手順？",
        },
        {
          layer: 2,
          text:
            "$x^2 - 9x + 14$ を因数分解、または解の公式。$\\sqrt{}$ の中身はいくつ？",
        },
        {
          layer: 3,
          text:
            "$(x - 2)(x - 7) = 0$ で解 $2, 7$、大きい方は $7$。**Step 1–3 はすべて $\\sqrt{}$ の中身（後で「判別式 $D$」と呼ぶもの）が正で、異なる $2$ 実数解**——同じレシピで $3$ 連発。",
        },
      ],
      formulaPreview: "(x − 2)(x − 7) = 0 → 解 2, 7 → 大: 7",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$2$ 次方程式 $x^2 - 12x + 36 = 0$ を解くと、$2$ つの解が **同じ値** になります（**重解**）。その値はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "重解の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–3 では「解が $2$ つ違う値」だった。今は「$2$ 解が同じ値」になる**——解の公式のどこに変化がある？",
        },
        {
          layer: 2,
          text:
            "$x = \\dfrac{12 \\pm \\sqrt{144 - 144}}{2}$ を計算してみる。$\\sqrt{}$ の中身がどうなった？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{0} = 0$ なので $\\pm$ が消えて、$x = 6$ ただ $1$ 値（重解）。または $(x - 6)^2 = 0$ と因数分解。**$\\sqrt{}$ の中身 $= 0$ が「$2$ 解が同じ値に重なる」境界**——後で「判別式 $D = 0$」と呼ぶ特別な値の伏線。",
        },
      ],
      formulaPreview: "(x − 6)² = 0 → 重解 x = 6（D = 0）",
      figureMarker: "<<QUADRATIC_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$2$ 次方程式 $x^2 + 2x + 5 = 0$ は **実数解をもちません**（解の公式のルートの中身が負）。複素数の世界では解は $-1 \\pm b i$ の形になります。$b > 0$ のときの $b$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "虚部 b（> 0）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–4 では $\\sqrt{}$ の中身が $\\geq 0$ だった。今は負になる**——前単元（新しい数を作る）で学んだ $i$ を使って解けないか？",
        },
        {
          layer: 2,
          text:
            "解の公式 $x = \\dfrac{-2 \\pm \\sqrt{4 - 20}}{2} = \\dfrac{-2 \\pm \\sqrt{-16}}{2}$。前単元の規則「$\\sqrt{-a} = \\sqrt{a}\\,i$」を使うと $\\sqrt{-16}$ はどうなる？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{-16} = 4 i$。$x = \\dfrac{-2 \\pm 4 i}{2} = -1 \\pm 2 i$、**$b = 2$**。**実数解がない方程式も、複素数の世界では解ける**——これが「複素数を導入したご褒美」。Step 1–4 と解の公式は同じ、$i$ を取り出すレシピが加わっただけ。",
        },
      ],
      formulaPreview: "x = (−2 ± 4i)/2 = −1 ± 2i → b = 2",
      figureMarker: "<<QUADRATIC_STEP5>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$2$ 次方程式 $x^2 - 4x + 13 = 0$ の解は $2 \\pm b i$ の形。$b > 0$ のときの $b$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "虚部 b（> 0）",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。係数だけ違う。同じ手順で $b$ を出せる？",
        },
        {
          layer: 2,
          text:
            "Step 5 と同じく解の公式に当てて、$\\sqrt{}$ から $i$ を取り出す。$\\sqrt{}$ の中身はいくつ？",
        },
        {
          layer: 3,
          text:
            "$x = \\dfrac{4 \\pm \\sqrt{16 - 52}}{2} = \\dfrac{4 \\pm 6 i}{2} = 2 \\pm 3 i$、$b = 3$。**Step 5 と同じレシピ**——係数だけ違う同操作。",
        },
      ],
      formulaPreview: "x = (4 ± 6i)/2 = 2 ± 3i → b = 3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2$ 次方程式 $x^2 + 6x + 25 = 0$ の解は $-3 \\pm b i$ の形。$b > 0$ のときの $b$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "虚部 b（> 0）",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。やはり虚数解。同じ手順？",
        },
        {
          layer: 2,
          text:
            "解の公式 → $\\sqrt{}$ の中身を確認 → $i$ を取り出す。$\\sqrt{}$ の中身は？",
        },
        {
          layer: 3,
          text:
            "$x = \\dfrac{-6 \\pm \\sqrt{-64}}{2} = \\dfrac{-6 \\pm 8 i}{2} = -3 \\pm 4 i$、$b = 4$。**Step 5–7 はすべて $\\sqrt{}$ の中身が負の虚数解、レシピは同じ**——$3$ 連発で慣らした。",
        },
      ],
      formulaPreview: "x = (−6 ± 8i)/2 = −3 ± 4i → b = 4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "解の公式のルートの中身 $b^2 - 4ac$ を **判別式** $D$ といいます。$D$ の符号で、$D > 0$ なら異なる $2$ 実数解、$D = 0$ なら重解、$D < 0$ なら異なる $2$ 虚数解と即座に判別できる。$2$ 次方程式 $2x^2 + x + 1 = 0$ の判別式 $D$ はいくつでしょう？",
      answer: -7,
      unit: "",
      unknownLabel: "判別式 D",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–7 で毎回計算していた「$\\sqrt{}$ の中身 $b^2 - 4ac$」に、$D$ という名前をつける**。今は解かずに $D$ だけ計算してみる",
        },
        {
          layer: 2,
          text:
            "$D = b^2 - 4ac$ に、この方程式の $a, b, c$ を代入すると？",
        },
        {
          layer: 3,
          text:
            "$D = 1^2 - 4 \\cdot 2 \\cdot 1 = -7$。**負なので異なる $2$ 虚数解**——Step 1–7 では $\\sqrt{}$ の中身を毎回計算していたが、$D$ という名前をつけると **解かずに種類が判別できる** ようになる。",
        },
      ],
      formulaPreview: "D = 1 − 8 = −7（D < 0 → 異なる 2 虚数解）",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$2$ 次方程式 $x^2 + 4x + k = 0$ が **重解** をもつとき、$k$ の値はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "k",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 8 で $D$ を計算した。今は逆——$D$ をある値にするような係数を求める**。重解 ⟺ $D$ がいくつ？",
        },
        {
          layer: 2,
          text:
            "Step 4 で「重解 ⟺ $\\sqrt{}$ の中身 $= 0$」と発見した。今は $D = 16 - 4k$。$D = 0$ を $k$ について解く。",
        },
        {
          layer: 3,
          text:
            "$D = 16 - 4k = 0$ → $k = 4$。**$D$ を「読む」（Step 8）から「設定する」（今）に視点が切り替わった**——係数 $k$ を動かして $D$ を制御し、解の種類を狙う。",
        },
      ],
      formulaPreview: "D = 16 − 4k = 0 → k = 4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$2$ 次方程式 $x^2 + 6x + k = 0$ が **異なる $2$ つの実数解** をもつのは $k < N$ のとき。**境界** $N$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "境界 N",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。前題は「重解 ⟺ $D = 0$」を $1$ 点で解いた。今は「異なる $2$ 実数解 ⟺ $D > 0$」を **範囲で** 見る",
        },
        {
          layer: 2,
          text:
            "$D = 36 - 4k$。「異なる $2$ 実数解 ⟺ $D > 0$」を $k$ の条件に翻訳すると？ 境界の $N$ は $D = 0$ のときの $k$。",
        },
        {
          layer: 3,
          text:
            "$D > 0$ ⟺ $36 - 4k > 0$ ⟺ $k < 9$、境界 $N = 9$。**$D$ の符号で $3$ 場面（$D > 0$ 実数解 / $D = 0$ 重解 / $D < 0$ 虚数解）が連続的に切り替わる**——$k = 9$ がその転換点。Step 1–10 の総まとめ：$D$ という $1$ つの量で $2$ 次方程式のすべてが見える。",
        },
      ],
      formulaPreview: "D = 36 − 4k > 0 ⟺ k < 9 → 境界 N = 9",
    },
  ],
  derivation: `**中心の問い** ｜ 解の公式に出てくる $\\sqrt{b^2 - 4ac}$ が負になる $2$ 次方程式は、複素数の世界では どう解ける？

────────

**解の公式は、複素数の世界でなら「すべての $2$ 次方程式」を解ける。**

$2$ 次方程式 $ax^2 + bx + c = 0$（$a, b, c$ は実数）の **解の公式**：

$$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

中学までの実数の世界では、$b^2 - 4ac < 0$ になると **ルートの中身が負** になって「解なし」でした。

ところが——[虚数単位] $i$ を導入した [複素数] の世界ならば、$\\sqrt{-a} = \\sqrt{a}\\,i$（$a > 0$）で $\\sqrt{\\text{負}}$ も書ける。**解の公式はそのまま通用する**。

**例**：$2x^2 + x + 1 = 0$ を解の公式で：

$$x = \\dfrac{-1 \\pm \\sqrt{1^2 - 4 \\cdot 2 \\cdot 1}}{2 \\cdot 2} = \\dfrac{-1 \\pm \\sqrt{-7}}{4} = \\dfrac{-1 \\pm \\sqrt{7}\\,i}{4}$$

中学までは「解なし」と切り捨てていた方程式が、複素数の世界で $2$ つの解を取り戻す。

**判別式 $D = b^2 - 4ac$** ——解の公式のルートの中身に名前をつけ、その **符号** で解の種類を判別する：

| $D$ の符号 | ルートの中身 | 解の種類 |
|---|---|---|
| $D > 0$ | 正 → ふつうのルート | **異なる $2$ つの実数解** |
| $D = 0$ | $0$ → ルートが消える | **実数の重解**（同じ値 $1$ つ） |
| $D < 0$ | 負 → $i$ が顔を出す | **異なる $2$ つの虚数解** |

「**解かなくても、解の種類が分かる**」——これが [判別式] の威力。

────────

**もっと深く** — 偶数の $b$ のとき、放物線とのつながり、解と係数の関係

**$b$ が偶数のとき**：$b = 2 b'$ と置くと、解の公式は次の **バリエーション** で計算量が減る：

$$x = \\dfrac{-b' \\pm \\sqrt{b'^2 - ac}}{a}$$

たとえば $3x^2 - 4x + 3 = 0$ は $b' = -2$ として、$x = \\dfrac{2 \\pm \\sqrt{4 - 9}}{3} = \\dfrac{2 \\pm \\sqrt{5}\\,i}{3}$。$D/4 = b'^2 - ac$ を使うと数字が小さくなる。

**放物線とのつながり**：$D$ の符号は、放物線 $y = ax^2 + bx + c$ と $x$ 軸の関係そのもの：

| $D$ | グラフ |
|---|---|
| $D > 0$ | $x$ 軸と **$2$ 点** で交わる |
| $D = 0$ | $x$ 軸に **接する**（$1$ 点で触れる） |
| $D < 0$ | $x$ 軸とは **離れている**（共有点なし） |

これは「$2$ 次方程式の解 $=$ 放物線が $x$ 軸と交わる点の $x$ 座標」だから自然です。$D < 0$ で「離れている」とき、実数解は無い——でも複素数の世界では **$x$ 軸の外側に「もう $1$ つの世界」がある** と考えればよい。

**解と係数の関係**：$ax^2 + bx + c = 0$ の $2$ 解 $\\alpha, \\beta$ について：

- 解の和：$\\alpha + \\beta = -\\dfrac{b}{a}$
- 解の積：$\\alpha \\beta = \\dfrac{c}{a}$

**虚数解の場合も同じ式が成り立ちます**。実は $\\alpha, \\beta$ が虚数解なら、それらは [共役複素数] のペア $\\alpha = p + q i,\\ \\beta = p - q i$。和 $\\alpha + \\beta = 2p$、積 $\\alpha \\beta = p^2 + q^2$ がともに実数になる——これも実数係数 $2$ 次方程式の **対称性** の現れ。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $2$ 章「複素数と方程式」§ $2$「$2$ 次方程式の実数解」の節構成（解の公式の複素数への拡張 → 判別式 $D$ → $3$ 場面の判別 → パラメータ問題）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「解の公式に出てくる $\\sqrt{b^2 - 4ac}$ が負になる $2$ 次方程式は、複素数の世界では どう解ける？」——その答えが、

**解の公式そのままで解ける。$\\sqrt{-a} = \\sqrt{a}\\,i$ で $i$ を取り出すだけ。**

そして [判別式] $D = b^2 - 4ac$ の符号を見れば、解かなくても **異なる $2$ 実数解 / 重解 / 異なる $2$ 虚数解** の $3$ 場面が見抜ける。複素数の世界で初めて、$2$ 次方程式は「解の個数が場合分けで変わる」のではなく、**つねに $2$ つの解を持つ**（重解は「同じ値の $2$ 解」と数える）——これが [複素数] が広げた新しい景色。`,
};

/* ===== CN3: 2 次方程式の解と因数分解 ===== */
export const ADV_COMPLEX_FACTORIZATION_SERIES: LearnerSeries = {
  id: "adv_complex_factorization_01",
  title: "2 次方程式の解と因数分解",
  subtitle:
    "数Ⅱ・B「複素数と方程式」より — 解を求めれば $a x^2 + b x + c = a(x - \\alpha)(x - \\beta)$ で確実に因数分解できる。複素数の世界では「因数分解できない式」は存在しない、を $10$ 問で身につける。",
  patternId: "CN3",
  unit: "advanced",
  revelationLabel:
    "解 $\\alpha, \\beta$ を求めれば $a x^2 + b x + c = a(x - \\alpha)(x - \\beta)$。複素数の世界では **すべての $2$ 次式が確実に因数分解できる**。$\\alpha \\beta = c/a$、$\\alpha + \\beta = -b/a$",
  drivingQuestion:
    "すべての $2$ 次式を、例外なく因数分解する方法はある？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 次方程式 $x^2 - 5x + 6 = 0$ の $2$ 解を $\\alpha, \\beta$ とすると、$x^2 - 5x + 6 = (x - \\alpha)(x - \\beta)$ と因数分解できる。**解の積** $\\alpha \\beta$ はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "$x^2 - 5x + 6 = (x - \\alpha)(x - \\beta)$ の **右辺を展開** すると、係数はどう $\\alpha, \\beta$ と関係する？",
        },
        {
          layer: 2,
          text:
            "$(x - \\alpha)(x - \\beta) = x^2 - (\\alpha + \\beta) x + \\alpha \\beta$ を展開して、左辺 $x^2 - 5x + 6$ の **定数項** と比較すると、$\\alpha \\beta$ は何と一致する？",
        },
        {
          layer: 3,
          text:
            "定数項を比較して $\\alpha \\beta = 6$。または因数分解 $(x - 2)(x - 3)$ で $\\alpha = 2, \\beta = 3$、積も $6$ で同じ。**解を出さなくても、$\\alpha \\beta$ は係数から読める**——これがこの単元の出発点。",
        },
      ],
      formulaPreview: "x² − 5x + 6 = (x − 2)(x − 3) → α β = 6",
      figureMarker: "<<FACTOR_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$2$ 次方程式 $x^2 + 3x - 10 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**積** $\\alpha \\beta$ はいくつでしょう？",
      answer: -10,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。係数が違うだけ。$\\alpha \\beta$ をどこから読む？",
        },
        {
          layer: 2,
          text:
            "Step 1 で「定数項 $=$ $\\alpha \\beta$（$a = 1$ のとき）」と発見した。今の定数項はいくつ？",
        },
        {
          layer: 3,
          text:
            "定数項 $= -10$、即答で $\\alpha \\beta = -10$。または $(x + 5)(x - 2)$ で $\\alpha = -5, \\beta = 2$、積も $-10$。**Step 1 と同じ手順、係数だけ違う**。",
        },
      ],
      formulaPreview: "x² + 3x − 10 = (x + 5)(x − 2) → α β = −10",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$x^2 - 7x + 12 = 0$ の $2$ 解 $\\alpha, \\beta$ について、$\\alpha \\beta$ はいくつでしょう？",
      answer: 12,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は $x^2 - 7x + 12$。$\\alpha \\beta$ は？",
        },
        {
          layer: 2,
          text:
            "$a = 1$ なら定数項がそのまま $\\alpha \\beta$。$12$ をどう読む？",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = 12$。または $(x - 3)(x - 4)$ で $\\alpha = 3, \\beta = 4$、積も同じ。**Step 1–3 はすべて $a = 1$ で「定数項 $=$ 積」のパターン**。",
        },
      ],
      formulaPreview: "x² − 7x + 12 = (x − 3)(x − 4) → α β = 12",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$2 x^2 + 3 x - 2 = 0$ の解を $\\alpha, \\beta$ とすると、**先頭の $a = 2$** が前に出て $2 x^2 + 3 x - 2 = 2(x - \\alpha)(x - \\beta)$ の形になる。$\\alpha \\beta$ はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–3 では $a = 1$（$x^2$ の係数が $1$）だった。今は $a = 2$**——$\\alpha \\beta$ は定数項そのまま？",
        },
        {
          layer: 2,
          text:
            "右辺を展開 $a (x - \\alpha)(x - \\beta) = a x^2 - a (\\alpha + \\beta) x + a \\alpha \\beta$。定数項を比較すると $a \\alpha \\beta = c$、$\\alpha \\beta$ は？",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = c / a = -2 / 2 = -1$。または解の公式で解 $1/2, -2$ → 積 $-1$。**$a \\ne 1$ のときは「定数項 $\\div a$」**——Step 1–3 の式 $\\alpha\\beta = c$ が、一段拡張されて $\\alpha\\beta = c/a$ になる瞬間。",
        },
      ],
      formulaPreview: "2x² + 3x − 2 = 2(x − 1/2)(x + 2) → α β = −1 = c/a",
      figureMarker: "<<FACTOR_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$x^2 + 4x + 8 = 0$ の解は **異なる $2$ つの虚数解**（共役の複素数ペア）になる。それでも因数分解はできる：$x^2 + 4x + 8 = (x - \\alpha)(x - \\beta)$ の $\\alpha \\beta$ はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–4 では解が実数だった。今は虚数解**——共役ペア $\\alpha = -2 + 2i, \\beta = -2 - 2i$。それでも $\\alpha \\beta$ は計算できる？",
        },
        {
          layer: 2,
          text:
            "**実は同じ式 $\\alpha \\beta = c / a$ が、複素数解でも成り立つ**——係数比較は解の性質によらない。$c / a$ は？",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = c / a = 8$。または直接掛けて $(-2 + 2i)(-2 - 2i) = 4 - (2i)^2 = 4 + 4 = 8$（[共役複素数] の積はいつも実数）。**複素数解でも公式 $\\alpha \\beta = c/a$ は不変**——係数比較の威力。",
        },
      ],
      formulaPreview: "(−2+2i)(−2−2i) = 4 + 4 = 8 = c/a",
      figureMarker: "<<FACTOR_STEP5>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$x^2 + 2x + 5 = 0$ の解 $\\alpha, \\beta$（共役な虚数解）について、$\\alpha \\beta$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。やはり虚数解、$a = 1$。同じ手順？",
        },
        {
          layer: 2,
          text:
            "$a = 1$ なので $\\alpha \\beta = c$ で即答。定数項は？",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = c / a = 5$。または解 $-1 \\pm 2 i$ から $(-1)^2 - (2i)^2 = 1 + 4 = 5$。Step 5 と同じレシピ。",
        },
      ],
      formulaPreview: "(−1+2i)(−1−2i) = 1 + 4 = 5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$x^2 - 6x + 13 = 0$ の解 $\\alpha, \\beta$（共役な虚数解）について、$\\alpha \\beta$ はいくつでしょう？",
      answer: 13,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。やはり虚数解、$a = 1$。同じ即答？",
        },
        {
          layer: 2,
          text:
            "定数項をそのまま読む。$13$。",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = 13$。または解 $3 \\pm 2 i$ から $9 + 4 = 13$。**Step 5–7 はすべて「虚数解でも $\\alpha \\beta = c/a$」の確認**——共役対の積はいつも実数 $a^2 + b^2$（[ピタゴラス数] の形）。",
        },
      ],
      formulaPreview: "(3+2i)(3−2i) = 9 + 4 = 13",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$3 x^2 + 2 x + 3 = 0$ を解と因数分解で $3(x - \\alpha)(x - \\beta)$ の形に書きたい（**先頭 $a = 3$、解は複素数**の合わせ技）。$\\alpha \\beta$ はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4 は非モニック × 実数解、Step 5–7 は $a = 1$ × 複素数解。今は両方の合わせ技**——非モニック × 複素数解。$\\alpha \\beta$ の式は変わる？",
        },
        {
          layer: 2,
          text:
            "公式 $\\alpha \\beta = c / a$ は **「非モニック」「複素数解」どちらも独立に成立**——両方混じっても同じ。$a = 3, c = 3$ なら？",
        },
        {
          layer: 3,
          text:
            "$\\alpha \\beta = c / a = 3 / 3 = 1$。実際の解は $(-1 \\pm 2\\sqrt{2}\\,i) / 3$ で積 $(1 + 8) / 9 = 1$ も一致。**$\\alpha \\beta = c/a$ は「非モニック」と「複素数解」両方の拡張を同時に通す**——係数比較の汎用性。",
        },
      ],
      formulaPreview: "α β = c/a = 3/3 = 1（a ≠ 1、複素数解でも）",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$2$ 次方程式 $x^2 + 5 x + 7 = 0$ の解 $\\alpha, \\beta$ について、今度は **和** $\\alpha + \\beta$ はいくつでしょう？",
      answer: -5,
      unit: "",
      unknownLabel: "α + β",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–8 では $\\alpha \\beta$（積）を聞いた。今は $\\alpha + \\beta$（和）**。$x$ の係数を比較すると何が見える？",
        },
        {
          layer: 2,
          text:
            "$(x - \\alpha)(x - \\beta) = x^2 - (\\alpha + \\beta) x + \\alpha \\beta$ を展開した式の $x$ の係数を、左辺 $x^2 + 5 x + 7$ の $x$ の係数 $5$ と比較すると？",
        },
        {
          layer: 3,
          text:
            "$x$ の係数は $-(\\alpha + \\beta) = 5$ なので $\\alpha + \\beta = -5$。**これと積 $\\alpha \\beta = c/a$ を合わせて「解と係数の関係」**——解そのものを出さずに、和と積が見える強力な道具。",
        },
      ],
      formulaPreview: "α + β = −b/a = −5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$2 x^2 + 6 x + 3 = 0$ の解 $\\alpha, \\beta$ について、**和** $\\alpha + \\beta$ はいくつでしょう？（先頭 $a = 2$ に注意）",
      answer: -3,
      unit: "",
      unknownLabel: "α + β",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。和を聞かれているのは同じ。今度は $a = 2$——式はどう変わる？",
        },
        {
          layer: 2,
          text:
            "$a (x - \\alpha)(x - \\beta)$ の $x$ の係数は $-a(\\alpha + \\beta)$。元の式の $x$ の係数 $b$ と比較すると、$\\alpha + \\beta$ は？",
        },
        {
          layer: 3,
          text:
            "$\\alpha + \\beta = -b / a = -6 / 2 = -3$。Step 9 が $a = 1$ で「和 $= -b$」だったが、$a \\ne 1$ では「$-b / a$」と一段拡張。**和 $\\alpha + \\beta = -b/a$、積 $\\alpha \\beta = c/a$**——この単元の総まとめ。解を計算せずに、係数を見るだけで和と積が読める。",
        },
      ],
      formulaPreview: "α + β = −b/a = −6/2 = −3",
    },
  ],
  derivation: `**中心の問い** ｜ すべての $2$ 次式を、例外なく因数分解する方法はある？

────────

**「解が分かれば、因数分解は自動で書ける」**

中学・高校で「因数分解」を学んだとき、$x^2 - 5 x + 6 = (x - 2)(x - 3)$ のように、**整数の組み合わせを見つけて** 分解しました。でも $x^2 + 3 x - 2$ のような式は、ぱっと見ては因数分解できない——「これは因数分解できない式だ」と切り捨ててきた経験があるはず。

ところが、視点を変えると：

> **$2$ 次方程式の解 $\\alpha, \\beta$ を求めれば、因数分解は自動で書ける。**

$$x^2 + p x + q = (x - \\alpha)(x - \\beta)$$

なぜなら、左辺 $= 0$ とおいた方程式の解が $\\alpha, \\beta$ なら、右辺 $(x - \\alpha)(x - \\beta) = 0$ も同じ解を持つ。$2$ 次式は係数と最高次が決まれば一意なので、両者は等しい。

[解の公式] $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4 a c}}{2 a}$ は、**[複素数] の世界では必ず $2$ つの解を返す**（[判別式] $D$ の符号によらず）。だから **すべての $2$ 次式は確実に因数分解できる**——これが複素数の世界が広げた新しい景色。

**$a \\ne 1$ のときは先頭の $a$ が前に出る**：

一般に、$2$ 次方程式 $a x^2 + b x + c = 0$ の $2$ 解を $\\alpha, \\beta$ とすると、

$$a x^2 + b x + c = a (x - \\alpha)(x - \\beta)$$

——**先頭に $a$ が必要**。なぜなら $(x - \\alpha)(x - \\beta)$ の $x^2$ の係数は $1$ なので、左辺の $a$ と合わせるため。

**例**：$2 x^2 + 3 x - 2 = 0$。解の公式から $\\alpha = 1/2, \\beta = -2$。だから

$$2 x^2 + 3 x - 2 = 2 \\left(x - \\tfrac{1}{2}\\right)(x + 2)$$

**複素数解でも同じ**：$x^2 + 4 x + 8 = 0$ の解は $-2 \\pm 2 i$。だから

$$x^2 + 4 x + 8 = (x - (-2 + 2 i))(x - (-2 - 2 i)) = (x + 2 - 2 i)(x + 2 + 2 i)$$

「[複素数] の範囲では、すべての $2$ 次式は確実に因数分解できる」——昔切り捨ててきた式も、$i$ を使えば全部書ける。

────────

**もっと深く** — 解と係数の関係、$n$ 次式への拡張

**解と係数の関係（Vieta の公式）**：$a x^2 + b x + c = a (x - \\alpha)(x - \\beta)$ の右辺を展開すると：

$$a (x - \\alpha)(x - \\beta) = a x^2 - a (\\alpha + \\beta) x + a \\alpha \\beta$$

これと $a x^2 + b x + c$ の係数を比較すると：

$$\\boxed{\\alpha + \\beta = -\\dfrac{b}{a}, \\quad \\alpha \\beta = \\dfrac{c}{a}}$$

——**解そのものを出さなくても、係数を見るだけで和と積が分かる**。これが解と係数の関係。たとえば $x^2 + 5 x + 7 = 0$ の和 $\\alpha + \\beta = -5$、積 $\\alpha \\beta = 7$。

**[共役複素数] のペアの形が現れる**：実数係数の $2$ 次方程式が複素数解を持つとき、$\\alpha, \\beta$ は必ず共役のペア $p + q i, p - q i$。和は $2 p$（実数）、積は $p^2 + q^2$（[ピタゴラス数] の形！）になります——どちらも実数。だから「実数の係数 $b, c$ が」「実数の解の和・積」になる。

**$n$ 次式への拡張（代数学の基本定理）**：実は **複素数の世界では、$n$ 次方程式は必ず $n$ 個の解を持つ**（重解を重複して数えれば）。これを **代数学の基本定理** といいます。その結果、$n$ 次式は必ず $n$ 個の一次式の積に因数分解できる：

$$a_n x^n + \\cdots + a_0 = a_n (x - \\alpha_1)(x - \\alpha_2) \\cdots (x - \\alpha_n)$$

「複素数を導入したご褒美」として、整数の世界では分解できなかった式が、すべて確実に分解できるようになる——これが [複素数] の世界がもたらす最大の利益のひとつ。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $2$ 章「複素数と方程式」§ $3$「$2$ 次方程式の解と因数分解」の節構成（解 → 因数分解の自動化、$a \\ne 1$ の注意、複素数係数の因数分解）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「すべての $2$ 次式を、例外なく因数分解する方法はある？」——その答えが、

**解の公式で解 $\\alpha, \\beta$ を出して、$a x^2 + b x + c = a (x - \\alpha)(x - \\beta)$ と書く。**

複素数の世界では [解の公式] が必ず $2$ 解を返すから、**例外はない**。さらに係数を比較するだけで、解を出さずに和 $\\alpha + \\beta = -b / a$ と積 $\\alpha \\beta = c / a$ が読める（解と係数の関係）——「**解と因数分解は同じ事柄の表と裏**」、その対応が複素数によって完成する。`,
};

/* ===== CN4: 解と係数の関係 ===== */
export const ADV_COMPLEX_ROOT_COEFFICIENT_SERIES: LearnerSeries = {
  id: "adv_complex_root_coefficient_01",
  title: "解と係数の関係",
  subtitle:
    "数Ⅱ・B「複素数と方程式」より — $a x^2 + b x + c = 0$ の $2$ 解 $\\alpha, \\beta$ について $\\alpha + \\beta = -b/a$、$\\alpha \\beta = c/a$。解を出さずに対称式を読み、解 → 係数の逆向き・解の平行移動・パラメータ問題まで $10$ 問で身につける。",
  patternId: "CN4",
  unit: "advanced",
  revelationLabel:
    "解の対称な情報は、すべて $\\alpha + \\beta = -b/a$、$\\alpha \\beta = c/a$ の組み合わせで書ける——解を出さずに、係数を読むだけで分かる",
  drivingQuestion:
    "$2$ 解を求めずに、解にまつわる情報はどこまで読める？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 次方程式 $x^2 - 7 x + 12 = 0$ の $2$ 解を $\\alpha, \\beta$ とするとき、**$\\alpha + \\beta$** はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "α + β",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "$x^2 - 7 x + 12 = (x - \\alpha)(x - \\beta)$ と因数分解できると考えると、**右辺を展開** したときの $x$ の係数は、$\\alpha, \\beta$ とどう結びつく？",
        },
        {
          layer: 2,
          text:
            "$(x - \\alpha)(x - \\beta) = x^2 - (\\alpha + \\beta) x + \\alpha \\beta$ を展開して、左辺の **$x$ の係数 $-7$** と比較すると、$\\alpha + \\beta$ は何と一致する？",
        },
        {
          layer: 3,
          text:
            "$x$ の係数を比較して $-(\\alpha + \\beta) = -7$、つまり $\\alpha + \\beta = 7$。**解を出さずに、$x$ の係数を読むだけで和が見える**——これがこの単元の出発点。検算は因数分解 $(x - 3)(x - 4)$ で $3 + 4 = 7$ も同じ。",
        },
      ],
      formulaPreview: "α + β = −(−7) = 7",
      figureMarker: "<<VIETA_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$2$ 次方程式 $x^2 + 5 x + 6 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**$\\alpha + \\beta$** はいくつでしょう？",
      answer: -5,
      unit: "",
      unknownLabel: "α + β",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。係数が違うだけ。$\\alpha + \\beta$ はどこから読む？",
        },
        {
          layer: 2,
          text:
            "Step 1 で「$x$ の係数の符号を変えたものが $\\alpha + \\beta$（$a = 1$ のとき）」と発見した。今の $x$ の係数はいくつ？",
        },
        {
          layer: 3,
          text:
            "$x$ の係数 $= 5$ なので $\\alpha + \\beta = -5$。検算は $(x + 2)(x + 3)$ で $(-2) + (-3) = -5$。**Step 1 と全く同じレシピ**——係数だけ違う。",
        },
      ],
      formulaPreview: "α + β = −5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$2$ 次方程式 $x^2 + 3 x - 10 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**$\\alpha \\beta$**（積）はいくつでしょう？",
      answer: -10,
      unit: "",
      unknownLabel: "α β",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1, 2 では「和」を聞いた。今度は「積」**。$(x - \\alpha)(x - \\beta)$ を展開した式の **どの項** に $\\alpha \\beta$ が現れる？",
        },
        {
          layer: 2,
          text:
            "$(x - \\alpha)(x - \\beta) = x^2 - (\\alpha + \\beta) x + \\alpha \\beta$ の **定数項** を、左辺 $x^2 + 3 x - 10$ の定数項と比較すると、$\\alpha \\beta$ は何と一致する？",
        },
        {
          layer: 3,
          text:
            "定数項を比較して $\\alpha \\beta = -10$。検算は $(x + 5)(x - 2)$ で $5 \\cdot (-2) = -10$。**和は $x$ の係数の符号反転、積は定数項そのまま**（$a = 1$ のとき）——$2$ つの量が並んで読める。",
        },
      ],
      formulaPreview: "α β = −10",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$2$ 次方程式 $2 x^2 - 8 x + 3 = 0$（**$a = 2$**）の $2$ 解 $\\alpha, \\beta$ について、**$\\alpha + \\beta$** はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "α + β",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–3 では $a = 1$（$x^2$ の係数が $1$）だった。今は $a = 2$**——$\\alpha + \\beta$ は $x$ の係数そのまま？ それとも一手間入る？",
        },
        {
          layer: 2,
          text:
            "$a x^2 + b x + c = a (x - \\alpha)(x - \\beta)$ の **右辺を展開** すると、$x$ の係数は $-a(\\alpha + \\beta)$。左辺の $b$ と比較すると、$\\alpha + \\beta$ は？",
        },
        {
          layer: 3,
          text:
            "$\\alpha + \\beta = -b / a = -(-8) / 2 = 4$。**$a \\ne 1$ のときは「$x$ の係数を $a$ で割って符号反転」**——Step 1–3 の $\\alpha + \\beta = -b$ が、一段拡張されて $\\alpha + \\beta = -b/a$ になる瞬間。同様に積も $\\alpha \\beta = c / a$。",
        },
      ],
      formulaPreview: "α + β = −b/a = −(−8)/2 = 4",
      figureMarker: "<<VIETA_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$2$ 次方程式 $x^2 + 5 x + 2 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**$\\alpha^2 + \\beta^2$** はいくつでしょう？",
      answer: 21,
      unit: "",
      unknownLabel: "α² + β²",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–4 では $\\alpha + \\beta$ と $\\alpha \\beta$ を直接聞いた。今は $\\alpha^2 + \\beta^2$**——解 $\\alpha, \\beta$ を出さずに計算できないか？ $\\alpha^2 + \\beta^2$ を **和 $\\alpha + \\beta$ と積 $\\alpha \\beta$ で書き換える** 道はある？",
        },
        {
          layer: 2,
          text:
            "$(\\alpha + \\beta)^2$ を展開してみる：$\\alpha^2 + 2 \\alpha \\beta + \\beta^2$。これと $\\alpha^2 + \\beta^2$ を見比べると、**ある量を引けば** $\\alpha^2 + \\beta^2$ になる。何を引く？",
        },
        {
          layer: 3,
          text:
            "$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2 \\alpha \\beta$。$\\alpha + \\beta = -5, \\alpha \\beta = 2$ を代入して $25 - 4 = 21$。**解 $\\alpha, \\beta$ そのものは要らない——和と積さえあれば計算できる**。これが「対称式は和と積で書ける」という大原則。$\\alpha, \\beta$ を入れ替えても変わらない式（対称式）はすべて、この方法で出せる。",
        },
      ],
      formulaPreview: "α² + β² = (α+β)² − 2αβ = 25 − 4 = 21",
      figureMarker: "<<VIETA_STEP5>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$2$ 次方程式 $x^2 - 3 x + 4 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**$\\alpha^2 + \\beta^2$** はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "α² + β²",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。係数が違うだけ。同じレシピで $\\alpha^2 + \\beta^2$ を出せる？",
        },
        {
          layer: 2,
          text:
            "Step 5 と同じく $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2 \\alpha \\beta$。$\\alpha + \\beta$ と $\\alpha \\beta$ をそれぞれ係数から読むと？",
        },
        {
          layer: 3,
          text:
            "$\\alpha + \\beta = 3, \\alpha \\beta = 4$ なので $\\alpha^2 + \\beta^2 = 9 - 8 = 1$。**Step 5 と同じレシピ、係数だけ違う同操作**。ちなみに $D = 9 - 16 = -7 < 0$ なので $\\alpha, \\beta$ は虚数解だが——**対称式の公式は虚数解でも実数値として成立**。$(\\alpha + \\beta)^2 - 2 \\alpha \\beta$ は係数だけで決まるから当然。",
        },
      ],
      formulaPreview: "α² + β² = 9 − 8 = 1（虚数解でも公式は同じ）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2$ 次方程式 $x^2 - 6 x + 4 = 0$ の $2$ 解 $\\alpha, \\beta$ について、**$(\\alpha - \\beta)^2$**（差の $2$ 乗）はいくつでしょう？",
      answer: 20,
      unit: "",
      unknownLabel: "(α − β)²",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**Step 5, 6 は「和の対称式 $\\alpha^2 + \\beta^2$」だった。今は「差の対称式 $(\\alpha - \\beta)^2$」**——差は対称式？ $\\alpha, \\beta$ を入れ替えても値が変わらない？ ${}^2$ にしてしまえば？",
        },
        {
          layer: 2,
          text:
            "$(\\alpha - \\beta)^2$ を展開すると $\\alpha^2 - 2 \\alpha \\beta + \\beta^2$。これも $(\\alpha + \\beta)^2$ を経由して書き換えられる——$2 \\alpha \\beta$ の符号に注意。$(\\alpha + \\beta)^2 = \\alpha^2 + 2 \\alpha \\beta + \\beta^2$ から **何を引くと** $(\\alpha - \\beta)^2$ になる？",
        },
        {
          layer: 3,
          text:
            "$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4 \\alpha \\beta$。$\\alpha + \\beta = 6, \\alpha \\beta = 4$ で $36 - 16 = 20$。**和の対称式と同じく、差の $2$ 乗も和・積で書ける**——「対称式は和と積で書ける」の射程がさらに広がる。検算：$\\alpha - \\beta = \\pm \\sqrt{20} = \\pm 2 \\sqrt{5}$、解の公式でも一致。",
        },
      ],
      formulaPreview: "(α − β)² = (α+β)² − 4αβ = 36 − 16 = 20",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$2$ つの解が $3$ と $5$ である $2$ 次方程式は $x^2 + b x + c = 0$ の形（$a = 1$）に書ける。このときの **$c$** はいくつでしょう？",
      answer: 15,
      unit: "",
      unknownLabel: "定数項 c",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–7 は「係数 → 解の情報」の向きだった。今は逆——「解 → 係数」**。$3, 5$ を解とする $2$ 次方程式は、**$\\alpha + \\beta$ と $\\alpha \\beta$ がそれぞれいくつ** になる方程式？",
        },
        {
          layer: 2,
          text:
            "Step 1–3 で見つけた式を逆向きに：$\\alpha + \\beta = 3 + 5$、$\\alpha \\beta = 3 \\cdot 5$。これが $-b$ と $c$ に対応するから（$a = 1$ のとき）、$c$ はどっち？",
        },
        {
          layer: 3,
          text:
            "$\\alpha + \\beta = 8 = -b$ なので $b = -8$。$\\alpha \\beta = 15 = c$、**$c = 15$**。方程式は $x^2 - 8 x + 15 = 0$。展開すると $(x - 3)(x - 5)$ で確認できる。**解を与えて方程式を作る——これが「解と係数の関係」を逆向きに使う場面**。整数係数の問題作りや、$2$ 解の情報から方程式を復元する技に直結。",
        },
      ],
      formulaPreview: "(x − 3)(x − 5) = x² − 8x + 15 → c = 15",
      figureMarker: "<<VIETA_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$2$ 次方程式 $x^2 - 4 x + 1 = 0$ の $2$ 解を $\\alpha, \\beta$ とする。**$\\alpha + 2, \\beta + 2$** を $2$ 解とする $2$ 次方程式 $x^2 + p x + q = 0$ の **$q$** はいくつでしょう？",
      answer: 13,
      unit: "",
      unknownLabel: "新方程式の q",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 8 と Step 5–7 を合わせ技にする**。新しい解の **和と積** が分かれば、Step 8 と同じく方程式が作れる。新しい解の和 $(\\alpha + 2) + (\\beta + 2)$ と積 $(\\alpha + 2)(\\beta + 2)$ を、もとの $\\alpha + \\beta$ と $\\alpha \\beta$ で書き換えられない？",
        },
        {
          layer: 2,
          text:
            "もとの $\\alpha + \\beta = 4, \\alpha \\beta = 1$。新しい解の和：$(\\alpha + 2) + (\\beta + 2) = (\\alpha + \\beta) + 4$。新しい解の積：$(\\alpha + 2)(\\beta + 2)$ を展開すると $\\alpha \\beta + 2(\\alpha + \\beta) + 4$。それぞれ代入すると？",
        },
        {
          layer: 3,
          text:
            "新しい和 $= 4 + 4 = 8$、新しい積 $= 1 + 8 + 4 = 13$。$q$ は新しい解の積なので **$q = 13$**（方程式は $x^2 - 8 x + 13 = 0$）。**もとの解を出さずに、$\\alpha + \\beta$ と $\\alpha \\beta$ だけで新しい方程式が作れる**——「対称式は和と積で書ける」の威力がここでも効く。実際の解は $2 \\pm \\sqrt{3}$ だが、それを使わなくてよい。",
        },
      ],
      formulaPreview: "新 αβ = αβ + 2(α+β) + 4 = 1 + 8 + 4 = 13 = q",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$2$ 次方程式 $x^2 - 5 x + k = 0$ の $2$ 解の **差** $|\\alpha - \\beta|$ が $3$ となるような $k$ の値はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "k",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**Step 7 で $(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4 \\alpha \\beta$ を使った。今は逆向き——「差がある値になる」条件から $k$ を求める**。「$|\\alpha - \\beta| = 3$」を $(\\alpha - \\beta)^2$ の言葉に翻訳できる？",
        },
        {
          layer: 2,
          text:
            "$|\\alpha - \\beta| = 3$ ⟺ $(\\alpha - \\beta)^2 = 9$。$\\alpha + \\beta = 5, \\alpha \\beta = k$ なので、Step 7 の式 $(\\alpha + \\beta)^2 - 4 \\alpha \\beta = (\\alpha - \\beta)^2$ に代入して、$k$ について解く。",
        },
        {
          layer: 3,
          text:
            "$25 - 4 k = 9$ なので **$k = 4$**。方程式は $x^2 - 5 x + 4 = (x - 1)(x - 4) = 0$、解 $1, 4$ で差は $3$。**$k$（係数）を動かして、$(\\alpha - \\beta)^2$（解の対称な情報）を狙い撃ちする**——係数と対称式の対応を双方向に使う、この単元の総まとめ。同じ手で「$2$ 解の和が $\\alpha^2 + \\beta^2 = N$ になる $k$」のような問題も解ける。",
        },
      ],
      formulaPreview: "(α−β)² = 25 − 4k = 9 → k = 4",
    },
  ],
  derivation: `**中心の問い** ｜ $2$ 解を求めずに、解にまつわる情報はどこまで読める？

────────

**解の対称な情報は、すべて $\\alpha + \\beta$ と $\\alpha \\beta$ で書ける——そして $\\alpha + \\beta, \\alpha \\beta$ は係数で読める。**

$2$ 次方程式 $a x^2 + b x + c = 0$ の $2$ 解 $\\alpha, \\beta$ について：

$$\\alpha + \\beta = -\\dfrac{b}{a}, \\quad \\alpha \\beta = \\dfrac{c}{a}$$

**和は $-b/a$、積は $c/a$**——係数を読んで割るだけ。$a = 1$ なら $\\alpha + \\beta = -b, \\alpha \\beta = c$（定数項そのまま）。これが [解と係数の関係]。

**なぜ成り立つか**：解が $\\alpha, \\beta$ なら、[因数分解] して

$$a x^2 + b x + c = a (x - \\alpha)(x - \\beta)$$

右辺を展開して整理すると

$$a x^2 - a (\\alpha + \\beta) x + a \\alpha \\beta$$

これと左辺 $a x^2 + b x + c$ の係数を比較すれば、$- a (\\alpha + \\beta) = b$、$a \\alpha \\beta = c$ ——つまり $\\alpha + \\beta = -b/a$、$\\alpha \\beta = c/a$。**「因数分解 → 展開 → 係数比較」が証明そのもの**。

**[複素数] 解でも公式は同じ**：実数係数の $2$ 次方程式が虚数解（[共役複素数] のペア $p \\pm q i$）を持っても、和 $2 p$ と積 $p^2 + q^2$ は実数になる。だから「実数係数 → 実数の和・積」は破れない（Step 6 の $x^2 - 3 x + 4 = 0$ が実例）。

────────

**$\\alpha + \\beta, \\alpha \\beta$ で書き直せる「対称式」たち**

**対称式**——$\\alpha$ と $\\beta$ を入れ替えても変わらない式——は、**すべて $\\alpha + \\beta$ と $\\alpha \\beta$ だけで書ける**（対称式の基本定理）。だから「対称式の値」は **解そのものを出さずに係数から読める**。

| 対称式 | 和 $\\alpha + \\beta$ と積 $\\alpha \\beta$ で表すと |
|---|---|
| $\\alpha^2 + \\beta^2$ | $(\\alpha + \\beta)^2 - 2 \\alpha \\beta$ |
| $(\\alpha - \\beta)^2$ | $(\\alpha + \\beta)^2 - 4 \\alpha \\beta$ |
| $\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta}$ | $\\dfrac{\\alpha + \\beta}{\\alpha \\beta}$ |
| $\\alpha^3 + \\beta^3$ | $(\\alpha + \\beta)^3 - 3 \\alpha \\beta (\\alpha + \\beta)$ |
| $\\alpha^2 \\beta + \\alpha \\beta^2$ | $\\alpha \\beta (\\alpha + \\beta)$ |

**例**：$x^2 + 5 x + 2 = 0$（Step 5）の $\\alpha^2 + \\beta^2 = (-5)^2 - 2 \\cdot 2 = 21$。$x^2 - 6 x + 4 = 0$（Step 7）の $(\\alpha - \\beta)^2 = 6^2 - 4 \\cdot 4 = 20$。**解そのものは要らない——係数だけで答えが出る**。

────────

**逆向き：解から方程式を作る**

[解と係数の関係] は **両向きに使える**：

- **係数 → 解の情報**（Step 1–7）：方程式が与えられ、$\\alpha + \\beta, \\alpha \\beta$ や対称式を係数から読む
- **解 → 係数**（Step 8）：$2$ 解 $p, q$ が与えられ、それを解とする $2$ 次方程式 $x^2 + b x + c = 0$ を作る

逆向きはとても素直：$\\alpha = p, \\beta = q$ なら $\\alpha + \\beta = p + q$、$\\alpha \\beta = p q$。だから方程式は

$$x^2 - (p + q) x + p q = 0$$

——係数を直接置くだけ。**例**：解が $3, 5$ なら $x^2 - 8 x + 15 = 0$。

この逆向きは、**解の情報を加工して新しい方程式を作る**ときにも効きます（Step 9）。$\\alpha, \\beta$ を解とする方程式が与えられたとき、$\\alpha + 2, \\beta + 2$（解を平行移動）や $\\alpha^2, \\beta^2$（解の $2$ 乗）を解とする方程式を作るには、**新しい解の和と積を、もとの $\\alpha + \\beta, \\alpha \\beta$ で書き換える** だけ。

**Step 9 の例**：もとの $x^2 - 4 x + 1 = 0$ の解 $\\alpha, \\beta$（$= 2 \\pm \\sqrt{3}$）から、$\\alpha + 2, \\beta + 2$ を解とする方程式。新しい和 $= (\\alpha + \\beta) + 4 = 8$、新しい積 $= \\alpha \\beta + 2(\\alpha + \\beta) + 4 = 13$。だから $x^2 - 8 x + 13 = 0$。**もとの解そのものは一度も使わない**。

────────

**パラメータ問題：係数を動かして対称式を狙う**

応用の頂点は **パラメータ問題**：「方程式に文字 $k$ が含まれ、解 $\\alpha, \\beta$ がある条件を満たすような $k$ を求める」。

**Step 10 の例**：$x^2 - 5 x + k = 0$ の $2$ 解の **差が $3$** となる $k$ は？

「差が $3$」は $|\\alpha - \\beta| = 3$、つまり $(\\alpha - \\beta)^2 = 9$。$\\alpha + \\beta = 5, \\alpha \\beta = k$ で $(\\alpha + \\beta)^2 - 4 \\alpha \\beta = 25 - 4 k = 9$、よって $k = 4$。

**ポイント**：「解の条件」を「対称式の方程式」に翻訳できれば、係数 $k$ について解けばよい。$k$ を動かして、対称式の値を狙い撃ちする——**係数と対称式の対応を双方向に往復する**のがこの単元の真骨頂。

────────

**もっと深く** — $n$ 次への拡張（Vieta の公式）、応用の広がり

**$n$ 次方程式への一般化（Vieta の公式）**：$a x^n + a_{n-1} x^{n-1} + \\cdots + a_0 = 0$ の解 $\\alpha_1, \\alpha_2, \\dots, \\alpha_n$ について、**基本対称式** たちが係数比で書ける：

$$\\alpha_1 + \\alpha_2 + \\cdots + \\alpha_n = -\\dfrac{a_{n-1}}{a}$$

$$\\alpha_1 \\alpha_2 \\cdots \\alpha_n = (-1)^n \\dfrac{a_0}{a}$$

——間の「$k$ 次の対称式」（$k$ 個ずつ掛けたものの和）もすべて係数比から計算できる。$2$ 次の「和と積」はその最も基本的な例。$3$ 次方程式 $x^3 + p x^2 + q x + r = 0$ の解 $\\alpha, \\beta, \\gamma$ なら $\\alpha + \\beta + \\gamma = -p$、$\\alpha \\beta + \\beta \\gamma + \\gamma \\alpha = q$、$\\alpha \\beta \\gamma = -r$。

**「対称式の基本定理」**：$n$ 変数のあらゆる対称式は、$n$ 個の基本対称式の多項式で**一意に**書ける。だから「対称式の値」は係数だけで決まる。これは **群論・ガロア理論** の出発点でもある重要な定理——「解の置換で不変な式は、係数の式」という洞察が、後に「方程式が解けるとはどういうことか」を問う Galois 理論の核になる。

**応用の広がり**：

- **整数問題**：「和が $S$、積が $P$ の整数解を持つ $2$ 次方程式」のような問題で頻出
- **物理・工学**：$2$ 次の特性方程式（バネ・LCR 回路など）の解の和・積から、減衰率・固有周波数・時定数を読む
- **数値計算**：高次方程式の数値解を出す前に、解の和・積で「解の大体の位置」を見積もる
- **多項式の対称性**：対称関数論・表現論への入口

**[判別式] との関係**：$D = b^2 - 4 a c$ は、実は対称式の言葉で書ける——$D / a^2 = (\\alpha - \\beta)^2$ そのもの（Step 7 の式 $(\\alpha + \\beta)^2 - 4 \\alpha \\beta = b^2/a^2 - 4 c/a$ を変形）。**判別式 $\\geq 0$ ⟺ $(\\alpha - \\beta)^2 \\geq 0$ ⟺ 異なる実数解 or 重解**——判別式と解と係数の関係は、$(\\alpha - \\beta)^2$ という $1$ つの対称式で結ばれている。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $2$ 章「複素数と方程式」§ $4$「解と係数の関係」の節構成（和と積の公式 → 対称式 → 解 → 係数の逆向き → パラメータ問題）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「$2$ 解を求めずに、解にまつわる情報はどこまで読める？」——その答えが、

**解の対称な情報は、すべて $\\alpha + \\beta = -b/a$、$\\alpha \\beta = c/a$ の組み合わせで書ける——だから係数だけで読める。**

$\\alpha^2 + \\beta^2$ も $(\\alpha - \\beta)^2$ も $\\alpha^3 + \\beta^3$ も、解 $\\alpha, \\beta$ そのものを出さずに係数から計算できる。さらに逆向きに使えば、解から方程式を復元したり、解を加工した新しい方程式を作ったり、パラメータを調整して解の対称式を狙い撃ちしたり——**係数と対称式の対応を双方向に往復する力**が、この単元で身につきます。$n$ 次への拡張（Vieta の公式）と「対称式の基本定理」を経由して、最終的にはガロア理論にまで続く深い射程の入口。`,
};

/* ===== CN5: 剰余の定理・因数定理 ===== */
export const ADV_REMAINDER_THEOREM_SERIES: LearnerSeries = {
  id: "adv_remainder_theorem_01",
  title: "剰余の定理・因数定理",
  subtitle:
    "数Ⅱ・B「複素数と方程式」より — 整式 $P(x)$ を $x - a$ で割った余りは $P(a)$。割り算を実行せずに $1$ 点での代入で余りや因数を見抜く道具を $10$ 問で身につける。",
  patternId: "CN5",
  unit: "advanced",
  revelationLabel:
    "整式の余りは、ある $1$ 点で $x = a$ を代入した値そのもの——割り算を実行する必要はない",
  drivingQuestion:
    "割り算をせずに、整式の「余り」や「因数」を見抜くには？",
  steps: [
    // ---- Step 1 ここから ----
    {
      id: "step1",
      position: 1,
      questionText:
        "整式 $P(x) = x^3 - 2 x + 5$ を **$x - 1$** で割ったときの **余り** はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "整式を実際に割り算する代わりに、**$P(x) = (x - 1) Q(x) + R$** と書いてみよう。両辺の $x$ に **ある値** を代入すると、$Q(x)$ の部分を **消して** $R$ だけを残せないかな？",
        },
        {
          layer: 2,
          text:
            "$(x - 1) Q(x)$ を $0$ にしたい。**$x - 1 = 0$ になる $x$ の値** は何？ その値を両辺に代入すると、右辺は $R$ だけになり、左辺は $P(x)$ の **その値での値** になる。",
        },
        {
          layer: 3,
          text:
            "$x = 1$ を代入すると、$(1 - 1) Q(1) = 0$ で消える。左辺は $P(1) = 1 - 2 + 5 = 4$。両辺を等しいとすると **$R = 4$**。**$P(x)$ を $x - a$ で割った余りは、$x = a$ を代入した値 $P(a)$ そのもの**——これが [剰余の定理]。割り算を実行せずに、$1$ 点での値だけで余りが取り出せる。",
        },
      ],
      formulaPreview: "R = P(1) = 1 − 2 + 5 = 4",
      figureMarker: "<<REMAINDER_STEP1>>",
    },
    // ---- Step 2 ----
    {
      id: "step2",
      position: 2,
      questionText:
        "整式 $P(x) = 3 x^3 - 2 x^2 + x - 7$ を **$x - 2$** で割ったときの余りはいくつでしょう？",
      answer: 11,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。整式の中身と、割る式 $x - a$ の $a$ が変わっただけ。同じレシピで余りが出せる？",
        },
        {
          layer: 2,
          text:
            "Step 1 では $x - 1 = 0$ から $x = 1$ を代入した。**今は $x - 2$ で割る**——どの値を代入すれば $(x - 2) Q(x)$ が消える？",
        },
        {
          layer: 3,
          text:
            "$x = 2$ を代入する。$P(2) = 3 \\cdot 8 - 2 \\cdot 4 + 2 - 7 = 11$、よって余り **$R = 11$**。$x - a$ の $a$ が変わっただけで、Step 1 と全く同じレシピ——**割り算は実行せず、代入で済む**。",
        },
      ],
      formulaPreview: "R = P(2) = 24 − 8 + 2 − 7 = 11",
    },
    // ---- Step 3 ----
    {
      id: "step3",
      position: 3,
      questionText:
        "整式 $P(x) = x^4 - 3 x^2 + 5$ を **$x + 1$** で割ったときの余りはいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は割る式が $x + 1$。同じレシピで余りを出すには、**何を代入する** のがちょうど合う？",
        },
        {
          layer: 2,
          text:
            "剰余の定理は「$P(x)$ を $x - a$ で割った余り $= P(a)$」だった。**$x + 1 = x - (-1)$** と読み直すと、ここでの $a$ はいくつ？",
        },
        {
          layer: 3,
          text:
            "$a = -1$ なので $P(-1) = (-1)^4 - 3 (-1)^2 + 5 = 1 - 3 + 5 = 3$、余り **$R = 3$**。**割る式が $x + 1$ でも $x + 7$ でも、$x - a$ の $a$ を符号反転して読めばよい**——剰余の定理は $a$ の符号に関係なく使える。",
        },
      ],
      formulaPreview: "R = P(−1) = 1 − 3 + 5 = 3",
    },
    // ---- Step 4 ----
    {
      id: "step4",
      position: 4,
      questionText:
        "整式 $P(x) = x^3 + 2 x^2 - 5 x - 6$ を **$x - 2$** で割ったときの余りはいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**前題までと同じレシピ** で余りを計算してみよう。ただ、結果に **特別な意味** が出るかも——よく見てみて。",
        },
        {
          layer: 2,
          text:
            "$P(2)$ を計算するといくつになる？ もし $0$ になったら、$P(x) = (x - 2) Q(x) + R$ で $R = 0$——つまり $P(x)$ は $x - 2$ で **割り切れる**。これは $x - 2$ が $P(x)$ の何？",
        },
        {
          layer: 3,
          text:
            "$P(2) = 8 + 8 - 10 - 6 = 0$、余り **$R = 0$**。これは **$P(x)$ が $x - 2$ で割り切れる** という意味——つまり $x - 2$ は $P(x)$ の **因数**。さらに $P(2) = 0$ は **$x = 2$ が $P(x) = 0$ の解** ということ。**「$P(a) = 0$ ⟺ $x - a$ が因数 ⟺ $x = a$ が解」**——これが [因数定理]。剰余の定理の特殊化で、$1$ 点での値が、整式の大域構造（因数分解・解）を見抜く。",
        },
      ],
      formulaPreview: "P(2) = 8 + 8 − 10 − 6 = 0 → x − 2 は因数",
      figureMarker: "<<REMAINDER_STEP4>>",
    },
    // ---- Step 5 ----
    {
      id: "step5",
      position: 5,
      questionText:
        "整式 $P(x) = x^3 - 7 x + 6$ を **$x - 1$** で割ったときの余りはいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**前題と同じレシピ**——$x - 1 = 0$ になる値を代入するだけ。結果は何になる？",
        },
        {
          layer: 2,
          text:
            "$P(1)$ を計算するといくつ？ もし $0$ になったら、Step 4 と同じ「$P(x)$ が $x - 1$ で割り切れる」状況になる。",
        },
        {
          layer: 3,
          text:
            "$P(1) = 1 - 7 + 6 = 0$、余り **$R = 0$**。$x - 1$ は $P(x)$ の因数で、$x = 1$ は $P(x) = 0$ の解。実際 $P(x) = (x - 1)(x^2 + x - 6) = (x - 1)(x + 3)(x - 2)$ と因数分解できて、解は $1, -3, 2$。**Step 4 と同じレシピ——$1$ 点での値が $0$ なら、その点で式が割り切れる**。",
        },
      ],
      formulaPreview: "P(1) = 1 − 7 + 6 = 0",
    },
    // ---- Step 6 ----
    {
      id: "step6",
      position: 6,
      questionText:
        "整式 $P(x) = 2 x^3 + x^2 - x + 1$ を **$2 x - 1$** で割ったときの余りはいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "余り R",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1〜5 では割る式が $x - a$（$x$ の係数が $1$）の形だった**。今は $2 x - 1$——同じレシピで余りを出すには、**何を代入すれば** $(2 x - 1) Q(x)$ が消える？",
        },
        {
          layer: 2,
          text:
            "$2 x - 1 = 0$ となる $x$ はいくつ？ その値を $P(x)$ に代入すれば、$(2 x - 1) Q(x)$ の部分は消えて、左辺は $P$ のその値での値、右辺は余り $R$ だけになる。",
        },
        {
          layer: 3,
          text:
            "$2 x - 1 = 0$ から $x = 1/2$。$P(1/2) = 2 \\cdot \\dfrac{1}{8} + \\dfrac{1}{4} - \\dfrac{1}{2} + 1 = \\dfrac{1}{4} + \\dfrac{1}{4} - \\dfrac{1}{2} + 1 = 1$、余り **$R = 1$**。**割る式の「ゼロ点」を代入すれば、余りはそこでの値そのまま**——$x - a$ でも $2 x - 1$ でも $3 x + 5$ でも同じ。剰余の定理は $1$ 次式 $a x + b$ で割るときに広く効く。",
        },
      ],
      formulaPreview: "R = P(1/2) = 1/4 + 1/4 − 1/2 + 1 = 1",
      figureMarker: "<<REMAINDER_STEP6>>",
    },
    // ---- Step 7 ----
    {
      id: "step7",
      position: 7,
      questionText:
        "整式 $P(x) = x^3 + a x^2 - 3 x + 5$ を **$x - 1$** で割ったときの余りが **$4$** であるとき、$a$ の値はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "係数 a",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1〜6 は「整式 → 余り」の向きだった**。今は逆——「余り → 係数」。余りが $4$ という条件は、**剰余の定理を逆向きに読む** と何を意味する？",
        },
        {
          layer: 2,
          text:
            "Step 1〜6 で「余りは $P(a)$」と分かった。今は **余りが $4$** と分かっている——だから $P(1)$ はいくつ？ そして $P(1)$ を **$a$ を使った式** で書くと？",
        },
        {
          layer: 3,
          text:
            "$P(1) = 1 + a - 3 + 5 = a + 3$ で、これが $4$ に等しい：$a + 3 = 4$、よって **$a = 1$**。**剰余の定理は両向きに使える——余りが分かれば $1$ 点での値が分かり、未知の係数が決定できる**。「既知の点での値から係数を逆算する」フィッティングの最も素直な形。",
        },
      ],
      formulaPreview: "P(1) = a + 3 = 4 → a = 1",
    },
    // ---- Step 8 ----
    {
      id: "step8",
      position: 8,
      questionText:
        "整式 $P(x) = x^3 + a x^2 + b x + 6$ が **$x - 1$** で割り切れ、かつ **$x + 2$** でも割り切れる。このとき $a$ の値はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "係数 a",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 7 では「余りの条件 $1$ つ」で $a$ を決めた**。今は条件が **$2$ つ** に増えていて、未知の文字も $a, b$ の $2$ つ。**因数定理を $2$ 回使う** とどうなる？",
        },
        {
          layer: 2,
          text:
            "「$x - 1$ で割り切れる」⟺ $P(1) = ?$、「$x + 2$ で割り切れる」⟺ $P(-2) = ?$——どちらも右辺は同じ値になる。これで $a, b$ についての方程式が $2$ 本立つ。",
        },
        {
          layer: 3,
          text:
            "$P(1) = 1 + a + b + 6 = a + b + 7 = 0$、$P(-2) = -8 + 4 a - 2 b + 6 = 4 a - 2 b - 2 = 0$。連立すると $a + b = -7$、$2 a - b = 1$。辺々加えて $3 a = -6$、**$a = -2$**（このとき $b = -5$）。**情報が増えると因数定理を複数回使って連立**——$1$ 点での代入を「複数の点で同時に要求」する形。",
        },
      ],
      formulaPreview: "P(1) = a + b + 7 = 0, P(−2) = 4a − 2b − 2 = 0 → a = −2",
    },
    // ---- Step 9 ----
    {
      id: "step9",
      position: 9,
      questionText:
        "整式 $P(x) = x^3 + 2 x^2 + 3 x + 4$ を **$(x - 1)(x + 2)$** で割ったときの余り $r(x)$ の **定数項** はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "余りの定数項",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1〜8 では割る式が $1$ 次だったから、余りは「ただの数」だった**。今度は割る式が $2$ 次——**余りは何次までの式** になる？ その形を文字で置いてみよう。",
        },
        {
          layer: 2,
          text:
            "割り算では「余りの次数は除数の次数より小さい」が原則。除数が $2$ 次なら余りは **$1$ 次まで**——つまり $r(x) = p x + q$。$P(x) = (x - 1)(x + 2) Q(x) + (p x + q)$ と書いて、$x = 1$ と $x = -2$ を **両方** 代入すると何が見える？",
        },
        {
          layer: 3,
          text:
            "$(x - 1)(x + 2)$ は $x = 1$ でも $x = -2$ でも $0$。だから $P(1) = p + q$、$P(-2) = -2 p + q$。実際の値は $P(1) = 1 + 2 + 3 + 4 = 10$、$P(-2) = -8 + 8 - 6 + 4 = -2$。連立 $p + q = 10$、$-2 p + q = -2$ を解いて $p = 4, q = 6$、つまり余りは **$4 x + 6$**、定数項は **$6$**。**除数が $2$ 次でも、剰余の定理を $2$ 回（除数のゼロ点ごとに）使えばよい**——「割り算 → 代入」の翻訳が、より高次の除数にも拡張できる。",
        },
      ],
      formulaPreview: "r(x) = 4x + 6 → 定数項 = 6",
      figureMarker: "<<REMAINDER_STEP9>>",
    },
    // ---- Step 10 ----
    {
      id: "step10",
      position: 10,
      questionText:
        "整式 $P(x) = x^3 + a x^2 + b x + 1$ を **$(x - 1)(x + 1)$** で割ったときの余りが **$2 x + 3$** となるような $a$ の値はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "係数 a",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**Step 9 では「割り算 → 余りの式」の向き、Step 7 では「余り → 係数」の向きだった**。今はその **合わせ技**——余りの式 $2 x + 3$ から、$P(x)$ の係数 $a, b$ を逆向きに決める。Step 9 の式を **そのまま逆向きに** 読むとどうなる？",
        },
        {
          layer: 2,
          text:
            "$x = 1$ と $x = -1$ を $P(x) = (x - 1)(x + 1) Q(x) + (2 x + 3)$ に代入すると、左辺は $P(1), P(-1)$、右辺は余りに値を入れて $5, 1$。左辺を $a, b$ を使って書くと、$a, b$ についての方程式が $2$ 本——どう連立する？",
        },
        {
          layer: 3,
          text:
            "$P(1) = 1 + a + b + 1 = a + b + 2 = 5$、$P(-1) = -1 + a - b + 1 = a - b = 1$。連立して $a + b = 3$、$a - b = 1$、辺々加えて $2 a = 4$、**$a = 2$**（このとき $b = 1$）。**Step 9 の構造（除数 $2$ 次 → 余り $1$ 次・$2$ 点代入）と Step 7 の発想（余りから係数を逆算）を合わせ技にする**——剰余の定理は「割り算 → 代入」の翻訳道具として、両向き・複数点で広く効く。$n$ 次方程式の解探索（因数定理を繰り返して因数分解する）まで一気通貫の地続き。",
        },
      ],
      formulaPreview: "P(1) = a + b + 2 = 5, P(−1) = a − b = 1 → a = 2",
    },
  ],
  derivation: `**中心の問い** ｜ 割り算をせずに、整式の「余り」や「因数」を見抜くには？

────────

**整式の「余り」は、ある $1$ 点での「代入値」に化ける——割り算を実行する必要はない。**

整式 $P(x)$ を $1$ 次式 $x - a$ で割ったときの **商** を $Q(x)$、**余り** を $R$（定数）とすると、

$$P(x) = (x - a) Q(x) + R$$

——この等式の右辺で $x = a$ を代入すると、$(a - a) Q(a) = 0$ なので $Q$ の部分が **消え**、

$$P(a) = R$$

つまり **余り $R$ は、$P(x)$ に $x = a$ を代入した値そのもの**。これが [剰余の定理]。

**なぜ嬉しいか**：$P(x)$ の次数が大きいと、実際に割り算を実行するのはとても面倒（$10$ 次なら手計算で泣くレベル）。でも剰余の定理を使えば、**$x = a$ を $1$ 度代入するだけで余りが出る**——「割り算」という重い操作が「$1$ 点での代入」という軽い操作に置き換わる。

**例**：$P(x) = x^3 - 2 x + 5$ を $x - 1$ で割った余り → $P(1) = 1 - 2 + 5 = 4$（Step 1）。$P(x) = 3 x^3 - 2 x^2 + x - 7$ を $x - 2$ で割った余り → $P(2) = 11$（Step 2）。

────────

**特に「余りが $0$」の場合：因数定理**

剰余の定理で **$R = P(a) = 0$** になる場合は、特別な意味を持つ：

$$P(x) = (x - a) Q(x) + 0 = (x - a) Q(x)$$

——つまり **$P(x)$ は $x - a$ で割り切れる**、言い換えると **$x - a$ は $P(x)$ の因数**。さらに $P(a) = 0$ は、**$x = a$ が方程式 $P(x) = 0$ の解** という意味でもある。

| 同じ事柄の $3$ 通りの言い方 |
|---|
| $P(a) = 0$（$1$ 点での値が $0$） |
| $x - a$ が $P(x)$ の **因数**（割り切れる） |
| $x = a$ が $P(x) = 0$ の **解** |

——これらが $3$ つとも **同じ事柄** であることを保証するのが [因数定理]。剰余の定理の特殊化で、**$1$ 点での値（代入）が、整式の大域構造（因数分解・解）を見抜く** という重要な翻訳。

**例**：$P(x) = x^3 + 2 x^2 - 5 x - 6$ → $P(2) = 0$ なので $x - 2$ は因数（Step 4）。実際 $(x - 2)$ で割り算すると $P(x) = (x - 2)(x^2 + 4 x + 3) = (x - 2)(x + 1)(x + 3)$、解は $2, -1, -3$。**$1$ 点で値が $0$ になることを発見できれば、そこから高次方程式の因数分解と解探索が一気に進む**——これが因数定理の威力。

────────

**$1$ 次式 $a x + b$ で割る場合：ゼロ点を代入**

剰余の定理は $x - a$ という「モニックな」（$x$ の係数 $= 1$）$1$ 次式だけでなく、**一般の $1$ 次式 $a x + b$ で割る場合** にも自然に拡張できる。

$$P(x) = (a x + b) Q(x) + R$$

——$a x + b = 0$ となる $x$、つまり $x = -b / a$（**$1$ 次式のゼロ点**）を代入すれば、

$$P\\!\\left(-\\dfrac{b}{a}\\right) = R$$

**例**：$P(x) = 2 x^3 + x^2 - x + 1$ を $2 x - 1$ で割った余り → $2 x - 1 = 0$ から $x = 1/2$、$P(1/2) = 1$（Step 6）。**「割る式のゼロ点を代入する」と一般化** すれば、$x - a$ も $a x + b$ も統一的に扱える。

────────

**両向きに使える：余り → 係数の逆算**

剰余の定理は **両向きに使える** 翻訳道具：

- **整式 → 余り**（Step 1〜6）：$P(x)$ と $a$ が与えられ、余り $R = P(a)$ を計算
- **余り → 係数**（Step 7〜10）：余りが与えられ、$P(x)$ の未知係数を逆算

逆向きはこういう状況で効く——$P(x)$ に未知の係数 $a, b$ が含まれていて、「$x - p$ で割った余り」「$x - q$ で割った余り」が分かっているとき、$P(p) = ?$、$P(q) = ?$ という条件式が立つ。これらを $a, b$ についての連立方程式と見て解けば、係数が決まる。

**例**（Step 8）：$P(x) = x^3 + a x^2 + b x + 6$ が $x - 1$ と $x + 2$ で **割り切れる**（余り $= 0$）とき、$P(1) = a + b + 7 = 0$、$P(-2) = 4 a - 2 b - 2 = 0$。連立して $a = -2, b = -5$。**割り切れる条件は因数定理の言い換え——「$1$ 点で値が $0$」を $2$ 点同時に要求している**。

────────

**除数の次数を上げる：余りが多項式に**

割り算では **「余りの次数は除数の次数より小さい」** が原則。これまでは除数が $1$ 次だから余りは定数だったが、除数が $2$ 次になると **余りは $1$ 次式 $p x + q$** になる。

$$P(x) = (x - a)(x - b) Q(x) + (p x + q)$$

——両辺で $x = a$ と $x = b$ を **両方** 代入すると、$(x - a)(x - b) Q(x)$ は $0$ になるから、

$$P(a) = p a + q, \\quad P(b) = p b + q$$

これは $p, q$ についての $2$ 本の連立方程式。剰余の定理を **除数のゼロ点ごとに $1$ 回ずつ** 使えばよい。

**例**（Step 9）：$P(x) = x^3 + 2 x^2 + 3 x + 4$ を $(x - 1)(x + 2)$ で割った余りは？ $P(1) = 10 = p + q$、$P(-2) = -2 = -2 p + q$、連立して $p = 4, q = 6$、余りは $4 x + 6$。**「$1$ 点の代入」を「$n$ 点の代入」に増やせば、より高次の除数にも翻訳が拡張できる**。

**逆向きの composite**（Step 10）：除数が $(x - 1)(x + 1)$、余りが $2 x + 3$ と分かっているとき、$P(1) = 5$、$P(-1) = 1$ という条件で未知係数を連立——「余り → 係数」の逆向きが、除数 $2$ 次の場合にも同じ枠組みで効く。**「割り算 ⟺ $n$ 点での代入」という翻訳が、両向き・複数点で完成する瞬間**。

────────

**もっと深く** — Lagrange 補間・代数閉体・局所⇄大域

**Lagrange 補間との関係**：剰余の定理を逆向きに使うと、「$n$ 個の点での値が分かっている整式」を **一意に再構成** できる（次数 $\\leq n - 1$ の整式）。$P(x_1) = y_1, \\dots, P(x_n) = y_n$ から $P(x)$ を組み立てる **Lagrange 補間公式** は、剰余の定理を $n$ 点に拡張した姿。整式の世界では「$n$ 点の値 = $n - 1$ 次の整式」が等価。これは数値解析・データフィッティング・暗号（秘密分散）・誤り訂正符号（Reed-Solomon）の土台。

**代数閉体・代数学の基本定理との関係**：因数定理を繰り返し使うと、$n$ 次の整式は **$n$ 個の因子 $(x - \\alpha_i)$ に分解** できる（重根を含めて）——ただし係数の範囲を **複素数** まで広げる必要がある（**代数学の基本定理**）。実数係数の範囲では $x^2 + 1$ は因数分解できないが、複素数の中では $(x - i)(x + i)$ と分解できる。**因数定理 + 代数閉体（複素数）の組合せ** が、$n$ 次方程式の解の存在と因数分解の完備性を保証する。これが [解と係数の関係] の基盤でもある。

**$p$-進評価・局所⇄大域**：「$1$ 点での値で大域構造を見抜く」という剰余の定理の発想は、より高度な代数では **局所環・$p$-進評価** に発展する——「ある場所での挙動」を見て「全体での性質」を判定する手法は数論の根幹。$\\mathbb{Z}/p\\mathbb{Z}$ 上の多項式環でも同じ剰余の定理が成り立ち、これが整数論・暗号理論の基礎の $1$ つ。

**ホーナー法**：実際に $P(a)$ を計算するとき、$x^n + a_{n-1} x^{n-1} + \\cdots + a_0$ をそのまま代入すると重い。$( \\cdots ((a_n x + a_{n-1}) x + a_{n-2}) x + \\cdots ) x + a_0$ と入れ子で書き直すと、$n$ 回の乗算で済む——これが **ホーナー法**。剰余の定理と組み合わせて、高次方程式の解候補（有理解定理で候補を絞り、ホーナー法で代入チェック）を一気に検証する古典的アルゴリズム。

**応用の広がり**：

- **整数係数高次方程式の解探索**：有理解定理で候補を絞り、剰余の定理（因数定理）で値を試して因数を見つける
- **多項式の補間・近似**：少数のサンプル点から関数を再構成
- **誤り訂正符号**：Reed-Solomon 符号は多項式の補間と剰余演算の構造
- **暗号**：Shamir の秘密分散・楕円曲線暗号
- **代数幾何**：「点での値が $0$ ⟺ 多様体に含まれる」という発想は剰余の定理の幾何化

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $2$ 章「複素数と方程式」§ $5$「剰余の定理・因数定理」の節構成（剰余の定理 → 因数定理 → 余りからの逆算 → 高次除数）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「割り算をせずに、整式の「余り」や「因数」を見抜くには？」——その答えが、

**整式の余りは、ある $1$ 点での代入値 $P(a)$ そのもの——割り算を実行する必要はない。さらに「余り $= 0$」なら因数で、「$n$ 点での代入値」から $n$ 次未満の整式が再構成できる。**

これは **多項式の大域的構造（割り算・因数分解・解）が、$1$ 点（あるいは数点）での代入値に化ける** という、整式の世界の基本的な翻訳定理。剰余の定理は両向きに使え（余り → 係数の逆算）、$n$ 次の除数や高次の補間にも自然に拡張される。Lagrange 補間・代数学の基本定理・$p$-進評価・誤り訂正符号——「点での値で大域を見抜く」という $1$ つの発想が、現代数学・情報理論の広い場面に通底する深い射程の入口です。`,
};

/* ===== LO1: 軌跡 ===== */
export const ADV_LOCUS_SERIES: LearnerSeries = {
  id: "adv_locus_01",
  title: "軌跡",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 距離条件を式に翻訳すれば、点 $P$ の軌跡は円・直線・放物線になる。「ある条件を満たしながら動く点が描く図形」を $10$ 問で身につける。",
  patternId: "LO1",
  unit: "advanced",
  revelationLabel:
    "距離条件を $x, y$ の式に書き、両辺を $2$ 乗して整理すれば、軌跡の方程式（円・直線・放物線）が現れる",
  drivingQuestion:
    "動く点が描く図形を、距離の条件から「式」で見抜くには？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "点 $P(x, y)$ が「原点 $O$ からの距離が $3$」という条件を満たしながら動く。$P$ の軌跡は $x^2 + y^2 = N$。$N$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "条件「$OP = 3$」を、$x$ と $y$ の式に書くとどうなる？",
        },
        {
          layer: 2,
          text:
            "$OP$（原点からの距離）はルートで書ける。書いた式の **両辺はどちらも $0$ 以上** だから、何をするときれいになる？",
        },
        {
          layer: 3,
          text:
            "$OP = \\sqrt{x^2 + y^2} = 3$。両辺を $2$ 乗すると $x^2 + y^2 = 9$。**両辺が非負なので $2$ 乗は同値変形** ——これが軌跡の式を出すレシピ。$N = 9$。",
        },
      ],
      formulaPreview: "OP = 3 → √(x²+y²) = 3 → x² + y² = 9",
      figureMarker: "<<LOCUS_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "点 $P(x, y)$ が原点 $O$ から距離 $5$ の条件で動く。軌跡 $x^2 + y^2 = N$ の $N$ は？",
      answer: 25,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "**前題と比べてみよう**。何が同じで、何が違う？" },
        {
          layer: 2,
          text:
            "中心（原点）も式の形（$\\sqrt{x^2 + y^2}$）も同じ。**変わったのは距離だけ**。$2$ 乗するとどうなる？",
        },
        {
          layer: 3,
          text:
            "前題 $OP = 3$ で右辺 $= 3^2 = 9$ だった。今は $OP = 5$ なので、変わるのは右辺の $2$ 乗だけ：$5^2 = 25$。$N = 25$。",
        },
      ],
      formulaPreview: "OP = 5 → x² + y² = 25",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "点 $P(x, y)$ が「定点 $A(1, 3)$ からの距離が $4$」の条件で動く。軌跡は $(x - 1)^2 + (y - 3)^2 = N$。$N$ は？",
      answer: 16,
      unit: "",
      unknownLabel: "右辺 N",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "**前題と比べてみよう**。中心の位置が変わっただけ。距離の式はどう変わる？" },
        {
          layer: 2,
          text:
            "原点 $(0, 0)$ から → 点 $(1, 3)$ から。$\\sqrt{}$ の中身の **引き算** に注目すると？",
        },
        {
          layer: 3,
          text:
            "前題は $\\sqrt{x^2 + y^2}$（中心が原点）。今は $\\sqrt{(x - 1)^2 + (y - 3)^2}$（中心が $(1, 3)$）。距離 $= 4$ なので両辺 $2$ 乗して $(x-1)^2 + (y-3)^2 = 16$。$N = 16$。",
        },
      ],
      formulaPreview: "AP = 4 → (x−1)² + (y−3)² = 16",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "点 $P$ が「原点 $O$ と点 $A(3, 0)$ からの距離の比が $OP : AP = 2 : 1$」の条件で動く。**距離の比が一定の点の軌跡は円**（アポロニウスの円）になる。軌跡は中心 $(N, 0)$、半径 $2$ の円。$N$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "中心の x 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**Step 3 までは「距離 = 定数」だった。今度は「距離の比 = 一定」**。条件「$OP : AP = 2 : 1$」を **等式** にしてみよう。",
        },
        {
          layer: 2,
          text:
            "比は等式に直せる：$OP = 2 AP$。$OP$ も $AP$ も $\\sqrt{}$ で書ける。今までと同じく **両辺 $2$ 乗** すると、どんな形に整理できる？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{x^2 + y^2} = 2 \\sqrt{(x-3)^2 + y^2}$ を $2$ 乗：$x^2 + y^2 = 4((x-3)^2 + y^2)$。展開して整理し平方完成すると $(x - 4)^2 + y^2 = 4$ ——中心 $(4, 0)$、半径 $2$ の円。**距離条件 → $2$ 乗 → 展開 → 平方完成、はこれまでと同じレシピ**。$N = 4$。",
        },
      ],
      formulaPreview: "(x−4)² + y² = 4 → 中心 (4, 0)、半径 2",
      figureMarker: "<<LOCUS_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "点 $P$ が「原点 $O$ と点 $A(0, 6)$ からの距離の比が $OP : AP = 2 : 1$」の条件で動く。軌跡は中心 $(0, N)$ の円。$N$ はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "中心の y 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "**前題と比べてみよう**。比は同じ $2 : 1$。点 $A$ がどう動いた？" },
        {
          layer: 2,
          text:
            "$A$ は $x$ 軸上 $(3, 0)$ から $y$ 軸上 $(0, 6)$ へ。手順は同じ：$OP = 2 AP$ → $2$ 乗 → 平方完成。中心はどの軸上に来る？",
        },
        {
          layer: 3,
          text:
            "前題と同じレシピで $\\sqrt{x^2 + y^2} = 2 \\sqrt{x^2 + (y - 6)^2}$、$2$ 乗・整理・平方完成 → $x^2 + (y - 8)^2 = 16$。前題は $x$ 方向に中心がシフトしたが、今は $A$ が $y$ 軸上なので **$y$ 方向にシフト**。$N = 8$。",
        },
      ],
      formulaPreview: "x² + (y−8)² = 16 → 中心 (0, 8)、半径 4",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "点 $P$ が「$2$ 点 $A(0, 0)$ と $B(6, 0)$ から **等距離**」の条件で動く。**$2$ 点から等距離の軌跡は直線（[垂直二等分線]）**。軌跡の方程式は $x = N$。$N$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x = ?",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4–5 の距離の比が $2 : 1$ だった。今は $1 : 1$（等距離）。同じ式の中で「比 $= 1$」にしたとき、何が起きる？**",
        },
        {
          layer: 2,
          text:
            "$AP = BP$ を $2$ 乗すると **$2$ 乗の項が左右で同じ** になる。何が残って何が消える？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{x^2 + y^2} = \\sqrt{(x - 6)^2 + y^2}$ を $2$ 乗：$x^2 + y^2 = (x-6)^2 + y^2$。展開すると $x^2$ と $y^2$ が両辺で消えて、$0 = -12x + 36$ という **$1$ 次式**（直線）が残る。比 $= 1$ の極限では円が「無限に大きくなって直線に化ける」。$N = 3$。",
        },
      ],
      formulaPreview: "AP = BP → x = 3（線分 AB の垂直二等分線）",
      figureMarker: "<<LOCUS_STEP6>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "点 $P$ が「$2$ 点 $A(0, 2)$ と $B(0, 10)$ から等距離」の条件で動く。軌跡の方程式は $y = N$。$N$ はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "y = ?",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "**前題と比べてみよう**。$2$ 点が $x$ 軸上 → $y$ 軸上に動いた。残る方の文字は？" },
        {
          layer: 2,
          text:
            "$2$ 乗で **$x^2 + y^2$ の項が消える** のは同じ。違うのは「$x$ 方向に並ぶ $2$ 点」か「$y$ 方向に並ぶ $2$ 点」か——どっちの $1$ 次式が残る？",
        },
        {
          layer: 3,
          text:
            "$\\sqrt{x^2 + (y-2)^2} = \\sqrt{x^2 + (y-10)^2}$、$2$ 乗で $x^2 + y^2$ が消えて $(y-2)^2 = (y-10)^2$ → $16y = 96$。前題は $x$ の $1$ 次式が残ったが、今は **$y$ の $1$ 次式**。$N = 6$。",
        },
      ],
      formulaPreview: "AP = BP → y = 6",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "点 $P$ が「$x$ 軸との距離と、定点 $A(0, 4)$ からの距離が等しい」条件で動く。**直線と定点から等距離の軌跡は放物線**。軌跡 $y = \\dfrac{x^2}{8} + N$ の $N$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "頂点の y 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 6–7 は「$2$ 点から等距離」だった。今度は「直線（$x$ 軸）と $1$ 点から等距離」**。距離の式の片方の形が変わる。",
        },
        {
          layer: 2,
          text:
            "$x$ 軸との距離は $\\sqrt{}$ ではなく **$|y|$**。点との距離は今までと同じ $\\sqrt{}$。形が違う $2$ つを等式にして $2$ 乗すると？",
        },
        {
          layer: 3,
          text:
            "$|y| = \\sqrt{x^2 + (y-4)^2}$ を $2$ 乗：$y^2 = x^2 + y^2 - 8y + 16$。**$y^2$ が両辺で消えて $x^2$ だけが残る** → $y = x^2/8 + 2$。Step 6–7 では $1$ 次式が残ったが、今は **$2$ 乗の項 $x^2$ が片側だけに残るから放物線**。$N = 2$。",
        },
      ],
      formulaPreview: "y = x²/8 + 2（准線 = x 軸、焦点 = A(0, 4)）",
      figureMarker: "<<LOCUS_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "点 $P$ が「$x$ 軸との距離と、定点 $A(0, 10)$ からの距離が等しい」条件で動く。軌跡 $y = \\dfrac{x^2}{20} + N$ の $N$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "頂点の y 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "**前題と比べてみよう**。焦点 $A$ が $(0, 4)$ から $(0, 10)$ に上がった。何が変わる？" },
        {
          layer: 2,
          text:
            "手順は前題と同じ：$|y| = \\sqrt{x^2 + (y - 10)^2}$ を $2$ 乗。係数だけ変わる。頂点の位置は焦点の **何分の何** にある？",
        },
        {
          layer: 3,
          text:
            "$2$ 乗して整理：$0 = x^2 - 20 y + 100$ → $y = x^2/20 + 5$。前題 $A(0, 4)$ では頂点 $y = 2$（焦点と准線の中間）。今 $A(0, 10)$ なので頂点 $y = 5$（やはり焦点と准線の中間）。**頂点は焦点と准線の中点** という幾何が見える。$N = 5$。",
        },
      ],
      formulaPreview: "y = x²/20 + 5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "円 $x^2 + y^2 = 4$ 上を点 $Q$ が動く。定点 $A(14, 0)$ と点 $Q$ を結ぶ線分の **中点** $M$ の軌跡は中心 $(N, 0)$、半径 $1$ の円。$N$ はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "中点の軌跡の中心 x",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**これまでは「動く点 $P$ の距離条件」だった。今は「動く点 $Q$ が円上にあり、固定点 $A$ との中点 $M$ の経路」**。$Q$ を $1$ つの変数で書けないか？",
        },
        {
          layer: 2,
          text:
            "円上の点なら角度 $\\theta$ で書ける：$Q = (2\\cos\\theta, 2\\sin\\theta)$。中点 $M$ を $\\theta$ で表したあと、$\\theta$ を消すには「$\\cos^2 + \\sin^2$」の関係をどう使う？",
        },
        {
          layer: 3,
          text:
            "$M = ((14 + 2\\cos\\theta)/2, \\sin\\theta) = (7 + \\cos\\theta, \\sin\\theta)$。$M = (X, Y)$ とおくと $X - 7 = \\cos\\theta$、$Y = \\sin\\theta$。$\\cos^2 + \\sin^2 = 1$ から $(X - 7)^2 + Y^2 = 1$。**$\\theta$ を経由しても、最後は同じ「距離 = 一定」の円の式**。$N = 7$。",
        },
      ],
      formulaPreview: "(X − 7)² + Y² = 1 → 中心 (7, 0)、半径 1",
    },
  ],
  derivation: `**中心の問い** ｜ 動く点が描く図形を、距離の条件から「式」で見抜くには？

────────

**距離条件を $x, y$ の式に翻訳すれば、軌跡の方程式が現れる。**

「**軌跡**」とは、ある条件を満たしながら点が動くとき、その点が描く図形のこと。

たとえば点 $P$ が「原点 $O$ から距離が $1$ である」という条件を満たしながら動くと、$P$ の軌跡は **$O$ を中心とする半径 $1$ の円**。これは直観的に見えますが、**式で求める** とこうなる：

$$OP = 1 \\quad \\Longleftrightarrow \\quad \\sqrt{x^2 + y^2} = 1 \\quad \\Longleftrightarrow \\quad x^2 + y^2 = 1$$

両辺を $2$ 乗するだけで、軌跡の方程式が得られる——「**$P$ の満たすべき条件を $x, y$ の式に書き、それを変形する**」のが軌跡を求める基本手順。

**もう少しトリッキーな例**：原点 $O$ と点 $A(3, 0)$ からの距離の比が $OP : AP = 2 : 1$ である点 $P$ の軌跡は？

条件を式にする：

$$OP = 2 AP \\quad \\Longleftrightarrow \\quad \\sqrt{x^2 + y^2} = 2 \\sqrt{(x - 3)^2 + y^2}$$

両辺を $2$ 乗：

$$x^2 + y^2 = 4 ((x - 3)^2 + y^2)$$

展開して整理（[平方完成] も使う）：

$$3 x^2 - 24 x + 36 + 3 y^2 = 0 \\quad \\Longrightarrow \\quad (x - 4)^2 + y^2 = 4$$

——**中心 $(4, 0)$、半径 $2$ の円**。これが **アポロニウスの円**。距離の比が一定の点の軌跡は、思いがけず円になっている。

**条件から軌跡へ、変形のレシピ**：

| 条件 | 式 | 軌跡の形 |
|---|---|---|
| 定点 $A$ から距離一定 | $\\sqrt{(x - a)^2 + (y - b)^2} = r$ | 中心 $A$、半径 $r$ の **円** |
| $2$ 定点 $A, B$ から距離の比一定（$\\ne 1 : 1$） | $\\sqrt{\\dots} = k \\sqrt{\\dots}$ | **アポロニウスの円** |
| $2$ 定点 $A, B$ から **等距離**（$1 : 1$） | $\\sqrt{\\dots} = \\sqrt{\\dots}$ | $AB$ の **[垂直二等分線]**（直線） |
| 定点 $F$ と定直線 $\\ell$ から **等距離** | $\\sqrt{\\dots} = \\text{ 距離 }(\\text{ 点, 直線 })$ | **放物線**（焦点 $F$、准線 $\\ell$） |

距離条件が「$1 : 1$（等距離）」のときに直線に **退化** し、「定点と定直線の等距離」のときに放物線になる——同じ「距離の方程式」のレシピから、円・直線・放物線が場合分けで現れる景色。

────────

**もっと深く** — 「両辺を $2$ 乗する」変形の同値性、アポロニウスとケプラー

**「両辺を $2$ 乗する」は同値変形か？**：一般には $A = B$ と $A^2 = B^2$ は **同値ではない**（例：$1 = 1$ から $1^2 = (-1)^2$ は導けるが、$1^2 = (-1)^2$ から $1 = -1$ は導けない）。

しかし軌跡の問題で扱う $A, B$ は **距離**（または距離を表す式）で、**つねに非負**：$A \\geq 0, B \\geq 0$。このとき $A^2 = B^2 \\iff A = B$ が成り立つ——つまり **両辺を $2$ 乗する変形は必ず同値**。距離 $0$ 以上という保証つきだから、軌跡の方程式に安心してルートを外せる。

**アポロニウスの円の歴史**：「$2$ 点からの距離の比が一定の点の軌跡 → 円」は、古代ギリシャの数学者 **アポロニウス**（紀元前 $200$ 年頃）が幾何的に証明していた性質。彼は「式」を一切使わず、図形の性質だけで証明したそうです。私たちが今「$\\sqrt{(x-a)^2 + (y-b)^2} = k \\sqrt{\\dots}$」と書いて両辺を $2$ 乗する手法は、**$17$ 世紀のデカルト** が「座標系」を発明して初めて可能になった。約 $1800$ 年の時を経て、図形が「式」で扱えるようになった——その威力を体感する単元。

**放物線の幾何的定義**：「焦点 $F$ と准線 $\\ell$ から等距離の点の軌跡 = 放物線」は、ケプラーやガリレオが扱った形と一致します。物体を斜め上に投げると（重力下では）軌道が放物線になる——その「焦点と准線」の幾何が、力学にもつながっている。

**$3$ 次元への拡張**：軌跡の発想は $3$ 次元でも生きる。「定点から距離一定」→ **球**。「定直線から距離一定」→ **円柱**。「$2$ 定点から距離の和が一定」→ **楕円**（$2$ 次元の場合）、**回転楕円体**（$3$ 次元）。距離条件から $2$ 次曲面が全部出てくる。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $3$ 章「図形と方程式」§ $4$「軌跡」の節構成（距離条件 → アポロニウスの円 → 垂直二等分線 → 放物線）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「動く点が描く図形を、距離の条件から「式」で見抜くには？」——その答えが、

**距離を $x, y$ の式に翻訳し、両辺を $2$ 乗して整理すれば、軌跡の方程式が現れる。**

「距離一定」なら **円**、「距離の比一定」なら **アポロニウスの円**、「$2$ 点から等距離」なら **垂直二等分線**、「定点と定直線から等距離」なら **放物線**——条件によって図形は変わるが、**式から見抜く手順は同じ**。これがデカルトの座標系がもたらした「**図形を式で扱う**」哲学の真骨頂。`,
};

/* ===== PA1: 媒介変数表示 ===== */
export const ADV_PARAMETRIC_SERIES: LearnerSeries = {
  id: "adv_parametric_01",
  title: "媒介変数表示",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — $y = f(x)$ の枠を超えて、動く点を $x = f(t), y = g(t)$ で記述する。媒介変数を経由した動きの言語を $10$ 問で身につける。",
  patternId: "PA1",
  unit: "advanced",
  revelationLabel:
    "動く点を $x = f(t), y = g(t)$ で記述すれば、$y = f(x)$ では書けない経路も扱える。$t$ を消去すれば軌跡の方程式に戻り、変域を引き継げば軌跡の一部も扱える",
  drivingQuestion:
    "$y = f(x)$ では書けない動きを、もう $1$ つの変数 $t$ を経由して表すには？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "媒介変数 $t$ で動く点 $P$ が $x = t, \\ y = 7 t + 2$ と表される。$t$ を消去して $y = m x + n$ の形にしたとき、**傾き** $m$ はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "傾き m",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "**媒介変数 $t$ を「消す」とは何だろう？** $x = t$ という式から、$t$ を $x$ で表せないか？",
        },
        {
          layer: 2,
          text:
            "$x = t$ なら、$y$ の式の中の $t$ を $x$ に書き換えるとどうなる？",
        },
        {
          layer: 3,
          text:
            "$y = 7 t + 2$ の $t$ を $x$ に置き換えて $y = 7 x + 2$。これが $t$ を消去した直線。$y = m x + n$ の形と比較して $m = 7$。**媒介変数表示は直線にも使える**——ここから始まる。",
        },
      ],
      formulaPreview: "x = t → y = 7t + 2 → y = 7x + 2 → m = 7",
      figureMarker: "<<PARAMETRIC_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$x = t - 1, \\ y = 2 t + 5$ から $t$ を消去すると $y = m x + n$。傾き $m$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "傾き m",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$x$ の式が違う。$t$ を $x$ で表す方法は前題と同じ？",
        },
        {
          layer: 2,
          text:
            "前題は $x = t$ で「そのまま」だった。今は $x = t - 1$。$t$ を $x$ で表すにはどうする？",
        },
        {
          layer: 3,
          text:
            "前題は $t = x$ で一発代入だった。今は $t = x + 1$ と書き換えてから $y$ に代入：$y = 2(x + 1) + 5 = 2x + 7$、$m = 2$。**$x$ の式が違うだけで手順は同じ「$t$ を $x$ で表す → $y$ に代入」**。",
        },
      ],
      formulaPreview: "t = x + 1 → y = 2(x+1) + 5 = 2x + 7 → m = 2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$x = t + 4, \\ y = -t + 1$ から $t$ を消去すると $y = m x + n$。傾き $m$ はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "傾き m",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は $x = t + 4$。$t$ を $x$ で表すと？",
        },
        {
          layer: 2,
          text:
            "$y = -t + 1$ で $t$ にマイナスがついている。代入したら傾きの符号はどうなる？",
        },
        {
          layer: 3,
          text:
            "$t = x - 4$ を $y = -t + 1$ に代入：$y = -(x - 4) + 1 = -x + 5$、$m = -1$。**$y$ の $t$ の係数 = 傾き** ではなく、$x$ と $t$ の関係次第で符号が変わる——前題と同じレシピだが結果がマイナスになる場合。",
        },
      ],
      formulaPreview: "t = x − 4 → y = −x + 5 → m = −1",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "媒介変数 $\\theta$ で動く点 $P$ が $x = 2 + 3 \\cos\\theta, \\ y = 1 + 3 \\sin\\theta$ と表される。$\\theta$ を消去すると、軌跡は中心 $(2, 1)$ の円 $(x - 2)^2 + (y - 1)^2 = r^2$。$r^2$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "r²",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**ここまで $3$ 問は「$t$ が $x$ で表せる」直線だった。今は $\\cos\\theta, \\sin\\theta$ が混じる。** $\\theta$ を消す方法はどう変わる？",
        },
        {
          layer: 2,
          text:
            "$t$ を $x$ で表して代入、は使えない（$\\cos$ から $\\theta$ を取り出すのは大変）。代わりに **$\\cos^2 + \\sin^2 = 1$** という関係が使える——どう使う？",
        },
        {
          layer: 3,
          text:
            "Step 1–3 の「片方の式から $t$ を取り出して代入」が通用しない。代わりに **両辺 $2$ 乗して足す**：$(x - 2)^2 + (y - 1)^2 = 9 \\cos^2\\theta + 9 \\sin^2\\theta = 9$。$r^2 = 9$。**$\\theta$ の消去には三角恒等式を使う**——直線とは違うレシピが要る。",
        },
      ],
      formulaPreview: "(x − 2)² + (y − 1)² = 9 → r² = 9",
      figureMarker: "<<PARAMETRIC_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$x = 4 \\cos\\theta, \\ y = 4 \\sin\\theta$ から $\\theta$ を消去すると $x^2 + y^2 = r^2$。$r^2$ はいくつでしょう？",
      answer: 16,
      unit: "",
      unknownLabel: "r²",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。中心と半径が変わっただけ？",
        },
        {
          layer: 2,
          text:
            "$x = 4 \\cos\\theta, y = 4 \\sin\\theta$ は、前題の「中心」と「半径」がどう変わった？ 手順は同じか？",
        },
        {
          layer: 3,
          text:
            "中心 $(2, 1) \\to (0, 0)$、半径 $3 \\to 4$。$\\cos^2 + \\sin^2 = 1$ を使う手順は同じ：$x^2 + y^2 = 16 (\\cos^2\\theta + \\sin^2\\theta) = 16$。$r^2 = 16$。",
        },
      ],
      formulaPreview: "x² + y² = 16 → r² = 16",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$t$ を媒介変数とする放物線 $y = x^2 - 2 (t + 3) x + 6 t$ の **頂点** が描く軌跡を求めたい。頂点を $(X, Y)$ とおき $t$ を消去すると、軌跡は放物線 $y = -(x - 3)^2 - 9$。$t$ を消去して得た放物線の **頂点の $x$ 座標** はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "軌跡の頂点 x",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–5 は「動く点」の媒介変数表示だった。今は「動く放物線の頂点」の軌跡——係数の中に $t$ が住んでいる**。どこから $X, Y$ の媒介変数表示を取り出す？",
        },
        {
          layer: 2,
          text:
            "頂点を取り出すには [平方完成]。$y = x^2 - 2 (t + 3) x + 6t$ を平方完成すると、頂点はどんな式になる？",
        },
        {
          layer: 3,
          text:
            "$y = (x - (t + 3))^2 - t^2 - 9$ から頂点 $(t + 3, -t^2 - 9)$。これを $(X, Y)$ とおいて Step 1–3 と同じレシピで $t$ を消す：$X = t + 3$ → $t = X - 3$ を $Y$ に代入 → $Y = -(X - 3)^2 - 9$。軌跡の頂点は $(3, -9)$、$x = 3$。**「式の係数の中の $t$」も媒介変数として扱える**——$t$ の出てくる場所が変わっても同じレシピ。",
        },
      ],
      formulaPreview: "頂点 (t+3, −t²−9) → y = −(x−3)² − 9 → 頂点 (3, −9)",
      figureMarker: "<<PARAMETRIC_STEP6>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "前題と同じ放物線で、$t \\geq 1$ という **変域制限** がついた場合、軌跡の $x$ が動く範囲は $x \\geq N$。$N$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "変域の下限 N",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と同じ放物線。今は $t$ に「$t \\geq 1$」という制限がついた**。軌跡の $x$ の範囲はどう変わる？",
        },
        {
          layer: 2,
          text:
            "前題の $X = t + 3$ という関係を、**範囲のまま** 翻訳できないか？ $t \\geq 1$ なら $X = t + 3$ はどうなる？",
        },
        {
          layer: 3,
          text:
            "**媒介変数の変域は消去後の変数の変域に引き継がれる**：$t \\geq 1$ ⟺ $X = t + 3 \\geq 4$、つまり $N = 4$。前題は $t$ がすべての実数で軌跡が放物線全体だったが、制限つきだと放物線の **$x \\geq 4$ の部分のみ**（右側の一部）——制限が「軌跡の一部」を切り出す。",
        },
      ],
      formulaPreview: "t ≥ 1 ⟹ X = t + 3 ≥ 4 → x ≥ 4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "直線 $y = 5 x - 2$ 上を動く点 $Q$ と、定点 $A(0, 0)$ を結ぶ線分の **中点** $M$ の軌跡を求めたい。$Q$ を $(s, 5 s - 2)$ と媒介変数 $s$ で書くと、$M$ の軌跡は直線 $y = m x + n$。傾き $m$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "中点軌跡の傾き m",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–7 は「動く点 $1$ つ」の軌跡だった。今は「動く点 $Q$ と固定点 $A$ の中点 $M$」——$2$ つの点の関係から軌跡を作る**。中点 $M$ を媒介変数 $s$ でどう書く？",
        },
        {
          layer: 2,
          text:
            "$Q$ が直線上を動く → $Q = (s, 5 s - 2)$。$M = (A + Q) / 2$ を $s$ で書いてみよう。そこから Step 1–3 と同じく $s$ を消去すれば？",
        },
        {
          layer: 3,
          text:
            "$M = (s / 2, (5 s - 2) / 2)$。$X = s / 2$ → $s = 2 X$、$Y = (5 \\cdot 2 X - 2) / 2 = 5 X - 1$。軌跡 $y = 5 x - 1$、$m = 5$。**動く点を媒介変数で書く → 中点を $X, Y$ で書く → 消去** ——「動点の合成」も同じレシピ。",
        },
      ],
      formulaPreview: "M = (s/2, (5s−2)/2) → y = 5x − 1 → m = 5",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円 $x^2 + y^2 = 9$ 上を動く点 $Q$ と、定点 $A(12, 0)$ を結ぶ線分の **中点** $M$ の軌跡は、中心 $(N, 0)$ の円。$N$ はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "中点軌跡の中心 x",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$Q$ が動く図形が直線から円に変わった。中点の手順はどう？",
        },
        {
          layer: 2,
          text:
            "直線上の $Q$ は $1$ パラメータ $(s, 5s - 2)$ だった。円上の $Q$ は何で書く？ Step 4 を思い出すと？",
        },
        {
          layer: 3,
          text:
            "Step 4 と同じ円の媒介変数表示：$Q = (3 \\cos\\theta, 3 \\sin\\theta)$。$M = ((12 + 3 \\cos\\theta) / 2, 3 \\sin\\theta / 2) = (6 + (3/2) \\cos\\theta, (3/2) \\sin\\theta)$。Step 4 と同じく $\\cos^2 + \\sin^2 = 1$ で消去：$(X - 6)^2 + Y^2 = 9/4$、中心 $(6, 0)$、$N = 6$。**動く図形が直線から円に変わっても、媒介変数表示 + 消去のレシピは不変**。",
        },
      ],
      formulaPreview: "(X − 6)² + Y² = 9/4 → 中心 (6, 0)、半径 3/2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "放物線 $y = x^2$ 上を動く点 $P$ と、定点 $A(0, 2)$ を結ぶ線分の **中点** $M$ の軌跡は放物線 $y = 2 x^2 + N$。$N$ はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "中点軌跡の頂点 y",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。$Q$（今度は $P$）が動く図形が今度は放物線。$P$ を媒介変数でどう書く？",
        },
        {
          layer: 2,
          text:
            "放物線 $y = x^2$ 上の点は、$x$ を $1$ パラメータ $t$ に取れば $(t, t^2)$ と $1$ 行で書ける——円のように三角関数は要らない。あとは中点を $t$ で書いて消去するだけ。",
        },
        {
          layer: 3,
          text:
            "$P = (t, t^2)$、$M = (t / 2, (t^2 + 2) / 2)$。$X = t / 2$ → $t = 2 X$、$Y = (4 X^2 + 2) / 2 = 2 X^2 + 1$。軌跡 $y = 2 x^2 + 1$、頂点 $(0, 1)$、$N = 1$。**直線・円・放物線、どんな曲線上の動点でも「媒介変数で書く → 中点を $X, Y$ で書く → 消去」の同じレシピ**——媒介変数表示の汎用性。",
        },
      ],
      formulaPreview: "Y = (t² + 2)/2 = 2X² + 1 → 頂点 (0, 1)",
      figureMarker: "<<PARAMETRIC_STEP10>>",
    },
  ],
  derivation: `**中心の問い** ｜ $y = f(x)$ では書けない動きを、もう $1$ つの変数 $t$ を経由して表すには？

────────

**動きを「内側から」記述する——媒介変数 $t$ の発想。**

[軌跡] の単元では「距離条件 → $x, y$ の関係式 → 軌跡の方程式」という流れで、動く点の経路を **外側から見た形**（$F(x, y) = 0$ や $y = f(x)$）として捉えました。

しかし、世界には **$y = f(x)$ で書けない動き** がたくさんある：

- **円の上を回る点**：$x^2 + y^2 = r^2$ は陰関数。$y = \\pm \\sqrt{r^2 - x^2}$ と $2$ つに分けないと関数にできない
- **垂直な直線**：$x = 3$ は $y = f(x)$ では書けない（傾きが無限大）
- **ループや自己交差を持つ曲線**：レムニスケート（$\\infty$ 形）、サイクロイドなど
- **時刻に応じて動く物体**：物理の質点運動は $x(t), y(t)$ で書くのが自然

そこで発想を変えて、**動く点の $x$ と $y$ をそれぞれ、もう $1$ つの変数 $t$（時刻のイメージ）の関数として書く**：

$$x = f(t), \\quad y = g(t)$$

この $t$ を **媒介変数（パラメータ）** という。この書き方を **媒介変数表示** という。

**$y = f(x)$ と $x = f(t), y = g(t)$ の本質的な違い**：
- $y = f(x)$：$x$ を入力すると $y$ が決まる **外側からの形**
- $x = f(t), y = g(t)$：$t$（時刻）を入力すると **点 $(x, y)$ の位置** が決まる **内側からの動き**

**例 $1$ ：直線の媒介変数表示**：

$$x = t + 1, \\quad y = 2 t - 3$$

$t$ を消去すると、$t = x - 1$ なので $y = 2 (x - 1) - 3 = 2 x - 5$。軌跡は直線 $y = 2 x - 5$。

**例 $2$ ：円の媒介変数表示**：

$$x = r \\cos\\theta, \\quad y = r \\sin\\theta$$

$\\theta$ を消去すると、$\\cos^2\\theta + \\sin^2\\theta = 1$ から $x^2 + y^2 = r^2$。原点中心、半径 $r$ の円。**$\\theta$ は「中心から見た角度」という、円という図形の内側の言葉**。

**例 $3$ ：放物線の頂点の軌跡**（パラメータが係数の中に住んでいる例）：

$y = x^2 - 2 (t + 3) x + 6 t$ の頂点は、平方完成すると $(t + 3, -t^2 - 9)$。$X = t + 3, Y = -t^2 - 9$ とおいて $t$ を消去すると、軌跡は $y = -(x - 3)^2 - 9$。**放物線が動くと、その頂点もまた放物線を描く**——媒介変数で繋がる図形たち。

**$t$ を消去すれば軌跡の方程式に戻る**：媒介変数表示と軌跡の方程式 $F(x, y) = 0$ は、**同じ図形の表と裏**。

────────

**もっと深く** — 変域の引き継ぎ、$y = f(x)$ で書けない曲線、媒介変数微分

**変域の引き継ぎ**：媒介変数 $t$ に **変域の制限** がある場合、消去後の $x$（または $y$）の変域にも引き継がれる。

例：上の放物線で $t \\geq 0$ なら $X = t + 3 \\geq 3$ なので、軌跡は $y = -(x - 3)^2 - 9$ の **$x \\geq 3$ の部分のみ**（放物線の右半分）。$t$ の動く範囲が、軌跡の「見える部分」を決める。

**$y = f(x)$ で書けない曲線の例**：

| 曲線 | 媒介変数表示 | $x, y$ の関係式 |
|---|---|---|
| 円 | $x = r \\cos\\theta, y = r \\sin\\theta$ | $x^2 + y^2 = r^2$ |
| 楕円 | $x = a \\cos\\theta, y = b \\sin\\theta$ | $x^2/a^2 + y^2/b^2 = 1$ |
| 双曲線 | $x = a / \\cos\\theta, y = b \\tan\\theta$ | $x^2/a^2 - y^2/b^2 = 1$ |
| サイクロイド | $x = r(t - \\sin t), y = r(1 - \\cos t)$ | （簡単な陰関数で書けない） |
| リサジュー曲線 | $x = \\sin(\\alpha t), y = \\sin(\\beta t)$ | （複雑な周期パターン） |

特に **サイクロイド**（回転する車輪上の点が描く曲線）は、$y = f(x)$ では絶対に書けないが、媒介変数表示なら $2$ 行で書ける——「**動きの内側の言葉**」の威力が最大に出る例。

**物理：質点運動の自然な記述**：放物運動 $x = v_0 t \\cos\\theta, \\ y = v_0 t \\sin\\theta - \\frac{1}{2} g t^2$ のように、時刻 $t$ で位置 $(x, y)$ を記述するのは物理の基本。媒介変数表示は **物理の言語そのもの**。

**媒介変数微分（数Ⅲ）**：$x = f(t), y = g(t)$ で表される曲線の接線の傾きは、$\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt} = \\dfrac{g'(t)}{f'(t)}$ で計算できる。**$t$ を消去せずに、媒介変数のままで微分する** 道具で、円・楕円・サイクロイドの接線を求めるときに必須。

**ベクトル（数B / 数C）への橋渡し**：媒介変数表示 $(x, y) = (f(t), g(t))$ は、**位置ベクトル** $\\vec{p}(t) = f(t) \\vec{i} + g(t) \\vec{j}$ と同じ書き方。物理・$3$ 次元・関数解析へと自然に拡張する基盤。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $3$ 章「図形と方程式」§ $5$「媒介変数表示」の節構成（直接 $x, y$ で書きにくい軌跡を媒介変数で → 消去で軌跡へ → 変域の引き継ぎ → 動点の合成）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「$y = f(x)$ では書けない動きを、もう $1$ つの変数 $t$ を経由して表すには？」——その答えが、

**$x = f(t), y = g(t)$ という媒介変数表示。**

$t$（時刻のイメージ）を入力すると点の位置が決まる **動きの内側の言語**。$t$ を消去すれば軌跡の方程式に戻り、$t$ の変域を引き継げば軌跡の一部だけも表せる。物理の質点運動・微分・ベクトルへと **同じ発想で広がる「動きを式にする」技法** の入り口。`,
};

/* ===== RG1: 領域 ===== */
export const ADV_REGION_SERIES: LearnerSeries = {
  id: "adv_region_01",
  title: "領域",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 等式が描く境界線を、不等号は『どちら側の広がり』へと育てる。直線の上下／左右、円の内外を距離条件として読む技を $10$ 問で身につける。",
  patternId: "RG1",
  unit: "advanced",
  revelationLabel:
    "等式が境界線、不等号は『どちら側』を選ぶ——直線なら上下／左右、円なら距離条件 $OP \\gtrless r$ として内外を読む",
  drivingQuestion:
    "等式が描く境界線を、不等号は『どちら側の広がり』へとどう育てるのか——点の条件を、平面の領域として描くには？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "直線 $y = x + 1$ の **上側** の領域 $y > x + 1$ を考える。$x = 3$ のとき、この領域に含まれる $y$ は $y > N$ と書ける。境界の値 $N$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "**点 $(3, y)$ がこの領域に入るには $y$ がどんな値であればよい？** 境界の直線の式 $y = x + 1$ を $x = 3$ で考えるとどうなる？",
        },
        {
          layer: 2,
          text:
            "境界の直線で $x = 3$ を代入すると $y$ がいくつになる？ 領域は『上側』だから、そこから上か下か？",
        },
        {
          layer: 3,
          text:
            "境界の式 $y = x + 1$ に $x = 3$ を入れて $y = 4$——これが境界の値。領域は **上側** だから、領域に含まれるのは $y > 4$、$N = 4$。**等式が境界線、不等号は『どちら側』を選ぶ**——これが領域の入口。",
        },
      ],
      formulaPreview: "y = 3 + 1 = 4 → y > 4 → N = 4",
      figureMarker: "<<REGION_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ直線 $y = x + 1$ の上側 $y > x + 1$ で、$x = 5$ のとき $y > N$。$N$ はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。直線も向き（上側）も同じ。違うのは何？",
        },
        {
          layer: 2,
          text:
            "Step 1 と同じく、境界の式に $x$ を代入するだけ。手順は同じ。",
        },
        {
          layer: 3,
          text:
            "$x = 5$ → 境界 $y = 5 + 1 = 6$、$y > 6$、$N = 6$。**Step 1 と同じレシピで $x$ の値が違うだけ**——『境界の式に代入 → 上下を選ぶ』の繰り返し。",
        },
      ],
      formulaPreview: "y = 5 + 1 = 6 → N = 6",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "直線 $y = 2 x - 3$ の上側 $y > 2 x - 3$ で、$x = 4$ のとき $y > N$。$N$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は直線の式そのものが違う。手順はどう変わる？",
        },
        {
          layer: 2,
          text:
            "傾きや切片が変わっても、$x$ を代入して境界の $y$ を出す手順は同じ。",
        },
        {
          layer: 3,
          text:
            "$x = 4$ → 境界 $y = 2 \\cdot 4 - 3 = 5$、$y > 5$、$N = 5$。**Step 1–3 はすべて『直線の上側』の同じパターン**——傾きや切片が違っても、境界の式に代入する手順は不変。",
        },
      ],
      formulaPreview: "y = 2·4 − 3 = 5 → N = 5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "不等式 $x > 3$ を考える。これは直線 $x = 3$ の **右側** の領域。$y = 7$ のとき、領域に含まれる点 $(x, 7)$ の $x$ は $x > N$。境界の値 $N$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**ここまでは『上下』の領域だった。今は $x = 3$ という縦の直線——『上下』はあいまいになる**。何が違う？",
        },
        {
          layer: 2,
          text:
            "縦の直線 $x = 3$ には『上』も『下』もない。$y$ の値に関係なく、$x$ が大きいか小さいかで『右側』『左側』が決まる。",
        },
        {
          layer: 3,
          text:
            "$x = 3$ は $y$ 軸に平行な縦線。$x > 3$ は **右側** の領域、$x < 3$ は **左側**。$y$ の値に依らず、$x$ そのものが境界 $N = 3$ を超えればよい。**質的変化：上下から左右へ**——直線の向きが変わると、不等号の意味も『上下』から『左右』に変わる。",
        },
      ],
      formulaPreview: "x = 3 が境界 → x > 3 で右側 → N = 3",
      figureMarker: "<<REGION_STEP4>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "不等式 $x < -2$ を考える。$y = 4$ のとき、領域に含まれる点 $(x, 4)$ の $x$ は $x < N$。境界の値 $N$ はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。縦の直線で左右の領域——向きは反対だが手順は同じ？",
        },
        {
          layer: 2,
          text:
            "Step 4 は『$x > 3$ で右側』。今は『$x < -2$ で左側』。$y$ に依らず、境界はそのまま $x$ の値。",
        },
        {
          layer: 3,
          text:
            "境界は $x = -2$、$x < -2$ は左側、$N = -2$。**Step 4 と同じ『左右』レシピ**——値と向きが変わるだけで、縦線・左右の枠組みは同じ。",
        },
      ],
      formulaPreview: "x < -2 → N = -2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "連立 $\\begin{cases} y > x + 1 \\\\ y < 5 \\end{cases}$ の領域を考える。$x = 1$ のとき、$y$ の範囲は $N < y < 5$。境界の下限 $N$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "境界の下限 N",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題（Step 1 の延長）に『$y < 5$』という条件が追加された**。$y$ の範囲はどう変わる？",
        },
        {
          layer: 2,
          text:
            "$y > x + 1$ だけなら $y > 2$（$x = 1$ のとき）。さらに $y < 5$ が加わると、$y$ は何と何で挟まれる？",
        },
        {
          layer: 3,
          text:
            "Step 1 と同じく境界 $y = x + 1 = 2$ から $y > 2$。これに $y < 5$ を **連立** すると $2 < y < 5$、$N = 2$。**条件追加は領域の『共通部分』を切り出す**——連立は『絞り込み』の道具。",
        },
      ],
      formulaPreview: "y > 2 かつ y < 5 → 2 < y < 5 → N = 2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "ある不等式 $y < a x + b$ の表す領域は、**直線 $y = -2 x + 6$ の下側** であった。$a$ はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "係数 a",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題までは『不等式 → 領域』だった。今は逆——『領域 → 不等式』**。境界の直線の式から何を読み取る？",
        },
        {
          layer: 2,
          text:
            "『下側』ということは不等号の向きは $<$ で確定。残るは、境界の直線の式から $a, b$ をどう読むか？",
        },
        {
          layer: 3,
          text:
            "下側 → $y <$、境界の直線 $y = -2 x + 6$ をそのまま不等式に：$y < -2 x + 6$、$a = -2$。**境界の式は領域の不等式と『同じ直線』**——与える側と読み取る側が入れ替わっても、関係式は同じ。",
        },
      ],
      formulaPreview: "下側 → y < -2x + 6 → a = -2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円 $x^2 + y^2 = 9$ の **外側** の領域 $x^2 + y^2 > 9$ を考える。境界の円周上で $x$ 軸正の側にある点 $(N, 0)$ の $N$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–7 は『直線』の領域だった。今は『円』が境界——『上下／左右』では区別できない**。円の領域はどう読む？",
        },
        {
          layer: 2,
          text:
            "中心 $O(0, 0)$ から点 $P(x, y)$ までの距離 $OP$ を考えると、$x^2 + y^2$ は $OP^2$。$x^2 + y^2 > 9$ は何を意味する？",
        },
        {
          layer: 3,
          text:
            "$x^2 + y^2 > 9 \\iff OP^2 > 9 \\iff OP > 3$。中心からの距離が **半径より大きい** 点の集合——円の **外側** の領域。境界の円周上で $x$ 軸正側の点は $(3, 0)$、$N = 3$。**距離条件として読むと、内外が見える**——円の領域は距離の不等式と表裏一体。",
        },
      ],
      formulaPreview: "x² + y² > 9 ⟺ OP > 3 → 外側 → N = 3",
      figureMarker: "<<REGION_STEP8>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円 $(x - 2)^2 + (y - 1)^2 = 16$ の **外側** の領域 $(x - 2)^2 + (y - 1)^2 > 16$ を考える。中心から $y$ 軸正方向に半径ぶん進んだ境界上の点 $(2, N)$ の $N$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。円の中心が原点からずれただけ。距離の考え方は同じ？",
        },
        {
          layer: 2,
          text:
            "中心 $(0, 0) \\to (2, 1)$、半径 $3 \\to 4$。距離 $OP > r$ の枠組みは同じ。境界の点も同じ要領で計算できる。",
        },
        {
          layer: 3,
          text:
            "中心 $(2, 1)$、半径 $\\sqrt{16} = 4$。$y$ 軸正方向に半径ぶん進むと $y = 1 + 4 = 5$。境界の点 $(2, 5)$、$N = 5$。**中心の場所が変わっても、距離条件として読み解く手順は不変**——内外の概念は『中心からの距離 vs 半径』に集約される。",
        },
      ],
      formulaPreview: "中心 (2, 1)、r = 4 → 境界 (2, 5) → N = 5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "連立 $\\begin{cases} x^2 + y^2 < 25 \\\\ y > x - 1 \\end{cases}$ の領域を考える。$x = 3$ のとき、領域に含まれる $y$ の範囲は $N < y < M$。境界の下限 $N$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "境界の下限 N",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**これまでの『円の内側』と『直線の上側』と『連立』をすべて合わせる**。$x = 3$ のとき、$y$ の上限と下限はそれぞれどこから出る？",
        },
        {
          layer: 2,
          text:
            "$y > x - 1$ なら $y > 2$（直線・下限）。$x^2 + y^2 < 25$ なら $y^2 < 16$、つまり $-4 < y < 4$（円・上下限）。$2$ つを連立すると？",
        },
        {
          layer: 3,
          text:
            "$y > 2$（直線条件）と $-4 < y < 4$（円条件）を連立すると $2 < y < 4$。$N = 2$、$M = 4$。**$3$ つの道具——円の内外（距離）／ 直線の上下／ 連立（共通部分）——を組み合わせれば、複雑な領域も切り出せる**。次の系列「不等式と領域」では、この領域上で最大最小を考える（線形計画法）。",
        },
      ],
      formulaPreview: "y > 2 かつ -4 < y < 4 → 2 < y < 4 → N = 2",
      figureMarker: "<<REGION_STEP10>>",
    },
  ],
  derivation: `**中心の問い** ｜ 等式が描く境界線を、不等号は『どちら側の広がり』へとどう育てるのか——点の条件を、平面の領域として描くには？

────────

**等式は境界線、不等号は『どちら側の広がり』——領域の発想。**

[直線] の単元では「$y = x + 1$ は傾き $1$、切片 $1$ の直線」のように、等式が平面上の **線** を表しました。[円] の単元では「$x^2 + y^2 = 9$ は原点中心、半径 $3$ の円」と、等式が **曲線** を描きました。

しかし、**等号を不等号に書き換える** とどうなるでしょうか？

$y > x + 1$ は、直線 $y = x + 1$ の **上側** にある点 $(x, y)$ の集合。これは線ではなく、平面の **広がり（領域）** です。等式が描いた境界線が、不等号によって「どちら側の半平面」へと育つ——これが領域の発想の核です。

**$3$ つの典型ケース**：

| 境界 | 不等式 | 領域 |
|---|---|---|
| 直線 $y = f(x)$（傾きあり） | $y > f(x)$ / $y < f(x)$ | **上側** / **下側** |
| 縦の直線 $x = k$ | $x > k$ / $x < k$ | **右側** / **左側** |
| 円 $(x-a)^2 + (y-b)^2 = r^2$ | $\\ldots > r^2$ / $\\ldots < r^2$ | **外側** / **内側** |

**なぜ円は『上下』ではなく『内外』なのか？**

円の方程式 $(x - a)^2 + (y - b)^2 = r^2$ は、もともと **中心 $(a, b)$ から点 $P(x, y)$ までの距離が $r$ に等しい** という条件 $\\sqrt{(x-a)^2 + (y-b)^2} = r$ を $2$ 乗したもの。だから：

- $(x - a)^2 + (y - b)^2 > r^2 \\iff$ 中心からの距離が $r$ より大きい $\\iff$ 円の **外側**
- $(x - a)^2 + (y - b)^2 < r^2 \\iff$ 中心からの距離が $r$ より小さい $\\iff$ 円の **内側**

**不等式を『距離の言葉』に翻訳する** と、内外が自然に見えてくる——これが円の領域の核です。

**例 $1$：直線の上側**

$y > x + 1$ の領域は、直線 $y = x + 1$ の上側。点 $(3, 4)$ は境界上（$4 = 3 + 1$）、点 $(3, 5)$ は領域内（$5 > 4$）、点 $(3, 3)$ は領域外。

**例 $2$：円の外側**

$x^2 + y^2 > 9$ の領域は、中心 $(0, 0)$ からの距離が $3$ より遠い点の集合。点 $(4, 0)$ は領域内（$OP = 4 > 3$）、点 $(1, 1)$ は領域外（$OP = \\sqrt{2} < 3$）。

**例 $3$：連立で『共通部分』**

$y > x + 1$ **かつ** $y < 5$ の領域は、直線 $y = x + 1$ の上側 と 直線 $y = 5$ の下側の **両方を同時に満たす** 点の集合——$2$ つの半平面の共通部分。

────────

**もっと深く** — 境界線の含む／含まない、領域から不等式を読む、等高線・最大最小への橋

**境界線の含む／含まない**：不等号に **等号が含まれる**（$\\geq, \\leq$）場合、境界線は領域に **含まれる**（実線で描く）。**含まれない**（$>, <$）場合、境界線は領域に **含まれない**（破線で描く）。図示するときに必ず区別する。

**領域 → 不等式の逆向き**：境界の直線・円の式が分かれば、領域がどちら側かを見て不等号の向きを決めるだけで不等式が読める：

- 「直線 $y = -2 x + 6$ の下側」 $\\to$ $y < -2 x + 6$
- 「円 $(x - 1)^2 + y^2 = 4$ の内側」 $\\to$ $(x - 1)^2 + y^2 < 4$

**等高線——平面上の高低差を読む**：

地図の **等高線** は「標高が同じ場所を結んだ線」。地図上に等高線を書き加えると、高い場所と低い場所が一目で分かるようになります。これは数学の領域とまったく同じ仕組み——$z = f(x, y)$ という $2$ 変数関数で、$z = k$ という等式は等高線、$z > k$ という不等式は『その等高線より高い領域』を表します。

**次への橋——最大最小・線形計画法**：

領域そのものを描くのは入口で、本領は **領域上で何かの値の最大最小を考える** こと。例えば：

- 「$y > x + 1$ かつ $x + y \\leq 6$ の領域上で、$x + 2 y$ が最大となる点は？」
- 「ある工場の生産制約 $2 x + y \\leq 10, \\ x + 3 y \\leq 12, \\ x \\geq 0, \\ y \\geq 0$ のもとで、利益 $300 x + 500 y$ を最大にする組合せは？」

これが次の系列「不等式と領域」で扱う **線形計画法**——領域は最大最小問題を『目で見る』ための強力な道具になります。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $3$ 章「図形と方程式」§ $6$「領域」の節構成（直線の上下 $\\to$ $x = k$ の左右 $\\to$ 円の内外を距離条件として理解 $\\to$ 連立で共通部分）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「等式が描く境界線を、不等号は『どちら側の広がり』へとどう育てるのか——点の条件を、平面の領域として描くには？」——その答えが、

**境界の式（等式）を $1$ 本残し、不等号がどの側を選ぶかを決める——直線なら『上下／左右』、円なら『内外』（距離条件で読む）。連立で共通部分を切り出せば、複雑な領域もこの $3$ つの道具で組み上げられる。**

「点が満たす条件 $\\to$ 平面の広がり」という座標幾何の延長線——線が面へと育つ仕組みが、領域の核です。`,
};

/* ===== LP1: 不等式と領域 / 線形計画法 ===== */
export const ADV_LINEAR_PROGRAMMING_SERIES: LearnerSeries = {
  id: "adv_linear_programming_01",
  title: "不等式と領域",
  subtitle:
    "数Ⅱ・B「図形と方程式」より — 領域に『等高線』を載せて動かす。最大最小は境界との接触点で決まる。線形計画法から直線の通過領域まで $10$ 問で身につける。",
  patternId: "LP1",
  unit: "advanced",
  revelationLabel:
    "領域に乗せた等高線 $f(x, y) = k$ を $k$ の方向に動かす——最大最小は領域の境界・頂点・接点で決まる",
  drivingQuestion:
    "領域に乗せた『等高線』を動かす——最大最小になる『境界との接触点』を、どう見抜くか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "領域 $D : x \\geq 0, \\ y \\geq 0, \\ x + y \\leq 6$ 上で $z = x + y$ の **最大値** はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "z の最大値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "**$z = x + y$ の値が同じになる点はどこ？** $z = k$（定数）と置くと、どんな図形になる？",
        },
        {
          layer: 2,
          text:
            "$x + y = k$ は **傾き $-1$ の直線**。$k$ を変えると直線が平行移動する。領域 $D$ と重なる範囲で、$k$ はどこまで大きくできる？",
        },
        {
          layer: 3,
          text:
            "$z = x + y$ の **等高線** は傾き $-1$ の直線群。$k$ を大きくすると直線は右上に平行移動。領域 $D$（三角形 $(0,0), (6,0), (0,6)$）の境界 $x + y = 6$ に重なる瞬間が最大——その値が答え。**最大値 $z = 6$**。**領域の問題は、関数の等高線を動かして境界に接する瞬間を捉える**——これが入口。",
        },
      ],
      formulaPreview: "等高線 x + y = k → 境界 x + y = 6 で最大 → z = 6",
      figureMarker: "<<LP_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ領域 $D : x \\geq 0, \\ y \\geq 0, \\ x + y \\leq 6$ 上で $z = 2 x + y$ の **最大値** はいくつでしょう？",
      answer: 12,
      unit: "",
      unknownLabel: "z の最大値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。領域は同じ。違うのは $z$ の式だけ。等高線の傾きはどう変わる？",
        },
        {
          layer: 2,
          text:
            "$2x + y = k$ の等高線は傾き $-2$ の直線。$k$ を大きくすると直線は右上へ。領域の **どの頂点** で最大になる？",
        },
        {
          layer: 3,
          text:
            "等高線 $2x + y = k$ は傾き $-2$。$D$ の頂点 $(0, 0), (6, 0), (0, 6)$ で値を比べると $0, 12, 6$。**最大は $(6, 0)$ で $12$**。傾きが変わると最大値を取る頂点も変わる——前題は対称な $x + y$ だったので $(6, 0)$ と $(0, 6)$ が同点だったが、今は $(6, 0)$ が単独で最大。",
        },
      ],
      formulaPreview: "等高線 2x + y = k → 頂点 (6, 0) で最大 → z = 12",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ領域 $D$ 上で $z = x + 3 y$ の **最大値** はいくつでしょう？",
      answer: 18,
      unit: "",
      unknownLabel: "z の最大値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度は係数の比が逆——$y$ の方が重い。等高線の傾きは？",
        },
        {
          layer: 2,
          text:
            "$x + 3y = k$ の傾きは $-\\frac{1}{3}$。$y$ 方向に伸びる等高線——どの頂点で最大？",
        },
        {
          layer: 3,
          text:
            "頂点 $(0, 0), (6, 0), (0, 6)$ で $z = 0, 6, 18$。**最大は $(0, 6)$ で $18$**。前題の $(6, 0)$ から今度は $(0, 6)$ へ——等高線の傾き次第で最大の頂点が切り替わる。",
        },
      ],
      formulaPreview: "等高線 x + 3y = k → 頂点 (0, 6) で最大 → z = 18",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ領域 $D$ 上で $z = -x + 2 y$ の **最小値** はいくつでしょう？",
      answer: -6,
      unit: "",
      unknownLabel: "z の最小値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**今までは『最大』だったが、今は『最小』**。等高線の動かし方はどう変わる？",
        },
        {
          layer: 2,
          text:
            "$-x + 2y = k$ の等高線で $k$ を **小さく** していくと直線はどちらに動く？ 領域から離れる最後の境界点が最小値。",
        },
        {
          layer: 3,
          text:
            "頂点 $(0, 0), (6, 0), (0, 6)$ で $z = 0, -6, 12$。**最小は $(6, 0)$ で $-6$**。**最大も最小もレシピは同じ——等高線を動かして境界の頂点で値を比べる**。最大は $k$ を大きく、最小は $k$ を小さくする方向の違いだけ。",
        },
      ],
      formulaPreview: "等高線 -x + 2y = k → 頂点 (6, 0) で最小 → z = -6",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ領域 $D$ 上で $z = x - 2 y$ の **最小値** はいくつでしょう？",
      answer: -12,
      unit: "",
      unknownLabel: "z の最小値",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。今度も最小だが、$y$ の符号が逆になる係数。手順は同じ？",
        },
        {
          layer: 2,
          text:
            "頂点 $(0, 0), (6, 0), (0, 6)$ で $z$ を計算して、一番小さいものを選ぶだけ。",
        },
        {
          layer: 3,
          text:
            "頂点で $z = 0, 6, -12$。**最小は $(0, 6)$ で $-12$**。前題と同じレシピで、係数の符号が変わると最小の頂点が切り替わる。",
        },
      ],
      formulaPreview: "等高線 x - 2y = k → 頂点 (0, 6) で最小 → z = -12",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ領域 $D$ 上で $z = x^2 + y^2$ の **最大値** はいくつでしょう？",
      answer: 36,
      unit: "",
      unknownLabel: "z の最大値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–5 の $z$ はすべて『直線の等高線』だった。今は $z = x^2 + y^2$——等高線はどんな図形？**",
        },
        {
          layer: 2,
          text:
            "$x^2 + y^2 = k$ は **原点中心、半径 $\\sqrt{k}$ の円**。$k$ を大きくすると円が大きく広がる。領域から外れる直前の境界点が最大値の場所。",
        },
        {
          layer: 3,
          text:
            "等高線は **円**：$x^2 + y^2 = k$。$k$ を大きくすると円が膨らみ、領域の **原点から最遠の頂点** に最後に接する。頂点 $(0, 0), (6, 0), (0, 6)$ の原点からの距離はそれぞれ $0, 6, 6$。**最大は $(6, 0)$ または $(0, 6)$ で $z = 36$**。**等高線が直線から円に変わっても、『動かして境界に接する瞬間を捉える』レシピは同じ**——道具が変わっただけ。",
        },
      ],
      formulaPreview: "等高線 x² + y² = k（円）→ 頂点 (6, 0) または (0, 6) で最大 → z = 36",
      figureMarker: "<<LP_STEP6>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "同じ領域 $D$ 上で $z = x^2 + y^2$ の **最小値** はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "z の最小値",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。円の等高線で今度は最小。$k$ を小さくするとどうなる？",
        },
        {
          layer: 2,
          text:
            "$x^2 + y^2 = k$ で $k$ を小さくすると、原点中心の円が **縮む**。$k = 0$ なら点 $(0, 0)$ そのもの。$(0, 0)$ は領域に含まれる？",
        },
        {
          layer: 3,
          text:
            "領域 $D$ は原点 $(0, 0)$ を含む（$x \\geq 0, y \\geq 0, x + y \\leq 6$ をすべて満たす）。だから $z = 0$ も実現可能。**最小は $(0, 0)$ で $z = 0$**。原点が領域に含まれるときは最小値はゼロ——シンプルだが、含まれないときは「円が領域に最初に触れる瞬間」を考える必要がある。",
        },
      ],
      formulaPreview: "等高線 x² + y² = k → 点 (0, 0) で最小 → z = 0",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ領域 $D$ で $z = x + a y$ の **最大値が $12$** となるとき、係数 $a$ はいくつでしょう？（$a > 1$ とする）",
      answer: 2,
      unit: "",
      unknownLabel: "係数 a",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**前題までは『関数 $\\to$ 最大値』だった。今は逆——『最大値 $12$ $\\to$ 係数 $a$』**。頂点での値から $a$ をどう逆算する？",
        },
        {
          layer: 2,
          text:
            "頂点 $(6, 0), (0, 6)$ での値を $a$ で書いてみる。$z(6, 0) = 6$、$z(0, 6) = 6 a$。最大は $\\max(6, 6a)$。これが $12$ になる $a$ は？",
        },
        {
          layer: 3,
          text:
            "$a > 1$ なら $6a > 6$ なので最大は $(0, 6)$ で取り、$z = 6 a = 12$ から **$a = 2$**。**与える側（係数）と求める側（最大値）が逆になっても、頂点で値を比べる手順は同じ**——両方向に使える。",
        },
      ],
      formulaPreview: "z(0, 6) = 6a = 12 → a = 2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$xy$ 平面上の直線 $y = 2 t x - t^2$ が $t$ をすべての実数で動くとき、この直線の **通過領域** は $y \\leq f(x)$ の形で書ける。$x = 3$ における境界の値 $y = N$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "境界の値 N",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "**Step 1–8 は『領域上で値を最大最小』だった。今は『直線がワイパーのように動いてできる領域』そのものを求める**。点 $(X, Y)$ が通過領域に含まれる条件は？",
        },
        {
          layer: 2,
          text:
            "点 $(X, Y)$ を通過する $\\iff$ ある実数 $t$ が存在して $Y = 2 t X - t^2$。これを $t$ の $2$ 次方程式 $t^2 - 2 X t + Y = 0$ と見ると、**実数解が存在する条件** は？",
        },
        {
          layer: 3,
          text:
            "$t$ の $2$ 次方程式 $t^2 - 2 X t + Y = 0$ が実数解を持つ $\\iff$ 判別式 $D / 4 = X^2 - Y \\geq 0 \\iff Y \\leq X^2$。**通過領域は $y \\leq x^2$**（放物線 $y = x^2$ の下側）。$x = 3$ の境界は $y = 9$、$N = 9$。**動く直線の通過領域は、$t$ の方程式の『解の存在条件』に置き換えると判別式で見抜ける**——「数学の上級者と未経験者を分ける入口」（池田氏）。",
        },
      ],
      formulaPreview: "t² - 2Xt + Y = 0 が実数解 ⟺ X² - Y ≥ 0 ⟺ y ≤ x² → N = 9",
      figureMarker: "<<LP_STEP9>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "ある工場で製品 A を $x \\mathrm{kg}$、B を $y \\mathrm{kg}$ 作る。原料の制約は $x + 2 y \\leq 14, \\ 5 x + y \\leq 25, \\ x \\geq 0, \\ y \\geq 0$ で、利益は $3 x + 2 y$（万円）。利益の **最大値** はいくつでしょう？",
      answer: 22,
      unit: "",
      unknownLabel: "利益の最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**これは Step 1–8 の『線形計画法』を実世界に適用する応用**。制約が領域を作り、利益関数が等高線。手順はこれまで通り。",
        },
        {
          layer: 2,
          text:
            "制約から領域 $D$ の **頂点** を求める。$(0, 0), (5, 0), (0, 7)$ と、$5 x + y = 25$ と $x + 2 y = 14$ の **交点**。連立して交点を出すと？",
        },
        {
          layer: 3,
          text:
            "交点：$y = 25 - 5 x$ を $x + 2 y = 14$ に代入 → $x + 50 - 10 x = 14$ → $x = 4, y = 5$。頂点 $(0, 0), (5, 0), (0, 7), (4, 5)$ での利益は $0, 15, 14, 22$。**最大は $(4, 5)$ で $22$（万円）**。**$2$ 種類の制約が同時に効く交点で利益が最大化される**——これが線形計画法の核：実世界の最適化問題が、領域の頂点を巡る計算に帰着する。経済学・経営学・工学の出発点。",
        },
      ],
      formulaPreview: "交点 (4, 5) で 3·4 + 2·5 = 22 → 最大値 22",
      figureMarker: "<<LP_STEP10>>",
    },
  ],
  derivation: `**中心の問い** ｜ 領域に乗せた『等高線』を動かす——最大最小になる『境界との接触点』を、どう見抜くか？

────────

**領域に関数を載せる——『等高線』を動かす発想。**

[領域] の単元では、不等式が描く平面の広がりを捉えました。今度はその領域に、$z = f(x, y)$ という **$2$ 変数関数** を乗せます。

例えば $z = x + y$ なら、平面の各点 $(x, y)$ に「高さ $z$」が乗っている地形のような像。$z$ が同じになる点を結ぶと **等高線**——地図で標高が同じ地点を結んだ線と同じ仕組みです。

**$z = x + y$ の等高線**：$x + y = k$ は **傾き $-1$ の直線群**。$k$ が大きいほど直線は右上、小さいほど左下。

**最大最小は『境界との接触点』**：

領域 $D$ 上で $z$ が最大になる点を探したい。$z$ の値が同じになる等高線を、$k$ を大きくする方向（地形でいう「上り坂」）に平行移動していくと——

- $k$ が小さいうちは等高線は領域の中を貫いている
- $k$ を大きくすると、いつか領域から **離れる瞬間** が来る
- その「最後に領域と触れる点」が **最大値の場所**

これは「等高線が領域の **境界・頂点** に **接する瞬間** を見抜けばよい」ということ。

**線形関数の場合（多角形領域）**：等高線は直線、領域の境界も直線——だから最大最小は必ず **領域の頂点** で取る。$3$〜$5$ 個の頂点で値を比べるだけで答えが出る。

**$2$ 次関数の場合（円の等高線）**：$z = x^2 + y^2 = k$ の等高線は **原点中心の円**。$k$ を大きくすると円が膨らみ、領域の **原点から最遠の点** に最後に接する瞬間が最大。$k$ を小さくすると円が縮み、領域内に **最も原点に近い点**（または原点が領域内なら原点）が最小。

**例 $1$：三角形領域の線形最大化**

領域 $D: x \\geq 0, y \\geq 0, x + y \\leq 6$（三角形）上で $z = 2 x + y$ の最大値。

頂点 $(0, 0), (6, 0), (0, 6)$ で $z$ を計算 → $0, 12, 6$ → **最大は $(6, 0)$ で $12$**。

**例 $2$：円の等高線**

同じ三角形領域上で $z = x^2 + y^2$ の最大値。等高線は円。頂点までの原点距離は $0, 6, 6$ → 最遠は $(6, 0)$ または $(0, 6)$ → **最大は $z = 36$**。

────────

**もっと深く** — 線形計画法、通過領域、$2$ 変数関数の世界

**線形計画法（Linear Programming）**：

線形な制約と線形な目的関数の最適化問題は、領域の **頂点を巡る** だけで解ける——これが **線形計画法（LP）**。経済・経営・物流・工学のあらゆる最適化問題の入口です。

**例：工場の最適生産**

製品 A を $x \\mathrm{kg}$、B を $y \\mathrm{kg}$ 作る。原料の制約 $x + 2 y \\leq 14$（原料 X）、$5 x + y \\leq 25$（原料 Y）。利益 $3 x + 2 y$ を最大化したい。

制約から領域は四角形（$(0, 0), (5, 0), (0, 7)$ と $2$ つの制約の交点 $(4, 5)$ で囲まれる）。頂点で利益を比べると $0, 15, 14, 22$ → **交点 $(4, 5)$ で $22$ 万円が最大**。

**$2$ つの制約が同時に効く交点** が最適解になる——どちらか $1$ つの制約だけが効く頂点（$(5, 0)$ や $(0, 7)$）よりも有利。「両方の原料を使い切る配分」が利益最大化、という現実的に納得のいく結果。

**等高線の数学的な深さ——$z = f(x, y)$ の世界**：

$z = f(x, y)$ という $2$ 変数関数は、平面の各点に高さ（または温度・密度など）を乗せた **地形** のような像。等高線 $f(x, y) = k$ はその地形を平面で「輪切り」した断面の境界です。

- $z = x + y$ → 等高線は直線群（平らな斜面）
- $z = x^2 + y^2$ → 等高線は同心円（すり鉢状の谷）
- $z = x y$ → 等高線は双曲線（鞍点を持つ地形）

数Ⅲ・大学数学の **偏微分** は「等高線に直交する勾配方向の傾き」を測る道具。線形計画法は **シンプレックス法** という代数的アルゴリズムで体系化され、コンピュータ最適化の基盤になっています。

**直線の通過領域——『動く直線』の影絵**：

$y = 2 t x - t^2$ のように **パラメータ $t$ を含む直線** が、$t$ を全実数で動かしたときの **通過領域** はどう求める？

考え方：点 $(X, Y)$ が通過領域に含まれる $\\iff$ ある実数 $t$ が存在して $Y = 2 t X - t^2$ が成り立つ $\\iff$ $t$ の $2$ 次方程式 $t^2 - 2 X t + Y = 0$ が実数解を持つ $\\iff$ 判別式 $\\geq 0$。

判別式 $D / 4 = X^2 - Y \\geq 0 \\iff Y \\leq X^2$。通過領域は **放物線 $y = x^2$ の下側**。

「動く直線」の問題が「$t$ の方程式の **解の存在条件**」に置き換わる——この発想の置き換えが「**数学の上級者と未経験者を分ける入口**」（池田氏）。$2$ 次方程式・領域・媒介変数・図形と方程式のすべてが一気に繋がる総決算問題。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 $3$ 章「図形と方程式」§ $7$「不等式と領域」の節構成（線形計画法の例題 $\\to$ 練習問題 $20$ で円の等高線 $\\to$ 応用問題 $2$ で工場最適化 $\\to$ 応用問題 $3$ で直線の通過領域）を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「領域に乗せた『等高線』を動かす——最大最小になる『境界との接触点』を、どう見抜くか？」——その答えが、

**等高線 $f(x, y) = k$ を $k$ の方向に平行移動し、領域の境界（多角形なら頂点、曲線なら接点）と接する瞬間を捉える。**

線形なら頂点を比べるだけ、円なら原点距離を比べるだけ、動く直線の通過領域なら「$t$ の方程式の解の存在条件」に置き換える——**領域の問題は、いつも『等高線を動かして境界との関係を見抜く』** という $1$ つの幹に集約される。

これが「点の条件 $\\to$ 平面の広がり $\\to$ 広がり上での最大最小」と続いてきた座標幾何の到達点——大学の解析学・線形計画法・最適化の世界への扉です。`,
};

/**
 * 高校 入門カテゴリの系列リスト（教育順で並べる）。
 *
 * 数Ⅰ・A 2 次関数:
 *   1. グラフ → 2. 最小値
 *
 * 数Ⅱ・B 複素数と方程式:
 *   1. 新しい数を作る → 2. 2 次方程式の実数解 → 3. 2 次方程式の解と因数分解
 *   → 4. 解と係数の関係 → 5. 剰余の定理・因数定理
 *
 * 数Ⅱ・B 図形と方程式（入口から順に）:
 *   1. 数直線上の点 → 2. 直線 → 3. 点と直線の距離 → 4. 円 → 5. 円と直線
 *   → 6. 円の接線 → 7. 束の考え方 → 8. 軌跡 → 9. 媒介変数表示 → 10. 領域
 *   → 11. 不等式と領域
 */
export const ADVANCED_SERIES_LIST: LearnerSeries[] = [
  // 数Ⅰ・A 2 次関数
  ADV_QUAD_GRAPH_SERIES,
  ADV_QUAD_MIN_SERIES,
  // 数Ⅱ・B 複素数と方程式（図形と方程式の前）
  ADV_COMPLEX_NEW_NUMBER_SERIES,
  ADV_COMPLEX_QUADRATIC_SOLUTIONS_SERIES,
  ADV_COMPLEX_FACTORIZATION_SERIES,
  ADV_COMPLEX_ROOT_COEFFICIENT_SERIES,
  ADV_REMAINDER_THEOREM_SERIES,
  // 数Ⅱ・B 図形と方程式
  ADV_NUMBER_LINE_SERIES,
  ADV_LINE_EQUATION_SERIES,
  ADV_POINT_LINE_DISTANCE_SERIES,
  ADV_CIRCLE_EQUATION_SERIES,
  ADV_CIRCLE_LINE_SERIES,
  ADV_CIRCLE_TANGENT_SERIES,
  ADV_BUNDLE_SERIES,
  ADV_LOCUS_SERIES,
  ADV_PARAMETRIC_SERIES,
  ADV_REGION_SERIES,
  ADV_LINEAR_PROGRAMMING_SERIES,
];
