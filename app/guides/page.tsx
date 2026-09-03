import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
const guides = [
  {
    slug: "cozy-bedroom-ideas",
    category: "Bedroom",
    readTime: "5 min read",
    emoji: "🛏️",
    image: "/guides/cozy-bedroom.jpg",
    title: "Cozy Bedroom Ideas",
    description:
      "Simple ways to make your bedroom feel warmer, calmer, and more comfortable.",
  },

  {
    slug: "small-kitchen-organization",
    category: "Kitchen",
    readTime: "6 min read",
    emoji: "🍳",
    image: "/guides/small-kitchen.jpg",
    title: "Small Kitchen Organization",
    description:
      "Smart storage ideas to make a small kitchen feel more spacious and functional.",
  },

  {
    slug: "minimalist-home-decor",
    category: "Home Decor",
    readTime: "5 min read",
    emoji: "🏡",
    image: "/guides/minimalist-home.jpg",
    title: "Minimalist Home Decor",
    description:
      "Create a beautiful, peaceful home with fewer but better decor choices.",
  },

  {
    slug: "small-space-storage",
    category: "Organization",
    readTime: "7 min read",
    emoji: "📦",
    image: "/guides/small-space-storage.jpg",
    title: "Small Space Storage",
    description:
      "Practical storage ideas for making the most of every corner of your home.",
  },

  {
    slug: "warm-home-lighting",
    category: "Lighting",
    readTime: "5 min read",
    emoji: "💡",
    image: "/guides/warm-lighting.jpg",
    title: "Warm Home Lighting",
    description:
      "Simple lighting ideas that can instantly make your home feel warmer and more inviting.",
  },

  {
    slug: "home-decor-budget",
    category: "Home Decor",
    readTime: "6 min read",
    emoji: "💰",
    image: "/guides/budget-home-decor.jpg",
    title: "Home Decor on a Budget",
    description:
      "Beautiful home upgrades that don't require a huge decorating budget.",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8b806f]">
            Home Inspiration
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Guides & Ideas
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#716d64]">
            Practical ideas, decorating inspiration, and useful guides to
            help you create a home you genuinely enjoy living in.
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="border-y border-[#e8e4dc] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="group overflow-hidden rounded-3xl border border-[#e8e4dc] bg-[#faf9f6] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

                <div className="p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#8b806f]">
                      {guide.category}
                    </span>

                    <span className="text-xs text-[#99948b]">
                      {guide.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold leading-7">
                    {guide.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#777269]">
                    {guide.description}
                  </p>

                  <Link
                    href={`/guides/${guide.slug}`}
                    className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
                  >
                    Read guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#292722] px-8 py-14 text-center text-white md:px-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#c9c0b2]">
            Stay inspired
          </p>

          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            More beautiful ideas, less clutter.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#c8c4bc]">
            Discover new home inspiration, useful finds, and practical ideas
            from Home & Haven.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-sm text-[#292722] outline-none"
            />

            <button
              type="button"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#292722] transition hover:opacity-80"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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