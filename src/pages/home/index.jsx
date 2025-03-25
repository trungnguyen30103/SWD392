import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Đảm bảo bạn có file CSS riêng

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Lưu chỉ số của ảnh hiện tại
  const [products, setProducts] = useState([]); // Sản phẩm từ API
  const images = [
    "https://cdn-media.sforum.vn/storage/app/media/anh-dep-59.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg",
  ]; // Danh sách ảnh

  // Hàm thay đổi ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Mỗi 5 giây chuyển ảnh
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, []);

  // Lấy 5 sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Lấy 5 sản phẩm đầu tiên
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts(); // Gọi hàm tải sản phẩm khi component mount
  }, []);

  // Hàm chuyển ảnh khi nhấn mũi tên trái hoặc phải
  const changeImage = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="home">
      {/* Hero Section với carousel */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Welcome to BlindBox!</h1>
          <p>Discover the joy of surprise with our exclusive blindbox toys.</p>
          <button className="cta-button" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>

        {/* Carousel Background Image */}
        <div className="carousel-container">
          <img
            src={images[currentImageIndex]}
            alt="Background"
            className="carousel-image"
          />
          <button
            className="carousel-arrow left"
            onClick={() => changeImage("left")}
          >
            &lt;
          </button>
          <button
            className="carousel-arrow right"
            onClick={() => changeImage("right")}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content */}
      <div className="about-us">
        <h2>More About Us</h2>
        <p>
          At BlindBox, we are passionate about delivering unique and exciting
          experiences. Our blindbox toys are carefully curated to bring joy and
          surprise to every customer. Explore our collection and discover
          something new today!
        </p>
      </div>
    </div>
  );
};

export default Home;
