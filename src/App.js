  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Navbar from './component/navbar';
  import Home from './pages/Home';
  import Products from './pages/Products';
  import WebsiteInfo from './pages/WebsiteInfo';
  import Profile from './pages/Profile';
  import './App.css';
  import { useEffect, useState } from "react";
  import axios from "axios";
  import Login from "./pages/login";
import Footer from './component/footer';
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