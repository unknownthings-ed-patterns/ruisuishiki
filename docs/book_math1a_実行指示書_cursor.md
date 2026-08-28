# 数学実践本『数ⅠA』実行指示書（Cursor用・2026-08-29 Fable発行）

対＝ `docs/book_math1a_設計メモ_2026-08-29.md`（先に読む）。この指示書は **Cursor（Fable/Opus/Grok/Composer）だけで冷間スタートできる**ことを目的に書かれている。Claude Code の memory はCursorから読めない——この2文書と repo の CLAUDE.md・quality_bar が正。

## 使い方

- 各フェーズの「起動プロンプト」を新しいチャット（Agent）にコピペして使う。**1チャット=1フェーズ（または1単元）**。長い会話を引きずらない。
- モデルの割り当て：**Fable＝設計・裁定リスト・検収補助・監査の統括**／**Opus＝実装・章生成・監査の各面・修正適用**／**Grok＝横断監査（別モデルの目。feedback: メインは自分の基準の外が見えない）**／**Composer＝微修正・機械的な一括置換**。
- 岩井の役割：フェーズ間の裁定・見本章と各単元の検収・監査報告の受け渡し。**検収で「おかしい」と感じたことは必ず言語化して裁定リストに載せる**（国語本の実測：決定的な改善の多くは先生の通読から出た）。

## 鉄の規律（全フェーズ共通）

1. **教材の正は ts**（frontend/src/lib/series*.ts・seriesCatalog.ts）。本づくりで教材の欠陥を見つけたら **ts を先に直す**→機械検査→commit/push→デプロイ確認（gh run list）→本を再生成。本側だけ直して ts と乖離させない。
2. 機械検査（ts を触ったら必ず）：`python3 scripts/audit_hints.py`（数学系列・⚠ゼロ）／`cd frontend && npx tsc --noEmit`／`npm run build`。
3. ヒント3層の規律（CLAUDE.md）：L1=比較の指さしのみ／L2=差異1つ（解法・答え禁止）／L3=完全worked example。書き換え時も崩さない。
4. commit は作業単位で・メッセージに何を直したかを明示。並行作業がある場合は**ファイル単位のgit addで巻き込まない**（hunk確認）。
5. 本の作業ディレクトリはローカル `~/book-math1a/`（git init・非公開・iCloud回避）。構成は国語本を踏襲：`01_design/ 03_generated/ 03_integrated/ 04_audit/ 06_export/`。
6. 「できた」と言う前に検査を回す。**ビルド成功と実機で読めることは別**（見本章でKindle実機を一度通す）。

---

## P0　章立て確定【Fable・半日】

起動プロンプト：
> docs/book_math1a_設計メモ_2026-08-29.md と frontend/src/lib/seriesCatalog.ts を読み、『数ⅠA』に収録する部（単元）と章（系列）の一覧を、カタログの順序のまま確定してください。出力＝`~/book-math1a/01_design/章立て_v0.1.md`（部見出し・系列ID・系列title・章数の集計）。数Ⅱ・数Ⅲ・大学数学・算数系列は除外。判断に迷う系列（橋渡し系列など）は「裁定待ち」欄に分けて岩井に提示。

## P1　章生成器＋機械検査【Opus・1〜2日＝最大の山】

起動プロンプト：
> `~/book-math1a/tools/generate_book_chapters_math.py` を新規実装してください。参考実装＝（vault）個人/book-kokugo/tools/generate_book_chapters.py（国語版）。仕様：
> (1) P0の章立てに従い、series ts から章骨格Markdownを1系列1ファイルで `03_generated/` に出力。
> (2) 各章＝中心の問い→歩（step順・見出しは「## 歩（stepN）」形式で機械変換可能に）→問題文→＊区切り→ヒント1/2/3→（あれば）derivation→出典。
> (3) 変換規則：`[用語]`→素文字化／`$...$`はそのまま保持（pandoc math）／figureMarkerは`【図版: マーカー名】`プレースホルダ／入力UI文言（「入力してください」「判定」等）は「求めよう」等へ機械置換し、置換できない文は`【TODO:語り】`を残す。
> (4) choice型は選択肢をア/イ/ウで出力。並べ替え型は**正順を出力しない**（国語本の実測バグ：生成器が答えの順で印字していた）。
> (5) 同時に機械検査 `check_math_book.py` を実装：$の対応・数式内の日本語（cjk_math_filter対象の検出）・`step`表記の残り・UI語の残り・【TODO】残数を集計。
> 完成したら1単元ぶん生成して検査結果を報告。

