import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // ✅ Fetch orders (admin only)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update in UI
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container mt-4 manage-orders-page">
      <h2 className="text-center mb-4" style={{ color: "#1658a3" }}>
        Manage Orders
      </h2>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded p-3 bg-white">
          <Table hover bordered className="align-middle">
            <thead style={{ backgroundColor: "#1658a3", color: "white" }}>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6).toUpperCase()}</td>
                  <td>
                    <strong>{order.user?.name || "Unknown"}</strong>
                    <br />
                    <small className="text-muted">{order.user?.email}</small>
                  </td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.product
                          ? `${item.product.name} × ${item.quantity}`
                          : `Deleted Product × ${item.quantity}`}
                      </div>
                    ))}
                  </td>
                  <td>
                    <strong>₹{order.total.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${
                        order.status === "pending"
                          ? "warning"
                          : order.status === "processing"
                          ? "info"
                          : order.status === "shipped"
                          ? "primary"
                          : "success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
