/**
 * 「いろいろな曲線」ユニットの系列（数Ⅲ・C 第8章）。
 *
 * 背骨設計は docs/math3c_curves_design.md
 * （メイン Opus 5.5・2026-10-07 起草・Q1〜Q5 は先生の指示で推奨どおり → Round 1 背骨監査〔Sonnet 5.5〕凍結前 15 件全件反映 → 2026-10-07 凍結）。
 * 系列はメインがひとりで実装する（並列委譲なし）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第8章 いろいろな曲線（旺文社・2024）の
 * 章構成を借り、問題の値・曲線はすべてオリジナルに変更（copyright-credit-vs-copy）。
 * 原典の決め台詞・比喩は地の文に入れない（裁定 Q3）。
 *
 * ハブ胚細胞（背骨 D1）：
 *   曲線は「点が満たす距離の条件」で決まる。条件を座標で書けば式になり、
 *   式の数字は逆に条件（焦点・軸の長さ・準線）を語る。
 *   そして、基準（中心・焦点・極）をどこに置いて測るかで、同じ曲線でも式の姿が変わる。
 *
 * 入力の折り方（背骨 D2）：方程式は指定係数（形を問題文で決める）・点は成分ごと・接線は傾きと切片を別 step・
 * 極座標は r と θ を別 step（範囲を明記）。入力系の拡張はしない（裁定 Q4）。
 */

import type { LearnerSeries } from "./types";

/** M3CV1: 楕円——2 点からの距離の和を式にする。★三段★
 *  段1＝step1〜2（F(±4, 0)・曲線 x²/25 + y²/9 = 1 の上の点で PF + PF′ を数で。軸上でない点〔重い〕→ x 軸上の端〔軽い〕で同じ 10＝追補13）
 *  段2＝step3〜4（左の根号を移して 2 乗 → √((x+4)² + y²) = 5 + (4/5)x の 4/5 → もう一度 2 乗して y² の分母 9）
 *    背骨は「右の根号を移項」と書いたが、残る根号を √((x+4)² + y²) にそろえるため「左の根号を右辺へ」に替えた（形の 3 点は R1 F1-1 のとおり問題文で決める）
 *  段3＝step5〜10。step5（逆）x²/49 + y²/24：c = 5／step6 2x² + 7y² = 56：長軸 4√7（比 √28 : √8＝第5章の 3 : 2 の楕円と別の形）
 *  step7（逆・R1 F1-2）焦点 (±12, 0) と点 (5, 60/13)：和 109/13 + 229/13 = 26 → □ = 169
 *  山場 step8（C12 ②・R1 F1-3）x²/11 + y²/36 = 1・A(6, 0) から 2 焦点までの距離の和：正答 2√61（焦点 (0, ±5)）・素朴（焦点を x 軸上に置く）1 + 11 = 12
 *  step9（＋α）4x² − 32x + 13y² + 26y + 25 = 0 ＝ (x−4)²/13 + (y+1)²/4 = 1：大きいほうの焦点の x 座標 7
 *  step10（複合・C13 数Ⅱ 軌跡）F(2, 1)・F′(2, −5)・和 10：(x−2)²/16 + (y+2)²/25 = 1 の □ = 16
 *  答え：10・10・4/5・9・5・4√7・169・2√61・7・16（step1・2 だけ意図して同じ）。sympy で焦点の定義（距離の和）から検算済み。
 *  原典の族（(a², b²) = (6, 2)・(4/9, 1)・(16, 7)・(16, 12)・(4, 6)・(10, 5/2)・(4, 1)）とその入れかえ・定数倍、
 *  第5章の x²/9 + y²/4 と (2cos t, sin t)、比 2 : 1 の楕円は使っていない。 */
export const M3CV_ELLIPSE_SERIES: LearnerSeries = {
  id: "math3_cv_ellipse_01",
  title: "楕円——2 点からの距離の和を式にする",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — $2$ 点からの距離の和が一定の点を集めると、どんな式になるか。式のどの数字が、その和と $2$ 点の位置を語っているか。$10$ 問で確かめる。",
  patternId: "M3CV1",
  unit: "math_3",
  revelationLabel:
    "**焦点は、分母の大きいほうの軸の上にある**。和の半分・焦点までの距離・短いほうの半径の $3$ つが、直角三角形をつくる",
  drivingQuestion:
    "$2$ 点からの距離の和が一定になる点を集めると、どんな曲線のどんな式になる？——**式のどの数字が、その『和』と $2$ 点の位置を語っている？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 点 F$(4,\\ 0)$、F′$(-4,\\ 0)$ と、ある曲線の上の点 P$\\left(3,\\ \\dfrac{12}{5}\\right)$ があります。P から F までの距離と、P から F′ までの距離の和 PF ＋ PF′ を求めましょう。",
      answer: 10,
      answerDisplay: "10",
      unit: "",
      unknownLabel: "PF ＋ PF′",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$2$ 点の座標が分かっているとき、そのあいだの距離はどう出した？ $2$ つの距離を出したら、足してみよう。",
        },
        {
          layer: 2,
          text: "座標平面で $2$ 点の距離を出すとき、横の差と縦の差から何を使った？（[三平方の定理]）",
        },
        {
          layer: 3,
          text: "PF：横の差 $3 - 4 = -1$、縦の差 $\\dfrac{12}{5}$。$\\mathrm{PF} = \\sqrt{1 + \\dfrac{144}{25}} = \\sqrt{\\dfrac{169}{25}} = \\dfrac{13}{5}$。PF′：横の差 $3 - (-4) = 7$。$\\mathrm{PF'} = \\sqrt{49 + \\dfrac{144}{25}} = \\sqrt{\\dfrac{1369}{25}} = \\dfrac{37}{5}$。和は $\\dfrac{13}{5} + \\dfrac{37}{5} = \\dfrac{50}{5} = 10$。中心の問いへの最初の部分回答：**この点 P では、$2$ 点からの距離の和がちょうど $10$ になった。曲線の上の別の点でも、和は同じだろうか**。",
        },
      ],
      formulaPreview: "PF = 13/5、PF′ = 37/5 → PF ＋ PF′ = 10",
      figureMarker: "<<M3CV_TWO_PINS>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の曲線は、$x$ 軸と点 A$(5,\\ 0)$ で交わります。A についても、F$(4,\\ 0)$ までの距離と F′$(-4,\\ 0)$ までの距離の和 AF ＋ AF′ を求めましょう。",
      answer: 10,
      answerDisplay: "10",
      unit: "",
      unknownLabel: "AF ＋ AF′",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線の上の点が $x$ 軸の上に来たこと。" },
        {
          layer: 3,
          text: "A と F、A と F′ はどちらも $x$ 軸の上にあるので、距離は $x$ 座標の差だけで出る。$\\mathrm{AF} = 5 - 4 = 1$、$\\mathrm{AF'} = 5 - (-4) = 9$。和は $1 + 9 = 10$——前題と同じ値。しかもこの和は、A$(5, 0)$ から反対側の端 $(-5,\\ 0)$ までの長さ $10$ に等しい（F′ から $(-5, 0)$ までの $1$ が、F から A までの $1$ と同じだから）。中心の問いへ：**この曲線は、F・F′ からの距離の和が $10$ で一定の点の集まりらしい。和は、曲線の $x$ 軸上の端から端までの長さに等しい**。",
        },
      ],
      formulaPreview: "AF = 1、AF′ = 9 → AF ＋ AF′ = 10（前題と同じ・端から端までの長さ）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "前の $2$ 問の曲線は、F$(4,\\ 0)$・F′$(-4,\\ 0)$ からの距離の和が $10$ になる点 P$(x,\\ y)$ の集まりです。この条件を式にすると\n\n$$\\sqrt{(x+4)^2 + y^2} + \\sqrt{(x-4)^2 + y^2} = 10$$\n\n**左の根号 $\\sqrt{(x+4)^2 + y^2}$ を右辺へ移して**両辺を $2$ 乗し、整理すると、根号は $\\sqrt{(x+4)^2 + y^2}$ の $1$ つだけが残ります。それを\n\n$$\\sqrt{(x+4)^2 + y^2} = \\square + \\triangle\\,x$$\n\n（**左辺の根号の係数は $1$、右辺は「定数 ＋ $x$ の項」の順**）の形に書いたときの △ を求めましょう。",
      answer: 4 / 5,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "△（$x$ の係数）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までは数の点で距離を足した。今度は何が違う？" },
        { layer: 2, text: "前題と変わったのは、P の座標が数でなく文字 $(x,\\ y)$ になったこと。" },
        {
          layer: 3,
          text: "移すと $\\sqrt{(x-4)^2 + y^2} = 10 - \\sqrt{(x+4)^2 + y^2}$。両辺を $2$ 乗して\n$$(x-4)^2 + y^2 = 100 - 20\\sqrt{(x+4)^2 + y^2} + (x+4)^2 + y^2$$\n$(x+4)^2 - (x-4)^2 = 16x$ なので、整理すると $20\\sqrt{(x+4)^2 + y^2} = 100 + 16x$。両辺を $20$ で割って $\\sqrt{(x+4)^2 + y^2} = 5 + \\dfrac{4}{5}x$。△ $= \\dfrac45$。中心の問いへ：**根号が $2$ つあった条件が、$2$ 乗 $1$ 回で根号 $1$ つに減った。右辺の $5$ は和 $10$ の半分**。",
        },
      ],
      formulaPreview: "√((x+4)² + y²) = 5 + (4/5)x",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "前題の式 $\\sqrt{(x+4)^2 + y^2} = 5 + \\dfrac{4}{5}x$ の両辺をもう一度 $2$ 乗して整理すると、根号のない式\n\n$$\\frac{x^2}{\\square} + \\frac{y^2}{\\triangle} = 1$$\n\n（右辺は $1$）になります。△ を求めましょう。",
      answer: 9,
      answerDisplay: "9",
      unit: "",
      unknownLabel: "△（$y^2$ の分母）",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題でやった手つきを、もう一度使える？" },
        { layer: 2, text: "前題と変わったのは、根号が $1$ つだけになっていること。" },
        {
          layer: 3,
          text: "$2$ 乗して $(x+4)^2 + y^2 = 25 + 8x + \\dfrac{16}{25}x^2$。左辺は $x^2 + 8x + 16 + y^2$ なので $8x$ が消え、$x^2 - \\dfrac{16}{25}x^2 + y^2 = 25 - 16$、つまり $\\dfrac{9}{25}x^2 + y^2 = 9$。両辺を $9$ で割って $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$。△ $= 9$。中心の問いへ：**□ $= 25$ は和の半分 $5$ の $2$ 乗。△ $= 9$ は $5^2 - 4^2$——和の半分と、中心から F までの距離 $4$ から、三平方の形で出てくる**。",
        },
      ],
      formulaPreview: "x²/25 + y²/9 = 1（25 = 5²、9 = 5² − 4²）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "このように「$2$ 点からの距離の和が一定の点の集まり」を **[楕円]**、その $2$ 点を楕円の **[焦点]** といいます。\n\n楕円 $\\dfrac{x^2}{49} + \\dfrac{y^2}{24} = 1$ の焦点は、$x$ 軸上の $2$ 点 $(c,\\ 0)$、$(-c,\\ 0)$（$c > 0$）です。$c$ を求めましょう。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "$c$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は $2$ 点から式を作った。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、式が先に与えられて、$2$ 点の位置が問われていること。" },
        {
          layer: 3,
          text: "$x$ 軸上の端は $(\\pm7,\\ 0)$ なので、step2 と同じ見方で距離の和は端から端までの $14$。$y$ 軸上の点 $(0,\\ \\sqrt{24})$ は $2$ つの焦点から同じ距離にあるので、どちらまでも $14 \\div 2 = 7$。原点・焦点 $(c, 0)$・$(0, \\sqrt{24})$ の直角三角形で $c^2 + 24 = 7^2$、$c^2 = 25$、$c = 5$。確かめ：端 $(7, 0)$ で $(7 - 5) + (7 + 5) = 14$。中心の問いへ：**□ は和の半分の $2$ 乗、△ との差が焦点までの距離の $2$ 乗。式から焦点が読み戻せる**。",
        },
      ],
      formulaPreview: "和 = 14 → (0, √24) から焦点まで 7 → c² = 49 − 24 = 25 → c = 5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "楕円 $2x^2 + 7y^2 = 56$ の長軸の長さ（$x$ 軸上の $2$ つの端のあいだの長さ）を求めましょう。",
      answer: 4 * Math.sqrt(7),
      answerDisplay: "4√7",
      unit: "",
      unknownLabel: "長軸の長さ",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、式が「右辺が $1$」の形になっていないこと。" },
        {
          layer: 3,
          text: "両辺を $56$ で割ると $\\dfrac{x^2}{28} + \\dfrac{y^2}{8} = 1$。$y = 0$ とおくと $x^2 = 28$、$x = \\pm\\sqrt{28} = \\pm2\\sqrt7$。端から端までは $4\\sqrt7$。中心の問いへ：**右辺を $1$ にそろえると、$x^2$ の分母が端の位置（の $2$ 乗）を語る。長軸の長さは、その楕円の距離の和そのもの**。",
        },
      ],
      formulaPreview: "x²/28 + y²/8 = 1 → 端 ±2√7 → 長軸 4√7",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$x$ 軸上の $2$ 点 F$(12,\\ 0)$、F′$(-12,\\ 0)$ を焦点とする楕円が、点 P$\\left(5,\\ \\dfrac{60}{13}\\right)$ を通ります。この楕円の方程式を\n\n$$\\frac{x^2}{\\square} + \\frac{y^2}{\\triangle} = 1$$\n\nの形に書いたときの □ を求めましょう。",
      answer: 169,
      answerDisplay: "169",
      unit: "",
      unknownLabel: "□（$x^2$ の分母）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。step5 は式から焦点を読んだ。今度は何が与えられている？" },
        { layer: 2, text: "step5 と変わったのは、式の代わりに、焦点と曲線の上の $1$ 点が与えられていること。" },
        {
          layer: 3,
          text: "楕円の上の点なら、焦点までの距離の和が一定。P で測る：$\\mathrm{PF} = \\sqrt{49 + \\dfrac{3600}{169}} = \\sqrt{\\dfrac{11881}{169}} = \\dfrac{109}{13}$、$\\mathrm{PF'} = \\sqrt{289 + \\dfrac{3600}{169}} = \\sqrt{\\dfrac{52441}{169}} = \\dfrac{229}{13}$。和は $\\dfrac{338}{13} = 26$。和の半分 $13$ の $2$ 乗が □ なので □ $= 169$（△ は $169 - 12^2 = 25$）。中心の問いへ：**和は、曲線の上のどの $1$ 点で測っても同じ。だから $1$ 点と焦点があれば、式が決まる**。",
        },
      ],
      formulaPreview: "PF ＋ PF′ = 109/13 + 229/13 = 26 → □ = 13² = 169",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "楕円 $\\dfrac{x^2}{11} + \\dfrac{y^2}{36} = 1$ の $2$ つの焦点を考えます。$x$ 軸上の点 A$(6,\\ 0)$ から、$2$ つの焦点までの距離の和を求めましょう。",
      answer: 2 * Math.sqrt(61),
      answerDisplay: "2√61",
      unit: "",
      unknownLabel: "A から $2$ つの焦点までの距離の和",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。この楕円の式には、これまでと違うところがない？" },
        { layer: 2, text: "step5 と変わったのは、$y^2$ の分母のほうが $x^2$ の分母より大きいこと。" },
        {
          layer: 3,
          text: "端は $x$ 軸上が $(\\pm\\sqrt{11},\\ 0)$、$y$ 軸上が $(0,\\ \\pm6)$ で、長いほうは $y$ 軸の向き。距離の和は長いほうの端から端までの $12$ で、焦点は**長いほうの軸、つまり $y$ 軸の上**にある。$x$ 軸上の点 $(\\sqrt{11},\\ 0)$ からは $2$ つの焦点まで同じ距離 $6$ なので、焦点 $(0,\\ \\pm c)$ について $c^2 + 11 = 36$、$c = 5$。A$(6, 0)$ から $(0, 5)$ と $(0, -5)$ まではどちらも $\\sqrt{36 + 25} = \\sqrt{61}$。和は $2\\sqrt{61}$。**焦点を $x$ 軸上の $(\\pm5,\\ 0)$ に置くと $1 + 11 = 12$ になって外れる**——$c = 5$ の値は合っていても、置く軸が違う。中心の問いへ：**焦点は分母の大きいほうの軸の上。式の数字は、焦点までの距離だけでなく、焦点の向きも語っている**。",
        },
      ],
      formulaPreview: "長いほうは y 軸 → 焦点 (0, ±5) → A(6, 0) から √61 + √61 = 2√61",
      figureMarker: "<<M3CV_TALL_ELLIPSE>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $4x^2 - 32x + 13y^2 + 26y + 25 = 0$ は楕円です。$2$ つの焦点のうち、$x$ 座標が大きいほうの $x$ 座標を求めましょう。",
      answer: 7,
      answerDisplay: "7",
      unit: "",
      unknownLabel: "焦点の $x$ 座標（大きいほう）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "step6 と比べてみよう。どちらも「右辺が $1$」の形ではない。何が加わった？" },
        { layer: 2, text: "step6 と変わったのは、$x$ と $y$ の $1$ 次の項があること。" },
        {
          layer: 3,
          text: "[平方完成] する：$4(x^2 - 8x) + 13(y^2 + 2y) + 25 = 0$、$4\\{(x-4)^2 - 16\\} + 13\\{(y+1)^2 - 1\\} + 25 = 0$、$4(x-4)^2 + 13(y+1)^2 = 52$。両辺を $52$ で割って $\\dfrac{(x-4)^2}{13} + \\dfrac{(y+1)^2}{4} = 1$。これは $\\dfrac{x^2}{13} + \\dfrac{y^2}{4} = 1$ を中心が $(4,\\ -1)$ に来るよう[平行移動]したもの。もとの楕円の焦点は $c^2 = 13 - 4 = 9$ で $(\\pm3,\\ 0)$。移すと $(4 \\pm 3,\\ -1)$、大きいほうの $x$ 座標は $7$。中心の問いへ：**中心が原点からずれていても、平方完成で中心を読めば、焦点は中心から測った同じ距離にある**。",
        },
      ],
      formulaPreview: "(x−4)²/13 + (y+1)²/4 = 1 → 中心 (4, −1)、c = 3 → x = 7",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$2$ 点 F$(2,\\ 1)$、F′$(2,\\ -5)$ からの距離の和が $10$ になる点 P の [軌跡] は楕円です。その方程式を\n\n$$\\frac{(x-p)^2}{\\square} + \\frac{(y-q)^2}{\\triangle} = 1$$\n\nの形に書いたときの □ を求めましょう。",
      answer: 16,
      answerDisplay: "16",
      unit: "",
      unknownLabel: "□（$(x-p)^2$ の分母）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は式から焦点を読んだ。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、式の代わりに $2$ つの焦点と距離の和が与えられていること。" },
        {
          layer: 3,
          text: "中心は F と F′ の中点 $(2,\\ -2)$、中心から焦点までの距離は $3$。$2$ 点は縦に並ぶので、焦点は縦の軸の上——長いほうは $y$ の向き。和 $10$ の半分 $5$ が縦の端までの距離なので △ $= 25$。横の端 $(2 + b,\\ -2)$ からは $2$ つの焦点まで同じ $5$ なので、$b^2 + 3^2 = 5^2$、$b^2 = 16$。□ $= 16$。式は $\\dfrac{(x-2)^2}{16} + \\dfrac{(y+2)^2}{25} = 1$。確かめ：点 $(6,\\ -2)$ は F・F′ まで $5$ ずつで和 $10$。中心の問いへ：**焦点と和が分かれば、中心・長いほうの軸・$2$ つの分母がすべて決まる。数Ⅱの軌跡で条件を式にしたのと同じ仕事を、この形で一度に済ませられる**。",
        },
      ],
      formulaPreview: "中心 (2, −2)、焦点まで 3、和の半分 5（縦）→ b² = 25 − 9 = 16",
    },
  ],
  derivation: `**中心の問い** ｜ $2$ 点からの距離の和が一定になる点を集めると、どんな曲線のどんな式になる？——**式のどの数字が、その『和』と $2$ 点の位置を語っている？**

────────

## 条件を式にする

数Ⅱでは、「$1$ 点からの距離が一定」を式にして円の方程式を作った（[円の方程式]・[軌跡]）。距離の条件を「$2$ 点からの距離の**和**が一定」に取り替えると、[楕円] が生まれる。

$2$ 点 F$(c,\\ 0)$、F′$(-c,\\ 0)$ からの距離の和が $2a$（$a > c > 0$）になる点 P$(x,\\ y)$ の条件は

$$\\sqrt{(x+c)^2 + y^2} + \\sqrt{(x-c)^2 + y^2} = 2a$$

根号が $2$ つあるので、片方を移して $2$ 乗する（step3）。根号は $1$ つに減り、もう一度 $2$ 乗すると根号が消える（step4）。たどり着く形は

$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\qquad (b^2 = a^2 - c^2)$$

## ここが胚細胞：式の数字が、条件を語りかえす

- **$a^2$**（大きいほうの分母）：和の半分の $2$ 乗。和は、曲線の端から端までの長さ（長軸の長さ）$2a$ に等しい（step2）
- **$b^2$**（小さいほうの分母）：短いほうの端までの距離の $2$ 乗
- **焦点までの距離 $c$**：$y$ 軸上の点から $2$ つの焦点までは同じ距離 $a$ なので、原点・焦点・その点の直角三角形で $c^2 + b^2 = a^2$

だから、式を見れば焦点が読め（step5・9）、焦点と和（あるいは焦点と $1$ 点）が分かれば式が書ける（step7・10）。そして **焦点は、分母の大きいほうの軸の上** にある（step8）。

## Step の道筋

- **step1・2**：数の点で $2$ 点からの距離を足す。軸上でない点でも、軸上の端でも、和は同じ
- **step3・4**：和の条件を文字で式にし、$2$ 乗 $2$ 回で根号を消す
- **step5・6**：式から焦点・長軸を読む（右辺を $1$ にそろえる）
- **step7**：焦点と曲線の上の $1$ 点から、和を測って式を決める
- **step8（山場）**：$y^2$ の分母のほうが大きい楕円。焦点は $y$ 軸の上
- **step9**：$1$ 次の項がある式は、平方完成で中心を読む
- **step10**：焦点が縦に並ぶ $2$ 点と和から、式を作る（数Ⅱの軌跡と合流）

────────

**もっと深く**

**忘れても導ける。** 焦点の位置の式を覚えていなくても、短いほうの軸の端に立てばよい。そこから $2$ つの焦点までは同じ距離で、その距離は和の半分。あとは三平方の定理である。

**円は、$2$ つの焦点が重なった楕円。** $c = 0$ にすると $b = a$ になり、式は $x^2 + y^2 = a^2$——$1$ 点からの距離が一定の円にもどる。

**楕円の上の点を、$2$ つの焦点から測る。** step1 の点では PF $= \\dfrac{13}{5}$、PF′ $= \\dfrac{37}{5}$ だった。この $2$ つは、$x$ 座標 $3$ を使って $5 - \\dfrac45\\times3$ と $5 + \\dfrac45\\times3$ と書ける。step3 で出てきた「$5 + \\dfrac45x$」は、じつは F′ からの距離そのものである（step3 の根号の中は、F′ までの距離の $2$ 乗）。楕円の上では、焦点までの距離が $x$ の $1$ 次式で書ける。

**この先の景色。** 惑星は、太陽を $1$ つの焦点とする楕円の上を回る（ケプラーの第 $1$ 法則）。焦点はこの章で何度も主役になる——次の系列では楕円を円から読み直し、そのあと距離の**差**・**点と直線**の条件で、仲間の曲線が現れる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「楕円の方程式」の構成（距離の和の条件を $2$ 乗 $2$ 回で式にする・焦点を三平方で読む・平行移動した楕円・焦点と和から方程式を作る〔練習問題1(2) の型を参考にし、与件を「焦点と曲線上の $1$ 点」に替えた〕）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

$2$ 点からの距離の和が一定の点の集まりは、$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ の楕円になる。大きいほうの分母 $a^2$ は和の半分の $2$ 乗、小さいほうの分母との差 $a^2 - b^2$ は焦点までの距離の $2$ 乗。焦点は、分母の大きいほうの軸の上にある。

式は条件の書きかえだから、数字を読めば条件が戻ってくる。`,
};

