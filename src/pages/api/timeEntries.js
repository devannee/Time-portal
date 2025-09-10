import { loadDailyData, saveDailyData, deleteEntry, updateEntry } from '../../lib/dataStorage';
import { differenceInMinutes } from 'date-fns';

export default function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    case 'PUT':
      handlePut(req, res);
      break;
    case 'DELETE':
      handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/timeEntries?date=2025-07-16
function handleGet(req, res) {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }
    
    const data = loadDailyData(new Date(date));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in GET /api/timeEntries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/timeEntries - Add new entry
function handlePost(req, res) {
  try {
    const { date, entry } = req.body;
    
    if (!date || !entry) {
      return res.status(400).json({ error: 'Date and entry are required' });
    }
    
    const currentDate = new Date(date);
    const data = loadDailyData(currentDate);
    
    // Create new entry with proper local timezone handling
    const newEntry = {
      checkIn: new Date(entry.checkIn),
      checkOut: entry.checkOut ? new Date(entry.checkOut) : null
    };
    
  // No timezone offset correction needed; store as-is from frontend
    
    data.logs.push(newEntry);
    
    // Recalculate totals
    data.totalMinutes = calculateTotalMinutes(data.logs);
    data.sessions = data.logs.length;
    
    const success = saveDailyData(currentDate, data);
    
    if (success) {
      res.status(201).json(data);
    } else {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } catch (error) {
    console.error('Error in POST /api/timeEntries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT /api/timeEntries - Update existing entry
function handlePut(req, res) {
  try {
    const { date, entryIndex, entry } = req.body;
    
    if (!date || entryIndex === undefined || !entry) {
      return res.status(400).json({ error: 'Date, entryIndex, and entry are required' });
    }
    
    const success = updateEntry(new Date(date), entryIndex, entry);
    
    if (success) {
      const updatedData = loadDailyData(new Date(date));
      res.status(200).json(updatedData);
    } else {
      res.status(500).json({ error: 'Failed to update entry' });
    }
  } catch (error) {
    console.error('Error in PUT /api/timeEntries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/timeEntries - Delete entry
function handleDelete(req, res) {
  try {
    const { date, entryIndex } = req.body;
    
    if (!date || entryIndex === undefined) {
      return res.status(400).json({ error: 'Date and entryIndex are required' });
    }
    
    const success = deleteEntry(new Date(date), entryIndex);
    
    if (success) {
      const updatedData = loadDailyData(new Date(date));
      res.status(200).json(updatedData);
    } else {
      res.status(500).json({ error: 'Failed to delete entry' });
    }
  } catch (error) {
    console.error('Error in DELETE /api/timeEntries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to calculate total minutes
function calculateTotalMinutes(logs) {
  return logs.reduce((total, log) => {
    if (log.checkOut) {
      const minutes = differenceInMinutes(log.checkOut, log.checkIn);
      return total + Math.abs(minutes);
    }
    return total;
  }, 0);
}
