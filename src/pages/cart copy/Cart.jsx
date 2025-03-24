import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";

function Cart({ cart, setCart }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Pseudo cart items for testing
  const pseudoCartItems = [
    {
      id: 1,
      name: "BlindBox1",
      price: 500,
      quantity: 2,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "BlindBox2",
      price: 200,
      quantity: 1,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "BlindBox3",
      price: 1000,
      quantity: 3,
      img: "https://via.placeholder.com/150",
    },
  ];

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items. Using pseudo cart items for testing.");
        setCartItems(pseudoCartItems); // Fallback to pseudo cart items
      }
    };
    fetchCartItems();
  }, []);

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      const updatedCart = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCart);
      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  // Update item quantity in cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity }
      );
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? response.data : item
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
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

  return (
    <div className="cart-container">
      <ToastContainer />
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
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
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="total-price">
        <h2>Total: ${totalPrice.toLocaleString("en-US")}</h2>
      </div>
      {/* Checkout Button */}
      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;