const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file
const connectDB = require("./config/db");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
app.get("/", (req, res) => {
  res.send("Welcome to the Personal Dashboard API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});
