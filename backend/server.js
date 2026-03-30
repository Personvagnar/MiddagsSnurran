import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js';
import calendarRouter from './routes/calendar.js';
import cleanupRouter from './routes/cleanup.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


app.use('/api/items', itemsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api', cleanupRouter);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected'))
.catch(err => console.error('Failed', err));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});