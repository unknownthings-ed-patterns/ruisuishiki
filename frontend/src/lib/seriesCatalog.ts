/**
 * 静的系列のカタログ（学習者ビューの入口で表示）。
 *
 * 教師が作った系列は localStorage 経由で別途取得する（teacherStorage.ts）。
 * このカタログは「ruisuishiki が最初から用意した系列」のリスト。
 *
 * 大人の自己教育・小学生の算数・高校生の数学Ⅰ・A、すべて同じ
 * 学習者ビューで歩ける（同一エンジン・複数領域）。
 */

import {
  ALGEBRA_1_SERIES_LIST,
  ALGEBRA_DIVISOR_COUNT_SERIES,
  ALGEBRA_MEAN_SERIES,
  ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
  ALGEBRA_VARIANCE_SERIES,
} from "./seriesAlgebra";
import {
  ALGEBRA_2_SERIES_LIST,
  ALGEBRA2_ARITH_NTH_SERIES,
  ALGEBRA2_ARITH_SUM_SERIES,
  ALGEBRA2_DIFF_SERIES,
  ALGEBRA2_DOT_SERIES,
  ALGEBRA2_GEO_NTH_SERIES,
  ALGEBRA2_GEO_SUM_SERIES,
  ALGEBRA2_VEC_MAG_SERIES,
} from "./seriesAlgebra2";
import {
  EXP_LOG_SERIES_LIST,
  XEL_EXP_EQUATION_SERIES,
  XEL_EXP_EXTEND_SERIES,
  XEL_EXP_GRAPH_SERIES,
  XEL_EXP_QUADRATIC_SERIES,
  XEL_LOG_DEF_SERIES,
  XEL_LOG_LAWS_SERIES,
  XEL_LOG_GRAPH_SERIES,
  XEL_LOG_EQUATION_SERIES,
  XEL_COMMON_LOG_SERIES,
} from "./seriesExpLog";
import {
  COUNT_BASIC_SERIES,
  COUNT_PRODSUM_SERIES,
  COUNT_SUBTRACT_SERIES,
  COUNT_DIVIDE_SERIES,
  COUNT_PERM_SERIES,
  COUNT_REPPERM_SERIES,
  COUNT_COMB_SERIES,
  COUNT_CIRCULAR_SERIES,
  COUNT_SAMEKIND_SERIES,
  COUNT_BIJECTION_SERIES,
} from "./seriesCounting";
import {
  PROB_DEF_SERIES,
  PROB_COUNT_SERIES,
  PROB_ADDSUB_SERIES,
  PROB_MULT_SERIES,
  PROB_REPEAT_SERIES,
  PROB_COND_SERIES,
  PROB_POSTERIOR_SERIES,
  PROB_EXPECT_SERIES,
} from "./seriesProbability";
import {
  SET_ELEMENT_SERIES,
  SET_OPERATION_SERIES,
  SET_COMPLEMENT_SERIES,
  LOGIC_PROPOSITION_SERIES,
} from "./seriesSetLogic";
import {
  TRIG_ADDITION_SERIES,
  TRIG_COMPOSITION_SERIES,
  TRIG_DOUBLE_HALF_SERIES,
  TRIG_EQUATION_SERIES,
  TRIG_GENERAL_ANGLE_SERIES,
  TRIG_GRAPH_SERIES,
  TRIG_IDENTITY_SERIES,
  TRIG_PROPERTY_SERIES,
  TRIG_RADIAN_SERIES,
  TRIG_SERIES_LIST,
} from "./seriesTrig";
import {
  ADV_BUNDLE_SERIES,
  ADV_CIRCLE_EQUATION_SERIES,
  ADV_COMPLEX_FACTORIZATION_SERIES,
  ADV_COMPLEX_NEW_NUMBER_SERIES,
  ADV_COMPLEX_QUADRATIC_SOLUTIONS_SERIES,
  ADV_COMPLEX_ROOT_COEFFICIENT_SERIES,
  ADV_LINEAR_PROGRAMMING_SERIES,
  ADV_LOCUS_SERIES,
  ADV_PARAMETRIC_SERIES,
  ADV_REGION_SERIES,
  ADV_CIRCLE_LINE_SERIES,
  ADV_CIRCLE_TANGENT_SERIES,
  ADV_LINE_EQUATION_SERIES,
  ADV_NUMBER_LINE_SERIES,
  ADV_POINT_LINE_DISTANCE_SERIES,
  ADV_REMAINDER_THEOREM_SERIES,
  ADVANCED_SERIES_LIST,
} from "./seriesAdvanced";
import { RATIO_BASIC_SERIES } from "./seriesData";
import {
  NE_NUMBER_EXPANSION_SERIES,
  NE_EXPONENT_LAW_SERIES,
  NE_EXPANSION_SERIES,
  NE_FACTORING_SERIES,
  NE_LINEAR_INEQUALITY_SERIES,
  NE_QUAD_FACTOR_SOLVE_SERIES,
  NE_COMPLETING_SQUARE_SERIES,
  NE_DISCRIMINANT_SERIES,
  NUMBERS_EXPRESSIONS_SERIES_LIST,
} from "./seriesNumbersExpressions";
import {
  FG_FUNCTION_LINEAR_SERIES,
  FG_QUAD_STANDARD_SERIES,
  FG_QUAD_GENERAL_GRAPH_SERIES,
  FG_QUAD_MINMAX_SERIES,
  FG_FUNCTION_NOTATION_SERIES,
  FG_QUAD_THREE_FORMS_SERIES,
  FG_QUAD_INEQUALITY_SERIES,
  FG_QUAD_PARAMETER_SERIES,
  FUNCTIONS_GRAPHS_SERIES_LIST,
} from "./seriesFunctionsGraphs";
import {
  TR_TAN_RATIO_SERIES,
  TR_SINCOS_SERIES,
  TR_SPECIAL_SERIES,
  TR_AREA_COSINE_SERIES,
  TR_OBTUSE_SERIES,
  TR_IDENTITY_RATIO_SERIES,
  TR_COSINE_APP_SERIES,
  TR_SINE_LAW_SERIES,
  TRIG_RATIO_SERIES_LIST,
} from "./seriesTrigRatio";
import {
  E5_CONGRUENT_FIGURES_SERIES,
  E5_CIRCUMFERENCE_SERIES,
  E5_DECIMAL_DIV_ALGORITHM_SERIES,
  E5_DECIMAL_DIV_PURE_DECIMAL_SERIES,
  E5_DECIMAL_DIV_REMAINDER_SERIES,
  E5_DECIMAL_DIV_ROUNDING_SERIES,
  E5_DECIMAL_DIV_SERIES,
  E5_DECIMAL_MULT_SERIES,
  E5_DECIMAL_PLACE_SERIES,
  E5_FRACTION_ADD_SERIES,
  E5_LCM_SERIES,
  E5_MEAN_SERIES,
  E5_PARALLELOGRAM_SERIES,
  E5_POLYGON_ANGLE_SERIES,
  E5_PROPORTION_SERIES,
  E5_SPEED_SERIES,
  E5_TRAPEZOID_AREA_SERIES,
  E5_TRIANGLE_AREA_SERIES,
  E5_VOLUME_SERIES,
  ELEMENTARY_5_SERIES_LIST,
} from "./seriesElementary5";
import {
  MIDDLE_COMBINATION_SERIES,
  MIDDLE_PYTHAGOREAN_SERIES,
  MIDDLE_SCHOOL_SERIES_LIST,
  MIDDLE_SIMUL_SERIES,
} from "./seriesMiddle";
import {
  STATISTICS_SERIES_LIST,
  STATS_MEDIAN_SERIES,
} from "./seriesStats";
import type { LearnerSeries, VariationOp } from "./types";

export type SeriesSubject =
  | "elementary"
  | "middle"
  | "secondary"
  | "secondary2"
  | "tertiary"
  | "advanced";

/** subject の表示順（カタログでこの順に並べる）。 */
export const SUBJECT_ORDER: SeriesSubject[] = [
  "elementary",
  "middle",
  "secondary",
  "secondary2",
  "tertiary",
  "advanced",
];

/** subject ごとのグループ見出し（subjectLabel と独立に持つ）。 */
export const SUBJECT_GROUP_LABEL: Record<SeriesSubject, string> = {
  elementary: "小学校算数",
  middle: "中学校数学",
  secondary: "高校数学Ⅰ・A",
  secondary2: "高校数学Ⅱ・B",
  tertiary: "統計・データ分析",
  // 将来用：高校数学を「分野別」（方程式・図形・関数 等）で
  // ハイレベル課題に取り組むコース。池田洋介『方程式・図形・関数からとらえる
  // 数学の基礎 分野別 標準問題精講』（旺文社）が出発点の候補。
  // entry がない間はカタログから消える（SUBJECT_ORDER.filter で空グループは省略）。
  advanced: "高校 ハイレベル",
};

export type CatalogEntry = {
  series: LearnerSeries;
  /** 対象学年・領域の表示用 */
  subject: SeriesSubject;
  /** 領域ラベル */
  subjectLabel: string;
  /** 簡易説明 */
  shortDescription: string;
  /**
   * 単元グループ（小見出し）。同じ subject の中で複数の単元を
   * グルーピングするとき使う。たとえば「高校 入門」の中で
   * 「数Ⅰ・A 2 次関数」「数Ⅱ・B 図形と方程式」と分ける。
   * 同じ値の連続する entry に対して小見出しが 1 度だけ描画される。
   */
  topicGroup?: string;
};

