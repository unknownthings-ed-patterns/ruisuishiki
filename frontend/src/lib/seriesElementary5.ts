/**
 * 小学校5年生・東京書籍「新しい算数 5」教科書順カタログ。
 *
 * 4月の最初の単元から3月の最後まで、教科書順に系列を並べる。
 * 復習にも予習にも使えるよう、各単元を一通り網羅する。
 *
 * 14単元（推理式に乗らない「合同」「グラフ」「展開図」はスキップ）。
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

/* ===== 5. 小数のわり算（現在ここ） ===== */

export const E5_DECIMAL_DIV_SERIES: LearnerSeries = {
  id: "e5_decimal_div_01",
  title: "小数のわり算（今やっているところ）",
  subtitle:
    "小数 ÷ 小数の計算5問。わる数の小数点を移動して整数にすると考えやすい。",
  patternId: "EL5",
  unit: "elementary_5",
  revelationLabel: "両方を 10 倍・100 倍してわる数を整数にすれば、いつもの割り算と同じ",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$2.4 \\div 0.6$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "答え",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "両方を 10 倍：$24 \\div 6$ にできる。" },
        { layer: 2, text: "答えは変わらない（同じ倍率なので）。" },
        { layer: 3, text: "$24 \\div 6 = 4$。" },
      ],
      formulaPreview: "24 ÷ 6 = 4",
    },
    {
      id: "step2", position: 2,
      questionText: "$3.6 \\div 0.9$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。両方を 10 倍。" },
        { layer: 2, text: "$36 \\div 9$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "36 ÷ 9 = 4",
    },
    {
      id: "step3", position: 3,
      questionText: "$0.48 \\div 0.06$ はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "今度は両方を 100 倍。" },
        { layer: 2, text: "$48 \\div 6$。" },
        { layer: 3, text: "8。" },
      ],
      formulaPreview: "48 ÷ 6 = 8",
    },
    {
      id: "step4", position: 4,
      questionText: "$7.2 \\div 1.2$ はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "答え",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "両方を 10 倍：$72 \\div 12$。" },
        { layer: 2, text: "12 × 6 = 72。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "72 ÷ 12 = 6",
    },
    {
      id: "step5", position: 5,
      questionText: "リボンを $1.5$ m に切ると、$4.5$ m のリボンから何本取れるでしょう？",
      answer: 3, unit: "本", unknownLabel: "本数",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "「何本取れるか」も割り算。$4.5 \\div 1.5$。" },
        { layer: 2, text: "両方を 10 倍：$45 \\div 15$。" },
        { layer: 3, text: "3 本。" },
      ],
      formulaPreview: "45 ÷ 15 = 3",
    },
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

/* ===== 12. 正多角形と円（円周） ===== */

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
  E5_LCM_SERIES,
  E5_FRACTION_ADD_SERIES,
  E5_MEAN_SERIES,
  E5_SPEED_SERIES,
  E5_POLYGON_ANGLE_SERIES,
  E5_CIRCUMFERENCE_SERIES,
  E5_TRIANGLE_AREA_SERIES,
  E5_PARALLELOGRAM_SERIES,
  E5_TRAPEZOID_AREA_SERIES,
];
