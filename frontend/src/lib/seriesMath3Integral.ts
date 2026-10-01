/**
 * 「積分法」ユニットの系列（数Ⅲ・C 第6章）。
 *
 * 背骨設計は docs/math3c_integral_design.md
 * （メイン Opus 5.5・2026-10-01・裁定 Q1〜Q5 推奨どおり → Round 1 背骨監査〔Sonnet 5.5〕29 件全件反映 → 凍結）。
 * 系列はメインがひとりで実装する（並列委譲なし）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第6章 積分法（旺文社・2024）の
 * 章構成を借り、問題の値・関数はすべてオリジナルに変更（copyright-credit-vs-copy）。
 * 原典の決め台詞・比喩・造語（「ヨブン」「半分だけ積分」「痕跡」など）は地の文に入れない
 * （裁定 Q5。「定数倍のズレ／関数倍のズレ」だけは系列3 の derivation で出典を明記して引用する）。
 *
 * ハブ胚細胞（背骨 D1）：
 *   微分の公式を逆から読む。読めない形に出会ったら、読める形に作り替える——
 *   作り替えのたびに出るズレを、微分して確かめながら打ち消す。
 *
 * 入力の折り方（背骨 D2・D6）：
 * - 不定積分は「答えの形を問題文に書いた指定係数」（同じ不定積分が 2 通りに書けて係数が変わる形があるため＝R1 B1）
 * - 入力系は 2026-10-01 に log（ln）と e を足した（裁定 Q2）。累乗 ^ は無い＝e の累乗は値の設計で避ける
 * - 「これでしか解けない」とは書かない（置換も部分積分も既習の道具の逆読み＝追補18-b）
 */

import type { LearnerSeries } from "./types";

/** M3INT1: 巻き戻しと倍率のずれ。
 *  step1〜2：冪（分数の指数・負の指数）／step3（質）：三角関数（符号のズレ・F(0) を与えて F(b)）
 *  step4〜5：内側が a 倍の三角／step6（逆・Q3）：微分して戻す／step7・9：1 次式のかたまりの冪
 *  山場 step8：内側の係数が負（素朴な巻き戻し 1/4 と正答 −1/20 が符号まで違う＝sympy で確認）
 *  step10（複合・C13）：数Ⅱ・B 系列7 の C の決定と合流。内側の係数を忘れた値は 1、正答は 3（sympy）。
 *  答え 10 個はすべて相異なる（2/5・−1/3・3/2・1/4・4・1/2・1/15・−1/20・1/3・3）。 */
export const M3INT_BASIC_SERIES: LearnerSeries = {
  id: "math3_int_basic_01",
  title: "巻き戻しと倍率のずれ——候補を微分して、ずれた倍率で割る",
  subtitle:
    "数Ⅲ・C 積分法より — 数Ⅱでは多項式を巻き戻した。相手が分数の指数・三角関数・かたまりの冪になっても、候補を作って微分すれば、ずれた倍率が見える。$10$ 問で、そのずれを直す手つきを確かめる。",
  patternId: "M3INT1",
  unit: "math_3",
  revelationLabel:
    "**候補を微分して出てきたずれが「数をかけただけ」なら、その数で割れば直る**。微分の公式を逆から読むとき、確かめる道具はいつも微分",
  drivingQuestion:
    "微分の公式を逆から読めば、積分の公式になる。では、逆から読んだ候補が少しずれていたら——**どんなずれなら、どうやって直せる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "微分すると $x\\sqrt{x}$ になる関数を探します。答えは $k\\,x^{\\frac52}$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: 2 / 5,
      answerDisplay: "2/5",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x\\sqrt{x}\\,dx = k\\,x^{\\frac52} + C$ の $k$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "微分の公式を逆から読むと、何を微分すればこの関数が出てきそうだろう？ 当たりをつけたら、それは本当に出てくる？",
        },
        {
          layer: 2,
          text: "数Ⅱで、$x^n$ を巻き戻したとき肩の数と前の係数はどうなった？（[不定積分]）",
        },
        {
          layer: 3,
          text: "$x\\sqrt{x} = x^{\\frac32}$。微分すると肩が $1$ 下がるので、候補は肩が $1$ 上の $x^{\\frac52}$。微分すると $\\left(x^{\\frac52}\\right)' = \\dfrac52 x^{\\frac32}$ で、ほしいものの $\\dfrac52$ 倍になってしまう。だから $\\dfrac52$ で割っておく：$\\left(\\dfrac25 x^{\\frac52}\\right)' = x^{\\frac32}$。$k = \\dfrac25$。中心の問いへの最初の部分回答：**候補を微分して出たずれが「数をかけただけ」なら、その数で割れば直る**。",
        },
      ],
      formulaPreview: "候補 x^(5/2) → 微分すると (5/2)x^(3/2) → 5/2 で割って k = 2/5",
      figureMarker: "<<M3INT_ROUNDTRIP>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "微分すると $\\dfrac{1}{x^4}$ になる関数を探します。答えは $\\dfrac{k}{x^3}$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: -1 / 3,
      answerDisplay: "-1/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int \\frac{1}{x^4}\\,dx = \\frac{k}{x^3} + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、肩の数が負になったこと。前題の手つきは、肩が負でもそのまま通る？",
        },
        {
          layer: 3,
          text: "$\\dfrac{1}{x^4} = x^{-4}$。肩を $1$ 上げた候補は $x^{-3}$。微分すると $(x^{-3})' = -3x^{-4}$ で、ほしいものの $-3$ 倍。$-3$ で割って $-\\dfrac13 x^{-3} = -\\dfrac{1}{3x^3}$。$k = -\\dfrac13$。微分して確かめると $\\left(-\\dfrac13 x^{-3}\\right)' = x^{-4}$。中心の問いへ：**ずれの倍率は負の数のこともある。符号ごと割る**。",
        },
      ],
      formulaPreview: "候補 x^(−3) → 微分すると −3x^(−4) → −3 で割って k = −1/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "関数 $F(x)$ は、微分すると $\\sin x$ になり、$F(0) = 0$ を満たします。$F\\left(\\dfrac{2\\pi}{3}\\right)$ を求めましょう。",
      answer: 3 / 2,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "$F\\left(\\dfrac{2\\pi}{3}\\right)$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      inputAffordances: ["pi"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。巻き戻す相手が冪から三角関数になった。候補を作って微分して確かめる手つきは、そのまま使える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、相手が三角関数になったこと。微分すると $\\sin$ と $\\cos$ が入れかわるとき、符号はどうだった？",
        },
        {
          layer: 3,
          text: "微分して $\\sin x$ が出てくる候補は $\\cos x$ の仲間。ところが $(\\cos x)' = -\\sin x$ で、ほしいものの $-1$ 倍になる。$-1$ で割って $-\\cos x$：$(-\\cos x)' = \\sin x$。だから $F(x) = -\\cos x + C$。$F(0) = -1 + C = 0$ より $C = 1$、$F(x) = 1 - \\cos x$。$F\\left(\\dfrac{2\\pi}{3}\\right) = 1 - \\left(-\\dfrac12\\right) = \\dfrac32$。符号を直さずに $\\cos x - 1$ としてしまうと $-\\dfrac32$ で、傾き $\\sin x$ が正なのに $F$ が減っていく、という食い違いで気づける。中心の問いへ：**ずれの倍率が $-1$ でも、割り方は同じ**。",
        },
      ],
      formulaPreview: "(cos x)′ = −sin x → −1 で割って F(x) = −cos x + C → F(0)=0 で C = 1 → F(2π/3) = 3/2",
      figureMarker: "<<M3INT_SLOPE_SIN>>",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "微分すると $\\cos 4x$ になる関数を探します。答えは $k\\sin 4x$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: 1 / 4,
      answerDisplay: "1/4",
      unit: "",
      unknownLabel: "$\\displaystyle\\int \\cos 4x\\,dx = k\\sin 4x + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、$\\cos$ の中が $x$ でなく $4x$ になったこと。中に数がかかった関数を微分すると、[合成関数の微分法] で何が出てきた？",
        },
        {
          layer: 3,
          text: "候補 $\\sin 4x$ を微分すると、合成関数の微分で中の $4x$ も微分されて $(\\sin 4x)' = 4\\cos 4x$。ほしいものの $4$ 倍なので $4$ で割る：$\\left(\\dfrac14\\sin 4x\\right)' = \\cos 4x$。$k = \\dfrac14$。中心の問いへ：**中にかかった数は、微分すると外に出てくる。だから巻き戻すときは、その数で割る**。",
        },
      ],
      formulaPreview: "(sin 4x)′ = 4cos 4x → 4 で割って k = 1/4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "微分すると $\\dfrac{1}{\\cos^2\\dfrac{x}{4}}$ になる関数を探します。答えは $k\\tan\\dfrac{x}{4}$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$\\displaystyle\\int \\frac{dx}{\\cos^2\\frac{x}{4}} = k\\tan\\frac{x}{4} + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、外側の関数（$\\cos$ から $\\dfrac{1}{\\cos^2}$ へ）。第4章で、微分すると $\\dfrac{1}{\\cos^2 x}$ が出てきた関数は何だった？",
        },
        {
          layer: 3,
          text: "$(\\tan x)' = \\dfrac{1}{\\cos^2 x}$ だったので、候補は $\\tan\\dfrac{x}{4}$。微分すると中の $\\dfrac{x}{4}$ も微分されて $\\left(\\tan\\dfrac{x}{4}\\right)' = \\dfrac14\\cdot\\dfrac{1}{\\cos^2\\frac{x}{4}}$。ほしいものの $\\dfrac14$ 倍なので、$\\dfrac14$ で割る＝ $4$ 倍する。$k = 4$。中心の問いへ：**割る数が $1$ より小さいと、直した係数は大きくなる。前題と同じ「割る」でも、結果の向きが逆に見える**。",
        },
      ],
      formulaPreview: "(tan(x/4))′ = (1/4)·1/cos²(x/4) → 1/4 で割って k = 4",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "ある人が「$\\displaystyle\\int f(x)\\,dx = -\\dfrac{1}{10}\\cos 5x + C$」と求めました。この結果が正しいとき、もとの関数 $f(x)$ は $k\\sin 5x$ の形をしています。$k$ を求めましょう。",
      answer: 1 / 2,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "$f(x) = k\\sin 5x$ の $k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。分かっているものと、探しているものが入れかわった。",
        },
        {
          layer: 2,
          text: "step4 と変わったのは向き。step4 は $f$ から巻き戻した結果を探した。今度は巻き戻した結果が先にあって、$f$ を探す。ここまで、巻き戻した結果を確かめるときにいつも何をしてきた？",
        },
        {
          layer: 3,
          text: "巻き戻した結果を微分すれば、もとの関数に戻る。$\\left(-\\dfrac{1}{10}\\cos 5x\\right)' = -\\dfrac{1}{10}\\cdot(-\\sin 5x)\\cdot 5 = \\dfrac12\\sin 5x$。$k = \\dfrac12$。step4 と同じく、中の $5x$ の $5$ が外に出てくる。中心の問いへ：**巻き戻しは、微分すれば必ず確かめられる。確かめる道具と探す道具は、同じ微分**。",
        },
      ],
      formulaPreview: "(−(1/10)cos 5x)′ = (1/10)·5·sin 5x = (1/2)sin 5x → k = 1/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "微分すると $(3x + 2)^4$ になる関数を探します。答えは $k(3x + 2)^5$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: 1 / 15,
      answerDisplay: "1/15",
      unit: "",
      unknownLabel: "$\\displaystyle\\int (3x+2)^4\\,dx = k(3x+2)^5 + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。中に $1$ 次式が入っているのは同じ。外側の関数はどう変わった？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、外側が三角関数から冪になったこと。step1 で見たずれと step4 で見たずれは、ここではそれぞれどこから出てくる？",
        },
        {
          layer: 3,
          text: "$3x+2$ をひとかたまりと見て、候補は $(3x+2)^5$。微分すると $5(3x+2)^4\\cdot(3x+2)' = 15(3x+2)^4$ で、ほしいものの $15$ 倍。肩を下ろした $5$ と、中の $3x+2$ を微分した $3$ の両方が出てくる。$15$ で割って $k = \\dfrac{1}{15}$。中心の問いへ：**ずれの倍率が $2$ つの数の積でも、まとめて割れば直る**。",
        },
      ],
      formulaPreview: "((3x+2)⁵)′ = 5·3·(3x+2)⁴ = 15(3x+2)⁴ → k = 1/15",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "微分すると $(4 - 5x)^3$ になる関数を探します。答えは $k(4 - 5x)^4$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: -1 / 20,
      answerDisplay: "-1/20",
      unit: "",
      unknownLabel: "$\\displaystyle\\int (4-5x)^3\\,dx = k(4-5x)^4 + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、かたまりの中の $x$ の係数が負になったこと。",
        },
        {
          layer: 3,
          text: "候補 $(4-5x)^4$ を微分すると $4(4-5x)^3\\cdot(4-5x)' = 4(4-5x)^3\\cdot(-5) = -20(4-5x)^3$。ほしいものの $-20$ 倍なので、$-20$ で割って $k = -\\dfrac{1}{20}$。肩を上げて肩の数で割るだけの $\\dfrac14$ では、微分すると $-5$ 倍のずれが残り、符号まで逆になる。微分して確かめれば、この食い違いはその場で見つかる。中心の問いへ：**ずれの倍率には、かたまりの中の係数も入っている——負なら符号ごと**。",
        },
      ],
      formulaPreview: "((4−5x)⁴)′ = 4·(−5)·(4−5x)³ = −20(4−5x)³ → k = −1/20",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "微分すると $\\sqrt{2x + 5}$ になる関数を探します。答えは $k(2x + 5)\\sqrt{2x + 5}$（$k$ は定数）の形で書けます。$k$ を求めましょう。",
      answer: 1 / 3,
      answerDisplay: "1/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int \\sqrt{2x+5}\\,dx = k(2x+5)\\sqrt{2x+5} + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step7 と比べてみよう。かたまりの冪であることは同じ。何が加わった？",
        },
        {
          layer: 2,
          text: "step7 と変わったのは、かたまりの肩が整数でなく $\\dfrac12$ になったこと。答えの形 $(2x+5)\\sqrt{2x+5}$ は、肩でいうといくつ？",
        },
        {
          layer: 3,
          text: "$\\sqrt{2x+5} = (2x+5)^{\\frac12}$。候補は肩を $1$ 上げた $(2x+5)^{\\frac32} = (2x+5)\\sqrt{2x+5}$。微分すると $\\dfrac32(2x+5)^{\\frac12}\\cdot 2 = 3(2x+5)^{\\frac12}$ で、ほしいものの $3$ 倍。$k = \\dfrac13$。中心の問いへ：**肩が分数でも、ずれの倍率は「下ろした肩 × 中の係数」**。",
        },
      ],
      formulaPreview: "((2x+5)^(3/2))′ = (3/2)·2·(2x+5)^(1/2) = 3√(2x+5) → k = 1/3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "関数 $F(x)$ は、微分すると $\\cos 6x + \\sin\\dfrac{x}{3}$ になり、$F(0) = 0$ を満たします。$F\\left(\\dfrac{3\\pi}{2}\\right)$ を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "$F\\left(\\dfrac{3\\pi}{2}\\right)$",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。「微分すると〜になり、$F(0)=0$」は同じ。何が組み合わさっている？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは、微分した結果が、ここまでの step で別々に見てきた $2$ つの形の和になっていること。数Ⅱの巻き戻しで、和はどう扱った？",
        },
        {
          layer: 3,
          text: "和は項ごとに巻き戻せる。$\\cos 6x$ は step4 と同じく $\\dfrac16\\sin 6x$。$\\sin\\dfrac{x}{3}$ は、候補 $\\cos\\dfrac{x}{3}$ を微分すると $-\\dfrac13\\sin\\dfrac{x}{3}$ なので、$-\\dfrac13$ で割って $-3\\cos\\dfrac{x}{3}$。$F(x) = \\dfrac16\\sin 6x - 3\\cos\\dfrac{x}{3} + C$。$F(0) = -3 + C = 0$ より $C = 3$。$F\\left(\\dfrac{3\\pi}{2}\\right) = \\dfrac16\\sin 9\\pi - 3\\cos\\dfrac{\\pi}{2} + 3 = 0 - 0 + 3 = 3$。中の数で割るのを忘れて $\\sin 6x - \\cos\\dfrac{x}{3}$ とすると $1$ になり、食い違う。中心の問いへ：**ずれが項ごとに違う数でも、項ごとに割れば直る。和の巻き戻しは、ずれの直しも項ごと**。",
        },
      ],
      formulaPreview: "F(x) = (1/6)sin 6x − 3cos(x/3) + C、F(0)=0 で C = 3 → F(3π/2) = 3",
    },
  ],
  derivation: `**中心の問い** ｜ 微分の公式を逆から読めば、積分の公式になる。では、逆から読んだ候補が少しずれていたら——**どんなずれなら、どうやって直せる？**

────────

## 逆から読むのは、手順ではなく探索

微分は、規則どおりに手を動かせば必ず答えが出た。積分は向きが逆で、「微分すると $f(x)$ になる関数」を**探す**ことになる（[不定積分]・[原始関数]）。

探すときの頼りは、微分の公式の一覧を逆から読むことである。

| 微分 | 逆から読むと |
|---|---|
| $(x^{\\alpha})' = \\alpha x^{\\alpha-1}$ | 肩を $1$ 上げた $x^{\\alpha+1}$ が候補 |
| $(\\sin x)' = \\cos x$ | $\\cos x$ の候補は $\\sin x$ |
| $(\\cos x)' = -\\sin x$ | $\\sin x$ の候補は $\\cos x$ の仲間 |
| $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$ | $\\dfrac{1}{\\cos^2 x}$ の候補は $\\tan x$ |

ただし、逆から読んだ候補は**少しずれている**ことが多い。

## ここが胚細胞：候補を微分して、ずれた倍率で割る

候補を実際に微分すると、ほしい関数の「何倍か」が出てくることがある。

- 肩を上げた $x^{\\frac52}$ を微分すると、ほしい $x^{\\frac32}$ の $\\dfrac52$ 倍（step1）
- $\\cos x$ を微分すると、ほしい $\\sin x$ の $-1$ 倍（step3）
- $\\sin 4x$ を微分すると、中の $4$ が外に出てきて $4$ 倍（step4）
- $(4-5x)^4$ を微分すると、下ろした $4$ と中の $-5$ の積で $-20$ 倍（step8）

ずれが**数をかけただけ**なら、候補をその数で割っておけば直る。数は微分の外に出せるからである。

$$\\int f(ax+b)\\,dx = \\frac{1}{a}F(ax+b) + C \\qquad (F' = f,\\ a \\ne 0)$$

この式は覚えなくてよい。候補を微分すれば、$a$ はいつでも外に出てくるのが見える。

## 確かめる道具も、微分

巻き戻した結果は、微分すればもとに戻るはずである。step6 はその向きを問題にした。**探すのは難しくても、確かめるのは規則どおりの微分でできる**——候補が式で書けていれば、答え合わせはいつでもできる。

## Step の道筋

- **step1・2**：冪（分数の指数・負の指数）。ずれの倍率は下ろした肩
- **step3**：三角関数。ずれは $-1$ 倍（符号）。$F(0)$ で $C$ を決めて値を出す
- **step4・5**：中に数がかかった三角関数。ずれは中の数
- **step6**：逆向き。巻き戻した結果を微分して、もとの関数を出す
- **step7・9**：$1$ 次式のかたまりの冪。ずれは「下ろした肩 × 中の係数」
- **step8（山場）**：かたまりの中の係数が負。肩の数で割るだけだと符号まで外れる
- **step10**：和を項ごとに巻き戻し、$C$ を決めて値を出す（数Ⅱの $C$ の決め方と合流）

────────

**もっと深く**

**忘れても導ける。** 積分の公式を忘れたら、「微分すると何が出てくる？」と候補を $1$ つ作って微分すればよい。出てきたものとほしいものを比べ、何倍かずれていればその数で割る。**覚えるのは公式の一覧ではなく、この往復**である。

**中の係数を忘れる、という誤りは、微分すれば見つかる**（中の係数が $1$ でないかぎり）。 $(4-5x)^3$ を「肩を上げて肩の数で割る」だけで $\\dfrac14(4-5x)^4$ とすると、微分して $-5(4-5x)^3$ になり、ほしいものと符号まで違う。step10 でも、中の数で割るのを忘れると $F\\left(\\dfrac{3\\pi}{2}\\right)$ が $3$ でなく $1$ になる——**数で確かめれば、ずれは値の食い違いとして姿を現す**。

**ずれが数でなく関数だったら？** ここまでのずれは、どれも「数をかけただけ」だった。候補を微分したとき、ほしい関数に $x$ の式がかかって出てきたら、その式で割る直し方は効くだろうか。割った式も一緒に微分されてしまわないか——それが次の系列の入口である。

**この先の景色。** 「微分して確かめられる探索」は、方程式の解を代入して確かめる、因数分解を展開して確かめる、と同じ型である。大学では、変化の規則（微分方程式）から状態そのものを逆算する問題が、物理・生物・経済のあらゆる場所に現れる。そこでも最初の一歩は「候補を作って、微分して確かめる」である。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「積分の基本的な考え方」の構成（微分の公式を逆から読む・候補を微分して数の倍率の食い違いを直す・$f(ax+b)$ の巻き戻し）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

逆から読んだ候補のずれは、微分すれば見える。ずれが**数をかけただけ**なら——下ろした肩でも、$-1$ でも、中の係数でも、それらの積でも——その数で割れば直る。数は微分の外に出せるからである。

和なら、項ごとに割ればよい。直したかどうかは、もう一度微分すれば確かめられる。

ずれが数でなく関数になったときは、この直し方は効かない。そこから先が、この章の残りの仕事である。`,
};

