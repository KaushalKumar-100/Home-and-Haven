"""Local, git-ignored Pinterest OAuth token storage."""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
TOKEN_FILE = PROJECT_ROOT / "automation" / "runtime" / "pinterest_tokens.json"


def load() -> dict:
    if not TOKEN_FILE.exists():
        return {}
    try:
        return json.loads(TOKEN_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def save(data: dict) -> None:
    TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    TOKEN_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")


def clear() -> None:
    try:
        TOKEN_FILE.unlink()
    except FileNotFoundError:
        pass
