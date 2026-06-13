"""割合（小学5年）の文型カタログ。

第3弾§3.2 の MVP最小セット（P1〜P5）。MVPはP1から実装。
"""

from ..models import NumberDomain, NumberKind, Pattern, Variable, VariableRole

UNIT = "ratio_5th"


P1_BASIC = Pattern(
    id="P1",
    unit=UNIT,
    natural_language="比較量を求める（もとにする量と割合から、比較量を計算する）",
    formula_template="B = A * p",
    variables=[
        Variable(
            name="A",
            role=VariableRole.BASE_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=10, max=1000, step=10),
            unknown=False,
        ),
        Variable(
            name="p",
            role=VariableRole.RATIO,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0.1, max=2.0, step=0.1),
            unknown=False,
        ),
        Variable(
            name="B",
            role=VariableRole.COMPARED_QUANTITY,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0, max=2000),
            unknown=True,
        ),
    ],
    difficulty_tier=1,
    textbook_alignment=["小5_割合_第1次"],
)


P2_FIND_RATIO = Pattern(
    id="P2",
    unit=UNIT,
    natural_language="割合を求める（もとにする量と比較量から、割合を計算する）",
    formula_template="p = B / A",
    variables=[
        Variable(
            name="A",
            role=VariableRole.BASE_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=10, max=1000, step=10),
            unknown=False,
        ),
        Variable(
            name="B",
            role=VariableRole.COMPARED_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=1, max=2000, step=1),
            unknown=False,
        ),
        Variable(
            name="p",
            role=VariableRole.RATIO,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0.0, max=2.0),
            unknown=True,
        ),
    ],
    difficulty_tier=1,
    textbook_alignment=["小5_割合_第2次"],
)


P3_FIND_BASE = Pattern(
    id="P3",
    unit=UNIT,
    natural_language="もとにする量を求める（比較量と割合から、もとにする量を計算する）",
    formula_template="A = B / p",
    variables=[
        Variable(
            name="B",
            role=VariableRole.COMPARED_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=1, max=2000, step=1),
            unknown=False,
        ),
        Variable(
            name="p",
            role=VariableRole.RATIO,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0.1, max=2.0, step=0.1),
            unknown=False,
        ),
        Variable(
            name="A",
            role=VariableRole.BASE_QUANTITY,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0, max=10000),
            unknown=True,
        ),
    ],
    difficulty_tier=2,
    textbook_alignment=["小5_割合_第3次"],
)


P4_INCREASE_DECREASE = Pattern(
    id="P4",
    unit=UNIT,
    natural_language="増量・減量（もとにする量に対し1±割合の倍率を適用した比較量）",
    formula_template="B = A * (1 + delta)",
    variables=[
        Variable(
            name="A",
            role=VariableRole.BASE_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=10, max=1000, step=10),
            unknown=False,
        ),
        Variable(
            name="delta",
            role=VariableRole.ADDED_CONDITION,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=-0.5, max=0.5, step=0.05),
            unknown=False,
        ),
        Variable(
            name="B",
            role=VariableRole.COMPARED_QUANTITY,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0, max=2000),
            unknown=True,
        ),
    ],
    difficulty_tier=2,
    textbook_alignment=["小5_割合_発展"],
)


P5_SEQUENTIAL_CHANGE = Pattern(
    id="P5",
    unit=UNIT,
    natural_language="連続変化（2回の倍率変化を順次適用）",
    formula_template="B = A * (1 + d1) * (1 + d2)",
    variables=[
        Variable(
            name="A",
            role=VariableRole.BASE_QUANTITY,
            domain=NumberDomain(kind=NumberKind.INTEGER, min=100, max=10000, step=100),
            unknown=False,
        ),
        Variable(
            name="d1",
            role=VariableRole.ADDED_CONDITION,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=-0.3, max=0.3, step=0.05),
            unknown=False,
        ),
        Variable(
            name="d2",
            role=VariableRole.ADDED_CONDITION,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=-0.3, max=0.3, step=0.05),
            unknown=False,
        ),
        Variable(
            name="B",
            role=VariableRole.COMPARED_QUANTITY,
            domain=NumberDomain(kind=NumberKind.DECIMAL, min=0, max=20000),
            unknown=True,
        ),
    ],
    difficulty_tier=3,
    textbook_alignment=["小5_割合_発展"],
)


PATTERNS_RATIO_5TH: list[Pattern] = [
    P1_BASIC,
    P2_FIND_RATIO,
    P3_FIND_BASE,
    P4_INCREASE_DECREASE,
    P5_SEQUENTIAL_CHANGE,
]
