import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useCart } from "../../context/CartContext";
import "./ProductCard.scss";

/**
 * @typedef {import('../../types/Product').Product} Product
 * @typedef {import('../../types/ProductImage').ProductImage} ProductImage
 * 
 * @param {Object} props
 * @param {Product} props.product - The product data
 * @param {ProductImage[]} [props.productImages] - Optional additional product images
 * @param {Function} [props.onQuickView] - Handler for quick view
 */
const ProductCard = ({
  product,
  productImages = [],
  onQuickView,
}) => {
  const { addToCart, isInCart } = useCart();
  
  // Get main image or fallback to product's imageUrl
  const mainImage = productImages.length > 0 
    ? productImages[0].image_url 
    : product.imageUrl;
  
  // Get image alt text or fallback to product name
  const imageAlt = productImages.length > 0 
    ? productImages[0].alt_text 
    : product.name;

  const handleQuickView = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (onQuickView) onQuickView(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    
    // Add product to cart with stock validation
    addToCart(product, 1, product.stock_quantity);
  };

  const productInCart = isInCart(product.id);

  return (
    <div className="product-card toy-theme">
      <div className="product-image">
        <img src={mainImage} alt={imageAlt} />
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="stock-badge">Only {product.stock_quantity} left!</div>
        )}
        {product.stock_quantity === 0 && (
          <div className="sold-out-badge">Sold Out</div>
        )}
        <div className="product-actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleQuickView}
            className="quick-view-btn"
          >
            Quick View
          </Button>
          <Button
            variant={productInCart ? "success" : "primary"}
            size="sm"
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={product.stock_quantity === 0}
          >
            {product.stock_quantity === 0 
              ? "Out of Stock" 
              : productInCart 
                ? "Add More" 
                : "Add to Cart"
            }
          </Button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-link">
          <span className="product-category">{product.category.name}</span>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-description">{product.description.substring(0, 60)}...</div>
          <div className="product-price">
            <span className="regular-price">${product.price.toFixed(2)}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
