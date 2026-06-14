/**
 * 文型による解の検証（TypeScript版・SymPy の代替）。
 *
 * 学習者側は LLM を呼ばないので、教師ビューで生成された問題が
 * 「答えが一意」「値域内」「整数 or きれいな小数」を満たすかを
 * フロントエンドで完結して検証する。
 *
 * MVP の P1〜P5 はすべて単純な代数式なので、TypeScript で十分。
 * 将来 ill-structured な問題に拡張するときに backend SymPy へ移譲する。
 */

import { ALL_PATTERNS, type PatternId, type PatternSpec } from "./patterns";

export type VerificationResult =
  | {
      ok: true;
      unknownName: string;
      answer: number;
      formulaApplied: string;
    }
  | {
      ok: false;
      reason: string;
    };

/** 候補材料（教師ビューで貼り付けられる JSON 1要素）。 */
export type MaterialCandidate = {
  scene: string;
  bindings: Record<string, number>;
  displayUnits?: Record<string, string>;
};

export function verifyCandidate(
  patternId: PatternId,
  candidate: MaterialCandidate,
): VerificationResult {
  const pattern = ALL_PATTERNS[patternId];
  if (!pattern) {
    return { ok: false, reason: `未知の文型: ${patternId}` };
  }

  // 既知変数の存在チェック
  for (const v of pattern.variables) {
    if (v.unknown) continue;
    if (!(v.name in candidate.bindings)) {
      return { ok: false, reason: `既知変数 ${v.name} の値がない` };
    }
    if (typeof candidate.bindings[v.name] !== "number") {
      return { ok: false, reason: `既知変数 ${v.name} の値が数値でない` };
    }
  }

  // 既知変数の値域チェック
  for (const v of pattern.variables) {
    if (v.unknown) continue;
    const value = candidate.bindings[v.name];
    if (v.domain.min !== undefined && value < v.domain.min) {
      return { ok: false, reason: `${v.name}=${value} が下限 ${v.domain.min} 未満` };
    }
    if (v.domain.max !== undefined && value > v.domain.max) {
      return { ok: false, reason: `${v.name}=${value} が上限 ${v.domain.max} 超` };
    }
  }

  // 解を計算
  const result = pattern.evaluate(candidate.bindings);
  if (!Number.isFinite(result.answer)) {
    return { ok: false, reason: `解が有限でない: ${result.answer}` };
  }

  // 未知変数の値域チェック
  const unknownVar = pattern.variables.find((v) => v.unknown);
  if (unknownVar) {
    if (unknownVar.domain.min !== undefined && result.answer < unknownVar.domain.min) {
      return { ok: false, reason: `解 ${unknownVar.name}=${result.answer} が下限 ${unknownVar.domain.min} 未満` };
    }
    if (unknownVar.domain.max !== undefined && result.answer > unknownVar.domain.max) {
      return { ok: false, reason: `解 ${unknownVar.name}=${result.answer} が上限 ${unknownVar.domain.max} 超` };
    }
  }

  return {
    ok: true,
    unknownName: result.unknownName,
    answer: round(result.answer),
    formulaApplied: substituteFormula(pattern, candidate.bindings),
  };
}

/** 小さな浮動小数誤差を丸める。 */
function round(n: number): number {
  if (Number.isInteger(n)) return n;
  // 小数第3位までで四捨五入（教育用途には十分）
  return Math.round(n * 1000) / 1000;
}

/** 解式テンプレに値を代入した文字列を作る（"100 × 0.5 = 50"形式）。 */
function substituteFormula(
  pattern: PatternSpec,
  bindings: Record<string, number>,
): string {
  let formula = pattern.formulaTemplate;
  for (const [name, value] of Object.entries(bindings)) {
    formula = formula.replaceAll(name, value.toString());
  }
  return formula;
}

/** JSON テキストを candidates 配列としてパース。 */
export function parseCandidatesJson(jsonText: string): MaterialCandidate[] {
  let parsed: unknown;
  try {
    // コードフェンスを剥がす
    let cleaned = jsonText.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/```$/, "").trim();
    }
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error(`JSON が壊れている: ${e instanceof Error ? e.message : String(e)}`);
  }

  // candidates キー or 直接配列
  const candidates =
    Array.isArray(parsed)
      ? parsed
      : (parsed as { candidates?: unknown }).candidates;

  if (!Array.isArray(candidates)) {
    throw new Error(`candidates 配列が見つからない`);
  }

  return candidates.map((c, i) => {
    if (typeof c !== "object" || c === null) {
      throw new Error(`候補 ${i + 1} がオブジェクトでない`);
    }
    const obj = c as Record<string, unknown>;
    if (typeof obj.scene !== "string") {
      throw new Error(`候補 ${i + 1} に scene 文字列がない`);
    }
    if (typeof obj.bindings !== "object" || obj.bindings === null) {
      throw new Error(`候補 ${i + 1} に bindings オブジェクトがない`);
    }
    return {
      scene: obj.scene,
      bindings: obj.bindings as Record<string, number>,
      displayUnits: obj.displayUnits as Record<string, string> | undefined,
    };
  });
}
