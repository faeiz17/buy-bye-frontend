import { Outlet } from "react-router-dom";
import NavBar from "../components/appbar/NavBar";
import Footer from "../components/footer/Footer";
function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
