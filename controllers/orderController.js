import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  // Admin: see all orders, User: only own orders
  if (req.isAdmin) {
    const orders = await Order.find().populate("user").populate("items.product");
    return res.json(orders);
  }
  const orders = await Order.find({ user: req.userId }).populate("items.product");
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { items } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ msg: "No items" });

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const order = new Order({
    user: req.userId,
    items,
    total
  });

  const saved = await order.save();
  res.status(201).json(saved);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating order:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

