import { mockProducts, getMockProductById } from './ProductDetail';
import { PAYMENT_METHODS } from './paymentMethods';
import { calculateCartSummary } from './CartData';

// Import data from db.json
import db from '../db/db.json';

/**
 * @typedef {import('../types/Order').Order} Order
 * @typedef {import('../types/Order').OrderItem} OrderItem
 */

/**
 * Generate a random order ID with prefix
 * @returns {string} Order ID
 */
const generateOrderId = () => {
  return `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
};

/**
 * Get product details by id from db
 * @param {number} id Product ID
 * @returns {Object|undefined} Product or undefined if not found
 */
const getProductById = (id) => {
  return db.products.find(product => product.id === id);
};

/**
 * Convert order from db format to the format expected by components
 * @param {Object} order Order from db
 * @returns {Order} Formatted order
 */
const formatOrderFromDb = (order) => {
  // Get order details
  const orderDetails = db.orderDetails.filter(detail => detail.order_id === order.id);
  
  // Get payment info
  const payment = db.payments.find(p => p.order_id === order.id);
  
  // Get shipping info
  const shipment = db.shipments.find(s => s.order_id === order.id);
  
  // Format address parts
  const addressParts = shipment?.address.split(', ') || [];
  const address = addressParts[0] || '';
  const district = addressParts[1] || '';
  
  // Find the city by partial match (since db format may differ)
  let city;
  if (addressParts.length > 2) {
    const cityName = addressParts[2];
    city = db.cities.find(c => cityName.includes(c.name)) || cityName;
  } else {
    city = db.cities[0]; // Default to first city
  }
  
  // Format items
  const items = orderDetails.map(detail => {
    const product = detail.product_id ? getProductById(detail.product_id) : null;
    const blindbox = detail.blindbox_id ? db.blindBoxes.find(bb => bb.id === detail.blindbox_id) : null;
    const item = product || blindbox || {};
    
    return {
      id: detail.id,
      name: item.name || `Product #${detail.id}`,
      price: detail.price,
      image: product ? 
        db.productImages.find(img => img.product_id === product.id)?.image_url : 
        blindbox ? 
          db.blindBoxImages.find(img => img.blindbox_id === blindbox.id)?.image_url :
          'https://via.placeholder.com/100',
      quantity: detail.quantity
    };
  });
  
  // Calculate total
  const totalPrice = order.total_amount;
  
  // Create summary
  const summary = {
    subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    discount: 0, // No discount info in db structure
    shipping: 0, // No shipping cost info in db structure
    total: totalPrice
  };
  
  // Format order
  return {
    orderId: `ORD-${order.id}`,
    name: order.user_id ? db.users.find(u => u.id === order.user_id)?.fullname || "Unknown Customer" : "Guest Customer",
    phone: db.users.find(u => u.id === order.user_id)?.phone || "0000000000",
    address: address,
    district: district,
    city: city,
    notes: "",
    paymentMethod: payment ? 
      db.paymentMethods.find(m => m.id === payment.method)?.name || payment.method : 
      "Cash on Delivery",
    items: items,
    totalPrice: totalPrice,
    discount: null,
    summary: summary,
    date: order.order_date,
    status: order.status
  };
};

/**
 * Convert all orders from db to component format
 */
export const mockOrders = db.orders.map(formatOrderFromDb);

/**
 * Get a mock order for demo purposes
 * @returns {Order} A mock order
 */
export const getMockOrder = () => {
  return {
    orderId: 'ORD1234567',
    trackingId: 'TRK10928374', // Added tracking ID for the entire order
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main Street',
    district: 'District 1',
    city: 'Ho Chi Minh City',
    paymentMethod: 'Credit Card',
    shippingStatus: 'In Transit', // Added shipping status
    items: [
      {
        id: 1,
        name: 'Labubu Classic',
        price: 29.99,
        quantity: 2,
        image: 'https://bizweb.dktcdn.net/100/467/909/products/1-kcsywtj3yu-1200x1200.jpg?v=1733894836057',
        trackingId: 'TRK10928374' // Added tracking ID for the item
      },
      {
        id: 2,
        name: 'Labubu Halloween Edition',
        price: 34.99,
        quantity: 1,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7r98q-ly0o4tghh80fbb',
        trackingId: 'TRK10928374' // Same tracking ID for items in the same order
      }
    ],
    totalPrice: 94.97,
    summary: {
      subtotal: 94.97,
      discount: 0,
      shipping: 0,
      total: 94.97
    }
  };
};

/**
 * Get a mock order by ID
 * @param {string} orderId Order ID
 * @returns {Order|undefined} Mock order or undefined if not found
 */
export const getMockOrderById = (orderId) => {
  return mockOrders.find(order => order.orderId === orderId);
};

/**
 * Create a mock order from cart items
 * @param {Object} orderData Customer and payment details
 * @param {Array} cartItems Items in the cart
 * @param {Object} cartSummary Cart summary with pricing details
 * @returns {Order} A newly created mock order
 */
export const createMockOrderFromCart = (orderData, cartItems, cartSummary) => {
  const orderItems = cartItems.map(item => {
    const product = getProductById(item.id);
    return {
      id: item.id,
      name: product ? product.name : item.name,
      price: item.price,
      image: item.image || 
             (product ? db.productImages.find(img => img.product_id === product.id)?.image_url : 
             'https://via.placeholder.com/100'),
      quantity: item.quantity
    };
  });

  const newOrder = {
    orderId: generateOrderId(),
    name: orderData.name,
    phone: orderData.phone,
    address: orderData.address,
    district: orderData.district,
    city: orderData.city,
    notes: orderData.notes || '',
    paymentMethod: orderData.paymentMethod,
    items: orderItems,
    totalPrice: cartSummary.total,
    discount: orderData.discountCode || null,
    summary: cartSummary,
    date: new Date().toISOString(),
    status: 'Processing'
  };

  // Add to mock orders (in a real app, this would be saved to a database)
  mockOrders.push(newOrder);
  
  return newOrder;
};
