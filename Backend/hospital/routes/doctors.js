const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");
const doctorSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    specialty: String,
    hospitalname:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Owner'
    },
  
  });
  doctorSchema.plugin(plm);
// Create models for Patient, Doctor, and Owner
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;