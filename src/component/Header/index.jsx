import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaInstagram,
} from "react-icons/fa"; // Import icons from react-icons
import "./index.css"; // If you need additional CSS
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd"; // Use Dropdown from antd

const Header = ({ quantity, setQuantity }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If there is a token, the user is logged in
  }, []);

  const labubuItems = [
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Winter Collection
        </div>
      ),
      key: "labubu-winter",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Summer Collection
        </div>
      ),
      key: "labubu-summer",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Spring Collection
        </div>
      ),
      key: "labubu-spring",
    },
  ];

  const babethreeItems = [
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Winter Collection
        </div>
      ),
      key: "babethree-winter",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Summer Collection
        </div>
      ),
      key: "babethree-summer",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Spring Collection
        </div>
      ),
      key: "babethree-spring",
    },
  ];

  const onClick = ({ key }) => {
    navigate(`${key}`);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Update login status
    setIsLoggedIn(false);

    // Redirect user to the login page
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="left-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </a>
        </div>
        <div className="logo">
          <img src="blindbox-logo-header.jpg" alt="Logo" />
        </div>

        <div className="right-icons">
          {isLoggedIn ? (
            <div className="login-register">
              {/* Logout button without background */}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="login-register">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
          <input type="text" placeholder="Search..." />
          <a href="/cart">
            <FaShoppingCart size={20} />
          </a>
          <a href="/profile">
            <FaUser size={20} />
          </a>
        </div>
      </header>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Dropdown
              overlay={<Menu items={labubuItems} onClick={onClick} />}
              trigger={["hover"]}
            >
              <Link to="/products">Labubu BlindBox Series</Link>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              overlay={<Menu items={babethreeItems} onClick={onClick} />}
              trigger={["hover"]}
            >
              <Link to="/products">BabyThree BlindBox Series</Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/gacha-blindbox">Gacha Blindbox</Link>
          </li>
          <li>
            <Link to="/how-to-make-a-purchase">Guidelines</Link>
          </li>
          <li>
            <Link to="/info">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
