const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, updateVehicleDetails,updateEmergencyDetails,updateMedicalHistory,updateAllowAccess,generateQRCode,getPublicUserDetails } = require('../controllers/userController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get('/profile', protect, getProfile); // Get user profile
router.put('/profile', protect, upload.single('profileImage'), updateProfile); // Update personal details
router.put('/vehicle-details', protect, updateVehicleDetails); // New route for vehicle details
router.put('/emergency-details', protect, updateEmergencyDetails);
router.put('/medical-history', protect, updateMedicalHistory);
router.put('/allow-access', protect, updateAllowAccess);
router.get('/generate-qr', protect, generateQRCode); // Protected route to generate QR
router.get('/public/:id', getPublicUserDetails); // Public route for QR scan

module.exports = router;