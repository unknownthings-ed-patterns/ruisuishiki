/**
 * 「いろいろな関数の微分」ユニットの系列（数Ⅲ・C 第4章）。
 *
 * 背骨設計は docs/math3c_various_diff_design.md
 * （メイン Opus 5.5・2026-09-30・裁定 Q1〜Q4 推奨どおり → Round 1 背骨監査〔Codex〕全件反映 → 凍結）。
 * 系列はメインがひとりで実装する（並列委譲なし）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第4章 いろいろな関数の微分（旺文社・2024）の
 * 章構成を借り、問題の値・場面はすべてオリジナルに変更（copyright-credit-vs-copy）。
 *
 * ハブ胚細胞（背骨 D1）：
 *   出発点での傾きが 1 になるように、ものさし（角の単位・対数の底）を選ぶ。
 *   その 1 点の事実を、関数ごとの法則（加法定理・対数法則・指数法則）が全点へ運ぶ。
 *   原典 p.146「極限 3 兄弟」：sin t / t・(e^t − 1)/t・log(1+t)/t はどれも「点 A での接線の傾きが 1」。
 *
 * 入力の折り方（背骨 D2・入力系の拡張は不要＝実運用 11 例目）：
 * - 入力系は数値・分数・π・√ だけ。e と log は無い → 肩の値・底の比・y'/y・導関数が 0 の点の log x に折る
 * - 三角の特殊値は答えの空間が狭い（13 通り）→ 係数で散らし、同じ特殊値は単元で 2 回まで
 * - 提出値が「教える結論だけから言えてしまう」step を作らない（C1 追補10）
 * - 入口（基）の提出値を 0・1 にしない
 * - 「これでしか解けない」とは書かない（C1 追補18・18-b・18-c）
 */

import type { LearnerSeries } from "./types";

/** M3VD1: 三角関数の極限——約分できない 0/0。★三段★
 *  段1＝step1〜3（弦・弧・接線の長さの比を特殊角で正確に計算し、1 に寄っていくのを見る）
 *  段2＝step4〜5（面積の入れ子から壁を作る／はさみうちで極限を決める。原典本文に無く、
 *        教科書の標準の証明を問題の列に割った＝裁定 Q1。Round 1 F4 で「壁の式を与えない」
 *        「そろう先が 1 でない」形に作り直した）
 *  段3＝step6〜10（形をそろえる・共役・図形の極限）。
 *  山場 step10 は曲線と円の半径の極限（構成は原典の応用問題を借り、曲線の係数を替えた）。 */
export const M3VD_TRIG_LIM_SERIES: LearnerSeries = {
  id: "math3_vd_trig_lim_01",
  title: "三角関数の極限——約分できない 0/0",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — $\\dfrac{\\sin t}{t}$ は $\\dfrac00$ の形なのに、約分も有理化も効かない。式で消せないなら、図形で両側からはさむ。$10$ 問で、弦と弧の近さを確かめる。",
  patternId: "M3VD1",
  unit: "math_3",
  revelationLabel:
    "**$\\dfrac{\\sin t}{t}$ を 2 枚の壁ではさむと、壁は 2 枚とも同じ高さへ向かう**。そろう先が決まれば、間にはさまれたものの行き先も決まる——約分できない $\\dfrac00$ の行き先を、面積の大小が決めた",
  drivingQuestion:
    "$\\dfrac{\\sin t}{t}$ は $t \\to 0$ で $\\dfrac00$ の形なのに、**約分も有理化も効かない**。では、$t$ が $0$ に近づくとき、**弦と弧はどれだけ近づく**？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "半径 $1$ の円（[単位円]）の上に、点 $A(1,0)$ と点 $P$ をとり、$\\angle AOP = t$ とします。$P$ から $x$ 軸におろした垂線の足を $H$ とします。[弧度法] では、角 $t$ は**弧 $AP$ の長さ**そのものでした。いっぽう、**高さ $PH$** は $\\sin t$ です。\n\n$t = \\dfrac{\\pi}{3}$ のとき、比\n\n$$\\frac{PH}{\\text{弧}AP} = \\frac{\\sin t}{t}$$\n\nの値を求めましょう。$\\pi$ や $\\sqrt{\\ }$ を使ったまま答えてかまいません。",
      answer: (3 * Math.sqrt(3)) / (2 * Math.PI),
      answerDisplay: "3√3/(2π)",
      unit: "",
      unknownLabel: "$t = \\dfrac{\\pi}{3}$ のときの $\\dfrac{\\sin t}{t}$",
      variationFromPrevious: null,
      compareWithStepId: null,
      inputAffordances: ["pi", "sqrt"],
      hints: [
        {
          layer: 1,
          text: "[弧度法] では、角を**弧の長さ**で測ったのだった。同じ角 $t$ について、**高さ $PH$** と**弧 $AP$** は、どちらが長そうだろう？ 比にすると、$1$ より大きい？ 小さい？",
        },
        {
          layer: 2,
          text: "分子の $\\sin t$ は [単位円] の上の点 $P$ の $y$ 座標、分母の $t$ は角の大きさそのもの。$t = \\dfrac{\\pi}{3}$ のとき、それぞれいくつになる？",
        },
        {
          layer: 3,
          text: "$\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt3}{2}$、弧 $AP$ の長さは $\\dfrac{\\pi}{3}$ なので、$\\dfrac{\\sin t}{t} = \\dfrac{\\sqrt3}{2} \\div \\dfrac{\\pi}{3} = \\dfrac{\\sqrt3}{2} \\times \\dfrac{3}{\\pi} = \\dfrac{3\\sqrt3}{2\\pi}$（およそ $0.83$）。**高さは弧より短い**——$P$ から $x$ 軸へまっすぐ下りる道は、円に沿って $A$ へ回る道より近いからです。中心の問いへの最初の部分回答：**弦（高さ）と弧は、この角ではまだ $2$ 割ほど違う**。",
        },
      ],
      formulaPreview: "sin(π/3) ÷ (π/3) = (√3/2)×(3/π) = 3√3/(2π)（およそ 0.83）",
      figureMarker: "<<M3VD_CHORD_ARC>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題と同じ図で、角を小さくします。$t = \\dfrac{\\pi}{6}$ のとき、比 $\\dfrac{\\sin t}{t}$ の値を求めましょう。",
      answer: 3 / Math.PI,
      answerDisplay: "3/π",
      unit: "",
      unknownLabel: "$t = \\dfrac{\\pi}{6}$ のときの $\\dfrac{\\sin t}{t}$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      inputAffordances: ["pi"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 角を小さくすると、高さと弧の差は広がるだろうか、縮むだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**角 $t$ が半分になった**こと $1$ つだけ。前題で出した比と、今度の比は、どちらが $1$ に近いだろう？",
        },
        {
          layer: 3,
          text: "前題と同じ手順です。$\\sin\\dfrac{\\pi}{6} = \\dfrac12$、弧の長さは $\\dfrac{\\pi}{6}$ なので $\\dfrac{\\sin t}{t} = \\dfrac12 \\div \\dfrac{\\pi}{6} = \\dfrac{3}{\\pi}$（およそ $0.95$）。前題の $\\dfrac{3\\sqrt3}{2\\pi}$（およそ $0.83$）より $1$ に近づきました。中心の問いへ：**角を小さくすると、高さと弧の差は縮む**。点 $P$ が $A$ に近いところでは、円の縁がほとんど垂直に立っているからです。",
        },
      ],
      formulaPreview: "sin(π/6) ÷ (π/6) = (1/2)×(6/π) = 3/π（およそ 0.95）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "前題と同じ $t = \\dfrac{\\pi}{6}$ で、こんどは $A$ で円に接する直線（$x = 1$）と、直線 $OP$ の交点を $T$ とします。**線分 $AT$ の長さ**は $\\tan t$ です。\n\n比\n\n$$\\frac{AT}{\\text{弧}AP} = \\frac{\\tan t}{t}$$\n\nの値を求めましょう。",
      answer: (2 * Math.sqrt(3)) / Math.PI,
      answerDisplay: "2√3/π",
      unit: "",
      unknownLabel: "$t = \\dfrac{\\pi}{6}$ のときの $\\dfrac{\\tan t}{t}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      inputAffordances: ["pi", "sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。角は同じ。比べる相手の長さが替わった。こんどの比は $1$ より大きい？ 小さい？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**弧と比べる長さが、円の内側の高さから、円の外側の接線の長さになった**こと $1$ つ。接線の長さ $AT$ は、弧より長いだろうか。",
        },
        {
          layer: 3,
          text: "前題では高さ $PH = \\sin t$ と弧を比べました。今度は接線の長さ $AT = \\tan t$ と弧を比べます。$\\tan\\dfrac{\\pi}{6} = \\dfrac{1}{\\sqrt3}$ なので、$\\dfrac{\\tan t}{t} = \\dfrac{1}{\\sqrt3} \\div \\dfrac{\\pi}{6} = \\dfrac{6}{\\sqrt3\\,\\pi} = \\dfrac{2\\sqrt3}{\\pi}$（およそ $1.10$）。**こちらは $1$ より大きい**。中心の問いへ：**弧は、内側の高さと外側の接線の長さにはさまれている**——下からも上からも、$1$ に寄ってきそうに見えます。",
        },
      ],
      formulaPreview: "tan(π/6) ÷ (π/6) = (1/√3)×(6/π) = 2√3/π（およそ 1.10）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "step1 の図で、$0 < t < \\dfrac{\\pi}{2}$ とします。次の $3$ つの図形の面積は、この順に大きくなります。\n\n- 三角形 $OAP$\n- 扇形 $OAP$（中心角 $t$）\n- 三角形 $OAT$（$T$ は step3 の点）\n\n$3$ つの面積をそれぞれ $t$ の式で書き、大小の順に不等号でつないでから、全体を三角形 $OAP$ の面積で割ると、$\\dfrac{t}{\\sin t}$ が $2$ つの式ではさまれます。**そのうち大きいほうの式**の、$t = \\dfrac{\\pi}{4}$ での値を求めましょう。",
      answer: Math.SQRT2,
      answerDisplay: "√2",
      unit: "",
      unknownLabel: "大きいほうの式の $t = \\dfrac{\\pi}{4}$ での値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $3$ つの**長さ**（高さ・弧・接線）の話だった。今度は $3$ つの**面積**。長さの大小と面積の大小は、同じ順に並ぶだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**比べるものが長さから面積になった**こと $1$ つ。$3$ つの図形は、どれも底辺 $OA = 1$ を共有している。それぞれの面積に、前題までの $3$ つの長さはどう入ってくる？",
        },
        {
          layer: 3,
          text: "底辺 $OA = 1$ で、三角形 $OAP$ の高さは $PH = \\sin t$、三角形 $OAT$ の高さは $AT = \\tan t$。扇形は半径 $1$・中心角 $t$ なので面積は $\\dfrac{t}{2}$。よって $$\\frac{\\sin t}{2} < \\frac{t}{2} < \\frac{\\tan t}{2}$$ 全体を $\\dfrac{\\sin t}{2}$（正の数）で割ると $$1 < \\frac{t}{\\sin t} < \\frac{1}{\\cos t}$$ 大きいほうの式は $\\dfrac{1}{\\cos t}$ で、$t = \\dfrac{\\pi}{4}$ では $\\dfrac{1}{\\ \\dfrac{1}{\\sqrt2}\\ } = \\sqrt2$。中心の問いへ：**弦と弧の近さを、面積の大小が $2$ 枚の壁に変えた**。",
        },
      ],
      formulaPreview: "sin t/2 < t/2 < tan t/2 を sin t/2 で割って 1 < t/sin t < 1/cos t。t=π/4 で 1/cos(π/4) = √2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "前題の不等式は、$0 < t < \\dfrac{\\pi}{2}$ ならどんな角でも成り立ちました。その $t$ を $4t$ に置きかえると（$4t$ もその範囲に入るくらい $t$ が小さいとき）、逆数をとって\n\n$$\\cos 4t < \\frac{\\sin 4t}{4t} < 1$$\n\nが言えます。この両側を $4$ 倍した $2$ 枚の壁で $\\dfrac{\\sin 4t}{t}$ をはさみ、[はさみうちの原理] を使って\n\n$$\\lim_{t \\to 0} \\frac{\\sin 4t}{t}$$\n\nを求めましょう（$t$ が負の側から近づくときも、$\\dfrac{\\sin 4t}{t}$ は $t$ の符号を変えても同じ値なので、行き先は同じです）。",
      answer: 4,
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{t \\to 0} \\frac{\\sin 4t}{t}$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は、ある $1$ つの角での壁の**値**を出した。今度は $t$ を $0$ に近づける。$2$ 枚の壁は、それぞれどこへ向かうだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**角を止めずに $0$ へ動かす**こと $1$ つ。第2章の [はさみうちの原理] では、$2$ 枚の壁が**同じところ**へ向かえば、間にはさまれたものも同じところへ向かった。今度の $2$ 枚の壁は、同じところへ向かっている？",
        },
        {
          layer: 3,
          text: "壁を $4$ 倍すると $$4\\cos 4t < \\frac{\\sin 4t}{t} < 4$$ $t \\to 0$ のとき、下の壁 $4\\cos 4t$ は $\\cos$ が [関数の連続] な関数なので $4\\cos 0 = 4$ へ、上の壁は $4$ のまま。**$2$ 枚とも $4$ へそろう**ので、[はさみうちの原理] により $\\displaystyle\\lim_{t \\to 0}\\frac{\\sin 4t}{t} = 4$。$1$ ではありません——$\\dfrac{\\sin(\\ )}{(\\ )}$ の形でも、分母が $t$、角が $4t$ と**そろっていない**からです。中心の問いへの答えの芯がここ：**約分できない $\\dfrac00$ の行き先を、面積から作った壁が決めた**。",
        },
      ],
      formulaPreview: "4cos4t < sin4t/t < 4。t→0 で壁は両方 4 へ → はさみうちで 4",
      figureMarker: "<<M3VD_SQUEEZE_WALLS>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "前題で、$\\dfrac{\\sin 4t}{4t}$ のように**角と分母がそろった形**は $1$ に向かうことが分かりました（[三角関数の極限]）。この形を使って、\n\n$$\\lim_{x \\to 0} \\frac{\\sin 7x}{\\sin 2x}$$\n\nを求めましょう。答えは既約分数で答えましょう。",
      answer: 3.5,
      answerDisplay: "7/2",
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{x \\to 0} \\frac{\\sin 7x}{\\sin 2x}$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は分母が $t$ だけだった。今度は分母にも $\\sin$ がいる。前題で「そろっていない」と気づいた見方は、今度はどこに向ければいい？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分母も $\\sin$ になった**こと $1$ つ。前題で行き先の $4$ を決めていたのは、式の中のどの数だった？",
        },
        {
          layer: 3,
          text: "前題では $\\dfrac{\\sin 4t}{t} = 4 \\cdot \\dfrac{\\sin 4t}{4t} \\to 4$ と読めました。今度は分子・分母をそれぞれそろえます。$$\\frac{\\sin 7x}{\\sin 2x} = \\frac{\\ \\dfrac{\\sin 7x}{7x} \\times 7x\\ }{\\ \\dfrac{\\sin 2x}{2x} \\times 2x\\ } = \\frac{\\sin 7x}{7x} \\cdot \\frac{2x}{\\sin 2x} \\cdot \\frac{7}{2} \\to 1 \\cdot 1 \\cdot \\frac72 = \\frac72$$ 中心の問いへ：**壁を毎回作らなくても、角と分母をそろえれば、はさみうちが一度やってくれた仕事を借りられる**。",
        },
      ],
      formulaPreview: "sin7x/sin2x = (sin7x/7x)·(2x/sin2x)·(7/2) → 7/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "こんどは向きが逆です。$a$ を正の定数とします。\n\n$$\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin 6x} = \\frac{5}{3}$$\n\nが成り立つとき、$a$ の値を求めましょう。",
      answer: 10,
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は式を見て行き先を出した。今度は**行き先のほうが先に分かっている**。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**問われているものが、行き先から式の中の数に入れ替わった**こと $1$ つ。前題で最後に残った分数は、式のどこから来ていた？",
        },
        {
          layer: 3,
          text: "前題では $\\dfrac{\\sin 7x}{\\sin 2x} \\to \\dfrac72$ と、**角の係数どうしの比**が行き先になりました。今度も同じにそろえると $\\dfrac{\\sin ax}{\\sin 6x} \\to \\dfrac{a}{6}$。これが $\\dfrac53$ に等しいので $a = 6 \\times \\dfrac53 = 10$。中心の問いへ：**行き先を決めているのが角の係数だと分かっていれば、行き先から式へ逆にたどれる**。",
        },
      ],
      formulaPreview: "a/6 = 5/3 より a = 10",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "次の極限を求めましょう。\n\n$$\\lim_{x \\to \\infty} 3x \\sin \\frac{2}{x}$$",
      answer: 6,
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{x \\to \\infty} 3x\\sin\\frac{2}{x}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。step6 では $x$ を $0$ に近づけた。今度は $x$ を限りなく大きくする。それでも $\\sin$ の中身は、どこかへ近づいているだろうか？",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**$x \\to \\infty$ になった**こと $1$ つ。そのとき $\\sin$ の中身は、どこへ向かっている？",
        },
        {
          layer: 3,
          text: "step6 では角と分母をそろえて $1$ に向かう形を作りました。今度は $\\sin$ の中身 $\\dfrac2x$ が、$x \\to \\infty$ のとき $0$ へ向かいます。そこで $3x = \\dfrac{3 \\cdot 2}{\\ \\dfrac{2}{x}\\ } = \\dfrac{6}{\\ \\dfrac{2}{x}\\ }$ と書きなおすと $$3x\\sin\\frac2x = 6 \\cdot \\frac{\\sin \\dfrac{2}{x}}{\\ \\dfrac{2}{x}\\ } \\to 6 \\cdot 1 = 6$$ 中心の問いへ：**$x$ がどこへ向かっても、$\\sin$ の中身が $0$ へ向かうなら、弦と弧の近さが使える**。",
        },
      ],
      formulaPreview: "3x sin(2/x) = 6·{sin(2/x)/(2/x)} → 6",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "次の極限を求めましょう。\n\n$$\\lim_{x \\to 0} \\frac{1 - \\cos 4x}{x^2}$$",
      answer: 8,
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{x \\to 0} \\frac{1-\\cos 4x}{x^2}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 今度は分子に $\\sin$ の姿が無い。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分子が $\\sin$ ではなく $1-\\cos$ になった**こと $1$ つ。第2章で、根号の差の $\\dfrac00$ に出会ったとき、どう扱ったか思い出してみよう。",
        },
        {
          layer: 3,
          text: "第2・3章で根号の差に**共役をかけた**のと同じ手つきで、分母・分子に $1+\\cos 4x$ をかけます。$$\\frac{1-\\cos 4x}{x^2} \\cdot \\frac{1+\\cos 4x}{1+\\cos 4x} = \\frac{1-\\cos^2 4x}{x^2(1+\\cos 4x)} = \\frac{\\sin^2 4x}{x^2(1+\\cos 4x)} = 16\\left(\\frac{\\sin 4x}{4x}\\right)^2 \\cdot \\frac{1}{1+\\cos 4x} \\to 16 \\cdot 1 \\cdot \\frac12 = 8$$ **2 本目の道**：半角の式 $1-\\cos 4x = 2\\sin^2 2x$ を使うと $\\dfrac{2\\sin^2 2x}{x^2} = 8\\left(\\dfrac{\\sin 2x}{2x}\\right)^2 \\to 8$。同じ $8$ に着くことが互いの検算になります。中心の問いへ：**$\\sin$ の姿が見えない $\\dfrac00$ も、$\\sin$ の形を作り出せば弦と弧の近さが使える**。",
        },
      ],
      formulaPreview: "(1−cos4x)/x² = sin²4x/{x²(1+cos4x)} = 16(sin4x/4x)²·1/(1+cos4x) → 8",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "曲線 $y = 1 - \\cos 3x$ の上に、原点 $O$ とは異なる点 $P(x,\\ 1-\\cos 3x)$ をとります（$x$ は $0$ に近い $0$ でない数）。$O$ と $P$ を通り、中心が $y$ 軸の正の部分にある円の半径を $R$ とします。\n\n$x \\to 0$ のときの $R$ の極限を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 9,
      answerDisplay: "1/9",
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{x \\to 0} R$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "ここまでの $9$ 問は、どれも式の極限だった。今度は**図形の量**（円の半径）の極限。前題までに手に入れた道具のうち、どれとどれが要りそうだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**極限をとる前に、半径 $R$ を $x$ の式で表す仕事が加わった**こと $1$ つ。表したあとの式の中に、前題と同じ形は現れないだろうか。",
        },
        {
          layer: 3,
          text: "中心 $(0,\\ R)$ で原点を通る円は $x^2 + (y-R)^2 = R^2$、つまり $x^2 + y^2 = 2Ry$。$P$ を通るので $y = 1-\\cos 3x$ として $$R = \\frac{x^2 + (1-\\cos 3x)^2}{2(1-\\cos 3x)} = \\frac{x^2}{2(1-\\cos 3x)} + \\frac{1-\\cos 3x}{2}$$ 後ろの項は $\\dfrac{1-1}{2} = 0$ へ（これは $\\dfrac00$ ではありません）。前の項は前題と同じく共役をかけて $$\\frac{x^2}{2(1-\\cos 3x)} = \\frac{x^2(1+\\cos 3x)}{2\\sin^2 3x} = \\frac{1+\\cos 3x}{18}\\left(\\frac{3x}{\\sin 3x}\\right)^2 \\to \\frac{2}{18} = \\frac19$$ よって $R \\to \\dfrac19$。曲線の原点での「曲がり具合」が、半径 $\\dfrac19$ の円と同じだということです。中心の問いに戻ると：**弦と弧がどれだけ近いかという 1 つの事実が、図形の曲がり具合まで決めてしまう**。",
        },
      ],
      formulaPreview: "R = x²/{2(1−cos3x)} + (1−cos3x)/2 → (1+1)/18 + 0 = 1/9",
    },
  ],
  derivation: `**中心の問い** ｜ $\\dfrac{\\sin t}{t}$ は $t \\to 0$ で $\\dfrac00$ の形なのに、**約分も有理化も効かない**。では、$t$ が $0$ に近づくとき、**弦と弧はどれだけ近づく**？

────────

## 約分できない $\\dfrac00$ がある

第2章・第3章で出会った $\\dfrac00$ は、どれも**式を書きかえれば消せた**。分母と分子に共通の因数があれば約分し、根号があれば有理化した。どちらも「同じ量を $2$ 通りに書く」操作である。

$\\dfrac{\\sin t}{t}$ には、その道が無い。$\\sin t$ は多項式でも根号の式でもないので、多項式のときのように分子から $t$ の因数をくくり出すことは、高校で使う式の書きかえではできない。**この極限値が $1$ になる理由は、式だけを見ていても分からない**（[三角関数の極限]）。だから、式の外——図形——に理由を探す。

## 角を弧の長さで測ったから、弦と弧を比べられる

[弧度法] では、角 $t$ を**半径 $1$ の円の弧の長さ**で測った。だから $t$ は「長さ」であり、同じ図の中の**高さ $PH = \\sin t$** や**接線の長さ $AT = \\tan t$** と、そのまま比べられる。

角を度で測っていたら、$60°$ と長さ $\\dfrac{\\sqrt3}{2}$ を比べることには意味がない。**弧度法は、角を長さの仲間に入れる約束だった**——この章で、その約束が効きはじめる。

## ここが胚細胞：式で消せない $\\dfrac00$ は、図形で両側からはさむ

step1〜3 で、特殊角の比を正確に計算した。$\\dfrac{\\sin t}{t}$ は $1$ より小さく、$\\dfrac{\\tan t}{t}$ は $1$ より大きく、角を小さくするとどちらも $1$ に寄っていった。**弧は、内側の高さと外側の接線の長さにはさまれている。**

step4 で、それを面積で確かめた。底辺 $OA = 1$ を共有する $3$ つの図形は

$$\\frac{\\sin t}{2} < \\frac{t}{2} < \\frac{\\tan t}{2} \\qquad \\left(0 < t < \\frac{\\pi}{2}\\right)$$

と並ぶ。$\\dfrac{\\sin t}{2}$ で割って逆数をとると

$$\\cos t < \\frac{\\sin t}{t} < 1$$

$t \\to +0$ のとき、下の壁 $\\cos t$ は $\\cos 0 = 1$ へ向かう——**$\\cos$ が [関数の連続] な関数だから**で、ここに三角関数の微分の公式は使っていない（使うと、これから作る公式でこれを示すことになり、ぐるぐる回ってしまう）。上の壁は $1$ のまま。**$2$ 枚の壁が同じ $1$ へそろう**ので、[はさみうちの原理] により $\\dfrac{\\sin t}{t} \\to 1$。

$t$ が負の側から近づくときは、$\\dfrac{\\sin(-t)}{-t} = \\dfrac{-\\sin t}{-t} = \\dfrac{\\sin t}{t}$ なので、正の側と同じ値をとり、行き先も同じ $1$ になる。右からも左からも $1$——だから

$$\\lim_{t \\to 0} \\frac{\\sin t}{t} = 1$$

## そろっていないと、1 にはならない

$\\dfrac{\\sin 4t}{t}$ の行き先は $1$ ではなく $4$ だった（step5）。角が $4t$ なのに分母が $t$ で、**角と分母がそろっていない**。そろえるには $\\dfrac{\\sin 4t}{t} = 4 \\cdot \\dfrac{\\sin 4t}{4t}$ と書けばよい。step6〜9 は、すべてこの「そろえる」の練習である。$\\sin$ の中身が $0$ へ向かいさえすれば、$x \\to \\infty$ でも使える（step8）。$\\sin$ が見えなくても、共役をかけて $\\sin$ を作り出せば使える（step9）。

## Step の道筋

- **step1〜3（段1）**：弦・弧・接線の長さの比を特殊角で計算し、$1$ に寄っていくのを見る
- **step4〜5（段2）**：面積から $2$ 枚の壁を作り、はさみうちで行き先を決める
- **step6〜9（段3）**：角と分母をそろえる（逆向き・$x \\to \\infty$・共役）
- **step10（山場）**：曲線と円の半径の極限。式の極限が、図形の曲がり具合を決める

────────

**もっと深く**

**忘れても導ける。** $\\displaystyle\\lim_{t \\to 0}\\frac{\\sin t}{t} = 1$ を忘れたら、[単位円] に $3$ つの図形（三角形・扇形・三角形）を描けばよい。底辺が共通なので面積は高さの比べっこになり、$\\sin t < t < \\tan t$ が出る。そこから $\\sin t$ で割るだけで壁ができる。**覚えておくのは式ではなく、$3$ つの図形の絵のほうである。**

**「$\\dfrac{\\sin(\\ )}{(\\ )}$ なら何でも $1$」ではない。** $\\dfrac{\\sin 4t}{t}$ は $4$ に、$\\dfrac{\\sin 7x}{\\sin 2x}$ は $\\dfrac72$ に向かった。$1$ と書いてよいのは、$\\sin$ の中身と分母が**同じ式で、しかも $0$ へ向かう**と確かめたときである。たとえば $\\dfrac{\\sin t}{t}$ でも、$t \\to \\pi$ なら分子は $0$、分母は $\\pi$ で、行き先は $0$ になる。**そろっているかを確かめてから $1$ と書く**——この系列の問題では、そろえ忘れると $1$ という別の値が出るので、数で確かめれば間違いに気づける。

**「近い」は「等しい」ではない。** $t$ が $0$ に近いとき $\\sin t \\approx t$ と書きたくなる。$y = \\sin x$ と $y = x$ のグラフは、原点の近くでほとんど見分けがつかない。これは $\\dfrac{\\sin t}{t} = 1$ が「$y = \\sin x$ の原点での接線の傾きは $1$」という意味をもつことの言いかえで、答えの見当をつけるのには役に立つ。けれども $\\approx$ は計算の途中の記号としては使えない。行き先を決めるのは、あくまで壁である。

**この先の景色。** $\\dfrac{\\sin t}{t} \\to 1$ は、「$y = \\sin x$ の**原点での傾き**が $1$」ということだった。次の系列（和積の公式）と、その次の系列（三角関数の微分）で、この原点での $1$ が、**どの点の傾きにも運ばれていく**。そして $\\sin$ だけでなく、$e^x$ と $\\log x$ にも、そっくり同じ形の極限が待っている（「極限 $3$ 兄弟」）。大学では、$\\sin x = x - \\dfrac{x^3}{6} + \\cdots$ という展開の、いちばん最初の項がこの $x$ である。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章の章構成（三角関数の微分に入る前に $\\lim\\frac{\\sin t}{t} = 1$ を図形で説明し、形をそろえる練習と図形の極限へ進む順序）を参考。面積のはさみうちによる証明は教科書の標準の形を問題の列に割ったもの。問題の値はすべてオリジナル。

────────

**問いに戻ると**

$\\dfrac{\\sin t}{t}$ の $\\dfrac00$ は、約分や有理化のような式の書きかえでは消えない。消えないものは、**両側からはさんで行き先を決める**。高さ・弧・接線の長さが作る $3$ つの面積が、$\\cos t$ と $1$ という $2$ 枚の壁になり、その $2$ 枚が同じ $1$ へそろった。

弦と弧は、$t$ が $0$ に近づくとき、**比が $1$ に向かうほど近づく**。その近さは、角を弧の長さで測ったからこそ言える。そして、その $1$ つの事実が、形をそろえるだけで多くの極限を決め、曲線の曲がり具合まで決めてしまった。`,
};