/** M3INT2: 1/x の巻き戻し——負の側をどう覆うか（三段）。
 *  段1＝step1〜3（log(−x) を微分すると 1/x が現れる）／段2＝step4〜5（log(−x) を原始関数にして負の区間を計算）／段3＝step6〜10
 *  ★系列2 の核（log x では x<0 を覆えない）は値では検出できない★（負の区間で符号を落としても 1/x が奇関数なので同じ値＝背骨 D6・R1 A9）。
 *  核の発見は step2・3 と L3・derivation に置く。step3 は log(2−x) で、ラベル「1/x」だけでは届かない（解は x=−3 の 1 つ＝sympy の solve で 1 個）。
 *  山場 step9：∫_2^3 dx/(3−2x)。内側の負の係数を落とすと +log3/2、正答 −log3/2（数値積分 −0.5493 と一致）。
 *  入力：log と e（2026-10-01 拡張）。step8 の 8/log3 は「8/log 3」と打てば 8÷(log 3) と読まれる。 */
export const M3INT_LOG_SERIES: LearnerSeries = {
  id: "math3_int_log_01",
  title: "1/x の巻き戻し——負の側をどう覆うか",
  subtitle:
    "数Ⅲ・C 積分法より — $\\dfrac1x$ は負の $x$ でも生きているのに、$\\log x$ は正の $x$ でしか生きていない。$10$ 問で、逆から読んだ公式が届かない側を埋め、$\\log\\lvert x\\rvert$ を自分で組み立てる。",
  patternId: "M3INT2",
  unit: "math_3",
  revelationLabel:
    "**$\\log(-x)$ を微分しても $\\dfrac1x$ が出てくる**。だから $x<0$ の側は $\\log(-x)$ で覆え、両側をまとめて $\\log\\lvert x\\rvert$ と書ける",
  drivingQuestion:
    "$\\dfrac1x$ は $x<0$ でも生きているのに、$\\log x$ は $x>0$ でしか生きていない。**逆から読んだ公式が届かない場所を、どう埋める？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "曲線 $y = \\log x$ の、$x = 7$ の点における接線の**傾き**を求めましょう。",
      answer: 1 / 7,
      answerDisplay: "1/7",
      unit: "",
      unknownLabel: "$x = 7$ の点での接線の傾き",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "接線の傾きは、何を計算すれば手に入る量だった？",
        },
        {
          layer: 2,
          text: "$\\log x$ を微分すると何になったか、第4章を思い出せる？（[自然対数]）",
        },
        {
          layer: 3,
          text: "$(\\log x)' = \\dfrac1x$ なので、$x = 7$ での傾きは $\\dfrac17$。逆から読めば「微分すると $\\dfrac1x$ になる関数の候補は $\\log x$」。ただし $\\log x$ は $x > 0$ でしか定義されない。$\\dfrac1x$ のほうは $x < 0$ でも値をもつのに。中心の問いへの最初の部分回答：**$x>0$ の側は、$\\log x$ が $\\dfrac1x$ を受け持っている**。",
        },
      ],
      formulaPreview: "(log x)′ = 1/x → x = 7 で 1/7",
      figureMarker: "<<M3INT_LOG_PAIR>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$x < 0$ で定義された曲線 $y = \\log(-x)$ の、$x = -6$ の点における接線の**傾き**を求めましょう。",
      answer: -1 / 6,
      answerDisplay: "-1/6",
      unit: "",
      unknownLabel: "$x = -6$ の点での接線の傾き",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。曲線は前題のものを $y$ 軸で折り返した形。傾きはどうなるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$\\log$ の中身が $x$ から $-x$ になったこと。中身が $x$ でない $\\log$ を微分するとき、第3章で何を掛けた？（[合成関数の微分法]）",
        },
        {
          layer: 3,
          text: "合成関数の微分で $\\{\\log(-x)\\}' = \\dfrac{1}{-x}\\cdot(-x)' = \\dfrac{1}{-x}\\cdot(-1) = \\dfrac1x$。$x = -6$ で $-\\dfrac16$。**前題と同じ $\\dfrac1x$ が、負の側にも出てきた**。折り返すと傾きの符号が逆になるので、右の枝の傾き（正）を折り返した左の枝の傾きは負——それがちょうど $x<0$ での $\\dfrac1x$ の値になっている。中心の問いへ：**$x<0$ の側で $\\dfrac1x$ を受け持てるのは $\\log(-x)$**。",
        },
      ],
      formulaPreview: "{log(−x)}′ = (1/(−x))·(−1) = 1/x → x = −6 で −1/6",
      figureMarker: "<<M3INT_LOG_NEG>>",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$x < 2$ で定義された曲線 $y = \\log(2 - x)$ の上で、接線の傾きが $-\\dfrac15$ になる点を探します。その点の **$x$ 座標**を求めましょう。",
      answer: -3,
      answerDisplay: "-3",
      unit: "",
      unknownLabel: "傾きが $-\\dfrac15$ になる点の $x$ 座標",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が分かっていて、何を探している？" },
        {
          layer: 2,
          text: "前題と向きが逆。前題は点が先にあって傾きを出した。今度は傾きが先にあって、点を探す。",
        },
        {
          layer: 3,
          text: "前題と同じく合成関数の微分で $\\{\\log(2-x)\\}' = \\dfrac{1}{2-x}\\cdot(-1) = \\dfrac{1}{x-2}$。$\\dfrac{1}{x-2} = -\\dfrac15$ より $x - 2 = -5$、$x = -3$（$x < 2$ を満たす。解はこの $1$ つ）。グラフは $y = \\log(-x)$ を右へ $2$ ずらした形なので、傾きも「$x$ から $2$ を引いた数の逆数」になる。中心の問いへ：**中身が負の向きの $\\log$ でも、微分すると「中身の逆数」が符号ごと出てくる**。",
        },
      ],
      formulaPreview: "{log(2−x)}′ = 1/(x−2) = −1/5 → x − 2 = −5 → x = −3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "定積分 $\\displaystyle\\int_{-8}^{-2}\\frac{1}{x}\\,dx$ の値を求めましょう。$\\log$ を使ったまま答えてかまいません（例：$\\log 5$、$-3\\log 2$）。",
      answer: -Math.log(4),
      answerDisplay: "-2log2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_{-8}^{-2}\\frac{1}{x}\\,dx$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      inputAffordances: ["log"],
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。扱っている側（$x$ が負の側）は同じ。今度は何を求めている？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、傾きを出すのでなく、$\\dfrac1x$ を区間で積分すること。区間は全部 $x<0$ の側にある。$\\log x$ にこの区間の数を入れられる？",
        },
        {
          layer: 3,
          text: "区間 $-8 \\le x \\le -2$ では $\\log x$ が定義されない（負の数の $\\log$ は無い）。step2 で、$x<0$ では $\\log(-x)$ を微分すると $\\dfrac1x$ になると分かったので、これを原始関数にする：$\\displaystyle\\int_{-8}^{-2}\\frac{dx}{x} = \\Big[\\log(-x)\\Big]_{-8}^{-2} = \\log 2 - \\log 8 = -\\log 4 = -2\\log 2$。値が負なのは、$x<0$ で $\\dfrac1x$ が負だから。中心の問いへ：**$\\log x$ が届かない区間でも、$\\log(-x)$ を使えば巻き戻せる**。",
        },
      ],
      formulaPreview: "log(−x) に −2 と −8 を入れて引く → log 2 − log 8 = −2log 2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "定積分 $\\displaystyle\\int_{-e^3}^{-e}\\frac{1}{x}\\,dx$ の値を求めましょう。",
      answer: -2,
      answerDisplay: "-2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_{-e^3}^{-e}\\frac{1}{x}\\,dx$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      inputAffordances: ["log", "e"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、区間の端が $e$ を使って書かれていること。",
        },
        {
          layer: 3,
          text: "前題と同じく $\\log(-x)$ を原始関数にして $\\Big[\\log(-x)\\Big]_{-e^3}^{-e} = \\log e - \\log e^3 = 1 - 3 = -2$。別の道で確かめると：$x = -t$ と置き換えれば、$x$ が $-e^3$ から $-e$ へ動くとき $t$ は $e^3$ から $e$ へ動き、$\\dfrac{dx}{x} = \\dfrac{-dt}{-t} = \\dfrac{dt}{t}$ なので $\\displaystyle\\int_{e^3}^{e}\\frac{dt}{t} = \\log e - \\log e^3 = -2$。同じ値になる。中心の問いへ：**負の側の積分は、折り返した正の側の積分で確かめられる**。",
        },
      ],
      formulaPreview: "log(−x) に −e と −e³ を入れて引く → log e − log e³ = 1 − 3 = −2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$x$ が正でも負でも使える形で、$\\displaystyle\\int\\frac{1}{6x + 5}\\,dx = k\\log\\lvert 6x + 5\\rvert + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 6,
      answerDisplay: "1/6",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\frac{dx}{6x+5} = k\\log\\lvert 6x+5\\rvert + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。分母の $x$ が $1$ 次式のかたまりになった。系列1 でかたまりを巻き戻したときの手つきは、ここでも使える？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、$x$ が正の側でも負の側でも使える $1$ 本の式で答えること。",
        },
        {
          layer: 3,
          text: "$x>0$ では $\\log x$、$x<0$ では $\\log(-x)$ が $\\dfrac1x$ の原始関数だった。$\\lvert x\\rvert$ は $x>0$ で $x$、$x<0$ で $-x$ なので、両方まとめて $(\\log\\lvert x\\rvert)' = \\dfrac1x$（[対数関数の微分]）。かたまり $6x+5$ について候補 $\\log\\lvert 6x+5\\rvert$ を微分すると $\\dfrac{6}{6x+5}$ で $6$ 倍ずれる（系列1 と同じずれ）。$6$ で割って $k = \\dfrac16$。中心の問いへ：**正の側と負の側を貼り合わせると、$\\log\\lvert\\ \\rvert$ の $1$ 本の式になる**。",
        },
      ],
      formulaPreview: "(log|6x+5|)′ = 6/(6x+5) → 6 で割って k = 1/6",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\int e^{1 - 4x}\\,dx = k\\,e^{1-4x} + C$ と書けます。$k$ を求めましょう。",
      answer: -1 / 4,
      answerDisplay: "-1/4",
      unit: "",
      unknownLabel: "$\\displaystyle\\int e^{1-4x}\\,dx = k\\,e^{1-4x} + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。かたまりの巻き戻しであることは同じ。外側の関数はどう変わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、外側の関数が $\\dfrac1x$ から $e^x$ になったこと。$e^x$ を微分すると何になったか、第4章を思い出せる？",
        },
        {
          layer: 3,
          text: "$(e^x)' = e^x$ なので、$e^x$ の候補は $e^x$ 自身。かたまり $1-4x$ について候補 $e^{1-4x}$ を微分すると $e^{1-4x}\\cdot(-4)$ で、$-4$ 倍ずれる。$-4$ で割って $k = -\\dfrac14$。中心の問いへ：**指数関数も、逆から読んだ候補のずれを割れば巻き戻せる。$e^x$ は自分自身が候補**。",
        },
      ],
      formulaPreview: "(e^(1−4x))′ = −4e^(1−4x) → −4 で割って k = −1/4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "定積分 $\\displaystyle\\int_0^2 3^x\\,dx$ の値を求めましょう。$\\log$ を使ったまま答えてかまいません。",
      answer: 8 / Math.log(3),
      answerDisplay: "8/log3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^2 3^x\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。指数関数であることは同じ。何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、底が $e$ でなく $3$ になったこと。$a^x$ を微分すると何が出てきたか、第4章を思い出せる？",
        },
        {
          layer: 3,
          text: "$(3^x)' = (\\log 3)\\,3^x$ だったので、候補 $3^x$ を微分すると $\\log 3$ 倍ずれる。$\\log 3$ で割って $\\displaystyle\\int 3^x\\,dx = \\frac{3^x}{\\log 3} + C$。$\\displaystyle\\int_0^2 3^x\\,dx = \\frac{9 - 1}{\\log 3} = \\frac{8}{\\log 3}$。入力は「8/log3」（$8 \\div \\log 3$ と読まれる）。中心の問いへ：**ずれの倍率は $\\log 3$ のような数のこともある。$0$ でない数であるかぎり、割れば直る**。",
        },
      ],
      formulaPreview: "(3^x)′ = (log 3)·3^x → ∫ = 3^x / log 3 → 0 から 2 で 8/log 3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "定積分 $\\displaystyle\\int_2^3\\frac{1}{3 - 2x}\\,dx$ の値を求めましょう。この区間では $3 - 2x$ が負であることに注意しましょう。",
      answer: -Math.log(3) / 2,
      answerDisplay: "-(log3)/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_2^3\\frac{dx}{3-2x}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      inputAffordances: ["log"],
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。分母が $1$ 次式のかたまりであることは同じ。何が重なっている？",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、かたまりの $x$ の係数が負で、しかも区間全体でかたまりが負になっていること。",
        },
        {
          layer: 3,
          text: "候補 $\\log\\lvert 3-2x\\rvert$ を微分すると $\\dfrac{-2}{3-2x}$ で、$-2$ 倍ずれる。$-2$ で割って $\\displaystyle\\int\\frac{dx}{3-2x} = -\\frac12\\log\\lvert 3-2x\\rvert + C$。区間 $2 \\le x \\le 3$ では $3-2x$ は $-1$ から $-3$ で負なので、絶対値を外すと $\\log(2x-3)$。$\\displaystyle\\Big[-\\frac12\\log(2x-3)\\Big]_2^3 = -\\frac12(\\log 3 - \\log 1) = -\\frac{\\log 3}{2}$。内側の係数 $-2$ を落として $\\dfrac12$ で割ると $+\\dfrac{\\log 3}{2}$ になり、符号が逆。被積分関数はこの区間でずっと負なので、正の値が出たら食い違いに気づける。入力は「-(log3)/2」。中心の問いへ：**負の側を覆う絶対値と、内側の負の係数は、別々に確かめる**。",
        },
      ],
      formulaPreview: "∫ = −(1/2)log|3−2x| → 2 から 3 で −(1/2)(log 3 − log 1) = −(log 3)/2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "定積分 $\\displaystyle\\int_0^2\\frac{x^2 + 3x + 1}{x + 1}\\,dx$ の値を求めましょう。",
      answer: 6 - Math.log(3),
      answerDisplay: "6-log3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^2\\frac{x^2+3x+1}{x+1}\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      inputAffordances: ["log"],
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。分母が $1$ 次式であることは同じ。分子はどうなった？",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、分子の次数が分母より大きいこと。数Ⅱで、整式を $1$ 次式で割ったとき、商と余りで何が書けた？（[除法の基本式]）",
        },
        {
          layer: 3,
          text: "$x^2 + 3x + 1$ を $x+1$ で割ると、商 $x+2$、余り $-1$。だから $\\dfrac{x^2+3x+1}{x+1} = x + 2 - \\dfrac{1}{x+1}$。多項式の部分は数Ⅱの巻き戻し、$\\dfrac{1}{x+1}$ は $\\log\\lvert x+1\\rvert$。$\\displaystyle\\Big[\\frac{x^2}{2} + 2x - \\log(x+1)\\Big]_0^2 = (2 + 4 - \\log 3) - 0 = 6 - \\log 3$。中心の問いへ：**読めない形も、割り算で「多項式 ＋ $\\dfrac{1}{1次式}$」に作り替えれば、$\\log$ の在庫で巻き戻せる**。",
        },
      ],
      formulaPreview: "(x²+3x+1)/(x+1) = x + 2 − 1/(x+1) → x²/2 + 2x − log(x+1) に 2 と 0 を入れて引く → 6 − log 3",
    },
  ],
  derivation: `**中心の問い** ｜ $\\dfrac1x$ は $x<0$ でも生きているのに、$\\log x$ は $x>0$ でしか生きていない。**逆から読んだ公式が届かない場所を、どう埋める？**

────────

## 逆から読んだ公式の、届かない場所

第4章で $(\\log x)' = \\dfrac1x$ を手に入れた。逆から読めば、「微分すると $\\dfrac1x$ になる関数の候補は $\\log x$」になる（step1）。

ところが、この逆読みは半分しか覆っていない。$\\dfrac1x$ は $x = 0$ 以外のすべての実数で値をもつのに、$\\log x$ は $x>0$ でしか定義されない。$x<0$ の側では、$\\dfrac1x$ を受け持つ関数がまだ無い。

（数Ⅱでは $\\displaystyle\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$ を使った。$n = -1$ のときだけ分母が $0$ になってこの式は使えない。その穴を埋めるのが $\\log$ で、しかも $\\log$ は半分しか埋めていない——これがこの系列の出発点である。）

## ここが胚細胞：覆えていない側を、別の関数で貼り合わせる

$y = \\log x$ を $y$ 軸で折り返した $y = \\log(-x)$ は、$x<0$ で定義される。合成関数の微分で

$$\\{\\log(-x)\\}' = \\frac{1}{-x}\\cdot(-1) = \\frac1x$$

**同じ $\\dfrac1x$ が出てくる**（step2）。だから $x<0$ の側は $\\log(-x)$ が受け持てる。両側をまとめると、$\\lvert x\\rvert$ が $x>0$ で $x$、$x<0$ で $-x$ であることを使って

$$(\\log\\lvert x\\rvert)' = \\frac1x, \\qquad \\int\\frac{dx}{x} = \\log\\lvert x\\rvert + C$$

と $1$ 本に書ける（step6）。**覚える式ではない。** $\\log x$ と、それを折り返した $\\log(-x)$ の $2$ 本を、$y$ 軸をはさんで貼り合わせたものである。

<<M3INT_LOG_NEG>>

## 値では見えにくい発見

負の区間の積分（step4・5）で、うっかり「$\\log x$ に負の数を入れてしまう」ことはできない。負の数の $\\log$ は定義されないからである。では「符号を無視して正の区間で計算する」とどうなるか——**同じ値になる**。$\\dfrac1x$ は原点について対称（奇関数）なので、$-8$ から $-2$ までの積分は、$2$ から $8$ までの積分の符号を変えたものに等しい（step5 の L3 で、$x = -t$ と置き換えて確かめた）。

だからこの系列の発見（負の側は $\\log(-x)$ が受け持つ）は、答えの値だけでは確かめにくい。**確かめる場所は、step2 の微分そのもの**である。

## Step の道筋

- **step1〜3**（事例）：$\\log x$ と $\\log(-x)$、$\\log(2-x)$ の接線の傾き。負の側にも $\\dfrac1x$（と、その仲間）が出てくる
- **step4・5**（なぜ）：$x<0$ の区間の $\\dfrac1x$ を、$\\log(-x)$ を原始関数にして積分する
- **step6**：$\\log\\lvert\\ \\rvert$ に貼り合わせ、$1$ 次式のかたまりへ
- **step7・8**：指数関数の巻き戻し（ずれは $-4$ や $\\log 3$）
- **step9（山場）**：かたまりが区間全体で負、しかも内側の係数が負
- **step10**：割り算で「多項式 ＋ $\\dfrac1{1次式}$」に作り替える

────────

**もっと深く**

**忘れても導ける。** $\\displaystyle\\int\\frac{dx}{x}$ を忘れたら、$\\log x$ の微分を思い出し、「$x<0$ の側は？」と自分に問う。$\\log(-x)$ を微分すれば答えが出る。絶対値は、その $2$ つを $1$ 本にまとめた書き方にすぎない。

**$\\displaystyle\\int\\frac{dx}{x} = \\log x + C$ と書いてしまうのは、よくある取りこぼしである。** $x>0$ の区間で使うかぎり値は合うが、$x<0$ の区間では $\\log x$ そのものが定義されず、式が使えない。絶対値を書いておけば、区間がどちら側にあっても同じ $1$ 本の式で計算できる。

**「中身の微分分の中身」。** 合成関数の微分で $\\{\\log\\lvert f(x)\\rvert\\}' = \\dfrac{f'(x)}{f(x)}$ になる。step3 の $\\log(2-x)$ も step6 の $\\log\\lvert 6x+5\\rvert$ もこの形で、逆から読むと「分子が分母の微分になっている分数」は $\\log\\lvert\\text{分母}\\rvert$ に巻き戻せる。この見方は、系列4（合成関数の微分を逆に読む）で広がる。

**この先の景色。** $0$ をはさむ区間（たとえば $-1$ から $1$）で $\\dfrac1x$ を積分することは、ここまでの道具ではできない。$x = 0$ で $\\dfrac1x$ が値をもたず、どちらの原始関数も $0$ をまたいでつながっていないからである。大学では、こうした「途中で値が無限に大きくなる」積分を、極限を使って扱う（広義積分）。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「1/x の不定積分」の構成（$\\log x$ の定義域が $x<0$ を覆わないことから $\\log(-x)$ の微分へ進み、$\\log\\lvert x\\rvert$ にまとめる）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

逆から読んだ $\\log x$ は、$\\dfrac1x$ の正の側しか覆っていなかった。届かない負の側は、$y$ 軸で折り返した $\\log(-x)$ が埋める——微分すると同じ $\\dfrac1x$ が出てくるからである。

$2$ 本を貼り合わせたのが $\\log\\lvert x\\rvert$ で、かたまりの中身が負になる区間でも、同じ $1$ 本の式で巻き戻せる。`,
};

