const mongoose = require("mongoose");

const connectDB = async () => {
  const coon = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = connectDB;
