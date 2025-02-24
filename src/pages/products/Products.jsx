/*import React, { useState } from "react";
import { Button, Card, Row, Col, Space, Input, Form } from "antd";

const { Meta } = Card;
const { Search } = Input;

const Products = () => {
  const [userRole, setUserRole] = useState("admin");
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: "15.000", image: "" },
    { id: 2, name: "Product 2", price: "15.000", image: "" },
    { id: 3, name: "Product 3", price: "15.000", image: "" },
  ]);

  const [visibleProducts, setVisibleProducts] = useState(3);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [searchProducts, setSearchProducts] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

  const handleViewMore = () => {
    setVisibleProducts((prev) =>
      prev >= products.length ? 3 : Math.min(prev + 3, products.length)
    );
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const newId = products.length + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({ name: "", price: "", image: "" });
  };
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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
          onChange={(e) => setSearchProducts(e.target.value)}
        />
      </div>
      {userRole === "admin" && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            style={{ width: "20%", marginRight: "10px" }}
          />
          <Input
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            style={{ width: "20%", marginRight: "10px" }}
          />
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      )}
      <Row justify="center" gutter={[16, 16]}>
        {products.slice(0, visibleProducts).map((product) => (
          <Col key={product.id} span={6}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt="Product"
                  src={product.image || "https://via.placeholder.com/150"}
                />
              }
            >
              <Meta title={product.name} description={product.price} />
            </Card>
          </Col>
        ))}
      </Row>

      {visibleProducts < products.length && (
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

export default Products;*/
