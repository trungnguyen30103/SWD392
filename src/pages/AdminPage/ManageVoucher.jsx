import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isAfter, isBefore } from "date-fns";
import "./ManageVoucher.css";

const ManageVoucher = () => {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    discountPercentage: "",
    valid_from: "",
    valid_until: "",
    status: "ACTIVE",
    blindBoxId: null,
    productId: null
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [blindBoxes, setBlindBoxes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discountsRes, productsRes, blindBoxesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/discounts"),
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/blindboxes")
        ]);
        
        setDiscounts(discountsRes.data);
        setProducts(productsRes.data.data);
        setBlindBoxes(blindBoxesRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const validateDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();

    // Validate discount percentage
    if (
      !newDiscount.discountPercentage ||
      isNaN(newDiscount.discountPercentage) ||
      newDiscount.discountPercentage <= 0 ||
      newDiscount.discountPercentage > 100
    ) {
      newErrors.discountPercentage = "Please enter a valid percentage (1-100)";
    }

    // Validate dates
    if (!newDiscount.valid_from || !validateDate(newDiscount.valid_from)) {
      newErrors.valid_from = "Please enter a valid start date";
    }

    if (!newDiscount.valid_until || !validateDate(newDiscount.valid_until)) {
      newErrors.valid_until = "Please enter a valid end date";
    }

    // Validate at least one of blindBoxId or productId is provided
    if (!newDiscount.blindBoxId && !newDiscount.productId) {
      newErrors.applicableTo = "Please select either a product or blind box";
    }

    // Validate date range
    if (newDiscount.valid_from && newDiscount.valid_until) {
      const fromDate = new Date(newDiscount.valid_from);
      const untilDate = new Date(newDiscount.valid_until);

      if (isAfter(fromDate, untilDate)) {
        newErrors.dateRange = "Valid From date must be before Valid Until date";
      }

      if (isBefore(untilDate, currentDate)) {
        newErrors.pastDate = "Valid Until date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    // Clear the other field when one is selected
    if (name === "blindBoxId") {
      setNewDiscount(prev => ({
        ...prev,
        blindBoxId: value,
        productId: null
      }));
    } else if (name === "productId") {
      setNewDiscount(prev => ({
        ...prev,
        productId: value,
        blindBoxId: null
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const endpoint = editingId 
        ? `http://localhost:8080/api/discounts/${editingId}`
        : "http://localhost:8080/api/discounts";
      
      const method = editingId ? "put" : "post";
      
      const response = await axios[method](endpoint, {
        ...newDiscount,
        // Convert empty strings to null for the IDs
        blindBoxId: newDiscount.blindBoxId || null,
        productId: newDiscount.productId || null
      });

      if (editingId) {
        setDiscounts(discounts.map(d => d.discountId === editingId ? response.data : d));
      } else {
        setDiscounts([...discounts, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/discounts/${id}`);
      setDiscounts(discounts.filter((d) => d.discountId !== id));
    } catch (error) {
      console.error("Error deleting discount:", error);
    }
  };

  const handleEdit = (discount) => {
    setEditingId(discount.discountId);
    setNewDiscount({
      discountPercentage: discount.discountPercentage,
      valid_from: format(new Date(discount.valid_from), "yyyy-MM-dd'T'HH:mm"),
      valid_until: format(new Date(discount.valid_until), "yyyy-MM-dd'T'HH:mm"),
      status: discount.status,
      blindBoxId: discount.blindBoxId || null,
      productId: discount.productId || null
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setNewDiscount({
      discountPercentage: "",
      valid_from: "",
      valid_until: "",
      status: "ACTIVE",
      blindBoxId: null,
      productId: null
    });
    setErrors({});
  };

  const getApplicableName = (discount) => {
    if (discount.productId) {
      const product = products.find(p => p.productId === discount.productId);
      return product ? `Product: ${product.name}` : "Product";
    } else if (discount.blindBoxId) {
      const blindBox = blindBoxes.find(b => b.blindBoxId === discount.blindBoxId);
      return blindBox ? `Blind Box: ${blindBox.name}` : "Blind Box";
    }
    return "Not specified";
  };

  return (
    <div className="voucher-container">
      <h2>Voucher Management</h2>

      <div className="voucher-form">
        <h3>{editingId ? "Edit Voucher" : "Create New Voucher"}</h3>

        <div className="form-group">
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="discountPercentage"
            value={newDiscount.discountPercentage}
            onChange={handleInputChange}
            min="1"
            max="100"
          />
          {errors.discountPercentage && (
            <span className="error-message">{errors.discountPercentage}</span>
          )}
        </div>

        <div className="form-group">
          <label>Valid From:</label>
          <input
            type="datetime-local"
            name="valid_from"
            value={newDiscount.valid_from}
            onChange={handleInputChange}
          />
          {errors.valid_from && (
            <span className="error-message">{errors.valid_from}</span>
          )}
        </div>

        <div className="form-group">
          <label>Valid Until:</label>
          <input
            type="datetime-local"
            name="valid_until"
            value={newDiscount.valid_until}
            onChange={handleInputChange}
          />
          {errors.valid_until && (
            <span className="error-message">{errors.valid_until}</span>
          )}
        </div>

        <div className="form-group">
          <label>Applicable To:</label>
          <div className="applicable-options">
            <select
              name="productId"
              value={newDiscount.productId || ""}
              onChange={handleSelectChange}
              disabled={!!newDiscount.blindBoxId}
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.productId} value={product.productId}>
                  {product.name}
                </option>
              ))}
            </select>
            <span className="or-text">OR</span>
            <select
              name="blindBoxId"
              value={newDiscount.blindBoxId || ""}
              onChange={handleSelectChange}
              disabled={!!newDiscount.productId}
            >
              <option value="">Select Blind Box</option>
              {blindBoxes.map(box => (
                <option key={box.blindBoxId} value={box.blindBoxId}>
                  {box.name}
                </option>
              ))}
            </select>
          </div>
          {errors.applicableTo && (
            <span className="error-message">{errors.applicableTo}</span>
          )}
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={newDiscount.status}
            onChange={handleInputChange}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {errors.dateRange && (
          <div className="error-message">{errors.dateRange}</div>
        )}
        {errors.pastDate && (
          <div className="error-message">{errors.pastDate}</div>
        )}

        <div className="form-actions">
          <button
            onClick={handleSubmit}
            className="submit-button"
          >
            {editingId ? "Update Voucher" : "Create Voucher"}
          </button>
          {editingId && (
            <button onClick={resetForm} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </div>

      <table className="voucher-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Discount %</th>
            <th>Valid From</th>
            <th>Valid Until</th>
            <th>Applicable To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
            <tr key={discount.discountId}>
              <td>{discount.discountId}</td>
              <td>{discount.discountPercentage}%</td>
              <td>{new Date(discount.valid_from).toLocaleString()}</td>
              <td>{new Date(discount.valid_until).toLocaleString()}</td>
              <td>{getApplicableName(discount)}</td>
              <td>{discount.status}</td>
              <td>
                <button
                  onClick={() => handleEdit(discount)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(discount.discountId)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVoucher;