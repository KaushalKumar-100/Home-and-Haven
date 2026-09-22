import re

def product_exists_by_asin(products_source: str, asin: str) -> bool:
    """Return True when an ASIN is already recorded in products.ts."""
    return asin.upper() in {v.upper() for v in re.findall(r'asin:\s*"([^"]+)"', products_source, re.I)}

def slugify(value: str) -> str:
    value = re.sub(r'[^a-zA-Z0-9]+', '-', value.strip().lower()).strip('-')
    return value[:80] or 'product'
