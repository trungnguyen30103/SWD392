import React, { useState, useEffect } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

function CustomerProduct() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");

        console.log(response.data);

        setProducts(response.data.data); // Access the data array from the response
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart from the API when the component mounts or userId/token changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId || !token) {
        console.error("User not logged in");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/api/carts/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.statusCode === 200) {
          setCart(response.data.data.cartItems || []);
        } else {
          console.error("Failed to fetch cart:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId, token]);

  // Add product to cart via API
  const addToCart = async (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

    const newCart = [...cart];
    const existingProduct = newCart.find(
      (item) => item.productID === product.productID
    );

    if (!userId || !token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/carts/${userId}/add/${product.productID}`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.statusCode === 201) {
        // Refresh the cart after adding the product
        const cartResponse = await axios.get(
          `http://localhost:8080/api/carts/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (cartResponse.data.statusCode === 200) {
          setCart(cartResponse.data.data.cartItems || []);
          alert(`${product.productName} has been added to your cart.`);
        }
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productID.toString().includes(searchQuery)
  );

  return (
    <div className="customer-product-container">
      <div className="header-container">
        <h1>Our Products</h1>
        <div className="cart-icon-wrapper" onClick={handleCartClick}>
          <FaCartPlus className="cart-icon" />
          {cart.length > 0 && (
            <span className="cart-count">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {filteredProducts.length === 0 && searchQuery && (
        <p>No products found matching "{searchQuery}"</p>
      )}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.productID} className="product-card">
            <img
              className="product-img"
              src={product.productImages[0]?.imageUrl || ""}
              alt={product.productImages[0]?.altText || product.productName}
            />
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            {product.stock > 0 ? (
              <p>In Stock: {product.stock}</p>
            ) : (
              <p>Out of Stock</p>
            )}

            <div className="product-buttons">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button onClick={() => handleProductClick(product.productID)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scroll-to-top"
      >
        ↑
      </button>
    </div>
  );
}

export default CustomerProduct;
