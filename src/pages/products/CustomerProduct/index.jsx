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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products", {
          withCredentials: true
        });

        console.log(response.data)
   
        // setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)
  );

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

    const newCart = [...cart];
    const existingProduct = newCart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity += 1;
        setCart(newCart);
        alert("Item quantity increased in cart.");
      } else {
        alert("This item is already at maximum stock in your cart.");
      }
    } else {
      newCart.push({ ...product, quantity: 1 });
      setCart(newCart);
      alert(`${product.title} has been added to your cart.`);
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
          <div key={product.id} className="product-card">
            <img
              className="product-img"
              src={product.image}
              alt={product.title}
            />
            <h3>{product.title}</h3>
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
              <button onClick={() => handleProductClick(product.id)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="scroll-to-top"
      >
        ↑
      </button>
    </div>
  );
}

export default CustomerProduct;