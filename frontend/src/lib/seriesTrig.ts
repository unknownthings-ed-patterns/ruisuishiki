/**
 * 三角関数ユニットの系列（数Ⅱ・B）。
 *
 * Fable 5 の背骨設計（docs/trig_series_design_fable.md）を Opus が実装。
 * お手本（ADV_NUMBER_LINE_SERIES・ADV_LINE_EQUATION_SERIES）を mirror。
 *
 * 系列1：一般角と三角関数の値（単位円で読む）。
 * 旧「三角関数の周期」系列（algebra2_trig_period_01）を吸収して廃止（周期は step8 で回収）。
 *
 * 出典: 池田洋介『数学Ⅱ・B 入門問題精講』第4章 三角関数（旺文社）の構成を借り、
 * 角・値はオリジナルに変更（copyright-credit-vs-copy）。
 *
 * 解答入力系の √・複数解対応後、背骨設計どおり無理数を含む特別角を扱う。
 * 判定は |入力 − 答| < 1e-6。複数値はカンマ区切り・順不同で判定する。
 */

import type { LearnerSeries } from "./types";

/** TRIG1: 一般角と三角関数の値（単位円で読む）。旧 algebra2_trig_period_01 を吸収。 */
export const TRIG_GENERAL_ANGLE_SERIES: LearnerSeries = {
  id: "trig_general_angle_01",
  title: "一般角と三角関数の値（単位円で読む）",
  subtitle:
    "数Ⅱ・B 三角関数より — 単位円の座標で sin・cos・tan を読む。鈍角・$1$ 回転超え・負の角まで $10$ 問。",
  patternId: "TRIG1",
  unit: "algebra_2",
  revelationLabel:
    "sinθ＝点 P の y 座標、cosθ＝点 P の x 座標、tanθ＝直線 OP の傾き（符号は象限で決まる）",
  drivingQuestion:
    "直角三角形でしか測れなかった $\\sin$・$\\cos$・$\\tan$ を、単位円の『座標』と見ると、鈍角も・$1$ 回転を超えた角も・負の角も、同じ $3$ つで測れるのはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "半径 $1$ の単位円で、$x$ 軸の正の向きから $30°$ 回した点を $P$ とします。$\\sin 30°$（＝ $P$ の $y$ 座標）はいくつでしょう？",
      answer: 0.5,
      unit: "",
      unknownLabel: "sin 30°（P の y 座標）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数Ⅰの [三角比] では $\\sin$ を「斜辺ぶんの向かいの辺」で覚えたね。いま斜辺＝半径はちょうど $1$。すると「向かいの辺」は、点 $P$ のどの座標と同じになりそう？ [単位円] の上で $P$ の高さを見てみよう。",
        },
        {
          layer: 2,
          text: "斜辺が $1$ なら「向かいの辺 ÷ 斜辺」の分母が消えて、$\\sin$ は「向かいの辺」そのもの＝点 $P$ の高さ＝ $y$ 座標になる。$30°$ の三角比の値を、そのまま縦の高さとして読めばいい。",
        },
        {
          layer: 3,
          text: "[単位円] では $\\sin\\theta = P$ の $y$ 座標。半径 $1$ なので「$y$ 座標 ＝ 高さ ÷ 斜辺 ＝ $\\sin\\theta$」。三角比の $\\sin 30° = \\dfrac{1}{2}$ がそのまま $y$ 座標。よって $\\dfrac{1}{2}$（$0.5$）。直角三角形の比が、円の座標に化けただけ。",
        },
      ],
      formulaPreview: "sin30° = P の y 座標 = 1/2",
      figureMarker: "<<UNIT_CIRCLE_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "単位円で $x$ 軸の正の向きから $45°$、$60°$ 回した点をそれぞれ $P, Q$ とします。$\\sin 45°$（＝ $P$ の $y$ 座標）と $\\sin 60°$（＝ $Q$ の $y$ 座標）を、カンマで区切って $2$ つとも答えましょう。",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2, √3/2",
      solutionSet: [1 / Math.sqrt(2), Math.sqrt(3) / 2],
      inputAffordances: ["sqrt", "multi"],
      unit: "",
      unknownLabel: "sin 45° と sin 60°",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$\\sin$ ＝ 点の $y$ 座標を読む」。変わったのは回す角だけ。$45°$ と $60°$ の点は、前題の $30°$ の点よりどれだけ高い？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、読む角が $45°$ と $60°$ になったこと。どちらも数Ⅰで見た特別な直角三角形を単位円の中に見つければ、高さを読めそう？",
        },
        {
          layer: 3,
          text: "前題と同じ「$\\sin\\theta =$ 点の $y$ 座標」。$45°$ の直角二等辺三角形では、斜辺を $1$ にすると高さは $\\dfrac{1}{\\sqrt{2}}$。$60°$ の $1:\\sqrt{3}:2$ の三角形では高さは $\\dfrac{\\sqrt{3}}{2}$。よって $\\sin 45° = \\dfrac{1}{\\sqrt{2}},\\ \sin 60° = \\dfrac{\\sqrt{3}}{2}$。",
        },
      ],
      formulaPreview: "sin45° = 1/√2 ／ sin60° = √3/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "単位円で $x$ 軸の正の向きから $60°$ 回した点を $P$ とします。$\\cos 60°$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: 0.5,
      unit: "",
      unknownLabel: "cos 60°（P の x 座標）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは $\\sin$＝高さ（$y$ 座標）を読んでいた。今度は $\\cos$。読む座標が縦から横へ移るだけ——$P$ のどの座標を見ればいい？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「読む座標が $y$ から $x$ へ」の $1$ 点だけ。$\\cos\\theta$ は点 $P$ の横の位置＝ $x$ 座標。$60°$ の $P$ の横の位置は？",
        },
        {
          layer: 3,
          text: "[単位円] では $\\cos\\theta = P$ の $x$ 座標。三角比の $\\cos 60° = \\dfrac{1}{2}$ がそのまま横の位置。よって $\\dfrac{1}{2}$（$0.5$）。$\\sin$ が縦なら $\\cos$ は横——同じ $P$ の別の座標を読むだけ。",
        },
      ],
      formulaPreview: "cos60° = P の x 座標 = 1/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "単位円で $x$ 軸の正の向きから $135°$ 回した点を $P$ とします（左上の領域）。$\\sin 135°$（＝ $P$ の $y$ 座標）と $\\cos 135°$（＝ $P$ の $x$ 座標）を、カンマで区切って $2$ つとも答えましょう。",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2, −1/√2",
      solutionSet: [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
      inputAffordances: ["sqrt", "multi"],
      unit: "",
      unknownLabel: "sin 135° と cos 135°",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今回の $135°$ は $90°$ を越えて左上へ回っている。点 $P$ が $y$ 軸より左に行くと、縦の座標と横の座標の符号はそれぞれどうなりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$P$ が第 $2$ 象限に来た」こと。$135°$ は $45°$ の点を $y$ 軸で鏡うつしした位置。高さはそのまま、横の位置だけ符号が反転する。",
        },
        {
          layer: 3,
          text: "$135°$ の $P$ は左上の第 $2$ 象限。$45°$ の点を $y$ 軸で鏡うつしするので、高さは $\\dfrac{1}{\\sqrt{2}}$ のまま、横の位置は $-\\dfrac{1}{\\sqrt{2}}$。よって $\\sin 135° = \\dfrac{1}{\\sqrt{2}},\\ \cos 135° = -\\dfrac{1}{\\sqrt{2}}$。鈍角でも『座標を読む』は同じで、象限が符号を決める。",
        },
      ],
      formulaPreview: "sin135° = 1/√2 ／ cos135° = −1/√2（第2象限）",
      figureMarker: "<<UNIT_CIRCLE_Q2>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "単位円で $x$ 軸の正の向きから $210°$ 回した点を $P$ とします（左下の領域）。$\\sin 210°$（＝ $P$ の $y$ 座標）はいくつでしょう？",
      answer: -0.5,
      unit: "",
      unknownLabel: "sin 210°（P の y 座標）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は左上で $x$ 座標の符号を見た。今度は $210°$＝左下（第 $3$ 象限）で $\\sin$＝ $y$ 座標。下にある点の高さの符号はどうなる？",
        },
        {
          layer: 2,
          text: "前題と同じ「象限で符号が決まる」話。変わったのは「読むのが $y$ 座標」「$P$ が下にある」こと。$x$ 軸より下なら $y$ 座標は？",
        },
        {
          layer: 3,
          text: "$210°$ の $P$ は左下の第 $3$ 象限。$x$ 軸より下なので $y$ 座標は負。大きさは $30°$ の鏡うつしで $\\dfrac{1}{2}$。よって $\\sin 210° = -\\dfrac{1}{2}$（$-0.5$）。前題と同じく『座標を読む＋符号は象限から』。",
        },
      ],
      formulaPreview: "sin210° = P の y 座標 = −1/2（第3象限で負）",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "単位円で $x$ 軸の正の向きから $315°$ 回した点を $P$ とします（右下の領域）。$\\cos 315°$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos 315°（P の x 座標）",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「座標を読む＋符号は象限から」。今度は $315°$＝右下（第 $4$ 象限）で $\\cos$＝ $x$ 座標。右側にある点の横の位置の符号は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$P$ が右下にいる」こと。$y$ 軸より右なら $x$ 座標の符号はプラス？マイナス？",
        },
        {
          layer: 3,
          text: "$315°$ の $P$ は右下の第 $4$ 象限。$y$ 軸より右なので $x$ 座標は正。大きさは $45°$ の鏡うつしで $\\dfrac{1}{\\sqrt{2}}$。よって $\\cos 315° = \\dfrac{1}{\\sqrt{2}}$。第 $4$ 象限は $x$ が正・$y$ が負。",
        },
      ],
      formulaPreview: "cos315° = P の x 座標 = 1/√2（第4象限で x は正）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "単位円で $x$ 軸の正の向きから $60°$ 回した点を $P$ とします。$\\tan 60°$（＝ 直線 $OP$ の傾き）はいくつでしょう？",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "tan 60°（直線 OP の傾き）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "ここまでは $P$ の座標（$y$ や $x$）を読んでいた。今度は新顔 $\\tan$。$\\tan\\theta$ は原点から $P$ へ引いた直線 $OP$ の『傾き』——直線の傾きは何と何の比だったか（[三角比] の坂のかたむき）思い出せる？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは「読むのが座標 $1$ つでなく、$2$ つの座標の比」になったこと。傾き ＝ 縦 ÷ 横 ＝ $y$ 座標 ÷ $x$ 座標。$60°$ の $P$ の縦と横は、Step 2・3 で読んだ値だね。",
        },
        {
          layer: 3,
          text: "$\\tan\\theta = \\dfrac{P\\text{ の }y}{P\\text{ の }x}$＝直線 $OP$ の傾き。$60°$ では $y = \\dfrac{\\sqrt{3}}{2},\\ x = \\dfrac{1}{2}$ だから、傾きは $\\dfrac{\\sqrt{3}/2}{1/2} = \\sqrt{3}$。よって $\\tan 60° = \\sqrt{3}$。なお $90°$ では $x = 0$ になり「$\\div 0$」なので定義できない。",
        },
      ],
      formulaPreview: "tan60° = (√3/2) ÷ (1/2) = √3",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "単位円で $x$ 軸の正の向きから $780°$ 回した点を $P$ とします（$2$ 周ぶん多く回した）。$\\tan 780°$（＝ 直線 $OP$ の傾き）はいくつでしょう？",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "tan 780°（直線 OP の傾き）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題（$\\tan 60°$）と比べてみよう。やり方は同じ「$OP$ の傾き」。今回は $780°$——$2$ 周ぶん余計に回している。ぐるっと回って戻ると、$P$ は前題と同じ場所？違う場所？",
        },
        {
          layer: 2,
          text: "前題と変わったのは角だけ。$780°$ は「$2$ 周」と「あと少し」に分けられる。$2$ 周ぶんを取り除くと、前題のどの角と同じ点に重なる？",
        },
        {
          layer: 3,
          text: "$1$ 周は $360°$。$780° = 360° \\times 2 + 60°$ なので、$P$ は $2$ 周まわって $60°$ の点とぴったり同じ場所に戻る。だから $\\tan 780° = \\tan 60° = \\sqrt{3}$。$360°$ ごとに値がくり返す——これが「周期」。",
        },
      ],
      formulaPreview: "780° = 360°×2 + 60° → tan780° = tan60° = √3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "単位円で $x$ 軸の正の向きから $-225°$ 回した点（時計回りに $225°$）を $P$ とします。$\\cos(-225°)$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: -1 / Math.sqrt(2),
      answerDisplay: "−1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos(−225°)（P の x 座標）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step4 の $+135°$ と比べてみよう。今度は $-225°$＝時計回りに進む角。回す向きは逆でも、円の上で着く点は step4 と同じになりそう？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは回す向きだけ。時計回りの $-225°$ と反時計回りの $135°$ は、円周上のどの位置に着くかを比べてみよう。",
        },
        {
          layer: 3,
          text: "負の角は『時計回り』。$-225° + 360° = 135°$ なので、$P$ は step4 と同じ左上の点。横の位置は $-\\dfrac{1}{\\sqrt{2}}$。だから $\\cos(-225°) = \\cos 135° = -\\dfrac{1}{\\sqrt{2}}$。回す向きが逆でも、ひと回り足せば既知の点に帰着できる。",
        },
      ],
      formulaPreview: "−225° + 360° = 135° → cos(−225°) = −1/√2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "単位円で $-405°$ 回した点（時計回りに $1$ 周ぶん多く）を $P$ とします。$\\tan(-405°)$（＝ 直線 $OP$ の傾き）はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "tan(−405°)（直線 OP の傾き）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step8（$1$ 周を取り除く＝周期）と step9（負の角＝時計回り）を思い出そう。今回はその合わせ技——マイナスかつ $1$ 周を超えた角。$2$ つの考え方を順番に使えそう？",
        },
        {
          layer: 2,
          text: "step8 と step9 で身につけた手をそのまま重ねるだけ。まず時計回りの $1$ 周ぶんを取り除いて角を小さくし（step8 の発想）、残った負の角を読む（step9 の発想）。$-405°$ からひと回りを取り除くと、どの角が残る？",
        },
        {
          layer: 3,
          text: "$-405° = -360° - 45°$。時計回りにひと回り（$-360°$）取り除くと残るのは $-45°$。$-45°$ の $P$ は $+45°$ の $P$ を $x$ 軸で鏡うつしした右下の点で、縦が負・横が正だから傾きは負：$\\tan(-405°) = \\tan(-45°) = -1$。「周期（step8）」＋「負の角＝時計回り（step9）」の複合。",
        },
      ],
      formulaPreview: "−405° = −360° − 45° → −45° → tan(−45°) = −1",
    },
  ],
  derivation: `**中心の問い** ｜ 直角三角形でしか測れなかった $\\sin$・$\\cos$・$\\tan$ を、[単位円] の『座標』と見ると、鈍角も・$1$ 回転を超えた角も・負の角も、同じ $3$ つで測れるのはなぜ？

────────

**直角三角形は、角が $0°$〜$90°$ の世界しか測れない。**

数Ⅰの [三角比] は、直角三角形の辺の比でした。でも三角形は角が $90°$ 未満でないと作れません。$135°$ の三角形も、$2$ 回転を超えた $780°$ も、時計回りの $-225°$ も、三角形では描けない——ここで行き止まりになります。

**半径 $1$ の円——[単位円]——に乗せ替えると、行き止まりが消える。**

<<UNIT_CIRCLE_STEP1>>

原点を中心とする半径 $1$ の円を考えます。$x$ 軸の正の向きから角 $\\theta$ だけ回した円周上の点を $P$ とすると、三角比はこう読み替えられます：

$$\\sin\\theta = P\\text{ の }y\\text{ 座標}, \\quad \\cos\\theta = P\\text{ の }x\\text{ 座標}, \\quad \\tan\\theta = \\text{直線 }OP\\text{ の傾き}$$

**なぜ座標になるのか**：斜辺＝半径はちょうど $1$。「向かいの辺 $\\div$ 斜辺」「となりの辺 $\\div$ 斜辺」の分母 $1$ が消えて、$\\sin$ は高さ（$y$）、$\\cos$ は横（$x$）そのものになります。$\\tan$ は「高さ $\\div$ 横」＝ $y \\div x$ ＝ 原点から $P$ へ引いた直線の傾き。

**ここが胚細胞**：三角形は「$0°$〜$90°$」でしか描けないけれど、**円周上の点 $P$ はどんな角でも置ける**。$135°$ でも $780°$ でも $-225°$ でも、$P$ の座標と $OP$ の傾きは必ず存在する。だから同じ $3$ つ（$\\sin, \\cos, \\tan$）で、あらゆる角が測れる——これが「[三角比] → [三角関数]」への拡張の正体です。

**Step 1〜3：まず第 $1$ 象限で、座標として読み直す**

$\\sin 30°$・$\\sin 45°$・$\\sin 60°$ は点の高さ（$y$ 座標）、$\\cos 60°$ は点の横（$x$ 座標）。三角比で覚えた根号を含む値が、そのまま円の上の座標になることを確かめました。$\\sin$＝縦、$\\cos$＝横——読む座標を $y$ から $x$ へ移すのが Step 3 の「$+\\alpha$」。

**Step 4〜6：象限が変わると、符号が出てくる（質的変化）**

ここが直角三角形では決して見えなかった景色。$P$ が円のどの $4$ 分の $1$（象限）にいるかで、座標の符号が決まります：

| 象限 | 位置 | $x$ 座標（$\\cos$） | $y$ 座標（$\\sin$） |
|---|---|---|---|
| 第 $1$ | 右上 | $+$ | $+$ |
| 第 $2$ | 左上 | $-$ | $+$ |
| 第 $3$ | 左下 | $-$ | $-$ |
| 第 $4$ | 右下 | $+$ | $-$ |

$\\sin 135° = \\dfrac{1}{\\sqrt{2}},\\ \\cos 135° = -\\dfrac{1}{\\sqrt{2}}$（左上）、$\\sin 210° = -\\dfrac{1}{2}$（左下）、$\\cos 315° = \\dfrac{1}{\\sqrt{2}}$（右下）。**値の大きさは第 $1$ 象限の鏡うつし、符号だけが象限で決まる**——これが鈍角・大きな角の読み方です。

**Step 7：$\\tan$＝直線 $OP$ の傾き（もう一つの $+\\alpha$）**

$\\tan\\theta$ は座標 $1$ つでなく、$y \\div x$ という $2$ 座標の比＝直線 $OP$ の傾き。$\\tan 60° = (\\sqrt{3}/2) \\div (1/2) = \\sqrt{3}$。$90°$ では $P$ が真上で横 $x = 0$ になり「$\\div 0$」——だから $\\tan 90°$ は定義できません。

**Step 8：$1$ 回転を超えても、ひと回りを取り除けば戻る（周期）**

$780° = 360° \\times 2 + 60°$。円を $2$ 周まわると $P$ は元の場所へ戻るので、$\\tan 780° = \\tan 60° = \\sqrt{3}$。**$360°$ ごとに値がくり返す**——これを周期と呼びます。「$\\sin 370°$ は $\\sin 10°$ と同じ」のような周期の話は、すべてこの「ひと回り取り除く」で説明できます。

**Step 9：負の角は時計回り（逆）**

$-225°$ は時計回りに $225°$。ひと回りの $360°$ を足すと $135°$ なので、Step 4 と同じ左上の点に着きます。だから $\\cos(-225°) = \\cos 135° = -\\dfrac{1}{\\sqrt{2}}$。回す向きを逆にしても、ひと回り足せば既知の点に帰着できる——これが「逆」の効き方。

**Step 10：負＋ $1$ 回転超えの複合**

$-405° = -360° - 45°$。時計回りにひと回り取り除く（Step 8 の周期）と $-45°$ が残り、それを鏡うつしで読む（Step 9 の逆）と $\\tan(-405°) = \\tan(-45°) = -1$。**周期と逆を重ねれば、どんなに大きい負の角も第 $1$ 象限の値に帰着できる**。

**この系列で歩いた『単位円の読み方』地図**

| 読みたいもの | 単位円での見方 |
|---|---|
| $\\sin\\theta$ | 点 $P$ の $y$ 座標（高さ） |
| $\\cos\\theta$ | 点 $P$ の $x$ 座標（横） |
| $\\tan\\theta$ | 直線 $OP$ の傾き（$y \\div x$） |
| 符号 | $P$ がいる象限で決まる |
| $1$ 回転超え | $360°$ を取り除く（周期） |
| 負の角 | 時計回り＝ $x$ 軸で鏡うつし |

────────

**もっと深く** — 単位円が開く三角関数の世界

**[一般角]という考え方**：「$30°$」と決め打ちせず、$30° + 360°n$（$n$ は整数）や負の角まで含めて角を扱うのが [一般角]。単位円なら、どの一般角も円周上の $1$ 点として無理なく置けます。三角方程式（値から角を逆に求める）では、この一般角が主役になります。

**最重要の恒等式**：点 $P = (\\cos\\theta, \\sin\\theta)$ は半径 $1$ の円の上にあるので、ピタゴラスの定理から

$$\\sin^2\\theta + \\cos^2\\theta = 1$$

が**すべての角**で成り立ちます。直角三角形のときと同じ式が、鈍角でも負の角でも生き続ける——単位円に乗せ替えた恩恵です。

**弧度法（ラジアン）へ**：このあと角の物差しを「度」から「半径 $1$ の弧の長さ」に変えると、$\\pi$ が角の自然な目盛りになります。単位円で読む、という土台は同じまま。

**波の言語**：角をどんどん回し続けると、$y$ 座標（$\\sin$）は上下に揺れ続けます。これが音・光・電気・水面の波——あらゆる周期現象を記述する関数の正体です。

────────

**問いに戻ると**

「直角三角形でしか測れなかった $\\sin$・$\\cos$・$\\tan$ を、なぜ鈍角・$1$ 回転超え・負の角まで同じ $3$ つで測れるのか？」——答えは、測る場所を**三角形から [単位円] の点 $P$ へ移した**から。$\\sin$＝ $P$ の $y$、$\\cos$＝ $P$ の $x$、$\\tan$＝ $OP$ の傾き。$P$ はどんな角にも置けるので、符号は象限が、$1$ 回転超えは周期が、負の角は時計回りが引き受ける。直角三角形という狭い入口を、円という広い世界に開いたもの——それが [三角関数] です。`,
};

