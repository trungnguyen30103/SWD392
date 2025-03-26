import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // Mặc định, không có filter theo category

  useEffect(() => {
    // Fetch sản phẩm từ API hoặc dữ liệu giả lập
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo category
  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  return (
    <div className="category-container">
      <h1>Category Page</h1>

      {/* Dropdown cho category */}
      <div className="category-filter">
        <label htmlFor="category">Choose a category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home Appliances">Home Appliances</option>
          {/* Thêm các category khác nếu có */}
        </select>
      </div>

      <div className="products-list">
        {category
          ? filterProductsByCategory(category).map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Category;
