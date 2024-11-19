export const stores = [
  // Top Stores
  {
    id: 1,
    name: "D18 Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore.svg",
    rating: 4.9,
    ratingCount: "1.2M",
    followers: "298.3K",
    productCount: 659,
    chatResponse: "73%",
    memberSince: 2017,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 2,
    name: "iCure Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore-1.svg",
    rating: 4.8,
    ratingCount: "856K",
    followers: "156.2K",
    productCount: 432,
    chatResponse: "85%",
    memberSince: 2019,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 3,
    name: "Dr. Care",
    logo: "/images/Client/product-page/Store Section/imagestore-2.svg",
    rating: 4.7,
    ratingCount: "654K",
    followers: "142.5K",
    productCount: 378,
    chatResponse: "92%",
    memberSince: 2018,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 4,
    name: "Daan Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore-3.svg",
    rating: 4.6,
    ratingCount: "524K",
    followers: "98.7K",
    productCount: 245,
    chatResponse: "88%",
    memberSince: 2020,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  // Latest Stores
  {
    id: 5,
    name: "Medical Advantage",
    logo: "/images/Client/product-page/Store Section/imagestore-4.svg",
    rating: 4.5,
    ratingCount: "125K",
    followers: "45.2K",
    productCount: 189,
    chatResponse: "79%",
    memberSince: 2022,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 6,
    name: "JS Alaan Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore-5.svg",
    rating: 4.4,
    ratingCount: "98K",
    followers: "32.8K",
    productCount: 156,
    chatResponse: "82%",
    memberSince: 2022,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 7,
    name: "iCure Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore-6.svg",
    rating: 4.3,
    ratingCount: "75K",
    followers: "28.4K",
    productCount: 134,
    chatResponse: "76%",
    memberSince: 2023,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 8,
    name: "Medicare Pharmacy",
    logo: "/images/Client/product-page/Store Section/imagestore-7.svg",
    rating: 4.2,
    ratingCount: "45K",
    followers: "21.6K",
    productCount: 98,
    chatResponse: "81%",
    memberSince: 2023,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  }
];

// Helper functions to get store lists
export const getTopStores = () => stores.slice(0, 4);
export const getLatestStores = () => stores.slice(4, 8); 