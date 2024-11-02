export const personalCareProducts = [
  {
    id: 1,
    name: "DOVE Beauty Bar White 135g",
    price: 78,
    rating: 5,
    soldCount: 1205,
    image: "/images/Client/product-page/personal-care/dove-soap.svg",
    category: "personal-care",
    description: {
      main: "Gentle Cleansing Beauty Bar",
      subText: "With ¼ Moisturizing Cream for Soft, Smooth Skin",
      features: [
        "Mild and Gentle Formula",
        "Suitable for Face and Body",
        "Dermatologically Tested",
        "pH Balanced"
      ],
      specifications: [
        "Net Weight: 135g",
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
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-03-15",
        comment: "My go-to beauty bar! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/personal-care/dove-soap.svg",
      "/images/Client/product-page/personal-care/dove-soap-2.svg",
      "/images/Client/product-page/personal-care/dove-soap-3.svg"
    ],
    location: "Makati City, Metro Manila",
    colors: ['blue', 'white'],
    ratings: 0,
    reviews: [
      {
        id: 1,
        user: "Maria S.",
        rating: 5,
        date: "2024-03-15",
        comment: "My go-to beauty bar! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ]
  },
  {
    id: 2,
    name: "NIVEA Body Lotion Extra White 400ml",
    price: 299,
    rating: 4,
    soldCount: 856,
    image: "/images/Client/product-page/personal-care/nivea-lotion.svg",
    category: "personal-care",
    description: {
      main: "Extra White Body Lotion",
      subText: "With ¼ Moisturizing Cream for Soft, Smooth Skin",
      features: [
        "Mild and Gentle Formula",
        "Suitable for Face and Body",
        "Dermatologically Tested",
        "pH Balanced"
      ],
      specifications: [
        "Net Weight: 400ml",
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
    reviews: [
      {
        id: 1,
        user: "Maria S.",
        rating: 4,
        date: "2024-03-15",
        comment: "Great body lotion! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ],
    images: [
      "/images/Client/product-page/personal-care/nivea-lotion.svg",
      "/images/Client/product-page/personal-care/nivea-lotion-2.svg",
      "/images/Client/product-page/personal-care/nivea-lotion-3.svg"
    ],
    location: "Makati City, Metro Manila",
    colors: ['blue', 'white'],
    ratings: 0,
    reviews: [
      {
        id: 1,
        user: "Maria S.",
        rating: 4,
        date: "2024-03-15",
        comment: "Great body lotion! Leaves skin feeling soft and moisturized.",
        images: []
      }
    ]
  }
  // Add more personal care products...
];
