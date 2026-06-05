import React, { useState, useEffect } from 'react';
import './App.css';

// Mock notification data
const MOCK_NOTIFICATIONS = [
  { id: "1", type: "Placement", message: "Microsoft Corporation hiring for Software Engineer", timestamp: "2026-06-04T23:22:16Z" },
  { id: "2", type: "Placement", message: "Amazon.com Inc. hiring for Frontend Developer", timestamp: "2026-06-04T10:52:31Z" },
  { id: "3", type: "Result", message: "End semester results announced", timestamp: "2026-06-05T02:54:31Z" },
  { id: "4", type: "Event", message: "Tech Symposium 2026 - Register now!", timestamp: "2026-06-03T15:30:00Z" },
  { id: "5", type: "Placement", message: "Google hiring for Summer Internship 2026", timestamp: "2026-06-04T18:45:22Z" },
  { id: "6", type: "Result", message: "Mid-term exam results published", timestamp: "2026-06-04T09:15:00Z" },
  { id: "7", type: "Event", message: "Career Fair - Meet top recruiters", timestamp: "2026-06-02T11:00:00Z" },
  { id: "8", type: "Placement", message: "Meta Platforms Inc. hiring for 2026 batch", timestamp: "2026-06-04T05:56:01Z" },
  { id: "9", type: "Result", message: "Project presentation results out", timestamp: "2026-06-03T20:30:00Z" },
  { id: "10", type: "Event", message: "Hackathon 2026 - Team registration open", timestamp: "2026-06-01T10:00:00Z" },
];

// Calculate priority score
function getPriorityScore(notification) {
  let weightScore = 0;
  if (notification.type === "Placement") weightScore = 100;
  else if (notification.type === "Result") weightScore = 50;
  else if (notification.type === "Event") weightScore = 25;
  
  const notifTime = new Date(notification.timestamp).getTime();
  const now = new Date().getTime();
  const hoursDiff = (now - notifTime) / (1000 * 60 * 60);
  
  let recencyScore = 0;
  if (hoursDiff <= 1) recencyScore = 50;
  else if (hoursDiff <= 6) recencyScore = 30;
  else if (hoursDiff <= 12) recencyScore = 20;
  else if (hoursDiff <= 24) recencyScore = 10;
  
  return weightScore + recencyScore;
}

// Get top N notifications
function getTopNotifications(notifications, limit) {
  return [...notifications]
    .map(notif => ({ ...notif, priorityScore: getPriorityScore(notif) }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit);
}

// Format time
function formatTimeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

// Notification Card Component
function NotificationCard({ notification, rank }) {
  const isTop3 = rank <= 3;
  const colors = { Placement: '#4CAF50', Result: '#FF9800', Event: '#2196F3' };
  const icons = { Placement: '💼', Result: '📊', Event: '🎉' };
  
  return (
    <div className={`notification-card ${isTop3 ? 'top-priority' : ''}`}>
      <div className="card-rank" style={{ backgroundColor: colors[notification.type] || '#666' }}>
        #{rank}
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="category-badge" style={{ backgroundColor: colors[notification.type] || '#666' }}>
            {icons[notification.type] || '📌'} {notification.type}
          </span>
          <span className="timestamp">{formatTimeAgo(notification.timestamp)}</span>
        </div>
        <p className="message">{notification.message}</p>
        {isTop3 && <div className="priority-badge">🔥 High Priority</div>}
      </div>
    </div>
  );
}

// Priority Selector Component
function PrioritySelector({ value, onChange }) {
  const options = [10, 15, 20, 25, 30];
  
  return (
    <div className="priority-selector">
      <label className="selector-label">
        📊 Show Top
        <select value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        Notifications
      </label>
    </div>
  );
}

// Main App Component
function App() {
  const [notifications, setNotifications] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const topNotifs = getTopNotifications(MOCK_NOTIFICATIONS, limit);
      setNotifications(topNotifs);
      setLoading(false);
    }, 500);
  }, [limit]);

  return (
    <div className="app">
      <header className="header">
        <h1>📬 Campus Priority Inbox</h1>
        <p>Top priority notifications based on importance and recency</p>
      </header>
      
      <main className="main">
        <PrioritySelector value={limit} onChange={setLimit} />
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading priority notifications...</p>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}

export default App;
