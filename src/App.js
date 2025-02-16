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
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/info" element={<WebsiteInfo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;