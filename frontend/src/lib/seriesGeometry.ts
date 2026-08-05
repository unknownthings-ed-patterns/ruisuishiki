/**
 * 図形の性質ユニットの系列（数Ⅰ・A 第8章）。
 *
 * Fable 5 の背骨設計（docs/geometry_series_design_fable.md）。
 * 系列1（お手本）は Fable 5 自身が実装し、系列2〜7 は並列委譲＋Fable 検収（C15）。
 *
 * 出典: 池田洋介『数学Ⅰ・A 入門問題精講 改訂版』第8章 図形の性質（旺文社）の
 * 章構成を借り、問題の値はすべてオリジナルに変更（copyright-credit-vs-copy）。
 *
 * 入力の折り方（背骨 D3）：
 * - 比は分数で答える（BP:PC は BP/PC の値。分数入力は既存評価器で採点可）
 * - 長さは数値・分数、方べきの接線長のみ [sqrt]
 * - 角は度数の数値（プレーン）
 * - 共円などの「判定」は檻に折る（共円になるための角の値・個数檻）
 * - 証明は3住所方式：定理の証明は derivation、証明型問題の骨格は関節の数値、
 *   証明の作文はエンジン外（採点しない）
 */

import type { LearnerSeries } from "./types";

/** GEO1: 角の二等分線と比（角の情報が辺の比に翻訳される）。 */
export const GEO_BISECTOR_SERIES: LearnerSeries = {
  id: "algebra1_geo_bisector_01",
  title: "角の二等分線と比",
  subtitle:
    "数Ⅰ・A 図形の性質より — 角を半分に切ると向かいの辺が辺の比で切れる。平行線と比から外角・面積比まで $10$ 問。",
  patternId: "GEO1",
  unit: "algebra_1",
  revelationLabel:
    "角の二等分線は、向かいの辺を『となりの $2$ 辺の比』どおりに切る——平行線が、角の情報を長さの比に翻訳する",
  drivingQuestion:
    "角をちょうど半分に切っただけなのに、なぜ**向かいの辺**まで『となりの $2$ 辺の比』のとおりに切れてしまう？ 角の情報は、どうやって長さの比に翻訳される？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 $ABC$ の辺 $AB$ 上に点 $D$、辺 $AC$ 上に点 $E$ があり、$DE$ は $BC$ と平行です。$AD = 4$、$DB = 6$、$AE = 6$ のとき、$EC$ はいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "EC の長さ",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "中学で見た、平行線が作る相似の形を思い出そう。$DE$ と $BC$ が平行なら、三角形 $ADE$ と三角形 $ABC$ は同じ形の拡大・縮小の関係。辺 $AB$ の上での $AD$ と $DB$ の割合と、辺 $AC$ の上での $AE$ と $EC$ の割合には、どんな関係がありそう？",
        },
        {
          layer: 2,
          text: "平行線は「割合をそのまま向こうの辺へ運ぶ」——$AD : DB$ と $AE : EC$ は同じ比になる。$AD : DB = 4 : 6$ を $AE = 6$ の側に写すと？",
        },
        {
          layer: 3,
          text: "$DE \\parallel BC$ なので $AD : DB = AE : EC$。$4 : 6 = 6 : EC$ だから $EC = \\dfrac{6 \\times 6}{4} = 9$。平行線があると、片方の辺の切られ方（比）が、もう片方の辺にそっくり乗り移る——この「比を運ぶ」働きが、この系列ぜんぶの土台になる。",
        },
      ],
      formulaPreview: "DE∥BC → AD:DB = AE:EC → 4:6 = 6:EC → EC = 9",
      figureMarker: "<<GEO_PARA_RATIO>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 $ABC$ の辺 $AB$ 上に点 $D$、辺 $AC$ 上に点 $E$ があり、$DE \\parallel BC$ です。$AE = 10$、$EC = 4$、$AD = 15$ のとき、$DB$ はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "DB の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「平行線が比を運ぶ」。変わったのは、分かっている側と聞かれている側が入れ替わっただけ。今度はどちらの辺の比を、どちらへ写す？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$AC$ 側の比（$AE : EC$）が分かっていて、$AB$ 側の $DB$ を聞かれていること。$AE : EC = 10 : 4$ を $AD = 15$ の側に写すと？",
        },
        {
          layer: 3,
          text: "前題と同じ $AD : DB = AE : EC$。$15 : DB = 10 : 4$ だから $DB = \\dfrac{15 \\times 4}{10} = 6$。どちら向きにも同じ式で写せる——比の関係は双方向の翻訳になっている。",
        },
      ],
      formulaPreview: "AD:DB = AE:EC → 15:DB = 10:4 → DB = 6",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "三角形 $ABC$ で $AB = 8$、$AC = 6$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$ とするとき、比 $BP : PC$ を分数 $\\dfrac{BP}{PC}$ の値で答えましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "BP:PC（分数 BP/PC で）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは平行線が最初から描いてあった。今度は [角の二等分線] が $1$ 本あるだけで、平行線はどこにもない。でも、切られ方を知りたいのは同じ「辺の上の比」。もし自分で平行線を $1$ 本描き足せるとしたら——角の情報を比に変えられないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「平行線の代わりに、角を半分に切る線が引かれている」こと。実は結論はシンプルで、$BP : PC$ は**となりの $2$ 辺の比** $AB : AC$ とぴったり同じになる（なぜそうなるかは、解き終えたあとの公式の景色で平行線から導く）。",
        },
        {
          layer: 3,
          text: "角の二等分線の性質：$BP : PC = AB : AC$。$B$ を端に持つ $BP$ の相方は $B$ につながる辺 $AB$、$C$ を端に持つ $PC$ の相方は $C$ につながる辺 $AC$。だから $BP : PC = 8 : 6 = 4 : 3$、分数で $\\dfrac{BP}{PC} = \\dfrac{4}{3}$。角を半分に切った情報が、辺の比に翻訳された——ここがこの系列の質的な転換点。",
        },
      ],
      formulaPreview: "BP:PC = AB:AC = 8:6 = 4:3",
      figureMarker: "<<GEO_BISECTOR>>",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "三角形 $ABC$ で $AB = 9$、$AC = 12$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$ とするとき、$\\dfrac{BP}{PC}$ の値を答えましょう。",
      answer: 0.75,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "BP:PC（分数 BP/PC で）",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う性質は同じ。変わったのは辺の長さだけ——今度は $AB$ と $AC$ のどちらが長い？ 比の向きに気をつけて写そう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $AC$ の方が長いこと。$BP$ の相方はどちらの辺だったか——$B$ につながる辺を選べば、順番を取り違えない。",
        },
        {
          layer: 3,
          text: "前題と同じ $BP : PC = AB : AC = 9 : 12 = 3 : 4$。よって $\\dfrac{BP}{PC} = \\dfrac{3}{4}$。今度は $P$ が $BC$ の真ん中より $B$ 寄りになる——二等分線は**短い辺の側**に寄る。比の向きは「端の頂点につながる辺が相方」で確かめられる。",
        },
      ],
      formulaPreview: "BP:PC = AB:AC = 9:12 = 3:4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 $ABC$ で、$\\angle A$ の二等分線が辺 $BC$ を $BP : PC = 5 : 2$ に分けています。$AC = 6$ のとき、$AB$ はいくつでしょう？",
      answer: 15,
      unit: "",
      unknownLabel: "AB の長さ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは辺の長さから比を出す向きで写した。今度は比の方が先に分かっていて、聞かれているのは辺の長さ。同じ関係を、逆向きに読めないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、未知の場所が比から辺 $AB$ に移ったこと。$BP : PC = AB : AC$ に、分かっている $3$ つを入れると？",
        },
        {
          layer: 3,
          text: "$BP : PC = AB : AC$ より $5 : 2 = AB : 6$。だから $AB = \\dfrac{6 \\times 5}{2} = 15$。前題までと同じ $1$ 本の関係式が、向きを変えるだけで「辺の長さを言い当てる」道具にもなる——翻訳は逆向きにも使える。",
        },
      ],
      formulaPreview: "BP:PC = AB:AC → 5:2 = AB:6 → AB = 15",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 $ABC$ で $AB = 12$、$AC = 8$、$BC = 15$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$ とするとき、$BP$ の長さはいくつでしょう？",
      answer: 9,
      unit: "",
      unknownLabel: "BP の長さ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は比だけでなく、切られる辺 $BC$ の**全体の長さ**も分かっている。比で分けたそれぞれの実際の長さまで言えそうだ——全体を比のとおりに配分するには？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「$BC = 15$ を比で配分する」一手だけ。まず $BP : PC$ を辺の比から求め、$15$ をその比で分けると？",
        },
        {
          layer: 3,
          text: "$BP : PC = AB : AC = 12 : 8 = 3 : 2$。$BC = 15$ を $3 : 2$ に配分して $BP = 15 \\times \\dfrac{3}{3+2} = 9$。比が出れば、全体の長さを掛けるだけで実際の長さに降りられる——「比 → 実長」への一段が加わった。",
        },
      ],
      formulaPreview: "BP:PC = 12:8 = 3:2 → BP = 15 × 3/5 = 9",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 $ABC$ で $AB = 9$、$AC = 6$ です。$\\angle A$ の**外角**の二等分線が、辺 $BC$ の延長と交わる点を $Q$ とするとき、比 $BQ : QC$ を分数 $\\dfrac{BQ}{QC}$ の値で答えましょう。",
      answer: 1.5,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "BQ:QC（分数 BQ/QC で）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは三角形の**内側**の角を半分にした。今度は $\\angle A$ の**外側**の角（辺 $AB$ を $A$ の先へ延ばしてできる角）を半分にする。切られる点 $Q$ は辺 $BC$ の**内側に収まらず、延長上**へ出てしまう——それでも「となりの $2$ 辺の比」は生きているだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「内角 → 外角」の $1$ 点だけ。結論の式は同じ $BQ : QC = AB : AC$ のまま——ただし $Q$ は線分 $BC$ を**外分**する（[外分] は数直線でやった「外側に立つ分点」と同じことば）。",
        },
        {
          layer: 3,
          text: "外角の二等分線の性質：$BQ : QC = AB : AC = 9 : 6 = 3 : 2$（$Q$ は $BC$ を $3 : 2$ に外分）。分数で $\\dfrac{BQ}{QC} = \\dfrac{3}{2}$。内角なら [内分]、外角なら [外分]——半分に切る角を取り替えると、分点が辺の内から外へ飛び出すが、比の式は $1$ 文字も変わらない。",
        },
      ],
      formulaPreview: "外角の二等分線 → BQ:QC = AB:AC = 9:6 = 3:2（外分）",
      figureMarker: "<<GEO_BISECTOR_EXT>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 $ABC$ で $AB = 10$、$AC = 4$ です。$\\angle A$ の外角の二等分線が辺 $BC$ の延長と交わる点を $Q$ とするとき、$\\dfrac{BQ}{QC}$ の値を答えましょう。",
      answer: 2.5,
      answerDisplay: "5/2",
      unit: "",
      unknownLabel: "BQ:QC（分数 BQ/QC で）",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。外角の二等分線の比、そのままだ。変わったのは辺の長さだけ——$2$ 辺の差が前題より大きいと、$Q$ の立ち方はどう変わるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $AB$ と $AC$ の差が大きくなったこと。式は同じ $BQ : QC = AB : AC$。比の値が $1$ から遠いほど、外分点 $Q$ は $C$ に近づく。",
        },
        {
          layer: 3,
          text: "$BQ : QC = AB : AC = 10 : 4 = 5 : 2$。よって $\\dfrac{BQ}{QC} = \\dfrac{5}{2}$。ちなみに $AB = AC$（二等辺）だと外角の二等分線は $BC$ と平行になり、$Q$ が存在しない——比が $1 : 1$ の外分がありえないことと対応している。",
        },
      ],
      formulaPreview: "BQ:QC = AB:AC = 10:4 = 5:2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "三角形 $ABC$ で $AB = 6$、$AC = 3$、$BC = 6$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$、$\\angle A$ の外角の二等分線が辺 $BC$ の延長と交わる点を $Q$ とするとき、$PQ$ の長さはいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "PQ の長さ",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "step6（内角の分点の実長）と前題（外角の分点）を思い出そう。今度は $P$ と $Q$ の**両方**が登場する。$PQ$ は、内角の道具だけでも外角の道具だけでも出ない——$2$ つを別々に出してから、直線 $BC$ の上でつなげられないだろうか？",
        },
        {
          layer: 2,
          text: "増えたのは「$P$ と $Q$ の位置を**同じ直線の上で**足し合わせる」こと。$P$ は $BC$ の内側、$Q$ は $C$ の外側。$PQ = PC + CQ$ と分けて、それぞれを step6 と前題の手で出すと？",
        },
        {
          layer: 3,
          text: "内角：$BP : PC = 6 : 3 = 2 : 1$ だから $PC = 6 \\times \\dfrac{1}{3} = 2$。外角：$BQ : QC = 2 : 1$ の外分なので $BQ = BC + CQ$ より $CQ = BC = 6$。よって $PQ = PC + CQ = 2 + 6 = 8$。内分点と外分点——$2$ つの翻訳を同じ直線の上で組み合わせて、初めて届く長さ。",
        },
      ],
      formulaPreview: "PC = 2（内分）・CQ = 6（外分） → PQ = 2 + 6 = 8",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ で $AB = 7$、$AC = 5$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$ とするとき、三角形 $ABP$ の面積は三角形 $APC$ の面積の何倍でしょう？（分数で）",
      answer: 1.4,
      answerDisplay: "7/5",
      unit: "倍",
      unknownLabel: "面積の比（分数で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題までで $BC$ の上の**比**は出せるようになった。今度は聞かれているのが**面積**。三角形 $ABP$ と $APC$ を、頂点 $A$ から見下ろしてみよう——$2$ つの三角形の高さはどうなっている？ 高さが同じなら、面積の比は何で決まる？",
        },
        {
          layer: 2,
          text: "増えたのは「底辺の比 → 面積の比」への乗り換えだけ。$2$ つの三角形は頂点 $A$ が共通で、底辺 $BP$・$PC$ が同じ直線上——高さは共通。だから面積の比は底辺の比 $BP : PC$ そのもの。",
        },
        {
          layer: 3,
          text: "高さが共通なので $\\dfrac{\\triangle ABP}{\\triangle APC} = \\dfrac{BP}{PC} = \\dfrac{AB}{AC} = \\dfrac{7}{5}$。つまり $\\dfrac{7}{5}$ 倍。「底辺の比 ＝ 面積の比」という乗り換えは、次の系列（チェバの定理）で証明の主役になる——角の比が辺の比になり、辺の比が面積の比になる。翻訳の鎖はまだ先へ続く。",
        },
      ],
      formulaPreview: "高さ共通 → S(ABP):S(APC) = BP:PC = AB:AC = 7:5",
    },
  ],
  derivation: `**中心の問い** ｜ 角をちょうど半分に切っただけなのに、なぜ**向かいの辺**まで『となりの $2$ 辺の比』のとおりに切れてしまう？ 角の情報は、どうやって長さの比に翻訳される？

────────

**性質そのものは $1$ 行で書ける。**

三角形 $ABC$ で $\\angle A$ の二等分線が辺 $BC$ と交わる点を $P$ とすると：

$$BP : PC = AB : AC$$

角の話をしていたはずなのに、結論には角が出てこない——出てくるのは長さの比だけ。この「角 → 比」の翻訳がどこで起きたのかが、この系列の核心です。

<<GEO_BISECTOR>>

**翻訳装置は、自分で描き足す平行線。**

Step 1〜2 でやった「平行線は比をそのまま向こうの辺へ運ぶ」を思い出してください。証明はこの $1$ 本を描き足すところから始まります。

$C$ を通って二等分線 $AP$ に**平行な直線**を引き、辺 $BA$ を $A$ の先へ延ばした線との交点を $D$ とします。すると：

- $AP \\parallel DC$ なので、同位角から $\\angle BAP = \\angle ADC$、錯角から $\\angle PAC = \\angle ACD$
- ところが $AP$ は二等分線だから $\\angle BAP = \\angle PAC$。つまり $\\angle ADC = \\angle ACD$
- 底角が等しいので三角形 $ACD$ は二等辺三角形——$AD = AC$

一方、$AP \\parallel DC$ より、平行線が比を運んで $BP : PC = BA : AD$。ここに $AD = AC$ を入れれば：

$$BP : PC = AB : AC$$

**角の等しさが、平行線を経由して、二等辺三角形の「$2$ 辺の等しさ」に化け、それが比の式に流れ込む**——翻訳はこの三段で起きています。忘れても、「二等分線に平行な線を $1$ 本引く」から再建できます。

**外角でも、同じ手がそのまま動く（Step 7〜8）**

$\\angle A$ の外角の二等分線と辺 $BC$ の延長との交点 $Q$ でも、まったく同じ平行線の手で

$$BQ : QC = AB : AC$$

が出ます。違いはただ $1$ つ、$Q$ が線分 $BC$ の**外側**に立つこと——内角なら [内分]、外角なら [外分]。数直線の単元で見た内分・外分が、三角形の上でもう一度現れます。なお $AB = AC$ のときは外角の二等分線が $BC$ と平行になってしまい、$Q$ は存在しません（$1 : 1$ の外分がないことと対応）。

**間違えやすいのは、比の向き。**

$BP : PC = AC : AB$ と書いてしまう取り違えが定番です。確かめ方は「**端の頂点につながる辺が相方**」——$BP$ の端は $B$ だから相方は $B$ につながる辺 $AB$、$PC$ の端は $C$ だから相方は $AC$。さらに Step 4 で見たとおり、**二等分線は短い辺の側に寄る**ので、出した比が「長い辺の側が大きい」になっているかで検算もできます。

**比は、長さそのものを捨てている。**

$BP : PC = 4 : 3$ と分かっても、$BP$ が $4$ cm とは限りません。比が運ぶのは「切られ方の形」だけで、絶対の長さは捨てられています。だから実際の長さに降りるには、Step 6 のように全体 $BC$ の長さがもう $1$ つ要る——何が比に残り、何が捨てられたかを意識すると、「比だけで答えられる問い」と「実長が要る問い」を見分けられます。

────────

**もっと深く**

**内分点と外分点は、ペアで円を描く。** 同じ三角形の $P$（内分点）と $Q$（外分点）は、どちらも「$AB : AC$ の比」から生まれた兄弟です。実は「$2$ 点 $B, C$ からの距離の比が一定 $m : n$（$m \\ne n$）」である点の集まりは $1$ つの**円**になり（アポロニウスの円）、$P$ と $Q$ はちょうどその円の直径の両端にあたります。数Ⅱの「図形と方程式」で軌跡を式で追うと、この円が座標の計算からも現れます——角の二等分線は、軌跡の世界への入口でもあります。

**面積比への乗り換え（Step 10）が、次の定理の部品になる。** 頂点が共通で底辺が同じ直線上にある $2$ つの三角形では、面積の比＝底辺の比。この乗り換えを $3$ 回組み合わせると、三角形の中の $1$ 点が $3$ つの辺の比を一気に縛る「チェバの定理」が導けます。角 → 辺の比 → 面積比——翻訳の鎖が、単元全体を貫く道路網になっていきます。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（角の二等分線の性質・平行線と比）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

角の二等分線が向かいの辺を $AB : AC$ に切るのは、**自分で描き足した平行線が「角の等しさ」を「二等辺三角形の $2$ 辺の等しさ」に変え、その等しさが比の式に乗り移る**から。図形の情報（角・長さ・比）は、定理という道を通って離れた場所へ形を変えながら伝わる——補助線とは、その道を自分の手で敷く行為です。この「翻訳の鎖」が、チェバ・メネラウス、五心、円の定理へと続いていきます。`,
};

