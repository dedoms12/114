export const supplementProducts = [
    {
      id: 1,
      name: "CENTRUM Advance Multivitamins 100 Tablets",
      price: 850,
      rating: 5,
      soldCount: 932,
      image: "/images/Client/product-page/supplements/centrum.svg",
      category: "supplements",
      description: {
        main: "Complete Daily Multivitamin for Adults",
        subText: "Scientifically Formulated with Essential Nutrients",
        features: [
          "Complete A-Z Vitamins & Minerals",
          "Supports Immune System",
          "Boosts Energy Levels",
          "Promotes Overall Health"
        ],
        specifications: [
          "100 Tablets per Bottle",
          "For Adults 18+",
          "Take 1 Tablet Daily",
          "Store in Cool, Dry Place",
          "FDA Approved",
          "GMP Certified",
          "2 Years Shelf Life",
          "Made in USA"
        ]
      },
      shipping: {
        standard: { price: "₱30", days: "3-5 Days" },
        express: { price: "₱50", days: "1-2 Days" }
      },
      reviews: [
        {
          id: 1,
          user: "Maria S.",
          rating: 5,
          date: "2024-03-15",
          comment: "Great multivitamin, noticed increased energy levels.",
          images: []
        }
      ],
      images: [
        "/images/Client/product-page/supplements/centrum.svg",
        "/images/Client/product-page/supplements/centrum-2.svg",
        "/images/Client/product-page/supplements/centrum-3.svg"
      ],
      location: "Makati City, Metro Manila"
    }
    // Add more supplement products...
  ];