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
        {
          layer: 1,
          text: "$2.3$ の $2$ と $3$ は、それぞれ何の位の数字かな？ $10$ 倍すると、それぞれの数字のいる位はどうなるだろう？",
        },
        {
          layer: 2,
          text: "$0.1$ を $10$ こ集めると、いくつになったかな？ では、$0.1$ の位の $3$ は、$10$ 倍するとどの位の数字になるかな？ 一の位の $2$ はどうかな？",
        },
        {
          layer: 3,
          text: "$2.3$ は「$1$ が $2$ こ」と「$0.1$ が $3$ こ」。$10$ 倍すると「$10$ が $2$ こ（$20$）」と「$1$ が $3$ こ（$3$）」になるので、$2.3 \\times 10 = 23$。どの数字も位を $1$ つ上がるから、小数点が右へ $1$ けたうつったように見えるね。答えは $23$。",
        },
      ],
      formulaPreview: "2.3 × 10 = 23",
    },
    {
      id: "step2", position: 2,
      questionText: "4.5 を 10 倍するといくつになるでしょう？",
      answer: 45, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、$10$ 倍するもとの数だけ（$2.3$ が $4.5$ になった）。前題で、数字がどの位へうつったかを思い出そう。",
        },
        {
          layer: 3,
          text: "前題は、$2.3$ の $2$ と $3$ がどちらも位を $1$ つ上がって $23$ になった。今はもとの数が $4.5$ に変わっただけ。$4$ は十の位へ、$5$ は一の位へ上がるので、$4.5 \\times 10 = 45$。答えは $45$。",
        },
      ],
      formulaPreview: "4.5 × 10 = 45",
    },
    {
      id: "step3", position: 3,
      questionText: "2.3 を 100 倍するといくつになるでしょう？",
      answer: 230, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？ $2.3$ という数は、最初の問題でも見たね。",
        },
        {
          layer: 2,
          text: "大事な違いは「何倍するか」。前題までは $10$ 倍、今は $100$ 倍。$100$ 倍は、$10$ 倍を何回くり返すことになるかな？",
        },
        {
          layer: 3,
          text: "最初の問題では $2.3 \\times 10 = 23$ だった。今は「何倍するか」が $10$ 倍から $100$ 倍に変わった。$100$ 倍は「$10$ 倍して、もう一度 $10$ 倍」すること。$23$ をもう一度 $10$ 倍すると $230$。どの数字も位を $2$ つ上がるので、$2.3 \\times 100 = 230$。答えは $230$。",
        },
      ],
      formulaPreview: "2.3 × 100 = 230",
    },
    {
      id: "step4", position: 4,
      questionText: "45 を 10 で割るといくつになるでしょう？",
      answer: 4.5, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。「数字のいる位がうつる」という見方は、今も使えるかな？ 何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは向き。前題までは「何倍するか」だったけれど、今度は $10$ でわる。$10$ 倍すると、数字の位は $1$ つ上がったね。$10$ でわると、位はどうなるかな？",
        },
        {
          layer: 3,
          text: "前題までは、何倍かすると、どの数字も位が上がった（$2$ 問目なら $4.5 \\times 10 = 45$）。今度は向きが逆で、$10$ でわると、どの数字も位を $1$ つ下がる。十の位の $4$ は一の位へ、一の位の $5$ は $0.1$ の位へ。だから $45 \\div 10 = 4.5$。答えは $4.5$。$2$ 問目の $45$ が、もとの $4.5$ にもどったね。",
        },
      ],
      formulaPreview: "45 ÷ 10 = 4.5",
    },
    {
      id: "step5", position: 5,
      questionText: "230 を 100 で割るといくつになるでしょう？",
      answer: 2.3, unit: "", unknownLabel: "答え",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、わる数が $10$ から $100$ になったこと。$100$ でわると、数字は位をいくつ下がるかな？",
        },
        {
          layer: 3,
          text: "前題は $45 \\div 10 = 4.5$ で、どの数字も位を $1$ つ下がった。今はわる数が $100$ に変わった。$100$ でわるのは「$10$ でわって、もう一度 $10$ でわる」こと。$230 \\div 10 = 23$、$23 \\div 10 = 2.3$。どの数字も位を $2$ つ下がるので、$230 \\div 100 = 2.3$。答えは $2.3$。$3$ 問目の $2.3 \\times 100 = 230$ を、ちょうど逆にたどったね。",
        },
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
        {
          layer: 1,
          text: "$1$ 辺が $1$ cm のさいころの形を、この直方体にすきまなくつめたら、何こ入るかな？ 長方形の面積を、$1$ 辺 $1$ cm の正方形がいくつならぶかで数えたことを思い出そう。",
        },
        {
          layer: 2,
          text: "いちばん下の $1$ だんには、さいころが何こならぶかな？ そのだんが、高さの分だけ何だん積み重なる？",
        },
        {
          layer: 3,
          text: "いちばん下の $1$ だんには、たて $2$ こ、横 $3$ こで $2 \\times 3 = 6$ こならぶ。高さが $4$ cm なので、それが $4$ だん。$6 \\times 4 = 24$ こ。$1$ こが $1$ cm³ だから、体積は $2 \\times 3 \\times 4 = 24$ で $24$ cm³。",
        },
      ],
      formulaPreview: "2 × 3 × 4 = 24",
    },
    {
      id: "step2", position: 2,
      questionText: "縦 4cm、横 3cm、高さ 5cm の直方体の体積はいくつでしょう？",
      answer: 60, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、たてと高さの長さだけ。形は前題と同じ直方体だね。",
        },
        {
          layer: 3,
          text: "前題は「$1$ だんに $2 \\times 3 = 6$ こ、それが $4$ だん」で $24$ cm³ だった。今は $1$ だんに $4 \\times 3 = 12$ こ、それが $5$ だん。$4 \\times 3 \\times 5 = 60$。体積は $60$ cm³。",
        },
      ],
      formulaPreview: "4 × 3 × 5 = 60",
    },
    {
      id: "step3", position: 3,
      questionText: "縦 5cm、横 5cm、高さ 5cm の立方体の体積はいくつでしょう？",
      answer: 125, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は立方体。前題の数え方は、そのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、たて・横・高さが $3$ つとも同じ長さ（$5$ cm）になったこと。それでも、前題と同じ数え方ができるかな？",
        },
        {
          layer: 3,
          text: "前題は $1$ だんに $4 \\times 3 = 12$ こ、それが $5$ だんで $60$ cm³。今は、たて・横・高さがみんな同じ $5$ cm の立方体。数え方は同じで、$1$ だんに $5 \\times 5 = 25$ こ、それが $5$ だん。$5 \\times 5 \\times 5 = 125$。体積は $125$ cm³。",
        },
      ],
      formulaPreview: "5 × 5 × 5 = 125",
    },
    {
      id: "step4", position: 4,
      questionText: "縦 10cm、横 6cm、高さ 4cm の直方体の体積はいくつでしょう？",
      answer: 240, unit: "cm³", unknownLabel: "体積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、形が立方体から直方体にもどったこと（たて・横・高さが、またばらばらの長さ）。数え方は、前題のままでよいかな？",
        },
        {
          layer: 3,
          text: "前題は $1$ だんに $5 \\times 5 = 25$ こ、それが $5$ だんで $125$ cm³。今は形が直方体にもどったけれど、数え方は同じ。$1$ だんに $10 \\times 6 = 60$ こ、それが $4$ だんで、$10 \\times 6 \\times 4 = 240$。体積は $240$ cm³。",
        },
      ],
      formulaPreview: "10 × 6 × 4 = 240",
    },
    {
      id: "step5", position: 5,
      questionText: "学校の水そう（縦 50cm、横 30cm、高さ 20cm）の容積は何 cm³ でしょう？",
      answer: 30000, unit: "cm³", unknownLabel: "容積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は学校の水そう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、聞かれているのが「水そうの中に入る量」（容積）になったこと。水そうの中の、水が入るところも、直方体の形をしているかな？",
        },
        {
          layer: 3,
          text: "前題は $10 \\times 6 \\times 4 = 240$ で $240$ cm³。今は、水そうの中に入る量（容積）を聞いている。水が入るところも直方体なので、数え方は同じ。$1$ 辺 $1$ cm のさいころをつめると、$1$ だんに $50 \\times 30 = 1500$ こ、それが $20$ だん。$50 \\times 30 \\times 20 = 30000$。容積は $30000$ cm³（$30$ L の水が入る大きさ）。",
        },
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
        {
          layer: 1,
          text: "長さが $1$ m、$2$ m、$3$ m とふえていくと、代金はどのようにふえていくかな？ $3$ m は $1$ m の何こ分？",
        },
        {
          layer: 2,
          text: "長さが $1$ m の $3$ こ分なら、代金は $1$ m 分の代金の何こ分になるかな？",
        },
        {
          layer: 3,
          text: "$1$ m で $80$ 円。$3$ m は $1$ m の $3$ こ分なので、代金も $80$ 円の $3$ こ分。$80 \\times 3 = 240$。代金は $240$ 円。長さが $2$ 倍、$3$ 倍になると、代金も $2$ 倍、$3$ 倍になる。このとき、代金は長さに「比例する」というよ。",
        },
      ],
      formulaPreview: "80 × 3 = 240",
    },
    {
      id: "step2", position: 2,
      questionText: "1m あたり 80 円のリボンを 5m 買うと、代金はいくらでしょう？",
      answer: 400, unit: "円", unknownLabel: "代金",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、買う長さだけ（$3$ m が $5$ m になった）。$1$ m のねだんは同じ $80$ 円だね。",
        },
        {
          layer: 3,
          text: "前題は $3$ m で $80 \\times 3 = 240$ 円だった。今は長さが $5$ m に変わっただけ。$5$ m は $1$ m の $5$ こ分なので、$80 \\times 5 = 400$。代金は $400$ 円。",
        },
      ],
      formulaPreview: "80 × 5 = 400",
    },
    {
      id: "step3", position: 3,
      questionText: "1 本 120 円のジュースを 4 本買うと、代金はいくらでしょう？",
      answer: 480, unit: "円", unknownLabel: "代金",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。買う品物が変わったけれど、前題の考え方はそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、「$1$ m あたり」が「$1$ 本あたり」になったこと。長さのかわりに、本数で数えるよ。",
        },
        {
          layer: 3,
          text: "前題は「$1$ m あたり $80$ 円」の $5$ m 分で、$80 \\times 5 = 400$ 円。今は「$1$ 本あたり $120$ 円」の $4$ 本分。$120 \\times 4 = 480$。代金は $480$ 円。長さでも本数でも、「$1$ つあたり」×「いくつ分」で求められるね。",
        },
      ],
      formulaPreview: "120 × 4 = 480",
    },
    {
      id: "step4", position: 4,
      questionText: "1 時間に 60km 進む電車が 4 時間で進む道のりは何 km でしょう？",
      answer: 240, unit: "km", unknownLabel: "道のり",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度はお金ではなく、電車が進む道のり。同じ考え方は使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、「$1$ 本あたり」が「$1$ 時間あたり」になったこと。$4$ 時間は $1$ 時間の何こ分かな？",
        },
        {
          layer: 3,
          text: "前題は $1$ 本 $120$ 円の $4$ 本分で、$120 \\times 4 = 480$ 円。今は $1$ 時間に $60$ km の $4$ 時間分。$60 \\times 4 = 240$。道のりは $240$ km。時間が $2$ 倍、$3$ 倍になると、道のりも $2$ 倍、$3$ 倍になるね。",
        },
      ],
      formulaPreview: "60 × 4 = 240",
    },
    {
      id: "step5", position: 5,
      questionText: "1 個 25g のおはじきが 8 個あると、重さは何 g でしょう？",
      answer: 200, unit: "g", unknownLabel: "重さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は重さ。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、「$1$ 時間あたりの道のり」が「$1$ こあたりの重さ」になったこと。今度の「いくつ分」は何かな？",
        },
        {
          layer: 3,
          text: "前題は $1$ 時間に $60$ km の $4$ 時間分で、$60 \\times 4 = 240$ km。今は $1$ こ $25$ g の $8$ こ分。$25 \\times 8 = 200$。重さは $200$ g。代金でも道のりでも重さでも、「$1$ つあたり」×「いくつ分」で求められる。いくつ分が $2$ 倍、$3$ 倍になれば、全体も $2$ 倍、$3$ 倍になる。",
        },
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

