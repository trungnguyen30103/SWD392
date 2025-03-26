import React, { useState, useEffect, Profiler } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Header from "./component/Header/index.jsx";
import Footer from "./component/Footer/index.jsx";
import ProtectedRoute from "./component/ProtectedRoute/index.jsx";
//AdminPage
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
// Pages
import Register from "./pages/register/index.jsx";
import Home from "./pages/home/index.jsx";
import Cart from "./pages/cart/index.jsx";
import Login from "./pages/login/index.jsx";
import WebsiteInfo from "./pages/Infor/WebsiteInfor/index.jsx";
import Profile from "./pages/profile/index.jsx";
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
      path: "/admin/orders", element: <AdminOrder />, 
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
      path: "/adminpage",
      element: <AdminPage />,
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

    // User Management (Admin only)
    {
      path: "/userlist",
      element: (
        <ProtectedRoute
          element={<UserList />}
          allowedRoles={["ROLE_ADMIN"]}
          userRole={role}
        />
      ),
    },

    // Order Routes (Admin and Customer)
    /*{
      path: "/admin/orders",
      element: (
        <ProtectedRoute
          element={<AdminOrder />}
          allowedRoles={["ROLE_ADMIN"]}
          userRole={role}
        />
      ),
    }*/
    {
      path: "/orders",
      element: (
        <ProtectedRoute
          element={<CustomerOrder />}
          allowedRoles={["ROLE_CUSTOMER"]}
          userRole={role}
        />
      ),
    },

    // Policies and Terms (Public)
    {
      path: "/policy/:type",
      element: <PoliciesPage />,
    },
    {
      path: "/termsofuse",
      element: <TermsUse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    // Admin Routes
    {
      path: "/admin/products",
      element: (
        <ProtectedRoute
          element={<AdminsProductList />}
          allowedRoles={["ROLE_ADMIN"]}
          userRole={role}
        />
      ),
    },

    // Protected Route: Checkout (Customer only)
    {
      path: "/checkout",
      element: role ? (
        <ProtectedRoute
          element={<div>Checkout Page</div>}
          allowedRoles={["ROLE_CUSTOMER"]}
          userRole={role}
        />
      ) : (
        <Navigate to="/login" />
      ),
    },
  ];

  return (
    <Router>
      <div className="app">
        <Header />
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
