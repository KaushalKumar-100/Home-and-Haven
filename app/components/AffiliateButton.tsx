"use client";

type AffiliateButtonProps = {
  affiliateUrl: string;
};

export default function AffiliateButton({
  affiliateUrl,
}: AffiliateButtonProps) {
  const isConfigured =
    affiliateUrl && affiliateUrl !== "#";

  if (!isConfigured) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center rounded-full bg-[#e8e4dc] px-7 py-3.5 text-sm font-medium text-[#8b877f] cursor-not-allowed"
      >
        Product Link Coming Soon
      </button>
    );
  }

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-[#292722] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#4a4740]"
    >
      Check Product →
    </a>
  );
}