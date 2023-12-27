const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    specialty: String,
  
  });
 // doctorSchema.plugin(plm);
// Create models for Patient, Doctor, and Owner
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;