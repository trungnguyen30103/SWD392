import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderHistory } from '../../mock/OrderHistory';
import './History.scss';

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const History = () => {
  const [orders, setOrders] = useState(orderHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const ordersPerPage = 5;
  
  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      order.id.toString().includes(searchTerm) || 
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });
  
  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  // Retry loading if there was an error
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setOrders(orderHistory);
      setLoading(false);
    }, 1000);
  };
  
  // Get appropriate badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'badge-delivered';
      case 'shipping':
        return 'badge-shipping';
      case 'processing':
        return 'badge-processing';
      case 'pending':
        return 'badge-pending';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  };

  return (
    <div className="history-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Your Order History</h1>
          <p className="page-subtitle">Track, manage, and review your past orders</p>
        </div>
        
        <div className="filter-wrapper">
          <div className="filter-section">
            <div className="form-group">
              <label>Filter by Status</label>
              <div className="custom-select-wrapper">
                <select 
                  className="form-select" 
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>
          </div>
          
          <div className="search-section">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by order ID or product name" 
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <p>{error}</p>
            <button className="retry-button" onClick={handleRetry}>Try Again</button>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <h3>No Orders Found</h3>
            <p>It looks like you haven't placed any orders yet, or no orders match your search.</p>
            <Link to="/shop" className="shop-now-btn">Shop Now</Link>
          </div>
        ) : (
          <div className="orders-container">
            {currentOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-header-top">
                    <div className="order-id-group">
                      <span className="label">Order ID:</span>
                      <span className="order-id">#{order.id}</span>
                    </div>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-header-bottom">
                    <div className="order-date-group">
                      <i className="far fa-calendar-alt"></i>
                      <span>Order Date: {formatDate(order.order_date)}</span>
                    </div>
                    <div className="delivery-date-group">
                      <i className="far fa-clock"></i>
                      <span>
                        {order.status === 'delivered' 
                          ? `Delivered on: ${formatDate(order.delivery_date || order.order_date)}`
                          : `Expected Delivery: ${formatDate(new Date(new Date(order.order_date).getTime() + 7 * 24 * 60 * 60 * 1000))}`
                        }
                      </span>
                    </div>
                    
                    {/* Add tracking button if tracking is available */}
                    {order.trackingId && (
                      <div className="tracking-group">
                        <Link to={`/track/${order.trackingId}`} className="tracking-link">
                          <i className="fas fa-truck"></i> Track Order
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="order-body">
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image-container">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="item-image"
                          />
                        </div>
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <div className="item-meta">
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            {item.variant && (
                              <span className="item-variant">Variant: {item.variant}</span>
                            )}
                          </div>
                          {/* Add item-level tracking if available */}
                          {item.trackingId && (
                            <div className="item-tracking">
                              <Link to={`/track/${item.trackingId}`} className="item-tracking-link">
                                <i className="fas fa-shipping-fast"></i> Track Package
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="item-price">
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-summary">
                    <div className="order-totals">
                      <div className="totals-row">
                        <span className="total-label">Subtotal:</span>
                        <span className="total-value">${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                      </div>
                      <div className="totals-row">
                        <span className="total-label">Shipping:</span>
                        <span className="total-value">${order.shipping_fee ? order.shipping_fee.toFixed(2) : '0.00'}</span>
                      </div>
                      {order.discount_amount > 0 && (
                        <div className="totals-row discount">
                          <span className="total-label">Discount:</span>
                          <span className="total-value">-${order.discount_amount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="totals-row grand-total">
                        <span className="total-label">Grand Total:</span>
                        <span className="total-value">${order.total_amount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="order-actions">
                      <Link to={`/order-success/${order.id}`} className="action-button detail-button">
                        <i className="fas fa-eye"></i> View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button className="action-button review-button">
                          <i className="fas fa-star"></i> Review
                        </button>
                      )}
                      {(order.status === 'shipping' || order.status === 'processing') && order.trackingId && (
                        <Link to={`/track/${order.trackingId}`} className="action-button track-button">
                          <i className="fas fa-truck"></i> Track
                        </Link>
                      )}
                      {(order.status === 'pending') && (
                        <button className="action-button cancel-button">
                          <i className="fas fa-times"></i> Cancel
                        </button>
                      )}
                      {(order.status === 'delivered') && (
                        <button className="action-button repurchase-button">
                          <i className="fas fa-redo"></i> Buy Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && filteredOrders.length > ordersPerPage && (
          <div className="pagination-container">
            <button 
              className="pagination-button" 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              // Show maximum 5 page buttons
              if (
                totalPages <= 5 || 
                index === 0 || 
                index === totalPages - 1 || 
                (index >= currentPage - 2 && index <= currentPage)
              ) {
                return (
                  <button
                    key={index}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                (index === 1 && currentPage > 3) ||
                (index === totalPages - 2 && currentPage < totalPages - 2)
              ) {
                return <span key={index} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
            
            <button 
              className="pagination-button" 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
