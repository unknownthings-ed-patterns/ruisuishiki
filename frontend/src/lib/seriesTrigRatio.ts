/**
 * 「三角比」ユニット（高校数学Ⅰ・A 第3章）の系列。
 *
 * 背骨設計：docs/trig_ratio_series_design.md（2026-07-26）。
 * お手本 mirror：seriesTrig.ts（質・√ 入力）／seriesFunctionsGraphs.ts（直前章の文体）。
 *
 * ハブ胚細胞：「直角三角形の辺の比は、大きさによらない形の情報であり、
 * 座標（単位円）に移すと鈍角まで同じ言葉で読める」。数Ⅱ一般角の下側。
 * 系列1〜8（相A比→相B拡張→相C応用）。系列1は第1相＝タンジェントと測量。
 *
 * 出典: 池田洋介『数学Ⅰ・A 入門問題精講 改訂版』旺文社 第3章の節構成を参考。
 * 問題の値はすべてオリジナル（原典の川幅10m・68°／木15m・42°等との衝突なし）。
 */

import type { LearnerSeries } from "./types";

/** TR1: タンジェントと比（測量の入口）— 比は大きさによらない形の情報。 */
export const TR_TAN_RATIO_SERIES: LearnerSeries = {
  id: "algebra1_trig_tan_01",
  title: "タンジェントと比（測量の入口）",
  subtitle:
    "数Ⅰ・A 三角比より — 相似な直角三角形の比から $\\tan$ に名前を付け、向きが変わっても辺を読むまで $10$ 問。",
  patternId: "TR1",
  unit: "algebra_1",
  revelationLabel:
    "同じ角なら三角形の大きさが変わっても辺の比は変わらない——かたむきは形だけの情報であり、それがタンジェント",
  drivingQuestion:
    "測れない長さを、なぜ『歩いた分』と『角』だけで言い当てられる？——同じ角なら三角形の大きさが変わっても比が変わらないとしたら、かたむきは何の情報か？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "川幅を知りたい（木は向こう岸の目印）。手前の岸を $8\\,\\mathrm{m}$ 歩いた地点から、川向こうの目印を見こむ角は、ノートに描いた小さな直角三角形の角と同じだった。小さな三角形では、歩いた方向の辺が $2\\,\\mathrm{cm}$・川をわたる方向の辺が $3\\,\\mathrm{cm}$ だった。現場の川幅は何 $\\mathrm{m}$ でしょう？",
      answer: 12,
      unit: "m",
      unknownLabel: "川幅",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "小学校の [割合] や中学の相似を思い出してみよう。大きさが違うのに角が同じ直角三角形——辺のどんな量が、大きい三角形と小さな三角形で同じになる？",
        },
        {
          layer: 2,
          text: "同じなのは「辺そのものの長さ」ではなく、対応する辺どうしの**比**。ノートでは（川をわたる辺）÷（歩いた辺）が $\\dfrac{3}{2}$。現場でも同じ比が使える。",
        },
        {
          layer: 3,
          text: "比は $\\dfrac{3}{2}$。現場で歩いた辺は $8\\,\\mathrm{m}$ なので、川幅 $= 8 \\times \\dfrac{3}{2} = 12$。**角が同じなら比は大きさによらない**——測れない川幅を、測れる「歩いた分」と比だけで言い当てた。ここが三角比の出発点。（木のてっぺんを見上げて高さを出すのは、あとで別の場面として出る。）",
        },
      ],
      formulaPreview: "8 × (3/2) = 12（相似な直角三角形の比）",
      figureMarker: "<<TRIG_SIMILAR_MEASURE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ考え方で、岸を $6\\,\\mathrm{m}$ 歩いた地点から川向こうの目印を見こんだ。ノートの小さな直角三角形では、歩いた方向の辺が $2\\,\\mathrm{cm}$・川をわたる方向の辺が $5\\,\\mathrm{cm}$ だった。川幅は何 $\\mathrm{m}$ でしょう？",
      answer: 15,
      unit: "m",
      unknownLabel: "川幅",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「小さな三角形の比を、現場で歩いた長さにうつす」。変わったのは数だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、歩いた長さとノートの比の組だけ。比を作ってから現場の歩いた長さにかければいい。",
        },
        {
          layer: 3,
          text: "比は $\\dfrac{5}{2}$。川幅 $= 6 \\times \\dfrac{5}{2} = 15$。前題と同じ手つき——**比を一度作れば、現場で歩いた長さを掛けて川幅が出る**。",
        },
      ],
      formulaPreview: "6 × (5/2) = 15",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "鋭角 $\\theta = 30°$ のとき、$\\tan\\theta$ の正確な値はいくつでしょう？",
      answer: 1 / Math.sqrt(3),
      answerDisplay: "1/√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "tan 30°",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは「高さ÷底辺」という比そのものを使ってきた。今度はその比に名前が付く——[タンジェント]。$30°$ の直角三角形を思い浮かべると、向かいの辺ととなりの辺の比はどうなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが現場の長さから「角だけで決まる比の値」になったこと。有名な $30°$ の直角三角形（斜辺 $2$・短い方の脚 $1$）で、となりと向かいを読み取ろう。",
        },
        {
          layer: 3,
          text: "$30°$ では向かいの辺 $1$・となりの辺 $\\sqrt{3}$（斜辺 $2$ の直角三角形）。よって $\\tan 30° = \\dfrac{1}{\\sqrt{3}}$。**$\\tan\\theta$ は「tan × θ」という積ではなく、角 $\\theta$ だけで決まる1つの数**——比に名前を付けただけ。",
        },
      ],
      formulaPreview: "tan 30° = 1/√3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "直角三角形で、角 $\\theta = 30°$ のとなりの辺が $6$ のとき、向かいの辺の長さはいくつでしょう？",
      answer: 2 * Math.sqrt(3),
      answerDisplay: "2√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\tan$ の値はもう知っている。変わったのは、比の値そのものではなく、比を使って辺の長さを出すこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが $\\tan$ の値から「向かいの辺の長さ」になったこと。定義 $\\tan\\theta = \\dfrac{\\text{向かい}}{\\text{となり}}$ を、向かい $=$ となり $\\times \\tan\\theta$ の形に読めばいい。",
        },
        {
          layer: 3,
          text: "向かい $= 6 \\times \\tan 30° = 6 \\times \\dfrac{1}{\\sqrt{3}} = 2\\sqrt{3}$。現場では「底辺 × tan＝高さ」の形で使うことが多い——step1 の比のかけ算に、名前が付いただけ。",
        },
      ],
      formulaPreview: "6 × tan 30° = 6/√3 = 2√3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "直角が左上にある直角三角形で、下の角 $\\theta = 30°$ の**となりの辺**（図では縦に見える辺）の長さが $4\\sqrt{3}$ です。$\\theta$ の**向かいの辺**（図では横に見える辺）の長さはいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う道具は同じ $\\tan$。変わったのは、三角形の向き——「縦＝向かい」「横＝となり」と決めつけていないか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、図の向きだけ。向かい／となりは**角 $\\theta$ から見て**決まる。縦に見えても、それが $\\theta$ のとなりなら、となりとして使う。",
        },
        {
          layer: 3,
          text: "$\\theta$ のとなりが $4\\sqrt{3}$、求めるのは向かい。向かい $= (4\\sqrt{3}) \\times \\tan 30° = 4\\sqrt{3} \\times \\dfrac{1}{\\sqrt{3}} = 4$。縦に見える辺を「高さ＝向かい」と決めつけると外れる——**辺の役割は角から読む**。ここが向きが変わった質的な転換点。",
        },
      ],
      formulaPreview: "隣 4√3 × tan 30° = 4（縦≠いつも向かい）",
      figureMarker: "<<TRIG_TAN_REORIENT>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じように向きが標準でない直角三角形で、角 $\\theta = 60°$ のとなりの辺が $3$ のとき、向かいの辺の長さはいくつでしょう？",
      answer: 3 * Math.sqrt(3),
      answerDisplay: "3√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「角からとなり／向かいを決めて $\\tan$ を使う」。変わったのは角と長さだけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$\\theta$ が $60°$ になったこと。$\\tan 60°$ の値に注意して、となり × tan で向かいを出す。",
        },
        {
          layer: 3,
          text: "$\\tan 60° = \\sqrt{3}$ なので、向かい $= 3 \\times \\sqrt{3} = 3\\sqrt{3}$。向きがどうであれ、**角 → となり／向かい → 比**の順は変わらない。",
        },
      ],
      formulaPreview: "3 × tan 60° = 3√3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "直角三角形で、角 $\\theta = 60°$ の向かいの辺が $4\\sqrt{3}$ のとき、となりの辺の長さはいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "となりの辺",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題まではとなりが先にあって向かいを求めた。今度は向きが逆——向かいが分かっていて、となりを知りたい。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられている辺と求める辺が入れ替わったこと。$\\tan\\theta = \\dfrac{\\text{向かい}}{\\text{となり}}$ を、となりについて解けばいい。",
        },
        {
          layer: 3,
          text: "となり $= \\dfrac{\\text{向かい}}{\\tan 60°} = \\dfrac{4\\sqrt{3}}{\\sqrt{3}} = 4$。高さから距離を逆算する——測量で「木の高さは分かっているが、根元までの距離を知りたい」ときと同じ逆向きの読み。",
        },
      ],
      formulaPreview: "隣 = 4√3 / tan 60° = 4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "木の根元から水平に $12\\,\\mathrm{m}$ 離れた地点で、てっぺんを見上げる角が $30°$ だった。木の高さは何 $\\mathrm{m}$ でしょう？（木は地面に垂直とする）",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      inputAffordances: ["sqrt"],
      unit: "m",
      unknownLabel: "木の高さ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う式は同じ $\\tan$。変わったのは、辺に「水平距離」「高さ」という場面の名前が付いたこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、となり＝水平距離・向かい＝高さ、という場面への載せ方だけ。$12\\,\\mathrm{m}$ がとなり、$30°$ が角。",
        },
        {
          layer: 3,
          text: "高さ $= 12 \\times \\tan 30° = 12 \\times \\dfrac{1}{\\sqrt{3}} = 4\\sqrt{3}$。仰角の測量——step1 の川幅と同じ形が、木の高さでもう一度現れる。",
        },
      ],
      formulaPreview: "12 × tan 30° = 4√3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "直角が右上にある直角三角形で、左下の角 $\\theta = 60°$ について、図で**縦に長く見える辺**が $\\theta$ のとなりで長さ $5$ です。$\\theta$ の向かいの辺の長さはいくつでしょう？",
      answer: 5 * Math.sqrt(3),
      answerDisplay: "5√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。「縦に見える辺＝いつも向かい（高さ）」と思っていないか？ 素朴な見た目だけで辺を決めると、この問題は必ず外れる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、図の向きと、縦に見える辺が**となり**だと明示されていることだけ。角から役割を読んで $\\tan 60°$ をかける——見た目の縦横は使わない。",
        },
        {
          layer: 3,
          text: "となり $= 5$、$\\tan 60° = \\sqrt{3}$ なので向かい $= 5\\sqrt{3}$。もし縦＝向かいと決めつけて $\\tan$ を逆に使うと $5/\\sqrt{3}$ になり外れる。**角から見た向かい／となりでしか立てられない**——見た目の縦横が通じない図こそ、「比は角から読む」が本当に身についたかを試してくる。",
        },
      ],
      formulaPreview: "隣 5 × tan 60° = 5√3（縦≠向かい）",
      figureMarker: "<<TRIG_TAN_REORIENT>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "座標平面で、原点を通る直線が $x$ 軸の正の向きとなす角が $60°$ のとき、この直線の**傾き**はいくつでしょう？",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "傾き",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は直角三角形の辺ではなく、[関数] のグラフで出会った**傾き**という言葉に戻る。傾きは「右に進んだ分のうち、どれだけ上がるか」——どこかで聞いた比と同じでは？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、場面が測量の三角形から座標平面の直線になったこと。原点から角 $60°$ で進む直線では、$x$ の増分がとなり、$y$ の増分が向かい——その比が傾き。",
        },
        {
          layer: 3,
          text: "傾き $= \\dfrac{\\Delta y}{\\Delta x} = \\tan 60° = \\sqrt{3}$。[タンジェント] とかたむき（傾き）は同じ比——数Ⅰ「関数と関数のグラフ」のつまみ言語と、三角比の入口がここで合流する。",
        },
      ],
      formulaPreview: "傾き = tan 60° = √3",
    },
  ],
  derivation: `**中心の問い** ｜ 測れない長さを、なぜ『歩いた分』と『角』だけで言い当てられる？——同じ角なら三角形の大きさが変わっても比が変わらないとしたら、かたむきは何の情報か？

────────

**比は大きさによらない形の情報——それがタンジェント。**

川幅も山の高さも、ものさしを当てられない。でも**角は遠くから測れる**。同じ角の小さな直角三角形をノートに描けば、辺の比だけは現場の大きな三角形と一致する。小学校の [割合]・中学の相似が、そのまま測量のエンジンになる。

<<TRIG_SIMILAR_MEASURE>>

**Step 1〜2：相似で比を運ぶ**

小さな三角形の高さ÷底辺を、大きな底辺にかける。角が同じなら比は不変——大きさは消えて、**形だけが残る**。

**Step 3〜4：比に名前を付ける**

その比を $\\tan\\theta$ と呼ぶ。$\\tan\\theta$ は「tan × θ」という積ではなく、角だけで決まる1つの数。運用形は

$$\\text{向かいの辺} = （となりの辺）\\times \\tan\\theta$$

$30°$ なら $\\tan 30° = \\dfrac{1}{\\sqrt{3}}$。有名角の値は、次の系列以降で図形からその場で生やせるようになる。

**Step 5〜6・9：向きが変わっても、役割は角から読む**

図が回転していると、「縦＝高さ＝向かい」と目が勝手に決めてしまう。向かい／となりは**角 $\\theta$ から見て**決める。縦に見えてもとなりなら、となりとして $\\tan$ をかける。Step 9 は、見た目だけで辺を決めると必ず外れる——この系列の核でしか解けない1問。

<<TRIG_TAN_REORIENT>>

**Step 7：逆向き——高さから距離**

向かいが分かっているとき、となり $= \\dfrac{\\text{向かい}}{\\tan\\theta}$。測量の「答→問題」の読み。

**Step 8：仰角の場面**

水平距離がとなり、木の高さが向かい。言葉が場面に載るだけで、式は Step 4 と同じ。

**Step 10：傾きとの合流**

座標平面で原点を通る直線が $x$ 軸となす角 $\\theta$ なら、傾き $= \\tan\\theta$。数Ⅰ「関数と関数のグラフ」で読んだつまみが、三角比の入口と同じ比だった——縦の鎖が問題の中で結ばれる。

────────

**もっと深く** — 次に来るもの

次の系列では、ものさしを**斜辺**に据えた比——[サイン] と [コサイン]——が加わる。同じ直角三角形を3通りの比で読む言葉が揃うと、斜辺が既知のときにも辺が読める。その先で有名角を図形から生やし、垂線1本で一般の三角形へ、さらに単位円で鈍角へと定義が広がる（数Ⅱの [一般角]・[単位円] へ続く下側）。

**誤概念**：「$\\tan\\theta$ は tan という文字と $\\theta$ の積」（Step 3）——角の関数（角だけで決まる値）である。「縦に見える辺はいつも向かい」（Step 5・9）——役割は角から読む。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第3章「三角比」の節構成（比で測量・タンジェントの意味・向きの書き直し）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

測れない長さは、同じ角の比（大きさによらない形の情報）と、測れる一辺だけで言い当てられる。その比の名前が [タンジェント] であり、かたむきそのものである。`,
};


