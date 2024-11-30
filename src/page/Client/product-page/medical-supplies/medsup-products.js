import { stores } from '../../home-page/store';

// Helper function to get random store
const getRandomStore = () => {
  return stores[Math.floor(Math.random() * stores.length)];
};

// Original products array
const originalMedicalProducts = [
  {
    id: 1,
    name: "Wedtrend Women's Vintage Tea Dress, Short Sleeve Cocktail Party Dress Work Church Casual Dress",
    price: 950,
    image: "/images/Client/product-page/Womenswear/dress1.jpg",
    category: "womenswear",
    description: {
      main: "A classic vintage-inspired tea dress with a flattering silhouette.",
      subText: "Perfect for cocktail parties, church services, or casual workdays.",
      features: [
        "Short sleeves with a comfortable fit",
        "Vintage tea dress style",
        "Flared skirt for a feminine look",
        "Button-down back closure"
      ],
      specifications: [
        "Material: 100% Polyester",
        "Hand wash only",
        "Available in sizes S-XL",
        "Flattering fit for all body types",
        "Made in the Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "3-4 Days" },
      express: { price: "₱140", days: "1-2 Days" }
    },
    location: "Davao City, Davao del Sur"
  },
  {
    id: 2,
    name: "GREEN 1940S LAPEL BUTTONED SOLID DRESS",
    price: 1200,
    image: "/images/Client/product-page/Womenswear/dress2.jpg",
    category: "womenswear",
    description: {
      main: "A retro-inspired 1940s lapel dress with a solid color and button details.",
      subText: "Ideal for formal gatherings, vintage-themed parties, or elegant events.",
      features: [
        "Classic lapel collar",
        "Button-down front",
        "Slim fit design with flared skirt",
        "Elegant and timeless design"
      ],
      specifications: [
        "Material: 85% Polyester, 15% Spandex",
        "Machine washable",
        "Available in sizes XS-XL",
        "Perfect for vintage fashion enthusiasts",
        "Made in the Philippines"
      ]
    },
    shipping: {
      standard: { price: "₱90", days: "4-5 Days" },
      express: { price: "₱160", days: "2 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 3,
    name: "Light Blue 1950s Vintage Dress with Sleeves",
    price: 1200,
    image: "/images/Client/product-page/Womenswear/dress3.jpg",
    category: "womenswear",
    description: {
      main: "A classic 1950s-inspired vintage dress in light blue, featuring sleeves for a modest and elegant look.",
      subText: "Perfect for vintage enthusiasts, this dress offers a flattering silhouette and timeless style.",
      features: [
        "1950s vintage-inspired design",
        "Elegant light blue color for a refreshing look",
        "Sleeves for added comfort and style",
        "Flattering A-line shape that suits various body types"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable or hand wash recommended",
        "Available in multiple sizes",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱90", days: "3-5 Days" },
      express: { price: "₱150", days: "1-2 Days" }
    },
    location: "Makati City, Metro Manila"
  },
  {
    id: 12,
    name: "Women Y2K Peplum Shirt Puff Sleeve Tie Front Top Blouse Cute Going Out Babydoll Crop Top Summer (H-Yellow Solid Color Peplum Shirt, S)",
    price: 850,
    image: "/images/Client/product-page/Womenswear/shirt1.jpg",
    category: "womenswear",
    description: {
      main: "A stylish Y2K-inspired peplum shirt with puff sleeves and a tie front design, perfect for a cute and chic summer look.",
      subText: "This yellow babydoll crop top adds a playful touch to your wardrobe, ideal for going out or casual outings.",
      features: [
        "Y2K-inspired design with puff sleeves",
        "Tie front detail for a customizable fit",
        "Peplum cut for a flattering silhouette",
        "Bright yellow solid color for a cheerful summer vibe"
      ],
      specifications: [
        "Material: 95% Cotton, 5% Spandex",
        "Machine washable",
        "Available in sizes S, M, L",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-5 Days" },
      express: { price: "₱120", days: "1-2 Days" }
    },
    location: "Taguig City, Metro Manila"
  }  
  ,
  {
    id: 5,
    name: "floerns Women's Long Sleeve Rib Knit Tie Front Cropped Cardigan",
    price: 750,
    image: "/images/Client/product-page/Womenswear/shirt2.jpg",
    category: "womenswear",
    description: {
      main: "A stylish cropped cardigan with long sleeves and a ribbed knit pattern.",
      subText: "Perfect for layering in colder weather or pairing with high-waisted pants.",
      features: [
        "Ribbed knit fabric",
        "Tie front design",
        "Cropped fit for a modern look",
        "Soft and breathable"
      ],
      specifications: [
        "Material: 95% Cotton, 5% Spandex",
        "Machine washable",
        "Available in sizes S-XL",
        "Versatile for any casual outfit"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-4 Days" },
      express: { price: "₱120", days: "2 Days" }
    },
    location: "Manila, Metro Manila"
  },
  {
    id: 6,
    name: "Alice Pearl Weekend Top - Coffee on Garmentory",
    price: 800,
    image: "/images/Client/product-page/Womenswear/shirt3.jpg",
    category: "womenswear",
    description: {
      main: "A trendy top with pearl detailing and a relaxed fit.",
      subText: "Great for a casual weekend outing or a cozy day at home.",
      features: [
        "Pearl embellishments on the sleeves",
        "Relaxed fit for comfort",
        "Short sleeves",
        "Stylish and trendy"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Machine washable",
        "Available in sizes XS-XL",
        "Perfect for pairing with jeans or skirts"
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "3-4 Days" },
      express: { price: "₱130", days: "1-2 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 7,
    name: "Chained Elegance Waffle Shirt",
    price: 950,
    image: "/images/Client/product-page/Womenswear/shirt4.jpg",
    category: "womenswear",
    description: {
      main: "A chic waffle-knit shirt with a relaxed fit and trendy design.",
      subText: "Perfect for layering or as a standalone top.",
      features: [
        "Waffle-knit fabric",
        "Loose, relaxed fit",
        "Long sleeves",
        "Versatile for any occasion"
      ],
      specifications: [
        "Material: 80% Polyester, 20% Cotton",
        "Machine washable",
        "Available in sizes S-XL",
        "Stylish for both casual and semi-formal looks"
      ]
    },
    shipping: {
      standard: { price: "₱85", days: "2-3 Days" },
      express: { price: "₱150", days: "1 Day" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 8,
    name: "Chained Elegance Waffle Shirt",
    price: 950,
    image: "/images/Client/product-page/Womenswear/skirt1.jpg",
    category: "womenswear",
    description: {
      main: "A chic waffle-knit shirt with a relaxed fit and trendy design.",
      subText: "Perfect for layering or as a standalone top.",
      features: [
        "Waffle-knit fabric",
        "Loose, relaxed fit",
        "Long sleeves",
        "Versatile for any occasion"
      ],
      specifications: [
        "Material: 80% Polyester, 20% Cotton",
        "Machine washable",
        "Available in sizes S-XL",
        "Stylish for both casual and semi-formal looks"
      ]
    },
    shipping: {
      standard: { price: "₱85", days: "2-3 Days" },
      express: { price: "₱150", days: "1 Day" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 9,
    name: "Satin Skirt Drawstring Lace Casual Skirt Summer Solid Color Women Skirt",
    price: 850,
    image: "/images/Client/product-page/Womenswear/skirt2.jpg",
    category: "womenswear",
    description: {
      main: "A satin skirt with a drawstring lace-up detail for a chic, casual summer look.",
      subText: "Ideal for warm weather and versatile styling.",
      features: [
        "Soft satin fabric",
        "Adjustable drawstring waist",
        "Lace-up detail for added flair",
        "Available in various solid colors"
      ],
      specifications: [
        "Material: 100% Satin",
        "Hand wash or machine wash cold",
        "Available in sizes S-XL",
        "Perfect for casual outings or beach days"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-4 Days" },
      express: { price: "₱120", days: "2 Days" }
    },
    location: "Makati City, Metro Manila"
  },
  {
    id: 10,
    name: "Modern Single-Breasted Slim Fit Solid Skirt - Pink / XL",
    price: 750,
    image: "/images/Client/product-page/Womenswear/skirt3.jpg",
    category: "womenswear",
    description: {
      main: "A modern single-breasted slim-fit skirt in pink, designed for a sleek and stylish look.",
      subText: "Perfect for both formal and casual settings, offering a flattering slim fit.",
      features: [
        "Single-breasted design for a modern look",
        "Slim fit for a sleek silhouette",
        "Ideal for formal or semi-formal events",
        "Available in multiple sizes and colors"
      ],
      specifications: [
        "Material: 80% Cotton, 20% Polyester",
        "Machine washable",
        "Available in sizes S, M, L, XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱80", days: "3-5 Days" },
      express: { price: "₱130", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 11,
    name: "Youtalia Women's 3/4 Cuffed Sleeve Chiffon Printed V-Neck Casual Blouse Shirt Tops",
    price: 950,
    image: "/images/Client/product-page/Womenswear/shirt5.jpg",
    category: "womenswear",
    description: {
      main: "A breezy and stylish chiffon blouse with 3/4 cuffed sleeves and a flattering V-neck design, perfect for casual outings or office wear.",
      subText: "Featuring a chic printed pattern, this blouse offers a relaxed fit with a feminine touch, ideal for warm weather.",
      features: [
        "Light and breathable chiffon fabric",
        "3/4 cuffed sleeves for an elegant look",
        "Flattering V-neck design",
        "Versatile printed pattern suitable for casual and semi-formal occasions"
      ],
      specifications: [
        "Material: 100% Chiffon",
        "Machine washable",
        "Available in sizes S, M, L, XL",
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
    id: 12,
    name: "Fashion Simple Women's Solid Color Long-sleeved Shirt - Ginger / 3XL",
    price: 1050,
    image: "/images/Client/product-page/Womenswear/shirt6.jpg",
    category: "womenswear",
    description: {
      main: "A versatile and comfortable long-sleeved shirt in a rich ginger color, offering a simple yet stylish design.",
      subText: "Perfect for layering or wearing on its own, this solid color shirt is ideal for casual or semi-formal occasions.",
      features: [
        "Simple and elegant design with a solid ginger color",
        "Soft and breathable fabric for all-day comfort",
        "Long sleeves for cooler weather or layering",
        "Available in a range of sizes including 3XL for a relaxed fit"
      ],
      specifications: [
        "Material: 95% Cotton, 5% Spandex",
        "Machine washable",
        "Available in sizes S, M, L, XL, 2XL, 3XL",
        "Imported"
      ]
    },
    shipping: {
      standard: { price: "₱90", days: "3-5 Days" },
      express: { price: "₱150", days: "1-2 Days" }
    },
    location: "Davao City, Davao del Sur"
  }   
];

// Export products with random store info
export const medicalProducts = originalMedicalProducts.map(product => ({
  ...product,
  storeInfo: getRandomStore()
}));
