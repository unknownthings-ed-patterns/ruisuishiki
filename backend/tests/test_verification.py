"""SymPy検証の最小テスト。"""

from __future__ import annotations

import pytest

from ruisuishiki.models import VariableBinding
from ruisuishiki.patterns import get_pattern
from ruisuishiki.verification import VerificationFailure, evaluate, verify_problem


def test_p1_basic_evaluation() -> None:
    """P1: B = A * p, A=200, p=0.7 → B=140"""
    p1 = get_pattern("P1")
    bindings = [
        VariableBinding(variable_name="A", value=200),
        VariableBinding(variable_name="p", value=0.7),
    ]
    result = evaluate(p1, bindings)
    assert result.unknown_name == "B"
    assert float(result.answer) == 140.0
    assert result.is_unique
    assert result.is_finite_real


def test_p2_returns_fraction_as_rational() -> None:
    """P2: p = B / A, A=200, B=140 → p=7/10（分数のまま）"""
    p2 = get_pattern("P2")
    bindings = [
        VariableBinding(variable_name="A", value=200),
        VariableBinding(variable_name="B", value=140),
    ]
    result = evaluate(p2, bindings)
    assert float(result.answer) == 0.7
    # 厳密な分数として保持されている（浮動小数誤差なし）
    assert str(result.answer) == "7/10"


def test_p3_inverse_problem() -> None:
    """P3: A = B / p, B=210, p=0.7 → A=300"""
    p3 = get_pattern("P3")
    bindings = [
        VariableBinding(variable_name="B", value=210),
        VariableBinding(variable_name="p", value=0.7),
    ]
    result = evaluate(p3, bindings)
    assert float(result.answer) == 300.0


def test_value_out_of_domain_is_detected() -> None:
    """値域外の解は VerificationFailure。"""
    p1 = get_pattern("P1")
    bindings = [
        VariableBinding(variable_name="A", value=999),
        VariableBinding(variable_name="p", value=10.0),  # B=9990 は P1 の B 値域 [0, 2000] 外
    ]
    with pytest.raises(VerificationFailure, match="値域上限"):
        evaluate(p1, bindings)


def test_p5_sequential_change() -> None:
    """P5: B = A * (1+d1) * (1+d2), A=1000, d1=0.1, d2=-0.1 → B=990"""
    p5 = get_pattern("P5")
    bindings = [
        VariableBinding(variable_name="A", value=1000),
        VariableBinding(variable_name="d1", value=0.1),
        VariableBinding(variable_name="d2", value=-0.1),
    ]
    result = evaluate(p5, bindings)
    assert float(result.answer) == 990.0


def test_verify_problem_returns_log() -> None:
    """verify_problem は (result, log) を返し、log に SymPy出力が入る。"""
    p1 = get_pattern("P1")
    bindings = [
        VariableBinding(variable_name="A", value=300),
        VariableBinding(variable_name="p", value=0.5),
    ]
    result, log = verify_problem(p1, bindings)
    assert log.uniqueness_check
    assert log.domain_check
    assert "B = 150" in log.sympy_output


def test_missing_binding_raises() -> None:
    """既知変数の値が bindings にない場合は失敗。"""
    p1 = get_pattern("P1")
    bindings = [VariableBinding(variable_name="A", value=200)]  # p が抜けている
    with pytest.raises(VerificationFailure, match="既知変数 p"):
        evaluate(p1, bindings)
