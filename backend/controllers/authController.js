const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.updateUserInfo = async (req, res) => {
  try {
    const { fullName, email, preferences } = req.body;

    // Find the current user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only what's provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    if (req.body.country) user.country = req.body.country;
    if (req.body.currencyCode) user.currencyCode = req.body.currencyCode;
    if (req.body.currencySymbol) user.currencySymbol = req.body.currencySymbol

    if (preferences) {
      user.preferences = {
        ...user.preferences,  // keep existing preferences
        ...preferences        // overwrite only what's sent
      };
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing!" });
  }

  const {
    fullName,
    email,
    password,
    profileImageUrl,
    country,
    currencyCode,
    currencySymbol,
  } = req.body;

  //Checks for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in Use." });
    }

    const userCountry = country || "Unknown";
    const userCurrencyCode = currencyCode || "USD";
    const userCurrencySymbol = currencySymbol || "$";

    const response = await axios;

    //Create the New User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
      preferences: {
        country: userCountry,
        currencyCode: userCurrencyCode,
        currencySymbol: userCurrencySymbol,
        notifications: true,
        country,
      },
      loginHistory: [],
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are rquired!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    user.loginHistory.push({
      timestamp: new Date(),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await user.save();

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging into this account.",
      error: err.message,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {}
};
