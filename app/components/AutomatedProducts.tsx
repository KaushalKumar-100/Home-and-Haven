"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type AutomatedProduct = {
  asin: string;
  name: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  affiliateUrl: string;
};

export default function AutomatedProducts({ asins }: { asins: string[] }) {
  const [items, setItems] = useState<AutomatedProduct[]>([]);

  useEffect(() => {
    if (!asins.length) return;

    fetch(`/api/amazon-products?asins=${encodeURIComponent(asins.join(","))}`)
      .then((response) => (response.ok ? response.json() : { items: [] }))
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, [asins]);

  if (!items.length) return null;

  return (
    <section className="border-y border-[#e8e4dc] bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8b806f]">
            Latest finds
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Fresh Home Finds
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777269]">
            Product information and availability are retrieved from Amazon.
            Prices and availability can change.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((product) => (
            <a
              key={product.asin}
              href={product.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group overflow-hidden rounded-3xl border border-[#e8e4dc] bg-[#faf9f6] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-72 overflow-hidden bg-[#eee9df]">
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.15em] text-[#8b806f]">
                  {product.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
                {product.price && (
                  <p className="mt-4 text-lg font-semibold">{product.price}</p>
                )}
                <p className="mt-4 text-sm leading-6 text-[#777269]">
                  {product.description}
                </p>
                <p className="mt-6 text-sm font-medium underline underline-offset-4">
                  View on Amazon →
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs leading-5 text-[#8b877f]">
          CERTAIN CONTENT THAT APPEARS ON THIS SITE COMES FROM AMAZON SELLER
          SERVICES PRIVATE LIMITED. THIS CONTENT IS PROVIDED “AS IS” AND IS
          SUBJECT TO CHANGE OR REMOVAL AT ANY TIME.
        </p>
      </div>
    </section>
  );
}
