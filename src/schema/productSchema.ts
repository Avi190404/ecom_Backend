import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  size: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true
});

const PRODUCTS = mongoose.model("Product", productSchema);

export default PRODUCTS;
