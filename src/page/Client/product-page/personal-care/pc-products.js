import { stores } from '../../home-page/store';

// Helper function to get random store
const getRandomStore = () => {
  return stores[Math.floor(Math.random() * stores.length)];
};

// Original products array
const originalPersonalCareProducts = [
  {
    id: 1,
    name: "COLGATE Plax 500ml Fresh Tea",
    price: 247,
    rating: 5,
    soldCount: 721,
    image: "/images/Client/product-page/pc/image1stbatch-11.svg",
    category: "pc",
    description: {
      main: "Antibacterial Mouthwash",
      subText: "Kills 99% of Bacteria for Fresh Breath",
      features: [
        "Fresh Tea Flavor",
        "12-Hour Protection",
        "Alcohol-Free Formula",
        "Fights Bad Breath"
      ],
      specifications: [
        "Volume: 500ml",
        "Antibacterial Protection",
        "Sugar-Free",
        "Contains Fluoride",
        "Clinically Proven",
        "24 Months Shelf Life",
        "Store in Cool, Dry Place"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-03-15",
        comment: "Great mouthwash, keeps breath fresh all day!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-11.svg",
      "/images/Client/product-page/pc/image1stbatch-11.svg",
      "/images/Client/product-page/pc/image1stbatch-11.svg"
    ]
  },
  {
    id: 2,
    name: "LUXE ORGANIX Luxe Organix Himalayan Salt Gargle Stick 10ml",
    price: 22,
    rating: 5,
    soldCount: 103,
    image: "/images/Client/product-page/pc/image1stbatch-10.svg",
    category: "pc",
    description: {
      main: "Himalayan Salt Gargle Stick",
      subText: "With ¼ Moisturizing Cream for Soft, Smooth Skin",
      features: [
        "Mild and Gentle Formula",
        "Suitable for Face and Body",
        "Dermatologically Tested",
        "pH Balanced"
      ],
      specifications: [
        "Net Weight: 10ml",
        "Suitable for All Skin Types",
        "Paraben-Free",
        "Not Tested on Animals",
        "Made with Pure Natural Ingredients",
        "Shelf Life: 24 Months",
        "Store in Cool, Dry Place"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Maria S.",
        rating: 5,
        date: "2024-03-15",
        comment: "Great gargle stick! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-10.svg",
      "/images/Client/product-page/pc/image1stbatch-10.svg",
      "/images/Client/product-page/pc/image1stbatch-10.svg"
    ]
  },
  {
    id: 3,
    name: "PH CARE Feminine Wash Floral Clean 50ml",
    price: 55,
    rating: 5,
    soldCount: 2700,
    image: "/images/Client/product-page/pc/image1stbatch-8.svg",
    category: "pc",
    description: {
      main: "Feminine Wash Floral Clean",
      subText: "With ¼ Moisturizing Cream for Soft, Smooth Skin",
      features: [
        "Mild and Gentle Formula",
        "Suitable for Face and Body",
        "Dermatologically Tested",
        "pH Balanced"
      ],
      specifications: [
        "Net Weight: 50ml",
        "Suitable for All Skin Types",
        "Paraben-Free",
        "Not Tested on Animals",
        "Made with Pure Natural Ingredients",
        "Shelf Life: 24 Months",
        "Store in Cool, Dry Place"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Maria S.",
        rating: 5,
        date: "2024-03-15",
        comment: "Great feminine wash! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-8.svg",
      "/images/Client/product-page/pc/image1stbatch-8.svg",
      "/images/Client/product-page/pc/image1stbatch-8.svg"
    ]
  },
  {
    id: 4,
    name: "DEOPLUS Tawas Powder W/ Licorice Extract 50G",
    price: 28,
    rating: 5,
    soldCount: 530,
    image: "/images/Client/product-page/pc/image1stbatch-9.svg",
    category: "pc",
    description: {
      main: "Natural Deodorizing Powder",
      subText: "With Licorice Extract for Enhanced Protection",
      features: [
        "Natural Tawas Formula",
        "With Licorice Extract",
        "Long-lasting Protection",
        "No Harmful Chemicals"
      ],
      specifications: [
        "Net Weight: 50G",
        "All-Natural Ingredients",
        "Aluminum Salt Free",
        "Paraben-Free",
        "For External Use Only",
        "24 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Anna L.",
        rating: 5,
        date: "2024-03-10",
        comment: "Effective natural deodorant powder, keeps me fresh all day!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-9.svg",
      "/images/Client/product-page/pc/image1stbatch-9.svg",
      "/images/Client/product-page/pc/image1stbatch-9.svg"
    ]
  },
  {
    id: 5,
    name: "LUXE ORGANIX Niacinamide + Retinol Cloud Soap 3 X 80g",
    price: 119,
    rating: 5,
    soldCount: 10000,
    image: "/images/Client/product-page/pc/image1stbatch-7.svg",
    category: "pc",
    description: {
      main: "Advanced Skincare Soap",
      subText: "With Niacinamide and Retinol for Glowing Skin",
      features: [
        "Contains Niacinamide",
        "With Retinol",
        "Cloud-like Texture",
        "Brightening Formula"
      ],
      specifications: [
        "Weight: 80g x 3 bars",
        "For All Skin Types",
        "Dermatologically Tested",
        "Paraben-Free",
        "Cruelty-Free",
        "36 Months Shelf Life",
        "Store in Cool, Dry Place"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Sofia R.",
        rating: 5,
        date: "2024-03-12",
        comment: "Amazing soap! Noticed brighter skin after just a week of use.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-7.svg",
      "/images/Client/product-page/pc/image1stbatch-7.svg",
      "/images/Client/product-page/pc/image1stbatch-7.svg"
    ]
  },
  {
    id: 6,
    name: "Goat Milk Scented Cream Body Wash 1000ml",
    price: 334,
    rating: 5,
    soldCount: 5500,
    image: "/images/Client/product-page/pc/image1stbatch.svg",
    category: "pc",
    description: {
      main: "Creamy Goat Milk Body Wash",
      subText: "Luxurious Body Wash with Real Goat Milk",
      features: [
        "Real Goat Milk Extract",
        "Moisturizing Formula",
        "Gentle Cleansing",
        "Rich Creamy Lather"
      ],
      specifications: [
        "Volume: 1000ml",
        "pH Balanced",
        "For All Skin Types",
        "Paraben-Free",
        "With Natural Moisturizers",
        "24 Months Shelf Life",
        "Made with Natural Ingredients"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Maria C.",
        rating: 5,
        date: "2024-03-14",
        comment: "Love how creamy and moisturizing this body wash is!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch.svg",
      "/images/Client/product-page/pc/image1stbatch.svg",
      "/images/Client/product-page/pc/image1stbatch.svg"
    ]
  },
  {
    id: 7,
    name: "NIVEA Anti-Perspirant Extra Brightening Roll-On",
    price: 164,
    rating: 5,
    soldCount: 10000,
    image: "/images/Client/product-page/pc/image1stbatch-1.svg",
    category: "pc",
    description: {
      main: "Anti-Perspirant Roll-On",
      subText: "48-Hour Protection with Brightening Effect",
      features: [
        "48-Hour Protection",
        "Brightening Formula",
        "Non-Sticky",
        "Quick-Drying"
      ],
      specifications: [
        "Buy 1 Take 1 Pack",
        "Contains Vitamin C",
        "Alcohol-Free",
        "Dermatologically Tested",
        "For All Skin Types",
        "36 Months Shelf Life",
        "Made in Germany"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Jenny P.",
        rating: 5,
        date: "2024-03-15",
        comment: "Best anti-perspirant! Love the brightening effect.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-11.svg",
      "/images/Client/product-page/pc/image1stbatch-11.svg",
      "/images/Client/product-page/pc/image1stbatch-11.svg"
    ]
  },
  {
    id: 8,
    name: "BELO Intense White Deo 40ML",
    price: 165,
    rating: 5,
    soldCount: 10000,
    image: "/images/Client/product-page/pc/image1stbatch-2.svg",
    category: "pc",
    description: {
      main: "Whitening Deodorant",
      subText: "Advanced Whitening Formula with 24-Hour Protection",
      features: [
        "Intense Whitening",
        "24-Hour Protection",
        "Non-Sticky Formula",
        "With Kojic Acid"
      ],
      specifications: [
        "Volume: 40ML",
        "With Alpha Arbutin",
        "Alcohol-Free",
        "Dermatologically Tested",
        "For All Skin Types",
        "36 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Patricia M.",
        rating: 5,
        date: "2024-03-11",
        comment: "Effective whitening deo! No dark underarms anymore.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-2.svg",
      "/images/Client/product-page/pc/image1stbatch-2.svg",
      "/images/Client/product-page/pc/image1stbatch-2.svg"
    ]
  },
  {
    id: 9,
    name: "KOJIE SAN Skin Lightening Classic Soap 65Gx3 (Value Pack)",
    price: 87,
    rating: 5,
    soldCount: 10000,
    image: "/images/Client/product-page/pc/image1stbatch-3.svg",
    category: "pc",
    description: {
      main: "Kojic Acid Whitening Soap",
      subText: "Maximum Whitening with Classic Kojic Acid Formula",
      features: [
        "With Pure Kojic Acid",
        "Anti-Dark Spots",
        "Even Skin Tone",
        "Deep Cleansing"
      ],
      specifications: [
        "Weight: 65g x 3 bars",
        "Maximum Strength Formula",
        "For Face and Body",
        "Dermatologically Tested",
        "All Skin Types",
        "24 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Michelle L.",
        rating: 5,
        date: "2024-03-13",
        comment: "Best whitening soap! Visible results in weeks.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-3.svg",
      "/images/Client/product-page/pc/image1stbatch-3.svg",
      "/images/Client/product-page/pc/image1stbatch-3.svg"
    ]
  },
  {
    id: 10,
    name: "CLEENE Cotton Rounds Multi Purpose 80s X 2 Packs",
    price: 149,
    rating: 5,
    soldCount: 4600,
    image: "/images/Client/product-page/pc/image1stbatch-4.svg",
    category: "pc",
    description: {
      main: "Multi-Purpose Cotton Rounds",
      subText: "Soft and Absorbent Cotton Pads for Beauty and Skincare",
      features: [
        "100% Pure Cotton",
        "Dual-Sided Texture",
        "Lint-Free",
        "Multi-Purpose Use"
      ],
      specifications: [
        "80 Pieces x 2 Packs",
        "Hypoallergenic",
        "Unscented",
        "For Cosmetic Use",
        "Biodegradable",
        "36 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Angela R.",
        rating: 5,
        date: "2024-03-14",
        comment: "Super soft and doesn't leave any lint behind!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-4.svg",
      "/images/Client/product-page/pc/image1stbatch-4.svg",
      "/images/Client/product-page/pc/image1stbatch-4.svg"
    ]
  },
  {
    id: 11,
    name: "Flat Thread Mint Dental Flossers Loose Box",
    price: 330,
    rating: 5,
    soldCount: 2800,
    image: "/images/Client/product-page/pc/image1stbatch-5.svg",
    category: "pc",
    description: {
      main: "Mint Flavored Dental Flossers",
      subText: "Easy-to-Use Dental Floss Picks with Mint Flavor",
      features: [
        "Flat Thread Design",
        "Mint Flavored",
        "Easy Grip Handle",
        "Break-Resistant"
      ],
      specifications: [
        "Loose Box Pack",
        "High-Tension Thread",
        "Food Grade Material",
        "Travel-Friendly",
        "FDA Approved",
        "48 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "David C.",
        rating: 5,
        date: "2024-03-15",
        comment: "Great quality flossers, love the mint flavor!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-5.svg",
      "/images/Client/product-page/pc/image1stbatch-5.svg",
      "/images/Client/product-page/pc/image1stbatch-5.svg"
    ]
  },
  {
    id: 12,
    name: "SISTERS Over Night Dry With Wings Cottony Comfort 4 Pads",
    price: 29,
    rating: 5,
    soldCount: 46,
    image: "/images/Client/product-page/pc/image1stbatch-6.svg",
    category: "pc",
    description: {
      main: "Overnight Sanitary Pads",
      subText: "Extra Long Protection with Wings for Overnight Use",
      features: [
        "With Wings",
        "Cottony Soft Cover",
        "Extra Length",
        "Overnight Protection"
      ],
      specifications: [
        "4 Pads per Pack",
        "With Wings Design",
        "Extra Absorbent Core",
        "Hypoallergenic",
        "Individually Wrapped",
        "36 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-03-12",
        comment: "Very comfortable and great overnight protection!",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image1stbatch-6.svg",
      "/images/Client/product-page/pc/image1stbatch-6.svg",
      "/images/Client/product-page/pc/image1stbatch-6.svg"
    ]
  },
  {
    id: 13,
    name: "EUROO Eye2209e 2-in-1 Epilator",
    price: 1999,
    rating: 5,
    soldCount: 476,
    image: "/images/Client/product-page/pc/image2ndbatch-6.svg",
    category: "pc",
    description: {
      main: "2-in-1 Electric Epilator",
      subText: "Professional Hair Removal Device with Dual Function",
      features: [
        "2-in-1 Functionality",
        "Cordless Operation",
        "Waterproof Design",
        "LED Light Guide"
      ],
      specifications: [
        "Rechargeable Battery",
        "2 Speed Settings",
        "Washable Head",
        "40 Minutes Runtime",
        "Includes Cleaning Brush",
        "1 Year Warranty",
        "CE Certified"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Lisa T.",
        rating: 5,
        date: "2024-03-10",
        comment: "Great epilator! Easy to use and effective results.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/image2ndbatch-6.svg",
      "/images/Client/product-page/pc/image2ndbatch-6.svg",
      "/images/Client/product-page/pc/image2ndbatch-6.svg"
    ]
  },
  {
    id: 14,
    name: "Shiba Impregnating Wet Wipes Sakura Scented 100 X 3Pk",
    price: 119,
    rating: 5,
    soldCount: 736,
    image: "/images/Client/product-page/pc/imagebatch3-6.svg",
    category: "pc",
    description: {
      main: "Sakura Scented Wet Wipes",
      subText: "Premium Quality Wet Wipes with Japanese Sakura Fragrance",
      features: [
        "Sakura Scented",
        "Extra Thick Material",
        "Alcohol-Free",
        "Resealable Pack"
      ],
      specifications: [
        "100 Sheets x 3 Packs",
        "pH Balanced",
        "Dermatologically Tested",
        "With Natural Extracts",
        "Travel-Friendly Size",
        "24 Months Shelf Life",
        "Made in Japan"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Yuki M.",
        rating: 5,
        date: "2024-03-15",
        comment: "Love the sakura scent! Very refreshing and gentle on skin.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/imagebatch3-6.svg",
      "/images/Client/product-page/pc/imagebatch3-6.svg",
      "/images/Client/product-page/pc/imagebatch3-6.svg"
    ]
  },
  {
    id: 15,
    name: "Luxe Organix Dermaglow Salicylic Acid 2% Acne Rescue Serum",
    price: 299,
    rating: 5,
    soldCount: 534,
    image: "/images/Client/product-page/pc/imagebatch3.svg",
    category: "pc",
    description: {
      main: "Acne Treatment Serum",
      subText: "2% Salicylic Acid Treatment for Acne-Prone Skin",
      features: [
        "With 2% Salicylic Acid",
        "Oil-Free Formula",
        "Pore-Minimizing",
        "Anti-Inflammatory"
      ],
      specifications: [
        "30ml Bottle",
        "For Acne-Prone Skin",
        "Alcohol-Free",
        "Fragrance-Free",
        "Dermatologically Tested",
        "24 Months Shelf Life",
        "Made in Korea"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Claire P.",
        rating: 5,
        date: "2024-03-14",
        comment: "Amazing for acne control! Saw results in just a week.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/imagebatch3.svg",
      "/images/Client/product-page/pc/imagebatch3.svg",
      "/images/Client/product-page/pc/imagebatch3.svg"
    ]
  },
  {
    id: 16,
    name: "Cream Body Wash Strawberry Refill 900ml",
    price: 159,
    rating: 5,
    soldCount: 105,
    image: "/images/Client/product-page/pc/imagebatch3-2.svg",
    category: "pc",
    description: {
      main: "Strawberry Scented Body Wash",
      subText: "Creamy Body Wash with Natural Strawberry Extract",
      features: [
        "Rich Creamy Lather",
        "Natural Strawberry Scent",
        "Moisturizing Formula",
        "Eco-Friendly Refill Pack"
      ],
      specifications: [
        "Volume: 900ml",
        "pH Balanced",
        "With Natural Extracts",
        "Paraben-Free",
        "Recyclable Packaging",
        "24 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Mary A.",
        rating: 5,
        date: "2024-03-13",
        comment: "Smells amazing and leaves skin soft! Love the refill option.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/imagebatch3-2.svg",
      "/images/Client/product-page/pc/imagebatch3-2.svg",
      "/images/Client/product-page/pc/imagebatch3-2.svg"
    ]
  },
  {
    id: 17,
    name: "GEISHA WHITE Geisha White Intense Bar 65g X 3",
    price: 82,
    rating: 5,
    soldCount: 456,
    image: "/images/Client/product-page/pc/imagebatch3-3.svg",
    category: "pc",
    description: {
      main: "Whitening Beauty Soap",
      subText: "Triple Action Whitening with Japanese Technology",
      features: [
        "Intense Whitening Formula",
        "With Natural Extracts",
        "Moisturizing Effect",
        "Gentle on Skin"
      ],
      specifications: [
        "65g x 3 Bars",
        "With Japanese Technology",
        "For All Skin Types",
        "Dermatologically Tested",
        "With Natural Ingredients",
        "36 Months Shelf Life",
        "Made in Japan"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Sophia L.",
        rating: 5,
        date: "2024-03-12",
        comment: "Best whitening soap! Visible results in 2 weeks.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/imagebatch3-3.svg",
      "/images/Client/product-page/pc/imagebatch3-3.svg",
      "/images/Client/product-page/pc/imagebatch3-3.svg"
    ]
  },
  {
    id: 18,
    name: "HYGIENIX Hygienix Germkill Mega Menthol Soap 125G Triple",
    price: 114,
    rating: 5,
    soldCount: 236,
    image: "/images/Client/product-page/pc/imagebatch3-4.svg",
    category: "pc",
    description: {
      main: "Antibacterial Menthol Soap",
      subText: "Triple Action Germ Protection with Cooling Menthol",
      features: [
        "Kills 99.9% Germs",
        "Cooling Menthol Effect",
        "Long-lasting Protection",
        "Fresh Scent"
      ],
      specifications: [
        "125G x 3 Bars",
        "With Active Antibacterial",
        "Dermatologically Tested",
        "For All Skin Types",
        "With Natural Menthol",
        "36 Months Shelf Life",
        "Made in Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱30", days: "10 Hours" },
      express: { price: "₱50", days: "5 Hours" }
    },
    location: "Quezon City, Metro Manila",
    reviews: [
      {
        id: 1,
        user: "Mark R.",
        rating: 5,
        date: "2024-03-11",
        comment: "Great antibacterial soap! Love the cooling sensation.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/pc/imagebatch3-4.svg",
      "/images/Client/product-page/pc/imagebatch3-4.svg",
      "/images/Client/product-page/pc/imagebatch3-4.svg"
    ]
  }
];

// Export products with random store info
export const personalCareProducts = originalPersonalCareProducts.map(product => ({
  ...product,
  storeInfo: getRandomStore()
}));
