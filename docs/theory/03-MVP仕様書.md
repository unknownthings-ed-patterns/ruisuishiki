<!--
このファイルは「教育のパタン・ランゲージ」Vault の私的執筆版から、
公開用としてコピー・整形したスナップショットです。
元ファイル: 推理式指導算術MVP仕様書（第3弾）.md
変換: [[wikilinks]] を Wiki 公開サイトの URL に変換、または太字 fallback
ライセンス: CC BY-SA 4.0（../LICENSE-THEORY 参照）
-->

> **第3弾：MVP 仕様書 — 現時点のスナップショット・進行中の生きた文書**
>
> この文書は `ruisuishiki` プロジェクトの理論的背景を記したものです。
> 内容は加筆・修正が続いており、これは執筆時点のある日のスナップショットです。
> 自由に複製・改変・継承してください（CC BY-SA 4.0）。
> 詳細は [README.md](./README.md) を参照してください。

---


# 推理式指導算術MVP仕様書（第3弾）

> 第1弾で「戸田の参考書を生成系として取り出す」テーゼを立て、第2弾で「近転移エンジン＋フェードイン解説＋比較を指さすAI」へ修正した。第3弾はその修正済みテーゼを、最小のMVPとして実装に着手できる粒度まで降ろす。

**位置づけ**：非公開の構想文書（第3弾）。前2弾の延長線上の最終設計層。実コードは書かず、データモデル・パイプライン・UI・プロンプト設計・評価計画・実装順序を詰める。**最終決定（技術スタック・リポジトリ・デプロイ先）は実装着手時のユーザー裁定。**

---

## 0. 実装方針（2026-06-14 合意）

- **MVP段階（段階1〜6）はClaude Code単独で進める**——文脈の一貫性（修正版テーゼ・フェードイン3層・F1〜F10の暗黙知）と vault との直接連携を重視
- **Codex（GPT-5系）は拡張フェーズで投入**——複数学年への展開・テスト自動化・CI整備など機械作業の比率が上がる時点で役割分担
- **段階6（フィールド試行）の前で一度立ち止まる**——子どもに使わせる前にfable-5復活時のレビュー or 別観点での内部審査を挟む
- **fable-5の復活は不確実**だが、本書＋実装からの学びがあれば復活時に深いレビューを依頼でき、復活しなくても前進が続く設計

---

## 1. 本書の位置づけと範囲

### 1.1 第1〜3弾の関係

| 段階 | 目的 | 主な産物 |
|---|---|---|
| 第1弾（統合理論文書） | 三資料の統合と「AI時代の再構成」テーゼの定式化 | 8つの設計原則・Wikiパタンへの接続マップ |
| 第2弾（批判的検討） | テーゼの審査・修正版・失敗モード | 中心テーゼ修正版・F1〜F10・既存サービス差別化軸 |
| **第3弾（本書・MVP仕様書）** | **実装に着手できる粒度の設計図** | **データモデル・生成パイプライン・UI・プロンプト・評価計画** |
| 第3弾実装フェーズ | コードを書き、教室で試す | リポジトリ・MVPアプリ・観察ログ |

### 1.2 本書で扱うもの／扱わないもの

| 扱う | 扱わない（実装着手時の決定事項） |
|---|---|
| 単元・文型・系列の最小例示 | 全学年カリキュラム対応 |
| データモデル（型定義レベル） | DB物理設計・テーブルDDL |
| 生成パイプライン（モジュール構成・I/O） | コードの実装 |
| UI設計（画面遷移・要素・ふるまい） | デザインカンプ・CSS |
| プロンプト設計（テンプレート骨格） | 最終チューニング済みプロンプト |
| 評価計画（指標・観察ログのスキーマ） | 実フィールドの倫理審査・許諾 |
| 実装順序（段階） | 個別タスクの工数見積もり |
| 技術スタック候補（複数案） | 最終決定（リポジトリ作成時） |

---

## 2. 全体ビジョンの中でのMVP位置

ユーザーの長期ビジョンは4つの面を持つ（プロジェクト初期発話より）：

1. **教材生成サイト**（教師向け：ワークシート生成）
2. **AIドリル**（学習者向け：系列を歩く）
3. **学習サイト**（子ども〜大人：自己教育）
4. **個人知識システム**（そら子：実践・履歴・パタン横断）

このうちMVPは **(1)＋(2) のごく小さなスライス**に絞る——なぜなら：

- 第1弾§5.3で「同じエンジンの二つのインターフェース」と定式化した中核を、最小単元で実証することが MVP の意義
- (3) 大人学習サイトは(2)のUIをそのまま転用できるので別MVPにする必要なし
- (4) そら子は別リポジトリ（既存）。横断は「APIで履歴を渡す」設計で十分。今は接続点だけ定義

**MVPゴール**：「1単元・1クラス・1教師で、教師が系列を組み、子どもが系列を歩き、教師が履歴で診断できる」状態。

---

## 3. MVP範囲の確定

### 3.1 対象単元：割合（小学5年）

