<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CustomerProduct.css";

function CustomerProduct() {
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm động
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const navigate = useNavigate();

  // Hàm fetch dữ liệu sản phẩm từ API (hoặc sử dụng mảng sản phẩm giả lập)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Cập nhật state với dữ liệu sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Gọi hàm fetch khi component mount
  }, []);

  // Hàm lọc sản phẩm dựa trên tên hoặc id
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)
  );

  // Thêm sản phẩm vào giỏ hàng
=======
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CustomerProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "BlindBox1",
      price: 500,
      stock: 10,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "BlindBox2",
      price: 200,
      stock: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "BlindBox3",
      price: 1000,
      stock: 0,
      img: "https://via.placeholder.com/150",
    },
  ]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

>>>>>>> minh
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

<<<<<<< HEAD
    const newCart = [...cart]; // Tạo bản sao của giỏ hàng hiện tại
    const existingProduct = newCart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity += 1;
        setCart(newCart); // Cập nhật giỏ hàng khi số lượng sản phẩm thay đổi
        alert("Item quantity increased in cart.");
      } else {
        alert("This item is already at maximum stock in your cart.");
      }
    } else {
      newCart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới vào giỏ hàng
      setCart(newCart); // Cập nhật lại giỏ hàng
      alert(`${product.title} has been added to your cart.`);
    }
  };

  // Điều hướng đến chi tiết sản phẩm
=======
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      alert("This item is already in your cart.");
      return;
    }

    setCart([...cart, product]);
    alert("Item added to cart.");
  };

>>>>>>> minh
  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

<<<<<<< HEAD
  // Điều hướng đến giỏ hàng
=======
>>>>>>> minh
  const handleCartClick = () => {
    navigate("/cart");
  };

<<<<<<< HEAD
  // Cập nhật từ khóa tìm kiếm
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Cập nhật từ khóa tìm kiếm
  };

  return (
    <div>
      <h1>Our Products</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Hiển thị thông báo nếu không có sản phẩm */}
      {filteredProducts.length === 0 && searchQuery && (
        <p>No products found matching "{searchQuery}"</p>
      )}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              className="product-img"
              src={product.image}
              alt={product.title}
            />
            <h3>{product.title}</h3>
=======
  return (
    <div>
      <h1>Our Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "20px" }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "150px", height: "150px" }}
            />
            <h3>{product.name}</h3>
>>>>>>> minh
            <p>Price: ${product.price}</p>
            {product.stock > 0 ? (
              <p>In Stock: {product.stock}</p>
            ) : (
              <p>Out of Stock</p>
            )}
<<<<<<< HEAD

            {/* Các nút nằm dưới cùng */}
            <div className="product-buttons">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button onClick={() => handleProductClick(product.id)}>
                View Details
              </button>
            </div>
=======
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
            <button onClick={() => handleProductClick(product.id)}>
              View Details
            </button>
>>>>>>> minh
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {/* Giỏ hàng */}
=======
>>>>>>> minh
      <div>
        <FaShoppingCart
          size={30}
          onClick={handleCartClick}
<<<<<<< HEAD
          className="cart-icon-container"
          style={{
            position: "fixed",
            top: "140px",
            right: "80px",
=======
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
>>>>>>> minh
            cursor: "pointer",
          }}
        />
        {cart.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "5px 10px",
              fontSize: "14px",
            }}
          >
<<<<<<< HEAD
            {cart.reduce((total, item) => total + item.quantity, 0)}
=======
            {cart.length}
>>>>>>> minh
          </span>
        )}
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default CustomerProduct;
=======
export default CustomerProductList;
>>>>>>> minh
