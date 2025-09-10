import { useState, useEffect } from "react";
import { format, differenceInMinutes, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isAfter, isBefore, addMonths, subMonths } from "date-fns";
import { useTimeEntries } from "../hooks/useTimeEntriesHybrid";
import { useTheme } from "../contexts/ThemeContext";
import EditEntryModal from "./EditEntryModal";
import ThemeSelector from "./ThemeSelector";

export default function TimePortal({ onLogout, user, appMode = "local" }) {
  const [status, setStatus] = useState("Check-in");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEntry, setEditingEntry] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { data, loading, error, addEntry, updateEntry, deleteEntry, refresh } = useTimeEntries(selectedDate, appMode);
  
  const handleRefresh = () => {
    refresh();
  };

  const isToday = isSameDay(selectedDate, new Date());

  // Reset to today's date on component mount/refresh
  useEffect(() => {
    const today = new Date();
    // Don't set hours to 0 - this causes timezone issues
    console.log('Setting today to:', today, 'Date string:', today.toISOString().split('T')[0]);
    setSelectedDate(today);
    setCalendarDate(today);
  }, []);
  
  useEffect(() => {
    if (isToday) {
      // Only update status for today's entries
      const lastLog = data.logs[data.logs.length - 1];
      if (lastLog && !lastLog.checkOut) {
        setStatus("Check-out");
      } else {
        setStatus("Check-in");
      }
    }
  }, [data.logs, isToday]);
  
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setCalendarDate(newDate);
  };

  const handleCalendarDateClick = (date) => {
    const today = new Date();
    // Don't allow selecting future dates
    if (isAfter(date, today)) return;
    
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCalendarDate(subMonths(calendarDate, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(addMonths(calendarDate, 1));
  };

  const getCalendarDays = () => {
    const monthStart = startOfMonth(calendarDate);
    const monthEnd = endOfMonth(calendarDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Add padding days from previous month
    const startPadding = getDay(monthStart);
    const paddingDays = [];
    for (let i = startPadding - 1; i >= 0; i--) {
      const paddingDate = new Date(monthStart);
      paddingDate.setDate(paddingDate.getDate() - (i + 1));
      paddingDays.push(paddingDate);
    }
    
    // Add padding days from next month
    const endPadding = 6 - getDay(monthEnd);
    const endPaddingDays = [];
    for (let i = 1; i <= endPadding; i++) {
      const paddingDate = new Date(monthEnd);
      paddingDate.setDate(paddingDate.getDate() + i);
      endPaddingDays.push(paddingDate);
    }
    
    return [...paddingDays, ...days, ...endPaddingDays];
  };

  const handleCheckInOut = async () => {
    if (!isToday || actionLoading) return;
    
    setActionLoading(true);
    try {
      const now = new Date();
      const lastLog = data.logs[data.logs.length - 1];

      if (status === "Check-in") {
        // Create new entry
        const success = await addEntry({
          checkIn: now,
          checkOut: null
        });
        
        if (success) {
          setStatus("Check-out");
        } else {
          alert('Failed to check in. Please try again.');
        }
      } else {
        // Update last entry with check-out time
        if (lastLog && !lastLog.checkOut) {
          const success = await updateEntry(data.logs.length - 1, {
            checkIn: lastLog.checkIn,
            checkOut: now
          });
          
          if (success) {
            setStatus("Check-in");
          } else {
            alert('Failed to check out. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Check in/out error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEntry = async (index) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setActionLoading(true);
      try {
        const success = await deleteEntry(index);
        if (success) {
          // Reset status if we deleted the last ongoing session
          const newLastLog = data.logs[data.logs.length - 2]; // After deletion
          if (!newLastLog || newLastLog.checkOut) {
            setStatus("Check-in");
          }
        } else {
          alert('Failed to delete entry. Please try again.');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred while deleting. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleEditEntry = (index) => {
    setEditingEntry(index);
  };

  const handleSaveEdit = async (updatedEntry) => {
    setActionLoading(true);
    try {
      if (editingEntry === -1) {
        // Adding new entry
        const success = await addEntry(updatedEntry);
        if (success) {
          setEditingEntry(null);
        } else {
          alert('Failed to add entry. Please try again.');
        }
      } else if (editingEntry !== null) {
        // Updating existing entry
        const success = await updateEntry(editingEntry, updatedEntry);
        if (success) {
          setEditingEntry(null);
        } else {
          alert('Failed to update entry. Please try again.');
        }
      }
    } catch (error) {
      console.error('Save edit error:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getCurrentTotalMinutes = () => {
    const now = new Date();
    let hasMissPunch = false;
    
    const total = data.logs.reduce((total, log) => {
      if (!log.checkOut) {
        if (isToday) {
          // For today, use current time
          const checkOutTime = now;
          const minutes = differenceInMinutes(checkOutTime, log.checkIn);
          return total + Math.abs(minutes);
        } else {
          // For past dates, it's a miss-punch
          hasMissPunch = true;
          return total;
        }
      } else {
        const minutes = differenceInMinutes(log.checkOut, log.checkIn);
        return total + Math.abs(minutes);
      }
    }, 0);
    
    return { total, hasMissPunch };
  };


  // Helper: Get all available dates (working days) from data directory
  const getAllAvailableDates = () => {
    try {
      // This will only work in local mode (Node.js, not browser)
      // If you want this to work in browser, you need an API endpoint to fetch all dates
      // For now, we assume local mode and require context
      const context = require.context('../../data', false, /\\d{4}-\\d{2}-\\d{2}\\.json$/);
      return context.keys().map(key => key.replace('./', '').replace('.json', ''));
    } catch (e) {
      // Fallback: just use current date
      return [format(selectedDate, 'yyyy-MM-dd')];
    }
  };

  // Helper: Calculate total minutes for a given day's logs, including live session for today
  const getTotalMinutesForLogs = (logs, dateStr) => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const now = new Date();
    return logs.reduce((total, log) => {
      if (log.checkIn && log.checkOut) {
        return total + Math.abs(differenceInMinutes(new Date(log.checkOut), new Date(log.checkIn)));
      } else if (log.checkIn && !log.checkOut && dateStr === todayStr) {
        // Live session for today: use current time as checkOut
        return total + Math.abs(differenceInMinutes(now, new Date(log.checkIn)));
      }
      return total;
    }, 0);
  };

  // Helper: Get all working days in the current week (Mon-Sun)
  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ...
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDates.push(format(d, 'yyyy-MM-dd'));
    }
    return weekDates;
  };

  // Helper: Get all working days in the current month
  const getMonthDates = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    let monthDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      monthDates.push(format(new Date(d), 'yyyy-MM-dd'));
    }
    return monthDates;
  };

  // Calculate average hours for week
  const getAverageHours = () => {
    // Only count days with at least one completed or live session
    const weekDates = getWeekDates();
    let totalMinutes = 0;
    let workingDays = 0;
    weekDates.forEach(dateStr => {
      try {
        const logs = require(`../../data/${dateStr}.json`).logs;
        const minutes = getTotalMinutesForLogs(logs, dateStr);
        if (minutes > 0) {
          totalMinutes += minutes;
          workingDays++;
        }
      } catch {}
    });
    if (workingDays === 0) return 0;
    return totalMinutes / 60 / workingDays;
  };

  // Calculate average hours for month, but only if we're in week 2 or later
  const getAverageMonthlyHours = () => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    // Only show/calculate if we're in the 2nd week or later (day 8+)
    if (dayOfMonth < 8) return null;
    const monthDates = getMonthDates();
    let totalMinutes = 0;
    let workingDays = 0;
    monthDates.forEach(dateStr => {
      try {
        const logs = require(`../../data/${dateStr}.json`).logs;
        const minutes = getTotalMinutesForLogs(logs, dateStr);
        if (minutes > 0) {
          totalMinutes += minutes;
          workingDays++;
        }
      } catch {}
    });
    if (workingDays === 0) return 0;
    return totalMinutes / 60 / workingDays;
  };

  const getCurrentStatus = () => {
    if (!isToday) return "Viewing Past";
    
    const lastLog = data.logs[data.logs.length - 1];
    if (lastLog && !lastLog.checkOut) {
      return "Working";
    }
    return "Available";
  };

  if (loading) {
    return (
      <div className="time-portal-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="time-portal-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-xl text-red-600 mb-4">Error: {error}</div>
            <button onClick={handleRefresh} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="time-portal-container">
      {/* Theme Selector Button */}
      <button 
        onClick={() => setShowThemeSelector(!showThemeSelector)} 
        className="theme-toggle-btn"
        title="Change Theme"
      >
        🎨
      </button>
      
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle-btn"
        title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <div className="theme-modal-overlay" onClick={() => setShowThemeSelector(false)}>
          <div className="theme-modal-content" onClick={(e) => e.stopPropagation()}>
            <ThemeSelector />
            <button 
              onClick={() => setShowThemeSelector(false)}
              className="theme-modal-close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="time-portal-content">
        {/* Header */}
        <div className="time-portal-header">
          <div className="header-top">
            <h1 className="time-portal-title">Time Portal</h1>
            
            {user && appMode === "database" && (
              <div className="user-profile">
                <img 
                  src={user.image || '/default-avatar.png'} 
                  alt={user.name} 
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="logout-btn"
                  title="Sign out"
                >
                  🚪
                </button>
              </div>
            )}
            
            {appMode === "local" && onLogout && (
              <div className="user-profile">
                <button 
                  onClick={onLogout}
                  className="logout-btn"
                  title="Logout"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        
          <div className="header-subtitle">
            {(() => {
              const { total, hasMissPunch } = getCurrentTotalMinutes();
              if (hasMissPunch) {
                return (
                  <p className="time-portal-subtitle miss-punch">
                    Miss-Punch Detected
                  </p>
                );
              }
              return (
                <p className="time-portal-subtitle">
                  Total Time: {formatDuration(total)}
                </p>
              );
            })()}
            <button 
              onClick={handleRefresh} 
              className="refresh-btn" 
              title="Refresh live time"
              disabled={loading}
            >
              {loading ? '⏳' : '🔄'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="time-portal-main">
          {/* Calendar */}
          <div className="time-portal-card">
            <div className="calendar-header">
              <button className="calendar-nav-btn" onClick={handlePrevMonth}>
                <span>←</span>
              </button>
              <h2 className="calendar-title">{format(calendarDate, 'MMMM yyyy')}</h2>
              <button className="calendar-nav-btn" onClick={handleNextMonth}>
                <span>→</span>
              </button>
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              {getCalendarDays().map((date, index) => {
                const isCurrentMonth = date.getMonth() === calendarDate.getMonth();
                const isSelectedDate = isSameDay(date, selectedDate);
                const isTodayDate = isSameDay(date, new Date());
                const isFutureDate = isAfter(date, new Date());
                
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${
                      !isCurrentMonth ? 'calendar-day-prev' : ''
                    } ${
                      isSelectedDate ? 'calendar-day-selected' : ''
                    } ${
                      isTodayDate ? 'calendar-day-today' : ''
                    } ${
                      isFutureDate ? 'calendar-day-disabled' : ''
                    }`}
                    onClick={() => !isFutureDate && handleCalendarDateClick(date)}
                  >
                    {format(date, 'd')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logs */}
          <div className="time-portal-card">
            <div className="logs-header">
              <h2 className="logs-title">Logs</h2>
              {!isToday && (
                <button 
                  onClick={() => setEditingEntry(-1)} 
                  className="add-entry-btn"
                  title="Add new entry"
                  disabled={actionLoading}
                >
                  + Add Entry
                </button>
              )}
            </div>
            <div className="logs-list">
              {data.logs.length === 0 ? (
                <div className="no-entries">No entries for this date</div>
              ) : (
                data.logs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <div className="log-entry-content">
                      <span>
                        In: {format(log.checkIn, "hh:mm a")} | Out: {
                          log.checkOut 
                            ? format(log.checkOut, "hh:mm a")
                            : isToday 
                              ? format(new Date(), "hh:mm a") 
                              : "Miss-Punch"
                        }
                        {!log.checkOut && isToday && <span className="live-indicator">(Live)</span>}
                        {!log.checkOut && !isToday && <span className="miss-punch-indicator">(Miss-Punch)</span>}
                      </span>
                      <div className="log-entry-actions">
                        <button 
                          onClick={() => handleEditEntry(index)}
                          className="edit-btn"
                          title="Edit entry"
                          disabled={actionLoading}
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteEntry(index)}
                          className="delete-btn"
                          title="Delete entry"
                          disabled={actionLoading}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Check-in Button - Only show for today */}
        {isToday && (
          <div className="check-btn-container">
            <button 
              onClick={handleCheckInOut} 
              className="check-btn"
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : status}
            </button>
          </div>
        )}

        {/* Daily Summary */}
        <div className="daily-summary">
          <div className="summary-header">
            <div className="summary-icon"></div>
            <h3 className="summary-title">Daily Summary</h3>
          </div>
          
          <div className="summary-list">
            <div className="summary-row">
              <span className="summary-label">Total Hours Worked:</span>
              {(() => {
                const { total, hasMissPunch } = getCurrentTotalMinutes();
                if (hasMissPunch) {
                  return <span className="summary-value miss-punch">Miss-Punch</span>;
                }
                return <span className="summary-value summary-value-green">{formatDuration(total)}</span>;
              })()}
            </div>
            <div className="summary-row">
              <span className="summary-label">Average Hours (Week):</span>
              <span className="summary-value summary-value-blue">{getAverageHours().toFixed(2)}h</span>
            </div>
            {(() => {
              const avgMonth = getAverageMonthlyHours();
              if (avgMonth !== null) {
                return (
                  <div className="summary-row">
                    <span className="summary-label">Average Monthly Hours:</span>
                    <span className="summary-value summary-value-blue">{avgMonth.toFixed(2)}h</span>
                  </div>
                );
              }
              return null;
            })()}
            <div className="summary-row">
              <span className="summary-label">Current Status:</span>
              <div className="status-indicator">
                <div className={`status-dot ${getCurrentStatus() === 'Available' ? 'status-dot-green' : getCurrentStatus() === 'Working' ? 'status-dot-yellow' : 'status-dot-gray'}`}></div>
                <span className={getCurrentStatus() === 'Available' ? 'status-text-green' : getCurrentStatus() === 'Working' ? 'status-text-yellow' : 'status-text-gray'}>
                  {getCurrentStatus()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditEntryModal
        entry={editingEntry !== null && editingEntry !== -1 ? data.logs[editingEntry] : null}
        isOpen={editingEntry !== null}
        onSave={handleSaveEdit}
        onCancel={() => setEditingEntry(null)}
        selectedDate={selectedDate}
        loading={actionLoading}
      />
    </div>
  );
 
}