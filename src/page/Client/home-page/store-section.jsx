import React from 'react';

const StoreSection = () => {
  const topStores = [
    {
      id: 1,
      name: "D18 Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore.svg",
      action: "SHOP NOW"
    },
    {
      id: 2,
      name: "iCure Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore-1.svg",
      action: "SHOP NOW"
    },
    {
      id: 3,
      name: "Dr. Care",
      logo: "/images/Client/product-page/Store Section/imagestore-2.svg",
      action: "SHOP NOW"
    },
    {
      id: 4,
      name: "Daan Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore-3.svg",
      action: "SHOP NOW"
    }
  ];

  const latestStores = [
    {
      id: 1,
      name: "Medical Advantage",
      logo: "/images/Client/product-page/Store Section/imagestore-4.svg",
      action: "SHOP NOW"
    },
    {
      id: 2,
      name: "JS Alaan Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore-5.svg",
      action: "SHOP NOW"
    },
    {
      id: 3,
      name: "iCure Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore-6.svg",
      action: "SHOP NOW"
    },
    {
      id: 4,
      name: "Medicare Pharmacy",
      logo: "/images/Client/product-page/Store Section/imagestore-7.svg",
      action: "SHOP NOW"
    }
  ];

  const StoreCard = ({ store }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-full">
      <div className="flex flex-col items-center">
        <img src={store.logo} alt={store.name} className="w-16 h-16 object-contain mb-3" />
        <h3 className="text-sm font-medium text-center mb-2">{store.name}</h3>
        <button className="text-[#F1511B] text-sm font-medium hover:underline">
          {store.action}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-4 gap-6">
        {/* Left Banner */}
        <div className="col-span-1">
          <div className="bg-[#E8F3F3] rounded-2xl h-full">
            <img 
              src="/images/Client/product-page/Store Section/image.svg" 
              alt="Store Banner"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Right Store Sections */}
        <div className="col-span-3">
          {/* Top Stores */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Stores</h2>
              <button className="text-sm text-gray-600 hover:text-pill-blue flex items-center">
                See All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {topStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>

          {/* Latest Stores */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Latest Stores</h2>
              <button className="text-sm text-gray-600 hover:text-pill-blue flex items-center">
                See All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {latestStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
