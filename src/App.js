import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar/index.jsx";
import Register from "./pages/register/index.jsx";
import Home from "./pages/home/index.jsx";
import Cart from "./pages/cart/index.jsx";
import Login from "./pages/login/index.jsx";
import WebsiteInfo from "./pages/Infor/WebsiteInfor/index.jsx";
import Footer from "./component/Footer/index.jsx";
import AdminsProductList from "./pages/products/AdminsProduct/index.jsx";

import CustomerProductList from "./pages/products/CustomerProduct/index.jsx";
import ProductDetail from "./pages/products/CustomerProduct/ProductDetail.jsx";
import UserList from "./pages/UserManagement/index.jsx";
import AdminOrder from "./pages/order/AdminOrder/index.jsx";
import CustomerOrder from "./pages/order/CustomerOrder/index.jsx";
import "./App.css";
function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<WebsiteInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route pa th="/login" element={<Login setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<CustomerProductList />} />
            <Route path="/productdetail/:productId" element={<ProductDetail />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/admin/orders" element={<AdminOrder />} />
            <Route path="/orders" element={<CustomerOrder />} />

            
            <Route
              path="/admin/products"
              element={<AdminsProductList />}

            />

            <Route
              path="/checkout"
              element={
                role ? <div>Checkout Page</div> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
