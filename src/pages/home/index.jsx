import { useState } from "react";
import { Col, Row, Button, Spin } from "antd";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import Carousel from "../../component/Carousel";
import Container from "../../component/Container";
import { getProducts } from "../../component/service/Uservies"; // Import hàm getProducts
import "./index.css";

function HomePage() {
  const [selectedKey, setSelectedKey] = useState(0); // Lưu trạng thái mục được chọn
  const [products, setProducts] = useState([]); // State lưu trữ tất cả sản phẩm
  const [currentProducts, setCurrentProducts] = useState([]); // State lưu trữ các sản phẩm đang hiển thị
  const [loading, setLoading] = useState(false); // State kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State lưu thông báo lỗi
  const [viewMoreCount, setViewMoreCount] = useState(5); // Số lượng sản phẩm đã tải, mặc định là 5 sản phẩm

  // Dữ liệu menu
  const menuItems = ["ALL PRODUCT", "BABY THREE", "LABUBU"];

  const handleClick = async (index) => {
    setSelectedKey(index); // Cập nhật mục được chọn
    let category = menuItems[index].toLowerCase().replace(" ", "_"); // Chuyển danh mục thành dạng phù hợp với API
    setLoading(true);
    try {
      const response = await getProducts(category); // Lấy sản phẩm từ API cho từng danh mục
      setProducts(response.data); // Cập nhật state với tất cả sản phẩm
      setCurrentProducts(response.data.slice(0, 5)); // Chỉ hiển thị 5 sản phẩm đầu tiên
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm để hiển thị thêm 5 sản phẩm
  const handleViewMore = () => {
    const nextProducts = products.slice(0, viewMoreCount + 5); // Lấy thêm 5 sản phẩm
    setViewMoreCount(viewMoreCount + 5);
    setCurrentProducts(nextProducts); // Cập nhật sản phẩm đang hiển thị
  };

  return (
    <div className="homepage-wrapper">
      <Carousel className="carousel-section" />
      <Container>
        <Col span={24}>
          <a href="/product" className="product-category">
            PRODUCT CATEGORY
            <span className="underline"></span>
          </a>
        </Col>

        <Row gutter={16} justify="center" className="menu-section">
          {menuItems.map((item, index) => (
            <Col key={index}>
              <Button
                className={`menu-button ${selectedKey === index ? "selected" : ""}`}
                onClick={() => handleClick(index)}
              >
                {item}
              </Button>
            </Col>
          ))}
        </Row>

        {/* Hiển thị thông báo loading và lỗi cho tất cả sản phẩm */}
        {loading && (
          <div className="loading-message">
            <Spin size="large" /> {/* Hiển thị vòng quay khi đang tải */}
            <p>Loading...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p> {/* Hiển thị thông báo lỗi */}
          </div>
        )}

        {/* Hiển thị sản phẩm */}
        <div className="product-list">
          {currentProducts.map((product, index) => (
            <div key={index} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>

        {/* Hiển thị nút View More */}
        <div className="view-more">
          <Link to="/products">
            <Button className="show-more-button">Show More</Button>
          </Link>
        </div>

        {/* Các mục khác trong menu */}
        <Col span={24}>
          <a href="/product" className="product-category">
            BABY THREE
            <span className="underline"></span>
          </a>
        </Col>

        {/* Hiển thị sản phẩm cho BABY THREE */}
        {loading && (
          <div className="loading-message">
            <Spin size="large" />
            <p>Loading Baby Three...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Hiển thị nút View More cho BABY THREE */}
        <div className="view-more">
          <Link to="/products">
            <Button className="show-more-button">Show More</Button>
          </Link>
        </div>

        {/* Hiển thị sản phẩm cho LABUBU */}
        <Col span={24}>
          <a href="/product" className="product-category">
            LABUBU
            <span className="underline"></span>
          </a>
        </Col>

        {loading && (
          <div className="loading-message">
            <Spin size="large" />
            <p>Loading Labubu...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Hiển thị nút View More cho LABUBU */}
        <div className="view-more">
          <Link to="/products">
            <Button className="show-more-button">Show More</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
