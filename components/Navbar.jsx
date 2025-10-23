import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ Get logged-in user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleOrdersClick = () => {
    if (currentUser) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  const handleAdminClick = () => {
    navigate("/AdminDash");
  };

  return (
    <nav>
      <div className="logo">Ecommerce</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart <span className="cart-badge">{cart.length}</span>
        </Link>

        {/* 🟢 Conditional rendering based on role */}
        {currentUser?.role === "admin" ? (
          <span
            onClick={handleAdminClick}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "white",
              fontWeight: "500",
              marginLeft: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f6fa15")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Admin Dashboard
          </span>
        ) : (
          <span
            onClick={handleOrdersClick}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "white",
              fontWeight: "500",
              marginLeft: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f6fa15")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Orders
          </span>
        )}

        {/* 🟢 User greeting and logout/login */}
        {currentUser ? (
          <>
            <span style={{ marginLeft: "15px" }}>
              Hello, <strong>{currentUser.name}</strong>
            </span>
            <span
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                color: "red",
                marginLeft: "15px",
                fontWeight: "500",
              }}
            >
              Logout
            </span>
          </>
        ) : (
          <Link to="/login" style={{ marginLeft: "15px" }}>
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
