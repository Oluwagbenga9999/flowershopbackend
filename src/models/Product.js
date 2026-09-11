import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["flower", "planter"], required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: { type: [String], default: [] }, // array of Cloudinary URLs
    stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Product", productSchema)