export const STATIC_CATALOG: CatalogEntry[] = [
  /* === 小学校5年・東京書籍順 === */
  {
    series: E5_DECIMAL_PLACE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "1. 整数と小数（位の関係）",
  },
  {
    series: E5_VOLUME_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "2. 直方体の体積",
  },
  {
    series: E5_PROPORTION_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "3. 比例の入り口",
  },
  {
    series: E5_DECIMAL_MULT_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "4. 小数のかけ算",
  },
  {
    series: E5_DECIMAL_DIV_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    topicGroup: "5. 小数のわり算",
    shortDescription: "5-1. 小数でわることの意味",
  },
  {
    series: E5_DECIMAL_DIV_ALGORITHM_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    topicGroup: "5. 小数のわり算",
    shortDescription: "5-2. 小数の除法の考え方と筆算形式",
  },
  {
    series: E5_DECIMAL_DIV_PURE_DECIMAL_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    topicGroup: "5. 小数のわり算",
    shortDescription: "5-3. 純小数でわるときの商と被除数の関係",
  },
  {
    series: E5_DECIMAL_DIV_ROUNDING_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    topicGroup: "5. 小数のわり算",
    shortDescription: "5-4. 商を概数で表すときの処理",
  },
  {
    series: E5_DECIMAL_DIV_REMAINDER_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    topicGroup: "5. 小数のわり算",
    shortDescription: "5-5. 余りの小数点の位置",
  },
  {
    series: E5_LCM_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "6. 整数の見方（最小公倍数）",
  },
  {
    series: E5_FRACTION_ADD_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "7. 分数のたし算（通分）",
  },
  {
    series: E5_MEAN_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "8. 平均",
  },
  {
    series: E5_SPEED_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "9. 速さ（単位量あたり）",
  },
  {
    series: E5_POLYGON_ANGLE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "10. 多角形の角",
  },
  {
    series: E5_CONGRUENT_FIGURES_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "11. 合同な図形 — 対応する辺・角",
  },
  {
    series: RATIO_BASIC_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "12. 割合の入り口",
  },
  {
    series: E5_CIRCUMFERENCE_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "13. 円周の長さ",
  },
  {
    series: E5_TRIANGLE_AREA_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "14. 三角形の面積",
  },
  {
    series: E5_PARALLELOGRAM_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "15. 平行四辺形の面積",
  },
  {
    series: E5_TRAPEZOID_AREA_SERIES,
    subject: "elementary",
    subjectLabel: "小5・東京書籍",
    shortDescription: "16. 台形の面積",
  },
  /* === 高校数学Ⅰ・A（数Ⅰ の章順 → 数A の章順）=== */
  /* 数Ⅰ: 数と式（池田『入門問題精講』第1章の節順。背骨 docs/numbers_expressions_series_design.md） */
  {
    series: NE_NUMBER_EXPANSION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "数の拡張と小数 — 有限小数・循環小数・無理数",
  },
  {
    series: NE_EXPONENT_LAW_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "指数法則と式の整理 — 指数は「かけ算した回数」",
  },
  {
    series: NE_EXPANSION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "式の展開 — 公式は分配法則の圧縮",
  },
  {
    series: NE_FACTORING_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "因数分解 — 展開の逆読みは探索になる",
  },
  {
    series: NE_LINEAR_INEQUALITY_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "1次不等式 — 向きまで面倒を見る",
  },
  {
    series: NE_QUAD_FACTOR_SOLVE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "2次方程式 — 積が0になる形へ",
  },
  {
    series: NE_COMPLETING_SQUARE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "平方完成と解の公式 — 基本形に帰着",
  },
  {
    series: NE_DISCRIMINANT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "数と式",
    shortDescription: "判別式 — 解を求めずに個数を読む",
  },
  /* 数Ⅰ: 関数と関数のグラフ（池田第2章。背骨 docs/functions_graphs_series_design.md） */
  {
    series: FG_FUNCTION_LINEAR_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "関数の対応と1次関数 — 傾き・切片・変域の端点",
  },
  {
    series: FG_QUAD_STANDARD_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "標準形と平行移動 — 頂点・軸・遅延の置き換え",
  },
  {
    series: FG_QUAD_GENERAL_GRAPH_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "一般形からグラフを読む — 平方完成→頂点",
  },
  {
    series: FG_QUAD_MINMAX_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "変域付き最大・最小 — 軸と窓の位置関係",
  },
  {
    series: FG_FUNCTION_NOTATION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "関数記号と図形応用 — 変域制約と最適化",
  },
  {
    series: FG_QUAD_THREE_FORMS_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "3つの形と方程式 — 切片・頂点・交点",
  },
  {
    series: FG_QUAD_INEQUALITY_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "2次不等式 — グラフの上／下で範囲を読む",
  },
  {
    series: FG_QUAD_PARAMETER_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "関数と関数のグラフ",
    shortDescription: "パラメータと文字定数 — 場合分けのスイッチ",
  },
  /* 数Ⅰ: 三角比（池田『入門問題精講』第3章。背骨 docs/trig_ratio_series_design.md） */
  {
    series: TR_TAN_RATIO_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription:
      "タンジェントと比 — 相似で運ぶ比に名前を付け、向きが変わっても辺を読む",
  },
  {
    series: TR_SINCOS_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "サイン・コサイン — 斜辺をものさしにした辺の読み",
  },
  {
    series: TR_SPECIAL_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "1つから残りと有名角 — 三平方と図形から比を生やす",
  },
  {
    series: TR_AREA_COSINE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "垂線で面積と余弦 — 直角でなくても辺と角がつながる",
  },
  {
    series: TR_OBTUSE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "鈍角への拡張 — 定義を単位円の座標に移す",
  },
  {
    series: TR_IDENTITY_RATIO_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "相互関係 — 1つと象限から残りが決まる",
  },
  {
    series: TR_COSINE_APP_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "面積と余弦の応用 — 3辺だけで面積へ",
  },
  {
    series: TR_SINE_LAW_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "三角比",
    shortDescription: "正弦定理と外接円 — 辺と対角を円で結ぶ",
  },
  /* 数A: 場合の数（池田『入門問題精講』第4章＝三角比の直後。
   * 背骨 docs/counting_series_design_fable.md・2026-08-01 裁定でここへ移動）。
   * 旧 algebra_perm_01 は系5（順列）に吸収済み（SERIES_REDIRECTS）。 */
  {
    series: COUNT_BASIC_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "数え上げの基本 — 規則を決めて書き並べる。辞書式・樹形図・後もどりしない規則で「もれなく、重複なく」へ",
  },
  {
    series: COUNT_PRODSUM_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "積の法則と和の法則 — かけるか足すかは樹形図の形が決める。省略樹形図・場合分け・約数の個数まで",
  },
  {
    series: COUNT_SUBTRACT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "引き算で数える — 数えにくいものは残り・重なりに取り替えて引く。背番号・残った方・包除原理まで",
  },
  {
    series: COUNT_DIVIDE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "割り算で数える（重複度）— いったん区別して数え、均等なダブりの回数で割る。握手・対角線・3つ組まで",
  },
  {
    series: COUNT_PERM_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "順列（減りながらかける）— 使ったものは使えない、が「減りながらかける」に。階乗・しばり・隣り合う・交互まで",
  },
  {
    series: COUNT_REPPERM_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "重複順列（減らない枝）— 同じものを何度でも使えると「同じ数をかけ続ける」に。部屋割り・少なくとも1回・減る枝との対比まで",
  },
  {
    series: COUNT_COMB_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "組合せ — 「選ぶ」は「並べる」を並べ替えの数で割ったもの。選ぶ＝残す・少なくとも条件・図形の個数・対角線の再導出まで",
  },
  {
    series: COUNT_CIRCULAR_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "円順列 — 回して重なるなら同じ。割り算の道と固定の道・向かい合う・隣り合う・数珠（裏返し）・交互まで",
  },
  {
    series: COUNT_SAMEKIND_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "同じものを含む順列 — 仮の区別をつけて数え、同じもの同士の入れかわりで割る。塊・隣り合わない・左右の順序・組分けまで",
  },
  {
    series: COUNT_BIJECTION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "場合の数",
    shortDescription:
      "1対1の対応 — 過不足のない対応があれば個数は等しい。最短経路・図形の個数・重複組合せ（仕切り）まで単元の総仕上げ",
  },
  /* 数Ⅰ・A: 確率 */
  {
    series: PROB_DEF_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "確率の定義（均等な粒にたたき割る）— 起こりやすさが「同様に確からしい粒の個数の比」に。区別の原則・和の11通りの罠・じゃんけんまで",
  },
  {
    series: PROB_COUNT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "場合の数との合流（分母と分子は同じ基準）— 順列・組合せがそのまま確率の分母に。内訳の積・区別する／しないの交差検算・どの2つも隣り合わないまで",
  },
  {
    series: PROB_ADDSUB_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "足し算と引き算（排反と余事象）— 排反なら足す・全体は1。余事象と「少なくとも1つ」を1から引く近道・場合の数と確率の2つの道の交差検算まで",
  },
  {
    series: PROB_MULT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "かけ算（独立な試行——確率は面積で重なる）— 独立なら「ともに起こる」は縦×横の面積。確率つき樹形図・ちょうど1人・少なくとも1人の重ね技・戻さないと壊れる独立まで",
  },
  {
    series: PROB_REPEAT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "反復試行（1本の道の確率 × 道の本数）— 「ちょうど r 回」は組合せで道を数えてかける。以上／以下の和・初めて起こる・先に3勝の優勝の順番の制約まで",
  },
  {
    series: PROB_COND_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "条件つき確率（情報が全体を縮める）— 情報とは全体の取り替え。戻さない引きの条件つき確率・乗法定理・くじ引きの公平性・独立の判定まで",
  },
  {
    series: PROB_POSTERIOR_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "事後の確率（結果から、原因を問う）— 結果を新しい全体にして原因の道の割合を測る。時系列の逆転・機会が続く紛失・まれな原因の落とし穴・条件の向きの取り違えまで（ベイズの芽）",
  },
  {
    series: PROB_EXPECT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "確率",
    shortDescription:
      "期待値（確率を重みにした、未来の平均）— 1回ごとはバラバラでも、確率を重みに値を足せば「ならすと1回あたり」が1つの数に。組合せ・反復試行で作る確率・参加費と比べる判断・公平な賞金の逆算・負の得失点・ゲーム設計まで",
  },
  /* 数Ⅰ: 集合と論理（池田本 第6章・確率の直後。背骨 docs/set_logic_series_design_fable.md）
   * 旧 topicGroup「集合と命題」を本の章名「集合と論理」へ改名（C10）。
   * 旧 algebra_necsuf_01 は系6 実装時に吸収・リダイレクト。 */
  {
    series: SET_ELEMENT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "集合と論理",
    shortDescription:
      "集合と部分集合（∈ と ⊂）— 判定基準の明確な『集まり』を列挙でつかみ、モノと集まりの階層のことば、○×対応で数える部分集合の個数まで",
  },
  {
    series: SET_OPERATION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "集合と論理",
    shortDescription:
      "共通部分と和集合（∩ と ∪）— 『かつ』を重なり・『または』を合わせに翻訳し、両方込みの数え方、3 集合の組み替え、約数の共通部分＝最大公約数の約数まで",
  },
  {
    series: SET_COMPLEMENT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "集合と論理",
    shortDescription:
      "補集合とド・モルガンの法則（「でない」は世界を裏返す）— 全体 U を決めて『でない』を数え、否定が ∩ と ∪ を入れ替える対称性を 2 つの道の一致から発見する",
  },
  {
    series: LOGIC_PROPOSITION_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "集合と論理",
    shortDescription:
      "命題と反例（「ならば」は一方通行）— たった 1 つの反例が命題を倒す真偽の非対称性、逆は必ずしも真ならず、2 乗に隠れる負の反例、2 変数の反例まで",
  },
  {
    series: ALGEBRA_NECESSARY_SUFFICIENT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "集合と論理",
    shortDescription: "必要条件・十分条件",
  },
  /* 旧 topicGroup「2 次関数」は「関数と関数のグラフ」へ吸収。
   * graph/vertex → 系列3、min → 系列4（SERIES_REDIRECTS）。
   * sum/prod は第2章に節がないためカタログから外すのみ（リダイレクトなし）。 */
  /* 数Ⅰ: データの分析 */
  {
    series: ALGEBRA_MEAN_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "データの分析",
    shortDescription: "5つの数の平均",
  },
  {
    series: ALGEBRA_VARIANCE_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "データの分析",
    shortDescription: "分散の入り口",
  },
  /* 数A: 整数の性質 */
  {
    series: ALGEBRA_DIVISOR_COUNT_SERIES,
    subject: "secondary",
    subjectLabel: "高校数学Ⅰ・A",
    topicGroup: "整数の性質",
    shortDescription: "約数の個数",
  },
  /* 中学校数学 */
  {
    series: MIDDLE_SIMUL_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "連立方程式 — 加減法",
  },
  {
    series: MIDDLE_PYTHAGOREAN_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "ピタゴラスの定理 — 図形",
  },
  {
    series: MIDDLE_COMBINATION_SERIES,
    subject: "middle",
    subjectLabel: "中学校数学",
    shortDescription: "組合せ C(n, 2) — 確率の基礎",
  },
  /* === 高校数学Ⅱ・B（数Ⅱ の章順 → 数B の章順）=== */
  /* 数Ⅱ: 複素数と方程式（図形と方程式の前） */
  {
    series: ADV_COMPLEX_NEW_NUMBER_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "複素数と方程式",
    shortDescription: "新しい数を作る — i² = -1 を約束して、複素数 a + bi の四則演算と等式・共役へ",
  },
  {
    series: ADV_COMPLEX_QUADRATIC_SOLUTIONS_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "複素数と方程式",
    shortDescription: "2 次方程式の実数解 — 判別式 D = b² − 4ac の符号で実数解・重解・虚数解の 3 場面を見抜く",
  },
  {
    series: ADV_COMPLEX_FACTORIZATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "複素数と方程式",
    shortDescription: "2 次方程式の解と因数分解 — ax² + bx + c = a(x − α)(x − β) と解と係数の関係",
  },
  {
    series: ADV_COMPLEX_ROOT_COEFFICIENT_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "複素数と方程式",
    shortDescription: "解と係数の関係 — 解を出さずに対称式・逆向き・パラメータ問題まで",
  },
  {
    series: ADV_REMAINDER_THEOREM_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "複素数と方程式",
    shortDescription:
      "剰余の定理・因数定理 — 割り算せずに $1$ 点の代入で余りや因数を見抜く",
  },
  /* 数Ⅱ: 図形と方程式（入口から順に） */
  {
    series: ADV_NUMBER_LINE_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "数直線上の点 — 距離・中点・内分・外分。単元の入口",
  },
  {
    series: ADV_LINE_EQUATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "直線の方程式を読む — 傾き・切片・中点・垂直",
  },
  {
    series: ADV_POINT_LINE_DISTANCE_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "点と直線の距離 — 図形と方程式の中核公式",
  },
  {
    series: ADV_CIRCLE_EQUATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "円の方程式 — 標準形・一般形・平方完成",
  },
  {
    series: ADV_CIRCLE_LINE_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "円と直線の位置関係 — 共有点 0/1/2 を距離 d で見抜く",
  },
  {
    series: ADV_CIRCLE_TANGENT_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "円の接線の公式 ax + by = r² — xx + yy = r² の片方を a, b に",
  },
  {
    series: ADV_BUNDLE_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "束の考え方 L₁ + k L₂ = 0 — 交点を求めずに通る直線・円を作る",
  },
  {
    series: ADV_LOCUS_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "軌跡 — 距離条件を式に翻訳すれば、円・直線・放物線が現れる",
  },
  {
    series: ADV_PARAMETRIC_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "媒介変数表示 — y = f(x) の枠を超えて、動く点を t を経由して記述する",
  },
  {
    series: ADV_REGION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "領域 — 等式が境界線、不等号は『どちら側の広がり』を選ぶ",
  },
  {
    series: ADV_LINEAR_PROGRAMMING_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "図形と方程式",
    shortDescription: "不等式と領域 — 等高線を動かして、領域上の最大最小を見抜く",
  },
  /* 数Ⅱ: 三角関数 */
  {
    series: TRIG_GENERAL_ANGLE_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "一般角と三角関数の値 — 単位円の座標で sin・cos・tan を読む。鈍角・1回転超え・負の角・周期まで",
  },
  {
    series: TRIG_RADIAN_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "弧度法 — 角を弧の長さで測る。度との換算（180°=π）から、ラジアンで三角関数を読むまで",
  },
  {
    series: TRIG_EQUATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "三角方程式 — 値から角を逆に求める。単位円の逆読み・範囲で解を絞る・不等式（点→弧）まで",
  },
  {
    series: TRIG_IDENTITY_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "相互関係 — sin²θ+cos²θ=1 が 3 つの関数を縛る。1 つの値と象限から残りを決め、対称式・方程式まで",
  },
  {
    series: TRIG_GRAPH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "グラフ — 円運動を開くと波になる。振幅・周期・位相・上下の 4 つのつまみと、tan の漸近線まで",
  },
  {
    series: TRIG_PROPERTY_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "性質 — −θ・π±θ・π/2−θ を単位円の折り返しで読み替える。覚える公式ゼロで無限の角を第 1 象限へ",
  },
  {
    series: TRIG_ADDITION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "加法定理 — 表に無い角を既知の角の和に分解して作る。バラす・畳む・2 直線のなす角まで",
  },
  {
    series: TRIG_DOUBLE_HALF_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "2倍角・半角 — 加法定理の特殊化と逆読みで公式を生やす。cos2θ の 3 つの顔・次数下げ・倍角方程式まで",
  },
  {
    series: TRIG_COMPOSITION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "三角関数",
    shortDescription:
      "合成 — a sinθ + b cosθ を 1 つの波に。点 (a,b) の長さと向きが振幅と位相。方程式・最大最小まで",
  },
  /* 数Ⅱ: 指数関数・対数関数（背骨 docs/exp_log_series_design.md）
   * 系列1〜9 実装済。旧 algebra2_exp_01 / algebra2_log_01 は SERIES_REDIRECTS へ。 */
  {
    series: XEL_EXP_EXTEND_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "指数の拡張 — 法則をコンパスに 0乗・マイナス乗・分数乗へ。同類項の注意まで",
  },
  {
    series: XEL_EXP_GRAPH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "指数関数のグラフ — 底が向きを決める。大小比較・変域の最大最小まで",
  },
  {
    series: XEL_EXP_EQUATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "指数方程式・不等式 — 底をそろえて指数を比べる。0<a<1 で向き反転",
  },
  {
    series: XEL_EXP_QUADRATIC_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "指数の置き換え — t=a^x で2次に帰着。t>0 と変域の翻訳",
  },
  {
    series: XEL_LOG_DEF_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "対数の定義と値 — a^x=M の x に名前。真数条件・分数底・逆向き",
  },
  {
    series: XEL_LOG_LAWS_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "対数法則と底の変換 — 指数法則の逆読み。底をそろえる道具",
  },
  {
    series: XEL_LOG_GRAPH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "対数関数のグラフ — y=a^x を y=x で折り返す。単調性と変域の最大最小",
  },
  {
    series: XEL_LOG_EQUATION_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "対数方程式・不等式 — 真数条件で解を裁く。0<a<1 で向き反転",
  },
  {
    series: XEL_COMMON_LOG_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "指数関数・対数関数",
    shortDescription:
      "常用対数と桁数 — 累乗を肩の上の世界へ。桁数・最高位・仮数の規則",
  },
  /* 数Ⅱ: 微分・積分 */
  {
    series: ALGEBRA2_DIFF_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "微分・積分",
    shortDescription: "微分の入り口",
  },
  /* 数B: 数列（等差 → 等比、各 n 項目 → 和の順） */
  {
    series: ALGEBRA2_ARITH_NTH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "数列",
    shortDescription: "等差数列の n 項目",
  },
  {
    series: ALGEBRA2_ARITH_SUM_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "数列",
    shortDescription: "等差数列の和",
  },
  {
    series: ALGEBRA2_GEO_NTH_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "数列",
    shortDescription: "等比数列の n 項目",
  },
  {
    series: ALGEBRA2_GEO_SUM_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "数列",
    shortDescription: "等比数列の和",
  },
  /* ベクトル（旧課程 数B、新課程では数C に移行。読者の参考書世代を問わず
     使えるよう、注記つきで 数Ⅱ・B に置く） */
  {
    series: ALGEBRA2_VEC_MAG_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "ベクトル（数B 旧／数C 新）",
    shortDescription: "ベクトルの大きさ",
  },
  {
    series: ALGEBRA2_DOT_SERIES,
    subject: "secondary2",
    subjectLabel: "高校数学Ⅱ・B",
    topicGroup: "ベクトル（数B 旧／数C 新）",
    shortDescription: "ベクトルの内積",
  },
  /* 統計 */
  {
    series: STATS_MEDIAN_SERIES,
    subject: "tertiary",
    subjectLabel: "統計・データ分析",
    shortDescription: "中央値 — 並び替えて真ん中",
  },
];

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
  /* 場合の数（背骨 D3・§6）：旧「順列 P(n,2)」プロトタイプ → 系5「順列」へ吸収 */
  algebra_perm_01: "algebra1_count_perm_01",
};