/** TRIG2: 弧度法（角のものさしを変える）。系列1（単位円読み）をラジアンで再利用。 */
export const TRIG_RADIAN_SERIES: LearnerSeries = {
  id: "trig_radian_01",
  title: "弧度法（角のものさしを変える）",
  subtitle:
    "数Ⅱ・B 三角関数より — 角を『弧の長さ』で測る弧度法。度との換算から、ラジアンで三角関数を読むまで $10$ 問。",
  patternId: "TRIG2",
  unit: "algebra_2",
  revelationLabel:
    "弧度法：角の大きさ＝半径 $1$ の円で切り取る弧の長さ。$180° = \\pi$、度→ラジアンは $\\times\\dfrac{\\pi}{180}$、ラジアン→度は $\\times\\dfrac{180}{\\pi}$",
  drivingQuestion:
    "角を『度』でなく『半径 $1$ の円の弧の長さ』で測ると、なぜ $\\pi$ が角の自然な目盛りになる？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "半径 $1$ の円のふちに沿って、$x$ 軸の正の向きから反時計回りに**半周**ぶん進みます。点 $P$ が通った**弧の長さ**を、そのまま角の大きさとする測り方を [弧度法]（ラジアン）といいます。$180°$（半周）は何ラジアンでしょう？",
      answer: Math.PI,
      answerDisplay: "π",
      unit: "",
      unknownLabel: "180° をラジアンで",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "[単位円]（半径 $1$）の全周の長さは、円周の公式でいくつだったかな？ 半周ならその半分。角を「弧の長さ」で測る、という新しい物差しで考えてみよう。",
        },
        {
          layer: 2,
          text: "半径 $1$ の円の全周は $2\\pi r = 2\\pi$。$180°$ はちょうど半周だから、弧の長さは全周の半分。全周 $2\\pi$ の半分は？",
        },
        {
          layer: 3,
          text: "[弧度法] では「角の大きさ ＝ 半径 $1$ の円で切り取る弧の長さ」。全周（$360°$）の弧の長さは $2\\pi \\times 1 = 2\\pi$。$180°$ はその半分なので $\\pi$。よって $180° = \\pi$（ラジアン）。これが度とラジアンをつなぐ大もとの関係。",
        },
      ],
      formulaPreview: "180° = 半周の弧長 = π",
      figureMarker: "<<UNIT_CIRCLE_STEP1>>",
      inputAffordances: ["pi"],
    },
    {
      id: "step2",
      position: 2,
      questionText: "同じ [弧度法] で、$90°$ は何ラジアンでしょう？",
      answer: Math.PI / 2,
      answerDisplay: "π/2",
      unit: "",
      unknownLabel: "90° をラジアンで",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$180° = \\pi$ が分かった。$90°$ は $180°$ のちょうど半分の角。弧の長さも半分になりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは角が半分になっただけ。$180° = \\pi$ の半分の角なら、弧の長さも $\\pi$ の半分。",
        },
        {
          layer: 3,
          text: "角が半分なら弧の長さも半分。$180° = \\pi$ だから $90° = \\dfrac{\\pi}{2}$。$180°$ を基準に「何分の一か」で測れる。",
        },
      ],
      formulaPreview: "90° = π ÷ 2 = π/2",
      inputAffordances: ["pi"],
    },
    {
      id: "step3",
      position: 3,
      questionText: "$45°$ は何ラジアンでしょう？",
      answer: Math.PI / 4,
      answerDisplay: "π/4",
      unit: "",
      unknownLabel: "45° をラジアンで",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$180° = \\pi$ を基準に、何分のいくつか」。$45°$ は $180°$ の何分の一？",
        },
        {
          layer: 2,
          text: "前題は $180°$ の $\\dfrac{1}{2}$ だった。今度の $45°$ は $180°$ の $\\dfrac{1}{4}$。基準 $\\pi$ を何分の一する？",
        },
        {
          layer: 3,
          text: "$45° = \\dfrac{180°}{4}$ なので $\\dfrac{\\pi}{4}$。$180° = \\pi$ さえ覚えれば、$90° = \\dfrac{\\pi}{2}$・$60° = \\dfrac{\\pi}{3}$・$45° = \\dfrac{\\pi}{4}$・$30° = \\dfrac{\\pi}{6}$ はみな「$\\pi$ を何分の一」で出せる。",
        },
      ],
      formulaPreview: "45° = π ÷ 4 = π/4",
      inputAffordances: ["pi"],
    },
    {
      id: "step4",
      position: 4,
      questionText: "$150°$ は何ラジアンでしょう？",
      answer: (Math.PI * 5) / 6,
      answerDisplay: "5π/6",
      unit: "",
      unknownLabel: "150° をラジアンで",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは「$180°$ をきれいに何分の一」で出せた。でも $150°$ はそう割り切れない。度をラジアンに直す**一般の方法**はないかな？ $180° = \\pi$ という等式をヒントに。",
        },
        {
          layer: 2,
          text: "前題と変わったのは「きれいに割り切れない角」になったこと。$180° = \\pi$ の両辺を $180$ で割れば $1° = \\dfrac{\\pi}{180}$。あとは度に何をかければいい？",
        },
        {
          layer: 3,
          text: "$180° = \\pi$ より $1° = \\dfrac{\\pi}{180}$。だから度→ラジアンは $\\times\\dfrac{\\pi}{180}$。$150° \\times \\dfrac{\\pi}{180} = \\dfrac{150\\pi}{180} = \\dfrac{5\\pi}{6}$。きれいな角も割り切れない角も、この一本の掛け算でラジアンに直せる。",
        },
      ],
      formulaPreview: "150° × (π/180) = 5π/6",
      inputAffordances: ["pi"],
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "今度は逆に、$\\dfrac{\\pi}{3}$ ラジアンは何度でしょう？（答えは度の数で）",
      answer: 60,
      unit: "°",
      unknownLabel: "π/3 ラジアンを度で",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは『度からラジアンへ』直していた。今度は反対向きで『ラジアンから度へ』。前題で使った掛け算を、逆向きにするとどうなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは向きだけ（ラジアン→度）。度→ラジアンが $\\times\\dfrac{\\pi}{180}$ なら、その逆は何を掛ける？",
        },
        {
          layer: 3,
          text: "度→ラジアンが $\\times\\dfrac{\\pi}{180}$ だったので、逆のラジアン→度は $\\times\\dfrac{180}{\\pi}$。$\\dfrac{\\pi}{3} \\times \\dfrac{180}{\\pi} = \\dfrac{180}{3} = 60$。よって $60°$。$\\pi$ が約分で消えて度が残る。",
        },
      ],
      formulaPreview: "(π/3) × (180/π) = 60°",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\dfrac{7\\pi}{6}$ ラジアンは何度でしょう？（答えは度の数で）",
      answer: 210,
      unit: "°",
      unknownLabel: "7π/6 ラジアンを度で",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ『ラジアンから度へ』の向き。前題で使った戻し方は、中身が $\\dfrac{7\\pi}{6}$ に変わってもそのまま使えそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは中身の分数だけ。$\\dfrac{7\\pi}{6}$ に $\\dfrac{180}{\\pi}$ を掛けると、$\\pi$ が消えてどんな計算が残る？",
        },
        {
          layer: 3,
          text: "$\\dfrac{7\\pi}{6} \\times \\dfrac{180}{\\pi} = \\dfrac{7 \\times 180}{6} = 7 \\times 30 = 210$。よって $210°$。前題と同じ手を、分数を変えて繰り返すだけ。",
        },
      ],
      formulaPreview: "(7π/6) × (180/π) = 210°",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "ここからはラジアンのまま三角関数の値を読みます。$\\cos\\dfrac{2\\pi}{3}$ はいくつでしょう？",
      answer: -0.5,
      answerDisplay: "−1/2",
      unit: "",
      unknownLabel: "cos(2π/3)",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは角を度とラジアンで**言い換える**話だった。今度は言い換えでなく、その角の $\\cos$ の**値**を読む。$\\dfrac{2\\pi}{3}$ は [単位円] のどこ？ [一般角] でやった「$\\cos$ ＝ $P$ の $x$ 座標」がそのまま使えそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「度に直してから読むのでなく、ラジアンのまま単位円で読む」こと。$\\dfrac{2\\pi}{3}$ は度でいうと $120°$——単位円のどの象限？ そこの $x$ 座標の符号は？",
        },
        {
          layer: 3,
          text: "$\\dfrac{2\\pi}{3} = 120°$ で、[単位円] の左上（第 $2$ 象限）。系列1でやった通り $\\cos$ ＝ $P$ の $x$ 座標で、左上だから負。大きさは $60°$ の鏡うつしで $\\dfrac{1}{2}$。よって $\\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}$。**ラジアンは度の言い換えにすぎない**から、単位円の読み方はそっくり同じ。",
        },
      ],
      formulaPreview: "cos(2π/3) = cos120° = P の x 座標 = −1/2",
      figureMarker: "<<UNIT_CIRCLE_Q2>>",
    },
    {
      id: "step8",
      position: 8,
      questionText: "$\\sin\\dfrac{7\\pi}{4}$ はいくつでしょう？",
      answer: -1 / Math.sqrt(2),
      answerDisplay: "−1/√2",
      unit: "",
      unknownLabel: "sin(7π/4)",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「ラジアンのまま単位円で値を読む」。$\\dfrac{7\\pi}{4}$ は単位円のどこ？ 今度は $\\sin$（高さ＝$y$ 座標）。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、読むのが $\\cos$（横）から $\\sin$（高さ）へ、角も変わったこと。$\\dfrac{7\\pi}{4}$ は度でいうと $315°$——右下（第 $4$ 象限）。そこの高さ（$y$）の符号は？",
        },
        {
          layer: 3,
          text: "$\\dfrac{7\\pi}{4} = 315°$ で右下の第 $4$ 象限。$\\sin$ ＝ $P$ の $y$ 座標で、下にあるので負。大きさは $45°$ の鏡うつしで $\\dfrac{1}{\\sqrt{2}}$。よって $\\sin\\dfrac{7\\pi}{4} = -\\dfrac{1}{\\sqrt{2}}$。",
        },
      ],
      formulaPreview: "sin(7π/4) = sin315° = P の y 座標 = −1/√2",
      inputAffordances: ["sqrt"],
    },
    {
      id: "step9",
      position: 9,
      questionText: "$\\tan\\left(-\\dfrac{13\\pi}{6}\\right)$ はいくつでしょう？",
      answer: -1 / Math.sqrt(3),
      answerDisplay: "−1/√3",
      unit: "",
      unknownLabel: "tan(−13π/6)",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。これは合わせ技。系列1でやった「負の角（時計回り）」と「$1$ 回転を超えたら取り除く（周期）」を、今度はラジアンで思い出そう。まず何をすれば角が小さくなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「負」かつ「$1$ 周を超えた」こと。$1$ 周はラジアンで $2\\pi = \\dfrac{12\\pi}{6}$。$-\\dfrac{13\\pi}{6}$ からひと回りぶんを足して取り除くと、どの角が残る？",
        },
        {
          layer: 3,
          text: "$1$ 周は $2\\pi = \\dfrac{12\\pi}{6}$。$-\\dfrac{13\\pi}{6} + \\dfrac{12\\pi}{6} = -\\dfrac{\\pi}{6}$（時計回りに $\\dfrac{\\pi}{6}$）。$-\\dfrac{\\pi}{6} = -30°$ は右下の点で、$\\tan$（傾き＝$y \\div x$）は縦が負・横が正だから負。大きさは $\\dfrac{1}{\\sqrt{3}}$。よって $-\\dfrac{1}{\\sqrt{3}}$。「周期（$2\\pi$ を取り除く）」＋「負＝時計回り」の複合を、ラジアンで行ったもの。",
        },
      ],
      formulaPreview: "−13π/6 + 2π = −π/6 → tan(−π/6) = −1/√3",
      inputAffordances: ["sqrt"],
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "最後に定義へ戻ります。半径 $1$ の円で、中心角が $\\dfrac{\\pi}{2}$ ラジアンの扇形（ピザの一切れ）の、**弧の長さ**はいくつでしょう？",
      answer: Math.PI / 2,
      answerDisplay: "π/2",
      unit: "",
      unknownLabel: "半径1・中心角 π/2 の弧の長さ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。[弧度法] では「角の大きさ ＝ 半径 $1$ の円で切り取る弧の長さ」だった。では中心角が $\\dfrac{\\pi}{2}$ ラジアンなら、弧の長さは？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、角を「半周」でなく $\\dfrac{\\pi}{2}$ で与えられたこと。ラジアンの定義そのものを逆に読めば、答えは考えるまでもない——角の値と弧の長さは、半径 $1$ でどんな関係だった？",
        },
        {
          layer: 3,
          text: "[弧度法] の定義は「半径 $1$ での弧の長さ ＝ 角のラジアン値」。だから中心角 $\\dfrac{\\pi}{2}$ ラジアンの弧の長さは、そのまま $\\dfrac{\\pi}{2}$。（半径 $r$ なら弧長 $= r\\theta$。$r = 1$ だから $= \\theta$。）ラジアンとは「弧の長さで測った角」——ぐるっと一周して定義に戻ってきた。",
        },
      ],
      formulaPreview: "弧長 = rθ = 1 × π/2 = π/2",
      inputAffordances: ["pi"],
    },
  ],
  derivation: `**中心の問い** ｜ 角を『度』でなく『半径 $1$ の円の弧の長さ』で測ると、なぜ $\\pi$ が角の自然な目盛りになる？

────────

**「度」は人間が決めた目盛り——$360$ という数に必然性はない。**

$1$ 周を $360°$ に分けるのは古代バビロニアの約束事で、数学的な必然ではありません。円そのものが持っている「自然な長さ」は、半径と円周——半径 $1$ の円なら円周は $2\\pi$ です。そこで角を、**その角が半径 $1$ の円から切り取る弧の長さ**で測ることにします。これが [弧度法]（ラジアン）。

<<UNIT_CIRCLE_STEP1>>

**大もとの関係**：半周（$180°$）が切り取る弧は、円周 $2\\pi$ の半分＝ $\\pi$。だから

$$180° = \\pi \\ (\\text{ラジアン})$$

**ここが胚細胞**：この $1$ 本の等式さえあれば、度とラジアンは自由に行き来できます。

$$1° = \\dfrac{\\pi}{180} \\quad\\Longrightarrow\\quad \\text{度→ラジアンは} \\times\\dfrac{\\pi}{180}, \\quad \\text{ラジアン→度は} \\times\\dfrac{180}{\\pi}$$

**Step 1〜3：$180° = \\pi$ を基準に、きれいな角を測る**

$90° = \\dfrac{\\pi}{2}$、$45° = \\dfrac{\\pi}{4}$。「$180°$ の何分の一か」で、$60° = \\dfrac{\\pi}{3}$・$30° = \\dfrac{\\pi}{6}$ もすぐ出ます。

**Step 4〜6：割り切れない角と、逆向きの変換**

$150°$ のように「$180°$ の何分の一」で出ない角は、一般の掛け算 $\\times\\dfrac{\\pi}{180}$ を使う（$150° \\times \\dfrac{\\pi}{180} = \\dfrac{5\\pi}{6}$）。逆にラジアンを度に戻すときは $\\times\\dfrac{180}{\\pi}$（$\\dfrac{\\pi}{3} \\to 60°$）。$\\pi$ が約分で消えるのが目印です。

**Step 7〜9：ラジアンのまま三角関数を読む（[一般角] の再利用）**

$$\\cos\\dfrac{2\\pi}{3} = \\cos 120° = -\\dfrac{1}{2}, \\quad \\sin\\dfrac{7\\pi}{4} = \\sin 315° = -\\dfrac{1}{\\sqrt{2}}, \\quad \\tan\\left(-\\dfrac{13\\pi}{6}\\right) = -\\dfrac{1}{\\sqrt{3}}$$

**ラジアンは度の言い換えにすぎない**ので、系列1の [単位円] の読み方（$\\sin$＝$y$ 座標・$\\cos$＝$x$ 座標・符号は象限・周期は $2\\pi$ を取り除く・負は時計回り）が、そっくりそのまま効きます。ただし、これからは $2\\pi$ が「$1$ 周」の合言葉になります。

────────

**もっと深く** — なぜ数学はラジアンを選ぶのか

**弧長・面積が $\\theta$ でそのまま書ける**：半径 $r$ の扇形の弧長は $r\\theta$、面積は $\\dfrac{1}{2}r^2\\theta$（$\\theta$ はラジアン）。度で書くと $\\dfrac{\\pi}{180}$ が式にこびりつきますが、ラジアンなら消えます。Step 10 で見た「半径 $1$ なら弧長 ＝ $\\theta$」は、その一番素朴な姿。

**微分がきれいになる**：$\\theta$ がラジアンのときだけ $(\\sin\\theta)' = \\cos\\theta$ が成り立ちます（度だと余計な係数が出る）。だから数Ⅲ以降・物理・工学はラジアン一択。

**波の言語**：$\\sin\\theta$ を $\\theta$ を増やしながら描くと波になります（音・光・交流）。その「$1$ 周期」が $2\\pi$。ラジアンは波の自然な物差しでもあります。

────────

**問いに戻ると**

「なぜ $\\pi$ が角の自然な目盛りになるのか？」——角を「半径 $1$ の円が切り取る弧の長さ」で測ると決めた瞬間、半周の弧はまさに $\\pi$ になり、$180° = \\pi$ が生まれる。円が生まれつき持っている長さ（円周 $2\\pi$）で角を測るからこそ、$\\pi$ が目盛りの主役になる。度は人間の約束、ラジアンは円の言葉——同じ角を、円自身のものさしで読み直したものが [弧度法] です。`,
};

/** TRIG3: 三角方程式（値から角を求める）。系列1の逆向き（値→角）＋系列2（範囲を radian で）。
 *  範囲付き（0≤θ<2π 等）で有限解にし solutionSet で採点。不等式は「両端の角」を採点し、
 *  区間（点→弧）と一般解（+2nπ）は derivation で言葉として扱う（岩井先生と合意・2026-07-01）。 */
