"""文型のカタログ。

各単元ファイルが Pattern インスタンスをエクスポートする。
"""

from .ratio_5th import PATTERNS_RATIO_5TH

ALL_PATTERNS = {p.id: p for p in PATTERNS_RATIO_5TH}


def get_pattern(pattern_id: str):
    """文型IDから Pattern を取得。"""
    if pattern_id not in ALL_PATTERNS:
        raise KeyError(
            f"未登録の文型: {pattern_id}（登録済み: {list(ALL_PATTERNS.keys())}）"
        )
    return ALL_PATTERNS[pattern_id]
