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
  | "ST1"
  /* 東京書籍5年生（年度通し復習＋予習） */
  | "EL1" | "EL2" | "EL3" | "EL4" | "EL5"
  | "EL6" | "EL7" | "EL8" | "EL9" | "EL10"
  | "EL11" | "EL12" | "EL13" | "EL14"
  /* 数Ⅰ・A の追加（網羅化） */
  | "Q3" | "Q4" | "MM1" | "IT1" | "VAR1"
  /* 数Ⅱ・B の追加（網羅化） */
  | "A1" | "A2" | "VEC1" | "DIFF1"
  /* 数Ⅱ・B の追加2 */
  | "G1" | "G2" | "EXP1" | "VEC2"
  /* ★チャレンジ系列 */
  | "VV1" | "GR1" | "GR2" | "GR3" | "GR4"
  | "LN1" | "LN2" | "LN3" | "LN5" | "LN6" | "LN7" | "LN8";

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

/* === 小学校5年生・東京書籍順 === */

/** EL1: 整数と小数（× 10, ÷ 10 の関係） */
const EL1: PatternSpec = {
  id: "EL1",
  unit: "elementary_5",
  naturalLanguage: "小数を 10 倍する（位の関係）",
  formulaTemplate: "result = value * factor",
  variables: [
    { name: "value", role: "もとの数", unknown: false, domain: { kind: "decimal", min: 0.001, max: 100 } },
    { name: "factor", role: "倍率", unknown: false, domain: { kind: "decimal", min: 0.01, max: 1000 } },
    { name: "result", role: "答え", unknown: true, domain: { kind: "decimal", min: 0.00001, max: 100000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "result", answer: k.value * k.factor }),
};

/** EL2: 直方体の体積 */
const EL2: PatternSpec = {
  id: "EL2",
  unit: "elementary_5",
  naturalLanguage: "直方体の体積（縦×横×高さ）",
  formulaTemplate: "V = l * w * h",
  variables: [
    { name: "l", role: "縦", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "w", role: "横", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "h", role: "高さ", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "V", role: "体積", unknown: true, domain: { kind: "integer", min: 1, max: 8000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "V", answer: k.l * k.w * k.h }),
};

/** EL3: 比例（y = k × x） */
const EL3: PatternSpec = {
  id: "EL3",
  unit: "elementary_5",
  naturalLanguage: "比例 y = k × x の y を求める",
  formulaTemplate: "y = k * x",
  variables: [
    { name: "k", role: "比例定数", unknown: false, domain: { kind: "integer", min: 1, max: 100 } },
    { name: "x", role: "x の値", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "y", role: "y の値", unknown: true, domain: { kind: "integer", min: 1, max: 2000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "y", answer: k.k * k.x }),
};

/** EL4: 小数 × 小数 */
const EL4: PatternSpec = {
  id: "EL4",
  unit: "elementary_5",
  naturalLanguage: "小数 × 小数",
  formulaTemplate: "result = a * b",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "decimal", min: 0.1, max: 100 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "decimal", min: 0.1, max: 100 } },
    { name: "result", role: "積", unknown: true, domain: { kind: "decimal", min: 0.01, max: 10000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "result", answer: k.a * k.b }),
};

/** EL5: 小数 ÷ 小数 */
const EL5: PatternSpec = {
  id: "EL5",
  unit: "elementary_5",
  naturalLanguage: "小数 ÷ 小数",
  formulaTemplate: "result = a / b",
  variables: [
    { name: "a", role: "わられる数", unknown: false, domain: { kind: "decimal", min: 0.1, max: 100 } },
    { name: "b", role: "わる数", unknown: false, domain: { kind: "decimal", min: 0.1, max: 100 } },
    { name: "result", role: "商", unknown: true, domain: { kind: "decimal", min: 0.01, max: 1000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "result", answer: k.a / k.b }),
};

/** EL6: 最小公倍数 */
const EL6: PatternSpec = {
  id: "EL6",
  unit: "elementary_5",
  naturalLanguage: "最小公倍数（2つの数の最小公倍数）",
  formulaTemplate: "lcm = lcm(a, b)",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "integer", min: 2, max: 30 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "integer", min: 2, max: 30 } },
    { name: "lcm", role: "最小公倍数", unknown: true, domain: { kind: "integer", min: 2, max: 900 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => {
    function gcd(x: number, y: number): number {
      return y === 0 ? x : gcd(y, x % y);
    }
    return {
      unknownName: "lcm",
      answer: (k.a * k.b) / gcd(k.a, k.b),
    };
  },
};

/** EL7: 分数のたし算（最簡分数にした時の分子） */
const EL7: PatternSpec = {
  id: "EL7",
  unit: "elementary_5",
  naturalLanguage: "分数のたし算（通分→最簡分数の分子）",
  formulaTemplate: "numerator = simplified(a/b + c/d).numerator",
  variables: [
    { name: "a", role: "1番目の分子", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "b", role: "1番目の分母", unknown: false, domain: { kind: "integer", min: 2, max: 12 } },
    { name: "c", role: "2番目の分子", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "d", role: "2番目の分母", unknown: false, domain: { kind: "integer", min: 2, max: 12 } },
    { name: "numerator", role: "最簡分子", unknown: true, domain: { kind: "integer", min: 1, max: 100 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => {
    function gcd(x: number, y: number): number {
      return y === 0 ? x : gcd(y, x % y);
    }
    const num = k.a * k.d + k.c * k.b;
    const den = k.b * k.d;
    const g = gcd(Math.abs(num), den);
    return { unknownName: "numerator", answer: num / g };
  },
};

/** EL8: 3つの数の平均 */
const EL8: PatternSpec = {
  id: "EL8",
  unit: "elementary_5",
  naturalLanguage: "3つの数の平均",
  formulaTemplate: "mean = (a + b + c) / 3",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "integer", min: 0, max: 100 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "integer", min: 0, max: 100 } },
    { name: "c", role: "3番目", unknown: false, domain: { kind: "integer", min: 0, max: 100 } },
    { name: "mean", role: "平均", unknown: true, domain: { kind: "integer", min: 0, max: 100 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "mean", answer: (k.a + k.b + k.c) / 3 }),
};

/** EL9: 速さ＝道のり ÷ 時間 */
const EL9: PatternSpec = {
  id: "EL9",
  unit: "elementary_5",
  naturalLanguage: "速さ（道のり ÷ 時間）",
  formulaTemplate: "speed = distance / time",
  variables: [
    { name: "distance", role: "道のり", unknown: false, domain: { kind: "integer", min: 1, max: 1000 } },
    { name: "time", role: "時間", unknown: false, domain: { kind: "integer", min: 1, max: 100 } },
    { name: "speed", role: "速さ", unknown: true, domain: { kind: "integer", min: 1, max: 1000 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "speed", answer: k.distance / k.time }),
};

/** EL10: 多角形の内角の和（n - 2）× 180° */
const EL10: PatternSpec = {
  id: "EL10",
  unit: "elementary_5",
  naturalLanguage: "多角形の内角の和",
  formulaTemplate: "sum = (n - 2) * 180",
  variables: [
    { name: "n", role: "辺の数", unknown: false, domain: { kind: "integer", min: 3, max: 12 } },
    { name: "sum", role: "内角の和", unknown: true, domain: { kind: "integer", min: 180, max: 1800 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "sum", answer: (k.n - 2) * 180 }),
};

/** EL11: 円周 = 直径 × π */
const EL11: PatternSpec = {
  id: "EL11",
  unit: "elementary_5",
  naturalLanguage: "円周（直径 × 3.14）",
  formulaTemplate: "C = d * 3.14",
  variables: [
    { name: "d", role: "直径", unknown: false, domain: { kind: "integer", min: 1, max: 100 } },
    { name: "C", role: "円周", unknown: true, domain: { kind: "decimal", min: 1, max: 400 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "C", answer: k.d * 3.14 }),
};

/** EL12: 三角形の面積 */
const EL12: PatternSpec = {
  id: "EL12",
  unit: "elementary_5",
  naturalLanguage: "三角形の面積（底辺 × 高さ ÷ 2）",
  formulaTemplate: "S = base * height / 2",
  variables: [
    { name: "base", role: "底辺", unknown: false, domain: { kind: "integer", min: 1, max: 30 } },
    { name: "height", role: "高さ", unknown: false, domain: { kind: "integer", min: 2, max: 30, step: 2 } },
    { name: "S", role: "面積", unknown: true, domain: { kind: "integer", min: 1, max: 500 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "S", answer: (k.base * k.height) / 2 }),
};

/** EL13: 平行四辺形の面積 */
const EL13: PatternSpec = {
  id: "EL13",
  unit: "elementary_5",
  naturalLanguage: "平行四辺形の面積（底辺 × 高さ）",
  formulaTemplate: "S = base * height",
  variables: [
    { name: "base", role: "底辺", unknown: false, domain: { kind: "integer", min: 1, max: 30 } },
    { name: "height", role: "高さ", unknown: false, domain: { kind: "integer", min: 1, max: 30 } },
    { name: "S", role: "面積", unknown: true, domain: { kind: "integer", min: 1, max: 900 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "S", answer: k.base * k.height }),
};

/** EL14: 台形の面積（上底 + 下底）× 高さ ÷ 2 */
const EL14: PatternSpec = {
  id: "EL14",
  unit: "elementary_5",
  naturalLanguage: "台形の面積（(上底＋下底) × 高さ ÷ 2）",
  formulaTemplate: "S = (a + b) * h / 2",
  variables: [
    { name: "a", role: "上底", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "b", role: "下底", unknown: false, domain: { kind: "integer", min: 1, max: 20 } },
    { name: "h", role: "高さ", unknown: false, domain: { kind: "integer", min: 2, max: 20, step: 2 } },
    { name: "S", role: "面積", unknown: true, domain: { kind: "integer", min: 1, max: 500 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "S", answer: ((k.a + k.b) * k.h) / 2 }),
};

/* === 数Ⅰ・A の追加 === */

/** Q3: x²+bx+c=0 の解の積 = c */
const Q3: PatternSpec = {
  id: "Q3",
  unit: "algebra_1",
  naturalLanguage: "x²+bx+c=0 の解の積（解と係数の関係）",
  formulaTemplate: "productRoots = c",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "productRoots", role: "解の積", unknown: true, domain: { kind: "integer", min: -50, max: 50 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "productRoots", answer: k.c }),
};

/** Q4: 2次方程式 x²+bx+c=0 の判別式 D = b²-4c (a=1) */
const Q4: PatternSpec = {
  id: "Q4",
  unit: "algebra_1",
  naturalLanguage: "x²+bx+c=0 の判別式 D = b²-4c",
  formulaTemplate: "D = b² - 4c",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "D", role: "判別式の値", unknown: true, domain: { kind: "integer", min: -100, max: 200 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "D", answer: k.b * k.b - 4 * k.c }),
};

/** MM1: 順列 P(n, 2) = n(n-1) */
const MM1: PatternSpec = {
  id: "MM1",
  unit: "algebra_1",
  naturalLanguage: "順列 P(n, 2) = n(n-1)（並べる）",
  formulaTemplate: "P = n * (n - 1)",
  variables: [
    { name: "n", role: "全体", unknown: false, domain: { kind: "integer", min: 2, max: 20 } },
    { name: "P", role: "順列の総数", unknown: true, domain: { kind: "integer", min: 2, max: 400 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "P", answer: k.n * (k.n - 1) }),
};

/** IT1: 約数の個数 */
const IT1: PatternSpec = {
  id: "IT1",
  unit: "algebra_1",
  naturalLanguage: "整数の約数の個数",
  formulaTemplate: "count = number of divisors of n",
  variables: [
    { name: "n", role: "整数", unknown: false, domain: { kind: "integer", min: 1, max: 1000 } },
    { name: "count", role: "約数の個数", unknown: true, domain: { kind: "integer", min: 1, max: 50 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => {
    let count = 0;
    for (let i = 1; i * i <= k.n; i++) {
      if (k.n % i === 0) {
        count++;
        if (i * i !== k.n) count++;
      }
    }
    return { unknownName: "count", answer: count };
  },
};

/** VAR1: 5つの数の分散 */
const VAR1: PatternSpec = {
  id: "VAR1",
  unit: "algebra_1",
  naturalLanguage: "5つの数の分散（偏差²の平均）",
  formulaTemplate: "var = mean((xᵢ - mean)²)",
  variables: [
    { name: "a", role: "1番目", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "b", role: "2番目", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "c", role: "3番目", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "d", role: "4番目", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "e", role: "5番目", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "variance", role: "分散", unknown: true, domain: { kind: "integer", min: 0, max: 2500 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => {
    const values = [k.a, k.b, k.c, k.d, k.e];
    const m = values.reduce((s, v) => s + v, 0) / 5;
    const sqSum = values.reduce((s, v) => s + (v - m) * (v - m), 0);
    return { unknownName: "variance", answer: sqSum / 5 };
  },
};

/* === 数Ⅱ・B の追加 === */

/** A1: 等差数列の n 項目 a_n = a + (n-1) × d */
const A1: PatternSpec = {
  id: "A1",
  unit: "algebra_2",
  naturalLanguage: "等差数列の n 項目",
  formulaTemplate: "an = a + (n - 1) * d",
  variables: [
    { name: "a", role: "初項", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "d", role: "公差", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "n", role: "項数", unknown: false, domain: { kind: "integer", min: 2, max: 30 } },
    { name: "an", role: "n 項目の値", unknown: true, domain: { kind: "integer", min: -300, max: 300 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "an", answer: k.a + (k.n - 1) * k.d }),
};

/** A2: 等差数列の和 S_n = n(a + l) / 2 */
const A2: PatternSpec = {
  id: "A2",
  unit: "algebra_2",
  naturalLanguage: "等差数列の和",
  formulaTemplate: "S = n * (a + l) / 2",
  variables: [
    { name: "a", role: "初項", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "l", role: "末項", unknown: false, domain: { kind: "integer", min: -20, max: 200 } },
    { name: "n", role: "項数", unknown: false, domain: { kind: "integer", min: 2, max: 100 } },
    { name: "S", role: "和", unknown: true, domain: { kind: "integer", min: -10000, max: 10000 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "S", answer: (k.n * (k.a + k.l)) / 2 }),
};

/** VEC1: 2次元ベクトルの内積 */
const VEC1: PatternSpec = {
  id: "VEC1",
  unit: "algebra_2",
  naturalLanguage: "ベクトルの内積 (a,b)·(c,d) = ac + bd",
  formulaTemplate: "dot = a*c + b*d",
  variables: [
    { name: "a", role: "v1.x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "b", role: "v1.y", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "c", role: "v2.x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "d", role: "v2.y", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "dot", role: "内積", unknown: true, domain: { kind: "integer", min: -200, max: 200 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "dot", answer: k.a * k.c + k.b * k.d }),
};

/** DIFF1: f(x) = ax^n を微分して x=1 で評価。f'(1) = a*n */
const DIFF1: PatternSpec = {
  id: "DIFF1",
  unit: "algebra_2",
  naturalLanguage: "f(x) = ax^n の微分係数 f'(1)",
  formulaTemplate: "fprime1 = a * n",
  variables: [
    { name: "a", role: "係数", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "n", role: "次数", unknown: false, domain: { kind: "integer", min: 1, max: 6 } },
    { name: "fprime1", role: "f'(1)", unknown: true, domain: { kind: "integer", min: 1, max: 60 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "fprime1", answer: k.a * k.n }),
};

/* === 数Ⅱ・B の追加 2 === */

/** G1: 等比数列の n 項目 a_n = a × r^(n-1) */
const G1: PatternSpec = {
  id: "G1",
  unit: "algebra_2",
  naturalLanguage: "等比数列の n 項目",
  formulaTemplate: "an = a * r^(n-1)",
  variables: [
    { name: "a", role: "初項", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "r", role: "公比", unknown: false, domain: { kind: "integer", min: 2, max: 5 } },
    { name: "n", role: "項数", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "an", role: "n 項目", unknown: true, domain: { kind: "integer", min: 1, max: 10000 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "an", answer: k.a * k.r ** (k.n - 1) }),
};

/** G2: 等比数列の和 S_n = a(r^n - 1)/(r - 1) */
const G2: PatternSpec = {
  id: "G2",
  unit: "algebra_2",
  naturalLanguage: "等比数列の和",
  formulaTemplate: "S = a * (r^n - 1) / (r - 1)",
  variables: [
    { name: "a", role: "初項", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "r", role: "公比", unknown: false, domain: { kind: "integer", min: 2, max: 5 } },
    { name: "n", role: "項数", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "S", role: "和", unknown: true, domain: { kind: "integer", min: 1, max: 50000 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({
    unknownName: "S",
    answer: (k.a * (k.r ** k.n - 1)) / (k.r - 1),
  }),
};

/** EXP1: 指数関数 b^n */
const EXP1: PatternSpec = {
  id: "EXP1",
  unit: "algebra_2",
  naturalLanguage: "指数の値 b^n",
  formulaTemplate: "result = b^n",
  variables: [
    { name: "b", role: "底", unknown: false, domain: { kind: "integer", min: 2, max: 10 } },
    { name: "n", role: "指数", unknown: false, domain: { kind: "integer", min: 1, max: 10 } },
    { name: "result", role: "値", unknown: true, domain: { kind: "integer", min: 1, max: 100000 } },
  ],
  difficultyTier: 1,
  evaluate: (k) => ({ unknownName: "result", answer: k.b ** k.n }),
};

/** VEC2: ベクトルの大きさ |v| = √(a²+b²)（整数結果ピタゴラス数） */
const VEC2: PatternSpec = {
  id: "VEC2",
  unit: "algebra_2",
  naturalLanguage: "ベクトルの大きさ |v| = √(a²+b²)",
  formulaTemplate: "|v| = sqrt(a² + b²)",
  variables: [
    { name: "a", role: "x 成分", unknown: false, domain: { kind: "integer", min: 0, max: 30 } },
    { name: "b", role: "y 成分", unknown: false, domain: { kind: "integer", min: 0, max: 30 } },
    { name: "mag", role: "大きさ", unknown: true, domain: { kind: "integer", min: 0, max: 50 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({
    unknownName: "mag",
    answer: Math.sqrt(k.a * k.a + k.b * k.b),
  }),
};

/* === ★チャレンジ === */

/**
 * VV1: f(x) = x² + bx + c の最小値（a=1 限定、b は偶数で整数解）。
 * 平方完成：f(x) = (x + b/2)² + (c - b²/4) より、最小値 = c - b²/4。
 */
const VV1: PatternSpec = {
  id: "VV1",
  unit: "advanced",
  naturalLanguage: "f(x) = x² + bx + c の最小値（a=1, b偶数）",
  formulaTemplate: "min = c - b² / 4",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -20, max: 20, step: 2 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 100 } },
    { name: "min", role: "最小値", unknown: true, domain: { kind: "integer", min: -100, max: 100 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "min", answer: k.c - (k.b * k.b) / 4 }),
};

/** GR1: f(x) = x² + bx + c の頂点の x 座標 = -b/2（b偶数） */
const GR1: PatternSpec = {
  id: "GR1",
  unit: "advanced",
  naturalLanguage: "f(x) = x² + bx + c の頂点の x 座標",
  formulaTemplate: "vx = -b / 2",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -20, max: 20, step: 2 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 100 } },
    { name: "vx", role: "頂点の x 座標", unknown: true, domain: { kind: "integer", min: -10, max: 10 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "vx", answer: -k.b / 2 }),
};

/** GR2: f(x) = x² + bx + c の頂点の y 座標 = c - b²/4 */
const GR2: PatternSpec = {
  id: "GR2",
  unit: "advanced",
  naturalLanguage: "f(x) = x² + bx + c の頂点の y 座標",
  formulaTemplate: "vy = c - b² / 4",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -20, max: 20, step: 2 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 100 } },
    { name: "vy", role: "頂点の y 座標", unknown: true, domain: { kind: "integer", min: -100, max: 100 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "vy", answer: k.c - (k.b * k.b) / 4 }),
};

/** GR3: f(x) = x² + bx + c の y 切片 = c */
const GR3: PatternSpec = {
  id: "GR3",
  unit: "advanced",
  naturalLanguage: "f(x) = x² + bx + c の y 切片",
  formulaTemplate: "yi = c",
  variables: [
    { name: "b", role: "x の係数", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "c", role: "定数項", unknown: false, domain: { kind: "integer", min: -50, max: 100 } },
    { name: "yi", role: "y 切片", unknown: true, domain: { kind: "integer", min: -50, max: 100 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "yi", answer: k.c }),
};

/** GR4: 頂点 (p, q) から f(x) = (x - p)² + q を展開した c の値（= p² + q） */
const GR4: PatternSpec = {
  id: "GR4",
  unit: "advanced",
  naturalLanguage: "頂点 (p, q) から元の式 x² + bx + c の c を求める",
  formulaTemplate: "c = p² + q",
  variables: [
    { name: "p", role: "頂点の x 座標", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "q", role: "頂点の y 座標", unknown: false, domain: { kind: "integer", min: -50, max: 100 } },
    { name: "c", role: "定数項", unknown: true, domain: { kind: "integer", min: -50, max: 200 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "c", answer: k.p * k.p + k.q }),
};

/** LN1: 2点を通る直線の傾き */
const LN1: PatternSpec = {
  id: "LN1",
  unit: "advanced",
  naturalLanguage: "2点を通る直線の傾き",
  formulaTemplate: "m = (y2 - y1) / (x2 - x1)",
  variables: [
    { name: "x1", role: "1点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "y1", role: "1点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "x2", role: "2点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "y2", role: "2点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "m", role: "傾き", unknown: true, domain: { kind: "integer", min: -20, max: 20 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "m", answer: (k.y2 - k.y1) / (k.x2 - k.x1) }),
};

/** LN2: 2点を通る直線の y 切片 */
const LN2: PatternSpec = {
  id: "LN2",
  unit: "advanced",
  naturalLanguage: "2点を通る直線の y 切片",
  formulaTemplate: "n = y1 - m × x1, m = (y2-y1)/(x2-x1)",
  variables: [
    { name: "x1", role: "1点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "y1", role: "1点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "x2", role: "2点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "y2", role: "2点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "n", role: "y 切片", unknown: true, domain: { kind: "integer", min: -50, max: 50 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => {
    const m = (k.y2 - k.y1) / (k.x2 - k.x1);
    return { unknownName: "n", answer: k.y1 - m * k.x1 };
  },
};

/** LN3: 点 (a, b) を通り傾き m の直線の y 切片 = b - ma */
const LN3: PatternSpec = {
  id: "LN3",
  unit: "advanced",
  naturalLanguage: "点 (a, b) を通り傾き m の直線の y 切片",
  formulaTemplate: "n = b - m × a",
  variables: [
    { name: "a", role: "通る点の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "b", role: "通る点の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "m", role: "傾き", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "n", role: "y 切片", unknown: true, domain: { kind: "integer", min: -50, max: 50 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "n", answer: k.b - k.m * k.a }),
};

/** LN5: 2点 A(x1,y1), B(x2,y2) の中点の x 座標 */
const LN5: PatternSpec = {
  id: "LN5",
  unit: "advanced",
  naturalLanguage: "2点の中点の x 座標",
  formulaTemplate: "mx = (x1 + x2) / 2",
  variables: [
    { name: "x1", role: "1点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "x2", role: "2点目の x", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "mx", role: "中点の x", unknown: true, domain: { kind: "decimal", min: -10, max: 10 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "mx", answer: (k.x1 + k.x2) / 2 }),
};

/** LN6: 2点 A(x1,y1), B(x2,y2) の中点の y 座標 */
const LN6: PatternSpec = {
  id: "LN6",
  unit: "advanced",
  naturalLanguage: "2点の中点の y 座標",
  formulaTemplate: "my = (y1 + y2) / 2",
  variables: [
    { name: "y1", role: "1点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "y2", role: "2点目の y", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "my", role: "中点の y", unknown: true, domain: { kind: "decimal", min: -20, max: 20 } },
  ],
  difficultyTier: 2,
  evaluate: (k) => ({ unknownName: "my", answer: (k.y1 + k.y2) / 2 }),
};

/** LN7: 傾き m の直線に垂直な直線の傾き = -1/m */
const LN7: PatternSpec = {
  id: "LN7",
  unit: "advanced",
  naturalLanguage: "傾き m の直線に垂直な直線の傾き",
  formulaTemplate: "m' = -1 / m",
  variables: [
    { name: "m", role: "もとの直線の傾き", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "mPerp", role: "垂直な直線の傾き", unknown: true, domain: { kind: "decimal", min: -10, max: 10 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({ unknownName: "mPerp", answer: -1 / k.m }),
};

/** LN8: 点 (x0, y0) と直線 ax + by + c = 0 の距離 */
const LN8: PatternSpec = {
  id: "LN8",
  unit: "advanced",
  naturalLanguage: "点と直線の距離 d = |ax₀+by₀+c| / √(a²+b²)",
  formulaTemplate: "d = |a*x0 + b*y0 + c| / sqrt(a^2 + b^2)",
  variables: [
    { name: "a", role: "直線の x 係数", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "b", role: "直線の y 係数", unknown: false, domain: { kind: "integer", min: -20, max: 20 } },
    { name: "c", role: "直線の定数項", unknown: false, domain: { kind: "integer", min: -50, max: 50 } },
    { name: "x0", role: "点の x 座標", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "y0", role: "点の y 座標", unknown: false, domain: { kind: "integer", min: -10, max: 10 } },
    { name: "d", role: "距離", unknown: true, domain: { kind: "decimal", min: 0, max: 100 } },
  ],
  difficultyTier: 3,
  evaluate: (k) => ({
    unknownName: "d",
    answer:
      Math.abs(k.a * k.x0 + k.b * k.y0 + k.c) /
      Math.sqrt(k.a * k.a + k.b * k.b),
  }),
};

export const ALL_PATTERNS: Record<PatternId, PatternSpec> = {
  P1, P2, P3, P4, P5,
  E1, E2, F1, R1, I1,
  Q1, S1, V1, D1,
  M1, PT1, PR1,
  T1, L1,
  ST1,
  EL1, EL2, EL3, EL4, EL5,
  EL6, EL7, EL8, EL9, EL10,
  EL11, EL12, EL13, EL14,
  Q3, Q4, MM1, IT1, VAR1,
  A1, A2, VEC1, DIFF1,
  G1, G2, EXP1, VEC2,
  VV1, GR1, GR2, GR3, GR4,
  LN1, LN2, LN3, LN5, LN6, LN7, LN8,
};

export const PATTERN_LIST: PatternSpec[] = [
  P1, P2, P3, P4, P5,
  E1, E2, F1, R1, I1,
  Q1, S1, V1, D1,
  M1, PT1, PR1,
  T1, L1,
  ST1,
  EL1, EL2, EL3, EL4, EL5,
  EL6, EL7, EL8, EL9, EL10,
  EL11, EL12, EL13, EL14,
  Q3, Q4, MM1, IT1, VAR1,
  A1, A2, VEC1, DIFF1,
  G1, G2, EXP1, VEC2,
  VV1, GR1, GR2, GR3, GR4,
  LN1, LN2, LN3, LN5, LN6, LN7, LN8,
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
