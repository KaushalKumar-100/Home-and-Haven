"""Home & Haven Telegram product intake and publishing bot.

Flow:
Amazon URL -> ASIN -> name -> category -> price -> affiliate URL ->
optional features -> optional photo -> local products.ts update -> optional git push.

No Amazon scraping is performed.
"""

import json
import os
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from automation.product.asin import extract_asin
from automation.product.asin_catalog import add_asin
from automation.product.catalog import product_exists_by_asin, slugify

PROJECT_ROOT = Path(__file__).resolve().parents[2]
PRODUCTS_FILE = PROJECT_ROOT / "data" / "products.ts"
STATE_FILE = PROJECT_ROOT / "automation" / "runtime" / "drafts.json"
IMAGE_DIR = PROJECT_ROOT / "public" / "products"
PLACEHOLDER = "/products/home-haven-placeholder.svg"

AMAZON_URL_RE = re.compile(
    r"https?://(?:www\.)?amazon\.in/[^\s]+",
    re.IGNORECASE,
)

STATES = {
    "name",
    "category",
    "price",
    "affiliate",
    "features",
    "image",
}


def load_drafts() -> dict:
    if not STATE_FILE.exists():
        return {}
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_drafts(drafts: dict) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(
        json.dumps(drafts, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


def draft_for(chat_id: int) -> dict | None:
    return load_drafts().get(str(chat_id))


def set_draft(chat_id: int, draft: dict) -> None:
    drafts = load_drafts()
    drafts[str(chat_id)] = draft
    save_drafts(drafts)


def clear_draft(chat_id: int) -> None:
    drafts = load_drafts()
    drafts.pop(str(chat_id), None)
    save_drafts(drafts)


def clean_text(value: str, limit: int = 240) -> str:
    return " ".join(value.strip().split())[:limit]


def amazon_affiliate_url(value: str) -> bool:
    try:
        host = urlparse(value).netloc.lower().split(":")[0]
    except ValueError:
        return False
    return host in {"amazon.in", "www.amazon.in", "amzn.in", "www.amzn.in", "link.amazon"}


def choose_emoji(category: str) -> str:
    c = category.lower()
    if "kitchen" in c:
        return "🍳"
    if "lighting" in c or "lamp" in c:
        return "💡"
    if "bed" in c or "bedroom" in c:
        return "🛏️"
    if "bath" in c:
        return "🛁"
    if "storage" in c or "organization" in c:
        return "📦"
    if "decor" in c or "mirror" in c:
        return "🏺"
    return "🏠"


def make_description(name: str, category: str, features: str) -> str:
    if features:
        return (
            f"{name} is a {category.replace('-', ' ')} find selected for "
            f"practical everyday use and home styling. Key details: {features}."
        )
    return (
        f"{name} is a {category.replace('-', ' ')} find selected for a "
        "practical, comfortable, and well-organized home."
    )


def make_tags(name: str, category: str, features: str) -> list[str]:
    raw = f"{name} {category} {features}".lower()
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9-]{2,}", raw)
    stop = {
        "the", "and", "for", "with", "from", "this", "that", "home",
        "into", "your", "use", "used", "item", "find", "selected",
    }
    tags: list[str] = []
    for word in words:
        if word in stop or word in tags:
            continue
        tags.append(word.replace("-", " "))
        if len(tags) == 8:
            break
    return tags


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def render_product(draft: dict, image_path: str) -> str:
    name = draft["name"]
    category = slugify(draft["category"])
    product_id = f"{slugify(name)[:70]}-{draft['asin'].lower()}"
    description = make_description(name, draft["category"], draft.get("features", ""))
    tags = make_tags(name, draft["category"], draft.get("features", ""))
    emoji = choose_emoji(draft["category"])

    tags_ts = ", ".join(ts_string(tag) for tag in tags)
    return f'''  {{
    id: {ts_string(product_id)},
    name: {ts_string(name)},
    category: {ts_string(category)},
    price: {ts_string(draft["price"])},
    description: {ts_string(description)},
    emoji: {ts_string(emoji)},
    images: [{ts_string(image_path)}],
    affiliateUrl: {ts_string(draft["affiliate"])},
    featured: false,
    retailer: "Amazon.in",
    asin: {ts_string(draft["asin"])},
    tags: [{tags_ts}],
  }},
'''


def append_product(draft: dict, image_path: str) -> None:
    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    if product_exists_by_asin(source, draft["asin"]):
        raise ValueError(f"ASIN {draft['asin']} is already in data/products.ts.")

    marker = "];"
    index = source.rfind(marker)
    if index == -1:
        raise ValueError("Could not find the end of products.ts.")

    entry = render_product(draft, image_path)
    updated = source[:index] + entry + source[index:]
    PRODUCTS_FILE.write_text(updated, encoding="utf-8")



async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "🏠 Home & Haven Product Bot\n\n"
            "Send an Amazon.in product URL to start.\n"
            "I will ask only the product details needed to publish it.\n\n"
            "Commands: /cancel, /status"
        )


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        clear_draft(update.effective_chat.id)
        await update.message.reply_text("Cancelled. Send another Amazon.in URL whenever you are ready.")


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return
    draft = draft_for(update.effective_chat.id)
    if not draft:
        await update.message.reply_text("No product is currently being prepared.")
        return
    await update.message.reply_text(
        f"Preparing: {draft['name'] or '(name pending)'}\n"
        f"ASIN: {draft['asin']}\n"
        f"Next step: {draft['state']}"
    )


