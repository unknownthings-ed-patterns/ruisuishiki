/**
 * 小学校5年生・東京書籍「新しい算数 5」教科書順カタログ。
 *
 * 4月の最初の単元から3月の最後まで、教科書順に系列を並べる。
 * 復習にも予習にも使えるよう、各単元を一通り網羅する。
 *
 * 15単元（「グラフ」「展開図」はスキップ）。
 * 「合同」は、対応する辺・角を読む試作系列として追加。
 */

import type { LearnerSeries } from "./types";

/* ===== 1. 整数と小数（×10, ÷10 の関係） ===== */

export const E5_DECIMAL_PLACE_SERIES: LearnerSeries = {
  id: "e5_decimal_place_01",
  title: "整数と小数（位の関係）",
  subtitle:
    "小数を10倍・100倍したり、10で割ったりする5問。位がずれる仕組み。",
  patternId: "EL1",
  unit: "elementary_5",
  revelationLabel: "10倍ごとに小数点は1つ右へ、÷10ごとに1つ左へ",
  derivation: `**「位（くらい）」の正体は 10 倍ずつ**

普段使っている数 $1234$ は、実は：

$$1234 = 1000 + 200 + 30 + 4 = 1 \\times 1000 + 2 \\times 100 + 3 \\times 10 + 4 \\times 1$$

千の位、百の位、十の位、一の位——どの位も、隣の位の **10 倍** になっています。

**小数も同じ仕組み**

小数点より右も同じ規則です：

$$0.567 = 5 \\times 0.1 + 6 \\times 0.01 + 7 \\times 0.001$$

| 位 | 値 |
|---|---|
| 千の位 | 1000 |
| 百の位 | 100 |
| 十の位 | 10 |
| 一の位 | 1 |
| 小数第 1 位 | 0.1 |
| 小数第 2 位 | 0.01 |
| 小数第 3 位 | 0.001 |

「**右に行くと 10 分の 1、左に行くと 10 倍**」——これが 10 進法の世界。

**10 倍するとどうなるか**

数を 10 倍するということは、「**すべての位を 1 つ左に動かす**」こと。

$$2.3 \\times 10 = 23$$

見た目には「**小数点が 1 つ右にずれる**」ように見えますが、実際には数字そのものが左に動いている——どちらで考えても結果は同じ。

100 倍なら 2 つ動かす：

$$2.3 \\times 100 = 230$$

**10 で割るとどうなるか**

逆に、10 で割るということは「**すべての位を 1 つ右に動かす**」こと。小数点は **1 つ左にずれる**：

$$45 \\div 10 = 4.5$$

**0 をつけて場所を確保する**

たとえば $23 \\div 100$ は、$0.23$ になります。$23$ の数字を 2 つ右にずらすと、一の位より左に何もないので、**0 を補って** 表現する必要があります：

$$23 \\to 2.3 \\to 0.23$$

**位の関係 = 10 進法の本質**

10 進法のすべての計算（足し算・引き算・掛け算・割り算）が、この **位の関係** の上に成り立っています。

- **筆算** は、位を揃えて計算する作業
- **繰り上がり・繰り下がり** は、10 個たまったら次の位へ行く・次の位から借りる
- **小数点の移動** は、10 倍や 10 で割る操作

**他の進法もある**

10 進法は **10 ずつ束ねる** 方式ですが、他にも：

- **2 進法**：2 ずつ束ねる（コンピュータが使う）
- **60 進法**：60 ずつ束ねる（時間・角度）
- **16 進法**：16 ずつ束ねる（プログラミングで使う）

人類は古代から、**ある数で束ねて位を作る** という発想で大きな数を扱ってきました。10 進法はおそらく「指が 10 本」だから生まれたと言われています。

**「10 倍ごとに小数点が 1 つずれる」のなぜ**

公式の答え：**10 進法では、隣の位が必ず 10 倍だから**。

これは「**位取り記数法**」というアイデアの真髄。たった 0 から 9 までの 10 種類の数字で、無限の大きさ（と小ささ）の数を表せます——これは人類の数学史でも最高峰の発明です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "2.3 を 10 倍するといくつになるでしょう？",
      answer: 23, unit: "", unknownLabel: "答え",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "10 倍すると、小数点は 1 つ右にずれる。" },
        { layer: 2, text: "2.3 → 23.0。" },
        { layer: 3, text: "23。" },
      ],
      formulaPreview: "2.3 × 10 = 23",
    },
    {
      id: "step2", position: 2,
      questionText: "4.5 を 10 倍するといくつになるでしょう？",
      answer: 45, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と同じ。" },
        { layer: 2, text: "4.5 → 45.0。" },
        { layer: 3, text: "45。" },
      ],
      formulaPreview: "4.5 × 10 = 45",
    },
    {
      id: "step3", position: 3,
      questionText: "2.3 を 100 倍するといくつになるでしょう？",
      answer: 230, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "100 倍は「10 倍 × 10 倍」。小数点は 2 つ右へ。" },
        { layer: 2, text: "2.3 → 230.0。" },
        { layer: 3, text: "230。" },
      ],
      formulaPreview: "2.3 × 100 = 230",
    },
    {
      id: "step4", position: 4,
      questionText: "45 を 10 で割るといくつになるでしょう？",
      answer: 4.5, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "今度は逆。10 で割ると、小数点は 1 つ左へ。" },
        { layer: 2, text: "45 → 4.5。" },
        { layer: 3, text: "4.5。" },
      ],
      formulaPreview: "45 ÷ 10 = 4.5",
    },
    {
      id: "step5", position: 5,
      questionText: "230 を 100 で割るといくつになるでしょう？",
      answer: 2.3, unit: "", unknownLabel: "答え",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "100 で割ると、小数点は 2 つ左へ。" },
        { layer: 2, text: "230 → 2.30。" },
        { layer: 3, text: "2.3。" },
      ],
      formulaPreview: "230 ÷ 100 = 2.3",
    },
  ],
};

/* ===== 2. 直方体の体積 ===== */

export const E5_VOLUME_SERIES: LearnerSeries = {
  id: "e5_volume_01",
  title: "直方体の体積",
  subtitle: "縦・横・高さから直方体の体積を求める5問。",
  patternId: "EL2",
  unit: "elementary_5",
  revelationLabel: "体積 = 縦 × 横 × 高さ",
  derivation: `**体積は「1 cm³ のブロックが何個入るか」**

直方体の体積：

$$\\text{体積} = \\text{縦} \\times \\text{横} \\times \\text{高さ}$$

これは「**1 cm³ の立方体（小さなサイコロ）が何個入るか**」を数えていると考えると、すぐに納得できます。

**なぜ 3 つ掛けるのか**

縦 2 cm、横 3 cm、高さ 2 cm の直方体を考えます（下の図）。

<<CUBOID>>

- まず床に「縦 2 × 横 3」の長方形が並ぶ → **6 個** の 1 cm³ ブロックが敷ける
- これを高さ 2 cm 積み上げる → **2 層**
- 合計 $6 \\times 2 = 12$ 個

「**底面に並ぶブロックの数 × 段数**」が体積の正体。

底面の数は「縦 × 横」、段数は「高さ」だから、結局：

$$\\text{体積} = \\text{縦} \\times \\text{横} \\times \\text{高さ}$$

**底面積 × 高さ という見方**

「縦 × 横」は **底面の面積**。だから：

$$\\text{体積} = \\text{底面積} \\times \\text{高さ}$$

この見方は、**直方体だけでなく、他の柱体（四角柱・三角柱・円柱）にも通じる** 一般原理です。

**他の柱体の体積**

| 形 | 体積 |
|---|---|
| 直方体 | 縦 × 横 × 高さ |
| 四角柱 | 底面積 × 高さ |
| 三角柱 | 底面の三角形の面積 × 高さ |
| 円柱 | 底面の円の面積 × 高さ |

すべて「**底面積 × 高さ**」のパターン。形が違っても、原理は同じです。

**錐（円錐・四角錐）は 3 で割る**

少し難しい話ですが、錐（先がとがった形）の体積は：

$$\\text{錐の体積} = \\text{底面積} \\times \\text{高さ} \\div 3$$

「3 で割る」のは、同じ底面・高さの柱に比べて「**ぴったり 3 分の 1**」になるから。実験で確かめられる事実です（円柱と円錐の容器に水を入れ替えて測ると、3 回分でぴったり）。

**単位の話**

長さの単位はいろいろあります：

- mm（ミリメートル）
- cm（センチメートル）
- m（メートル）
- km（キロメートル）

体積の単位は、これらの **3 乗** に対応します：

| 1 辺 | 体積 |
|---|---|
| 1 mm | 1 mm³ |
| 1 cm | 1 cm³（= 1 mL）|
| 1 m | 1 m³（= 1000 L）|

**1 cm が 10 倍になると、体積は 1000 倍** になります。「3 次元なので 10 倍が **3 つ重なる**」と考えるとわかりやすい。

**応用：水のかさ・容積**

体積は容器に入る水の量（容積）でもあります。

- 1 L = 1000 cm³
- 1 mL = 1 cm³

これらは「**ぴったり**」一致するので、覚えておくと便利。容器の縦・横・高さがわかれば、何 mL 入るかが計算で出せます。

**3 次元の世界**

体積の話で「3 つの掛け算」が出てくるのは、私たちが住んでいる空間が **3 次元** だから。2 次元（面積）なら 2 つの掛け算、4 次元の世界があるなら 4 つの掛け算……次元と掛け算の数は対応しています。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "縦 2cm、横 3cm、高さ 4cm の直方体の体積はいくつでしょう？",
      answer: 24, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：体積 = 縦 × 横 × 高さ。" },
        { layer: 2, text: "$2 \\times 3 \\times 4$。" },
        { layer: 3, text: "24。" },
      ],
      formulaPreview: "2 × 3 × 4 = 24",
    },
    {
      id: "step2", position: 2,
      questionText: "縦 4cm、横 3cm、高さ 5cm の直方体の体積はいくつでしょう？",
      answer: 60, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$4 \\times 3 \\times 5$。" },
        { layer: 3, text: "60。" },
      ],
      formulaPreview: "4 × 3 × 5 = 60",
    },
    {
      id: "step3", position: 3,
      questionText: "縦 5cm、横 5cm、高さ 5cm の立方体の体積はいくつでしょう？",
      answer: 125, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "立方体も「縦×横×高さ」で OK。全部同じ長さ。" },
        { layer: 2, text: "$5 \\times 5 \\times 5$。" },
        { layer: 3, text: "125。" },
      ],
      formulaPreview: "5 × 5 × 5 = 125",
    },
    {
      id: "step4", position: 4,
      questionText: "縦 10cm、横 6cm、高さ 4cm の直方体の体積はいくつでしょう？",
      answer: 240, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式に値を代入。" },
        { layer: 2, text: "$10 \\times 6 \\times 4$。" },
        { layer: 3, text: "240。" },
      ],
      formulaPreview: "10 × 6 × 4 = 240",
    },
    {
      id: "step5", position: 5,
      questionText: "学校の水そう（縦 50cm、横 30cm、高さ 20cm）の容積は何 cm³ でしょう？",
      answer: 30000, unit: "cm³", unknownLabel: "容積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "水そうも直方体。公式は同じ。" },
        { layer: 2, text: "$50 \\times 30 \\times 20$。" },
        { layer: 3, text: "30000。" },
      ],
      formulaPreview: "50 × 30 × 20 = 30000",
    },
  ],
};

/* ===== 3. 比例 ===== */