/** TR2: サイン・コサインと辺の読み。 */
export const TR_SINCOS_SERIES: LearnerSeries = {
  id: "algebra1_trig_sincos_01",
  title: "サイン・コサインと辺の読み",
  subtitle: "数Ⅰ・A 三角比より — 斜辺をものさしにした比から辺を読み、斜辺が未知のときまで $10$ 問。",
  patternId: "TR2",
  unit: "algebra_1",
  revelationLabel: "同じ直角三角形を、ものさしを斜辺に据えると sin と cos の2つの顔で読める——tan だけでは届かない辺がある",
  drivingQuestion: "斜辺が分かっているとき、なぜ『縦』と『横』を別々の比で切り出せる？——同じ角の情報を、分母を斜辺に据えた2つの顔で読むとしたら、tan との違いは何か？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "直角三角形で、斜辺が $8$、$\\theta = 30°$ のとき、$\\theta$ の向かいの辺の長さはいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "前系列の [タンジェント] はとなりをものさしにした。今度はものさしを**斜辺**に据える——[サイン]。斜辺が分かっているとき、向かいの辺は斜辺のどんな割合？",
        },
        {
          layer: 2,
          text: "やることは、斜辺と $\\sin\\theta$ を結ぶ形。[サイン] の定義で、$30°$ のときその割合はいくつだったか思い出そう。",
        },
        {
          layer: 3,
          text: "向かい $= 8 \\times \\sin 30° = 8 \\times \\dfrac{1}{2} = 4$。**斜辺をものさしにすると、向かいの辺が切り出せる**——これが [サイン] の入口。",
        },
      ],
      formulaPreview: "8 × sin 30° = 4",
      figureMarker: "<<UNIT_TRIANGLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ直角三角形（斜辺 $8$、$\\theta = 30°$）で、$\\theta$ のとなりの辺の長さはいくつでしょう？",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "となりの辺",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。斜辺と角は同じ。変わったのは、求める辺が向かいからとなりになったこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは読む比だけ——今度は [コサイン]（となり÷斜辺）。",
        },
        {
          layer: 3,
          text: "となり $= 8 \\times \\cos 30° = 8 \\times \\dfrac{\\sqrt{3}}{2} = 4\\sqrt{3}$。同じ斜辺から、縦と横を別々の比で切り出せる。",
        },
      ],
      formulaPreview: "8 × cos 30° = 4√3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\sin 60°$ の正確な値はいくつでしょう？",
      answer: Math.sqrt(3) / 2,
      answerDisplay: "√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin 60°",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは辺の長さを求めた。今度は比そのものの値——[サイン] の特別な角。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが長さから三角比の値になったこと。$60°$ の直角三角形で向かい÷斜辺は？",
        },
        {
          layer: 3,
          text: "$\\sin 60° = \\dfrac{\\sqrt{3}}{2}$。斜辺 $2$・向かい $\\sqrt{3}$ の有名な形から読める。",
        },
      ],
      formulaPreview: "sin 60° = √3/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\cos 45°$ の正確な値はいくつでしょう？",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos 45°",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「特別な角の三角比の値」。変わったのは角と、サインからコサインへ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $45°$ と [コサイン] になったこと。正方形の対角線からできる直角三角形を思い浮かべよう。",
        },
        {
          layer: 3,
          text: "$\\cos 45° = \\dfrac{1}{\\sqrt{2}}$。となり＝向かいのとき、斜辺で割るとこうなる。",
        },
      ],
      formulaPreview: "cos 45° = 1/√2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "直角三角形で、$\\theta = 60°$ のとなりの辺が $3$ のとき、**斜辺**の長さはいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "斜辺",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは斜辺が先にあって辺を求めた。今度は向きが逆——となりが分かっていて斜辺を知りたい。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられている辺が斜辺でなくなりになったこと。$\\cos\\theta = \\dfrac{\\text{となり}}{\\text{斜辺}}$ を斜辺について読む。",
        },
        {
          layer: 3,
          text: "斜辺 $= \\dfrac{3}{\\cos 60°} = \\dfrac{3}{1/2} = 6$。**斜辺が未知のときは、cos や sin で割る形になる**——ここが質的な転換点。",
        },
      ],
      formulaPreview: "斜辺 = 3 / cos 60° = 6",
      figureMarker: "<<TRIG_HYP_UNKNOWN>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\theta = 30°$ の向かいの辺が $5$ のとき、斜辺の長さはいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "斜辺",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「分かっている辺と角から斜辺を出す」。変わったのは角と、となりから向かいへ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは [サイン] を使う側になったこと。向かい÷斜辺＝sin を、斜辺について読む。",
        },
        {
          layer: 3,
          text: "斜辺 $= \\dfrac{5}{\\sin 30°} = \\dfrac{5}{1/2} = 10$。",
        },
      ],
      formulaPreview: "斜辺 = 5 / sin 30° = 10",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "鋭角 $\\theta$ について $\\cos\\theta = \\dfrac{1}{2}$ のとき、$\\theta$ は何度でしょう？（$0° < \\theta < 90°$）",
      answer: 60,
      unit: "",
      unknownLabel: "θ（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは角が先で辺を求めた。今度は逆——比の値から角へ戻る。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。$\\cos$ が $\\dfrac{1}{2}$ になる有名角は？",
        },
        {
          layer: 3,
          text: "$\\cos 60° = \\dfrac{1}{2}$ なので $\\theta = 60$。値→角の読み——有名角を逆に辿る。",
        },
      ],
      formulaPreview: "cos θ = 1/2 → θ = 60°",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "向きが標準でない直角三角形で、斜辺 $4$、$\\theta = 45°$ のとき、$\\theta$ の向かいの辺はいくつでしょう？",
      answer: 2 * Math.sqrt(2),
      answerDisplay: "2√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "向かいの辺",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う道具は [サイン]。変わったのは、図の向きが標準でなくなっても、角から向かいを読むこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、角から辺へ戻ったことと、図の向き。向かい＝斜辺×sin は向きによらない。",
        },
        {
          layer: 3,
          text: "向かい $= 4 \\times \\sin 45° = 4 \\times \\dfrac{1}{\\sqrt{2}} = 2\\sqrt{2}$。系列1で学んだ「角から役割を読む」が、sin/cos でも同じ。",
        },
      ],
      formulaPreview: "4 × sin 45° = 2√2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "直角三角形でとなりの辺が $6$、$\\theta = 30°$ のとき斜辺はいくつでしょう？",
      answer: 4 * Math.sqrt(3),
      answerDisplay: "4√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "斜辺",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。[タンジェント] だけでは斜辺に届かない場面——なぜ足りないかに目を向けよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが斜辺で、与えがとなりだけなこと。tan は向かいととなりの比で、斜辺を含まない。",
        },
        {
          layer: 3,
          text: "斜辺 $= \\dfrac{6}{\\cos 30°} = \\dfrac{6}{\\sqrt{3}/2} = 4\\sqrt{3}$。**tan だけでは斜辺が絡む問いに届かない——sin/cos が必然**。ここがこの系列の必然性の1問。",
        },
      ],
      formulaPreview: "斜辺 = 6 / cos 30° = 4√3（tanだけでは不可）",
      figureMarker: "<<TRIG_HYP_UNKNOWN>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "直角三角形で斜辺 $2$、$\\theta = 60°$ とする。$\\dfrac{\\sin\\theta}{\\cos\\theta}$ の値はいくつでしょう？（系列1の $\\tan 60°$ と一致するか確かめよう）",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin/cos の値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は sin と cos の両方を出し、その比が系列1の [タンジェント] と同じになるかを見る。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、sin と cos を重ねて tan を検算すること。$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$。",
        },
        {
          layer: 3,
          text: "$\\sin 60° = \\dfrac{\\sqrt{3}}{2}$、$\\cos 60° = \\dfrac{1}{2}$ なので比は $\\sqrt{3}$。系列1の $\\tan 60° = \\sqrt{3}$ と一致——**3つの比は同じ三角形の別の顔**。",
        },
      ],
      formulaPreview: "tan = sin/cos = √3（系列1と合流）",
    },
  ],
  derivation: `**中心の問い** ｜ 斜辺が分かっているとき、なぜ『縦』と『横』を別々の比で切り出せる？\n\n────────\n\n**同じ形を、ものさしの選び方で3通りに読む。**\n\n系列1の [タンジェント] はとなりをものさしにした。今度は斜辺をものさしにする——[サイン]・[コサイン]。\n\n<<UNIT_TRIANGLE>>\n\n**Step 5〜6・9**：斜辺が未知／tan だけでは届かない——sin/cos が必然。\n\n**Step 10**：三兄弟の合流。$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$。\n\n────────\n\n**出典**\n\n- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社\n  — 第3章の節構成を参考。問題の値はすべてオリジナル。\n\n────────\n\n**問いに戻ると**\n\n斜辺をものさしにすると、同じ角を縦と横の2つの比で切り出せる。`,
};

