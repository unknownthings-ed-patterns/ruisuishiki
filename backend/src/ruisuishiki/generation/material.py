"""材料（Material）の LLM 生成。第3弾§6.3.1 の実装。"""

from __future__ import annotations

import json

from anthropic import Anthropic

from ..config import Settings
from ..models import ContextCategory, Material, Pattern, VariableBinding

_MATERIAL_PROMPT = """\
あなたは小学5年生向けの算数文章題を作る助手です。
以下の制約で、問題場面の候補を {count} 個提案してください。

## 文型情報
- 文型: {natural_language}
- 解式: {formula_template}
- 文型ID: {pattern_id}

## 変数の意味と値域
{variables_desc}

## 場面の文脈カテゴリ
{context_category}

## 厳守ルール
1. 場面は日本の小学5年生にとって自然なものにする
2. 既知変数の値は値域内の整数または「きれいな小数」（0.1刻み）にする
3. 「ケーキ屋」「給食」「校庭」など、文脈カテゴリに合う具体物を使う
4. 未知数（求めるもの）の値は出力しない——記号計算で検証されるので不要
5. 出力は必ず JSON のみ。説明文・コードフェンス・前置きを含めない

## 出力形式（必ずこの JSON のみ）
{{
  "candidates": [
    {{
      "scene": "（場面の説明。1〜2文）",
      "bindings": {{ {binding_keys} }},
      "display_units": {{ {unit_keys} }}
    }}
  ]
}}
"""


def _format_variables_desc(pattern: Pattern) -> str:
    lines = []
    for v in pattern.variables:
        domain = v.domain
        domain_str = f"{domain.kind.value}, [{domain.min}, {domain.max}]"
        if domain.step is not None:
            domain_str += f", 刻み {domain.step}"
        marker = "（未知数：値を入れない）" if v.unknown else ""
        lines.append(f"- {v.name}（{v.role.value}）: {domain_str} {marker}")
    return "\n".join(lines)


def _binding_keys(pattern: Pattern) -> str:
    return ", ".join(
        f'"{v.name}": <数値>' for v in pattern.variables if not v.unknown
    )


def _unit_keys(pattern: Pattern) -> str:
    return ", ".join(f'"{v.name}": "<単位>"' for v in pattern.variables)


def _build_prompt(
    pattern: Pattern,
    context_category: ContextCategory,
    count: int,
) -> str:
    return _MATERIAL_PROMPT.format(
        count=count,
        natural_language=pattern.natural_language,
        formula_template=pattern.formula_template,
        pattern_id=pattern.id,
        variables_desc=_format_variables_desc(pattern),
        context_category=context_category.value,
        binding_keys=_binding_keys(pattern),
        unit_keys=_unit_keys(pattern),
    )


def _extract_json(text: str) -> dict:
    """LLM出力からJSON部分を抽出。コードフェンスがあれば剥がす。"""
    text = text.strip()
    if text.startswith("```"):
        # ```json ... ``` を想定
        lines = text.splitlines()
        # 先頭と末尾のフェンス行を除く
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines)
    return json.loads(text)


def generate_materials(
    pattern: Pattern,
    context_category: ContextCategory,
    count: int = 5,
    settings: Settings | None = None,
) -> list[Material]:
    """LLM で材料候補を count 個生成する。

    返ってきた候補をすべて Material インスタンスに変換する。
    解の整合性検証はこの段階では行わない（呼び出し側で verification を通す）。
    """
    settings = settings or Settings.from_env()
    client = Anthropic(api_key=settings.anthropic_api_key)

    prompt = _build_prompt(pattern, context_category, count)
    response = client.messages.create(
        model=settings.anthropic_model,
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}],
    )

    text = response.content[0].text  # type: ignore[union-attr]
    data = _extract_json(text)

    materials: list[Material] = []
    for i, cand in enumerate(data.get("candidates", [])):
        bindings = [
            VariableBinding(
                variable_name=name,
                value=value,
                display_unit=cand.get("display_units", {}).get(name),
            )
            for name, value in cand.get("bindings", {}).items()
        ]
        materials.append(
            Material(
                id=f"{pattern.id}_mat_{i+1:02d}",
                pattern_id=pattern.id,
                context_category=context_category,
                scene_description=cand.get("scene", ""),
                bindings=bindings,
            )
        )
    return materials