export const E5_PROPORTION_SERIES: LearnerSeries = {
  id: "e5_proportion_01",
  title: "比例の入り口",
  subtitle: "$y = k \\times x$ の関係で y を求める5問。",
  patternId: "EL3",
  unit: "elementary_5",
  revelationLabel: "y = 比例定数 × x。x が 2 倍なら y も 2 倍",
  derivation: `**比例の核心：「同じ倍率で増える」**

「$x$ が 2 倍になったら、$y$ も 2 倍」「$x$ が 3 倍になったら、$y$ も 3 倍」——このとき、$y$ は $x$ に **比例する** といいます。

式で書くと：

$$y = k \\times x$$

ここで $k$ は **比例定数**（変わらない数）。

**身近な例で確かめる**

「1 m あたり 80 円のリボン」を $x$ m 買うとき、代金 $y$ は：

$$y = 80 \\times x$$

| $x$（長さ・m） | $y$（代金・円） |
|---|---|
| 1 | 80 |
| 2 | 160 |
| 3 | 240 |
| 5 | 400 |
| 10 | 800 |

$x$ が 2 倍になれば $y$ も 2 倍、$x$ が 5 倍になれば $y$ も 5 倍。

**「割った値」が同じ**

比例の関係を別の角度から見ると、「**$y$ を $x$ で割った値が一定**」になっています。

$$\\frac{y}{x} = k$$

リボンの例だと、どの行も $\\dfrac{y}{x} = 80$。これは「1 m あたりの値段」そのもの。

「**1 個あたり何か**」「**1 時間あたり何か**」「**1 cm あたり何か**」——「1 つあたり」が一定の現象は、すべて比例関係です。

**グラフは「原点を通る直線」**

$y = k x$ のグラフは、必ず **原点 (0, 0) を通る直線** になります。

- $x = 0$ なら $y = 0$（買わなければ代金 0）
- 直線の **傾き** が比例定数 $k$

「原点を通る」が比例関係の **見た目の特徴**。

**比例と「ただの 1 次関数」の違い**

$y = a x + b$ という 1 次関数の中で、**$b = 0$（y 切片が 0）** のものだけが比例。

| 関係 | 例 |
|---|---|
| 比例 | $y = 3x$（原点を通る） |
| 1 次関数（比例ではない） | $y = 3x + 5$（y 軸を $5$ で切る） |

たとえば「タクシーの料金」は、初乗り料金（基本料金）があるので **比例ではない**。距離が 0 でも料金が 0 にならないからです。

**身の回りの比例**

- 速さ × 時間 = 道のり：時間に道のりが比例
- 1 個あたりの値段 × 個数 = 代金
- 1 リットルあたりの重さ × 体積 = 全体の重さ

「**同じ倍率で増える**」関係は、自然界・社会の至るところに顔を出します。

**反比例との違い**

似た言葉に「**反比例**」（$y = k/x$）があります。これは「$x$ が 2 倍なら $y$ は **半分**」という、比例と **正反対** の関係。

| 関係 | 式 | グラフ |
|---|---|---|
| 比例 | $y = kx$ | 原点を通る直線 |
| 反比例 | $y = k/x$ | 双曲線 |

比例は「**1 つあたり何か** が一定」、反比例は「**全体の量** が一定」——この違いを覚えておくと混乱しません。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "1m あたり 80 円のリボンを 3m 買うと、代金はいくらでしょう？",
      answer: 240, unit: "円", unknownLabel: "代金",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "リボンの長さに「比例」して代金が決まる。" },
        { layer: 2, text: "$80 \\times 3$。" },
        { layer: 3, text: "240 円。" },
      ],
      formulaPreview: "80 × 3 = 240",
    },
    {
      id: "step2", position: 2,
      questionText: "1m あたり 80 円のリボンを 5m 買うと、代金はいくらでしょう？",
      answer: 400, unit: "円", unknownLabel: "代金",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じやり方。長さが変わっただけ。" },
        { layer: 2, text: "$80 \\times 5$。" },
        { layer: 3, text: "400 円。" },
      ],
      formulaPreview: "80 × 5 = 400",
    },
    {
      id: "step3", position: 3,
      questionText: "1 本 120 円のジュースを 4 本買うと、代金はいくらでしょう？",
      answer: 480, unit: "円", unknownLabel: "代金",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "「リボン」が「ジュース」になっただけ。" },
        { layer: 2, text: "$120 \\times 4$。" },
        { layer: 3, text: "480 円。" },
      ],
      formulaPreview: "120 × 4 = 480",
    },
    {
      id: "step4", position: 4,
      questionText: "1 時間に 60km 進む電車が 4 時間で進む道のりは何 km でしょう？",
      answer: 240, unit: "km", unknownLabel: "道のり",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "1 時間あたりの「道のり」も比例。" },
        { layer: 2, text: "$60 \\times 4$。" },
        { layer: 3, text: "240 km。" },
      ],
      formulaPreview: "60 × 4 = 240",
    },
    {
      id: "step5", position: 5,
      questionText: "1 個 25g のおはじきが 8 個あると、重さは何 g でしょう？",
      answer: 200, unit: "g", unknownLabel: "重さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "今度は重さ。仕組みは同じ「1個あたり × 個数」。" },
        { layer: 2, text: "$25 \\times 8$。" },
        { layer: 3, text: "200 g。" },
      ],
      formulaPreview: "25 × 8 = 200",
    },
  ],
};

/* ===== 4. 小数のかけ算 ===== */

export const E5_DECIMAL_MULT_SERIES: LearnerSeries = {
  id: "e5_decimal_mult_01",
  title: "小数のかけ算",
  subtitle: "小数 × 小数を計算する5問。小数点の位置に気をつけて。",
  patternId: "EL4",
  unit: "elementary_5",
  revelationLabel: "整数として掛けて、小数点を合計の位だけずらす",
  derivation: `**小数のかけ算は「整数のかけ算 + 小数点の調整」**

$0.3 \\times 0.2$ を計算するには、

1. まず整数として $3 \\times 2 = 6$ を計算する
2. 小数点を **2 つ左** にずらして $0.06$ にする

なぜ「2 つ」ずらすのか——それぞれの小数が **何桁** あるかを合わせるのです。

**桁を数えてみよう**

$0.3$ は小数第 1 位までの数 → **小数 1 桁**。
$0.2$ も小数 1 桁。

両方の桁を **足す** と $1 + 1 = 2$。だから、答えも **小数 2 桁** ($0.06$) になります。

**なぜそうなるのか**

$0.3 \\times 0.2$ を **分数** に書き直してみます：

$$0.3 \\times 0.2 = \\frac{3}{10} \\times \\frac{2}{10} = \\frac{3 \\times 2}{10 \\times 10} = \\frac{6}{100} = 0.06$$

「**分母の 10 が掛けあわされて 100 になる**」——これが小数点 2 つずれる理由。

一般化すると：

- $0.X \\times 0.Y$（小数 1 桁同士）→ 答えは小数 2 桁
- $0.XX \\times 0.Y$（小数 2 桁 × 1 桁）→ 答えは小数 3 桁
- $0.XX \\times 0.YY$（小数 2 桁同士）→ 答えは小数 4 桁

「**小数点以下の桁数を足す**」が答えの桁数。

**たとえば**

$1.5 \\times 2.4$：

- 整数化：$15 \\times 24 = 360$
- 小数 1 桁 + 1 桁 = 2 桁
- 答え：$3.60 = 3.6$

$0.25 \\times 1.6$：

- 整数化：$25 \\times 16 = 400$
- 小数 2 桁 + 1 桁 = 3 桁
- 答え：$0.400 = 0.4$

**「位を補う 0」に注意**

$0.03 \\times 0.04 = 0.0012$ のように、答えに **0 を補う** ケースもあります。

- 整数化：$3 \\times 4 = 12$
- 小数 2 桁 + 2 桁 = 4 桁
- 答えは小数 4 桁にしたいので、$0.0012$（前に 0 を補って 4 桁にする）

**1 より小さい数同士を掛けると小さくなる**

整数の掛け算では「掛けると大きくなる」のが当たり前。でも：

$$0.5 \\times 0.5 = 0.25$$

**1 より小さい数同士を掛けると、結果が両方より小さくなる** ことがあります。「半分の半分は 4 分の 1」と考えれば自然です。

**1 より大きい数を掛けると大きくなる**

逆に、$1.5 \\times 2 = 3$ のように、1 より大きい数を掛けると大きくなる。

掛け算の「大きくなる・小さくなる」は、**1 より大きいか小さいか** で決まる——これは小学校で必ずつまずく所ですが、分数で考えると一気に納得できます。

**応用：単位の換算**

「1 m あたり 2 kg のひもを 1.5 m 買う」と全体の重さは $2 \\times 1.5 = 3$ kg。

「**単位量あたりの量**」と「**買った量**」を掛けると、全体の量が出る——比例関係の応用です。

小数のかけ算は、**整数のかけ算 + 位の計算** という、2 つの基本動作の組み合わせです。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$0.3 \\times 0.2$ はいくつでしょう？",
      answer: 0.06, unit: "", unknownLabel: "答え",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "3 × 2 = 6。小数点を 2 つ左へずらす。" },
        { layer: 2, text: "0.3（小数 1 桁）× 0.2（小数 1 桁）→ 答えは小数 2 桁。" },
        { layer: 3, text: "0.06。" },
      ],
      formulaPreview: "0.3 × 0.2 = 0.06",
    },
    {
      id: "step2", position: 2,
      questionText: "$0.5 \\times 0.4$ はいくつでしょう？",
      answer: 0.2, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "5 × 4 = 20。" },
        { layer: 2, text: "0.20 = 0.2。" },
        { layer: 3, text: "0.2。" },
      ],
      formulaPreview: "0.5 × 0.4 = 0.2",
    },
    {
      id: "step3", position: 3,
      questionText: "$1.2 \\times 0.5$ はいくつでしょう？",
      answer: 0.6, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "12 × 5 = 60。" },
        { layer: 2, text: "0.60 = 0.6。" },
        { layer: 3, text: "0.6。" },
      ],
      formulaPreview: "1.2 × 0.5 = 0.6",
    },
    {
      id: "step4", position: 4,
      questionText: "$2.5 \\times 0.4$ はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "25 × 4 = 100。" },
        { layer: 2, text: "1.00 = 1。" },
        { layer: 3, text: "1。" },
      ],
      formulaPreview: "2.5 × 0.4 = 1",
    },
    {
      id: "step5", position: 5,
      questionText: "1m あたり 1.5kg のひもを 2.4m 買うと、重さは何 kg でしょう？",
      answer: 3.6, unit: "kg", unknownLabel: "重さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "比例の問題。$1.5 \\times 2.4$ を計算。" },
        { layer: 2, text: "15 × 24 = 360。小数点を 2 つ左へ。" },
        { layer: 3, text: "3.6 kg。" },
      ],
      formulaPreview: "1.5 × 2.4 = 3.6",
    },
  ],
};

/* ===== 5. 小数のわり算 ===== */

export const E5_DECIMAL_DIV_SERIES: LearnerSeries = {
  id: "e5_decimal_div_01",
  title: "小数でわることの意味",
  subtitle:
    "小数でわることを、何こ分・何倍・1あたりの量として読む10問。",
  patternId: "EL5",
  unit: "elementary_5",
  revelationLabel: "わられる数とわる数を同じ倍率で見直しても、商は変わらない",
  drivingQuestion:
    "同じ倍率で量の見方を変えても、1つ分や何倍はなぜ変わらない？",
  derivation: `**小数のわり算は「同じ倍率で見直す」**

$2.4 \\div 0.6$ を計算するには、両方を **10 倍** して：

$$2.4 \\div 0.6 = 24 \\div 6 = 4$$

「**両方に同じ倍率を掛けると、わり算の答えは変わらない**」——これが小数のわり算の核心です。

**なぜ「両方を 10 倍してよい」のか**

「24 ÷ 6」と「2.4 ÷ 0.6」の関係は、**分数** で見るとよくわかります：

$$\\frac{2.4}{0.6} = \\frac{2.4 \\times 10}{0.6 \\times 10} = \\frac{24}{6} = 4$$

「**分母と分子の両方に同じ数を掛けても、分数の値は変わらない**」という原理を使っているだけ。

**わり算と分数は同じもの**

そもそも、$\\dfrac{a}{b}$ は「$a \\div b$」のこと。だから：

- 「分母と分子の両方に同じ数を掛けても変わらない」
- 「わられる数とわる数の両方に同じ数を掛けても、答えは変わらない」

は、まったく同じ話です。

**わる数を整数にするのがコツ**

小数のわり算では、**わる数（÷の右）を整数にする** ことを最初の目標にします。

| 元の式 | 何倍する？ | 直した式 |
|---|---|---|
| $2.4 \\div 0.6$ | 10 倍 | $24 \\div 6 = 4$ |
| $0.48 \\div 0.06$ | 100 倍 | $48 \\div 6 = 8$ |
| $7.2 \\div 1.2$ | 10 倍 | $72 \\div 12 = 6$ |
| $5 \\div 0.25$ | 100 倍 | $500 \\div 25 = 20$ |

「わる数の小数点を **右に動かして整数にする**」、そして「わられる数の小数点を **同じ数だけ動かす**」。

大事なのは、片方だけを変えるのではなく、**両方を同じ倍率で見直す** ことです。

**「÷ 0.5 は ÷ 1/2、つまり × 2」**

$10 \\div 0.5$ の場合：

$$10 \\div 0.5 = 10 \\div \\frac{1}{2} = 10 \\times 2 = 20$$

「1 より小さい数で割ると **大きくなる**」のは、ここからも見えてきます。「**$\\dfrac{1}{2}$ で割る $= 2$ を掛ける**」というふしぎな関係。

**1 より大きい数で割ると小さくなる**

逆に $10 \\div 2 = 5$、$10 \\div 5 = 2$ のように、1 より大きい数で割れば結果は小さくなる。

| わる数 | 結果 |
|---|---|
| 1 より大きい | 小さくなる |
| ちょうど 1 | 変わらない |
| 1 より小さい（0 より大） | 大きくなる |

これは小学校で混乱しやすい点ですが、上の関係を覚えておくと安心です。

**割り切れないとき：余り or 小数で続ける**

整数で割り切れないとき、

- **余りを出す**（例：$10 \\div 3 = 3$ あまり $1$）
- **小数で続ける**（例：$10 \\div 3 = 3.333\\ldots$）

の 2 通りの扱い方があります。状況によって使い分けます。

**応用：単価の計算・速さ・人口密度**

割り算は「1 つあたりの量」を求める道具：

- $\\dfrac{\\text{代金}}{\\text{個数}} = $ 1 個あたりの値段
- $\\dfrac{\\text{道のり}}{\\text{時間}} = $ 速さ
- $\\dfrac{\\text{人口}}{\\text{面積}} = $ 人口密度

「**全体 ÷ 個数 = 1 つあたり**」は、量を比べる基本道具。小数の割り算ができれば、現実の量の話で困らなくなります。`,
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$7.2$ L のジュースを $3$ 人で等しく分けます。1人分は何 L でしょう？",
      answer: 2.4,
      unit: "L",
      unknownLabel: "1人分",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "全体を同じ大きさの3つに分けるとき、求めているのはどの1つ分かな？",
        },
        {
          layer: 2,
          text:
            "見る量は、全体のジュースの量と、分ける人数。1人分という同じ大きさのまとまりを考えよう。",
        },
        {
          layer: 3,
          text:
            "$7.2 \\div 3$ を計算する。$72 \\div 3 = 24$ なので、$7.2 \\div 3 = 2.4$。1人分は $2.4$ L。",
        },
      ],
      formulaPreview: "7.2 ÷ 3 = 2.4",
      figureMarker: "<<DECIMAL_DIV_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$9.6$ L の水を $4$ 本のびんに等しく入れます。1本分は何 L でしょう？",
      answer: 2.4,
      unit: "L",
      unknownLabel: "1本分",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。全体を同じ大きさに分けて、1つ分を求めるところは同じ。何が変わった？",
        },
        {
          layer: 2,
          text:
            "変わったのは、全体の量と、分ける数。求めるものは同じく1つ分。",
        },
        {
          layer: 3,
          text:
            "$9.6 \\div 4$ を計算する。$96 \\div 4 = 24$ なので、$9.6 \\div 4 = 2.4$。1本分は $2.4$ L。",
        },
      ],
      formulaPreview: "9.6 ÷ 4 = 2.4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$7.2$ m のリボンを、$0.3$ m ずつ切ります。何本できるでしょう？",
      answer: 24,
      unit: "本",
      unknownLabel: "本数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。全体をいくつ分に分けられるかを見ている点は似ている。わる数はどう変わった？",
        },
        {
          layer: 2,
          text:
            "変わったのは、1つ分の長さが整数ではなく小数になったこと。",
        },
        {
          layer: 3,
          text:
            "$7.2 \\div 0.3$ を、両方10倍して $72 \\div 3$ と見る。$72 \\div 3 = 24$ だから、$24$ 本できる。",
        },
      ],
      formulaPreview: "7.2 ÷ 0.3 = 72 ÷ 3 = 24",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$4.8$ kg の小麦粉を、$0.6$ kg ずつ袋に入れます。何袋できるでしょう？",
      answer: 8,
      unit: "袋",
      unknownLabel: "袋の数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。小数の1つ分が、全体の中にいくつ入るかを見ているところは同じ。",
        },
        {
          layer: 2,
          text:
            "変わったのは、量の種類と数。わる数が小数であるところは前題と同じ。",
        },
        {
          layer: 3,
          text:
            "$4.8 \\div 0.6$ を、両方10倍して $48 \\div 6$ と見る。$48 \\div 6 = 8$ だから、$8$ 袋できる。",
        },
      ],
      formulaPreview: "4.8 ÷ 0.6 = 48 ÷ 6 = 8",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$0.4$ m ずつ切ったら、$9$ 本できました。もとのリボンは何 m だったでしょう？",
      answer: 3.6,
      unit: "m",
      unknownLabel: "もとの長さ",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "前題たちと比べてみよう。今度は、全体から本数を求めるのではなく、本数から全体へ戻っている。",
        },
        {
          layer: 2,
          text:
            "変わったのは求める向き。1本分と本数がわかっていて、全体をたしかめる問題になった。",
        },
        {
          layer: 3,
          text:
            "1本が $0.4$ m で $9$ 本だから、全体は $0.4 \\times 9 = 3.6$。もとのリボンは $3.6$ m。",
        },
      ],
      formulaPreview: "0.4 × 9 = 3.6",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$0.25$ L ずつ入れると、$12$ 本の小びんがいっぱいになりました。全部で何 L ありますか？",
      answer: 3,
      unit: "L",
      unknownLabel: "全部の量",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。1つ分と個数から、全体へ戻るところは同じ。何が変わった？",
        },
        {
          layer: 2,
          text:
            "変わったのは、1つ分が小数第2位まであることと、数える単位が本になったこと。",
        },
        {
          layer: 3,
          text:
            "1本が $0.25$ L で $12$ 本だから、全体は $0.25 \\times 12 = 3$。全部で $3$ L。",
        },
      ],
      formulaPreview: "0.25 × 12 = 3",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2.4$ m の布は、$6$ m の布の何倍でしょう？",
      answer: 0.4,
      unit: "倍",
      unknownLabel: "何倍",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題までと比べてみよう。今度は同じ大きさに分けるより、基準の量と比べて何倍かを見ている。",
        },
        {
          layer: 2,
          text:
            "変わったのは、基準の量のほうが比べる量より大きいこと。答えの大きさを先に見積もってみよう。",
        },
        {
          layer: 3,
          text:
            "何倍かは $2.4 \\div 6$ で求める。$24 \\div 6 = 4$ なので、$2.4 \\div 6 = 0.4$。$2.4$ m は $6$ m の $0.4$ 倍。",
        },
      ],
      formulaPreview: "2.4 ÷ 6 = 0.4",
      figureMarker: "<<DECIMAL_DIV_STEP7>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$3.6$ m のひもは、$9$ m のひもの何倍でしょう？",
      answer: 0.4,
      unit: "倍",
      unknownLabel: "何倍",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。基準の量と比べて何倍かを求めるところは同じ。",
        },
        {
          layer: 2,
          text:
            "変わったのは、比べる量と基準の量。基準のほうが大きいところは同じ。",
        },
        {
          layer: 3,
          text:
            "$3.6 \\div 9$ を計算する。$36 \\div 9 = 4$ なので、$3.6 \\div 9 = 0.4$。$0.4$ 倍。",
        },
      ],
      formulaPreview: "3.6 ÷ 9 = 0.4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$0.84$ L の液体は、$0.7$ L の液体の何倍でしょう？",
      answer: 1.2,
      unit: "倍",
      unknownLabel: "何倍",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。何倍かを求める点は同じ。今度は、比べる量も基準の量も小数になっている。",
        },
        {
          layer: 2,
          text:
            "変わったのは、わる数も小数になったこと。両方を同じ倍率で見直せる形かを考えよう。",
        },
        {
          layer: 3,
          text:
            "$0.84 \\div 0.7$ を、両方10倍して $8.4 \\div 7$ と見る。$8.4 \\div 7 = 1.2$ だから、$1.2$ 倍。",
        },
      ],
      formulaPreview: "0.84 ÷ 0.7 = 8.4 ÷ 7 = 1.2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$5.2$ kg の米を、$0.8$ kg ずつ袋に入れます。何袋分になるでしょう？",
      answer: 6.5,
      unit: "袋分",
      unknownLabel: "袋分",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。わる数が小数で、答えも整数とは限らない。何倍・何個分を見る考えはつながっている。",
        },
        {
          layer: 2,
          text:
            "変わったのは、場面が何倍から何袋分になったこと。わる数が小数である点は前題と同じ。",
        },
        {
          layer: 3,
          text:
            "$5.2 \\div 0.8$ を、両方10倍して $52 \\div 8$ と見る。$52 \\div 8 = 6.5$ だから、$6.5$ 袋分になる。",
        },
      ],
      formulaPreview: "5.2 ÷ 0.8 = 52 ÷ 8 = 6.5",
    },
  ],
};

