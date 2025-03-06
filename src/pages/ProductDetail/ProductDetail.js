import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaArrowLeft, 
  FaArrowRight, FaHeart, FaThumbsUp, FaRegThumbsUp, FaShare 
} from "react-icons/fa";
import "./ProductDetail.scss";
import { 
  getMockProductById, 
  getMockProductImagesById, 
  getMockReviewsById, 
  getMockDiscountById,
  getMockSimilarProducts,
  getMockRecommendedProducts,
} from "../../mock/ProductDetail";
import { useCart } from "../../context/CartContext";

/**
 * @typedef {import('../../types/Product').Product} Product
 * @typedef {import('../../types/Review').Review} Review
 * @typedef {import('../../types/ProductImage').ProductImage} ProductImage
 * @typedef {import('../../types/Discount').Discount} Discount
 */

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, updateQuantity, isInCart } = useCart();
  const [product, setProduct] = useState(/** @type {Product|null} */ (null));
  const [reviews, setReviews] = useState(/** @type {Review[]} */ ([]));
  const [images, setImages] = useState(/** @type {ProductImage[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [discount, setDiscount] = useState(/** @type {Discount|null} */ (null));
  const [similarProducts, setSimilarProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  // Refs for sliders
  const similarProductsRef = useRef(null);
  const recommendedProductsRef = useRef(null);

  useEffect(() => {
    // Using mock data instead of API calls
    const fetchMockData = () => {
      try {
        setLoading(true);
        
        // Short timeout to simulate loading
        setTimeout(() => {
          console.log(id)
          const mockProductId = parseInt(id || "2");
          
          // Get mock product data
          const productData = getMockProductById(mockProductId);
          if (!productData) {
            setError("Product not found");
            setLoading(false);
            return;
          }
          
          setProduct(productData);
          
          // Get mock product images
          const imagesData = getMockProductImagesById(mockProductId);
          setImages(imagesData);
          
          // Get mock product reviews
          const reviewsData = getMockReviewsById(mockProductId);
          setReviews(reviewsData);
          
          // Get mock discount if any
          const discountData = getMockDiscountById(mockProductId);
          setDiscount(discountData);
          
          // Get similar products
          const similarProductsData = getMockSimilarProducts(mockProductId);
          setSimilarProducts(similarProductsData);
          
          // Get recommended products
          const recommendedProductsData = getMockRecommendedProducts();
          setRecommendedProducts(recommendedProductsData);
          
          setLoading(false);
        }, 500); // 500ms delay to simulate network request
      } catch (err) {
        setError("Failed to load product data");
        setLoading(false);
      }
    };

    fetchMockData();
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
  }, [id]);

  // Slider navigation functions
  const scrollSimilarProducts = (direction) => {
    if (similarProductsRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      similarProductsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRecommendedProducts = (direction) => {
    if (recommendedProductsRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      recommendedProductsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

   // Get product images for a specific product
   const getProductImages = (productId) => {
    return getMockProductImagesById(productId);
  };

  const handleQuickView = (product) => {
    console.log(`Quick view product`, product);
    // Implement modal or quick view logic
  };

  // ... existing functions ...
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock_quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (isInCart(product.id)) {
      // If already in cart, just update quantity
      addToCart(product, quantity, product.stock_quantity);
    } else {
      // Otherwise add as new item
      addToCart(product, quantity, product.stock_quantity);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" style={{ "--i": i }} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="star half" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="star empty" />);
    }
    
    return stars;
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDiscountedPrice = () => {
    if (!product || !discount) return product?.price;
    return product.price - (product.price * discount.percentage / 100);
  };

  // New function to format price
  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : '$0.00';
  };

  // // Product Card component for similar and recommended products
  // const ProductCard = ({ product }) => {
  //   const discountPercentage = product.originalPrice ? 
  //     Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
  //   return (
  //     <div className="product-card">
  //       <div className="product-card-image">
  //         <img src={product.imageUrl} alt={product.name} />
  //         {discountPercentage > 0 && (
  //           <div className="discount-tag">{discountPercentage}% OFF</div>
  //         )}
  //         <div className="quick-view-button">
  //           <Link to={`/product/${product.id}`}>
  //             <button>Quick View</button>
  //           </Link>
  //         </div>
  //       </div>
  //       <div className="product-card-content">
  //         <span className="product-card-category">{product.category?.name}</span>
  //         <h3 className="product-card-title">{product.name}</h3>
  //         <div className="product-card-rating">
  //           {renderStars(product.rating || 4.5)}
  //           <span className="rating-count">({product.reviewCount || 0})</span>
  //         </div>
  //         <div className="product-card-price">
  //           <span className="current-price">{formatPrice(product.price)}</span>
  //           {product.originalPrice && (
  //             <span className="original-price">{formatPrice(product.originalPrice)}</span>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="error-message">{error || "Product not found"}</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-image-section">
          <div className="product-image-carousel">
            <button className="carousel-button prev" onClick={prevImage}>
              <FaArrowLeft />
            </button>
            
            {images && images.length > 0 ? (
              <img 
                src={images[activeImageIndex]?.image_url || product.imageUrl} 
                alt={images[activeImageIndex]?.alt_text || product.name} 
                className="product-image"
              />
            ) : (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
              />
            )}
            
            <button className="carousel-button next" onClick={nextImage}>
              <FaArrowRight />
            </button>
          </div>
          
          {images && images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <img 
                  key={image.id} 
                  src={image.image_url} 
                  alt={image.alt_text} 
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info-section">
          <div className="product-category">{product.category?.name}</div>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            {renderStars(calculateAverageRating())}
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
          
          <div className="product-price-section">
            {discount ? (
              <>
                <span className="product-original-price">${product.price.toFixed(2)}</span>
                <span className="product-price discounted">${calculateDiscountedPrice().toFixed(2)}</span>
                <span className="discount-badge">Save {discount.percentage}%</span>
              </>
            ) : (
              <span className="product-price">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="stock-info">
            <span className={`stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity} available)` : 'Out of Stock'}
            </span>
          </div>
          
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="quantity-button"
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock_quantity} 
                value={quantity} 
                onChange={handleQuantityChange} 
                className="quantity-input"
              />
              <button 
                onClick={() => quantity < product.stock_quantity && setQuantity(quantity + 1)}
                disabled={quantity >= product.stock_quantity}
                className="quantity-button"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart} 
              disabled={product.stock_quantity === 0}
              className="add-to-cart-button"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
          
          {/* Product Features */}
          <div className="product-features">
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span className="feature-text">Free shipping on orders over $50</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span className="feature-text">30-day easy returns</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span className="feature-text">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      <div className="product-additional-sections">
        <div className="section-header">
          <h2>Similar Products</h2>
          <Link to="/products" className="see-all">View All</Link>
        </div>
        
        <div className="products-slider-container">
          <button 
            className="slider-nav prev" 
            onClick={() => scrollSimilarProducts('left')}
            aria-label="Previous similar products"
          >
            <FaArrowLeft />
          </button>
          
          <div className="products-slider" ref={similarProductsRef}>
            {similarProducts.map(product => (
              <ProductCard
              key={product.id}
              product={product}
              productImages={getProductImages(product.id)}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
            ))}
          </div>
          
          <button 
            className="slider-nav next" 
            onClick={() => scrollSimilarProducts('right')}
            aria-label="Next similar products"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      
      {/* Product Reviews Section */}
      <div className="product-reviews-section">
        <div className="section-header">
          <h2>Customer Reviews</h2>
          <button className="add-review-button">Write a Review</button>
        </div>
        
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
            <button className="add-review-button">Write a Review</button>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div>
                    <div className="reviewer-name">{review.user_name}</div>
                    <div className="review-stars">{renderStars(review.rating)}</div>
                  </div>
                  <span className="review-date">{formatDate(review.created_at)}</span>
                </div>
                <p className="review-text">{review.review_text}</p>
                <div className="review-actions">
                  <button><FaRegThumbsUp /> Helpful</button>
                  <button><FaShare /> Share</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* You May Also Like Section */}
      <div className="product-additional-sections">
        <div className="section-header">
          <h2>You May Also Like</h2>
          <Link to="/products" className="see-all">View All</Link>
        </div>
        
        <div className="products-slider-container">
          <button 
            className="slider-nav prev" 
            onClick={() => scrollRecommendedProducts('left')}
            aria-label="Previous recommended products"
          >
            <FaArrowLeft />
          </button>
          
          <div className="products-slider" ref={recommendedProductsRef}>
            {recommendedProducts.map(product => (
              <ProductCard
              key={product.id}
              product={product}
              productImages={getProductImages(product.id)}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
            ))}
          </div>
          
          <button 
            className="slider-nav next" 
            onClick={() => scrollRecommendedProducts('right')}
            aria-label="Next recommended products"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;