require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Middleware
const allowedOrigins = [
  process.env.REACT_APP_API_URL, // Hosted URL
  "http://localhost:5173", // Another common localhost variation
  "http://localhost:3000", // Localhost with specific port
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Routes
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