選択理由：
- 公立小カリキュラムの中核単元（教師として現場で使える）
- 文章題が多く、文型応用主義の効果実証フィールドとして適切
- 子どもが詰まる典型単元——比較を指さすAIの真価が出やすい
- 戸田の3課題（比較量・割合・もとにする量）と教科書の3用法が完全に対応

代替候補（実装段階で差し替え可能）：植木算（戸田の原典例）、面積、速さ。

### 3.2 文型の最小セット（5つ）

| ID | 文型 | 解式 | 戸田用語での記述 |
|---|---|---|---|
| P1 | 比較量を求める | B = A × p | もとにする量A、割合p、比較量Bの関係。B未知 |
| P2 | 割合を求める | p = B ÷ A | A,B既知、p未知 |
| P3 | もとにする量を求める | A = B ÷ p | B,p既知、A未知 |
| P4 | 増量・減量（百分率） | B = A × (1±p) | 「2割引」「3%増し」型 |
| P5 | 連続変化 | B = A × (1+p1) × (1+p2) | 「2割引のあとさらに1割引」型 |

各文型に変化オペレータ系列（5〜10問）。MVPでは P1 を主軸に、各オペレータの実例を最低1問ずつ。

### 3.3 変化オペレータの最小実装

第1弾§5.2の桝田5オペレータをそのまま：

| Op | 名 | 例（P1 から） | データ表現 |
|---|---|---|---|
| Op1 | 同（確認） | 同じ文型で材料置換 | { type: "SAME", changes: ["material"] } |
| Op2 | 逆（未知数の交換） | P1→P2、P1→P3 | { type: "INVERSE", from: "P1", to: "P2" } |
| Op3 | ＋α（条件追加） | 「2割引のあと消費税」 | { type: "PLUS_ALPHA", added: "tax_rate" } |
| Op4 | 質的変化（場面転換・構造保存） | 値段→人数→面積 | { type: "QUALITATIVE", context_shift: true } |
| Op5 | 複合（オペレータの組み合わせ） | 逆＋＋α | { type: "COMPOSITE", ops: [Op2, Op3] } |

### 3.4 利用者像

- **教師**：5年生担任。教科書の単元計画を持っている。ITリテラシーは普通（Google Classroom、Excel）
- **子ども**：5年生25〜30人。タブレット1人1台（GIGA端末）想定
- **デバイス**：教師PC（Web）、子どもタブレット（Web）。ネイティブアプリは作らない

### 3.5 利用シナリオ

**シナリオA（教師の朝の準備、10分）**：
1. ログイン→「割合」単元を開く
2. 「今日は P1（比較量）の基本原形＋3問」を選択
3. クラスの実態に合う文脈を選択（買い物 / 給食残量 / 校庭の広さ）→AI提案を見る
4. 数値範囲を確認（既習：整数、新習：小数倍）→「生成」
5. プレビュー：5問の系列。教師がOKなら「公開」→クラスに配信

**シナリオB（子どもの45分授業）**：
1. 子どもがタブレットで開く→今日の系列が表示される
2. 第1問（暗算基本原形）：解答入力→正答→次へ
3. 第2問（逆）：詰まる→「ヒント？」を押す
   - 第一段：「前題と比べてみよう」（前題が並んで表示される）
   - 第二段：「何が同じで何が違うかな？」
   - 第三段：解説（worked example）を選んで開く
4. 第3問（質的変化）：解けた→「気づいたことを書こう」（任意）
5. 余裕のある子は「同じ文型で問題を作ってみよう」
6. 終了→振り返り入力

**シナリオC（教師の翌日の診断、5分）**：
1. クラス履歴ビューを開く
2. 「逆オペレータで詰まった子」「質的変化で誤答した子」が文型×オペレータ粒度で表示
3. 翌日の補充系列を1クリックで提案→修正→配信

---

## 4. アーキテクチャ概観

```
┌─────────────────────────────────────────┐
│           Web Frontend (Next.js)           │
│  - 教師ビュー（系列設計・履歴・診断）       │
│  - 学習者ビュー（系列を歩く・比較指さし）   │
└────────────────┬────────────────────────┘
                 │ REST/JSON
┌────────────────┴────────────────────────┐
│              API Layer                      │
│  - 認証（教師・子ども）                     │
│  - 系列 CRUD                                │
│  - 学習履歴の集計（文型×オペレータ軸）      │
└──────┬────────────────────┬──────────────┘
       │                    │
┌──────┴─────────┐  ┌──────┴──────────────┐
│ Generation     │  │  Database              │
│ Pipeline       │  │  - Pattern            │
│ - LLM 提案     │  │  - Series             │
│ - SymPy 検証   │  │  - Problem            │
│ - Tagging      │  │  - LearnerHistory     │
└────────────────┘  └────────────────────────┘
```

### 4.1 モジュール責務

- **Generation Pipeline**：文型・文脈・数値範囲を入力に、整合性検証済みの問題を生成
- **API Layer**：状態を持つ。系列の保存・配信・履歴の蓄積と集計
- **Database**：問題プール（生成済み問題は再利用可能）と学習履歴
- **Frontend**：教師ビューと学習者ビューを別 routes だが、UIコンポーネントは共有可能（同一エンジンの2インターフェース原則）

