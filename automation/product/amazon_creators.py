"""Amazon Creators API provider for Home & Haven.

This provider is intentionally dormant until the Associates account has
Creators API access and credentials. It uses the current OAuth 2.0 API rather
than the deprecated PA-API 5 credentials.
"""

import os
from typing import Any

import requests

from .model import ProductDraft
from .providers import ProductProvider, ProviderUnavailable


class AmazonCreatorsAPIProvider:
    """Fetch one Amazon.in product by ASIN using Creators API GetItems."""

    API_URL = "https://creatorsapi.amazon/catalog/v1/getItems"
    TOKEN_URLS = {
        "3.1": "https://api.amazon.com/auth/o2/token",
        "3.2": "https://api.amazon.co.uk/auth/o2/token",
        "3.3": "https://api.amazon.co.jp/auth/o2/token",
    }

    def __init__(self) -> None:
        self.client_id = os.getenv("AMAZON_CREATORS_CLIENT_ID")
        self.client_secret = os.getenv("AMAZON_CREATORS_CLIENT_SECRET")
        self.partner_tag = os.getenv("AMAZON_PARTNER_TAG")
        self.credential_version = os.getenv("AMAZON_CREDENTIAL_VERSION", "3.2")
        self.marketplace = os.getenv("AMAZON_MARKETPLACE", "www.amazon.in")

    def _require_credentials(self) -> None:
        missing = []
        if not self.client_id:
            missing.append("AMAZON_CREATORS_CLIENT_ID")
        if not self.client_secret:
            missing.append("AMAZON_CREATORS_CLIENT_SECRET")
        if not self.partner_tag:
            missing.append("AMAZON_PARTNER_TAG")
        if missing:
            raise ProviderUnavailable(
                "Amazon Creators API is not configured. Missing: "
                + ", ".join(missing)
            )
        if self.credential_version not in self.TOKEN_URLS:
            raise ProviderUnavailable(
                f"Unsupported Amazon credential version: {self.credential_version}"
            )

    def _access_token(self) -> str:
        self._require_credentials()
        response = requests.post(
            self.TOKEN_URLS[self.credential_version],
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
            raise ProviderUnavailable("Amazon token response did not contain access_token")
        return token

    @staticmethod
    def _display_value(value: Any) -> str:
        if isinstance(value, dict):
            return str(value.get("displayValue") or value.get("displayAmount") or "")
        return str(value or "")

    def get_product(self, asin: str) -> ProductDraft:
        token = self._access_token()

        resources = [
            "images.primary.large",
            "images.variants.large",
            "itemInfo.title",
            "itemInfo.features",
            "itemInfo.classifications",
            "offersV2.listings.price",
        ]

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
                "resources": resources,
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()

        errors = payload.get("errors") or []
        if errors:
            message = "; ".join(
                str(error.get("message", "Amazon API error")) for error in errors
            )
            raise ProviderUnavailable(message)

        items = (payload.get("itemResults") or {}).get("items") or []
        item = next(
            (candidate for candidate in items if candidate.get("asin", "").upper() == asin.upper()),
            None,
        )
        if not item:
            raise ProviderUnavailable(f"Amazon Creators API returned no item for ASIN {asin}")

        item_info = item.get("itemInfo") or {}
        title = self._display_value((item_info.get("title") or {}).get("displayValue"))
        if not title:
            raise ProviderUnavailable(f"Amazon item {asin} has no title")

        images = []
        primary = ((item.get("images") or {}).get("primary") or {}).get("large")
        if primary and primary.get("url"):
            images.append(primary["url"])

        variants = ((item.get("images") or {}).get("variants") or {}).get("large") or []
        for variant in variants:
            if variant.get("url") and variant["url"] not in images:
                images.append(variant["url"])

        features = ((item_info.get("features") or {}).get("displayValues")) or []
        description = " ".join(str(feature).strip() for feature in features if str(feature).strip())

        classifications = (item_info.get("classifications") or {}).get("binding")
        category = self._display_value(classifications) or "home"

        price = ""
        listings = ((item.get("offersV2") or {}).get("listings")) or []
        if listings:
            price_data = (listings[0].get("price") or {}).get("buyingPrice")
            price = self._display_value(price_data)

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
