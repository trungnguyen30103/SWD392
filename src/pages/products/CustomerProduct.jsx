import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CustomerProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "BlindBox1",
      price: 500,
      stock: 10,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "BlindBox2",
      price: 200,
      stock: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "BlindBox3",
      price: 1000,
      stock: 0,
      img: "https://via.placeholder.com/150",
    },
  ]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      alert("This item is already in your cart.");
      return;
    }

    setCart([...cart, product]);
    alert("Item added to cart.");
  };

  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div>
      <h1>Our Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "20px" }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "150px", height: "150px" }}
            />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {product.stock > 0 ? (
              <p>In Stock: {product.stock}</p>
            ) : (
              <p>Out of Stock</p>
            )}
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
        ))}
      </div>

      <div>
        <FaShoppingCart
          size={30}
          onClick={handleCartClick}
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        />
        {cart.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "5px 10px",
              fontSize: "14px",
            }}
          >
            {cart.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default CustomerProductList;
