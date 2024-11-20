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
import OrderConfirmation from './page/Client/order-check/check';
import ContactPage from './page/Client/contact-us/contact-page';
import Dashboard from './page/Seller/home-page/dashboard.jsx';
import HeroPage from './page/heropage.jsx';
import Sales from './page/Seller/sales/sales-logistics.jsx';
import ProductManagement from './page/Seller/product-management/product-management.jsx';
import Stores from './page/Client/stores-page/stores.jsx';
import { OrderProvider } from './page/Client/_components/context/OrderContext';
import UserProfile from './page/Client/user-profile/user-profile.jsx';
import ChatbotPage from './page/Client/chatbot-page/chatbot-page.jsx';
import { SearchProvider } from './page/Client/_components/context/SearchContext';
import SearchResults from './page/Client/product-page/search-overview/SearchResults';
import InventoryProductDetail from './page/Seller/product-management/inv-prodetail';
import AdvancedProductEdit from './page/Seller/product-management/AdvancedProductEdit';
import SellerProfile from './page/Seller/seller-profile/seller-profile.jsx';
import AdminDashboard from './page/Admin/Dashboard/AdminDashboard.jsx';
import AdminInventory from './page/Admin/Inventory/index.jsx';
import AdminReports from './page/Admin/Reports/index.jsx';
import MedicineList from './page/Admin/Inventory/Medicine Management/MedicineList.jsx';
import MedicineGroups from './page/Admin/Inventory/Medicine Stores/MedicineGroups.jsx';
import SalesReport from './page/Admin/Reports/SalesReport.jsx';
import RegisteredUsers from './page/Admin/Reports/RegisteredUsers.jsx';
import ContactManagement from './page/Admin/ContactManagement/index.jsx';
import AdminSettings from './page/Admin/Settings/index.jsx';
import StoreDetails from './page/Client/storefront-page/storedetails';
import { Toaster } from 'react-hot-toast';
import CustomerList from './page/Seller/records/customers/CustomerList.jsx';
import OrderList from './page/Seller/records/orders/orderlist.jsx';
import { OrderCustomerProvider } from './page/Seller/context/OrderCustomerContext';
import BlacklistedStores from './page/Admin/Inventory/Blocklist Management/blacklist.jsx';
import BlacklistManagement from './page/Admin/Inventory/Blocklist Management/blacklist.jsx';
import { BlocklistProvider } from './page/Admin/Inventory/context/BlocklistContext';
import StoreVerificationList from './page/Admin/Reports/StoreVerification/StoreVerificationList';



function App() {
  return (
    <>
      <Toaster position="top-center" />
      <SearchProvider>
        <OrderProvider>
          <CartProvider>
            <OrderCustomerProvider>
              <Router>
                <Routes>
                  {/* Common/Auth Routes */}
                  <Route path="/" element={<SignIn />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/sign-up-role" element={<SignUpRole />} />

                  {/* Buyer Routes */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Product Category Routes */}
                  <Route path="/general-health" element={<GeneralHealth />} />
                  <Route path="/general-health/product/:id" element={<ProductDetail />} />
                  <Route path="/medical-supplies" element={<MedicalSupplies />} />
                  <Route path="/medical-supplies/product/:id" element={<ProductDetail />} />
                  <Route path="/personal-care" element={<PersonalCare />} />
                  <Route path="/personal-care/product/:id" element={<ProductDetail />} />
                  <Route path="/supplements" element={<Supplements />} />
                  <Route path="/supplements/product/:id" element={<ProductDetail />} />
                  
                  {/* Shopping Routes */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  
                  {/* Store & Profile Routes */}
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/store/:id" element={<StoreDetails />} />
                  <Route path="/store/:id/product/:productId" element={<ProductDetail />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/chatbot" element={<ChatbotPage />} />
                  <Route path="/search-results" element={<SearchResults />} />

                  {/* Seller Routes */}
                  <Route path="/seller/dashboard" element={<Dashboard />} />
                  <Route path="/seller/product-management" element={<ProductManagement />} />
                  <Route path="/seller/sales" element={<Sales />} />
                  <Route path="/seller/records/customers" element={<CustomerList />} />
                  <Route path="/seller/records/orders" element={<OrderList />} />
                  <Route path="/seller-profile" element={<SellerProfile />} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/inventory/*" element={
                    <BlocklistProvider>
                      <Routes>
                        <Route path="/" element={<AdminInventory />} />
                        <Route path="/medicines" element={<MedicineList />} />
                        <Route path="/stores" element={<MedicineGroups />} />
                        <Route path="/blocklist" element={<BlacklistManagement />} />
                      </Routes>
                    </BlocklistProvider>
                  } />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/reports/sales" element={<SalesReport />} />
                  <Route path="/admin/reports/users" element={<RegisteredUsers />} />
                  <Route path="/admin/reports/store-verification" element={<StoreVerificationList />} />
                  <Route path="/admin/contacts" element={<ContactManagement />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Routes>
              </Router>
            </OrderCustomerProvider>
            <ToastContainer position="top-right" autoClose={2000} />
          </CartProvider>
        </OrderProvider>
      </SearchProvider>
    </>
  );
}

export default App;
