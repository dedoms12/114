import { medicalProducts } from '../../page/Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../page/Client/product-page/general-health/gen-products';
import { supplementProducts } from '../../page/Client/product-page/supplements/supple-products';
import { personalCareProducts } from '../../page/Client/product-page/personal-care/pc-products';

const STORAGE_KEY = 'pharmacyProducts';

// Initialize products in localStorage if not exists
const initializeProducts = () => {
  try {
    const existingProducts = localStorage.getItem(STORAGE_KEY);
    if (!existingProducts) {
      const initialProducts = {
        medicalSuppliesProducts: [],
        generalHealthProducts: []
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(existingProducts);
  } catch (error) {
    console.error('Error initializing products:', error);
    return {
      medicalSuppliesProducts: [],
      generalHealthProducts: []
    };
  }
};

// Get all products
export const getAllProducts = () => {
  try {
    const products = localStorage.getItem(STORAGE_KEY);
    if (!products) {
      return initializeProducts();
    }
    return JSON.parse(products);
  } catch (error) {
    console.error('Error getting all products:', error);
    return initializeProducts();
  }
};

// Add this constant at the top
const VALID_LOCATIONS = ['Ampayon, Agusan Del Norte', 'Butuan City, Agusan Del Norte'];

// Add this function to normalize locations
const normalizeLocation = (location) => {
  if (!location) return VALID_LOCATIONS[0];
  
  // Remove any duplicate "Agusan Del Norte" occurrences
  let normalizedLocation = location.replace(/Agusan [Dd]el Norte.*$/, '').trim();
  
  // Convert "del" to "Del"
  normalizedLocation = normalizedLocation.replace(/\bdel\b/g, 'Del');
  
  // Add "Agusan Del Norte" if not present
  if (!normalizedLocation.includes('Agusan Del Norte')) {
    normalizedLocation = `${normalizedLocation}, Agusan Del Norte`;
  }
  
  // Validate against VALID_LOCATIONS
  return VALID_LOCATIONS.find(validLoc => 
    normalizedLocation.includes(validLoc.split(',')[0])) || VALID_LOCATIONS[0];
};

// Get products by category
export const getProductsByCategory = (category) => {
  try {
    const allProducts = getAllProducts();
    const categoryKey = `${category}Products`.replace('-', '');
    return allProducts[categoryKey] || [];
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

// Update product
export const updateProduct = (category, productId, updatedProduct) => {
  try {
    const allProducts = getAllProducts();
    const categoryKey = `${category}Products`.replace('-', '');
    
    const productIndex = allProducts[categoryKey].findIndex(p => p.id === productId);
    if (productIndex === -1) return false;

    const { clientProduct, sellerProduct } = separateProductData(updatedProduct);
    
    // Update in both storages
    allProducts[categoryKey][productIndex] = clientProduct;
    
    // Update the actual JS file
    updateProductFile(category, allProducts[categoryKey]);
    
    // Update seller data
    const sellerStorage = localStorage.getItem('sellerProducts') || '{}';
    const sellerProducts = JSON.parse(sellerStorage);
    if (sellerProducts[categoryKey]) {
      const sellerIndex = sellerProducts[categoryKey].findIndex(p => p.id === productId);
      if (sellerIndex !== -1) {
        sellerProducts[categoryKey][sellerIndex] = sellerProduct;
        localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

// Add new product
export const addProduct = (category, newProduct) => {
  try {
    const allProducts = getAllProducts();
    const categoryKey = `${category}Products`.replace('-', '');
    
    // Create a properly formatted product
    const formattedProduct = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      rating: 5,
      soldCount: 0,
      image: newProduct.images[0] || '',
      category: category,
      description: {
        main: newProduct.description.main,
        subText: newProduct.description.subText,
        features: newProduct.description.features,
        specifications: newProduct.description.specifications
      },
      shipping: {
        standard: { price: "₱30", days: "10 Hours" },
        express: { price: "₱50", days: "5 Hours" }
      },
      location: normalizeLocation(newProduct.location),
      reviews: [],
      images: newProduct.images,
      expiryDate: newProduct.expiryDate
    };

    // Add to localStorage
    if (!allProducts[categoryKey]) {
      allProducts[categoryKey] = [];
    }
    allProducts[categoryKey].push(formattedProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));

    // Store seller-specific data
    const sellerStorage = localStorage.getItem('sellerProducts') || '{}';
    const sellerProducts = JSON.parse(sellerStorage);
    if (!sellerProducts[categoryKey]) {
      sellerProducts[categoryKey] = [];
    }
    sellerProducts[categoryKey].push({
      ...formattedProduct,
      inventory: {
        stockAlert: 10,
        reorderPoint: 20,
        maxStock: 100,
        minStock: 5
      }
    });
    localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));

    // Notify other tabs
    window.dispatchEvent(new Event('storage'));
    
    return true;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (category, productId) => {
  try {
    const allProducts = getAllProducts();
    const categoryKey = `${category}Products`.replace('-', '');
    
    allProducts[categoryKey] = allProducts[categoryKey].filter(
      p => p.id !== productId
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
    
    // Notify other tabs
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

export const getProductById = (productId, includeSellerData = false) => {
  try {
    const numericId = parseInt(productId);
    
    // Get current category from URL
    const path = window.location.pathname;
    let products;
    
    // Determine which product array to search based on URL path
    if (path.includes('medical-supplies')) {
      products = medicalProducts;
    } else if (path.includes('general-health')) {
      products = generalProducts;
    } else if (path.includes('supplements')) {
      products = supplementProducts;
    } else if (path.includes('personal-care')) {
      products = personalCareProducts;
    } else {
      // For product management view, search all products
      products = [
        ...medicalProducts,
        ...generalProducts,
        ...supplementProducts,
        ...personalCareProducts
      ];
    }

    // Find the product in the determined array
    const product = products.find(p => p.id === numericId);
    
    if (!product) {
      console.error(`Product not found with ID: ${productId}`);
      return null;
    }

    // If seller data is requested (for product management)
    if (includeSellerData) {
      try {
        const sellerStorage = localStorage.getItem('sellerProducts');
        if (sellerStorage) {
          const sellerProducts = JSON.parse(sellerStorage);
          const sellerProduct = sellerProducts[product.id];
          if (sellerProduct) {
            return {
              ...product,
              ...sellerProduct,
              images: sellerProduct.images || [product.image],
            };
          }
        }
      } catch (error) {
        console.error('Error loading seller data:', error);
      }
    }

    return product;

  } catch (error) {
    console.error('Error getting product by ID:', error);
    return null;
  }
};

const separateProductData = (product) => {
  // Ensure location is set
  const location = product.location || 'Ampayon, Agusan Del Norte';
  
  // Client-facing data structure
  const clientProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    rating: product.rating || 5,
    soldCount: product.soldCount || 0,
    image: product.images[0] || '',
    category: product.category,
    description: {
      main: product.description.main,
      subText: product.description.subText,
      features: product.description.features,
      specifications: product.description.specifications
    },
    shipping: product.shipping,
    reviews: product.reviews || [],
    images: product.images,
    location: location,
    expiryDate: product.expiryDate
  };

  // Seller-specific data structure
  const sellerProduct = {
    ...product,
    location: location,
    lastUpdated: new Date().toISOString(),
    inventory: product.inventory || {
      stockAlert: 10,
      reorderPoint: 20,
      maxStock: 100,
      minStock: 5
    }
  };

  return { clientProduct, sellerProduct };
};

// Add this function to handle product saving
export const saveProduct = async (product) => {
  try {
    const allProducts = getAllProducts();
    const categoryKey = `${product.category.replace(/-/g, '')}Products`;
    
    // Normalize the location
    const normalizedLocation = product.location || 'Ampayon, Agusan Del Norte';
    const updatedProduct = {
      ...product,
      location: normalizedLocation
    };
    
    if (!allProducts[categoryKey]) {
      allProducts[categoryKey] = [];
    }

    if (product.id) {
      // Update existing product
      const index = allProducts[categoryKey].findIndex(p => p.id === product.id);
      if (index !== -1) {
        allProducts[categoryKey][index] = updatedProduct;
      } else {
        allProducts[categoryKey].push(updatedProduct);
      }
    } else {
      // Add new product
      updatedProduct.id = Date.now();
      allProducts[categoryKey].push(updatedProduct);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
    
    // Update seller data
    const sellerStorage = localStorage.getItem('sellerProducts') || '{}';
    const sellerProducts = JSON.parse(sellerStorage);
    if (!sellerProducts[categoryKey]) {
      sellerProducts[categoryKey] = [];
    }
    
    const sellerIndex = sellerProducts[categoryKey].findIndex(p => p.id === product.id);
    if (sellerIndex !== -1) {
      sellerProducts[categoryKey][sellerIndex] = updatedProduct;
    } else {
      sellerProducts[categoryKey].push(updatedProduct);
    }
    
    localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));
    return updatedProduct;
  } catch (error) {
    console.error('Error saving product:', error);
    throw new Error('Failed to save product data: ' + error.message);
  }
}; 