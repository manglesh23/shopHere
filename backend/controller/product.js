const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let product = new Product({ name, description, price, category, stock });
    await product.save();
    res.status(200).json({ msg: `Product Registered Successfully` });
  } catch (e) {
    console.error("Error in createProduct:", e);
    res
      .status(500)
      .json({ error: true, msg: "Internal Server Error", details: e.message });
  }
};

module.exports = { createProduct };
