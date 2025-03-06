import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackingData, trackingStatuses } from '../../mock/TrackingData';
import './Track.scss';

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Track = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(trackingId || '');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tracking information based on tracking ID
  useEffect(() => {
    if (trackingId) {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        const tracking = trackingData.find(t => 
          t.trackingId === trackingId || t.orderId.toString() === trackingId
        );
        
        if (tracking) {
          setTrackingInfo(tracking);
          setLoading(false);
        } else {
          setError('Tracking information not found. Please check your tracking ID.');
          setTrackingInfo(null);
          setLoading(false);
        }
      }, 800);
    }
  }, [trackingId]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/track/${searchId}`);
    }
  };

  // Get current status info
  const getCurrentStatus = () => {
    if (!trackingInfo) return null;
    
    const latestEvent = trackingInfo.trackingHistory[trackingInfo.trackingHistory.length - 1];
    return {
      ...trackingStatuses[latestEvent.status],
      time: formatDate(latestEvent.timestamp),
      description: latestEvent.description
    };
  };

  const currentStatus = getCurrentStatus();

  return (
    <div className="track-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Track Your Order</h1>
          <p className="page-subtitle">Enter your order ID or tracking number to check the delivery status</p>
        </div>

        <div className="search-container">
          <form onSubmit={handleSearch} className="tracking-search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Enter Order ID or Tracking Number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="tracking-search-input"
              />
              <button type="submit" className="tracking-search-button">
                Track
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching tracking information...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Tracking Unavailable</h3>
            <p>{error}</p>
          </div>
        ) : trackingInfo ? (
          <div className="tracking-container">
            <div className="tracking-header">
              <div className="tracking-header-left">
                <div className="order-info">
                  <div className="info-row">
                    <span className="label">Tracking Number:</span>
                    <span className="value">{trackingInfo.trackingId}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Order ID:</span>
                    <span className="value">#{trackingInfo.orderId}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Carrier:</span>
                    <span className="value">{trackingInfo.carrier}</span>
                  </div>
                </div>
              </div>

              <div className="tracking-header-right">
                <div className="status-box" style={{ borderColor: currentStatus.color }}>
                  <div className="status-icon" style={{ backgroundColor: currentStatus.color }}>
                    <i className={`fas ${currentStatus.icon}`}></i>
                  </div>
                  <div className="status-details">
                    <h4>{currentStatus.label}</h4>
                    <p className="status-time">{currentStatus.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="estimated-delivery">
              <i className="far fa-calendar-alt"></i>
              <span>Estimated Delivery: <strong>{formatDate(trackingInfo.estimatedDelivery)}</strong></span>
            </div>

            <div className="tracking-content">
              <div className="tracking-timeline">
                <h3>Tracking History</h3>
                <div className="timeline">
                  {trackingInfo.trackingHistory.map((event, index) => {
                    const statusInfo = trackingStatuses[event.status];
                    return (
                      <div key={index} className="timeline-item">
                        <div className="timeline-icon" style={{ backgroundColor: statusInfo.color }}>
                          <i className={`fas ${statusInfo.icon}`}></i>
                        </div>
                        <div className="timeline-content">
                          <div className="event-header">
                            <h4>{statusInfo.label}</h4>
                            <span className="event-time">{formatDate(event.timestamp)}</span>
                          </div>
                          <p className="event-location">{event.location}</p>
                          <p className="event-description">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="tracking-info-column">
                <div className="shipping-details">
                  <h3>Shipping Details</h3>
                  <div className="details-card">
                    <div className="details-row">
                      <span className="detail-label">Shipping Address:</span>
                      <span className="detail-value">{trackingInfo.shippingAddress}</span>
                    </div>
                    <div className="details-row">
                      <span className="detail-label">Current Location:</span>
                      <span className="detail-value">{trackingInfo.currentLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <div className="map-overlay">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Delivery Route Map</span>
                  </div>
                </div>

                <div className="order-items">
                  <h3>Order Items</h3>
                  <div className="items-container">
                    {trackingInfo.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image-container">
                          <img src={item.imageUrl} alt={item.name} className="item-image" />
                        </div>
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <div className="item-meta">
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-tracking">
            <div className="empty-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Enter Tracking Information</h3>
            <p>Enter your order ID or tracking number above to check your order status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
