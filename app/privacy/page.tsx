import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Home & Haven.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
          Legal
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-5 text-sm text-[#777269]">
          Last updated: September 2026
        </p>

        <div className="mt-12 space-y-10 leading-8 text-[#5f5a52]">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              1. About this policy
            </h2>
            <p>
              Home & Haven ("we", "us", or "our") operates this website to
              provide home inspiration, guides, and product recommendations.
              This Privacy Policy explains what information may be collected
              when you use our website and how it may be used.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              2. Information we collect
            </h2>
            <p>
              We do not require an account to browse Home & Haven and we do
              not intentionally collect sensitive personal information through
              the website. Depending on how you interact with the site,
              technical information such as your IP address, browser type,
              device information, referring page, and basic usage information
              may be processed by hosting, security, analytics, or other
              service providers that support the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              3. Contact information
            </h2>
            <p>
              If you contact us, we may receive the information you choose to
              provide, such as your name, email address, and the contents of
              your message. We use that information to respond to your
              request and communicate with you about your inquiry.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              4. Cookies and similar technologies
            </h2>
            <p>
              Home & Haven may use cookies or similar technologies where
              necessary for website operation, security, analytics, or
              measuring referrals. Third-party services used by the website
              may also set their own cookies or similar technologies subject
              to their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              5. Affiliate links and third-party websites
            </h2>
            <p>
              Some product links on Home & Haven are affiliate links. When you
              follow an affiliate link, you may be redirected to a third-party
              retailer. Those websites have their own privacy policies and
              terms, and information you provide to them is governed by their
              policies rather than this one. We do not control the privacy
              practices of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              6. How information is used
            </h2>
            <p>
              Information may be used to operate and secure the website,
              respond to inquiries, understand website usage, improve our
              content and services, prevent abuse, and maintain the site's
              functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              7. Data sharing
            </h2>
            <p>
              We may use service providers that help us host, secure, analyze,
              or operate the website. We may also disclose information when
              required by applicable law or when reasonably necessary to
              protect the rights, safety, and security of the website and its
              users. We do not sell personal information simply because you
              visit Home & Haven.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              8. Data security and retention
            </h2>
            <p>
              We take reasonable measures to protect information handled
              through the website. No method of transmission or storage is
              completely secure. Information is retained only for as long as
              reasonably necessary for the purpose for which it was collected,
              to provide services, resolve disputes, comply with legal
              obligations, or protect our legitimate interests.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              9. Your choices and rights
            </h2>
            <p>
              Depending on where you live, you may have rights concerning your
              personal information, including rights to access, correct,
              delete, or object to certain processing. To ask a privacy
              question or make a request, please use our{" "}
              <a
                href="/contact"
                className="font-medium underline underline-offset-4"
              >
                Contact page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              10. Children
            </h2>
            <p>
              Home & Haven is not directed at children under the age required
              by applicable law, and we do not knowingly request sensitive
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              11. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will update the "Last updated" date on this page. Your
              continued use of the website after an update means the revised
              policy applies to your use of the site, subject to applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#292722]">
              12. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy or how Home &
              Haven handles information, please contact us through the{" "}
              <a
                href="/contact"
                className="font-medium underline underline-offset-4"
              >
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