/** M3VD2: 和積の公式——差を積に。
 *  加法定理 2 本を足し引きするだけで、和と積が行き来する（原典 p.118〜120・「忘れても導ける」）。
 *  step1→4 は「和 → 差 → 角 A,B で差 → cos の差」と、差異を 1 つずつ動かす。
 *  質的変化 step6 は「数から文字へ」＝ sin(x+h) − sin x を積に直す（次の系列 (sin x)' の分子そのもの）。
 *  山場 step10 は sin(x+c) − sin x の最大値。素朴な読み「1 − (−1) = 2」が外れる（Q1 の②）。
 *  Round 1 F2：初稿の山場「積に直すと特殊角になる組」は手間の差が無かった（A=U+V・B=U−V で加法定理 1 回）ので型を替えた。
 *  実装時の変更：背骨の山場「sin x + sin(x+c)」を「sin(x+c) − sin x」にした（step6 からの差異を 1 つに保つため・背骨 §9 に記録）。 */
export const M3VD_SUM_PROD_SERIES: LearnerSeries = {
  id: "math3_vd_sumprod_01",
  title: "和積の公式——差を積に",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — 加法定理を 2 本並べて足し引きするだけで、$\\sin$ の和や差が積に、積が和に変わる。$10$ 問で、その行き来と、差を積にすると何が取り出せるかを見る。",
  patternId: "M3VD2",
  unit: "math_3",
  revelationLabel:
    "**差を積に書きかえると、$\\sin(x+h)-\\sin x$ の中から $\\sin\\dfrac h2$ という小さいかたまりが取り出せる**。$h$ が $0$ に近づくとき、そのかたまりが主役になる——次の系列で微分の定義の分子になる形",
  drivingQuestion:
    "$\\sin$ の**差**を**積**に書きかえると、何がうれしい？——微分の定義の分子が、ちょうど「差」の形をしているとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "数Ⅱ・B の [加法定理] を $2$ 本並べます。\n\n$$\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$$\n$$\\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta$$\n\n$\\alpha = \\dfrac{\\pi}{3}$、$\\beta = \\dfrac{\\pi}{4}$ のとき、$2$ 本を**展開したまま足して**、\n\n$$\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)$$\n\nの値を求めましょう。",
      answer: Math.sqrt(6) / 2,
      answerDisplay: "√6/2",
      unit: "",
      unknownLabel: "$\\sin\\dfrac{7\\pi}{12} + \\sin\\dfrac{\\pi}{12}$",
      variationFromPrevious: null,
      compareWithStepId: null,
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "[加法定理] の $2$ 本を見比べてみよう。右辺はどちらも $2$ つの項でできている。**足したとき**、どの項が生き残りそうだろう？",
        },
        {
          layer: 2,
          text: "$2$ 本の右辺で、**同じ形の項**と、**符号だけが逆の項**があるはず。足したあとに残るのはどちらの形？",
        },
        {
          layer: 3,
          text: "$2$ 本を足すと $\\cos\\alpha\\sin\\beta$ の項が打ち消し合い、$$\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta) = 2\\sin\\alpha\\cos\\beta$$ が残ります。$\\alpha=\\dfrac\\pi3$、$\\beta=\\dfrac\\pi4$ なら $2 \\cdot \\dfrac{\\sqrt3}{2} \\cdot \\dfrac{\\sqrt2}{2} = \\dfrac{\\sqrt6}{2}$。左辺は $\\sin\\dfrac{7\\pi}{12}+\\sin\\dfrac{\\pi}{12}$ で、どちらも表に無い角なのに、**足した結果は表にある角だけで書けた**。中心の問いへの最初の部分回答：**$2$ つの $\\sin$ の和が、$1$ つの積に化けた**。",
        },
      ],
      formulaPreview: "sin(α+β)+sin(α−β) = 2 sinα cosβ = 2·(√3/2)·(√2/2) = √6/2",
      figureMarker: "<<M3VD_ADD_TWO>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題と同じ $2$ 本を、こんどは**引きます**。$\\alpha = \\dfrac{2\\pi}{3}$、$\\beta = \\dfrac{\\pi}{4}$ のとき、\n\n$$\\sin(\\alpha+\\beta) - \\sin(\\alpha-\\beta)$$\n\nの値を求めましょう。",
      answer: -Math.SQRT2 / 2,
      answerDisplay: "−√2/2",
      unit: "",
      unknownLabel: "$\\sin\\dfrac{11\\pi}{12} - \\sin\\dfrac{5\\pi}{12}$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で「足すと消えた」項は、引いたときも消えるだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**足すが引くになった**こと $1$ つ。引いたとき、$2$ 本の右辺のどちらの形の項が残る？",
        },
        {
          layer: 3,
          text: "前題では $\\cos\\alpha\\sin\\beta$ の項が消えました。引くと今度は $\\sin\\alpha\\cos\\beta$ の項が消えて $$\\sin(\\alpha+\\beta)-\\sin(\\alpha-\\beta) = 2\\cos\\alpha\\sin\\beta$$ $\\alpha=\\dfrac{2\\pi}3$、$\\beta=\\dfrac\\pi4$ なら $2 \\cdot \\left(-\\dfrac12\\right) \\cdot \\dfrac{\\sqrt2}{2} = -\\dfrac{\\sqrt2}{2}$。中心の問いへ：**差も積に化ける**。化けるのは、加法定理の $2$ 本が「同じ項」と「符号だけ逆の項」でできているからでした。",
        },
      ],
      formulaPreview: "sin(α+β)−sin(α−β) = 2 cosα sinβ = 2·(−1/2)·(√2/2) = −√2/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "前題までは $\\alpha$ と $\\beta$ が先に与えられていました。こんどは、**引き算する $2$ つの角 $A$、$B$ のほう**が与えられます。$\\alpha+\\beta = A$、$\\alpha-\\beta = B$ となる $\\alpha$、$\\beta$ を考えて、\n\n$$\\sin\\frac{13\\pi}{12} - \\sin\\frac{7\\pi}{12}$$\n\nの値を求めましょう。",
      answer: -Math.sqrt(6) / 2,
      answerDisplay: "−√6/2",
      unit: "",
      unknownLabel: "$\\sin\\dfrac{13\\pi}{12} - \\sin\\dfrac{7\\pi}{12}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。求めるものの形は同じ「$\\sin$ − $\\sin$」。違うのは、何が先に与えられているか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**与えられたのが $\\alpha,\\beta$ ではなく、引き算する $2$ つの角そのもの**になったこと $1$ つ。前題の式に出てきた $\\alpha$ と $\\beta$ は、今度の問題では何にあたるだろう？",
        },
        {
          layer: 3,
          text: "前題では $\\sin(\\alpha+\\beta)-\\sin(\\alpha-\\beta) = 2\\cos\\alpha\\sin\\beta$ でした。今度は $A=\\alpha+\\beta$、$B=\\alpha-\\beta$ から $\\alpha = \\dfrac{A+B}{2}$、$\\beta = \\dfrac{A-B}{2}$。つまり $$\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$$ ここでは $\\dfrac{A+B}{2} = \\dfrac{5\\pi}{6}$、$\\dfrac{A-B}{2} = \\dfrac{\\pi}{4}$ なので $2 \\cdot \\left(-\\dfrac{\\sqrt3}2\\right) \\cdot \\dfrac{\\sqrt2}{2} = -\\dfrac{\\sqrt6}{2}$。**2 本目の道**：$\\dfrac{13\\pi}{12} = \\dfrac{5\\pi}{6}+\\dfrac{\\pi}{4}$、$\\dfrac{7\\pi}{12} = \\dfrac{5\\pi}{6}-\\dfrac{\\pi}{4}$ と分けて [加法定理] で $1$ 項ずつ出しても、同じ値に着きます——それは前題をそのままなぞることです。中心の問いへ：**差を積に直す公式は、前題の式を「角の名前を付けかえて」読んだものにすぎない**。",
        },
      ],
      formulaPreview: "sinA − sinB = 2 cos{(A+B)/2} sin{(A−B)/2} = 2·cos(5π/6)·sin(π/4) = −√6/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "こんどは $\\cos$ の差です。数Ⅱ・B の [加法定理]\n\n$$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta, \\qquad \\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta$$\n\nを使って、次の値を求めましょう。\n\n$$\\cos\\frac{17\\pi}{12} - \\cos\\frac{11\\pi}{12}$$",
      answer: Math.SQRT2 / 2,
      answerDisplay: "√2/2",
      unit: "",
      unknownLabel: "$\\cos\\dfrac{17\\pi}{12} - \\cos\\dfrac{11\\pi}{12}$",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題の道筋のうち、何がそのまま使えて、どこに気をつける？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\sin$ の差が $\\cos$ の差になった**こと $1$ つ。$\\sin$ と $\\cos$ の [加法定理] で、右辺の符号の並びは同じだっただろうか。",
        },
        {
          layer: 3,
          text: "$\\cos$ の $2$ 本を**引く**と、$\\cos\\alpha\\cos\\beta$ が消えて $$\\cos(\\alpha+\\beta)-\\cos(\\alpha-\\beta) = -2\\sin\\alpha\\sin\\beta$$ **先頭にマイナスが付きます**。前題と同じく名前を付けかえて $\\cos A-\\cos B = -2\\sin\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$。$A=\\dfrac{17\\pi}{12}$、$B=\\dfrac{11\\pi}{12}$ なら $\\dfrac{A+B}2 = \\dfrac{7\\pi}{6}$、$\\dfrac{A-B}2 = \\dfrac{\\pi}{4}$ なので $-2 \\cdot \\left(-\\dfrac12\\right) \\cdot \\dfrac{\\sqrt2}{2} = \\dfrac{\\sqrt2}{2}$。先頭のマイナスを落とすと $-\\dfrac{\\sqrt2}{2}$ になり、符号が逆の別の値になります。中心の問いへ：**$\\cos$ の差も積に化ける。ただし、符号を連れてくる**。",
        },
      ],
      formulaPreview: "cosA − cosB = −2 sin{(A+B)/2} sin{(A−B)/2} = −2·sin(7π/6)·sin(π/4) = √2/2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "こんどは向きが逆です。**積を和（差）に**直します。\n\n$$\\sin 4\\theta \\cos 7\\theta = \\frac12\\left(\\sin p\\theta - \\sin q\\theta\\right)$$\n\nがすべての $\\theta$ で成り立つように、正の整数 $p$、$q$（$p > q$）を決めます。$p$ の値を求めましょう。",
      answer: 11,
      unit: "",
      unknownLabel: "$p$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。step1 は和を積にした。今度は**積のほうが先に**ある。同じ $2$ 本の式を、どちら向きに読めばいい？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、**矢印の向き**だけ。step1 で出てきた「$2\\sin\\alpha\\cos\\beta$」は、何と何の和だった？",
        },
        {
          layer: 3,
          text: "step1 の式 $\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta) = 2\\sin\\alpha\\cos\\beta$ を**右から左へ**読むと $$\\sin\\alpha\\cos\\beta = \\frac12\\left\\{\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\right\\}$$ $\\alpha = 4\\theta$、$\\beta = 7\\theta$ なら $\\alpha-\\beta = -3\\theta$ で、$\\sin(-3\\theta) = -\\sin3\\theta$。よって $\\sin4\\theta\\cos7\\theta = \\dfrac12(\\sin11\\theta - \\sin3\\theta)$、$p = 11$。中心の問いへ：**和と積は、同じ式の表と裏**。どちら向きにも読める。",
        },
      ],
      formulaPreview: "sin4θ cos7θ = ½{sin11θ + sin(−3θ)} = ½(sin11θ − sin3θ)、p = 11",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "ここから、**数ではなく文字**で和積を使います。\n\n$$\\sin\\left(x + \\frac{2\\pi}{3}\\right) - \\sin x = a\\cos\\left(x + \\frac{\\pi}{3}\\right)$$\n\nが**すべての $x$ で**成り立つような定数 $a$ の値を求めましょう。",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。step3 では $2$ つの角がどちらも数だった。今度は角に $x$ が入っている。step3 の道筋は、角が文字でも通るだろうか？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは、**角に $x$ が入った**こと $1$ つ（だから答えは「$1$ つの値」ではなく「すべての $x$ で成り立つ係数」になる）。step3 の式の中で、$x$ を含むのはどの部分になりそうだろう？",
        },
        {
          layer: 3,
          text: "step3 の形 $\\sin A - \\sin B = 2\\cos\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$ で $A = x+\\dfrac{2\\pi}3$、$B = x$ とすると $\\dfrac{A+B}2 = x+\\dfrac\\pi3$、$\\dfrac{A-B}2 = \\dfrac\\pi3$ なので $$\\sin\\left(x+\\frac{2\\pi}{3}\\right)-\\sin x = 2\\sin\\frac{\\pi}{3}\\cos\\left(x+\\frac{\\pi}{3}\\right) = \\sqrt3\\cos\\left(x+\\frac{\\pi}{3}\\right)$$ $a = \\sqrt3$。**へだたりの半分 $\\dfrac{\\pi}{3}$ が、$\\sin$ の中に取り出された**。中心の問いへの答えの芯：**差を積にすると、$2$ つの角の「へだたり」だけでできた因子が外に出る**。へだたりが小さくなれば、その因子も小さくなる。",
        },
      ],
      formulaPreview: "sinA − sinB = 2cos{(A+B)/2} sin{(A−B)/2}。A=x+2π/3, B=x で 2 sin(π/3) cos(x+π/3)、a = √3",
      figureMarker: "<<M3VD_SIN_DIFF>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$$\\cos\\left(x + \\frac{\\pi}{2}\\right) - \\cos x = b\\sin\\left(x + \\frac{\\pi}{4}\\right)$$\n\nが**すべての $x$ で**成り立つような定数 $b$ の値を求めましょう。",
      answer: -Math.SQRT2,
      answerDisplay: "−√2",
      unit: "",
      unknownLabel: "$b$",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\sin$ の差が $\\cos$ の差になった。前題の道筋のどこに、気をつけるところが増える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\cos$ の差**になったこと $1$ つ。step4 で、$\\cos$ の差だけが連れてきたものがあった。",
        },
        {
          layer: 3,
          text: "step4 と同じく $\\cos A - \\cos B = -2\\sin\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$。$A = x+\\dfrac\\pi2$、$B=x$ なら $\\dfrac{A+B}2 = x+\\dfrac\\pi4$、$\\dfrac{A-B}2 = \\dfrac\\pi4$ なので $$\\cos\\left(x+\\frac\\pi2\\right)-\\cos x = -2\\sin\\frac\\pi4\\sin\\left(x+\\frac\\pi4\\right) = -\\sqrt2\\sin\\left(x+\\frac\\pi4\\right)$$ $b = -\\sqrt2$。**検算**：$x=0$ を入れると左辺は $0-1 = -1$、右辺は $-\\sqrt2 \\cdot \\dfrac{\\sqrt2}{2} = -1$。中心の問いへ：**$\\cos$ の差でも、へだたりの半分が因子として外に出る**。",
        },
      ],
      formulaPreview: "cosA − cosB = −2 sin{(A+B)/2} sin{(A−B)/2}。−2 sin(π/4) sin(x+π/4)、b = −√2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "方程式\n\n$$\\sin 5x - \\sin x = 0 \\qquad (0 \\le x < \\pi)$$\n\nの解は何個ありますか。",
      answer: 4,
      unit: "個",
      unknownLabel: "解の個数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。step6 は $\\sin$ の差を積に書きかえて係数を読んだ。今度は「差 $=0$」の方程式。積に書きかえた形は、方程式を解くうえで何の役に立つだろう？",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**式が「$=0$」の方程式になった**こと $1$ つ。step6 で書きかえた形の、どんな性質が方程式を解くときに効きそうだろう？",
        },
        {
          layer: 3,
          text: "step6 と同じく差を積にすると $$\\sin5x-\\sin x = 2\\cos3x\\sin2x$$ 積が $0$ なので、$\\cos3x = 0$ または $\\sin2x = 0$。$0\\le x<\\pi$ では、$\\cos3x=0$ から $x = \\dfrac\\pi6,\\ \\dfrac\\pi2,\\ \\dfrac{5\\pi}6$（$3x$ は $0\\le3x<3\\pi$）、$\\sin2x=0$ から $x = 0,\\ \\dfrac\\pi2$（$2x$ は $0\\le2x<2\\pi$）。**$x=\\dfrac\\pi2$ は両方に出てくる**ので $1$ 回だけ数え、$0,\\ \\dfrac\\pi6,\\ \\dfrac\\pi2,\\ \\dfrac{5\\pi}6$ の $4$ 個。二重に数えると $5$ 個になってしまいます。中心の問いへ：**差のままでは手の出ない方程式が、積にすると「どちらかが $0$」に割れる**。",
        },
      ],
      formulaPreview: "sin5x − sin x = 2 cos3x sin2x = 0 → x = 0, π/6, π/2, 5π/6（π/2 は重なり）の 4 個",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$3$ つの積\n\n$$\\sin x \\sin 3x \\sin 4x$$\n\nを、$\\sin$ の項だけの和（差）\n\n$$c_1\\sin 2x + c_2\\sin 6x + c_3 \\sin 8x$$\n\nの形に直します。$c_3$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: -0.25,
      answerDisplay: "−1/4",
      unit: "",
      unknownLabel: "$c_3$（$\\sin 8x$ の係数）",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "step5 と比べてみよう。step5 は $2$ つの積を和にした。今度は $3$ つの積。step5 の手つきを、何回使えば届くだろう？",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、**積の数が $2$ つから $3$ つに増えた**こと $1$ つ。step5 の手つきは、一度にいくつの積を相手にしていた？",
        },
        {
          layer: 3,
          text: "まず $\\sin x\\sin3x$ を和にします。step4 の $\\cos$ の $2$ 本を引いた式から $\\sin\\alpha\\sin\\beta = -\\dfrac12\\{\\cos(\\alpha+\\beta)-\\cos(\\alpha-\\beta)\\}$ なので $$\\sin x\\sin3x = \\frac12(\\cos2x - \\cos4x)$$ これに $\\sin4x$ を掛けると $\\dfrac12(\\sin4x\\cos2x - \\sin4x\\cos4x)$。ここで step5 の形 $\\sin\\alpha\\cos\\beta = \\dfrac12\\{\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\}$ をもう一度使うと $$\\sin4x\\cos2x = \\frac12(\\sin6x+\\sin2x), \\qquad \\sin4x\\cos4x = \\frac12\\sin8x$$ よって全体は $\\dfrac14\\sin2x + \\dfrac14\\sin6x - \\dfrac14\\sin8x$、$c_3 = -\\dfrac14$。中心の問いへ：**積をいくつ重ねても、同じ手つきを繰り返せば和に戻せる**。",
        },
      ],
      formulaPreview: "sinx sin3x = ½(cos2x − cos4x)。×sin4x → ¼ sin2x + ¼ sin6x − ¼ sin8x、c₃ = −1/4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$\\sin\\left(x + \\dfrac{\\pi}{3}\\right)$ と $\\sin x$ は、どちらも $-1$ から $1$ までの値をとる波です。その**差**\n\n$$y = \\sin\\left(x + \\frac{\\pi}{3}\\right) - \\sin x$$\n\nの最大値を求めましょう。",
      answer: 1,
      unit: "",
      unknownLabel: "$y$ の最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。step6 は差を $1$ つの項にまとめて係数を読んだ。今度は最大値。そもそも、$-1$ から $1$ までの波どうしの差は、$1-(-1)=2$ まで大きくなれるだろうか？",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**問われているのが係数ではなく最大値**になったこと $1$ つ。step6 で出てきた形の、どの部分が $y$ の大きさを決めていそうだろう？",
        },
        {
          layer: 3,
          text: "step6 と同じく差を積にすると、$A = x+\\dfrac{\\pi}3$、$B = x$ で $\\dfrac{A+B}2 = x+\\dfrac\\pi6$、$\\dfrac{A-B}2 = \\dfrac\\pi6$ なので $$y = 2\\sin\\frac{\\pi}{6}\\,\\cos\\left(x+\\frac{\\pi}{6}\\right) = \\cos\\left(x+\\frac{\\pi}{6}\\right)$$ 最大値は $1$。**$1-(-1)=2$ にはなりません**。$2$ つの波のへだたりが $\\dfrac\\pi3$ しかないので、片方が山のとき、もう片方は谷の近くにいないからです。**2 本目の道**：数Ⅱ・B の [三角関数の合成] で $y = \\dfrac12\\sin x+\\dfrac{\\sqrt3}2\\cos x - \\sin x = -\\dfrac12\\sin x+\\dfrac{\\sqrt3}{2}\\cos x$ とまとめても、振幅は $\\sqrt{\\left(\\dfrac12\\right)^2+\\left(\\dfrac{\\sqrt3}2\\right)^2} = 1$ で同じ値に着きます。中心の問いに戻ると：**差を積に直すと、$2$ つの波の「へだたり」が $2\\sin\\dfrac{A-B}{2}$ という $1$ つの数になって、差の大きさを決めていた**。",
        },
      ],
      formulaPreview: "sin(x+π/3) − sin x = 2 sin(π/6) cos(x+π/6) = cos(x+π/6)、最大値 1",
    },
  ],
  derivation: `**中心の問い** ｜ $\\sin$ の**差**を**積**に書きかえると、何がうれしい？——微分の定義の分子が、ちょうど「差」の形をしているとしたら？

────────

## 公式は 2 本の加法定理から生える

[加法定理] の $\\sin$ の $2$ 本

$$\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta, \\qquad \\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta$$

は、右辺が「**同じ項**」と「**符号だけ逆の項**」でできている。だから足せば一方が、引けばもう一方が消える。

$$\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta) = 2\\sin\\alpha\\cos\\beta, \\qquad \\sin(\\alpha+\\beta)-\\sin(\\alpha-\\beta) = 2\\cos\\alpha\\sin\\beta$$

$\\cos$ の $2$ 本も同じで、足すと $2\\cos\\alpha\\cos\\beta$、引くと $-2\\sin\\alpha\\sin\\beta$。**この $4$ 本が、和積の公式の原型のすべてである**（step1・2・4）。

## 角の名前を付けかえると、和や差を積に直す公式になる

$\\alpha+\\beta = A$、$\\alpha-\\beta = B$ と名前を付けかえると $\\alpha = \\dfrac{A+B}{2}$、$\\beta = \\dfrac{A-B}{2}$。原型に戻すと

$$\\sin A-\\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}, \\qquad \\cos A-\\cos B = -2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$$

など $4$ 本の [和積の公式] になる（step3・4）。**新しい事実は何も増えていない**。原型を、角の名前を替えて読んだだけである。

## 表と裏——積を和に戻す

原型を右から左へ読めば、積が和になる（積和の公式・step5）。$3$ つの積も、この手つきを $2$ 回繰り返せば和に戻る（step9）。**和と積は、同じ式の表と裏**である。

## ここが胚細胞：差を積にすると、へだたりが因子として外に出る

$\\sin A - \\sin B = 2\\cos\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$ の右辺には、$2$ つの角の**平均** $\\dfrac{A+B}{2}$ と、**へだたりの半分** $\\dfrac{A-B}{2}$ が、別々の因子として並んでいる。

$A = x+h$、$B = x$ とおけば

$$\\sin(x+h)-\\sin x = 2\\cos\\left(x+\\frac h2\\right)\\sin\\frac h2$$

$h$ が小さいとき、$\\sin\\dfrac h2$ は小さく、しかも前の系列で [三角関数の極限] を調べた、**まさにその形**をしている（step6・7）。**差のままでは見えなかった「小さいかたまり」が、積にすると取り出せる。**これが、次の系列で $\\sin x$ を微分するときの鍵になる。

## Step の道筋

- **step1〜2**：加法定理 $2$ 本を足すと和が、引くと差が、積に化ける
- **step3〜4**：角の名前を付けかえて、差を積に直す（$\\cos$ の差は符号を連れてくる）
- **step5**：逆向き——積を和に
- **step6〜7**：数から文字へ——へだたりの半分が因子として外に出る
- **step8〜9**：方程式を「積 $=0$」に割る（重なる解に注意）／$3$ つの積を和に戻す
- **step10（山場）**：$-1$ から $1$ までの波どうしの差でも、最大値は $2$ にならない

────────

**もっと深く**

**忘れても導ける。** 和積の公式は $4$ 本×$2$ 向きで $8$ 本あり、似ているが少しずつ違う。丸暗記は大変だが、**[加法定理] の $2$ 本を並べて足すか引くか**すれば、その場で原型が出る。あとは $\\alpha = \\dfrac{A+B}{2}$、$\\beta = \\dfrac{A-B}{2}$ と名前を付けかえるだけ。覚えておくのは「$2$ 本を並べる」という手つきのほうである。

**よくある取り違え——$\\sin A-\\sin B = \\sin(A-B)$ ではない。** $\\sin$ は「角に掛ける数」ではなく、角を値に変える**はたらき**なので、引き算を中へ配れない。$A=\\dfrac{\\pi}{2}$、$B=-\\dfrac{\\pi}{2}$ なら左辺は $1-(-1)=2$、右辺は $\\sin\\pi = 0$ で、数を入れると食い違いが見える。**もう $1$ つの取り違え**は $\\cos A - \\cos B$ の先頭のマイナスを落とすこと。落とすと符号が逆の値になる（step4）。

**波を足し引きすると、へだたりが大きさを決める。** step10 で見たとおり、同じ大きさの $2$ つの波の差の大きさは $2\\left|\\sin\\dfrac{A-B}{2}\\right|$ 倍になる。へだたりが $0$ なら打ち消し合って $0$、へだたりが半周なら $2$ 倍。和なら逆に $2\\left|\\cos\\dfrac{A-B}{2}\\right|$ 倍になる。少しだけ周期のちがう $2$ つの音を重ねると、音が大きくなったり小さくなったりをゆっくり繰り返す「**うなり**」が聞こえるのは、和を積に直すと $\\cos\\dfrac{A-B}{2}$ がゆっくり変わる因子として現れるからである。

**この先の景色。** 次の系列で、$\\sin(x+h)-\\sin x$ を積に直した形から $(\\sin x)' = \\cos x$ が出る。第6章の積分では、逆向きの積和の公式が $\\sin mx\\cos nx$ の積分を和の積分に直す。大学では、波をいくつもの $\\sin$・$\\cos$ の和に分けるフーリエ解析の、土台の $1$ つになる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章「和積の公式」の構成（三角関数の微分の準備として、加法定理 $4$ 本を足し引きして原型を作り、角の名前を付けかえて和積・積和に進む順序）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

$\\sin$ の差を積に書きかえると、$2$ つの角の**平均**と**へだたりの半分**が、別々の因子として並ぶ。差のままでは混ざっていた $2$ つの情報が、積にすると分かれて見える。

とくに $\\sin(x+h)-\\sin x$ では、へだたりの半分 $\\dfrac h2$ が $\\sin\\dfrac h2$ という因子になって外に出た。$h$ を $0$ に近づけたいとき、その因子こそが主役になる——**微分の定義の分子が「差」の形をしているから、差を積にする公式が、微分への道を開く**。`,
};

