/**
 * @typedef {import('./Order').Order} Order
 * @typedef {import('./Product').Product} Product
 * 
 * @typedef {Object} OrderDetail
 * @property {number} id
 * @property {number} order_id
 * @property {Order} order
 * @property {number} product_id
 * @property {Product} product
 * @property {number} quantity
 * @property {number} price
 * @property {Date} created_at
 */

export {}