### 4.2 そら子との接続点

- そら子（別リポジトリ）から本MVPの API を読む：`GET /api/history/{user_id}` で文型×オペレータの履歴を JSON で返す
- そら子側で「今日の数学デイリーの問題は、前回詰まった逆オペレータの復習にしませんか」と提案する材料になる
- MVPでは「APIエンドポイントを切る」だけ。そら子側の利用は後段

---

## 5. データモデル詳細

TypeScript の型定義で示す（最終言語は実装着手時に決定）。

```typescript
// 5.1 Pattern（文型）
type Pattern = {
  id: string;              // "P1"
  unit: string;            // "ratio_5th"
  natural_language: string; // "比較量を求める"
  formula_template: string; // "B = A * p"
  variables: Variable[];    // 解式に登場する変数とその意味
  difficulty_tier: 1 | 2 | 3; // その一・その二・その三
  textbook_alignment: string[]; // 教科書単元のID（任意）
};

type Variable = {
  name: string;            // "A"
  role: "もとにする量" | "比較量" | "割合" | "条件付加";
  domain: NumberDomain;    // 値域制約
  unknown: boolean;        // この問題で未知数か
};

type NumberDomain = {
  type: "integer" | "decimal" | "fraction" | "percent";
  min?: number;
  max?: number;
  step?: number;
};

// 5.2 Material（材料・文脈）
type Material = {
  id: string;
  pattern_id: string;
  context_category: "shopping" | "food" | "area" | "people" | "time" | "abstract";
  scene_description: string; // "ケーキ屋で200円のケーキが3割引"
  bindings: VariableBinding[]; // 変数への具体的値
  cultural_tags: string[];   // "日本" "小5既習語彙" など
};

type VariableBinding = {
  variable_name: string;
  value: number | string;
  display_unit?: string; // "円" "人" "m²"
};

// 5.3 Problem（問題）
type Problem = {
  id: string;
  pattern_id: string;
  material_id: string;
  question_text: string;        // 子ども向け問題文
  answer: number | string;       // 正答（記号計算で確定）
  answer_explanation?: string;   // worked example（フェードイン用）
  verification_log: VerificationLog; // 生成時の整合性検証ログ
  source: "generated" | "teacher_edited" | "child_created";
};

type VerificationLog = {
  uniqueness_check: boolean;     // 解が一意か
  domain_check: boolean;         // 値域整合性
  cultural_check: boolean;       // 場面の自然さ（教師レビュー or ヒューリスティック）
  sympy_output?: string;         // SymPyの計算ログ
};

// 5.4 VariationOperator（変化オペレータ）
type VariationOperator =
  | { type: "SAME"; changes: ("material" | "numbers")[] }
  | { type: "INVERSE"; from_pattern: string; to_pattern: string }
  | { type: "PLUS_ALPHA"; added_condition: string }
  | { type: "QUALITATIVE"; new_context_category: string; structure_preserved: true }
  | { type: "COMPOSITE"; ops: VariationOperator[] };

// 5.5 Series（系列）
type Series = {
  id: string;
  title: string;
  teacher_id: string;
  unit: string;
  steps: SeriesStep[];
  published_at?: Date;
};

type SeriesStep = {
  position: number;        // 系列内の位置
  problem_id: string;
  variation_from_previous?: VariationOperator; // 前題からの差分
  intended_purpose: "basic_form" | "confirmation" | "variation" | "qualitative" | "free_creation";
  hint_layers: HintLayer[]; // フェードイン解説の3層
};

type HintLayer = {
  layer: 1 | 2 | 3;
  trigger: "first_request" | "second_request" | "third_request";
  content: string; // 1層目: 比較指さし、2層目: 着目促し、3層目: worked example
};

// 5.6 LearnerHistory（学習履歴）
type LearnerHistory = {
  learner_id: string;
  problem_id: string;
  pattern_id: string;            // 集計軸
  operator_from_previous?: VariationOperator; // 集計軸
  answered_at: Date;
  correct: boolean;
  attempts: number;
  hint_layers_opened: number[]; // どの層まで開いたか
  worked_example_opened: boolean;
  free_text?: string;            // 子どもの気づきメモ
};

// 5.7 Diagnosis（診断・集計結果）
type Diagnosis = {
  learner_id: string;
  by_pattern: Record<string, {
    accuracy: number;
    hint_rate: number;
  }>;
  by_operator: Record<string, {
    accuracy: number;
    hint_rate: number;
  }>;
  stumbled_operator: string[]; // 弱いオペレータ種別
  recommended_remediation_series_id?: string;
};
```

### 5.8 設計上の重要ポイント

- **VariationOperator が前題との差分として記録される**——LearnerHistory の集計軸が「正答率」でなく「文型×オペレータ」になる（第2弾失敗モード F8 への予防）
- **Problem は (Pattern, Material) のインスタンス**——同じ文型で材料を差し替えれば同型異内容を量産できる
- **HintLayer がデータ化される**——フェードイン3層が設計上の一級市民
- **child_created な Problem**——子どもの作問もデータモデル上同等。文型検査を通れば問題プールに入る

