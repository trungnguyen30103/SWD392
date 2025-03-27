// pages/order/CustomerOrder/index.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order.orderId} className="order-card">
          <div>Order #{order.orderId}</div>
          <div>Date: {new Date(order.orderDate).toLocaleDateString()}</div>
          <div>Total: ${order.totalAmount}</div>
          <div>Status: {order.status}</div>
        </div>
      ))}
    </div>
  );
}

export default CustomerOrder;