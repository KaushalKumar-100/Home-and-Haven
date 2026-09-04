export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  emoji: string;
  images: string[];
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
    images: ["/products/minimalist-vase.jpg",],
    affiliateUrl: "#",
    featured: true,
    badge: "Editor's Pick",
  },

 {
  id: "decorative-table-lamp",
  name: "FLYNGO Touch Control LED Night Light Table Lamp",
  category: "lighting",
  price: "₹345",
  originalPrice: "₹999",
  description:
    "A touch-control LED night light table lamp with adjustable brightness and USB rechargeable design, suitable for bedrooms, living rooms, studies, and other indoor spaces.",
  emoji: "💡",
  images: ["FLYNGO Touch Control LED Night Light Table Lamp",
            'FLYNGO Touch Control LED Night Light Table Lamp1',
            'FLYNGO Touch Control LED Night Light Table Lamp2',
            'FLYNGO Touch Control LED Night Light Table Lamp3'
  ],
  affiliateUrl: "https://link.amazon/B05eMAnYg",
  featured: true,//top pick
  badge: "Amazon's Choice",
  retailer: "Amazon.in",
  rating: 4.1,
  reviewCount: 1589,
  tags: [
    "night light",
    "table lamp",
    "LED lamp",
    "touch control lamp",
    "bedroom lighting",
    "rechargeable lamp",
    "home lighting",
  ],
},
  {
    id: "bamboo-kitchen-organizer",
    name: "Bamboo Kitchen Organizer",
    category: "kitchen",
    price: "₹649",
    description:
      "A practical bamboo organizer for keeping kitchen counters, drawers, and cabinets neat.",
    emoji: "🍳",
    images: ["/products/kitchen-organizer.jpg",],
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
    images:[ "/products/bedside-table.jpg",],
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
    images: ["/products/storage-box.jpg",],
    affiliateUrl: "#",
    featured: false,
  },

{
  id: "decorative-wall-mirror",
  name: "Round Wall Mirror in Gold – 18 Inch",
  category: "home-decor",
  price: "₹998",
  originalPrice: "₹4,199",
  description:
    "A modern 18-inch round wall mirror with a gold metal frame, designed for bathrooms, bedrooms, drawing rooms, and other home spaces.",
  emoji: "🪞",
  images:["/products/wall-mirror.jpg",],
  affiliateUrl: "https://link.amazon/B0dLG3gm1",
  featured: false,
  badge: "Popular Pick",
  retailer: "Amazon.in",
  rating: 4.4,
  reviewCount: 73,
  tags: [
    "wall mirror",
    "round mirror",
    "gold mirror",
    "home decor",
    "bedroom decor",
    "bathroom decor",
  ],
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
  images: ["/products/birch-wall-decor.jpg",],
  affiliateUrl: "https://link.amazon/B0imSBni5",
  featured: true,
  badge: "Budget Pick",
  retailer: "Amazon.in",
  rating: 4.3,
  reviewCount: 1344,
  tags: ["wall decor", "home decor", "rustic decor", "bedroom decor"],
},
];