const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/items", itemRoutes); //  item routes(protected)
app.use("/api", weatherRoutes); //  weather routes
app.use("/api/auth", authRoutes); // Authentication routes (register/login)


app.get("/", (req, res) => {
  res.send(" Greetings from the backend! ☀️");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



