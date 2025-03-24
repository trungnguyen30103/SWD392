import React, { useState, useEffect } from 'react';
import './Orders.scss';
import db from '../../../db/db.json';
import OrdersTable from '../../../components/Admin/OrdersTable';
import OrderDetails from '../../../components/Admin/OrderDetails';
import { mockOrderStatuses } from '../../../mock/orderData';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch orders and enrich them with customer names
    const fetchOrdersData = () => {
      try {
        const enrichedOrders = db.orders.map(order => {
          const user = db.users.find(u => u.id === order.user_id) || {};
          return {
            ...order,
            customerName: user.fullname || 'Unknown Customer',
            customerEmail: user.email || 'No email',
            items: db.orderDetails.filter(detail => detail.order_id === order.id).length || 0
          };
        });
        
        // Sort by most recent orders first
        const sortedOrders = enrichedOrders.sort((a, b) => 
          new Date(b.order_date) - new Date(a.order_date)
        );
        
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  useEffect(() => {
    // Filter orders based on status and search query
    let result = orders;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toString().includes(query) || 
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query)
      );
    }
    
    setFilteredOrders(result);
  }, [orders, statusFilter, searchQuery]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // In a real app, this would make an API call to update the order status
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Update selected order if it's currently being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Create a summary of orders by status for the stats cards
  const orderStatusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <div className="orders-title">
          <h1>Orders Management</h1>
          <p className="orders-subtitle">View and manage all customer orders</p>
        </div>
        <div className="orders-actions">
          <button className="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Orders
          </button>
          <button className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Order
          </button>
        </div>
      </div>

      {/* Order Stats Summary */}
      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Orders</p>
            <h3 className="stat-value">{orders.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Revenue</p>
            <h3 className="stat-value">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Pending Orders</p>
            <h3 className="stat-value">{orderStatusCounts.pending || 0}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Delivered Orders</p>
            <h3 className="stat-value">{orderStatusCounts.delivered || 0}</h3>
          </div>
        </div>
      </div>

      <div className="orders-main-card">
        <div className="card-header">
          <h2>Order List</h2>

          <div className="filters-section">
            <div className="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search by order ID, customer..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="status-filters">
              <button 
                className={statusFilter === 'all' ? 'active' : ''}
                onClick={() => setStatusFilter('all')}
              >
                All Orders
              </button>
              {mockOrderStatuses.map(status => (
                <button 
                  key={status.value}
                  className={statusFilter === status.value ? 'active' : ''}
                  onClick={() => setStatusFilter(status.value)}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading orders...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            <OrdersTable 
              orders={filteredOrders} 
              onViewDetails={handleViewDetails}
              onUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <div className="no-orders">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>No orders found</p>
              <span>Try changing your search criteria</span>
            </div>
          )}
        </div>
      </div>

      {isDetailsOpen && selectedOrder && (
        <OrderDetails 
          order={selectedOrder} 
          onClose={handleCloseDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default Orders;
