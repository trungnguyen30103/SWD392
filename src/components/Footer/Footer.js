import React, { useState } from "react";
import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import { MdToys, MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the newsletter subscription
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path
            fill="#f8f9fa"
            fillOpacity="1"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-section company-info">
            <div className="footer-logo">
              <div className="logo-icon">
                <MdToys />
              </div>
              <div className="logo-name">
                <span className="logo-toy">Toy</span>
                <span className="logo-store">Store</span>
              </div>
            </div>
            <p className="company-description">
              Bringing joy to children and families since 2010 with quality toys
              that inspire imagination, learning, and fun.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <MdLocationOn /> <span>123 Toy Avenue, Playland, CA 90210</span>
              </div>
              <div className="contact-item">
                <MdPhone /> <span>(800) TOY-LAND</span>
              </div>
              <div className="contact-item">
                <MdEmail /> <span>hello@toystore.com</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Shop By Category</h3>
            <ul>
              <li>
                <a href="/category/educational">Educational Toys</a>
              </li>
              <li>
                <a href="/category/action-figures">Action Figures</a>
              </li>
              <li>
                <a href="/category/board-games">Board Games</a>
              </li>
              <li>
                <a href="/category/dolls">Dolls & Accessories</a>
              </li>
              <li>
                <a href="/category/outdoor">Outdoor Play</a>
              </li>
              <li>
                <a href="/category/baby">Baby & Toddler</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <a href="/help/faq">FAQs</a>
              </li>
              <li>
                <a href="/help/shipping">Shipping Info</a>
              </li>
              <li>
                <a href="/help/returns">Returns & Exchanges</a>
              </li>
              <li>
                <a href="/help/track-order">Track Order</a>
              </li>
              <li>
                <a href="/help/gift-cards">Gift Cards</a>
              </li>
              <li>
                <a href="/help/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li>
                <a href="/about/story">Our Story</a>
              </li>
              <li>
                <a href="/about/stores">Find a Store</a>
              </li>
              <li>
                <a href="/about/careers">Careers</a>
              </li>
              <li>
                <a href="/about/safety">Toy Safety</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/about/sustainability">Sustainability</a>
              </li>
            </ul>
          </div>

          <div className="footer-section newsletter">
            <h3>Join Our Mailing List</h3>
            <p>
              Be the first to hear about new toys, promotions and fun
              activities!
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="social-links">
              <a href="https://facebook.com" aria-label="Follow us on Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" aria-label="Follow us on Twitter">
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                aria-label="Subscribe to our YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://pinterest.com"
                aria-label="Follow us on Pinterest"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {new Date().getFullYear()} Toy Store. All rights
                reserved.
              </p>
            </div>
            <div className="payment-methods">
              <span>Secure Payments</span>
              <div className="payment-icons">
                <div className="payment-icon">Visa</div>
                <div className="payment-icon">MC</div>
                <div className="payment-icon">Amex</div>
                <div className="payment-icon">PayPal</div>
              </div>
            </div>
            <div className="legal-links">
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Use</a>
                </li>
                <li>
                  <a href="/accessibility">Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
