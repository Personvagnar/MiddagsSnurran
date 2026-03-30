import express from 'express';
import { deleteOldEntries } from '../cron/deleteOldCalendar.js';

const router = express.Router();

router.get('/cleanup', async (req, res) => {
    try {
        const result = await deleteOldEntries();
        res.json({message: 'Cleanup old dates', deletedCount: result.deletedCount});
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Cleanup failed', error: err.message});
    }
});

export default router;