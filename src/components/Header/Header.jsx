import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.scss";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaChevronDown,
  FaPuzzlePiece,
  FaGift,
  FaNewspaper,
  FaPhoneAlt,
  FaRegUserCircle,
  FaSignOutAlt,
  FaLock,
  FaHistory,
} from "react-icons/fa";

const Header = () => {
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Mock user data - in a real app this would come from authentication context
  const user = {
    name: "Alex Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&auto=format&fit=crop&q=80",
  };

  // Mock categories with more realistic naming
  const categories = [
    "Đồ chơi giáo dục",
    "Đồ chơi ngoài trời",
    "Lego và xếp hình",
    "Búp bê và nhân vật",
    "Xe và phương tiện",
    "Board games",
  ];

  // Track window resize for responsive layout adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 850) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCategoryDropdown = (e) => {
    e.stopPropagation();
    setUserDropdownOpen(false);
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setCategoryDropdownOpen(false);
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setCategoryDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setCategoryDropdownOpen(false);
      setUserDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    // In a real app, you would call logout API or clear authentication state
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Stylized Text Logo */}
        <div className="header-logo">
          <Link to="/">
            <span className="logo-text">
              <FaPuzzlePiece className="logo-icon" />
              <span className="logo-name">
                <span className="logo-toy">Toy</span>
                <span className="logo-store">Store</span>
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle - Only render on smaller screens */}
        {windowWidth <= 850 && (
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FaBars />
          </div>
        )}

        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for toys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        {/* Navigation and Auth */}
        <div className={`header-nav-container ${mobileMenuOpen ? "open" : ""}`}>
          <nav className="header-nav">
            <ul>
              {/* Categories Dropdown */}
              <li className="dropdown">
                <button
                  onClick={toggleCategoryDropdown}
                  className="dropdown-toggle"
                >
                  <FaPuzzlePiece className="nav-icon" /> Danh mục{" "}
                  <FaChevronDown />
                </button>
                {categoryDropdownOpen && (
                  <ul className="dropdown-menu">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link to={`/products?category=${index}`}>{category}</Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/products">All Products</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/products?promotion=true">
                  <FaGift className="nav-icon" /> Khuyến mãi
                </Link>
              </li>
              <li>
                <Link to="/info">
                  <FaNewspaper className="nav-icon" /> Information
                </Link>
              </li>
              <li>
                <Link to="/info#contact">
                  <FaPhoneAlt className="nav-icon" /> Liên hệ
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            {/* Shopping Cart */}
            <div className="cart-icon">
              <Link to="/cart" className="cart-button">
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </div>

            {/* Authentication */}
            <div className="auth-section">
              {isLoggedIn ? (
                <div className="user-profile dropdown">
                  <div className="user-avatar" onClick={toggleUserDropdown}>
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  {userDropdownOpen && (
                    <ul className="dropdown-menu user-menu">
                      <li>
                        <Link to="/profile">
                          <FaRegUserCircle /> Hồ sơ
                        </Link>
                      </li>
                      <li>
                        <Link to="/history">
                          <FaHistory /> Đơn hàng
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>
                          <FaSignOutAlt /> Đăng xuất
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <button className="login-btn" onClick={handleLogin}>
                    Đăng nhập
                  </button>
                  <button className="register-btn" onClick={handleRegister}>
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;