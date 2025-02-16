import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to BlindBox!</h1>
          <p>Discover the joy of surprise with our exclusive blindbox toys.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$10.00</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$15.00</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$20.00</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Product 4" />
            <h3>Product 4</h3>
            <p>$25.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;