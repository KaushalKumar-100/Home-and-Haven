# Home & Haven Automation

## Current architecture

```
Telegram
   ↓
Amazon.in URL
   ↓
ASIN extraction
   ↓
Duplicate check
   ↓
Durable ASIN catalog
   ↓
Cloudflare Pages Function
   ↓
Amazon Creators API (server-side)
   ↓
Current product data + current image URLs
   ↓
Home & Haven automated product section
```

## Why the website keeps ASINs, not Amazon product content

Amazon's current Creators API provides product details through `GetItems`, including ItemInfo, OffersV2, BrowseNodeInfo and Images.

The Associates operating agreement places specific limits on Product Advertising Content. In particular, Amazon states that images may not be stored or cached and that other Product Advertising Content has cache/display requirements. Therefore this project does **not** download Amazon product images into `public/products` and does not persist Amazon API responses in Git.

The website stores ASINs, then the Cloudflare Pages Function requests current product information server-side.

## Required production configuration

Cloudflare Pages → Settings → Variables and Secrets:

- `AMAZON_CREATORS_CLIENT_ID`
- `AMAZON_CREATORS_CLIENT_SECRET`
- `AMAZON_CREDENTIAL_VERSION`
- `AMAZON_PARTNER_TAG`
- `AMAZON_MARKETPLACE=www.amazon.in`

Never commit these values.

Amazon Creators API access currently requires Amazon Associates enrollment, at least 10 qualifying sales in the previous 30 days, API registration, and generated credentials.

## Telegram

Local development:

```powershell
$env:TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN"
python -m automation.bot.telegram_bot
```

The bot adds only the ASIN to `data/automatedAsins.ts`.

## Pinterest

Pinterest automation is deliberately not connected to Amazon-provided product images. Amazon's operating agreement contains restrictions on using Product Advertising Content with social networking sites without prior written approval.

Pinterest automation can be added using original/licensed creative assets and a Pinterest API app with the required scopes.