---

## 6. 生成パイプライン詳細

### 6.1 全体フロー（第2弾§7.2の具体化）

```
Step 1: 教師入力
  - 文型ID（P1〜P5から選択）
  - 文脈カテゴリ（買い物 / 給食 …）
  - 数値範囲（教師が「整数まで」or「小数倍まで」指定）
  - 系列長（基本原形＋N問）
  - 変化オペレータの希望順（任意。指定なければデフォルト系列）

Step 2: LLM が材料候補を生成
  - プロンプト：「文型X、文脈Y、数値範囲Zの問題シーンを5つ提案せよ」
  - 出力：Material 候補リスト（自然言語）

Step 3: SymPyで解式適用・解の一意性検証
  - 文型の formula_template + Material の bindings を式に代入
  - 解を計算・一意性を検証
  - 不適合な Material は除外（or 数値を微調整して再試行）

Step 4: LLM が自然言語化
  - プロンプト：「次の問題場面を、小学5年生が読める日本語の問題文に書け」
  - 出力：question_text

Step 5: LLM が文型タグ付け
  - 検証：「この問題文の文型はX1で合っているか」（自己整合性チェック）

Step 6: 系列の編成
  - 基本原形（暗算で解ける数値）→Op1（同）→Op2（逆）→Op3（＋α）→Op4（質的変化）の順
  - 教師が編成順を手動で変更可能

Step 7: プレビュー → 教師レビュー
  - 教師が場面の自然さをチェック
  - 「給食残量」が自校の実態と合わなければ手動編集 or「別案」をクリック→Step 2 に戻る

Step 8: 公開
  - Series が DB に保存される
  - 配信URLが子どもに渡る
```

### 6.2 整合性検証の SymPy 使用例（概念）

```python
# 概念的な擬似コード（実装時に具体化）
from sympy import symbols, solve, Eq

# Pattern P1: B = A * p
A, B, p = symbols('A B p', positive=True)
formula = Eq(B, A * p)

# Material binding: A=200, p=0.7（3割引なら 1-0.3 = 0.7）
bindings = {A: 200, p: 0.7}
solution = solve(formula.subs(bindings), B)

# 一意性検証
assert len(solution) == 1, "解が一意でない"
assert solution[0].is_real and solution[0] > 0, "解が現実的でない"

# 整数になる/きれいな小数になる？
answer = solution[0]
verification_log = {
    "uniqueness_check": True,
    "domain_check": isinstance(answer, (int, float)),
    "sympy_output": str(answer)
}
```

### 6.3 LLMプロンプトのテンプレート骨格

#### 6.3.1 材料生成プロンプト

```
あなたは小学5年生向けの算数文章題を作る助手です。
以下の制約で、問題場面を5つ提案してください。

文型: {pattern.natural_language}
解式: {pattern.formula_template}
変数の意味: {pattern.variables}
文脈カテゴリ: {context_category}
数値範囲:
  - もとにする量: {domain_A}
  - 割合: {domain_p}

要件:
1. 場面は日本の小学5年生にとって自然なもの
2. 数値は範囲内で、解が一意かつ簡潔になるよう選ぶ
3. 「ケーキ屋」「給食」「校庭」など、文脈カテゴリに合う具体物を使う
4. 答えは記号計算で検証されるので、変数の値だけ正確に出力

出力形式（JSON）:
[
  {
    "scene": "...",
    "bindings": {"A": 200, "p": 0.7},
    "expected_answer": 140,
    "display_units": {"A": "円", "B": "円"}
  },
  ...
]
```

#### 6.3.2 比較指さしヒントの生成プロンプト

```
あなたは学習者が問題で詰まったときに、「前題と比較せよ」と指さす助手です。
解説を絶対にしないでください。代わりに、前題のどこと比較すべきかを示唆してください。

現在の問題: {current_problem.question_text}
前題: {previous_problem.question_text}
前題と現問題の関係: {variation_operator.type}

ヒント生成のルール:
- 第1層: 「前の問題と比べてみよう」とだけ言う（具体は言わない）
- 第2層: 何が同じで何が違うかを問いかける形で示す（「もとにする量はどう違う？」）
- 第3層（最終手段）: 前題の解き方を worked example として示し、現問題との差を1つだけ指す

絶対にしてはいけないこと:
- 現問題の解き方を直接示すこと
- 答えを示すこと
- 「公式を使えば〜」と公式名を言うこと

出力形式（JSON）:
{
  "layer_1": "前の問題と比べてみよう",
  "layer_2": "...",
  "layer_3": "..."
}
```

#### 6.3.3 子どもの作問の文型検査プロンプト

