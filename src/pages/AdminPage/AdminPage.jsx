import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import ManageVoucher from "./ManageVoucher";
import AdminProduct from "./AdminProduct";
import ManageUser from "./ManageUser";
import ManageReview from "./ManageRating";
import Dashboard from "./Dashboard/index.jsx"; 
function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();

    const tabs = [
        { id: "manage-dashboard", name: "Dashboard" },
        { id: "manage-product", name: "Manage Product" },
        { id: "manage-user", name: "Manage User" },
        { id: "manage-voucher", name: "Manage Voucher" },
        { id: "manage-order", name: "Manage Order" },
        { id: "manage-rating", name: "Manage Reviews" },
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const ManageOrder = () => (
        <div className="tab-content">
            <h2>Order Management</h2>
            <p>Coming soon</p>
        </div>
    );

    useEffect(() => {
        console.log("Active Tab:", activeTab);
    }, [activeTab]);

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
                {activeTab === "manage-dashboard" && <Dashboard />} {/* Sử dụng component Dashboard đã import */}
                {activeTab === "manage-product" && <AdminProduct />}
                {activeTab === "manage-user" && <ManageUser />}
                {activeTab === "manage-voucher" && <ManageVoucher />}
                {activeTab === "manage-order" && <ManageOrder />}
                {activeTab === "manage-rating" && <ManageReview />}
            </div>
        </div>
    );
}

export default AdminPage;
