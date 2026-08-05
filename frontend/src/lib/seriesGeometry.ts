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

/** GEO3: メネラウスの定理（点でなく1本の直線が横切っても、同じ一周の式が成り立つ）。 */
export const GEO_MENELAUS_SERIES: LearnerSeries = {
  id: "geo_menelaus_01",
  title: "メネラウスの定理",
  subtitle:
    "数Ⅰ・A 図形の性質より — 三角形を横切る $1$ 本の直線も、チェバと同じ『一周で積が $1$』の式に従う。基本形から線分の比・重心・総合まで $10$ 問。",
  patternId: "GEO3",
  unit: "algebra_1",
  revelationLabel:
    "点でも直線でも、頂点から寄り道して一周した比の積は $1$ に戻る——チェバ（内）とメネラウス（外）は、同じ一周の型の兄弟",
  drivingQuestion:
    "点ではなく $1$ 本の**直線**が三角形を横切るときも、なぜチェバと同じ『一周の比の積 $= 1$』が成り立つ？ 分点は辺の外へはみ出すのに、式は $1$ 文字も変わらない——それはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 $ABC$ を $1$ 本の直線が横切り、辺 $AB$ を $D$、辺 $AC$ を $E$、辺 $BC$ の延長を $F$ で切ります。$AD : DB = 1 : 3$、$AE : EC = 2 : 5$ のとき、比 $BF : FC$ を分数 $\\dfrac{BF}{FC}$ の値で答えましょう。",
      answer: 6 / 5,
      answerDisplay: "6/5",
      unit: "",
      unknownLabel: "BF:FC（分数 BF/FC で）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "[チェバの定理] でやった「頂点から寄り道して一周する」巡り方を思い出そう。あのときは三角形の内側で $3$ 本の線が $1$ 点に集まっていた。今度は $1$ 本の直線が三角形を横切っている——同じ一周の巡り方を、この横切る直線の図にそのまま当てると、どんな式が見えてくるだろう？",
        },
        {
          layer: 2,
          text: "チェバと同じで、頂点 $A$ から出発して $A \\to D \\to B \\to F \\to C \\to E \\to A$ と辺の上の分点を寄り道しながら一周し、各辺で「進む向きの前半 $:$ 後半」の分数を掛け合わせると、その積が $1$ になる。分かっている $2$ つの比を並べて、残り $1$ つ $BF : FC$ を穴埋めするだけ。",
        },
        {
          layer: 3,
          text: "メネラウスの定理：$\\dfrac{AD}{DB} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{CE}{EA} = 1$。値を入れると $\\dfrac{1}{3} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{5}{2} = 1$ なので $\\dfrac{BF}{FC} = \\dfrac{3}{1} \\cdot \\dfrac{2}{5} = \\dfrac{6}{5}$。チェバのときと同じ一周の型が、三角形を横切る直線にもそっくり当てはまった——分点 $F$ が辺 $BC$ の外（延長上）に出ても、式は $1$ 文字も変わらない。ここが中心の問いへの最初の答え。",
        },
      ],
      formulaPreview: "(AD/DB)(BF/FC)(CE/EA) = 1 → (1/3)(BF/FC)(5/2) = 1 → BF/FC = 6/5",
      figureMarker: "<<GEO_MENELAUS>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 $ABC$ を横切る直線が、辺 $AB$ を $D$、辺 $AC$ を $E$、辺 $BC$ の延長を $F$ で切っています。$AD : DB = 2 : 5$、$AE : EC = 5 : 4$ のとき、$\\dfrac{BF}{FC}$ の値を答えましょう。",
      answer: 25 / 8,
      answerDisplay: "25/8",
      unit: "",
      unknownLabel: "BF:FC（分数 BF/FC で）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形を横切る直線も、一周の巡り方も、まったく同じ。変わったのは辺に与えられた比の値だけ。同じ道順をなぞれば、今度も残り $1$ つが穴埋めできそうだ——どこが同じで、どこが違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $AD : DB$ と $AE : EC$ の数だけ。一周の式 $\\dfrac{AD}{DB} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{CE}{EA} = 1$ に、新しい値を入れ直すと？",
        },
        {
          layer: 3,
          text: "前題と同じ $\\dfrac{AD}{DB} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{CE}{EA} = 1$。$\\dfrac{2}{5} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{4}{5} = 1$ だから $\\dfrac{BF}{FC} = \\dfrac{5}{2} \\cdot \\dfrac{5}{4} = \\dfrac{25}{8}$。値が変わっても一周の型は不動——公式を覚え直す必要はなく、巡り方さえ再建できれば同じ道具が何度でも効く。",
        },
      ],
      formulaPreview: "(2/5)(BF/FC)(4/5) = 1 → BF/FC = 25/8",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "三角形 $ABC$ で、辺 $AB$ 上に $AD : DB = 2 : 5$ となる点 $D$、辺 $BC$ の延長上に $BF : FC = 5 : 4$ となる点 $F$ があります。$3$ 点 $D$、$E$、$F$ が一直線上に並ぶには、辺 $AC$ 上の点 $E$ が $AC$ をどんな比 $AE : EC$ に分ければよいでしょう？ 分数 $\\dfrac{AE}{EC}$ の値で答えましょう。",
      answer: 1 / 2,
      answerDisplay: "1/2",
      unit: "",
      unknownLabel: "AE:EC（分数 AE/EC で）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは、$3$ 点が一直線に並んでいることが最初から分かっていて、比を出す向きに一周を使った。今度は逆——「一直線に並ぶには $E$ をどこに置けばいい？」と聞かれている。一周の積が $1$ になるという条件を、逆向きに読めないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、未知の場所が $BF : FC$ から $AE : EC$ に移っただけ。$3$ 点が一直線 $\\Leftrightarrow$ 一周の積が $1$。分かっている $2$ つを入れて、残った $\\dfrac{AE}{EC}$ について読み直すと？",
        },
        {
          layer: 3,
          text: "$3$ 点が一直線に並ぶ条件はメネラウスの積 $\\dfrac{AD}{DB} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{CE}{EA} = 1$。$\\dfrac{2}{5} \\cdot \\dfrac{5}{4} \\cdot \\dfrac{CE}{EA} = 1$ より $\\dfrac{CE}{EA} = 2$、つまり $\\dfrac{AE}{EC} = \\dfrac{1}{2}$。同じ一周の式が、向きを変えるだけで「一直線に並ぶ条件」を言い当てる道具にもなる——メネラウスは決定と判定の両方に効く。",
        },
      ],
      formulaPreview: "(2/5)(5/4)(CE/EA) = 1 → CE/EA = 2 → AE/EC = 1/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "三角形 $ABC$ を横切る直線が、辺 $AB$ を $D$、辺 $AC$ を $E$、辺 $BC$ の $C$ 側の延長を $F$ で切ります。$AD : DB = 1 : 3$、$AE : EC = 6 : 5$ のとき、はみ出した部分 $CF$ は辺 $CB$ の何倍でしょう？ 分数 $\\dfrac{CF}{CB}$ の値で答えましょう。",
      answer: 5 / 13,
      answerDisplay: "5/13",
      unit: "",
      unknownLabel: "CF:CB（分数 CF/CB で）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までで、$BF : FC$ そのものは一周の式で出せるようになった。今度は聞かれているのが、$C$ の外へはみ出した部分 $CF$ が辺 $CB$ の何倍か。$F$ は $C$ の外にあるから、$BF$ は辺 $BC$ に、はみ出し $CF$ を足したもの——この関係を使って、比を「はみ出しの割合」に読み替えられないだろうか？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「一周で出した $BF : FC$ を、$CF$ と $CB$ の関係に翻訳する」一手だけ。$F$ が $C$ の外にあるので $BF = CB + CF$。まず一周で $BF : FC$ を出し、この足し算に持ち込むと？",
        },
        {
          layer: 3,
          text: "一周の式から $\\dfrac{1}{3} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{5}{6} = 1$ なので $\\dfrac{BF}{FC} = \\dfrac{18}{5}$。$F$ は $C$ の外だから $BF = CB + CF$。$\\dfrac{CB + CF}{CF} = \\dfrac{18}{5}$ を整理すると $5\\,CB = 13\\,CF$、よって $\\dfrac{CF}{CB} = \\dfrac{5}{13}$。比だけでは「切られ方の形」しか分からないが、辺 $CB$ を基準に取り直すと、外へどれだけはみ出したかまで言える——外分点は辺の外にありながら、ちゃんと辺の長さと結びついている。",
        },
      ],
      formulaPreview: "BF/FC = 18/5・BF = CB + CF → 5·CB = 13·CF → CF/CB = 5/13",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 $ABC$ で、辺 $BC$ 上に $BD : DC = 1 : 3$ となる点 $D$、辺 $AC$ 上に $AE : EC = 2 : 5$ となる点 $E$ をとります。線分 $AD$ と線分 $BE$ の交点を $P$ とするとき、$AP : PD$ を分数 $\\dfrac{AP}{PD}$ の値で答えましょう。",
      answer: 8 / 5,
      answerDisplay: "8/5",
      unit: "",
      unknownLabel: "AP:PD（分数 AP/PD で）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは、横切る直線が最初から $1$ 本描いてあった。今度は三角形の中で $2$ 本の線 $AD$、$BE$ が交わっていて、その交点 $P$ が線分 $AD$ をどう分けるかを聞かれている。一周の式を使うには、まず「どの三角形」を舞台にして、「どの直線」を横切る直線とみなすかを、自分で選ばないといけない——$AP$、$PD$ を辺に持つ三角形はどれだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは「三角形と横切る直線を自分で選ぶ」こと。$AP : PD$ を出したいなら、線分 $AD$ を $1$ 辺に持つ三角形 $ADC$ を舞台に選び、そこを直線 $B$–$P$–$E$ が横切ると見る。すると $B$ は辺 $DC$ の延長上、$P$ は辺 $AD$ 上、$E$ は辺 $CA$ 上——一周がそろう。",
        },
        {
          layer: 3,
          text: "三角形 $ADC$ を、直線 $BPE$ が横切ると見る。一周 $A \\to D \\to C \\to A$ で $\\dfrac{AP}{PD} \\cdot \\dfrac{DB}{BC} \\cdot \\dfrac{CE}{EA} = 1$。$BD : DC = 1 : 3$ より $BC = 4$、$DB = 1$ だから $\\dfrac{DB}{BC} = \\dfrac{1}{4}$、$\\dfrac{CE}{EA} = \\dfrac{5}{2}$。よって $\\dfrac{AP}{PD} = \\dfrac{4}{1} \\cdot \\dfrac{2}{5} = \\dfrac{8}{5}$。交点が線分を分ける比は、「求めたい線分を辺に持つ三角形」と「残りを結ぶ直線」を選べば、同じ一周の式で必ず出せる——舞台の選び方が、この段の質的な新しさ。",
        },
      ],
      formulaPreview: "△ADC を直線BPEが横切る → (AP/PD)(DB/BC)(CE/EA) = 1 → AP/PD = 8/5",
      figureMarker: "<<GEO_MENELAUS_PICK>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 $ABC$ で、辺 $BC$ 上に $BD : DC = 2 : 5$ となる点 $D$、辺 $AC$ 上に $AE : EC = 6 : 5$ となる点 $E$ をとります。線分 $AD$ と線分 $BE$ の交点を $P$ とするとき、$BP : PE$ を分数 $\\dfrac{BP}{PE}$ の値で答えましょう。",
      answer: 11 / 15,
      answerDisplay: "11/15",
      unit: "",
      unknownLabel: "BP:PE（分数 BP/PE で）",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 本の線が交わる図も、交点が線分を分ける比を聞かれているのも同じ。違うのは、今度は線分 $BE$ の分けられ方 $BP : PE$ を聞かれていること。前題では線分 $AD$ を辺に持つ三角形を選んだ——今度は、どの三角形を舞台にすればいい？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求める線分が $AD$ から $BE$ に移ったこと。だから舞台に選ぶ三角形も変わる。$BP : PE$ を出すには、線分 $BE$ を $1$ 辺に持つ三角形 $BEC$ を選び、そこを直線 $A$–$P$–$D$ が横切ると見る。",
        },
        {
          layer: 3,
          text: "三角形 $BEC$ を、直線 $APD$ が横切ると見る。一周 $B \\to E \\to C \\to B$ で $\\dfrac{BP}{PE} \\cdot \\dfrac{EA}{AC} \\cdot \\dfrac{CD}{DB} = 1$。$AE : EC = 6 : 5$ より $\\dfrac{EA}{AC} = \\dfrac{6}{11}$、$BD : DC = 2 : 5$ より $\\dfrac{CD}{DB} = \\dfrac{5}{2}$。よって $\\dfrac{BP}{PE} = \\dfrac{11}{6} \\cdot \\dfrac{2}{5} = \\dfrac{11}{15}$。同じ図でも、求める線分に合わせて舞台の三角形を選び替えるだけ——道具は $1$ つ、選び方が変わるだけだと分かる。",
        },
      ],
      formulaPreview: "△BEC を直線APDが横切る → (BP/PE)(EA/AC)(CD/DB) = 1 → BP/PE = 11/15",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 $ABC$ で、$3$ 本の線 $AD$（$D$ は辺 $BC$ 上）、$BE$（$E$ は辺 $CA$ 上）、$CF$（$F$ は辺 $AB$ 上）が $1$ 点 $P$ で交わっています。$BD : DC = 6 : 5$、$CE : EA = 5 : 4$ のとき、線分 $CF$ 上での比 $CP : PF$ を分数 $\\dfrac{CP}{PF}$ の値で答えましょう。",
      answer: 25 / 12,
      answerDisplay: "25/12",
      unit: "",
      unknownLabel: "CP:PF（分数 CP/PF で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは、与えられた $2$ 本の線とその交点だけで話が済んだ。今度は $3$ 本目 $CF$ の上での比を聞かれているのに、$F$ が辺 $AB$ をどこで切るかは与えられていない。まず $F$ の位置を知る道具が要る——[チェバの定理] は「$3$ 本が $1$ 点で交わる」ことから、何を教えてくれただろう？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「まずチェバで第 $3$ の足 $F$ の比を出し、そのあとメネラウスで線分を分ける」という二段構え。$3$ 本が $1$ 点で交わる $\\Rightarrow$ チェバで $AF : FB$ が決まる $\\Rightarrow$ その $F$ を使い、線分 $CF$ を辺に持つ三角形にメネラウスをかける。",
        },
        {
          layer: 3,
          text: "まずチェバ：$\\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} \\cdot \\dfrac{AF}{FB} = 1$ より $\\dfrac{6}{5} \\cdot \\dfrac{5}{4} \\cdot \\dfrac{AF}{FB} = 1$、$\\dfrac{AF}{FB} = \\dfrac{2}{3}$。次にメネラウス：三角形 $BCF$ を直線 $A$–$P$–$D$ が横切ると見て $\\dfrac{CP}{PF} \\cdot \\dfrac{FA}{AB} \\cdot \\dfrac{BD}{DC} = 1$。$AF : FB = 2 : 3$ より $\\dfrac{FA}{AB} = \\dfrac{2}{5}$、$\\dfrac{BD}{DC} = \\dfrac{6}{5}$。よって $\\dfrac{CP}{PF} = \\dfrac{5}{2} \\cdot \\dfrac{5}{6} = \\dfrac{25}{12}$。チェバ（一周で $1$ 点を保証）とメネラウス（一周で線分を分ける）は、同じ一周の型の表と裏——$2$ つを順に使うと、点と線分の情報が一気につながる。",
        },
      ],
      formulaPreview: "チェバ → AF/FB = 2/3 → メネラウス △BCF → CP/PF = 25/12",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 $ABC$ で、辺 $AB$ 上に $AD : DB = 2 : 5$ となる点 $D$、辺 $BC$ 上に $BE : EC = 6 : 5$ となる点 $E$ をとり、直線 $DE$ を延ばして辺 $CA$ の延長との交点を $G$ とします。さらに辺 $AB$ 上に $AH : HB = 1 : 3$ となる点 $H$ をとり、直線 $GH$ を延ばして辺 $BC$ との交点を $K$ とします。このとき $BK : KC$ を分数 $\\dfrac{BK}{KC}$ の値で答えましょう。",
      answer: 36 / 25,
      answerDisplay: "36/25",
      unit: "",
      unknownLabel: "BK:KC（分数 BK/KC で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題は「チェバを $1$ 回、そのあとメネラウスを $1$ 回」の二段だった。今度は横切る直線が $2$ 本ある。$1$ 本目 $DE$ が辺 $CA$ の延長を切る点 $G$ の位置が分からないと、$2$ 本目 $GH$ が辺 $BC$ をどこで切るかも出せない。$1$ つの三角形にメネラウスを $2$ 回、順番にかけられないだろうか？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「同じ三角形 $ABC$ に、$2$ 本の横切る直線でメネラウスを続けて $2$ 回かける」こと。$1$ 回目は直線 $DEG$ で $CG : GA$ を出し、その $G$ を $2$ 回目の直線 $GHK$ に持ち込んで $BK : KC$ を出す。前半の答えが後半の材料になる。",
        },
        {
          layer: 3,
          text: "$1$ 回目：三角形 $ABC$ を直線 $DEG$ が横切ると見て $\\dfrac{AD}{DB} \\cdot \\dfrac{BE}{EC} \\cdot \\dfrac{CG}{GA} = 1$。$\\dfrac{2}{5} \\cdot \\dfrac{6}{5} \\cdot \\dfrac{CG}{GA} = 1$ より $\\dfrac{CG}{GA} = \\dfrac{25}{12}$。$2$ 回目：同じ三角形 $ABC$ を直線 $GHK$ が横切ると見て $\\dfrac{AH}{HB} \\cdot \\dfrac{BK}{KC} \\cdot \\dfrac{CG}{GA} = 1$。$\\dfrac{1}{3} \\cdot \\dfrac{BK}{KC} \\cdot \\dfrac{25}{12} = 1$ より $\\dfrac{BK}{KC} = 3 \\cdot \\dfrac{12}{25} = \\dfrac{36}{25}$。$1$ 回のメネラウスでは絶対に届かない比が、前半の外分点 $G$ を橋にして初めて出る——一周の型を鎖のようにつなぐと、遠くの比まで運べる。",
        },
      ],
      formulaPreview: "①△ABC×直線DEG → CG/GA = 25/12 → ②△ABC×直線GHK → BK/KC = 36/25",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "三角形 $ABC$ で、辺 $BC$ の中点を $M$、辺 $AC$ の中点を $N$ とします。中線 $AM$ と中線 $BN$ の交点（重心）を $G$ とするとき、$AG : GM$ を分数 $\\dfrac{AG}{GM}$ の値で答えましょう。",
      answer: 2,
      answerDisplay: "2",
      unit: "",
      unknownLabel: "AG:GM（分数 AG/GM で）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までで、$2$ 本の線の交点が線分を分ける比は、三角形と横切る直線を選べば出せるようになった。今度は「中点」という特別な条件が加わっている——中線 $BN$ を横切る直線とみなして、中線 $AM$ を辺に持つ三角形を舞台に選ぶと、重心が中線をどう分けるか見えてこないだろうか？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「分点が中点（比が $1 : 1$）」という条件だけ。舞台に三角形 $AMC$ を選び、直線 $B$–$G$–$N$ が横切ると見る。$M$ は $BC$ の中点、$N$ は $CA$ の中点——この $2$ つの $1 : 1$ が式に効く。",
        },
        {
          layer: 3,
          text: "三角形 $AMC$ を直線 $BGN$ が横切ると見て $\\dfrac{AG}{GM} \\cdot \\dfrac{MB}{BC} \\cdot \\dfrac{CN}{NA} = 1$。$M$ は $BC$ の中点で $B$ は $M$ の外側だから $\\dfrac{MB}{BC} = \\dfrac{1}{2}$、$N$ は中点だから $\\dfrac{CN}{NA} = 1$。よって $\\dfrac{AG}{GM} \\cdot \\dfrac{1}{2} \\cdot 1 = 1$、$\\dfrac{AG}{GM} = 2$、つまり $AG : GM = 2 : 1$。「重心は中線を $2 : 1$ に分ける」という有名な事実が、メネラウスの関節 $1$ つから出てくる——公式として覚えなくても、一周の型から再建できる。",
        },
      ],
      formulaPreview: "△AMC を直線BGNが横切る → (AG/GM)(1/2)(1) = 1 → AG:GM = 2:1",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ で、$3$ 本の線 $AD$（$D$ は辺 $BC$ 上）、$BE$（$E$ は辺 $CA$ 上）、$CF$（$F$ は辺 $AB$ 上）が $1$ 点 $P$ で交わっています。$BD : DC = 1 : 3$、$CE : EA = 5 : 4$ のとき、三角形 $APC$ の面積は三角形 $ABC$ の面積の何倍でしょう？ 分数で答えましょう。",
      answer: 4 / 7,
      answerDisplay: "4/7",
      unit: "倍",
      unknownLabel: "面積の比（分数で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "この系列の総仕上げ。$3$ 本が $1$ 点で交わる図（[チェバの定理]）、交点が線分を分ける比（メネラウス）、そして底辺の比が面積の比になる乗り換え（[角の二等分線] の系列でやった「高さが同じなら面積比 $=$ 底辺の比」）——$3$ つの道具を鎖でつなぐと、面積までたどり着けそうだ。まず $P$ が中線 $AD$ をどう分けるかから始めると？",
        },
        {
          layer: 2,
          text: "増えたのは「線分の比を面積の比に乗り換える」最後の一手。三角形 $APC$ と三角形 $ADC$ は底辺 $AC$ を共有し、$P$ は $AD$ 上——高さの比は $AP : AD$。三角形 $ADC$ と三角形 $ABC$ は $BC$ 上の $DC : BC$。まずメネラウスで $AP : PD$ を出し、この $2$ 段の乗り換えをつなぐと？",
        },
        {
          layer: 3,
          text: "メネラウス（三角形 $ADC$ を直線 $BPE$ が横切る）で $\\dfrac{AP}{PD} \\cdot \\dfrac{DB}{BC} \\cdot \\dfrac{CE}{EA} = 1$。$BD : DC = 1 : 3$ より $\\dfrac{DB}{BC} = \\dfrac{1}{4}$、$\\dfrac{CE}{EA} = \\dfrac{5}{4}$ だから $\\dfrac{AP}{PD} = 4 \\cdot \\dfrac{4}{5} = \\dfrac{16}{5}$、よって $\\dfrac{AP}{AD} = \\dfrac{16}{21}$。面積の乗り換え：$\\dfrac{\\triangle APC}{\\triangle ABC} = \\dfrac{AP}{AD} \\cdot \\dfrac{DC}{BC} = \\dfrac{16}{21} \\cdot \\dfrac{3}{4} = \\dfrac{4}{7}$。つまり $\\dfrac{4}{7}$ 倍。角 $\\to$ 辺の比 $\\to$ 一周の積 $\\to$ 面積——この単元の翻訳の鎖が、$1$ 問の中で最後までつながった。",
        },
      ],
      formulaPreview: "メネラウス AP:PD = 16/5 → AP/AD = 16/21 → △APC/△ABC = (16/21)(3/4) = 4/7",
    },
  ],
  derivation: `**中心の問い** ｜ 点ではなく $1$ 本の**直線**が三角形を横切るときも、なぜチェバと同じ『一周の比の積 $= 1$』が成り立つ？ 分点は辺の外へはみ出すのに、式は $1$ 文字も変わらない——それはなぜ？

────────

**定理そのものは、チェバと双子の $1$ 行。**

三角形 $ABC$ を $1$ 本の直線が横切り、辺 $AB$ を $D$、辺 $BC$（またはその延長）を $F$、辺 $CA$ を $E$ で切るとき：

$$\\dfrac{AD}{DB} \\cdot \\dfrac{BF}{FC} \\cdot \\dfrac{CE}{EA} = 1$$

チェバの定理（$3$ 本の線が $1$ 点で交わるときの式）と、文字の並びまでそっくり同じです。違うのはただ $1$ つ——チェバの分点はすべて辺の内側（内分）にあったのに、メネラウスでは横切る直線が、必ずどれか奇数個の辺と**延長上**で交わる（外分）。それでも式は $1$ 文字も変わらない。この不気味な一致がどこから来るのかが、この系列の核心です。

<<GEO_MENELAUS>>

**なぜ積が $1$ になるのか——各頂点から直線までの距離が、分母分子で打ち消し合う。**

横切る直線を $\\ell$ とし、$3$ つの頂点 $A$、$B$、$C$ から $\\ell$ までの距離（垂線の長さ）を $p_A$、$p_B$、$p_C$ とします。点 $D$ は辺 $AB$ が $\\ell$ と交わる点なので、$A$ と $B$ の距離の比がそのまま $D$ の分ける比になります：

$$\\dfrac{AD}{DB} = \\dfrac{p_A}{p_B}, \\quad \\dfrac{BF}{FC} = \\dfrac{p_B}{p_C}, \\quad \\dfrac{CE}{EA} = \\dfrac{p_C}{p_A}$$

（$A$ から $\\ell$ に近づくほど距離が小さくなり、$\\ell$ の上でちょうど $0$。だから辺の上の分割比は、両端の頂点の距離の比になる——中学の平行線と比の親戚です。）これを掛け合わせると：

$$\\dfrac{p_A}{p_B} \\cdot \\dfrac{p_B}{p_C} \\cdot \\dfrac{p_C}{p_A} = 1$$

$p_A$、$p_B$、$p_C$ が輪のように分母と分子を渡り歩いて、きれいに打ち消し合う。**「一周すると必ず元に戻る」——積が $1$ になる本当の理由はこれです。** チェバの証明も同じ骨をしています。あちらは「頂点を共有する三角形の面積の比＝底辺の比」を $3$ つ掛けると面積が打ち消し合って $1$。メネラウスは距離が、チェバは面積が打ち消し合う——**同じ「一周で相殺する」構造の、表と裏**。だから式の形がそっくりなのは偶然ではありません。これが中心の問いへの答えです。

**忘れても、巡り方から再建できる。**

公式を丸暗記する必要はありません。頂点 $A$ から出発して $A \\to D \\to B \\to F \\to C \\to E \\to A$ と、辺の上の分点を寄り道しながら一周する。各辺で「進む向きの前半 $:$ 後半」を分数にして掛ければ、それがメネラウスの式です。チェバも同じ巡り方——だから片方を覚えれば、もう片方はその場で書き出せます。

**間違えやすいのは、外分点の見落とし。**

チェバとメネラウスは図がよく似ているので、「チェバと同じ、全部内分」と思い込んで、外分点 $F$ を辺の内側の点と取り違える誤りが定番です。見分けの鍵は「横切る $1$ 本の直線は、三角形の $3$ 辺すべてを内側では切れない——必ずどれかの辺とは、その**延長上**で交わる」こと（外分点が奇数個）。図を描いて、直線が辺をはみ出して切っている場所を先に確かめる習慣が、取り違えを防ぎます。

**もう $1$ つの難所は、三角形と直線の「選び方」。**

線分の比（$AP : PD$ のような、交点が線分を分ける比）を出すときは、**「求めたい線分を $1$ 辺に持つ三角形」を舞台に選び、「残りの点を結ぶ直線」を横切る直線とみなす**のがコツです（Step 5・6）。同じ図でも、求める線分が変われば選ぶ三角形も変わる——道具は $1$ つ、選び方が変わるだけ。慣れないうちは「どの三角形？ どの直線？」を口に出して選ぶと、一周がそろいます。

**比は、長さの絶対値を捨てている。**

$BF : FC = 6 : 5$ と分かっても、$BF$ が $6$ cm とは限りません。一周の式が運ぶのは「切られ方の形」だけで、絶対の長さは捨てられています。だから外へどれだけはみ出したかを実際の長さで言うには、Step 4 のように辺 $BC$ をもう $1$ つの物差しに取り直す必要がある——何が比に残り、何が捨てられているかを意識すると、「比だけで答えられる問い」と「長さの基準が要る問い」を見分けられます。

────────

**もっと深く**

**符号をつけると、チェバとメネラウスが $1$ 本の式に溶ける。** 線分に向きを入れた「有向線分」で比を測ると、チェバの積はちょうど $+1$、メネラウスの積は $-1$ になります。内分と外分の違いが、符号 $1$ つに畳み込まれるのです。この見方は数学の先の「射影幾何」で、点と直線を対等に扱う世界（**双対性**）へつながります——チェバ（点で $1$ 本に集まる）とメネラウス（直線で $3$ 辺を貫く）は、点と直線を入れ替えた鏡像の関係にあります。

**重心の $2 : 1$ も、メネラウスの特別な一例。** Step 9 で見たとおり、「重心は中線を $2 : 1$ に内分する」という有名な事実は、中点（$1 : 1$）を代入したメネラウスの関節 $1$ つから出てきます。五心の系列で重心と再会するとき、この $2 : 1$ が「覚える公式」ではなく「一周から導ける帰結」であることを思い出してください。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（メネラウスの定理）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

横切る直線でもチェバと同じ式が成り立つのは、**「一周すると各頂点までの距離が分母分子で打ち消し合って必ず $1$ に戻る」**から。分点が辺の外へはみ出しても、打ち消し合いの輪は途切れません——だから式は $1$ 文字も変わらない。チェバ（点・内・面積が相殺）とメネラウス（直線・外・距離が相殺）は、見た目が違っても同じ一周の型の兄弟です。この「型は同じ、姿は違う」を見抜く目は、五心・円の定理・方べきへと、単元の道路網の先までずっと効いていきます。`,
};