/** M3VD3: 三角関数の微分——原点の傾きを全点へ運ぶ（段1・段2 一体）。
 *  step1・2 は定義から個別の点で計算でき、答えが cos a と一致して驚く＝事例がそのまま証明（お手本 algebra2_exp_extend_01 の型）。
 *  質的変化 step7 は「角を度で測る」＝ 数Ⅱ・B 弧度法の derivation の約束（ラジアンのときだけ (sinθ)'=cosθ）の回収。
 *  山場 step10 は「1 周を N とする単位で原点の傾きが指定値になる N」。「傾きがちょうど 1 になる N」は問わない（弧度法のラベル＝追補10）。 */
export const M3VD_TRIG_DIFF_SERIES: LearnerSeries = {
  id: "math3_vd_trig_01",
  title: "三角関数の微分——原点の傾きを全点へ運ぶ",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — $y=\\sin x$ の原点での傾きは $1$ だった。その $1$ 点の事実が、和積の公式に運ばれて、すべての点の傾きになる。そして、角を度で測っていたら何が変わっていたかを確かめる。",
  patternId: "M3VD3",
  unit: "math_3",
  revelationLabel:
    "**角を度で測ると、$\\sin$ の原点での傾きは $1$ ではなく $\\dfrac{\\pi}{180}$ になる**。$(\\sin x)'=\\cos x$ という美しい形は、角を弧の長さで測ったから成り立っていた",
  drivingQuestion:
    "$y=\\sin x$ の**原点**での傾き $1$ は、どうやって**すべての点**の傾きになる？——そして、角を**度**で測っていたら、何が変わっていた？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "第3章と同じく、[微分係数] を定義から求めます。$f(x) = \\sin x$ の $x = \\dfrac{\\pi}{3}$ における微分係数\n\n$$\\lim_{h \\to 0} \\frac{\\sin\\left(\\dfrac{\\pi}{3}+h\\right) - \\sin\\dfrac{\\pi}{3}}{h}$$\n\nの値を求めましょう。",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{3}$ における微分係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "分子は $\\sin$ の**差**になっている。前の系列（[和積の公式]）で、$\\sin$ の差を書きかえると何が取り出せたのだった？ そして、その前の系列で行き先を調べたのは、どんな形だった？",
        },
        {
          layer: 2,
          text: "前の系列の step6 で書きかえた式と、この分子を見比べてみよう。$h$ が小さいとき、小さくなるのはどの部分だろう？",
        },
        {
          layer: 3,
          text: "[和積の公式] で $$\\sin\\left(\\frac\\pi3+h\\right)-\\sin\\frac\\pi3 = 2\\cos\\left(\\frac\\pi3+\\frac h2\\right)\\sin\\frac h2$$ $h$ で割って、$t=\\dfrac h2$ とおくと $$\\cos\\left(\\frac\\pi3+t\\right)\\cdot\\frac{\\sin t}{t}$$ $h\\to0$ のとき $t\\to0$ で、$\\dfrac{\\sin t}{t}\\to1$（[三角関数の極限]）、$\\cos\\left(\\dfrac\\pi3+t\\right)\\to\\cos\\dfrac\\pi3$（$\\cos$ は [関数の連続] な関数）。よって $\\cos\\dfrac\\pi3 = \\dfrac12$。中心の問いへの最初の部分回答：**原点で調べた「$\\dfrac{\\sin t}{t}\\to1$」が、$x=\\dfrac\\pi3$ の傾きを決めた**。",
        },
      ],
      formulaPreview: "{sin(π/3+h) − sin(π/3)}/h = cos(π/3 + h/2)·{sin(h/2)/(h/2)} → cos(π/3) = 1/2",
      figureMarker: "<<M3VD_SIN_TANGENT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "前題と同じく定義から、$f(x) = \\sin x$ の $x = \\dfrac{5\\pi}{6}$ における微分係数を求めましょう。",
      answer: -Math.sqrt(3) / 2,
      answerDisplay: "−√3/2",
      unit: "",
      unknownLabel: "$x=\\dfrac{5\\pi}{6}$ における微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題の答えは、どこから出てきた数だった？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**微分係数を求める点**だけ。前題の答え $\\dfrac12$ は、$\\dfrac\\pi3$ という点とどんな関係にあった？",
        },
        {
          layer: 3,
          text: "前題と同じ手順で、分子は $2\\cos\\left(\\dfrac{5\\pi}6+\\dfrac h2\\right)\\sin\\dfrac h2$、$h$ で割って $\\cos\\left(\\dfrac{5\\pi}6+t\\right)\\cdot\\dfrac{\\sin t}t \\to \\cos\\dfrac{5\\pi}6 = -\\dfrac{\\sqrt3}{2}$。前題も今題も、**答えは「その点での $\\cos$ の値」**でした。どの点 $a$ でも同じ手順で $\\cos a$ が出ます——つまり $$(\\sin x)' = \\cos x$$ 中心の問いへ：**原点の $1$ を、和積の公式が $\\cos x$ という形ですべての点へ運んだ**。",
        },
      ],
      formulaPreview: "cos(5π/6 + h/2)·{sin(h/2)/(h/2)} → cos(5π/6) = −√3/2。どの点でも (sin x)' = cos x",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは $f(x) = \\cos x$ です。定義から、$x = \\dfrac{4\\pi}{3}$ における微分係数を求めましょう。",
      answer: Math.sqrt(3) / 2,
      answerDisplay: "√3/2",
      unit: "",
      unknownLabel: "$x=\\dfrac{4\\pi}{3}$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\sin$ が $\\cos$ になった。前題の道筋は、そのまま通るだろうか。どこかで気をつけるところは？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\sin$ の差が $\\cos$ の差になった**こと $1$ つ。前の系列で、$\\cos$ の差を積にしたとき、$\\sin$ の差とちがって何が付いてきた？",
        },
        {
          layer: 3,
          text: "[和積の公式] で $\\cos A-\\cos B = -2\\sin\\dfrac{A+B}{2}\\sin\\dfrac{A-B}{2}$ なので、分子は $-2\\sin\\left(\\dfrac{4\\pi}3+\\dfrac h2\\right)\\sin\\dfrac h2$。$h$ で割ると $-\\sin\\left(\\dfrac{4\\pi}3+t\\right)\\cdot\\dfrac{\\sin t}{t} \\to -\\sin\\dfrac{4\\pi}3 = -\\left(-\\dfrac{\\sqrt3}2\\right) = \\dfrac{\\sqrt3}{2}$。どの点でも $$(\\cos x)' = -\\sin x$$ **マイナスを落とすと $-\\dfrac{\\sqrt3}2$ になり、別の値になります**。中心の問いへ：**$\\cos$ の傾きも同じ $1$ から運ばれる。ただし和積の公式が連れてきた符号も一緒に運ばれる**。",
        },
      ],
      formulaPreview: "cosA − cosB = −2sin{(A+B)/2}sin{(A−B)/2}。−sin(4π/3 + h/2)·{sin(h/2)/(h/2)} → −sin(4π/3) = √3/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$f(x) = \\tan x = \\dfrac{\\sin x}{\\cos x}$ の、$x = \\dfrac{\\pi}{6}$ における微分係数を求めましょう。答えは既約分数で答えましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{6}$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは定義に戻った。今度の相手は $\\sin$ と $\\cos$ の**割り算**。もう手に入っているものは何だろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**相手が $\\sin$ と $\\cos$ の商になった**こと $1$ つ。分子の傾きも分母の傾きも、もう分かっている。第3章で、商はどう扱った？",
        },
        {
          layer: 3,
          text: "第3章の [商の微分] $\\left(\\dfrac fg\\right)' = \\dfrac{f'g-fg'}{g^2}$ に、step2・3 の結果 $(\\sin x)'=\\cos x$・$(\\cos x)'=-\\sin x$ を入れると $$(\\tan x)' = \\frac{\\cos x\\cdot\\cos x - \\sin x\\cdot(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2x+\\sin^2x}{\\cos^2x} = \\frac{1}{\\cos^2 x}$$（[相互関係]）。$x=\\dfrac\\pi6$ では $\\cos^2\\dfrac\\pi6 = \\dfrac34$ なので $\\dfrac43$。中心の問いへ：**$\\tan$ はもう定義に戻らなくてよい。運ばれた $2$ つの傾きを、商の公式が組み立てる**。",
        },
      ],
      formulaPreview: "(tan x)' = {cos²x + sin²x}/cos²x = 1/cos²x。x = π/6 で 1/(3/4) = 4/3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "こんどは向きが逆です。$y = \\sin x$ のグラフの接線の傾きが $-\\dfrac12$ になる $x$ を、$0 \\le x < 2\\pi$ の範囲で**すべて**求めましょう。カンマで区切って答えましょう。",
      answer: (2 * Math.PI) / 3,
      answerDisplay: "2π/3, 4π/3",
      solutionSet: [(2 * Math.PI) / 3, (4 * Math.PI) / 3],
      inputAffordances: ["pi", "multi"],
      unit: "",
      unknownLabel: "接線の傾きが $-\\dfrac12$ になる $x$（すべて）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。step2 は点を決めて傾きを出した。今度は**傾きのほうが先に**決まっている。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、**問われているのが傾きから点に入れ替わった**こと $1$ つ。step2 で分かった「傾き」の正体は何だった？",
        },
        {
          layer: 3,
          text: "step2 で $(\\sin x)' = \\cos x$ が分かりました。傾きが $-\\dfrac12$ ということは $\\cos x = -\\dfrac12$。$0\\le x<2\\pi$ では $x = \\dfrac{2\\pi}3,\\ \\dfrac{4\\pi}3$ の $2$ つ（数Ⅱ・B の [三角方程式]）。範囲を決めないと、$2\\pi$ ごとに無数に出てきます。中心の問いへ：**傾きの地図が $\\cos x$ だと分かれば、傾きから点を逆にたどれる**。",
        },
      ],
      formulaPreview: "(sin x)' = cos x = −1/2 → x = 2π/3, 4π/3（0 ≤ x < 2π）",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$f(x) = \\sin x$ を**続けて $10$ 回**微分した関数を $f^{(10)}(x)$ と書きます。$f^{(10)}\\left(\\dfrac{\\pi}{6}\\right)$ の値を求めましょう。",
      answer: -0.5,
      answerDisplay: "−1/2",
      unit: "",
      unknownLabel: "$f^{(10)}\\left(\\dfrac{\\pi}{6}\\right)$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。step1 は $1$ 回だけ微分した。今度は何度も続ける。$1$ 回ずつ書いていくと、何か繰り返しが見えないだろうか。",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、**微分する回数**だけ。$\\sin x$ から始めて、$1$ 回・$2$ 回・$3$ 回……と微分すると、何回目で元の $\\sin x$ に戻る？",
        },
        {
          layer: 3,
          text: "$(\\sin x)'=\\cos x$、$(\\cos x)'=-\\sin x$ を繰り返すと $$\\sin x \\to \\cos x \\to -\\sin x \\to -\\cos x \\to \\sin x$$ と **$4$ 回で元に戻ります**。$10 = 4\\times2+2$ なので、$10$ 回微分すると $2$ 回微分したときと同じ $-\\sin x$。$x=\\dfrac\\pi6$ では $-\\dfrac12$。中心の問いへ：**運ばれた傾きの関数を、もう一度運ぶと、また三角関数に戻る**——$\\sin$ と $\\cos$ は微分で入れ替わりながら回る。",
        },
      ],
      formulaPreview: "sin → cos → −sin → −cos → sin（4 回で 1 周）。10 回 = 2 回ぶん → −sin(π/6) = −1/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "ここで、**角を度で測った**場合を考えます。$x$ 度の角の $\\sin$ を $y = \\sin(x°)$ と書くことにします。弧度法で書き直すと $x° = \\dfrac{\\pi x}{180}$（ラジアン）なので $y = \\sin\\dfrac{\\pi x}{180}$ です。\n\nこの関数の、$x = 0$ における微分係数を求めましょう。",
      answer: Math.PI / 180,
      answerDisplay: "π/180",
      unit: "",
      unknownLabel: "$x=0$ における $\\sin(x°)$ の微分係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      inputAffordances: ["pi"],
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。同じ $\\sin$ の傾きを調べている。違うのは、**角をどんな「ものさし」で測っているか**。ものさしを替えても、原点での傾きは $1$ のままだろうか？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、**$x$ が度の数になった**こと $1$ つ。$x$ が $1$ 増えたとき、角は弧の長さにしてどれだけ増えている？",
        },
        {
          layer: 3,
          text: "$y=\\sin\\dfrac{\\pi x}{180}$ の $x=0$ での微分係数は、定義から $$\\lim_{h\\to0}\\frac{\\sin\\dfrac{\\pi h}{180}}{h} = \\frac{\\pi}{180}\\cdot\\lim_{h\\to0}\\frac{\\sin\\dfrac{\\pi h}{180}}{\\dfrac{\\pi h}{180}} = \\frac{\\pi}{180}\\cdot1 = \\frac{\\pi}{180}$$（系列1 の「形をそろえる」）。**$1$ ではありません**。「度で測っても $(\\sin x)' = \\cos x$」と思っていると $1$ を答えてしまいます。中心の問いへの答えの芯：**原点での傾きがちょうど $1$ だったのは、角を弧の長さ（ラジアン）で測っていたからだった**——数Ⅱ・B で [弧度法] を学んだとき「微分がきれいになる」と予告されていたのは、このことです。",
        },
      ],
      formulaPreview: "sin(πh/180)/h = (π/180)·{sin(πh/180)/(πh/180)} → π/180",
      figureMarker: "<<M3VD_DEG_RAD>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "前題と同じ $y = \\sin(x°) = \\sin\\dfrac{\\pi x}{180}$ の、こんどは $x = 60$ における微分係数を求めましょう。",
      answer: Math.PI / 360,
      answerDisplay: "π/360",
      unit: "",
      unknownLabel: "$x=60$ における $\\sin(x°)$ の微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      inputAffordances: ["pi"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。ものさしも関数も同じ度の $\\sin$。点が変わった。前題で付いてきた余分な数は、今度も付いてくるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**点が $0$ でなくなった**こと $1$ つ。前題で、$\\dfrac{\\pi}{180}$ はどこから出てきた？",
        },
        {
          layer: 3,
          text: "$y = \\sin\\dfrac{\\pi x}{180}$ は $\\sin$ の中に $\\dfrac{\\pi}{180}x$ が入った合成なので、第3章の [合成関数の微分法] で $$y' = \\cos\\frac{\\pi x}{180}\\cdot\\frac{\\pi}{180}$$ $x=60$ では $\\cos\\dfrac\\pi3\\cdot\\dfrac{\\pi}{180} = \\dfrac12\\cdot\\dfrac{\\pi}{180} = \\dfrac{\\pi}{360}$。**度で測るかぎり、微分するたびに $\\dfrac{\\pi}{180}$ が付いてまわります**。中心の問いへ：**ものさしの選び方の代償は、すべての点に運ばれる**。",
        },
      ],
      formulaPreview: "{sin(πx/180)}' = cos(πx/180)·(π/180)。x = 60 で (1/2)(π/180) = π/360",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "角の単位には、**$1$ 周を $400$ とする**もの（グラード）もあります。$x$ グラードの角は $\\dfrac{2\\pi x}{400}$ ラジアンです。\n\n$y = \\sin\\dfrac{2\\pi x}{400}$ の、$x = 0$ における微分係数を求めましょう。",
      answer: Math.PI / 200,
      answerDisplay: "π/200",
      unit: "",
      unknownLabel: "$x=0$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      inputAffordances: ["pi"],
      hints: [
        {
          layer: 1,
          text: "step7 と比べてみよう。度のかわりに、別のものさしが出てきた。step7 の余分な数は、ものさしのどこから決まっていた？",
        },
        {
          layer: 2,
          text: "step7 と変わったのは、**$1$ 周を $360$ ではなく $400$ とするものさし**になったこと $1$ つ。$1$ 周の数を替えると、$x$ が $1$ 増えたときの弧の長さはどう変わる？",
        },
        {
          layer: 3,
          text: "step7 と同じく形をそろえて $$\\lim_{h\\to0}\\frac{\\sin\\dfrac{2\\pi h}{400}}{h} = \\frac{2\\pi}{400}\\cdot1 = \\frac{\\pi}{200}$$ 一般に、$1$ 周を $N$ とする単位では、原点での傾きは $\\dfrac{2\\pi}{N}$。$N=360$ なら $\\dfrac{2\\pi}{360} = \\dfrac\\pi{180}$（step7）。中心の問いへ：**原点での傾きは、$1$ 周をいくつと数えるかで決まる**。",
        },
      ],
      formulaPreview: "sin(2πh/400)/h = (2π/400)·{…} → π/200。1 周を N とすると原点の傾きは 2π/N",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$1$ 周を $N$ とする角の単位で $\\sin$ を測ったところ、$x = 0$ における微分係数が $\\dfrac{\\pi}{150}$ になりました。$N$ の値を求めましょう。",
      answer: 300,
      unit: "",
      unknownLabel: "$N$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題はものさしから傾きを出した。今度は**傾きのほうが先に**分かっている。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**問われているのが傾きから「$1$ 周の数」に入れ替わった**こと $1$ つ。前題で、$1$ 周の数と原点の傾きはどんな式で結ばれていた？",
        },
        {
          layer: 3,
          text: "前題で、$1$ 周を $N$ とする単位では原点での傾きが $\\dfrac{2\\pi}{N}$ でした。これが $\\dfrac{\\pi}{150}$ なので $\\dfrac{2\\pi}{N} = \\dfrac{\\pi}{150}$、$N = 300$。傾きが大きいほど $N$ は小さく、傾きが小さいほど $N$ は大きい——**$1$ 周を細かく刻むほど、$x$ が $1$ 増えたときに進む弧は短くなり、傾きは小さくなる**。では、傾きがちょうど $1$ になる $N$ は？ それは「$1$ 周を弧の長さそのもので数える」ものさし、つまり [弧度法] です。中心の問いに戻ると：**$\\sin x$ の微分が $\\cos x$ という単純な形になったのは、関数のおかげだけではなく、ものさしの選び方のおかげでもあった**。",
        },
      ],
      formulaPreview: "2π/N = π/150 → N = 300",
    },
  ],
  derivation: `**中心の問い** ｜ $y=\\sin x$ の**原点**での傾き $1$ は、どうやって**すべての点**の傾きになる？——そして、角を**度**で測っていたら、何が変わっていた？

────────

## 1 点の事実を、和積の公式が全点へ運ぶ

どんな関数でも、[微分係数] の定義そのものは変わらない。$\\sin x$ を点 $a$ で微分するには

$$\\lim_{h\\to0}\\frac{\\sin(a+h)-\\sin a}{h}$$

を計算すればよい。分子は差の形なので、[和積の公式] で積に直す。

$$\\sin(a+h)-\\sin a = 2\\cos\\left(a+\\frac h2\\right)\\sin\\frac h2$$

$h$ で割り、$t=\\dfrac h2$ とおくと $\\cos(a+t)\\cdot\\dfrac{\\sin t}{t}$。$t\\to0$ で後ろの因子は $1$（[三角関数の極限]）、前の因子は $\\cos a$（$\\cos$ が [関数の連続] な関数だから）。よって

$$(\\sin x)' = \\cos x$$

## ここが胚細胞：原点の 1 と、それを運ぶ法則

この計算は $2$ つの部品でできている。**原点での傾き $1$**（$\\dfrac{\\sin t}{t}\\to1$）と、**それをどの点にも運ぶ法則**（和積の公式＝加法定理）。どちらが欠けても、$\\cos x$ という答えは出ない。

$\\cos x$ も同じ部品で運べる（和積の公式が $-$ を連れてくるので $(\\cos x)'=-\\sin x$）。$\\tan x$ は、運ばれた $2$ つを [商の微分] で組み立てて $\\dfrac{1}{\\cos^2x}$。

## ものさしを替えると、原点の 1 が崩れる

角を度で測ると、$y=\\sin(x°) = \\sin\\dfrac{\\pi x}{180}$ の原点での傾きは $\\dfrac{\\pi}{180}$ になる（step7）。一般に $1$ 周を $N$ とする単位なら $\\dfrac{2\\pi}{N}$。**傾きがちょうど $1$ になるのは、$1$ 周を $2\\pi$、つまり角を弧の長さで測るときだけ**——$\\dfrac{2\\pi}{N}=1$ を満たす $N$ は $2\\pi$ しかないからである。

数Ⅱ・B で [弧度法] を学んだとき、「なじみの深い度を捨てて、なぜ一見不自然な単位を？」と思ったかもしれない。答えがここにある。**弧度法は、原点での傾きをちょうど $1$ にする、ただ $1$ つの角のものさし**である。

## Step の道筋

- **step1〜2**：定義から個別の点で計算すると、答えが「その点の $\\cos$」になる（事例がそのまま証明）
- **step3**：$\\cos$ も同じ部品で。符号が付いてくる
- **step4**：$\\tan$ は商の公式で組み立てる
- **step5**：傾きから点を逆にたどる
- **step6**：$4$ 回微分すると元に戻る
- **step7〜9**：角を度・グラードで測ると、原点の傾きが $1$ でなくなる
- **step10（山場）**：傾きから、ものさし（$1$ 周の数）を逆にたどる

────────

**もっと深く**

**忘れても導ける。** $(\\sin x)'=\\cos x$ を忘れたら、$y=\\sin x$ のグラフを描いて傾きを読めばよい。原点で傾き $1$、山のてっぺん $x=\\dfrac\\pi2$ で傾き $0$、$x=\\pi$ で傾き $-1$——これは $\\cos x$ の値の並びそのものである。$(\\cos x)'$ の符号に迷ったら、$y=\\cos x$ が原点のすぐ右で**下がっている**ことを見れば、傾きは負、つまり $-\\sin x$ だと分かる。

**よくある取り違え。** ①$(\\cos x)' = \\sin x$（符号を落とす）。$x$ に $\\dfrac\\pi2$ 付近の値を入れれば、$y=\\cos x$ は下がっているのに傾きが正になってしまい、食い違いが見える。②「度で測っても $(\\sin x)'=\\cos x$」。step7 のとおり、度では $\\dfrac{\\pi}{180}$ が付く。電卓が度になっているときに微分の式を使うと、答えが約 $57$ 倍ずれる。

**$4$ 回で元に戻る。** $\\sin\\to\\cos\\to-\\sin\\to-\\cos\\to\\sin$。**$2$ 回微分すると符号が反転して元の関数に戻る**（$(\\sin x)'' = -\\sin x$）。これは「引き戻す力が、ずれに比例する」ばねや振り子の運動の式 $y'' = -y$ そのもので、$\\sin$ と $\\cos$ が波やゆれを表すのはこのためである。

**この先の景色。** 次の系列で、三角関数を多項式と積・商・合成でつないだ関数も微分できるようになる。第5章では、$(\\sin x)'=\\cos x$ を使って三角関数を含む関数のグラフの山と谷を調べる。大学では、微分方程式 $y''=-y$ の解がちょうど $\\sin$ と $\\cos$ の組み合わせであることを学ぶ。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章「三角関数の微分」の構成（和積の公式と三角関数の極限で $(\\sin x)'$ を定義から導き、$\\cos$・$\\tan$ へ進み、弧度法の正当性をコラムで回収する順序）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

原点での傾き $1$ は、**和積の公式という「運び役」**によって、どの点の傾きにも運ばれた。運ばれた先の値が $\\cos x$ である。

そして、原点での傾きがちょうど $1$ だったのは、**角を弧の長さで測っていたから**だった。度で測れば $\\dfrac{\\pi}{180}$、$1$ 周を $N$ と数えれば $\\dfrac{2\\pi}{N}$。$(\\sin x)'=\\cos x$ という単純な形は、関数だけで決まったのではなく、**私たちのものさしの選び方**と組になって決まっていた。`,
};

