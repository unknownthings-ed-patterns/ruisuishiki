# ruisuishiki

戸田城外『推理式指導算術』（1930）の方法論を、AI時代の算数・数学学習プラットホームとして実装するプロジェクト。

最終ゴールは、子どもも大人も学べ、教師も大人も自分で教材を生み出せる**世界最高峰の算数・数学教育プラットホーム**。

「同じエンジンの二つのインターフェース」——教師ビュー（教材生成）と学習者ビュー（AIドリル・自己教育）が同一の生成系から派生する。

## ビジョン声明

- **無料**で公開する——ビジネスモデルや価格競争を超えて、誰でも触れられること自体を価値とする
- **GitHub Pages で公開**——インフラ依存を最小化し、メンテナンスが続く限り誰でもアクセスできる
- **デザイン・UI/UX も世界最高を目指す**——機能だけでなく、触れた瞬間の体験そのものを設計する
- **文理を問わず、入口を狭めない**——文系の大人、苦手意識のある子ども、得意な子・先取りしたい子、誰でも入れる
- **陳腐にならない**——既製のドリル・解説サイトとは違う、戸田の推理式設計を貫いた天下無双の質
- **初心者に入りやすく、それでいて陳腐でない**——ローフロア（誰でも入れる）と高い天井（数学者まで使える）を両立する

算数・数学教育に特化した、世界に1つだけの**天下無双の教育プラットホーム**を目指す。

## 中核テーゼ

戸田が紙の参考書に焼き込んだ「比較を基盤とする近転移エンジン」を、文型スキーマと5つの変化オペレータからなる制約付き生成系として取り出す。

- **文型（Pattern）**：問題の構造（材料・関係・条件・解式の配列）
- **変化オペレータ**：{同, 逆, ＋α, 質的変化, 複合}
- **比較を指さすAI**：解説を与えず「前題と比較せよ」とだけ指す——これがこの設計の最も模倣されにくい中核

## 設計の元になった文書

正本は Obsidian Vault `教育のパタン・ランゲージ/個人/` にある。公開版の写しが `docs/theory/`（と `frontend/public/theory/`）にある：

1. 第1弾 統合理論 — `docs/theory/01-統合理論.md`
2. 第2弾 批判的検討（修正版テーゼ・失敗モード F1〜F10） — `docs/theory/02-批判的検討.md`
3. 第3弾 MVP 仕様書 — `docs/theory/03-MVP仕様書.md`
4. 国語版（推理式指導読方）の 3 文書 — `docs/theory/04`〜`06`

これらが設計仕様で、コードと食い違えば文書が正。実装の判断軸・コミット前のチェックリストは **`CLAUDE.md`**、射程（小1→大学数学の縦の鎖）は **`docs/VISION.md`** にある。

## 構成

```
ruisuishiki/
├── README.md           ← このファイル
├── CLAUDE.md           ← 実装の判断軸・お手本条件・コミット前チェック（AGENTS.md はこれへのリンク）
├── frontend/           ← 学習者ビュー・教師ビュー（Next.js static export → GitHub Pages）
│   ├── src/lib/        ← 教材データ（series*.ts・glossary.ts・mentorTexts.ts）と判定エンジン
│   ├── src/components/ ← MathText / MathBody（数式・用語リンク・図）
│   └── src/app/        ← /learn（学ぶ）・/learn/play・/learn/haiku・/teach（教える）
├── backend/            ← Python（SymPy による解の一意性検証・問題生成 CLI）
├── scripts/            ← 教材の監査ツール（audit_hints.py ほか・報告専用）
└── docs/               ← 単元ごとの背骨（設計書）・品質基準・監査記録
```

## 開発状況

- 学習者ビューは GitHub Pages で公開中（`main` への push で自動デプロイ）
- 数学：小5〜高校数学Ⅲ・C、大学への橋（圏論）まで約 290 系列。国語：俳句・詩・物語・日記・随筆の 23 系列
- 単元ごとの進捗と設計判断は `docs/*_design.md`・`docs/*背骨_kokugo.md` に記録

## 開発のコマンド

```bash
cd frontend
npm ci
npm run dev            # 開発サーバー（http://localhost:3000）
npx tsc --noEmit       # 型チェック
npm run lint           # ESLint
npm test               # 判定エンジン・音数・統計・教材データ整合性のテスト
npm run build          # static export（out/）。本番は NODE_ENV=production で /ruisuishiki/ 配下

cd ..
python3 scripts/audit_hints.py         # ヒント 3 層の「比較の指さし」とオペレータ網羅（報告専用）
python3 scripts/audit_hints_kokugo.py  # 国語版
python3 scripts/audit_cross_refs.py    # 答えの先出し・系列間の重複など「二か所の関係」（報告専用）

cd backend && pip install -e ".[dev]" && pytest
```

## 技術スタック

- **Frontend**: Next.js（App Router・static export）/ React / Tailwind CSS / KaTeX
- **判定**：ブラウザ内の数式評価器（`frontend/src/lib/answerEval.ts`。`eval` は使わない）
- **Backend**: Python 3.11+ / SymPy（解の一意性の検証）/ Anthropic SDK（教師の生成時のみ・BYOK）
- **学習履歴**：ブラウザの localStorage のみ（運営サーバーに送らない）

## ライセンス

- コード：MIT（`LICENSE`）
- 理論文書（`docs/theory/`・`frontend/public/theory/`）：CC BY-SA 4.0（`LICENSE-THEORY`）
