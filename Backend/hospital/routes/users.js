const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");
require('dotenv').config();
mongoose.connect("mongodb+srv://kishanss311:<KishanVsk123@>@cluster0.k1arc6i.mongodb.net/Hospital-Database?retryWrites=true&w=majority");//mongodb://127.0.0.1:27017/Hospital-Database

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
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