## P2　図版エクスポート機構【Opus・半日〜1日】

起動プロンプト：
> サイトに図版エクスポート用の開発ページを新設してください（例：`/figure-export?marker=<名前>`。本番ビルドに含めるかは岩井裁定・含めない場合はdevサーバ専用でよい）。既存のfigureMarker（Math.tsx のマーカー群）を単体で白背景に描画するルート＋Chrome headless（--force-device-scale-factor=2）で撮影し PILで白トリム＋細枠を付けるスクリプト `~/book-math1a/tools/capture_figures.py` を実装（参考＝個人/book-kokugo/06_export/make_figures.py）。P0章立てに出てくる全マーカーの一覧を生成し、一括撮影→`06_export/figures/`。**図が答えを書いていないか**は撮影後にサムネイル一覧で岩井が目視検収。

## P3　見本章2本→型の凍結【Opus執筆・Fable検収補助・岩井裁定】

起動プロンプト（執筆）：
> `03_generated/` の見本2章（推奨：数と式の第1系列＝入口と、2次関数の質的変化が濃い1系列）の【TODO:語り】を埋め、組み立てスクリプト `06_export/assemble_math1a.py`（横書き・部見出し・章H2化）と `build_math1a.sh`（pandoc epub3 --mathml → cjk_math_filter.py → check_epub.py。HTMLも並出）を実装して、見本EPUB+HTMLを出してください。cjk_math_filter.py は（vault）個人/book-vol1/06_export/ からコピー。語りは無口版＝最小限（問題・ヒント・derivationはすでに読者向けの文章。足すのは接続の一文程度）。

→ 岩井が実機（Kindle/Apple Books）込みで検収。**ここで型（章の器・数式表示・図版・語りの量）を凍結**してから量産に入る。国語本の教訓：型の凍結前に量産しない。

## P4　量産【Opus・単元ごと・Grok/Composerで微修正】

起動プロンプト（単元ごとに新チャット）：
> `~/book-math1a/01_design/章立て_v0.1.md` の単元「◯◯」の全章について、生成→【TODO:語り】埋め→check_math_book.py 0件→単元EPUBのプレビュー出力まで。型は見本章2本（03_generated/の確定版）を厳密に踏襲。教材・ヒントの中身は ts が正＝**一字も変えない**（欠陥を見つけたら直さずに報告リストへ）。

## P5　監査（直線化テスト）【部ごとに1面ずつ・報告のみ】

- 観点セット＝設計メモ§5の7観点。**修正はしない・全指摘に行番号と原文引用・Blocker/Major/Minor/S** の型（04_audit/ の国語本監査報告が見本）。
- 運用：部ごとに新チャットで Opus に1面。全部終わったら **Grok に横断1面**（表記ゆれ・見出し体系・前方参照・序章の約束と本文の一致）。最後に **Fable が統括**＝監査報告を突き合わせ、偽陽性を落とし、裁定リスト（判断が要るもの）と機械修正リスト（そのまま直すもの）に振り分けて岩井へ。

起動プロンプト（監査・1面）：
> あなたは書籍原稿の独立監査員です。修正はせず報告のみ。対象=`03_integrated/統合稿_vX.md` の◯行〜◯行（第◯部）。本の性質と観点は docs/book_math1a_設計メモ_2026-08-29.md §5。各指摘=「[Blocker/Major/Minor/S] 行番号 「引用」→問題→修正案」。指摘ゼロの観点は「問題なし」と明記し、最後に件数集計。

## P6　修正適用【Opus・部ごと】

> 裁定済みリストを部ごとに適用。**tsに由来する欠陥はtsを先に直して検査→push→本へミラー**。機械横断修正（UI語・表記統一）は一括スクリプト化してから適用。適用後に check_math_book.py と再ビルド。

## P7〜P8　統合・通読・凍結

- 全部統合→v0.x ビルド→岩井通読（HTMLでコピペ検収）→反映→凍結v1.0→表紙→KDP。表紙・KDP工程は国語本/既刊の前例（05_cover/・04_kdp/ の構成）を踏襲。
- **凍結時にやること**：終章の版履歴と奥付の版番号を一致させる／序章の約束と本文の実際を最終照合（国語本の監査で効いた観点）。

## Claude復帰時の接続

- このディレクトリ（~/book-math1a/）と本指示書がそのまま正。Claude側では復帰後に memory（project_ruisuishiki_math.md）へ進捗を追記する（Codex/Cursor作業後のmemory更新規律）。
- 国語本の完成版パイプラインと監査の実物は vault `個人/book-kokugo/` にすべて残っている。迷ったらそこを見る。
