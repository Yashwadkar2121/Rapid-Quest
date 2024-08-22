require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
    credential: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
