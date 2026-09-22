from automation.product.asin import extract_asin
from automation.product.providers import ManualProductProvider, ProviderUnavailable


def test_provider_is_safe_without_credentials():
    provider = ManualProductProvider()
    try:
        provider.get_product("B012345678")
    except ProviderUnavailable:
        return
    raise AssertionError("Manual provider should remain unavailable until configured")


def test_asin_still_works():
    assert extract_asin("https://www.amazon.in/dp/B012345678") == "B012345678"