export const TRIG_EQUATION_SERIES: LearnerSeries = {
  id: "trig_equation_01",
  title: "三角方程式（値から角を求める）",
  subtitle:
    "数Ⅱ・B 三角関数より — 値から角を逆に求める。単位円の逆読み・範囲で解を絞る・不等式（点→弧）まで $10$ 問。",
  patternId: "TRIG3",
  unit: "algebra_2",
  revelationLabel:
    "三角方程式：値→角は「[単位円] のどこがその値になるか」を逆に読む。範囲（$0 \\le \\theta < 2\\pi$ 等）で解の個数が決まり、不等式は点でなく弧（区間）になる",
  drivingQuestion:
    "『角→値』を逆にして『値→角』を求めるには？ $\\sin\\theta = \\dfrac{1}{2}$ になる点は [単位円] のどこ？ 範囲を決めると解が絞れ、決めなければ無数にある——のはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "系列1では「角 → 値」を読みました。今度は逆に「値 → 角」を探します。$0 \\le \\theta < 2\\pi$ で、$\\sin\\theta = \\dfrac{1}{2}$ となる $\\theta$ を**すべて**求めましょう（複数あるので「,」で区切って）。",
      answer: Math.PI / 6,
      answerDisplay: "π/6, 5π/6",
      solutionSet: [Math.PI / 6, (Math.PI * 5) / 6],
      unit: "",
      unknownLabel: "sinθ=1/2 の解（0≤θ<2π）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "[単位円] で $\\sin\\theta$ は点 $P$ の高さ（$y$ 座標）だった。今度はその高さが決まっていて、角を探す。高さがちょうど $\\dfrac{1}{2}$ になる点は、円の上に何か所ある？",
        },
        {
          layer: 2,
          text: "高さ（$y$ 座標）が $\\dfrac{1}{2}$ の横線を引くと、円と $2$ 点で交わる。右上に $1$ つ、左上にもう $1$ つ。左右で対称——それぞれ何度の点？",
        },
        {
          layer: 3,
          text: "$\\sin\\theta = P$ の $y$ 座標。$y = \\dfrac{1}{2}$ の横線は円と $2$ 点で交わる：第 $1$ 象限の $30° = \\dfrac{\\pi}{6}$ と、その左右対称で第 $2$ 象限の $150° = \\dfrac{5\\pi}{6}$。だから解は $\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$。「角→値」を逆に読むと、$1$ つの値から $2$ つの角が出る。",
        },
      ],
      formulaPreview: "sinθ=1/2 → y=1/2 の点は π/6 と 5π/6",
      figureMarker: "<<UNIT_CIRCLE_STEP1>>",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$0 \\le \\theta < 2\\pi$ で、$\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$ となる $\\theta$ をすべて求めましょう。",
      answer: Math.PI / 3,
      answerDisplay: "π/3, 2π/3",
      solutionSet: [Math.PI / 3, (Math.PI * 2) / 3],
      unit: "",
      unknownLabel: "sinθ=√3/2 の解（0≤θ<2π）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やり方は同じ「その高さになる点を [単位円] で探す」。変わったのは狙う高さの値だけ。前題と同じく、左右対称に $2$ つ出そう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは高さの値だけ。今度の高さになる第 $1$ 象限の角は $60°$。前題と同じ「もう $1$ つは左右対称の第 $2$ 象限」を使うと、相手はどこ？",
        },
        {
          layer: 3,
          text: "第 $1$ 象限で高さがこの値になるのは $60° = \\dfrac{\\pi}{3}$。前題と同じく左右対称の相手が第 $2$ 象限にあり、$180° - 60° = 120° = \\dfrac{2\\pi}{3}$。よって $\\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}$。値が変わっても「第 $1$ 象限＋その鏡」の型は同じ。",
        },
      ],
      formulaPreview: "sinθ=√3/2 → π/3 と 180°−60°=2π/3",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$0 \\le \\theta < 2\\pi$ で、$\\cos\\theta = \\dfrac{1}{2}$ となる $\\theta$ をすべて求めましょう。",
      answer: Math.PI / 3,
      answerDisplay: "π/3, 5π/3",
      solutionSet: [Math.PI / 3, (Math.PI * 5) / 3],
      unit: "",
      unknownLabel: "cosθ=1/2 の解（0≤θ<2π）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは $\\sin$（高さ＝縦）で探していた。今度は $\\cos$。読む向きが縦から横（$x$ 座標）に移る。横の位置がその値になる点は、円のどこ？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「読むのが縦から横（$\\cos$＝$x$ 座標）へ」の $1$ 点。横の位置で対称なのは上下——上半分に $1$ つ、下半分に鏡うつしがもう $1$ つ。第 $1$ 象限の角は $60°$。下の相手は？",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = P$ の $x$ 座標。横の位置がこの値になるのは第 $1$ 象限の $60° = \\dfrac{\\pi}{3}$ と、$x$ 軸で上下対称の第 $4$ 象限 $300° = \\dfrac{5\\pi}{3}$。よって $\\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$。$\\sin$ は左右対称だったが、$\\cos$ は上下対称——対称の軸が変わる。",
        },
      ],
      formulaPreview: "cosθ=1/2 → π/3 と 上下対称の 5π/3",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$0 \\le \\theta < 2\\pi$ で、$\\tan\\theta = \\sqrt{3}$ となる $\\theta$ をすべて求めましょう。",
      answer: Math.PI / 3,
      answerDisplay: "π/3, 4π/3",
      solutionSet: [Math.PI / 3, (Math.PI * 4) / 3],
      unit: "",
      unknownLabel: "tanθ=√3 の解（0≤θ<2π）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは座標（縦か横）$1$ つを読んでいた。今度は $\\tan$＝直線 $OP$ の傾き。傾きがその値になる直線を原点から引くと、円と何か所で交わる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「点の座標」でなく「原点を通る直線の傾き」で探すこと。傾きが決まった直線は原点を突き抜けるので、円の**反対側**でもう一度交わる。第 $1$ 象限の角は $60°$。反対側は何度ずれる？",
        },
        {
          layer: 3,
          text: "$\\tan\\theta$＝直線 $OP$ の傾き。傾きがこの値になる直線は第 $1$ 象限の $60° = \\dfrac{\\pi}{3}$ を通り、原点の反対側（第 $3$ 象限）でも円と交わる：$60° + 180° = 240° = \\dfrac{4\\pi}{3}$。$\\tan$ は $180°$（$\\pi$）ごとに同じ値——だから解は $\\dfrac{\\pi}{3}, \\dfrac{4\\pi}{3}$。$\\sin \\cdot \\cos$ の「$2$ 点」とは対称の仕組みが違う。",
        },
      ],
      formulaPreview: "tanθ=√3 → π/3 と 反対側 π/3+π=4π/3",
      figureMarker: "<<UNIT_CIRCLE_TAN_LINE>>",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$0 \\le \\theta < 2\\pi$ で、$\\tan\\theta = -\\sqrt{3}$ となる $\\theta$ をすべて求めましょう。",
      answer: (Math.PI * 2) / 3,
      answerDisplay: "2π/3, 5π/3",
      solutionSet: [(Math.PI * 2) / 3, (Math.PI * 5) / 3],
      unit: "",
      unknownLabel: "tanθ=−√3 の解（0≤θ<2π）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やり方は同じ「傾きがその値の直線と円の交点」。変わったのは傾きの符号がマイナスになったこと。傾きが負の直線は、どの向きに傾く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは傾きの符号だけ。傾きが負なら直線は右下がり——第 $2$ 象限と第 $4$ 象限を通る。前題と同じく「$180°$ 離れて $2$ 点」。第 $2$ 象限の角は $120°$。相手は？",
        },
        {
          layer: 3,
          text: "傾きが負の直線は右下がりで、第 $2$ 象限の $120° = \\dfrac{2\\pi}{3}$ と、$180°$ 反対の第 $4$ 象限 $300° = \\dfrac{5\\pi}{3}$ で円と交わる。よって $\\dfrac{2\\pi}{3}, \\dfrac{5\\pi}{3}$。前題と同じ「$\\pi$ ごとに $2$ 点」を、符号だけ変えて繰り返した。",
        },
      ],
      formulaPreview: "tanθ=−√3 → 右下がりの直線 → 2π/3 と 5π/3",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "今度は逆向きの問いです。$0 \\le \\theta < 2\\pi$ で、ある方程式 $\\sin\\theta = \\square$ の解が $\\theta = \\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}$ の $2$ つだけでした。$\\square$ に入る値はいくつでしょう？",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      unit: "",
      unknownLabel: "解が π/4, 3π/4 になる sinθ の値",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは『値から角』を求めていた。今度はその**逆**で『角から値』に戻る。$\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}$ の点の高さ（$\\sin$）を読めば、右辺の値が分かりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは向きだけ（角から値へ戻す）。$\\dfrac{\\pi}{4} = 45°$ の点の高さ（$y$ 座標）を [単位円] で読めばいい。もう一方の $\\dfrac{3\\pi}{4}$ は左右対称なので高さは同じ。",
        },
        {
          layer: 3,
          text: "$\\dfrac{\\pi}{4} = 45°$ の点の高さは $\\sin 45° = \\dfrac{1}{\\sqrt{2}}$。$\\dfrac{3\\pi}{4} = 135°$ は左右対称で高さは同じ。だから $\\sin\\theta = \\dfrac{1}{\\sqrt{2}}$ が、その $2$ 解を生む方程式。$\\square = \\dfrac{1}{\\sqrt{2}}$。値→角の逆は、角→値の読み取り。",
        },
      ],
      formulaPreview: "π/4, 3π/4 の高さ = sin45° = 1/√2",
      inputAffordances: ["sqrt"],
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "範囲を広げます。$0 \\le \\theta < 4\\pi$（$2$ 周ぶん）で、$\\sin\\theta = \\dfrac{1}{2}$ となる $\\theta$ をすべて求めましょう。",
      answer: Math.PI / 6,
      answerDisplay: "π/6, 5π/6, 13π/6, 17π/6",
      solutionSet: [
        Math.PI / 6,
        (Math.PI * 5) / 6,
        (Math.PI * 13) / 6,
        (Math.PI * 17) / 6,
      ],
      unit: "",
      unknownLabel: "sinθ=1/2 の解（0≤θ<4π）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。方程式は同じ $\\sin\\theta = \\dfrac{1}{2}$。変わったのは範囲が $1$ 周から $2$ 周に広がったこと。$2$ 周まわると、同じ高さの点を何回通る？",
        },
        {
          layer: 2,
          text: "step1 で見つけた $2$ 解に、もう $1$ 周ぶん（$2\\pi$ を足したもの）を加えるだけ。ひと回りすると同じ点に戻るから、$\\dfrac{\\pi}{6}$ と $\\dfrac{5\\pi}{6}$ のそれぞれに $2\\pi$ を足すと？",
        },
        {
          layer: 3,
          text: "step1 の解 $\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$ は $1$ 周目。$2$ 周目は各々に $2\\pi = \\dfrac{12\\pi}{6}$ を足して $\\dfrac{13\\pi}{6}, \\dfrac{17\\pi}{6}$。よって $4$ 解 $\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{13\\pi}{6}, \\dfrac{17\\pi}{6}$。**範囲が広いほど解は増える**——範囲を外して無限に回れば、解は無数（$+2n\\pi$）になる。だから「範囲を決める」ことが解を有限に絞る鍵。",
        },
      ],
      formulaPreview: "0≤θ<4π：π/6, 5π/6 に +2π した 13π/6, 17π/6 も",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "ここからは不等式です。$0 \\le \\theta < 2\\pi$ で、$\\sin\\theta \\ge \\dfrac{\\sqrt{3}}{2}$ を満たす $\\theta$ の範囲を考えます。その**範囲の両端の角**を答えましょう（$2$ つ、順不同）。",
      answer: Math.PI / 3,
      answerDisplay: "π/3, 2π/3（この間が解）",
      solutionSet: [Math.PI / 3, (Math.PI * 2) / 3],
      unit: "",
      unknownLabel: "sinθ≥√3/2 の範囲の両端（0≤θ<2π）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。step2 は「ちょうどその高さになる角」を点で求めた。今度は「その高さ**以上**」。ちょうどの $2$ 点は同じでも、答えは点でなく、その間の**弧**になりそう？",
        },
        {
          layer: 2,
          text: "step2 で出した $2$ 点が、今度は「境界」になる。高さがその値**以上**なのは、円の上の方の帯——その $2$ 点にはさまれた弧。だから答えは「両端の角」＝step2 と同じ $2$ 角。間が解の範囲。",
        },
        {
          layer: 3,
          text: "等号 $\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$ の解は step2 の $\\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}$。高さがそれ**以上**になるのは、この $2$ 点にはさまれた上側の弧、つまり $\\dfrac{\\pi}{3} \\le \\theta \\le \\dfrac{2\\pi}{3}$。方程式の答えは「点」、不等式の答えは「弧（区間）」——両端の角は $\\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}$。",
        },
      ],
      formulaPreview: "sinθ≥√3/2 → 境界 π/3, 2π/3 の間の弧",
      figureMarker: "<<UNIT_CIRCLE_ARC>>",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$0 \\le \\theta < 2\\pi$ で、$\\cos\\theta \\le \\dfrac{1}{2}$ を満たす $\\theta$ の範囲の**両端の角**を答えましょう（$2$ つ、順不同）。",
      answer: Math.PI / 3,
      answerDisplay: "π/3, 5π/3（この間が解）",
      solutionSet: [Math.PI / 3, (Math.PI * 5) / 3],
      unit: "",
      unknownLabel: "cosθ≤1/2 の範囲の両端（0≤θ<2π）",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やり方は同じ「まず境界（等号）の $2$ 角を出し、間の弧を見る」。変わったのは $\\sin$ から $\\cos$（横）へ、そして「以上」でなく「以下」。境界の $2$ 角はどこ？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、読むのが横（$\\cos$）で、向きが「以下」なこと。境界 $\\cos\\theta = \\dfrac{1}{2}$ は step3 で出した $2$ 角。横の位置がその値**以下**（＝より左）なのは、その $2$ 角にはさまれた左側の広い弧。両端は？",
        },
        {
          layer: 3,
          text: "境界 $\\cos\\theta = \\dfrac{1}{2}$ の解は $\\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$（step3）。横の位置がそれ**以下**なのは、この $2$ 角にはさまれた左まわりの弧 $\\dfrac{\\pi}{3} \\le \\theta \\le \\dfrac{5\\pi}{3}$。両端の角は $\\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$。前題と同じ「境界→間の弧」を、$\\cos$・以下で繰り返した。",
        },
      ],
      formulaPreview: "cosθ≤1/2 → 境界 π/3, 5π/3 の間（左側）の弧",
      inputAffordances: ["pi", "multi"],
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げの総合問題です。$0 \\le \\theta < 2\\pi$ で、$2\\cos\\theta + \\sqrt{2} \\le 0$ を満たす $\\theta$ の範囲の**両端の角**を答えましょう（$2$ つ、順不同）。",
      answer: (Math.PI * 3) / 4,
      answerDisplay: "3π/4, 5π/4（この間が解）",
      solutionSet: [(Math.PI * 3) / 4, (Math.PI * 5) / 4],
      unit: "",
      unknownLabel: "2cosθ+√2≤0 の範囲の両端（0≤θ<2π）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。不等式を解くのは同じ。ただし今回は $\\cos$ がむき出しでなく、係数と数がくっついている。まず前題の形（$\\cos\\theta \\le$ 何か）に整えられそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「先に式を整理する」ひと手間が要ること。$2\\cos\\theta + \\sqrt{2} \\le 0$ を、$\\cos\\theta$ だけが残るように移項して割る。整理できれば、あとは前題と同じ「境界の $2$ 角→間の弧」。整理するとどんな不等式？",
        },
        {
          layer: 3,
          text: "$2\\cos\\theta + \\sqrt{2} \\le 0$ を整理：$2\\cos\\theta \\le -\\sqrt{2}$、両辺 $\\div 2$ で $\\cos\\theta \\le -\\dfrac{1}{\\sqrt{2}}$。境界 $\\cos\\theta = -\\dfrac{1}{\\sqrt{2}}$ は $135° = \\dfrac{3\\pi}{4}$ と $225° = \\dfrac{5\\pi}{4}$。横の位置がそれ以下（より左）なのは、その間の左側の弧 $\\dfrac{3\\pi}{4} \\le \\theta \\le \\dfrac{5\\pi}{4}$。両端は $\\dfrac{3\\pi}{4}, \\dfrac{5\\pi}{4}$。「式を整理」＋「不等式を弧で読む」の複合。",
        },
      ],
      formulaPreview: "2cosθ+√2≤0 → cosθ≤−1/√2 → 境界 3π/4, 5π/4",
      inputAffordances: ["pi", "multi"],
    },
  ],
  derivation: `**中心の問い** ｜ 『角→値』を逆にして『値→角』を求めるには？ $\\sin\\theta = \\dfrac{1}{2}$ になる点は [単位円] のどこ？ 範囲を決めると解が絞れ、決めなければ無数にある——のはなぜ？

────────

**系列1・2は「角 → 値」。三角方程式はその矢印を逆に読む。**

系列1では角から [単位円] の座標を読み（$\\sin\\theta = P$ の $y$ 座標）、系列2ではその角を [弧度法] で測りました。三角方程式は逆で、**値が先に決まっていて、その値になる角（＝ $P$ の場所）を探します**。

<<UNIT_CIRCLE_STEP1>>

**なぜ $1$ つの値から $2$ つの角が出るのか**：$\\sin\\theta = \\dfrac{1}{2}$ は「高さ $\\dfrac{1}{2}$ の横線」。この線は円と $2$ 点で交わります（第 $1$ 象限と第 $2$ 象限）。だから $\\dfrac{\\pi}{6}$ と $\\dfrac{5\\pi}{6}$。

**関数ごとに対称の軸が違う**（Step 1〜5）：

| 方程式 | 探し方 | 対称 | 解の例（$0 \\le \\theta < 2\\pi$） |
|---|---|---|---|
| $\\sin\\theta = k$ | 高さ（$y$）の横線 | 左右（$y$ 軸） | $\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$ |
| $\\cos\\theta = k$ | 横（$x$）の縦線 | 上下（$x$ 軸） | $\\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$ |
| $\\tan\\theta = k$ | 原点を通る傾き $k$ の直線 | 原点対称（$\\pi$ ごと） | $\\dfrac{\\pi}{3}, \\dfrac{4\\pi}{3}$ |

**逆の逆**（Step 6）：解の角が分かっていれば、その点の座標を読んで右辺の値に戻せる（$\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4} \\Rightarrow \\sin\\theta = \\dfrac{1}{\\sqrt{2}}$）。行きも帰りも [単位円] の同じ図。

**範囲が解の個数を決める**（Step 7・中心の問いの核心）：

$\\sin\\theta = \\dfrac{1}{2}$ の解は、$0 \\le \\theta < 2\\pi$ なら $2$ つ、$0 \\le \\theta < 4\\pi$ なら $4$ つ。ひと回り（$2\\pi$）ごとに同じ点に戻るからです。**範囲を外して何周でも回れば、解は無数**になります：

$$\\theta = \\dfrac{\\pi}{6} + 2n\\pi, \\quad \\dfrac{5\\pi}{6} + 2n\\pi \\quad (n \\text{ は整数})$$

これを**一般解**と呼びます（$+2n\\pi$）。無数にある解を有限に絞るために「$0 \\le \\theta < 2\\pi$」のような**範囲**を決める——これが三角方程式の作法。

**不等式は「点」でなく「弧」**（Step 8〜10・質的変化）：

$\\sin\\theta \\ge \\dfrac{\\sqrt{3}}{2}$ の答えは、点ではなく **$2$ つの境界にはさまれた弧（区間）** $\\dfrac{\\pi}{3} \\le \\theta \\le \\dfrac{2\\pi}{3}$。解き方は「まず等号の境界を求め、その間の弧を読む」。$2\\cos\\theta + \\sqrt{2} \\le 0$ のように係数がついても、$\\cos\\theta \\le -\\dfrac{1}{\\sqrt{2}}$ に整理すれば同じ手が効きます。

────────

**もっと深く** — 三角方程式が開く世界

**周期性の顔**：解が $+2n\\pi$ で無数に並ぶのは、三角関数が周期 $2\\pi$ を持つから。方程式の「無数の解」は、波が同じ高さを何度も通ることの言い換えです。

**合成・加法定理へ**：$\\sin\\theta + \\cos\\theta = 1$ のような式も、加法定理や合成（$r\\sin(\\theta + \\alpha)$ の形）を使えば、結局「$\\sin(\\text{何か}) = k$」の三角方程式に帰着します。

**波の制御**：交流回路・音・振動で「ある大きさ以上になる時間帯」を求めるのは、まさに三角不等式（弧を求める問題）。

────────

**問いに戻ると**

「値→角はどう求め、なぜ範囲で解が変わるのか？」——値は [単位円] 上の「横線・縦線・傾きの直線」に対応し、それが円と交わる点が角。$\\sin$ は左右・$\\cos$ は上下・$\\tan$ は原点対称に $2$ 点を生む。ひと回りごとに解が増えるので、範囲を決めなければ $+2n\\pi$ で無数——だから「$0 \\le \\theta < 2\\pi$」と枠を決めて有限に絞る。不等式なら答えは点でなく弧。すべては系列1で作った [単位円] の逆読みです。`,
};

/** TRIG4: 三角関数の相互関係（1 点を縛る恒等式）。
 *  系列1（単位円上の点 (cosθ, sinθ)）＋円の方程式 x²+y²=1（図形と方程式・三平方）が土台。
 *  1 つの値（と象限）から残り 2 つが決まる——恒等式が自由度を縛る体験。
 *  背骨: docs/trig_continuation_series_design_fable.md §2（Fable 5 設計・Fable 5 実装）。 */
export const TRIG_IDENTITY_SERIES: LearnerSeries = {
  id: "trig_identity_01",
  title: "三角関数の相互関係（1つ分かれば残りが決まる）",
  subtitle:
    "数Ⅱ・B 三角関数より — $\\sin^2\\theta + \\cos^2\\theta = 1$ が sin・cos・tan を縛る。象限の符号推理・対称式・方程式への応用まで $10$ 問。",
  patternId: "TRIG4",
  unit: "algebra_2",
  revelationLabel:
    "sin・cos・tan は単位円上の 1 点の 3 つの読み方——1 つ決まれば $\\sin^2\\theta+\\cos^2\\theta=1$ の縛りで残りも決まる（符号は象限が選ぶ）",
  drivingQuestion:
    "$\\sin$・$\\cos$・$\\tan$ のうち $1$ つの値（と象限）を知っただけで、残り $2$ つまで決まってしまうのはなぜ？——$3$ つは別々の量ではなく、単位円上のたった $1$ 点を $3$ 通りに読んだものだとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\theta$ は第 $1$ 象限の角で、$\\sin\\theta = \\dfrac{3}{5}$ とします。$\\cos\\theta$ はいくつでしょう？（三角関数表は使わず、[単位円] の点の座標から考えてみよう）",
      answer: 0.8,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "cosθ（sinθ=3/5・第1象限）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列1でやったように、[単位円] 上の点 $P$ の座標は $(\\cos\\theta, \\sin\\theta)$。ところで $P$ は半径 $1$ の円の上にいる——円の上の点の $x$ 座標と $y$ 座標は、いつも**ある式**を満たしていたね（[三平方の定理] の形）。それは何？",
        },
        {
          layer: 2,
          text: "$P$ から $x$ 軸に垂線を下ろすと、横 $\\cos\\theta$・縦 $\\sin\\theta$・斜辺 $1$ の直角三角形ができる。三平方の定理をこの $3$ 辺に当てはめると、$\\sin\\theta$ と $\\cos\\theta$ の間にどんな約束が生まれる？",
        },
        {
          layer: 3,
          text: "三平方の定理より $\\cos^2\\theta + \\sin^2\\theta = 1^2$、つまり $\\sin^2\\theta + \\cos^2\\theta = 1$。$\\sin\\theta = \\dfrac{3}{5}$ を入れると $\\cos^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$。第 $1$ 象限なので $\\cos\\theta > 0$、よって $\\cos\\theta = \\dfrac{4}{5}$。$\\sin$ が決まると $\\cos$ は（符号を除き）自動的に決まる——これが相互関係の第 $1$ の式。",
        },
      ],
      formulaPreview: "sin²θ+cos²θ=1 → cos²θ = 1 − 9/25 = 16/25 → cosθ = 4/5",
      figureMarker: "<<UNIT_CIRCLE_IDENTITY>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\theta$ は第 $1$ 象限の角で、$\\cos\\theta = \\dfrac{2}{3}$ とします。$\\sin\\theta$ はいくつでしょう？",
      answer: Math.sqrt(5) / 3,
      answerDisplay: "√5/3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sinθ（cosθ=2/3・第1象限）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う『縛り』は同じ。変わったのは、分かっているのが $\\sin$ でなく $\\cos$ になったことだけ。前題で生まれた式は、どちらが分かっていても同じように使えそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「分かっている方が $\\cos$」の $1$ 点だけ。$\\sin^2\\theta = 1 - \\cos^2\\theta$ と引く向きを変えれば、前題とまったく同じ手が使える。今回は根号が残るよ。",
        },
        {
          layer: 3,
          text: "前題と同じ縛り $\\sin^2\\theta + \\cos^2\\theta = 1$ に $\\cos\\theta = \\dfrac{2}{3}$ を入れる：$\\sin^2\\theta = 1 - \\dfrac{4}{9} = \\dfrac{5}{9}$。第 $1$ 象限なので $\\sin\\theta > 0$、よって $\\sin\\theta = \\dfrac{\\sqrt{5}}{3}$。きれいに開かない値でも、根号のまま堂々と答えてよい。",
        },
      ],
      formulaPreview: "sin²θ = 1 − 4/9 = 5/9 → sinθ = √5/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "引き続き、$\\theta$ は第 $1$ 象限の角で $\\cos\\theta = \\dfrac{2}{3}$（前題と同じ）。今度は $\\tan\\theta$ まで求めましょう。",
      answer: Math.sqrt(5) / 2,
      answerDisplay: "√5/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "tanθ（cosθ=2/3・第1象限）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\sin\\theta$ はもう手に入っている。あと $1$ 歩で $\\tan$ に届く——系列1で $\\tan\\theta$ は「$OP$ の傾き」＝何と何の比だった？",
        },
        {
          layer: 2,
          text: "前題に「$\\tan$ まで進む」の $1$ 歩が加わっただけ。傾きは 縦 ÷ 横、つまり $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$——これが相互関係の第 $2$ の式。前題の $\\sin\\theta$ をそのまま割り算に使おう。",
        },
        {
          layer: 3,
          text: "前題で $\\sin\\theta = \\dfrac{\\sqrt{5}}{3}$。第 $2$ の式 $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ に入れると $\\tan\\theta = \\dfrac{\\sqrt{5}/3}{2/3} = \\dfrac{\\sqrt{5}}{2}$。分母の $3$ が約分で消える。$1$ つの値から、縛りを $2$ 本使って $3$ つとも決まった。",
        },
      ],
      formulaPreview: "tanθ = sinθ/cosθ = (√5/3)/(2/3) = √5/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "今度は象限が変わります。$\\theta$ は**第 $2$ 象限**の角で、$\\sin\\theta = \\dfrac{12}{13}$ とします。$\\cos\\theta$ はいくつでしょう？（符号に注意）",
      answer: -5 / 13,
      answerDisplay: "−5/13",
      unit: "",
      unknownLabel: "cosθ（sinθ=12/13・第2象限）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。計算の型はまったく同じ。でも今回の $P$ は第 $2$ 象限（左上）にいる。左上の点の $x$ 座標——$\\cos\\theta$ の符号は、step1 と同じでいい？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは象限だけ。$\\cos^2\\theta$ を出すところまでは同じ手。最後の「$\\pm$ のどちらを選ぶか」だけが新しい仕事で、それを決めるのは式でなく**象限**。第 $2$ 象限の $x$ 座標は正？負？",
        },
        {
          layer: 3,
          text: "step1 と同じく $\\cos^2\\theta = 1 - \\left(\\dfrac{12}{13}\\right)^2 = 1 - \\dfrac{144}{169} = \\dfrac{25}{169}$。ここで $\\cos\\theta = \\pm\\dfrac{5}{13}$ の二択になるが、第 $2$ 象限（左上）の点は $x$ 座標が負。よって $\\cos\\theta = -\\dfrac{5}{13}$。**式は大きさまでしか決めない。符号は象限が選ぶ**——ここが相互関係の質的な転換点。",
        },
      ],
      formulaPreview: "cos²θ = 1 − 144/169 = 25/169 → 第2象限で cosθ = −5/13",
      figureMarker: "<<UNIT_CIRCLE_Q2>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\theta$ は**第 $4$ 象限**の角で、$\\cos\\theta = \\dfrac{15}{17}$ とします。$\\sin\\theta$ はいくつでしょう？",
      answer: -8 / 17,
      answerDisplay: "−8/17",
      unit: "",
      unknownLabel: "sinθ（cosθ=15/17・第4象限）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「大きさは式・符号は象限」。変わったのは象限が第 $4$（右下）で、与えられたのが $\\cos$ なこと。右下の点の $y$ 座標の符号は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは象限が第 $2$ から第 $4$ に移っただけ（計算の型は同じ）。第 $4$ 象限（右下）では $x$ 座標が正・$y$ 座標が負——今回求める $\\sin\\theta$ は $y$ 座標の側だね。",
        },
        {
          layer: 3,
          text: "$\\sin^2\\theta = 1 - \\left(\\dfrac{15}{17}\\right)^2 = 1 - \\dfrac{225}{289} = \\dfrac{64}{289}$ より $\\sin\\theta = \\pm\\dfrac{8}{17}$。第 $4$ 象限（右下）の点は $y$ 座標が負なので $\\sin\\theta = -\\dfrac{8}{17}$。前題と同じ「二択を象限が決める」を、別の象限で繰り返した。",
        },
      ],
      formulaPreview: "sin²θ = 1 − 225/289 = 64/289 → 第4象限で sinθ = −8/17",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "向きを逆にします。$\\theta$ は**第 $3$ 象限**の角で、$\\tan\\theta = 2$ とします。$\\cos\\theta$ はいくつでしょう？（$\\sin$ を経由しない近道があります）",
      answer: -1 / Math.sqrt(5),
      answerDisplay: "−1/√5",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cosθ（tanθ=2・第3象限）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。step3 は $\\cos$ から $\\tan$ へ進んだ。今度はその**逆向き**——$\\tan$ から $\\cos$ へ戻る。$\\sin$ を経由して戻ってもいいけれど、$\\tan$ と $\\cos$ を**直接**つなぐ縛りがもう $1$ 本作れたら近道になる。step1 の縛りから、それは作れないかな？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは矢印の向きだけ（$\\tan$ → $\\cos$）。$\\sin^2\\theta + \\cos^2\\theta = 1$ の両辺を $\\cos^2\\theta$ で割ると $\\tan^2\\theta + 1 = \\dfrac{1}{\\cos^2\\theta}$——第 $3$ の式。$\\tan\\theta = 2$ を入れれば $\\cos^2\\theta$ が直接出る。最後の符号は第 $3$ 象限が決める。",
        },
        {
          layer: 3,
          text: "第 $3$ の式 $1 + \\tan^2\\theta = \\dfrac{1}{\\cos^2\\theta}$ に $\\tan\\theta = 2$ を入れる：$1 + 4 = 5 = \\dfrac{1}{\\cos^2\\theta}$、つまり $\\cos^2\\theta = \\dfrac{1}{5}$。第 $3$ 象限（左下）の $x$ 座標は負なので $\\cos\\theta = -\\dfrac{1}{\\sqrt{5}}$。step3 の「$\\cos$→$\\tan$」を逆走するときは、第 $3$ の式が近道になる。",
        },
      ],
      formulaPreview: "1+tan²θ = 1/cos²θ → 1+4=5 → cos²θ=1/5 → 第3象限で cosθ = −1/√5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\theta$ は**第 $2$ 象限**の角で、$\\tan\\theta = -\\dfrac{1}{2}$ とします。$\\sin\\theta$ はいくつでしょう？",
      answer: 1 / Math.sqrt(5),
      answerDisplay: "1/√5",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sinθ（tanθ=−1/2・第2象限）",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「$\\tan$ から出発して戻る」向き。変わったのは、最後にたどり着きたいのが $\\cos$ でなく $\\sin$ なこと。前題の道（第 $3$ の式で $\\cos$）を通ったあと、もう $1$ 歩でどう $\\sin$ に届く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは行き先が $\\sin$ になった $1$ 点。まず前題と同じ手で $\\cos\\theta$ を出し、それから第 $2$ の式を逆に使う——$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ を変形すると $\\sin\\theta = \\tan\\theta \\times \\cos\\theta$。",
        },
        {
          layer: 3,
          text: "前題と同じく $1 + \\tan^2\\theta = 1 + \\dfrac{1}{4} = \\dfrac{5}{4} = \\dfrac{1}{\\cos^2\\theta}$ より $\\cos^2\\theta = \\dfrac{4}{5}$。第 $2$ 象限で $\\cos\\theta < 0$ だから $\\cos\\theta = -\\dfrac{2}{\\sqrt{5}}$。次に $\\sin\\theta = \\tan\\theta \\times \\cos\\theta = \\left(-\\dfrac{1}{2}\\right) \\times \\left(-\\dfrac{2}{\\sqrt{5}}\\right) = \\dfrac{1}{\\sqrt{5}}$。第 $2$ 象限で $\\sin\\theta > 0$ とも合っている——検算まで象限が働く。",
        },
      ],
      formulaPreview: "cos²θ=4/5 → cosθ=−2/√5 → sinθ = tanθ×cosθ = 1/√5",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "使い方が変わります。$\\sin\\theta + \\cos\\theta = \\dfrac{1}{3}$ のとき、$\\sin\\theta\\cos\\theta$ の値はいくつでしょう？（$\\sin\\theta$ と $\\cos\\theta$ を別々に求めない近道があります）",
      answer: -4 / 9,
      answerDisplay: "−4/9",
      unit: "",
      unknownLabel: "sinθcosθ（sinθ+cosθ=1/3）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 からずっと使ってきた縛りは、ここまで「値を入れて使う式」だった。今度は与えられたのが**和** $\\sin\\theta + \\cos\\theta$ で、求めたいのは**積**。和の式から、いつもの縛りが顔を出す形へ持ち込むには、両辺にどんな操作をしたら良さそう？",
        },
        {
          layer: 2,
          text: "新しいのは「与式を**両辺 $2$ 乗する**」の $1$ 手だけ。$(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta$——展開の中に、いつもの $\\sin^2\\theta + \\cos^2\\theta$ が現れる。それは $1$ に置き換えられるね。",
        },
        {
          layer: 3,
          text: "両辺を $2$ 乗：$(\\sin\\theta + \\cos\\theta)^2 = \\left(\\dfrac{1}{3}\\right)^2 = \\dfrac{1}{9}$。左辺を展開すると $\\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta = 1 + 2\\sin\\theta\\cos\\theta$。よって $1 + 2\\sin\\theta\\cos\\theta = \\dfrac{1}{9}$、$\\sin\\theta\\cos\\theta = \\dfrac{1}{2}\\left(\\dfrac{1}{9} - 1\\right) = -\\dfrac{4}{9}$。**恒等式は代入先ではなく、式の中に「見つけて」$1$ に置き換える道具にもなる**。",
        },
      ],
      formulaPreview: "(sinθ+cosθ)² = 1 + 2sinθcosθ = 1/9 → sinθcosθ = −4/9",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "条件を足します。$0 < \\theta < \\pi$ で $\\sin\\theta + \\cos\\theta = \\dfrac{1}{3}$ のとき、$\\sin\\theta - \\cos\\theta$ の値はいくつでしょう？（前題の結果 $\\sin\\theta\\cos\\theta = -\\dfrac{4}{9}$ が使えます）",
      answer: Math.sqrt(17) / 3,
      answerDisplay: "√17/3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sinθ−cosθ（0<θ<π・sinθ+cosθ=1/3）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。求めるものが**和**でなく**差**に変わった。前題で効いた手は、差の形でもそのまま効きそう？ ただし最後に $\\pm$ の二択が残る——それを決める材料として、今回は範囲が足されているよ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$2$ 乗をほどくときの符号決定」が加わったこと。$(\\sin\\theta - \\cos\\theta)^2 = 1 - 2\\sin\\theta\\cos\\theta$ で大きさは出る。符号は：前題の $\\sin\\theta\\cos\\theta = -\\dfrac{4}{9} < 0$ と範囲 $0 < \\theta < \\pi$（$\\sin\\theta > 0$）から、$\\cos\\theta$ の符号が分かる——すると $\\sin\\theta - \\cos\\theta$ は正？負？",
        },
        {
          layer: 3,
          text: "$(\\sin\\theta - \\cos\\theta)^2 = 1 - 2\\sin\\theta\\cos\\theta = 1 + \\dfrac{8}{9} = \\dfrac{17}{9}$ より $\\sin\\theta - \\cos\\theta = \\pm\\dfrac{\\sqrt{17}}{3}$。符号：$0 < \\theta < \\pi$ で $\\sin\\theta > 0$、かつ積 $\\sin\\theta\\cos\\theta < 0$ だから $\\cos\\theta < 0$。正 − 負 ＝ 正なので $\\sin\\theta - \\cos\\theta = \\dfrac{\\sqrt{17}}{3}$。step4 で学んだ「符号は範囲（象限）が選ぶ」が、対称式の世界でも同じに働く。",
        },
      ],
      formulaPreview: "(sinθ−cosθ)² = 1 − 2sinθcosθ = 17/9 → 0<θ<π で ＋√17/3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げは方程式との合流です。$0 \\le \\theta < 2\\pi$ で、$2\\cos^2\\theta + 3\\sin\\theta - 3 = 0$ を満たす $\\theta$ を**すべて**求めましょう（複数あるので「,」で区切って）。",
      answer: Math.PI / 6,
      answerDisplay: "π/6, π/2, 5π/6",
      solutionSet: [Math.PI / 6, Math.PI / 2, (Math.PI * 5) / 6],
      inputAffordances: ["pi", "multi"],
      unit: "",
      unknownLabel: "2cos²θ+3sinθ−3=0 の解（0≤θ<2π）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "この式には $\\cos$ と $\\sin$ が混ざっている。混ざったままでは [三角方程式] の型に持ち込めない。step1 から使ってきた縛りで、片方をもう片方の言葉に**言い換える**ことはできない？",
        },
        {
          layer: 2,
          text: "新しいのは「相互関係で $1$ 種類に統一してから解く」こと。$\\cos^2\\theta = 1 - \\sin^2\\theta$ で置き換えると、式は $\\sin\\theta$ だけの $2$ 次方程式になる。因数分解して $\\sin\\theta = k$ の形を $2$ つ作れば、あとは [三角方程式] でやった単位円の逆読み。",
        },
        {
          layer: 3,
          text: "$\\cos^2\\theta = 1 - \\sin^2\\theta$ を代入：$2(1 - \\sin^2\\theta) + 3\\sin\\theta - 3 = 0$ を整理して $2\\sin^2\\theta - 3\\sin\\theta + 1 = 0$。因数分解 $(2\\sin\\theta - 1)(\\sin\\theta - 1) = 0$ より $\\sin\\theta = \\dfrac{1}{2}$ または $\\sin\\theta = 1$。単位円の逆読み（[三角方程式]）で、$\\sin\\theta = \\dfrac{1}{2}$ は $\\theta = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$、$\\sin\\theta = 1$ は $\\theta = \\dfrac{\\pi}{2}$。よって $\\dfrac{\\pi}{6}, \\dfrac{\\pi}{2}, \\dfrac{5\\pi}{6}$。「相互関係で統一」＋「三角方程式の逆読み」の複合。",
        },
      ],
      formulaPreview:
        "cos²θ=1−sin²θ → 2sin²θ−3sinθ+1=0 → (2sinθ−1)(sinθ−1)=0 → π/6, π/2, 5π/6",
    },
  ],
  derivation: `**中心の問い** ｜ $\\sin$・$\\cos$・$\\tan$ のうち $1$ つの値（と象限）を知っただけで、残り $2$ つまで決まってしまうのはなぜ？——$3$ つは別々の量ではなく、[単位円] 上のたった $1$ 点を $3$ 通りに読んだものだとしたら？

────────

**$3$ つの関数は、$1$ つの点の $3$ つの読み方。**

系列1で見たとおり、角 $\\theta$ に対応する [単位円] 上の点 $P$ の座標は $(\\cos\\theta, \\sin\\theta)$、直線 $OP$ の傾きが $\\tan\\theta$ でした。つまり $\\sin$・$\\cos$・$\\tan$ は独立な $3$ つの量ではなく、**たった $1$ 点 $P$ を「高さ」「横」「傾き」の $3$ 通りに読んだもの**。$1$ 点しか自由がないのだから、$3$ つの値は勝手には動けません。その「縛り」を式にしたのが相互関係です。

<<UNIT_CIRCLE_IDENTITY>>

**第 $1$ の式**——$P$ は半径 $1$ の円の上にいる。$P$ から $x$ 軸へ垂線を下ろすと、横 $\\cos\\theta$・縦 $\\sin\\theta$・斜辺 $1$ の直角三角形ができるので、[三平方の定理] から

$$\\sin^2\\theta + \\cos^2\\theta = 1$$

（これは円の方程式 $x^2 + y^2 = 1$ に $x = \\cos\\theta,\\ y = \\sin\\theta$ を入れたものでもあります——図形と方程式との合流点。）

**第 $2$ の式**——傾きは 縦 ÷ 横：

$$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$$

**第 $3$ の式**——第 $1$ の式の両辺を $\\cos^2\\theta$ で割ると、$\\tan$ と $\\cos$ を直接つなぐ形が生まれます：

$$1 + \\tan^2\\theta = \\dfrac{1}{\\cos^2\\theta}$$

**ここが胚細胞**：恒等式とは「いつでも成り立つ式」。いつでも成り立つからこそ、**自由度を縛る**。$1$ つの値が決まった瞬間、残りは（符号の二択を除いて）自動的に決まる——$3$ つの式は「公式」というより、単位円上の $1$ 点という事実の $3$ つの言い換えです。

**Step 1〜3：第 $1$ 象限で、縛りの使い方を身につける**

$\\sin\\theta = \\dfrac{3}{5}$ から $\\cos\\theta = \\dfrac{4}{5}$（第 $1$ の式）、$\\cos\\theta = \\dfrac{2}{3}$ から $\\sin\\theta = \\dfrac{\\sqrt{5}}{3}$、さらに $\\tan\\theta = \\dfrac{\\sqrt{5}}{2}$（第 $2$ の式を継ぎ足す）。

**Step 4〜5：式は大きさまで、符号は象限が選ぶ（質的変化）**

$2$ 乗をほどくと必ず $\\pm$ の二択が残ります。それを決めるのは式ではなく **$P$ がどの象限にいるか**：

| 象限 | $\\sin\\theta$（$y$） | $\\cos\\theta$（$x$） | $\\tan\\theta$（傾き） |
|---|---|---|---|
| 第 $1$ | $+$ | $+$ | $+$ |
| 第 $2$ | $+$ | $-$ | $-$ |
| 第 $3$ | $-$ | $-$ | $+$ |
| 第 $4$ | $-$ | $+$ | $-$ |

第 $2$ 象限で $\\sin\\theta = \\dfrac{12}{13}$ なら $\\cos\\theta = -\\dfrac{5}{13}$。「$1$ つの値**と象限**」が揃って、はじめて残りが一意に決まる——中心の問いの（と象限）はここで効いています。

**Step 6〜7：逆走には第 $3$ の式（逆）**

$\\tan\\theta = 2$ から $\\cos\\theta$ へ戻るときは、$1 + \\tan^2\\theta = \\dfrac{1}{\\cos^2\\theta}$ が近道（$\\sin$ を経由しない）。そこから $\\sin\\theta = \\tan\\theta \\times \\cos\\theta$ で $\\sin$ にも届く。$3$ 本の縛りは、どの向きにも歩ける道路網です。

**Step 8〜9：恒等式を「見つけて置き換える」（質的変化）**

$\\sin\\theta + \\cos\\theta = \\dfrac{1}{3}$ を**両辺 $2$ 乗**すると、展開の中に $\\sin^2\\theta + \\cos^2\\theta$ が現れ、$1$ に置き換えられます：$1 + 2\\sin\\theta\\cos\\theta = \\dfrac{1}{9}$ より $\\sin\\theta\\cos\\theta = -\\dfrac{4}{9}$。恒等式は「代入する式」から「式の中に見つける式」へ——使い方の質が変わる瞬間。$\\sin\\theta - \\cos\\theta$ では $\\pm$ が残り、範囲 $0 < \\theta < \\pi$ が符号を選びます（Step 4 の原理の再来）。

**Step 10：方程式との合流（複合）**

$2\\cos^2\\theta + 3\\sin\\theta - 3 = 0$ のように $\\sin$ と $\\cos$ が混ざった方程式は、$\\cos^2\\theta = 1 - \\sin^2\\theta$ で **$1$ 種類に統一**すれば、$\\sin\\theta$ の $2$ 次方程式に化けます。因数分解して $\\sin\\theta = \\dfrac{1}{2}, 1$——あとは [三角方程式] の単位円の逆読み。相互関係は、三角方程式の世界を広げる翻訳機でもあります。

────────

**もっと深く** — 「忘れても導ける」ということ

$3$ 本の式は暗記リストではありません。第 $1$ の式は「$P$ が円の上にいる」こと、第 $2$ の式は「傾き＝縦÷横」、第 $3$ の式は「第 $1$ を $\\cos^2\\theta$ で割った」だけ。**忘れても、単位円の絵を描けば $1$ 分で再現できる**——これが「公式を覚える」ことの本当の姿です。

**恒等式が自由度を縛る**という見方は、この先ずっと働きます。$2$ 倍角の $\\cos 2\\theta$ が $3$ つの顔（$\\cos^2\\theta - \\sin^2\\theta$／$1 - 2\\sin^2\\theta$／$2\\cos^2\\theta - 1$）を持てるのも、$\\sin^2\\theta + \\cos^2\\theta = 1$ で互いに化け合えるから。条件式が $1$ 本あれば未知数は $1$ つ減る——数学全体を貫く「条件式の使い方」の、いちばん美しい実例が相互関係です。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 章構成（三角関数の相互関係・象限と符号・方程式への応用）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「$1$ つの値（と象限）で残り $2$ つまで決まるのはなぜ？」——$\\sin$・$\\cos$・$\\tan$ が [単位円] 上の**たった $1$ 点を $3$ 通りに読んだもの**だから。点 $P$ の自由度は角 $\\theta$ の $1$ つぶんしかなく、$\\sin^2\\theta + \\cos^2\\theta = 1$（円の上にいる）・$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$（傾き＝縦÷横）という縛りが $3$ つの値を貫いている。式が決めるのは大きさまで、$\\pm$ の最後の二択は象限が選ぶ。$1$ つの事実の $3$ つの読み——それが相互関係です。`,
};

/** TRIG5: 三角関数のグラフ（円運動→波・4つのつまみ）。
 *  答えはすべて数値（案A・数値読み取り）——現行入力系で回る。図が問題を担い、答えは書かない。
 *  背骨: docs/trig_continuation_series_design_fable.md §3（Fable 5 設計・Fable 5 実装）。 */
