import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./index.css"; // Đảm bảo bạn tạo file CSS này

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [filter, setFilter] = useState("month");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState({
    revenue: [],
    orders: [],
    customers: [],
  });
  const [loading, setLoading] = useState(true);

  // Hàm gọi API để lấy dữ liệu
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("YOUR_API_ENDPOINT_HERE", {
        params: {
          filter,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });

      // Giả sử API trả về dữ liệu theo cấu trúc như sau:
      const { revenue, orders, customers } = response.data;

      setData({ revenue, orders, customers });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Hàm gọi lại API khi thay đổi filter hoặc ngày
  useEffect(() => {
    fetchData();
  }, [filter, startDate, endDate]);

  // Dữ liệu cho biểu đồ
  const chartDataRevenue = {
    labels: data.revenue.map((item) => item.date), // Giả sử mỗi mục trong `data.revenue` có thuộc tính `date`
    datasets: [
      {
        label: "Total Revenue",
        data: data.revenue.map((item) => item.amount), // Giả sử mỗi mục trong `data.revenue` có thuộc tính `amount`
        fill: false,
        backgroundColor: "#4F85F0",
        borderColor: "#4F85F0",
        tension: 0.1,
      },
    ],
  };

  const chartDataOrders = {
    labels: data.orders.map((item) => item.date),
    datasets: [
      {
        label: "Total Orders",
        data: data.orders.map((item) => item.count),
        fill: false,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  const chartDataCustomers = {
    labels: data.customers.map((item) => item.date),
    datasets: [
      {
        label: "Total Customers",
        data: data.customers.map((item) => item.count),
        fill: false,
        backgroundColor: "#FF6F61",
        borderColor: "#FF6F61",
        tension: 0.1,
      },
    ],
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Filter Section */}
      <div className="dashboard-filters">
        <select onChange={handleFilterChange} value={filter}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>

        {/* Date Range Pickers */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      {/* Dashboard Stats */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>
              {data.revenue.length
                ? `$${data.revenue[data.revenue.length - 1].amount}`
                : "$0"}
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>
              {data.orders.length
                ? data.orders[data.orders.length - 1].count
                : 0}
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p>
              {data.customers.length
                ? data.customers[data.customers.length - 1].count
                : 0}
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Total Revenue</h3>
          <Line data={chartDataRevenue} />
        </div>
        <div className="chart-container">
          <h3>Total Orders</h3>
          <Line data={chartDataOrders} />
        </div>
        <div className="chart-container">
          <h3>Total Customers</h3>
          <Line data={chartDataCustomers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
