import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import YouMightLike from '../might-like';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');

  // This function would fetch product data based on ID
  // For now using dummy data structure
  const product = {
    id: id,
    name: "Indoplas Disposable Face Mask 3-Ply With Earloop 1 Box (50 Pcs)",
    price: 59,
    rating: 5,
    soldCount: 1205,
    ratings: 708,
    shipping: {
      standard: { price: "FREE", days: "3-5 Days" },
      express: { price: "₱68", days: "1-2 Days" }
    },
    colors: ['blue', 'white'],
    description: {
      main: "99% BFE Medical Grade 3 Ply With Earloop",
      subText: "Sold Per Box Of 50",
      features: [
        "Nose Bar Adaptability",
        "Cushioning Nose Foam Adjustable Nose Clip Helps Provide A Custom Fit",
        "And Secure Seal Earloop",
        "Easy To Wear Fiberglass Free Hypoallergenic Excellent Breath-Ability High Filtration"
      ],
      specifications: [
        "Masks Designed For Maximum Protection And Comfort",
        "Safe For Daily Personal Use In Outside And Hospital Environments",
        "If Used Properly, Will Protect Against Bacteria And Viruses",
        "Certified By 3rd Party Laboratory Test Results",
        "Premium 3 Ply Mask (PPSB, Meltblown, PPSB)",
        "Bacteria Filtration Efficiency - Up To 99%",
        "Virus Filtration Efficiency - Up To 99%",
        "Latex Particle Filtration Efficiency - Up To 99%",
        "< 5ub-Micron Particulate (NaCl) Filtration"
      ]
    },
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg"
    ],
    location: "Quezon City, Metro Manila"
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Product Images Section */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full object-contain h-96"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <h1 className="text-2xl font-medium text-gray-800">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
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
                  <span className="ml-2 text-gray-500">{product.ratings} Ratings</span>
                </div>
                <span className="text-gray-500">{product.soldCount} Sold</span>
              </div>

              <div className="text-3xl font-medium text-[#F1511B]">
                ₱ {product.price}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-600 mb-2">Shipping</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border rounded-md text-sm">
                      Standard Delivery {product.shipping.standard.price}
                      <div className="text-xs text-gray-500">{product.shipping.standard.days}</div>
                    </button>
                    <button className="px-4 py-2 border rounded-md text-sm">
                      Express Delivery {product.shipping.express.price}
                      <div className="text-xs text-gray-500">{product.shipping.express.days}</div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-600 mb-2">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-600 mb-2">Quantity</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-1 border rounded-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border rounded-md py-1"
                    />
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-1 border rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#E6F0FF] text-[#4C9BF5] rounded-md">
                  Add To Cart
                </button>
                <button className="flex-1 px-6 py-3 bg-[#4C9BF5] text-white rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Product Description</h2>
            <div className="space-y-4">
              <p className="font-medium">{product.description.main}</p>
              <p>{product.description.subText}</p>
              <ul className="list-disc pl-5 space-y-2">
                {product.description.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <h3 className="font-medium mt-6">Specification</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.description.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <YouMightLike />
    </div>
  );
};

export default ProductDetail;