export const TRIG_GRAPH_SERIES: LearnerSeries = {
  id: "trig_graph_01",
  title: "三角関数のグラフ（円運動を開くと波になる）",
  subtitle:
    "数Ⅱ・B 三角関数より — 単位円を回る点の高さを開くと波。振幅・周期・位相・上下の $4$ つのつまみであらゆる波を作る $10$ 問。",
  patternId: "TRIG5",
  unit: "algebra_2",
  revelationLabel:
    "円運動を開くと波になる——$a$・$b$・$p$・$q$ の 4 つのつまみが、波の「高さ・細かさ・横ずれ・上下」を独立に決める",
  drivingQuestion:
    "円の上を回る点の高さを、角に沿って開いて写し取ると、なぜ『波』になる？——そして、たった $1$ 本の波 $y=\\sin\\theta$ に『拡大』と『平行移動』のつまみを回すだけで、あらゆる波が作れてしまうのはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "[単位円] を回る点 $P$ の高さ（$y$ 座標）を、回した角 $\\theta$ を横軸にして写し取っていくと、$y = \\sin\\theta$ のグラフ——「波」が現れます。この波は、$\\theta$ がどれだけ進むごとに同じ形をくり返すでしょう？（この長さを [周期] といいます。ラジアンで）",
      answer: 2 * Math.PI,
      answerDisplay: "2π",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=sinθ の周期",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "波のくり返しは、円の上の点の動きから来ている。[単位円] を回る点 $P$ が「元の場所にぴったり戻ってくる」のは、どれだけ回ったとき？ [弧度法] で $1$ 周はいくつだった？",
        },
        {
          layer: 2,
          text: "$P$ が円を $1$ 周すると、高さの変化（上がって、下がって、戻る）がひとそろい終わって、また同じ動きが始まる。つまり波の $1$ くり返し＝円の $1$ 周。$1$ 周はラジアンで？",
        },
        {
          layer: 3,
          text: "円を $1$ 周（$360°$）すると点は元の位置に戻るので、$\\sin\\theta$ の値もそっくり同じ列をくり返す。$1$ 周は [弧度法] で $2\\pi$。だから $y = \\sin\\theta$ の周期は $2\\pi$。**波のくり返しの正体は、円の $1$ 周**——円運動と波は同じものを $2$ つの見方で見ている。",
        },
      ],
      formulaPreview: "円を 1 周 = 2π ごとに同じ高さの列 → 周期 2π",
      figureMarker: "<<TRIG_CIRCLE_TO_WAVE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ波 $y = \\sin\\theta$ を別の場所で読みます。$\\theta \\ge 0$ の範囲で、$y$ が**最初に最大**になるのは $\\theta$ がいくつのときでしょう？",
      answer: Math.PI / 2,
      answerDisplay: "π/2",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=sinθ が最初に最大になる θ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「波を円で読む」考え方がそのまま使える。$\\sin\\theta$＝点 $P$ の高さが**いちばん高くなる**のは、$P$ が円のどこに来たとき？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「くり返しの長さ」でなく「最高点の場所」を読むことだけ。$P$ の高さが最大になるのは円の真上。真上に来るのは、$1$ 周 $2\\pi$ のうちどれだけ回ったとき？",
        },
        {
          layer: 3,
          text: "$P$ の高さが最大（$y = 1$）になるのは円の**真上**に来た瞬間。真上は $1$ 周の $4$ 分の $1$、つまり $\\theta = \\dfrac{\\pi}{2}$。グラフでいえば波の最初の山のてっぺん。円で考えれば、波のどの場所も「$P$ がどこにいるか」で読める。",
        },
      ],
      formulaPreview: "P が真上 = 1/4 周 → θ = π/2 で最大",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "つまみを $1$ つ回します。$y = 4\\sin\\theta$ の**最大値**と**最小値**を、カンマで区切って $2$ つとも答えましょう。",
      answer: 4,
      answerDisplay: "4, −4",
      solutionSet: [4, -4],
      inputAffordances: ["multi"],
      unit: "",
      unknownLabel: "y=4sinθ の最大値と最小値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。波の形は同じで、式に「$4$ 倍」が付いただけ。$\\sin\\theta$ そのものは $-1$ から $1$ まで動くのだった——それを $4$ 倍すると、動く幅はどうなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「高さ全体を $4$ 倍する」つまみが付いたことだけ。円でいえば**半径 $4$ の円**を回る点の高さを写している。てっぺんと底はどこまで届く？",
        },
        {
          layer: 3,
          text: "$-1 \\le \\sin\\theta \\le 1$ の全体を $4$ 倍して $-4 \\le 4\\sin\\theta \\le 4$。よって最大値 $4$・最小値 $-4$。グラフは $y = \\sin\\theta$ を縦に $4$ 倍拡大した波（円でいえば半径 $4$）。この「波の高さ」を [振幅] と呼ぶ——縦のつまみは振幅を変える。",
        },
      ],
      formulaPreview: "−1≤sinθ≤1 を 4 倍 → 最大 4・最小 −4（振幅 4）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "次のつまみです。$y = \\sin 3\\theta$ の [周期] はいくつでしょう？（ラジアンで）",
      answer: (2 * Math.PI) / 3,
      answerDisplay: "2π/3",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=sin3θ の周期",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題のつまみは $\\sin$ の**外**に付いて高さを変えた。今度のつまみは $\\sin$ の**中**——角の側に付いている。中の $3$ 倍は、円を回る点の**何**を $3$ 倍する？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、つまみの場所が「外（高さ）」から「中（角）」へ移ったこと。$\\theta$ が $1$ 周ぶん進む間に、中身の $3\\theta$ は $3$ 周ぶん進む——つまり点は $3$ 倍の速さで回る。速く回ると、$1$ くり返しにかかる長さは長くなる？短くなる？",
        },
        {
          layer: 3,
          text: "中身 $3\\theta$ が $2\\pi$（$1$ 周）に達するのは $\\theta = \\dfrac{2\\pi}{3}$ のとき。つまり波は $\\theta$ が $\\dfrac{2\\pi}{3}$ 進むごとにひとそろい終わる——周期は $\\dfrac{2\\pi}{3}$。**中のつまみ $b$ は「回る速さ」＝周期を $\\dfrac{2\\pi}{b}$ に縮める**。外のつまみ（高さ）とは効く場所が違う。",
        },
      ],
      formulaPreview: "3θ = 2π となるのは θ = 2π/3 → 周期 2π/3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "今度は波が**横に動きます**。$y = \\sin\\left(\\theta - \\dfrac{\\pi}{6}\\right)$ について、$\\theta \\ge 0$ で $y$ が**最初に最大**になる $\\theta$ はいくつでしょう？",
      answer: (2 * Math.PI) / 3,
      answerDisplay: "2π/3",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=sin(θ−π/6) が最初に最大になる θ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2 と比べてみよう。step2 では $\\sin\\theta$ が $\\theta = \\dfrac{\\pi}{2}$ で最大になった。今度は $\\theta$ から少し**引いてから** $\\sin$ に入れる。中身がその値になるのが遅れるぶん、山の位置はどちらへ動く？",
        },
        {
          layer: 2,
          text: "step2 と変わったのは「中身が $\\theta$ でなく $\\theta - \\dfrac{\\pi}{6}$」の $1$ 点だけ。最大になる条件は step2 と同じ「**中身**が $\\dfrac{\\pi}{2}$ になること」。中身 $\\theta - \\dfrac{\\pi}{6}$ が $\\dfrac{\\pi}{2}$ になる $\\theta$ は？",
        },
        {
          layer: 3,
          text: "最大の条件は中身 $= \\dfrac{\\pi}{2}$：$\\theta - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2}$ より $\\theta = \\dfrac{\\pi}{2} + \\dfrac{\\pi}{6} = \\dfrac{2\\pi}{3}$。グラフ全体が**右へ $\\dfrac{\\pi}{6}$ 平行移動**し、山も谷もゼロ点もそっくり同じだけ遅れて来る。この横ずれを [位相] のずれと呼ぶ——二次関数の $y = a(x-p)^2 + q$ で覚えた「引くと右へ動く」が、波でもそのまま生きている。",
        },
      ],
      formulaPreview: "中身 θ−π/6 = π/2 → θ = 2π/3（右へ π/6 ずれた山）",
      figureMarker: "<<TRIG_WAVE_PHASE>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$y = \\sin\\theta + 3$ の**最大値**と**最小値**を、カンマで区切って $2$ つとも答えましょう。",
      answer: 4,
      answerDisplay: "4, 2",
      solutionSet: [4, 2],
      inputAffordances: ["multi"],
      unit: "",
      unknownLabel: "y=sinθ+3 の最大値と最小値",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は「中身から引く」＝横へ動くだった。今度は $\\sin$ の**外に足す**。同じ平行移動の仲間だとしたら、こちらはどちらの向きに動く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、足し引きの場所が「中（横ずれ）」から「外（縦ずれ）」へ移っただけ。波全体が上へ $3$ 持ち上がる。もとの $-1 \\le \\sin\\theta \\le 1$ はどこへ移る？",
        },
        {
          layer: 3,
          text: "$-1 \\le \\sin\\theta \\le 1$ の全体に $3$ を足して $2 \\le \\sin\\theta + 3 \\le 4$。最大値 $4$・最小値 $2$。前題の横ずれ（中に引く）と今回の縦ずれ（外に足す）はどちらも**平行移動**——効く向きが違うだけ。これで $4$ つのつまみ（縦倍率・横倍率・横ずれ・縦ずれ）が出そろった。",
        },
      ],
      formulaPreview: "−1≤sinθ≤1 に +3 → 2 ≤ y ≤ 4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "逆向きに読みます。下の波形は $y = \\sin b\\theta$（$b > 0$）のグラフです。目盛りから [周期] を読み取って、$b$ の値を求めましょう。",
      answer: 2,
      unit: "",
      unknownLabel: "波形から読む b の値",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。step4 は「式の $b$ から周期を出す」向きだった。今度はその**逆**——グラフの周期から $b$ に戻る。まず図の目盛りで、波が $1$ 回くり返す長さはいくつ？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは矢印の向きだけ。step4 で使った関係「周期 $= \\dfrac{2\\pi}{b}$」は、逆向きにも読める。図の波は $0$ から $2\\pi$ までに**ちょうど $2$ 回**くり返している——周期はいくつで、そこから $b$ は？",
        },
        {
          layer: 3,
          text: "図の波は $0$〜$2\\pi$ に $2$ 周期ぶん入っているので、周期は $\\pi$。step4 の関係を逆に使うと $\\pi = \\dfrac{2\\pi}{b}$ より $b = 2$。**式→グラフの規則は、グラフ→式にも同じ $1$ 本で使える**——読む向きが変わっただけ。",
        },
      ],
      formulaPreview: "図の周期 = π → π = 2π/b → b = 2",
      figureMarker: "<<TRIG_WAVE_READING>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$3$ 人目の主役です。$y = \\tan\\theta$ のグラフは、$\\sin$・$\\cos$ の波とは似ていない形になります（下図）。$y = \\tan\\theta$ の [周期] はいくつでしょう？（ラジアンで）",
      answer: Math.PI,
      answerDisplay: "π",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=tanθ の周期",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。$\\sin$ の周期は「点が円を $1$ 周して元に戻る」ことから $2\\pi$ だった。でも $\\tan\\theta$ は点の高さでなく**直線 $OP$ の傾き**（系列1）。点が円を**半周**したとき、直線 $OP$ はどうなっている？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは「読むものが点の高さでなく直線の傾き」なこと。半周（$\\pi$）回ると点は原点の反対側に移るが、原点と結んだ**直線**は元とぴったり重なる——傾きは同じ。だから $\\tan$ のくり返しは $1$ 周より短い。",
        },
        {
          layer: 3,
          text: "$\\theta$ が $\\pi$（半周）進むと点 $P$ は原点対称の位置に移るが、直線 $OP$ は同じ直線のまま——傾き $\\tan\\theta$ は元の値に戻る。だから周期は $2\\pi$ でなく $\\pi$。グラフは $\\dfrac{\\pi}{2}$ の奇数倍の縦の壁（漸近線）には触れずに、同じ形の枝が $\\pi$ ごとにくり返す。**何を読むかが変わると、くり返しの単位まで変わる**。",
        },
      ],
      formulaPreview: "半周 π で直線 OP は同じ直線 → tan の周期 = π",
      figureMarker: "<<TRIG_TAN_GRAPH>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "つまみの重ね技です。$y = 2\\sin\\left(3\\theta - \\dfrac{\\pi}{6}\\right) + 1$ の**最大値**はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "y=2sin(3θ−π/6)+1 の最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step3〜6 で回した $4$ つのつまみが、$1$ つの式に全部乗っている。最大値を知りたいとき、$4$ つのうち**効くつまみと効かないつまみ**がありそう——横倍率と横ずれは、波のてっぺんの高さを変える？",
        },
        {
          layer: 2,
          text: "新しいのは「つまみを見分ける」こと $1$ つだけ。中のつまみ（$3\\theta$ や $-\\dfrac{\\pi}{6}$）は山の**位置**を動かすだけで、山の**高さ**は変えない。高さに効くのは外の $2$ つ——step3 の縦倍率と step6 の縦ずれ。$\\sin$ の最大 $1$ に、外の $2$ つを順に効かせると？",
        },
        {
          layer: 3,
          text: "中身がいくつでも $\\sin(\\text{中身})$ の最大は $1$（中のつまみは山の位置を変えるだけ）。外側を順に効かせて $2 \\times 1 + 1 = 3$。よって最大値 $3$。**中のつまみは横（位置）、外のつまみは縦（高さ）**——$4$ つのつまみは役割分担がはっきりしていて、混ざっても $1$ つずつほどける。",
        },
      ],
      formulaPreview: "sin(中身) の最大 = 1 → 2×1+1 = 3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げに、グラフと [三角方程式] をつなぎます。$0 \\le \\theta \\le \\pi$ で、$y = \\sin 2\\theta$ が $0$ になる $\\theta$ を**すべて**求めましょう（複数あるので「,」で区切って。$0$ も忘れずに）。",
      answer: 0,
      answerDisplay: "0, π/2, π",
      solutionSet: [0, Math.PI / 2, Math.PI],
      inputAffordances: ["pi", "multi"],
      unit: "",
      unknownLabel: "sin2θ=0 の解（0≤θ≤π）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step7 で読んだ波（周期 $\\pi$ の $\\sin 2\\theta$）が、今度は「ゼロ点はどこ？」と問われている。波が $x$ 軸を横切る場所は、$1$ 周期の中に何か所あった？ そして $0 \\le \\theta \\le \\pi$ には何周期ぶん入っている？",
        },
        {
          layer: 2,
          text: "新しいのは「値からゼロ点の θ を逆に求める」こと——[三角方程式]（系列3）の型。$\\sin(\\text{中身}) = 0$ になるのは中身が $0, \\pi, 2\\pi, \\ldots$ のとき。中身は $2\\theta$ で、$\\theta$ の範囲 $0 \\le \\theta \\le \\pi$ を中身の範囲に直すと $2\\theta$ はどこからどこまで動く？",
        },
        {
          layer: 3,
          text: "$0 \\le \\theta \\le \\pi$ のとき中身 $2\\theta$ は $0$〜$2\\pi$ を動く。$\\sin(\\text{中身}) = 0$ になるのは中身 $= 0, \\pi, 2\\pi$。それぞれ $2\\theta = 0, \\pi, 2\\pi$ より $\\theta = 0, \\dfrac{\\pi}{2}, \\pi$。グラフでいえば周期 $\\pi$ の波が $0$〜$\\pi$ の $1$ 周期で $x$ 軸を $3$ 回通る場所。**グラフの読みと [三角方程式] は同じことの $2$ つの顔**。",
        },
      ],
      formulaPreview: "2θ = 0, π, 2π → θ = 0, π/2, π",
    },
  ],
  derivation: `**中心の問い** ｜ 円の上を回る点の高さを、角に沿って開いて写し取ると、なぜ『波』になる？——そして、たった $1$ 本の波 $y=\\sin\\theta$ に『拡大』と『平行移動』のつまみを回すだけで、あらゆる波が作れてしまうのはなぜ？

────────

**円運動と波は、同じものの $2$ つの見方。**

[単位円] を回る点 $P$ の高さ（$y$ 座標）は $\\sin\\theta$ でした（系列1）。角 $\\theta$ を横軸にして、この高さを順に写し取っていくと——上がって、下がって、また戻る——**波**（サインカーブ）が現れます。

<<TRIG_CIRCLE_TO_WAVE>>

波が $2\\pi$ ごとにくり返すのは、点が円を $1$ 周（$= 2\\pi$、[弧度法]）すると元の場所に戻るから。**波の [周期] の正体は、円の $1$ 周**です。$y = \\cos\\theta$ も同じ波で、スタート地点が違うだけ——$\\sin$ の波を左へ $\\dfrac{\\pi}{2}$ ずらすと $\\cos$ の波にぴったり重なります（この「ずれ」の話は、次の性質の系列で単位円側から見直します）。

**$4$ つのつまみ**——$y = a\\sin(b\\theta - c) + d$ には、波を変形するつまみが $4$ つあります：

| つまみ | 場所 | 効き方 | 円の言葉で |
|---|---|---|---|
| $a$（縦倍率） | 外・かける | [振幅]（山の高さ）が $a$ 倍 | 円の**半径**を $a$ にする |
| $b$（横倍率） | 中・かける | [周期] が $\\dfrac{2\\pi}{b}$ に縮む | 回る**速さ**を $b$ 倍にする |
| $p$（横ずれ） | 中・引く | 波全体が右へ $p$ 動く（[位相]） | スタートの合図が $p$ 遅れる |
| $q$（縦ずれ） | 外・足す | 波全体が上へ $q$ 動く | 円の**中心**を持ち上げる |

**ここが胚細胞**：この $4$ つは三角関数の専用品ではありません。二次関数 $y = a(x - p)^2 + q$ で身につけた「かけると拡大・引くと右へ・足すと上へ」という**グラフ変換の言語**が、関数を選ばずそのまま効いている——$y = af(b(x - p)) + q$ の文法は、このあと指数・対数のグラフでも使い回せます。

**Step 1〜2：波を円で読む**。周期 $2\\pi$（$1$ 周）、最初の山は $\\theta = \\dfrac{\\pi}{2}$（真上）。

**Step 3〜6：つまみを $1$ つずつ回す**。$y = 4\\sin\\theta$ は振幅 $4$（半径 $4$ の円）。$y = \\sin 3\\theta$ は $3$ 倍速で回るから周期 $\\dfrac{2\\pi}{3}$。$y = \\sin\\left(\\theta - \\dfrac{\\pi}{6}\\right)$ は山が $\\dfrac{\\pi}{6}$ 遅れて来る（**中身が $\\dfrac{\\pi}{2}$ になる瞬間**が最大——「中身で考える」がすべてのつまみに通じる鍵）。$y = \\sin\\theta + 3$ は全体が $3$ 浮く。

**Step 7：逆読み（グラフ→式）**。目盛りから周期 $\\pi$ を読み、$\\pi = \\dfrac{2\\pi}{b}$ を逆に解いて $b = 2$。式→グラフの規則は $1$ 本の等式だから、どちら向きにも歩けます。

**Step 8：$\\tan$ だけ周期が $\\pi$（質的変化）**。$\\tan\\theta$ は高さでなく**直線 $OP$ の傾き**。半周で点は反対側に移っても、直線は同じ直線——だから半分の $\\pi$ でくり返します。グラフは $\\dfrac{\\pi}{2}$ の奇数倍に立つ**漸近線**（触れない縦の壁）の間に、同じ形の枝が並ぶ形。値域はすべての実数で、$\\sin$・$\\cos$ のような「$-1$〜$1$ の帯」を持ちません。

**Step 9〜10：つまみの重ね技と方程式への橋**。中のつまみは山の**位置**、外のつまみは山の**高さ**——だから最大値は外の $2$ つだけで $2 \\times 1 + 1 = 3$ と読めます。ゼロ点探し（$\\sin 2\\theta = 0$）は、グラフの読みがそのまま [三角方程式]（系列3）になる合流点——**範囲を中身の範囲に直してから**単位円の逆読みをするのがコツです。

────────

**もっと深く** — 波の言語としての三角関数

**単位円が主役、グラフは脇役**：変域つきの最大最小（例：$\\dfrac{\\pi}{4} \\le \\theta \\le \\pi$ での $\\sin\\theta$ の範囲）は、グラフを描くより**単位円の弧のどこを動くか**を見るほうが速くて確実です。グラフの端点の値も、結局は単位円で読むことになるから。

**あらゆる波は $\\sin$ の親戚**：音の高さは周期（振動数）、音の大きさは振幅、ステレオの左右の時間差は位相。交流電流・光・地震波・心電図——周期現象はすべて $a\\sin(b t - c) + d$ の言葉で記述されます。$4$ つのつまみは、世界の波を読むための共通ボキャブラリー。

**この先へ**：$2$ つの波の足し算 $a\\sin\\theta + b\\cos\\theta$ が、また $1$ つの波になる——という驚き（合成）は、この章の最後で待っています。振幅と位相の言葉はそこでもう一度主役になります。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 章構成（三角関数のグラフ・拡大と平行移動・円運動との対応）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「円の高さを開くと、なぜ波になる？」——回る点の高さは、上がって・下がって・$1$ 周で必ず元に戻る。この「必ず戻る」が横軸の上でくり返し模様＝波になる。周期 $2\\pi$ は円の $1$ 周そのもの。「なぜ $4$ つのつまみであらゆる波が作れる？」——波の個性は「高さ・細かさ・横ずれ・上下」の $4$ つで決まり、それぞれ $a$・$b$・$p$・$q$ が独立に受け持つから。しかもこのつまみは二次関数から持ち越した**グラフ変換の言語**——円運動と波、そして関数一般のグラフが、$1$ つの文法でつながりました。`,
};

/** TRIG6: 三角関数の性質・変換公式（単位円の対称性で読み替え）。
 *  4 つの折り返し（x 軸・y 軸・原点・y=x）が角の変換を「符号」と「sin↔cos 入れ替え」に翻訳する。
 *  関数名を答えさせる形は現行入力に無いので、値（分数・√）で問う（背骨 §4 の方針）。
 *  背骨: docs/trig_continuation_series_design_fable.md §4（Fable 5 設計・Fable 5 実装）。 */