/** GEO4: 三角形の五心（心＝「等しい距離」の言い換えどうしの交点）。 */
export const GEO_CENTERS_SERIES: LearnerSeries = {
  id: "geo_centers_01",
  title: "三角形の五心",
  subtitle:
    "数Ⅰ・A 図形の性質より — 三角形の『中心』はなぜ 5 つもある？ 外心・内心・重心を「等しい距離の言い換え」から $10$ 問。",
  patternId: "GEO4",
  unit: "algebra_1",
  revelationLabel:
    "五心は『等しい距離・等しい角』の言い換えどうしの交点——「外接円の中心」という名前ではなく、「頂点から等距離」「垂直二等分線の交点」に乗り換えると道が開く",
  drivingQuestion:
    "三角形には『中心』が $5$ つもある。なぜ $3$ 本の線がぴったり $1$ 点で交わり、その点が円や比の主役になる？ 鍵は『等しい距離』の**言い換え**——名前ではなく、言い換えに乗り換えると道が開く。",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 $ABC$ の外接円の中心（外心）を $O$ とします。外心 $O$ は $3$ つの頂点 $A$, $B$, $C$ から等しい距離にあります。$\\angle OBC = 34°$ のとき、$\\angle OCB$ は何度でしょう？",
      answer: 34,
      unit: "",
      unknownLabel: "∠OCB（度）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$2$ つの点から同じ距離にある点は、どこに集まっていた？ 中学で習った [垂直二等分線] を思い出そう。外心が $B$ からも $C$ からも同じ距離にあるなら、$OB$ と $OC$ の長さはどうなっている？ そういう三角形 $OBC$ は、どんな形の三角形？",
        },
        {
          layer: 2,
          text: "手がかりは「外心は $3$ 頂点から等距離」の一言。とくに $OB = OC$——長さの等しい $2$ 辺を持つ三角形 $OBC$ の、$2$ つの底の角にはどんな関係があった？",
        },
        {
          layer: 3,
          text: "外心 $O$ は $3$ 頂点から等距離だから $OA = OB = OC$。とくに $OB = OC$ なので三角形 $OBC$ は二等辺三角形。二等辺三角形の底角は等しいので $\\angle OCB = \\angle OBC = 34°$。「外心＝外接円の中心」という**名前だけ**では手が出ないが、「頂点から等距離」と**言い換えた**とたん、二等辺三角形の底角という道が開く——これがこの系列ぜんぶの入口。",
        },
      ],
      formulaPreview: "OB = OC（等距離）→ 二等辺三角形 → ∠OCB = ∠OBC = 34°",
      figureMarker: "<<GEO_CIRCUMCENTER>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 $ABC$ の外心を $O$ とします。$\\angle A = 44°$ のとき、中心角 $\\angle BOC$ は何度でしょう？",
      answer: 88,
      unit: "",
      unknownLabel: "∠BOC（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題では $OB = OC$ の二等辺三角形を $1$ つ読んだ。外心からは $A$ へも等距離——$OA = OB = OC$ で、二等辺三角形が実は $3$ つ隠れている。この $3$ つを組み合わせると、真ん中の角 $\\angle BOC$ と頂点の角 $\\angle A$ の間に、何か関係が見えてこないだろうか？",
        },
        {
          layer: 2,
          text: "前題に足したのは「二等辺三角形をもう $2$ つ増やして束ねる」一手だけ。$\\angle A$ を $O$ から見て $2$ つに分けると、その一つ一つが二等辺三角形の底角として中心の角に効いてくる。$\\angle A$ と $\\angle BOC$、大きくなるのはどちら？",
        },
        {
          layer: 3,
          text: "$OA = OB = OC$ だから三角形 $OAB$・$OAC$・$OBC$ はどれも二等辺。$\\angle OAB = \\angle OBA = a$、$\\angle OAC = \\angle OCA = b$ とおくと $\\angle A = a + b$。二等辺三角形の外角を追うと $\\angle BOC = 2a + 2b = 2(a + b) = 2\\angle A$。だから $\\angle BOC = 2 \\times 44 = 88$。中心の角は頂点の角のちょうど $2$ 倍——「等距離」から生まれた $3$ つの二等辺三角形が、この $2$ 倍を作っている。",
        },
      ],
      formulaPreview: "∠BOC = 2∠A = 2 × 44 = 88",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "三角形 $ABC$ の外心を $O$ とします。$\\angle A = 52°$ のとき、$\\angle BOC$ は何度でしょう？",
      answer: 104,
      unit: "",
      unknownLabel: "∠BOC（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う関係は同じ。変わったのは頂点の角の大きさだけ——中心の角はそれにどう連動する？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $\\angle A$ の値だけ。「中心の角は頂点の角の $2$ 倍」の関係はそのまま。$\\angle A = 52$ を入れると？",
        },
        {
          layer: 3,
          text: "前題と同じ $\\angle BOC = 2\\angle A = 2 \\times 52 = 104$。頂点の角が変わっても「中心は $2$ 倍」の関係は動かない——外心の等距離が保証する不変の関係。",
        },
      ],
      formulaPreview: "∠BOC = 2∠A = 2 × 52 = 104",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "三角形 $ABC$ の内接円の中心（内心）を $I$ とします。内心 $I$ は $3$ つの辺から等しい距離にあり、$3$ つの角の二等分線の交点です。$\\angle A = 76°$ のとき、$\\angle BIC$ は何度でしょう？",
      answer: 128,
      unit: "",
      unknownLabel: "∠BIC（度）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までは「頂点から等距離」の外心だった。今度は「辺から等距離」の内心——その正体は [角の二等分線] $3$ 本の交点。$\\angle B$ と $\\angle C$ が半分に切られていることを使うと、三角形 $IBC$ の内角の和から $\\angle BIC$ を追えないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、中心の作られ方が「垂直二等分線」から「角の二等分線」へ乗り換わったこと。三角形 $IBC$ で、$I$ の両どなりの角は $\\angle B$・$\\angle C$ のちょうど半分ずつ。三角形の内角の和 $180°$ から $\\angle BIC$ を出すには、あと $\\angle B + \\angle C$ が要る——それは $180° - \\angle A$ で分かる。",
        },
        {
          layer: 3,
          text: "$I$ は角の二等分線の交点だから $\\angle IBC = \\dfrac{\\angle B}{2}$、$\\angle ICB = \\dfrac{\\angle C}{2}$。三角形 $IBC$ で $\\angle BIC = 180° - \\dfrac{\\angle B + \\angle C}{2}$。$\\angle B + \\angle C = 180° - \\angle A$ なので $\\angle BIC = 180° - \\dfrac{180° - \\angle A}{2} = 90° + \\dfrac{\\angle A}{2} = 90 + 38 = 128$。外心では「等距離 → 垂直二等分線」、内心では「等距離 → 角の二等分線」——同じ『等しい距離』の言い換えが別の道具に化ける、ここが質的な転換点。",
        },
      ],
      formulaPreview: "∠BIC = 90° + ∠A/2 = 90 + 38 = 128",
      figureMarker: "<<GEO_INCENTER>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 $ABC$ の内心を $I$ とします。$\\angle A = 100°$ のとき、$\\angle BIC$ は何度でしょう？",
      answer: 140,
      unit: "",
      unknownLabel: "∠BIC（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。内心の角の出し方は同じ。変わったのは頂点の角だけ——今度は $\\angle A$ が鈍角。それでも同じ道が通る？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $\\angle A$ が $90°$ を超えたこと。でも「$90°$ ＋ 頂点の半分」の関係は角が鈍くても生きている。$\\angle A = 100$ を入れると？",
        },
        {
          layer: 3,
          text: "前題と同じ $\\angle BIC = 90° + \\dfrac{\\angle A}{2} = 90 + 50 = 140$。$\\angle A$ が鈍角でも内心は必ず三角形の内側にあり、式はそのまま成り立つ——「$90°$ ＋ 頂点の半分」は常に $90°$ より大きい、つまり $\\angle BIC$ はいつも鈍角。",
        },
      ],
      formulaPreview: "∠BIC = 90° + ∠A/2 = 90 + 50 = 140",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 $ABC$ の内心を $I$ とし、$\\angle A$ の二等分線が辺 $BC$ と交わる点を $D$ とします（$I$ はこの $AD$ 上にあります）。$AC = 4$、$BC = 9$ で、$D$ が $BC$ を $BD = 6$、$DC = 3$ に分けているとき、$AB$ の長さはいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "AB の長さ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは角ばかり追ってきた。ここで [角の二等分線] の系列で身につけた「向かいの辺は、となりの $2$ 辺の比のとおりに切れる」を思い出そう。$BC$ の切られ方 $BD : DC$ が分かっているなら、逆に、となりの $2$ 辺の比も分かるはず——$AC$ が分かっていれば $AB$ は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、追うものが角から長さに移り、しかも与えと求めが逆向きになったこと。$BD : DC = AB : AC$ の関係に、分かっている $BD = 6$、$DC = 3$、$AC = 4$ を入れて $AB$ を逆算すると？",
        },
        {
          layer: 3,
          text: "角の二等分線の性質から $BD : DC = AB : AC$。$6 : 3 = AB : 4$ だから $AB = 4 \\times \\dfrac{6}{3} = 8$。角の二等分線の系列で「辺 → 比」に使った関係を、ここでは「比 → 辺」と逆から引いた——内心を追う道は、前の系列の道具をそのまま逆走する。",
        },
      ],
      formulaPreview: "BD:DC = AB:AC → 6:3 = AB:4 → AB = 8",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 $ABC$ で $AB = 8$、$AC = 4$、$BC = 9$ です。内心を $I$、$\\angle A$ の二等分線と辺 $BC$ の交点を $D$ とするとき、$AI : ID$ を分数 $\\dfrac{AI}{ID}$ の値で答えましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "AI:ID（分数 AI/ID で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題で $AD$ の足もと（$BC$ 上の $BD : DC$）は押さえた。今度は内心 $I$ が $AD$ そのものをどう分けるか。$I$ は $BC$ 上の点ではなく $AD$ 上の点——一度で届かないなら、二段階で乗り換えられないだろうか？",
        },
        {
          layer: 2,
          text: "前題からの一手は「$BC$ の上の比を $AD$ の上の比に乗せ換える」こと。まず $BD$ を出し（前題の手）、次に三角形 $ABD$ の中で $B$ から出る二等分線が $AD$ を分ける——$AI : ID$ は $AB : BD$ で決まる。",
        },
        {
          layer: 3,
          text: "まず $BD : DC = AB : AC = 8 : 4 = 2 : 1$、$BC = 9$ を配分して $BD = 6$。次に、三角形 $ABD$ で $BI$ は $\\angle B$ の二等分線（$I$ は内心だから）なので、角の二等分線の性質がもう一度効いて $AI : ID = AB : BD = 8 : 6 = 4 : 3$。分数で $\\dfrac{AI}{ID} = \\dfrac{4}{3}$（これは $(AB + AC) : BC = 12 : 9$ とも一致する）。角の二等分線の性質を続けて $2$ 回乗り換えると、内心が二等分線 $AD$ を分ける比まで届く——言い換えの連鎖が、そのまま解法の道になる。",
        },
      ],
      formulaPreview: "BD = 6 → AI:ID = AB:BD = 8:6 = 4:3",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 $ABC$ で、頂点 $A$ と辺 $BC$ の [中点] $M$ を結ぶ線（中線）を引きます。$3$ 本の中線の交点が重心 $G$ です。このとき、$G$ から中点 $M$ までの長さ $GM$ は、$G$ から頂点 $A$ までの長さ $GA$ の何倍でしょう？（分数で）",
      answer: 0.5,
      answerDisplay: "1/2",
      unit: "倍",
      unknownLabel: "GM は GA の何倍か（分数で）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "外心・内心と追ってきて、今度は重心——各辺の [中点] と向かいの頂点を結ぶ中線 $3$ 本の交点。$3$ 本がきっちり $1$ 点で交わるだけでなく、その点は $1$ 本 $1$ 本の中線を「いつも決まった比」で分ける。頂点側と中点側、長くなるのはどちら？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、角の二等分線から中線への乗り換え。重心は中線を、頂点から測って $2$、中点から測って $1$ の比で分ける——つまり頂点側が長い。だと $GM$ は $GA$ のどれだけにあたる？",
        },
        {
          layer: 3,
          text: "重心は中線を $2 : 1$ に分ける（頂点から中点へ $AG : GM = 2 : 1$）。だから $GM$ は $GA$ の $\\dfrac{1}{2}$。中線を組み合わせて一周の比をたどると（メネラウスの道でも確かめられる）必ずこの $2 : 1$ が出る——外心・内心が「等距離」から生まれたのに対し、重心は「中点＝$1 : 1$ の内分」を $3$ 本束ねた交点。同じ『言い換え』の家族の $3$ 人目。",
        },
      ],
      formulaPreview: "重心は中線を 2:1 に分ける → GM = GA × 1/2",
      figureMarker: "<<GEO_CENTROID>>",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "三角形 $ABC$ で、頂点 $A$ から辺 $BC$ の中点 $M$ へ引いた中線 $AM$ の長さが $15$ です。重心を $G$ とするとき、$AG$ の長さはいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "AG の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。重心が中線を分ける比は同じ。今度は中線の全体の長さが分かっている——比のとおりに配分すれば、頂点から重心までの実際の長さが出せそうだ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、比だけでなく中線 $AM = 15$ の全長が与えられたこと。$AG : GM = 2 : 1$ で全体を $3$ つに分けると、$AG$ は全体のどれだけ？",
        },
        {
          layer: 3,
          text: "$AG : GM = 2 : 1$ だから、$AM$ を $3$ 等分したうちの $2$ つ分が $AG$。$AG = 15 \\times \\dfrac{2}{3} = 10$（$GM = 5$）。比が分かれば、全体の長さを掛けるだけで実際の長さに降りられる——外心・内心で角を出したのと同じ「言い換え → 数値」の流れ。",
        },
      ],
      formulaPreview: "AG:GM = 2:1 → AG = 15 × 2/3 = 10",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ で $\\angle A = 34°$ です。外心を $O$、内心を $I$ とするとき、$\\angle BIC$ と $\\angle BOC$ の差 $\\angle BIC - \\angle BOC$ は何度でしょう？",
      answer: 39,
      unit: "",
      unknownLabel: "∠BIC − ∠BOC（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "この系列で、外心の角（step2〜3）と内心の角（step4〜5）を別々に出せるようになった。今度は同じ $1$ つの三角形で両方を出して見比べる。$\\angle BOC$ と $\\angle BIC$、同じ $\\angle A$ から作られるのに、大きくなるのはどちら？",
        },
        {
          layer: 2,
          text: "前の step たちと変わったのは、外心の関係と内心の関係を $1$ 問で両方使うこと。$\\angle BOC = 2\\angle A$ と $\\angle BIC = 90° + \\dfrac{\\angle A}{2}$ をそれぞれ出して、引き算するだけ。",
        },
        {
          layer: 3,
          text: "$\\angle BOC = 2 \\times 34 = 68$、$\\angle BIC = 90 + 17 = 107$。差は $\\angle BIC - \\angle BOC = 107 - 68 = 39$。実は $\\angle A$ が $60°$ より小さいと内心の角のほうが大きく、$60°$ を超えると外心の角のほうが大きい——ちょうど $\\angle A = 60°$ で両者は等しくなり、そのとき $B$, $C$, $O$, $I$ は $1$ つの円の上に並ぶ（同じ辺 $BC$ を同じ角で見込むから）。この「$4$ 点が同じ円に乗る」判定が、次の系列（円周角と中心角）の入口になる。",
        },
      ],
      formulaPreview: "∠BOC = 68・∠BIC = 107 → 107 − 68 = 39",
    },
  ],
  derivation: `**中心の問い** ｜ 三角形には『中心』が $5$ つもある。なぜ $3$ 本の線がぴったり $1$ 点で交わり、その点が円や比の主役になる？ 鍵は『等しい距離』の**言い換え**——名前ではなく、言い換えに乗り換えると道が開く。

────────

**「外心」という名前は、手がかりにならない。**

「外心＝外接円の中心」——この言い方だけでは、角も長さも $1$ つも出てきません。手が動き出すのは、名前を**別の言葉に言い換えた**瞬間です。

- 外心 ＝ **$3$ 頂点から等距離**の点 ＝ **$3$ 辺の [垂直二等分線] の交点**

「等距離」と言い換えると、$OA = OB = OC$ から二等辺三角形が $3$ つ生まれます。$\\angle OAB = \\angle OBA = a$、$\\angle OAC = \\angle OCA = b$ とおくと、頂点の角は $\\angle A = a + b$。二等辺三角形の外角をたどると、中心の角は

$$\\angle BOC = 2a + 2b = 2\\angle A$$

——頂点の角のちょうど $2$ 倍。覚えていなくても、「$3$ 頂点から等距離 → 二等辺三角形 $3$ つ」から毎回導けます。

<<GEO_CIRCUMCENTER>>

**内心も、言い換えれば同じ手が動く。**

- 内心 ＝ **$3$ 辺から等距離**の点 ＝ **$3$ 角の [角の二等分線] の交点**

外心が「頂点から等距離」なら、内心は「辺から等距離」。距離の相手が頂点から辺に変わっただけで、道具は垂直二等分線から角の二等分線へ乗り換わります。三角形 $IBC$ では、$I$ の両どなりの角が $\\dfrac{\\angle B}{2}$、$\\dfrac{\\angle C}{2}$。内角の和 $180°$ から

$$\\angle BIC = 180° - \\dfrac{\\angle B + \\angle C}{2} = 180° - \\dfrac{180° - \\angle A}{2} = 90° + \\dfrac{\\angle A}{2}$$

これも公式を覚える必要はなく、「角の二等分線の交点」と「内角の和」だけから再建できます。

**重心は「$1 : 1$ の内分」を $3$ 本束ねた交点。**

- 重心 ＝ $3$ 本の**中線**（頂点と向かいの辺の [中点] を結ぶ）の交点

中点は「$1 : 1$ の内分点」。その中線 $3$ 本の交点である重心は、$1$ 本の中線を必ず $2 : 1$（頂点側 $2$・中点側 $1$）に分けます。だから中線 $AM$ が分かれば $AG = AM \\times \\dfrac{2}{3}$。

**五心の総覧（残り $2$ つも同じ発想）。** 三角形の心は $5$ つ：**重心**（中線の交点）・**外心**（垂直二等分線の交点＝外接円の中心）・**内心**（角の二等分線の交点＝内接円の中心）・**垂心**（$3$ 頂点から向かいの辺に下ろした垂線の交点）・**傍心**（$1$ つの内角の二等分線と他 $2$ つの外角の二等分線の交点＝三角形の外側で $3$ 辺に接する円の中心）。どれも「等しい距離」や「等しい角」の言い換えを $3$ 本引いて交わらせたもの——名前ではなく、**言い換えの束**が心の正体です。

**間違えやすいのは、「名前で止まる」こと。** 「外心って外接円の中心でしょ」で思考が止まると、$1$ 文字も進みません。名前は答えの入口ではなく、そこから「等距離」「垂直二等分線」「中心角 $2$ 倍」へ放射状に言い換えるためのラベルにすぎない。もう $1$ つの定番の取り違えは中心角の向き——$\\angle BOC$ は頂点の角の「$2$ 倍」であって「半分」ではありません。真ん中の $1$ 点から見込む角 $\\angle BOC$ のほうが、円周から見込む角 $\\angle A$ より大きい、と向きを確かめれば防げます。

────────

**もっと深く**

**放射型の連想が、図形問題の解き方そのもの。** 「内心」という $1$ つの言葉から、「内接円の中心」「$3$ 辺から等距離」「角の二等分線の交点」「向かいの辺の内分比」…と枝を放射状に伸ばし、そのどれかが答えにつながる道になります。図形問題は、真っ暗な部屋で出口を手探りするように、$1$ つのキーワードから複数のキーワードを思い浮かべて道をつなぐ**連想ゲーム**。猪突猛進ではなく放射型——この態度こそ、この章がいちばん伝えたいことです。

**外心は、数Ⅰの正弦定理へまっすぐ橋が架かる。** 外心は外接円の中心なので、その半径 $R$ が外接円の半径そのもの。中心角 $\\angle BOC = 2\\angle A$ を使うと、辺 $BC$ と $\\angle A$ と $R$ の関係 $\\dfrac{BC}{\\sin A} = 2R$（正弦定理）がここから見えてきます。「三角形の五心」で読んだ中心角の $2$ 倍が、三角比の単元で辺と角と円をつなぐ主役に化けます。

**$\\angle BOC$ と $\\angle BIC$ が交差する場所（step10）。** 同じ三角形で外心の角と内心の角を見比べると、$\\angle A = 60°$ でちょうど等しくなり、そのとき $B$, $C$, $O$, $I$ が $1$ つの円に乗ります。「同じ辺を同じ角で見込む $2$ 点は同じ円周上」——これが次の系列（円周角と中心角）の心臓です。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（三角形の内心と外心・五心）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

三角形の心が $5$ つもあり、$3$ 本の線が $1$ 点で交わって円や比の主役になるのは、それぞれの心が「等しい距離」や「等しい角」という条件を**言い換えた集まり**の交点だから。「外接円の中心」という名前のままでは手が止まりますが、「頂点から等距離」「垂直二等分線の交点」と言い換えたとたん、二等辺三角形・内角の和・内分比といった既知の道具に乗り換えられます。忘れても、言い換えからいつでも再建できる——これが五心の、そして図形の見方の核心です。`,
};

