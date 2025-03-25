// ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct({
          ...response.data,
          stock: response.data.rating.count,
          series: "Crying Again Series", // Example additional field
          material: "Vinyl", // Example additional field
          dimensions: "20cm tall", // Example additional field
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    // Add your cart logic here
    alert(`${product.title} x${quantity} added to cart!`);
  };

  const handleBack = () => navigate(-1);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!product) return <div className="error-container">Product not found</div>;

  return (
    <div className="product-detail-container">
      <button onClick={handleBack} className="back-button">
        <FaArrowLeft /> Continue Shopping
      </button>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-meta">
            <span className="product-series">{product.series}</span>
            <span className="product-stock">
              {product.stock > 0 ? "In Stock" : "Pre-order"}
            </span>
          </div>

          <div className="price-container">
            <span className="price">${product.price}</span>
          </div>

          <div className="product-specs">
            <div className="spec-item">
              <span className="spec-label">Material:</span>
              <span className="spec-value">{product.material}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions:</span>
              <span className="spec-value">{product.dimensions}</span>
            </div>
          </div>

          <div className="quantity-selector">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(product.stock, e.target.value))
                )
              }
            />
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity === product.stock}
            >
              +
            </button>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={addToCart}
            disabled={product.stock <= 0}
          >
            <FaShoppingCart /> Add to Cart
          </button>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
