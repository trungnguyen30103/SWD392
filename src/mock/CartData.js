import db from '../db/db.json';
import { mockProducts } from './ProductDetail';

/**
 * @typedef {import('../types/Cart').CartItem} CartItem
 * @typedef {import('../types/Cart').Cart} Cart
 * @typedef {import('../types/Cart').CartSummary} CartSummary
 */

/**
 * Initial mock cart items
 * @type {CartItem[]}
 */
export const mockCartItems = db.cartItems;

/**
 * Calculate the summary of items in the cart including discounts and shipping
 * @param {Array} cart - The array of cart items
 * @param {string|null} discountCode - Discount code if applied
 * @param {string} shippingMethod - Shipping method selected ('standard' or 'express')
 * @returns {Object} Cart summary with subtotal, discount, tax, shipping and total
 */
export const calculateCartSummary = (cart, discountCode, shippingMethod = 'standard') => {
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate item count
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate discount
  let discountAmount = 0;
  if (discountCode) {
    // Get discount from db
    const discountInfo = db.discountCodes.find(d => d.code === discountCode);
    if (discountInfo) {
      discountAmount = subtotal * (discountInfo.percentage / 100);
    }
  }
  
  // Calculate tax (assume 8% tax rate)
  const taxRate = 0.08;
  const tax = (subtotal - discountAmount) * taxRate;
  
  // Calculate shipping
  let shipping = 0;
  if (shippingMethod === 'express') {
    shipping = 9.99;
  }
  
  // Calculate total
  const total = (subtotal - discountAmount) + tax + shipping;
  
  return {
    subtotal,
    discount: discountAmount,
    tax,
    shipping,
    itemCount,
    total,
  };
};

/**
 * Mock cart data
 * @type {Cart}
 */
export const mockCart = {
  items: mockCartItems,
  subtotal: calculateCartSummary(mockCartItems).subtotal,
  tax: calculateCartSummary(mockCartItems).tax,
  total: calculateCartSummary(mockCartItems).total
};

/**
 * Get a product from the mock products by ID
 * @param {number} id 
 * @returns Product or undefined
 */
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};