/** GEO5: 円周角と中心角（角を決めるのは点ではなく弧）。 */
export const GEO_INSCRIBED_SERIES: LearnerSeries = {
  id: "geo_inscribed_01",
  title: "円周角と中心角",
  subtitle:
    "数Ⅰ・A 図形の性質より — 同じ弧を見込む円周角は、円周のどこから見ても変わらない。中心角の半分・直径の直角・共円判定まで $10$ 問。",
  patternId: "GEO5",
  unit: "algebra_1",
  revelationLabel:
    "中心角は円周角のちょうど $2$ 倍——角の大きさを決めているのは点ではなく『弧』。逆に読めば、角の等しさが『同じ円の上』の証拠になる",
  drivingQuestion:
    "円周の上を動いても、同じ弧を見込む円周角はなぜ変わらないのか？——角の大きさを決めているのは、点ではなく『弧』ではないか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円 $O$ の周上に $3$ 点 $A$、$B$、$P$ があります。弧 $AB$（点 $P$ を含まない方）に対する中心角 $\\angle AOB$ が $96$ 度のとき、同じ弧を点 $P$ から見込む円周角 $\\angle APB$ は何度でしょう？",
      answer: 48,
      unit: "",
      unknownLabel: "円周角 ∠APB（度）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "中学で、円の中心から見た角と、円周の点から見た角を比べたことを思い出そう。同じ弧 $AB$ を見ているとき、中心 $O$ から見た角と、円周の点 $P$ から見た角——どちらが大きかった？ 片方はもう片方の何倍だっただろう？",
        },
        {
          layer: 2,
          text: "この系列の土台は「同じ弧を見込むとき、中心角は円周角のちょうど $2$ 倍」。今わかっているのは中心の角のほう。円周から見た角は、その半分になる？ それとも $2$ 倍になる？",
        },
        {
          layer: 3,
          text: "同じ弧 $AB$ を見込むとき、中心角 $\\angle AOB$ は円周角 $\\angle APB$ のちょうど $2$ 倍。だから $\\angle APB = 96 \\div 2 = 48$ 度。円周のどこに $P$ を動かしても、同じ弧 $AB$ を見ているかぎり円周角は $48$ 度のまま変わらない——角を決めているのは点 $P$ ではなく、見込んでいる弧 $AB$ のほう。ここがこの系列ぜんぶの出発点。",
        },
      ],
      formulaPreview: "中心角 = 円周角 × 2 → ∠APB = 96 ÷ 2 = 48",
      figureMarker: "<<GEO_INSCRIBED>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円 $O$ の周上に $3$ 点 $A$、$B$、$P$ があります。弧 $AB$（点 $P$ を含まない方）に対する中心角 $\\angle AOB$ が $58$ 度のとき、円周角 $\\angle APB$ は何度でしょう？",
      answer: 29,
      unit: "",
      unknownLabel: "円周角 ∠APB（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「中心角は円周角の $2$ 倍」。変わったのは中心角の大きさだけ——前題と同じ道がそのまま使える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは中心角が $58$ 度になったこと。円周角はその半分だった——半分にするとどうなる？",
        },
        {
          layer: 3,
          text: "前題と同じで、円周角は中心角の半分。$\\angle APB = 58 \\div 2 = 29$ 度。中心角がいくつでも、円周角はいつでもその半分——「弧が同じなら円周角は場所によらず一定」という前題の発見が、そのまま効いている。",
        },
      ],
      formulaPreview: "∠APB = 中心角 ÷ 2 = 58 ÷ 2 = 29",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "円 $O$ の周上に $3$ 点 $A$、$B$、$P$ があります。弧 $AB$ を見込む円周角 $\\angle APB$ が $39$ 度のとき、同じ弧に対する中心角 $\\angle AOB$ は何度でしょう？",
      answer: 78,
      unit: "",
      unknownLabel: "中心角 ∠AOB（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題までは中心の角から円周の角へ、半分にする向きで写した。今度は円周角のほうが先にわかっていて、聞かれているのは中心角。同じ「$2$ 倍」の関係を、逆向きに読めないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、未知の場所が中心角に移ったこと。円周角がわかっているなら、中心角はその半分？ それとも $2$ 倍？",
        },
        {
          layer: 3,
          text: "円周角 $\\angle APB = 39$ 度で、中心角はその $2$ 倍だから $\\angle AOB = 39 \\times 2 = 78$ 度。同じ「中心角 ＝ 円周角 $\\times 2$」を、向きを変えて使うだけ。半分に割る道と、$2$ 倍に戻す道——弧を仲立ちにした翻訳は、どちらの向きにも通れる。",
        },
      ],
      formulaPreview: "中心角 = 円周角 × 2 → ∠AOB = 39 × 2 = 78",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "円 $O$ の周上に点 $P$ があり、弧 $AB$ を見込む円周角 $\\angle APB$ が $47$ 度です。同じ弧 $AB$ を、円周上の別の点 $Q$ から見込む円周角 $\\angle AQB$ は何度でしょう？",
      answer: 47,
      unit: "",
      unknownLabel: "円周角 ∠AQB（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までは中心角と円周角の間を行き来した。今度は中心角は出てこない。同じ弧 $AB$ を、点 $P$ から見た角と、別の点 $Q$ から見た角——$2$ つの円周角の間には、どんな関係がありそう？ 角を決めているのは弧だった、を思い出そう。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは「中心を経由せず、円周角どうしを直接くらべる」こと。$P$ も $Q$ も、見込んでいる弧 $AB$ は同じ——見込む弧が同じなら、円周角はどうなる？",
        },
        {
          layer: 3,
          text: "同じ弧 $AB$ を見込む円周角は、どちらも同じ中心角（その $2$ 倍）を半分にしたもの。だから円周上のどこから見ても等しく、$\\angle AQB = \\angle APB = 47$ 度。点を $P$ から $Q$ へ引っ越しても、見ている弧が変わらないかぎり角は動かない——「角を決めるのは点ではなく弧」が、等しい角を別の場所へ運ぶ道具になる。",
        },
      ],
      formulaPreview: "同じ弧 → 円周角は等しい → ∠AQB = ∠APB = 47",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "線分 $AB$ が円 $O$ の直径です。円周上に点 $P$ があるとき、円周角 $\\angle APB$ は何度でしょう？",
      answer: 90,
      unit: "",
      unknownLabel: "円周角 ∠APB（度）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは弧 $AB$ がいろいろな大きさだった。今度は弦 $AB$ が円の直径——$A$ と $B$ が円のちょうど反対側にある特別な場合。直径に対する中心角は、まっすぐ一直線で何度になる？ その半分は？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは「弦 $AB$ が中心 $O$ を通り抜けている（直径）」こと。直径に対する中心角 $\\angle AOB$ は一直線ぶんの角。円周角はいつもその半分だった——半分にするとどんな角になる？",
        },
        {
          layer: 3,
          text: "直径 $AB$ に対する中心角は一直線ぶんで $180$ 度。円周角はその半分だから $\\angle APB = 180 \\div 2 = 90$ 度。$P$ を円周のどこに置いても、直径を見込むかぎり必ず $90$ 度の直角になる（タレスの定理）——「中心角の半分」という同じ規則が、弧がちょうど半円のときに直角を生む。弧が角を決める、の一番くっきりした姿。",
        },
      ],
      formulaPreview: "直径の中心角 = 180 → ∠APB = 180 ÷ 2 = 90",
      figureMarker: "<<GEO_THALES>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "線分 $AB$ は円 $O$ の直径で、円周上に点 $P$ があります。$\\angle PAB = 23$ 度のとき、$\\angle PBA$ は何度でしょう？",
      answer: 67,
      unit: "",
      unknownLabel: "∠PBA（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題で「直径を見込む円周角は直角」を手に入れた。今度は三角形 $ABP$ の $1$ つの角 $23$ 度が与えられている。この三角形のどこかに直角が隠れていないだろうか？ 三角形の $3$ つの角の和はいくつだったか、思い出そう。",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「直角と、三角形の内角の和を組み合わせる」一手。$\\angle APB$ は前題の直径の性質で決まる——それを使うと、残りの $2$ 角の和は何度になる？",
        },
        {
          layer: 3,
          text: "直径 $AB$ を見込むので $\\angle APB = 90$ 度（前題）。三角形 $ABP$ の内角の和は $180$ 度だから、$\\angle PAB + \\angle PBA = 180 - 90 = 90$ 度。よって $\\angle PBA = 90 - 23 = 67$ 度。直径が生む直角を足場にすると、片方の角から反対の角がすぐ出る——弧（ここでは半円）が直角を用意し、その直角が角の追跡の出発点になる。",
        },
      ],
      formulaPreview: "∠APB = 90 → ∠PAB + ∠PBA = 90 → ∠PBA = 90 - 23 = 67",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "円 $O$ で、弧 $AB$ のうち優弧（大きい方の弧）の側にできる中心角が $214$ 度です。劣弧（小さい方の弧）$AB$ の上にある点 $P$ から見込む円周角 $\\angle APB$ は何度でしょう？",
      answer: 107,
      unit: "",
      unknownLabel: "円周角 ∠APB（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは中心角が $180$ 度より小さかった。今度は中心角が $180$ 度を超える側（優弧の側）で $214$ 度。点 $P$ は小さい方の弧（劣弧）の上にある——$P$ が見込んでいるのは、大きい方の弧？ それとも小さい方の弧？ 円周角の相方になる弧を、まず見きわめよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは「点 $P$ が劣弧の上にいて、見込む弧が優弧（$214$ 度の側）」だということ。円周角はその見込む弧に対する中心角の半分——$214$ 度の半分？ それとも反対側の弧の中心角の半分？",
        },
        {
          layer: 3,
          text: "劣弧の上の点 $P$ が見込むのは優弧の側なので、その中心角 $214$ 度の半分。$\\angle APB = 214 \\div 2 = 107$ 度。もし $P$ を優弧の上に移すと、今度は劣弧（$360 - 214 = 146$ 度）の側を見込むので $\\angle APB = 146 \\div 2 = 73$ 度になり、$2$ つを足すと $107 + 73 = 180$ 度。同じ弦 $AB$ でも、どちらの弧の上から見るかで円周角は変わる（和は $180$ 度）——「弧が角を決める」を取り違えないための一番のポイント。",
        },
      ],
      formulaPreview: "劣弧上の点は優弧を見込む → ∠APB = 214 ÷ 2 = 107",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円周上に $4$ 点 $A$、$B$、$C$、$D$ がこの順に並んでいます。円周角について $\\angle ADB = 32$ 度、$\\angle BAC = 47$ 度、$\\angle CBD = 39$ 度がわかっています。円周角 $\\angle ACD$ は何度でしょう？",
      answer: 62,
      unit: "",
      unknownLabel: "円周角 ∠ACD（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "これまでの step で「円周角の $2$ 倍が、その弧に対する中心角（＝弧の大きさ）」を手に入れた。中心も直径も直接は与えられていない今、手がかりは $3$ つの円周角だけ。それぞれの円周角は、円周のどの弧の大きさを教えてくれている？ 円をぐるり一周ぜんぶ合わせると何度だっただろう？",
        },
        {
          layer: 2,
          text: "これまでと変わったのは「$1$ つの弧を直接は問われず、残りの弧を回り道で出す」こと。$\\angle ADB$・$\\angle BAC$・$\\angle CBD$ はそれぞれ弧 $AB$・$BC$・$CD$ の大きさを教える。円周ひとまわりから $3$ つの弧を除くと、残る弧 $DA$ が出る——$\\angle ACD$ はその弧 $DA$ を見込んでいる。",
        },
        {
          layer: 3,
          text: "各円周角を $2$ 倍すると、見込む弧の大きさになる：弧 $AB = 32 \\times 2 = 64$、弧 $BC = 47 \\times 2 = 94$、弧 $CD = 39 \\times 2 = 78$。円周は一周 $360$ 度だから、残る弧 $DA = 360 - 64 - 94 - 78 = 124$ 度。$\\angle ACD$ は弧 $DA$ を見込む円周角なので、その半分 $\\angle ACD = 124 \\div 2 = 62$ 度。中心も直径も使わず、円周角を弧の大きさに翻訳して弧を一周たどるだけで、直接は見えない角に届く——弧が角を決める、を鎖のように連ねた道。",
        },
      ],
      formulaPreview:
        "弧AB=64・弧BC=94・弧CD=78 → 弧DA = 360 - 236 = 124 → ∠ACD = 124 ÷ 2 = 62",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "直線 $AB$ について同じ側に $2$ 点 $C$、$D$ があります。$\\angle ADB = 58$ 度のとき、$4$ 点 $A$、$B$、$C$、$D$ が同一円周上にあるためには、$\\angle ACB$ は何度でなければならないでしょう？",
      answer: 58,
      unit: "",
      unknownLabel: "同一円周上になる ∠ACB（度）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "これまでは「同じ円の上にある」ことがわかっている図で、同じ弧の円周角は等しい、を使ってきた。今度は逆——まだ同じ円の上にあるとは限らない $4$ 点。もし $C$ と $D$ が同じ円周に乗っているとしたら、同じ弦 $AB$ を同じ側から見込む $2$ つの角には、どんな関係があるはずだろう？",
        },
        {
          layer: 2,
          text: "これまでと変わったのは「等しいから同じ円、を逆向きに読む」こと。$C$、$D$ が同一円周上にあるなら、弦 $AB$ を同じ側から見込む $\\angle ACB$ と $\\angle ADB$ は同じ弧の円周角——だから $2$ つはどうなる？",
        },
        {
          layer: 3,
          text: "同じ弦 $AB$ を同じ側から見込む円周角が等しいとき、そしてそのときだけ、$4$ 点は同一円周上にある（円周角の定理の逆）。だから $\\angle ACB = \\angle ADB = 58$ 度でなければならない。「同じ弧なら等しい」を裏返すと、「等しければ同じ円に乗る」という判定になる——角の等しさが、点が同じ円の上にいる証拠になる。この逆向きの読みが、次の系列（内接四角形）の入口になる。",
        },
      ],
      formulaPreview: "円周角の定理の逆 → 同一円周上なら ∠ACB = ∠ADB = 58",
      figureMarker: "<<GEO_CONVERSE>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ の外心を $O$ とします。外心は $3$ 頂点から等距離で $OA = OB = OC$ です。$\\angle OBC = 32$ 度のとき、円周角 $\\angle BAC$ は何度でしょう？",
      answer: 58,
      unit: "",
      unknownLabel: "円周角 ∠BAC（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "系列4 で会った外心を思い出そう——外心 $O$ は $3$ つの頂点から等距離、つまり $OA = OB = OC$。今わかっているのは $\\angle OBC = 32$ 度。三角形 $OBC$ に目を向けると、$OB$ と $OC$ が等しいことから、どんな形の三角形になっている？ そこから中心の角 $\\angle BOC$ は言えないだろうか？",
        },
        {
          layer: 2,
          text: "これまでと変わったのは「外心の『等距離』を経由して、まず中心角 $\\angle BOC$ を作る」こと。$OB = OC$ だから三角形 $OBC$ は二等辺——底角がもう $1$ つ決まれば頂角 $\\angle BOC$ が出る。その $\\angle BOC$ は辺 $BC$ を見込む中心角。頂点 $A$ の円周角 $\\angle BAC$ との関係は？",
        },
        {
          layer: 3,
          text: "外心だから $OB = OC$、三角形 $OBC$ は二等辺で底角が等しく $\\angle OCB = \\angle OBC = 32$ 度。頂角 $\\angle BOC = 180 - 32 - 32 = 116$ 度。この $\\angle BOC$ は外接円で弦 $BC$ を見込む中心角、$\\angle BAC$ は同じ弦を頂点 $A$ から見込む円周角だから、$\\angle BAC = 116 \\div 2 = 58$ 度。外心の「等距離」が二等辺三角形を生み、それが中心角になり、円周角へ半分に降りる——系列4 の心（等距離の言い換え）と、この系列の「中心角は円周角の $2$ 倍」が $1$ 本の鎖でつながる。ちなみに、$BC$ を同じ側から $58$ 度で見込む点はすべてこの外接円の上に乗る（step9 の逆）——外心 $O$ はその円の中心にほかならない。",
        },
      ],
      formulaPreview:
        "OB=OC → 二等辺の底角 32 → ∠BOC = 180 - 64 = 116 → ∠BAC = 116 ÷ 2 = 58",
    },
  ],
  derivation: `**中心の問い** ｜ 円周の上を動いても、同じ弧を見込む円周角はなぜ変わらないのか？——角の大きさを決めているのは、点ではなく『弧』ではないか？

────────

**性質そのものは $1$ 行で書ける。**

円 $O$ で、弧 $AB$ を見込む中心角 $\\angle AOB$ と円周角 $\\angle APB$ の間には：

$$\\angle AOB = 2 \\times \\angle APB$$

点 $P$ を弧の上でどこへ動かしても、同じ弧 $AB$ を見ているかぎり右辺は変わりません。だから同じ弧の円周角はすべて等しい。角を決めているのは点 $P$ の位置ではなく、見込んでいる弧のほう——これがこの系列の核心です。

<<GEO_INSCRIBED>>

**なぜ $2$ 倍になるのか——外角と二等辺三角形から生やす。**

中学で「三角形の外角は、隣り合わない $2$ つの内角の和に等しい」を習いました。それと「半径はすべて等しい（$OA = OB = OP$）」の $2$ つだけで、$2$ 倍は再建できます。忘れても、この $2$ 枚のカードから毎回導けます。

まず $P$ が弧の上にいて、中心 $O$ が円周角 $\\angle APB$ の内側にある場合。半径 $OP$ を $O$ の側へ延ばした直線を引くと、三角形 $OAP$ と三角形 $OBP$ はそれぞれ二等辺三角形（$OA = OP$、$OB = OP$）です。二等辺三角形の底角は等しいので、$\\angle OPA = \\angle OAP$、$\\angle OPB = \\angle OBP$。ここで延ばした直線の側にできる外角に注目すると、$\\angle AOX = 2\\,\\angle OPA$、$\\angle BOX = 2\\,\\angle OPB$（外角＝底角 $2$ つ分）。この $2$ つを足せば：

$$\\angle AOB = \\angle AOX + \\angle BOX = 2(\\angle OPA + \\angle OPB) = 2\\,\\angle APB$$

**場合分けが要る。** $P$ の位置によって、中心 $O$ が円周角の内側にあるとは限りません。$O$ が円周角の外側（$P$ が弧のはしのほうに寄った場合）には、$2$ つの外角を「足す」のではなく「引く」ことになり、$\\angle AOB = 2\\,\\angle OPB - 2\\,\\angle OPA = 2(\\angle OPB - \\angle OPA) = 2\\,\\angle APB$。式の形は同じ $2$ 倍に落ち着きます。中心が円周角の辺の上にちょうど乗るとき（弦の片方が直径になるとき）は、二等辺三角形が $1$ つだけの一番やさしい姿で、これが場合分けの境目です。**どの場合でも結論は $\\angle AOB = 2\\,\\angle APB$**——だから直径を見込むと（中心角 $180$ 度）円周角は必ず $90$ 度になります（Step 5・タレスの定理）。

**間違えやすいのは、優弧と劣弧の取り違え（Step 7）。**

同じ弦 $AB$ でも、弧は $2$ つあります——小さい方（劣弧）と大きい方（優弧）。円周角の相方は「点 $P$ が乗っていない方の弧」です。$P$ が劣弧の上にいれば優弧の側を見込み、優弧の上にいれば劣弧の側を見込む。だから同じ弦でも、見る位置によって円周角は変わり、劣弧側の点と優弧側の点の円周角を足すと $180$ 度になります（$2$ つの弧の中心角を足すと一周 $360$ 度、その半分）。「弦が同じなら角も同じ」と早合点すると、この $180$ 度差を落とします——見るべきは弦ではなく弧。

────────

**もっと深く**

**逆も成り立つ——ただし、それは別の問題（Step 9）。** 「同じ弧の円周角は等しい」の逆、「$2$ 点が同じ弦を同じ側から等しい角で見込むなら、その $2$ 点はもとの $2$ 点と同一円周上にある」は、証明し直しが要る**別の命題**です。ある命題が正しくても、その逆が正しいとは限らない——ここは [対偶] の出番です。逆を直接示す代わりに対偶「同一円周上に無いなら、$2$ つの角は等しくない」を示します。点 $Q$ が円の外側にあれば見込む角は円周上より小さく、内側にあれば大きくなる（三角形の外角が内角より大きいことを使う）。外でも内でもズレるのだから、角が等しいなら $Q$ は円周の上——これで逆が言えました。**対偶で示すこの型は、集合と論理の単元（[対偶]・[命題]）でつかんだ「逆・裏・対偶」の文法そのもの**。図形の証明が、論理の章とまっすぐつながる場所です。

**外心の角との再会（Step 10）。** 系列4 の外心 $O$ は「$3$ 頂点から等距離」でした。三角形 $ABC$ の外接円を考えると、$A$ はその円周上の点、$BC$ は弦、$O$ は中心。すると $\\angle BOC$ はまさに弦 $BC$ の中心角、$\\angle BAC$ はその円周角——$\\angle BOC = 2\\,\\angle BAC$ が、外心の「等距離」から二等辺三角形を経由してもう一度立ち上がります。等しい距離・二等辺・中心角・円周角——別々に見えた道具が、$1$ 本の鎖でつながります。

**捨てているものは何か。** 円周角が運んでいるのは「弧の大きさ（角度）」だけで、円の半径や弦の実際の長さは捨てられています。だから角度だけの問いは半径を知らなくても解けるし、逆に長さを知りたければ半径という別の情報がもう $1$ つ要る——何が角に残り、何が捨てられたかを意識すると、「角だけで答えられる問い」と「長さが要る問い」を見分けられます。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（円周角と中心角・円周角の定理）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

同じ弧を見込む円周角が動かないのは、**円周角がいつでも「その弧の中心角のちょうど半分」だから**。角を決めているのは点の位置ではなく、見込んでいる弧です。この $1$ 本の関係を、半分に割る向き（中心角→円周角）にも、$2$ 倍に戻す向き（円周角→中心角）にも、弧を一周たどる向き（角の追跡）にも、そして裏返して「同じ円の上にいる証拠」にも使えます。弧が角を決める——この見方が、次の内接四角形（対角の和 $180$ 度）と接弦定理、そして方べきの定理へと続いていきます。`,
};

