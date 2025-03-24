import { Discount } from "./Discount";
import { User } from "./User";

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {number} user_id
 * @property {User} user
 * @property {string} gacha_type
 * @property {number|null} discount_id
 * @property {Discount|null} discont
 * @property {Date} order_date
 * @property {number} total_amount - decimal(10, 2)
 * @property {string} status
 * @property {string} payment_status
 * @property {string} shipping_status
 * @property {Date} created_at
 */

// Export an empty object as placeholder for the type
export const Order = {};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

/**
 * @typedef {Object} ShippingInfo
 * @property {string} name - Customer's full name
 * @property {string} phone - Customer's phone number
 * @property {string} address - Shipping address
 * @property {string} city - City ID
 * @property {string} district - District name
 * @property {string} [notes] - Optional delivery notes
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Quantity ordered
 * @property {string} image - Product image URL
 */

/**
 * @typedef {Object} ClientOrder
 * @property {string} id - Order ID
 * @property {ShippingInfo} shippingInfo - Customer's shipping information
 * @property {string} paymentMethod - Payment method ID
 * @property {OrderItem[]} items - Ordered items
 * @property {number} totalPrice - Total order price
 * @property {string} status - Order status
 * @property {string} orderDate - ISO date string of order creation
 */
