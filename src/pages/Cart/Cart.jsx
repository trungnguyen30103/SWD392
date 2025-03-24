import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { calculateCartSummary } from '../../mock/CartData';
import './Cart.scss';

// Import icons (you can use any icon library like FontAwesome, Material Icons, etc.)
// For this example, I'll use comments to indicate where icons would go

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity, item.stock_quantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.imageUrl} alt={item.name} />
        </Link>
      </div>
      
      <div className="cart-item-details">
        <Link to={`/product/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
        <p className="cart-item-price">${item.price?.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-control">
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.stock_quantity)}
            aria-label="Decrease quantity"
          >
            {/* Minus icon */}
            -
          </button>
          
          <input
            type="number"
            min="1"
            max={item.stock_quantity}
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            aria-label="Item quantity"
          />
          
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock_quantity)}
            aria-label="Increase quantity"
            disabled={item.quantity >= item.stock_quantity}
          >
            {/* Plus icon */}
            +
          </button>
        </div>
        
        <button 
          className="remove-btn" 
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <span className="remove-icon">
            {/* Trash icon */}
            🗑️
          </span>
          Remove
        </button>
      </div>
      
      <div className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Animation effect when cart items change
  useEffect(() => {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
  }, [cart.length]);
  
  const handleApplyDiscount = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (discountCode === 'SAVE10' || discountCode === 'SAVE20') {
        setAppliedDiscount(discountCode);
      } else {
        alert('Invalid discount code. Try SAVE10 or SAVE20.');
        setAppliedDiscount(null);
      }
      setIsProcessing(false);
    }, 800);
  };
  
  const handleShippingChange = (method) => {
    setShippingMethod(method);
  };
  
  const handleCheckout = () => {
    // Store shipping method and discount in sessionStorage for use in checkout
    sessionStorage.setItem('shippingMethod', shippingMethod);
    if (appliedDiscount) {
      sessionStorage.setItem('appliedDiscount', appliedDiscount);
    }
    
    // Navigate to the checkout page
    navigate('/checkout');
  };

  // Calculate cart summary with shipping method considered
  const cartSummary = calculateCartSummary(cart, appliedDiscount, shippingMethod);
  
  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <div className="empty-cart-icon">
          {/* Shopping cart icon */}
          🛒
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.<br />
        Explore our products and find something you'll love!</p>
        <Link to="/products" className="button primary-button">
          <span className="button-icon">
            {/* Shopping icon */}
            🛍️
          </span>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          
          <div className="cart-actions">
            <button 
              className="button secondary-button" 
              onClick={clearCart}
            >
              <span className="button-icon">
                {/* Trash icon */}
                🗑️
              </span>
              Clear Cart
            </button>
            
            <Link to="/products" className="button outline-button">
              <span className="button-icon">
                {/* Arrow left icon */}
                ←
              </span>
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span className="summary-label">Items ({cartSummary.itemCount}):</span>
            <span className="summary-value">${cartSummary.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="discount-section">
            <div className="discount-title">
              <span className="discount-icon">
                {/* Tag icon */}
                🏷️
              </span>
              Apply Discount Code
            </div>
            
            <div className="discount-input">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                disabled={isProcessing}
              />
              <button 
                onClick={handleApplyDiscount}
                disabled={isProcessing || !discountCode}
              >
                {isProcessing ? '.....' : 'Apply'}
              </button>
            </div>
            
            {appliedDiscount && (
              <div className="discount-applied">
                <span>Discount ({appliedDiscount}):</span>
                <span>-${cartSummary.discount.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="shipping-options">
            <div className="shipping-title">Shipping Method</div>
            
            <div className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                id="shipping-standard" 
                name="shipping" 
                checked={shippingMethod === 'standard'} 
                onChange={() => handleShippingChange('standard')}
              />
              <div className="option-info">
                <div className="option-name">Standard Shipping</div>
                <div className="option-price">Free</div>
              </div>
            </div>
            
            <div className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                id="shipping-express" 
                name="shipping" 
                checked={shippingMethod === 'express'} 
                onChange={() => handleShippingChange('express')}
              />
              <div className="option-info">
                <div className="option-name">Express Shipping</div>
                <div className="option-price">$9.99</div>
              </div>
            </div>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">Tax:</span>
            <span className="summary-value">${cartSummary.tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">Shipping:</span>
            <span className="summary-value">
              {cartSummary.shipping === 0 
                ? 'Free' 
                : `$${cartSummary.shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="summary-row total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">${cartSummary.total.toFixed(2)}</span>
          </div>
          
          <button 
            className="button primary-button checkout-button"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
