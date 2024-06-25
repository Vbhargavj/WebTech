const mongoose = require("mongoose");
const { name } = require("pug");

const urlSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    
  },
  birthDateList:[] 
   
});

// Creating the User model
const User = mongoose.model('teUser', urlSchema);

// Exporting the User model directly
module.exports = User;
