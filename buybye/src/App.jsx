import ProtectedRoutes from "./utils/ProtectedRoutes";
import ROUTES from "./routes/routes";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";

import Homepage from "./pages/homepage/Homepage";
import RationPackNew from "./pages/ration pack/RationPackNew";
import Products from "./pages/products/Products";
import ShopDetail from "./pages/shopdetail/ShopDetail";
import ProductDetails from "./pages/product details/ProductDetails";
import ContactUs from "./pages/contact/Contact";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
          <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route path={ROUTES.RATION_PACK} element={<RationPackNew />} />
          <Route path={ROUTES.SHOP} element={<Products />} />
          <Route path={ROUTES.SHOP_DETAILS} element={<ShopDetail />} />
          <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
          <Route path={ROUTES.CONTACT} element={<ContactUs/>} />
          <Route path={ROUTES.ABOUT} element={<About/>} />
          <Route path={ROUTES.CART} element={<Cart/>} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout/>} />
          <Route element={<ProtectedRoutes />}></Route>
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
