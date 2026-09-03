import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8b806f]">
            About Home & Haven
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            A better way to discover things for your home.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#716d64]">
            Home & Haven is a home inspiration and product discovery
            website created to help people find beautiful, practical, and
            useful ideas for everyday living.
          </p>
        </div>

        <div className="mt-20 space-y-14">
          <section>
            <h2 className="text-2xl font-semibold">
              What we believe
            </h2>

            <p className="mt-4 leading-8 text-[#716d64]">
              Your home doesn't need to be perfect to feel beautiful.
              Thoughtful choices, useful products, and a little
              inspiration can make a meaningful difference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              What you'll find here
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ["🪴", "Home inspiration"],
                ["✨", "Curated finds"],
                ["📖", "Practical guides"],
              ].map(([emoji, title]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#e8e4dc] bg-white p-7"
                >
                  <div className="text-4xl">{emoji}</div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Our approach
            </h2>

            <p className="mt-4 leading-8 text-[#716d64]">
              We aim to make discovering home products easier by
              organizing ideas into useful categories and guides rather
              than overwhelming visitors with endless choices.
            </p>
          </section>

          <section className="rounded-3xl bg-[#eee9df] p-8 md:p-10">
            <h2 className="text-2xl font-semibold">
              Have a question?
            </h2>

            <p className="mt-3 leading-7 text-[#716d64]">
              We'd love to hear from you.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-[#292722] px-6 py-3 text-sm font-medium text-white"
            >
              Contact us →
            </Link>
          </section>
        </div>
      </section>

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