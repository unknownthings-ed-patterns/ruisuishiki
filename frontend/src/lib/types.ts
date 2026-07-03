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
  /**
   * 国語ステップで、その step で参照/自己チェックした観点の id（第3弾§5.7）。
   * 集計軸「ジャンル×オペレータ×観点×ヒント到達層」の観点軸に使う。
   * 数学系列では未指定（完全後方互換）。
   */
  viewpointRefs?: string[];
  /** ISO 8601 文字列。 */
  answeredAt: string;
};

/* ============================================================================
 * 国語ユニット（俳句）の型（第3弾§5・加法的拡張）
 *
 * 設計方針：既存の数学型（LearnerStep / LearnerSeries）は一切変更しない。
 * 第3弾§5.1 の inline スケッチは既存 step に kind を足す形だったが、
 * LearnerStep の数学専用フィールド（answer: number, formulaPreview, unit,
 * unknownLabel）は必須なので、そこに国語 step を混ぜると「必須→任意」の
 * 変更が要る。第3弾§4.1/§5 が繰り返す「既存フィールドの変更はゼロ・加法的」
 * を最優先し、国語は独立型 KokugoStep / KokugoSeries として定義する
 * （Hint / VariationOp は共用）。play/page.tsx は型で分岐する（§7.1「分岐追加」）。
 * ========================================================================== */

/**
 * 国語ステップの種別（第3弾§5.1）。
 * 牧口四段階（読み比べ→観点抽出→制約付き産出→自由制作）を step 列に乗せる。
 */
export type StepKind =
  | "exercise" // 判定あり（音数識別・季語選択・並べ替え等。決定的判定）
  | "comparison" // 読み比べ（模範句の並置＋気づきの選択/記述。正誤なし）
  | "creation"; // 産出（本歌取・自作。制約充足＋自己チェック。正誤なし）

/** 産出スロットの制約（本歌取の穴埋め等。第3弾§5.2）。 */
export type SlotConstraint = {
  /** このスロットの目標音数（例 5）。moraCount で可視化する。 */
  moraCount?: number;
  /** 季語であること（季語表と照合）。 */
  mustBeKigo?: boolean;
  /** 元句の語（「差し替え」の担保。丸写し防止でなく差し替えを促す）。 */
  forbidWords?: string[];
};

/**
 * 国語 step の入力仕様（第3弾§5.2）。
 * inputAffordances（数学側）の国語版。step.kind と組で使う。
 */
export type KokugoInput =
  | { type: "choice"; options: string[]; answerIndex: number } // 決定的判定（音数・季語識別）
  | { type: "reorder"; segments: string[]; answerOrder: number[] } // 並べ替え（語順の比較）
  | { type: "fillIn"; template: string; slotConstraints: SlotConstraint[] } // 本歌取（穴埋め産出）
  | { type: "haikuText" }; // 自由律の1行入力＋よみがな欄（§6.2）

/**
 * 産出 step の充足チェック（第3弾§5.3）。
 * 判定ではなく可視化（G2）。作品の合否宣告・点数化・添削・代筆はしない。
 */
export type CreationCheck = {
  /** 目標音数の分節（俳句なら [5,7,5]）。 */
  meterTarget: number[];
  /** 音数チェックは正誤にしない。ぴったり/字余り/字足らずを表示するだけ。 */
  meterPolicy: "visualize";
  /** 季語表との照合結果を表示するだけ（判定しない）。 */
  kigoCheck?: "visualize";
  /**
   * 観点リストからの自己チェック項目。
   * 読み比べ step より後の step にのみ提示する（発見が先・G1。§7.1）。
   */
  selfChecklist: string[];
};

/**
 * 模範文（模範句）。第3弾§5.4・§9（調達計画）。
 * ※docs や背骨には現物を書かない（G12）。現物はこのデータファイルにのみ置く。
 */
