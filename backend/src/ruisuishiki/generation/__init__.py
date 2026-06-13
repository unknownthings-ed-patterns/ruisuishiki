"""生成パイプライン（材料生成・自然言語化）。

LLM は数値計算をしない——材料候補と自然言語化のみを担う。
解の確定と検証は verification モジュール（SymPy）が行う。

生成のモード：
- mock モード（既定）：手動キュレーションされた材料プール JSON から読む
- live モード：Anthropic API を呼ぶ
"""

from .material import generate_materials
from .pool import GenerationMode, load_from_pool
from .question_text import to_question_text

__all__ = [
    "GenerationMode",
    "generate_materials",
    "load_from_pool",
    "to_question_text",
]
