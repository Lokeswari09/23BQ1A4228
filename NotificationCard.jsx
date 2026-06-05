import React from 'react';
import './NotificationCard.css';

const getCategoryColor = (type) => {
  const colors = {
    'Placement': '#4CAF50',
    'Result': '#FF9800',
    'Event': '#2196F3'
  };
  return colors[type] || '#666';
};

const getCategoryIcon = (type) => {
  const icons = {
    'Placement': '💼',
    'Result': '📊',
    'Event': '🎉'
  };
  return icons[type] || '📌';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

const NotificationCard = ({ notification, rank }) => {
  const isTop3 = rank <= 3;
  
  return (
    <div className={`notification-card ${isTop3 ? 'top-priority' : ''}`}>
      <div className="card-rank" style={{ backgroundColor: getCategoryColor(notification.type) }}>
        #{rank}
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="category-badge" style={{ backgroundColor: getCategoryColor(notification.type) }}>
            {getCategoryIcon(notification.type)} {notification.type}
          </span>
          <span className="timestamp">
            {formatDate(notification.timestamp)}
          </span>
        </div>
        <p className="message">{notification.message}</p>
        {isTop3 && <div className="priority-badge">🔥 High Priority</div>}
      </div>
    </div>
  );
};

export default NotificationCard;