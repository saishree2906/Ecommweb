import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { cart = [], clearCart } = useCart() || {};
  const { placeOrder } = useOrders() || {};
  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const navigate = useNavigate();

  if (!placeOrder) return <p>Checkout is unavailable. Please try again later.</p>;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty.");

    placeOrder({
      customer: form.name,
      address: form.address,
      payment: form.payment,
      items: cart,
      total,
    });

    clearCart();
    navigate("/orders");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <select name="payment" value={form.payment} onChange={handleChange} required>
          <option value="">Select Payment</option>
          <option value="card">Credit Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <p style={{ marginTop: "20px" }}>Total to pay: ${total.toFixed(2)}</p>
    </div>
  );
};

export default Checkout;
