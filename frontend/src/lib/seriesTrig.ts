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
 * ＊実装上の境界判断（重要）＊
 * 学習者ビューの解答は数値 1 つで、判定は |入力 − 答| < 1e-6 の厳密一致。
 * sin45°=1/√2, sin60°=√3/2, tan60°=√3 のような無理数値は学習者が入力できない。
 * そこで、設計の胚細胞（sin=y 座標・cos=x 座標・tan=OP の傾き／符号は象限で決まる／
 * 周期／負の角）と 5 オペレータの並びを厳守したまま、値が有理数になる特別角だけを選んだ
 * （設計が明示的に許す「実装時に別の角に変えてよい」の範囲）。
 * 答は 1/2・1・−1/2・−1 のみで、すべて単位円の座標として読める。
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
        "単位円で $x$ 軸の正の向きから $90°$ 回した点を $P$ とします。$\\sin 90°$（＝ $P$ の $y$ 座標）はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "sin 90°（P の y 座標）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$\\sin$ ＝ $P$ の $y$ 座標を読む」。変わったのは回す角だけ。$90°$ まで回した $P$ は、円のどこにいる？",
        },
        {
          layer: 2,
          text: "前題と同じく $y$ 座標を読むだけ。今度は $P$ がちょうど真上——円のてっぺん。そこの高さは円のどこまで届く？",
        },
        {
          layer: 3,
          text: "前題と同じ「$\\sin\\theta = P$ の $y$ 座標」。$90°$ 回すと $P$ は真上の $(0, 1)$。$y$ 座標は $1$。よって $\\sin 90° = 1$。",
        },
      ],
      formulaPreview: "sin90° = P の y 座標 = 1",
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
        "単位円で $x$ 軸の正の向きから $120°$ 回した点を $P$ とします（左上の領域）。$\\cos 120°$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: -0.5,
      unit: "",
      unknownLabel: "cos 120°（P の x 座標）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「$\\cos$ ＝ $x$ 座標」。でも今回の $120°$ は $90°$ を越えて左上へ回っている。$P$ が $y$ 軸より左に行くと、$x$ 座標の符号はどうなりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$P$ が左側（第 $2$ 象限）に来た」こと。直角三角形では出てこなかった——左にある点の横の位置は、$0$ より大きい？小さい？",
        },
        {
          layer: 3,
          text: "$120°$ の $P$ は左上の第 $2$ 象限。横の位置は原点より左なので $x$ 座標は負。大きさは $60°$ の鏡うつしで $\\dfrac{1}{2}$ だから、$\\cos 120° = -\\dfrac{1}{2}$（$-0.5$）。鈍角でも『$x$ 座標を読む』は同じ——変わったのは符号だけ。これが単位円の力。",
        },
      ],
      formulaPreview: "cos120° = P の x 座標 = −1/2（第2象限で負）",
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
        "単位円で $x$ 軸の正の向きから $300°$ 回した点を $P$ とします（右下の領域）。$\\cos 300°$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: 0.5,
      unit: "",
      unknownLabel: "cos 300°（P の x 座標）",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「座標を読む＋符号は象限から」。今度は $300°$＝右下（第 $4$ 象限）で $\\cos$＝ $x$ 座標。右側にある点の横の位置の符号は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「$P$ が右下にいる」こと。$y$ 軸より右なら $x$ 座標の符号はプラス？マイナス？",
        },
        {
          layer: 3,
          text: "$300°$ の $P$ は右下の第 $4$ 象限。$y$ 軸より右なので $x$ 座標は正。大きさは $60°$ の鏡うつしで $\\dfrac{1}{2}$。よって $\\cos 300° = \\dfrac{1}{2}$（$0.5$）。第 $4$ 象限は $x$ が正・$y$ が負。",
        },
      ],
      formulaPreview: "cos300° = P の x 座標 = 1/2（第4象限で x は正）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "単位円で $x$ 軸の正の向きから $45°$ 回した点を $P$ とします。$\\tan 45°$（＝ 直線 $OP$ の傾き）はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "tan 45°（直線 OP の傾き）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "ここまでは $P$ の座標（$y$ や $x$）を読んでいた。今度は新顔 $\\tan$。$\\tan\\theta$ は原点から $P$ へ引いた直線 $OP$ の『傾き』——直線の傾きは何と何の比だったか（[三角比] の坂のかたむき）思い出せる？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは「読むのが座標 $1$ つでなく、$2$ つの座標の比」になったこと。傾き ＝ 縦 ÷ 横 ＝ $y$ 座標 ÷ $x$ 座標。$45°$ の $P$ は縦と横が等しい点だね。",
        },
        {
          layer: 3,
          text: "$\\tan\\theta = \\dfrac{P\\text{ の }y}{P\\text{ の }x}$＝直線 $OP$ の傾き。$45°$ の $P$ は縦と横が等しいので傾きは $1$。よって $\\tan 45° = 1$。なお $90°$ では $P$ が真上で横（$x$ 座標）が $0$——傾きが「$\\div 0$」になるので $\\tan 90°$ は定義できない。",
        },
      ],
      formulaPreview: "tan45° = (P の y) ÷ (P の x) = 1",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "単位円で $x$ 軸の正の向きから $405°$ 回した点を $P$ とします（$1$ 周ぶん多く回した）。$\\tan 405°$（＝ 直線 $OP$ の傾き）はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "tan 405°（直線 OP の傾き）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題（$\\tan 45°$）と比べてみよう。やり方は同じ「$OP$ の傾き」。今回は $405°$——$1$ 周ぶん余計に回している。ぐるっと $1$ 周して戻ると、$P$ は前題と同じ場所？違う場所？",
        },
        {
          layer: 2,
          text: "前題と変わったのは角だけ。$405°$ は「ひと回り」と「あと少し」に分けられる。ひと回りぶんを取り除くと、前題のどの角と同じ点に重なる？",
        },
        {
          layer: 3,
          text: "$1$ 周は $360°$。$405° = 360° + 45°$ なので、$P$ は $1$ 周まわって $45°$ の点とぴったり同じ場所に戻る。だから $\\tan 405° = \\tan 45° = 1$。$360°$ ごとに値がくり返す——これが「周期」。$1$ 回転を超えた角も、ひと回りを取り除けば前題に帰着する。",
        },
      ],
      formulaPreview: "405° = 360° + 45° → 同じ点 → tan405° = tan45° = 1",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "単位円で $x$ 軸の正の向きから $-60°$ 回した点（時計回りに $60°$）を $P$ とします。$\\cos(-60°)$（＝ $P$ の $x$ 座標）はいくつでしょう？",
      answer: 0.5,
      unit: "",
      unknownLabel: "cos(−60°)（P の x 座標）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題 step3 では $+60°$（反時計回り）に回して $\\cos$＝ $x$ 座標を読んだ。今度は $-60°$＝同じ $60°$でも回す向きが逆（時計回り）。向きを反対にすると、$P$ の横の位置（$x$ 座標）は変わる？変わらない？",
        },
        {
          layer: 2,
          text: "step3 と変わったのは「回す向きが反対」の $1$ 点だけ。時計回りに $60°$ 回した $P$ は、反時計回りの $P$ を $x$ 軸で折り返した位置。折り返すと上下（$y$）は反転するけれど、横（$x$）はどうなる？",
        },
        {
          layer: 3,
          text: "負の角は『時計回り』。$-60°$ の $P$ は $+60°$ の $P$ を $x$ 軸で鏡うつしした点（右下・第 $4$ 象限）。鏡うつしで $y$ は符号が反転するが $x$ はそのまま。だから $\\cos(-60°) = \\cos 60° = \\dfrac{1}{2}$（$0.5$、step3 と同じ）。向きを逆に回しても $\\cos$（横）は変わらない。",
        },
      ],
      formulaPreview: "−60°（時計回り）→ +60° を x 軸で鏡うつし → cos は不変 = 1/2",
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