/** GEO6: 内接四角形と接弦定理（対角の和は弧の一周・接弦定理はその極限）。 */
export const GEO_CYCLIC_TANGENT_SERIES: LearnerSeries = {
  id: "geo_cyclic_tangent_01",
  title: "内接四角形と接弦定理",
  subtitle:
    "数Ⅰ・A 図形の性質より — 円に内接する四角形の対角の和はなぜ $180°$？ 頂点を接点まで滑らせると接弦定理になる。対角の和・外角・接弦・$2$ 円まで $10$ 問。",
  patternId: "GEO6",
  unit: "algebra_1",
  revelationLabel:
    "向かい合う角の和が $180°$ なのは、$2$ つの弧で円を一周（中心角 $360°$）するから——頂点を接点まで滑らせると、接弦定理が同じ等式の極限として姿を現す",
  drivingQuestion:
    "円に内接する四角形の向かい合う角は、なぜ足すと必ず $180°$ なのか？ そして頂点を $1$ つ、接点まで滑らせていくと——その式はどんな姿に変わる？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円に内接する四角形 $ABCD$ があります。$\\angle A = 83°$ のとき、向かい合う角 $\\angle C$ は何度でしょう？",
      answer: 97,
      unit: "",
      unknownLabel: "∠C の大きさ（度）",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "この四角形は円に内接している。向かい合う頂点 $A$ と $C$ は、それぞれ円のどちら側の弧を見込んでいるだろう？ [円周角] が見込む弧で決まったことを思い出すと、$A$ の見る弧と $C$ の見る弧を合わせると、円の何周分になる？",
        },
        {
          layer: 2,
          text: "向かい合う $2$ つの角が見込む $2$ つの弧を合わせると、ちょうど円一周ぶんの中心角 $360°$。[円周角] は見込む弧の半分だったから、$\\angle A$ と $\\angle C$ を合わせると、その半分の $180°$ になる。$\\angle A$ が分かっているとき、$\\angle C$ はどこに残る？",
        },
        {
          layer: 3,
          text: "円に内接する四角形の向かい合う角の和は $180°$。$A$ が見る弧と $C$ が見る弧で円を一周（中心角の合計 $360°$）し、[円周角] はその半分だから $\\angle A + \\angle C = 180°$。よって $\\angle C = 180° - 83° = 97°$。角の情報は「弧」を経由して向かいの頂点まで伝わる——これがこの系列ぜんぶの入口。",
        },
      ],
      formulaPreview: "内接四角形 → ∠A + ∠C = 180° → 83° + ∠C = 180° → ∠C = 97°",
      figureMarker: "<<GEO_CYCLIC_QUAD>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円に内接する四角形 $ABCD$ で $\\angle B = 112°$ です。向かい合う角 $\\angle D$ は何度でしょう？",
      answer: 68,
      unit: "",
      unknownLabel: "∠D の大きさ（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。使う関係は同じ「向かい合う角の和は $180°$」。変わったのは、分かっている角が $A$ から $B$ に、聞かれている角が $C$ から $D$ に移っただけ。$B$ と向かい合うのはどの頂点だろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、注目する対角のペアが $A,C$ から $B,D$ に移ったこと。$B$ と $D$ も向かい合っているので、和はやはり $180°$。$\\angle B = 112°$ を入れると？",
        },
        {
          layer: 3,
          text: "前題と同じ $\\angle B + \\angle D = 180°$。$\\angle D = 180° - 112° = 68°$。四角形の対角は $2$ 組（$A$-$C$ と $B$-$D$）あり、どちらの組でも和は $180°$。$\\angle B$ が鈍角なら向かいの $\\angle D$ は鋭角——弧が大きい方を見込む角は大きい。",
        },
      ],
      formulaPreview: "∠B + ∠D = 180° → 112° + ∠D = 180° → ∠D = 68°",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "円に内接する四角形 $ABCD$ で $\\angle A = 83°$ です。辺 $BC$ を $C$ の側へ延ばした半直線上に点 $E$ をとるとき、外角 $\\angle DCE$ は何度でしょう？",
      answer: 83,
      unit: "",
      unknownLabel: "外角 ∠DCE の大きさ（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは四角形の内側の角どうしを見ていた。今度は辺 $BC$ を外へ延ばしてできる外角 $\\angle DCE$。頂点 $C$ の内側の角 $\\angle BCD$ と外角は、$1$ 本の直線の上でどんな関係だろう？ そして内角 $\\angle BCD$ は、前題までのどの角と結びついている？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「内角 $\\angle BCD$ を外角に折り返す」一手だけ。$C$ の内角と外角は一直線で和 $180°$。ところが内角 $\\angle BCD$ は向かいの $\\angle A$ と和 $180°$。$2$ つを見比べると、外角 $\\angle DCE$ と $\\angle A$ はどうなる？",
        },
        {
          layer: 3,
          text: "内角と外角は一直線で $\\angle BCD + \\angle DCE = 180°$。内接四角形の対角で $\\angle A + \\angle BCD = 180°$。この $2$ つから $\\angle DCE = \\angle A = 83°$。つまり **外角は、向かいの内角（内対角）にそのまま等しい**——$2$ 回の $180°$ が打ち消し合って、遠回りせずに角が飛び移る近道が生まれる。",
        },
      ],
      formulaPreview:
        "∠BCD + ∠DCE = 180°・∠A + ∠BCD = 180° → ∠DCE = ∠A = 83°",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "四角形 $ABCD$ で $\\angle A = 97°$ です。この四角形が円に内接するためには、$\\angle C$ は何度でなければならないでしょう？",
      answer: 83,
      unit: "",
      unknownLabel: "内接するための ∠C の大きさ（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までは「円に内接している」と分かった上で角を読んだ。今度は逆で、まだ内接するとは決まっていない。どんな条件がそろえば、この $4$ 点は $1$ つの円の上に乗ると言えるだろう？",
        },
        {
          layer: 2,
          text: "前題までと向きが逆になっただけ。内接する四角形は必ず対角の和が $180°$ だった——その関係を「成り立たせるための $\\angle C$」を求める。$\\angle A = 97°$ のとき、和を $180°$ にする $\\angle C$ は？",
        },
        {
          layer: 3,
          text: "「対角の和が $180°$」は内接する四角形の目印であると同時に、**逆にこの和が $180°$ になれば $4$ 点は同一円周上に乗る**（内接四角形の定理の逆）。だから内接の条件は $\\angle A + \\angle C = 180°$、$\\angle C = 180° - 97° = 83°$。定理を順に読めば角が出て、逆に読めば「円に乗る条件」になる——同じ $1$ つの等式の表と裏。",
        },
      ],
      formulaPreview: "内接の条件 ∠A + ∠C = 180° → 97° + ∠C = 180° → ∠C = 83°",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "円周上の点 $A$ で円に接する接線 $AT$ があり、円周上の別の点 $B$ との間に弦 $AB$ が引かれています。接線と弦のなす角 $\\angle TAB = 64°$ のとき、弦 $AB$ の反対側の弧の上にある点 $P$ から見た円周角 $\\angle APB$ は何度でしょう？",
      answer: 64,
      unit: "",
      unknownLabel: "反対側の円周角 ∠APB の大きさ（度）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは頂点がすべて円周の上にあった。今度は片方の線が円に**接している**——接点 $A$ には、ふつうの意味の [円周角] が作れない。それでも、接線と弦がはさむこの角は、弦の反対側の弧から弦を見込む円周角と、何かつながっていないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、$2$ 本の線の片方が「弦」から「接線」に化けた $1$ 点だけ。接線と弦のなす角は、弦 $AB$ を**反対側の弧から見込む円周角**とぴったり同じ大きさになる（接弦定理）。$\\angle TAB = 64°$ なら $\\angle APB$ は？",
        },
        {
          layer: 3,
          text: "接弦定理：接線と弦 $AB$ のなす角 $\\angle TAB$ は、弦 $AB$ を挟んで反対側の弧にある円周角 $\\angle APB$ に等しい。だから $\\angle APB = \\angle TAB = 64°$。接点 $A$ を、反対側の弧の上を近づいてきた円周角の点が**接点に達した極限**だと思えば、円周角がそのまま接線と弦の角に姿を変える——ここがこの系列の質的な転換点。",
        },
      ],
      formulaPreview: "接弦定理 → ∠APB = ∠TAB = 64°",
      figureMarker: "<<GEO_TANGENT_CHORD>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "円周上の点 $A$ での接線と弦 $AB$ のなす角が $46°$ です。弦 $AB$ の反対側の弧の上にある点から見込む円周角は何度でしょう？",
      answer: 46,
      unit: "",
      unknownLabel: "反対側の円周角の大きさ（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。接弦定理そのものだ。変わったのは角の大きさだけ。接線と弦のなす角が小さくなると、反対側の弧から見込む角はどう動く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、なす角が $64°$ から $46°$ になったこと。接弦定理は等式なので、反対側の円周角も同じだけ変わる。$46°$ ならいくつ？",
        },
        {
          layer: 3,
          text: "接弦定理より、反対側の弧の円周角 $= 46°$。等式なので、なす角が変われば円周角も同じ値で追いかける。ちなみに接線と弦のなす角は**弦のどちら側**を測るかで $2$ 通り（和は $180°$）——$46°$ の相手は反対側の弧、$134°$ の相手はもう一方の弧。次の $2$ 問で、この「相手の弧の取り違え」が落とし穴になる。",
        },
      ],
      formulaPreview: "接弦定理 → 反対側の円周角 = 46°",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "円周上の点 $A$ での接線 $AT$ と弦 $AB$ のなす角 $\\angle TAB = 55°$ です。$AC$ がこの円の直径のとき、$\\angle BAC$ は何度でしょう？",
      answer: 35,
      unit: "",
      unknownLabel: "∠BAC の大きさ（度）",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは接弦定理を $1$ 回使うだけだった。今度は直径 $AC$ が加わっている。直径を弦とみたとき、円周上の点 $B$ から直径を見込む角にはどんな決まった値があっただろう？ そこに接弦定理の情報を重ねると、三角形 $ABC$ の $3$ つの角がそろわないだろうか？",
        },
        {
          layer: 2,
          text: "前題までに増えたのは「直径に対する円周角は直角」という一手だけ。$AC$ が直径だから $\\angle ABC = 90°$。接弦定理で $\\angle ACB$（弦 $AB$ の反対側の円周角）$= \\angle TAB = 55°$。三角形 $ABC$ の内角の和を使えば $\\angle BAC$ が残る。",
        },
        {
          layer: 3,
          text: "$AC$ は直径なので、半円に対する円周角として $\\angle ABC = 90°$。接弦定理から $\\angle ACB = \\angle TAB = 55°$。三角形 $ABC$ で $\\angle BAC = 180° - 90° - 55° = 35°$。接弦定理で作った角と、直径の直角を同じ三角形に持ち込むと、追跡が一気に閉じる——道具を重ねると届く場所が増える。",
        },
      ],
      formulaPreview:
        "∠ABC = 90°（直径）・∠ACB = ∠TAB = 55° → ∠BAC = 180° − 90° − 55° = 35°",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円に内接する三角形 $ABC$ があり、$\\angle BAC = 38°$、$\\angle ABC = 97°$ です。点 $A$ で円に接する接線と、弦 $AB$ のなす角は何度でしょう？",
      answer: 45,
      unit: "",
      unknownLabel: "接線と弦 AB のなす角の大きさ（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "聞かれているのは、接点 $A$ での**接線と弦のなす角**。接点 $A$ にはふつうの [円周角] が作れないから、円周角の定理だけをどうこねても、この角には直接届かない。まず三角形の中で分かる角をそろえてから、接弦定理の橋を渡れないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと違うのは、接線と弦のなす角に等しい円周角が**最初は与えられていない**こと。接弦定理より、接線と弦 $AB$ のなす角は反対側の円周角 $\\angle ACB$ に等しい。その $\\angle ACB$ は、三角形 $ABC$ の残りの角として先に出せる。",
        },
        {
          layer: 3,
          text: "三角形 $ABC$ の内角の和から $\\angle ACB = 180° - 38° - 97° = 45°$。接弦定理より、接線と弦 $AB$ のなす角 $= \\angle ACB = 45°$。接線の角は円周角の定理**だけ**では絶対に結べず、接弦定理が唯一の橋になる——この $1$ 問で、接弦定理が「あると便利」ではなく「なければ届かない」道具だと、はっきり分かる。",
        },
      ],
      formulaPreview:
        "∠ACB = 180° − 38° − 97° = 45° → 接線と弦ABの角 = ∠ACB = 45°",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円に内接する四角形 $ABCD$ があり、点 $A$ で円に接する接線を $AT$ とします。接線と弦 $AB$ のなす角 $\\angle TAB = 55°$、対角線がつくる角 $\\angle BDC = 38°$ のとき、$\\angle ADC$ は何度でしょう？",
      answer: 93,
      unit: "",
      unknownLabel: "∠ADC の大きさ（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "この $1$ 問には、接線・円周角・内接四角形の $3$ つが同居している。$\\angle TAB$ は接弦定理でどの円周角に化けるだろう？ $\\angle BDC$ は弦 $BC$ を見込む円周角として、頂点 $A$ から見た角と結びつかないだろうか？ まず三角形 $ABC$ の角をそろえてから、内接四角形の対角へ渡れるか考えてみよう。",
        },
        {
          layer: 2,
          text: "増えたのは「接弦・円周角・内接四角形を数珠つなぎにする」こと。接弦定理で $\\angle TAB$ は弦 $AB$ の反対側の円周角 $\\angle ACB$ に等しい。$\\angle BDC$ は弦 $BC$ を見込む円周角で $\\angle BAC$ に等しい。$2$ つがそろえば三角形 $ABC$ の $\\angle ABC$ が出て、そこから内接四角形の対角 $\\angle ADC$ へ。",
        },
        {
          layer: 3,
          text: "接弦定理より $\\angle ACB = \\angle TAB = 55°$。同じ弧 $BC$ を見込むので $\\angle BAC = \\angle BDC = 38°$。三角形 $ABC$ で $\\angle ABC = 180° - 55° - 38° = 87°$。$ABCD$ は円に内接するから、向かいの角と和 $180°$ で $\\angle ADC = 180° - 87° = 93°$。接弦 → 円周角 → 三角形 → 内接四角形と、$4$ つの道具を数珠つなぎにして初めて届く角。",
        },
      ],
      formulaPreview:
        "∠ACB = ∠TAB = 55°・∠BAC = ∠BDC = 38° → ∠ABC = 87° → ∠ADC = 180° − 87° = 93°",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$2$ つの円が点 $T$ で接していて、共通の接線を $t$ とします。円 $1$ の上に点 $A$, $B$ が、円 $2$ の上に点 $C$, $D$ があり、$A$, $T$, $C$ は一直線に並んでいます。円 $1$ で $\\angle ABT = 55°$、円 $2$ で $\\angle DTC = 64°$ のとき、$\\angle TCD$ は何度でしょう？",
      answer: 61,
      unit: "",
      unknownLabel: "∠TCD の大きさ（度）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "円が $2$ つあるが、$2$ つをつなぐのは点 $T$ で共通の接線 $t$。円 $1$ の中で $\\angle ABT$ は、接線 $t$ と弦 $TA$ のなす角と結びつかないだろうか？ $A$, $T$, $C$ が一直線なら、接線 $t$ と弦 $TC$ のなす角は、その角とどんな関係になる？ 同じ接線を、$2$ つの円で二度使えないだろうか？",
        },
        {
          layer: 2,
          text: "増えたのは「同じ接線 $t$ を、$2$ つの円それぞれで接弦定理に使う」こと。円 $1$ で $\\angle ABT$ は接線 $t$ と弦 $TA$ のなす角に等しい。$A,T,C$ が一直線だから、接線 $t$ と弦 $TC$ のなす角も同じ。それを円 $2$ の接弦定理に渡すと $\\angle TDC$ が分かり、三角形 $TCD$ が閉じる。",
        },
        {
          layer: 3,
          text: "円 $1$ の接弦定理で、接線 $t$ と弦 $TA$ のなす角 $= \\angle ABT = 55°$。$A,T,C$ は一直線なので、接線 $t$ と弦 $TC$ のなす角も $55°$。円 $2$ の接弦定理で $\\angle TDC = 55°$。三角形 $TCD$ で $\\angle TCD = 180° - 64° - 55° = 61°$。共通接線という $1$ 本の線が、$2$ つの円の間で角を運ぶ渡し板になる——章の道路網が、円をまたいでつながる。",
        },
      ],
      formulaPreview:
        "接弦(円1) t·TA = ∠ABT = 55° → t·TC = 55° → 接弦(円2) ∠TDC = 55° → ∠TCD = 180° − 64° − 55° = 61°",
      figureMarker: "<<GEO_TWO_CIRCLES>>",
    },
  ],
  derivation: `**中心の問い** ｜ 円に内接する四角形の向かい合う角は、なぜ足すと必ず $180°$ なのか？ そして頂点を $1$ つ、接点まで滑らせていくと——その式はどんな姿に変わる？

────────

**対角の和 $180°$ は、弧が円を一周することから生える。**

円に内接する四角形 $ABCD$ で、向かい合う $\\angle A$ と $\\angle C$ を考えます。[円周角] は「見込む弧の半分」でした。$\\angle A$ は弧 $BCD$ を、$\\angle C$ は弧 $BAD$ を見込んでいます。この $2$ つの弧を合わせると、円をちょうど一周——中心角にして $360°$ です。

$$\\angle A + \\angle C = \\frac{1}{2}(\\text{弧 } BCD) + \\frac{1}{2}(\\text{弧 } BAD) = \\frac{1}{2}\\times 360° = 180°$$

覚えるべきは「対角の和 $180°$」という結論ではなく、**$2$ つの角が円を分担して一周ぶんの弧を見込んでいる**という景色です。これさえ思い出せれば、$180°$ はその場で導けます。外角＝内対角（Step 3）も同じ景色の言い換えで、内角と外角の $180°$ と、対角の $180°$ が打ち消し合って、外角が向かいの内角へ飛び移ります。

**逆も同じ等式で読める。** 「対角の和が $180°$」は内接する四角形の目印であると同時に、逆に $4$ 点がこの和を満たせば同一円周上に乗ります（Step 4・内接四角形の定理の逆）。この逆は、点が円の内・外にずれた場合に外角の大小で矛盾が出ることから示せます（本文は「集合と論理」の章を引いて、ある命題とその逆は別物だと注意しています）。

<<GEO_CYCLIC_QUAD>>

**接弦定理は、その四角形の「極限」として現れる。**

接線と弦のなす角＝反対側の弧の [円周角]（Step 5）。これは天下り式に覚える公式ではなく、$2$ つの道から生えます。

$1$ つ目は**直径からの出発**。弦 $AB$ の代わりにまず直径 $AC$ を引くと、接線は半径（直径）に垂直なので、接線と直径のなす角は $90°$。直径に対する円周角も $90°$。ここから点を動かして弦を一般の位置に倒していくと、両方の角が同じだけ変化して、つねに等しく保たれます。

$2$ つ目が**内接四角形の極限**という景色です。円に内接する四角形 $ABCP$ で、頂点 $C$ を弧に沿って $A$ の側へ滑らせていくと想像してください。$C$ が接点 $A$ に達した瞬間、辺 $CA$ は点 $A$ での接線に化けます。内接四角形で成り立っていた「外角＝内対角」の等式は、この極限でそのまま生き残り、**接線と弦のなす角＝反対側の円周角**という接弦定理になります。対角の和 $180°$ と接弦定理は、別々の定理ではなく、$1$ つの等式が連続変形でつながった家族なのです。

**間違えやすいのは、接弦定理の「相手の弧」。**

接線と弦のなす角は、弦のどちら側を測るかで $2$ 通りあり、和は $180°$（Step 6）。$64°$ の相手は弦の**反対側**の弧の円周角、もう一方の $116°$ の相手はこちら側の弧の円周角です。「接線と弦のはさむ角の中にある弧」を見込む円周角が相手——ここを取り違えると、答えが補角になってすり替わります。見分けの合言葉は「なす角がふところに抱えている弧を探し、その弧を向こう岸から見ている点が相手」。Step 8 のように接点で円周角が作れない配置では、接弦定理だけが唯一の橋なので、相手の弧の選び方がそのまま正誤を分けます。まず三角形の中で分かる角をそろえ、接弦定理で接線の角へ最後に渡す——この順番を守れば、接点の角にも確実に手が届きます。

────────

**もっと深く**

**接線⊥半径という、もう $1$ つの道。** 接弦定理は「接線は接点で半径に垂直」という事実からも導けます。数Ⅱ「図形と方程式」では、円 $x^2 + y^2 = r^2$ 上の点 $(x_0, y_0)$ での接線が $x_0 x + y_0 y = r^2$ と座標の式で書け、その傾きが半径の傾きと積 $-1$（垂直）になることを計算だけで確かめられます。今回は弧と角で見た同じ接線を、数Ⅱでは座標という別の道から捉え直します（$\\to$ 数Ⅱ 円の接線）。$2$ 円が接する Step 10 の配置も、座標に置けば「共通接線」が $1$ 本の直線の方程式として現れます。

**捨てているのは「弧のどちら側か」以外の情報。** 対角の和も接弦定理も、角の大きさが**見込む弧の大きさだけ**で決まり、点が弧のどこにいるか（正確な位置）は捨てられています。だから同じ弧の上でなら点を自由に滑らせてよく、その自由さが「接点までの極限」を許します。何が残り何が捨てられているかを意識すると、動かしてよい点と固定すべき弧が見分けられます。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（内接四角形の定理・接弦定理）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

対角の和が $180°$ なのは、向かい合う $2$ つの角が**弧を分担して円を一周ぶん見込む**から。そして四角形の頂点を接点まで滑らせる連続変形をたどると、その等式は姿を変えて接弦定理になります。定理は在庫として覚えるものではなく、$1$ つの景色（弧が角を決める・頂点を動かしても等式は生き残る）から生やす手つき——だから忘れても、弧の一周と極限の一歩から再建できます。この連続変形の目は、次の「方べきの定理」で、点と円のあいだに潜む不変量へと受け継がれます。`,
};

