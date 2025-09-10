/**
 * Utility functions for consistent date handling across the app
 */

/**
 * Convert a Date object to YYYY-MM-DD string in local timezone
 * @param {Date} date - The date to convert
 * @returns {string} - Date string in YYYY-MM-DD format
 */
export function formatDateForAPI(date) {
  // Use local date components to avoid timezone conversion issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const result = `${year}-${month}-${day}`;
  console.log('formatDateForAPI input:', date.toLocaleString('en-IN'), 'output:', result);
  return result;
}

/**
 * Create a Date object with local time but without timezone conversion
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @param {string} timeStr - Time string (HH:mm)
 * @returns {Date} - Date object in local timezone
 */
export function createLocalDateTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

/**
 * Format a Date object to local time string (HH:mm)
 * @param {Date} date - The date to format
 * @returns {string} - Time string in HH:mm format
 */
export function formatTimeForDisplay(date) {
  if (!date) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Convert UTC timestamp to local timezone for display
 * @param {string} utcTimestamp - UTC timestamp string
 * @returns {Date} - Date object in local timezone
 */
export function convertUTCToLocal(utcTimestamp) {
  return new Date(utcTimestamp);
}

/**
 * Get today's date as a Date object at start of day
 * @returns {Date} - Today's date at 00:00:00
 */
export function getTodayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Check if two dates are the same day (ignoring time)
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} - True if same day
 */
export function isSameLocalDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Parse a date string (YYYY-MM-DD) to a Date object in local timezone
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {Date} - Date object
 */
export function parseDateFromAPI(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