```
子どもが作った問題が、指定された文型を満たしているか検査してください。

子どもの問題文: {child_problem_text}
期待文型: {pattern.natural_language}
期待解式: {pattern.formula_template}

検査項目:
1. 解式が成立するか（材料が解式に当てはまるか）
2. 解が一意か
3. 場面が不自然でないか
4. 小学5年生の語彙範囲か

出力形式（JSON）:
{
  "pattern_match": true/false,
  "uniqueness": true/false,
  "naturalness": true/false,
  "feedback": "（子どもへのコメント。否定的なときも建設的に）"
}
```

### 6.4 LLM選定の考え方

- **MVPでは Claude (Sonnet) を主に使用**——コストと品質のバランス、JSON出力安定性
- **数値検証は SymPy**——LLMに数値計算をさせない（第2弾§7.1）
- **将来：fine-tuning は不要**——プロンプト設計と検証パイプラインで十分。fine-tuning は文型タグの精度を上げる段階で検討

---

## 7. UI設計

### 7.1 教師ビュー（系列設計画面）

```
┌─────────────────────────────────────────────┐
│  単元: 割合（5年）   文型: ▼ P1 比較量を求める  │
├─────────────────────────────────────────────┤
│  文脈: ▼ 買い物    数値範囲: ▼ 小数倍まで      │
│  系列長: [5]問     変化順: 同→同→逆→＋α→質的  │
│                                              │
│  [プレビュー生成]                              │
├─────────────────────────────────────────────┤
│  1. [基本原形] 300円の20%引きはいくら？        │
│     答: 60円  ✓検証OK                        │
│     [編集] [別案]                              │
│                                              │
│  2. [同] 500円の3割引きはいくら？             │
│     答: 350円  ✓検証OK                       │
│     [編集] [別案]                              │
│                                              │
│  3. [逆] あるノートが7割引きで210円。元値は？  │
│     答: 700円  ✓検証OK                       │
│     [編集] [別案]                              │
│                                              │
│  ...                                          │
│                                              │
│  [系列を保存] [子どもに配信]                   │
└─────────────────────────────────────────────┘
```

#### ふるまいの要点

- **文型タグは教師にだけ見せる**（第2弾失敗モードF1の予防）
- **各問題に「別案」**——同じ文型・同じオペレータで material 差し替え
- **配信前に必ずプレビュー**——教師の手動確認を強制
- **変化順のテンプレート**を用意（デフォルト・全員達成型・チャレンジ型）

### 7.2 学習者ビュー（系列を歩く画面）

```
┌─────────────────────────────────────────────┐
│  進度: ●●●○○ 3/5問                          │
├─────────────────────────────────────────────┤
│                                              │
│  あるノートが7割引きで210円でした。           │
│  もとの値段はいくらでしょう？                 │
│                                              │
│  ┌──────────────────┐                       │
│  │ あなたの答え:        │                    │
│  │ [        ] 円        │                    │
│  └──────────────────┘                       │
│                                              │
│  [ヒント]     [答えを送る]                    │
│                                              │
│ ┌─── ヒント（タップで開く）───┐               │
│ │ ① 前の問題と比べてみよう    │              │
│ │ ② 〔②をタップで開く〕      │              │
│ │ ③ 〔②の次に開く〕         │              │
│ └────────────────────────┘                 │
└─────────────────────────────────────────────┘
```

#### ふるまいの要点

- **進度バーは見えるが、文型タグは見えない**
- **ヒントは段階的に開く**——タップごとに次の層
- **誤答時：「もう一度考えてみる」「ヒントを見る」**を選択肢として提示。worked example は第3層のみ
- **正答時：「次の問題」**だけでなく**「気づきを書く（任意）」**ボタン
- **系列末：「同じ文型で問題を作ってみよう（チャレンジ）」**——作問への入口

### 7.3 教師ビュー（履歴・診断画面）

```
┌─────────────────────────────────────────────┐
│  クラス: 5年A組  単元: 割合                   │
├─────────────────────────────────────────────┤
│  ＜文型別正答率＞                              │
│   P1 比較量    ████████ 88%                  │
│   P2 割合      ██████   64%                  │
│   P3 もとに    ███      35%  ← 弱点         │
│                                              │
│  ＜オペレータ別正答率＞                        │
│   同          ████████ 92%                  │
│   逆          ████      45%  ← 弱点         │
│   ＋α         ██████   72%                  │
│   質的変化    ██       20%  ← 弱点         │
│                                              │
│  ＜詰まった子（クリックで個人別）＞            │
│   - 6人が「逆」で第3層まで開いた             │
│   - 4人が「質的変化」で誤答                  │
│                                              │
│  [補充系列を提案] [個人別履歴]               │
└─────────────────────────────────────────────┘
```

#### ふるまいの要点

- **集計軸は文型・オペレータ**（個人別正答率の表示も同軸）
- **「補充系列を提案」**——弱点オペレータをカバーする系列を1クリックで生成→教師が編集→配信
- **個人別履歴**：誰がどこで詰まったかが見える
- **個人情報の取り扱い**：MVPでも匿名化（座席番号・出席番号ベース）

---

## 8. 「比較を指さすAI」のプロンプト設計

最重要差別化点。失敗すると Khanmigo の劣化版になる。

### 8.1 設計原則（プロンプト・レベルの強い制約）

