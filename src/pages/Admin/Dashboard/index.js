import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import db from '../../../db/db.json';
import { mockRevenueData, mockTopSellingProducts } from '../../../mock/dashboardData';
import StatCard from '../../../components/Admin/StatCard';
import RevenueChart from '../../../components/Admin/RevenueChart';
import OrderTable from '../../../components/Admin/OrderTable';
import ProductDistribution from '../../../components/Admin/ProductDistribution';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX demonstration
    const timer = setTimeout(() => {
      // Calculate statistics
      const totalRevenue = db.orders.reduce((sum, order) => sum + order.total_amount, 0);
      const totalOrders = db.orders.length;
      const totalCustomers = db.users.filter(user => user.role_id === 1).length;
      const totalProducts = db.products.length + (db.blindBoxes ? db.blindBoxes.length : 0);

      // Get order status distribution
      const statusCounts = db.orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      // Get recent orders
      const sortedOrders = [...db.orders]
        .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
        .slice(0, 5)
        .map(order => {
          const user = db.users.find(u => u.id === order.user_id) || {};
          return {
            ...order,
            customerName: user.fullname || 'Unknown',
          };
        });

      // Get top selling products (using mock data for now)
      const topSellingProducts = mockTopSellingProducts || [];

      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
      });
      setRecentOrders(sortedOrders);
      setOrdersByStatus(statusCounts);
      setTopProducts(topSellingProducts);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  // Calculate percentages for status visualization
  const statusPercentages = Object.entries(ordersByStatus).map(([status, count]) => ({
    status,
    count,
    percentage: (count / stats.totalOrders * 100).toFixed(1)
  }));

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome to your store's performance metrics</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Report
          </button>
          <button className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Add Product
          </button>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toFixed(2)}`} 
          icon="dollar-sign"
          trend="+12.5%" 
          color="green" 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon="shopping-bag"
          trend="+5.2%" 
          color="blue" 
        />
        <StatCard 
          title="Total Customers" 
          value={stats.totalCustomers} 
          icon="users"
          trend="+3.1%" 
          color="purple" 
        />
        <StatCard 
          title="Product Inventory" 
          value={stats.totalProducts} 
          icon="box"
          trend="0%" 
          color="orange" 
        />
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card revenue-chart-card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
            <div className="card-actions">
              <div className="timeframe-selector">
                <button className="active">Weekly</button>
                <button>Monthly</button>
                <button>Yearly</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <RevenueChart data={mockRevenueData} />
          </div>
        </div>
        
        <div className="dashboard-card status-card">
          <div className="card-header">
            <h2>Order Status</h2>
          </div>
          <div className="card-body">
            <div className="order-status-chart">
              <ProductDistribution />
            </div>
            <div className="status-legend">
              {statusPercentages.map(({status, count, percentage}) => (
                <div key={status} className="status-item">
                  <div className={`status-dot status-${status}`}></div>
                  <div className="status-info">
                    <div className="status-name">{status}</div>
                    <div className="status-count">{count} orders <span>({percentage}%)</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card orders-card">
          <div className="card-header">
            <h2>Recent Orders</h2>
            <button className="text-button">View All</button>
          </div>
          <div className="card-body">
            <OrderTable orders={recentOrders} />
          </div>
        </div>
        
        <div className="dashboard-card products-card">
          <div className="card-header">
            <h2>Top Selling Products</h2>
            <button className="text-button">View All</button>
          </div>
          <div className="card-body">
            <div className="top-products-list">
              {topProducts.map((product, idx) => (
                <div key={product.id} className="product-item">
                  <span className="product-rank">{idx + 1}</span>
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-category">{product.category}</div>
                  </div>
                  <div className="product-sales">
                    <div className="sales-quantity">{product.totalQuantity} units</div>
                    <div className="sales-amount">${product.totalRevenue.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
