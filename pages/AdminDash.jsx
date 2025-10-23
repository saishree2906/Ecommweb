import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaUserShield } from "react-icons/fa";

const AdminDash = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Manage Products",
      desc: "Add, update, or remove products easily.",
      icon: <FaBoxOpen />,
      action: () => navigate("/Manageproducts"),
    },
    {
      title: "Manage Orders",
      desc: "Track and process all customer orders.",
      icon: <FaClipboardList />,
      action: () => navigate("/manage-orders"),
    },
    {
      title: "Add Admin",
      desc: "Grant access to new administrators.",
      icon: <FaUserShield />,
      action: () => navigate("/add-admin"),
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-overlay"></div>
      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome back, Admin! Select a section to manage below:</p>

        <div className="admin-card-grid">
          {options.map((opt, i) => (
            <div key={i} className="admin-card" onClick={opt.action}>
              <div className="admin-icon">{opt.icon}</div>
              <h3>{opt.title}</h3>
              <p>{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
