/**
 * 系列カタログのうち、系列データを持たない小さな部品（学年の見出し・旧 id のリダイレクト・URL・
 * カタログへの戻り先）。クライアントのどのページからでも軽く読めるように seriesCatalog.ts
 * （全系列を import する）から分けてある（2026-10-11 バンドル分割）。
 */
import type { VariationOp } from "./types";

export type SeriesSubject =
  | "elementary"
  | "middle"
  | "secondary"
  | "secondary2"
  | "secondary3"
  | "university"
  | "tertiary"
  | "advanced";

/** subject の表示順（カタログでこの順に並べる）。 */
export const SUBJECT_ORDER: SeriesSubject[] = [
  "elementary",
  "middle",
  "secondary",
  "secondary2",
  "secondary3",
  "university",
  "tertiary",
  "advanced",
];

/** subject ごとのグループ見出し（subjectLabel と独立に持つ）。 */
export const SUBJECT_GROUP_LABEL: Record<SeriesSubject, string> = {
  elementary: "小学校算数",
  middle: "中学校数学",
  secondary: "高校数学Ⅰ・A",
  secondary2: "高校数学Ⅱ・B",
  secondary3: "高校数学Ⅲ・C",
  university: "大学への橋",
  tertiary: "統計・データ分析",
  // 将来用：高校数学を「分野別」（方程式・図形・関数 等）で
  // ハイレベル課題に取り組むコース。池田洋介『方程式・図形・関数からとらえる
  // 数学の基礎 分野別 標準問題精講』（旺文社）が出発点の候補。
  // entry がない間はカタログから消える（SUBJECT_ORDER.filter で空グループは省略）。
  advanced: "高校 ハイレベル",
};

/**
 * 廃止した系列の旧 seriesId → 現行 seriesId のリダイレクト表。
 *
 * 本サイトは GitHub Pages の static export で、系列は URL の `?seriesId=` クエリで
 * 選ばれる（パスではない）。static export では Next.js の `redirects()` が効かないため、
 * リダイレクトは学習者ビュー（learn/play）側で seriesId を読み替える形で実現する。
 *
 * - algebra2_trig_period_01（旧「三角関数の周期」）→ trig_general_angle_01
 *   周期の内容は系列1（一般角）の step8 に吸収済み。旧URL のリンク切れを防ぐ。
 * - 旧「数と式」5系列（初期プロトタイプ）→ 新ユニットの該当系列
 *   背骨 docs/numbers_expressions_series_design.md D3。**吸収先を実装したものだけ**
 *   ここへ移す（行き先が無いうちにリダイレクトすると学習者が迷子になる）。
 */
