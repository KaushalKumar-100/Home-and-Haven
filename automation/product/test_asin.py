from automation.product.asin import extract_asin


def test_dp_url():
    assert extract_asin("https://www.amazon.in/dp/B0ABCDEFG1") == "B0ABCDEFG1"


def test_gp_product_url():
    assert extract_asin("https://www.amazon.in/gp/product/B012345678") == "B012345678"


def test_query_asin():
    assert extract_asin("https://www.amazon.in/some-page?asin=B012345678") == "B012345678"