/* ===== 5-2. 小数の除法の考え方と筆算形式 ===== */

export const E5_DECIMAL_DIV_ALGORITHM_SERIES: LearnerSeries = {
  id: "e5_decimal_div_algorithm_01",
  title: "小数の除法の考え方と筆算形式",
  subtitle:
    "わる数を整数にするため、両方を同じ倍率で見直して筆算につなぐ10問。",
  patternId: "EL5D2",
  unit: "elementary_5",
  revelationLabel: "わる数を整数にするために、わられる数も同じだけ動かす",
  drivingQuestion:
    "見た目の小数点を動かしても、同じわり算だと言えるのはなぜ？",
  derivation: `**中心の問い** ｜ 見た目の小数点を動かしても、同じわり算だと言えるのはなぜ？

小数の除法の筆算は、最初に **わる数を整数にする** ところから始まります。

$$4.8 \\div 0.6 = 48 \\div 6$$

<<DECIMAL_DIV_ALGORITHM_STEP7>>

これは、わる数だけを変えているのではありません。わられる数とわる数を、同じ倍率で見直しています。

$$\\frac{4.8}{0.6} = \\frac{48}{6}$$

筆算で小数点を動かす操作は、実はこの等しい分数の考えを短く書いたものです。

**問いに戻ると**

小数点を動かしてよいのは、両方を同じ倍率で見直しているからです。片方だけを動かすのではなく、わる数を整数にするために、わられる数も同じだけ動かす。これが小数の除法の筆算形式の骨です。`,
  steps: [
    { id: "step1", position: 1, questionText: "$4.8 \\div 0.6$ は、筆算でわる数を整数にすると $N \\div 6$ と見られます。$N$ はいくつでしょう？", answer: 48, unit: "", unknownLabel: "N", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "小数でわるとき、わる数を整数として見直すには、何を同じように変える必要があるかな？" },
      { layer: 2, text: "見るところは、わる数とわられる数の小数点の動きがそろっているかどうか。" },
      { layer: 3, text: "$0.6$ を $6$ と見るには10倍する。同じように $4.8$ も10倍して $48$。だから $4.8 \\div 0.6 = 48 \\div 6$ で、$N=48$。" },
    ], formulaPreview: "4.8 ÷ 0.6 = 48 ÷ 6", figureMarker: "<<DECIMAL_DIV_ALGORITHM_STEP1>>" },
    { id: "step2", position: 2, questionText: "$7.2 \\div 0.9$ は、わる数を整数にすると $N \\div 9$ と見られます。$N$ はいくつでしょう？", answer: 72, unit: "", unknownLabel: "N", variationFromPrevious: "same", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。わる数を整数に見直すところは同じ。何が変わった？" },
      { layer: 2, text: "変わったのは、わられる数とわる数の組だけ。小数点の動き方は同じ。" },
      { layer: 3, text: "$0.9$ を $9$ と見るには10倍する。同じように $7.2$ も10倍して $72$。だから $N=72$。" },
    ], formulaPreview: "7.2 ÷ 0.9 = 72 ÷ 9" },
    { id: "step3", position: 3, questionText: "$3.6 \\div 1.2$ は、わる数を整数にすると $N \\div 12$ と見られます。$N$ はいくつでしょう？", answer: 36, unit: "", unknownLabel: "N", variationFromPrevious: "plus_alpha", compareWithStepId: "step2", hints: [
      { layer: 1, text: "前題と比べてみよう。今度のわる数は一より大きい小数。何が同じで、何が違う？" },
      { layer: 2, text: "変わったのは、わる数の大きさ。小数点をそろえて動かす考えは同じ。" },
      { layer: 3, text: "$1.2$ を $12$ と見るには10倍する。同じように $3.6$ も10倍して $36$。だから $N=36$。" },
    ], formulaPreview: "3.6 ÷ 1.2 = 36 ÷ 12" },
    { id: "step4", position: 4, questionText: "$0.48 \\div 0.06$ は、わる数を整数にすると $N \\div 6$ と見られます。$N$ はいくつでしょう？", answer: 48, unit: "", unknownLabel: "N", variationFromPrevious: "plus_alpha", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題たちと比べてみよう。今度は小数点を一つだけ動かせばよいかな？" },
      { layer: 2, text: "変わったのは、わる数の小数の位。整数にするまでの動きが大きくなった。" },
      { layer: 3, text: "$0.06$ を $6$ と見るには100倍する。同じように $0.48$ も100倍して $48$。だから $N=48$。" },
    ], formulaPreview: "0.48 ÷ 0.06 = 48 ÷ 6" },
    { id: "step5", position: 5, questionText: "$N \\div 8$ と見直して計算したら、もとの式は $5.6 \\div 0.8$ でした。$N$ はいくつでしょう？", answer: 56, unit: "", unknownLabel: "N", variationFromPrevious: "inverse", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は見直した形から、どの数が動いたかを逆向きに読んでいる。" },
      { layer: 2, text: "変わったのは読む向き。もとのわる数が整数になる動きを先に見る。" },
      { layer: 3, text: "$0.8$ を $8$ と見るには10倍する。だから $5.6$ も10倍して $56$。$N=56$。" },
    ], formulaPreview: "5.6 ÷ 0.8 = 56 ÷ 8" },
    { id: "step6", position: 6, questionText: "$6.25 \\div 0.25$ は、わる数を整数にすると $N \\div 25$ と見られます。$N$ はいくつでしょう？", answer: 625, unit: "", unknownLabel: "N", variationFromPrevious: "same", compareWithStepId: "step4", hints: [
      { layer: 1, text: "前題と比べてみよう。小数点を大きく動かすところは同じ。何が変わった？" },
      { layer: 2, text: "変わったのは、わる数が二けたの整数として見えること。" },
      { layer: 3, text: "$0.25$ を $25$ と見るには100倍する。同じように $6.25$ も100倍して $625$。$N=625$。" },
    ], formulaPreview: "6.25 ÷ 0.25 = 625 ÷ 25" },
    { id: "step7", position: 7, questionText: "筆算で $4.8 \\div 0.6$ を $48 \\div 6$ に直したとき、商は何になりますか？", answer: 8, unit: "", unknownLabel: "商", variationFromPrevious: "qualitative", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題までと比べてみよう。今度は見直した形を使って、商まで読む段階に入っている。" },
      { layer: 2, text: "変わったのは、見直した後に計算まで進むこと。" },
      { layer: 3, text: "$4.8 \\div 0.6$ は $48 \\div 6$ と見られる。$48 \\div 6 = 8$ だから、商は $8$。" },
    ], formulaPreview: "4.8 ÷ 0.6 = 48 ÷ 6 = 8", figureMarker: "<<DECIMAL_DIV_ALGORITHM_STEP7>>" },
    { id: "step8", position: 8, questionText: "$7.5 \\div 1.5$ を、わる数を整数にして計算します。商はいくつでしょう？", answer: 5, unit: "", unknownLabel: "商", variationFromPrevious: "same", compareWithStepId: "step7", hints: [
      { layer: 1, text: "前題と比べてみよう。見直してから商を読むところは同じ。" },
      { layer: 2, text: "変わったのは、わる数が一より大きい小数になったこと。" },
      { layer: 3, text: "$7.5 \\div 1.5$ は $75 \\div 15$ と見られる。$75 \\div 15 = 5$ だから、商は $5$。" },
    ], formulaPreview: "7.5 ÷ 1.5 = 75 ÷ 15 = 5" },
    { id: "step9", position: 9, questionText: "$0.84 \\div 0.07$ を、わる数を整数にして計算します。商はいくつでしょう？", answer: 12, unit: "", unknownLabel: "商", variationFromPrevious: "plus_alpha", compareWithStepId: "step8", hints: [
      { layer: 1, text: "前題と比べてみよう。見直してから商を読む点は同じ。小数点の動きはどう変わった？" },
      { layer: 2, text: "変わったのは、わる数を整数にするまでの小数点の動き。" },
      { layer: 3, text: "$0.84 \\div 0.07$ は $84 \\div 7$ と見られる。$84 \\div 7 = 12$ だから、商は $12$。" },
    ], formulaPreview: "0.84 ÷ 0.07 = 84 ÷ 7 = 12" },
    { id: "step10", position: 10, questionText: "$3.12 \\div 0.24$ を、わる数を整数にして計算します。商はいくつでしょう？", answer: 13, unit: "", unknownLabel: "商", variationFromPrevious: "composite", compareWithStepId: "step9", hints: [
      { layer: 1, text: "前題と比べてみよう。小数点を大きく動かし、さらに二けたのわる数で計算するところが重なっている。" },
      { layer: 2, text: "変わったのは、見直した後のわる数が二けたになったこと。" },
      { layer: 3, text: "$3.12 \\div 0.24$ は $312 \\div 24$ と見られる。$312 \\div 24 = 13$ だから、商は $13$。" },
    ], formulaPreview: "3.12 ÷ 0.24 = 312 ÷ 24 = 13" },
  ],
};

/* ===== 5-3. 純小数でわるときの商と被除数の関係 ===== */

export const E5_DECIMAL_DIV_PURE_DECIMAL_SERIES: LearnerSeries = {
  id: "e5_decimal_div_pure_decimal_01",
  title: "純小数でわるときの商と被除数の関係",
  subtitle:
    "一より小さい数でわると商が大きくなる理由を、何こ分・何倍で読む10問。",
  patternId: "EL5D3",
  unit: "elementary_5",
  revelationLabel: "一より小さい数でわると、商は被除数より大きくなることがある",
  drivingQuestion:
    "わり算なのに答えが大きくなるのは、何を数えているからだろう？",
  derivation: `**中心の問い** ｜ わり算なのに答えが大きくなるのは、何を数えているからだろう？

わり算は、いつも「小さくする」計算ではありません。

$$3 \\div 0.5 = 6$$

これは「3 の中に 0.5 がいくつ入るか」を数えています。0.5 は 1 より小さいので、1 つずつ数えるよりたくさん入ります。

**問いに戻ると**

純小数でわると商が大きくなるのは、全体を小さな単位で数え直しているからです。わり算の意味を「何こ分」「何倍」として読めば、答えが大きくなることはふしぎではなくなります。`,
  steps: [
    { id: "step1", position: 1, questionText: "$3$ m のリボンを $0.5$ m ずつ切ります。何本できますか？", answer: 6, unit: "本", unknownLabel: "本数", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "全体の中に、小さいひとまとまりがいくつ入るか、どこを見ればよさそうかな？" },
      { layer: 2, text: "見るところは、切る長さが一より小さいこと。" },
      { layer: 3, text: "$3 \\div 0.5$ を計算する。$0.5$ m は半分の長さなので、$3$ m には $6$ 個入る。答えは $6$ 本。" },
    ], formulaPreview: "3 ÷ 0.5 = 6" },
    { id: "step2", position: 2, questionText: "$4$ L の水を $0.5$ L ずつ入れます。何本分になりますか？", answer: 8, unit: "本分", unknownLabel: "本分", variationFromPrevious: "same", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。小さいまとまりがいくつ入るかを見るところは同じ。" },
      { layer: 2, text: "変わったのは、全体の量と場面だけ。" },
      { layer: 3, text: "$4 \\div 0.5 = 8$。$0.5$ L ずつなら、$4$ L は $8$ 本分。" },
    ], formulaPreview: "4 ÷ 0.5 = 8" },
    { id: "step3", position: 3, questionText: "$3$ kg の米を $0.3$ kg ずつ分けます。何袋分になりますか？", answer: 10, unit: "袋分", unknownLabel: "袋分", variationFromPrevious: "plus_alpha", compareWithStepId: "step2", hints: [
      { layer: 1, text: "前題と比べてみよう。小さいまとまりで数える点は同じ。まとまりの大きさはどう変わった？" },
      { layer: 2, text: "変わったのは、一つ分が半分ではない小数になったこと。" },
      { layer: 3, text: "$3 \\div 0.3$ は、両方10倍して $30 \\div 3$。答えは $10$ 袋分。" },
    ], formulaPreview: "3 ÷ 0.3 = 30 ÷ 3 = 10" },
    { id: "step4", position: 4, questionText: "$2.4$ m のテープを $0.4$ m ずつ切ります。何本できますか？", answer: 6, unit: "本", unknownLabel: "本数", variationFromPrevious: "same", compareWithStepId: "step3", hints: [
      { layer: 1, text: "前題と比べてみよう。小さい一つ分が全体にいくつ入るかを見るところは同じ。" },
      { layer: 2, text: "変わったのは、全体も一つ分も小数になったこと。" },
      { layer: 3, text: "$2.4 \\div 0.4$ は $24 \\div 4$ と見られる。答えは $6$ 本。" },
    ], formulaPreview: "2.4 ÷ 0.4 = 24 ÷ 4 = 6" },
    { id: "step5", position: 5, questionText: "$0.5$ m ずつ切って $8$ 本できました。もとの長さは何 m ですか？", answer: 4, unit: "m", unknownLabel: "もとの長さ", variationFromPrevious: "inverse", compareWithStepId: "step2", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は、何本分から全体へ戻っている。" },
      { layer: 2, text: "変わったのは求める向き。小さいまとまりと個数から全体を見る。" },
      { layer: 3, text: "$0.5 \\times 8 = 4$。もとの長さは $4$ m。" },
    ], formulaPreview: "0.5 × 8 = 4" },
    { id: "step6", position: 6, questionText: "$0.25$ L ずつ入れて $12$ 本分になりました。全部で何 L ですか？", answer: 3, unit: "L", unknownLabel: "全部の量", variationFromPrevious: "same", compareWithStepId: "step5", hints: [
      { layer: 1, text: "前題と比べてみよう。小さいまとまりと個数から全体へ戻るところは同じ。" },
      { layer: 2, text: "変わったのは、一つ分がもっと小さい小数になったこと。" },
      { layer: 3, text: "$0.25 \\times 12 = 3$。全部で $3$ L。" },
    ], formulaPreview: "0.25 × 12 = 3" },
    { id: "step7", position: 7, questionText: "$2$ は $0.4$ の何倍ですか？", answer: 5, unit: "倍", unknownLabel: "何倍", variationFromPrevious: "qualitative", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題までと比べてみよう。今度は、同じことを何倍という言葉で読んでいる。" },
      { layer: 2, text: "変わったのは、単位の場面ではなく数どうしの倍として見ること。" },
      { layer: 3, text: "何倍かは $2 \\div 0.4$。両方10倍して $20 \\div 4 = 5$。答えは $5$ 倍。" },
    ], formulaPreview: "2 ÷ 0.4 = 20 ÷ 4 = 5", figureMarker: "<<DECIMAL_DIV_STEP7>>" },
    { id: "step8", position: 8, questionText: "$1.8$ は $0.6$ の何倍ですか？", answer: 3, unit: "倍", unknownLabel: "何倍", variationFromPrevious: "same", compareWithStepId: "step7", hints: [
      { layer: 1, text: "前題と比べてみよう。小さい基準を何こ分か見るところは同じ。" },
      { layer: 2, text: "変わったのは、比べる数と基準の数。" },
      { layer: 3, text: "$1.8 \\div 0.6$ は $18 \\div 6$。答えは $3$ 倍。" },
    ], formulaPreview: "1.8 ÷ 0.6 = 18 ÷ 6 = 3" },
    { id: "step9", position: 9, questionText: "$0.9$ は $0.3$ の何倍ですか？", answer: 3, unit: "倍", unknownLabel: "何倍", variationFromPrevious: "plus_alpha", compareWithStepId: "step8", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は、比べる数も基準の数も一より小さい。" },
      { layer: 2, text: "変わったのは、両方が純小数になったこと。" },
      { layer: 3, text: "$0.9 \\div 0.3$ は $9 \\div 3$。答えは $3$ 倍。" },
    ], formulaPreview: "0.9 ÷ 0.3 = 9 ÷ 3 = 3" },
    { id: "step10", position: 10, questionText: "$2.5$ kg の中に $0.25$ kg は何こ分入りますか？", answer: 10, unit: "こ分", unknownLabel: "こ分", variationFromPrevious: "composite", compareWithStepId: "step9", hints: [
      { layer: 1, text: "前題と比べてみよう。小さいまとまりで数え、さらに小数点を大きく動かすところが重なっている。" },
      { layer: 2, text: "変わったのは、一つ分が小数第2位まであること。" },
      { layer: 3, text: "$2.5 \\div 0.25$ は $250 \\div 25$。答えは $10$ こ分。" },
    ], formulaPreview: "2.5 ÷ 0.25 = 250 ÷ 25 = 10" },
  ],
};

