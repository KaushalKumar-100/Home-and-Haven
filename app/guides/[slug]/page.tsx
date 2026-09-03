import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import RelatedProducts from "@/app/components/RelatedProducts";
import { guides } from "@/data/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  return {
    title: guide.title,
    description: guide.intro,
    openGraph: {
      title: guide.title,
      description: guide.intro,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;

  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center">
        <Link
          href="/guides"
          className="text-sm text-[#777269] transition hover:text-[#292722]"
        >
          ← Back to Guides
        </Link>

        <div className="mt-8">
          <span className="text-4xl">{guide.emoji}</span>

          <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[#8b806f]">
            {guide.category} · {guide.readTime}
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {guide.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#716d64]">
            {guide.intro}
          </p>
        </div>

        {/* Hero image */}
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem]">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        {/* Article sections */}
        {guide.sections.map((section) => (
          <section
            key={section.heading}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {section.heading}
            </h2>

            <div className="mt-5 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-[#716d64] md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Related Products */}
        <RelatedProducts
          productIds={guide.relatedProducts}
        />

        {/* Final CTA */}
        <div className="mt-16 rounded-[2rem] border border-[#e8e4dc] bg-white p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b806f]">
            Home & Haven
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Looking for more products to complete the look?
          </h2>

          <p className="mt-4 leading-7 text-[#716d64]">
            Explore our carefully selected home finds for practical
            and beautiful additions to your space.
          </p>

          <Link
            href="/best-picks"
            className="mt-6 inline-flex rounded-full bg-[#292722] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4a4740]"
          >
            Explore Our Best Picks →
          </Link>

          {/* Affiliate Disclosure */}
          <p className="mt-5 text-xs leading-5 text-[#8b877f]">
            This website may contain affiliate links. If you purchase
            through one of our links, we may earn a small commission
            at no additional cost to you.
          </p>
        </div>
      </article>
    </main>
  );
}