/** M3INT3: 作り替えて巻き戻す——展開・次数下げ・分数関数。
 *  step1〜3：和・定数倍は巻き戻しを通り抜ける（展開してから）／山場 step3：かたまりの冪 (x²+3)² を「かたまりで」巻き戻す候補は
 *  関数倍のずれで外れる。提出値は経路に依らない F(1)（正答 56/5・誤概念の候補 (x²+3)³/3 − 9 では 37/3＝sympy・R1 A3）。
 *  step4〜6：三角の 2 次を 1 次へ（半角・倍角・積和）。区間は半周期の整数倍にしない（R1 B13）。
 *  step7〜10：分数関数（割り算・部分分数）。step8 と step9 は別の分母で作った（R1 B4）。
 *  答えの形は問題文で指定する（R1 B1：sin3x cos3x の原始関数は 2 通り以上に書ける）。
 *  原典の族（(e^x+1)^n・(x+1/√x)²・1/((x+1)(x+2))・1/((2x−1)(x+3))・(x²+1)/(x−1)・sin2x cos3x）は使わない。
 *  系列4 への預け：step3 の L3（ずれの関数はかたまりの微分そのもの＝R1 A1）。 */
export const M3INT_RESHAPE_SERIES: LearnerSeries = {
  id: "math3_int_reshape_01",
  title: "作り替えて巻き戻す——展開・次数下げ・分数を分ける",
  subtitle:
    "数Ⅲ・C 積分法より — そのままでは逆から読めない形も、和と定数倍に分ければ巻き戻せる。$10$ 問で、展開・次数下げ・割り算・部分分数の作り替えを確かめ、作り替えずに直そうとすると外れる形にも出会う。",
  patternId: "M3INT3",
  unit: "math_3",
  revelationLabel:
    "**和と定数倍は巻き戻しを通り抜ける**。だから読めない形は「巻き戻せる形の和」に作り替える。かたまりのまま割って直そうとすると、割った式まで微分されて外れる",
  drivingQuestion:
    "そのままでは逆から読めない形を、読める形に作り替えるには何を変える？——**作り替えずに、ずれを割って直そうとすると外れるのはなぜ？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\displaystyle\\int(4\\cos x - 6\\sin x)\\,dx = a\\sin x + b\\cos x + C$ と書けます。$b$ を求めましょう。",
      answer: 6,
      answerDisplay: "6",
      unit: "",
      unknownLabel: "$\\displaystyle\\int(4\\cos x - 6\\sin x)\\,dx = a\\sin x + b\\cos x + C$ の $b$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$2$ つの関数の和を巻き戻すとき、$1$ つずつ巻き戻してから足してよいだろうか？",
        },
        {
          layer: 2,
          text: "数Ⅱの積分で、和や定数倍はどう扱った？（[不定積分]）",
        },
        {
          layer: 3,
          text: "和と定数倍は、微分でも巻き戻しでも項ごとに扱える。$4\\cos x$ の候補は $4\\sin x$、$-6\\sin x$ の候補は $-6\\cdot(-\\cos x) = 6\\cos x$（$(\\cos x)' = -\\sin x$ の符号に注意）。$\\displaystyle\\int(4\\cos x - 6\\sin x)\\,dx = 4\\sin x + 6\\cos x + C$ なので $b = 6$。微分すると $4\\cos x - 6\\sin x$ に戻る。中心の問いへの最初の部分回答：**和と定数倍は巻き戻しを通り抜ける。だから「巻き戻せる形の和」なら巻き戻せる**。",
        },
      ],
      formulaPreview: "4cos x → 4sin x、−6sin x → 6cos x → b = 6",
      figureMarker: "<<M3INT_STOCK>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\displaystyle\\int\\left(\\sqrt{x} + 2\\right)^2 dx = a x^2 + b\\,x\\sqrt{x} + c x + C$ と書けます。$b$ を求めましょう。",
      answer: 8 / 3,
      answerDisplay: "8/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int(\\sqrt{x}+2)^2\\,dx = a x^2 + b\\,x\\sqrt{x} + c x + C$ の $b$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は和の形をしていない。和の形にできる？" },
        {
          layer: 2,
          text: "前題と変わったのは、被積分関数が和でなく「和の $2$ 乗」になっていること。",
        },
        {
          layer: 3,
          text: "展開すると $(\\sqrt{x}+2)^2 = x + 4\\sqrt{x} + 4$ で、巻き戻せる形の和になる。$4\\sqrt{x} = 4x^{\\frac12}$ の候補は $x^{\\frac32}$ で、微分すると $\\dfrac32$ 倍ずれるので $4\\cdot\\dfrac23 x^{\\frac32} = \\dfrac83 x\\sqrt{x}$。全体は $\\dfrac12x^2 + \\dfrac83 x\\sqrt{x} + 4x + C$ で、$b = \\dfrac83$。中心の問いへ：**和でない形は、展開して和に作り替える**。",
        },
      ],
      formulaPreview: "展開 x + 4√x + 4 → (1/2)x² + (8/3)x√x + 4x → b = 8/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "関数 $F(x)$ は、微分すると $(x^2 + 3)^2$ になり、$F(0) = 0$ を満たします。$F(1)$ を求めましょう。",
      answer: 56 / 5,
      answerDisplay: "56/5",
      unit: "",
      unknownLabel: "$F(1)$",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、$2$ 乗の中身が $x^2 + 3$ になったこと。系列1 でかたまりの冪 $(3x+2)^4$ を巻き戻したときの手つきは、ここでもそのまま効く？",
        },
        {
          layer: 3,
          text: "かたまり $x^2+3$ の冪だから、系列1 のように候補 $\\dfrac13(x^2+3)^3$ を作りたくなる。微分すると $(x^2+3)^2\\cdot(x^2+3)' = 2x\\,(x^2+3)^2$ で、ほしいものの「$2x$ 倍」——ずれが数でなく $x$ の式になる。$2x$ で割った $\\dfrac{(x^2+3)^3}{6x}$ を微分すると、割った $x$ まで微分されて元に戻らない。だからこの候補は使えない（使うと $F(1) = \\dfrac{37}{3}$ になり外れる）。前題と同じく展開する：$(x^2+3)^2 = x^4 + 6x^2 + 9$、$F(x) = \\dfrac15x^5 + 2x^3 + 9x$（$F(0)=0$ で $C = 0$）。$F(1) = \\dfrac15 + 2 + 9 = \\dfrac{56}{5}$。中心の問いへ：**ずれが $x$ の式のときは、割っても直らない。作り替えてから巻き戻す**。系列1 の $(3x+2)^4$ では、かたまりの微分が $3$（数）だった。ここではかたまりの微分が $2x$ で、候補を微分するとそれが余分に掛かって出てくる。**被積分関数のほうに、かたまりの微分がはじめから掛かっていたら？**——次の系列の問いである。",
        },
      ],
      formulaPreview: "展開 x⁴ + 6x² + 9 → F(x) = x⁵/5 + 2x³ + 9x → F(1) = 56/5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "定積分 $\\displaystyle\\int_0^{\\frac{\\pi}{3}}\\cos^2 x\\,dx$ の値を求めましょう。",
      answer: Math.PI / 6 + Math.sqrt(3) / 8,
      answerDisplay: "π/6+√3/8",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^{\\frac{\\pi}{3}}\\cos^2 x\\,dx$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      inputAffordances: ["pi", "sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 乗の形であることは同じ。展開して和にする手つきは、三角関数の $2$ 乗にも使える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$2$ 乗されているのが三角関数であること。数Ⅱの [2倍角の公式] を思い出せる？",
        },
        {
          layer: 3,
          text: "$\\cos 2x = 2\\cos^2 x - 1$ を $\\cos^2 x$ について解くと $\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}$（[半角の公式]）。$2$ 次の三角が、定数と $1$ 次の三角の和に作り替わった。$\\displaystyle\\int_0^{\\frac{\\pi}{3}}\\frac{1+\\cos 2x}{2}\\,dx = \\Big[\\frac x2 + \\frac{\\sin 2x}{4}\\Big]_0^{\\frac{\\pi}{3}} = \\frac{\\pi}{6} + \\frac{\\sqrt3}{8}$。前題のように「かたまりで巻き戻す」候補 $\\dfrac13\\cos^3 x$ は、微分すると $-\\cos^2 x\\sin x$ になり、ずれが $\\sin x$ という関数になる——同じ理由で使えない。中心の問いへ：**三角の $2$ 乗は、展開の代わりに 2 倍角の公式を逆から読んで $1$ 次に下げる**。",
        },
      ],
      formulaPreview: "cos²x = (1 + cos 2x)/2 → x/2 + sin 2x/4 に π/3 と 0 → π/6 + √3/8",
      figureMarker: "<<M3INT_HALF_ANGLE>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\displaystyle\\int\\sin 3x\\cos 3x\\,dx = k\\cos 6x + C$ と書けます。$k$ を求めましょう。",
      answer: -1 / 12,
      answerDisplay: "-1/12",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\sin 3x\\cos 3x\\,dx = k\\cos 6x + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、$2$ 次の三角が「$\\cos$ の $2$ 乗」でなく「$\\sin$ と $\\cos$ の積」になったこと。",
        },
        {
          layer: 3,
          text: "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ を逆から読むと $\\sin 3x\\cos 3x = \\dfrac12\\sin 6x$。$\\sin 6x$ の候補は $-\\cos 6x$ で、微分すると $6\\sin 6x$ なので $6$ で割る：$\\displaystyle\\int\\frac12\\sin 6x\\,dx = -\\frac{1}{12}\\cos 6x + C$。$k = -\\dfrac{1}{12}$。答えの形を $\\cos 6x$ で指定したのは、同じ関数が $\\dfrac16\\sin^2 3x$ のようにも書けて、形によって係数が変わるからである（どれも定数だけ違う）。中心の問いへ：**積の形も、2 倍角の公式を逆から読めば $1$ 次の三角に作り替えられる**。",
        },
      ],
      formulaPreview: "sin 3x cos 3x = (1/2)sin 6x → −(1/12)cos 6x → k = −1/12",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\displaystyle\\int\\sin 5x\\cos 2x\\,dx = a\\cos 7x + b\\cos 3x + C$ と書けます。$a$ を求めましょう。",
      answer: -1 / 14,
      answerDisplay: "-1/14",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\sin 5x\\cos 2x\\,dx = a\\cos 7x + b\\cos 3x + C$ の $a$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。$\\sin$ と $\\cos$ の積であることは同じ。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、$\\sin$ と $\\cos$ の中の角が違うこと（$5x$ と $2x$）。第4章で、三角関数の積と和を行き来する式を扱わなかった？（[和積の公式]）",
        },
        {
          layer: 3,
          text: "加法定理の $\\sin(\\alpha+\\beta)$ と $\\sin(\\alpha-\\beta)$ を足すと $2\\sin\\alpha\\cos\\beta$ なので、$\\sin 5x\\cos 2x = \\dfrac12(\\sin 7x + \\sin 3x)$。$\\sin 7x$ の候補 $-\\cos 7x$ は微分すると $7$ 倍ずれるので $\\dfrac12\\cdot\\left(-\\dfrac17\\cos 7x\\right) = -\\dfrac{1}{14}\\cos 7x$。$a = -\\dfrac{1}{14}$（$b = -\\dfrac16$）。中心の問いへ：**角の違う積は、積を和に直す公式で $1$ 次の三角の和に作り替える**。",
        },
      ],
      formulaPreview: "sin 5x cos 2x = (1/2)(sin 7x + sin 3x) → −(1/14)cos 7x − (1/6)cos 3x → a = −1/14",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\int\\frac{x^2 + 4x + 1}{x + 3}\\,dx = \\frac12x^2 + x + k\\log\\lvert x + 3\\rvert + C$ と書けます。$k$ を求めましょう。",
      answer: -2,
      answerDisplay: "-2",
      unit: "",
      unknownLabel: "$\\log\\lvert x+3\\rvert$ の係数 $k$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。巻き戻せる形の和に作り替えたいのは同じ。分数の形のままで、和にできる？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、被積分関数が分数で、分子の次数が分母より大きいこと。数Ⅱで、整式を $1$ 次式で割ったとき、何と何に分けて書けた？（[除法の基本式]）",
        },
        {
          layer: 3,
          text: "$x^2 + 4x + 1$ を $x + 3$ で割ると、商 $x + 1$、余り $-2$。だから $\\dfrac{x^2+4x+1}{x+3} = x + 1 - \\dfrac{2}{x+3}$。多項式の部分は $\\dfrac12x^2 + x$、$-\\dfrac{2}{x+3}$ は系列2 の $\\log\\lvert\\ \\rvert$ で $-2\\log\\lvert x+3\\rvert$。$k = -2$。中心の問いへ：**分数は、割り算で「多項式 ＋ 余り ÷ $1$ 次式」の和に作り替える**。",
        },
      ],
      formulaPreview: "(x² + 4x + 1)/(x + 3) = x + 1 − 2/(x + 3) → k = −2",
      figureMarker: "<<M3INT_DIVIDE>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\displaystyle\\int\\frac{1}{(x - 1)(x + 7)}\\,dx = k\\Big(\\log\\lvert x - 1\\rvert - \\log\\lvert x + 7\\rvert\\Big) + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 8,
      answerDisplay: "1/8",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。分数を和に作り替えたいのは同じ。今度は割り算が使える？" },
        {
          layer: 2,
          text: "前題と変わったのは、分母が $2$ つの $1$ 次式の積になっていること（分子の次数は分母より小さいので、割り算はできない）。",
        },
        {
          layer: 3,
          text: "$\\dfrac{1}{x-1} - \\dfrac{1}{x+7} = \\dfrac{(x+7) - (x-1)}{(x-1)(x+7)} = \\dfrac{8}{(x-1)(x+7)}$。ほしいものの $8$ 倍なので、$8$ で割って $\\dfrac{1}{(x-1)(x+7)} = \\dfrac18\\left(\\dfrac{1}{x-1} - \\dfrac{1}{x+7}\\right)$。それぞれ $\\log\\lvert\\ \\rvert$ に巻き戻して $k = \\dfrac18$。中心の問いへ：**積の分母は、$1$ 次式の分数の差に分けて作り替える。分けたときのずれも、数なら割れば直る**。",
        },
      ],
      formulaPreview: "1/(x−1) − 1/(x+7) = 8/((x−1)(x+7)) → 8 で割って k = 1/8",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$\\dfrac{1}{(3x + 1)(x - 2)} = \\dfrac{a}{3x + 1} + \\dfrac{b}{x - 2}$ がどんな $x$ についても成り立つように、定数 $a$、$b$ を決めます。$a$ を求めましょう。",
      answer: -3 / 7,
      answerDisplay: "-3/7",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。分け方の形が先に与えられている。何を探す問題になった？" },
        {
          layer: 2,
          text: "前題と向きが逆。前題は差を作ってから倍率を合わせた。今度は分けた形が先にあって、係数を探す。数Ⅱで、どんな $x$ でも成り立つ等式から係数を決める問題を何と呼んだ？（[恒等式]）",
        },
        {
          layer: 3,
          text: "両辺に $(3x+1)(x-2)$ を掛けると $1 = a(x-2) + b(3x+1)$。どんな $x$ でも成り立つので、$x = -\\dfrac13$ を入れると $1 = a\\left(-\\dfrac73\\right)$、$a = -\\dfrac37$（$x = 2$ を入れると $b = \\dfrac17$）。前題のように差を作る道では、$3x+1$ と $x-2$ の $x$ の係数がそろっていないので、倍率をそろえる手間がかかる。中心の問いへ：**分け方は、[部分分数分解] の係数を恒等式で決めれば、係数がそろっていなくても作れる**。",
        },
      ],
      formulaPreview: "1 = a(x − 2) + b(3x + 1)、x = −1/3 → a = −3/7（x = 2 → b = 1/7）",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "定積分 $\\displaystyle\\int_2^4\\frac{x^2 + x + 4}{x^2 + x - 2}\\,dx$ の値を求めましょう。",
      answer: 2 + 2 * Math.log(2),
      answerDisplay: "2+2log2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_2^4\\frac{x^2+x+4}{x^2+x-2}\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "step7 と比べてみよう。分数を作り替えるのは同じ。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step7 と変わったのは、割り算をしたあとの余りの分母が、$1$ 次式でなく $2$ 次式であること。",
        },
        {
          layer: 3,
          text: "分子 $= $ 分母 $+ 6$ なので、割ると $1 + \\dfrac{6}{x^2+x-2} = 1 + \\dfrac{6}{(x-1)(x+2)}$。step8 のように差を作ると $\\dfrac{1}{x-1} - \\dfrac{1}{x+2} = \\dfrac{3}{(x-1)(x+2)}$ なので、$\\dfrac{6}{(x-1)(x+2)} = 2\\left(\\dfrac{1}{x-1} - \\dfrac{1}{x+2}\\right)$。$\\displaystyle\\int_2^4 = \\Big[x + 2\\log(x-1) - 2\\log(x+2)\\Big]_2^4 = (4 + 2\\log 3 - 2\\log 6) - (2 + 0 - 2\\log 4) = 2 + 2\\log\\frac{3\\cdot 4}{6} = 2 + 2\\log 2$。中心の問いへ：**割り算と部分分数を重ねれば、分数を「巻き戻せる形の和」に作り替えられる**。",
        },
      ],
      formulaPreview: "1 + 2(1/(x−1) − 1/(x+2)) → x + 2log(x−1) − 2log(x+2) に 4 と 2 → 2 + 2log 2",
    },
  ],
  derivation: `**中心の問い** ｜ そのままでは逆から読めない形を、読める形に作り替えるには何を変える？——**作り替えずに、ずれを割って直そうとすると外れるのはなぜ？**

────────

## 巻き戻せる形の在庫

系列1・2 で、微分の公式を逆から読んで巻き戻せる形がそろった。冪 $x^{\\alpha}$、三角関数 $\\sin$・$\\cos$・$\\dfrac{1}{\\cos^2}$、指数 $e^x$・$a^x$、そして $\\dfrac1x$。中にかたまり $ax+b$ が入っていても、ずれは数なので割れば直る。

## ここが胚細胞：和と定数倍は、巻き戻しを通り抜ける

微分は、和を項ごとに、定数倍は外に出したまま扱えた。だから巻き戻しも同じである（step1）。すると方針が立つ——**読めない形は、在庫の形の和に作り替えればよい**。

| 読めない形 | 作り替え | step |
|---|---|---|
| 和の $2$ 乗・かたまりの $2$ 乗 | 展開する | 2・3 |
| 三角の $2$ 乗・積 | 2 倍角の公式を逆から読む（[半角の公式]）／積を和に直す | 4〜6 |
| 分子の次数が大きい分数 | 割り算で「多項式 ＋ 余り ÷ $1$ 次式」に | 7 |
| $1$ 次式の積が分母 | $1$ 次式の分数の差に分ける（[部分分数分解]） | 8〜10 |

<<M3INT_STOCK>>

## 作り替えずに直そうとすると、なぜ外れるか

$(x^2+3)^2$ を「$x^2+3$ のかたまりの $2$ 乗」と見て、系列1 のように候補 $\\dfrac13(x^2+3)^3$ を作ると、微分して $2x\\,(x^2+3)^2$ が出てくる（step3）。ずれが $2x$ という**関数**である。

系列1 のずれは数だった。数は微分の外に出せるので、割っておけば微分のあとも割ったままでいる。ところが $2x$ で割った式を微分すると、**割った $2x$ も一緒に微分される**（[商の微分]）。だから割っても元に戻らない。

この区別は池田（2024）が言葉にしている——「簡単に補正ができるのは『定数倍のズレ』であるときに限る」「『関数倍のズレ』が生じたときは補正しようとしてもうまくいかない」（p.214）。**関数のずれは、割り算では直らない。** だからこの系列では、ずれが出ない形に作り替えてから巻き戻した。

## Step の道筋

- **step1・2**：和と定数倍・展開
- **step3（山場）**：かたまりの冪。かたまりで巻き戻すと関数のずれが出て外れる。展開が正しい道
- **step4〜6**：三角の $2$ 次を $1$ 次の和へ（2 倍角の逆読み・積和）
- **step7**：割り算で分数を分ける
- **step8・9**：部分分数（差を作る道・恒等式の道）
- **step10**：割り算と部分分数を重ねる

────────

**もっと深く**

**忘れても導ける。** [半角の公式] は覚えなくてよい。$\\cos 2x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x$ を $\\cos^2 x$・$\\sin^2 x$ について解けば出てくる。積を和に直す式も、加法定理を $2$ 本並べて足すか引けば出てくる。部分分数の係数も、差を通分して倍率を見るか、恒等式に代入すれば出る。

**$\\sin^2 x$ を $\\dfrac13\\sin^3 x$ と巻き戻すのは、よくある取りこぼし**（池田 2024 も同じ例を挙げている）。微分すると $\\sin^2 x\\cos x$ で、ずれが $\\cos x$ という関数になる。微分して確かめれば、その場で食い違いが見える。

**答えの形は $1$ つとは限らない。** $\\sin 3x\\cos 3x$ の巻き戻しは $-\\dfrac{1}{12}\\cos 6x$ とも $\\dfrac16\\sin^2 3x$ とも書ける（微分すればどちらも同じ）。$2$ つの式の差は定数で、$+C$ に吸い込まれる。だから係数を問うときは、答えの形を先に決めておく。

**この先の景色。** 分数関数を $1$ 次式の分数の和に分ける操作は、分母が因数分解できる限り、どこまでも続けられる（分母に $2$ 次式が残るときは、系列10 の三角関数の置き換えがそこを受け持つ）。大学では、微分方程式を解く道具（ラプラス変換）の最後の一歩として、同じ部分分数分解が何度も現れる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「1/x の不定積分」の節にある練習（展開・次数下げ・積和・割り算・部分分数）の構成と、「定数倍のズレ」「関数倍のズレ」の区別（p.214・引用）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

和と定数倍は巻き戻しを通り抜ける。だから読めない形は、展開・2 倍角の逆読み・積を和に直す式・割り算・部分分数で、**巻き戻せる形の和**に作り替えればよい。

作り替えずに、かたまりのまま巻き戻した候補を割って直そうとすると、ずれが $x$ の式になっているので、割った式まで微分されて元に戻らない。直せるのは数のずれだけである。`,
};

