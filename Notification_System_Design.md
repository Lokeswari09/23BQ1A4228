# Notification System Design - Priority Inbox

## Priority Algorithm

### Weightage Scoring
- **Placement**: 100 points
- **Result**: 50 points
- **Event**: 25 points

### Recency Scoring
- Last 1 hour: +50 points
- Last 6 hours: +30 points
- Last 12 hours: +20 points
- Last 24 hours: +10 points

### Final Score = Weightage + Recency

## Efficient Top-N Maintenance
Using Min-Heap data structure:
- Insertion: O(log N)
- Space: O(N)

## API Endpoint
`GET /api/notifications/top?limit=10`

## Screenshots
- Desktop view: `screenshots/desktop.png`
- Mobile view: `screenshots/mobile.png`