/** TR3: 1つから残り＋有名角。 */
export const TR_SPECIAL_SERIES: LearnerSeries = {
  id: "algebra1_trig_special_01",
  title: "1つから残りと有名角",
  subtitle: "数Ⅰ・A 三角比より — 1つの比から残りを出し、有名角を図形から生やす $10$ 問。",
  patternId: "TR3",
  unit: "algebra_1",
  revelationLabel: "1つの比と三平方で三角形が決まり、特別な形からは値がその場で生える",
  drivingQuestion: "三角比が1つ分かれば、なぜ残りまで決まる？——そして 30°・45°・60° のきれいな値は、暗記でなくどの図形からその場で生やせるか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "鋭角 $\\theta$ について $\\sin\\theta = \\dfrac{3}{5}$ とする。直角三角形を描いて三平方の定理を使うと、$\\cos\\theta$ はいくつでしょう？（正の値）",
      answer: 4 / 5,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列2で辺の比を読んだ。今度は [三平方の定理] ——比が1つあれば、直角三角形の残りの辺が決まり、他の比も決まる。向かい $3$・斜辺 $5$ のときとなりは？",
        },
        {
          layer: 2,
          text: "やることは、直角三角形に辺を置いて三平方。となりが分かれば、となり÷斜辺が [コサイン]。",
        },
        {
          layer: 3,
          text: "となり $= \\sqrt{5^2-3^2} = 4$。よって $\\cos\\theta = \\dfrac{4}{5}$。**1つの比＋三平方で三角形が決まり、残りも決まる**。",
        },
      ],
      formulaPreview: "sin=3/5 → 隣4 → cos=4/5",
      figureMarker: "<<RIGHT_TRIANGLE_ANATOMY>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ $\\sin\\theta = \\dfrac{3}{5}$ のとき、$\\tan\\theta$ はいくつでしょう？",
      answer: 3 / 4,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "tan θ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形は同じ。変わったのは求める比が cos から tan へ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、向かい÷となりを読むことだけ。",
        },
        {
          layer: 3,
          text: "$\\tan\\theta = \\dfrac{3}{4}$。同じ三角形の別の読み。",
        },
      ],
      formulaPreview: "tan = 3/4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\tan\\theta = 2$ のとき、$\\sin\\theta$ はいくつでしょう？（鋭角・正の値）",
      answer: 2 / Math.sqrt(5),
      answerDisplay: "2/√5",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin θ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は tan が先——となりを $1$、向かいを $2$ と置ける。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えが sin でなく tan なこと。斜辺を三平方で出してから sin を読む。",
        },
        {
          layer: 3,
          text: "斜辺 $= \\sqrt{1+4} = \\sqrt{5}$。$\\sin\\theta = \\dfrac{2}{\\sqrt{5}}$。",
        },
      ],
      formulaPreview: "tan=2 → 斜辺√5 → sin=2/√5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\sin 45°$ の正確な値はいくつでしょう？（正方形の対角線から導こう）",
      answer: 1 / Math.sqrt(2),
      answerDisplay: "1/√2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin 45°",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「形から比を読む」。変わったのは有名な $45°$ の三角形へ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えの比がなく、正方形の半分から辺を置くこと。",
        },
        {
          layer: 3,
          text: "脚 $1,1$・斜辺 $\\sqrt{2}$ より $\\sin 45° = \\dfrac{1}{\\sqrt{2}}$。",
        },
      ],
      formulaPreview: "sin 45° = 1/√2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "正三角形の高さを使って、$\\sin 30°$ の正確な値を求めましょう。",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "sin 30°",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は正三角形を半分にした形——暗記表ではなく図形から [有名角] を生やす。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$30°$-$60°$-$90°$ の三角形へ移ったこと。斜辺 $2$・短い脚 $1$ のとき、sin 30° は？",
        },
        {
          layer: 3,
          text: "$\\sin 30° = \\dfrac{1}{2}$。**暗記でなく、正三角形からその場で生やす**——ここが質的な転換点。",
        },
      ],
      formulaPreview: "正三角形の半分 → sin 30° = 1/2",
      figureMarker: "<<TRIG_EQUILATERAL_HALF>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ考え方で、$\\cos 30°$ の正確な値はいくつでしょう？",
      answer: Math.sqrt(3) / 2,
      answerDisplay: "√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos 30°",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形は同じ。変わったのは求める比が sin から cos へ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、となり（長い脚 $\\sqrt{3}$）÷斜辺 $2$ を読むこと。",
        },
        {
          layer: 3,
          text: "$\\cos 30° = \\dfrac{\\sqrt{3}}{2}$。",
        },
      ],
      formulaPreview: "cos 30° = √3/2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\tan\\theta = \\sqrt{3}$ のとき、鋭角 $\\theta$ は何度でしょう？",
      answer: 60,
      unit: "",
      unknownLabel: "θ（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは角から値。今度は逆——値から角。",
        },
        {
          layer: 2,
          text: "前題と変わったのは向きだけ。$\\tan$ が $\\sqrt{3}$ になる有名角は？",
        },
        {
          layer: 3,
          text: "$\\tan 60° = \\sqrt{3}$ なので $\\theta = 60$。",
        },
      ],
      formulaPreview: "tan θ = √3 → θ = 60°",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 $ABC$ で $AB = 6$、$\\angle A = 60°$、点 $H$ は $A$ から辺 $BC$ への垂線の足ではない——辺 $AC$ 上へ下ろした垂線の足とする。$AH$ の長さを、$\\cos 60°$ を使って求めましょう。",
      answer: 3,
      unit: "",
      unknownLabel: "AH",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。有名角の値を、垂線を下ろした直角三角形の中で使う。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、一般の三角形の一部に直角三角形が現れたこと。$AH = AB \\cos 60°$。",
        },
        {
          layer: 3,
          text: "$AH = 6 \\times \\dfrac{1}{2} = 3$。有名角が、垂線の先の一般三角形へ橋を架ける。",
        },
      ],
      formulaPreview: "AH = 6 cos 60° = 3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$\\sin\\theta = \\dfrac{5}{13}$ のとき、$\\cos\\theta$ はいくつでしょう？（鋭角）",
      answer: 12 / 13,
      answerDisplay: "12/13",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。有名角の暗記表には無い比——三平方で残すしかない。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、表に無い有理比から残りを出すこと。向かい $5$・斜辺 $13$ でとなりは？",
        },
        {
          layer: 3,
          text: "となり $= 12$。$\\cos\\theta = \\dfrac{12}{13}$。**表に無い値では有名角の暗記は使えず、三平方が必然**——必然性の1問。",
        },
      ],
      formulaPreview: "sin=5/13 → cos=12/13",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "直角三角形の3辺が $5$、$12$、$13$ のとき、斜辺を挟まない鋭角のうち、向かいが $5$ の角の $\\sin$ はいくつでしょう？（中学のピタゴラスと三角比の合流）",
      answer: 5 / 13,
      answerDisplay: "5/13",
      unit: "",
      unknownLabel: "sin",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は辺が先に全部あり、三角比の言葉で読み直す——[三平方の定理] の系列との合流。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、比を出す向き（辺→比）。斜辺 $13$・向かい $5$。",
        },
        {
          layer: 3,
          text: "$\\sin = \\dfrac{5}{13}$。中学で出会ったピタゴラス数が、三角比の入口と同じ三角形だった。",
        },
      ],
      formulaPreview: "5-12-13 → sin = 5/13（ピタゴラス合流）",
    },
  ],
  derivation: `**中心の問い** ｜ 三角比が1つ分かれば、なぜ残りまで決まる？\n\n────────\n\n**1つの比＋三平方で三角形が決まり、特別な形からは値が生える。**\n\n<<RIGHT_TRIANGLE_ANATOMY>>\n\n<<TRIG_EQUILATERAL_HALF>>\n\n**Step 9**：表に無い比では暗記が通じず、三平方が必然。\n\n**Step 10**：中学のピタゴラスとの合流。\n\n────────\n\n**出典**\n\n- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社\n  — 第3章の節構成を参考。問題の値はすべてオリジナル。\n\n────────\n\n**問いに戻ると**\n\n1つの比と三平方で残りが決まり、有名角は図形から生やせる。`,
};

