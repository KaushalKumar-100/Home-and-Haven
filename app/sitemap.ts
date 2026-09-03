import type { MetadataRoute } from "next";
import { products } from "../data/products";

const guides = [
  "cozy-bedroom-ideas",
  "small-kitchen-organization",
  "minimalist-home-decor",
  "small-space-storage",
  "warm-home-lighting",
  "home-decor-budget",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/best-picks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // Shop categories
    ...[
      "home-decor",
      "kitchen",
      "bedroom",
      "organization",
      "lighting",
    ].map((category) => ({
      url: `${baseUrl}/shop/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...guidePages,
    ...productPages,
  ];
}