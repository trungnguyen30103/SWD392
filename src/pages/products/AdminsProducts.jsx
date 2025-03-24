<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa"; // Import icon Track Order
import { useNavigate } from "react-router-dom";
import "./AdminsProduct.css";

// Tạo một hàm chung để gọi API
const fetchApi = async (url, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("API request failed");
  }
};

function AdminProductList() {
  const navigate = useNavigate(); // Để điều hướng trang
  const [products, setProducts] = useState([]);
=======
import React, { useState } from "react";

function AdminProductList() {
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
>>>>>>> minh
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
<<<<<<< HEAD
    productDetail: "",
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // Track product to be edited

  // Fetch data từ API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchApi("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (error) {
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Function to navigate to Admin Orders Page
  const handleTrackOrders = () => {
    navigate("/admin/orders"); // Navigate to admin orders page
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    const newProductWithId = {
      ...newProduct,
      id: Date.now(),
    };
    try {
      const data = await fetchApi("https://fakestoreapi.com/products", "POST", {
        title: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.productDetail,
        image: newProduct.img,
        category: "electronics",
        rating: { rate: 0, count: 0 },
      });
      setProducts([...products, { ...data, id: newProductWithId.id }]);
      alert("Product added successfully.");
      setShowForm(false); // Hide form after adding product
    } catch (error) {
      alert("Failed to add product");
    }
  };

  // Cập nhật sản phẩm
  const handleUpdateProduct = async () => {
    const updatedProduct = products.find(
      (product) => product.id === editingProductId
    );

    // Cập nhật các thuộc tính của sản phẩm từ input
    updatedProduct.title = newProduct.name;
    updatedProduct.price = parseFloat(newProduct.price);
    updatedProduct.description = newProduct.productDetail;
    updatedProduct.image = newProduct.img;
    updatedProduct.rating.count = parseInt(newProduct.stock);

    try {
      // Gửi yêu cầu PUT để cập nhật sản phẩm trên server
      await fetchApi(
        `https://fakestoreapi.com/products/${editingProductId}`,
        "PUT",
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === editingProductId ? updatedProduct : product
        )
      );
      alert("Product updated successfully."); // Giữ một thông báo duy nhất khi cập nhật thành công
      setShowForm(false);
      setEditingProductId(null); // Reset editing state
    } catch (error) {
      alert("Failed to update product");
    }
  };

  // Chỉnh sửa thông tin sản phẩm
  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct({
      name: productToEdit.title,
      price: productToEdit.price,
      stock: productToEdit.rating.count,
      img: productToEdit.image,
      productDetail: productToEdit.description,
    });
    setEditingProductId(id); // Set product to be edited
    setShowForm(true); // Show form for editing
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await fetchApi(`https://fakestoreapi.com/products/${id}`, "DELETE");
        setProducts(products.filter((product) => product.id !== id));
        alert("Product deleted.");
      } catch (error) {
        alert("Failed to delete product");
      }
    }
=======
  });

  const handleAddProduct = () => {
    const newProductWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, newProductWithId]);
    alert("Product added successfully.");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert("Product deleted.");
  };

  const handleUpdateProduct = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, price: product.price + 10 } // Sample update
        : product
    );
    setProducts(updatedProducts);
    alert("Product updated.");
>>>>>>> minh
  };

  return (
    <div>
      <h1>Admin Product Management</h1>
<<<<<<< HEAD

      {/* Nút để hiển thị form thêm hoặc chỉnh sửa sản phẩm */}
      <button
        className="add-product-btn"
        onClick={() => {
          setShowForm(!showForm);
          setEditingProductId(null); // Reset when switching between add and edit
        }}
      >
        {showForm ? "Cancel" : "Add New Product"}
      </button>

      {/* Nút theo dõi đơn hàng nằm ở góc phải */}
      <button
        className="track-orders-btn"
        onClick={handleTrackOrders} // Gọi hàm handleTrackOrders khi nhấn nút
        style={{
          position: "absolute",
          top: "135px",
          right: "80px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <FaClipboardList /> {/* Thêm icon vào nút */}
        Track Orders
      </button>

      {/* Hiển thị form khi showForm là true */}
      {showForm && (
        <div className="add-product-form">
          <input
            className="input-field"
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="input-field"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            className="input-field"
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <input
            className="input-field"
            type="text"
            placeholder="Image URL"
            value={newProduct.img}
            onChange={(e) =>
              setNewProduct({ ...newProduct, img: e.target.value })
            }
          />
          <textarea
            className="input-field"
            placeholder="Product Details"
            value={newProduct.productDetail}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productDetail: e.target.value })
            }
          />
          <button
            className="submit-btn"
            onClick={editingProductId ? handleUpdateProduct : handleAddProduct}
          >
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </div>
      )}

      {/* Hiển thị thông báo khi đang tải sản phẩm */}
      {loading && <p>Loading products...</p>}

      {/* Hiển thị danh sách sản phẩm */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              className="product-img"
              src={product.image}
              alt={product.title}
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Price: {product.price} VNĐ</p>
            <p className="product-stock">Stock: {product.rating.count}</p>
            <p className="product-description">
              Product Details: {product.description}
            </p>
            <div className="product-buttons">
              <button
                className="edit-button"
                onClick={() => handleEditProduct(product.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
=======
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) =>
            setNewProduct({ ...newProduct, img: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleUpdateProduct(product.id)}>
              Update
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
>>>>>>> minh
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
