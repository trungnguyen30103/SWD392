import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState('https://via.placeholder.com/1200x400'); // Default placeholder
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '10.00', imageUrl: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Product 2', price: '15.00', imageUrl: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Product 3', price: '20.00', imageUrl: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Product 4', price: '25.00', imageUrl: 'https://via.placeholder.com/200' },
  ]); // Default placeholder products
  const [reviews, setReviews] = useState([]); // State for reviews

  useEffect(() => {
    // Fetch hero image (to be integrated later)
    axios.get('/api/hero-image') // Replace with actual API endpoint
      .then(response => setHeroImage(response.data.imageUrl))
      .catch(error => console.error('Error fetching hero image:', error));

    // Fetch featured products (to be integrated later)
    axios.get('/api/featured-products') // Replace with actual API endpoint
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch customer reviews (pseudo API call)
    axios.get('/api/reviews') // Replace with actual API endpoint
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Welcome to BlindBox!</h1>
          <p>Discover the joy of surprise with our exclusive blindbox toys.</p>
          <button className="cta-button" onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews">
        <h2>What Our Customers Say</h2>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <p>{review.text}</p>
              <span>- {review.author}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content to Lengthen the Page */}
      <div className="additional-content">
        <h2>More About Us</h2>
        <p>
          At BlindBox, we are passionate about delivering unique and exciting experiences. Our blindbox toys are carefully curated to bring joy and surprise to every customer. Explore our collection and discover something new today!
        </p>
      </div>
    </div>
  );
};

export default Home;