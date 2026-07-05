# 設計書: T-5 つまずきオペレータビュー — 学習履歴の主役交代（F8 完了）

- 作成: 2026-07-04（Claude Fable 5 / 設計担当）
- 実装担当への引き継ぎ文書。実装は別セッション（Opus 想定）で行う。
- 出自: vault『推理式指導算術実装フェーズからの還流（第5弾）』A-1（High・F8）→ T-5。
- 依存する裁定: **Q2（正答率の扱い）**と**本設計書の案 A/B/C の選択**。どちらも岩井先生。§7 参照。

---

## 0. 目的と哲学（実装判断で迷ったらここに戻る）

学習トップの統計は現在「今週◯問・累計◯問・**正答率◯%**・歩いた系列◯本」。これは
**F8「履歴が正答率に堕ちる」が警告した形そのもの**であり、storage.ts 冒頭のコメント
「集計軸は文型×オペレータ」と実装が乖離している（第5弾 A-1・High）。

主役を交代させる。新しい主役は **「どの変化オペレータでじっくり考えたか」**。

- **つまずき＝悪ではない**。ヒントを深く開いた場所は「学びが起きた深さ」の記録であり、
  比較エンジンの診断信号。表示の語彙も「じっくり考えた」を使う（「間違えた」「弱点」は使わない）。
- **診断は提案止まり**（F7）。「歩き直すと効きます」と指すだけで、強制しない。
- 現在の使用者は先生自身（大人の学習者）。オペレータ名は理論の正式名（同・逆・＋α・質的変化・複合）
  をそのまま出してよい。子どもに出す日が来たら「言い換えの規律」（国語版第6弾の発明）の
  逆輸出を**別途**判断する——本設計はその日の障害にならない（ラベルは1箇所の定数）。
- 文型タグは学習者ビューに出さない（F1）。文型軸は**教師ビュー側で系列単位に近似**する
  （系列≈1つの文型の族）。

## 1. 現状の正確な診断（2026-07-04 のコードに基づく）

| 事実 | 場所 |
|---|---|
| StepRecord は `stepId / attempts / hintsOpened(0\|1\|2\|3) / correct / skipped? / answeredAt` を保持。オペレータ軸は series データと join すれば復元可能＝**データは失われていない** | `lib/types.ts:107` |
| 系列 step は `variationFromPrevious: VariationOp \| null`（null は step1 入口） | `lib/types.ts:57` |
| 統計は `calculateLearningStatsFromHistory`。kokugo_* 除外は T-2 で済み（`isLearningTopStatsSeries`） | `lib/storage.ts:118-153` |
| learn トップは正答率を見出し級 `Stat` で表示 | `app/learn/page.tsx:182-188` |
| 教師ビューは履歴を一切読んでいない | `app/teach/series/page.tsx`（grep 0件） |
| 旧系列 id は `SERIES_REDIRECTS`/`resolveSeriesId` でリダイレクト。**旧 id のまま保存された履歴がありうる** | `lib/seriesCatalog.ts:604-611` |
| 統計テストの器（`test:stats`）は T-2 で構築済み。集計の追加テストはここに足せる | `npm run test` |

## 2. 集計仕様（純関数・storage.ts と seriesCatalog.ts に分けて追加）

### 2.1 join 索引（seriesCatalog.ts）

```ts
/** `${seriesId}::${stepId}` → variationFromPrevious。ALL_STATIC_SERIES から構築 */
export function buildStepOpIndex(): Map<string, VariationOp | null>;
```

- **storage.ts にカタログを import しない**（storage は types だけに依存する葉モジュールのまま。
  join 側の知識は seriesCatalog に置き、集計関数へは lookup 関数として注入する）。

### 2.2 集計（storage.ts・純関数・テスト対象）

```ts
export type OperatorFootprint = {
  op: VariationOp;
  addressed: number;        // 取り組んだ step 数（correct または skipped）
  deepThought: number;      // hintsOpened >= 2（correct か否かは問わない）
  workedExample: number;    // hintsOpened === 3（L3 まで開いた）
  weeklyDeepThought: number; // 過去7日の deepThought
  correctAttempts: { sum: number; count: number }; // 正答 step の試行回数（平均は表示側で）
};

export type OperatorViewData = {
  /** 常に5要素・正典順（same→inverse→plus_alpha→qualitative→composite）。ゼロ行も返す＝5オペレータの地図性 */
  footprints: OperatorFootprint[];
  /** 診断文の対象。weeklyDeepThought 最大 → 同数なら lifetime deepThought → それもゼロなら null */
  focusOp: VariationOp | null;
  /** focusOp を深く開いた系列の上位3件（新しい順）。表示は seriesHref + タイトル */
  focusSeries: { seriesId: string; deepSteps: number }[];
};

export function calculateOperatorView(
  all: SeriesHistory[],
  opOf: (seriesId: string, stepId: string) => VariationOp | null | undefined,
  now?: number,
): OperatorViewData;
```

**集計規則（テストで固定する境界）:**

