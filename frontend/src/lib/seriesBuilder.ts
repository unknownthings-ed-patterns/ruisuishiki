/**
 * 検証通過した材料候補から、LearnerSeries を組み立てる。
 *
 * MVP では「同オペレータの系列」を基本形とする。
 * 最後の1問だけ「質的変化」（場面が違うが構造同じ）にする選択肢を持つ。
 *
 * 将来は教師が個別問題のオペレータを変更できる UI を入れる。
 */

import { ALL_PATTERNS, type ContextId, type PatternId, type PatternSpec } from "./patterns";
import type {
  Hint,
  LearnerSeries,
  LearnerStep,
  StepRecord,
  VariationOp,
} from "./types";
import { type MaterialCandidate, verifyCandidate } from "./verification";

export type { StepRecord };

type BuilderInput = {
  seriesId: string;
  title: string;
  subtitle: string;
  patternId: PatternId;
  contextId: ContextId;
  candidates: MaterialCandidate[];
  /** 最後のステップを「質的変化」として扱うか（場面の構造的同一性を強調するため） */
  lastIsQualitative?: boolean;
};

export type BuildResult =
  | {
      ok: true;
      series: LearnerSeries;
      /** 検証で除外された候補の数 */
      droppedCount: number;
    }
  | {
      ok: false;
      reason: string;
    };

export function buildSeries(input: BuilderInput): BuildResult {
  const pattern = ALL_PATTERNS[input.patternId];
  if (!pattern) {
    return { ok: false, reason: `未知の文型: ${input.patternId}` };
  }

  // 各候補を検証
  const steps: LearnerStep[] = [];
  let dropped = 0;
  let prevStepId: string | null = null;

  for (const candidate of input.candidates) {
    const result = verifyCandidate(input.patternId, candidate);
    if (!result.ok) {
      dropped++;
      continue;
    }

    const position = steps.length + 1;
    const id = `step${position}`;
    const isFirst = position === 1;
    const isLast =
      input.lastIsQualitative === true &&
      // 質的変化は2問目以降のみ意味がある
      steps.length > 0 &&
      // 検証可能な残り候補がないことを後で判定するため一旦保留：
      // ここでは候補すべてが検証通過と仮定し、最終位置を確定するために
      // この時点では false にしておき、後で書き換える
      false;

    const step: LearnerStep = {
      id,
      position,
      questionText: buildQuestionText(pattern, candidate, result.unknownName),
      answer: result.answer,
      unit: detectUnit(candidate, result.unknownName, pattern),
      unknownLabel: buildUnknownLabel(pattern, result.unknownName),
      variationFromPrevious: isFirst ? null : "same",
      compareWithStepId: isFirst ? null : prevStepId,
      hints: buildHints(pattern, candidate, result, isFirst),
      formulaPreview: buildFormulaPreview(pattern, candidate, result),
    };

    steps.push(step);
    prevStepId = id;
  }

  if (steps.length === 0) {
    return { ok: false, reason: "検証通過した候補がない" };
  }

  // 最終ステップを「質的変化」マークに変更（オプション）
  if (input.lastIsQualitative && steps.length >= 2) {
    steps[steps.length - 1].variationFromPrevious = "qualitative";
  }

  const series: LearnerSeries = {
    id: input.seriesId,
    title: input.title,
    subtitle: input.subtitle,
    patternId: input.patternId,
    unit: pattern.unit,
    steps,
  };

  return { ok: true, series, droppedCount: dropped };
}

function buildQuestionText(
  _pattern: PatternSpec,
  candidate: MaterialCandidate,
  _unknownName: string,
): string {
  // LLM が生成した scene をそのまま問題文として使う
  // 教師が後で編集できる前提（編集 UI は次フェーズ）
  return candidate.scene;
}

function detectUnit(
  candidate: MaterialCandidate,
  unknownName: string,
  _pattern: PatternSpec,
): string {
  return candidate.displayUnits?.[unknownName] ?? "";
}

function buildUnknownLabel(_pattern: PatternSpec, unknownName: string): string {
  // 文型と未知変数名から自然な呼び方を決める
  if (unknownName === "B") return "比較量";
  if (unknownName === "A") return "もとの量";
  if (unknownName === "p") return "割合";
  return "答え";
}

function buildHints(
  pattern: PatternSpec,
  candidate: MaterialCandidate,
  result: { unknownName: string; answer: number; formulaApplied: string },
  isFirst: boolean,
): Hint[] {
  // MVP では文型・初題かどうかに応じた template ベース
  // ヒント Layer 3 は SymPy(TS)で計算した式を表示
  const formula = substituteFormulaForHint(pattern, candidate);

  if (isFirst) {
    return [
      {
        layer: 1,
        text: `${unknownLabelOf(result.unknownName)}を求めるには、何と何の関係を使えばよいかな？`,
      },
      {
        layer: 2,
        text: `${pattern.naturalLanguage}を思い出そう。式は ${pattern.formulaTemplate} だよ。`,
      },
      {
        layer: 3,
        text: `${formula} = ${result.answer} で求められます。`,
      },
    ];
  }

  return [
    {
      layer: 1,
      text: "前の問題と比べてみよう。",
    },
    {
      layer: 2,
      text: `何が同じで、何が変わっただろう？ 数の関係 (${pattern.formulaTemplate}) は同じはず。`,
    },
    {
      layer: 3,
      text: `${formula} = ${result.answer} で求められます。`,
    },
  ];
}

function unknownLabelOf(name: string): string {
  if (name === "B") return "比較量";
  if (name === "A") return "もとの量";
  if (name === "p") return "割合";
  return "答え";
}

function buildFormulaPreview(
  pattern: PatternSpec,
  candidate: MaterialCandidate,
  result: { answer: number },
): string {
  // "100 × 0.5 = 50" 形式の構造的展開
  let preview = pattern.formulaTemplate;
  for (const [name, value] of Object.entries(candidate.bindings)) {
    preview = preview.replaceAll(name, value.toString());
  }
  // "B =" の左辺を答えに置き換え
  const eqIdx = preview.indexOf("=");
  if (eqIdx >= 0) {
    return `${preview.slice(eqIdx + 1).trim()} = ${result.answer}`;
  }
  return `${preview} = ${result.answer}`;
}

function substituteFormulaForHint(
  pattern: PatternSpec,
  candidate: MaterialCandidate,
): string {
  // ヒント Layer 3 用に、解式の右辺だけを値代入した形を作る
  let formula = pattern.formulaTemplate;
  for (const [name, value] of Object.entries(candidate.bindings)) {
    formula = formula.replaceAll(name, value.toString());
  }
  const eqIdx = formula.indexOf("=");
  if (eqIdx >= 0) {
    return formula.slice(eqIdx + 1).trim();
  }
  return formula;
}

// 念のため：未使用 import を抑える
void ({} as { StepRecord: unknown }).StepRecord;
void ({} as { VariationOp: unknown }).VariationOp;
