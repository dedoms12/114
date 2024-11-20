import React from 'react';
import { useNavigate } from 'react-router-dom';

const CareChoiceSection = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/general-health');
  };

  const careChoiceProducts = [
    {
      id: 24,
      name: "DISPOSABLE Face Mask 3-Ply with Earloop (50pcs)",
      price: 27,
      rating: 4,
      soldCount: 1256,
      image: "/images/Client/product-page/gen-health/image2ndbatch-12.svg",
      category: "general-health"
    },
    {
      id: 1,
      name: "CASINO Ethyl Alcohol Regular 500ml",
      price: 98,
      rating: 5,
      soldCount: 801,
      image: "/images/Client/product-page/gen-health/image1stbatch-11.svg",
      category: "general-health"
    },
    {
      id: 2,
      name: "Fern-C 568 18mg",
      price: 8,
      rating: 5,
      soldCount: 1264,
      image: "/images/Client/product-page/supplements/image1stbatch-10.svg",
      category: "supplements"
    },
    {
      id: 12,
      name: "Biogesic Caplet 500mg 500 - MRP 10's",
      price: 43,
      rating: 5,
      soldCount: 5500,
      image: "/images/Client/product-page/supplements/image1stbatch-6.svg",
      category: "supplements",
      description: {
        main: "Paracetamol Pain Reliever",
        subText: "For Fever and Mild Pain",
        features: [
          "Fast Pain Relief",
          "Fever Reducer",
          "Easy to Swallow",
          "Trusted Brand"
        ],
        specifications: [
          "500mg per caplet",
          "10 caplets per pack",
          "For adults and children",
          "Store below 30°C",
          "Keep away from moisture"
        ]
      },
      shipping: {
        standard: { price: "₱30", days: "10 Hours" },
        express: { price: "₱50", days: "5 Hours" }
      },
      reviews: [
        {
          id: 1,
          user: "PainFree",
          rating: 5,
          date: "2024-03-14",
          comment: "Always reliable for fever and headache.",
          images: []
        }
      ],
      images: [
        "/images/Client/product-page/supplements/image1stbatch-6.svg",
        "/images/Client/product-page/supplements/image1stbatch-6.svg",
        "/images/Client/product-page/supplements/image1stbatch-6.svg"
      ],
      location: "Butuan City, Agusan Del Norte"
    },
  ];

  const ProductCard = ({ product }) => {
    const handleProductClick = () => {
      navigate(`/${product.category}/product/${product.id}`, {
        state: { 
          from: '/',
          productData: product,
          scrollPosition: window.pageYOffset
        }
      });
    };

    return (
      <div 
        onClick={handleProductClick}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="aspect-square mb-4 h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[40px]">{product.name}</h3>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold text-[#F1511B]">₱ {product.price}</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(product.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
            </div>
            <p className="text-xs text-gray-500">{product.location}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Care Choice Products</h2>
        <button 
          onClick={handleSeeAll}
          className="text-sm text-gray-600 hover:text-pill-blue flex items-center"
        >
          See All
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {careChoiceProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CareChoiceSection; 