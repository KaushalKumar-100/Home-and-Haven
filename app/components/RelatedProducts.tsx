import Link from "next/link";
import Image from "next/image";

import { products } from "@/data/products";

type RelatedProductsProps = {
  productIds: string[];
};

export default function RelatedProducts({
  productIds,
}: RelatedProductsProps) {
  const relatedProducts = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b806f]">
          Shop the Look
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Products We Love
        </h2>

        <p className="mt-3 max-w-2xl text-[#716d64]">
          A few carefully selected products that can help you create a
          similar look or make your space more functional.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-[1.5rem] border border-[#e8e4dc] bg-white"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-5">
              {product.badge && (
                <span className="text-xs font-medium uppercase tracking-wider text-[#8b806f]">
                  {product.badge}
                </span>
              )}

              <h3 className="mt-2 text-lg font-semibold">
                {product.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#716d64]">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-medium">{product.price}</span>

                <Link
                  href={`/products/${product.id}`}
                  className="rounded-full bg-[#292722] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a4740]"
                >
                  View Product →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-[#8b877f]">
        Some product links on Home & Haven may be affiliate links. We may
        earn a small commission if you purchase through them, at no
        additional cost to you.
      </p>
    </section>
  );
}