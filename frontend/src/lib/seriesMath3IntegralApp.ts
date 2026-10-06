/**
 * 「積分法の応用」ユニットの系列（数Ⅲ・C 第7章）。
 *
 * 背骨設計は docs/math3c_integral_app_design.md
 * （メイン Opus 5.5・2026-10-02 起草・裁定 Q1〜Q4 推奨どおり → Round 1 背骨監査〔Sonnet 5.5〕凍結前 9 件全件反映 → 2026-10-07 凍結）。
 * 系列はメインがひとりで実装する（並列委譲なし）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第7章 積分法の応用（旺文社・2024）の
 * 章構成を借り、問題の値・関数はすべてオリジナルに変更（copyright-credit-vs-copy）。
 * 原典の決め台詞・比喩・造語は地の文に入れない（裁定 Q4）。
 * 「切り口（の長さ・面積）」は数学の記述語として使う（裁定 Q3。数Ⅱ・B の系列と辞書キーもこの語）。
 *
 * ハブ胚細胞（背骨 D1）：
 *   同じ量なら、細かく切って足した行き先は、どう切っても同じ（向きと符号をそろえれば）。
 *   だから切り方は、1 片が式に書きやすい向き・目盛りを自分で選べる——
 *   1 片が式に書けないときも、大きい 1 片と小さい 1 片ではさめば総量に届く。
 *
 * 入力の折り方（背骨 D2・D6）：
 * - 入力系に累乗 ^ は無い（裁定 Q2）。π² が出る step は「π × 括弧」か π*π の打ち方を問題文で示す
 * - e² は区間の端を log の値にして消す
 * - 「これでしか解けない」とは書かない（追補18-b）。①型の山場は「高校で使う記号では」の範囲を添える
 */

import type { LearnerSeries } from "./types";

/** M3IA1: 面積——縦にも横にも切れる。
 *  step1〜4：縦に切る（相手が三角・指数・分数関数になっても「上 − 下」）
 *  step5（質）：横に切る（x = y の式で与えられた放物線と直線。縦だと下のふちの式が途中で変わり 2 本＝32/3 で一致）
 *  step6・7：対数関数の曲線は横に切れば指数の 1 本（7 は逆：面積 8 → k = log 9。e^k は単調で解は 1 つ）
 *  山場 step8（C12 ①・範囲つき）：x = y + e^y。y を x の式に、高校で使う記号では書き直せない
 *    ＝縦の切り口の長さを x の式で書く入口が無い（置換すれば横と同じ式になる＝「横でしか」とは書かない）
 *  step9（複合・C13 第5章 接線）・step10（複合・C13 第6章 部分積分）
 *  答え 10 個はすべて相異なる（4/3・4・1/4・3/2−2log2・32/3・5・log9・e−1/2・e/2−1・π/16＝sympy と数値積分で一致）。
 *  step10 は当初 x cos x（[0, π/2]）だったが、原典 応2 を解く途中の積分 2∫₀^(π/2) x cos x と区間ごと同じだったので替えた（自己監査・正規形の照合）。
 *  原典の族（√x と x／a cos x と b sin x／(x−a)e^{−x}／ax² と log x の接する 2 曲線／sin と cos の π/4〜5π/4）は使っていない。 */
