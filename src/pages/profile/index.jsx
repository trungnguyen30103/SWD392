import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Updated CSS file

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");

      if (!userID || !token) {
        setError("You are not logged in. Please sign up or log in.");
        navigate("/login");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${userID}`,
          config
        );
        setUser(userResponse.data);

        try {
          const ordersResponse = await axios.get(
            `http://localhost:8080/api/orders?userId=${userID}`,
            config
          );
          setOrders(ordersResponse.data);
        } catch (ordersErr) {
          console.error("Error fetching orders:", ordersErr);
          setOrdersError(
            ordersErr.response?.data?.message || "Failed to load orders."
          );
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("userID");
          localStorage.removeItem("token");
          setError("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Failed to load profile data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/users/${user.userID}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = prompt("Please enter your new password");
    if (newPassword) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:8080/api/users/forgot-password/${user.userID}`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Password changed successfully!");
      } catch (err) {
        console.error("Password change error:", err);
        toast.error(err.response?.data?.message || "Error changing password.");
      }
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <ToastContainer />
      <h1 className="profile-title">User Profile</h1>

      {/* Personal Information Section */}
      <section className="profile-section">
        <h2>Personal Information</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={user.status}
                onChange={handleChange}
              />
            </label>
            <label>
              Avatar URL:
              <input
                type="text"
                name="avatar_url"
                value={user.avatar_url}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Full Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Username:</strong> {user.userName}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
            {user.avatar_url && (
              <div className="avatar-container">
                <img src={user.avatar_url} alt="Avatar" className="avatar" />
              </div>
            )}
            <div className="button-group">
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="password-button"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Account Details Section */}
      <section className="profile-section">
        <h2>Account Details</h2>
        <div className="profile-info">
          <p>
            <strong>User ID:</strong> {user.userID}
          </p>
          <p>
            <strong>Role:</strong> {user.role.name}
          </p>
          <p>
            <strong>Balance:</strong> ${user.balance.toFixed(2)}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Orders Section */}
      <section className="profile-section">
        <h2>Orders</h2>
        {ordersError ? (
          <div className="error-message">{ordersError}</div>
        ) : orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                Order #{order.id} - Total: ${order.totalAmount} - Status:{" "}
                {order.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
