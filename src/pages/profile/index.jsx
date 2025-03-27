import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const userID = 1; // Thay đổi với ID thực tế của người dùng

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userID}`);
        setUser(response.data);
        setBalance(response.data.balance);
        const orderResponse = await axios.get(`/api/orders?userId=${userID}`);
        setOrders(orderResponse.data);
      } catch (err) {
        setError("You are not logged in. Please sign up or log in.");
      }
    };
    fetchUserData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/users/${user.id}`, user);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = prompt("Please enter your new password");
    if (newPassword) {
      try {
        await axios.put(`/api/users/forgot-password/${user.id}`, {
          password: newPassword,
        });
        toast.success("Password changed successfully!");
      } catch (err) {
        toast.error("Error changing password.");
      }
    }
  };

  const handleViewOrders = async () => {
    try {
      const response = await axios.get(`/api/orders?userId=${user.id}`);
      setOrders(response.data);
    } catch (err) {
      toast.error("Error fetching order history.");
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <ToastContainer />
        <div className="profile-header">
          <h1>Account Information</h1>
        </div>
        <p>
          You do not have an account. Please <a href="/register">sign up</a> to
          view account information.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-header">
        <h1>Hello, {user.fullName}!</h1>
        <button
          className="update-profile-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <div className="profile-details">
        <div className="profile-info">
          <div className="info-item">
            <strong>Full Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />
            ) : (
              user.fullName
            )}
          </div>

          <div className="info-item">
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            ) : (
              user.email
            )}
          </div>

          <div className="info-item">
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            ) : (
              user.phone
            )}
          </div>

          <div className="info-item">
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            ) : (
              user.address
            )}
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSubmit}
            className="save-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="profile-actions">
        <button className="action-button" onClick={handlePasswordChange}>
          Change Password
        </button>
        <button className="action-button" onClick={handleViewOrders}>
          View Order History
        </button>
      </div>

      <div className="profile-balance">
        <h3>Your Current Balance: ${balance}</h3>
      </div>
    </div>
  );
};

export default Profile;
