export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  emoji: string;
  image: string;
  intro: string;
  sections: GuideSection[];
  relatedProducts: string[];
};

export const guides: Guide[] = [
  {
    slug: "cozy-bedroom-ideas",
    title: "15 Simple Ideas to Make Your Bedroom Feel Cozy",
    category: "Bedroom",
    readTime: "6 min read",
    emoji: "🛏️",
    image: "/guides/cozy-bedroom.jpg",
    intro:
      "Your bedroom should feel like a place where you can slow down, relax, and recharge. You don't need an expensive makeover to create a cozy atmosphere.",
    sections: [
      {
        heading: "1. Use warm and soft lighting",
        paragraphs: [
          "Replace harsh overhead lighting with warm bedside lamps, floor lamps, or small accent lights.",
          "Warm lighting instantly makes a bedroom feel calmer and more comfortable, especially in the evening.",
        ],
      },
      {
        heading: "2. Layer your bedding",
        paragraphs: [
          "Start with comfortable sheets and add a duvet, quilt, blanket, or throw.",
          "Different textures make the bed look more inviting while also giving you flexibility throughout the year.",
        ],
      },
      {
        heading: "3. Add soft textures",
        paragraphs: [
          "Introduce softness through rugs, cushions, curtains, blankets, and upholstered furniture.",
          "You don't need many pieces. A few carefully chosen textures can make a noticeable difference.",
        ],
      },
      {
        heading: "4. Keep the color palette calm",
        paragraphs: [
          "Neutral shades such as cream, beige, warm white, soft brown, and muted green can create a relaxing environment.",
          "Use one or two accent colors rather than filling the room with too many competing shades.",
        ],
      },
      {
        heading: "5. Keep the room clutter-free",
        paragraphs: [
          "A cozy bedroom doesn't have to be filled with decorations.",
          "Keep everyday items organized and give important surfaces such as your bedside table some breathing room.",
        ],
      },
    ],
    relatedProducts: [
  "bedside-storage-table",
  "decorative-table-lamp",
],
  },

  {
    slug: "small-kitchen-organization",
    title: "Small Kitchen Organization Ideas",
    category: "Kitchen",
    readTime: "7 min read",
    emoji: "🍳",
    image: "/guides/small-kitchen.jpg",
    intro:
      "A small kitchen can still be functional and beautiful. The key is to make better use of the space you already have.",
    sections: [
      {
        heading: "1. Use vertical space",
        paragraphs: [
          "Walls and cabinet doors are often overlooked storage areas.",
          "Hooks, shelves, and hanging organizers can help keep frequently used items accessible without taking up valuable counter space.",
        ],
      },
      {
        heading: "2. Organize drawers by category",
        paragraphs: [
          "Instead of placing everything into one drawer, group similar items together.",
          "Use simple dividers to separate utensils, cooking tools, and other small kitchen essentials.",
        ],
      },
      {
        heading: "3. Make your counters intentional",
        paragraphs: [
          "Keep only the appliances and objects you use regularly on your countertop.",
          "Everything else can be stored in cabinets, drawers, or dedicated organizers.",
        ],
      },
      {
        heading: "4. Use clear storage containers",
        paragraphs: [
          "Clear containers make it easier to see what you already have.",
          "They can also create a cleaner and more consistent visual appearance inside cabinets and pantries.",
        ],
      },
    ],
    relatedProducts: [
  "bamboo-kitchen-organizer",
  "foldable-storage-box",
],
  },

  {
    slug: "minimalist-home-decor",
    title: "Minimalist Home Decor Ideas",
    category: "Home Decor",
    readTime: "6 min read",
    emoji: "🏡",
    image: "/guides/minimalist-home.jpg",
    intro:
      "Minimalist home decor is less about owning as little as possible and more about making intentional choices about what belongs in your space.",
    sections: [
      {
        heading: "1. Start with a simple color palette",
        paragraphs: [
          "Choose a small number of complementary colors for the main areas of your home.",
          "Neutral colors provide a calm foundation and allow selected decorative pieces to stand out.",
        ],
      },
      {
        heading: "2. Choose fewer, better pieces",
        paragraphs: [
          "Instead of filling every empty surface, choose objects that are useful, beautiful, or meaningful to you.",
          "This creates a cleaner visual environment without making your home feel empty.",
        ],
      },
      {
        heading: "3. Mix materials and textures",
        paragraphs: [
          "Minimalist spaces can become flat when everything looks identical.",
          "Wood, ceramic, linen, glass, metal, and natural fibers can add visual interest while keeping the overall design simple.",
        ],
      },
      {
        heading: "4. Leave some empty space",
        paragraphs: [
          "Negative space is an important part of minimalist design.",
          "Allowing some surfaces and areas to remain open can make the entire room feel more intentional.",
        ],
      },
    ],
    relatedProducts: [
  "minimalist-ceramic-vase",
  "decorative-wall-mirror",
  "decorative-table-lamp",
],
  },

  {
    slug: "small-space-storage",
    title: "Small Space Storage Ideas That Actually Work",
    category: "Organization",
    readTime: "7 min read",
    emoji: "📦",
    image: "/guides/small-space-storage.jpg",
    intro:
      "When space is limited, organization becomes even more important. Smart storage can help you keep your home functional without making it feel crowded.",
    sections: [
      {
        heading: "1. Look for unused areas",
        paragraphs: [
          "The space underneath beds, behind doors, above cabinets, and inside furniture can often provide additional storage.",
          "Before buying new furniture, look at how you can use these overlooked areas.",
        ],
      },
      {
        heading: "2. Choose multifunctional furniture",
        paragraphs: [
          "Furniture that performs more than one job can be extremely useful in smaller homes.",
          "Storage beds, ottomans, benches, and bedside tables with drawers can combine functionality with design.",
        ],
      },
      {
        heading: "3. Use matching storage containers",
        paragraphs: [
          "Consistent storage boxes and baskets can make open shelving look more organized.",
          "Label containers when necessary so frequently used items remain easy to find.",
        ],
      },
      {
        heading: "4. Store vertically",
        paragraphs: [
          "Tall shelving can provide significant storage without taking much floor space.",
          "Use the upper shelves for items you don't need every day.",
        ],
      },
    ],
    relatedProducts: [
  "foldable-storage-box",
  "bedside-storage-table",
],
  },

  {
    slug: "warm-home-lighting",
    title: "How to Create Warm and Cozy Home Lighting",
    category: "Lighting",
    readTime: "6 min read",
    emoji: "💡",
    image: "/guides/warm-lighting.jpg",
    intro:
      "Good lighting can completely change how a room feels. A combination of ambient, task, and accent lighting can create a warm and comfortable home.",
    sections: [
      {
        heading: "1. Don't rely on one light source",
        paragraphs: [
          "A single ceiling light can make a room feel flat and overly bright.",
          "Instead, combine different light sources around the room.",
        ],
      },
      {
        heading: "2. Add bedside lighting",
        paragraphs: [
          "Bedside lamps provide useful light while creating a softer atmosphere.",
          "They are particularly helpful for reading and winding down before sleep.",
        ],
      },
      {
        heading: "3. Use accent lighting",
        paragraphs: [
          "Small lamps and decorative lights can highlight shelves, artwork, plants, or architectural features.",
          "Accent lighting can also create visual depth in the room.",
        ],
      },
      {
        heading: "4. Think about the color temperature",
        paragraphs: [
          "Warm-toned light generally creates a more relaxed atmosphere than cool, bright light.",
          "Consider warmer lighting for bedrooms, living rooms, and other relaxing spaces.",
        ],
      },
    ],
    relatedProducts: [
  "decorative-table-lamp",
],
  },

  {
    slug: "home-decor-budget",
    title: "Budget-Friendly Home Decor Ideas",
    category: "Home Decor",
    readTime: "7 min read",
    emoji: "💰",
    image: "/guides/budget-home-decor.jpg",
    intro:
      "Creating a beautiful home doesn't require a huge budget. Small, intentional changes can have a surprisingly large visual impact.",
    sections: [
      {
        heading: "1. Start with what you already own",
        paragraphs: [
          "Before buying anything new, rearrange furniture and decorative objects you already have.",
          "Changing the layout can make a room feel completely different without spending money.",
        ],
      },
      {
        heading: "2. Focus on high-impact pieces",
        paragraphs: [
          "A mirror, lamp, rug, vase, or set of cushions can change the character of a room.",
          "Choose a few pieces that complement your existing space rather than buying many unrelated items.",
        ],
      },
      {
        heading: "3. Add plants",
        paragraphs: [
          "Plants can introduce color, texture, and life into a room.",
          "Choose varieties that suit your available light and the amount of care you're comfortable providing.",
        ],
      },
      {
        heading: "4. Shop intentionally",
        paragraphs: [
          "Make a list before shopping and decide which items will genuinely improve your space.",
          "Comparing products and prices can help you avoid unnecessary purchases.",
        ],
      },
    ],
    relatedProducts: [
  "minimalist-ceramic-vase",
  "foldable-storage-box",
  "decorative-table-lamp",
],
  },
];