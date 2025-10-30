import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;

// 🔗 Connect MongoDB (local)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected locally"))
  .catch((err) => console.log("❌ DB Error:", err));

// 🧱 Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// 🧺 Cart Schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

// 📦 Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const newProd = new Product({ name, price });
    await newProd.save();
    res.json(newProd);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const cart = await CartItem.find().populate("productId");
    const total = cart.reduce((sum, item) => {
      return item.productId ? sum + item.productId.price * item.qty : sum;
    }, 0);
    res.json({ cart, total });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty <= 0) {
      return res.status(400).json({ error: 'Valid productId and quantity are required' });
    }
    
    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ productId });
    
    if (existingItem) {
      // Update quantity if item exists
      existingItem.qty += qty;
      await existingItem.save();
      res.json(existingItem);
    } else {
      // Create new item if it doesn't exist
      const newItem = new CartItem({ productId, qty });
      await newItem.save();
      res.json(newItem);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const result = await CartItem.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: "Item removed" });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

app.delete("/api/cart", async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
    const receipt = {
      total,
      timestamp: new Date(),
    };
    await CartItem.deleteMany();
    res.json(receipt);
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// 🧪 Seed products (run once)
app.get("/api/seed", async (req, res) => {
  try {
    await Product.deleteMany();
    const items = [
      { name: "Laptop", price: 55000 },
      { name: "Headphones", price: 2500 },
      { name: "Keyboard", price: 1200 },
      { name: "Mouse", price: 800 },
      { name: "Smartwatch", price: 4500 },
    ];
    await Product.insertMany(items);
    res.json({ message: "Products added!" });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({ error: 'Failed to seed products' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
