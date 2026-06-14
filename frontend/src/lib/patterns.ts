/**
 * 文型カタログ（フロントエンド版）。
 *
 * backend/src/ruisuishiki/patterns/ratio_5th.py の Python 定義と
 * 1対1対応する。バックエンドが将来 API として呼ばれるようになったら、
 * このカタログは API 経由で取得する形にリファクタする。
 *
 * MVPでは「コピペ生成モード」「ローカルAIモード」のために、
 * フロントエンドでも文型を保持する。
 */

export type PatternId = "P1" | "P2" | "P3" | "P4" | "P5";

export type VariableSpec = {
  name: string;
  role: "もとにする量" | "比較量" | "割合" | "条件付加";
  unknown: boolean;
  domain: {
    kind: "integer" | "decimal";
    min: number;
    max: number;
    step?: number;
  };
};

export type PatternSpec = {
  id: PatternId;
  unit: string;
  naturalLanguage: string;
  formulaTemplate: string;
  variables: VariableSpec[];
  difficultyTier: 1 | 2 | 3;
  /** unknown 変数を求める JS の式（材料の値を解いて検証するのに使う）。 */
  evaluate: (knowns: Record<string, number>) => {
    unknownName: string;
    answer: number;
  };
};

const P1: PatternSpec = {
  id: "P1",
  unit: "ratio_5th",
  naturalLanguage: "比較量を求める（もとにする量×割合）",
  formulaTemplate: "B = A × p",
  variables: [
    { name: "A", role: "もとにする量", unknown: false, domain: { kind: "integer", min: 10, max: 1000, step: 10 } },
    { name: "p", role: "割合", unknown: false, domain: { kind: "decimal", min: 0.1, max: 2.0, step: 0.1 } },
    { name: "B", role: "比較量", unknown: true, domain: { kind: "decimal", min: 0, max: 2000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "B", answer: k.A * k.p }),
};

const P2: PatternSpec = {
  id: "P2",
  unit: "ratio_5th",
  naturalLanguage: "割合を求める（比較量÷もとにする量）",
  formulaTemplate: "p = B ÷ A",
  variables: [
    { name: "A", role: "もとにする量", unknown: false, domain: { kind: "integer", min: 10, max: 1000, step: 10 } },
    { name: "B", role: "比較量", unknown: false, domain: { kind: "integer", min: 1, max: 2000, step: 1 } },
    { name: "p", role: "割合", unknown: true, domain: { kind: "decimal", min: 0, max: 2.0 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "p", answer: k.B / k.A }),
};

const P3: PatternSpec = {
  id: "P3",
  unit: "ratio_5th",
  naturalLanguage: "もとにする量を求める（比較量÷割合）",
  formulaTemplate: "A = B ÷ p",
  variables: [
    { name: "B", role: "比較量", unknown: false, domain: { kind: "integer", min: 1, max: 2000, step: 1 } },
    { name: "p", role: "割合", unknown: false, domain: { kind: "decimal", min: 0.1, max: 2.0, step: 0.1 } },
    { name: "A", role: "もとにする量", unknown: true, domain: { kind: "decimal", min: 0, max: 10000 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "A", answer: k.B / k.p }),
};

const P4: PatternSpec = {
  id: "P4",
  unit: "ratio_5th",
  naturalLanguage: "増量・減量（もとにする量×(1±差))",
  formulaTemplate: "B = A × (1 + delta)",
  variables: [
    { name: "A", role: "もとにする量", unknown: false, domain: { kind: "integer", min: 10, max: 1000, step: 10 } },
    { name: "delta", role: "条件付加", unknown: false, domain: { kind: "decimal", min: -0.5, max: 0.5, step: 0.05 } },
    { name: "B", role: "比較量", unknown: true, domain: { kind: "decimal", min: 0, max: 2000 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "B", answer: k.A * (1 + k.delta) }),
};

const P5: PatternSpec = {
  id: "P5",
  unit: "ratio_5th",
  naturalLanguage: "連続変化（2回の倍率変化を順次適用）",
  formulaTemplate: "B = A × (1 + d1) × (1 + d2)",
  variables: [
    { name: "A", role: "もとにする量", unknown: false, domain: { kind: "integer", min: 100, max: 10000, step: 100 } },
    { name: "d1", role: "条件付加", unknown: false, domain: { kind: "decimal", min: -0.3, max: 0.3, step: 0.05 } },
    { name: "d2", role: "条件付加", unknown: false, domain: { kind: "decimal", min: -0.3, max: 0.3, step: 0.05 } },
    { name: "B", role: "比較量", unknown: true, domain: { kind: "decimal", min: 0, max: 20000 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "B", answer: k.A * (1 + k.d1) * (1 + k.d2) }),
};

export const ALL_PATTERNS: Record<PatternId, PatternSpec> = {
  P1,
  P2,
  P3,
  P4,
  P5,
};

export const PATTERN_LIST: PatternSpec[] = [P1, P2, P3, P4, P5];

export const CONTEXT_CATEGORIES = [
  { id: "shopping", label: "買い物" },
  { id: "food", label: "食べ物・給食" },
  { id: "people", label: "人数" },
  { id: "area", label: "面積" },
  { id: "length", label: "長さ" },
  { id: "time", label: "時間" },
] as const;

export type ContextId = (typeof CONTEXT_CATEGORIES)[number]["id"];
