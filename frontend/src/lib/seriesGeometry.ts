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

/** 図形の性質ユニットの全系列（系列2〜7 は委譲実装後に追加）。 */
export const GEOMETRY_SERIES_LIST: LearnerSeries[] = [GEO_BISECTOR_SERIES];
