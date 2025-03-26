// AdminPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const tabs = [
    { id: "dashboard", name: "Dashboard" },
    { id: "manage-product", name: "Manage Product" },
    { id: "manage-user", name: "Manage User" },
    { id: "manage-voucher", name: "Manage Voucher" },
    { id: "manage-order", name: "Manage Order" },
    { id: "manage-rating", name: "Manage Rating" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // You can add navigation logic here if needed
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "manage-product" && <ManageProduct />}
        {activeTab === "manage-user" && <ManageUser />}
        {activeTab === "manage-voucher" && <ManageVoucher />}
        {activeTab === "manage-order" && <ManageOrder />}
        {activeTab === "manage-rating" && <ManageRating />}
      </div>
    </div>
  );
}

// Placeholder components - you'll replace these with your actual components
const Dashboard = () => <div className="tab-content">Dashboard Content</div>;
const ManageProduct = () => <div className="tab-content">Product Management</div>;
const ManageUser = () => <div className="tab-content">User Management</div>;
const ManageVoucher = () => <div className="tab-content">Voucher Management</div>;
const ManageOrder = () => <div className="tab-content">Order Management</div>;
const ManageRating = () => <div className="tab-content">Rating Management</div>;

export default AdminPage;