"""One-time Pinterest OAuth setup for Home & Haven.

Run locally after Pinterest approves the app:
    python -m automation.pinterest.oauth

Required environment variables:
    PINTEREST_CLIENT_ID
    PINTEREST_CLIENT_SECRET
    PINTEREST_REDIRECT_URI

The access and refresh tokens are stored only under automation/runtime/,
which is git-ignored. Never commit or paste them into chat.
"""

import os
import secrets
import threading
import urllib.parse
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer

import requests

from automation.pinterest.token_store import save

API_BASE = "https://api.pinterest.com/v5"
DEFAULT_REDIRECT_URI = "http://localhost:8765/pinterest/callback"
SCOPES = "boards:read boards:write pins:read pins:write"


class CallbackHandler(BaseHTTPRequestHandler):
    server_version = "HomeHavenPinterestOAuth/1.0"

    def do_GET(self):  # noqa: N802
        parsed = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed.query)
        expected_state = getattr(self.server, "oauth_state", "")

        if query.get("state", [""])[0] != expected_state:
            self.server.oauth_error = "OAuth state validation failed."
            self._reply(400, "OAuth failed: state validation failed. You can close this tab.")
            return

        if "error" in query:
            self.server.oauth_error = query.get("error_description", query["error"])[0]
            self._reply(400, "Pinterest authorization was denied. You can close this tab.")
            return

        code = query.get("code", [""])[0]
        if not code:
            self.server.oauth_error = "Pinterest did not return an authorization code."
            self._reply(400, "OAuth failed: no authorization code. You can close this tab.")
            return

        self.server.oauth_code = code
        self._reply(200, "Home & Haven Pinterest connected. You can close this tab and return to the terminal.")

    def log_message(self, format, *args):  # noqa: A002
        return

    def _reply(self, status: int, message: str) -> None:
        body = f"<html><body><h2>{message}</h2></body></html>".encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    client_id = os.getenv("PINTEREST_CLIENT_ID")
    client_secret = os.getenv("PINTEREST_CLIENT_SECRET")
    redirect_uri = os.getenv("PINTEREST_REDIRECT_URI", DEFAULT_REDIRECT_URI)

    if not client_id or not client_secret:
        raise SystemExit("Set PINTEREST_CLIENT_ID and PINTEREST_CLIENT_SECRET first.")

    parsed = urllib.parse.urlparse(redirect_uri)
    if parsed.hostname not in {"localhost", "127.0.0.1"}:
        raise SystemExit("For this local OAuth helper, PINTEREST_REDIRECT_URI must use localhost or 127.0.0.1.")

    state = secrets.token_urlsafe(32)
    server = HTTPServer((parsed.hostname, parsed.port or 80), CallbackHandler)
    server.oauth_state = state
    server.oauth_code = None
    server.oauth_error = None

    params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": SCOPES,
        "state": state,
    }
    auth_url = "https://www.pinterest.com/oauth/?" + urllib.parse.urlencode(params)

    print("Opening Pinterest authorization in your browser...")
    print("If it does not open, copy this URL into your browser:\n")
    print(auth_url)

    thread = threading.Thread(target=server.handle_request, daemon=True)
    thread.start()
    webbrowser.open(auth_url)
    thread.join(timeout=300)
    server.server_close()

    if server.oauth_error:
        raise SystemExit(f"Pinterest OAuth failed: {server.oauth_error}")
    if not server.oauth_code:
        raise SystemExit("Timed out waiting for the Pinterest OAuth callback.")

    response = requests.post(
        f"{API_BASE}/oauth/token",
        auth=(client_id, client_secret),
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "authorization_code",
            "code": server.oauth_code,
            "redirect_uri": redirect_uri,
        },
        timeout=30,
    )
    if not response.ok:
        raise SystemExit(f"Pinterest token exchange failed: {response.status_code} {response.text[:700]}")

    token = response.json()
    if not token.get("access_token") or not token.get("refresh_token"):
        raise SystemExit("Pinterest did not return both access_token and refresh_token.")

    import time

    token["expires_at"] = int(time.time()) + int(token.get("expires_in", 2592000))
    token["refresh_token_expires_at"] = int(time.time()) + int(token.get("refresh_token_expires_in", 5184000))
    save(token)

    print("\n✅ Pinterest OAuth connected successfully.")
    print("Tokens were stored locally in automation/runtime/pinterest_tokens.json.")
    print("The file is git-ignored. Do not commit or share it.")


if __name__ == "__main__":
    main()
