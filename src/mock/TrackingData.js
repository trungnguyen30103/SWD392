export const trackingData = [
  {
    trackingId: "TRK10928374",
    orderId: "ORD1234567",
    status: "in_transit",
    estimatedDelivery: "2023-11-04T10:00:00Z",
    currentLocation: "Ho Chi Minh City Distribution Center",
    shippingAddress: "123 Main St, District 1, HCMC",
    carrier: "Fast Express",
    trackingHistory: [
      {
        status: "order_placed",
        location: "Online",
        timestamp: "2023-10-28T10:15:00Z",
        description: "Order has been placed"
      },
      {
        status: "payment_confirmed",
        location: "Online",
        timestamp: "2023-10-28T10:20:00Z", 
        description: "Payment has been confirmed"
      },
      {
        status: "processing",
        location: "Story Store Warehouse",
        timestamp: "2023-10-29T08:30:00Z",
        description: "Order is being processed at our warehouse"
      },
      {
        status: "shipped",
        location: "Story Store Warehouse",
        timestamp: "2023-10-30T14:20:00Z",
        description: "Order has been shipped"
      },
      {
        status: "in_transit",
        location: "Ho Chi Minh City Distribution Center",
        timestamp: "2023-10-31T09:45:00Z",
        description: "Package is in transit to delivery address"
      }
    ],
    items: [
      {
        id: 1,
        name: "Labubu Classic",
        quantity: 2,
        price: 29.99,
        imageUrl: "https://bizweb.dktcdn.net/100/467/909/products/1-kcsywtj3yu-1200x1200.jpg?v=1733894836057"
      },
      {
        id: 2,
        name: "Labubu Halloween Edition",
        quantity: 1,
        price: 34.99,
        imageUrl: "https://down-th.img.susercontent.com/file/th-11134207-7r98q-ly0o4tghh80fbb"
      }
    ]
  },
  {
    trackingId: "TRK76538291",
    orderId: 5,
    status: "processing",
    estimatedDelivery: "2023-11-17T10:00:00Z",
    currentLocation: "Story Store Warehouse",
    shippingAddress: "123 Main St, District 1, HCMC",
    carrier: "Fast Express",
    trackingHistory: [
      {
        status: "order_placed",
        location: "Online",
        timestamp: "2023-11-10T11:20:00Z",
        description: "Order has been placed"
      },
      {
        status: "payment_confirmed",
        location: "Online",
        timestamp: "2023-11-10T11:25:00Z", 
        description: "Payment has been confirmed"
      },
      {
        status: "processing",
        location: "Story Store Warehouse",
        timestamp: "2023-11-11T08:45:00Z",
        description: "Order is being processed at our warehouse"
      }
    ],
    items: [
      {
        name: "Labubu Mystery Box",
        quantity: 1,
        price: 24.99,
        imageUrl: "https://images.tokentrove.com/nft/980x1400/ordinal/inscription/105849497.jpg"
      },
      {
        name: "Labubu Halloween Mystery Box",
        quantity: 1,
        price: 24.99,
        imageUrl: "https://pbs.twimg.com/media/FLch8-WWQAM_TTv.jpg"
      }
    ]
  }
];

export const trackingStatuses = {
  order_placed: {
    label: "Order Placed",
    icon: "fa-shopping-cart",
    color: "#6c757d"
  },
  payment_confirmed: {
    label: "Payment Confirmed",
    icon: "fa-credit-card",
    color: "#6c757d"
  },
  processing: {
    label: "Processing",
    icon: "fa-box-open",
    color: "#ffc107"
  },
  shipped: {
    label: "Shipped",
    icon: "fa-shipping-fast",
    color: "#17a2b8"
  },
  in_transit: {
    label: "In Transit",
    icon: "fa-truck",
    color: "#0d6efd"
  },
  out_for_delivery: {
    label: "Out for Delivery",
    icon: "fa-truck-loading",
    color: "#fd7e14"
  },
  delivered: {
    label: "Delivered",
    icon: "fa-check-circle",
    color: "#28a745"
  },
  failed_attempt: {
    label: "Delivery Attempt Failed",
    icon: "fa-exclamation-circle",
    color: "#dc3545"
  }
};