1. `isLearningTopStatsSeries` で kokugo_* を除外（T-2 と同じ境界。**国語のオペレータ集計は
   観点軸込みで別物**——viewpointRefs を使う将来の国語版に、この関数を流用しない）。
2. lookup 前に `resolveSeriesId(seriesId)` を通す（旧 id で保存された履歴を新系列に合算）。
3. `op === null`（step1 入口）は5行の表に**入れない**（オペレータの表を歪めない）。
4. `op === undefined`（カタログに無い stepId＝廃止系列等）は黙って skip（件数だけ内部で数え、
   dev では console.debug 可・UI には出さない）。
5. `skipped` は addressed に数え、correct には数えない（getResumeIndex と同じ意味論）。
6. `hintsOpened` の同 stepId 上書き意味論は現行のまま（第6弾で「直さない」と決定済み。触らない）。

## 3. 見せ方（3案・先生が1つ選ぶ）

共通: 置き場所は learn トップの現「学習の足あと」セクション（`app/learn/page.tsx:166-195`）。
既存の視覚言語（`Stat`・`var(--surface)`・letterSpacing）を流用し、hasHydrated ゲートも現行踏襲。

### 案 A「オペレータの地図」（推奨）

```
┌ 足あと ──────────────────────────────────┐
│ いまいちばんじっくり考えているのは【質的変化】。          │
│ ▸ 三角方程式（値から角） の質的変化 step を              │
│   歩き直すと効きます。                                   │
│                                                          │
│ 同        歩いた 12 ・ じっくり 1   ▁                    │
│ 逆        歩いた  8 ・ じっくり 3   ▃                    │
│ ＋α       歩いた  5 ・ じっくり 2   ▂                    │
│ 質的変化  歩いた  6 ・ じっくり 5   ▅                    │
│ 複合      歩いた  3 ・ じっくり 2   ▂                    │
│                                                          │
│ 今週 14問 ・ 累計 34問 ・ 歩いた系列 6本                  │
│ ▾ くわしく …… 正答率はここ（Q2=残す裁定の場合のみ）      │
└──────────────────────────────────────────┘
```

- 主役＝5行のオペレータ地図＋一文の診断（focusOp）。ゼロ行も表示する
  （「複合をまだ歩いていない」ことが**見える**のが地図の価値）。
- 「じっくり」= deepThought。バーは deepThought/addressed の比を小さく添える程度
  （数字が主・飾りが従。dataviz は静かに）。
- 診断文は決定的テンプレート（LLM 不使用）:
  `いまいちばんじっくり考えているのは【{op}】。` ＋ focusSeries があれば
  `{系列タイトル} の{op} step を歩き直すと効きます。`（リンクは `seriesHref`）。
  focusOp が null（今週も累計も deepThought ゼロ）なら診断文の代わりに
  `この一週間、ヒントなしで歩けています。` を出す。
- 今週/累計/系列本数の既存 Stat は下段に残す。**正答率は見出し級から降格**（§7 Q2）。

### 案 B「一文の診断＋くわしくは開く」

主役は診断文1つだけ。5行の地図・既存 Stat 群はすべて折りたたみ（▾ くわしく）の中。
学習トップが最も静かになる案。情報は同じで、初期表示量だけが違う。

### 案 C「国語あしあと式に揃える」

国語版 G8 表示層（あしあと）を mirror し、数字を極小化：
「じっくり考えたところ: 質的変化(5)・逆(3)」「歩いたところ: 34 step・6系列」の2行構成。
バー・比率なし。将来子どもに出すときの連続性が最大。

**推奨: 案 A。** 根拠: 現使用者は先生＝大人の学習者で、5オペレータの地図が「次にどこを歩くか」の
判断材料になる（診断ビューの本来目的）。案 B は情報が隠れて診断が習慣にならず、案 C は
大人の自己調整には粒度が粗い。**逆を採る条件**: 学習トップを開くたびに表が目に入るのが
「散歩の静けさ」を壊すと感じたら案 B へ（集計・関数は同一、初期表示だけの差なので移行は安い）。

## 4. 教師ビュー（同じ集計・文型軸の近似）

`app/teach/series/page.tsx` に「学習の足あと（このブラウザ）」セクションを追加:

- **同じ `calculateOperatorView`** を呼ぶ（数字が learn と教師で一致することが受け入れ基準）。
- 加えて**系列×オペレータの表**（行=履歴のある系列、列=5オペレータ、セル=`じっくり/歩いた`）。
  文型タグは教師ビューでは可視でよい（F1 は学習者側のみ）が、MVP では系列名で近似し
  文型ラベルの新設はしない。
- 注記を1行添える:「この足あとはこのブラウザの学習記録です（サーバーには送られていません）」
  ——ローカルファースト原則の明示。
- 文言は提案調（F7）。「〜が弱い」ではなく「〜をじっくり考えています」。

## 5. 実装ステップ（各ステップ独立にコミット・検証可能）

| Step | 内容 | リスク | 検証 |
|---|---|---|---|
| 1 | `buildStepOpIndex` + `calculateOperatorView` + `test:stats` にユニットテスト（§2.2 の規則 1〜5 を各1ケース以上） | 低（UI 変更なし） | `npm run test` 緑 |
| 2 | learn トップの主役交代（先生が選んだ案で）＋正答率の降格（Q2 裁定どおり） | 中 | §6 受け入れ基準 1〜5 |
| 3 | 教師ビューに同集計＋系列×オペレータ表 | 低 | §6 受け入れ基準 6 |
| 4 | 全体検証: tsc・build・`npm run test`・audit_hints.py（無関係だが退行確認）・**公開 URL（basePath 配下）で実表示確認** | — | 全緑＋スクショ |

Step 2 は先生の案選択（§7）を待ってから。Step 1 は裁定と独立に先行できる。

## 6. 受け入れ基準（行動レベル）

1. **主役交代:** learn トップで「正答率」が見出し級 Stat として表示されない
   （Q2=残す裁定なら「くわしく」内のみ・消す裁定なら完全に消える）。
2. **オペレータの地図:** 既知のフィクスチャ localStorage 状態（テストと同データ）で、
   5オペレータの数字が期待値どおり表示され、focusOp の診断文が最大 deepThought の
   オペレータを名指しする。
3. **国語境界:** 国語（kokugo_*）だけ歩いた localStorage 状態では、数学の足あとセクションが
   出ない／数字がゼロ汚染されない（T-2 と同じ境界がこのビューでも保たれる）。
4. **旧 id 合算:** `SERIES_REDIRECTS` 対象の旧 id で保存した履歴が、新系列側に合算される。
5. **入口の除外:** step1（`variationFromPrevious: null`）の記録が5行の表に混入しない。
6. **教師=学習者の一致:** 同じブラウザ状態で、教師ビューの数字が learn トップと一致する。
7. **退行なし:** 今週/累計/歩いた系列の既存数値は従来どおり。tsc・build・全テスト緑。

## 7. 岩井先生の裁定待ち（Opus 着手前に2つ）

- **裁定1: 見せ方の案** — A / B / C（推奨 A・§3）。
- **裁定2: Q2（正答率）** — 第5弾 Open Question。推奨: **見出しから降ろして「くわしく」内に小さく残す**。
  根拠: 現使用者は大人の学習者で、粗い鏡としては益が残る。消すのはいつでもできる。
  **逆を採る条件**: 数学を子どもに出す日が来たら消す（国語のあしあとと同じ addressed 主義に揃える）。

2つとも「推奨どおり」の一言で Opus は §5 の Step 1→4 を通しで実行できる。

## 8. 非目標・触らないもの

- **国語のオペレータビュー** — 観点軸（viewpointRefs）込みの別設計。国語の G8 表示層は
  「あしあと」で完了済み。本ビューに国語を混ぜない（第6弾 T-2 の境界を守る）。
- **hintsOpened の上書き意味論** — 第6弾で「直さない」と決定済み。
- **時系列グラフ・エクスポート・ゲーミフィケーション**（つまずき解消軌跡の演出は段階7の
  内在的ゲーミフィケーションで検討。本ビューはその土台になるが先取りしない）。
- **文型タグの新設** — 教師ビューでも MVP は系列名で近似。

## 9. 実装者への注意（波及しやすい箇所）

- **依存方向:** storage.ts は types のみ import を維持。カタログ join は seriesCatalog 側
  （§2.1）。逆流させない。
- **authored 文字列:** focusSeries の系列タイトルを出すときは既存カタログと同じ描画経路
  （MathText。memory `mathtext-render-authored-text` の表参照）。オペレータ名・診断文は
  UI リテラルなので直書きでよい。
- **リンク:** focusSeries へのリンクは Next `<Link>` ＋ `seriesHref()`。素の `<a href="/...">` は
  basePath（/ruisuishiki）が付かず本番 404（2026-07-03 の教訓）。ローカル build 通過≠本番 OK、
  公開 URL で実確認。
- **hydration:** 現行の hasHydrated ゲート踏襲。SSR では出さない。
- 本設計書はコードを静的に読んで書いた。着手時に §1 の診断（特に教師ビューが履歴を
  読んでいないこと・`isLearningTopStatsSeries` の現名）を現物コードで裏取りしてから始めること。

## 10. Opus 起動プロンプト（3ヶ月メモ §4 形式・コピペ用）

```
memory ruisuishiki-core-principles と session-start-audit を読んでから、
ruisuishiki/docs/design_t5_operator_view_fable_2026-07-04.md（T-5 見せ方設計・Fable 作成）を実行して。
私の裁定：見せ方=[A/B/C]、Q2=[小さく残す/消す]。
§5 の Step 1〜4 の順で、各 Step ごとにコミット可能な差分を見せて。コミットは私が判断する。
受け入れ基準は §6。§2.2 の集計規則 1〜5 は test:stats のユニットテストで固定して。
設計書に無い設計判断が必要になったら、進めずに選択肢を提示して止まって。
```
