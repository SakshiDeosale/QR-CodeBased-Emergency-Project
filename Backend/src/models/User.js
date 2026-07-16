const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // New personal details fields (optional)
  aadharCard: { type: String, required: false },
  address: {
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    required: false,
  },
  phone: { type: String, required: false },
  profileImage: { type: String, required: false },
  // Vehicle Details
  vehicleDetails: {
    type: {
      basicVehicleDetails: {
        vehicleRegistrationNumber: { type: String, required: false },
        vehicleMakeAndModel: { type: String, required: false },
        vehicleColor: { type: String, required: false },
        vehicleType: { 
          type: String, 
          enum: ['Car', 'Bike', 'Truck', 'Other'],
          required: false 
        },
        chassisNumber: { type: String, required: false },
        engineNumber: { type: String, required: false },
        fuelType: { 
          type: String, 
          enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], 
          required: false 
        },
      },
      ownerDetails: {
        ownerName: { type: String, required: false },
        ownerContactNumber: { type: String, required: false },
        ownerEmailId: { type: String, required: false },
        ownerAddress: {
          street: { type: String },
          city: { type: String },
          state: { type: String },
          country: { type: String },
          postalCode: { type: String },
        },
        alternativeContactNumber: { type: String, required: false },
      },
      insuranceAndLegalInfo: {
        insuranceCompanyName: { type: String, required: false },
        insurancePolicyNumber: { type: String, required: false },
        insuranceExpiryDate: { type: Date, required: false },
        pucValidity: { type: Date, required: false },
        rcExpiryDate: { type: Date, required: false },
        drivingLicenseNumber: { type: String, required: false },
      },
    },
    required: false,
  },
  // Emergency Contact Details
  emergencyDetails: {
    type: {
      primaryEmergencyContact: {
        name: { type: String, required: false },
        contactNumber: { type: String, required: false },
        relationshipWithOwner: { type: String, required: false },
      },
      secondaryEmergencyContact: {
        name: { type: String, required: false },
        contactNumber: { type: String, required: false },
        relationshipWithOwner: { type: String, required: false },
      },
    },
    required: false,
  },
  // Medical History Details
  medicalHistory: {
    type: {
      ownerBloodGroup: { 
        type: String, 
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
        required: false 
      },
      knownAllergies: { type: String, required: false },
      chronicMedicalConditions: { type: String, required: false },
      medications: { type: String, required: false },
      emergencyMedicalInstructions: { type: String, required: false },
    },
    required: false,
  },
  // Allow Access Permissions
  allowAccess: {
    type: {
      personalDetails: { type: Boolean, default: false },
      vehicleDetails: { type: Boolean, default: false },
      emergencyDetails: { type: Boolean, default: false },
      medicalHistory: { type: Boolean, default: false },
    },
    required: false,
  },
  // QR Code
  qrCode: { type: String, required: false }, // Stores the QR code URL or identifier
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);