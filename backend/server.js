const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const negotiationRoutes = require("./routes/negotiationRoutes");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();



// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://negotiation-plugin-frontend.vercel.app");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end(); // Send 200 OK for preflight
//   }

//   next();
// });



// app.use(cors());
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
