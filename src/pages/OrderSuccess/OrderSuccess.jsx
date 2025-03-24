import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// Fix import path to be consistent
import { useCart } from '../../context/CartContext';
import { getMockOrder } from '../../mock/OrderSuccessMock';
import './OrderSuccess.scss';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Import clearCart to ensure cart is cleared
  const [orderData, setOrderData] = useState(null);

  // Use real order data or mock data
  useEffect(() => {
    const locationOrderData = location.state?.orderData;
    
    if (!locationOrderData) {
      // Use mock data instead of redirecting when no real data is available
      console.log('No order data found, using mock data for preview');
      setOrderData(getMockOrder());
    } else {
      // Use real order data from location state
      setOrderData(locationOrderData);
      
      // Ensure cart is cleared on successful order
      clearCart();
      
      // Optional: Log successful order for analytics
      console.log('Order completed successfully:', locationOrderData.orderId);
    }
  }, [location.state, clearCart]);

  // If no order data yet, show loading
  if (!orderData) {
    return <div className="loading">Loading order details...</div>;
  }
  
  const orderNumber = orderData.orderId || `ORD-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-result">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-number">Your order number is: <span>{orderNumber}</span></p>
          <div className="result-actions">
            <button 
              className="button primary-button"
              onClick={() => navigate('/')}
            >
              <span className="button-icon">🏠</span>
              Back to Home
            </button>
            <button 
              className="button secondary-button"
              onClick={() => navigate('/shop')}
            >
              <span className="button-icon">🛍️</span>
              Continue Shopping
            </button>
          </div>
        </div>
        
        <div className="order-details-card">
          <h2>Order Details</h2>
          
          <div className="info-section">
            <h3>Shipping Information</h3>
            <div className="info-content">
              <p>
                <span className="label">Name:</span> 
                <span className="value">{orderData.name}</span>
              </p>
              <p>
                <span className="label">Phone:</span> 
                <span className="value">{orderData.phone}</span>
              </p>
              <p>
                <span className="label">Address:</span> 
                <span className="value">
                  {orderData.address}, {orderData.district}, 
                  {typeof orderData.city === 'object' ? orderData.city.name : orderData.city}
                </span>
              </p>
              {orderData.notes && (
                <p>
                  <span className="label">Notes:</span> 
                  <span className="value">{orderData.notes}</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="info-section">
            <h3>Payment Information</h3>
            <div className="info-content">
              <p>
                <span className="label">Method:</span> 
                <span className="value">{orderData.paymentMethod}</span>
              </p>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="items-section">
            <h3>Items Ordered</h3>
            <div className="order-items">
              {orderData.items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      {/* Add tracking info if shipping status is available */}
                      {item.trackingId && (
                        <div className="tracking-link-container">
                          <Link to={`/track/${item.trackingId}`} className="tracking-link">
                            <i className="fas fa-truck"></i> Track Package
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="order-summary">
            <div className="summary-rows">
              <div className="summary-row">
                <span className="label">Subtotal:</span>
                <span className="value">${orderData.summary?.subtotal.toFixed(2) || orderData.totalPrice.toFixed(2)}</span>
              </div>
              
              {orderData.discount && (
                <div className="summary-row discount">
                  <span className="label">Discount ({orderData.discount}):</span>
                  <span className="value">-${orderData.summary?.discount.toFixed(2) || '0.00'}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span className="label">Shipping:</span>
                <span className="value">
                  {!orderData.summary?.shipping || orderData.summary?.shipping === 0 ? 'Free' : `$${orderData.summary.shipping.toFixed(2)}`}
                </span>
              </div>
            </div>
            
            <div className="order-total">
              <span className="label">Total:</span>
              <span className="value">
                ${orderData.summary?.total.toFixed(2) || orderData.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="thank-you-message">
            <p>Thank you for your purchase! We'll process your order as soon as possible.</p>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
          
          {/* Add a shipping status section with tracking link */}
          {orderData.trackingId && (
            <div className="shipping-status-section">
              <h3>Shipping Status</h3>
              <div className="tracking-info">
                <div className="status-badge">
                  <i className="fas fa-shipping-fast"></i>
                  <span>{orderData.shippingStatus || "Processing"}</span>
                </div>
                <Link to={`/track/${orderData.trackingId}`} className="track-button">
                  <i className="fas fa-truck"></i> Track Your Order
                </Link>
              </div>
              <p className="tracking-number">
                Tracking Number: <strong>{orderData.trackingId}</strong>
              </p>
            </div>
          )}
          
          <div className="customer-support">
            <h3>Need Help?</h3>
            <p>
              If you have any questions about your order, please contact our customer support:
              <br />
              <a href="mailto:support@storystore.com">support@toystore.com</a> | <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
