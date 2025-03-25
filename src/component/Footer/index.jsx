import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/shipping">Shipping & Returns</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={30} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-bottom">
        &copy; 2025 BlindBox. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