/** 旧 seriesId なら現行 seriesId へ読み替える（なければそのまま返す）。 */
export function resolveSeriesId(seriesId: string): string {
  return SERIES_REDIRECTS[seriesId] ?? seriesId;
}

export function findStaticSeries(seriesId: string): LearnerSeries | null {
  const resolved = resolveSeriesId(seriesId);
  const found = STATIC_CATALOG.find((e) => e.series.id === resolved);
  return found?.series ?? null;
}

export const ALL_STATIC_SERIES: LearnerSeries[] = [
  ...ELEMENTARY_5_SERIES_LIST,
  RATIO_BASIC_SERIES,
  ...NUMBERS_EXPRESSIONS_SERIES_LIST,
  ...FUNCTIONS_GRAPHS_SERIES_LIST,
  ...TRIG_RATIO_SERIES_LIST,
  ...ALGEBRA_1_SERIES_LIST,
  ...MIDDLE_SCHOOL_SERIES_LIST,
  ...ALGEBRA_2_SERIES_LIST,
  ...EXP_LOG_SERIES_LIST,
  ...TRIG_SERIES_LIST,
  ...STATISTICS_SERIES_LIST,
  ...ADVANCED_SERIES_LIST,
];

/** `${seriesId}::${stepId}` → 前題からの変化オペレータ。 */
export function buildStepOpIndex(): Map<string, VariationOp | null> {
  const index = new Map<string, VariationOp | null>();
  for (const series of ALL_STATIC_SERIES) {
    for (const step of series.steps) {
      index.set(
        `${series.id}::${step.id}`,
        step.variationFromPrevious,
      );
    }
  }
  return index;
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