1. **絶対禁止**：解き方の説明・公式名の言及・部分計算の提示・答えの示唆
2. **強い推奨**：前題の参照・「同じ／違う」の問い・場面の言い直し・第2弾§4.3のフェードイン3層を遵守
3. **第3層（worked example）は事前計算されたものを返す**——LLMにその場で計算させない

### 8.2 ガードレール（プロンプト＋後処理）

- プロンプト本文に「公式」「式は」「答えは」などのキーワードを禁止リストとして注入
- 後処理で出力を正規表現フィルタ：禁止キーワードを含めば再生成 or 第3層に強制移行
- ログを残し、教師ビューでサンプリングできるようにする（教師による品質監視）

### 8.3 比較指さしの語彙パターン（学習用ナレッジベース）

| 関係 | 第1層 | 第2層 | 第3層トリガー |
|---|---|---|---|
| Op1 同 | 「前の問題と似ているね」 | 「数だけ違う気がする？どこが？」 | (省略可) |
| Op2 逆 | 「前の問題と比べてみよう」 | 「前は何を求めた？今は何を求めている？」 | worked example |
| Op3 ＋α | 「前の問題に何か足されている」 | 「前にはなかった条件が一つ足されているよ」 | worked example |
| Op4 質的変化 | 「場面は違うけど…」 | 「数の関係に注目すると、前の問題とどこが同じ？」 | worked example |
| Op5 複合 | 「いくつかの問題が混ざっている」 | 「P1のような部分と、P2のような部分はある？」 | worked example |

これは事前にナレッジベース化し、プロンプトに変動部として注入する（LLMが毎回ゼロから生成しない）。

---

## 9. 評価実装

### 9.1 観察ログのスキーマ

第2弾§9のF1〜F10をMVPで観察するためのログ：

```typescript
type ObservationEvent =
  | { kind: "hint_opened"; layer: 1 | 2 | 3; learner_id: string; problem_id: string; ts: Date }
  | { kind: "worked_example_opened"; learner_id: string; problem_id: string; ts: Date }
  | { kind: "child_problem_created"; learner_id: string; pattern_id: string; passed_check: boolean; ts: Date }
  | { kind: "generation_failed"; pattern_id: string; reason: "uniqueness" | "domain" | "naturalness"; ts: Date }
  | { kind: "teacher_edited_question"; teacher_id: string; problem_id: string; ts: Date }
  | { kind: "teacher_picked_remediation"; teacher_id: string; recommended_id: string; selected: boolean; ts: Date };
```

### 9.2 評価指標（再掲・精緻化）

| 指標 | 観察方法 | 目標値（MVP） |
|---|---|---|
| 単元前後テストの効果量 | 既存テスト | d > 0.3（小〜中効果） |
| 子どもの継続率 | アプリ利用ログ | 単元終了まで90%以上 |
| つまずきオペレータ検出率 | 教師ヒアリング | 教師が「履歴を見て補充設計できた」と回答 |
| 比較指さしヒントの有効率 | hint_opened→正答に至った率 | 60%以上 |
| 第3層（worked example）への到達率 | worked_example_opened率 | 詰まった子の30%以下（多すぎると「フェードイン」が機能していない） |
| 生成問題の整合性 | 教師の手動却下率 | 10%以下 |
| 子ども作問の通過率 | passed_check率 | 50%以上（低すぎる場合は文型検査が厳しすぎ） |

### 9.3 失敗モード監視（F1〜F10の運用）

各失敗モードに対応する観察を予め組み込む：

- **F1（文型タグの早すぎる開示）**：UI実装段階でレビュー。子どもビューに「P1」等が出ていないことを定期チェック
- **F2（生成不整合）**：`generation_failed` イベントの率を週次監視
- **F4（worked example不足で挫折）**：単元途中離脱率と worked_example_opened率の相関を分析
- **F8（履歴が正答率に堕ちる）**：実装初期にデータモデル監査（文型・オペレータ軸が記録されているか）

---

## 10. 実装順序（段階）

### 10.1 段階0：環境準備（実装着手時）

- リポジトリ作成（GitHub）
- 技術スタック決定（§11参照）
- LLM APIキーの確保
- ローカル開発環境のセットアップ

### 10.2 段階1：データ生成パイプライン単体（CLI）

- 文型P1のスキーマ定義（JSON or TS型）
- SymPyによる解式検証スクリプト（Python）
- LLMによる材料生成プロンプトの実装と試行
- CLI: `python generate_problem.py --pattern P1 --context shopping --count 5`
- **完了条件**：CLIで整合性検証済みの問題5問が JSON で出力される

### 10.3 段階2：教師ビュー（系列設計＋プレビュー）

- Next.js プロジェクト作成
- 文型選択UI・系列プレビュー
- 生成パイプライン呼び出し（段階1をAPI化）
- DBは最初SQLite or PostgreSQL（運用しやすい方）
- **完了条件**：教師が画面で系列を組み、JSONとして保存できる

### 10.4 段階3：学習者ビュー（系列を歩く＋ヒント）

