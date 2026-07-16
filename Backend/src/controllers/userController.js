const User = require("../models/User"); // Adjust path to your User model
const QRCode = require("qrcode");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile (personal details)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, aadharCard, address, phone } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (aadharCard) user.aadharCard = aadharCard;
    if (address) user.address = JSON.parse(address);
    if (phone) user.phone = phone;
    if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      token: req.headers.authorization.split(" ")[1],
      userDetails: {
        _id: updatedUser._id,
        email: updatedUser.email,
        aadharCard: updatedUser.aadharCard,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        vehicleDetails: updatedUser.vehicleDetails,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vehicle details
const updateVehicleDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { basicVehicleDetails, ownerDetails, insuranceAndLegalInfo } =
      req.body;

    if (!user.vehicleDetails) {
      user.vehicleDetails = {};
    }

    if (basicVehicleDetails) {
      const parsedBasicVehicleDetails =
        typeof basicVehicleDetails === "string"
          ? JSON.parse(basicVehicleDetails)
          : basicVehicleDetails;
      user.vehicleDetails.basicVehicleDetails = {
        ...user.vehicleDetails.basicVehicleDetails,
        ...parsedBasicVehicleDetails,
      };
    }

    if (ownerDetails) {
      const parsedOwnerDetails =
        typeof ownerDetails === "string"
          ? JSON.parse(ownerDetails)
          : ownerDetails;
      user.vehicleDetails.ownerDetails = {
        ...user.vehicleDetails.ownerDetails,
        ...parsedOwnerDetails,
      };
    }

    if (insuranceAndLegalInfo) {
      const parsedInsuranceAndLegalInfo =
        typeof insuranceAndLegalInfo === "string"
          ? JSON.parse(insuranceAndLegalInfo)
          : insuranceAndLegalInfo;
      user.vehicleDetails.insuranceAndLegalInfo = {
        ...user.vehicleDetails.insuranceAndLegalInfo,
        ...parsedInsuranceAndLegalInfo,
      };
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      token: req.headers.authorization.split(" ")[1],
      userDetails: {
        _id: updatedUser._id,
        email: updatedUser.email,
        aadharCard: updatedUser.aadharCard,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        vehicleDetails: updatedUser.vehicleDetails,
        emergencyDetails: updatedUser.emergencyDetails,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmergencyDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { primaryEmergencyContact, secondaryEmergencyContact } = req.body;

    if (!user.emergencyDetails) {
      user.emergencyDetails = {};
    }

    if (primaryEmergencyContact) {
      user.emergencyDetails.primaryEmergencyContact = {
        ...user.emergencyDetails.primaryEmergencyContact,
        ...primaryEmergencyContact,
      };
    }

    if (secondaryEmergencyContact) {
      user.emergencyDetails.secondaryEmergencyContact = {
        ...user.emergencyDetails.secondaryEmergencyContact,
        ...secondaryEmergencyContact,
      };
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      token: req.headers.authorization.split(" ")[1],
      userDetails: {
        _id: updatedUser._id,
        email: updatedUser.email,
        aadharCard: updatedUser.aadharCard,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        vehicleDetails: updatedUser.vehicleDetails,
        emergencyDetails: updatedUser.emergencyDetails,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMedicalHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { medicalHistory } = req.body;

    if (!user.medicalHistory) {
      user.medicalHistory = {};
    }

    if (medicalHistory) {
      user.medicalHistory = {
        ...user.medicalHistory,
        ...medicalHistory,
      };
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      token: req.headers.authorization.split(" ")[1],
      userDetails: {
        _id: updatedUser._id,
        email: updatedUser.email,
        aadharCard: updatedUser.aadharCard,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        vehicleDetails: updatedUser.vehicleDetails,
        emergencyDetails: updatedUser.emergencyDetails,
        medicalHistory: updatedUser.medicalHistory,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAllowAccess = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { allowAccess } = req.body;

    if (!user.allowAccess) {
      user.allowAccess = {};
    }

    if (allowAccess) {
      user.allowAccess = {
        ...user.allowAccess,
        ...allowAccess,
      };
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      token: req.headers.authorization.split(" ")[1],
      userDetails: {
        _id: updatedUser._id,
        email: updatedUser.email,
        aadharCard: updatedUser.aadharCard,
        address: updatedUser.address,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        vehicleDetails: updatedUser.vehicleDetails,
        emergencyDetails: updatedUser.emergencyDetails,
        medicalHistory: updatedUser.medicalHistory,
        allowAccess: updatedUser.allowAccess,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateQRCode = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Point to frontend route (adjust port if your frontend runs on a different one)
      const publicUrl = `https://scan-to-save-life-new.vercel.app/public/${user._id}`;
      const qrCodeData = await QRCode.toDataURL(publicUrl); // Generate QR code as base64 image
      user.qrCode = qrCodeData; // Store base64 image in qrCode field
      await user.save();
  
      res.json({ qrCode: qrCodeData });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // No change needed for getPublicUserDetails
  const getPublicUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const publicData = {
        _id: user._id,
      };
  
      if (user.allowAccess?.personalDetails) {
        publicData.name = user.name;
        publicData.email = user.email;
        publicData.aadharCard = user.aadharCard;
        publicData.address = user.address;
        publicData.phone = user.phone;
        publicData.profileImage = user.profileImage;
      }
  
      if (user.allowAccess?.vehicleDetails) {
        publicData.vehicleDetails = user.vehicleDetails;
      }
  
      if (user.allowAccess?.emergencyDetails) {
        publicData.emergencyDetails = user.emergencyDetails;
      }
  
      if (user.allowAccess?.medicalHistory) {
        publicData.medicalHistory = user.medicalHistory;
      }
  
      res.json(publicData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
  getProfile,
  updateProfile,
  updateVehicleDetails,
  updateEmergencyDetails,
  updateMedicalHistory,
  updateAllowAccess,
  generateQRCode,
  getPublicUserDetails,
};
