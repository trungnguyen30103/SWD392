import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft, FaArrowUp } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );
        if (response.data.success) {
          setProduct({
            ...response.data.data,
            series: "Crying Again Series",
            material: "Vinyl",
            dimensions: "20cm tall",
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = () => {
    alert(`${product.productName} x${quantity} added to cart!`);
  };

  const handleBack = () => navigate(-1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!product) return <div className="error-container">Product not found</div>;

  return (
    <div className="product-detail-container">
      <button onClick={handleBack} className="back-button">
        <FaArrowLeft /> Continue Shopping
      </button>

      {showScrollButton && (
        <button 
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.productImages[selectedImage]?.imageUrl} 
              alt={product.productImages[selectedImage]?.altText || product.productName} 
            />
          </div>
          {product.productImages.length > 1 && (
            <div className="thumbnail-container">
              {product.productImages.map((image, index) => (
                <img
                  key={image.productImageID}
                  src={image.imageUrl}
                  alt={image.altText}
                  className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.productName}</h1>
          <div className="product-meta">
            <span className="product-series">{product.series}</span>
            <span className="product-stock">
              {product.stock > 0 ? "In Stock" : "Pre-order"}
            </span>
            <span className="product-status">{product.status}</span>
          </div>

          <div className="price-container">
            <span className="price">${product.price.toFixed(2)}</span>
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
                  Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1))
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
            disabled={product.stock <= 0 || product.status !== "ACTIVE"}
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