"""Local intake queue for product ASINs waiting for a data provider."""

import json
from pathlib import Path
from datetime import datetime, timezone

QUEUE_PATH = Path(__file__).resolve().parent.parent / "runtime" / "pending_products.json"


def enqueue_asin(asin: str, source_url: str) -> bool:
    """Add an ASIN to the local queue. Return False if it is already queued."""
    QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)

    if QUEUE_PATH.exists():
        try:
            items = json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            items = []
    else:
        items = []

    if any(item.get("asin", "").upper() == asin.upper() for item in items):
        return False

    items.append(
        {
            "asin": asin.upper(),
            "source_url": source_url,
            "status": "waiting_for_provider",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    QUEUE_PATH.write_text(
        json.dumps(items, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    return True
