import { products as generalProducts } from '../../Client/product-page/general-health/gen-products';
import { medicalProducts } from '../../Client/product-page/medical-supplies/medsup-products';
import { supplementProducts } from '../../Client/product-page/supplements/supple-products';
import { personalCareProducts } from '../../Client/product-page/personal-care/pc-products';
import fs from 'fs';

export const categories = [
  { id: 1, name: 'General Health', value: 'general-health', products: generalProducts },
  { id: 2, name: 'Medical Supplies', value: 'medical-supplies', products: medicalProducts },
  { id: 3, name: 'Supplements', value: 'supplements', products: supplementProducts },
  { id: 4, name: 'Personal Care', value: 'personal-care', products: personalCareProducts }
];

export const units = ['Item', 'Box', 'Pack', 'Bottle', 'Piece'];

// Function to add new product
export const addProduct = (newProduct) => {
  const category = categories.find(cat => cat.value === newProduct.category.toLowerCase());
  if (category) {
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      rating: 5,
      soldCount: 0,
      image: newProduct.images[0] || '',
      category: newProduct.category,
      description: newProduct.description,
      shipping: newProduct.shipping,
      reviews: [],
      images: newProduct.images,
      location: newProduct.location || 'All Locations',
      quantity: newProduct.quantity,
      unit: newProduct.unit
    };

    category.products.unshift(product);
    return true;
  }
  return false;
};

// Remove the branches array and add this function
export const getUniqueLocations = () => {
  const savedLocations = localStorage.getItem('storeLocations');
  const defaultLocations = ['All Locations', 'Ampayon, Agusan Del Norte', 'Butuan City, Agusan Del Norte'];
  
  if (savedLocations) {
    const parsedLocations = JSON.parse(savedLocations);
    return ['All Locations', ...new Set([...parsedLocations])];
  }
  
  return defaultLocations;
}; 