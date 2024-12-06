import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user);

  return user.data.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