export const TRIG_PROPERTY_SERIES: LearnerSeries = {
  id: "trig_property_01",
  title: "三角関数の性質（対称性で読み替える）",
  subtitle:
    "数Ⅱ・B 三角関数より — $-\\theta$・$\\pi\\pm\\theta$・$\\dfrac{\\pi}{2}-\\theta$ を単位円の折り返しで読む。覚えずに導く $10$ 問。",
  patternId: "TRIG6",
  unit: "algebra_2",
  revelationLabel:
    "単位円の 4 つの折り返し（x 軸・y 軸・原点・y=x）が、角の変換を「符号の反転」と「sin↔cos の入れ替え」に翻訳する——覚える公式は 1 つもない",
  drivingQuestion:
    "角は無限にあるのに、覚える値は第 $1$ 象限のひと握りで足りるのはなぜ？——単位円の折り返し（対称）が、角の変換を『符号の反転』と『$\\sin\\leftrightarrow\\cos$ の入れ替え』に翻訳してしまうとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "系列1・2で「$1$ 回転を超えた角は、ぐるっと回って同じ点に戻る」ことを見ました。この見方で、$\\sin\\dfrac{9\\pi}{4}$ の値を求めましょう。",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin(9π/4)",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$\\dfrac{9\\pi}{4}$ は $1$ 周（$2\\pi$）より大きい角。[単位円] の点は $1$ 周すると元に戻るのだった——$1$ 周ぶんを取り除くと、この点はどの角の点と同じ場所にいる？",
        },
        {
          layer: 2,
          text: "$1$ 周は $2\\pi = \\dfrac{8\\pi}{4}$。$\\dfrac{9\\pi}{4}$ からそれを取り除くと残りはいくつ？ その角の $\\sin$ は特別角の表にある値だね。",
        },
        {
          layer: 3,
          text: "$\\dfrac{9\\pi}{4} - 2\\pi = \\dfrac{9\\pi}{4} - \\dfrac{8\\pi}{4} = \\dfrac{\\pi}{4}$。点は $\\dfrac{\\pi}{4}$ と同じ場所なので $\\sin\\dfrac{9\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{1}{\\sqrt{2}}$。式で書けば $\\sin(\\theta + 2\\pi) = \\sin\\theta$——**周期性**。これがこの系列の「読み替え」第 $1$ 号。",
        },
      ],
      formulaPreview: "9π/4 − 2π = π/4 → sin(9π/4) = sin(π/4) = 1/√2",
      figureMarker: "<<UNIT_CIRCLE_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "今度はマイナスの角です。$\\cos\\left(-\\dfrac{\\pi}{3}\\right)$ の値を求めましょう。",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "cos(−π/3)",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は「回りすぎた角」を戻した。今度は「逆回りの角」。$-\\dfrac{\\pi}{3}$ の点は、$+\\dfrac{\\pi}{3}$ の点をどの線で折り返した場所にある？ 折り返しても変わらない座標はどっち？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$1$ 周戻す」でなく「$x$ 軸で折り返す」こと。$-\\theta$ の点は $\\theta$ の点と**上下対称**（$x$ 軸対称）——横の座標（$\\cos$）は同じで、縦（$\\sin$）だけ符号が変わる。今回読むのは横の座標だね。",
        },
        {
          layer: 3,
          text: "$-\\dfrac{\\pi}{3}$ の点は $\\dfrac{\\pi}{3}$ の点を $x$ 軸で折り返した位置。$x$ 座標（$\\cos$）は折り返しで変わらないので $\\cos\\left(-\\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$。式では $\\cos(-\\theta) = \\cos\\theta$（$\\sin(-\\theta) = -\\sin\\theta$、$\\tan(-\\theta) = -\\tan\\theta$）。**折り返しで何が保たれ何が反転するか**を見るだけ。",
        },
      ],
      formulaPreview: "−θ は x 軸対称 → cos はそのまま → cos(−π/3) = 1/2",
    },
    {
      id: "step3",
      position: 3,
      questionText: "$\\sin\\left(-\\dfrac{\\pi}{6}\\right)$ の値を求めましょう。",
      answer: -0.5,
      answerDisplay: "−1/2",
      unit: "",
      unknownLabel: "sin(−π/6)",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「$x$ 軸での折り返し」。変わったのは読む座標が横（$\\cos$）から縦（$\\sin$）になったこと。上下の折り返しで、縦の座標はどうなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは読む座標だけ。$x$ 軸で折り返すと、上にあった点は下へ——縦の座標（$\\sin$）は符号が反転する。$\\sin\\dfrac{\\pi}{6}$ の値に、その反転を効かせると？",
        },
        {
          layer: 3,
          text: "$-\\dfrac{\\pi}{6}$ の点は $\\dfrac{\\pi}{6}$ の点の上下鏡うつし。縦の座標は符号だけ変わるので $\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$。前題（$\\cos$ は不変）と合わせて「$x$ 軸対称：$\\cos$ 保存・$\\sin$ 反転」が揃った。",
        },
      ],
      formulaPreview: "−θ は x 軸対称 → sin は反転 → sin(−π/6) = −1/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "折り返す軸が変わります。$\\cos\\dfrac{5\\pi}{6}$ を、$\\dfrac{5\\pi}{6} = \\pi - \\dfrac{\\pi}{6}$ と見て求めましょう。",
      answer: -Math.sqrt(3) / 2,
      answerDisplay: "−√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos(5π/6)",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "step2・3 と比べてみよう。あちらは $x$ 軸（上下）の折り返しだった。$\\pi - \\theta$ の点は、$\\theta$ の点をどの軸で折り返した場所にある？ 図の $2$ 点の並び方を見てみよう。",
        },
        {
          layer: 2,
          text: "step2 と変わったのは折り返す軸が $x$ 軸から **$y$ 軸**（左右）に移ったこと。左右の折り返しでは、高さ（$\\sin$）が保たれ、横（$\\cos$）の符号が反転する——$x$ 軸対称とちょうど役割が逆だね。",
        },
        {
          layer: 3,
          text: "$\\pi - \\dfrac{\\pi}{6}$ の点は $\\dfrac{\\pi}{6}$ の点の**左右鏡うつし**（$y$ 軸対称）。横の座標は符号だけ変わるので $\\cos\\dfrac{5\\pi}{6} = -\\cos\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$。式では $\\cos(\\pi-\\theta) = -\\cos\\theta$・$\\sin(\\pi-\\theta) = \\sin\\theta$。**どの軸で折るかで、保存と反転の役が入れ替わる**。",
        },
      ],
      formulaPreview: "π−θ は y 軸対称 → cos は反転 → cos(5π/6) = −√3/2",
      figureMarker: "<<TRIG_SYMMETRY_Y_AXIS>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\sin\\dfrac{7\\pi}{6}$ を、$\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ と見て求めましょう。",
      answer: -0.5,
      answerDisplay: "−1/2",
      unit: "",
      unknownLabel: "sin(7π/6)",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\pi$ を「引く」でなく「足す」形になった。$\\pi + \\theta$ の点は、$\\theta$ の点とどんな位置関係？（半周まわった先——折り返しの言葉でいうと何対称？）",
        },
        {
          layer: 2,
          text: "前題と変わったのは対称の種類が $y$ 軸から**原点**に移ったこと。半周先の点は原点をはさんで反対側——横も縦も**両方**符号が反転する。今回読むのは縦（$\\sin$）。",
        },
        {
          layer: 3,
          text: "$\\pi + \\dfrac{\\pi}{6}$ の点は $\\dfrac{\\pi}{6}$ の点の**原点対称**（半周先）。縦も横も符号が反転するので $\\sin\\dfrac{7\\pi}{6} = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$。式では $\\sin(\\pi+\\theta) = -\\sin\\theta$・$\\cos(\\pi+\\theta) = -\\cos\\theta$（両方反転だから $\\tan(\\pi+\\theta) = \\tan\\theta$ は不変——系列5で見た $\\tan$ の周期 $\\pi$ の正体）。",
        },
      ],
      formulaPreview: "π+θ は原点対称 → sin も cos も反転 → sin(7π/6) = −1/2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "逆向きに探します。$0 \\le \\theta < 2\\pi$、$\\theta \\ne \\dfrac{\\pi}{3}$ で、$\\sin\\theta = \\sin\\dfrac{\\pi}{3}$ となる**もう $1$ つの角** $\\theta$ を求めましょう。",
      answer: (2 * Math.PI) / 3,
      answerDisplay: "2π/3",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "sinθ=sin(π/3) のもう 1 つの解",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 と比べてみよう。step4 は「変換した角の値を読む」向きだった。今度は**逆**——「同じ値になる相手の角はどこ？」。$\\sin$ が同じ＝高さが同じ点は、単位円のどこに、どんな対称で並んでいた？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは矢印の向きだけ（値から角へ）。高さが同じ $2$ 点は **$y$ 軸対称**に向かい合う——step4 で使った $\\pi - \\theta$ の関係を、今度は「相手探し」に使えばいい。$\\dfrac{\\pi}{3}$ の相手は？",
        },
        {
          layer: 3,
          text: "高さ（$\\sin$）が同じ点は $y$ 軸対称のペア。$\\dfrac{\\pi}{3}$ の相手は $\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$。よって $\\theta = \\dfrac{2\\pi}{3}$。[三角方程式]（系列3）で「$\\sin$ の解は左右対称に $2$ つ」だったのは、この $\\pi - \\theta$ の対称そのものだった——公式と解の個数が $1$ 本につながる。",
        },
      ],
      formulaPreview: "sin が同じ = y 軸対称 → 相手は π − π/3 = 2π/3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "最大の山場です。$\\sin\\theta = \\dfrac{2}{7}$ のとき、$\\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right)$ の値を求めましょう。（$\\dfrac{2}{7}$ は特別角の値ではありません——でも求められます）",
      answer: 2 / 7,
      answerDisplay: "2/7",
      unit: "",
      unknownLabel: "cos(π/2−θ)（sinθ=2/7）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4・5 と比べてみよう。これまでの折り返しは $x$ 軸・$y$ 軸・原点で、$\\sin$ は $\\sin$ のまま・$\\cos$ は $\\cos$ のままだった。今度の $\\dfrac{\\pi}{2} - \\theta$ は**斜めの直線 $y = x$** での折り返し。この折り返しで、点の $x$ 座標と $y$ 座標には何が起きる？",
        },
        {
          layer: 2,
          text: "新しいのは「座標が**入れ替わる**」こと。$y = x$ で折り返すと点 $(a, b)$ は $(b, a)$ に移る——横だった値が縦に、縦だった値が横になる。つまり $\\dfrac{\\pi}{2} - \\theta$ の点の $x$ 座標（$\\cos$）は、元の点の**どの座標**と同じ？",
        },
        {
          layer: 3,
          text: "$y = x$ での折り返しで座標が入れ替わるので、$\\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right) = \\sin\\theta$（同様に $\\sin\\left(\\dfrac{\\pi}{2} - \\theta\\right) = \\cos\\theta$）。だから値は $\\dfrac{2}{7}$——$\\theta$ が特別角でなくても、**入れ替えの公式だけで答えが出る**。符号の反転しか起こさなかった今までの折り返しと違い、$y = x$ は $\\sin$ と $\\cos$ を入れ替える——ここがこの系列いちばんの質的転換。",
        },
      ],
      formulaPreview: "y=x 折り返しで座標交換 → cos(π/2−θ) = sinθ = 2/7",
      figureMarker: "<<TRIG_SYMMETRY_DIAGONAL>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\cos\\theta = \\dfrac{3}{8}$ のとき、$\\sin\\left(\\dfrac{\\pi}{2} + \\theta\\right)$ の値を求めましょう。",
      answer: 3 / 8,
      answerDisplay: "3/8",
      unit: "",
      unknownLabel: "sin(π/2+θ)（cosθ=3/8）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「$\\dfrac{\\pi}{2}$ がらみの読み替え」。変わったのは引き算が足し算になったこと。$\\dfrac{\\pi}{2} + \\theta = \\dfrac{\\pi}{2} - (-\\theta)$ と見れば、前題の入れ替えと step2 の折り返しの**合わせ読み**にできそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは符号だけ。$\\sin\\left(\\dfrac{\\pi}{2} + \\theta\\right)$ は、前題の入れ替え（$\\sin$ と $\\cos$ が交代）を効かせると $\\cos$ の何かになる。$+\\theta$ と $-\\theta$ の違いは step2・3 の $x$ 軸対称で処理できる——$\\cos$ は $-\\theta$ に強かったね。",
        },
        {
          layer: 3,
          text: "$\\dfrac{\\pi}{2} + \\theta = \\dfrac{\\pi}{2} - (-\\theta)$ と読む。入れ替えで $\\sin\\left(\\dfrac{\\pi}{2} - (-\\theta)\\right) = \\cos(-\\theta)$、さらに $x$ 軸対称で $\\cos(-\\theta) = \\cos\\theta$。よって $\\sin\\left(\\dfrac{\\pi}{2} + \\theta\\right) = \\cos\\theta = \\dfrac{3}{8}$。**知らない変換も、知っている折り返しの組み合わせに分解すれば読める**。",
        },
      ],
      formulaPreview: "π/2+θ = π/2−(−θ) → sin(π/2+θ) = cos(−θ) = cosθ = 3/8",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "変換を重ねます。$\\sin\\theta = \\dfrac{1}{4}$ のとき、$\\sin(\\theta + 3\\pi)$ の値を求めましょう。",
      answer: -0.25,
      answerDisplay: "−1/4",
      unit: "",
      unknownLabel: "sin(θ+3π)（sinθ=1/4）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "step1（$1$ 周取り除く）と step5（半周＝原点対称）を思い出そう。$3\\pi$ はそのどちらでもない大きさ——でも「$1$ 周」と「半周」に**分けられ**そう？",
        },
        {
          layer: 2,
          text: "step5 と変わったのは、足す角が $\\pi$ でなく $3\\pi$ になったこと。$3\\pi = 2\\pi + \\pi$——まず step1 の周期性で $2\\pi$ を取り除けば、残るのは step5 でやった形そのもの。",
        },
        {
          layer: 3,
          text: "$\\sin(\\theta + 3\\pi) = \\sin(\\theta + \\pi + 2\\pi)$。周期性（step1）で $2\\pi$ が消えて $\\sin(\\theta + \\pi)$、原点対称（step5）で $\\sin(\\theta+\\pi) = -\\sin\\theta$。よって $-\\dfrac{1}{4}$。**大きな変換は、基本の折り返しを順に効かせて降ろす**——$2$ 段重ねの読み替え。",
        },
      ],
      formulaPreview: "θ+3π = (θ+π)+2π → sin(θ+π) = −sinθ = −1/4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げです。どんな $\\theta$ でも、$\\sin(\\pi + \\theta) + \\sin(-\\theta) + 2\\sin(\\pi - \\theta)$ の値は**同じ数**になります。その値を求めましょう。",
      answer: 0,
      unit: "",
      unknownLabel: "sin(π+θ)+sin(−θ)+2sin(π−θ) の値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "この式には、この系列で覚えた折り返しが $3$ 種類も同居している。$1$ 項ずつ、どの折り返し（原点・$x$ 軸・$y$ 軸）だったかを思い出して、ぜんぶ $\\sin\\theta$ の言葉に読み替えたら、式はどうなりそう？",
        },
        {
          layer: 2,
          text: "新しいのは「読み替えを**式の簡約**に使う」こと。$\\pi + \\theta$ は原点対称（step5）、$-\\theta$ は $x$ 軸対称（step3）、$\\pi - \\theta$ は $y$ 軸対称（step4——$\\sin$ は保存）。$3$ 項とも $\\sin\\theta$ だけの式に直して足し合わせると？",
        },
        {
          layer: 3,
          text: "$\\sin(\\pi+\\theta) = -\\sin\\theta$（原点対称）、$\\sin(-\\theta) = -\\sin\\theta$（$x$ 軸対称）、$\\sin(\\pi-\\theta) = \\sin\\theta$（$y$ 軸対称・保存）。代入すると $-\\sin\\theta - \\sin\\theta + 2\\sin\\theta = 0$。$\\theta$ が消えて、どんな角でも $0$。**バラバラに見えた項が、折り返しの翻訳で打ち消し合う**——変換公式は式を軽くする道具でもある。",
        },
      ],
      formulaPreview: "−sinθ − sinθ + 2sinθ = 0（θ によらない）",
    },
  ],
  derivation: `**中心の問い** ｜ 角は無限にあるのに、覚える値は第 $1$ 象限のひと握りで足りるのはなぜ？——単位円の折り返し（対称）が、角の変換を『符号の反転』と『$\\sin\\leftrightarrow\\cos$ の入れ替え』に翻訳してしまうとしたら？

────────

**公式は覚えない。折り返しから、その場で導く。**

$\\sin(\\pi - \\theta)$・$\\cos(-\\theta)$・$\\sin\\left(\\dfrac{\\pi}{2} + \\theta\\right)$……この単元は公式の数がやたら多く見えます。でも暗記は要りません。すべては [単位円] の **$4$ つの折り返し**の言い換えだからです。「忘れない」ことより「**忘れても導ける**」ことが、この単元のほんとうの目標です。

| 変換 | 対称 | 起きること | 公式 |
|---|---|---|---|
| $\\theta + 2\\pi$ | （$1$ 周して同じ点） | 何も変わらない | $\\sin(\\theta+2\\pi) = \\sin\\theta$ |
| $-\\theta$ | $x$ 軸対称（上下） | $\\sin$ だけ反転 | $\\cos(-\\theta) = \\cos\\theta,\\ \\sin(-\\theta) = -\\sin\\theta$ |
| $\\pi - \\theta$ | $y$ 軸対称（左右） | $\\cos$ だけ反転 | $\\sin(\\pi-\\theta) = \\sin\\theta,\\ \\cos(\\pi-\\theta) = -\\cos\\theta$ |
| $\\pi + \\theta$ | 原点対称（半周） | 両方反転 | $\\sin(\\pi+\\theta) = -\\sin\\theta,\\ \\cos(\\pi+\\theta) = -\\cos\\theta$ |
| $\\dfrac{\\pi}{2} - \\theta$ | $y = x$ 対称（斜め） | **座標が入れ替わる** | $\\sin\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\cos\\theta,\\ \\cos\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\sin\\theta$ |

<<TRIG_SYMMETRY_Y_AXIS>>

**ここが胚細胞**：図形の**対称性が計算を減らす**。無限にある角も、折り返せば必ず第 $1$ 象限のどれかに重なる。だから覚える値はひと握りでよく、残りは「どの折り返しか」→「何が保たれ・何が反転し・何が入れ替わるか」の翻訳だけ。対称性で場合の数を減らす発想は、偶関数・奇関数、積分の対称性利用、あらゆる「基準に帰着させる」思考へ転移します。

**Step 1〜3：時計と鏡**。周期性（$1$ 周で戻る）と $x$ 軸対称（$-\\theta$：$\\cos$ 保存・$\\sin$ 反転）。

**Step 4〜5：折る軸が変わる**。$y$ 軸対称（$\\pi-\\theta$：$\\sin$ 保存・$\\cos$ 反転）と原点対称（$\\pi+\\theta$：両方反転）。両方反転だから $\\tan(\\pi+\\theta) = \\tan\\theta$——系列5で見た「$\\tan$ の周期は $\\pi$」の正体がここで割れます。

**Step 6：対称を逆に使う**。$\\sin$ が同じ値になる相手の角は $y$ 軸対称のペア（$\\theta$ と $\\pi-\\theta$）。[三角方程式] の「解は $2$ つ」は、この対称の顔だった——公式と解の個数が $1$ 本につながります。

**Step 7〜8：座標の入れ替え（最大の山場）**。$y = x$ で折り返すと点 $(a, b)$ は $(b, a)$ へ——$x$ と $y$ が入れ替わるので、$\\cos\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\sin\\theta$。**$\\sin$ が $\\cos$ に化ける**のはこの斜めの折り返しだけ。$\\dfrac{2}{7}$ のような特別角でない値でも、入れ替えの公式だけで答えが出る——公式が「表にない角」を撃ち抜く瞬間です。$\\dfrac{\\pi}{2}+\\theta$ 型は $\\dfrac{\\pi}{2}-(-\\theta)$ と分解して、入れ替え＋$x$ 軸対称の合わせ読みで。

**Step 9〜10：重ねる・簡約する**。$\\theta + 3\\pi$ は「$2\\pi$ を取り除いて半周」の $2$ 段重ね。$\\sin(\\pi+\\theta) + \\sin(-\\theta) + 2\\sin(\\pi-\\theta) = 0$ のような式も、$1$ 項ずつ翻訳すれば $\\theta$ が消える——変換公式は式を軽くする道具でもあります。

────────

**もっと深く** — 対称性の言葉

**偶関数・奇関数**：$\\cos(-\\theta) = \\cos\\theta$ を「$\\cos$ は偶関数」、$\\sin(-\\theta) = -\\sin\\theta$ を「$\\sin$ は奇関数」と呼びます。グラフでいえば $\\cos$ は $y$ 軸対称、$\\sin$ は原点対称——単位円の折り返しが、グラフの対称性として再登場します。

**グラフとの往復**：$\\sin\\left(\\theta + \\dfrac{\\pi}{2}\\right) = \\cos\\theta$ は、[三角関数のグラフ] で見た「$\\cos$ は $\\sin$ の横ずれ」を単位円側から言い直したもの。同じ事実が、円では「折り返し」、グラフでは「[位相] のずれ」という別の顔で現れる。

**この先へ**：実はこの表の公式ぜんぶが、次の系列の**加法定理**から機械的に導けます（$\\pi$ や $\\dfrac{\\pi}{2}$ を「足す角」として展開するだけ）。対称性で見る目と、定理で導く手——2 本立てになったとき、この単元は完成します。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 章構成（三角関数の性質・単位円の対称性による導出・「忘れても導ける」の方針）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「覚える値がひと握りで足りるのはなぜ？」——無限の角はすべて、$4$ つの折り返し（$x$ 軸・$y$ 軸・原点・$y=x$）で第 $1$ 象限に帰着するから。折り返しは座標の**符号**を反転させるか（$3$ つの軸）、座標を**入れ替える**か（$y=x$）しかしない。だから角の変換は「符号の反転」と「$\\sin\\leftrightarrow\\cos$ の入れ替え」に翻訳され、覚えるのは第 $1$ 象限の値と折り返しの見方だけでいい。**対称性が、無限を有限に畳む**——それがこの単元の景色です。`,
};

/** TRIG7: 加法定理（角の和＝回転の合成）。
 *  表に無い角の値を、既知の角の和・差に分解して作る。逆読み（畳む）となす角まで。
 *  背骨: docs/trig_continuation_series_design_fable.md §5（Fable 5 設計・Fable 5 実装。
 *  op 配列は実装時に一部調整：和→差（＋α）→cos型（質）→cos差（同）→tan型（質）→畳む（逆・同）→象限つき（＋α)→なす角・逆読み合流（複合×2））。 */
