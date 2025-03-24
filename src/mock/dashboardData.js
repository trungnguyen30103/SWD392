import db from '../db/db.json';

// Process order data to generate monthly revenue
const generateRevenueData = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  // Initialize revenue data for all months
  const monthlyRevenue = monthNames.map(month => ({
    month,
    revenue: 0
  }));
  
  // Aggregate real revenue from orders
  if (db.orders && db.orders.length > 0) {
    db.orders.forEach(order => {
      const orderDate = new Date(order.order_date);
      if (orderDate.getFullYear() === currentYear) {
        const monthIndex = orderDate.getMonth();
        monthlyRevenue[monthIndex].revenue += order.total_amount;
      }
    });
  }
  
  // Fill in missing or low data with reasonable estimates based on existing patterns
  let hasRealData = false;
  let avgRevenue = 0;
  
  // Check if we have any real data and calculate average
  monthlyRevenue.forEach(item => {
    if (item.revenue > 0) {
      hasRealData = true;
      avgRevenue += item.revenue;
    }
  });
  
  if (hasRealData) {
    avgRevenue = avgRevenue / monthlyRevenue.filter(item => item.revenue > 0).length;
  } else {
    // If no real data, use a default average
    avgRevenue = 1500;
  }
  
  // Fill in missing data with generated values
  return monthlyRevenue.map((item, index) => {
    if (item.revenue === 0) {
      // Generate reasonable mock data with some variability
      const seasonalFactor = 1 + 0.3 * Math.sin((index / 11) * Math.PI); // Seasonal pattern
      const randomFactor = 0.8 + Math.random() * 0.4; // Random variation ±20%
      return {
        month: item.month,
        revenue: Math.round((avgRevenue * seasonalFactor * randomFactor) * 100) / 100
      };
    }
    return item;
  });
};

// Process product data to generate category distribution
const generateProductDistributionData = () => {
  const categoryDistribution = [];
  
  // Create a map of category ID to product count
  const categoryCountMap = {};
  
  if (db.products && db.products.length > 0) {
    db.products.forEach(product => {
      if (product.category_id) {
        categoryCountMap[product.category_id] = (categoryCountMap[product.category_id] || 0) + 1;
      }
    });
    
    // Add blind boxes to category counts if they exist
    if (db.blindBoxes && db.blindBoxes.length > 0) {
      db.blindBoxes.forEach(box => {
        if (box.category_id) {
          categoryCountMap[box.category_id] = (categoryCountMap[box.category_id] || 0) + 1;
        }
      });
    }
    
    // Convert category counts to array with category names
    Object.keys(categoryCountMap).forEach(categoryId => {
      const category = db.categories.find(cat => cat.id === Number(categoryId));
      if (category) {
        categoryDistribution.push({
          name: category.name,
          count: categoryCountMap[categoryId]
        });
      }
    });
    
    // Sort by count (descending)
    categoryDistribution.sort((a, b) => b.count - a.count);
  }
  
  return categoryDistribution;
};

