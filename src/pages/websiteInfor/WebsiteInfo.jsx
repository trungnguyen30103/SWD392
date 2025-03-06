import React from 'react';
import './WebsiteInfo.css';

const WebsiteInfo = () => {
  return (
    <div className="info">
      <h1>About BlindBox</h1>
      <p>Learn more about our mission and how we bring joy to our customers.</p>
      
      <h2>How It Works</h2>
      <ul>
        <li><strong>Choose Your Blind Box</strong> – Browse through our collection of themed blind boxes.</li>
        <li><strong>Purchase & Wait for Delivery</strong> – Complete your order and let the anticipation build.</li>
        <li><strong>Unbox the Surprise</strong> – Receive your package and unveil your mystery items!</li>
      </ul>
      
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Excitement & Fun – Enjoy the thrill of surprise with every purchase.</li>
        <li>High-Quality Products – Our blind boxes contain premium and curated items.</li>
        <li>Exclusive Deals – Get limited edition and special products not available elsewhere.</li>
        <li>Customer Satisfaction – We value our customers and ensure the best service possible.</li>
      </ul>
      
      <h2>How to Buy</h2>
      <ol>
        <li>Sign Up / Log In – Create an account or log in to start shopping.</li>
        <li>Select Your Box – Choose a blind box that piques your interest.</li>
        <li>Make a Secure Payment – Complete your purchase with our trusted payment options.</li>
        <li>Track Your Order – Stay updated with real-time shipping details.</li>
        <li>Unbox & Enjoy!</li>
      </ol>
      
      <h2>Customer Reviews</h2>
      <p>Here’s what our happy customers have to say:</p>
      <blockquote>"I love the excitement of not knowing what I'll get! Highly recommend!"</blockquote>
      <blockquote>"Great quality products and fast delivery!"</blockquote>
      <blockquote>"Blindbox Web never disappoints. So much fun!"</blockquote>
      
      <h2>Policies & Support</h2>
      <ul>
        <li>Secure Payments – Multiple payment options with data encryption.</li>
        <li>Shipping & Returns – Transparent shipping policies and easy return processes.</li>
        <li>Customer Support – Need help? Contact us via live chat, email, or phone.</li>
      </ul>
      
      <h2>Connect With Us</h2>
      <p>Follow us on social media to stay updated on new releases and exclusive offers:</p>
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><strong>Facebook</strong></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><strong>Instagram</strong></a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><strong>Twitter</strong></a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><strong>YouTube</strong></a>
      </div>
      <p>For inquiries, reach out to us via our <strong>Contact Us</strong> page or email us at <strong>support@blindboxweb.com</strong>.</p>
    </div>
  );
};

export default WebsiteInfo;
