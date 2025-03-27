import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// API base URL configuration
const API_BASE_URL = 'http://localhost:8080/api'; // Adjust this to match your backend URL

const Dashboard = () => {
    // State for storing dashboard data
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        totalCustomers: 0,
        totalAdmins: 0,
        activeUsers: 0
    });
    
    const [productStats, setProductStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        outOfStockProducts: 0,
        disabledProducts: 0
    });
    
    const [orderStats, setOrderStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0
    });
    
    const [blindboxStats, setBlindboxStats] = useState({
        totalBlindboxes: 0,
        activeBlindboxes: 0,
        outOfStockBlindboxes: 0,
        disabledBlindboxes: 0
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            if (response.data && response.data.data) {
                const userData = response.data.data;
                setUsers(userData);

                // Calculate user statistics
                setUserStats({
                    totalUsers: userData.length,
                    totalCustomers: userData.filter(user => user.role?.roleID === 2).length,
                    totalAdmins: userData.filter(user => user.role?.roleID === 1).length,
                    activeUsers: userData.filter(user => user.status === 'ACTIVE').length
                });

                // Process user registration data - group by month
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // Last 6 months

                const monthlyData = Array(6).fill(0);
                const months = [];
                
                for (let i = 0; i < 6; i++) {
                    const d = new Date();
                    d.setMonth(d.getMonth() - (5 - i));
                    months.push(d.toLocaleString('default', { month: 'long' }));
                }

                userData.forEach(user => {
                    const createdDate = new Date(user.createdAt);
                    if (createdDate >= sixMonthsAgo) {
                        const monthIndex = createdDate.getMonth() % 12;
                        const adjustedIndex = (months.findIndex(m => 
                            m === new Date(0, monthIndex).toLocaleString('default', { month: 'long' })));
                        if (adjustedIndex >= 0) {
                            monthlyData[adjustedIndex]++;
                        }
                    }
                });

                const registrationData = months.map((month, index) => ({
                    month,
                    registrations: monthlyData[index]
                }));

                setUserRegistrations(registrationData);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to load user data. Please try again later.");
        }
    };

    // Function to fetch product data
    const fetchProductData = async () => {
        try {
            // Get all products
            const allProductsResponse = await axios.get(`${API_BASE_URL}/products`);
            const activeProductsResponse = await axios.get(`${API_BASE_URL}/products/status/active`);
            const disabledProductsResponse = await axios.get(`${API_BASE_URL}/products/status/disable`);
            const outOfStockProductsResponse = await axios.get(`${API_BASE_URL}/products/status/out-of-stock`);
            
            if (allProductsResponse.data && 
                activeProductsResponse.data && 
                disabledProductsResponse.data && 
                outOfStockProductsResponse.data) {
                
                const allProducts = allProductsResponse.data.data || [];
                const activeProducts = activeProductsResponse.data.data || [];
                const disabledProducts = disabledProductsResponse.data.data || [];
                const outOfStockProducts = outOfStockProductsResponse.data.data || [];
                
                // Update product statistics
                setProductStats({
                    totalProducts: allProducts.length,
                    activeProducts: activeProducts.length,
                    disabledProducts: disabledProducts.length,
                    outOfStockProducts: outOfStockProducts.length
                });
                
                // Calculate top selling products based on orders
                if (allProducts.length > 0) {
                    // For demonstration, since we don't have actual sales data yet
                    // We'll use the products' stock levels as an approximation
                    const topProductsList = [...allProducts]
                        .sort((a, b) => a.stock - b.stock) // Lower stock might indicate higher sales
                        .slice(0, 5)
                        .map(product => ({
                            name: product.productName,
                            sales: Math.max(50 - product.stock, 0), // Mock sales value
                            revenue: Math.max(50 - product.stock, 0) * product.price
                        }));
                    
                    setTopProducts(topProductsList);
                }
                
                // Process category data
                const categoryMap = new Map();
                allProducts.forEach(product => {
                    const catId = product.category?.categoryID;
                    const catName = product.category?.categoryName || 'Uncategorized';
                    if (catId) {
                        if (categoryMap.has(catId)) {
                            categoryMap.set(catId, {
                                ...categoryMap.get(catId),
                                count: categoryMap.get(catId).count + 1
                            });
                        } else {
                            categoryMap.set(catId, {
                                category: catName,
                                count: 1,
                                color: getRandomColor()
                            });
                        }
                    }
                });
                
                setCategoryData([...categoryMap.values()]);
            }
        } catch (err) {
            console.error("Error fetching product data:", err);
            setError("Failed to load product data. Please try again later.");
        }
    };

    // Function to fetch order data
    const fetchOrderData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`);
            if (response.data) {
                const orderData = response.data || [];
                setOrders(orderData);
                
                // Calculate order statistics
                const completedOrders = orderData.filter(order => order.status === 'COMPLETED');
                const pendingOrders = orderData.filter(order => order.status === 'PENDING');
                const cancelledOrders = orderData.filter(order => order.status === 'CANCELLED');
                
                setOrderStats({
                    totalOrders: orderData.length,
                    pendingOrders: pendingOrders.length,
                    completedOrders: completedOrders.length,
                    cancelledOrders: cancelledOrders.length,
                    totalRevenue: completedOrders.reduce((sum, order) => sum + order.totalAmount, 0)
                });
                
                // Process sales data for the past 7 days
                const last7Days = [];
                const salesByDay = new Map();
                const ordersByDay = new Map();
                
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    last7Days.push(dateStr);
                    salesByDay.set(dateStr, 0);
                    ordersByDay.set(dateStr, 0);
                }
                
                orderData.forEach(order => {
                    const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
                    if (salesByDay.has(orderDate)) {
                        salesByDay.set(orderDate, salesByDay.get(orderDate) + order.totalAmount);
                        ordersByDay.set(orderDate, ordersByDay.get(orderDate) + 1);
                    }
                });
                
                const processedSalesData = last7Days.map(date => ({
                    date,
                    sales: salesByDay.get(date) || 0,
                    orders: ordersByDay.get(date) || 0
                }));
                
                setSalesData(processedSalesData);
            }
        } catch (err) {
            console.error("Error fetching order data:", err);
            setError("Failed to load order data. Please try again later.");
        }
    };

    // Function to fetch blindbox data
    const fetchBlindboxData = async () => {
        try {
            const allBlindboxesResponse = await axios.get(`${API_BASE_URL}/blindboxes`);
            const activeBlindboxesResponse = await axios.get(`${API_BASE_URL}/blindboxes/status/active`);
            const disabledBlindboxesResponse = await axios.get(`${API_BASE_URL}/blindboxes/status/disable`);
            const outOfStockBlindboxesResponse = await axios.get(`${API_BASE_URL}/blindboxes/status/out-of-stock`);
            
            if (allBlindboxesResponse.data &&
                activeBlindboxesResponse.data &&
                disabledBlindboxesResponse.data &&
                outOfStockBlindboxesResponse.data) {
                
                const allBlindboxes = allBlindboxesResponse.data.data || [];
                const activeBlindboxes = activeBlindboxesResponse.data.data || [];
                const disabledBlindboxes = disabledBlindboxesResponse.data.data || [];
                const outOfStockBlindboxes = outOfStockBlindboxesResponse.data.data || [];
                
                setBlindboxStats({
                    totalBlindboxes: allBlindboxes.length,
                    activeBlindboxes: activeBlindboxes.length,
                    disabledBlindboxes: disabledBlindboxes.length,
                    outOfStockBlindboxes: outOfStockBlindboxes.length
                });
            }
        } catch (err) {
            console.error("Error fetching blindbox data:", err);
            setError("Failed to load blindbox data. Please try again later.");
        }
    };

    // Generate a random color for chart segments
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Fetch dashboard data
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const fetchAllData = async () => {
            try {
                await Promise.all([
                    fetchUserData(),
                    fetchProductData(),
                    fetchOrderData(),
                    fetchBlindboxData()
                ]);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);
    
    // Icons for dashboard (using Unicode symbols for simplicity)
    const icons = {
        users: '👥',
        products: '🧸',
        orders: '📦',
        revenue: '💰',
        blindboxes: '🎁',
        loading: '🔄',
        manage: '⚙️',
        view: '👁️',
        chart: '📊',
        trend: '📈',
        category: '🏷️',
        hot: '🔥',
        error: '⚠️'
    };
    
    // Chart configurations - optimized for smaller dimensions
    const salesChartConfig = {
        data: {
            labels: salesData.map(item => {
                const date = new Date(item.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            }),
            datasets: [
                {
                    label: 'Sales ($)',
                    data: salesData.map(item => item.sales),
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#FF6B6B',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Orders',
                    data: salesData.map(item => item.orders * 100), // Scale for visibility
                    borderColor: '#4ECDC4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4ECDC4',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    yAxisID: 'y1',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label !== '') {
                                label += ': ';
                            }
                            if (context.dataset.label === 'Orders') {
                                // Convert back from scaled value
                                label += Math.round(context.parsed.y / 100);
                            } else {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        },
                        font: {
                            size: 10
                        }
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value / 100;
                        },
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    };

    const userRegistrationChartConfig = {
        data: {
            labels: userRegistrations.map(item => item.month),
            datasets: [
                {
                    label: 'New Users',
                    data: userRegistrations.map(item => item.registrations),
                    backgroundColor: [
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(255, 209, 102, 0.8)',
                        'rgba(6, 214, 160, 0.8)',
                        'rgba(17, 138, 178, 0.8)',
                        'rgba(239, 71, 111, 0.8)',
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed + ' registrations';
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    };

    const topProductsChartConfig = {
        data: {
            labels: topProducts.map(product => product.name),
            datasets: [
                {
                    label: 'Units Sold',
                    data: topProducts.map(product => product.sales),
                    backgroundColor: [
                        'rgba(255, 107, 107, 0.7)',
                        'rgba(78, 205, 196, 0.7)',
                        'rgba(255, 209, 102, 0.7)',
                        'rgba(17, 138, 178, 0.7)',
                        'rgba(6, 214, 160, 0.7)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    borderRadius: 5,
                    barPercentage: 0.7,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const product = topProducts[context.dataIndex];
                            return [
                                `Units Sold: ${product.sales}`,
                                `Revenue: $${product.revenue.toFixed(2)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 9
                        }
                    }
                },
                y: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    };

    const categoryChartConfig = {
        data: {
            labels: categoryData.map(cat => cat.category),
            datasets: [
                {
                    label: 'Products',
                    data: categoryData.map(cat => cat.count),
                    backgroundColor: categoryData.map(cat => cat.color),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    borderRadius: 5,
                    hoverOffset: 15
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: 10
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const category = categoryData[context.dataIndex];
                            const percentage = Math.round((category.count / categoryData.reduce((sum, cat) => sum + cat.count, 0)) * 100);
                            return [
                                `${category.category}: ${category.count} products`,
                                `${percentage}% of total`
                            ];
                        }
                    }
                }
            }
        }
    };

    // Recent users component - simplified layout
    const RecentUsers = ({ users }) => {
        const recentUsers = users?.slice(0, 5) || [];
        
        return (
            <div className="dashboard-panel">
                <h3>
                    <span className="panel-icon">{icons.users}</span>
                    Recent Users
                </h3>
                {recentUsers.length > 0 ? (
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map(user => (
                                <tr key={user.userID}>
                                    <td>{user.userName}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.role?.roleName || 'N/A'}</td>
                                    <td className={`status ${user.status?.toLowerCase()}`}>{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No users found</div>
                )}
            </div>
        );
    };
    
    // Recent orders component - simplified layout
    const RecentOrders = ({ orders }) => {
        const recentOrders = orders?.slice(0, 5) || [];
        
        return (
            <div className="dashboard-panel">
                <h3>
                    <span className="panel-icon">{icons.orders}</span>
                    Recent Orders
                </h3>
                {recentOrders.length > 0 ? (
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.orderId}>
                                    <td>#{order.orderId}</td>
                                    <td>{order.user?.userName || 'N/A'}</td>
                                    <td>${order.totalAmount?.toFixed(2)}</td>
                                    <td className={`status ${order.status?.toLowerCase()}`}>{order.status}</td>
                                    <td>{new Date(order.createdAt || order.orderDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No orders found</div>
                )}
            </div>
        );
    };

    return (
        <div className="dashboard-container toy-theme">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    {icons.products} Toy Store Dashboard
                </h1>
                <div className="dashboard-welcome">
                    Admin Panel - Store Overview
                </div>
            </div>
            
            {isLoading ? (
                <div className="loading">
                    <div className="loading-icon">{icons.loading}</div>
                    <p>Loading data...</p>
                </div>
            ) : error ? (
                <div className="error-message">
                    <div className="error-icon">{icons.error}</div>
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    {/* Key metrics section - row layout */}
                    <div className="metrics-container">
                        <div className="metric-card users">
                            <div className="icon" style={{background: '#118AB2'}}>{icons.users}</div>
                            <h3>Users</h3>
                            <div className="metric-value">{userStats.totalUsers}</div>
                            <div className="metric-details">
                                <div>Customers: {userStats.totalCustomers}</div>
                                <div>Admins: {userStats.totalAdmins}</div>
                                <div>Active: {userStats.activeUsers}</div>
                            </div>
                        </div>
                        
                        <div className="metric-card products">
                            <div className="icon" style={{background: '#06D6A0'}}>{icons.products}</div>
                            <h3>Products</h3>
                            <div className="metric-value">{productStats.totalProducts}</div>
                            <div className="metric-details">
                                <div>Active: {productStats.activeProducts}</div>
                                <div>Out of Stock: {productStats.outOfStockProducts}</div>
                            </div>
                        </div>
                        
                        <div className="metric-card orders">
                            <div className="icon" style={{background: '#FFD166'}}>{icons.orders}</div>
                            <h3>Orders</h3>
                            <div className="metric-value">{orderStats.totalOrders}</div>
                            <div className="metric-details">
                                <div>Pending: {orderStats.pendingOrders}</div>
                                <div>Completed: {orderStats.completedOrders}</div>
                            </div>
                        </div>
                        
                        <div className="metric-card revenue">
                            <div className="icon" style={{background: '#FF6B6B'}}>{icons.revenue}</div>
                            <h3>Revenue</h3>
                            <div className="metric-value">${orderStats.totalRevenue.toFixed(2)}</div>
                            <div className="metric-details">
                                <div>Avg: ${(orderStats.totalRevenue / (orderStats.completedOrders || 1)).toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <div className="metric-card blindboxes">
                            <div className="icon" style={{background: '#4ECDC4'}}>{icons.blindboxes}</div>
                            <h3>Blindboxes</h3>
                            <div className="metric-value">{blindboxStats.totalBlindboxes}</div>
                            <div className="metric-details">
                                <div>Active: {blindboxStats.activeBlindboxes}</div>
                                <div>Out of Stock: {blindboxStats.outOfStockBlindboxes}</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick actions - simplified */}
                    <div className="quick-actions">
                        <h2>{icons.manage} Quick Actions</h2>
                        <div className="action-buttons">
                            <button className="action-btn" onClick={() => window.location.href = '/admin/products'}>
                                {icons.products} Products
                            </button>
                            <button className="action-btn" onClick={() => window.location.href = '/admin/orders'}>
                                {icons.view} Orders
                            </button>
                            <button className="action-btn" onClick={() => window.location.href = '/admin/users'}>
                                {icons.users} Users
                            </button>
                            <button className="action-btn" onClick={() => window.location.href = '/admin/blindboxes'}>
                                {icons.blindboxes} Blindboxes
                            </button>
                        </div>
                    </div>
                    
                    {/* Charts Section - optimized layout */}
                    <div className="charts-container">
                        {/* Sales Chart */}
                        <div className="chart-panel sales-chart">
                            <h3>
                                <span className="panel-icon">{icons.chart}</span>
                                Weekly Sales Performance
                            </h3>
                            <div className="chart-content">
                                <Line data={salesChartConfig.data} options={salesChartConfig.options} />
                            </div>
                        </div>

                        {/* Top Products Chart */}
                        <div className="chart-panel top-products-chart">
                            <h3>
                                <span className="panel-icon">{icons.hot}</span>
                                Top Selling Products
                            </h3>
                            <div className="chart-content">
                                <Bar data={topProductsChartConfig.data} options={topProductsChartConfig.options} />
                            </div>
                        </div>

                        <div className="small-charts-container">
                            {/* User Registration Chart */}
                            <div className="chart-panel user-chart">
                                <h3>
                                    <span className="panel-icon">{icons.trend}</span>
                                    User Registrations
                                </h3>
                                <div className="chart-content">
                                    <Bar data={userRegistrationChartConfig.data} options={userRegistrationChartConfig.options} />
                                </div>
                            </div>

                            {/* Category Distribution Chart */}
                            <div className="chart-panel category-chart">
                                <h3>
                                    <span className="panel-icon">{icons.category}</span>
                                    Product Categories
                                </h3>
                                <div className="chart-content">
                                    <Doughnut data={categoryChartConfig.data} options={categoryChartConfig.options} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recent activity section */}
                    <div className="recent-activity">
                        <RecentUsers users={users} />
                        <RecentOrders orders={orders} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;