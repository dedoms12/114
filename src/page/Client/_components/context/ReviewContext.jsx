import React, { createContext, useContext, useReducer } from 'react';
import { products as generalHealthProducts } from '../../product-page/general-health/gen-products';
import { medicalProducts } from '../../product-page/medical-supplies/medsup-products';
import { supplementProducts } from '../../product-page/supplements/supple-products';
import { personalCareProducts } from '../../product-page/personal-care/pc-products';

const ReviewContext = createContext();

const initialState = {
  generalHealth: generalHealthProducts,
  medicalSupplies: medicalProducts,
  supplements: supplementProducts,
  personalCare: personalCareProducts,
};

const reviewReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      const { category, productId, review } = action.payload;
      return {
        ...state,
        [category]: state[category].map(product => 
          product.id === productId 
            ? { ...product, reviews: [review, ...(product.reviews || [])] }
            : product
        )
      };
    default:
      return state;
  }
};

export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  return (
    <ReviewContext.Provider value={{ state, dispatch }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext); 