import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/login.jsx';
import Products from './pages/products/Products.jsx';
import Profile from './pages/profile/Profile.jsx';
import WebsiteInfo from './pages/websiteInfor/WebsiteInfo.jsx';
import Footer from './component/footer.jsx';

import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <Router>
      <div className="app">
<Navbar />
<div className="main-content">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/info" element={<WebsiteInfo />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</div>
<Footer />
</div>
    </Router>
  );
}

  export default App;