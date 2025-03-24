<<<<<<< HEAD
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
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Home/Homepage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import "./App.scss";
import History from "./pages/History/History";
import Track from "./pages/Track/Track";
import Admin from './pages/Admin';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Products from './pages/products/CustomerProduct';
import Profile from './pages/profile/Profile';
import WebsiteInfo from './pages/websiteInfor/WebsiteInfo.jsx';


// Layout component to conditionally render Header and Footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Header />}
      <main className={`main-content ${isAdminRoute ? 'admin-content' : ''}`}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/history" element={<History />} />
          <Route path="/track/:trackingId" element={<Track />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info" element={<WebsiteInfo />} />
          <Route path="/admin/*" element={<Admin />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
>>>>>>> minh
  );
};

<<<<<<< HEAD
=======
const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppLayout />
      </Router>
    </CartProvider>
  );
};

>>>>>>> minh
export default App;
