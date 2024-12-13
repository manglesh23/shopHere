const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
