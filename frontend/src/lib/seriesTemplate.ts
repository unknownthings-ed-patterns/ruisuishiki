/**
 * 新規系列を作るときの **コピペで始められる注釈付きテンプレート**。
 *
 * このファイルは「reference / starting point」であって、本番カタログには
 * 出ない（catalog や SERIES_LIST には登録しない）。新規系列を作るときは、
 * このファイルの `TEMPLATE_SERIES` をコピーし、必要な値を埋めながら
 * `seriesAdvanced.ts` などに移植する。
 *
 * ## なぜこのファイルがあるか
 *
 * `/Users/iwaiteruhisa/ruisuishiki/CLAUDE.md` の「新規系列・ヒントを書く
 * 前のチェックリスト」と、memory `feedback_ruisuishiki_core_principles.md`
 * に書かれた推理式の中核ふるまい（比較を指さす AI・5 オペレータ・3 層
 * ヒント・絶対禁止条項）を、**コードに刻んで物理的に外しにくくする**
 * のが目的。新セッションで原則を読み忘れても、このテンプレからコピペ
 * するだけで構造的に正しくなる。
 *
 * ## このテンプレを修正したいとき
 *
 * 自由に編集してよい。テンプレ自体は誰のコードにも依存していないし、
 * テンプレを変えても既存系列には影響しない（既存系列はそれぞれ独立した
 * `LearnerSeries` オブジェクト）。テンプレを大きく変えたあと、既存系列
 * を新スタイルに揃えたいときだけ、別途 refactor が必要。
 */

import type { LearnerSeries } from "./types";

/**
 * テンプレート系列：「○○ を求める」（架空の単元、サンプル）。
 *
 * 全 10 step、5 変化オペレータ（同・逆・＋α・質的変化・複合）を
 * すべて含む。Step 1 / 質的変化 Step に figureMarker を配置（フェードアウト
 * する足場原則）。drivingQuestion は胚細胞モデル基準で「背後の原理」を問う。
 */