export const TRIG_ADDITION_SERIES: LearnerSeries = {
  id: "trig_addition_01",
  title: "加法定理（角の和は、回転の重ねがけ）",
  subtitle:
    "数Ⅱ・B 三角関数より — 表に無い角を既知の角の和・差に分解して作る。sin・cos・tan の加法定理から 2 直線のなす角まで $10$ 問。",
  patternId: "TRIG7",
  unit: "algebra_2",
  revelationLabel:
    "$\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$——角を足すことは単位円で回転を重ねること。だから和の値は、元の 2 角の値の積と和で組み立てられる",
  drivingQuestion:
    "表に載っていない角の値が、すでに知っている角の値の掛け算と足し算だけで組み立てられるのはなぜ？——角を『足す』ことは、単位円の上で回転を『重ねる』ことだとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\dfrac{5\\pi}{12}$（$= 75°$）は特別角の表にありません。でも $\\dfrac{5\\pi}{12} = \\dfrac{\\pi}{6} + \\dfrac{\\pi}{4}$ と、表にある $2$ つの角の**和**には分解できます。加法定理 $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$ を使って、$\\sin\\dfrac{5\\pi}{12}$ の値を求めましょう。",
      answer: (Math.sqrt(6) + Math.sqrt(2)) / 4,
      answerDisplay: "(√6+√2)/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin(5π/12)",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "[単位円] で「角の和」をつくるとは、$\\alpha$ まで回してから、さらに $\\beta$ 回すこと。届いた先の点の高さが $\\sin(\\alpha+\\beta)$。定理の右辺に並ぶ $4$ つの部品（$\\sin\\dfrac{\\pi}{6}$・$\\cos\\dfrac{\\pi}{4}$・$\\cos\\dfrac{\\pi}{6}$・$\\sin\\dfrac{\\pi}{4}$）は、どれも表にある値だね。まず部品を全部そろえられるかな？",
        },
        {
          layer: 2,
          text: "$\\alpha = \\dfrac{\\pi}{6}$、$\\beta = \\dfrac{\\pi}{4}$ として、定理の右辺「$\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$」に部品を入れるだけ。それぞれの値は $\\dfrac{1}{2}$・$\\dfrac{1}{\\sqrt{2}}$・$\\dfrac{\\sqrt{3}}{2}$・$\\dfrac{1}{\\sqrt{2}}$——組み立てると？",
        },
        {
          layer: 3,
          text: "$\\sin\\dfrac{5\\pi}{12} = \\sin\\dfrac{\\pi}{6}\\cos\\dfrac{\\pi}{4} + \\cos\\dfrac{\\pi}{6}\\sin\\dfrac{\\pi}{4} = \\dfrac{1}{2}\\cdot\\dfrac{1}{\\sqrt{2}} + \\dfrac{\\sqrt{3}}{2}\\cdot\\dfrac{1}{\\sqrt{2}} = \\dfrac{1+\\sqrt{3}}{2\\sqrt{2}} = \\dfrac{\\sqrt{2}+\\sqrt{6}}{4}$。**知らない角の値が、知っている値の積と和だけで組み上がった**——これが加法定理の力。",
        },
      ],
      formulaPreview: "sin(π/6+π/4) = (1/2)(1/√2)+(√3/2)(1/√2) = (√6+√2)/4",
      figureMarker: "<<TRIG_ANGLE_SUM>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "今度は**差**です。$\\dfrac{\\pi}{12}$（$= 15°$）を $\\dfrac{\\pi}{4} - \\dfrac{\\pi}{6}$ と分解して、$\\sin\\dfrac{\\pi}{12}$ の値を求めましょう。（差の公式：$\\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta$）",
      answer: (Math.sqrt(6) - Math.sqrt(2)) / 4,
      answerDisplay: "(√6−√2)/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin(π/12)",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。組み立て方はそっくりで、変わったのは「足す」が「引く」になったこと。差の公式は、和の公式のどこか $1$ か所だけが変わっている——どこ？",
        },
        {
          layer: 2,
          text: "前題と変わったのは真ん中の符号だけ（$+$ が $-$ に）。部品は $\\alpha = \\dfrac{\\pi}{4}$、$\\beta = \\dfrac{\\pi}{6}$ の $\\sin$・$\\cos$ で、全部表にある。前題と同じように部品をそろえて、今度は引き算で組む。",
        },
        {
          layer: 3,
          text: "$\\sin\\dfrac{\\pi}{12} = \\sin\\dfrac{\\pi}{4}\\cos\\dfrac{\\pi}{6} - \\cos\\dfrac{\\pi}{4}\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{\\sqrt{3}}{2} - \\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{1}{2} = \\dfrac{\\sqrt{3}-1}{2\\sqrt{2}} = \\dfrac{\\sqrt{6}-\\sqrt{2}}{4}$。差の公式は、和の公式の $\\beta$ を $-\\beta$ に置き換えたもの（$\\sin(-\\beta) = -\\sin\\beta$——系列「性質」の折り返しがここで効く）。",
        },
      ],
      formulaPreview: "sin(π/4−π/6) = (√3−1)/(2√2) = (√6−√2)/4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\cos$ の番です。$\\cos\\dfrac{5\\pi}{12}$ を、$\\dfrac{5\\pi}{12} = \\dfrac{\\pi}{6} + \\dfrac{\\pi}{4}$ と分解して求めましょう。（$\\cos$ の加法定理：$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$——符号に注意）",
      answer: (Math.sqrt(6) - Math.sqrt(2)) / 4,
      answerDisplay: "(√6−√2)/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos(5π/12)",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。同じ角の分解なのに、今度は $\\cos$。$\\sin$ の公式は「種類ちがいのペアの**和**」だった。$\\cos$ の公式は、ペアの組み方と真ん中の符号が両方変わる——どう変わっている？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは公式の**構造**：$\\sin$ は $\\sin\\cos + \\cos\\sin$（種類ちがい・足す）、$\\cos$ は $\\cos\\cos - \\sin\\sin$（種類そろい・引く）。「足した角なのに引き算」がいちばんの罠。部品は step1 と同じ $4$ つの値だよ。",
        },
        {
          layer: 3,
          text: "$\\cos\\dfrac{5\\pi}{12} = \\cos\\dfrac{\\pi}{6}\\cos\\dfrac{\\pi}{4} - \\sin\\dfrac{\\pi}{6}\\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{3}}{2}\\cdot\\dfrac{1}{\\sqrt{2}} - \\dfrac{1}{2}\\cdot\\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{3}-1}{2\\sqrt{2}} = \\dfrac{\\sqrt{6}-\\sqrt{2}}{4}$。step2 の $\\sin\\dfrac{\\pi}{12}$ と同じ値になった——$\\cos\\dfrac{5\\pi}{12} = \\sin\\left(\\dfrac{\\pi}{2} - \\dfrac{5\\pi}{12}\\right) = \\sin\\dfrac{\\pi}{12}$（性質の系列の入れ替え）だから。別の道が同じ場所に着くのは、正しさの検算にもなる。",
        },
      ],
      formulaPreview: "cos(π/6+π/4) = (√3/2)(1/√2)−(1/2)(1/√2) = (√6−√2)/4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\cos$ の**差**で反復します。$\\cos\\dfrac{\\pi}{12}$ を、$\\dfrac{\\pi}{12} = \\dfrac{\\pi}{4} - \\dfrac{\\pi}{6}$ と分解して求めましょう。",
      answer: (Math.sqrt(6) + Math.sqrt(2)) / 4,
      answerDisplay: "(√6+√2)/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos(π/12)",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ $\\cos$ の公式で、和が差に変わっただけ。$\\sin$ のとき（step1 と step2）は真ん中の符号が入れ替わった——$\\cos$ の差では、どうなると思う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「差」になったことだけ。$\\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta$——$\\cos$ は差のとき**足し算**になる（$\\sin$ とあべこべ）。部品を入れて組み立てよう。",
        },
        {
          layer: 3,
          text: "$\\cos\\dfrac{\\pi}{12} = \\cos\\dfrac{\\pi}{4}\\cos\\dfrac{\\pi}{6} + \\sin\\dfrac{\\pi}{4}\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{1}{2} = \\dfrac{\\sqrt{3}+1}{2\\sqrt{2}} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$。$4$ つの公式が出そろった：$\\sin$ は種類ちがいのペアで符号そのまま、$\\cos$ は種類そろいのペアで符号が逆転する。",
        },
      ],
      formulaPreview: "cos(π/4−π/6) = (√3+1)/(2√2) = (√6+√2)/4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$3$ 人目、$\\tan$ です。$\\tan(\\alpha+\\beta) = \\dfrac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}$ を使って、$\\tan\\dfrac{5\\pi}{12}$（$\\dfrac{5\\pi}{12} = \\dfrac{\\pi}{4} + \\dfrac{\\pi}{6}$）の値を求めましょう。",
      answer: 2 + Math.sqrt(3),
      answerDisplay: "2+√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "tan(5π/12)",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1〜4 と比べてみよう。$\\sin$・$\\cos$ の公式は「積の和・差」の $1$ 階建てだった。$\\tan$ の公式は**分数**——$2$ 階建ての新しい形。でも部品は $\\tan\\dfrac{\\pi}{4}$ と $\\tan\\dfrac{\\pi}{6}$ の $2$ つだけ。まず部品の値は？",
        },
        {
          layer: 2,
          text: "新しいのは分数の形だけ。$\\tan\\dfrac{\\pi}{4} = 1$、$\\tan\\dfrac{\\pi}{6} = \\dfrac{1}{\\sqrt{3}}$ を、分子「和」・分母「$1 -$ 積」に入れる。分母と分子に $\\sqrt{3}$ を掛けると整理しやすいよ。",
        },
        {
          layer: 3,
          text: "$\\tan\\dfrac{5\\pi}{12} = \\dfrac{1 + \\dfrac{1}{\\sqrt{3}}}{1 - 1\\cdot\\dfrac{1}{\\sqrt{3}}} = \\dfrac{\\sqrt{3}+1}{\\sqrt{3}-1}$（分母分子に $\\sqrt{3}$）。さらに分母分子に $\\sqrt{3}+1$ を掛けて $\\dfrac{(\\sqrt{3}+1)^2}{3-1} = \\dfrac{4+2\\sqrt{3}}{2} = 2+\\sqrt{3}$。$\\tan$ の公式は $\\dfrac{\\sin(\\alpha+\\beta)}{\\cos(\\alpha+\\beta)}$ を $\\cos\\alpha\\cos\\beta$ で約分した姿——$\\sin$・$\\cos$ から導ける子ども公式。",
        },
      ],
      formulaPreview: "tan(π/4+π/6) = (1+1/√3)/(1−1/√3) = 2+√3",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "公式を**後ろから**読みます。$\\sin\\dfrac{\\pi}{5}\\cos\\dfrac{\\pi}{20} + \\cos\\dfrac{\\pi}{5}\\sin\\dfrac{\\pi}{20}$ の値を求めましょう。（$\\dfrac{\\pi}{5}$ も $\\dfrac{\\pi}{20}$ も特別角ではありません——でも求められます）",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin(π/5)cos(π/20)+cos(π/5)sin(π/20)",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。step1 では公式の左辺（$1$ つの角）から右辺（展開形）へ進んだ。今度は式が**右辺の形**で与えられている。この並び——種類ちがいのペアの和——は、どこかで見た形では？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは矢印の向きだけ。この式は $\\sin(\\alpha+\\beta)$ の展開形そのもので、$\\alpha = \\dfrac{\\pi}{5}$、$\\beta = \\dfrac{\\pi}{20}$。展開を**畳んで** $1$ つの角に戻すと、その角は特別角になっていない？",
        },
        {
          layer: 3,
          text: "与式 $= \\sin\\left(\\dfrac{\\pi}{5} + \\dfrac{\\pi}{20}\\right) = \\sin\\dfrac{4\\pi + \\pi}{20} = \\sin\\dfrac{5\\pi}{20} = \\sin\\dfrac{\\pi}{4} = \\dfrac{1}{\\sqrt{2}}$。バラバラの $4$ つの値は $1$ つも求められないのに、**畳むと答えが出る**。公式は前からだけでなく後ろからも読める——この「畳む」が、のちの合成の入口になる。",
        },
      ],
      formulaPreview: "= sin(π/5+π/20) = sin(π/4) = 1/√2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "畳む練習をもう $1$ つ。$\\cos\\dfrac{2\\pi}{9}\\cos\\dfrac{\\pi}{9} - \\sin\\dfrac{2\\pi}{9}\\sin\\dfrac{\\pi}{9}$ の値を求めましょう。",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "cos(2π/9)cos(π/9)−sin(2π/9)sin(π/9)",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「畳む」向き。変わったのはペアの種類——今度は種類そろい（$\\cos\\cos$ と $\\sin\\sin$）で真ん中が引き算。この構造はどの公式の右辺？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、畳む先が $\\sin$ でなく $\\cos$ なことだけ。$\\cos\\cos - \\sin\\sin$ は $\\cos(\\alpha+\\beta)$ の展開形。$\\alpha = \\dfrac{2\\pi}{9}$、$\\beta = \\dfrac{\\pi}{9}$ で畳むと、角はいくつになる？",
        },
        {
          layer: 3,
          text: "与式 $= \\cos\\left(\\dfrac{2\\pi}{9} + \\dfrac{\\pi}{9}\\right) = \\cos\\dfrac{3\\pi}{9} = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$。前題（$\\sin$ 型）と同じ手を $\\cos$ 型で繰り返した。**「展開形を見たら畳めないか疑う」**——この目が育つと、複雑な式がただの特別角に化ける。",
        },
      ],
      formulaPreview: "= cos(2π/9+π/9) = cos(π/3) = 1/2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "値が式でなく**条件**で与えられます。$\\alpha, \\beta$ はともに第 $1$ 象限の角で、$\\sin\\alpha = \\dfrac{4}{5}$、$\\cos\\beta = \\dfrac{5}{13}$ とします。$\\sin(\\alpha+\\beta)$ の値を求めましょう。",
      answer: 56 / 65,
      answerDisplay: "56/65",
      unit: "",
      unknownLabel: "sin(α+β)（sinα=4/5・cosβ=5/13）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。公式は同じだけれど、部品が足りない——右辺には $\\cos\\alpha$ と $\\sin\\beta$ も要るのに、与えられていない。足りない部品を自力で作る道具を、前の系列で身につけていなかった？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは「部品集めから始める」こと。[相互関係]（$1$ つの値と象限から残りが決まる）で、$\\sin\\alpha$ から $\\cos\\alpha$ を、$\\cos\\beta$ から $\\sin\\beta$ を先に出す。第 $1$ 象限だからどちらも符号はプラス。部品が $4$ つそろったら、あとは step1 と同じ。",
        },
        {
          layer: 3,
          text: "[相互関係] より $\\cos\\alpha = \\sqrt{1 - \\dfrac{16}{25}} = \\dfrac{3}{5}$、$\\sin\\beta = \\sqrt{1 - \\dfrac{25}{169}} = \\dfrac{12}{13}$（第 $1$ 象限なので正）。組み立てて $\\sin(\\alpha+\\beta) = \\dfrac{4}{5}\\cdot\\dfrac{5}{13} + \\dfrac{3}{5}\\cdot\\dfrac{12}{13} = \\dfrac{20 + 36}{65} = \\dfrac{56}{65}$。**加法定理と相互関係の合流**——前の系列の道具が、部品工場として働く。",
        },
      ],
      formulaPreview: "cosα=3/5, sinβ=12/13 → (4/5)(5/13)+(3/5)(12/13) = 56/65",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "図形に使います。$2$ 直線 $y = 2x$ と $y = -3x$ のなす角（$0$ より大きく $\\dfrac{\\pi}{2}$ 以下）を求めましょう。",
      answer: Math.PI / 4,
      answerDisplay: "π/4",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=2x と y=−3x のなす角",
      variationFromPrevious: "composite",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "系列1で「$\\tan$ ＝ 直線の傾き」だった。$2$ 直線それぞれが $x$ 軸となす角を $\\alpha$・$\\beta$ とすると、なす角は $\\alpha - \\beta$——差の角。角そのものは表に無いのに、$\\tan\\alpha$ と $\\tan\\beta$ なら分かっている。step5 の分数の公式が、差の形でも使えないかな？",
        },
        {
          layer: 2,
          text: "新しいのは「$\\tan$ の加法定理を図形に使う」こと。$\\tan\\alpha = 2$、$\\tan\\beta = -3$（傾きそのもの）を $\\tan(\\alpha-\\beta) = \\dfrac{\\tan\\alpha - \\tan\\beta}{1 + \\tan\\alpha\\tan\\beta}$ に入れる。出てきた値が負なら、その角は鈍角——「なす角」は鋭角で答える約束だから、最後にもうひと工夫。",
        },
        {
          layer: 3,
          text: "$\\tan(\\alpha-\\beta) = \\dfrac{2-(-3)}{1+2\\cdot(-3)} = \\dfrac{5}{-5} = -1$。$\\tan$ が $-1$ になる角は $\\dfrac{3\\pi}{4}$（鈍角）。なす角は $\\dfrac{\\pi}{2}$ 以下で答える約束なので、$\\pi - \\dfrac{3\\pi}{4} = \\dfrac{\\pi}{4}$。$\\alpha$ も $\\beta$ も具体的に求められないのに、なす角だけが分かってしまう——$\\tan$ の加法定理が橋渡しをした。",
        },
      ],
      formulaPreview: "tan(α−β) = (2+3)/(1−6) = −1 → 鈍角 3π/4 → なす角 π/4",
      figureMarker: "<<TRIG_LINES_ANGLE>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げです。$2$ 直線 $y = (2+\\sqrt{3})x$ と $y = x$ のなす角を求めましょう。（step5 の答えが再登場します）",
      answer: Math.PI / 6,
      answerDisplay: "π/6",
      inputAffordances: ["pi"],
      unit: "",
      unknownLabel: "y=(2+√3)x と y=x のなす角",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「傾きからなす角」。ただ今回は、$1$ 本目の直線の傾きの値に見覚えがないかな——step5 の答えと同じ数では？ 気づくと計算せずに答えが見える。気づかなくても、前題の手はそのまま使える。",
        },
        {
          layer: 2,
          text: "前題と変わったのは値だけ。道は $2$ 本ある：①前題どおり公式に入れて計算する。②$\\tan\\dfrac{5\\pi}{12} = 2+\\sqrt{3}$（step5）と $\\tan\\dfrac{\\pi}{4} = 1$ を思い出せば、なす角は $2$ つの角の**差**として引き算だけで出る。どちらでも同じ答えに着くよ。",
        },
        {
          layer: 3,
          text: "道②：$y=(2+\\sqrt{3})x$ が $x$ 軸となす角は $\\dfrac{5\\pi}{12}$（step5 の逆読み）、$y=x$ は $\\dfrac{\\pi}{4} = \\dfrac{3\\pi}{12}$。なす角 $= \\dfrac{5\\pi}{12} - \\dfrac{3\\pi}{12} = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$。道①でも $\\dfrac{(2+\\sqrt{3})-1}{1+(2+\\sqrt{3})} = \\dfrac{1+\\sqrt{3}}{3+\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}$ で $\\dfrac{\\pi}{6}$。**公式で押す道と、逆読みで見抜く道が同じ答えで合流する**——公式を「使う」から「読む」へ。",
        },
      ],
      formulaPreview: "tanθ = (1+√3)/(3+√3) = 1/√3 → θ = π/6",
    },
  ],
  derivation: `**中心の問い** ｜ 表に載っていない角の値が、すでに知っている角の値の掛け算と足し算だけで組み立てられるのはなぜ？——角を『足す』ことは、単位円の上で回転を『重ねる』ことだとしたら？

────────

**まず、やってはいけない変形から。**

$$\\sin(\\alpha+\\beta) \\ne \\sin\\alpha + \\sin\\beta$$

$\\sin$ は「掛け算」ではないので、カッコの中に分配はできません（$\\sin$ は $\\theta$ という角への**操作**であって、$\\sin \\times \\theta$ ではない）。では $\\sin(\\alpha+\\beta)$ をバラす正しい道は何か——それがこの単元の主役、**加法定理**です：

$$\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$$
$$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$$

覚え方の骨：**$\\sin$ は種類ちがいのペアの和、$\\cos$ は種類そろいのペアの差**。

<<TRIG_ANGLE_SUM>>

**なぜ成り立つのか（証明の心臓部）**：[単位円] 上で角 $\\alpha+\\beta$ の点 $P$ をとり、$P$ から「角 $\\alpha$ の方向の軸」に垂線を下ろすと、図の中に直角三角形が $3$ つ生まれます。斜辺 $1$ の三角形から $\\sin(\\alpha+\\beta)$ と $\\cos(\\alpha+\\beta)$ を、残り $2$ つの三角形（斜辺 $\\cos\\beta$・斜辺 $\\sin\\beta$）から $4$ つの積を読み取ると、$P$ の高さが「$\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$」、横が「$\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$」と**組み立てられている**ことが図から直接見えます。角を足す＝回転を重ねる、そして重ねた回転の座標は元の $2$ つの回転の座標の積和で書ける——これが定理の正体です。

**ここが胚細胞**：**知らないものを、知っているものの和に分解して作る**。$\\dfrac{5\\pi}{12}$ は表に無いが $\\dfrac{\\pi}{6} + \\dfrac{\\pi}{4}$ に割れる。分解 → 部品は既知 → 定理で組み立て。この「既知への分解」は、素因数分解にも、ベクトルの分解にも、この先の複素数の回転にも流れている発想です。

**Step 1〜4：$4$ つの顔**。和の $\\sin$、差の $\\sin$（$\\beta \\to -\\beta$ と置き換えれば導ける——性質の系列の折り返しが部品）、和の $\\cos$（**足した角なのに引き算**が最大の罠）、差の $\\cos$。$\\cos\\dfrac{5\\pi}{12} = \\sin\\dfrac{\\pi}{12}$ のように別の道が同じ値に着くのは、検算であり、入れ替え公式（性質）との合流でもあります。

**Step 5：$\\tan$ は子ども公式**。$\\tan(\\alpha+\\beta) = \\dfrac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}$ は、$\\dfrac{\\sin(\\alpha+\\beta)}{\\cos(\\alpha+\\beta)}$ の分母分子を $\\cos\\alpha\\cos\\beta$ で割っただけ。忘れても $\\sin$・$\\cos$ から $1$ 分で再建できます。

**Step 6〜7：後ろから読む（逆）**。$\\sin\\dfrac{\\pi}{5}\\cos\\dfrac{\\pi}{20} + \\cos\\dfrac{\\pi}{5}\\sin\\dfrac{\\pi}{20}$——部品は $1$ つも求められないのに、**畳めば** $\\sin\\dfrac{\\pi}{4}$。「展開形を見たら畳めないか疑う」目は、次の次の系列（合成）で主役になります。

**Step 8：相互関係との合流**。部品が足りなければ、[相互関係] が部品工場になる（$\\sin\\alpha = \\dfrac{4}{5}$ から $\\cos\\alpha = \\dfrac{3}{5}$）。

**Step 9〜10：$2$ 直線のなす角**。傾き＝$\\tan$（系列1）だから、$2$ 直線のなす角は $\\tan(\\alpha-\\beta)$ で出せます。結果が負なら鈍角——「なす角」は $\\dfrac{\\pi}{2}$ 以下で答える約束なので $\\pi$ から引く。$\\alpha$ も $\\beta$ も分からないのに差だけ分かる——加法定理が橋渡しする、少し不思議で爽快な応用です。

────────

**もっと深く** — 加法定理は公式の屋台骨

**性質の公式はぜんぶ子ども**：$\\sin(\\pi - \\theta) = \\sin\\pi\\cos\\theta - \\cos\\pi\\sin\\theta = 0 + \\sin\\theta$。前の系列で「折り返し」から導いた変換公式は、加法定理に $\\pi$ や $\\dfrac{\\pi}{2}$ を入れるだけでも全部出てきます。対称で見る目と、定理で導く手——$2$ 本立てが揃いました。

**$2$ 倍角・合成もここから**：$\\beta = \\alpha$ と置けば $2$ 倍角の公式（次の系列）、後ろから読めば合成（その次）。この章の残りの公式は、すべて加法定理のバリエーションです。**屋台骨は $1$ 本、枝はそこから生やす**。

**回転の合成として**：加法定理は「角 $\\alpha$ の回転のあとに角 $\\beta$ の回転をすると、角 $\\alpha+\\beta$ の回転になる」ことの座標表示。数Ⅲの複素数平面では、これが「絶対値 $1$ の複素数の掛け算＝回転」として再登場します。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 章構成（加法定理・tan の加法定理・2 直線のなす角）と証明の方針（単位円上の直角三角形による幾何的説明）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「表に無い角の値が、既知の値の積と和で組み立てられるのはなぜ？」——角を足すことは [単位円] で回転を**重ねる**ことであり、重ねた先の点の座標は、元の $2$ つの回転の座標（$\\sin\\alpha, \\cos\\alpha, \\sin\\beta, \\cos\\beta$）の**積の組み合わせ**で幾何的に組み上がっているから。だから知らない角は、知っている角の和に**分解**すればいい。前から読めば「バラす」、後ろから読めば「畳む」——$1$ 本の定理が、この章のすべての公式の屋台骨になります。`,
};

