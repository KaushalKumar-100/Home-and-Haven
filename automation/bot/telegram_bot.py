"""Telegram intake bot for Home & Haven product automation."""

import os
import re

from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters

from automation.product.asin import extract_asin

AMAZON_URL_RE = re.compile(r"https?://(?:www\.)?amazon\.in/[^\s]+", re.IGNORECASE)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "🏠 Home & Haven automation bot is ready.\n\n"
            "Send me an Amazon.in product URL and I will extract its ASIN."
        )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return

    text = (update.message.text or "").strip()
    match = AMAZON_URL_RE.search(text)

    if not match:
        await update.message.reply_text(
            "❌ Please send a valid Amazon.in product URL."
        )
        return

    try:
        asin = extract_asin(match.group(0))
    except ValueError as exc:
        await update.message.reply_text(f"❌ {exc}")
        return

    await update.message.reply_text(
        "✅ Amazon product detected!\n\n"
        f"ASIN: {asin}\n\n"
        "Next stage: connect the product-data provider. "
        "The Telegram → URL → ASIN layer is working."
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
