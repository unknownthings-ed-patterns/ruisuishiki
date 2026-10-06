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

export const MATH3_INTEGRAL_APP_SERIES_LIST: LearnerSeries[] = [M3IA_AREA_SERIES];