- 系列の取得・問題表示
- 解答送信・正誤判定
- ヒント3層UI
- LearnerHistory の記録
- **完了条件**：子どもが系列を解き、履歴が記録される

### 10.5 段階4：診断ビュー（教師の履歴閲覧）

- 文型・オペレータ別集計
- 個人別履歴
- 補充系列の自動提案（基本ロジック）
- **完了条件**：教師が翌日の補充を1クリックで作れる

### 10.6 段階5：子どもの作問機能

- 作問UI
- 文型検査プロンプトの実装
- 通過した問題のプール組み込み
- **完了条件**：子どもが作った問題が次回の系列で誰かに出題される

### 10.7 段階6：フィールド試行と監視ログ

- 1クラスでの試行（数週間）
- 観察ログの収集・分析
- 第2弾F1〜F10の発生状況をレビュー

### 10.8 段階7：そら子接続

- `GET /api/history` のAPI化
- そら子側で「文型×オペレータ履歴」を読み、数学デイリーの提案に使う

**MVP完了の目安**：段階6が一巡し、ユーザー（教師）が「翌日の授業設計に明確に役立った」と判断できた時点。

---

## 11. 技術スタック候補（実装着手時に最終決定）

### 11.1 案A：TypeScript統一（Node ベース）

- Frontend: Next.js + React + Tailwind
- Backend: Next.js API Routes + Prisma + PostgreSQL
- 整合性検証: nerdamer / mathjs（Pure JS）or Python マイクロサービス
- LLM: Anthropic Claude API (Sonnet)
- デプロイ: Vercel + Supabase
- **長所**：単一言語、Vercelで素早くデプロイ
- **短所**：SymPyほど強力な記号計算がJSにはない（mathjsは限定的）

### 11.2 案B：Python＋Frontend分離

- Frontend: Next.js + React + Tailwind（Vercel）
- Backend: FastAPI + PostgreSQL（Railway / Fly.io）
- 整合性検証: SymPy（強力）
- LLM: Anthropic Claude API
- **長所**：SymPyが使える、数学処理に強い
- **短所**：2リポジトリ運用、デプロイ先が分かれる

### 11.3 案C：ハイブリッド

- Next.js（主）＋ SymPyマイクロサービス（数値検証のみ）
- 主にA案、検証だけB案
- **長所**：両方の利点
- **短所**：マイクロサービス運用の複雑さ

**推奨**：実装段階1（CLI）は Python（SymPy使用）で始め、段階2以降で Next.js を立てる。**案B または案C**。最終判断は実装着手セッションでユーザー裁定。

---

## 12. fable-5復帰時 + Claude Pro実装着手時の引き継ぎ

### 12.1 fable-5復帰時のレビュー依頼項目（第3弾分）

1. **§3 MVP範囲**：割合（5年）の選択は適切か。代替候補（植木算・面積）と比較してMVPに最適か
2. **§5 データモデル**：戸田・桝田の用語体系を型として正しく表現できているか。漏れている概念はないか
3. **§6 生成パイプライン**：LLM+SymPyの分担は第2弾§7.2の意図通りか。SymPyの代替（mathjs等）でも本質を損なわないか
4. **§7 UI**：第1弾§5.3「同じエンジンの二つのインターフェース」が画面設計に反映されているか
5. **§8 比較を指さすAI**：プロンプト設計と語彙ナレッジベースの組み合わせで「親切なAIに堕ちない」担保ができているか
6. **§10 実装順序**：段階1〜7の依存関係に齟齬はないか。MVPとして大きすぎないか
7. **§11 技術スタック**：案A/B/Cの比較で見落としている選択肢はないか

### 12.2 Claude Pro（Opus/Sonnet）実装着手セッションへの引き継ぎ

実装着手時のセッション開始時に、次の順で読むこと：

1. **vault CLAUDE.md**（Wiki運用全体の正）
2. ****推理式指導算術とAI時代の再構成（統合理論文書）****（第1弾・テーゼ）
3. ****推理式指導算術AI構想の批判的検討（第2弾）****（第2弾・修正版テーゼ）
4. **本書（第3弾）**（仕様書）

実装着手時の最初のタスク：

1. リポジトリ作成（名前案：`ruisuishiki`、`suiri-shiki`、ユーザー裁定）
2. 技術スタックの最終決定（§11）
3. **段階1から着手**：CLI による問題生成パイプラインを単体で動かす——ここが成立しないとUI開発しても無意味

### 12.3 そら子との接続点（記録）

- そら子側で「今日の数学デイリー」を提案するときに、本MVPの `GET /api/history/{user_id}` を読む
- 接続点：API のレスポンス形式（§5.7 Diagnosis型）
- そら子の prompt 設計にも「比較を指さす」哲学を波及させる（第1弾§5.5）

### 12.4 ユーザー（教師）の役割

- フィールド試行（1クラス）の場の確保
- 観察ログのレビュー（特に質的判断：場面の自然さ・ヒントの妥当性）
- 失敗モードF1〜F10の現場での発見と報告
- 文型・オペレータの教育的妥当性の最終判断

