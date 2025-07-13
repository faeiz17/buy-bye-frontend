import ProtectedRoutes from "./utils/ProtectedRoutes";
import ROUTES from "./routes/routes";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

import Homepage from "./pages/homepage/Homepage";
import RationPackNew from "./pages/ration pack/RationPackNew";
import RationPackDetails from "./pages/ration-packs/RationPackDetails";
import Shop from "./pages/products/Shop";
import ShopDetail from "./pages/shopdetail/ShopDetail";
import ProductDetails from "./pages/product details/ProductDetails";
import ContactUs from "./pages/contact/Contact";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import Search from "./pages/search/Search";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
function App() {
  return (
    <Router>
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <OrderProvider>
              <Routes>
                {/* Public routes with layout */}
                <Route element={<Layout />}>
                  <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
                  <Route path={ROUTES.RATION_PACK} element={<RationPackNew />} />
                  <Route path={ROUTES.RATION_PACK_DETAILS} element={<RationPackDetails />} />
                  <Route path={ROUTES.SHOP} element={<Shop />} />
                  <Route path={ROUTES.SHOP_DETAILS} element={<ShopDetail />} />
                  <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
                  <Route path={ROUTES.CONTACT} element={<ContactUs/>} />
                  <Route path={ROUTES.ABOUT} element={<About/>} />
                  <Route path={ROUTES.SEARCH} element={<Search/>} />
                </Route>

                {/* Auth-required routes with layout */}
                <Route element={<Layout />}>
                  <Route path={ROUTES.CART} element={<Cart/>} />
                  <Route path={ROUTES.CHECKOUT} element={<Checkout/>} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path={ROUTES.ORDERS} element={<Orders/>} />
                    <Route path={ROUTES.ORDER_DETAILS} element={<OrderDetails/>} />
                  </Route>
                </Route>

                {/* Auth routes without layout */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
              </Routes>
            </OrderProvider>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
