"""問題場面と束縛から、子ども向けの問題文を生成する。"""

from __future__ import annotations

from anthropic import Anthropic

from ..config import Settings
from ..models import Material, Pattern

_QUESTION_PROMPT = """\
あなたは小学5年生向けの算数の問題文を仕上げる助手です。

## 文型
{natural_language}（解式: {formula_template}）

## 場面
{scene_description}

## 既知の値
{known_values}

## 求めるもの
{unknown_var_name}（{unknown_role}）

## 厳守ルール
1. 1〜3文の短い問題文にする
2. 「〜はいくらでしょう？」「〜は何ですか？」など、問いかけの文末で終える
3. 数値は半角アラビア数字で、単位を必ず添える
4. 解説・公式・式・答えは絶対に書かない（学習者が考える余地を残す）
5. 出力は問題文だけ。前置き・解説・引用符を含めない
"""


def to_question_text(
    pattern: Pattern,
    material: Material,
    settings: Settings | None = None,
) -> str:
    """場面と束縛から問題文を生成する。"""
    settings = settings or Settings.from_env()
    client = Anthropic(api_key=settings.anthropic_api_key)

    known_lines = []
    unknown_var = None
    binding_map = {b.variable_name: b for b in material.bindings}
    for v in pattern.variables:
        if v.unknown:
            unknown_var = v
            continue
        b = binding_map.get(v.name)
        if b is None:
            continue
        unit = f" {b.display_unit}" if b.display_unit else ""
        known_lines.append(f"- {v.name}（{v.role.value}）: {b.value}{unit}")

    if unknown_var is None:
        raise ValueError(f"未知数が見つからない: pattern={pattern.id}")

    prompt = _QUESTION_PROMPT.format(
        natural_language=pattern.natural_language,
        formula_template=pattern.formula_template,
        scene_description=material.scene_description,
        known_values="\n".join(known_lines),
        unknown_var_name=unknown_var.name,
        unknown_role=unknown_var.role.value,
    )

    response = client.messages.create(
        model=settings.anthropic_model,
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text.strip()  # type: ignore[union-attr]
