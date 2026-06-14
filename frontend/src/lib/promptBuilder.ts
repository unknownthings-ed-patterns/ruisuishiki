/**
 * AI（Claude Code / Codex / ChatGPT）に渡す「材料候補生成プロンプト」を組み立てる。
 *
 * backend/src/ruisuishiki/generation/material.py の Python テンプレートと
 * 意味的に対応する。フロントエンドでも同じ品質のプロンプトを出す。
 */

import {
  ALL_PATTERNS,
  CONTEXT_CATEGORIES,
  type ContextId,
  type PatternId,
} from "./patterns";

export function buildMaterialPrompt(
  patternId: PatternId,
  contextId: ContextId,
  count: number,
): string {
  const pattern = ALL_PATTERNS[patternId];
  const context =
    CONTEXT_CATEGORIES.find((c) => c.id === contextId) ?? CONTEXT_CATEGORIES[0];

  const variablesDesc = pattern.variables
    .map((v) => {
      const domain = v.domain;
      const range = `[${domain.min}, ${domain.max}]`;
      const stepStr = domain.step !== undefined ? `, 刻み ${domain.step}` : "";
      const marker = v.unknown ? "（未知数：値を入れない）" : "";
      return `- ${v.name}（${v.role}）: ${domain.kind}, ${range}${stepStr} ${marker}`;
    })
    .join("\n");

  const bindingKeys = pattern.variables
    .filter((v) => !v.unknown)
    .map((v) => `"${v.name}": <数値>`)
    .join(", ");

  const unitKeys = pattern.variables
    .map((v) => `"${v.name}": "<単位>"`)
    .join(", ");

  return `あなたは小学5年生向けの算数文章題を作る助手です。
以下の制約で、問題場面の候補を ${count} 個提案してください。

## 文型情報
- 文型: ${pattern.naturalLanguage}
- 解式: ${pattern.formulaTemplate}
- 文型ID: ${pattern.id}

## 変数の意味と値域
${variablesDesc}

## 場面の文脈カテゴリ
${context.label}（${context.id}）

## 厳守ルール
1. 場面は日本の小学5年生にとって自然なもの
2. 既知変数の値は値域内の整数または「きれいな小数」（0.1刻み）
3. 「ケーキ屋」「給食」「校庭」など、文脈カテゴリに合う具体物を使う
4. 未知数（求めるもの）の値は出力しない——記号計算で検証される
5. 出力は必ず JSON のみ。説明文・コードフェンス・前置きを含めない

## 出力形式（必ずこの JSON のみ）
{
  "candidates": [
    {
      "scene": "（場面の説明。1〜2文。最後に「○○はいくらでしょう？」のような問いかけで終える）",
      "bindings": { ${bindingKeys} },
      "displayUnits": { ${unitKeys} }
    }
  ]
}`;
}
