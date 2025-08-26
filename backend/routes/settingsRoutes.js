const express = require('express');
const router = express.Router();
const { updateUsername, changePassword, updateProfilePhoto, updateNotifications, clearUserData, closeAccount } = require ('../controllers/settingsController.js');
const { protect } = require ('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware.js');

router.put('/username', protect, updateUsername);
router.put('/password', protect, changePassword);
router.put('/profile-photo', protect, upload.single('image'), updateProfilePhoto);
router.put('/notifications', protect, updateNotifications);
router.delete('/clear-data', protect, clearUserData);
router.delete('/close-account', protect, closeAccount);

module.exports = router;