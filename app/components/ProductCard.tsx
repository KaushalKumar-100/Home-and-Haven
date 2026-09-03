import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden bg-[#eee9df]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#99948b]">
          {product.category.replace("-", " ")}
        </p>

        <h3 className="mt-2 text-xl font-semibold">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#777269]">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-semibold">
            {product.price}
          </span>

          <Link
            href={`/products/${product.id}`}
            className="rounded-full bg-[#292722] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}