const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(Number(limit))
      .populate("customers", "name email");

    const totalProducts = await Product.countDocuments();
    const hasNextPage = page * limit < totalProducts;

    res.json({
      products: products.map((product) => ({
        productId: product._id,
        productName: product.name,
        customers: product.customers.map((c) => c._id),
      })),
      pagination: {
        currentPage: Number(page),
        limit: Number(limit),
        hasNextPage,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