/** M3CV2: 楕円を円から読む——一方向に伸ばした円。
 *  step1〜3：円 x² + y² = r² を一方向に k 倍した式（y → x²/4 + y²/25 の 25／x → x²/49 + y²/9 の 49／逆：x²/18 + y²/50 は円 x² + y² = 18 の y を 5/3 倍）
 *  step4（＋α）x²/6 + y²/54 の面積 18π（円 6π を y の向きに 3 倍。第7章の積分でも同じ値＝Q3）
 *  step5（質）円の角 θ の点を y だけ 4/7 倍して x²/49 + y²/16 の上へ。θ = π/3 で y = 2√3
 *  山場 step6（C12 ②・C14）x²/36 + y²/4 の θ = π/6 の点 (3√3, 1)：OP の tan は √3/9。素朴に tan θ = √3/3 と読むと外れる（R1 I1-11：step5 と別の θ・別の楕円）
 *  step7（逆）x²/64 + y²/9 の点 (−4, 3√3/2) の θ = 2π/3（cos θ = −1/2 の解は 2π/3 と 4π/3。sin > 0 で 1 つ）
 *  step8（複合・C13 2倍角 trig_double_half_01）x²/50 + y²/8 に内接する長方形の最大 2ab = 40
 *  step9（複合・C13 合成 trig_composition_01）x²/12 + y²/4 の上で x + 3y の最大 4√3
 *  step10（＋α）x²/16 + y²/25 の x ≥ 2 の部分の面積 20π/3 − 5√3（円に縮めて扇形 − 三角形、5/4 倍で戻す。sympy の積分と一致）
 *  答え：25・49・5/3・18π・2√3・√3/9・2π/3・40・4√3・20π/3 − 5√3（すべて相異なる）。
 *  形（比）は 2:5・7:3・3:5・1:3・7:4・3:1・8:3・5:2・√3:1・4:5。原典 応1 の比 2:1・第5章の 3:2（x²/9 + y²/4・(2cos t, sin t)）とその入れかえは使っていない。 */
export const M3CV_STRETCH_SERIES: LearnerSeries = {
  id: "math3_cv_stretch_01",
  title: "楕円を円から読む——一方向に伸ばした円",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 円を一方向にだけ伸ばすと楕円になる。円で知っていること（点の表し方・面積・最大値）は、楕円ではどう書きかわるか。$10$ 問で確かめる。",
  patternId: "M3CV2",
  unit: "math_3",
  revelationLabel:
    "**$\\theta$ は円の上で測った角。楕円の上の点を原点から見た角とは、伸ばしたぶんだけずれる**",
  drivingQuestion:
    "楕円が円を一方向に伸ばしたものなら、円で知っていること（点の表し方・面積・最大値）は、楕円ではどう書きかわる？——**伸ばしても変わらないものは何？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円 $x^2 + y^2 = 4$ の上の各点を、$x$ 座標はそのままに、$y$ 座標だけ $\\dfrac52$ 倍した点に移します。移った点の集まりは、曲線\n\n$$\\frac{x^2}{\\square} + \\frac{y^2}{\\triangle} = 1$$\n\nになります。△ を求めましょう。",
      answer: 25,
      answerDisplay: "25",
      unit: "",
      unknownLabel: "△（$y^2$ の分母）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "移る前の点と、移った後の点は、座標どうしがどんな関係にある？ その関係から、移った点の集まりの式は作れるかな？",
        },
        {
          layer: 2,
          text: "数Ⅱで、グラフをずらしたとき、式の $x$ や $y$ を何に置きかえた？（[平行移動]）",
        },
        {
          layer: 3,
          text: "円の上の点を $(X,\\ Y)$、移った点を $(x,\\ y)$ とすると $x = X$、$y = \\dfrac52Y$。逆に $Y = \\dfrac25y$。$(X, Y)$ は円の上なので $X^2 + Y^2 = 4$、つまり $x^2 + \\left(\\dfrac25y\\right)^2 = 4$。$x^2 + \\dfrac{4}{25}y^2 = 4$ の両辺を $4$ で割って $\\dfrac{x^2}{4} + \\dfrac{y^2}{25} = 1$。△ $= 25$。中心の問いへの最初の部分回答：**$y$ の向きに $\\dfrac52$ 倍すると、式の $y$ が $\\dfrac25y$ に置きかわる。円が楕円になり、$y^2$ の分母は半径 $2$ の $\\dfrac52$ 倍の $2$ 乗になる**。",
        },
      ],
      formulaPreview: "Y = (2/5)y を円の式へ → x²/4 + y²/25 = 1",
      figureMarker: "<<M3CV_CIRCLE_STRETCH>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円 $x^2 + y^2 = 9$ の上の各点を、$y$ 座標はそのままに、$x$ 座標だけ $\\dfrac73$ 倍した点に移します。移った点の集まりを $\\dfrac{x^2}{\\square} + \\dfrac{y^2}{\\triangle} = 1$ と書いたときの □ を求めましょう。",
      answer: 49,
      answerDisplay: "49",
      unit: "",
      unknownLabel: "□（$x^2$ の分母）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、伸ばす向きが $x$ の向きになったこと。" },
        {
          layer: 3,
          text: "移る前を $(X, Y)$ とすると $x = \\dfrac73X$、$y = Y$。$X = \\dfrac37x$ を $X^2 + Y^2 = 9$ に入れて $\\dfrac{9}{49}x^2 + y^2 = 9$、両辺を $9$ で割って $\\dfrac{x^2}{49} + \\dfrac{y^2}{9} = 1$。□ $= 49$。中心の問いへ：**伸ばした向きの文字が、倍率の逆数倍に置きかわる。分母は「その向きの端までの長さ」の $2$ 乗**。",
        },
      ],
      formulaPreview: "X = (3/7)x → x²/49 + y²/9 = 1",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "楕円 $\\dfrac{x^2}{18} + \\dfrac{y^2}{50} = 1$ は、円 $x^2 + y^2 = 18$ を、$x$ 座標はそのままに $y$ 座標だけ $k$ 倍したものです（$k > 0$）。$k$ を求めましょう。",
      answer: 5 / 3,
      answerDisplay: "5/3",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は倍率から式を作った。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、式が先に与えられて、倍率が問われていること。" },
        {
          layer: 3,
          text: "円の $y$ の向きの端は $(0,\\ \\sqrt{18})$、楕円の $y$ の向きの端は $(0,\\ \\sqrt{50})$。$k$ 倍で端が移るので $k = \\dfrac{\\sqrt{50}}{\\sqrt{18}} = \\dfrac{5\\sqrt2}{3\\sqrt2} = \\dfrac53$。確かめ：$Y = \\dfrac35y$ を円の式に入れると $x^2 + \\dfrac{9}{25}y^2 = 18$、両辺を $18$ で割ると $\\dfrac{x^2}{18} + \\dfrac{y^2}{50} = 1$。中心の問いへ：**楕円の $2$ つの分母の比の平方根が、円から伸ばした倍率**。",
        },
      ],
      formulaPreview: "k = √50 / √18 = 5/3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "楕円 $\\dfrac{x^2}{6} + \\dfrac{y^2}{54} = 1$ で囲まれた部分の面積を求めましょう。",
      answer: 18 * Math.PI,
      answerDisplay: "18π",
      unit: "",
      unknownLabel: "囲まれた部分の面積",
      inputAffordances: ["pi"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        { layer: 2, text: "前題と変わったのは、問われているのが式や倍率でなく、囲まれた部分の面積であること。" },
        {
          layer: 3,
          text: "この楕円は、円 $x^2 + y^2 = 6$ を $y$ の向きに $\\dfrac{\\sqrt{54}}{\\sqrt6} = 3$ 倍したもの。図形を細い縦の帯に切ると、どの帯も高さだけが $3$ 倍になり、幅は変わらない。だから面積も $3$ 倍で、円の面積 $6\\pi$ の $3$ 倍の $18\\pi$。（第7章のように楕円の上半分 $y = 3\\sqrt{6 - x^2}$ を積分しても $2\\displaystyle\\int_{-\\sqrt6}^{\\sqrt6}3\\sqrt{6 - x^2}\\,dx = 3 \\times 6\\pi = 18\\pi$ で同じ値。）中心の問いへ：**一方向に $k$ 倍すると、面積も $k$ 倍。楕円の面積は $\\pi \\times$（$2$ つの端までの長さの積）**。",
        },
      ],
      formulaPreview: "円 x² + y² = 6（面積 6π）を y の向きに 3 倍 → 18π",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "円 $x^2 + y^2 = 49$ の上で、$x$ 軸の正の向きから角 $\\theta$ だけ回った点は $(7\\cos\\theta,\\ 7\\sin\\theta)$ です。この点を、$x$ 座標はそのままに $y$ 座標だけ $\\dfrac47$ 倍して、楕円 $\\dfrac{x^2}{49} + \\dfrac{y^2}{16} = 1$ の上に移します。$\\theta = \\dfrac{\\pi}{3}$ のとき、移った点の $y$ 座標を求めましょう。",
      answer: 2 * Math.sqrt(3),
      answerDisplay: "2√3",
      unit: "",
      unknownLabel: "移った点の $y$ 座標",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までは曲線全体を伸ばした。今度は何を伸ばしている？" },
        { layer: 2, text: "前題と変わったのは、伸ばすものが曲線全体でなく、角で指定した $1$ つの点になったこと。" },
        {
          layer: 3,
          text: "移る前の点は $\\left(7\\cos\\dfrac{\\pi}{3},\\ 7\\sin\\dfrac{\\pi}{3}\\right) = \\left(\\dfrac72,\\ \\dfrac{7\\sqrt3}{2}\\right)$。$y$ だけ $\\dfrac47$ 倍して $\\dfrac{7\\sqrt3}{2} \\times \\dfrac47 = 2\\sqrt3$。移った点は $\\left(\\dfrac72,\\ 2\\sqrt3\\right)$——つまり $(7\\cos\\theta,\\ 4\\sin\\theta)$ の形。確かめ：$\\dfrac{49/4}{49} + \\dfrac{12}{16} = \\dfrac14 + \\dfrac34 = 1$。中心の問いへ：**楕円の上の点は、円の角 $\\theta$ を使って $(a\\cos\\theta,\\ b\\sin\\theta)$ と書ける（[媒介変数表示]）。$\\theta$ は、伸ばす前の円の上で測った角**。",
        },
      ],
      formulaPreview: "(7cos θ, 7sin θ) → (7cos θ, 4sin θ)、θ = π/3 で y = 2√3",
      figureMarker: "<<M3CV_PARAM_LIFT>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "楕円 $\\dfrac{x^2}{36} + \\dfrac{y^2}{4} = 1$ の上の点を、前題と同じように $(6\\cos\\theta,\\ 2\\sin\\theta)$ と表します。$\\theta = \\dfrac{\\pi}{6}$ の点を P とし、線分 OP が $x$ 軸の正の向きとなす角を $\\varphi$ とします（O は原点）。$\\tan\\varphi$ を求めましょう。",
      answer: Math.sqrt(3) / 9,
      answerDisplay: "√3/9",
      unit: "",
      unknownLabel: "$\\tan\\varphi$",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが点の座標でなく、原点から見た点の向きであること。" },
        {
          layer: 3,
          text: "P $= \\left(6\\cos\\dfrac{\\pi}{6},\\ 2\\sin\\dfrac{\\pi}{6}\\right) = (3\\sqrt3,\\ 1)$。$\\tan\\varphi = \\dfrac{1}{3\\sqrt3} = \\dfrac{\\sqrt3}{9}$。**$\\tan\\dfrac{\\pi}{6} = \\dfrac{\\sqrt3}{3}$ と答えると外れる**——$\\theta$ は、伸ばす（ここでは縮める）前の円 $x^2 + y^2 = 36$ の上で測った角で、$y$ だけを $\\dfrac13$ 倍した P は、原点から見ると角が浅くなる。$\\tan\\varphi = \\dfrac{2}{6}\\tan\\theta$。中心の問いへ：**伸ばしても、$x$ 座標と「$\\theta$ の目盛り」は変わらない。変わるのは、点を原点から見た向き**。",
        },
      ],
      formulaPreview: "P = (3√3, 1) → tan φ = 1/(3√3) = √3/9（tan θ = √3/3 ではない）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "楕円 $\\dfrac{x^2}{64} + \\dfrac{y^2}{9} = 1$ の上の点 $\\left(-4,\\ \\dfrac{3\\sqrt3}{2}\\right)$ を $(8\\cos\\theta,\\ 3\\sin\\theta)$ と表すときの $\\theta$ を、$0 \\le \\theta < 2\\pi$ の範囲で求めましょう。",
      answer: (2 * Math.PI) / 3,
      answerDisplay: "2π/3",
      unit: "",
      unknownLabel: "$\\theta$",
      inputAffordances: ["pi"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。step5 は角から点を出した。今度は向きがどう変わった？" },
        { layer: 2, text: "step5 と変わったのは、点が先に与えられて、角 $\\theta$ が問われていること。" },
        {
          layer: 3,
          text: "$8\\cos\\theta = -4$ より $\\cos\\theta = -\\dfrac12$、$3\\sin\\theta = \\dfrac{3\\sqrt3}{2}$ より $\\sin\\theta = \\dfrac{\\sqrt3}{2}$。$0 \\le \\theta < 2\\pi$ で $\\cos\\theta = -\\dfrac12$ になるのは $\\dfrac{2\\pi}{3}$ と $\\dfrac{4\\pi}{3}$ の $2$ つで、$\\sin\\theta > 0$ なのは $\\dfrac{2\\pi}{3}$ だけ。$\\theta = \\dfrac{2\\pi}{3}$。（原点から見た点の向きは $\\tan\\varphi = \\dfrac{3\\sqrt3/2}{-4}$ で、$\\dfrac{2\\pi}{3}$ の向きとは違う。）中心の問いへ：**$\\theta$ は、$x$ 座標と $y$ 座標をそれぞれの端までの長さで割って、円の角として読み戻す**。",
        },
      ],
      formulaPreview: "cos θ = −1/2、sin θ = √3/2 → θ = 2π/3",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "楕円 $\\dfrac{x^2}{50} + \\dfrac{y^2}{8} = 1$ に内接し、辺が座標軸に平行な長方形を考えます（$4$ つの頂点が楕円の上にある）。この長方形の面積の最大値を求めましょう。",
      answer: 40,
      answerDisplay: "40",
      unit: "",
      unknownLabel: "長方形の面積の最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で使った点の表し方は、ここでも使える？" },
        { layer: 2, text: "前題と変わったのは、点 $1$ つでなく、長方形の面積の最大を問われていること。" },
        {
          layer: 3,
          text: "第 $1$ 象限の頂点を $(5\\sqrt2\\cos\\theta,\\ 2\\sqrt2\\sin\\theta)$（$0 < \\theta < \\dfrac{\\pi}{2}$）とおくと、長方形の横は $10\\sqrt2\\cos\\theta$、縦は $4\\sqrt2\\sin\\theta$。面積 $= 80\\sin\\theta\\cos\\theta = 40\\sin2\\theta$（[2倍角の公式]）。$\\sin2\\theta$ の最大は $1$（$\\theta = \\dfrac{\\pi}{4}$）なので、最大値は $40$。（円で考えると：円に内接する長方形の最大は正方形。それを伸ばしても「最大」は保たれる。）中心の問いへ：**円の角 $\\theta$ で点を表せば、楕円の上の問題も、三角関数の最大・最小にもどせる**。",
        },
      ],
      formulaPreview: "面積 = 80 sin θ cos θ = 40 sin 2θ → 最大 40",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "点 $(x,\\ y)$ が楕円 $\\dfrac{x^2}{12} + \\dfrac{y^2}{4} = 1$ の上を動くとき、$x + 3y$ の最大値を求めましょう。",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      unit: "",
      unknownLabel: "$x + 3y$ の最大値",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の手つきは、ここでも使える？" },
        { layer: 2, text: "前題と変わったのは、最大にするものが面積でなく、$x$ と $y$ の $1$ 次式であること。" },
        {
          layer: 3,
          text: "$(x,\\ y) = (2\\sqrt3\\cos\\theta,\\ 2\\sin\\theta)$ とおくと $x + 3y = 2\\sqrt3\\cos\\theta + 6\\sin\\theta$。[三角関数の合成] で $\\sqrt{(2\\sqrt3)^2 + 6^2}\\sin(\\theta + \\alpha) = \\sqrt{48}\\sin(\\theta + \\alpha) = 4\\sqrt3\\sin(\\theta + \\alpha)$。最大値は $4\\sqrt3$。中心の問いへ：**楕円の上を動く点も、角 $\\theta$ $1$ つで表せば、$1$ 変数の三角関数の最大になる**。",
        },
      ],
      formulaPreview: "2√3 cos θ + 6 sin θ = 4√3 sin(θ + α) → 最大 4√3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "楕円 $\\dfrac{x^2}{16} + \\dfrac{y^2}{25} = 1$ の内側で、直線 $x = 2$ より右にある部分の面積を求めましょう。",
      answer: (20 * Math.PI) / 3 - 5 * Math.sqrt(3),
      answerDisplay: "20π/3-5√3",
      unit: "",
      unknownLabel: "直線 $x = 2$ より右の部分の面積",
      inputAffordances: ["pi", "sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。step4 の考え方は、ここでも使える？" },
        { layer: 2, text: "step4 と変わったのは、楕円全体でなく、直線で切った一部分の面積であること。" },
        {
          layer: 3,
          text: "$y$ の向きに $\\dfrac45$ 倍して、円 $x^2 + y^2 = 16$ にもどす。直線 $x = 2$ はそのまま。円で $x \\ge 2$ の部分：交点は $(2,\\ \\pm2\\sqrt3)$ で、中心角は $\\dfrac{2\\pi}{3}$。扇形 $\\dfrac12 \\cdot 16 \\cdot \\dfrac{2\\pi}{3} = \\dfrac{16\\pi}{3}$ から三角形 $\\dfrac12 \\cdot 4 \\cdot 4 \\cdot \\sin\\dfrac{2\\pi}{3} = 4\\sqrt3$ を引いて $\\dfrac{16\\pi}{3} - 4\\sqrt3$。$y$ の向きに $\\dfrac54$ 倍してもどすと、面積も $\\dfrac54$ 倍で $\\dfrac{20\\pi}{3} - 5\\sqrt3$。中心の問いへ：**楕円の問題は、円に縮めて解き、伸ばしてもどせる。面積は倍率どおりに伸び、直線は直線のまま**。",
        },
      ],
      formulaPreview: "円で (16π/3 − 4√3) → ×5/4 → 20π/3 − 5√3",
    },
  ],
  derivation: `**中心の問い** ｜ 楕円が円を一方向に伸ばしたものなら、円で知っていること（点の表し方・面積・最大値）は、楕円ではどう書きかわる？——**伸ばしても変わらないものは何？**

────────

## 一方向に伸ばすと、式の文字が置きかわる

円 $x^2 + y^2 = r^2$ の上の点を、$x$ 座標はそのままに $y$ 座標だけ $k$ 倍すると、移った点 $(x,\\ y)$ のもとの点は $\\left(x,\\ \\dfrac{y}{k}\\right)$。だから式の $y$ が $\\dfrac yk$ に置きかわり

$$x^2 + \\left(\\frac{y}{k}\\right)^2 = r^2 \\quad\\Longleftrightarrow\\quad \\frac{x^2}{r^2} + \\frac{y^2}{(kr)^2} = 1$$

前の系列で「$2$ 点からの距離の和」から作った [楕円] と同じ形である（step1〜3）。

## ここが胚細胞：伸ばしても変わらないもの、変わるもの

- **面積**：縦の帯の高さがすべて $k$ 倍になるので、面積も $k$ 倍（step4・10）。楕円 $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ の面積は $\\pi ab$
- **点の表し方**：円の上の角 $\\theta$ の点 $(a\\cos\\theta,\\ a\\sin\\theta)$ を伸ばすと $(a\\cos\\theta,\\ b\\sin\\theta)$（step5）。$\\theta$ の目盛りは伸ばしても変わらない
- **原点から見た角**：$y$ だけを伸ばすので、原点から見た点の向きは変わる。$\\tan\\varphi = \\dfrac ba\\tan\\theta$（step6・7）
- **最大・最小**：$\\theta$ $1$ つで点を表せば、三角関数の最大・最小にもどせる（step8・9）

## Step の道筋

- **step1〜3**：円を一方向に伸ばした式と、その逆
- **step4**：面積は倍率どおりに伸びる
- **step5（質的変化）**：円の角 $\\theta$ で、楕円の上の点を表す
- **step6（山場）**：$\\theta$ は原点から見た角ではない
- **step7**：点から $\\theta$ を読み戻す
- **step8・9**：$\\theta$ で表して、三角関数の最大へ（数Ⅱ の $2$ 倍角・合成と合流）
- **step10**：円に縮めて扇形で解き、伸ばしてもどす

────────

**もっと深く**

**忘れても導ける。** $(a\\cos\\theta,\\ b\\sin\\theta)$ を覚えていなくても、「円の上の点を一方向に伸ばした」と思い出せば書ける。面積 $\\pi ab$ も、半径 $a$ の円の面積を $\\dfrac ba$ 倍したものである。

**伸ばしても保たれるもの。** 直線は直線に、線分の中点は中点に、平行な $2$ 直線は平行なままに移る。円の接線は楕円の接線に移る（接するという「$1$ 点だけを共有する」性質は伸ばしても変わらない）。だから、円で解ける問題は、楕円に移しても解ける。**一般には保たれないもの**は、長さ・角・直交（伸ばす向きに平行な線分の長さは $k$ 倍、垂直な線分は変わらない）。

**周の長さは、倍率を掛けるだけでは出ない。** 面積は倍率どおりに伸びるのに、周の長さは、周のどの部分も同じ割合で伸びるわけではない（$y$ の向きに伸ばすと、曲線が横向きに走る部分はほとんど伸びず、縦向きに走る部分ほど大きく伸びる）。楕円の周の長さは高校で学ぶ関数では式に書けず、大学で「楕円積分」という新しい関数を使う（第7章「曲線の長さ」の系列の「この先の景色」）。

**この先の景色。** 一方向に伸ばす・回す・ずらす、をまとめて扱うのが大学の「線形変換」（行列）である。円を線形変換で移すと、楕円になる（つぶれてしまう変換なら線分か点）。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「楕円の方程式」のコメント（楕円を円の一方向への拡大としてみる）と応用問題1 の精講・注意（楕円の点を $(a\\cos\\theta, b\\sin\\theta)$ と表す・$\\theta$ は原点から見た角ではない〔step6 は同じ点を問う形にした〕）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

円を一方向に $k$ 倍すると、式ではその向きの文字が $\\dfrac1k$ 倍に置きかわり、面積は $k$ 倍になる。円の上の角 $\\theta$ は、伸ばしたあとも点の目盛りとして使えて、楕円の上の点は $(a\\cos\\theta,\\ b\\sin\\theta)$。

変わるのは、原点から見た点の向き。$\\theta$ は円の上で測った角で、楕円の点の見える角とは伸ばしたぶんだけずれる。`,
};

/** M3CV3: 双曲線——2 点からの距離の差を式にする。
 *  step1〜2：F(10, 0)・F′(−10, 0)、曲線 x²/36 − y²/64 = 1 の上の点 P(9, 4√5)〔重い：21 − 9〕→ 頂点 (6, 0)〔軽い：16 − 4〕で差 12（追補13）
 *  山場 step3（C12 ②・初めて双曲線の焦点に出会う step）x²/25 − y²/16 = 1：焦点 √41。楕円の √(25 − 16) = 3 を持ち込むと外れる
 *  step4 9x² − 7y² = 63 → x²/7 − y²/9 = 1 の焦点 4（初版は焦点 3 で、step3 の誤概念の値 3 と同じだった＝cross_refs ★★ で直した）／step5 x²/20 − y²/45 の漸近線の傾き 3/2
 *  step6（質）x²/18 − y²/32 = −1 の頂点の y 座標 4√2（右辺 −1 で上下に開く）
 *  step7（逆）頂点 (2, 0)・漸近線の傾き 5/2 → 焦点 √29（原典 練2(2) の「焦点と漸近線 → 方程式」と与件・向きを替えた）
 *  step8（複合・C13 第1章）y = 6/x の上の点 (2, 3) で、F(2√3, 2√3)・F′(−2√3, −2√3) からの距離の差 4√3（√(37 + 20√3) − √(37 − 20√3)。
 *    2 乗すると 74 − 2√169 = 48）。辞書 双曲線 の例 y = 8/x を避けた
 *  step9（＋α）7x² − 14x − 9y² − 36y − 92 = 0 ＝ (x−1)²/9 − (y+2)²/7 = 1：焦点の x 座標の大きいほう 5
 *  step10（複合）漸近線 y = ±(2/3)x・点 (6, 2√3) を通る（右辺 1）→ a² = 9
 *  答え：12・12・√41・4・3/2・4√2・√29・4√3・5・9。step8 の x² − y² = 12 は collide の x² − y² = 1（練6）に前方一致で当たるが別の式（偽陽性）。原典の (16, 9)・(2, 3)・(5, 20)・(2, 1)・(1, 1)・焦点 5 は使っていない。 */
export const M3CV_HYPERBOLA_SERIES: LearnerSeries = {
  id: "math3_cv_hyperbola_01",
  title: "双曲線——2 点からの距離の差を式にする",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 距離の和を差に取り替えると、曲線と式はどう変わるか。楕円の式と、どこが同じでどこが違うか。$10$ 問で確かめる。",
  patternId: "M3CV3",
  unit: "math_3",
  revelationLabel:
    "**双曲線の焦点までの距離は $\\sqrt{a^2 + b^2}$**——楕円のときと三平方の向きが入れかわり、焦点は頂点より外にある",
  drivingQuestion:
    "$2$ 点からの距離の**差**が一定になる点を集めると、曲線と式はどう変わる？——**楕円の式と、どこが同じでどこが違う？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2$ 点 F$(10,\\ 0)$、F′$(-10,\\ 0)$ と、ある曲線の上の点 P$(9,\\ 4\\sqrt5)$ があります。P から F′ までの距離から、P から F までの距離を引いた差 PF′ − PF を求めましょう。",
      answer: 12,
      answerDisplay: "12",
      unit: "",
      unknownLabel: "PF′ − PF",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "前の系列では $2$ 点からの距離を足した。今度は引く。$2$ つの距離は、どう出せばいい？",
        },
        {
          layer: 2,
          text: "楕円は $2$ 点からの距離の和が一定の曲線だった。和を差に取り替えたら、何が起きる？（[楕円]）",
        },
        {
          layer: 3,
          text: "$\\mathrm{PF} = \\sqrt{(9-10)^2 + (4\\sqrt5)^2} = \\sqrt{1 + 80} = 9$、$\\mathrm{PF'} = \\sqrt{(9+10)^2 + 80} = \\sqrt{361 + 80} = \\sqrt{441} = 21$。差は $21 - 9 = 12$。中心の問いへの最初の部分回答：**この点では、$2$ 点からの距離の差がちょうど $12$。曲線の上の別の点でも、差は同じだろうか**。",
        },
      ],
      formulaPreview: "PF = 9、PF′ = 21 → PF′ − PF = 12",
      figureMarker: "<<M3CV_TWO_PINS_DIFF>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の曲線は、$x$ 軸と点 V$(6,\\ 0)$ で交わります。V についても差 VF′ − VF を求めましょう。",
      answer: 12,
      answerDisplay: "12",
      unit: "",
      unknownLabel: "VF′ − VF",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、曲線の上の点が $x$ 軸の上に来たこと。" },
        {
          layer: 3,
          text: "$\\mathrm{VF} = 10 - 6 = 4$、$\\mathrm{VF'} = 6 - (-10) = 16$。差は $16 - 4 = 12$——前題と同じ値。この点 V を双曲線の **頂点** という。反対側の曲線は $(-6,\\ 0)$ で $x$ 軸と交わり、差 $12$ は $2$ つの頂点のあいだの長さに等しい（F′ から $(-6, 0)$ までの $4$ が、F から V までの $4$ と同じだから）。中心の問いへ：**差が $12$ で一定の点の集まりらしい。差は、$2$ つの頂点のあいだの長さに等しい**。",
        },
      ],
      formulaPreview: "VF = 4、VF′ = 16 → 差 12（前題と同じ・2 つの頂点のあいだの長さ）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$2$ 点からの距離の差が一定の点の集まりを [双曲線] といい、その $2$ 点を双曲線の [焦点] といいます。$2$ つの焦点が $x$ 軸上の $(c,\\ 0)$、$(-c,\\ 0)$（$c > 0$）にあるとき、双曲線は\n\n$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$\n\nの形に書けます。双曲線 $\\dfrac{x^2}{25} - \\dfrac{y^2}{16} = 1$ の $c$ を求めましょう。",
      answer: Math.sqrt(41),
      answerDisplay: "√41",
      unit: "",
      unknownLabel: "$c$",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は焦点から差を測った。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、式が先に与えられて、焦点の位置が問われていること。" },
        {
          layer: 3,
          text: "頂点は $(\\pm5,\\ 0)$ なので、差は頂点のあいだの $10$（$= 2a$）。焦点の位置は、差の条件を式にしたときの形から読む。$\\sqrt{(x+c)^2 + y^2} - \\sqrt{(x-c)^2 + y^2} = 10$ を楕円と同じように $2$ 乗 $2$ 回で整理すると $\\dfrac{x^2}{25} - \\dfrac{y^2}{c^2 - 25} = 1$。これが与えられた式と同じなので $c^2 - 25 = 16$、$c^2 = 41$、$c = \\sqrt{41}$。**楕円のつもりで $\\sqrt{25 - 16} = 3$ と答えると外れる**——楕円では $a^2 - c^2 = b^2$ だったが、双曲線では $c^2 - a^2 = b^2$。焦点は頂点 $(5, 0)$ より外にある。確かめ：頂点 $(5, 0)$ で $(5 + \\sqrt{41}) - (\\sqrt{41} - 5) = 10$。中心の問いへ：**差の条件の式は、楕円の式の $+$ が $-$ になった形。焦点までの距離は $\\sqrt{a^2 + b^2}$ で、三平方の向きが入れかわる**。",
        },
      ],
      formulaPreview: "c² − 25 = 16 → c = √41（楕円の √(25 − 16) = 3 ではない）",
      figureMarker: "<<M3CV_HYPERBOLA_ASK>>",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "双曲線 $9x^2 - 7y^2 = 63$ の焦点は $x$ 軸上の $(\\pm c,\\ 0)$ です。$c$ を求めましょう（$c > 0$）。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$c$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、式が「右辺が $1$」の形になっていないこと。" },
        {
          layer: 3,
          text: "両辺を $63$ で割って $\\dfrac{x^2}{7} - \\dfrac{y^2}{9} = 1$。$c^2 = 7 + 9 = 16$、$c = 4$。中心の問いへ：**右辺を $1$ にそろえれば、$2$ つの分母の和が焦点までの距離の $2$ 乗**。",
        },
      ],
      formulaPreview: "x²/7 − y²/9 = 1 → c² = 7 + 9 = 16 → c = 4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "双曲線 $\\dfrac{x^2}{20} - \\dfrac{y^2}{45} = 1$ は、原点から遠ざかるにつれて $2$ 本の直線に限りなく近づきます（この直線を [漸近線] といいます）。$2$ 本のうち、傾きが正のものの傾きを求めましょう。",
      answer: 3 / 2,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "傾きが正の漸近線の傾き",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が加わった？" },
        { layer: 2, text: "前題と変わったのは、問われているのが焦点でなく、遠くで近づいていく直線であること。" },
        {
          layer: 3,
          text: "$x > 0,\\ y > 0$ の部分を $y$ について解くと $y = \\sqrt{45\\left(\\dfrac{x^2}{20} - 1\\right)} = \\dfrac{\\sqrt{45}}{\\sqrt{20}}\\sqrt{x^2 - 20}$。$x$ がとても大きいと、$\\sqrt{x^2 - 20}$ と $x$ の差 $\\dfrac{20}{\\sqrt{x^2 - 20} + x}$ は $0$ に近づくので、曲線は直線 $y = \\dfrac{\\sqrt{45}}{\\sqrt{20}}x = \\dfrac32x$ に近づく。傾きは $\\dfrac32$（もう $1$ 本は $-\\dfrac32$）。中心の問いへ：**楕円には無かった新しい部品＝漸近線 $y = \\pm\\dfrac bax$。$2$ つの分母の比の平方根が傾き**。",
        },
      ],
      formulaPreview: "y = (√45/√20)√(x² − 20) → 漸近線 y = (3/2)x",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "双曲線 $\\dfrac{x^2}{18} - \\dfrac{y^2}{32} = -1$ は、$2$ 本の曲線が上下に分かれて並びます。上の曲線の頂点（曲線が $y$ 軸と交わる点）の $y$ 座標を求めましょう。",
      answer: 4 * Math.sqrt(2),
      answerDisplay: "4√2",
      unit: "",
      unknownLabel: "上の頂点の $y$ 座標",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。この式は、これまでの双曲線とどこが違う？" },
        { layer: 2, text: "前題と変わったのは、右辺が $1$ でなく $-1$ であること。" },
        {
          layer: 3,
          text: "$x = 0$ を入れると $-\\dfrac{y^2}{32} = -1$、$y^2 = 32$、$y = \\pm4\\sqrt2$。上の頂点の $y$ 座標は $4\\sqrt2$。（$y = 0$ を入れると $\\dfrac{x^2}{18} = -1$ で解が無い＝$x$ 軸とは交わらない。）両辺に $-1$ をかけると $\\dfrac{y^2}{32} - \\dfrac{x^2}{18} = 1$——$x$ と $y$ の役が入れかわった双曲線で、焦点は $y$ 軸の上の $(0,\\ \\pm\\sqrt{32 + 18}) = (0,\\ \\pm5\\sqrt2)$。漸近線は右辺が $1$ のときと同じ $y = \\pm\\dfrac{\\sqrt{32}}{\\sqrt{18}}x = \\pm\\dfrac43x$。中心の問いへ：**右辺の符号が、曲線の開く向き（左右か上下か）を決める。漸近線は共通**。",
        },
      ],
      formulaPreview: "x = 0 → y² = 32 → y = 4√2（右辺 −1 は上下に開く）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "頂点が $(\\pm2,\\ 0)$ で、漸近線が $y = \\pm\\dfrac52x$ の双曲線があります。焦点 $(c,\\ 0)$（$c > 0$）の $c$ を求めましょう。",
      answer: Math.sqrt(29),
      answerDisplay: "√29",
      unit: "",
      unknownLabel: "$c$",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。step5 は式から漸近線を読んだ。今度は向きがどう変わった？" },
        { layer: 2, text: "step5 と変わったのは、漸近線が先に与えられて、式の側の数を戻す向きになったこと。" },
        {
          layer: 3,
          text: "頂点が $(\\pm2, 0)$ なので $a = 2$。漸近線の傾き $\\dfrac ba = \\dfrac52$ から $b = 5$。焦点は $c^2 = a^2 + b^2 = 4 + 25 = 29$、$c = \\sqrt{29}$。中心の問いへ：**頂点と漸近線から $a$ と $b$ が決まり、焦点は三平方の和の向きで出る**。",
        },
      ],
      formulaPreview: "a = 2、b = 5 → c² = 29 → c = √29",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "第1章の[分数関数]のグラフ $y = \\dfrac{6}{x}$ を考えます。$2$ 点 F$(2\\sqrt3,\\ 2\\sqrt3)$、F′$(-2\\sqrt3,\\ -2\\sqrt3)$ と、グラフの上の点 P$(2,\\ 3)$ について、差 PF′ − PF を求めましょう。",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      unit: "",
      unknownLabel: "PF′ − PF",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "step1 と比べてみよう。step1 と同じ仕事は、ここでもできる？" },
        { layer: 2, text: "step1 と変わったのは、曲線が第1章で見た $y = \\dfrac{k}{x}$ の形で、$2$ 点が斜めに並んでいること。" },
        {
          layer: 3,
          text: "$\\mathrm{PF}^2 = (2 - 2\\sqrt3)^2 + (3 - 2\\sqrt3)^2 = (16 - 8\\sqrt3) + (21 - 12\\sqrt3) = 37 - 20\\sqrt3$、$\\mathrm{PF'}^2 = 37 + 20\\sqrt3$。差を $d$ とおくと $d^2 = \\mathrm{PF'}^2 + \\mathrm{PF}^2 - 2\\,\\mathrm{PF'}\\cdot\\mathrm{PF} = 74 - 2\\sqrt{37^2 - 1200} = 74 - 2\\sqrt{169} = 48$。$d = 4\\sqrt3$。頂点 $(\\sqrt6,\\ \\sqrt6)$ で測っても、F・F′ と同じ直線 $y = x$ の上なので $\\sqrt2(2\\sqrt3 + \\sqrt6) - \\sqrt2(2\\sqrt3 - \\sqrt6) = 2\\sqrt{12} = 4\\sqrt3$ で同じ値。$y = \\dfrac6x$ を $45^\\circ$ 回すと $x^2 - y^2 = 12$ の形の双曲線になり、F・F′ はその焦点。中心の問いへ：**第1章の $y = \\dfrac kx$ のグラフも、$2$ 点からの距離の差が一定の曲線——漸近線が直交している双曲線**。",
        },
      ],
      formulaPreview: "PF′² + PF² = 74、PF′·PF = 13 → (PF′ − PF)² = 48 → 4√3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "曲線 $7x^2 - 14x - 9y^2 - 36y - 92 = 0$ は双曲線です。$2$ つの焦点のうち、$x$ 座標が大きいほうの $x$ 座標を求めましょう。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "焦点の $x$ 座標（大きいほう）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。どちらも「右辺が $1$」の形ではない。何が加わった？" },
        { layer: 2, text: "step4 と変わったのは、$x$ と $y$ の $1$ 次の項があること。" },
        {
          layer: 3,
          text: "[平方完成]：$7(x^2 - 2x) - 9(y^2 + 4y) - 92 = 0$、$7\\{(x-1)^2 - 1\\} - 9\\{(y+2)^2 - 4\\} - 92 = 0$、$7(x-1)^2 - 9(y+2)^2 = 63$。両辺を $63$ で割って $\\dfrac{(x-1)^2}{9} - \\dfrac{(y+2)^2}{7} = 1$。中心は $(1,\\ -2)$、中心から焦点まで $\\sqrt{9 + 7} = 4$。焦点の $x$ 座標は $1 \\pm 4$、大きいほうは $5$。中心の問いへ：**ずれていても、中心を読めば、焦点は中心から測った同じ距離にある**。",
        },
      ],
      formulaPreview: "(x−1)²/9 − (y+2)²/7 = 1 → 中心 (1, −2)、c = 4 → x = 5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "漸近線が $y = \\pm\\dfrac23x$ で、点 $(6,\\ 2\\sqrt3)$ を通る双曲線を $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$（右辺は $1$）の形で表します。$a^2$ を求めましょう。",
      answer: 9,
      answerDisplay: "9",
      unit: "",
      unknownLabel: "$a^2$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "step7 と比べてみよう。step7 で漸近線から読んだことは、ここでも使える？" },
        { layer: 2, text: "step7 と変わったのは、頂点の代わりに、曲線の上の $1$ 点が与えられていること。" },
        {
          layer: 3,
          text: "漸近線の傾き $\\dfrac ba = \\dfrac23$ から $b = \\dfrac23a$、$b^2 = \\dfrac49a^2$。点 $(6,\\ 2\\sqrt3)$ を入れて $\\dfrac{36}{a^2} - \\dfrac{12}{\\frac49a^2} = \\dfrac{36}{a^2} - \\dfrac{27}{a^2} = \\dfrac{9}{a^2} = 1$。$a^2 = 9$（$b^2 = 4$）。中心の問いへ：**漸近線は $2$ つの分母の比だけを決める。大きさは、曲線の上の $1$ 点が決める**。",
        },
      ],
      formulaPreview: "b² = (4/9)a²、点を代入 → 9/a² = 1 → a² = 9",
    },
  ],
  derivation: `**中心の問い** ｜ $2$ 点からの距離の**差**が一定になる点を集めると、曲線と式はどう変わる？——**楕円の式と、どこが同じでどこが違う？**

────────

## 和を差に取り替える

前の系列では、$2$ 点からの距離の和が一定の点を集めて [楕円] を作った。条件を「差（大きいほうから小さいほうを引いたもの）が一定」に取り替えると、[双曲線] が生まれる。

$2$ 点 F$(c,\\ 0)$、F′$(-c,\\ 0)$ からの距離の差が $2a$（$0 < a < c$）の点 P$(x,\\ y)$ の条件を、楕円と同じように $2$ 乗 $2$ 回で整理すると

$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\qquad (b^2 = c^2 - a^2)$$

F に近い点の集まりと F′ に近い点の集まりがあるので、曲線は $2$ 本に分かれる。

## ここが胚細胞：同じところ、違うところ

| | 楕円 | 双曲線 |
|---|---|---|
| 条件 | 距離の和が $2a$ | 距離の差が $2a$ |
| 式 | $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ | $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ |
| 焦点までの距離 | $\\sqrt{a^2 - b^2}$（焦点は端より内側） | $\\sqrt{a^2 + b^2}$（焦点は頂点より外側） |
| 新しい部品 | — | 漸近線 $y = \\pm\\dfrac bax$ |

**$2a$ はどちらも「$x$ 軸の上の $2$ 点のあいだの長さ」**（楕円は端から端、双曲線は頂点から頂点）。違いは三平方の向きで、楕円の焦点のつもりで $\\sqrt{a^2 - b^2}$ を使うと外れる（step3）。

## Step の道筋

- **step1・2**：数の点で $2$ 点からの距離の差を測る。軸上でない点でも頂点でも、差は同じ
- **step3（山場）**：式から焦点を読む。楕円とは三平方の向きが逆
- **step4・5**：右辺を $1$ にそろえる・漸近線
- **step6（質的変化）**：右辺が $-1$ だと上下に開く。漸近線は共通
- **step7・10**：漸近線と頂点（または $1$ 点）から、もとの数を戻す
- **step8**：第1章の $y = \\dfrac kx$ も、差が一定の双曲線
- **step9**：平方完成で中心を読む

────────

**もっと深く**

**忘れても導ける。** 双曲線の焦点の位置を忘れたら、漸近線の傾き $\\dfrac ba$ から思い出せる。頂点 $(a, 0)$ から縦に $b$ だけ上がると漸近線に乗る。原点からその点までの距離が $\\sqrt{a^2 + b^2}$ で、それが焦点までの距離である。

**$y = \\dfrac kx$ は、漸近線が直交している双曲線。** 漸近線 $y = \\pm\\dfrac bax$ が直交するのは $a = b$ のとき。$x^2 - y^2 = a^2$ を $45^\\circ$ 回すと $y = \\dfrac{k}{x}$ の形（$k = \\dfrac{a^2}{2}$）になる（回すことは、第10章の複素数平面で確かめられる）。

**この先の景色。** $2$ つの観測点に音が届く時刻の差から、音源までの距離の差が分かる。距離の差が一定の点は双曲線の上にあるので、観測点の組を $2$ 組使えば、$2$ 本の双曲線の交点として音源の位置が決まる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「双曲線の方程式」の構成（距離の差の条件・漸近線・右辺が $-1$ の双曲線・分数関数のグラフとの関係）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

距離の差が一定の点の集まりは、$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ の双曲線になる。楕円の式の $+$ が $-$ になった形で、$2a$ は頂点のあいだの長さ。

違うのは三平方の向き：焦点までの距離は $\\sqrt{a^2 + b^2}$ で、焦点は頂点より外にある。そして、遠くで $2$ 本の漸近線 $y = \\pm\\dfrac bax$ に近づく。`,
};

/** M3CV4: 放物線——点と直線から同じ距離。
 *  step1〜2：F(5, 0)・直線 x = −5・曲線の上の点 P(20, 20)：PF = 25（重い）→ PH = 25（軽い）（追補13）
 *  step3（＋α）焦点 (4, 0)・準線 x = −4 → y² = 16x の 16（数Ⅱ・B 軌跡は準線が x 軸で y の向き。ここは向きが新しい＝R1 F4-1 の後半）
 *  step4（逆）y² = 10x の焦点 5/2
 *  山場 step5（C12 ②・C13 数Ⅰ）y = 3x² の焦点の y 座標 1/12。x と y を入れかえずに 4p = 3 と読むと 3/4（a = ±1 を避けた）
 *  step6 x² = −6y の準線 y = 3/2／step7（＋α）y² − 2y − 6x − 11 = 0 ＝ (y−1)² = 6(x+2)：焦点の x 座標 −1/2
 *  step8（逆・R1 F4-1）焦点 (2, 3)・準線 y = −2 → y = x²/10 − 2x/5 + 9/10 の定数項 9/10（x² の係数は距離だけで決まるので問わない。距離 4〔数Ⅱ・B 軌跡の 1/8〕も避けた）
 *  step9（複合・C13 数Ⅰ 平方完成）y = 2x² − 4x + 5 の焦点の y 座標 25/8（定義で確かめた：(0, 5) から焦点・準線までどちらも 17/8）
 *  step10（複合）y² = 18x の上で焦点からの距離が 13 の点の x 座標 17/2（焦点からの距離 ＝ 準線までの距離 ＝ x + 9/2）
 *  答え：25・25・16・5/2・1/12・3/2・−1/2・9/10・25/8・17/2。原典の y² = 8x・12x・y = x²・−x²/2・焦点 (6, 0)・反射（FP = FQ）は使っていない。 */
export const M3CV_PARABOLA_SERIES: LearnerSeries = {
  id: "math3_cv_parabola_01",
  title: "放物線——点と直線から同じ距離",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 点と直線から同じ距離にある点を集めると、知っている 2 次関数のグラフになるか。式のどこが、その点と直線の位置を語っているか。$10$ 問で確かめる。",
  patternId: "M3CV4",
  unit: "math_3",
  revelationLabel:
    "**$y = ax^2$ にも焦点がある**——$x$ と $y$ の役を入れかえて $x^2 = \\dfrac1a y$ と読めば、$4p = \\dfrac1a$",
  drivingQuestion:
    "点と直線から同じ距離にある点を集めると、知っている $2$ 次関数のグラフになる？——**式のどこが、その点と直線の位置を語っている？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "点 F$(5,\\ 0)$ と直線 $l：x = -5$、ある曲線の上の点 P$(20,\\ 20)$ があります。P から F までの距離 PF を求めましょう。",
      answer: 25,
      answerDisplay: "25",
      unit: "",
      unknownLabel: "PF",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数Ⅱの軌跡では、「点からの距離」と「直線からの距離」の両方が出てきた。いまは点からの距離を測る。どう出せる？",
        },
        {
          layer: 2,
          text: "数Ⅱで、「直線と定点から等しい距離」という条件を式にしたことがある。そのとき、点からの距離はどう書いた？（[軌跡]）",
        },
        {
          layer: 3,
          text: "$\\mathrm{PF} = \\sqrt{(20 - 5)^2 + 20^2} = \\sqrt{225 + 400} = \\sqrt{625} = 25$。中心の問いへの最初の部分回答：**点 F から P までは $25$。では、直線 $l$ から P までは？**",
        },
      ],
      formulaPreview: "PF = √(15² + 20²) = 25",
      figureMarker: "<<M3CV_PIN_AND_LINE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の P$(20,\\ 20)$ から、直線 $l：x = -5$ までの距離 PH を求めましょう（H は P から $l$ に下ろした垂線の足）。",
      answer: 25,
      answerDisplay: "25",
      unit: "",
      unknownLabel: "PH",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、距離を測る相手が点でなく直線になったこと。" },
        {
          layer: 3,
          text: "$l$ は縦の直線 $x = -5$ なので、H $= (-5,\\ 20)$。PH は $x$ 座標の差だけで $20 - (-5) = 25$。前題の PF と同じ値。中心の問いへ：**この曲線は、点 F と直線 $l$ から同じ距離にある点の集まりらしい**。",
        },
      ],
      formulaPreview: "PH = 20 − (−5) = 25（PF と同じ）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "点 F$(4,\\ 0)$ と直線 $l：x = -4$ から同じ距離にある点 P$(x,\\ y)$ の集まりは、$y^2 = \\square\\,x$ の形の式になります。□ を求めましょう。",
      answer: 16,
      answerDisplay: "16",
      unit: "",
      unknownLabel: "□",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までは数の点で測った。今度は何が違う？" },
        { layer: 2, text: "前題と変わったのは、P の座標が文字 $(x,\\ y)$ になったこと。" },
        {
          layer: 3,
          text: "PF $= \\sqrt{(x-4)^2 + y^2}$、PH $= \\lvert x - (-4)\\rvert = \\lvert x + 4\\rvert$。PF $=$ PH の両辺を $2$ 乗して $(x-4)^2 + y^2 = (x+4)^2$。$(x+4)^2 - (x-4)^2 = 16x$ なので $y^2 = 16x$。□ $= 16$。中心の問いへ：**点 $(p,\\ 0)$ と直線 $x = -p$ からの等距離は $y^2 = 4px$。$x$ の係数は、点と直線の距離 $2p$ の $2$ 倍**。",
        },
      ],
      formulaPreview: "(x − 4)² + y² = (x + 4)² → y² = 16x",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "このように「点と直線から同じ距離にある点の集まり」が[放物線]で、その点を放物線の [焦点]、直線を [準線] といいます。\n\n放物線 $y^2 = 10x$ の焦点は $x$ 軸上の点 $(p,\\ 0)$ です。$p$ を求めましょう。",
      answer: 5 / 2,
      answerDisplay: "5/2",
      unit: "",
      unknownLabel: "$p$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は点と直線から式を作った。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、式が先に与えられて、焦点の位置が問われていること。" },
        {
          layer: 3,
          text: "前題の形 $y^2 = 4px$ と見くらべると $4p = 10$、$p = \\dfrac52$。焦点 $\\left(\\dfrac52,\\ 0\\right)$、準線 $x = -\\dfrac52$。確かめ：曲線の上の点 $(10,\\ 10)$ は焦点まで $\\sqrt{\\left(\\dfrac{15}{2}\\right)^2 + 100} = \\dfrac{25}{2}$、準線まで $10 + \\dfrac52 = \\dfrac{25}{2}$。中心の問いへ：**$y^2 = 4px$ の $x$ の係数の $\\dfrac14$ が、頂点から焦点までの距離**。",
        },
      ],
      formulaPreview: "4p = 10 → p = 5/2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "数Ⅰで見た $2$ 次関数のグラフ $y = 3x^2$ も、放物線です。その焦点は $y$ 軸上にあります。焦点の $y$ 座標を求めましょう。",
      answer: 1 / 12,
      answerDisplay: "1/12",
      unit: "",
      unknownLabel: "焦点の $y$ 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。この式は、前題の形とどこが違う？" },
        { layer: 2, text: "前題と変わったのは、$2$ 乗されているのが $y$ でなく $x$ であること。" },
        {
          layer: 3,
          text: "$y = 3x^2$ を $x^2 = \\dfrac13y$ と書きかえる。これは $y^2 = 4px$ の $x$ と $y$ の役を入れかえた形 $x^2 = 4py$ なので、$4p = \\dfrac13$、$p = \\dfrac{1}{12}$。焦点は $\\left(0,\\ \\dfrac{1}{12}\\right)$、準線は $y = -\\dfrac{1}{12}$。**$y = 3x^2$ の「$3$」をそのまま $4p$ と読んで $p = \\dfrac34$ とすると外れる**——$2$ 乗されている文字の側に係数を集めてから読む。確かめ：点 $(1,\\ 3)$ から焦点まで $\\sqrt{1 + \\left(3 - \\dfrac1{12}\\right)^2} = \\sqrt{1 + \\dfrac{1225}{144}} = \\dfrac{37}{12}$、準線まで $3 + \\dfrac1{12} = \\dfrac{37}{12}$。中心の問いへ：**数Ⅰの $2$ 次関数のグラフも、焦点と準線から等距離の曲線。$y = ax^2$ の焦点は $\\left(0,\\ \\dfrac{1}{4a}\\right)$**。",
        },
      ],
      formulaPreview: "x² = (1/3)y → 4p = 1/3 → p = 1/12（3/4 ではない）",
      figureMarker: "<<M3CV_PARABOLA_FOCUS_ASK>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "放物線 $x^2 = -6y$ の準線は、$x$ 軸に平行な直線 $y = k$ です。$k$ を求めましょう。",
      answer: 3 / 2,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、$y$ の係数が負であること。" },
        {
          layer: 3,
          text: "$x^2 = 4py$ と見くらべて $4p = -6$、$p = -\\dfrac32$。焦点は $\\left(0,\\ -\\dfrac32\\right)$（下にある）、準線は $y = -p = \\dfrac32$。放物線は下に開く。中心の問いへ：**$p$ の符号が、焦点が頂点のどちら側にあるか＝曲線の開く向きを語る。準線はいつも反対側**。",
        },
      ],
      formulaPreview: "4p = −6 → p = −3/2 → 準線 y = 3/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "曲線 $y^2 - 2y - 6x - 11 = 0$ は放物線です。焦点の $x$ 座標を求めましょう。",
      answer: -1 / 2,
      answerDisplay: "-1/2",
      unit: "",
      unknownLabel: "焦点の $x$ 座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。何が加わった？" },
        { layer: 2, text: "step4 と変わったのは、$y$ の $1$ 次の項と定数項があること。" },
        {
          layer: 3,
          text: "[平方完成]：$(y - 1)^2 - 1 - 6x - 11 = 0$、$(y-1)^2 = 6x + 12 = 6(x + 2)$。これは $y^2 = 6x$ を、頂点が $(-2,\\ 1)$ に来るよう[平行移動]したもの。$y^2 = 6x$ の焦点は $4p = 6$ より $\\left(\\dfrac32,\\ 0\\right)$。移すと $\\left(-2 + \\dfrac32,\\ 1\\right) = \\left(-\\dfrac12,\\ 1\\right)$。中心の問いへ：**頂点がずれても、焦点は頂点から測った同じ距離にある**。",
        },
      ],
      formulaPreview: "(y − 1)² = 6(x + 2) → 頂点 (−2, 1)、p = 3/2 → x = −1/2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "焦点が $(2,\\ 3)$、準線が $y = -2$ の放物線を、$y = ax^2 + bx + c$ の形に書きます。定数項 $c$ を求めましょう。",
      answer: 9 / 10,
      answerDisplay: "9/10",
      unit: "",
      unknownLabel: "定数項 $c$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は式から焦点を読んだ。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、焦点と準線が先に与えられて、式を作る側になったこと。" },
        {
          layer: 3,
          text: "点 $(x,\\ y)$ から焦点までの距離 $= \\sqrt{(x-2)^2 + (y-3)^2}$、準線までの距離 $= \\lvert y + 2\\rvert$。$2$ 乗して等しいとおくと $(x-2)^2 + (y-3)^2 = (y+2)^2$、$(x-2)^2 = 10y - 5$、$y = \\dfrac{(x-2)^2}{10} + \\dfrac12 = \\dfrac{x^2}{10} - \\dfrac{2}{5}x + \\dfrac{9}{10}$。$c = \\dfrac{9}{10}$。（頂点は焦点と準線の真ん中 $\\left(2,\\ \\dfrac12\\right)$ で、$p = \\dfrac52$ からも同じ式になる。）中心の問いへ：**焦点と準線が分かれば、頂点（真ん中）と開き具合（距離）が決まり、式がひとつに決まる**。",
        },
      ],
      formulaPreview: "(x − 2)² = 10(y − 1/2) → y = x²/10 − 2x/5 + 9/10",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$2$ 次関数のグラフ $y = 2x^2 - 4x + 5$ の焦点の $y$ 座標を求めましょう。",
      answer: 25 / 8,
      answerDisplay: "25/8",
      unit: "",
      unknownLabel: "焦点の $y$ 座標",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。step5 の読み方は、ここでも使える？" },
        { layer: 2, text: "step5 と変わったのは、$x$ の $1$ 次の項と定数項があること。" },
        {
          layer: 3,
          text: "[平方完成]（数Ⅰ）：$y = 2(x - 1)^2 + 3$。頂点は $(1,\\ 3)$。$y - 3 = 2(x-1)^2$、つまり $(x-1)^2 = \\dfrac12(y - 3)$ で、$4p = \\dfrac12$、$p = \\dfrac18$。焦点は頂点の $\\dfrac18$ 上の $\\left(1,\\ \\dfrac{25}{8}\\right)$、準線は $y = \\dfrac{23}{8}$。確かめ：グラフの上の点 $(0,\\ 5)$ から焦点まで $\\sqrt{1 + \\left(\\dfrac{15}{8}\\right)^2} = \\dfrac{17}{8}$、準線まで $5 - \\dfrac{23}{8} = \\dfrac{17}{8}$。中心の問いへ：**数Ⅰで平方完成して頂点を読んだ $2$ 次関数は、焦点まで読める**。",
        },
      ],
      formulaPreview: "y = 2(x − 1)² + 3 → 4p = 1/2 → 焦点の y = 3 + 1/8 = 25/8",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "放物線 $y^2 = 18x$ の上の点のうち、焦点からの距離が $13$ である点の $x$ 座標を求めましょう。",
      answer: 17 / 2,
      answerDisplay: "17/2",
      unit: "",
      unknownLabel: "$x$ 座標",
      variationFromPrevious: "composite",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "step2 と比べてみよう。step2 で測った距離は、ここで使える？" },
        { layer: 2, text: "step2 と変わったのは、距離が先に与えられて、点の位置が問われていること。" },
        {
          layer: 3,
          text: "$4p = 18$ より $p = \\dfrac92$。焦点 $\\left(\\dfrac92,\\ 0\\right)$、準線 $x = -\\dfrac92$。放物線の上では、焦点からの距離 ＝ 準線までの距離 ＝ $x + \\dfrac92$。これが $13$ なので $x = \\dfrac{17}{2}$。確かめ（根号の道）：$y^2 = 18 \\times \\dfrac{17}{2} = 153$、焦点まで $\\sqrt{\\left(\\dfrac{17}{2} - \\dfrac92\\right)^2 + 153} = \\sqrt{16 + 153} = 13$。中心の問いへ：**焦点からの距離は、準線までの距離に置きかえれば根号の要らない $1$ 次式 $x + p$ になる——定義そのものが道具になる**。",
        },
      ],
      formulaPreview: "焦点からの距離 = x + 9/2 = 13 → x = 17/2",
    },
  ],
  derivation: `**中心の問い** ｜ 点と直線から同じ距離にある点を集めると、知っている $2$ 次関数のグラフになる？——**式のどこが、その点と直線の位置を語っている？**

────────

## 条件を式にする

数Ⅱの [軌跡] で、「直線と定点から等しい距離」の点を集めると放物線になることを見た。ここでは向きを変えて、点 F$(p,\\ 0)$ と直線 $x = -p$ から等距離の点を集める。PF $=$ PH の両辺を $2$ 乗すると

$$(x-p)^2 + y^2 = (x+p)^2 \\quad\\Longrightarrow\\quad y^2 = 4px$$

この点 F を [焦点]、直線を [準線] という。[放物線] は「焦点と準線から等距離の点の集まり」である。

## ここが胚細胞：$2$ 次関数のグラフにも焦点がある

$y^2 = 4px$ は、$x$ と $y$ の役を入れかえると $x^2 = 4py$、つまり $y = \\dfrac{1}{4p}x^2$——数Ⅰの $2$ 次関数のグラフである。だから $y = ax^2$ にも焦点 $\\left(0,\\ \\dfrac{1}{4a}\\right)$ と準線 $y = -\\dfrac{1}{4a}$ がある（step5）。

読み方のこつは $1$ つ：**$2$ 乗されている文字の側に係数を集めて、もう一方の文字の係数を $4p$ と読む**。$y = 3x^2$ の $3$ をそのまま $4p$ と読むと外れる。

- $p$ の符号：焦点が頂点のどちら側か＝開く向き（step6）
- 頂点がずれていたら：平方完成で頂点を読み、頂点から $p$ だけ離れたところに焦点（step7・9）
- 焦点と準線から：頂点は真ん中、$p$ は距離の半分（step8）

## Step の道筋

- **step1・2**：数の点で、点からの距離と直線からの距離をくらべる
- **step3・4**：条件を式にすると $y^2 = 4px$。式から焦点を読む
- **step5（質的変化・山場）**：$2$ 次関数のグラフ $y = ax^2$ の焦点
- **step6・7**：下に開く放物線・平行移動した放物線
- **step8**：焦点と準線から式を作る
- **step9**：数Ⅰの $2$ 次関数（平方完成）の焦点
- **step10**：焦点からの距離を、準線までの距離 $x + p$ に置きかえる

────────

**もっと深く**

**忘れても導ける。** $y^2 = 4px$ を覚えていなくても、焦点 $(p,\\ 0)$ と準線 $x = -p$ から等距離、を $2$ 乗するだけで出る。$2$ 次関数の焦点も、$x$ と $y$ を入れかえて同じことをすればよい。

**楕円・双曲線とくらべると。** 楕円と双曲線は焦点が $2$ つ、放物線は焦点 $1$ つと準線 $1$ 本。それでも「焦点からの距離」で決まる点は同じである。準線を楕円や双曲線にも考えると、$3$ つの曲線を $1$ つの数でならべられる——数Ⅲ・C「いろいろな曲線」の $2$ 次曲線の系列で確かめる。

**この先の景色。** 投げ上げたボールの軌道は放物線で、その焦点の高さは、投げる速さと向きで決まる。放物線の形をした鏡やアンテナでは、軸に平行に入ってきた光や電波が反射して焦点に集まる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「放物線の方程式」の構成（焦点と準線の条件から $y^2 = 4px$・$2$ 次関数のグラフは $x$ と $y$ を入れかえて読む・平行移動した放物線）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

点（焦点）と直線（準線）から同じ距離にある点の集まりは、$y^2 = 4px$ の放物線になる。$x$ と $y$ の役を入れかえれば、数Ⅰの $2$ 次関数 $y = ax^2$ のグラフそのもので、焦点は $\\left(0,\\ \\dfrac1{4a}\\right)$。

式の、$2$ 乗されていない文字の係数の $\\dfrac14$ が、頂点から焦点までの距離を語っている。`,
};

/** M3CV5: 接線の公式——円の接線を伸ばす。
 *  step1〜3：x²/27 + y²/24 = 1 の点 (3, 4)。陰関数の微分で傾き −2/3 → 点と傾きから y 切片 6（重い）→ 公式 3x/27 + 4y/24 = 1 で y 切片 6（軽い・追補13）
 *  山場 step4（C12 ②・R1 I1-12）3x² + 2y² = 35 の点 (3, 2)：傾き −9/4。係数を分母と取り違えると −1、係数を落とすと −3/2
 *  step5（逆）x²/40 + y²/15 = 1 の接線 x + 2y = 10 の接点の x 座標 4（連立の解は 1 つ）
 *  step6（質）x²/4 − y²/12 = 1 の点 (4, 6)：傾き 2／step7（＋α）(x−2)²/30 + (y−1)²/24 = 1 の点 (7, 3)：y 切片 17
 *  step8（質）y² = 6x の点 (6, 6)：傾き 1/2（y₀y = 2p(x + x₀)。1 次の項は (x + x₀)/2 に置きかわる＝R1 I3-1）
 *  step9（＋α）x²/21 + y²/4 = 1 の傾き 1 の接線の y 切片 {5, −5}（判別式で確かめた）
 *  step10（複合・C13 系列2）x²/16 + y²/9 = 1 の θ = π/3 の点の接線の x 切片 8（= 4/cos θ。θ から点を作る仕事が要る）
 *  形：27:24・3:2 の係数・40:15・30:24・21:4・16:9。第5章の x²/9 + y²/4 とその定数倍、比 2:1、原典 p.323〜324 の例
 *  （x²/4 + y²/6 の (√2, √3)・x²/2 − y² の (−2, 1)・y² = 8x の (2, 4)）は使っていない。 */
export const M3CV_TANGENT_SERIES: LearnerSeries = {
  id: "math3_cv_tangent_01",
  title: "接線の公式——円の接線を伸ばす",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 円の接線は、接点が分かれば $1$ 行で書けた。楕円・双曲線・放物線でも、接点から $1$ 行で書けるか。円の公式のどこを書きかえればよいか。$10$ 問で確かめる。",
  patternId: "M3CV5",
  unit: "math_3",
  revelationLabel:
    "**$Ax^2 + By^2 = k$ のままなら、接線は $Ax_0x + By_0y = k$**——係数は分母でなく、係数のまま運ぶ",
  drivingQuestion:
    "円の接線は、接点が分かれば $1$ 行で書けた。楕円や、仲間の双曲線・放物線でも、接点から $1$ 行で書ける？——**円の公式のどこを書きかえればよい？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "楕円 $\\dfrac{x^2}{27} + \\dfrac{y^2}{24} = 1$ の上の点 $(3,\\ 4)$ における接線の傾きを求めましょう。",
      answer: -2 / 3,
      answerDisplay: "-2/3",
      unit: "",
      unknownLabel: "接線の傾き",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$y$ を $x$ の式に解かなくても、曲線の式のまま接線の傾きを出す方法があった。どうやった？",
        },
        {
          layer: 2,
          text: "第5章で、$x$ と $y$ の関係式の両辺を $x$ で微分して傾きを出したのは、どんな方法だった？（[陰関数]）",
        },
        {
          layer: 3,
          text: "両辺を $x$ で微分すると $\\dfrac{2x}{27} + \\dfrac{2y}{24}\\,y' = 0$、$y' = -\\dfrac{24x}{27y}$。点 $(3,\\ 4)$ で $y' = -\\dfrac{24 \\cdot 3}{27 \\cdot 4} = -\\dfrac{72}{108} = -\\dfrac23$。中心の問いへの最初の部分回答：**楕円でも、陰関数の微分で接点の傾きが出る。あとは点と傾きから直線を書けばよい**。",
        },
      ],
      formulaPreview: "y′ = −24x/(27y) → (3, 4) で −2/3",
      figureMarker: "<<M3CV_ELLIPSE_TANGENT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の接線（点 $(3,\\ 4)$ を通り、傾き $-\\dfrac23$）の $y$ 切片を求めましょう。",
      answer: 6,
      answerDisplay: "6",
      unit: "",
      unknownLabel: "接線の $y$ 切片",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で出したものを、どう使う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが傾きでなく、接線が $y$ 軸と交わる高さであること。" },
        {
          layer: 3,
          text: "$y - 4 = -\\dfrac23(x - 3)$ より $y = -\\dfrac23x + 2 + 4 = -\\dfrac23x + 6$。$y$ 切片は $6$。中心の問いへ：**接点と傾きから接線が書けた。ただし、微分して、点と傾きの式を整理して——と $2$ 段かかった**。",
        },
      ],
      formulaPreview: "y − 4 = −(2/3)(x − 3) → y = −(2/3)x + 6",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "数Ⅱで、円 $x^2 + y^2 = r^2$ の上の点 $(x_0,\\ y_0)$ における接線は $x_0x + y_0y = r^2$ と書けました。楕円 $\\dfrac{x^2}{27} + \\dfrac{y^2}{24} = 1$ の上の点 $(x_0,\\ y_0)$ における接線は、これを書きかえた形\n\n$$\\frac{x_0x}{27} + \\frac{y_0y}{24} = 1$$\n\nになることが知られています。この式で、前題と同じ点 $(3,\\ 4)$ における接線の $y$ 切片を求めましょう。",
      answer: 6,
      answerDisplay: "6",
      unit: "",
      unknownLabel: "接線の $y$ 切片",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。同じ接線を、別の道で出すと？" },
        { layer: 2, text: "前題と変わったのは、微分の代わりに、円の接線の式を書きかえた $1$ 行を使うこと。" },
        {
          layer: 3,
          text: "$\\dfrac{3x}{27} + \\dfrac{4y}{24} = 1$、つまり $\\dfrac{x}{9} + \\dfrac{y}{6} = 1$。$x = 0$ とおくと $y = 6$——前題と同じ。**なぜ同じになるか**：陰関数の微分で出した接線 $y - y_0 = -\\dfrac{24x_0}{27y_0}(x - x_0)$ の両辺に $\\dfrac{y_0}{24}$ をかけて整理すると $\\dfrac{x_0x}{27} + \\dfrac{y_0y}{24} = \\dfrac{x_0^2}{27} + \\dfrac{y_0^2}{24}$。右辺は、接点が楕円の上にあるので $1$。中心の問いへ：**楕円の式の $x^2$ を $x_0x$、$y^2$ を $y_0y$ に置きかえると接線になる。右辺が $1$ にそろうのは、接点が曲線の上にあるから**。",
        },
      ],
      formulaPreview: "x/9 + y/6 = 1 → y 切片 6（前題と同じ）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "楕円 $3x^2 + 2y^2 = 35$ の上の点 $(3,\\ 2)$ における接線の傾きを求めましょう。",
      answer: -9 / 4,
      answerDisplay: "-9/4",
      unit: "",
      unknownLabel: "接線の傾き",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の $1$ 行は、ここでも使える？" },
        { layer: 2, text: "前題と変わったのは、楕円の式が「分母の形・右辺 $1$」になっていないこと。" },
        {
          layer: 3,
          text: "$x^2$ を $x_0x$ に、$y^2$ を $y_0y$ に置きかえるので、係数はそのまま残る：$3 \\cdot 3x + 2 \\cdot 2y = 35$、つまり $9x + 4y = 35$。傾きは $-\\dfrac94$。（陰関数の微分でも $6x + 4yy' = 0$、$y' = -\\dfrac{3x}{2y} = -\\dfrac94$。）**係数 $3,\\ 2$ を分母と取り違えて $\\dfrac{3x}{3} + \\dfrac{2y}{2} = \\cdots$ とすると傾き $-1$ になって外れる**——分母の形にするなら $\\dfrac{x^2}{35/3} + \\dfrac{y^2}{35/2} = 1$ で、分母は $3$ や $2$ ではない。中心の問いへ：**置きかえは式の形を選ばない。$Ax^2 + By^2 = k$ なら $Ax_0x + By_0y = k$**。",
        },
      ],
      formulaPreview: "9x + 4y = 35 → 傾き −9/4（係数を分母と取り違えると −1）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "直線 $x + 2y = 10$ は、楕円 $\\dfrac{x^2}{40} + \\dfrac{y^2}{15} = 1$ の接線です。接点の $x$ 座標を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "接点の $x$ 座標",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は接点から接線を書いた。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、接線が先に与えられて、接点が問われていること。" },
        {
          layer: 3,
          text: "接点を $(x_0,\\ y_0)$ とすると、接線は $\\dfrac{x_0x}{40} + \\dfrac{y_0y}{15} = 1$。$x + 2y = 10$ の両辺を $10$ で割ると $\\dfrac{x}{10} + \\dfrac{y}{5} = 1$。係数をくらべて $\\dfrac{x_0}{40} = \\dfrac1{10}$、$\\dfrac{y_0}{15} = \\dfrac15$。$x_0 = 4$（$y_0 = 3$）。確かめ：$\\dfrac{16}{40} + \\dfrac{9}{15} = 1$ で、接点は楕円の上。（連立して $x$ の $2$ 次方程式にすると重解 $x = 4$ が $1$ つだけ出る。）中心の問いへ：**接線の式の係数は、接点の座標をそのまま運んでいる——だから係数から接点が読み戻せる**。",
        },
      ],
      formulaPreview: "x/10 + y/5 = 1 と x₀x/40 + y₀y/15 = 1 → x₀ = 4",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "双曲線 $\\dfrac{x^2}{4} - \\dfrac{y^2}{12} = 1$ の上の点 $(4,\\ 6)$ における接線の傾きを求めましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "接線の傾き",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。楕円で使った置きかえは、ここでも効く？" },
        { layer: 2, text: "前題と変わったのは、曲線が楕円から双曲線になったこと。" },
        {
          layer: 3,
          text: "陰関数の微分：$\\dfrac{2x}{4} - \\dfrac{2y}{12}y' = 0$、$y' = \\dfrac{12x}{4y} = \\dfrac{3x}{y}$。点 $(4,\\ 6)$ で $2$。同じ整理をすると、接線は $\\dfrac{x_0x}{4} - \\dfrac{y_0y}{12} = 1$——楕円と同じ置きかえで、符号もそのまま運ばれる。$(4, 6)$ なら $x - \\dfrac{y}{2} = 1$、傾き $2$。中心の問いへ：**双曲線でも、$x^2 \\to x_0x$、$y^2 \\to y_0y$ の置きかえで接線になる。$-$ の符号は式の一部としてそのまま残る**。",
        },
      ],
      formulaPreview: "4x/4 − 6y/12 = 1 → x − y/2 = 1 → 傾き 2",
      figureMarker: "<<M3CV_HYPERBOLA_TANGENT>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "楕円 $\\dfrac{(x-2)^2}{30} + \\dfrac{(y-1)^2}{24} = 1$ の上の点 $(7,\\ 3)$ における接線の $y$ 切片を求めましょう。",
      answer: 17,
      answerDisplay: "17",
      unit: "",
      unknownLabel: "接線の $y$ 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。step3 の $1$ 行は、そのまま書ける？" },
        { layer: 2, text: "step3 と変わったのは、楕円の中心が原点からずれていること。" },
        {
          layer: 3,
          text: "中心 $(2,\\ 1)$ から測った座標 $X = x - 2$、$Y = y - 1$ で見れば $\\dfrac{X^2}{30} + \\dfrac{Y^2}{24} = 1$、接点は $(X_0,\\ Y_0) = (5,\\ 2)$。接線は $\\dfrac{5X}{30} + \\dfrac{2Y}{24} = 1$、つまり $\\dfrac{x-2}{6} + \\dfrac{y-1}{12} = 1$。$x = 0$ とおくと $-\\dfrac13 + \\dfrac{y-1}{12} = 1$、$y - 1 = 16$、$y = 17$。中心の問いへ：**中心がずれていても、中心から測った座標で置きかえれば $1$ 行で書ける**。",
        },
      ],
      formulaPreview: "(x − 2)/6 + (y − 1)/12 = 1 → x = 0 で y = 17",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "放物線 $y^2 = 6x$ の上の点 $(6,\\ 6)$ における接線の傾きを求めましょう。",
      answer: 1 / 2,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "接線の傾き",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までの置きかえは、ここでもそのまま使える？" },
        { layer: 2, text: "前題と変わったのは、曲線が放物線で、$x$ が $2$ 乗されていないこと。" },
        {
          layer: 3,
          text: "陰関数の微分：$2yy' = 6$、$y' = \\dfrac3y$。点 $(6, 6)$ で $\\dfrac12$。接線は $y - 6 = \\dfrac12(x - 6)$、整理すると $6y = 3x + 18 = 3(x + 6)$。$y^2 = 6x$ の $y^2$ は $y_0y = 6y$ に、$1$ 次の $6x$ は $6 \\cdot \\dfrac{x + x_0}{2} = 3(x + 6)$ に置きかわっている。中心の問いへ：**$2$ 乗の項は $x_0x$・$y_0y$ に、$1$ 次の項 $x$ は $\\dfrac{x + x_0}{2}$ に置きかえる。$2$ 乗の項だけの規則では放物線に届かない**。",
        },
      ],
      formulaPreview: "6y = 3(x + 6) → 傾き 1/2（1 次の項 x は (x + 6)/2 に）",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "楕円 $\\dfrac{x^2}{21} + \\dfrac{y^2}{4} = 1$ の接線のうち、傾きが $1$ のものは $2$ 本あります。$2$ 本の接線の $y$ 切片をすべて求めましょう（カンマで区切って入力）。",
      answer: 5,
      answerDisplay: "5, -5",
      solutionSet: [5, -5],
      unit: "",
      unknownLabel: "$y$ 切片（$2$ つ）",
      inputAffordances: ["multi"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "step5 と比べてみよう。step5 では接線から接点を読んだ。今度は何が与えられている？" },
        { layer: 2, text: "step5 と変わったのは、接線そのものでなく、傾きだけが与えられていること。" },
        {
          layer: 3,
          text: "接点を $(x_0,\\ y_0)$ とすると接線は $\\dfrac{x_0x}{21} + \\dfrac{y_0y}{4} = 1$、傾きは $-\\dfrac{4x_0}{21y_0} = 1$ から $x_0 = -\\dfrac{21}{4}y_0$。楕円の式に入れて $\\dfrac{21}{16}y_0^2 + \\dfrac{y_0^2}{4} = 1$、$\\dfrac{25}{16}y_0^2 = 1$、$y_0 = \\pm\\dfrac45$。$y$ 切片は $\\dfrac{4}{y_0} = \\pm5$。（別の道：$y = x + c$ を代入して重解の条件から $c^2 = 21 + 4 = 25$、$c = \\pm5$。）中心の問いへ：**傾きが決まると、接点は楕円の上に $2$ つ、原点について反対側にできる**。",
        },
      ],
      formulaPreview: "y₀ = ±4/5 → y 切片 4/y₀ = ±5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "楕円 $\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1$ の上の点を $(4\\cos\\theta,\\ 3\\sin\\theta)$ と表します。$\\theta = \\dfrac{\\pi}{3}$ の点における接線が $x$ 軸と交わる点の $x$ 座標を求めましょう。",
      answer: 8,
      answerDisplay: "8",
      unit: "",
      unknownLabel: "接線の $x$ 切片",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "step3 と比べてみよう。step3 の $1$ 行は、ここでも使える？" },
        { layer: 2, text: "step3 と変わったのは、接点が座標でなく、角 $\\theta$ で与えられていること。" },
        {
          layer: 3,
          text: "接点は $\\left(4\\cos\\dfrac{\\pi}{3},\\ 3\\sin\\dfrac{\\pi}{3}\\right) = \\left(2,\\ \\dfrac{3\\sqrt3}{2}\\right)$。接線は $\\dfrac{2x}{16} + \\dfrac{3\\sqrt3}{2}\\cdot\\dfrac{y}{9} = 1$。$y = 0$ とおくと $\\dfrac{x}{8} = 1$、$x = 8$。$\\theta$ のまま書くと接線は $\\dfrac{x\\cos\\theta}{4} + \\dfrac{y\\sin\\theta}{3} = 1$ で、$x$ 切片は $\\dfrac{4}{\\cos\\theta}$。中心の問いへ：**系列2 の $(a\\cos\\theta,\\ b\\sin\\theta)$ を置きかえの $1$ 行に入れれば、接線も $\\theta$ で書ける**。",
        },
      ],
      formulaPreview: "接点 (2, 3√3/2) → x/8 + (√3/6)y = 1 → x 切片 8",
    },
  ],
  derivation: `**中心の問い** ｜ 円の接線は、接点が分かれば $1$ 行で書けた。楕円や、仲間の双曲線・放物線でも、接点から $1$ 行で書ける？——**円の公式のどこを書きかえればよい？**

────────

## 微分して、点と傾きで書く

接点 $(x_0,\\ y_0)$ がわかれば、曲線の式のまま両辺を $x$ で微分して（[陰関数] の微分）傾きを出し、点と傾きから接線が書ける（step1・2）。

## ここが胚細胞：置きかえの $1$ 行と、右辺がそろう理由

楕円 $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ で微分した接線を整理すると

$$\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = \\frac{x_0^2}{a^2} + \\frac{y_0^2}{b^2}$$

右辺は、**接点が曲線の上にあるから** $1$。だから

$$\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = 1$$

数Ⅱの円の [接線] $x_0x + y_0y = r^2$ と同じく、**$x^2$ を $x_0x$、$y^2$ を $y_0y$ に置きかえる**（step3）。

- **係数はそのまま運ぶ**：$Ax^2 + By^2 = k$ なら $Ax_0x + By_0y = k$（step4）
- **双曲線も同じ**：$\\dfrac{x_0x}{a^2} - \\dfrac{y_0y}{b^2} = 1$（step6）
- **放物線は $1$ 次の項に注意**：$y^2 = 4px$ なら $y_0y = 2p(x + x_0)$。$1$ 次の項 $x$ は $\\dfrac{x + x_0}{2}$ に置きかわる（step8）
- **中心がずれていれば**、中心から測った座標で置きかえる（step7）

## Step の道筋

- **step1・2**：陰関数の微分と、点と傾き（第5章と合流）
- **step3（質的変化）**：円の接線を書きかえた $1$ 行。同じ値になる
- **step4（山場）**：$Ax^2 + By^2 = k$ のまま置きかえる
- **step5**：接線から接点を読み戻す
- **step6・8**：双曲線・放物線
- **step7**：中心がずれた楕円
- **step9**：傾きから接線（$2$ 本）
- **step10**：角 $\\theta$ で与えた接点（系列2 と合流）

────────

**もっと深く**

**忘れても導ける。** 置きかえの $1$ 行を忘れても、陰関数の微分→点と傾き→右辺に「接点が曲線の上」を使う、の $3$ 段で必ずもどってこられる（step3 の L3）。$1$ 行は、この $3$ 段を畳んだものである。

**この $1$ 行は、接点が曲線の上にあるときだけの式。** 右辺が $1$ にそろったのは、接点が曲線の上にあるからだった。では、曲線の外の点を同じ形に入れると、何が描けるだろう——数Ⅲ・C「いろいろな曲線」の次の系列で確かめる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「接線の方程式」の構成（陰関数の微分で楕円の接線を導き、接点が曲線上にあることから右辺が $1$ になる・双曲線と放物線の接線の公式）を参考。問題の値・曲線はすべてオリジナル。

────────

**問いに戻ると**

楕円・双曲線の接線は、曲線の式の $x^2$ を $x_0x$ に、$y^2$ を $y_0y$ に置きかえた $1$ 行になる。放物線では $1$ 次の項 $x$ を $\\dfrac{x + x_0}2$ に置きかえる。係数はそのまま運ぶ。

右辺がそろうのは、接点が曲線の上にあるから。だからこの $1$ 行は、曲線の上の点のための式である。`,
};

