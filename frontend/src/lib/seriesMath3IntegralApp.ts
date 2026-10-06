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

/** M3IA4: 切る向きを選ぶ——回転体でない立体と、y 軸のまわり。
 *  step1〜3：底面の上に立つ立体（切り口が正方形 π/2・正三角形 81√3/40・高さが変わる長方形 81/4）
 *  step4（質）：同じ立体を 2 つの向きで切る（x で切ると三角形、y で切ると長方形）。y で切った切り口の面積 −k² + 3k の k² の係数 −1
 *  step5：その向きで体積 9/2（L3 で x で切っても 9/2＝交差検算）／step6（逆）：4h − h²/2 = 6 は h = 2, 6 の 2 解 → 「h ≤ 4」で 1 つ（追補17）
 *  step7（質）：y 軸のまわりに回す（x を y の式に書ける y = x²）8π
 *  山場 step8（C12 ①・範囲つき）：y = xe^x は高校で使う記号では x = (y の式) に書き直せない → π∫x² dy を x の目盛りに置換 π(4 − e)（数値の逆解きでも一致）
 *    ＝「置換でしか」とは書かない（円筒で切る道もある＝L3・derivation で 1 行）
 *  step9（複合・C13 系列2）：パラメータ曲線を x 軸のまわりに 32π/15／step10（複合）：円柱とひし形の柱の共通部分 2π − 8/3
 *  答え 10 個はすべて相異なる（sympy と数値積分で一致）。原典の練5（直径・45°）・応1（直交 2 円柱）・応2（cos x の y 軸回転）は使っていない。 */
