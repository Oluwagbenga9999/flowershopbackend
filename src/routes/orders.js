import express from "express";
import Order from "../models/Order.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/orders — admin sees all orders, not just their own
router.get("/", requireAuth, requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Create an order from the current cart
router.post("/", requireAuth, async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const order = await Order.create({
            user: req.userId,
            items,
            shippingAddress,
            totalPrice,
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Get logged-in user's order history
router.get("/mine", requireAuth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("ORDER HISTORY ERROR:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

export default router;