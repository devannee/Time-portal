// Simple script to manually add today's entries with correct Indian timezone
const fs = require('fs');
const path = require('path');

const today = new Date();
const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format

// Helper function to create Indian timezone date
function createISTDate(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // Create date in local timezone (Indian time)
  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return date;
}

// Your requested entries for today
const entries = [
  {
    checkIn: createISTDate(todayString, '10:34'),
    checkOut: createISTDate(todayString, '10:37')
  },
  {
    checkIn: createISTDate(todayString, '10:37'),
    checkOut: createISTDate(todayString, '10:37')
  },
  {
    checkIn: createISTDate(todayString, '10:37'),
    checkOut: createISTDate(todayString, '10:43')
  },
  {
    checkIn: createISTDate(todayString, '10:43'),
    checkOut: createISTDate(todayString, '10:43')
  },
  {
    checkIn: createISTDate(todayString, '10:43'),
    checkOut: null // Active session
  }
];

// Calculate total minutes
const totalMinutes = entries.reduce((total, entry) => {
  if (entry.checkOut) {
    const minutes = Math.abs(entry.checkOut - entry.checkIn) / (1000 * 60);
    return total + minutes;
  }
  return total;
}, 0);

// Create the data structure
const todayData = {
  date: todayString,
  logs: entries.map(entry => ({
    checkIn: entry.checkIn.toISOString(),
    checkOut: entry.checkOut ? entry.checkOut.toISOString() : null
  })),
  totalMinutes: Math.floor(totalMinutes),
  sessions: entries.length
};

// Write to today's file
const filePath = path.join(__dirname, 'data', `${todayString}.json`);
fs.writeFileSync(filePath, JSON.stringify(todayData, null, 2));

console.log('✅ Today\'s entries created successfully!');
console.log(`📁 File: ${filePath}`);
console.log(`📊 Entries: ${entries.length}`);
console.log(`⏱️ Total time: ${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`);
console.log('\n📋 Entries created:');
entries.forEach((entry, i) => {
  const checkIn = entry.checkIn.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const checkOut = entry.checkOut ? entry.checkOut.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit' }) : 'Active';
  console.log(`${i + 1}. ${checkIn} → ${checkOut}`);
});
console.log('\n🔄 Refresh your Time Portal to see the entries!');