/** TR4: 垂線で面積・余弦（鋭角）。 */
export const TR_AREA_COSINE_SERIES: LearnerSeries = {
  id: "algebra1_trig_area_cosine_01",
  title: "垂線で面積と余弦定理",
  subtitle: "数Ⅰ・A 三角比より — 一般三角形を垂線で帰着し、面積と余弦まで $10$ 問。",
  patternId: "TR4",
  unit: "algebra_1",
  revelationLabel: "一般三角形は垂線1本で直角三角形に帰着し、sin と cos がブースターになる",
  drivingQuestion: "直角でない三角形でも、なぜ『底辺×高さ÷2』と三平方が蘇る？——垂線1本で直角三角形に帰着したとき、sin と cos は何のブースターになるか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形で2辺が $4$ と $6$、その挟む角が $30°$ のとき、面積はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "直角でない三角形でも、垂線を1本下ろすと直角三角形が現れる。高さは短い辺×[サイン]——面積はどう書ける？",
        },
        {
          layer: 2,
          text: "やることは、高さ $= 4\\sin 30°$ を底辺 $6$ にかけて $2$ で割る形。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot 4\\cdot 6\\cdot \\sin 30° = 12 \\times \\dfrac{1}{2} = 6$。**一般三角形は垂線で直角三角形に帰着する**。",
        },
      ],
      formulaPreview: "S = (1/2)·4·6·sin30° = 6",
      figureMarker: "<<TRIG_ACUTE_ALTITUDE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "2辺が $5$ と $8$、挟む角 $60°$ のとき、面積はいくつでしょう？",
      answer: 17.32050807568877,
      answerDisplay: "10√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ面積公式。変わったのは数と角だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは辺と角の組だけ。$\\sin 60° = \\dfrac{\\sqrt{3}}{2}$。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot 5\\cdot 8\\cdot \\dfrac{\\sqrt{3}}{2} = 10\\sqrt{3}$。",
        },
      ],
      formulaPreview: "S = 20 · (√3/2) = 10√3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "2辺 $b = 4$、$a = 7$、挟む角 $\\theta = 60°$ のとき、垂線の足から角の隣への片 $b\\cos\\theta$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "b cos θ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。面積ではなく、垂線が底辺を切り取る長さ——[コサイン] の顔。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが面積から $b\\cos\\theta$ になったこと。",
        },
        {
          layer: 3,
          text: "$4\\cos 60° = 4 \\times \\dfrac{1}{2} = 2$。余弦定理への部品。",
        },
      ],
      formulaPreview: "4 cos 60° = 2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "2辺 $a = 3$、$b = 4$、挟む角 $60°$ のとき、対辺 $c$ の長さはいくつでしょう？（余弦定理）",
      answer: 3.605551275463989,
      answerDisplay: "√13",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "対辺 c",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題で出した片を使い、三平方で対辺へ——それが [余弦定理] の中身。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、最終的に対辺 $c$ を求めること。$c^2 = a^2+b^2-2ab\\cos\\theta$。",
        },
        {
          layer: 3,
          text: "$c^2 = 9+16-2\\cdot3\\cdot4\\cdot\\dfrac{1}{2} = 25-12 = 13$。$c = \\sqrt{13}$。",
        },
      ],
      formulaPreview: "c² = 9+16-12 = 13",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "公式 $c^2 = a^2+b^2-2ab\\cos\\theta$ で、$a = 5$、$b = 5$、$\\theta = 60°$ のとき $c$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "c",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。手計算の部品ではなく、公式形そのものを使う——三平方の『ブースター』付き。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、公式を一発で使うこと。直角なら $-2ab\\cos$ が消えるが、今は鋭角。",
        },
        {
          layer: 3,
          text: "$c^2 = 25+25-2\\cdot5\\cdot5\\cdot\\dfrac{1}{2} = 50-25 = 25$。$c = 5$（正三角形）。**直角の三平方に cos の補正が付いた形**——質的転換。",
        },
      ],
      formulaPreview: "c² = 50-25 = 25 → c=5",
      figureMarker: "<<TRIG_ACUTE_ALTITUDE>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$a = 3$、$b = 5$、$\\theta = 60°$ のとき、対辺 $c$ はいくつでしょう？",
      answer: 4.358898943540674,
      answerDisplay: "√19",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "c",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ余弦定理。変わったのは辺の長さだけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは数値だけ。",
        },
        {
          layer: 3,
          text: "$c^2 = 9+25-2\\cdot3\\cdot5\\cdot\\dfrac{1}{2} = 34-15 = 19$。$c = \\sqrt{19}$。",
        },
      ],
      formulaPreview: "c = √19",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形の3辺が $3$、$5$、$\\sqrt{19}$ のとき、辺 $3$ と $5$ の挟む角の $\\cos$ はいくつでしょう？",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは角から辺。今度は逆——3辺から cos。",
        },
        {
          layer: 2,
          text: "前題と変わったのは向きだけ。余弦定理を $\\cos$ について解く。",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = \\dfrac{3^2+5^2-19}{2\\cdot3\\cdot5} = \\dfrac{9+25-19}{30} = \\dfrac{15}{30} = \\dfrac{1}{2}$。",
        },
      ],
      formulaPreview: "cos = (9+25-19)/30 = 1/2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "2辺 $7$、$4$、挟む角 $30°$ のとき、まず対辺を余弦で出し、続けて面積を求めると面積はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。余弦と面積を続けて使う——辺が先か面積が先か。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、面積まで一気に求めること。面積は辺と sin だけで足り、対辺は不要でもよい。",
        },
        {
          layer: 3,
          text: "面積だけなら $S = \\dfrac{1}{2}\\cdot7\\cdot4\\cdot\\sin 30° = 14\\times\\dfrac{1}{2} = 7$。対辺を経由しなくても面積は閉じる。",
        },
      ],
      formulaPreview: "S = 14 · sin30° = 7",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$a = 5$、$b = 5$、$c = 6$ のとき、対辺 $c$ に対する角の $\\cos$ はいくつでしょう？",
      answer: 7 / 25,
      answerDisplay: "7/25",
      unit: "",
      unknownLabel: "cos C",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。直角の三平方をそのまま使うと外れる——辺の組が直角ではない。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$25+25 \\ne 36$ なので直角でないこと。余弦の補正項が必然。",
        },
        {
          layer: 3,
          text: "$\\cos C = \\dfrac{25+25-36}{50} = \\dfrac{14}{50} = \\dfrac{7}{25}$。**直角の三平方だけでは届かない鋭角——余弦が必然**。",
        },
      ],
      formulaPreview: "cos C = 14/50 = 7/25",
      figureMarker: "<<TRIG_ACUTE_ALTITUDE>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$\\theta = 90°$ のとき、面積公式 $S = \\dfrac{1}{2}ab\\sin\\theta$ と余弦定理は、中学のどんな公式に戻るでしょう？——面積公式が戻る値として、$a = 6$、$b = 5$ のときの面積を答えましょう。",
      answer: 15,
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。角を直角に特別化すると、三角比の公式は中学の公式に戻る——検算の合流。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$\\sin 90° = 1$、$\\cos 90° = 0$ を入れること。面積は底辺×高さ÷2。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot6\\cdot5\\cdot1 = 15$。余弦は $c^2 = a^2+b^2$。**特別化で中学へ還る**——これが合流。",
        },
      ],
      formulaPreview: "θ=90° → S = ab/2 = 15",
    },
  ],
  derivation: `**中心の問い** ｜ 直角でない三角形でも、なぜ面積と辺の関係が蘇る？\n\n────────\n\n**一般三角形は垂線で直角三角形に帰着する。**\n\n<<TRIG_ACUTE_ALTITUDE>>\n\n面積 $S=\\dfrac{1}{2}ab\\sin\\theta$、余弦 $c^2=a^2+b^2-2ab\\cos\\theta$。直角なら中学の公式に戻る（Step 10）。\n\n────────\n\n**出典**\n\n- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社\n  — 第3章の節構成を参考。問題の値はすべてオリジナル。\n\n────────\n\n**問いに戻ると**\n\n垂線1本で帰着し、sin/cos が三平方と面積のブースターになる。`,
};

