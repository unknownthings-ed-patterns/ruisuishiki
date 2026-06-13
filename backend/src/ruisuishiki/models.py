"""データモデル（第3弾仕様書§5の Python 翻訳）。

戸田・桝田の用語体系（材料・関係・条件・解式・文型）をそのまま型として保持する。
コードと第3弾文書の対応関係は CLAUDE.md のドメイン用語表参照。
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field


class NumberKind(str, Enum):
    """数値の種類（変数値域の制約に使う）。"""

    INTEGER = "integer"
    DECIMAL = "decimal"
    FRACTION = "fraction"
    PERCENT = "percent"


class NumberDomain(BaseModel):
    """変数の値域制約。"""

    kind: NumberKind
    min: float | None = None
    max: float | None = None
    step: float | None = None


class VariableRole(str, Enum):
    """変数の意味的役割（推理式指導の語彙）。"""

    BASE_QUANTITY = "もとにする量"
    COMPARED_QUANTITY = "比較量"
    RATIO = "割合"
    ADDED_CONDITION = "条件付加"


class Variable(BaseModel):
    """解式に登場する変数。"""

    name: str = Field(description="記号名（例: 'A', 'B', 'p'）")
    role: VariableRole
    domain: NumberDomain
    unknown: bool = Field(description="この問題で未知数（求めるもの）か")


class Pattern(BaseModel):
    """文型——問題の構造そのもの。

    戸田の「文型が等しい問題は解式が等しい」原則の Python 表現。
    """

    id: str = Field(description="'P1', 'P2'... 単元内の通し番号")
    unit: str = Field(description="単元ID（例: 'ratio_5th'）")
    natural_language: str = Field(description="日本語による文型の記述")
    formula_template: str = Field(
        description="解式（SymPy が解釈できる式。例: 'B = A * p'）"
    )
    variables: list[Variable]
    difficulty_tier: Literal[1, 2, 3] = Field(
        description="その一・その二・その三（戸田の3部構成）"
    )
    textbook_alignment: list[str] = Field(default_factory=list)


class ContextCategory(str, Enum):
    """場面の文脈カテゴリ（材料の自然さを評価する軸）。"""

    SHOPPING = "shopping"
    FOOD = "food"
    AREA = "area"
    PEOPLE = "people"
    TIME = "time"
    LENGTH = "length"
    ABSTRACT = "abstract"


class VariableBinding(BaseModel):
    """変数への具体的な値の割り当て。"""

    variable_name: str
    value: int | float | str
    display_unit: str | None = Field(default=None, description="表示単位（'円', '人' 等）")


class Material(BaseModel):
    """材料・文脈——文型のスロットに入る具体値と場面。"""

    id: str
    pattern_id: str
    context_category: ContextCategory
    scene_description: str = Field(description="場面の自然言語記述")
    bindings: list[VariableBinding]
    cultural_tags: list[str] = Field(default_factory=list)


# --- 変化オペレータ（桝田の5系統。第1弾§5.2） ---

class OpSame(BaseModel):
    """同——同じ文型で材料置換のみ。確認の喜び。"""

    type: Literal["SAME"] = "SAME"
    changes: list[Literal["material", "numbers"]] = Field(default_factory=lambda: ["numbers"])


class OpInverse(BaseModel):
    """逆——未知数の位置を交換（P1→P2、P1→P3 など）。"""

    type: Literal["INVERSE"] = "INVERSE"
    from_pattern: str
    to_pattern: str


class OpPlusAlpha(BaseModel):
    """＋α——条件を一つ追加。"""

    type: Literal["PLUS_ALPHA"] = "PLUS_ALPHA"
    added_condition: str


class OpQualitative(BaseModel):
    """質的変化——場面の表層を入れ替えつつ構造は保存。

    桝田が「喜びのグレードアップ」と呼んだ、系列後半の山。
    """

    type: Literal["QUALITATIVE"] = "QUALITATIVE"
    new_context_category: ContextCategory
    structure_preserved: Literal[True] = True


class OpComposite(BaseModel):
    """複合——複数オペレータの組み合わせ。"""

    type: Literal["COMPOSITE"] = "COMPOSITE"
    ops: list["VariationOperator"]


VariationOperator = Annotated[
    OpSame | OpInverse | OpPlusAlpha | OpQualitative | OpComposite,
    Field(discriminator="type"),
]

OpComposite.model_rebuild()


# --- 検証ログ ---


class VerificationLog(BaseModel):
    """生成時の整合性検証ログ（第2弾失敗モード F2 の予防）。"""

    uniqueness_check: bool = Field(description="解が一意か")
    domain_check: bool = Field(description="値域整合性")
    cultural_check: bool | None = Field(
        default=None, description="場面の自然さ（教師レビューで埋まる）"
    )
    sympy_output: str | None = None
    failure_reason: str | None = None


class ProblemSource(str, Enum):
    GENERATED = "generated"
    TEACHER_EDITED = "teacher_edited"
    CHILD_CREATED = "child_created"


class Problem(BaseModel):
    """問題＝(Pattern, Material) のインスタンス。"""

    id: str
    pattern_id: str
    material_id: str
    question_text: str = Field(description="子ども向け問題文")
    answer: int | float | str = Field(description="正答（SymPyで確定）")
    answer_explanation: str | None = Field(
        default=None,
        description="worked example（フェードイン解説3層の第3層用）",
    )
    verification_log: VerificationLog
    source: ProblemSource = ProblemSource.GENERATED


# --- 系列とヒント（フェードイン解説3層、第2弾§4.3） ---


class HintLayerNumber(int, Enum):
    POINTING = 1  # 比較指さし
    FOCUS = 2  # 着目促し
    WORKED_EXAMPLE = 3  # 解説（最終手段）


class HintLayer(BaseModel):
    """フェードイン解説の1層。"""

    layer: HintLayerNumber
    trigger: Literal["first_request", "second_request", "third_request"]
    content: str


class StepPurpose(str, Enum):
    BASIC_FORM = "basic_form"
    CONFIRMATION = "confirmation"
    VARIATION = "variation"
    QUALITATIVE = "qualitative"
    FREE_CREATION = "free_creation"


class SeriesStep(BaseModel):
    """系列の1ステップ。"""

    position: int
    problem_id: str
    variation_from_previous: VariationOperator | None = Field(
        default=None,
        description="前題からの差分（基本原形＝先頭ステップは None）",
    )
    intended_purpose: StepPurpose
    hint_layers: list[HintLayer] = Field(default_factory=list)


class Series(BaseModel):
    """系列——配列された問題の列。教師が編成、AIが提案。"""

    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    teacher_id: str | None = None
    unit: str
    steps: list[SeriesStep]
    published_at: datetime | None = None
