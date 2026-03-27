// cron/cronJob.js
import cron from 'node-cron';
import { connectDB, deleteOldEntries } from './deleteOldCalendar.js';

// Kör varje dag kl 03
cron.schedule('0 03 * * *', async () => {
  console.log('Running scheduled cleanup...');
  await connectDB();
  await deleteOldEntries();
});