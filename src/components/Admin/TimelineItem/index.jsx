import React from 'react';
import './TimelineItem.scss';

const TimelineItem = ({ event, isLast }) => {
  const { status, date, description } = event;
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`timeline-item ${!date ? 'inactive' : ''} ${isLast ? 'last' : ''}`}>
      <div className="timeline-badge">
        {date ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        )}
      </div>
      <div className="timeline-content">
        <h4>{status.charAt(0).toUpperCase() + status.slice(1)}</h4>
        <p>{description}</p>
        {date && (
          <span className="timeline-date">{formatDate(date)}</span>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
