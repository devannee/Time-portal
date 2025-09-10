import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function EditEntryModal({ entry, onSave, onCancel, isOpen, selectedDate, loading = false }) {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      if (entry) {
        setCheckInTime(format(entry.checkIn, 'HH:mm'));
        setCheckOutTime(entry.checkOut ? format(entry.checkOut, 'HH:mm') : '');
      } else {
        setCheckInTime('');
        setCheckOutTime('');
      }
    }
  }, [isOpen, entry]);

  const handleSave = () => {
    setError('');
    
    if (!checkInTime) {
      setError('Check-in time is required');
      return;
    }

    // Validate that check-out is after check-in
    if (checkInTime && checkOutTime) {
      const [inHours, inMinutes] = checkInTime.split(':').map(Number);
      const [outHours, outMinutes] = checkOutTime.split(':').map(Number);
      
      const inTime = inHours * 60 + inMinutes;
      const outTime = outHours * 60 + outMinutes;
      
      if (outTime <= inTime) {
        setError('Check-out time must be after check-in time');
        return;
      }
    }

    const baseDate = selectedDate || new Date();
    const [inHours, inMinutes] = checkInTime.split(':').map(Number);
    const checkIn = new Date(baseDate);
    checkIn.setHours(inHours, inMinutes, 0, 0);

    let checkOut = null;
    if (checkOutTime) {
      const [outHours, outMinutes] = checkOutTime.split(':').map(Number);
      checkOut = new Date(baseDate);
      checkOut.setHours(outHours, outMinutes, 0, 0);
    }

    onSave({
      checkIn,
      checkOut
    });
  };

  if (!isOpen) return null;

  const isEditing = !!entry;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">{isEditing ? 'Edit Entry' : 'Add New Entry'}</h3>
        
        {error && (
          <div className="error-message" style={{ 
            color: 'var(--color-text)', 
            background: '#fee', 
            padding: '8px', 
            borderRadius: '4px', 
            marginBottom: '16px' 
          }}>
            {error}
          </div>
        )}
        
        <div className="modal-form">
          <div className="form-group">
            <label className="form-label">Check-in Time:</label>
            <input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="form-input"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Check-out Time:</label>
            <input
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="form-input"
              disabled={loading}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
