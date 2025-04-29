const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

router.post('/cutomers' , async (req , res) =>{

    try{
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: 'Customer created successfully', customer });
    }catch(err)
    {
        console.error('Error:', err);
        res.status(400).json({error: err.message});
    }
});

module.exports = router;