/** TR5: 鈍角への拡張（単位円）— 定義を座標に移すと届く角が広がる。単元の質的転換の本丸。 */
export const TR_OBTUSE_SERIES: LearnerSeries = {
  id: "algebra1_trig_obtuse_01",
  title: "鈍角への拡張（単位円）",
  subtitle:
    "数Ⅰ・A 三角比より — 直角三角形が描けない $120°$ に、半径 $1$ の円の上の点が値を与える。負の三角比・$180°-\\theta$ の鏡写し・面積への還流まで $10$ 問。",
  patternId: "TR5",
  unit: "algebra_1",
  revelationLabel:
    "定義を「辺の比」から「単位円上の点の座標」に張り替えると、直角三角形が描けない鈍角でも同じ言葉で読める——鋭角では元の値と一致し、何も壊れない",
  drivingQuestion:
    "直角三角形が描けない $120°$ でも、なぜ同じ $\\sin$・$\\cos$・$\\tan$ が使える？——定義を『辺の比』から『半径 $1$ の円の上の点の座標』に読み替えたとき、角の言葉はどこまで届くか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "系列4の最後に宿題が残っていた——$90°$ を超えた角でも、同じ規則を使えないか。その舞台づくりから始めます。原点 $O$ を中心とする半径 $1$ の円（[単位円]）の上に、$x$ 軸の正の向きから角 $\\theta = 60°$ だけ回った点 $P$ を取ります。$P$ の **$y$ 座標**はいくつでしょう？",
      answer: Math.sqrt(3) / 2,
      answerDisplay: "√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "y 座標",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列2で、[サイン] は「斜辺をものさしにした比」だった——向かい ÷ 斜辺。もし斜辺をいつも $1$ にしてしまったら、$\\sin\\theta$ は何の長さそのものになる？ $P$ から $x$ 軸に垂線を下ろして、斜辺 $1$ の直角三角形を探してみよう。",
        },
        {
          layer: 2,
          text: "$O$・$P$・垂線の足の $3$ 点で、斜辺（半径）$= 1$・角 $60°$ の直角三角形ができる。$P$ の $y$ 座標はこの三角形の「向かいの辺」そのもの——向かい $=$ 斜辺 $\\times \\sin 60°$ で、斜辺が $1$ なら？",
        },
        {
          layer: 3,
          text: "$y = 1 \\times \\sin 60° = \\dfrac{\\sqrt{3}}{2}$。斜辺を $1$ に固定すると、$\\sin\\theta$ は「比」ではなく**点 $P$ の高さそのもの**になる。同じく $\\cos\\theta$ は横の位置。**定義が「辺の比」から「点の座標」に言い換えられた**——値は何も変わっていないのに、この言い換えこそが、直角三角形の描けない角まで届く入口になる。",
        },
      ],
      formulaPreview: "斜辺1 → sin 60° = y = √3/2",
      figureMarker: "<<TRIG_UNIT_SEMI>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ点 $P$（$\\theta = 60°$）の **$x$ 座標**はいくつでしょう？",
      answer: 1 / 2,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "x 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ点 $P$・同じ直角三角形。変わったのは、読むのが高さでなく横の位置になっただけ。斜辺 $1$ のとき、となりの辺の長さは、何と呼ばれていた比の値そのものになる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $y$ から $x$ へ——つまり [サイン] から [コサイン] へ。となり $=$ 斜辺 $\\times \\cos 60°$ で、斜辺は $1$。",
        },
        {
          layer: 3,
          text: "$x = \\cos 60° = \\dfrac{1}{2}$。まとめると $P$ の座標は $(\\cos\\theta, \\sin\\theta)$——**$1$ つの点が $\\cos$ と $\\sin$ を同時に運ぶ**。三角比を座標の言葉で読む準備が、これで整った。",
        },
      ],
      formulaPreview: "cos 60° = x = 1/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "角をどんどん小さくして $\\theta = 0°$ にします。直角三角形はぺしゃんこにつぶれて消えてしまう——でも点 $P$ は円の上に残っている。$\\sin 0°$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "sin 0°",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「$P$ の座標を読む」。変わったのは、角が三角形の作れない境界まで来たこと。$\\theta = 0°$ の点 $P$ は、円のどこにいる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、三角形が消えたこと——でも読み方は座標のまま。$x$ 軸から回らない角 $0°$ の点は $P(1, 0)$。$\\sin$ はどちらの座標だった？",
        },
        {
          layer: 3,
          text: "$P = (1, 0)$ なので $\\sin 0° = 0$（ついでに $\\cos 0° = 1$）。**三角形は消えても、点は消えない**。「辺の比」の定義では立ち入れなかった角に、座標の定義が最初の一歩を踏み込んだ——この調子なら、$90°$ の先へも進めそうだ。",
        },
      ],
      formulaPreview: "P(1,0) → sin 0° = 0",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "いよいよ $90°$ の壁を越えます。$\\theta = 120°$——直角のほかに $90°$ 以上の角を持つ直角三角形は描けないので、「向かい ÷ 斜辺」の定義はここで沈黙する。でも単位円の上には、$120°$ の点 $P$ がちゃんと置ける。$\\sin 120°$ はいくつでしょう？",
      answer: Math.sqrt(3) / 2,
      answerDisplay: "√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "sin 120°",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step1 と比べてみよう。同じ円・同じ「高さを読む」。変わったのは、点 $P$ が $y$ 軸の左側（第 $2$ 象限）へ回り込んだこと。左側にいても、$P$ の高さは読める？",
        },
        {
          layer: 2,
          text: "step1 と変わったのは $P$ の場所だけ。$P$ から $x$ 軸へ垂線を下ろすと、今度は円の左半分に直角三角形ができる——その三角形が $x$ 軸となす角は $180° - 120°$ で何度？ その角の点と $120°$ の点の高さは、どう見比べられる？",
        },
        {
          layer: 3,
          text: "$180° - 120° = 60°$。$120°$ の点は $60°$ の点を $y$ 軸で鏡写しにした位置にあり、**高さは同じ**。よって $\\sin 120° = \\sin 60° = \\dfrac{\\sqrt{3}}{2}$（正のまま）。直角三角形が描けなくなった角に、初めて値が付いた——**描けない三角形の代わりに、円の上の点が値を続けてくれる**。定義の張り替えが実を結んだ瞬間。",
        },
      ],
      formulaPreview: "120° は 60° の鏡写し → sin 120° = √3/2",
      figureMarker: "<<TRIG_UNIT_SEMI>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ $\\theta = 120°$ の点 $P$ で、今度は $\\cos 120°$ はいくつでしょう？",
      answer: -1 / 2,
      answerDisplay: "-1/2",
      unit: "",
      unknownLabel: "cos 120°",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ点 $P$。変わったのは、読むのが高さから横の位置になったこと。$y$ 軸の左側にいる点の $x$ 座標は、正・負のどちら？",
        },
        {
          layer: 2,
          text: "前題と変わったのは読む座標だけ——でも今度は**符号**が新しい仕事をする。鏡写しの相手 $60°$ の $x$ 座標は $+\\dfrac{1}{2}$ だった。$y$ 軸で左へ鏡写しにすると、$x$ 座標はどうなる？",
        },
        {
          layer: 3,
          text: "$\\cos 120° = -\\dfrac{1}{2}$。**負の三角比の誕生**である。「辺の長さは負になれないのだから、三角比も正のはず」と思うと、ここでつまずく——「辺の比」の定義ではそのとおりだったが、いまの定義は**座標**であり、座標は負になれる。負の $\\cos$ は「点が左半分にいる」という**向きの情報**。座標の定義でしか出せない値が、ここから始まる。",
        },
      ],
      formulaPreview: "第2象限の x は負 → cos 120° = -1/2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$3$ 兄弟の最後、[タンジェント] も鈍角へ連れて行きます。単位円の言葉では、$\\tan\\theta$ は直線 $OP$ の**傾き**（系列1の最後で出会った、あの読み方）。$\\theta = 135°$ のとき $\\tan 135°$ はいくつでしょう？",
      answer: -1,
      answerDisplay: "-1",
      unit: "",
      unknownLabel: "tan 135°",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\sin$ と $\\cos$ は鈍角へ渡れた。残る $\\tan$ は、系列1で「かたむき」だった——原点から $135°$ の方向へ引いた直線 $OP$ は、右上がり？ 右下がり？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、読むものが座標から傾きになったこと。$135°$ の点は $45°$ の鏡写しで $P\\left(-\\dfrac{1}{\\sqrt{2}}, \\dfrac{1}{\\sqrt{2}}\\right)$。傾きは 縦 ÷ 横——分子と分母の符号を見比べると？",
        },
        {
          layer: 3,
          text: "$\\tan 135° = \\dfrac{\\sin 135°}{\\cos 135°} = \\dfrac{1/\\sqrt{2}}{-1/\\sqrt{2}} = -1$。左上へ向かう直線は右下がり——傾きが負になるのは、絵を見ればそのとおり。$\\sin$ は高さ・$\\cos$ は横・$\\tan$ は傾き。**$3$ つの読み方がそろって $0°$〜$180°$ の世界へ引っ越した**。",
        },
      ],
      formulaPreview: "tan 135° = (1/√2)/(-1/√2) = -1",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "逆向きに読みます。直線 $OP$ の傾き（$\\tan\\theta$）が $-\\sqrt{3}$ で、$0° < \\theta < 180°$ のとき、$\\theta$ は何度でしょう？",
      answer: 120,
      unit: "",
      unknownLabel: "θ（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは角から値へ進んだ。今度はその逆——値から角へ戻る。傾きが**負**という情報は、点 $P$ が半円のどちら側にいるかを、計算より先に教えてくれないかな？",
        },
        {
          layer: 2,
          text: "前題と変わったのは矢印の向きだけ。傾きの大きさ $\\sqrt{3}$ は、鋭角なら $60°$ の傾き。でも符号が負だから $P$ は左半分——$60°$ を $y$ 軸で鏡写しにした角は？",
        },
        {
          layer: 3,
          text: "$\\tan 60° = \\sqrt{3}$ を鏡写しにして、$\\theta = 180° - 60° = 120°$。値から角への逆読みは「**大きさで候補を出し、符号で場所を選ぶ**」の $2$ 段構え。この手つきは、数Ⅱの三角方程式（値から角をすべて拾う）でそのまま主役になる——半円で身につけた読みが、円 $1$ 周の世界へ広がっていく。",
        },
      ],
      formulaPreview: "大きさ√3 → 60°、負 → 左半分 → θ = 120°",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "ここまで何度も使った鏡写しの関係を、そろそろ道具として持ち歩けるようにしましょう。$150° = 180° - 30°$ です。$\\sin 150°$ はいくつでしょう？",
      answer: 1 / 2,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "sin 150°",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ鏡写しの読み。$180° - \\theta$ の点と $\\theta$ の点は、単位円のどこで向かい合っている？ $2$ つの点の高さは、どう見比べられる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、鏡写しを「いつでも使える形」で言い切ること。$150°$ の点は $30°$ の点の $y$ 軸鏡写し——高さ（$y$ 座標）は変わる？ 変わらない？",
        },
        {
          layer: 3,
          text: "$\\sin 150° = \\sin 30° = \\dfrac{1}{2}$。一般に $\\sin(180° - \\theta) = \\sin\\theta$、$\\cos(180° - \\theta) = -\\cos\\theta$。検算に単位円で直読みしても、$150°$ の点の高さはたしかに $\\dfrac{1}{2}$——**公式の道と絵の道が、同じ値で合流する**。この式は暗記の対象ではなく、半円の鏡写しの絵をそのまま式にしただけ。忘れても絵から $1$ 分で再現できる。",
        },
      ],
      formulaPreview: "sin(180°-θ) = sin θ → sin 150° = 1/2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "ここで罠をひとつ。有名角の表を覚えている人ほど、$\\cos 150°$ を「$30°$ の仲間だから $\\cos 30°$ と同じ」と書きたくなる——本当にそれでいい？ $\\cos 150°$ はいくつでしょう？",
      answer: -Math.sqrt(3) / 2,
      answerDisplay: "-√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos 150°",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ $150°$・同じ鏡写し。変わったのは、読むのが高さから横の位置へ。鏡写しで**変わらない**のは高さだった——では、横の位置はどうなる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $\\cos$ 側になったことだけ。$y$ 軸で鏡写しにすると、点は右半分から左半分へ移る——大きさは $\\cos 30°$ のまま、符号は？",
        },
        {
          layer: 3,
          text: "$\\cos 150° = -\\cos 30° = -\\dfrac{\\sqrt{3}}{2}$。鋭角の表をそのまま貼ると $+\\dfrac{\\sqrt{3}}{2}$ になって外れる——**表の暗記は「大きさ」までしか運ばず、符号は点の場所（座標）だけが知っている**。鈍角の値は、表引きでは決して決まらない。座標で読む——それが、この系列で手に入れた、鈍角に届く唯一の言葉。",
        },
      ],
      formulaPreview: "cos 150° = -cos 30° = -√3/2（符号は座標が選ぶ）",
      figureMarker: "<<TRIG_UNIT_SEMI>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "拡張の成果を回収します。系列4の面積の道具は、あのときは鋭角にしか使えなかった。いま、$2$ 辺が $4$ と $6$、挟む角が $120°$ の三角形の面積はいくつでしょう？",
      answer: 6 * Math.sqrt(3),
      answerDisplay: "6√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。鈍角の三角比が読めるようになった今、系列4の面積の道具に入れられない角は、まだ残っているだろうか？ $\\sin 120°$ の符号を思い出すと？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、鈍角の値を**使う**側に回ったこと。$\\sin 120°$ は step4 で出した——正の値だから、系列4の $S = \\dfrac{1}{2}ab\\sin\\theta$ はそのまま働く。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2} \\cdot 4 \\cdot 6 \\cdot \\sin 120° = 12 \\times \\dfrac{\\sqrt{3}}{2} = 6\\sqrt{3}$。$0° < \\theta < 180°$ で $\\sin\\theta$ はつねに正——だから面積公式は、鈍角三角形にも**一文字も書き換えずに**届くようになった。**公式は変えず、定義を広げる。それだけで前の道具が全部強くなる**——これが拡張という仕事の成果。",
        },
      ],
      formulaPreview: "S = (1/2)·4·6·sin 120° = 6√3",
    },
  ],
  derivation: `**中心の問い** ｜ 直角三角形が描けない $120°$ でも、なぜ同じ $\\sin$・$\\cos$・$\\tan$ が使える？——定義を『辺の比』から『半径 $1$ の円の上の点の座標』に読み替えたとき、角の言葉はどこまで届くか？

────────

**定義を座標に移すと、届く角が広がる。**

系列4の最後に、宿題が残っていました。$2$ 辺と挟む角で面積が出る・$3$ 辺の関係が結べる——せっかく手に入れた道具なのに、挟む角が $120°$ の三角形には使えない。$\\sin 120°$ を作ろうにも、「向かい ÷ 斜辺」の定義は**直角三角形**の中でしか意味を持たず、直角三角形は直角のほかに $90°$ 以上の角を持てないからです。道具が足りないのではない。**定義が狭い**のです。

そこで定義を張り替えます。種は系列2にありました。$\\sin$・$\\cos$ は「斜辺をものさしにした比」——なら、**斜辺をいつも $1$ に固定**してしまえば、$\\sin\\theta$ は向かいの辺の長さそのもの、$\\cos\\theta$ はとなりの辺の長さそのもの。この斜辺 $1$ の三角形を、原点中心・半径 $1$ の円（[単位円]）に住まわせると：

<<TRIG_UNIT_SEMI>>

$$\\cos\\theta = P \\text{ の } x \\text{ 座標}, \\quad \\sin\\theta = P \\text{ の } y \\text{ 座標}, \\quad \\tan\\theta = \\text{直線 } OP \\text{ の傾き}$$

**ここが胚細胞**：新しい定義は、鋭角では古い定義と**同じ値**を返します（何も壊れない）。それでいて、点 $P$ は $120°$ でも $150°$ でも $180°$ でも円の上に置ける。**三角形は描けなくなっても、点は円の上を進み続ける**——定義を座標に移した瞬間、角の言葉の届く範囲が $0°$〜$180°$ まで一気に広がるのです。

**Step 1〜3：張り替えて、何も壊れないことを確かめる**

$\\sin 60° = \\dfrac{\\sqrt{3}}{2}$ は、座標で読んでも同じ値（Step 1〜2）。境界の $0°$ では三角形がぺしゃんこにつぶれるのに、$P(1, 0)$ は健在で $\\sin 0° = 0$ と読める（Step 3）——座標の読みは、三角形が消えても生きる。

**Step 4〜6：鈍角の値が生まれる（質的変化）**

$120°$ の点は $60°$ の点の $y$ 軸鏡写し。高さは同じだから $\\sin 120° = \\dfrac{\\sqrt{3}}{2}$（正のまま）。ところが $x$ 座標は左半分へ移って $\\cos 120° = -\\dfrac{1}{2}$——**負の三角比の誕生**です。辺の長さは負になれないが、座標は負になれる。負の $\\cos$ は「点が左半分にいる」という**向きの情報**。$\\tan$ も傾きのまま連れて行けて、$\\tan 135° = -1$（左上へ向かう直線は右下がり）。

| 角の範囲 | $\\sin\\theta$（高さ） | $\\cos\\theta$（横） | $\\tan\\theta$（傾き） |
|---|---|---|---|
| $0° < \\theta < 90°$ | $+$ | $+$ | $+$ |
| $90° < \\theta < 180°$ | $+$ | $-$ | $-$ |

$0°$〜$180°$ の半円では**高さ（$\\sin$）だけがつねに正**——これが Step 10 で効いてきます。

**Step 7：逆読み——値から角へ**

傾き $-\\sqrt{3}$ から $\\theta = 120°$。「**大きさで候補を出し（$\\sqrt{3}$ なら $60°$）、符号で場所を選ぶ（負なら左半分）**」の $2$ 段構え。この手つきは数Ⅱの三角方程式でそのまま主役になります。

**Step 8〜9：$180° - \\theta$ の鏡写し**

$$\\sin(180° - \\theta) = \\sin\\theta, \\qquad \\cos(180° - \\theta) = -\\cos\\theta$$

これは覚える公式ではなく、**半円の鏡写しの絵をそのまま式にしたもの**。高さは変わらず、横は符号ごと裏返る。Step 9 の $\\cos 150°$ は、鋭角の表をそのまま貼ると $+\\dfrac{\\sqrt{3}}{2}$ で外れる——**表の暗記は大きさまでしか運ばない。符号は点の場所だけが知っている**。鈍角の世界で「座標で読む」以外に道がない理由が、ここにあります。

**Step 10：拡張の成果——前の道具が全部強くなる（合流）**

系列4の面積公式 $S = \\dfrac{1}{2}ab\\sin\\theta$ に $\\sin 120°$（正）を入れて $6\\sqrt{3}$。半円で $\\sin$ がつねに正だから、面積公式は**一文字も書き換えずに**鈍角三角形へ届く。次の系列（相互関係）でも、系列7の「$3$ 辺から面積」でも、この鈍角対応が土台として働き続けます。

────────

**もっと深く** — 「法則を保って定義を広げる」という作法

今回の張り替えには、守られた約束が $1$ つあります。**鋭角では古い定義と同じ値を返す**こと。新しい定義が古い世界を壊さない——だから安心して広い世界へ乗り換えられる。実はこの作法、指数法則を保ったまま $a^0 = 1$ や負の指数へ広げるときの手つきとまったく同じです。数学の「拡張」は気まぐれな発明ではなく、**古い法則を保つように新しい定義を選ぶ**、いつも同じ職人仕事なのです。

そして——$180°$ で止まる理由は、実はもうありません。点 $P$ は円の上をさらに回り続けられる。$1$ 周を越えても、逆向きに回っても、「角に点を対応させて座標を読む」はそのまま働く。そこから先が数Ⅱの [一般角] と三角関数の世界です（この半円は、あのぐるぐる回る世界の、ちょうど最初の半周）。$180° - \\theta$ の鏡写しの類いも、忘れたら半円の絵を描けば $1$ 分で再現できる——**暗記の在庫でなく、絵から生やす手つき**を持って進めば、数Ⅱの折り返し公式たちも同じ絵の延長で読めます。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第3章「三角比」の節構成（$0°$〜$180°$ への拡張・単位円による定義・$180° - \\theta$ の関係）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

「直角三角形が描けない $120°$ でも、なぜ同じ三角比が使える？」——定義を「辺の比」から「[単位円] 上の点の座標」に張り替えたから。張り替えは鋭角の値を $1$ つも変えず（何も壊さず）、そのうえで三角形の描けない角にまで点を進める。高さが $\\sin$・横が $\\cos$・傾きが $\\tan$——角の言葉は半円の端 $180°$ まで届き、しかも、そこで止まる理由はもう無い。その先の一周・二周を読むのが、数Ⅱの [一般角] の仕事です。`,
};

