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
    // Determine the location
    const existingBranch = branches.find(branch => branch.name === newProduct.location);
    const location = existingBranch ? existingBranch.name : 'All Branches';

    const product = {
      id: category.products.length + 1,
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
      location: location,
      quantity: newProduct.quantity,
      unit: newProduct.unit
    };

    category.products.push(product);
    return true;
  }
  return false;
};

// Remove the branches array and add this function
export const getUniqueLocations = () => {
  const locations = new Set();
  categories.forEach(category => {
    category.products.forEach(product => {
      if (product.location) {
        locations.add(product.location);
      }
    });
  });
  return ['All Locations', ...Array.from(locations)];
}; 