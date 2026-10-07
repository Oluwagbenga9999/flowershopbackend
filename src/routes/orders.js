import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
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

// GET /api/orders/:id — user can fetch their own order, admin can fetch any
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const currentUser = await User.findById(req.userId).select("role");
        const isAdmin = currentUser && currentUser.role === "admin";

        if (order.user.toString() !== req.userId && !isAdmin) {
            return res.status(403).json({ error: "Not authorized to view this order" });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch order" });
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

export default router;