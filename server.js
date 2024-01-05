const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// DOTENV

dotenv.config();

// MONGODB Connection
connectDB();

// REST OBJECT
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// // Default ROUTES
// app.get("", (req,res) => {
//     res.status(200).json({
//         success:true,
//         message:"Welcome to MS MEAR APP",
//     });
// });

// Custom Route
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));

// port
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
  console.log(`server Running ${PORT}`.bgGreen.white);
});
