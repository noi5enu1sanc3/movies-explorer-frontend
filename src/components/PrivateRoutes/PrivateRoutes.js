import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
