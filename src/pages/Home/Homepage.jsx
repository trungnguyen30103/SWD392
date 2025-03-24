import React, { useState, useRef } from "react";
import "./Homepage.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import homepageMockData from "../../mock/Home";

const Homepage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [email, setEmail] = useState("");
  const categorySliderRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Use mock data
  const { categories, featuredProducts, banners, promo, productImages } = homepageMockData;

  // Limit categories to 7
  const displayCategories = categories.slice(0, 7);

  // Category slider navigation
  const scrollCategorySlider = (direction) => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categorySliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Generate background colors based on category name
  const getCategoryColor = (name) => {
    const colors = [
      '#FF4B8B', // Pink
      '#5E6AD2', // Primary Blue
      '#FFBC42', // Yellow
      '#4CAF50', // Green
      '#9C27B0', // Purple
      '#FF5722', // Orange
      '#2196F3', // Blue
    ];
    
    // Use the first letter of category name to determine color
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  // Get short description for category
  const getCategoryDescription = (category) => {
    // If the category has a description, use the first few words
    if (category.description) {
      const words = category.description.split(' ').slice(0, 3).join(' ');
      return words + (words.length < category.description.length ? '...' : '');
    }
    return '';
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto advance banner
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextBanner();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickView = (product) => {
    console.log(`Quick view product`, product);
    // Implement modal or quick view logic
  };

  const handleAddToCart = (product) => {
    console.log(`Add product to cart`, product);
    // Implement add to cart logic
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(`Subscribing email: ${email}`);
    // Implement newsletter subscription logic
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  // Get product images for a specific product
  const getProductImages = (productId) => {
    return productImages.filter(img => img.product_id === productId);
  };

  return (
    <div className="homepage">
      {/* Hero Banner Carousel */}
      <section className="hero-banner">
        <div className="banner-container">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`banner-slide ${index === currentBanner ? "active" : ""}`}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="banner-content">
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => (window.location.href = banner.link)}
                  className="banner-button"
                >
                  {banner.buttonText}
                </Button>
              </div>
            </div>
          ))}

          <button className="banner-nav prev" onClick={prevBanner}>
            <span className="sr-only">Previous</span>
            <i className="fas fa-chevron-left"></i>
          </button>

          <button className="banner-nav next" onClick={nextBanner}>
            <span className="sr-only">Next</span>
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentBanner ? "active" : ""}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop By Category</h2>
          <Link to="/categories" className="see-all">
            See All Categories
          </Link>
        </div>
        <div className="category-slider-container">
          <button 
            className="category-nav prev" 
            onClick={() => scrollCategorySlider('left')}
            aria-label="Previous categories"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="categories-slider" ref={categorySliderRef}>
            {displayCategories.map((category) => {
              const color = getCategoryColor(category.name);
              return (
                <Link
                  to={`/category/${category.id}`}
                  className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <h3>
                    {category.name}
                    <span>{getCategoryDescription(category)}</span>
                  </h3>
                  <div 
                    className="category-bg"
                    style={{ backgroundColor: color }}
                  ></div>
                </Link>
              );
            })}
          </div>
          
          <button 
            className="category-nav next" 
            onClick={() => scrollCategorySlider('right')}
            aria-label="Next categories"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Toys</h2>
          <Link to="/products" className="see-all">
            View All Toys
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              productImages={getProductImages(product.id)}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner" style={{
        backgroundColor: promo.backgroundColor,
        color: promo.textColor
      }}>
        <div className="promo-content">
          <h2>{promo.title}</h2>
          <p>{promo.description}</p>
          <Button
            variant="text"
            size="lg"
            onClick={() => (window.location.href = promo.link)}
            className="promo-button"
          >
            {promo.buttonText}
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Toy Club</h2>
          <p>
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            toy inspiration!
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
