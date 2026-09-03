import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/data/products";

export default function BestPicksPage() {
  const bestProducts =products.filter((product) => product.featured);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8b806f]">
            Home & Haven Selection
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Our Best Picks
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#716d64]">
            A collection of beautiful, practical, and thoughtfully selected
            home finds we think are worth discovering.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-[#e8e4dc] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
              Curated collection
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Worth a closer look
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777269]">
              We focus on products that combine useful design, attractive
              aesthetics, and everyday practicality.
            </p>
          </div>

          {bestProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bestProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d8d2c7] p-16 text-center">
              <p className="text-lg">
                Our picks are coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
              How we choose
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Less clutter. Better choices.
            </h2>

            <p className="mt-6 leading-8 text-[#716d64]">
              There are thousands of products available online. We want to
              make discovering useful home products easier by highlighting
              things that fit beautifully into everyday spaces.
            </p>

            <p className="mt-4 leading-8 text-[#716d64]">
              Our collections will focus on design, usefulness, value, and
              how well a product fits into a real home.
            </p>
          </div>

          <div className="flex min-h-[380px] items-center justify-center rounded-[2rem] bg-[#eee9df]">
            <div className="text-center">
              <div className="text-8xl">✨</div>

              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#766f63]">
                Carefully selected
              </p>
            </div>
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