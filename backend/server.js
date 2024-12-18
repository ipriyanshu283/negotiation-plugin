const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const negotiationRoutes = require("./routes/negotiationRoutes");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();
// app.use(cors(*));
// Middleware
app.use(cors({
  origin: "https://negotiation-plugin-frontend.vercel.app",
  methods: ["POST","GET"],
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use("/api/negotiations", negotiationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
