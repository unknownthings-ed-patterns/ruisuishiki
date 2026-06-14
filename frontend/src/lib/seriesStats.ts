/**
 * 統計の系列カタログ。
 * まずは中央値から。
 */

import type { LearnerSeries } from "./types";

/** ST1: 5つの数の中央値 */
export const STATS_MEDIAN_SERIES: LearnerSeries = {
  id: "stats_median_01",
  title: "中央値の入り口",
  subtitle:
    "5つの数を並び替えて真ん中を取る5問。平均との違いも体感する。",
  patternId: "ST1",
  unit: "statistics",
  revelationLabel: "5つの数を小さい順に並べて、真ん中（3番目）",
  derivation: `**中央値は「真ん中の代表」**

データを小さい順に並べたとき、**ちょうど真ん中の位置の値** が **中央値**（メディアン）です。

データが 5 個なら、並べて 3 番目。
データが 7 個なら、並べて 4 番目。
データが 100 個なら、並べて 50 番目と 51 番目の **平均**。

「**ちょうど真ん中**」を取る——これが中央値の発想です。

**たとえば**

データ：$3, 1, 4, 1, 5$

並び替えて：$1, 1, 3, 4, 5$

真ん中（3 番目）は $3$ → 中央値は **3**。

**中央値と平均の違い**

データの「真ん中」を表す代表値には、もう一つ **平均** があります。

| 代表値 | 計算 |
|---|---|
| 平均 | 全部足して個数で割る |
| 中央値 | 並び替えて真ん中 |

両方とも「データの中心」を表しますが、**ハズレ値（極端な値）の影響** が違います。

**平均の弱み：ハズレ値に弱い**

データ：$3, 4, 5, 6, 100$

- 平均：$(3 + 4 + 5 + 6 + 100)/5 = 23.6$
- 中央値：$5$

「100」という極端に大きい値があるせいで、平均は **23.6** に引っ張られています。でも「データの中心」を直感的に表現するなら、$5$ の方が自然——これが中央値の強みです。

**応用：年収・住宅価格・スコア**

中央値が活躍する場面：

- **年収**：一部の高所得者が平均を吊り上げるので、中央値の方が「ふつうの人の感覚」に近い
- **住宅価格**：高級物件の影響を避けるため、中央値が使われる
- **テストの点数**：満点近くの数人が平均を歪めるとき、中央値の方が「ふつうの実力」を表す

**「中央値」は分布の真ん中を切る点**

データを並べて、ちょうど **半分が上、半分が下** にくる値が中央値。「データの中で、ちょうど 50% の位置にくる値」とも言えます。

**順序統計量**

データを並び替えたときの「○ 番目」を扱う統計を **順序統計量** と言います。中央値はその代表で、他にも：

- **最小値**（1 番目）
- **最大値**（最後）
- **第 1 四分位数**（下から 25% の位置）
- **第 3 四分位数**（下から 75% の位置）

これらを組み合わせると、データの **分布の形** がよく見えます。

**箱ひげ図**

最小値・第 1 四分位・中央値・第 3 四分位・最大値の 5 つを並べたのが **箱ひげ図**。これを描けば、データの全体像が一目でわかります。

**中央値の役割**

| 代表値 | 強み | 弱み |
|---|---|---|
| 平均 | 全データを使う、計算が定式化 | ハズレ値に弱い |
| 中央値 | ハズレ値に強い | 並び替えが必要 |
| 最頻値 | 観察できる最も多い値 | 連続データには使いにくい |

データを分析するとき、**平均と中央値の両方** を見比べると、分布の特徴がより深く理解できます。`,
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "5つの数 3, 1, 4, 1, 5 の中央値はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "小さい順に並べ替えて、真ん中（3 番目）の数を見る。" },
        { layer: 2, text: "並び替え：1, 1, 3, 4, 5。" },
        { layer: 3, text: "真ん中は 3。" },
      ],
      formulaPreview: "sorted[2] = 3",
    },
    {
      id: "step2",
      position: 2,
      questionText: "5つの数 2, 7, 1, 8, 3 の中央値はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "並び替えて、真ん中を取る。" },
        { layer: 2, text: "並び替え：1, 2, 3, 7, 8。" },
        { layer: 3, text: "真ん中は 3。" },
      ],
      formulaPreview: "sorted[2] = 3",
    },
    {
      id: "step3",
      position: 3,
      questionText: "5つの数 10, 20, 30, 40, 50 の中央値はいくつでしょう？",
      answer: 30,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "もう並んでいる。真ん中を取るだけ。" },
        { layer: 2, text: "並びの 3 番目。" },
        { layer: 3, text: "30。" },
      ],
      formulaPreview: "sorted[2] = 30",
    },
    {
      id: "step4",
      position: 4,
      questionText: "5つの数 -3, -1, 0, 2, 5 の中央値はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "中央値",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "並び替え済み。真ん中を取る。" },
        { layer: 2, text: "並びの 3 番目。" },
        { layer: 3, text: "0。" },
      ],
      formulaPreview: "sorted[2] = 0",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "クラス 5 人のテスト結果 60, 100, 70, 90, 50 点の中央値はいくつでしょう？",
      answer: 70,
      unit: "点",
      unknownLabel: "中央値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "「点」がついただけ。やり方は同じ。",
        },
        { layer: 2, text: "並び替え：50, 60, 70, 90, 100。" },
        { layer: 3, text: "真ん中は 70。" },
      ],
      formulaPreview: "sorted[2] = 70",
    },
  ],
};

export const STATISTICS_SERIES_LIST: LearnerSeries[] = [
  STATS_MEDIAN_SERIES,
];