// Process customer data
const generateCustomerData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyNewCustomers = Array(12).fill(0);
  const monthlyReturningCustomers = Array(12).fill(0);
  
  // Count customers by month of registration
  if (db.users && db.users.length > 0) {
    db.users.forEach(user => {
      if (user.role_id === 1 && user.created_at) { // If user is a customer
        const registerDate = new Date(user.created_at);
        if (registerDate.getFullYear() === currentYear) {
          const monthIndex = registerDate.getMonth();
          monthlyNewCustomers[monthIndex]++;
        }
      }
    });
  }
  
  // Analyze orders to identify returning customers
  if (db.orders && db.orders.length > 0) {
    // Group orders by user and month
    const userOrdersByMonth = {};
    
    db.orders.forEach(order => {
      const orderDate = new Date(order.order_date);
      if (orderDate.getFullYear() === currentYear) {
        const userId = order.user_id;
        const monthIndex = orderDate.getMonth();
        
        if (!userOrdersByMonth[userId]) {
          userOrdersByMonth[userId] = Array(12).fill(false);
        }
        
        userOrdersByMonth[userId][monthIndex] = true;
      }
    });
    
    // Count returning customers (customers who ordered in previous months)
    Object.values(userOrdersByMonth).forEach(userMonths => {
      let hasOrdered = false;
      userMonths.forEach((ordered, monthIndex) => {
        if (ordered) {
          if (hasOrdered) {
            // If customer has ordered before, count as returning
            monthlyReturningCustomers[monthIndex]++;
          }
          hasOrdered = true;
        }
      });
    });
  }
  
  // Fill in gaps with reasonable mock data
  const fillMissingData = (dataArray, baseValue, growthPattern) => {
    const hasData = dataArray.some(val => val > 0);
    
    if (!hasData) {
      // If no real data, generate mock data with growth trend
      return dataArray.map((_, index) => {
        return Math.round(baseValue * (1 + growthPattern * index/11));
      });
    } else {
      // Fill in only zeroes with estimates based on adjacent months
      return dataArray.map((val, index) => {
        if (val === 0) {
          const prevMonth = index > 0 ? dataArray[index - 1] : null;
          const nextMonth = index < 11 ? dataArray[index + 1] : null;
          
          if (prevMonth && prevMonth > 0 && nextMonth && nextMonth > 0) {
            // Interpolate between adjacent months
            return Math.round((prevMonth + nextMonth) / 2);
          } else if (prevMonth && prevMonth > 0) {
            // Grow from previous month
            return Math.round(prevMonth * (1 + 0.05 - 0.1 * Math.random()));
          } else if (nextMonth && nextMonth > 0) {
            // Calculate backwards from next month
            return Math.round(nextMonth / (1 + 0.05 - 0.1 * Math.random()));
          } else {
            // No reference, use base value
            return Math.round(baseValue * (1 + growthPattern * index/11));
          }
        }
        return val;
      });
    }
  };
  
  return {
    newCustomers: fillMissingData(monthlyNewCustomers, 40, 0.8),
    returningCustomers: fillMissingData(monthlyReturningCustomers, 30, 1.0)
  };
};

// Generate order status distribution data
const generateOrderStatusData = () => {
  const statusCounts = {};
  
  if (db.orders && db.orders.length > 0) {
    db.orders.forEach(order => {
      if (order.status) {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      }
    });
  }
  
  // If no real data, create sample distribution
  if (Object.keys(statusCounts).length === 0) {
    return {
      "delivered": 35,
      "processing": 15,
      "pending": 8,
      "cancelled": 3
    };
  }
  
  return statusCounts;
};

// Generate top selling products data
const generateTopSellingProducts = () => {
  const productSales = {};
  
  if (db.orderDetails && db.orderDetails.length > 0) {
    db.orderDetails.forEach(detail => {
      if (detail.product_id) {
        if (!productSales[detail.product_id]) {
          productSales[detail.product_id] = {
            id: detail.product_id,
            totalQuantity: 0,
            totalRevenue: 0
          };
        }
        productSales[detail.product_id].totalQuantity += detail.quantity;
        productSales[detail.product_id].totalRevenue += detail.price * detail.quantity;
      }
    });
    
    // Add product names and images
    Object.values(productSales).forEach(product => {
      const productInfo = db.products.find(p => p.id === product.id);
      if (productInfo) {
        product.name = productInfo.name;
        product.imageUrl = productInfo.imageUrl;
        product.category = db.categories.find(c => c.id === productInfo.category_id)?.name || 'Uncategorized';
      }
    });
  }
  
  // Sort by total revenue and take top 5
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);
    
  // If no real data or insufficient data, add mock products
  if (topProducts.length < 5) {
    const mockProducts = [
      {
        id: 1001,
        name: "Labubu Platinum Edition",
        totalQuantity: 24,
        totalRevenue: 1199.76,
        imageUrl: "https://lzd-img-global.slatic.net/g/p/c0ebe26f9a82bd9270647dfdbe6c173c.jpg_720x720q80.jpg",
        category: "Action Figures"
      },
      {
        id: 1002,
        name: "Labubu Cosmic Collection",
        totalQuantity: 18,
        totalRevenue: 899.82,
        imageUrl: "https://i.ebayimg.com/images/g/a1cAAOSwPBZk-Igh/s-l1600.jpg",
        category: "Plush Toys"
      },
      {
        id: 1003,
        name: "Golden Labubu Limited",
        totalQuantity: 12,
        totalRevenue: 599.88,
        imageUrl: "https://i.ebayimg.com/images/g/lCkAAOSw0ZdiX9n4/s-l1600.jpg",
        category: "Collectibles"
      },
      {
        id: 1004,
        name: "Labubu Mega Pack",
        totalQuantity: 9,
        totalRevenue: 449.91,
        imageUrl: "https://pbs.twimg.com/media/FLch8-WWQAM_TTv.jpg",
        category: "Box Sets"
      },
      {
        id: 1005,
        name: "Labubu Night Edition",
        totalQuantity: 15,
        totalRevenue: 374.85,
        imageUrl: "https://down-th.img.susercontent.com/file/th-11134207-7r98q-ly0o4tghh80fbb",
        category: "Limited Edition"
      }
    ];
    
    // Add only enough mock products to reach 5 total
    for (let i = 0; i < 5 - topProducts.length; i++) {
      topProducts.push(mockProducts[i]);
    }
  }
  
  return topProducts;
};

