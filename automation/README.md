# Home & Haven Automation

## Current no-API workflow

The project now supports a small-manual-step workflow that does **not** scrape Amazon:

```
Telegram
   ↓
Amazon.in URL
   ↓
ASIN extraction
   ↓
Bot asks for name, category, price, affiliate URL
   ↓
Optional real product features
   ↓
Optional user-owned/licensed product photo
   ↓
products.ts + automatedAsins.ts
   ↓
Git push
   ↓
Cloudflare Pages deployment
```

### What you enter per product

1. Amazon.in product URL — the bot extracts the ASIN.
2. Product name.
3. Category.
4. Price you want displayed.
5. Your Amazon affiliate link (SiteStripe is fine).
6. Optional factual features.
7. Optional product image that you own or have permission to use.

The bot generates the product description and tags from the information you provide. It does **not** scrape Amazon pages or download Amazon product images.

If you type `SKIP` for the image, a neutral placeholder is used.

## Run the bot

From the repository root:

```powershell
git switch automation-foundation
.\.venv\Scripts\Activate.ps1
$env:TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN"
python -m automation.bot.telegram_bot
```

Useful Telegram commands:

- `/start` — instructions
- `/status` — show the current draft
- `/cancel` — discard the current draft

Draft state is stored under `automation/runtime/`, which is git-ignored.

## Publishing

By default the bot writes files locally and gives you the three Git commands needed to publish.

For hands-off publishing, set:

```powershell
$env:AUTO_GIT_PUSH="1"
```

The bot then runs the normal local `git add`, `git commit`, and `git push`. Your machine must already have permission to push to the repository (for example, Git Credential Manager or SSH authentication).

Cloudflare Pages can then deploy the pushed commit if your project is connected to this GitHub repository.

## Amazon API path for later

When Amazon Creators API access becomes available, the existing server-side provider can be enabled with:

- `AMAZON_CREATORS_CLIENT_ID`
- `AMAZON_CREATORS_CLIENT_SECRET`
- `AMAZON_CREDENTIAL_VERSION`
- `AMAZON_PARTNER_TAG`
- `AMAZON_MARKETPLACE=www.amazon.in`

Never commit secrets.

The current Amazon India Creators API prerequisites include Amazon Associates enrollment, at least 10 qualifying sales in the previous 30 days, API registration, and generated credentials.

## Amazon content and images

This workflow deliberately avoids Amazon scraping and Amazon-provided image caching. Use only images you own or have permission to use for the local product catalog.

The site continues to include the Amazon Associate disclosure. Prices and availability should be treated as user-entered display information unless verified through an authorized Amazon data source.

## Pinterest

Pinterest automation is kept separate. Use original/licensed creative assets rather than automatically reposting Amazon-provided product images/content. A Pinterest developer app and appropriate API access can be added later.
