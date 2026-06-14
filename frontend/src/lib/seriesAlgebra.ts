/**
 * 数学Ⅰ・A 「数と式」の系列カタログ。
 *
 * 大人の自己教育・高校生の復習・先取りの全層を想定。
 * 各系列は推理式の原則：
 * - 基本原形は計算が暗算でできる範囲から
 * - 「同」で a, b を入れ替え（変動理論の vary one thing）
 * - 「質的変化」で変数記号を入れ替え（構造の同一性を発見）
 *
 * MVP では「乗法公式：(x+a)(x+b) の x の係数」から開始。
 * 後続として因数分解（逆オペレータ）、平方根の簡単化、を計画中。
 */

import type { LearnerSeries } from "./types";

/**
 * (x+a)(x+b) の展開で、x の係数を求める。
 * x の係数 = a + b（足し算なら誰でもできる）の発見が核。
 */
export const ALGEBRA_EXPANSION_AB_SERIES: LearnerSeries = {
  id: "algebra_expansion_ab_01",
  title: "乗法公式の入り口",
  subtitle:
    "(x+a)(x+b) を展開した時の x の係数を、足し算だけで見つけていく5問。",
  patternId: "E1",
  unit: "algebra_1",
  steps: [
    // 1. 基本原形（小さい正の数で、暗算で和が出る）
    {
      id: "step1",
      position: 1,
      questionText:
        "(x + 1)(x + 2) を展開すると、x² + □x + 2 になります。□に入る数はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "展開すると x の項が現れる。前項どうし、後項どうし、たすき掛けの結果のうち、x の項を生むのはどれだろう？",
        },
        {
          layer: 2,
          text: "x の係数になるのは、2つの定数 (a と b) の和 a + b。ここでは a = 1、b = 2。",
        },
        {
          layer: 3,
          text: "1 + 2 = 3。これが x の係数。",
        },
      ],
      formulaPreview: "1 + 2 = 3",
    },

    // 2. 同（材料置換・確認の喜び）
    {
      id: "step2",
      position: 2,
      questionText:
        "(x + 2)(x + 3) を展開すると、x² + □x + 6 になります。□に入る数はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前の問題と比べてみよう。" },
        {
          layer: 2,
          text: "解き方は同じ。a と b の値だけが変わっている。a + b を計算しよう。",
        },
        { layer: 3, text: "2 + 3 = 5。" },
      ],
      formulaPreview: "2 + 3 = 5",
    },

    // 3. 同（数が少し大きくなる）
    {
      id: "step3",
      position: 3,
      questionText:
        "(x + 3)(x + 5) を展開すると、x² + □x + 15 になります。□に入る数はいくつでしょう？",
      answer: 8,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "やり方は前の問題と同じ。" },
        { layer: 2, text: "a + b を計算するだけ。" },
        { layer: 3, text: "3 + 5 = 8。" },
      ],
      formulaPreview: "3 + 5 = 8",
    },

    // 4. 同（負の数を導入・差異点の小さなバリエーション）
    {
      id: "step4",
      position: 4,
      questionText:
        "(x - 2)(x + 5) を展開すると、x² + □x - 10 になります。□に入る数はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "x の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。負の数が入っただけ。",
        },
        {
          layer: 2,
          text: "公式は同じ。 (x - 2) は (x + (-2)) と考える。 a = -2、b = 5。",
        },
        { layer: 3, text: "(-2) + 5 = 3。" },
      ],
      formulaPreview: "(-2) + 5 = 3",
    },

    // 5. 質的変化（変数記号の入れ替え：構造の同一性を体感）
    {
      id: "step5",
      position: 5,
      questionText:
        "(y + 4)(y + 6) を展開すると、y² + □y + 24 になります。□に入る数はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "y の係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "x が y に変わっただけ。文字の名前は何でもよい。",
        },
        {
          layer: 2,
          text: "「2つの定数の和」という関係は変わらない。a + b を計算しよう。",
        },
        { layer: 3, text: "4 + 6 = 10。" },
      ],
      formulaPreview: "4 + 6 = 10",
    },
  ],
};

/** 数学Ⅰ・A の全系列リスト（将来拡張）。 */
export const ALGEBRA_1_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA_EXPANSION_AB_SERIES,
];