/* ===== 5-4. 商を概数で表すときの処理の仕方 ===== */

export const E5_DECIMAL_DIV_ROUNDING_SERIES: LearnerSeries = {
  id: "e5_decimal_div_rounding_01",
  title: "商を概数で表すときの処理の仕方",
  subtitle:
    "商をどの位まで求め、どの位を見て四捨五入するかを読む10問。",
  patternId: "EL5D4",
  unit: "elementary_5",
  revelationLabel: "求めたい位の一つ下まで計算して、その位で四捨五入する",
  drivingQuestion:
    "答えをぴったり出せないとき、どこまで計算すれば十分と言える？",
  derivation: `**中心の問い** ｜ 答えをぴったり出せないとき、どこまで計算すれば十分と言える？

小数のわり算では、商が続いて終わらないことがあります。そのときは、目的に合わせて概数にします。

小数第一位までの概数なら、小数第二位を見ます。

$$5 \\div 3 = 1.66\\cdots \\approx 1.7$$

小数第二位までの概数なら、小数第三位を見ます。

**問いに戻ると**

概数は、途中であきらめることではありません。どの位まで必要かを決め、その一つ下の位まで調べて判断することです。`,
  steps: [
    { id: "step1", position: 1, questionText: "$5 \\div 3$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 1.7, unit: "", unknownLabel: "概数", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "ほしい位を決めたあと、どこを見れば四捨五入できそうかな？" },
      { layer: 2, text: "見るところは、小数第一位を決めるための次の位。" },
      { layer: 3, text: "$5 \\div 3 = 1.66\\cdots$。小数第一位までなら小数第二位を見る。第二位が $6$ なので、答えは $1.7$。" },
    ], formulaPreview: "5 ÷ 3 = 1.66... ≈ 1.7" },
    { id: "step2", position: 2, questionText: "$8 \\div 3$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 2.7, unit: "", unknownLabel: "概数", variationFromPrevious: "same", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。小数第一位まで表すところは同じ。何が変わった？" },
      { layer: 2, text: "変わったのは、わられる数だけ。見る位は同じ。" },
      { layer: 3, text: "$8 \\div 3 = 2.66\\cdots$。小数第二位が $6$ なので、答えは $2.7$。" },
    ], formulaPreview: "8 ÷ 3 = 2.66... ≈ 2.7" },
    { id: "step3", position: 3, questionText: "$7 \\div 4$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 1.8, unit: "", unknownLabel: "概数", variationFromPrevious: "plus_alpha", compareWithStepId: "step2", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は同じ数字が続く形ではない。見る位は変わるかな？" },
      { layer: 2, text: "変わったのは、商の出方。概数にする位は同じ。" },
      { layer: 3, text: "$7 \\div 4 = 1.75$。小数第二位が $5$ なので、答えは $1.8$。" },
    ], formulaPreview: "7 ÷ 4 = 1.75 ≈ 1.8" },
    { id: "step4", position: 4, questionText: "$5 \\div 6$ の商を小数第二位までの概数で表します。答えはいくつですか？", answer: 0.83, unit: "", unknownLabel: "概数", variationFromPrevious: "plus_alpha", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は、表したい位が一つ細かくなっている。" },
      { layer: 2, text: "変わったのは、どの位まで表すか。見る位も一つ細かくなる。" },
      { layer: 3, text: "$5 \\div 6 = 0.833\\cdots$。小数第二位までなら小数第三位を見る。第三位が $3$ なので、答えは $0.83$。" },
    ], formulaPreview: "5 ÷ 6 = 0.833... ≈ 0.83" },
    { id: "step5", position: 5, questionText: "商を小数第一位までの概数にしたら $2.4$ でした。もとの商が $2.36$ のとき、この処理は正しいですか？ 正しいなら $1$、正しくないなら $0$ で答えましょう。", answer: 1, unit: "", unknownLabel: "判定", variationFromPrevious: "inverse", compareWithStepId: "step3", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は概数を作るのではなく、作られた概数をたしかめている。" },
      { layer: 2, text: "変わったのは、処理の向き。見る位は同じように考える。" },
      { layer: 3, text: "$2.36$ を小数第一位までにするには小数第二位を見る。第二位が $6$ なので $2.4$。正しいから $1$。" },
    ], formulaPreview: "2.36 ≈ 2.4" },
    { id: "step6", position: 6, questionText: "$4 \\div 7$ の商を小数第二位までの概数で表します。答えはいくつですか？", answer: 0.57, unit: "", unknownLabel: "概数", variationFromPrevious: "same", compareWithStepId: "step4", hints: [
      { layer: 1, text: "前題と比べてみよう。小数第二位まで表すところは同じ。" },
      { layer: 2, text: "変わったのは、わられる数とわる数の組。" },
      { layer: 3, text: "$4 \\div 7 = 0.571\\cdots$。小数第三位が $1$ なので、答えは $0.57$。" },
    ], formulaPreview: "4 ÷ 7 = 0.571... ≈ 0.57" },
    { id: "step7", position: 7, questionText: "$2.5 \\div 0.7$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 3.6, unit: "", unknownLabel: "概数", variationFromPrevious: "qualitative", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題までと比べてみよう。今度は小数でわる計算と概数処理がつながっている。" },
      { layer: 2, text: "変わったのは、まず小数のわり算として見直す必要があること。" },
      { layer: 3, text: "$2.5 \\div 0.7 = 25 \\div 7 = 3.571\\cdots$。小数第二位が $7$ なので、答えは $3.6$。" },
    ], formulaPreview: "2.5 ÷ 0.7 = 25 ÷ 7 ≈ 3.6" },
    { id: "step8", position: 8, questionText: "$6.4 \\div 0.9$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 7.1, unit: "", unknownLabel: "概数", variationFromPrevious: "same", compareWithStepId: "step7", hints: [
      { layer: 1, text: "前題と比べてみよう。小数でわってから概数にするところは同じ。" },
      { layer: 2, text: "変わったのは、わられる数とわる数の組。" },
      { layer: 3, text: "$6.4 \\div 0.9 = 64 \\div 9 = 7.111\\cdots$。小数第二位が $1$ なので、答えは $7.1$。" },
    ], formulaPreview: "6.4 ÷ 0.9 = 64 ÷ 9 ≈ 7.1" },
    { id: "step9", position: 9, questionText: "$1.2 \\div 0.7$ の商を小数第二位までの概数で表します。答えはいくつですか？", answer: 1.71, unit: "", unknownLabel: "概数", variationFromPrevious: "plus_alpha", compareWithStepId: "step7", hints: [
      { layer: 1, text: "前題と比べてみよう。小数でわる点は同じ。今度は表す位が細かくなっている。" },
      { layer: 2, text: "変わったのは、概数にする位。" },
      { layer: 3, text: "$1.2 \\div 0.7 = 12 \\div 7 = 1.714\\cdots$。小数第三位が $4$ なので、答えは $1.71$。" },
    ], formulaPreview: "1.2 ÷ 0.7 = 12 ÷ 7 ≈ 1.71" },
    { id: "step10", position: 10, questionText: "$5.8 \\div 0.6$ の商を小数第二位までの概数で表します。答えはいくつですか？", answer: 9.67, unit: "", unknownLabel: "概数", variationFromPrevious: "composite", compareWithStepId: "step9", hints: [
      { layer: 1, text: "前題と比べてみよう。小数でわること、細かい位まで概数にすることが重なっている。" },
      { layer: 2, text: "変わったのは、見直した後のわり算で同じ数字が続くこと。" },
      { layer: 3, text: "$5.8 \\div 0.6 = 58 \\div 6 = 9.666\\cdots$。小数第三位が $6$ なので、答えは $9.67$。" },
    ], formulaPreview: "5.8 ÷ 0.6 = 58 ÷ 6 ≈ 9.67" },
  ],
};

/* ===== 5-5. 余りがある場合の余りの小数点の位置 ===== */

export const E5_DECIMAL_DIV_REMAINDER_SERIES: LearnerSeries = {
  id: "e5_decimal_div_remainder_01",
  title: "余りがある場合の余りの小数点の位置",
  subtitle:
    "筆算で小数点を動かしたあと、余りをもとの単位に戻して読む10問。",
  patternId: "EL5D5",
  unit: "elementary_5",
  revelationLabel: "余りは、もとのわられる数の小数点の位置に戻して読む",
  drivingQuestion:
    "筆算で数を大きくして計算した余りは、もとの量ではどんな大きさになる？",
  derivation: `**中心の問い** ｜ 筆算で数を大きくして計算した余りは、もとの量ではどんな大きさになる？

小数のわり算では、計算しやすくするために数を大きくして見ることがあります。

$$5.7 \\div 2 = 2 \\text{ あまり } 1.7$$

筆算の途中で $57$ と見ても、余りの $17$ をそのまま $17$ と読んではいけません。もとの数は $5.7$ なので、余りも $1.7$ と読む必要があります。

**問いに戻ると**

余りは「残った量」です。だから、計算のために一時的に動かした小数点ではなく、もとの量の小数点の位置に戻して読む。これが余りの小数点の位置の決め方です。`,
  steps: [
    { id: "step1", position: 1, questionText: "$5.7$ m のリボンを $2$ m ずつ切ります。$2$ 本切れたとき、余りは何 m ですか？", answer: 1.7, unit: "m", unknownLabel: "余り", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "余りは、切ったあとに本当に残っている長さ。どこを見ればその長さが分かりそうかな？" },
      { layer: 2, text: "見るところは、もとの長さの小数点の位置。" },
      { layer: 3, text: "$5.7 - 2 \\times 2 = 1.7$。余りは $1.7$ m。" },
    ], formulaPreview: "5.7 ÷ 2 = 2 あまり 1.7" },
    { id: "step2", position: 2, questionText: "$7.8$ L の水を $3$ L ずつ入れます。$2$ 本分入れたとき、余りは何 L ですか？", answer: 1.8, unit: "L", unknownLabel: "余り", variationFromPrevious: "same", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題と比べてみよう。整数のまとまりを取ったあと、残りをもとの単位で読むところは同じ。" },
      { layer: 2, text: "変わったのは、全体の量と一つ分の量。" },
      { layer: 3, text: "$7.8 - 3 \\times 2 = 1.8$。余りは $1.8$ L。" },
    ], formulaPreview: "7.8 ÷ 3 = 2 あまり 1.8" },
    { id: "step3", position: 3, questionText: "$6.5$ kg の米を $2$ kg ずつ袋に入れます。$3$ 袋できたとき、余りは何 kg ですか？", answer: 0.5, unit: "kg", unknownLabel: "余り", variationFromPrevious: "plus_alpha", compareWithStepId: "step2", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は余りが一より小さい量になっている。" },
      { layer: 2, text: "変わったのは、残りの大きさ。" },
      { layer: 3, text: "$6.5 - 2 \\times 3 = 0.5$。余りは $0.5$ kg。" },
    ], formulaPreview: "6.5 ÷ 2 = 3 あまり 0.5" },
    { id: "step4", position: 4, questionText: "$4.75$ m のひもを $1$ m ずつ切ります。$4$ 本切れたとき、余りは何 m ですか？", answer: 0.75, unit: "m", unknownLabel: "余り", variationFromPrevious: "plus_alpha", compareWithStepId: "step3", hints: [
      { layer: 1, text: "前題と比べてみよう。余りを読む位がさらに細かくなっている。" },
      { layer: 2, text: "変わったのは、もとの量が小数第二位まであること。" },
      { layer: 3, text: "$4.75 - 1 \\times 4 = 0.75$。余りは $0.75$ m。" },
    ], formulaPreview: "4.75 ÷ 1 = 4 あまり 0.75" },
    { id: "step5", position: 5, questionText: "$2$ m ずつ切って $3$ 本でき、余りが $0.4$ m でした。もとの長さは何 m ですか？", answer: 6.4, unit: "m", unknownLabel: "もとの長さ", variationFromPrevious: "inverse", compareWithStepId: "step3", hints: [
      { layer: 1, text: "前題と比べてみよう。今度は余りから全体へ戻っている。" },
      { layer: 2, text: "変わったのは求める向き。切った分と余りを合わせる。" },
      { layer: 3, text: "$2 \\times 3 + 0.4 = 6.4$。もとの長さは $6.4$ m。" },
    ], formulaPreview: "2 × 3 + 0.4 = 6.4" },
    { id: "step6", position: 6, questionText: "$3$ L ずつ入れて $2$ 本でき、余りが $0.9$ L でした。全部で何 L ですか？", answer: 6.9, unit: "L", unknownLabel: "全部の量", variationFromPrevious: "same", compareWithStepId: "step5", hints: [
      { layer: 1, text: "前題と比べてみよう。まとまりの分と余りを合わせるところは同じ。" },
      { layer: 2, text: "変わったのは、一つ分と余りの量。" },
      { layer: 3, text: "$3 \\times 2 + 0.9 = 6.9$。全部で $6.9$ L。" },
    ], formulaPreview: "3 × 2 + 0.9 = 6.9" },
    { id: "step7", position: 7, questionText: "$5.6$ m を $0.8$ m ずつ切ります。$7$ 本切れて余りがないとき、余りは何 m ですか？", answer: 0, unit: "m", unknownLabel: "余り", variationFromPrevious: "qualitative", compareWithStepId: "step1", hints: [
      { layer: 1, text: "前題までと比べてみよう。今度は、わる数も小数になっている。" },
      { layer: 2, text: "変わったのは、一つ分が小数で、余りがない場合を読むこと。" },
      { layer: 3, text: "$0.8 \\times 7 = 5.6$。全体と同じなので、余りは $0$ m。" },
    ], formulaPreview: "5.6 ÷ 0.8 = 7 あまり 0" },
    { id: "step8", position: 8, questionText: "$5.9$ m を $0.8$ m ずつ切ります。$7$ 本切れたとき、余りは何 m ですか？", answer: 0.3, unit: "m", unknownLabel: "余り", variationFromPrevious: "same", compareWithStepId: "step7", hints: [
      { layer: 1, text: "前題と比べてみよう。小数の一つ分で切るところは同じ。何が変わった？" },
      { layer: 2, text: "変わったのは、全体の量が少し増えたこと。" },
      { layer: 3, text: "$0.8 \\times 7 = 5.6$。$5.9 - 5.6 = 0.3$ なので、余りは $0.3$ m。" },
    ], formulaPreview: "5.9 ÷ 0.8 = 7 あまり 0.3" },
    { id: "step9", position: 9, questionText: "$7.4$ kg を $1.2$ kg ずつ袋に入れます。$6$ 袋できたとき、余りは何 kg ですか？", answer: 0.2, unit: "kg", unknownLabel: "余り", variationFromPrevious: "plus_alpha", compareWithStepId: "step8", hints: [
      { layer: 1, text: "前題と比べてみよう。わる数が一より大きい小数になっている。" },
      { layer: 2, text: "変わったのは、一つ分の大きさ。" },
      { layer: 3, text: "$1.2 \\times 6 = 7.2$。$7.4 - 7.2 = 0.2$ なので、余りは $0.2$ kg。" },
    ], formulaPreview: "7.4 ÷ 1.2 = 6 あまり 0.2" },
    { id: "step10", position: 10, questionText: "$6.85$ L を $1.2$ L ずつ入れます。$5$ 本分入れたとき、余りは何 L ですか？", answer: 0.85, unit: "L", unknownLabel: "余り", variationFromPrevious: "composite", compareWithStepId: "step9", hints: [
      { layer: 1, text: "前題と比べてみよう。わる数が小数で、余りの位も細かいところが重なっている。" },
      { layer: 2, text: "変わったのは、もとの量が小数第二位まであること。" },
      { layer: 3, text: "$1.2 \\times 5 = 6.0$。$6.85 - 6.0 = 0.85$ なので、余りは $0.85$ L。" },
    ], formulaPreview: "6.85 ÷ 1.2 = 5 あまり 0.85" },
  ],
};

