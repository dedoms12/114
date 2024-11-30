import { stores } from '../../home-page/store';

// Helper function to get random store
const getRandomStore = () => {
  return stores[Math.floor(Math.random() * stores.length)];
};

// Original products array
const originalPersonalCareProducts = [
  {
    id: 1,
    name: "Dunk Low 'Black White' - 38.5",
    price: 1500,
    image: "/images/Client/product-page/Shoes/shoes1.jpg",
    category: "shoes",
    description: {
      main: "The Nike Dunk Low 'Black White' offers a classic two-tone colorway, blending sleek black and white leather with signature Dunk style.",
      subText: "With its iconic low-top design and premium leather construction, this sneaker offers both street-ready looks and timeless comfort.",
      features: [
        "Premium leather upper",
        "Black and white colorway for versatile styling",
        "Rubber outsole for durable traction",
        "Low-top design for a sleek silhouette"
      ],
      specifications: [
        "Material: Leather Upper, Rubber Outsole",
        "Available in sizes US 6-12",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "4-6 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 2,
    name: "Reebok Court Advance Mens Sneakers | White | Regular 7",
    price: 2000,
    image: "/images/Client/product-page/Shoes/shoes2.jpg",
    category: "shoes",
    description: {
      main: "The Reebok Court Advance Mens Sneakers combine athletic performance with casual street style, featuring a clean white design for versatile wear.",
      subText: "Perfect for sports or everyday use, these sneakers offer comfort, durability, and style with their cushioned footbed and sleek look.",
      features: [
        "Premium synthetic upper for durability",
        "Cushioned footbed for all-day comfort",
        "Rubber outsole for optimal grip and traction",
        "Classic Reebok branding on the tongue and heel"
      ],
      specifications: [
        "Material: Synthetic Upper, Rubber Outsole",
        "Available in sizes US 6-12",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "4-6 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Mandaluyong City, Metro Manila"
  },
  {
    id: 3,
    name: "Men Atwood Deluxe Sneaker - Men's - Turtledove Beige",
    price: 1500,
    image: "/images/Client/product-page/Shoes/shoes3.jpg",
    category: "shoes",
    description: {
      main: "The Men Atwood Deluxe Sneaker in Turtledove Beige offers a premium casual look with a minimalist design and lightweight construction.",
      subText: "Perfect for daily wear, these sneakers feature a clean beige colorway, ensuring versatility while providing all-day comfort and style.",
      features: [
        "Premium canvas upper for a comfortable fit",
        "Lightweight and breathable construction",
        "Rubber sole for enhanced traction",
        "Subtle logo detailing for a classic look"
      ],
      specifications: [
        "Material: Canvas Upper, Rubber Outsole",
        "Available in sizes US 7-13",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱120", days: "3-5 Days" },
      express: { price: "₱200", days: "1-2 Days" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 4,
    name: "Cross-border Sneakers Couples Running Shoes Trendy Stylish And Lightweight Breathable Casual Cortez - 908 Gray",
    price: 1300,
    image: "/images/Client/product-page/Shoes/shoes4.jpg",
    category: "shoes",
    description: {
      main: "The Cross-border Sneakers Cortez 908 in Gray offer a stylish and lightweight design perfect for couples who want to combine fashion and comfort.",
      subText: "These breathable casual shoes are ideal for running or casual outings, providing a modern look with a comfortable fit.",
      features: [
        "Breathable mesh upper for superior ventilation",
        "Lightweight and flexible construction for ease of movement",
        "Durable rubber outsole for excellent grip",
        "Trendy design with a sleek, minimalist aesthetic"
      ],
      specifications: [
        "Material: Mesh Upper, Rubber Outsole",
        "Available in sizes US 5-10",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "4-6 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 5,
    name: "Tênis Feminino Via Marte Jogging Casual 22-16004-05 - Bebecê",
    price: 2200,
    image: "/images/Client/product-page/Shoes/shoes5.jpg",
    category: "shoes",
    description: {
      main: "The Via Marte Jogging Casual Tênis offers a stylish and comfortable design for women, featuring a modern jogger look perfect for everyday wear.",
      subText: "This casual sneaker by Bebecê combines comfort and style, making it ideal for walking, running, or any casual outing.",
      features: [
        "Soft synthetic upper for comfort",
        "Lightweight and breathable design",
        "Rubber outsole for better traction and stability",
        "Sleek, sporty style with a modern touch"
      ],
      specifications: [
        "Material: Synthetic Upper, Rubber Outsole",
        "Available in sizes US 6-10",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱180", days: "3-5 Days" },
      express: { price: "₱280", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 6,
    name: "New Balance Damen 57/40 in Schwarz/Weiß, Suede/Mesh",
    price: 2500,
    image: "/images/Client/product-page/Shoes/shoes6.jpg",
    category: "shoes",
    description: {
      main: "The New Balance Damen 57/40 in Black/White features a premium suede and mesh upper, combining sleek design with everyday comfort.",
      subText: "These stylish sneakers offer a perfect blend of classic and modern aesthetics, providing comfort and support for all-day wear.",
      features: [
        "Suede and mesh upper for durability and breathability",
        "Cushioned midsole for added comfort and support",
        "Rubber outsole for excellent grip and traction",
        "Iconic New Balance design with a contemporary twist"
      ],
      specifications: [
        "Material: Suede/Mesh Upper, Rubber Outsole",
        "Available in sizes EU 36-42",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱200", days: "4-6 Days" },
      express: { price: "₱350", days: "1-2 Days" }
    },
    location: "Makati City, Metro Manila"
  },
  {
    id: 7,
    name: "New Balance ML615 D Marathon Running Shoes/Sneakers ML615NRT (Size: US 8)",
    price: 1800,
    image: "/images/Client/product-page/Shoes/shoes7.jpg",
    category: "shoes",
    description: {
      main: "The New Balance ML615 D Marathon Running Shoes combine performance and style, engineered for comfort during long-distance runs and everyday activities.",
      subText: "With a lightweight, breathable mesh upper and responsive cushioning, these sneakers are designed to keep your feet comfortable and supported throughout the day.",
      features: [
        "Breathable mesh upper for ventilation",
        "Cushioned midsole for responsive comfort",
        "Rubber outsole with tread for superior grip",
        "Sleek marathon-inspired design for both performance and style"
      ],
      specifications: [
        "Material: Mesh Upper, Rubber Outsole",
        "Size: US 8",
        "Ideal for running, gym workouts, and casual wear",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱180", days: "3-5 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 8,
    name: "adidas campus 00s",
    price: 1300,
    image: "/images/Client/product-page/Shoes/shoes8.jpg",
    category: "shoes",
    description: {
      main: "The adidas Campus 00s is a classic sneaker with a rich heritage that provides comfort and style with every step.",
      subText: "The leather upper and sturdy rubber outsole offer a durable and stylish sneaker for everyday wear.",
      features: [
        "Leather upper with suede overlays",
        "Signature rubber outsole for traction",
        "Classic Campus branding",
        "Padded collar for extra comfort"
      ],
      specifications: [
        "Material: Leather Upper, Rubber Outsole",
        "Available in sizes US 6-13",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "4-6 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Caloocan City, Metro Manila"
  },
  {
    id: 9,
    name: "Original Adidas Clover Campus 00s Men and Women's Shoes Low Top Sports Casual Board Shoes Sneakers - 9 / 44",
    price: 1200,
    image: "/images/Client/product-page/Shoes/shoes9.jpg",
    category: "shoes",
    description: {
      main: "The Adidas Clover Campus 00s combines retro style with modern comfort, featuring a low-top design for versatile wear and sleek, sporty aesthetics.",
      subText: "Ideal for both casual outings and athletic activities, these sneakers provide long-lasting comfort, durability, and style with every step.",
      features: [
        "Low-top design for a versatile and casual look",
        "Premium suede upper for durability and comfort",
        "Classic Adidas 3-stripes branding",
        "Cushioned insole for extra comfort",
        "Rubber outsole for excellent grip and board control"
      ],
      specifications: [
        "Material: Suede Upper, Rubber Outsole",
        "Size: 9 (US) / 44 (EU)",
        "Available in various sizes",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱220", days: "3-5 Days" },
      express: { price: "₱320", days: "1-2 Days" }
    },
    location: "Mandaluyong City, Metro Manila"
  },
  {
    id: 10,
    name: "Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11",
    price: 1300,
    image: "/images/Client/product-page/Shoes/shoes10.jpg",
    category: "shoes",
    description: {
      main: "The Adidas Originals Campus 00s Core Black sneakers deliver a timeless style with a modern twist, featuring a sleek black suede upper and contrasting white details for a standout look.",
      subText: "Designed for both casual and active lifestyles, these sneakers are built for comfort, durability, and versatile style. Perfect for streetwear or everyday wear.",
      features: [
        "Premium suede upper for a soft, durable feel",
        "Classic white accents with Adidas signature 3-stripes",
        "Cushioned insole for all-day comfort",
        "Rubber outsole for superior grip and support",
        "Iconic Campus 00s design with a retro vibe"
      ],
      specifications: [
        "Material: Suede Upper, Rubber Outsole",
        "Size: US 11",
        "Color: Core Black / Ftwwht / Owhite",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱250", days: "3-5 Days" },
      express: { price: "₱350", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 11,
    name: "SAYO TOMASYON 2024 Spring Unisex Men's Shoes Plus Size 47 Casual Sneakers White Canvas Shoes Boys Sport Sneakers Comfortable Women Loafers Black-CN 41",
    price: 1800,
    image: "/images/Client/product-page/Shoes/shoes11.jpg",
    category: "shoes",
    description: {
      main: "SAYO TOMASYON 2024 Spring Sneakers are designed for both comfort and style, perfect for all-day wear with a modern look for both men and women.",
      subText: "These white canvas shoes are lightweight, breathable, and versatile, making them ideal for casual, sporty, and everyday use.",
      features: [
        "Soft, breathable canvas upper for all-day comfort",
        "Sporty yet casual design for versatile styling",
        "Durable rubber outsole for great grip and traction",
        "Easy slip-on style with padded insole for added comfort",
        "Available in both men's and women's sizes, up to CN 47"
      ],
      specifications: [
        "Material: Canvas Upper, Rubber Outsole",
        "Size: 41 (CN) / US 8.5",
        "Comfortable and breathable design",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "3-5 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Muntinlupa City, Metro Manila"
  },
  {
    id: 12,
    name: "Leather Men Shoes Sneakers Trend Casual Shoes Italian Breathable Leisure Male Sneakers Non-slip shoes Men Vulcanized Shoes Blue-39",
    price: 1200,
    image: "/images/Client/product-page/Shoes/shoes12.jpg",
    category: "shoes",
    description: {
      main: "These Leather Men Sneakers offer a blend of Italian design, breathability, and comfort, perfect for casual outings, leisure activities, and everyday wear.",
      subText: "Crafted with a stylish leather upper, these shoes are designed to keep your feet comfortable with their breathable material and non-slip sole, ensuring durability and flexibility.",
      features: [
        "Premium leather upper with a stylish, sleek design",
        "Breathable material for enhanced comfort and ventilation",
        "Non-slip, vulcanized rubber outsole for excellent grip and stability",
        "Lightweight construction perfect for all-day wear",
        "Versatile design suitable for casual and semi-casual outfits"
      ],
      specifications: [
        "Material: Leather Upper, Rubber Outsole",
        "Size: 39 (EU) / US 6.5",
        "Breathable and flexible design",
        "Imported from Italy"
      ]
    },
    shipping: {
      standard: { price: "₱180", days: "3-5 Days" },
      express: { price: "₱300", days: "1-2 Days" }
    },
    location: "Pasig City, Metro Manila"
  }












];

// Export products with random store info
export const personalCareProducts = originalPersonalCareProducts.map(product => ({
  ...product,
  storeInfo: getRandomStore()
}));