/** M3VD4: 三角関数と積・商・合成——道具の総動員。
 *  第3章の積・商・合成の公式に、新しい部品（sin・cos・tan の導関数）を差し込む合流の系列（C13 の本家）。
 *  質的変化 step4 は合成（外が三角・中が 1 次式）。かたまりの微分を掛け忘れると届かない（内側の係数≠1）。
 *  山場 step10 は、商と合成で押す道と、2 倍角で tan x に畳む道が同じ値に着く（Q3）。
 *  「公式でしか解けない」とは書かない——恒等変形を先にすれば一瞬で済む、というのがこの step の発見（C1 追補18-c）。
 *  step1・2 は x = 0 で評価するので、積の片方の項が消える（Round 1 I2）。積を f'g' とする誤りは検出するが、
 *  片方の項の落としは検出しない。両方の項が効く検出は step3・step10 が担う。 */
export const M3VD_TRIG_COMB_SERIES: LearnerSeries = {
  id: "math3_vd_trig_comb_01",
  title: "三角関数と積・商・合成——道具の総動員",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — $\\sin$・$\\cos$・$\\tan$ という新しい部品が来ても、第3章で手に入れたつなぎ方（積・商・合成）はそのまま使える。$10$ 問で、部品を差しかえて組み立てる。",
  patternId: "M3VD4",
  unit: "math_3",
  revelationLabel:
    "**$\\sin$ の中に $1$ 次式が入ると、中の式の傾きが掛け算で出てくる**。部品が三角関数に替わっても、合成の組み立て方は第3章と同じだった",
  drivingQuestion:
    "新しい相手（$\\sin$・$\\cos$・$\\tan$）が来ても、第3章で手に入れた**つなぎ方**（積・商・合成）は、そのまま効く？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "第3章の [積の微分] を思い出しながら、次の関数の $x = 0$ における微分係数を求めましょう。\n\n$$y = (x^2 + 3x + 2)\\cos x$$",
      answer: 3,
      unit: "",
      unknownLabel: "$x=0$ における微分係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "多項式と $\\cos x$ の**積**になっている。第3章で、積を微分するときはどうした？ そして、$\\cos x$ の微分は前の系列で何になった？",
        },
        {
          layer: 2,
          text: "第3章の積と変わったのは、**掛けている相手の片方が $\\cos x$ になった**こと $1$ つ。$\\cos x$ という部品の傾きは、もう手に入っているだろうか。",
        },
        {
          layer: 3,
          text: "[積の微分] $(fg)' = f'g + fg'$ に、前の系列の $(\\cos x)' = -\\sin x$ を差し込みます。 $$y' = (2x+3)\\cos x + (x^2+3x+2)(-\\sin x)$$ $x=0$ では $3\\cdot1 + 2\\cdot0 = 3$。「それぞれ微分して掛ける」$f'g'$ だと $(2x+3)(-\\sin x)$ で $x=0$ では $0$ になり、別の値です。中心の問いへの最初の部分回答：**部品が三角関数に替わっても、積のつなぎ方はそのまま**。",
        },
      ],
      formulaPreview: "y' = (2x+3)cos x − (x²+3x+2)sin x。x = 0 で 3·1 − 2·0 = 3",
      figureMarker: "<<M3VD_PARTS_PRODUCT>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "次の関数の $x = 0$ における微分係数を求めましょう。\n\n$$y = (x^2 - 2x + 5)\\sin x$$",
      answer: 5,
      unit: "",
      unknownLabel: "$x=0$ における微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で使った組み立て方は、今度も使える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\cos x$ が $\\sin x$ になった**（と多項式の係数）こと。$\\sin x$ という部品の傾きは何だった？",
        },
        {
          layer: 3,
          text: "前題と同じく [積の微分] で $$y' = (2x-2)\\sin x + (x^2-2x+5)\\cos x$$ $x=0$ では $(-2)\\cdot0 + 5\\cdot1 = 5$。中心の問いへ：**差しかえる部品が $\\sin$ でも $\\cos$ でも、組み立て方は変わらない**。",
        },
      ],
      formulaPreview: "y' = (2x−2)sin x + (x²−2x+5)cos x。x = 0 で 0 + 5 = 5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは**商**です。次の関数の $x = 0$ における微分係数を求めましょう。答えは既約分数で答えましょう。\n\n$$y = \\frac{\\cos x}{x + 3}$$",
      answer: -1 / 9,
      answerDisplay: "−1/9",
      unit: "",
      unknownLabel: "$x=0$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は掛け算だった。今度は割り算。第3章で、割り算の組み立て方はどうだった？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**積が商になった**こと $1$ つ。第3章の [商の微分] で、分子の引き算はどちらからどちらを引いた？",
        },
        {
          layer: 3,
          text: "[商の微分] $\\left(\\dfrac fg\\right)' = \\dfrac{f'g - fg'}{g^2}$ に $f = \\cos x$、$g = x+3$ を入れると $$y' = \\frac{(-\\sin x)(x+3) - \\cos x\\cdot1}{(x+3)^2}$$ $x=0$ では $\\dfrac{0 - 1}{9} = -\\dfrac19$。分子の引き算の順を逆にすると $+\\dfrac19$ になり、符号が逆の値です。中心の問いへ：**商のつなぎ方も、部品を差しかえるだけ**。",
        },
      ],
      formulaPreview: "y' = {(−sin x)(x+3) − cos x}/(x+3)²。x = 0 で (0 − 1)/9 = −1/9",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "こんどは**合成**です。$\\sin$ の中に $1$ 次式が入った関数\n\n$$y = \\sin\\left(3x + \\frac{\\pi}{4}\\right)$$\n\nの、$x = 0$ における微分係数を求めましょう。",
      answer: (3 * Math.SQRT2) / 2,
      answerDisplay: "3√2/2",
      unit: "",
      unknownLabel: "$x=0$ における微分係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは $2$ つの関数を掛けたり割ったりした。今度は $\\sin$ の**中に**式が入っている。第3章で、式の中に式が入った関数はどう扱った？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**つなぎ方が「中に入れる」になった**こと $1$ つ。第3章で、式の中に式が入った関数の傾きは、どことどこから集めてきた？",
        },
        {
          layer: 3,
          text: "第3章の [合成関数の微分法] で、$t = 3x+\\dfrac\\pi4$ とおくと $y = \\sin t$。 $$\\frac{dy}{dx} = \\frac{dy}{dt}\\cdot\\frac{dt}{dx} = \\cos t \\cdot 3 = 3\\cos\\left(3x+\\frac\\pi4\\right)$$ $x=0$ では $3\\cos\\dfrac\\pi4 = \\dfrac{3\\sqrt2}{2}$。**かたまりの微分 $3$ を掛け忘れると $\\dfrac{\\sqrt2}{2}$** になり、別の値です。中心の問いへ：**部品が三角関数でも、合成は「外の傾き × 中の傾き」のまま**。",
        },
      ],
      formulaPreview: "y' = cos(3x+π/4)·3。x = 0 で 3cos(π/4) = 3√2/2",
      figureMarker: "<<M3VD_NEST_TRIG>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "次の関数の $x = \\dfrac{\\pi}{10}$ における微分係数を求めましょう。\n\n$$y = \\cos 5x$$",
      answer: -5,
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{10}$ における微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で最後に掛けた数は、今度もどこかから出てくる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**外側が $\\sin$ から $\\cos$ になった**（と中の式）こと。$\\cos$ の傾きには、何が付いてきた？",
        },
        {
          layer: 3,
          text: "前題と同じく $t = 5x$ とおくと $y=\\cos t$。 $$y' = -\\sin t\\cdot 5 = -5\\sin5x$$ $x = \\dfrac\\pi{10}$ では $5x = \\dfrac\\pi2$ なので $-5\\cdot1 = -5$。かたまりの微分を掛け忘れると $-1$ です。中心の問いへ：**外側の部品の符号も、中の傾きも、どちらも運ばれる**。",
        },
      ],
      formulaPreview: "y' = −sin5x·5。x = π/10 で −5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "こんどは**中と外が入れ替わります**。多項式（$4$ 乗）の中に $\\sin x$ が入った関数\n\n$$y = \\sin^4 x = (\\sin x)^4$$\n\nの、$x = \\dfrac{\\pi}{3}$ における微分係数を求めましょう。",
      answer: (3 * Math.sqrt(3)) / 4,
      answerDisplay: "3√3/4",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{3}$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。step4 は「$\\sin$ の中に $1$ 次式」だった。今度は「$4$ 乗の中に $\\sin x$」。何が入れ替わった？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、**外側と内側が入れ替わった**こと $1$ つ。今度のかたまりは何で、外側は何の関数？",
        },
        {
          layer: 3,
          text: "今度は $t = \\sin x$ がかたまりで、外側は $y = t^4$。 $$y' = 4t^3\\cdot\\frac{dt}{dx} = 4\\sin^3x\\cos x$$ $x=\\dfrac\\pi3$ では $4\\cdot\\left(\\dfrac{\\sqrt3}2\\right)^3\\cdot\\dfrac12 = 4\\cdot\\dfrac{3\\sqrt3}{8}\\cdot\\dfrac12 = \\dfrac{3\\sqrt3}4$。中心の問いへ：**外が多項式で中が三角関数でも、合成の組み立て方は同じ**。",
        },
      ],
      formulaPreview: "y' = 4sin³x·cos x。x = π/3 で 4·(3√3/8)·(1/2) = 3√3/4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "こんどは向きが逆です。$a$ を定数とします。\n\n$$y = \\sin ax + x$$\n\nの $x = 0$ における微分係数が $7$ になるとき、$a$ の値を求めましょう。",
      answer: 6,
      unit: "",
      unknownLabel: "$a$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。step4 は式から傾きを出した。今度は**傾きが先に**分かっていて、式の中の数を求める。",
        },
        {
          layer: 2,
          text: "step4 と変わったのは、**問われているのが傾きから中の係数に入れ替わった**こと $1$ つ。step4 で最後に掛けた数は、式のどこから来ていた？",
        },
        {
          layer: 3,
          text: "step4 と同じく、$\\sin ax$ の傾きは $a\\cos ax$。$x$ の傾きは $1$。よって $y' = a\\cos ax + 1$ で、$x=0$ では $a+1$。これが $7$ なので $a = 6$。中心の問いへ：**合成で掛け算に出てくる数が中の係数だと分かれば、傾きから係数を逆にたどれる**。",
        },
      ],
      formulaPreview: "y' = a cos ax + 1。x = 0 で a + 1 = 7 → a = 6",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "次の関数の $x = \\dfrac{\\pi}{6}$ における微分係数を求めましょう。\n\n$$y = \\sqrt{1 + \\sin x}$$",
      answer: Math.SQRT2 / 4,
      answerDisplay: "√2/4",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{6}$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。step6 は「$4$ 乗の中に三角関数」だった。今度は外側が別のものになった。",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**外側が $4$ 乗から根号になった**こと $1$ つ。根号は、第3章で何乗として扱った？",
        },
        {
          layer: 3,
          text: "$t = 1+\\sin x$ とおくと $y = t^{\\frac12}$。 $$y' = \\frac12 t^{-\\frac12}\\cdot\\cos x = \\frac{\\cos x}{2\\sqrt{1+\\sin x}}$$ $x=\\dfrac\\pi6$ では $\\dfrac{\\ \\dfrac{\\sqrt3}{2}\\ }{2\\sqrt{\\dfrac32}} = \\dfrac{\\sqrt3}{2}\\cdot\\dfrac{1}{\\sqrt6} = \\dfrac{1}{2\\sqrt2} = \\dfrac{\\sqrt2}4$。中心の問いへ：**外側が根号でも、第3章の $(x^\\alpha)'$ と合成の組み立てがそのまま使える**。",
        },
      ],
      formulaPreview: "y' = cos x/{2√(1+sin x)}。x = π/6 で (√3/2)/(2√(3/2)) = √2/4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "次の関数の $x = \\dfrac{\\pi}{6}$ における微分係数を求めましょう。答えは既約分数で答えましょう。\n\n$$y = (\\sin 2x)^3$$",
      answer: 9 / 4,
      answerDisplay: "9/4",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{6}$ における微分係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。step6 は「多項式の中に三角関数」の $2$ 重だった。今度は、その三角関数の中にも、さらに式が入っている。",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**入れ子が $2$ 重から $3$ 重になった**こと $1$ つ。いちばん外・まん中・いちばん内側は、それぞれ何の関数？",
        },
        {
          layer: 3,
          text: "外から $y = u^3$、$u = \\sin s$、$s = 2x$ の $3$ 重（3 次関数・三角関数・1 次関数）。 $$y' = 3u^2\\cdot\\cos s\\cdot2 = 6\\sin^2 2x\\cos2x$$ $x=\\dfrac\\pi6$ では $2x = \\dfrac\\pi3$ なので $6\\cdot\\dfrac34\\cdot\\dfrac12 = \\dfrac94$。第3章の $3$ 重の入れ子は多項式どうしでしたが、**種類の違う関数が混ざっても、外から順に傾きを掛けていけばよい**。中心の問いへ：**つなぎ方は、部品の種類を選ばない**。",
        },
      ],
      formulaPreview: "y' = 3sin²2x·cos2x·2。x = π/6 で 6·(3/4)·(1/2) = 9/4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "次の関数の $x = \\dfrac{\\pi}{4}$ における微分係数を求めましょう。\n\n$$y = \\frac{\\sin 2x}{1 + \\cos 2x}$$",
      answer: 2,
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{4}$ における微分係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。step3 も商だった。今度は分子にも分母にも、三角関数の中に式が入っている。公式を押す前に、式そのものをよく見てみよう。",
        },
        {
          layer: 2,
          text: "step3 と変わったのは、**分子・分母の両方が合成になった**こと $1$ つ。数Ⅱ・B で、角を $2$ 倍した三角関数について何を学んだか思い出してみよう。",
        },
        {
          layer: 3,
          text: "**道 1（公式で押す）**：[商の微分] と合成で $$y' = \\frac{2\\cos2x(1+\\cos2x) - \\sin2x\\cdot(-2\\sin2x)}{(1+\\cos2x)^2} = \\frac{2\\cos2x + 2(\\cos^22x+\\sin^22x)}{(1+\\cos2x)^2} = \\frac{2}{1+\\cos2x}$$ $x=\\dfrac\\pi4$ では $\\cos\\dfrac\\pi2 = 0$ なので $2$。**道 2（先に畳む）**：[2倍角の公式] で $\\sin2x = 2\\sin x\\cos x$、$1+\\cos2x = 2\\cos^2x$ なので $y = \\dfrac{2\\sin x\\cos x}{2\\cos^2x} = \\tan x$。$(\\tan x)' = \\dfrac1{\\cos^2x}$ で、$x=\\dfrac\\pi4$ では $\\dfrac{1}{1/2} = 2$。**同じ $2$ に着きました**。中心の問いに戻ると：**つなぎ方はそのまま効く。けれど、公式を押す前に式を見ると、つなぐまでもなく畳めることがある**。",
        },
      ],
      formulaPreview: "道1：y' = 2/(1+cos2x) → 2。道2：y = tan x、y' = 1/cos²x → 2",
    },
  ],
  derivation: `**中心の問い** ｜ 新しい相手（$\\sin$・$\\cos$・$\\tan$）が来ても、第3章で手に入れた**つなぎ方**（積・商・合成）は、そのまま効く？

────────

## 部品とつなぎ方は、別々に手に入る

微分の計算は、**部品**と**つなぎ方**でできている。部品は「$x^\\alpha$ の傾き」「$\\sin x$ の傾き」のような、ひとつの関数の導関数。つなぎ方は、第3章で作った [積の微分]・[商の微分]・[合成関数の微分法]。

前の系列で、部品に $(\\sin x)'=\\cos x$、$(\\cos x)' = -\\sin x$、$(\\tan x)' = \\dfrac{1}{\\cos^2x}$ が加わった。**つなぎ方は、部品が何であるかを問わない**。だから新しい部品を差しこむだけで、三角関数を含む関数がすべて微分できる。

## ここが胚細胞：部品が増えても、組み立て方は変わらない

- 積：$(fg)' = f'g + fg'$（step1・2）
- 商：$\\left(\\dfrac fg\\right)' = \\dfrac{f'g-fg'}{g^2}$（step3）
- 合成：外の傾き × 中の傾き（step4〜9）

合成では、**どちらが外でどちらが中かを見きわめる**ことが仕事になる。$\\sin(3x+\\cdots)$ は外が $\\sin$・中が $1$ 次式、$\\sin^4x$ は外が $4$ 乗・中が $\\sin x$（step6）。$3$ 重でも、外から順に傾きを掛けていけばよい（step9）。

## 公式を押す前に、式を見る

山場（step10）の $\\dfrac{\\sin2x}{1+\\cos2x}$ は、商と合成を組み合わせれば（分母が $0$ でないところで）微分できる。けれど [2倍角の公式] で書き直すと $\\tan x$ に畳めて、微分は一瞬で終わる。**$2$ 本の道が同じ値に着く**ことが、互いの検算になる。

## Step の道筋

- **step1〜2**：積——多項式と三角関数
- **step3**：商——分子の引き算の順に注意
- **step4〜5**：合成——三角関数の中に $1$ 次式（中の傾きを掛け忘れない）
- **step6**：中と外が入れ替わる——多項式の中に三角関数
- **step7**：傾きから中の係数を逆にたどる
- **step8〜9**：外が根号／$3$ 重の入れ子
- **step10（山場）**：公式で押す道と、先に畳む道

────────

**もっと深く**

**忘れても導ける。** 合成で「何を掛けるか」に迷ったら、$\\dfrac{dy}{dx} = \\dfrac{dy}{dt}\\cdot\\dfrac{dt}{dx}$ と分数のように書いてみる。かたまりに $t$ と名前を付ければ、外側と内側の傾きが自然に分かれる。積の公式を忘れたら、長方形のたてと横が同時に少し伸びるとき、面積の増え方が「たての増え方 × 横」と「たて × 横の増え方」の $2$ か所から来ることを思い出せばよい。

**よくある取り違え。** ①**かたまりの微分を掛け忘れる**：$(\\sin3x)' = \\cos3x$ としてしまう。$x=0$ 付近でグラフを描けば、$y=\\sin3x$ は $y=\\sin x$ の $3$ 倍の速さで立ち上がるので、傾きも $3$ 倍のはずだと分かる。②**積を「それぞれ微分して掛ける」**：$(fg)'=f'g'$ は誤り（step1 で $0$ になってしまう）。③**商の分子の順を逆にする**：符号だけが変わるので、答えの符号で気づける（step3）。

**この先の景色。** 次の系列からは、指数関数と対数関数という新しい部品が加わる。そのときも、つなぎ方は同じである。第5章では、三角関数を含む関数の最大・最小やグラフの山と谷を、ここで作った導関数から読む。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章の練習問題の構成（三角関数を含む積・商、三角関数を含む合成、3 重の入れ子）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

効く。第3章のつなぎ方は、**部品が何であるかを問わなかった**。$\\sin$・$\\cos$・$\\tan$ という新しい部品を差しこむだけで、積も商も合成も、そのまま組み立てられた。

そして山場で見たとおり、**部品が微分できるところでは、つなぎ方がいつでも使える。だからこそ、使う前に式を見る**意味がある。畳めるものは畳んでから微分する——公式が消してくれるのは「解けないこと」ではなく、「定義まで戻る手間」である。`,
};