/* ===== 6. 整数の見方（最小公倍数） ===== */

export const E5_LCM_SERIES: LearnerSeries = {
  id: "e5_lcm_01",
  title: "最小公倍数",
  subtitle: "2つの数の最小公倍数を求める5問。倍数を順に書き出してみよう。",
  patternId: "EL6",
  unit: "elementary_5",
  revelationLabel: "両方の数の倍数の中で、いちばん小さい共通のもの",
  derivation: `**最小公倍数とは何か**

2 つの数の **最小公倍数** とは、「**両方の数の倍数のうち、いちばん小さい数**」。

たとえば 4 と 6 の最小公倍数。

- 4 の倍数：$4, 8, 12, 16, 20, 24, 28, \\ldots$
- 6 の倍数：$6, 12, 18, 24, 30, \\ldots$

**共通する倍数**：$12, 24, 36, \\ldots$
そのうち **いちばん小さい** のは **12** → これが最小公倍数（LCM）。

**素因数分解で求める**

並べていくのは大変なので、もっと早い方法があります。**素因数分解** して、**各素数の指数の最大値** を取る。

$4 = 2^2$
$6 = 2 \\times 3$

最小公倍数 = $2^{\\max(2, 1)} \\times 3^{\\max(0, 1)} = 2^2 \\times 3 = 12$

「**両方を覆える、最小の素因数の集まり**」——これが最小公倍数の本質です。

**最大公約数との関係**

「最小公倍数」と一緒に習うのが「**最大公約数**」（GCD）。これは「**両方の数の約数のうち、いちばん大きい数**」。

4 と 6 の場合：

- 4 の約数：$1, 2, 4$
- 6 の約数：$1, 2, 3, 6$

共通する約数：$1, 2$
最大は **2** → 最大公約数。

最大公約数と最小公倍数には、美しい関係があります：

$$\\text{LCM}(a, b) \\times \\text{GCD}(a, b) = a \\times b$$

たとえば $\\text{LCM}(4, 6) \\times \\text{GCD}(4, 6) = 12 \\times 2 = 24$、$4 \\times 6 = 24$。一致！

これは「素因数の重なる部分（GCD）と独立な部分（残り）の関係」から来ています。

**応用：周期の問題**

最小公倍数は **周期の問題** で大活躍します。

例：「ライト A は 8 秒ごとに点滅、ライト B は 12 秒ごとに点滅。同時に光るのは何秒ごと？」

→ **lcm(8, 12) = 24 秒ごと**

両方のリズムが **重なる最小の時間**——これが最小公倍数の意味。

**応用：分数の通分**

分数の足し算で **通分** するときに、分母の最小公倍数が使われます：

$$\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$$

「**両方の分母を覆える、最小の分母**」が必要——これが最小公倍数。

**ユークリッドの互除法**

大きな数の最大公約数（そして最小公倍数）を求めるには、**ユークリッドの互除法** という古典的なアルゴリズムがあります。

「大きい数を小さい数で割って、余りを取る」を繰り返すだけ。**紀元前 3 世紀** にユークリッドが書いた『原論』に登場する、2300 年以上前のアルゴリズムです。

**整数の世界の地図**

最小公倍数と最大公約数は、整数の世界での **基本道具**：

- 分数の計算
- 周期問題
- 暗号理論（公開鍵暗号 RSA）

「2 つの数の関係」を測るうえで、これら 2 つは欠かせません。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "2 と 3 の最小公倍数はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "2 の倍数：2, 4, 6, 8, 10…／3 の倍数：3, 6, 9, 12…" },
        { layer: 2, text: "両方にあるいちばん小さい数は？" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "lcm(2, 3) = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "3 と 4 の最小公倍数はいくつでしょう？",
      answer: 12, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ手順。" },
        { layer: 2, text: "3 の倍数：3, 6, 9, 12…／4 の倍数：4, 8, 12…" },
        { layer: 3, text: "12。" },
      ],
      formulaPreview: "lcm(3, 4) = 12",
    },
    {
      id: "step3", position: 3,
      questionText: "4 と 6 の最小公倍数はいくつでしょう？",
      answer: 12, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "4 の倍数：4, 8, 12…／6 の倍数：6, 12…" },
        { layer: 2, text: "共通でいちばん小さいのは？" },
        { layer: 3, text: "12。" },
      ],
      formulaPreview: "lcm(4, 6) = 12",
    },
    {
      id: "step4", position: 4,
      questionText: "6 と 9 の最小公倍数はいくつでしょう？",
      answer: 18, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "6 の倍数：6, 12, 18…／9 の倍数：9, 18…" },
        { layer: 2, text: "共通の最小は？" },
        { layer: 3, text: "18。" },
      ],
      formulaPreview: "lcm(6, 9) = 18",
    },
    {
      id: "step5", position: 5,
      questionText: "8 秒ごとに点滅するライト A と、12 秒ごとに点滅するライト B が同時に光るのは何秒ごとでしょう？",
      answer: 24, unit: "秒", unknownLabel: "周期",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "「同時に光る」=「両方の倍数」。最小公倍数を求める。" },
        { layer: 2, text: "8 の倍数：8, 16, 24…／12 の倍数：12, 24…" },
        { layer: 3, text: "24 秒ごと。" },
      ],
      formulaPreview: "lcm(8, 12) = 24",
    },
  ],
};

/* ===== 7. 分数のたし算 ===== */

export const E5_FRACTION_ADD_SERIES: LearnerSeries = {
  id: "e5_fraction_add_01",
  title: "分数のたし算（通分）",
  subtitle:
    "通分して足し算する5問。答えは最簡分数にした時の「分子」を答える。",
  patternId: "EL7",
  unit: "elementary_5",
  revelationLabel: "分母を揃えて足し算（通分）。最後に約分",
  derivation: `**分数のたし算は「同じ大きさのピース」を数える**

$\\dfrac{1}{2} + \\dfrac{1}{3}$ は、$\\dfrac{2}{5}$ ではありません。なぜなら、$\\dfrac{1}{2}$ と $\\dfrac{1}{3}$ は **大きさの違うピース** を表しているからです。

**ピザで考える**

$\\dfrac{1}{2}$ は「2 等分したうちの 1 切れ」。$\\dfrac{1}{3}$ は「3 等分したうちの 1 切れ」。大きさが違うピースを、そのまま「1 切れ + 1 切れ = 2 切れ」と数えても、何のピースになるかわかりません。

そこで、**ピースの大きさを揃える** 必要があります。

**通分とは「同じ大きさのピースに変換」**

両方を 6 等分のピースに直すと：

- $\\dfrac{1}{2} = \\dfrac{3}{6}$（6 等分のうち 3 切れ）
- $\\dfrac{1}{3} = \\dfrac{2}{6}$（6 等分のうち 2 切れ）

これで **同じピース** になりました。あとは「3 切れ + 2 切れ = 5 切れ」と数えるだけ：

$$\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$$

**なぜ「6」を選ぶか**

「2 等分でも 3 等分でも切れる」、つまり **両方を表せる最小の分母** が 6。

これは **2 と 3 の最小公倍数**：$\\text{lcm}(2, 3) = 6$。

通分するときは、**分母の最小公倍数** を使うのが基本です。

**手順をまとめる**

1. 両方の分母の **最小公倍数** を見つける
2. 各分数の **分母と分子の両方** にちょうど良い数を掛けて、分母を揃える
3. **分子だけ** を足し算する（分母はそのまま）
4. 最後に **約分** できれば約分する

例：$\\dfrac{1}{4} + \\dfrac{1}{6}$

- 分母の lcm = 12
- $\\dfrac{1}{4} = \\dfrac{3}{12}$、$\\dfrac{1}{6} = \\dfrac{2}{12}$
- $\\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}$（これ以上約分できない）

**約分とは「同じ大きさを別の言い方で」**

$\\dfrac{6}{12}$ と $\\dfrac{1}{2}$ は **同じ大きさ**。「12 等分の 6 切れ」と「2 等分の 1 切れ」は、ピザの量としては同じ。

分母と分子を同じ数で割ることを **約分** といい、いちばん簡単な形にするのが慣例です。

**ひき算も同じ**

引き算も発想は同じ：通分してから分子を引く：

$$\\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{3}{6} - \\dfrac{2}{6} = \\dfrac{1}{6}$$

**かけ算は通分しない**

注意：分数の **かけ算** では通分しません。**分子どうし**、**分母どうし** を掛けます：

$$\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1 \\times 1}{2 \\times 3} = \\dfrac{1}{6}$$

「$\\dfrac{1}{2}$ の $\\dfrac{1}{3}$ は、$\\dfrac{1}{6}$」——量の話としても直感的。

**割り算は「ひっくり返して掛ける」**

そして割り算は、**逆数を掛ける**：

$$\\dfrac{1}{2} \\div \\dfrac{1}{3} = \\dfrac{1}{2} \\times \\dfrac{3}{1} = \\dfrac{3}{2}$$

「$\\dfrac{1}{2}$ の中に $\\dfrac{1}{3}$ がいくつあるか」と問うと、$\\dfrac{3}{2} = 1.5$ 個。

**分数の本質：「量を分割する」道具**

分数は「整数では表せない量」を扱うための、人類が発明した便利な記号。$\\dfrac{1}{2}, \\dfrac{1}{3}, \\dfrac{1}{4}, \\ldots$ という単位分数の組み合わせで、有限の整数以上の柔軟さを得ました。

**通分** は分数たし算の核心。「同じ単位で測り直す」ことで、初めて足し算が可能になります。これは「単位を揃える」という、量を扱うすべての世界の基本原則です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "$\\dfrac{1}{2} + \\dfrac{1}{3}$ を計算した答えを最簡分数にした時の分子はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "分子",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "分母を 6 に揃える：$\\dfrac{3}{6} + \\dfrac{2}{6}$。" },
        { layer: 2, text: "$\\dfrac{3+2}{6} = \\dfrac{5}{6}$。" },
        { layer: 3, text: "分子は 5。" },
      ],
      formulaPreview: "3/6 + 2/6 = 5/6",
    },
    {
      id: "step2", position: 2,
      questionText:
        "$\\dfrac{1}{3} + \\dfrac{1}{6}$ を計算した答えを最簡分数にした時の分子はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "分子",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "分母を 6 に：$\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6}$。" },
        { layer: 2, text: "約分すると $\\dfrac{1}{2}$。" },
        { layer: 3, text: "分子は 1。" },
      ],
      formulaPreview: "3/6 = 1/2",
    },
    {
      id: "step3", position: 3,
      questionText:
        "$\\dfrac{1}{4} + \\dfrac{1}{6}$ を計算した答えを最簡分数にした時の分子はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "分子",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "分母を 12 に：$\\dfrac{3}{12} + \\dfrac{2}{12}$。" },
        { layer: 2, text: "$\\dfrac{5}{12}$。" },
        { layer: 3, text: "分子は 5。" },
      ],
      formulaPreview: "3/12 + 2/12 = 5/12",
    },
    {
      id: "step4", position: 4,
      questionText:
        "$\\dfrac{2}{3} + \\dfrac{1}{6}$ を計算した答えを最簡分数にした時の分子はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "分子",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "分母を 6 に：$\\dfrac{4}{6} + \\dfrac{1}{6}$。" },
        { layer: 2, text: "$\\dfrac{5}{6}$。" },
        { layer: 3, text: "分子は 5。" },
      ],
      formulaPreview: "4/6 + 1/6 = 5/6",
    },
    {
      id: "step5", position: 5,
      questionText:
        "ジュースが $\\dfrac{1}{2}$ L と $\\dfrac{1}{4}$ L あります。合わせて何 L？ 最簡分数の分子はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "分子",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$\\dfrac{1}{2} + \\dfrac{1}{4}$ を計算。" },
        { layer: 2, text: "$\\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$。" },
        { layer: 3, text: "分子は 3。" },
      ],
      formulaPreview: "2/4 + 1/4 = 3/4",
    },
  ],
};

/* ===== 9. 平均 ===== */

