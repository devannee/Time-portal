import { useState, useEffect } from 'react';
import { formatDateForAPI } from '../lib/dateUtils';

export function useTimeEntries(date) {
  const [data, setData] = useState({
    date: '',
    logs: [],
    totalMinutes: 0,
    sessions: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use utility function for consistent date formatting
  const dateString = formatDateForAPI(date);

  // Load data for the specified date
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/time-entries/${dateString}`);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      
      const result = await response.json();
      
      // Convert date strings back to Date objects
      result.logs = result.logs.map(log => ({
        ...log,
        checkIn: new Date(log.checkIn),
        checkOut: log.checkOut ? new Date(log.checkOut) : null
      }));
      
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error loading time entries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new entry
  const addEntry = async (entry) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/time-entries/${dateString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add entry');
      }
      
      // Reload data after adding
      await loadData();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error adding entry:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing entry
  const updateEntry = async (entryIndex, updatedEntry) => {
    setLoading(true);
    setError(null);
    
    try {
      const entryId = data.logs[entryIndex]?.id;
      if (!entryId) {
        throw new Error('Entry not found');
      }

      const response = await fetch(`/api/time-entries/entry/${entryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update entry');
      }
      
      // Reload data after updating
      await loadData();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error updating entry:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete an entry
  const deleteEntry = async (entryIndex) => {
    setLoading(true);
    setError(null);
    
    try {
      const entryId = data.logs[entryIndex]?.id;
      if (!entryId) {
        throw new Error('Entry not found');
      }

      const response = await fetch(`/api/time-entries/entry/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }
      
      // Reload data after deleting
      await loadData();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting entry:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load data when date changes
  useEffect(() => {
    loadData();
  }, [dateString]);

  return {
    data,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: loadData
  };
}
