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
  /**
   * 正解・スキップ表示用の、人が読める文字列（例 "π/6, 5π/6"・"−1/√2"・"π/2"）。
   * 未指定なら `${answer}${unit}` をそのまま表示する。
   * answer が π・無理数・複数解のとき、生の小数（1.5707…）でなくこれを見せる。
   * 判定には一切使わない（judging は answer / solutionSet が正）。
   */
  answerDisplay?: string;
  /**
   * 複数解を全部答えさせる問題（三角方程式等）。指定時は judging が answer より優先。
   * 学習者は "," 区切りで全解を入力。順不同・許容誤差で多重集合一致。
   * 無指定の既存系列は従来通り answer 単数で判定（完全後方互換）。
   */
  solutionSet?: number[];
  /**
   * 入力補助 UI（π・√ パレット／複数解ヒント）の表示制御。
   * 無指定＝従来の素の数値入力（ローフロア維持）。
   * - "pi"・"sqrt"：π・√ の挿入ボタンと記法ヘルプを出す
   * - "multi"：複数解の "," 区切りヒントを出す
   */
  inputAffordances?: ("pi" | "sqrt" | "multi")[];
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
  /**
   * 問題理解を助ける図のマーカー（例：'<<CIRCLE_STEP1>>'）。
   * 問題文の直下に描画される、ステップ固有の small SVG。
   * 「フェードアウトする足場」のパタンに従い、Step 1 や質的変化のステップだけに
   * 置いて、慣れたら図なしで型を抽象的に扱えるように設計する。
   * 答えは見せず、配置・関係だけを示すこと（自得を裏切らない）。
   */
  figureMarker?: string;
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
  /**
   * 中心の問い（駆動質問）。系列を貫く 1 行の問い。
   * - 全問題の上部に細い帯で常駐表示し、解いている問題と単元の中心概念をつなぐ
   * - 系列カタログ（/learn/）にも表示し、発見者の頭を動かす
   * 教育パタン・ランゲージ Wiki の「胚細胞モデル」「熟慮的問い（駆動質問）」と整合。
   *
   * 形式：「どうすれば...？」「なぜ...？」などの一行の問い。
   */
  drivingQuestion?: string;
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
  /**
   * スキップしたか（散歩中に「今は飛ばす」を選んだ）。
   * skipped: true のとき correct: false が前提。
   * 進度計算では「addressed（次へ進める）」として扱うが、
   * 正答率や weeklyCorrect には数えない。
   */
  skipped?: boolean;
  /** ISO 8601 文字列。 */
  answeredAt: string;
};
