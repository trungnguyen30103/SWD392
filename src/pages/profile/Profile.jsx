import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    account: "johndoe123", // Non-editable account
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    profilePicture: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  // Fetch user data from API (pseudo info for testing)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Use pseudo info if API fails
        setUser({
          account: "johndoe123",
          name: "John Doe",
          email: "johndoe@example.com",
          password: "********",
          phone: "123-456-7890",
          address: "123 Main St, City, Country",
          profilePicture: "https://via.placeholder.com/150",
        });
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user", user);
      toast.success("Profile updated successfully!");
      setIsEditing(false); // Disable editing after saving
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-header">
        <h1>Profile</h1>
        <button
          className="update-profile-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <div className="profile-picture-container">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
      </div>
      <h2 className="profile-name">{user.name}</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Account</label>
          <input
            type="text"
            name="account"
            value={user.account}
            readOnly // Non-editable
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!isEditing} // Disabled unless editing
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            disabled={!isEditing} // Disabled unless editing
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            disabled={!isEditing} // Disabled unless editing
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            disabled={!isEditing} // Disabled unless editing
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            disabled={!isEditing} // Disabled unless editing
            className="form-input"
          />
        </div>

        {isEditing && (
          <button type="submit" className="save-button">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;