import React from 'react';
import './OrderNote.scss';

const OrderNote = ({ note, onDelete }) => {
  const formatDate = (dateString) => {
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
    <div className="order-note">
      <div className="note-header">
        <div className="note-author">
          <div className="author-avatar">{note.author[0]}</div>
          <div className="author-info">
            <div className="author-name">{note.author}</div>
            <div className="note-date">{formatDate(note.date)}</div>
          </div>
        </div>
        {onDelete && (
          <button 
            className="delete-note" 
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="note-content">
        {note.content}
      </div>
    </div>
  );
};

export default OrderNote;