/** GEO2: チェバの定理（一周の不変量）。 */
export const GEO_CEVA_SERIES: LearnerSeries = {
  id: "geo_ceva_01",
  title: "チェバの定理",
  subtitle:
    "数Ⅰ・A 図形の性質より — 三角形の中の $1$ 点が $3$ 辺の切られ方を『積 $= 1$』で縛る。面積比の入口からチェバの定理・内心の存在まで $10$ 問。",
  patternId: "GEO2",
  unit: "algebra_1",
  revelationLabel:
    "三角形の中の $1$ 点から辺へ引いた $3$ 本の線——$3$ つの切られ方を寄り道して一周ぶんかけ合わせると、必ず $1$ に戻る（一周の不変量）",
  drivingQuestion:
    "三角形の中に点を $1$ つ打つだけで、なぜ $3$ つの辺の切られ方が『比の積 $= 1$』という **$1$ 本の式**で縛られてしまう？ 頂点から寄り道して一周すると、比の積はどこへ戻る？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 $ABC$ の辺 $BC$ 上に点 $D$ をとり、頂点 $A$ と結びます。$BD : DC = 3 : 5$ のとき、三角形 $ABD$ の面積は三角形 $ADC$ の面積の何倍でしょう？（分数で）",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "倍",
      unknownLabel: "面積の比（分数で）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "この $2$ つの三角形——$ABD$ と $ADC$ を、頂点 $A$ から見下ろしてみよう。底辺 $BD$ と $DC$ は同じ直線 $BC$ の上に並んでいる。$2$ つの三角形の高さはどうなっている？ 高さが同じなら、面積の大小を決めているのは何だろう？",
        },
        {
          layer: 2,
          text: "着目するのは底辺だけ。頂点 $A$ が共通で底辺が同じ直線上にあるので、$2$ つの三角形の高さは共通。だから面積の比は底辺の比 $BD : DC$ にそのまま等しい。あとは与えられた比を読むだけ。",
        },
        {
          layer: 3,
          text: "頂点 $A$ が共通で、底辺 $BD$・$DC$ が同じ直線 $BC$ 上にあるので、$2$ つの三角形の高さは等しい。高さが同じ三角形どうしの面積の比は底辺の比そのもの：$\\dfrac{\\triangle ABD}{\\triangle ADC} = \\dfrac{BD}{DC} = \\dfrac{3}{5}$。つまり $\\dfrac{3}{5}$ 倍。『高さが共通なら面積の比 ＝ 底辺の比』——この $1$ 枚の部品が、これから三角形の中を一周する式の土台になる。",
        },
      ],
      formulaPreview: "高さ共通 → S(ABD):S(ADC) = BD:DC = 3:5",
      figureMarker: "<<GEO_AREA_RATIO>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 $ABC$ の内部の $1$ 点で、$3$ 本の線 $AD$・$BE$・$CF$ が交わっています（$D$ は辺 $BC$ 上、$E$ は辺 $CA$ 上、$F$ は辺 $AB$ 上）。$AF : FB = 2 : 3$、$BD : DC = 5 : 6$ のとき、残りの $CE : EA$ を分数 $\\dfrac{CE}{EA}$ の値で答えましょう。",
      answer: 9 / 5,
      answerDisplay: "9/5",
      unit: "",
      unknownLabel: "CE:EA（分数 CE/EA で）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題で『高さが共通な $2$ 三角形の面積の比 ＝ 底辺の比』を手に入れた。今度は三角形の中で $3$ 本の線が $1$ 点に集まり、$3$ つの辺がそれぞれ切られている。$2$ つの辺の切られ方は分かっていて、残り $1$ つを知りたい。$3$ つの比はてんでばらばらなのか、それとも互いに縛り合っているのか——前題の面積の見方で、$3$ つをつなげられないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、辺が $1$ 本から $3$ 本ぶん切られていること。実は $3$ つの比は自由ではない。頂点 $A$ から出発して $F・B・D・C・E$ と辺づたいに寄り道して一周すると、$3$ つの比の積がちょうど $1$ に戻る。$AF : FB$ と $BD : DC$ の積に、残りの $CE : EA$ を掛けると $1$ になる。",
        },
        {
          layer: 3,
          text: "三角形の中で $3$ 本の線が $1$ 点で交わるとき、$3$ つの辺の分けられ方は『一周すると比の積が $1$』という $1$ 本の式で縛られる（チェバの定理）。頂点 $A$ から辺づたいに寄り道して一周する：$A \\to F \\to B \\to D \\to C \\to E \\to A$。通る順に『手前 : 奥』の比を並べて $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$。ここに $\\dfrac{2}{3} \\cdot \\dfrac{5}{6} \\cdot \\dfrac{CE}{EA} = 1$ を入れる。$\\dfrac{2}{3} \\cdot \\dfrac{5}{6} = \\dfrac{10}{18}$ だから $\\dfrac{CE}{EA} = \\dfrac{18}{10} = \\dfrac{9}{5}$。$2$ 辺の切られ方さえ決まれば $3$ 本目は自動で決まる——これが『$1$ 点で交わる』ことの正体で、この系列の核心の転換点。",
        },
      ],
      formulaPreview: "AF/FB · BD/DC · CE/EA = 1 → 2/3 · 5/6 · CE/EA = 1 → CE/EA = 9/5",
      figureMarker: "<<GEO_CEVA>>",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "三角形 $ABC$ の内部の $1$ 点で $3$ 本の線 $AD$・$BE$・$CF$ が交わっています（$D$ は辺 $BC$ 上、$E$ は辺 $CA$ 上、$F$ は辺 $AB$ 上）。$AF : FB = 3 : 5$、$BD : DC = 4 : 7$ のとき、$CE : EA$ を分数 $\\dfrac{CE}{EA}$ の値で答えましょう。",
      answer: 35 / 12,
      answerDisplay: "35/12",
      unit: "",
      unknownLabel: "CE:EA（分数 CE/EA で）",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ『一周すると比の積は $1$』。変わったのは与えられた $2$ つの比の数だけ。同じ一周の式に、新しい数をあてはめれば残りが出せそうだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは辺の切られ方の数値だけ。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ はそのまま。$\\dfrac{3}{5}$ と $\\dfrac{4}{7}$ を入れて、残りを求めると？",
        },
        {
          layer: 3,
          text: "前題と同じ一周の式：$\\dfrac{3}{5} \\cdot \\dfrac{4}{7} \\cdot \\dfrac{CE}{EA} = 1$。$\\dfrac{3}{5} \\cdot \\dfrac{4}{7} = \\dfrac{12}{35}$ だから $\\dfrac{CE}{EA} = \\dfrac{35}{12}$。数が変わっても、一周の型が同じなら手は $1$ つ——比の積が $1$ に戻る縛りは、辺の長さの具体値に左右されない。",
        },
      ],
      formulaPreview: "3/5 · 4/7 · CE/EA = 1 → CE/EA = 35/12",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "三角形 $ABC$ の内部の $1$ 点で $3$ 本の線 $AD$・$BE$・$CF$ が交わっています（$D$ は辺 $BC$ 上、$E$ は辺 $CA$ 上、$F$ は辺 $AB$ 上）。$AF : FB = 5 : 8$、$CE : EA = 2 : 3$ のとき、残りの $BD : DC$ を分数 $\\dfrac{BD}{DC}$ の値で答えましょう。",
      answer: 12 / 5,
      answerDisplay: "12/5",
      unit: "",
      unknownLabel: "BD:DC（分数 BD/DC で）",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。一周の式は同じ。ただし今度は、分かっている $2$ つと知りたい $1$ つの場所が入れ替わっている——真ん中の $BD : DC$ が空いている。式のどこが空欄でも、同じ縛りで埋められるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、未知が真ん中の $BD : DC$ に移ったこと。$\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ の $\\dfrac{BD}{DC}$ 以外を入れて、残りを解くと？",
        },
        {
          layer: 3,
          text: "一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ に $\\dfrac{5}{8} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{2}{3} = 1$。$\\dfrac{5}{8} \\cdot \\dfrac{2}{3} = \\dfrac{10}{24} = \\dfrac{5}{12}$ なので $\\dfrac{BD}{DC} = \\dfrac{12}{5}$。$3$ つの比のうちどれが空いていても、残り $2$ つから一意に決まる——$1$ 本の式が $3$ つの比を互いに縛り合っている証拠。",
        },
      ],
      formulaPreview: "5/8 · BD/DC · 2/3 = 1 → BD/DC = 12/5",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 $ABC$ で、$D$ は辺 $BC$ 上、$E$ は辺 $CA$ 上、$F$ は辺 $AB$ 上にあります。$BD : DC = 3 : 1$、$CE : EA = 5 : 6$ です。$3$ 本の線 $AD$・$BE$・$CF$ が $1$ 点で交わるためには、$AF : FB$ をいくつにすればよいでしょう？ 分数 $\\dfrac{AF}{FB}$ で答えましょう。",
      answer: 2 / 5,
      answerDisplay: "2/5",
      unit: "",
      unknownLabel: "AF:FB（分数 AF/FB で）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは『$1$ 点で交わっている』ことが最初から分かっていて、切られ方を読んだ。今度は逆——切られ方を先に決めて『交わるように $F$ を置ける？』と問われている。一周すると積が $1$ になるという同じ縛りを、$F$ の位置を決める側から読めないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、未知が『交わるための条件』になったこと。$3$ 本が $1$ 点で交わるのは、ちょうど一周の積が $1$ のとき。$\\dfrac{AF}{FB} \\cdot \\dfrac{3}{1} \\cdot \\dfrac{5}{6} = 1$ を $\\dfrac{AF}{FB}$ について解くと？",
        },
        {
          layer: 3,
          text: "$3$ 本が $1$ 点で交わる条件そのものが『一周の積 $= 1$』（チェバの定理は逆向きにも成り立つ）。$\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ に $\\dfrac{AF}{FB} \\cdot \\dfrac{3}{1} \\cdot \\dfrac{5}{6} = 1$。$\\dfrac{3}{1} \\cdot \\dfrac{5}{6} = \\dfrac{15}{6} = \\dfrac{5}{2}$ だから $\\dfrac{AF}{FB} = \\dfrac{2}{5}$。同じ式が、切られ方を読む道具にも、$1$ 点で交わらせる設計図にもなる——縛りは前向きにも後ろ向きにも使える。",
        },
      ],
      formulaPreview: "AF/FB · 3/1 · 5/6 = 1 → AF/FB = 2/5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 $ABC$ で、点 $F$ は辺 $AB$ の**中点**です。辺 $BC$ 上の点 $D$ は $BD = 4$、$DC = 7$ を満たします。$3$ 本の線 $AD$・$BE$・$CF$（$E$ は辺 $CA$ 上）が $1$ 点で交わるとき、$CE : EA$ を分数 $\\dfrac{CE}{EA}$ で答えましょう。",
      answer: 7 / 4,
      answerDisplay: "7/4",
      unit: "",
      unknownLabel: "CE:EA（分数 CE/EA で）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは $3$ つの辺の比が最初から比の形で与えられていた。今度は $1$ つが『中点』という言葉で、もう $1$ つが長さ $BD$・$DC$ で与えられている——比の顔をしていない手がかりを、まず一周の式に乗る形に直せないだろうか？",
        },
        {
          layer: 2,
          text: "前題に加わったのは『言葉と長さを比に読み替える』ひと手間だけ。中点は $AF : FB = 1 : 1$、長さ $BD = 4$・$DC = 7$ は $BD : DC = 4 : 7$。あとはいつもの一周の式に入れるだけ。",
        },
        {
          layer: 3,
          text: "中点だから $AF : FB = 1 : 1$、長さから $BD : DC = 4 : 7$。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ に $\\dfrac{1}{1} \\cdot \\dfrac{4}{7} \\cdot \\dfrac{CE}{EA} = 1$ を入れて $\\dfrac{CE}{EA} = \\dfrac{7}{4}$。手がかりが比の顔をしていなくても、$1 : 1$ や長さの比に読み替えれば同じ式に乗る——一周の縛りは、情報の見た目を選ばない。",
        },
      ],
      formulaPreview: "中点 → AF/FB = 1/1・BD/DC = 4/7 → CE/EA = 7/4",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 $ABC$ で、$D$・$E$・$F$ はそれぞれ辺 $BC$・$CA$・$AB$ の**中点**です（$AD$・$BE$・$CF$ は $3$ 本の中線）。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA}$ の値はいくつでしょう？",
      answer: 1,
      answerDisplay: "1",
      unit: "",
      unknownLabel: "3 つの比の積",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題では $1$ 本だけ中点だった。今度は $3$ 辺すべてが中点で切られている。中点は辺を $1 : 1$ に分ける——$3$ つの比がぜんぶ $1 : 1$ のとき、一周の積はどうなるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$3$ つの比がすべて $1 : 1$ になったこと。$\\dfrac{1}{1} \\cdot \\dfrac{1}{1} \\cdot \\dfrac{1}{1}$ を読むだけ。",
        },
        {
          layer: 3,
          text: "中点は各辺を $1 : 1$ に分けるので $AF : FB = BD : DC = CE : EA = 1 : 1$。一周の積は $\\dfrac{1}{1} \\cdot \\dfrac{1}{1} \\cdot \\dfrac{1}{1} = 1$。積が $1$ になる ＝ $3$ 本の中線は必ず $1$ 点で交わる（この点が重心）。特別な数値を選んだわけでもないのに一周が $1$ に戻る——中線がいつでも $1$ 点に集まることが、式 $1$ 本で保証される。",
        },
      ],
      formulaPreview: "1/1 · 1/1 · 1/1 = 1（中線は 1 点で交わる＝重心）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 $ABC$ の辺 $AB$ 上に点 $F$ があり、三角形 $AFC$ の面積は三角形 $FBC$ の面積の $\\dfrac{2}{7}$ 倍です。辺 $BC$ 上の点 $D$ は $BD : DC = 5 : 6$。$3$ 本の線 $AD$・$BE$・$CF$（$E$ は辺 $CA$ 上）が $1$ 点で交わるとき、$CE : EA$ を分数 $\\dfrac{CE}{EA}$ で答えましょう。",
      answer: 21 / 5,
      answerDisplay: "21/5",
      unit: "",
      unknownLabel: "CE:EA（分数 CE/EA で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "$F$ の切られ方が、比ではなく『面積の何倍』で隠されている。$CE : EA$ を面積の追いかけっこだけで直接つかもうとすると、$1$ 点で交わる点の位置まで持ち出すことになって手に負えない。前題までの一周の式に乗せるために、まず step1 の『面積の比 ＝ 底辺の比』で $F$ の比を取り出せないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、$AF : FB$ が面積で与えられている $1$ 点だけ。三角形 $AFC$ と $FBC$ は頂点 $C$ が共通で、底辺 $AF$・$FB$ が同じ直線上——高さが共通だから面積の比 ＝ $AF : FB$。$AF : FB = 2 : 7$ に直せば、あとはいつもの一周。",
        },
        {
          layer: 3,
          text: "まず step1 の部品：三角形 $AFC$ と $FBC$ は頂点 $C$ を共有し、底辺 $AF$・$FB$ が直線 $AB$ 上にあるので高さが共通。だから $\\dfrac{\\triangle AFC}{\\triangle FBC} = \\dfrac{AF}{FB} = \\dfrac{2}{7}$。これで比が取り出せた。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ に $\\dfrac{2}{7} \\cdot \\dfrac{5}{6} \\cdot \\dfrac{CE}{EA} = 1$、$\\dfrac{2}{7} \\cdot \\dfrac{5}{6} = \\dfrac{10}{42} = \\dfrac{5}{21}$ なので $\\dfrac{CE}{EA} = \\dfrac{21}{5}$。面積の直接追跡では届かないところに、面積比 → 辺比 → 一周の縛りという $2$ 段の乗り換えだけが道を作る——ここでこそ一周の式が本当に働く。",
        },
      ],
      formulaPreview: "面積比 → AF/FB = 2/7 → 2/7 · 5/6 · CE/EA = 1 → CE/EA = 21/5",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "三角形 $ABC$ で、辺 $AB$ 上の点 $F$ は $AF : FB = 5 : 8$、辺 $BC$ 上の点 $D$ は $BD = 2$、$DC = 8$ です。$3$ 本の線 $AD$・$BE$・$CF$（$E$ は辺 $CA$ 上）が $1$ 点で交わるとき、$EA : EC$ を分数 $\\dfrac{EA}{EC}$ で答えましょう。",
      answer: 5 / 32,
      answerDisplay: "5/32",
      unit: "",
      unknownLabel: "EA:EC（分数 EA/EC で）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までと同じで、一周の式で残りの切られ方が出せる。ただし今度、聞かれているのは $EA : EC$——一周の式にそのまま現れる $CE : EA$ とは、分子と分母が逆さまだ。式で出したものを、そのまま答えにしてよいだろうか？",
        },
        {
          layer: 2,
          text: "前題に加わったのは『一周で出した比を、聞かれた向きにひっくり返す』ひと手間。まず長さ $BD = 2$・$DC = 8$ を $BD : DC = 1 : 4$ に直し、一周の式で $CE : EA$ を出してから、$EA : EC$ の向きにそろえる。",
        },
        {
          layer: 3,
          text: "長さから $BD : DC = 1 : 4$。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$ に $\\dfrac{5}{8} \\cdot \\dfrac{1}{4} \\cdot \\dfrac{CE}{EA} = 1$、$\\dfrac{5}{8} \\cdot \\dfrac{1}{4} = \\dfrac{5}{32}$ だから $\\dfrac{CE}{EA} = \\dfrac{32}{5}$。ここで止めると誤答になる——聞かれたのは $\\dfrac{EA}{EC}$ だから、上下をそろえて $\\dfrac{EA}{EC} = \\dfrac{5}{32}$。一周を機械的に唱えて $\\dfrac{CE}{EA}$ と $\\dfrac{EA}{EC}$ を取り違えるのが、この定理の定番のつまずき。『$A$ から寄り道して一周し、通る順に手前 : 奥』に立ち返れば、どちらの向きか毎回その場で決められる。",
        },
      ],
      formulaPreview: "5/8 · 1/4 · CE/EA = 1 → CE/EA = 32/5 → EA/EC = 5/32",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ で $AB = 3$、$BC = 5$、$CA = 4$ です。$3$ つの角 $A$・$B$・$C$ の [角の二等分線] が、それぞれ向かいの辺 $BC$・$CA$・$AB$ と交わる点を $D$・$E$・$F$ とします。一周の式 $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA}$ の値はいくつでしょう？",
      answer: 1,
      answerDisplay: "1",
      unit: "",
      unknownLabel: "3 つの比の積",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step7 では中線 $3$ 本で一周が $1$ になった。今度は、系列 $1$ で学んだ [角の二等分線] を $3$ 本引く。$1$ 本ずつは向かいの辺を『となりの $2$ 辺の比』に切る——$3$ 本ぶんの比を一周ぶんかけ合わせたら、今度も $1$ に戻るだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$3$ つの比が [角の二等分線] の性質で決まること。頂点 $A$ の二等分線は $BD : DC = AB : AC$、頂点 $B$ は $CE : EA = BC : BA$、頂点 $C$ は $AF : FB = CA : CB$。$3$ 辺 $3$・$5$・$4$ から $3$ つの比を書いて、一周の式に入れると？",
        },
        {
          layer: 3,
          text: "系列 $1$ の角の二等分線の性質で各辺の比を書く：頂点 $A$ の二等分線 → $BD : DC = AB : AC = 3 : 4$、頂点 $B$ → $CE : EA = BC : BA = 5 : 3$、頂点 $C$ → $AF : FB = CA : CB = 4 : 5$。一周の積は $\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = \\dfrac{4}{5} \\cdot \\dfrac{3}{4} \\cdot \\dfrac{5}{3} = 1$。辺の長さがどんな三角形でも、この積は約分でぴたりと $1$ になる——だから角の二等分線 $3$ 本も必ず $1$ 点で交わる（その点が内心 ＝ 内接円の中心）。角の情報が辺の比になり（系列 $1$）、辺の比が一周で $1$ に戻る（この系列）——$2$ つの定理が組み合わさって、新しい『点の存在』を証明した。",
        },
      ],
      formulaPreview: "4/5 · 3/4 · 5/3 = 1（角の二等分線 3 本は 1 点で交わる＝内心）",
    },
  ],
  derivation: `**中心の問い** ｜ 三角形の中に点を $1$ つ打つだけで、なぜ $3$ つの辺の切られ方が『比の積 $= 1$』という $1$ 本の式で縛られてしまう？ 頂点から寄り道して一周すると、比の積はどこへ戻る？

────────

**定理そのものは $1$ 行で書ける。**

三角形 $ABC$ の内部の $1$ 点で $3$ 本の線 $AD$・$BE$・$CF$ が交わるとき（$D$ は $BC$ 上、$E$ は $CA$ 上、$F$ は $AB$ 上）：

$$\\dfrac{AF}{FB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} = 1$$

バラバラに見えた $3$ つの切られ方が、かけ合わせるとぴたりと $1$。この「一周して $1$ に戻る」不変量がどこから来るのかが、この系列の核心です。

<<GEO_CEVA>>

**巡り方は、覚えるものではなく再建するもの。**

式の形が思い出せなくても、$1$ つの規則で毎回組み立て直せます。頂点 $A$ から出発し、辺づたいに**寄り道しながら一周**する：

$$A \\to F \\to B \\to D \\to C \\to E \\to A$$

通る順に、各辺で「**手前 : 奥**」の比を並べるだけ——$\\dfrac{AF}{FB}$、$\\dfrac{BD}{DC}$、$\\dfrac{CE}{EA}$。これを掛ければ式が完成します。だから $\\dfrac{CE}{EA}$ なのか $\\dfrac{EA}{EC}$ なのかで迷ったら、巡り方に立ち返れば毎回その場で決まります（この上下の取り違えが、この定理の一番のつまずき。step9 で正面から扱いました）。

**なぜ積が $1$ になるのか——面積比が保証する。**

Step 1 で見た「高さが共通なら面積の比 ＝ 底辺の比」を、交点 $O$ のまわりで $3$ 回使います。まず $\\dfrac{BD}{DC}$ を面積で書き直す：

- 頂点 $A$ から見て $\\dfrac{BD}{DC} = \\dfrac{\\triangle ABD}{\\triangle ACD}$（高さ共通）
- 頂点 $O$ から見ても $\\dfrac{BD}{DC} = \\dfrac{\\triangle OBD}{\\triangle OCD}$（同じ底辺・高さ共通）
- $O$ は線分 $AD$ 上にあるので $\\triangle ABD = \\triangle ABO + \\triangle OBD$、$\\triangle ACD = \\triangle ACO + \\triangle OCD$。分子どうし・分母どうしの差をとると $\\dfrac{BD}{DC} = \\dfrac{\\triangle ABO}{\\triangle ACO}$

まったく同じ手で、残り $2$ 辺も $O$ まわりの三角形の面積比になります：

$$\\dfrac{BD}{DC} = \\dfrac{\\triangle ABO}{\\triangle ACO}, \\quad \\dfrac{CE}{EA} = \\dfrac{\\triangle BCO}{\\triangle ABO}, \\quad \\dfrac{AF}{FB} = \\dfrac{\\triangle ACO}{\\triangle BCO}$$

これを一周ぶんかけ合わせると、$\\triangle ABO$・$\\triangle BCO$・$\\triangle ACO$ が分子と分母できれいに打ち消し合って：

$$\\dfrac{\\triangle ACO}{\\triangle BCO} \\cdot \\dfrac{\\triangle ABO}{\\triangle ACO} \\cdot \\dfrac{\\triangle BCO}{\\triangle ABO} = 1$$

一周して同じ三角形に戻ってくるから、途中の量がすべて相殺される——これが「積 $= 1$」の正体です。忘れても、この面積比 $3$ 枚から再建できます。

**逆向きにも成り立つ（Step 5）。**

「一周の積が $1$ なら、$3$ 本は必ず $1$ 点で交わる」も真です。だからこの式は、交点があるときに切られ方を読む道具にも、$3$ 本を $1$ 点に集める設計図にもなります。中線 $3$ 本（Step 7）や角の二等分線 $3$ 本（Step 10）が必ず $1$ 点で交わることは、比の積がいつでも $1$ になることから即座に出ます——重心や内心の「存在」が、計算 $1$ 本で保証されるのです。

**比は、長さそのものを捨てている。**

一周の式に残っているのは $3$ つの「比」だけで、辺の実際の長さも、内部の点 $O$ が三角形のどこにあるかも、式には現れません。$AF : FB = 2 : 3$ と分かっても $AF$ が何 cm かは言えない——一周の縛りは「切られ方の釣り合い」だけを掬い取り、絶対の大きさと位置は捨てています。だからこそ、どんな大きさ・どんな形の三角形でも同じ $1$ 本の式で語れるのです。

────────

**もっと深く**

**点でなく直線が横切ると？** 三角形の中の $1$ 点ではなく、$1$ 本の直線が三角形を横切るときも、まったく同じ「一周して比の積」が作れて、長さの比で数えれば積はやはり $1$ に戻ります（進む向きを符号まで込めて数える流儀では $-1$ と書きます）。これがメネラウスの定理（次の系列）。ただし分点は辺の外へはみ出す——内（点・チェバ）と外（直線・メネラウス）を、同じ寄り道の型が統べています。

**一周の型は保存量の考え方そのもの。** 「どんな寄り道をしても一周すれば元に戻る」という不変量の見方は、図形を超えて物理や解析にも現れます。途中の経路の詳細を捨てて、$1$ 周の総和・総積だけが意味を持つ——チェバの定理は、その最初の出会いのひとつです。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（チェバの定理）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

三角形の中の $1$ 点が $3$ 辺の切られ方を『積 $= 1$』で縛るのは、**$3$ つの比を交点まわりの面積比に書き直すと、一周ぶんかけ合わせたときに途中の面積がすべて打ち消し合う**から。図形の量は、面積比という道を通って離れた辺どうしを結び、寄り道して一周すれば必ず元に戻る——この「一周の不変量」が、メネラウス、そして五心（内心・重心の存在）へと続いていきます。`,
};

/** 図形の性質ユニットの全系列（系列3〜7 は委譲実装後に追加）。 */
export const GEOMETRY_SERIES_LIST: LearnerSeries[] = [
  GEO_BISECTOR_SERIES,
  GEO_CEVA_SERIES,
];
