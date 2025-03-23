import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/navbar";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Login from "./pages/login/login.jsx";
import WebsiteInfo from "./pages/websiteInfor/WebsiteInfo.jsx";
import Footer from "./component/footer.jsx";
import AdminsProductList from "./pages/products/AdminsProducts.jsx";
import CustomerProductList from "./pages/products/CustomerProduct.jsx";
import UserList from "./pages/UserManagement/UserList.jsx";
import AdminOrder from "./pages/order/AdminOrder.jsx";
import CustomerOrder from "./pages/order/CustomerOrder.jsx";
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
            <Route path="/userlist" element={<UserList />} />
            <Route path="/admin/orders" element={<AdminOrder />} />
            <Route path="/orders" element={<CustomerOrder />} />
            <Route
              path="/admin/products"
              element={role === "admin" ? <AdminsProductList /> : <Login />}
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
