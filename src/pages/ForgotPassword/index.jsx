import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function ForgotPassword() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isRequesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!emailOrUsername) {
      toast.error("Please enter your email or username.");
      return;
    }

    setRequesting(true);

    try {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        emailOrUsername
      );
      const data = {
        [isEmail ? "email" : "username"]: emailOrUsername,
      };

      const response = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        data
      );

      toast.success("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      toast.error("Error sending reset email. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <Box className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <p className="back-to-login">
          Remember your password? <a href="/login">Login here</a>
        </p>

        <div className="form-group">
          <TextField
            required
            label="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          onClick={handleForgotPassword}
          disabled={isRequesting}
        className="button-forgot">
          {isRequesting ? "Sending..." : "Send Reset Link"}
        </Button>
      </Box>
    </div>
  );
}