/** M3INT4: 合成関数の微分を逆に読む——内側の微分がはじめから掛かっている形。
 *  胚細胞（背骨・R1 A1）：被積分関数に「かたまりの微分」（の定数倍）がはじめから掛かっていれば、
 *  候補（外側だけ巻き戻したもの）を微分してもずれは出ないか数だけ。系列3 step3 の預けの返済。
 *  step1：第3章の確認（微分）／step2（逆）：別の関数を巻き戻す（R1 B2：step1 の式をそのまま戻さない）
 *  山場 step8（③手間型）：∫₀¹ x²(x³+1)⁶ dx。展開すると 7 項、跡を見れば 1 行。提出値は経路に依らない定積分（R1 A3）。
 *  「跡でしか解けない」とは書かない（展開の道は開いている＝追補18-b）。
 *  原典の族（2x(x²+1)⁵・sin³x cos x・e^{2x}/(e^{2x}+1)・x e^{x²}・2x/(x²+1)・x²√(x³+1)）と定数違いにならない形を選んだ。
 *  答え：12・1/24・−1/5・1/30・2/3・−1/2・1/12・127/21・2・log 2（相異なる。系列1〜3 の同じ型の値と重ならない）。 */
export const M3INT_TRACE_SERIES: LearnerSeries = {
  id: "math3_int_trace_01",
  title: "合成関数の微分を逆に読む——内側の微分が掛かっていたら",
  subtitle:
    "数Ⅲ・C 積分法より — 合成関数を微分すると「外側の微分 × 内側の微分」になった。逆から読むと、内側の微分がはじめから掛かっている形は、内側をひとかたまりにして外側だけ巻き戻せる。$10$ 問で、その形を見抜く。",
  patternId: "M3INT4",
  unit: "math_3",
  revelationLabel:
    "**かたまりの微分がはじめから掛かっていれば、外側だけ巻き戻した候補を微分してもずれが出ない**。系列3 で直らなかったずれは、被積分関数のほうがその因子を持っていれば消える",
  drivingQuestion:
    "合成関数の微分は「外側の微分 × 内側の微分」だった。**積分する関数に内側の微分がはじめから掛かっていたら、なぜ一気に巻き戻せる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "関数 $(x^3 + 2)^4$ を微分すると、$k\\,x^2(x^3 + 2)^3$ の形になります。$k$ を求めましょう。",
      answer: 12,
      answerDisplay: "12",
      unit: "",
      unknownLabel: "$\\{(x^3+2)^4\\}' = k\\,x^2(x^3+2)^3$ の $k$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "かたまりの入った関数を微分するとき、かたまりの外と中で、それぞれ何をした？",
        },
        {
          layer: 2,
          text: "第3章で、かたまりの入った関数を微分するとき、最後に何を掛けた？（[合成関数の微分法]）",
        },
        {
          layer: 3,
          text: "$x^3 + 2$ をひとかたまりと見ると、外側は「かたまりの $4$ 乗」。外側を微分して $4(x^3+2)^3$、それに内側の微分 $(x^3+2)' = 3x^2$ を掛ける：$4(x^3+2)^3\\cdot 3x^2 = 12x^2(x^3+2)^3$。$k = 12$。結果には、**内側の微分 $3x^2$ が掛かったまま残っている**。中心の問いへの最初の部分回答：**合成関数を微分した結果は「外側の微分 × 内側の微分」の形をしている**。",
        },
      ],
      formulaPreview: "4(x³+2)³ × (x³+2)′ = 4(x³+2)³ × 3x² = 12x²(x³+2)³",
      figureMarker: "<<M3INT_CHAIN>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\displaystyle\\int x^3(x^4 + 1)^5\\,dx = k\\,(x^4 + 1)^6 + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 24,
      answerDisplay: "1/24",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x^3(x^4+1)^5\\,dx = k(x^4+1)^6 + C$ の $k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。向きが入れかわった。前題で見た形と、この被積分関数の形は似ている？" },
        {
          layer: 2,
          text: "前題と変わったのは向き。前題は合成関数を微分した。今度は、前題の答えに似た形をした関数を巻き戻す。",
        },
        {
          layer: 3,
          text: "$x^4 + 1$ をかたまりと見ると、その微分は $4x^3$。被積分関数には $x^3$ が掛かっている——内側の微分の $\\dfrac14$ 倍がはじめから入っている。候補 $(x^4+1)^6$ を微分すると $6(x^4+1)^5\\cdot 4x^3 = 24x^3(x^4+1)^5$ で、ずれは $24$（数）。$24$ で割って $k = \\dfrac{1}{24}$。系列3 の $(x^2+3)^2$ では、候補を微分すると $2x$ という関数が余分に出た。ここでは $x^3$ が被積分関数に先に入っているので、出てくるのは数だけ。中心の問いへ：**内側の微分が掛かっていれば、外側だけ巻き戻した候補のずれは数になる**。",
        },
      ],
      formulaPreview: "((x⁴+1)⁶)′ = 6(x⁴+1)⁵·4x³ = 24x³(x⁴+1)⁵ → 24 で割って k = 1/24",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\displaystyle\\int(1 + \\cos x)^4\\sin x\\,dx = k\\,(1 + \\cos x)^5 + C$ と書けます。$k$ を求めましょう。",
      answer: -1 / 5,
      answerDisplay: "-1/5",
      unit: "",
      unknownLabel: "$\\displaystyle\\int(1+\\cos x)^4\\sin x\\,dx = k(1+\\cos x)^5 + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、かたまりが三角関数の式（$1 + \\cos x$）になったこと。",
        },
        {
          layer: 3,
          text: "かたまり $1 + \\cos x$ の微分は $-\\sin x$。被積分関数には $\\sin x$ が掛かっていて、内側の微分の $-1$ 倍。候補 $(1+\\cos x)^5$ を微分すると $5(1+\\cos x)^4\\cdot(-\\sin x)$ で、ずれは $-5$。$k = -\\dfrac15$。中心の問いへ：**かたまりが三角関数でも、掛かっているものが内側の微分（の数倍）かどうかを見ればよい**。",
        },
      ],
      formulaPreview: "((1+cos x)⁵)′ = 5(1+cos x)⁴·(−sin x) → −5 で割って k = −1/5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\displaystyle\\int x(3x^2 + 1)^4\\,dx = k\\,(3x^2 + 1)^5 + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 30,
      answerDisplay: "1/30",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x(3x^2+1)^4\\,dx = k(3x^2+1)^5 + C$ の $k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "step2 と比べてみよう。かたまりの冪に $x$ の式が掛かっているのは同じ。何が加わった？" },
        {
          layer: 2,
          text: "step2 と変わったのは、掛かっている $x$ と、かたまりの微分との「倍率」が $1$ よりかなり小さいこと。",
        },
        {
          layer: 3,
          text: "かたまり $3x^2 + 1$ の微分は $6x$ で、被積分関数の $x$ はその $\\dfrac16$ 倍。候補 $(3x^2+1)^5$ を微分すると $5(3x^2+1)^4\\cdot 6x = 30x(3x^2+1)^4$。ずれは $30$ で、$k = \\dfrac{1}{30}$。倍率を $5$ だけと思って $\\dfrac15$ にすると、微分したとき $6x$ が残って食い違う——**内側の微分を掛け忘れると、ずれの数を取り違える**。中心の問いへ：**掛かっているのが内側の微分の数倍なら、その数ごと割る**。",
        },
      ],
      formulaPreview: "((3x²+1)⁵)′ = 5(3x²+1)⁴·6x = 30x(3x²+1)⁴ → k = 1/30",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\displaystyle\\int\\frac{2x^2 + 2}{x^3 + 3x + 4}\\,dx = k\\log\\lvert x^3 + 3x + 4\\rvert + C$ と書けます。$k$ を求めましょう。",
      answer: 2 / 3,
      answerDisplay: "2/3",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は「かたまりの冪 × 内側の微分」だった。分数の形の中に、同じような組み合わせが見えないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、かたまりが冪の中でなく、分母にあること。",
        },
        {
          layer: 3,
          text: "分母 $x^3 + 3x + 4$ をかたまり $t$ と見ると、外側は $\\dfrac1t$——系列2 の $\\log\\lvert t\\rvert$ の形。かたまりの微分は $3x^2 + 3$ で、分子 $2x^2 + 2$ はその $\\dfrac23$ 倍。候補 $\\log\\lvert x^3+3x+4\\rvert$ を微分すると $\\dfrac{3x^2+3}{x^3+3x+4}$ で、ほしいものの $\\dfrac32$ 倍。$\\dfrac32$ で割って $k = \\dfrac23$。中心の問いへ：**分子が分母の微分（の数倍）になっている分数は、分母をかたまりにした $\\log\\lvert\\ \\rvert$ に巻き戻せる**。",
        },
      ],
      formulaPreview: "(log|x³+3x+4|)′ = (3x²+3)/(x³+3x+4) → 分子は 2/3 倍 → k = 2/3",
      figureMarker: "<<M3INT_FPRIME_F>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\displaystyle\\int\\sin 2x\;e^{\\cos 2x}\\,dx = k\\,e^{\\cos 2x} + C$ と書けます。$k$ を求めましょう。",
      answer: -1 / 2,
      answerDisplay: "-1/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\sin 2x\\,e^{\\cos 2x}\\,dx = k\\,e^{\\cos 2x} + C$ の $k$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、外側の関数が $\\dfrac1t$ から $e^t$ になったこと。",
        },
        {
          layer: 3,
          text: "$\\cos 2x$ をかたまり $t$ と見ると、外側は $e^t$。かたまりの微分は $-2\\sin 2x$ で、被積分関数の $\\sin 2x$ はその $-\\dfrac12$ 倍。候補 $e^{\\cos 2x}$ を微分すると $e^{\\cos 2x}\\cdot(-2\\sin 2x)$ で、ずれは $-2$。$k = -\\dfrac12$。中心の問いへ：**外側が指数関数でも、内側の微分が掛かっていれば外側だけ巻き戻せる**。",
        },
      ],
      formulaPreview: "(e^(cos 2x))′ = e^(cos 2x)·(−2sin 2x) → −2 で割って k = −1/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\int x\\sqrt{4x^2 + 1}\\,dx = k\\,(4x^2 + 1)\\sqrt{4x^2 + 1} + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 12,
      answerDisplay: "1/12",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。かたまりに $x$ が掛かっているのは同じ。何が加わった？" },
        {
          layer: 2,
          text: "step4 と変わったのは、外側がかたまりの $4$ 乗でなく、かたまりの平方根であること。",
        },
        {
          layer: 3,
          text: "$\\sqrt{4x^2+1} = (4x^2+1)^{\\frac12}$。候補は肩を $1$ 上げた $(4x^2+1)^{\\frac32} = (4x^2+1)\\sqrt{4x^2+1}$。微分すると $\\dfrac32(4x^2+1)^{\\frac12}\\cdot 8x = 12x\\sqrt{4x^2+1}$。ずれは $12$ で、$k = \\dfrac{1}{12}$。中心の問いへ：**肩が分数でも、内側の微分が掛かっていれば外側だけ巻き戻せる**。",
        },
      ],
      formulaPreview: "((4x²+1)^(3/2))′ = (3/2)(4x²+1)^(1/2)·8x = 12x√(4x²+1) → k = 1/12",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "定積分 $\\displaystyle\\int_0^1 x^2(x^3 + 1)^6\\,dx$ の値を求めましょう。",
      answer: 127 / 21,
      answerDisplay: "127/21",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^1 x^2(x^3+1)^6\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。系列3 のように展開してから巻き戻すこともできる。それぞれの道で、手間はどう違いそう？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、冪が $6$ と大きく、展開するとたくさんの項に広がること。",
        },
        {
          layer: 3,
          text: "かたまり $x^3 + 1$ の微分は $3x^2$ で、被積分関数の $x^2$ はその $\\dfrac13$ 倍。候補 $(x^3+1)^7$ を微分すると $21x^2(x^3+1)^6$ なので、$\\displaystyle\\int x^2(x^3+1)^6\\,dx = \\frac{(x^3+1)^7}{21} + C$。$\\displaystyle\\Big[\\frac{(x^3+1)^7}{21}\\Big]_0^1 = \\frac{2^7 - 1}{21} = \\frac{127}{21}$。系列3 のように展開する道でも同じ値に着くが、$(x^3+1)^6$ は $7$ 項に広がり、$x^2$ を掛けて $7$ 項を $1$ つずつ巻き戻して $1$ を代入することになる。**内側の微分が見えれば、その手間が $1$ 行に縮む**。中心の問いへ：**この見方が消すのは「解けないこと」ではなく「展開する手間」**。",
        },
      ],
      formulaPreview: "∫ x²(x³+1)⁶ dx = (x³+1)⁷/21 → 0 から 1 で (128 − 1)/21 = 127/21",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "定数 $a$ をうまく選ぶと、$\\displaystyle\\int(ax + 3)(x^2 + 3x)^4\\,dx$ が $k\\,(x^2 + 3x)^5 + C$（$k$ は定数）の形に書けます。$a$ を求めましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。分かっているものと、探しているものが入れかわった。" },
        {
          layer: 2,
          text: "step4 と向きが逆。step4 は掛かっている式が与えられて、ずれの数を探した。今度は「ずれが数で済む」ように、掛かっている式のほうを決める。",
        },
        {
          layer: 3,
          text: "$k(x^2+3x)^5$ を微分すると $5k(x^2+3x)^4(2x+3)$。これが $(ax+3)(x^2+3x)^4$ と一致するには、$ax + 3$ がかたまりの微分 $2x + 3$ の数倍でなければならない。定数項を比べて $5k\\cdot 3 = 3$ より $k = \\dfrac15$、$x$ の係数を比べて $a = 5k\\cdot 2 = 2$。$a = 2$ のとき、掛かっている $2x+3$ はちょうど内側の微分。中心の問いへ：**外側だけで巻き戻せるのは、掛かっているものが内側の微分の数倍のとき——その条件で式が決まる**。",
        },
      ],
      formulaPreview: "(k(x²+3x)⁵)′ = 5k(2x+3)(x²+3x)⁴ → 3 = 15k、a = 10k → k = 1/5、a = 2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "定積分 $\\displaystyle\\int_0^{\\frac{\\pi}{3}}\\tan x\\,dx$ の値を求めましょう。",
      answer: Math.log(2),
      answerDisplay: "log2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^{\\frac{\\pi}{3}}\\tan x\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "step5 と比べてみよう。$\\tan x$ をどう書き直すと、step5 と同じ形が見えてくる？" },
        {
          layer: 2,
          text: "step5 と変わったのは、分数の形で書かれていないこと。数Ⅰの [相互関係] を思い出せる？",
        },
        {
          layer: 3,
          text: "$\\tan x = \\dfrac{\\sin x}{\\cos x}$。分母 $\\cos x$ をかたまりと見ると、その微分は $-\\sin x$ で、分子 $\\sin x$ はその $-1$ 倍。だから $\\displaystyle\\int\\tan x\\,dx = -\\log\\lvert\\cos x\\rvert + C$。$\\displaystyle\\Big[-\\log\\cos x\\Big]_0^{\\frac{\\pi}{3}} = -\\log\\frac12 + \\log 1 = \\log 2$。系列1 で $\\tan$ が出てきたのは $\\dfrac{1}{\\cos^2 x}$ の候補としてだった。$\\tan x$ そのものの巻き戻しは、この見方でようやく手に入る。中心の問いへ：**分数の形に書き直すと、内側の微分が分子に隠れていたことが見える**。",
        },
      ],
      formulaPreview: "tan x = sin x/cos x → −log|cos x| → 0 から π/3 で −log(1/2) = log 2",
    },
  ],
  derivation: `**中心の問い** ｜ 合成関数の微分は「外側の微分 × 内側の微分」だった。**積分する関数に内側の微分がはじめから掛かっていたら、なぜ一気に巻き戻せる？**

────────

## 合成関数を微分すると、内側の微分が掛かって残る

第3章の [合成関数の微分法] を、かたまり □ の目で書くと

$$\\{F(\\square)\\}' = F'(\\square)\\times(\\square)'$$

微分した結果には、**内側の微分 $(\\square)'$ が掛かったまま残る**（step1）。

## ここが胚細胞：内側の微分が先に掛かっていれば、外側だけ巻き戻せる

逆から読むと、積分する関数が「（かたまりの式）×（かたまりの微分）」の形をしていれば、かたまりを $1$ つの文字のように見て、外側だけを巻き戻せばよい。候補 $F(\\square)$ を微分すると、ちょうど $F'(\\square)\\times(\\square)'$ が出てくるからである。

掛かっているのが内側の微分の**数倍**なら、ずれは数なので割れば直る（step2〜7）。

系列3 では $(x^2+3)^2$ を「かたまりの $2$ 乗」と見て巻き戻そうとして、候補を微分すると $2x$ という関数が**余分に**出てきた。$2x$ は、かたまり $x^2+3$ の微分そのものである。**同じ因子が、はじめから被積分関数に掛かっていれば**——たとえば $x(x^2+3)^2$ なら——候補 $\\dfrac16(x^2+3)^3$ を微分してちょうど元に戻る。ずれは出ないか、数だけになる。

<<M3INT_CHAIN>>

| 外側 | 被積分関数の形（内側の微分 × …） | 巻き戻した形 | step |
|---|---|---|---|
| 冪 $t^n$ | $f'(x)\\,f(x)^n$ | $\\dfrac{f(x)^{n+1}}{n+1}$ | 2〜4・7 |
| $\\dfrac1t$ | $\\dfrac{f'(x)}{f(x)}$ | $\\log\\lvert f(x)\\rvert$ | 5・10 |
| $e^t$ | $f'(x)\\,e^{f(x)}$ | $e^{f(x)}$ | 6 |

## 展開できる形でも、この見方が手間を消す

$x^2(x^3+1)^6$ は、展開すれば系列3 の道でも巻き戻せる。ただし $7$ 項に広がる（step8）。内側の微分 $3x^2$ の $\\dfrac13$ 倍が掛かっていると見れば、$1$ 行で済む。**この見方が消すのは「解けないこと」ではなく「展開する手間」**である。

## Step の道筋

- **step1**：合成関数の微分（第3章の確認）
- **step2〜4**：かたまりの冪 × 内側の微分（の数倍）
- **step5・6**：外側が $\\dfrac1t$・$e^t$
- **step7**：外側が平方根
- **step8（山場）**：展開すると $7$ 項になる形を $1$ 行で
- **step9**：外側だけで巻き戻せるように、掛かっている式を決める
- **step10**：$\\tan x$ を分数に書き直して、隠れていた内側の微分を見つける

────────

**もっと深く**

**忘れても導ける。** 公式の表は覚えなくてよい。被積分関数の中に「どこかの微分」が掛かっていないか探し、見つけたら、そのかたまりを $1$ つの文字と見て候補を作り、微分して確かめる。ずれが数なら割る。

**内側の微分の数を取り違えると、値が外れる。** $x(3x^2+1)^4$ の内側の微分は $6x$ で、肩の $5$ だけで割ると $6$ 倍ずれたまま残る（step4）。微分して確かめれば、その場で見つかる。

**見つからないときもある。** $e^{x^2}$ には $x^2$ の微分 $2x$ が掛かっていない。こういう形は、この見方では巻き戻せない（$e^{x^2}$ の原始関数は、初等関数の範囲では書けないことが知られている）。$x^3e^{x^4}$ のように肩の微分（の数倍）が掛かっていれば巻き戻せる——**掛かっているかどうかが分かれ目**になる。

**この先の景色。** この見方を記号の操作として整えたのが、次の系列の「変数をすり替える」やり方である。かたまりを $t$ と書き、$(\\square)'\\,dx$ を $dt$ に置き換える。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「合成関数の微分を巻き戻す」の構成（合成関数を微分した形を逆から読み、かたまりを 1 つの文字と見て外側を巻き戻す）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

合成関数を微分すると、内側の微分が掛かって残る。だから積分する関数に内側の微分（の数倍）がはじめから掛かっていれば、かたまりを $1$ つの文字と見て外側だけを巻き戻せる——候補を微分しても、ずれは出ないか数だけになる。

系列3 で直らなかった関数のずれは、その関数が内側の微分そのものだったからだった。被積分関数がその因子を先に持っていれば、ずれは消える。`,
};

