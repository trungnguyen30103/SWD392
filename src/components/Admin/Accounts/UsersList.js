import React, { useState } from 'react';
import './UsersList.scss';
import { FiEdit2, FiTrash2, FiMoreHorizontal, FiMail, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const UsersList = ({ users, isLoading, onEdit, onDelete }) => {
  const [expandedUser, setExpandedUser] = useState(null);

  const handleExpand = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case 'admin': return 'role-admin';
      case 'manager': return 'role-manager';
      default: return 'role-employee';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="users-list-container">
        <div className="users-list">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="user-card skeleton">
              <div className="user-avatar skeleton-circle"></div>
              <div className="user-info">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
              <div className="skeleton-badge"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="users-list-container">
        <div className="empty-state">
          <div className="empty-icon">
            <FiUsers size={48} />
          </div>
          <h3>No Users Found</h3>
          <p>There are no users matching your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-list">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-card ${expandedUser === user.id ? 'expanded' : ''}`}
          >
            <div className="user-card-main" onClick={() => handleExpand(user.id)}>
              <div className="user-avatar">
                <img src={user.avatar} alt={user.fullName} />
              </div>
              <div className="user-info">
                <h3>{user.fullName}</h3>
                <p className="username">@{user.username}</p>
              </div>
              <div className={`user-role ${getRoleClass(user.role)}`}>
                {user.role}
              </div>
              <div className={`user-status ${getStatusClass(user.status)}`}>
                {user.status}
              </div>
              <button className="expand-btn">
                <FiMoreHorizontal />
              </button>
            </div>
            
            {expandedUser === user.id && (
              <div className="user-card-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <FiMail className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{user.email}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FiCalendar className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Joined</span>
                      <span className="detail-value">{formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FiClock className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Last Login</span>
                      <span className="detail-value">{formatTimeAgo(user.lastLogin)}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-actions">
                  <button 
                    className="btn-secondary action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    className="btn-danger action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user);
                    }}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
