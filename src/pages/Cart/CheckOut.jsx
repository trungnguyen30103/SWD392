// pages/checkout/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/carts/current', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCart(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const orderResponse = await axios.post('/api/orders', {
        items: cart,
        total: total - discount,
        discount: discount
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      navigate(`/payment/${orderResponse.data.orderId}`);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="order-summary">
        {cart.map(item => (
          <div key={item.productId} className="order-item">
            <span>{item.productName}</span>
            <span>${item.price} x {item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="totals">
        <div>Subtotal: ${total}</div>
        <div>Discount: -${discount}</div>
        <div>Total: ${total - discount}</div>
      </div>
      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
}

export default Checkout;