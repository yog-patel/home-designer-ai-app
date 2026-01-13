/**
 * User storage utilities for managing userId and usage data
 * Uses localStorage for offline-first approach
 */

import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'home_ai_user_id';
const USAGE_DATA_KEY = 'home_ai_usage_data';

/**
 * Get or create a unique user ID
 * @returns {string} UUID
 */
export function getUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
}

/**
 * Get cached usage data from localStorage
 * @returns {object} { designs_generated, is_premium, premium_expires_at }
 */
export function getLocalUsageData() {
  const data = localStorage.getItem(USAGE_DATA_KEY);
  return data ? JSON.parse(data) : null;
}

/**
 * Update cached usage data in localStorage
 * @param {object} data - Usage data to cache
 */
export function setLocalUsageData(data) {
  localStorage.setItem(USAGE_DATA_KEY, JSON.stringify(data));
}

/**
 * Get remaining free designs
 * @returns {number} Remaining free designs (0-3)
 */
export function getRemainingDesigns() {
  const usage = getLocalUsageData();
  if (!usage) return 3;
  if (usage.is_premium) return Infinity;
  return Math.max(0, 3 - usage.designs_generated);
}

/**
 * Check if user has hit free tier limit
 * @returns {boolean}
 */
export function isFreeTierExhausted() {
  const usage = getLocalUsageData();
  if (!usage) return false;
  if (usage.is_premium) return false;
  return usage.designs_generated >= 3;
}

/**
 * Check if premium subscription is active
 * @returns {boolean}
 */
export function isPremium() {
  const usage = getLocalUsageData();
  if (!usage || !usage.is_premium) return false;
  
  // Check if premium has expired
  if (usage.premium_expires_at) {
    const expiresAt = new Date(usage.premium_expires_at);
    if (new Date() > expiresAt) {
      return false;
    }
  }
  
  return true;
}

/**
 * Clear all user data (for testing)
 */
export function clearUserData() {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USAGE_DATA_KEY);
}
