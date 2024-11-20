import React, { createContext, useContext, useState } from 'react';
import { orderData } from '../records/orders/order-data';
import { customerData } from '../records/customers/customer-data';

const OrderCustomerContext = createContext();

export const OrderCustomerProvider = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterState, setFilterState] = useState({
    customer: null,
    dateRange: null,
    status: 'all',
    branch: 'All Branches'
  });

  const getCustomerOrders = (customerId) => {
    return orderData.filter(order => order.customerId === customerId);
  };

  const getOrderCustomer = (customerId) => {
    return customerData.find(customer => customer.id === customerId);
  };

  const value = {
    selectedCustomer,
    setSelectedCustomer,
    selectedOrder,
    setSelectedOrder,
    filterState,
    setFilterState,
    getCustomerOrders,
    getOrderCustomer
  };

  return (
    <OrderCustomerContext.Provider value={value}>
      {children}
    </OrderCustomerContext.Provider>
  );
};

export const useOrderCustomer = () => {
  const context = useContext(OrderCustomerContext);
  if (!context) {
    throw new Error('useOrderCustomer must be used within an OrderCustomerProvider');
  }
  return context;
}; 