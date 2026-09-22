"""Pinterest API client for Home & Haven organic image Pins."""

import os
import time
from urllib.parse import urljoin

import requests

API_BASE = "https://api.pinterest.com/v5"


class PinterestError(RuntimeError):
    pass


def configured() -> bool:
    return bool(os.getenv("PINTEREST_ACCESS_TOKEN") and os.getenv("PINTEREST_BOARD_ID"))


def _headers() -> dict[str, str]:
    token = os.getenv("PINTEREST_ACCESS_TOKEN")
    if not token:
        raise PinterestError("PINTEREST_ACCESS_TOKEN is not configured.")
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }


def list_boards() -> list[dict]:
    response = requests.get(
        f"{API_BASE}/boards",
        headers=_headers(),
        params={"page_size": 100},
        timeout=20,
    )
    if not response.ok:
        raise PinterestError(f"Pinterest boards request failed: {response.status_code} {response.text[:500]}")
    return response.json().get("items", [])


def create_image_pin(
    *,
    board_id: str,
    image_url: str,
    link: str,
    title: str,
    description: str,
) -> str:
    payload = {
        "board_id": board_id,
        "title": title[:100],
        "description": description[:500],
        "link": link,
        "media_source": {
            "source_type": "image_url",
            "url": image_url,
            "is_standard": True,
        },
    }
    response = requests.post(
        f"{API_BASE}/pins",
        headers=_headers(),
        json=payload,
        timeout=30,
    )
    if not response.ok:
        raise PinterestError(f"Pinterest pin creation failed: {response.status_code} {response.text[:700]}")
    pin = response.json()
    return str(pin.get("id", ""))


def wait_until_public(urls: list[str], timeout_seconds: int = 180) -> bool:
    """Wait until every website image is publicly reachable after a deployment."""
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        all_ready = True
        for url in urls:
            try:
                response = requests.head(
                    url,
                    timeout=10,
                    allow_redirects=True,
                    headers={"User-Agent": "Home-Haven-Pinterest-Automation/1.0"},
                )
                if response.status_code >= 400:
                    all_ready = False
                    break
            except requests.RequestException:
                all_ready = False
                break
        if all_ready:
            return True
        time.sleep(5)
    return False
