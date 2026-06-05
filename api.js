import { getTopNotifications } from './notifications';

export const fetchNotifications = async (limit = 10) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data instead of calling real API
  return getTopNotifications(limit);
};