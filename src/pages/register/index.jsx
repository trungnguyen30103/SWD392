import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();

  // State for form data and error messages
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: { roleID: 1 },
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field as the user types
    validateField(name, value); // Ensure validation is called
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let errors = { ...fieldErrors };
    let isValid = true;

    switch (name) {
      case "fullName":
        if (!/^[\p{L}\s]+$/u.test(value)) {
          errors.fullName = "Full Name must contain only letters";
          isValid = false;
        } else {
          errors.fullName = ""; // Clear error when valid
        }
        break;

      case "userName":
        if (!value) {
          errors.userName =
            "Username is required. You will use this to log in.";
          isValid = false;
        } else {
          errors.userName = ""; // Clear error when valid
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errors.email = "Email must be a valid address";
          isValid = false;
        } else {
          errors.email = ""; // Clear error when valid
        }
        break;

      case "phone":
        if (!/^[0][0-9]{9}$/.test(value)) {
          errors.phone = "Phone number must be 10 digits and start with 0";
          isValid = false;
        } else {
          errors.phone = ""; // Clear error when valid
        }
        break;

      case "password":
        if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
            value
          )
        ) {
          errors.password =
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
          isValid = false;
        } else {
          errors.password = ""; // Clear error when valid
        }
        break;

      case "confirmPassword":
        if (formData.password !== value) {
          errors.confirmPassword = "Passwords must match";
          isValid = false;
        } else {
          errors.confirmPassword = ""; // Clear error when valid
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isValid = Object.keys(formData).every((field) =>
      validateField(field, formData[field])
    );
    if (!isValid) return; // Stop submission if validation fails

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/customer",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(
          `Registration failed: ${err.response.data.error || "Unknown error"}`
        );
      } else if (err.request) {
        setError(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if all fields are valid to enable Sign Up button
  const isFormValid = Object.values(fieldErrors).every((error) => error === "");

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Register</h2>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {fieldErrors.fullName && (
              <div className="error-message">{fieldErrors.fullName}</div>
            )}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.userName && (
              <div className="error-message">{fieldErrors.userName}</div>
            )}
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.email && (
              <div className="error-message">{fieldErrors.email}</div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.phone && (
              <div className="error-message">{fieldErrors.phone}</div>
            )}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.password && (
              <div className="error-message">{fieldErrors.password}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.confirmPassword && (
              <div className="error-message">{fieldErrors.confirmPassword}</div>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading || !isFormValid}
          >
            {loading ? "Creating account..." : "Sign up now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
