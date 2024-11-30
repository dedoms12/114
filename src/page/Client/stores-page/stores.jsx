import React, { useState } from 'react';
import NavBar from '../_components/navbar';
import './stores.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

// Example stores data (you should replace this with actual store data from your backend or API)
const stores = [
  {
    id: 1,
    name: "RetroRevive Thrift",
    logo: "/images/Client/product-page/Store Section/logo.jpg",
    rating: 4.9,
    ratingCount: "500k",
    followers: "300K",
    productCount: 300,
    chatResponse: "90%",
    memberSince: 2012,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 2,
    name: "Vintage Finds",
    logo: "/images/Client/product-page/Store Section/logo1.jpg",
    rating: 4.8,
    ratingCount: "850K",
    followers: "156.2K",
    productCount: 212,
    chatResponse: "95%",
    memberSince: 2002,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 3,
    name: "EcoThreads",
    logo: "/images/Client/product-page/Store Section/logo2.jpg",
    rating: 4.5,
    ratingCount: "342K",
    followers: "141.5K",
    productCount: 321,
    chatResponse: "95%",
    memberSince: 2012,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 4,
    name: "Second Chance Apparel",
    logo: "/images/Client/product-page/Store Section/logo3.jpg",
    rating: 4.5,
    ratingCount: "321K",
    followers: "109K",
    productCount: 232,
    chatResponse: "85%",
    memberSince: 2015,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  // Latest Stores
  {
    id: 5,
    name: "Thrift Luxe",
    logo: "/images/Client/product-page/Store Section/logo4.jpg",
    rating: 4.5,
    ratingCount: "125K",
    followers: "45.2K",
    productCount: 189,
    chatResponse: "79%",
    memberSince: 2022,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 6,
    name: "The Thrift Shop",
    logo: "/images/Client/product-page/Store Section/logo5.jpg",
    rating: 4.4,
    ratingCount: "98K",
    followers: "32.8K",
    productCount: 156,
    chatResponse: "82%",
    memberSince: 2022,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 7,
    name: "Pre-Loved Couture",
    logo: "/images/Client/product-page/Store Section/logo6.jpg",
    rating: 4.3,
    ratingCount: "75K",
    followers: "28.4K",
    productCount: 134,
    chatResponse: "76%",
    memberSince: 2023,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  },
  {
    id: 8,
    name: "Thriftstore",
    logo: "/images/Client/product-page/Store Section/logo7.jpg",
    rating: 4.2,
    ratingCount: "45K",
    followers: "21.6K",
    productCount: 98,
    chatResponse: "81%",
    memberSince: 2023,
    action: "SHOP NOW",
    banners: [
      "/images/Client/product-page/banner1.svg",
      "/images/Client/product-page/banner2.svg",
      "/images/Client/product-page/banner3.svg"
    ],
    status: 'active',
    blacklistReason: null,
    blacklistDate: null,
    reportCount: 0
  }
];

const Stores = () => {
  const [searchStore, setSearchStore] = useState(''); // Changed to search for stores
  const [currentPage, setCurrentPage] = useState(1);

  const storesPerPage = 5;
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;

  // Filter stores based on search
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchStore.toLowerCase())
  );

  // Get current stores for pagination
  const currentStores = filteredStores.slice(indexOfFirstStore, indexOfLastStore);
  const totalPages = Math.ceil(filteredStores.length / storesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const Pagination = () => {
    const pageRange = 1; // Show 1 page before and after current page
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
            className={`px-3 py-2 rounded-md ${currentPage === i
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
          <h1 className="text-3xl font-bold text-gray-800">Stores</h1>
          <p className="text-gray-600 mt-2">Find the best stores for second-hand clothing and shoes</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Left Side - Search and Stores */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Search Section */}
            <div className="space-y-6 mb-6 border-2 rounded-lg">
              {/* Store Search */}
              <div className="relative w-full">
                {/* Search Icon */}
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {/* Input Field */}
                <input
                  type="text"
                  value={searchStore}
                  onChange={(e) => setSearchStore(e.target.value)} // Update to searchStore
                  placeholder="Search for stores..."
                  className="w-full pl-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Store List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Available Stores</h2>
                <span className="text-sm text-gray-500">
                  {stores.length} stores found
                </span>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {currentStores.map((store) => (
                  <div
                    key={store.id}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/store/${store.id}`)} // Navigate to the store page
                  >
                    <div className="flex gap-4">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{store.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {store.productCount} Products
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">Followers: {store.followers}</span>
                          <span className="text-sm text-gray-600">
                            Rating: {store.rating} ({store.ratingCount} Ratings)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {store.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
