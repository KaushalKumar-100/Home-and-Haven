import Navbar from "../components/Navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#8b806f]">
          Legal
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-5 text-sm text-[#777269]">
          Last updated: September 2026
        </p>

        <div className="mt-12 space-y-10 leading-8 text-[#5f5a52]">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              1. Introduction
            </h2>
            <p>
              Welcome to Home & Haven. We respect your privacy and are
              committed to protecting any information you provide while using
              our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              2. Information We Collect
            </h2>
            <p>
              We may collect information that you voluntarily provide, such as
              your name and email address when you contact us or subscribe to
              updates.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              3. How We Use Information
            </h2>
            <p>
              Information may be used to respond to inquiries, improve our
              website, provide requested content, and communicate with users
              who have chosen to receive updates.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              4. Cookies and Analytics
            </h2>
            <p>
              Home & Haven may use cookies, analytics tools, or similar
              technologies to understand website usage and improve the user
              experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              5. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites, including
              retailers and affiliate partners. We are not responsible for the
              privacy practices or content of those websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              6. Data Security
            </h2>
            <p>
              We take reasonable measures to protect information submitted
              through our website. However, no internet transmission or storage
              system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              7. Your Choices
            </h2>
            <p>
              You may contact us if you have questions about information you
              have provided or wish to request changes where applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              8. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact
              us through our Contact page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}