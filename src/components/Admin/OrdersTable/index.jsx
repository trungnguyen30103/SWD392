import React from 'react';
import './OrdersTable.scss';
import StatusBadge from '../StatusBadge';

const OrdersTable = ({ orders, onViewDetails, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = (orderId, e) => {
    onUpdateStatus(orderId, e.target.value);
  };

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="order-id">#{order.id}</td>
              <td>{formatDate(order.order_date)}</td>
              <td>
                <div className="customer-info">
                  <span className="customer-name">{order.customerName}</span>
                  <span className="customer-email">{order.customerEmail}</span>
                </div>
              </td>
              <td className="order-amount">${order.total_amount.toFixed(2)}</td>
              <td>{order.items}</td>
              <td>
                <div className="status-cell">
                  <StatusBadge status={order.status} />
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="view-btn"
                    onClick={() => onViewDetails(order)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