/** M3INT5: 置換積分——変数をすり替える（三段）。
 *  段1＝step1〜2：系列4 で巻き戻せる積分を、まず跡で（重いほう）、次に t の積分に書き換えた形の係数で（R1 B3：step2 は step1 と別の数）
 *  段2＝step3〜4：関節「( ) dx = □ dt」／段3＝step5〜10
 *  山場 step5（②・R1 A2 で③手間型から変更）：∫₁⁵ (2x+1)√(x−1) dx を t=x−1 で。2x+1 を定数のように扱う候補は 176/3、正答 208/5（sympy・数値積分 41.6 と一致）。
 *  step6（Q3）：同じ積分を t=√(x−1) で。提出値は t の被積分関数の t⁴ の係数 4（step5 と別の数）。
 *  step8：cos⁵x は答えの形（sin の多項式）を指定（R1 A3：倍角の和でも書けて係数が変わる）。手間型の山場にはしない（R1 A2）。
 *  原典の族（x√(x+1)・x/√(1−x)・x/√(1−x²)・tan x・cos³x・1/cos x・1/(e^x+1)）と形を変えた。
 *  「置換でしか解けない」とは書かない（系列4 の跡で同じ道が通る）。 */
export const M3INT_SUBST_SERIES: LearnerSeries = {
  id: "math3_int_subst_01",
  title: "置換積分——変数をすり替える",
  subtitle:
    "数Ⅲ・C 積分法より — 系列4 で見つけた「内側の微分が掛かっている形」を、かたまりを $t$ と名づけて記号の上で整える。$10$ 問で、何を一緒にすり替えなければならないかを確かめる。",
  patternId: "M3INT5",
  unit: "math_3",
  revelationLabel:
    "**かたまりを $t$ と名づけると、「残りの部分 $\\times\\,dx$」がまとめて $dt$ の何倍かに置き換わる**。$x$ を $t$ の式で表す向きなら、残った $x$ も $t$ に直せる",
  drivingQuestion:
    "$dx$ が約分されたように見えるのはなぜ？——**変数をすり替えるとき、何を一緒にすり替えなければならない？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\displaystyle\\int x^2(x^3 - 1)^5\\,dx = k\\,(x^3 - 1)^6 + C$ と書けます。$k$ を求めましょう。",
      answer: 1 / 18,
      answerDisplay: "1/18",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x^2(x^3-1)^5\\,dx = k(x^3-1)^6 + C$ の $k$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "この被積分関数の中に、どこかのかたまりの微分が掛かっていないだろうか？",
        },
        {
          layer: 2,
          text: "系列4 で、どの部分をひとかたまりと見た？（[合成関数の微分法]）",
        },
        {
          layer: 3,
          text: "かたまり $x^3 - 1$ の微分は $3x^2$ で、被積分関数の $x^2$ はその $\\dfrac13$ 倍。候補 $(x^3-1)^6$ を微分すると $6(x^3-1)^5\\cdot 3x^2 = 18x^2(x^3-1)^5$。$18$ で割って $k = \\dfrac{1}{18}$。中心の問いへの最初の部分回答：**内側の微分が掛かっている形は、かたまりを $1$ つの文字と見れば巻き戻せる**——この見方を、記号で整えるのがこの系列。",
        },
      ],
      formulaPreview: "((x³−1)⁶)′ = 18x²(x³−1)⁵ → k = 1/18",
      figureMarker: "<<M3INT_SWAP>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の積分で、かたまりを $t = x^3 - 1$ と名づけると、$\\displaystyle\\int x^2(x^3 - 1)^5\\,dx = \\int c\\,t^5\\,dt$ と書き換えられます。$c$ を求めましょう。",
      answer: 1 / 3,
      answerDisplay: "1/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x^2(x^3-1)^5\\,dx = \\int c\\,t^5\\,dt$ の $c$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。同じ積分を、別の書き方で見ている。名前がついた部分のほかは、どこへ行く？" },
        {
          layer: 2,
          text: "前題と変わったのは、かたまりに $t$ という名前がついたこと。$t$ と $x$ の変わり方の関係は、何で表せた？",
        },
        {
          layer: 3,
          text: "$\\dfrac{dt}{dx} = 3x^2$。分数のように見て $dt = 3x^2\\,dx$、つまり $x^2\\,dx = \\dfrac13\\,dt$。だから $\\displaystyle\\int x^2(x^3-1)^5\\,dx = \\int (x^3-1)^5\\cdot x^2\\,dx = \\int t^5\\cdot\\frac13\\,dt$ で、$c = \\dfrac13$。巻き戻すと $\\dfrac13\\cdot\\dfrac{t^6}{6} = \\dfrac{t^6}{18}$ で、前題の $\\dfrac{1}{18}$ と一致する。このように変数をすり替えて積分するやり方を [置換積分] という。中心の問いへ：**「残りの部分 $\\times\\,dx$」が、まとめて $dt$ の $\\dfrac13$ 倍に置き換わった**。",
        },
      ],
      formulaPreview: "dt = 3x² dx → x² dx = (1/3)dt → c = 1/3（巻き戻すと t⁶/18）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$t = 5x^2 - 1$ と置くと、$x\\,dx = \\square\\,dt$ と書けます。$\\square$ に入る数を求めましょう。",
      answer: 1 / 10,
      answerDisplay: "1/10",
      unit: "",
      unknownLabel: "$x\\,dx = \\square\\,dt$ の $\\square$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の書き換えで、かたまり以外の部分は何に変わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、積分の全体ではなく、すり替えの「つなぎ目」だけを取り出して問われていること。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dt}{dx} = 10x$ なので $dt = 10x\\,dx$、$x\\,dx = \\dfrac{1}{10}\\,dt$。$\\square = \\dfrac{1}{10}$。$dx$ を書き換えるのを忘れて、$t$ の式の中に $dx$ を残したままにすると、$t$ で巻き戻せない。中心の問いへ：**すり替えるのは、かたまりだけでなく「残りの部分 $\\times\\,dx$」もいっしょ**。",
        },
      ],
      formulaPreview: "dt/dx = 10x → x dx = (1/10)dt",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$t = \\sqrt{x}$ と置くと、$\\dfrac{1}{\\sqrt{x}}\\,dx = \\square\\,dt$ と書けます。$\\square$ に入る数を求めましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "$\\dfrac{1}{\\sqrt{x}}\\,dx = \\square\\,dt$ の $\\square$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、かたまりが根号 $\\sqrt{x}$ になったこと。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dt}{dx} = \\dfrac{1}{2\\sqrt{x}}$ なので $dt = \\dfrac{1}{2\\sqrt{x}}\\,dx$、つまり $\\dfrac{1}{\\sqrt{x}}\\,dx = 2\\,dt$。$\\square = 2$。中心の問いへ：**かたまりが何であっても、つなぎ目は $\\dfrac{dt}{dx}$ から作れる**。",
        },
      ],
      formulaPreview: "dt/dx = 1/(2√x) → (1/√x)dx = 2dt",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "定積分 $\\displaystyle\\int_1^5(2x + 1)\\sqrt{x - 1}\\,dx$ の値を求めましょう。",
      answer: 208 / 5,
      answerDisplay: "208/5",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_1^5(2x+1)\\sqrt{x-1}\\,dx$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。かたまり $x-1$ に $t$ と名前をつけたとき、step2 のように「残りの部分」は $dt$ にまとまるだろうか？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、かたまり $x - 1$ の外に掛かっている $2x+1$ が、かたまりの微分（の数倍）ではないこと。",
        },
        {
          layer: 3,
          text: "$t = x - 1$ と置くと $x = t + 1$、$dx = dt$。$2x + 1 = 2t + 3$ も $t$ で書ける。$x$ が $1$ から $5$ まで動くとき $t$ は $0$ から $4$。$\\displaystyle\\int_0^4(2t+3)\\sqrt{t}\\,dt = \\int_0^4\\left(2t^{\\frac32} + 3t^{\\frac12}\\right)dt = \\Big[\\frac45t^{\\frac52} + 2t^{\\frac32}\\Big]_0^4 = \\frac{128}{5} + 16 = \\frac{208}{5}$。$2x + 1$ を数のように外に出して $\\sqrt{x-1}$ だけ巻き戻すと $\\dfrac{176}{3}$ になり外れる——$2x+1$ は $x$ で変わるので、外には出せない。中心の問いへ：**残った $x$ は、$x$ を $t$ の式で表してすり替える。すり替えるのは $x$ と $dx$ の両方**。",
        },
      ],
      formulaPreview: "t = x − 1、x = t + 1、dx = dt → ∫₀⁴ (2t + 3)√t dt = 128/5 + 16 = 208/5",
      figureMarker: "<<M3INT_TWO_WAYS>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "前題の積分を、こんどは根号ごと $t = \\sqrt{x - 1}$ と置いて書き換えます。$x = t^2 + 1$ となり、$\\displaystyle\\int(2x+1)\\sqrt{x-1}\\,dx = \\int(a\\,t^4 + b\\,t^2)\\,dt$ の形になります。$a$ を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$\\displaystyle\\int(a\\,t^4 + b\\,t^2)\\,dt$ の $a$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。同じ積分を、別の名前のつけ方ですり替える。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、$t$ と名づける部分が $x - 1$ から $\\sqrt{x-1}$ になったこと。",
        },
        {
          layer: 3,
          text: "$t = \\sqrt{x-1}$ なら $x = t^2 + 1$、$dx = 2t\\,dt$。$2x + 1 = 2t^2 + 3$、$\\sqrt{x-1} = t$ なので、$(2t^2 + 3)\\cdot t\\cdot 2t\\,dt = (4t^4 + 6t^2)\\,dt$。$a = 4$。区間は $t$ が $0$ から $2$ で、$\\Big[\\dfrac45t^5 + 2t^3\\Big]_0^2 = \\dfrac{128}{5} + 16 = \\dfrac{208}{5}$——前題と同じ値に着く（交差検算）。中心の問いへ：**名前のつけ方は $1$ つとは限らない。どう名づけても、$x$ と $dx$ を両方すり替えれば同じ値になる**。",
        },
      ],
      formulaPreview: "x = t² + 1、dx = 2t dt → (2t² + 3)·t·2t = 4t⁴ + 6t² → a = 4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\int\\sin^3 3x\\,dx = a\\cos 3x + b\\cos^3 3x + C$ と書けます。$b$ を求めましょう。",
      answer: 1 / 9,
      answerDisplay: "1/9",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\sin^3 3x\\,dx = a\\cos 3x + b\\cos^3 3x + C$ の $b$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。step2 は「かたまりの式 × かたまりの微分」の形だった。$\\sin^3 3x$ を、その形に作り替えられる？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、被積分関数がそのままでは「かたまりの微分」を持っていないこと。数Ⅰの三角比の関係式（[相互関係]）で、形を変えられないだろうか？",
        },
        {
          layer: 3,
          text: "$\\sin^3 3x = (1 - \\cos^2 3x)\\sin 3x$。$t = \\cos 3x$ と置くと $dt = -3\\sin 3x\\,dx$、$\\sin 3x\\,dx = -\\dfrac13\\,dt$。$\\displaystyle\\int(1 - t^2)\\cdot\\left(-\\frac13\\right)dt = -\\frac13t + \\frac19t^3 + C = -\\frac13\\cos 3x + \\frac19\\cos^3 3x + C$。$b = \\dfrac19$。中心の問いへ：**すり替えが使える形は、作り替えて自分で作ることもできる**。",
        },
      ],
      formulaPreview: "sin³3x = (1 − cos²3x)sin 3x、t = cos 3x → −t/3 + t³/9 → b = 1/9",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\displaystyle\\int\\cos^5 x\\,dx = a\\sin x + b\\sin^3 x + c\\sin^5 x + C$ と書けます。$b$ を求めましょう。",
      answer: -2 / 3,
      answerDisplay: "-2/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int\\cos^5 x\\,dx = a\\sin x + b\\sin^3 x + c\\sin^5 x + C$ の $b$",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、奇数乗の数が $3$ から $5$ に上がり、関数が $\\cos$ になったこと。",
        },
        {
          layer: 3,
          text: "$\\cos^5 x = (\\cos^2 x)^2\\cos x = (1 - \\sin^2 x)^2\\cos x$。$t = \\sin x$ と置くと $\\cos x\\,dx = dt$。$\\displaystyle\\int(1 - t^2)^2\\,dt = \\int(1 - 2t^2 + t^4)\\,dt = t - \\frac23t^3 + \\frac15t^5 + C$。$b = -\\dfrac23$。答えの形を指定したのは、同じ関数を倍の角の $\\sin$（$\\sin x$・$\\sin 3x$・$\\sin 5x$）の和でも書けて、形によって係数が変わるから。$t$ を使わずに、系列4 のように $(1-\\sin^2x)^2\\cos x$ を展開して項ごとに「$\\sin x$ の式 × その微分」と見ても同じ結果になる。中心の問いへ：**$t$ と名づけるのは、系列4 の見方を記号で整えたもの**。",
        },
      ],
      formulaPreview: "cos⁵x = (1 − sin²x)²cos x、t = sin x → t − (2/3)t³ + (1/5)t⁵ → b = −2/3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$t$ の積分 $\\displaystyle\\int\\cos t\\,dt$ に $t = x^3$ を入れて $x$ の積分に戻すと、$\\displaystyle\\int k\\,x^2\\cos(x^3)\\,dx$ になります。$k$ を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int k\\,x^2\\cos(x^3)\\,dx$ の $k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。すり替えの向きが入れかわった。" },
        {
          layer: 2,
          text: "step3 と向きが逆。step3 は $x$ の式から $dt$ に書き換えた。今度は $t$ の積分から $x$ の積分へ戻す。",
        },
        {
          layer: 3,
          text: "$t = x^3$ なら $dt = 3x^2\\,dx$。$\\displaystyle\\int\\cos t\\,dt = \\int\\cos(x^3)\\cdot 3x^2\\,dx$ で、$k = 3$。戻した $x$ の積分には、かたまり $x^3$ の微分 $3x^2$ がちょうど掛かっている——系列4 の形そのもの。中心の問いへ：**すり替えは両方向に読める。$t$ の積分を $x$ に戻すと、内側の微分が掛かった形が現れる**。",
        },
      ],
      formulaPreview: "t = x³、dt = 3x² dx → ∫cos t dt = ∫3x²cos(x³) dx → k = 3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "定積分 $\\displaystyle\\int_0^{\\log 2}\\frac{e^x}{(e^x + 1)(e^x + 3)}\\,dx$ の値を求めましょう。",
      answer: Math.log(6 / 5) / 2,
      answerDisplay: "log(6/5)/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^{\\log 2}\\frac{e^x\\,dx}{(e^x+1)(e^x+3)}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "step5 と比べてみよう。すり替えて区間も $t$ に読み替えるのは同じ。すり替えたあとの $t$ の積分は、どんな形になりそう？" },
        {
          layer: 2,
          text: "step5 と変わったのは、すり替えたあとの $t$ の積分が、$1$ 次式の積を分母にもつ分数になること。系列3 で、そういう分数をどう作り替えた？（[部分分数分解]）",
        },
        {
          layer: 3,
          text: "$t = e^x$ と置くと $dt = e^x\\,dx$。$x$ が $0$ から $\\log 2$ まで動くとき $t$ は $1$ から $2$。$\\displaystyle\\int_1^2\\frac{dt}{(t+1)(t+3)}$。$\\dfrac{1}{t+1} - \\dfrac{1}{t+3} = \\dfrac{2}{(t+1)(t+3)}$ なので $\\dfrac12\\Big[\\log(t+1) - \\log(t+3)\\Big]_1^2 = \\dfrac12\\left(\\log\\dfrac35 - \\log\\dfrac24\\right) = \\dfrac12\\log\\dfrac65$。入力は「log(6/5)/2」。中心の問いへ：**すり替えたあとが読めない形でも、系列3 の作り替えにつなげば巻き戻せる**。",
        },
      ],
      formulaPreview: "t = eˣ、dt = eˣdx、t: 1 → 2 → ∫₁² dt/((t+1)(t+3)) = (1/2)log(6/5)",
    },
  ],
  derivation: `**中心の問い** ｜ $dx$ が約分されたように見えるのはなぜ？——**変数をすり替えるとき、何を一緒にすり替えなければならない？**

────────

## 系列4 の見方を、記号で整える

系列4 では、「かたまりの式 × かたまりの微分」の形を見つけて、かたまりを $1$ つの文字と見て巻き戻した。その文字に $t$ と名前をつけて、記号の上でやり直すのがこの系列である（step1・2）。

$t = g(x)$ と置くと $\\dfrac{dt}{dx} = g'(x)$。これを分数のように見て $dt = g'(x)\\,dx$ と書くと、

$$\\int f(g(x))\\,g'(x)\\,dx = \\int f(t)\\,dt$$

左辺の「かたまりの微分 $\\times\\,dx$」が、右辺でまとめて $dt$ に置き換わる。

## ここが胚細胞：何を一緒にすり替えるか

$dt = g'(x)\\,dx$ は、本当は分数の約分ではない（$dx$ や $dt$ は数ではない）。それでも約分のように見えるのは、**合成関数の微分 $\\{F(g(x))\\}' = F'(g(x))\\,g'(x)$ を逆から読んだ結果を、ちょうどそう書けるから**である。巻き戻した $F(t)$ を $x$ で微分すれば、いつでも確かめられる。

すり替えるときは、次を全部 $t$ に直す。

| すり替えるもの | step |
|---|---|
| かたまり → $t$ | 1・2 |
| 「残りの部分 $\\times\\,dx$」→ $dt$ の何倍か | 2〜4 |
| 残った $x$ → $t$ の式（$x$ を $t$ で表す向き） | 5・6 |
| 区間の端 → $t$ の値（定積分のとき） | 5・6・10 |

<<M3INT_TWO_WAYS>>

## Step の道筋

- **step1・2**（事例）：系列4 で解ける積分を、跡で解いてから、$t$ の積分に書き換える
- **step3・4**（なぜ）：つなぎ目「$(\\ )\\,dx = \\square\\,dt$」を取り出す
- **step5（山場）**：かたまりの外に、かたまりの微分でない $x$ の式が残る。$x$ を $t$ で表してすり替える
- **step6**：同じ積分を、根号ごと $t$ と置いて（交差検算）
- **step7・8**：三角の奇数乗を「$\\sin$（$\\cos$）の式 × その微分」に作り替えて
- **step9**：$t$ の積分を $x$ に戻す向き
- **step10**：すり替えたあとを部分分数で（系列3 と合流）

────────

**もっと深く**

**忘れても導ける。** 置換積分の公式は覚えなくてよい。かたまりを $t$ と置き、$\\dfrac{dt}{dx}$ を計算して、$x$ と $dx$ と区間を全部 $t$ に直す。巻き戻したら $x$ に戻し、微分して確かめる。

**残った $x$ を数のように外に出すのは、よくある取りこぼし。** step5 で $2x + 1$ を外に出して $\\sqrt{x-1}$ だけ巻き戻すと、値が $\\dfrac{208}{5}$ でなく $\\dfrac{176}{3}$ になる。微分して確かめれば、外に出した $2x+1$ も微分されて食い違いが見える。

**すり替え方は $1$ つとは限らない**（step5・6）。どう名づけても、全部をすり替えれば同じ値になる。手間は名づけ方で変わるが、どちらが軽いかは式しだいで、いつも決まっているわけではない。

**この先の景色。** 系列9 では、定積分ですり替えるとき、区間の向きが逆になる場合（減少する $g$）を扱う。系列10 では、$x$ を三角関数で表す向きのすり替え（$x = a\\sin\\theta$）が、円の面積を連れてくる。大学では、何変数でも同じ考え方で変数をすり替える（ヤコビアン）。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「置換積分」の構成（跡を見抜いて解いた積分を $t$ で定式化してやり直す・$x$ の式の一部が $dx$ とくっつく向きと $x$ を $t$ で表す向きの 2 つ・三角の奇数乗）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

$dx$ が約分されたように見えるのは、合成関数の微分を逆から読んだ結果が、ちょうどそう書けるからである。

すり替えるときは、かたまりだけでなく、**「残りの部分 $\\times\\,dx$」、残った $x$、そして区間の端**まで、全部を $t$ に直す。$1$ つでも $x$ のまま残すと、巻き戻した値が外れる。`,
};

