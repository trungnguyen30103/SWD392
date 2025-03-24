import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix import path from 'contexts' to 'context'
import { useCart } from '../../context/CartContext';
import { PAYMENT_METHODS } from '../../mock/paymentMethods';
import { CITIES } from '../../mock/locations';
import { ORDER_STATUS } from '../../types/Order';
import { calculateCartSummary } from '../../mock/CartData';
import './Checkout.scss';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: totalPrice,
    shipping: 0,
    discount: 0,
    total: totalPrice
  });
  
  useEffect(() => {
    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      navigate('/cart');
      return;
    }
    
    const savedShippingMethod = sessionStorage.getItem('shippingMethod');
    const savedDiscount = sessionStorage.getItem('appliedDiscount');
    
    if (savedShippingMethod) {
      setShippingMethod(savedShippingMethod);
    }
    
    if (savedDiscount) {
      setAppliedDiscount(savedDiscount);
    }
    
    const summary = calculateCartSummary(cart, savedDiscount, savedShippingMethod);
    setOrderSummary(summary);
  }, [cart, navigate]);

  const steps = [
    { title: 'Shipping Information', icon: '📦' },
    { title: 'Payment Method', icon: '💳' },
    { title: 'Order Confirmation', icon: '✅' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateShippingForm = () => {
    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.city) {
      errors.city = 'Please select your city/province';
    }
    
    if (!formData.district.trim()) {
      errors.district = 'Please enter your district';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Please enter your address';
    }
    
    return errors;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      const errors = validateShippingForm();
      if (Object.keys(errors).length === 0) {
        setCurrentStep(1);
      } else {
        setFormErrors(errors);
      }
    } else if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handlePaymentMethodChange = (methodId) => {
    setPaymentMethod(methodId);
  };
  
  const handleSubmitOrder = () => {
    setLoading(true);
    
    // Validate cart one more time before submission
    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Cannot place order.');
      navigate('/cart');
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      const orderData = {
        ...formData,
        paymentMethod: PAYMENT_METHODS.find(method => method.id === paymentMethod)?.name || paymentMethod,
        shippingMethod,
        discount: appliedDiscount,
        items: cart.map(item => ({
          id: item.id,
          name: item.name, 
          price: item.price,
          image: item.image,
          quantity: item.quantity
        })),
        summary: orderSummary,
        status: ORDER_STATUS.PENDING,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now().toString().slice(-8)}`,
        totalPrice: orderSummary.total
      };
      
      console.log('Order placed:', orderData);
      
      // Clear cart and local storage
      clearCart();
      sessionStorage.removeItem('shippingMethod');
      sessionStorage.removeItem('appliedDiscount');
      
      // Navigate to success page with order data
      navigate('/order-success', { state: { orderData } });
      setLoading(false);
    }, 1500);
  };

  const renderShippingForm = () => (
    <div className="shipping-form">
      <h2>Shipping Information</h2>
      <div className="form-group">
        <label htmlFor="name">Full Name <span className="required">*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={formErrors.name ? 'error' : ''}
          placeholder="Enter your full name"
        />
        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number <span className="required">*</span></label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={formErrors.phone ? 'error' : ''}
          placeholder="Enter your phone number"
        />
        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City/Province <span className="required">*</span></label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={formErrors.city ? 'error' : ''}
          >
            <option value="">Select city/province</option>
            {CITIES.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
          {formErrors.city && <div className="error-message">{formErrors.city}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="district">District <span className="required">*</span></label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className={formErrors.district ? 'error' : ''}
            placeholder="Enter your district"
          />
          {formErrors.district && <div className="error-message">{formErrors.district}</div>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="address">Address <span className="required">*</span></label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={formErrors.address ? 'error' : ''}
          rows={3}
          placeholder="Enter your detailed address"
        />
        {formErrors.address && <div className="error-message">{formErrors.address}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Order Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          placeholder="Special instructions for delivery (optional)"
        />
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="payment-methods">
      <h2>Payment Method</h2>
      <div className="payment-options">
        {PAYMENT_METHODS.map(method => (
          <div 
            key={method.id}
            className={`payment-option ${paymentMethod === method.id ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange(method.id)}
          >
            <div className="payment-option-content">
              <div className="payment-option-icon">
                <img src={method.icon} alt={method.name} />
              </div>
              <div className="payment-option-details">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </div>
              <div className="payment-option-check">
                <div className="radio-button">
                  <span className={paymentMethod === method.id ? 'checked' : ''}></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrderItem = (item) => (
    <div key={item.id} className="order-item">
      <div className="item-info">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-details">
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="item-price">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="order-items">
        {cart.map(item => renderOrderItem(item))}
      </div>
      <div className="order-divider"></div>
      <div className="order-totals">
        <div className="total-row">
          <span className="summary-label">Subtotal:</span>
          <span className="summary-value">${orderSummary.subtotal.toFixed(2)}</span>
        </div>
        
        {appliedDiscount && (
          <div className="total-row discount">
            <span className="summary-label">Discount ({appliedDiscount}):</span>
            <span className="summary-value discount-value">-${orderSummary.discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="total-row">
          <span className="summary-label">Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'}):</span>
          <span className="summary-value">
            {orderSummary.shipping === 0 
              ? 'Free' 
              : `$${orderSummary.shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="order-divider"></div>
        <div className="total-row grand-total">
          <span className="summary-label">Total:</span>
          <span className="summary-value">${orderSummary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <div className="confirmation-content">
        <div className="confirmation-details">
          <div className="confirmation-card">
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.district}, {
              CITIES.find(city => city.id === formData.city)?.name
            }</p>
            {formData.notes && (
              <p><strong>Notes:</strong> {formData.notes}</p>
            )}
          </div>
          <div className="confirmation-card">
            <h3>Payment Method</h3>
            <p>
              <strong>
                {PAYMENT_METHODS.find(method => method.id === paymentMethod)?.name}
              </strong>
            </p>
          </div>
        </div>
        <div className="confirmation-summary">
          {renderOrderSummary()}
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderShippingForm();
      case 1: 
        return renderPaymentMethods();
      case 2:
        return renderOrderConfirmation();
      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-steps">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`step ${index === currentStep ? 'active' : ''} 
                ${index < currentStep ? 'completed' : ''}`}
              onClick={() => index < currentStep && setCurrentStep(index)}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
        
        <div className="step-content">
          {renderStepContent()}
        </div>
        
        <div className="step-actions">
          {currentStep > 0 && (
            <button 
              className="button secondary-button" 
              onClick={handlePrevious}
              disabled={loading}
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button 
              className="button primary-button" 
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button 
              className="button primary-button checkout-button" 
              onClick={handleSubmitOrder}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Place Order'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
