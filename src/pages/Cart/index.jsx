import React, { useState, useEffect } from "react";
import { FaTrash, FaClipboardList, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const navigate = useNavigate();

  // Helper functions
  const getUserId = () => {
    return localStorage.getItem("userID") || 0;
  };

  const getCartId = () => {
    return cartItems.length > 0 ? cartItems[0].cartId : null;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - discount;
  };

  // API functions
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/carts/${getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:8080/api/carts/${getUserId()}/add/${product.productID}`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cartResponse = await axios.get(`http://localhost:8080/api/carts/${getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(cartResponse.data.cartItems);
      toast.success(`${product.productName} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (!confirmDelete) {
      toast.info("Item removal canceled.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/carts/${getUserId()}/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cartResponse = await axios.get(`http://localhost:8080/api/carts/${getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(cartResponse.data.cartItems);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/carts/${getUserId()}/update/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cartResponse = await axios.get(`http://localhost:8080/api/carts/${getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(cartResponse.data.cartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const applyVoucher = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/discounts/apply", {
        code: voucherCode,
        cartId: getCartId()
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      
      setDiscount(response.data.discountAmount);
      toast.success("Voucher applied successfully");
    } catch (error) {
      console.error("Error applying voucher:", error);
      toast.error("Invalid voucher code");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const orderResponse = await axios.post(
        "http://localhost:8080/api/orders",
        {
          items: cartItems.map(item => ({
            productId: item.product.productID,
            quantity: item.quantity,
            price: item.price
          })),
          total: calculateTotal(),
          discount: discount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/checkout/${orderResponse.data.orderId}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to proceed to checkout");
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading-spinner">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <ToastContainer />
      <h1>Your Cart</h1>

      <div>
        <button onClick={() => navigate("/products")} className="back-button">
          <FaArrowLeft /> Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingCart size={48} />
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/products")} className="browse-products-btn">
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <img
                  src={item.product.productImages?.[0]?.imageUrl || "/placeholder-product.jpg"}
                  alt={item.product.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product.productName}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product.productID, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.productID, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.productID)}
                    className="remove-button"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="voucher-section">
            <input
              type="text"
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button onClick={applyVoucher}>Apply Voucher</button>
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}

      <div className="track-order">
        <button className="track-order-button" onClick={() => navigate("/orders")}>
          <FaClipboardList /> Track Your Orders
        </button>
      </div>

      {products.length > 0 && (
        <div className="product-list">
          <h2>Recommended Products</h2>
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <div key={product.productID} className="product-card">
                <img
                  src={product.productImages?.[0]?.imageUrl || "/placeholder-product.jpg"}
                  alt={product.productName}
                  className="product-image"
                  onClick={() => navigate(`/productdetail/${product.productID}`)}
                />
                <h3>{product.productName}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;