export const M3IA_SLICE_SERIES: LearnerSeries = {
  id: "math3_ia_slice_01",
  title: "切る向きを選ぶ——回転体でない立体と、y 軸のまわり",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 回転体でない立体は、どの向きに切れば切り口が描けるか。向きを変えても体積は同じか。$y$ 軸のまわりに回すとき、$x$ を $y$ の式に書けなかったらどうするか。$10$ 問で確かめる。",
  patternId: "M3IA4",
  unit: "math_3",
  revelationLabel:
    "**切る向きを変えると切り口の形が変わる。それでも体積は同じ**。切り口が描ける向き・式に書ける向きを選べばよい",
  drivingQuestion:
    "回転体でない立体は、どの向きに切れば切り口が描ける？——**向きを変えて切っても体積が同じなら、何を基準に向きを選ぶ？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$xy$ 平面上で、曲線 $y = \\sin x$（$0 \\le x \\le \\pi$）と $x$ 軸で囲まれた部分を底面とする立体があります。$x$ 軸に垂直な平面でこの立体を切ると、切り口はつねに、底面の上の線分を $1$ 辺とする正方形になります。立体の体積を求めましょう。",
      answer: Math.PI / 2,
      answerDisplay: "π/2",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "回転体では、回転の軸に垂直に切ると切り口が円になった。回していない立体でも、切り口の面積が分かれば同じように足せそう？",
        },
        {
          layer: 2,
          text: "系列3 で、切り口の面積を足し集めると体積になったのはなぜだった？（[回転体]）",
        },
        {
          layer: 3,
          text: "位置 $x$ で切ると、底面の上の線分の長さは $\\sin x$。切り口はその線分を $1$ 辺とする正方形で、面積は $\\sin^2 x$。$\\displaystyle\\int_0^{\\pi}\\sin^2 x\\,dx = \\int_0^{\\pi}\\dfrac{1 - \\cos 2x}{2}\\,dx = \\dfrac{\\pi}{2}$。中心の問いへの最初の部分回答：**回転体でなくても、切り口の形が分かれば、その面積を足して体積が出る**。",
        },
      ],
      formulaPreview: "切り口 sin² x → ∫₀^π sin² x dx = π/2",
      figureMarker: "<<M3IA_BASE_SQUARE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$xy$ 平面上で、放物線 $y = x(3 - x)$ と $x$ 軸で囲まれた部分を底面とする立体があります。$x$ 軸に垂直な平面でこの立体を切ると、切り口はつねに、底面の上の線分を $1$ 辺とする正三角形になります。立体の体積を求めましょう。",
      answer: (81 * Math.sqrt(3)) / 40,
      answerDisplay: "81√3/40",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、切り口が正方形でなく正三角形になったこと。" },
        {
          layer: 3,
          text: "位置 $x$ の線分の長さは $x(3 - x)$。$1$ 辺 $s$ の正三角形の面積は $\\dfrac{\\sqrt3}{4}s^2$ なので、切り口の面積は $\\dfrac{\\sqrt3}{4}x^2(3 - x)^2$。$\\displaystyle\\int_0^3 x^2(3 - x)^2\\,dx = \\int_0^3(9x^2 - 6x^3 + x^4)\\,dx = 81 - \\dfrac{243}{2} + \\dfrac{243}{5} = \\dfrac{81}{10}$。体積は $\\dfrac{\\sqrt3}{4}\\cdot\\dfrac{81}{10} = \\dfrac{81\\sqrt3}{40}$。中心の問いへ：**切り口の形が変わっても、その面積を位置の式で書ければ足せる**。",
        },
      ],
      formulaPreview: "切り口 (√3/4)x²(3 − x)² → (√3/4)·(81/10) = 81√3/40",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$xy$ 平面上で、放物線 $y = 9 - x^2$ の $0 \\le x \\le 3$ の部分と $x$ 軸、$y$ 軸で囲まれた部分を底面とし、底面の上の点 $(x,\\ y)$ では高さが $x$ になる立体があります（真上から見た形が底面で、高さは $x$ だけで決まる）。立体の体積を求めましょう。",
      answer: 81 / 4,
      answerDisplay: "81/4",
      unit: "",
      unknownLabel: "立体の体積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、切り口の高さが、底面の線分の長さでなく、位置 $x$ そのもので決まること。",
        },
        {
          layer: 3,
          text: "位置 $x$ で $x$ 軸に垂直に切ると、切り口は横 $9 - x^2$（底面の線分）、高さ $x$ の長方形。面積は $x(9 - x^2)$。$\\displaystyle\\int_0^3 x(9 - x^2)\\,dx = \\Big[\\dfrac92x^2 - \\dfrac14x^4\\Big]_0^3 = \\dfrac{81}{2} - \\dfrac{81}{4} = \\dfrac{81}{4}$。中心の問いへ：**切り口の形は向きで決まる。この向きなら長方形で、横と高さの $2$ つを位置の式で書けばよい**。",
        },
      ],
      formulaPreview: "切り口 x(9 − x²) → ∫₀³ x(9 − x²) dx = 81/4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$xyz$ 空間で、$0 \\le y \\le x \\le 3$ かつ $0 \\le z \\le y$ を満たす点全体の立体があります。この立体を平面 $y = k$（$0 \\le k \\le 3$）で切ると、切り口の面積は $ak^2 + bk$ と書けます。$a$ を求めましょう。",
      answer: -1,
      answerDisplay: "-1",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、切る向きが $x$ 軸に垂直でなく、$y$ 軸に垂直になったこと。",
        },
        {
          layer: 3,
          text: "平面 $y = k$ の上では、$x$ は $k \\le x \\le 3$、$z$ は $0 \\le z \\le k$ を動く。$x$ と $z$ が互いに関係なく動くので、切り口は横 $3 - k$、高さ $k$ の長方形。面積は $k(3 - k) = -k^2 + 3k$。$a = -1$。同じ立体を平面 $x = k$ で切ると、$0 \\le z \\le y \\le k$ の三角形になる——向きを変えると、切り口の形が変わる。中心の問いへ：**立体の切り口の形は、切る向きで決まる。向きを選べば、描きやすい形にできることがある**。",
        },
      ],
      formulaPreview: "y = k の切り口は 横 (3 − k)・高さ k の長方形 → −k² + 3k → a = −1",
      figureMarker: "<<M3IA_TWO_CUTS>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "前題の立体（$0 \\le y \\le x \\le 3$ かつ $0 \\le z \\le y$）の体積を、平面 $y = k$ で切った切り口の面積を足して求めましょう。",
      answer: 9 / 2,
      answerDisplay: "9/2",
      unit: "",
      unknownLabel: "立体の体積",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は何を求める？" },
        { layer: 2, text: "前題と変わったのは、求めるものが切り口の面積から立体の体積になったこと。" },
        {
          layer: 3,
          text: "$\\displaystyle\\int_0^3(-k^2 + 3k)\\,dk = -9 + \\dfrac{27}{2} = \\dfrac92$。平面 $x = k$ で切ると、切り口は直角をはさむ $2$ 辺が $k$ の直角二等辺三角形で面積 $\\dfrac{k^2}{2}$、$\\displaystyle\\int_0^3\\dfrac{k^2}{2}\\,dk = \\dfrac92$。同じ値。中心の問いへ：**向きを変えて切っても、体積は同じ。だから、切り口が描きやすい向き・式に書きやすい向きを選べばよい**。",
        },
      ],
      formulaPreview: "∫₀³ (−k² + 3k) dk = 9/2（x = k で切って ∫₀³ k²/2 dk = 9/2 とも一致）",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "高さ $h$ の立体があり、底面から高さ $z$（$0 \\le z \\le h$）のところで底面に平行に切ると、切り口の面積は $4 - z$ になります（$h \\le 4$）。体積が $6$ のとき、$h$ を求めましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "$h$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "前題と変わったのは、体積が分かっていて、足す範囲のはし $h$ が分からないこと。",
        },
        {
          layer: 3,
          text: "体積は $\\displaystyle\\int_0^h(4 - z)\\,dz = 4h - \\dfrac{h^2}{2}$。$4h - \\dfrac{h^2}{2} = 6$ より $h^2 - 8h + 12 = 0$、$(h - 2)(h - 6) = 0$。$h = 6$ では $z = 5$ あたりで切り口の面積が負になってしまうので、条件 $h \\le 4$ に合うのは $h = 2$。中心の問いへ：**切り口の面積の式から体積を作れば、体積からはしの高さも逆に読める。式が意味をもつ範囲で答えを選ぶ**。",
        },
      ],
      formulaPreview: "4h − h²/2 = 6 → h = 2, 6 → h ≤ 4 より h = 2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "放物線 $y = x^2$（$x \\ge 0$）と $y$ 軸、直線 $y = 4$ で囲まれた部分を、$y$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: 8 * Math.PI,
      answerDisplay: "8π",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題までと比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、立体が、平面の図形を $y$ 軸のまわりに回してできていること。",
        },
        {
          layer: 3,
          text: "$y$ 軸のまわりに回すので、$y$ 軸に垂直に（横に）切る。高さ $y$ の切り口は $y$ 軸を中心とする円で、半径は $y$ 軸からの距離 $x$。$y = x^2$（$x \\ge 0$）なら $x = \\sqrt y$ なので、面積は $\\pi(\\sqrt y)^2 = \\pi y$。$\\displaystyle\\int_0^4\\pi y\\,dy = 8\\pi$。$x$ 軸の回転と同じつもりで $\\pi\\displaystyle\\int y^2\\,dx$ とすると、別の立体の体積になる。中心の問いへ：**$y$ 軸のまわりなら $y$ 軸に垂直に切り、半径を $y$ の式で書いて $y$ で足す**。",
        },
      ],
      formulaPreview: "半径 x = √y → ∫₀⁴ π y dy = 8π",
      figureMarker: "<<M3IA_YAXIS_SLICE>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "曲線 $y = xe^x$（$0 \\le x \\le 1$）と $y$ 軸、直線 $y = e$ で囲まれた部分を、$y$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: Math.PI * (4 - Math.E),
      answerDisplay: "π(4-e)",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi", "e"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        {
          layer: 2,
          text: "前題と変わったのは、曲線が $x$ と指数関数の積で表されていること。",
        },
        {
          layer: 3,
          text: "前題と同じく、体積は $\\displaystyle\\pi\\int_0^e x^2\\,dy$。ところが $y = xe^x$ は、**高校で使う記号では $x = (y \\text{ の式})$ に書き直せない**——半径を $y$ の式で書く入口が無い。そこで足す目盛りを $x$ に取り替える（[置換積分]）：$y = xe^x$ より $dy = (1 + x)e^x\\,dx$、$y$ が $0 \\to e$ のとき $x$ は $0 \\to 1$。$\\displaystyle\\pi\\int_0^1 x^2(1 + x)e^x\\,dx = \\pi\\int_0^1(x^3 + x^2)e^x\\,dx$。部分積分をくり返すと $\\pi\\Big[(x^3 - 2x^2 + 4x - 4)e^x\\Big]_0^1 = \\pi(-e + 4) = \\pi(4 - e)$。中心の問いへ：**半径を足す向きの式に書けないときは、足す目盛りを書ける変数に取り替える。系列2 のパラメータと同じ手つき**。",
        },
      ],
      formulaPreview: "π∫₀^e x² dy → dy = (1 + x)eˣ dx → π∫₀¹ (x³ + x²)eˣ dx = π(4 − e)",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $x = t^2$、$y = 2t - t^2$（$0 \\le t \\le 2$）と $x$ 軸で囲まれた部分を、$x$ 軸のまわりに $1$ 回転させてできる立体の体積を求めましょう。",
      answer: (32 * Math.PI) / 15,
      answerDisplay: "32π/15",
      unit: "",
      unknownLabel: "立体の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "前題と変わったのは、曲線が $t$ で表されたパラメータ曲線で、回す軸が $x$ 軸であること。",
        },
        {
          layer: 3,
          text: "切り口は半径 $y$ の円で、体積は $\\displaystyle\\pi\\int_0^4 y^2\\,dx$。幅を $t$ の目盛りで測り直す：$\\dfrac{dx}{dt} = 2t$、$t$ が $0 \\to 2$ で $x$ は $0 \\to 4$。$\\displaystyle\\pi\\int_0^2(2t - t^2)^2\\cdot 2t\\,dt = 2\\pi\\int_0^2(4t^3 - 4t^4 + t^5)\\,dt = 2\\pi\\left(16 - \\dfrac{128}{5} + \\dfrac{32}{3}\\right) = \\dfrac{32\\pi}{15}$。中心の問いへ：**体積でも、足す目盛りを $t$ に取り替えれば、$t$ を消さずに足せる**。",
        },
      ],
      formulaPreview: "π∫₀² (2t − t²)²·2t dt = 32π/15",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$xyz$ 空間で、$y$ 軸を中心とする半径 $1$ の円柱の内部（$x^2 + z^2 \\le 1$）と、$|x| + |y| \\le 1$ を満たす柱の内部の共通部分を考えます。この共通部分の体積を求めましょう。",
      answer: 2 * Math.PI - 8 / 3,
      answerDisplay: "2π-8/3",
      unit: "",
      unknownLabel: "共通部分の体積",
      inputAffordances: ["pi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step4 と変わったのは、立体が $2$ つの立体の共通部分になっていること。",
        },
        {
          layer: 3,
          text: "平面 $z = k$（$-1 \\le k \\le 1$）で切る。円柱の切り口は $|x| \\le \\sqrt{1 - k^2}$ の帯、柱の切り口は $|x| + |y| \\le 1$ のひし形。共通部分の切り口は、ひし形のうち帯に入る部分で、$a = \\sqrt{1 - k^2}$ とおくと面積は $\\displaystyle\\int_{-a}^{a}2(1 - |x|)\\,dx = 4a - 2a^2$。$\\displaystyle\\int_{-1}^{1}\\left(4\\sqrt{1 - k^2} - 2(1 - k^2)\\right)dk = 4\\cdot\\dfrac{\\pi}{2} - \\dfrac83 = 2\\pi - \\dfrac83$（$\\displaystyle\\int_{-1}^{1}\\sqrt{1 - k^2}\\,dk$ は半径 $1$ の半円の面積）。中心の問いへ：**共通部分の切り口は、切り口どうしの共通部分。全体の形が描けなくても、切り口が描ける向きを選べば体積が出る**。",
        },
      ],
      formulaPreview: "z = k の切り口 4√(1 − k²) − 2(1 − k²) → ∫₋₁¹ … dk = 2π − 8/3",
    },
  ],
  derivation: `**中心の問い** ｜ 回転体でない立体は、どの向きに切れば切り口が描ける？——**向きを変えて切っても体積が同じなら、何を基準に向きを選ぶ？**

────────

## 切り口が描ければ、どんな立体でも足せる

体積は、切り口の面積を足したものだった。立体が回転体でなくても、切り口の形（正方形・正三角形・長方形）と、その大きさが位置でどう変わるかが分かれば、面積を位置の式にして足せる（step1〜3）。

## ここが胚細胞：切る向きは選べる

同じ立体でも、切る向きを変えると切り口の形が変わる。step4・5 の立体は、$x$ 軸に垂直に切ると三角形、$y$ 軸に垂直に切ると長方形になった。**どちらで足しても体積は同じ**だから、切り口が描きやすい向き・面積を式に書きやすい向きを選べばよい。

**$y$ 軸のまわりに回した立体**は、$y$ 軸に垂直に切れば切り口が円になる（step7）。半径は $y$ 軸からの距離 $x$ なので、$x$ を $y$ の式に書いて $y$ で足す。

**書けないときは、目盛りを取り替える。** step8 の曲線 $y = xe^x$ は、高校で使う記号では $x = (y$ の式$)$ に書き直せない。それでも $\\displaystyle\\pi\\int x^2\\,dy$ の幅 $dy$ を $x$ の目盛りで測り直せば（[置換積分]）、$x$ のまま足せる。系列2 で $t$ の目盛りに取り替えたのと同じ手つきである。

## Step の道筋

- **step1〜3**：底面の上に立つ立体。切り口は正方形・正三角形・長方形
- **step4（質的変化）・5**：同じ立体を $2$ つの向きで切る。形は変わり、体積は同じ
- **step6**：体積から足す範囲のはしを読む（$2$ つの解のうち、式が意味をもつほう）
- **step7（質的変化）**：$y$ 軸のまわりに回す
- **step8（山場）**：$x$ を $y$ の式に書けない曲線を $y$ 軸のまわりに回す。足す目盛りを $x$ に取り替える
- **step9**：パラメータ曲線を回す（系列2 と合流）
- **step10**：$2$ つの立体の共通部分。切り口の共通部分を足す

────────

**もっと深く**

**忘れても導ける。** 体積の公式を立体ごとに覚える必要はない。どの向きに切ると切り口が描けるかを探し、その面積を位置の式に書いて足す。それだけである。

**ほかの切り方もある。** step8 の立体は、$y$ 軸を中心とする薄い円筒（中が空洞の筒）に切って足す道もある（筒の側面積 $2\\pi x\\cdot y$ を $x$ で足す）。高校では扱わないことも多いが、同じ立体なので同じ体積になる。**切り方は $1$ つではない**——どの向き・どの形で切るかを選べることが、この系列の中身である。

**この先の景色。** 医療の CT スキャンは、体をいろいろな向きの断面で撮影し、断面の情報から立体を組み立てる。大学の重積分では、足す順序（どの向きに先に切るか）を替えて計算を楽にすることを学ぶ。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「定積分と体積」の構成（回転体でない立体は断面が簡単になる軸を選ぶ・別の軸で切っても体積は同じ・共通部分の断面・$y$ 軸のまわりの回転を置換で $x$ の積分にする）を参考。問題の値・立体はすべてオリジナル。

────────

**問いに戻ると**

回転体でない立体でも、切り口の形が分かれば、その面積を足して体積が出る。切る向きを変えると切り口の形は変わるが、体積は同じ。だから、切り口が描きやすく、面積を位置の式に書きやすい向きを選べばよい。

その向きの式に書けないときは、足す目盛りを書ける変数に取り替える。`,
};

