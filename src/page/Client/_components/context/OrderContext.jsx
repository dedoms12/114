import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Find the order first
      const orderExists = orders.some(order => order.id === orderId);
      if (!orderExists) {
        throw new Error('Order not found');
      }

      // Update orders state
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.id === orderId) {
            const updatedOrder = {
              ...order,
              status: newStatus,
              trackingHistory: [
                ...order.trackingHistory,
                {
                  status: newStatus,
                  date: new Date().toISOString(),
                  description: getStatusDescription(newStatus)
                }
              ]
            };
            return updatedOrder;
          }
          return order;
        })
      );
      
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
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