/** M3CV6: 外の点から引く接線——接点を文字で置く。（R1 F1-4・F1-5・F1-8・F5-1 で作り直した背骨のとおり）
 *  step1 x²/54 + y²/30 = 1・Q(6, 4)：接点の x {3, 7}／step2 x²/52 + y²/39 = 1・Q(4, 12)：接点の y {9/2, 3/2}
 *  step3（＋α）step2 の x > 0 の接点 (7, 3/2) の接線の y 切片 26
 *  山場 step4（C12 ②）x²/28 + y²/21 = 1・Q(2, 9)：接点の x が正のほうの接線の傾き −5/2。公式に Q をそのまま入れた直線の傾きは −1/6（真の 2 本 {−5/2, 1} のどちらでもない）
 *  step5 step4 の 2 接点 (−4, 3)・(5, 3/2) を通る直線の y 切片 7/3（重い）→ step6（質）Q を公式に入れた直線の y 切片 7/3（軽い・追補13）
 *  step7（逆）y = 9 上の点 Q(u, 9)（u > 0）から x²/50 + y²/18 = 1 への接線の 1 本が傾き −21/5 → u = 5（判別式の解は 5 と −65/7。u > 0 で 1 つ）
 *  step8（質）x²/6 − y²/8 = 1・Q(4, 4)：接点の x {3, 9}（2 本とも右の枝。Q は 2 本引ける領域）
 *  step9（複合・Q3）step2 と同じ楕円・同じ点で、判別式から 2 本の傾き {−7/2, 5/6}
 *  step10（複合）x²/20 + y²/16 = 1、直交する 2 本の接線を引ける点で x = 2 のものの y（正）4√2（u² + v² = 36）
 *  原典 練4（x² + 4y² = 10・Q(4, 1)）・練6（積が一定）・数Ⅱ・B の円と外の点 (3, 1)・(4, 2) は使っていない。比 2:1 の楕円も使っていない。 */
export const M3CV_TANGENT_FROM_SERIES: LearnerSeries = {
  id: "math3_cv_tangent_from_01",
  title: "外の点から引く接線——接点を文字で置く",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 曲線の外の点から接線を引くとき、接点が分からないのにどうやって接線を書くか。接線の公式に外の点をそのまま入れると何が描けるか。$10$ 問で確かめる。",
  patternId: "M3CV6",
  unit: "math_3",
  revelationLabel:
    "**外の点を接線の公式に入れた直線は、接線ではなく、$2$ つの接点を通る直線**",
  drivingQuestion:
    "曲線の外の点から接線を引くとき、接点が分からないのにどうやって接線を書く？——**曲線の上の点のための公式に、外の点をそのまま入れたら何が描ける？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "楕円 $\\dfrac{x^2}{54} + \\dfrac{y^2}{30} = 1$ の外の点 Q$(6,\\ 4)$ から、楕円に接線を $2$ 本引きます。$2$ つの接点の $x$ 座標をすべて求めましょう（カンマで区切って入力）。",
      answer: 3,
      answerDisplay: "3, 7",
      solutionSet: [3, 7],
      unit: "",
      unknownLabel: "接点の $x$ 座標（$2$ つ）",
      inputAffordances: ["multi"],
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "接点はまだ分からない。分からないものを、どう扱えば式が立てられる？",
        },
        {
          layer: 2,
          text: "数Ⅱで、円の外の点から接線を引いたとき、接点を何と置いて、どんな条件を使った？（[接線]）",
        },
        {
          layer: 3,
          text: "接点を $(s,\\ t)$ とおくと、接線は $\\dfrac{sx}{54} + \\dfrac{ty}{30} = 1$。これが Q$(6,\\ 4)$ を通るので $\\dfrac{6s}{54} + \\dfrac{4t}{30} = 1$、つまり $5s + 6t = 45$ …①。接点は楕円の上なので $\\dfrac{s^2}{54} + \\dfrac{t^2}{30} = 1$ …②。①から $t = \\dfrac{45 - 5s}{6}$ を②に入れて整理すると $s^2 - 10s + 21 = 0$、$(s-3)(s-7) = 0$。$s = 3,\\ 7$（接点 $(3,\\ 5)$ と $\\left(7,\\ \\dfrac53\\right)$）。中心の問いへの最初の部分回答：**接点を文字で置けば、「外の点を通る」と「曲線の上にある」の $2$ つの条件で接点が決まる**。",
        },
      ],
      formulaPreview: "5s + 6t = 45 と s²/54 + t²/30 = 1 → s = 3, 7",
      figureMarker: "<<M3CV_OUTSIDE_TANGENTS>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "楕円 $\\dfrac{x^2}{52} + \\dfrac{y^2}{39} = 1$ の外の点 Q$(4,\\ 12)$ から、楕円に接線を $2$ 本引きます。$2$ つの接点の $y$ 座標をすべて求めましょう（カンマで区切って入力）。",
      answer: 3 / 2,
      answerDisplay: "9/2, 3/2",
      solutionSet: [9 / 2, 3 / 2],
      unit: "",
      unknownLabel: "接点の $y$ 座標（$2$ つ）",
      inputAffordances: ["multi"],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが接点の $x$ 座標でなく $y$ 座標であること。" },
        {
          layer: 3,
          text: "接点 $(s,\\ t)$。Q を通る：$\\dfrac{4s}{52} + \\dfrac{12t}{39} = 1$、つまり $3s + 12t = 39$、$s = 13 - 4t$ …①。楕円の上：$\\dfrac{s^2}{52} + \\dfrac{t^2}{39} = 1$ …②。①を②に入れて整理すると $4t^2 - 24t + 27 = 0$、$(2t - 9)(2t - 3) = 0$。$t = \\dfrac92,\\ \\dfrac32$（接点 $\\left(-5,\\ \\dfrac92\\right)$ と $\\left(7,\\ \\dfrac32\\right)$）。中心の問いへ：**どちらの座標を問われても、$2$ つの条件の連立は同じ**。",
        },
      ],
      formulaPreview: "s = 13 − 4t を代入 → 4t² − 24t + 27 = 0 → t = 9/2, 3/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "前題の $2$ 本の接線のうち、接点の $x$ 座標が正のほうの接線の $y$ 切片を求めましょう。",
      answer: 26,
      answerDisplay: "26",
      unit: "",
      unknownLabel: "接線の $y$ 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で分かったことに、何が加わった？" },
        { layer: 2, text: "前題と変わったのは、問われているのが接点でなく、そこで引いた接線の高さであること。" },
        {
          layer: 3,
          text: "$x$ 座標が正の接点は $\\left(7,\\ \\dfrac32\\right)$。接線は $\\dfrac{7x}{52} + \\dfrac{3}{2}\\cdot\\dfrac{y}{39} = 1$、つまり $\\dfrac{7x}{52} + \\dfrac{y}{26} = 1$。$x = 0$ で $y = 26$。確かめ：Q$(4, 12)$ を入れると $\\dfrac{28}{52} + \\dfrac{12}{26} = \\dfrac{7}{13} + \\dfrac{6}{13} = 1$。中心の問いへ：**接点が決まれば、系列5 の $1$ 行で接線が書ける**。",
        },
      ],
      formulaPreview: "接点 (7, 3/2) → 7x/52 + y/26 = 1 → y 切片 26",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "楕円 $\\dfrac{x^2}{28} + \\dfrac{y^2}{21} = 1$ の外の点 Q$(2,\\ 9)$ から、楕円に接線を $2$ 本引きます。そのうち、接点の $x$ 座標が正のほうの接線の傾きを求めましょう。",
      answer: -5 / 2,
      answerDisplay: "-5/2",
      unit: "",
      unknownLabel: "接線の傾き",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までの手順は、ここでも通る？" },
        { layer: 2, text: "前題と変わったのは、問われているのが接線の $y$ 切片でなく傾きであること。" },
        {
          layer: 3,
          text: "接点 $(s,\\ t)$。Q を通る：$\\dfrac{2s}{28} + \\dfrac{9t}{21} = 1$、つまり $s + 6t = 14$ …①。楕円の上：$3s^2 + 4t^2 = 84$ …②。①の $s = 14 - 6t$ を②に入れて $112t^2 - 504t + 504 = 0$、$2t^2 - 9t + 9 = 0$、$t = 3,\\ \\dfrac32$。接点は $(-4,\\ 3)$ と $\\left(5,\\ \\dfrac32\\right)$。$x$ が正のほうの接線は $\\dfrac{5x}{28} + \\dfrac{y}{14} = 1$、傾き $-\\dfrac52$。**系列5 の公式に Q$(2, 9)$ をそのまま入れて $\\dfrac{2x}{28} + \\dfrac{9y}{21} = 1$ とし、その傾き $-\\dfrac16$ を答えると外れる**——もう $1$ 本の接線の傾き $1$ とも違う。あの公式は、接点が曲線の上にあるときの式だった。中心の問いへ：**外の点から引く接線は、接点を文字で置いて決める。公式に外の点を入れた直線は接線ではない——では、何なのか**。",
        },
      ],
      formulaPreview: "接点 (−4, 3)・(5, 3/2) → x > 0 の接線の傾き −5/2（公式に Q を入れた直線の −1/6 ではない）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "前題の $2$ つの接点 $(-4,\\ 3)$ と $\\left(5,\\ \\dfrac32\\right)$ を通る直線の $y$ 切片を求めましょう。",
      answer: 7 / 3,
      answerDisplay: "7/3",
      unit: "",
      unknownLabel: "$2$ つの接点を通る直線の $y$ 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で出したものを、どう使う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが接線でなく、$2$ つの接点を結ぶ直線であること。" },
        {
          layer: 3,
          text: "傾きは $\\dfrac{\\frac32 - 3}{5 - (-4)} = \\dfrac{-\\frac32}{9} = -\\dfrac16$。$y - 3 = -\\dfrac16(x + 4)$ で $x = 0$ とおくと $y = 3 - \\dfrac46 = \\dfrac73$。傾き $-\\dfrac16$——前題で、公式に Q を入れた直線の傾きと同じ。中心の問いへ：**$2$ つの接点を結ぶ直線は、公式に Q を入れた直線と同じ傾き。$y$ 切片はどうだろう**。",
        },
      ],
      formulaPreview: "傾き −1/6、(−4, 3) を通る → y 切片 7/3",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "楕円 $\\dfrac{x^2}{28} + \\dfrac{y^2}{21} = 1$ の接線の公式 $\\dfrac{x_0x}{28} + \\dfrac{y_0y}{21} = 1$ に、楕円の外の点 Q$(2,\\ 9)$ を $(x_0,\\ y_0)$ としてそのまま入れた直線を考えます。この直線の $y$ 切片を求めましょう。",
      answer: 7 / 3,
      answerDisplay: "7/3",
      unit: "",
      unknownLabel: "その直線の $y$ 切片",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。同じ直線かもしれない？" },
        { layer: 2, text: "前題と変わったのは、接点の座標を使わずに、Q の座標だけで直線を書くこと。" },
        {
          layer: 3,
          text: "$\\dfrac{2x}{28} + \\dfrac{9y}{21} = 1$、つまり $\\dfrac{x}{14} + \\dfrac{3y}{7} = 1$。$x = 0$ で $y = \\dfrac73$——前題と同じ。傾きも $-\\dfrac16$ で同じなので、**同じ直線**。**なぜか**：接点 $(s,\\ t)$ の接線が Q を通る条件は $\\dfrac{2s}{28} + \\dfrac{9t}{21} = 1$。これは「点 $(s,\\ t)$ が直線 $\\dfrac{2x}{28} + \\dfrac{9y}{21} = 1$ の上にある」と同じ式。$2$ つの接点はどちらもこの条件を満たすので、どちらもこの直線の上にある。中心の問いへ：**公式に外の点を入れた直線は、接線ではなく、$2$ つの接点を通る直線**。",
        },
      ],
      formulaPreview: "x/14 + 3y/7 = 1 → y 切片 7/3（前題と同じ直線）",
      figureMarker: "<<M3CV_OUTSIDE_ASK>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "直線 $y = 9$ の上の点 Q$(u,\\ 9)$（$u > 0$）から、楕円 $\\dfrac{x^2}{50} + \\dfrac{y^2}{18} = 1$ に引いた接線の $1$ 本は、傾きが $-\\dfrac{21}{5}$ でした。$u$ を求めましょう。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "$u$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。step4 は点から接線の傾きを出した。今度は向きがどう変わった？" },
        { layer: 2, text: "step4 と変わったのは、傾きが先に与えられて、外の点の位置が問われていること。" },
        {
          layer: 3,
          text: "Q を通る傾き $-\\dfrac{21}{5}$ の直線 $y = -\\dfrac{21}{5}(x - u) + 9$ が楕円に接する条件を、楕円の式に代入した $x$ の $2$ 次方程式の判別式 $= 0$ で書くと $\\left(9 + \\dfrac{21}{5}u\\right)^2 = 50\\cdot\\dfrac{441}{25} + 18 = 900$。$9 + \\dfrac{21}{5}u = \\pm30$、$u = 5$ または $u = -\\dfrac{65}{7}$。$u > 0$ なので $u = 5$。（接点は $\\left(7,\\ \\dfrac35\\right)$ で、接線 $\\dfrac{7x}{50} + \\dfrac{y}{30} = 1$ は $y = 9$ のとき $x = 5$。）中心の問いへ：**傾きが決まった接線は $2$ 本あり、それぞれが $y = 9$ と $1$ 点で交わる——だから $u$ も $2$ つ出て、範囲で $1$ つに決める**。",
        },
      ],
      formulaPreview: "(9 + 21u/5)² = 900 → u = 5（u = −65/7 は範囲外）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "双曲線 $\\dfrac{x^2}{6} - \\dfrac{y^2}{8} = 1$ の外の点 Q$(4,\\ 4)$ から、双曲線に接線を $2$ 本引けます。$2$ つの接点の $x$ 座標をすべて求めましょう（カンマで区切って入力）。",
      answer: 3,
      answerDisplay: "3, 9",
      solutionSet: [3, 9],
      unit: "",
      unknownLabel: "接点の $x$ 座標（$2$ つ）",
      inputAffordances: ["multi"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "step1 と比べてみよう。step1 の手順は、ここでも通る？" },
        { layer: 2, text: "step1 と変わったのは、曲線が楕円から双曲線になったこと。" },
        {
          layer: 3,
          text: "接点 $(s,\\ t)$ の接線は $\\dfrac{sx}{6} - \\dfrac{ty}{8} = 1$。Q を通る：$\\dfrac{4s}{6} - \\dfrac{4t}{8} = 1$、つまり $4s - 3t = 6$、$t = \\dfrac{4s - 6}{3}$ …①。双曲線の上：$\\dfrac{s^2}{6} - \\dfrac{t^2}{8} = 1$ …②。①を②に入れて整理すると $s^2 - 12s + 27 = 0$、$s = 3,\\ 9$（接点 $(3,\\ 2)$ と $(9,\\ 10)$。どちらも右の曲線）。中心の問いへ：**双曲線でも、接点を文字で置く道はそのまま通る**。（双曲線では、外の点の位置によって、接線が $2$ 本引けない点もある。）",
        },
      ],
      formulaPreview: "4s − 3t = 6 と s²/6 − t²/8 = 1 → s = 3, 9",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "step2 と同じ楕円 $\\dfrac{x^2}{52} + \\dfrac{y^2}{39} = 1$ と点 Q$(4,\\ 12)$ について、こんどは Q を通る傾き $m$ の直線 $y = m(x - 4) + 12$ を楕円の式に代入し、$x$ の $2$ 次方程式が重解をもつ条件から、$2$ 本の接線の傾きをすべて求めましょう（カンマで区切って入力）。",
      answer: -7 / 2,
      answerDisplay: "-7/2, 5/6",
      solutionSet: [-7 / 2, 5 / 6],
      unit: "",
      unknownLabel: "接線の傾き（$2$ つ）",
      inputAffordances: ["multi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "step2 と比べてみよう。同じ $2$ 本の接線を、別の道で追うと？" },
        { layer: 2, text: "step2 と変わったのは、接点を文字で置く代わりに、傾きを文字で置くこと。" },
        {
          layer: 3,
          text: "$y = mx + (12 - 4m)$ を $3x^2 + 4y^2 = 156$ に入れると $(3 + 4m^2)x^2 + 8m(12 - 4m)x + 4(12 - 4m)^2 - 156 = 0$。重解の条件（[判別式] $= 0$）を整理すると $(12 - 4m)^2 = 52m^2 + 39$、$36m^2 + 96m - 105 = 0$、$12m^2 + 32m - 35 = 0$、$(2m + 7)(6m - 5) = 0$。$m = -\\dfrac72,\\ \\dfrac56$。step2 の接点から出すと：$\\left(7,\\ \\dfrac32\\right)$ の接線の傾きは $-\\dfrac{7}{52}\\cdot26 = -\\dfrac72$、$\\left(-5,\\ \\dfrac92\\right)$ では $\\dfrac{5}{52}\\cdot\\dfrac{26}{3} = \\dfrac56$——同じ $2$ つ。中心の問いへ：**接点を文字で置く道と、傾きを文字で置く道は、同じ $2$ 本の接線に届く**。",
        },
      ],
      formulaPreview: "(12 − 4m)² = 52m² + 39 → 12m² + 32m − 35 = 0 → m = −7/2, 5/6",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "楕円 $\\dfrac{x^2}{20} + \\dfrac{y^2}{16} = 1$ の外の点 Q$(2,\\ v)$（$v > 0$）から引いた $2$ 本の接線が直交するとき、$v$ を求めましょう。",
      answer: 4 * Math.sqrt(2),
      answerDisplay: "4√2",
      unit: "",
      unknownLabel: "$v$",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の道は、ここで使える？" },
        { layer: 2, text: "前題と変わったのは、2 本の傾きでなく、その関係（直交）が与えられ、点の位置が問われていること。" },
        {
          layer: 3,
          text: "Q を通る傾き $m$ の直線 $y = m(x - 2) + v$ が楕円に接する条件は、前題と同じ整理で $(v - 2m)^2 = 20m^2 + 16$、つまり $16m^2 + 4vm + 16 - v^2 = 0$。$2$ 本の傾きはこの $2$ 解で、直交するので積が $-1$：解と係数の関係から $\\dfrac{16 - v^2}{16} = -1$、$v^2 = 32$、$v = 4\\sqrt2$。（$2^2 + v^2 = 36 = 20 + 16$。直交する $2$ 本の接線を引ける点は、どれも円 $x^2 + y^2 = 20 + 16$ の上にある。）中心の問いへ：**傾きを文字で置く道なら、$2$ 本の接線の関係（積・和）を、接点を求めずに使える**。",
        },
      ],
      formulaPreview: "16m² + 4vm + 16 − v² = 0、積 = −1 → v² = 32 → v = 4√2",
    },
  ],
  derivation: `**中心の問い** ｜ 曲線の外の点から接線を引くとき、接点が分からないのにどうやって接線を書く？——**曲線の上の点のための公式に、外の点をそのまま入れたら何が描ける？**

────────

## 接点を文字で置く

外の点 Q$(p,\\ q)$ から楕円 $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ に接線を引く。接点 $(s,\\ t)$ が分からないので、文字のまま [接線] を書く：

$$\\frac{sx}{a^2} + \\frac{ty}{b^2} = 1$$

これが Q を通る条件 $\\dfrac{ps}{a^2} + \\dfrac{qt}{b^2} = 1$ と、接点が楕円の上にある条件 $\\dfrac{s^2}{a^2} + \\dfrac{t^2}{b^2} = 1$ を連立すれば、接点が $2$ つ決まる（step1〜3）。数Ⅱの円の接線と同じ手つきである。

## ここが胚細胞：外の点を公式に入れた直線の正体

Q を通る条件 $\\dfrac{ps}{a^2} + \\dfrac{qt}{b^2} = 1$ は、見方を変えると「点 $(s,\\ t)$ が直線 $\\dfrac{px}{a^2} + \\dfrac{qy}{b^2} = 1$ の上にある」という式である。$2$ つの接点はどちらもこの条件を満たすので、

> **接線の公式に外の点 Q をそのまま入れた直線は、Q から引いた $2$ 本の接線の、$2$ つの接点を通る直線**

になる（step5・6）。接線ではないので、その傾きを接線の傾きと思うと外れる（step4）。楕円でも双曲線でも放物線でも同じことが言える。

## Step の道筋

- **step1〜3**：接点を文字で置き、$2$ つの条件で接点を決める（数Ⅱの円の接線と合流）
- **step4（山場）**：接線の傾き。公式に外の点を入れた直線の傾きでは外れる
- **step5・6（質的変化）**：$2$ つの接点を通る直線と、公式に外の点を入れた直線が一致する
- **step7**：傾きから外の点を戻す（判別式・解は範囲で $1$ つに）
- **step8**：双曲線でも同じ道
- **step9**：傾きを文字で置く道（判別式）で、同じ $2$ 本に届く（数Ⅱの判別式と合流）
- **step10**：$2$ 本の接線が直交する外の点（解と係数の関係）

────────

**もっと深く**

**忘れても導ける。** 外の点の問題には、たいてい「接点を文字で置く」か「傾きを文字で置く」の $2$ つの道がある（縦の接線は傾きで置けないので、接点の道で拾う）。接点を問われたら前者、傾きや $2$ 本の関係を問われたら後者が短いことが多い。

**直交する $2$ 本の接線を引ける点。** step10 の計算は、点の $x$ 座標によらず $x^2 + y^2 = a^2 + b^2$ を導く（ただし $x = \\pm a$ の点では接線の $1$ 本が縦になり、傾きで置く道は使えない）。直交する $2$ 本の接線を引ける点は、この円の上にある。

**双曲線では、外の点の位置に注意。** 双曲線の外の点でも、点の位置によっては接線が $2$ 本引けないことがある（判別式の条件が解をもたない）。

**この先の景色。** 外の点 Q と、$2$ つの接点を通る直線の組は、射影幾何学で「極」と「極線」と呼ばれる。点と直線が $1$ 対 $1$ に入れかわる、という見方が大学の幾何で広がる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「接線の方程式」の練習問題4 の構成（外の点から引いた $2$ 本の接線を、接点を文字で置いて求める）を参考。曲線・点・問いの量はすべてオリジナル。

────────

**問いに戻ると**

接点が分からないときは、接点を文字で置き、「外の点を通る」と「曲線の上にある」の $2$ つの条件で決める。傾きを文字で置いて、重解の条件から決めてもよい。

公式に外の点をそのまま入れた直線は、接線ではない。それは、外の点から引いた $2$ 本の接線の、$2$ つの接点を通る直線である。`,
};

