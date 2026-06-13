# 段階1 CLIによる問題生成パイプライン（2026-06-14完了）

第3弾§10.2 段階1「**CLIで整合性検証済みの問題5問が JSON で出力される**」を達成。

## 完了したこと

- [x] Pydantic データモデル（Pattern, Variable, Material, Problem, VariationOperator5種, Series, HintLayer, VerificationLog）
- [x] 文型カタログ P1〜P5（割合・小5）
- [x] SymPy による解式適用・一意性検証・値域チェック
- [x] mock モード：材料プール JSON から読み込み
- [x] live モード：Anthropic API による材料生成（実装済み・課金時に使う）
- [x] Typer CLI：`ruisuishiki patterns` / `generate` / `verify`
- [x] 14テスト全パス（patterns / verification / pool）
- [x] CLAUDE.md に開発フェーズ・運用フェーズの課金モデルを明記

## 検証済みの動作

```bash
# 文型一覧
ruisuishiki patterns

# mock モードで問題5問生成（API課金不要）
ruisuishiki generate --pattern P1 --context shopping --count 5 --seed 42

# JSON ファイルに保存
ruisuishiki generate --pattern P1 -o problems.json

# 単体の検証（デバッグ用）
ruisuishiki verify P1 '{"A":200,"p":0.7}'
```

出力例（抜粋）：
```json
{
  "id": "prob_f903d56c",
  "pattern_id": "P1",
  "question_text": "1個150円のシュークリームが、3割引で売られています。 比較量はいくらでしょう？",
  "answer": "105",
  "verification_log": {
    "uniqueness_check": true,
    "domain_check": true,
    "sympy_output": "B = 105 (from Eq(B, 105))"
  }
}
```

## 実装方針の決定（開発フェーズ）

- **1+3ハイブリッド戦略**を採用——API課金なしで進める
- 材料プール JSON は **Claude Code との対話で手動キュレーション**
- `backend/data/material_pools/` に配置（現状 P1×shopping のみ）
- 将来 API課金時は `--mode live` で同じインターフェースから切り替え可能

## 失敗モード予防の実装状況

| 失敗モード | 段階1での対処 |
|---|---|
| F1 文型タグの早すぎる開示 | 段階2のUI設計時に実装 |
| F2 生成問題の解の不一意・整合性破綻 | **SymPy検証で完全実装**（test_verification.py） |
| F8 履歴が「正答率」に堕ちる | データモデルに pattern_id を一級市民として保持済み |

## 次の段階

段階2: 教師ビュー（系列設計＋プレビュー）——Next.js + 静的 export 構成で着手。
BYOK 入力欄を実装し、教師は自分の Anthropic API キーで `--mode live` 相当の生成ができるようにする。
