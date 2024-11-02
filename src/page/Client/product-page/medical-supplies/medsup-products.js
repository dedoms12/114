export const medicalProducts = [
    {
      id: 1,
      name: "OMRON Blood Pressure Monitor HEM-7120",
      price: 2850,
      rating: 5,
      soldCount: 523,
      image: "/images/Client/product-page/med-supplies/bp-monitor.svg",
      category: "medical-supplies",
      description: {
        main: "Automatic Upper Arm Blood Pressure Monitor",
        subText: "Clinically Validated for Professional and Home Use",
        features: [
          "One-Touch Operation",
          "Large Digital Display",
          "Irregular Heartbeat Detection",
          "Body Movement Detection"
        ],
        specifications: [
          "Measurement Range: 0-299 mmHg",
          "Accuracy: ±3 mmHg",
          "Memory: 30 Readings",
          "Cuff Size: 22-32cm",
          "Battery Operated",
          "3 Year Warranty",
          "FDA Approved",
          "Includes Carrying Case"
        ]
      },
      shipping: {
        standard: { price: "₱50", days: "3-5 Days" },
        express: { price: "₱100", days: "1-2 Days" }
      },
      reviews: [
        {
          id: 1,
          user: "Robert K.",
          rating: 5,
          date: "2024-03-15",
          comment: "Very accurate readings, easy to use. Perfect for home monitoring.",
          images: []
        }
      ],
      images: [
        "/images/Client/product-page/med-supplies/bp-monitor.svg",
        "/images/Client/product-page/med-supplies/bp-monitor-2.svg",
        "/images/Client/product-page/med-supplies/bp-monitor-3.svg"
      ],
      location: "Manila, Metro Manila"
    },
    // Add more medical supply products...
  ];