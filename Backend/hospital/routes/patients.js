const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");

// Define the user schema
const patientSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  hospitalname:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Owner'
  },
});
patientSchema.plugin(plm);
// Create models for Patient, Doctor, and Owner
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;