数Ⅰの [三角比] は、直角三角形の辺の比でした。でも三角形は角が $90°$ 未満でないと作れません。$120°$ の三角形も、$1$ 回転を超えた $405°$ も、時計回りの $-60°$ も、三角形では描けない——ここで行き止まりになります。

**半径 $1$ の円——[単位円]——に乗せ替えると、行き止まりが消える。**

<<UNIT_CIRCLE_STEP1>>

原点を中心とする半径 $1$ の円を考えます。$x$ 軸の正の向きから角 $\\theta$ だけ回した円周上の点を $P$ とすると、三角比はこう読み替えられます：

$$\\sin\\theta = P\\text{ の }y\\text{ 座標}, \\quad \\cos\\theta = P\\text{ の }x\\text{ 座標}, \\quad \\tan\\theta = \\text{直線 }OP\\text{ の傾き}$$

**なぜ座標になるのか**：斜辺＝半径はちょうど $1$。「向かいの辺 $\\div$ 斜辺」「となりの辺 $\\div$ 斜辺」の分母 $1$ が消えて、$\\sin$ は高さ（$y$）、$\\cos$ は横（$x$）そのものになります。$\\tan$ は「高さ $\\div$ 横」＝ $y \\div x$ ＝ 原点から $P$ へ引いた直線の傾き。

