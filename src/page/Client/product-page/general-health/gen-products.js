import { stores } from '../../home-page/store';

// Helper function to get random store
const getRandomStore = () => {
  return stores[Math.floor(Math.random() * stores.length)];
};

// Original products array
const originalProducts = [
  {
    id: 1,
  name: "GORGLITTER Men's Plaid Button Down Shirt Long Sleeve Casual Shirt Jackets",
  price: 450,
  image: "/images/Client/product-page/Menswear/tshirt1.jpg",
  category: "menswear",
  description: {
    main: "A stylish and comfortable plaid button-down shirt for all-day wear.",
    subText: "Perfect for casual outings and semi-formal events.",
    features: [
      "High-quality plaid fabric",
      "Button-down closure",
      "Long sleeves with button cuffs",
      "Relaxed fit for added comfort"
    ],
    specifications: [
      "Material: 80% Cotton, 20% Polyester",
      "Machine washable",
      "Available in multiple sizes",
      "Made in the Philippines",
      "Lightweight and breathable"
    ]
  },
  shipping: {
    standard: { price: "₱70", days: "2-3 Days" },
    express: { price: "₱120", days: "1 Day" }
  },
  location: "Butuan City, Agusan del Norte"
  },
  {
    id: 2,
    name: "Wendoximz Golf Shirts for Men Dry Fit Men's Polo Shirts Men's Casual Plaid Turn-Down Collar Blouse Short Sleeve Solid Pocket Blouse Shirt, Size: XXXL, Beige",
    price: 1200,
    image: "/images/Client/product-page/Menswear/tshirt2.jpg",
    category: "menswear",
    description: {
      main: "A stylish and comfortable golf shirt for men, featuring dry fit technology and a classic plaid design with a turn-down collar and a chest pocket.",
      subText: "This short-sleeve polo shirt is perfect for casual golf outings, weekend wear, or everyday activities.",
      features: [
        "Dry fit technology for moisture-wicking comfort",
        "Turn-down collar and button-up placket",
        "Plaid design with solid color accents",
        "Chest pocket for added convenience",
        "Available in size XXXL for a relaxed fit"
      ],
      specifications: [
        "Material: 100% Polyester",
        "Machine washable",
        "Available in sizes S, M, L, XL, 2XL, 3XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱100", days: "3-5 Days" },
      express: { price: "₱180", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 3,
    name: "Clothe Co. Men's Heavyweight Cotton T-Shirt Plain Tee (Available in Big & Tall)",
  price: 650,
  image: "/images/Client/product-page/Menswear/tshirt3.jpg",
  category: "menswear",
  description: {
    main: "A durable and comfortable heavyweight cotton T-shirt, designed for both casual and work wear. Available in Big & Tall sizes for the perfect fit.",
    subText: "Ideal for layering or wearing on its own, this plain tee is versatile and easy to pair with any outfit.",
    features: [
      "Heavyweight cotton fabric for durability",
      "Breathable and soft for all-day comfort",
      "Plain design for a clean, classic look",
      "Available in Big & Tall sizes for a more comfortable fit"
    ],
    specifications: [
      "Material: 100% Cotton",
      "Machine washable",
      "Available in sizes S, M, L, XL, 2XL, 3XL, 4XL",
      "Imported"
    ]
  },
  shipping: {
    standard: { price: "₱70", days: "3-5 Days" },
    express: { price: "₱120", days: "1-2 Days" }
  },
  location: "Taguig City, Metro Manila"
  },
  {
    id: 4,
    name: "Men Jacket Classic Baggy Coat Zip Up Outwear Baseball Clothing Long Sleeve Tops",
    price: 1200,
    image: "/images/Client/product-page/Menswear/tshirt4.jpg",
    category: "menswear",
    description: {
      main: "A stylish and versatile classic baggy jacket with a zip-up closure, designed for a comfortable and relaxed fit. Perfect for casual wear and outdoor activities.",
      subText: "This long sleeve jacket features a baseball-inspired design, making it an ideal outerwear piece for cooler weather.",
      features: [
        "Zip-up closure for easy wear",
        "Classic baggy fit for a relaxed and comfortable look",
        "Baseball-inspired style with ribbed cuffs and hem",
        "Long sleeves for added warmth and comfort",
        "Available in various sizes for the perfect fit"
      ],
      specifications: [
        "Material: 100% Polyester",
        "Machine washable",
        "Available in sizes S, M, L, XL, 2XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱100", days: "4-6 Days" },
      express: { price: "₱160", days: "1-2 Days" }
    },
    location: "Davao City, Davao del Sur"
  },
  {
    id: 5,
    name: "OH Solid Three-Buttons Polo - XL / Green",
    price: 850,
    image: "/images/Client/product-page/Menswear/tshirt5.jpg",
    category: "menswear",
    description: {
      main: "A classic and comfortable polo shirt with three buttons, perfect for both casual outings and semi-formal events.",
      subText: "This solid green polo shirt offers a clean and timeless look, making it a wardrobe essential for versatile styling.",
      features: [
        "Three-button placket for a classic polo look",
        "Soft and breathable fabric for maximum comfort",
        "Slim fit design for a more tailored appearance",
        "Available in size XL for a relaxed fit"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable",
        "Available in sizes S, M, L, XL, 2XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "3-5 Days" },
      express: { price: "₱130", days: "1-2 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 6,
    name: "Men's Cargo Pants Multi Pocket Wide Leg Jogger Trousers",
    price: 650,
    image: "/images/Client/product-page/Menswear/pants1.jpg",
    category: "menswear",
    description: {
      main: "Stylish and functional multi-pocket cargo pants.",
      subText: "Perfect for streetwear or casual workwear.",
      features: [
        "Wide-leg fit",
        "Multiple utility pockets",
        "Durable material",
        "Adjustable waistband"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Letter embroidery detail",
        "Machine washable",
        "Made in the Philippines",
        "Comfortable and durable",
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "4 Days" },
      express: { price: "₱150", days: "2 Days" }
    },
    location: "Ampayon, Agusan del Norte"
  },
  {
    id: 7,
    name: "SAYO TOMASYON Male Short Pants With Draw String",
    price: 400,
    image: "/images/Client/product-page/Menswear/pants2.jpg",
    category: "menswear",
    description: {
      main: "Casual and stylish cargo shorts with drawstring waist.",
      subText: "Great for summer days and active wear.",
      features: [
        "Elastic waistband with drawstring",
        "Multiple pockets",
        "Durable and lightweight",
        "Relaxed fit"
      ],
      specifications: [
        "Material: 80% Cotton, 20% Polyester",
        "Machine washable",
        "Available in Khaki and Black",
        "Made in the Philippines",
        "Perfect for casual wear",
      ]
    },
    shipping: {
      standard: { price: "₱60", days: "3 Days" },
      express: { price: "₱110", days: "1 Day" }
    },
    location: "Butuan City, Agusan del Norte"
  },
  {
    id: 8,
    name: "Men's Shorts Multi-Pocket Cargo",
    price: 350,
    image: "/images/Client/product-page/Menswear/pants3.jpg",
    category: "menswear",
    description: {
      main: "Practical and stylish multi-pocket cargo shorts.",
      subText: "Perfect for outdoor activities and casual wear.",
      features: [
        "Elastic waistband",
        "Knee-length design",
        "Multiple utility pockets",
        "Safari-style solid color"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable",
        "Relaxed fit",
        "Made in the Philippines",
        "Lightweight and breathable",
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "4 Days" },
      express: { price: "₱120", days: "2 Days" }
    },
    location: "Ampayon, Agusan del Norte"
  },
  {
    id: 9,
    name: "SAYO TOMASYON Black Baggy Jeans Men Harem Pants",
    price: 700,
    image: "/images/Client/product-page/Menswear/pants4.jpg",
    category: "menswear",
    description: {
      main: "Trendy black baggy jeans with a harem fit.",
      subText: "Perfect for casual and streetwear looks.",
      features: [
        "Oversized fit",
        "Wide-leg design",
        "Durable denim fabric",
        "Trendy and versatile"
      ],
      specifications: [
        "Material: 100% Denim",
        "Machine washable",
        "Made in the Philippines",
        "Ideal for streetwear enthusiasts",
        "Available in oversized fits",
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "3 Days" },
      express: { price: "₱140", days: "1 Day" }
    },
    location: "Ampayon, Agusan del Norte"
  },
  {
    id: 10,
    name: "SAYO TOMASYON 2024 New Running Jogging Pants",
    price: 600,
    image: "/images/Client/product-page/Menswear/pants5.jpg",
    category: "menswear",
    description: {
      main: "Soft and comfortable jogging pants for sports and casual wear.",
      subText: "Designed for performance and style.",
      features: [
        "Elastic waistband with drawstring",
        "Soft cotton fabric",
        "Tapered fit",
        "Breathable and lightweight"
      ],
      specifications: [
        "Material: 95% Cotton, 5% Spandex",
        "Machine washable",
        "Perfect for workouts and lounging",
        "Made in the Philippines",
        "Available in multiple sizes",
      ]
    },
    shipping: {
      standard: { price: "₱75", days: "2 Days" },
      express: { price: "₱120", days: "1 Day" }
    },
    location: "Ampayon, Agusan del Norte"
  },
  {
    id: 11,
    name: "Simwood Solid Color Drop Sleeve T-shirt - Blue Green 2nd / S",
    price: 650,
    image: "/images/Client/product-page/Menswear/tshirt6.jpg",
    category: "menswear",
    description: {
      main: "A trendy and comfortable solid color drop sleeve t-shirt, perfect for casual wear or layering.",
      subText: "This blue-green t-shirt features a relaxed fit and drop shoulders, offering both style and comfort for everyday wear.",
      features: [
        "Solid color design for a clean, minimalistic look",
        "Drop sleeve style for a relaxed, contemporary fit",
        "Soft and breathable fabric for all-day comfort",
        "Available in size S for a more tailored fit"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable",
        "Available in sizes S, M, L",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-5 Days" },
      express: { price: "₱120", days: "1-2 Days" }
    },
    location: "Makati City, Metro Manila"
  },
  {
    id: 12,
    name: "OH Plain Color Regular Fit T-Shirt - L / Dark Grey",
    price: 600,
    image: "/images/Client/product-page/Menswear/tshirt7.jpg",
    category: "menswear",
    description: {
      main: "A versatile and classic plain color t-shirt in dark grey, offering a regular fit for a comfortable and relaxed feel.",
      subText: "Perfect for casual wear, layering, or pairing with your favorite jeans or shorts for an effortlessly stylish look.",
      features: [
        "Plain color design for a minimalist style",
        "Regular fit for comfort and ease of movement",
        "Soft and breathable cotton fabric",
        "Durable and easy to care for"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable",
        "Available in sizes S, M, L, XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-5 Days" },
      express: { price: "₱120", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  }
];

// Export products with random store info
export const products = originalProducts.map(product => ({
  ...product,
  storeInfo: getRandomStore()
}));