/** M3IA5: 速さを足す——変位と道のり。原典の節（p.284〜285）に練習問題は無い＝10 step すべて自前。
 *  step1：速度が 1 次式で向きが変わらない（道のり 10＝v-t グラフの台形）／step2：2 次式（15）
 *  step3（質・C13）：途中で向きが変わる。道のり 4・変位 4/3。数Ⅱ・B area_app の derivation の預け（速さの積分と変位・往復）の返済＝C12 にしない（R1 A-3）
 *  step4：三角関数の速度で向きが変わる 6/π／step5：はじめの位置から指定時刻の位置 7
 *  step6（逆）：道のり 13 になる時刻 5（向きが変わる前の枝は解なし・後の枝は −1, 5 → 5）／step7（逆）：初めて出発点に戻る時刻 6（x = t(t − 6)²）
 *  step8：減速 6e^{−2t} を 0〜log 2 で 9/4／step9（複合・C13 第5章 加速度）：a = 6t − 6、v(0) = 0 から 0〜4 の道のり 24
 *  山場 step10（C12 ②・R1 A-3 で移した）：原点を通る直線の上を行き来する点（x = 3s, y = 4s, s = t² − 2t）。道のり 25。
 *    成分ごとの道のりを足すと 35、変位の大きさは 15＝3 つとも別の値（sympy）。
 *  答え 10 個はすべて相異なる。 */
export const M3IA_DISTANCE_SERIES: LearnerSeries = {
  id: "math3_ia_distance_01",
  title: "速さを足す——変位と道のり",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 小学校では「速さ × 時間 ＝ 道のり」だった。速さが刻々変わるなら何を足すか。行って戻る動きで、足すと消えてしまうものは何か。平面の上の動きではどうなるか。$10$ 問で確かめる。",
  patternId: "M3IA5",
  unit: "math_3",
  revelationLabel:
    "**速度を足すと位置の変化（変位）、速さを足すと道のり**。向きが変わる時刻で区間を割れば、道のりも足せる",
  drivingQuestion:
    "小学校では「速さ × 時間 ＝ 道のり」だった。速さが刻々変わるなら、**何を足せば道のりになる？——行って戻る動きで、足すと消えてしまうものは何？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = 3t + 2$ です。$t = 0$ から $t = 2$ までに P が動いた道のりを求めましょう。",
      answer: 10,
      answerDisplay: "10",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "小学校では、速さがずっと同じなら「速さ × 時間」で道のりが出た。速さが時刻とともに変わるとき、ごく短い時間ごとに同じ考えを使えそう？",
        },
        {
          layer: 2,
          text: "第5章で、動く点の速度は、位置をどうしたものだった？（[速度ベクトル]）",
        },
        {
          layer: 3,
          text: "速度は位置を時刻で微分したもの。ごく短い時間 $dt$ のあいだは速さがほぼ一定とみて、「速さ × 時間」の小さな道のりを足し集める。$0 \\le t \\le 2$ で $v(t) = 3t + 2 > 0$（いつも正の向き）なので、$\\displaystyle\\int_0^2(3t + 2)\\,dt = \\Big[\\dfrac32t^2 + 2t\\Big]_0^2 = 6 + 4 = 10$。横軸に $t$、縦軸に $v$ をとると、これは台形の面積 $\\dfrac{(2 + 8)\\times 2}{2} = 10$ と一致する。中心の問いへの最初の部分回答：**速さが変わるときは、「速さ × 短い時間」を足し集める。それが速さの定積分**。",
        },
      ],
      formulaPreview: "∫₀² (3t + 2) dt = 10（v-t グラフの台形の面積と一致）",
      figureMarker: "<<M3IA_VT_AREA>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = t^2 + 2$ です。$t = 0$ から $t = 3$ までに P が動いた道のりを求めましょう。",
      answer: 15,
      answerDisplay: "15",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、速度が時刻の $2$ 次式になったこと。" },
        {
          layer: 3,
          text: "$v(t) = t^2 + 2 > 0$ なので向きは変わらない。$\\displaystyle\\int_0^3(t^2 + 2)\\,dt = \\Big[\\dfrac13t^3 + 2t\\Big]_0^3 = 9 + 6 = 15$。中心の問いへ：**向きが変わらないあいだは、速度をそのまま足せば道のり**。",
        },
      ],
      formulaPreview: "∫₀³ (t² + 2) dt = 15",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = (t - 1)(t - 3)$ です。$t = 0$ から $t = 4$ までに P が動いた道のりを求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、速度が途中で負になる時間があること。" },
        {
          layer: 3,
          text: "$v(t) = (t - 1)(t - 3)$ は $1 < t < 3$ で負（P は負の向きに戻る）。$v$ をそのまま足すと $\\displaystyle\\int_0^4 v\\,dt = \\dfrac43$——これは位置の変化（[道のり] と区別して変位という）で、戻った分が打ち消し合っている。道のりは速さ $|v|$ を足す：$\\displaystyle\\int_0^1 v\\,dt = \\dfrac43$、$\\displaystyle\\int_1^3 v\\,dt = -\\dfrac43$、$\\displaystyle\\int_3^4 v\\,dt = \\dfrac43$ なので、道のりは $\\dfrac43 + \\dfrac43 + \\dfrac43 = 4$。数Ⅱで、$x$ 軸の上下をまたぐ図形の面積を区間に割って出したのと同じ手つき。中心の問いへ：**速度を足すと変位、速さを足すと道のり。向きが変わる時刻で区間を割る**。",
        },
      ],
      formulaPreview: "変位 ∫₀⁴ v dt = 4/3、道のり 4/3 + 4/3 + 4/3 = 4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = \\sin\\dfrac{\\pi t}{2}$ です。$t = 0$ から $t = 3$ までに P が動いた道のりを求めましょう。",
      answer: 6 / Math.PI,
      answerDisplay: "6/π",
      unit: "",
      unknownLabel: "道のり",
      inputAffordances: ["pi"],
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、速度が三角関数になったこと。" },
        {
          layer: 3,
          text: "$v(t) = \\sin\\dfrac{\\pi t}{2}$ は $0 < t < 2$ で正、$2 < t < 3$ で負。$\\displaystyle\\int\\sin\\dfrac{\\pi t}{2}\\,dt = -\\dfrac{2}{\\pi}\\cos\\dfrac{\\pi t}{2} + C$。$\\displaystyle\\int_0^2 v\\,dt = \\dfrac{2}{\\pi}(1 + 1) = \\dfrac{4}{\\pi}$、$\\displaystyle\\int_2^3 v\\,dt = -\\dfrac{2}{\\pi}(0 + 1) = -\\dfrac{2}{\\pi}$。道のりは $\\dfrac{4}{\\pi} + \\dfrac{2}{\\pi} = \\dfrac{6}{\\pi}$。中心の問いへ：**三角関数の速度でも、向きが変わる時刻を探して区間を割る**。",
        },
      ],
      formulaPreview: "4/π + |−2/π| = 6/π",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = 8 - 2t$ で、時刻 $0$ の位置は $-5$ です。時刻 $6$ の P の位置を求めましょう。",
      answer: 7,
      answerDisplay: "7",
      unit: "",
      unknownLabel: "時刻 $6$ の位置",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "step3 と変わったのは、はじめの位置が与えられていて、求めるのが道のりでなく位置であること。",
        },
        {
          layer: 3,
          text: "位置の変化（変位）は速度をそのまま足したもの。$\\displaystyle\\int_0^6(8 - 2t)\\,dt = 48 - 36 = 12$。時刻 $6$ の位置は $-5 + 12 = 7$。途中 $t = 4$ で向きが変わるが、位置を求めるときは打ち消し合ったままでよい。中心の問いへ：**位置を知りたいときは速度を足す（向きをそのまま）。道のりを知りたいときは速さを足す**。",
        },
      ],
      formulaPreview: "−5 + ∫₀⁶ (8 − 2t) dt = −5 + 12 = 7",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = 4 - 2t$ です。$t = 0$ から動き出して、動いた道のりがちょうど $13$ になるのは時刻いくつのときですか。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "時刻",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "step3 と変わったのは、道のりが分かっていて、時刻が分からないこと。",
        },
        {
          layer: 3,
          text: "$v = 0$ になるのは $t = 2$。$0 \\le t \\le 2$ の道のりは $\\displaystyle\\int_0^2(4 - 2t)\\,dt = 4$ で、$13$ に届かない。$t = 2$ からは負の向きに動き、時刻 $T$（$T > 2$）までの道のりは $4 + \\displaystyle\\int_2^T(2t - 4)\\,dt = 4 + (T - 2)^2$。$4 + (T - 2)^2 = 13$ より $T - 2 = \\pm3$、$T > 2$ なので $T = 5$。中心の問いへ：**道のりを時刻の式にするときも、向きが変わる時刻で式を分ける**。",
        },
      ],
      formulaPreview: "0〜2 で道のり 4、その後 4 + (T − 2)² = 13 → T = 5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = 3t^2 - 24t + 36$ です。時刻 $0$ に出発した P が、$t > 0$ ではじめて出発点に戻るのは時刻いくつのときですか。",
      answer: 6,
      answerDisplay: "6",
      unit: "",
      unknownLabel: "はじめて出発点に戻る時刻",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "step5 と変わったのは、位置の変化が $0$ と分かっていて、時刻が分からないこと。",
        },
        {
          layer: 3,
          text: "出発点からの位置の変化は $\\displaystyle\\int_0^T(3t^2 - 24t + 36)\\,dt = T^3 - 12T^2 + 36T = T(T - 6)^2$。これが $0$ になる $T > 0$ は $T = 6$ だけ。途中 $t = 2$ で向きを変えて戻り始め、$t = 6$ でちょうど出発点に着いて、また向きを変える。中心の問いへ：**「出発点に戻る」は、道のりでなく変位が $0$ になること**。",
        },
      ],
      formulaPreview: "変位 T³ − 12T² + 36T = T(T − 6)² = 0 → T = 6",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での速度が $v(t) = 6e^{-2t}$ です。$t = 0$ から $t = \\log 2$ までに P が動いた道のりを求めましょう。",
      answer: 9 / 4,
      answerDisplay: "9/4",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "step2 と比べてみよう。何が加わった？" },
        { layer: 2, text: "step2 と変わったのは、速度が指数関数で、だんだん遅くなること。" },
        {
          layer: 3,
          text: "$v(t) = 6e^{-2t} > 0$ なので向きは変わらない。$\\displaystyle\\int_0^{\\log 2}6e^{-2t}\\,dt = \\Big[-3e^{-2t}\\Big]_0^{\\log 2} = -\\dfrac34 + 3 = \\dfrac94$（$e^{-2\\log 2} = \\dfrac14$）。中心の問いへ：**だんだん遅くなる動きでも、速さを足せば道のり。時刻のはしが $\\log$ の値なら、$e$ は消える**。",
        },
      ],
      formulaPreview: "∫₀^(log 2) 6e^(−2t) dt = 3 − 3/4 = 9/4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "数直線の上を動く点 P の、時刻 $t$ での加速度が $6t - 6$ で、時刻 $0$ の速度は $0$ です。$t = 0$ から $t = 4$ までに P が動いた道のりを求めましょう。",
      answer: 24,
      answerDisplay: "24",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step3 と変わったのは、速度が与えられておらず、加速度と、はじめの速度が与えられていること。",
        },
        {
          layer: 3,
          text: "加速度は速度の変化率なので、速度は加速度を足して作る：$v(t) = 0 + \\displaystyle\\int_0^t(6s - 6)\\,ds = 3t^2 - 6t = 3t(t - 2)$。$0 < t < 2$ で負、$2 < t < 4$ で正。$\\displaystyle\\int_0^2 v\\,dt = 8 - 12 = -4$、$\\displaystyle\\int_2^4 v\\,dt = (64 - 48) - (8 - 12) = 20$。道のりは $4 + 20 = 24$。中心の問いへ：**加速度から速度を足して作り、速度から（向きに気をつけて）道のりを足して作る。足す操作を $2$ 段重ねる**。",
        },
      ],
      formulaPreview: "v(t) = 3t² − 6t → |−4| + 20 = 24",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "座標平面の上を動く点 Q の、時刻 $t$ での位置が $(3s,\\ 4s)$、ただし $s = t^2 - 2t$ です。Q は原点を通る $1$ 本の直線の上を行き来します。$t = 0$ から $t = 3$ までに Q が動いた道のりを求めましょう。",
      answer: 25,
      answerDisplay: "25",
      unit: "",
      unknownLabel: "道のり",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step3 と変わったのは、点が数直線でなく平面の上を動き、位置が $2$ つの座標で表されていること。",
        },
        {
          layer: 3,
          text: "速度は $\\left(3\\dfrac{ds}{dt},\\ 4\\dfrac{ds}{dt}\\right)$、[速度ベクトル] の大きさ（速さ）は $\\sqrt{9 + 16}\\left|\\dfrac{ds}{dt}\\right| = 5|2t - 2|$。向きは $t = 1$ で変わる。$\\displaystyle\\int_0^3 5|2t - 2|\\,dt = 5(1 + 4) = 25$。$x$ 座標だけの道のり（$15$）と $y$ 座標だけの道のり（$20$）を足すと $35$ になって外れる——速さは速度の成分の和ではなく、速度ベクトルの大きさ。中心の問いへ：**平面の上の道のりは、速度ベクトルの大きさ（速さ）を足す。成分ごとの道のりの和は、一般には道のりより大きい（一致するのは、座標軸に平行に動くときなど）**。",
        },
      ],
      formulaPreview: "速さ 5|2t − 2| → ∫₀³ 5|2t − 2| dt = 25（成分ごとに足すと 15 + 20 = 35）",
    },
  ],
  derivation: `**中心の問い** ｜ 小学校では「速さ × 時間 ＝ 道のり」だった。速さが刻々変わるなら、**何を足せば道のりになる？——行って戻る動きで、足すと消えてしまうものは何？**

────────

## 速さが変わるときは、短い時間ごとに足す

速さが一定なら「速さ × 時間」で道のりが出た。速さが刻々変わるときは、ごく短い時間 $dt$ のあいだは速さがほぼ一定とみて、「速さ × $dt$」を足し集める——それが定積分である（step1・2）。横軸に時刻、縦軸に速さをとると、道のりはグラフの下の面積になる。

## ここが胚細胞：速度を足すか、速さを足すか

数直線の上の速度 $v(t)$ には向き（符号）がある。

$$\\int_{t_1}^{t_2} v(t)\\,dt = (\\text{位置の変化}) \\qquad \\int_{t_1}^{t_2} |v(t)|\\,dt = (\\text{[道のり]})$$

行って戻る動きでは、速度を足すと戻った分が打ち消し合い、**位置の変化（変位）**になる。動いた長さの合計（道のり）がほしいときは、向きを捨てた**速さ** $|v(t)|$ を足す。そのためには、向きが変わる時刻で区間を割る（step3・4・6・9）。数Ⅱで、$x$ 軸の上下をまたぐ図形の面積を区間に割って出したのと同じ手つきである。

**平面の上では**、速さは[速度ベクトル]の大きさ $\\sqrt{(x')^2 + (y')^2}$ になる。成分ごとの道のりを足したものは、一般には道のりより大きくなる（step10。一致するのは、座標軸に平行に動くときなど）。

## Step の道筋

- **step1・2**：向きが変わらない動き。速度を足せば道のり
- **step3（質的変化）・4**：向きが変わる動き。変位と道のりが違う
- **step5**：はじめの位置から、指定時刻の位置（速度を足す）
- **step6・7**：道のりから時刻を、変位 $0$ から戻る時刻を、逆に読む
- **step8**：だんだん遅くなる動き
- **step9**：加速度から速度を作り、速度から道のりを作る（第5章と合流）
- **step10（山場）**：平面の上を行き来する点。速さは速度ベクトルの大きさ

────────

**もっと深く**

**忘れても導ける。** 位置を微分すると速度、速度を微分すると加速度だった。逆向きに足し戻せば、加速度から速度、速度から位置の変化が出る。道のりだけは、向きを捨てて足すので $|v|$ になる——「位置の変化か、動いた長さか」を問われているものから決めればよい。

**数Ⅱからの預け。** 数Ⅱの面積の系列は、「上下が入れかわるときの面積」の最後で、速さを時間で足すと変位、速さの絶対値を足すと道のり、という話をこの章に預けていた。step3 はその返済である。

**この先の景色。** 平面や空間の曲線の上を動く点の道のりは、曲線の長さそのものになる。次の系列では、速さを足すことで曲線の長さを測る。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「速さと道のり」の構成（速度の定積分は変位・速さの定積分は道のり）を参考。原典のこの節に練習問題は無く、問題はすべてオリジナル。

────────

**問いに戻ると**

速さが変わるときは、「速さ × 短い時間」を足し集める。それが速さの定積分で、道のりになる。

行って戻る動きで、速度（向きつき）を足すと、戻った分が打ち消し合って位置の変化（変位）になる。道のりがほしければ、向きを捨てた速さを足す。平面の上なら、速さは速度ベクトルの大きさである。`,
};

