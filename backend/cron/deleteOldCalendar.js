// cron/deleteOldCalendar.js
import mongoose from 'mongoose';
import Calendar from '../models/Calendar.js';
import 'dotenv/config';

const DAYS_TO_KEEP = 30;

// Funktion som raderar gamla poster
export async function deleteOldEntries() {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - DAYS_TO_KEEP);
    const cutoffStr = cutoff.toISOString().split('T')[0]; // yyyy-mm-dd
    const result = await Calendar.deleteMany({ date: { $lt: cutoffStr } });
    console.log(`Deleted ${result.deletedCount} calendar entries older than ${DAYS_TO_KEEP} days.`);
  } catch (err) {
    console.error('Failed to delete old calendar entries', err);
  }
}

// Koppla upp mot MongoDB
export async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  }
}