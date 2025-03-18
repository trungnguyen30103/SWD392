import "./login.css";
import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    // Example validation rules (adjust based on backend requirements)
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
        username: username,  // Use 'username' instead of 'email'
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
    </div>
  );
}