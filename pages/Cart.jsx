import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0)
    return (
      <div className="orders-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="orders-page">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className="order-card"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <img
            src={item.img}
            alt={item.name}
            width="80"
            height="80"
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>{item.name}</p>
            <p>
              Price: <span className="discount-price">${item.price.toFixed(2)}</span>
            </p>
            <p>Quantity: {item.quantity}</p>
            <button
              className="track-btn"
              onClick={() => removeFromCart(item.id)}
              style={{ background: "#d603f1" }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>Total: ${total.toFixed(2)}</h3>

      <div style={{ marginTop: "15px" }}>
        <button
          className="track-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
        <button
          className="track-btn"
          onClick={clearCart}
          style={{ marginLeft: "10px", background: "#3827b9" }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
