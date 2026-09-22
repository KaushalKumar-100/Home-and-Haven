"""Pinterest API client for Home & Haven organic image Pins.

Supports:
- OAuth access tokens stored locally in automation/runtime/
- automatic access-token refresh
- one-Pin-per-image creation
- Pin deletion for product cleanup
- basic rate-limit retry handling
"""

import os
import time
from urllib.parse import urlparse

import requests
from requests.auth import HTTPBasicAuth

from automation.pinterest.token_store import load as load_tokens, save as save_tokens

API_BASE = "https://api.pinterest.com/v5"


class PinterestError(RuntimeError):
    pass


def configured() -> bool:
    return bool(os.getenv("PINTEREST_BOARD_ID") and (os.getenv("PINTEREST_ACCESS_TOKEN") or load_tokens().get("refresh_token")))


def _refresh_access_token() -> str:
    client_id = os.getenv("PINTEREST_CLIENT_ID")
    client_secret = os.getenv("PINTEREST_CLIENT_SECRET")
    tokens = load_tokens()
    refresh_token = tokens.get("refresh_token")

    if not client_id or not client_secret or not refresh_token:
        raise PinterestError(
            "Pinterest OAuth is not configured. Set PINTEREST_CLIENT_ID and "
            "PINTEREST_CLIENT_SECRET, then run python -m automation.pinterest.oauth."
        )

    response = requests.post(
        f"{API_BASE}/oauth/token",
        auth=HTTPBasicAuth(client_id, client_secret),
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        },
        timeout=30,
    )
    if not response.ok:
        raise PinterestError(f"Pinterest token refresh failed: {response.status_code} {response.text[:700]}")

    fresh = response.json()
    access_token = fresh.get("access_token")
    new_refresh = fresh.get("refresh_token") or refresh_token
    if not access_token:
        raise PinterestError("Pinterest token refresh returned no access token.")

    now = int(time.time())
    tokens.update(fresh)
    tokens["access_token"] = access_token
    tokens["refresh_token"] = new_refresh
    tokens["expires_at"] = now + int(fresh.get("expires_in", 2592000))
    if fresh.get("refresh_token_expires_in"):
        tokens["refresh_token_expires_at"] = now + int(fresh["refresh_token_expires_in"])
    save_tokens(tokens)
    return access_token


def _access_token(force_refresh: bool = False) -> str:
    direct = os.getenv("PINTEREST_ACCESS_TOKEN")
    if direct and not force_refresh:
        return direct

    tokens = load_tokens()
    access_token = tokens.get("access_token")
    expires_at = int(tokens.get("expires_at", 0) or 0)
    # Refresh five minutes before expiry so normal API calls do not hit an expired token.
    if not force_refresh and access_token and expires_at > int(time.time()) + 300:
        return access_token
    return _refresh_access_token()


def _headers(force_refresh: bool = False) -> dict[str, str]:
    return {
        "Authorization": f"Bearer {_access_token(force_refresh=force_refresh)}",
        "Content-Type": "application/json",
        "User-Agent": "Home-Haven-Pinterest-Automation/1.0",
    }


def _request(method: str, path: str, **kwargs):
    refreshed = False
    for attempt in range(3):
        try:
            response = requests.request(
                method,
                f"{API_BASE}{path}",
                headers=_headers(force_refresh=refreshed),
                timeout=kwargs.pop("timeout", 30),
                **kwargs,
            )
        except requests.RequestException as exc:
            if attempt == 2:
                raise PinterestError(f"Pinterest network request failed: {exc}") from exc
            time.sleep(2 ** attempt)
            continue

        if response.status_code == 401 and not refreshed:
            # A stored token may have been revoked or expired unexpectedly.
            _access_token(force_refresh=True)
            refreshed = True
            continue

        if response.status_code == 429 and attempt < 2:
            retry_after = response.headers.get("Retry-After", "2")
            try:
                delay = min(max(int(float(retry_after)), 1), 30)
            except ValueError:
                delay = 2
            time.sleep(delay)
            continue

        return response

    raise PinterestError("Pinterest request failed after retries.")


def list_boards() -> list[dict]:
    response = _request("GET", "/boards", params={"page_size": 250})
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
    response = _request("POST", "/pins", json=payload, timeout=30)
    if not response.ok:
        raise PinterestError(f"Pinterest pin creation failed: {response.status_code} {response.text[:700]}")
    pin = response.json()
    pin_id = str(pin.get("id", ""))
    if not pin_id:
        raise PinterestError("Pinterest created the Pin but returned no Pin ID.")
    return pin_id


def delete_pin(pin_id: str) -> None:
    response = _request("DELETE", f"/pins/{pin_id}", timeout=30)
    if response.status_code not in {200, 204}:
        raise PinterestError(f"Pinterest pin deletion failed: {response.status_code} {response.text[:700]}")


def wait_until_public(urls: list[str], timeout_seconds: int = 300) -> bool:
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
