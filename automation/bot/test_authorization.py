"""Unit tests for Telegram automation authorization and Pinterest cleanup helpers."""

import os
from types import SimpleNamespace

from automation.bot.telegram_bot import allowed_user
from automation.product.asin import extract_asin


def make_update(user_id=None, chat_id=None):
    user = SimpleNamespace(id=user_id) if user_id is not None else None
    chat = SimpleNamespace(id=chat_id) if chat_id is not None else None
    return SimpleNamespace(effective_user=user, effective_chat=chat)


def test_allowlist_denies_everyone_when_no_ids_configured(monkeypatch):
    monkeypatch.delenv("TELEGRAM_ALLOWED_USER_IDS", raising=False)
    monkeypatch.delenv("TELEGRAM_ALLOWED_CHAT_IDS", raising=False)
    assert not allowed_user(make_update(10, 20))


def test_user_allowlist_blocks_unknown_user(monkeypatch):
    monkeypatch.setenv("TELEGRAM_ALLOWED_USER_IDS", "123,456")
    monkeypatch.delenv("TELEGRAM_ALLOWED_CHAT_IDS", raising=False)
    assert allowed_user(make_update(123, 20))
    assert not allowed_user(make_update(789, 20))


def test_configured_user_and_chat_lists_must_both_match(monkeypatch):
    monkeypatch.setenv("TELEGRAM_ALLOWED_USER_IDS", "123")
    monkeypatch.setenv("TELEGRAM_ALLOWED_CHAT_IDS", "-100999")
    assert allowed_user(make_update(123, -100999))
    assert not allowed_user(make_update(123, 888))


def test_amazon_asin_parse_is_still_supported():
    assert extract_asin("https://www.amazon.in/dp/B012345678") == "B012345678"
