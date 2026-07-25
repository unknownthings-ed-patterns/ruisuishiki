/**
 * 「三角比」ユニット（高校数学Ⅰ・A 第3章）の系列。
 *
 * 背骨設計：docs/trig_ratio_series_design.md（2026-07-26）。
 * お手本 mirror：seriesTrig.ts（質・√ 入力）／seriesFunctionsGraphs.ts（直前章の文体）。
 *
 * ハブ胚細胞：「直角三角形の辺の比は、大きさによらない形の情報であり、
 * 座標（単位円）に移すと鈍角まで同じ言葉で読める」。数Ⅱ一般角の下側。
 * 系列1 はその第1相＝「比が角の性質になる（タンジェントと測量）」。
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
        "川向こうの木までの幅を知りたい。手前の岸を $8\\,\\mathrm{m}$ 歩いたところから木を見上げる角は、ノートに描いた小さな直角三角形の角と同じだった。小さな三角形では底辺 $2\\,\\mathrm{cm}$・高さ $3\\,\\mathrm{cm}$ だった。大きな三角形の高さ（川幅）は何 $\\mathrm{m}$ でしょう？",
      answer: 12,
      unit: "m",
      unknownLabel: "川幅",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "小学校の [割合] や中学の相似を思い出してみよう。大きさが違うのに角が同じ直角三角形——辺のどんな量が、大きい三角形と小さい三角形で同じになる？",
        },
        {
          layer: 2,
          text: "同じなのは「辺そのものの長さ」ではなく、対応する辺どうしの**比**。小さな三角形の高さ÷底辺が、大きな三角形でもそのまま使える。",
        },
        {
          layer: 3,
          text: "小さな三角形の比は $\\dfrac{3}{2}$。大きな三角形の底辺は $8\\,\\mathrm{m}$ なので、高さ（川幅）は $8 \\times \\dfrac{3}{2} = 12$。**角が同じなら比は大きさによらない**——測れない長さを、測れる底辺と比だけで言い当てた。ここが三角比の出発点。",
        },
      ],
      formulaPreview: "8 × (3/2) = 12（相似な直角三角形の比）",
      figureMarker: "<<TRIG_SIMILAR_MEASURE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ考え方で、岸を $6\\,\\mathrm{m}$ 歩いたところから見上げた。ノートの小さな直角三角形は底辺 $2\\,\\mathrm{cm}$・高さ $5\\,\\mathrm{cm}$ だった。川幅は何 $\\mathrm{m}$ でしょう？",
      answer: 15,
      unit: "m",
      unknownLabel: "川幅",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「小さな三角形の比を、大きな底辺にかける」。変わったのは数だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、底辺と小さな三角形の高さ／底辺の組だけ。比を作ってから大きな底辺にかければいい。",
        },
        {
          layer: 3,
          text: "比は $\\dfrac{5}{2}$。川幅 $= 6 \\times \\dfrac{5}{2} = 15$。前題と同じ手つき——**比を一度作れば、現場の底辺を掛けて高さが出る**。",
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
          text: "となり $= 5$、$\\tan 60° = \\sqrt{3}$ なので向かい $= 5\\sqrt{3}$。もし縦＝向かいと決めつけて $\\tan$ を逆に使うと $5/\\sqrt{3}$ になり外れる。**角から見た向かい／となりでしか立てられない**——これがこの系列の必然性の1問。",
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

export const TRIG_RATIO_SERIES_LIST: LearnerSeries[] = [TR_TAN_RATIO_SERIES];
