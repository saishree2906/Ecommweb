import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const trackOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch order details");
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error("Error tracking order:", err);
    }
  };

  if (loading) return <p>Loading your orders...</p>;
  if (!orders.length) return <p style={{ padding: "20px" }}>No orders found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: statusColor(order.status).color }}>{order.status}</span>
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
            <div>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.product?.name || "Unknown"} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => trackOrder(order._id)}
              style={{
                background: "linear-gradient(90deg, #cf51ba, #1b8383)",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{ marginTop: "30px" }}>
          <h3>Tracking Order #{selectedOrder._id.slice(-6)}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            {["pending", "processing", "shipped", "delivered"].map((step, index) => (
              <div key={index} style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    margin: "0 auto",
                    backgroundColor:
                      selectedOrder.status === step || stepReached(selectedOrder.status, step)
                        ? "#1658a3"
                        : "#ccc",
                  }}
                />
                <p style={{ marginTop: "5px", fontSize: "0.9rem" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helpers ---
const statusColor = (status) => {
  switch (status) {
    case "pending":
      return { color: "orange" };
    case "processing":
      return { color: "#1658a3" };
    case "shipped":
      return { color: "purple" };
    case "delivered":
      return { color: "green" };
    default:
      return { color: "#333" };
  }
};

const stepReached = (current, step) => {
  const stages = ["pending", "processing", "shipped", "delivered"];
  return stages.indexOf(current) >= stages.indexOf(step);
};

export default Orders;
