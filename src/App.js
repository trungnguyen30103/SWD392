import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./component/Navbar/index.jsx";
import Footer from "./component/Footer/index.jsx";

// Pages
import Register from "./pages/register/index.jsx";
import Home from "./pages/home/index.jsx";
import Cart from "./pages/cart/index.jsx";
import Login from "./pages/login/index.jsx";
import WebsiteInfo from "./pages/Infor/WebsiteInfor/index.jsx";

// Product Pages
import AdminsProductList from "./pages/products/AdminsProduct/index.jsx";
import CustomerProductList from "./pages/products/CustomerProduct/index.jsx";
import ProductDetail from "./pages/products/CustomerProduct/ProductDetail.jsx";

// Order Pages
import AdminOrder from "./pages/order/AdminOrder/index.jsx";
import CustomerOrder from "./pages/order/CustomerOrder/index.jsx";

// User Management
import UserList from "./pages/UserManagement/index.jsx";

// Information Pages
import PoliciesPage from "./pages/Infor/PoliciesPage/index.jsx";
import TermsUse from "./pages/Infor/TermsUse/index.jsx";

import "./App.css";

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const router = [
    // Public Routes
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/info",
      element: <WebsiteInfo />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/login",
      element: <Login setRole={setRole} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/products",
      element: <CustomerProductList />,
    },
    {
      path: "/productdetail/:productId",
      element: <ProductDetail />,
    },

    // User Management
    {
      path: "/userlist",
      element: <UserList />,
    },

    // Order Routes
    {
      path: "/admin/orders",
      element: <AdminOrder />,
    },
    {
      path: "/orders",
      element: <CustomerOrder />,
    },

    // Policies and Terms
    {
      path: "/policy/:type",
      element: <PoliciesPage />,
    },
    {
      path: "/termsofuse",
      element: <TermsUse />,
    },

    // Admin Routes
    {
      path: "/admin/products",
      element: <AdminsProductList />,
    },

    // Protected Route: Checkout
    {
      path: "/checkout",
      element: role ? <div>Checkout Page</div> : <Navigate to="/login" />,
    },
  ];

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            {router.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