/** M3IA6: 曲線の長さ——小さな斜辺を足す（三段）。原典（速さの積分から導く）と逆に、三平方で 1 片を作ってから速さへ。
 *  段1＝step1・2（線分 2√5＝2 点間の距離／円弧 2π＝弧度法の rθ）
 *  段2＝step3・4（2 点の距離 ÷ h の行き先＝速さ 4√3／√(1 + (y′)²) の指定点の値 √5）
 *  段3＝step5（質）(2/3)x^{3/2} 14/3・step6 x²/8 − log x 15/8 + 2log2
 *  山場 step7（C12 ②）：半径 3 の転がる円の軌跡、t は π〜5π/2（符号の変わり目 2π をまたぎ、長さは 2π でない＝R1 B-8）。
 *    正答 24 − 6√2、√(sin²) を符号を見ずに外すと 6√2
 *  step8（逆）：(2/3)((1 + b)^{3/2} − 1) = 52/3 → b = 8／step9：対数らせん型（速さ √2 eᵗ）2√2
 *  step10（複合・C13 第3章 合成・第6章 2 倍角）：x = 2cos³t, y = 2sin³t, t は 0〜2π/3（π/2 で絶対値の中の符号が変わる）15/4
 *  族（R1 A-5）：5 族＝x^{3/2}・2 次と対数・サイクロイド・対数らせん・三角の 3 乗。カテナリー（原典 練7）は使っていない。原典 練6（半径 1・0〜2π）・第5章（半径 2）と半径・区間を替えた。
 *  答え 10 個はすべて相異なる（sympy と数値積分で一致）。 */
