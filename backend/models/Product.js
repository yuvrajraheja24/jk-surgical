import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);