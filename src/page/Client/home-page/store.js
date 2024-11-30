export const stores = [
  // Top Stores
  {
    id: 1,
    name: "RetroRevive Thrift",
    logo: "/images/Client/product-page/Store Section/logo.jpg",
    rating: 4.9,
    ratingCount: "500k",
    followers: "300K",
    productCount: 300,
    chatResponse: "90%",
    memberSince: 2012,
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
    name: "Vintage Finds",
    logo: "/images/Client/product-page/Store Section/logo1.jpg",
    rating: 4.8,
    ratingCount: "850K",
    followers: "156.2K",
    productCount: 212,
    chatResponse: "95%",
    memberSince: 2002,
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
    name: "EcoThreads",
    logo: "/images/Client/product-page/Store Section/logo2.jpg",
    rating: 4.5,
    ratingCount: "342K",
    followers: "141.5K",
    productCount: 321,
    chatResponse: "95%",
    memberSince: 2012,
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
    name: "Second Chance Apparel",
    logo: "/images/Client/product-page/Store Section/logo3.jpg",
    rating: 4.5,
    ratingCount: "321K",
    followers: "109K",
    productCount: 232,
    chatResponse: "85%",
    memberSince: 2015,
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
    name: "Thrift Luxe",
    logo: "/images/Client/product-page/Store Section/logo4.jpg",
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
    name: "The Thrift Shop",
    logo: "/images/Client/product-page/Store Section/logo5.jpg",
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
    name: "Pre-Loved Couture",
    logo: "/images/Client/product-page/Store Section/logo6.jpg",
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
    name: "Thriftstore",
    logo: "/images/Client/product-page/Store Section/logo7.jpg",
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