// Export data
export const mockRevenueData = generateRevenueData();
export const mockProductData = {
  categories: generateProductDistributionData()
};
export const mockCustomerData = generateCustomerData();
export const mockOrderStatusData = generateOrderStatusData();
export const mockTopSellingProducts = generateTopSellingProducts();

// Sales summary - quick statistics
export const salesSummary = {
  daily: {
    sales: Math.round((mockRevenueData[new Date().getMonth()].revenue / 30) * 100) / 100,
    orders: Math.round(mockOrderStatusData.delivered / 30) + Math.round(mockOrderStatusData.processing / 30),
    growth: "+5.8%"
  },
  weekly: {
    sales: Math.round((mockRevenueData[new Date().getMonth()].revenue / 4) * 100) / 100,
    orders: Math.round(mockOrderStatusData.delivered / 4) + Math.round(mockOrderStatusData.processing / 4),
    growth: "+12.5%"
  },
  monthly: {
    sales: mockRevenueData[new Date().getMonth()].revenue,
    orders: mockOrderStatusData.delivered + mockOrderStatusData.processing,
    growth: "+23.1%"
  },
  yearly: {
    sales: mockRevenueData.reduce((sum, month) => sum + month.revenue, 0),
    orders: Object.values(mockOrderStatusData).reduce((sum, count) => sum + count, 0),
    growth: "+67.4%"
  }
};

// Recent activities for dashboard activity feed
export const recentActivities = [
  {
    id: 1, 
    type: "order",
    action: "New order placed",
    detail: "Customer #1002 placed order #5023",
    amount: "$89.97",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    id: 2,
    type: "payment",
    action: "Payment received",
    detail: "Payment for order #5021 confirmed",
    amount: "$124.50",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString()
  },
  {
    id: 3,
    type: "shipment",
    action: "Order shipped",
    detail: "Order #5019 has been shipped via Express",
    amount: null,
    timestamp: new Date(Date.now() - 240 * 60000).toISOString()
  },
  {
    id: 4,
    type: "inventory",
    action: "Low stock alert",
    detail: "Labubu Classic is running low (3 remaining)",
    amount: null,
    timestamp: new Date(Date.now() - 480 * 60000).toISOString()
  },
  {
    id: 5,
    type: "customer",
    action: "New customer registered",
    detail: "Customer #1056 completed registration",
    amount: null,
    timestamp: new Date(Date.now() - 720 * 60000).toISOString()
  }
];

// Popular searches for product discovery insights
export const popularSearches = [
  { term: "Labubu", count: 156 },
  { term: "Halloween", count: 98 },
  { term: "Limited Edition", count: 72 },
  { term: "Golden", count: 54 },
  { term: "Mini", count: 47 },
  { term: "Blind Box", count: 43 },
  { term: "Mystery", count: 36 },
  { term: "Zodiac", count: 28 }
];
