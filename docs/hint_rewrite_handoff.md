# ヒント「比較の指さし」書き直し — 引き継ぎ（Opus 向け）

作成: Claude Fable 5 セッション（2026-06-26）。
目的: ヒント3層が中核ふるまい「比較の指さし」を裏切っているドリフトの一括是正。
Fable 5 が使えないときは **Opus がこの文書だけで同じ基準で続けられる**ようにする。

---

## 0. なぜこの作業をするか

推理式の最大の差別化は「**比較を指さすAI**（解説しない）」（第2弾§6.3・§10）。
ところが多くの系列で Layer 1 が公式・手順の直接説明、Layer 3 が裸の答えになっていた
（失敗モード F10 / F4）。これは「親切なAI tutor」の癖がデフォルト発動した構造的ドリフト
（memory `ruisuishiki-core-principles` の「なぜ書いたか」参照）。中核を取り戻す。

## 1. 基準（正は2つ、暗記すること）

- **`ruisuishiki/CLAUDE.md` の「新規系列・ヒントを書く前のチェックリスト」**（3層の必須構造表＋禁止条項）
- **memory `feedback_ruisuishiki_core_principles.md`**（Layer 1-3 の具体例・F1〜F10）

要点だけ再掲:

| Layer | 書く | 書かない |
|---|---|---|
| **1** | 「前題と比べてみよう。何が同じ？何が違う？」の**比較指さし**のみ。Step1 は前題が無いので **Socratic な問いかけ** | 公式・式・数値計算・手順・答え |
| **2** | 「同じ/違う」を**問いかける**形で着目を促す | 直接計算の実行・答え |
| **3** | **worked example**。前題の解法を示し、現問題との差を**1つ**指す。**やり方（道筋）まで見せ、最後の数値計算は学習者に残す** | 最終の答えそのもの（答えは答え入力欄で確認できる。戸田の自得を残す） |

公式・定義・導出は **`derivation` フィールド**（理論本文）に置く。ヒントには置かない。

## 2. お手本（mirror せよ）

すでに準拠済みで、形を完全模倣してよい系列（すべて seriesAdvanced.ts）:

- **`ADV_NUMBER_LINE_SERIES`（数直線上の点）** ← 本作業で書き直した入口系列。commit `41eb411`。
  距離→中点→内分→外分の質的変化を、Layer 1 で毎回「前題と比べて何が変わった？」と指さす形。
- **`ADV_PARAMETRIC_SERIES`（媒介変数表示）** ← Layer 1 が Socratic、Layer 3 が前題比較の worked example。
- `ADV_LOCUS_SERIES`（軌跡）・`ADV_REGION_SERIES`（領域）・`ADV_LINEAR_PROGRAMMING_SERIES`（不等式と領域）。

## 3. やり方（1系列ずつ）

1. 対象系列を**全文読む**（questionText・variationFromPrevious・derivation を把握）。
   ヒントを書くには各 step が前題から**何を変えたか**を理解している必要がある。
2. お手本（数直線上の点 / 媒介変数表示）の形に合わせて hints を書き直す。
   - Step1 = Socratic、Step2 以降 = 「前題（…）と比べてみよう。…」で始める
   - `variationFromPrevious` が `qualitative` の step は「場面が変わる質的な一歩」と明示し、
     構造が保存されることを Layer 2-3 で気づかせる（例: 内分→外分は「n を −n に」）
   - 公式・部分計算・答えを Layer 1/2 から除く。Layer 3 は前題との差を1つ指す worked example に
3. **`python3 scripts/audit_hints.py seriesXXX.ts`** で対象系列が ✅（L1違反=0）になったか確認
4. **`cd frontend && npx tsc --noEmit && npm run build`** で構文・LaTeX を検証
5. commit（メッセージに準拠した設計節を明記）:
   `fix: ○○ 系列のヒントを比較の指さし3層に書き直し（第2弾§4.3 / 第3弾§6.3.2）`

注意: LaTeX は .ts ソース内では**バックスラッシュ2個**（`\\dfrac` `\\cdot`）。
既存テキストは必ず Read 結果からコピーして編集する（全角/半角の取り違え防止）。

## 4. 残タスク — 図形と方程式ユニット（先生が今歩いている。最優先）

`python3 scripts/audit_hints.py seriesAdvanced.ts` の結果より。

| 系列（定数名） | 状態 | L1違反 |
|---|---|---|
| 数直線上の点 `ADV_NUMBER_LINE_SERIES` | ✅ **完了**（本作業） | 0 |
| 軌跡 `ADV_LOCUS_SERIES` | ✅ 既存お手本 | 1 |
| 媒介変数表示 `ADV_PARAMETRIC_SERIES` | ✅ 既存お手本 | 0 |
| 領域 `ADV_REGION_SERIES` | ✅ 既存お手本 | 1 |
| 不等式と領域 `ADV_LINEAR_PROGRAMMING_SERIES` | ✅ 既存お手本 | 1 |
| 直線の方程式 `ADV_LINE_EQUATION_SERIES` | ❌ 要修正 | 10 |
| 点と直線の距離 `ADV_POINT_LINE_DISTANCE_SERIES` | ❌ 要修正 | 10 |
| 円の接線 `ADV_CIRCLE_TANGENT_SERIES` | ❌ 要修正 | 10 |
| 円の方程式 `ADV_CIRCLE_EQUATION_SERIES` | ❌ 要修正 | 8 |
| 円と直線の位置関係 `ADV_CIRCLE_LINE_SERIES` | ❌ 要修正 | 5 |
| 束の考え方 `ADV_BUNDLE_SERIES` | ❌ 要修正 | 2 |

→ **残り6系列**（直線の方程式・点と直線の距離・円の接線・円の方程式・円と直線・束）。

## 5. 残タスク — ユニット外（図形と方程式が済んだあと）

`python3 scripts/audit_hints.py`（全件）で確認。小5（seriesElementary5）・数Ⅰ/A（seriesAlgebra）・
中学（seriesMiddle）・統計（seriesStats）・三角/微分/数列/ベクトル（seriesAlgebra2）に多数のドリフトが残る。
**先生の学習進度（development-loop）に合わせて**歩いている単元から直す。独断で全部やらない。

## 6. 注意（memory より）

- **リント/CIゲートは入れない**——原則がまだ動いている（memory `ruisuishiki-development-loop` 2026-06-26）。
  `audit_hints.py` は「報告」専用の手動ツール。pre-commit hook 化しない。
- 一括自動置換はしない。1系列ずつ、内容を理解して書く（ヒントは問題の文脈依存）。
- 確信が持てない設計判断は推測で進めず、岩井先生に裁定を仰ぐ。
