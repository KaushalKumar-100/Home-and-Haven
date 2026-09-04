import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/app/components/ProductGallery";
import { products } from "@/data/products";
import AmazonDisclosure from "@/app/components/AmazonDisclosure";
import AffiliateButton from "@/app/components/AffiliateButton";
import Image from "next/image";
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#777269]">
          <Link
            href="/"
            className="transition hover:text-[#292722]"
          >
            Home
          </Link>

          <span>→</span>

          <Link
            href={`/shop/${product.category}`}
            className="capitalize transition hover:text-[#292722]"
          >
            {product.category.replace("-", " ")}
          </Link>

          <span>→</span>

          <span className="text-[#292722]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 md:grid-cols-2 md:items-center">
        {/* Image */}
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        {/* Details */}
        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-[#e8e4dc] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6f685d]">
              {product.badge}
            </span>
          )}

          <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[#8b806f]">
            {product.category.replace("-", " ")}
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-2xl font-medium">
            {product.price}
          </p>

          <p className="mt-6 text-lg leading-8 text-[#716d64]">
            {product.description}
          </p>

          {/* Why we like it */}
          <div className="mt-8 rounded-[1.5rem] border border-[#e8e4dc] bg-white p-6">
            <h2 className="text-lg font-semibold">
              Why we like it
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#716d64]">
              <li>✓ Simple and versatile design</li>
              <li>✓ Works well with different home styles</li>
              <li>✓ Practical for everyday use</li>
              <li>✓ Easy way to refresh your space</li>
            </ul>
          </div>

          {/* Affiliate CTA */}
          <div className="mt-8">
            <AffiliateButton
              affiliateUrl={product.affiliateUrl}
            />
            <div className="mt-3">
              <AmazonDisclosure />
            </div>

            <p className="mt-4 text-xs leading-5 text-[#8b877f]">
              Prices and availability may change. Please check the
              retailer's website for the latest information.
            </p>

            <p className="mt-3 text-xs leading-5 text-[#8b877f]">
              This page may contain affiliate links. If you purchase
              through one of our links, we may earn a small commission
              at no additional cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#e8e4dc] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b806f]">
                You May Also Like
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                More {product.category.replace("-", " ")} Finds
              </h2>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-[#e8e4dc] bg-[#faf9f6]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold">
                      {relatedProduct.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#716d64]">
                      {relatedProduct.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-[#292722] px-6 py-20 text-center text-white">
        <p className="text-sm uppercase tracking-[0.18em] text-[#d4cec3]">
          Home & Haven
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
          Find more beautiful ideas for your home.
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#c9c4bb]">
          Explore our guides and carefully selected home finds to
          create a space that feels like you.
        </p>

        <Link
          href="/guides"
          className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#292722] transition hover:bg-[#eeeae3]"
        >
          Explore Our Guides →
        </Link>
      </section>
    </main>
  );
}