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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/reviews');
            setReviews(response.data.data || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (reviewID) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/reviews/${reviewID}`);
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
            const response = await axios.put(
                `http://localhost:8080/api/reviews/${editingReview.reviewID}`,
                formData
            );
            setReviews(reviews.map(r => 
                r.reviewID === editingReview.reviewID ? response.data.data : r
            ));
            setEditingReview(null);
            alert('Review updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update review');
        }
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? 'star filled' : 'star'}>
                    {i < rating ? '★' : '☆'}
                </span>
            );
        }
        return <div className="rating-stars">{stars}</div>;
    };

    return (
        <div className="review-management-container">
            <h2>Review Management</h2>

            {loading && <div className="loading-indicator">Loading reviews...</div>}
            {error && <div className="error-message">{error}</div>}

            {editingReview && (
                <div className="edit-form">
                    <h3>Edit Review #{editingReview.reviewID}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Rating (1-5):</label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                className="rating-select"
                                required
                            >
                                <option value="">Select Rating</option>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>
                                        {num} Star{num !== 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Review Text:</label>
                            <textarea
                                value={formData.reviewText}
                                onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
                                className="review-textarea"
                                required
                                maxLength="500"
                            />
                            <div className="character-count">
                                {formData.reviewText.length}/500 characters
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-button">Save Changes</button>
                            <button 
                                type="button" 
                                onClick={() => setEditingReview(null)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="review-table-container">
                {reviews.length > 0 ? (
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
                                        <div className="rating-display">
                                            {renderRatingStars(review.rating)}
                                            <span className="rating-value">({review.rating})</span>
                                        </div>
                                    </td>
                                    <td className="review-text-cell">
                                        <div className="review-text">
                                            {review.reviewText || 'No review text'}
                                        </div>
                                    </td>
                                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(review.updatedAt).toLocaleDateString()}</td>
                                    <td className="action-buttons">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => handleEdit(review)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(review.reviewID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !loading && <div className="no-reviews">No reviews found</div>
                )}
            </div>
        </div>
    );
};

export default ManageReview;