export const M3IA_AREA_SERIES: LearnerSeries = {
  id: "math3_ia_area_01",
  title: "面積——縦にも横にも切れる",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 数Ⅱでは図形を縦に切って面積を出した。相手が三角・指数・対数の曲線になっても同じ手つきは通るか。縦に切ると式が書きにくいとき、横に切るとどうなるか。$10$ 問で確かめる。",
  patternId: "M3IA1",
  unit: "math_3",
  revelationLabel:
    "**横に切れば、切り口の長さは「右 − 左」を $y$ の式で書いて、$y$ で足す**。どちらの向きに切っても、面積は同じ",
  drivingQuestion:
    "数Ⅱでは図形を縦に切り、切り口を $x$ で足して面積を出した。縦に切ると切り口の式が途中で変わったり書けなかったりするとき、**ほかにどう切れる？——切り方を変えたら、面積は変わる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "曲線 $y = 2\\sin 3x$ は、原点から右へ進むと、$x$ 軸の上に山を $1$ つ作ってから $x$ 軸にもどります。この $1$ つ目の山と $x$ 軸で囲まれた部分の面積を求めましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "1 つ目の山と $x$ 軸で囲まれた部分の面積",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数Ⅱで放物線と $x$ 軸で囲まれた面積を出したとき、図形をどう切って、何を足した？ 相手が三角関数になっても、同じ見方は通りそう？",
        },
        {
          layer: 2,
          text: "数Ⅱの面積の系列で、縦に切った $1$ 本の長さはどう作った？（[切り口の長さ]）",
        },
        {
          layer: 3,
          text: "山の右のはしは $2\\sin 3x = 0$ の正の解のうちいちばん小さいもの。$3x = \\pi$ より $x = \\dfrac{\\pi}{3}$。$0 \\le x \\le \\dfrac{\\pi}{3}$ では曲線が上、$x$ 軸が下なので、位置 $x$ の切り口の長さは $2\\sin 3x - 0$。足すと $\\displaystyle\\int_0^{\\frac{\\pi}{3}} 2\\sin 3x\\,dx = \\Big[-\\dfrac23\\cos 3x\\Big]_0^{\\frac{\\pi}{3}} = \\dfrac23 + \\dfrac23 = \\dfrac43$。中心の問いへの最初の部分回答：**相手が三角関数になっても、縦に切って「上 − 下」を足す手つきはそのまま通る。新しくなったのは巻き戻す相手だけ**。",
        },
      ],
      formulaPreview: "右のはし x = π/3 → ∫₀^(π/3) 2 sin 3x dx = 4/3",
      figureMarker: "<<M3IA_HUMP_SLICE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "曲線 $y = e^{2x}$ と $x$ 軸、$2$ 本の直線 $x = 0$、$x = \\log 3$ で囲まれた部分の面積を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線が三角関数から指数関数になったこと。" },
        {
          layer: 3,
          text: "$0 \\le x \\le \\log 3$ で $e^{2x} > 0$ なので、切り口の長さは $e^{2x} - 0$。$\\displaystyle\\int_0^{\\log 3} e^{2x}\\,dx = \\Big[\\dfrac12 e^{2x}\\Big]_0^{\\log 3} = \\dfrac12\\left(e^{2\\log 3} - 1\\right) = \\dfrac12(9 - 1) = 4$（$e^{2\\log 3} = \\left(e^{\\log 3}\\right)^2 = 9$）。中心の問いへ：**指数関数でも縦に切る手つきは同じ。右のはしが $\\log$ の値だと、$e$ は代入したところで消える**。",
        },
      ],
      formulaPreview: "∫₀^(log 3) e^(2x) dx = (1/2)(9 − 1) = 4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$2$ 曲線 $y = \\sin 2x$ と $y = \\sin x$ は原点で交わります。原点と、$0 < x < \\pi$ の範囲にあるもう $1$ つの交点とのあいだで、$2$ 曲線に囲まれた部分の面積を求めましょう。",
      answer: 1 / 4,
      answerDisplay: "1/4",
      unit: "",
      unknownLabel: "$2$ 曲線に囲まれた部分の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、図形の下のふちが $x$ 軸でなく、もう $1$ 本の曲線になったこと。",
        },
        {
          layer: 3,
          text: "交点：$\\sin 2x = \\sin x$ より $2\\sin x\\cos x - \\sin x = \\sin x\\,(2\\cos x - 1) = 0$。$0 < x < \\pi$ では $\\sin x \\ne 0$ なので $\\cos x = \\dfrac12$、$x = \\dfrac{\\pi}{3}$。あいだの $x = \\dfrac{\\pi}{6}$ で $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt3}{2}$、$\\sin\\dfrac{\\pi}{6} = \\dfrac12$ なので上は $y = \\sin 2x$。$\\displaystyle\\int_0^{\\frac{\\pi}{3}}(\\sin 2x - \\sin x)\\,dx = \\Big[-\\dfrac12\\cos 2x + \\cos x\\Big]_0^{\\frac{\\pi}{3}} = \\left(\\dfrac14 + \\dfrac12\\right) - \\left(-\\dfrac12 + 1\\right) = \\dfrac14$。中心の問いへ：**下のふちが曲線でも、縦の切り口は「上 − 下」の $1$ 本。交点が足す範囲のはしを決める**。",
        },
      ],
      formulaPreview: "交点 x = 0, π/3 → ∫₀^(π/3) (sin 2x − sin x) dx = 1/4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "曲線 $y = \\dfrac{2}{x}$ と直線 $y = 3 - x$ で囲まれた部分の面積を求めましょう。",
      answer: 3 / 2 - 2 * Math.log(2),
      answerDisplay: "3/2-2log2",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["log"],
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、囲む $2$ 本が分数関数の曲線と直線になったこと。" },
        {
          layer: 3,
          text: "交点：$\\dfrac{2}{x} = 3 - x$ より $x^2 - 3x + 2 = 0$、$x = 1,\\ 2$。あいだの $x = \\dfrac32$ で $3 - x = \\dfrac32$、$\\dfrac2x = \\dfrac43$ なので上は直線。$\\displaystyle\\int_1^2\\left(3 - x - \\dfrac2x\\right)dx = \\Big[3x - \\dfrac12x^2 - 2\\log x\\Big]_1^2 = (6 - 2 - 2\\log 2) - \\left(3 - \\dfrac12\\right) = \\dfrac32 - 2\\log 2$。中心の問いへ：**$\\dfrac1x$ が混ざっても、縦に切る道はそのまま。巻き戻した先に $\\log$ が出てくるだけ**。",
        },
      ],
      formulaPreview: "交点 x = 1, 2 → ∫₁² (3 − x − 2/x) dx = 3/2 − 2 log 2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "放物線 $x = y^2$ と直線 $x = 2y + 3$ で囲まれた部分の面積を求めましょう。（放物線は $x$ が $y$ の式で書かれていて、右に開いた形をしています）",
      answer: 32 / 3,
      answerDisplay: "32/3",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、曲線の式が $y = (x \\text{ の式})$ でなく $x = (y \\text{ の式})$ の形で与えられていること。",
        },
        {
          layer: 3,
          text: "交点：$y^2 = 2y + 3$ より $(y - 3)(y + 1) = 0$、$y = -1,\\ 3$。**横に切る**と、高さ $y$ の切り口は左のふちが放物線 $x = y^2$、右のふちが直線 $x = 2y + 3$ で、長さは「右 − 左」$= 2y + 3 - y^2$。$y$ で足して $\\displaystyle\\int_{-1}^{3}(2y + 3 - y^2)\\,dy = \\Big[y^2 + 3y - \\dfrac13 y^3\\Big]_{-1}^{3} = 9 - \\left(-\\dfrac53\\right) = \\dfrac{32}{3}$。縦に切ると、$0 \\le x \\le 1$ では上下とも放物線（$y = \\pm\\sqrt x$）、$1 \\le x \\le 9$ では上が放物線・下が直線になり、$\\displaystyle\\int_0^1 2\\sqrt x\\,dx + \\int_1^9\\left(\\sqrt x - \\dfrac{x - 3}{2}\\right)dx = \\dfrac43 + \\dfrac{28}{3} = \\dfrac{32}{3}$。同じ値。中心の問いへ：**縦に切ると下のふちの式が途中で変わって $2$ 本に割れる。横に切れば $1$ 本で済む。切り方を替えても面積は同じ**。",
        },
      ],
      formulaPreview: "横に切る：∫₋₁³ (2y + 3 − y²) dy = 32/3（縦に切って 4/3 + 28/3 でも同じ）",
      figureMarker: "<<M3IA_REGION_CHOOSE>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "曲線 $y = \\log x$ と $y$ 軸、$2$ 本の直線 $y = 0$、$y = \\log 6$ で囲まれた部分の面積を求めましょう。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線が対数関数になったこと。" },
        {
          layer: 3,
          text: "横に切ると、高さ $y$ の切り口は左が $y$ 軸（$x = 0$）、右が曲線。$y = \\log x$ を $x$ について解くと $x = e^y$ なので、長さは $e^y - 0$。$\\displaystyle\\int_0^{\\log 6} e^y\\,dy = \\Big[e^y\\Big]_0^{\\log 6} = 6 - 1 = 5$。縦に切ると、$0 \\le x \\le 1$ は高さ $\\log 6$ の長方形、$1 \\le x \\le 6$ は切り口 $\\log 6 - \\log x$ で、$\\displaystyle\\int\\log x\\,dx$ の [部分積分] が要る：$\\log 6 + \\left(5\\log 6 - (6\\log 6 - 6 + 1)\\right) = 5$。同じ値。中心の問いへ：**対数の曲線は、横に切れば指数関数の $1$ 本になる**。",
        },
      ],
      formulaPreview: "横に切る：∫₀^(log 6) e^y dy = 6 − 1 = 5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "曲線 $y = \\log x$ と $y$ 軸、直線 $y = 0$、直線 $y = k$（$k > 0$）で囲まれた部分の面積が $8$ になりました。$k$ を求めましょう。",
      answer: Math.log(9),
      answerDisplay: "log9",
      unit: "",
      unknownLabel: "$k$",
      inputAffordances: ["log"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "前題と変わったのは、面積が分かっていて、上のふちの高さ $k$ が分からないこと。",
        },
        {
          layer: 3,
          text: "前題と同じく横に切ると、面積は $\\displaystyle\\int_0^k e^y\\,dy = e^k - 1$。$e^k - 1 = 8$ より $e^k = 9$、$k = \\log 9$（$= 2\\log 3$）。$e^k$ は $k$ とともに増え続けるので、解は $1$ つだけ。中心の問いへ：**横に切って式にしておけば、面積から逆に境目の高さも読める**。",
        },
      ],
      formulaPreview: "e^k − 1 = 8 → k = log 9",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "曲線 $x = y + e^y$ と $y$ 軸、$2$ 本の直線 $y = 0$、$y = 1$ で囲まれた部分の面積を求めましょう。",
      answer: Math.E - 1 / 2,
      answerDisplay: "e-1/2",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["e"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題までと比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "step6 と変わったのは、$x = (y \\text{ の式})$ の右辺に、$y$ と $e^y$ が足し算で並んでいること。",
        },
        {
          layer: 3,
          text: "横に切ると、高さ $y$ の切り口は左が $y$ 軸、右が曲線で、長さは $y + e^y$。$\\displaystyle\\int_0^1(y + e^y)\\,dy = \\Big[\\dfrac12y^2 + e^y\\Big]_0^1 = \\dfrac12 + e - 1 = e - \\dfrac12$。縦に切ろうとすると、切り口の下のふちの高さを $x$ の式で書く必要がある——$x = y + e^y$ を $y$ について解くことになるが、**高校で使う記号（根号・$\\log$・三角関数など）では、この式を $y = (x \\text{ の式})$ に書き直せない**。縦の切り口の長さを $x$ の式で書く入口が無い。中心の問いへ：**縦の切り口が式に書けないときでも、横の切り口なら書けることがある。どう切るかを選べることが、$1$ 片を式に書けるかどうかを分ける**。",
        },
      ],
      formulaPreview: "横に切る：∫₀¹ (y + e^y) dy = e − 1/2（縦の切り口は x の式に書けない）",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $y = e^x$ の、点 $(1,\\ e)$ における接線を $\\ell$ とします。曲線と $\\ell$ と $y$ 軸で囲まれた部分の面積を求めましょう。",
      answer: Math.E / 2 - 1,
      answerDisplay: "e/2-1",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["e"],
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。$2$ 本の線で囲まれた形は同じ。何が組み合わさっている？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは、囲む $1$ 本が、曲線の接線として与えられていること。",
        },
        {
          layer: 3,
          text: "$y' = e^x$ なので、点 $(1,\\ e)$ での傾きは $e$。[接線] は $y = e(x - 1) + e = ex$。$y = e^x$ は下に凸なので接線より上にあり、$0 \\le x \\le 1$ の切り口は $e^x - ex$。$\\displaystyle\\int_0^1(e^x - ex)\\,dx = \\Big[e^x - \\dfrac{e}{2}x^2\\Big]_0^1 = \\left(e - \\dfrac{e}{2}\\right) - 1 = \\dfrac{e}{2} - 1$。中心の問いへ：**囲む線が接線でも、縦の切り口は「上 − 下」。接線の式が、そのまま下のふちになる**。",
        },
      ],
      formulaPreview: "接線 y = ex → ∫₀¹ (e^x − ex) dx = e/2 − 1",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $y = x\\sin 4x$（$0 \\le x \\le \\dfrac{\\pi}{4}$）と $x$ 軸で囲まれた部分の面積を求めましょう。",
      answer: Math.PI / 16,
      answerDisplay: "π/16",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["pi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。曲線と $x$ 軸で囲む形は同じ。何が違う？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、曲線の式が $x$ と三角関数の積になっていること。",
        },
        {
          layer: 3,
          text: "$0 \\le x \\le \\dfrac{\\pi}{4}$ で $x \\ge 0$、$\\sin 4x \\ge 0$ なので、切り口の長さは $x\\sin 4x$。$\\sin 4x$ を巻き戻して $x$ を残す（[部分積分]）：$\\displaystyle\\int_0^{\\frac{\\pi}{4}} x\\sin 4x\\,dx = \\Big[-\\dfrac{x}{4}\\cos 4x\\Big]_0^{\\frac{\\pi}{4}} + \\dfrac14\\int_0^{\\frac{\\pi}{4}}\\cos 4x\\,dx = \\dfrac{\\pi}{16} + 0 = \\dfrac{\\pi}{16}$。中心の問いへ：**切り口の長さを巻き戻すのに第6章の道具が要っても、切って足す見方は変わらない**。",
        },
      ],
      formulaPreview: "∫₀^(π/4) x sin 4x dx = π/16 + (1/4)∫₀^(π/4) cos 4x dx = π/16",
    },
  ],
  derivation: `**中心の問い** ｜ 数Ⅱでは図形を縦に切り、切り口を $x$ で足して面積を出した。縦に切ると切り口の式が途中で変わったり書けなかったりするとき、**ほかにどう切れる？——切り方を変えたら、面積は変わる？**

────────

## 縦に切る手つきは、相手が変わっても同じ

数Ⅱの面積は、図形を縦に切り、位置 $x$ の[切り口の長さ]（上にある式 − 下にある式）を $x$ で足して出した。数Ⅲで新しくなるのは、**巻き戻す相手**である。

- 三角関数の山（step1）、指数関数（step2）、$2$ 本の三角関数（step3）、分数関数と直線（step4）
- 接線と曲線（step9）、$x$ と三角関数の積（step10）

どれも、交点で足す範囲のはしを決め、「上 − 下」を作って足すだけである。第6章で手に入れた巻き戻しの道具が、そのまま面積を返す。

## ここが胚細胞：切る向きは選べる

ところが、図形によっては縦に切るとやりにくい。

- 放物線が $x = y^2$ のように**横向き**だと、縦の切り口の下のふちが途中で放物線から直線に変わり、足し算が $2$ 本に割れる（step5）
- $y = \\log x$ の下を縦に切ると $\\int\\log x\\,dx$ が要るが、横に切れば $\\int e^y\\,dy$ の $1$ 本で済む（step6・7）
- $x = y + e^y$ は、高校で使う記号では $y = (x$ の式$)$ に書き直せない。縦の切り口の長さを $x$ の式で書く入口が無い（step8）

そこで、図形を**横に**切る。高さ $y$ の切り口の長さは

$$(\\text{右にある式}) - (\\text{左にある式})$$

を $y$ の式で書いたもので、それを $y$ で足す。

$$S = \\int_c^d \\big(\\text{右} - \\text{左}\\big)\\,dy$$

**同じ図形なら、縦に切って足しても横に切って足しても、面積は同じ**である（step5・6 は両方の道で同じ値になるのを確かめた）。だから、切り口が式に書きやすい向きを自分で選べばよい。

## Step の道筋

- **step1〜4**：縦に切る。相手は三角関数・指数関数・分数関数
- **step5（質的変化）**：横に切る。$x$ が $y$ の式で書かれた放物線
- **step6・7**：対数関数の曲線を横に切ると、指数関数の $1$ 本。step7 は面積から境目の高さを逆に読む
- **step8（山場）**：縦の切り口が $x$ の式に書けない曲線。横なら書ける
- **step9**：接線と曲線（第5章の接線と合流）
- **step10**：切り口の長さに部分積分が要る（第6章の道具と合流）

────────

**もっと深く**

**忘れても導ける。** 面積の公式を向きごとに覚える必要はない。図をかいて、**どちらの向きに切れば、切り口の両はしが $1$ 本ずつの式で書けるか**を見る。縦なら「上 − 下」を $x$ で、横なら「右 − 左」を $y$ で足す。

**横に切るのを忘れても、縦の道は閉じていないことが多い。** step5 は縦でも $2$ 本に割れば同じ値になった。step6 も部分積分を使えば縦で届く。step8 のように縦の切り口が式に書けないときでも、曲線の上の点を $y$ で動かして $x$ の目盛りを $y$ で測り直す（置換する）道はあるが、それは書いてみると横に切った式と同じものになる。**向きを選ぶのは、解けるかどうかより、1 片をどれだけ素直に式に書けるかの問題**である。

**この先の景色。** 大学では、平面の図形を細かい長方形に切って足す「重積分」を学ぶ。そこでも、先に縦に足すか横に足すかを選べ、どちらで足しても同じ値になる——足す順序を替えると、片方の順序では書けなかった式が書けるようになることがある。この系列の step8 は、その小さな姿である。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「定積分と面積」の構成（曲線どうしの交点で範囲を決める・図形を $y$ 軸に垂直に切って $y$ で積分する道もある）を参考。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

切り方は選べる。縦に切って「上 − 下」を $x$ で足しても、横に切って「右 − 左」を $y$ で足しても、同じ図形なら面積は同じになる。

だから、切り口の式が途中で変わったり書けなかったりする向きを避け、$1$ 片が素直に式に書ける向きを選べばよい。曲線が $x = (y$ の式$)$ で与えられているなら、横に切るのが近道になることが多い。`,
};

/** M3IA2: パラメータ曲線の面積——幅を t の目盛りで測り直す。
 *  step1：t を消して y = (x の式) にしてから面積（9）／step2：同じ面積を t のまま書いたときの t² の係数（−2＝step1 の写しにならない）
 *  step3：x が t の 2 次（t を消すと根号）。当初の y = t(2 − t) は t を消すと 2√x − x（0〜4）で、x = 4u で原典 練1(1) の √x − x の 16 倍だった（原典照合で検出）→ y = t²(2 − t)。step6 も同族だったので替えた／step4（質）：t が増えると x が減る（素朴に t の小→大で足すと −80/3、面積 80/3。当初の y = 3t は面積 16 が step3 の L3 の途中値「16」と重なった＝audit_cross_refs で検出して替えた）
 *  step5：三角のパラメータで向きが逆（曲線は x 軸に戻らないので、直線 x = −2 で閉じる）／step6（逆）：a⁵/10 = 243/10 → a = 3（5 乗は実数で解が 1 つ）
 *  山場 step7（C12 ①・範囲つき）：半径 3 の転がる円の軌跡のアーチの下の面積 27π。x = 3(t − sin t) は高校で使う記号では t = (x の式) に書き直せない
 *    （第5章の転がる円は半径 2。原典の練6〔半径 1〕は長さで、原典にアーチの面積は無い）
 *  step8：閉じた曲線（x 軸について対称・上半分の 2 倍）／step9（複合・C13 第5章）：接線が水平になる t で区間を決める／step10（複合・C13 第6章 積和）
 *  答え 10 個はすべて相異なる（9・−2・16/5・80/3・8・3・27π・8/15・8/5・9√3/16＝sympy と、t を消した積分・数値積分で一致）。
 *  原典の曲線（(sin t, sin 2t)・(2cos t, sin t)・それらの t ↦ π/2 − t と x・y の入れかえ）と楕円の族は使っていない。 */