**1 より小さい数同士を掛けると、結果はどちらの数よりも小さくなります**。「半分の半分は 4 分の 1」と考えれば自然です。

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
        {
          layer: 1,
          text: "$0.3$ は $0.1$ がいくつ分かな？ $0.2$ は？ 小数のかけ算も、もう知っている整数のかけ算につなげられないかな？",
        },
        {
          layer: 2,
          text: "見るところは、小数点の位置。$0.3$ も $0.2$ も、小数点の下に数字が $1$ けたずつある。整数にしてかけたら、答えの小数点はどこにもどせばいいかな？",
        },
        {
          layer: 3,
          text: "$0.3$ を $10$ 倍すると $3$、$0.2$ を $10$ 倍すると $2$。整数どうしなら $3 \\times 2 = 6$。でも、かけられる数もかける数も $10$ 倍したので、$6$ は本当の答えの $100$ 倍になっている。だから $100$ でわってもどす。答えの小数点の下のけた数は、かけられる数とかける数のけた数をたした $1 + 1 = 2$ けたになる。$6$ を小数点の下 $2$ けたの数にするには、$0$ をおぎなって $0.06$ と書く。答えは $0.06$。",
        },
      ],
      formulaPreview: "0.3 × 0.2 = 0.06",
    },
    {
      id: "step2", position: 2,
      questionText: "$0.5 \\times 0.4$ はいくつでしょう？",
      answer: 0.2, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。小数どうしのかけ算なのは同じ。何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、整数にしてかけた答えの、おしまいに $0$ がつくこと。小数点をつけたあと、その $0$ はどうしたらいいかな？",
        },
        {
          layer: 3,
          text: "前題と同じく、$0.5$ と $0.4$ をそれぞれ $10$ 倍して $5 \\times 4 = 20$。小数点の下は $1 + 1 = 2$ けたなので $0.20$。前題とちがうのはここから。おしまいの $0$ は大きさを変えないので、消して $0.2$。答えは $0.2$。",
        },
      ],
      formulaPreview: "0.5 × 0.4 = 0.2",
    },
    {
      id: "step3", position: 3,
      questionText: "$1.2 \\times 0.5$ はいくつでしょう？",
      answer: 0.6, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題のやり方は、そのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、かけられる数が $1.2$ になり、小数点の左にも数字があること。小数点の下のけた数の数え方は、前題と変わるかな？",
        },
        {
          layer: 3,
          text: "前題と同じく、$1.2$ を $10$ 倍して $12$、$0.5$ を $10$ 倍して $5$。$12 \\times 5 = 60$。前題とちがうのは、小数点の左に $1$ があること。でも数えるのは小数点の下のけた数だけなので、$1 + 1 = 2$ けた。$60$ の小数点を $2$ けた左へうつして $0.60$、おしまいの $0$ を消して $0.6$。答えは $0.6$。",
        },
      ],
      formulaPreview: "1.2 × 0.5 = 0.6",
    },
    {
      id: "step4", position: 4,
      questionText: "$2.5 \\times 0.4$ はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。計算のしかたは同じかな？ 答えの形はどうなりそう？",
        },
        {
          layer: 2,
          text: "変わったのは、整数にしてかけた答えの、おしまいに $0$ が $2$ つならぶこと。小数点の下が $0$ だけになったら、答えはどう書けばいいかな？",
        },
        {
          layer: 3,
          text: "前題と同じく、$2.5$ と $0.4$ をそれぞれ $10$ 倍して $25 \\times 4 = 100$。小数点の下は $1 + 1 = 2$ けたなので $1.00$。前題では、おしまいの $0$ を $1$ つ消した。今度は $2$ つとも消せる。小数点の下に何ものこらないので、答えは整数の $1$。",
        },
      ],
      formulaPreview: "2.5 × 0.4 = 1",
    },
    {
      id: "step5", position: 5,
      questionText: "1m あたり 1.5kg のひもを 2.4m 買うと、重さは何 kg でしょう？",
      answer: 3.6, unit: "kg", unknownLabel: "重さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は式が書いていない。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは、式ではなく、ひもを買う場面の文になったこと。$1$ m で $1.5$ kg なら、$2$ m では何 kg かな？ そう考えると、どんな式になるかな？",
        },
        {
          layer: 3,
          text: "前題までは $2.5 \\times 0.4$ のように式が書いてあった。今度は場面から式を立てる。「$1$ m あたりの重さ」×「買った長さ」で全体の重さが出るので、式は $1.5 \\times 2.4$。あとは前題と同じく、$15 \\times 24 = 360$、小数点の下は $1 + 1 = 2$ けたで $3.60$、おしまいの $0$ を消して $3.6$。重さは $3.6$ kg。",
        },
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
    "数直線で2つの量の関係をそろえ、1あたりの量として読む10問。",
  patternId: "EL5",
  unit: "elementary_5",
  revelationLabel: "小数で表された長さでも、数直線にそろえると1あたりをわり算で求められる",
  drivingQuestion:
    "小数で表された量でも、1あたりを求める式はどう立てればよい？",
  derivation: `**中心の問い** ｜ 小数で表された量でも、1あたりを求める式はどう立てればよい？

たとえば、リボンを $2.5$ m 買ったら代金が $300$ 円だったとします。

求めたいのは、$1$ m のねだんです。

<<DECIMAL_DIV_STEP1>>

数直線では、下の線に長さ、上の線に代金をそろえて置きます。

- $2.5$ m のところが $300$ 円
- $1$ m のところが □ 円

このとき、□ 円が $2.5$ 個分で $300$ 円になるので、

$$□ \\times 2.5 = 300$$

だから、□ は

$$300 \\div 2.5$$

で求められます。

**大事なのは、式の前に量の関係を置くこと**

小数でわることは、急に新しい意味になるわけではありません。

- 「全体の代金」÷「買った長さ」＝「1mのねだん」
- 「全体の重さ」÷「長さ」＝「1mの重さ」
- 「比べる量」÷「もとにする量」＝「何倍」

数直線にすると、何を $1$ と見るのか、どの量をわるのかが見えます。

**問いに戻ると**

小数で表された量でも、数直線で「全体」と「1あたり」をそろえると、整数のときと同じようにわり算の式を立てられます。`,
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$2.5$ m のリボンを買ったら、代金は $300$ 円でした。このリボン $1$ m のねだんは何円でしょう？",
      answer: 120,
      unit: "円",
      unknownLabel: "1mのねだん",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text:
            "数直線の上の量と下の量は、どのように対応しているかな？",
        },
        {
          layer: 2,
          text:
            "見ているのは、全体の代金と、1mあたりの代金の対応。",
        },
        {
          layer: 3,
          text:
            "$□ \\times 2.5 = 300$ なので、$□ = 300 \\div 2.5 = 120$。1mのねだんは $120$ 円。",
        },
      ],
      formulaPreview: "300 ÷ 2.5 = 120",
      figureMarker: "<<DECIMAL_DIV_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$1.5$ m のホースの重さをはかったら、$270$ g でした。このホース $1$ m の重さは何 g でしょう？",
      answer: 180,
      unit: "g",
      unknownLabel: "1mの重さ",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題と同じように、下の線に長さ、上の線に重さを置こう。",
        },
        {
          layer: 2,
          text:
            "変わったのは、上の量が代金から重さになったこと。",
        },
        {
          layer: 3,
          text:
            "$270 \\div 1.5 = 180$。1mの重さは $180$ g。",
        },
      ],
      formulaPreview: "270 ÷ 1.5 = 180",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$6.3$ m の鉄のぼうの重さが $7.56$ kg でした。この鉄のぼう $1$ m の重さは何 kg でしょう？",
      answer: 1.2,
      unit: "kg",
      unknownLabel: "1mの重さ",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題より数が細かくなった。けれど、数直線では同じく「全体 ÷ 長さ」で $1$ m を求める。",
        },
        {
          layer: 2,
          text:
            "変わったのは、長さも重さも小数で細かく表されていること。",
        },
        {
          layer: 3,
          text:
            "$75.6 \\div 63 = 1.2$。1mの重さは $1.2$ kg。",
        },
      ],
      formulaPreview: "7.56 ÷ 6.3 = 1.2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$0.8$ m の青いリボンの代金が $240$ 円でした。このリボン $1$ m のねだんは何円でしょう？",
      answer: 300,
      unit: "円",
      unknownLabel: "1mのねだん",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題と同じく、求めたいのは $1$ m のところ。$0.8$ m は $1$ m より短い。",
        },
        {
          layer: 2,
          text:
            "変わったのは、買った長さが1mより短いこと。",
        },
        {
          layer: 3,
          text:
            "$240 \\div 0.8 = 300$。1mのねだんは $300$ 円。",
        },
      ],
      formulaPreview: "240 ÷ 0.8 = 300",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$1.2$ m の赤いリボンの代金が $240$ 円でした。このリボン $1$ m のねだんは何円でしょう？",
      answer: 200,
      unit: "円",
      unknownLabel: "1mのねだん",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べよう。今度は $1.2$ m が $1$ m より長い。",
        },
        {
          layer: 2,
          text:
            "変わったのは、買った長さが1mより長いこと。",
        },
        {
          layer: 3,
          text:
            "$240 \\div 1.2 = 200$。1mのねだんは $200$ 円。",
        },
      ],
      formulaPreview: "240 ÷ 1.2 = 200",
      figureMarker: "<<DECIMAL_DIV_STEP5>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "リボン $1$ m のねだんは $160$ 円です。$2.5$ m 買うと、代金は何円でしょう？",
      answer: 400,
      unit: "円",
      unknownLabel: "代金",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題までと逆向き。今度は $1$ m の量から、$2.5$ m の全体へ進む。",
        },
        {
          layer: 2,
          text:
            "変わったのは求める向き。1mあたりから全体へ進むこと。",
        },
        {
          layer: 3,
          text:
            "$160 \\times 2.5 = 400$。代金は $400$ 円。",
        },
      ],
      formulaPreview: "160 × 2.5 = 400",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$4.5$ m のホースの重さが $0.9$ kg でした。このホース $1$ m の重さは何 kg でしょう？",
      answer: 0.2,
      unit: "kg",
      unknownLabel: "1mの重さ",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。全体の重さが小さいときも、同じ見方が使えるかな？",
        },
        {
          layer: 2,
          text:
            "変わったのは、全体の重さが1kgより小さいこと。",
        },
        {
          layer: 3,
          text:
            "$0.9 \\div 4.5 = 0.2$。1mの重さは $0.2$ kg。",
        },
      ],
      formulaPreview: "0.9 ÷ 4.5 = 0.2",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$2.4$ m のテープの代金が $360$ 円でした。このテープ $1$ m のねだんは何円でしょう？",
      answer: 150,
      unit: "円",
      unknownLabel: "1mのねだん",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題までと同じ。全体の代金を、長さでわって $1$ m を求める。",
        },
        {
          layer: 2,
          text:
            "変わったのは、長さと代金の組み合わせ。",
        },
        {
          layer: 3,
          text:
            "$360 \\div 2.4 = 150$。1mのねだんは $150$ 円。",
        },
      ],
      formulaPreview: "360 ÷ 2.4 = 150",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$0.6$ m のテープの代金が $90$ 円でした。このテープ $1$ m のねだんは何円でしょう？",
      answer: 150,
      unit: "円",
      unknownLabel: "1mのねだん",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。買った長さと1mの位置関係はどう変わったかな？",
        },
        {
          layer: 2,
          text:
            "変わったのは、買った長さがさらに短くなったこと。",
        },
        {
          layer: 3,
          text:
            "$90 \\div 0.6 = 150$。1mのねだんは $150$ 円。",
        },
      ],
      formulaPreview: "90 ÷ 0.6 = 150",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$3.6$ L のペンキで $5.4$ m$^2$ ぬれました。$1$ L で何 m$^2$ ぬれるでしょう？",
      answer: 1.5,
      unit: "m^2",
      unknownLabel: "1Lでぬれる面積",
      variationFromPrevious: "composite",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text:
            "前題と比べてみよう。今度は、どの量を1にそろえたいかな？",
        },
        {
          layer: 2,
          text:
            "変わったのは、1mではなく1Lあたりを見ること。",
        },
        {
          layer: 3,
          text:
            "$5.4 \\div 3.6 = 1.5$。$1$ Lで $1.5$ m$^2$ ぬれる。",
        },
      ],
      formulaPreview: "5.4 ÷ 3.6 = 1.5",
    },
  ],
};

