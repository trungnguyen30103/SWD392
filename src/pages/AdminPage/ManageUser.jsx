import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchType, setSearchType] = useState('fullName');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        roleID: '',
        status: 'active',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (url = 'http://localhost:8080/api/users') => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/roles');
            setRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
            alert('Failed to fetch roles');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchUsers();
            return;
        }
        
        try {
            let endpoint;
            if (searchType === 'role') {
                endpoint = `http://localhost:8080/api/users/search/role?roleID=${searchQuery}`;
            } else {
                endpoint = `http://localhost:8080/api/users/search/${searchType}?${searchType}=${encodeURIComponent(searchQuery)}`;
            }
            
            const response = await axios.get(endpoint);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed');
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter(user => user.userID !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete user');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            roleID: user.role?.roleID || '',
            status: user.status.toLowerCase(),
            phone: user.phone || '',
            address: user.address || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/api/users/admin/${editingUser.userID}`,
                formData
            );
            
            // Refresh the user list after update
            await fetchUsers();
            setEditingUser(null);
            alert('User updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update user');
        }
    };

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            
            <div className="search-section">
                <select 
                    value={searchType} 
                    onChange={(e) => setSearchType(e.target.value)}
                    className="search-select"
                >
                    <option value="fullName">Name</option>
                    <option value="userName">Username</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="role">Role</option>
                </select>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchType}`}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
                <button 
                    onClick={() => { 
                        setSearchQuery(''); 
                        fetchUsers(); 
                    }} 
                    className="clear-button"
                >
                    Clear
                </button>
            </div>

            {editingUser && (
                <div className="edit-form">
                    <h3>Edit User #{editingUser.userID}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Role:</label>
                            <select
                                value={formData.roleID}
                                onChange={(e) => setFormData({...formData, roleID: e.target.value})}
                                className="role-select"
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.roleID} value={role.roleID}>
                                        {role.roleName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="status-select"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="form-input"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-button">Save</button>
                            <button 
                                type="button" 
                                onClick={() => setEditingUser(null)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="user-table-container">
                {loading ? (
                    <div className="loading-indicator">Loading users...</div>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.userID}>
                                    <td>{user.userID}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || 'N/A'}</td>
                                    <td>{user.address || 'N/A'}</td>
                                    <td>
                                        {user.role ? 
                                            roles.find(r => r.roleID === user.role.roleID)?.roleName || 'N/A' 
                                            : 'N/A'
                                        }
                                    </td>
                                    <td className={`status ${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(user.userID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageUser;