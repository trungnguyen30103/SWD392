import React, { useState, useEffect } from 'react';
import './Accounts.scss';
import accounts from '../../../mock/accounts';
import UsersList from '../../../components/Admin/Accounts/UsersList';
import UserForm from '../../../components/Admin/Accounts/UserForm';
import DeleteConfirmation from '../../../components/Admin/DeleteConfirmation/DeleteConfirmation';
import { FiUsers, FiUserPlus, FiSearch, FiUserCheck, FiClock, FiUserX } from 'react-icons/fi';

const Accounts = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [accountStats, setAccountStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    new: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserAccounts(accounts);
      setIsLoading(false);
      
      // Calculate stats
      const stats = {
        total: accounts.length,
        active: accounts.filter(user => user.status === 'active').length,
        inactive: accounts.filter(user => user.status === 'inactive').length,
        new: accounts.filter(user => {
          const createdDate = new Date(user.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return createdDate > thirtyDaysAgo;
        }).length
      };
      
      setAccountStats(stats);
    }, 800);
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    setUserAccounts(userAccounts.filter(user => user.id !== selectedUser.id));
    setIsDeleteConfirmOpen(false);
    setSelectedUser(null);
    
    // Update stats
    setAccountStats(prev => ({
      ...prev,
      total: prev.total - 1,
      active: selectedUser.status === 'active' ? prev.active - 1 : prev.active,
      inactive: selectedUser.status === 'inactive' ? prev.inactive - 1 : prev.inactive,
      new: isNewUser(selectedUser) ? prev.new - 1 : prev.new
    }));
  };
  
  const isNewUser = (user) => {
    const createdDate = new Date(user.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
  };

  const handleSaveUser = (userData) => {
    let updatedStats = {...accountStats};
    
    if (selectedUser) {
      // Edit existing user
      const oldStatus = selectedUser.status;
      
      setUserAccounts(userAccounts.map(user => 
        user.id === userData.id ? userData : user
      ));
      
      // Update stats if status changed
      if (oldStatus !== userData.status) {
        if (oldStatus === 'active') updatedStats.active -= 1;
        if (oldStatus === 'inactive') updatedStats.inactive -= 1;
        
        if (userData.status === 'active') updatedStats.active += 1;
        if (userData.status === 'inactive') updatedStats.inactive += 1;
        
        setAccountStats(updatedStats);
      }
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      setUserAccounts([...userAccounts, newUser]);
      
      // Update stats
      updatedStats.total += 1;
      updatedStats.new += 1;
      if (userData.status === 'active') updatedStats.active += 1;
      if (userData.status === 'inactive') updatedStats.inactive += 1;
      
      setAccountStats(updatedStats);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredUsers = userAccounts.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentFilter === 'all') return matchesSearch;
    return matchesSearch && user.status === currentFilter;
  });

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <div className="header-title">
          <FiUsers className="header-icon" />
          <h1>User Accounts</h1>
        </div>
        <button 
          className="add-user-btn" 
          onClick={handleAddUser}
        >
          <FiUserPlus /> Add New User
        </button>
      </div>
      
      <div className="account-stats">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FiUsers size={24} />
          </div>
          <div className="stat-content">
            <h4>{accountStats.total}</h4>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green">
            <FiUserCheck size={24} />
          </div>
          <div className="stat-content">
            <h4>{accountStats.active}</h4>
            <p>Active Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon red">
            <FiUserX size={24} />
          </div>
          <div className="stat-content">
            <h4>{accountStats.inactive}</h4>
            <p>Inactive Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orange">
            <FiClock size={24} />
          </div>
          <div className="stat-content">
            <h4>{accountStats.new}</h4>
            <p>New Users (30 days)</p>
          </div>
        </div>
      </div>

      <div className="accounts-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, username or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Users
          </button>
          <button 
            className={`filter-tab ${currentFilter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button 
            className={`filter-tab ${currentFilter === 'inactive' ? 'active' : ''}`}
            onClick={() => handleFilterChange('inactive')}
          >
            Inactive
          </button>
          <button 
            className={`filter-tab ${currentFilter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      <UsersList
        users={filteredUsers}
        isLoading={isLoading}
        onEdit={handleEditUser}
        onDelete={handleDeleteClick}
      />

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {isDeleteConfirmOpen && selectedUser && (
        <DeleteConfirmation
          title="Delete User Account"
          message={`Are you sure you want to delete the account for ${selectedUser.fullName}? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default Accounts;