export const M3IA_PARAM_SERIES: LearnerSeries = {
  id: "math3_ia_param_01",
  title: "パラメータ曲線の面積——幅を t の目盛りで測り直す",
  subtitle:
    "数Ⅲ・C 積分法の応用より — $y$ が $x$ の式で書けない曲線でも、縦に切って足せば面積のはず。切り口の幅を $t$ の目盛りで測り直すと何が掛かり、$t$ と $x$ の向きが逆だと何が入れかわるか。$10$ 問で確かめる。",
  patternId: "M3IA2",
  unit: "math_3",
  revelationLabel:
    "**幅を $t$ の目盛りで測り直すと $\\dfrac{dx}{dt}$ が掛かる**。$t$ が進む向きと $x$ が進む向きが逆なら、足す区間の上と下も入れかわる",
  drivingQuestion:
    "$y$ が $x$ の式で書けない曲線でも、縦の切り口を足せば面積のはず。**切り口の幅を $x$ でなく $t$ の目盛りで測ると、何が掛かり、何が入れかわる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$t$ を使って $x = 2t$、$y = t(3 - t)$（$0 \\le t \\le 3$）と表される曲線があります。この曲線と $x$ 軸で囲まれた部分の面積を求めましょう。",
      answer: 9,
      answerDisplay: "9",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$t$ を決めると、曲線の上の点が $1$ つ決まる。この曲線を $y = (x \\text{ の式})$ に直せたら、数Ⅱと同じように面積が出せそう？",
        },
        {
          layer: 2,
          text: "第5章で、$t$ で表された曲線の上の点は、$t$ を決めるとどう決まった？（[媒介変数表示]）",
        },
        {
          layer: 3,
          text: "$x = 2t$ から $t = \\dfrac{x}{2}$。代入すると $y = \\dfrac{x}{2}\\left(3 - \\dfrac{x}{2}\\right)$。$t$ が $0$ から $3$ まで動くと、$x$ は $0$ から $6$ まで動く。$\\displaystyle\\int_0^6 \\dfrac{x}{2}\\left(3 - \\dfrac{x}{2}\\right)dx = \\Big[\\dfrac34x^2 - \\dfrac{1}{12}x^3\\Big]_0^6 = 27 - 18 = 9$。中心の問いへの最初の部分回答：**$t$ を消して $y = (x \\text{ の式})$ に直せれば、面積はこれまでどおり縦に切って出せる**。",
        },
      ],
      formulaPreview: "t = x/2 を代入 → y = (x/2)(3 − x/2) → ∫₀⁶ y dx = 9",
      figureMarker: "<<M3IA_PARAM_POINT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題と同じ面積を、$t$ を消さずに $\\displaystyle\\int_0^3 (at^2 + bt)\\,dt$ の形で書きます。$a$ を求めましょう。",
      answer: -2,
      answerDisplay: "-2",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。求める面積は同じ。何が違う？" },
        { layer: 2, text: "前題と変わったのは、足す目盛りが $x$ でなく $t$ になったこと。" },
        {
          layer: 3,
          text: "縦の切り口の長さは $y = t(3 - t)$、幅は $dx$。$x = 2t$ なので、$t$ が少し進むと $x$ はその $2$ 倍進む（$\\dfrac{dx}{dt} = 2$）。だから $\\displaystyle\\int_0^6 y\\,dx = \\int_0^3 t(3 - t)\\cdot 2\\,dt = \\int_0^3(-2t^2 + 6t)\\,dt$。$a = -2$。計算すると $\\Big[-\\dfrac23t^3 + 3t^2\\Big]_0^3 = -18 + 27 = 9$ で、前題と同じ。中心の問いへ：**幅を $t$ の目盛りで測り直すと $\\dfrac{dx}{dt}$ が掛かる。$t$ を消さなくても面積が出る**。",
        },
      ],
      formulaPreview: "∫₀⁶ y dx = ∫₀³ t(3 − t)·2 dt = ∫₀³ (−2t² + 6t) dt → a = −2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "曲線 $x = t^2$、$y = t^2(2 - t)$（$0 \\le t \\le 2$）と $x$ 軸で囲まれた部分の面積を求めましょう。",
      answer: 16 / 5,
      answerDisplay: "16/5",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        { layer: 2, text: "前題と変わったのは、$x$ が $t$ の $1$ 次式でなく $2$ 次式になったこと。" },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = 2t$。$t$ が $0 \\to 2$ のとき、$x$ は $0 \\to 4$（増える向き）。$\\displaystyle\\int_0^4 y\\,dx = \\int_0^2 t^2(2 - t)\\cdot 2t\\,dt = \\int_0^2(4t^3 - 2t^4)\\,dt = 16 - \\dfrac{64}{5} = \\dfrac{16}{5}$。$t$ を消すと $y = x(2 - \\sqrt x) = 2x - x\\sqrt x$ で、$\\displaystyle\\int_0^4\\left(2x - x^{\\frac32}\\right)dx = 16 - \\dfrac{64}{5}$ と同じになる。中心の問いへ：**$t$ を消すと根号が出る曲線でも、$t$ のまま足せば多項式の積分で済む**。",
        },
      ],
      formulaPreview: "∫₀² t²(2 − t)·2t dt = 16 − 64/5 = 16/5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "曲線 $x = 4 - t^2$、$y = 5t$（$0 \\le t \\le 2$）と $x$ 軸、$y$ 軸で囲まれた部分の面積を求めましょう。",
      answer: 80 / 3,
      answerDisplay: "80/3",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、$t$ が増えると $x$ が減っていくこと。" },
        {
          layer: 3,
          text: "$t = 0$ で点 $(4,\\ 0)$、$t = 2$ で点 $(0,\\ 10)$。面積は $x$ の小さい方から $\\displaystyle\\int_0^4 y\\,dx$。$x$ が $0$ から $4$ へ進むとき、$t$ は $2$ から $0$ へ戻る。$\\dfrac{dx}{dt} = -2t$ なので $\\displaystyle\\int_0^4 y\\,dx = \\int_2^0 5t\\cdot(-2t)\\,dt = \\int_0^2 10t^2\\,dt = \\dfrac{80}{3}$。$t$ の小さい方から機械的に $\\displaystyle\\int_0^2 5t\\cdot(-2t)\\,dt$ とすると $-\\dfrac{80}{3}$——面積が負になるのは、足す向きを $x$ と逆に取ったしるし。中心の問いへ：**$t$ が進む向きと $x$ が進む向きが逆なら、区間の上と下も入れかわる**。",
        },
      ],
      formulaPreview: "x: 0 → 4 のとき t: 2 → 0 → ∫₂⁰ 5t·(−2t) dt = 80/3",
      figureMarker: "<<M3IA_PARAM_DIRECTION>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "曲線 $x = 2\\cos 2t$、$y = 3\\sin t$（$0 \\le t \\le \\dfrac{\\pi}{2}$）と $x$ 軸、直線 $x = -2$ で囲まれた部分の面積を求めましょう。",
      answer: 8,
      answerDisplay: "8",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、$x$ と $y$ が三角関数で表されていること。" },
        {
          layer: 3,
          text: "$t = 0$ で点 $(2,\\ 0)$、$t = \\dfrac{\\pi}{2}$ で点 $(-2,\\ 3)$。$\\dfrac{dx}{dt} = -4\\sin 2t \\le 0$ なので、$t$ が進むと $x$ は減る。$\\displaystyle\\int_{-2}^{2} y\\,dx = \\int_{\\frac{\\pi}{2}}^{0} 3\\sin t\\cdot(-4\\sin 2t)\\,dt = \\int_0^{\\frac{\\pi}{2}} 12\\sin t\\sin 2t\\,dt = \\int_0^{\\frac{\\pi}{2}} 24\\sin^2 t\\cos t\\,dt = \\Big[8\\sin^3 t\\Big]_0^{\\frac{\\pi}{2}} = 8$。中心の問いへ：**三角関数のパラメータでも、$t$ と $x$ の向きを見て区間を決める手つきは同じ**。",
        },
      ],
      formulaPreview: "x: −2 → 2 のとき t: π/2 → 0 → ∫₀^(π/2) 24 sin² t cos t dt = 8",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$a$ を正の定数とします。曲線 $x = t^2$、$y = t^2(a - t)$（$0 \\le t \\le a$）と $x$ 軸で囲まれた部分の面積が $\\dfrac{243}{10}$ になりました。$a$ を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "step3 と変わったのは、面積が分かっていて、曲線の中の定数 $a$ が分からないこと。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = 2t$ で、$t$ が $0 \\to a$ のとき $x$ は増える向き。$\\displaystyle\\int_0^a t^2(a - t)\\cdot 2t\\,dt = \\Big[\\dfrac{a}{2}t^4 - \\dfrac25t^5\\Big]_0^a = \\dfrac{a^5}{10}$。$\\dfrac{a^5}{10} = \\dfrac{243}{10}$ より $a^5 = 243$、$a = 3$（$5$ 乗して $243$ になる実数は $3$ だけ）。中心の問いへ：**$t$ のまま面積を式にしておけば、面積から曲線の定数も逆に読める**。",
        },
      ],
      formulaPreview: "面積 = a⁵/10 = 243/10 → a⁵ = 243 → a = 3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "半径 $3$ の円が $x$ 軸の上を滑らずに $1$ 回転するとき、円周上の $1$ 点は $x = 3(t - \\sin t)$、$y = 3(1 - \\cos t)$（$0 \\le t \\le 2\\pi$）と動きます。この曲線と $x$ 軸で囲まれた部分の面積を求めましょう。",
      answer: 27 * Math.PI,
      answerDisplay: "27π",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["pi"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題までと比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "step5 と変わったのは、$x$ の式が $t$ と三角関数の差になっていること。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = 3(1 - \\cos t) \\ge 0$ で、$x$ は増える向き（$0 \\to 6\\pi$）。$\\displaystyle\\int_0^{6\\pi} y\\,dx = \\int_0^{2\\pi} 3(1 - \\cos t)\\cdot 3(1 - \\cos t)\\,dt = 9\\int_0^{2\\pi}\\left(1 - 2\\cos t + \\cos^2 t\\right)dt = 9(2\\pi - 0 + \\pi) = 27\\pi$（$\\cos^2 t = \\dfrac{1 + \\cos 2t}{2}$）。$t$ を消して $y = (x \\text{ の式})$ にしようとすると、$x = 3(t - \\sin t)$ を $t$ について解くことになるが、**高校で使う記号では、この式を $t = (x \\text{ の式})$ に書き直せない**。$t$ を消す道は入口が無く、$t$ のまま足す道なら届く。中心の問いへ：**$t$ を消せない曲線でも、幅を $t$ の目盛りで測り直せば面積が出る**。",
        },
      ],
      formulaPreview: "∫₀^(2π) 9(1 − cos t)² dt = 9(2π + π) = 27π（t を消す道は高校の記号では書けない）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "曲線 $x = 1 - t^2$、$y = t - t^3$（$-1 \\le t \\le 1$）は、原点を出て点 $(1,\\ 0)$ を通り、原点にもどる閉じた曲線です。この曲線で囲まれた部分の面積を求めましょう。",
      answer: 8 / 15,
      answerDisplay: "8/15",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "step4 と変わったのは、曲線が閉じていて、$x$ 軸の上と下の両方にあること。",
        },
        {
          layer: 3,
          text: "$t$ を $-t$ にすると、$x$ は同じで $y$ は符号だけ変わる。だから曲線は $x$ 軸について対称で、面積は上半分（$0 \\le t \\le 1$、$y \\ge 0$）の $2$ 倍。上半分では $t$ が $0 \\to 1$ で $x$ は $1 \\to 0$（減る向き）。$\\displaystyle\\int_0^1 y\\,dx = \\int_1^0(t - t^3)(-2t)\\,dt = \\int_0^1(2t^2 - 2t^4)\\,dt = \\dfrac23 - \\dfrac25 = \\dfrac{4}{15}$。$2$ 倍して $\\dfrac{8}{15}$。中心の問いへ：**閉じた曲線でも、上と下に分けて、それぞれ $t$ と $x$ の向きを見れば足せる**。",
        },
      ],
      formulaPreview: "上半分 ∫₁⁰ (t − t³)(−2t) dt = 4/15 → 2 倍して 8/15",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $x = t^2$、$y = 3t - t^3$（$t \\ge 0$）の上で、接線が $x$ 軸に平行になる点を $\\mathrm{P}$ とします。原点から $\\mathrm{P}$ までの曲線と、$x$ 軸、$\\mathrm{P}$ を通り $y$ 軸に平行な直線で囲まれた部分の面積を求めましょう。",
      answer: 8 / 5,
      answerDisplay: "8/5",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step3 と変わったのは、足す区間のはしが、接線の向きの条件で決まること。",
        },
        {
          layer: 3,
          text: "接線が $x$ 軸に平行になるのは $\\dfrac{dy}{dt} = 3 - 3t^2 = 0$（かつ $\\dfrac{dx}{dt} = 2t \\ne 0$）のとき。$t \\ge 0$ では $t = 1$ で、$\\mathrm{P}(1,\\ 2)$。$\\displaystyle\\int_0^1 y\\,dx = \\int_0^1(3t - t^3)\\cdot 2t\\,dt = \\int_0^1(6t^2 - 2t^4)\\,dt = 2 - \\dfrac25 = \\dfrac85$。中心の問いへ：**区間のはしの $t$ を[媒介変数表示]の微分で決めれば、あとは $t$ のまま足すだけ**。",
        },
      ],
      formulaPreview: "dy/dt = 0 → t = 1 → ∫₀¹ (3t − t³)·2t dt = 8/5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $x = \\sin 3t$、$y = \\cos t$（$0 \\le t \\le \\dfrac{\\pi}{6}$）と $x$ 軸、$y$ 軸、直線 $x = 1$ で囲まれた部分の面積を求めましょう。",
      answer: (9 * Math.sqrt(3)) / 16,
      answerDisplay: "9√3/16",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。何が違う？" },
        {
          layer: 2,
          text: "step5 と変わったのは、$x$ の中の角が $3t$、$y$ の中の角が $t$ で、角がそろっていないこと。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = 3\\cos 3t \\ge 0$（$0 \\le t \\le \\dfrac{\\pi}{6}$）なので、$x$ は $0 \\to 1$ と増える向き。$\\displaystyle\\int_0^1 y\\,dx = \\int_0^{\\frac{\\pi}{6}}\\cos t\\cdot 3\\cos 3t\\,dt$。積を和に直す（[和積の公式]）：$\\cos 3t\\cos t = \\dfrac12(\\cos 4t + \\cos 2t)$。$\\dfrac32\\Big[\\dfrac{\\sin 4t}{4} + \\dfrac{\\sin 2t}{2}\\Big]_0^{\\frac{\\pi}{6}} = \\dfrac32\\left(\\dfrac{\\sqrt3}{8} + \\dfrac{\\sqrt3}{4}\\right) = \\dfrac{9\\sqrt3}{16}$。中心の問いへ：**$t$ のまま足すと三角関数の積が残ることがある。第6章の積を和に直す手つきで届く**。",
        },
      ],
      formulaPreview: "∫₀^(π/6) 3 cos t cos 3t dt = (3/2)∫ (cos 4t + cos 2t) dt = 9√3/16",
    },
  ],
  derivation: `**中心の問い** ｜ $y$ が $x$ の式で書けない曲線でも、縦の切り口を足せば面積のはず。**切り口の幅を $x$ でなく $t$ の目盛りで測ると、何が掛かり、何が入れかわる？**

────────

## $t$ を消せれば、これまでどおり

[媒介変数表示]の曲線でも、$t$ を消して $y = (x$ の式$)$ に直せれば、縦に切って $\\displaystyle\\int y\\,dx$ を計算すればよい（step1）。ところが $t$ を消すと根号が出たり（step3）、そもそも消せなかったり（step7）する。

## ここが胚細胞：幅を $t$ の目盛りで測り直す

縦の切り口の長さは $y$、幅は $x$ の小さな増え方 $dx$ である。$t$ が少し進んだとき $x$ がどれだけ進むかは $\\dfrac{dx}{dt}$ なので、幅を $t$ の目盛りで測り直すと

$$\\int_{x_1}^{x_2} y\\,dx = \\int_{t_1}^{t_2} y\\,\\frac{dx}{dt}\\,dt$$

になる。$t$ を消さなくても、$t$ のまま足せる（step2・3）。これは第6章の[置換積分]そのもので、パラメータ曲線では置き換えの式がはじめから与えられている。

**向きに注意する。** 左の積分は $x$ の小さい方から大きい方へ足す。$t$ が増えると $x$ が減る曲線では、$x_1 \\to x_2$ に対応する $t$ は**大きい方から小さい方へ**動く（step4・5）。$t$ の小さい方から機械的に足すと、符号が逆の値になる。

## Step の道筋

- **step1・2**：同じ面積を、$t$ を消す道と $t$ のまま足す道で（交差検算）
- **step3**：$t$ を消すと根号が出る曲線
- **step4（質的変化）・5**：$t$ と $x$ の向きが逆。区間の上と下が入れかわる
- **step6**：面積から曲線の定数を逆に読む
- **step7（山場）**：転がる円の上の点の軌跡。$t$ を消す道は高校で使う記号では入口が無い
- **step8**：閉じた曲線。上と下に分けて、それぞれの向きで足す
- **step9**：区間のはしを、接線が水平になる条件で決める（第5章と合流）
- **step10**：$t$ のまま足すと三角関数の積が残る（第6章の積を和に直す手つきと合流）

────────

**もっと深く**

**忘れても導ける。** 公式 $\\displaystyle\\int y\\frac{dx}{dt}dt$ を覚えなくてよい。「縦の切り口の長さ × 幅」の幅 $dx$ を、$t$ の小さな進みで書き直すだけである。向きに迷ったら、区間の両はしで $x$ がいくつになるかを書き出し、$x$ の小さい方に対応する $t$ を下に置く。

**$t$ を消す道が閉じても、面積は出る。** step7 の曲線は、$x$ を $t$ の式からもとに戻せないので $y = (x$ の式$)$ に直せない。それでも $t$ のまま足す道は開いている。$y$ が $x$ の関数として書けるかどうかと、面積が求まるかどうかは別のことである。

**この先の景色。** 閉じた曲線の囲む面積を、曲線を $1$ 周たどる積分で表す考え方は、大学で「グリーンの定理」として整理される。$t$ の向き（どちら回りにたどるか）で符号が変わるのは、step4・8 で見た「向きと符号」の話と同じである。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「パラメータ曲線と面積」の構成（$t$ のまま積分するために置換積分で変数を $t$ に置き換える・$t$ が増えると $x$ が減るときの区間の上下）を参考。問題の値・曲線はすべてオリジナル。

────────

**問いに戻ると**

切り口の幅を $t$ の目盛りで測り直すと、$\\dfrac{dx}{dt}$ が掛かる。だから $t$ を消さなくても、$\\displaystyle\\int y\\frac{dx}{dt}dt$ で面積が足せる。

そして、$t$ が進む向きと $x$ が進む向きが逆なら、足す区間の上と下も入れかわる。向きをそろえて足せば、$t$ を消せない曲線でも面積に届く。`,
};

/** M3IA3: 回転体の体積——切り口の円を足す（三段）。
 *  段1＝step1・2（正四角錐 32＝中学の 1/3×底面積×高さ・半球 18π＝球の公式の半分）
 *  段2＝step3・4（回した曲線から切り口の面積の式を作る：π(2x+3)² の x の係数 12／π(4−x) から f(2)=√2）
 *  段3＝step5〜10：step5（質）sin 2x を回す π²/4（入力は π*π/4）／step6 e^x を 0〜log 2 で回す 3π/2
 *  山場 step7（C12 ②・R1 A-2 で円環の初出に移した）：y=x と y=x² の間を回す。正答 2π/15、(f−g)² と読むと π/30
 *  step8：回転軸が y=1（半径を作り直す）16π/15／step9（逆）：step6 の曲線で体積 4π → b = log 3（実数解は 1 つ）
 *  step10（複合・C13 第6章 部分積分）：y = x e^{−x/2} を 0〜1 で回す π(2 − 5/e)（半径の 2 乗が x² e^{−x}＝e の 1 次で済む＝R1 B-6）
 *  答え 10 個はすべて相異なる（sympy と数値積分で一致）。原典の族（tan x・x² と √x・e^x の y 軸回転・任意の r の球）は使っていない（半球は具体の半径＝定番の道具）。 */
export const M3IA_VOLUME_SERIES: LearnerSeries = {
  id: "math3_ia_volume_01",
  title: "回転体の体積——切り口の円を足す",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 中学で覚えた錐や球の体積は、切り口の面積を足すと同じ値になる。平面の図形を回してできる立体は、どこで切れば切り口が描けるか。くり抜いた立体で何が起きるか。$10$ 問で確かめる。",
  patternId: "M3IA3",
  unit: "math_3",
  revelationLabel:
    "**回転体は、回転軸に垂直に切れば切り口が円になる**。曲線の高さが半径なので、切り口の面積は $\\pi \\times (\\text{高さ})^2$",
  drivingQuestion:
    "中学で覚えた錐や球の体積の式は、どこから来ていた？——**平面の図形を回してできる立体は、どこで切れば切り口が描けて、何を足せば体積になる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "底面が $1$ 辺 $4$ の正方形で、高さが $6$ の正四角錐があります。頂点から測って $x$ のところで底面に平行に切ると、切り口は正方形になります。この切り口の面積を足し集めて、正四角錐の体積を求めましょう。",
      answer: 32,
      answerDisplay: "32",
      unit: "",
      unknownLabel: "正四角錐の体積",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数Ⅱでは円すいを、切り口の円を足し集めて体積にした。切り口が正方形になっても、同じ見方は通りそう？",
        },
        {
          layer: 2,
          text: "数Ⅱの面積の系列の最後で、円すいの切り口の面積はどう作って、何で足した？（[切り口の長さ]）",
        },
        {
          layer: 3,
          text: "頂点から $x$ のところの切り口は、底面を $\\dfrac{x}{6}$ 倍に縮めた正方形で、$1$ 辺は $\\dfrac{4x}{6} = \\dfrac{2x}{3}$。面積は $\\dfrac{4x^2}{9}$。$\\displaystyle\\int_0^6 \\dfrac{4x^2}{9}\\,dx = \\Big[\\dfrac{4x^3}{27}\\Big]_0^6 = 32$。中学の公式 $\\dfrac13 \\times 16 \\times 6 = 32$ と一致する。中心の問いへの最初の部分回答：**体積は、切り口の面積を足し集めたもの。中学の $\\dfrac13$ は、切り口の面積が $x^2$ に比例することから出てくる**。",
        },
      ],
      formulaPreview: "切り口の面積 4x²/9 → ∫₀⁶ (4x²/9) dx = 32（中学の 1/3 × 16 × 6 と一致）",
      figureMarker: "<<M3IA_PYRAMID_SLICE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "半径 $3$ の半球があります。中心から測って $x$ のところで平らな面に平行に切ると、切り口は円になります。この切り口の面積を足し集めて、半球の体積を求めましょう。",
      answer: 18 * Math.PI,
      answerDisplay: "18π",
      unit: "",
      unknownLabel: "半球の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、切り口が正方形でなく円になったこと。" },
        {
          layer: 3,
          text: "中心から $x$ のところの切り口の円の半径を $r$ とすると、半径 $3$ を斜辺とする直角三角形で $r^2 = 9 - x^2$（[三平方の定理]）。切り口の面積は $\\pi(9 - x^2)$。$\\displaystyle\\int_0^3 \\pi(9 - x^2)\\,dx = \\pi\\Big[9x - \\dfrac{x^3}{3}\\Big]_0^3 = 18\\pi$。中学の球の公式の半分 $\\dfrac12\\times\\dfrac43\\pi\\times 27 = 18\\pi$ と一致する。中心の問いへ：**丸い立体でも、切り口の円の面積を足し集めれば体積になる**。",
        },
      ],
      formulaPreview: "切り口 π(9 − x²) → ∫₀³ π(9 − x²) dx = 18π（球の公式の半分と一致）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "直線 $y = 2x + 3$ の $0 \\le x \\le 1$ の部分と $x$ 軸、$2$ 本の直線 $x = 0$、$x = 1$ で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させます。位置 $x$ で $x$ 軸に垂直に切った切り口の面積は $\\pi(ax^2 + bx + c)$ と書けます。$b$ を求めましょう。",
      answer: 12,
      answerDisplay: "12",
      unit: "",
      unknownLabel: "$b$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、立体が、平面の図形を $x$ 軸のまわりに回してできていること。",
        },
        {
          layer: 3,
          text: "$x$ 軸のまわりに回すと、位置 $x$ の切り口は、$x$ 軸を中心とする円。半径は回した図形の高さ $2x + 3$ なので、面積は $\\pi(2x + 3)^2 = \\pi(4x^2 + 12x + 9)$。$b = 12$。半径を $2$ 乗せずに $\\pi(2x + 3)$ とすると $x^2$ の項が無く、$x$ の係数も $2$ になってしまう。中心の問いへ：**回転体の切り口は円で、回した図形の高さがその半径。切り口の面積は $\\pi\\times(\\text{高さ})^2$**。",
        },
      ],
      formulaPreview: "半径 2x + 3 → 切り口 π(2x + 3)² = π(4x² + 12x + 9) → b = 12",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "曲線 $y = f(x)$（$x$ 軸より上にある）の $0 \\le x \\le 4$ の部分と $x$ 軸で囲まれた部分を $x$ 軸のまわりに $1$ 回転させると、位置 $x$ の切り口の面積は $\\pi(4 - x)$ になりました。$f(2)$ を求めましょう。",
      answer: Math.SQRT2,
      answerDisplay: "√2",
      unit: "",
      unknownLabel: "$f(2)$",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "前題と変わったのは、切り口の面積が分かっていて、回した曲線の高さが分からないこと。",
        },
        {
          layer: 3,
          text: "切り口の面積は $\\pi\\{f(x)\\}^2$ なので、$\\pi\\{f(x)\\}^2 = \\pi(4 - x)$、$\\{f(x)\\}^2 = 4 - x$。$x = 2$ で $\\{f(2)\\}^2 = 2$。曲線は $x$ 軸より上にあるので $f(2) > 0$、$f(2) = \\sqrt2$。中心の問いへ：**切り口の面積から、回した曲線の高さが逆に読める。高さは面積の $\\pi$ を除いた部分の平方根**。",
        },
      ],
      formulaPreview: "π{f(x)}² = π(4 − x) → {f(2)}² = 2 → f(2) = √2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "曲線 $y = \\sin 2x$（$0 \\le x \\le \\dfrac{\\pi}{2}$）と $x$ 軸で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。（答えに $\\pi^2$ が出るときは、$\\pi^2$ を `π*π` と打ちます）",
      answer: (Math.PI * Math.PI) / 4,
      answerDisplay: "π*π/4",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "step3 と変わったのは、回す線が直線でなく三角関数の曲線になったこと。" },
        {
          layer: 3,
          text: "切り口は半径 $\\sin 2x$ の円で、面積は $\\pi\\sin^2 2x$。$2$ 乗の三角関数は次数を下げる（[半角の公式]）：$\\sin^2 2x = \\dfrac{1 - \\cos 4x}{2}$。$\\displaystyle\\int_0^{\\frac{\\pi}{2}}\\pi\\sin^2 2x\\,dx = \\dfrac{\\pi}{2}\\Big[x - \\dfrac{\\sin 4x}{4}\\Big]_0^{\\frac{\\pi}{2}} = \\dfrac{\\pi}{2}\\cdot\\dfrac{\\pi}{2} = \\dfrac{\\pi^2}{4}$（`π*π/4`）。中心の問いへ：**回す曲線が三角関数でも、切り口の円の面積 $\\pi\\times(\\text{高さ})^2$ を足すことは同じ。$2$ 乗が出るぶん、巻き戻しに次数下げが要る**。",
        },
      ],
      formulaPreview: "切り口 π sin² 2x → (π/2)∫₀^(π/2) (1 − cos 4x) dx = π²/4",
      figureMarker: "<<M3IA_SOLID_SLICE>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "曲線 $y = e^x$ と $x$ 軸、$2$ 本の直線 $x = 0$、$x = \\log 2$ で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: (3 * Math.PI) / 2,
      answerDisplay: "3π/2",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、回す曲線が指数関数になったこと。" },
        {
          layer: 3,
          text: "切り口は半径 $e^x$ の円で、面積は $\\pi e^{2x}$。$\\displaystyle\\int_0^{\\log 2}\\pi e^{2x}\\,dx = \\dfrac{\\pi}{2}\\Big[e^{2x}\\Big]_0^{\\log 2} = \\dfrac{\\pi}{2}(4 - 1) = \\dfrac{3\\pi}{2}$。中心の問いへ：**指数関数を回しても、切り口の円の面積を足す手つきは同じ**。",
        },
      ],
      formulaPreview: "切り口 π e^(2x) → ∫₀^(log 2) π e^(2x) dx = (π/2)(4 − 1) = 3π/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "直線 $y = x$ と放物線 $y = x^2$ で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: (2 * Math.PI) / 15,
      answerDisplay: "2π/15",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、回す図形の下のふちが $x$ 軸でなく曲線になり、立体の真ん中が空洞になること。",
        },
        {
          layer: 3,
          text: "交点は $x = x^2$ より $x = 0,\\ 1$。$0 \\le x \\le 1$ では $x \\ge x^2$。位置 $x$ の切り口は、半径 $x$ の円から半径 $x^2$ の円をくり抜いた輪で、面積は $\\pi x^2 - \\pi x^4$。$\\displaystyle\\int_0^1\\pi(x^2 - x^4)\\,dx = \\pi\\left(\\dfrac13 - \\dfrac15\\right) = \\dfrac{2\\pi}{15}$。輪を「幅 $x - x^2$ の円」と読んで $\\pi\\displaystyle\\int_0^1(x - x^2)^2\\,dx$ とすると $\\dfrac{\\pi}{30}$ になり、外れる——外側の円の面積から内側の円の面積を引くのであって、半径の差を $2$ 乗するのではない。中心の問いへ：**くり抜いた立体の切り口は円の輪。面積は「外側の円 − 内側の円」**。",
        },
      ],
      formulaPreview: "切り口 = πx² − πx⁴ → ∫₀¹ π(x² − x⁴) dx = 2π/15（(x − x²)² と読むと π/30）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "放物線 $y = x^2$ と直線 $y = 1$ で囲まれた部分を、直線 $y = 1$ のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: (16 * Math.PI) / 15,
      answerDisplay: "16π/15",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        { layer: 2, text: "前題と変わったのは、回転の軸が $x$ 軸でなく、直線 $y = 1$ になったこと。" },
        {
          layer: 3,
          text: "軸 $y = 1$ に垂直に切ると、位置 $x$ の切り口は軸を中心とする円。半径は、曲線から軸までの距離 $1 - x^2$（$-1 \\le x \\le 1$）。面積は $\\pi(1 - x^2)^2$。$\\displaystyle\\int_{-1}^{1}\\pi(1 - x^2)^2\\,dx = \\pi\\left(2 - \\dfrac43 + \\dfrac25\\right) = \\dfrac{16\\pi}{15}$。中心の問いへ：**半径は「曲線の高さ」ではなく「曲線から回転の軸までの距離」。軸が変われば半径を作り直す**。",
        },
      ],
      formulaPreview: "半径 1 − x² → ∫₋₁¹ π(1 − x²)² dx = 16π/15",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $y = e^x$ と $x$ 軸、$2$ 本の直線 $x = 0$、$x = b$（$b > 0$）で囲まれた部分を $x$ 軸のまわりに $1$ 回転させると、体積が $4\\pi$ になりました。$b$ を求めましょう。",
      answer: Math.log(3),
      answerDisplay: "log3",
      unit: "",
      unknownLabel: "$b$",
      inputAffordances: ["log"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "step6 と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "step6 と変わったのは、体積が分かっていて、右のはし $b$ が分からないこと。",
        },
        {
          layer: 3,
          text: "step6 と同じく、体積は $\\displaystyle\\int_0^b\\pi e^{2x}\\,dx = \\dfrac{\\pi}{2}\\left(e^{2b} - 1\\right)$。これが $4\\pi$ なので $e^{2b} - 1 = 8$、$e^{2b} = 9$、$e^b = 3$、$b = \\log 3$。$e^{2b}$ は $b$ とともに増え続けるので、解は $1$ つだけ。中心の問いへ：**体積を区間の右のはしの式にしておけば、体積から逆にはしも読める**。",
        },
      ],
      formulaPreview: "(π/2)(e^(2b) − 1) = 4π → e^(2b) = 9 → b = log 3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $y = xe^{-\\frac{x}{2}}$（$0 \\le x \\le 1$）と $x$ 軸、直線 $x = 1$ で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: Math.PI * (2 - 5 / Math.E),
      answerDisplay: "π(2-5/e)",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi", "e"],
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "step6 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step6 と変わったのは、半径が $x$ と指数関数の積になっていること。",
        },
        {
          layer: 3,
          text: "切り口の面積は $\\pi\\left(xe^{-\\frac{x}{2}}\\right)^2 = \\pi x^2e^{-x}$。[部分積分] を $2$ 回：$\\displaystyle\\int x^2e^{-x}\\,dx = -x^2e^{-x} + 2\\int xe^{-x}\\,dx = -x^2e^{-x} - 2xe^{-x} - 2e^{-x} + C$。$\\displaystyle\\int_0^1\\pi x^2e^{-x}\\,dx = \\pi\\Big[-(x^2 + 2x + 2)e^{-x}\\Big]_0^1 = \\pi\\left(2 - \\dfrac5e\\right)$。中心の問いへ：**半径の $2$ 乗の巻き戻しに第6章の道具が要っても、切り口の円を足す見方は変わらない**。",
        },
      ],
      formulaPreview: "切り口 π x² e^(−x) → 部分積分 2 回 → π(2 − 5/e)",
    },
  ],
  derivation: `**中心の問い** ｜ 中学で覚えた錐や球の体積の式は、どこから来ていた？——**平面の図形を回してできる立体は、どこで切れば切り口が描けて、何を足せば体積になる？**

────────

## 体積は、切り口の面積を足したもの

数Ⅱでは円すいを、頂点から測った位置で切り、切り口の円の面積を足し集めて体積にした。同じことは、切り口が正方形でも（step1）、半球でも（step2）できる。どちらも中学で覚えた公式と同じ値になる。

$$V = \\int_a^b S(x)\\,dx \\qquad (S(x) \\text{ は位置 } x \\text{ の切り口の面積})$$

## ここが胚細胞：回転体は、回転軸に垂直に切る

平面の図形を軸のまわりに回してできる立体（[回転体]）は、**回転の軸に垂直に切れば、切り口が軸を中心とする円**になる。半径は、回した図形の「軸からの距離」。だから切り口の面積は

$$S(x) = \\pi \\times (\\text{軸からの距離})^2$$

と、曲線の式から書ける（step3・4）。あとは足すだけである。

**くり抜いた立体に注意する。** $2$ 曲線ではさまれた部分を回すと、真ん中が空洞になり、切り口は円の輪になる（step7）。輪の面積は「外側の円 − 内側の円」で、

$$\\pi f(x)^2 - \\pi g(x)^2 \\quad\\text{であって}\\quad \\pi\\{f(x) - g(x)\\}^2 \\text{ ではない}$$

半径の差を $2$ 乗すると、輪の面積よりずっと小さな値になる。

## Step の道筋

- **step1・2**：正四角錐と半球。切り口の面積を足すと、中学の公式と一致する
- **step3・4**：回した図形の高さから切り口の面積の式を作る（step4 は逆に、面積から高さを読む）
- **step5（質的変化）・6**：三角関数・指数関数の曲線を回す
- **step7（山場）**：くり抜いた立体。切り口は円の輪
- **step8**：回転の軸が $x$ 軸でない。半径を「軸までの距離」で作り直す
- **step9**：体積から区間のはしを逆に読む
- **step10**：半径の $2$ 乗の巻き戻しに部分積分が要る（第6章と合流）

────────

**もっと深く**

**忘れても導ける。** 回転体の体積の公式 $\\pi\\displaystyle\\int y^2\\,dx$ を覚える必要はない。回転の軸に垂直に切った切り口を思い浮かべ、それが円（または輪）であること、半径が軸からの距離であることを確かめれば、面積は毎回作れる。軸が $y = c$ になっても、$y$ 軸になっても、同じ作り方で通る。

**中学の公式の $\\dfrac13$ と $\\dfrac43$。** 錐の体積の $\\dfrac13$ は、切り口の面積が頂点からの距離の $2$ 乗に比例することから出る（$\\displaystyle\\int_0^h x^2\\,dx = \\dfrac{h^3}{3}$）。球の $\\dfrac43$ も、切り口の円の面積 $\\pi(r^2 - x^2)$ を足すと出てくる。覚えていた公式の理由が、切って足す見方で見える。

**この先の景色。** 回転体でない立体も、切り口の形が分かれば同じように体積が出る。どの向きに切ると切り口が描けるかを選ぶ話は、次の系列で扱う。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「定積分と体積」の構成（断面積を積分すると体積・回転体は回転軸に垂直に切る・くり抜いた立体の断面）を参考。問題の値・図形はすべてオリジナル。

────────

**問いに戻ると**

中学の錐や球の体積は、切り口の面積を足し集めたものだった。平面の図形を回してできる立体は、回転の軸に垂直に切れば、切り口が軸を中心とする円になる。半径は軸からの距離なので、面積は $\\pi \\times (\\text{距離})^2$。それを足せば体積になる。

くり抜いた立体なら、切り口は輪。外側の円から内側の円を引いて足す。`,
};

export const MATH3_INTEGRAL_APP_SERIES_LIST: LearnerSeries[] = [
  M3IA_AREA_SERIES,
  M3IA_PARAM_SERIES,
  M3IA_VOLUME_SERIES,
];
