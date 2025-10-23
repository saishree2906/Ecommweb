// AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />; // Redirect non-admins
  }
  return children;
};

export default AdminRoute;
