import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    return [];
  }
};

const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Handle potential errors
  }
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const filteredState = action.payload.isBuyNow 
        ? state.filter(item => !item.isBuyNow)
        : state;
      
      return [...filteredState, action.payload];

    case 'REMOVE_FROM_CART':
      newState = state.filter(item => 
        !(item.id === action.payload.id && item.category === action.payload.category)
      );
      toast.info('Product removed from cart');
      break;

    case 'UPDATE_QUANTITY':
      newState = state.map(item =>
        item.id === action.payload.id && item.category === action.payload.category
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      break;

    case 'TOGGLE_SELECT':
      newState = state.map(item =>
        item.id === action.payload.id && item.category === action.payload.category
          ? { ...item, selected: !item.selected }
          : item
      );
      break;

    case 'UPDATE_SHIPPING':
      newState = state.map(item =>
        item.id === action.payload.id && item.category === action.payload.category
          ? { ...item, shipping: action.payload.shipping }
          : item
      );
      break;

    default:
      return state;
  }
  
  saveCartState(newState);
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, null, loadCartState);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 