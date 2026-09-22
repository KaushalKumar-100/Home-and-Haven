"""Telegram intake bot for Home & Haven product automation."""

import os
import re
from pathlib import Path

from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters

from automation.product.asin import extract_asin
from automation.product.catalog import product_exists_by_asin
from automation.product.queue import enqueue_asin

AMAZON_URL_RE = re.compile(r"https?://(?:www\.)?amazon\.in/[^\s]+", re.IGNORECASE)
PROJECT_ROOT = Path(__file__).resolve().parents[2]
PRODUCTS_FILE = PROJECT_ROOT / "data" / "products.ts"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "🏠 Home & Haven automation bot is ready.\n\n"
            "Send me an Amazon.in product URL and I will add it to the product intake queue."
        )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return

    text = (update.message.text or "").strip()
    match = AMAZON_URL_RE.search(text)

    if not match:
        await update.message.reply_text("❌ Please send a valid Amazon.in product URL.")
        return

    url = match.group(0)

    try:
        asin = extract_asin(url)
    except ValueError as exc:
        await update.message.reply_text(f"❌ {exc}")
        return

    products_source = PRODUCTS_FILE.read_text(encoding="utf-8")

    if product_exists_by_asin(products_source, asin):
        await update.message.reply_text(
            f"⚠️ This ASIN is already in the Home & Haven catalog.\n\nASIN: {asin}"
        )
        return

    added = enqueue_asin(asin, url)

    if not added:
        await update.message.reply_text(
            f"⏳ This ASIN is already waiting in the intake queue.\n\nASIN: {asin}"
        )
        return

    await update.message.reply_text(
        "✅ Product added to Home & Haven intake queue!\n\n"
        f"ASIN: {asin}\n\n"
        "Status: waiting for product-data provider.\n"
        "The provider can later be replaced with Amazon Creators API without changing this Telegram layer."
    )


def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise SystemExit(
            "TELEGRAM_BOT_TOKEN is not set. "
            "Set it as an environment variable before starting the bot."
        )

    app = ApplicationBuilder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message)
    )

    print("Home & Haven Telegram bot is running...")
    app.run_polling()


if __name__ == "__main__":
    main()
