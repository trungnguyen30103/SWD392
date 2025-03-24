import React, { useState, useEffect } from 'react';
import { mockReviews } from '../../../mock/reviewsData';
import ReviewsList from '../../../components/Admin/ReviewsList/ReviewsList';
import ReviewDetail from '../../../components/Admin/ReviewDetail/ReviewDetail';
import DeleteConfirmation from '../../../components/Admin/DeleteConfirmation/DeleteConfirmation';
import './Reviews.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, productName: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, we would fetch from API
    // For now, we use mock data
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    setLoading(true);
    setTimeout(() => {
      // Lấy dữ liệu từ mockReviews đã được xử lý
      setReviews(mockReviews);
      setLoading(false);
    }, 500); // Simulate loading
  };

  const handleApprove = (id) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? { ...review, status: 'approved' } : review
      )
    );
    
    // If we're viewing this review in detail, update the selected review too
    if (selectedReview && selectedReview.id === id) {
      setSelectedReview({ ...selectedReview, status: 'approved' });
    }
  };

  const handleReject = (id) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? { ...review, status: 'rejected' } : review
      )
    );
    
    // If we're viewing this review in detail, update the selected review too
    if (selectedReview && selectedReview.id === id) {
      setSelectedReview({ ...selectedReview, status: 'rejected' });
    }
  };

  const handleDeleteClick = (id) => {
    const review = reviews.find(r => r.id === id);
    setDeleteConfirmation({ 
      show: true, 
      id, 
      productName: review ? review.productName : ''
    });
  };

  const handleDeleteConfirm = () => {
    const { id } = deleteConfirmation;
    setReviews(prev => prev.filter(review => review.id !== id));
    setDeleteConfirmation({ show: false, id: null, productName: '' });
    
    // If we're viewing the deleted review in detail, close the detail modal
    if (selectedReview && selectedReview.id === id) {
      setShowDetailModal(false);
      setSelectedReview(null);
    }
  };

  const handleReviewClick = (id) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      setSelectedReview(review);
      setShowDetailModal(true);
    }
  };

  const filteredReviews = reviews.filter(review => {
    // Apply status filter
    if (statusFilter !== 'all' && review.status !== statusFilter) {
      return false;
    }
    
    // Apply search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        review.productName.toLowerCase().includes(searchTermLower) ||
        review.userName.toLowerCase().includes(searchTermLower) ||
        review.comment.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  const statusCounts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Reviews Management</h1>
          <p>Approve, reject or delete product reviews from customers</p>
        </div>
      </div>
      
      <div className="reviews-filters">
        <div className="status-tabs">
          <button 
            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`} 
            onClick={() => setStatusFilter('all')}
          >
            All
            <span className="count">{statusCounts.all}</span>
          </button>
          <button 
            className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`} 
            onClick={() => setStatusFilter('pending')}
          >
            Pending
            <span className="count pending">{statusCounts.pending}</span>
          </button>
          <button 
            className={`status-tab ${statusFilter === 'approved' ? 'active' : ''}`} 
            onClick={() => setStatusFilter('approved')}
          >
            Approved
            <span className="count approved">{statusCounts.approved}</span>
          </button>
          <button 
            className={`status-tab ${statusFilter === 'rejected' ? 'active' : ''}`} 
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected
            <span className="count rejected">{statusCounts.rejected}</span>
          </button>
        </div>
        
        <div className="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="reviews-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-row">
            <div className="skeleton-cell product"></div>
            <div className="skeleton-cell user"></div>
            <div className="skeleton-cell rating"></div>
            <div className="skeleton-cell date"></div>
            <div className="skeleton-cell status"></div>
            <div className="skeleton-cell actions"></div>
          </div>
          <div className="skeleton-row">
            <div className="skeleton-cell product"></div>
            <div className="skeleton-cell user"></div>
            <div className="skeleton-cell rating"></div>
            <div className="skeleton-cell date"></div>
            <div className="skeleton-cell status"></div>
            <div className="skeleton-cell actions"></div>
          </div>
          <div className="skeleton-row">
            <div className="skeleton-cell product"></div>
            <div className="skeleton-cell user"></div>
            <div className="skeleton-cell rating"></div>
            <div className="skeleton-cell date"></div>
            <div className="skeleton-cell status"></div>
            <div className="skeleton-cell actions"></div>
          </div>
        </div>
      ) : (
        <div className="reviews-content" onClick={(e) => {
          // Check if we clicked on a review row and not a button
          const row = e.target.closest('tr');
          const button = e.target.closest('button');
          if (row && !button) {
            const id = parseInt(row.getAttribute('data-review-id'), 10);
            if (!isNaN(id)) {
              handleReviewClick(id);
            }
          }
        }}>
          <ReviewsList
            reviews={filteredReviews}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDeleteClick}
          />
        </div>
      )}
      
      {showDetailModal && selectedReview && (
        <ReviewDetail
          review={selectedReview}
          onClose={() => setShowDetailModal(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDeleteClick}
        />
      )}
      
      <DeleteConfirmation
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, id: null, productName: '' })}
        onConfirm={handleDeleteConfirm}
        itemName={deleteConfirmation.productName}
      />
    </div>
  );
};

export default Reviews;