import ProtectedRoutes from "./utils/ProtectedRoutes";
import ROUTES from "./routes/routes";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";

import Homepage from "./pages/homepage/Homepage";
import RationPackNew from "./pages/ration pack/RationPackNew";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
          <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route path={ROUTES.RATION_PACK} element={<RationPackNew />} />
          <Route element={<ProtectedRoutes />}></Route>
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