export const SERIES_REDIRECTS: Record<string, string> = {
  algebra2_trig_period_01: "trig_general_angle_01",
  algebra_expansion_ab_01: "algebra1_expansion_01",
  algebra_expansion_sq_01: "algebra1_expansion_01",
  algebra_factoring_01: "algebra1_factoring_01",
  algebra_sqrt_simplify_01: "algebra1_completing_square_01",
  algebra_linear_ineq_01: "algebra1_linear_inequality_01",
  algebra_disc_01: "algebra1_discriminant_01",
  /* 関数と関数のグラフ（背骨 D3）：吸収先を実装したのでリダイレクト */
  adv_quad_graph_01: "algebra1_quad_general_graph_01",
  algebra_quad_vertex_01: "algebra1_quad_general_graph_01",
  adv_quad_min_01: "algebra1_quad_minmax_01",
  /* 指数関数・対数関数（背骨 D3）：系列1 へ吸収 */
  algebra2_exp_01: "algebra2_exp_extend_01",
  /* 指数関数・対数関数（背骨 D3）：系列5 へ吸収 */
  algebra2_log_01: "algebra2_log_def_01",
  /* 数列（背骨 D5）：旧プロトタイプ 4 本を 1:1 で吸収 */
  algebra2_arith_nth_01: "algebra2_seq_arith_01",
  algebra2_arith_sum_01: "algebra2_seq_arith_sum_01",
  algebra2_geo_nth_01: "algebra2_seq_geo_01",
  algebra2_geo_sum_01: "algebra2_seq_geo_sum_01",
  /* 場合の数（背骨 D3・§6）：旧「順列 P(n,2)」プロトタイプ → 系5「順列」へ吸収 */
  algebra_perm_01: "algebra1_count_perm_01",
  /* 集合と論理（背骨 D3・§7）：旧「必要条件・十分条件」5 問 → 系6 へ吸収 */
  algebra_necsuf_01: "algebra1_logic_necsuf_01",
  /* データの分析（背骨 D3）：旧プロトタイプ 3 本 → 系2「代表値」・系6「分散と標準偏差」へ吸収。
   * あわせて subject "tertiary"（統計・データ分析）グループはカタログから廃止した。 */
  algebra_mean_01: "algebra1_data_center_01",
  stats_median_01: "algebra1_data_center_01",
  algebra_variance_01: "algebra1_data_variance_01",
  /* 整数の性質（背骨 D4）：旧「約数の個数」5 問プロトタイプ → 系列3 へ吸収 */
  algebra_divisor_01: "algebra1_int_factorization_01",
  /* 微分・積分（背骨 D4）：旧「微分の入り口」5 問プロトタイプ → 系列2「導関数」へ吸収 */
  algebra2_diff_01: "algebra2_calc_derivative_01",
  /* ベクトル（数Ⅲ・C 第9章・背骨 §8 裁定 Q5 案1）：旧 2 系列を系列8「成分表示」・系列6「内積」へ吸収 */
  algebra2_vec_mag_01: "math3_vec_component_01",
  algebra2_dot_01: "math3_vec_dot_01",
  /* 解と係数の関係（関数と関数のグラフの背骨 D3 では「行き先なし・カタログから外すのみ」だった）。
   * その後、図形と方程式の複素数ユニットに系列「解と係数の関係」ができたので、行き先として読み替える
   * （2026-10-11 全体監査・先生の裁定）。旧 URL・旧履歴から来た学習者が迷子にならないように。 */
  algebra_quad_sum_01: "adv_complex_root_coefficient_01",
  algebra_quad_prod_01: "adv_complex_root_coefficient_01",
};

/** 旧 seriesId なら現行 seriesId へ読み替える（なければそのまま返す）。 */
export function resolveSeriesId(seriesId: string): string {
  return SERIES_REDIRECTS[seriesId] ?? seriesId;
}

/** 旧系列 id を現行 id に直してから、step のオペレータを引く。 */
export function stepOpFromIndex(
  index: Map<string, VariationOp | null>,
  seriesId: string,
  stepId: string,
): VariationOp | null | undefined {
  return index.get(`${resolveSeriesId(seriesId)}::${stepId}`);
}

/**
 * 系列 id から学習者ビューの URL を作る。
 * 国語（俳句）系列は別ルート /learn/haiku、数学系列は /learn/play。
 */
export function seriesHref(seriesId: string): string {
  return seriesId.startsWith("kokugo_")
    ? `/learn/haiku/?seriesId=${seriesId}`
    : `/learn/play/?seriesId=${seriesId}`;
}

/**
 * 系列カタログで、指定した系列カードの近くに着地する URL。
 * おわりのページから戻るときに使う（ページ先頭ではなく、いま歩いた系列へ）。
 */
export function catalogFocusHref(seriesId: string): string {
  return `/learn/?focus=${encodeURIComponent(seriesId)}`;
}

const CATALOG_FOCUS_KEY = "ruisuishiki:catalog_focus";

/** 同一タブ内のバックアップ（Strict Mode の二重マウントでも消えない）。 */
let catalogFocusMemory: string | null = null;

/** おわりのページからカタログへ戻る直前に、着地先の系列 id を残す。 */
export function rememberCatalogFocus(seriesId: string): void {
  catalogFocusMemory = seriesId;
  try {
    sessionStorage.setItem(CATALOG_FOCUS_KEY, seriesId);
  } catch {
    // private mode などでは無視
  }
}

/** カタログ着地先。クエリ ?focus= を優先し、無ければ記憶。 */
export function peekCatalogFocus(search: string): string | null {
  const fromQuery = new URLSearchParams(search).get("focus");
  if (fromQuery) return fromQuery;
  if (catalogFocusMemory) return catalogFocusMemory;
  try {
    return sessionStorage.getItem(CATALOG_FOCUS_KEY);
  } catch {
    return null;
  }
}

/** 着地できたら呼ぶ。一度きりのジャンプにするため記憶を消す。 */
export function clearCatalogFocus(): void {
  catalogFocusMemory = null;
  try {
    sessionStorage.removeItem(CATALOG_FOCUS_KEY);
  } catch {
    // ignore
  }
}
