import React, { useState } from 'react';

const TopProductsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const topProducts = [
    {
      id: 1,
      name: "Indoplas Disposable Face Mask 3-Ply With Earloop | Box (50 Pcs)",
      price: "59",
      image: "/images/Client/product-page/Top-section/imagetop5-4.svg",
      soldCount: "1,205",
      rating: 5,
      location: "Quezon City, Metro Manila",
      isOfficialStore: true
    },
    {
      id: 2,
      name: "Indoplas Elite Tokyo Japan BP305A USB-C Powered BP Blood Pressure Monitor",
      price: "549",
      image: "/images/Client/product-page/Top-section/imagetop5-3.svg",
      soldCount: "801",
      rating: 5,
      location: "Quezon City, Metro Manila",
      isOfficialStore: true
    },
    {
      id: 3,
      name: "Indoplas 26G IV Cannula W/ Wings & Injection Port - 1 PIECE",
      price: "9",
      image: "/images/Client/product-page/Top-section/imagetop5-2.svg",
      soldCount: "721",
      rating: 5,
      location: "Quezon City, Metro Manila",
      isOfficialStore: true
    },
    {
      id: 4,
      name: "Indoplas Sterile Latex Surgical Gloves Powder Free - 6.5 (1 Pair)",
      price: "13",
      image: "/images/Client/product-page/Top-section/imagetop5-1.svg",
      soldCount: "1",
      rating: 5,
      location: "Quezon City, Metro Manila",
      isOfficialStore: true
    },
    {
      id: 5,
      name: "Indoplas Elite Tokyo Japan Digital Thermometer T's",
      price: "3,799",
      image: "/images/Client/product-page/Top-section/imagetop5.svg",
      soldCount: "0",
      rating: 5,
      location: "Quezon City, Metro Manila",
      isOfficialStore: true
    },
    {
      id: 6,
      name: "CHERIFER PGM 10-22 With Zinc Capsule (Sold Per Capsule)",
      price: "20",
      image: "/images/Client/product-page/Top-section/imagetop10-4.svg",
      soldCount: "1,205",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 7,
      name: "MYRA E 400iu 30s Bottle",
      price: "382",
      image: "/images/Client/product-page/Top-section/imagetop10-3.svg",
      soldCount: "502",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 8,
      name: "BEAR BRAND Fortified Powdered Milk Drink 300g",
      price: "110",
      image: "/images/Client/product-page/Top-section/imagetop10-2.svg",
      soldCount: "25",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 9,
      name: "OXECURE Acne Clear Powder Mud 5g",
      price: "99",
      image: "/images/Client/product-page/Top-section/imagetop10.svg",
      soldCount: "0",
      rating: 5,
      location: "Quezon City, Metro Manila"
    },
    {
      id: 10,
      name: "LUXE ORGANIX Zero Shine Invisible Screen Daily Sun Stick SPF 50 17g",
      price: "399",
      image: "/images/Client/product-page/Top-section/imagetop10-1.svg",
      soldCount: "1",
      rating: 5,
      location: "Quezon City, Metro Manila"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(topProducts.length / 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(topProducts.length / 5) - 1 : prev - 1
    );
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Top Products</h2>
      </div>
      
      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <img 
            src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
            alt="Previous"
            className="h-6 w-6 transform rotate-[90deg]"
          />
        </button>

        <div className="grid grid-cols-5 gap-4">
          {topProducts
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <button 
          onClick={nextSlide}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <img 
            src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
            alt="Next"
            className="h-6 w-6 transform rotate-[270deg]"
          />
        </button>
      </div>
    </div>
  );
};

export default TopProductsSection;
