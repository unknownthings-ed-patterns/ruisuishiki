/**
 * MVP段階：学習者が歩く系列の静的データ。
 *
 * backend/data/material_pools/ratio_5th_P1_shopping.json をもとに、
 * 戸田の系列原則（基本原形→同→逆→質的変化）で5問を編成。
 *
 * SymPy検証済みの答えをハードコード。
 * ヒントは第3弾§8.3の語彙パターンに沿って手動で書いた。
 */

import type { LearnerSeries } from "./types";

export const RATIO_BASIC_SERIES: LearnerSeries = {
  id: "ratio_basic_01",
  title: "割合の入り口",
  subtitle: "もとにする量・割合・比較量を、比べながら見つけていく5問",
  patternId: "P1",
  unit: "ratio_5th",
  revelationLabel: "もとの量　×　倍率　＝　求める量",
  steps: [
    // ステップ1：基本原形（暗算で入れる）
    {
      id: "step1",
      position: 1,
      questionText: "1個100円のおかしが、半額になりました。代金はいくらでしょう？",
      answer: 50,
      unit: "円",
      unknownLabel: "代金",
      variationFromPrevious: null,
      compareWithStepId: null,
      formulaPreview: "100 × 0.5 = 50",
      hints: [
        {
          layer: 1,
          text: "半額って、もとのいくつ分かな？",
        },
        {
          layer: 2,
          text: "「半分」は数で表すと 0.5 倍。100円の半分はいくつ？",
        },
        {
          layer: 3,
          text: "もとの値段 × 0.5 で求められます。100 × 0.5 = ?",
        },
      ],
    },
    // ステップ2：同（数値だけ変える・確認の喜び）
    {
      id: "step2",
      position: 2,
      questionText: "200円のノートが、半額で売られています。代金はいくらでしょう？",
      answer: 100,
      unit: "円",
      unknownLabel: "代金",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      formulaPreview: "200 × 0.5 = 100",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。",
        },
        {
          layer: 2,
          text: "「半額」のところは同じ。何が変わった？",
        },
        {
          layer: 3,
          text: "もとの値段が 100円 → 200円 に変わっただけ。同じやり方で。",
        },
      ],
    },
    // ステップ3：同（割合を3割引に。少し新しい言葉に）
    {
      id: "step3",
      position: 3,
      questionText: "300円のおかしが、3割引きで売られています。代金はいくらでしょう？",
      answer: 210,
      unit: "円",
      unknownLabel: "代金",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      formulaPreview: "300 × 0.7 = 210",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。「半額」と「3割引き」、何が違う？",
        },
        {
          layer: 2,
          text: "3割引きは、もとの 10 のうち 3 を引いた残り、つまり 0.7 倍のこと。",
        },
        {
          layer: 3,
          text: "300 × 0.7 で求められます。",
        },
      ],
    },
    // ステップ4：同（割合のバリエーション・少し大きい数）
    {
      id: "step4",
      position: 4,
      questionText: "800円の絵本が、特売で 0.9 倍の値段になっています。代金はいくらでしょう？",
      answer: 720,
      unit: "円",
      unknownLabel: "代金",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      formulaPreview: "800 × 0.9 = 720",
      hints: [
        {
          layer: 1,
          text: "前の問題と比べてみよう。「3割引き」と「0.9倍」はどう違う？",
        },
        {
          layer: 2,
          text: "0.9倍は、もとの 1 から 0.1 だけ引いた値。1割引きと同じ意味。",
        },
        {
          layer: 3,
          text: "800 × 0.9 で求められます。",
        },
      ],
    },
    // ステップ5：質的変化（場面が「お買い物」から「給食」へ。構造は同じ）
    {
      id: "step5",
      position: 5,
      questionText: "ある日の給食の野菜は 400g 用意されました。そのうち 0.6 倍の量が食べられました。食べられた量はいくらでしょう？",
      answer: 240,
      unit: "g",
      unknownLabel: "食べられた量",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      formulaPreview: "400 × 0.6 = 240",
      hints: [
        {
          layer: 1,
          text: "場面はがらりと変わったけれど、前の問題とどこか同じところはない？",
        },
        {
          layer: 2,
          text: "「もとになる量 × 倍率」という関係は同じ。お金が g に変わっただけ。",
        },
        {
          layer: 3,
          text: "400 × 0.6 で求められます。同じ仕組みだった。",
        },
      ],
    },
  ],
};
