import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './../_components/navbar';
import ProductSection from './product-section';
import StoreSection from './store-section';
import TopProductsSection from './top-prod-section';
import CareChoiceSection from './care-choice-section';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      id: 1,
      image: "/images/Client/product-page/banner1.png",
      bgColor: "bg-[#E8F3F3]"
    },
    {
      id: 2,
      image: "/images/Client/product-page/banner3.png",
      bgColor: "bg-[#E8F3F3]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'menswear':
        navigate('/menswear');
        break;
      case 'womenswear':
        navigate('/womenswear');
        break;
      case 'kidswear':
        navigate('/kidswear');
        break;
      case 'shoes':
        navigate('/shoes');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <StoreSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Banner Container with Arrows */}
          <div className="col-span-2 flex items-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="mr-4 bg-white rounded-full p-2 shadow-lg z-10"
            >
              <img
                src="/images/Client/product-page/client-arrow-back-ios-new.svg"
                alt="Previous"
                className="h-6 w-6 transform rotate-[90deg]"
              />
            </button>

            {/* Banner */}
            <div className="relative overflow-hidden rounded-2xl flex-grow">
              <img
                src={bannerSlides[currentSlide].image}
                alt="Banner"
                className="w-full h-full object-cover rounded-2xl transition-opacity duration-500"
              />
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="ml-4 bg-white rounded-full p-2 shadow-lg z-10"
            >
              <img
                src="/images/Client/product-page/client-arrow-back-ios-new.svg"
                alt="Next"
                className="h-6 w-6 transform rotate-[270deg]"
              />
            </button>
          </div>

          {/* Right Side Banners */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/Client/product-page/banner2.png"
                alt="Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/Client/product-page/banner4.png"
                alt="Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <CareChoiceSection />*/}
      <ProductSection handleCategoryClick={handleCategoryClick} />
      <div className='pt-10'></div>
      <TopProductsSection />
      <footer className="bg-white dark:bg-white pt-10">
        <div className="bg-gray-900">
          <div className="max-w-2xl mx-auto text-white py-10">
            <div className="text-center">
              <h3 className="text-3xl mb-3">Download our app</h3>
              <span>Online Market for
                Sustainable Thrifted Clothing and Shoes</span>
              <div className="flex justify-center my-10">
                <div className="flex items-center border border-gray-700 rounded-lg px-4 py-2 w-52 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                    className="w-7 md:w-8"
                    alt="Google Play Icon"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on</p>
                    <p className="text-sm md:text-base">Google Play Store</p>
                  </div>
                </div>
                <div className="flex items-center border border-gray-700 rounded-lg px-4 py-2 w-44 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                    className="w-7 md:w-8"
                    alt="Apple Store Icon"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on</p>
                    <p className="text-sm md:text-base">Apple Store</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-15 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p className="order-2 md:order-1 mt-8 md:mt-0">&copy; ThriftEase.</p>
              <div className="order-1 md:order-2">
                <span className="px-2">About us</span>
                <span className="px-2 border-l border-gray-600">Contact us</span>
                <span className="px-2 border-l border-gray-600">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
