import React from "react";
import "./index.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const WebsiteInfo = () => {
  return (
    <div className="website-info">
      <h1 className="website-info-title">About BlindBox</h1>
      <p className="website-info-description">
        Learn more about our mission and how we bring joy to our customers.
      </p>

      <h2 className="website-info-heading">How it Works</h2>
      <ul className="website-info-list">
        <li>
          <strong>Choose your Blind Box</strong> – Browse our collection of
          themed blind boxes.
        </li>
        <li>
          <strong>Purchase and wait for delivery</strong> – Complete your order
          and enjoy the anticipation.
        </li>
        <li>
          <strong>Unbox and discover the surprise</strong> – Receive your
          package and discover the mystery items!
        </li>
      </ul>

      <h2 className="website-info-heading">Why Choose Us?</h2>
      <ul className="website-info-list">
        <li>
          Fun & Excitement – Enjoy the thrill of surprises with every purchase.
        </li>
        <li>
          High-quality products – Our blind boxes contain carefully selected,
          high-quality products.
        </li>
        <li>
          Exclusive offers – Get limited edition and special products not
          available elsewhere.
        </li>
        <li>
          Customer satisfaction – We value our customers and are committed to
          providing the best service.
        </li>
      </ul>

      <h2 className="website-info-heading">How to Buy</h2>
      <ol className="website-info-steps">
        <li>
          Register / Log in – Create an account or log in to start shopping.
        </li>
        <li>
          Choose your box – Pick a blind box according to your preferences.
        </li>
        <li>
          Secure payment – Complete the payment with our trusted payment
          methods.
        </li>
        <li>Track your order – Get real-time shipping updates.</li>
        <li>Unbox and enjoy!</li>
      </ol>

      <h2 className="website-info-heading">Customer Reviews</h2>
      <p className="website-info-review">
        "I love the feeling of not knowing what I'll get! Definitely worth
        trying!"
      </p>
      <p className="website-info-review">
        "Quality products and fast delivery!"
      </p>
      <p className="website-info-review">
        "BlindBox Web has never disappointed me. It's a joy to be a part of!"
      </p>

      <h2 className="website-info-heading">Policies & Support</h2>
      <ul className="website-info-list">
        <li>Secure payments – Multiple payment methods with high security.</li>
        <li>
          Shipping & Returns – Transparent shipping policies and easy return
          processes.
        </li>
        <li>
          Customer support – Need help? Contact us via live chat, email, or
          phone.
        </li>
      </ul>

      <h2 className="website-info-heading">Contact Us</h2>
      <p className="website-info-contact">Follow us on social media:</p>
      <div className="social-links">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={30} />
        </a>
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={30} />
        </a>
      </div>
      <p className="website-info-contact">
        For inquiries, please email us at{" "}
        <strong>support@blindboxweb.com</strong>.
      </p>
    </div>
  );
};

export default WebsiteInfo;
