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
      image: "/images/Client/product-page/banner1.svg",
      bgColor: "bg-[#E8F3F3]"
    },
    {
      id: 2,
      image: "/images/Client/product-page/Banner 1.2.svg",
      bgColor: "bg-[#E8F3F3]"
      
    },
    {
        id: 3,
        image: "/images/Client/product-page/Banner 1.3.svg",
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
    switch(category) {
      case 'general-health':
        navigate('/general-health');
        break;
      case 'medical-supplies':
        navigate('/medical-supplies');
        break;
      case 'supplements':
        navigate('/supplements');
        break;
      case 'personal-care':
        navigate('/personal-care');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Banner Section */}
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
                src="/images/Client/product-page/banner2.svg"
                alt="Healthcare Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="/images/Client/product-page/banner3.svg"
                alt="Products Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ProductSection handleCategoryClick={handleCategoryClick} />
      <CareChoiceSection />
      <StoreSection />
      <TopProductsSection />
    </div>
  );
};

export default Home;
