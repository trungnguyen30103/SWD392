/**
 * @typedef {Object} CartItem
 * @property {number} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Quantity in cart
 * @property {string} imageUrl - Product image URL
 */

/**
 * @typedef {Object} Cart
 * @property {CartItem[]} items - Items in the cart
 * @property {number} subtotal - Cart subtotal (before tax)
 * @property {number} tax - Tax amount
 * @property {number} total - Total cart amount
 */

/**
 * @typedef {Object} CartSummary
 * @property {number} itemCount - Total number of items
 * @property {number} subtotal - Subtotal amount
 * @property {number} tax - Tax amount
 * @property {number} shipping - Shipping cost
 * @property {number} total - Total amount
 * @property {string|null} discountCode - Applied discount code
 * @property {number} discountAmount - Discount amount
 */
