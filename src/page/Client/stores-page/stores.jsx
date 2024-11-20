import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import NavBar from '../_components/navbar';
import './stores.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { products } from '../product-page/general-health/gen-products';
import { medicalProducts } from '../product-page/medical-supplies/medsup-products';
import { supplementProducts } from '../product-page/supplements/supple-products';
import { personalCareProducts } from '../product-page/personal-care/pc-products';
import { useNavigate } from 'react-router-dom';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmltYWV1cyIsImEiOiJjbTJ6a3U3eGwwZGZwMm9zZzU1OGxnZnk4In0.qlcAZr_gSaw9eqE5XQMVTw';

const generateRandomAvailability = () => {
  return Math.floor(Math.random() * 100) + 1; // Random number between 1-100
};

// Combine all products and add availability
const allProducts = [...products, ...medicalProducts, ...supplementProducts, ...personalCareProducts].map(product => ({
  ...product,
  availability: generateRandomAvailability()
}));

const Stores = () => {
  const [map, setMap] = useState(null);
  const [searchProduct, setSearchProduct] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const geocoderContainerRef = useRef(null);
  
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Filter products based on search
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );
  
  // Get current products for pagination
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/${product.category}/product/${product.id}`, {
      state: { 
        from: '/stores',
        scrollPosition: window.pageYOffset 
      }
    });
  };

  useEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [125.5353, 8.9478], // Butuan City coordinates
      zoom: 13
    });

   

    // Add style switcher
    const layerList = document.createElement('div');
    layerList.className = 'absolute bottom-4 left-4 bg-white rounded-lg shadow p-2 z-10';

    const inputs = [];
    const layers = [
      { id: 'streets', label: 'Streets', style: 'mapbox://styles/mapbox/streets-v11' },
      { id: 'satellite', label: 'Satellite', style: 'mapbox://styles/mapbox/satellite-v9' },
      { id: 'hybrid', label: 'Hybrid', style: 'mapbox://styles/mapbox/satellite-streets-v11' }
    ];

    layers.forEach((layer) => {
      const input = document.createElement('button');
      input.className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left';
      input.textContent = layer.label;
      input.onclick = () => {
        initializeMap.setStyle(layer.style);
      };
      layerList.appendChild(input);
    });

    document.getElementById('map').appendChild(layerList);

    // Initialize the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: 'Search for places in Butuan...',
      bbox: [125.4353, 8.8478, 125.6353, 9.0478], // Bounding box for Butuan City
      proximity: {
        longitude: 125.5353,
        latitude: 8.9478
      },
      render: function(item) {
        return `<div class="text-sm text-gray-700">${item.place_name}</div>`;
      }
    });

    if (geocoderContainerRef.current) {
      geocoderContainerRef.current.appendChild(geocoder.onAdd(initializeMap));
    }

    initializeMap.addControl(new mapboxgl.NavigationControl());
    initializeMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );

    setMap(initializeMap);

    return () => {
      geocoder.onRemove();
      initializeMap.remove();
    };
  }, []);

  const Pagination = () => {
    const pageRange = 1; // Show 3 pages before and after current page
    const pages = [];
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      >
        ←
      </button>
    );

    // Calculate page numbers to show
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - pageRange && i <= currentPage + pageRange) // Pages within range
      ) {
        if (pages.length > 0 && i > pages[pages.length - 1] + 1) {
          // Add ellipsis if there's a gap
          pages.push(
            <span key={`ellipsis-${i}`} className="px-3 py-2">
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded-md ${
              currentPage === i
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      >
        →
      </button>
    );

    return <div className="mt-4 flex justify-center gap-1">{pages}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Store Locator</h1>
          <p className="text-gray-600 mt-2">Find products and stores near you</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Search and Products */}
          <div className="lg:col-span-1">
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="space-y-6">
                {/* Product Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                      placeholder="Search for products..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Location Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search Location
                  </label>
                  <div className="relative search-wrapper">
                    <div ref={geocoderContainerRef} className="geocoder-container" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Available Products</h2>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} items found
                </span>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {currentProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Category: {product.category}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">₱{product.price}</span>
                          <span className={`text-sm ${
                            product.availability > 50 ? 'text-green-600' : 
                            product.availability > 20 ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {product.availability} in stock
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.storeInfo?.location || product.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination />
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-6">
              <div id="map" className="w-full h-[700px] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
