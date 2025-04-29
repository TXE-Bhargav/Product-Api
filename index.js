    require('dotenv').config();
    const express = require('express');
    const connectDB = require('./models/db');
    const productRoutes = require('./routes/productRoutes'); 
    const customerRoutes = require('./routes/customerRoutes');
    const productGet = require('./routes/productget');
    const CustomerLink = require('./routes/customerLink');
    const Pagination = require('./routes/pagination');

    const app = express();
    app.use(express.json());
    connectDB(); 

    app.use('/api', productRoutes);
    app.use('/api', customerRoutes);
    app.use('/api', productGet);
    app.use('/api', CustomerLink);
    app.use('/api', Pagination);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
