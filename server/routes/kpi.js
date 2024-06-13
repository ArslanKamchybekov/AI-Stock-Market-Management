import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

// Create a KPI
router.post("/kpis", async (req, res) => {
    try {
        const kpi = new KPI(req.body);
        await kpi.save();
        res.status(201).json(kpi);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all KPIs
router.get("/kpis", async (req, res) => {
    try {
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Read a KPI by ID
router.get("/kpis/:id", async (req, res) => {
    try {
        const kpi = await KPI.findById(req.params.id);
        if (!kpi) {
            return res.status(404).json({ message: "KPI not found" });
        }
        res.status(200).json(kpi);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update a KPI by ID
router.patch("/kpis/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'totalProfit',
        'totalRevenue',
        'totalExpenses',
        'expensesByCategory',
        'monthlyData',
        'dailyData',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const kpi = await KPI.findById(req.params.id);
        if (!kpi) {
            return res.status(404).json({ message: "KPI not found" });
        }

        updates.forEach(update => kpi[update] = req.body[update]);
        await kpi.save();
        res.status(200).json(kpi);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a KPI by ID
router.delete("/kpis/:id", async (req, res) => {
    try {
        const kpi = await KPI.findByIdAndDelete(req.params.id);
        if (!kpi) {
            return res.status(404).json({ message: "KPI not found" });
        }
        res.status(200).json({ message: "KPI deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