export const E5_MEAN_SERIES: LearnerSeries = {
  id: "e5_mean_01",
  title: "平均",
  subtitle: "3つの数の平均を求める5問。「ならす」感覚をつかむ。",
  patternId: "EL8",
  unit: "elementary_5",
  revelationLabel: "全部足して、個数で割る",
  derivation: `**平均は「ならして全部同じにしたら、いくつ？」**

3 つの数 $6, 8, 10$ の平均は：

$$(6 + 8 + 10) \\div 3 = 24 \\div 3 = 8$$

「**全部足して、個数で割る**」——これが平均の計算。なぜこれで「ならした値」が出るのか？

**棒グラフで考える**

3 本の棒が $6, 8, 10$ の高さで立っているとします。これらを **平らにならす** と、すべての棒が同じ高さになります。その高さが **平均**。

「合計の高さは変わらないまま、3 本の棒を同じ高さに分け直す」と考えると、

$$\\text{合計} \\div \\text{本数} = \\text{ならした高さ}$$

これが平均の意味です。

**「水の高さ」のアナロジー**

別の見方：3 つのコップに違う量の水が入っているとします。水を **混ぜて 3 つに均等に分け直す** と、それぞれのコップに入る量が平均。

「合計の量を、本数で割って均等にする」——これも平均。

**たとえば**

3 つのテストの点数 $70, 80, 90$ の平均：

$$70 + 80 + 90 = 240$$

$$240 \\div 3 = 80$$

「3 回のテストでだいたい 80 点くらい取れている」——直感的な「だいたい」を表現するのが平均です。

**個数が変わっても同じ**

| 個数 | 数 | 平均 |
|---|---|---|
| 3 個 | $6, 8, 10$ | $(6+8+10)/3 = 8$ |
| 4 個 | $5, 7, 9, 11$ | $(5+7+9+11)/4 = 8$ |
| 5 個 | $4, 6, 8, 10, 12$ | $(4+6+8+10+12)/5 = 8$ |

どれも合計を個数で割れば平均。個数が変わっても **公式の形は同じ**：

$$\\text{平均} = \\frac{\\text{合計}}{\\text{個数}}$$

**「ハズレ値」に弱い**

平均には弱みがあります。**極端な値** に引っ張られやすいのです。

例：5 人のお小遣い $1000, 1000, 1000, 1000, 100000$ 円。
- 平均：$\\dfrac{104000}{5} = 20800$ 円

でも「ふつうの人」は 1000 円もらっています。平均だけ見ると「実態を反映しない」ことがあるのです。

このようなときは **中央値**（並べて真ん中の値）も併せて見ると、データの実感が伝わりやすい。

**平均が大活躍する場面**

- **学校のテスト**：クラスの平均点
- **天気**：1 ヶ月の平均気温
- **スポーツ**：野球の打率（ヒット ÷ 打席）
- **品質管理**：製品の平均寸法

「**全体的にだいたい**」を表現したいとき、平均は最も基本的な道具。

**平均と比例の関係**

「単位量あたりの大きさ」は、平均と本質的に同じ：

- 速さ＝道のり÷時間 → 1 時間あたり「平均で」何 km 進む
- 1 個あたりの値段 → 全体的に「平均で」1 個いくらか

**ならして同じにする** という発想は、量を比べる世界の根本にあります。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "3 つの数 6, 8, 10 の平均はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "平均",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "全部足して 3 で割る。" },
        { layer: 2, text: "$6 + 8 + 10 = 24$。" },
        { layer: 3, text: "$24 \\div 3 = 8$。" },
      ],
      formulaPreview: "24 ÷ 3 = 8",
    },
    {
      id: "step2", position: 2,
      questionText: "3 つの数 4, 8, 12 の平均はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "やり方は同じ。" },
        { layer: 2, text: "$4 + 8 + 12 = 24$。" },
        { layer: 3, text: "$24 \\div 3 = 8$。" },
      ],
      formulaPreview: "24 ÷ 3 = 8",
    },
    {
      id: "step3", position: 3,
      questionText: "3 つの数 5, 10, 15 の平均はいくつでしょう？",
      answer: 10, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "全部足して 3 で割る。" },
        { layer: 2, text: "$5 + 10 + 15 = 30$。" },
        { layer: 3, text: "$30 \\div 3 = 10$。" },
      ],
      formulaPreview: "30 ÷ 3 = 10",
    },
    {
      id: "step4", position: 4,
      questionText: "3 つの数 9, 12, 18 の平均はいくつでしょう？",
      answer: 13, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$9 + 12 + 18 = 39$。" },
        { layer: 3, text: "$39 \\div 3 = 13$。" },
      ],
      formulaPreview: "39 ÷ 3 = 13",
    },
    {
      id: "step5", position: 5,
      questionText: "テストの 3 回の点数が 70, 80, 90 点でした。平均は何点でしょう？",
      answer: 80, unit: "点", unknownLabel: "平均点",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "「点」がついただけ。やり方は同じ。" },
        { layer: 2, text: "$70 + 80 + 90 = 240$。" },
        { layer: 3, text: "$240 \\div 3 = 80$ 点。" },
      ],
      formulaPreview: "240 ÷ 3 = 80",
    },
  ],
};

/* ===== 10. 単位量あたり（速さ） ===== */

export const E5_SPEED_SERIES: LearnerSeries = {
  id: "e5_speed_01",
  title: "速さ（道のり ÷ 時間）",
  subtitle: "道のりと時間から速さを求める5問。「1時間あたり何 km か」。",
  patternId: "EL9",
  unit: "elementary_5",
  revelationLabel: "速さ = 道のり ÷ 時間",
  derivation: `**「速さ」は「1 時間あたりの道のり」**

「時速 60 km」とは、「**1 時間あたり** 60 km 進む」という意味。だから速さは：

$$\\text{速さ} = \\frac{\\text{道のり}}{\\text{時間}}$$

「**全体の道のりを、時間で割る**」——「1 つあたり」の発想がそのまま生きています。

**3 つの公式は同じ関係**

速さ・道のり・時間の関係は、3 つの形で書けます：

| 求めるもの | 公式 |
|---|---|
| 速さ | 速さ = 道のり ÷ 時間 |
| 道のり | 道のり = 速さ × 時間 |
| 時間 | 時間 = 道のり ÷ 速さ |

実はこれらは **同じ関係式の 3 つの顔**。たとえば「速さ = 道のり ÷ 時間」の両辺に「時間」を掛けると、「速さ × 時間 = 道のり」になります。

**は・じ・き、み・は・じ**

学校で「**速さ × 時間 = 道のり**」を覚えるとき、「**は・じ・き**」（速さ・時間・距離）や「**み・は・じ**」（道のり・速さ・時間）と呼ぶ図を使います。横棒の上に「道のり」、下に「速さ × 時間」と並べて、求めたいものを **隠す** と、残りの 2 つの計算が出てくる仕組み。実用的な覚え方として広く使われています。

**「単位量あたり」のもう一つの例**

速さは「**単位量あたりの大きさ**」というカテゴリの一例です：

| 概念 | 「単位」量 | 計算 |
|---|---|---|
| 速さ | 1 時間（または 1 秒） | 道のり ÷ 時間 |
| 人口密度 | 1 km² | 人口 ÷ 面積 |
| 1 枚あたりの値段 | 1 枚 | 代金 ÷ 枚数 |
| 燃費 | 1 リットル | 走った距離 ÷ 使った燃料 |

「**○○あたりの□□**」という言い回しは、すべて同じ発想：割り算で 1 つあたりの量を出しています。

**速さと比例**

「同じ速さで進むとき、時間と道のりは **比例** する」——これも重要な見方。

時速 60 km なら：

| 時間 | 道のり |
|---|---|
| 1 時間 | 60 km |
| 2 時間 | 120 km |
| 3 時間 | 180 km |

時間が 2 倍になれば道のりも 2 倍。**比例定数が速さ** です。

**単位の変換**

速さの単位はいろいろあります：

- 時速（km/時）：1 時間あたりの km
- 分速（m/分）：1 分あたりの m
- 秒速（m/秒）：1 秒あたりの m

たとえば「時速 60 km」を「秒速 ◯ m」に直すと：

$$60 \\text{km/時} = 60{,}000 \\text{m/}3{,}600 \\text{秒} = 約 16.7 \\text{m/秒}$$

「**km を m に、時を 秒 に**」変換するだけ。単位の管理さえ慎重なら、難しくありません。

**応用：旅人算・追いつき問題**

複雑な「旅人算」（2 人が出会う・追いつく問題）も、結局すべて「速さ × 時間 = 道のり」の応用です。

- **出会い算**：2 人の **速さの和** で距離を割る
- **追いつき算**：2 人の **速さの差** で距離を割る

すべて「単位時間あたり、どれだけ距離が縮まるか」という発想です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "120km を 2 時間で走る車の速さは時速何 km でしょう？",
      answer: 60, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "「1 時間あたり何 km か」を求める。" },
        { layer: 2, text: "$120 \\div 2$。" },
        { layer: 3, text: "60 km/時。" },
      ],
      formulaPreview: "120 ÷ 2 = 60",
    },
    {
      id: "step2", position: 2,
      questionText: "240km を 3 時間で走る車の速さは時速何 km でしょう？",
      answer: 80, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "同じ公式。" },
        { layer: 2, text: "$240 \\div 3$。" },
        { layer: 3, text: "80 km/時。" },
      ],
      formulaPreview: "240 ÷ 3 = 80",
    },
    {
      id: "step3", position: 3,
      questionText: "300km を 5 時間で走る車の速さは時速何 km でしょう？",
      answer: 60, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "道のり ÷ 時間。" },
        { layer: 2, text: "$300 \\div 5$。" },
        { layer: 3, text: "60 km/時。" },
      ],
      formulaPreview: "300 ÷ 5 = 60",
    },
    {
      id: "step4", position: 4,
      questionText: "420km を 6 時間で走る車の速さは時速何 km でしょう？",
      answer: 70, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$420 \\div 6$。" },
        { layer: 2, text: "70。" },
        { layer: 3, text: "70 km/時。" },
      ],
      formulaPreview: "420 ÷ 6 = 70",
    },
    {
      id: "step5", position: 5,
      questionText: "200m を 50 秒で走る人の速さは秒速何 m でしょう？",
      answer: 4, unit: "m/秒", unknownLabel: "速さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "「時速」が「秒速」に変わっただけ。仕組みは同じ。" },
        { layer: 2, text: "$200 \\div 50$。" },
        { layer: 3, text: "4 m/秒。" },
      ],
      formulaPreview: "200 ÷ 50 = 4",
    },
  ],
};

/* ===== 11. 多角形の角 ===== */

