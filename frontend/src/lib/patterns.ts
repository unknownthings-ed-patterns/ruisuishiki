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

export type PatternId =
  | "P1" | "P2" | "P3" | "P4" | "P5"
  | "E1" | "E2" | "F1" | "R1" | "I1"
  | "Q1" | "S1" | "V1" | "D1"
  | "M1" | "PT1" | "PR1"
  | "T1" | "L1"
  | "ST1";

/**
 * 変数の意味的役割。
 * 単元によって自由に拡張する（割合の「もとにする量」、代数の「定数」など）。
 */
export type VariableSpec = {
  name: string;
  role: string;
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

/* --- 数学Ⅰ・A：数と式（algebra_1）--- */

/**
 * E1: 乗法公式（(x+a)(x+b) を展開した時の x の係数）
 *
 * 文型: (x+a)(x+b) = x² + (a+b)x + ab
 * 未知数: x の係数 = a + b
 *
 * 推理式の核「同じ文型なら同じ解式」が、係数 a, b の値を変えても
 * 「a+b を計算する」という一貫した解式で成立することを体感する系列。
 *
 * 質的変化（後半）：(y+a)(y+b)、(t+a)(t+b) のように変数記号を入れ替えても、
 * 「2つの定数の和」という構造は変わらない。これが学習の核。
 */
const E1: PatternSpec = {
  id: "E1",
  unit: "algebra_1",
  naturalLanguage: "(x+a)(x+b) の展開で x の係数を求める",
  formulaTemplate: "xCoef = a + b",
  variables: [
    { name: "a", role: "定数（前項）", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "b", role: "定数（後項）", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "xCoef", role: "xの係数", unknown: true, domain: { kind: "integer", min: -20, max: 20 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "xCoef", answer: k.a + k.b }),
};

/**
 * E2: 平方の展開（(x+a)² を展開した時の x の係数）
 *
 * 文型: (x+a)² = x² + 2ax + a²
 * 未知数: x の係数 = 2a
 *
 * E1（a+b の和）から E2（2a の倍）への移行で、
 * 「文型が違えば解式も変わる」を体感する。
 * 同時に「2a = a + a」と気づけば、これは E1 の特殊形である
 * という統合的な見方も育つ。
 */
const E2: PatternSpec = {
  id: "E2",
  unit: "algebra_1",
  naturalLanguage: "(x+a)² の展開で x の係数を求める",
  formulaTemplate: "xCoef = 2 * a",
  variables: [
    { name: "a", role: "定数", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "xCoef", role: "xの係数", unknown: true, domain: { kind: "integer", min: -20, max: 20 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "xCoef", answer: 2 * k.a }),
};

/**
 * F1: 因数分解（x² + Cx + D を (x+a)(x+b) に。a と b のうち小さい方を求める）
 *
 * E1 の「逆オペレータ」——E1 では (x+a)(x+b) から x の係数 a+b を求めたが、
 * F1 では x の係数（と定数項）から a, b を逆算する。
 * 推理式の「逆」変化オペレータの実装例。
 *
 * 文型: x² + Cx + D, where C = a+b, D = ab
 * 未知数: min(a, b)
 */
const F1: PatternSpec = {
  id: "F1",
  unit: "algebra_1",
  naturalLanguage: "x² + Cx + D を (x+a)(x+b) に因数分解",
  formulaTemplate: "minAB = min(a, b)",
  variables: [
    { name: "a", role: "因数（小）", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "b", role: "因数（大）", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "minAB", role: "小さい方", unknown: true, domain: { kind: "integer", min: -10, max: 10 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "minAB", answer: Math.min(k.a, k.b) }),
};

/**
 * R1: 平方根の簡単化（√n を a√m に。n = a²×m, m は平方因子を持たない）
 *
 * 文型: √(a²×m) = a√m
 * 未知数: a（根号の外に出る数）
 */
const R1: PatternSpec = {
  id: "R1",
  unit: "algebra_1",
  naturalLanguage: "√n を a√m の形に簡単化（n = a²×m）",
  formulaTemplate: "a = √(largestSquareFactor)",
  variables: [
    { name: "a", role: "根号の外", unknown: false, domain: { kind: "integer", min: 1, max: 20, step: 1 } },
    { name: "m", role: "根号の中", unknown: false, domain: { kind: "integer", min: 2, max: 20, step: 1 } },
    { name: "outside", role: "答え", unknown: true, domain: { kind: "integer", min: 1, max: 20 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "outside", answer: k.a }),
};

/**
 * I1: 1次不等式（ax + b > 0 を x > c に変形して c を求める）
 *
 * 文型: ax + b > 0 → x > -b/a（ただし a > 0、c が整数になる場合のみ）
 * 未知数: c = -b/a
 *
 * MVP では a > 0 かつ c が整数のケースのみ扱う。
 * 将来 a < 0（不等号反転）に拡張可能。
 */
const I1: PatternSpec = {
  id: "I1",
  unit: "algebra_1",
  naturalLanguage: "ax + b > 0 の解 x > c から c を求める（a>0, c整数）",
  formulaTemplate: "c = -b / a",
  variables: [
    { name: "a", role: "x の係数", unknown: false, domain: { kind: "integer", min: 1, max: 10, step: 1 } },
    { name: "b", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 50, step: 1 } },
    { name: "c", role: "解の境界値", unknown: true, domain: { kind: "integer", min: -50, max: 50 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "c", answer: -k.b / k.a }),
};

/* === 数Ⅰ・A 追加 === */

const Q1: PatternSpec = {
  id: "Q1",
  unit: "algebra_1",
  naturalLanguage: "x²+bx+c=0 の解の和（解と係数の関係）",
  formulaTemplate: "sumRoots = -b",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -10, max: 10, step: 1 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 50, step: 1 } },
    { name: "sumRoots", role: "解の和", unknown: true, domain: { kind: "integer", min: -20, max: 20 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "sumRoots", answer: -k.b }),
};

const S1: PatternSpec = {
  id: "S1",
  unit: "algebra_1",
  naturalLanguage: "命題 A→B から、A は B の何の条件か（1:十分 2:必要 3:必要十分 4:どちらでもない）",
  formulaTemplate: "code = 1|2|3|4",
  variables: [
    { name: "code", role: "条件の種別", unknown: true, domain: { kind: "integer", min: 1, max: 4 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "code", answer: k.code ?? 1 }),
};

const V1: PatternSpec = {
  id: "V1",
  unit: "algebra_1",
  naturalLanguage: "f(x)=x²+bx+c の頂点の x 座標（平方完成）",
  formulaTemplate: "vx = -b / 2",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -20, max: 20, step: 2 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 50, step: 1 } },
    { name: "vx", role: "頂点の x 座標", unknown: true, domain: { kind: "integer", min: -10, max: 10 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "vx", answer: -k.b / 2 }),
};

const D1: PatternSpec = {
  id: "D1",
  unit: "algebra_1",
  naturalLanguage: "5つの数の平均",
  formulaTemplate: "mean = (a+b+c+d+e) / 5",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "c", role: "3番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "d", role: "4番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "e", role: "5番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "mean", role: "平均", unknown: true, domain: { kind: "integer", min: -100, max: 100 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "mean", answer: (k.a + k.b + k.c + k.d + k.e) / 5 }),
};

/* === 中学数学 === */

const M1: PatternSpec = {
  id: "M1",
  unit: "middle",
  naturalLanguage: "連立方程式 x+y=p, x-y=q から x を求める",
  formulaTemplate: "x = (p + q) / 2",
  variables: [
    { name: "p", role: "x+y", unknown: false, domain: { kind: "integer", min: 2, max: 30, step: 2 } },
    { name: "q", role: "x-y", unknown: false, domain: { kind: "integer", min: 0, max: 20, step: 2 } },
    { name: "x", role: "x の値", unknown: true, domain: { kind: "integer", min: 1, max: 25 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "x", answer: (k.p + k.q) / 2 }),
};

const PT1: PatternSpec = {
  id: "PT1",
  unit: "middle",
  naturalLanguage: "ピタゴラスの定理：直角三角形の斜辺 c（a, b は2辺）",
  formulaTemplate: "c = √(a² + b²)",
  variables: [
    { name: "a", role: "辺1", unknown: false, domain: { kind: "integer", min: 1, max: 30 } },
    { name: "b", role: "辺2", unknown: false, domain: { kind: "integer", min: 1, max: 30 } },
    { name: "c", role: "斜辺", unknown: true, domain: { kind: "integer", min: 1, max: 50 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "c", answer: Math.sqrt(k.a * k.a + k.b * k.b) }),
};

const PR1: PatternSpec = {
  id: "PR1",
  unit: "middle",
  naturalLanguage: "組合せ C(n, 2)：n人から2人を選ぶ組合せ",
  formulaTemplate: "combinations = n*(n-1) / 2",
  variables: [
    { name: "n", role: "全体の人数", unknown: false, domain: { kind: "integer", min: 2, max: 20 } },
    { name: "combinations", role: "組合せの総数", unknown: true, domain: { kind: "integer", min: 1, max: 200 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "combinations", answer: (k.n * (k.n - 1)) / 2 }),
};

/* === 数Ⅱ・B === */

const T1: PatternSpec = {
  id: "T1",
  unit: "algebra_2",
  naturalLanguage: "三角関数の周期：x°を[0°,360°)の範囲に正規化",
  formulaTemplate: "normalized = x mod 360",
  variables: [
    { name: "x", role: "角度（度）", unknown: false, domain: { kind: "integer", min: 360, max: 1080 } },
    { name: "normalized", role: "正規化された角度", unknown: true, domain: { kind: "integer", min: 0, max: 359 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "normalized", answer: ((k.x % 360) + 360) % 360 }),
};

const L1: PatternSpec = {
  id: "L1",
  unit: "algebra_2",
  naturalLanguage: "対数 log_base(value) を整数で求める",
  formulaTemplate: "result = log_base(value)",
  variables: [
    { name: "base", role: "底", unknown: false, domain: { kind: "integer", min: 2, max: 10 } },
    { name: "value", role: "真数", unknown: false, domain: { kind: "integer", min: 2, max: 1000 } },
    { name: "result", role: "対数の値", unknown: true, domain: { kind: "integer", min: 1, max: 10 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "result", answer: Math.round(Math.log(k.value) / Math.log(k.base)) }),
};

/* === 統計 === */

const ST1: PatternSpec = {
  id: "ST1",
  unit: "statistics",
  naturalLanguage: "5つの数の中央値（並び替えて真ん中）",
  formulaTemplate: "median = sort(a,b,c,d,e)[2]",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "c", role: "3番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "d", role: "4番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "e", role: "5番目", unknown: false, domain: { kind: "integer", min: -100, max: 100 } },
    { name: "median", role: "中央値", unknown: true, domain: { kind: "integer", min: -100, max: 100 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => {
    const arr = [k.a, k.b, k.c, k.d, k.e].sort((x, y) => x - y);
    return { unknownName: "median", answer: arr[2] };
  },
};

export const ALL_PATTERNS: Record<PatternId, PatternSpec> = {
  P1, P2, P3, P4, P5,
  E1, E2, F1, R1, I1,
  Q1, S1, V1, D1,
  M1, PT1, PR1,
  T1, L1,
  ST1,
};

export const PATTERN_LIST: PatternSpec[] = [
  P1, P2, P3, P4, P5,
  E1, E2, F1, R1, I1,
  Q1, S1, V1, D1,
  M1, PT1, PR1,
  T1, L1,
  ST1,
];

export const CONTEXT_CATEGORIES = [
  { id: "shopping", label: "買い物" },
  { id: "food", label: "食べ物・給食" },
  { id: "people", label: "人数" },
  { id: "area", label: "面積" },
  { id: "length", label: "長さ" },
  { id: "time", label: "時間" },
  { id: "abstract", label: "抽象（記号）" },
] as const;

export type ContextId = (typeof CONTEXT_CATEGORIES)[number]["id"];
