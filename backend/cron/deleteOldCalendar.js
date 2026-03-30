// cron/deleteOldCalendar.js
import Calendar from '../models/Calendar.js';
import 'dotenv/config';

const DAYS_TO_KEEP = 30;

export async function deleteOldEntries() {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - DAYS_TO_KEEP);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    const result = await Calendar.deleteMany({ date: { $lt: cutoffStr } });
    console.log(`Deleted ${result.deletedCount} calendar entries older than ${DAYS_TO_KEEP} days.`);
    return result;
  } catch (err) {
    console.error('Failed to delete old calendar entries', err);
    throw err;
  }
}