export const M3IA_ARC_SERIES: LearnerSeries = {
  id: "math3_ia_arc_01",
  title: "曲線の長さ——小さな斜辺を足す",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 曲がった線には定規が当てられない。小さく区切った 1 片をまっすぐな斜辺とみれば、何を足せば長さになるか。線分・円弧の長さとの一致から始めて、根号が外れる曲線まで $10$ 問。",
  patternId: "M3IA6",
  unit: "math_3",
  revelationLabel:
    "**1 片の長さは $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$——三平方の定理**。$t$ で測れば速さ、$x$ で測れば $\\sqrt{1 + (y')^2}$ を足すことになる",
  drivingQuestion:
    "曲がった線の長さには定規が当てられない。**小さく区切った 1 片をまっすぐな斜辺とみなせば、何を足せば長さになる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "直線 $y = 2x + 1$ の $0 \\le x \\le 2$ の部分を小さく区切り、$1$ 片の長さを $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$ として足し集めます。この部分の長さを求めましょう。",
      answer: 2 * Math.sqrt(5),
      answerDisplay: "2√5",
      unit: "",
      unknownLabel: "長さ",
      inputAffordances: ["sqrt"],
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "まっすぐな線なら、両はしの $2$ 点の距離で長さが出せる。小さく区切った $1$ 片の長さを足しても、同じ値になりそう？",
        },
        {
          layer: 2,
          text: "中学で、座標平面の $2$ 点の間のまっすぐな距離はどうやって出した？（[三平方の定理]）",
        },
        {
          layer: 3,
          text: "$x$ が $\\Delta x$ 進むと $y$ は $2\\Delta x$ 進むので、$1$ 片の長さは $\\sqrt{(\\Delta x)^2 + (2\\Delta x)^2} = \\sqrt5\\,\\Delta x$。足し集めると $\\displaystyle\\int_0^2\\sqrt5\\,dx = 2\\sqrt5$。両はし $(0,\\ 1)$ と $(2,\\ 5)$ の距離 $\\sqrt{2^2 + 4^2} = \\sqrt{20} = 2\\sqrt5$ と一致する。中心の問いへの最初の部分回答：**1 片の長さは三平方の定理で作れる。まっすぐな線なら、足し集めた長さは $2$ 点の距離と同じ**。",
        },
      ],
      formulaPreview: "1 片 √5 Δx → ∫₀² √5 dx = 2√5（2 点の距離と一致）",
      figureMarker: "<<M3IA_ARC_PIECE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$x = 3\\cos t$、$y = 3\\sin t$（$0 \\le t \\le \\dfrac{2\\pi}{3}$）で表される円弧を小さく区切り、$1$ 片の長さを $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$ として足し集めます。この円弧の長さを求めましょう。",
      answer: 2 * Math.PI,
      answerDisplay: "2π",
      unit: "",
      unknownLabel: "円弧の長さ",
      inputAffordances: ["pi"],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、線がまっすぐでなく、$t$ で表された円弧になったこと。" },
        {
          layer: 3,
          text: "$t$ が $\\Delta t$ 進むと、$\\Delta x \\approx -3\\sin t\\,\\Delta t$、$\\Delta y \\approx 3\\cos t\\,\\Delta t$。$1$ 片の長さは $\\sqrt{9\\sin^2 t + 9\\cos^2 t}\\,\\Delta t = 3\\,\\Delta t$。足し集めると $\\displaystyle\\int_0^{\\frac{2\\pi}{3}}3\\,dt = 2\\pi$。半径 $3$・中心角 $\\dfrac{2\\pi}{3}$ の扇形の弧の長さ $3\\times\\dfrac{2\\pi}{3}$（[弧度法]）と一致する。中心の問いへ：**曲がった線でも、1 片の斜辺を足し集めれば、知っている長さと同じ値になる**。",
        },
      ],
      formulaPreview: "1 片 3 Δt → ∫₀^(2π/3) 3 dt = 2π（弧の長さ rθ と一致）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "曲線 $x = t^2$、$y = \\dfrac23t^3$ の上で、$t$ と $t + h$ に対応する $2$ 点の距離を $h$ で割った量は、$h$ を $0$ に近づけるとある値に近づきます。$t = \\sqrt3$ のときのその値を求めましょう。",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      unit: "",
      unknownLabel: "$h \\to 0$ のときの行き先",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "前題と変わったのは、$1$ 片の長さそのものでなく、それを $t$ の幅で割った量を問われていること。",
        },
        {
          layer: 3,
          text: "$2$ 点の距離は $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$、$h$ で割ると $\\sqrt{\\left(\\dfrac{\\Delta x}{h}\\right)^2 + \\left(\\dfrac{\\Delta y}{h}\\right)^2}$。$h \\to 0$ で $\\dfrac{\\Delta x}{h} \\to \\dfrac{dx}{dt} = 2t$、$\\dfrac{\\Delta y}{h} \\to \\dfrac{dy}{dt} = 2t^2$ なので、行き先は $\\sqrt{4t^2 + 4t^4} = 2t\\sqrt{1 + t^2}$。$t = \\sqrt3$ で $2\\sqrt3\\cdot 2 = 4\\sqrt3$。これは第5章の[速度ベクトル]の大きさ（速さ）そのもの。中心の問いへ：**1 片の長さを $t$ の幅で割った行き先は速さ。だから曲線の長さは、速さを $t$ で足したもの**。",
        },
      ],
      formulaPreview: "√((dx/dt)² + (dy/dt)²) = 2t√(1 + t²) → t = √3 で 4√3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "曲線 $y = \\dfrac{x^2}{4}$ を $x$ の目盛りで小さく区切ると、$x$ が $\\Delta x$ 進むときの $1$ 片の長さは、およそ $\\left(\\cdots\\right)\\times\\Delta x$ と書けます。$x = 4$ のときの $\\left(\\cdots\\right)$ の値を求めましょう。",
      answer: Math.sqrt(5),
      answerDisplay: "√5",
      unit: "",
      unknownLabel: "$x = 4$ での $(\\cdots)$ の値",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線が $t$ でなく $y = (x \\text{ の式})$ で表され、$x$ の目盛りで区切ること。" },
        {
          layer: 3,
          text: "$x$ が $\\Delta x$ 進むと $y$ はおよそ $y'\\,\\Delta x$ 進むので、$1$ 片は $\\sqrt{(\\Delta x)^2 + (y'\\Delta x)^2} = \\sqrt{1 + (y')^2}\\,\\Delta x$。$y' = \\dfrac{x}{2}$、$x = 4$ で $y' = 2$、$\\sqrt{1 + 4} = \\sqrt5$。前題の速さの式で $t$ の代わりに $x$ を目盛りにした（$x = t$ とおいた）形と同じ。中心の問いへ：**$x$ の目盛りで測れば、足すものは $\\sqrt{1 + (y')^2}$**。",
        },
      ],
      formulaPreview: "1 片 √(1 + (y′)²) Δx、y′ = x/2 → x = 4 で √5",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "曲線 $y = \\dfrac23x^{\\frac32}$ の $0 \\le x \\le 3$ の部分の長さを求めましょう。",
      answer: 14 / 3,
      answerDisplay: "14/3",
      unit: "",
      unknownLabel: "曲線の長さ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、$1$ 片の長さを $1$ 点で測るのでなく、区間全体で足し集めること。" },
        {
          layer: 3,
          text: "$y' = x^{\\frac12}$ なので $\\sqrt{1 + (y')^2} = \\sqrt{1 + x}$。根号の中が $x$ の $1$ 次式になって、巻き戻せる。$\\displaystyle\\int_0^3\\sqrt{1 + x}\\,dx = \\Big[\\dfrac23(1 + x)^{\\frac32}\\Big]_0^3 = \\dfrac23(8 - 1) = \\dfrac{14}{3}$。中心の問いへ：**$1$ 片の長さの式 $\\sqrt{1 + (y')^2}$ が巻き戻せる形なら、曲線の長さが出る**。",
        },
      ],
      formulaPreview: "√(1 + x) → ∫₀³ √(1 + x) dx = (2/3)(8 − 1) = 14/3",
      figureMarker: "<<M3IA_ARC_SUM>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "曲線 $y = \\dfrac{x^2}{8} - \\log x$ の $1 \\le x \\le 4$ の部分の長さを求めましょう。",
      answer: 15 / 8 + 2 * Math.log(2),
      answerDisplay: "15/8+2log2",
      unit: "",
      unknownLabel: "曲線の長さ",
      inputAffordances: ["log"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線が $2$ 次式と対数の差になったこと。" },
        {
          layer: 3,
          text: "$y' = \\dfrac{x}{4} - \\dfrac1x$。$1 + (y')^2 = 1 + \\dfrac{x^2}{16} - \\dfrac12 + \\dfrac{1}{x^2} = \\left(\\dfrac{x}{4} + \\dfrac1x\\right)^2$。$1 \\le x \\le 4$ で $\\dfrac{x}{4} + \\dfrac1x > 0$ なので、根号がそのまま外れる。$\\displaystyle\\int_1^4\\left(\\dfrac{x}{4} + \\dfrac1x\\right)dx = \\Big[\\dfrac{x^2}{8} + \\log x\\Big]_1^4 = \\dfrac{15}{8} + \\log 4 = \\dfrac{15}{8} + 2\\log 2$。中心の問いへ：**根号の中が「何かの $2$ 乗」にまとまれば、根号が外れて足せる**。",
        },
      ],
      formulaPreview: "1 + (y′)² = (x/4 + 1/x)² → ∫₁⁴ (x/4 + 1/x) dx = 15/8 + 2 log 2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "半径 $3$ の円が $x$ 軸の上を滑らずに転がるとき、円周上の $1$ 点は $x = 3(t - \\sin t)$、$y = 3(1 - \\cos t)$ と動きます。$\\pi \\le t \\le \\dfrac{5\\pi}{2}$ のあいだにこの点が描く曲線の長さを求めましょう。",
      answer: 24 - 6 * Math.sqrt(2),
      answerDisplay: "24-6√2",
      unit: "",
      unknownLabel: "曲線の長さ",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "step3 と変わったのは、$x$ と $y$ が三角関数を含む式で、$t$ の区間が $2\\pi$ をまたぐこと。",
        },
        {
          layer: 3,
          text: "速さは $\\sqrt{9(1 - \\cos t)^2 + 9\\sin^2 t} = 3\\sqrt{2(1 - \\cos t)}$。[半角の公式] で $1 - \\cos t = 2\\sin^2\\dfrac t2$ なので、$3\\sqrt{4\\sin^2\\dfrac t2} = 6\\left|\\sin\\dfrac t2\\right|$。**$\\sin\\dfrac t2$ は $t = 2\\pi$ で符号が変わる**（$\\pi < t < 2\\pi$ で正、$2\\pi < t < \\dfrac{5\\pi}{2}$ で負）。$\\displaystyle\\int_{\\pi}^{2\\pi}6\\sin\\dfrac t2\\,dt = 12$、$\\displaystyle\\int_{2\\pi}^{\\frac{5\\pi}{2}}\\left(-6\\sin\\dfrac t2\\right)dt = 12 - 6\\sqrt2$。合わせて $24 - 6\\sqrt2$。絶対値を見ずに $6\\sin\\dfrac t2$ のまま足すと $12 - (12 - 6\\sqrt2) = 6\\sqrt2$ になり、外れる。中心の問いへ：**速さは長さなのでいつも $0$ 以上。根号を外すときは、絶対値の中の符号を見て区間を割る**。",
        },
      ],
      formulaPreview: "速さ 6|sin(t/2)| → 12 + (12 − 6√2) = 24 − 6√2（符号を見ないと 6√2）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "曲線 $y = \\dfrac23x^{\\frac32}$ の $0 \\le x \\le b$ の部分の長さが $\\dfrac{52}{3}$ になりました。$b$ を求めましょう。",
      answer: 8,
      answerDisplay: "8",
      unit: "",
      unknownLabel: "$b$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。今度は何が分かっていて、何を求める？" },
        { layer: 2, text: "step5 と変わったのは、長さが分かっていて、区間の右のはし $b$ が分からないこと。" },
        {
          layer: 3,
          text: "step5 と同じく、長さは $\\displaystyle\\int_0^b\\sqrt{1 + x}\\,dx = \\dfrac23\\left\\{(1 + b)^{\\frac32} - 1\\right\\}$。これが $\\dfrac{52}{3}$ なので $(1 + b)^{\\frac32} = 27$、$1 + b = 9$、$b = 8$。長さは $b$ とともに増え続けるので、解は $1$ つ。中心の問いへ：**長さを区間のはしの式にしておけば、長さから逆にはしも読める**。",
        },
      ],
      formulaPreview: "(2/3){(1 + b)^(3/2) − 1} = 52/3 → (1 + b)^(3/2) = 27 → b = 8",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$x = e^t\\cos t$、$y = e^t\\sin t$（$0 \\le t \\le \\log 3$）で表される曲線の長さを求めましょう。",
      answer: 2 * Math.SQRT2,
      answerDisplay: "2√2",
      unit: "",
      unknownLabel: "曲線の長さ",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "step7 と比べてみよう。何が加わった？" },
        { layer: 2, text: "step7 と変わったのは、$x$ と $y$ が指数関数と三角関数の積になっていること。" },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = e^t(\\cos t - \\sin t)$、$\\dfrac{dy}{dt} = e^t(\\sin t + \\cos t)$。$2$ 乗して足すと $e^{2t}\\left\\{(\\cos t - \\sin t)^2 + (\\sin t + \\cos t)^2\\right\\} = 2e^{2t}$。速さは $\\sqrt2\\,e^t$。$\\displaystyle\\int_0^{\\log 3}\\sqrt2\\,e^t\\,dt = \\sqrt2(3 - 1) = 2\\sqrt2$。中心の問いへ：**$2$ 乗して足すと交ざった項が打ち消し合い、根号が外れる形になることがある**。",
        },
      ],
      formulaPreview: "速さ √2 eᵗ → ∫₀^(log 3) √2 eᵗ dt = 2√2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$x = 2\\cos^3 t$、$y = 2\\sin^3 t$（$0 \\le t \\le \\dfrac{2\\pi}{3}$）で表される曲線の長さを求めましょう。",
      answer: 15 / 4,
      answerDisplay: "15/4",
      unit: "",
      unknownLabel: "曲線の長さ",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "step7 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step7 と変わったのは、$x$ と $y$ が三角関数の $3$ 乗で表されていること。",
        },
        {
          layer: 3,
          text: "$\\dfrac{dx}{dt} = -6\\cos^2 t\\sin t$、$\\dfrac{dy}{dt} = 6\\sin^2 t\\cos t$（[合成関数の微分法]）。$2$ 乗して足すと $36\\sin^2 t\\cos^2 t(\\cos^2 t + \\sin^2 t) = 36\\sin^2 t\\cos^2 t$、速さは $6|\\sin t\\cos t| = 3|\\sin 2t|$。$\\sin 2t$ は $t = \\dfrac{\\pi}{2}$ で符号が変わる。$\\displaystyle\\int_0^{\\frac{\\pi}{2}}3\\sin 2t\\,dt = 3$、$\\displaystyle\\int_{\\frac{\\pi}{2}}^{\\frac{2\\pi}{3}}(-3\\sin 2t)\\,dt = \\dfrac32\\left(\\cos\\dfrac{4\\pi}{3} - \\cos\\pi\\right) = \\dfrac34$。合わせて $\\dfrac{15}{4}$。中心の問いへ：**速さの式をまとめる道具（合成関数の微分・倍角）と、符号を見て区間を割る手つきを組み合わせれば、長さが出る**。",
        },
      ],
      formulaPreview: "速さ 3|sin 2t| → 3 + 3/4 = 15/4",
    },
  ],
  derivation: `**中心の問い** ｜ 曲がった線の長さには定規が当てられない。**小さく区切った 1 片をまっすぐな斜辺とみなせば、何を足せば長さになる？**

────────

## 1 片は、三平方の定理で作る

曲線を小さく区切ると、$1$ 片はほとんどまっすぐな線分になる。$x$ が $\\Delta x$、$y$ が $\\Delta y$ 進む $1$ 片の長さは、[三平方の定理] で

$$\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$$

これを足し集めたものが[曲線の長さ]である。まっすぐな線なら、足した長さは両はしの距離と同じになり（step1）、円弧なら扇形の弧の長さと同じになる（step2）。

## ここが胚細胞：どの目盛りで区切るか

**$t$ の目盛りで区切る**と、$1$ 片の長さを $\\Delta t$ で割った行き先は

$$\\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}$$

——[速度ベクトル]の大きさ（速さ）である（step3）。だから曲線の長さは、速さを $t$ で足したもの。

**$x$ の目盛りで区切る**と、$\\Delta y \\approx y'\\Delta x$ なので $1$ 片は $\\sqrt{1 + (y')^2}\\,\\Delta x$（step4）。

$$L = \\int_a^b\\sqrt{1 + (y')^2}\\,dx$$

どちらも同じ $1$ 片の長さを、別の目盛りで書いただけである。

**根号を外すときは符号に注意する。** 長さ（速さ）はいつも $0$ 以上。$\\sqrt{(\\cdots)^2}$ を外すと絶対値が出る。符号が変わる場所で区間を割る（step7・10）。

## Step の道筋

- **step1・2**：線分と円弧。足し集めた長さが、知っている長さと一致する
- **step3・4**：$1$ 片を $t$ の幅で割ると速さ、$x$ の目盛りなら $\\sqrt{1 + (y')^2}$
- **step5（質的変化）・6**：根号が外れる曲線の長さ
- **step7（山場）**：転がる円の軌跡。絶対値の中の符号が変わる区間
- **step8**：長さから区間のはしを逆に読む
- **step9**：$2$ 乗して足すと交ざった項が消える曲線
- **step10**：速さの式をまとめ、符号を見て区間を割る（第3章・第6章と合流）

────────

**もっと深く**

**忘れても導ける。** 曲線の長さの公式は覚えなくてよい。小さな $1$ 片を斜辺とする直角三角形を描き、三平方の定理を書けば、$t$ でも $x$ でも足すものが出てくる。

**長さが出る曲線は多くない。** $\\sqrt{1 + (y')^2}$ は、多くの曲線で巻き戻しが込み入る（たとえば放物線 $y = x^2$ の長さは、置換をくり返せば $\\log$ と根号で書けるが、計算はかなり長い）。根号の中が「何かの $2$ 乗」にまとまる曲線（step5・6・9）や、三角関数の公式で $2$ 乗にできる曲線（step7・10）が、高校で長さを求められる代表である。

**この先の景色。** 長さを求められない曲線でも、長さそのものは決まっている。数値で近似して計算する方法（数値積分）や、新しい関数を定義して表す方法（楕円の周の長さを表す「楕円積分」）が、大学で現れる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「速さと弧長」の構成（パラメータ曲線の長さは速さの積分・$y = f(x)$ の長さ・根号の外し方）を参考。この系列は原典と逆に、三平方の定理で $1$ 片を作ってから速さに行く。問題の値・曲線はすべてオリジナル。

────────

**問いに戻ると**

$1$ 片の長さは $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$——三平方の定理で作れる。それを足し集めれば曲線の長さになる。

$t$ の目盛りで区切れば、足すものは速さ $\\sqrt{(x')^2 + (y')^2}$。$x$ の目盛りなら $\\sqrt{1 + (y')^2}$。根号を外すときは、長さがいつも $0$ 以上であることを忘れずに、符号を見て区間を割る。`,
};

