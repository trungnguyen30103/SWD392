import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaInstagram,
} from "react-icons/fa"; // Import các icon từ react-icons
import "./index.css"; // Nếu bạn cần thêm CSS
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd"; // Sử dụng Dropdown từ antd

const Header = ({ quantity, setQuantity }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  // Nếu có token, người dùng đã đăng nhập
  }, []);

  const labubuItems = [
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Đông
        </div>
      ),
      key: "labubu-winter",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Hè
        </div>
      ),
      key: "labubu-summer",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Xuân
        </div>
      ),
      key: "labubu-spring",
    },
  ];

  const babethreeItems = [
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Đông
        </div>
      ),
      key: "babethree-winter",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Hè
        </div>
      ),
      key: "babethree-summer",
    },
    {
      label: (
        <div style={{ fontSize: "15px", padding: "5px 20px" }}>
          Bộ Sưu Tập Mùa Xuân
        </div>
      ),
      key: "babethree-spring",
    },
  ];

  const onClick = ({ key }) => {
    navigate(`${key}`);
  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    
    // Cập nhật trạng thái đăng nhập
    setIsLoggedIn(false);

    // Điều hướng người dùng về trang login
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
              {/* Nút Logout không có nền */}
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
              <Link to="/labubu-blindbox">Labubu BlindBox Series</Link>
            </Dropdown>
          </li>
          <li>
            <Dropdown
              overlay={<Menu items={babethreeItems} onClick={onClick} />}
              trigger={["hover"]}
            >
              <Link to="/babethree-blindbox">BabyThree BlindBox Series</Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/gacha-blindbox">Gacha Blindbox</Link>
          </li>
          <li>
            <Link to="/guidelines">Guidelines</Link>
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
