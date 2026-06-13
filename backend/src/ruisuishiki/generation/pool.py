"""材料プールからの読み込み（mock モード）。

手動キュレーションされた材料プール JSON ファイルを読み込み、
LLM の `generate_materials` と互換のリストを返す。

開発フェーズの 1+3 ハイブリッド戦略の中核。
"""

from __future__ import annotations

import json
from enum import Enum
from pathlib import Path
from random import Random

from ..models import ContextCategory, Material, VariableBinding


class GenerationMode(str, Enum):
    MOCK = "mock"
    LIVE = "live"


_POOL_ROOT = Path(__file__).resolve().parents[3] / "data" / "material_pools"


def _pool_path(pattern_id: str, context_category: ContextCategory) -> Path:
    """単元・文型・文脈から JSON ファイルパスを決める。"""
    # 単元は pattern オブジェクトから引きたいが、ここでは ratio_5th 固定
    # （MVP では1単元なのでこれで足りる。複数単元時に拡張）
    return _POOL_ROOT / f"ratio_5th_{pattern_id}_{context_category.value}.json"


def load_from_pool(
    pattern_id: str,
    context_category: ContextCategory,
    count: int = 5,
    seed: int | None = None,
) -> list[Material]:
    """材料プール JSON から count 個の Material を選ぶ。

    seed を指定するとランダム抽出が決定的になる（テストで使う）。
    プールの数が count より少なければ、ある分だけ返す（エラーにしない）。
    """
    path = _pool_path(pattern_id, context_category)
    if not path.exists():
        raise FileNotFoundError(
            f"材料プールが存在しない: {path}\n"
            f"半手動戦略の方法1で Claude Code と対話して "
            f"このファイルを作ってください。"
        )

    data = json.loads(path.read_text(encoding="utf-8"))
    candidates = data.get("candidates", [])
    if not candidates:
        raise ValueError(f"材料プールが空: {path}")

    rng = Random(seed)
    selected = rng.sample(candidates, k=min(count, len(candidates)))

    materials: list[Material] = []
    for i, cand in enumerate(selected):
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
                id=f"{pattern_id}_pool_{i+1:02d}",
                pattern_id=pattern_id,
                context_category=context_category,
                scene_description=cand.get("scene", ""),
                bindings=bindings,
            )
        )
    return materials
