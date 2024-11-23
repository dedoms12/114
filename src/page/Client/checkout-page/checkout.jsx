import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../_components/navbar';
import { useCart } from '../_components/context/CartContext';
import AddressModal from './AddressModal';
import ShippingModal from './ShippingModal';
import PaymentModal from './PaymentModal';
import { toast } from 'react-toastify';
import { useOrders } from '../_components/context/OrderContext';
import StepIndicator from '../_components/StepIndicator';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const { addOrder } = useOrders();
  
  const selectedItems = location.state?.buyNow 
    ? cartItems.filter(item => item.isBuyNow)
    : cartItems.filter(item => item.selected && !item.isBuyNow);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'Eddie Jr De Pedro',
    phone: '(+63)12345678',
    address: 'Ampayon,Butuan City'
  });

  const [selectedShipping, setSelectedShipping] = useState({
    type: 'Standard Delivery',
    eta: '10 hours',
    price: 30
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleAddressChange = (newAddress) => {
    setDeliveryInfo(newAddress);
    setIsAddressModalOpen(false);
  };

  const handleShippingChange = (newShipping) => {
    setSelectedShipping(newShipping);
    setIsShippingModalOpen(false);
  };

  const handlePaymentChange = (newPayment) => {
    setPaymentMethod(newPayment);
    setIsPaymentModalOpen(false);
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: selectedItems,
      shipping: selectedShipping,
      payment: paymentMethod,
      total: calculateSubtotal() + selectedShipping.price,
      deliveryInfo: deliveryInfo,
      orderCode: 'MS-' + Date.now().toString().slice(-6),
      vendor: 'Branch 1, Ampayon',
      contact: '09109051475'
    };

    addOrder(orderDetails);
    
    toast.success('Order placed successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    navigate('/order-confirmation', { state: { orderDetails } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <StepIndicator currentStep={2} />

        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">📍</span>
              <h2 className="font-medium">Delivery Address</h2>
            </div>
            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="text-[#4C9BF5] hover:text-blue-700"
            >
              Change
            </button>
          </div>
          <div className="ml-6">
            <p className="font-medium">{deliveryInfo.name} {deliveryInfo.phone}</p>
            <p className="text-gray-600">{deliveryInfo.address}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="font-medium">Products Ordered</h2>
          </div>
          <div className="space-y-6">
            {selectedItems.map(item => (
              <div key={`${item.category}-${item.id}`} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Variation: {item.variation}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">₱ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Shipping Option */}
          <div className="mt-6 flex justify-between items-center">
            <div>
              <span className="font-medium">Shipping Option: </span>
              <span>{selectedShipping.type}</span>
              <p className="text-sm text-gray-500 mt-1">Get By {selectedShipping.eta}</p>
            </div>
            <button 
              onClick={() => setIsShippingModalOpen(true)}
              className="text-[#FF5722] hover:text-orange-700"
            >
              CHANGE
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Payment Method</h2>
            <div className="flex items-center">
              <span className="mr-4">{paymentMethod}</span>
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="text-[#FF5722] hover:text-orange-700"
              >
                CHANGE
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Merchandise Subtotal:</span>
              <span>₱ {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Total:</span>
              <span>₱ {selectedShipping.price}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total Payment:</span>
              <span className="text-[#F1511B]">₱ {calculateSubtotal() + selectedShipping.price}</span>
            </div>
          </div>
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-[#4C9BF5] text-white py-3 rounded-md hover:bg-blue-600 transition-colors mt-6"
          >
            Place Order
          </button>
        </div>
      </div>

      <AddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleAddressChange}
        currentAddress={deliveryInfo}
      />
      
      <ShippingModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        onSave={handleShippingChange}
        currentShipping={selectedShipping}
      />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSave={handlePaymentChange}
        currentPayment={paymentMethod}
      />
    </div>
  );
};

export default Checkout;
