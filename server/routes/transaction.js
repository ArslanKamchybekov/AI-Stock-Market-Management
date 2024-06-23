import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Create a transaction -- this is what i added (not from video)
router.post("/transactions", async (req, res) => {
    try {
        const transaction = new TRANSACTION(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Read all transactions
router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Read a transaction by ID -- this is what i added (not from video)
router.get("/transactions/:id", async (req, res) => {
    try {
        const transaction = await TRANSACTION.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "TRANSACTION not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update a transaction by ID -- this is what i added (not from video) 
router.patch("/transactions/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'buyer',
        'amount',
        'productIds',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const transaction = await TRANSACTION.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "TRANSACTION not found" });
        }

        updates.forEach(update => transaction[update] = req.body[update]);
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a transaction by ID -- this is what i added (not from video) 
router.delete("/transactions/:id", async (req, res) => {
    try {
        const transaction = await TRANSACTION.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "TRANSACTION not found" });
        }
        res.status(200).json({ message: "TRANSACTION deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; // FROM VIDEO