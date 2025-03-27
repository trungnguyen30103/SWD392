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

  useEffect(() => {
    const fetchUserData = async () => {
      // Get userID and token from localStorage
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");

      if (!userID || !token) {
        setError("You are not logged in. Please sign up or log in.");
        navigate("/login");
        return;
      }

      try {
        // Configure request headers with token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fetch user data and orders in parallel
        const [userResponse, ordersResponse] = await Promise.all([
          axios.get(`/api/users/${userID}`, config),
          axios.get(`/api/orders?userId=${userID}`, config)
        ]);

        setUser(userResponse.data);
        setBalance(userResponse.data.balance || 0);
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401) {
          // Clear invalid credentials
          localStorage.removeItem("userID");
          localStorage.removeItem("token");
          setError("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to load profile data.");
        }
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
      await axios.put(`/api/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
          `/api/users/forgot-password/${user.id}`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
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
      {/* Rest of your JSX remains the same */}
      {/* ... */}
    </div>
  );
};

export default Profile;