import db from '../db/db.json';

// Helper function to enrich orders with product details
const enrichOrdersWithDetails = () => {
  return db.orders.map(order => {
    // Get order details for this order
    const orderDetails = db.orderDetails.filter(detail => detail.order_id === order.id);
    
    // Get payment and shipment info
    const payment = db.payments.find(payment => payment.order_id === order.id);
    const shipment = db.shipments.find(shipment => shipment.order_id === order.id);

    // Get product or blindbox details for each order detail
    const items = orderDetails.map(detail => {
      if (detail.product_id) {
        const product = db.products.find(p => p.id === detail.product_id);
        return {
          product_id: product.id,
          blindbox_id: null,
          name: product.name,
          imageUrl: product.imageUrl,
          price: detail.price,
          quantity: detail.quantity
        };
      } else if (detail.blindbox_id) {
        const blindbox = db.blindBoxes.find(b => b.id === detail.blindbox_id);
        const blindboxImage = db.blindBoxImages.find(img => img.blindbox_id === detail.blindbox_id);
        return {
          product_id: null,
          blindbox_id: blindbox.id,
          name: blindbox.name,
          imageUrl: blindboxImage ? blindboxImage.image_url : '',
          price: detail.price,
          quantity: detail.quantity
        };
      }
    });

    // Return enriched order with details
    return {
      ...order,
      items,
      shipping: {
        method: shipment.method,
        status: shipment.status,
        address: shipment.address
      },
      payment: {
        method: payment.method,
        status: payment.status
      }
    };
  });
};

// Create order history using actual data from db.json
export const orderHistory = enrichOrdersWithDetails();
