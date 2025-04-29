const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  inStock: { type: Boolean, default: true },
  customers:[{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}]

});

module.exports = mongoose.model('Product' , productSchema)