/* ===== 5-2. 小数の除法の考え方と筆算形式 ===== */

export const E5_DECIMAL_DIV_ALGORITHM_SERIES: LearnerSeries = {
  id: "e5_decimal_div_algorithm_01",
  title: "小数の除法の考え方と筆算形式",
  subtitle:
    "数直線で量関係を確かめ、わる数を整数にして筆算につなぐ10問。",
  patternId: "EL5D2",
  unit: "elementary_5",
  revelationLabel: "わる数を整数にするために、わられる数も同じだけ動かす",
  drivingQuestion:
    "数直線で同じ関係を保ったまま、筆算ではどう整数のわり算に直せばよい？",
  derivation: `**中心の問い** ｜ 数直線で同じ関係を保ったまま、筆算ではどう整数のわり算に直せばよい？

数直線で $1$ あたりを求める式を立てると、たとえば次のようになります。

$$7.56 \\div 6.3$$

下の線の $6.3$ m と上の線の $7.56$ kg は対応しています。筆算では、この対応をこわさずに、両方を $10$ 倍して見直します。

$$7.56 \\div 6.3 = 75.6 \\div 63$$

<<DECIMAL_DIV_ALGORITHM_STEP7>>

これは、わる数だけを変えているのではありません。数直線の上下を同じ倍率で見直しているので、対応の関係が保たれます。

$$\\frac{7.56}{6.3} = \\frac{75.6}{63}$$

筆算で小数点を動かす操作は、実はこの等しい分数の考えを短く書いたものです。

**問いに戻ると**

小数点を動かしてよいのは、数直線の対応を同じ倍率で見直しているからです。片方だけを動かすのではなく、わる数を整数にするために、わられる数も同じだけ動かす。これが小数の除法の筆算形式の骨です。`,
  steps: [
    { id: "step1", position: 1, questionText: "$7.56 \\div 6.3$ は、筆算でわる数を整数にすると $N \\div 63$ と見られます。$N$ はいくつでしょう？", answer: 75.6, unit: "", unknownLabel: "N", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "数直線では、上下の量を同じ倍率で見直す。わる数 $6.3$ を $63$ にするには何倍かな？" },
      { layer: 2, text: "$6.3$ を $63$ と見るには10倍する。上の量である $7.56$ も10倍する。" },
      { layer: 3, text: "$7.56 \\times 10 = 75.6$。だから $7.56 \\div 6.3 = 75.6 \\div 63$ で、$N=75.6$。" },
    ], formulaPreview: "7.56 ÷ 6.3 = 75.6 ÷ 63", figureMarker: "<<DECIMAL_DIV_ALGORITHM_STEP1>>" },
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
    "数直線で1より小さいわる数を読み、商が大きくなる理由を考える10問。",
  patternId: "EL5D3",
  unit: "elementary_5",
  revelationLabel: "一より小さい数でわると、商は被除数より大きくなることがある",
  drivingQuestion:
    "1より小さい数でわると商が大きくなることがあるのは、数直線ではどう見える？",
  derivation: `**中心の問い** ｜ 1より小さい数でわると商が大きくなることがあるのは、数直線ではどう見える？

わり算は、いつも「小さくする」計算ではありません。

$$3 \\div 0.5 = 6$$

これは「$3$ m の中に $0.5$ m がいくつ入るか」を数えています。数直線で見ると、$1$ m より短いまとまりを数えるので、まとまりの数はもとの $3$ より大きくなります。

<<DECIMAL_DIV_PURE_STEP1>>

**問いに戻ると**

純小数でわると商が大きくなるのは、全体を $1$ より小さな単位で数え直しているからです。数直線で「1より短いまとまりが何こ分か」を読むと、答えが大きくなることはふしぎではなくなります。`,
  steps: [
    { id: "step1", position: 1, questionText: "$3$ m のリボンを $0.5$ m ずつ切ります。何本できますか？", answer: 6, unit: "本", unknownLabel: "本数", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "数直線では、どんなまとまりを何こ分として見ればよいかな？" },
      { layer: 2, text: "$0.5$ m は $1$ m より短いので、$3$ m の中には $3$ 個より多く入る。" },
      { layer: 3, text: "$3 \\div 0.5$ を計算する。$0.5$ m は半分の長さなので、$3$ m には $6$ 個入る。答えは $6$ 本。" },
    ], formulaPreview: "3 ÷ 0.5 = 6", figureMarker: "<<DECIMAL_DIV_PURE_STEP1>>" },
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
    ], formulaPreview: "2 ÷ 0.4 = 20 ÷ 4 = 5", figureMarker: "<<DECIMAL_DIV_PURE_STEP7>>" },
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
    "数直線で概数の幅を見て、商をどの位で丸めるかを読む10問。",
  patternId: "EL5D4",
  unit: "elementary_5",
  revelationLabel: "求めたい位の一つ下まで計算して、その位で四捨五入する",
  drivingQuestion:
    "答えをぴったり出せないとき、数直線ではどのあたりの数として表せばよい？",
  derivation: `**中心の問い** ｜ 答えをぴったり出せないとき、数直線ではどのあたりの数として表せばよい？

小数のわり算では、商が続いて終わらないことがあります。そのときは、目的に合わせて概数にします。

小数第一位までの概数なら、小数第二位を見ます。

$$5 \\div 3 = 1.66\\cdots \\approx 1.7$$

<<DECIMAL_DIV_ROUNDING_STEP1>>

小数第二位までの概数なら、小数第三位を見ます。

**問いに戻ると**

概数は、途中であきらめることではありません。数直線で近い目もりへ寄せるために、どの位まで必要かを決め、その一つ下の位まで調べて判断することです。`,
  steps: [
    { id: "step1", position: 1, questionText: "$5 \\div 3$ の商を小数第一位までの概数で表します。答えはいくつですか？", answer: 1.7, unit: "", unknownLabel: "概数", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "数直線では、商をどの目もりの近くに置けばよさそうかな？" },
      { layer: 2, text: "小数第一位まで表すので、小数第二位を見て四捨五入する。" },
      { layer: 3, text: "$5 \\div 3 = 1.66\\cdots$。小数第一位までなら小数第二位を見る。第二位が $6$ なので、答えは $1.7$。" },
    ], formulaPreview: "5 ÷ 3 = 1.66... ≈ 1.7", figureMarker: "<<DECIMAL_DIV_ROUNDING_STEP1>>" },
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
    "数直線で残った長さを確かめ、筆算の余りの小数点を読む10問。",
  patternId: "EL5D5",
  unit: "elementary_5",
  revelationLabel: "余りは、もとのわられる数の小数点の位置に戻して読む",
  drivingQuestion:
    "筆算で出た余りは、数直線のもとの量ではどんな大きさになる？",
  derivation: `**中心の問い** ｜ 筆算で出た余りは、数直線のもとの量ではどんな大きさになる？

小数のわり算では、計算しやすくするために数を大きくして見ることがあります。

$$5.7 \\div 2 = 2 \\text{ あまり } 1.7$$

数直線では、$2$ m を $2$ 本取ると $4$ m、残りは $5.7-4=1.7$ m です。

<<DECIMAL_DIV_REMAINDER_STEP1>>

筆算の途中で $57$ と見ても、余りの $17$ をそのまま $17$ と読んではいけません。もとの数は $5.7$ なので、余りも $1.7$ と読む必要があります。

**問いに戻ると**

余りは「数直線に本当に残った量」です。だから、計算のために一時的に動かした小数点ではなく、もとの量の小数点の位置に戻して読む。これが余りの小数点の位置の決め方です。`,
  steps: [
    { id: "step1", position: 1, questionText: "$5.7$ m のリボンを $2$ m ずつ切ります。$2$ 本切れたとき、余りは何 m ですか？", answer: 1.7, unit: "m", unknownLabel: "余り", variationFromPrevious: null, compareWithStepId: null, hints: [
      { layer: 1, text: "数直線では、使った分と残った分はどこに見えるかな？" },
      { layer: 2, text: "見るところは、まとまりを取ったあとに残る部分の長さ。" },
      { layer: 3, text: "$5.7 - 2 \\times 2 = 1.7$。余りは $1.7$ m。" },
    ], formulaPreview: "5.7 ÷ 2 = 2 あまり 1.7", figureMarker: "<<DECIMAL_DIV_REMAINDER_STEP1>>" },
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

**共通する倍数**：$12, 24, 36, \\ldots$ そのうち **いちばん小さい** のは **12** → これが最小公倍数（LCM）。

**素因数分解で求める**

並べていくのは大変なので、もっと早い方法があります。**素因数分解** して、**各素数の指数の最大値** を取る。

$4 = 2^2$ $6 = 2 \\times 3$

最小公倍数 = $2^{\\max(2, 1)} \\times 3^{\\max(0, 1)} = 2^2 \\times 3 = 12$

「**両方を覆える、最小の素因数の集まり**」——これが最小公倍数の本質です。

**最大公約数との関係**

「最小公倍数」と一緒に習うのが「**最大公約数**」（GCD）。これは「**両方の数の約数のうち、いちばん大きい数**」。

4 と 6 の場合：

- 4 の約数：$1, 2, 4$
- 6 の約数：$1, 2, 3, 6$

共通する約数：$1, 2$ 最大は **2** → 最大公約数。

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
        {
          layer: 1,
          text: "「最小・公・倍数」と、ことばを分けて読んでみよう。$2$ の [倍数] と $3$ の倍数には、それぞれどんな数がならぶかな？ どちらにも出てくる数はあるかな？",
        },
        {
          layer: 2,
          text: "見るところは、$2$ の倍数と $3$ の倍数の両方に出てくる数。小さいほうから書き出していくと、はじめて同じ数が出てくるのはどこかな？",
        },
        {
          layer: 3,
          text: "$2$ の倍数：$2, 4, 6, 8, 10, \\ldots$／$3$ の倍数：$3, 6, 9, \\ldots$。両方に出てくる数（公倍数）のうち、いちばん小さいのは $6$。だから $2$ と $3$ の [最小公倍数] は $6$。",
        },
      ],
      formulaPreview: "lcm(2, 3) = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "3 と 4 の最小公倍数はいくつでしょう？",
      answer: 12, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。たずねていることは同じ。何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、$2$ つの数が $3$ と $4$ になったことだけ。前題で重なった数のあたりまで書き出したら、もう重なっているかな？",
        },
        {
          layer: 3,
          text: "前題と同じく、両方の倍数を書き出す。$3$ の倍数：$3, 6, 9, 12, 15, \\ldots$／$4$ の倍数：$4, 8, 12, 16, \\ldots$。前題より先まで書いて、はじめて重なるのは $12$。最小公倍数は $12$。",
        },
      ],
      formulaPreview: "lcm(3, 4) = 12",
    },
    {
      id: "step3", position: 3,
      questionText: "4 と 6 の最小公倍数はいくつでしょう？",
      answer: 12, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ つの数の組が変わった。前題で効いた考え方は、今もそのまま使える？",
        },
        {
          layer: 2,
          text: "変わったのは、$4$ と $6$ がどちらも $2$ でわり切れること。前題の $3$ と $4$ は、そうではなかったね。それで重なり方は変わるかな？",
        },
        {
          layer: 3,
          text: "前題と同じく書き出す。$4$ の倍数：$4, 8, 12, 16, \\ldots$／$6$ の倍数：$6, 12, \\ldots$。はじめて重なるのは $12$。前題の $3$ と $4$ は、$2$ つの数をかけた $12$ で、はじめて重なった。今度は $4$ と $6$ がどちらも $2$ でわり切れるので、かけた $24$ より手前の $12$ で重なる。最小公倍数は $12$。",
        },
      ],
      formulaPreview: "lcm(4, 6) = 12",
    },
    {
      id: "step4", position: 4,
      questionText: "6 と 9 の最小公倍数はいくつでしょう？",
      answer: 18, unit: "", unknownLabel: "最小公倍数",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。数は変わったけれど、前題で気づいたことは、今度も使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、$6$ と $9$ が、どちらも $3$ でわり切れること。前題は、どちらも $2$ でわり切れる組だった。重なり方に、前題と同じことが起きないかな？",
        },
        {
          layer: 3,
          text: "前題と同じく書き出す。$6$ の倍数：$6, 12, 18, \\ldots$／$9$ の倍数：$9, 18, \\ldots$。はじめて重なるのは $18$。前題は $2$ でわり切れる組、今度は $3$ でわり切れる組。どちらの組でも、$2$ つの数をかけた数より手前で重なる。$6$ と $9$ をかけると $54$ になるけれど、それより手前の $18$ で重なった。最小公倍数は $18$。",
        },
      ],
      formulaPreview: "lcm(6, 9) = 18",
    },
    {
      id: "step5", position: 5,
      questionText: "8 秒ごとに点滅するライト A と、12 秒ごとに点滅するライト B が同時に光るのは何秒ごとでしょう？",
      answer: 24, unit: "秒", unknownLabel: "周期",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度はライトの場面になった。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは、「最小公倍数」ということばが問題に出てこないこと。$2$ つのライトがいっしょに光ってから数えると、ライト A が光るのは何秒後、ライト B は何秒後かな？",
        },
        {
          layer: 3,
          text: "前題までは「最小公倍数はいくつ」とたずねられた。今度は場面から見ぬく。$2$ つのライトがいっしょに光ってから数えると、A が光るのは $8, 16, 24, \\ldots$ 秒後、B が光るのは $12, 24, \\ldots$ 秒後。どちらも光るのは、$8$ と $12$ の公倍数にあたる秒。はじめて重なるのは $24$ 秒後なので、$8$ と $12$ の最小公倍数の $24$ 秒ごとに同時に光る。答えは $24$ 秒。",
        },
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
        {
          layer: 1,
          text: "分母が同じ分数どうしなら、もうたせるね。では、$2$ 分の $1$ と $3$ 分の $1$ は、「$1$ こ分」の大きさが同じかな？",
        },
        {
          layer: 2,
          text: "見るところは、ピースの大きさ。$2$ 等分したピースと $3$ 等分したピースを、どちらも同じ大きさのピースに切り直せないかな？ 何等分にすればいいかな？",
        },
        {
          layer: 3,
          text: "$\\dfrac{1}{2}$ と $\\dfrac{1}{3}$ は $1$ こ分の大きさがちがうので、そのままではたせない。$6$ は $2$ でも $3$ でもわり切れるので、分母を $6$ にそろえる（[通分]）。$\\dfrac{1}{2}$ は分母と分子に $3$ をかけて $\\dfrac{3}{6}$、$\\dfrac{1}{3}$ は分母と分子に $2$ をかけて $\\dfrac{2}{6}$。分母はそのままで分子だけをたすので、$\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$。これ以上かんたんにできないので、分子は $5$。",
        },
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
        {
          layer: 1,
          text: "前題と比べてみよう。たし算のしかたは同じかな？ 答えの形まで、前題と同じになるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、たしてできた分数が、もっとかんたんな分数で言いかえられること。同じ大きさで、分母がもっと小さい分数はないかな？",
        },
        {
          layer: 3,
          text: "前題と同じく、分母を $6$ にそろえる。$\\dfrac{1}{3} = \\dfrac{2}{6}$ なので、$\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6}$。前題とちがうのはここから。$\\dfrac{3}{6}$ は分母と分子を $3$ でわると $\\dfrac{1}{2}$ になる（[約分]）。いちばんかんたんな形（最簡分数）は $\\dfrac{1}{2}$ なので、分子は $1$。",
        },
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
        {
          layer: 1,
          text: "前題と比べてみよう。分母の組み合わせは、前題とどこが違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、分母の $6$ が $4$ の倍数ではないこと。前題のように、どちらか一方の分母にそろえることはできるかな？",
        },
        {
          layer: 3,
          text: "前題では $6$ が $3$ の倍数だったので、分母を $6$ にそろえられた。今度は $6$ が $4$ の倍数ではないので、$4$ と $6$ の [最小公倍数] の $12$ にそろえる。$\\dfrac{1}{4}$ は分母と分子に $3$ をかけて $\\dfrac{3}{12}$、$\\dfrac{1}{6}$ は分母と分子に $2$ をかけて $\\dfrac{2}{12}$。$\\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}$。これ以上かんたんにできないので、分子は $5$。",
        },
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
        {
          layer: 1,
          text: "前題と比べてみよう。分母のほかに、どこが違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、$\\dfrac{2}{3}$ の分子が $1$ ではないこと。分母をそろえるとき、分子はどうなるかな？",
        },
        {
          layer: 3,
          text: "前題では、たす分数の分子がどちらも $1$ だった。今度は $\\dfrac{2}{3}$ の分子が $2$。$6$ は $3$ の倍数なので、分母を $6$ にそろえる。分母に $2$ をかけたら、分子にも $2$ をかけるので $\\dfrac{2}{3} = \\dfrac{4}{6}$。$\\dfrac{4}{6} + \\dfrac{1}{6} = \\dfrac{5}{6}$。これ以上かんたんにできないので、分子は $5$。",
        },
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
        {
          layer: 1,
          text: "前題と比べてみよう。今度は式が書いていない。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは、式ではなく、ジュースの場面の文になったこと。「合わせて何 L」は、どんな式で表せるかな？",
        },
        {
          layer: 3,
          text: "前題までは式が書いてあった。今度は「合わせて」なので、たし算の式 $\\dfrac{1}{2} + \\dfrac{1}{4}$ を自分で立てる。あとは前題と同じ。$4$ は $2$ の倍数なので、分母を $4$ にそろえて $\\dfrac{1}{2} = \\dfrac{2}{4}$。$\\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$。これ以上かんたんにできないので、合わせて $\\dfrac{3}{4}$ L。分子は $3$。",
        },
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
        {
          layer: 1,
          text: "$6$、$8$、$10$ は、大きさがでこぼこしている。でこぼこをならして、3 つとも同じ大きさにそろえるとしたら、いくつになるかな？",
        },
        {
          layer: 2,
          text: "そろえる前とそろえたあとで、3 つをぜんぶあわせた大きさは変わるかな？",
        },
        {
          layer: 3,
          text: "3 つをぜんぶあわせると $6 + 8 + 10 = 24$。ならしても、あわせた大きさ $24$ は変わらない。それを 3 つに同じずつ分けると $24 \\div 3 = 8$。平均は $8$。（$10$ から $2$ を $6$ にうつしても、3 つとも $8$ にそろう。）",
        },
      ],
      formulaPreview: "24 ÷ 3 = 8",
    },
    {
      id: "step2", position: 2,
      questionText: "3 つの数 4, 8, 12 の平均はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題でそろえた考え方は、今もそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、でこぼこの大きさ。前題より、小さい数はもっと小さく、大きい数はもっと大きくなっている。",
        },
        {
          layer: 3,
          text: "前題は、ぜんぶあわせた $6 + 8 + 10 = 24$ を 3 つに分けて、$24 \\div 3 = 8$ だった。今は、でこぼこが大きくなっただけで、やり方は同じ。$4 + 8 + 12 = 24$、$24 \\div 3 = 8$。平均は $8$。でこぼこが大きくなっても、あわせた大きさが同じなら、平均も同じになる。",
        },
      ],
      formulaPreview: "24 ÷ 3 = 8",
    },
    {
      id: "step3", position: 3,
      questionText: "3 つの数 5, 10, 15 の平均はいくつでしょう？",
      answer: 10, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題と同じやり方で、そろえられるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、3 つの数がどれも前題より大きくなったこと。ぜんぶあわせた大きさは、前題と同じままかな？",
        },
        {
          layer: 3,
          text: "前題は $4 + 8 + 12 = 24$、$24 \\div 3 = 8$ だった。今は 3 つの数がどれも大きくなったので、ぜんぶあわせた大きさも前題とちがう。やり方は同じ。$5 + 10 + 15 = 30$、$30 \\div 3 = 10$。平均は $10$。（$15$ から $5$ を、いちばん小さい $5$ にうつしても、3 つとも $10$ にそろう。ここまでの 3 問のように、同じ間かくでならぶ 3 つの数では、まん中の数が平均になる。）",
        },
      ],
      formulaPreview: "30 ÷ 3 = 10",
    },
    {
      id: "step4", position: 4,
      questionText: "3 つの数 9, 12, 18 の平均はいくつでしょう？",
      answer: 13, unit: "", unknownLabel: "平均",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題までと同じように考えて、だいじょうぶかな？",
        },
        {
          layer: 2,
          text: "変わったのは、数の間かく。前題までは同じ間かくでならんでいたけれど、今は $12$ をはさんで、小さいほうと大きいほうで、はなれ方がちがう。まん中の数が、そのまま平均になるかな？",
        },
        {
          layer: 3,
          text: "前題は $5 + 10 + 15 = 30$、$30 \\div 3 = 10$ で、まん中の数 $10$ がそのまま平均だった。今は間かくがそろっていないので、まん中の数 $12$ は平均にならない。ぜんぶあわせて 3 つに分けるやり方は、いつでも使える。$9 + 12 + 18 = 39$、$39 \\div 3 = 13$。平均は $13$。（$18$ から $4$ を $9$ へ、$1$ を $12$ へうつすと、3 つとも $13$ にそろう。）",
        },
      ],
      formulaPreview: "39 ÷ 3 = 13",
    },
    {
      id: "step5", position: 5,
      questionText: "テストの 3 回の点数が 70, 80, 90 点でした。平均は何点でしょう？",
      answer: 80, unit: "点", unknownLabel: "平均点",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題までの考え方は、ここでもそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、ただの数が「3 回のテストの点数」になったこと。ならして同じにするとは、テストでは何を同じにすることかな？",
        },
        {
          layer: 3,
          text: "前題は $9 + 12 + 18 = 39$、$39 \\div 3 = 13$ だった。今は数がテストの点数になっただけで、やり方は同じ。$70 + 80 + 90 = 240$、$240 \\div 3 = 80$。平均は $80$ 点。「3 回とも同じ点だったとしたら、$80$ 点ずつ」という意味になる。",
        },
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
        {
          layer: 1,
          text: "「時速」は、何時間あたりに進む道のりのことかな？ どの 1 時間も同じだけ進んだとして（[平均] のように、ならして考えると）、$2$ 時間で $120$ km なら、1 時間ではどれだけ進んだことになる？",
        },
        {
          layer: 2,
          text: "見ているのは、1 時間ぶんの道のり。$120$ km は、その 1 時間ぶんの何こ分かな？",
        },
        {
          layer: 3,
          text: "1 時間に □ km 進むとすると、2 時間では $□ \\times 2$ km。それが $120$ km なので、$□ \\times 2 = 120$、$□ = 120 \\div 2 = 60$。速さは時速 $60$ km（$60$ km/時）。速さは「道のり ÷ 時間」で、1 時間あたりの道のりになる。",
        },
      ],
      formulaPreview: "120 ÷ 2 = 60",
    },
    {
      id: "step2", position: 2,
      questionText: "240km を 3 時間で走る車の速さは時速何 km でしょう？",
      answer: 80, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で使った考え方は、今もそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、道のりと時間の数だけ。聞かれているのは、前題と同じ「1 時間あたりに進む道のり」かな？",
        },
        {
          layer: 3,
          text: "前題は $120$ km を $2$ 時間で、$120 \\div 2 = 60$、時速 $60$ km だった。今は道のりが $240$ km、時間が $3$ 時間に変わっただけで、やり方は同じ。$240 \\div 3 = 80$。速さは時速 $80$ km（$80$ km/時）。",
        },
      ],
      formulaPreview: "240 ÷ 3 = 80",
    },
    {
      id: "step3", position: 3,
      questionText: "300km を 5 時間で走る車の速さは時速何 km でしょう？",
      answer: 60, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ どちらの車が速いか、すぐに言えるかな？",
        },
        {
          layer: 2,
          text: "前題とくらべて、道のりは長くなった。でも、長い道のりを走ったほうが速い、と言えるかな？",
        },
        {
          layer: 3,
          text: "前題は $240 \\div 3 = 80$ で、時速 $80$ km だった。今は道のりが $300$ km と長いけれど、時間も $5$ 時間かかっている。同じく 1 時間あたりにすると、$300 \\div 5 = 60$。速さは時速 $60$ km（$60$ km/時）。道のりが長くても、前題の車よりおそい——速さは、道のりだけでは決まらない。",
        },
      ],
      formulaPreview: "300 ÷ 5 = 60",
    },
    {
      id: "step4", position: 4,
      questionText: "420km を 6 時間で走る車の速さは時速何 km でしょう？",
      answer: 70, unit: "km/時", unknownLabel: "速さ",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題までのやり方は、そのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、道のりと時間の数だけ。道のりが $420$ km と、これまででいちばん大きな数になった。大きな数でも、前題と同じように考えられるかな？",
        },
        {
          layer: 3,
          text: "前題は $300 \\div 5 = 60$ で、時速 $60$ km だった。今は道のりが $420$ km、時間が $6$ 時間に変わっただけで、やり方は同じ。$420 \\div 6 = 70$（$42 \\div 6 = 7$ の $10$ 倍と考えるとよい）。速さは時速 $70$ km（$70$ km/時）。",
        },
      ],
      formulaPreview: "420 ÷ 6 = 70",
    },
    {
      id: "step5", position: 5,
      questionText: "200m を 50 秒で走る人の速さは秒速何 m でしょう？",
      answer: 4, unit: "m/秒", unknownLabel: "速さ",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題までの考え方は、ここでも使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、はかる単位。km と時間から、m と秒になった。「秒速」は、何秒あたりに進む道のりのことかな？",
        },
        {
          layer: 3,
          text: "前題は $420$ km を $6$ 時間で、$420 \\div 6 = 70$、1 時間あたり $70$ km（時速 $70$ km）だった。今は単位が m と秒に変わっただけで、考え方は同じ。1 秒あたりにすると、$200 \\div 50 = 4$。速さは秒速 $4$ m（$4$ m/秒）。",
        },
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