---

## 13. 第3弾で扱わなかった残課題（実装後の検討項目）

実装が一巡したあとに考えるべきこと：

1. **複数学年・複数単元への拡張**：文型カタログの構築。教科書単元との対応表
2. **大人の数学学習版**：UIテーマ・難易度層（その三）・自己調整学習機能の追加
3. **そら子の本格統合**：履歴の意味化、生活経験との接続
4. **教師のための文型設計ワークショップ**：教師が新しい文型を定義できるUI
5. **生成パイプラインの効率化**：問題プールの再利用最大化、LLMコスト最小化
6. **オープンソース化の検討**：教育現場でのアクセス可能性の最大化
7. **多言語対応**：日本以外の文化圏での適用（推理式は普遍原理）

---

## 出典

### 第1〜2弾文書からの継承
- **推理式指導算術とAI時代の再構成（統合理論文書）**——第1弾
- **推理式指導算術AI構想の批判的検討（第2弾）**——第2弾
- [戸田城外著『推理式指導算術』研究のための序説（駒野晃司）](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E6%96%87%E7%8C%AE/%E6%88%B8%E7%94%B0%E5%9F%8E%E5%A4%96%E8%91%97%E3%80%8E%E6%8E%A8%E7%90%86%E5%BC%8F%E6%8C%87%E5%B0%8E%E7%AE%97%E8%A1%93%E3%80%8F%E7%A0%94%E7%A9%B6%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E5%BA%8F%E8%AA%AC%EF%BC%88%E9%A7%92%E9%87%8E%E6%99%83%E5%8F%B8%EF%BC%89)
- [戸田城外著『推理式指導算術』の研究　推理式指導の解明を中心に（桝田尚之）](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E6%96%87%E7%8C%AE/%E6%88%B8%E7%94%B0%E5%9F%8E%E5%A4%96%E8%91%97%E3%80%8E%E6%8E%A8%E7%90%86%E5%BC%8F%E6%8C%87%E5%B0%8E%E7%AE%97%E8%A1%93%E3%80%8F%E3%81%AE%E7%A0%94%E7%A9%B6%E3%80%80%E6%8E%A8%E7%90%86%E5%BC%8F%E6%8C%87%E5%B0%8E%E3%81%AE%E8%A7%A3%E6%98%8E%E3%82%92%E4%B8%AD%E5%BF%83%E3%81%AB%EF%BC%88%E6%A1%9D%E7%94%B0%E5%B0%9A%E4%B9%8B%EF%BC%89)

### 実装に関わる外部参照（実装着手時に都度確認）
- Anthropic Claude API ドキュメント
- SymPy ドキュメント（記号計算）
- Next.js / Prisma / PostgreSQL の最新版
- PISA数学的リテラシー枠組（評価指標の参照）

### 関連Wikiパタン・概念
- [類推的学習③](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E9%A1%9E%E6%8E%A8%E7%9A%84%E5%AD%A6%E7%BF%92%E2%91%A2)
- [比較で概念をつくる（事例ペアの設計）](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E6%AF%94%E8%BC%83%E3%81%A7%E6%A6%82%E5%BF%B5%E3%82%92%E3%81%A4%E3%81%8F%E3%82%8B%EF%BC%88%E4%BA%8B%E4%BE%8B%E3%83%9A%E3%82%A2%E3%81%AE%E8%A8%AD%E8%A8%88%EF%BC%89)
- [算数シンキング・タスク](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E7%AE%97%E6%95%B0%E3%82%B7%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0%E3%83%BB%E3%82%BF%E3%82%B9%E3%82%AF)
- [オンボーディング](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E3%82%AA%E3%83%B3%E3%83%9C%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)
- [作ることで学ぶ](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E4%BD%9C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%A7%E5%AD%A6%E3%81%B6)
- [自己調整](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%91%E3%82%BF%E3%83%B3/%E8%87%AA%E5%B7%B1%E8%AA%BF%E6%95%B4)
- [経験から出発する](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%A1%E3%82%BF%E3%83%91%E3%82%BF%E3%83%B3/%E7%B5%8C%E9%A8%93%E3%81%8B%E3%82%89%E5%87%BA%E7%99%BA%E3%81%99%E3%82%8B)
- [経済を原理とする](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%A1%E3%82%BF%E3%83%91%E3%82%BF%E3%83%B3/%E7%B5%8C%E6%B8%88%E3%82%92%E5%8E%9F%E7%90%86%E3%81%A8%E3%81%99%E3%82%8B)
- [足場は消えるために組む（フェードアウト）](https://unknownthings-ed-patterns.github.io/unknownthings-ed-patterns/%E3%83%A1%E3%82%BF%E3%83%91%E3%82%BF%E3%83%B3/%E8%B6%B3%E5%A0%B4%E3%81%AF%E6%B6%88%E3%81%88%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%E7%B5%84%E3%82%80%EF%BC%88%E3%83%95%E3%82%A7%E3%83%BC%E3%83%89%E3%82%A2%E3%82%A6%E3%83%88%EF%BC%89)
