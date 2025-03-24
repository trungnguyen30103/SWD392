import React, { useState, useEffect, useRef } from 'react';
import './UserForm.scss';
import { FiX, FiUser, FiMail, FiTag, FiShield, FiAlertCircle, FiImage } from 'react-icons/fi';

const UserForm = ({ user, onSave, onCancel }) => {
  const initialFormData = {
    id: user?.id || null,
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    role: user?.role || 'employee',
    status: user?.status || 'active',
    avatar: user?.avatar || 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const formRef = useRef(null);
  const avatarInputRef = useRef(null);
  const isEditing = !!user;

  // Focus first input when modal opens
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formRef.current) {
        const firstInput = formRef.current.querySelector('input');
        if (firstInput) firstInput.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Mark field as touched
    setIsTouched({
      ...isTouched,
      [name]: true
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle avatar image change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, avatar: "Please select an image file" }));
      return;
    }

    // In a real app, we would upload to server and get URL back
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, avatar: imageUrl }));
    
    if (errors.avatar) {
      setErrors(prev => ({ ...prev, avatar: null }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    setErrors(newErrors);
    
    // Mark all fields as touched if there are errors
    if (Object.keys(newErrors).length > 0) {
      const touchedFields = {};
      Object.keys(formData).forEach(key => touchedFields[key] = true);
      setIsTouched(touchedFields);
      
      // Switch to tab with errors
      if (newErrors.username || newErrors.email || newErrors.fullName) {
        setActiveTab('basic');
      } else if (newErrors.avatar) {
        setActiveTab('profile');
      }
    }
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API delay
      setTimeout(() => {
        onSave(formData);
        setIsSubmitting(false);
      }, 800);
    }
  };

  // Get error message for specific field
  const getErrorMessage = (field) => {
    if (isTouched[field] && errors[field]) {
      return errors[field];
    }
    return null;
  };

  // Handle click on overlay to prevent immediate closing
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="user-form-overlay" onClick={handleOverlayClick}>
      <div className="user-form-container">
        <div className="form-header">
          <h2>{isEditing ? 'Edit User Account' : 'Add New User'}</h2>
          <button 
            className="close-btn" 
            onClick={onCancel}
            aria-label="Close"
            type="button"
          >
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form" ref={formRef}>
          <div className="form-tabs">
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => handleTabChange('basic')}
            >
              Basic Info
            </button>
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              Profile & Avatar
            </button>
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'permissions' ? 'active' : ''}`}
              onClick={() => handleTabChange('permissions')}
            >
              Permissions
            </button>
          </div>
          
          {/* Basic Info Tab */}
          <div className={`tab-content ${activeTab === 'basic' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">Account Information</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={getErrorMessage('fullName') ? 'error' : ''}
                  />
                </div>
                {getErrorMessage('fullName') && (
                  <p className="error-text">{getErrorMessage('fullName')}</p>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">
                    Username <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FiTag className="input-icon" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="john_smith"
                      value={formData.username}
                      onChange={handleChange}
                      className={getErrorMessage('username') ? 'error' : ''}
                    />
                  </div>
                  {getErrorMessage('username') && (
                    <p className="error-text">{getErrorMessage('username')}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={getErrorMessage('email') ? 'error' : ''}
                    />
                  </div>
                  {getErrorMessage('email') && (
                    <p className="error-text">{getErrorMessage('email')}</p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">User Role</label>
                  <div className="input-with-icon">
                    <FiShield className="input-icon" />
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Account Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile & Avatar Tab */}
          <div className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">User Avatar & Profile</h3>
              
              <div className="form-group avatar-upload">
                <label>User Avatar</label>
                <div 
                  className="avatar-preview-container"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <img src={formData.avatar} alt="User Avatar" className="avatar-preview" />
                  <div className="avatar-overlay">
                    <button 
                      type="button" 
                      className="change-avatar-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        avatarInputRef.current?.click();
                      }}
                    >
                      <FiImage /> Change Avatar
                    </button>
                  </div>
                </div>
                <input 
                  type="file" 
                  id="avatarImage" 
                  accept="image/*"
                  className="file-input"
                  onChange={handleAvatarChange}
                  ref={avatarInputRef}
                />
                <div className="avatar-note">
                  Click on the avatar to change it. Default avatar will be assigned automatically if none is provided.
                </div>
                {getErrorMessage('avatar') && (
                  <p className="error-text">{getErrorMessage('avatar')}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Biography</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter a brief description about this user"
                />
              </div>
            </div>
          </div>
          
          {/* Permissions Tab */}
          <div className={`tab-content ${activeTab === 'permissions' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">Access & Permissions</h3>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="canManageProducts"
                  name="canManageProducts"
                  checked={formData.canManageProducts || false}
                  onChange={handleChange}
                />
                <label htmlFor="canManageProducts">Can manage products</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="canManageOrders"
                  name="canManageOrders"
                  checked={formData.canManageOrders || false}
                  onChange={handleChange}
                />
                <label htmlFor="canManageOrders">Can manage orders</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="canManageUsers"
                  name="canManageUsers"
                  checked={formData.canManageUsers || false}
                  onChange={handleChange}
                />
                <label htmlFor="canManageUsers">Can manage users</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="canAccessReports"
                  name="canAccessReports"
                  checked={formData.canAccessReports || false}
                  onChange={handleChange}
                />
                <label htmlFor="canAccessReports">Can access reports</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="canManageSettings"
                  name="canManageSettings"
                  checked={formData.canManageSettings || false}
                  onChange={handleChange}
                />
                <label htmlFor="canManageSettings">Can manage settings</label>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                isEditing ? 'Update User' : 'Save User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
