"""Helpers for checking product provider configuration."""

from .providers import ManualProductProvider, ProviderUnavailable
from .amazon_creators import AmazonCreatorsAPIProvider


def get_configured_provider():
    try:
        provider = AmazonCreatorsAPIProvider()
        provider._require_credentials()
        return provider
    except ProviderUnavailable:
        return ManualProductProvider()
