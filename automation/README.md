# Home & Haven Automation

This directory contains the product-ingestion automation for Home & Haven.

## Current stage

The first module extracts an ASIN from an Amazon.in product URL. It is intentionally independent of Amazon API credentials so the rest of the pipeline can be developed before Creators API access is available.

## Planned pipeline

1. Telegram receives an Amazon.in URL.
2. Extract and validate the ASIN.
3. Check whether the ASIN already exists in the site catalog.
4. Obtain product data through the configured product-data provider.
5. Normalize the data into the site's Product shape.
6. Process product images.
7. Update data/products.ts and public/products/.
8. Commit the generated changes to GitHub.
9. Let the existing deployment rebuild the static site.

Secrets must never be committed to this repository. Use environment variables or GitHub Actions secrets for credentials.
