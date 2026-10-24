type Env = {
  AMAZON_CREATORS_CLIENT_ID?: string;
  AMAZON_CREATORS_CLIENT_SECRET?: string;
  AMAZON_CREDENTIAL_VERSION?: string;
  AMAZON_PARTNER_TAG?: string;
  AMAZON_MARKETPLACE?: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function tokenEndpoint(version: string): string {
  if (version === "3.1") return "https://api.amazon.com/auth/o2/token";
  if (version === "3.2") return "https://api.amazon.co.uk/auth/o2/token";
  if (version === "3.3") return "https://api.amazon.co.jp/auth/o2/token";
  throw new Error("Unsupported Amazon credential version");
}

async function getAccessToken(env: Env): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const clientId = env.AMAZON_CREATORS_CLIENT_ID;
  const clientSecret = env.AMAZON_CREATORS_CLIENT_SECRET;
  const version = env.AMAZON_CREDENTIAL_VERSION || "3.2";

  if (!clientId || !clientSecret) {
    throw new Error("Amazon Creators API secrets are not configured");
  }

  const response = await fetch(tokenEndpoint(version), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "creatorsapi::default",
    }),
  });

  if (!response.ok) {
    throw new Error(`Amazon token request failed: ${response.status}`);
  }

  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Amazon token response had no access token");

  cachedToken = {
    value: data.access_token,
    expiresAt: now + Math.max(60, (data.expires_in || 3600) - 60) * 1000,
  };

  return data.access_token;
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const url = new URL(context.request.url);
  const raw = url.searchParams.get("asins") || "";
  const asins = [...new Set(
    raw.split(",")
      .map((value) => value.trim().toUpperCase())
      .filter((value) => /^[A-Z0-9]{10}$/.test(value))
  )].slice(0, 10);

  if (!asins.length) {
    return Response.json({ items: [], error: "Provide at least one ASIN." }, { status: 400 });
  }

  const partnerTag = context.env.AMAZON_PARTNER_TAG;
  const marketplace = context.env.AMAZON_MARKETPLACE || "www.amazon.in";

  if (!partnerTag) {
    return Response.json({ items: [], error: "Amazon Partner Tag is not configured." }, { status: 503 });
  }

  try {
    const token = await getAccessToken(context.env);

    const response = await fetch("https://creatorsapi.amazon/catalog/v1/getItems", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": marketplace,
      },
      body: JSON.stringify({
        itemIds: asins,
        itemIdType: "ASIN",
        marketplace,
        partnerTag,
        resources: [
          "images.primary.large",
          "images.variants.large",
          "itemInfo.title",
          "itemInfo.features",
          "browseNodeInfo.browseNodes",
          "offersV2.listings.price",
        ],
      }),
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return Response.json(
        { items: [], error: data?.message || "Amazon Creators API request failed." },
        { status: response.status }
      );
    }

    const items = (data?.itemResults?.items || []).map((item: any) => {
      const images: string[] = [];
      const primary = item?.images?.primary?.large?.url;
      if (primary) images.push(primary);

      for (const variant of item?.images?.variants || []) {
        const image = variant?.large?.url;
        if (image && !images.includes(image)) images.push(image);
      }

      const listing = item?.offersV2?.listings?.[0];
      const price = listing?.price?.money?.displayAmount || "";
      const category =
        item?.browseNodeInfo?.browseNodes?.[0]?.displayName || "Home";

      const features =
        item?.itemInfo?.features?.displayValues ||
        item?.itemInfo?.features?.displayValue ||
        [];

      return {
        asin: item.asin,
        name: item?.itemInfo?.title?.displayValue || item.asin,
        category,
        price,
        description: Array.isArray(features) ? features.join(" ") : String(features || ""),
        images,
        affiliateUrl: item.detailPageURL || `https://www.amazon.in/dp/${item.asin}?tag=${partnerTag}`,
      };
    });

    return new Response(JSON.stringify({ items }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { items: [], error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 503 }
    );
  }
}
