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
function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
          <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route path={ROUTES.RATION_PACK} element={<RationPackNew />} />
          <Route path={ROUTES.SHOP} element={<Products/>} />
          <Route path={ROUTES.SHOP_DETAILS} element={<ShopDetail/>} />
          <Route element={<ProtectedRoutes />}></Route>
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
