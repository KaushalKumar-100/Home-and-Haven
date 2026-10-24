"""Amazon URL parsing helpers for Home & Haven automation."""

import re
from urllib.parse import urlparse, parse_qs

_ASIN_RE = re.compile(r"(?<![A-Z0-9])([A-Z0-9]{10})(?![A-Z0-9])", re.I)


def extract_asin(url: str) -> str:
    """Extract a 10-character Amazon ASIN from an Amazon.in product URL."""
    if not isinstance(url, str) or not url.strip():
        raise ValueError("Amazon URL is required")
    parsed = urlparse(url.strip())
    host = parsed.netloc.lower().split(":", 1)[0]
    if not (host == "amazon.in" or host.endswith(".amazon.in")):
        raise ValueError("Only Amazon.in URLs are supported")
    path_match = re.search(r"/(?:dp|gp/product|dp/product)/([A-Z0-9]{10})(?:[/?]|$)", parsed.path, re.I)
    if path_match:
        return path_match.group(1).upper()
    for key in ("asin", "ASIN"):
        value = parse_qs(parsed.query).get(key, [None])[0]
        if value and re.fullmatch(r"[A-Z0-9]{10}", value, re.I):
            return value.upper()
    match = _ASIN_RE.search(parsed.path)
    if match:
        return match.group(1).upper()
    raise ValueError("Could not find a 10-character ASIN in the Amazon.in URL")


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python -m automation.product.asin <amazon.in-url>")
    print(extract_asin(sys.argv[1]))
