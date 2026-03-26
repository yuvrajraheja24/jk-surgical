import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler, { notFound } from "./middleware/errorMiddleware.js";

// 🔐 Load env variables
dotenv.config();

const app = express();

// ✅ CORS (allow all)
app.use(cors());

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder (IMPORTANT for local uploads)
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/products", productRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❗ 404 + Error middleware (ALWAYS LAST)
app.use(notFound);
app.use(errorHandler);

// 🚀 Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    process.exit(1);
  }
};

startServer();