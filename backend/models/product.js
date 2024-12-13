const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  images: [
    {
      url: { type: String },
      alt: { type: String, default: "" },
    },
  ],
  // ratings: {
  //   average: { type: Number, default: 0, min: 0, max: 5 },
  //   count: { type: Number, default: 0 },
  // },
  // reviews: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: { type: String, required: true }, // User's name
  //     comment: { type: String, required: true },
  //     rating: { type: Number, required: true, min: 1, max: 5 },
  //     createdAt: { type: Date, default: Date.now },
  //   },
  // ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

let Product=mongoose.model("Product", productSchema);
module.exports = Product;
