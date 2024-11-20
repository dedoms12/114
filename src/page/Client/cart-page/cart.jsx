import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../_components/navbar';
import { useCart } from '../_components/context/CartContext';
import CartMightLike from './CartMightLike';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const SHIPPING_RATES = {
    standard: 30,
    express: 50
  };

  const handleShippingChange = (id, category, shippingType) => {
    dispatch({
      type: 'UPDATE_SHIPPING',
      payload: { id, category, shipping: shippingType }
    });
  };

  const calculateShipping = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((total, item) => {
        const shippingRate = SHIPPING_RATES[item.shipping || 'standard'];
        return total + shippingRate;
      }, 0);
  };

  const calculateTotal = () => {
    if (cartItems.length === 0) return 0;
    
    const itemsTotal = cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
    return itemsTotal + calculateShipping();
  };

  const handleQuantityChange = (id, category, change, currentQuantity) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, category, quantity: newQuantity }
      });
    }
  };

  const handleDelete = (id, category) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id, category }
    });
  };

  const handleSelectItem = (id, category) => {
    dispatch({
      type: 'TOGGLE_SELECT',
      payload: { id, category }
    });
  };

  const hasSelectedItems = () => {
    return cartItems.some(item => item.selected);
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items to proceed.');
      return;
    }
    
    if (!hasSelectedItems()) {
      toast.warning('Please select at least one item to proceed with checkout.');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                <div className="col-span-6">
                  <span className="font-medium">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Price</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Action</span>
                </div>
              </div>

              {/* Cart Items */}
              {cartItems.map(item => (
                <div key={`${item.category}-${item.id}`} className="p-4 border-b last:border-0">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-6">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleSelectItem(item.id, item.category)}
                          className="w-4 h-4 text-blue-500 rounded"
                        />
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">Variation: {item.variation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls - Redesigned to match reference */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <div className="flex border rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.category, -1, item.quantity)}
                            className="px-3 py-1 hover:bg-gray-100 border-r"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-r">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.category, 1, item.quantity)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-[#F1511B] font-medium">₱ {item.price}</span>
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-2 text-center">
                      <button
                        onClick={() => handleDelete(item.id, item.category)}
                        className="text-[#4C9BF5] hover:text-blue-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div className="mt-4 ml-28">
                    <select
                      value={item.shipping || 'standard'}
                      onChange={(e) => handleShippingChange(item.id, item.category, e.target.value)}
                      className="text-sm border rounded-md px-2 py-1"
                    >
                      <option value="standard">Standard (₱30)</option>
                      <option value="express">Express (₱50)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Remains mostly the same */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link to="/home">
                    <button className="bg-[#4C9BF5] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₱ {cartItems
                          .filter(item => item.selected)
                          .reduce((total, item) => total + (item.price * item.quantity), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Fee</span>
                      <span className="font-medium">₱ {calculateShipping()}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-[#F1511B]">
                          ₱ {calculateTotal()}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCheckoutClick}
                      className={`w-full py-3 rounded-md transition-colors ${
                        hasSelectedItems()
                          ? 'bg-[#4C9BF5] text-white hover:bg-blue-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* You Might Like Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">You Might Also Like</h2>
          <CartMightLike />
        </div>
      </div>
    </div>
  );
};

export default Cart;
