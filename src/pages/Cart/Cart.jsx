import React, { useState, useEffect } from "react";
import { FaTrash, FaClipboardList, FaArrowLeft } from "react-icons/fa"; // Thêm biểu tượng quay lại
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";
import axios from "axios"; // Thêm axios để gọi API của bạn

function Cart({ cart, setCart }) {
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng trống ban đầu
  const [products, setProducts] = useState([]); // Danh sách sản phẩm để thêm vào giỏ hàng
  const navigate = useNavigate(); // Initialize useNavigate

  // Thay đổi API ở đây
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Gọi API của bạn để lấy danh sách sản phẩm
        const response = await axios.get("https://yourapi.com/products");
        setProducts(response.data); // Cập nhật state với dữ liệu từ API của bạn
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };

    fetchProducts(); // Gọi hàm fetch khi component mount
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Lưu giỏ hàng vào localStorage
    }
  }, [cartItems]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const newCartItems = [...cartItems];
    const existingProduct = newCartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      newCartItems.push({ ...product, quantity: 1 });
    }

    setCartItems(newCartItems);
    toast.success(`${product.title} has been added to your cart.`);
  };

  // Remove item from cart with confirmation
  const removeFromCart = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (confirmDelete) {
      try {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        toast.success("Item removed from cart.");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart.");
      }
    } else {
      toast.info("Item removal canceled.");
    }
  };

  // Update item quantity in cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Kiểm tra số lượng phải lớn hơn 0
    const product = cartItems.find((item) => item.id === productId);

    if (quantity > product.stock) {
      toast.error("Cannot exceed stock quantity!");
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items to proceed to checkout.");
      return;
    }
    toast.success("Proceeding to checkout...");
    navigate("/checkout"); // Navigate to the checkout page
  };

  // Handle Track Order
  const handleTrack = () => {
    navigate("/orders"); // Navigate to the orders page
  };

  return (
    <div className="cart-container">
      <ToastContainer />
      <h1>Your Cart</h1>

      {/* Nút quay lại cửa hàng luôn hiển thị */}
      <div>
        <button onClick={() => navigate("/products")} className="back-button">
          <FaArrowLeft /> Go back to shopping
        </button>
      </div>

      {/* Kiểm tra và hiển thị giỏ hàng nếu có sản phẩm */}
      {cartItems.length === 0 ? (
        <div>
          <p className="empty-cart">Your cart is empty.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toLocaleString("en-US")}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  <FaTrash /> {/* Thùng rác nhỏ */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="total-price">
        <h2>Total: ${totalPrice.toLocaleString("en-US")}</h2>
      </div>

      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>

      {/* Track order button */}
      <div className="track-order">
        <button className="track-order-button" onClick={handleTrack}>
          <FaClipboardList /> Track Your Order
        </button>
      </div>

      {/* Sản phẩm có sẵn để thêm vào giỏ hàng */}
      <div className="product-list">
        <h2>Products Available</h2>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
