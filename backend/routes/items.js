import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.statu(400).json({ error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
})

export default router;