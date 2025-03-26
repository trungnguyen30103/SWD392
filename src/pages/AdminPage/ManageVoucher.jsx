import React, { useEffect, useState } from "react";
import axios from "axios";
import { isValid, parseISO, format, isAfter, isBefore } from "date-fns";
import "./ManageVoucher.css";

const ManageVoucher = () => {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    discountPercentage: "",
    validFrom: "",
    validUntil: "",
    status: "ACTIVE",
    blindboxId: null,
    productId: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/discounts");
        setDiscounts(response.data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };
    fetchDiscounts();
  }, []);

  const validateDate = (dateString) => {
    if (!dateString) return false;

    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();

    // Check if date is valid (e.g., not Feb 30)
    if (!isValid(date)) {
      return false;
    }

    // Check year is between 2024 and current year
    const year = date.getFullYear();
    if (year < 2024 || year > currentYear) {
      return false;
    }

    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

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
    if (!newDiscount.validFrom || !validateDate(newDiscount.validFrom)) {
      newErrors.validFrom = "Please enter a valid date (2024-current year)";
    }

    if (!newDiscount.validUntil || !validateDate(newDiscount.validUntil)) {
      newErrors.validUntil = "Please enter a valid date (2024-current year)";
    }

    // Validate date range
    if (newDiscount.validFrom && newDiscount.validUntil) {
      const fromDate = new Date(newDiscount.validFrom);
      const untilDate = new Date(newDiscount.validUntil);

      if (isAfter(fromDate, untilDate)) {
        newErrors.dateRange = "Valid From date must be before Valid Until date";
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

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/discounts",
        newDiscount
      );
      setDiscounts([...discounts, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error creating discount:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/discounts/${editingId}`,
        newDiscount
      );
      setDiscounts(
        discounts.map((d) => (d.id === editingId ? response.data : d))
      );
      resetForm();
    } catch (error) {
      console.error("Error updating discount:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/discounts/${id}`);
      setDiscounts(discounts.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting discount:", error);
    }
  };

  const handleEdit = (discount) => {
    setEditingId(discount.id);
    setNewDiscount({
      discountPercentage: discount.discountPercentage,
      validFrom: format(new Date(discount.validFrom), "yyyy-MM-dd'T'HH:mm"),
      validUntil: format(new Date(discount.validUntil), "yyyy-MM-dd'T'HH:mm"),
      status: discount.status,
      blindboxId: discount.blindboxId,
      productId: discount.productId,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setNewDiscount({
      discountPercentage: "",
      validFrom: "",
      validUntil: "",
      status: "ACTIVE",
      blindboxId: null,
      productId: null,
    });
    setErrors({});
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
            name="validFrom"
            value={newDiscount.validFrom}
            onChange={handleInputChange}
            min="2024-01-01T00:00"
            max={`${new Date().getFullYear()}-12-31T23:59`}
          />
          {errors.validFrom && (
            <span className="error-message">{errors.validFrom}</span>
          )}
        </div>

        <div className="form-group">
          <label>Valid Until:</label>
          <input
            type="datetime-local"
            name="validUntil"
            value={newDiscount.validUntil}
            onChange={handleInputChange}
            min="2024-01-01T00:00"
            max={`${new Date().getFullYear()}-12-31T23:59`}
          />
          {errors.validUntil && (
            <span className="error-message">{errors.validUntil}</span>
          )}
        </div>

        {errors.dateRange && (
          <div className="error-message">{errors.dateRange}</div>
        )}

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

        <div className="form-group">
          <label>Blindbox ID (optional):</label>
          <input
            type="number"
            name="blindboxId"
            value={newDiscount.blindboxId || ""}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Product ID (optional):</label>
          <input
            type="number"
            name="productId"
            value={newDiscount.productId || ""}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button
            onClick={editingId ? handleUpdate : handleCreate}
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
            <th>Status</th>
            <th>Blindbox ID</th>
            <th>Product ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
            <tr key={discount.id}>
              <td>{discount.id}</td>
              <td>{discount.discountPercentage}%</td>
              <td>{new Date(discount.validFrom).toLocaleString()}</td>
              <td>{new Date(discount.validUntil).toLocaleString()}</td>
              <td>{discount.status}</td>
              <td>{discount.blindboxId || "-"}</td>
              <td>{discount.productId || "-"}</td>
              <td>
                <button
                  onClick={() => handleEdit(discount)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(discount.id)}
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
