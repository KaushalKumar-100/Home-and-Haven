import Navbar from "@/app/components/Navbar";

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
          Transparency
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Affiliate Disclosure
        </h1>

        <div className="mt-10 space-y-8 leading-8 text-[#716d64]">
          <p>
            Some of the links on Home & Haven may be affiliate links.
            This means that if you click a qualifying link and make a
            purchase, we may receive a commission at no additional cost
            to you.
          </p>

          <p>
            Our goal is to provide useful information and product
            recommendations. Affiliate relationships do not change our
            intention to create helpful content for our readers.
          </p>

          <p>
            Product prices, availability, features, and other details may
            change over time. Always verify current information on the
            retailer's website before making a purchase.
          </p>

          <p>
            We may participate in affiliate programs offered by retailers
            and other companies. Specific disclosures may also appear
            near individual affiliate links where appropriate.
          </p>
        </div>
      </article>

      <footer className="border-t border-[#e8e4dc] bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs text-[#99948b]">
            © 2026 Home & Haven. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}