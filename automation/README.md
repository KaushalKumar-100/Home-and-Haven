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
7. 1–5 product images that you own or have permission to use.

The bot generates the product description and tags from the information you provide. It does **not** scrape Amazon pages or download Amazon product images.

At least one image is required for each new product.

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

## Pinterest automation

Pinterest is integrated as an organic Pin publisher. The bot uses the same user-provided/licensed images that are stored in `public/products/`; it does not scrape Amazon images.

### What is automated

- After ADD, the bot asks whether to publish to Pinterest.
- If YES, it creates exactly **one Pin per website image**.
- Each Pin links to the matching Home & Haven product page.
- The bot waits for the Cloudflare Pages image URLs to become public before creating Pins.
- Pin IDs are stored locally in `automation/runtime/pinterest_pins.json` so later UPDATE/DELETE operations can synchronize Pinterest.
- UPDATE can optionally refresh the Pinterest Pins.
- DELETE attempts to remove the Pins previously created for that product.
- OAuth access tokens are stored locally in `automation/runtime/pinterest_tokens.json`.
- Access tokens are refreshed automatically before expiry.
- HTTP 401 responses trigger a token refresh and retry; rate-limit responses are retried with a short backoff.

Pinterest currently documents `boards:read`, `boards:write`, `pins:read`, and `pins:write` for creating and managing boards and Pins. https://developers.pinterest.com/docs/work-with-organic-content-and-users/create-boards-and-pins/

### One-time setup after app approval

1. In Pinterest **My apps → Manage → Configure**, register this exact redirect URI:

```text
http://localhost:8765/pinterest/callback
```

Pinterest requires the OAuth `redirect_uri` to exactly match a registered URI. https://developers.pinterest.com/docs/getting-started/connect-app/

2. In PowerShell, set the app credentials locally:

```powershell
$env:PINTEREST_CLIENT_ID="1614616"
$env:PINTEREST_CLIENT_SECRET="YOUR_APP_SECRET"
$env:PINTEREST_REDIRECT_URI="http://localhost:8765/pinterest/callback"
```

Do not paste the app secret, access token, or refresh token into chat or commit them to GitHub.

3. Run the one-time OAuth helper:

```powershell
python -m automation.pinterest.oauth
```

A browser window opens. Approve the requested Pinterest scopes. The helper exchanges the authorization code and stores the OAuth tokens in the git-ignored runtime directory.

Pinterest's current OAuth flow returns an access token plus a refresh token; for apps created on or after September 25, 2025, the refresh token is a continuous-refresh token with a 60-day lifetime that can be refreshed indefinitely when maintained. https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/

4. Find the board ID:

```text
/pinterest_boards
```

5. Set it locally:

```powershell
$env:PINTEREST_BOARD_ID="YOUR_BOARD_ID"
$env:AUTO_GIT_PUSH="1"
$env:SITE_BASE_URL="https://home-and-haven.pages.dev"
```

6. Restart the Telegram bot.

### Testing order

Use one product with one image first:

```text
Telegram → ADD → product details → 1 image → DONE → YES
```

Expected result:

```text
1 website image = 1 Pinterest Pin
```

Then test a product with 2–5 images. The bot should create the same number of Pins as website images.

Pinterest Trial access can create Pins, but Trial-created Pins are visible only to the creator. Standard access is needed when you want normal production visibility. https://developers.pinterest.com/docs/key-concepts/access-tiers/

### Environment summary

Required:

```text
TELEGRAM_BOT_TOKEN
AUTO_GIT_PUSH=1
SITE_BASE_URL=https://home-and-haven.pages.dev
PINTEREST_CLIENT_ID=1614616
PINTEREST_CLIENT_SECRET=...
PINTEREST_REDIRECT_URI=http://localhost:8765/pinterest/callback
PINTEREST_BOARD_ID=...
```

You do **not** need to keep `PINTEREST_ACCESS_TOKEN` set after OAuth. The bot reads and refreshes the locally stored OAuth token automatically.

For short-lived testing, a direct `PINTEREST_ACCESS_TOKEN` is still supported, but OAuth is the intended long-term setup.

### Complete workflow

```text
Telegram
  ↓
ADD
  ↓
Amazon URL / ASIN
  ↓
Name + category + price + affiliate link + features
  ↓
1–5 user-provided images
  ↓
DONE
  ↓
products.ts + images
  ↓
Git commit + push
  ↓
Cloudflare Pages deploy
  ↓
Bot asks: Upload to Pinterest?
  ↓
YES
  ↓
Wait for public image URLs
  ↓
1 image = 1 Pin
2 images = 2 Pins
...
5 images = 5 Pins
  ↓
Each Pin links to the Home & Haven product page

UPDATE
  ↓
Website update + Git push
  ↓
Bot asks whether to refresh Pinterest
  ↓
YES
  ↓
Create replacement Pins
  ↓
Remove old Pins

DELETE
  ↓
Remove website product + local images
  ↓
Git push
  ↓
Remove tracked Pinterest Pins when their IDs are known
```

Only use images you own or have permission to publish.
