import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './page/Auth/signin.jsx';
import SignUp from './page/Auth/signup.jsx';
import SignUpRole from './page/Auth/sign-up-role.jsx';
import Home from './page/Client/home-page/home.jsx';
import GeneralHealth from './page/Client/product-page/general-health/gen-health';
import ProductDetail from './page/Client/_components/product-detail/productdetail';
import MedicalSupplies from './page/Client/product-page/medical-supplies/medsup.jsx';
import PersonalCare from './page/Client/product-page/personal-care/pc.jsx';
import Supplements from './page/Client/product-page/supplements/supple.jsx';
import { CartProvider } from './page/Client/_components/context/CartContext.jsx';
import Cart from './page/Client/cart-page/cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './page/Client/checkout-page/checkout.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sign-up-role" element={<SignUpRole />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/general-health" element={<GeneralHealth />} />
          <Route path="/general-health/product/:id" element={<ProductDetail />} />
          <Route path="/medical-supplies" element={<MedicalSupplies />} />
          <Route path="/medical-supplies/product/:id" element={<ProductDetail />} />
          <Route path="/personal-care" element={<PersonalCare />} />
          <Route path="/personal-care/product/:id" element={<ProductDetail />} />
          <Route path="/supplements" element={<Supplements />} />
          <Route path="/supplements/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} />
    </CartProvider>
  );
}

export default App;
