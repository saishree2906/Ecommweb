import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import AdminDash from "./pages/AdminDash";
import ManageOrders from "./pages/ManageOrders";
import AddAdmin from "./pages/AddAdmin";
import ManageProducts from "./pages/ManageProducts";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />

            {/* User-only Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRole="user">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRole="user">
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRole="user">
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Admin-only Routes */}
            <Route
              path="/admindash"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageproducts"
              element={
                <ProtectedRoute allowedRole="admin">
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-orders"
              element={
                <ProtectedRoute allowedRole="admin">
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AddAdmin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;
