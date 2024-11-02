import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import YouMightLike from '../might-like';
import { products } from '../../product-page/general-health/gen-products';
import ReviewsModal from './ReviewsModal';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Find the product from our products data
  const product = products.find(p => p.id === parseInt(id)) || {
    id: 0,
    name: "",
    price: 0,
    rating: 0,
    soldCount: 0,
    ratings: 0,
    shipping: {
      standard: { price: "FREE", days: "3-5 Days" },
      express: { price: "₱68", days: "1-2 Days" }
    },
    colors: [],
    description: {
      main: "",
      subText: "",
      features: [],
      specifications: []
    },
    images: [],
    location: "",
    reviews: []
  };

  const defaultImage = product.image || product.images?.[0];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const ReviewCard = ({ review }) => (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2">
          {review.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Review ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Header Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Product Images */}
            <div>
              <div className="mb-4">
                <img 
                  src={product.images?.[selectedImage] || defaultImage}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(product.images?.length > 0 ? product.images : [defaultImage]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded-lg p-2 ${selectedImage === index ? 'border-blue-500' : ''}`}
                  >
                    <img 
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <h1 className="text-2xl font-medium">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-[#FF8A00] font-medium">{product.rating}</span>
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-gray-500">{product.ratings} Ratings</span>
                <span className="text-gray-500">{product.soldCount} Sold</span>
              </div>

              <div className="text-3xl font-medium text-[#F1511B]">
                ₱ {product.price}
              </div>

              {/* Shipping Options */}
              <div className="space-y-4">
                <h3 className="font-medium">Shipping</h3>
                <div className="flex gap-4">
                  {Object.entries(product.shipping).map(([type, details]) => (
                    <button
                      key={type}
                      onClick={() => setSelectedShipping(type)}
                      className={`flex-1 p-3 rounded-lg border ${
                        selectedShipping === type ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <div className="text-sm font-medium">{details.price}</div>
                      <div className="text-xs text-gray-500">{details.days}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? 'border-blue-500' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="font-medium">Quantity</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 border rounded-md"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 border rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#E6F0FF] text-[#4C9BF5] rounded-md hover:bg-blue-50">
                  Add To Cart
                </button>
                <button className="flex-1 px-6 py-3 bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description and You Might Also Like Section */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left: Product Description (2 columns) */}
          <div className="col-span-2 bg-white rounded-lg p-6">
            <h2 className="text-xl font-medium mb-6">Product Description</h2>
            <div className="space-y-6">
              <p className="font-medium">{product.description.main}</p>
              <p>{product.description.subText}</p>
              
              <div className="space-y-4">
                <h3 className="font-medium">Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.description.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Specifications</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.description.specifications.map((spec, index) => (
                    <li key={index} className="text-gray-700">{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: You Might Also Like (1 column) */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-medium mb-6">You Might Also Like</h2>
            <YouMightLike vertical={true} />
          </div>
        </div>

        {/* Reviews Section (Full Width) */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Reviews</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsReviewModalOpen(true)} 
                className="flex items-center gap-2 text-sm text-[#4C9BF5] hover:text-blue-600"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
                <span>Add Review</span>
              </button>
              <button 
                onClick={() => setIsReviewModalOpen(true)} 
                className="text-sm text-[#4C9BF5] hover:text-blue-600"
              >
                See All
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {product.reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
      <ReviewsModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;