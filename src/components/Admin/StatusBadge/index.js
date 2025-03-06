import React from 'react';
import './StatusBadge.scss';

const StatusBadge = ({ status }) => {
  // Get the appropriate class name based on status
  const getBadgeClass = () => {
    switch (status) {
      case 'pending':
        return 'status-badge-pending';
      case 'processing':
        return 'status-badge-processing';
      case 'delivered':
        return 'status-badge-delivered';
      case 'cancelled':
        return 'status-badge-cancelled';
      case 'refunded':
        return 'status-badge-cancelled';
      case 'paid':
        return 'status-badge-delivered';
      case 'shipped':
        return 'status-badge-processing';
      default:
        return 'status-badge-default';
    }
  };

  // Format the status text for display (capitalize first letter)
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={`status-badge ${getBadgeClass()}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
