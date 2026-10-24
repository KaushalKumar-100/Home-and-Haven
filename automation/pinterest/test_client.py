"""Unit tests for retry behavior in the Pinterest API client."""

from types import SimpleNamespace

from automation.pinterest import client


def test_retry_reuses_timeout_and_request_arguments(monkeypatch):
    calls = []
    responses = [
        SimpleNamespace(status_code=429, headers={"Retry-After": "0"}, ok=False, text="rate limited"),
        SimpleNamespace(status_code=201, headers={}, ok=True, text=""),
    ]

    def fake_request(method, url, **kwargs):
        calls.append((method, url, kwargs))
        return responses.pop(0)

    monkeypatch.setattr(client, "_headers", lambda force_refresh=False: {"Authorization": "Bearer test"})
    monkeypatch.setattr(client.requests, "request", fake_request)
    monkeypatch.setattr(client.time, "sleep", lambda _: None)

    response = client._request("POST", "/pins", json={"title": "test"}, timeout=7)

    assert response.status_code == 201
    assert len(calls) == 2
    assert all(call[2]["timeout"] == 7 for call in calls)
    assert all(call[2]["json"] == {"title": "test"} for call in calls)


def test_retry_after_invalid_value_uses_fallback(monkeypatch):
    calls = []
    responses = [
        SimpleNamespace(status_code=429, headers={"Retry-After": "not-a-number"}, ok=False, text="rate limited"),
        SimpleNamespace(status_code=200, headers={}, ok=True, text=""),
    ]

    def fake_request(method, url, **kwargs):
        calls.append((method, url, kwargs))
        return responses.pop(0)

    monkeypatch.setattr(client, "_headers", lambda force_refresh=False: {"Authorization": "Bearer test"})
    monkeypatch.setattr(client.requests, "request", fake_request)
    sleeps = []
    monkeypatch.setattr(client.time, "sleep", lambda delay: sleeps.append(delay))

    response = client._request("GET", "/boards", params={"page_size": 10})

    assert response.status_code == 200
    assert len(calls) == 2
    assert sleeps == [2]
