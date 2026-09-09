import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  { name: "Peace Lily", type: "planter", price: 24.99, stock: 15, description: "Air-purifying, low-light plant.", image: "" },
  { name: "Red Rose Bouquet", type: "flower", price: 34.99, stock: 30, description: "A dozen fresh-cut roses.", image: "" },
  { name: "Terracotta Pot (Medium)", type: "planter", price: 12.5, stock: 40, description: "Classic clay planter, 8in diameter.", image: "" },
  { name: "Snake Plant", type: "planter", price: 19.99, stock: 22, description: "Hardy, upright leaves; thrives on neglect.", image: "" },
  { name: "Sunflower Bunch", type: "flower", price: 22.50, stock: 18, description: "Bright cheerful stems, 8–10 blooms.", image: "" },
  { name: "Ceramic Planter (White)", type: "planter", price: 18.00, stock: 25, description: "Minimalist glazed pot with drainage hole.", image: "" },
  { name: "Lavender Bundle", type: "flower", price: 16.99, stock: 35, description: "Fragrant dried-style stems for vases or gifts.", image: "" },
  { name: "Monstera Deliciosa", type: "planter", price: 39.99, stock: 8, description: "Iconic split-leaf tropical plant.", image: "" },
  { name: "Tulip Mix (10 stems)", type: "flower", price: 27.99, stock: 20, description: "Assorted spring colors, fresh-cut.", image: "" },
  { name: "Hanging Macrame Planter", type: "planter", price: 14.75, stock: 28, description: "Boho-style hanger with small pot included.", image: "" },
  { name: "Orchid (Phalaenopsis)", type: "planter", price: 29.99, stock: 12, description: "Elegant long-lasting blooms in white or pink.", image: "" },
  { name: "Daisy Bouquet", type: "flower", price: 19.50, stock: 32, description: "Cheerful white and yellow daisies.", image: "" },
  { name: "Succulent Assortment (3)", type: "planter", price: 15.99, stock: 45, description: "Easy-care mini succulents in matching pots.", image: "" },
  { name: "Peony Arrangement", type: "flower", price: 42.00, stock: 10, description: "Lush seasonal peonies in soft pastels.", image: "" },
  { name: "Concrete Planter (Large)", type: "planter", price: 32.50, stock: 14, description: "Modern industrial-style pot, 10in.", image: "" },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Seeded products ✅");
    process.exit();    
}

seed()