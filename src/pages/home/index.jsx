import { useState, useEffect } from "react";
import { Col, Row, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import Carousel from "../../component/Carousel";
import Container from "../../component/Container";
import axios from "axios";
import "./index.css";

function HomePage() {
  const [selectedKey, setSelectedKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [blindboxes, setBlindboxes] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMoreCount, setViewMoreCount] = useState(5);

  const menuItems = ["ALL ITEMS", "PRODUCTS", "BLINDBOXES"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, blindboxesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/blindboxes")
        ]);
        
        setProducts(productsRes.data.data);
        setBlindboxes(blindboxesRes.data.data);
        setCurrentItems([...productsRes.data.data, ...blindboxesRes.data.data].slice(0, 5));
      } catch (err) {
        setError("Failed to fetch items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (index) => {
    setSelectedKey(index);
    setViewMoreCount(5);
    
    let items = [];
    switch(index) {
      case 0: items = [...products, ...blindboxes]; break;
      case 1: items = [...products]; break;
      case 2: items = [...blindboxes]; break;
      default: items = [];
    }
    
    setCurrentItems(items.slice(0, 5));
  };

  const handleViewMore = () => {
    const nextCount = viewMoreCount + 5;
    setViewMoreCount(nextCount);
    
    let items = [];
    switch(selectedKey) {
      case 0: items = [...products, ...blindboxes]; break;
      case 1: items = [...products]; break;
      case 2: items = [...blindboxes]; break;
      default: items = [];
    }
    
    setCurrentItems(items.slice(0, nextCount));
  };

  return (
    <div className="homepage-wrapper">
      <Carousel className="carousel-section" />
      <Container>
        <Col span={24}>
          <div className="product-category">
            PRODUCT CATEGORY
            <span className="underline"></span>
          </div>
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

        {loading && (
          <div className="loading-message">
            <Spin size="large" />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="product-list">
          {currentItems.map((item, index) => (
            <div key={index} className="product-item">
              <img 
                src={item.imageUrl || (item.blindboxImages?.[0]?.imageUrl)}
                alt={item.productName || item.name}
                className="product-image"
              />
              <h3>{item.productName || item.name}</h3>
              <p className="product-price">${item.price}</p>
              <Link to={item.productID ? `/product/${item.productID}` : `/blindbox/${item.blindboxID}`}>
                <Button className="view-details-button">View Details</Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="view-more">
          <Button className="show-more-button" onClick={handleViewMore}>
            Show More
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;