/**
 * 用語辞書（公式の景色や問題文で使う前提知識への跳び方）。
 *
 * derivation や問題文の中で [用語名] と書くと、自動で辞書を引いて
 * ツールチップ＋関連系列へのリンクを表示する。
 *
 * 辞書にない用語は素通し（表示は変わらない）。
 *
 * relatedSeriesId は学習者ビューの seriesId を直接指す。
 * 新しい系列を追加したら、関連する用語の relatedSeriesId も更新する。
 */

export type GlossaryEntry = {
  /** 1〜2 文の短い説明 */
  short: string;
  /** もっと詳しく学べる関連系列のID（公式の景色を持つ系列） */
  relatedSeriesId?: string;
};

export const GLOSSARY: Record<string, GlossaryEntry> = {
  /* ===== 数Ⅱ・B ベクトル ===== */
  ベクトル: {
    short:
      "向きと大きさをもった矢印で表される量。座標平面では (a, b) のように成分で表す。",
    relatedSeriesId: "algebra2_dot_01",
  },
  内積: {
    short:
      "2つのベクトルの「向きの一致度」を測る数。(a, b)·(c, d) = ac + bd で計算する。",
    relatedSeriesId: "algebra2_dot_01",
  },
  法線ベクトル: {
    short:
      "直線や曲線に垂直な方向を表すベクトル。直線 ax+by+c=0 では (a, b) が法線ベクトル。",
    relatedSeriesId: "algebra2_dot_01",
  },
  ベクトルの大きさ: {
    short: "ベクトル (a, b) の長さ。√(a² + b²) で計算する（ピタゴラスの定理）。",
    relatedSeriesId: "algebra2_vec_mag_01",
  },

  /* ===== 三角関数 ===== */
  三角関数: {
    short:
      "角度を入力すると比を返す関数。sin, cos, tan が代表的。単位円上の点の座標と結びつく。",
    relatedSeriesId: "algebra2_trig_period_01",
  },

  /* ===== 数Ⅰ・A 2次関数 ===== */
  平方完成: {
    short:
      "x² + bx + c の形を (x + b/2)² + (c − b²/4) に変形すること。頂点・最小値が一目で読める。",
    relatedSeriesId: "adv_quad_min_01",
  },
  頂点: {
    short:
      "2次関数のグラフ（放物線）の最も低い点（または最も高い点）。x 座標は −b/2。",
    relatedSeriesId: "adv_quad_min_01",
  },
  判別式: {
    short:
      "2次方程式 ax² + bx + c = 0 の解の公式の中身、D = b² − 4ac。符号で実数解の個数が決まる。",
    relatedSeriesId: "algebra_disc_01",
  },
  解と係数の関係: {
    short:
      "x² + bx + c = 0 の解の和は −b、解の積は c。因数分解の展開から自然に出てくる。",
    relatedSeriesId: "algebra_quad_sum_01",
  },
  因数分解: {
    short:
      "多項式を「掛け算の形」に書き直す変形。展開の逆向き。和と積から逆算する。",
    relatedSeriesId: "algebra_factoring_01",
  },

  /* ===== 整数の性質 ===== */
  ピタゴラス数: {
    short:
      "a² + b² = c² を満たす3つの整数 (a, b, c) の組。代表は (3,4,5), (5,12,13), (8,15,17)。",
    relatedSeriesId: "middle_pythagorean_01",
  },
  素因数分解: {
    short: "整数を素数の積に書き直す操作。約数の個数・最大公約数・最小公倍数の基礎。",
    relatedSeriesId: "e5_lcm_01",
  },

  /* ===== 図形と方程式 ===== */
  一般形: {
    short:
      "直線を ax + by + c = 0 の形で書いた式。点と直線の距離など多くの公式で使う。",
    relatedSeriesId: "adv_point_line_distance_01",
  },
  標準形: {
    short:
      "直線を y = mx + n の形で書いた式。傾き m と y 切片 n が直接読める。",
    relatedSeriesId: "adv_line_equation_01",
  },
  傾き: {
    short:
      "直線が「どれだけ斜めか」を表す数。2点 (x₁, y₁), (x₂, y₂) を通る直線の傾きは (y₂ − y₁)/(x₂ − x₁)。",
    relatedSeriesId: "adv_line_equation_01",
  },
  垂直二等分線: {
    short:
      "2点 A, B を結ぶ線分の中点を通り、AB に垂直な直線。AB から等距離の点の集まり。",
    relatedSeriesId: "adv_line_equation_01",
  },

  /* ===== 微積分 ===== */
  微分: {
    short:
      "関数の「変化の速さ」を求める操作。x^n を nx^(n−1) に変える。グラフの接線の傾きを表す。",
    relatedSeriesId: "algebra2_diff_01",
  },

  /* ===== 数列 ===== */
  等差数列: {
    short: "次の項に行くたびに公差 d を足す数列。a, a+d, a+2d, …。",
    relatedSeriesId: "algebra2_arith_nth_01",
  },
  等比数列: {
    short: "次の項に行くたびに公比 r を掛ける数列。a, ar, ar², …。",
    relatedSeriesId: "algebra2_geo_nth_01",
  },

  /* ===== 統計 ===== */
  平均: {
    short: "全データの合計を個数で割った値。データの「真ん中」を表す代表値の1つ。",
    relatedSeriesId: "e5_mean_01",
  },
  中央値: {
    short:
      "データを並び替えてちょうど真ん中の値。平均とちがって、ハズレ値に強い代表値。",
    relatedSeriesId: "stats_median_01",
  },
  分散: {
    short:
      "データが平均からどれだけ散らばっているかを測る量。偏差²の平均で計算する。",
    relatedSeriesId: "algebra_variance_01",
  },
};