export type MentorText = {
  id: string;
  /** 句の本文（漢字かな交じり可）。 */
  text: string;
  /** よみがな（音数表示用。moraCount の入力）。 */
  reading?: string;
  author: string;
  /** 出典（memory ruisuishiki-citation-format の書式）。 */
  sourceNote: string;
  /**
   * 権利区分（G12）。PD は「戦前没の俳人」に限定。
   * original＝設計者/先生の自作。licensed＝許諾済み（実名は載せない）。
   */
  rights: "PD" | "original" | "licensed";
  /** 季語（あれば）。 */
  kigo?: { word: string; season: "春" | "夏" | "秋" | "冬" | "新年" };
  /**
   * この句が担う観点（"オノマトペ"・"対比" 等）。
   * 教師/設計者ビュー用。子ども UI には出さない（発見を奪わない・G1／数学の文型タグ=F1と同じ）。
   */
  viewpointTags: string[];
  /**
   * 学習者作品を模範文プールに入れる場合の許諾フラグ。
   * 将来のオンライン句会の道もこのフラグで残す（実装はしない・Q4）。
   */
  shareable: boolean;
};

/** 国語ステップ（第3弾§5・KokugoStep）。Hint / VariationOp は数学と共用。 */
export type KokugoStep = {
  id: string;
  position: number;
  kind: StepKind;
  /** 問い/読み比べの指示/産出の指示。 */
  questionText: string;
  /** この step で並置・参照する模範句の id（読み比べ・本歌取の元句）。 */
  mentorTextRefs?: string[];
  /** 入力仕様（exercise/creation。comparison は気づき記録なので任意）。 */
  input?: KokugoInput;
  /** 産出 step の可視化・自己チェック（creation のみ）。 */
  creationCheck?: CreationCheck;
  hints: Hint[];
  /** 前題からの差分オペレータ（先頭ステップは null）。 */
  variationFromPrevious: VariationOp | null;
  /** 「比較せよ」で参照する前題（模範句カード）の step id。 */
  compareWithStepId: string | null;
  /**
   * 図のマーカー。「フェードアウトする足場」に従い Step 1 と質的変化 step のみ。
   * 答え（＝観点）を先に見せない（figure-does-not-reveal-answer は清書カード/模範句カードにも適用）。
   */
  figureMarker?: string;
  /**
   * 観点抽出 step で、ジャンルの ViewpointList（現在の版）をチェックリストとして
   * 提示するか。読み比べの後の step にのみ true にする（発見が先・G1）。
   * 選択は「発見の記録」であり採点ではない。
   */
  pickViewpoints?: boolean;
};

/** 国語系列（第3弾§5・KokugoSeries）。 */
export type KokugoSeries = {
  id: string; // 例 "kokugo_haiku_form_01"
  title: string;
  subtitle: string;
  /** ジャンル id（"haiku"）。ViewpointList と対応。 */
  genreId: string;
  unit: string; // 例 "俳句"
  steps: KokugoStep[];
  /** 中心の問い（胚細胞モデル。全 step 上部に常駐帯で表示）。 */
  drivingQuestion?: string;
};

/**
 * 観点リスト（第3弾§5.5）。版を持つ生き物。
 * 句会・読み比べ由来の追記で version が上がる（Q4裁定の核）。
 */
export type ViewpointItem = {
  /** "季語がある"・"音をそろえている" 等。 */
  text: string;
  /** どこ由来で追記されたか。 */
  addedIn: "initial" | "kukai" | "reading";
  /** ISO 日付。 */
  addedAt?: string;
  /**
   * この観点を初めて見せる系列 id（未指定＝initial＝最初から見せる）。
   * 各系列の核となる観点を先出ししないため（G1）。例：季語は系列②で解禁。
   */
  revealedInSeries?: string;
};
export type ViewpointList = {
  genreId: string; // "haiku"
  version: number;
  items: ViewpointItem[];
};

/**
 * 句会記録（第3弾§5.6）。localStorage。アプリは記録係（Q4）。
 * 本文は書かなくてよい（個人情報最小化）。
 */
export type KukaiRecord = {
  date: string;
  seriesId?: string;
  /** 最高得点句のメモ（本文任意）。 */
  bestWorkNote?: string;
  /** 「なぜよかったか」の観点メモ → ViewpointList への追記候補。 */
  whyGoodNotes: string[];
};
