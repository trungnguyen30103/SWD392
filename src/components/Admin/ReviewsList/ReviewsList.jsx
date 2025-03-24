import React, { useState } from 'react';
import './ReviewsList.scss';

const ReviewsList = ({ reviews, onApprove, onReject, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedReviews = () => {
    const sortableReviews = [...reviews];
    if (sortConfig.key) {
      sortableReviews.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReviews;
  };

  const sortedReviews = getSortedReviews();

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return <div className="rating-stars">{stars}</div>;
  };

  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="8" cy="8" r="1"></circle>
            <circle cx="12" cy="8" r="1"></circle>
            <circle cx="16" cy="8" r="1"></circle>
          </svg>
        </div>
        <h2>No Reviews Available</h2>
        <p>There are currently no customer reviews to show.</p>
      </div>
    );
  }

  return (
    <div className="reviews-list-container">
      <table className="reviews-table">
        <thead>
          <tr>
            <th className="product-column">Product</th>
            <th className="user-column">Reviewer</th>
            <th className="rating-column" onClick={() => requestSort('rating')}>
              Rating {getSortIcon('rating')}
            </th>
            <th className="date-column" onClick={() => requestSort('date')}>
              Date {getSortIcon('date')}
            </th>
            <th className="status-column" onClick={() => requestSort('status')}>
              Status {getSortIcon('status')}
            </th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map((review) => (
            <tr 
              key={review.id} 
              className={`review-row ${getStatusClass(review.status)}-row`}
              data-review-id={review.id} // Thêm thuộc tính này để xác định ID khi click
            >
              <td className="product-column">
                <div className="product-info">
                  <div className="product-image">
                    <img src={review.productImage} alt={review.productName} />
                  </div>
                  <div className="product-name">{review.productName}</div>
                </div>
              </td>
              <td className="user-column">
                <div className="user-info">
                  <div className="user-name">{review.userName}</div>
                  <div className="user-email">{review.userEmail}</div>
                </div>
              </td>
              <td className="rating-column">
                {getRatingStars(review.rating)}
              </td>
              <td className="date-column">{formatDate(review.date)}</td>
              <td className="status-column">
                <span className={`status-badge ${getStatusClass(review.status)}`}>
                  {getStatusText(review.status)}
                </span>
              </td>
              <td className="actions-column">
                <div className="review-actions">
                  {review.status === 'pending' && (
                    <>
                      <button className="action-btn approve-btn" onClick={() => onApprove(review.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Approve</span>
                      </button>
                      <button className="action-btn reject-btn" onClick={() => onReject(review.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  {review.status !== 'pending' && (
                    <button 
                      className={`action-btn ${review.status === 'approved' ? 'pending-btn' : 'approve-btn'}`}
                      onClick={() => review.status === 'approved' ? onReject(review.id) : onApprove(review.id)}
                    >
                      {review.status === 'approved' ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>Unapprove</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                  )}
                  <button className="action-btn delete-btn" onClick={() => onDelete(review.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsList;
