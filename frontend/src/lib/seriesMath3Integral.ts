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
          text: "step4 と変わったのは、分母が $6x+5$ のかたまりになったこと。step1 の正の側（$\\log x$）と step4 の負の側（$\\log(-x)$）は、絶対値の記号でどう $1$ つにまとめられる？",
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

export const MATH3_INTEGRAL_SERIES_LIST: LearnerSeries[] = [M3INT_BASIC_SERIES, M3INT_LOG_SERIES];