/** M3IA7: 長方形ではさむ——面積を長方形の和の行き先で定め直す（三段・第2章の預け①の返済）。
 *  第2章 math3_lim_squeeze_01「区分求積法では、曲線の下の面積を内側の長方形と外側の長方形ではさんで定義します」と、
 *  math3_lim_series_01 の derivation「面積を無限個の長方形の和として定義し直す」を返す。原典 p.290〜293 は右端の和だけ（はさむ形は無い）。
 *  段1＝step1・2（f = x² + 1、0〜2 を 4 等分：外側 23/4・内側 15/4。原始関数の値 14/3 をはさむ）
 *  段2＝step3〜5（x² + 3x の外側の和を Σ の公式で閉じた 1/n² の係数 1/6／step1 の関数の外側の和の極限 14/3／外側 − 内側 = 8/n < 1/100 の最小 n = 801）
 *    ＝R1 B-1：step3・4・5 で同じ関数から 2 つの答えを出さない（step3 だけ別の関数）
 *  山場 step6（C12 ②・R1 A-1）：減少関数 4/(x + 1)、0〜3 を 3 等分。外側の和（役割で問う）＝左端 22/3。素朴に「右端＝外側」とすると 13/3
 *  step7：区間 1〜3（幅と点の位置）26/3／step8：3cos x の 0〜π/6（右端の和の極限）3/2
 *  step9（複合・C13 第2章 はさみうち）：単調でない x(4 − x)、0〜4。n(外側 − 内側) の極限 32（n が偶数ならちょうど 32/n の差）
 *  step10（複合・C13 数列 3 乗の和）：x³ の 0〜2 の外側の和 4(1 + 1/n)² の極限 4
 *  答え 10 個はすべて相異なる（sympy）。原典の y = x²・0〜1・3 等分・8 等分は使っていない。 */
