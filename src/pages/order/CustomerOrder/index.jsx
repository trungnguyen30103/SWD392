import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function OrderHistory({ customerId }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/${customerId}`);
        setOrders(response.data); // Dữ liệu đơn hàng
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Lưu danh sách sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [customerId]);

  const cancelOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/api/orders/${orderId}`);
        alert("Order canceled");
        setOrders(orders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error("Error canceling order:", error);
        alert("Failed to cancel order");
      }
    } else {
      alert("Order cancellation was canceled.");
    }
  };

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price per Item</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderProduct = products.find(
                (product) => product.id === order.productId
              );

              // Tính tổng giá của đơn hàng (số lượng * giá sản phẩm)
              const totalPrice = orderProduct
                ? orderProduct.price * order.quantity
                : 0;

              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {orderProduct ? (
                      <>
                        <img
                          src={orderProduct.image}
                          alt={orderProduct.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{orderProduct.title}</span>
                      </>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </td>
                  <td>{order.quantity}</td>
                  <td>${orderProduct ? orderProduct.price : "N/A"}</td>
                  <td>${totalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status === "Pending" && (
                      <button onClick={() => cancelOrder(order._id)}>
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
