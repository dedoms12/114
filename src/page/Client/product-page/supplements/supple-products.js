import { stores } from '../../home-page/store';

// Helper function to get random store
const getRandomStore = () => {
  return stores[Math.floor(Math.random() * stores.length)];
};

// Original products array
const originalSupplementProducts = [
  {
    id: 1,
    name: "Toddler Baby Girl Cotton Linen Dress Ruffle Sleeve Halter Sleeveless",
    price: 150,
    image: "/images/Client/product-page/Kidswear/kids1.jpg",
    category: "kidswear",
    description: {
      main: "A cute and comfortable cotton-linen dress for toddler girls, perfect for warm weather, featuring ruffled sleeves and a stylish halter design.",
      subText: "The dress offers a cool and breathable option for your little one, with a charming white color that pairs well with any occasion.",
      features: [
        "Soft cotton-linen fabric blend",
        "Ruffled sleeve design for added cuteness",
        "Halter style with an open back for comfort",
        "Lightweight and breathable for summer wear"
      ],
      specifications: [
        "Material: 50% Cotton, 50% Linen",
        "Color: White",
        "Size: 4tg (Toddler Girls)",
        "Perfect for warm weather and casual outings"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "3-5 Days" },
      express: { price: "₱120", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 2,
    name: "PTPuke Kids' Tees Crewneck Cotton Solid T-Shirts",
    price: 180,
    image: "/images/Client/product-page/Kidswear/kids2.jpg",
    category: "kidswear",
    description: {
      main: "A pack of comfortable and soft crewneck cotton tees for boys and girls, perfect for casual wear or as an undershirt. These solid-color t-shirts are ideal for everyday use.",
      subText: "The classic crewneck design and soft cotton fabric make these tees a staple in any toddler's or child's wardrobe, providing both comfort and durability for all-day wear.",
      features: [
        "Soft, breathable cotton fabric for comfort",
        "Classic crewneck style suitable for both boys and girls",
        "Short sleeve design perfect for warm weather",
        "Solid colors to easily match with any outfit",
        "Available in various sizes for toddlers and kids"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Size: Available for toddlers and kids (2-10 Years)",
        "Machine washable for easy care",
        "Color: Available in multiple solid colors"
      ]
    },
    shipping: {
      standard: { price: "₱50", days: "5-7 Days" },
      express: { price: "₱90", days: "2-3 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 3,
    name: "Rainbow Stars Long Sleeved Unicorn Dress",
    price: 150,
    image: "/images/Client/product-page/Kidswear/kids3.jpg",
    category: "kidswear",
    description: {
      main: "A cute and magical long-sleeved dress with a unicorn design, featuring rainbow stars and a soft, comfortable fit. Perfect for special occasions or everyday wear.",
      subText: "This charming dress is perfect for your little one to show off their unicorn-loving style while keeping cozy with long sleeves. Ideal for playdates, parties, and casual outings.",
      features: [
        "Soft and breathable fabric for comfort",
        "Long-sleeve design for added warmth",
        "Rainbow star prints and a unicorn graphic for a fun, magical look",
        "Elastic waistband for a perfect fit",
        "Available in multiple sizes"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Size: Available in sizes 4 and above",
        "Machine washable for easy maintenance",
        "Color: Beige with rainbow star and unicorn prints"
      ]
    },
    shipping: {
      standard: { price: "₱60", days: "5-7 Days" },
      express: { price: "₱100", days: "2-3 Days" }
    },
    location: "Pasig City, Metro Manila"
  },
  {
    id: 4,
    name: "Bayswater Girls Trench Coat - Mustard",
    price: 120,
    image: "/images/Client/product-page/Kidswear/kids4.jpg",
    category: "kidswear",
    description: {
      main: "A stylish mustard trench coat for girls, offering a fashionable yet functional layer for cooler days.",
      subText: "This coat is designed with a classic trench silhouette and includes a belt for a tailored look.",
      features: [
        "Classic trench coat design",
        "Belted waist for a custom fit",
        "Button front with flap pockets",
        "Soft fabric ideal for layering"
      ],
      specifications: [
        "Material: 100% Polyester",
        "Color: Mustard",
        "Size: Available in various sizes for girls"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "3-5 Days" },
      express: { price: "₱250", days: "1-2 Days" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 5,
    name: "NNJXD Girl Sleeveless Embroidery Princess Pageant Dresses Kids Prom Ball Gown",
    price: 130,
    image: "/images/Client/product-page/Kidswear/kids5.jpg",
    category: "kidswear",
    description: {
      main: "An elegant sleeveless princess pageant dress with intricate embroidery, perfect for special events, proms, or formal occasions. The dress features a full ball gown silhouette for a royal look.",
      subText: "This stunning gown will make your little one feel like royalty. Featuring delicate embroidery and a voluminous skirt, it's perfect for any princess-themed occasion.",
      features: [
        "Sleeveless design for comfort and ease of movement",
        "Intricate embroidery and lace details on the bodice",
        "Full skirt with layers for a beautiful ball gown look",
        "Zipper closure at the back for easy dressing",
        "Ideal for pageants, proms, or formal parties"
      ],
      specifications: [
        "Material: 100% Polyester with lace and embroidery details",
        "Available in sizes 4, 6, 8, 10, and 12",
        "Machine washable for convenience",
        "Color: Available in soft pastel shades"
      ]
    },
    shipping: {
      standard: { price: "₱100", days: "7-10 Days" },
      express: { price: "₱150", days: "3-5 Days" }
    },
    location: "Muntinlupa City, Metro Manila"
  },
  {
    id: 6,
    name: "Uuszgmr Baby Shorts For Boys Girls Solid Color Comfortable Spring Summer Cotton Shorts",
    price: 180,
    image: "/images/Client/product-page/Kidswear/kids6.jpg",
    category: "kidswear",
    description: {
      main: "Soft and comfortable solid color baby shorts, perfect for warm spring and summer days. Designed for both boys and girls, these cotton shorts offer a breathable and relaxed fit for active infants.",
      subText: "These adorable cotton shorts are ideal for casual outings and playtime. Available in a variety of sizes to fit toddlers and babies, making them a must-have for warmer weather.",
      features: [
        "Made from soft, breathable cotton for all-day comfort",
        "Elastic waistband for a secure, adjustable fit",
        "Simple solid color design for easy matching",
        "Available in sizes 3-6 months, 2-3 years",
        "Perfect for spring and summer activities"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Color: Yellow (for 2-3 years), Gray (for 3-6 months)",
        "Machine washable for easy care",
        "Soft and lightweight fabric ideal for warmer weather"
      ]
    },
    shipping: {
      standard: { price: "₱50", days: "5-7 Days" },
      express: { price: "₱100", days: "2-3 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 7,
    name: "SAYO TOMASYON 2024 Summer Young Children Boys Shorts Cotton Embroidery Dinosaur Girls Sports Shorts",
    price: 150,
    image: "/images/Client/product-page/Kidswear/kids7.jpg",
    category: "kidswear",
    description: {
      main: "Cute and comfortable cotton shorts for young children, featuring a playful embroidered dinosaur design. Ideal for both boys and girls, these sports shorts are perfect for active kids during the summer months.",
      subText: "These vibrant yellow shorts are not only stylish but also soft and breathable, keeping kids cool and comfortable while playing outdoors. Available for children aged 2-6 years.",
      features: [
        "Embroidered dinosaur design adds fun appeal",
        "Soft cotton material for comfort",
        "Elastic waistband for an adjustable fit",
        "Breathable and lightweight, ideal for summer",
        "Available in sizes 2T-6T"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Color: Yellow with Dinosaur Embroidery",
        "Machine washable for easy care",
        "Elastic waist for secure and comfortable fit"
      ]
    },
    shipping: {
      standard: { price: "₱50", days: "5-7 Days" },
      express: { price: "₱100", days: "2-3 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 8,
    name: "UWBACK Boys Winter Jacket Kids Hooded Down Coats Warm Parka with Faux Fur Trim For Girls",
    price: 150,
    image: "/images/Client/product-page/Kidswear/kids8.jpg", // Replace with actual image path
    category: "kidswear",
    description: {
      main: "A warm and stylish winter jacket designed for both boys and girls. The UWBACK hooded down coat features a faux fur trim for added flair and extra warmth, making it perfect for cold weather.",
      subText: "This cozy jacket provides excellent insulation and comfort, ideal for outdoor winter activities. Its durable design ensures your child stays warm and fashionable throughout the season.",
      features: [
        "Soft down insulation for warmth",
        "Removable faux fur trim on the hood for a stylish look",
        "Hooded design for added protection against the cold",
        "Zipper closure with button flap for extra warmth",
        "Two front pockets for storage"
      ],
      specifications: [
        "Material: 100% Polyester",
        "Faux fur trim: Polyester blend",
        "Available in multiple colors: Navy, Black, Red",
        "Machine washable for easy maintenance",
        "Suitable for kids aged 4-12 years"
      ]
    },
    shipping: {
      standard: { price: "₱150", days: "5-7 Days" },
      express: { price: "₱250", days: "2-3 Days" }
    },
    location: "Davao City, Davao del Sur"
  },
  {
    id: 9,
    name: "CareTec Unisex Kid's Rain Jacket-PU W/O Fleece Waterproof",
    price: 120,
    image: "/images/Client/product-page/Kidswear/kids9.jpg", // Replace with actual image path
    category: "kidswear",
    description: {
      main: "The CareTec Unisex Kid's Rain Jacket is designed to keep your child dry and comfortable during rainy days. Made from waterproof PU material, this jacket ensures protection from the elements without sacrificing style.",
      subText: "This lightweight rain jacket features a simple yet functional design, making it a great addition to your child's wardrobe for wet weather. Perfect for school, outdoor activities, and playtime.",
      features: [
        "Waterproof PU material to keep your child dry",
        "Lightweight and breathable design for comfort",
        "Elastic cuffs and hood for added protection",
        "Simple, stylish design suitable for both boys and girls",
        "Easy to pack and carry for on-the-go use"
      ],
      specifications: [
        "Material: 100% PU (Polyurethane)",
        "Available in multiple sizes: XS, S, M, L",
        "Machine washable for easy care",
        "Available in bright colors: Yellow, Blue, Green",
        "Perfect for rainy days and outdoor play"
      ]
    },
    shipping: {
      standard: { price: "₱100", days: "5-7 Days" },
      express: { price: "₱180", days: "2-3 Days" }
    },
    location: "Cebu City, Cebu"
  },
  {
    id: 10,
    name: "Letterman Kid's Jacket FL11K - Black/White / 12K",
    price: 180,
    image: "/images/Client/product-page/Kidswear/kids10.jpg", // Replace with actual image path
    category: "kidswear",
    description: {
      main: "The Letterman Kid's Jacket FL11K offers a classic sporty style with a contemporary twist. Designed with comfort and warmth in mind, this black/white jacket is perfect for the active, stylish child.",
      subText: "With a sporty letterman design, this jacket is a great fit for casual outings or school activities. The lightweight material provides comfort and warmth for cooler days.",
      features: [
        "Classic letterman design with ribbed cuffs and hem",
        "Black and white color combination for a versatile look",
        "Zipper closure for easy wear",
        "Soft and breathable material suitable for all-day wear",
        "Perfect for sports activities or casual wear"
      ],
      specifications: [
        "Material: 60% Cotton, 40% Polyester",
        "Available sizes: 12K",
        "Machine washable for easy maintenance",
        "Soft lining for added comfort",
        "Available in black/white color"
      ]
    },
    shipping: {
      standard: { price: "₱120", days: "3-5 Days" },
      express: { price: "₱200", days: "1-2 Days" }
    },
    location: "Quezon City, Metro Manila"
  },
  {
    id: 11,
    name: "Cartoon Short Sleeve Kids T-Shirt - Dinosaur / 5T",
    price: 350,
    image: "/images/Client/product-page/Kidswear/kids11.jpg", // Replace with actual image path
    category: "kidswear",
    description: {
      main: "This fun and colorful Cartoon Short Sleeve Kids T-Shirt features a playful dinosaur print. Ideal for active kids, it combines comfort and style, making it perfect for daily wear.",
      subText: "Made from soft, breathable cotton, this t-shirt is designed to keep your little one comfortable all day long. The vibrant dinosaur design is sure to be a hit with kids who love animals.",
      features: [
        "Adorable dinosaur cartoon print",
        "Soft and breathable cotton material",
        "Short sleeves for comfort during warmer weather",
        "Perfect for casual outings, school, or playtime",
        "Available in 5T size for young kids"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Available sizes: 5T",
        "Machine washable",
        "Vibrant, non-fading print",
        "Suitable for boys and girls"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "2-3 Days" },
      express: { price: "₱120", days: "1 Day" }
    },
    location: "Taguig City, Metro Manila"
  },
  {
    id: 12,
    name: "Summer Children's Clothing Children's Short-Sleeved T-Shirt Boy Half-Sleeved Baby Clothes",
    price: 350,
    image: "/images/Client/product-page/Kidswear/kids12.jpg", // Replace with actual image path
    category: "kidswear",
    description: {
      main: "This Summer Children's Short-Sleeved T-Shirt is perfect for warm weather. Made from soft and breathable fabric, it’s designed to keep your baby comfortable while looking stylish.",
      subText: "The half-sleeved t-shirt features a simple and trendy design, ideal for casual wear during the summer season. Easy to pair with any shorts or pants for a laid-back look.",
      features: [
        "Soft, breathable fabric for comfort",
        "Classic half-sleeve design for warm weather",
        "Perfect for casual outings, summer playtime, or family events",
        "Easy to wash and maintain",
        "Available in multiple sizes for boys and baby clothes"
      ],
      specifications: [
        "Material: 100% Cotton",
        "Available sizes: 2T, 3T, 4T",
        "Machine washable",
        "Lightweight and breathable for summer"
      ]
    },
    shipping: {
      standard: { price: "₱70", days: "2-3 Days" },
      express: { price: "₱120", days: "1 Day" }
    },
    location: "Davao City, Davao del Sur"
  }
];

// Export products with random store info
export const supplementProducts = originalSupplementProducts.map(product => ({
  ...product,
  storeInfo: getRandomStore()
}));