export const M3IA_RIEMANN_SERIES: LearnerSeries = {
  id: "math3_ia_riemann_01",
  title: "長方形ではさむ——面積を長方形の和の行き先で定め直す",
  subtitle:
    "数Ⅲ・C 積分法の応用より — 原始関数を使わずに、長方形の面積（かけ算）だけで曲線の下の面積に届くか。はみ出す長方形と足りない長方形ではさむと何が決まるか。$10$ 問で確かめる。",
  patternId: "M3IA7",
  unit: "math_3",
  revelationLabel:
    "**減る曲線では、右端の高さの長方形は内側になる**。外側・内側は「右端・左端」ではなく、はみ出すか足りないかで決まる",
  drivingQuestion:
    "原始関数を使わずに、長方形の面積（かけ算）だけで曲線の下の面積に届くか？——**はみ出す長方形と足りない長方形ではさんだら、何が決まる？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "曲線 $y = x^2 + 1$ と $x$ 軸、$2$ 本の直線 $x = 0$、$x = 2$ で囲まれた部分を考えます。$0$ から $2$ を $4$ 等分し、それぞれの区間の**右端**での曲線の高さを高さとする長方形を $4$ つ並べます。$4$ つの長方形の面積の和を求めましょう。",
      answer: 23 / 4,
      answerDisplay: "23/4",
      unit: "",
      unknownLabel: "長方形の面積の和",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "長方形の面積ならかけ算で出せる。曲線の下を細い長方形で埋めたら、面積のおおよそが言えそう？ 長方形は曲線からはみ出す？ 足りない？",
        },
        {
          layer: 2,
          text: "第2章で、行き先が直接つかめない列の極限を、どうやって決めた？（[はさみうちの原理]）",
        },
        {
          layer: 3,
          text: "幅は $\\dfrac24 = \\dfrac12$。右端は $x = \\dfrac12,\\ 1,\\ \\dfrac32,\\ 2$ で、高さは $\\dfrac54,\\ 2,\\ \\dfrac{13}{4},\\ 5$。和は $\\dfrac12\\left(\\dfrac54 + 2 + \\dfrac{13}{4} + 5\\right) = \\dfrac12 \\cdot \\dfrac{23}{2} = \\dfrac{23}{4}$。曲線は右上がりなので、右端の高さはその区間でいちばん高く、長方形は曲線から**はみ出す**（外側）。原始関数で出した面積 $\\dfrac{14}{3}$ より大きい。中心の問いへの最初の部分回答：**右上がりの曲線で右端の高さを使うと、長方形は外側からかぶさる。和は面積より大きい**。",
        },
      ],
      formulaPreview: "(1/2)(5/4 + 2 + 13/4 + 5) = 23/4（面積 14/3 より大きい＝外側）",
      figureMarker: "<<M3IA_STRIPS>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題と同じ図形・同じ分け方で、今度はそれぞれの区間の**左端**での高さを高さとする長方形を $4$ つ並べます。面積の和を求めましょう。",
      answer: 15 / 4,
      answerDisplay: "15/4",
      unit: "",
      unknownLabel: "長方形の面積の和",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、長方形の高さを測る位置が右端から左端になったこと。" },
        {
          layer: 3,
          text: "左端は $x = 0,\\ \\dfrac12,\\ 1,\\ \\dfrac32$ で、高さは $1,\\ \\dfrac54,\\ 2,\\ \\dfrac{13}{4}$。和は $\\dfrac12\\left(1 + \\dfrac54 + 2 + \\dfrac{13}{4}\\right) = \\dfrac{15}{4}$。今度は長方形が曲線の下に収まり（内側）、面積 $\\dfrac{14}{3}$ より小さい。$\\dfrac{15}{4} < \\dfrac{14}{3} < \\dfrac{23}{4}$。中心の問いへ：**足りない長方形（内側）と、はみ出す長方形（外側）で、面積をはさめる**。",
        },
      ],
      formulaPreview: "(1/2)(1 + 5/4 + 2 + 13/4) = 15/4 → 15/4 < 14/3 < 23/4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "曲線 $y = x^2 + 3x$ の $0 \\le x \\le 1$ の部分の下を $n$ 等分し、右端の高さの長方形を $n$ 個並べた面積の和 $S_n$ は、$S_n = a + \\dfrac{b}{n} + \\dfrac{c}{n^2}$ と書けます。$c$ を求めましょう。",
      answer: 1 / 6,
      answerDisplay: "1/6",
      unit: "",
      unknownLabel: "$c$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        { layer: 2, text: "前題と変わったのは、等分する数が $4$ でなく、文字 $n$ になったこと。" },
        {
          layer: 3,
          text: "幅は $\\dfrac1n$、右端は $\\dfrac{k}{n}$（$k = 1,\\ \\dots,\\ n$）。$S_n = \\dfrac1n\\displaystyle\\sum_{k=1}^{n}\\left\\{\\left(\\dfrac{k}{n}\\right)^2 + \\dfrac{3k}{n}\\right\\} = \\dfrac{1}{n^3}\\sum k^2 + \\dfrac{3}{n^2}\\sum k$。[シグマ記号] の和の公式で $\\displaystyle\\sum k^2 = \\dfrac{n(n+1)(2n+1)}{6}$、$\\displaystyle\\sum k = \\dfrac{n(n+1)}{2}$ を入れると $S_n = \\dfrac{11}{6} + \\dfrac{2}{n} + \\dfrac{1}{6n^2}$。$c = \\dfrac16$。中心の問いへ：**$n$ 等分の和も、和の公式で $n$ の式に閉じられる。$n$ を大きくしたときの行き先が読める形になる**。",
        },
      ],
      formulaPreview: "S_n = (1/n³)Σk² + (3/n²)Σk = 11/6 + 2/n + 1/(6n²) → c = 1/6",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "step1 の図形（$y = x^2 + 1$ と $x$ 軸、$x = 0$、$x = 2$ で囲まれた部分）の下を $n$ 等分し、右端の高さの長方形を $n$ 個並べます。面積の和は、$n$ を限りなく大きくするとある値に近づきます。その値を求めましょう。",
      answer: 14 / 3,
      answerDisplay: "14/3",
      unit: "",
      unknownLabel: "$n \\to \\infty$ での行き先",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、閉じた式の係数でなく、$n$ を限りなく大きくしたときの行き先を問われていること。" },
        {
          layer: 3,
          text: "幅は $\\dfrac2n$、右端は $\\dfrac{2k}{n}$。和は $\\dfrac2n\\displaystyle\\sum_{k=1}^{n}\\left(\\dfrac{4k^2}{n^2} + 1\\right) = \\dfrac{8}{n^3}\\sum k^2 + 2 = \\dfrac43\\left(1 + \\dfrac1n\\right)\\left(2 + \\dfrac1n\\right) + 2$。$n \\to \\infty$ で $\\dfrac43 \\cdot 2 + 2 = \\dfrac{14}{3}$。原始関数で出した面積 $\\displaystyle\\int_0^2(x^2 + 1)\\,dx = \\dfrac{14}{3}$ と一致する。中心の問いへ：**長方形の和の行き先と、原始関数で出した面積が、同じ値になる**。",
        },
      ],
      formulaPreview: "(4/3)(1 + 1/n)(2 + 1/n) + 2 の行き先は 14/3（原始関数の値と一致）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "step1 の図形の下を $n$ 等分し、右端の高さの長方形の和（外側）から、左端の高さの長方形の和（内側）を引いた差を考えます。この差が $\\dfrac{1}{100}$ より小さくなる最小の $n$ を求めましょう。",
      answer: 801,
      answerDisplay: "801",
      unit: "",
      unknownLabel: "最小の $n$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "step2 と比べてみよう。今度は何が分かっていて、何を求める？" },
        {
          layer: 2,
          text: "step2 と変わったのは、外側と内側の差の大きさが条件として与えられ、等分する数 $n$ が分からないこと。",
        },
        {
          layer: 3,
          text: "外側の和と内側の和は、同じ長方形が $1$ つずつずれて並んでいるだけ。違うのは、外側の最後（右端 $x = 2$ の高さ $5$）と内側の最初（左端 $x = 0$ の高さ $1$）だけで、差は $\\dfrac2n(5 - 1) = \\dfrac8n$。$\\dfrac8n < \\dfrac{1}{100}$ より $n > 800$、最小の $n$ は $801$。中心の問いへ：**外側と内側の差は $n$ を大きくすると $0$ に近づく。だから、はさまれた面積はただ $1$ つに決まる**。",
        },
      ],
      formulaPreview: "外側 − 内側 = (2/n)(5 − 1) = 8/n < 1/100 → n > 800 → 801",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "曲線 $y = \\dfrac{4}{x + 1}$ と $x$ 軸、$2$ 本の直線 $x = 0$、$x = 3$ で囲まれた部分の下を $3$ 等分し、曲線から**はみ出す側**（外側）の長方形を $3$ つ並べます。外側の長方形の面積の和を求めましょう。",
      answer: 22 / 3,
      answerDisplay: "22/3",
      unit: "",
      unknownLabel: "外側の長方形の面積の和",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "step1 と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "step1 と変わったのは、曲線が右下がりになったこと。" },
        {
          layer: 3,
          text: "曲線は右下がりなので、それぞれの区間でいちばん高いのは**左端**。外側の長方形は左端の高さ $4,\\ 2,\\ \\dfrac43$ を使い、和は $1 \\times\\left(4 + 2 + \\dfrac43\\right) = \\dfrac{22}{3}$。step1 と同じつもりで右端の高さ $2,\\ \\dfrac43,\\ 1$ を使うと $\\dfrac{13}{3}$ で、これは曲線の下に収まる**内側**の和——面積（およそ $5.5$）より小さい。中心の問いへ：**外側・内側は「右端・左端」で決まるのではない。曲線が上がるか下がるかで、はみ出す側がどちらの端かが入れかわる**。",
        },
      ],
      formulaPreview: "右下がり → 外側は左端の高さ：4 + 2 + 4/3 = 22/3（右端だと 13/3＝内側）",
      figureMarker: "<<M3IA_STRIPS_DOWN>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\displaystyle\\lim_{n \\to \\infty}\\dfrac{2}{n}\\sum_{k=1}^{n}\\left(1 + \\dfrac{2k}{n}\\right)^2$ を求めましょう。",
      answer: 26 / 3,
      answerDisplay: "26/3",
      unit: "",
      unknownLabel: "極限値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。何が加わった？" },
        {
          layer: 2,
          text: "step4 と変わったのは、高さを測る点が $\\dfrac{2k}{n}$ でなく $1 + \\dfrac{2k}{n}$ になったこと。",
        },
        {
          layer: 3,
          text: "幅 $\\dfrac2n$ の長方形が $n$ 個で、右端の点は $x_k = 1 + \\dfrac{2k}{n}$——$x = 1$ から $x = 3$ までを $n$ 等分した右端。高さは $x_k^2$。だからこの和は、曲線 $y = x^2$ の $1 \\le x \\le 3$ の部分の下を外側の長方形で覆った和で、行き先はその面積 $\\displaystyle\\int_1^3 x^2\\,dx = \\dfrac{27 - 1}{3} = \\dfrac{26}{3}$。中心の問いへ：**幅と、高さを測る点の位置を読めば、和がどの区間の面積をはさんでいるかが分かる**。",
        },
      ],
      formulaPreview: "幅 2/n・右端 1 + 2k/n → 1〜3 の y = x² の下の面積 26/3",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "曲線 $y = 3\\cos x$ の $0 \\le x \\le \\dfrac{\\pi}{6}$ の部分の下を $n$ 等分し、右端の高さの長方形を $n$ 個並べます。面積の和は、$n$ を限りなく大きくするとある値に近づきます。その値を求めましょう。",
      answer: 3 / 2,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "$n \\to \\infty$ での行き先",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、高さが三角関数になったこと。" },
        {
          layer: 3,
          text: "$\\cos$ の和は、数列の単元で学んだ和の公式の表に無い。それでも、和の行き先が曲線の下の面積になることは step4 で確かめた。だから行き先は $\\displaystyle\\int_0^{\\frac{\\pi}{6}}3\\cos x\\,dx = \\Big[3\\sin x\\Big]_0^{\\frac{\\pi}{6}} = \\dfrac32$。（積を和に直す手つきで $\\cos$ の和を閉じる道もあり、同じ値になる。）中心の問いへ：**和を閉じた式にできなくても、和の行き先は面積——原始関数で出せる**。",
        },
      ],
      formulaPreview: "行き先 = ∫₀^(π/6) 3 cos x dx = 3/2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $y = x(4 - x)$ の $0 \\le x \\le 4$ の部分の下を $n$ 等分します。それぞれの区間で、曲線の**いちばん高い値**を高さとする長方形の和を $U_n$（外側）、**いちばん低い値**を高さとする長方形の和を $L_n$（内側）とします。$n(U_n - L_n)$ は、$n$ を限りなく大きくするとある値に近づきます。その値を求めましょう。",
      answer: 32,
      answerDisplay: "32",
      unit: "",
      unknownLabel: "$n(U_n - L_n)$ の行き先",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step5 と変わったのは、曲線が途中まで上がってから下がる山の形で、外側・内側の高さが区間ごとに右端・左端と入れかわること。",
        },
        {
          layer: 3,
          text: "山の頂上は $x = 2$（高さ $4$）。上りの区間（$0$〜$2$）では外側＝右端・内側＝左端、下りの区間（$2$〜$4$）では外側＝左端・内側＝右端。各区間の「いちばん高い − いちばん低い」は、その区間で曲線が上がった（下がった）量。$n$ が偶数で $x = 2$ が区切りの点に来るとき、それを全部足すと、上りで $4$、下りで $4$、合わせて $8$ だけ。だから $U_n - L_n = \\dfrac4n \\times 8 = \\dfrac{32}{n}$、$n(U_n - L_n) = 32$。$n$ が奇数のときも、頂上を含む $1$ 区間のぶんだけずれて、$n$ を大きくすると $32$ に近づく。$U_n - L_n \\to 0$ なので、[はさみうちの原理] で $U_n$ も $L_n$ も同じ値（面積）に近づく。中心の問いへ：**山の形でも、外側と内側の差は $0$ に近づく。だから面積は、外側と内側にはさまれたただ $1$ つの値に決まる**。",
        },
      ],
      formulaPreview: "上りで 4・下りで 4 の高さの変化 → U_n − L_n ≈ (4/n)·8 → n(U_n − L_n) → 32",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $y = x^3$ の $0 \\le x \\le 2$ の部分の下を $n$ 等分し、右端の高さの長方形を $n$ 個並べます。面積の和を $n$ の式に閉じてから、$n$ を限りなく大きくしたときの行き先を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$n \\to \\infty$ での行き先",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。何が組み合わさっている？" },
        {
          layer: 2,
          text: "step3 と変わったのは、高さが $x$ の $3$ 乗で、区間の幅が $2$ になったこと。",
        },
        {
          layer: 3,
          text: "幅 $\\dfrac2n$、右端 $\\dfrac{2k}{n}$、高さ $\\dfrac{8k^3}{n^3}$。和は $\\dfrac{16}{n^4}\\displaystyle\\sum_{k=1}^{n}k^3$。[シグマ記号] の $3$ 乗の和の公式 $\\displaystyle\\sum k^3 = \\left\\{\\dfrac{n(n+1)}{2}\\right\\}^2$ を入れると $\\dfrac{16}{n^4}\\cdot\\dfrac{n^2(n+1)^2}{4} = 4\\left(1 + \\dfrac1n\\right)^2$。行き先は $4$。原始関数でも $\\displaystyle\\int_0^2 x^3\\,dx = 4$。中心の問いへ：**和の公式で閉じた行き先と、原始関数で出した面積が一致する——長方形の和で定め直した面積は、これまでの定積分と同じもの**。",
        },
      ],
      formulaPreview: "(16/n⁴)Σk³ = 4(1 + 1/n)² の行き先 4（∫₀² x³ dx = 4 と一致）",
    },
  ],
  derivation: `**中心の問い** ｜ 原始関数を使わずに、長方形の面積（かけ算）だけで曲線の下の面積に届くか？——**はみ出す長方形と足りない長方形ではさんだら、何が決まる？**

────────

## 長方形の和で、面積をはさむ

曲線の下を細い帯に分け、それぞれを長方形で置きかえる。長方形の面積はかけ算で出る。

- 帯の中で曲線がいちばん高い値を高さにすると、長方形は曲線から**はみ出す**（外側）
- いちばん低い値を高さにすると、曲線の下に**収まる**（内側）

だから、どんなに粗い分け方でも

$$(\\text{内側の和}) \\le (\\text{面積}) \\le (\\text{外側の和})$$

が成り立つ（step1・2）。

## ここが胚細胞：差が 0 に近づけば、面積は 1 つに決まる

細かく分けるほど、外側と内側の差は小さくなる。右上がりの曲線なら、差は「最後の長方形と最初の長方形の差」だけで、$\\dfrac{(\\text{区間の幅})\\times(\\text{高さの変化})}{n}$（step5）。山の形でも、各帯の高さの変化を合わせたものに比例して $0$ に近づく（step9）。

差が $0$ に近づくので、[はさみうちの原理] によって、外側の和も内側の和も同じ $1$ つの値に近づく。**その値を、曲線の下の面積と定める**——これが [区分求積法] の考え方である。そしてこの値は、原始関数で出した定積分と一致する（step4・10）。

**外側・内側は端の名前では決まらない。** 右上がりなら右端が外側、右下がりなら左端が外側になる（step6）。

## Step の道筋

- **step1・2**：同じ分け方で外側の和と内側の和。原始関数で出した面積をはさむ
- **step3・4**：$n$ 等分の和を $n$ の式に閉じ、$n$ を大きくした行き先を読む（原始関数の値と一致）
- **step5**：外側と内側の差が小さくなる $n$
- **step6（質的変化・山場）**：右下がりの曲線。はみ出す側は左端
- **step7・8**：区間や高さが変わっても、和の行き先は面積
- **step9**：山の形。外側と内側の差が $0$ に近づくことを、はさみうちで（第2章と合流）
- **step10**：$3$ 乗の和の公式で閉じた行き先（数列の単元と合流）

────────

**もっと深く**

**忘れても導ける。** 区分求積の式を覚える必要はない。「幅 × 高さ」の長方形を $n$ 本並べて書けば、和の式はその場で作れる。

**第2章からの預け。** 第2章のはさみうちの系列は、「区分求積法では、曲線の下の面積を内側と外側の長方形ではさんで定める」と、この章に約束していた。数列の極限の系列でも、「面積を無限個の長方形の和として定義し直す——有限で実行できるものを作り、その行き先に名前を与える」と書いていた。step1〜5・9 がその返済である。

**積分の 2 つの顔。** 原始関数の差（微分の逆）として出した定積分と、長方形の和の行き先として出した面積が、同じ値になった。大学では、むしろ長方形の和の行き先で積分を定義し、そこから原始関数との関係を定理として導く。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第7章「区分求積法」の構成（図形を細い帯に分け、長方形の和の行き先で面積を求める）を参考。外側と内側の長方形ではさむ形は、第2章の系列との約束にもとづいて ruisuishiki で組んだ。問題の値・関数はすべてオリジナル。

────────

**問いに戻ると**

長方形の面積だけで、曲線の下の面積に届く。はみ出す長方形の和（外側）と、足りない長方形の和（内側）で面積をはさみ、細かく分けていくと、差は $0$ に近づく。だから面積は、両側にはさまれたただ $1$ つの値に決まる。

その値は、原始関数で出した定積分と一致する。`,
};

export const MATH3_INTEGRAL_APP_SERIES_LIST: LearnerSeries[] = [
  M3IA_AREA_SERIES,
  M3IA_PARAM_SERIES,
  M3IA_VOLUME_SERIES,
  M3IA_SLICE_SERIES,
  M3IA_DISTANCE_SERIES,
  M3IA_ARC_SERIES,
  M3IA_RIEMANN_SERIES,
];
