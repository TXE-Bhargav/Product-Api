const express = require("express");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const router = express.Router();

router.get("/products/:name", async (req, res) => {
  try {
    const productName = req.params.name;

    const product = await Product.findOne({ name: productName }).populate(
      "customers",
      "name"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const customers = await Customer.find({ purchasedProducts: product._id });
    res.json({
      _id: product._id,
      name: product.name,
      purchasedBy: product.customers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
