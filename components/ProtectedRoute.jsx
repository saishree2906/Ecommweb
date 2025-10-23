import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const storedRole = localStorage.getItem("role");

  if (!storedRole) return <Navigate to="/login" replace />;
  if (allowedRole && storedRole !== allowedRole)
    return <Navigate to="/products" replace />;

  return children;
};

export default ProtectedRoute;
