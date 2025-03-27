import { TextField, Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!usernameOrEmail || usernameOrEmail.length < 3) {
      toast.error("Username or Email is invalid.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setRequesting(true);

    try {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        usernameOrEmail
      );
      const loginData = {
        [isEmail ? "email" : "username"]: usernameOrEmail,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );

      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem('userID', response.data.userID);

      toast.success("Login successful!", {
        autoClose: 1500,
        onClose: () => navigate("/")
      });

    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Authentication failed. Please check your username/email and password."
      );
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
    <div className="login-container">
      <ToastContainer />
      <Box className="login-form">
        <h2 className="login-title">Login</h2>
        <p className="register-link">
          If you don't have an account, <a href="/register">register here</a>
        </p>

        <div className="form-group">
          <TextField
            required
            className="login-input-username"
            id="outlined-required"
            label="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <TextField
            required
            className="login-input-password"
            id="outlined-required"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {!isRequesting ? (
          <Button
            variant="contained"
            className="btn-login"
            onClick={handleLogin}
          >
            Login
          </Button>
        ) : (
          <Button variant="contained" className="btn-login" disabled>
            Logging in...
          </Button>
        )}
        <a href="/forget-password" className="forgot-password-link">
          Forgot password?
        </a>

        <p className="divider">Or login with</p>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          className="social-buttons-container"
        >
          <Grid item>
            <Button variant="outlined" className="btn-social-facebook">
              <i className="fa fa-facebook" style={{ marginRight: "8px" }}></i>
              facebook
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" className="btn-social-google">
              <i className="fa fa-google" style={{ marginRight: "8px" }}></i>
              google
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
