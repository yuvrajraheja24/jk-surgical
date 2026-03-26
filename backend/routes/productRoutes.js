import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ CREATE PRODUCT (Cloudinary upload)
router.post("/", upload.single("image"), createProduct);

// ✅ GET ALL PRODUCTS
router.get("/", getProducts);

// ✅ UPDATE PRODUCT
router.put("/:id", upload.single("image"), updateProduct);

// ✅ DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;