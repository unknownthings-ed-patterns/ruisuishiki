"""文型カタログの最小テスト。"""

from __future__ import annotations

import pytest

from ruisuishiki.patterns import ALL_PATTERNS, get_pattern


def test_all_patterns_have_unique_ids() -> None:
    """文型IDが重複していないこと。"""
    ids = list(ALL_PATTERNS.keys())
    assert len(ids) == len(set(ids))


def test_each_pattern_has_exactly_one_unknown() -> None:
    """各文型に未知数がちょうど1つあること（推理式の前提）。"""
    for p in ALL_PATTERNS.values():
        unknowns = [v for v in p.variables if v.unknown]
        assert len(unknowns) == 1, f"文型 {p.id} の未知数が {len(unknowns)} 個"


def test_get_pattern_returns_correct_pattern() -> None:
    p = get_pattern("P1")
    assert p.id == "P1"
    assert p.formula_template == "B = A * p"


def test_get_pattern_raises_on_unknown_id() -> None:
    with pytest.raises(KeyError):
        get_pattern("PXX")
