const mongoose = require("mongoose");


const urlSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    
  },
  birthDateList:[] 
   
});

// Creating the User model
const User = mongoose.model('teser', urlSchema);

// Exporting the User model directly
module.exports = ser;
