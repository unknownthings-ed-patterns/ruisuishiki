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

$f(x) = x^2 + bx + c$ のグラフを描くと、上向きのお椀のような曲線になります。数学では、こういう **口が上向きに開いた放物線** を「**下に凸（しもにとつ）**」と言います。$x^2$ の係数が 1 で正のとき、グラフは必ず下に凸になります。

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

ここからが池田洋介流の式変形の見せ方です。$(x + b/2)^2$ を **そのまま書いてしまう** ことから始めます。書いてしまえば中に $(b/2)^2$ が含まれてしまうので、その分を **直後に引いて取り戻す** ——「足したぶん、すぐ引く」という流儀です：

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

export const ADVANCED_SERIES_LIST: LearnerSeries[] = [
  ADV_QUAD_MIN_SERIES,
];
