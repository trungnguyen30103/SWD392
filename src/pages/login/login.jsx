<<<<<<< HEAD
import "./login.css";
import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
=======
import "./login.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaLock, FaUser, FaArrowRight } from "react-icons/fa";
>>>>>>> minh

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setRequesting] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate();

  const validateInputs = () => {
    
=======
  const [focused, setFocused] = useState({ username: false, password: false });
  const navigate = useNavigate();

  const validateInputs = () => {
>>>>>>> minh
    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setRequesting(true);

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
<<<<<<< HEAD
        username: username,  // Use 'username' instead of 'email'
=======
        username: username,
>>>>>>> minh
        password: password,
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      toast.success("Login successful!");

      // Store the token (e.g., in localStorage)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Navigate to the home page or dashboard
      navigate("/");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      toast.error("Authentication failed. Please check your username and password.");
    } finally {
      setRequesting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
<<<<<<< HEAD
  };

  return (
    <div className="login">
      <ToastContainer />
      <Box className="login__form">
        <h2>Login</h2>
        <TextField
          required
          className="login-input"
          id="outlined-required"
          label="Username"
          defaultValue=""
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <TextField
          required
          className="login-input"
          id="outlined-required"
          type="password"
          label="Password"
          defaultValue=""
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <a href="/forget-form">Forgot password?</a>
        {!isRequesting ? (
          <Button
            variant="contained"
            href="#contained-buttons"
            className="btn-login"
            onClick={handleLogin}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="contained"
            href="#contained-buttons"
            className="btn-login"
            disabled
          >
            Logging in...
          </Button>
        )}
      </Box>
=======
  };
  
  const handleFocus = (field, value) => {
    setFocused(prev => ({...prev, [field]: value}));
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" />
      
      <div className="login-card">
        <div className="login-banner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="banner-content">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your shopping journey</p>
          </div>
        </div>
        
        <div className="login-form-container">
          <div className="login-form">
            <h2>Sign In</h2>
            <p className="form-subtitle">Enter your account details below</p>
            
            <div className={`input-group ${focused.username ? 'focused' : ''}`}>
              <div className="input-icon">
                <FaUser />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="username"
                  required
                  className="login-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => handleFocus('username', true)}
                  onBlur={() => handleFocus('username', false)}
                />
              
              </div>
            </div>
            
            <div className={`input-group ${focused.password ? 'focused' : ''}`}>
              <div className="input-icon">
                <FaLock />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  required
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => handleFocus('password', true)}
                  onBlur={() => handleFocus('password', false)}
                />
             
              </div>
            </div>
            
            <div className="form-actions">
              <Link to="/forget-form" className="forgot-password">
                Forgot password?
              </Link>
              
              <button
                className={`login-button ${isRequesting ? 'loading' : ''}`}
                onClick={handleLogin}
                disabled={isRequesting}
              >
                {isRequesting ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="icon-right" />
                  </>
                )}
              </button>
            </div>
            
            <div className="register-prompt">
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
>>>>>>> minh
    </div>
  );
}