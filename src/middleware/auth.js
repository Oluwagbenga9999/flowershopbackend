import jwt from "jsonwebtoken";
import User from "../models/User.js";



export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
         res.status(401).json({ error: "Invalid or expired token" });
    }
}


// New: looks up the user fresh on every request, so a role change
// takes effect immediately without needing a new token.
export async function requireAdmin(req, res, next) {
    try {
        const user = await User.findById(req.userId).select("role");
        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: "Failed to verify admin access" });
    }
}