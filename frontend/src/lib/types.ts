/**
 * 学習者ビューが扱うデータ型。
 *
 * backend/src/ruisuishiki/models.py の Python 型と意味的に対応するが、
 * 学習者ビューは静的データのみを扱うので、型はフロントエンド都合で
 * シンプルに保つ。
 */

/** 変化オペレータの種類（第1弾§5.2 桝田の5系統）。 */
export type VariationOp =
  | "same" // 同（確認）
  | "inverse" // 逆（未知数の交換）
  | "plus_alpha" // ＋α（条件追加）
  | "qualitative" // 質的変化（場面転換）
  | "composite"; // 複合

/** フェードイン解説3層（第2弾§4.3）。 */
export type Hint = {
  layer: 1 | 2 | 3;
  /** Layer 1=比較指さし、Layer 2=着目促し、Layer 3=worked example */
  text: string;
};

/** 学習者が解く1問。 */
export type LearnerStep = {
  id: string;
  position: number;
  questionText: string;
  /** 数値の答え。SymPyで一意性が確認済み。 */
  answer: number;
  /** 「円」「g」「人」など、答えの単位。 */
  unit: string;
  /** 求めるものの自然な呼び方（「代金」「使った量」「人数」など）。 */
  unknownLabel: string;
  hints: Hint[];
  /** 前題からの差分オペレータ（先頭ステップはnull）。 */
  variationFromPrevious: VariationOp | null;
  /** 「比較せよ」のヒントで参照する前題のid（基本は直前題）。 */
  compareWithStepId: string | null;
  /** 質的変化到達時の「同じ仕組みだった」表示用。"100 × 0.5 = 50" 形式の構造的展開。 */
  formulaPreview: string;
};

/** 学習者が歩く系列。 */
export type LearnerSeries = {
  id: string;
  title: string;
  subtitle: string;
  /** 文型ID（'P1'等。子どもには出さない）。 */
  patternId: string;
  unit: string;
  steps: LearnerStep[];
  /**
   * 質的変化到達時の「気づき」演出で、「同じ仕組み」として
   * 強調表示する1行（系列ごとに人間にやさしい言葉で）。
   * 未設定時は汎用文を使う。
   */
  revelationLabel?: string;
  /**
   * 系列を解ききった「完了画面」に表示する公式の景色（導出・由来）。
   * 池田洋介流：「答のみで自得」したあとに「なぜそうなるか」を読む順。
   *
   * 形式：プレーンテキスト＋$...$（インライン数式）＋$$...$$（ディスプレイ数式）。
   * 段落は空行で区切る。
   */
  derivation?: string;
};

/** localStorage に保存する学習履歴。 */
export type StepRecord = {
  stepId: string;
  /** 正解までにかかった試行回数。 */
  attempts: number;
  /** どのヒント層まで開いたか（0なら開かず）。 */
  hintsOpened: 0 | 1 | 2 | 3;
  /** 正答に至ったか。 */
  correct: boolean;
  /** ISO 8601 文字列。 */
  answeredAt: string;
};
