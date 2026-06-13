"""環境変数の読み込みと設定。"""

from __future__ import annotations

import os
from pathlib import Path

from pydantic import BaseModel


def _load_env_file(path: Path) -> None:
    """.env ファイルを読み込む（python-dotenv の最小代替）。

    依存を増やさないため、自前で簡素にパースする。
    """
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


# リポジトリルートの .env を読む（CLI 実行時にも初期化される）
_REPO_ROOT = Path(__file__).resolve().parents[3]
_load_env_file(_REPO_ROOT / ".env")


class Settings(BaseModel):
    anthropic_api_key: str
    anthropic_model: str = "claude-sonnet-4-6"
    log_level: str = "INFO"

    @classmethod
    def from_env(cls) -> "Settings":
        key = os.environ.get("ANTHROPIC_API_KEY", "")
        if not key or not key.startswith("sk-ant-"):
            raise RuntimeError(
                "ANTHROPIC_API_KEY が未設定または形式不正です。"
                ".env ファイルを確認してください。"
            )
        return cls(
            anthropic_api_key=key,
            anthropic_model=os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
            log_level=os.environ.get("LOG_LEVEL", "INFO"),
        )
