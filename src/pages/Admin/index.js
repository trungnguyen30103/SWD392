import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/Admin/Layout/AdminLayout';
import Dashboard from './Dashboard';
// Import these components when they're created
import Orders from './Orders';
import Products from './Products';
import Accounts from './Accounts';
import Reviews from './Reviews';

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add placeholder routes for future pages */}
        <Route path="orders" element={<Orders/>} />
        <Route path="products" element={<Products />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Placeholder component for routes that are not yet implemented
const ComingSoon = ({ title }) => {
  return (
    <div className="content-card text-center" style={{ padding: '60px 20px' }}>
      <h1>{title}</h1>
      <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
        This feature is coming soon. We're working hard to bring you the best experience.
      </p>
    </div>
  );
};

// 404 page for admin section
const NotFound = () => {
  return (
    <div className="content-card text-center" style={{ padding: '60px 20px' }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default Admin;
