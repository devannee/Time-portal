// Debug script to check why wrong date is being called
console.log('Current system info:');
console.log('Date now:', new Date());
console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('UTC Offset:', new Date().getTimezoneOffset(), 'minutes');

const today = new Date();
console.log('Today object:', today);
console.log('Today ISO:', today.toISOString());
console.log('Today local date string:', today.toLocaleDateString());
console.log('Today date only:', today.toISOString().split('T')[0]);

// Check if date conversion is causing issues
const testDate = new Date();
testDate.setHours(0, 0, 0, 0);
console.log('Test date with zero time:', testDate);
console.log('Test date ISO:', testDate.toISOString());
console.log('Test date API format:', testDate.toISOString().split('T')[0]);

// Check what happens when we click calendar
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const apiFormat = `${year}-${month}-${day}`;
console.log('Manual API format:', apiFormat);

// The issue might be timezone offset causing date to shift
console.log('\n🔍 Timezone Analysis:');
const utcOffset = today.getTimezoneOffset(); // Minutes behind UTC
console.log('UTC Offset:', utcOffset, 'minutes');
console.log('IST should be -330 minutes (5.5 hours ahead of UTC)');

if (utcOffset !== -330) {
  console.log('⚠️ Your system timezone might not be set to IST!');
  console.log('Current timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
} else {
  console.log('✅ System timezone is correctly set to IST');
}
