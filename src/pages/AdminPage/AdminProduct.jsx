import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminProduct.css";

function AdminProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    categoryID: "",
    status: "ACTIVE"
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/categories") // Assuming you have a categories endpoint
        ]);
        setProducts(productsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.productName.trim()) newErrors.productName = "Name is required";
    if (!newProduct.description.trim()) newErrors.description = "Description is required";
    if (isNaN(newProduct.price) || newProduct.price <= 0) newErrors.price = "Valid price required";
    if (isNaN(newProduct.stock) || newProduct.stock < 0) newErrors.stock = "Valid stock required";
    if (!newProduct.categoryID) newErrors.categoryID = "Category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;
    
    try {
      const response = await axios.post("/api/products", {
        ...newProduct,
        category: { categoryID: newProduct.categoryID }
      });
      setProducts([...products, response.data.data]);
      resetForm();
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  const handleUpdateProduct = async () => {
    if (!validateForm()) return;
    
    try {
      const response = await axios.put(`/api/products/${editingId}`, {
        ...newProduct,
        category: { categoryID: newProduct.categoryID }
      });
      setProducts(products.map(p => p.productID === editingId ? response.data.data : p));
      resetForm();
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productID) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await axios.delete(`/api/products/${productID}`);
      setProducts(products.filter(p => p.productID !== productID));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product.productID);
    setNewProduct({
      productName: product.productName,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryID: product.category?.categoryID || "",
      status: product.status
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setNewProduct({
      productName: "",
      description: "",
      price: "",
      stock: "",
      categoryID: "",
      status: "ACTIVE"
    });
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  return (
    <div className="admin-product-container">
      <div className="header-section">
        <h1>Product Management</h1>
        <button className="track-orders-btn" onClick={() => navigate("/admin/orders")}>
          <FaClipboardList />
          Track Orders
        </button>
      </div>

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Product"}
      </button>

      {showForm && (
        <div className="product-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              value={newProduct.productName}
              onChange={e => setNewProduct({...newProduct, productName: e.target.value})}
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
              />
              {errors.stock && <span className="error">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newProduct.categoryID}
                onChange={e => setNewProduct({...newProduct, categoryID: e.target.value})}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryID && <span className="error">{errors.categoryID}</span>}
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                value={newProduct.status}
                onChange={e => setNewProduct({...newProduct, status: e.target.value})}
              >
                <option value="ACTIVE">Active</option>
                <option value="DISABLE">Disabled</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="submit-btn" onClick={editingId ? handleUpdateProduct : handleAddProduct}>
              {editingId ? "Update Product" : "Add Product"}
            </button>
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.productID} className="product-card">
              <div className="card-header">
                <h3>{product.productName}</h3>
                <span className={`status ${product.status.toLowerCase().replace('_', '-')}`}>
                  {product.status}
                </span>
              </div>
              <p className="description">{product.description}</p>
              <div className="details">
                <div className="detail-item">
                  <span>Price:</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="detail-item">
                  <span>Stock:</span>
                  <span>{product.stock}</span>
                </div>
                <div className="detail-item">
                  <span>Category:</span>
                  <span>{product.category?.categoryName || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span>Created:</span>
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                {product.lastUpdated && (
                  <div className="detail-item">
                    <span>Updated:</span>
                    <span>{new Date(product.lastUpdated).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.productID)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductList;