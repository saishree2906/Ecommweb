import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = (order) => {
    const newOrder = {
      id: Date.now(), // unique id
      ...order,
      status: "Processing",
      createdAt: new Date().toLocaleString(),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