/** M3CV7: 2 次曲線——式の形から曲線を見分ける。（R1 F1-6・F1-7・F1-9 で作り直した背骨のとおり）
 *  step1・2 3x² − 18x + 8y² + 16y − 13 = 0 ＝ (x−3)²/16 + (y+1)²/6 = 1：中心の x 3・長軸 8
 *  step3（＋α）5x² − 10x − 4y² + 8y − 19 = 0 ＝ (x−1)²/4 − (y−1)²/5 = 1：焦点の x の大きいほう 4
 *  山場 step4（C12 ②）5 本のうち楕円を表すもの：正答 2（右辺 0＝1 点・右辺 負＝何もない を混ぜた）。x² と y² の係数の符号だけで数えると 4
 *  step5・6 x²/25 + y²/16 = 1、焦点 F(3, 0)、直線 x = 25/3：P(−4, 12/5) で PF/PH = (37/5)/(37/3) = 3/5（重い）→ 端 (5, 0) で 2/(10/3) = 3/5（軽い・追補13）
 *  step7（逆）焦点 (1, 0)・直線 x = 9・比 1/3 → x²/9 + y²/8 = 1 の □ = 9
 *  step8（質）焦点 (3, 0)・直線 x = 4/3・比 3/2 → x²/4 − y²/5 = 1 の △ = 5
 *  step9（複合・C13 系列3）step8 の双曲線の漸近線の傾き（正）√5/2
 *  step10（複合・C13 数Ⅱ 判別式）x² + 3y² = 72 と y² = 2x の共有点の x 座標：{6}（代入で出る −12 は y² < 0 で捨てる。初版は {2} で step4 の答え 2 と同じだったので替えた）
 *  原典 練1(1)(iii)（7x² − 42x + 16y² − 49 = 0）・(16, 7)・(16, 12)・比 2:1・第5章の (9, 4) は使っていない。語「離心率」は derivation の「もっと深く」だけ（Q5）。 */
export const M3CV_CONIC_SERIES: LearnerSeries = {
  id: "math3_cv_conic_01",
  title: "2 次曲線——式の形から曲線を見分ける",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — $x^2$ と $y^2$ の係数を見るだけで、その式が楕円か双曲線か放物線か分かるか。$3$ つの曲線を $1$ つの物差しで並べるにはどうするか。$10$ 問で確かめる。",
  patternId: "M3CV7",
  unit: "math_3",
  revelationLabel:
    "**係数の符号だけでは決まらない**——平方完成したあとの右辺が $0$ なら $1$ 点、負なら何もない",
  drivingQuestion:
    "$x^2$ と $y^2$ の係数・符号を見るだけで、その式が楕円か双曲線か放物線か分かる？——**$3$ つの曲線を $1$ つの物差しで並べるには？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "曲線 $3x^2 - 18x + 8y^2 + 16y - 13 = 0$ は楕円です。この楕円の中心の $x$ 座標を求めましょう。",
      answer: 3,
      answerDisplay: "3",
      unit: "",
      unknownLabel: "中心の $x$ 座標",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$x$ の $1$ 次の項があるのは、中心が原点からずれているから。ずれを読むには、式をどんな形にすればいい？",
        },
        {
          layer: 2,
          text: "数Ⅱで、円の一般形から中心と半径を読むとき、何をした？（[平方完成]）",
        },
        {
          layer: 3,
          text: "$3(x^2 - 6x) + 8(y^2 + 2y) - 13 = 0$、$3\\{(x-3)^2 - 9\\} + 8\\{(y+1)^2 - 1\\} - 13 = 0$、$3(x-3)^2 + 8(y+1)^2 = 48$。両辺を $48$ で割って $\\dfrac{(x-3)^2}{16} + \\dfrac{(y+1)^2}{6} = 1$。中心は $(3,\\ -1)$、$x$ 座標は $3$。中心の問いへの最初の部分回答：**$xy$ の項のない $2$ 次式は、$x$ と $y$ をそれぞれ平方完成すれば、標準形にもどせる**。",
        },
      ],
      formulaPreview: "3(x − 3)² + 8(y + 1)² = 48 → (x−3)²/16 + (y+1)²/6 = 1 → 中心 (3, −1)",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題の楕円 $3x^2 - 18x + 8y^2 + 16y - 13 = 0$ の長軸の長さを求めましょう。",
      answer: 8,
      answerDisplay: "8",
      unit: "",
      unknownLabel: "長軸の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で作った形から、ほかに何が読める？" },
        { layer: 2, text: "前題と変わったのは、問われているのが中心でなく、長いほうの軸の長さであること。" },
        {
          layer: 3,
          text: "$\\dfrac{(x-3)^2}{16} + \\dfrac{(y+1)^2}{6} = 1$ の大きいほうの分母は $16$ で、$x$ の向き。中心から端まで $4$ なので、長軸の長さは $8$。中心の問いへ：**標準形にもどせば、楕円の系列で読んだものがすべて読める**。",
        },
      ],
      formulaPreview: "大きいほうの分母 16 → 端まで 4 → 長軸 8",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "曲線 $5x^2 - 10x - 4y^2 + 8y - 19 = 0$ の $2$ つの焦点のうち、$x$ 座標が大きいほうの $x$ 座標を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "焦点の $x$ 座標（大きいほう）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。この式は前題とどこが違う？" },
        { layer: 2, text: "前題と変わったのは、$x^2$ と $y^2$ の係数の符号が逆であること。" },
        {
          layer: 3,
          text: "平方完成：$5(x-1)^2 - 5 - 4(y-1)^2 + 4 - 19 = 0$、$5(x-1)^2 - 4(y-1)^2 = 20$、$\\dfrac{(x-1)^2}{4} - \\dfrac{(y-1)^2}{5} = 1$。中心 $(1,\\ 1)$ の [双曲線]。焦点までは $\\sqrt{4 + 5} = 3$ なので、焦点の $x$ 座標は $1 \\pm 3$、大きいほうは $4$。中心の問いへ：**$x^2$ と $y^2$ の係数が逆符号なら、双曲線の形にもどる**。",
        },
      ],
      formulaPreview: "(x−1)²/4 − (y−1)²/5 = 1 → c = 3 → x = 4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "次の $5$ つの式のうち、楕円を表すものはいくつあるでしょう。\n\n- (ア) $x^2 + 3y^2 - 2x - 8 = 0$\n- (イ) $2x^2 + 3y^2 + 4x - 6y + 5 = 0$\n- (ウ) $x^2 + 2y^2 + 6x + 12 = 0$\n- (エ) $3x^2 + y^2 - 6y = 0$\n- (オ) $x^2 - 3y^2 + 2x = 0$",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "楕円を表す式の個数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。係数の符号を見るだけで、見分けは終わる？" },
        { layer: 2, text: "前題と変わったのは、$1$ つの式を読むのでなく、$5$ つの式を見分けること。" },
        {
          layer: 3,
          text: "それぞれ平方完成する。(ア) $(x-1)^2 + 3y^2 = 9$：楕円。(イ) $2(x+1)^2 + 3(y-1)^2 = 0$：これを満たすのは $x = -1,\\ y = 1$ の **$1$ 点だけ**。(ウ) $(x+3)^2 + 2y^2 = -3$：左辺は $0$ 以上なので、**満たす点が無い**。(エ) $3x^2 + (y-3)^2 = 9$：楕円。(オ) $(x+1)^2 - 3y^2 = 1$：係数が逆符号の双曲線。楕円は (ア)(エ) の $2$ つ。**$x^2$ と $y^2$ の係数が同じ符号のものを数えて $4$ とすると外れる**——(イ)(ウ) は係数の符号は楕円と同じでも、平方完成したあとの右辺が $0$ や負で、楕円にならない。中心の問いへ：**係数の符号は候補をしぼるだけ。平方完成したあとの右辺まで見て、はじめて曲線が決まる**。",
        },
      ],
      formulaPreview: "(ア)(エ) 楕円・(イ) 1 点・(ウ) なし・(オ) 双曲線 → 2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "楕円 $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$ の焦点の $1$ つは F$(3,\\ 0)$ です。楕円の上の点 P$\\left(-4,\\ \\dfrac{12}{5}\\right)$ から F までの距離 PF と、P から直線 $x = \\dfrac{25}{3}$ までの距離 PH を、どちらも定義どおりに測り、比 $\\dfrac{\\mathrm{PF}}{\\mathrm{PH}}$ を求めましょう。",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "",
      unknownLabel: "$\\dfrac{\\mathrm{PF}}{\\mathrm{PH}}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は式の形で見分けた。今度は何を物差しにしている？" },
        { layer: 2, text: "前題と変わったのは、式の形でなく、点からの距離と直線からの距離の比を測ること。" },
        {
          layer: 3,
          text: "$\\mathrm{PF} = \\sqrt{(-4 - 3)^2 + \\left(\\dfrac{12}{5}\\right)^2} = \\sqrt{49 + \\dfrac{144}{25}} = \\sqrt{\\dfrac{1369}{25}} = \\dfrac{37}{5}$。直線 $x = \\dfrac{25}{3}$ は縦の直線なので $\\mathrm{PH} = \\dfrac{25}{3} - (-4) = \\dfrac{37}{3}$。比は $\\dfrac{37}{5} \\div \\dfrac{37}{3} = \\dfrac35$。中心の問いへ：**楕円の上の点で、焦点までの距離と、ある直線までの距離の比を測ると $\\dfrac35$。ほかの点でも同じだろうか**。",
        },
      ],
      formulaPreview: "PF = 37/5、PH = 37/3 → PF/PH = 3/5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "前題と同じ楕円・焦点 F$(3,\\ 0)$・直線 $x = \\dfrac{25}{3}$ について、楕円の端の点 A$(5,\\ 0)$ で同じ比 $\\dfrac{\\mathrm{AF}}{\\mathrm{AH}}$ を求めましょう（H は A から直線に下ろした垂線の足）。",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "",
      unknownLabel: "$\\dfrac{\\mathrm{AF}}{\\mathrm{AH}}$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、点が楕円の $x$ 軸上の端になったこと。" },
        {
          layer: 3,
          text: "$\\mathrm{AF} = 5 - 3 = 2$、$\\mathrm{AH} = \\dfrac{25}{3} - 5 = \\dfrac{10}{3}$。比は $2 \\div \\dfrac{10}{3} = \\dfrac35$——前題と同じ。$\\dfrac35$ は、焦点までの距離 $3$ を、和の半分 $5$ で割った数でもある。中心の問いへ：**楕円の上では、焦点からの距離と、ある直線（準線）までの距離の比が一定。その比は $1$ より小さい**。",
        },
      ],
      formulaPreview: "AF = 2、AH = 10/3 → 3/5（前題と同じ）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "点 F$(1,\\ 0)$ からの距離と、直線 $x = 9$ までの距離の比が $1 : 3$ である点 P の集まりは楕円です。その方程式を $\\dfrac{x^2}{\\square} + \\dfrac{y^2}{\\triangle} = 1$（中心は原点）の形に書いたときの □ を求めましょう。",
      answer: 9,
      answerDisplay: "9",
      unit: "",
      unknownLabel: "□（$x^2$ の分母）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は楕円から比を測った。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、比が先に与えられて、曲線の式を作る側になったこと。" },
        {
          layer: 3,
          text: "P$(x,\\ y)$ について $3\\,\\mathrm{PF} = \\mathrm{PH}$。$2$ 乗して $9\\{(x-1)^2 + y^2\\} = (x - 9)^2$。展開して $9x^2 - 18x + 9 + 9y^2 = x^2 - 18x + 81$、$8x^2 + 9y^2 = 72$、$\\dfrac{x^2}{9} + \\dfrac{y^2}{8} = 1$。□ $= 9$。確かめ：焦点までの距離 $\\sqrt{9 - 8} = 1$、比 $\\dfrac13$ は $1 \\div 3$。中心の問いへ：**焦点と直線と比が決まれば、曲線が決まる。比が $1$ より小さいと楕円**。",
        },
      ],
      formulaPreview: "9{(x − 1)² + y²} = (x − 9)² → 8x² + 9y² = 72 → □ = 9",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "点 F$(3,\\ 0)$ からの距離と、直線 $x = \\dfrac43$ までの距離の比が $3 : 2$ である点 P の集まりを考えます。その方程式を $\\dfrac{x^2}{\\square} - \\dfrac{y^2}{\\triangle} = 1$ の形に書いたときの △ を求めましょう。",
      answer: 5,
      answerDisplay: "5",
      unit: "",
      unknownLabel: "△（$y^2$ の分母）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題の手順は、ここでも通る？" },
        { layer: 2, text: "前題と変わったのは、比が $1$ より大きくなったこと。" },
        {
          layer: 3,
          text: "$2\\,\\mathrm{PF} = 3\\,\\mathrm{PH}$。$2$ 乗して $4\\{(x-3)^2 + y^2\\} = 9\\left(x - \\dfrac43\\right)^2$。展開して $4x^2 - 24x + 36 + 4y^2 = 9x^2 - 24x + 16$、$5x^2 - 4y^2 = 20$、$\\dfrac{x^2}{4} - \\dfrac{y^2}{5} = 1$。△ $= 5$。[双曲線] になった（焦点までの距離 $\\sqrt{4 + 5} = 3$ も合う）。中心の問いへ：**比が $1$ より大きいと双曲線。比がちょうど $1$ なら、焦点と準線から等距離の放物線**。",
        },
      ],
      formulaPreview: "4{(x − 3)² + y²} = 9(x − 4/3)² → 5x² − 4y² = 20 → △ = 5",
      figureMarker: "<<M3CV_RATIO_ASK>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "前題で得た曲線（点 F$(3,\\ 0)$ と直線 $x = \\dfrac43$ からの距離の比が $3 : 2$ の点の集まり）の漸近線のうち、傾きが正のものの傾きを求めましょう。",
      answer: Math.sqrt(5) / 2,
      answerDisplay: "√5/2",
      unit: "",
      unknownLabel: "傾きが正の漸近線の傾き",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で作った式から、双曲線の系列で読んだものが読める？" },
        { layer: 2, text: "前題と変わったのは、問われているのが分母でなく、遠くで近づく直線であること。" },
        {
          layer: 3,
          text: "$\\dfrac{x^2}{4} - \\dfrac{y^2}{5} = 1$ の漸近線は $y = \\pm\\dfrac{\\sqrt5}{2}x$（系列3 の $y = \\pm\\dfrac bax$）。傾きが正のものは $\\dfrac{\\sqrt5}{2}$。中心の問いへ：**比の条件から作った曲線も、標準形にもどせば、双曲線として読める**。",
        },
      ],
      formulaPreview: "x²/4 − y²/5 = 1 → 漸近線 y = ±(√5/2)x",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "楕円 $x^2 + 3y^2 = 72$ と放物線 $y^2 = 2x$ の共有点の $x$ 座標をすべて求めましょう（$2$ つ以上あるときはカンマで区切って入力）。",
      answer: 6,
      answerDisplay: "6",
      solutionSet: [6],
      unit: "",
      unknownLabel: "共有点の $x$ 座標",
      inputAffordances: ["multi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。step4 で見落としやすかったことは、ここでも起きる？" },
        { layer: 2, text: "step4 と変わったのは、$1$ つの式の見分けでなく、$2$ つの曲線の共有点を求めること。" },
        {
          layer: 3,
          text: "$y^2 = 2x$ を楕円の式に代入して $x^2 + 6x - 72 = 0$、$(x + 12)(x - 6) = 0$、$x = -12,\\ 6$。ところが $x = -12$ のとき $y^2 = 2 \\times (-12) < 0$ で、実数の $y$ が無い——放物線 $y^2 = 2x$ の上の点は $x \\ge 0$ を満たす。共有点は $x = 6$（$y = \\pm2\\sqrt3$）の $2$ 点で、$x$ 座標は $6$ だけ。中心の問いへ：**式の上で出てきた解も、もとの曲線の上に点があるかを確かめる。$2$ 次の式は、右辺や $y^2$ の符号で「点が無い」が起きる**。",
        },
      ],
      formulaPreview: "x² + 6x − 72 = 0 → x = 6（x = −12 は y² < 0 で点が無い）",
    },
  ],
  derivation: `**中心の問い** ｜ $x^2$ と $y^2$ の係数・符号を見るだけで、その式が楕円か双曲線か放物線か分かる？——**$3$ つの曲線を $1$ つの物差しで並べるには？**

────────

## 平方完成で標準形にもどす

楕円・双曲線・放物線は、どれも $x,\\ y$ の $2$ 次式で表される。$xy$ の項が無い式 $Ax^2 + Cy^2 + Dx + Ey + F = 0$ なら、$x$ と $y$ をそれぞれ [平方完成] して標準形にもどせる（step1〜3）。この仲間をまとめて [2次曲線] という。

## ここが胚細胞：係数の符号は候補、右辺が決め手

平方完成したあとの形で見分ける：

| $A,\\ C$ の符号 | 右辺が正 | 右辺が $0$ | 右辺が負 |
|---|---|---|---|
| 同じ符号 | 楕円（$A = C$ なら円） | $1$ 点 | 何もない |
| 逆の符号 | 双曲線 | 交わる $2$ 直線 | 双曲線（向きが変わる） |

片方が $0$ なら放物線の候補（もう一方の $1$ 次の項が無ければ、平行な $2$ 直線・$1$ 直線・何もない、になることもある）。**係数の符号だけで「楕円だ」と決めると外れる**（step4）。

## もう $1$ つの物差し：焦点と準線からの距離の比

放物線は「焦点からの距離 ＝ 準線までの距離」だった。比を $1$ 以外にすると：

- 比が $1$ より小さい → 楕円（step5〜7）
- 比が $1$ → 放物線
- 比が $1$ より大きい → 双曲線（step8・9）

$3$ つの曲線が、**$1$ つの数の大小**で並ぶ。

## Step の道筋

- **step1〜3**：一般形を平方完成して、中心・長軸・焦点を読む
- **step4（質的変化・山場）**：係数の符号だけでは楕円と決まらない
- **step5・6**：楕円の上で、焦点と直線からの距離の比が一定
- **step7・8**：比から曲線を作る。$1$ より小さいと楕円、大きいと双曲線
- **step9**：比から作った双曲線の漸近線（系列3 と合流）
- **step10**：$2$ つの曲線の共有点。式の解でも点が無いことがある（数Ⅱの判別式と合流）

────────

**もっと深く**

**忘れても導ける。** 一般形を見たら、まず平方完成。標準形にもどれば、楕円・双曲線・放物線の系列で読んだものがすべて読める。右辺の符号を見落とさない。

**比の名前。** 焦点からの距離と準線までの距離の比を、その曲線の **離心率** という。楕円では（焦点までの距離）÷（和の半分）、つまり $\\dfrac ca$ に等しい（step6）。$0$ に近いほど円に近い楕円になる。

**$xy$ の項がある $2$ 次式。** $x^2 + xy + y^2 = 1$ のような式は、楕円を回した形になっている。座標軸を回して $xy$ の項を消せば、ここと同じ見分けができる（大学の線形代数で「$2$ 次形式」として扱う）。

**円錐を切る。** $2$ 本の円錐を頂点で上下に合わせた立体を平面で切ると、切り口に楕円・放物線・双曲線が現れる。だから $2$ 次曲線は「円錐曲線」とも呼ばれる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「2次曲線」の構成（楕円・双曲線・放物線は $2$ 次式で表される・一般形を平方完成して標準形にもどす）を参考。焦点と準線からの距離の比で $3$ つを並べる step は原典に無く、この系列で足した。問題の値はすべてオリジナル。

────────

**問いに戻ると**

係数の符号だけでは決まらない。$x$ と $y$ をそれぞれ平方完成し、右辺の符号まで見て、はじめて曲線が決まる（退化した $1$ 点・何もない・$2$ 直線を除けば、楕円・双曲線・放物線のどれか）。

$3$ つの曲線を $1$ つの物差しで並べるなら、焦点からの距離と準線までの距離の比を測る。比が $1$ より小さいと楕円、$1$ なら放物線、大きいと双曲線。`,
};

