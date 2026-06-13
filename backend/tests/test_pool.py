"""材料プール（mock モード）の最小テスト。"""

from __future__ import annotations

from ruisuishiki.generation import load_from_pool
from ruisuishiki.models import ContextCategory


def test_load_p1_shopping_pool_returns_materials() -> None:
    materials = load_from_pool("P1", ContextCategory.SHOPPING, count=5, seed=42)
    assert len(materials) == 5
    for m in materials:
        assert m.pattern_id == "P1"
        assert m.context_category == ContextCategory.SHOPPING
        assert m.scene_description  # 空でないこと
        bound_names = {b.variable_name for b in m.bindings}
        assert "A" in bound_names
        assert "p" in bound_names


def test_seed_makes_selection_deterministic() -> None:
    """seed を固定すると同じ順序で返る。"""
    a = load_from_pool("P1", ContextCategory.SHOPPING, count=5, seed=123)
    b = load_from_pool("P1", ContextCategory.SHOPPING, count=5, seed=123)
    assert [m.scene_description for m in a] == [m.scene_description for m in b]


def test_count_larger_than_pool_returns_all() -> None:
    """count がプールサイズより大きくてもエラーにせず、ある分だけ返す。"""
    materials = load_from_pool("P1", ContextCategory.SHOPPING, count=100, seed=0)
    assert 1 <= len(materials) <= 100
