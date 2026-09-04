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
  {
  slug: "small-living-room-ideas",
  title: "10 Small Living Room Ideas That Feel Spacious",
  category: "Small Spaces",
  readTime: "6 min read",
  emoji: "🛋️",
  image: "/guides/small-living-room.jpg",

  intro:
    "A small living room can still feel open, comfortable, and beautifully styled. These simple ideas can help you make better use of limited space without making the room feel crowded.",

  sections: [
    {
      heading: "1. Choose Furniture That Fits the Room",
      paragraphs: [
        "Start with furniture that matches the scale of your living room. An oversized sofa can quickly make a small space feel cramped.",
        "Look for compact sofas, slim armchairs, and furniture with a smaller visual footprint so there is enough room to move around comfortably.",
      ],
    },
    {
      heading: "2. Keep the Main Walkway Clear",
      paragraphs: [
        "A clear walkway can make a small living room feel much larger. Avoid placing furniture where it blocks the natural path through the room.",
        "Before buying anything new, think about how people will move through the space and leave enough breathing room around larger pieces.",
      ],
    },
    {
      heading: "3. Use Light and Neutral Colors",
      paragraphs: [
        "Light walls, soft neutrals, and natural tones can make a compact living room feel brighter and more open.",
        "You do not need an entirely white room. Beige, warm gray, cream, and soft earthy colors can create the same spacious feeling while adding warmth.",
      ],
    },
    {
      heading: "4. Add a Large Mirror",
      paragraphs: [
        "A strategically placed mirror can reflect light and visually expand a small room.",
        "Try positioning a mirror opposite a window or another light source to make the space feel brighter.",
      ],
    },
    {
      heading: "5. Use Vertical Space",
      paragraphs: [
        "When floor space is limited, look upward. Wall-mounted shelves, tall storage, and vertical artwork can provide useful storage and decoration without taking up much floor area.",
        "Keeping more items off the floor also helps the room feel cleaner and less crowded.",
      ],
    },
    {
      heading: "6. Choose Furniture With Hidden Storage",
      paragraphs: [
        "Storage furniture can help you keep everyday clutter under control while serving more than one purpose.",
        "Look for ottomans, storage benches, baskets, and compact cabinets that can hide items when they are not being used.",
      ],
    },
    {
      heading: "7. Keep Decor Intentional",
      paragraphs: [
        "Small rooms usually benefit from fewer, more intentional decorative pieces rather than lots of small objects.",
        "Choose a few pieces that add personality, such as a vase, framed artwork, mirror, or table lamp.",
      ],
    },
    {
      heading: "8. Use One Larger Rug",
      paragraphs: [
        "A rug that is too small can visually break up an already compact room. A larger rug can help connect the seating area and create a more cohesive look.",
        "Make sure the rug works with the size and arrangement of your furniture before purchasing.",
      ],
    },
    {
      heading: "9. Add Warm Lighting",
      paragraphs: [
        "Good lighting can completely change how a small living room feels, especially in the evening.",
        "Combine general lighting with a table lamp, floor lamp, or accent light to create different levels of warmth throughout the room.",
      ],
    },
    {
      heading: "10. Leave Some Empty Space",
      paragraphs: [
        "You do not have to fill every corner. A little empty space can make a room feel calmer and more sophisticated.",
        "After arranging your furniture and decor, step back and remove anything that feels unnecessary. Sometimes the simplest arrangement works best.",
      ],
    },
  ],

  relatedProducts: [
    "decorative-wall-mirror",
    "decorative-table-lamp",
    "minimalist-ceramic-vase",
  ],
},
{
  slug: "cozy-reading-corner",
  title: "How to Style a Cozy Reading Corner at Home",
  category: "Home Styling",
  readTime: "5 min read",
  emoji: "📚",
  image: "/guides/reading-corner.jpg",

  intro:
    "You don't need a large room to create a relaxing reading corner. With the right chair, lighting, and a few thoughtful details, even an unused corner can become one of the coziest spots in your home.",

  sections: [
    {
      heading: "1. Start With a Comfortable Seat",
      paragraphs: [
        "The most important part of a reading corner is a comfortable place to sit. Choose a compact armchair, lounge chair, or cushioned accent chair that fits naturally into the available space.",
        "Avoid choosing furniture that overwhelms the corner. A smaller chair with a comfortable cushion can create the same inviting feeling while keeping the room open.",
      ],
    },
    {
      heading: "2. Add a Warm Reading Lamp",
      paragraphs: [
        "Good lighting makes a reading corner both practical and inviting. A table lamp or slim floor lamp can provide focused light without taking up too much space.",
        "Warm-toned lighting works especially well in the evening because it creates a relaxed atmosphere while making the corner feel separate from the rest of the room.",
      ],
    },
    {
      heading: "3. Add a Small Side Table",
      paragraphs: [
        "A compact side table gives you a convenient place for books, a cup of tea, glasses, or a small decorative object.",
        "Choose a table that is proportional to your chair. A simple wooden or neutral-toned table can work particularly well with a calm interior.",
      ],
    },
    {
      heading: "4. Use a Soft Throw or Cushion",
      paragraphs: [
        "A soft throw blanket or a couple of cushions can instantly make the space feel more comfortable.",
        "Choose textures and colors that complement the rest of the room rather than introducing too many contrasting elements.",
      ],
    },
    {
      heading: "5. Create a Small Book Display",
      paragraphs: [
        "Keep a few favorite books within easy reach. A small shelf, basket, or side table can work as a simple book storage solution.",
        "Displaying a limited selection keeps the corner visually clean while still making it feel personal.",
      ],
    },
    {
      heading: "6. Add One Natural Element",
      paragraphs: [
        "A small indoor plant or a simple vase can bring warmth and life to the reading corner.",
        "You don't need many decorative pieces. One carefully chosen natural element can be enough to soften the space.",
      ],
    },
    {
      heading: "7. Define the Corner With a Rug",
      paragraphs: [
        "A small rug can visually define the reading area without requiring any structural changes to the room.",
        "Choose a soft neutral pattern that connects with the colors already present in your furniture and walls.",
      ],
    },
    {
      heading: "8. Keep the Area Clutter-Free",
      paragraphs: [
        "The best reading corners feel peaceful rather than crowded. Keep only the things you regularly use within arm's reach.",
        "If the corner starts collecting random objects, use a small basket or storage box to keep everything organized.",
      ],
    },
    {
      heading: "9. Use a Calm Color Palette",
      paragraphs: [
        "Neutral and earthy colors can make a reading corner feel more relaxing. Cream, beige, warm gray, light wood, and muted green are easy colors to work with.",
        "You can introduce personality through books, cushions, artwork, or a small decorative object without making the area visually busy.",
      ],
    },
    {
      heading: "10. Make It Feel Like Your Own",
      paragraphs: [
        "The final step is adding something that makes the space personal. It could be a favorite book, framed artwork, a meaningful object, or a plant you enjoy caring for.",
        "A reading corner doesn't need to follow a perfect design formula. The goal is to create a small space where you genuinely enjoy spending time.",
      ],
    },
  ],

  relatedProducts: [
    "decorative-table-lamp",
    "minimalist-ceramic-vase",
    "foldable-storage-box",
  ],
},
{
  slug: "entryway-organization",
  title: "10 Simple Entryway Organization Ideas for a Clutter-Free Home",
  category: "Organization",
  readTime: "6 min read",
  emoji: "🚪",
  image: "/guides/entryway-organization.jpg",

  intro:
    "The entryway is the first part of your home you see when you walk through the door. A few smart storage solutions can keep shoes, bags, keys, and everyday essentials organized without making the space feel crowded.",

  sections: [
    {
      heading: "1. Give Everything a Dedicated Place",
      paragraphs: [
        "Start by deciding where the things you use every day should go. Keys, shoes, bags, umbrellas, and other essentials should each have an easy-to-reach home.",
        "When everything has a designated place, it becomes much easier to keep the entryway tidy.",
      ],
    },
    {
      heading: "2. Use Wall-Mounted Hooks",
      paragraphs: [
        "Hooks are one of the simplest ways to use vertical space in a small entryway. They can hold bags, jackets, hats, and umbrellas without taking up valuable floor space.",
        "Choose a simple row of hooks that complements the style of your home.",
      ],
    },
    {
      heading: "3. Add a Small Storage Bench",
      paragraphs: [
        "A compact bench can provide a comfortable place to sit while putting on shoes and can also provide hidden storage underneath.",
        "Look for a size that leaves enough room to move comfortably through the entrance.",
      ],
    },
    {
      heading: "4. Keep Shoes Organized",
      paragraphs: [
        "Shoes can quickly make an entryway look messy. A slim shoe rack, cabinet, or storage basket can keep frequently used pairs together.",
        "Avoid keeping every pair of shoes near the entrance. Store seasonal or rarely used footwear somewhere else.",
      ],
    },
    {
      heading: "5. Create a Key Station",
      paragraphs: [
        "A small tray, wall hook, or compact organizer can give your keys a permanent home.",
        "Keeping keys in one predictable location saves time and prevents them from disappearing into other rooms.",
      ],
    },
    {
      heading: "6. Use Baskets for Small Items",
      paragraphs: [
        "Baskets are useful for items that don't have an obvious storage location. They can hold scarves, gloves, reusable shopping bags, or other everyday accessories.",
        "Choose baskets that fit underneath a bench or on a shelf to make the most of available space.",
      ],
    },
    {
      heading: "7. Add a Mirror",
      paragraphs: [
        "A mirror can make an entryway feel brighter and more spacious while also giving you a convenient place for a quick final check before leaving home.",
        "A wall-mounted mirror is particularly useful when floor space is limited.",
      ],
    },
    {
      heading: "8. Use a Small Tray",
      paragraphs: [
        "A simple tray can keep small everyday objects contained instead of allowing them to spread across a console or shelf.",
        "Use it for keys, sunglasses, wallets, or other items you regularly carry.",
      ],
    },
    {
      heading: "9. Don't Overfill the Space",
      paragraphs: [
        "An entryway needs enough open space for people to walk through comfortably. Avoid adding furniture simply because there is an empty wall or corner.",
        "Choose a few useful pieces and leave enough breathing room around them.",
      ],
    },
    {
      heading: "10. Make It Feel Welcoming",
      paragraphs: [
        "Organization doesn't mean the entryway has to feel purely functional. Add one or two decorative touches such as a small vase, plant, artwork, or warm lamp.",
        "The best entryways balance practical storage with a warm first impression.",
      ],
    },
  ],

  relatedProducts: [
    "foldable-storage-box",
    "decorative-wall-mirror",
    "minimalist-ceramic-vase",
  ],
},
{
  slug: "expensive-home-on-budget",
  title: "How to Make Your Home Look More Expensive on a Budget",
  category: "Budget Home Decor",
  readTime: "6 min read",
  emoji: "✨",
  image: "/guides/expensive-home-budget.jpg",
  intro:
    "You don't need expensive furniture or a huge renovation to make your home feel elevated. A few thoughtful changes in lighting, styling, color, and organization can make an ordinary space look much more polished.",
  sections: [
    {
      heading: "1. Keep Your Color Palette Simple",
      paragraphs: [
        "A simple color palette instantly makes a room feel more intentional. Start with warm whites, beige, cream, light wood, and a few darker accents.",
        "Instead of adding many different colors, repeat two or three tones throughout the room. This creates a calm and coordinated appearance without spending much money.",
      ],
    },
    {
      heading: "2. Upgrade Your Lighting",
      paragraphs: [
        "Good lighting can completely change how a room looks. Replace harsh overhead lighting with warm table lamps, floor lamps, or small accent lights.",
        "Choose warm white bulbs and place lighting at different heights to create a softer and more layered atmosphere.",
      ],
    },
    {
      heading: "3. Use Mirrors Strategically",
      paragraphs: [
        "A well-placed mirror can make a room feel brighter and more spacious. Choose a simple frame that matches your existing furniture.",
        "Large mirrors don't have to be expensive. Even a budget-friendly mirror can become an attractive focal point when positioned thoughtfully.",
      ],
    },
    {
      heading: "4. Declutter Your Surfaces",
      paragraphs: [
        "Luxury is often more about what you remove than what you add. Keep tables, shelves, and countertops relatively clear.",
        "Group the items you do keep into small arrangements rather than spreading decorations randomly across every surface.",
      ],
    },
    {
      heading: "5. Add One Statement Piece",
      paragraphs: [
        "Instead of buying lots of small decorations, choose one item that creates visual interest. This could be a mirror, lamp, vase, artwork, or decorative wall piece.",
        "A single well-chosen statement piece often looks more intentional than a collection of unrelated decorations.",
      ],
    },
    {
      heading: "6. Choose Textures Over More Colors",
      paragraphs: [
        "Texture makes neutral interiors feel richer. Add woven baskets, linen-style fabrics, ceramic pieces, wood accents, or a soft rug.",
        "These small additions create depth while keeping the overall design simple and sophisticated.",
      ],
    },
    {
      heading: "7. Make Your Bed Look More Refined",
      paragraphs: [
        "The bedroom can look significantly more polished with simple bedding and a few carefully arranged pillows.",
        "Keep bedding colors neutral and add one soft throw at the end of the bed for an easy layered look.",
      ],
    },
    {
      heading: "8. Style Shelves With Breathing Room",
      paragraphs: [
        "Avoid filling every shelf completely. Leave some empty space between decorative objects so each piece has room to stand out.",
        "Combine books, ceramics, greenery, and small decorative objects at different heights for a more balanced arrangement.",
      ],
    },
    {
      heading: "9. Hide Everyday Clutter",
      paragraphs: [
        "Storage boxes, baskets, and organizers can make everyday items disappear while keeping them easy to access.",
        "Use matching or neutral-colored storage where possible so functional items blend naturally into the room.",
      ],
    },
    {
      heading: "10. Focus on Cleanliness and Maintenance",
      paragraphs: [
        "A clean and well-maintained home naturally feels more expensive. Keep surfaces dust-free, arrange cushions neatly, and regularly organize visible clutter.",
        "You can have inexpensive furniture and still create an elevated interior when everything feels intentional and cared for.",
      ],
    },
  ],
  relatedProducts: [
    "decorative-table-lamp",
    "decorative-wall-mirror",
    "minimalist-ceramic-vase",
  ],
},
];