async def finish(update: Update, draft: dict, image_path: str) -> None:
    chat_id = update.effective_chat.id
    try:
        append_product(draft, image_path)
        add_asin(draft["asin"])
    except Exception as exc:
        await update.message.reply_text(f"❌ Could not save the product: {exc}")
        return

    clear_draft(chat_id)

    publish_note = ""
    if os.getenv("AUTO_GIT_PUSH", "").lower() in {"1", "true", "yes"}:
        # Publish this product directly using the repository's existing git credentials.
        ok, message = publish_product_git(draft["asin"])
        publish_note = f"\n\n🚀 {message}"
    else:
        publish_note = (
            "\n\n📌 Saved locally. To publish it now, run:\n"
            "git add data/products.ts data/automatedAsins.ts public/products\n"
            f'git commit -m "Add affiliate product {draft["asin"]}"\n'
            "git push"
        )

    await update.message.reply_text(
        "✅ Product created successfully!\n\n"
        f"Name: {draft['name']}\n"
        f"ASIN: {draft['asin']}\n"
        f"Category: {draft['category']}\n"
        f"Price entered: {draft['price']}"
        f"{publish_note}"
    )


def publish_product_git(asin: str) -> tuple[bool, str]:
    try:
        subprocess.run(
            ["git", "add", "data/products.ts", "data/automatedAsins.ts", "public/products"],
            cwd=PROJECT_ROOT,
            check=True,
        )
        diff = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=PROJECT_ROOT)
        if diff.returncode == 0:
            return True, "No new Git changes were detected."

        subprocess.run(
            ["git", "commit", "-m", f"Add affiliate product {asin}"],
            cwd=PROJECT_ROOT,
            check=True,
        )
        subprocess.run(["git", "push"], cwd=PROJECT_ROOT, check=True)
        return True, "Published to GitHub. Cloudflare Pages can deploy from the push."
    except subprocess.CalledProcessError as exc:
        return False, f"Git push failed (check your local GitHub login): {exc}"


