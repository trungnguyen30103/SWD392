import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input focus
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  // Handle input blur
  const handleBlur = () => {
    setFocusedField(null);
  };

  // Validate inputs before submission
  const validateInputs = () => {
    if (!formData.username || formData.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    }
    
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    
    if (!formData.address || formData.address.length < 5) {
      toast.error("Please enter your full address");
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        password: formData.password,
        address: formData.address,
        phoneNumber: formData.phoneNumber
      });
      
      toast.success("Registration successful! Redirecting to login...");
      
      // Redirect after short delay to allow toast to be seen
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-center" />
      
      <div className="register-card">
        <div className="register-banner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="banner-content">
            <h1>Join Our Community</h1>
            <p>Create an account to start shopping for amazing toys</p>
          </div>
        </div>
        
        <div className="register-form-container">
          <div className="register-form">
            <h2>Sign Up</h2>
            <p className="form-subtitle">Fill in your information to create an account</p>
            
            <form onSubmit={handleSubmit}>
              <div className={`input-group ${focusedField === 'username' ? 'focused' : ''}`}>
                <div className="input-icon">
                  <FaUser />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="register-input"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => handleFocus('username')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              
              <div className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}>
                <div className="input-icon">
                  <FaLock />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="register-input"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              
              <div className={`input-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
                <div className="input-icon">
                  <FaLock />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="register-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
              
              <div className={`input-group ${focusedField === 'address' ? 'focused' : ''}`}>
                <div className="input-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="register-input"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => handleFocus('address')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    placeholder="Street Address"
                    required
                  />
                </div>
              </div>
              
              <div className={`input-group ${focusedField === 'phoneNumber' ? 'focused' : ''}`}>
                <div className="input-icon">
                  <FaPhoneAlt />
                </div>
                <div className="input-field">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="register-input"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phoneNumber')}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`register-button ${loading ? 'loading' : ''}`} 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      Create Account
                      <span className="icon-right"><FaArrowRight /></span>
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="login-prompt">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
