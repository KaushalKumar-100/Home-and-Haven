export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  emoji: string;
  image: string[];
  affiliateUrl: string;
  featured: boolean;
  badge?: string;

  // Affiliate/product information
  retailer?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: "minimalist-ceramic-vase",
    name: "Minimalist Ceramic Vase",
    category: "home-decor",
    price: "₹799",
    description:
      "A simple ceramic vase that adds a calm, modern touch to shelves, tables, and bedside spaces.",
    emoji: "🏺",
    image: ["/products/minimalist-vase.jpg"],
    affiliateUrl: "#",
    featured: true,
    badge: "Editor's Pick",
  },

  {
    id: "decorative-table-lamp",
    name: "Decorative Table Lamp",
    category: "lighting",
    price: "₹1,299",
    description:
      "A warm decorative lamp designed to create a cozy atmosphere in bedrooms, living rooms, and reading corners.",
    emoji: "💡",
    image:[ "/products/table-lamp.jpg"],
    affiliateUrl: "#",
    featured: true,
    badge: "Popular",
  },

  {
    id: "bamboo-kitchen-organizer",
    name: "Bamboo Kitchen Organizer",
    category: "kitchen",
    price: "₹649",
    description:
      "A practical bamboo organizer for keeping kitchen counters, drawers, and cabinets neat.",
    emoji: "🍳",
    image: ["/products/kitchen-organizer.jpg"],
    affiliateUrl: "#",
    featured: true,
    badge: "Best Value",
  },

  {
    id: "bedside-storage-table",
    name: "Bedside Storage Table",
    category: "bedroom",
    price: "₹1,899",
    description:
      "A compact bedside table that combines useful storage with a clean, minimalist design.",
    emoji: "🛏️",
    image:[ "/products/bedside-table.jpg"],
    affiliateUrl: "#",
    featured: true,
  },

  {
    id: "foldable-storage-box",
    name: "Foldable Storage Box",
    category: "organization",
    price: "₹499",
    description:
      "A space-saving storage solution for clothes, accessories, toys, documents, and everyday items.",
    emoji: "📦",
    image: ["/products/storage-box.jpg"],
    affiliateUrl: "#",
    featured: false,
  },

  {
    id: "decorative-wall-mirror",
    name: "Decorative Wall Mirror",
    category: "home-decor",
    price: "₹1,499",
    description:
      "A decorative wall mirror that can make smaller spaces feel brighter, larger, and more refined.",
    emoji: "🪞",
    image: ["/products/wall-mirror.jpg"],
    affiliateUrl: "#",
    featured: true,
    badge: "Trending",
  },
  {
  id: "birch-co-wall-decor",
  name: "Birch & Co. Retro Wall Decor – 6 Piece Set",
  category: "home-decor",
  price: "₹189",
  originalPrice: "₹599",
  description:
    "A rustic 6-piece wall decor set with motivational messages, designed to add character to living rooms, bedrooms, and other cozy spaces.",
  emoji: "🪵",
  image: ["/products/birch-wall-decor.jpg"],
  affiliateUrl: "https://link.amazon/B0imSBni5",
  featured: true,
  badge: "Budget Pick",
  retailer: "Amazon.in",
  rating: 4.3,
  reviewCount: 1344,
  tags: ["wall decor", "home decor", "rustic decor", "bedroom decor"],
},
];