/** TR6: 三角比の相互関係 */
export const TR_IDENTITY_RATIO_SERIES: LearnerSeries = {
  id: "algebra1_trig_identity_01",
  title: "三角比の相互関係",
  subtitle: "数Ⅰ・A 三角比より — 1つと象限から残りを出し、0°〜180°で $10$ 問。",
  patternId: "TR6",
  unit: "algebra_1",
  revelationLabel: "sin・cos・tan は別々の量ではなく、同じ点を3通りに読んだもの——恒等式が自由度を縛る",
  drivingQuestion: "sin・cos・tan のうち1つ（と鋭か鈍か）を知っただけで、なぜ残りまで決まる？——3つは別々の量ではなく、同じ点を3通りに読んだものだとしたら？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "鋭角 $\\theta$ について $\\sin\\theta = \\dfrac{3}{5}$ のとき、$\\cos\\theta$ はいくつでしょう？（相互関係 $\\sin^2+\\cos^2=1$・正の値）",
      answer: 4 / 5,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列5で点は単位円の上に乗ることを見た。$x=\\cos\\theta$、$y=\\sin\\theta$ と置くと、どんな約束式になる？ [相互関係] の第1式。",
        },
        {
          layer: 2,
          text: "やることは、$\\cos^2\\theta = 1-\\sin^2\\theta$ から正の平方根を取る（鋭角）。",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = \\sqrt{1-\\dfrac{9}{25}} = \\sqrt{\\dfrac{16}{25}} = \\dfrac{4}{5}$。記法 $\\sin^2\\theta$ は $(\\sin\\theta)^2$ の略——$\\sin(\\theta^2)$ ではない。",
        },
      ],
      formulaPreview: "cos = √(1-(3/5)²) = 4/5",
      figureMarker: "<<UNIT_CIRCLE_IDENTITY>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "鋭角で $\\cos\\theta = \\dfrac{5}{13}$ のとき、$\\sin\\theta$ はいくつでしょう？",
      answer: 12 / 13,
      answerDisplay: "12/13",
      unit: "",
      unknownLabel: "sin θ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ相互関係。変わったのは与えが cos。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、sin を残す側になったこと。",
        },
        {
          layer: 3,
          text: "$\\sin\\theta = \\sqrt{1-\\dfrac{25}{169}} = \\dfrac{12}{13}$。",
        },
      ],
      formulaPreview: "sin = 12/13",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "鋭角で $\\sin\\theta = \\dfrac{3}{5}$、$\\cos\\theta = \\dfrac{4}{5}$ のとき、$\\tan\\theta$ はいくつでしょう？",
      answer: 3 / 4,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "tan θ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。第2の相互関係——$\\tan = \\sin/\\cos$。",
        },
        {
          layer: 2,
          text: "前題と変わったのは tan まで継ぎ足すこと。",
        },
        {
          layer: 3,
          text: "$\\tan\\theta = \\dfrac{3/5}{4/5} = \\dfrac{3}{4}$。",
        },
      ],
      formulaPreview: "tan = sin/cos = 3/4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "鈍角 $\\theta$ で $\\sin\\theta = \\dfrac{3}{5}$ のとき、$\\cos\\theta$ はいくつでしょう？（負）",
      answer: -4 / 5,
      answerDisplay: "-4/5",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。絶対値は同じでも、鈍角では cos の符号が変わる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは象限（鋭→鈍）。平方根のあとに符号を選ぶ。",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = -\\dfrac{4}{5}$。**値だけでは決まらず、鋭か鈍かが符号を選ぶ**——質的転換。",
        },
      ],
      formulaPreview: "鈍角 → cos = -4/5",
      figureMarker: "<<UNIT_CIRCLE_Q2>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "鈍角で $\\sin\\theta = \\dfrac{5}{13}$ のとき、$\\tan\\theta$ はいくつでしょう？",
      answer: -5 / 12,
      answerDisplay: "-5/12",
      unit: "",
      unknownLabel: "tan θ",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ鈍角の符号ルール。cos を出してから tan。",
        },
        {
          layer: 2,
          text: "前題と変わったのは数値と、最後に tan まで行くこと。",
        },
        {
          layer: 3,
          text: "$\\cos\\theta = -\\dfrac{12}{13}$、$\\tan\\theta = \\dfrac{5/13}{-12/13} = -\\dfrac{5}{12}$。",
        },
      ],
      formulaPreview: "tan = -5/12",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "鋭角で $\\tan\\theta = 2$ のとき、$\\cos\\theta$ はいくつでしょう？（$1+\\tan^2 = 1/\\cos^2$）",
      answer: 1 / Math.sqrt(5),
      answerDisplay: "1/√5",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは sin から入った。今度は tan が先——第3の相互関係。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えが tan なこと。$\\dfrac{1}{\\cos^2} = 1+\\tan^2$ から cos を出す（鋭角は正）。",
        },
        {
          layer: 3,
          text: "$\\dfrac{1}{\\cos^2\\theta} = 1+4 = 5$。$\\cos\\theta = \\dfrac{1}{\\sqrt{5}}$。",
        },
      ],
      formulaPreview: "1/cos² = 5 → cos = 1/√5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "鋭角で $\\tan\\theta = \\dfrac{3}{4}$ のとき、$\\sin\\theta$ はいくつでしょう？",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "",
      unknownLabel: "sin θ",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。tan から cos を出し、続けて sin＝tan×cos。",
        },
        {
          layer: 2,
          text: "前題と変わったのは数値。または直角三角形に辺 $3,4,5$ を置いても同じ。",
        },
        {
          layer: 3,
          text: "$\\cos = \\dfrac{4}{5}$、$\\sin = \\dfrac{3}{4}\\cdot\\dfrac{4}{5} = \\dfrac{3}{5}$。",
        },
      ],
      formulaPreview: "sin = 3/5",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "鋭角で $\\sin\\theta + \\cos\\theta = \\dfrac{7}{5}$ のとき、$\\sin\\theta\\cos\\theta$ の値はいくつでしょう？（両辺を2乗）",
      answer: 12 / 25,
      answerDisplay: "12/25",
      unit: "",
      unknownLabel: "sin cos の積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は対称式——sin と cos の和が与えられたとき、積はどう見える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、1つの比でなく和が与えられたこと。$(s+c)^2 = s^2+c^2+2sc$。",
        },
        {
          layer: 3,
          text: "$\\dfrac{49}{25} = 1 + 2sc$ より $2sc = \\dfrac{24}{25}$、$sc = \\dfrac{12}{25}$。",
        },
      ],
      formulaPreview: "(s+c)² = 1+2sc → sc=12/25",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$\\sin\\theta = \\dfrac{3}{5}$ で、$\\theta$ が鈍角のとき、$\\cos\\theta$ はいくつでしょう？——符号を落とすと鋭角の答えになってしまう。",
      answer: -4 / 5,
      answerDisplay: "-4/5",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。計算の骨格は step1 と同じ。素朴に正の根だけ取ると、どの角の値になってしまう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、象限指定（鈍角）が答えを分けること——符号が必然。",
        },
        {
          layer: 3,
          text: "絶対値は $\\dfrac{4}{5}$ だが鈍角なので $\\cos\\theta = -\\dfrac{4}{5}$。**符号を落とすと別の角の値になる——象限指定が必然**。",
        },
      ],
      formulaPreview: "鈍角 → cos = -4/5",
      figureMarker: "<<UNIT_CIRCLE_Q2>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$\\sin\\theta = \\dfrac{3}{5}$（鋭角）のとき、系列3のように図で三平方を使った $\\cos$ と、相互関係の式で出した $\\cos$ は同じ値になる。その共通の値はいくつでしょう？",
      answer: 4 / 5,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "cos θ",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。図の三平方（系列3）と相互関係の式は同じ結論——交差検算の合流。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、鋭角に戻して2つの道を重ねること。",
        },
        {
          layer: 3,
          text: "どちらも $\\dfrac{4}{5}$。**図でやったことと式は同じ事実の2つの顔**。",
        },
      ],
      formulaPreview: "図でも式でも cos = 4/5",
    },
  ],
  derivation: `**中心の問い** ｜ 1つ分かれば、なぜ残りまで決まる？

────────

**恒等式は自由度を縛る。**

<<UNIT_CIRCLE_IDENTITY>>

数Ⅱの相互関係系列の下側（度数・0°〜180°）。

────────

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第3章の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

3つは同じ点の3つの読みであり、1つと象限で残りが決まる。`,
};

