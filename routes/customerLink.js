const express = require("express");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const router = express.Router();

router.patch(
  "/products/:productId/link-customer/:customerId",
  async (req, res) => {
    const { productId, customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    try {
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const product = await Product.findByIdAndUpdate(
        productId,
        { $addToSet: { customers: customerId } },
        { new: true }
      ).populate('customers', 'name');

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({
        message: "Customer linked to product successfully",
        product: {
          _id: product._id,
          name: product.name,
          customers: product.customers,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
