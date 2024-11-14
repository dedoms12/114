import { useNavigate } from 'react-router-dom';

const HeroPage = () => {
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    navigate('/signin');
  }
  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Container for the logo with background */}
      <div className="flex items-center justify-center mb-8">
        {/* Circular background for logo */}
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center shadow-lg absolute">
          {/* Logo image */}
          <img
            src="/images/Client/product-page/client-pill-point-3.png"
            alt="Logo"
            className="w-16 h-16"
          />
        </div>
      </div>
      {/* Button container for Sign Up and Sign In */}
      <div className="flex items-center justify-between w-full max-w-xs">
        {/* Sign Up button on the left */}
        <button onClick={handleSignup} className="text-blue-500 border-b-2 border-blue-500 hover:text-blue-600">
          Sign Up
        </button>
        {/* Sign In button on the right */}
        <button onClick={handleSignin} className="text-gray-500 border-b-2 border-gray-500 hover:text-gray-600">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default HeroPage;