/** M3INT6: 積の微分を逆に読む——片方だけ巻き戻して、はみ出しを打ち消す（三段）。
 *  段1＝step1〜4（素朴な巻き戻し：積の微分の確認 → 両方巻き戻す候補が外れる → 片方だけ巻き戻すとはみ出しが出る → 打ち消して完成）
 *  段2＝step5〜6（公式 ∫fg = Fg − ∫Fg′ の関節・微分して戻す）／段3＝step7〜10
 *  山場 step2（②・R1 A6）：∫x cos3x の「両方巻き戻して掛けた」候補 x² sin3x / 6 を問題文で明示し、
 *  x=π/6 での「候補の微分 − 被積分関数」＝π/18（被積分関数は 0 なのに候補の微分は π/18＝食い違いの零点ではない点を sympy で確認）。
 *  step3 と step5 は別の関数（R1 B4）。step8 に図（役割の選び直し＝R1 B8）。
 *  原典の造語（「余分な関数」にあたる語・「片側だけ積分」にあたる語）は使わない（裁定 Q5）。「この選び方しかない」と書かない（原典も手間の言い方）。
 *  原典の族：x cos x・x sin x・x e^x・x² e^x・x log x は定番だが定数をずらした（x cos3x・x e^{x/2}・x² cos(x/3)・x³ log x）。step7 は初め x² cos(x/2) にしたが、途中の sin(x/2) の巻き戻しが原典 練1(6) そのものだったので替えた。
 *  step10 の sin√x は原典 応用2(3) e^{√x} と同じ構造（t=√x＋部分積分）で関数が違う＝「定番の道具」側と判断（Round 2 に見てもらう＝R1 B12）。 */
