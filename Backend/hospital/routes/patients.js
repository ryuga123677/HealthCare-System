const mongoose = require('mongoose');


// Define the user schema
const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});
//ownerSchema.plugin(plm);
// Create models for Patient, Doctor, and Owner
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;