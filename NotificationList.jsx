import React from 'react';
import NotificationCard from './NotificationCard';
import './NotificationList.css';

const NotificationList = ({ notifications, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading priority notifications...</p>
      </div>
    );
  }
  
  if (!notifications || notifications.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No notifications found</p>
      </div>
    );
  }
  
  return (
    <div className="notification-list">
      <div className="list-header">
        <h3>Priority Notifications</h3>
        <span className="count-badge">{notifications.length} items</span>
      </div>
      <div className="notifications-container">
        {notifications.map((notification, index) => (
          <NotificationCard 
            key={notification.id}
            notification={notification}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;