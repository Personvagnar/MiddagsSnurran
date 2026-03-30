import express from "express";
import Calendar from "../models/Calendar.js";
import { deleteOldEntries } from "../cron/deleteOldCalendar.js";

const router = express.Router();

let lastCleanup = 0;

async function cleanup() {
  const now = Date.now();
  // max en gång per dag
  if (now - lastCleanup < 1000 * 60 * 60 * 24) return;
  lastCleanup = now;

  const result = await deleteOldEntries();
  console.log(`Automatic cleanup done, deleted ${result.deletedCount} entries`);
}

router.post("/", async (req, res) => {
  try {
    const { date, itemId } = req.body;

    if (!date || !itemId) {
      return res.status(400).json({ error: "Both date and itemId are required" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Date must be in YYYY-MM-DD format" });
    }

    const existing = await Calendar.findOne({ date });
    if (existing) {
      return res.status(400).json({ error: "This date already has an item assigned" });
    }

    const newEntry = await Calendar.create({ date, itemId });

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    await cleanup();
    const entries = await Calendar.find({}).populate('itemId');
    res.json(entries);
  } catch(err) {
    res.status(500).json({ error: err.message});
  }
});

//get by date
router.get("/:date", async (req, res) => {
  try {
    const entry = await Calendar.findOne({ date: req.params.date })
      .populate("itemId");
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:date", async (req, res) => {
  try {
    await Calendar.findOneAndDelete({ date: req.params.date });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ error: "itemId is required" });

    // Update only itemId, do not change date
    const updated = await Calendar.findByIdAndUpdate(
      req.params.id,
      { itemId },
      { returnDocument: "after", runValidators: true }
    ).populate("itemId");

    if (!updated) return res.status(404).json({ error: "Calendar entry not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(itemId)
  }
});

export default router;