export const E5_POLYGON_ANGLE_SERIES: LearnerSeries = {
  id: "e5_polygon_angle_01",
  title: "多角形の内角の和",
  subtitle: "n 角形の内角の和を求める5問。三角形に分けて考える。",
  patternId: "EL10",
  unit: "elementary_5",
  revelationLabel: "(辺の数 − 2) × 180°",
  derivation: `**多角形を三角形に分けてみよう**

三角形の内角の和は **180°**——これは小4で習います。

では、四角形・五角形・六角形…の内角の和はどう求めればよいか？

「**多角形を三角形に分けて、その個数 × 180° を計算する**」——これが今回の公式の正体です。

**四角形を分けてみる**

四角形には対角線が引けます。1本の対角線で **三角形が 2 つ** に分かれます。

四角形の内角は、この 2 つの三角形の内角の和を全部足したもの。だから：

$$\\text{四角形の内角の和} = 2 \\times 180° = 360°$$

**五角形を分けてみる**

五角形の1つの頂点から、他のすべての頂点に向けて対角線を引きます。すると五角形は **三角形 3 つ** に分かれます。だから：

$$\\text{五角形の内角の和} = 3 \\times 180° = 540°$$

**規則を見つける**

| 多角形 | 辺の数 $n$ | 分けられる三角形の数 | 内角の和 |
|---|---|---|---|
| 三角形 | 3 | 1 | 180° |
| 四角形 | 4 | 2 | 360° |
| 五角形 | 5 | 3 | 540° |
| 六角形 | 6 | 4 | 720° |
| $n$ 角形 | $n$ | $n - 2$ | $(n-2) \\times 180°$ |

「**辺の数より 2 つ少ない** 個数の三角形ができる」——これが規則。

なぜ「$-2$」なのかというと、1つの頂点から対角線を引くとき、自分自身と隣の2点（左右の隣）には対角線が引けないからです。だから対角線は $n - 3$ 本、それで三角形は $n - 2$ 個に分かれます。

**公式の完成**

$$(\\text{内角の和}) = (n - 2) \\times 180°$$

「辺の数から 2 を引いて、180 をかける」——これだけ覚えれば、何角形でも一瞬で内角の和が出ます。

**外角の和は、何角形でも 360°**

おまけの話。実は **多角形の外角の和** は、何角形でも **必ず 360°** になります。

例えば五角形の外角を全部足すと、内角の和との関係から：

$$\\text{外角の和} = n \\times 180° - \\text{内角の和} = n \\times 180° - (n-2) \\times 180° = 360°$$

辺の数によらず一定。これは、多角形のまわりを1周歩いたとき、向きが360°回転することと結びついています。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "三角形（3角形）の内角の和は何度でしょう？",
      answer: 180, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$(n - 2) \\times 180°$。三角形は $n = 3$。" },
        { layer: 2, text: "$(3 - 2) \\times 180°$。" },
        { layer: 3, text: "180°。" },
      ],
      formulaPreview: "(3-2)×180 = 180",
    },
    {
      id: "step2", position: 2,
      questionText: "四角形の内角の和は何度でしょう？",
      answer: 360, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$n = 4$。三角形 2 個に分けられる。" },
        { layer: 2, text: "$(4 - 2) \\times 180°$。" },
        { layer: 3, text: "360°。" },
      ],
      formulaPreview: "(4-2)×180 = 360",
    },
    {
      id: "step3", position: 3,
      questionText: "五角形の内角の和は何度でしょう？",
      answer: 540, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$n = 5$。三角形 3 個に分けられる。" },
        { layer: 2, text: "$(5 - 2) \\times 180°$。" },
        { layer: 3, text: "540°。" },
      ],
      formulaPreview: "(5-2)×180 = 540",
    },
    {
      id: "step4", position: 4,
      questionText: "六角形の内角の和は何度でしょう？",
      answer: 720, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$n = 6$。" },
        { layer: 2, text: "$(6 - 2) \\times 180°$。" },
        { layer: 3, text: "720°。" },
      ],
      formulaPreview: "(6-2)×180 = 720",
    },
    {
      id: "step5", position: 5,
      questionText: "八角形の内角の和は何度でしょう？",
      answer: 1080, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "公式は同じ。$n = 8$。" },
        { layer: 2, text: "$(8 - 2) \\times 180°$。" },
        { layer: 3, text: "1080°。" },
      ],
      formulaPreview: "(8-2)×180 = 1080",
    },
  ],
};

/* ===== 12. 合同な図形 ===== */

export const E5_CONGRUENT_FIGURES_SERIES: LearnerSeries = {
  id: "e5_congruent_figures_01",
  title: "合同な図形",
  subtitle:
    "ぴったり重なる図形で、対応する辺・角を読む10問。三角形から四角形まで。",
  patternId: "EL10G",
  unit: "elementary_5",
  revelationLabel: "合同な図形では、対応する辺の長さ・角の大きさが等しい",
  drivingQuestion:
    "動かしたり裏返したりしても変わらないものを見れば、図形が同じ形だとどこまで言える？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 ABC と三角形 DEF は合同で、対応は $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ です。辺 AB が 6cm のとき、対応する辺 DE は何 cm でしょう？",
      answer: 6,
      unit: "cm",
      unknownLabel: "辺 DE",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "2つの図形がぴったり重なるとき、重なる辺どうしの長さはどうなる？ 対応する点の組をたどってみよう。",
        },
        {
          layer: 2,
          text:
            "$A$ は $D$、$B$ は $E$ に重なる。だから辺 $AB$ と重なる辺は、$D$ と $E$ を結ぶ辺。",
        },
        {
          layer: 3,
          text:
            "合同な図形では、対応する辺の長さは等しい。$A \\leftrightarrow D$, $B \\leftrightarrow E$ なので、辺 $AB$ に対応するのは辺 $DE$。したがって $DE = AB = 6$ cm。",
        },
      ],
      formulaPreview: "AB = DE = 6",
      figureMarker: "<<CONGRUENCE_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 ABC と三角形 DEF は合同で、対応は $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ です。辺 BC が 5cm のとき、対応する辺 EF は何 cm でしょう？",
      answer: 5,
      unit: "cm",
      unknownLabel: "辺 EF",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。合同で、対応する辺の長さを読むところは同じ。どの辺が変わった？",
        },
        {
          layer: 2,
          text:
            "変わったのは、見る辺が $AB$ から $BC$ になったことだけ。$B$ と $C$ は、それぞれどの点に重なる？",
        },
        {
          layer: 3,
          text:
            "前題と同じく、対応する点をたどる。$B \\leftrightarrow E$, $C \\leftrightarrow F$ なので、辺 $BC$ に対応するのは辺 $EF$。合同だから $EF = BC = 5$ cm。",
        },
      ],
      formulaPreview: "BC = EF = 5",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "三角形 ABC と三角形 DEF は合同で、対応は $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ です。$\\angle B$ が 65° のとき、対応する $\\angle E$ は何度でしょう？",
      answer: 65,
      unit: "°",
      unknownLabel: "角 E",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。今度は辺の長さではなく、角の大きさを読んでいる。合同で変わらないものは辺だけかな？",
        },
        {
          layer: 2,
          text:
            "変わったのは、見るものが「辺」から「角」になったこと。$B$ に重なる点だけをたどろう。",
        },
        {
          layer: 3,
          text:
            "合同な図形では、対応する角の大きさも等しい。$B \\leftrightarrow E$ なので、$\\angle B$ に対応するのは $\\angle E$。したがって $\\angle E = 65°$。",
        },
      ],
      formulaPreview: "∠B = ∠E = 65°",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "三角形 ABC と三角形 PQR は合同で、対応は $A \\leftrightarrow P$, $B \\leftrightarrow Q$, $C \\leftrightarrow R$ です。辺 BC が 8cm のとき、対応する辺 QR は何 cm でしょう？",
      answer: 8,
      unit: "cm",
      unknownLabel: "辺 QR",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題までと比べてみよう。図形の名前は変わったけれど、対応する点をたどる考え方は同じ。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text:
            "変わったのは、相手の三角形の名前。$B$ と $C$ が、それぞれどの点に重なるかだけを見よう。",
        },
        {
          layer: 3,
          text:
            "対応は $B \\leftrightarrow Q$, $C \\leftrightarrow R$。だから辺 $BC$ に対応するのは辺 $QR$。合同だから $QR = BC = 8$ cm。",
        },
      ],
      formulaPreview: "BC = QR = 8",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 ABC と三角形 DEF は合同で、対応は $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ です。辺 DE が 9cm のとき、対応する辺 AB は何 cm でしょう？",
      answer: 9,
      unit: "cm",
      unknownLabel: "辺 AB",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題たちと比べてみよう。今度は、2つ目の三角形から1つ目の三角形へ逆向きに読んでいる。同じ対応を戻れる？",
        },
        {
          layer: 2,
          text:
            "変わったのは読む向きだけ。$D$ と $E$ に重なる元の点はどこか、逆にたどろう。",
        },
        {
          layer: 3,
          text:
            "$D \\leftrightarrow A$, $E \\leftrightarrow B$ なので、辺 $DE$ に対応するのは辺 $AB$。合同だから長さは等しい。したがって $AB = DE = 9$ cm。",
        },
      ],
      formulaPreview: "DE = AB = 9",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 ABC と三角形 DEF は合同で、対応は $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ です。$\\angle F$ が 40° のとき、対応する $\\angle C$ は何度でしょう？",
      answer: 40,
      unit: "°",
      unknownLabel: "角 C",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。逆向きに読むところは同じ。違うのは、辺ではなく角を読んでいること。",
        },
        {
          layer: 2,
          text:
            "変わったのは、見る対象が辺から角になったこと。$F$ に重なる元の点だけを戻ってみよう。",
        },
        {
          layer: 3,
          text:
            "$F \\leftrightarrow C$ なので、$\\angle F$ に対応するのは $\\angle C$。合同な図形では対応する角は等しいから、$\\angle C = 40°$。",
        },
      ],
      formulaPreview: "∠F = ∠C = 40°",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 ABC は、辺 AB が 5cm、辺 BC が 6cm、辺 CA が 7cm です。これと合同な三角形 DEF を、$AB \\leftrightarrow DE$, $BC \\leftrightarrow EF$, $CA \\leftrightarrow FD$ となるように作ります。DE が 5cm、EF が 6cm のとき、FD は何 cm にすればよいでしょう？",
      answer: 7,
      unit: "cm",
      unknownLabel: "辺 FD",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題までと比べてみよう。今までは「合同だと分かっている図形」から読んだ。今度は「合同に作る」側に回っている。変わらないものは何？",
        },
        {
          layer: 2,
          text:
            "変わったのは、読むだけでなく作ること。$CA$ に対応する辺が、作る三角形のどの辺かだけを見よう。",
        },
        {
          layer: 3,
          text:
            "合同に作るなら、対応する辺の長さを等しくする。対応は $CA \\leftrightarrow FD$。元の三角形で $CA = 7$ cm だから、作る三角形でも $FD = 7$ cm にすればよい。",
        },
      ],
      formulaPreview: "CA = FD = 7",
      figureMarker: "<<CONGRUENCE_STEP7>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "三角形 ABC は、辺 AB が 6cm、辺 AC が 5cm、$\\angle A$ が 50° です。これと合同な三角形 DEF を、$AB \\leftrightarrow DE$, $AC \\leftrightarrow DF$, $\\angle A \\leftrightarrow \\angle D$ となるように作ります。DE が 6cm、DF が 5cm のとき、$\\angle D$ は何度にすればよいでしょう？",
      answer: 50,
      unit: "°",
      unknownLabel: "角 D",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。合同に作るところは同じ。今度は3つ目の条件が、辺ではなく角になっている。",
        },
        {
          layer: 2,
          text:
            "変わったのは、そろえるものの1つが角になったこと。$\\angle A$ に対応する角だけを見よう。",
        },
        {
          layer: 3,
          text:
            "合同に作るには、対応する角の大きさも等しくする。$\\angle A \\leftrightarrow \\angle D$ で、$\\angle A = 50°$。だから $\\angle D = 50°$ にすればよい。",
        },
      ],
      formulaPreview: "∠A = ∠D = 50°",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "三角形 ABC と三角形 DEF は、$AB \\leftrightarrow DE$, $AC \\leftrightarrow DF$, $\\angle A \\leftrightarrow \\angle D$ となるように合同に作られました。$\\angle D$ が 50° のとき、元の $\\angle A$ は何度でしょう？",
      answer: 50,
      unit: "°",
      unknownLabel: "角 A",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。今度は作った三角形から、元の三角形へ逆向きに戻っている。対応は同じまま使える？",
        },
        {
          layer: 2,
          text:
            "変わったのは読む向きだけ。$\\angle D$ に重なる元の角はどれか、対応を逆にたどろう。",
        },
        {
          layer: 3,
          text:
            "$\\angle D \\leftrightarrow \\angle A$。合同なら対応する角は等しいので、$\\angle A = \\angle D = 50°$。前題の条件を逆向きに読んだだけ。",
        },
      ],
      formulaPreview: "∠D = ∠A = 50°",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "四角形 ABCD と四角形 EFGH は合同で、対応は $A \\leftrightarrow E$, $B \\leftrightarrow F$, $C \\leftrightarrow G$, $D \\leftrightarrow H$ です。四角形 EFGH の辺 FG が 8cm のとき、対応する元の辺 BC は何 cm でしょう？",
      answer: 8,
      unit: "cm",
      unknownLabel: "辺 BC",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。逆向きに読むところは同じ。でも、図形が三角形から四角形に変わった。対応のたどり方は変わる？",
        },
        {
          layer: 2,
          text:
            "変わったのは図形の種類。読む向きは逆のまま。$F$ と $G$ に重なる元の点だけをたどろう。",
        },
        {
          layer: 3,
          text:
            "$F \\leftrightarrow B$, $G \\leftrightarrow C$ なので、辺 $FG$ に対応する元の辺は $BC$。四角形でも合同なら対応する辺は等しい。したがって $BC = FG = 8$ cm。",
        },
      ],
      formulaPreview: "FG = BC = 8",
    },
  ],
  derivation: `**中心の問い** ｜ 動かしたり裏返したりしても変わらないものを見れば、図形が同じ形だとどこまで言える？

────────

**合同とは、ぴったり重なること。**

図形をずらしても、回しても、裏返しても、ぴったり重なるなら、それらの図形は **合同** です。場所や向きは変わっても、図形の中にある長さや角は変わりません。

この系列では、合同な図形を「見た目が同じ」とだけ言わず、**対応する点をたどる**ことで読む練習をしました。

<<CONGRUENCE_STEP1>>

**1. 対応する点をたどる**

三角形 $ABC$ と三角形 $DEF$ で、

$$A \\leftrightarrow D,\\quad B \\leftrightarrow E,\\quad C \\leftrightarrow F$$

なら、辺や角の対応はこう決まります。

| 元の図形 | 対応する図形 |
|---|---|
| 辺 $AB$ | 辺 $DE$ |
| 辺 $BC$ | 辺 $EF$ |
| 辺 $CA$ | 辺 $FD$ |
| $\\angle A$ | $\\angle D$ |
| $\\angle B$ | $\\angle E$ |
| $\\angle C$ | $\\angle F$ |

**2. 合同で変わらないもの**

合同な図形では、対応する辺の長さと、対応する角の大きさが等しくなります。

$$AB = DE,\\quad BC = EF,\\quad CA = FD$$

$$\\angle A = \\angle D,\\quad \\angle B = \\angle E,\\quad \\angle C = \\angle F$$

大事なのは、ただ「同じ形」と見るのではなく、**どことどこが重なるか**を1つずつたどることです。

**3. 読むことから、作ることへ**

後半では、合同な図形を作る側に回りました。合同に作るとは、対応する辺や角をそろえることです。

三角形なら、たとえば：

- 3つの辺をそろえる
- 2つの辺と、その間の角をそろえる

と、ぴったり重なる形を作れます。

<<CONGRUENCE_STEP7>>

**4. 三角形から四角形へ**

三角形でも四角形でも、合同の読み方は同じです。

1. 対応する点を見る
2. その点を結ぶ辺をたどる
3. 対応する辺や角は等しいと読む

図形が増えても、向きが変わっても、この順番は変わりません。

**問いに戻ると**

動かしたり裏返したりしても変わらないものは、対応する辺の長さと角の大きさです。だから合同な図形では、見えている1つの長さや角から、対応する相手の長さや角を言い当てられる。合同とは、**図形の位置ではなく、図形の中の関係が同じである**という考え方です。`,
};

/* ===== 13. 正多角形と円（円周） ===== */

export const E5_CIRCUMFERENCE_SERIES: LearnerSeries = {
  id: "e5_circumference_01",
  title: "円周の長さ",
  subtitle:
    "直径から円周を求める5問。$\\pi$ は 3.14 として計算。",
  patternId: "EL11",
  unit: "elementary_5",
  revelationLabel: "円周 = 直径 × 3.14（直径に比例）",
  derivation: `**「3.14」って何の数？**

円周の長さ = **直径 × 3.14**。この「**3.14**」は何の数でしょうか？

実はこれは、**「どんな円でも、円周が直径の何倍になっているか」** という比です。

**身近な実験で確かめられる**

紙のお皿でも、ペットボトルのキャップでも、円い形のものなら何でもいい。その「まわりの長さ（円周）」をひもで測って、「直径（まんなかを通る長さ）」で割ってみてください。

どんな大きさの円でも、必ず **約 3.14** になります。

**これが円周率（$\\pi$）**

「円周 ÷ 直径」の値は、円の大きさによらず一定で、ギリシャ文字の $\\pi$（パイ）で表します。

$$\\pi = 3.14159265358979\\ldots$$

実はこの数は終わりがなく、しかも繰り返しもありません。だから小学校では「だいたい $3.14$」として扱いますが、本当はもっとずっと細かい数なのです。

**公式の意味**

$$\\text{円周} = \\text{直径} \\times \\pi$$

「直径を $\\pi$ 倍する」だけ。半径 $r$ で書くと、直径は $2r$ なので：

$$\\text{円周} = 2 \\pi r$$

円周の長さは **直径に比例** します。直径が 2 倍になれば、円周も 2 倍。「比例の関係」がここでもまた出てきます。

**$\\pi$ はどこから来たか**

紀元前のエジプトやバビロニアでは、すでに「円周は直径の3倍と少し」だと知られていました。アルキメデス（紀元前3世紀）は、円の中と外に多角形を描いて、$\\pi$ が $3.140\\ldots$ と $3.142\\ldots$ の間にあることを示しました。

現代では、コンピュータで何兆桁も計算されていますが、規則的な繰り返しは見つかっていません。「**シンプルな円の中に、無限に続く数が隠れている**」——これが $\\pi$ の不思議です。

**面積もこの $\\pi$ から**

円の面積も $\\pi$ を使って表せます：

$$\\text{円の面積} = \\pi \\times r^2$$

円周も面積も、$\\pi$ が出てくる。「**円の世界の鍵となる数**」が $\\pi$ です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "直径 10cm の円の円周は何 cm でしょう？",
      answer: 31.4, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：円周 = 直径 × 3.14。" },
        { layer: 2, text: "$10 \\times 3.14$。" },
        { layer: 3, text: "31.4 cm。" },
      ],
      formulaPreview: "10 × 3.14 = 31.4",
    },
    {
      id: "step2", position: 2,
      questionText: "直径 5cm の円の円周は何 cm でしょう？",
      answer: 15.7, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "同じ公式。" },
        { layer: 2, text: "$5 \\times 3.14$。" },
        { layer: 3, text: "15.7 cm。" },
      ],
      formulaPreview: "5 × 3.14 = 15.7",
    },
    {
      id: "step3", position: 3,
      questionText: "直径 20cm の円の円周は何 cm でしょう？",
      answer: 62.8, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$20 \\times 3.14$。" },
        { layer: 2, text: "62.8。" },
        { layer: 3, text: "62.8 cm。" },
      ],
      formulaPreview: "20 × 3.14 = 62.8",
    },
    {
      id: "step4", position: 4,
      questionText: "半径 4cm の円の円周は何 cm でしょう？（直径 = 半径 × 2）",
      answer: 25.12, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "直径 = $4 \\times 2 = 8$ cm。" },
        { layer: 2, text: "$8 \\times 3.14$。" },
        { layer: 3, text: "25.12 cm。" },
      ],
      formulaPreview: "8 × 3.14 = 25.12",
    },
    {
      id: "step5", position: 5,
      questionText: "校庭の真ん中の円の直径が 6m です。円周は何 m でしょう？",
      answer: 18.84, unit: "m", unknownLabel: "円周",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "単位が cm から m に変わっただけ。やり方は同じ。" },
        { layer: 2, text: "$6 \\times 3.14$。" },
        { layer: 3, text: "18.84 m。" },
      ],
      formulaPreview: "6 × 3.14 = 18.84",
    },
  ],
};

/* ===== 17a. 三角形の面積 ===== */

