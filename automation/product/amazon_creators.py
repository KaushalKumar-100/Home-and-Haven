"""Amazon Creators API provider for Home & Haven.

The provider uses the current Creators API OAuth 2.0 flow. It is intentionally
inactive until the Associates account has approved Creators API access.
"""

import os
from typing import Any

import requests

from .model import ProductDraft
from .providers import ProviderUnavailable

TOKEN_URLS = {
    "3.1": "https://api.amazon.com/auth/o2/token",
    "3.2": "https://api.amazon.co.uk/auth/o2/token",
    "3.3": "https://api.amazon.co.jp/auth/o2/token",
}


def _display(value: Any) -> str:
    if isinstance(value, dict):
        return str(value.get("displayValue") or value.get("displayAmount") or "")
    return str(value or "")


class AmazonCreatorsAPIProvider:
    API_URL = "https://creatorsapi.amazon/catalog/v1/getItems"

    def __init__(self) -> None:
        self.client_id = os.getenv("AMAZON_CREATORS_CLIENT_ID")
        self.client_secret = os.getenv("AMAZON_CREATORS_CLIENT_SECRET")
        self.partner_tag = os.getenv("AMAZON_PARTNER_TAG")
        self.credential_version = os.getenv("AMAZON_CREDENTIAL_VERSION", "3.2")
        self.marketplace = os.getenv("AMAZON_MARKETPLACE", "www.amazon.in")

    def _require_credentials(self) -> None:
        missing = [
            name
            for name, value in (
                ("AMAZON_CREATORS_CLIENT_ID", self.client_id),
                ("AMAZON_CREATORS_CLIENT_SECRET", self.client_secret),
                ("AMAZON_PARTNER_TAG", self.partner_tag),
            )
            if not value
        ]
        if missing:
            raise ProviderUnavailable(
                "Amazon Creators API is not configured. Missing: " + ", ".join(missing)
            )
        if self.credential_version not in TOKEN_URLS:
            raise ProviderUnavailable(
                f"Unsupported Amazon credential version: {self.credential_version}"
            )

    def _access_token(self) -> str:
        self._require_credentials()
        response = requests.post(
            TOKEN_URLS[self.credential_version],
            headers={"Content-Type": "application/json"},
            json={
                "grant_type": "client_credentials",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "scope": "creatorsapi::default",
            },
            timeout=30,
        )
        response.raise_for_status()
        token = response.json().get("access_token")
        if not token:
            raise ProviderUnavailable("Amazon token response had no access_token")
        return token

    def get_product(self, asin: str) -> ProductDraft:
        token = self._access_token()

        response = requests.post(
            self.API_URL,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "x-marketplace": self.marketplace,
            },
            json={
                "itemIds": [asin],
                "itemIdType": "ASIN",
                "marketplace": self.marketplace,
                "partnerTag": self.partner_tag,
                "resources": [
                    "images.primary.large",
                    "images.variants.large",
                    "itemInfo.title",
                    "itemInfo.features",
                    "browseNodeInfo.browseNodes",
                    "offersV2.listings.price",
                ],
            },
            timeout=30,
        )

        try:
            payload = response.json()
        except ValueError as exc:
            raise ProviderUnavailable(
                f"Amazon returned a non-JSON response ({response.status_code})"
            ) from exc

        if not response.ok:
            raise ProviderUnavailable(
                payload.get("message")
                or payload.get("reason")
                or f"Amazon API request failed with HTTP {response.status_code}"
            )

        errors = payload.get("errors") or []
        if errors:
            messages = [
                str(error.get("message", "Amazon API error"))
                for error in errors
            ]
            if not payload.get("itemResults", {}).get("items"):
                raise ProviderUnavailable("; ".join(messages))

        items = (payload.get("itemResults") or {}).get("items") or []
        item = next(
            (
                candidate
                for candidate in items
                if str(candidate.get("asin", "")).upper() == asin.upper()
            ),
            None,
        )
        if not item:
            raise ProviderUnavailable(
                f"Amazon Creators API returned no accessible item for ASIN {asin}"
            )

        title = _display((item.get("itemInfo") or {}).get("title"))
        if not title:
            raise ProviderUnavailable(f"Amazon item {asin} has no title")

        images: list[str] = []
        primary = (
            ((item.get("images") or {}).get("primary") or {})
            .get("large")
            or {}
        )
        if primary.get("url"):
            images.append(primary["url"])

        for variant in ((item.get("images") or {}).get("variants") or []):
            large = variant.get("large") or {}
            url = large.get("url")
            if url and url not in images:
                images.append(url)

        features = ((item.get("itemInfo") or {}).get("features") or {}).get(
            "displayValues"
        ) or []
        description = " ".join(
            str(feature).strip() for feature in features if str(feature).strip()
        )

        nodes = ((item.get("browseNodeInfo") or {}).get("browseNodes") or [])
        category = (
            _display(nodes[0].get("displayName"))
            if nodes
            else "home"
        ) or "home"

        listings = ((item.get("offersV2") or {}).get("listings") or [])
        price = ""
        if listings:
            price = _display(
                ((listings[0].get("price") or {}).get("money"))
            )

        affiliate_url = item.get("detailPageURL") or (
            f"https://www.amazon.in/dp/{asin}?tag={self.partner_tag}"
        )

        return ProductDraft(
            asin=asin.upper(),
            name=title,
            category=category,
            price=price,
            description=description,
            images=images,
            affiliate_url=affiliate_url,
        )
