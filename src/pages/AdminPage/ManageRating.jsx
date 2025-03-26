import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageRating.css';

const ManageReview = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [formData, setFormData] = useState({
        rating: '',
        reviewText: ''
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                alert('Failed to load reviews');
            }
        };
        fetchReviews();
    }, []);

    const handleDelete = async (reviewID) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        
        try {
            await axios.delete(`/reviews/${reviewID}`);
            setReviews(reviews.filter(review => review.reviewID !== reviewID));
            alert('Review deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete review');
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setFormData({
            rating: review.rating,
            reviewText: review.reviewText
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/reviews/${editingReview.reviewID}`, formData);
            setReviews(reviews.map(r => r.reviewID === editingReview.reviewID ? response.data : r));
            setEditingReview(null);
            alert('Review updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update review');
        }
    };

    return (
        <div className="review-management-container">
            <h2>Review Management</h2>

            {editingReview && (
                <div className="edit-form">
                    <h3>Edit Review #{editingReview.reviewID}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Rating (1-5):</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Review Text:</label>
                            <textarea
                                value={formData.reviewText}
                                onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingReview(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="review-table-container">
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Blindbox</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.reviewID}>
                                <td>{review.reviewID}</td>
                                <td>{review.user?.userName || 'N/A'}</td>
                                <td>{review.product?.productName || 'N/A'}</td>
                                <td>{review.blindbox?.name || 'N/A'}</td>
                                <td>
                                    <span className="rating">
                                        {review.rating} ★
                                    </span>
                                </td>
                                <td className="review-text">{review.reviewText}</td>
                                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(review.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(review)}>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(review.reviewID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageReview;