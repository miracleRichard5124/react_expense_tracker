const User = require("../models/User.js");
const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const bcrypt = require("bcryptjs");

exports.updateUsername = async (req, res) => {
  const { fullName } = req.body;

  try {
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required!" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName },
      { new: true }
    );

    return res.status(200).json({ message: "Username updated successfully!", user });
  } catch (error) {
    console.error('Error changing username: ', error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    console.log("BODY: ", req.body);
    console.log("USER ID: ", req.user.id);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User doesn't exist." });

    console.log("USER: ", user);

    const isMatch = await user.comparePassword(currentPassword);
    console.log("Password Match result:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password." });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in changing the password: ", error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

exports.updateProfilePhoto = async(req, res) => {
  try{
    if(!req.file){
      return res.status(400).json({message: "No File uploaded."});
    }

    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {profileImageUrl},
      {new: true},
    );

    res.status(200).json({
      message: "Profilephoto updated successfully.", 
      profileImageUrl: user.profileImageUrl,
    });
  }catch(error){
    console.error("Error uploading Profile Photo: ", error);
    res.status(500).json({message: "Server Error", error: error.message});
  }
}

exports.updateNotifications = async (req, res) => {
  try {
    const { notifications } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { "preferences.notifications": notifications },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "Notification preference updated successfully.",
        preferences: user.preferences,
      });
  } catch (error) {
    console.log('Error changing notification setting: ', error);
    res.status(500).json({ message: "Server Error.", error: error.message });
  }
};

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

//    "imageUrl": "http://localhost:8000/uploads/1756144574226-coder-anime.jpg"