/** M3CV8: 極座標——向きと距離で点を指す。
 *  step1 (6, 5π/6) の x：−3√3／step2 (8, 7π/4) の y：−4√2
 *  step3（逆）(−2√3, 2) の r：4／step4（逆）(3, −3√3) の θ（0 ≤ θ < 2π）：5π/3
 *  山場 step5（C12 ②）(−6, π/3) を r > 0・0 ≤ θ < 2π で書き直した θ：4π/3（素朴に π/3 のまま）
 *  step6 (5, 17π/6) の書き直しの θ：5π/6
 *  step7（＋α・C13 余弦定理 algebra1_trig_cosine_app_01）A(4, π/6)・B(6, π/2) の距離 2√7（直交座標に直しても同じ＝Q3）
 *  step8（複合・C13 三角形の面積 algebra1_trig_area_cosine_01）O・A(6, π/12)・B(10, 3π/4) の面積 15√3
 *  step9（＋α・C13 第10章 回転 math3_cpx_rotate_01）点 (2√3, 2) を O のまわりに 5π/12 回した点の x：√2 − √6（加法定理）
 *  step10（複合・逆）直交 A(3, √3)・B(−1, √3) → 偏角 π/6 と 2π/3 → ∠AOB = π/2
 *  原典 練7 の (2, π/6)・(5, 3π/4)・(−1, −1)・(−√2, √6)、p.333 の (4, π/3)・(2, 5π/4) は使っていない。 */
export const M3CV_POLAR_SERIES: LearnerSeries = {
  id: "math3_cv_polar_01",
  title: "極座標——向きと距離で点を指す",
  subtitle:
    "数Ⅲ・C いろいろな曲線より — 点の位置を「どの向きに、どれだけ進むか」で指すと、直交座標と何が変わるか。同じ点の書き方が $1$ つに決まらないのは、困ることか、使えることか。$10$ 問で確かめる。",
  patternId: "M3CV8",
  unit: "math_3",
  revelationLabel:
    "**$r$ が負なら、$\\theta$ の向きと反対へ進む**——同じ点は、角を $\\pi$ ずらして $r$ を正にしても書ける",
  drivingQuestion:
    "点の位置を『どの向きに、どれだけ進むか』で指すと、直交座標と何が変わる？——**同じ点の書き方が $1$ つに決まらないのは、困ることか、使えることか？**",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "原点 O を基準の点（**極**）、$x$ 軸の正の向きを基準の向き（**始線**）とします。始線から角 $\\theta$ だけ回った向きに、O から距離 $r$ だけ進んだ点を $(r,\\ \\theta)$ と書きます（[極座標]）。\n\n極座標で $\\left(6,\\ \\dfrac{5\\pi}{6}\\right)$ と表される点の $x$ 座標を求めましょう。",
      answer: -3 * Math.sqrt(3),
      answerDisplay: "-3√3",
      unit: "",
      unknownLabel: "$x$ 座標",
      inputAffordances: ["sqrt"],
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "向きと距離が分かっている点の $x$ 座標は、どんな三角関数で書ける？",
        },
        {
          layer: 2,
          text: "第10章で、複素数を「大きさと向き」で書いたとき、実部はどう出した？（[極形式]）",
        },
        {
          layer: 3,
          text: "$x = r\\cos\\theta = 6\\cos\\dfrac{5\\pi}{6} = 6 \\times \\left(-\\dfrac{\\sqrt3}{2}\\right) = -3\\sqrt3$。（$y = 6\\sin\\dfrac{5\\pi}{6} = 3$。）中心の問いへの最初の部分回答：**極座標 $(r,\\ \\theta)$ と直交座標は $x = r\\cos\\theta$、$y = r\\sin\\theta$ で行き来できる**。",
        },
      ],
      formulaPreview: "x = 6 cos(5π/6) = −3√3",
      figureMarker: "<<M3CV_POLAR_POINT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "極座標で $\\left(8,\\ \\dfrac{7\\pi}{4}\\right)$ と表される点の $y$ 座標を求めましょう。",
      answer: -4 * Math.sqrt(2),
      answerDisplay: "-4√2",
      unit: "",
      unknownLabel: "$y$ 座標",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが $x$ 座標でなく $y$ 座標であること。" },
        {
          layer: 3,
          text: "$y = r\\sin\\theta = 8\\sin\\dfrac{7\\pi}{4} = 8 \\times \\left(-\\dfrac{\\sqrt2}{2}\\right) = -4\\sqrt2$。$\\dfrac{7\\pi}{4}$ の向きは第 $4$ 象限なので、$y$ 座標は負。中心の問いへ：**角の向きが、座標の符号を決める**。",
        },
      ],
      formulaPreview: "y = 8 sin(7π/4) = −4√2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "直交座標で $(-2\\sqrt3,\\ 2)$ の点を極座標 $(r,\\ \\theta)$（$r > 0$）で表すときの $r$ を求めましょう。",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "$r$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題は極座標から直交座標へ。今度は向きがどう変わった？" },
        { layer: 2, text: "前題と変わったのは、直交座標が先に与えられて、極からの距離が問われていること。" },
        {
          layer: 3,
          text: "$r$ は O からの距離なので $r = \\sqrt{(-2\\sqrt3)^2 + 2^2} = \\sqrt{12 + 4} = 4$。中心の問いへ：**$r = \\sqrt{x^2 + y^2}$。距離は、直交座標から三平方の定理で戻せる**。",
        },
      ],
      formulaPreview: "r = √(12 + 4) = 4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "直交座標で $(3,\\ -3\\sqrt3)$ の点を極座標 $(r,\\ \\theta)$（$r > 0$、$0 \\le \\theta < 2\\pi$）で表すときの $\\theta$ を求めましょう。",
      answer: (5 * Math.PI) / 3,
      answerDisplay: "5π/3",
      unit: "",
      unknownLabel: "$\\theta$",
      inputAffordances: ["pi"],
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、問われているのが距離でなく、向き（角）であること。" },
        {
          layer: 3,
          text: "$r = \\sqrt{9 + 27} = 6$。$\\cos\\theta = \\dfrac{3}{6} = \\dfrac12$、$\\sin\\theta = \\dfrac{-3\\sqrt3}{6} = -\\dfrac{\\sqrt3}{2}$。$0 \\le \\theta < 2\\pi$ で $\\cos\\theta = \\dfrac12$ になるのは $\\dfrac{\\pi}{3}$ と $\\dfrac{5\\pi}{3}$。$\\sin\\theta < 0$ なのは $\\dfrac{5\\pi}{3}$。（$\\tan\\theta = -\\sqrt3$ だけで決めようとすると、$\\dfrac{2\\pi}{3}$ と $\\dfrac{5\\pi}{3}$ の $2$ つが残る——点がどの象限にあるかで選ぶ。）中心の問いへ：**向きは、$\\cos$ と $\\sin$ の両方（点の象限）を見て決める**。",
        },
      ],
      formulaPreview: "cos θ = 1/2、sin θ = −√3/2 → θ = 5π/3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "極座標では $r$ が負の数のときも、「$\\theta$ の向きと反対の向きに $|r|$ だけ進んだ点」と約束して $(r,\\ \\theta)$ と書くことがあります。\n\n極座標で $\\left(-6,\\ \\dfrac{\\pi}{3}\\right)$ と表される点を、$r > 0$、$0 \\le \\theta < 2\\pi$ の範囲で表し直したときの $\\theta$ を求めましょう。",
      answer: (4 * Math.PI) / 3,
      answerDisplay: "4π/3",
      unit: "",
      unknownLabel: "$\\theta$",
      inputAffordances: ["pi"],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。この極座標は、これまでとどこが違う？" },
        { layer: 2, text: "前題と変わったのは、$r$ が負の数であること。" },
        {
          layer: 3,
          text: "$\\dfrac{\\pi}{3}$ の向きと反対の向きは、$\\dfrac{\\pi}{3} + \\pi = \\dfrac{4\\pi}{3}$ の向き。そちらへ $6$ 進むので、同じ点は $\\left(6,\\ \\dfrac{4\\pi}{3}\\right)$。$\\theta = \\dfrac{4\\pi}{3}$。確かめ：$x = -6\\cos\\dfrac{\\pi}{3} = -3$、$y = -6\\sin\\dfrac{\\pi}{3} = -3\\sqrt3$ で、第 $3$ 象限の点。**$\\theta$ を $\\dfrac{\\pi}{3}$ のままにして $\\left(6,\\ \\dfrac{\\pi}{3}\\right)$ とすると、反対側の点になって外れる**。中心の問いへ：**同じ点は、角を $\\pi$ ずらして $r$ の符号を変えても書ける。書き方は $1$ つではない**。",
        },
      ],
      formulaPreview: "π/3 の反対の向き → π/3 + π = 4π/3（π/3 のままではない）",
      figureMarker: "<<M3CV_POLAR_NEG>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "極座標で $\\left(5,\\ \\dfrac{17\\pi}{6}\\right)$ と表される点を、$r > 0$、$0 \\le \\theta < 2\\pi$ の範囲で表し直したときの $\\theta$ を求めましょう。",
      answer: (5 * Math.PI) / 6,
      answerDisplay: "5π/6",
      unit: "",
      unknownLabel: "$\\theta$",
      inputAffordances: ["pi"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。何が同じで、何が違う？" },
        { layer: 2, text: "前題と変わったのは、$r$ は正で、角が $2\\pi$ をこえていること。" },
        {
          layer: 3,
          text: "$2\\pi$ 回ると同じ向きにもどるので、$\\dfrac{17\\pi}{6} - 2\\pi = \\dfrac{5\\pi}{6}$。$\\theta = \\dfrac{5\\pi}{6}$。中心の問いへ：**角は $2\\pi$ ずつ、$r$ の符号は角 $\\pi$ と組で取りかえられる。範囲を決めれば $1$ つに決まる**。",
        },
      ],
      formulaPreview: "17π/6 − 2π = 5π/6",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "極座標で A$\\left(4,\\ \\dfrac{\\pi}{6}\\right)$、B$\\left(6,\\ \\dfrac{\\pi}{2}\\right)$ と表される $2$ 点のあいだの距離 AB を求めましょう。",
      answer: 2 * Math.sqrt(7),
      answerDisplay: "2√7",
      unit: "",
      unknownLabel: "AB",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題までは $1$ 点だった。今度は何が加わった？" },
        { layer: 2, text: "前題と変わったのは、点が $2$ つになり、そのあいだの距離が問われていること。" },
        {
          layer: 3,
          text: "三角形 OAB で、OA $= 4$、OB $= 6$、$\\angle$AOB $= \\dfrac{\\pi}{2} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3}$。[余弦定理] で $\\mathrm{AB}^2 = 16 + 36 - 2 \\cdot 4 \\cdot 6 \\cos\\dfrac{\\pi}{3} = 52 - 24 = 28$、$\\mathrm{AB} = 2\\sqrt7$。（直交座標に直すと A$(2\\sqrt3,\\ 2)$、B$(0,\\ 6)$ で、$\\sqrt{12 + 16} = 2\\sqrt7$ と同じ。）中心の問いへ：**極座標のまま、$2$ つの距離と角の差から、余弦定理で距離が出る**。",
        },
      ],
      formulaPreview: "AB² = 16 + 36 − 48 cos(π/3) = 28 → 2√7",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "極座標で A$\\left(6,\\ \\dfrac{\\pi}{12}\\right)$、B$\\left(10,\\ \\dfrac{3\\pi}{4}\\right)$ と表される点と、極 O でできる三角形 OAB の面積を求めましょう。",
      answer: 15 * Math.sqrt(3),
      answerDisplay: "15√3",
      unit: "",
      unknownLabel: "三角形 OAB の面積",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。前題で使った三角形 OAB は、ここでも使える？" },
        { layer: 2, text: "前題と変わったのは、問われているのが辺の長さでなく、三角形の面積であること。" },
        {
          layer: 3,
          text: "$\\angle$AOB $= \\dfrac{3\\pi}{4} - \\dfrac{\\pi}{12} = \\dfrac{2\\pi}{3}$。三角形の面積 $= \\dfrac12 \\cdot \\mathrm{OA} \\cdot \\mathrm{OB} \\cdot \\sin\\angle\\mathrm{AOB} = \\dfrac12 \\cdot 6 \\cdot 10 \\cdot \\dfrac{\\sqrt3}{2} = 15\\sqrt3$。中心の問いへ：**極から測った距離と角は、極を頂点とする三角形の $2$ 辺とその間の角そのもの**。",
        },
      ],
      formulaPreview: "∠AOB = 2π/3 → (1/2)·6·10·sin(2π/3) = 15√3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "直交座標で $(2\\sqrt3,\\ 2)$ の点を、原点 O のまわりに $\\dfrac{5\\pi}{12}$ だけ（反時計回りに）回した点の $x$ 座標を求めましょう。",
      answer: Math.sqrt(2) - Math.sqrt(6),
      answerDisplay: "√2-√6",
      unit: "",
      unknownLabel: "回した点の $x$ 座標",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "step1 と比べてみよう。step1 の見方は、ここで使える？" },
        { layer: 2, text: "step1 と変わったのは、点の向きが回されて変わること。" },
        {
          layer: 3,
          text: "$(2\\sqrt3,\\ 2)$ は極座標で $\\left(4,\\ \\dfrac{\\pi}{6}\\right)$。回すと $\\theta$ だけが $\\dfrac{5\\pi}{12}$ 増えて $\\left(4,\\ \\dfrac{7\\pi}{12}\\right)$。$x = 4\\cos\\dfrac{7\\pi}{12}$。[加法定理] で $\\cos\\dfrac{7\\pi}{12} = \\cos\\left(\\dfrac{\\pi}{3} + \\dfrac{\\pi}{4}\\right) = \\dfrac12\\cdot\\dfrac{\\sqrt2}{2} - \\dfrac{\\sqrt3}{2}\\cdot\\dfrac{\\sqrt2}{2} = \\dfrac{\\sqrt2 - \\sqrt6}{4}$。$x = \\sqrt2 - \\sqrt6$。（第10章の複素数で $(2\\sqrt3 + 2i)\\left(\\cos\\dfrac{5\\pi}{12} + i\\sin\\dfrac{5\\pi}{12}\\right)$ の実部を出しても同じ。）中心の問いへ：**極座標では、回転は $\\theta$ を足すだけ。$r$ は変わらない**。",
        },
      ],
      formulaPreview: "(4, π/6) → (4, 7π/12) → x = 4 cos(7π/12) = √2 − √6",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "直交座標で A$(3,\\ \\sqrt3)$、B$(-1,\\ \\sqrt3)$ の $2$ 点があります。$\\angle$AOB（O は原点、$0 \\le \\angle\\mathrm{AOB} \\le \\pi$）を求めましょう。",
      answer: Math.PI / 2,
      answerDisplay: "π/2",
      unit: "",
      unknownLabel: "$\\angle$AOB",
      inputAffordances: ["pi"],
      variationFromPrevious: "composite",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "step4 と比べてみよう。step4 で角を読み戻した手つきは、ここで使える？" },
        { layer: 2, text: "step4 と変わったのは、点が $2$ つになり、そのあいだの角が問われていること。" },
        {
          layer: 3,
          text: "A は $r = \\sqrt{9 + 3} = 2\\sqrt3$、$\\cos\\theta = \\dfrac{\\sqrt3}{2}$、$\\sin\\theta = \\dfrac12$ で $\\theta = \\dfrac{\\pi}{6}$。B は $r = 2$、$\\cos\\theta = -\\dfrac12$、$\\sin\\theta = \\dfrac{\\sqrt3}{2}$ で $\\theta = \\dfrac{2\\pi}{3}$。$\\angle$AOB $= \\dfrac{2\\pi}{3} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2}$。（内積 $3 \\cdot (-1) + \\sqrt3 \\cdot \\sqrt3 = 0$ でも直交が分かる。）中心の問いへ：**極座標に直すと、$2$ 点のあいだの角は、角の差として読める**。",
        },
      ],
      formulaPreview: "A の θ = π/6、B の θ = 2π/3 → ∠AOB = π/2",
    },
  ],
  derivation: `**中心の問い** ｜ 点の位置を『どの向きに、どれだけ進むか』で指すと、直交座標と何が変わる？——**同じ点の書き方が $1$ つに決まらないのは、困ることか、使えることか？**

────────

## 向きと距離で点を指す

極 O と始線を決め、点 P を「始線から回った角 $\\theta$」と「O からの距離 $r$」の組 $(r,\\ \\theta)$ で表す。これが [極座標] である。直交座標とは

$$x = r\\cos\\theta,\\qquad y = r\\sin\\theta,\\qquad r = \\sqrt{x^2 + y^2}$$

で行き来できる（step1〜4）。角は、$\\cos\\theta$ と $\\sin\\theta$ の両方を見て（点の象限を見て）決める。

## ここが胚細胞：書き方は $1$ つでない——範囲を決めれば $1$ つ

- 角は $2\\pi$ ずつずらしても同じ向き（step6）
- $r$ が負なら反対の向きへ進む。だから $(r,\\ \\theta)$ と $(-r,\\ \\theta + \\pi)$ は同じ点（step5）
- $r > 0$、$0 \\le \\theta < 2\\pi$ と決めれば、O 以外の点の書き方は $1$ つに決まる（O は $r = 0$ で、$\\theta$ は決まらない）

困ることもある（同じ点かどうかを確かめる手間）が、使えることもある：**極を頂点とする三角形の $2$ 辺と間の角がそのまま見え**（step7・8）、**回転は角を足すだけ**（step9）、**$2$ 点のあいだの角は角の差**（step10）。

## Step の道筋

- **step1・2**：極座標から直交座標へ（第10章の極形式と合流）
- **step3・4**：直交座標から極座標へ。角は象限まで見る
- **step5（質的変化・山場）**：$r$ が負の極座標を書き直す
- **step6**：$2\\pi$ をこえた角を書き直す
- **step7・8**：$2$ 点の距離・三角形の面積（数Ⅰの余弦定理・面積と合流）
- **step9**：回転は角を足すだけ（第10章の回転と合流）
- **step10**：$2$ 点のあいだの角

────────

**もっと深く**

**忘れても導ける。** $x = r\\cos\\theta$、$y = r\\sin\\theta$ は、単位円の上の点 $(\\cos\\theta,\\ \\sin\\theta)$ を $r$ 倍しただけ。三角関数の定義そのものである。

**どちらの座標が便利か。** 円の中心から測る量（回転・角の差・中心からの距離）は極座標が、平行移動や縦横の長さは直交座標が書きやすい。問題によって座標の取り方を選べばよい。

**この先の景色。** 極座標を使うと、$r$ を $\\theta$ の式で表した曲線（極方程式）が描ける。直交座標では書きにくい渦巻きや花びらの形も、極方程式なら $1$ 行で書けることがある。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第8章「極座標」の構成（極と始線・直交座標との変換・極座標の表し方は $1$ つでない・$r < 0$ の約束）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

向きと距離で点を指すと、角は $2\\pi$ ずつ、$r$ の符号は角 $\\pi$ と組で取りかえられ、同じ点の書き方は $1$ つに決まらない。範囲（$r > 0$、$0 \\le \\theta < 2\\pi$）を決めれば $1$ つになる。

その代わり、極から見た距離と角がそのまま見えるので、距離・面積・回転・角の差を、極を中心にした量として直接扱える。`,
};

export const MATH3_CURVES_SERIES_LIST: LearnerSeries[] = [
  M3CV_ELLIPSE_SERIES,
  M3CV_STRETCH_SERIES,
  M3CV_HYPERBOLA_SERIES,
  M3CV_PARABOLA_SERIES,
  M3CV_TANGENT_SERIES,
  M3CV_TANGENT_FROM_SERIES,
  M3CV_CONIC_SERIES,
  M3CV_POLAR_SERIES,
];
