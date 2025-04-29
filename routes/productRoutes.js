const express  = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/products' , async(req , res) => {
    try{
        const product  = new Product(req.body);
        await product.save();
        res.status(201).json({message: 'Product Created successfully' , product});
    }catch(err)
    {
        res.status(400).json({error: err.message}); 
    }
});

module.exports = router;