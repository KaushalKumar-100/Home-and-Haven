import Navbar from "../components/Navbar";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#8b806f]">
          Legal
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Terms of Use
        </h1>

        <p className="mt-5 text-sm text-[#777269]">
          Last updated: September 2026
        </p>

        <div className="mt-12 space-y-10 leading-8 text-[#5f5a52]">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Home & Haven, you agree to these Terms of
              Use. If you do not agree with these terms, please do not use the
              website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              2. Website Content
            </h2>
            <p>
              Home & Haven provides home, lifestyle, shopping, and
              informational content for general purposes. We make reasonable
              efforts to keep information useful and accurate, but we do not
              guarantee that all information will always be complete or
              current.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              3. Product Information
            </h2>
            <p>
              Product descriptions, prices, availability, and other details
              may change. When you follow a product link to another website,
              the third-party retailer's terms and policies apply.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              4. Affiliate Links
            </h2>
            <p>
              Some links on Home & Haven may be affiliate links. If you make a
              qualifying purchase through an affiliate link, we may receive a
              commission at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              5. Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, website content created for Home &
              Haven, including text, branding, graphics, and original
              materials, belongs to Home & Haven and should not be reproduced
              without permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              6. Third-Party Websites
            </h2>
            <p>
              Our website may link to external websites. We do not control
              those websites and are not responsible for their content,
              availability, policies, or services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              7. Limitation of Liability
            </h2>
            <p>
              Home & Haven is provided on an "as is" basis. To the extent
              permitted by applicable law, we are not responsible for losses or
              damages arising from your use of the website or third-party
              websites linked from it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              8. Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Use from time to time. Any changes
              will be reflected on this page with an updated date.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}