const fs = require('fs');
const path = require('path');

// Fix timezone issue in existing JSON files
function fixTimezoneInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File ${filePath} does not exist`);
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log('Original data:', JSON.stringify(data, null, 2));
    
    // Fix each log entry
    data.logs = data.logs.map(log => {
      const checkIn = new Date(log.checkIn);
      const checkOut = log.checkOut ? new Date(log.checkOut) : null;
      
      // Convert from UTC to IST (add 5:30 hours)
      const istCheckIn = new Date(checkIn.getTime() + (5.5 * 60 * 60 * 1000));
      const istCheckOut = checkOut ? new Date(checkOut.getTime() + (5.5 * 60 * 60 * 1000)) : null;
      
      console.log(`Original check-in: ${checkIn.toISOString()} -> IST: ${istCheckIn.toLocaleString('en-IN')}`);
      if (checkOut) {
        console.log(`Original check-out: ${checkOut.toISOString()} -> IST: ${istCheckOut.toLocaleString('en-IN')}`);
      }
      
      return {
        ...log,
        checkIn: istCheckIn.toISOString(),
        checkOut: istCheckOut ? istCheckOut.toISOString() : null
      };
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Fixed timezone for ${filePath}`);
    
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
  }
}

// Fix current file
const currentFile = path.join(__dirname, 'data', '2025-08-05.json');
fixTimezoneInFile(currentFile);

console.log('\n🎯 Timezone fix complete!');
console.log('Your times should now show in Indian timezone.');
console.log('Refresh your Time Portal to see the changes.');
