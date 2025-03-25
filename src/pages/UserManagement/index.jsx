import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users'); // Replace with your backend URL
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`); // Replace with your backend URL
            setUsers(users.filter(user => user.userID !== userId)); // Remove user from the list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
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
                            <td>{user.role ? user.role.roleName : 'N/A'}</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                            <td>{new Date(user.updatedAt).toLocaleString()}</td>
                            <td>{user.status}</td>
                            <td>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(user.userID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;