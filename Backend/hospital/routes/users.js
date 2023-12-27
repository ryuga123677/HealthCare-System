const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Hospital-Database")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  hospitalname: {
    type: String,
    required: true,
  },
  
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],


});
userSchema.plugin(plm);
const Owner = mongoose.model('Owner', userSchema);

module.exports = Owner;