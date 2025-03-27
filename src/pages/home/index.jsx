import { useState, useEffect } from "react";
import { Col, Row, Button, Spin } from "antd";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import Carousel from "../../component/Carousel";
import Container from "../../component/Container";
import { getProductsByCategory, getCategories } from "../../component/service/Uservies"; // Import các hàm API mới
import "./index.css";

function HomePage() {
  const [selectedKey, setSelectedKey] = useState(0); // Lưu trạng thái mục được chọn
  const [products, setProducts] = useState([]); // State lưu trữ tất cả sản phẩm
  const [currentProducts, setCurrentProducts] = useState([]); // State lưu trữ các sản phẩm đang hiển thị
  const [loading, setLoading] = useState(false); // State kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State lưu thông báo lỗi
  const [viewMoreCount, setViewMoreCount] = useState(5); // Số lượng sản phẩm đã tải, mặc định là 5 sản phẩm
  const [categories, setCategories] = useState([]); // State lưu trữ các danh mục sản phẩm

  // Dữ liệu menu
  const menuItems = ["ALL PRODUCT", "BABY THREE", "LABUBU"];

  // Hàm lấy danh mục sản phẩm từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // API lấy danh mục sản phẩm
        setCategories(response.data); // Cập nhật danh mục sản phẩm
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = async (index) => {
    setSelectedKey(index); // Cập nhật mục được chọn
    let category = menuItems[index].toLowerCase().replace(" ", "_"); // Chuyển danh mục thành dạng phù hợp với API
    setLoading(true);
    try {
      const response = await getProductsByCategory(category); // Lấy sản phẩm từ API cho từng danh mục
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
          <a href="/products" className="product-category">
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
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product.id}`}>
                <Button className="view-details-button">View Details</Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Hiển thị nút View More */}
        <div className="view-more">
          <Button className="show-more-button" onClick={handleViewMore}>
            Show More
          </Button>
        </div>

        {/* Hiển thị danh mục sản phẩm */}
        {categories.map((category, index) => (
          <div key={index}>
            <Col span={24}>
              <a href={`/products/${category.name}`} className="product-category">
                {category.name}
                <span className="underline"></span>
              </a>
            </Col>
            {loading && (
              <div className="loading-message">
                <Spin size="large" />
                <p>Loading {category.name}...</p>
              </div>
            )}
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {/* Hiển thị sản phẩm cho mỗi danh mục */}
            <div className="category-products">
              {products.filter(product => product.category === category.name).map((product, i) => (
                <div key={i} className="product-item">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/product/${product.id}`}>
                    <Button className="view-details-button">View Details</Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Hiển thị nút View More cho danh mục */}
            <div className="view-more">
              <Link to={`/products/${category.name}`}>
                <Button className="show-more-button">Show More</Button>
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default HomePage;