export const M3INT_PARTS_SERIES: LearnerSeries = {
  id: "math3_int_parts_01",
  title: "積の微分を逆に読む——片方だけ巻き戻して、はみ出しを打ち消す",
  subtitle:
    "数Ⅲ・C 積分法より — 積の微分は $2$ つの項の和だった。$2$ つの関数を両方巻き戻すと外れる。片方だけ巻き戻すと、はみ出した項が $1$ つ出る。$10$ 問で、それを打ち消す手つきと、どちらを巻き戻すかの選び方を確かめる。",
  patternId: "M3INT6",
  unit: "math_3",
  revelationLabel:
    "**片方だけ巻き戻した候補を微分すると、ほしい項とはみ出した項が出る。はみ出しを巻き戻して引けば完成**。だから、はみ出しが元より易しくなる側を巻き戻す",
  drivingQuestion:
    "積の微分は $2$ つの項の和だった。逆から読むなら、$2$ つの関数の**どちらを巻き戻せばいい？——はみ出した項は、どう打ち消す？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "関数 $x\\sin 3x$ を微分すると、$a\\sin 3x + b\\,x\\cos 3x$ の形になります。$b$ を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "$(x\\sin 3x)' = a\\sin 3x + b\\,x\\cos 3x$ の $b$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$2$ つの関数の積を微分するとき、それぞれの関数はどう扱った？",
        },
        {
          layer: 2,
          text: "第3章で、$2$ つの関数の積を微分したとき、項はいくつ出た？（[積の微分]）",
        },
        {
          layer: 3,
          text: "積の微分は「片方を微分して、もう片方はそのまま」を $2$ 通り足す：$(x\\sin 3x)' = (x)'\\sin 3x + x(\\sin 3x)' = \\sin 3x + 3x\\cos 3x$。$b = 3$。微分すると、**項が $2$ つ**に分かれる。中心の問いへの最初の部分回答：**積を微分すると $2$ つの項の和になる。逆から読むときも、$2$ つの項を相手にすることになる**。",
        },
      ],
      formulaPreview: "(x sin 3x)′ = sin 3x + 3x cos 3x → b = 3",
      figureMarker: "<<M3INT_PRODUCT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\displaystyle\\int x\\cos 3x\\,dx$ を求めようとして、ある人が $x$ と $\\cos 3x$ をそれぞれ巻き戻して掛け、候補 $\\dfrac{x^2}{2}\\cdot\\dfrac{\\sin 3x}{3} = \\dfrac{x^2\\sin 3x}{6}$ を作りました。この候補を微分した式から、もとの $x\\cos 3x$ を引いた差の、$x = \\dfrac{\\pi}{6}$ での値を求めましょう。",
      answer: Math.PI / 18,
      answerDisplay: "π/18",
      unit: "",
      unknownLabel: "$x = \\dfrac{\\pi}{6}$ での（候補の微分）−（$x\\cos 3x$）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      inputAffordances: ["pi"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で見た積の微分の形を、この候補にも当てると、何が出てくる？" },
        {
          layer: 2,
          text: "前題と変わったのは、微分する相手が「$2$ つをそれぞれ巻き戻して掛けた」候補であること。",
        },
        {
          layer: 3,
          text: "積の微分で $\\left(\\dfrac{x^2}{2}\\cdot\\dfrac{\\sin 3x}{3}\\right)' = x\\cdot\\dfrac{\\sin 3x}{3} + \\dfrac{x^2}{2}\\cos 3x$。ほしい $x\\cos 3x$ はどちらの項にも出てこない。$x = \\dfrac{\\pi}{6}$ では $\\sin\\dfrac{\\pi}{2} = 1$、$\\cos\\dfrac{\\pi}{2} = 0$ なので、候補の微分は $\\dfrac{\\pi}{6}\\cdot\\dfrac13 = \\dfrac{\\pi}{18}$、もとの $x\\cos 3x$ は $0$。差は $\\dfrac{\\pi}{18}$——$0$ になるはずの差が $0$ にならない。数Ⅱで「積を項ごとに積分してかけてはいけない」と見たのと同じことが、三角関数でも起きる。中心の問いへ：**両方を巻き戻して掛けても、積の微分の $2$ 項は元に戻らない**。",
        },
      ],
      formulaPreview: "候補の微分 = x·sin 3x/3 + (x²/2)cos 3x → x = π/6 で π/18、x cos 3x は 0 → 差 π/18",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは $\\cos 3x$ の側だけを巻き戻し、$x$ はそのまま残した候補 $\\dfrac{x\\sin 3x}{3}$ を作ります。これを微分すると $x\\cos 3x + k\\sin 3x$ の形になります。はみ出した項の係数 $k$ を求めましょう。",
      answer: 1 / 3,
      answerDisplay: "1/3",
      unit: "",
      unknownLabel: "$\\left(\\dfrac{x\\sin 3x}{3}\\right)' = x\\cos 3x + k\\sin 3x$ の $k$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の候補は、ほしい項がどちらにも出てこなかった。今度の候補はどうだろう？" },
        {
          layer: 2,
          text: "前題と変わったのは、巻き戻すのが $2$ つの関数のうち片方だけになったこと。",
        },
        {
          layer: 3,
          text: "積の微分で $\\left(x\\cdot\\dfrac{\\sin 3x}{3}\\right)' = (x)'\\cdot\\dfrac{\\sin 3x}{3} + x\\cdot\\cos 3x = x\\cos 3x + \\dfrac13\\sin 3x$。**ほしい $x\\cos 3x$ がそのまま出てきた**。そのかわり、もう $1$ つの項 $\\dfrac13\\sin 3x$ がはみ出した。$k = \\dfrac13$。逆に $x$ の側を巻き戻した候補 $\\dfrac{x^2}{2}\\cos 3x$ を微分すると、はみ出しは $-\\dfrac32x^2\\sin 3x$ で、$x$ の次数が上がってしまう。中心の問いへ：**片方だけ巻き戻すと、ほしい項が出る。代わりに、はみ出した項が $1$ つ残る**。",
        },
      ],
      formulaPreview: "(x·sin 3x/3)′ = sin 3x/3 + x cos 3x → はみ出し (1/3)sin 3x → k = 1/3",
      figureMarker: "<<M3INT_OVERFLOW>>",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "関数 $F(x)$ は、微分すると $x\\cos 3x$ になり、$F(0) = 0$ を満たします。$F\\left(\\dfrac{\\pi}{3}\\right)$ を求めましょう。",
      answer: -2 / 9,
      answerDisplay: "-2/9",
      unit: "",
      unknownLabel: "$F\\left(\\dfrac{\\pi}{3}\\right)$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      inputAffordances: ["pi"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の候補は、ほしい項にはみ出しが付いていた。そのはみ出しをどうすれば消える？" },
        {
          layer: 2,
          text: "前題と変わったのは、はみ出しを消して完成させ、値まで出すこと。",
        },
        {
          layer: 3,
          text: "はみ出し $\\dfrac13\\sin 3x$ を巻き戻すと $-\\dfrac19\\cos 3x$。これを候補から引けば、微分したときはみ出しが打ち消される：$\\left(\\dfrac{x\\sin 3x}{3} + \\dfrac{\\cos 3x}{9}\\right)' = x\\cos 3x + \\dfrac13\\sin 3x - \\dfrac13\\sin 3x = x\\cos 3x$。$F(x) = \\dfrac{x\\sin 3x}{3} + \\dfrac{\\cos 3x}{9} + C$、$F(0) = \\dfrac19 + C = 0$ より $C = -\\dfrac19$。$F\\left(\\dfrac{\\pi}{3}\\right) = 0 + \\dfrac{-1}{9} - \\dfrac19 = -\\dfrac29$。中心の問いへ：**はみ出した項は、それを巻き戻して引けば打ち消せる**——はみ出しが元より易しければ、この手つきで完成する。",
        },
      ],
      formulaPreview: "F(x) = x sin 3x/3 + cos 3x/9 − 1/9 → F(π/3) = −1/9 − 1/9 = −2/9",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\displaystyle\\int x\\,e^{\\frac{x}{2}}\\,dx$ で、$e^{\\frac{x}{2}}$ の側を巻き戻すと、$\\displaystyle\\int x\\,e^{\\frac{x}{2}}\\,dx = 2x\\,e^{\\frac{x}{2}} - \\int c\\,e^{\\frac{x}{2}}\\,dx$ と書けます。$c$ を求めましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int c\\,e^{\\frac{x}{2}}\\,dx$ の $c$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で、はみ出しを打ち消すために「引いた」ものは何だった？" },
        {
          layer: 2,
          text: "前題と変わったのは、「引くもの」を巻き戻さず、積分の形のまま残して書くこと。",
        },
        {
          layer: 3,
          text: "$e^{\\frac{x}{2}}$ を巻き戻すと $2e^{\\frac{x}{2}}$。候補 $x\\cdot 2e^{\\frac{x}{2}}$ を微分すると $2e^{\\frac{x}{2}} + x e^{\\frac{x}{2}}$ で、はみ出しは $2e^{\\frac{x}{2}}$。だから $\\displaystyle\\int x e^{\\frac{x}{2}}\\,dx = 2xe^{\\frac{x}{2}} - \\int 2e^{\\frac{x}{2}}\\,dx$、$c = 2$。一般に、$f$ を巻き戻したものを $F$ として $\\displaystyle\\int f(x)g(x)\\,dx = F(x)g(x) - \\int F(x)g'(x)\\,dx$——引く積分の中身は「巻き戻したほう × 残したほうの微分」。このやり方を [部分積分] という。中心の問いへ：**はみ出しを打ち消す手つきは、$1$ 本の式にまとめられる**。",
        },
      ],
      formulaPreview: "F = 2e^(x/2)、g = x、g′ = 1 → ∫xe^(x/2)dx = 2xe^(x/2) − ∫2e^(x/2)dx → c = 2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "ある関数 $f(x)$ について、$\\displaystyle\\int f(x)\\,dx = (2x - 1)e^{2x} + C$ と分かっています。$f(x) = k\\,x\\,e^{2x}$ の形になります。$k$ を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$f(x) = k\\,x\\,e^{2x}$ の $k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。分かっているものと、探しているものが入れかわった。" },
        {
          layer: 2,
          text: "前題と向きが逆。前題は積を巻き戻した。今度は巻き戻した結果が先にあって、もとの関数を探す。",
        },
        {
          layer: 3,
          text: "巻き戻した結果を微分すれば、もとの関数に戻る。積の微分で $\\{(2x-1)e^{2x}\\}' = 2e^{2x} + (2x-1)\\cdot 2e^{2x} = (2 + 4x - 2)e^{2x} = 4xe^{2x}$。$k = 4$。$2e^{2x}$ と $-2e^{2x}$ が打ち消し合っている——部分積分ではみ出しを打ち消した跡が、ここに見える。中心の問いへ：**部分積分の結果も、微分すれば確かめられる。打ち消し合った項が見える**。",
        },
      ],
      formulaPreview: "((2x−1)e^(2x))′ = 2e^(2x) + 2(2x−1)e^(2x) = 4xe^(2x) → k = 4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\int x^2\\cos\\frac{x}{3}\\,dx = a\\,x^2\\sin\\frac{x}{3} + b\\,x\\cos\\frac{x}{3} + c\\sin\\frac{x}{3} + C$ と書けます。$c$ を求めましょう。",
      answer: -54,
      answerDisplay: "-54",
      unit: "",
      unknownLabel: "$\\sin\\dfrac{x}{3}$ の係数 $c$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。三角関数の側を巻き戻すのは同じ。はみ出した項は、step4 と同じくすぐ巻き戻せる？" },
        {
          layer: 2,
          text: "step4 と変わったのは、残す側が $x$ でなく $x^2$ になったこと。",
        },
        {
          layer: 3,
          text: "$\\cos\\dfrac{x}{3}$ を巻き戻すと $3\\sin\\dfrac{x}{3}$。$\\displaystyle\\int x^2\\cos\\frac x3\\,dx = 3x^2\\sin\\frac x3 - \\int 6x\\sin\\frac x3\\,dx$。はみ出し $6x\\sin\\dfrac{x}{3}$ はまだ積なので、もう一度：$\\sin\\dfrac{x}{3}$ を巻き戻すと $-3\\cos\\dfrac{x}{3}$ で、$\\displaystyle\\int 6x\\sin\\frac x3\\,dx = -18x\\cos\\frac x3 + \\int 18\\cos\\frac x3\\,dx = -18x\\cos\\frac x3 + 54\\sin\\frac x3$。合わせて $3x^2\\sin\\dfrac{x}{3} + 18x\\cos\\dfrac{x}{3} - 54\\sin\\dfrac{x}{3} + C$。$c = -54$。$x^2 \\to x \\to 1$ と、はみ出しのたびに多項式の次数が $1$ つずつ下がる。中心の問いへ：**はみ出しがまだ積なら、もう一度片方だけ巻き戻す。易しくなる向きに選んでいれば、いつか終わる**。",
        },
      ],
      formulaPreview: "3x²sin(x/3) − ∫6x sin(x/3)dx → 3x²sin(x/3) + 18x cos(x/3) − 54sin(x/3) → c = −54",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\displaystyle\\int x^3\\log x\\,dx = a\\,x^4\\log x + b\\,x^4 + C$ と書けます。$b$ を求めましょう。",
      answer: -1 / 16,
      answerDisplay: "-1/16",
      unit: "",
      unknownLabel: "$\\displaystyle\\int x^3\\log x\\,dx = a\\,x^4\\log x + b\\,x^4 + C$ の $b$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "step5 と比べてみよう。step5 では多項式の側を残して、相手を巻き戻した。今度も同じ選び方で進める？",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、相手が $\\log x$ になったこと。$\\log x$ は、ここまでの在庫で巻き戻せる？",
        },
        {
          layer: 3,
          text: "$\\log x$ の巻き戻しはまだ手元に無い。そこで役割を入れかえ、$x^3$ を巻き戻して（$\\dfrac{x^4}{4}$）、$\\log x$ は残す：$\\displaystyle\\int x^3\\log x\\,dx = \\frac{x^4}{4}\\log x - \\int\\frac{x^4}{4}\\cdot\\frac1x\\,dx = \\frac{x^4}{4}\\log x - \\int\\frac{x^3}{4}\\,dx = \\frac{x^4}{4}\\log x - \\frac{x^4}{16} + C$。$b = -\\dfrac{1}{16}$。$\\log x$ を微分すると $\\dfrac1x$ になり、$x^4$ と打ち消し合ってはみ出しが多項式になった。中心の問いへ：**どちらを巻き戻すかは、はみ出しが易しくなるほうを選ぶ——巻き戻しにくい関数は、微分する側に回す**。",
        },
      ],
      formulaPreview: "x³ を巻き戻し log x を残す → (x⁴/4)log x − ∫x³/4 dx → b = −1/16",
      figureMarker: "<<M3INT_ROLES>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "定積分 $\\displaystyle\\int_1^4\\log x\\,dx$ の値を求めましょう。",
      answer: 8 * Math.log(2) - 3,
      answerDisplay: "8log2-3",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_1^4\\log x\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の $x^3$ が無くなった。それでも前題の選び方は使える？" },
        {
          layer: 2,
          text: "前題と変わったのは、$\\log x$ に掛かっている多項式が見当たらないこと。",
        },
        {
          layer: 3,
          text: "$\\log x = 1\\times\\log x$ と見て、$1$ を巻き戻し（$x$）、$\\log x$ を残す：$\\displaystyle\\int\\log x\\,dx = x\\log x - \\int x\\cdot\\frac1x\\,dx = x\\log x - x + C$。$\\Big[x\\log x - x\\Big]_1^4 = (4\\log 4 - 4) - (0 - 1) = 8\\log 2 - 3$。別の道：$x = e^t$ と置くと $dx = e^t\\,dt$、$t$ は $0$ から $\\log 4$ で、$\\displaystyle\\int_0^{\\log 4} t\\,e^t\\,dt = \\Big[(t-1)e^t\\Big]_0^{\\log 4} = 4(\\log 4 - 1) + 1 = 8\\log 2 - 3$。同じ値になる（系列5 のすり替え）。中心の問いへ：**掛かっている相手が見えなくても、$1$ を掛けて巻き戻す側にできる**。",
        },
      ],
      formulaPreview: "log x = 1 × log x → x log x − x → 1 から 4 で 8log 2 − 3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "定積分 $\\displaystyle\\int_0^{\\pi^2}\\sin\\sqrt{x}\\,dx$ の値を求めましょう。",
      answer: 2 * Math.PI,
      answerDisplay: "2π",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_0^{\\pi^2}\\sin\\sqrt{x}\\,dx$",
      variationFromPrevious: "composite",
      compareWithStepId: "step4",
      inputAffordances: ["pi"],
      hints: [
        { layer: 1, text: "step4 と比べてみよう。三角関数を含む積分であることは同じ。今度は積の形をしていない。積の形にできる？" },
        {
          layer: 2,
          text: "step4 と変わったのは、三角関数の中身が $\\sqrt{x}$ になっていること。系列5 で、根号をどう扱った？（[置換積分]）",
        },
        {
          layer: 3,
          text: "$t = \\sqrt{x}$ と置くと $x = t^2$、$dx = 2t\\,dt$、$t$ は $0$ から $\\pi$。$\\displaystyle\\int_0^{\\pi}2t\\sin t\\,dt$——すり替えたら、多項式 × 三角の積になった。$\\sin t$ を巻き戻し、$2t$ を残す：$\\Big[-2t\\cos t\\Big]_0^{\\pi} + \\displaystyle\\int_0^{\\pi}2\\cos t\\,dt = 2\\pi + \\Big[2\\sin t\\Big]_0^{\\pi} = 2\\pi$。中心の問いへ：**すり替えで積の形を作り、片方だけ巻き戻す——系列5 と系列6 の道具は組み合わせて使える**。",
        },
      ],
      formulaPreview: "t = √x → ∫₀^π 2t sin t dt：−2t cos t の差 2π ＋ ∫₀^π 2cos t dt（＝0）＝ 2π",
    },
  ],
  derivation: `**中心の問い** ｜ 積の微分は $2$ つの項の和だった。逆から読むなら、$2$ つの関数の**どちらを巻き戻せばいい？——はみ出した項は、どう打ち消す？**

────────

## 両方を巻き戻すと、なぜ外れるか

[積の微分] は「片方を微分して、もう片方はそのまま」を $2$ 通り足したものだった（step1）。

$$(F g)' = F' g + F g'$$

$2$ つの関数をそれぞれ巻き戻して掛けた候補を微分しても、この $2$ 項はほしい関数に戻らない（step2）。数Ⅱで「積を項ごとに積分してかけてはいけない」と見たことの、三角関数・指数関数版である。

<<M3INT_PRODUCT>>

## ここが胚細胞：片方だけ巻き戻して、はみ出しを打ち消す

片方 $f$ だけを巻き戻して $F$ にし、もう片方 $g$ は残した候補 $F g$ を微分すると

$$(F g)' = f g + F g'$$

**ほしい $f g$ がそのまま出てくる**。代わりに $F g'$ がはみ出す（step3）。はみ出しを巻き戻して引けば完成する（step4）：

$$\\int f g\\,dx = F g - \\int F g'\\,dx$$

これが [部分積分] である。**覚える式ではない。** 片方だけ巻き戻した候補を微分して、はみ出しを見つけ、それを引くという手つきを $1$ 行に書いたものである。

<<M3INT_OVERFLOW>>

## どちらを巻き戻すか

はみ出し $F g'$ が、元の積 $f g$ より易しくなる側を選ぶ。

- 多項式 × 三角・指数：**三角・指数の側を巻き戻す**。残した多項式を微分すると次数が下がる（step3・7）。逆に多項式の側を巻き戻すと、はみ出しの次数が上がる（step3 の L3）
- 多項式 × $\\log$：**多項式の側を巻き戻す**。$\\log x$ の巻き戻しはまだ手元に無いが、微分すると $\\dfrac1x$ になって多項式と打ち消し合う（step8）
- $\\log x$ だけ：$1\\times\\log x$ と見る（step9）

これは決まりではなく、**はみ出しを易しくするための選び方**である。逆を選んでも式は正しいが、はみ出しが重くなって先へ進みにくい。

## Step の道筋

- **step1**（事例）：積の微分の確認
- **step2（山場）**：両方巻き戻した候補は、微分しても元に戻らない
- **step3・4**（事例）：片方だけ巻き戻す → はみ出しが出る → 打ち消して完成
- **step5・6**（なぜ）：$1$ 本の式にまとめる／微分して戻す
- **step7**：はみ出しがまだ積なら、もう一度
- **step8**：巻き戻しにくい側を残す
- **step9**：$1\\times\\log x$／$x = e^t$ と置く道と一致
- **step10**：すり替え（系列5）と組み合わせる

────────

**もっと深く**

**忘れても導ける。** 部分積分の公式は覚えなくてよい。片方だけ巻き戻した候補を作り、[積の微分] で微分してみる。ほしい項とはみ出しが出るので、はみ出しを巻き戻して引く。符号を迷ったら、もう一度微分して確かめればよい。

**両方を巻き戻して掛けるのは、よくある取りこぼし。** step2 の候補は、$x = \\dfrac{\\pi}{6}$ でもとの関数が $0$ なのに、候補の微分は $\\dfrac{\\pi}{18}$ だった。候補を微分して、いくつかの点でもとの関数と比べれば、こういう食い違いが見つかる（たまたま食い違いが $0$ になる点もあるので、$1$ 点だけで安心しない）。

**選び方を逆にすると、どうなるか。** $x\\cos 3x$ で $x$ の側を巻き戻すと、はみ出しは $-\\dfrac32x^2\\sin 3x$。元より次数が上がって、同じ手つきをくり返すほど重くなる。間違いではないが、**易しくならない向き**である。

**この先の景色。** 系列7 では、はみ出しを巻き戻し続けると出発点の積分がもう一度現れる形（指数 × 三角）を扱う。系列11 では、はみ出しのたびに次数が $1$ つ下がることを、番号のついた積分の漸化式として使う。大学では、部分積分は「微分を相手に移す」道具として、フーリエ解析や微分方程式のあらゆる場所に現れる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「積の微分を巻き戻す」「部分積分」の構成（両方巻き戻す反射的なやり方が外れる → 片方だけ巻き戻して余分な項を打ち消す → 公式に定式化／多項式 × 三角・指数・対数の選び方）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

両方を巻き戻すと、積の微分の $2$ 項は元に戻らない。片方だけを巻き戻した候補を微分すると、ほしい項がそのまま出て、はみ出した項が $1$ つ残る。それを巻き戻して引けば完成する。

どちらを巻き戻すかは、はみ出しが元より易しくなるほう——多項式は微分すれば次数が下がり、$\\log$ は微分すれば多項式と打ち消し合う。`,
};

/** M3INT7: 循環と組み合わせ——終わらない道を方程式で閉じる。
 *  山場 step3（C12 ②の変種）：∫e^{3x} sin2x は指数の側を 2 回巻き戻すと出発点 I が係数 −4/9 で戻る（step2）。
 *  素朴な読み「堂々巡りで終わらない」が、I の 1 次方程式を解くと有限の係数 3/13 で外れる。
 *  胚細胞は「係数が 1 でなければ」（R1 A8）。巻き戻す側は 2 回とも指数に固定（R1 A5）。step2 は step1 と別の a,b（R1 B4）。
 *  step5 は微分の 2 本の式を連立する別の道（原典 p.244 のコメントの道・出典明記）＝「部分積分でしか解けない」と書かない。
 *  step7 は F(0) の条件で C（R1 A4：区間つきは e^{kπ} が残る）。step10 は p(1+e^{−2π})² の p（R1 A4）。
 *  原典の族：練15 e^x sin x は指数の係数・角の倍率をずらした。応用4 e^{−x}|sin x| の族（山を無限に足す）は使わず、
 *  step10 は e^{−2x} sin x の山 2 つ（0〜2π）だけ——指数の係数を替え、和の極限を問わない。step8 x cos(log x) は原典に無い。 */