**ここが胚細胞**：三角形は「$0°$〜$90°$」でしか描けないけれど、**円周上の点 $P$ はどんな角でも置ける**。$120°$ でも $405°$ でも $-60°$ でも、$P$ の座標と $OP$ の傾きは必ず存在する。だから同じ $3$ つ（$\\sin, \\cos, \\tan$）で、あらゆる角が測れる——これが「[三角比] → [三角関数]」への拡張の正体です。

**Step 1〜3：まず第 $1$ 象限で、座標として読み直す**

$\\sin 30°$ は $P$ の高さ（$y$ 座標）、$\\cos 60°$ は $P$ の横（$x$ 座標）。三角比で覚えた値が、そのまま円の上の座標になることを確かめました。$\\sin$＝縦、$\\cos$＝横——読む座標を $y$ から $x$ へ移すのが Step 3 の「$+\\alpha$」。

**Step 4〜6：象限が変わると、符号が出てくる（質的変化）**

ここが直角三角形では決して見えなかった景色。$P$ が円のどの $4$ 分の $1$（象限）にいるかで、座標の符号が決まります：

| 象限 | 位置 | $x$ 座標（$\\cos$） | $y$ 座標（$\\sin$） |
|---|---|---|---|
| 第 $1$ | 右上 | $+$ | $+$ |
| 第 $2$ | 左上 | $-$ | $+$ |
| 第 $3$ | 左下 | $-$ | $-$ |
| 第 $4$ | 右下 | $+$ | $-$ |

$\\cos 120° = -\\dfrac{1}{2}$（左上で $x$ が負）、$\\sin 210° = -\\dfrac{1}{2}$（左下で $y$ が負）、$\\cos 300° = \\dfrac{1}{2}$（右下で $x$ は正）。**値の大きさは第 $1$ 象限の鏡うつし、符号だけが象限で決まる**——これが鈍角・大きな角の読み方です。

**Step 7：$\\tan$＝直線 $OP$ の傾き（もう一つの $+\\alpha$）**

$\\tan\\theta$ は座標 $1$ つでなく、$y \\div x$ という $2$ 座標の比＝直線 $OP$ の傾き。$\\tan 45° = 1$（縦と横が等しい点）。$90°$ では $P$ が真上で横 $x = 0$ になり「$\\div 0$」——だから $\\tan 90°$ は定義できません。

**Step 8：$1$ 回転を超えても、ひと回りを取り除けば戻る（周期）**

$405° = 360° + 45°$。円を $1$ 周（$360°$）まわると $P$ は元の場所へ戻るので、$\\tan 405° = \\tan 45°$。**$360°$ ごとに値がくり返す**——これを周期と呼びます。「$\\sin 370°$ は $\\sin 10°$ と同じ」のような周期の話は、すべてこの「ひと回り取り除く」で説明できます。

**Step 9：負の角は時計回り（逆）**

$-60°$ は時計回りに $60°$。$+60°$ の $P$ を $x$ 軸で鏡うつしした点になります。鏡うつしで $y$（高さ）は符号が反転しますが、$x$（横）は変わらない——だから $\\cos(-60°) = \\cos 60°$。回す向きを逆にしても $\\cos$ は不変、というのが「逆」の効き方。

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
      figureMarker: "<<UNIT_CIRCLE_STEP1>>",
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

/** 三角関数ユニットの系列リスト（カタログ登録用）。 */
export const TRIG_SERIES_LIST: LearnerSeries[] = [
  TRIG_GENERAL_ANGLE_SERIES,
  TRIG_RADIAN_SERIES,
  TRIG_EQUATION_SERIES,
];
