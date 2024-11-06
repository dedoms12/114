import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderCode: "ORD001",
      status: "To be Delivered",
      items: [
        {
          id: 1,
          name: "Paracetamol",
          quantity: 2,
          price: 150,
          image: "/images/Client/order-sample/imagecare.svg"
        }
      ],
      trackingHistory: [
        { status: "Order Placed", date: "2024-03-15T10:30:00" },
        { status: "Processing", date: "2024-03-15T11:00:00" }
      ]
    },
    {
      id: 2,
      orderCode: "ORD002",
      status: "To be Delivered",
      items: [
        {
          id: 2,
          name: "Vitamin C",
          quantity: 1,
          price: 200,
          image: "/images/Client/order-sample/image1stbatch.svg"
        }
      ],
      trackingHistory: [
        { status: "Order Placed", date: "2024-03-14T15:30:00" },
        { status: "Processing", date: "2024-03-14T16:00:00" }
      ]
    },
    // Add completed and cancelled orders similarly
  ]);
  const [currentUser, setCurrentUser] = useState({
    name: 'Ashley',
    location: 'Ampayon, Agusan Del Norte',
    avatar: 'A'
  });

  const addOrder = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      id: Date.now(),
      status: 'To be Delivered',
      orderDate: new Date().toISOString(),
      trackingHistory: [
        {
          status: 'Order Placed',
          date: new Date().toISOString(),
          description: 'Your order has been placed successfully'
        }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => {
        if (order.id === orderId) {
          const newTrackingEntry = {
            status: newStatus,
            date: new Date().toISOString(),
            description: getStatusDescription(newStatus)
          };
          return {
            ...order,
            status: newStatus,
            trackingHistory: [...order.trackingHistory, newTrackingEntry]
          };
        }
        return order;
      })
    );
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'Completed':
        return 'Order has been delivered successfully';
      case 'Cancelled':
        return 'Order has been cancelled';
      default:
        return 'Order status updated';
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus,
      currentUser,
      setCurrentUser 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);