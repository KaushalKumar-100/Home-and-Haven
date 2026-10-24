from typing import Protocol
from .model import ProductDraft

class ProviderUnavailable(RuntimeError):
    pass

class ProductProvider(Protocol):
    def get_product(self, asin: str) -> ProductDraft:
        ...

class ManualProductProvider:
    """Temporary provider while Amazon API access is unavailable."""
    def get_product(self, asin: str) -> ProductDraft:
        raise ProviderUnavailable(
            'No compliant automatic product-data provider is configured yet. '
            'Amazon Creators API will be plugged in when the account qualifies.'
        )
