import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [searchType, setSearchType] = useState('fullName');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        roleID: '',
        status: 'active',
        phone: '',
        address: ''
    });

    const fetchUsers = async (url = '/api/users') => {
        try {
            const response = await axios.get(url);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchUsers();
            return;
        }
        
        try {
            let endpoint = `/api/users/search/${searchType}?${searchType}=${searchQuery}`;
            if (searchType === 'role') endpoint = `/api/users/search/role?roleID=${searchQuery}`;
            
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
            await axios.delete(`/api/users/${userId}`);
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
            status: user.status,
            phone: user.phone,
            address: user.address
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/users/admin/${editingUser.userID}`, formData);
            setUsers(users.map(u => u.userID === editingUser.userID ? response.data.data : u));
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
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
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
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={() => { setSearchQuery(''); fetchUsers(); }}>Clear</button>
            </div>

            {editingUser && (
                <div className="edit-form">
                    <h3>Edit User #{editingUser.userID}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Role ID:</label>
                            <input
                                type="number"
                                value={formData.roleID}
                                onChange={(e) => setFormData({...formData, roleID: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="user-table-container">
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
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.role?.roleName || 'N/A'}</td>
                                <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.userID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;