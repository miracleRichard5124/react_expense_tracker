const express = require('express');
const router = express.Router();
const { clearUserData, closeAccount } = require ('../controllers/settingsController.js');
const { protect } = require ('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware.js');

router.delete('/clear-data', protect, clearUserData);
router.delete('/close-account', protect, closeAccount);

module.exports = router;