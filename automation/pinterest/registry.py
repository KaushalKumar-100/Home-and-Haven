"""Local registry of Pinterest Pins created for Home & Haven products."""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
REGISTRY_FILE = PROJECT_ROOT / "automation" / "runtime" / "pinterest_pins.json"


def _load() -> dict[str, list[str]]:
    if not REGISTRY_FILE.exists():
        return {}
    try:
        data = json.loads(REGISTRY_FILE.read_text(encoding="utf-8"))
        return {str(k): [str(x) for x in v] for k, v in data.items()}
    except (OSError, json.JSONDecodeError):
        return {}


def get(asin: str) -> list[str]:
    return _load().get(asin.upper(), [])


def set_pins(asin: str, pin_ids: list[str]) -> None:
    data = _load()
    data[asin.upper()] = pin_ids
    REGISTRY_FILE.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")


def remove(asin: str) -> None:
    data = _load()
    data.pop(asin.upper(), None)
    REGISTRY_FILE.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")