三角形の内角の和は **180°**——3 つの角を切りとってならべると、ちょうど一直線（半回転）になることで確かめられます。

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
        {
          layer: 1,
          text: "三角定規の 3 つの角は、それぞれ何度だったかな？ 1 まいの三角定規の 3 つの角をあわせると、どんな大きさになる？",
        },
        {
          layer: 2,
          text: "大きさや形のちがう三角形でも、3 つの角をあわせた大きさは同じかな？ 3 つの角を 1 つの点にあつめたところを、思いうかべてみよう。",
        },
        {
          layer: 3,
          text: "三角形の 3 つの角を切りとって、頂点を 1 つの点にあつめてならべると、ぴったり一直線になる。一直線の角は半回転の角で $180°$。三角定規でも $90° + 60° + 30° = 180°$、$90° + 45° + 45° = 180°$。だから三角形の内角の和は $180°$。",
        },
      ],
      formulaPreview: "(3-2)×180 = 180",
    },
    {
      id: "step2", position: 2,
      questionText: "四角形の内角の和は何度でしょう？",
      answer: 360, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で分かった三角形の角のことは、四角形でも使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、角の数が 3 つから 4 つになったこと。四角形の中に、前題の三角形はかくれていないかな？",
        },
        {
          layer: 3,
          text: "前題で、三角形の 3 つの角をあわせると $180°$ だった。四角形に対角線を 1 本ひくと、三角形 2 つに分かれる。四角形の 4 つの角は、この 2 つの三角形の角をぜんぶあわせたものなので、$180° \\times 2 = 360°$。四角形の内角の和は $360°$。",
        },
      ],
      formulaPreview: "(4-2)×180 = 360",
    },
    {
      id: "step3", position: 3,
      questionText: "五角形の内角の和は何度でしょう？",
      answer: 540, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題で使った見方は、今もそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、角が 1 つふえて 5 つになったこと。五角形の中には、三角形がいくつかくれているかな？",
        },
        {
          layer: 3,
          text: "前題の四角形は、対角線を 1 本ひいて三角形 2 つに分け、$180° \\times 2 = 360°$ だった。五角形は、1 つの頂点からほかの頂点へ対角線を 2 本ひくと、三角形 3 つに分かれる。$180° \\times 3 = 540°$。五角形の内角の和は $540°$。",
        },
      ],
      formulaPreview: "(5-2)×180 = 540",
    },
    {
      id: "step4", position: 4,
      questionText: "六角形の内角の和は何度でしょう？",
      answer: 720, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。角の数がふえると、いっしょにふえるものは何かな？",
        },
        {
          layer: 2,
          text: "変わったのは、角がまた 1 つふえて 6 つになったこと。角が 1 つふえると、中の三角形はいくつふえるかな？",
        },
        {
          layer: 3,
          text: "前題の五角形は、1 つの頂点から対角線をひいて三角形 3 つ、$180° \\times 3 = 540°$ だった。六角形も同じように 1 つの頂点から対角線をひくと、三角形 4 つに分かれる。$180° \\times 4 = 720°$。六角形の内角の和は $720°$。角が 1 つふえるごとに、三角形も 1 つふえる。",
        },
      ],
      formulaPreview: "(6-2)×180 = 720",
    },
    {
      id: "step5", position: 5,
      questionText: "八角形の内角の和は何度でしょう？",
      answer: 1080, unit: "°", unknownLabel: "内角の和",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 前題までと同じ見方で、今度も考えられるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、角の数のふえ方。前題までは 1 つずつふえていたけれど、今度は七角形をとばして、一度に 2 つふえた。これまでの図形の、角の数と中の三角形の数をならべてくらべると、何が見える？",
        },
        {
          layer: 3,
          text: "前題の六角形は、三角形 4 つで $180° \\times 4 = 720°$ だった。これまでをならべると、三角形・四角形・五角形・六角形で、中の三角形は 1 つ・2 つ・3 つ・4 つ——いつも角の数（辺の数）より 2 少ない。わけは、1 つの頂点から対角線をひくと、その頂点につながる 2 本の辺のほかは、辺 1 本ごとに三角形が 1 つできるから。八角形なら、三角形は $8 - 2 = 6$ つ。$180° \\times 6 = 1080°$。八角形の内角の和は $1080°$。図をかかなくても、角の数から三角形の数が分かる。",
        },
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
        {
          layer: 1,
          text: "円いお皿のまわりにひもを巻いて、その長さ（円周）を直径とくらべたら、どんなことに気がつくかな？ 円周は、直径の何倍くらいありそう？",
        },
        {
          layer: 2,
          text: "見るのは、円周が直径の何倍か、ということだけ。円の大きさがちがっても、この「何倍」はいつも同じ数になる。その数は、およそいくつだったかな？",
        },
        {
          layer: 3,
          text: "円周は、どんな円でも直径のおよそ $3.14$ 倍（この数を円周率という）。だから円周は「直径 × $3.14$」で出せる。直径 10cm なら $10 \\times 3.14 = 31.4$。円周は $31.4$ cm。",
        },
      ],
      formulaPreview: "10 × 3.14 = 31.4",
    },
    {
      id: "step2", position: 2,
      questionText: "直径 5cm の円の円周は何 cm でしょう？",
      answer: 15.7, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？ 前題で使った考え方は、今もそのまま使える？",
        },
        {
          layer: 2,
          text: "変わったのは、直径の長さだけ。前題の 10cm が、今は 5cm になった。円周と直径の関係は、前題と同じかな？",
        },
        {
          layer: 3,
          text: "前題は直径 10cm で、$10 \\times 3.14 = 31.4$ だった。今は直径が 5cm に変わっただけ。$5 \\times 3.14 = 15.7$。円周は $15.7$ cm。直径が前題の半分なので、円周も $31.4$ cm の半分になっている。",
        },
      ],
      formulaPreview: "5 × 3.14 = 15.7",
    },
    {
      id: "step3", position: 3,
      questionText: "直径 20cm の円の円周は何 cm でしょう？",
      answer: 62.8, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 円の大きさが変わっても、前題の考え方はそのまま使えるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、直径の長さだけ。前題の 5cm が、今は 20cm になった。",
        },
        {
          layer: 3,
          text: "前題は直径 5cm で、$5 \\times 3.14 = 15.7$ だった。今は直径が 20cm に変わっただけ。$20 \\times 3.14 = 62.8$。円周は $62.8$ cm。直径が前題の 4 倍なので、円周も $15.7$ cm の 4 倍になっている。",
        },
      ],
      formulaPreview: "20 × 3.14 = 62.8",
    },
    {
      id: "step4", position: 4,
      questionText: "半径 4cm の円の円周は何 cm でしょう？（直径 = 半径 × 2）",
      answer: 25.12, unit: "cm", unknownLabel: "円周",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。問題文をよく読みくらべて。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、わかっている長さが直径ではなく半径になったこと。半径と直径は、どんな関係だったかな？",
        },
        {
          layer: 3,
          text: "前題は直径 20cm がわかっていたので、$20 \\times 3.14 = 62.8$ ですぐに出せた。今わかっているのは半径 4cm なので、まず直径にする。直径は半径の 2 倍だから、$4 \\times 2 = 8$ cm。あとは前題と同じで、$8 \\times 3.14 = 25.12$。円周は $25.12$ cm。（半径 4cm にそのまま $3.14$ をかけると、円周の半分しか出ないので気をつけよう。）",
        },
      ],
      formulaPreview: "8 × 3.14 = 25.12",
    },
    {
      id: "step5", position: 5,
      questionText: "校庭の真ん中の円の直径が 6m です。円周は何 m でしょう？",
      answer: 18.84, unit: "m", unknownLabel: "円周",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は、校庭の真ん中にある大きな円。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、長さの単位が cm から m になったこと。円がとても大きくなっても、円周が直径の何倍かは変わるかな？",
        },
        {
          layer: 3,
          text: "前題は半径 4cm を 2 倍して直径 8cm にし、$8 \\times 3.14 = 25.12$ cm とした。今回は長さの単位が m になったけれど、円周が直径の $3.14$ 倍であることは変わらない。気をつけたいのは、問題文の 6m が半径ではなく直径だということ。だから 2 倍しないで、そのまま $3.14$ をかける。$6 \\times 3.14 = 18.84$。円周は $18.84$ m。",
        },
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
        {
          layer: 1,
          text: "この三角形の底辺を横、高さをたてにした長方形を思いうかべよう。長方形の面積なら、出し方を知っているね。三角形は、その長方形のどれだけ分になっているかな？",
        },
        {
          layer: 2,
          text: "見るのは、三角形と長方形の広さのちがいだけ。長方形を対角線で切ると、同じ大きさの三角形がいくつできるかな？",
        },
        {
          layer: 3,
          text: "横が底辺の 4cm、たてが高さの 6cm の長方形を考える。この長方形の面積は $4 \\times 6 = 24$ cm²。三角形はその長方形のちょうど半分なので、$24 \\div 2 = 12$。面積は $12$ cm²。だから三角形の面積は「底辺 × 高さ ÷ 2」で出せる。",
        },
      ],
      formulaPreview: "4 × 6 ÷ 2 = 12",
    },
    {
      id: "step2", position: 2,
      questionText: "底辺 5cm、高さ 8cm の三角形の面積はいくつでしょう？",
      answer: 20, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？ 前題で使った考え方は、今もそのまま使える？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの長さだけ。前題の 4cm と 6cm が、今は 5cm と 8cm になった。",
        },
        {
          layer: 3,
          text: "前題は $4 \\times 6 \\div 2 = 12$ だった。今は底辺と高さが変わっただけ。$5 \\times 8 = 40$、その半分で $40 \\div 2 = 20$。面積は $20$ cm²。",
        },
      ],
      formulaPreview: "5 × 8 ÷ 2 = 20",
    },
    {
      id: "step3", position: 3,
      questionText: "底辺 10cm、高さ 6cm の三角形の面積はいくつでしょう？",
      answer: 30, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 三角形の面積の出し方は、前題とどこか変わるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの長さだけ。今は底辺 10cm、高さ 6cm。どちらが底辺で、どちらが高さかを確かめよう。",
        },
        {
          layer: 3,
          text: "前題は $5 \\times 8 \\div 2 = 20$ だった。今は底辺 10cm、高さ 6cm に変わっただけ。$10 \\times 6 = 60$、その半分で $60 \\div 2 = 30$。面積は $30$ cm²。",
        },
      ],
      formulaPreview: "10 × 6 ÷ 2 = 30",
    },
    {
      id: "step4", position: 4,
      questionText: "底辺 12cm、高さ 8cm の三角形の面積はいくつでしょう？",
      answer: 48, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。数が大きくなっても、前題と同じ考え方で進めるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの数だけ。今は底辺 12cm、高さ 8cm になった。",
        },
        {
          layer: 3,
          text: "前題は $10 \\times 6 \\div 2 = 30$ だった。今は底辺 12cm、高さ 8cm に変わっただけ。$12 \\times 8 = 96$、その半分で $96 \\div 2 = 48$。面積は $48$ cm²。（先に底辺を半分にして $6 \\times 8 = 48$ としても、同じ答えになる。）",
        },
      ],
      formulaPreview: "12 × 8 ÷ 2 = 48",
    },
    {
      id: "step5", position: 5,
      questionText: "三角形の旗の底辺が 30cm、高さが 20cm のとき、面積はいくつでしょう？",
      answer: 300, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は紙の上の三角形ではなく、三角形の旗。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、三角形が身のまわりの「旗」になったこと。旗でも形が三角形なら、面積の出し方は前題と同じかな？",
        },
        {
          layer: 3,
          text: "前題は底辺 12cm、高さ 8cm で、$12 \\times 8 \\div 2 = 48$ cm² だった。今度は三角形の旗。形が三角形なら、何でできていても「底辺 × 高さ ÷ 2」が使える。$30 \\times 20 = 600$、その半分で $600 \\div 2 = 300$。面積は $300$ cm²。",
        },
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
        {
          layer: 1,
          text: "平行四辺形のかたはしを三角形に切りとって、反対がわにくっつけたら、どんな形になるかな？ その形の面積なら、出し方を知っているね。",
        },
        {
          layer: 2,
          text: "切りとってくっつけると長方形になる。見るのは、その長方形の「たて」が、平行四辺形のどの長さになっているかだけ。ななめの辺かな、高さかな？",
        },
        {
          layer: 3,
          text: "かたはしの三角形を反対がわへ動かすと、横が底辺 5cm、たてが高さ 4cm の長方形になる。形を動かしても面積は変わらないので、$5 \\times 4 = 20$。面積は $20$ cm²。だから平行四辺形の面積は「底辺 × 高さ」で出せる（ななめの辺の長さは使わない）。",
        },
      ],
      formulaPreview: "5 × 4 = 20",
    },
    {
      id: "step2", position: 2,
      questionText: "底辺 7cm、高さ 5cm の平行四辺形の面積はいくつでしょう？",
      answer: 35, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？ 前題で使った考え方は、今もそのまま使える？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの長さだけ。前題の 5cm と 4cm が、今は 7cm と 5cm になった。",
        },
        {
          layer: 3,
          text: "前題は底辺 5cm、高さ 4cm で、$5 \\times 4 = 20$ だった。今は底辺と高さが変わっただけ。$7 \\times 5 = 35$。面積は $35$ cm²。",
        },
      ],
      formulaPreview: "7 × 5 = 35",
    },
    {
      id: "step3", position: 3,
      questionText: "底辺 8cm、高さ 6cm の平行四辺形の面積はいくつでしょう？",
      answer: 48, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 平行四辺形の面積の出し方は、前題とどこか変わるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの長さだけ。今は底辺 8cm、高さ 6cm。",
        },
        {
          layer: 3,
          text: "前題は $7 \\times 5 = 35$ だった。今は底辺 8cm、高さ 6cm に変わっただけ。$8 \\times 6 = 48$。面積は $48$ cm²。",
        },
      ],
      formulaPreview: "8 × 6 = 48",
    },
    {
      id: "step4", position: 4,
      questionText: "底辺 12cm、高さ 10cm の平行四辺形の面積はいくつでしょう？",
      answer: 120, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。数が大きくなっても、前題と同じ考え方で進めるかな？",
        },
        {
          layer: 2,
          text: "変わったのは、底辺と高さの数だけ。今は底辺 12cm、高さ 10cm になった。",
        },
        {
          layer: 3,
          text: "前題は $8 \\times 6 = 48$ だった。今は底辺 12cm、高さ 10cm に変わっただけ。$12 \\times 10 = 120$。面積は $120$ cm²。",
        },
      ],
      formulaPreview: "12 × 10 = 120",
    },
    {
      id: "step5", position: 5,
      questionText: "本の表紙が平行四辺形で、底辺 20cm、高さ 25cm のとき、面積はいくつでしょう？",
      answer: 500, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は紙の上の形ではなく、本の表紙。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、平行四辺形が身のまわりの「本の表紙」になったこと。表紙でも形が平行四辺形なら、面積の出し方は前題と同じかな？",
        },
        {
          layer: 3,
          text: "前題は底辺 12cm、高さ 10cm で、$12 \\times 10 = 120$ cm² だった。今度は平行四辺形の本の表紙。形が平行四辺形なら、何に使われていても「底辺 × 高さ」が使える。$20 \\times 25 = 500$。面積は $500$ cm²。",
        },
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
| 三角形 | 0 | b | $(0 + b)\\cdot h / 2 = bh/2$ |
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
        {
          layer: 1,
          text: "同じ台形をもう 1 まい用意して、さかさまにしてとなりにくっつけたら、どんな形になるかな？ その形の面積なら、出し方を知っているね。",
        },
        {
          layer: 2,
          text: "2 まい合わせると平行四辺形になる。見るのは、その平行四辺形の底辺が、台形のどの長さとどの長さでできているかだけ。",
        },
        {
          layer: 3,
          text: "台形を 2 まい合わせると、底辺が「上底 + 下底」、高さが台形と同じ平行四辺形になる。底辺は $3 + 5 = 8$ cm で、面積は $8 \\times 4 = 32$ cm²。台形 1 まいはその半分なので、$32 \\div 2 = 16$。面積は $16$ cm²。だから台形の面積は「(上底 + 下底) × 高さ ÷ 2」で出せる。",
        },
      ],
      formulaPreview: "(3+5)×4÷2 = 16",
    },
    {
      id: "step2", position: 2,
      questionText: "上底 4cm、下底 6cm、高さ 4cm の台形の面積はいくつでしょう？",
      answer: 20, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違うかな？ 前題で使った考え方は、今もそのまま使える？",
        },
        {
          layer: 2,
          text: "変わったのは、上底と下底の長さだけ。高さは前題と同じ 4cm のまま。",
        },
        {
          layer: 3,
          text: "前題は $(3 + 5) \\times 4 \\div 2 = 16$ だった。今は上底と下底が 4cm と 6cm に変わっただけ。$4 + 6 = 10$、$10 \\times 4 = 40$、その半分で $40 \\div 2 = 20$。面積は $20$ cm²。",
        },
      ],
      formulaPreview: "(4+6)×4÷2 = 20",
    },
    {
      id: "step3", position: 3,
      questionText: "上底 5cm、下底 9cm、高さ 6cm の台形の面積はいくつでしょう？",
      answer: 42, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。何が同じで、何が違う？ 台形の面積の出し方は、前題とどこか変わるかな？",
        },
        {
          layer: 2,
          text: "変わったのは数だけ。今度は上底と下底だけでなく、高さも 6cm に変わった。",
        },
        {
          layer: 3,
          text: "前題は $(4 + 6) \\times 4 \\div 2 = 20$ だった。今は上底 5cm、下底 9cm、高さ 6cm に変わっただけ。$5 + 9 = 14$、$14 \\times 6 = 84$、その半分で $84 \\div 2 = 42$。面積は $42$ cm²。",
        },
      ],
      formulaPreview: "(5+9)×6÷2 = 42",
    },
    {
      id: "step4", position: 4,
      questionText: "上底 8cm、下底 12cm、高さ 10cm の台形の面積はいくつでしょう？",
      answer: 100, unit: "cm²", unknownLabel: "面積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。数が大きくなっても、前題と同じ考え方で進めるかな？",
        },
        {
          layer: 2,
          text: "変わったのは数だけ。今は上底 8cm、下底 12cm、高さ 10cm。どれが上底と下底で、どれが高さかを確かめよう。",
        },
        {
          layer: 3,
          text: "前題は $(5 + 9) \\times 6 \\div 2 = 42$ だった。今は数が変わっただけ。$8 + 12 = 20$、$20 \\times 10 = 200$、その半分で $200 \\div 2 = 100$。面積は $100$ cm²。（上底と下底の[平均]は 10cm。この長さに高さ 10cm をかけても、$10 \\times 10 = 100$ で同じになる。）",
        },
      ],
      formulaPreview: "(8+12)×10÷2 = 100",
    },
    {
      id: "step5", position: 5,
      questionText: "校舎の屋根が台形で、上底 15m、下底 20m、高さ 8m です。面積はいくつでしょう？",
      answer: 140, unit: "m²", unknownLabel: "面積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は紙の上の台形ではなく、校舎の屋根。何が同じで、何が違うかな？",
        },
        {
          layer: 2,
          text: "変わったのは、長さの単位が cm から m になったこと。そのとき、面積の単位は何になるかな？",
        },
        {
          layer: 3,
          text: "前題は $(8 + 12) \\times 10 \\div 2 = 100$ で、面積は $100$ cm² だった。今度は長さの単位が m になったけれど、出し方は同じ。$15 + 20 = 35$、$35 \\times 8 = 280$、その半分で $280 \\div 2 = 140$。長さが m なので、面積の単位は m²。面積は $140$ m²。",
        },
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
