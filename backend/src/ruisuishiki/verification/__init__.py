"""数値・解式の整合性検証（第2弾失敗モード F2 の予防層）。"""

from .symbolic import VerificationFailure, evaluate, verify_problem

__all__ = ["VerificationFailure", "evaluate", "verify_problem"]
