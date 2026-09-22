"""Maintain the durable ASIN-only catalog used by the website automation."""

from pathlib import Path
import re

CATALOG_PATH = Path(__file__).resolve().parents[2] / "data" / "automatedAsins.ts"


def add_asin(asin: str) -> bool:
    existing: list[str] = []
    if CATALOG_PATH.exists():
        source = CATALOG_PATH.read_text(encoding="utf-8")
        existing = re.findall(r'"([A-Z0-9]{10})"', source)

    asin = asin.upper()
    if asin in existing:
        return False

    values = existing + [asin]
    content = (
        "export const automatedAsins: string[] = [\n"
        + "".join(f'  "{value}",\n' for value in values)
        + "];\n"
    )
    CATALOG_PATH.write_text(content, encoding="utf-8")
    return True