/** GEO7: 方べきの定理（点と円の間に潜む、引き方によらない積の不変量）。 */
export const GEO_POWER_SERIES: LearnerSeries = {
  id: "geo_power_01",
  title: "方べきの定理",
  subtitle:
    "数Ⅰ・A 図形の性質より — $1$ つの点から円へ引いた $2$ 直線の、交点までの距離の積は引き方によらず一定。内でも外でも接しても同じ式で $10$ 問。",
  patternId: "GEO7",
  unit: "algebra_1",
  revelationLabel:
    "点と円の間には、引き方によらない積が隠れている——円周角がつくる相似が、$PA \\cdot PB$ を一定に保つ",
  drivingQuestion:
    "$1$ つの点から円へ、どんな向きに直線を引いても、$2$ つの交点までの距離の**積**が変わらないのはなぜ？ 点が円の内でも外でも、直線が接していても、同じ $1$ 本の式になる。",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "円の内部の点 $P$ で、$2$ 本の弦 $AB$ と $CD$ が交わっています。$PA = 4$、$PB = 6$、$PC = 5$ のとき、$PD$ の長さはいくつでしょう？",
      answer: 24 / 5,
      answerDisplay: "24/5",
      unit: "",
      unknownLabel: "PD の長さ",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "円の中で $2$ 本の弦が交わると、[円周角] の定理から等しい角の組が生まれる。$P$ を頂点にして向かい合う $2$ つの三角形（$PAC$ と $PDB$）を見くらべてみよう——同じ弧を見込む円周角として、等しくなりそうな角はどこにある？ もし $2$ つの三角形が同じ形（相似）だと分かれば、辺の長さの間にはどんな関係が言えそう？",
        },
        {
          layer: 2,
          text: "三角形 $PAC$ と三角形 $PDB$ は相似——だから対応する辺の比が等しく、それを整理すると「$P$ からの $2$ つの距離の積」が、どちらの弦でも等しくなる。$PA$ と $PB$ の積を、$PC$ と $PD$ の積に等しいと置くと？",
        },
        {
          layer: 3,
          text: "弦 $AB$、$CD$ が $P$ で交わるとき $PA \\cdot PB = PC \\cdot PD$。$4 \\cdot 6 = 5 \\cdot PD$ だから $PD = \\dfrac{24}{5}$。向きの違う $2$ 本の弦なのに、$P$ からの距離の積はぴったり同じ $24$——この「引き方によらない積」が、この系列ぜんぶの主役になる。",
        },
      ],
      formulaPreview: "PA·PB = PC·PD → 4·6 = 5·PD → PD = 24/5",
      figureMarker: "<<GEO_POWER_IN>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "円の内部の点 $P$ で $2$ 本の弦 $AB$、$CD$ が交わっています。$PA = 3$、$PB = 6$、$PC = 4$ のとき、$PD$ はいくつでしょう？",
      answer: 9 / 2,
      answerDisplay: "9/2",
      unit: "",
      unknownLabel: "PD の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$P$ からの距離の積が、どちらの弦でも等しい」。変わったのは値だけ。どの積とどの積を等しいと置けばよかった？",
        },
        {
          layer: 2,
          text: "前題と変わったのは数字だけ。$PA$ と $PB$ の積を先に出して、それを $PC$ と $PD$ の積に等しいと置くと？",
        },
        {
          layer: 3,
          text: "前題と同じ $PA \\cdot PB = PC \\cdot PD$。$3 \\cdot 6 = 4 \\cdot PD$ だから $PD = \\dfrac{18}{4} = \\dfrac{9}{2}$。積 $18$ が、向きの違う弦の間で保存されている——不変量は値を変えても同じ形で効く。",
        },
      ],
      formulaPreview: "PA·PB = PC·PD → 3·6 = 4·PD → PD = 9/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "円の内部の点 $P$ で $2$ 本の弦 $AB$、$CD$ が交わっています。弦 $AB$ の側は $PA = 4$、$PB = 9$ です。弦 $CD$ の側は、短い方 $PC$ より長い方 $PD$ がちょうど $9$ だけ長い（$PD = PC + 9$）とき、$PC$ の長さはいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "PC の長さ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは片方の弦の $2$ つの距離が両方分かっていた。今度は $CD$ 側が「$PC$ と、それより $9$ 長い $PD$」という形でしか分かっていない。同じ「積が等しい」関係を、$PC$ を求める向きに読めないだろうか——分からない長さを文字だと思って積を組むと、どんな式になりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞かれている側が「積」でなく「積になる前の $1$ つの長さ」になったこと。$PC$ を文字でおくと $PD$ はそれより $9$ 長い。この $2$ つの積を、$PA$ と $PB$ の積に等しいと置くと、文字についての方程式になる。",
        },
        {
          layer: 3,
          text: "$PC = x$ とおくと $PD = x + 9$。$PA \\cdot PB = PC \\cdot PD$ より $4 \\cdot 9 = x(x + 9)$、つまり $x^2 + 9x - 36 = 0$。因数分解して $(x - 3)(x + 12) = 0$ だから $x = 3$ または $x = -12$。長さは負にならないので $x = -12$ は捨てて $PC = 3$（このとき $PD = 12$、積は $36$ で一致）。不変量の式を逆に読むと、$2$ 次方程式が現れる——数と式で学んだ道具がここで効く。",
        },
      ],
      formulaPreview: "4·9 = x(x+9) → x²+9x−36 = 0 → (x−3)(x+12)=0 → x=3（x=−12 は棄却）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "円の**外部**の点 $P$ から $2$ 本の直線を引きます。$1$ 本目は円と手前で $A$、奥で $B$ に交わり、$PA = 5$、円が切り取る弦 $AB = 3$ です。$2$ 本目は手前で $C$、奥で $D$ に交わり、$PC = 4$ のとき、$PD$ はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "PD の長さ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までは点 $P$ が円の**中**にあった。今度は $P$ が円の**外**にあって、そこから引いた直線は円を $2$ 回つらぬく。かけ合わせるのは何と何だっただろう——「$P$ から手前の交点まで」と「$P$ から奥の交点まで」の $2$ つの距離だ。ここで気をつけたいのは、$1$ 本目に与えられているのが「弦 $AB$ の長さ」であって「$P$ から奥までの距離」ではないこと。奥の交点 $B$ までは、$P$ からどれだけ離れている？",
        },
        {
          layer: 2,
          text: "前題と変わったのは点 $P$ が円の外に出たこと。式の形は同じで、かけるのはどちらも「$P$ からの距離」どうし。$1$ 本目は $PA$ と弦 $AB$ を足せば奥までの距離 $PB$ になる。それを使って積を作り、$2$ 本目の積に等しいと置くと？",
        },
        {
          layer: 3,
          text: "外部の点でも $PA \\cdot PB = PC \\cdot PD$。ただし $PB$ は弦の長さではなく「$P$ から奥の交点まで」で、$PB = PA + AB = 5 + 3 = 8$。だから $5 \\cdot 8 = 4 \\cdot PD$ となり $PD = 10$。**ここが定番のつまずき**——かけ算されるのは「$P$ からの距離」であって、円が切り取る弦の長さ $AB$ ではない。$5 \\cdot 3 = 15$ としてしまうと、まったく別の値になる。点が内から外へ移っても、かけるものが「$P$ からの $2$ 距離」であることは変わらない。",
        },
      ],
      formulaPreview: "PB = PA + AB = 5+3 = 8 → PA·PB = PC·PD → 5·8 = 4·PD → PD = 10",
      figureMarker: "<<GEO_POWER_OUT>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "円の外部の点 $P$ から $2$ 本の直線を引きます。$1$ 本目は手前で $A$、奥で $B$ に交わり、$PA = 6$、弦 $AB = 3$ です。$2$ 本目は手前で $C$、奥で $D$ に交わり $PC = 4$ のとき、$PD$ はいくつでしょう？",
      answer: 27 / 2,
      answerDisplay: "27/2",
      unit: "",
      unknownLabel: "PD の長さ",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。点 $P$ が円の外にある形はそのまま。変わったのは値だけ。$1$ 本目で「$P$ から奥まで」の距離を作るとき、前題でどんな取り違えに気をつけた？",
        },
        {
          layer: 2,
          text: "前題と変わったのは数字だけ。$PB$ は弦 $AB$ そのものではなく、$PA$ と $AB$ を合わせた「奥までの距離」。それで積を作り、$2$ 本目の積と等しいと置くと？",
        },
        {
          layer: 3,
          text: "$PB = PA + AB = 6 + 3 = 9$。$PA \\cdot PB = PC \\cdot PD$ より $6 \\cdot 9 = 4 \\cdot PD$ だから $PD = \\dfrac{54}{4} = \\dfrac{27}{2}$。前題で名指しした「弦の長さと距離の取り違え」を避ければ、外部の点でも手が自動で動く。",
        },
      ],
      formulaPreview: "PB = 6+3 = 9 → 6·9 = 4·PD → PD = 27/2",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "円の外部の点 $P$ から、円に**接する**直線（接点 $T$）と、円を $2$ 回つらぬく直線を引きます。つらぬく方は手前で $A$、奥で $B$ に交わり $PA = 3$、$PB = 8$ です。接線の長さ $PT$ はいくつでしょう？",
      answer: 2 * Math.sqrt(6),
      answerDisplay: "2√6",
      inputAffordances: ["sqrt"],
      unit: "",
      unknownLabel: "PT の長さ",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは、円の外の点から引いた $2$ 直線がどちらも円を $2$ 回つらぬいていた。今度は片方が円に**接している**——接点 $T$ で、$2$ つの交点が $1$ 点に重なったと思ってみよう。「手前の交点」も「奥の交点」も同じ $T$ になったら、$2$ つの距離の積はどんな形になりそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、片方の直線の $2$ 交点が接点 $T$ に重なったこと。だから接線側の「積」は $PT$ と $PT$ の積、すなわち $PT$ の平方になる。それをつらぬく方の積 $PA \\cdot PB$ と等しいと置くと、$PT$ はどう求まる？",
        },
        {
          layer: 3,
          text: "接する場合は $PT^2 = PA \\cdot PB$。接点では手前と奥の交点が重なるので、積が「同じ距離どうし」＝平方になる。$PT^2 = 3 \\cdot 8 = 24$ だから $PT = \\sqrt{24} = 2\\sqrt{6}$。割り切れない平方根も、そのままの形（$2\\sqrt6$）で答える。接線は「つらぬく直線の極限」——$2$ つの交点が近づいて重なった姿として、同じ不変量の式に収まる。",
        },
      ],
      formulaPreview: "PT² = PA·PB → PT² = 3·8 = 24 → PT = 2√6",
      figureMarker: "<<GEO_POWER_TANGENT>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2$ つの円が $2$ 点 $A$、$B$ で交わっています。直線 $AB$ を $A$ の側へ延ばした上に点 $P$ をとり、$PA = 3$、$PB = 12$ です。この $P$ から片方の円に引いた接線の長さ $PT$ と、もう片方の円に引いた接線の長さ $PS$ について、$PT$ はいくつでしょう？（$PS$ も同じ値になります）",
      answer: 6,
      unit: "",
      unknownLabel: "PT の長さ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題で「接線の長さの平方＝つらぬく直線の積」を見た。今度は円が $2$ つあって、共有点 $A$、$B$ を結ぶ直線の上に $P$ がある。$P$ から見ると、直線 $AB$ はどちらの円もつらぬく共通の割線になっている——それぞれの円で「$P$ からの積」を作ると、使う長さは同じ $PA$ と $PB$ になっていないだろうか？",
        },
        {
          layer: 2,
          text: "前題に $1$ つ足されたのは「円が $2$ つある」こと。でも直線 $AB$ はどちらの円も $A$、$B$ でつらぬくので、$P$ から見た積 $PA \\cdot PB$ は両方の円で共通。だから接線の平方も両方で等しくなり、$PT$ と $PS$ は同じ長さ。片方の $PT$ を出せば足りる。",
        },
        {
          layer: 3,
          text: "片方の円で $PT^2 = PA \\cdot PB = 3 \\cdot 12 = 36$、もう片方でも同じ $A$、$B$ を通るから $PS^2 = PA \\cdot PB = 36$。よって $PT = PS = \\sqrt{36} = 6$。共有点を結ぶ直線上の点からは、$2$ つの円への接線の長さが必ず等しくなる——「接線の長さが等しい」という証明が、方べきの積が共通であることに折りたためる。",
        },
      ],
      formulaPreview: "PT² = PS² = PA·PB = 3·12 = 36 → PT = PS = 6",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "円の外部の点 $P$ から接線を引くと、接点までの長さは $PT = 6$ でした。同じ $P$ から円を $2$ 回つらぬく直線を引くと、手前の交点 $A$ までが $PA = 4$ です。この直線が円から切り取る弦 $AB$ の長さはいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "弦 AB の長さ",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "円の中心も半径も分かっていないので、三平方の定理や相似だけで弦を出そうとしても手がかりが足りない。でも接線の長さ $PT$ と、割線の手前 $PA$ は分かっている。この $2$ つを結ぶ橋——接する場合と、つらぬく場合をつなぐ関係——を使えないだろうか。まず「$P$ から奥の交点まで」が言えたら、弦はそこからどう出る？",
        },
        {
          layer: 2,
          text: "前題までの道具を組み合わせる。接線と割線の間には $PT^2 = PA \\cdot PB$ が成り立つので、まず奥までの距離 $PB$ が出せる。弦 $AB$ は「奥まで」から「手前まで」を除いた分——$PB$ と $PA$ の差。",
        },
        {
          layer: 3,
          text: "接線・割線の方べきから $PT^2 = PA \\cdot PB$、すなわち $36 = 4 \\cdot PB$ なので $PB = 9$。弦は $P$ から奥までと手前までの差だから $AB = PB - PA = 9 - 4 = 5$。中心も半径も使わずに弦の長さが決まった——方べきだけが届く道。ここでも積を作るのは「$P$ からの距離」で、$PT$ は接点までの距離であることに注意。",
        },
      ],
      formulaPreview: "PT² = PA·PB → 36 = 4·PB → PB = 9 → AB = PB−PA = 9−4 = 5",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "円の内部の点 $P$ で $2$ 本の弦 $AB$、$CD$ が交わっています。$PA = 4$、$PB = 9$、$PC = 8$ です。さらに、弦の端どうしを結んだ線分 $AC = 6$ のとき、線分 $DB$ の長さはいくつでしょう？",
      answer: 27 / 4,
      answerDisplay: "27/4",
      unit: "",
      unknownLabel: "DB の長さ",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "この問題は $2$ つの道で同じ答えに着ける。$1$ つは方べきで残りの距離 $PD$ を出す道。もう $1$ つは、$P$ を頂点に向かい合う三角形 $PAC$ と $PDB$ が [円周角] の等しさから相似になることを使う道。相似が言えれば、$AC$ と $DB$ の比は他の辺の比とどうつながる？ $2$ つの道が同じ値に落ち合えば、答えは確かめ済みになる。",
        },
        {
          layer: 2,
          text: "前題までと違うのは、聞かれているのが弦の端どうしを結んだ線分 $DB$ だということ。三角形 $PAC$ と三角形 $PDB$ は相似（$P$ での対頂角と、同じ弧を見込む円周角）。対応する辺の比 $AC : DB$ は、$PA : PD$ や $PC : PB$ と等しい。方べきで $PD$ を出しておけば、比から $DB$ が言える。",
        },
        {
          layer: 3,
          text: "**道1（方べき→相似）**：$PA \\cdot PB = PC \\cdot PD$ より $4 \\cdot 9 = 8 \\cdot PD$ で $PD = \\dfrac{9}{2}$。相似 $\\triangle PAC \\sim \\triangle PDB$ から $\\dfrac{AC}{DB} = \\dfrac{PA}{PD} = \\dfrac{4}{9/2} = \\dfrac{8}{9}$、よって $DB = 6 \\cdot \\dfrac{9}{8} = \\dfrac{27}{4}$。**道2（相似だけ）**：同じ相似の比 $\\dfrac{AC}{DB} = \\dfrac{PC}{PB} = \\dfrac{8}{9}$ を使えば、$PD$ を出さずに直接 $DB = \\dfrac{27}{4}$。$2$ つの道が同じ $\\dfrac{27}{4}$ に落ち合う——方べきの積と、それを生んだ相似は、同じ事実の $2$ つの顔。",
        },
      ],
      formulaPreview: "△PAC∽△PDB → AC:DB = PA:PD = PC:PB = 8:9 → DB = 6·9/8 = 27/4",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 $ABC$ で $AB = 6$、$AC = 10$ です。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $D$ とします。また、$2$ 点 $B$、$C$ を通る円が辺 $AB$ と再び点 $E$ で交わり、頂点 $A$ からこの円へ引いた接線の長さは $2\\sqrt{6}$ です。直線 $ED$ と、辺 $AC$ を $C$ の側へ延ばした直線との交点を $F$ とするとき、比 $CF : FA$ を分数 $\\dfrac{CF}{FA}$ の値で答えましょう。",
      answer: 5 / 6,
      answerDisplay: "5/6",
      unit: "",
      unknownLabel: "CF:FA（分数 CF/FA で）",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "この $1$ 問は、章で通ってきた $3$ つの道具が順につながる総決算。まず [角の二等分線] は $BC$ をとなりの $2$ 辺の比に切る（$BD : DC$ が言える）。次に $A$ から円への接線と、$A$ を通る割線 $AB$ に方べきを使うと、$E$ の位置（$AE$ や $BE$）が言える。最後に、三角形を横切る直線 $ED$ に [メネラウスの定理] を当てると、残りの比 $CF : FA$ が縛られる。どの順に手をつなげば $F$ の比まで届く？",
        },
        {
          layer: 2,
          text: "前題までの単発の方べきと違い、$3$ つの道具を鎖にする。$(1)$ 二等分線で $BD : DC$、$(2)$ 接線の長さの平方が $A$ の方べき $AE \\cdot AB$ に等しいことから $AE$（と $BE$）、$(3)$ この $2$ つの比を持って、直線 $E$-$D$-$F$ に対するメネラウスの式を組む。順に埋めれば $CF : FA$ が残る。",
        },
        {
          layer: 3,
          text: "**二等分線**：$BD : DC = AB : AC = 6 : 10 = 3 : 5$。**方べき**：$A$ からの接線長 $2\\sqrt6$ より $A$ のべきは $(2\\sqrt6)^2 = 24$。割線 $AB$ は円と $E$、$B$ で交わるので $AE \\cdot AB = 24$、$AE = \\dfrac{24}{6} = 4$、$BE = AB - AE = 2$。**メネラウス**（三角形 $ABC$ を直線 $E$-$D$-$F$ が横切る）：$\\dfrac{AE}{EB} \\cdot \\dfrac{BD}{DC} \\cdot \\dfrac{CF}{FA} = 1$ より $\\dfrac{4}{2} \\cdot \\dfrac{3}{5} \\cdot \\dfrac{CF}{FA} = 1$、よって $\\dfrac{CF}{FA} = \\dfrac{5}{6}$。角の情報が辺の比になり（二等分線）、点と円の積が長さになり（方べき）、一周の型が最後の比を決める（メネラウス）——章の道具がひと続きの鎖として動いた。",
        },
      ],
      formulaPreview:
        "BD:DC = 3:5・AE·AB = 24 → AE=4,BE=2・(AE/EB)(BD/DC)(CF/FA)=1 → CF/FA = 5/6",
    },
  ],
  derivation: `**中心の問い** ｜ $1$ つの点から円へ、どんな向きに直線を引いても、$2$ つの交点までの距離の**積**が変わらないのはなぜ？ 点が円の内でも外でも、直線が接していても、同じ $1$ 本の式になる。

────────

**定理そのものは $1$ 行で書ける。**

点 $P$ を通る $2$ 直線が円と交わる点を、$1$ 本目が $A$, $B$、$2$ 本目が $C$, $D$ とすると：

$$PA \\cdot PB = PC \\cdot PD$$

$P$ が円の内側なら $2$ 弦の交点、外側なら $2$ 割線の始点。どちらでも同じ式で、引く向きをどう変えてもこの積は動きません。「向き」という情報を捨てて、「積」という数だけが残る——それが方べきの正体です。

<<GEO_POWER_IN>>

**積が保たれる理由は、円周角がつくる相似。**

なぜ積が一定なのか。鍵は [円周角] の定理です。$P$ を頂点に向かい合う $2$ つの三角形 $PAC$ と $PDB$ を見ます（外部の点なら $PAC$ と $PDB$ が同じ側に開きます）。

- $\\angle APC = \\angle DPB$（内部なら対頂角、外部なら共通の角で、同じ角）
- $\\angle PAC = \\angle PDB$（弦 $CB$ を同じ側から見込む円周角。内接四角形の場合は「外角＝内対角」から同じ結論）

$2$ 角が等しいので $\\triangle PAC \\sim \\triangle PDB$。対応する辺の比から $\\dfrac{PA}{PD} = \\dfrac{PC}{PB}$、たすきに掛けて $PA \\cdot PB = PC \\cdot PD$。**証明の手順は、$P$ が円の内でも外でもまったく同じ**——見込む角が円周角のままだからです。忘れても、「向かい合う三角形の相似を円周角から言う」ところから再建できます。

**接する場合は、交点が重なった極限（Step 6）**

$1$ 本を接線にすると、手前の交点と奥の交点が接点 $T$ に重なります。積 $PA \\cdot PB$ が「同じ距離どうし」になり：

$$PT^2 = PA \\cdot PB$$

接線は「割線の極限」。$\\triangle PTA \\sim \\triangle PBT$（接弦定理で $\\angle PTA = \\angle PBT$）から同じように出ます。

**間違えやすいのは、かけ算する相手（Step 4）。**

外部の点で、$PA \\cdot PB$ の $PB$ を「円が切り取る弦 $AB$」と取り違える誤りが定番です。**かけ算されるのは、あくまで「$P$ からの距離」**——$P$ から手前の交点までと、$P$ から奥の交点まで。奥までの距離は $PB = PA + AB$ であって、弦 $AB$ そのものではありません。相似の式に現れるのが $PA$ と $PB$（どちらも $P$ が端）だから、と理由まで戻れば取り違えは起きません。

**向きを捨てて、積だけが残る。**

$2$ 弦の交わる角度をどう変えても、$PA \\cdot PB$ は同じ値のまま。方べきが運ぶのは「$P$ と円の隔たり」という $1$ つの数だけで、直線の向きや弦の長さといった情報は捨てられています。だからこの積は、点 $P$ が円からどれだけ離れているか（点のべき）を測る物差しになります。

────────

**もっと深く**

**逆から見れば、共円の判定になる。** ここまでは「$4$ 点が同じ円の上にある」ことから積の等式を導きました。逆に、$2$ 直線の交点 $P$ について $PA \\cdot PB = PC \\cdot PD$ が成り立てば、$4$ 点 $A$, $B$, $C$, $D$ は同一円周上にある——方べきの定理の逆です。円周角の定理の逆（同じ弧を見込む角が等しければ共円）と同じ発想で、積の等式が「バラバラの $4$ 点が $1$ つの円に乗る」ことの証拠になります。定理は順に読めば長さを求め、逆に読めば図形の性質を判定する。

**$2$ つの円と、等しい接線（Step 7）。** $2$ 円の共有点 $A$, $B$ を結ぶ直線上の点 $P$ からは、両方の円への接線の長さが等しくなります（どちらも $PT^2 = PA \\cdot PB$）。「接線が等しい」という証明問題が、共通の積へ折りたたまれる——これは $2$ 円の共通接線や根軸（$2$ 円へのべきが等しい点の集まり）の話へつながります。

**数Ⅱ「図形と方程式」への橋。** 点 $P$ の「べき」$PA \\cdot PB$ は、円の方程式 $x^2 + y^2 + \\ell x + m y + n = 0$ に $P$ の座標を代入した値と一致します。方べきの定理は、座標を使わずに見抜いた「点のべき」——数Ⅱで円と直線を式で追うとき、同じ量が計算からも現れます。

**章の総決算として（Step 10）。** 方べきは、角の二等分線（角→比）・チェバとメネラウス（一周の比）・円周角と内接四角形（弧→角→相似）——この章のすべての道具が合流する終点です。$1$ つの点と $1$ つの円の間に、引き方によらない不変量が $1$ つ潜んでいる。それを見つけて未知を決める、というのが図形の性質の章がたどり着く景色です。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第8章 図形の性質（方べきの定理・応用問題）の構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

引き方を変えても $PA \\cdot PB$ が動かないのは、**どの引き方でも同じ円周角が同じ相似をつくり、その相似が積を等号で縛る**から。点が内でも外でも証明の手順が変わらないのは、支えている角がずっと円周角だからです。方べきとは、点と円の間に隠れた $1$ つの不変量——向きの情報を捨てて、隔たりだけを残した数。図形の量が定理という道を通って伝わる、この章の旅の終着点です。`,
};

/** 図形の性質ユニットの全系列（全7系列・池田本第8章の節順）。 */
export const GEOMETRY_SERIES_LIST: LearnerSeries[] = [
  GEO_BISECTOR_SERIES,
  GEO_CEVA_SERIES,
  GEO_MENELAUS_SERIES,
  GEO_CENTERS_SERIES,
  GEO_INSCRIBED_SERIES,
  GEO_CYCLIC_TANGENT_SERIES,
  GEO_POWER_SERIES,
];
