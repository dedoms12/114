import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../navbar';
import YouMightLike from '../might-like';
import { products } from '../../product-page/general-health/gen-products';
import { medicalProducts } from '../../product-page/medical-supplies/medsup-products';
import { supplementProducts } from '../../product-page/supplements/supple-products';
import { personalCareProducts } from '../../product-page/personal-care/pc-products';
import ReviewsModal from './ReviewsModal';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { getProductById } from '../../../../shared/services/productService';
import { stores } from '../../home-page/store';
import ReviewCard from './ReviewCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  const handleGoBack = () => {
    const { state } = location;
    if (state?.from === '/') {
      navigate('/');  // Navigate to home page
    } else if (state?.from) {
      navigate(state.from);
    } else {
      const category = location.pathname.split('/')[1];
      navigate(`/${category}`);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Get category from URL path
        const pathParts = location.pathname.split('/');
        const category = pathParts[1];
        
        // Map URL category to product data
        const productsByCategory = {
          'general-health': products,
          'medical-supplies': medicalProducts,
          'supplements': supplementProducts,
          'personal-care': personalCareProducts
        };

        // Find product in the correct category
        const categoryProducts = productsByCategory[category] || [];
        const foundProduct = categoryProducts.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const defaultImage = product?.image || product?.images?.[0];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const calculateAverageRating = (review) => {
    if (!review.ratings) {
      return review.rating || 0;
    }
    const { productQuality, sellerService, deliverySpeed } = review.ratings;
    const sum = (productQuality || 0) + (sellerService || 0) + (deliverySpeed || 0);
    return sum > 0 ? Math.round((sum / 3) * 10) / 10 : 0;
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category,
        variation: selectedColor || 'Default'
      }
    });
    
    toast.success('Product added to cart!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleBuyNow = () => {
    const item = {
      id: product.id,
      category: location.pathname.split('/')[1],
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      variation: selectedColor,
      selected: true,
      isBuyNow: true
    };

    dispatch({ type: 'ADD_TO_CART', payload: item });
    navigate('/checkout', { 
      state: { 
        buyNow: true,
        productId: product.id 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={handleGoBack}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Products
        </button>
        
        {/* Product Header Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Product Images */}
            <div>
              <div className="mb-4">
                <img 
                  src={product?.images?.[selectedImage] || defaultImage}
                  alt={product?.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(product?.images?.length > 0 ? product.images : [defaultImage]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded-lg p-2 ${selectedImage === index ? 'border-blue-500' : ''}`}
                  >
                    <img 
                      src={img}
                      alt={`${product?.name} ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <h1 className="text-2xl font-medium">{product?.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-[#FF8A00] font-medium">{product?.rating}</span>
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product?.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-gray-500">{product?.ratings} Ratings</span>
                <span className="text-gray-500">{product?.soldCount} Sold</span>
              </div>

              <div className="text-3xl font-medium text-[#F1511B]">
                ₱ {product?.price}
              </div>

              {/* Shipping Options */}
              <div className="space-y-4">
                <h3 className="font-medium">Shipping</h3>
                <div className="flex gap-4">
                  {Object.entries(product?.shipping).map(([type, details]) => (
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
              {product?.colors?.length > 0 && (
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
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#4C9BF5] text-white py-3 rounded-md hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#F1511B] text-white py-3 rounded-md hover:bg-orange-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={product.storeInfo.logo} 
                alt={product.storeInfo.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">{product.storeInfo.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Rating: {product.storeInfo.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.storeInfo.rating) 
                              ? 'text-[#FF8A00]' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">{product.storeInfo.followers} Followers</span>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">Member since {product.storeInfo.memberSince}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Chat Response Rate</div>
                <div className="font-medium text-[#4C9BF5]">{product.storeInfo.chatResponse}</div>
              </div>
              <button className="bg-[#4C9BF5] text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Follow Store
              </button>
            </div>
          </div>
        </div>

        {/* Product Description and You Might Also Like Section */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left: Product Description (2 columns) */}
          <div className="col-span-2 bg-white rounded-lg p-6">
            <h2 className="text-xl font-medium mb-6">Product Description</h2>
            <div className="space-y-6">
              <p className="font-medium">{product?.description.main}</p>
              <p>{product?.description.subText}</p>
              
              <div className="space-y-4">
                <h3 className="font-medium">Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product?.description.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Specifications</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product?.description.specifications.map((spec, index) => (
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
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-medium">Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#FF8A00]">
                  {product?.reviews?.length > 0
                    ? (product.reviews.reduce((acc, review) => acc + calculateAverageRating(review), 0) / product.reviews.length).toFixed(1)
                    : '0.0'}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product?.rating || 0) ? 'text-[#FF8A00]' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product?.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>
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
            {product?.reviews?.slice(0, 3).map((review) => (
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductDetail;