const User = require("../models/User.js");
const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");

exports.clearUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    await Income.deleteMany({ userId });
    await Expense.deleteMany({ userId });

    res.status(200).json({ message: "User details cleared successfully." });
  } catch (error) {
    console.error('Error clearing user Data: ', error);
    res.status(500).json({ message: "Server Error.", error: error.message });
  }
};

exports.closeAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await Income.deleteMany({ userId });
    await Expense.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted Successfully." });
  } catch (error) {
    console.error('Error deleting Account: ', error);
    res.status(500).json({ message: "Server Error.", error: error.message });
  }
};