async def handle_url(update: Update, context: ContextTypes.DEFAULT_TYPE, url: str) -> None:
    try:
        asin = extract_asin(url)
    except ValueError as exc:
        await update.message.reply_text(f"❌ {exc}")
        return

    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    if product_exists_by_asin(source, asin):
        await update.message.reply_text(f"⚠️ ASIN {asin} is already in your product catalog.")
        return

    set_draft(
        update.effective_chat.id,
        {
            "asin": asin,
            "source_url": url,
            "name": "",
            "category": "",
            "price": "",
            "affiliate": "",
            "features": "",
            "images": [],
            "state": "name",
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
    )
    await update.message.reply_text(
        f"✅ ASIN detected: {asin}\n\n"
        "1/6 — What product name should appear on Home & Haven?"
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return

    text = (update.message.text or "").strip()
    draft = draft_for(update.effective_chat.id)

    if not draft:
        match = AMAZON_URL_RE.search(text)
        if not match:
            await update.message.reply_text("Send an Amazon.in product URL to start.")
            return
        await handle_url(update, context, match.group(0))
        return

    state = draft["state"]

    if state == "name":
        if len(text) < 2:
            await update.message.reply_text("Please enter a product name.")
            return
        draft["name"] = clean_text(text, 160)
        draft["state"] = "category"
        set_draft(update.effective_chat.id, draft)
        await update.message.reply_text("2/6 — Category? Example: home-decor, lighting, kitchen, bedroom")
        return

    if state == "category":
        draft["category"] = clean_text(text, 80)
        draft["state"] = "price"
        set_draft(update.effective_chat.id, draft)
        await update.message.reply_text("3/6 — What price should be shown? Example: ₹799")
        return

    if state == "price":
        draft["price"] = clean_text(text, 40)
        draft["state"] = "affiliate"
        set_draft(update.effective_chat.id, draft)
        await update.message.reply_text(
            "4/6 — Send your Amazon affiliate link (SiteStripe link is fine)."
        )
        return

    if state == "affiliate":
        if not amazon_affiliate_url(text):
            await update.message.reply_text(
                "Please send an Amazon.in/amzn.in/link.amazon affiliate URL."
            )
            return
        draft["affiliate"] = text
        draft["state"] = "features"
        set_draft(update.effective_chat.id, draft)
        await update.message.reply_text(
            "5/6 — Optional: send a short list of real product features. "
            "Or type SKIP."
        )
        return

    if state == "features":
        draft["features"] = "" if text.upper() == "SKIP" else clean_text(text, 500)
        draft["state"] = "images"
        draft["images"] = []
        set_draft(update.effective_chat.id, draft)
        await update.message.reply_text(
            "6/6 — Send 1 to 5 product photos that you own or have permission to use. "
            "At least 1 image is compulsory.\n\n"
            "Send the images one by one. When finished, type DONE."
        )
        return

    if state == "images":
        if text.upper() == "DONE":
            if not draft.get("images"):
                await update.message.reply_text(
                    "❌ At least 1 product image is compulsory. Please send a photo first."
                )
                return
            await finish(update, draft, draft["images"][0])
            return

        await update.message.reply_text(
            f"📸 You have {len(draft.get('images', []))}/5 images. "
            "Send a product photo, or type DONE when finished."
        )


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.photo:
        return
    draft = draft_for(update.effective_chat.id)
    if not draft or draft.get("state") != "images":
        await update.message.reply_text("Send an Amazon.in URL first.")
        return

    images = draft.setdefault("images", [])
    if len(images) >= 5:
        await update.message.reply_text(
            "⚠️ Maximum 5 images reached. Type DONE to finish."
        )
        return

    photo = update.message.photo[-1]
    telegram_file = await context.bot.get_file(photo.file_id)

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    number = len(images) + 1
    filename = f"{slugify(draft['name'])[:60]}-{draft['asin'].lower()}-{number}.jpg"
    target = IMAGE_DIR / filename
    await telegram_file.download_to_drive(custom_path=str(target))

    images.append(f"/products/{filename}")
    set_draft(update.effective_chat.id, draft)

    if len(images) < 5:
        await update.message.reply_text(
            f"✅ Image {len(images)}/5 saved. Send another image or type DONE."
        )
    else:
        await update.message.reply_text(
            "✅ Image 5/5 saved. Maximum reached. Type DONE to publish the product."
        )


def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise SystemExit(
            "TELEGRAM_BOT_TOKEN is not set. Set it as an environment variable before starting the bot."
        )

    app = ApplicationBuilder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("cancel", cancel))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Home & Haven Telegram product bot is running...")
    app.run_polling()


if __name__ == "__main__":
    main()
