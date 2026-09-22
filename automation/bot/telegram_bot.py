"""Home & Haven Telegram product manager.

ADD, UPDATE and DELETE products from Telegram.
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
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters

from automation.product.asin import extract_asin
from automation.product.asin_catalog import add_asin
from automation.product.catalog import product_exists_by_asin, slugify
from automation.pinterest.client import (
    PinterestError,
    configured as pinterest_configured,
    create_image_pin,
    wait_until_public,
)

PROJECT_ROOT = Path(__file__).resolve().parents[2]
PRODUCTS_FILE = PROJECT_ROOT / "data" / "products.ts"
CATALOG_FILE = PROJECT_ROOT / "data" / "automatedAsins.ts"
STATE_FILE = PROJECT_ROOT / "automation" / "runtime" / "drafts.json"
IMAGE_DIR = PROJECT_ROOT / "public" / "products"
AMAZON_URL_RE = re.compile(r"https?://(?:www\.)?amazon\.in/[^\s]+", re.I)


def load_state() -> dict:
    if not STATE_FILE.exists():
        return {}
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def save_state(data: dict) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def get_state(chat_id: int) -> dict | None:
    return load_state().get(str(chat_id))


def set_state(chat_id: int, value: dict) -> None:
    data = load_state()
    data[str(chat_id)] = value
    save_state(data)


def clear_state(chat_id: int) -> None:
    data = load_state()
    data.pop(str(chat_id), None)
    save_state(data)


def clean(value: str, limit: int = 500) -> str:
    return " ".join(value.strip().split())[:limit]


def ts(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def valid_affiliate_url(value: str) -> bool:
    try:
        host = urlparse(value).netloc.lower().split(":")[0]
    except ValueError:
        return False
    return host in {"amazon.in", "www.amazon.in", "amzn.in", "www.amzn.in", "link.amazon"}


def emoji_for(category: str) -> str:
    c = category.lower()
    if "kitchen" in c: return "🍳"
    if "lamp" in c or "lighting" in c: return "💡"
    if "bed" in c or "bedroom" in c: return "🛏️"
    if "bath" in c: return "🛁"
    if "storage" in c or "organization" in c: return "📦"
    if "decor" in c or "mirror" in c: return "🏺"
    return "🏠"


def description(name: str, category: str, features: str) -> str:
    if features:
        return f"{name} is a {category.replace('-', ' ')} find selected for practical everyday use and home styling. Key details: {features}."
    return f"{name} is a {category.replace('-', ' ')} find selected for a practical, comfortable, and well-organized home."


def tags(name: str, category: str, features: str) -> list[str]:
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9-]{2,}", f"{name} {category} {features}".lower())
    stop = {"the", "and", "for", "with", "from", "this", "that", "home", "your", "use", "item", "find"}
    out = []
    for word in words:
        word = word.replace("-", " ")
        if word not in stop and word not in out:
            out.append(word)
        if len(out) == 8:
            break
    return out


def product_block(d: dict) -> str:
    pid = f"{slugify(d['name'])[:70]}-{d['asin'].lower()}"
    image_values = d.get("images", [])
    return f'''  {{
    id: {ts(pid)},
    name: {ts(d["name"])},
    category: {ts(slugify(d["category"]))},
    price: {ts(d["price"])},
    description: {ts(description(d["name"], d["category"], d.get("features", "")))},
    emoji: {ts(emoji_for(d["category"]))},
    images: [{", ".join(ts(x) for x in image_values)}],
    affiliateUrl: {ts(d["affiliate"])},
    featured: false,
    retailer: "Amazon.in",
    asin: {ts(d["asin"])},
    tags: [{", ".join(ts(x) for x in tags(d["name"], d["category"], d.get("features", "")))}],
  }},
'''


def find_block(asin: str) -> tuple[int, int, str]:
    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    pattern = re.compile(
        r"\{(?:(?!\n\s*\},?\n).)*?\basin:\s*" + re.escape(asin) +
        r"(?:(?!\n\s*\},?\n).)*?\n\s*\},?\n",
        re.I | re.S,
    )
    m = pattern.search(source)
    if not m:
        raise ValueError(f"ASIN {asin} was not found in data/products.ts.")
    return m.start(), m.end(), m.group()


def append_product(d: dict) -> None:
    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    if product_exists_by_asin(source, d["asin"]):
        raise ValueError(f"ASIN {d['asin']} already exists.")
    idx = source.rfind("];")
    if idx < 0:
        raise ValueError("Could not find products array end.")
    PRODUCTS_FILE.write_text(source[:idx] + product_block(d) + source[idx:], encoding="utf-8")
    add_asin(d["asin"])


def replace_field(block: str, field: str, value: str) -> str:
    return re.sub(rf"(\b{re.escape(field)}:\s*)[^,\n]+,", rf"\g<1>{ts(value)},", block, count=1)


def replace_images(block: str, images: list[str]) -> str:
    return re.sub(r"(\bimages:\s*)\[[\s\S]*?\],", rf"\g<1>[{', '.join(ts(x) for x in images)}],", block, count=1)


def update_product(asin: str, updates: dict) -> None:
    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    start, end, block = find_block(asin)
    for field, value in updates.items():
        block = replace_images(block, value) if field == "images" else replace_field(block, field, value)
    PRODUCTS_FILE.write_text(source[:start] + block + source[end:], encoding="utf-8")


def delete_product(asin: str) -> list[str]:
    source = PRODUCTS_FILE.read_text(encoding="utf-8")
    start, end, block = find_block(asin)
    images = re.findall(r'"(/products/[^"]+)"', block)
    PRODUCTS_FILE.write_text(source[:start] + source[end:], encoding="utf-8")
    if CATALOG_FILE.exists():
        c = CATALOG_FILE.read_text(encoding="utf-8")
        c = re.sub(rf'^\s*"{re.escape(asin.upper())}",\s*\n?', "", c, flags=re.M)
        CATALOG_FILE.write_text(c, encoding="utf-8")
    return images


def publish(asin: str, action: str) -> str:
    if os.getenv("AUTO_GIT_PUSH", "").lower() not in {"1", "true", "yes"}:
        return "\n\n📌 Saved locally. Run git add/commit/push to publish."

    env = os.environ.copy()
    # Never allow git to wait for an interactive username/password prompt.
    env["GIT_TERMINAL_PROMPT"] = "0"

    try:
        subprocess.run(
            ["git", "add", "data/products.ts", "data/automatedAsins.ts", "public/products"],
            cwd=PROJECT_ROOT, check=True, timeout=10, env=env,
        )
        if subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            cwd=PROJECT_ROOT, timeout=10, env=env,
        ).returncode == 0:
            return "\n\nNo Git changes detected."
        subprocess.run(
            ["git", "commit", "-m", f"{action.capitalize()} affiliate product {asin}"],
            cwd=PROJECT_ROOT, check=True, timeout=20, env=env,
        )
        subprocess.run(
            ["git", "push"],
            cwd=PROJECT_ROOT, check=True, timeout=20, env=env,
            capture_output=True, text=True,
        )
        return "\n\n🚀 Published to GitHub. Cloudflare Pages can deploy the change."
    except subprocess.TimeoutExpired:
        return "\n\n⚠️ Git operation timed out. The product change was saved locally, but GitHub was not confirmed."
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or str(exc)).strip()
        return f"\n\n❌ Git publish failed: {detail[-500:]}"


def parse_asin(value: str) -> str:
    value = value.strip()
    if re.fullmatch(r"[A-Za-z0-9]{10}", value):
        return value.upper()
    return extract_asin(value)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "🏠 HOME & HAVEN PRODUCT MANAGER\n\n"
            "➕ ADD — add a new product\n"
            "✏️ UPDATE — update an existing product\n"
            "🗑️ DELETE — delete a product\n\n"
            "Send ADD, UPDATE or DELETE."
        )


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        clear_state(update.effective_chat.id)
        await update.message.reply_text("Cancelled. Send ADD, UPDATE or DELETE.")


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return
    d = get_state(update.effective_chat.id)
    await update.message.reply_text(
        f"Current operation: {d.get('action')}\nNext step: {d.get('state')}"
        if d else "No operation in progress."
    )


def site_base_url() -> str:
    return os.getenv("SITE_BASE_URL", "https://home-and-haven.pages.dev").rstrip("/")


def product_public_id(d: dict) -> str:
    return f"{slugify(d['name'])[:70]}-{d['asin'].lower()}"


def pinterest_description(d: dict) -> str:
    base = description(d["name"], d["category"], d.get("features", ""))
    return base[:500]


def pinterest_upload(d: dict) -> tuple[int, list[str]]:
    if not pinterest_configured():
        raise PinterestError(
            "Pinterest is not configured. Set PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID."
        )

    base = site_base_url()
    image_urls = [f"{base}{path}" for path in d["images"]]
    if not wait_until_public(image_urls, timeout_seconds=180):
        raise PinterestError(
            "The website images are not publicly reachable yet. "
            "Cloudflare may still be deploying."
        )

    link = f"{base}/products/{product_public_id(d)}"
    pin_ids: list[str] = []
    board_id = os.environ["PINTEREST_BOARD_ID"]

    for index, image_url in enumerate(image_urls, start=1):
        pin_id = create_image_pin(
            board_id=board_id,
            image_url=image_url,
            link=link,
            title=d["name"],
            description=pinterest_description(d),
        )
        pin_ids.append(pin_id)

    return len(pin_ids), pin_ids


async def finish_add(update: Update, d: dict) -> None:
    try:
        append_product(d)
    except Exception as exc:
        await update.message.reply_text(f"❌ Could not add product: {exc}")
        return

    # Keep the draft alive until the Pinterest decision is made.
    d["state"] = "pinterest_confirm"
    set_state(update.effective_chat.id, d)

    publish_result = publish(d["asin"], "add")
    await update.message.reply_text(
        f"✅ PRODUCT ADDED\n\n"
        f"{d['name']}\n"
        f"ASIN: {d['asin']}\n"
        f"Website images: {len(d['images'])}/5\n"
        f"{publish_result}\n\n"
        "📌 Should I upload these images to Pinterest too?\n"
        "Reply YES or NO."
    )


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.photo:
        return
    d = get_state(update.effective_chat.id)
    if not d or d.get("state") not in {"add_images", "update_images"}:
        await update.message.reply_text("Start ADD or UPDATE first.")
        return
    images = d.setdefault("images", [])
    if len(images) >= 5:
        await update.message.reply_text("Maximum 5 images reached. Type DONE.")
        return
    photo = update.message.photo[-1]
    file = await context.bot.get_file(photo.file_id)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    number = len(images) + 1
    filename = f"{slugify(d['name'])[:60]}-{d['asin'].lower()}-{number}.jpg"
    await file.download_to_drive(custom_path=str(IMAGE_DIR / filename))
    images.append(f"/products/{filename}")
    set_state(update.effective_chat.id, d)
    await update.message.reply_text(
        f"✅ Image {len(images)}/5 saved. Send another image or type DONE."
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return
    text = (update.message.text or "").strip()
    cid = update.effective_chat.id
    d = get_state(cid)

    if not d:
        choice = text.upper()
        if choice in {"ADD", "➕ ADD"}:
            set_state(cid, {"action": "add", "state": "add_url"})
            await update.message.reply_text("➕ ADD PRODUCT\n\nSend the Amazon.in URL or ASIN.")
        elif choice in {"UPDATE", "✏️ UPDATE"}:
            set_state(cid, {"action": "update", "state": "update_url"})
            await update.message.reply_text("✏️ UPDATE PRODUCT\n\nSend the Amazon.in URL or ASIN.")
        elif choice in {"DELETE", "🗑️ DELETE"}:
            set_state(cid, {"action": "delete", "state": "delete_url"})
            await update.message.reply_text("🗑️ DELETE PRODUCT\n\nSend the Amazon.in URL or ASIN.")
        else:
            await update.message.reply_text("Choose ADD, UPDATE, or DELETE.")
        return

    state = d["state"]

    if state in {"add_url", "update_url", "delete_url"}:
        try:
            asin = parse_asin(text)
        except ValueError as exc:
            await update.message.reply_text(f"❌ {exc}")
            return
        exists = product_exists_by_asin(PRODUCTS_FILE.read_text(encoding="utf-8"), asin)

        if state == "add_url":
            if exists:
                clear_state(cid)
                await update.message.reply_text(f"⚠️ {asin} already exists. Use UPDATE.")
                return
            d.update({"asin": asin, "name": "", "category": "", "price": "", "affiliate": "", "features": "", "images": [], "state": "add_name"})
            set_state(cid, d)
            await update.message.reply_text("1/6 — Product name?")
            return

        if state == "update_url":
            if not exists:
                clear_state(cid)
                await update.message.reply_text(f"❌ {asin} is not in your catalog.")
                return
            d.update({"asin": asin, "state": "update_choice"})
            set_state(cid, d)
            await update.message.reply_text(
                f"✏️ Found {asin}. What do you want to update?\n\n"
                "NAME\nDETAILS\nLINK\nIMAGES\nALL"
            )
            return

        if not exists:
            clear_state(cid)
            await update.message.reply_text(f"❌ {asin} is not in your catalog.")
            return
        d.update({"asin": asin, "state": "delete_confirm"})
        set_state(cid, d)
        await update.message.reply_text(
            f"⚠️ Delete product {asin}? This also removes its local product images.\n"
            "Type DELETE to confirm or CANCEL."
        )
        return

    # ADD
    if state == "add_name":
        d["name"] = clean(text, 160); d["state"] = "add_category"
        set_state(cid, d); await update.message.reply_text("2/6 — Category?"); return
    if state == "add_category":
        d["category"] = clean(text, 80); d["state"] = "add_price"
        set_state(cid, d); await update.message.reply_text("3/6 — Price to display? Example: ₹799"); return
    if state == "add_price":
        d["price"] = clean(text, 40); d["state"] = "add_link"
        set_state(cid, d); await update.message.reply_text("4/6 — Amazon affiliate link?"); return
    if state == "add_link":
        if not valid_affiliate_url(text):
            await update.message.reply_text("Send a valid Amazon affiliate URL.")
            return
        d["affiliate"] = text; d["state"] = "add_features"
        set_state(cid, d); await update.message.reply_text("5/6 — Features/description, or SKIP?"); return
    if state == "add_features":
        d["features"] = "" if text.upper() == "SKIP" else clean(text)
        d["state"] = "add_images"; d["images"] = []
        set_state(cid, d)
        await update.message.reply_text("6/6 — Send 1–5 images. At least 1 is compulsory. Type DONE after images.")
        return
    if state == "add_images":
        if text.upper() != "DONE":
            await update.message.reply_text(f"Send an image. You have {len(d['images'])}/5 saved.")
            return
        if not d["images"]:
            await update.message.reply_text("❌ At least 1 image is compulsory.")
            return
        await finish_add(update, d)
        return

    if state == "pinterest_confirm":
        choice = text.upper()
        if choice in {"NO", "N", "CANCEL"}:
            clear_state(cid)
            await update.message.reply_text("✅ Product is live on the website. Pinterest upload skipped.")
            return
        if choice not in {"YES", "Y"}:
            await update.message.reply_text("Reply YES to upload all product images to Pinterest, or NO to skip.")
            return

        if not pinterest_configured():
            await update.message.reply_text(
                "⚠️ Pinterest is not configured yet.\n\n"
                "I need PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID. "
                "After you configure them, add the product again or use the Pinterest upload command."
            )
            clear_state(cid)
            return

        await update.message.reply_text(
            f"📌 Uploading {len(d['images'])} images to Pinterest...\n"
            "I will create exactly one Pin per website image."
        )
        try:
            count, pin_ids = pinterest_upload(d)
            clear_state(cid)
            await update.message.reply_text(
                f"🎉 Pinterest upload complete!\n\n"
                f"Product: {d['name']}\n"
                f"Pins created: {count}\n"
                f"Images on website: {len(d['images'])}"
            )
        except PinterestError as exc:
            await update.message.reply_text(
                f"❌ Pinterest upload did not complete.\n\n{exc}\n\n"
                "The product and website images are already saved."
            )
            clear_state(cid)
        return

    # UPDATE
    if state == "update_choice":
        choice = text.upper()
        if choice not in {"NAME", "DETAILS", "LINK", "IMAGES", "ALL"}:
            await update.message.reply_text("Choose NAME, DETAILS, LINK, IMAGES or ALL.")
            return
        d["update_type"] = choice
        if choice == "NAME":
            d["state"] = "update_name"
            await update.message.reply_text("New product name?")
        elif choice == "DETAILS":
            d["state"] = "update_details"
            await update.message.reply_text("Send: category | price | features/description")
        elif choice == "LINK":
            d["state"] = "update_link"
            await update.message.reply_text("New Amazon affiliate link?")
        elif choice == "IMAGES":
            d["state"] = "update_images"; d["images"] = []
            await update.message.reply_text("Send 1–5 replacement images. At least 1 is required. Type DONE.")
        else:
            d["state"] = "update_all_name"
            await update.message.reply_text("New product name?")
        set_state(cid, d); return

    if state == "update_name":
        d["new_name"] = clean(text, 160); d["state"] = "update_name_confirm"
        set_state(cid, d); await update.message.reply_text("Type YES to save or NO to cancel."); return
    if state == "update_name_confirm":
        if text.upper() != "YES":
            clear_state(cid); await update.message.reply_text("Update cancelled."); return
        new_id = f"{slugify(d['new_name'])[:70]}-{d['asin'].lower()}"
        update_product(d["asin"], {"name": d["new_name"], "id": new_id})
        clear_state(cid); await update.message.reply_text("✅ Name and product ID updated." + publish(d["asin"], "update")); return

    if state == "update_details":
        parts = [x.strip() for x in text.split("|", 2)]
        if len(parts) != 3:
            await update.message.reply_text("Use: category | price | features/description")
            return
        update_product(d["asin"], {"category": slugify(parts[0]), "price": parts[1], "description": parts[2]})
        clear_state(cid); await update.message.reply_text("✅ Details updated." + publish(d["asin"], "update")); return

    if state == "update_link":
        if not valid_affiliate_url(text):
            await update.message.reply_text("Send a valid Amazon affiliate URL.")
            return
        update_product(d["asin"], {"affiliateUrl": text})
        clear_state(cid); await update.message.reply_text("✅ Affiliate link updated." + publish(d["asin"], "update")); return

    if state == "update_images":
        if text.upper() != "DONE":
            await update.message.reply_text(f"Send an image. You have {len(d['images'])}/5 saved.")
            return
        if not d["images"]:
            await update.message.reply_text("❌ At least 1 image is required.")
            return
        update_product(d["asin"], {"images": d["images"]})
        clear_state(cid); await update.message.reply_text("✅ Images updated." + publish(d["asin"], "update")); return

    if state == "update_all_name":
        d["new_name"] = clean(text, 160); d["state"] = "update_all_category"
        set_state(cid, d); await update.message.reply_text("New category?"); return
    if state == "update_all_category":
        d["new_category"] = clean(text, 80); d["state"] = "update_all_price"
        set_state(cid, d); await update.message.reply_text("New price?"); return
    if state == "update_all_price":
        d["new_price"] = clean(text, 40); d["state"] = "update_all_link"
        set_state(cid, d); await update.message.reply_text("New Amazon affiliate link?"); return
    if state == "update_all_link":
        if not valid_affiliate_url(text):
            await update.message.reply_text("Send a valid Amazon affiliate URL."); return
        d["new_link"] = text; d["state"] = "update_all_features"
        set_state(cid, d); await update.message.reply_text("New features/description, or SKIP?"); return
    if state == "update_all_features":
        d["new_features"] = "" if text.upper() == "SKIP" else clean(text)
        d["state"] = "update_all_images"; d["images"] = []
        set_state(cid, d); await update.message.reply_text("Send 1–5 replacement images. At least 1 required. Type DONE."); return
    if state == "update_all_images":
        if text.upper() != "DONE":
            await update.message.reply_text(f"Send an image. You have {len(d['images'])}/5 saved."); return
        if not d["images"]:
            await update.message.reply_text("❌ At least 1 image is required."); return
        updates = {
            "name": d["new_name"],
            "category": slugify(d["new_category"]),
            "price": d["new_price"],
            "affiliateUrl": d["new_link"],
            "description": description(d["new_name"], d["new_category"], d["new_features"]),
            "images": d["images"],
        }
        update_product(d["asin"], updates)
        clear_state(cid)
        await update.message.reply_text("✅ Product completely updated." + publish(d["asin"], "update")); return

    # DELETE
    if state == "delete_confirm":
        if text.upper() != "DELETE":
            clear_state(cid); await update.message.reply_text("Delete cancelled."); return
        asin = d["asin"]
        try:
            images = delete_product(asin)
            for path in images:
                target = PROJECT_ROOT / path.lstrip("/")
                if target.exists():
                    target.unlink()
        except Exception as exc:
            await update.message.reply_text(f"❌ Delete failed: {exc}")
            return

        clear_state(cid)
        # Tell Telegram immediately that the local deletion succeeded.
        await update.message.reply_text(
            f"🗑️ Product {asin} deleted locally.\n"
            "The product entry and its local images were removed."
        )
        result = publish(asin, "delete")
        if result.strip():
            await update.message.reply_text(result.strip())


def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise SystemExit("TELEGRAM_BOT_TOKEN is not set.")
    app = ApplicationBuilder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("cancel", cancel))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    print("Home & Haven Telegram product manager is running...")
    app.run_polling()


if __name__ == "__main__":
    main()