/** TR7: 面積と余弦の図形応用 */
export const TR_COSINE_APP_SERIES: LearnerSeries = {
  id: "algebra1_trig_cosine_app_01",
  title: "面積と余弦の図形応用",
  subtitle: "数Ⅰ・A 三角比より — 3辺から面積へ、測量の複合まで $10$ 問。",
  patternId: "TR7",
  unit: "algebra_1",
  revelationLabel: "必要なのは sinθ であって θ そのものではない——3辺があれば面積は必ず出る",
  drivingQuestion: "3辺だけ与えられた三角形の面積は、なぜ必ず求められる？——角の具体値が分からなくても、cos→sin→面積とつなぐ一本道があるとしたら、三角比の『成果』は何か？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "2辺が $8$ と $4$、挟む角 $120°$ の三角形の面積はいくつでしょう？",
      answer: 8 * Math.sqrt(3),
      answerDisplay: "8√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列5で鈍角の sin が正であることを見た。面積公式に入れると？——角の具体値が分からなくても、三角比の値が動けば面積は出る。",
        },
        {
          layer: 2,
          text: "やることは $S = \\dfrac{1}{2}ab\\sin\\theta$。$\\sin 120° = \\dfrac{\\sqrt{3}}{2}$。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot8\\cdot4\\cdot\\dfrac{\\sqrt{3}}{2} = 8\\sqrt{3}$。",
        },
      ],
      formulaPreview: "S = 16 · sin120° = 8√3",
      figureMarker: "<<TRIG_OBTUSE_TRIANGLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "2辺 $6$、$6$、挟む角 $60°$ の面積はいくつでしょう？",
      answer: (9 * Math.sqrt(3)) / 2,
      answerDisplay: "9√3/2",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ。変わったのは鋭角。",
        },
        {
          layer: 2,
          text: "前題と変わったのは角が鋭角になったこと。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot6\\cdot6\\cdot\\dfrac{\\sqrt{3}}{2} = \\dfrac{9\\sqrt{3}}{2}$。",
        },
      ],
      formulaPreview: "S = 9√3/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "2辺 $3$、$5$、挟む角 $120°$ のとき、対辺はいくつでしょう？（余弦定理）",
      answer: 7,
      answerDisplay: "7",
      unit: "",
      unknownLabel: "対辺",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。面積ではなく対辺——余弦。鈍角では cos が負なので、対辺は鋭角のときより長くなりやすい。",
        },
        {
          layer: 2,
          text: "前題と変わったのは求めるものが辺になったこと。$\\cos 120° = -\\dfrac{1}{2}$。",
        },
        {
          layer: 3,
          text: "$c^2 = 9+25-2\\cdot3\\cdot5\\cdot(-\\dfrac{1}{2}) = 34+15 = 49$。$c = 7$。",
        },
      ],
      formulaPreview: "c² = 34+15 = 49 → c=7",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "3辺が $3$、$5$、$7$ のとき、辺 $3$ と $5$ の挟む角の $\\cos$ はいくつでしょう？",
      answer: -1 / 2,
      answerDisplay: "-1/2",
      unit: "",
      unknownLabel: "cos",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。逆向き——3辺から cos。",
        },
        {
          layer: 2,
          text: "前題と変わったのは向き。",
        },
        {
          layer: 3,
          text: "$\\cos = \\dfrac{9+25-49}{30} = \\dfrac{-15}{30} = -\\dfrac{1}{2}$。",
        },
      ],
      formulaPreview: "cos = -1/2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "3辺が $7$、$8$、$9$ の三角形の面積はいくつでしょう？（cos→sin→面積。角の具体値は不要）",
      answer: 12 * Math.sqrt(5),
      answerDisplay: "12√5",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。角 $\\theta$ の度数は分からない。それでも面積は出せる——この系列の核。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、3辺だけから面積まで行くこと。必要なのは $\\sin\\theta$ であって $\\theta$ そのものではない。",
        },
        {
          layer: 3,
          text: "$\\cos = \\dfrac{49+64-81}{112} = \\dfrac{2}{7}$、$\\sin = \\sqrt{1-\\dfrac{4}{49}} = \\dfrac{3\\sqrt{5}}{7}$、$S = \\dfrac{1}{2}\\cdot7\\cdot8\\cdot\\dfrac{3\\sqrt{5}}{7} = 12\\sqrt{5}$。**θ 不要で面積が閉じる**——質的転換。",
        },
      ],
      formulaPreview: "cos→sin→S = 12√5",
      figureMarker: "<<TRIG_SSS_TRIANGLE>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "3辺が $5$、$5$、$6$ の三角形の面積はいくつでしょう？",
      answer: 12,
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ（cos から sin、そして面積へ）。変わったのは辺の組だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは辺の組だけ。",
        },
        {
          layer: 3,
          text: "$\\cos = \\dfrac{7}{25}$、$\\sin = \\dfrac{24}{25}$、$S = \\dfrac{1}{2}\\cdot5\\cdot5\\cdot\\dfrac{24}{25} = 12$。",
        },
      ],
      formulaPreview: "S = 12",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "面積が $6$、$2$ 辺が $4$ と $3$ のとき、その挟む角の $\\sin$ はいくつでしょう？（鋭角とする）",
      answer: 1,
      answerDisplay: "1",
      unit: "",
      unknownLabel: "sin θ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは辺から面積。今度は逆——面積と2辺から sin。",
        },
        {
          layer: 2,
          text: "前題と変わったのは向き。$S = \\dfrac{1}{2}ab\\sin\\theta$ を sin について解く。",
        },
        {
          layer: 3,
          text: "$\\sin\\theta = \\dfrac{2S}{ab} = \\dfrac{12}{12} = 1$。よって $90°$。",
        },
      ],
      formulaPreview: "sin = 2S/(ab) = 1",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "四角形を対角線で2つの三角形に分ける。一方は2辺 $5$、$12$、挟む角 $90°$、他方は2辺 $9$、$12$、挟む角 $90°$。四角形の面積はいくつでしょう？",
      answer: 84,
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形が2つ——面積を合わせると四角形になる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、四角形を分割すること。",
        },
        {
          layer: 3,
          text: "$S = \\dfrac{1}{2}\\cdot5\\cdot12 + \\dfrac{1}{2}\\cdot9\\cdot12 = 30 + 54 = 84$。",
        },
      ],
      formulaPreview: "S = 30 + 54 = 84",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "3辺が $6$、$7$、$8$ の三角形の面積はいくつでしょう？（角の度数は求めにくくてよい）",
      answer: (21 * Math.sqrt(15)) / 4,
      answerDisplay: "21√15/4",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。θ を度数で出そうとして止まらない——sin さえあれば面積は閉じる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、また3辺だけからの面積。cos→sin→S。",
        },
        {
          layer: 3,
          text: "$\\cos = \\dfrac{36+49-64}{84} = \\dfrac{1}{4}$、$\\sin = \\dfrac{\\sqrt{15}}{4}$、$S = \\dfrac{1}{2}\\cdot6\\cdot7\\cdot\\dfrac{\\sqrt{15}}{4} = \\dfrac{21\\sqrt{15}}{4}$。**θ を求めようとして止まる必要はない**。",
        },
      ],
      formulaPreview: "S = 21√15/4",
      figureMarker: "<<TRIG_SSS_TRIANGLE>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "平面上の2点 $A$、$B$ の距離が $6$ で、$\\angle ABH = 60°$ とする。塔の高さ $CH = h$ について、$AH = h\\sqrt{3}$（仰角 $30°$）、$BH = h$（仰角 $45°$）のとき、$h$ はいくつでしょう？（系列1の tan と余弦の合流）",
      answer: 3,
      unit: "",
      unknownLabel: "高さ h",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。測量の場面——水平な三角形に余弦、高さに tan（系列1）。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、立体を平面の三角形に落とすこと。$\\triangle ABH$ で余弦定理。",
        },
        {
          layer: 3,
          text: "$3h^2 = 36 + h^2 - 2\\cdot6\\cdot h\\cdot\\dfrac{1}{2}$ より $2h^2 + 6h - 36 = 0$、$h^2+3h-18=0$、$h = 3$（正）。系列1の tan と本章の余弦が合流する。",
        },
      ],
      formulaPreview: "余弦+仰角 → h = 3",
    },
  ],
  derivation: `**中心の問い** ｜ 3辺だけで面積はなぜ必ず出る？

────────

**必要なのは $\\sin\\theta$ であって $\\theta$ そのものではない。**

<<TRIG_SSS_TRIANGLE>>

────────

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第3章の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

cos→sin→面積の一本道が、三角比の大きな成果である。`,
};