/** M3VD5: 対数関数の微分——ミッシングリンクと e。★三段★
 *  段1＝step1〜3（x^α の微分の表で、微分して −1 次になる式が見つからない＝穴）
 *  段2＝step4〜6（log_a の差分商を対数法則で 1 つの log にし、(1+t)^(1/t) の綱引きを正確な分数で見る）
 *  段3＝step7〜10（(log_a x)' = log_a e / x を使う）。山場は step9＝底を e^k と書いた対数の、定義の極限そのもの。
 *  ★(1+t)^(1/t) が収束することは証明しない（原典 p.133 も「事実だけ押さえて」）。derivation で「預ける」と明言する（Q8）。
 *  step7 の底の比は、底の変換 log_b x = (1/m) log_a x からも出る（Round 1 F1 の同型）＝底の変換の適用として置く。 */
export const M3VD_LOG_SERIES: LearnerSeries = {
  id: "math3_vd_log_01",
  title: "対数関数の微分——ミッシングリンクと e",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — $x^\\alpha$ を微分すると次数が $1$ つ下がる。ところが、微分して $-1$ 次式になる式だけが見つからない。その穴を埋めるのは、別の世界の関数——対数関数だった。",
  patternId: "M3VD5",
  unit: "math_3",
  revelationLabel:
    "**微分して $\\dfrac1x$ になる $x^\\alpha$ は無い**。肩を $0$ にすると係数も $0$ になって、式ごと消えてしまうから。$x^\\alpha$ の規則にあいた、たった $1$ つの穴",
  drivingQuestion:
    "「微分して $-1$ 次になる式」は、どこにある？——$x^\\alpha$ の規則にあいた穴を、なぜ**対数**が埋める？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "第3章で、$(x^\\alpha)' = \\alpha x^{\\alpha-1}$（$\\alpha$ は実数）を手に入れました。\n\n微分すると $-2x^{-3}$ になる $x^\\alpha$ の、肩の数 $\\alpha$ を求めましょう。",
      answer: -2,
      unit: "",
      unknownLabel: "$\\alpha$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "[微分する] と、肩の数はどう動いた？ 係数には何が出てきた？ 微分した結果から、もとの式を逆にたどれるだろうか。",
        },
        {
          layer: 2,
          text: "微分した結果の肩は $-3$、係数は $-2$。$x^\\alpha$ を微分すると、肩は $\\alpha$ からいくつになり、係数には何が出てくる？",
        },
        {
          layer: 3,
          text: "$(x^\\alpha)' = \\alpha x^{\\alpha-1}$ なので、肩 $\\alpha - 1 = -3$ から $\\alpha = -2$。係数も $\\alpha = -2$ で、$-2x^{-3}$ とぴったり合います。中心の問いへの最初の部分回答：**微分した結果から、もとの $x^\\alpha$ を逆にたどれる**——肩が $1$ つ上がり、係数で割り戻せばよい。",
        },
      ],
      formulaPreview: "α − 1 = −3 → α = −2（係数も −2 で一致）",
      figureMarker: "<<M3VD_POWER_ROW>>",
    },
    {
      id: "step2",
      position: 2,
      questionText: "微分すると $-4x^{-5}$ になる $x^\\alpha$ の、肩の数 $\\alpha$ を求めましょう。",
      answer: -4,
      unit: "",
      unknownLabel: "$\\alpha$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で逆にたどった道は、今度も通るだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**微分した結果の肩の数**だけ。前題では、結果の肩からもとの肩をどうやって出した？",
        },
        {
          layer: 3,
          text: "前題と同じく、$\\alpha-1 = -5$ から $\\alpha = -4$。係数も $-4$ で一致。$-3$ 次・$-5$ 次……と、**負の次数の結果も、次々にもとの式が見つかります**。中心の問いへ：**表の空欄は、肩を $1$ つ上げれば埋まっていく**——いまのところは。",
        },
      ],
      formulaPreview: "α − 1 = −5 → α = −4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "では、微分すると $\\dfrac1x = x^{-1}$ になるような $c x^\\alpha$（$c$・$\\alpha$ は定数）は**ありますか**。\n\nあるなら $1$、ないなら $0$ と答えましょう。",
      answer: 0,
      unit: "",
      unknownLabel: "あるなら $1$、ないなら $0$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題まではすんなり逆にたどれた。今度も同じ道で、もとの式が見つかるだろうか？ 最後まで進めてみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**微分した結果の肩が $-1$ になった**こと $1$ つ。前題と同じ道でもとの肩を出したとき、そのもとの式を微分すると、係数には何が出てくる？",
        },
        {
          layer: 3,
          text: "前題と同じく肩を $1$ つ上げると $\\alpha = 0$。ところが $(c x^0)' = c\\cdot0\\cdot x^{-1} = 0$——**係数に肩の $0$ が掛かって、式ごと消えてしまいます**。$c$ をどう選んでも $\\dfrac1x$ にはなりません。答えは $0$。$x^3, x^2, x, 1, x^{-1}, \\dots$ を微分した結果を並べると、$2$ 次・$1$ 次・$0$ 次・（$0$）・$-2$ 次……と、**$-1$ 次だけが抜け落ちる**。中心の問いへの答えの芯：**$x^\\alpha$ の規則には、たった $1$ つ穴がある**。",
        },
      ],
      formulaPreview: "α − 1 = −1 → α = 0。(c·x⁰)' = 0 ≠ 1/x。微分して −1 次になる x^α は無い",
      figureMarker: "<<M3VD_MISSING_TARGET>>",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "穴を埋める候補として、**対数関数**を定義から微分してみます。$f(x) = \\log_2 x$ の差分商の分子は\n\n$$\\log_2(x+h) - \\log_2 x$$\n\nです。[対数法則] を使ってこれを $1$ つの $\\log_2$ にまとめたとき、$x = 5$、$h = 7$ での**真数**（$\\log_2$ の中身）の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 12 / 5,
      answerDisplay: "12/5",
      unit: "",
      unknownLabel: "真数の値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $x^\\alpha$ の中に穴を探した。今度は、まったく別の関数を相手にする。**差**の形は前にも出てきた。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**相手が $x^\\alpha$ から対数関数になった**こと $1$ つ。数Ⅱ・B で、$\\log$ どうしの**差**はどうまとめられた？",
        },
        {
          layer: 3,
          text: "[対数法則] $\\log_a M - \\log_a N = \\log_a\\dfrac MN$ で $$\\log_2(x+h)-\\log_2 x = \\log_2\\frac{x+h}{x} = \\log_2\\left(1+\\frac hx\\right)$$ $x=5$、$h=7$ では真数は $\\dfrac{12}{5}$。**差が $1$ つの $\\log$ にまとまり、中に $1+\\dfrac hx$ という形が現れた**——$\\sin$ のときに和積の公式が差を積にしたのと同じ役目を、ここでは対数法則が果たしています。中心の問いへ：**対数の差分商は、$1+(\\text{小さい数})$ の形に集まる**。",
        },
      ],
      formulaPreview: "log₂(x+h) − log₂x = log₂{(x+h)/x} = log₂(1 + h/x)。x=5, h=7 で 12/5",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "前題の差分商を $h$ で割ると、$t = \\dfrac hx$ とおいて\n\n$$\\frac{\\log_2(1+t)}{xt} = \\frac{1}{x}\\log_2(1+t)^{\\frac1t}$$\n\nと書けます（対数法則で $\\dfrac1t$ を肩へ）。$h \\to 0$ のとき $t\\to0$ で、$\\log$ の中に $(1+t)^{\\frac1t}$ が現れます。\n\n$t = \\dfrac13$ のときの $(1+t)^{\\frac1t}$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 64 / 27,
      answerDisplay: "64/27",
      unit: "",
      unknownLabel: "$t=\\dfrac13$ のときの $(1+t)^{\\frac1t}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題で「$1$ ＋ 小さい数」の形が出てきた。今度は、それに肩が乗った。$t$ が小さくなると、中身は $1$ に近づき、肩は大きくなる——**この綱引きはどちらが勝つ**だろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$1+t$ に $\\dfrac1t$ 乗が乗った**こと $1$ つ。「$1$ は何回掛けても $1$」だから答えは $1$……と言ってよいだろうか？ 実際の数で確かめてみよう。",
        },
        {
          layer: 3,
          text: "$t = \\dfrac13$ なら $1+t = \\dfrac43$、$\\dfrac1t = 3$ なので $\\left(\\dfrac43\\right)^3 = \\dfrac{64}{27}$（およそ $2.37$）。**$1$ ではありません**。$1+t$ は「$1$ に近づこう」とし、$\\dfrac1t$ はそれを何回も掛けて「大きくしよう」とする。**$1^\\infty$ は、$2$ つの力が綱引きをしている [不定形]** で、$1$ と決めつけてはいけません。中心の問いへ：**対数の微分の運命は、この綱引きの行き先が握っている**。",
        },
      ],
      formulaPreview: "(1 + 1/3)³ = (4/3)³ = 64/27（およそ 2.37）。1^∞ は 1 ではない",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "もっと $t$ を小さくします。$t = \\dfrac14$ のときの $(1+t)^{\\frac1t}$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 625 / 256,
      answerDisplay: "625/256",
      unit: "",
      unknownLabel: "$t=\\dfrac14$ のときの $(1+t)^{\\frac1t}$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$t$ が小さくなった。値は増える？ 減る？ どこまでも大きくなりそうだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$t$ が $\\dfrac13$ から $\\dfrac14$ になった**こと $1$ つ。前題の値（およそ $2.37$）と比べて、今度はどうなるだろう。",
        },
        {
          layer: 3,
          text: "$\\left(\\dfrac54\\right)^4 = \\dfrac{625}{256}$（およそ $2.44$）。前題より少し増えましたが、増え方は小さくなっています。$t$ をさらに小さくすると $2.59\\cdots$（$t=0.1$）・$2.70\\cdots$（$t=0.01$）・$2.716\\cdots$（$t=0.001$）と、**$2$ の後半で止まりそうに見える**。この行き先の数を **$e$**（[ネイピア数]）と書き、$e = 2.71828\\cdots$ です。**この数列が本当にある数に近づくこと（収束すること）の証明は、高校では扱いません**——ここでは数の並びが止まりそうだと見るところまでにして、その事実を預かります。中心の問いへ：**綱引きの行き先に、謎の定数 $e$ が顔を出した**。",
        },
      ],
      formulaPreview: "(5/4)⁴ = 625/256（およそ 2.44）。t → 0 で 2.718…（= e）に近づいていく",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "前題までで、$(1+t)^{\\frac1t}$ の $t\\to0$ の行き先を $e$ と書くことにしました。すると前題の式から\n\n$$(\\log_a x)' = \\frac{\\log_a e}{x}$$\n\nが得られます。これを使って、同じ $x$ での $(\\log_2 x)'$ と $(\\log_8 x)'$ の比\n\n$$\\frac{(\\log_2 x)'}{(\\log_8 x)'}$$\n\nの値を求めましょう。",
      answer: 3,
      unit: "",
      unknownLabel: "$\\dfrac{(\\log_2 x)'}{(\\log_8 x)'}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは $e$ という数を探していた。今度は、見つけた $e$ を使って微分の式を比べる。比をとると、何が消えるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$e$ を探す段階から、$e$ を使う段階に移った**こと $1$ つ。$2$ つの式の比をとると、$x$ も $e$ の小数も消えて、底どうしの関係だけが残らないだろうか。",
        },
        {
          layer: 3,
          text: "比は $\\dfrac{\\log_2 e}{\\log_8 e}$。数Ⅱ・B の [底の変換公式] で $\\log_8 e = \\dfrac{\\log_2 e}{\\log_2 8} = \\dfrac{\\log_2 e}{3}$ なので、比は $3$。**$e$ の値（$2.718\\cdots$）を知らなくても、比は整数で決まります**。**2 本目の道**：先に $\\log_8 x = \\dfrac{\\log_2x}{3}$ と底を変換してから微分しても、同じ $3$ に着きます。中心の問いへ：**対数の微分には、底によって $\\log_a e$ という「余分な係数」が付く**。",
        },
      ],
      formulaPreview: "(log₂x)'/(log₈x)' = log₂e / log₈e = log₂8 = 3",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "こんどは向きが逆です。$b$ を $1$ より大きい定数とします。同じ $x$ で\n\n$$\\frac{(\\log_2 x)'}{(\\log_b x)'} = 5$$\n\nとなるとき、$b$ の値を求めましょう。",
      answer: 32,
      unit: "",
      unknownLabel: "$b$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は底から比を出した。今度は比が先に分かっている。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**問われているのが比から底に入れ替わった**こと $1$ つ。前題の比 $3$ は、底 $8$ と底 $2$ のどんな関係から出てきた？",
        },
        {
          layer: 3,
          text: "前題で、比は $\\log_2 8 = 3$、つまり「$8$ は $2$ の何乗か」でした。今度は比が $5$ なので $\\log_2 b = 5$、$b = 2^5 = 32$。中心の問いへ：**底どうしの比べっこは、$e$ の値によらず、底の関係だけで決まる**。",
        },
      ],
      formulaPreview: "比 = log₂b = 5 → b = 2⁵ = 32",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "底を $e^3$（$e$ の $3$ 乗）とする対数関数 $\\log_{e^3} x$ を考えます。その微分の核心にあたる極限\n\n$$\\lim_{t \\to 0} \\frac{\\log_{e^3}(1+t)}{t}$$\n\nの値を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 3,
      answerDisplay: "1/3",
      unit: "",
      unknownLabel: "$\\displaystyle\\lim_{t \\to 0} \\frac{\\log_{e^3}(1+t)}{t}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "step5 と比べてみよう。step5 では、この形の中から「綱引き」の式を取り出した。今度は底が $e$ の仲間になっている。取り出したものの行き先は、もう名前がついていた。",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、**底が $e^3$ になった**こと $1$ つ。底が $e$ の仲間になると、取り出した式の行き先と底との関係は、どう見えてくる？",
        },
        {
          layer: 3,
          text: "step5 と同じく $\\dfrac{\\log_{e^3}(1+t)}{t} = \\log_{e^3}(1+t)^{\\frac1t}$。$t\\to0$ で $(1+t)^{\\frac1t}\\to e$ なので、行き先は $\\log_{e^3} e$。$e = (e^3)^{\\frac13}$ だから $\\log_{e^3}e = \\dfrac13$。**$e$ の定義が、係数そのものを決めた**。中心の問いへ：**底を $e$ の仲間にすると、余分な係数 $\\log_a e$ が小数でなく、きれいな数になる**。",
        },
      ],
      formulaPreview: "log_{e³}(1+t)/t = log_{e³}(1+t)^{1/t} → log_{e³}e = 1/3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "底を $e^2$ とする対数関数 $y = \\log_{e^2} x$ の、$x = 5$ における微分係数を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.1,
      answerDisplay: "1/10",
      unit: "",
      unknownLabel: "$x=5$ における微分係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は極限の核心だけを取り出した。今度は、微分係数そのもの。前題の値は、微分の式のどこに入る？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**底が $e^2$ になり、極限の核心から微分係数そのものを問う**ことになった。step7 の式の中で、底によって変わるのはどの部分だった？",
        },
        {
          layer: 3,
          text: "step7 の式で $a = e^2$ とすると、分子は $\\log_{e^2}e = \\dfrac12$（前題と同じ考え方）。よって $(\\log_{e^2}x)' = \\dfrac{1}{2x}$、$x=5$ では $\\dfrac1{10}$。中心の問いに戻ると：**$\\dfrac1x$ の穴を埋めるのは対数関数で、その係数は底が $e$ に近いほど単純になる**——では、底を $e$ そのものにしたら？ それが次の系列の話です。",
        },
      ],
      formulaPreview: "(log_{e²}x)' = log_{e²}e / x = 1/(2x)。x = 5 で 1/10",
    },
  ],
  derivation: `**中心の問い** ｜ 「微分して $-1$ 次になる式」は、どこにある？——$x^\\alpha$ の規則にあいた穴を、なぜ**対数**が埋める？

────────

## 規則にあいた、たった 1 つの穴

$x^3, x^2, x, 1, x^{-1}, x^{-2}, \\dots$ を [微分する] と $3x^2, 2x, 1, 0, -x^{-2}, -2x^{-3}, \\dots$。次数は $2, 1, 0,\\ (\\text{消える}),\\ -2, -3, \\dots$ と下がっていく。**$-1$ 次だけが、どこにも出てこない**。

理由は $(x^\\alpha)' = \\alpha x^{\\alpha-1}$ の係数にある。結果を $-1$ 次にするには $\\alpha = 0$ が要るが、そのとき係数 $\\alpha$ も $0$ になって、式ごと消えてしまう（step3）。**規則そのものが、自分の穴を作っている**。

## 別の世界から来た候補——対数関数

対数関数を定義から微分すると、差分商の分子は [対数法則] で $1$ つにまとまる（step4）。

$$\\frac{\\log_a(x+h)-\\log_a x}{h} = \\frac1x\\log_a\\left(1+\\frac hx\\right)^{\\frac xh}$$

$t=\\dfrac hx$ とおけば、中に $(1+t)^{\\frac1t}$ が現れる。**$\\sin$ のときに和積の公式が差を積にしたのと同じ役目を、ここでは対数法則が果たしている。**

## ここが胚細胞：1^∞ の綱引きの行き先に、定数が 1 つ現れる

$(1+t)^{\\frac1t}$ は、$t\\to0$ で**中身は $1$ に近づき、肩は大きくなる**。「$1$ は何回掛けても $1$」とはいかない——$1^\\infty$ は [不定形] である。実際に計算すると $\\dfrac{64}{27}\\approx2.37$、$\\dfrac{625}{256}\\approx2.44$（step5・6）と増えるが、どこまでも大きくなるわけでもなく、$2.718\\cdots$ あたりで止まりそうに見える。この行き先を **$e$**（[ネイピア数]）と書く。すると

$$(\\log_a x)' = \\frac{\\log_a e}{x}$$

**$\\dfrac1x$ が現れた**——穴を埋めたのは、対数関数だった。ただし、底によって $\\log_a e$ という係数が付く。

## Step の道筋

- **step1〜3（段1）**：$x^\\alpha$ の微分を逆にたどると、$-1$ 次だけが見つからない
- **step4〜6（段2）**：対数の差分商を $1$ つの $\\log$ にし、$1^\\infty$ の綱引きを正確な分数で見る
- **step7〜8（段3）**：底どうしの比は、$e$ の値によらず整数で決まる
- **step9（山場）**：底を $e^3$ にすると、$e$ の定義が係数そのものを決める
- **step10**：底を $e^2$ にした対数の微分係数

────────

**もっと深く**

**ここで預けたもの（正直に）。** $(1+t)^{\\frac1t}$ が $t\\to0$ で**ある $1$ つの数に近づくこと**は、この系列では証明していない。数の並びを見て「止まりそうだ」と確かめただけである（原典も「事実だけを押さえておけば十分」としている）。$e$ の存在を**別の見方で納得する道**は、系列8 で扱う——「$y=a^x$ の $(0,1)$ での接線の傾きがちょうど $1$ になる底」として、$2$ と $4$ のあいだにあることを、割線ではさんで見る。

**$1^\\infty$ は $1$ ではない。** 「$1$ は何回掛けても $1$」は、中身がちょうど $1$ のときの話である。中身が $1$ より少しでも大きければ、たくさん掛けると大きくなりうる。$t = \\dfrac13$ で確かめたとおり、$\\left(\\dfrac43\\right)^3$ は $2$ を超える。数で確かめれば、$1$ と決めつけた誤りは見える。

**忘れても導ける。** $(\\log_a x)'$ の係数に迷ったら、[底の変換公式] で底をそろえればよい。$\\log_8 x = \\dfrac{\\log_2x}{3}$ のように書けば、$\\log_8$ の微分は $\\log_2$ の微分の $\\dfrac13$ 倍（step7 の $2$ 本目の道）。

**この先の景色。** 次の系列で、底を $e$ そのものにすると係数 $\\log_e e = 1$ が消えて $(\\log x)' = \\dfrac1x$ になる。第6章の積分では、「微分して $\\dfrac1x$ になる関数」＝ $\\dfrac1x$ の原始関数として、この穴埋めがもう一度主役になる。大学では、$1+\\dfrac12+\\dfrac13+\\cdots$ の増え方が $\\log$ で測れることにつながる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章のコラム「微分におけるミッシングリンク」と節「指数関数・対数関数の微分」の構成（対数関数の微分から入り、$(1+t)^{1/t}$ の不定形と $e$ の定義に至る順序）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

微分して $-1$ 次になる $x^\\alpha$ は無い。肩を $0$ にすると係数も $0$ になるからで、**規則が自分で穴を作っていた**。

その穴を埋めたのは、$x^\\alpha$ とはまったく別に学んだ**対数関数**だった。対数法則が差分商を $1$ つの $\\log$ にまとめ、中から $1^\\infty$ の綱引きが現れ、その行き先として定数 $e$ が顔を出した。$(\\log_a x)' = \\dfrac{\\log_a e}{x}$——穴にぴったりはまる $\\dfrac1x$ と、底が決める係数 $\\log_a e$。**底を選べば、その係数を消せる**ことが、次の系列の入口になる。`,
};

