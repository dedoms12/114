import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import NavBar from '../_components/navbar';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmltYWV1cyIsImEiOiJjbTJ6a3U3eGwwZGZwMm9zZzU1OGxnZnk4In0.qlcAZr_gSaw9eqE5XQMVTw';

const Stores = () => {
  const [map, setMap] = useState(null);
  const [searchProduct, setSearchProduct] = useState('');
  const geocoderContainerRef = useRef(null);
  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p1.png'
    },
    {
      id: 2,
      name: 'Product 2',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p2.png'
    },
    {
      id: 3,
      name: 'Product 3',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p3.png'
    },
    {
      id: 4,
      name: 'Product 4',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p4.png'
    },
    {
      id: 5,
      name: 'Product 5',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p5.png'
    },
    {
      id: 6,
      name: 'Product 6',
      variation: 'Red',
      price: '₱ 49',
      quantity: 45,
      address: 'Ampayon, Agusan Del Norte',
      image: '/images/Client/stores-page/p6.png'
    }
  ]);

  // Add filtered products function
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  useEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [125.5353, 8.9478], // Butuan City coordinates
      zoom: 13
    });

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

  return (
    <div>
      <NavBar />
      <div className="p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Map</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side - Product list */}
          <div>
            {/* Product Search Bar */}
            <div className="bg-white rounded-lg shadow-sm mb-4 p-3">
              <div className="flex items-center gap-2">
                <img
                  src="/images/Client/stores-page/pills.svg"
                  alt="Search"
                  className="w-5 h-5"
                />
                <input
                  type="text"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  placeholder="Product"
                  className="flex-grow text-sm focus:outline-none"
                />
                <button className="bg-blue-500 p-2 rounded-lg">
                  <img
                    src="/images/Client/stores-page/magnifying.svg"
                    alt="Search"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Products Table - Now using filteredProducts instead of products */}
            <div className="bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Stores Ordered</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Availability</th>
                    <th className="px-4 py-2 text-left">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-contain mr-2"
                            />
                            <div>
                              <div>{product.name}</div>
                              <div className="text-sm text-gray-600">
                                Variation: {product.variation}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{product.price}</td>
                        <td className="px-4 py-4">{product.quantity}</td>
                        <td className="px-4 py-4">{product.address}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right side - Map */}
          <div>
            <div className="bg-white rounded-lg shadow-sm mb-4 p-3">
              <div className="flex items-center gap-2">
                <img
                  src="/images/Client/stores-page/map_point.svg"
                  alt="Search"
                  className="w-5 h-5"
                />
                <div ref={geocoderContainerRef} className="geocoder-container flex-grow">
                  {/* Add custom styles to match the product search input */}
                  <style>
                    {`
                      .mapboxgl-ctrl-geocoder {
                        width: 100%;
                        max-width: 100%;
                        box-shadow: none;
                        font-size: 0.875rem;
                      }
                      .mapboxgl-ctrl-geocoder--input {
                        padding: 0;
                        height: auto;
                        border: none;
                      }
                      .mapboxgl-ctrl-geocoder--icon {
                        display: none;
                      }
                      .mapboxgl-ctrl-geocoder--button {
                        display: none;
                      }
                    `}
                  </style>
                </div>
                <button className="bg-blue-500 p-2 rounded-lg">
                  <img
                    src="/images/Client/stores-page/magnifying.svg"
                    alt="Search"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div id="map" className="w-full h-[500px] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