export const TEMPLATE_SERIES: LearnerSeries = {
  id: "template_series_01", // 実際の系列では: `adv_xxx_01` 等の形式
  title: "○○ を求める", // 学習者ビューで見出しになるタイトル
  subtitle:
    "○○○○○○○○○○○○ — ○○の関係を $10$ 問で身につける。", // 1〜2 文の短い説明
  patternId: "P1", // patterns.ts に対応する PatternId（必要なら新規追加）
  unit: "advanced", // unit: "elementary_5" | "middle" | "advanced"

  /**
   * 質的変化到達時の「同じ仕組み」演出で出る 1 行。系列を貫く一行で。
   */
  revelationLabel:
    "○○○○○○○○——同じ手順で $A$ も $B$ も $C$ も解ける",

  /**
   * 中心の問い（胚細胞モデル基準で）。
   *
   * ❌ 観察可能な手続き・結果を聞く：「○○の公式は？」「どんな図形が描かれる？」
   * ✅ 背後の転移可能な原理を聞く：「○○を、別の方法で「式」で見抜くには？」
   *
   * 参考：memory `feedback_driving_question_embryo_cell.md`
   */
  drivingQuestion: "○○を、もう $1$ つの○○を経由してどう表すには？",

  steps: [
    // ============================================================
    // Step 1（null = 系列の入口）
    // ------------------------------------------------------------
    // - 「基本原形」。暗算で解ける／読み取るだけのレベルが理想（ローフロア）
    // - 「前題と比較」はできない（Step 1 だから）→ Layer 1 は Socratic な
    //   問いかけにする
    // - figureMarker を置く（フェードアウトする足場の入口）
    // ============================================================
    {
      id: "step1",
      position: 1,
      questionText:
        "○○○○○○○○○○○○○○。$N$ はいくつでしょう？",
      answer: 0, // 整数の答え（SymPy の一意性検証を通る数値）
      unit: "",
      unknownLabel: "求める値", // 入力欄の前に出る短いラベル
      variationFromPrevious: null, // Step 1 は null
      compareWithStepId: null,
      hints: [
        // ----- Layer 1: Socratic な問いかけ（Step 1 では「前題と比較」は無い）
        {
          layer: 1,
          text:
            "○○を式にすると、$x, y$ の関係はどうなる？", // 解き方を直接示さない問いかけ
        },
        // ----- Layer 2: 着目点を問いかけで誘導
        {
          layer: 2,
          text:
            "○○の規則（例：$\\sin^2 + \\cos^2 = 1$）を使うと、何が見えてくる？", // 計算ステップは出さない
        },
        // ----- Layer 3: worked example + 構造の言語化
        {
          layer: 3,
          text:
            "○○○○○○○、答えは $N = 0$。**○○○○○**——これがこの単元の出発点。", // ここで初めて答え。構造的な気づきも添える
        },
      ],
      formulaPreview: "○○ → N = 0", // 完了画面で表示される短い式
      figureMarker: "<<TEMPLATE_STEP1>>", // Math.tsx に対応する図がある場合のみ。Step 1 にあるのが望ましい
    },

    // ============================================================
    // Step 2（same = 前題と同オペレータ）
    // ------------------------------------------------------------
    // - 数値だけ変える。手順は前題と同じ
    // - 【最重要】Layer 1 は **必ず「前題と比べてみよう」呼びかけのみ**
    // - 解説・公式・計算式は Layer 3 まで書かない
    // ============================================================
    {
      id: "step2",
      position: 2,
      questionText: "○○○○○○○○○○○○。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        // ----- Layer 1: 比較指さし呼びかけ「のみ」（絶対禁止条項を厳守）
        {
          layer: 1,
          text:
            "**前題と比べてみよう**。何が同じで、何が違う？",
          // ❌ 「前と同じ手順——○○に代入して解く」（直接指示）
          // ❌ 「$t = x + 1$ を代入する」（解き方を出している）
        },
        // ----- Layer 2: 「同じ／違う」を問いかけ
        {
          layer: 2,
          text:
            "Step 1 と○○は同じ。**変わったのは○○だけ**。前題の手順をそのまま当てるとどうなる？",
          // ❌ 「$y = 7x + 2$ なので m = 7」（計算ステップを書いている）
        },
        // ----- Layer 3: 前題の解法を示し、現問題との差を 1 つ指す
        {
          layer: 3,
          text:
            "Step 1 と同じレシピ：○○○○○○。今は○○○○○○。差は○○だけ。$N = 0$。",
        },
      ],
      formulaPreview: "○○ → N = 0",
    },

    // ============================================================
    // Step 3（same = もう 1 問）
    // ============================================================
    {
      id: "step3",
      position: 3,
      questionText: "○○○○○○○○○○○。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "**前題と比べてみよう**。今度は○○が違う。手順は同じ？",
        },
        {
          layer: 2,
          text: "Step 2 と同じく○○を当てる。○○の符号・値はどう変わる？",
        },
        {
          layer: 3,
          text:
            "Step 2 と同じレシピで $N = 0$。**Step 1–3 はすべて○○のパターン**——同じ手を 3 回繰り返して慣らした。",
        },
      ],
      formulaPreview: "○○ → N = 0",
    },

    // ============================================================
    // Step 4（qualitative = 質的変化）
    // ------------------------------------------------------------
    // - ここで「場面の質」が変わる（直線→円、実数解→虚数解 など）
    // - 図 (figureMarker) があると効く
    // - Layer 1 で「前まで使えた手は通用するか？」を問いかける
    // - Layer 3 で「新しいレシピが必要」を言語化
    // ============================================================
    {
      id: "step4",
      position: 4,
      questionText:
        "○○○○○○○○○○○○○（前までと違う場面）。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text:
            "**ここまで 3 問は○○だった。今は△△**——前と同じ手は通用する？",
        },
        {
          layer: 2,
          text:
            "○○の方法は使えない。代わりに **○○○○○** という関係を使うとどうなる？",
        },
        {
          layer: 3,
          text:
            "Step 1–3 の○○が通用しない。新しいレシピ：○○○○○ → $N = 0$。**○○○○**——質が変わっても、考え方の幹は同じ。",
        },
      ],
      formulaPreview: "○○ → N = 0",
      figureMarker: "<<TEMPLATE_STEP4>>", // 質的変化 step に図がある場合
    },

    // ============================================================
    // Step 5（same = Step 4 と同じ場面で慣らす）
    // ============================================================
    {
      id: "step5",
      position: 5,
      questionText: "○○○○○。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "**前題と比べてみよう**。質的変化は同じ。値だけ違う？",
        },
        {
          layer: 2,
          text: "Step 4 のレシピをそのまま使う。係数だけ違う。",
        },
        {
          layer: 3,
          text: "Step 4 と同じく○○ → $N = 0$。",
        },
      ],
      formulaPreview: "○○ → N = 0",
    },

    // ============================================================
    // Step 6（plus_alpha = ＋α、条件追加）
    // ------------------------------------------------------------
    // - 既存の場面に「条件が 1 つ追加」される
    // - 変域制限、パラメータ追加、補助条件、複合条件 など
    // - 5 オペレータの中で抜けやすい——必ず 1 問入れる
    // ============================================================
    {
      id: "step6",
      position: 6,
      questionText:
        "○○○○、ただし○○という条件がついた場合。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text:
            "**前題に「○○」という条件が加わった**。前題の答えの範囲はどう変わる？",
        },
        {
          layer: 2,
          text:
            "条件は前題の○○に翻訳できる。範囲のまま読み替えると？",
        },
        {
          layer: 3,
          text:
            "条件 $\\to N = 0$。前題は範囲が広かったが、条件で **範囲の一部に絞られる**——条件は答えの一部を切り出す道具。",
        },
      ],
      formulaPreview: "条件 → N = 0",
    },

    // ============================================================
    // Step 7（inverse = 逆、未知数の位置交換）
    // ------------------------------------------------------------
    // - これまでの「与えられた条件 → 結果を求める」を逆向きに
    //   「結果 → 条件を求める」「答え → 元の式」など
    // - 5 オペレータの中で最も抜けやすい——必ず 1 問入れる
    // ============================================================
    {
      id: "step7",
      position: 7,
      questionText:
        "○○○ の結果が○○のとき、元の○○は何か？", // 与えられている要素と求める要素が前題と逆
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text:
            "**前題は『条件 → 結果』だった。今は逆——『結果 → 条件』**。前題で見た式を逆向きに使えないか？",
        },
        {
          layer: 2,
          text:
            "前題の式から、何を $x$ で表し、何を求める変数として残す？",
        },
        {
          layer: 3,
          text:
            "前題の式を逆向きに解いて $N = 0$。**与える側と求める側が入れ替わっても、関係式は同じ**——両方向に使える。",
        },
      ],
      formulaPreview: "結果 → 条件: N = 0",
    },

    // ============================================================
    // Step 8（qualitative = もう一度質的変化、または別の新しい質）
    // ============================================================
    {
      id: "step8",
      position: 8,
      questionText:
        "○○○○○○（さらに新しい質的変化）。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text:
            "**Step 4 では○○の質的変化。今度は△△の質的変化**——どんな新しいレシピが要る？",
        },
        {
          layer: 2,
          text: "○○の方法では足りない。代わりに○○○を使うと？",
        },
        {
          layer: 3,
          text:
            "○○○ → $N = 0$。Step 4 と Step 8 で **同じ「比較」のレシピで $2$ 種類の質的変化を扱った**。",
        },
      ],
      formulaPreview: "○○ → N = 0",
      figureMarker: "<<TEMPLATE_STEP8>>",
    },

    // ============================================================
    // Step 9（same = Step 8 で身につけた手順を慣らす）
    // ============================================================
    {
      id: "step9",
      position: 9,
      questionText: "○○○○○。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "same",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "**前題と比べてみよう**。○○の質的変化は同じ。値だけ違う？",
        },
        {
          layer: 2,
          text: "Step 8 と同じレシピで",
        },
        {
          layer: 3,
          text:
            "Step 8 と同じく○○ → $N = 0$。",
        },
      ],
      formulaPreview: "○○ → N = 0",
    },

    // ============================================================
    // Step 10（composite = 複合、これまでの集大成）
    // ------------------------------------------------------------
    // - 複数のオペレータを合成（質的変化 × 逆、＋α × 質的変化 など）
    // - 系列全体の総まとめ。胚細胞的概念に立ち戻る瞬間
    // ============================================================
    {
      id: "step10",
      position: 10,
      questionText:
        "○○と○○を合わせた問題（複数の質的変化や逆を組み合わせる）。$N$ はいくつでしょう？",
      answer: 0,
      unit: "",
      unknownLabel: "求める値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text:
            "**これまでの○○と△△を合わせる**。Step N で身につけた手と Step M で身につけた手、両方使える？",
        },
        {
          layer: 2,
          text: "Step N の手で○○まで進めて、Step M の手で○○を消すと？",
        },
        {
          layer: 3,
          text:
            "$N = 0$。**Step 1–10 を通じて、$1$ つの胚細胞的概念「○○」が、$5$ つの異なる場面（同・逆・＋α・質的変化・複合）でそれぞれ現れた**——これがこの単元の総まとめ。",
        },
      ],
      formulaPreview: "○○ + △△ → N = 0",
      figureMarker: "<<TEMPLATE_STEP10>>",
    },
  ],

  /**
   * 公式の景色（derivation）。
   *
   * 構造：
   *   中心の問い → ──── → 概要・基本例 → ──── もっと深く（拡張・歴史・応用）
   *   → 出典（池田氏） → ──── 問いに戻ると（中心の問いに 1 文で答える）
   *
   * 詳細：memory `feedback_glossary_series_content_philosophy.md`
   */
  derivation: `**中心の問い** ｜ ○○を、もう $1$ つの○○を経由してどう表すには？

────────

**○○○○○○○○○○○○○。**

○○の単元では「○○ → ○○の式 → 軌跡の方程式」という流れで、動く点の経路を **外側から見た形**（$F(x, y) = 0$ や $y = f(x)$）として捉えました。

しかし、世界には **$y = f(x)$ で書けない動き** がたくさんある：

- ○○○○○○
- ○○○○○○
- ○○○○○○

そこで発想を変えて、**○○○○○○**：

$$x = f(t), \\quad y = g(t)$$

この $t$ を **○○（パラメータ）** という。

**例**：

- ○○○○○○○○○○
- ○○○○○○○○○○

────────

**もっと深く** — ○○、○○、○○、応用

**○○○○**：○○○○○○○

**○○○○**：○○○○○○○

**応用**：
- ○○○○
- ○○○○

**出典**

- 池田洋介（2023）『数学Ⅱ・B 入門問題精講 改訂版』旺文社
  — 第 N 章「○○」§ M「○○○○」の節構成を参考。問題の値はオリジナル。

────────

**問いに戻ると**

「○○を、もう $1$ つの○○を経由してどう表すには？」——その答えが、

**○○○○○○○○○○。**

○○○○○○——これが○○の核。`,
};

