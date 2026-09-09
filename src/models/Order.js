import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: String,   // snapshot at time of order
            price: Number,  // snapshot - products price could change later
            quantity: Number,
        },
    ],
    shippingAddress: {
        fullName: String,
        street: String,
        city: String,
        postalCode: String,
        country: String,
        phone: String,
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
}, { timestamps: true});

export default mongoose.model("Order", orderSchema);