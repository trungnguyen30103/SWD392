// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./index.css";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="logooo">
          <Link to="/">
            <img src="blindbox-logo-footer.png" alt="logo" />
          </Link>
        </div>
        <div className="footer-section">
          <h2>POLICIES</h2>
          <br />
          <div className="social-icons">
            <Link to="/policy/shipping" style={linkStyle}>
              Shipping Policy
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/policy/privacy" rel="nofollow" style={linkStyle}>
              Privacy Policy
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/policy/return" rel="nofollow" style={linkStyle}>
              Return Policy
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/termsofuse" rel="nofollow" style={linkStyle}>
              Terms of Use
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h2>GUIDELINES</h2>
          <br />
          <div className="social-icons">
            <Link to="/how-to-make-a-purchase" rel="nofollow" style={linkStyle}>
              How to Make a Purchase
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/how-to-pay" rel="nofollow" style={linkStyle}>
              How to Pay
            </Link>
          </div>
          <div className="social-icons">
            <Link
              to="/how-to-receive-delivery"
              rel="nofollow"
              style={linkStyle}
            >
              How to Receive Delivery
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/service-terms" rel="nofollow" style={linkStyle}>
              Service Terms
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h2>FEATURED CATEGORIES</h2>
          <br />
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              {" "}
              {/*thêm api get all product */}
              All Products
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              {" "}
              {/*thêm api get blindbox */}
              Blindbox Series
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              Art Toys, Figure
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              Limited Edition
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              Display Box
            </Link>
          </div>
          <div className="social-icons">
            <Link to="/" rel="nofollow" style={linkStyle}>
              Baby Three
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h2>CONTACT US</h2>
          <br />
          <div className="hotline">
            <p>Hotline</p>
            <span>
              Ho Chi Minh Branch:{" "}
              <a href="tel:0916306945" rel="nofollow" style={linkStyle}>
                091 630 6945
              </a>{" "}
              ( Click 1)
            </span>
            <span>
              Feedback:{" "}
              <a href="tel:0123456890" rel="nofollow" style={linkStyle}>
                012 345 6780
              </a>{" "}
              (Click 2)
            </span>
            <p>Shop Location</p>
            <span>
              Ho Chi Minh Branch:{" "}
              <a
                href="https://www.google.com/maps/place/VNUHCM+Student+Cultural+House/@10.8751238,106.7981485,17z/data=!3m1!4b1!4m6!3m5!1s0x3174d8a6b19d6763:0x143c54525028b2e!8m2!3d10.8751238!4d106.8007234!16s%2Fg%2F11hd1pf9gj?entry=ttu"
                rel="nofollow"
                target="_blank"
                style={linkStyle}
              >
                Student Cultural House
              </a>
            </span>
            <div className="icon">
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="icon-con" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="icon-con" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="icon-con" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="icon-con" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © Copy right 2025 <strong>Blindbox</strong>.
        </p>
      </div>
    </div>
  );
};

export default Footer;
