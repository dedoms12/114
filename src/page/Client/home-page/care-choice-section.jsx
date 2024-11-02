import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CareChoiceSection = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/general-health');
  };

  const careChoiceProducts = [
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
      name: "STRESSTABS Multivitamins + Iron 8 Tablets",
      price: "257",
      image: "/images/Client/product-page/Care Choice/imagecare-9.svg",
      soldCount: "4.6k",
      rating: 5,
      location: "Quezon City, Metro Manila"
    }
  ];

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow h-full">
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
    </Link>
  );

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