/** TR8: 正弦定理と外接円 */
export const TR_SINE_LAW_SERIES: LearnerSeries = {
  id: "algebra1_trig_sine_law_01",
  title: "正弦定理と外接円",
  subtitle: "数Ⅰ・A 三角比より — 向かい合う辺と角を外接円で結び $10$ 問。",
  patternId: "TR8",
  unit: "algebra_1",
  revelationLabel: "向かい合う辺と角は、外接円を介して同じものさしで比例する",
  drivingQuestion: "辺と対角のペアが、なぜ外接円の直径と同じものさしで揃う？——三角比が『三角形の中だけ』の話だと思っていたら、いつ円が必要になったか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形で $b = 4$、$B = 120°$、$A = 30°$ のとき、辺 $a$ はいくつでしょう？（正弦定理）",
      answer: (4 * Math.sqrt(3)) / 3,
      answerDisplay: "4√3/3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "辺 a",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "面積や余弦とは違い、[正弦定理] には外接円が現れる。向かい合う辺と角のペア——既知のペアはどれ？",
        },
        {
          layer: 2,
          text: "やることは、既知の $b,B$ から $a = b \\cdot \\dfrac{\\sin A}{\\sin B}$。",
        },
        {
          layer: 3,
          text: "$a = 4 \\cdot \\dfrac{\\sin 30°}{\\sin 120°} = 4 \\cdot \\dfrac{1/2}{\\sqrt{3}/2} = \\dfrac{4}{\\sqrt{3}} = \\dfrac{4\\sqrt{3}}{3}$。",
        },
      ],
      formulaPreview: "a = 4 · sin30/sin120 = 4√3/3",
      figureMarker: "<<TRIG_CIRCUM_TRIANGLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ三角形で $C = 30°$ のとき、辺 $c$ はいくつでしょう？",
      answer: (4 * Math.sqrt(3)) / 3,
      answerDisplay: "4√3/3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "辺 c",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$A=C=30°$ なら辺も等しい——同じ手つき。",
        },
        {
          layer: 2,
          text: "前題と変わったのはペアが $c,C$ になったこと。",
        },
        {
          layer: 3,
          text: "$c = 4 \\cdot \\dfrac{\\sin 30°}{\\sin 120°} = \\dfrac{4\\sqrt{3}}{3}$。$a=c$（二等辺）。",
        },
      ],
      formulaPreview: "c = 4√3/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ三角形で外接円の半径 $R$ はいくつでしょう？",
      answer: 4 / Math.sqrt(3),
      answerDisplay: "4/√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "R",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。正弦定理のもう一つの顔——$\\dfrac{b}{\\sin B} = 2R$。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが $R$ になったこと。",
        },
        {
          layer: 3,
          text: "$2R = \\dfrac{4}{\\sin 120°} = \\dfrac{4}{\\sqrt{3}/2} = \\dfrac{8}{\\sqrt{3}}$、$R = \\dfrac{4}{\\sqrt{3}}$。",
        },
      ],
      formulaPreview: "2R = b/sin B → R = 4/√3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$b = 2\\sqrt{3}$、$B = 60°$、$A = 90°$ のとき辺 $a$（直角の対辺＝斜辺）はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "斜辺 a",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。鈍角や鋭角だけでなく、直角でも正弦定理は同じ式——円では斜辺が直径。",
        },
        {
          layer: 2,
          text: "前題と変わったのは直角を含むこと。$\\sin 90° = 1$ より $a = 2R$。",
        },
        {
          layer: 3,
          text: "$\\dfrac{a}{\\sin 90°} = \\dfrac{2\\sqrt{3}}{\\sin 60°}$ より $a = 2\\sqrt{3} \\cdot \\dfrac{1}{\\sqrt{3}/2} = 4$。斜辺＝直径 $2R$。",
        },
      ],
      formulaPreview: "直角 → 斜辺 = 2R = 4",
      figureMarker: "<<TRIG_CIRCUM_TRIANGLE>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "直角三角形で斜辺（外接円の直径）が $10$ のとき、$R$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "R",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。直角なら斜辺＝直径という特別化。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、直径から $R$ を読むこと。",
        },
        {
          layer: 3,
          text: "$2R = 10$、$R = 5$。",
        },
      ],
      formulaPreview: "斜辺=直径 → R=5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\dfrac{a}{\\sin A} = 4$ で $a = 2$ のとき、鋭角 $A$ は何度でしょう？",
      answer: 30,
      unit: "",
      unknownLabel: "A（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは辺や $R$。今度は逆——比から角。",
        },
        {
          layer: 2,
          text: "前題と変わったのは向き。$\\sin A = \\dfrac{a}{2R}$ だが、ここでは $\\sin A = a/4 = 1/2$。",
        },
        {
          layer: 3,
          text: "$\\sin A = \\dfrac{1}{2}$ より $A = 30$。",
        },
      ],
      formulaPreview: "sin A = 1/2 → A = 30°",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\sin A : \\sin B = 1 : 2$ で $B = 90°$ のとき、鋭角 $A$ は何度でしょう？",
      answer: 30,
      unit: "",
      unknownLabel: "A（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。辺の比の代わりに sin の比——正弦定理より辺比＝sin 比。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、比で角を読むこと。$\\sin A = \\dfrac{1}{2}\\sin 90°$。",
        },
        {
          layer: 3,
          text: "$\\sin A = \\dfrac{1}{2}$ より $A = 30$。",
        },
      ],
      formulaPreview: "sin A = 1/2 → A = 30°",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$a = 2$、$A = 30°$、$b = 2\\sqrt{3}$ のとき、$B$ は何度でしょう？（鋭角）",
      answer: 60,
      unit: "",
      unknownLabel: "B（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。正弦で角を出し、必要なら余弦で確認する部品。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、辺と角のペアから別の角へ。$\\dfrac{\\sin B}{b} = \\dfrac{\\sin A}{a}$。",
        },
        {
          layer: 3,
          text: "$\\sin B = 2\\sqrt{3} \\cdot \\dfrac{\\sin 30°}{2} = \\sqrt{3}\\cdot\\dfrac{1}{2} = \\dfrac{\\sqrt{3}}{2}$。鋭角なら $B = 60$。",
        },
      ],
      formulaPreview: "sin B = √3/2 → B = 60°",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$a = 4$、$A = 30°$ のとき外接円の半径 $R$ はいくつでしょう？——面積や余弦だけでは $R$ に直接届かない。",
      answer: 4,
      unit: "",
      unknownLabel: "R",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。面積・余弦の道具だけでは外接円の半径に届かない——正弦定理が必然。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが $R$ で、正弦の $2R$ 形が唯一の道なこと。",
        },
        {
          layer: 3,
          text: "$2R = \\dfrac{4}{\\sin 30°} = 8$、$R = 4$。**面積・余弦だけでは $R$ に届かない——正弦が必然**。",
        },
      ],
      formulaPreview: "2R = a/sin A → R = 4",
      figureMarker: "<<TRIG_CIRCUM_TRIANGLE>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$\\sin A : \\sin B : \\sin C = \\sqrt{3} : 1 : 1$ の三角形で、外接円の半径 $R = 2$ のとき、面積はいくつでしょう？",
      answer: Math.sqrt(3),
      answerDisplay: "√3",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "面積",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。正弦で辺の比を出し、余弦で鈍角を確かめ、面積へ——総合。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、比→辺（$2R$）→余弦で角→面積と重ねること。",
        },
        {
          layer: 3,
          text: "辺比は $\\sqrt{3}:1:1$。$\\dfrac{a}{\\sin A}=4$ より $a=4\\cdot\\dfrac{\\sqrt{3}}{2}=2\\sqrt{3}$、$b=c=2$。$\\cos A = \\dfrac{1+1-3}{2} = -\\dfrac{1}{2}$（$120°$）。$S = \\dfrac{1}{2}\\cdot2\\cdot2\\cdot\\sin 120° = \\sqrt{3}$。",
        },
      ],
      formulaPreview: "比→余弦→面積 = √3",
    },
  ],
  derivation: `**中心の問い** ｜ なぜ外接円が必要か？

────────

**向かい合う辺と角は、外接円を介して比例する。**

<<TRIG_CIRCUM_TRIANGLE>>

$\\dfrac{a}{\\sin A} = 2R$。本書が正弦定理を最後に置く理由——円が要るから。

────────

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第3章の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

三角比は三角形の中だけで閉じず、外接円と結びついて辺と角を同じものさしで測る。`,
};

export const TRIG_RATIO_SERIES_LIST: LearnerSeries[] = [
  TR_TAN_RATIO_SERIES,
  TR_SINCOS_SERIES,
  TR_SPECIAL_SERIES,
  TR_AREA_COSINE_SERIES,
  TR_OBTUSE_SERIES,
  TR_IDENTITY_RATIO_SERIES,
  TR_COSINE_APP_SERIES,
  TR_SINE_LAW_SERIES,
];

