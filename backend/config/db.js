const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Database successfully connected!")
  } catch (error) {
    console.error("Error connecting to the Database" ,error.message);
    console.log('Stack Trace', error.stack);
  }
};

module.exports = connectDB;