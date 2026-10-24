from dataclasses import dataclass, field

@dataclass
class ProductDraft:
    asin: str
    name: str
    category: str
    price: str = ""
    original_price: str = ""
    description: str = ""
    images: list[str] = field(default_factory=list)
    affiliate_url: str = ""
    rating: float | None = None
    review_count: int | None = None
    tags: list[str] = field(default_factory=list)
    featured: bool = False
    badge: str | None = None

    @property
    def id(self) -> str:
        import re
        value = re.sub(r"[^a-zA-Z0-9]+", "-", self.name.strip().lower()).strip("-")
        return (value[:80] or "product") + "-" + self.asin.lower()
