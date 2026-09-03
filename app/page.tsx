import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { products } from "@/data/products";

const categories = [
  {
    name: "Home Decor",
    description: "Beautiful pieces for every corner",
    emoji: "🪴",
    href: "/shop/home-decor",
  },
  {
    name: "Kitchen",
    description: "Smart finds for your kitchen",
    emoji: "🍳",
    href: "/shop/kitchen",
  },
  {
    name: "Bedroom",
    description: "Create your perfect retreat",
    emoji: "🛏️",
    href: "/shop/bedroom",
  },
  {
    name: "Organization",
    description: "Simple ways to stay organized",
    emoji: "🧺",
    href: "/shop/organization",
  },
  {
    name: "Lighting",
    description: "Warm light for a beautiful home",
    emoji: "💡",
    href: "/shop/lighting",
  },
];

const articles = [
  {
    number: "01",
    category: "Bedroom",
    title: "15 Simple Ideas to Make Your Bedroom Feel Cozy",
    description:
      "Simple ways to make your bedroom warmer, calmer, and more comfortable.",
    href: "/guides/cozy-bedroom-ideas",
    image: "/guides/cozy-bedroom.jpg",
  },
  {
    number: "02",
    category: "Kitchen",
    title: "10 Small Kitchen Organization Ideas",
    description:
      "Smart storage ideas to make a small kitchen feel more spacious and functional.",
    href: "/guides/small-kitchen-organization",
    image: "/guides/small-kitchen.jpg",
  },
  {
    number: "03",
    category: "Home Decor",
    title: "How to Create a Beautiful Minimalist Home",
    description:
      "Create a peaceful home with fewer, better, and more intentional decor choices.",
    href: "/guides/minimalist-home-decor",
    image: "/guides/minimalist-home.jpg",
  },
];

const featuredProducts = products
  .filter((product) => product.featured)
  .slice(0, 3);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-[#8b806f]">
              Welcome to Home & Haven
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Beautiful Ideas for a Home You Love
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#716d64]">
              Discover thoughtful home decor ideas, practical organization
              tips, cozy bedroom inspiration, kitchen solutions, and carefully
              selected home finds to help you create a space that feels like
              you.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#featured"
                className="rounded-full bg-[#292722] px-7 py-3.5 text-sm font-medium text-white transition hover:opacity-80"
              >
                Explore Home Finds
              </Link>

              <Link
                href="#guides"
                className="rounded-full border border-[#cfcac0] px-7 py-3.5 text-sm font-medium transition hover:bg-white"
              >
                Read Our Guides
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#e9e3d8]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d9d0c1] via-[#eee9df] to-[#c9bba7]" />

            <div className="absolute left-10 top-12 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

            <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#b9a990]/40 blur-3xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl">🪴</div>

                <p className="mt-5 text-sm font-medium uppercase tracking-[0.25em] text-[#766f63]">
                  Beautiful spaces
                </p>

                <p className="mt-2 text-sm text-[#8b806f]">
                  Curated inspiration for your home
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="border-y border-[#e8e4dc] bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-2xl text-[#716d64]">
              Explore simple, beautiful ideas and useful finds for every
              corner of your home.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-[#e8e4dc] p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1eee8] text-4xl transition group-hover:scale-105">
                  {category.emoji}
                </div>

                <h3 className="text-xl font-semibold">{category.name}</h3>

                <p className="mt-2 text-sm leading-6 text-[#777269]">
                  {category.description}
                </p>

                <div className="mt-6 text-sm font-medium">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
                Our selection
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Thoughtfully Selected Home Finds
              </h2>

              <p className="mt-3 max-w-2xl text-[#716d64]">
                A curated selection of simple, functional pieces that can make
                your home feel more comfortable and complete.
              </p>
            </div>

            <Link
              href="/best-picks"
              className="text-sm font-medium underline underline-offset-4"
            >
              View all finds →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-72 overflow-hidden bg-[#eee9df]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#8b806f]">
                    {product.category.replace("-", " ")}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#777269]">
                    {product.description}
                  </p>

                  <p className="mt-5 text-sm font-medium">
                    Discover product →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="bg-[#292722] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[#c9c0b2]">
              Inspiration
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Home Inspiration & Guides
            </h2>

            <p className="mt-4 leading-7 text-[#c8c4bc]">
              Practical ideas for creating a home that feels cozy, organized,
              beautiful, and intentional.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <span className="text-sm text-[#c9c0b2]">
                    {article.number} · {article.category}
                  </span>

                  <h3 className="mt-5 text-xl font-medium leading-7">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#c8c4bc]">
                    {article.description}
                  </p>

                  <div className="mt-7 text-sm underline underline-offset-4">
                    Read guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/guides"
              className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#292722] transition hover:bg-[#f1eee8]"
            >
              Explore All Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
            About Home & Haven
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Thoughtful Finds for Everyday Living
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#716d64]">
            We believe a beautiful home doesn't have to be complicated.
            Home & Haven brings together inspiration, practical ideas, and
            useful products to help you make your space more comfortable,
            organized, and beautiful.
          </p>

          <Link
            href="/about"
            className="mt-7 inline-block text-sm font-medium underline underline-offset-4"
          >
            Learn more about Home & Haven →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-24">
        <div className="rounded-[2rem] bg-[#292722] px-8 py-14 text-center text-white md:px-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Start Creating a Home You Love
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">
            Explore our latest home ideas, organization guides, and carefully
            selected finds for simple and beautiful living.
          </p>

          <Link
            href="/guides"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-[#292722] transition hover:bg-[#f1eee8]"
          >
            Explore Home Guides →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e4dc] bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold">Home & Haven</p>

            <p className="mt-1 text-sm text-[#777269]">
              Inspiration for a home you love.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-[#777269]">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>

            <Link
              href="/affiliate-disclosure"
              className="hover:text-black"
            >
              Affiliate Disclosure
            </Link>

            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-[#e8e4dc] pt-6 text-xs text-[#99948b]">
          © 2026 Home & Haven. All rights reserved.
        </div>
      </footer>
    </main>
  );
}