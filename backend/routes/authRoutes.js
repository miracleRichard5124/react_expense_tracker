const express = require("express");
const {protect} = require("../middleware/authMiddleware.js");

const {registerUser, loginUser, getUserInfo, updateUserInfo} = require("../controllers/authController.js");
const upload = require("../middleware/uploadMiddleware.js");
const User = require("../models/User.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.put('/updateUser', protect, updateUserInfo);

router.post("/upload-image", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Update the user's profileImageUrl
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImageUrl: imageUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Image uploaded successfully",
      user
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


module.exports = router;