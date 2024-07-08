import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Create a PRODUCT
router.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Read a PRODUCT by ID
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "PRODUCT not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update a PRODUCT by ID
router.patch("/products/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'price',
        'expense',
        'transactions',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "PRODUCT not found" });
        }

        updates.forEach(update => product[update] = req.body[update]);
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a PRODUCT by ID
router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "PRODUCT not found" });
        }
        res.status(200).json({ message: "PRODUCT deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