export const E5_TRIANGLE_AREA_SERIES: LearnerSeries = {
  id: "e5_triangle_area_01",
  title: "三角形の面積",
  subtitle: "底辺と高さから三角形の面積を求める5問。",
  patternId: "EL12",
  unit: "elementary_5",
  revelationLabel: "三角形の面積 = 底辺 × 高さ ÷ 2",
  derivation: `**なぜ「÷ 2」なのか？**

三角形の面積 = **底辺 × 高さ ÷ 2**。この「$\\div 2$」がなぜ出てくるのか、長方形と見比べるとよくわかります。

**長方形を半分にすると、三角形になる**

底辺と高さが同じ長方形を1枚用意します。長方形の面積は：

$$\\text{長方形の面積} = \\text{底辺} \\times \\text{高さ}$$

この長方形の対角線で**斜めに切る**と、まったく同じ大きさの **三角形が 2 つ** できます。

つまり、1つの三角形は長方形の **ちょうど半分**。だから：

$$\\text{三角形の面積} = \\text{底辺} \\times \\text{高さ} \\div 2$$

「$\\div 2$」は「**長方形を半分にした**」という意味だったのです。

**直角三角形だけじゃない**

「対角線で切ると2枚」と説明しましたが、**直角三角形じゃない普通の三角形** でも、同じ公式が使えます。

なぜか？それはどんな三角形も、底辺と高さがあれば、その底辺と高さで **長方形を作って中に入れる** ことができて、長方形の半分になっているからです。

別の見方：三角形を「2つの直角三角形に分けて」考えても同じ結果が出ます。

**底辺と高さが垂直であること**

注意したいのは、**「高さ」は底辺と直角の方向の長さ** だということ。斜めの辺の長さではありません。

底辺をどこに選ぶかは自由です。三角形は辺が3つあるので、どれを底辺にしても、それに対応する **垂直の高さ** を使えば、公式は成り立ちます。実際、3通りのうちどれで計算しても、答え（面積）は同じになります。

**平行四辺形・台形との関係**

実は、これらの面積公式はすべて **「長方形を変形した形」** として導けます。

| 図形 | 面積 |
|---|---|
| 長方形 | 縦 × 横 |
| 平行四辺形 | 底辺 × 高さ |
| 三角形 | 底辺 × 高さ ÷ 2 |
| 台形 | (上底 + 下底) × 高さ ÷ 2 |

すべての面積公式の **おおもと** は「長方形（縦 × 横）」です。三角形と台形には「$\\div 2$」が出てきますが、これは長方形を半分にしたり、台形を2つ組み合わせて平行四辺形にしたりすると見えてきます。

「分けて足す」「組み合わせる」だけで、面積はすべて長方形に還元できます。これが面積の世界の地図です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "底辺 4cm、高さ 6cm の三角形の面積はいくつでしょう？",
      answer: 12, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：底辺 × 高さ ÷ 2。" },
        { layer: 2, text: "$4 \\times 6 \\div 2 = 24 \\div 2$。" },
        { layer: 3, text: "12。" },
      ],
      formulaPreview: "4 × 6 ÷ 2 = 12",
    },
    {
      id: "step2", position: 2,
      questionText: "底辺 5cm、高さ 8cm の三角形の面積はいくつでしょう？",
      answer: 20, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$5 \\times 8 \\div 2$。" },
        { layer: 3, text: "20。" },
      ],
      formulaPreview: "5 × 8 ÷ 2 = 20",
    },
    {
      id: "step3", position: 3,
      questionText: "底辺 10cm、高さ 6cm の三角形の面積はいくつでしょう？",
      answer: 30, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$10 \\times 6 \\div 2$。" },
        { layer: 2, text: "$60 \\div 2$。" },
        { layer: 3, text: "30。" },
      ],
      formulaPreview: "10 × 6 ÷ 2 = 30",
    },
    {
      id: "step4", position: 4,
      questionText: "底辺 12cm、高さ 8cm の三角形の面積はいくつでしょう？",
      answer: 48, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式に値を入れて。" },
        { layer: 2, text: "$12 \\times 8 \\div 2 = 96 \\div 2$。" },
        { layer: 3, text: "48。" },
      ],
      formulaPreview: "12 × 8 ÷ 2 = 48",
    },
    {
      id: "step5", position: 5,
      questionText: "三角形の旗の底辺が 30cm、高さが 20cm のとき、面積はいくつでしょう？",
      answer: 300, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "旗も三角形。公式は同じ。" },
        { layer: 2, text: "$30 \\times 20 \\div 2$。" },
        { layer: 3, text: "300。" },
      ],
      formulaPreview: "30 × 20 ÷ 2 = 300",
    },
  ],
};

/* ===== 17b. 平行四辺形の面積 ===== */

export const E5_PARALLELOGRAM_SERIES: LearnerSeries = {
  id: "e5_parallelogram_01",
  title: "平行四辺形の面積",
  subtitle: "底辺と高さから平行四辺形の面積を求める5問。",
  patternId: "EL13",
  unit: "elementary_5",
  revelationLabel: "平行四辺形の面積 = 底辺 × 高さ",
  derivation: `**平行四辺形 = 長方形を斜めにしただけ**

平行四辺形の面積：

$$\\text{面積} = \\text{底辺} \\times \\text{高さ}$$

公式だけ見ると長方形の面積（縦 × 横）と同じ形ですが、**「斜めの辺」ではなく「高さ」** を使うのがポイントです。

**長方形から作り出す**

平行四辺形は、長方形の **片側を斜めに倒した** 形と見ることができます。

平行四辺形の **片端を切って、反対側にくっつける** と、ちょうど **長方形** になります。切り取った三角形を反対側に持っていくと、ぴったり長方形ができる——これが「面積 = 底辺 × 高さ」の理由。

**「高さ」は底辺と垂直の長さ**

ここで注意したいのは、**「高さ」は底辺に垂直な長さ** ということ。斜めの辺の長さではありません。

たとえば、底辺 6 cm、斜めの辺 5 cm、高さ 4 cm の平行四辺形なら、面積は $6 \\times 4 = 24$ cm²（斜めの 5 cm は使わない）。

**面積公式の家系図**

| 図形 | 面積 | 関係 |
|---|---|---|
| 長方形 | 縦 × 横 | 原点 |
| 平行四辺形 | 底辺 × 高さ | 長方形を斜めに |
| 三角形 | 底辺 × 高さ ÷ 2 | 平行四辺形の半分 |
| 台形 | (上底+下底)×高さ÷2 | 平行四辺形と三角形の組み合わせ |

すべての面積公式が、**「長方形 = 縦 × 横」** という原型から派生しています。

**平行四辺形の面白い性質**

- 対角線で 4 つの三角形に分けると、すべて等しい面積
- 対角線がお互いを **二等分** する
- 対辺は **平行で等しい長さ**
- 対角は **等しい角度**

これらの性質を使うと、いろんな証明問題で平行四辺形の面積公式が活躍します。

**三角形を 2 つ合わせると平行四辺形**

逆向きに考えることもできます。**同じ三角形を 2 つ** くっつけると（向きを変えて）、ちょうど **平行四辺形** が作れます。

だから「三角形の面積 = 平行四辺形の面積 ÷ 2 = 底辺 × 高さ ÷ 2」も自然に出てきます。

**「形を変えても面積は保たれる」**

切ったり貼ったりして長方形に直しても、面積は変わらない——これが図形の面積を扱う基本姿勢です。「形を **変形して** 面積を求める」のは、後の積分の発想にもつながります。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "底辺 5cm、高さ 4cm の平行四辺形の面積はいくつでしょう？",
      answer: 20, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：底辺 × 高さ。" },
        { layer: 2, text: "$5 \\times 4$。" },
        { layer: 3, text: "20。" },
      ],
      formulaPreview: "5 × 4 = 20",
    },
    {
      id: "step2", position: 2,
      questionText: "底辺 7cm、高さ 5cm の平行四辺形の面積はいくつでしょう？",
      answer: 35, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "同じ公式。" },
        { layer: 2, text: "$7 \\times 5$。" },
        { layer: 3, text: "35。" },
      ],
      formulaPreview: "7 × 5 = 35",
    },
    {
      id: "step3", position: 3,
      questionText: "底辺 8cm、高さ 6cm の平行四辺形の面積はいくつでしょう？",
      answer: 48, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$8 \\times 6$。" },
        { layer: 2, text: "48。" },
        { layer: 3, text: "48。" },
      ],
      formulaPreview: "8 × 6 = 48",
    },
    {
      id: "step4", position: 4,
      questionText: "底辺 12cm、高さ 10cm の平行四辺形の面積はいくつでしょう？",
      answer: 120, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公式に値を代入。" },
        { layer: 2, text: "$12 \\times 10$。" },
        { layer: 3, text: "120。" },
      ],
      formulaPreview: "12 × 10 = 120",
    },
    {
      id: "step5", position: 5,
      questionText: "本の表紙が平行四辺形で、底辺 20cm、高さ 25cm のとき、面積はいくつでしょう？",
      answer: 500, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "本の表紙でも、平行四辺形なら公式は同じ。" },
        { layer: 2, text: "$20 \\times 25$。" },
        { layer: 3, text: "500。" },
      ],
      formulaPreview: "20 × 25 = 500",
    },
  ],
};

/* ===== 17c. 台形の面積 ===== */

export const E5_TRAPEZOID_AREA_SERIES: LearnerSeries = {
  id: "e5_trapezoid_area_01",
  title: "台形の面積",
  subtitle: "上底・下底・高さから台形の面積を求める5問。",
  patternId: "EL14",
  unit: "elementary_5",
  revelationLabel: "台形の面積 = (上底 + 下底) × 高さ ÷ 2",
  derivation: `**台形 = 三角形 + 平行四辺形 の発想**

台形の面積：

$$\\text{面積} = \\frac{(\\text{上底} + \\text{下底}) \\times \\text{高さ}}{2}$$

なぜ「上底 + 下底」を 2 で割るのか——これは **2 枚の台形を組み合わせると平行四辺形になる** ことから出てきます。

**台形 2 枚で平行四辺形**

同じ台形を 2 枚用意して、片方を **逆向きに** くっつけると、ぴったり **平行四辺形** ができます。

- できあがった平行四辺形の **底辺** = 上底 + 下底
- 平行四辺形の **高さ** = 台形の高さ
- 面積 = (上底 + 下底) × 高さ

台形 1 枚はその **半分** なので：

$$\\text{台形の面積} = \\frac{(\\text{上底} + \\text{下底}) \\times \\text{高さ}}{2}$$

**「上底 + 下底」は平均みたいなもの**

公式を別の見方で整理すると：

$$\\text{台形の面積} = \\frac{\\text{上底} + \\text{下底}}{2} \\times \\text{高さ}$$

「**$(上底 + 下底) / 2$**」は「**上底と下底の平均**」。これを「**平均の幅**」と見ると：

$$\\text{台形の面積} = \\text{平均の幅} \\times \\text{高さ}$$

つまり、台形を **「平均の幅を持った長方形」** と同じ面積で扱える、ということ。

**台形を三角形に分けて確かめる**

別のやり方として、台形を対角線で **2 つの三角形に分割** してもよい：

- 上の三角形：底辺 = 上底、高さ = 台形の高さ
- 下の三角形：底辺 = 下底、高さ = 台形の高さ

それぞれの面積：

- 上：$\\text{上底} \\times \\text{高さ} / 2$
- 下：$\\text{下底} \\times \\text{高さ} / 2$

合計すると：

$$\\text{上底} \\times \\text{高さ} / 2 + \\text{下底} \\times \\text{高さ} / 2 = (\\text{上底} + \\text{下底}) \\times \\text{高さ} / 2$$

公式と一致！

**面積公式の統一**

「上底」を 0 にすると **三角形**、「上底 = 下底」にすると **平行四辺形**——台形はこれらの両方を含む、より一般的な形です。

| 図形 | 上底 | 下底 | 公式 |
|---|---|---|---|
| 三角形 | 0 | b | $0 + b)\\cdot h / 2 = bh/2$ |
| 台形 | a | b | $(a + b)h/2$ |
| 平行四辺形 | a | a | $(a + a)h/2 = ah$ |

3 つの公式が、**台形の公式の特別な場合** として統一されます。

**面積の世界の階層**

| 段階 | 図形 |
|---|---|
| 基本 | 長方形 |
| 変形 1 | 平行四辺形（斜めに） |
| 変形 2 | 三角形（半分に） |
| 統合 | 台形（三角形と平行四辺形の橋渡し） |

すべての面積公式が、**長方形を原型として変形・組み合わせ** することで出てきます。これが面積の世界の地図。

**応用：複雑な多角形**

複雑な形でも、**三角形や台形に分けて** 計算する方法が定石です。「分けて、足す」だけで、どんな多角形の面積も求められます——これが図形の面積の基本姿勢です。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "上底 3cm、下底 5cm、高さ 4cm の台形の面積はいくつでしょう？",
      answer: 16, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：(上底 + 下底) × 高さ ÷ 2。" },
        { layer: 2, text: "$(3 + 5) \\times 4 \\div 2 = 32 \\div 2$。" },
        { layer: 3, text: "16。" },
      ],
      formulaPreview: "(3+5)×4÷2 = 16",
    },
    {
      id: "step2", position: 2,
      questionText: "上底 4cm、下底 6cm、高さ 4cm の台形の面積はいくつでしょう？",
      answer: 20, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "同じ公式。" },
        { layer: 2, text: "$(4 + 6) \\times 4 \\div 2$。" },
        { layer: 3, text: "20。" },
      ],
      formulaPreview: "(4+6)×4÷2 = 20",
    },
    {
      id: "step3", position: 3,
      questionText: "上底 5cm、下底 9cm、高さ 6cm の台形の面積はいくつでしょう？",
      answer: 42, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "公式に値を代入。" },
        { layer: 2, text: "$(5 + 9) \\times 6 \\div 2 = 84 \\div 2$。" },
        { layer: 3, text: "42。" },
      ],
      formulaPreview: "(5+9)×6÷2 = 42",
    },
    {
      id: "step4", position: 4,
      questionText: "上底 8cm、下底 12cm、高さ 10cm の台形の面積はいくつでしょう？",
      answer: 100, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$(8 + 12) \\times 10 \\div 2$。" },
        { layer: 2, text: "$200 \\div 2$。" },
        { layer: 3, text: "100。" },
      ],
      formulaPreview: "(8+12)×10÷2 = 100",
    },
    {
      id: "step5", position: 5,
      questionText: "校舎の屋根が台形で、上底 15m、下底 20m、高さ 8m です。面積はいくつでしょう？",
      answer: 140, unit: "m²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "単位が m に変わっただけ。公式は同じ。" },
        { layer: 2, text: "$(15 + 20) \\times 8 \\div 2$。" },
        { layer: 3, text: "140。" },
      ],
      formulaPreview: "(15+20)×8÷2 = 140",
    },
  ],
};

/** 東京書籍5年生・教科書順の全系列 */
export const ELEMENTARY_5_SERIES_LIST: LearnerSeries[] = [
  E5_DECIMAL_PLACE_SERIES,
  E5_VOLUME_SERIES,
  E5_PROPORTION_SERIES,
  E5_DECIMAL_MULT_SERIES,
  E5_DECIMAL_DIV_SERIES,
  E5_DECIMAL_DIV_ALGORITHM_SERIES,
  E5_DECIMAL_DIV_PURE_DECIMAL_SERIES,
  E5_DECIMAL_DIV_ROUNDING_SERIES,
  E5_DECIMAL_DIV_REMAINDER_SERIES,
  E5_LCM_SERIES,
  E5_FRACTION_ADD_SERIES,
  E5_MEAN_SERIES,
  E5_SPEED_SERIES,
  E5_POLYGON_ANGLE_SERIES,
  E5_CONGRUENT_FIGURES_SERIES,
  E5_CIRCUMFERENCE_SERIES,
  E5_TRIANGLE_AREA_SERIES,
  E5_PARALLELOGRAM_SERIES,
  E5_TRAPEZOID_AREA_SERIES,
];
