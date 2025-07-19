const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Database successfully connected!")
  } catch (error) {
    console.error("Error connecting to the Database" ,error);
    process.exit(1);
  }
};

module.exports = connectDB;