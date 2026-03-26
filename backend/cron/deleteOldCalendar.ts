import cron from 'node-cron';
import Calendar from '../models/Calendar.js'
import mongoose from 'mongoose';
import 'dotenv/config';

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error('mongo url inte definerad');
}

// Hur många dagar bakåt som ska raderas
const DAYS_TO_KEEP = 30;

// Funktion som raderar gamla poster
async function deleteOldEntries() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP);

    const result = await Calendar.deleteMany({ date: { $lt: cutoffDate.toISOString().split('T')[0] } });
    console.log(`Deleted ${result.deletedCount} calendar entries older than ${DAYS_TO_KEEP} days.`);
  } catch (err) {
    console.error('Failed to delete old calendar entries', err);
  }
}


// Schemalägg cron-jobb (kör varje dag kl 14:00)
cron.schedule('0 14 * * *', async () => {
  console.log('Running scheduled cleanup of old calendar entries...');
  // Om du behöver ansluta till MongoDB här:
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUrl)
  }
  await deleteOldEntries();
});

export { deleteOldEntries };