/** TRIG8: 2倍角・半角の公式（特殊化と逆読みが新しい公式を生む）。
 *  加法定理の 2 角をわざと同じにする特殊化。cos2θ の 3 つの顔・半角（逆読み）・次数下げまで。
 *  ※池田本は半角を独立の節にせず次数下げで扱う。本系列は半角を「逆」の 2 step に置き、
 *  次数下げを微分積分への縦の鎖として厚めに扱う（D4・実装時判断）。
 *  背骨: docs/trig_continuation_series_design_fable.md §6（Fable 5 設計・Fable 5 実装）。 */
export const TRIG_DOUBLE_HALF_SERIES: LearnerSeries = {
  id: "trig_double_half_01",
  title: "2倍角・半角の公式（公式は自分で生やせる）",
  subtitle:
    "数Ⅱ・B 三角関数より — 加法定理の 2 角をわざと同じにすると倍角が、逆に読むと半角・次数下げが生えてくる $10$ 問。",
  patternId: "TRIG8",
  unit: "algebra_2",
  revelationLabel:
    "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$——新しい公式を覚えたのではなく、加法定理の $\\beta$ に $\\alpha$ を入れただけ。特殊化と逆読みで、公式は手元で生やせる",
  drivingQuestion:
    "新しい公式を $1$ つも覚えていないのに、加法定理の $2$ つの角をわざと『同じ』にするだけで、倍角・半角・次数下げの公式が全部手元に生えてくるのはなぜ？——公式は前からだけでなく、後ろからも読めるとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "加法定理 $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$ の $2$ つの角を、わざと**同じ角** $\\theta$ にしてみます。$\\theta$ は第 $1$ 象限の角で $\\sin\\theta = \\dfrac{3}{5}$、$\\cos\\theta = \\dfrac{4}{5}$ のとき、$\\sin 2\\theta$ の値を求めましょう。",
      answer: 24 / 25,
      answerDisplay: "24/25",
      unit: "",
      unknownLabel: "sin2θ（sinθ=3/5・cosθ=4/5）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$2\\theta = \\theta + \\theta$——[加法定理] の $\\alpha$ にも $\\beta$ にも同じ $\\theta$ を入れるだけ。$\\sin(\\theta+\\theta)$ を加法定理でひらくと、右辺はどんな形になるかな？",
        },
        {
          layer: 2,
          text: "$\\sin(\\theta+\\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta$——同じ項が $2$ つ並ぶから、まとめると $2\\sin\\theta\\cos\\theta$。あとは与えられた $2$ つの値を入れるだけ。",
        },
        {
          layer: 3,
          text: "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta = 2 \\cdot \\dfrac{3}{5} \\cdot \\dfrac{4}{5} = \\dfrac{24}{25}$。**新しい公式を覚えたのではない**——[加法定理] の $2$ つの角をわざと同じにした（特殊化）だけで、$2$ 倍角の公式が手元に生えた。",
        },
      ],
      formulaPreview: "sin2θ = 2sinθcosθ = 2·(3/5)·(4/5) = 24/25",
      figureMarker: "<<TRIG_DOUBLE_ANGLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "別の値で反復します。$\\theta$ は第 $1$ 象限の角で $\\sin\\theta = \\dfrac{5}{13}$、$\\cos\\theta = \\dfrac{12}{13}$ のとき、$\\sin 2\\theta$ の値を求めましょう。",
      answer: 120 / 169,
      answerDisplay: "120/169",
      unit: "",
      unknownLabel: "sin2θ（sinθ=5/13・cosθ=12/13）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。生やした公式はそのまま、変わったのは材料の値だけ。同じ手がそのまま使えるね？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $\\sin\\theta$・$\\cos\\theta$ の値だけ。前題で生やした $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ に、新しい材料を入れる。",
        },
        {
          layer: 3,
          text: "$\\sin 2\\theta = 2 \\cdot \\dfrac{5}{13} \\cdot \\dfrac{12}{13} = \\dfrac{120}{169}$。一度生やした公式は道具になる——材料を替えて確かめる反復。",
        },
      ],
      formulaPreview: "sin2θ = 2·(5/13)·(12/13) = 120/169",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\cos$ でも同じことをします。$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$ の $2$ 角を同じ $\\theta$ にして、$\\sin\\theta = \\dfrac{3}{5}$、$\\cos\\theta = \\dfrac{4}{5}$（step1 と同じ）のとき $\\cos 2\\theta$ の値を求めましょう。",
      answer: 7 / 25,
      answerDisplay: "7/25",
      unit: "",
      unknownLabel: "cos2θ（sinθ=3/5・cosθ=4/5）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。同じ特殊化を、今度は $\\cos$ の加法定理でやるだけ。$\\cos(\\theta+\\theta)$ をひらくと、どんな形が生えてくる？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは、使う加法定理が $\\cos$ 版になったこと。$\\cos(\\theta+\\theta) = \\cos\\theta\\cos\\theta - \\sin\\theta\\sin\\theta$——$2$ 乗の差の形。値を入れると？",
        },
        {
          layer: 3,
          text: "$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = \\dfrac{16}{25} - \\dfrac{9}{25} = \\dfrac{7}{25}$。$\\sin 2\\theta$（積の形）とちがい、$\\cos 2\\theta$ は **$2$ 乗の差**。この形が次の step で「変身」する。",
        },
      ],
      formulaPreview: "cos2θ = cos²θ − sin²θ = 16/25 − 9/25 = 7/25",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "今度は $\\sin\\theta = \\dfrac{1}{4}$ **だけ**が分かっています（象限は不明）。それでも $\\cos 2\\theta$ の値は $1$ つに決まります。求めましょう。",
      answer: 7 / 8,
      answerDisplay: "7/8",
      unit: "",
      unknownLabel: "cos2θ（sinθ=1/4 のみ）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step3 と比べてみよう。材料が半分しかない——$\\cos\\theta$ が無い。でも [相互関係] を思い出すと、$2$ 乗の差の式から $\\cos$ の $2$ 乗を**消す**ことができないかな？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは「$\\cos\\theta$ 抜きで済ませる」こと。[相互関係] $\\cos^2\\theta = 1 - \\sin^2\\theta$ を step3 の式に入れると、$\\cos 2\\theta$ が $\\sin$ だけの顔 $1 - 2\\sin^2\\theta$ に変身する。しかも $2$ 乗しか出てこないから、象限（符号）も要らない。",
        },
        {
          layer: 3,
          text: "$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = (1 - \\sin^2\\theta) - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 1 - 2 \\cdot \\dfrac{1}{16} = \\dfrac{7}{8}$。**$\\cos 2\\theta$ が $\\sin$ だけの顔に化けた**——[相互関係] が顔の変身を担う。$2$ 乗だけの式だから符号の心配もない（象限不明でも決まる理由）。",
        },
      ],
      formulaPreview: "cos2θ = 1 − 2sin²θ = 1 − 2/16 = 7/8",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "逆側の顔です。$\\cos\\theta = \\dfrac{2}{3}$ **だけ**が分かっているとき、$\\cos 2\\theta$ の値を求めましょう。",
      answer: -1 / 9,
      answerDisplay: "−1/9",
      unit: "",
      unknownLabel: "cos2θ（cosθ=2/3 のみ）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は $\\sin$ が無くて $\\cos$ だけ。前題と同じ変身の手で、$2$ 乗の差の式から今度は $\\sin$ の $2$ 乗を消せないかな？",
        },
        {
          layer: 2,
          text: "前題と変わったのは消す相手だけ。$\\sin^2\\theta = 1 - \\cos^2\\theta$ を入れると、$\\cos 2\\theta$ は $\\cos$ だけの顔 $2\\cos^2\\theta - 1$ になる。",
        },
        {
          layer: 3,
          text: "$\\cos 2\\theta = \\cos^2\\theta - (1 - \\cos^2\\theta) = 2\\cos^2\\theta - 1 = 2 \\cdot \\dfrac{4}{9} - 1 = -\\dfrac{1}{9}$。これで $\\cos 2\\theta$ の **$3$ つの顔**（$\\cos^2-\\sin^2$／$1-2\\sin^2$／$2\\cos^2-1$）が出そろった。どの顔を使うかは「手元にどの材料があるか」で選ぶ。",
        },
      ],
      formulaPreview: "cos2θ = 2cos²θ − 1 = 8/9 − 1 = −1/9",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\tan$ も特殊化します。$\\tan\\theta = \\dfrac{1}{2}$ のとき、$\\tan 2\\theta$ の値を求めましょう。（$\\tan$ の加法定理の $2$ 角を同じにする）",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "tan2θ（tanθ=1/2）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "step1・3 と同じ特殊化を、$\\tan$ の加法定理（分数の公式）でやってみよう。$\\tan(\\theta+\\theta)$ の分子と分母は、それぞれどんな形になる？",
        },
        {
          layer: 2,
          text: "分子は「和」が同じもの $2$ つで $2\\tan\\theta$、分母は「$1 -$ 積」が $1 - \\tan^2\\theta$。材料は $\\tan\\theta = \\dfrac{1}{2}$ の $1$ つだけで足りる。",
        },
        {
          layer: 3,
          text: "$\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta} = \\dfrac{2 \\cdot \\dfrac{1}{2}}{1 - \\dfrac{1}{4}} = \\dfrac{1}{\\dfrac{3}{4}} = \\dfrac{4}{3}$。$\\sin$・$\\cos$・$\\tan$ の $3$ つとも、特殊化ひとつで倍角の公式が生えた。",
        },
      ],
      formulaPreview: "tan2θ = 2·(1/2) ÷ (1−1/4) = 4/3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "公式を**後ろから**読みます。$0 < \\theta < \\pi$ で $\\cos\\theta = \\dfrac{1}{8}$ のとき、**半分の角**の $\\sin\\dfrac{\\theta}{2}$ の値を求めましょう。",
      answer: Math.sqrt(7) / 4,
      answerDisplay: "√7/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin(θ/2)（cosθ=1/8・0<θ<π）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "step4 の「$\\sin$ だけの顔」を思い出そう。あの式で「倍の関係」にある $2$ つの角は、$2\\theta$ と $\\theta$ だった。いま知りたいのは半分の角——$\\theta$ とは、ちょうど倍の関係。step4 の式の角を**半分ずらして**読み直せないかな？",
        },
        {
          layer: 2,
          text: "step4 と変わったのは読む向きだけ。$\\cos 2\\theta = 1 - 2\\sin^2\\theta$ の $\\theta$ を $\\dfrac{\\theta}{2}$ に置き換えると $\\cos\\theta = 1 - 2\\sin^2\\dfrac{\\theta}{2}$——知りたい $\\sin\\dfrac{\\theta}{2}$ について**逆に解ける**形。最後の符号は範囲 $0 < \\theta < \\pi$ が決める。",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = 1 - 2\\sin^2\\dfrac{\\theta}{2}$ を変形して $\\sin^2\\dfrac{\\theta}{2} = \\dfrac{1 - \\cos\\theta}{2} = \\dfrac{1 - \\dfrac{1}{8}}{2} = \\dfrac{7}{16}$。$0 < \\theta < \\pi$ なら $0 < \\dfrac{\\theta}{2} < \\dfrac{\\pi}{2}$ で $\\sin\\dfrac{\\theta}{2} > 0$、よって $\\dfrac{\\sqrt{7}}{4}$。**倍角の公式を逆に読むと、半角の公式が生える**——前から読めば倍角、後ろから読めば半角。",
        },
      ],
      formulaPreview: "sin²(θ/2) = (1−cosθ)/2 = 7/16 → sin(θ/2) = √7/4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ読み方で $\\cos$ も。$0 < \\theta < \\pi$ で $\\cos\\theta = \\dfrac{1}{8}$（前題と同じ）のとき、$\\cos\\dfrac{\\theta}{2}$ の値を求めましょう。",
      answer: 0.75,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "cos(θ/2)（cosθ=1/8・0<θ<π）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「倍角を逆から読む」。変わったのは、使う顔が $\\sin$ 用でなく $\\cos$ 用になること。step5 の顔（$\\cos$ だけの顔）を半分ずらして読み直すと？",
        },
        {
          layer: 2,
          text: "前題と変わったのは顔だけ。$\\cos 2\\theta = 2\\cos^2\\theta - 1$ の角を半分にして $\\cos\\theta = 2\\cos^2\\dfrac{\\theta}{2} - 1$。これを $\\cos\\dfrac{\\theta}{2}$ について逆に解く。符号は前題と同じく範囲が決める。",
        },
        {
          layer: 3,
          text: "$\\cos^2\\dfrac{\\theta}{2} = \\dfrac{1 + \\cos\\theta}{2} = \\dfrac{1 + \\dfrac{1}{8}}{2} = \\dfrac{9}{16}$。$0 < \\dfrac{\\theta}{2} < \\dfrac{\\pi}{2}$ で正だから $\\cos\\dfrac{\\theta}{2} = \\dfrac{3}{4}$。半角の公式 $\\sin^2\\dfrac{\\theta}{2} = \\dfrac{1-\\cos\\theta}{2}$・$\\cos^2\\dfrac{\\theta}{2} = \\dfrac{1+\\cos\\theta}{2}$ は、暗記でなく**倍角の逆読み**として手元で生やせる。",
        },
      ],
      formulaPreview: "cos²(θ/2) = (1+cosθ)/2 = 9/16 → cos(θ/2) = 3/4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "使い道が変わります。$\\sin^2\\dfrac{\\pi}{8}$ の値を求めましょう。（$\\dfrac{\\pi}{8}$ は特別角ではありません——でも「$2$ 乗を $1$ 次に下げる」と求められます）",
      answer: (2 - Math.sqrt(2)) / 4,
      answerDisplay: "(2−√2)/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin²(π/8)",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step7 と比べてみよう。あそこで出た式は「$2$ 乗」と「$1$ 次のコサイン」をつなぐ橋だった。いま問われている角の**倍**は $\\dfrac{\\pi}{4}$——それなら表にある角では？ 橋を「$2$ 乗を消す」向きに渡れないかな？",
        },
        {
          layer: 2,
          text: "新しいのは使う目的：値でなく**次数を下げる**こと。$\\sin^2\\theta = \\dfrac{1 - \\cos 2\\theta}{2}$（step7 の式そのもの）に $\\theta = \\dfrac{\\pi}{8}$ を入れると、右辺の角は $\\dfrac{\\pi}{4}$——特別角の $\\cos$ になる。",
        },
        {
          layer: 3,
          text: "$\\sin^2\\dfrac{\\pi}{8} = \\dfrac{1 - \\cos\\dfrac{\\pi}{4}}{2} = \\dfrac{1 - \\dfrac{1}{\\sqrt{2}}}{2} = \\dfrac{\\sqrt{2}-1}{2\\sqrt{2}} = \\dfrac{2-\\sqrt{2}}{4}$。**$2$ 乗（$2$ 次）が $1$ 次の $\\cos$ に下がった**——これが「次数下げ」。$2$ 乗のままでは手が出ない式を $1$ 次に降ろすこの技は、微分・積分の章で主役級の働きをする。",
        },
      ],
      formulaPreview: "sin²(π/8) = (1 − cos(π/4))/2 = (2−√2)/4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "仕上げは方程式との合流です。$0 \\le \\theta < 2\\pi$ で、$\\sin 2\\theta = \\sin\\theta$ を満たす $\\theta$ を**すべて**求めましょう（複数あるので「,」で区切って。$0$ も忘れずに）。",
      answer: 0,
      answerDisplay: "0, π/3, π, 5π/3",
      solutionSet: [0, Math.PI / 3, Math.PI, (Math.PI * 5) / 3],
      inputAffordances: ["pi", "multi"],
      unit: "",
      unknownLabel: "sin2θ=sinθ の解（0≤θ<2π）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "左辺には $2\\theta$、右辺には $\\theta$——角がそろっていないままでは [三角方程式] にできない。この系列で生やした公式で、左辺を $\\theta$ だけの式に**そろえる**ことはできないかな？",
        },
        {
          layer: 2,
          text: "新しいのは「倍角をほどいてから方程式を解く」こと。$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ でほどくと $2\\sin\\theta\\cos\\theta - \\sin\\theta = 0$。ここで両辺を $\\sin\\theta$ で割りたくなるが——$\\sin\\theta$ が $0$ の可能性があるから割れない。割る代わりに**くくる**と、方程式が $2$ つに分かれる。",
        },
        {
          layer: 3,
          text: "$2\\sin\\theta\\cos\\theta - \\sin\\theta = 0$ を $\\sin\\theta$ でくくって $\\sin\\theta(2\\cos\\theta - 1) = 0$。よって $\\sin\\theta = 0$ または $\\cos\\theta = \\dfrac{1}{2}$。[三角方程式] の逆読みで、$\\sin\\theta = 0$ から $\\theta = 0, \\pi$、$\\cos\\theta = \\dfrac{1}{2}$ から $\\theta = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$。合わせて $4$ つ。**「割らずにくくる」**——$\\sin\\theta = 0$ の解を失わないための、方程式の大事な作法。",
        },
      ],
      formulaPreview: "sinθ(2cosθ−1) = 0 → θ = 0, π と π/3, 5π/3",
    },
  ],
  derivation: `**中心の問い** ｜ 新しい公式を $1$ つも覚えていないのに、加法定理の $2$ つの角をわざと『同じ』にするだけで、倍角・半角・次数下げの公式が全部手元に生えてくるのはなぜ？——公式は前からだけでなく、後ろからも読めるとしたら？

────────

**特殊化——$\\beta$ に $\\alpha$ を入れる、それだけ。**

[加法定理] は $2$ つの角 $\\alpha, \\beta$ について成り立つ**一般**の定理。一般に成り立つなら、$\\beta = \\alpha$ という**特別な場合**にも当然成り立ちます：

$$\\sin 2\\theta = \\sin(\\theta+\\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta = 2\\sin\\theta\\cos\\theta$$
$$\\cos 2\\theta = \\cos(\\theta+\\theta) = \\cos^2\\theta - \\sin^2\\theta$$

<<TRIG_DOUBLE_ANGLE>>

**$\\cos 2\\theta$ の $3$ つの顔**：$2$ 乗の差の形に [相互関係]（$\\sin^2\\theta + \\cos^2\\theta = 1$）を差し込むと、顔が変わります：

$$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 2\\cos^2\\theta - 1$$

$\\sin$ だけの顔・$\\cos$ だけの顔——**どの顔を使うかは、手元にある材料で選ぶ**（Step 4〜5）。$2$ 乗しか現れないから、象限が不明でも値が決まるのもポイント。$\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1-\\tan^2\\theta}$ も同じ特殊化です（Step 6）。

**ここが胚細胞**：**特殊化と逆読みが、新しい公式を生む**。公式集を増やしたのではなく、$1$ 本の定理を「特別な場合に絞る」「後ろから読む」という $2$ つの操作で耕した。$3$ 倍角が欲しければ $\\sin(2\\theta+\\theta)$ に加法定理をもう $1$ 回——何倍角でも、**加法定理を繰り返せば必ず導けます**。覚える公式の在庫より、生やす手つきを持つこと。

**半角＝倍角の逆読み**（Step 7〜8）：$\\cos 2\\theta = 1 - 2\\sin^2\\theta$ の角を半分にして（$2\\theta \\to \\theta$、$\\theta \\to \\dfrac{\\theta}{2}$）、知りたい方について解き直すと：

$$\\sin^2\\dfrac{\\theta}{2} = \\dfrac{1 - \\cos\\theta}{2}, \\quad \\cos^2\\dfrac{\\theta}{2} = \\dfrac{1 + \\cos\\theta}{2}$$

$2$ 乗をほどく最後の $\\pm$ は、いつものように範囲（象限）が決めます——[相互関係] の Step 4 と同じ原理。

**次数下げ**（Step 9）：半角の式を「角」でなく「**次数**」に注目して読み直すと、$\\sin^2\\theta = \\dfrac{1 - \\cos 2\\theta}{2}$・$\\cos^2\\theta = \\dfrac{1 + \\cos 2\\theta}{2}$——**$2$ 乗（$2$ 次）が $1$ 次に下がる**変形になります。$\\sin^2\\dfrac{\\pi}{8}$ のような「表に無い角の $2$ 乗」も、倍の角 $\\dfrac{\\pi}{4}$ の $\\cos$ に降りて計算できる。この技は微分・積分の章で $\\sin^2 x$ を積分するときの主役——ここが微積への縦の鎖の起点です。

**倍角方程式**（Step 10）：$\\sin 2\\theta = \\sin\\theta$ は、倍角をほどいて角をそろえ、**割らずにくくる**（$\\sin\\theta$ で割ると $\\sin\\theta = 0$ の解を失う）のが作法。[三角方程式]（系列3）との合流点です。

────────

**もっと深く** — 「導ける」ということの強さ

公式を忘れることは、恥ずかしいことではありません。この系列で見たとおり、倍角も半角も次数下げも、**加法定理 $1$ 本から $1$ 分で再建できる**からです。「忘れない」ための暗記カードより、「忘れても生やせる」導出の手つき——これが数学の記憶術の正体です。

**$3$ つの顔の使い分け**は、この先の応用で効きます：方程式で $\\cos$ に統一したいなら $2\\cos^2\\theta - 1$、$\\sin$ に統一したいなら $1 - 2\\sin^2\\theta$、次数を下げたいなら逆向きに。**式変形の選択は「今どの形が欲しいか」から逆算する**——目的が顔を選びます。

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 章構成（$2$ 倍角の公式・派生公式の導出方針・倍角の方程式）を参考。半角は同書では次数下げとして扱われる（本系列は「逆読み」の $2$ 問として独立に置いた）。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「覚えていないのに公式が生えてくるのはなぜ？」——[加法定理] が**一般**の定理だから。一般は特殊を含む：$\\beta = \\alpha$ と絞れば倍角が生え、[相互関係] を差し込めば $\\cos 2\\theta$ の $3$ つの顔が生え、逆から読めば半角と次数下げが生える。公式は在庫ではなく、$1$ 本の屋台骨（加法定理）から**その場で生やすもの**。「前から読む・後ろから読む・特別な場合に絞る」——この $3$ つの手つきが、公式集を $1$ 本の定理に畳んでしまいます。`,
};

/** 三角関数ユニットの系列リスト（カタログ登録用）。 */
export const TRIG_SERIES_LIST: LearnerSeries[] = [
  TRIG_GENERAL_ANGLE_SERIES,
  TRIG_RADIAN_SERIES,
  TRIG_EQUATION_SERIES,
  TRIG_IDENTITY_SERIES,
  TRIG_GRAPH_SERIES,
  TRIG_PROPERTY_SERIES,
  TRIG_ADDITION_SERIES,
  TRIG_DOUBLE_HALF_SERIES,
];
