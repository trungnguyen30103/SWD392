/* eslint-disable react/prop-types */
import { Card, Col, Row, Skeleton } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function BlindboxProduct({ product, blindbox }) {
  const isBlindbox = Boolean(blindbox);
  const item = isBlindbox ? blindbox : product;
  const imageUrl = isBlindbox ? item.imageUrl : item.productImage[0]?.imageUrl;
  const id = isBlindbox ? item.blindboxID : item.productID;
  const title = isBlindbox ? item.blindboxName : item.productName;
  const totalPrice = isBlindbox ? item.totalPrice : item.totalPrice;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blindbox) {
      setLoading(false);
    }
  }, [blindbox]);

  const handleClick = async () => {
    if (isBlindbox) {
      navigate(`/blindbox-details/${id}`); // Chuyển đến chi tiết blindbox
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <Card
      onClick={handleClick}
      hoverable
      style={{
        width: 250,
      }}
      className="cart-product"
      cover={
        <div className="image-container">
          <img alt="Blindbox" src={imageUrl} className="product-image" />
          <div className="overlay">
            <button className="overlay-button">XEM CHI TIẾT</button>
          </div>
        </div>
      }
    >
      <Row style={{ height: "100px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <h5>{id}</h5>
        </Col>
        <Col
          span={24}
          style={{
            textAlign: "center",
            height: "60px",
            textTransform: "uppercase",
          }}
        >
          <h3 style={{ color: "#15393f" }}>{title}</h3>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <h4>
            {totalPrice.toLocaleString("vi-VN", {
              maximumFractionDigits: 0,
            })}{" "}
            đ
          </h4>
        </Col>
      </Row>
    </Card>
  );
}
