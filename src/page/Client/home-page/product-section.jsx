import React from 'react';

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: "Indoplas Disposable Face Mask 3-Ply With Earloop | Box (50 Pcs)",
      price: "59",
      image: "/images/Client/product-page/Care Choice/imagecare-8.svg",
      soldCount: "1,205",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 2,
      name: "Casino Ethyl Alcohol Regular 500ml",
      price: "99",
      image: "/images/Client/product-page/Care Choice/imagecare-7.svg",
      soldCount: "801",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 3,
      name: "Biogesic Caplet 500mg 500 -MRP 10's",
      price: "43",
      image: "/images/Client/product-page/Care Choice/imagecare-6.svg",
      soldCount: "3",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 4,
      name: "STRESSTABS Multivitamins + Iron B Tablets",
      price: "257",
      image: "/images/Client/product-page/Care Choice/imagecare-9.svg",
      soldCount: "4.6k",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 5,
      name: "Simplee Ascorbic Acid/Vitamin C Capsule Supplement 1 Bottle",
      price: "196",
      image: "/images/Client/product-page/Care Choice/imagecare-5.svg",
      soldCount: "0",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 6,
      name: "Colgate Maximum Cavity Protection Toothpaste Anticavity",
      price: "179",
      image: "/images/Client/product-page/Care Choice/imagecare-4.svg",
      soldCount: "12",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 7,
      name: "50Pcs/Set Teeth Toothpicks Stick Dental Floss Flosser",
      price: "10",
      image: "/images/Client/product-page/Care Choice/imagecare-3.svg",
      soldCount: "620",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 8,
      name: "100 Pcs Alcohol Cotton Pads, Disinfection Cotton Pads, Boxed Alcohol Cotton Pads",
      price: "26",
      image: "/images/Client/product-page/Care Choice/imagecare-2.svg",
      soldCount: "502",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 9,
      name: "[FDA APPROVED] WORADA SPF60 Face Sunscreen 50g Sunblock Whitening Cream",
      price: "84",
      image: "/images/Client/product-page/Care Choice/imagecare-1.svg",
      soldCount: "25",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 10,
      name: "Heers Glow Absolue Hydration | Whitening | Anti Aging | Gut Health | Skin Hydration",
      price: "349",
      image: "/images/Client/product-page/Care Choice/imagecare.svg",
      soldCount: "103",
      rating: 5,
      location: "Quezon City, Metro Manila"
    }
  ];

  const categories = ['General Health', 'Medical Supplies', 'Supplements', 'Personal Care'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-lg font-semibold">CATEGORIES</h2>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-1 rounded-full border border-gray-300 text-sm hover:border-pill-blue hover:text-pill-blue"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">PillPoint Care Choice</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="aspect-square mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold text-[#F1511B]">₱ {product.price}</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
            </div>
            <p className="text-xs text-gray-500">{product.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
