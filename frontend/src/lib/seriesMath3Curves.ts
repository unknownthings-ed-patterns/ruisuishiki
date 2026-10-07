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

export const MATH3_CURVES_SERIES_LIST: LearnerSeries[] = [
  M3CV_ELLIPSE_SERIES,
  M3CV_STRETCH_SERIES,
  M3CV_HYPERBOLA_SERIES,
  M3CV_PARABOLA_SERIES,
];
