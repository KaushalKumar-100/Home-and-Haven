import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";

export function generateStaticParams() {
  return [
    { category: "home-decor" },
    { category: "kitchen" },
    { category: "bedroom" },
    { category: "organization" },
    { category: "lighting" },
  ];
}


const categoryData: Record<

  string,
  {
    title: string;
    description: string;
    emoji: string;
  }
> = {
  "home-decor": {
    title: "Home Decor",
    description:
      "Beautiful pieces and thoughtful accents to make your space feel like home.",
    emoji: "🪴",
  },

  kitchen: {
    title: "Kitchen",
    description:
      "Practical and beautiful finds that make everyday cooking easier.",
    emoji: "🍳",
  },

  bedroom: {
    title: "Bedroom",
    description:
      "Create a calm, comfortable bedroom you'll love coming home to.",
    emoji: "🛏️",
  },

  organization: {
    title: "Organization",
    description:
      "Smart storage and organization ideas for a cleaner, calmer home.",
    emoji: "🧺",
  },

  lighting: {
    title: "Lighting",
    description:
      "Create the perfect atmosphere with beautiful and functional lighting.",
    emoji: "💡",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const data = categoryData[category];

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] text-[#292722]">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">
            Category not found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block underline underline-offset-4"
          >
            ← Return home
          </Link>
        </div>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      {/* Header */}
      <Navbar />

      {/* Category Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eee9df] text-5xl">
            {data.emoji}
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#8b806f]">
            Explore
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
            {data.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#716d64]">
            {data.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-[#e8e4dc] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
                Curated for you
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                {data.title} finds
              </h2>
            </div>

            <p className="text-sm text-[#777269]">
              {categoryProducts.length}{" "}
              {categoryProducts.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d8d2c7] p-16 text-center">
              <div className="text-5xl">{data.emoji}</div>

              <h3 className="mt-5 text-2xl font-semibold">
                Products coming soon
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777269]">
                We're carefully selecting products for this
                collection. Check back soon for our recommendations.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10">
        <div className="mx-auto max-w-7xl border-t border-[#e8e4dc] pt-6">
          <p className="text-xs text-[#99948b]">
            © 2026 Home & Haven. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}