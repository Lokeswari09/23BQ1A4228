// Mock notification data for frontend track
export const mockNotifications = [
  {
    id: "1",
    type: "Placement",
    message: "Microsoft Corporation hiring for Software Engineer",
    timestamp: "2026-06-04T23:22:16Z"
  },
  {
    id: "2",
    type: "Placement", 
    message: "Amazon.com Inc. hiring for Frontend Developer",
    timestamp: "2026-06-04T10:52:31Z"
  },
  {
    id: "3",
    type: "Result",
    message: "End semester results announced",
    timestamp: "2026-06-05T02:54:31Z"
  },
  {
    id: "4",
    type: "Event",
    message: "Tech Symposium 2026 - Register now!",
    timestamp: "2026-06-03T15:30:00Z"
  },
  {
    id: "5",
    type: "Placement",
    message: "Google hiring for Summer Internship 2026",
    timestamp: "2026-06-04T18:45:22Z"
  },
  {
    id: "6",
    type: "Result",
    message: "Mid-term exam results published",
    timestamp: "2026-06-04T09:15:00Z"
  },
  {
    id: "7",
    type: "Event",
    message: "Career Fair - Meet top recruiters",
    timestamp: "2026-06-02T11:00:00Z"
  },
  {
    id: "8",
    type: "Placement",
    message: "Meta Platforms Inc. hiring for 2026 batch",
    timestamp: "2026-06-04T05:56:01Z"
  },
  {
    id: "9",
    type: "Result",
    message: "Project presentation results out",
    timestamp: "2026-06-03T20:30:00Z"
  },
  {
    id: "10",
    type: "Event",
    message: "Hackathon 2026 - Team registration open",
    timestamp: "2026-06-01T10:00:00Z"
  }
];

// Priority calculation
export function getPriorityScore(notification) {
  // Weight: Placement=100, Result=50, Event=25
  let weightScore = 0;
  if (notification.type === "Placement") weightScore = 100;
  else if (notification.type === "Result") weightScore = 50;
  else if (notification.type === "Event") weightScore = 25;
  
  // Recency: newer = higher score
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

export function getTopNotifications(limit = 10) {
  return [...mockNotifications]
    .map(notif => ({
      ...notif,
      priorityScore: getPriorityScore(notif)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit);
}