/** M3VD6: 自然対数——底を選ぶ。
 *  系列5 の (log_a x)' = log_a e / x で、底を e にすると係数が 1 になり (log x)' = 1/x。
 *  step3・4 は「導関数が 0 になる点の log x」（Round 1 F3・I1：指定点での評価では e が残る／分母の微分が消える）。
 *  ただし step4 の零点は、商の分子の引き算の順を逆にしても変わらない（符号が全体で反転するだけ）ので、
 *  「分子の順」の誤りは検出しない。分母の微分を落とす誤りは、零点が無くなるので検出する。
 *  質的変化 step5 は合成 log(多項式)。山場 step10 は log(x+√(x²+c))（原典と別の c）が単純な導関数に畳まれる。 */
export const M3VD_NATLOG_SERIES: LearnerSeries = {
  id: "math3_vd_natlog_01",
  title: "自然対数——底を選ぶ",
  subtitle:
    "数Ⅲ・C いろいろな関数の微分より — 対数の微分には、底が決める係数が付いていた。底を $e$ に選ぶと、その係数がちょうど $1$ になって $(\\log x)' = \\dfrac1x$。$10$ 問で、この単純な形を道具にする。",
  patternId: "M3VD6",
  unit: "math_3",
  revelationLabel:
    "**$\\log$ の中に式が入ると、微分は「中の式の傾き ÷ 中の式」になる**。底を $e$ に選んだおかげで、余分な係数はどこにも付かない",
  drivingQuestion:
    "人間には $2$ や $10$ のほうが自然に見えるのに、なぜ数学は**底 $e$** の対数を「**自然**」と呼ぶ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "前の系列で $(\\log_a x)' = \\dfrac{\\log_a e}{x}$ でした。底を $e$ に選ぶと分子は $\\log_e e = 1$ になり、\n\n$$(\\log_e x)' = \\frac1x$$\n\nこの底 $e$ の対数を [自然対数] といい、底を省いて $\\log x$ と書きます。$y = \\log x$ の、$x = 8$ における微分係数を求めましょう。",
      answer: 0.125,
      answerDisplay: "1/8",
      unit: "",
      unknownLabel: "$x=8$ における微分係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "前の系列の式で、底が $e$ のとき、分子の係数はいくつになる？ その係数が消えたとき、微分はどんな形になる？",
        },
        {
          layer: 2,
          text: "底を $e$ にしたことで、前の系列の式の**分子**が変わった。分子が $1$ なら、残るのは何？",
        },
        {
          layer: 3,
          text: "$(\\log x)' = \\dfrac{1}{x}$ なので、$x = 8$ では $\\dfrac18$。底が $2$ なら $\\dfrac{\\log_2 e}{8}$（$\\log_2e = 1.4426\\cdots$）という中途半端な数が付くところでした。中心の問いへの最初の部分回答：**底を $e$ に選ぶと、余分な係数がちょうど消える**。",
        },
      ],
      formulaPreview: "(log x)' = 1/x。x = 8 で 1/8",
      figureMarker: "<<M3VD_LOG_SLOPE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$y = \\log x$ の、$x = \\dfrac32$ における微分係数を求めましょう。答えは既約分数で答えましょう。",
      answer: 2 / 3,
      answerDisplay: "2/3",
      unit: "",
      unknownLabel: "$x=\\dfrac32$ における微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**微分係数を求める点**だけ。前題で使った形は、点が分数でもそのまま使える？",
        },
        {
          layer: 3,
          text: "前題と同じく $(\\log x)' = \\dfrac1x$ なので、$x=\\dfrac32$ では $\\dfrac{1}{\\ \\dfrac32\\ } = \\dfrac23$。**$x$ が小さいほど傾きは急で、大きいほど緩やか**——$y=\\log x$ のグラフが、右へ行くほど寝ていく形であることと合っています。中心の問いへ：**$\\dfrac1x$ という単純な形が、グラフの傾きの地図になる**。",
        },
      ],
      formulaPreview: "(log x)' = 1/x。x = 3/2 で 2/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "**積**を微分します。$y = x^3\\log x$（$x>0$）の導関数が $0$ になる点を $x = p$ とします。$\\log p$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: -1 / 3,
      answerDisplay: "−1/3",
      unit: "",
      unknownLabel: "$\\log p$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $\\log x$ そのものだった。今度は掛け算になっている。答えるものも、傾きの値から「傾きが $0$ になる点」に変わった。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\log x$ に $x^3$ が掛かった**こと。第3章の [積の微分] で、$2$ つの項は何と何だった？ そのうえで、「$=0$」の式はどこまで簡単にできる？",
        },
        {
          layer: 3,
          text: "[積の微分] で $$y' = 3x^2\\log x + x^3\\cdot\\frac1x = x^2(3\\log x + 1)$$ $x>0$ では $x^2 \\ne 0$ なので、$y'=0$ は $3\\log x + 1 = 0$、つまり $\\log p = -\\dfrac13$。積の片方の項（$x^3\\cdot\\dfrac1x$）を落とすと $3\\log x = 0$ で $\\log p = 0$ になり、別の値です。中心の問いへ：**$\\log x$ の傾き $\\dfrac1x$ は、掛かっている $x$ の累乗と打ち消し合って、式を単純にする**。",
        },
      ],
      formulaPreview: "y' = 3x² log x + x² = x²(3 log x + 1) = 0 → log p = −1/3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "こんどは**商**です。$y = \\dfrac{\\log x}{x^5}$（$x>0$）の導関数が $0$ になる点を $x = q$ とします。$\\log q$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.2,
      answerDisplay: "1/5",
      unit: "",
      unknownLabel: "$\\log q$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は掛け算、今度は割り算。答えるものは同じ「傾きが $0$ になる点」。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**積が商になった**こと $1$ つ。前題で「$=0$」の式を簡単にできたのは、何と何が打ち消し合ったからだった？",
        },
        {
          layer: 3,
          text: "[商の微分] で $$y' = \\frac{\\dfrac1x\\cdot x^5 - \\log x\\cdot5x^4}{x^{10}} = \\frac{x^4(1 - 5\\log x)}{x^{10}} = \\frac{1-5\\log x}{x^6}$$ 分母は $0$ にならないので、$y'=0$ は $1 - 5\\log x = 0$、$\\log q = \\dfrac15$。分母の微分の項を落とすと $\\dfrac{1}{x^6}$ になり、$0$ になる点が無くなってしまいます。中心の問いへ：**割り算でも、$\\log x$ の傾き $\\dfrac1x$ が累乗と打ち消し合う**。",
        },
      ],
      formulaPreview: "y' = (x⁴ − 5x⁴ log x)/x¹⁰ = (1 − 5 log x)/x⁶ = 0 → log q = 1/5",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "こんどは**合成**です。$\\log$ の中に多項式が入った関数\n\n$$y = \\log(x^2 + 5)$$\n\nの、$x = 2$ における微分係数を求めましょう。答えは既約分数で答えましょう。",
      answer: 4 / 9,
      answerDisplay: "4/9",
      unit: "",
      unknownLabel: "$x=2$ における微分係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。step2 は $\\log x$ そのものだった。今度は $\\log$ の**中に**式が入っている。第3章で、式の中に式が入った関数の傾きはどうした？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは、**$\\log$ の中身が $x$ から $x^2+5$ になった**こと $1$ つ。外の $\\log$ の傾きと、中の $x^2+5$ の傾きは、それぞれ何？",
        },
        {
          layer: 3,
          text: "$t = x^2+5$ とおくと $y = \\log t$。[合成関数の微分法] で $$y' = \\frac1t\\cdot 2x = \\frac{2x}{x^2+5}$$ $x=2$ では $\\dfrac{4}{9}$。**中の傾き $2x$ を掛け忘れると $\\dfrac19$** になり、別の値です。$\\log$ の合成の微分は「**中の式の傾き ÷ 中の式**」という形になります。中心の問いへ：**底が $e$ だから、どんな式を中に入れても余分な係数は付かない**。",
        },
      ],
      formulaPreview: "y' = (x²+5)'/(x²+5) = 2x/(x²+5)。x = 2 で 4/9",
      figureMarker: "<<M3VD_NEST_LOG>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$y = \\log(3x + 1)$ の、$x = 1$ における微分係数を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.75,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "$x=1$ における微分係数",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$\\log$ の中身が $1$ 次式になった**こと。前題の「中の式の傾き ÷ 中の式」は、今度はどうなる？",
        },
        {
          layer: 3,
          text: "前題と同じく $y' = \\dfrac{(3x+1)'}{3x+1} = \\dfrac{3}{3x+1}$。$x=1$ では $\\dfrac34$。中の傾き $3$ を掛け忘れると $\\dfrac14$ です。中心の問いへ：**中身が何であっても、「中の傾き ÷ 中の式」の形は変わらない**。",
        },
      ],
      formulaPreview: "y' = 3/(3x+1)。x = 1 で 3/4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "こんどは向きが逆です。$y = \\log(2x+1)$（$x > -\\dfrac12$）の微分係数が $\\dfrac{2}{15}$ になる $x$ の値を求めましょう。",
      answer: 7,
      unit: "",
      unknownLabel: "$x$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は点から傾きを出した。今度は**傾きが先に**分かっている。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**問われているのが傾きから点に入れ替わった**こと $1$ つ。前題で出した導関数の形の中で、$x$ はどこに入っていた？",
        },
        {
          layer: 3,
          text: "前題と同じく $y' = \\dfrac{2}{2x+1}$。これが $\\dfrac{2}{15}$ なので $2x+1 = 15$、$x = 7$（$x>-\\dfrac12$ を満たす）。範囲を書いたのは、$\\log$ の中身が正でなければならないからです。中心の問いへ：**導関数が単純だから、傾きから点を逆にたどるのも一瞬**。",
        },
      ],
      formulaPreview: "2/(2x+1) = 2/15 → 2x + 1 = 15 → x = 7",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "次の関数の $x = 1$ における微分係数を求めましょう。答えは既約分数で答えましょう。\n\n$$y = \\log\\frac{(x+1)^3}{(x+4)^2} \\qquad (x > -1)$$",
      answer: 1.1,
      answerDisplay: "11/10",
      unit: "",
      unknownLabel: "$x=1$ における微分係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step6 と比べてみよう。$\\log$ の中身が、積や累乗や分数の入り組んだ形になった。微分する前に、$\\log$ の性質でできることは無いだろうか。",
        },
        {
          layer: 2,
          text: "step6 と変わったのは、**中身が累乗の商になった**こと $1$ つ。数Ⅱ・B の [対数法則] で、$\\log$ の中の割り算や累乗はどう書きかえられた？",
        },
        {
          layer: 3,
          text: "[対数法則] で先に分けると $$y = 3\\log(x+1) - 2\\log(x+4)$$ 各項は step6 と同じ形なので $$y' = \\frac{3}{x+1} - \\frac{2}{x+4}$$ $x=1$ では $\\dfrac32 - \\dfrac25 = \\dfrac{11}{10}$。商の公式と合成を重ねて押す道でも同じ値に着きますが、先に分けると $1$ 項ずつ片づきます。中心の問いへ：**$\\log$ は掛け算を足し算に変えるので、微分する前に式をばらせる**——次の系列9 の「対数微分法」の伏線。",
        },
      ],
      formulaPreview: "y = 3log(x+1) − 2log(x+4)。y' = 3/(x+1) − 2/(x+4)。x = 1 で 3/2 − 2/5 = 11/10",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "次の関数の $x = \\dfrac{\\pi}{3}$ における微分係数を求めましょう。\n\n$$y = \\log(\\sin x) \\qquad (0 < x < \\pi)$$",
      answer: Math.sqrt(3) / 3,
      answerDisplay: "√3/3",
      unit: "",
      unknownLabel: "$x=\\dfrac{\\pi}{3}$ における微分係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      inputAffordances: ["sqrt"],
      hints: [
        {
          layer: 1,
          text: "step5 と比べてみよう。$\\log$ の中身が、多項式から三角関数になった。step5 の形は、中身が三角関数でも使える？",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、**中身が $\\sin x$ になった**こと $1$ つ。中身の傾きは、前の系列で何だった？",
        },
        {
          layer: 3,
          text: "step5 と同じく「中の傾き ÷ 中の式」で $$y' = \\frac{(\\sin x)'}{\\sin x} = \\frac{\\cos x}{\\sin x}$$ $x=\\dfrac\\pi3$ では $\\dfrac{\\ \\dfrac12\\ }{\\ \\dfrac{\\sqrt3}{2}\\ } = \\dfrac{1}{\\sqrt3} = \\dfrac{\\sqrt3}{3}$。中心の問いへ：**三角関数の部品と対数の部品は、つなぎ方を通して自由に組める**。",
        },
      ],
      formulaPreview: "y' = cos x/sin x。x = π/3 で (1/2)/(√3/2) = √3/3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "次の関数の $x = 3$ における微分係数を求めましょう。答えは既約分数で答えましょう。\n\n$$y = \\log\\left(x + \\sqrt{x^2 + 7}\\right)$$",
      answer: 0.25,
      answerDisplay: "1/4",
      unit: "",
      unknownLabel: "$x=3$ における微分係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "step5 と比べてみよう。$\\log$ の中身に、さらに根号の式が入っている。step5 の形を使うと、途中の式はどうなっていくだろう？",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、**中身の中に、さらに根号が入った**こと $1$ つ。step5 の形は、中身がどれだけ複雑でも当てはめられた。今度もそのまま当てはめられるだろうか。",
        },
        {
          layer: 3,
          text: "「中の傾き ÷ 中の式」で、中身は $x+\\sqrt{x^2+7}$。その傾きは $1 + \\dfrac{2x}{2\\sqrt{x^2+7}} = \\dfrac{\\sqrt{x^2+7}+x}{\\sqrt{x^2+7}}$。 $$y' = \\frac{\\sqrt{x^2+7}+x}{\\sqrt{x^2+7}}\\cdot\\frac{1}{x+\\sqrt{x^2+7}} = \\frac{1}{\\sqrt{x^2+7}}$$ **分子と分母が約分されて、驚くほど単純な形に畳まれました**。$x=3$ では $\\dfrac{1}{\\sqrt{16}} = \\dfrac14$。中心の問いに戻ると：**底 $e$ を選んだ対数は、複雑な式の微分まで単純にしてしまう**——これが「自然」と呼ばれる理由の $1$ つです。",
        },
      ],
      formulaPreview: "y' = {1 + x/√(x²+7)}/(x + √(x²+7)) = 1/√(x²+7)。x = 3 で 1/4",
    },
  ],
  derivation: `**中心の問い** ｜ 人間には $2$ や $10$ のほうが自然に見えるのに、なぜ数学は**底 $e$** の対数を「**自然**」と呼ぶ？

────────

## 係数を消す底が、ちょうど 1 つある

前の系列で $(\\log_a x)' = \\dfrac{\\log_a e}{x}$ だった。分子の $\\log_a e$ は、底 $a$ で $e$ を測った値で、$a=2$ なら $1.4426\\cdots$、$a=10$ なら $0.4342\\cdots$ という中途半端な数になる。**この係数がちょうど $1$ になるのは $a = e$ のとき**。そこで底を $e$ にした対数を [自然対数] と呼び、底を省いて $\\log x$ と書く。

$$(\\log x)' = \\frac1x$$

## ここが胚細胞：自然さを決めるのは、式がどれだけ単純になるか

$2$ や $10$ は、人間の指や数え方にとって自然な数である。けれど**数学にとって何が自然かを決めるのは、人がどう感じるかではなく、物事がどれだけ単純になるか**である。底 $e$ は、対数の微分から余分な係数を消す、ただ $1$ つの底だった。

これは三角関数のときと同じ構造である。**角の単位では弧度法が、対数の底では $e$ が、微分に付く余分な係数をちょうど $1$ にするものさしとして選ばれている**。

## 「中の傾き ÷ 中の式」

合成 $\\log f(x)$ の微分は $\\dfrac{f'(x)}{f(x)}$——**中の式の傾きを、中の式で割る**（step5・6・9）。この形のおかげで、$\\log$ の中に何が入っても計算の型は $1$ つで済む。

## Step の道筋

- **step1〜2**：$(\\log x)' = \\dfrac1x$ を点で使う
- **step3〜4**：積・商——傾きが $0$ になる点で、$\\dfrac1x$ が累乗と打ち消し合う
- **step5〜6**：合成——中の傾き ÷ 中の式
- **step7**：傾きから点を逆にたどる
- **step8**：対数法則で先に分けてから微分する
- **step9**：$\\log$ の中に三角関数
- **step10（山場）**：複雑な式が、単純な導関数に畳まれる

────────

**もっと深く**

**忘れても導ける。** 底が $e$ でない $\\log_a x$ を微分したくなったら、[底の変換公式] で $\\log_a x = \\dfrac{\\log x}{\\log a}$ と自然対数に直せばよい。$\\log a$ はただの定数なので、$(\\log_a x)' = \\dfrac{1}{(\\log a)x}$ がその場で出る。**公式を覚えるより、底を $e$ にそろえる手つきを覚える**。

**よくある取り違え。** ①**中の傾きを掛け忘れる**：$(\\log(3x+1))' = \\dfrac{1}{3x+1}$ としてしまう（step6 で $\\dfrac14$ になる）。②**$\\log$ の中の足し算を分ける**：$\\log(x+1) = \\log x + \\log 1$ は誤り。$\\log$ が足し算・引き算に変えるのは、中の**掛け算・割り算**（と累乗）であって、中の足し算は分けられない。

**山場の形は偶然ではない。** step10 の $\\log(x+\\sqrt{x^2+c})$ の導関数が $\\dfrac1{\\sqrt{x^2+c}}$ に畳まれることは、第6章の積分で「$\\dfrac{1}{\\sqrt{x^2+c}}$ を積分すると何になるか」の答えとして、もう一度出会う。

**この先の景色。** 次の系列では、$\\log x$ の逆関数 $e^x$ を微分する。$\\log x$ の傾きが $\\dfrac1x$ だったことから、逆関数の微分で「微分しても変わらない関数」が現れる。第6章では、$\\dfrac1x$ の積分が $\\log x$ になる——前の系列で見つけた「穴」が、積分の側からも埋まる。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 第4章「自然対数」の構成（$(\\log_a x)'$ の係数を消す底として $e$ を選び、積・商・合成・一般の底へ進む順序）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

底 $e$ の対数が「自然」なのは、**微分から余分な係数を消す、ただ $1$ つの底**だからである。$2$ や $10$ を底にすれば、微分するたびに $\\log_2 e$ や $\\log_{10}e$ のような中途半端な数がついてまわる。

数学にとっての自然さは、人がどう感じるかではなく、**物事がどれだけ単純になるか**で決まる。弧度法が角のものさしとして選ばれたのと同じ理由で、$e$ は対数の底として選ばれた。`,
};

/** 「いろいろな関数の微分」ユニットの系列一覧（数Ⅲ・C 第4章・背骨の順）。
 *  実装が進むごとに追加する。 */
export const MATH3_VARIOUS_DIFF_SERIES_LIST: LearnerSeries[] = [
  M3VD_TRIG_LIM_SERIES,
  M3VD_SUM_PROD_SERIES,
  M3VD_TRIG_DIFF_SERIES,
  M3VD_TRIG_COMB_SERIES,
  M3VD_LOG_SERIES,
  M3VD_NATLOG_SERIES,
];
