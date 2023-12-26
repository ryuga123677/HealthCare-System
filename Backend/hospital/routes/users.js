const mongoose = require('mongoose');
const plm= require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Hospital-Database-2");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  
  },
  fullname: {
    type: String,
   
  }
});
userSchema.plugin(plm);
// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;