export const M3INT_CYCLE_SERIES: LearnerSeries = {
  id: "math3_int_cycle_01",
  title: "循環と組み合わせ——終わらない道を方程式で閉じる",
  subtitle:
    "数Ⅲ・C 積分法より — 指数 × 三角は、片方だけ巻き戻すのを $2$ 回くり返すと、出発点の積分がもう一度現れる。$10$ 問で、それを未知数と見て方程式で閉じる手つきと、ここまでの道具の組み合わせを確かめる。",
  patternId: "M3INT7",
  unit: "math_3",
  revelationLabel:
    "**同じ積分が式の中にもう一度現れ、その係数が $1$ でなければ、それを未知数と見て方程式を解ける**——堂々巡りは、行き止まりではなく方程式",
  drivingQuestion:
    "片方だけ巻き戻すのを $2$ 回くり返したら、出発点の積分がもう一度現れた。**それは行き止まりか、それとも答えへの近道か？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\displaystyle\\int e^{2x}\\sin 3x\\,dx$ で、指数の側 $e^{2x}$ を巻き戻し、$\\sin 3x$ を残します。$\\displaystyle\\int e^{2x}\\sin 3x\\,dx = \\frac12e^{2x}\\sin 3x + k\\int e^{2x}\\cos 3x\\,dx$ と書けます。$k$ を求めましょう。",
      answer: -3 / 2,
      answerDisplay: "-3/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int e^{2x}\\cos 3x\\,dx$ の係数 $k$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "片方だけ巻き戻したとき、はみ出した項には何が入っている？",
        },
        {
          layer: 2,
          text: "系列6 で、片方だけ巻き戻したとき、はみ出した項はどんな積分の形で残った？（[部分積分]）",
        },
        {
          layer: 3,
          text: "$e^{2x}$ を巻き戻すと $\\dfrac12e^{2x}$。残した $\\sin 3x$ を微分すると $3\\cos 3x$。部分積分で $\\displaystyle\\int e^{2x}\\sin 3x\\,dx = \\frac12e^{2x}\\sin 3x - \\int\\frac12e^{2x}\\cdot 3\\cos 3x\\,dx = \\frac12e^{2x}\\sin 3x - \\frac32\\int e^{2x}\\cos 3x\\,dx$。$k = -\\dfrac32$。はみ出しは $e^{2x}\\cos 3x$——元と同じくらいの手ごわさで、易しくはなっていない。中心の問いへの最初の部分回答：**指数 × 三角は、片方だけ巻き戻しても、相手が $\\sin$ から $\\cos$ に替わるだけで易しくならない**。",
        },
      ],
      formulaPreview: "e^(2x) を巻き戻す → (1/2)e^(2x)sin 3x − (3/2)∫e^(2x)cos 3x dx → k = −3/2",
      figureMarker: "<<M3INT_LOOP>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$I = \\displaystyle\\int e^{3x}\\sin 2x\\,dx$ とします。指数の側を巻き戻すのを $2$ 回くり返す（$2$ 回目も指数の側を巻き戻す）と、$I = \\dfrac13e^{3x}\\sin 2x - \\dfrac29e^{3x}\\cos 2x + m\\,I$ の形になります。$m$ を求めましょう。",
      answer: -4 / 9,
      answerDisplay: "-4/9",
      unit: "",
      unknownLabel: "右辺に現れた $I$ の係数 $m$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題のはみ出しに、同じ手つきをもう一度当てると、何が出てくる？" },
        {
          layer: 2,
          text: "前題と変わったのは、巻き戻しを $2$ 回くり返すこと。",
        },
        {
          layer: 3,
          text: "$1$ 回目：$I = \\dfrac13e^{3x}\\sin 2x - \\dfrac23\\displaystyle\\int e^{3x}\\cos 2x\\,dx$。$2$ 回目（はみ出しの $e^{3x}$ を巻き戻す）：$\\displaystyle\\int e^{3x}\\cos 2x\\,dx = \\frac13e^{3x}\\cos 2x + \\frac23\\int e^{3x}\\sin 2x\\,dx = \\frac13e^{3x}\\cos 2x + \\frac23I$。代入して $I = \\dfrac13e^{3x}\\sin 2x - \\dfrac29e^{3x}\\cos 2x - \\dfrac49I$。$m = -\\dfrac49$。$2$ 回目で $\\sin$ の側を巻き戻すと、$1$ 回目をちょうど逆にたどって $I = I$ になってしまう（何も分からない）。中心の問いへ：**$2$ 回くり返すと、出発点の積分 $I$ がもう一度現れる**——ただし、係数は $1$ ではない。",
        },
      ],
      formulaPreview: "I = (1/3)e^(3x)sin 2x − (2/3){(1/3)e^(3x)cos 2x + (2/3)I} → m = −4/9",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "前の問題の $I = \\displaystyle\\int e^{3x}\\sin 2x\\,dx$ は、$I = e^{3x}(p\\sin 2x + q\\cos 2x) + C$ の形に書けます。$p$ を求めましょう。",
      answer: 3 / 13,
      answerDisplay: "3/13",
      unit: "",
      unknownLabel: "$e^{3x}\\sin 2x$ の係数 $p$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題の式の右辺に、求めたい $I$ そのものが入っていた。それは行き止まり？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$I$ を求めきること。数Ⅱで、定積分が式の中に入っていたとき、それを何と見た？（[微分と積分の関係]）",
        },
        {
          layer: 3,
          text: "前題の式 $I = \\dfrac13e^{3x}\\sin 2x - \\dfrac29e^{3x}\\cos 2x - \\dfrac49I$ を、$I$ を未知数とする $1$ 次方程式と見る。$-\\dfrac49I$ を左に移すと $\\dfrac{13}{9}I = \\dfrac13e^{3x}\\sin 2x - \\dfrac29e^{3x}\\cos 2x$、$I = \\dfrac{3}{13}e^{3x}\\sin 2x - \\dfrac{2}{13}e^{3x}\\cos 2x + C$。$p = \\dfrac{3}{13}$。微分すると $e^{3x}\\sin 2x$ に戻る。数Ⅱで、式の中の定積分を $k$ と置いて解いたのと同じ形である。中心の問いへ：**堂々巡りは行き止まりではない。もう一度現れた $I$ を未知数と見れば、$1$ 次方程式で閉じる**——係数が $1$ でない限り。",
        },
      ],
      formulaPreview: "(1 + 4/9)I = (1/3)e^(3x)sin 2x − (2/9)e^(3x)cos 2x → p = 3/13",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\displaystyle\\int e^{-x}\\cos 3x\\,dx = e^{-x}(p\\sin 3x + q\\cos 3x) + C$ と書けます。$q$ を求めましょう。",
      answer: -1 / 10,
      answerDisplay: "-1/10",
      unit: "",
      unknownLabel: "$e^{-x}\\cos 3x$ の係数 $q$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で $I$ を閉じた手つきは、そのまま使える？" },
        {
          layer: 2,
          text: "前題と変わったのは、指数が $e^{-x}$ で、出発点が $\\cos$ であること。",
        },
        {
          layer: 3,
          text: "$J = \\displaystyle\\int e^{-x}\\cos 3x\\,dx$。$e^{-x}$ を巻き戻すと $-e^{-x}$。$1$ 回目：$J = -e^{-x}\\cos 3x - 3\\displaystyle\\int e^{-x}\\sin 3x\\,dx$。$2$ 回目：$\\displaystyle\\int e^{-x}\\sin 3x\\,dx = -e^{-x}\\sin 3x + 3J$。代入して $J = -e^{-x}\\cos 3x + 3e^{-x}\\sin 3x - 9J$、$10J = e^{-x}(3\\sin 3x - \\cos 3x)$。$J = e^{-x}\\left(\\dfrac{3}{10}\\sin 3x - \\dfrac{1}{10}\\cos 3x\\right) + C$。$q = -\\dfrac{1}{10}$。中心の問いへ：**$\\cos$ から出発しても、指数が減っていても、$2$ 回で出発点に戻り、方程式で閉じる**。",
        },
      ],
      formulaPreview: "J = −e^(−x)cos 3x + 3e^(−x)sin 3x − 9J → 10J = e^(−x)(3sin 3x − cos 3x) → q = −1/10",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\left(e^{4x}\\sin x\\right)' = 4e^{4x}\\sin x + e^{4x}\\cos x$、$\\left(e^{4x}\\cos x\\right)' = 4e^{4x}\\cos x - e^{4x}\\sin x$ です。この $2$ 本の式を使うと、$\\displaystyle\\int e^{4x}\\sin x\\,dx = e^{4x}(p\\sin x + q\\cos x) + C$ と書けます。$p$ を求めましょう。",
      answer: 4 / 17,
      answerDisplay: "4/17",
      unit: "",
      unknownLabel: "$e^{4x}\\sin x$ の係数 $p$",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。step3 は巻き戻しを $2$ 回くり返した。今度は微分の式が $2$ 本与えられている。それで同じ係数に届く？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは、部分積分を使わずに、与えられた $2$ 本の微分の式から出発すること。",
        },
        {
          layer: 3,
          text: "$1$ 本目を $4$ 倍して $2$ 本目を引くと、$\\cos$ の項が消える：$\\left(4e^{4x}\\sin x - e^{4x}\\cos x\\right)' = 16e^{4x}\\sin x + e^{4x}\\sin x = 17e^{4x}\\sin x$。だから $\\displaystyle\\int e^{4x}\\sin x\\,dx = \\frac{1}{17}\\left(4e^{4x}\\sin x - e^{4x}\\cos x\\right) + C$。$p = \\dfrac{4}{17}$。部分積分を $2$ 回くり返しても同じ式になる。中心の問いへ：**閉じ方は $1$ つではない。微分の $2$ 本の式を連立方程式と見ても、同じ答えに届く**。",
        },
      ],
      formulaPreview: "4(e^(4x)sin x)′ − (e^(4x)cos x)′ = 17e^(4x)sin x → p = 4/17",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "正の定数 $a$ について、$\\displaystyle\\int e^{ax}\\sin x\\,dx = e^{ax}\\left(\\frac{3}{10}\\sin x - \\frac{1}{10}\\cos x\\right) + C$ が成り立ちます。$a$ を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "指数の係数 $a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。分かっているものと、探しているものが入れかわった。" },
        {
          layer: 2,
          text: "前題と向きが逆。前題は指数の係数から積分の係数を出した。今度は積分の係数から指数の係数を探す。",
        },
        {
          layer: 3,
          text: "右辺を微分して $e^{ax}\\sin x$ に戻ればよい。$\\left\\{e^{ax}\\left(\\dfrac{3}{10}\\sin x - \\dfrac{1}{10}\\cos x\\right)\\right\\}' = e^{ax}\\left\\{\\left(\\dfrac{3a}{10} + \\dfrac{1}{10}\\right)\\sin x + \\left(\\dfrac{3}{10} - \\dfrac{a}{10}\\right)\\cos x\\right\\}$。$\\cos x$ の係数が $0$ になるには $a = 3$。このとき $\\sin x$ の係数は $\\dfrac{9}{10} + \\dfrac{1}{10} = 1$ で、確かに戻る。一般に $\\displaystyle\\int e^{ax}\\sin x\\,dx = \\frac{e^{ax}(a\\sin x - \\cos x)}{a^2 + 1} + C$——$a = 3$ で分母は $10$。中心の問いへ：**閉じた結果も、微分すれば確かめられる。係数の比から、もとの指数も読み戻せる**。",
        },
      ],
      formulaPreview: "微分して cos x の係数 3/10 − a/10 = 0 → a = 3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "関数 $F(x)$ は、微分すると $e^{-x}\\cos 3x$ になり、$F(0) = 1$ を満たします。$F(x) = e^{-x}(p\\sin 3x + q\\cos 3x) + C$ と書くとき、定数 $C$ を求めましょう。",
      answer: 11 / 10,
      answerDisplay: "11/10",
      unit: "",
      unknownLabel: "$F(0) = 1$ を満たす定数 $C$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。巻き戻す関数は同じ。何が増えた？" },
        {
          layer: 2,
          text: "step4 と変わったのは、$x = 0$ での値という条件が $1$ つ増えたこと。",
        },
        {
          layer: 3,
          text: "step4 より $F(x) = e^{-x}\\left(\\dfrac{3}{10}\\sin 3x - \\dfrac{1}{10}\\cos 3x\\right) + C$。$x = 0$ では $e^0 = 1$、$\\sin 0 = 0$、$\\cos 0 = 1$ なので $F(0) = -\\dfrac{1}{10} + C = 1$、$C = \\dfrac{11}{10}$。$C = 1$ と答えると、括弧の中が $x = 0$ で $0$ にならないことを見落としている。中心の問いへ：**方程式で閉じた原始関数にも、$+C$ はつく。条件が $1$ つあれば決まる**。",
        },
      ],
      formulaPreview: "F(0) = −1/10 + C = 1 → C = 11/10",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$x > 0$ で $\\displaystyle\\int x\\cos(\\log x)\\,dx = x^2\\left\\{a\\cos(\\log x) + b\\sin(\\log x)\\right\\} + C$ と書けます。$a$ を求めましょう。",
      answer: 2 / 5,
      answerDisplay: "2/5",
      unit: "",
      unknownLabel: "$x^2\\cos(\\log x)$ の係数 $a$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。step4 は指数 × 三角だった。この積分のどこかに、指数 × 三角が隠れていない？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、三角関数の中身が $\\log x$ になっていること。系列5 で、中身の込み入った関数をどう扱った？（[置換積分]）",
        },
        {
          layer: 3,
          text: "$t = \\log x$ と置くと $x = e^t$、$dx = e^t\\,dt$。$\\displaystyle\\int x\\cos(\\log x)\\,dx = \\int e^t\\cos t\\cdot e^t\\,dt = \\int e^{2t}\\cos t\\,dt$——すり替えたら、指数 × 三角になった。step4 の手つきで $\\displaystyle\\int e^{2t}\\cos t\\,dt = \\frac{e^{2t}(2\\cos t + \\sin t)}{5} + C$。$e^{2t} = x^2$ に戻して $\\dfrac{x^2}{5}\\left\\{2\\cos(\\log x) + \\sin(\\log x)\\right\\} + C$。$a = \\dfrac25$。中心の問いへ：**すり替えで指数 × 三角を作れば、循環の手つきが使える。道具は組み合わせて使う**。",
        },
      ],
      formulaPreview: "t = log x → ∫e^(2t)cos t dt = e^(2t)(2cos t + sin t)/5 → a = 2/5",
      figureMarker: "<<M3INT_TWO_STAGE>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "定積分 $\\displaystyle\\int_{\\log 2}^{\\log 3}\\frac{e^x}{e^{2x} - 1}\\,dx$ の値を求めましょう。",
      answer: (Math.log(3) - Math.log(2)) / 2,
      answerDisplay: "(log3-log2)/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\int_{\\log 2}^{\\log 3}\\frac{e^x}{e^{2x} - 1}\\,dx$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      inputAffordances: ["log"],
      hints: [
        { layer: 1, text: "前題と比べてみよう。すり替えで見覚えのある形を作るのは同じ。今度は何が現れる？" },
        {
          layer: 2,
          text: "前題と変わったのは、指数関数が分数の分母と分子に入っていること。",
        },
        {
          layer: 3,
          text: "$t = e^x$ と置くと $dt = e^x\\,dx$、$t$ は $2$ から $3$。$\\displaystyle\\int_2^3\\frac{dt}{t^2 - 1}$——系列3 の分ける形になった。$\\dfrac{1}{t^2 - 1} = \\dfrac12\\left(\\dfrac{1}{t-1} - \\dfrac{1}{t+1}\\right)$ で、$\\dfrac12\\Big[\\log(t-1) - \\log(t+1)\\Big]_2^3 = \\dfrac12\\left\\{(\\log 2 - \\log 4) - (0 - \\log 3)\\right\\} = \\dfrac12(\\log 3 - \\log 2)$。中心の問いへ：**すり替えのあとに現れる形は、指数 × 三角とは限らない。現れた形に合った道具を、在庫から選ぶ**。",
        },
      ],
      formulaPreview: "t = e^x → ∫₂³ dt/(t²−1) = (1/2)∫₂³ (1/(t−1) − 1/(t+1))dt = (log 3 − log 2)/2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $y = e^{-2x}\\sin x$（$0 \\le x \\le 2\\pi$）と $x$ 軸で囲まれた部分の面積は、$p\\left(1 + e^{-2\\pi}\\right)^2$ の形になります。$p$ を求めましょう。",
      answer: 1 / 5,
      answerDisplay: "1/5",
      unit: "",
      unknownLabel: "面積 $= p\\left(1 + e^{-2\\pi}\\right)^2$ の $p$",
      variationFromPrevious: "composite",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。指数 × 三角を巻き戻すのは同じ。面積にするとき、気をつけることは？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、求めるのが面積で、$\\sin x$ が区間の途中で負になること。",
        },
        {
          layer: 3,
          text: "step4 の手つきで $\\displaystyle\\int e^{-2x}\\sin x\\,dx = -\\frac{e^{-2x}(2\\sin x + \\cos x)}{5} + C$。$0 \\le x \\le \\pi$ では $y \\ge 0$、$\\pi \\le x \\le 2\\pi$ では $y \\le 0$ なので、面積は区間を $\\pi$ で割って、後半の符号を反転する（数Ⅱの面積と同じ）。前半 $= \\dfrac{1 + e^{-2\\pi}}{5}$、後半の大きさ $= \\dfrac{e^{-2\\pi} + e^{-4\\pi}}{5}$。合計 $\\dfrac{1 + 2e^{-2\\pi} + e^{-4\\pi}}{5} = \\dfrac15\\left(1 + e^{-2\\pi}\\right)^2$。$p = \\dfrac15$。そのまま $0$ から $2\\pi$ まで積分すると $\\dfrac{1 - e^{-4\\pi}}{5}$ になり、面積ではない。中心の問いへ：**循環で閉じた原始関数は、面積の計算にもそのまま使える——符号の変わり目で区間を割ることだけは、別に気をつける**。",
        },
      ],
      formulaPreview: "原始関数 −e^(−2x)(2sin x + cos x)/5、π で割る → (1/5)(1 + e^(−2π))² → p = 1/5",
    },
  ],
  derivation: `**中心の問い** ｜ 片方だけ巻き戻すのを $2$ 回くり返したら、出発点の積分がもう一度現れた。**それは行き止まりか、それとも答えへの近道か？**

────────

## 片方だけ巻き戻しても、易しくならない積

系列6 の [部分積分] は、はみ出しが元より易しくなる側を巻き戻した。指数 × 三角では、どちらを巻き戻しても、はみ出しは「指数 × 三角」のまま——$\\sin$ が $\\cos$ に替わるだけである（step1）。

<<M3INT_LOOP>>

## ここが胚細胞：同じ積分がもう一度現れたら、方程式で閉じる

指数の側を $2$ 回巻き戻すと、出発点の $I$ がもう一度現れる（step2）。

$$I = (\\text{はっきり分かった式}) + m\\,I$$

**$m \\ne 1$ なら**、$I$ を未知数とする $1$ 次方程式として解ける（step3）：

$$I = \\frac{\\text{はっきり分かった式}}{1 - m}$$

数Ⅱで、式の中に入った定積分を $k$ と置いて解いたのと同じ形である。堂々巡りは行き止まりではなく、**方程式**である。

$m = 1$ だと $I$ が両辺で消えて何も分からない。$2$ 回目に、$1$ 回目と逆の側を巻き戻すとこれが起きる（$1$ 回目をちょうど逆にたどる）。だから $2$ 回とも同じ側を巻き戻す。

一般に

$$\\int e^{ax}\\sin bx\\,dx = \\frac{e^{ax}(a\\sin bx - b\\cos bx)}{a^2 + b^2} + C$$

を、覚えなくても導ける。

## もう $1$ つの閉じ方：微分の連立

$e^{ax}\\sin bx$ と $e^{ax}\\cos bx$ を微分すると、互いに相手を含む $2$ 本の式になる。この $2$ 本から片方の項を消去すれば、積分の答えが直接出る（step5）。部分積分を使わない道で、同じ答えに届く。

## 組み合わせる

- **すり替え → 循環**：$t = \\log x$ で $x\\cos(\\log x)$ が $e^{2t}\\cos t$ になる（step8）
- **すり替え → 分ける**：$t = e^x$ で指数の分数が $\\dfrac{1}{t^2 - 1}$ になる（step9）
- **循環 → 面積**：符号の変わり目で区間を割る（step10）

<<M3INT_TWO_STAGE>>

## Step の道筋

- **step1**（事例）：$1$ 回では易しくならない
- **step2**：$2$ 回で出発点が戻る
- **step3（山場）**：方程式で閉じる
- **step4**：$\\cos$ から・指数が減っていても同じ
- **step5**：微分の連立という別の道
- **step6**：結果から指数を読み戻す
- **step7**：条件で $C$ を決める
- **step8〜10**：すり替え・分ける・面積と組み合わせる

────────

**もっと深く**

**忘れても導ける。** 公式を忘れたら、指数の側を $2$ 回巻き戻して $I$ を出し、方程式を解く。あるいは $e^{ax}\\sin bx$ と $e^{ax}\\cos bx$ を微分して連立する。どちらの道でも、最後に微分して戻れば確かめられる。

**係数が $1$ のとき何が起きるか。** $2$ 回目に逆の側を巻き戻すと $I = I$ という恒等式になる。間違いではないが、何も分からない。この $1$ 次方程式で $I$ が求まるのは、戻ってきた $I$ の係数が $1$ でないときである。

**自分自身を含む式。** 「求めたいものが、それ自身を含む式で表される」形は、数学のいろいろな所に出てくる。数列の漸化式の極限、行列の固有値、確率の「もう一度最初から」の問題。どれも、未知のものを未知数と見て方程式を立てる。

**この先の景色。** 大学では、$e^{ax}\\sin bx$ と $e^{ax}\\cos bx$ を複素数の指数 $e^{(a + bi)x}$ $1$ つにまとめると、循環は消えて、普通の指数関数の巻き戻しになる。$\\sin$ と $\\cos$ が $2$ 回で戻ってくるのは、複素数の世界で $i^2 = -1$ が働いているからである。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第6章「部分積分」の、部分積分を $2$ 回くり返して出発点の積分が戻る指数 × 三角の扱いと、それを微分の $2$ 本の式から求める別の道（同書のコメント）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

行き止まりではなく、近道だった。戻ってきた積分を未知数と見れば、$1$ 次方程式で閉じる——係数が $1$ でない限り。

指数 × 三角は、片方だけ巻き戻しても易しくならない。だからこそ、易しくするのではなく、方程式で閉じる。`,
};

export const MATH3_INTEGRAL_SERIES_LIST: LearnerSeries[] = [
  M3INT_BASIC_SERIES,
  M3INT_LOG_SERIES,
  M3INT_RESHAPE_SERIES,
  M3INT_TRACE_SERIES,
  M3INT_SUBST_SERIES,
  M3INT_PARTS_SERIES,
  M3INT_CYCLE_SERIES,
];
