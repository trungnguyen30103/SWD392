import React, { useState } from 'react';
import './DeleteConfirmation.scss';

const DeleteConfirmation = ({ itemName, itemType = 'item', onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = () => {
    setIsDeleting(true);
    // Add a small delay to simulate API call
    setTimeout(() => {
      onConfirm();
      setIsDeleting(false);
    }, 600);
  };

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <div className="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        
        <h3 className="modal-title">Delete {itemType}</h3>
        
        <p className="modal-message">
          Are you sure you want to delete <strong>"{itemName}"</strong>? 
          This action cannot be undone.
        </p>
        
        <div className="modal-actions">
          <button 
            className="btn-cancel" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            className="btn-delete" 
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="spinner"></span>
                Deleting...
              </>
            ) : (
              <>Delete {itemType}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