/**
 * ## 新規系列を作るときのワークフロー（コピペ手順）
 *
 * 1. 教科書の節（または vault の素材）から **胚細胞的概念** を 1 文に絞る
 *    （memory `feedback_driving_question_embryo_cell.md` を参照）
 *
 * 2. このファイルから `TEMPLATE_SERIES` をコピーし、`seriesAdvanced.ts`
 *    （または該当の系列ファイル）にペースト
 *
 * 3. 値の置換：
 *    - `id` / `title` / `subtitle` / `patternId`
 *    - `drivingQuestion` / `revelationLabel`
 *    - 各 `step` の `questionText` / `answer` / `unknownLabel` / `formulaPreview`
 *
 * 4. ヒントの書き直し（**ここで原則を外さないことが最重要**）：
 *    - **Layer 1 は比較指さしの呼びかけのみ**——テンプレの○○を埋めるとき、
 *      解き方や答えを書かない
 *    - **Layer 2 は「同じ／違う」の問いかけ**——直接計算を書かない
 *    - **Layer 3 で初めて worked example + 差 1 つ**
 *
 * 5. 図（figureMarker）を Step 1 / 質的変化 Step に対応する SVG を Math.tsx
 *    に追加し、マーカー文字列をフィールドに入れる
 *
 * 6. derivation を実際の内容で埋める（テンプレの○○を全部置換）
 *
 * 7. patterns.ts に新規 PatternId を追加（既存パターンで足りなければ）
 *
 * 8. SERIES_LIST と STATIC_CATALOG に追加し、適切な位置（教育順）に配置
 *
 * 9. 辞書（glossary.ts）に新規用語を追加（3 セクション原則を遵守）
 *
 * 10. **コミット前の機械チェック**を実行（CLAUDE.md「新規系列・ヒントを
 *     書く前のチェックリスト」末尾の grep スクリプト群）
 *
 * 11. tsc / npm run build を確認 → commit → push → GitHub Actions 確認
 *
 * ## 関連
 *
 * - `/Users/iwaiteruhisa/ruisuishiki/CLAUDE.md`「新規系列・ヒントを書く前
 *   のチェックリスト」——本テンプレと対をなす運用ガイド
 * - memory `feedback_ruisuishiki_core_principles.md`——推理式の中核原則
 * - memory `feedback_driving_question_embryo_cell.md`——中心の問い設計
 * - memory `feedback_glossary_series_content_philosophy.md`——辞書 3 セクション
 * - memory `feedback_figure_does_not_reveal_answer.md`——図に答えを書かない
 * - memory `feedback_figure_fade_out_scaffolding.md`——図はフェードアウト足場
 * - vault 本文：`教育のパタン・ランゲージ/個人/推理式指導算術*.md`（3 弾、
 *   理論の一次ソース）
 */
