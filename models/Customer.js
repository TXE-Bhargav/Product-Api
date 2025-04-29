const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name:String,
    email:{type: String , unique: true},
    phone:{type: String , unique: true},
    address: String,
    purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Customer' , CustomerSchema);