"""SymPy による解式適用と解の一意性検証。

戸田の「答のみで自得させる」設計が成立するためには、解が一意でなければならない。
解の不一意な問題は問題プールから除外する（第2弾F2の予防）。

LLM には数値計算をさせない——LLM は文型・材料・自然言語化を担い、
解の確定と検証は記号計算で行う（第2弾§7.1）。
"""

from __future__ import annotations

from dataclasses import dataclass

import sympy as sp

from ..models import Pattern, VariableBinding, VerificationLog


class VerificationFailure(Exception):
    """整合性検証の失敗。問題プールから除外する目印。"""


@dataclass
class EvalResult:
    """解式の評価結果。"""

    unknown_name: str
    answer: float | sp.Expr  # 数値解（float）または記号
    formula_repr: str
    is_unique: bool
    is_finite_real: bool


def _parse_formula(formula_template: str) -> sp.Eq:
    """'B = A * p' のような文字列を SymPy の Eq に変換する。"""
    if "=" not in formula_template:
        raise VerificationFailure(
            f"解式に '=' が必要: {formula_template}"
        )
    lhs_str, rhs_str = (s.strip() for s in formula_template.split("=", 1))
    # 変数名を SymPy シンボルに自動変換
    return sp.Eq(sp.sympify(lhs_str), sp.sympify(rhs_str))


def evaluate(pattern: Pattern, bindings: list[VariableBinding]) -> EvalResult:
    """文型 + 材料束縛 → 未知数の解を計算する。

    解が一意でない・実数でない・無限大などの場合は VerificationFailure。
    """
    eq = _parse_formula(pattern.formula_template)
    unknown_vars = [v for v in pattern.variables if v.unknown]
    if len(unknown_vars) != 1:
        raise VerificationFailure(
            f"未知数はちょうど1つ必要（実際は {len(unknown_vars)}）"
        )
    unknown_var = unknown_vars[0]
    unknown_sym = sp.Symbol(unknown_var.name)

    # 既知変数に値を代入
    binding_map = {b.variable_name: b.value for b in bindings}
    subs = {}
    for v in pattern.variables:
        if v.unknown:
            continue
        if v.name not in binding_map:
            raise VerificationFailure(
                f"既知変数 {v.name} の値が bindings にない"
            )
        subs[sp.Symbol(v.name)] = sp.nsimplify(binding_map[v.name], rational=True)

    eq_substituted = eq.subs(subs)

    # 未知数について解く
    solutions = sp.solve(eq_substituted, unknown_sym)

    if not solutions:
        raise VerificationFailure(f"解が存在しない: {eq_substituted}")
    if len(solutions) > 1:
        raise VerificationFailure(
            f"解が一意でない（{len(solutions)} 個）: {solutions}"
        )

    answer = solutions[0]

    # 実数性・有限性チェック
    is_finite_real = answer.is_real and answer.is_finite
    if not is_finite_real:
        raise VerificationFailure(
            f"解が実数でない or 無限大: {answer}"
        )

    # 値域チェック
    domain = unknown_var.domain
    answer_float = float(answer)
    if domain.min is not None and answer_float < domain.min:
        raise VerificationFailure(
            f"解が値域下限を下回る: {answer_float} < {domain.min}"
        )
    if domain.max is not None and answer_float > domain.max:
        raise VerificationFailure(
            f"解が値域上限を上回る: {answer_float} > {domain.max}"
        )

    return EvalResult(
        unknown_name=unknown_var.name,
        answer=answer,
        formula_repr=str(eq_substituted),
        is_unique=True,
        is_finite_real=True,
    )


def verify_problem(
    pattern: Pattern,
    bindings: list[VariableBinding],
) -> tuple[EvalResult, VerificationLog]:
    """評価＋検証ログ生成。失敗時は VerificationLog の failure_reason に記録。"""
    try:
        result = evaluate(pattern, bindings)
        log = VerificationLog(
            uniqueness_check=True,
            domain_check=True,
            sympy_output=f"{result.unknown_name} = {result.answer} (from {result.formula_repr})",
        )
        return result, log
    except VerificationFailure as e:
        log = VerificationLog(
            uniqueness_check=False,
            domain_check=False,
            failure_reason=str(e),
        )
        raise VerificationFailure(str(e)) from e
