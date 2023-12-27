const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");
const Doctor= require('./routes/doctors');
const Patient= require('./routes/patients');
 mongoose.connect("mongodb://127.0.0.1:27017/Hospital-Database-2");

const ownerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  doctor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  ],
  patient:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
});
ownerSchema.plugin(plm);
const Owner = mongoose.model('Owner', ownerSchema);
module.exports =Owner;
