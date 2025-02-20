import React from 'react';
import { Card, Col, Row, Button, Space, Input } from 'antd';
import { useState } from 'react';
import { Meta } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
const Products = () => {
  const totalProducts = 34;
  const [visibleProducts, setVisibleProducts] = useState(16);

  const handleViewMore = () => {
    setVisibleProducts((prev) =>
      prev >= totalProducts ? 16 : Math.min(prev + 12, totalProducts)
    );
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", padding: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Search
          placeholder="Search for products..."
          allowClear
          enterButton="Search"
          size="small"
          style={{ width: "50%" }}
        />
      </div>
      <Row justify="center" gutter={[16, 16]}>
        {Array.from({ length: visibleProducts }).map((_, index) => (
          <Col key={index} span={6}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={<img alt="example" src="" />}
            >
              <Meta title={`Product ${index + 1}`} description="Price" />
            </Card>
          </Col>
        ))}
      </Row>
      {visibleProducts >= totalProducts && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Space wrap>
            <Button type="primary" onClick={handleViewMore}>
              View Less
            </Button>
          </Space>
        </div>
      )}
      {visibleProducts < totalProducts && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Space wrap>
            <Button type="primary" onClick={handleViewMore}>
              View More
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
};

export default Products;
