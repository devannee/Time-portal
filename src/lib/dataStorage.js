import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

// Data directory path
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
export function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Get file path for a specific date
export function getDateFilePath(date) {
  const dateStr = format(date, 'yyyy-MM-dd');
  return path.join(DATA_DIR, `${dateStr}.json`);
}

// Load daily data for a specific date
export function loadDailyData(date) {
  try {
    ensureDataDirectory();
    const filePath = getDateFilePath(date);
    
    if (!fs.existsSync(filePath)) {
      return {
        date: format(date, 'yyyy-MM-dd'),
        logs: [],
        totalMinutes: 0,
        sessions: 0
      };
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Convert date strings back to Date objects
    data.logs = data.logs.map(log => ({
      ...log,
      checkIn: new Date(log.checkIn),
      checkOut: log.checkOut ? new Date(log.checkOut) : null
    }));
    
    return data;
  } catch (error) {
    console.error('Error loading daily data:', error);
    return {
      date: format(date, 'yyyy-MM-dd'),
      logs: [],
      totalMinutes: 0,
      sessions: 0
    };
  }
}

// Save daily data for a specific date
export function saveDailyData(date, data) {
  try {
    ensureDataDirectory();
    const filePath = getDateFilePath(date);
    
    // Prepare data for JSON serialization
    const dataToSave = {
      ...data,
      date: format(date, 'yyyy-MM-dd'),
      logs: data.logs.map(log => ({
        ...log,
        checkIn: log.checkIn.toISOString(),
        checkOut: log.checkOut ? log.checkOut.toISOString() : null
      }))
    };
    
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving daily data:', error);
    return false;
  }
}

// Get all available dates (file names)
export function getAvailableDates() {
  try {
    ensureDataDirectory();
    const files = fs.readdirSync(DATA_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
      .sort()
      .reverse(); // Most recent first
  } catch (error) {
    console.error('Error getting available dates:', error);
    return [];
  }
}

// Delete a specific entry from a date
export function deleteEntry(date, entryIndex) {
  try {
    const data = loadDailyData(date);
    if (entryIndex >= 0 && entryIndex < data.logs.length) {
      data.logs.splice(entryIndex, 1);
      
      // Recalculate totals
      data.totalMinutes = calculateTotalMinutes(data.logs);
      data.sessions = data.logs.length;
      
      return saveDailyData(date, data);
    }
    return false;
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
}

// Update a specific entry
export function updateEntry(date, entryIndex, updatedEntry) {
  try {
    const data = loadDailyData(date);
    if (entryIndex >= 0 && entryIndex < data.logs.length) {
      data.logs[entryIndex] = {
        ...updatedEntry,
        checkIn: new Date(updatedEntry.checkIn),
        checkOut: updatedEntry.checkOut ? new Date(updatedEntry.checkOut) : null
      };
      
      // Recalculate totals
      data.totalMinutes = calculateTotalMinutes(data.logs);
      data.sessions = data.logs.length;
      
      return saveDailyData(date, data);
    }
    return false;
  } catch (error) {
    console.error('Error updating entry:', error);
    return false;
  }
}

// Helper function to calculate total minutes
function calculateTotalMinutes(logs) {
  return logs.reduce((total, log) => {
    if (log.checkOut) {
      const diff = Math.abs(log.checkOut.getTime() - log.checkIn.getTime());
      return total + Math.floor(diff / (1000 * 60));
    }
    return total;
  }, 0);
}
